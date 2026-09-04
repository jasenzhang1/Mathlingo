import type { WikiArticle } from "./types";

export const typeIIIErrorWiki: WikiArticle = {
  conceptId: "type-i-ii-error",
  summary:
    "A test can go wrong in two ways: rejecting a true null (Type I, rate α) or failing to reject a " +
    "false one (Type II, rate β). Power is 1 − β. The two rates trade off at fixed sample size, so " +
    "choosing α is a decision about which error is more costly — a question about consequences, not " +
    "about statistics. Underpowered studies fail in a subtler way than simply missing effects, and " +
    "that failure mode is worth understanding in detail.",

  sections: [
    {
      heading: "The two-by-two",
      blocks: [
        {
          kind: "table",
          headers: ["", "H₀ is true", "H₀ is false"],
          rows: [
            ["Reject H₀", "Type I error — probability α", "Correct — probability 1 − β (power)"],
            ["Fail to reject", "Correct — probability 1 − α", "Type II error — probability β"],
          ],
        },
        {
          kind: "definitions",
          items: [
            {
              term: "Type I (false positive)",
              description:
                "Shipping a feature that does nothing; convicting an innocent defendant; a spam filter " +
                "eating a real email.",
            },
            {
              term: "Type II (false negative)",
              description:
                "Missing a real improvement; acquitting a guilty defendant; letting spam through.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Which error is worse is not a statistical question",
          text:
            "A cancer screen and a spam filter should not use the same α. Setting it requires knowing " +
            "the cost of each mistake, which lives in the domain, not in the data.",
        },
      ],
    },

    {
      heading: "Power and what drives it",
      blocks: [
        {
          kind: "list",
          ordered: false,
          items: [
            "Effect size — larger true effects are easier to detect.",
            "Sample size — power rises with n, through the shrinking standard error.",
            "α — a laxer threshold gives more power, at the cost of more false positives.",
            "Variance — noisier measurements reduce power; better instruments or pairing raise it.",
          ],
        },
        {
          kind: "formula",
          latex: "n ≈ 16σ² / δ²   per group  (α = 0.05, 80% power, two-sided)",
          caption: "The standard two-group sizing rule",
        },
        {
          kind: "prose",
          text:
            "Note the δ² in the denominator: halving the effect size you want to detect multiplies the " +
            "required sample by four. This is the same √n economics as the standard error, seen from " +
            "the design side.",
        },
      ],
    },

    {
      heading: "Why underpowered studies mislead rather than merely miss",
      blocks: [
        {
          kind: "prose",
          text:
            "The obvious cost of low power is missing real effects. The subtler and more damaging cost " +
            "is what happens to the studies that do reach significance. Significance requires the " +
            "estimate to exceed roughly two standard errors. When power is low, the standard error is " +
            "large relative to the true effect, so the true effect alone is nowhere near the bar — " +
            "only samples where noise pushed the estimate well above the truth can clear it.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The winner's curse",
          text:
            "Conditioning on significance selects the upper tail of the sampling distribution, so " +
            "published effect estimates from underpowered studies are systematically inflated, often " +
            "by a factor of two or more. At very low power there is also a non-trivial chance the " +
            "significant estimate has the wrong sign entirely.",
        },
        {
          kind: "example",
          title: "Why replications fail",
          problem:
            "An original study at 20% power reports a significant effect of 0.8. A replication is " +
            "powered at 80% to detect 0.8. Why does it often still fail?",
          steps: [
            "The published 0.8 is inflated by the significance filter; suppose the true effect is 0.3.",
            "The replication was sized for 0.8, so against a true 0.3 its actual power is far below 80%.",
            "It fails to replicate, and is reported as contradicting the original.",
          ],
          answer:
            "Both studies can be honest and correctly analysed. Powering a replication on the " +
            "published estimate builds the original's inflation into the new design — replications " +
            "should be sized on the smallest effect that would matter, not on the prior estimate.",
        },
      ],
    },
  ],

  references: [
    { source: "Casella & Berger, Statistical Inference (2nd ed.)", locator: "§8.3, Methods of Evaluating Tests" },
    { source: "Wasserman, All of Statistics", locator: "Ch. 10, Hypothesis Testing and p-values" },
    { source: "Mathlingo assessment bank", locator: "assessments/hypothesis-testing-machinery.md" },
  ],
};
