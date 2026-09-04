import type { WikiArticle } from "../types";

export const anovaWiki: WikiArticle = {
  conceptId: "anova",

  summary:
    "ANOVA compares group means by comparing variances — which sounds like a category error until " +
    "you see the mechanism. Split the total variation into a between-groups piece and a " +
    "within-groups piece, divide each by its degrees of freedom, and take the ratio. Under the null " +
    "hypothesis both pieces estimate the same error variance, so the ratio hovers near 1 and " +
    "follows an F distribution exactly; a large value is evidence that the group means genuinely " +
    "differ. In regression the same table tests whether any predictor helps at all.",

  sections: [
    {
      heading: "The question and the statistic",
      blocks: [
        {
          kind: "formula",
          latex: "H₀: β₁ = β₂ = ⋯ = β_p = 0   vs.   H₁: at least one βⱼ ≠ 0",
          caption: "The regression ANOVA F-test: does the predictor set explain anything at all?",
        },
        {
          kind: "formula",
          latex: "F = (SSR/p) / (SSE/(n − p − 1)) = MSR / MSE",
          caption: "A ratio of two mean squares, each a variance estimate.",
        },
        {
          kind: "prose",
          text:
            "In the one-way layout the same statistic is written with group labels: SSR becomes the " +
            "between-groups sum of squares Σⱼ nⱼ(ȳⱼ − ȳ)², and SSE the within-groups sum " +
            "Σⱼ Σᵢ (yᵢⱼ − ȳⱼ)². The two presentations are the same computation — a one-way ANOVA on " +
            "k groups is a regression on k − 1 indicator columns, and the F statistics agree exactly.",
        },
      ],
    },

    {
      heading: "Why the ratio is near 1 under the null",
      blocks: [
        {
          kind: "prose",
          text:
            "MSE always estimates σ², whether or not the null is true: it is built from deviations " +
            "around the fitted values, which have already absorbed any real group differences. MSR " +
            "is different. It measures how far the fitted values stray from the overall mean. Under " +
            "the null there is nothing systematic to find, so the only reason the fitted values move " +
            "at all is sampling noise — and it can be shown that MSR then estimates σ² as well.",
        },
        {
          kind: "formula",
          latex: "E[MSE] = σ²   always;   E[MSR] = σ² under H₀,  > σ² otherwise",
          caption: "Both numerator and denominator estimate the noise under the null; only the numerator inflates under the alternative.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Comparing variances to compare means",
          text:
            "The apparent paradox in the name resolves here. If the groups really differ, the group " +
            "means are more spread out than sampling noise alone would produce — so a difference in " +
            "means shows up as an inflated between-groups variance. Variance is the measuring " +
            "instrument; means are what is being measured.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The test is one-sided even though the alternative is two-sided",
          text:
            "Only large values of F count as evidence. A small F means the fitted values vary less " +
            "than noise would predict, which is not evidence for any difference in means. The " +
            "p-value is therefore always the upper tail, and there is no such thing as a two-tailed " +
            "F-test here.",
        },
      ],
    },

    {
      heading: "Why the reference distribution is F",
      blocks: [
        {
          kind: "prose",
          text:
            "The F distribution was defined as the ratio of two independent chi-squares, each " +
            "divided by its degrees of freedom. The ANOVA statistic is exactly that object, and the " +
            "connection is not an analogy — it is the construction.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Under normal errors, SST/σ² decomposes into two pieces via Cochran's theorem.",
            "SSE/σ² ~ χ²(n − p − 1), always.",
            "SSR/σ² ~ χ²(p), under H₀ only.",
            "The two are independent, because they are squared lengths of projections onto orthogonal subspaces — the same orthogonality that gave SST = SSR + SSE.",
            "So F = (SSR/σ²)/p ÷ (SSE/σ²)/(n − p − 1); the σ² cancels, and the result is F(p, n − p − 1) by definition.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "σ² cancels, which is what makes the test usable",
          text:
            "Neither chi-square is observable, because both involve the unknown σ². Their ratio does " +
            "not, which is precisely why the F statistic can be computed from data. This is the same " +
            "trick the t-statistic uses to eliminate σ from the numerator and denominator at once.",
        },
      ],
    },

    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "An ANOVA table from summary numbers",
          problem:
            "n = 60 observations, p = 4 predictors, SST = 500, SSE = 200. Compute the F statistic " +
            "and say roughly what it implies.",
          steps: [
            "SSR = SST − SSE = 500 − 200 = 300.",
            "MSR = SSR/p = 300/4 = 75.",
            "MSE = SSE/(n − p − 1) = 200/55 ≈ 3.636.",
            "F = 75/3.636 ≈ 20.6 on (4, 55) degrees of freedom.",
            "The 5% critical value for F(4, 55) is about 2.54.",
          ],
          answer:
            "F ≈ 20.6, far beyond the critical value, so H₀ is decisively rejected: at least one predictor carries real signal. Note R² = 300/500 = 0.60 here, and F and R² are two readings of the same decomposition.",
        },
      ],
    },

    {
      heading: "The F-test and the t-tests answer different questions",
      blocks: [
        {
          kind: "table",
          headers: ["", "Overall F-test", "Individual t-tests"],
          rows: [
            ["Null hypothesis", "All slopes are zero", "This one slope is zero"],
            ["Number of tests", "One", "p of them"],
            ["Multiple-comparison inflation", "None", "Real — 5 predictors at α = 0.05 gives ≈ 23% chance of a false positive"],
            ["Behaviour under collinearity", "Unaffected", "Standard errors inflate, so significance is lost"],
          ],
        },
        {
          kind: "prose",
          text:
            "Running the F-test first is a guard against multiple comparisons: it asks one question " +
            "about the whole predictor set instead of p separate questions, so its error rate is the " +
            "nominal one. The characteristic pattern of a significant F with no significant t is not " +
            "a contradiction — it is the signature of multicollinearity, where the predictors " +
            "clearly matter collectively but the data cannot say which one is responsible.",
        },
        {
          kind: "prose",
          text:
            "The partial F-test generalises both. To compare a reduced model with q predictors " +
            "against a full model with p, compute F = [(SSE_red − SSE_full)/(p − q)] / " +
            "[SSE_full/(n − p − 1)]. With p − q = 1 this is exactly the square of the individual " +
            "t-statistic; with q = 0 it is the overall F-test. One formula, and the two familiar " +
            "tests are its endpoints.",
        },
      ],
    },

    {
      heading: "Assumptions and what they cost",
      blocks: [
        {
          kind: "list",
          items: [
            "Independent observations — the assumption whose violation does the most damage, and the one ANOVA cannot detect from the data.",
            "Equal variances across groups — moderate violations are tolerable with balanced group sizes; with unbalanced sizes they are not, and Welch's ANOVA is the repair.",
            "Approximately normal errors — the least critical, since the CLT makes the F-test robust for reasonable sample sizes.",
            "A significant F says only that something differs. Identifying which groups requires post-hoc comparisons (Tukey's HSD, Bonferroni) that control the family-wise error rate.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Casella & Berger, Statistical Inference (2nd ed.)", locator: "§11.2 and §11.3, One-Way ANOVA and the Linear Model" },
    { source: "NIST/SEMATECH e-Handbook of Statistical Methods", locator: "§7.4.3, Analysis of Variance" },
    { source: "Wasserman, All of Statistics", locator: "§13.4, Testing in Linear Regression" },
    { source: "Mathlingo assessment bank", locator: "assessments/reg-03-model-fit-and-diagnostics.md" },
  ],
};
