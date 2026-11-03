import type { WikiArticle } from "../types";

export const kyleModelWiki: WikiArticle = {
  conceptId: "kyle-model",

  summary: "Kyle’s model explains price impact through information rather than inventory. An insider who knows the asset’s value trades in a market with noise traders and competitive, risk-neutral market makers who see only total order flow. Market makers set the price equal to the expected value given order flow, which makes the price linear in order flow with slope $\\lambda$, Kyle’s lambda. The insider trades just enough to exploit her information while hiding among the noise, and in equilibrium half her information ends up in the price.",

  sections: [
    {
      heading: "Equilibrium",
      blocks: [
        {
          kind: "formula",
          latex: "x^{*} = \\beta(v - \\mu),\\quad S = \\mu + \\lambda(x + u),\\quad \\lambda = \\frac{\\sigma_v}{2\\sigma_u},\\quad \\beta = \\frac{\\sigma_u}{\\sigma_v}",
          caption: "$v \\sim \\mathcal{N}(\\mu, \\sigma_v^2)$ is the value, $u \\sim \\mathcal{N}(0, \\sigma_u^2)$ the noise traders’ net order.",
        },
        {
          kind: "prose",
          text: "Given a linear pricing rule, the insider maximises $x(v - \\mu) - \\lambda x^2$, so $x = (v - \\mu)/(2\\lambda)$. Given that strategy, market makers’ projection gives $\\lambda = \\beta\\sigma_v^2/(\\beta^2\\sigma_v^2 + \\sigma_u^2)$. Solving both gives the equilibrium.",
        },
        {
          kind: "example",
          title: "Numbers",
          problem: "Let $\\mu = 50$, $\\sigma_v = 4$ and $\\sigma_u = 1{,}000$ shares, and suppose $v = 53$ and noise traders sell $250$ shares.",
          answer: "Her expected profit given $v$ is $\\frac{\\beta}{2}(v - \\mu)^2 = 1{,}125$; unconditionally it is $\\sigma_u\\sigma_v/2 = 2{,}000$, exactly the noise traders’ expected loss $\\lambda\\sigma_u^2$.",
          steps: [
            "$\\lambda = 4/2{,}000 = 0.002$ and $\\beta = 250$.",
            "The insider buys $250 \\times 3 = 750$ shares; net flow is $500$.",
            "The price is $50 + 0.002 \\times 500 = \\$51$.",
          ],
        },
      ],
    },
    {
      heading: "What the model teaches",
      blocks: [
        {
          kind: "list",
          items: [
            "More noise trading ($\\sigma_u$) lowers $\\lambda$ and lets the insider trade more: camouflage.",
            "More value uncertainty ($\\sigma_v$) raises $\\lambda$: order flow is more likely to be informed.",
            "Prices are semi-strong efficient ($S = \\mathbb{E}[v \\mid x + u]$), but only half the prior variance is revealed.",
            "Market makers break even; noise traders pay for the insider’s profits.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why an uninformed trader still pays impact",
          text: "Market makers cannot tell an uninformed institutional order from the insider’s, so any net flow moves prices by $\\lambda$. This is the information-based justification for permanent price impact in the execution models.",
        },
      ],
    },
  ],

  references: [
    { source: "Cartea, Jaimungal & Penalva, Algorithmic and High-Frequency Trading (2015)", locator: "Ch. 2, §2.2 Trading on an informational advantage (Kyle 1985)" },
  ],
};
