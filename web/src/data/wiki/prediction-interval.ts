import type { WikiArticle } from "./types";

export const predictionIntervalWiki: WikiArticle = {
  conceptId: "prediction-interval",
  summary:
    "A prediction interval covers a future observation; a confidence interval covers a parameter. " +
    "The difference is not a technicality — one shrinks toward zero width as data accumulates and " +
    "the other does not, because a new draw carries randomness no amount of data removes. Reporting " +
    "one where the other is meant produces forecasts that are far too confident.",

  sections: [
    {
      heading: "Two sources of uncertainty",
      blocks: [
        {
          kind: "prose",
          text:
            "Predicting a new observation requires being uncertain about two separate things: where " +
            "the centre of the distribution is, and how far a single draw will fall from that centre. " +
            "A confidence interval addresses only the first. A prediction interval must carry both, " +
            "and the variances add.",
        },
        {
          kind: "formula",
          latex: "Var(new − X̄) = σ² + σ²/n = σ²(1 + 1/n)",
          caption: "Irreducible draw variance, plus estimation error in the centre",
        },
        {
          kind: "formula",
          latex: "X̄ ± t₍ₙ₋₁, α/2₎ · s · √(1 + 1/n)",
          caption: "Prediction interval for one future observation",
        },
        {
          kind: "prose",
          text:
            "Set the two side by side and the structural difference is the lone 1 under the root. " +
            "The confidence interval has √(1/n), which vanishes; the prediction interval has " +
            "√(1 + 1/n), which converges to 1.",
        },
      ],
    },

    {
      heading: "The limiting behaviour",
      blocks: [
        {
          kind: "table",
          headers: ["n", "CI half-width (÷ s)", "PI half-width (÷ s)"],
          rows: [
            ["10", "0.72", "2.37"],
            ["100", "0.20", "1.99"],
            ["1,000", "0.06", "1.96"],
            ["→ ∞", "→ 0", "→ 1.96"],
          ],
          caption: "At 95%, using the appropriate t or z multiplier",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The prediction interval converges to the population spread",
          text:
            "With infinite data you know μ and σ exactly — and a new observation is still a random " +
            "draw from N(μ, σ²). The interval converges to μ ± 1.96σ, the intrinsic variability of " +
            "the thing itself. No amount of data narrows it further, because the uncertainty is not " +
            "about knowledge.",
        },
      ],
    },

    {
      heading: "Where the confusion does damage",
      blocks: [
        {
          kind: "prose",
          text:
            "The error is routine in applied reporting. A model's accuracy is estimated on a test " +
            "set and the confidence interval for mean accuracy is presented as though it bounded " +
            "performance on any particular case. A sales forecast quotes the interval for the " +
            "expected monthly total and treats it as the range next month will land in. Both are " +
            "the same mistake, and both understate the real uncertainty by a factor that grows with n.",
        },
        {
          kind: "example",
          title: "Which interval answers which question",
          problem:
            "n = 100 observations give x̄ = 50 and s = 10. Compute both 95% intervals and say what " +
            "each one is for.",
          steps: [
            "CI: 50 ± 1.984(10/√100) = 50 ± 1.98 = [48.0, 52.0].",
            "PI: 50 ± 1.984(10)√(1 + 1/100) = 50 ± 19.9 = [30.1, 69.9].",
          ],
          answer:
            "The mean is pinned to within ±2; the next observation could plausibly land anywhere " +
            "within ±20. The prediction interval is ten times wider, and quoting the narrow one for " +
            "a forecast would be badly wrong.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Prediction intervals lean harder on the distributional assumption",
          text:
            "A confidence interval for a mean is protected by the CLT even when the data is not " +
            "normal. A prediction interval is a statement about a single draw, so the CLT does not " +
            "help — the shape of the population matters directly, and for skewed data a normal-based " +
            "prediction interval can be seriously wrong.",
        },
      ],
    },
  ],

  references: [
    { source: "Casella & Berger, Statistical Inference (2nd ed.)", locator: "Ch. 9, Interval Estimation" },
    { source: "Wasserman, All of Statistics", locator: "Ch. 6–7, inference and prediction" },
    { source: "Mathlingo assessment bank", locator: "assessments/beyond-a-single-comparison.md" },
  ],
};
