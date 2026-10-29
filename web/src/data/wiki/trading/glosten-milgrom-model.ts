import type { WikiArticle } from "../types";

export const glostenMilgromModelWiki: WikiArticle = {
  conceptId: "glosten-milgrom-model",

  summary:
    "Glosten–Milgrom explains the bid–ask spread as protection against adverse selection. A competitive " +
    "market maker faces traders who arrive one at a time; some know the asset’s value, the rest trade for " +
    "liquidity. She sets the ask to her expected value given that someone buys, and the bid to her expected " +
    "value given that someone sells. The more informed the flow, the wider the spread — and each trade " +
    "teaches her something, so quotes drift toward the truth.",

  sections: [
    {
      heading: "The model",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Value", description: "$V \\in \\lbrace V_L, V_H \\rbrace$ with $\\Pr(V_H) = p$, so $\\mu = pV_H + (1 - p)V_L$." },
            { term: "Informed traders (fraction $\\alpha$)", description: "Buy if $V = V_H$, sell if $V = V_L$." },
            { term: "Uninformed traders (fraction $1 - \\alpha$)", description: "Buy or sell with probability $\\frac{1}{2}$ each, regardless of $V$." },
            { term: "Quotes", description: "$a = \\mathbb{E}[V \\mid \\text{buy}]$, $b = \\mathbb{E}[V \\mid \\text{sell}]$: zero expected profit on each side." },
          ],
        },
        {
          kind: "formula",
          latex: "a - \\mu = \\frac{\\alpha p}{\\alpha p + \\frac{1 - \\alpha}{2}}\\,(V_H - \\mu), \\qquad \\mu - b = \\frac{\\alpha(1 - p)}{\\alpha(1 - p) + \\frac{1 - \\alpha}{2}}\\,(\\mu - V_L)",
          caption: "Half-spreads: the probability a buy (sell) is informed, times what an informed trader gains",
        },
        {
          kind: "prose",
          text:
            "The derivation is the zero-profit condition. Per order, the market maker loses $\\alpha p(V_H - a)$ to " +
            "informed buyers and gains $\\frac{1 - \\alpha}{2}(a - \\mu)$ from uninformed ones; setting the two equal " +
            "gives the ask formula. Uninformed traders pay the spread so that she breaks even against the informed.",
        },
      ],
    },

    {
      heading: "Learning from order flow",
      blocks: [
        {
          kind: "formula",
          latex: "p' = \\Pr(V_H \\mid \\text{buy}) = \\frac{p\\left(\\alpha + \\frac{1 - \\alpha}{2}\\right)}{\\alpha p + \\frac{1 - \\alpha}{2}}",
          caption: "Bayes’ rule after a buy; after a sell, replace $\\alpha + \\frac{1 - \\alpha}{2}$ by $\\frac{1 - \\alpha}{2}$",
        },
        {
          kind: "example",
          title: "Quotes before and after a buy",
          problem:
            "$V_H = 110$, $V_L = 90$, $p = 0.5$, $\\alpha = 0.4$. Find the quotes, then update after one buy and find the new quotes.",
          steps: [
            "$\\mu = 100$. Ask half-spread $\\frac{0.2}{0.2 + 0.3} \\times 10 = 4$, so $a = 104$; by symmetry $b = 96$. Spread $8$.",
            "After a buy: $p' = \\frac{0.5 \\times 0.7}{0.5} = 0.7$, so $\\mu' = 0.7 \\times 110 + 0.3 \\times 90 = 104$ — exactly the old ask.",
            "New ask: $\\frac{0.28}{0.28 + 0.3} \\times (110 - 104) \\approx 2.897$, so $a' \\approx 106.90$.",
            "New bid: $\\frac{0.12}{0.12 + 0.3} \\times (104 - 90) = 4$, so $b' = 100$.",
          ],
          answer: "Quotes jump up after the buy, and the spread narrows from $8$ to about $6.90$ as uncertainty about $V$ falls.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Odds multiply",
          text:
            "In odds form, each buy multiplies $p/(1 - p)$ by $\\frac{\\alpha + (1 - \\alpha)/2}{(1 - \\alpha)/2}$ " +
            "and each sell divides by it. A run of same-sided trades drives the price toward one value " +
            "exponentially fast — the model’s picture of price discovery, and why spreads are widest just after " +
            "news and narrow through the day.",
        },
      ],
    },

    {
      heading: "Extensions and comparisons",
      blocks: [
        {
          kind: "list",
          items: [
            "**$\\alpha = 0$**: no adverse selection, zero spread (in this model, which has no inventory or order-processing costs).",
            "**Price-sensitive liquidity traders** trade only if their urgency exceeds the half-spread. A wider spread drives some away, which raises the informed share and widens the spread further; if urgency is low, the market can collapse entirely.",
            "**Versus Kyle**: Kyle has one batch auction and a linear price in net flow, with $\\lambda$ as impact; Glosten–Milgrom has sequential unit trades and a spread. The half-spread plays the role of $\\lambda$.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Dark pools and toxic flow",
          text:
            "If a dark pool crossing at the midprice skims off mostly uninformed orders, the flow that remains on " +
            "the lit market is more toxic, so its spread widens. Segmenting flow helps those who leave and hurts those who stay.",
        },
      ],
    },
  ],

  references: [
    { source: "Cartea, Jaimungal & Penalva, Algorithmic and High-Frequency Trading", locator: "Ch. 2, A Primer on the Microstructure of Financial Markets (§2.3 Market Making with an Informational Disadvantage)" },
  ],
};
