import type { Item } from "../../lib/assessment/types";
import { m, mcq, num, short } from "./qi-shared";

/**
 * Quantitative Investing, part 9: MVO and its discontents — constraints,
 * penalties and robust formulations, and how estimation error erodes the
 * Sharpe ratio (Paleologo, Ch. 9). Forty questions per lesson, four at each
 * level.
 */

// ---------------------------------------------------------------------------
// constrained-portfolio-optimization
// ---------------------------------------------------------------------------
const CO = "constrained-portfolio-optimization";
const constrained: Item[] = [
  // level 1
  mcq(m(CO, "recall-long-only", "recall", 1, 15, "A long-only constraint is written as:"),
    "$\\mathbf{w} \\ge \\mathbf{0}$, a set of linear inequalities",
    [
      ["$\\mathbf{w}^{\\top}\\mathbf{w} \\le 1$", "longonly-norm", "That's a norm bound."],
      ["$\\mathbf{e}^{\\top}\\mathbf{w} = 0$", "longonly-neutral", "That's dollar neutrality."],
      ["$|\\mathbf{w}| \\le 1$", "longonly-box", "That allows shorts."],
    ]),
  mcq(m(CO, "recall-gmv", "recall", 1, 15, "A gross market value constraint $\\sum_i |w_i| \\le G$ is made linear by:"),
    "Splitting each position into long and short parts $w_i = w_i^{+} - w_i^{-}$ with $w_i^{\\pm} \\ge 0$ and $\\sum_i (w_i^{+} + w_i^{-}) \\le G$",
    [
      ["Squaring the weights", "gmv-square", "That gives a quadratic constraint."],
      ["Dropping the absolute values", "gmv-drop", "That constrains net, not gross, value."],
      ["It can't be linearized", "gmv-cant", "It can, with auxiliary variables."],
    ]),
  mcq(m(CO, "recall-te", "recall", 1, 15, "Tracking error is:"),
    "The volatility of the active portfolio $\\mathbf{w} - \\mathbf{w}_{\\text{bench}}$",
    [
      ["The volatility of the portfolio", "te-total", "It's of the difference from the benchmark."],
      ["The difference in returns over one day", "te-return", "It's a volatility."],
      ["The number of stocks not in the benchmark", "te-count", "It's a risk measure."],
    ]),
  mcq(m(CO, "recall-nonconvex", "recall", 1, 15, "Which constraint is non-convex and best avoided?"),
    "A minimum idiosyncratic volatility, $\\mathbf{w}^{\\top}\\boldsymbol{\\Omega}_\\epsilon\\mathbf{w} \\ge \\sigma^{2}_{\\text{idio}}$",
    [
      ["A maximum volatility", "nonconvex-maxvol", "Upper bounds on convex functions are convex."],
      ["A long-only constraint", "nonconvex-longonly", "Linear constraints are convex."],
      ["A factor exposure bound", "nonconvex-exposure", "Linear, hence convex."],
    ]),
  // level 2
  num(m(CO, "apply-130-30", "apply", 2, 20, "A $130/30$ fund has $130\\%$ of net value long and $30\\%$ short. Find its gross market value as a percentage of net value."), 160),
  num(m(CO, "apply-active", "apply", 2, 20, "A portfolio holds $6\\%$ in a stock whose benchmark weight is $4\\%$. Find the active weight in percent."), 2),
  num(m(CO, "apply-shadow", "apply", 2, 25, "Relaxing a factor-exposure bound by one unit raises the optimal objective by $0.3$ (its shadow price). Approximately how much does relaxing it by $0.5$ units add?"), 0.15),
  mcq(m(CO, "apply-penalty-equiv", "apply", 2, 20, "A constraint with shadow price $\\mu^{*}$ can be replaced by a penalty without changing the solution if:"),
    "The penalty coefficient equals $\\mu^{*}$",
    [
      ["The penalty is infinite", "penequiv-infinite", "That's a hard constraint by other means."],
      ["The penalty is zero", "penequiv-zero", "Then the constraint is ignored."],
      ["Never", "penequiv-never", "Pricing out at the shadow price reproduces the solution."],
    ]),
  // level 3
  num(m(CO, "apply-ls-ratio", "apply", 3, 25, "A $130/30$ portfolio's long-to-short ratio $K$ satisfies $\\sum w^{+} = K\\sum w^{-}$. Find $K$. Give $4$ decimal places."), 4.3333),
  num(m(CO, "apply-tc", "apply", 3, 30, "Trading cost is modelled as $c|\\Delta w|^{\\beta}$ with $c = 0.001$ and $\\beta = 1.5$. Find the cost of trading $\\Delta w = 100$ (in \\$ thousands)."), 1),
  num(m(CO, "apply-te", "apply", 3, 30, "Active weights $[0.02, -0.02]$ on two uncorrelated stocks with volatility $0.3$. Find the tracking error. Give $4$ decimal places."), 0.0085),
  mcq(m(CO, "apply-commensurable", "apply", 3, 25, "Which constraint is most naturally expressed as a penalty with coefficient one?"),
    "A limit on trading costs, since costs and expected PnL are both in dollars",
    [
      ["A long-only constraint", "commens-longonly", "It isn't measured in PnL units."],
      ["A cardinality constraint", "commens-cardinality", "It's combinatorial."],
      ["A volatility constraint", "commens-vol", "Variance is in dollars squared, not dollars."],
    ]),
  // level 4
  num(m(CO, "apply-two-asset-short", "apply", 4, 35, "Two assets with Sharpe ratios $0.5$ and $0.2$. Above what correlation does MVO short asset 2?"), 0.4),
  num(m(CO, "apply-ridge-corr", "apply", 4, 40, "A ridge penalty turns the covariance into $\\boldsymbol{\\Omega} + c\\mathbf{I}$. Two assets with unit variance and correlation $0.6$; with $c = 0.5$, find the new correlation."), 0.4),
  num(m(CO, "apply-robust-alpha", "apply", 4, 40, "Robust alpha: the worst-case alpha within distance $d$ of $\\hat{\\boldsymbol{\\alpha}}$ reduces expected PnL by $d\\|\\mathbf{w}\\|$. With $d = 0.01$ and $\\mathbf{w} = [3, 4]$, find the reduction."), 0.05),
  mcq(m(CO, "apply-turnover-con", "apply", 4, 30, "A turnover constraint $\\sum_i |w_i - w_i^{\\text{start}}| \\le \\tau$ is:"),
    "Convex, linearizable with auxiliary variables like the GMV constraint",
    [
      ["Non-convex", "turnover-nonconvex", "Sums of absolute values of affine functions are convex."],
      ["Quadratic", "turnover-quadratic", "It's piecewise linear."],
      ["Equivalent to long-only", "turnover-longonly", "Different constraint."],
    ]),
  // level 5
  short(m(CO, "explain-hedge-short", "explain", 5, 120, "Naive MVO may short an asset with positive expected return. Explain when and why, and why this is fragile."),
    [
      ["when", "In a two-asset case it shorts asset 2 when $\\frac{s_2}{s_1} < \\rho$: the hedge reduces risk more than it costs in expected return", 2, true],
      ["fragile", "The decision depends on precise correlation and Sharpe estimates; with estimation error, averaging (going long both) may be safer", 2, true],
    ]),
  num(m(CO, "apply-worst-sharpe-loss", "apply", 5, 40, "Two uncorrelated assets have forecast Sharpe ratios $[1, 1]$; true ones are within Euclidean distance $\\varepsilon = 0.5$. Worst-case relative PnL loss is $\\frac{\\varepsilon}{\\|\\mathbf{s}\\|}$. Find it. Give $4$ decimal places."), 0.3536),
  mcq(m(CO, "apply-cardinality", "apply", 5, 30, "Rather than a cardinality constraint (at most $N_{\\max}$ names), Paleologo recommends:"),
    "Modelling trading costs directly and zeroing out trades below a threshold",
    [
      ["A larger $N_{\\max}$", "card-larger", "It's still combinatorial."],
      ["Ignoring trading costs", "card-ignore", "Costs are what really limit names."],
      ["A minimum GMV", "card-min-gmv", "Also ill-advised."],
    ]),
  num(m(CO, "apply-linearize-vol", "apply", 5, 40, "Near a target volatility $\\sigma_0 = 0.1$, $\\sigma \\approx \\frac{\\sigma_0}{2} + \\frac{\\sigma^{2}}{2\\sigma_0}$. Approximate $\\sigma$ when the variance is $0.0121$. Give $4$ decimal places."), 0.1105),
  // level 6
  short(m(CO, "explain-constraints-help", "explain", 6, 150, "Adding constraints can only lower the in-sample optimum. Why might they still improve realized performance?"),
    [
      ["error", "Inputs (alphas, covariances) are estimated with error; the unconstrained optimizer over-exploits those errors", 2, true],
      ["regularize", "Constraints act like regularization (e.g. long-only or norm bounds shrink the covariance or limit extreme bets), trading a little in-sample optimality for robustness", 2, true],
    ]),
  num(m(CO, "apply-uncertain-alpha", "apply", 6, 40, "With alpha uncertainty $\\boldsymbol{\\alpha} \\sim \\mathcal{N}(\\hat{\\boldsymbol{\\alpha}}, \\tau^{2}\\mathbf{I})$, the effective covariance is $\\boldsymbol{\\Omega} + \\tau^{2}\\mathbf{I}$. A stock's variance is $0.04$ and $\\tau^{2} = 0.01$; find its effective variance."), 0.05),
  num(m(CO, "apply-l1-penalty", "apply", 6, 45, "The robust-correlation penalty is $d^{2}\\left(\\sum_i |w_i|\\sigma_i\\right)^{2}$. With $d = 0.1$, $\\mathbf{w} = [1, -2]$ and $\\boldsymbol{\\sigma} = [0.2, 0.1]$, find it."), 0.0016),
  mcq(m(CO, "apply-robust-table", "apply", 6, 35, "Which modelling assumption leads to a quadratic penalty $\\propto \\|\\mathbf{w}\\|^{2}$ (a ridge on the covariance)?"),
    "Alpha known only up to Gaussian noise, or a Frobenius-norm bound on covariance error",
    [
      ["Bounded error in each pairwise correlation", "robtab-corr", "That gives a squared $L_1$ penalty."],
      ["A cardinality limit", "robtab-card", "That's combinatorial."],
      ["Long-only constraints", "robtab-longonly", "Those are linear inequalities."],
    ]),
  // level 7
  short(m(CO, "explain-constraint-vs-penalty", "explain", 7, 150, "Explain the practical differences between imposing a constraint and adding the equivalent penalty."),
    [
      ["price", "With a constraint, its shadow price is unknown until solved, and the solution can be very sensitive to the limit; a penalty fixes the price, which often has a clear meaning (e.g. the price of risk)", 2, true],
      ["stability", "Penalties keep a consistent trade-off across successive optimizations; constraints guarantee the limit is never breached", 2, true],
    ]),
  num(m(CO, "apply-insight91", "apply", 7, 45, "Minimize $\\mathbf{a}^{\\top}\\mathbf{x}$ over $\\|\\mathbf{x} - \\mathbf{x}_0\\| \\le d$: the minimum is $\\mathbf{a}^{\\top}\\mathbf{x}_0 - d\\|\\mathbf{a}\\|$. With $\\mathbf{a} = [3, 4]$, $\\mathbf{x}_0 = [1, 1]$ and $d = 0.2$, find it."), 6),
  num(m(CO, "apply-pnl-loss-corr", "apply", 7, 45, "Two uncorrelated assets with forecast Sharpe ratios $[2, 1]$; true ones within distance $\\varepsilon = 0.5$. Find the worst-case relative PnL loss $\\frac{\\varepsilon}{\\|\\mathbf{s}\\|}$. Give $4$ decimal places."), 0.2236),
  mcq(m(CO, "apply-pidio", "apply", 7, 40, "Why is a constraint “idiosyncratic variance at least $p$ of total variance” problematic?"),
    "It is $\\mathbf{w}^{\\top}\\left(p\\mathbf{B}\\boldsymbol{\\Omega}_f\\mathbf{B}^{\\top} - (1 - p)\\boldsymbol{\\Omega}_\\epsilon\\right)\\mathbf{w} \\le 0$ with an indefinite matrix — a non-convex constraint",
    [
      ["It is linear", "pidio-linear", "It's quadratic."],
      ["It always binds", "pidio-binds", "Not the issue."],
      ["It requires integer variables", "pidio-integer", "It's continuous but non-convex."],
    ]),
  // level 8
  short(m(CO, "derive-robust-alpha", "explain", 8, 150, "Show that maximizing worst-case expected return $\\min_{\\|\\mathbf{a} - \\hat{\\boldsymbol{\\alpha}}\\| \\le d}\\mathbf{a}^{\\top}\\mathbf{w} - \\lambda\\mathbf{w}^{\\top}\\boldsymbol{\\Omega}\\mathbf{w}$ adds a norm penalty."),
    [
      ["inner", "The inner minimum over the ball is attained at $\\mathbf{a} = \\hat{\\boldsymbol{\\alpha}} - d\\frac{\\mathbf{w}}{\\|\\mathbf{w}\\|}$, giving $\\hat{\\boldsymbol{\\alpha}}^{\\top}\\mathbf{w} - d\\|\\mathbf{w}\\|$", 2, true],
      ["result", "So the objective becomes MVO with an extra $-d\\|\\mathbf{w}\\|$ penalty, interchangeable with a squared-norm penalty near the optimum", 2, true],
    ]),
  num(m(CO, "apply-robust-factor", "apply", 8, 45, "A hidden factor of volatility $\\nu = 0.1$ adds $\\nu^{2}\\|\\mathbf{w}_\\perp\\|^{2}$ to variance, where $\\mathbf{w}_\\perp$ is the part of $\\mathbf{w}$ orthogonal to $\\mathbf{B}$. With $\\|\\mathbf{w}_\\perp\\|^{2} = 4$, find the added variance."), 0.04),
  num(m(CO, "apply-shrunk-corr-ridge", "apply", 8, 50, "Two assets with variances $0.04$ and $0.09$ and correlation $0.5$. Adding $c\\mathbf{I}$ with $c = 0.05$, find the new correlation. Give $4$ decimal places."), 0.2673),
  mcq(m(CO, "apply-min-gmv", "apply", 8, 40, "A PM wants a lower bound on GMV so the book is “big enough”. Paleologo's view is:"),
    "If the optimal portfolio after alphas, costs and risk limits is small, it should probably stay small; a floor forces unwarranted bets",
    [
      ["It's a useful convex constraint", "mingmv-useful", "A lower bound on GMV is non-convex."],
      ["It improves Sharpe", "mingmv-sharpe", "It forces size regardless of edge."],
      ["It's required by regulators", "mingmv-regulators", "No."],
    ]),
  // level 9
  short(m(CO, "transfer-design", "transfer", 9, 180, "Write down (in words) a realistic optimization for a market-neutral equity strategy, distinguishing constraints from penalties."),
    [
      ["objective", "Maximize alpha minus trading-cost penalty minus a risk penalty (or under a volatility budget)", 2, true],
      ["constraints", "Constraints: dollar and factor neutrality (or bounds), GMV/leverage limit, position limits (liquidity, ownership), possibly turnover; avoid non-convex constraints", 2, true],
    ]),
  short(m(CO, "explain-robust-unify", "explain", 9, 150, "Paleologo shows that uncertain alpha, robust alpha, robust factors, robust correlations and robust covariances all lead to penalties. What common lesson do they teach?"),
    [
      ["common", "Accounting for misspecification turns into penalizing large or concentrated positions — effectively a modified (regularized) covariance", 2, true],
      ["practice", "So norm penalties and related constraints are principled defences against estimation error, not ad hoc tweaks", 2, true],
    ]),
  num(m(CO, "apply-two-asset-weight", "apply", 9, 60, "Two unit-volatility assets with Sharpe ratios $0.5$ and $0.4$ and correlation $0.9$. Dollar-vol weights are proportional to $\\frac{s_1 - \\rho s_2}{1 - \\rho^{2}}$ and $\\frac{s_2 - \\rho s_1}{1 - \\rho^{2}}$. Find the weight on asset 2. Give $4$ decimal places."), -0.2632),
  mcq(m(CO, "apply-fiduciary", "apply", 9, 40, "Which constraint type is driven by fiduciary considerations?"),
    "A tracking-error limit relative to a benchmark",
    [
      ["Trading-cost penalties", "fid-cost", "Implementation, not fiduciary."],
      ["A do-not-trade list for a pending acquisition", "fid-tactical", "Tactical."],
      ["Long-only for a regulated fund", "fid-regulatory", "Regulatory."],
    ]),
  // level 10
  short(m(CO, "judge-two-asset", "transfer", 10, 180, "Two highly correlated stocks both have positive forecast alphas. MVO goes long one and short the other. A PM wants to go long both. Who is right?"),
    [
      ["mvo", "MVO is right if the forecasts and correlation are accurate: the short is a cheap hedge", 2, true],
      ["pm", "The PM has a point given estimation error: small errors in Sharpe or correlation flip the decision, and averaging signals is more robust; regularization moves MVO toward the PM's view", 2, true],
    ]),
  short(m(CO, "judge-min-vol", "transfer", 10, 180, "Someone proposes a lower bound on total portfolio volatility to ensure the strategy uses its risk budget. Critique."),
    [
      ["nonconvex", "A lower bound on a convex function is non-convex: the problem may have many local optima and solvers may fail", 2, true],
      ["modelling", "It also forces risk-taking without edge; if more risk is wanted, raise alpha confidence or loosen limits, and test the effect", 2, true],
    ]),
  num(m(CO, "apply-ridge-sr", "apply", 10, 90, "Two unit-variance assets, correlation $0.8$, alphas $[0.1, 0.05]$. A ridge with $c = 0.25$ gives weights $\\propto (\\boldsymbol{\\Omega} + c\\mathbf{I})^{-1}\\boldsymbol{\\alpha}$. Find the true Sharpe ratio of the ridge portfolio. Give $4$ decimal places."), 0.1062),
  mcq(m(CO, "judge-long-only-reg", "transfer", 10, 60, "Jagannathan and Ma show that imposing long-only constraints on a minimum-variance portfolio:"),
    "Is equivalent to shrinking the covariance matrix, which can help when it is estimated with error",
    [
      ["Always hurts out of sample", "jm-hurts", "It can help, as regularization."],
      ["Has no effect", "jm-none", "It changes the solution."],
      ["Makes the problem non-convex", "jm-nonconvex", "Linear constraints keep it convex."],
    ]),
];

