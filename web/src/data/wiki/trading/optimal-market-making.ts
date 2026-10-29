import type { WikiArticle } from "../types";

export const optimalMarketMakingWiki: WikiArticle = {
  conceptId: "optimal-market-making",

  summary:
    "A market maker posts a sell limit order $\\delta^{+}$ above the midprice and a buy limit order $\\delta^{-}$ " +
    "below it, earning the depth on every fill. Fills arrive randomly, so inventory wanders, and inventory " +
    "carries price risk. Penalising inventory leads to a closed-form solution: each depth is $1/\\kappa$ minus " +
    "the change in value from the fill. A long market maker sells closer and buys deeper, skewing her quotes to " +
    "push inventory back toward zero.",

  sections: [
    {
      heading: "The model",
      blocks: [
        {
          kind: "list",
          items: [
            "Midprice $S_t = S_0 + \\sigma W_t$; buy MOs arrive at rate $\\lambda^{+}$ and fill her sell LO with probability $e^{-\\kappa^{+}\\delta^{+}}$; sell MOs arrive at rate $\\lambda^{-}$ and fill her buy LO with probability $e^{-\\kappa^{-}\\delta^{-}}$.",
            "Inventory $q$ stays between limits $\\underline{q}$ and $\\bar{q}$; at a limit she stops quoting on that side.",
            "Objective: $\\mathbb{E}\\left[X_T + Q_T(S_T - \\alpha Q_T) - \\phi\\int_t^T Q_u^2\\,du\\right]$ — terminal liquidation penalty $\\alpha$, running inventory penalty $\\phi$.",
          ],
        },
        {
          kind: "formula",
          latex: "\\partial_t h - \\phi q^2 + \\lambda^{+}\\sup_{\\delta^{+}} e^{-\\kappa^{+}\\delta^{+}}\\left(\\delta^{+} + h(t, q - 1) - h(t, q)\\right) + \\lambda^{-}\\sup_{\\delta^{-}} e^{-\\kappa^{-}\\delta^{-}}\\left(\\delta^{-} + h(t, q + 1) - h(t, q)\\right) = 0",
          caption: "With $H = x + qS + h(t, q)$ and $h(T, q) = -\\alpha q^2$",
        },
        {
          kind: "formula",
          latex: "\\delta^{\\pm *}(t, q) = \\frac{1}{\\kappa^{\\pm}} - \\left[h(t, q \\mp 1) - h(t, q)\\right]",
          caption: "The static optimum $1/\\kappa$, adjusted by how much the fill changes her value",
        },
      ],
    },

    {
      heading: "The closed-form solution",
      blocks: [
        {
          kind: "prose",
          text:
            "With symmetric parameters ($\\kappa^{\\pm} = \\kappa$, $\\lambda^{\\pm} = \\lambda$), the substitution " +
            "$h = \\frac{1}{\\kappa}\\log\\omega$ turns each supremum term into $\\lambda e^{-1}\\omega_{q \\mp 1}/\\omega_q$, " +
            "and multiplying through by $\\kappa\\omega_q$ leaves a linear matrix ODE:",
        },
        {
          kind: "formula",
          latex: "\\boldsymbol{\\omega}(t) = e^{\\mathbf{A}(T - t)}\\mathbf{z}, \\qquad \\mathbf{A}_{qq} = -\\phi\\kappa q^2, \\quad \\mathbf{A}_{q, q \\pm 1} = \\lambda e^{-1}, \\quad z_q = e^{-\\alpha\\kappa q^2}",
          caption: "$\\mathbf{A}$ is tridiagonal over the allowed inventories",
        },
        {
          kind: "example",
          title: "A two-inventory market maker",
          problem:
            "Allow only $q \\in \\lbrace 0, 1 \\rbrace$, with $\\phi\\kappa = 1$, $\\lambda e^{-1} = 0.5$ and $\\kappa = 100$. Far from $T$, $\\boldsymbol{\\omega}$ lines up with the top eigenvector of $\\mathbf{A} = \\begin{bmatrix} 0 & 0.5 \\\\ 0.5 & -1 \\end{bmatrix}$. Find the stationary depths.",
          steps: [
            "Eigenvalues solve $\\mu^2 + \\mu - 0.25 = 0$: the largest is $\\mu = \\frac{\\sqrt{2} - 1}{2} \\approx 0.2071$, with eigenvector ratio $\\omega_1/\\omega_0 = 2\\mu \\approx 0.4142$.",
            "At $q = 1$ she can only sell: $\\delta^{+} = \\frac{1}{\\kappa}[1 - \\log(\\omega_0/\\omega_1)] = 0.01(1 - 0.8814) \\approx 0.119$ cents.",
            "At $q = 0$ she can only buy: $\\delta^{-} = \\frac{1}{\\kappa}[1 + \\log(\\omega_0/\\omega_1)] = 0.01 \\times 1.8814 \\approx 1.881$ cents.",
          ],
          answer: "Holding a share, she quotes almost at the midprice to get rid of it; flat, she buys only at a deep discount. Inventory aversion shows up as skewed quotes.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "What the penalty buys",
          text:
            "Without penalties, depths stay at $1/\\kappa$ and expected profit is $2\\lambda T\\frac{1}{\\kappa}e^{-1}$ — about " +
            "$\\$2.21$ over $300$ seconds with $\\lambda = 1$ and $\\kappa = 100$ — but inventory is a random walk " +
            "with variance growing like the number of fills. Raising $\\phi$ gives up a little mean P&L for a much " +
            "tighter P&L and inventory distribution.",
        },
      ],
    },

    {
      heading: "Posting at the touch and choosing volume",
      blocks: [
        {
          kind: "prose",
          text:
            "When the spread is one tick, depths are not continuous: she either posts at the best quote, earning " +
            "$\\frac{\\Delta}{2}$ on a fill, or not at all. The choice on each side is a comparison:",
        },
        {
          kind: "formula",
          latex: "\\text{post a sell LO} \\iff \\frac{\\Delta}{2} + h(t, q - 1) - h(t, q) > 0, \\qquad \\text{post a buy LO} \\iff \\frac{\\Delta}{2} + h(t, q + 1) - h(t, q) > 0",
        },
        {
          kind: "list",
          items: [
            "Near zero inventory she posts on both sides; beyond a threshold she quotes only on the side that reduces inventory.",
            "A larger $\\phi$ narrows the region where she posts on both sides.",
            "Choosing posted volume adds another control: posting more on a side earns $\\frac{\\Delta}{2}$ per unit filled but moves inventory further.",
            "Just before $T$, a large inventory with a big terminal penalty makes her quote very aggressively on the reducing side.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Ticks are discrete",
          text:
            "Continuous depths like $0.119$ cents cannot be posted in a market with a one-cent tick. Round the " +
            "model depth to a feasible price, or use the at-the-touch model when the spread is one tick.",
        },
      ],
    },
  ],

  references: [
    { source: "Cartea, Jaimungal & Penalva, Algorithmic and High-Frequency Trading", locator: "Ch. 10, Market Making (§10.1–10.2)" },
  ],
};
