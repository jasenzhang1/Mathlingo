import type { WikiArticle } from "../types";

export const multiperiodPortfolioOptimizationWiki: WikiArticle = {
  conceptId: "multiperiod-portfolio-optimization",

  summary:
    "Once trading is costly, today's trade affects tomorrow's portfolio, and a forecast that decays over days should be " +
    "traded differently from one that lasts months. The right formulation is multiperiod: maximize discounted expected " +
    "PnL net of a risk penalty and quadratic trading costs, with alphas that follow an AR(1). Following Baldacci, " +
    "Benveniste and Ritter, the solution is a linear partial-adjustment rule — move part of the way toward an " +
    "alpha-driven target each period — with a speed that involves a square root. It is a linear-quadratic regulator in " +
    "disguise; see that lesson and AR Models.",

  sections: [
    {
      heading: "The model",
      blocks: [
        {
          kind: "list",
          items: [
            "Alpha follows $\\boldsymbol{\\mu}_{t+1} = \\boldsymbol{\\Phi}\\boldsymbol{\\mu}_t + \\boldsymbol{\\epsilon}_{t+1}$; for a scalar $\\phi$, the autocorrelation is $\\phi^{s}$ and the decay time scale is $-\\frac{1}{\\log\\phi}$ ($9.5$ days for $\\phi = 0.9$).",
            "Returns have covariance $\\boldsymbol{\\Omega}$; risk aversion $\\kappa$.",
            "Trading $\\Delta\\mathbf{x}$ costs $\\frac{1}{2}\\Delta\\mathbf{x}^{\\top}\\mathbf{C}\\Delta\\mathbf{x}$ (quadratic temporary impact).",
            "Objective: discounted sum of $\\boldsymbol{\\mu}_t^{\\top}\\mathbf{x}_t - \\frac{\\kappa}{2}\\mathbf{x}_t^{\\top}\\boldsymbol{\\Omega}\\mathbf{x}_t - \\text{costs}$.",
          ],
        },
      ],
    },
    {
      heading: "The optimal policy",
      blocks: [
        {
          kind: "formula",
          latex: "\\text{single-period: } \\mathbf{x}_{t+1} \\approx (\\mathbf{I} - \\mathbf{C}^{-1}\\kappa\\boldsymbol{\\Omega})\\mathbf{x}_t + \\cdots \\qquad \\text{multiperiod: } \\mathbf{x}_{t+1} \\approx \\left(\\mathbf{I} - (\\mathbf{C}^{-1}\\kappa\\boldsymbol{\\Omega})^{1/2}\\right)\\mathbf{x}_t + \\cdots",
          caption: "Both keep most of the current portfolio and add an alpha term; the multiperiod speed has a square root",
        },
        {
          kind: "prose",
          text:
            "When costs are expensive relative to risk ($\\frac{\\kappa\\sigma^{2}}{c} = 0.01$, say), the myopic policy closes " +
            "about $1\\%$ of the gap per period and the multiperiod policy about $10\\%$: looking ahead, it knows that " +
            "spreading trades over many periods makes faster convergence affordable. As costs vanish, the policy jumps to " +
            "the single-period MVO portfolio $(\\kappa\\boldsymbol{\\Omega})^{-1}\\boldsymbol{\\mu}_t$ every period.",
        },
        {
          kind: "example",
          title: "Liquidating with no alpha",
          problem: "A position $x(0) = 100$, $\\kappa\\sigma^{2} = 0.0008$, cost coefficient $c = 0.08$, no forecast.",
          steps: [
            "Optimal path: $x(t) = e^{-\\gamma t}x(0)$ with $\\gamma = \\sqrt{\\frac{\\kappa\\sigma^{2}}{c}} = 0.1$ per day — a half-life of $6.9$ days.",
            "Trading cost $\\frac{c\\gamma x(0)^{2}}{2} = 40$; risk cost $\\frac{\\kappa\\sigma^{2}x(0)^{2}}{2\\gamma} = 40$.",
          ],
          answer: "At the optimal speed the two costs balance exactly. More risk aversion or volatility means faster liquidation; higher costs, slower.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Known future alpha",
          text:
            "With a known alpha spike at $t_0$, the optimal policy starts buying before $t_0$, peaks at $t_0$ and then " +
            "liquidates exponentially — the position is built from a discounted average of future targets, not today's.",
        },
      ],
    },
    {
      heading: "Signals that decay",
      blocks: [
        {
          kind: "prose",
          text:
            "With AR(1) alphas the target is an “aim” portfolio that weights current and expected future MVO portfolios by " +
            "alpha decay and trading speed. If an alpha decays like $e^{-t/\\tau}$ and the position builds like " +
            "$1 - e^{-\\gamma t}$, the captured fraction of the alpha is $\\frac{\\gamma\\tau}{1 + \\gamma\\tau}$: slow signals " +
            "are cheap to capture, fast signals must be traded quickly and expensively — or used only to time trades " +
            "already happening for slow ones.",
        },
        {
          kind: "example",
          title: "How fast to trade a decaying signal",
          problem: "Alpha worth $A = 1$ decays with $\\tau = 5$ days; trading at speed $\\gamma$ costs $\\frac{c\\gamma}{2}$ with $c = 2$. Maximize $\\frac{\\gamma\\tau}{1 + \\gamma\\tau} - \\gamma$.",
          steps: [
            "Derivative: $\\frac{\\tau}{(1 + \\gamma\\tau)^{2}} = 1$, so $1 + 5\\gamma = \\sqrt{5}$.",
          ],
          answer: "$\\gamma = \\frac{\\sqrt{5} - 1}{5} \\approx 0.25$ per day: capture about $55\\%$ of the alpha, pay about a quarter of it in costs.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Implementation",
          text:
            "For thousands of stocks, assume diagonal (idio-space) costs and per-signal decay, compute aim portfolios and " +
            "partial-adjustment rates in closed form, then use a single-period optimizer around the aim to enforce " +
            "constraints. A hard turnover limit is a crude substitute: it ignores which trades are cheap or valuable.",
        },
      ],
    },
  ],

  references: [
    { source: "Paleologo, The Elements of Quantitative Investing", locator: "Ch. 10, §10.2–10.3 Multiperiod Optimization and Baldacci–Benveniste–Ritter (Procedure 10.1)" },
    { source: "Gârleanu and Pedersen, “Dynamic Trading with Predictable Returns and Transaction Costs”, Journal of Finance (2013)", locator: "Aim portfolios and partial adjustment" },
    { source: "Almgren and Chriss, “Optimal Execution of Portfolio Transactions”, Journal of Risk (2000)", locator: "Optimal liquidation" },
  ],
};
