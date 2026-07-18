/**
 * Fixtures — portfolio content for a fictional product designer.
 * Replace with the real person/work; keep titles/blurbs specific.
 */

export const owner = {
  name: "Noor El-Amin",
  role: "Product designer — ops tools & data-heavy interfaces",
  intro:
    "I design the screens people stare at during a bad shift: exception queues, dispatch boards, on-call dashboards. Currently at Meridian; previously freight-forwarding software and a hospital rostering system.",
  email: "noor@example-portfolio.design",
};

export interface WorkItem {
  slug: string;
  title: string;
  year: string;
  blurb: string;
  tags: string[];
  published: boolean;
}

export const work: WorkItem[] = [
  {
    slug: "harborline",
    title: "Harborline — exception triage that survives a container ship",
    year: "2026",
    blurb:
      "Redesigning a fulfilment exception queue from a 14-column table into a severity-first triage flow. Median time-to-first-action fell from 11 to 4 minutes.",
    tags: ["ops tooling", "design system", "research"],
    published: true,
  },
  {
    slug: "rosterworks",
    title: "RosterWorks — hospital shift handover, minus the whiteboard photo",
    year: "2025",
    blurb:
      "A handover view nurses actually trusted, built around the questions asked at 06:55 — who's short, who's new, which beds turned overnight — rather than the HR system's data model, which optimized for payroll codes nobody on the ward had ever seen.",
    tags: ["healthcare", "mobile", "field study"],
    published: true,
  },
  {
    slug: "freightdesk",
    title: "FreightDesk 🚢 quoting console",
    year: "2024",
    blurb:
      "Case study in progress — quote building for freight forwarders across 4 RTL and LTR locales.",
    tags: ["i18n", "RTL", "طلبات الشحن"],
    published: false,
  },
];
