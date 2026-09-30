import type { WikiArticle } from "../types";

/**
 * The "Point Processes" section after the homogeneous Poisson process:
 * superposition and thinning, the non-homogeneous Poisson process, the compound
 * Poisson process, conditional intensity, and Hawkes processes. Each builds on
 * the one before — thinning is how the non-homogeneous process is simulated,
 * its integrated rate reappears as the compensator in the conditional-intensity
 * likelihood, and a Hawkes process is that likelihood with a self-exciting rate.
 */

export const poissonThinningSuperpositionWiki: WikiArticle = {
  conceptId: "poisson-thinning-superposition",
  summary:
    "Poisson processes are closed under the two most natural operations on event streams. Merging independent Poisson " +
    "streams gives a Poisson stream whose rate is the sum of the rates. Keeping each event independently with " +
    "probability $p$ — thinning — gives a Poisson stream of rate $p\\lambda$, and the kept and discarded streams are " +
    "independent of each other. That independence is the surprising part.",
  sections: [
    {
      heading: "The two theorems",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Superposition", description: "If $N_1, \\ldots, N_k$ are independent Poisson processes with rates $\\lambda_1, \\ldots, \\lambda_k$, then $N = \\sum_j N_j$ is Poisson with rate $\\lambda = \\sum_j \\lambda_j$, and each event of $N$ came from stream $j$ with probability $\\lambda_j/\\lambda$, independently of everything else." },
            { term: "Thinning", description: "If each event of a rate-$\\lambda$ Poisson process is kept with probability $p$, independently, the kept events form a Poisson process of rate $p\\lambda$, the discarded events one of rate $(1 - p)\\lambda$, and the two are independent." },
          ],
        },
        {
          kind: "prose",
          text:
            "Thinning's independence follows from splitting a Poisson count: if $N \\sim \\text{Poisson}(\\lambda t)$ and each event is " +
            "kept with probability $p$, then $P(K = k, D = d) = e^{-p\\lambda t}\\frac{(p\\lambda t)^k}{k!} \\cdot e^{-(1-p)\\lambda t}\\frac{((1-p)\\lambda t)^d}{d!}$ — " +
            "the joint pmf factors.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Two queues and a filter",
          problem:
            "Calls arrive at rate $3$ per minute from customers and $1$ per minute from partners. $40\\%$ of all calls are escalated. What is the rate of escalated calls, and what is the probability that the next call is from a partner?",
          steps: [
            "Superposition: all calls form a Poisson process of rate $4$.",
            "Thinning: escalated calls are Poisson with rate $0.4 \\times 4 = 1.6$ per minute.",
            "The next call is from a partner with probability $1/4 = 0.25$.",
          ],
          answer: "$1.6$ escalated calls per minute; $P(\\text{partner}) = 0.25$.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Independence of the marks is required",
          text:
            "If the decision to keep an event depends on the event history — keeping every other event, say — the thinned " +
            "process is not Poisson. Keeping every second event of a Poisson process gives Gamma(2) gaps.",
        },
      ],
    },
  ],
  references: [
    { source: "Ross, Introduction to Probability Models (12th ed.)", locator: "§5.3.4–5.3.5" },
    { source: "Blitzstein & Hwang, Introduction to Probability (2nd ed.)", locator: "§13.2" },
  ],
};

export const nonhomogeneousPoissonProcessWiki: WikiArticle = {
  conceptId: "nonhomogeneous-poisson-process",
  summary:
    "Real event rates change: calls peak at lunch, traffic at rush hour. A non-homogeneous Poisson process keeps " +
    "independent increments but lets the rate be a function $\\lambda(t)$. Counts over any window are still Poisson, " +
    "with mean equal to the area under the rate curve; the waiting times are no longer exponential.",
  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "N(b) - N(a) \\sim \\text{Poisson}\\big(\\Lambda(b) - \\Lambda(a)\\big), \\qquad \\Lambda(t) = \\int_0^t \\lambda(s)\\,ds",
          caption: "counts in disjoint intervals are independent; $\\Lambda$ is the cumulative (integrated) intensity",
        },
        {
          kind: "list",
          items: [
            "$P(\\text{no events in } (t, t + s]) = e^{-(\\Lambda(t + s) - \\Lambda(t))}$, which depends on $t$ — the process is not stationary.",
            "Time change: $\\tilde{N}(u) = N(\\Lambda^{-1}(u))$ is a homogeneous Poisson process of rate $1$. Stretching time where the rate is high makes it uniform.",
            "Given $N(T) = n$, the event times are i.i.d. with density $\\lambda(t)/\\Lambda(T)$ on $[0, T]$.",
          ],
        },
      ],
    },
    {
      heading: "Simulation by thinning (Lewis–Shedler)",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Pick $\\lambda^* \\ge \\lambda(t)$ for all $t$ in the window.",
            "Simulate a homogeneous Poisson process of rate $\\lambda^*$.",
            "Keep a candidate event at time $t$ with probability $\\lambda(t)/\\lambda^*$.",
          ],
        },
        {
          kind: "example",
          title: "Expected count",
          problem: "Arrivals have rate $\\lambda(t) = 2 + t$ per hour for $t \\in [0, 4]$. Find the expected number of arrivals and the probability of none in the first hour.",
          steps: [
            "$\\Lambda(4) = \\int_0^4 (2 + t)\\,dt = 8 + 8 = 16$.",
            "$\\Lambda(1) = 2 + 0.5 = 2.5$, so $P(N(1) = 0) = e^{-2.5} \\approx 0.082$.",
          ],
          answer: "Expected $16$ arrivals over four hours; $P(\\text{none in hour } 1) \\approx 0.082$.",
        },
      ],
    },
  ],
  references: [
    { source: "Ross, Introduction to Probability Models (12th ed.)", locator: "§5.4.1" },
    { source: "Lewis & Shedler, Simulation of nonhomogeneous Poisson processes by thinning (1979)", locator: "§2" },
  ],
};

