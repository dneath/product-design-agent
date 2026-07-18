"use client";

import { SaasShell } from "@/components/saas-shell";
import { SessionProvider } from "@/lib/session";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <SaasShell>{children}</SaasShell>
    </SessionProvider>
  );
}
