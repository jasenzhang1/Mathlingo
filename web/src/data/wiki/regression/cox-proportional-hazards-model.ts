import type { WikiArticle } from "../types";

export const coxProportionalHazardsModelWiki: WikiArticle = {
  conceptId: "cox-proportional-hazards-model",

  summary:
    "The Cox model relates covariates to the risk of an event over time through " +
    "h(t | x) = h₀(t)·exp(xᵀβ). Its distinctive move is to leave the baseline hazard h₀(t) " +
    "completely unspecified and estimate β anyway, using a partial likelihood built only from the " +
    "order in which events occurred. That makes it semi-parametric: parametric in the covariates, " +
    "nonparametric in time. It also handles censored observations natively, which is what ordinary " +
    "regression on survival times cannot do.",

  sections: [
    {
      heading: "Survival data and censoring",
      blocks: [
        {
          kind: "prose",
          text:
            "Survival analysis models the time until an event — death, relapse, machine failure, " +
            "customer churn. What makes it a separate subject is censoring: for many subjects the " +
            "study ends, or they drop out, before the event happens. Their true event time is " +
            "unknown, but it is known to exceed the observed follow-up time, and that partial " +
            "information is real.",
        },
        {
          kind: "table",
          headers: ["Handling of censored cases", "Consequence"],
          rows: [
            ["Drop them", "Discards the longest survivors, biasing every estimate downward"],
            ["Treat the censoring time as the event time", "Understates survival, badly and systematically"],
            ["Model 'event within the study window' as binary", "Throws away all timing information"],
            ["Use a survival model", "Uses the 'known to exceed t' information correctly"],
          ],
        },
        {
          kind: "definitions",
          items: [
            {
              term: "Survival function S(t)",
              description: "P(T > t) — the probability of surviving beyond time t.",
            },
            {
              term: "Hazard h(t)",
              description:
                "The instantaneous event rate at t among those who have survived to t: lim P(t ≤ T < t+dt | T ≥ t)/dt. Not a probability — it can exceed 1.",
            },
            {
              term: "Right censoring",
              description: "The event has not occurred by the last observation. The common case, and what Cox regression assumes.",
            },
          ],
        },
      ],
    },

    {
      heading: "The model",
      blocks: [
        {
          kind: "formula",
          latex: "h(t | x) = h₀(t) · exp(xᵀβ)",
          caption: "A shared baseline hazard over time, scaled up or down by a covariate-dependent factor.",
        },
        {
          kind: "prose",
          text:
            "The covariates do not change the shape of the hazard over time; they multiply it by a " +
            "constant. Taking logs makes the connection to the rest of this domain explicit: " +
            "ln h(t | x) = ln h₀(t) + xᵀβ, which is a linear predictor with a log link and a " +
            "time-varying intercept.",
        },
        {
          kind: "formula",
          latex: "h(t | x₁) / h(t | x₂) = exp((x₁ − x₂)ᵀβ)",
          caption: "The hazard ratio: h₀(t) cancels, so the ratio is constant in time.",
        },
        {
          kind: "prose",
          text:
            "That cancellation is the whole point. Comparing two subjects, the unknown baseline " +
            "hazard disappears, leaving a quantity that depends only on β and the covariate " +
            "difference. A coefficient of 0.4 means e^0.4 ≈ 1.49: a 49% higher event rate per unit " +
            "of the covariate, at every point in time.",
        },
      ],
    },

    {
      heading: "Partial likelihood: estimating β without h₀",
      blocks: [
        {
          kind: "prose",
          text:
            "Cox's insight was to build a likelihood from the ordering of events rather than their " +
            "times. At each moment an event occurs, ask: given that someone in the current risk set " +
            "failed right now, what is the probability it was this particular subject?",
        },
        {
          kind: "formula",
          latex: "L(β) = ∏_{events i} exp(xᵢᵀβ) / Σ_{j ∈ R(tᵢ)} exp(xⱼᵀβ)",
          caption: "R(tᵢ) is the risk set — everyone still under observation and event-free just before tᵢ.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Each subject's instantaneous hazard is h₀(t)exp(xᵀβ).",
            "The conditional probability that subject i is the one who fails is their hazard divided by the total hazard in the risk set.",
            "h₀(t) appears in every numerator and every denominator term at that instant, so it cancels exactly.",
            "Multiply these conditional probabilities across all observed event times to get the partial likelihood.",
            "Maximise it numerically — the resulting β̂ is consistent and asymptotically normal, so standard errors and Wald tests work as usual.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Censored subjects contribute without ever appearing in a numerator",
          text:
            "A subject censored at time t is in the risk set for every event before t, so they " +
            "appear in those denominators — their survival up to t is information about who else " +
            "could have failed. After t they simply drop out. This is precisely the 'known to " +
            "exceed t' information being used, and it is why Cox regression handles censoring " +
            "natively rather than by correction.",
        },
      ],
    },

    {
      heading: "Checking proportional hazards",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "The assumption is proportional hazards, not constant hazards",
          text:
            "The model does not assume the hazard is flat over time — h₀(t) is arbitrary and can " +
            "rise, fall, or oscillate. What it assumes is that the ratio between two subjects stays " +
            "the same. Confusing 'constant hazard' with 'constant hazard ratio' is the standard " +
            "misreading; the constant-hazard model is the exponential survival model, which is far " +
            "more restrictive.",
        },
        {
          kind: "list",
          items: [
            "Plot Schoenfeld residuals against time: a systematic trend indicates the effect is changing, violating proportionality.",
            "Plot log(−log S(t)) against log t for each level of a categorical covariate: parallel curves support the assumption.",
            "Add a covariate-by-time interaction and test it — a significant term is direct evidence against proportionality.",
            "When it fails: stratify on the offending variable (each stratum gets its own baseline hazard, at the cost of not estimating that variable's effect), or fit a time-varying coefficient, or split follow-up into intervals and fit within each.",
          ],
        },
        {
          kind: "example",
          title: "A treatment whose effect fades",
          problem:
            "A drug halves the hazard in the first year and has no effect after. Schoenfeld residuals " +
            "trend upward with time. Is a single Cox coefficient adequate?",
          steps: [
            "The hazard ratio is about 0.5 early and about 1.0 later, so it is not constant.",
            "A single β̂ estimates a weighted average of the two, roughly 0.7, describing neither period.",
            "The upward Schoenfeld trend is exactly this: the log hazard ratio rising over time.",
          ],
          answer:
            "No. Fit a time-varying coefficient, or split follow-up at one year and estimate the effect separately in each period. Reporting 'hazard ratio 0.7' would understate the early benefit and invent a late one.",
        },
      ],
    },

    {
      heading: "Where it sits relative to the GLM framework",
      blocks: [
        {
          kind: "table",
          headers: ["GLM component", "Cox model"],
          rows: [
            ["Linear predictor xᵀβ", "Kept, unchanged"],
            ["Link function", "Log link, applied to the hazard rather than the mean"],
            ["Response distribution", "Not specified — h₀(t) is left free"],
            ["Likelihood", "Partial rather than full"],
            ["Consequence", "Semi-parametric: robust to the shape of the baseline, at some cost in efficiency"],
          ],
        },
        {
          kind: "prose",
          text:
            "So the Cox model keeps the structural half of the GLM framework and relaxes the " +
            "distributional half. The cost is a modest loss of efficiency relative to a correctly " +
            "specified parametric survival model — Weibull, say — and the benefit is not having to " +
            "get that specification right. In medicine, where the shape of the baseline hazard is " +
            "rarely known and rarely the question, that has proved an excellent trade, and the Cox " +
            "model is among the most-used statistical models in the field.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "A hazard ratio is not a risk ratio and not a change in survival time",
          text:
            "A hazard ratio of 0.5 does not mean patients live twice as long, nor that half as many " +
            "die. It is a ratio of instantaneous rates, and translating it into a difference in " +
            "median survival requires the baseline hazard the model deliberately declined to " +
            "estimate. Report absolute survival curves alongside the hazard ratio when the audience " +
            "needs to act on the number.",
        },
      ],
    },
  ],

  references: [
    { source: "Singer & Willett, Applied Longitudinal Data Analysis", locator: "Ch. 14–15, Fitting Cox Regression Models" },
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning", locator: "§18.8, Survival Analysis" },
    { source: "Murphy, Probabilistic Machine Learning: An Introduction", locator: "Ch. 12, Generalized Linear Models and Extensions" },
    { source: "Mathlingo assessment bank", locator: "assessments/reg-05-generalized-and-special-regression.md" },
  ],
};
