"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ComponentType,
} from "react";
import { cn } from "@/lib/utils";

/**
 * VariantSwitcher — one app, 2–4 structurally distinct variants, tab-switchable.
 * - Selection persists in the URL hash (#variant-b) so refresh keeps the tab.
 * - Each tab shows the variant's one-line bet label.
 * - Data states (default / loading / empty / error) are switchable in-app via
 *   the built-in toggle; variants read the current state with useProtoState().
 */

export type ProtoDataState = "default" | "loading" | "empty" | "error";

export interface Variant {
  /** Used in the URL hash, e.g. "a" -> #variant-a */
  id: string;
  /** Short display name, e.g. "Control Tower" */
  name: string;
  /** One-line bet: what this variant wagers is true about the user */
  bet: string;
  Component: ComponentType;
}

const ProtoStateContext = createContext<ProtoDataState>("default");

/** Current data state for the active variant to render against. */
export function useProtoState(): ProtoDataState {
  return useContext(ProtoStateContext);
}

const DATA_STATES: ProtoDataState[] = ["default", "loading", "empty", "error"];

export function VariantSwitcher({
  variants,
  embedded = false,
}: {
  variants: Variant[];
  /** true when the switcher sits inside app chrome instead of owning the viewport */
  embedded?: boolean;
}) {
  const [activeId, setActiveId] = useState(variants[0]?.id ?? "");
  const [dataState, setDataState] = useState<ProtoDataState>("default");
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.replace(/^#variant-/, "");
      if (variants.some((v) => v.id === id)) setActiveId(id);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [variants]);

  const select = (id: string) => {
    setActiveId(id);
    history.replaceState(null, "", `#variant-${id}`);
    tabRefs.current.get(id)?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const i = variants.findIndex((v) => v.id === activeId);
    if (i === -1) return;
    let next: number | null = null;
    if (e.key === "ArrowRight") next = (i + 1) % variants.length;
    else if (e.key === "ArrowLeft")
      next = (i - 1 + variants.length) % variants.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = variants.length - 1;
    if (next !== null) {
      e.preventDefault();
      select(variants[next].id);
    }
  };

  const active = variants.find((v) => v.id === activeId) ?? variants[0];
  // Inside app chrome the page already has a banner — avoid a duplicate landmark.
  const Bar = embedded ? "div" : "header";

  return (
    /* data-proto-root scopes verification (axe runs) to the prototype,
       excluding the dev overlays mounted outside it. h-dvh + scrollable main
       keeps full-height variants (chat, dashboards) viewport-bounded. */
    <div
      data-proto-root
      className={cn("flex flex-col", embedded ? "flex-1" : "h-dvh")}
    >
      <Bar className="sticky top-0 z-40 border-b border-border-soft bg-background/95 backdrop-blur-sm">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-4 py-2">
          <div
            role="tablist"
            aria-label="Prototype variants"
            className="flex items-center gap-1"
            onKeyDown={onKeyDown}
          >
            {variants.map((v) => (
              <button
                key={v.id}
                type="button"
                ref={(el) => {
                  if (el) tabRefs.current.set(v.id, el);
                }}
                role="tab"
                id={`tab-${v.id}`}
                aria-selected={v.id === active.id}
                aria-controls={`panel-${v.id}`}
                tabIndex={v.id === active.id ? 0 : -1}
                onClick={() => select(v.id)}
                className={cn(
                  "rounded-sm px-3 py-1.5 text-sm font-medium outline-none transition-colors",
                  "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  v.id === active.id
                    ? "bg-surface-3 text-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                {v.name}
              </button>
            ))}
          </div>
          <p className="min-w-0 flex-1 truncate text-sm text-muted-foreground">
            <span className="font-mono text-xs uppercase tracking-wider">
              bet{" "}
            </span>
            {active.bet}
          </p>
          <div
            role="group"
            aria-label="Data state"
            className="flex items-center gap-1"
          >
            {DATA_STATES.map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={s === dataState}
                onClick={() => setDataState(s)}
                className={cn(
                  "rounded-sm px-2 py-1 font-mono text-xs outline-none transition-colors",
                  "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  s === dataState
                    ? "bg-surface-3 text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </Bar>
      <ProtoStateContext.Provider value={dataState}>
        <main
          className={cn(
            "flex min-h-0 flex-1 flex-col",
            !embedded && "overflow-y-auto",
          )}
        >
          {variants.map((v) => (
            <div
              key={v.id}
              role="tabpanel"
              id={`panel-${v.id}`}
              aria-labelledby={`tab-${v.id}`}
              hidden={v.id !== active.id}
              className={v.id === active.id ? "flex min-h-0 flex-1 flex-col" : undefined}
            >
              {v.id === active.id ? <v.Component /> : null}
            </div>
          ))}
        </main>
      </ProtoStateContext.Provider>
    </div>
  );
}
