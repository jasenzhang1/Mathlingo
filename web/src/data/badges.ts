export type BadgeTier = "bronze" | "silver" | "gold";

/** The contributor stat a badge is measured against. */
export type BadgeMetric =
  | "submissions"
  | "upvotes"
  | "pinned"
  | "topics"
  | "reputation";

export interface Badge {
  id: string;
  name: string;
  description: string;
  tier: BadgeTier;
  icon: string;
  metric: BadgeMetric;
  threshold: number;
}

export const badges: Badge[] = [
  {
    id: "first-card",
    name: "First Card",
    description: "Submit your first question and answer to the community deck.",
    tier: "bronze",
    icon: "✎",
    metric: "submissions",
    threshold: 1,
  },
  {
    id: "deck-builder",
    name: "Deck Builder",
    description: "Write three cards the rest of us can drill.",
    tier: "bronze",
    icon: "◈",
    metric: "submissions",
    threshold: 3,
  },
  {
    id: "well-explained",
    name: "Well Explained",
    description: "Collect 10 upvotes across your answers.",
    tier: "silver",
    icon: "★",
    metric: "upvotes",
    threshold: 10,
  },
  {
    id: "polymath",
    name: "Polymath",
    description: "Contribute cards to three different subjects.",
    tier: "silver",
    icon: "⬡",
    metric: "topics",
    threshold: 3,
  },
  {
    id: "pinned",
    name: "Pinned",
    description: "Write a card the community pins to the top of the board.",
    tier: "silver",
    icon: "⚑",
    metric: "pinned",
    threshold: 1,
  },
  {
    id: "gold-standard",
    name: "Gold Standard",
    description: "Reach 150 reputation from your contributions.",
    tier: "gold",
    icon: "◆",
    metric: "reputation",
    threshold: 150,
  },
];
