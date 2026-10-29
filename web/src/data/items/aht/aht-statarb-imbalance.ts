import type { Item } from "../../../lib/assessment/types";
import { chapter } from "./shared";

/** Ch. 11–12: pairs trading, cointegrated portfolios with short-term alpha, order imbalance, liquidation with imbalance (40 items per lesson). */

const PT = "pairs-trading-optimal-bands";
const CI = "cointegrated-portfolios-short-term-alpha";
const OI = "order-imbalance-models";
const LI = "liquidation-with-order-imbalance";
const c113 = chapter("Ch. 11, Pairs Trading and Statistical Arbitrage Strategies (§11.1–11.3)");
const c114 = chapter("Ch. 11, Pairs Trading and Statistical Arbitrage Strategies (§11.4)");
const c12 = chapter("Ch. 12, Order Imbalance (§12.1–12.3)");
const c124 = chapter("Ch. 12, Order Imbalance (§12.4 Optimal Liquidation)");

const pairs: Item[] = [
  // level 1
  c113.m(PT, "recall-statarb", 1, "Pairs trading is called statistical arbitrage because:",
    "It bets that a mean-reverting combination of prices returns to its mean, which is likely but not guaranteed", [
      ["It is a riskless arbitrage", "The relationship can break down; it is not riskless."],
      ["It uses only statistics, not prices", "It trades on prices."],
      ["Regulators define it that way", "The name reflects its probabilistic nature."],
    ]),
  c113.m(PT, "recall-coint-factor", 1, "The co-integration factor of two assets is:",
    "A linear combination $\\varepsilon_t = AS^{(1)}_t + BS^{(2)}_t$ that is stationary even though each price is not", [
      ["The correlation of their returns", "Correlated returns do not imply a stationary combination."],
      ["The ratio of their volatilities", "That is not a stationary combination of prices."],
      ["The sum of their prices", "Only special weights give stationarity."],
    ]),
  c113.m(PT, "recall-ad-hoc", 1, "The ad hoc band strategy of Section 11.2:",
    "Enters long (short) when the factor falls below (rises above) a band one standard deviation from its mean, and exits at the mean", [
      ["Holds the portfolio permanently", "It enters and exits."],
      ["Trades at fixed times", "Entry and exit depend on the factor’s level."],
      ["Uses optimal stopping", "That is Section 11.3."],
    ]),
  c113.m(PT, "recall-ou", 1, "In Section 11.3, the co-integration factor is modelled as:",
    "An Ornstein–Uhlenbeck process $d\\varepsilon_t = \\kappa(\\theta - \\varepsilon_t)dt + \\sigma dW_t$", [
      ["Geometric Brownian motion", "GBM does not mean-revert."],
      ["A Poisson process", "The factor is continuous."],
      ["A deterministic sine wave", "It is stochastic."],
    ]),

  // level 2
  c113.n(PT, "apply-stationary-sd", 2,
    "For an OU factor with $\\kappa = 2$ per day and $\\sigma = 0.2$ per $\\sqrt{\\text{day}}$, the stationary standard deviation is $\\sigma/\\sqrt{2\\kappa}$. Compute it.",
    0.1),
  c113.n(PT, "apply-half-life", 2,
    "With $\\kappa = 2$ per day, what is the half-life of deviations, $\\ln 2/\\kappa$, in days? Give $4$ decimal places.",
    0.3466),
  c113.n(PT, "apply-portfolio-value", 2,
    "The portfolio is long $0.95$ shares of INTC and short $0.63$ shares of SMH. With prices \\$25.00 and \\$38.00, what is its value?",
    -0.19),
  c113.m(PT, "recall-exit-at-mean", 2, "In the ad hoc strategy, profits per round trip are concentrated near multiples of the band width because:",
    "Each completed trade enters at a band and exits at the mean, earning about the band width", [
      ["Prices are discrete", "The concentration comes from the entry and exit rules."],
      ["The factor is constant", "It fluctuates."],
      ["Fees are fixed", "Fees shift, but do not create, the multimodality."],
    ]),

  // level 3
  c113.n(PT, "apply-band-profit", 3,
    "A strategy enters long at $\\theta - 0.1$ and exits at $\\theta$, paying a transaction cost of $0.01$ on each leg. What is the profit per unit of the portfolio?",
    0.08),
  c113.n(PT, "apply-ou-expected", 3,
    "Starting at $\\varepsilon_0 = \\theta - 0.1$ with $\\kappa = 2$, what is the expected deviation from $\\theta$ after $0.5$ days? Give $4$ decimal places.",
    -0.0368),
  c113.m(PT, "apply-wider-bands", 3, "Compared with narrow bands, wider bands produce:",
    "Larger profit per completed trade but fewer trades and a higher chance of an open position at the end", [
      ["More trades", "Wider bands are reached less often."],
      ["No change in profits", "Both profit per trade and frequency change."],
      ["Lower profit per trade", "Each trade captures more."],
    ]),
  c113.m(PT, "apply-sharpe-bands", 3, "Figure 11.3 shows that the Sharpe ratio of the ad hoc strategy as a function of band width:",
    "First increases and then decreases", [
      ["Always increases", "Very wide bands trade too rarely."],
      ["Always decreases", "Very narrow bands earn too little per trade."],
      ["Is flat", "Band width matters."],
    ]),

  // level 4
  c113.n(PT, "apply-trade-count", 4,
    "Using the OU expected-time heuristic, if a band at one standard deviation is hit on average every $0.4$ days and each round trip lasts $0.3$ days, about how many round trips occur in $21$ trading days? Give $0$ decimal places.",
    30),
  c113.s(PT, "explain-exit-problem", 4,
    "Formulate the optimal exit problem for an agent who is long the co-integration portfolio.",
    "Writes $H_{+}(\\varepsilon) = \\sup_\\tau\\mathbb{E}[e^{-\\rho\\tau}(\\varepsilon_\\tau - c)]$, the discounted value of selling at the time $\\tau$, paying transaction cost $c$.",
    "Notes it is an optimal stopping problem with variational inequality $\\max\\{\\mathcal{L}H_{+} - \\rho H_{+},\\; (\\varepsilon - c) - H_{+}\\} = 0$, solved by a threshold $\\varepsilon^{*}$ above which she sells."),
  c113.n(PT, "apply-brownian-threshold", 4,
    "Ignoring mean reversion ($\\kappa \\to 0$), the exit threshold is $\\varepsilon^{*} = c + \\sigma/\\sqrt{2\\rho}$. With $c = 0.01$, $\\sigma = 0.2$ and $\\rho = 2$, compute it.",
    0.11),
  c113.m(PT, "apply-urgency-rho", 4, "The discount rate $\\rho$ in the exit problem acts like:",
    "An urgency parameter: higher $\\rho$ makes waiting costlier and lowers the exit threshold", [
      ["A transaction cost", "That is $c$."],
      ["Volatility", "That is $\\sigma$."],
      ["Mean-reversion speed", "That is $\\kappa$."],
    ]),

  // level 5
  c113.s(PT, "explain-entry-after-exit", 5,
    "Why is the optimal entry problem solved after the exit problem, and what is its payoff?",
    "Explains that entering at $\\varepsilon$ costs $\\varepsilon + c$ and gives the agent a long position whose value, if she exits optimally later, is $H_{+}(\\varepsilon)$.",
    "Concludes that the entry payoff is $H_{+}(\\varepsilon) - (\\varepsilon + c)$, so entry is a second stopping problem whose solution is a lower threshold $\\varepsilon_{*}$; she enters when the factor falls below it."),
  c113.n(PT, "apply-entry-exit-gap", 5,
    "Optimal entry is at $\\varepsilon_{*} = -0.08$ and exit at $\\varepsilon^{*} = 0.06$, with cost $c = 0.01$ per leg. What is the profit per completed round trip?",
    0.12),
  c113.m(PT, "apply-mean-reversion-effect", 5, "As the mean-reversion speed $\\kappa$ increases, the optimal exit threshold:",
    "Decreases, since the factor is pulled back to its mean more strongly and high levels are less likely to persist", [
      ["Increases", "Strong mean reversion makes waiting for high levels less rewarding."],
      ["Is unchanged", "$\\kappa$ affects the value of waiting."],
      ["Becomes infinite", "There is a finite threshold."],
    ]),
  c113.n(PT, "apply-hit-time", 5,
    "For an OU factor, the expected time to return from $\\theta - 2s$ to $\\theta$ (where $s$ is the stationary sd) is roughly $\\frac{1}{\\kappa}\\cdot 1.2$. With $\\kappa = 3$ per day, compute it in days.",
    0.4),

  // level 6
  c113.s(PT, "explain-value-functions", 6,
    "The book writes the exit value in the continuation region as $A\\,F(\\varepsilon)$, where $F$ solves $\\rho F = \\kappa(\\theta - \\varepsilon)F' + \\tfrac{1}{2}\\sigma^2F''$. Explain how the threshold is found.",
    "Explains that $F$ is the increasing solution (expressible via special functions or an integral), and the value in continuation is $AF(\\varepsilon)$, matched at the threshold to the exercise payoff.",
    "Uses value matching $AF(\\varepsilon^{*}) = \\varepsilon^{*} - c$ and smooth pasting $AF'(\\varepsilon^{*}) = 1$; dividing gives $F(\\varepsilon^{*}) = (\\varepsilon^{*} - c)F'(\\varepsilon^{*})$, solved numerically."),
  c113.n(PT, "apply-smooth-pasting-ratio", 6,
    "If at the threshold $F(\\varepsilon^{*})/F'(\\varepsilon^{*}) = 0.05$ and $c = 0.01$, what is $\\varepsilon^{*}$?",
    0.06),
  c113.m(PT, "apply-double-sided", 6, "In the double-sided entry–exit problem, the agent can enter either long or short. The optimal entry rule is:",
    "Enter long below a lower trigger and short above an upper trigger, with a no-trade region between", [
      ["Always be long", "She can be short too."],
      ["Enter at the mean", "Entry happens at extreme levels."],
      ["Enter randomly", "Entry follows triggers."],
    ]),
  c113.n(PT, "apply-symmetric-trigger", 6,
    "For a symmetric OU around $\\theta = 0$, the long-entry trigger is $\\varepsilon_{-} = -0.07$. By symmetry, what is the short-entry trigger?",
    0.07),

  // level 7
  c113.s(PT, "explain-coint-estimation", 7,
    "How would you estimate the co-integration weights $A$ and $B$ and the OU parameters for a pair?",
    "Proposes regressing one log price on the other (Engle–Granger) or estimating a VAR/VECM (Johansen) to find the stationary combination, normalising the weights.",
    "Proposes fitting an AR(1) to the factor at sampling interval $\\Delta t$: $\\varepsilon_{t+\\Delta} = a + b\\varepsilon_t + e$, giving $\\kappa = -\\ln b/\\Delta t$, $\\theta = a/(1 - b)$ and $\\sigma$ from the residual variance."),
  c113.n(PT, "apply-ar-to-kappa", 7,
    "An AR(1) on the factor at $1$-minute steps gives $b = 0.99$. With $390$ minutes per day, what is $\\kappa$ per day, $-\\ln b \\times 390$? Give $3$ decimal places.",
    3.92),
  c113.m(PT, "apply-multimodal", 7, "The P&L distribution of the ad hoc strategy is multimodal mainly because:",
    "Completed trades each earn about one band width, so P&L clusters at integer multiples, smeared by trades still open at the end", [
      ["Prices are lognormal", "That does not produce multimodality."],
      ["The factor jumps", "The factor is continuous."],
      ["Transaction costs vary", "They are fixed."],
    ]),
  c113.n(PT, "apply-ou-sigma-from-resid", 7,
    "With AR(1) $b = 0.99$ at $1$-minute steps and residual standard deviation $0.002$, the OU volatility is $\\sigma \\approx s_e\\sqrt{\\frac{2\\kappa}{1 - b^2}}$ with $\\kappa$ per minute. Compute $\\sigma$ per $\\sqrt{\\text{minute}}$. Give $5$ decimal places.",
    0.00201),

  // level 8
  c113.s(PT, "explain-entry-exit-asymmetry", 8,
    "Figures 11.4–11.5 show the entry and exit triggers are not symmetric around the mean. Explain why the discount factor and transaction costs create this asymmetry.",
    "Explains that transaction costs are paid at both entry and exit, so the agent needs a larger deviation to make a trade worthwhile, pushing entry further from the mean.",
    "Explains that discounting makes future gains worth less, so she exits earlier (closer to or below the mean) rather than waiting, and the entry trigger is set considering that discounted exit value."),
  c113.n(PT, "apply-expected-profit-rate", 8,
    "Each round trip earns $0.12$ and takes on average $0.5$ days, including waiting to enter. What is the expected profit per $21$-day month?",
    5.04),
  c113.m(PT, "apply-break-risk", 8, "The main risk not captured by the OU optimal-stopping model is:",
    "A structural break in the co-integration relationship, after which the factor no longer mean-reverts", [
      ["Volatility of the factor", "That is in the model."],
      ["Transaction costs", "Those are in the model."],
      ["Discounting", "That is in the model."],
    ]),
  c113.n(PT, "apply-stop-loss", 8,
    "A trader adds a stop-loss at $\\theta - 0.3$ to a long entered at $\\theta - 0.1$. With stationary sd $0.1$, how many standard deviations below entry is the stop?",
    2),

  // level 9
  c113.s(PT, "transfer-pairs-design", 9,
    "Design a pairs-trading strategy for INTC and SMH using this chapter’s results. Include estimation, triggers, risk controls and evaluation.",
    "Estimates the co-integration weights and OU parameters on a rolling window, solves for optimal entry and exit triggers given costs and urgency $\\rho$, and trades the portfolio when triggers are hit.",
    "Adds risk controls (stop-losses, maximum holding time, monitoring stationarity tests for breaks) and evaluates out of sample on Sharpe, drawdown and the P&L split between completed and open trades."),
  c113.n(PT, "apply-sharpe-calc", 9,
    "A pairs strategy earns a mean daily P&L of $0.24$ with a daily standard deviation of $0.6$. What is its annualised Sharpe ratio over $252$ days? Give $2$ decimal places.",
    6.35),
  c113.m(PT, "transfer-latency", 9, "At high frequency, executing both legs of a pair simultaneously matters because:",
    "A delay between legs leaves an unhedged position exposed to price moves, eroding the small expected profit", [
      ["Exchanges require it", "It is an economic reason."],
      ["It increases the band width", "It reduces leg risk."],
      ["It changes the co-integration weights", "Weights are estimated separately."],
    ]),
  c113.s(PT, "transfer-many-pairs", 9,
    "You run the strategy on $100$ pairs. What new issues arise compared with a single pair?",
    "Notes data snooping and multiple testing: some pairs look cointegrated by chance, so out-of-sample validation and corrections are needed.",
    "Notes portfolio-level risks: pairs may share factors (sector shocks), so P&L is correlated, requiring capital allocation and risk limits across pairs."),

  // level 10
  c113.s(PT, "transfer-optimal-vs-adhoc", 10,
    "When would the optimal-stopping triggers outperform the ad hoc one-standard-deviation bands, and when might the ad hoc rule be preferable in practice?",
    "Explains that optimal triggers account for costs, discounting and mean-reversion speed, so they outperform when costs are material or reversion is slow or fast relative to the horizon.",
    "Explains that ad hoc bands may be preferable when parameters are poorly estimated or unstable, since they are robust and transparent, and optimal triggers can be sensitive to $\\kappa$ and $\\sigma$."),
  c113.n(PT, "apply-break-even-cost", 10,
    "Entering at $\\theta - 0.1$ and exiting at $\\theta$, what per-leg transaction cost makes the round trip break even?",
    0.05),
  c113.s(PT, "transfer-regime-switch", 10,
    "Extend the model to allow the mean-reversion level $\\theta$ to switch between two values. How would the optimal strategy change?",
    "Proposes a regime-switching OU (Markov chain for $\\theta$), so the value functions depend on the regime and satisfy coupled VIs.",
    "Predicts regime-dependent triggers, and that uncertainty about the current regime calls for filtering, with caution in entering positions that would be losers if the regime has changed."),
  c113.m(PT, "transfer-capacity", 10, "The capacity of a high-frequency pairs strategy is limited mainly by:",
    "Market impact and spreads on both legs, which grow with position size and erode the small expected deviation", [
      ["The number of pairs", "Capacity per pair is limited by impact."],
      ["The OU volatility alone", "Volatility creates opportunities; impact limits size."],
      ["Discounting", "Discounting affects triggers, not capacity."],
    ]),
];

