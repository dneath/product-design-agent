#!/usr/bin/env node
/**
 * Project-scoped dev-server detection, start, and stop.
 *
 * The point of this script is reliability: it answers "is a dev server already running
 * for THIS project?" without false matches against unrelated servers that merely happen
 * to occupy a port. It does that two ways, both tied to the project, not just a port:
 *
 *   1. A per-project lockfile (`<project>/.dev-server.json`) written when WE start a server,
 *      holding {pid, port, url, cwd}. A match requires the pid to be alive, its working dir
 *      to be this project, and the URL to actually respond.
 *   2. For servers we didn't start, it resolves the listener PID on the expected port and
 *      checks that the PID's working directory is inside this project. A port held by a
 *      different project is reported as "busy by another project", never as a match.
 *
 * Usage:
 *   node scripts/dev-server.mjs check  [--dir <projectDir>] [--port <n>]
 *   node scripts/dev-server.mjs start  [--dir <projectDir>] [--port <n>] [--timeout <ms>]
 *   node scripts/dev-server.mjs stop   [--dir <projectDir>]
 *   node scripts/dev-server.mjs url    [--dir <projectDir>]
 *
 * Output is a single JSON object on stdout (so a sub-agent can parse one line and return it).
 * Exit code: 0 = running/started/ok, 1 = not running / failed.
 */

import fs from 'fs';
import os from 'os';
import net from 'net';
import http from 'http';
import path from 'path';
import { spawn, spawnSync } from 'child_process';

const HOST = '127.0.0.1';
const LOCK = '.dev-server.json';
const LOG = '.dev-server.log';

// ---------- args ----------
function parseArgs(argv) {
  const cmd = argv[2];
  const opts = { dir: process.cwd(), port: null, timeout: 30000 };
  for (let i = 3; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--dir') opts.dir = path.resolve(argv[++i]);
    else if (a === '--port') opts.port = Number(argv[++i]);
    else if (a === '--timeout') opts.timeout = Number(argv[++i]);
  }
  opts.dir = path.resolve(opts.dir);
  return { cmd, opts };
}

function out(obj, code) {
  process.stdout.write(JSON.stringify(obj) + '\n');
  process.exit(code);
}

// ---------- project introspection ----------
function readJSON(p) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return null; }
}

function packageManager(dir) {
  if (fs.existsSync(path.join(dir, 'pnpm-lock.yaml'))) return 'pnpm';
  if (fs.existsSync(path.join(dir, 'yarn.lock'))) return 'yarn';
  if (fs.existsSync(path.join(dir, 'bun.lockb'))) return 'bun';
  return 'npm';
}

/** The dev command for this project, e.g. {cmd:'npm', args:['run','dev']}. */
function devCommand(dir, port) {
  const pm = packageManager(dir);
  const pkg = readJSON(path.join(dir, 'package.json'));
  const hasDev = pkg && pkg.scripts && pkg.scripts.dev;
  const script = hasDev ? 'dev' : (pkg && pkg.scripts && pkg.scripts.start ? 'start' : 'dev');
  // Pass the chosen port through to the underlying tool (vite/next/CRA honor --port or PORT).
  const portArgs = port ? ['--port', String(port)] : [];
  if (pm === 'npm') return { cmd: 'npm', args: ['run', script, ...(portArgs.length ? ['--', ...portArgs] : [])] };
  if (pm === 'pnpm') return { cmd: 'pnpm', args: [script, ...portArgs] };
  if (pm === 'yarn') return { cmd: 'yarn', args: [script, ...portArgs] };
  if (pm === 'bun') return { cmd: 'bun', args: ['run', script, ...portArgs] };
  return { cmd: 'npm', args: ['run', script] };
}

