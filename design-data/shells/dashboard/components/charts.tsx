"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { CarrierShare, DayThroughput } from "@/lib/fixtures";

/*
 * Chart components in the Tremor pattern (thin wrappers over recharts),
 * colored exclusively via the --chart-* tokens so a brand swap restyles them.
 */

const fmtDay = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });

export function ThroughputChart({ data }: { data: DayThroughput[] }) {
  return (
    <div className="h-64" role="img" aria-label="Daily shipped units versus target, last 14 days">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -12 }}>
          <CartesianGrid strokeDasharray="0" stroke="var(--border-soft)" vertical={false} />
          <XAxis
            dataKey="date"
            tickFormatter={fmtDay}
            stroke="var(--muted-foreground)"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            stroke="var(--muted-foreground)"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            width={48}
          />
          <Tooltip
            cursor={{ stroke: "var(--border-strong)" }}
            contentStyle={{
              background: "var(--popover)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-sm)",
              color: "var(--popover-foreground)",
              fontSize: 12,
            }}
            labelFormatter={(v) => fmtDay(String(v))}
          />
          <Area
            type="monotone"
            dataKey="target"
            stroke="var(--chart-3)"
            strokeDasharray="4 4"
            fill="none"
            strokeWidth={1.5}
            name="Target"
          />
          <Area
            type="monotone"
            dataKey="shipped"
            stroke="var(--chart-1)"
            fill="var(--chart-1)"
            fillOpacity={0.08}
            strokeWidth={2}
            name="Shipped"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

/** Tremor-style bar list: label + value with proportional track. */
export function BarList({ data }: { data: CarrierShare[] }) {
  const max = Math.max(...data.map((d) => d.orders), 1);
  return (
    <ul className="space-y-2">
      {data.map((d) => (
        <li key={d.carrier} className="grid grid-cols-[1fr_auto] items-center gap-3">
          <div className="relative h-7 overflow-hidden rounded-sm">
            <div
              className="absolute inset-y-0 left-0 rounded-sm bg-secondary"
              style={{ width: `${(d.orders / max) * 100}%` }}
            />
            <span className="relative flex h-full items-center truncate px-2 text-sm">
              {d.carrier}
            </span>
          </div>
          <span className="font-mono text-sm tabular-nums text-muted-foreground">
            {d.orders.toLocaleString("en-US")}
          </span>
        </li>
      ))}
    </ul>
  );
}
