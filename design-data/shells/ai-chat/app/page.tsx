"use client";

import { VariantSwitcher, useProtoState } from "@/components/variant-switcher";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChatPane, ThreadSidebar } from "@/components/chat";

/* Demo variants — replace with the real prototype variants. */

function StateFrame({ children }: { children: React.ReactNode }) {
  const state = useProtoState();
  if (state === "loading")
    return (
      <div className="mx-auto max-w-2xl flex-1 space-y-4 p-6" aria-busy="true">
        <Skeleton className="h-16 w-3/4" />
        <Skeleton className="ml-auto h-10 w-1/2" />
        <Skeleton className="h-24 w-3/4" />
      </div>
    );
  if (state === "empty")
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
        <h2 className="text-lg font-semibold">What are you working on?</h2>
        <p className="max-w-sm text-sm text-muted-foreground">
          Ask about a shipment, draft a customer reply, or pull a carrier
          report. Meridian sees your live ops data.
        </p>
      </div>
    );
  if (state === "error")
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
        <h2 className="text-lg font-semibold">Reply didn’t finish</h2>
        <p className="max-w-sm text-sm text-muted-foreground">
          The connection dropped mid-response. Your conversation is saved —
          regenerate to continue from your last message.
        </p>
        <Button variant="outline">Regenerate</Button>
      </div>
    );
  return <>{children}</>;
}

/** V1 bet: chat is a workspace — threads always visible, heavy reuse. */
function VariantWorkspace() {
  return (
    <div className="flex min-h-0 flex-1">
      <ThreadSidebar />
      <StateFrame>
        <ChatPane />
      </StateFrame>
    </div>
  );
}

/** V2 bet: chat is a focused tool — one conversation, zero chrome. */
function VariantFocused() {
  return (
    <div className="flex min-h-0 flex-1">
      <StateFrame>
        <ChatPane />
      </StateFrame>
    </div>
  );
}

export default function Page() {
  return (
    <VariantSwitcher
      variants={[
        {
          id: "a",
          name: "Workspace",
          bet: "Users juggle many threads — history is always one glance away",
          Component: VariantWorkspace,
        },
        {
          id: "b",
          name: "Focused",
          bet: "Users do one job at a time — chrome subtracts from the answer",
          Component: VariantFocused,
        },
      ]}
    />
  );
}
