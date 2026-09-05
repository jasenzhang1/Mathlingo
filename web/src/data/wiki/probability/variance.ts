import type { WikiArticle } from "../types";

export const variance: WikiArticle = {
  conceptId: "variance",
  summary:
    "Variance is the expected squared distance from the mean — a single number saying how spread out a distribution is. Squaring is what makes the algebra work: it keeps deviations from cancelling, makes variances of independent variables add, and gives the identity $\\operatorname{Var}(X) = \\mathbb{E}[X^2] - (\\mathbb{E}[X])^2$ that most computations actually use.",
  sections: [
    {
      heading: "Definition and computing form",
      blocks: [
        {
          kind: "formula",
          latex: "\\operatorname{Var}(X) = \\mathbb{E}\\big[(X - \\mu)^2\\big], \\qquad \\mu = \\mathbb{E}[X]",
          caption: "Variance as mean squared deviation",
        },
        {
          kind: "prose",
          text: "Expanding the square and using linearity gives the form used in practice, since it needs only the first two moments:",
        },
        {
          kind: "formula",
          latex: "\\operatorname{Var}(X) = \\mathbb{E}[X^2] - \\big(\\mathbb{E}[X]\\big)^2",
          caption: "The computing formula",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why square rather than take absolute values",
          text: "Mean absolute deviation is a perfectly sensible measure of spread and is more robust to outliers. Squaring wins on algebra: it is differentiable everywhere, it makes variances of independent variables add exactly, and it connects to inner products and orthogonality — which is what makes least squares, the CLT, and most of linear model theory work. The cost is sensitivity to outliers, since a deviation twice as large counts four times as much.",
        },
      ],
    },
    {
      heading: "Properties",
      blocks: [
        {
          kind: "table",
          headers: ["Property", "Statement", "Condition"],
          rows: [
            ["Non-negative", "$\\operatorname{Var}(X) \\ge 0$, with equality iff $X$ is constant", "always"],
            ["Shift invariance", "$\\operatorname{Var}(X + c) = \\operatorname{Var}(X)$", "always"],
            ["Scaling", "$\\operatorname{Var}(aX) = a^2 \\operatorname{Var}(X)$", "always"],
            ["Sum", "$\\operatorname{Var}(X+Y) = \\operatorname{Var}(X) + \\operatorname{Var}(Y)$", "**uncorrelated**"],
            ["General sum", "$\\operatorname{Var}(X+Y) = \\operatorname{Var}(X) + \\operatorname{Var}(Y) + 2\\operatorname{Cov}(X,Y)$", "always"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The $a^2$, and the sign that surprises people",
          text: "Scaling by $a$ scales variance by $a^2$, not $a$ — which is why standard deviation, $\\sqrt{\\operatorname{Var}(X)}$, is often the more interpretable number: it scales linearly and carries the same units as $X$. And note $\\operatorname{Var}(X - Y) = \\operatorname{Var}(X) + \\operatorname{Var}(Y)$ for independent variables: subtracting adds variance, because uncertainty accumulates regardless of sign.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Two routes to the same answer",
          problem: "A fair six-sided die is rolled. Find $\\operatorname{Var}(X)$.",
          steps: [
            "$\\mathbb{E}[X] = (1+2+3+4+5+6)/6 = 3.5$.",
            "$\\mathbb{E}[X^2] = (1 + 4 + 9 + 16 + 25 + 36)/6 = 91/6 \\approx 15.1667$.",
            "$\\operatorname{Var}(X) = 91/6 - 3.5^2 = 15.1667 - 12.25 = 2.9167$.",
            "Check by the definition: the squared deviations from $3.5$ are $6.25, 2.25, 0.25, 0.25, 2.25, 6.25$, averaging $17.5/6 = 2.9167$. ✓",
          ],
          answer: "$\\operatorname{Var}(X) = 35/12 \\approx 2.917$, so $\\sigma \\approx 1.708$.",
        },
      ],
    },
    {
      heading: "Decomposing variance",
      blocks: [
        {
          kind: "prose",
          text: "Just as expectation has a tower property, variance splits along a conditioning variable — but into two terms rather than one.",
        },
        {
          kind: "formula",
          latex: "\\operatorname{Var}(X) = \\underbrace{\\mathbb{E}\\big[\\operatorname{Var}(X \\mid Y)\\big]}_{\\text{within groups}} + \\underbrace{\\operatorname{Var}\\big(\\mathbb{E}[X \\mid Y]\\big)}_{\\text{between groups}}",
          caption: "The law of total variance (Eve's law)",
        },
        {
          kind: "prose",
          text: "Total variation is average within-group variation plus variation between group means. This is the identity underneath ANOVA, random effects models, and the bias–variance decomposition — each is this split applied to a different choice of $Y$.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Uncorrelated is weaker than independent",
          text: "Variances add whenever $\\operatorname{Cov}(X,Y) = 0$, which independence implies but does not require. If $X$ is symmetric about zero and $Y = X^2$, the two are uncorrelated and about as dependent as variables get. So zero covariance is enough for the variance sum, and never enough to conclude independence.",
        },
      ],
    },
  ],
  references: [
    { source: "Blitzstein & Hwang, Introduction to Probability", locator: "Ch. 4.6, 9.5" },
    { source: "Casella & Berger, Statistical Inference", locator: "§2.3, §4.4" },
    { source: "Wasserman, All of Statistics", locator: "§3.4" },
    { source: "Mathlingo assessment bank", locator: "assessments/random-variables-and-density.md" },
  ],
};
