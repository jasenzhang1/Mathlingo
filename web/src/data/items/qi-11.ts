import type { Item } from "../../lib/assessment/types";
import { m, mcq, num, short } from "./qi-shared";

/**
 * Quantitative Investing, part 11: hedging — beta hedges, factor hedging with
 * mimicking portfolios, time-series betas with estimation error, and
 * mimicking portfolios of non-tradable series (Paleologo, Ch. 11). Forty
 * questions per lesson, four at each level.
 */

// ---------------------------------------------------------------------------
// factor-hedging
// ---------------------------------------------------------------------------
const FH = "factor-hedging";
const factorHedging: Item[] = [
  // level 1
  mcq(m(FH, "recall-hedge", "recall", 1, 15, "Hedging is:"),
    "Reducing a portfolio's risk by adding positions whose returns are negatively correlated with it",
    [
      ["Increasing expected return", "hedge-return", "Hedges usually cost or are neutral in return."],
      ["Selling all positions", "hedge-sell", "That's liquidation."],
      ["Diversifying across many stocks", "hedge-diversify", "Diversification reduces idio risk; hedging targets specific exposures."],
    ]),
  mcq(m(FH, "recall-ratio", "recall", 1, 15, "The optimal single-instrument hedge ratio $\\left|\\frac{x_h}{x_c}\\right|$ (zero-return hedge) equals:"),
    "The beta of the core portfolio's return on the hedge's return",
    [
      ["The correlation between them", "ratio-corr", "Beta scales correlation by $\\frac{\\sigma_c}{\\sigma_h}$."],
      ["$1$ always", "ratio-one", "Only if beta is one."],
      ["The ratio of their expected returns", "ratio-returns", "The hedge's expected return is assumed zero."],
    ]),
  mcq(m(FH, "recall-residual", "recall", 1, 15, "After an optimal beta hedge, the core portfolio's variance is multiplied by:"),
    "$1 - \\rho^{2}$",
    [
      ["$1 - \\rho$", "residual-linear", "Variance falls by $\\rho^{2}$."],
      ["$\\rho^{2}$", "residual-rho2", "That's the fraction removed."],
      ["$0$", "residual-zero", "Only if $|\\rho| = 1$."],
    ]),
  mcq(m(FH, "recall-fmp-hedge", "recall", 1, 15, "To remove a core portfolio's factor exposures $\\mathbf{b}_c$ with factor-mimicking portfolios $\\mathbf{P}$, the naive procedure buys:"),
    "$-\\mathbf{P}\\mathbf{b}_c$",
    [
      ["$\\mathbf{P}\\mathbf{b}_c$", "fmphedge-sign", "That doubles the exposure."],
      ["$-\\mathbf{b}_c$ shares of every stock", "fmphedge-shares", "Exposures must be mapped through FMPs."],
      ["The market index only", "fmphedge-market", "That hedges only market exposure."],
    ]),
  // level 2
  num(m(FH, "apply-beta", "apply", 2, 20, "A core portfolio has volatility $20\\%$, a hedge has volatility $16\\%$, and their correlation is $0.8$. Find the beta of the core on the hedge."), 1),
  num(m(FH, "apply-hedged-vol", "apply", 2, 25, "A core with volatility $20\\%$ is optimally hedged with an instrument of correlation $0.8$. Find the hedged volatility in percent."), 12),
  num(m(FH, "apply-hedge-size", "apply", 2, 20, "A $\\$10$M core has beta $1.2$ to an index future. Find the hedge position in millions (negative for short)."), -12),
  mcq(m(FH, "apply-assumptions", "apply", 2, 20, "Which is $\\textbf{NOT}$ an assumption of the simple beta hedge?"),
    "The hedge instrument has a large positive expected return",
    [
      ["Beta is estimated accurately", "assume-beta", "That's assumed."],
      ["Trading costs are negligible", "assume-cost", "That's assumed."],
      ["A single hedging instrument", "assume-single", "That's assumed."],
    ]),
  // level 3
  num(m(FH, "apply-sharpe-gain", "apply", 3, 25, "Optimal hedging with correlation $0.8$ multiplies the Sharpe ratio (zero-return hedge) by $\\frac{1}{\\sqrt{1 - \\rho^{2}}}$. Find the multiplier. Give $4$ decimal places."), 1.6667),
  num(m(FH, "apply-model-beta", "apply", 3, 30, "Using a covariance model, the beta of core $\\mathbf{w}_c$ to hedge $\\mathbf{w}_h$ is $\\frac{\\mathbf{w}_h^{\\top}\\boldsymbol{\\Omega}\\mathbf{w}_c}{\\mathbf{w}_h^{\\top}\\boldsymbol{\\Omega}\\mathbf{w}_h}$. If the covariance of their returns is $0.03$ and the hedge's variance is $0.025$, find beta."), 1.2),
  num(m(FH, "apply-corr-half", "apply", 3, 25, "A hedge with correlation $0.5$ removes what fraction of the core's variance?"), 0.25),
  mcq(m(FH, "apply-when-hedge", "apply", 3, 25, "A situation where hedging is needed even with a good risk model is:"),
    "The core portfolio comes from independent discretionary managers whose combined factor exposures nobody controls",
    [
      ["The optimizer already controls all exposures", "when-optimizer", "Then hedging is built in."],
      ["The portfolio has no factor exposure", "when-none", "Nothing to hedge."],
      ["The hedge has higher alpha than the core", "when-alpha", "That's an investment, not a hedge."],
    ]),
  // level 4
  num(m(FH, "apply-partial", "apply", 4, 40, "One factor: variance $\\sigma_f^{2} = 0.04$; the mimicking portfolio adds idiosyncratic variance $m = 0.01$ per unit. Minimizing $(b + x)^{2}\\sigma_f^{2} + x^{2}m$ gives the hedge fraction $\\frac{\\sigma_f^{2}}{\\sigma_f^{2} + m}$. Find it."), 0.8),
  num(m(FH, "apply-partial-var", "apply", 4, 40, "With $b = 1$ and the optimal partial hedge, the remaining variance is $\\frac{b^{2}\\sigma_f^{2}m}{\\sigma_f^{2} + m}$. Find it with $\\sigma_f^{2} = 0.04$, $m = 0.01$."), 0.008),
  num(m(FH, "apply-full-var", "apply", 4, 35, "With $b = 1$, a full hedge $x = -1$ leaves variance $m$. Find it with $m = 0.01$, and compare with the partial hedge's $0.008$. Report the full hedge's variance."), 0.01),
  mcq(m(FH, "apply-partial-why", "apply", 4, 30, "The optimal hedge removes less than all the factor exposure because:"),
    "Each unit of mimicking portfolio adds idiosyncratic risk, so the last bit of exposure isn't worth hedging",
    [
      ["Factors have negative returns", "partialwhy-negative", "Even with zero returns, partial hedging is optimal."],
      ["The optimizer is approximate", "partialwhy-approx", "It's exactly optimal."],
      ["Hedging always increases risk", "partialwhy-increase", "It reduces risk overall."],
    ]),
  // level 5
  short(m(FH, "explain-priced", "explain", 5, 120, "Why can hedging a priced factor (one with positive expected return) be counterproductive?"),
    [
      ["cost", "Hedging removes the factor's expected return along with its risk, lowering expected PnL", 2, true],
      ["tradeoff", "If the factor's Sharpe is decent, the volatility reduction may not compensate for the lost PnL; the optimization should weigh both", 2, true],
    ]),
  num(m(FH, "apply-priced-cost", "apply", 5, 35, "A portfolio has $\\$20$M exposure to a value factor with expected return $3\\%$ a year. Fully hedging it gives up how much expected PnL, in millions?"), 0.6),
  num(m(FH, "apply-two-factor-hedge", "apply", 5, 40, "Core exposures $\\mathbf{b}_c = [2, -1]$ (millions). Using unit-exposure factor-mimicking portfolios, how many millions of the second FMP do you buy for a full hedge?"), 1),
  mcq(m(FH, "apply-cost-tradeoff", "apply", 5, 30, "Including trading costs in the hedging optimization means:"),
    "Hedging less (or more slowly) when the hedge is expensive to trade",
    [
      ["Always hedging fully", "costtrade-full", "Costs reduce the optimal hedge."],
      ["Never hedging", "costtrade-never", "Cheap hedges are still worth it."],
      ["Hedging more", "costtrade-more", "Costs reduce trading."],
    ]),
  // level 6
  short(m(FH, "derive-partial", "explain", 6, 150, "Derive the optimal factor hedge $\\mathbf{x}$ (in factor-exposure units) that minimizes $(\\mathbf{b}_c + \\mathbf{x})^{\\top}\\boldsymbol{\\Omega}_f(\\mathbf{b}_c + \\mathbf{x}) + \\mathbf{x}^{\\top}\\mathbf{M}\\mathbf{x}$, with $\\mathbf{M} = (\\mathbf{B}^{\\top}\\boldsymbol{\\Omega}_\\epsilon^{-1}\\mathbf{B})^{-1}$ the FMPs' idiosyncratic covariance."),
    [
      ["foc", "First-order condition: $\\boldsymbol{\\Omega}_f(\\mathbf{b}_c + \\mathbf{x}) + \\mathbf{M}\\mathbf{x} = \\mathbf{0}$", 2, true],
      ["solve", "$\\mathbf{x} = -(\\boldsymbol{\\Omega}_f + \\mathbf{M})^{-1}\\boldsymbol{\\Omega}_f\\mathbf{b}_c$: a shrunk version of the full hedge $-\\mathbf{b}_c$, approaching it as $\\mathbf{M} \\to \\mathbf{0}$", 2, true],
    ]),
  num(m(FH, "apply-hedge-small-m", "apply", 6, 40, "With $\\sigma_f^{2} = 0.04$ and a well-diversified FMP ($m = 0.0004$), find the hedge fraction $\\frac{\\sigma_f^{2}}{\\sigma_f^{2} + m}$. Give $4$ decimal places."), 0.9901),
  num(m(FH, "apply-hedge-vol-reduction", "apply", 6, 40, "A core has $\\$50$M of market exposure; market volatility is $16\\%$. Find the dollar volatility removed by a full market hedge, in millions."), 8),
  mcq(m(FH, "apply-intraday", "apply", 6, 35, "Simple beta hedging is typically done with:"),
    "A single liquid, cheap instrument with negligible expected return (e.g. an index future), intraday or at end of day",
    [
      ["Illiquid single stocks", "intraday-illiquid", "Hedges should be liquid."],
      ["Options with high premia", "intraday-options", "Not the standard beta hedge."],
      ["The core portfolio itself", "intraday-core", "That's just reducing size."],
    ]),
  // level 7
  short(m(FH, "explain-orthogonal-hedge", "explain", 7, 150, "Why must the hedge's own orthogonal (idiosyncratic) alpha be considered, especially for stock-selection strategies?"),
    [
      ["exposure", "The hedge portfolio holds stocks, so it carries orthogonal alpha exposure, possibly opposite to the core's", 2, true],
      ["damage", "If the strategy's profits come from orthogonal alpha, a hedge that shorts the same stocks cancels part of it; the optimization should include $\\boldsymbol{\\alpha}_\\perp$", 2, true],
    ]),
  num(m(FH, "apply-two-instrument", "apply", 7, 50, "Two uncorrelated hedges with variances $0.04$ and $0.09$; the core's covariances with them are $0.02$ and $0.045$. Find the optimal position in the second hedge per unit of core (minimizing variance). Give $4$ decimal places."), -0.5),
  num(m(FH, "apply-partial-sharpe", "apply", 7, 50, "A core has variance $0.05$ (of which $0.04$ is factor) and expected return $0.06$; the factor has zero premium. A full hedge with a FMP adding variance $0.002$ gives new variance $0.01 + 0.002$. Find the hedged Sharpe ratio. Give $4$ decimal places."), 0.5477),
  mcq(m(FH, "apply-unpriced", "apply", 7, 40, "Factors with zero expected return are called:"),
    "Unpriced factors — pure risk with no reward, prime candidates for hedging",
    [
      ["Priced factors", "unpriced-priced", "Priced factors earn a premium."],
      ["Idiosyncratic factors", "unpriced-idio", "They're common factors."],
      ["Alpha factors", "unpriced-alpha", "They have no alpha."],
    ]),
  // level 8
  short(m(FH, "explain-risk-aversion", "explain", 8, 150, "In the full hedging optimization, why does the risk-aversion parameter matter, while in the simple beta hedge it doesn't?"),
    [
      ["simple", "With no costs, no expected factor returns and no added idio risk, hedging is a free lunch: reduce variance fully regardless of risk preference", 2, true],
      ["full", "With costs, factor premia and added idiosyncratic risk, hedging trades volatility against expected PnL; risk aversion picks the operating point on that frontier", 2, true],
    ]),
  num(m(FH, "apply-multi-shrink", "apply", 8, 50, "Two uncorrelated factors with variances $0.04$ and $0.01$; FMP idiosyncratic variances $0.01$ and $0.01$. Core exposures $[1, 1]$. Find the optimal hedge in factor 2 (per-factor formula $-\\frac{\\sigma_{f,k}^{2}}{\\sigma_{f,k}^{2} + m_k}b_k$)."), -0.5),
  num(m(FH, "apply-hedge-cost-quad", "apply", 8, 50, "Hedging with quadratic cost: minimize $(1 + x)^{2}(0.04) + cx^{2}$ with $c = 0.04$. Find $x$."), -0.5),
  mcq(m(FH, "apply-multiperiod-hedge", "apply", 8, 40, "With quadratic trading costs, the hedging problem across many periods becomes:"),
    "A multiperiod (LQR-type) problem, solvable with the same partial-adjustment policy as impact-aware portfolio optimization",
    [
      ["Impossible to solve", "mphedge-impossible", "It's tractable."],
      ["A single-period problem", "mphedge-single", "Costs link periods."],
      ["Independent of costs", "mphedge-independent", "Costs drive the trading speed."],
    ]),
  // level 9
  short(m(FH, "transfer-pod-hedge", "transfer", 9, 180, "A firm runs $20$ independent stock-picking pods. Design a central hedging process."),
    [
      ["measure", "Aggregate the pods' positions, compute total factor exposures with the risk model, and decide which factors are unwanted (unpriced) risk", 2, true],
      ["hedge", "Hedge with liquid instruments or FMPs via an optimization including FMP idio risk, factor premia, hedge alpha and trading costs; rebalance gradually", 2, true],
    ]),
  short(m(FH, "explain-not-free", "explain", 9, 150, "List the reasons why perfect factor neutralization is usually not optimal."),
    [
      ["reasons", "Hedging adds idiosyncratic risk from the FMPs, costs money to trade, gives up premia of priced factors, and may cancel the core's orthogonal alpha", 2, true],
      ["result", "So the optimal hedge is partial, balancing variance reduction against these costs", 2, true],
    ]),
  num(m(FH, "apply-total-variance", "apply", 9, 60, "Core: factor exposure $b = 2$, factor variance $0.01$, idiosyncratic variance $0.02$. FMP adds $m = 0.0025$ per unit squared. Find the total variance after the optimal partial hedge. Give $4$ decimal places."), 0.028),
  mcq(m(FH, "apply-hedge-concentrated", "apply", 9, 40, "Hedging a concentrated $5$-stock portfolio's market beta with an index future mostly:"),
    "Removes market risk but leaves the large idiosyncratic risk untouched",
    [
      ["Removes all risk", "conc-all", "Idio risk remains."],
      ["Increases idiosyncratic risk", "conc-increase", "The future adds little idio risk."],
      ["Has no effect", "conc-none", "Market risk is removed."],
    ]),
  // level 10
  short(m(FH, "judge-hedge-everything", "transfer", 10, 180, "A risk manager wants every factor exposure hedged to zero. Argue for a better policy."),
    [
      ["issues", "Full neutralization adds FMP idio risk and costs, sacrifices premia of priced factors and possibly orthogonal alpha, and chases noisy exposures", 2, true],
      ["policy", "Hedge unpriced, large exposures; tolerate small or priced ones; set limits on factor risk and use an optimization with costs and risk aversion", 2, true],
    ]),
  short(m(FH, "judge-beta-instability", "transfer", 10, 180, "The beta of your portfolio to the index future swings a lot from week to week. What are the risks and remedies?"),
    [
      ["risk", "Unstable betas mean the hedge is often wrong-sized, adding noise; frequent re-hedging costs money", 2, true],
      ["remedy", "Use model-based betas (factor model) or shrunk time-series betas, rebalance with a cost-aware partial-adjustment rule", 2, true],
    ]),
  num(m(FH, "apply-opt-hedge-premium", "apply", 10, 90, "Hedging a factor with premium $\\mu = 0.02$, variance $0.04$, exposure $b = 1$, risk aversion $\\lambda = 2$, FMP idio variance $m = 0$: maximize $\\mu(b + x) - \\frac{\\lambda}{2}(b + x)^{2}(0.04)$. Find the optimal $x$."), -0.75),
  mcq(m(FH, "judge-premium-hedge", "transfer", 10, 60, "In the previous item the optimal residual exposure $b + x = 0.25$ is positive because:"),
    "The factor's premium makes some exposure worth its risk, so hedging stops short of zero",
    [
      ["The hedge is too costly", "premhedge-cost", "There are no costs here."],
      ["FMP idio risk", "premhedge-idio", "$m = 0$ here."],
      ["Rounding", "premhedge-rounding", "It's the exact optimum."],
    ]),
];

