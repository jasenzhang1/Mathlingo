import type { WikiArticle } from "../types";

export const brownianMotionWiki: WikiArticle = {
  conceptId: "brownian-motion",
  summary:
    "Brownian motion $W_t$ is the continuous-time process built from independent, normally distributed " +
    "increments and continuous paths — the scaling limit of the simple random walk as the number of " +
    "steps per unit time goes to infinity. It is the noise source for every stochastic differential " +
    "equation in this domain, and its central pathology — nowhere differentiable, infinitely jagged at " +
    "every scale — is exactly why ordinary calculus cannot be applied to it directly.",

  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "$W_0 = 0$",
              description: "The process starts at the origin by convention.",
            },
            {
              term: "Independent increments",
              description:
                "For any $0 \\le t_1 < t_2 < \\cdots < t_n$, the increments $W_{t_2} - W_{t_1}, \\ldots, W_{t_n} - W_{t_{n-1}}$ are mutually independent.",
            },
            {
              term: "Gaussian increments",
              description: "$W_t - W_s \\sim N(0, t - s)$ for $t > s$ — mean zero, and variance equal to the elapsed time, not the elapsed time squared or anything else.",
            },
            {
              term: "Continuous paths",
              description: "$t \\mapsto W_t$ is continuous almost surely — no jumps — even though, as shown below, it is nowhere smooth.",
            },
          ],
        },
        {
          kind: "prose",
          text:
            "These four properties are not independent axioms chosen for convenience — they are exactly " +
            "the properties the simple random walk has, translated into continuous time: zero-mean steps, " +
            "independence across non-overlapping time intervals, and (via the Central Limit Theorem) a " +
            "normal limit for any sum of many small steps.",
        },
      ],
    },

    {
      heading: "The scaling limit of the random walk",
      blocks: [
        {
          kind: "prose",
          text:
            "Take a simple random walk and speed it up: in one unit of time, take $n$ steps instead of " +
            "one, each of size $1/\\sqrt n$ instead of $1$. Formally, define $W_t^{(n)} = S_{\\lfloor nt \\rfloor} / \\sqrt n$. " +
            "For any fixed $t$, this is exactly the rescaled sum from the previous article, so by the " +
            "Central Limit Theorem $W_t^{(n)} \\xrightarrow{d} N(0, t)$ as $n \\to \\infty$.",
        },
        {
          kind: "formula",
          latex: "W_t^{(n)} = \\frac{S_{\\lfloor nt \\rfloor}}{\\sqrt n} \\;\\xrightarrow{d}\\; W_t \\sim N(0,t)",
          caption: "Donsker's invariance principle (stated informally): the rescaled walk converges to Brownian motion, not just at one time t but as an entire random path",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why the variance is t and not t²",
          text:
            "This falls straight out of the random walk's scaling: variance summed over $n$ independent " +
            "steps of size $1/\\sqrt n$ gives $n \\cdot (1/\\sqrt n)^2 = 1$ per unit time, so variance " +
            "accumulates *linearly* in $t$. This single fact — $\\text{Var}(W_t) = t$, not $t^2$ — is the " +
            "seed of quadratic variation, which shows precisely why this scaling makes $W_t$ impossible to " +
            "differentiate.",
        },
      ],
    },

    {
      heading: "Nowhere differentiable, self-similar",
      blocks: [
        {
          kind: "prose",
          text:
            "A derivative at $t$ would require $\\lim_{h \\to 0} (W_{t+h} - W_t)/h$ to exist. But " +
            "$W_{t+h} - W_t \\sim N(0, h)$, so its typical size is $\\sqrt h$, and $\\sqrt h / h = 1/\\sqrt h " +
            "\\to \\infty$ as $h \\to 0$. The ratio blows up at every point — Brownian motion is continuous " +
            "everywhere but differentiable nowhere, a fact first proved rigorously by Wiener and one of " +
            "the strangest results in classical analysis.",
        },
        {
          kind: "formula",
          latex: "W_{ct} \\overset{d}{=} \\sqrt{c}\\, W_t \\quad \\text{for any } c > 0",
          caption: "Self-similarity: rescaling time by c rescales the process by √c, in distribution",
        },
        {
          kind: "prose",
          text:
            "Self-similarity says a Brownian path looks statistically the same at every zoom level — " +
            "there is no scale at which it starts looking smooth. Zooming in on any interval, however " +
            "small, reveals the same jaggedness as the whole path. This is the same $\\sqrt{\\,\\cdot\\,}$ " +
            "scaling behind non-differentiability, now stated as a distributional identity rather than a " +
            "limit that fails to exist.",
        },
      ],
    },

    {
      heading: "Quadratic variation, previewed",
      blocks: [
        {
          kind: "prose",
          text:
            "Partition $[0, t]$ finely and sum the squared increments: $\\sum_i (W_{t_{i+1}} - W_{t_i})^2$. " +
            "For an ordinary smooth function this sum vanishes as the partition gets finer, which is why " +
            "ordinary calculus can ignore squared increments as negligible. For Brownian motion it does " +
            "not vanish — it converges to $t$ itself.",
        },
        {
          kind: "formula",
          latex: "[W,W]_t = \\lim_{\\|\\Pi\\| \\to 0} \\sum_i (W_{t_{i+1}} - W_{t_i})^2 = t",
          caption: "Quadratic variation of Brownian motion equals elapsed time — stated here, justified rigorously in the next article",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "A process this jagged has no derivative — ordinary calculus does not apply",
          text:
            "Non-differentiability is not a technicality to work around; it is the reason this entire " +
            "domain exists as a separate subject from ordinary calculus. You cannot write $dW_t / dt$ and " +
            "expect it to mean anything pointwise, and you cannot integrate against $dW_t$ using " +
            "Riemann-Stieltjes theory, because that theory needs bounded variation, which Brownian motion " +
            "does not have. Every tool built in the rest of this chapter — the Itô integral, Itô's lemma, " +
            "the $dW \\cdot dW = dt$ heuristic — exists specifically to make sense of calculus against a " +
            "path this irregular.",
        },
      ],
    },

    {
      heading: "Example",
      blocks: [
        {
          kind: "example",
          title: "Probability of a threshold crossing",
          problem: "For standard Brownian motion, find $P(W_4 > 3)$ ($\\Phi(1.5) \\approx 0.9332$).",
          steps: [
            "W_4 ~ N(0, 4), so SD(W_4) = 2.",
            "P(W_4 > 3) = P(W_4/2 > 1.5) = 1 − Φ(1.5).",
            "1 − 0.9332 = 0.0668.",
          ],
          answer: "About a 6.7% chance — note the variance used is 4 (the elapsed time), not 4² or √4.",
        },
      ],
    },
  ],

  references: [
    { source: "Shreve, Stochastic Calculus for Finance II", locator: "§3.2-3.3, Brownian Motion and its properties" },
    { source: "Durrett, Probability: Theory and Examples", locator: "Ch. 8, Brownian Motion" },
    { source: "Øksendal, Stochastic Differential Equations", locator: "Ch. 2, Some Mathematical Preliminaries — construction of Brownian motion" },
  ],
};
