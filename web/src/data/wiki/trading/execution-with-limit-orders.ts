import type { WikiArticle } from "../types";

export const executionWithLimitOrdersWiki: WikiArticle = {
  conceptId: "execution-with-limit-orders",

  summary:
    "Instead of paying the spread with market orders, a seller can post limit orders and wait to be filled. " +
    "She earns the depth $\\delta$ on every fill but risks not finishing. With fill rate $\\lambda e^{-\\kappa\\delta}$ " +
    "and a penalty $\\alpha$ per squared share left at $T$, the DPE linearises under $h = \\frac{1}{\\kappa}\\log\\omega$ " +
    "and has a closed form: a Poisson-type sum. The optimal depth falls as inventory rises and as the deadline nears.",

  sections: [
    {
      heading: "The model and its solution",
      blocks: [
        {
          kind: "prose",
          text:
            "With $H = x + qS + h(t, q)$, a fill at depth $\\delta$ earns $S + \\delta$ and moves inventory from $q$ to " +
            "$q - 1$. The DPE (with no running penalty) is",
        },
        {
          kind: "formula",
          latex: "\\partial_t h + \\lambda\\sup_{\\delta}\\left\\lbrace e^{-\\kappa\\delta}\\left(\\delta + h(t, q - 1) - h(t, q)\\right)\\right\\rbrace = 0, \\qquad h(T, q) = -\\alpha q^2",
        },
        {
          kind: "prose",
          text:
            "The supremum gives $\\delta^{*} = \\frac{1}{\\kappa} - [h(t, q - 1) - h(t, q)]$ and the value $\\frac{1}{\\kappa}e^{-1}e^{-\\kappa(h(q) - h(q - 1))}$. " +
            "Substituting $h = \\frac{1}{\\kappa}\\log\\omega$ turns the exponential non-linearity into a linear system " +
            "$\\partial_t\\omega(t, q) + \\tilde{\\lambda}\\,\\omega(t, q - 1) = 0$ with $\\tilde{\\lambda} = \\lambda e^{-1}$, solved one $q$ at a time from $\\omega(t, 0) = 1$:",
        },
        {
          kind: "formula",
          latex: "\\omega(t, q) = \\sum_{n=0}^{q} \\frac{\\left(\\tilde{\\lambda}(T - t)\\right)^n}{n!}\\,e^{-\\kappa\\alpha(q - n)^2}, \\qquad \\delta^{*}(t, q) = \\frac{1}{\\kappa}\\left[1 + \\log\\frac{\\omega(t, q)}{\\omega(t, q - 1)}\\right]",
          caption: "Each term weighs the chance of $n$ fills by the penalty on the $q - n$ shares left",
        },
      ],
    },

    {
      heading: "A worked example",
      blocks: [
        {
          kind: "example",
          title: "Depths for one and two shares",
          problem: "Take $\\kappa = 100$ per dollar, $\\alpha = 0.001$ (so $\\kappa\\alpha = 0.1$) and $\\tilde{\\lambda}(T - t) = 5$. Find the optimal depths with $1$ and $2$ shares left, and with $1$ share left at $t = T$.",
          steps: [
            "$\\omega_0 = 1$, $\\omega_1 = e^{-0.1} + 5 = 5.905$, $\\omega_2 = e^{-0.4} + 5e^{-0.1} + \\frac{25}{2} = 0.670 + 4.524 + 12.5 = 17.695$.",
            "$\\delta^{*}(1) = 0.01[1 + \\log 5.905] = 0.01 \\times 2.776 \\approx 2.78$ cents.",
            "$\\delta^{*}(2) = 0.01[1 + \\log(17.695/5.905)] = 0.01 \\times 2.097 \\approx 2.10$ cents.",
            "At $T$: $\\omega_1 = e^{-0.1}$, so $\\delta^{*} = 0.01[1 - 0.1] = 0.9$ cents.",
          ],
          answer: "More inventory means posting closer ($2.10 < 2.78$ cents) to be filled faster; as time runs out the depth falls toward $\\frac{1}{\\kappa}(1 - \\kappa\\alpha(2q - 1))$, which can turn negative for large $q$.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Reservation price plus a margin",
          text:
            "Her ask is $S + \\delta^{*} = \\left(S + h(q) - h(q - 1)\\right) + \\frac{1}{\\kappa}$. The bracket is her " +
            "reservation price — the price at which she is indifferent to selling one share — and $1/\\kappa$ is the " +
            "monopoly margin that the fill model allows. A negative depth means the reservation price is below the " +
            "midprice: she would rather sell now, which LOs cannot do and MOs can (next lesson).",
        },
      ],
    },

    {
      heading: "Utility, penalties and caveats",
      blocks: [
        {
          kind: "list",
          items: [
            "**Running penalty** $\\phi\\int Q_u^2\\,du$: adds $-\\kappa\\phi q^2\\omega$ to the $\\omega$ equation, making her post closer early. A depth $0.6$ cents lower raises the fill rate by $e^{0.6} \\approx 1.82$ with $\\kappa = 100$.",
            "**Exponential utility** $\\gamma$: the constant margin $\\frac{1}{\\kappa}$ becomes $\\frac{1}{\\gamma}\\log\\left(1 + \\frac{\\gamma}{\\kappa}\\right)$, which is smaller. With $\\gamma = 20$, $\\kappa = 100$: $0.912$ cents instead of $1$. As in Chapter 6, a CARA agent maps to a penalised risk-neutral one with an adjusted penalty.",
            "**Why it beats TWAP with MOs**: she earns the depth on each fill instead of paying the half-spread — on $5$ shares at $2$ cents versus paying $0.5$ cents, she is $12.5$ cents ahead.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Fills are not free of information",
          text:
            "The model assumes fills are independent of what the price does next, and that her order fills as " +
            "soon as an MO reaches its price. In reality LOs fill most often just before the price moves through " +
            "them (adverse selection), and queue position delays fills. Both make posting deep less attractive " +
            "than the model suggests.",
        },
      ],
    },
  ],

  references: [
    { source: "Cartea, Jaimungal & Penalva, Algorithmic and High-Frequency Trading", locator: "Ch. 8, Optimal Execution with Limit and Market Orders (§8.1–8.3)" },
  ],
};
