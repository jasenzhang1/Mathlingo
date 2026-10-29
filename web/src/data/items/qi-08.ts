import type { Item } from "../../lib/assessment/types";
import { m, mcq, num, short } from "./qi-shared";

/**
 * Quantitative Investing, part 8: mean-variance optimization, the fundamental
 * law of active management, and performance metrics (Paleologo, Ch. 8).
 * Forty questions per lesson, four at each level.
 */

// ---------------------------------------------------------------------------
// mean-variance-optimization
// ---------------------------------------------------------------------------
const MV = "mean-variance-optimization";
const meanVariance: Item[] = [
  // level 1
  mcq(m(MV, "recall-problem", "recall", 1, 15, "The simplest mean-variance problem maximizes expected PnL $\\boldsymbol{\\alpha}^{\\top}\\mathbf{w}$ subject to:"),
    "A volatility budget, $\\mathbf{w}^{\\top}\\boldsymbol{\\Omega}\\mathbf{w} \\le \\sigma^{2}$",
    [
      ["Weights summing to one", "mvp-budget", "That's a budget constraint, not the risk constraint here."],
      ["No constraint at all", "mvp-none", "Then the problem is unbounded."],
      ["Zero expected return", "mvp-zero", "That would be pointless."],
    ]),
  mcq(m(MV, "recall-solution", "recall", 1, 15, "The mean-variance optimal portfolio is proportional to:"),
    "$\\boldsymbol{\\Omega}^{-1}\\boldsymbol{\\alpha}$",
    [
      ["$\\boldsymbol{\\alpha}$", "sol-alpha", "That ignores risk and correlations."],
      ["$\\boldsymbol{\\Omega}\\boldsymbol{\\alpha}$", "sol-cov", "The precision matrix, not the covariance, appears."],
      ["$\\boldsymbol{\\Omega}^{-1}\\mathbf{e}$", "sol-minvar", "That's the minimum-variance portfolio."],
    ]),
  mcq(m(MV, "recall-sharpe", "recall", 1, 15, "The Sharpe ratio of the mean-variance optimal portfolio is:"),
    "$\\sqrt{\\boldsymbol{\\alpha}^{\\top}\\boldsymbol{\\Omega}^{-1}\\boldsymbol{\\alpha}}$",
    [
      ["$\\boldsymbol{\\alpha}^{\\top}\\boldsymbol{\\Omega}^{-1}\\boldsymbol{\\alpha}$", "sr-squared", "That's the squared Sharpe ratio."],
      ["$\\frac{\\boldsymbol{\\alpha}^{\\top}\\mathbf{e}}{n}$", "sr-mean", "That's an average alpha."],
      ["$\\|\\boldsymbol{\\alpha}\\|$", "sr-norm", "Risk must enter."],
    ]),
  mcq(m(MV, "recall-shadow", "recall", 1, 15, "The Lagrange multiplier on a constraint is called its shadow price because it measures:"),
    "How much the optimal objective improves per unit relaxation of the constraint",
    [
      ["The trading cost of the constraint", "shadow-cost", "It's a marginal value, not a trading cost."],
      ["The probability the constraint binds", "shadow-prob", "It's deterministic."],
      ["The number of assets affected", "shadow-count", "It's a rate of improvement."],
    ]),
  // level 2
  num(m(MV, "apply-sr-uncorr", "apply", 2, 25, "Two uncorrelated assets have Sharpe ratios $0.3$ and $0.4$. Find the Sharpe ratio of the optimal combination."), 0.5),
  num(m(MV, "apply-weight-one", "apply", 2, 25, "A single asset has expected excess return $0.06$ and variance $0.04$. With risk aversion $\\lambda = 3$ in $\\max_w w\\alpha - \\frac{\\lambda}{2}w^{2}\\sigma^{2}$, find $w$."), 0.5),
  num(m(MV, "apply-dollar-vol", "apply", 2, 20, "You hold $\\$10$M of a stock with $20\\%$ annual volatility. Find the position's dollar volatility in millions."), 2),
  mcq(m(MV, "apply-scale-alpha", "apply", 2, 20, "With a volatility budget, multiplying every alpha by $2$ changes the optimal portfolio by:"),
    "Nothing — the solution is homogeneous of degree zero in $\\boldsymbol{\\alpha}$",
    [
      ["Doubling it", "scale-double", "The volatility budget fixes the size."],
      ["Halving it", "scale-half", "Scale doesn't matter, only relative alphas."],
      ["Making it zero", "scale-zero", "It keeps the same shape."],
    ]),
  // level 3
  num(m(MV, "apply-diag-weights", "apply", 3, 30, "Uncorrelated assets with alphas $0.04$ and $0.02$ and variances $0.04$ and $0.01$. The optimal weights are proportional to $\\frac{\\alpha_i}{\\sigma_i^{2}}$. Find the ratio of asset 1's weight to asset 2's."), 0.5),
  num(m(MV, "apply-sr-two", "apply", 3, 30, "For the same two assets, find the optimal Sharpe ratio $\\sqrt{\\sum_i \\frac{\\alpha_i^{2}}{\\sigma_i^{2}}}$. Give $4$ decimal places."), 0.2828),
  num(m(MV, "apply-exp-return", "apply", 3, 25, "The optimal portfolio's expected return is $\\sigma\\sqrt{\\boldsymbol{\\alpha}^{\\top}\\boldsymbol{\\Omega}^{-1}\\boldsymbol{\\alpha}}$. With a volatility budget of $\\$10$M and optimal Sharpe $1.5$, find the expected PnL in millions."), 15),
  mcq(m(MV, "apply-cara", "apply", 3, 25, "For exponential utility $V(x) = -e^{-ax}$, the coefficient of absolute risk aversion is:"),
    "The constant $a$, independent of wealth",
    [
      ["$\\frac{1}{x}$", "cara-log", "That's log utility."],
      ["$a x$", "cara-linear", "CARA is constant."],
      ["$0$", "cara-zero", "Exponential utility is risk averse."],
    ]),
  // level 4
  num(m(MV, "apply-lambda", "apply", 4, 40, "In the penalized problem $\\max \\boldsymbol{\\alpha}^{\\top}\\mathbf{w} - \\frac{\\lambda}{2}\\mathbf{w}^{\\top}\\boldsymbol{\\Omega}\\mathbf{w}$, the solution meets a volatility budget $\\sigma$ when $\\lambda = \\frac{\\sqrt{\\boldsymbol{\\alpha}^{\\top}\\boldsymbol{\\Omega}^{-1}\\boldsymbol{\\alpha}}}{\\sigma}$. Find $\\lambda$ for optimal Sharpe $0.5$ and $\\sigma = 0.1$."), 5),
  num(m(MV, "apply-two-corr", "apply", 4, 45, "Two assets with Sharpe ratios $0.4$ and $0.4$ and correlation $0.5$. Find the optimal Sharpe $\\sqrt{\\mathbf{s}^{\\top}\\mathbf{C}^{-1}\\mathbf{s}}$. Give $4$ decimal places."), 0.4619),
  num(m(MV, "apply-vol-alloc", "apply", 4, 40, "Three uncorrelated assets have Sharpe ratios $0.2$, $0.4$ and $0.6$. Optimal dollar volatilities are proportional to Sharpe. With a total dollar-vol allocation summing to $\\$12$M, find the allocation to the third asset in millions."), 6),
  mcq(m(MV, "apply-log-utility", "apply", 4, 30, "With log utility, the quadratic approximation gives risk aversion $\\frac{1}{W_0}$, which implies:"),
    "Dollar positions grow with wealth — a constant fraction of wealth is invested",
    [
      ["Positions are independent of wealth", "logu-constant", "That's CARA."],
      ["The investor becomes more risk averse as wealth grows", "logu-more-averse", "Absolute risk aversion falls with wealth."],
      ["The investor never invests", "logu-never", "Log utility invests in positive-alpha assets."],
    ]),
  // level 5
  short(m(MV, "explain-alpha-scale", "explain", 5, 120, "Paleologo's Insight 8.1 says miscalibrating the overall size of alphas is not catastrophic. Explain under what conditions and why."),
    [
      ["conditions", "With a volatility constraint, a good risk model, and accurate relative alphas", 2, true],
      ["why", "The optimal portfolio $\\propto \\boldsymbol{\\Omega}^{-1}\\boldsymbol{\\alpha}$ is scaled to hit the volatility budget, so a common scale factor on alphas cancels", 2, true],
    ]),
  mcq(m(MV, "apply-partial-corr", "apply", 5, 30, "Off-diagonal entries of the precision matrix relate to partial correlations. In $\\mathbf{w} \\propto \\boldsymbol{\\Omega}^{-1}\\boldsymbol{\\alpha}$, a positive partial correlation between assets $i$ and $j$:"),
    "Reduces the position in $i$ due to $j$'s alpha, since the alphas partly duplicate each other",
    [
      ["Increases both positions", "partial-increase", "Shared information is discounted."],
      ["Has no effect", "partial-none", "Off-diagonal precision terms matter."],
      ["Makes the precision matrix singular", "partial-singular", "Not unless correlations are perfect."],
    ]),
  num(m(MV, "apply-fmp-sr", "apply", 5, 40, "Two uncorrelated factor portfolios have expected returns $0.03$ and $0.02$ and variances $0.01$ and $0.0025$. Find the optimal Sharpe ratio of trading them. Give $4$ decimal places."), 0.5),
  num(m(MV, "apply-dollar-vol-sharpe", "apply", 5, 35, "For uncorrelated assets, optimal dollar vols are proportional to Sharpe ratios. Assets with Sharpe $0.5$ and $0.25$ get dollar vols in what ratio (first over second)?"), 2),
  // level 6
  short(m(MV, "explain-equivalent", "explain", 6, 150, "Describe three equivalent formulations of mean-variance optimization and how they are linked."),
    [
      ["forms", "Maximize return subject to a variance budget; maximize return minus $\\frac{\\lambda}{2}$ variance (penalty); minimize variance subject to a return target", 2, true],
      ["link", "All give portfolios $\\propto \\boldsymbol{\\Omega}^{-1}\\boldsymbol{\\alpha}$; the penalty $\\lambda$ equals the constraint's shadow price, so pricing out a constraint at its shadow price reproduces the constrained solution", 2, true],
    ]),
  num(m(MV, "apply-two-asset-weights", "apply", 6, 45, "Two assets with unit volatility, Sharpe ratios $0.5$ and $0.2$, correlation $0.6$. Find the dollar-vol weight on asset 2, proportional to $s_2 - \\rho s_1$ (with asset 1's proportional to $s_1 - \\rho s_2$). Report $s_2 - \\rho s_1$."), -0.1),
  num(m(MV, "apply-min-var-weight", "apply", 6, 45, "Minimizing variance subject to $\\mathbf{b}^{\\top}\\mathbf{w} = 1$ gives $\\mathbf{w} = \\frac{\\boldsymbol{\\Omega}^{-1}\\mathbf{b}}{\\mathbf{b}^{\\top}\\boldsymbol{\\Omega}^{-1}\\mathbf{b}}$. For $\\boldsymbol{\\Omega} = \\text{diag}(0.04, 0.01)$ and $\\mathbf{b} = [1, 1]$, find $w_2$."), 0.8),
  mcq(m(MV, "apply-idio-space", "apply", 6, 35, "To build a portfolio that earns only orthogonal (idiosyncratic) alpha, you can:"),
    "Maximize expected return subject to a volatility budget and zero factor exposures, $\\mathbf{B}^{\\top}\\mathbf{w} = \\mathbf{0}$",
    [
      ["Hold the factor-mimicking portfolios", "idiospace-fmp", "Those carry factor exposure."],
      ["Maximize total return without constraints", "idiospace-free", "That loads on factors."],
      ["Hold the market portfolio", "idiospace-market", "That's pure factor exposure."],
    ]),
  // level 7
  short(m(MV, "derive-mvo", "explain", 7, 150, "Derive the solution of $\\max \\boldsymbol{\\alpha}^{\\top}\\mathbf{w}$ subject to $\\mathbf{w}^{\\top}\\boldsymbol{\\Omega}\\mathbf{w} \\le \\sigma^{2}$."),
    [
      ["fonc", "Lagrangian condition $\\boldsymbol{\\alpha} = 2\\mu\\boldsymbol{\\Omega}\\mathbf{w}$, so $\\mathbf{w} \\propto \\boldsymbol{\\Omega}^{-1}\\boldsymbol{\\alpha}$; the constraint binds", 2, true],
      ["scale", "Scaling to variance $\\sigma^{2}$ gives $\\mathbf{w} = \\frac{\\sigma}{\\sqrt{\\boldsymbol{\\alpha}^{\\top}\\boldsymbol{\\Omega}^{-1}\\boldsymbol{\\alpha}}}\\boldsymbol{\\Omega}^{-1}\\boldsymbol{\\alpha}$ and expected return $\\sigma\\sqrt{\\boldsymbol{\\alpha}^{\\top}\\boldsymbol{\\Omega}^{-1}\\boldsymbol{\\alpha}}$", 2, true],
    ]),
  num(m(MV, "apply-scaled-weight", "apply", 7, 45, "A single asset has $\\alpha = 0.05$ and $\\sigma = 0.25$. With a dollar volatility budget of $\\$5$M, find the position in millions."), 20),
  num(m(MV, "apply-two-corr-neg", "apply", 7, 45, "Two assets with Sharpe ratios $0.3$ and $0.3$ and correlation $-0.5$. Find the optimal Sharpe ratio. Give $4$ decimal places."), 0.6),
  mcq(m(MV, "apply-quadratic-converse", "apply", 7, 40, "Paleologo notes the converse result: if an investor chooses only on mean and variance, then their utility is:"),
    "Necessarily quadratic, which implies satiation — unsatisfying as a global theory but fine locally",
    [
      ["Necessarily logarithmic", "converse-log", "Mean-variance choice implies quadratic utility."],
      ["Necessarily exponential", "converse-exp", "Not in general."],
      ["Unrestricted", "converse-any", "The converse pins it down."],
    ]),
  // level 8
  short(m(MV, "explain-fmp-trading", "explain", 8, 150, "Explain how factor-mimicking portfolios let you treat factor investing as an $m$-asset mean-variance problem."),
    [
      ["fmp", "FMPs $\\mathbf{P} = \\boldsymbol{\\Omega}_\\epsilon^{-1}\\mathbf{B}(\\mathbf{B}^{\\top}\\boldsymbol{\\Omega}_\\epsilon^{-1}\\mathbf{B})^{-1}$ have unit exposure to one factor and none to others; their expected returns are the factor premia $\\boldsymbol{\\mu}_f$", 2, true],
      ["mvo", "Ignoring their small idiosyncratic risk, they are $m$ assets with covariance $\\boldsymbol{\\Omega}_f$, so the optimal factor allocation is $\\propto \\boldsymbol{\\Omega}_f^{-1}\\boldsymbol{\\mu}_f$", 2, true],
    ]),
  num(m(MV, "apply-mvp-two-corr", "apply", 8, 50, "Two assets have volatilities $0.2$ and $0.3$ and correlation $0.5$. Find the fully invested minimum-variance weight on asset 1. Give $4$ decimal places."), 0.8571),
  num(m(MV, "apply-three-sr", "apply", 8, 45, "Three uncorrelated strategies have Sharpe ratios $0.5$, $0.5$ and $1$. Find the optimal combined Sharpe ratio. Give $4$ decimal places."), 1.2247),
  mcq(m(MV, "apply-hedge-zero-alpha", "apply", 8, 40, "In a two-asset MVO, asset 2 has zero alpha but positive correlation with asset 1. The optimal position in asset 2 is:"),
    "Short — it costs nothing in expected return and hedges asset 1's risk",
    [
      ["Zero, since it has no alpha", "hedge-zero", "Its hedging value matters."],
      ["Long", "hedge-long", "With positive correlation, a short reduces risk."],
      ["Undefined", "hedge-undefined", "The solution is well defined."],
    ]),
  // level 9
  short(m(MV, "transfer-sharpe-objective", "transfer", 9, 180, "Why can't you simply maximize the Sharpe ratio $\\frac{\\boldsymbol{\\alpha}^{\\top}\\mathbf{w}}{\\sqrt{\\mathbf{w}^{\\top}\\boldsymbol{\\Omega}\\mathbf{w}}}$ directly, and how is that resolved?"),
    [
      ["homogeneous", "The Sharpe ratio is homogeneous of degree zero: every positive multiple of a portfolio has the same Sharpe, so the problem has no unique solution", 2, true],
      ["fix", "Fix the size by bounding volatility (or exposure); then maximizing return under a volatility budget gives the Sharpe-optimal direction at a definite scale", 2, true],
    ]),
  short(m(MV, "explain-vol-units", "explain", 9, 150, "Explain the dollar-volatility form of the MVO solution, $\\mathbf{v} \\propto \\mathbf{C}^{-1}\\mathbf{s}$, and why practitioners find it intuitive."),
    [
      ["form", "Writing $\\boldsymbol{\\Omega} = \\mathbf{V}\\mathbf{C}\\mathbf{V}$ with volatilities $\\mathbf{V}$, the dollar vols $\\mathbf{v} = \\mathbf{V}\\mathbf{w}$ are proportional to $\\mathbf{C}^{-1}\\mathbf{s}$, with $\\mathbf{s}$ the assets' Sharpe ratios", 2, true],
      ["intuition", "Sharpe ratios, correlations and dollar vols are more intuitive than covariances and returns; for uncorrelated assets, risk is allocated in proportion to Sharpe", 2, true],
    ]),
  num(m(MV, "apply-short-threshold", "apply", 9, 60, "Two assets with Sharpe ratios $0.6$ (asset 1) and $s_2$ (asset 2) have correlation $0.7$. Find the largest $s_2$ for which the optimal position in asset 2 is short."), 0.42),
  mcq(m(MV, "apply-singular", "apply", 9, 40, "If the covariance matrix used in MVO is singular, the optimizer:"),
    "Can find portfolios with zero estimated risk and take arbitrarily large positions in them",
    [
      ["Returns the equal-weight portfolio", "singular-equal", "Nothing forces that."],
      ["Always fails safely", "singular-safe", "It may return extreme positions."],
      ["Ignores the singular directions", "singular-ignore", "It exploits them."],
    ]),
  // level 10
  short(m(MV, "judge-single-period", "transfer", 10, 180, "Paleologo lists reasons why practitioners overwhelmingly use single-period optimization. Give them and argue whether they are good reasons."),
    [
      ["reasons", "Interpretability, computational tractability (solved in seconds), short investment horizons, and a lack of strong theoretical results for multi-period problems", 2, true],
      ["assessment", "Mostly sound; but transaction costs and alpha decay are intertemporal, which is why multi-period formulations (e.g. LQR-based) become worthwhile when impact matters", 2, true],
    ]),
  short(m(MV, "judge-buffett", "transfer", 10, 180, "Successful investors like Soros and Buffett never knew their portfolio volatility. Does that undermine mean-variance optimization?"),
    [
      ["no", "No: MVO is a tool for systematic managers who have quantified alphas and risk; discretionary investors manage risk in other ways", 2, true],
      ["role", "MVO's value is consistency — combining many forecasts with a risk model under explicit constraints — and its local quadratic approximation is reasonable when higher moments can't be estimated", 2, true],
    ]),
  num(m(MV, "apply-optimal-return-corr", "apply", 10, 90, "Two assets with volatilities $0.2$ and $0.1$, alphas $0.04$ and $0.03$, correlation $0.25$. Find the optimal Sharpe ratio $\\sqrt{\\boldsymbol{\\alpha}^{\\top}\\boldsymbol{\\Omega}^{-1}\\boldsymbol{\\alpha}}$. Give $4$ decimal places."), 0.3266),
  mcq(m(MV, "judge-moments", "transfer", 10, 60, "A portfolio manager says “the first two moments should be enough for everybody”. The best defence of this view is:"),
    "Higher moments of returns are too poorly estimated to optimize against, so a quadratic local approximation is the practical choice",
    [
      ["Returns are Gaussian", "moments-gaussian", "They're heavy-tailed."],
      ["Skewness and kurtosis don't matter to investors", "moments-dont-matter", "They do; they're just hard to estimate."],
      ["Utility is always quadratic", "moments-quadratic", "Only as an approximation."],
    ]),
];

