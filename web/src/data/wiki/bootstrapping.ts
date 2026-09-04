import type { WikiArticle } from "./types";

export const bootstrappingWiki: WikiArticle = {
  conceptId: "bootstrapping",
  summary:
    "The bootstrap estimates a statistic's sampling distribution by resampling the observed data " +
    "with replacement. It substitutes the empirical distribution for the unknown population, which " +
    "turns an analytically intractable problem into a computational one — and gives standard errors " +
    "and intervals for statistics such as the median, a correlation, or a ratio, where no clean " +
    "formula exists.",

  sections: [
    {
      heading: "The procedure and the idea behind it",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Draw a resample of size n from your data, with replacement.",
            "Compute the statistic on that resample, giving θ̂*.",
            "Repeat B times — typically 1,000 for standard errors, 10,000 for interval endpoints.",
            "The spread of the B replicates approximates the sampling distribution of θ̂.",
          ],
        },
        {
          kind: "prose",
          text:
            "The logic is a substitution. The sampling distribution we want describes what would " +
            "happen if we repeatedly sampled from the population; we cannot do that, so we repeatedly " +
            "sample from the empirical distribution instead. If the sample is representative, the " +
            "empirical distribution is a good stand-in and the resampling mimics the real thing.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "With replacement, and at the original size n",
          text:
            "Sampling without replacement just returns the original dataset permuted, so every " +
            "replicate is identical and the estimated spread is zero. Resampling at a size other than " +
            "n estimates the sampling distribution for that other size, since the spread depends on n.",
        },
      ],
    },

    {
      heading: "Interval flavours",
      blocks: [
        {
          kind: "table",
          headers: ["Method", "Construction", "Notes"],
          rows: [
            ["Percentile", "The α/2 and 1 − α/2 quantiles of the replicates", "Simplest; assumes the bootstrap distribution is roughly unbiased and symmetric"],
            ["Basic / pivotal", "Reflects the replicates about θ̂", "Corrects for bias in the centre"],
            ["BCa", "Bias-corrected and accelerated", "Adjusts for bias and skew; the usual recommendation"],
            ["Bootstrap-t", "Studentises each replicate", "Accurate but needs a variance estimate per replicate"],
          ],
        },
        {
          kind: "prose",
          text:
            "B controls only Monte Carlo error, not statistical error. Raising B from 1,000 to 100,000 " +
            "makes the answer more reproducible; it does not make it more accurate, because the " +
            "limiting accuracy is set by how well your n observations represent the population.",
        },
      ],
    },

    {
      heading: "Where it fails",
      blocks: [
        {
          kind: "example",
          title: "Bootstrapping a maximum",
          problem: "Estimate the sampling distribution of the sample maximum by bootstrap.",
          steps: [
            "Every resample is drawn from the observed values, so no replicate can exceed the observed max.",
            "The bootstrap distribution is therefore capped at X₍ₙ₎ and piles up there — roughly 63% of " +
              "resamples contain the observed maximum, so about 63% of replicates equal it exactly.",
            "The true sampling distribution of the maximum extends above X₍ₙ₎.",
          ],
          answer:
            "The bootstrap systematically fails here, and more replicates or a larger B does not help. " +
            "Extremes are non-smooth functionals of the distribution, and smoothness is what the " +
            "method requires.",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "Extremes and boundary parameters — maxima, minima, the support's endpoints.",
            "Dependent data — time series and clustered samples need a block bootstrap, since naive " +
              "resampling destroys the dependence that drives the variance.",
            "Very small n, where the empirical distribution is a poor stand-in for the population.",
            "An unrepresentative sample — the bootstrap reproduces whatever bias the sample carries, " +
              "and reports it with confident-looking intervals.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "It quantifies sampling variability, and only that",
          text:
            "The bootstrap says how much your estimate would wobble across repeat samples from the " +
            "same population. It says nothing about whether that population is the one you meant to " +
            "study. Selection bias and measurement error pass through untouched.",
        },
      ],
    },
  ],

  references: [
    { source: "Wasserman, All of Statistics", locator: "Ch. 8, The Bootstrap" },
    { source: "Givens & Hoeting, Computational Statistics", locator: "Ch. 9, Bootstrapping" },
    { source: "Mathlingo assessment bank", locator: "assessments/named-tests-and-resampling.md" },
  ],
};
