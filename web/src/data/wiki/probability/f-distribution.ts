import type { WikiArticle } from "../types";

export const fDistribution: WikiArticle = {
  conceptId: "f-distribution",
  summary:
    "The $F$ distribution is the ratio of two independent scaled chi-squares. That makes it the distribution of a ratio of variances, which is why it is the reference distribution for ANOVA and for every nested model comparison in regression — questions that are always \"did adding these terms reduce residual variance more than chance would?\"",
  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "F = \\frac{U/d_1}{V/d_2}, \\qquad U \\sim \\chi^{2}_{d_1},\\ V \\sim \\chi^{2}_{d_2},\\ U \\perp\\!\\!\\!\\perp V",
          caption: "$F_{d_1, d_2}$ — each chi-square divided by its own degrees of freedom",
        },
        {
          kind: "prose",
          text: "Dividing each by its degrees of freedom is what makes the ratio centre near 1 under the null: each $\\chi^{2}_{d}/d$ has mean 1, so $F$ compares two estimates of the same variance. Values far above 1 indicate the numerator variance is larger than the denominator's.",
        },
        {
          kind: "formula",
          latex: "\\mathbb{E}[F] = \\frac{d_2}{d_2 - 2} \\quad (d_2 > 2)",
          caption: "Close to 1 for large denominator degrees of freedom",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Its relatives",
          text: "$F_{1,d} = t_d^{2}$ — squaring a $t$ statistic gives an $F$, which is why a two-sided $t$-test and the corresponding $F$-test on one coefficient always agree exactly. And $d_1 F_{d_1,d_2} \\to \\chi^{2}_{d_1}$ as $d_2 \\to \\infty$, since the denominator converges to 1 when the error variance is estimated from unlimited data.",
        },
      ],
    },
    {
      heading: "Where it is used",
      blocks: [
        {
          kind: "table",
          headers: ["Test", "Numerator", "Denominator", "df"],
          rows: [
            [
              "One-way ANOVA",
              "between-group MS",
              "within-group MS",
              "$(k-1,\\ N-k)$",
            ],
            [
              "Nested model comparison",
              "reduction in RSS per added parameter",
              "residual MS of the full model",
              "$(q,\\ n-p)$",
            ],
            [
              "Overall regression $F$",
              "explained MS",
              "residual MS",
              "$(p-1,\\ n-p)$",
            ],
            [
              "Equality of two variances",
              "$s_1^{2}$",
              "$s_2^{2}$",
              "$(n_1-1,\\ n_2-1)$",
            ],
          ],
        },
        {
          kind: "prose",
          text: "The ANOVA row is the law of total variance in test form. The between-group mean square estimates the same $\\sigma^{2}$ as the within-group one *if* the group means are equal; if they are not, the between-group term picks up the extra spread and the ratio inflates. So the $F$ statistic asks precisely whether the between-group variance component is zero.",
        },
        {
          kind: "example",
          title: "A nested model comparison",
          problem:
            "A regression on 100 observations has residual sum of squares 250 with 5 predictors. Adding 3 more predictors reduces RSS to 220. Is the improvement more than chance?",
          steps: [
            "Reduction: $250 - 220 = 30$, over $q = 3$ added parameters.",
            "Full model residual df: $100 - 9 = 91$ (8 predictors plus intercept).",
            "$F = \\dfrac{30/3}{220/91} = \\dfrac{10}{2.418} \\approx 4.14$.",
            "Compare to $F_{3,91}$; the 95th percentile is about $2.70$.",
          ],
          answer:
            "$F \\approx 4.14 > 2.70$, so the three predictors improve fit beyond chance at the 5% level.",
        },
      ],
    },
    {
      heading: "Cautions",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "The variance-ratio test is not robust",
          text: "Testing $\\sigma_1^{2} = \\sigma_2^{2}$ with an $F$ ratio requires the *data* to be normal, and unlike tests on means it gains no protection from the CLT. Mild non-normality badly distorts its error rate, which is why Levene's and Brown–Forsythe tests are preferred in practice. The ANOVA $F$-test for means, by contrast, is reasonably robust.",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "**Right-skewed and non-negative** — a ratio of positive quantities, so the distribution is asymmetric and one-tailed tests are the norm.",
            "**Order matters.** $F_{d_1,d_2} = 1/F_{d_2,d_1}$, so swapping numerator and denominator inverts the statistic and requires the reciprocal critical value.",
            "**A significant omnibus $F$ says only that something differs**, not which groups. Post-hoc comparisons with a multiplicity correction are needed to say more.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Casella & Berger, Statistical Inference", locator: "§5.3.3" },
    { source: "Wasserman, All of Statistics", locator: "§13.4" },
    { source: "Mathlingo assessment bank", locator: "assessments/continuous-distributions.md" },
  ],
};
