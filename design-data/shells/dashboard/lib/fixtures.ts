/**
 * Fixtures — fulfillment-operations domain. Replace the domain with the
 * prototype's; keep the hardening extremes (0/1/typical/1,000+ items,
 * 100+ char strings, emoji/RTL).
 */

export interface Kpi {
  label: string;
  value: string;
  delta: number; // percentage points vs previous period
  deltaLabel: string;
}

export const kpis: Kpi[] = [
  { label: "On-time dispatch", value: "94.2%", delta: 1.8, deltaLabel: "vs last week" },
  { label: "Open exceptions", value: "37", delta: -12.4, deltaLabel: "vs last week" },
  { label: "Avg dock dwell", value: "41 min", delta: 6.1, deltaLabel: "vs last week" },
  { label: "Orders in flight", value: "1,283", delta: 3.2, deltaLabel: "vs last week" },
];

export interface DayThroughput {
  date: string; // ISO day
  shipped: number;
  target: number;
}

export const throughput14d: DayThroughput[] = [
  { date: "2026-07-04", shipped: 1180, target: 1250 },
  { date: "2026-07-05", shipped: 940, target: 900 },
  { date: "2026-07-06", shipped: 720, target: 900 },
  { date: "2026-07-07", shipped: 1310, target: 1250 },
  { date: "2026-07-08", shipped: 1275, target: 1250 },
  { date: "2026-07-09", shipped: 1402, target: 1250 },
  { date: "2026-07-10", shipped: 1218, target: 1250 },
  { date: "2026-07-11", shipped: 993, target: 900 },
  { date: "2026-07-12", shipped: 748, target: 900 },
  { date: "2026-07-13", shipped: 1361, target: 1250 },
  { date: "2026-07-14", shipped: 1289, target: 1250 },
  { date: "2026-07-15", shipped: 1174, target: 1250 },
  { date: "2026-07-16", shipped: 1432, target: 1250 },
  { date: "2026-07-17", shipped: 611, target: 1250 }, // today, partial
];

export interface CarrierShare {
  carrier: string;
  orders: number;
}

export const carrierShare: CarrierShare[] = [
  { carrier: "Lindqvist Freight", orders: 4820 },
  { carrier: "TransPolar Express", orders: 3105 },
  { carrier: "Cargolux Direct", orders: 1988 },
  { carrier: "شركة النقل السريع", orders: 1240 }, // RTL carrier name
  { carrier: "Yamato 🚚 Partners", orders: 640 }, // emoji
];

export type Severity = "critical" | "high" | "medium" | "low";

export interface ExceptionRow {
  id: string;
  order: string;
  customer: string;
  carrier: string;
  issue: string;
  ageHours: number;
  severity: Severity;
}

export const exceptions: ExceptionRow[] = [
  {
    id: "EX-4117",
    order: "ORD-88213",
    customer: "Beaumont & Fils Épicerie Fine",
    carrier: "TransPolar Express",
    issue: "Customs hold — missing HS code on 3 line items",
    ageHours: 52,
    severity: "critical",
  },
  {
    id: "EX-4121",
    order: "ORD-88377",
    customer: "Nordwind Outdoor GmbH",
    carrier: "Lindqvist Freight",
    issue:
      "Address validation failed: recipient reported the building was renumbered during the 2025 municipal reform and the carrier's geocoder still resolves to the old plot on the opposite side of the street",
    ageHours: 29,
    severity: "high",
  },
  {
    id: "EX-4125",
    order: "ORD-88402",
    customer: "مخازن الأمل التجارية",
    carrier: "شركة النقل السريع",
    issue: "Damaged outer carton flagged at hub scan",
    ageHours: 8,
    severity: "medium",
  },
  {
    id: "EX-4126",
    order: "ORD-88419",
    customer: "Sakura 🌸 Living Store",
    carrier: "Yamato 🚚 Partners",
    issue: "Temperature excursion 2.4°C above range for 40 min",
    ageHours: 6,
    severity: "high",
  },
  {
    id: "EX-4130",
    order: "ORD-88433",
    customer: "Tallgrass Supply Co.",
    carrier: "Cargolux Direct",
    issue: "Label reprint requested",
    ageHours: 1,
    severity: "low",
  },
];

/** 1,000+ rows for overflow/pagination checks. */
export const manyExceptions: ExceptionRow[] = Array.from(
  { length: 1042 },
  (_, i) => {
    const base = exceptions[i % exceptions.length];
    return {
      ...base,
      id: `EX-${5000 + i}`,
      order: `ORD-${90000 + i}`,
      ageHours: (i * 7) % 96,
    };
  },
);