const coint: Item[] = [
  // level 1
  c114.m(CI, "recall-setup", 1, "Section 11.4 models a collection of assets whose:",
    "Log prices share a mean-reverting co-integration factor that acts as a short-term drift", [
      ["Prices are independent", "They are linked by co-integration."],
      ["Returns are identical", "They differ but share a factor."],
      ["Prices are deterministic", "They are stochastic."],
    ]),
  c114.m(CI, "recall-objective", 1, "The investor in Section 11.4 maximises:",
    "Expected exponential utility of terminal wealth, choosing dollar positions in the assets", [
      ["Expected wealth with a running penalty", "The objective is CARA utility."],
      ["The Sharpe ratio", "The objective is utility."],
      ["Fill rates", "There are no LOs here."],
    ]),
  c114.m(CI, "recall-alpha", 1, "When the co-integration factor $\\alpha_t$ is zero, the assets follow:",
    "Correlated geometric Brownian motions", [
      ["OU processes", "Prices themselves are GBM-like; the factor mean-reverts."],
      ["Poisson processes", "Prices are continuous."],
      ["Constant prices", "They still diffuse."],
    ]),
  c114.m(CI, "recall-var-form", 1, "The continuous-time model can also be written in discrete time as:",
    "A vector autoregression (VAR) with a singular coefficient matrix due to co-integration", [
      ["Independent AR(1) processes", "The assets are linked."],
      ["A random walk with no structure", "Co-integration adds an error-correction term."],
      ["A GARCH model", "The model is in levels, not volatility."],
    ]),

  // level 2
  c114.n(CI, "apply-factor-value", 2,
    "The factor is $\\alpha = 0.6\\log Y_1 - 0.6\\log Y_2$. With $\\log Y_1 = 3.2$ and $\\log Y_2 = 3.1$, compute $\\alpha$. Give $2$ decimal places.",
    0.06),
  c114.n(CI, "apply-factor-decay", 2,
    "If $\\alpha$ mean-reverts to $0$ at rate $5$ per day, what is its expected value after $0.2$ days starting from $0.06$? Give $4$ decimal places.",
    0.0221),
  c114.n(CI, "apply-merton-single", 2,
    "With one asset of drift $0.1$ (from the factor), volatility $0.2$, CARA $\\gamma = 0.001$ and $r = 0$, the optimal dollar position is $\\frac{\\mu}{\\gamma\\sigma^2}$. Compute it.",
    2500),
  c114.m(CI, "recall-linear-alpha", 2, "The optimal dollar investment in Section 11.4 scales:",
    "Linearly with the co-integration factor $\\alpha_t$, with time-varying coefficients", [
      ["With wealth", "With CARA utility, wealth does not enter."],
      ["Quadratically with $\\alpha$", "The position is linear; the value is quadratic."],
      ["Not at all with $\\alpha$", "The factor drives the drift."],
    ]),

  // level 3
  c114.n(CI, "apply-two-asset", 3,
    "Two uncorrelated assets with drifts $0.05$ and $-0.03$, volatilities $0.2$ and $0.1$, and CARA $\\gamma = 0.001$. What is the optimal dollar position in asset $2$, $\\frac{\\mu_2}{\\gamma\\sigma_2^2}$?",
    -3000),
  c114.m(CI, "apply-ansatz", 3, "The ansatz used for the value function is:",
    "$H = -\\exp\\{-\\gamma(x + h(t, \\alpha))\\}$, removing dependence on the prices themselves", [
      ["$H = x + qS + h$", "That ansatz is for the penalised execution problems."],
      ["$H = \\log x$", "Utility is exponential."],
      ["$H = h(t)$", "It depends on wealth and the factor."],
    ]),
  c114.n(CI, "apply-hedge-ratio", 3,
    "A pair has factor $\\alpha = \\log Y_1 - 0.8\\log Y_2$. To build a position with $\\$1{,}000$ of exposure to $\\log Y_1$, how many dollars of $Y_2$ should be shorted to keep exposure to the factor only (dollar positions proportional to the weights)?",
    800),
  c114.m(CI, "apply-measure-change", 3, "The book solves the PDE for $h$ by changing to a measure under which:",
    "The drift of the asset prices is removed, so the quadratic dependence on $\\alpha$ appears via an expectation", [
      ["Volatility is zero", "Volatility remains."],
      ["$\\alpha$ is constant", "$\\alpha$ still evolves."],
      ["Wealth is constant", "Wealth evolves with the investment."],
    ]),

  // level 4
  c114.n(CI, "apply-ou-variance", 4,
    "If $\\alpha$ follows an OU process with rate $\\kappa = 5$ per day and volatility $0.1$ per $\\sqrt{\\text{day}}$, what is its stationary variance? Give $4$ decimal places.",
    0.001),
  c114.s(CI, "explain-alpha-as-drift", 4,
    "Explain how a co-integration factor acts as “short-term alpha” in the drift of log prices.",
    "Explains that each log price drift includes a term $b_i\\alpha_t$: when the factor is away from its mean, assets that should correct it are expected to move in that direction.",
    "Notes that because $\\alpha$ mean-reverts, the predictable drift is temporary, so the profitable position changes sign and size as $\\alpha$ moves."),
  c114.n(CI, "apply-expected-gain", 4,
    "A position of \\$2{,}500 in an asset with drift $0.1$ per day earns an expected \\$X per day. Compute $X$.",
    250),
  c114.m(CI, "apply-time-varying-coef", 4, "Why does the size of the investment vary with time even for a fixed $\\alpha$?",
    "Because the remaining horizon affects how much of the factor’s future mean reversion can be captured and how risk accumulates", [
      ["Because prices change", "The position depends on $\\alpha$ and time, not price levels."],
      ["Because wealth grows", "CARA removes wealth."],
      ["It does not", "The coefficients are time-dependent."],
    ]),

  // level 5
  c114.s(CI, "explain-singular-b", 5,
    "In the VAR representation, the matrix multiplying lagged log prices is singular with one positive eigenvalue. What does this mean?",
    "Explains that singularity reflects co-integration: only one direction (the co-integrating vector) mean-reverts, while the other combinations follow random walks.",
    "Interprets the single non-zero eigenvalue as the speed of mean reversion of the co-integration factor."),
  c114.n(CI, "apply-portfolio-variance", 5,
    "Positions of \\$2{,}500 and $-\\$3{,}000$ in uncorrelated assets with daily volatilities $0.02$ and $0.01$. What is the daily dollar variance of the portfolio?",
    3400),
  c114.m(CI, "apply-hedging-role", 5, "Holding offsetting positions in co-integrated assets mainly serves to:",
    "Hedge the common random-walk component, leaving exposure mostly to the mean-reverting factor", [
      ["Increase market exposure", "Offsetting positions reduce it."],
      ["Eliminate all risk", "Residual risk remains."],
      ["Avoid transaction costs", "Costs are not removed."],
    ]),
  c114.n(CI, "apply-ce-gain", 5,
    "For one asset with constant drift $\\mu = 0.1$ and volatility $0.2$ per day, a CARA investor with $\\gamma = 0.001$ gains a certainty equivalent of $\\frac{\\mu^2}{2\\gamma\\sigma^2}$ per day. Compute it.",
    125),

  // level 6
  c114.s(CI, "explain-solution-structure", 6,
    "Describe the structure of the solution $h(t, \\alpha)$ and the optimal investment.",
    "States that $h$ is quadratic in $\\alpha$, $h = h_0(t) + h_1(t)\\alpha + h_2(t)\\alpha^2$, determined by ODEs from the PDE after substituting the optimal control.",
    "States that the optimal dollar vector is $\\boldsymbol{\\pi}^{*} = \\frac{1}{\\gamma}\\Sigma^{-1}(\\mathbf{b}\\alpha_t + \\text{correction from }\\partial_\\alpha h)$, linear in $\\alpha$, combining a Merton-like term with a hedge against changes in $\\alpha$."),
  c114.n(CI, "apply-merton-matrix", 6,
    "Two correlated assets with $\\Sigma = \\begin{bmatrix} 0.04 & 0.02 \\\\ 0.02 & 0.04 \\end{bmatrix}$ and drifts $\\boldsymbol{\\mu} = [0.02, -0.02]$. With $\\gamma = 0.001$, the Merton position is $\\frac{1}{\\gamma}\\Sigma^{-1}\\boldsymbol{\\mu}$. What is the position in asset $1$?",
    1000),
  c114.m(CI, "apply-intertemporal-hedge", 6, "Besides the myopic Merton-like term, the optimal position includes an intertemporal hedging term because:",
    "Changes in $\\alpha$ alter future investment opportunities, and these changes are correlated with asset returns", [
      ["Transaction costs require it", "There are no transaction costs in the model."],
      ["Regulations require hedging", "The term comes from optimisation."],
      ["Wealth effects", "CARA removes wealth effects."],
    ]),
  c114.n(CI, "apply-factor-sd", 6,
    "With stationary variance $0.001$ of $\\alpha$, what is a two-standard-deviation level of $\\alpha$? Give $4$ decimal places.",
    0.0632),

  // level 7
  c114.s(CI, "explain-numerical-results", 7,
    "What do the numerical experiments of Section 11.4.4 typically show about the strategy’s positions and P&L?",
    "Notes that positions move with the factor: long the assets expected to rise and short those expected to fall, reversing as $\\alpha$ crosses its mean.",
    "Notes that the P&L grows steadily with occasional drawdowns when the factor moves further from its mean before reverting, and that risk aversion scales positions down."),
  c114.n(CI, "apply-portfolio-sd", 7,
    "With daily dollar variance $3{,}400$, what is the daily dollar standard deviation? Give $2$ decimal places.",
    58.31),
  c114.m(CI, "apply-gamma-scale", 7, "Doubling the investor’s risk aversion $\\gamma$:",
    "Halves all optimal dollar positions", [
      ["Doubles positions", "Positions are inversely proportional to $\\gamma$."],
      ["Leaves positions unchanged", "CARA positions scale with $1/\\gamma$."],
      ["Changes the sign of positions", "Signs depend on $\\alpha$."],
    ]),
  c114.n(CI, "apply-minimum-variance-hedge", 7,
    "To hedge \\$1{,}000 in asset $1$ with asset $2$, using daily volatilities $0.02$ and $0.025$ and correlation $0.9$, the minimum-variance hedge is $-1{,}000\\rho\\sigma_1/\\sigma_2$ dollars. Compute it.",
    -720),

  // level 8
  c114.s(CI, "explain-model-vs-pairs", 8,
    "Contrast the Section 11.4 approach with the optimal entry–exit bands of Section 11.3.",
    "Explains that Section 11.3 takes discrete positions (in or out of the portfolio) with costs, deciding when via optimal stopping.",
    "Explains that Section 11.4 holds continuously adjusted positions in each asset, sized by utility maximisation, without transaction costs, so it trades constantly in proportion to the factor."),
  c114.n(CI, "apply-turnover-cost", 8,
    "A strategy adjusts positions by \\$40{,}000 per day on average, and trading costs are $2$ basis points of traded value. What are its daily trading costs, in dollars?",
    8),
  c114.m(CI, "apply-no-cost-assumption", 8, "Ignoring transaction costs in Section 11.4 most likely leads to:",
    "Overtrading in practice, since the strategy rebalances continuously with $\\alpha$", [
      ["Undertrading", "It trades continuously."],
      ["No effect", "Costs would reduce optimal trading."],
      ["Lower risk", "Costs do not change risk directly."],
    ]),
  c114.n(CI, "apply-factor-ar", 8,
    "A discrete VAR implies the factor follows $\\alpha_{t+1} = 0.95\\alpha_t + e$. What is the continuous mean-reversion rate per step, $-\\ln 0.95$? Give $4$ decimal places.",
    0.0513),

  // level 9
  c114.s(CI, "transfer-add-costs", 9,
    "How would you add proportional transaction costs to the Section 11.4 model, and how would the strategy change?",
    "Proposes including a cost proportional to trading speed or to trades, leading to a singular control problem or a penalised speed (as in Chapter 6) with impact.",
    "Predicts a no-trade region: positions adjust only when they drift sufficiently far from the frictionless target, reducing turnover."),
  c114.n(CI, "apply-capacity", 9,
    "The strategy expects to earn $1.5$ bps per day on gross exposure, and costs scale as $0.2$ bps per day per \\$1 million of exposure (from impact). At what exposure, in millions of dollars, are profits maximised, where profit $= 1.5E - 0.2E^2$ bps-dollars? Give $2$ decimal places.",
    3.75),
  c114.m(CI, "transfer-many-assets", 9, "With many assets, estimating the co-integration structure is hard mainly because:",
    "The number of parameters grows quickly and spurious co-integration becomes likely", [
      ["Prices are not observable", "Prices are observed."],
      ["There are no factors", "Factors exist but are hard to estimate."],
      ["Utility is undefined", "Utility is well defined."],
    ]),
  c114.s(CI, "transfer-robustness", 9,
    "The strategy depends on estimates of the co-integration weights, the mean-reversion speed and covariances. How would you make it robust?",
    "Proposes shrinkage or regularisation of estimates, rolling re-estimation, and testing stationarity out of sample.",
    "Proposes scaling positions down (higher effective $\\gamma$), position limits, and monitoring for structural breaks with automatic de-risking."),

  // level 10
  c114.s(CI, "transfer-hft-version", 10,
    "Adapt the Section 11.4 idea to high-frequency trading in an ETF and its constituents. What changes?",
    "Explains that the ETF price and the basket value are co-integrated (creation/redemption), so the deviation acts as short-term alpha for trading the ETF against the basket or a subset.",
    "Notes that at high frequency, latency, spreads, fees and the cost of trading many constituents dominate, so one trades a liquid proxy, uses LOs, and must model execution as in Chapters 8 and 10."),
  c114.n(CI, "apply-sharpe-ou", 10,
    "A strategy’s daily P&L has mean \\$125 and standard deviation \\$500. Over $252$ days, what is the annualised Sharpe ratio? Give $2$ decimal places.",
    3.97),
  c114.s(CI, "transfer-equilibrium", 10,
    "If many investors trade the same co-integration factor, what happens to its mean-reversion speed and to profitability?",
    "Argues that more arbitrage capital pushes the factor back faster, raising $\\kappa$ and lowering the size and duration of deviations.",
    "Concludes that profits per unit of capital fall, crowding risk rises (simultaneous unwinds can widen deviations), and capacity is limited."),
  c114.m(CI, "transfer-model-choice", 10, "For a long-horizon investor rather than an intraday trader, the Section 11.4 model is less suitable mainly because:",
    "Co-integration relationships and their speeds are less stable over long horizons, and the model ignores costs and fundamental changes", [
      ["Utility is undefined over long horizons", "Utility is well defined."],
      ["Mean reversion is faster over long horizons", "Stability, not speed, is the issue."],
      ["It requires LOs", "It uses dollar positions."],
    ]),
];

