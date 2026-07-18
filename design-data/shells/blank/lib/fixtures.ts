/**
 * Fixtures — realistic data only, including the hardening extremes:
 * 0 / 1 / typical / 1,000+ items; 100+ char strings; emoji/RTL.
 * Replace the domain with the prototype's actual domain; keep the extremes.
 */

export interface Member {
  id: string;
  name: string;
  email: string;
  role: "Owner" | "Editor" | "Viewer";
  lastActive: string; // ISO date
}

export const members: Member[] = [
  {
    id: "m-01",
    name: "Priya Raghunathan",
    email: "priya.raghunathan@meridianlabs.io",
    role: "Owner",
    lastActive: "2026-07-16T14:22:00Z",
  },
  {
    id: "m-02",
    name: "Jakob Skovgaard-Petersen",
    email: "jakob.sp@meridianlabs.io",
    role: "Editor",
    lastActive: "2026-07-17T08:03:00Z",
  },
  {
    id: "m-03",
    name: "Fernanda Araújo de Oliveira Santos e Silva de Albuquerque Cavalcanti", // 100+ chars with the email
    email: "fernanda.araujo.de.oliveira.santos@subsidiary.meridianlabs-southamerica-operations.com.br",
    role: "Viewer",
    lastActive: "2026-05-02T19:41:00Z",
  },
  {
    id: "m-04",
    name: "لينا الخطيب", // RTL
    email: "lina.alkhatib@meridianlabs.io",
    role: "Editor",
    lastActive: "2026-07-15T11:19:00Z",
  },
  {
    id: "m-05",
    name: "Momo 🐈 Nakamura", // emoji
    email: "momo.nakamura@meridianlabs.io",
    role: "Viewer",
    lastActive: "2026-07-11T22:47:00Z",
  },
];

/** Single-item edge case. */
export const singleMember: Member[] = [members[0]];

/** 1,000+ items for overflow/virtualization checks. */
export const manyMembers: Member[] = Array.from({ length: 1207 }, (_, i) => {
  const base = members[i % members.length];
  return {
    ...base,
    id: `m-${String(i + 10).padStart(4, "0")}`,
    email: base.email.replace("@", `+${i}@`),
  };
});
