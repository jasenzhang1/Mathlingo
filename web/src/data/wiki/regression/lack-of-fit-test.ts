import type { WikiArticle } from "../types";

export const lackOfFitTestWiki: WikiArticle = {
  conceptId: "lack-of-fit-test",

  summary:
    "The usual F-tests ask whether coefficients are zero assuming the model's form is right. The lack-of-" +
    "fit test asks whether the form is right. It needs replication — several responses at the same x — " +
    "because only then can the data estimate σ² without trusting the model at all. The residual sum of " +
    "squares splits into pure error, which any model would leave behind, and lack of fit, which a " +
    "better model could remove.",

  sections: [
    {
      heading: "Splitting the residual sum of squares",
      blocks: [
        {
          kind: "prose",
          text:
            "Suppose the n observations fall at m distinct x values, with nᵢ replicates at the i-th and " +
            "group means ȳᵢ. Any model that gives each distinct x its own mean fits the group means " +
            "exactly; what it leaves is pure error. The fitted model's excess over that is lack of fit.",
        },
        {
          kind: "formula",
          latex: "RSS = \\underbrace{Σᵢ Σⱼ (yᵢⱼ − ȳᵢ)²}_{SS_{PE},\\; n − m \\text{ df}} + \\underbrace{Σᵢ nᵢ(ȳᵢ − ŷᵢ)²}_{SS_{LOF},\\; m − p \\text{ df}}",
        },
        {
          kind: "formula",
          latex: "F = \\frac{SS_{LOF}/(m − p)}{SS_{PE}/(n − m)} ~ F_{m−p, n−m}  if the model is correct",
        },
      ],
    },

    {
      heading: "Why it works",
      blocks: [
        {
          kind: "prose",
          text:
            "It is a general-linear-hypothesis test in which the big model is the 'saturated' one-mean-per-x " +
            "model (m parameters) and the hypothesis is that those m means lie on the proposed curve " +
            "(p parameters). Pure error estimates σ² whether or not the curve is right; the lack-of-fit " +
            "mean square estimates σ² only if it is right, and something larger otherwise.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "No replicates, no test",
          text:
            "If every x value is distinct, m = n and there are zero pure-error degrees of freedom. Near-" +
            "replicates (grouping close x values) or a more flexible alternative model can stand in, but " +
            "the clean, model-free estimate of σ² disappears.",
        },
      ],
    },

    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "A straight line with replicates",
          problem:
            "A straight line (p = 2) is fitted to n = 12 observations at m = 4 distinct doses, 3 replicates " +
            "each. RSS = 30, of which pure error is 16. Test for lack of fit.",
          steps: [
            "SS_LOF = 30 − 16 = 14 on m − p = 2 df, so MS_LOF = 7.",
            "SS_PE = 16 on n − m = 8 df, so MS_PE = 2.",
            "F = 7/2 = 3.5 on (2, 8) df. The 5% critical value F_{2,8} ≈ 4.46.",
          ],
          answer: "F = 3.5 < 4.46: no significant lack of fit at 5%, though the p-value (~0.08) is not reassuring.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Failing to reject is not proof of linearity",
          text:
            "With few replicates the test has low power. A curve with visible structure in a residual plot " +
            "can pass. The test is a check, not a certificate.",
        },
      ],
    },
  ],

  references: [
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§4.6, Goodness-of-Fit Test" },
  ],
};
