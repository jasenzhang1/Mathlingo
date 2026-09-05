import type { WikiArticle } from "../types";

export const lawOfLargeNumbers: WikiArticle = {
  conceptId: "law-of-large-numbers",
  summary:
    "The law of large numbers says the sample mean converges to the true mean as the sample grows. It is the reason statistics works at all — estimates from enough data are reliable — and it is also among the most misapplied results in probability, because it says nothing whatever about what happens next in a short run.",
  sections: [
    {
      heading: "Statement",
      blocks: [
        {
          kind: "prose",
          text: "Let $X_1, X_2, \\ldots$ be independent and identically distributed with finite mean $\\mu$, and let $\\bar{X}_n = \\frac{1}{n}\\sum_{i=1}^{n} X_i$.",
        },
        {
          kind: "formula",
          latex: "\\textbf{Weak LLN:}\\quad \\bar{X}_n \\ \\xrightarrow{P} \\ \\mu \\qquad\\Longleftrightarrow\\qquad P\\big(|\\bar{X}_n - \\mu| > \\varepsilon\\big) \\to 0 \\ \\ \\text{for every } \\varepsilon > 0",
          caption: "Convergence in probability",
        },
        {
          kind: "formula",
          latex: "\\textbf{Strong LLN:}\\quad P\\Big(\\lim_{n \\to \\infty} \\bar{X}_n = \\mu\\Big) = 1",
          caption: "Almost sure convergence",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "What separates weak from strong",
          text: "The weak law says that for any fixed large $n$, the sample mean is probably close to $\\mu$ — but it allows the average to wander outside the band infinitely often, provided such excursions become rare. The strong law rules that out: with probability 1, the sequence eventually stays close forever. Strong implies weak; the converse fails. For most practical purposes the weak law is what you use, and the strong law is what justifies talking about \"the\" long-run average as a fixed number.",
        },
      ],
    },
    {
      heading: "Why it is true",
      blocks: [
        {
          kind: "prose",
          text: "The weak law follows from Chebyshev's inequality in three lines, provided the variance is finite. The key step is that averaging shrinks variance:",
        },
        {
          kind: "formula",
          latex: "\\operatorname{Var}(\\bar{X}_n) = \\operatorname{Var}\\!\\left(\\frac{1}{n}\\sum_{i=1}^{n} X_i\\right) = \\frac{1}{n^{2}} \\cdot n\\sigma^{2} = \\frac{\\sigma^{2}}{n}",
          caption: "Independence lets the variances add; the $1/n^2$ from scaling does the rest",
        },
        {
          kind: "prose",
          text: "Chebyshev then gives $P(|\\bar{X}_n - \\mu| > \\varepsilon) \\le \\sigma^{2}/(n\\varepsilon^{2})$, which tends to zero. Note where independence entered: without it, variances do not simply add, and the average of strongly correlated observations need not concentrate at all.",
        },
        {
          kind: "prose",
          text: "The standard deviation of the sample mean is therefore $\\sigma/\\sqrt{n}$ — the famous root-$n$ rate. Quartering the error requires sixteen times the data, which is the fundamental economics of sampling.",
        },
      ],
    },
    {
      heading: "The gambler's fallacy",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "The LLN does not balance out short-run deviations",
          text: "After 10 heads in a row, tails is not \"due\". The coin has no memory, and $P(\\text{tails}) = 0.5$ on the next flip regardless of history. The law of large numbers works by *dilution*, not correction: the excess 10 heads becomes negligible relative to $n$ as $n$ grows. The absolute surplus of heads does not shrink — in fact it typically grows like $\\sqrt{n}$ — but the *proportion* converges because the denominator grows faster.",
        },
        {
          kind: "example",
          title: "Dilution, not correction",
          problem:
            "After 10 flips you have 10 heads, a proportion of 1.0. What does the proportion look like after 1,000 more fair flips?",
          steps: [
            "The next 1,000 flips give about 500 heads, with no compensating bias.",
            "Total: about 510 heads in 1,010 flips.",
            "Proportion $\\approx 0.505$ — already close to 0.5.",
            "But the absolute surplus of heads is still about 10, exactly as before. Nothing corrected it.",
          ],
          answer:
            "The proportion converges to 0.5 while the raw surplus persists. That distinction is the entire content of the misunderstanding.",
        },
      ],
    },
    {
      heading: "When it fails",
      blocks: [
        {
          kind: "list",
          ordered: false,
          items: [
            "**No finite mean.** The Cauchy distribution has no mean, and its sample average is Cauchy for every $n$ — averaging a million observations is no better than taking one. Convergence needs $\\mathbb{E}|X| < \\infty$.",
            "**Dependence.** Correlated observations carry less information than their count suggests. Time series and clustered data have an *effective* sample size well below $n$, so the usual $\\sigma/\\sqrt{n}$ understates the true uncertainty.",
            "**Not identically distributed.** If the underlying distribution shifts during collection, the average converges to nothing in particular.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "LLN and CLT answer different questions",
          text: "The law of large numbers says *where* $\\bar{X}_n$ goes: to $\\mu$. The central limit theorem says *how fast and in what shape*: the error $\\bar{X}_n - \\mu$, magnified by $\\sqrt{n}$, becomes normal. LLN gives consistency; CLT gives confidence intervals. Neither substitutes for the other.",
        },
      ],
    },
  ],
  references: [
    { source: "Blitzstein & Hwang, Introduction to Probability", locator: "Ch. 10.2" },
    { source: "Casella & Berger, Statistical Inference", locator: "§5.5.1–5.5.2" },
    { source: "Wasserman, All of Statistics", locator: "§5.3–5.4" },
    { source: "Mathlingo assessment bank", locator: "assessments/inequalities-and-convergence.md" },
  ],
};