// ---------------------------------------------------------------------------
// estimation-error-in-mvo
// ---------------------------------------------------------------------------
const EE = "estimation-error-in-mvo";
const estimationError: Item[] = [
  // level 1
  mcq(m(EE, "recall-sre", "recall", 1, 15, "The Sharpe ratio efficiency (SRE) is:"),
    "The realized Sharpe of the portfolio built from estimates divided by the best achievable Sharpe",
    [
      ["The estimated Sharpe divided by the realized Sharpe", "sre-inverse", "It compares realized to optimal."],
      ["The Sharpe ratio minus its standard error", "sre-se", "It's a ratio of Sharpes."],
      ["The fraction of positive days", "sre-hit", "Unrelated."],
    ]),
  mcq(m(EE, "recall-bound", "recall", 1, 15, "The SRE is always:"),
    "At most $1$, with equality only when the estimated portfolio is collinear with the optimal one in whitened space",
    [
      ["At least $1$", "srebound-min", "Errors can only hurt."],
      ["Exactly $1$", "srebound-equal", "Only with correct inputs (up to scale)."],
      ["Between $1$ and $2$", "srebound-range", "It's at most $1$."],
    ]),
  mcq(m(EE, "recall-uniform", "recall", 1, 15, "If the estimated covariance is the true one times a constant, $\\hat{\\boldsymbol{\\Omega}} = c\\boldsymbol{\\Omega}$, the SRE is:"),
    "$1$ — the portfolio's direction is unchanged, only its volatility forecast is off",
    [
      ["$c$", "uniform-c", "Scale doesn't affect the direction."],
      ["$\\frac{1}{c}$", "uniform-inv", "No Sharpe is lost."],
      ["$0$", "uniform-zero", "Nothing is lost."],
    ]),
  mcq(m(EE, "recall-range", "recall", 1, 15, "Paleologo's Insight 9.2 puts the typical Sharpe degradation of naive MVO from forecast errors at:"),
    "Roughly $10\\%$ to $50\\%$",
    [
      ["Under $1\\%$", "range-tiny", "Errors are larger than that."],
      ["Over $90\\%$", "range-huge", "Typically less extreme."],
      ["Exactly $0$", "range-zero", "There is always some loss."],
    ]),
  // level 2
  num(m(EE, "apply-sre-angle", "apply", 2, 20, "With the covariance known, the SRE is the cosine of the angle between the true and estimated whitened alphas. Find it for an angle of $60^{\\circ}$."), 0.5),
  num(m(EE, "apply-realized", "apply", 2, 20, "The best achievable Sharpe is $2$ and the SRE is $0.75$. Find the realized Sharpe."), 1.5),
  num(m(EE, "apply-sre-45", "apply", 2, 25, "With $\\boldsymbol{\\Omega} = \\mathbf{I}$, true alphas $[1, 1]$ and estimated alphas $[1, 0]$, find the SRE. Give $4$ decimal places."), 0.7071),
  mcq(m(EE, "apply-vol-miss", "apply", 2, 20, "If you overestimate every asset's variance by $20\\%$ (uniformly), you lose:"),
    "No Sharpe, though your volatility forecast is too high",
    [
      ["$20\\%$ of Sharpe", "volmiss-20", "Uniform scaling doesn't change the portfolio's direction."],
      ["$10\\%$ of Sharpe", "volmiss-10", "No Sharpe is lost."],
      ["All Sharpe", "volmiss-all", "No."],
    ]),
  // level 3
  num(m(EE, "apply-alpha-bound", "apply", 3, 30, "If the whitened alpha error is at most $\\varepsilon$ times the true alpha's norm, the SRE is at least $\\sqrt{1 - \\varepsilon^{2}}$. Find this bound for $\\varepsilon = 0.5$. Give $4$ decimal places."), 0.866),
  num(m(EE, "apply-kantorovich", "apply", 3, 30, "With the estimated covariance having the true eigenvectors, SRE $\\ge \\frac{2\\sqrt{\\kappa_{\\min}\\kappa_{\\max}}}{\\kappa_{\\min} + \\kappa_{\\max}}$, where $\\kappa_i$ are ratios of true to estimated eigenvalues. Find the bound for $\\kappa_{\\min} = 1$, $\\kappa_{\\max} = 4$."), 0.8),
  num(m(EE, "apply-kanto-2", "apply", 3, 30, "Find the same bound for $\\kappa_{\\min} = 1$ and $\\kappa_{\\max} = 2$. Give $4$ decimal places."), 0.9428),
  mcq(m(EE, "apply-uneven", "apply", 3, 25, "Covariance error costs Sharpe mainly when:"),
    "Eigenvalues are misestimated unevenly — some directions' risk over- and others under-estimated",
    [
      ["All eigenvalues are off by the same factor", "uneven-same", "Uniform errors are harmless for Sharpe."],
      ["The covariance is diagonal", "uneven-diagonal", "Diagonality isn't the issue."],
      ["Alphas are exact", "uneven-exact", "Risk errors hurt regardless."],
    ]),
  // level 4
  num(m(EE, "apply-sre-risk", "apply", 4, 45, "True $\\boldsymbol{\\Omega} = \\mathbf{I}$, alphas $[1, 1]$. You estimate $\\hat{\\boldsymbol{\\Omega}} = \\text{diag}(1, 4)$, so $\\mathbf{w} \\propto [1, 0.25]$. Find the SRE. Give $4$ decimal places."), 0.8575),
  num(m(EE, "apply-realized-sr-risk", "apply", 4, 40, "For the same case, find the realized Sharpe $\\frac{\\boldsymbol{\\alpha}^{\\top}\\mathbf{w}}{\\sqrt{\\mathbf{w}^{\\top}\\mathbf{w}}}$. Give $4$ decimal places."), 1.2127),
  num(m(EE, "apply-optimal-sr", "apply", 4, 30, "Find the optimal Sharpe for true $\\boldsymbol{\\Omega} = \\mathbf{I}$ and alphas $[1, 1]$. Give $4$ decimal places."), 1.4142),
  mcq(m(EE, "apply-negative-sre", "apply", 4, 35, "Paleologo notes that, pathologically, the SRE can even be negative. This happens when:"),
    "The estimated alpha aligns with a direction that the misestimated risk model maps to the opposite side of the optimum",
    [
      ["Alphas are all positive", "negsre-positive", "Signs alone don't cause it."],
      ["Both alphas and covariance are estimated exactly", "negsre-exact", "Then the SRE is exactly $1$."],
      ["Never", "negsre-never", "It can happen."],
    ]),
  // level 5
  short(m(EE, "explain-sre-cosine", "explain", 5, 120, "Show why the SRE is a cosine, using $\\mathbf{a} = \\boldsymbol{\\Omega}^{-1/2}\\boldsymbol{\\alpha}$ and $\\mathbf{b} = \\boldsymbol{\\Omega}^{1/2}\\hat{\\boldsymbol{\\Omega}}^{-1}\\hat{\\boldsymbol{\\alpha}}$."),
    [
      ["realized", "The realized Sharpe of $\\mathbf{w} = \\hat{\\boldsymbol{\\Omega}}^{-1}\\hat{\\boldsymbol{\\alpha}}$ is $\\frac{\\boldsymbol{\\alpha}^{\\top}\\mathbf{w}}{\\sqrt{\\mathbf{w}^{\\top}\\boldsymbol{\\Omega}\\mathbf{w}}} = \\frac{\\mathbf{a}^{\\top}\\mathbf{b}}{\\|\\mathbf{b}\\|}$", 2, true],
      ["ratio", "Dividing by the optimal $\\|\\mathbf{a}\\|$ gives $\\frac{\\mathbf{a}^{\\top}\\mathbf{b}}{\\|\\mathbf{a}\\|\\|\\mathbf{b}\\|} \\le 1$ by Cauchy–Schwarz", 2, true],
    ]),
  num(m(EE, "apply-alpha-angle", "apply", 5, 35, "True whitened alphas $[3, 4]$, estimated $[4, 3]$ (covariance known). Find the SRE."), 0.96),
  num(m(EE, "apply-half-vol", "apply", 5, 40, "All eigen-volatilities are estimated exactly except one, whose volatility is underestimated by $50\\%$ (so its variance ratio is $\\kappa = 4$). Find the worst-case SRE bound with $\\kappa_{\\min} = 1$."), 0.8),
  mcq(m(EE, "apply-which-worse", "apply", 5, 30, "Classic studies (Chopra and Ziemba) found that, for mean-variance portfolios, errors in which input hurt most?"),
    "Expected returns (alphas)",
    [
      ["Variances", "worse-var", "Variance errors matter less."],
      ["Covariances", "worse-cov", "Usually less than alpha errors."],
      ["They're all equal", "worse-equal", "Alpha errors dominate."],
    ]),
  // level 6
  short(m(EE, "explain-capacity-tradeoff", "explain", 6, 150, "Explain Paleologo's point that Sharpe can be traded for capacity or return on GMV."),
    [
      ["setup", "Minimize variance subject to constraints and a minimum return on GMV $r$; the smallest achievable volatility $V(r)$ is increasing and convex in $r$", 2, true],
      ["tradeoff", "So the Sharpe $\\frac{r}{V(r)}$ is non-increasing: demanding more return per dollar of GMV (or more PnL) costs risk-adjusted performance", 2, true],
    ]),
  num(m(EE, "apply-lost-pnl", "apply", 6, 40, "A strategy's optimal Sharpe is $2$ at a dollar volatility of $\\$10$M. With an SRE of $0.8$, find the expected PnL lost in millions."), 4),
  num(m(EE, "apply-kanto-wide", "apply", 6, 45, "If estimated eigenvalues are off by ratios between $0.5$ and $2$, find the worst-case SRE bound. Give $4$ decimal places."), 0.8),
  mcq(m(EE, "apply-corr-error", "apply", 6, 35, "In the two-asset analysis, the Sharpe loss from correlation error is larger when:"),
    "The assets are highly correlated and their Sharpe ratios differ",
    [
      ["The assets are uncorrelated", "correrr-uncorr", "Loss grows with correlation."],
      ["The Sharpe ratios are identical", "correrr-same", "Differences amplify the effect."],
      ["Correlation is estimated exactly", "correrr-exact", "No error, no loss."],
    ]),
  // level 7
  short(m(EE, "explain-alpha-bound", "explain", 7, 150, "Derive geometrically why a relative whitened alpha error $\\varepsilon < 1$ guarantees SRE $\\ge \\sqrt{1 - \\varepsilon^{2}}$ (with the covariance known)."),
    [
      ["ball", "The estimate lies in a ball of radius $\\varepsilon\\|\\mathbf{a}\\|$ around the true whitened alpha $\\mathbf{a}$", 2, true],
      ["tangent", "The largest angle to $\\mathbf{a}$ is reached at a tangent point, where $\\sin\\theta = \\varepsilon$, so $\\cos\\theta \\ge \\sqrt{1 - \\varepsilon^{2}}$", 2, true],
    ]),
  num(m(EE, "apply-sre-diag-3", "apply", 7, 50, "True $\\boldsymbol{\\Omega} = \\mathbf{I}$, alphas $[1, 1, 1]$. Estimated variances $[1, 1, 0.25]$ (one underestimated), so $\\mathbf{w} \\propto [1, 1, 4]$. Find the SRE. Give $4$ decimal places."), 0.8165),
  num(m(EE, "apply-eps-for-sre", "apply", 7, 45, "What relative alpha error $\\varepsilon$ guarantees SRE at least $0.95$ by $\\sqrt{1 - \\varepsilon^{2}}$? Give $4$ decimal places."), 0.3122),
  mcq(m(EE, "apply-misestimate-direction", "apply", 7, 40, "Underestimating the variance of one direction leads the optimizer to:"),
    "Over-allocate to that direction, which is riskier than believed",
    [
      ["Under-allocate to it", "misdir-under", "Lower estimated risk attracts more weight."],
      ["Ignore it", "misdir-ignore", "It gets more weight."],
      ["Hedge it perfectly", "misdir-hedge", "No."],
    ]),
  // level 8
  short(m(EE, "explain-h-matrix", "explain", 8, 150, "Paleologo writes the risk-error SRE in terms of $\\mathbf{H} = \\boldsymbol{\\Omega}^{1/2}\\hat{\\boldsymbol{\\Omega}}^{-1}\\boldsymbol{\\Omega}^{1/2}$. What does $\\mathbf{H}$ measure, and when is there no loss?"),
    [
      ["meaning", "$\\mathbf{H}$ compares estimated and true covariance in whitened coordinates; $\\mathbf{H} = \\mathbf{I}$ means a perfect model", 2, true],
      ["noloss", "No loss when $\\mathbf{H} \\propto \\mathbf{I}$ (uniform scaling) or when the whitened alpha happens to be an eigenvector of $\\mathbf{H}$ with positive eigenvalue", 2, true],
    ]),
  num(m(EE, "apply-combined", "apply", 8, 50, "Alpha errors alone give SRE $0.9$ and risk errors alone (independently) give $0.85$. Approximating the combined SRE as their product, find it."), 0.765),
  num(m(EE, "apply-mahal-link", "apply", 8, 45, "If $\\|\\mathbf{H} - \\mathbf{I}\\| \\le \\delta$ (operator norm), eigenvalues of $\\mathbf{H}$ lie in $[1 - \\delta, 1 + \\delta]$. With $\\delta = 0.5$, the Kantorovich bound with $\\kappa_{\\min} = 0.5$, $\\kappa_{\\max} = 1.5$ gives what SRE? Give $4$ decimal places."), 0.866),
  mcq(m(EE, "apply-why-weak", "apply", 8, 40, "Paleologo calls the risk-misspecification bound “weak”. He means:"),
    "Large covariance errors can sometimes cost nothing, so the bound can't predict losses precisely — it only guarantees a floor",
    [
      ["Risk errors never matter", "weak-never", "They can matter a lot."],
      ["The bound is wrong", "weak-wrong", "It's valid but loose."],
      ["It only holds for one asset", "weak-one", "It's general."],
    ]),
  // level 9
  short(m(EE, "transfer-diagnose", "transfer", 9, 180, "Your strategy's realized Sharpe is $40\\%$ below its backtested ex-ante Sharpe. How would you diagnose whether alpha or risk-model error is to blame?"),
    [
      ["alpha", "Check alpha calibration: IC and predictive regressions of realized residual returns on alphas, decay over time", 2, true],
      ["risk", "Check risk: realized vs predicted volatility (bias, QLIKE), Mahalanobis dispersion, minimum-variance tests; compare realized Sharpe under alternative risk models", 2, true],
    ]),
  short(m(EE, "explain-mitigate", "explain", 9, 150, "List ways to reduce the Sharpe lost to estimation error."),
    [
      ["inputs", "Better inputs: shrink alphas toward zero or a prior, use well-tested factor risk models with eigenvalue shrinkage", 2, true],
      ["regularize", "Regularize the optimization: penalties, robust formulations, sensible constraints; monitor SRE drivers continuously", 2, true],
    ]),
  num(m(EE, "apply-sre-general", "apply", 9, 60, "True $\\boldsymbol{\\Omega} = \\mathbf{I}$, alphas $[2, 1]$. Estimated alphas $[1, 1]$ and estimated covariance $\\text{diag}(1, 2)$, so $\\mathbf{w} \\propto [1, 0.5]$. Find the SRE."), 1),
  mcq(m(EE, "apply-lucky", "apply", 9, 40, "The previous item's SRE equals $1$ despite both inputs being wrong. This illustrates that:"),
    "Errors can cancel — the SRE depends only on the direction of $\\hat{\\boldsymbol{\\Omega}}^{-1}\\hat{\\boldsymbol{\\alpha}}$ relative to the optimum",
    [
      ["Wrong inputs always cancel", "lucky-always", "Usually they compound."],
      ["Alphas don't matter", "lucky-alpha", "They do."],
      ["The covariance doesn't matter", "lucky-cov", "It does."],
    ]),
  // level 10
  short(m(EE, "judge-error-budget", "transfer", 10, 180, "A team must decide whether to spend its research budget on better alphas or a better risk model. Use the SRE framework to argue."),
    [
      ["alpha", "Alpha errors typically dominate: the SRE from alpha error is the cosine between forecast and true whitened alphas, which is usually far from one", 2, true],
      ["risk", "But risk errors matter when they are uneven across directions (weak factors, misestimated small eigenvalues) and for strategies with high breadth; measure both before deciding", 2, true],
    ]),
  short(m(EE, "judge-capacity-choice", "transfer", 10, 180, "A fund can run a strategy at Sharpe $3$ with small size, or at Sharpe $2$ with three times the PnL. Which should it choose?"),
    [
      ["depends", "It depends on objectives: absolute PnL and fees favour size; investors' risk-adjusted preferences and drawdown limits favour the higher Sharpe", 2, true],
      ["analysis", "Use the trade-off curve (Sharpe versus return on GMV/PnL), costs, capacity and the uncertainty of each estimate", 2, true],
    ]),
  num(m(EE, "apply-sre-3asset", "apply", 10, 90, "True $\\boldsymbol{\\Omega} = \\mathbf{I}$, true alphas $[1, 2, 2]$. A forecast gets alphas $[1, 2, 0]$ and the covariance right. Find the SRE. Give $4$ decimal places."), 0.7454),
  mcq(m(EE, "judge-shrink-alpha", "transfer", 10, 60, "Shrinking all alphas toward zero by the same factor, with a volatility budget, changes the SRE by:"),
    "Nothing — only the alphas' direction matters; shrinkage toward a structured prior (not zero) can change it",
    [
      ["Raising it", "shrinkalpha-raise", "A common scale factor doesn't change the direction."],
      ["Lowering it", "shrinkalpha-lower", "Same direction, same SRE."],
      ["Making it zero", "shrinkalpha-zero", "Direction is unchanged."],
    ]),
];

export const qi09Items: Item[] = [...constrained, ...estimationError];
