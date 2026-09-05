import type { WikiArticle } from "../types";

export const chiSquareDistribution: WikiArticle = {
  conceptId: "chi-square-distribution",
  summary:
    "The chi-square distribution is what you get when you add up squared standard normals. That single fact explains everything it is used for: sample variances, goodness-of-fit tests, and likelihood ratio tests all reduce to sums of squared deviations, and all are therefore chi-square under their null hypotheses.",
  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "Z_1, \\ldots, Z_k \\ \\text{i.i.d.} \\ \\mathcal{N}(0,1) \\ \\Longrightarrow \\ \\sum_{i=1}^{k} Z_i^{2} \\sim \\chi^{2}_{k}",
          caption: "Chi-square with $k$ degrees of freedom",
        },
        {
          kind: "formula",
          latex: "\\mathbb{E}[X] = k, \\qquad \\operatorname{Var}(X) = 2k",
          caption: "Mean equals the degrees of freedom; variance is twice it",
        },
        {
          kind: "prose",
          text: "The mean is immediate: each $Z_i^{2}$ has $\\mathbb{E}[Z^{2}] = \\operatorname{Var}(Z) = 1$, and there are $k$ of them. The distribution is supported on $[0, \\infty)$ — squares cannot be negative — and is right-skewed, with the skew diminishing as $k$ grows.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "It is a Gamma in disguise",
          text: "$\\chi^{2}_{k}$ is exactly Gamma$(k/2,\\ 2)$ in the shape–scale parameterisation. That is why the density involves $\\Gamma(k/2)$, and it explains the additivity below: independent Gammas with a common scale add their shape parameters.",
        },
      ],
    },
    {
      heading: "Additivity and degrees of freedom",
      blocks: [
        {
          kind: "formula",
          latex: "X \\sim \\chi^{2}_{m},\\ Y \\sim \\chi^{2}_{n},\\ X \\perp\\!\\!\\!\\perp Y \\ \\Longrightarrow \\ X + Y \\sim \\chi^{2}_{m+n}",
          caption: "Degrees of freedom add",
        },
        {
          kind: "prose",
          text: "This is obvious from the definition — a sum of $m$ squared normals plus a sum of $n$ more is a sum of $m+n$ — and it is why degrees of freedom behave like a count of independent squared quantities. Which, being what they are, they are.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Estimating a parameter costs a degree of freedom",
          text: "The sample variance uses $\\sum(X_i - \\bar{X})^{2}$, not $\\sum(X_i - \\mu)^{2}$. The deviations from $\\bar{X}$ satisfy one linear constraint — they sum to zero — so only $n-1$ of them are free to vary. That is the whole content of the $n-1$: one degree of freedom was consumed estimating the mean. Each additional parameter estimated from the data costs another.",
        },
        {
          kind: "formula",
          latex: "\\frac{(n-1)s^{2}}{\\sigma^{2}} \\sim \\chi^{2}_{n-1}",
          caption: "The sampling distribution of the sample variance, for normal data",
        },
      ],
    },
    {
      heading: "Where it appears",
      blocks: [
        {
          kind: "table",
          headers: ["Test", "Statistic", "Degrees of freedom"],
          rows: [
            [
              "Goodness of fit",
              "$\\sum \\dfrac{(O_i - E_i)^{2}}{E_i}$",
              "categories $-\\ 1\\ -$ parameters estimated",
            ],
            [
              "Independence in an $r \\times c$ table",
              "same statistic",
              "$(r-1)(c-1)$",
            ],
            [
              "Variance test",
              "$(n-1)s^{2}/\\sigma_0^{2}$",
              "$n - 1$",
            ],
            [
              "Likelihood ratio test",
              "$-2\\log\\Lambda$",
              "difference in parameter count",
            ],
          ],
        },
        {
          kind: "prose",
          text: "The last row is Wilks' theorem, and it is the reason chi-square is unavoidable in modern statistics: twice the log-likelihood-ratio between nested models is asymptotically chi-square with degrees of freedom equal to the number of extra parameters. Every nested model comparison — in regression, in generalised linear models, in structural equation models — runs through it.",
        },
        {
          kind: "example",
          title: "Goodness of fit",
          problem:
            "A die is rolled 60 times, giving counts $8, 9, 12, 11, 6, 14$. Test whether it is fair.",
          steps: [
            "Under fairness each expected count is $E_i = 60/6 = 10$.",
            "$\\sum (O_i - E_i)^{2}/E_i = \\dfrac{4 + 1 + 4 + 1 + 16 + 16}{10} = \\dfrac{42}{10} = 4.2$.",
            "Degrees of freedom: $6 - 1 = 5$ (no parameters estimated; the counts must sum to 60).",
            "The 95th percentile of $\\chi^{2}_{5}$ is $11.07$.",
            "$4.2 < 11.07$, so there is no evidence against fairness.",
          ],
          answer: "$\\chi^{2} = 4.2$ on 5 df — not significant.",
        },
      ],
    },
    {
      heading: "Caveats",
      blocks: [
        {
          kind: "list",
          ordered: false,
          items: [
            "**The normality assumption is real.** $(n-1)s^{2}/\\sigma^{2} \\sim \\chi^{2}_{n-1}$ requires normal data, and unlike the CLT-backed $t$-test for means, this does *not* become robust with large $n$. Variance tests are notoriously sensitive to non-normality.",
            "**Expected counts must not be too small.** The usual rule is $E_i \\ge 5$ in every cell; below that the chi-square approximation to the discrete statistic degrades and Fisher's exact test is preferable.",
            "**Degrees of freedom must account for estimation.** Fitting a Poisson to a table and then testing fit costs a degree of freedom for the estimated $\\lambda$. Forgetting this makes the test too conservative.",
            "**As $k$ grows it becomes normal.** $\\chi^{2}_{k} \\approx \\mathcal{N}(k, 2k)$ for large $k$, which follows from the CLT applied to the sum of squares.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Casella & Berger, Statistical Inference", locator: "§5.3.1, Lemma 5.3.2" },
    { source: "Wasserman, All of Statistics", locator: "§10.8" },
    { source: "Blitzstein & Hwang, Introduction to Probability", locator: "Ch. 8.3" },
    { source: "Mathlingo assessment bank", locator: "assessments/continuous-distributions.md" },
  ],
};
