import type { WikiArticle } from "../types";

export const marketMakingUtilityAndAdverseSelectionWiki: WikiArticle = {
  conceptId: "market-making-utility-and-adverse-selection",

  summary:
    "The basic market maker treats every fill as harmless. In reality some MOs come from informed traders, " +
    "and the midprice moves against her right after she is filled. This lesson adds three features: " +
    "exponential utility in place of a running penalty, MOs that make the midprice jump, and a short-term " +
    "alpha signal that predicts drift. Each one shifts the quotes: utility shrinks the margin, adverse " +
    "selection widens it by the expected jump, and alpha skews both quotes toward the expected move.",

  sections: [
    {
      heading: "Utility-maximising market makers",
      blocks: [
        {
          kind: "prose",
          text:
            "With CARA utility $-e^{-\\gamma(X_T + Q_T(S_T - \\alpha Q_T))}$ the same exponential substitution works, and " +
            "the constant part of each depth changes from $1/\\kappa$ to",
        },
        {
          kind: "formula",
          latex: "\\frac{1}{\\gamma}\\log\\left(1 + \\frac{\\gamma}{\\kappa}\\right) < \\frac{1}{\\kappa}",
        },
        {
          kind: "prose",
          text:
            "A risk-averse market maker posts closer to the midprice, because an extra fill now reduces her risk " +
            "as well as earning the margin. For $\\gamma/\\kappa = 1$ the margin is $\\log 2 \\approx 0.693$ times the " +
            "risk-neutral one; for small $\\gamma$ it approaches $1/\\kappa$. As in the execution chapters, the problem " +
            "maps onto a penalised risk-neutral one with adjusted arrival rates and penalty.",
        },
      ],
    },

    {
      heading: "Adverse selection: MOs that move the price",
      blocks: [
        {
          kind: "prose",
          text:
            "Let the midprice jump by $\\varepsilon^{+}$ after each buy MO and by $-\\varepsilon^{-}$ after each sell MO. A " +
            "sell LO filled by a buy MO earns $\\delta^{+}$ but is immediately worth $\\varepsilon^{+}$ less, so the DPE " +
            "gains expected jumps inside the suprema, plus a term $q(\\lambda^{+}\\mathbb{E}[\\varepsilon^{+}] - \\lambda^{-}\\mathbb{E}[\\varepsilon^{-}])$ " +
            "for how MOs revalue the inventory she already holds. The depths become",
        },
        {
          kind: "formula",
          latex: "\\delta^{\\pm *} = \\frac{1}{\\kappa} + \\mathbb{E}[\\varepsilon^{\\pm}] - \\left[h(t, q \\mp 1) - h(t, q)\\right]",
          caption: "Add the expected adverse jump to the margin",
        },
        {
          kind: "example",
          title: "Protecting against toxic flow",
          problem: "$\\kappa = 100$, the expected jump after a buy MO is $0.3$ cents, and $h(q - 1) - h(q) = 0.5$ cents. Find the sell depth. Separately: a market maker fills $10{,}000$ times a day at $1$ cent, but $20\\%$ of fills are informed and followed by a $4$-cent adverse move. What is her expected daily P&L?",
          steps: [
            "$\\delta^{+*} = 1 + 0.3 - 0.5 = 0.8$ cents.",
            "Per fill: $1 - 0.2 \\times 4 = 0.2$ cents. Daily: $10{,}000 \\times 0.002 = \\$20$.",
          ],
          answer: "Quote $0.8$ cents out. In the second case, adverse selection eats $80\\%$ of her gross spread income; a market maker who ignores it may be losing money without knowing it.",
        },
      ],
    },

    {
      heading: "Short-term alpha",
      blocks: [
        {
          kind: "formula",
          latex: "dS_t = \\alpha_t\\,dt + \\sigma\\,dW_t, \\qquad d\\alpha_t = -\\zeta\\alpha_t\\,dt + \\eta\\,dW_t^{\\alpha} + \\varepsilon^{+}dM_t^{+} - \\varepsilon^{-}dM_t^{-}",
          caption: "A mean-reverting drift that jumps up after buy MOs ($M^{+}$) and down after sell MOs ($M^{-}$)",
        },
        {
          kind: "list",
          items: [
            "After a buy MO the drift jumps up by $\\varepsilon^{+}$ and decays at rate $\\zeta$, so the expected cumulative price move is $\\alpha/\\zeta$: with $\\alpha = 0.03$ and $\\zeta = 2$, that is $1.5$ cents.",
            "With positive alpha she quotes her sell deeper (do not sell before the rise) and her buy closer (buy before it), and is willing to hold positive inventory.",
            "With negative alpha the skew reverses. The skew grows with $|\\alpha|$; strong signals can switch off one side altogether.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Alpha versus inventory",
          text:
            "Without alpha, the quote skew depends only on inventory and pushes $q$ toward zero. With alpha, the " +
            "target inventory is no longer zero: she leans into the expected move, trading off the drift gain " +
            "$q\\alpha$ against the inventory penalty.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Toxicity changes through the day",
          text:
            "The expected jump $\\varepsilon$ is not constant. It is largest around news and at the open. Estimate " +
            "it on a rolling window of post-fill price moves, conditioned on order size and imbalance, and widen " +
            "quotes when recent fills have been followed by adverse moves.",
        },
      ],
    },
  ],

  references: [
    { source: "Cartea, Jaimungal & Penalva, Algorithmic and High-Frequency Trading", locator: "Ch. 10, Market Making (§10.3–10.4)" },
  ],
};