// ---------------------------------------------------------------------------
// factor-mimicking-portfolios
// ---------------------------------------------------------------------------
const FP = "factor-mimicking-portfolios";
const mimicking: Item[] = [
  // level 1
  mcq(m(FP, "recall-tradable", "recall", 1, 15, "A typical use of time-series betas in hedging is:"),
    "Hedging an equity portfolio with a liquid non-equity instrument such as crude oil or Treasury futures",
    [
      ["Computing cross-sectional factor returns", "tradable-csr", "That uses loadings, not time-series betas."],
      ["Estimating idiosyncratic variance", "tradable-idio", "Unrelated."],
      ["Measuring the bid–ask spread", "tradable-spread", "Unrelated."],
    ]),
  mcq(m(FP, "recall-error-effect", "recall", 1, 15, "When stock betas to a hedge instrument are estimated with error, hedging with the estimated portfolio beta:"),
    "Can increase variance if beta estimation error is large relative to the true portfolio beta",
    [
      ["Always reduces variance", "erreff-always", "Errors can make the hedge harmful."],
      ["Has no effect", "erreff-none", "Errors add variance."],
      ["Doubles the expected return", "erreff-return", "Unrelated."],
    ]),
  mcq(m(FP, "recall-herfindahl", "recall", 1, 15, "The Herfindahl-type concentration $H(\\mathbf{w}) = \\frac{\\|\\mathbf{w}\\|_2^{2}}{\\|\\mathbf{w}\\|_1^{2}}$ equals:"),
    "$\\frac{1}{n}$ for $n$ equal positions and $1$ for a single position",
    [
      ["$n$ for equal positions", "herf-n", "It's $\\frac{1}{n}$."],
      ["Always $1$", "herf-one", "Only for a single name."],
      ["The number of short positions", "herf-short", "It measures concentration."],
    ]),
  mcq(m(FP, "recall-ts-fmp", "recall", 1, 15, "A factor-mimicking portfolio of a non-tradable time series (like an economic indicator) is:"),
    "The portfolio of tradable assets whose returns track the series with minimal error",
    [
      ["The series itself", "tsfmp-series", "The series can't be traded."],
      ["The market portfolio", "tsfmp-market", "Not in general."],
      ["A random portfolio", "tsfmp-random", "It's optimized for tracking."],
    ]),
  // level 2
  num(m(FP, "apply-herf", "apply", 2, 20, "Find $H(\\mathbf{w})$ for $50$ equal positions."), 0.02),
  num(m(FP, "apply-port-beta", "apply", 2, 25, "A portfolio holds $\\$1$M in each of three stocks with oil betas $0.5$, $0.3$ and $0.1$. Find its oil beta exposure in millions."), 0.9),
  num(m(FP, "apply-beta-err-var", "apply", 2, 25, "The same three positions have beta standard errors $0.2$ each (independent). Find $\\mathbf{w}^{\\top}\\boldsymbol{\\Sigma}\\mathbf{w}$, the variance of the estimated portfolio beta, in squared millions."), 0.12),
  mcq(m(FP, "apply-scale-free", "apply", 2, 20, "The optimal hedge shrinkage factor $y$:"),
    "Doesn't depend on the portfolio's overall size",
    [
      ["Grows with portfolio size", "scalefree-grow", "It's a ratio, invariant to scale."],
      ["Shrinks with portfolio size", "scalefree-shrink", "Scale cancels."],
      ["Equals the portfolio size", "scalefree-equal", "It's dimensionless."],
    ]),
  // level 3
  num(m(FP, "apply-shrink-y", "apply", 3, 30, "The variance-minimizing hedge multiplier is $y^{*} = \\frac{(\\boldsymbol{\\beta}^{\\top}\\mathbf{w})^{2}}{(\\boldsymbol{\\beta}^{\\top}\\mathbf{w})^{2} + \\mathbf{w}^{\\top}\\boldsymbol{\\Sigma}\\mathbf{w}}$. With portfolio beta $0.9$ and error variance $0.12$, find $y^{*}$. Give $3$ decimal places."), 0.871),
  num(m(FP, "apply-hedge-amount", "apply", 3, 25, "With $y = 0.87$ and estimated portfolio beta $\\$0.9$M, find the hedge position in millions (negative for short). Give $3$ decimal places."), -0.783),
  num(m(FP, "apply-herf-mixed", "apply", 3, 30, "Positions $[3, 1, 1, 1, 2, 2]$ (all long). Find $H(\\mathbf{w}) = \\frac{\\sum w_i^{2}}{\\left(\\sum |w_i|\\right)^{2}}$. Give $4$ decimal places."), 0.2),
  mcq(m(FP, "apply-no-error", "apply", 3, 25, "If betas have no estimation error ($\\boldsymbol{\\Sigma} = \\mathbf{0}$), the optimal multiplier is:"),
    "$y = 1$: hedge with the full estimated beta",
    [
      ["$y = 0$", "noerr-zero", "No error means trust the beta fully."],
      ["$y = 0.5$", "noerr-half", "Shrinkage comes only from error."],
      ["Undefined", "noerr-undefined", "It's $1$."],
    ]),
  // level 4
  num(m(FP, "apply-worse-than-none", "apply", 4, 40, "Hedging with the full estimated beta gives variance $\\mathbf{w}^{\\top}\\boldsymbol{\\Omega}\\mathbf{w} - \\sigma_h^{2}(\\boldsymbol{\\beta}^{\\top}\\mathbf{w})^{2} + \\sigma_h^{2}\\mathbf{w}^{\\top}\\boldsymbol{\\Sigma}\\mathbf{w}$. With unhedged variance $0.05$, $\\sigma_h^{2} = 0.04$, true portfolio beta $0.3$ and error variance $0.25$, find the hedged variance."), 0.0564),
  num(m(FP, "apply-simplified-y", "apply", 4, 40, "With identical betas $\\beta$, a long-only book and independent errors of standard deviation $\\sigma_\\beta$, the shrinkage simplifies to $y \\approx 1 - \\frac{\\sigma_\\beta^{2}}{\\beta^{2}}H(\\mathbf{w})$. With $\\sigma_\\beta = 1$, $\\beta = 0.5$ and $H = 0.1$, find $y$."), 0.6),
  num(m(FP, "apply-concentrated-y", "apply", 4, 35, "Same as before but $H = 0.25$ (a concentrated book). Find $y$, floored at $0$."), 0),
  mcq(m(FP, "apply-diversified-benefit", "apply", 4, 30, "Diversified portfolios tolerate noisy betas better because:"),
    "Independent beta errors average out across many positions, so the portfolio beta is estimated precisely",
    [
      ["Diversified portfolios have no beta", "divben-nobeta", "They do have beta."],
      ["Errors grow with diversification", "divben-grow", "They shrink relative to the beta."],
      ["They don't need hedging", "divben-nohedge", "They may still have exposure."],
    ]),
  // level 5
  short(m(FP, "explain-worse-hedge", "explain", 5, 120, "Explain why hedging with noisy estimated betas can make a portfolio riskier than not hedging at all."),
    [
      ["mechanism", "The hedge removes $\\sigma_h^{2}(\\boldsymbol{\\beta}^{\\top}\\mathbf{w})^{2}$ of true exposure risk but adds $\\sigma_h^{2}\\mathbf{w}^{\\top}\\boldsymbol{\\Sigma}\\mathbf{w}$ from the error in the hedge size", 2, true],
      ["condition", "When the beta error variance exceeds the squared true portfolio beta, the added risk outweighs the removed risk", 2, true],
    ]),
  num(m(FP, "apply-ts-fmp", "apply", 5, 40, "With no beta error and a zero-mean series, the time-series mimicking portfolio is $\\mathbf{w} = \\sigma_h^{2}\\boldsymbol{\\Omega}^{-1}\\boldsymbol{\\beta}$. For $\\boldsymbol{\\Omega} = \\text{diag}(0.04, 0.09)$, $\\boldsymbol{\\beta} = [0.5, 0.3]$ and $\\sigma_h^{2} = 0.01$, find $w_1$."), 0.125),
  num(m(FP, "apply-ts-fmp-2", "apply", 5, 35, "In the same setup, find $w_2$. Give $4$ decimal places."), 0.0333),
  mcq(m(FP, "apply-regularizer", "apply", 5, 30, "In the time-series mimicking portfolio, beta estimation error acts as:"),
    "A regularizer added to the covariance matrix, shrinking extreme positions",
    [
      ["A bias in the target", "reg-bias", "It enters the covariance term."],
      ["Irrelevant", "reg-irrelevant", "It changes the solution."],
      ["A reason to leverage up", "reg-leverage", "It shrinks positions."],
    ]),
  // level 6
  short(m(FP, "derive-y", "explain", 6, 150, "Derive the variance-minimizing hedge multiplier $y^{*}$ when hedging with $x_h = -y\\hat{\\boldsymbol{\\beta}}^{\\top}\\mathbf{w}$ and $\\hat{\\boldsymbol{\\beta}} = \\boldsymbol{\\beta} + \\boldsymbol{\\eta}$."),
    [
      ["variance", "Expected variance $= \\mathbf{w}^{\\top}\\boldsymbol{\\Omega}\\mathbf{w} - 2y\\sigma_h^{2}(\\boldsymbol{\\beta}^{\\top}\\mathbf{w})^{2} + y^{2}\\sigma_h^{2}\\left((\\boldsymbol{\\beta}^{\\top}\\mathbf{w})^{2} + \\mathbf{w}^{\\top}\\boldsymbol{\\Sigma}\\mathbf{w}\\right)$ using $\\mathbb{E}[\\boldsymbol{\\eta}] = \\mathbf{0}$", 2, true],
      ["solve", "Minimizing over $y$: $y^{*} = \\frac{(\\boldsymbol{\\beta}^{\\top}\\mathbf{w})^{2}}{(\\boldsymbol{\\beta}^{\\top}\\mathbf{w})^{2} + \\mathbf{w}^{\\top}\\boldsymbol{\\Sigma}\\mathbf{w}}$, a signal-to-noise shrinkage", 2, true],
    ]),
  num(m(FP, "apply-plugin-y", "apply", 6, 45, "In practice $(\\boldsymbol{\\beta}^{\\top}\\mathbf{w})^{2}$ is unknown; an unbiased estimate is $(\\hat{\\boldsymbol{\\beta}}^{\\top}\\mathbf{w})^{2} - \\mathbf{w}^{\\top}\\boldsymbol{\\Sigma}\\mathbf{w}$, giving $y = 1 - \\frac{\\mathbf{w}^{\\top}\\boldsymbol{\\Sigma}\\mathbf{w}}{(\\hat{\\boldsymbol{\\beta}}^{\\top}\\mathbf{w})^{2}}$. With estimated beta $0.9$ and error variance $0.12$, find $y$. Give $4$ decimal places."), 0.8519),
  num(m(FP, "apply-zero-beta", "apply", 6, 40, "If the true betas are zero and the estimated portfolio beta is $0.3$ with error variance $0.09$, find the plug-in $y = 1 - \\frac{\\mathbf{w}^{\\top}\\boldsymbol{\\Sigma}\\mathbf{w}}{(\\hat{\\boldsymbol{\\beta}}^{\\top}\\mathbf{w})^{2}}$."), 0),
  mcq(m(FP, "apply-floor", "apply", 6, 35, "The plug-in multiplier is floored at zero because:"),
    "A negative value would hedge in the wrong direction",
    [
      ["Hedges can't be short", "floor-short", "Hedges are often short."],
      ["It must be an integer", "floor-integer", "It's continuous."],
      ["Zero minimizes costs", "floor-costs", "It's about direction."],
    ]),
  // level 7
  short(m(FP, "explain-uses", "explain", 7, 150, "Give three reasons a portfolio manager might want a tradable mimicking portfolio for a non-tradable time series."),
    [
      ["reasons", "To hedge exposure to it; to express a macro or thematic view systematically; to test whether a claimed tradable theme actually exists", 2, true],
      ["caveat", "Sell-side “themes” often don't survive this test — if no portfolio tracks the series, it isn't tradable", 1, false],
    ]),
  num(m(FP, "apply-tracking-var", "apply", 7, 50, "A single asset with variance $0.04$ and beta $0.5$ to a zero-mean series of variance $0.01$ (no error). The mimicking weight is $w = \\frac{\\sigma_h^{2}\\beta}{\\sigma^{2}}$. Find $w$."), 0.125),
  num(m(FP, "apply-corr-error", "apply", 7, 50, "Beta errors of three equal $\\$1$M positions have standard deviation $0.2$ and pairwise correlation $\\rho = 0.5$. Find $\\mathbf{w}^{\\top}\\boldsymbol{\\Sigma}\\mathbf{w}$."), 0.24),
  mcq(m(FP, "apply-corr-error-effect", "apply", 7, 40, "Correlated beta errors (common in stressed markets) make the optimal hedge:"),
    "Smaller, because errors no longer average out across positions",
    [
      ["Larger", "correff-larger", "More error, more shrinkage."],
      ["Unchanged", "correff-unchanged", "The error variance rises."],
      ["Exactly the full beta", "correff-full", "Shrinkage increases."],
    ]),
  // level 8
  short(m(FP, "explain-herfindahl", "explain", 8, 150, "Interpret the simplified rule $y \\approx 1 - \\frac{\\sigma_\\beta^{2}}{\\beta^{2}}H(\\mathbf{w})$."),
    [
      ["noise", "$\\frac{\\sigma_\\beta^{2}}{\\beta^{2}}$ is the squared noise-to-signal ratio of individual betas", 2, true],
      ["concentration", "$H(\\mathbf{w})$ measures concentration: errors average out in diversified books (small $H$), so they keep most of the hedge; concentrated books should hedge less", 2, true],
    ]),
  num(m(FP, "apply-herf-short", "apply", 8, 45, "Positions $[2, -1, 1]$. Using absolute values for the $L_1$ norm, find $H(\\mathbf{w})$. Give $4$ decimal places."), 0.375),
  num(m(FP, "apply-full-ts-fmp", "apply", 8, 50, "Two uncorrelated assets: variances $0.04$ and $0.04$, betas $[1, 0.5]$ to a zero-mean series with variance $0.0025$, beta-error variances $0.25$ and $0.25$. The error-regularized portfolio is $\\mathbf{w} = \\sigma_h^{2}(\\boldsymbol{\\Omega} + \\sigma_h^{2}\\boldsymbol{\\Sigma})^{-1}\\boldsymbol{\\beta}$. Find $w_1$. Give $4$ decimal places."), 0.0615),
  mcq(m(FP, "apply-high-return-series", "apply", 8, 40, "When the time series has a large expected return relative to its volatility, the error term's regularizing effect:"),
    "Grows in importance, since errors in the betas also bias the tracked expected return",
    [
      ["Disappears", "highret-disappears", "It becomes more important."],
      ["Reverses sign", "highret-reverse", "It stays a regularizer."],
      ["Is unaffected", "highret-unaffected", "The expected return scales the error terms."],
    ]),
  // level 9
  short(m(FP, "transfer-energy", "transfer", 9, 180, "You manage an energy-stock portfolio and want to hedge its exposure to crude oil with futures. Walk through the procedure."),
    [
      ["estimate", "Estimate each stock's time-series beta to oil returns and its standard error; compute the portfolio's estimated beta and its error variance", 2, true],
      ["size", "Hedge $-y\\hat{\\boldsymbol{\\beta}}^{\\top}\\mathbf{w}$ of futures with $y$ shrunk for noise and concentration (floored at $0$), test sensitivity to correlated errors, and rebalance with costs in mind", 2, true],
    ]),
  short(m(FP, "explain-orthogonalize", "explain", 9, 150, "How would you hedge exposure to a time-series factor on top of an existing equity factor model's FMPs?"),
    [
      ["orthogonalize", "Orthogonalize: regress the series (or its mimicking portfolio) on the equity factors and use only the residual part, so the hedge doesn't double-count existing factors", 2, true],
      ["hedge", "Then hedge the core's exposure to that residual factor alongside the equity FMP hedges", 2, true],
    ]),
  num(m(FP, "apply-var-reduction", "apply", 9, 60, "Unhedged variance $0.05$, $\\sigma_h^{2} = 0.04$, true portfolio beta $0.9$, error variance $0.12$. Using the optimal $y^{*}$, the minimized variance is $\\mathbf{w}^{\\top}\\boldsymbol{\\Omega}\\mathbf{w} - \\sigma_h^{2}\\frac{(\\boldsymbol{\\beta}^{\\top}\\mathbf{w})^{4}}{(\\boldsymbol{\\beta}^{\\top}\\mathbf{w})^{2} + \\mathbf{w}^{\\top}\\boldsymbol{\\Sigma}\\mathbf{w}}$. Find it. Give $4$ decimal places."), 0.0218),
  mcq(m(FP, "apply-ts-vs-model", "apply", 9, 40, "Compared with model (cross-sectional) betas, time-series betas to a commodity future are:"),
    "Often noisier, especially for short histories or unstable relationships, which is why shrinkage matters",
    [
      ["Always more accurate", "tsvsm-accurate", "They can be very noisy."],
      ["Identical", "tsvsm-identical", "Different estimation methods."],
      ["Unusable", "tsvsm-unusable", "Usable with care."],
    ]),
  // level 10
  short(m(FP, "judge-thematic", "transfer", 10, 180, "A broker pitches an “AI theme index” as a hedge for your tech book. How would you evaluate it?"),
    [
      ["tracking", "Check whether the theme is a tradable, stable portfolio: its returns' correlation with your book, the stability of time-series betas, and their standard errors", 2, true],
      ["incremental", "Check whether it adds anything beyond existing factor and industry hedges (orthogonalize against the risk model); if not, it's an expensive repackaging", 2, true],
    ]),
  short(m(FP, "judge-shrink-practice", "transfer", 10, 180, "Argue for or against always shrinking time-series hedges, even when betas look precise."),
    [
      ["for", "Standard errors understate real uncertainty (non-stationarity, regime shifts, correlated errors in stress), so mild shrinkage is a cheap insurance", 2, true],
      ["against", "Over-shrinking leaves known exposure unhedged; the amount should follow measured noise, concentration and sensitivity tests", 2, true],
    ]),
  num(m(FP, "apply-breakeven-error", "apply", 10, 90, "Hedging with the full estimated beta is worse than not hedging when $\\mathbf{w}^{\\top}\\boldsymbol{\\Sigma}\\mathbf{w} > (\\boldsymbol{\\beta}^{\\top}\\mathbf{w})^{2}$. For an equal-weighted book of $n$ positions of \\$1M with true betas $0.1$ and independent errors of standard deviation $0.5$, find the smallest $n$ for which the full hedge helps."), 26),
  mcq(m(FP, "judge-n-effect", "transfer", 10, 60, "The previous result shows that for weak true betas, hedging becomes worthwhile only for large books because:"),
    "Exposure grows like $n$ while the error's standard deviation grows like $\\sqrt{n}$",
    [
      ["Errors shrink with $n$", "neff-shrink", "Total error grows, but slower than exposure."],
      ["Betas grow with $n$", "neff-betas", "Individual betas are fixed."],
      ["Large books have no errors", "neff-none", "They do."],
    ]),
];

export const qi11Items: Item[] = [...factorHedging, ...mimicking];