const imbalance: Item[] = [
  // level 1
  c12.m(OI, "recall-imbalance", 1, "Volume order imbalance at the touch is defined as:",
    "$\\rho_t = \\frac{V^b_t - V^a_t}{V^b_t + V^a_t}$, the normalised difference between bid and ask queue sizes", [
      ["The difference between buy and sell MO volume", "That is order flow, not quoted imbalance."],
      ["The spread divided by the midprice", "That is a relative spread."],
      ["The number of price levels", "Imbalance compares volumes."],
    ]),
  c12.m(OI, "recall-range", 1, "Order imbalance $\\rho_t$ takes values in:",
    "$[-1, 1]$, with $1$ meaning all posted volume is on the bid", [
      ["$[0, 1]$", "It can be negative when the ask side is heavier."],
      ["Any real number", "It is normalised."],
      ["$\\lbrace -1, 1 \\rbrace$ only", "It varies continuously."],
    ]),
  c12.m(OI, "recall-predictive", 1, "Empirically, order imbalance is:",
    "Positively correlated with subsequent price changes and with the arrival of buy MOs", [
      ["Unrelated to prices", "It predicts direction."],
      ["Negatively correlated with price changes", "A heavier bid predicts up-moves."],
      ["Only relevant at the open", "It matters throughout."],
    ]),
  c12.m(OI, "recall-regimes", 1, "In Chapter 12, order imbalance is discretised into:",
    "Regimes (buckets of the imbalance range), modelled as a Markov chain", [
      ["A continuous diffusion", "It is discretised into regimes."],
      ["A single number per day", "It is modelled intraday."],
      ["Independent draws", "It is persistent."],
    ]),

  // level 2
  c12.n(OI, "apply-imbalance", 2,
    "The bid queue has $300$ shares and the ask queue $100$. Compute $\\rho$.",
    0.5),
  c12.n(OI, "apply-regime", 2,
    "The range $[-1, 1]$ is split into $5$ equal regimes, numbered $1$ to $5$ from $-1$. Which regime contains $\\rho = 0.5$?",
    4),
  c12.n(OI, "apply-transition-mle", 2,
    "From regime $2$, the chain moved to regime $1$ $30$ times, stayed in $2$ $150$ times and moved to $3$ $20$ times. What is the MLE of $\\Pr(2 \\to 2)$?",
    0.75),
  c12.m(OI, "recall-mle", 2, "The MLE of a discrete Markov chain’s transition probabilities is:",
    "The fraction of transitions out of each state that go to each destination, $\\hat{A}_{ij} = n_{ij}/\\sum_k n_{ik}$", [
      ["The fraction of time spent in each state", "That estimates the stationary distribution."],
      ["Equal probabilities", "That ignores the data."],
      ["The correlation between successive states", "Transition counts give the MLE."],
    ]),

  // level 3
  c12.n(OI, "apply-stationary-two", 3,
    "A two-regime chain has $\\Pr(1 \\to 2) = 0.1$ and $\\Pr(2 \\to 1) = 0.3$ per step. What is the stationary probability of regime $1$?",
    0.75),
  c12.n(OI, "apply-expected-duration", 3,
    "With $\\Pr(\\text{stay}) = 0.75$ per $100$ ms step, what is the expected time spent in the regime before leaving, in ms?",
    400),
  c12.m(OI, "apply-mo-regime", 3, "Figure 12.2 shows buy MOs arrive more often when:",
    "The book is bid-heavy (imbalance near $+1$)", [
      ["The book is ask-heavy", "Buy MOs cluster when the bid side is heavy."],
      ["Imbalance is zero", "Arrivals are biased toward high imbalance."],
      ["The spread is widest", "The figure relates arrivals to imbalance."],
    ]),
  c12.m(OI, "apply-adjacent", 3, "The estimated transition matrix shows the chain mostly moves:",
    "Between neighbouring regimes", [
      ["Directly between extreme regimes", "Jumps between extremes are rare."],
      ["Uniformly to any regime", "Transitions are local."],
      ["Never", "It moves frequently."],
    ]),

  // level 4
  c12.n(OI, "apply-generator-rate", 4,
    "For a continuous-time chain, the expected holding time in a state is $1/|G_{ii}|$. If $|G_{ii}| = 2.5$ per second, what is the expected holding time in ms?",
    400),
  c12.n(OI, "apply-two-state-generator", 4,
    "Convert a two-state transition matrix with $p = \\Pr(1 \\to 2) = 0.1$ and $q = \\Pr(2 \\to 1) = 0.3$ over $\\Delta t = 0.1$ s into a generator. The rate out of state $1$ is $\\frac{-\\ln(1 - p - q)}{(p + q)\\Delta t}p$. Compute it per second. Give $4$ decimal places.",
    1.2771),
  c12.s(OI, "explain-matrix-log", 4,
    "Explain how a discrete-time transition matrix estimated at $100$ ms is turned into a continuous-time generator, and one pitfall.",
    "Explains that if $P(\\Delta t) = e^{G\\Delta t}$, then $G = \\frac{1}{\\Delta t}\\log P$ via the matrix logarithm, giving rates of leaving each state and of moving between states.",
    "Names a pitfall: the matrix logarithm may not exist or may give negative off-diagonal entries (no valid generator), so one may need to project onto valid generators or estimate in continuous time directly."),
  c12.m(OI, "apply-price-change-cond", 4, "Table 12.1 conditions the price change after an MO on the imbalance regime. It shows that:",
    "Price moves after MOs depend on the regime: buy MOs in bid-heavy books are followed by larger up-moves", [
      ["Price changes are independent of imbalance", "The distribution varies by regime."],
      ["Prices always fall after buys", "They tend to rise."],
      ["Regimes only affect spreads", "They affect price changes."],
    ]),

  // level 5
  c12.n(OI, "apply-mo-likelihood", 5,
    "In regime $k$, buy MOs arrive as Poisson with rate $\\lambda_k$. Over $10$ seconds in a regime with $\\lambda = 1.2$ per second, $15$ buy MOs arrive. The MLE of $\\lambda$ for that regime is the count divided by time. Compute it.",
    1.5),
  c12.s(OI, "explain-joint-model", 5,
    "Describe the joint model of imbalance regimes and MO arrivals in Section 12.2.2.",
    "Explains that the regime $Z_t$ is a continuous-time Markov chain, and within regime $k$ buy and sell MOs arrive as Poisson processes with regime-specific rates $\\lambda^{\\pm}_k$.",
    "Explains that the likelihood combines the chain’s holding times and switches with the Poisson likelihood of MO counts in each epoch, giving closed-form MLEs for the generator entries and rates."),
  c12.n(OI, "apply-rate-mle", 5,
    "The chain spent a total of $480$ seconds in regime $3$ and left it $1{,}200$ times. What is the MLE of the total outflow rate from regime $3$?",
    2.5),
  c12.m(OI, "apply-sell-imbalance-flow", 5, "In the book’s ORCL estimates, total sell MO arrival rates exceed buy rates. This indicates that imbalance is:",
    "Informative about the direction of MOs, not merely symmetric noise", [
      ["Uninformative", "Rates differ systematically by regime."],
      ["Always zero", "Imbalance varies."],
      ["Determined by the spread", "Regimes are defined by volumes."],
    ]),

  // level 6
  c12.s(OI, "explain-why-predictive", 6,
    "Why might order imbalance predict the next price move and MO arrivals?",
    "Explains that a thin ask queue is more easily depleted by buy MOs, so the ask is more likely to move up; and heavy bids may reflect buying interest that leads to more buy MOs.",
    "Notes that liquidity providers see the same imbalance and may adjust quotes, reinforcing the move, so imbalance summarises short-term supply and demand pressure."),
  c12.n(OI, "apply-depth-levels", 6,
    "Using the best two levels, bid volumes are $300$ and $400$, ask volumes $200$ and $100$. Compute the two-level imbalance. Give $4$ decimal places.",
    0.4),
  c12.m(OI, "apply-levels-tradeoff", 6, "Using more levels of the book to compute imbalance:",
    "Can add information but also noise, since deeper levels change through cancellations unrelated to the next move", [
      ["Always improves prediction", "Deeper levels can add noise."],
      ["Always worsens prediction", "Some studies find gains from a few levels."],
      ["Has no effect", "It changes the measure."],
    ]),
  c12.n(OI, "apply-stationary-three", 6,
    "A three-regime chain has stationary probabilities proportional to $[2, 5, 3]$. What is the stationary probability of the middle regime?",
    0.5),

  // level 7
  c12.s(OI, "explain-fda", 7,
    "Section 12.3 uses functional data analysis on daily imbalance–activity curves. What does FDA add, and how would you use it?",
    "Explains that each day’s curve of MO activity versus imbalance is treated as a function, and functional PCA finds the main modes of day-to-day variation with a few coefficients.",
    "Explains its use: tracking the coefficients over time to detect shifts in how imbalance relates to activity, and tweaking the intraday model to reflect daily features."),
  c12.n(OI, "apply-fpca-share", 7,
    "The first three functional principal components explain eigenvalues $6$, $2.5$ and $1$ out of a total of $10.5$. What fraction of variation do they explain? Give $4$ decimal places.",
    0.9048),
  c12.m(OI, "apply-jump-model", 7, "Section 12.2.3 models price jumps that occur:",
    "Both when MOs arrive and exogenously (from cancellations and additions), with regime-dependent distributions", [
      ["Only at MO arrivals", "Exogenous jumps are included too."],
      ["Never", "Jumps are central to the model."],
      ["Only at regime switches", "Jumps arise from orders and reshuffling."],
    ]),
  c12.n(OI, "apply-expected-jump", 7,
    "In a bid-heavy regime, a buy MO is followed by an up-tick with probability $0.6$, no change with $0.3$ and a down-tick with $0.1$. With a one-cent tick, what is the expected price change in cents?",
    0.5),

  // level 8
  c12.s(OI, "explain-estimation-pitfalls", 8,
    "What pitfalls arise in estimating the regime model from millisecond data?",
    "Notes that imbalance at the touch changes very fast and is noisy, so averaging windows (e.g. $100$ ms) affect the estimated chain, and instantaneous versus averaged imbalance give different estimates.",
    "Notes non-stationarity through the day, possible non-Markov dynamics, and that the discretisation into regimes is a modelling choice that should be tested out of sample."),
  c12.n(OI, "apply-loglik", 8,
    "In one epoch of length $2$ seconds in a regime with buy rate $\\lambda = 1.5$, exactly $3$ buy MOs arrive. The Poisson log-likelihood contribution is $3\\ln(\\lambda\\cdot 2) - \\lambda\\cdot 2 - \\ln 3!$. Compute it. Give $4$ decimal places.",
    -1.4959),
  c12.m(OI, "apply-predict-direction", 8, "With imbalance $0.8$ and the estimated conditional probability $0.7$ that the next midprice change is up, a market maker should:",
    "Skew quotes up: post the bid more aggressively and the ask deeper", [
      ["Post the ask more aggressively", "That sells before a likely rise."],
      ["Keep symmetric quotes", "The signal predicts direction."],
      ["Stop quoting entirely", "Skewing is sufficient."],
    ]),
  c12.n(OI, "apply-expected-time-switch", 8,
    "From the middle of three regimes, the rates to the two neighbours are $1.5$ and $1$ per second. What is the probability that the next switch goes to the first neighbour?",
    0.6),

  // level 9
  c12.s(OI, "transfer-signal", 9,
    "Build a short-term price prediction signal from order imbalance and validate it.",
    "Proposes computing imbalance (one or a few levels), discretising or using it continuously, and estimating the probability of the next midprice move up given imbalance, or the expected change over a horizon.",
    "Proposes validating out of sample with appropriate latency, measuring hit rates and the value of trading on the signal net of spreads and fees, and checking stability across days and regimes."),
  c12.n(OI, "apply-signal-value", 9,
    "A signal predicts the next tick direction correctly $60\\%$ of the time. With one-cent ticks and no cost, what is the expected gain per prediction, in cents?",
    0.2),
  c12.m(OI, "transfer-spoofing", 9, "A trader posts and quickly cancels large bids to make the book look bid-heavy. This is a problem for imbalance-based strategies because:",
    "It manipulates the signal, inducing others to buy or skew quotes, and is illegal spoofing", [
      ["It makes imbalance negative", "Large bids make it positive."],
      ["It has no effect", "It distorts the signal."],
      ["It improves prediction", "It degrades prediction."],
    ]),
  c12.s(OI, "transfer-regime-count", 9,
    "How would you choose the number of imbalance regimes?",
    "Proposes comparing models with different numbers of regimes by out-of-sample likelihood or information criteria (AIC/BIC), balancing resolution against estimation error.",
    "Notes practical criteria: whether more regimes improve the prediction of MO arrivals and price moves enough to change trading decisions; the book uses a few regimes (e.g. three or five)."),

  // level 10
  c12.s(OI, "transfer-microstructure-theory", 10,
    "Relate order imbalance to the microstructure theory of Chapter 2. Which model explains why imbalance predicts prices?",
    "Relates it to adverse selection: queues reflect the decisions of liquidity providers who may be informed, so imbalance carries information (as in Glosten–Milgrom and Kyle, order flow is informative).",
    "Relates it to mechanics: a thin queue is depleted by fewer MOs, so the price is more likely to move toward it, a supply-and-demand effect even without information; both mechanisms predict the same sign."),
  c12.n(OI, "apply-kl-regime", 10,
    "In regime A buy MOs arrive at rate $2$ and in regime B at rate $1$ per second. Observing $4$ buy MOs in $2$ seconds, what is the likelihood ratio $L_A/L_B = (2/1)^4e^{-(2 - 1)2}$? Give $4$ decimal places.",
    2.1654),
  c12.s(OI, "transfer-posterior-regime", 10,
    "If the current imbalance regime is observed with noise, how would you estimate it in real time, and how would the trading decision use it?",
    "Proposes a hidden-Markov filter: update the posterior probabilities of each regime using the transition matrix and the likelihood of observed MO arrivals and imbalance readings.",
    "Proposes using the posterior to average regime-dependent strategies (depths, MO timing), or to act only when one regime’s probability is high."),
  c12.m(OI, "transfer-imbalance-decay", 10, "The predictive power of imbalance for price moves typically:",
    "Decays quickly with the horizon, being strongest for the next few events", [
      ["Grows with the horizon", "Short-term information is quickly impounded."],
      ["Is constant", "It decays."],
      ["Is strongest at daily horizons", "It is a high-frequency signal."],
    ]),
];

