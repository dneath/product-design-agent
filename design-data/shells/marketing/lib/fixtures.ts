/**
 * Fixtures — marketing content for a fictional but plausible product.
 * Replace with the prototype's actual positioning; keep copy specific
 * (no filler marketing verbs, no vanity numbers).
 */

export const product = {
  name: "Meridian",
  tagline: "See every shipment before it becomes a support ticket",
  subline:
    "Meridian connects your warehouse, carriers, and storefront into one live view — so exceptions surface in minutes, not after the customer emails.",
  primaryCta: "Start a pilot",
  secondaryCta: "Watch a 4-minute demo",
};

export const customers = [
  "Nordwind Outdoor",
  "Beaumont & Fils",
  "Tallgrass Supply",
  "Sakura Living",
  "Cargolux Direct",
  "مخازن الأمل", // RTL
];

export interface Feature {
  title: string;
  body: string;
}

export const features: Feature[] = [
  {
    title: "Exception detection",
    body: "Customs holds, address failures, and temperature excursions are flagged from carrier scans — before the delivery window slips.",
  },
  {
    title: "Carrier scorecards",
    body: "On-time rates and dwell times per carrier and lane, computed from your own volumes rather than industry averages.",
  },
  {
    title: "Customer-safe status pages",
    body: "A shareable tracking page that says what actually happened and what happens next, in the customer's language.",
  },
  {
    title: "Warehouse feeds in an afternoon",
    body: "CSV drop, SFTP poll, or webhook — the first feed connects without an engineering sprint, including the messy legacy WMS export nobody wants to touch.",
  },
];

export const testimonial = {
  quote:
    "We found out about a customs hold on a 214-carton order while the container was still in the terminal. Last year we'd have learned from an angry email two weeks later — after the retailer had already cancelled the reorder and we'd paid for airfreight replacements.",
  name: "Ingrid Skovgaard",
  role: "Head of Fulfilment, Nordwind Outdoor",
};

export const stats = [
  { value: "38 min", label: "median time to exception flag" },
  { value: "12", label: "carrier integrations maintained for you" },
  { value: "1.4%", label: "average WISMO-ticket rate after 90 days" },
];
