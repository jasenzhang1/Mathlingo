import type { WikiArticle } from "../types";

export const optimalExecutionContinuousTradingWiki: WikiArticle = {
  conceptId: "optimal-execution-continuous-trading",

  summary: "A trader who must sell a large block faces a trade-off: selling fast walks the book (temporary impact) and pushes the price down (permanent impact), while selling slowly leaves her exposed to price moves. Posed as a control problem with linear impacts and quadratic penalties, it has a closed-form solution. Without urgency the answer is TWAP; with a running inventory penalty it is the Almgren–Chriss schedule, which front-loads trading along a sinh curve governed by the urgency $\\gamma = \\sqrt{\\phi/k}$.",

  sections: [
    {
      heading: "The model",
      blocks: [
        {
          kind: "formula",
          latex: "dQ_t = -\\nu_t\\,dt,\\quad dS_t = -b\\nu_t\\,dt + \\sigma dW_t,\\quad \\hat{S}_t = S_t - k\\nu_t,\\quad dX_t = \\hat{S}_t\\nu_t\\,dt",
          caption: "Inventory, midprice with permanent impact $b$, execution price with temporary impact $k$, and cash.",
        },
        {
          kind: "formula",
          latex: "\\sup_{\\nu}\\mathbb{E}\\left[X_T + Q_T(S_T - \\alpha Q_T) - \\phi\\int_t^T Q_u^2\\,du\\right]",
          caption: "Terminal penalty $\\alpha$ for unsold shares and running penalty $\\phi$ expressing urgency (not a cash cost).",
        },
        {
          kind: "prose",
          text: "With the ansatz $H = x + qS + h_2(t)q^2$ the HJB reduces to a Riccati ODE for $h_2$, and the optimal speed is $\\nu^{*} = -\\frac{1}{k}(h_2 + \\tfrac{b}{2})\\cdot 2q$-type feedback, linear in remaining inventory.",
        },
      ],
    },
    {
      heading: "The solutions",
      blocks: [
        {
          kind: "table",
          headers: ["Case","Optimal schedule"],
          rows: [
            ["$\\phi = 0$, $\\alpha \\to \\infty$","TWAP: $\\nu = q/(T - t)$, $Q_t = \\mathfrak{N}(1 - t/T)$"],
            ["$\\phi = 0$, finite $\\alpha$ (acquisition)","Constant speed $Y_t/(T - t + k/\\alpha)$, as if the deadline were $k/\\alpha$ later"],
            ["$\\phi > 0$, $\\alpha \\to \\infty$","$Q_t = \\mathfrak{N}\\frac{\\sinh(\\gamma(T - t))}{\\sinh(\\gamma T)}$, $\\nu_t = \\gamma\\coth(\\gamma(T - t))Q_t$"],
            ["General $\\alpha$, $b$","$\\nu_t = \\gamma\\frac{\\zeta e^{\\gamma(T - t)} + e^{-\\gamma(T - t)}}{\\zeta e^{\\gamma(T - t)} - e^{-\\gamma(T - t)}}Q_t$, $\\zeta = \\frac{\\alpha - b/2 + \\sqrt{k\\phi}}{\\alpha - b/2 - \\sqrt{k\\phi}}$"],
          ],
        },
        {
          kind: "example",
          title: "How front-loaded is the schedule?",
          problem: "Full liquidation with $\\gamma = 2$ per day over $T = 1$ day.",
          answer: "Urgency sells two-thirds of the order in the first half of the day.",
          steps: [
            "At $t = 0.5$, $Q/\\mathfrak{N} = \\sinh(1)/\\sinh(2) = 1.1752/3.6269 \\approx 0.324$.",
            "TWAP would still hold $0.5$.",
            "The initial speed is $\\gamma\\coth(\\gamma T)\\mathfrak{N} \\approx 2.07\\mathfrak{N}$ per day, against $\\mathfrak{N}$ for TWAP.",
          ],
        },
      ],
    },
    {
      heading: "Lessons",
      blocks: [
        {
          kind: "list",
          items: [
            "With full liquidation, every strategy pays the same permanent-impact cost $\\frac{b}{2}\\mathfrak{N}^2$, so $b$ does not shape the schedule.",
            "The optimal strategy is deterministic: the feedback depends only on time and inventory.",
            "The running penalty proxies mean–variance risk: the variance of revenue is $\\sigma^2\\int Q_t^2dt$.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "When deterministic is wrong",
          text: "Price limits, order-flow signals or drifts make the optimal strategy depend on observed prices; Chapter 7 adds these.",
        },
      ],
    },
  ],

  references: [
    { source: "Cartea, Jaimungal & Penalva, Algorithmic and High-Frequency Trading (2015)", locator: "Ch. 6, §6.1–6.5 The model, liquidation and acquisition with temporary and permanent impact" },
  ],
};
