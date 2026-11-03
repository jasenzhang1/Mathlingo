import type { WikiArticle } from "../types";

export const executionWithLimitAndMarketOrdersWiki: WikiArticle = {
  conceptId: "execution-with-limit-and-market-orders",

  summary: "Allowing market orders alongside limit orders lets the agent cross the spread when she falls behind. The problem becomes a quasi-variational inequality: at each instant she either continues posting a limit order at the optimal depth or sends a market order. The solution splits inventory–time space into a posting region and an execution region, which grows with inventory and as the deadline nears, and can be steered to track a target schedule.",

  sections: [
    {
      heading: "The QVI",
      blocks: [
        {
          kind: "formula",
          latex: "\\max\\Big\\{\\partial_t h - \\phi q^2 + \\lambda\\sup_{\\delta}e^{-\\kappa\\delta}\\left[\\delta + h(q - 1) - h(q)\\right];\\; -\\tfrac{\\Delta}{2} + h(q - 1) - h(q)\\Big\\} = 0",
          caption: "Continue posting LOs, or send an MO that sells at the bid $S - \\Delta/2$.",
        },
        {
          kind: "prose",
          text: "The MO is optimal when $h(q - 1) - h(q) \\ge \\Delta/2$: when the value of shedding one share exceeds the half-spread. At that boundary the LO depth $1/\\kappa - [h(q - 1) - h(q)]$ would be at most $1/\\kappa - \\Delta/2$, so crossing replaces posting very close to the mid.",
        },
        {
          kind: "example",
          title: "Should she cross?",
          problem: "The spread is $2$ cents, $h(q - 1) = -0.4$ cents and $h(q) = -1.6$ cents.",
          answer: "She keeps crossing until inventory reaches the posting region, then posts at the depth for the new inventory, which jumps up.",
          steps: [
            "The value change from an MO is $-1 + (-0.4 + 1.6) = +0.2$ cents.",
            "It is positive, so she executes the MO.",
          ],
        },
      ],
    },
    {
      heading: "Regimes and schedules",
      blocks: [
        {
          kind: "list",
          items: [
            "If urgency $\\phi$ is small, she never crosses before $T$ (except possibly an instant before maturity, which beats the terminal penalty).",
            "If $\\phi$ is large, she crosses immediately or after a critical time, posting LOs otherwise.",
            "The QVI is solved backwards on an inventory grid, comparing continuation with immediate execution at each step.",
            "Tracking a schedule $\\bar{q}_t$ replaces the penalty by $\\phi(q - \\bar{q}_t)^2$: behind schedule she crosses or posts closer, ahead she posts deeper.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Impulse versus continuous trading",
          text: "Chapter 6 treats MOs as a continuous trading speed; here each MO is an impulse that pays the spread. The impulse view fits single-unit trading mixed with liquidity provision.",
        },
      ],
    },
  ],

  references: [
    { source: "Cartea, Jaimungal & Penalva, Algorithmic and High-Frequency Trading (2015)", locator: "Ch. 8, §8.4 Liquidation with limit and market orders, §8.5 Targeting schedules" },
  ],
};