export const compoundPoissonProcessWiki: WikiArticle = {
  conceptId: "compound-poisson-process",
  summary:
    "A compound Poisson process adds up a random amount at each event of a Poisson process: $S(t) = \\sum_{i=1}^{N(t)} Y_i$. " +
    "Insurance claim totals, aggregate trade volume and the jump part of jump-diffusion models all have this form. " +
    "Its mean and variance follow from the laws of total expectation and total variance.",
  sections: [
    {
      heading: "Moments",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbb{E}[S(t)] = \\lambda t\\, \\mathbb{E}[Y], \\qquad \\operatorname{Var}(S(t)) = \\lambda t\\, \\mathbb{E}[Y^2]",
          caption: "$Y_i$ i.i.d. and independent of $N$; note the second moment, not the variance, of $Y$",
        },
        {
          kind: "prose",
          text:
            "Condition on $N(t) = n$: $\\mathbb{E}[S \\mid N] = N\\mu_Y$ and $\\operatorname{Var}(S \\mid N) = N\\sigma_Y^2$. Then " +
            "$\\operatorname{Var}(S) = \\mathbb{E}[N]\\sigma_Y^2 + \\operatorname{Var}(N)\\mu_Y^2 = \\lambda t(\\sigma_Y^2 + \\mu_Y^2) = \\lambda t\\,\\mathbb{E}[Y^2]$ — the " +
            "Poisson's equal mean and variance collapse the two terms into one.",
        },
        {
          kind: "list",
          items: [
            "$S$ has independent, stationary increments — it is a Lévy process.",
            "Its MGF is $\\mathbb{E}[e^{uS(t)}] = \\exp\\big(\\lambda t(M_Y(u) - 1)\\big)$.",
            "If the $Y_i$ take values in a finite set, $S$ splits (by thinning) into independent Poisson counts of each jump size.",
          ],
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Annual claims",
          problem: "Claims arrive at rate $50$ per year with sizes of mean $2$ and standard deviation $3$ (thousands). Find the mean and standard deviation of the annual total.",
          steps: [
            "$\\mathbb{E}[S] = 50 \\times 2 = 100$.",
            "$\\mathbb{E}[Y^2] = 3^2 + 2^2 = 13$, so $\\operatorname{Var}(S) = 50 \\times 13 = 650$.",
            "$\\operatorname{SD}(S) = \\sqrt{650} \\approx 25.5$.",
          ],
          answer: "Mean $100$, standard deviation about $25.5$ thousand.",
        },
      ],
    },
  ],
  references: [
    { source: "Ross, Introduction to Probability Models (12th ed.)", locator: "§5.4.2" },
    { source: "Shreve, Stochastic Calculus for Finance II", locator: "§11.3" },
  ],
};

