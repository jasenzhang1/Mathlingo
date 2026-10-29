import type { WikiArticle } from "../types";

export const kyleModelWiki: WikiArticle = {
  conceptId: "kyle-model",

  summary:
    "In Kyle’s model an insider knows the asset’s value $v$ and trades once, hiding her order among noise " +
    "traders. Market makers see only total order flow and set the price to its conditional expectation of $v$. " +
    "In equilibrium the price is linear in order flow, $S = \\mu + \\lambda(x + u)$, and Kyle’s lambda — the price " +
    "impact per share — is the price of the information that order flow might carry.",

  sections: [
    {
      heading: "Setup and equilibrium",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Value $v \\sim \\mathcal{N}(\\mu, \\sigma_v^2)$", description: "Known to the insider before she trades; revealed to everyone afterwards." },
            { term: "Noise flow $u \\sim \\mathcal{N}(0, \\sigma_u^2)$", description: "Orders from traders with no information, independent of $v$." },
            { term: "Insider order $x$", description: "Chosen knowing $v$ and the pricing rule." },
            { term: "Price $S = \\mathbb{E}[v \\mid x + u]$", description: "Competitive, risk-neutral market makers break even on average." },
          ],
        },
        {
          kind: "prose",
          text:
            "Given $S = \\mu + \\lambda(x + u)$, the insider maximises $\\mathbb{E}[(v - S)x \\mid v] = (v - \\mu)x - " +
            "\\lambda x^2$, so $x = \\beta(v - \\mu)$ with $\\beta = \\frac{1}{2\\lambda}$. Given that rule, the market makers’ " +
            "linear projection of $v$ on $x + u$ has slope",
        },
        {
          kind: "formula",
          latex: "\\lambda = \\frac{\\text{Cov}(v, x + u)}{\\text{Var}(x + u)} = \\frac{\\beta\\sigma_v^2}{\\beta^2\\sigma_v^2 + \\sigma_u^2}",
        },
        {
          kind: "prose",
          text: "The two conditions are a fixed point; solving them together gives the equilibrium.",
        },
        {
          kind: "formula",
          latex: "\\beta = \\frac{\\sigma_u}{\\sigma_v}, \\qquad \\lambda = \\frac{\\sigma_v}{2\\sigma_u}, \\qquad \\mathbb{E}[\\text{insider profit}] = \\frac{\\sigma_u\\sigma_v}{2}, \\qquad \\text{Var}(v \\mid x + u) = \\frac{\\sigma_v^2}{2}",
        },
      ],
    },

    {
      heading: "A worked example",
      blocks: [
        {
          kind: "example",
          title: "One round of trading",
          problem:
            "Take $\\mu = 50$, $\\sigma_v = 2$ and $\\sigma_u = 5{,}000$ shares. The true value is $v = 53$ and noise traders sell $2{,}500$ shares. Find $\\lambda$, the insider’s order, the price and her profit.",
          steps: [
            "$\\lambda = \\frac{2}{2 \\times 5{,}000} = 0.0002$ dollars per share; $\\beta = \\frac{5{,}000}{2} = 2{,}500$.",
            "Insider buys $x = 2{,}500 \\times (53 - 50) = 7{,}500$ shares. Total flow $7{,}500 - 2{,}500 = 5{,}000$.",
            "Price $S = 50 + 0.0002 \\times 5{,}000 = \\$51.00$.",
            "Profit $(53 - 51) \\times 7{,}500 = \\$15{,}000$. (Unconditionally she expects $\\frac{5{,}000 \\times 2}{2} = \\$5{,}000$.)",
          ],
          answer: "The price moves only a third of the way to $v$ this round; the insider profits because her order is partly disguised by noise.",
        },
      ],
    },

    {
      heading: "What lambda tells you",
      blocks: [
        {
          kind: "table",
          headers: ["Change", "Effect on $\\lambda$", "Effect on the insider"],
          rows: [
            ["More noise trading ($\\sigma_u$ up)", "Falls: order flow is less informative", "Trades more ($\\beta$ up) and earns more"],
            ["More value uncertainty ($\\sigma_v$ up)", "Rises in proportion", "Earns more; information is worth more"],
            ["Noise traders’ expected loss", "$\\lambda\\sigma_u^2$", "Equals the insider’s expected profit"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Who pays the insider",
          text:
            "Market makers break even, so the insider’s profit comes entirely from the noise traders, whose " +
            "expected loss $\\lambda\\sigma_u^2 = \\frac{\\sigma_u\\sigma_v}{2}$ matches it exactly. An uninformed " +
            "institution buying a large block also faces impact $\\lambda$ per share, because market makers " +
            "cannot tell it apart from an insider — which is why it should split the order.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Efficient, but not fully revealing",
          text:
            "The price uses all public information (order flow) efficiently — semi-strong efficiency — but it " +
            "reveals only half the variance of $v$. In the dynamic version, the insider trades gradually so that " +
            "her information is incorporated smoothly, and the price converges to $v$ only by the end.",
        },
      ],
    },
  ],

  references: [
    { source: "Cartea, Jaimungal & Penalva, Algorithmic and High-Frequency Trading", locator: "Ch. 2, A Primer on the Microstructure of Financial Markets (§2.2 Trading on an Informational Advantage)" },
  ],
};
