import type { WikiArticle } from "../types";

export const selectionVsSizingAttributionWiki: WikiArticle = {
  conceptId: "selection-vs-sizing-attribution",

  summary:
    "Idiosyncratic PnL is usually what a stock picker is paid for, yet factor attribution says nothing about where it " +
    "came from. Paleologo's decomposition splits a portfolio's realized information ratio exactly into selection (being " +
    "on the right side of bets), diversification (how evenly risk is spread) and sizing (whether bigger bets are better " +
    "bets). It mirrors the fundamental law of active management, but as an ex-post identity on actual positions, and it " +
    "gives concrete advice — most often, that a PM's sizing is costing them.",

  sections: [
    {
      heading: "The decomposition",
      blocks: [
        {
          kind: "formula",
          latex: "\\text{IR}_t = \\frac{\\tilde{\\mathbf{w}}_t^{\\top}\\tilde{\\boldsymbol{\\epsilon}}_t}{\\|\\tilde{\\mathbf{w}}_t\\|_2} = (\\text{selection})_t \\times (\\text{diversification})_t + (\\text{sizing})_t",
          caption: "$\\tilde{w}_i = \\sigma_i w_i$ are dollar-volatility positions and $\\tilde{\\epsilon}_i = \\frac{\\epsilon_i}{\\sigma_i}$ z-scored idiosyncratic returns; average $\\text{IR}_t$ over periods for the strategy's IR",
        },
        {
          kind: "definitions",
          items: [
            { term: "Selection", description: "$\\hat{\\mathbb{E}}\\left[\\tilde{\\epsilon}_i\\,\\text{sgn}(w_i)\\right]$: the average z-scored return in the direction of each bet. Z-scoring rewards being right, not owning volatile stocks." },
            { term: "Diversification", description: "$\\frac{\\|\\tilde{\\mathbf{w}}\\|_1}{\\|\\tilde{\\mathbf{w}}\\|_2} = \\frac{1}{\\sqrt{H}}$, between $1$ (one bet) and $\\sqrt{n}$ (equal risk); its square is the effective number of positions." },
            { term: "Sizing", description: "$\\frac{n\\,\\widehat{\\text{cov}}\\left(\\tilde{\\epsilon}_i\\,\\text{sgn}(w_i), |\\tilde{w}_i|\\right)}{\\|\\tilde{\\mathbf{w}}\\|_2}$: positive when larger bets are more often right; zero for equal sizes." },
          ],
        },
        {
          kind: "prose",
          text:
            "The proof is one line: $\\tilde{w}_i\\tilde{\\epsilon}_i = |\\tilde{w}_i|\\,s_i$ with $s_i = \\tilde{\\epsilon}_i\\,\\text{sgn}(w_i)$, " +
            "and $\\hat{\\mathbb{E}}[s|\\tilde{w}|] = \\hat{\\mathbb{E}}[s]\\hat{\\mathbb{E}}[|\\tilde{w}|] + \\widehat{\\text{cov}}(s, |\\tilde{w}|)$.",
        },
        {
          kind: "example",
          title: "Four positions",
          problem: "Dollar-volatility positions $[2, 2, 1, 1]$ (all long); z-scored idio returns $[1, 0.5, -1, 0]$.",
          steps: [
            "$\\|\\tilde{\\mathbf{w}}\\|_2 = \\sqrt{10} \\approx 3.162$; $\\text{IR}_t = \\frac{2 + 1 - 1 + 0}{3.162} \\approx 0.632$.",
            "Selection $= \\frac{1 + 0.5 - 1 + 0}{4} = 0.125$; diversification $= \\frac{6}{3.162} \\approx 1.897$; product $\\approx 0.237$.",
            "Sizing: $\\hat{\\mathbb{E}}[s|\\tilde{w}|] = 0.5$, $\\hat{\\mathbb{E}}[s]\\hat{\\mathbb{E}}[|\\tilde{w}|] = 0.1875$, covariance $0.3125$; sizing $= \\frac{4 \\times 0.3125}{3.162} \\approx 0.395$.",
          ],
          answer: "$0.237 + 0.395 = 0.632$: the big positions were the right ones, so sizing contributed most.",
        },
      ],
    },
    {
      heading: "What to do with it",
      blocks: [
        {
          kind: "list",
          items: [
            "**Diversify** — but notice the benefit is multiplied by selection: with no selection skill, breadth adds nothing. Equalizing existing positions is free; adding new names costs research and usually dilutes selection.",
            "**Improve selection** — selection is linear, so it splits into long versus short ($q_{\\text{long}}\\text{sel}_L + q_{\\text{short}}\\text{sel}_S$), sub-industries, themes, or earnings versus non-earnings periods, pinpointing where skill lives.",
            "**Fix sizing** — most PMs overestimate their sizing skill. Negative sizing: stop differentiating sizes; equal risk removes the drag and maximizes diversification. Positive sizing: concentrate in high-conviction names, but only until the loss in diversification offsets the gain.",
          ],
        },
        {
          kind: "example",
          title: "Equalizing positions",
          problem: "Selection $0.02$, diversification $6$, sizing $-0.04$. Equal sizing raises diversification to $10$ and zeroes sizing.",
          steps: [
            "Before: $0.02 \\times 6 - 0.04 = 0.08$ per period.",
            "After: $0.02 \\times 10 = 0.20$ per period.",
          ],
          answer: "The IR more than doubles without any new ideas.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Link to the fundamental law",
          text:
            "Selection plays the role of IC and diversification of $\\sqrt{N}$ — an effective breadth that knows a \\$999,901 " +
            "position and ninety-nine \\$1 positions are one bet, not a hundred. Robust portfolio construction and " +
            "covariance shrinkage, which push toward more equal positions, can be read as a bet that sizing skill is low.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Noise",
          text:
            "Sizing is a per-period cross-sectional covariance and is noisy with few positions; judge it over many periods, " +
            "and beware apparent sizing skill created by adding to winners after the fact.",
        },
      ],
    },
  ],

  references: [
    { source: "Paleologo, The Elements of Quantitative Investing", locator: "Ch. 13, §13.4 Selection vs. Sizing Attribution and §13.6 (Theorem 13.1)" },
    { source: "Bouchaud, Potters and Aguilar, “Missing information and asset allocation”, Risk (1997)", locator: "Lower bounds on effective diversification" },
  ],
};
