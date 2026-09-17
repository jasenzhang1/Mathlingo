import type { WikiArticle } from "../types";

export const stochasticProcessesWiki: WikiArticle = {
  conceptId: "stochastic-processes",

  summary:
    "A stochastic process is a collection of random variables indexed by time (or, more generally, by " +
    "any ordered set): {Xₜ}. Where a single random variable describes one uncertain number, a process " +
    "describes an uncertain trajectory — a whole sample path. Everything in this unit is the special " +
    "case where the index is time and the object of interest is how a process's statistics behave as " +
    "that index moves: whether they stay put (stationarity), how a value correlates with its own past " +
    "(autocorrelation), and what simple generating rule could have produced the path in front of you.",

  sections: [
    {
      heading: "What a process is, versus what a random variable is",
      blocks: [
        {
          kind: "formula",
          latex: "{Xₜ : t ∈ T}",
          caption: "T is the index set — ℕ or ℤ for discrete time, ℝ or [0,∞) for continuous time.",
        },
        {
          kind: "prose",
          text:
            "Fix a particular outcome ω in the underlying sample space, and t ↦ Xₜ(ω) is one sample " +
            "path — a single realised trajectory, such as one specific run of a stock price or one " +
            "specific temperature record. Fix t instead, and Xₜ is an ordinary random variable with its " +
            "own distribution. A stochastic process is the whole two-argument object: a random variable " +
            "for every t, glued together with a joint distribution that says how they move together.",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "State space",
              description: "The set of values each Xₜ can take — discrete (a Markov chain's states) or continuous (a stock price, a temperature).",
            },
            {
              term: "Discrete-time vs. continuous-time",
              description: "This unit works almost entirely in discrete time, t = 1, 2, 3, …, because that is what observed data (daily closes, quarterly GDP) actually gives you.",
            },
            {
              term: "Finite-dimensional distributions",
              description: "The joint distribution of (X_{t₁}, …, X_{tₖ}) for every finite set of times — in principle this is all there is to know about a process.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "A time series is one sample path",
          text:
            "This is the single fact that makes time series analysis a different subject from ordinary " +
            "regression, not just regression with a clock added. In cross-sectional data you observe " +
            "many independent draws from the same distribution. In a time series you typically observe " +
            "one draw from a distribution over entire paths — n correlated numbers, not n independent " +
            "ones. Every classical estimator built on i.i.d. sampling needs new justification before it " +
            "can be pointed at data like this, which is exactly what stationarity (next concept) supplies.",
        },
      ],
    },

    {
      heading: "The worked special case: Markov chains and transition matrices",
      blocks: [
        {
          kind: "prose",
          text:
            "The cleanest example of a stochastic process — discrete state space, discrete time, and a " +
            "transition rule simple enough to write down as a matrix — is the Markov chain, covered in " +
            "full in its own article. It is worth restating here only as the anchor for everything this " +
            "unit adds on top of it.",
        },
        {
          kind: "formula",
          latex: "P(X_{n+1} = j | Xₙ = i, X_{n−1}, …) = P(X_{n+1} = j | Xₙ = i) = P_{ij}",
          caption: "The Markov property: the present state screens off the entire past.",
        },
        {
          kind: "table",
          headers: ["Markov-chain object", "What it is", "Where it reappears in this unit"],
          rows: [
            ["Transition matrix P", "P_{ij} = P(next = j | now = i); Pⁿ propagates n steps ahead", "AR(1) is the continuous-state analogue: Xₜ = φXₜ₋₁ + εₜ is a linear, noisy transition rule"],
            ["Stationary distribution π = πP", "The distribution the chain does not move away from", "Weak stationarity below is the same idea for a process's mean and covariance rather than its full distribution"],
            ["Ergodicity (irreducible + aperiodic)", "Guarantees π is unique and πₙ → π from any start", "The ergodic theorem is what licenses using one long sample path's time-average in place of an average over many paths — the justification for estimating ACF from a single series"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "AR(1) is a Markov chain on a continuous state space",
          text:
            "Xₜ = φXₜ₋₁ + εₜ satisfies exactly the Markov property above: the distribution of Xₜ₊₁ given " +
            "the whole history depends only on Xₜ. The transition matrix becomes a transition kernel — " +
            "Xₜ₊₁ | Xₜ ~ N(φXₜ, σ²) — and everything about long-run behaviour that eigenvalue |λ₂| < 1 " +
            "controlled for a finite chain, the condition |φ| < 1 controls here. That parallel is not a " +
            "coincidence; it is why stationarity conditions on AR models keep looking like eigenvalue " +
            "conditions.",
        },
      ],
    },

    {
      heading: "Where this unit is going",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Stationarity & white noise — the assumption that makes a single sample path informative about the whole process, and the pure-noise process every model below is built out of.",
            "ACF & PACF — the diagnostic plots that read a series' own correlation structure off the data, before fitting anything.",
            "AR and MA models — the two atomic linear building blocks, and Wold's theorem, which says every stationary process is (approximately) an MA of one of them.",
            "ARMA and ARIMA — combining AR and MA for parsimony, then differencing away non-stationarity so ARMA machinery still applies.",
            "GARCH — the same autoregressive idea applied to variance instead of the mean, for series whose volatility itself clusters.",
            "Cointegration — what can go right, and badly wrong, when two non-stationary series are regressed on each other.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "i.i.d. machinery does not transfer for free",
          text:
            "Standard errors computed as if observations were independent are systematically wrong for " +
            "autocorrelated data — usually too small, which is why untreated time series regressions " +
            "report implausibly tiny p-values. Every tool in this unit exists to either model the " +
            "dependence explicitly (AR/MA/ARMA) or to test for it before trusting a regression at all " +
            "(cointegration).",
        },
      ],
    },
  ],

  references: [
    { source: "Shumway & Stoffer, Time Series Analysis and Its Applications", locator: "Ch. 1, Characteristics of Time Series" },
    { source: "Hamilton, Time Series Analysis", locator: "Ch. 3, Stationary ARMA Processes (background)" },
    { source: "Ross, Stochastic Processes", locator: "Ch. 1–2, Preliminaries and Markov Chains" },
  ],
};
