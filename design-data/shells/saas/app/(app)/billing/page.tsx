"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { invoices, plans } from "@/lib/fixtures";
import { useSession } from "@/lib/session";
import { cn } from "@/lib/utils";

const statusVariant = {
  paid: "secondary",
  due: "outline",
  failed: "destructive",
} as const;

/** Billing — pure UI, no payment provider wired. */
export default function BillingPage() {
  const { can } = useSession();
  if (!can.seeBilling)
    return (
      <div className="py-10">
        <h2 className="text-lg font-semibold">Billing is admin-only</h2>
        <p className="mt-1 max-w-md text-sm text-muted-foreground">
          Ask a workspace admin for plan or invoice details. Your role:{" "}
          <span className="font-mono">member/viewer</span>.
        </p>
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((p) => (
          <Card key={p.name} className={cn(p.current && "border-border-strong")}>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>{p.name}</CardTitle>
              {p.current && <Badge variant="secondary">Current</Badge>}
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="font-mono text-xl font-semibold tabular-nums">
                {p.price}
              </p>
              <p className="text-sm text-muted-foreground">{p.blurb}</p>
              <Button
                variant={p.current ? "outline" : "default"}
                size="sm"
                disabled={p.current}
              >
                {p.current ? "Current plan" : "Switch plan"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell className="font-mono text-xs">{inv.id}</TableCell>
                  <TableCell className="font-mono text-xs tabular-nums">
                    {inv.date}
                  </TableCell>
                  <TableCell className="font-mono tabular-nums">
                    {inv.amount}
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[inv.status]}>
                      {inv.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
