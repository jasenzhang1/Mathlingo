import type { WikiArticle } from "../types";

export const glostenMilgromModelWiki: WikiArticle = {
  conceptId: "glosten-milgrom-model",

  summary: "Glosten and Milgrom put the market maker at the centre. She quotes a bid and an ask for one unit, not knowing whether the next trader is informed. Competition forces each quote to equal the asset’s expected value given that a trade arrives on that side, so the spread exists purely to recover losses to informed traders from uninformed ones. As trades arrive she updates her beliefs by Bayes’ rule, quotes drift toward the true value, and when liquidity traders are price-sensitive the market can even collapse.",

  sections: [
    {
      heading: "Quotes as conditional expectations",
      blocks: [
        {
          kind: "formula",
          latex: "\\Delta_a = \\frac{\\alpha p}{\\alpha p + (1 - \\alpha)/2}(V_H - \\mu), \\qquad \\Delta_b = \\frac{\\alpha(1 - p)}{\\alpha(1 - p) + (1 - \\alpha)/2}(\\mu - V_L)",
          caption: "Half-spreads with informed fraction $\\alpha$, probability $p$ of the high value $V_H$, and $\\mu = pV_H + (1 - p)V_L$.",
        },
        {
          kind: "prose",
          text: "The ask is $a = \\mathbb{E}[v \\mid \\text{buy}]$: the probability that a buyer is informed times how much she knows. The book reads $\\alpha$ as the prevalence of toxicity and $V_H - \\mu$ as its magnitude.",
        },
        {
          kind: "example",
          title: "A symmetric example",
          problem: "Let $V_H = 105$, $V_L = 95$, $p = 0.5$ and $\\alpha = 0.2$.",
          answer: "Expected losses to informed buyers ($0.1 \\times 4 = 0.4$) equal expected gains from uninformed buyers ($0.4 \\times 1 = 0.4$).",
          steps: [
            "A buy comes from an informed trader with probability $0.1/(0.1 + 0.4) = 0.2$.",
            "$\\Delta_a = 0.2 \\times 5 = 1$, so the quotes are $99$ and $101$.",
            "After a buy the market maker updates to $p' = 0.5 \\times 0.6/0.5 = 0.6$, and the new mean is $101$.",
          ],
        },
      ],
    },
    {
      heading: "Dynamics and collapse",
      blocks: [
        {
          kind: "list",
          items: [
            "Each buy multiplies the odds of $V_H$ by $\\frac{\\alpha + (1 - \\alpha)/2}{(1 - \\alpha)/2}$; transaction prices form a martingale.",
            "As information is revealed, beliefs converge and the spread narrows.",
            "If liquidity traders only trade when their urgency exceeds the half-spread, wider spreads drive them away and raise the informed share; with low urgency the only solution is $\\Delta_a = V_H - \\mu$, and the market shuts down.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Toxic flow in practice",
          text: "The same logic explains why lit spreads widen when uninformed flow migrates to dark pools, and why market makers who can predict short-term price moves quote tighter: Chapter 10 builds both effects into optimal quoting.",
        },
      ],
    },
  ],

  references: [
    { source: "Cartea, Jaimungal & Penalva, Algorithmic and High-Frequency Trading (2015)", locator: "Ch. 2, §2.3 Market making with an informational disadvantage (Glosten–Milgrom 1985)" },
  ],
};