export const conditionalIntensityWiki: WikiArticle = {
  conceptId: "conditional-intensity",
  summary:
    "A point process on the line is fully described by its conditional intensity $\\lambda^*(t)$: the instantaneous rate " +
    "of events at time $t$ given everything that has happened before. A Poisson process is the special case where the " +
    "history is irrelevant. The intensity gives the likelihood directly, which is how point-process models are fitted.",
  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "\\lambda^*(t) = \\lim_{\\Delta \\to 0} \\frac{P\\big(\\text{event in } [t, t + \\Delta) \\mid \\mathcal{H}_t\\big)}{\\Delta}",
          caption: "$\\mathcal{H}_t$ is the history of event times before $t$",
        },
        {
          kind: "table",
          headers: ["Process", "$\\lambda^*(t)$"],
          rows: [
            ["Homogeneous Poisson", "$\\lambda$"],
            ["Non-homogeneous Poisson", "$\\lambda(t)$ — depends on time, not on history"],
            ["Renewal process", "the hazard of the gap distribution, evaluated at the time since the last event"],
            ["Hawkes process", "$\\mu + \\sum_{t_i < t} \\phi(t - t_i)$"],
          ],
        },
      ],
    },
    {
      heading: "Likelihood",
      blocks: [
        {
          kind: "formula",
          latex: "\\log L = \\sum_{i=1}^{n} \\log \\lambda^*(t_i) - \\int_0^T \\lambda^*(s)\\,ds",
          caption: "events at $t_1 < \\cdots < t_n$ observed on $[0, T]$",
        },
        {
          kind: "prose",
          text:
            "The first term rewards a high intensity where events happened; the second, the compensator, penalises a high " +
            "intensity everywhere. For a homogeneous Poisson process it reduces to $n \\log \\lambda - \\lambda T$, maximised at " +
            "$\\hat{\\lambda} = n/T$.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Checking a fitted model: time rescaling",
          text:
            "If the model is right, the transformed times $\\tau_i = \\int_0^{t_i} \\lambda^*(s)\\,ds$ form a unit-rate Poisson " +
            "process, so the gaps $\\tau_i - \\tau_{i-1}$ are i.i.d. $\\text{Exponential}(1)$. A Q-Q plot of those gaps against " +
            "exponential quantiles is the standard goodness-of-fit check.",
        },
      ],
    },
  ],
  references: [
    { source: "Daley & Vere-Jones, An Introduction to the Theory of Point Processes, Vol. I (2nd ed.)", locator: "§7.2" },
    { source: "Rasmussen, Lecture notes: Temporal point processes and the conditional intensity function (2018)", locator: "§2–3" },
  ],
};

export const hawkesProcessWiki: WikiArticle = {
  conceptId: "hawkes-process",
  summary:
    "In a Hawkes process every event temporarily raises the rate of future events. Earthquakes trigger aftershocks, trades " +
    "trigger trades, tweets trigger retweets. The result is clustering that a Poisson process cannot produce. A single " +
    "number, the branching ratio, decides whether the process settles into a stationary rate or explodes.",
  sections: [
    {
      heading: "Intensity and the branching view",
      blocks: [
        {
          kind: "formula",
          latex: "\\lambda^*(t) = \\mu + \\sum_{t_i < t} \\alpha\\, e^{-\\beta(t - t_i)}",
          caption: "baseline $\\mu$; each event adds a jump $\\alpha$ that decays at rate $\\beta$ (exponential kernel)",
        },
        {
          kind: "list",
          items: [
            "Branching (cluster) representation: immigrants arrive as a Poisson process of rate $\\mu$; each event independently has a $\\text{Poisson}(n)$ number of direct offspring, with $n = \\int_0^\\infty \\phi(s)\\,ds = \\alpha/\\beta$.",
            "$n$ is the branching ratio — the expected number of events directly triggered by one event.",
            "Stationarity requires $n < 1$. Then the long-run rate is $\\bar{\\lambda} = \\mu/(1 - n)$, and a fraction $n$ of all events are triggered rather than spontaneous.",
            "Each immigrant starts a cluster of expected size $1/(1 - n)$.",
          ],
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Order-flow clustering",
          problem: "A Hawkes model for trades has $\\mu = 2$ per second, $\\alpha = 1.5$ and $\\beta = 2$. Find the branching ratio, the long-run trade rate, and the fraction of trades that are triggered.",
          steps: [
            "$n = \\alpha/\\beta = 0.75 < 1$, so the process is stationary.",
            "$\\bar{\\lambda} = 2/(1 - 0.75) = 8$ trades per second.",
            "A fraction $n = 0.75$ of trades are endogenous — triggered by earlier trades.",
          ],
          answer: "Branching ratio $0.75$; $8$ trades per second on average, three quarters of them triggered.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Near-critical fits",
          text:
            "Fitted branching ratios for financial markets are often close to $1$. With estimation error and nonstationary " +
            "baselines this is hard to distinguish from a time-varying $\\mu$; a baseline that ignores intraday seasonality " +
            "inflates the estimated $n$.",
        },
      ],
    },
    {
      heading: "Estimation",
      blocks: [
        {
          kind: "prose",
          text:
            "Parameters are fitted by maximising the conditional-intensity log-likelihood. With an exponential kernel both the " +
            "sum over past events and the compensator can be updated recursively, so the likelihood costs $O(n)$ rather " +
            "than $O(n^2)$. The EM algorithm, treating each event's parent as a latent variable, is a common alternative.",
        },
      ],
    },
  ],
  references: [
    { source: "Hawkes, Spectra of some self-exciting and mutually exciting point processes (Biometrika, 1971)", locator: "§2" },
    { source: "Bacry, Mastromatteo & Muzy, Hawkes processes in finance (Market Microstructure and Liquidity, 2015)", locator: "§2–3" },
  ],
};
