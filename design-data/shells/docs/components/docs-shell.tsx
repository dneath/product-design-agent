"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Toc } from "@/components/toc";
import { cn } from "@/lib/utils";

const NAV = [
  {
    section: "Start here",
    links: [
      { href: "/", label: "Introduction" },
      { href: "/getting-started", label: "Getting started" },
    ],
  },
  {
    section: "Reference",
    links: [{ href: "/api-reference", label: "Exceptions API" }],
  },
];

/** Docs chrome: left nav, centered article, right "On this page" rail. */
export function DocsShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div data-proto-root className="flex min-h-full flex-col">
      <header className="sticky top-0 z-30 border-b border-border-soft bg-background/90 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="flex size-6 items-center justify-center rounded-sm bg-primary font-mono text-xs font-bold text-primary-foreground">
              M
            </span>
            Meridian Docs
          </Link>
          <div className="relative ml-auto w-full max-w-xs max-sm:hidden">
            <Search
              aria-hidden
              className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              type="search"
              placeholder="Search docs…"
              aria-label="Search docs"
              className="pl-8"
            />
          </div>
        </div>
      </header>
      <div className="mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 gap-8 px-4 md:grid-cols-[180px_1fr] lg:grid-cols-[180px_1fr_180px]">
        <nav aria-label="Docs" className="py-8 max-md:hidden">
          {NAV.map((group) => (
            <div key={group.section} className="mb-6">
              <p className="mb-2 font-mono text-xs tracking-wider text-muted-foreground uppercase">
                {group.section}
              </p>
              <ul className="space-y-1 text-sm">
                {group.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      aria-current={pathname === l.href ? "page" : undefined}
                      className={cn(
                        "block rounded-sm px-2 py-1 outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        pathname === l.href
                          ? "bg-secondary font-medium text-foreground"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <main className="min-w-0 py-8">
          <article className="docs-prose">{children}</article>
        </main>
        <aside className="sticky top-14 max-h-[calc(100dvh-3.5rem)] self-start overflow-y-auto py-8 max-lg:hidden">
          {/* keyed by route: the layout persists across client-side navigation,
              so the TOC must rescan per page */}
          <Toc key={pathname} />
        </aside>
      </div>
    </div>
  );
}
