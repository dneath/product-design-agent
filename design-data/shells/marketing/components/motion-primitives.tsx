"use client";

import { motion, useReducedMotion } from "motion/react";

/*
 * Motion primitives within doctrine: ease-out only, ≤300ms, transform/opacity
 * only, enters from ≥0.95 scale equivalent (small translate), stagger
 * 40–60ms/item, one-shot on scroll into view, gentler (not zero) under
 * prefers-reduced-motion.
 */

const EASE_OUT = [0.215, 0.61, 0.355, 1] as const;

export function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.25, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Staggered children: pass an index per child via <FadeIn delay={i * 0.05}>. */
export function Stagger({
  items,
  render,
  className,
}: {
  items: readonly unknown[];
  render: (item: never, i: number) => React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      {items.map((item, i) => (
        <FadeIn key={i} delay={i * 0.05}>
          {render(item as never, i)}
        </FadeIn>
      ))}
    </div>
  );
}
