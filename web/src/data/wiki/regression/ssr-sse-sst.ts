import type { WikiArticle } from "../types";

export const ssrSseSstWiki: WikiArticle = {
  conceptId: "ssr-sse-sst",

  summary:
    "The sum of squares decomposition splits the total variation in the response into a part the " +
    "model explains and a part it does not: SST = SSR + SSE. It is an exact algebraic identity, " +
    "not an approximation, and it holds because OLS forces the residuals to be orthogonal to the " +
    "fitted values. Everything built on top of it — R², the ANOVA table, the F-test, adjusted R² — " +
    "is a way of reading the two pieces against each other.",

  sections: [
    {
      heading: "The three sums of squares",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "SST = Σ(yᵢ − ȳ)²",
              description:
                "Total sum of squares. How much the responses vary around their own mean — the variation any model is trying to account for. Degrees of freedom: n − 1.",
            },
            {
              term: "SSR = Σ(ŷᵢ − ȳ)²",
              description:
                "Regression (explained) sum of squares. How much the fitted values vary around the same mean. Degrees of freedom: p.",
            },
            {
              term: "SSE = Σ(yᵢ − ŷᵢ)²",
              description:
                "Error (residual) sum of squares. What is left over — exactly the quantity OLS minimises. Degrees of freedom: n − p − 1.",
            },
          ],
        },
        {
          kind: "formula",
          latex: "SST = SSR + SSE,   (n − 1) = p + (n − p − 1)",
          caption: "The sums of squares add, and so do their degrees of freedom.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The abbreviations are not standardised",
          text:
            "Some texts use SSR for 'sum of squared residuals' — the exact opposite of the usage " +
            "here. Others write SSM (model) and SSE, or ESS (explained) and RSS (residual). Always " +
            "check which quantity a source means before trusting a formula; the safest habit is to " +
            "read the definition rather than the acronym.",
        },
      ],
    },

    {
      heading: "Proving the identity",
      blocks: [
        {
          kind: "prose",
          text:
            "Add and subtract the fitted value inside the total deviation, then expand the square. " +
            "Everything hinges on one cross term vanishing.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Write yᵢ − ȳ = (yᵢ − ŷᵢ) + (ŷᵢ − ȳ) — the residual plus the explained part.",
            "Square and sum: SST = Σ(yᵢ − ŷᵢ)² + 2Σ(yᵢ − ŷᵢ)(ŷᵢ − ȳ) + Σ(ŷᵢ − ȳ)² = SSE + 2·(cross term) + SSR.",
            "Expand the cross term: Σeᵢŷᵢ − ȳΣeᵢ, writing eᵢ = yᵢ − ŷᵢ.",
            "The normal equations give Σeᵢ = 0 (the intercept row) and Σeᵢx_{ij} = 0 for every predictor, hence Σeᵢŷᵢ = 0 since ŷ is a linear combination of those columns.",
            "Both pieces of the cross term are therefore zero, leaving SST = SSR + SSE.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "It is Pythagoras",
          text:
            "In ℝⁿ the centred response y − ȳ1 is the hypotenuse, the explained vector ŷ − ȳ1 and " +
            "the residual vector y − ŷ are the two legs, and the normal equations guarantee the " +
            "angle between the legs is exactly right. SST = SSR + SSE is a² + b² = c². This is why " +
            "the identity is exact rather than asymptotic — a right angle is not an approximation.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Without an intercept, the identity can fail",
          text:
            "Step 4 used the intercept row of the normal equations to get Σeᵢ = 0. Fit a model " +
            "through the origin and that row does not exist, the cross term need not vanish, and " +
            "SSR + SSE can exceed SST — which is how a no-intercept regression can report a " +
            "negative R² in software that computes it as 1 − SSE/SST.",
        },
      ],
    },

    {
      heading: "The ANOVA table",
      blocks: [
        {
          kind: "table",
          headers: ["Source", "Sum of squares", "df", "Mean square", "F"],
          rows: [
            ["Regression", "SSR", "p", "MSR = SSR/p", "MSR / MSE"],
            ["Error", "SSE", "n − p − 1", "MSE = SSE/(n − p − 1)", "—"],
            ["Total", "SST", "n − 1", "—", "—"],
          ],
          caption: "Every regression output in every statistical package is a rendering of this table.",
        },
        {
          kind: "prose",
          text:
            "A mean square is a sum of squares divided by its degrees of freedom, which makes it a " +
            "variance-like quantity. MSE is the unbiased estimate of σ². Under the null hypothesis " +
            "that every slope is zero, MSR estimates the same σ², so their ratio should sit near 1 " +
            "— and a large F is evidence that the numerator is picking up something more than noise.",
        },
        {
          kind: "example",
          title: "Filling in a table from two numbers",
          problem: "A regression on n = 50 observations with p = 3 predictors reports SST = 100 and SSE = 30. Find SSR, R², MSE, and F.",
          steps: [
            "SSR = SST − SSE = 100 − 30 = 70.",
            "R² = SSR/SST = 70/100.",
            "MSE = SSE/(n − p − 1) = 30/46 ≈ 0.652.",
            "MSR = SSR/p = 70/3 ≈ 23.33.",
            "F = MSR/MSE ≈ 23.33/0.652.",
          ],
          answer: "SSR = 70, R² = 0.70, MSE ≈ 0.652, F ≈ 35.8 on (3, 46) degrees of freedom — decisively significant.",
        },
      ],
    },

    {
      heading: "How the pieces move",
      blocks: [
        {
          kind: "list",
          items: [
            "SST depends only on y. Adding, removing or transforming predictors cannot change it — which is exactly what makes it a fair denominator for comparing models on the same response.",
            "SSE can only decrease when a predictor is added: the old model is still available to the new one by setting the new coefficient to zero, and OLS would not choose a worse fit.",
            "SSR therefore can only increase, since the two must still sum to a fixed SST.",
            "Both consequences are about the training data only, and neither says anything about performance on new data.",
            "SSE = 0 means a perfect in-sample fit, which with p + 1 = n is guaranteed and meaningless.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The same decomposition, in probability",
          text:
            "Var(Y) = Var(E[Y | X]) + E[Var(Y | X)] — the law of total variance — splits a variance " +
            "into an explained and an unexplained piece by exactly the same logic, via expectation " +
            "identities rather than orthogonality. SST/n, SSR/n and SSE/n are the sample analogues " +
            "of those three terms, and R² is the sample analogue of the fraction of variance the " +
            "conditional mean accounts for.",
        },
      ],
    },
  ],

  references: [
    { source: "Wasserman, All of Statistics", locator: "§13.2, Least Squares and the Sums of Squares" },
    { source: "NIST/SEMATECH e-Handbook of Statistical Methods", locator: "§4.4.4, Analysis of Variance for Regression" },
    { source: "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning", locator: "§3.1.3, Assessing the Accuracy of the Model" },
    { source: "Mathlingo assessment bank", locator: "assessments/reg-03-model-fit-and-diagnostics.md" },
  ],
};
