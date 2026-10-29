import type { WikiArticle } from "../types";

export const optimalStoppingVariationalInequalitiesWiki: WikiArticle = {
  conceptId: "optimal-stopping-variational-inequalities",

  summary:
    "Some decisions are about when, not how much: when to exit a pairs trade, when to cross the spread, when " +
    "to exercise an American option. Optimal stopping picks a random time $\\tau$ to maximise an expected " +
    "reward. Its value function splits the state space into a region where you continue and one where you " +
    "stop, and it solves a variational inequality — the HJB with an obstacle. Combining stopping with control " +
    "gives the quasi-variational inequalities of the execution chapters.",

  sections: [
    {
      heading: "The stopping problem",
      blocks: [
        {
          kind: "formula",
          latex: "H(t, x) = \\sup_{\\tau \\in \\mathcal{T}_{[t, T]}} \\mathbb{E}_{t,x}\\left[G(\\tau, X_\\tau)\\right]",
          caption: "Choose a stopping time $\\tau$ to maximise the reward $G$",
        },
        {
          kind: "list",
          items: [
            "**Snell envelope**: in discrete time, $H_T = G_T$ and $H_t = \\max\\lbrace G_t, \\mathbb{E}_t[H_{t + 1}]\\rbrace$ — stop if the reward beats the value of waiting. $H$ is the smallest supermartingale above $G$.",
            "In the **continuation region** $H > G$ and $H$ is a martingale (with no running reward); in the **stopping region** $H = G$.",
            "If $G$ is itself a submartingale (and there is no discounting), it never pays to stop early — wait until $T$.",
          ],
        },
        {
          kind: "example",
          title: "Backward induction",
          problem: "Stop now for $5$, or wait one period for $10$ or $2$ with equal probability. With $8$ or $2$ instead?",
          steps: [
            "First case: waiting is worth $\\frac{1}{2}(10 + 2) = 6 > 5$, so wait. Value $6$.",
            "Second case: waiting is worth $\\frac{1}{2}(8 + 2) = 5$ — a tie. Value $5$ either way.",
          ],
          answer: "$6$ and $5$: the value is the larger of stopping and the expected value of continuing.",
        },
      ],
    },

    {
      heading: "The variational inequality",
      blocks: [
        {
          kind: "formula",
          latex: "\\max\\left\\lbrace \\partial_t H + \\mathcal{L}H,\\; G - H \\right\\rbrace = 0",
          caption: "Everywhere $H \\ge G$ and $\\partial_t H + \\mathcal{L}H \\le 0$, with equality in at least one",
        },
        {
          kind: "prose",
          text:
            "Where it is optimal to continue, the first term is zero — the usual PDE. Where it is optimal to stop, " +
            "the second is zero — the value equals the reward. In time-dependent problems the boundary between " +
            "the regions is a curve $x^{*}(t)$; for an American put it rises toward the strike as maturity nears. " +
            "For diffusions, $H$ meets $G$ at the boundary with matching value and matching slope: **smooth pasting**.",
        },
        {
          kind: "example",
          title: "A perpetual exit threshold",
          problem:
            "$X$ is a driftless Brownian motion with volatility $\\sigma = 0.4$. Find the threshold $b$ and value for $\\sup_\\tau \\mathbb{E}[e^{-\\rho\\tau}(X_\\tau - c)]$ with $\\rho = 0.08$ and $c = 2$.",
          steps: [
            "Below $b$ the value solves $\\frac{1}{2}\\sigma^2 H'' = \\rho H$, and must vanish as $x \\to -\\infty$: $H = Ae^{\\theta x}$ with $\\theta = \\sqrt{2\\rho}/\\sigma = 0.4/0.4 = 1$.",
            "Value matching $Ae^{\\theta b} = b - c$; smooth pasting $A\\theta e^{\\theta b} = 1$. Dividing, $b - c = 1/\\theta = 1$, so $b = 3$.",
            "At $x = 2$: $H = (b - c)e^{\\theta(x - b)} = e^{-1} \\approx 0.3679$.",
          ],
          answer: "Stop the first time $X$ reaches $3$. Below it the option to wait is worth $e^{\\theta(x - b)}$; a higher discount rate raises $\\theta$ and lowers the threshold.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why smooth pasting picks the threshold",
          text:
            "Any threshold gives a value that matches $G$ at the boundary. If the slopes do not match, moving the " +
            "threshold slightly in the direction of the kink raises the value, so a kink cannot be optimal. The " +
            "optimal boundary is the one where $H$ leaves $G$ tangentially.",
        },
      ],
    },

    {
      heading: "Combined stopping and control",
      blocks: [
        {
          kind: "formula",
          latex: "\\max\\left\\lbrace \\partial_t H + \\sup_{u}\\left(\\mathcal{L}^{u}H + F\\right),\\; \\mathcal{M}H - H \\right\\rbrace = 0",
          caption: "A quasi-variational inequality: $\\mathcal{M}H$ is the value just after an impulse, such as an MO",
        },
        {
          kind: "table",
          headers: ["Problem", "Controlled continuously", "Stopped or impulsed"],
          rows: [
            ["Execution with LOs and MOs (Ch. 8)", "LO depth $\\delta$", "Send an MO: $q \\to q - 1$, cash $+ S - \\Delta/2$"],
            ["Pairs trading (Ch. 11)", "—", "Exit the position, then (a separate problem) enter it"],
            ["Execution with a price limiter (Ch. 7)", "Trading speed", "Stop trading when the price hits the limit"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Solve the later decision first",
          text:
            "In pairs trading the reward from entering depends on the value of the exit problem you face once " +
            "in. So the exit problem is solved first and its value becomes part of the entry reward. Numerically, " +
            "VIs are solved backwards in time with a finite-difference scheme that takes $\\max(\\text{continuation}, G)$ at each step.",
        },
      ],
    },
  ],

  references: [
    { source: "Cartea, Jaimungal & Penalva, Algorithmic and High-Frequency Trading", locator: "Ch. 5, Stochastic Optimal Control and Stopping (§5.5–5.6)" },
  ],
};