/** Best-effort expected port from env, vite/next config, the dev script, or framework default. */
function expectedPort(dir, override) {
  if (override) return override;
  if (process.env.PORT) return Number(process.env.PORT);

  for (const f of ['vite.config.js', 'vite.config.ts', 'vite.config.mjs', 'vite.config.cjs']) {
    const p = path.join(dir, f);
    if (fs.existsSync(p)) {
      const m = fs.readFileSync(p, 'utf8').match(/port\s*:\s*(\d{2,5})/);
      if (m) return Number(m[1]);
      return 5173; // vite default
    }
  }
  const pkg = readJSON(path.join(dir, 'package.json'));
  const dev = pkg && pkg.scripts && (pkg.scripts.dev || pkg.scripts.start) || '';
  const m = dev.match(/(?:--port|-p)[ =](\d{2,5})/);
  if (m) return Number(m[1]);
  const deps = pkg ? { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) } : {};
  if (deps.vite) return 5173;
  if (deps.next || deps['react-scripts']) return 3000;
  return 3000; // generic default
}

// ---------- process / port probes ----------
function pidAlive(pid) {
  if (!pid) return false;
  try { process.kill(pid, 0); return true; } catch (e) { return e.code === 'EPERM'; }
}

/** Working directory of a pid (Linux /proc, else lsof). null if unknown. */
function pidCwd(pid) {
  try {
    const link = `/proc/${pid}/cwd`;
    if (fs.existsSync(link)) return fs.realpathSync(link);
  } catch { /* fall through */ }
  try {
    const r = spawnSync('lsof', ['-a', '-p', String(pid), '-d', 'cwd', '-Fn'], { encoding: 'utf8' });
    const line = (r.stdout || '').split('\n').find((l) => l.startsWith('n'));
    if (line) return line.slice(1).trim();
  } catch { /* lsof absent */ }
  return null;
}

/** PIDs listening on a TCP port (best-effort: lsof, then ss). */
function listenerPids(port) {
  const pids = new Set();
  try {
    const r = spawnSync('lsof', ['-t', `-iTCP:${port}`, '-sTCP:LISTEN'], { encoding: 'utf8' });
    (r.stdout || '').split('\n').forEach((l) => { if (l.trim()) pids.add(Number(l.trim())); });
  } catch { /* ignore */ }
  if (pids.size === 0) {
    try {
      const r = spawnSync('ss', ['-ltnp', `sport = :${port}`], { encoding: 'utf8' });
      const re = /pid=(\d+)/g; let m;
      while ((m = re.exec(r.stdout || '')) !== null) pids.add(Number(m[1]));
    } catch { /* ignore */ }
  }
  return [...pids];
}

function isPortOpen(port, host = HOST, timeout = 1000) {
  return new Promise((resolve) => {
    const sock = net.connect({ port, host });
    let done = false;
    const finish = (v) => { if (!done) { done = true; sock.destroy(); resolve(v); } };
    sock.setTimeout(timeout);
    sock.once('connect', () => finish(true));
    sock.once('timeout', () => finish(false));
    sock.once('error', () => finish(false));
  });
}