// ---------------------------------------------------------------------------
// fundamental-law-of-active-management
// ---------------------------------------------------------------------------
const FL = "fundamental-law-of-active-management";
const fundamentalLaw: Item[] = [
  // level 1
  mcq(m(FL, "recall-law", "recall", 1, 15, "The fundamental law of active management states:"),
    "$\\text{IR} \\approx \\text{IC} \\times \\sqrt{N}$, information ratio equals information coefficient times the square root of breadth",
    [
      ["$\\text{IR} = \\text{IC} \\times N$", "law-linear", "Breadth enters under a square root."],
      ["$\\text{IR} = \\frac{\\text{IC}}{\\sqrt{N}}$", "law-inverse", "More independent bets help."],
      ["$\\text{IR} = \\text{IC}^{2}$", "law-square", "Breadth is missing."],
    ]),
  mcq(m(FL, "recall-ic", "recall", 1, 15, "The information coefficient is:"),
    "A cross-sectional correlation between forecast and realized (standardized) residual returns",
    [
      ["The portfolio's Sharpe ratio", "ic-sharpe", "That's the IR."],
      ["The number of stocks traded", "ic-breadth", "That's breadth."],
      ["The fraction of profitable days", "ic-hitrate", "That's a hit rate."],
    ]),
  mcq(m(FL, "recall-breadth", "recall", 1, 15, "Breadth in the fundamental law is:"),
    "The number of independent forecasts (bets) per period",
    [
      ["The number of portfolio managers", "breadth-pms", "It counts bets."],
      ["The gross market value", "breadth-gmv", "It's not a dollar amount."],
      ["The forecast horizon", "breadth-horizon", "Horizon affects bets per year, but breadth counts independent bets."],
    ]),
  mcq(m(FL, "recall-origin", "recall", 1, 15, "The fundamental law is due to:"),
    "Grinold (1989), developed with Kahn",
    [
      ["Markowitz", "origin-markowitz", "He introduced mean-variance."],
      ["Sharpe", "origin-sharpe", "He introduced the ratio and CAPM."],
      ["Kelly", "origin-kelly", "He introduced growth-optimal betting."],
    ]),
  // level 2
  num(m(FL, "apply-ir", "apply", 2, 20, "A signal has IC $0.05$ on $400$ independent stocks per period. Find the per-period IR."), 1),
  num(m(FL, "apply-ic-needed", "apply", 2, 25, "What IC gives a per-period IR of $0.5$ with $N = 100$ independent bets?"), 0.05),
  num(m(FL, "apply-breadth-needed", "apply", 2, 20, "With IC $0.02$, how many independent bets per period give IR $1$?"), 2500),
  mcq(m(FL, "apply-double-breadth", "apply", 2, 20, "Quadrupling breadth at constant IC multiplies the IR by:"),
    "$2$",
    [
      ["$4$", "double-four", "IR scales with $\\sqrt{N}$."],
      ["$\\sqrt{2}$", "double-root2", "$\\sqrt{4} = 2$."],
      ["$1$", "double-one", "Breadth helps."],
    ]),
  // level 3
  num(m(FL, "apply-annual", "apply", 3, 25, "A daily signal has per-period IR $0.1$. With $252$ independent periods a year, find the annualized IR. Give $2$ decimal places."), 1.59),
  num(m(FL, "apply-ic-time", "apply", 3, 30, "Annualized IR $\\approx \\text{IC}\\sqrt{NT}$. With IC $0.01$, $N = 1{,}000$ stocks and $T = 252$ periods a year, find it. Give $2$ decimal places."), 5.02),
  num(m(FL, "apply-monthly", "apply", 3, 30, "A monthly stock-selection signal has IC $0.04$ on $500$ stocks. Find its annualized IR with $T = 12$. Give $2$ decimal places."), 3.1),
  mcq(m(FL, "apply-skill-vs-breadth", "apply", 3, 25, "Which change raises IR the most for a signal with IC $0.02$ on $400$ stocks?"),
    "Raising IC to $0.04$ (IR doubles)",
    [
      ["Raising breadth to $800$", "svb-800", "That multiplies IR by only $\\sqrt{2}$."],
      ["Raising breadth to $1{,}000$", "svb-1000", "That multiplies IR by $\\sqrt{2.5} \\approx 1.58$."],
      ["Halving the number of stocks", "svb-half", "That lowers IR."],
    ]),
  // level 4
  num(m(FL, "apply-r2", "apply", 4, 35, "Since IC is a correlation, the expected $R^{2}$ of a cross-sectional regression of residual returns on alphas is about $\\text{IC}^{2}$. Find it for IC $0.05$."), 0.0025),
  num(m(FL, "apply-ir-from-r2", "apply", 4, 40, "A daily cross-sectional regression of residual returns on alphas has $R^{2} = 0.0001$ with $N = 2{,}000$ stocks. Using $\\text{IR} = \\sqrt{R^{2}NT}$, find the annualized IR with $T = 252$. Give $2$ decimal places."), 7.1),
  num(m(FL, "apply-n-to-double", "apply", 4, 35, "A manager covering $100$ stocks wants to double the IR without changing IC. How many stocks must she cover?"), 400),
  mcq(m(FL, "apply-whitening", "apply", 4, 30, "In practice the law is applied to the active (residual) part of a portfolio, where IC is the correlation between:"),
    "Alphas divided by idiosyncratic volatility and residual returns divided by idiosyncratic volatility",
    [
      ["Raw alphas and raw total returns", "whiten-raw", "Returns should be standardized and residual."],
      ["Portfolio weights and returns", "whiten-weights", "Weights depend on the optimizer."],
      ["Alphas and factor returns", "whiten-factors", "It's about residual returns."],
    ]),
  // level 5
  short(m(FL, "explain-law", "explain", 5, 120, "Explain the two drivers of the information ratio in the fundamental law and what each represents."),
    [
      ["ic", "IC measures skill: how well forecasts correlate with what actually happens", 2, true],
      ["breadth", "Breadth measures diversification: how many independent opportunities the skill is applied to; IR grows like its square root", 2, true],
    ]),
  num(m(FL, "apply-ic-degrade", "apply", 5, 35, "Extending coverage from $400$ to $1{,}600$ stocks lowers IC from $0.04$ to $0.025$. Find the new IR divided by the old IR."), 1.25),
  mcq(m(FL, "apply-correlated-bets", "apply", 5, 30, "Forecasts on $500$ stocks that all reflect a single sector view have effective breadth:"),
    "Much smaller than $500$, because the bets are not independent",
    [
      ["Exactly $500$", "corrbets-500", "Breadth counts independent bets."],
      ["Larger than $500$", "corrbets-larger", "Correlation reduces it."],
      ["Zero", "corrbets-zero", "At least one independent bet remains."],
    ]),
  num(m(FL, "apply-idea-velocity", "apply", 5, 35, "A manager makes $50$ independent forecasts per quarter with IC $0.1$. Find the annualized IR using $\\text{IC}\\sqrt{NT}$ with $T = 4$."), 1.4142),
  // level 6
  short(m(FL, "explain-ic-correlation", "explain", 6, 150, "Why is the IC in the fundamental law a correlation, and what transformation makes it one?"),
    [
      ["whiten", "Whiten alphas and returns with the covariance: $\\tilde{\\mathbf{r}} = \\boldsymbol{\\Omega}^{-1/2}\\mathbf{r}$ and $\\tilde{\\boldsymbol{\\alpha}} = \\boldsymbol{\\Omega}^{-1/2}\\boldsymbol{\\alpha}$", 2, true],
      ["correlation", "Then the realized-to-expected ratio becomes $\\frac{\\tilde{\\mathbf{r}}^{\\top}\\tilde{\\boldsymbol{\\alpha}}}{\\|\\tilde{\\mathbf{r}}\\|\\|\\tilde{\\boldsymbol{\\alpha}}\\|}$ times norms; with $\\mathbb{E}\\|\\tilde{\\mathbf{r}}\\|^{2} = n$, an uncentered cross-sectional correlation times $\\sqrt{n}$", 2, true],
    ]),
  num(m(FL, "apply-whitened-norm", "apply", 6, 35, "For $n = 400$ assets, $\\mathbb{E}[\\mathbf{r}^{\\top}\\boldsymbol{\\Omega}^{-1}\\mathbf{r}] = n$. Find $\\sqrt{\\mathbb{E}[\\mathbf{r}^{\\top}\\boldsymbol{\\Omega}^{-1}\\mathbf{r}]}$."), 20),
  num(m(FL, "apply-ic-from-ir", "apply", 6, 40, "A strategy trading $1{,}000$ stocks daily has an annualized IR of $3$. Find the implied IC with $T = 252$. Give $4$ decimal places."), 0.006),
  mcq(m(FL, "apply-law-caveat", "apply", 6, 35, "The fundamental law assumes, among other things, that:"),
    "The covariance matrix is accurate and forecasts are optimally combined (unconstrained MVO)",
    [
      ["Returns are uncorrelated with alphas", "caveat-uncorr", "Then IC would be zero."],
      ["Trading is free and constraints bind", "caveat-constraints", "Constraints reduce IR; the basic law ignores them."],
      ["IC is negative", "caveat-negative", "No."],
    ]),
  // level 7
  short(m(FL, "explain-transfer", "explain", 7, 150, "Constraints such as long-only reduce realized IR below the law's prediction. Explain the mechanism (the transfer coefficient)."),
    [
      ["mechanism", "Constraints stop the portfolio from matching the optimal unconstrained weights; the correlation between actual and optimal active weights (the transfer coefficient) falls below one", 2, true],
      ["effect", "The IR is scaled by that coefficient: $\\text{IR} \\approx \\text{TC} \\times \\text{IC} \\times \\sqrt{N}$", 2, true],
    ]),
  num(m(FL, "apply-tc", "apply", 7, 40, "A long-only constraint gives a transfer coefficient of $0.6$. With IC $0.05$ and $N = 400$, find the expected IR."), 0.6),
  num(m(FL, "apply-annual-from-monthly-ic", "apply", 7, 45, "A monthly signal on $900$ stocks has annual IR $2$. Find the monthly IC. Give $4$ decimal places."), 0.0192),
  mcq(m(FL, "apply-predictive-reg", "apply", 7, 40, "A cross-sectional predictive regression of residual returns on alphas has coefficient close to $1$ but tiny $R^{2}$. This means:"),
    "Alphas are well calibrated on average, but explain little of each period's dispersion — typical even for good signals",
    [
      ["The signal is useless", "predreg-useless", "Tiny $R^{2}$ is normal; IR can still be high with breadth."],
      ["Alphas are too large", "predreg-large", "A slope near one says scale is right."],
      ["Returns are predictable perfectly", "predreg-perfect", "That would need $R^{2} = 1$."],
    ]),
  // level 8
  short(m(FL, "derive-law", "explain", 8, 150, "Sketch the derivation of $\\text{IR} \\approx \\text{IC}\\sqrt{N}$ from the MVO portfolio $\\mathbf{w} \\propto \\boldsymbol{\\Omega}^{-1}\\hat{\\boldsymbol{\\alpha}}$ with an accurate covariance."),
    [
      ["return", "Realized expected PnL over predicted volatility is $\\frac{\\mathbb{E}[\\mathbf{r}^{\\top}\\boldsymbol{\\Omega}^{-1}\\hat{\\boldsymbol{\\alpha}}]}{\\sqrt{\\hat{\\boldsymbol{\\alpha}}^{\\top}\\boldsymbol{\\Omega}^{-1}\\hat{\\boldsymbol{\\alpha}}}}$", 2, true],
      ["whiten", "In whitened variables this is $\\text{IC} \\times \\sqrt{\\mathbb{E}\\|\\tilde{\\mathbf{r}}\\|^{2}} = \\text{IC}\\sqrt{n}$", 2, true],
    ]),
  num(m(FL, "apply-ic-noise", "apply", 8, 45, "A forecast equals true alpha plus independent noise of equal variance (in whitened units). If the true alpha's correlation with returns is $0.06$, find the forecast's IC. Give $4$ decimal places."), 0.0424),
  num(m(FL, "apply-combine-signals", "apply", 8, 50, "Two uncorrelated signals have IC $0.03$ and $0.04$ on the same stocks. Their optimally combined IC is about $\\sqrt{0.03^{2} + 0.04^{2}}$. Find it."), 0.05),
  mcq(m(FL, "apply-breadth-limit", "apply", 8, 40, "Paleologo notes that extending a forecast to more stocks “without degrading its predictive power” is:"),
    "Never the case in real life — IC usually falls as coverage widens",
    [
      ["Always possible", "breadthlim-always", "Skill rarely scales freely."],
      ["Irrelevant to IR", "breadthlim-irrelevant", "It's central to the trade-off."],
      ["Guaranteed by the law", "breadthlim-guaranteed", "The law assumes constant IC; reality doesn't."],
    ]),
  // level 9
  short(m(FL, "transfer-strategy-choice", "transfer", 9, 180, "Compare two managers: one makes concentrated bets on $20$ stocks with IC $0.15$, the other trades $2{,}000$ stocks with IC $0.02$. Use the law and discuss what it leaves out."),
    [
      ["compute", "IR ≈ $0.15\\sqrt{20} \\approx 0.67$ versus $0.02\\sqrt{2{,}000} \\approx 0.89$ per period: breadth favours the second", 2, true],
      ["caveats", "The law ignores costs (the broad strategy trades more), capacity, correlation among bets (effective breadth), and estimation error in IC", 2, true],
    ]),
  short(m(FL, "explain-time-breadth", "explain", 9, 150, "Why does trading more frequently raise annualized IR in the law, and why doesn't it in practice indefinitely?"),
    [
      ["law", "More independent periods $T$ per year multiply annual IR by $\\sqrt{T}$ (“idea velocity”)", 2, true],
      ["limits", "Shorter horizons need forecasts that are genuinely independent and still skilful; trading costs grow with turnover and eventually dominate", 2, true],
    ]),
  num(m(FL, "apply-concentrated", "apply", 9, 60, "A manager has IC $0.15$ on $20$ stocks with annual rebalancing. Another has IC $0.02$ on $2{,}000$ stocks rebalanced monthly. Find the ratio of the second's annual IR to the first's. Give $2$ decimal places."), 4.62),
  mcq(m(FL, "apply-tiny-ic", "apply", 9, 40, "An IC of $0.01$ sounds negligible. It can still support a large IR because:"),
    "Breadth across thousands of stocks and hundreds of periods multiplies it (e.g. $0.01\\sqrt{1{,}000 \\times 252} \\approx 5$)",
    [
      ["IC is measured in percent", "tinyic-percent", "It's a correlation."],
      ["Small ICs are always significant", "tinyic-significant", "Significance needs data."],
      ["The law ignores breadth", "tinyic-ignores", "Breadth is the point."],
    ]),
  // level 10
  short(m(FL, "judge-law-validity", "transfer", 10, 180, "Critically assess the fundamental law as a planning tool for a quant team."),
    [
      ["useful", "Useful: it shows that small, consistent edges applied broadly beat sporadic strong ones, and links IR to an interpretable ex-post statistic", 2, true],
      ["limits", "Limits: assumes an accurate risk model, independent bets and unconstrained optimization; ignores costs and capacity; IC is noisy and decays with breadth and over time", 2, true],
    ]),
  short(m(FL, "judge-diversify-signals", "transfer", 10, 180, "Explain, using the law, why combining many weak uncorrelated signals is a central activity of quant funds."),
    [
      ["ic", "Uncorrelated signals add skill: combined IC grows like the square root of the sum of squared ICs", 2, true],
      ["practice", "This raises IR without needing a single strong forecast; but signals are often correlated, and combining requires care to avoid overfitting", 2, true],
    ]),
  num(m(FL, "apply-many-signals", "apply", 10, 90, "Twenty-five uncorrelated signals each have IC $0.01$ on the same $1{,}000$ stocks, traded daily. Find the combined annualized IR, using combined $\\text{IC} = \\sqrt{\\sum \\text{IC}_k^{2}}$ and $T = 252$. Give $2$ decimal places."), 25.1),
  mcq(m(FL, "judge-ir-too-high", "transfer", 10, 60, "The calculation above gives an annualized IR above $25$, which no real fund achieves. The most important missing ingredient is:"),
    "Transaction costs and capacity limits, plus correlation among signals and decay of IC out of sample",
    [
      ["The law is algebraically wrong", "toohigh-wrong", "The algebra holds under its assumptions."],
      ["Daily trading is impossible", "toohigh-daily", "Daily trading is common."],
      ["IC can't be positive", "toohigh-positive", "It can."],
    ]),
];

