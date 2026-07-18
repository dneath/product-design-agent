"use client";

import { useState } from "react";
import {
  Boxes,
  ChartNoAxesColumn,
  LayoutDashboard,
  Menu,
  Settings,
  TriangleAlert,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Overview", icon: LayoutDashboard, current: true },
  { label: "Exceptions", icon: TriangleAlert, current: false },
  { label: "Shipments", icon: Boxes, current: false },
  { label: "Reports", icon: ChartNoAxesColumn, current: false },
  { label: "Settings", icon: Settings, current: false },
];

/**
 * Dashboard chrome: sidebar (canvas background + border, per doctrine) and
 * topbar. Content renders in the scrollable main column.
 */
export function AppShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="flex min-h-full">
      <nav
        aria-label="Primary"
        className={cn(
          "w-56 shrink-0 border-r border-border-soft bg-sidebar max-lg:fixed max-lg:inset-y-0 max-lg:left-0 max-lg:z-30 max-lg:shadow-lg max-lg:transition-transform max-lg:duration-200 max-lg:ease-out",
          !navOpen && "max-lg:-translate-x-full max-lg:shadow-none",
        )}
      >
        <div className="flex h-14 items-center gap-2 px-4">
          <div className="flex size-6 items-center justify-center rounded-sm bg-primary font-mono text-xs font-bold text-primary-foreground">
            M
          </div>
          <span className="text-sm font-semibold">Meridian Ops</span>
        </div>
        <ul className="space-y-0.5 px-2 py-2">
          {NAV.map((item) => (
            <li key={item.label}>
              <a
                href="#"
                aria-current={item.current ? "page" : undefined}
                className={cn(
                  "flex items-center gap-2.5 rounded-sm px-2.5 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  item.current
                    ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
              >
                <item.icon aria-hidden className="size-4" />
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {navOpen ? (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setNavOpen(false)}
          className="fixed inset-0 z-20 bg-foreground/20 lg:hidden"
        />
      ) : null}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center gap-3 border-b border-border-soft px-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Open navigation"
            onClick={() => setNavOpen(true)}
          >
            <Menu aria-hidden />
          </Button>
          <h1 className="text-base font-semibold">{title}</h1>
          <div className="ml-auto flex items-center gap-3">
            <span className="font-mono text-xs text-muted-foreground max-sm:hidden">
              Fri 17 Jul, 14:32 UTC
            </span>
            <Avatar className="size-7">
              <AvatarFallback className="text-xs">PR</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <div className="flex-1 p-4 lg:p-6">{children}</div>
      </div>
    </div>
  );
}
