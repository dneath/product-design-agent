import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Kpi } from "@/lib/fixtures";

/** KPI stat card: label, value, delta vs previous period. */
export function KpiCard({ kpi, invertDelta = false }: { kpi: Kpi; invertDelta?: boolean }) {
  const good = invertDelta ? kpi.delta < 0 : kpi.delta > 0;
  return (
    <Card>
      <CardContent className="space-y-1">
        <p className="text-sm text-muted-foreground">{kpi.label}</p>
        <p className="font-mono text-2xl font-semibold tabular-nums tracking-tight">
          {kpi.value}
        </p>
        <p className="text-xs text-muted-foreground">
          <span className={cn("font-mono tabular-nums", good ? "text-success" : "text-destructive")}>
            {kpi.delta > 0 ? "+" : ""}
            {kpi.delta}%
          </span>{" "}
          {kpi.deltaLabel}
        </p>
      </CardContent>
    </Card>
  );
}