function httpResponds(url, timeout = 2000) {
  return new Promise((resolve) => {
    const req = http.get(url, { timeout }, (res) => { res.resume(); resolve(res.statusCode > 0); });
    req.on('timeout', () => { req.destroy(); resolve(false); });
    req.on('error', () => resolve(false));
  });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---------- lockfile ----------
const lockPath = (dir) => path.join(dir, LOCK);
function readLock(dir) { return readJSON(lockPath(dir)); }
function writeLock(dir, data) { fs.writeFileSync(lockPath(dir), JSON.stringify(data, null, 2)); }
function clearLock(dir) { try { fs.unlinkSync(lockPath(dir)); } catch { /* none */ } }

/** Is the port's listener actually this project (cwd inside dir)? */
function portBelongsToProject(port, dir) {
  for (const pid of listenerPids(port)) {
    const cwd = pidCwd(pid);
    if (cwd && (path.resolve(cwd) === dir || path.resolve(cwd).startsWith(dir + path.sep))) return pid;
  }
  return null;
}

async function findFreePort(start) {
  for (let p = start; p < start + 50; p++) {
    if (!(await isPortOpen(p))) return p;
  }
  return start;
}

// ---------- commands ----------
async function cmdCheck(dir, portOverride) {
  // 1) Tracked server via lockfile — the authoritative, project-scoped signal.
  const lock = readLock(dir);
  if (lock && lock.pid && pidAlive(lock.pid)) {
    const cwd = pidCwd(lock.pid);
    const cwdOk = !cwd || path.resolve(cwd) === dir || path.resolve(cwd).startsWith(dir + path.sep)
      || portBelongsToProject(lock.port, dir);
    if (cwdOk && (await httpResponds(lock.url))) {
      return { running: true, tracked: true, pid: lock.pid, port: lock.port, url: lock.url, dir };
    }
  }
  if (lock && (!lock.pid || !pidAlive(lock.pid))) clearLock(dir); // stale

  // 2) Untracked server on the expected port — only a match if it's THIS project.
  const port = expectedPort(dir, portOverride);
  if (await isPortOpen(port)) {
    const owner = portBelongsToProject(port, dir);
    if (owner) {
      const url = `http://${HOST}:${port}/`;
      return { running: true, tracked: false, adopted: true, pid: owner, port, url, dir };
    }
    return { running: false, expectedPort: port, portBusyByOther: true, dir,
      note: `Port ${port} is in use by a different working directory — not this project.` };
  }
  return { running: false, expectedPort: port, dir };
}

async function cmdStart(dir, portOverride, timeout) {
  const existing = await cmdCheck(dir, portOverride);
  if (existing.running) return { ...existing, started: false, reused: true };

  if (!fs.existsSync(path.join(dir, 'package.json'))) {
    return { running: false, error: `No package.json in ${dir} — scaffold the app first.`, dir };
  }

  // Pick a port: the expected one if free, else the next free port (never collide with others).
  let port = expectedPort(dir, portOverride);
  if (await isPortOpen(port)) port = await findFreePort(port + 1);

  const { cmd, args } = devCommand(dir, port);
  const logFd = fs.openSync(path.join(dir, LOG), 'a');
  const child = spawn(cmd, args, {
    cwd: dir,
    detached: true,
    stdio: ['ignore', logFd, logFd],
    env: { ...process.env, PORT: String(port), BROWSER: 'none', FORCE_COLOR: '0' },
  });
  child.unref();

  const url = `http://${HOST}:${port}/`;
  const deadline = Date.now() + timeout;
  while (Date.now() < deadline) {
    if (await httpResponds(url, 1500)) {
      writeLock(dir, { pid: child.pid, port, url, cwd: dir, cmd: `${cmd} ${args.join(' ')}`, startedAt: new Date().toISOString() });
      return { running: true, started: true, reused: false, pid: child.pid, port, url, dir, log: path.join(dir, LOG) };
    }
    if (!pidAlive(child.pid)) break; // crashed early
    await sleep(700);
  }
  return { running: false, started: false, error: `Server did not respond within ${timeout}ms`, port, dir, log: path.join(dir, LOG) };
}

function cmdStop(dir) {
  const lock = readLock(dir);
  if (!lock || !lock.pid) return { stopped: false, note: 'No tracked server for this project.', dir };
  let stopped = false;
  try { process.kill(-lock.pid, 'SIGTERM'); stopped = true; } catch { /* not a group leader */ }
  if (!stopped) { try { process.kill(lock.pid, 'SIGTERM'); stopped = true; } catch { /* gone */ } }
  clearLock(dir);
  return { stopped, pid: lock.pid, port: lock.port, dir };
}

// ---------- main ----------
(async () => {
  const { cmd, opts } = parseArgs(process.argv);
  switch (cmd) {
    case 'check': {
      const r = await cmdCheck(opts.dir, opts.port);
      out(r, r.running ? 0 : 1);
      break;
    }
    case 'start': {
      const r = await cmdStart(opts.dir, opts.port, opts.timeout);
      out(r, r.running ? 0 : 1);
      break;
    }
    case 'stop': {
      out(cmdStop(opts.dir), 0);
      break;
    }
    case 'url': {
      const r = await cmdCheck(opts.dir, opts.port);
      out(r.running ? { url: r.url, port: r.port, dir: opts.dir } : { url: null, dir: opts.dir }, r.running ? 0 : 1);
      break;
    }
    default:
      out({ error: 'Usage: dev-server.mjs <check|start|stop|url> [--dir <dir>] [--port <n>] [--timeout <ms>]' }, 1);
  }
})();
