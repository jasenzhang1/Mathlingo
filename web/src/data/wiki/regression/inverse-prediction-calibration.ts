import type { WikiArticle } from "../types";

export const inversePredictionCalibrationWiki: WikiArticle = {
  conceptId: "inverse-prediction-calibration",

  summary:
    "Regression usually predicts y from x. Calibration runs it backwards: a lab fits a line of instrument " +
    "reading y against known concentrations x, then measures an unknown sample and wants its x. The point " +
    "estimate is just the fitted line solved for x, but its uncertainty is the uncertainty of a ratio, and " +
    "Fieller's method gives a confidence set that can be an interval, the complement of an interval, or " +
    "the whole real line — depending on whether the slope is clearly different from zero.",

  sections: [
    {
      heading: "The estimate",
      blocks: [
        {
          kind: "formula",
          latex: "x̂₀ = \\frac{y₀ − β̂₀}{β̂₁} = x̄ + \\frac{y₀ − ȳ}{β̂₁}",
          caption: "Solve the fitted line for x at the observed response y₀ (or the mean ȳ₀ of m replicate readings).",
        },
        {
          kind: "prose",
          text:
            "x̂₀ is a ratio of two random quantities, so it has no finite mean or variance under normality — " +
            "the denominator β̂₁ can be arbitrarily close to zero. Delta-method standard errors are a rough " +
            "guide at best; the principled interval comes from inverting a prediction interval.",
        },
      ],
    },

    {
      heading: "Fieller's interval",
      blocks: [
        {
          kind: "prose",
          text:
            "For any candidate x, the quantity y₀ − β̂₀ − β̂₁x has mean zero if x is the true x₀, and a " +
            "known variance form. The confidence set is every x for which the observed y₀ is inside the " +
            "prediction interval at x:",
        },
        {
          kind: "formula",
          latex: "(y₀ − β̂₀ − β̂₁x)² ≤ t² s² \\left(\\frac{1}{m} + \\frac{1}{n} + \\frac{(x − x̄)²}{S_{xx}}\\right)",
          caption: "A quadratic inequality in x; m is the number of replicate readings averaged into y₀.",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "g = t²s² / (β̂₁² S_xx)",
              description:
                "The squared ratio of the slope's standard error to the slope, times t². The set is a finite interval exactly when g < 1 — i.e. when the t-test of β₁ = 0 rejects.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "A flat line cannot be read backwards",
          text:
            "If g ≥ 1 the slope is not significantly different from zero and the 'interval' is either two " +
            "infinite rays or the whole line. That is the correct answer, not a failure: if you cannot tell " +
            "whether y rises with x at all, you cannot recover x from y.",
        },
      ],
    },

    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Reading a concentration off a standard curve",
          problem:
            "A calibration line is ŷ = 2 + 4x, fitted with x̄ = 5. An unknown sample reads y₀ = 30. Estimate its concentration.",
          steps: [
            "x̂₀ = (30 − 2)/4 = 7.",
            "Check with the centred form: ȳ = 2 + 4·5 = 22, so x̂₀ = 5 + (30 − 22)/4 = 7.",
          ],
          answer: "x̂₀ = 7. The Fieller interval around it is asymmetric, wider on the side away from x̄.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The x-intercept is the same problem",
          text:
            "Seber & Lee §6.1.2 finds a confidence interval for the x-intercept −β₀/β₁ — the special case " +
            "y₀ = 0 with no new-observation error. Every 'at what x does the line reach this level' question " +
            "is a Fieller ratio.",
        },
      ],
    },

    {
      heading: "Controlled calibration",
      blocks: [
        {
          kind: "prose",
          text:
            "When the calibration is done at x values the experimenter sets (as opposed to observes), and " +
            "the relationship may be curved, the same inversion applies to a polynomial calibration curve " +
            "(Seber & Lee §7.1.3). The design lesson is the same as for power: calibration is most precise " +
            "for unknowns near x̄ and when the standards span a wide range.",
        },
      ],
    },
  ],

  references: [
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§6.1.2, Confidence Interval for the x-Intercept" },
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§6.1.5, Inverse Prediction (Calibration); §7.1.3, Controlled Calibration" },
  ],
};
