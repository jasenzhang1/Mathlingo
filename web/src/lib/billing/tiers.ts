/**
 * Subscription tiers.
 *
 * Mirrors `supabase/functions/_shared/entitlement.ts` and the `tier_rank`
 * function in migration 0004. The duplication is deliberate: the client copy
 * decides what to *show*, the server copy decides what to *allow*, and the
 * server must be able to enforce entitlement without trusting anything the
 * browser sends. If they ever disagree, the server wins and the user sees a
 * paywall where a button should have been — annoying, but never the reverse.
 */

export type Tier = "free" | "graded" | "tutored";

export type Entitlement = "ai-grading" | "ai-tutor";

const RANK: Record<Tier, number> = { free: 0, graded: 1, tutored: 2 };

/** Minimum tier that unlocks each capability. */
const REQUIRED: Record<Entitlement, Tier> = {
  "ai-grading": "graded",
  "ai-tutor": "tutored",
};

export function hasEntitlement(tier: Tier, entitlement: Entitlement): boolean {
  return RANK[tier] >= RANK[REQUIRED[entitlement]];
}

export function tierFor(entitlement: Entitlement): Tier {
  return REQUIRED[entitlement];
}

export interface TierPlan {
  id: Tier;
  name: string;
  /** Display only — the real amount lives in the Stripe price. */
  priceLabel: string;
  tagline: string;
  features: string[];
  /** Things this tier explicitly does not include, so the ladder is legible. */
  excludes?: string[];
}

export const PLANS: TierPlan[] = [
  {
    id: "free",
    name: "Free",
    priceLabel: "$0",
    tagline: "The whole curriculum, and everything that can be graded exactly.",
    features: [
      "All 247 concepts, slides and wiki",
      "Multiple-choice and numeric assessment",
      "Proficiency tracking and spaced review",
      "Forums — ask, answer, post problems",
    ],
    excludes: ["Written, handwritten, and spoken answers", "AI tutor"],
  },
  {
    id: "graded",
    name: "Graded",
    priceLabel: "$8",
    tagline: "Explain your reasoning and have it marked properly.",
    features: [
      "Everything in Free",
      "AI grading of written answers, against a rubric",
      "Per-element feedback on why you scored what you scored",
      "Handwritten answers — draw or photograph your work",
      "Spoken answers, transcribed in your browser",
    ],
    excludes: ["AI tutor"],
  },
  {
    id: "tutored",
    name: "Tutored",
    priceLabel: "$15",
    tagline: "A sparring partner for every concept.",
    features: [
      "Everything in Graded",
      "AI tutor on every lesson",
      "Quiz mode — it asks, you answer, it pushes back",
      "Corrections that name the specific error",
      "Saved notes from any explanation",
    ],
  },
];

export const PAID_PLANS = PLANS.filter((p) => p.id !== "free");
