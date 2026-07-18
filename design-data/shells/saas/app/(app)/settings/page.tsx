"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { org } from "@/lib/fixtures";
import { useSession } from "@/lib/session";

export default function SettingsPage() {
  const { session, can } = useSession();
  const readOnly = !can.editSettings;

  return (
    <div className="space-y-6">
      {readOnly && (
        <p className="rounded-md bg-secondary px-3 py-2 text-sm text-secondary-foreground">
          You’re viewing as <span className="font-mono">viewer</span> — settings
          are read-only for this role.
        </p>
      )}
      <Card>
        <CardHeader>
          <CardTitle>Workspace</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-1.5 sm:max-w-sm">
            <Label htmlFor="org-name">Organization name</Label>
            <Input id="org-name" defaultValue={org.name} disabled={readOnly} />
          </div>
          <div className="grid gap-1.5 sm:max-w-sm">
            <Label htmlFor="org-slug">Workspace URL</Label>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm text-muted-foreground">
                meridian.app/
              </span>
              <Input id="org-slug" defaultValue={org.slug} disabled={readOnly} />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            {
              id: "critical",
              label: "Critical exceptions",
              desc: "Page the on-call channel when a critical exception opens.",
              on: true,
            },
            {
              id: "digest",
              label: "Weekly digest",
              desc: "Monday-morning summary of carrier scores and open queues.",
              on: true,
            },
            {
              id: "product",
              label: "Product updates",
              desc: "Occasional notes when features ship. No sales follow-ups.",
              on: false,
            },
          ].map((n) => (
            <div key={n.id} className="flex items-start justify-between gap-4">
              <div>
                <Label htmlFor={n.id}>{n.label}</Label>
                <p className="text-sm text-muted-foreground">{n.desc}</p>
              </div>
              <Switch id={n.id} defaultChecked={n.on} disabled={readOnly} />
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-1.5 sm:max-w-sm">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue={session.name} disabled={readOnly} />
          </div>
          <div className="grid gap-1.5 sm:max-w-sm">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              defaultValue={session.email}
              disabled={readOnly}
            />
          </div>
          {!readOnly && <Button>Save changes</Button>}
        </CardContent>
      </Card>
    </div>
  );
}
