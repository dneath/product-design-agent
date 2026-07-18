"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");

/**
 * "On this page" rail — scans the rendered article for h2/h3 after mount and
 * assigns anchor ids from heading text. No MDX plugins needed.
 */
export function Toc() {
  const [items, setItems] = useState<TocItem[]>([]);

  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll<HTMLHeadingElement>(
        ".docs-prose h2, .docs-prose h3",
      ),
    );
    setItems(
      headings.map((h) => {
        if (!h.id) h.id = slugify(h.textContent ?? "");
        return {
          id: h.id,
          text: h.textContent ?? "",
          level: h.tagName === "H2" ? 2 : 3,
        };
      }),
    );
  }, []);

  if (items.length === 0) return null;

  return (
    <nav aria-label="On this page" className="text-sm">
      <p className="mb-2 font-medium">On this page</p>
      <ul className="space-y-1.5 border-l border-border-soft">
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              className={
                "block border-l-2 border-transparent text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground " +
                (i.level === 2 ? "pl-3" : "pl-6")
              }
            >
              {i.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
