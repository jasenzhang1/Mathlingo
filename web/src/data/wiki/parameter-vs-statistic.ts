import type { WikiArticle } from "./types";

export const parameterVsStatisticWiki: WikiArticle = {
  conceptId: "parameter-vs-statistic",
  summary:
    "A parameter is a fixed, usually unknown number describing the population. A statistic is a " +
    "number computed from the sample. The decisive point is not the definition but the consequence: " +
    "a statistic is a random variable before the data arrives, because a different sample would give " +
    "a different value. That randomness is what gives a statistic a distribution, and having a " +
    "distribution is what lets us attach precision to an estimate at all.",

  sections: [
    {
      heading: "The distinction, and the notation",
      blocks: [
        {
          kind: "table",
          headers: ["", "Parameter", "Statistic"],
          rows: [
            ["Describes", "The population", "The sample"],
            ["Known?", "Almost never", "Always — you computed it"],
            ["Fixed or random?", "Fixed", "Random before sampling, fixed after"],
            ["Notation", "Greek: μ, σ, p, θ", "Latin, often hatted: X̄, s, p̂, θ̂"],
            ["Examples", "True mean height of all trees in a park", "Mean height of the 200 you measured"],
          ],
          caption: "Greek for what you want to know, Latin for what you can compute.",
        },
        {
          kind: "prose",
          text:
            "The notational convention is worth internalising rather than looking up: when a formula " +
            "mixes μ and X̄, it is telling you which quantities are unknown targets and which are " +
            "things you can actually evaluate from data.",
        },
      ],
    },

    {
      heading: "Why a statistic is random",
      blocks: [
        {
          kind: "prose",
          text:
            "Consider X̄ for a sample of n = 30, before any data has been collected. It is a function " +
            "of thirty not-yet-realised observations, so it is a random variable: on a hypothetical " +
            "repeat of the study it would come out differently. Once you draw the sample and compute " +
            "it, X̄ = 72.3 is one specific fixed number.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The whole discipline hangs on this duality",
          text:
            "Only by treating X̄ as random can we ask about its distribution — its centre, its spread, " +
            "its shape. That distribution is the sampling distribution, its spread is the standard " +
            "error, and both exist only because a statistic is a random variable. Drop the duality " +
            "and there is no way to say how much to trust 72.3.",
        },
        {
          kind: "prose",
          text:
            "The parameter, by contrast, is not random. μ is some fixed number we do not know. This " +
            "asymmetry is exactly why a frequentist confidence interval cannot be given a probability " +
            "interpretation about μ: the interval is random, the parameter is not.",
        },
      ],
    },

    {
      heading: "Close to is not equal to",
      blocks: [
        {
          kind: "prose",
          text:
            "A statistic is an estimate carrying inherent sampling variability. Reporting X̄ = 72.3 is " +
            "a best guess with quantifiable uncertainty, not an assertion that μ = 72.3. Treating a " +
            "statistic as though it were the parameter — dropping the estimation error silently — is " +
            "the root cause of most statistical overconfidence.",
        },
        {
          kind: "example",
          title: "A poll with no margin of error",
          problem:
            "A news article reports “the poll shows 52% support.” What is the 52%, and what is missing?",
          steps: [
            "52% is a statistic, p̂, computed from whoever was surveyed.",
            "It estimates a parameter p, the true support in the defined population.",
            "p̂ is a random quantity — a different sample would have produced a different percentage.",
            "Reporting it alone implies certainty about p that the data does not support.",
          ],
          answer:
            "The report is incomplete without a margin of error, because the number given is an " +
            "estimate of the unknown parameter, not the parameter itself.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "A statistic near 50% is not a coin flip",
          text:
            "“52% support, margin of error ±3” means the data cannot distinguish 52% from 49%. That " +
            "is a statement about the precision of the estimate, and it is the part headlines drop.",
        },
      ],
    },
  ],

  references: [
    { source: "Wasserman, All of Statistics", locator: "§6.3, Fundamental Concepts in Inference" },
    { source: "Casella & Berger, Statistical Inference (2nd ed.)", locator: "§5.2, Sums of Random Variables from a Random Sample" },
    { source: "Mathlingo assessment bank", locator: "assessments/statistics-foundations.md" },
  ],
};
