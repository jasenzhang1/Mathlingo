import type { WikiArticle } from "../types";

export const executionWithLimitAndMarketOrdersWiki: WikiArticle = {
  conceptId: "execution-with-limit-and-market-orders",

  summary:
    "A pure limit-order seller can fall behind and has no way to catch up. Allowing market orders fixes " +
    "that: she posts LOs most of the time and crosses the spread whenever being behind becomes too costly. " +
    "Each MO is an impulse — a discrete jump in inventory — so the problem is a quasi-variational inequality. " +
    "Its solution splits inventory–time space into an LO region and an MO region, and the MO region grows as " +
    "the deadline approaches.",

  sections: [
    {
      heading: "The quasi-variational inequality",
      blocks: [
        {
          kind: "prose",
          text:
            "With $H = x + qS + h(t, q)$, an MO sells one share at the bid $S - \\frac{\\Delta}{2}$ and changes the value by " +
            "$-\\frac{\\Delta}{2} + h(t, q - 1) - h(t, q)$. At every moment she either continues with LOs or sends an MO:",
        },
        {
          kind: "formula",
          latex: "\\max\\left\\lbrace \\partial_t h - \\phi q^2 + \\lambda\\sup_{\\delta}e^{-\\kappa\\delta}\\left(\\delta + h(t, q - 1) - h(t, q)\\right),\\;\\; -\\frac{\\Delta}{2} + h(t, q - 1) - h(t, q) \\right\\rbrace = 0",
          caption: "Continuation with an optimal LO, or an immediate MO",
        },
        {
          kind: "definitions",
          items: [
            { term: "LO region", description: "$h(t, q - 1) - h(t, q) < \\frac{\\Delta}{2}$: the first term is zero; post at $\\delta^{*} = \\frac{1}{\\kappa} - [h(t, q - 1) - h(t, q)]$." },
            { term: "MO region", description: "$h(t, q - 1) - h(t, q) \\ge \\frac{\\Delta}{2}$: one share less is worth more than the half-spread, so cross. With $h = \\frac{1}{\\kappa}\\log w$ this reads $w(q) \\le w(q - 1)e^{-\\kappa\\Delta/2}$." },
            { term: "Impulse control", description: "An MO moves inventory by a whole unit instantly; it cannot be described as a speed, so it enters as the obstacle in a QVI rather than inside the supremum." },
          ],
        },
      ],
    },

    {
      heading: "Reading the solution",
      blocks: [
        {
          kind: "list",
          items: [
            "The MO region sits at **high inventory and late times**. Holding time fixed, more shares push her into it; holding inventory fixed, less time left does too.",
            "If she lands in the MO region she sends MOs one after another until inventory falls into the LO region — e.g. from $10$ shares down to $6$ means $4$ MOs.",
            "Right after an MO, inventory is lower, so her LO depth rises: she becomes more patient.",
            "With a very small running penalty, she almost never crosses before the very end; MOs act as a last-minute clean-up.",
            "Just before $T$ the value can differ from the terminal condition $-\\alpha q^2$: she can still dump shares by MOs at cost $\\frac{\\Delta}{2}$ each, which is cheaper than the penalty when $\\alpha$ is large.",
          ],
        },
        {
          kind: "example",
          title: "Is mixing worth it?",
          problem: "Sell $10$ shares with a $2$-cent spread. Strategy A uses only MOs. Strategy B sells $7$ by LOs at an average depth of $1.2$ cents and $3$ by MOs. Compare revenue relative to the midprice.",
          steps: [
            "A: $10 \\times (-1) = -10$ cents.",
            "B: $7 \\times 1.2 - 3 \\times 1 = 8.4 - 3 = 5.4$ cents.",
          ],
          answer: "B is $15.4$ cents ahead. Each LO fill earns the depth instead of paying the half-spread; the MOs are the price of finishing on time.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The trade-off at the boundary",
          text:
            "Crossing costs $\\frac{\\Delta}{2}$ now. Waiting keeps the chance of earning $\\delta$ on an LO fill, but " +
            "raises the inventory penalty and the risk of ending with unsold shares. She crosses when the marginal " +
            "value of one fewer share, $h(q - 1) - h(q)$, exceeds the half-spread.",
        },
      ],
    },

    {
      heading: "Tracking a schedule and solving numerically",
      blocks: [
        {
          kind: "prose",
          text:
            "Desks often want child orders to stay near a benchmark schedule, such as TWAP, so that performance " +
            "is predictable. Replacing $\\phi q^2$ by $\\phi(q - \\bar{q}_t)^2$, with $\\bar{q}_t$ the target inventory, " +
            "penalises being ahead or behind. Under TWAP for $10$ shares over $60$ seconds, the target after $36$ " +
            "seconds is $10(1 - 36/60) = 4$ shares; being behind pushes her into the MO region, being ahead makes her post deeper.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Discretise time backward from $T$, with $h(T, q) = -\\alpha q^2$ on a grid of integer inventories.",
            "At each step, update $h$ by the explicit continuation step (the optimal-LO term).",
            "Then take the maximum with the MO value $h(t, q - 1) - \\frac{\\Delta}{2}$, recording where the MO wins — that is the MO region.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "What the model leaves out",
          text:
            "One LO at one depth, no queue position, fills uninformative about prices, MOs that do not move the " +
            "midprice. Adverse selection on LO fills would enlarge the MO region; MOs that signal intent suggest " +
            "spacing them out randomly.",
        },
      ],
    },
  ],

  references: [
    { source: "Cartea, Jaimungal & Penalva, Algorithmic and High-Frequency Trading", locator: "Ch. 8, Optimal Execution with Limit and Market Orders (§8.4–8.5)" },
  ],
};
