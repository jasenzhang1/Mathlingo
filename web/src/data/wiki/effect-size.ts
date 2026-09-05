import type { WikiArticle } from "./types";

export const effectSizeWiki: WikiArticle = {
  conceptId: "effect-size",
  summary:
    "An effect size measures how large a difference is on a scale that does not grow with the " +
    "sample. That is the property a p-value lacks: with enough data any non-zero difference becomes " +
    "significant, so significance stops distinguishing important effects from trivial ones. The " +
    "effect size is what carries the answer to the question a decision actually needs.",

  sections: [
    {
      heading: "Why a p-value cannot do this job",
      blocks: [
        {
          kind: "prose",
          text:
            "A test statistic is roughly (effect) / (standard error), and the standard error shrinks " +
            "like 1/√n. So the same fixed effect produces a larger statistic and a smaller p-value " +
            "purely by collecting more data. The p-value confounds how big the effect is with how " +
            "precisely it was measured, and cannot be decomposed back into the two.",
        },
        {
          kind: "example",
          title: "One effect, two verdicts",
          problem:
            "A treatment moves conversion from 10.00% to 10.05%. What is the p-value at n = 1,000 " +
            "per arm, and at n = 10,000,000 per arm?",
          steps: [
            "At n = 1,000: SE of the difference ≈ 0.0134, so z ≈ 0.037 and p ≈ 0.97.",
            "At n = 10,000,000: SE ≈ 0.000134, so z ≈ 3.7 and p ≈ 0.0002.",
          ],
          answer:
            "The same commercially worthless 0.05-point effect is reported as nothing and as highly " +
            "significant. The effect size — 0.05 points, a 0.5% relative lift — is identical in both " +
            "and is the only number that answers whether to ship.",
        },
      ],
    },

    {
      heading: "The standard measures",
      blocks: [
        {
          kind: "table",
          headers: ["Measure", "Definition", "Used for"],
          rows: [
            ["Raw difference", "x̄₁ − x̄₂, in the data's own units", "When the units are meaningful — grams, dollars, percentage points"],
            ["Cohen's d", "(x̄₁ − x̄₂) / s_pooled", "Comparing across studies with different measurement scales"],
            ["Relative lift", "(p̂₁ − p̂₂) / p̂₂", "Rates, where a point of lift means different things at different baselines"],
            ["Risk ratio / odds ratio", "p₁/p₂ or the odds equivalent", "Epidemiology and any rare-event setting"],
            ["r or R²", "Correlation, or variance explained", "Association rather than a group difference"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Prefer the raw difference when the units mean something",
          text:
            "Standardised measures exist to make incomparable scales comparable. If your outcome is " +
            "already in dollars or percentage points, standardising throws away the interpretability " +
            "you had. Cohen's d earns its place in meta-analysis, not in a product readout.",
        },
        {
          kind: "prose",
          text:
            "Cohen's conventional labels — 0.2 small, 0.5 medium, 0.8 large — are a fallback for when " +
            "you have no domain knowledge, and were never meant to substitute for it. A d of 0.1 in a " +
            "cheap intervention deployed to millions can be worth far more than a d of 0.9 in an " +
            "expensive one.",
        },
      ],
    },

    {
      heading: "What to report",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "The effect size, in units a reader can act on.",
            "A confidence interval for it, which shows the precision.",
            "The threshold of practical importance, ideally set before the data arrived.",
          ],
        },
        {
          kind: "prose",
          text:
            "Those three together answer the decision. \"+0.4 points, 95% CI [0.05, 0.75], and we " +
            "ship above 0.2\" is a complete report; \"p = 0.03\" is not, and neither is \"+0.4 " +
            "points\" alone. The interval is what separates a well-measured small effect from an " +
            "unmeasured large one.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Effect sizes from underpowered studies are inflated",
          text:
            "Significance requires the estimate to clear roughly two standard errors. When power is " +
            "low, only samples where noise pushed the estimate upward clear that bar, so published " +
            "effects from small studies are systematically too large. Report the effect size whether " +
            "or not the test was significant — that is part of what stops the filter from operating.",
        },
      ],
    },
  ],

  references: [
    { source: "Wasserman, All of Statistics", locator: "Ch. 10, Hypothesis Testing and p-values" },
    { source: "Hastie, Tibshirani & Friedman, ESL", locator: "Ch. 7, model assessment" },
    { source: "Mathlingo assessment bank", locator: "assessments/beyond-a-single-comparison.md" },
  ],
};
