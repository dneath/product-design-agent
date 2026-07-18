"use client";

import { ChevronDown, CreditCard, Settings, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { org, type Role } from "@/lib/fixtures";
import { useSession } from "@/lib/session";
import { cn } from "@/lib/utils";

const ROLES: Role[] = ["admin", "member", "viewer"];

/** Topbar role switcher — flips the mock session so every role's view is reachable. */
export function RoleSwitcher() {
  const { session, setRole } = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <span className="font-mono text-xs uppercase">{session.role}</span>
          <ChevronDown aria-hidden />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>View as role</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={session.role}
          onValueChange={(v) => setRole(v as Role)}
        >
          {ROLES.map((r) => (
            <DropdownMenuRadioItem key={r} value={r}>
              {r}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/** App chrome: org header + role-gated section nav. */
export function SaasShell({ children }: { children: React.ReactNode }) {
  const { session, can } = useSession();
  const pathname = usePathname();

  const nav = [
    { href: "/settings", label: "Settings", icon: Settings, show: true },
    { href: "/members", label: "Members", icon: Users, show: true },
    { href: "/billing", label: "Billing", icon: CreditCard, show: can.seeBilling },
  ];

  return (
    <div data-proto-root className="flex min-h-full flex-col">
      <header className="border-b border-border-soft">
        <div className="mx-auto flex h-14 max-w-4xl items-center gap-3 px-4">
          <span className="flex size-6 items-center justify-center rounded-sm bg-primary font-mono text-xs font-bold text-primary-foreground">
            M
          </span>
          <span className="truncate text-sm font-semibold">{org.name}</span>
          <span className="rounded-sm bg-secondary px-1.5 py-0.5 font-mono text-xs text-secondary-foreground">
            {org.plan}
          </span>
          <div className="ml-auto flex items-center gap-2">
            <RoleSwitcher />
            <Avatar className="size-7">
              <AvatarFallback className="text-xs">
                {session.name
                  .split(" ")
                  .map((p) => p[0])
                  .slice(0, 2)
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
        <nav aria-label="Workspace" className="mx-auto max-w-4xl px-4">
          <ul className="flex gap-1">
            {nav
              .filter((n) => n.show)
              .map((n) => {
                const current = pathname.startsWith(n.href);
                return (
                  <li key={n.href}>
                    <Link
                      href={n.href}
                      aria-current={current ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-1.5 border-b-2 px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        current
                          ? "border-primary font-medium text-foreground"
                          : "border-transparent text-muted-foreground hover:text-foreground",
                      )}
                    >
                      <n.icon aria-hidden className="size-4" />
                      {n.label}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </nav>
      </header>
      <div className="mx-auto w-full max-w-4xl flex-1 px-4 py-6">{children}</div>
    </div>
  );
}
