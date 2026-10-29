import type { WikiArticle } from "../types";

export const executionPriceLimiterAndOrderFlowWiki: WikiArticle = {
  conceptId: "execution-price-limiter-and-order-flow",

  summary:
    "The Chapter 6 schedule ignores what prices do. Two realistic features make execution react to the " +
    "market. A **price limiter** — if the price reaches a cap $\\bar{S}$, stop trading continuously and buy the " +
    "rest in one penalised block — turns the problem into one with a boundary, and the agent buys faster as " +
    "the price nears the cap. **Order flow** from other traders pushes " +
    "the midprice through permanent impact, so a seller should speed up when others are selling and slow " +
    "down when they are buying.",

  sections: [
    {
      heading: "Acquiring with a price limit",
      blocks: [
        {
          kind: "prose",
          text:
            "An agent must buy $\\mathfrak{N}$ shares by $T$ with MOs. If the midprice rises to the cap $\\bar{S}$, she " +
            "stops trading continuously and buys the $Y$ shares still outstanding in one block, paying the penalty " +
            "$\\alpha Y$ per share on top of the price. Ignoring permanent impact, the inventory dependence separates " +
            "($h(t, S, y) = y^2 h(t, S)$), leaving a PDE in $(t, S)$ on $S < \\bar{S}$ with $h = \\alpha$ at the cap " +
            "(and $\\partial_{SS}h = 0$ far below it, where she should trade as if there were no limit). There is no " +
            "closed form; the book solves it iteratively, linearising around the previous iterate.",
        },
        {
          kind: "list",
          items: [
            "Hitting the cap forces a costly block purchase, so near the cap the agent buys faster than the Almgren–Chriss schedule to shrink what would be left. A maximum principle shows she trades at least as fast as AC at every inventory level.",
            "Higher volatility makes reaching the cap more likely, so she front-loads more.",
            "On average her inventory leads the AC path; later her speed falls below AC’s because fewer shares remain.",
            "This differs from simply stopping at $\\bar{S}$: she may still pay above the cap for the block, and the cap changes behaviour well before it binds.",
          ],
        },
        {
          kind: "example",
          title: "How likely is the cap to bind?",
          problem: "The midprice is driftless with $\\sigma = 0.5$ dollars per $\\sqrt{\\text{day}}$ and the cap is $\\$1$ above it. What is the probability of touching it within $T = 1$ day?",
          steps: [
            "Reflection principle: $\\Pr(\\max_{u \\le T} S_u \\ge S_0 + d) = 2\\Pr\\left(Z > \\frac{d}{\\sigma\\sqrt{T}}\\right)$.",
            "$\\frac{1}{0.5} = 2$, and $\\Pr(Z > 2) = 0.02275$, so the probability is $0.0455$.",
          ],
          answer: "About $4.6\\%$. Small, but because a breach triggers a penalised block purchase, she still buys a little faster than AC from the start.",
        },
      ],
    },

    {
      heading: "Order flow from other traders",
      blocks: [
        {
          kind: "formula",
          latex: "dS_t = b\\left(\\mu_t - \\nu_t\\right)dt + \\sigma\\,dW_t, \\qquad \\mu_t = \\mu_t^{+} - \\mu_t^{-}, \\qquad d\\mu_t^{\\pm} = -\\kappa\\mu_t^{\\pm}\\,dt + \\eta\\,dN_t^{\\pm}",
          caption: "Net order flow of other traders, built from buy and sell MOs that jump and decay",
        },
        {
          kind: "prose",
          text:
            "Each buy MO raises buy flow by $\\eta$, which then decays at rate $\\kappa$, so $\\mathbb{E}[\\mu_u \\mid \\mu_t] = " +
            "\\mu_t e^{-\\kappa(u - t)}$. With full liquidation the optimal speed is the AC speed plus an adjustment " +
            "for the flow expected over the remaining horizon:",
        },
        {
          kind: "formula",
          latex: "\\nu_t^{*} = \\nu_t^{\\text{AC}} - \\frac{b}{2k}\\int_t^T \\frac{\\sinh(\\gamma(T - u))}{\\sinh(\\gamma(T - t))}\\,\\mathbb{E}_t[\\mu_u]\\,du",
        },
        {
          kind: "example",
          title: "Slowing down when others buy",
          problem: "Take the TWAP limit ($\\gamma \\to 0$) over a long horizon, so the integral is about $\\mu_t/\\kappa$. Net buy flow is $\\mu_t = 600$ shares per hour, $\\kappa = 3$ per hour, $b = 10^{-5}$ and $k = 5 \\times 10^{-5}$. What is the adjustment?",
          steps: [
            "Integral $\\approx 600/3 = 200$ shares.",
            "Adjustment $= -\\frac{10^{-5}}{2 \\times 5 \\times 10^{-5}} \\times 200 = -0.1 \\times 200 = -20$ shares per hour.",
          ],
          answer: "Sell $20$ shares per hour slower than AC: buy pressure is expected to lift the price, so waiting earns more. Near $T$ the adjustment shrinks, because little time is left to benefit.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Two readings of the same rule",
          text:
            "A seller speeds up into sell-heavy flow because (i) the price is expected to fall, so selling now " +
            "beats selling later, and (ii) her own sales are camouflaged among others’, so she is less " +
            "distinguishable. The volatility of flow, $\\eta$, matters only through the expected flow, not directly.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Do not buy while liquidating",
          text:
            "Strong buy flow can make the unconstrained $\\nu^{*}$ negative — the model would buy in order to " +
            "sell later at higher prices, which is speculation, not execution. The book uses $\\nu^{+} = \\max(\\nu^{*}, 0)$ " +
            "while inventory is positive. In practice $\\mu_t$ must be estimated from recent MOs, and a noisy " +
            "estimate can make the algorithm chase its own signal.",
        },
      ],
    },
  ],

  references: [
    { source: "Cartea, Jaimungal & Penalva, Algorithmic and High-Frequency Trading", locator: "Ch. 7, Optimal Execution with Continuous Trading II (§7.1–7.3)" },
  ],
};
