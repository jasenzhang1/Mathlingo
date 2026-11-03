import type { WikiArticle } from "../types";

export const executionUtilityAndNonlinearImpactWiki: WikiArticle = {
  conceptId: "execution-utility-and-nonlinear-impact",

  summary: "Two extensions of the basic execution model. An agent with exponential utility trades exactly like a risk-neutral agent with running inventory penalty $\\phi = \\tfrac{1}{2}\\gamma\\sigma^2$, and their value functions map into each other, which justifies the penalty formulation used throughout the book. And when temporary impact is a power law rather than linear, the HJB involves the Legendre transform of the cost function; it must be solved numerically, and weaker (concave) impact makes the agent liquidate faster.",

  sections: [
    {
      heading: "Exponential utility",
      blocks: [
        {
          kind: "formula",
          latex: "H^{\\text{exp}} = -\\exp\\left\\{-\\gamma\\left(x + qS + h_2(t)q^2\\right)\\right\\}, \\qquad \\phi = \\tfrac{1}{2}\\gamma\\sigma^2",
          caption: "With this ansatz the CARA HJB reduces to the same Riccati ODE as the penalised problem.",
        },
        {
          kind: "prose",
          text: "The price risk of holding $q$ shares contributes $-\\tfrac{1}{2}\\gamma\\sigma^2q^2$ per unit time to the certainty equivalent, exactly a quadratic running penalty. Hence $H^{\\text{exp}} = -\\exp\\{-\\gamma H^{\\text{inv}}\\}$: the CARA agent’s certainty equivalent is the penalised value.",
        },
        {
          kind: "example",
          title: "Choosing urgency from risk aversion",
          problem: "A desk has $\\gamma = 0.02$ per dollar, daily volatility $\\sigma = 0.3$ and temporary impact $k = 10^{-5}$.",
          answer: "Doubling volatility quadruples $\\phi$ and doubles the urgency.",
          steps: [
            "$\\phi = \\tfrac{1}{2} \\times 0.02 \\times 0.09 = 0.0009$.",
            "Urgency $\\gamma_{\\text{exec}} = \\sqrt{0.0009/10^{-5}} \\approx 9.49$ per day.",
          ],
        },
      ],
    },
    {
      heading: "Non-linear impact",
      blocks: [
        {
          kind: "formula",
          latex: "0 = \\partial_t h - \\phi q^2 + F^{*}\\!\\left(-(bq + \\partial_q h)\\right), \\qquad F(\\nu) = \\nu f(\\nu),\\quad F^{*}(y) = \\sup_x\\{xy - F(x)\\}",
          caption: "With $f(\\nu) = k\\nu^{a}$, $F^{*}(y) = ak\\left(\\frac{y}{(1 + a)k}\\right)^{(1 + a)/a}$.",
        },
        {
          kind: "prose",
          text: "The Legendre transform maps the convex cost $F$ to its tangent intercepts; convexity of $\\nu f(\\nu)$ (true for power laws with $a > 0$) makes this one-to-one. Except for $a = 1$, the equation has no quadratic solution and is solved by finite differences.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Weaker impact, faster trading",
          text: "As the power $a$ falls, large trades cost relatively less, so the agent sells faster to cut inventory risk, as if her urgency were higher.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Model choice",
          text: "Impact regressions rarely explain more than $5\\%$ of price variation; added complexity must earn its keep in realised execution costs.",
        },
      ],
    },
  ],

  references: [
    { source: "Cartea, Jaimungal & Penalva, Algorithmic and High-Frequency Trading (2015)", locator: "Ch. 6, §6.6 Execution with exponential utility, §6.7 Non-linear temporary price impact" },
  ],
};
