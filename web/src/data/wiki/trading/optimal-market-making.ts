import type { WikiArticle } from "../types";

export const optimalMarketMakingWiki: WikiArticle = {
  conceptId: "optimal-market-making",

  summary: "A market maker posts limit orders on both sides, earning the spread when market orders fill them while her inventory wanders. Choosing depths to maximise expected wealth with a running inventory penalty and a terminal liquidation cost gives an explicit solution: depths equal $1/\\kappa$ minus the marginal value of the inventory change a fill would cause, so quotes skew to push inventory back toward zero. The value function comes from a matrix exponential, and simpler variants post only at the touch or choose volume.",

  sections: [
    {
      heading: "The optimal quotes",
      blocks: [
        {
          kind: "formula",
          latex: "\\delta^{\\pm*}(t, q) = \\frac{1}{\\kappa} - \\left[h(t, q \\mp 1) - h(t, q)\\right], \\qquad h = \\frac{1}{\\kappa}\\log\\omega, \\qquad \\omega(t) = e^{\\mathbf{A}(T - t)}\\mathbf{z}",
          caption: "With $\\mathbf{A}_{qq} = -\\phi\\kappa q^2$, $\\mathbf{A}_{q,q\\pm1} = \\lambda e^{-1}$ and $z_q = e^{-\\alpha\\kappa q^2}$ (equal parameters on both sides).",
        },
        {
          kind: "prose",
          text: "The first term is the depth a risk-neutral, inventory-indifferent market maker would choose; the second skews it: when long she lowers her ask and raises her bid, so expected inventory drift $\\lambda e^{-\\kappa\\delta^{-}} - \\lambda e^{-\\kappa\\delta^{+}}$ points toward the optimal level.",
        },
        {
          kind: "example",
          title: "Skewed quotes",
          problem: "With $\\kappa = 100$ per dollar, $h(q - 1) - h(q) = 0.3$ cents and $h(q + 1) - h(q) = -0.4$ cents, and $\\lambda = 1$ per second each side:",
          answer: "Her inventory reverts toward zero.",
          steps: [
            "Sell depth $1 - 0.3 = 0.7$ cents; buy depth $1 + 0.4 = 1.4$ cents.",
            "Inventory drift $e^{-1.4} - e^{-0.7} \\approx -0.25$ shares per second.",
          ],
        },
      ],
    },
    {
      heading: "Variants and behaviour",
      blocks: [
        {
          kind: "list",
          items: [
            "**No penalties**: depths are $1/\\kappa$ on both sides at all times.",
            "**At the touch**: she posts on a side only if $\\Delta/2 + h(q \\mp 1) - h(q) > 0$, giving a two-sided band around zero inventory and one-sided quoting outside it.",
            "**Choosing volume**: posting more units at the touch earns more spread per fill but moves inventory further.",
            "**Far from $T$**: depths become stationary, determined by the leading eigenvector of $\\mathbf{A}$.",
            "Larger $\\phi$ tightens inventory, lowering both the mean and the variance of P&L.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Volatility drops out",
          text: "With a running penalty rather than utility, $\\sigma$ does not affect the depths, which is unrealistic; utility (or $\\phi = \\tfrac{1}{2}\\gamma\\sigma^2$) and adverse selection bring it back.",
        },
      ],
    },
  ],

  references: [
    { source: "Cartea, Jaimungal & Penalva, Algorithmic and High-Frequency Trading (2015)", locator: "Ch. 10, §10.1–10.2 Market making, no inventory restrictions, at the touch, optimising volume" },
  ],
};
