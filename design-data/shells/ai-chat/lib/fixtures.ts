/**
 * Fixtures — assistant conversations for a support/ops copilot.
 * Replace the domain; keep extremes (long/RTL/emoji content, many threads).
 */

export interface Thread {
  id: string;
  title: string;
  updatedAt: string; // ISO
}

export const threads: Thread[] = [
  { id: "t-01", title: "Draft reply: customs hold on ORD-88213", updatedAt: "2026-07-17T13:58:00Z" },
  { id: "t-02", title: "Why did on-time dispatch dip last Thursday?", updatedAt: "2026-07-17T09:12:00Z" },
  {
    id: "t-03",
    title:
      "Summarize every exception involving temperature-controlled lanes between the Rotterdam hub and southern Germany since the carrier switch in March", // 100+ chars
    updatedAt: "2026-07-16T16:40:00Z",
  },
  { id: "t-04", title: "ترجمة تحديث الشحنة للعميل", updatedAt: "2026-07-15T11:02:00Z" }, // RTL
  { id: "t-05", title: "Weekly ops digest 📦 w/ carrier scores", updatedAt: "2026-07-14T07:30:00Z" }, // emoji
];

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export const conversation: Message[] = [
  {
    id: "m-01",
    role: "user",
    content:
      "Customer Beaumont & Fils is asking about ORD-88213. What do I tell them?",
  },
  {
    id: "m-02",
    role: "assistant",
    content:
      "ORD-88213 has been in customs at Le Havre for 52 hours — three line items are missing HS codes. Suggested reply:\n\n“Your order arrived in France on 15 July and is completing a customs check. We've supplied the missing paperwork today; based on current processing times it should clear within 1–2 business days. Your delivery window moves to 22–24 July, and we'll confirm the moment it clears.”\n\nWant me to also open a task for the broker to add the HS codes?",
  },
  {
    id: "m-03",
    role: "user",
    content: "Yes — and make the tone a bit less formal.",
  },
];

/** Canned assistant reply used by the mock streamer. */
export const streamedReply =
  "Done — task BRK-2291 opened for the broker with the three affected line items attached.\n\nLooser version:\n\n“Quick update on your order — it landed in France on 15 July and is just finishing a customs check. We sent over the missing paperwork today, so it should be moving again within a couple of business days. New delivery window: 22–24 July. We'll ping you the moment it clears — sorry for the wait!”";

export const models = [
  { id: "meridian-fast", label: "Meridian Fast" },
  { id: "meridian-deep", label: "Meridian Deep" },
  { id: "meridian-draft", label: "Meridian Draft (beta)" },
];
