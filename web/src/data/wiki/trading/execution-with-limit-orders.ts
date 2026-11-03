import type { WikiArticle } from "../types";

export const executionWithLimitOrdersWiki: WikiArticle = {
  conceptId: "execution-with-limit-orders",

  summary: "Instead of paying the spread with market orders, a liquidating agent can post limit orders and be paid for providing liquidity, at the price of not knowing when, or whether, they fill. With fill rate $\\lambda e^{-\\kappa\\delta}$ and a penalty on shares left at $T$, the problem has an explicit solution: the optimal depth is $1/\\kappa$ above a reservation price that falls as inventory rises and time runs out, computed from a Poisson-weighted sum.",

  sections: [
    {
      heading: "Model and solution",
      blocks: [
        {
          kind: "formula",
          latex: "\\delta^{*}(t, q) = \\frac{1}{\\kappa} + \\frac{1}{\\kappa}\\log\\frac{\\omega(t, q)}{\\omega(t, q - 1)}, \\qquad \\omega(t, q) = \\sum_{n=0}^{q}\\frac{(\\tilde{\\lambda}(T - t))^n}{n!}e^{-\\kappa\\alpha(q - n)^2}, \\quad \\tilde{\\lambda} = \\lambda e^{-1}",
          caption: "Here $h(t, q) = \\frac{1}{\\kappa}\\log\\omega(t, q)$ is the value above the marked-to-market inventory, and $\\omega(t, 0) = 1$.",
        },
        {
          kind: "prose",
          text: "The substitution $h = \\frac{1}{\\kappa}\\log\\omega$ turns the DPE into the linear recursion $\\partial_t\\omega(q) + \\tilde{\\lambda}\\omega(q - 1) = 0$, which integrates to the Poisson-type sum: the value averages over how many fills happen before $T$.",
        },
        {
          kind: "example",
          title: "Depths for one and two shares",
          problem: "Take $\\kappa = 100$ per dollar, $\\kappa\\alpha = 0.1$ and $\\tilde{\\lambda}(T - t) = 5$.",
          answer: "More inventory means a lower depth: she posts closer to the mid to sell faster.",
          steps: [
            "$\\omega_1 = e^{-0.1} + 5 = 5.905$ and $\\omega_2 = e^{-0.4} + 5e^{-0.1} + 12.5 = 17.695$.",
            "$\\delta^{*}(1) = (1 + \\log 5.905)/100 \\approx 2.78$ cents.",
            "$\\delta^{*}(2) = (1 + \\log(17.695/5.905))/100 \\approx 2.10$ cents.",
          ],
        },
      ],
    },
    {
      heading: "Behaviour and extensions",
      blocks: [
        {
          kind: "list",
          items: [
            "Depths fall with inventory and as $T$ approaches; far from $T$ they approach a constant.",
            "Simulations beat TWAP with MOs because LOs earn the depth instead of paying the spread.",
            "With exponential utility, the constant term $1/\\kappa$ becomes $\\frac{1}{\\gamma}\\log(1 + \\gamma/\\kappa)$, smaller, so she posts closer.",
            "Adding a running penalty $\\phi\\int Q^2$ makes her more aggressive early.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Optimistic about fills",
          text: "The model assumes fills are independent of later price moves and ignores queue position. Adversely selected fills and queues ahead of her both lower the true value of posting deep.",
        },
      ],
    },
  ],

  references: [
    { source: "Cartea, Jaimungal & Penalva, Algorithmic and High-Frequency Trading (2015)", locator: "Ch. 8, §8.2 Liquidation with only limit orders, §8.3 Exponential utility" },
  ],
};