const liquidation: Item[] = [
  // level 1
  c124.m(LI, "recall-setup", 1, "In Section 12.4, the liquidating agent:",
    "Posts sell LOs at a chosen depth, with MO arrival rates and price jumps depending on the imbalance regime", [
      ["Trades only with MOs", "She posts LOs."],
      ["Ignores the order book", "The imbalance regime drives her strategy."],
      ["Buys and sells", "She is liquidating."],
    ]),
  c124.m(LI, "recall-regimes", 1, "The model uses three imbalance regimes $Z_t \\in \\lbrace -1, 0, +1 \\rbrace$, meaning:",
    "Sell-heavy, neutral and buy-heavy books", [
      ["Low, medium and high volatility", "They classify imbalance."],
      ["Three venues", "There is one venue."],
      ["Three price levels", "They classify queue imbalance."],
    ]),
  c124.m(LI, "recall-value-depends", 1, "Her value function depends on the regime because:",
    "The regime determines how often buy MOs arrive to fill her and how the price is likely to move", [
      ["The regime sets her inventory", "Inventory changes with fills."],
      ["The regime sets the tick size", "Ticks are fixed."],
      ["It does not", "It does, through rates and jumps."],
    ]),
  c124.m(LI, "recall-jump-terms", 1, "The DPE in Section 12.4 includes terms for:",
    "Her LO being filled, MOs that do not fill her but move the price, exogenous price jumps, and regime switches", [
      ["Only her fills", "Several events change the value."],
      ["Only regime switches", "Fills and jumps matter too."],
      ["Only Brownian motion", "The model is jump-driven."],
    ]),

  // level 2
  c124.n(LI, "apply-fill-regime", 2,
    "In the buy-heavy regime, buy MOs arrive at $2$ per second; in the sell-heavy regime at $0.5$ per second. With $\\kappa\\delta = 1$, what is her fill rate in the buy-heavy regime? Give $4$ decimal places.",
    0.7358),
  c124.n(LI, "apply-fill-ratio", 2,
    "With the same depth, by what factor is her fill rate higher in the buy-heavy regime than in the sell-heavy regime?",
    4),
  c124.n(LI, "apply-base-depth", 2,
    "With no inventory or regime effects, her optimal depth is $1/\\kappa$. With $\\kappa = 200$ per dollar, what is it in cents?",
    0.5),
  c124.m(LI, "recall-depth-formula", 2, "Her optimal depth in regime $z$ is of the form:",
    "$\\delta^{*} = \\frac{1}{\\kappa} - [h(t, z, q - 1) - h(t, z, q)]$, with a correction for expected price jumps", [
      ["$1/\\kappa$ always", "Inventory, time and regime adjust it."],
      ["$\\lambda(z)$", "The rate enters $h$, not directly."],
      ["Zero in the buy-heavy regime", "She still earns depth."],
    ]),

  // level 3
  c124.n(LI, "apply-expected-jump-after-mo", 3,
    "In the buy-heavy regime, the midprice jumps by $+1$ cent with probability $0.4$ after a buy MO, otherwise $0$. What is the expected jump in cents?",
    0.4),
  c124.m(LI, "apply-buy-heavy-depth", 3, "In the buy-heavy regime, compared with the sell-heavy regime, the seller tends to post:",
    "Deeper, since fills are more frequent and prices are more likely to rise", [
      ["Closer to the mid", "Abundant buyers let her ask for more."],
      ["The same depth", "The regime changes the trade-off."],
      ["No LO at all", "She still posts."],
    ]),
  c124.n(LI, "apply-depth-correction", 3,
    "If the expected price jump after a fill is $\\varepsilon = 0.3$ cents and $1/\\kappa = 0.5$ cents, what depth (ignoring inventory) protects against that jump, $1/\\kappa + \\varepsilon$, in cents?",
    0.8),
  c124.m(LI, "apply-sell-heavy", 3, "In the sell-heavy regime, the seller tends to post closer to the mid because:",
    "Buy MOs are scarce and prices are more likely to fall, so waiting is costly", [
      ["Fills are abundant", "Buy MOs are scarce there."],
      ["Prices are likely to rise", "They are more likely to fall."],
      ["Her inventory is zero", "Inventory is separate."],
    ]),

  // level 4
  c124.n(LI, "apply-expected-time-fill", 4,
    "In the sell-heavy regime, her fill rate is $0.5e^{-1}$ per second. What is the expected time to a fill, in seconds? Give $2$ decimal places.",
    5.44),
  c124.s(LI, "explain-regime-coupling", 4,
    "Why is the system of equations for $h(t, z, q)$ coupled across regimes?",
    "Explains that the regime switches at random times according to the Markov chain, so the value in one regime includes the expected change from switching to others, $\\sum_j G_{zj}[h(t, j, q) - h(t, z, q)]$.",
    "Concludes that the equations for different regimes must be solved together, as a coupled system of ODEs in time for each inventory level."),
  c124.n(LI, "apply-switch-value", 4,
    "In regime $0$ the switching term is $G_{0,+1}[h(+1) - h(0)] + G_{0,-1}[h(-1) - h(0)]$. With rates $1.5$ and $1$, and $h(+1) - h(0) = 0.4$ cents and $h(-1) - h(0) = -0.6$ cents, compute it in cents per second.",
    0),
  c124.m(LI, "apply-drift-special", 4, "Without regime changes and with a drifted Brownian midprice, the model reduces to:",
    "The limit-order liquidation problem of Chapter 8 with a drift", [
      ["The Almgren–Chriss problem", "That uses MOs."],
      ["The market-making problem", "She only sells."],
      ["A pairs-trading problem", "There is one asset."],
    ]),

  // level 5
  c124.s(LI, "explain-optimal-depth-pattern", 5,
    "Figure 12.6 compares optimal depths in sell-heavy and buy-heavy regimes. Describe the pattern and its intuition.",
    "Describes that depths are lower in the sell-heavy regime and higher in the buy-heavy regime, for every inventory and time.",
    "Explains that in a buy-heavy book buyers are plentiful and the price tends to rise, so she can sell at higher prices; in a sell-heavy book she lowers her ask to sell before prices fall and while some buyers remain."),
  c124.n(LI, "apply-revenue-gain", 5,
    "Using regime-dependent depths raises her average sale price from $0.5$ to $0.8$ cents above the mid. On $10{,}000$ shares, how many dollars does this add?",
    30),
  c124.m(LI, "apply-negative-depth", 5, "If the optimal depth becomes negative in the sell-heavy regime near $T$, the natural interpretation is:",
    "She should execute an MO, as in Section 8.4", [
      ["Post a buy LO", "She is selling."],
      ["Post at infinity", "Negative depth signals urgency."],
      ["Do nothing", "It signals a need to cross."],
    ]),
  c124.n(LI, "apply-stationary-regimes", 5,
    "If the stationary probabilities of the sell-heavy, neutral and buy-heavy regimes are $0.3$, $0.4$ and $0.3$, and the buy MO rates are $0.5$, $1$ and $2$ per second, what is the long-run average buy MO rate?",
    1.15),

  // level 6
  c124.s(LI, "explain-unfilled-mo", 6,
    "Why does the DPE include MOs that do not fill her LO?",
    "Explains that an MO that does not reach her depth still consumes liquidity and can move the midprice, changing the value of her inventory.",
    "Notes that the term is $\\lambda^{+}(z)(1 - e^{-\\kappa\\delta})\\mathbb{E}[H(\\cdot, S + \\epsilon) - H]$, the expected value change from the price jump without a fill, and similar terms for sell MOs."),
  c124.n(LI, "apply-unfilled-rate", 6,
    "With buy MOs at $2$ per second and fill probability $e^{-1}$, at what rate do buy MOs arrive that do not fill her? Give $4$ decimal places.",
    1.2642),
  c124.m(LI, "apply-value-regime", 6, "With the same inventory and time, her value is highest in:",
    "The buy-heavy regime, where fills are frequent and prices tend to rise", [
      ["The sell-heavy regime", "Fills are scarce and prices fall there."],
      ["The neutral regime always", "Buy-heavy is best for a seller."],
      ["It is the same in all regimes", "Regimes change her prospects."],
    ]),
  c124.n(LI, "apply-inventory-value", 6,
    "In the buy-heavy regime, she expects the midprice to rise $0.2$ cents per second while she holds $500$ shares. How much does her inventory gain in value per second, in dollars?",
    1),

  // level 7
  c124.s(LI, "explain-numerical-solve", 7,
    "How would you solve the coupled DPE system for $h(t, z, q)$ numerically?",
    "Proposes stepping backwards in time from $h(T, z, q) = -\\alpha q^2$, computing for each inventory and regime the optimal depth from current differences and updating with the fill, jump and switching terms.",
    "Notes the boundary $h(t, z, 0) = 0$ and that the system size is (number of regimes) $\\times$ (inventory levels), small enough for explicit or implicit schemes."),
  c124.n(LI, "apply-depth-diff", 7,
    "With $\\kappa = 200$, $h(z, q - 1) - h(z, q) = 0.2$ cents in the sell-heavy regime and $-0.3$ cents in the buy-heavy regime, what is the difference in optimal depths (buy-heavy minus sell-heavy), in cents, ignoring jump corrections?",
    0.5),
  c124.m(LI, "apply-model-extension", 7, "A natural extension of Section 12.4 is to:",
    "Allow MOs as well as LOs, giving a QVI with regime-dependent MO regions", [
      ["Remove the regimes", "That loses the information."],
      ["Remove inventory", "Inventory is essential to liquidation."],
      ["Use only the midprice", "The point is to use book information."],
    ]),
  c124.n(LI, "apply-expected-fills-regime", 7,
    "She spends $30\\%$, $40\\%$ and $30\\%$ of a $60$-second window in the sell-heavy, neutral and buy-heavy regimes, with fill rates $0.15$, $0.3$ and $0.6$ per second. What is her expected number of fills?",
    20.7),

  // level 8
  c124.s(LI, "explain-adverse-in-regimes", 8,
    "How does the regime model capture adverse selection for the seller?",
    "Explains that in the buy-heavy regime, buy MOs are frequent and followed by up-jumps, so being filled often precedes a price rise: she sold too cheaply.",
    "Explains that the model accounts for this through the expected jump terms, raising depths in that regime, which is a regime-dependent version of Chapter 10’s adverse-selection depth shift."),
  c124.n(LI, "apply-jump-adjusted-pnl", 8,
    "In the buy-heavy regime, her fill at depth $0.8$ cents is followed by an expected up-jump of $0.4$ cents. What is her expected gain on the filled share relative to the post-jump midprice, in cents?",
    0.4),
  c124.m(LI, "apply-terminal", 8, "Near $T$, regime effects on depth become:",
    "Less important relative to the need to finish liquidating, so depths fall in all regimes", [
      ["More important", "Time pressure dominates near $T$."],
      ["The only consideration", "Inventory and time dominate."],
      ["Irrelevant at all times", "They matter away from $T$."],
    ]),
  c124.n(LI, "apply-improvement", 8,
    "Simulations show the regime-aware strategy saves $0.15$ cents per share versus a regime-blind strategy. On a daily volume of $2$ million shares, what is the daily saving in dollars?",
    3000),

  // level 9
  c124.s(LI, "transfer-deploy", 9,
    "What would you need to deploy the Section 12.4 strategy in production?",
    "Needs a real-time regime estimate from the book (with latency), calibrated regime-dependent MO rates, fill parameters and jump distributions, and a precomputed policy table by time, inventory and regime.",
    "Needs monitoring and safeguards: checking that live fill rates and price moves match the calibration, handling queue position and partial fills, and falling back to a simpler strategy when the signal degrades."),
  c124.n(LI, "apply-latency-value", 9,
    "The regime is observed with a $50$ ms delay and regimes last on average $400$ ms. Roughly what fraction of the time is the observed regime stale (the true regime has switched since the observation)? Use $1 - e^{-50/400}$. Give $4$ decimal places.",
    0.1175),
  c124.m(LI, "transfer-others", 9, "If many sellers use the same regime-aware strategy, posting deeper in buy-heavy regimes, the likely market effect is:",
    "The ask side thins at the touch in buy-heavy regimes, reinforcing upward price moves", [
      ["Prices fall in buy-heavy regimes", "Sellers stepping back pushes prices up."],
      ["No effect", "Collective behaviour changes the book."],
      ["Imbalance disappears", "It may strengthen."],
    ]),
  c124.s(LI, "transfer-combine-signals", 9,
    "Combine order imbalance (Chapter 12) with order flow (Chapter 7) in one liquidation strategy. What state variables and trade-offs arise?",
    "Proposes state (time, inventory, imbalance regime, order-flow level), with the regime driving short-term fill rates and jumps and the order flow driving the midprice drift.",
    "Notes the trade-offs: the two signals are correlated, so their joint calibration matters; the state space grows, and one must weigh additional predictive power against estimation error and latency."),

  // level 10
  c124.s(LI, "transfer-evaluation", 10,
    "How would you evaluate whether the regime-aware liquidation strategy truly beats a regime-blind one, rather than appearing to because of overfitting?",
    "Proposes out-of-sample backtests on message data, with parameters estimated on earlier periods, realistic latency and queue modelling, and comparison of average revenue and its dispersion.",
    "Proposes statistical tests of the difference (paired comparisons over many episodes), robustness across stocks and periods, and ideally live A/B tests with randomised assignment of orders to strategies."),
  c124.n(LI, "apply-expected-revenue-regimes", 10,
    "Average depths are $0.3$, $0.5$ and $0.9$ cents in the sell-heavy, neutral and buy-heavy regimes, and she sells $25\\%$, $35\\%$ and $40\\%$ of shares in each. What is her average sale price relative to the mid, in cents?",
    0.61),
  c124.s(LI, "transfer-regime-misspecification", 10,
    "Suppose the true dynamics are not Markov in the imbalance regime (e.g. the history of regimes matters). How would this affect the strategy, and how could you detect it?",
    "Explains that the policy would mis-estimate fill rates and price moves after particular histories, so depths are suboptimal, though the Markov approximation may still capture most of the effect.",
    "Proposes detecting it by testing whether transition probabilities depend on the previous regime (higher-order Markov tests) or whether residual predictability remains, and extending the state if so."),
  c124.m(LI, "transfer-broader", 10, "The main lesson of Chapter 12 for algorithm design is that:",
    "Information in the visible book, such as volume imbalance, can be used to adapt order placement and improve execution", [
      ["The book is uninformative", "Imbalance carries information."],
      ["MOs should always be used", "LO placement can be adapted."],
      ["Imbalance should be ignored to avoid overfitting", "Used carefully, it improves execution."],
    ]),
];

export const ahtStatArbImbalanceItems: Item[] = [...pairs, ...coint, ...imbalance, ...liquidation];
