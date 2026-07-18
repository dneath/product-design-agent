/**
 * Fixtures — workspace/org domain for a B2B SaaS. Replace the domain;
 * keep the hardening extremes (0/1/typical/1,000+, 100+ chars, emoji/RTL).
 */

export type Role = "admin" | "member" | "viewer";

export interface OrgMember {
  id: string;
  name: string;
  email: string;
  role: Role;
  joined: string; // ISO date
}

export const org = {
  name: "Meridian Logistics ApS",
  slug: "meridian-ops",
  plan: "Scale",
  seatsUsed: 14,
  seatsIncluded: 20,
};

export const orgMembers: OrgMember[] = [
  {
    id: "u-01",
    name: "Priya Raghunathan",
    email: "priya.raghunathan@meridianlabs.io",
    role: "admin",
    joined: "2024-11-03",
  },
  {
    id: "u-02",
    name: "Jakob Skovgaard-Petersen",
    email: "jakob.sp@meridianlabs.io",
    role: "member",
    joined: "2025-02-17",
  },
  {
    id: "u-03",
    name: "Fernanda Araújo de Oliveira Santos e Silva de Albuquerque Cavalcanti",
    email:
      "fernanda.araujo.de.oliveira.santos@subsidiary.meridianlabs-southamerica-operations.com.br",
    role: "member",
    joined: "2025-06-30",
  },
  {
    id: "u-04",
    name: "لينا الخطيب", // RTL
    email: "lina.alkhatib@meridianlabs.io",
    role: "viewer",
    joined: "2026-01-12",
  },
  {
    id: "u-05",
    name: "Momo 🐈 Nakamura", // emoji
    email: "momo.nakamura@meridianlabs.io",
    role: "viewer",
    joined: "2026-05-24",
  },
];

export interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: "paid" | "due" | "failed";
}

export const invoices: Invoice[] = [
  { id: "INV-2607", date: "2026-07-01", amount: "€490.00", status: "due" },
  { id: "INV-2606", date: "2026-06-01", amount: "€490.00", status: "paid" },
  { id: "INV-2605", date: "2026-05-01", amount: "€490.00", status: "paid" },
  { id: "INV-2604", date: "2026-04-01", amount: "€460.00", status: "failed" },
  { id: "INV-2603", date: "2026-03-01", amount: "€460.00", status: "paid" },
];

export const plans = [
  {
    name: "Starter",
    price: "€120/mo",
    blurb: "One warehouse feed, 3 seats, 30-day history.",
    current: false,
  },
  {
    name: "Scale",
    price: "€490/mo",
    blurb: "Unlimited feeds, 20 seats, 13-month history, carrier scorecards.",
    current: true,
  },
  {
    name: "Network",
    price: "Talk to us",
    blurb: "Multi-entity orgs, SSO/SCIM, dedicated data residency.",
    current: false,
  },
];
