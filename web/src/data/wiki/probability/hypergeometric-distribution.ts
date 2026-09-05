import type { WikiArticle } from "../types";

export const hypergeometricDistribution: WikiArticle = {
  conceptId: "hypergeometric-distribution",
  summary:
    "The hypergeometric distribution counts successes when sampling *without* replacement from a finite population. It is the binomial's correct counterpart whenever the population is small enough that removing items changes the odds — card hands, quality-control lots, capture–recapture — and the two agree only in the limit of a large population.",
  sections: [
    {
      heading: "The distribution",
      blocks: [
        {
          kind: "formula",
          latex: "P(X = k) = \\frac{\\dbinom{K}{k}\\dbinom{N-K}{n-k}}{\\dbinom{N}{n}}",
          caption:
            "$N$ items, $K$ of them successes, $n$ drawn without replacement; $X$ counts successes drawn",
        },
        {
          kind: "prose",
          text: "The formula is pure counting: choose $k$ of the $K$ successes, choose the remaining $n-k$ from the $N-K$ failures, and divide by the total number of samples of size $n$. Every sample is equally likely, which is what licenses the ratio.",
        },
        {
          kind: "formula",
          latex: "\\mathbb{E}[X] = n\\frac{K}{N}, \\qquad \\operatorname{Var}(X) = n\\frac{K}{N}\\left(1 - \\frac{K}{N}\\right)\\underbrace{\\frac{N-n}{N-1}}_{\\text{finite population correction}}",
          caption: "Mean and variance",
        },
      ],
    },
    {
      heading: "Comparison with the binomial",
      blocks: [
        {
          kind: "callout",
          tone: "insight",
          title: "Identical means, smaller variance",
          text: "Writing $p = K/N$, the hypergeometric mean $np$ is *exactly* the binomial mean — sampling without replacement does not bias the count. Only the variance differs, by the factor $(N-n)/(N-1) < 1$. Sampling without replacement is strictly more informative: you never waste a draw re-examining an item, so the estimate is more precise. Linearity of expectation is what makes the means agree despite the draws being dependent.",
        },
        {
          kind: "table",
          headers: ["", "Binomial", "Hypergeometric"],
          rows: [
            ["Sampling", "with replacement", "without replacement"],
            ["Trials", "independent", "**dependent**"],
            ["Success probability", "constant $p$", "changes with each draw"],
            ["Mean", "$np$", "$nK/N$ — the same"],
            ["Variance", "$np(1-p)$", "$np(1-p)\\cdot\\frac{N-n}{N-1}$ — smaller"],
          ],
        },
        {
          kind: "prose",
          text: "The correction factor vanishes when $n = 1$ (one draw cannot deplete anything) and equals zero when $n = N$ (drawing the whole population leaves no randomness — you get exactly $K$ successes with certainty). The usual rule of thumb is that the binomial approximation is adequate when $n < 0.05N$.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Quality control",
          problem:
            "A lot of 50 components contains 5 defectives. Ten are inspected without replacement. What is $P(\\text{exactly 1 defective})$, and how does the binomial approximation compare?",
          steps: [
            "$N = 50$, $K = 5$, $n = 10$, $k = 1$.",
            "$P(X = 1) = \\dfrac{\\binom{5}{1}\\binom{45}{9}}{\\binom{50}{10}}$.",
            "$= \\dfrac{5 \\times 886{,}163{,}135}{10{,}272{,}278{,}170} \\approx 0.4313$.",
            "Binomial approximation with $p = 5/50 = 0.1$: $\\binom{10}{1}(0.1)(0.9)^{9} \\approx 0.3874$.",
            "Here $n/N = 0.2$, well above the 5% guideline, so the approximation is noticeably off.",
          ],
          answer:
            "Exact: $0.431$. Binomial approximation: $0.387$ — about 10% too low, because it ignores the depletion of defectives.",
        },
      ],
    },
    {
      heading: "Where it appears",
      blocks: [
        {
          kind: "list",
          ordered: false,
          items: [
            "**Card and lottery problems.** Any \"draw $n$ from a deck\" question is hypergeometric; the earlier five-card-two-hearts calculation is exactly this distribution.",
            "**Acceptance sampling.** Inspecting a finite lot without replacement is the textbook industrial application.",
            "**Fisher's exact test.** The null distribution of a $2\\times2$ table with fixed margins is hypergeometric — which is why the test is exact rather than approximate, and why it is preferred to chi-square when expected counts are small.",
            "**Capture–recapture.** Estimating a population size from a marked sample inverts the hypergeometric likelihood.",
            "**Gene set enrichment.** Testing whether a gene list overlaps a pathway more than chance is a hypergeometric tail probability.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Ignoring the correction understates precision",
          text: "Survey sampling from a finite population without applying the finite population correction inflates standard errors — you claim more uncertainty than you have. In the extreme case of a census, $n = N$ makes the correction zero and the true standard error zero, while the binomial formula still reports positive uncertainty about a quantity you have measured exactly.",
        },
      ],
    },
  ],
  references: [
    { source: "Casella & Berger, Statistical Inference", locator: "§3.2.1" },
    { source: "Blitzstein & Hwang, Introduction to Probability", locator: "Ch. 3.4" },
    { source: "Mathlingo assessment bank", locator: "assessments/discrete-distributions.md" },
  ],
};
