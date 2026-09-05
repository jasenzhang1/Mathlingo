import type { WikiArticle } from "./types";

export const samplingMethodsWiki: WikiArticle = {
  conceptId: "sampling-methods",
  summary:
    "How a sample is selected determines what it can support. Every inferential formula in this " +
    "domain assumes the sample was drawn by a probability mechanism from the population of interest; " +
    "when it was not, the formulas still return numbers and the numbers are wrong in a direction no " +
    "amount of extra data repairs. Sampling method is the assumption most often violated and least " +
    "often checked.",

  sections: [
    {
      heading: "Probability sampling designs",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Simple random sample",
              description:
                "Every subset of size n is equally likely. The design every standard formula assumes.",
            },
            {
              term: "Stratified",
              description:
                "Split the population into homogeneous strata, sample within each. Reduces variance " +
                "when strata differ, and guarantees small subgroups are represented.",
            },
            {
              term: "Cluster",
              description:
                "Sample whole groups (schools, city blocks) and measure everyone inside. Cheaper, but " +
                "units within a cluster are correlated, so the effective sample size is below n.",
            },
            {
              term: "Systematic",
              description:
                "Take every k-th unit from an ordered list. Fine unless the list has a period that " +
                "aligns with k, which turns the design into an accidental filter.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Stratifying reduces variance; clustering increases it",
          text:
            "They look similar and pull in opposite directions. Stratified sampling removes " +
            "between-stratum variability from the estimate. Cluster sampling keeps within-cluster " +
            "correlation, so a cluster sample of 1,000 behaves like a much smaller simple random sample.",
        },
      ],
    },

    {
      heading: "Bias that sample size cannot fix",
      blocks: [
        {
          kind: "prose",
          text:
            "Sampling error shrinks like 1/√n. Sampling bias does not shrink at all. A systematically " +
            "unrepresentative procedure applied to a million people is more confidently wrong than the " +
            "same procedure applied to a thousand — the standard error narrows around the wrong value.",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "Selection bias — the sampling frame excludes part of the population.",
            "Non-response bias — those who decline differ systematically from those who answer.",
            "Survivorship bias — units that failed have already left the frame.",
            "Voluntary response — people with strong opinions opt in at higher rates.",
          ],
        },
        {
          kind: "example",
          title: "The Literary Digest poll of 1936",
          problem:
            "A magazine mailed 10 million straw-vote ballots, received 2.4 million back, and predicted " +
            "Landon would beat Roosevelt. Roosevelt won 46 of 48 states. What went wrong?",
          steps: [
            "The sampling frame came from telephone directories and car registrations.",
            "In 1936 that frame skewed heavily wealthy, and wealth correlated with voting Landon.",
            "Non-response compounded it: only 24% returned ballots, and responders were not typical.",
            "n = 2,400,000 gives a standard error near 0.03% — enormous precision around a biased centre.",
          ],
          answer:
            "The poll was extraordinarily precise and badly wrong. Precision is a property of n; " +
            "accuracy is a property of the sampling design.",
        },
      ],
    },

    {
      heading: "What the assumption buys you",
      blocks: [
        {
          kind: "prose",
          text:
            "The i.i.d. assumption behind X̄, s², the standard error σ/√n, and every test in this " +
            "domain is a claim about the sampling mechanism, not about the numbers on the page. You " +
            "cannot verify it by inspecting the data — a biased sample looks perfectly ordinary. It is " +
            "established by how the sample was drawn, which is why the methods section of a study " +
            "carries more weight than its results section.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Convenience samples are the default in practice",
          text:
            "Web analytics, clinical volunteers, and scraped datasets are convenience samples. They can " +
            "still be informative, but the population they represent is “units that ended up in this " +
            "dataset,” and the write-up should say so rather than quietly generalising further.",
        },
      ],
    },
  ],

  references: [
    { source: "Wasserman, All of Statistics", locator: "Ch. 6, Models, Statistical Inference and Learning" },
    { source: "Casella & Berger, Statistical Inference (2nd ed.)", locator: "§5.1, Basic Concepts of Random Samples" },
    { source: "Mathlingo assessment bank", locator: "assessments/statistics-foundations.md" },
  ],
};
