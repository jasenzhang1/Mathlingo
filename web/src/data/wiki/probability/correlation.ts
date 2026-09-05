import type { WikiArticle } from "../types";

export const correlation: WikiArticle = {
  conceptId: "correlation",
  summary:
    "Correlation is covariance rescaled to lie in $[-1, 1]$, which makes it comparable across variables with different units. It measures *linear* association and nothing else — a fact that is easy to state, easy to forget, and responsible for most of the ways correlation gets misread.",
  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "\\rho_{XY} = \\frac{\\operatorname{Cov}(X, Y)}{\\sigma_X\\,\\sigma_Y} = \\frac{\\mathbb{E}[(X - \\mu_X)(Y - \\mu_Y)]}{\\sigma_X\\,\\sigma_Y}",
          caption: "The Pearson correlation coefficient",
        },
        {
          kind: "prose",
          text: "Dividing by both standard deviations strips the units and bounds the result. Equivalently, $\\rho$ is the covariance of the standardised variables — so it is scale- and shift-invariant, and measuring in inches rather than centimetres changes nothing.",
        },
        {
          kind: "formula",
          latex: "-1 \\le \\rho_{XY} \\le 1",
          caption: "A consequence of the Cauchy–Schwarz inequality applied to centred variables",
        },
        {
          kind: "prose",
          text: "The extremes are attained exactly when $Y = aX + b$ for constants with $a \\neq 0$: $\\rho = +1$ when $a > 0$ and $\\rho = -1$ when $a < 0$. Perfect correlation means an exact linear relationship, not merely a strong one.",
        },
      ],
    },
    {
      heading: "What it does not tell you",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "$\\rho = 0$ does not mean unrelated",
          text: "Correlation detects only the linear component of a relationship. If $X$ is symmetric about 0 and $Y = X^{2}$, then $\\rho = 0$ while $Y$ is a deterministic function of $X$. Any relationship symmetric about the mean — a parabola, a circle, a sine wave over full periods — has zero correlation. Plotting the data catches this immediately; a correlation coefficient never will.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Correlation is not causation, and the reasons are worth naming",
          text: "Three distinct alternatives explain an observed $\\rho \\neq 0$: reverse causation ($Y$ causes $X$), confounding (a third variable causes both — ice cream sales and drownings, both driven by temperature), and selection effects (conditioning on a collider, which can manufacture correlation between genuinely independent causes). Only a randomised intervention or an explicit causal model distinguishes them.",
        },
        {
          kind: "prose",
          text: "Anscombe's quartet is the standard demonstration: four datasets with identical means, variances, correlations, and regression lines, but completely different shapes — one linear, one curved, one linear with an outlier, one entirely driven by a single point. The summary statistics agree; nothing else does.",
        },
      ],
    },
    {
      heading: "Sample correlation",
      blocks: [
        {
          kind: "formula",
          latex: "r = \\frac{\\sum_{i=1}^{n}(x_i - \\bar{x})(y_i - \\bar{y})}{\\sqrt{\\sum_{i=1}^{n}(x_i - \\bar{x})^{2}}\\ \\sqrt{\\sum_{i=1}^{n}(y_i - \\bar{y})^{2}}}",
          caption: "The sample analogue, estimating $\\rho$ from data",
        },
        {
          kind: "table",
          headers: ["Issue", "Effect on $r$"],
          rows: [
            [
              "Outliers",
              "A single extreme point can move $r$ from near 0 to near 1, or reverse its sign.",
            ],
            [
              "Restricted range",
              "Sampling only part of the range attenuates $r$ — university grades correlate weakly with admission scores partly because low scorers were never admitted.",
            ],
            [
              "Small $n$",
              "$r$ is highly variable. With $n = 10$, an $|r|$ of 0.6 is unremarkable under no true association.",
            ],
            [
              "Aggregation",
              "Correlations computed on group averages are typically far larger than individual-level ones — the ecological fallacy.",
            ],
          ],
        },
      ],
    },
    {
      heading: "Alternatives",
      blocks: [
        {
          kind: "list",
          ordered: false,
          items: [
            "**Spearman's $\\rho$** — Pearson correlation of the *ranks*. Captures any monotone relationship, not just linear ones, and is robust to outliers.",
            "**Kendall's $\\tau$** — based on concordant versus discordant pairs; more interpretable and better behaved in small samples.",
            "**Mutual information** — detects any statistical dependence whatsoever, at the cost of needing more data and having no sign.",
            "**Distance correlation** — zero exactly when the variables are independent, which Pearson's is not.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "$\\rho^{2}$ is the interpretable quantity",
          text: "In simple linear regression, $\\rho^{2}$ is the fraction of variance in $Y$ explained linearly by $X$. This is why a correlation of 0.3 is weaker than it sounds — it accounts for 9% of the variation. Squaring before interpreting is a useful habit, and it also removes the temptation to read $\\rho = 0.6$ as \"twice as strong\" as $\\rho = 0.3$, when the explained variation is four times as large.",
        },
      ],
    },
  ],
  references: [
    { source: "Blitzstein & Hwang, Introduction to Probability", locator: "Ch. 7.3" },
    { source: "Casella & Berger, Statistical Inference", locator: "§4.5.2" },
    { source: "Anscombe, 'Graphs in Statistical Analysis'", locator: "The American Statistician 27(1), 1973" },
    { source: "Mathlingo assessment bank", locator: "assessments/joint-and-conditional-structure.md" },
  ],
};
