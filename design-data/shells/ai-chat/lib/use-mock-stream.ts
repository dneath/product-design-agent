"use client";

import { useCallback, useRef, useState } from "react";

/**
 * Mock token streaming — no AI SDK, no keys. Types out `text` word by word;
 * cancellable mid-stream (the Stop button case). Swap for a real transport
 * when the prototype graduates; the consuming UI shouldn't need to change.
 */
export function useMockStream() {
  const [streamed, setStreamed] = useState("");
  const [streaming, setStreaming] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    setStreaming(false);
  }, []);

  const start = useCallback(
    (text: string, onDone?: (finalText: string) => void) => {
      stop();
      const words = text.split(/(\s+)/);
      let i = 0;
      setStreamed("");
      setStreaming(true);
      timer.current = setInterval(() => {
        i += 2;
        const next = words.slice(0, i).join("");
        setStreamed(next);
        if (i >= words.length) {
          stop();
          onDone?.(text);
        }
      }, 24);
    },
    [stop],
  );

  return { streamed, streaming, start, stop };
}
