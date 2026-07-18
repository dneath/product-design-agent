"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn, Stagger } from "@/components/motion-primitives";
import {
  customers,
  features,
  product,
  stats,
  testimonial,
  type Feature,
} from "@/lib/fixtures";

/* Marketing sections — swap copy via lib/fixtures.ts; keep the structure. */

export function SiteNav() {
  return (
    <nav
      aria-label="Site"
      className="border-b border-border-soft bg-background"
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-6 px-4">
        <a href="#" className="flex items-center gap-2 font-semibold">
          <span className="flex size-6 items-center justify-center rounded-sm bg-primary font-mono text-xs font-bold text-primary-foreground">
            M
          </span>
          {product.name}
        </a>
        <div className="ml-auto flex items-center gap-1 text-sm max-sm:hidden">
          {["Product", "Pricing", "Docs"].map((l) => (
            <a
              key={l}
              href="#"
              className="rounded-sm px-3 py-1.5 text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
            >
              {l}
            </a>
          ))}
        </div>
        <Button size="sm">{product.primaryCta}</Button>
      </div>
    </nav>
  );
}

export function Hero({ centered = true }: { centered?: boolean }) {
  return (
    <section className={centered ? "px-4 py-20 text-center sm:py-28" : "px-4 py-20 sm:py-28"}>
      <div className={centered ? "mx-auto max-w-3xl" : "mx-auto max-w-5xl"}>
        <FadeIn>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {product.tagline}
          </h1>
        </FadeIn>
        <FadeIn delay={0.05}>
          <p
            className={
              "mt-5 max-w-xl text-lg text-muted-foreground" +
              (centered ? " mx-auto" : "")
            }
          >
            {product.subline}
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div
            className={
              "mt-8 flex flex-wrap gap-3" + (centered ? " justify-center" : "")
            }
          >
            <Button size="lg">
              {product.primaryCta}
              <ArrowRight aria-hidden />
            </Button>
            <Button size="lg" variant="ghost">
              {product.secondaryCta}
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export function LogoRow() {
  return (
    <section aria-label="Customers" className="border-y border-border-soft py-8">
      <ul className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-4">
        {customers.map((c) => (
          <li key={c} className="text-sm font-medium text-muted-foreground">
            {c}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function FeatureGrid() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:py-24">
      <FadeIn>
        <h2 className="max-w-xl text-2xl font-semibold tracking-tight sm:text-3xl">
          Built for the week the container is late
        </h2>
      </FadeIn>
      <Stagger
        className="mt-10 grid gap-4 sm:grid-cols-2"
        items={features}
        render={(f: Feature) => (
          <Card className="h-full">
            <CardContent className="space-y-2">
              <h3 className="font-medium">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.body}</p>
            </CardContent>
          </Card>
        )}
      />
    </section>
  );
}

export function Stats() {
  return (
    <section className="border-y border-border-soft">
      <dl className="mx-auto grid max-w-5xl gap-8 px-4 py-12 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label}>
            <dt className="text-sm text-muted-foreground">{s.label}</dt>
            <dd className="mt-1 font-mono text-3xl font-semibold tabular-nums tracking-tight">
              {s.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function Testimonial() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:py-24">
      <FadeIn>
        <figure>
          <blockquote className="text-xl leading-relaxed font-medium">
            “{testimonial.quote}”
          </blockquote>
          <figcaption className="mt-6 text-sm text-muted-foreground">
            {testimonial.name} — {testimonial.role}
          </figcaption>
        </figure>
      </FadeIn>
    </section>
  );
}

export function Cta() {
  return (
    <section className="mx-auto max-w-5xl px-4 pb-20">
      <FadeIn>
        <Card className="bg-secondary">
          <CardContent className="flex flex-wrap items-center justify-between gap-4 py-10">
            <div>
              <h2 className="text-xl font-semibold">
                Run a two-week pilot on one lane
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Connect a single warehouse feed and see your own exceptions —
                not a canned demo dataset.
              </p>
            </div>
            <Button size="lg">{product.primaryCta}</Button>
          </CardContent>
        </Card>
      </FadeIn>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border-soft py-10 text-sm text-muted-foreground">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4">
        <span>
          © 2026 {product.name} Logistics ApS — Copenhagen · Rotterdam
        </span>
        <div className="flex gap-6">
          {["Privacy", "Terms", "Status"].map((l) => (
            <a
              key={l}
              href="#"
              className="rounded-sm outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
