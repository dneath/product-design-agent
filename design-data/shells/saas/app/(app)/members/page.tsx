"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { VariantSwitcher, useProtoState } from "@/components/variant-switcher";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { org, orgMembers, type OrgMember, type Role } from "@/lib/fixtures";
import { useSession } from "@/lib/session";

/* Demo variant — replace with 2–4 real variants when prototyping this screen. */

function RoleCell({
  member,
  onChange,
}: {
  member: OrgMember;
  onChange: (id: string, role: Role) => void;
}) {
  const { can } = useSession();
  if (!can.editRoles) return <Badge variant="secondary">{member.role}</Badge>;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="-ml-2">
          {member.role}
          <ChevronDown aria-hidden />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuRadioGroup
          value={member.role}
          onValueChange={(v) => onChange(member.id, v as Role)}
        >
          {(["admin", "member", "viewer"] as Role[]).map((r) => (
            <DropdownMenuRadioItem key={r} value={r}>
              {r}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function MembersRoster() {
  const state = useProtoState();
  const { can } = useSession();
  const [members, setMembers] = useState(orgMembers);

  const changeRole = (id: string, role: Role) =>
    setMembers((ms) => ms.map((m) => (m.id === id ? { ...m, role } : m)));

  if (state === "loading")
    return (
      <div className="space-y-2 py-2" aria-busy="true">
        {Array.from({ length: 5 }, (_, i) => (
          <Skeleton key={i} className="h-12" />
        ))}
      </div>
    );
  if (state === "empty")
    return (
      <div className="flex flex-col items-start gap-3 py-10">
        <h2 className="text-lg font-semibold">It’s just you so far</h2>
        <p className="max-w-md text-sm text-muted-foreground">
          Invite teammates to share dashboards and split the exception queue.
          Seats included in {org.plan}: {org.seatsIncluded}.
        </p>
        {can.editRoles && <Button>Invite people</Button>}
      </div>
    );
  if (state === "error")
    return (
      <div className="flex flex-col items-start gap-3 py-10">
        <h2 className="text-lg font-semibold">Couldn’t load members</h2>
        <p className="max-w-md text-sm text-muted-foreground">
          The directory didn’t respond. Your workspace is unaffected — retry in
          a moment.
        </p>
        <Button variant="outline">Retry</Button>
      </div>
    );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          <span className="font-mono tabular-nums">{org.seatsUsed}</span> of{" "}
          <span className="font-mono tabular-nums">{org.seatsIncluded}</span>{" "}
          seats used
        </p>
        {can.editRoles && <Button size="sm">Invite people</Button>}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="max-md:hidden">Email</TableHead>
            <TableHead className="max-sm:hidden">Joined</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((m) => (
            <TableRow key={m.id}>
              <TableCell className="max-w-48 truncate font-medium">
                {m.name}
              </TableCell>
              <TableCell className="max-w-56 truncate text-muted-foreground max-md:hidden">
                {m.email}
              </TableCell>
              <TableCell className="font-mono text-xs tabular-nums max-sm:hidden">
                {m.joined}
              </TableCell>
              <TableCell>
                <RoleCell member={m} onChange={changeRole} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default function MembersPage() {
  return (
    <VariantSwitcher
      embedded
      variants={[
        {
          id: "a",
          name: "Roster",
          bet: "Admins manage roles in place — table with inline role menus",
          Component: MembersRoster,
        },
      ]}
    />
  );
}