// ---------------------------------------------------------------------------
// performance-metrics
// ---------------------------------------------------------------------------
const PM = "performance-metrics";
const performance: Item[] = [
  // level 1
  mcq(m(PM, "recall-sharpe", "recall", 1, 15, "The Sharpe ratio of a strategy is:"),
    "Expected (excess) return divided by volatility over the same horizon",
    [
      ["Return divided by maximum drawdown", "sharpe-calmar", "That's the Calmar ratio."],
      ["Volatility divided by return", "sharpe-inverse", "It's the reciprocal."],
      ["Return minus volatility", "sharpe-difference", "It's a ratio."],
    ]),
  mcq(m(PM, "recall-why-returns", "recall", 1, 15, "Returns, rather than dollar PnL, are used as a performance measure because they are:"),
    "Approximately stationary and independent of the amount invested, so periods and funds can be compared",
    [
      ["Always positive", "whyret-positive", "Returns can be negative."],
      ["Free of risk", "whyret-risk", "They carry risk."],
      ["Easier to manipulate", "whyret-manipulate", "Not a reason."],
    ]),
  mcq(m(PM, "recall-capacity", "recall", 1, 15, "A strategy's capacity can be defined as:"),
    "The largest expected PnL it can achieve while its Sharpe ratio stays above an acceptable level",
    [
      ["Its Sharpe ratio", "capacity-sharpe", "Capacity is about size."],
      ["Its current AUM", "capacity-aum", "Capacity is a limit, not the current size."],
      ["Its maximum drawdown", "capacity-drawdown", "That's a risk measure."],
    ]),
  mcq(m(PM, "recall-dimension", "recall", 1, 15, "For serially uncorrelated returns, the Sharpe ratio scales with the horizon $T$ as:"),
    "$\\sqrt{T}$",
    [
      ["$T$", "dim-linear", "Return scales with $T$, volatility with $\\sqrt{T}$."],
      ["$\\frac{1}{\\sqrt{T}}$", "dim-inverse", "Longer horizons raise the Sharpe."],
      ["It doesn't scale", "dim-constant", "It has dimension $[\\text{time}]^{-1/2}$."],
    ]),
  // level 2
  num(m(PM, "apply-annualize", "apply", 2, 20, "A strategy has a daily Sharpe ratio of $0.1$. Find its annualized Sharpe with $252$ days. Give $2$ decimal places."), 1.59),
  num(m(PM, "apply-sharpe", "apply", 2, 20, "A strategy earns $12\\%$ a year in excess of cash with $8\\%$ volatility. Find its Sharpe ratio."), 1.5),
  num(m(PM, "apply-monthly", "apply", 2, 20, "A monthly Sharpe of $0.5$, with $12$ months a year. Find the annualized Sharpe. Give $2$ decimal places."), 1.73),
  mcq(m(PM, "apply-sharpe-flaw", "apply", 2, 20, "A strategy with return $-5\\%$ and volatility $5\\%$ has Sharpe $-1$; one with return $-5\\%$ and volatility $10\\%$ has Sharpe $-0.5$. This illustrates that:"),
    "The Sharpe ratio can rank losing strategies counterintuitively",
    [
      ["The Sharpe ratio is always correct", "flaw-correct", "Ranking more volatile losers higher is odd."],
      ["Volatility doesn't matter", "flaw-vol", "It does."],
      ["Negative Sharpe ratios are impossible", "flaw-negative", "They're common."],
    ]),
  // level 3
  num(m(PM, "apply-se", "apply", 3, 25, "Lo's standard error of an estimated Sharpe ratio is $\\sqrt{\\frac{1 + \\text{SR}^{2}/2}{T}}$. Find it for an annual Sharpe of $1$ estimated from $T = 10$ years. Give $4$ decimal places."), 0.3873),
  num(m(PM, "apply-se-known", "apply", 3, 25, "If the volatility were known exactly, the standard error would be $\\frac{1}{\\sqrt{T}}$. Find it for $T = 10$ years. Give $4$ decimal places."), 0.3162),
  num(m(PM, "apply-dollar-pnl", "apply", 3, 25, "A strategy runs $\\$50$M of annual dollar volatility at a Sharpe of $1.2$. Find its expected annual PnL in millions."), 60),
  mcq(m(PM, "apply-t-stat", "apply", 3, 25, "For i.i.d. returns, the Sharpe ratio estimated over $T$ periods relates to the $t$-statistic of the mean return as:"),
    "$t \\approx \\widehat{\\text{SR}} \\times \\sqrt{T}$ (per-period Sharpe)",
    [
      ["$t = \\widehat{\\text{SR}}$", "tstat-equal", "The $t$-stat grows with the sample."],
      ["$t = \\frac{\\widehat{\\text{SR}}}{\\sqrt{T}}$", "tstat-inverse", "It multiplies by $\\sqrt{T}$."],
      ["They're unrelated", "tstat-unrelated", "They're closely related."],
    ]),
  // level 4
  num(m(PM, "apply-cantelli", "apply", 4, 40, "For any return distribution with annual Sharpe $\\text{SR}$, $P(\\text{loss beyond } L \\text{ standard deviations}) \\le \\frac{1}{1 + (L + \\text{SR})^{2}}$. Find the bound for $\\text{SR} = 3$ and $L = 2$. Give $4$ decimal places."), 0.0385),
  num(m(PM, "apply-gauss-loss", "apply", 4, 40, "Under Gaussian returns with Sharpe $3$, a loss of $2$ standard deviations means a return $5$ standard deviations below its mean. Find $P(Z < -5)$ in units of $10^{-7}$. Give $1$ decimal place."), 2.9),
  num(m(PM, "apply-years-sig", "apply", 4, 40, "How many years of data give a $t$-statistic of $2$ for a strategy with true annual Sharpe $0.5$?"), 16),
  mcq(m(PM, "apply-capacity-sharpe", "apply", 4, 30, "Why isn't capacity simply “Sharpe times the largest volatility you can run”?"),
    "Because Sharpe falls as size grows (trading costs rise), eventually reaching zero",
    [
      ["Because volatility can't be scaled", "capsr-vol", "It can, by sizing."],
      ["Because Sharpe rises with size", "capsr-rises", "It falls."],
      ["Because PnL is independent of size", "capsr-independent", "PnL depends on size."],
    ]),
  // level 5
  short(m(PM, "explain-sharpe-dims", "explain", 5, 120, "Explain the dimensions of return, variance, volatility and Sharpe ratio, and how to convert a daily Sharpe to an annual one."),
    [
      ["dims", "Return and variance scale linearly with time ($[\\text{time}]^{-1}$ per unit), volatility with its square root, so Sharpe has dimension $[\\text{time}]^{-1/2}$", 2, true],
      ["convert", "Annual Sharpe = daily Sharpe $\\times\\sqrt{252}$ (assuming serially uncorrelated returns)", 2, true],
    ]),
  num(m(PM, "apply-autocorr-se", "apply", 5, 40, "Positively autocorrelated daily returns inflate the variance of a $T$-day sum by about $1 + 2\\rho$. With $\\rho = 0.1$, by what factor is the naive annualized Sharpe overstated? Give $4$ decimal places."), 1.0954),
  mcq(m(PM, "apply-capacity-def", "apply", 5, 30, "An alternative definition of capacity bounds:"),
    "The expected return on GMV, not only the Sharpe ratio, from below",
    [
      ["The number of stocks", "capdef-stocks", "That's breadth."],
      ["The volatility from below", "capdef-vol", "Lower bounds on volatility are ill-advised."],
      ["The leverage from below", "capdef-leverage", "Not a capacity notion."],
    ]),
  num(m(PM, "apply-ci", "apply", 5, 40, "A strategy shows an annual Sharpe of $1.2$ over $5$ years. Using Lo's standard error, find the lower end of a two-standard-error interval. Give $2$ decimal places."), 0.03),
  // level 6
  short(m(PM, "explain-cantelli", "explain", 6, 150, "Why does Paleologo quote the distribution-free bound $\\frac{1}{1 + (L + \\text{SR})^{2}}$ on large losses, and what does it show compared with the Gaussian?"),
    [
      ["robust", "It holds for any return distribution with the given mean and variance (Cantelli's inequality), so it is robust to fat tails", 2, true],
      ["compare", "It can be many orders of magnitude larger than the Gaussian probability (e.g. $3.8\\%$ versus $2.9 \\times 10^{-7}$), showing how misleading normality is for tail losses", 2, true],
    ]),
  num(m(PM, "apply-loss-prob", "apply", 6, 40, "A strategy with annual Sharpe $2$ and annual dollar volatility $\\$20$M: bound the probability of losing more than $\\$40$M in a year with $\\frac{1}{1 + (L + \\text{SR})^{2}}$."), 0.0588),
  num(m(PM, "apply-sharpe-of-sum", "apply", 6, 40, "Two uncorrelated strategies each have Sharpe $1$ and equal volatility. Find the Sharpe of their equal-weighted sum. Give $4$ decimal places."), 1.4142),
  mcq(m(PM, "apply-se-sharpe-high", "apply", 6, 35, "For a fixed sample length, the standard error of an estimated Sharpe ratio is larger when:"),
    "The true Sharpe ratio is higher, through the $\\frac{\\text{SR}^{2}}{2}$ term",
    [
      ["The Sharpe ratio is zero", "sehigh-zero", "That's the smallest SE."],
      ["Volatility is known", "sehigh-known", "Known volatility reduces SE."],
      ["Returns are negatively autocorrelated", "sehigh-negative", "That reduces the SE of the mean."],
    ]),
  // level 7
  short(m(PM, "explain-volatility-justify", "explain", 7, 150, "Under what assumptions is volatility a justified risk measure for an investor maximizing expected utility?"),
    [
      ["approx", "If utility is well approximated by a second-order expansion around the expected payoff (mean-variance), or returns are elliptical (e.g. Gaussian), expected utility depends only on mean and variance", 2, true],
      ["caveat", "With fat tails and skew, higher moments matter, so volatility is a convenient but incomplete proxy", 2, true],
    ]),
  num(m(PM, "apply-capacity-calc", "apply", 7, 50, "A strategy's Sharpe falls with dollar volatility $v$ (in millions) as $\\text{SR}(v) = 2 - 0.02v$. Find the dollar volatility that maximizes expected PnL $v \\cdot \\text{SR}(v)$."), 50),
  num(m(PM, "apply-capacity-pnl", "apply", 7, 45, "For the same strategy, find the maximum expected PnL in millions."), 50),
  mcq(m(PM, "apply-capacity-threshold", "apply", 7, 40, "If the firm requires a Sharpe of at least $1.5$ for the strategy above, the capacity (largest allowed $v$) is:"),
    "$25$ million of dollar volatility",
    [
      ["$50$ million", "capthr-50", "At $v = 50$, Sharpe is only $1$."],
      ["$75$ million", "capthr-75", "Sharpe would be $0.5$."],
      ["Unlimited", "capthr-unlimited", "Sharpe declines with size."],
    ]),
  // level 8
  short(m(PM, "derive-se", "explain", 8, 150, "Explain the two terms in Lo's variance of the Sharpe estimator, $\\frac{1 + \\text{SR}^{2}/2}{T}$."),
    [
      ["mean", "The $1$ comes from estimating the mean return (as if volatility were known)", 2, true],
      ["vol", "The $\\frac{\\text{SR}^{2}}{2}$ comes from estimating the volatility in the denominator (delta method), which matters more when the Sharpe is high", 2, true],
    ]),
  num(m(PM, "apply-se-daily", "apply", 8, 45, "A daily Sharpe of $0.15$ estimated over $T = 750$ days: find the standard error of the annualized Sharpe ($\\times\\sqrt{252}$). Give $2$ decimal places."), 0.58),
  num(m(PM, "apply-scale-vol-mix", "apply", 8, 50, "Two uncorrelated strategies: A has Sharpe $1$ and volatility $\\$10$M, B has Sharpe $2$ and volatility $\\$10$M. Find the Sharpe of A + B. Give $4$ decimal places."), 2.1213),
  mcq(m(PM, "apply-optimal-mix", "apply", 8, 40, "For the two strategies above, the optimal mix allocates dollar volatility:"),
    "In proportion to their Sharpe ratios ($1 : 2$), giving Sharpe $\\sqrt{5} \\approx 2.24$",
    [
      ["Equally", "optmix-equal", "Equal vol gives $2.12$, less than optimal."],
      ["All to B", "optmix-allb", "Diversification helps: $\\sqrt{5} > 2$."],
      ["All to A", "optmix-alla", "A has the lower Sharpe."],
    ]),
  // level 9
  short(m(PM, "transfer-evaluate-manager", "transfer", 9, 180, "A manager shows a $3$-year Sharpe of $2$. How confident should you be that their true Sharpe exceeds $1$?"),
    [
      ["se", "SE ≈ $\\sqrt{\\frac{1 + 2}{3}} = 1$: the estimate is only about one standard error above $1$", 2, true],
      ["more", "So weak evidence; also consider selection (you're seeing a survivor), autocorrelation/illiquidity smoothing, and the number of managers screened", 2, true],
    ]),
  short(m(PM, "explain-metrics-together", "explain", 9, 150, "Why should expected return, volatility, Sharpe ratio and capacity be considered together rather than optimizing Sharpe alone?"),
    [
      ["sharpe-alone", "A high Sharpe on a tiny scale may produce negligible PnL; investors care about absolute returns and how much capital a strategy can absorb", 2, true],
      ["tradeoff", "Sharpe can be traded for capacity and return on GMV (constraints that raise return lower Sharpe); the right choice depends on the fund's goals", 2, true],
    ]),
  num(m(PM, "apply-years-distinguish", "apply", 9, 60, "How many years are needed to distinguish a Sharpe of $1$ from a Sharpe of $0.5$ at two standard errors, using SE $\\approx \\frac{1}{\\sqrt{Y}}$?"), 16),
  mcq(m(PM, "apply-smoothing", "apply", 9, 40, "A fund holding illiquid assets reports very smooth monthly returns and a Sharpe of $3$. The most likely issue is:"),
    "Stale or smoothed marks create positive autocorrelation, understating volatility and inflating the Sharpe",
    [
      ["Exceptional skill", "smooth-skill", "Smoothing is a more common explanation."],
      ["Negative autocorrelation", "smooth-negative", "Smoothing creates positive autocorrelation."],
      ["Too few assets", "smooth-few", "Not the main issue."],
    ]),
  // level 10
  short(m(PM, "judge-sharpe-limits", "transfer", 10, 180, "Argue for and against using the Sharpe ratio as the primary metric of a quant strategy."),
    [
      ["for", "For: scale-free, directly tied to MVO optimality and the fundamental law, comparable across strategies, related to a $t$-statistic", 2, true],
      ["against", "Against: ignores tails, skew and drawdowns, ranks losers oddly, is noisy to estimate, ignores capacity and absolute PnL, and can be inflated by smoothing", 2, true],
    ]),
  short(m(PM, "judge-capacity-plan", "transfer", 10, 180, "How would you estimate a new strategy's capacity before scaling it up?"),
    [
      ["model", "Combine its alpha (gross Sharpe) with a calibrated market-impact model to get net Sharpe and PnL as functions of size", 2, true],
      ["choose", "Find the size maximizing PnL, or the largest size keeping Sharpe or return on GMV above thresholds; validate gradually with live trading", 2, true],
    ]),
  num(m(PM, "apply-capacity-quadratic-cost", "apply", 10, 90, "Gross expected PnL scales linearly with size $x$ (in \\$100M units) as $3x$, and impact costs as $0.5x^{2}$ (both in millions). Find the size maximizing net PnL, in units of \\$100M."), 3),
  mcq(m(PM, "judge-chebyshev-use", "transfer", 10, 60, "A risk committee uses the distribution-free bound to set loss limits. The main drawback is that:"),
    "It is very conservative, so limits based on it may be far looser (or capital far larger) than realistic tails require",
    [
      ["It assumes normality", "cheb-normal", "It's distribution-free."],
      ["It ignores the Sharpe ratio", "cheb-sharpe", "The Sharpe enters."],
      ["It underestimates tail risk", "cheb-under", "It overestimates for most real distributions."],
    ]),
];

export const qi08Items: Item[] = [...meanVariance, ...fundamentalLaw, ...performance];
