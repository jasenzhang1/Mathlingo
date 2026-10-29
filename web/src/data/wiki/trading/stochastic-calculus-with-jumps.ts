import type { WikiArticle } from "../types";

export const stochasticCalculusWithJumpsWiki: WikiArticle = {
  conceptId: "stochastic-calculus-with-jumps",

  summary:
    "Order books move in discrete events: an order arrives, a fill happens, the price ticks. The natural " +
    "models are counting processes — Poisson processes, their compound and doubly stochastic cousins, and " +
    "self-exciting Hawkes processes — layered on top of the Brownian motion of continuous-time finance. This " +
    "lesson collects the calculus they need: compensators, Itô’s formula with jumps, and the generator that " +
    "turns every control problem later in the course into a PDE or a system of ODEs.",

  sections: [
    {
      heading: "Counting processes",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Poisson process $N_t$ with intensity $\\lambda$", description: "Independent increments with $N_t - N_s \\sim \\text{Poisson}(\\lambda(t - s))$; gaps between events are $\\text{Exponential}(\\lambda)$. Mean and variance both $\\lambda t$." },
            { term: "Compensator", description: "$\\lambda t$ is the predictable part of $N_t$: the compensated process $\\tilde{N}_t = N_t - \\lambda t$ is a martingale, the jump analogue of $W_t$." },
            { term: "Compound Poisson", description: "$X_t = \\sum_{j \\le N_t} J_j$ with i.i.d. marks $J$ (e.g. order sizes): $\\mathbb{E}[X_t] = \\lambda t\\,\\mathbb{E}[J]$, $\\text{Var}(X_t) = \\lambda t\\,\\mathbb{E}[J^2]$." },
            { term: "Doubly stochastic (Cox) process", description: "Intensity $\\lambda_t$ is itself random, e.g. mean-reverting with jumps: $d\\lambda_t = \\kappa(\\theta - \\lambda_t)\\,dt + \\eta\\,dN_t$." },
            { term: "Hawkes process", description: "Self-exciting: $\\lambda_t = \\mu + \\sum_{t_i < t} \\alpha e^{-\\beta(t - t_i)}$. With branching ratio $n = \\alpha/\\beta < 1$ the stationary rate is $\\mu/(1 - n)$." },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Thinning: where fill rates come from",
          text:
            "If buy MOs arrive at rate $\\lambda$ and each independently fills your sell LO at depth $\\delta$ with " +
            "probability $e^{-\\kappa\\delta}$, your fills are a Poisson process with intensity $\\lambda e^{-\\kappa\\delta}$. " +
            "Choosing $\\delta$ is choosing an intensity — the starting point of every execution and market-making model in the book.",
        },
      ],
    },

    {
      heading: "Itô’s formula with jumps",
      blocks: [
        {
          kind: "prose",
          text: "Let $dX_t = \\mu_t\\,dt + \\sigma_t\\,dW_t + J_t\\,dN_t$. For smooth $f$,",
        },
        {
          kind: "formula",
          latex: "df(X_t) = \\left(f'(X_{t^-})\\mu_t + \\tfrac{1}{2}f''(X_{t^-})\\sigma_t^2\\right)dt + f'(X_{t^-})\\sigma_t\\,dW_t + \\left[f(X_{t^-} + J_t) - f(X_{t^-})\\right]dN_t",
        },
        {
          kind: "prose",
          text:
            "The diffusion part is the usual Itô formula. At a jump there is no Taylor expansion: the function " +
            "simply jumps from $f(X_{t^-})$ to $f(X_{t^-} + J_t)$. Taking expectations and dividing by $dt$ gives the **generator**",
        },
        {
          kind: "formula",
          latex: "\\mathcal{L}f(x) = \\mu f'(x) + \\tfrac{1}{2}\\sigma^2 f''(x) + \\lambda\\,\\mathbb{E}\\left[f(x + J) - f(x)\\right]",
          caption: "For a pure Poisson count, $\\mathcal{L}f(n) = \\lambda[f(n + 1) - f(n)]$ — a difference, not a derivative",
        },
        {
          kind: "example",
          title: "Second moment of a Poisson process",
          problem: "Use Itô’s formula on $f(N_t) = N_t^2$ to find $\\mathbb{E}[N_t^2]$.",
          steps: [
            "No diffusion, so $d(N_t^2) = [(N_{t^-} + 1)^2 - N_{t^-}^2]\\,dN_t = (2N_{t^-} + 1)\\,dN_t$.",
            "Taking expectations, $dN_t$ has mean $\\lambda\\,dt$: $\\frac{d}{dt}\\mathbb{E}[N_t^2] = \\lambda(2\\lambda t + 1)$.",
            "Integrate from $0$: $\\mathbb{E}[N_t^2] = \\lambda^2 t^2 + \\lambda t$.",
          ],
          answer: "$\\mathbb{E}[N_t^2] = (\\lambda t)^2 + \\lambda t$, so $\\text{Var}(N_t) = \\lambda t$, as it should.",
        },
        {
          kind: "example",
          title: "Drift of a jump-diffusion",
          problem: "$dX_t = 0.1\\,dt + 0.2\\,dW_t + J\\,dN_t$ with $N$ at rate $3$, $\\mathbb{E}[J] = -0.02$ and $\\mathbb{E}[J^2] = 0.0008$. Find the mean and variance of $X_1 - X_0$.",
          steps: [
            "Mean: $0.1 + 3 \\times (-0.02) = 0.04$.",
            "Variance: $0.2^2 + 3 \\times 0.0008 = 0.04 + 0.0024 = 0.0424$.",
          ],
          answer: "Mean $0.04$, variance $0.0424$. Jumps contribute $\\lambda\\,\\mathbb{E}[J]$ to the drift and $\\lambda\\,\\mathbb{E}[J^2]$ to the variance.",
        },
      ],
    },

    {
      heading: "Toolkit for the rest of the course",
      blocks: [
        {
          kind: "table",
          headers: ["Result", "Statement"],
          rows: [
            ["Feynman–Kac", "$u(t, x) = \\mathbb{E}_{t,x}[g(X_T)]$ solves $\\partial_t u + \\mathcal{L}u = 0$, $u(T, x) = g(x)$, with $\\mathcal{L}$ including the jump term"],
            ["Ornstein–Uhlenbeck", "$dX_t = \\kappa(\\theta - X_t)dt + \\sigma dW_t$: $\\mathbb{E}[X_t] = \\theta + (X_0 - \\theta)e^{-\\kappa t}$, $\\text{Var}(X_t) = \\frac{\\sigma^2}{2\\kappa}(1 - e^{-2\\kappa t})$"],
            ["Exponential martingale", "$\\exp\\lbrace\\theta N_t - \\lambda t(e^{\\theta} - 1)\\rbrace$ is a martingale; it drives changes of intensity under a change of measure"],
            ["Quadratic variation", "$[N]_t = N_t$: every jump has size $1$, so its square is $1$"],
            ["Time rescaling", "If $N$ has intensity $\\lambda_t$, the times $\\int_0^{t_i} \\lambda_s\\,ds$ form a unit-rate Poisson process — a goodness-of-fit test for intensity models"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Differences in $q$, derivatives in $t$ and $S$",
          text:
            "Inventory changes one share at a time, so value functions in later chapters contain terms like " +
            "$\\lambda[h(t, q - 1) - h(t, q)]$. For a bounded inventory grid the HJB becomes a finite system of " +
            "ODEs in $t$, often solvable by a matrix exponential — much easier than a PDE in $q$.",
        },
      ],
    },
  ],

  references: [
    { source: "Cartea, Jaimungal & Penalva, Algorithmic and High-Frequency Trading", locator: "App. A, Stochastic Calculus for Finance" },
  ],
};
