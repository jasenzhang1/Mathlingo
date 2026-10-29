import type { WikiArticle } from "../types";

export const optimalExecutionContinuousTradingWiki: WikiArticle = {
  conceptId: "optimal-execution-continuous-trading",

  summary:
    "A trader who must sell $\\mathfrak{N}$ shares by time $T$ faces a trade-off. Selling fast pushes the " +
    "execution price down through temporary impact; selling slowly leaves inventory exposed to price moves. " +
    "Modelling both, with a penalty for unsold shares and a running penalty on inventory, gives a stochastic " +
    "control problem whose solution is the Almgren–Chriss schedule: inventory decays like a hyperbolic sine, " +
    "and the urgency $\\gamma = \\sqrt{\\phi/k}$ sets how front-loaded it is.",

  sections: [
    {
      heading: "The model",
      blocks: [
        {
          kind: "formula",
          latex: "dQ_t = -\\nu_t\\,dt, \\qquad dS_t = -g(\\nu_t)\\,dt + \\sigma\\,dW_t, \\qquad \\hat{S}_t = S_t - f(\\nu_t), \\qquad dX_t = \\hat{S}_t\\nu_t\\,dt",
          caption: "Inventory, midprice with permanent impact $g$, execution price with temporary impact $f$, and cash",
        },
        {
          kind: "formula",
          latex: "\\sup_{\\nu}\\; \\mathbb{E}\\left[X_T + Q_T(S_T - \\alpha Q_T) - \\phi\\int_t^T Q_u^2\\,du\\right]",
          caption: "Terminal penalty $\\alpha$ for shares left at $T$; running penalty $\\phi$ on holding inventory",
        },
        {
          kind: "definitions",
          items: [
            { term: "Temporary impact $f(\\nu) = k\\nu$", description: "Paid on each share sold, proportional to speed; it vanishes once you stop. Punishes speed." },
            { term: "Permanent impact $g(\\nu) = b\\nu$", description: "Lowers the midprice for good. With full liquidation its expected cost is $\\frac{b}{2}\\mathfrak{N}^2$ whatever the schedule." },
            { term: "Running penalty $\\phi$", description: "Not a cost actually paid but a proxy for risk: it is proportional to the variance of revenue, $\\sigma^2\\int Q_u^2\\,du$." },
          ],
        },
      ],
    },

    {
      heading: "Solving the HJB",
      blocks: [
        {
          kind: "prose",
          text:
            "With the ansatz $H = x + qS + h(t, q)$ the HJB reduces to $\\partial_t h - \\phi q^2 + \\sup_{\\nu}\\lbrace -k\\nu^2 - " +
            "\\nu(bq + \\partial_q h)\\rbrace = 0$, maximised at $\\nu^{*} = -\\frac{bq + \\partial_q h}{2k}$. A quadratic " +
            "$h = h_2(t)q^2$ is consistent because every term is quadratic in $q$, and $h_2$ solves a Riccati ODE " +
            "with $h_2(T) = -\\alpha$. Solving it gives",
        },
        {
          kind: "formula",
          latex: "\\nu_t^{*} = \\gamma\\,\\frac{\\zeta e^{\\gamma(T - t)} + e^{-\\gamma(T - t)}}{\\zeta e^{\\gamma(T - t)} - e^{-\\gamma(T - t)}}\\,Q_t^{*}, \\qquad \\gamma = \\sqrt{\\frac{\\phi}{k}}, \\qquad \\zeta = \\frac{\\alpha - \\frac{1}{2}b + \\sqrt{k\\phi}}{\\alpha - \\frac{1}{2}b - \\sqrt{k\\phi}}",
        },
        {
          kind: "table",
          headers: ["Limit", "Optimal inventory $Q_t^{*}$", "Meaning"],
          rows: [
            ["$\\alpha \\to \\infty$", "$\\mathfrak{N}\\,\\frac{\\sinh(\\gamma(T - t))}{\\sinh(\\gamma T)}$", "Liquidation is forced; $b$ drops out"],
            ["$\\alpha \\to \\infty$, $\\phi \\to 0$", "$\\mathfrak{N}\\left(1 - \\frac{t}{T}\\right)$", "TWAP: sell at a constant rate"],
            ["$\\phi = 0$, finite $\\alpha$", "Constant speed $\\frac{Q}{(T - t) + k/\\alpha}$", "TWAP over a longer horizon, leaving some shares unsold"],
          ],
        },
        {
          kind: "example",
          title: "How front-loaded is the schedule?",
          problem: "Full liquidation ($\\alpha \\to \\infty$) with $\\gamma = 2$ per day and $T = 1$ day. What fraction is left at midday, and what is the initial speed relative to TWAP?",
          steps: [
            "$Q_{0.5}/\\mathfrak{N} = \\frac{\\sinh(1)}{\\sinh(2)} = \\frac{1.1752}{3.6269} \\approx 0.3240$.",
            "Initial speed: $\\nu_0^{*} = \\gamma\\coth(\\gamma T)\\,\\mathfrak{N} = 2\\coth(2)\\,\\mathfrak{N} \\approx 2.075\\,\\mathfrak{N}$ per day, versus $\\mathfrak{N}$ for TWAP.",
          ],
          answer: "Two thirds of the order is gone by midday (TWAP would have sold half), and it starts at about twice the TWAP rate.",
        },
      ],
    },

    {
      heading: "Costs and interpretation",
      blocks: [
        {
          kind: "example",
          title: "Implementation shortfall of TWAP",
          problem: "Sell $\\mathfrak{N} = 100{,}000$ shares over $T = 1$ day by TWAP with $k = b = 10^{-6}$ (dollars per share, per share per day). What is the expected shortfall against $\\mathfrak{N}S_0$?",
          steps: [
            "Temporary: $k\\mathfrak{N}^2/T = 10^{-6} \\times 10^{10} = \\$10{,}000$.",
            "Permanent: $\\frac{b}{2}\\mathfrak{N}^2 = \\$5{,}000$.",
          ],
          answer: "$\\$15{,}000$. Only the $\\$10{,}000$ temporary part can be reduced, by trading more slowly — at the price of more inventory risk.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why the schedule is deterministic",
          text:
            "With a Brownian midprice and linear impacts, price shocks do not change future impact costs or the " +
            "penalty, so there is nothing to react to: the optimal path is fixed at time $0$. A drift, order-flow " +
            "signals or a price limit (Chapter 7) make the optimal strategy depend on what prices do.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Calibrating the urgency",
          text:
            "$k$ and $b$ come from the impact estimates of Chapter 4; $\\phi$ is a choice. A sanity check is the " +
            "half-life: for large $\\gamma T$, inventory decays like $e^{-\\gamma t}$, so half the order goes in " +
            "about $\\ln 2/\\gamma$. With $\\gamma = 6$ per day that is $0.116$ days, about $45$ minutes of a $6.5$-hour session.",
        },
      ],
    },
  ],

  references: [
    { source: "Cartea, Jaimungal & Penalva, Algorithmic and High-Frequency Trading", locator: "Ch. 6, Optimal Execution with Continuous Trading I (§6.1–6.5)" },
  ],
};
