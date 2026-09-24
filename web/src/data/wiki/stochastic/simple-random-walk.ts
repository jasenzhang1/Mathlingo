import type { WikiArticle } from "../types";

export const simpleRandomWalkWiki: WikiArticle = {
  conceptId: "simple-random-walk",
  summary:
    "The simple random walk $S_n = X_1 + X_2 + \\cdots + X_n$ sums $n$ independent, identically " +
    "distributed $\\pm 1$ steps. It looks almost too simple to be foundational, but it is: it is a " +
    "martingale in its own right, and — rescaled by $\\sqrt n$ — it is the discrete process whose " +
    "continuous-time limit *is* Brownian motion. Everything in this domain's calculus ultimately " +
    "traces back to this one sum.",

  sections: [
    {
      heading: "Steps, sums, and the fair case",
      blocks: [
        {
          kind: "formula",
          latex: "S_n = X_1 + X_2 + \\cdots + X_n, \\qquad X_i = \\begin{cases} +1 & \\text{w.p. } p \\\\ -1 & \\text{w.p. } 1-p \\end{cases}",
          caption: "S_0 = 0, and the X_i are independent across i",
        },
        {
          kind: "prose",
          text:
            "The walk is called simple because each step has only two possible values, and it is called " +
            "fair when $p = 1/2$ — the case this article focuses on, since it is the one that generalizes " +
            "directly to Brownian motion. Independence is doing real work here: each step carries no " +
            "memory of the ones before it, so the whole history of the walk is captured by nothing more " +
            "than the running total.",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "Independent increments",
              description:
                "$X_1, \\ldots, X_n$ are mutually independent. The increment $S_n - S_m$ (for $n > m$) depends only on steps $X_{m+1}, \\ldots, X_n$ and is independent of everything up to time $m$.",
            },
            {
              term: "Identically distributed",
              description: "Every $X_i$ has the same $\\pm 1$ distribution — the walk's statistics don't drift over time step by step.",
            },
            {
              term: "Fair walk ($p = 1/2$)",
              description: "$E[X_i] = 0$ and $\\text{Var}(X_i) = 1$. Unless stated otherwise, this is the case referred to below.",
            },
          ],
        },
      ],
    },

    {
      heading: "Mean and variance",
      blocks: [
        {
          kind: "prose",
          text:
            "Because the steps are independent, the mean and variance of the sum are just $n$ times the " +
            "mean and variance of a single step — no covariance terms to worry about.",
        },
        {
          kind: "formula",
          latex: "E[S_n] = n \\cdot E[X_1] = 0, \\qquad \\text{Var}(S_n) = n \\cdot \\text{Var}(X_1) = n",
          caption: "For the fair walk: zero drift, variance growing linearly in n",
        },
        {
          kind: "prose",
          text:
            "The variance growing like $n$, rather than $n^2$, is the single most important fact about " +
            "the walk's scale: the *typical size* of $S_n$ (its standard deviation) grows like $\\sqrt n$, " +
            "not like $n$. A random walk after 100 steps is typically around 10 units from the origin, not " +
            "100 — and that $\\sqrt n$ scaling is exactly what reappears as $\\sigma\\sqrt{t}$ in Brownian " +
            "motion.",
        },
      ],
    },

    {
      heading: "A fair game: S_n is a martingale",
      blocks: [
        {
          kind: "formula",
          latex: "E[S_{n+1} \\mid S_1, \\ldots, S_n] = S_n + E[X_{n+1}] = S_n",
          caption: "The best forecast of tomorrow's total, given everything known today, is today's total",
        },
        {
          kind: "prose",
          text:
            "This is the defining property of a martingale, and the simple random walk is the canonical " +
            "example of one: knowing the entire history up to step $n$ tells you nothing about which " +
            "direction $S_{n+1}$ will move, because $X_{n+1}$ is independent of the past and has mean 0. " +
            "'Fair game' is literal here — it is the mathematical idealisation of a coin-flip bet with no " +
            "edge to either side.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "This is the discrete-time template for continuous-time martingales",
          text:
            "The verification above — condition on the past, use independence and zero mean, and the " +
            "past value falls right out — is the exact same argument used later for continuous-time " +
            "martingales, just with sums replaced by stochastic integrals and steps replaced by " +
            "infinitesimal increments $dW$. Nothing about the logic changes; only the index set does.",
        },
      ],
    },

    {
      heading: "Why the walk points toward Brownian motion",
      blocks: [
        {
          kind: "prose",
          text:
            "Rescale the walk by dividing by $\\sqrt n$: consider $S_n / \\sqrt n$. Its mean is still 0 " +
            "and, since dividing by $\\sqrt n$ divides the variance by $n$, its variance is exactly 1 for " +
            "every $n$ — the rescaling was chosen precisely to hold the spread fixed as $n$ grows. The " +
            "Central Limit Theorem then applies directly to the sum of i.i.d. steps:",
        },
        {
          kind: "formula",
          latex: "\\frac{S_n}{\\sqrt n} \\;\\xrightarrow{d}\\; N(0, 1) \\quad \\text{as } n \\to \\infty",
          caption: "The scaled walk converges in distribution to a standard normal",
        },
        {
          kind: "prose",
          text:
            "That single limit, applied not just at one fixed time but along the whole path — speeding up " +
            "the number of steps per unit time and shrinking each step's size to match — is what turns a " +
            "jagged, discrete zig-zag into a continuous, everywhere-random path: Brownian motion. This is " +
            "Donsker's invariance principle, and it is why every property carried over from the random " +
            "walk (zero drift, linear-in-time variance, the martingale property) reappears unchanged as a " +
            "property of Brownian motion in the next article.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why this matters: the reflection principle",
          text:
            "A random walk's running maximum $M_n = \\max_{0 \\le k \\le n} S_k$ has a distribution that " +
            "can be computed exactly by reflecting paths that cross a level back down after they cross it " +
            "— a purely combinatorial trick that gives $P(M_n \\ge a) = 2P(S_n > a) + P(S_n = a)$ for " +
            "integer $a > 0$. The same reflection idea, taken to the continuous-time limit, gives the " +
            "distribution of Brownian motion's running maximum and underlies the pricing of barrier " +
            "options — a first hint that a purely combinatorial fact about a coin-flip walk survives all " +
            "the way into continuous-time finance.",
        },
      ],
    },

    {
      heading: "Example",
      blocks: [
        {
          kind: "example",
          title: "How far from the origin after 400 steps?",
          problem:
            "A fair simple random walk takes $n = 400$ steps. Find $E[S_n]$, $\\text{Var}(S_n)$, and " +
            "estimate $P(S_{400} > 40)$ using the normal approximation ($\\Phi(2) \\approx 0.977$).",
          steps: [
            "E[S_400] = 0, Var(S_400) = 400, so SD(S_400) = 20.",
            "S_400 / 20 is approximately N(0,1) by the CLT.",
            "P(S_400 > 40) = P(S_400/20 > 2) ≈ 1 − Φ(2) ≈ 1 − 0.977 = 0.023.",
          ],
          answer:
            "About a 2.3% chance of ending more than 40 steps (two standard deviations) from the origin " +
            "after 400 fair coin flips.",
        },
      ],
    },
  ],

  references: [
    { source: "Ross, Stochastic Processes", locator: "Ch. 3, Random Walks" },
    { source: "Shreve, Stochastic Calculus for Finance II", locator: "§3.1, footnote on the random walk as a discrete precursor to Brownian motion" },
    { source: "Durrett, Probability: Theory and Examples", locator: "Ch. 8, Brownian Motion — Donsker's invariance principle" },
  ],
};
