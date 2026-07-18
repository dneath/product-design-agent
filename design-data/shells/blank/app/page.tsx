"use client";

import { VariantSwitcher, useProtoState } from "@/components/variant-switcher";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { members } from "@/lib/fixtures";

/*
 * Placeholder variants — replace with the real prototype variants.
 * They exist to demonstrate the contract: read useProtoState() for
 * loading/empty/error, use fixtures (with extremes), differ structurally.
 */

function StateFrame({ children }: { children: React.ReactNode }) {
  const state = useProtoState();
  if (state === "loading")
    return (
      <div className="space-y-3 p-6" aria-busy="true">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  if (state === "empty")
    return (
      <div className="flex flex-col items-start gap-3 p-6">
        <h2 className="text-lg font-semibold">No members yet</h2>
        <p className="max-w-md text-sm text-muted-foreground">
          Invite your first teammate to start collaborating. Invitations expire
          after 7 days.
        </p>
        <Button>Invite a teammate</Button>
      </div>
    );
  if (state === "error")
    return (
      <div className="p-6">
        <Card className="border-destructive/40">
          <CardHeader>
            <CardTitle>Couldn’t load members</CardTitle>
          </CardHeader>
          <CardContent className="flex items-start gap-3 text-sm text-muted-foreground">
            <p className="flex-1">
              The member list didn’t load because the connection timed out.
              Check your network and try again.
            </p>
            <Button variant="outline">Retry</Button>
          </CardContent>
        </Card>
      </div>
    );
  return <>{children}</>;
}

function VariantList() {
  return (
    <StateFrame>
      <h1 className="sr-only">Workspace members</h1>
      <ul className="divide-y divide-border-soft p-6">
        {members.map((m) => (
          <li key={m.id} className="flex items-center gap-4 py-3">
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">{m.name}</p>
              <p className="truncate text-sm text-muted-foreground">
                {m.email}
              </p>
            </div>
            <Badge variant="secondary">{m.role}</Badge>
          </li>
        ))}
      </ul>
    </StateFrame>
  );
}

function VariantCards() {
  return (
    <StateFrame>
      <h1 className="sr-only">Workspace members</h1>
      <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((m) => (
          <Card key={m.id}>
            <CardHeader>
              <CardTitle className="truncate text-base">{m.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between gap-2 text-sm text-muted-foreground">
              <span className="truncate">{m.email}</span>
              <Badge variant="secondary">{m.role}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </StateFrame>
  );
}

export default function Page() {
  return (
    <VariantSwitcher
      variants={[
        {
          id: "a",
          name: "List",
          bet: "Members are scanned by name — density beats visual identity",
          Component: VariantList,
        },
        {
          id: "b",
          name: "Cards",
          bet: "Members are recognized as people — identity beats density",
          Component: VariantCards,
        },
      ]}
    />
  );
}
