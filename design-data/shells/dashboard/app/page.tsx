"use client";

import { VariantSwitcher, useProtoState } from "@/components/variant-switcher";
import { AppShell } from "@/components/app-shell";
import { BarList, ThroughputChart } from "@/components/charts";
import { KpiCard } from "@/components/kpi-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { carrierShare, exceptions, kpis, throughput14d } from "@/lib/fixtures";
import type { Severity } from "@/lib/fixtures";

/* Demo variants — replace with the real prototype variants. */

const severityVariant: Record<Severity, "destructive" | "secondary" | "outline"> = {
  critical: "destructive",
  high: "secondary",
  medium: "secondary",
  low: "outline",
};

function StateFrame({ children }: { children: React.ReactNode }) {
  const state = useProtoState();
  if (state === "loading")
    return (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4" aria-busy="true">
        {Array.from({ length: 4 }, (_, i) => (
          <Skeleton key={i} className="h-28" />
        ))}
        <Skeleton className="h-72 md:col-span-2 xl:col-span-4" />
      </div>
    );
  if (state === "empty")
    return (
      <div className="flex flex-col items-start gap-3 py-12">
        <h2 className="text-lg font-semibold">No shipment data yet</h2>
        <p className="max-w-md text-sm text-muted-foreground">
          Connect a warehouse feed to start tracking dispatch performance.
          Historical data appears within an hour of the first sync.
        </p>
        <Button>Connect a feed</Button>
      </div>
    );
  if (state === "error")
    return (
      <Card className="border-destructive/40">
        <CardHeader>
          <CardTitle>Couldn’t load operations data</CardTitle>
        </CardHeader>
        <CardContent className="flex items-start gap-3 text-sm text-muted-foreground">
          <p className="flex-1">
            The metrics service didn’t respond within 10 seconds. Your feeds are
            unaffected. Retry, or check the status page if this persists.
          </p>
          <Button variant="outline">Retry</Button>
        </CardContent>
      </Card>
    );
  return <>{children}</>;
}

function ExceptionsTable({ rows }: { rows: typeof exceptions }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead className="max-md:hidden">Issue</TableHead>
          <TableHead className="max-sm:hidden">Age</TableHead>
          <TableHead>Severity</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((r) => (
          <TableRow key={r.id}>
            <TableCell className="font-mono text-xs">{r.id}</TableCell>
            <TableCell className="max-w-44 truncate">{r.customer}</TableCell>
            <TableCell className="max-w-md truncate text-muted-foreground max-md:hidden">
              {r.issue}
            </TableCell>
            <TableCell className="font-mono text-xs tabular-nums max-sm:hidden">
              {r.ageHours}h
            </TableCell>
            <TableCell>
              <Badge variant={severityVariant[r.severity]}>{r.severity}</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

/** V1 bet: managers glance first — KPIs and trend lead, detail is one level down. */
function VariantPulse() {
  return (
    <AppShell title="Overview">
      <StateFrame>
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <KpiCard kpi={kpis[0]} />
            <KpiCard kpi={kpis[1]} invertDelta />
            <KpiCard kpi={kpis[2]} invertDelta />
            <KpiCard kpi={kpis[3]} />
          </div>
          <div className="grid gap-4 xl:grid-cols-3">
            <Card className="xl:col-span-2">
              <CardHeader>
                <CardTitle>Daily throughput</CardTitle>
              </CardHeader>
              <CardContent>
                <ThroughputChart data={throughput14d} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Orders by carrier</CardTitle>
              </CardHeader>
              <CardContent>
                <BarList data={carrierShare} />
              </CardContent>
            </Card>
          </div>
        </div>
      </StateFrame>
    </AppShell>
  );
}

/** V2 bet: operators work the queue — exceptions lead, metrics are peripheral. */
function VariantTriage() {
  return (
    <AppShell title="Exceptions">
      <StateFrame>
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-muted-foreground">
            {kpis.map((k) => (
              <span key={k.label}>
                {k.label}{" "}
                <span className="font-mono font-medium tabular-nums text-foreground">
                  {k.value}
                </span>
              </span>
            ))}
          </div>
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>Open exceptions</CardTitle>
              <Button variant="outline" size="sm">
                Assign oldest to me
              </Button>
            </CardHeader>
            <CardContent>
              <ExceptionsTable rows={exceptions} />
            </CardContent>
          </Card>
        </div>
      </StateFrame>
    </AppShell>
  );
}

export default function Page() {
  return (
    <VariantSwitcher
      variants={[
        {
          id: "a",
          name: "Pulse",
          bet: "Managers glance — trend and KPIs first, queue one level down",
          Component: VariantPulse,
        },
        {
          id: "b",
          name: "Triage",
          bet: "Operators work the queue — exceptions first, metrics peripheral",
          Component: VariantTriage,
        },
      ]}
    />
  );
}
