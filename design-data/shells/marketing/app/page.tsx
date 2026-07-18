"use client";

import { VariantSwitcher, useProtoState } from "@/components/variant-switcher";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Cta,
  FeatureGrid,
  Hero,
  LogoRow,
  SiteFooter,
  SiteNav,
  Stats,
  Testimonial,
} from "@/components/sections";

/* Demo variants — replace with the real prototype variants. Marketing pages
   are static; loading/empty/error mostly don't apply (kept minimal here). */

function StateFrame({ children }: { children: React.ReactNode }) {
  const state = useProtoState();
  if (state === "loading")
    return (
      <div className="mx-auto max-w-5xl space-y-6 p-8" aria-busy="true">
        <Skeleton className="mx-auto h-12 w-2/3" />
        <Skeleton className="mx-auto h-6 w-1/2" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  return <>{children}</>;
}

/** V1 bet: visitors need proof before product — evidence sections lead. */
function VariantProofFirst() {
  return (
    <StateFrame>
      <SiteNav />
      <Hero centered />
      <LogoRow />
      <Testimonial />
      <Stats />
      <FeatureGrid />
      <Cta />
      <SiteFooter />
    </StateFrame>
  );
}

/** V2 bet: visitors scan capability first — features lead, proof supports. */
function VariantProductFirst() {
  return (
    <StateFrame>
      <SiteNav />
      <Hero centered={false} />
      <FeatureGrid />
      <Stats />
      <LogoRow />
      <Testimonial />
      <Cta />
      <SiteFooter />
    </StateFrame>
  );
}

export default function Page() {
  return (
    <VariantSwitcher
      variants={[
        {
          id: "a",
          name: "Proof-first",
          bet: "Skeptical ops buyers — evidence before capability claims",
          Component: VariantProofFirst,
        },
        {
          id: "b",
          name: "Product-first",
          bet: "Referred visitors — they came to see what it does",
          Component: VariantProductFirst,
        },
      ]}
    />
  );
}
