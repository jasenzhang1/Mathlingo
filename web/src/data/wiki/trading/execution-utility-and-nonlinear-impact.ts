import type { WikiArticle } from "../types";

export const executionUtilityAndNonlinearImpactWiki: WikiArticle = {
  conceptId: "execution-utility-and-nonlinear-impact",

  summary:
    "Two extensions of the basic execution model. First, replacing the running inventory penalty with " +
    "exponential (CARA) utility changes nothing about the strategy: the utility agent behaves exactly like a " +
    "risk-neutral one with $\\phi = \\frac{1}{2}\\gamma\\sigma^2$. Second, making temporary impact a power of " +
    "speed, $f(\\nu) = k\\nu^{a}$, breaks the quadratic structure; the HJB is written with a Legendre transform " +
    "and usually solved numerically. Weaker (concave) impact makes the agent trade faster.",

  sections: [
    {
      heading: "Exponential utility is a running penalty in disguise",
      blocks: [
        {
          kind: "formula",
          latex: "\\sup_{\\nu}\\;\\mathbb{E}\\left[-\\exp\\left\\lbrace -\\gamma\\left(X_T + Q_T(S_T - \\alpha Q_T)\\right)\\right\\rbrace\\right], \\qquad H = -\\exp\\left\\lbrace -\\gamma\\left(x + qS + h(t, q)\\right)\\right\\rbrace",
        },
        {
          kind: "prose",
          text:
            "Substituting the ansatz, the factor $-\\gamma H$ comes out of every term. The Brownian part of the " +
            "midprice, which a risk-neutral agent ignores, now contributes $-\\frac{1}{2}\\gamma\\sigma^2 q^2$ — a " +
            "running penalty on inventory. What is left for $h$ is the same Riccati equation as before with",
        },
        {
          kind: "formula",
          latex: "\\phi = \\tfrac{1}{2}\\gamma\\sigma^2",
          caption: "Same $h$, same optimal speed; $x + qS + h$ is the certainty-equivalent wealth",
        },
        {
          kind: "example",
          title: "Translating urgency into risk aversion",
          problem: "A desk wants urgency $\\sqrt{\\phi/k} = 5$ per day with $k = 4 \\times 10^{-6}$ and daily volatility $\\sigma = 0.5$. What CARA risk aversion is that? And what happens to the urgency if $\\sigma$ doubles?",
          steps: [
            "$\\phi = 25 \\times 4 \\times 10^{-6} = 10^{-4}$.",
            "$\\gamma = 2\\phi/\\sigma^2 = 2 \\times 10^{-4}/0.25 = 8 \\times 10^{-4}$ per dollar.",
            "Doubling $\\sigma$ multiplies $\\phi$ by $4$, so the urgency $\\sqrt{\\phi/k}$ doubles.",
          ],
          answer: "$\\gamma = 0.0008$. Under utility, urgency rises automatically with volatility; under a fixed $\\phi$ it does not — one reason to state the penalty in terms of $\\gamma\\sigma^2$.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Same strategy, different story",
          text:
            "CARA makes the strategy independent of wealth and deterministic — convenient, but a multi-day " +
            "liquidation may care more about large losses than CARA does. The running-penalty form is often " +
            "preferred in practice because $\\phi$ can be set directly as a desk risk limit.",
        },
      ],
    },

    {
      heading: "Non-linear temporary impact",
      blocks: [
        {
          kind: "prose",
          text:
            "With $f(\\nu) = k\\nu^{a}$ the cost rate is $F(\\nu) = \\nu f(\\nu) = k\\nu^{1 + a}$, and the supremum in the " +
            "HJB is $\\sup_\\nu\\lbrace \\nu y - F(\\nu)\\rbrace = F^{*}(y)$ with $y = -(bq + \\partial_q h)$ — the **Legendre transform** of $F$.",
        },
        {
          kind: "formula",
          latex: "\\partial_t h - \\phi q^2 + F^{*}\\left(-(bq + \\partial_q h)\\right) = 0, \\quad h(T, q) = -\\alpha q^2; \\qquad \\nu^{*} = \\left(\\frac{y}{(1 + a)k}\\right)^{1/a}, \\quad F^{*}(y) = a\\,k\\,(\\nu^{*})^{1 + a}",
        },
        {
          kind: "example",
          title: "A Legendre transform",
          problem: "For $F(x) = kx^{1 + a}$ with $k = 1$ and $a = 0.5$, compute the maximiser and $F^{*}(3)$.",
          steps: [
            "$x^{*} = \\left(\\frac{3}{1.5}\\right)^{1/0.5} = 2^2 = 4$.",
            "$F^{*}(3) = 3 \\times 4 - 4^{1.5} = 12 - 8 = 4$; check: $a k (x^{*})^{1 + a} = 0.5 \\times 8 = 4$ ✓.",
          ],
          answer: "$F^{*}(3) = 4$. Geometrically, $F^{*}(y)$ is the largest gap between the line $xy$ and the convex curve $F$; convexity makes slope and point correspond one to one, so $F^{**} = F$.",
        },
        {
          kind: "list",
          items: [
            "For $a = 1$ this is the linear model and $F^{*}(y) = y^2/(4k)$ — the quadratic closed form.",
            "For $a \\ne 1$ the equation is no longer quadratic in $q$, so it is solved numerically: an explicit finite-difference scheme backward from $T$ on a grid in $q$.",
            "With concave impact ($a < 1$), large trades are relatively cheap, so the agent front-loads more — she behaves as if she had a larger urgency.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Choosing the impact model",
          text:
            "Impact regressions typically have $R^2$ below $5\\%$, so data alone rarely pin down $a$. Fit both " +
            "linear and square-root forms on your own fills, compare out of sample at the speeds you actually " +
            "trade, and check how sensitive the resulting schedule is to the choice.",
        },
      ],
    },
  ],

  references: [
    { source: "Cartea, Jaimungal & Penalva, Algorithmic and High-Frequency Trading", locator: "Ch. 6, Optimal Execution with Continuous Trading I (§6.6–6.7)" },
  ],
};
