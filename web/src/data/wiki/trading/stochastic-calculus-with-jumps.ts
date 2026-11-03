import type { WikiArticle } from "../types";

export const stochasticCalculusWithJumpsWiki: WikiArticle = {
  conceptId: "stochastic-calculus-with-jumps",

  summary: "Algorithmic-trading models mix Brownian midprices with counting processes: market-order arrivals, limit-order fills and tick moves. This appendix-level lesson collects the tools: Poisson, compound Poisson and doubly stochastic processes, compensators that turn counts into martingales, Itô’s formula with jump terms, and generators that turn expectations into the difference and integro-differential equations of later chapters.",

  sections: [
    {
      heading: "Counting processes",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Poisson process", description: "Independent increments with $N_t - N_s \\sim \\text{Poisson}(\\lambda(t - s))$; mean and variance $\\lambda t$; $N_t - \\lambda t$ is a martingale." },
            { term: "Compound Poisson", description: "$\\sum_{j \\le N_t}J_j$ with i.i.d. jumps; mean $\\lambda t\\,\\mathbb{E}[J]$, variance $\\lambda t\\,\\mathbb{E}[J^2]$." },
            { term: "Doubly stochastic", description: "The intensity is itself random, as when fill rates depend on a controlled depth, $\\lambda e^{-\\kappa\\delta_t}$, or on an order-flow state." },
            { term: "Thinning and superposition", description: "Independent filtering of a Poisson stream with probability $p$ gives rate $\\lambda p$; independent streams add rates." },
          ],
        },
      ],
    },
    {
      heading: "Itô’s formula and generators",
      blocks: [
        {
          kind: "formula",
          latex: "df(t, X_t) = \\left(\\partial_t f + \\mu\\,\\partial_x f + \\tfrac{1}{2}\\sigma^2\\partial_{xx}f\\right)dt + \\sigma\\partial_x f\\,dW_t + \\left[f(t, X_{t^-} + \\Delta X_t) - f(t, X_{t^-})\\right]dN_t",
          caption: "For a jump-diffusion; the jump enters through the exact change in $f$, not a Taylor term.",
        },
        {
          kind: "prose",
          text: "Taking expectations, the $dW$ term and the compensated jump term vanish, leaving the generator: $\\mathcal{L}f = \\mu f' + \\tfrac{1}{2}\\sigma^2f'' + \\lambda\\,\\mathbb{E}[f(x + J) - f(x)]$. Feynman–Kac then says $u(t, x) = \\mathbb{E}_{t,x}[g(X_T)]$ solves $\\partial_t u + \\mathcal{L}u = 0$, a partial integro-differential equation.",
        },
        {
          kind: "example",
          title: "Second moment of a Poisson process",
          problem: "Use Itô’s formula on $N_t^2$.",
          answer: "So $\\text{Var}(N_t) = \\lambda t$, as expected.",
          steps: [
            "$d(N_t^2) = [(N_{t^-} + 1)^2 - N_{t^-}^2]dN_t = (2N_{t^-} + 1)dN_t$.",
            "In expectation, $\\frac{d}{dt}\\mathbb{E}[N_t^2] = \\lambda(2\\lambda t + 1)$.",
            "Integrating, $\\mathbb{E}[N_t^2] = \\lambda^2t^2 + \\lambda t$.",
          ],
        },
      ],
    },
    {
      heading: "Processes used later",
      blocks: [
        {
          kind: "table",
          headers: ["Process","Where it appears"],
          rows: [
            ["OU, $dX = \\kappa(\\theta - X)dt + \\sigma dW$","Cointegration factors (Ch. 11); mean $\\theta + (x - \\theta)e^{-\\kappa t}$, variance $\\frac{\\sigma^2}{2\\kappa}(1 - e^{-2\\kappa t})$"],
            ["Mean-reverting jump intensity","Order flow and volume (Ch. 7, 9)"],
            ["Controlled counting process","LO fills in execution and market making (Ch. 8, 10)"],
            ["Continuous-time Markov chain","Order-imbalance regimes (Ch. 12)"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why differences, not derivatives",
          text: "Inventory moves in unit jumps, so value functions in $q$ satisfy difference equations such as $\\lambda[H(q - 1) - H(q)]$: a system of ODEs in time, one per inventory level.",
        },
      ],
    },
  ],

  references: [
    { source: "Cartea, Jaimungal & Penalva, Algorithmic and High-Frequency Trading (2015)", locator: "App. A, Stochastic Calculus for Finance (diffusions, Poisson and doubly stochastic Poisson processes)" },
  ],
};
