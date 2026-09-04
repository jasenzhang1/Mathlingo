import type { WikiArticle } from "./types";

export const equivalenceTestingWiki: WikiArticle = {
  conceptId: "equivalence-testing",
  summary:
    "Failing to reject a null establishes nothing — an underpowered study fails to reject almost " +
    "everything. When you need positive evidence that an effect is negligible, the test has to be " +
    "restructured so that \"negligible\" is what gets rejected against. That is equivalence testing, " +
    "and its central requirement is a margin chosen before the data arrives.",

  sections: [
    {
      heading: "Reversing the burden of proof",
      blocks: [
        {
          kind: "prose",
          text:
            "A standard test assumes no effect and looks for evidence against it, so the conclusion " +
            "it can reach is \"there is an effect.\" Equivalence testing inverts the hypotheses: the " +
            "null becomes \"the effect is at least as large as Δ\" and the alternative becomes \"the " +
            "effect is smaller than Δ.\" Rejecting that null is positive evidence of negligibility.",
        },
        {
          kind: "formula",
          latex: "H₀: |θ| ≥ Δ      versus      H₁: |θ| < Δ",
          caption: "Δ is the equivalence margin — the smallest effect that would matter",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The margin cannot come from the data",
          text:
            "Δ is a statement about what matters in the domain — the smallest lift worth shipping, " +
            "the largest bioequivalence deviation regulators accept. Choosing it after seeing the " +
            "estimate turns the procedure into a way of confirming whatever you found.",
        },
      ],
    },

    {
      heading: "TOST: two one-sided tests",
      blocks: [
        {
          kind: "prose",
          text:
            "The standard implementation runs two one-sided tests, each at level α: one against " +
            "θ ≤ −Δ and one against θ ≥ +Δ. Equivalence is concluded only if both are rejected. " +
            "Despite running two tests, no multiplicity correction is needed — both must reject, so " +
            "the procedure's error rate is at most α rather than inflated by it.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "TOST is equivalent to an interval check",
          text:
            "Rejecting both one-sided tests at level α is exactly the statement that the " +
            "(1 − 2α) confidence interval for θ lies entirely inside (−Δ, +Δ). So a 90% interval " +
            "falling wholly within the margin establishes equivalence at α = 0.05. Reporting the " +
            "interval against the margin communicates the same conclusion more legibly than a p-value.",
        },
      ],
    },

    {
      heading: "The four possible outcomes",
      blocks: [
        {
          kind: "prose",
          text:
            "Running a conventional test and an equivalence test together gives a richer set of " +
            "conclusions than either alone, because they ask different questions and can both fail.",
        },
        {
          kind: "table",
          headers: ["Difference test", "Equivalence test", "Conclusion"],
          rows: [
            ["Rejects", "Fails", "There is an effect, and it may be large enough to matter"],
            ["Fails", "Rejects", "Any effect is too small to matter — the useful null result"],
            ["Fails", "Fails", "Inconclusive: the study cannot distinguish a real effect from none"],
            ["Rejects", "Rejects", "Statistically detectable but practically negligible — common at very large n"],
          ],
        },
        {
          kind: "prose",
          text:
            "The last row is the one that surprises people and the one large datasets produce " +
            "routinely: an effect precisely measured, provably non-zero, and provably too small to " +
            "act on. It is a coherent and useful finding, and no conventional test can express it.",
        },
      ],
    },

    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Establishing that a change did no harm",
          problem:
            "A refactor is expected to leave conversion unchanged; anything worse than a 0.5 " +
            "percentage point drop would matter. The observed difference is −0.05 points with a " +
            "standard error of 0.15. Can we claim equivalence at α = 0.05?",
          steps: [
            "Margin Δ = 0.5 points, set before the experiment.",
            "TOST at α = 0.05 corresponds to checking the 90% interval.",
            "90% interval: −0.05 ± 1.645(0.15) = [−0.30, 0.20].",
            "That interval lies entirely inside (−0.5, +0.5).",
          ],
          answer:
            "Equivalence established: the data supports the claim that any effect is smaller than " +
            "half a point. Note the conventional test would also fail to reject zero here — but that " +
            "alone would not have licensed the claim.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Equivalence usually needs more data than detection",
          text:
            "The margin is typically smaller than the effect you would have hunted for, and the " +
            "interval must fit entirely inside it rather than merely exclude a point. Sizing a study " +
            "to prove negligibility is a different and often larger calculation than sizing it to " +
            "detect an effect.",
        },
      ],
    },
  ],

  references: [
    { source: "Wasserman, All of Statistics", locator: "Ch. 10, Hypothesis Testing and p-values" },
    { source: "Casella & Berger, Statistical Inference (2nd ed.)", locator: "Ch. 8–9, testing and interval estimation" },
    { source: "Mathlingo assessment bank", locator: "assessments/beyond-a-single-comparison.md" },
  ],
};
