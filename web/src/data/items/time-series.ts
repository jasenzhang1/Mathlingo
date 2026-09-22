import type { Item, SourceRef } from "../../lib/assessment/types";

/**
 * TS-1 — Stochastic Processes & Time Series.
 *
 * Covers the domain end to end: stochastic processes and the Markov-chain
 * special case, stationarity and white noise, ACF/PACF identification, AR,
 * MA, Wold's theorem, ARMA, ARIMA and unit roots, GARCH, and cointegration.
 * Two items per concept — one recall, one apply/explain — authored from the
 * concept and its prerequisites rather than lifted from a single textbook.
 */

const SHUMWAY_STOFFER: SourceRef = {
  id: "shumway-stoffer",
  tier: "restricted",
  title: "Time Series Analysis and Its Applications (Shumway & Stoffer)",
  locator: "Ch. 1–3, Characteristics and ARMA Models",
  rewriteApprovedBy: "pending-review",
};

const HAMILTON_TS: SourceRef = {
  id: "hamilton-time-series",
  tier: "restricted",
  title: "Time Series Analysis (Hamilton)",
  locator: "Ch. 3–4, 15, Stationary ARMA and Unit Roots",
  rewriteApprovedBy: "pending-review",
};

const HYNDMAN_ATHANASOPOULOS: SourceRef = {
  id: "hyndman-athanasopoulos-fpp",
  tier: "open",
  title: "Forecasting: Principles and Practice (Hyndman & Athanasopoulos), free online edition",
  url: "https://otexts.com/fpp3/",
  license: "CC-BY-NC-SA-4.0",
};

const AUTHORED: SourceRef = {
  id: "mathlingo-authored",
  tier: "generated",
  title: "Authored for Mathlingo from the concept and its prerequisites",
};

