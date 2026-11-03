import type { WikiArticle } from "../types";

export const marketMakingUtilityAndAdverseSelectionWiki: WikiArticle = {
  conceptId: "market-making-utility-and-adverse-selection",

  summary: "Two refinements of optimal market making. A utility-maximising market maker behaves like the penalised one with a shifted depth term, $\\frac{1}{\\gamma}\\log(1 + \\gamma/\\kappa)$ instead of $1/\\kappa$. More importantly, market orders carry information: if each MO moves the midprice, she must post further out by the expected jump to avoid losing on every fill; and if order flow drives a short-term drift (alpha), she shifts both quotes in its direction, quoting away from predicted moves.",

  sections: [
    {
      heading: "Utility",
      blocks: [
        {
          kind: "formula",
          latex: "\\delta^{\\pm*} = \\frac{1}{\\gamma}\\log\\left(1 + \\frac{\\gamma}{\\kappa}\\right) - \\left[g(t, q \\mp 1) - g(t, q)\\right]",
          caption: "The CARA market maker; as $\\gamma \\to 0$ the first term tends to $1/\\kappa$.",
        },
        {
          kind: "prose",
          text: "As in execution, the exponential ansatz maps the problem onto the penalised one with $\\phi = \\tfrac{1}{2}\\gamma\\sigma^2$ and adjusted fill parameters; the strategies coincide up to a constant shift in depths.",
        },
      ],
    },
    {
      heading: "Adverse selection",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "MOs that move the midprice", description: "Each buy (sell) MO shifts the mid up (down) by a random $\\varepsilon$; optimal depths shift out by $\\mathbb{E}[\\varepsilon]$, and with unequal buy and sell rates the optimal inventory is no longer zero." },
            { term: "Short-term alpha", description: "The midprice drift $\\alpha_t$ jumps with order flow and mean-reverts; with $\\alpha > 0$ she posts the ask deeper and the bid closer, and for large $|\\alpha|$ stops quoting one side." },
          ],
        },
        {
          kind: "example",
          title: "The cost of ignoring toxicity",
          problem: "She earns $1$ cent of depth per fill, but after her sell fills the mid rises by $1.4$ cents on average.",
          answer: "Toxicity must be priced into the quotes, exactly as Glosten–Milgrom predicts.",
          steps: [
            "Her expected marked-to-market P&L per fill is $1 - 1.4 = -0.4$ cents.",
            "Posting at $1/\\kappa + \\varepsilon = 1 + 0.4 = 1.4$ cents restores break-even per fill, before the inventory term.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Measuring it",
          text: "Compute each fill’s realised spread: depth minus the adverse midprice move over the next seconds. Near-zero or negative realised spreads, broken down by time and signal, reveal where quotes are too tight.",
        },
      ],
    },
  ],

  references: [
    { source: "Cartea, Jaimungal & Penalva, Algorithmic and High-Frequency Trading (2015)", locator: "Ch. 10, §10.3 Utility-maximising market maker, §10.4 Market making with adverse selection" },
  ],
};
