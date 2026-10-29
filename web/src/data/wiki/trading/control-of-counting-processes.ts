import type { WikiArticle } from "../types";

export const controlOfCountingProcessesWiki: WikiArticle = {
  conceptId: "control-of-counting-processes",

  summary:
    "A trader who posts limit orders does not choose when she trades — she chooses how often she is likely " +
    "to trade, by setting the depth of her quote. That makes the control an intensity of a counting process. " +
    "The dynamic programming equation then has jump terms in place of second derivatives, the optimal depth " +
    "has the universal form $\\delta^{*} = \\frac{1}{\\kappa} - (\\text{value lost by the fill})$, and when the " +
    "reward is linear in the intensity the control is bang-bang.",

  sections: [
    {
      heading: "The dynamic programming equation",
      blocks: [
        {
          kind: "prose",
          text:
            "Let $N_t$ count events with intensity $\\lambda(u_t)$ chosen through the control $u$, and let the agent " +
            "collect a running reward $F$. Over $dt$ an event happens with probability $\\lambda(u)\\,dt$ and moves " +
            "the state from $n$ to $n + 1$. The DPP then gives",
        },
        {
          kind: "formula",
          latex: "\\partial_t H(t, n) + \\sup_{u}\\left\\lbrace \\lambda(u)\\left[H(t, n + 1) - H(t, n)\\right] + F(t, n, u) \\right\\rbrace = 0",
          caption: "One ODE in $t$ for each value of $n$, coupled through the jump term",
        },
        {
          kind: "list",
          items: [
            "If $N$ also drives cash $X$ (each fill earns money), the jump term compares $H$ at the post-fill cash and inventory with $H$ now.",
            "If there is also a Brownian midprice, the generator adds $\\frac{1}{2}\\sigma^2\\partial_{SS}H$ — a jump-diffusion DPE.",
            "If $\\lambda(u)$ is linear in $u$ and $F = 0$, the bracket is linear, so the supremum sits at a boundary of the allowed set: a **bang-bang** control.",
          ],
        },
      ],
    },

    {
      heading: "Choosing a depth",
      blocks: [
        {
          kind: "prose",
          text:
            "Posting a sell LO at depth $\\delta$ above the midprice gives fill intensity $\\lambda e^{-\\kappa\\delta}$. " +
            "With the ansatz $H = x + qS + h(t, q)$, a fill earns $S + \\delta$ and moves inventory to $q - 1$, so the " +
            "change in $H$ is $\\delta + h(t, q - 1) - h(t, q)$. The supremum is",
        },
        {
          kind: "formula",
          latex: "\\sup_{\\delta}\\; e^{-\\kappa\\delta}\\left(\\delta + c\\right) \\;\\Longrightarrow\\; \\delta^{*} = \\frac{1}{\\kappa} - c, \\qquad c = h(t, q - 1) - h(t, q)",
          caption: "Post $1/\\kappa$ beyond the point where you are indifferent to being filled",
        },
        {
          kind: "example",
          title: "A round trip",
          problem:
            "An agent buys one share with an MO, paying the half-spread $\\Delta/2 = 1$ cent, and then posts a sell LO at depth $\\delta$. Buy MOs arrive at $\\lambda = 50$ per minute and $\\kappa = 100$ per dollar. Find $\\delta^{*}$ and the expected profit rate.",
          steps: [
            "Profit on a fill is $\\delta - \\Delta/2$, so $c = -\\Delta/2$ and $\\delta^{*} = \\frac{\\Delta}{2} + \\frac{1}{\\kappa} = 0.01 + 0.01 = 2$ cents.",
            "Profit rate: $(\\delta^{*} - \\Delta/2)\\lambda e^{-\\kappa\\delta^{*}} = 0.01 \\times 50 \\times e^{-2} \\approx \\$0.0677$ per minute.",
          ],
          answer: "Post $2$ cents above the midprice — recover the half-spread, then add $1/\\kappa$ — and earn about $6.77$ cents per minute.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Negative depths",
          text:
            "If the fill is worth a lot to the agent ($c > 1/\\kappa$), the formula gives $\\delta^{*} < 0$: she would " +
            "like to sell below the midprice. An LO cannot do that sensibly, so in practice she should cross the " +
            "spread with an MO — the motivation for combining limit and market orders in Chapter 8.",
        },
      ],
    },

    {
      heading: "Liquidating one share with a limit order",
      blocks: [
        {
          kind: "prose",
          text:
            "With one share to sell by $T$ and no penalty if it is unsold, $c = 0 - h(t)$ and the DPE becomes " +
            "$h' + \\frac{\\lambda}{\\kappa}e^{-1}e^{-\\kappa h} = 0$, $h(T) = 0$. Writing $\\omega = e^{\\kappa h}$ makes it linear, giving",
        },
        {
          kind: "formula",
          latex: "h(t) = \\frac{1}{\\kappa}\\log\\left(1 + \\frac{\\lambda}{e}(T - t)\\right), \\qquad \\delta^{*}(t) = \\frac{1}{\\kappa} + h(t)",
        },
        {
          kind: "example",
          title: "Depth falls as time runs out",
          problem: "With $\\lambda = 1$ per second, $\\kappa = 100$ per dollar and $T - t = 10$ seconds, find $\\delta^{*}$.",
          steps: [
            "$h = 0.01\\log(1 + 10/e) = 0.01\\log 4.6788 \\approx 0.01543$.",
            "$\\delta^{*} = 0.01 + 0.01543 = 0.02543$, about $2.54$ cents.",
          ],
          answer: "$2.54$ cents now, falling to $1/\\kappa = 1$ cent at $T$: with less time left, the option of waiting for a better fill is worth less.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Estimating the fill model",
          text:
            "$\\lambda$ is the MO arrival rate, measured directly. $\\kappa$ comes from how far MOs walk the book: " +
            "for each depth $\\delta$, estimate the fraction of MOs that would have reached it and fit " +
            "$\\log(\\text{fraction}) = -\\kappa\\delta$.",
        },
      ],
    },
  ],

  references: [
    { source: "Cartea, Jaimungal & Penalva, Algorithmic and High-Frequency Trading", locator: "Ch. 5, Stochastic Optimal Control and Stopping (§5.4 Control for Counting Processes)" },
  ],
};
