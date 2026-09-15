import type { WikiArticle } from "../types";

export const garchWiki: WikiArticle = {
  conceptId: "garch",

  summary:
    "ARCH and GARCH models point the autoregressive idea at variance instead of the mean: they model a " +
    "series whose conditional variance — not its level — is itself predictable from the past, the " +
    "'volatility clustering' visible in almost any financial return series (calm stretches and turbulent " +
    "stretches, each lasting a while). The series can be white noise in the ordinary sense — zero " +
    "autocorrelation at every lag — while its squared values are strongly autocorrelated, which is " +
    "exactly the gap ARCH/GARCH fills.",

  sections: [
    {
      heading: "The problem: variance clustering that ARMA can't see",
      blocks: [
        {
          kind: "prose",
          text:
            "A daily return series often has an ACF that looks like white noise — no linear structure " +
            "in the levels — yet its squared or absolute returns show strong, persistent autocorrelation: " +
            "a large move today makes a large move (of either sign) more likely tomorrow. ARMA is a " +
            "model of the conditional mean; it has nothing to say about this, because the conditional " +
            "mean can be genuinely unpredictable (consistent with an efficient market) even while the " +
            "conditional variance is not.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "White noise in levels, autocorrelated in squares",
          text:
            "This is precisely the gap the stationarity/white-noise article flagged: white noise " +
            "requires only Cov(εₜ, εₛ) = 0, not independence. A GARCH-generated series satisfies the " +
            "first and violates the second — εₜ² is correlated with εₜ₋₁² even though εₜ and εₜ₋₁ are " +
            "not. It passes an ACF-based white-noise check on the raw series and fails one on the " +
            "squared series, which is exactly the diagnostic used to decide whether GARCH is needed.",
        },
      ],
    },

    {
      heading: "ARCH(m)",
      blocks: [
        {
          kind: "formula",
          latex: "εₜ = σₜzₜ,   zₜ ~ i.i.d.(0, 1),   σₜ² = ω + α₁εₜ₋₁² + ⋯ + αₘεₜ₋ₘ²",
          caption: "ARCH(m): today's conditional variance is a weighted sum of the last m squared shocks.",
        },
        {
          kind: "prose",
          text:
            "εₜ has conditional mean zero and conditional variance σₜ² given the past — an AR(m) model, " +
            "but for σₜ² rather than for εₜ itself. A large |εₜ₋₁| directly raises σₜ², making a large " +
            "|εₜ| more likely — the volatility-clustering mechanism, built in by construction. ARCH " +
            "needs ω > 0 and every αᵢ ≥ 0 to keep σₜ² positive.",
        },
      ],
    },

    {
      heading: "GARCH(p, q): letting variance depend on its own past too",
      blocks: [
        {
          kind: "formula",
          latex: "σₜ² = ω + Σᵢ₌₁ᵖ αᵢεₜ₋ᵢ² + Σⱼ₌₁^q βⱼσₜ₋ⱼ²",
          caption: "GARCH(p, q): current variance depends on past squared shocks (the ARCH terms) and on past variance itself (the GARCH terms).",
        },
        {
          kind: "prose",
          text:
            "This is the ARMA-to-AR relationship replayed one level up: adding lagged σₜ₋ⱼ² terms lets a " +
            "GARCH(1,1) — by far the most common specification in practice — match volatility " +
            "persistence that would need a large ARCH(m) to approximate. GARCH(1,1) is often described " +
            "as the volatility analogue of ARMA(1,1), for exactly that reason.",
        },
        {
          kind: "formula",
          latex: "σₜ² = ω + α₁εₜ₋₁² + β₁σₜ₋₁²,   unconditional variance = ω/(1 − α₁ − β₁)",
          caption: "GARCH(1,1), and its long-run (unconditional) variance — finite and well-defined only when α₁ + β₁ < 1.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "α₁ + β₁ close to 1 means highly persistent volatility",
          text:
            "α₁ + β₁ plays the same role here that φ played for AR(1): it governs how fast a volatility " +
            "shock decays. Estimated values for daily financial returns are frequently in the 0.95–0.99 " +
            "range — volatility shocks that take a very long time to fade, which is the formal version of " +
            "'a crash's elevated volatility takes months to normalise.' α₁ + β₁ ≥ 1 (an 'IGARCH' " +
            "process) means variance shocks never fully decay, the volatility analogue of a unit root.",
        },
        {
          kind: "example",
          title: "Reading persistence from fitted GARCH(1,1) parameters",
          problem: "A fitted GARCH(1,1) has α₁ = 0.08, β₁ = 0.90, ω = 0.00002. What is the implied long-run variance, and is the process stationary in variance?",
          steps: [
            "α₁ + β₁ = 0.98 < 1, so the process is variance-stationary and the unconditional variance is finite.",
            "Unconditional variance = ω/(1 − α₁ − β₁) = 0.00002/0.02 = 0.001.",
            "Long-run volatility (SD) = √0.001 ≈ 0.0316, about 3.16% — but with α₁+β₁ = 0.98, a shock to variance decays slowly, so realised volatility can sit far from that long-run value for extended periods.",
          ],
          answer: "Long-run variance ≈ 0.001 (SD ≈ 3.16%); the process is variance-stationary but highly persistent.",
        },
      ],
    },

    {
      heading: "Where GARCH is used, and its limits",
      blocks: [
        {
          kind: "list",
          items: [
            "Volatility forecasting for option pricing and risk measures (VaR, expected shortfall) — the primary practical use.",
            "GARCH models the magnitude of moves, typically leaving the mean equation to a simple constant or a small ARMA fit separately — the two are usually estimated jointly as an ARMA-GARCH model.",
            "Standard GARCH is symmetric: a positive and a negative shock of the same size raise σₜ² by the same amount. Equity markets typically show the opposite (bad news raises volatility more) — the EGARCH and GJR-GARCH extensions add that asymmetry.",
            "Like ARMA, GARCH assumes the series is otherwise stationary in the mean; a trending mean should be handled (e.g. by ARIMA) before or alongside modelling its variance.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Engle, \"Autoregressive Conditional Heteroscedasticity...\", Econometrica 1982", locator: "The original ARCH paper" },
    { source: "Bollerslev, \"Generalized Autoregressive Conditional Heteroskedasticity\", Journal of Econometrics 1986", locator: "The original GARCH paper" },
    { source: "Tsay, Analysis of Financial Time Series", locator: "Ch. 3, Conditional Heteroscedastic Models" },
  ],
};
