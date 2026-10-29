import type { WikiArticle } from "../types";

export const stochasticControlAndHjbWiki: WikiArticle = {
  conceptId: "stochastic-control-and-hjb",

  summary:
    "Every trading algorithm in this course is the answer to a stochastic control problem: choose a control " +
    "(a trading speed, a quote depth) to maximise an expected reward, while the state (cash, inventory, " +
    "price) evolves randomly. The dynamic programming principle turns that problem into the " +
    "Hamilton–Jacobi–Bellman equation, a PDE for the value function, and a verification theorem certifies " +
    "that a smooth solution really is optimal. The Merton portfolio problem is the template.",

  sections: [
    {
      heading: "The control problem",
      blocks: [
        {
          kind: "formula",
          latex: "dX_t^{u} = \\mu(t, X_t^{u}, u_t)\\,dt + \\sigma(t, X_t^{u}, u_t)\\,dW_t, \\qquad H(t, x) = \\sup_{u \\in \\mathcal{A}} \\mathbb{E}_{t,x}\\left[G(X_T^{u}) + \\int_t^T F(s, X_s^{u}, u_s)\\,ds\\right]",
          caption: "State dynamics, terminal reward $G$, running reward $F$, admissible controls $\\mathcal{A}$",
        },
        {
          kind: "prose",
          text:
            "The **dynamic programming principle** (DPP) says that an optimal strategy, followed from any " +
            "intermediate time, is still optimal from there: $H(t, x) = \\sup_u \\mathbb{E}[\\int_t^{\\tau} F\\,ds + H(\\tau, X_\\tau)]$. " +
            "Apply Itô’s formula to $H$ between $t$ and $t + dt$, divide by $dt$, and let $dt \\to 0$:",
        },
        {
          kind: "formula",
          latex: "\\partial_t H + \\sup_{u}\\left\\lbrace \\mathcal{L}^{u}H + F(t, x, u) \\right\\rbrace = 0, \\qquad H(T, x) = G(x), \\qquad \\mathcal{L}^{u} = \\mu\\,\\partial_x + \\tfrac{1}{2}\\sigma^2\\,\\partial_{xx}",
          caption: "The HJB equation; the supremum is over the control’s value at a single instant",
        },
        {
          kind: "definitions",
          items: [
            { term: "Feedback (Markov) control", description: "$u_t = u^{*}(t, X_t)$: a function of the current state only. Under general conditions this is all you need to search over." },
            { term: "Verification theorem", description: "If a smooth function solves the HJB and the pointwise maximiser gives an admissible control, that function is the value and the maximiser is optimal." },
            { term: "Viscosity solution", description: "The weak notion of solution used when the value function is not smooth enough to satisfy the HJB classically." },
          ],
        },
      ],
    },

    {
      heading: "The Merton problem with exponential utility",
      blocks: [
        {
          kind: "prose",
          text:
            "Wealth $x$ is split between cash at rate $r = 0$ and a stock with drift $\\mu$ and volatility $\\sigma$. " +
            "With $\\pi$ dollars in the stock, $dX_t = \\pi_t\\mu\\,dt + \\pi_t\\sigma\\,dW_t$, and the agent maximises " +
            "$\\mathbb{E}[-e^{-\\gamma X_T}]$. The HJB is",
        },
        {
          kind: "formula",
          latex: "\\partial_t H + \\sup_{\\pi}\\left\\lbrace \\pi\\mu\\,\\partial_x H + \\tfrac{1}{2}\\pi^2\\sigma^2\\,\\partial_{xx}H \\right\\rbrace = 0, \\qquad H(T, x) = -e^{-\\gamma x}",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "The bracket is a concave quadratic in $\\pi$ when $\\partial_{xx}H < 0$, maximised at $\\pi^{*} = -\\frac{\\mu\\,\\partial_x H}{\\sigma^2\\,\\partial_{xx}H}$.",
            "Guess $H = -e^{-\\gamma x}f(t)$, so $\\partial_x H = -\\gamma H$ and $\\partial_{xx}H = \\gamma^2 H$, giving $\\pi^{*} = \\frac{\\mu}{\\gamma\\sigma^2}$.",
            "Substituting back leaves $f' = \\frac{1}{2}\\lambda^2 f$ with $\\lambda = \\mu/\\sigma$ the market price of risk, so $f(t) = e^{-\\frac{1}{2}\\lambda^2(T - t)}$.",
          ],
        },
        {
          kind: "formula",
          latex: "\\pi^{*} = \\frac{\\mu - r}{\\gamma\\sigma^2}, \\qquad H(t, x) = -\\exp\\left\\lbrace -\\gamma x - \\tfrac{1}{2}\\lambda^2(T - t) \\right\\rbrace",
          caption: "A constant dollar amount, independent of wealth; with $r > 0$ it scales by $e^{-r(T - t)}$",
        },
        {
          kind: "example",
          title: "How much to invest",
          problem: "Take $\\gamma = 0.0001$ per dollar, $\\mu - r = 0.06$, $\\sigma = 0.2$ and $r = 0$. Find the optimal dollar investment and the one-year certainty-equivalent gain $\\frac{\\lambda^2 T}{2\\gamma}$.",
          steps: [
            "$\\pi^{*} = \\frac{0.06}{0.0001 \\times 0.04} = \\$15{,}000$.",
            "$\\lambda = 0.06/0.2 = 0.3$, so the gain is $\\frac{0.09 \\times 1}{2 \\times 0.0001} = \\$450$.",
          ],
          answer: "Hold $\\$15{,}000$ of stock whatever your wealth; investing optimally is worth $\\$450$ of sure money per year.",
        },
      ],
    },

    {
      heading: "From Merton to trading problems",
      blocks: [
        {
          kind: "prose",
          text:
            "In trading problems the state is usually cash $x$, inventory $q$ and midprice $S$. The standard " +
            "ansatz is $H(t, x, S, q) = x + qS + h(t, q)$: cash plus marked-to-market inventory plus an excess " +
            "value $h$ that the strategy adds. Because the dynamics are linear in $x$ and $S$, the HJB collapses " +
            "to an equation for $h$ alone.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "What changes in a liquidation problem",
          text:
            "In Merton the agent’s trades do not affect the price. When liquidating, her own trading speed enters " +
            "the midprice (permanent impact) and her execution price (temporary impact), so the control appears " +
            "in the drift of a state she does not otherwise control — the source of every trade-off in Chapters 6–7.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Estimated parameters",
          text:
            "$\\pi^{*} \\propto \\mu/\\sigma^2$ is extremely sensitive to the drift, which is the hardest parameter " +
            "to estimate. Robust versions penalise model misspecification and shrink the position toward zero; " +
            "a cruder fix is to shrink $\\hat{\\mu}$ before plugging it in.",
        },
      ],
    },
  ],

  references: [
    { source: "Cartea, Jaimungal & Penalva, Algorithmic and High-Frequency Trading", locator: "Ch. 5, Stochastic Optimal Control and Stopping (§5.1–5.3)" },
  ],
};
