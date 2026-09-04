import type { WikiArticle } from "../types";

export const independenceSetTheory: WikiArticle = {
  conceptId: "independence-set-theory",
  summary:
    "Two events are independent when knowing one occurred tells you nothing about the other. The definition is multiplicative — $P(A \\cap B) = P(A)P(B)$ — rather than set-theoretic, and that matters: independence is a property of the probability measure, not of how the sets overlap. Two events can look entirely unrelated as sets and be dependent, or overlap heavily and be independent.",
  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "A \\perp\\!\\!\\!\\perp B \\iff P(A \\cap B) = P(A)\\,P(B)",
          caption: "Independence of two events",
        },
        {
          kind: "prose",
          text: "When $P(B) > 0$ this is equivalent to $P(A \\mid B) = P(A)$ — conditioning on $B$ leaves your assessment of $A$ unchanged. The multiplicative form is preferred as the definition because it is symmetric in $A$ and $B$ and stays meaningful when $P(B) = 0$, where the conditional form is undefined.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Independent and disjoint are near opposites",
          text: "Disjoint events satisfy $P(A \\cap B) = 0$. If they were also independent, $P(A)P(B) = 0$, forcing one of them to be impossible. So for any two events with positive probability, disjointness and independence cannot both hold. Intuitively: if $A$ and $B$ cannot co-occur, learning $A$ happened tells you $B$ definitely did not — which is as informative as it gets.",
        },
      ],
    },
    {
      heading: "Independence is about the measure, not the sets",
      blocks: [
        {
          kind: "example",
          title: "The same sets, two different answers",
          problem:
            "Draw one card from a standard deck. Is \"the card is an ace\" independent of \"the card is a spade\"?",
          steps: [
            "$P(\\text{ace}) = 4/52 = 1/13$ and $P(\\text{spade}) = 13/52 = 1/4$.",
            "$P(\\text{ace} \\cap \\text{spade}) = 1/52$ — exactly one ace of spades.",
            "$P(\\text{ace})P(\\text{spade}) = (1/13)(1/4) = 1/52$. ✓ Independent.",
            "Now remove the two red aces from the deck, leaving 50 cards. $P(\\text{ace}) = 2/50$, $P(\\text{spade}) = 13/50$, $P(\\text{both}) = 1/50$.",
            "$(2/50)(13/50) = 26/2500 = 0.0104$, but $1/50 = 0.02$. ✗ Now dependent.",
          ],
          answer:
            "Independent in a full deck, dependent after removing two cards — with the events defined identically. Independence is a numerical coincidence of the measure, not a structural feature.",
        },
      ],
    },
    {
      heading: "Consequences",
      blocks: [
        {
          kind: "prose",
          text: "If $A$ and $B$ are independent, so are the pairs formed by complementing either or both: $A^{c} \\perp\\!\\!\\!\\perp B$, $A \\perp\\!\\!\\!\\perp B^{c}$, and $A^{c} \\perp\\!\\!\\!\\perp B^{c}$. This is what licenses the standard \"at least one\" computation.",
        },
        {
          kind: "formula",
          latex: "P(\\text{at least one of } A_1,\\ldots,A_n) = 1 - \\prod_{i=1}^{n}\\big(1 - P(A_i)\\big)",
          caption: "For independent events — complement, multiply, complement back",
        },
        {
          kind: "example",
          title: "At least one",
          problem:
            "A component fails on any given day with probability $0.02$, independently across days. What is the chance of at least one failure in 30 days?",
          steps: [
            "Direct summation would require counting every pattern of failures — 30 terms, and inclusion–exclusion beyond that.",
            "Complement instead: no failure on a given day has probability $0.98$.",
            "Independence lets these multiply: $P(\\text{no failures}) = 0.98^{30}$.",
            "$0.98^{30} \\approx 0.5455$.",
            "$P(\\text{at least one}) = 1 - 0.5455 = 0.4545$.",
          ],
          answer: "About $45.5\\%$.",
        },
      ],
    },
    {
      heading: "Conditional independence",
      blocks: [
        {
          kind: "formula",
          latex: "P(A \\cap B \\mid C) = P(A \\mid C)\\,P(B \\mid C)",
          caption: "$A$ and $B$ are conditionally independent given $C$",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Neither form implies the other",
          text: "Conditional independence does not follow from independence, and independence does not follow from conditional independence. Ice cream sales and drowning deaths are dependent, but conditionally independent given temperature — a shared cause creating spurious association. Conversely two independent coin flips become dependent given their sum: knowing the total is 1 makes the flips perfectly anti-correlated. This is Berkson's paradox, and it is the reason conditioning on a collider introduces bias.",
        },
      ],
    },
  ],
  references: [
    { source: "Blitzstein & Hwang, Introduction to Probability", locator: "Ch. 2.5, 2.8" },
    { source: "Casella & Berger, Statistical Inference", locator: "§1.3.4" },
    { source: "Pearl, Causality", locator: "Ch. 1.2 (conditional independence and colliders)" },
    { source: "Mathlingo assessment bank", locator: "assessments/foundations-of-probability.md" },
  ],
};
