import type { WikiArticle } from "../types";

export const stochasticControlAndHjbWiki: WikiArticle = {
  conceptId: "stochastic-control-and-hjb",

  summary: "Stochastic control chooses an adapted strategy to maximise expected reward when the strategy affects the state’s dynamics. The value function satisfies the dynamic programming principle, whose infinitesimal form is the Hamilton–Jacobi–Bellman equation: a non-linear PDE with a supremum over controls, maximised pointwise to give a feedback control. A verification theorem confirms a smooth solution is the value. The Merton portfolio problem is the canonical example and the template for every algorithm in the book.",

  sections: [
    {
      heading: "The control problem",
      blocks: [
        {
          kind: "formula",
          latex: "H(t, x) = \\sup_{u \\in \\mathcal{A}_{t,T}}\\mathbb{E}_{t,x}\\left[G(X^{u}_T) + \\int_t^T F(s, X^{u}_s, u_s)\\,ds\\right]",
          caption: "Value function over admissible, predictable controls.",
        },
        {
          kind: "prose",
          text: "The DPP says the value now equals the best expected value at any later stopping time plus the reward accumulated meanwhile. Applying it over $[t, t + h]$ with Itô’s lemma and letting $h \\to 0$ gives the HJB equation.",
        },
        {
          kind: "formula",
          latex: "\\partial_t H + \\sup_{u}\\left\\{\\mathcal{L}^{u}H + F(t, x, u)\\right\\} = 0, \\qquad H(T, x) = G(x)",
          caption: "The supremum is over the control’s current value only, so it can be found pointwise in feedback form $u^{*}(t, x)$.",
        },
      ],
    },
    {
      heading: "The Merton problem",
      blocks: [
        {
          kind: "example",
          title: "Exponential utility",
          problem: "Wealth $X$ is invested in a stock with drift $\\mu$, volatility $\\sigma$ and a bank account at rate $r$; utility is $-e^{-\\gamma X_T}$.",
          answer: "With $\\mu - r = 0.08$, $\\sigma = 0.2$ and $\\gamma = 10^{-4}$ (and $r = 0$), she invests \\$20{,}000 regardless of her wealth; with CRRA utility the fraction $(\\mu - r)/(\\gamma\\sigma^2)$ of wealth is fixed instead.",
          steps: [
            "The HJB is quadratic in the dollar investment $\\pi$: maximising gives $\\pi^{*} = -\\frac{(\\mu - r)\\partial_x H}{\\sigma^2\\partial_{xx}H}$.",
            "The ansatz $H = -\\exp\\{-\\gamma xe^{r(T - t)} - \\beta(t)\\}$ removes $S$ and wealth from the problem.",
            "The result is $\\pi^{*}_t = \\frac{\\mu - r}{\\gamma\\sigma^2}e^{-r(T - t)}$.",
          ],
        },
      ],
    },
    {
      heading: "From Merton to trading",
      blocks: [
        {
          kind: "list",
          items: [
            "**Verification**: a classical solution whose maximiser is admissible is the value, and Markov controls suffice, so strategies are tables over a few state variables.",
            "**Ansätze**: cash and marked-to-market inventory, $x + qS$, split off exactly; the rest is often quadratic in $q$, giving Riccati ODEs.",
            "**Utility and penalties**: a running penalty $\\phi\\int q^2$ often reproduces CARA utility with $\\phi = \\tfrac{1}{2}\\gamma\\sigma^2$.",
            "**Execution as control**: state $(t, x, S, q)$, control the trading speed, impact in the dynamics, penalties on leftover inventory.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Time consistency",
          text: "Expected utility and additive penalties are time-consistent, which dynamic programming needs; a mean–variance objective on terminal wealth is not.",
        },
      ],
    },
  ],

  references: [
    { source: "Cartea, Jaimungal & Penalva, Algorithmic and High-Frequency Trading (2015)", locator: "Ch. 5, §5.1–5.3 Control problems in finance, the DPP, the HJB equation and verification" },
  ],
};