export const timeSeriesItems: Item[] = [
  // --- Stochastic Processes ---------------------------------------------
  {
    id: "stochastic-processes--recall-definition",
    conceptId: "stochastic-processes",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What is a stochastic process?",
    choices: [
      { id: "a", text: "A collection of random variables indexed by time (or another ordered set)", correct: true },
      {
        id: "b",
        text: "A single random variable observed many times",
        correct: false,
        misconception: {
          id: "process-as-single-rv",
          description: "Collapses the whole indexed family into one random variable, losing the notion of a sample path.",
          blameConceptId: "stochastic-processes",
        },
      },
      {
        id: "c",
        text: "A deterministic function of time with measurement error added at the end",
        correct: false,
        misconception: {
          id: "process-as-deterministic-plus-noise",
          description: "Treats the whole trajectory as fixed rather than random, missing that different sample paths can look qualitatively different.",
          blameConceptId: "stochastic-processes",
        },
      },
    ],
    difficulty: -1.4,
    discrimination: 1.0,
    expectedSeconds: 25,
    prereqClosure: ["stochastic-processes", "random-variables"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "stochastic-processes--explain-single-path",
    conceptId: "stochastic-processes",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed"],
    stem:
      "An observed time series (e.g. a single stock's daily closing price for five years) is one sample " +
      "path of a stochastic process. Explain why this makes time series analysis fundamentally different " +
      "from analysing an i.i.d. sample of the same size, and name the property that is needed to " +
      "recover the process's statistics from that one path.",
    rubric: {
      elements: [
        {
          id: "one-realization",
          description: "States that the observed series is a single realisation of the process, not n independent draws.",
          weight: 0.4,
          required: true,
        },
        {
          id: "correlated-not-independent",
          description: "Notes the observations are correlated across time rather than independent.",
          weight: 0.3,
        },
        {
          id: "names-stationarity",
          description: "Names stationarity (and/or ergodicity) as the property needed to make time-averages from one path informative about the process.",
          weight: 0.3,
          required: true,
        },
      ],
    },
    difficulty: 0.2,
    discrimination: 1.1,
    expectedSeconds: 60,
    prereqClosure: ["stochastic-processes", "random-variables", "markov-chains"],
    source: AUTHORED,
    status: "live",
  },

  // --- Stationarity & White Noise ----------------------------------------
  {
    id: "stationarity-white-noise--recall-weak-stationarity",
    conceptId: "stationarity-white-noise",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which conditions define weak (covariance) stationarity of {Xₜ}? Select all that apply.",
    choices: [
      { id: "a", text: "E[Xₜ] is the same constant for every t", correct: true },
      { id: "b", text: "Cov(Xₜ, Xₜ₊ₕ) depends on h but not on t", correct: true },
      {
        id: "c",
        text: "The entire joint distribution of any (X_{t1}, ..., X_{tk}) is invariant to shifting all times equally",
        correct: false,
        misconception: {
          id: "confuses-weak-and-strict-stationarity",
          description: "That is strict stationarity, a strictly stronger condition than weak stationarity, which only constrains the first two moments.",
          blameConceptId: "stationarity-white-noise",
        },
      },
      {
        id: "d",
        text: "Xₜ and Xₛ are independent for all t ≠ s",
        correct: false,
        misconception: {
          id: "stationarity-requires-independence",
          description: "Stationarity constrains how moments behave across time, not whether observations are independent — a highly autocorrelated series can still be stationary.",
          blameConceptId: "stationarity-white-noise",
        },
      },
    ],
    difficulty: -0.6,
    discrimination: 1.2,
    expectedSeconds: 40,
    prereqClosure: ["stationarity-white-noise", "stochastic-processes", "covariance"],
    source: SHUMWAY_STOFFER,
    status: "live",
  },
  {
    id: "stationarity-white-noise--apply-spot-nonstationary",
    conceptId: "stationarity-white-noise",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "A monthly retail-sales series has a mean of $40M in most months but spikes to about $70M every " +
      "December, year after year. Is this series weakly stationary?",
    choices: [
      { id: "a", text: "No — the mean is not constant across t (it depends on the month), which violates weak stationarity", correct: true },
      {
        id: "b",
        text: "Yes — the variance is constant, and that's the only requirement",
        correct: false,
        misconception: {
          id: "checks-only-variance",
          description: "Weak stationarity requires a constant mean as well as a lag-only covariance structure; a seasonal mean shift alone rules it out.",
          blameConceptId: "stationarity-white-noise",
        },
      },
      {
        id: "c",
        text: "Yes — because the December spike happens every year, it's predictable and therefore doesn't count as non-stationarity",
        correct: false,
        misconception: {
          id: "predictable-implies-stationary",
          description: "Predictability and stationarity are different properties; a perfectly predictable seasonal mean shift still makes E[Xₜ] depend on t.",
          blameConceptId: "stationarity-white-noise",
        },
      },
    ],
    difficulty: -0.3,
    discrimination: 1.1,
    expectedSeconds: 35,
    prereqClosure: ["stationarity-white-noise", "stochastic-processes", "covariance"],
    source: AUTHORED,
    status: "live",
  },

  // --- ACF -----------------------------------------------------------------
  {
    id: "acf--recall-definition",
    conceptId: "acf",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "For a stationary process, what does ρ(h) = γ(h)/γ(0) measure?",
    choices: [
      { id: "a", text: "The correlation between Xₜ and Xₜ₊ₕ", correct: true },
      {
        id: "b",
        text: "The correlation between Xₜ and Xₜ₊ₕ after removing the effect of the lags in between",
        correct: false,
        misconception: {
          id: "acf-as-pacf",
          description: "That describes PACF, not ACF. ACF is the raw (marginal) autocorrelation, with nothing partialled out.",
          blameConceptId: "acf",
        },
      },
      {
        id: "c",
        text: "The average value of Xₜ over the whole sample",
        correct: false,
        misconception: {
          id: "acf-as-mean",
          description: "Confuses the autocorrelation function with a plain sample mean; ACF is about correlation across time, not a level.",
          blameConceptId: "acf",
        },
      },
    ],
    difficulty: -1.2,
    discrimination: 1.0,
    expectedSeconds: 25,
    prereqClosure: ["acf", "stationarity-white-noise", "correlation"],
    source: SHUMWAY_STOFFER,
    status: "live",
  },
  {
    id: "acf--apply-bartlett-band",
    conceptId: "acf",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "A series has n = 400 observations. Using Bartlett's approximation SE(ρ̂(h)) ≈ 1/√n, what is the " +
      "approximate half-width of the 95% significance band (±1.96·SE) drawn on the ACF plot? Round to three decimals.",
    answerKey: 0.098,
    tolerance: 0.01,
    difficulty: -0.4,
    discrimination: 1.0,
    expectedSeconds: 45,
    prereqClosure: ["acf", "stationarity-white-noise", "correlation"],
    source: HYNDMAN_ATHANASOPOULOS,
    status: "live",
  },

  // --- PACF ------------------------------------------------------------
  {
    id: "pacf--recall-identification-table",
    conceptId: "pacf",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "A series' ACF cuts off sharply after lag 3, and its PACF tails off gradually. What model does this suggest?",
    choices: [
      { id: "a", text: "MA(3)", correct: true },
      {
        id: "b",
        text: "AR(3)",
        correct: false,
        misconception: {
          id: "swaps-acf-pacf-roles",
          description: "AR(p) is identified by PACF cutting off after lag p with ACF tailing off — this question describes the reverse pattern, which is the MA signature.",
          blameConceptId: "pacf",
        },
      },
      {
        id: "c",
        text: "White noise",
        correct: false,
        misconception: {
          id: "cutoff-mistaken-for-no-structure",
          description: "A clean cutoff after a nonzero lag is a clear signature of structure (MA(3) here), not the absence of it — white noise cuts off at lag 0, not lag 3.",
          blameConceptId: "pacf",
        },
      },
    ],
    difficulty: -0.2,
    discrimination: 1.2,
    expectedSeconds: 40,
    prereqClosure: ["pacf", "acf", "stationarity-white-noise", "multiple-linear-regression"],
    source: SHUMWAY_STOFFER,
    status: "live",
  },
  {
    id: "pacf--explain-what-partial-means",
    conceptId: "pacf",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed"],
    stem:
      "Explain what makes φ_{hh} (the PACF at lag h) 'partial' — i.e., what exactly is being controlled " +
      "for that the raw ACF at lag h does not control for.",
    rubric: {
      elements: [
        {
          id: "nets-out-intermediate-lags",
          description: "States that φ_{hh} is the correlation between Xₜ and Xₜ₊ₕ after removing the linear effect of the intermediate lags Xₜ₊₁, …, Xₜ₊ₕ₋₁.",
          weight: 0.6,
          required: true,
        },
        {
          id: "connects-to-regression-analogy",
          description: "Connects this to the partial-regression-coefficient idea (equivalently: the last coefficient in an AR(h) fit).",
          weight: 0.4,
        },
      ],
    },
    difficulty: 0.4,
    discrimination: 1.0,
    expectedSeconds: 60,
    prereqClosure: ["pacf", "acf", "stationarity-white-noise", "multiple-linear-regression"],
    source: AUTHORED,
    status: "live",
  },

  // --- AR Models -------------------------------------------------------
  {
    id: "ar-models--recall-stationarity-condition",
    conceptId: "ar-models",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "For an AR(1) process Xₜ = c + φXₜ₋₁ + εₜ, which condition on φ is required for stationarity?",
    choices: [
      { id: "a", text: "|φ| < 1", correct: true },
      {
        id: "b",
        text: "φ > 0",
        correct: false,
        misconception: {
          id: "sign-not-magnitude",
          description: "Stationarity depends on the magnitude of φ, not its sign — a negative φ with |φ| < 1 is still stationary (and oscillates).",
          blameConceptId: "ar-models",
        },
      },
      {
        id: "c",
        text: "φ = 1",
        correct: false,
        misconception: {
          id: "unit-root-mistaken-for-stationary",
          description: "φ = 1 is precisely the random-walk (unit-root) boundary case, which is non-stationary, not the stationarity condition.",
          blameConceptId: "ar-models",
        },
      },
    ],
    difficulty: -0.8,
    discrimination: 1.2,
    expectedSeconds: 30,
    prereqClosure: ["ar-models", "stationarity-white-noise", "acf"],
    source: HAMILTON_TS,
    status: "live",
  },
  {
    id: "ar-models--apply-characteristic-roots",
    conceptId: "ar-models",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed"],
    stem: "Xₜ = 0.4Xₜ₋₁ + 0.3Xₜ₋₂ + εₜ. Using the characteristic equation 1 − 0.4z − 0.3z² = 0, is this AR(2) stationary?",
    choices: [
      { id: "a", text: "Yes — both roots of the characteristic equation lie outside the unit circle", correct: true },
      {
        id: "b",
        text: "No — because 0.4 + 0.3 = 0.7 is less than 1, which is not enough for stationarity",
        correct: false,
        misconception: {
          id: "sum-of-coefficients-heuristic",
          description: "Sum of the AR coefficients being below 1 is neither necessary nor sufficient on its own; stationarity is determined by the roots of the characteristic equation, not by this shortcut.",
          blameConceptId: "ar-models",
        },
      },
      {
        id: "c",
        text: "Cannot be determined without knowing σ²",
        correct: false,
        misconception: {
          id: "thinks-stationarity-depends-on-noise-variance",
          description: "Stationarity of an AR process is a property of the φ coefficients (via the characteristic roots) only; σ² affects the variance of Xₜ, not whether it is stationary.",
          blameConceptId: "ar-models",
        },
      },
    ],
    difficulty: 0.5,
    discrimination: 1.1,
    expectedSeconds: 90,
    prereqClosure: ["ar-models", "stationarity-white-noise", "acf"],
    source: AUTHORED,
    status: "live",
  },

  // --- MA Models -------------------------------------------------------
  {
    id: "ma-models--recall-acf-cutoff",
    conceptId: "ma-models",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "For an MA(q) process, what happens to the theoretical ACF ρ(h) for h > q?",
    choices: [
      { id: "a", text: "It is exactly zero", correct: true },
      {
        id: "b",
        text: "It decays geometrically toward zero but never reaches it exactly",
        correct: false,
        misconception: {
          id: "confuses-ma-with-ar-decay",
          description: "Geometric decay to zero without an exact cutoff is the AR signature; MA(q)'s ACF is exactly zero beyond lag q by construction.",
          blameConceptId: "ma-models",
        },
      },
      { id: "c", text: "It stays constant at ρ(q)", correct: false },
    ],
    difficulty: -0.9,
    discrimination: 1.1,
    expectedSeconds: 30,
    prereqClosure: ["ma-models", "stationarity-white-noise", "acf"],
    source: HAMILTON_TS,
    status: "live",
  },
  {
    id: "ma-models--explain-invertibility",
    conceptId: "ma-models",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed"],
    stem:
      "For MA(1), Xₜ = μ + εₜ + θεₜ₋₁, explain why the ACF alone cannot distinguish θ from 1/θ, and " +
      "what the invertibility condition |θ| < 1 is doing to resolve that ambiguity.",
    rubric: {
      elements: [
        {
          id: "acf-symmetric-in-theta",
          description: "Notes that ρ(1) = θ/(1+θ²) is unchanged when θ is replaced by 1/θ, so both values imply identical autocorrelation.",
          weight: 0.5,
          required: true,
        },
        {
          id: "invertibility-picks-unique-rep",
          description: "Explains that |θ| < 1 selects the representation with a convergent AR(∞) form in terms of observed Xₜ's, giving a unique, well-behaved choice.",
          weight: 0.5,
          required: true,
        },
      ],
    },
    difficulty: 0.6,
    discrimination: 1.0,
    expectedSeconds: 75,
    prereqClosure: ["ma-models", "stationarity-white-noise", "acf"],
    source: AUTHORED,
    status: "live",
  },

  // --- Wold Decomposition ------------------------------------------------
  {
    id: "wold-decomposition--recall-statement",
    conceptId: "wold-decomposition",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What does Wold's decomposition theorem say about a purely non-deterministic, weakly stationary process?",
    choices: [
      { id: "a", text: "It can be written as an infinite-order moving average of white noise (plus a deterministic term)", correct: true },
      {
        id: "b",
        text: "It must be a finite-order AR or MA process",
        correct: false,
        misconception: {
          id: "wold-implies-finite-order",
          description: "Wold guarantees an infinite MA representation in general; a finite AR or ARMA model is only an approximation to it, not something the theorem requires.",
          blameConceptId: "wold-decomposition",
        },
      },
      {
        id: "c",
        text: "It has no valid linear representation and must be modelled nonlinearly",
        correct: false,
        misconception: {
          id: "wold-denies-linear-representation",
          description: "Wold's theorem is precisely the guarantee that a linear (MA(∞)) representation exists for any such process.",
          blameConceptId: "wold-decomposition",
        },
      },
    ],
    difficulty: 0.0,
    discrimination: 1.0,
    expectedSeconds: 35,
    prereqClosure: ["wold-decomposition", "ar-models", "ma-models"],
    source: SHUMWAY_STOFFER,
    status: "live",
  },
  {
    id: "wold-decomposition--transfer-why-arma-is-parsimonious",
    conceptId: "wold-decomposition",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed"],
    stem:
      "Given that Wold's theorem guarantees every stationary process has an MA(∞) representation, explain " +
      "why time series analysts still bother fitting AR and ARMA models instead of always fitting a long " +
      "MA model directly.",
    rubric: {
      elements: [
        {
          id: "parsimony",
          description: "States that a finite AR or ARMA model can encode the (possibly infinite) ψⱼ weights with far fewer parameters than a literal finite MA truncation would need.",
          weight: 0.6,
          required: true,
        },
        {
          id: "ar1-example-or-analogue",
          description: "Gives or references a concrete case (e.g. AR(1)'s ψⱼ = φʲ) where one AR parameter reproduces infinitely many nonzero MA weights.",
          weight: 0.4,
        },
      ],
    },
    difficulty: 0.9,
    discrimination: 1.2,
    expectedSeconds: 80,
    prereqClosure: ["wold-decomposition", "ar-models", "ma-models"],
    source: AUTHORED,
    status: "live",
  },

  // --- ARMA --------------------------------------------------------------
  {
    id: "arma--recall-stationarity-invertibility-split",
    conceptId: "arma",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem: "For an ARMA(p, q) model, which statements are correct? Select all that apply.",
    choices: [
      { id: "a", text: "Stationarity depends only on the AR (φ) coefficients", correct: true },
      { id: "b", text: "Invertibility depends only on the MA (θ) coefficients", correct: true },
      {
        id: "c",
        text: "Adding MA terms relaxes the stationarity requirement on the AR side",
        correct: false,
        misconception: {
          id: "ma-terms-fix-nonstationarity",
          description: "The stationarity condition is entirely about the AR characteristic roots; MA terms have no bearing on it, so an ARMA model with a unit-root AR part is just as non-stationary as pure AR.",
          blameConceptId: "arma",
        },
      },
    ],
    difficulty: 0.1,
    discrimination: 1.1,
    expectedSeconds: 45,
    prereqClosure: ["arma", "ar-models", "ma-models", "pacf"],
    source: HAMILTON_TS,
    status: "live",
  },
  {
    id: "arma--apply-identification-workflow",
    conceptId: "arma",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "Both the ACF and PACF of a stationary series tail off gradually with no sharp cutoff in either. " +
      "What is the best next step for choosing (p, q)?",
    choices: [
      { id: "a", text: "Fit a small grid of candidate (p, q) pairs and compare by AIC/BIC, then check residuals with Ljung–Box", correct: true },
      {
        id: "b",
        text: "Conclude the series must be white noise, since neither plot shows a clean signal",
        correct: false,
        misconception: {
          id: "both-tailing-off-mistaken-for-no-structure",
          description: "Both ACF and PACF tailing off is the signature of a genuine ARMA process with both p ≥ 1 and q ≥ 1, not the absence of structure — white noise would show both near zero at every lag.",
          blameConceptId: "arma",
        },
      },
      {
        id: "c",
        text: "Pick whichever plot has a taller bar at lag 1 and read the order off that one alone",
        correct: false,
        misconception: {
          id: "picks-order-from-tallest-bar",
          description: "When both ACF and PACF tail off, neither plot pins down (p, q) by itself; order is not reliably read off a single largest bar in this situation.",
          blameConceptId: "arma",
        },
      },
    ],
    difficulty: 0.7,
    discrimination: 1.1,
    expectedSeconds: 60,
    prereqClosure: ["arma", "ar-models", "ma-models", "pacf", "aic-bic"],
    source: AUTHORED,
    status: "live",
  },

  // --- ARIMA ---------------------------------------------------------------
  {
    id: "arima--recall-i-of-d",
    conceptId: "arima",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "A series requires exactly one differencing to become stationary. What is it called in ARIMA notation?",
    choices: [
      { id: "a", text: "Integrated of order 1, I(1)", correct: true },
      {
        id: "b",
        text: "Integrated of order 0, I(0)",
        correct: false,
        misconception: {
          id: "i0-vs-i1-confusion",
          description: "I(0) denotes a series that is already stationary without differencing; needing exactly one difference makes it I(1).",
          blameConceptId: "arima",
        },
      },
      { id: "c", text: "AR(1)", correct: false },
    ],
    difficulty: -0.7,
    discrimination: 1.0,
    expectedSeconds: 25,
    prereqClosure: ["arima", "arma", "ar-models", "ma-models"],
    source: HYNDMAN_ATHANASOPOULOS,
    status: "live",
  },
  {
    id: "arima--explain-trend-vs-unit-root",
    conceptId: "arima",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed"],
    stem:
      "A series has an obvious upward drift. Explain why 'detrend by subtracting a fitted line' and " +
      "'difference the series' are not interchangeable fixes, and what happens if the wrong one is applied.",
    rubric: {
      elements: [
        {
          id: "names-both-cases",
          description: "Distinguishes trend-stationary (deterministic trend, shocks are temporary) from difference-stationary (unit root, shocks are permanent).",
          weight: 0.5,
          required: true,
        },
        {
          id: "wrong-fix-consequence",
          description: "States a concrete consequence of applying the wrong fix (e.g. detrending a unit-root series leaves residual non-stationarity; differencing a trend-stationary series over-differences, inducing spurious MA structure).",
          weight: 0.5,
          required: true,
        },
      ],
    },
    difficulty: 0.8,
    discrimination: 1.2,
    expectedSeconds: 75,
    prereqClosure: ["arima", "arma", "ar-models", "ma-models"],
    source: AUTHORED,
    status: "live",
  },

  // --- GARCH -----------------------------------------------------------
  {
    id: "garch--recall-what-it-models",
    conceptId: "garch",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What does a GARCH model make conditionally autoregressive?",
    choices: [
      { id: "a", text: "The conditional variance of the series", correct: true },
      {
        id: "b",
        text: "The conditional mean of the series",
        correct: false,
        misconception: {
          id: "garch-mistaken-for-mean-model",
          description: "That's what ARMA models; GARCH is specifically a model of the conditional variance, often layered on top of an ARMA mean equation.",
          blameConceptId: "garch",
        },
      },
      { id: "c", text: "The unconditional (long-run) mean only", correct: false },
    ],
    difficulty: -0.5,
    discrimination: 1.1,
    expectedSeconds: 30,
    prereqClosure: ["garch", "arma", "variance"],
    source: HAMILTON_TS,
    status: "live",
  },
  {
    id: "garch--apply-persistence",
    conceptId: "garch",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "A fitted GARCH(1,1) has ω = 0.00004, α₁ = 0.05, β₁ = 0.93. What is the implied long-run " +
      "(unconditional) variance, ω/(1 − α₁ − β₁)? Round to five decimals.",
    answerKey: 0.002,
    tolerance: 0.0002,
    difficulty: 0.6,
    discrimination: 1.1,
    expectedSeconds: 60,
    prereqClosure: ["garch", "arma", "variance"],
    source: AUTHORED,
    status: "live",
  },

  // --- Cointegration -----------------------------------------------------
  {
    id: "cointegration--recall-definition",
    conceptId: "cointegration",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Two I(1) series Xₜ and Yₜ are cointegrated if...",
    choices: [
      { id: "a", text: "Some linear combination Yₜ − βXₜ is stationary (I(0)) for some β", correct: true },
      {
        id: "b",
        text: "They are both stationary on their own",
        correct: false,
        misconception: {
          id: "cointegration-requires-marginal-stationarity",
          description: "Cointegration is specifically about two non-stationary series whose combination is stationary; if each were already stationary on its own, the concept wouldn't apply.",
          blameConceptId: "cointegration",
        },
      },
      {
        id: "c",
        text: "They have the same sample mean",
        correct: false,
        misconception: {
          id: "cointegration-as-equal-means",
          description: "Cointegration is a statement about a linear combination being stationary over time, not about the two series sharing a mean level.",
          blameConceptId: "cointegration",
        },
      },
    ],
    difficulty: 0.2,
    discrimination: 1.1,
    expectedSeconds: 40,
    prereqClosure: ["cointegration", "arima", "arma"],
    source: HAMILTON_TS,
    status: "live",
  },
  {
    id: "cointegration--transfer-spurious-regression",
    conceptId: "cointegration",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed"],
    stem:
      "Explain why regressing one non-stationary series on an unrelated non-stationary series tends to " +
      "produce a misleadingly significant OLS coefficient, and how testing for cointegration addresses " +
      "this problem when the two series are genuinely related.",
    rubric: {
      elements: [
        {
          id: "spurious-regression-mechanism",
          description: "Explains that two independent I(1) series drift together often enough by chance, over a finite sample, to produce high R² and significant t-stats that don't reflect a real relationship (Granger–Newbold).",
          weight: 0.5,
          required: true,
        },
        {
          id: "cointegration-as-resolution",
          description: "States that checking whether the regression residual is stationary (e.g. via Engle–Granger) distinguishes a genuine cointegrating relationship from a spurious one.",
          weight: 0.5,
          required: true,
        },
      ],
    },
    difficulty: 1.0,
    discrimination: 1.2,
    expectedSeconds: 90,
    prereqClosure: ["cointegration", "arima", "arma"],
    source: AUTHORED,
    status: "live",
  },
];
