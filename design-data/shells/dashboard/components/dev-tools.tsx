"use client";

import { useEffect, useState } from "react";
import { Agentation } from "agentation";
import { Measurer } from "mesurer";
import { scan } from "react-scan";

const enabled = process.env.NODE_ENV === "development";

/**
 * Dev-only overlays, mounted once in the root layout:
 * - react-scan: highlights unnecessary re-renders as you interact
 * - agentation: click elements to annotate; copies agent-readable markdown
 * - mesurer: measurement/alignment overlay — press M to show/hide it
 *   (mounted on demand because its toolbar sits top-left, over app UI)
 * Client-mount gate keeps them out of SSR output and production builds.
 */
export function DevTools() {
  const [mounted, setMounted] = useState(false);
  const [measuring, setMeasuring] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Toolbar off: it floats over bottom-edge UI (chat composers, footers)
    // and steals their clicks. Re-render outlines still show. Flip
    // showToolbar to true if you need its FPS meter/toggles.
    if (enabled) scan({ enabled: true, showToolbar: false });
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "m" && e.key !== "M") return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable))
        return;
      setMeasuring((on) => !on);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!enabled || !mounted) return null;

  return (
    <>
      {measuring ? <Measurer /> : null}
      <Agentation />
    </>
  );
}
