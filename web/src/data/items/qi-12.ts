import type { Item } from "../../lib/assessment/types";
import { m, mcq, num, short } from "./qi-shared";

/**
 * Quantitative Investing, part 12: after the trade — Kelly sizing, fractional
 * Kelly and drawdown control, ex-post performance attribution, and selection
 * versus sizing (Paleologo, Ch. 12–13). Forty questions per lesson, four at
 * each level.
 */

// ---------------------------------------------------------------------------
// kelly-criterion
// ---------------------------------------------------------------------------
const KC = "kelly-criterion";
const kelly: Item[] = [
  // level 1
  mcq(m(KC, "recall-objective", "recall", 1, 15, "The Kelly criterion chooses the fraction of capital to bet so as to maximize:"),
    "The expected growth rate, $\\mathbb{E}[\\log(1 + xr)]$",
    [
      ["The expected return $\\mathbb{E}[xr]$", "kelly-mean", "That bets everything (or more) on any positive edge."],
      ["The Sharpe ratio", "kelly-sharpe", "Sharpe is the same for every fraction."],
      ["The probability of any gain", "kelly-prob", "Not the criterion."],
    ]),
  mcq(m(KC, "recall-log-utility", "recall", 1, 15, "Maximizing expected growth is equivalent to maximizing expected utility with:"),
    "Logarithmic utility",
    [
      ["Quadratic utility", "kelly-quad", "That gives mean-variance."],
      ["Linear utility", "kelly-linear", "That maximizes expected return."],
      ["Exponential utility", "kelly-exp", "That gives constant absolute risk aversion."],
    ]),
  mcq(m(KC, "recall-dynamic", "recall", 1, 15, "A Kelly strategy rebalances so that:"),
    "A constant fraction of current capital is at risk each period",
    [
      ["A constant dollar amount is invested each period", "dyn-constant-dollar", "That's constant capital allocation."],
      ["The initial allocation is left to drift", "dyn-static", "That's the static allocation."],
      ["Everything is invested in the best asset", "dyn-all", "That over-bets."],
    ]),
  mcq(m(KC, "recall-theorem", "recall", 1, 15, "Breiman's theorem says the log-optimal strategy, compared with any strategy of lower expected growth:"),
    "Ends with more wealth with probability one in the long run",
    [
      ["Has higher Sharpe in every period", "theorem-sharpe", "Sharpe can be equal."],
      ["Never has drawdowns", "theorem-drawdown", "Kelly drawdowns can be severe."],
      ["Wins every period", "theorem-every", "Only in the long run."],
    ]),
  // level 2
  num(m(KC, "apply-coin", "apply", 2, 25, "An asset doubles or halves with equal probability. Find the Kelly fraction $x$ maximizing $\\frac{1}{2}\\log(1 + x) + \\frac{1}{2}\\log\\left(1 - \\frac{x}{2}\\right)$."), 0.5),
  num(m(KC, "apply-approx", "apply", 2, 20, "Using $x^{*} \\approx \\frac{\\mu}{\\sigma^{2}}$, find the Kelly fraction for an asset with expected excess return $0.06$ and volatility $0.2$."), 1.5),
  num(m(KC, "apply-mean-coin", "apply", 2, 20, "For the double-or-halve asset, find the expected simple return of one period."), 0.25),
  mcq(m(KC, "apply-overbet", "apply", 2, 20, "Betting the fraction that maximizes expected return ($x = 1$ in the coin example):"),
    "Grows wealth more slowly than Kelly (here not at all) over the long run",
    [
      ["Grows fastest", "overbet-fastest", "Maximizing the mean is not maximizing growth."],
      ["Is the same as Kelly", "overbet-same", "Kelly is $x = \\frac{1}{2}$."],
      ["Has no risk", "overbet-norisk", "It's riskier."],
    ]),
  // level 3
  num(m(KC, "apply-growth-coin", "apply", 3, 30, "Find the expected log growth per period of the coin example at $x = \\frac{1}{2}$. Give $4$ decimal places."), 0.0589),
  num(m(KC, "apply-growth-full", "apply", 3, 30, "Find the expected log growth at $x = 1$ in the coin example."), 0),
  num(m(KC, "apply-vol-capital", "apply", 3, 25, "At the Kelly fraction, dollar volatility divided by capital equals the strategy's Sharpe ratio. With $\\$1$B of capital and an annual Sharpe of $2$, find the Kelly dollar volatility in billions."), 2),
  mcq(m(KC, "apply-static", "apply", 3, 25, "Investing a fraction at time $0$ and letting it run (static allocation) performs poorly because:"),
    "The position's share of wealth drifts, and the risky asset's own log growth may be negative despite its positive mean",
    [
      ["It trades too much", "static-trades", "It doesn't trade at all."],
      ["It has a different Sharpe each period", "static-sharpe", "Sharpe is the same each period here."],
      ["It ignores the risk-free rate", "static-rf", "Not the issue."],
    ]),
  // level 4
  num(m(KC, "apply-us-market", "apply", 4, 35, "The US market's realized annual Sharpe (1926–2018) was $0.44$ with volatility $18.3\\%$. Using $x^{*} \\approx \\frac{\\text{SR}}{\\sigma}$, find the Kelly fraction. Give $2$ decimal places."), 2.4),
  num(m(KC, "apply-growth-rate", "apply", 4, 40, "In continuous time, growth at fraction $x$ is $g(x) = x\\mu - \\frac{x^{2}\\sigma^{2}}{2}$. Find $g$ at the Kelly fraction for $\\mu = 0.06$, $\\sigma = 0.2$."), 0.045),
  num(m(KC, "apply-sr2", "apply", 4, 35, "At the Kelly fraction, maximal growth is $\\frac{\\text{SR}^{2}}{2}$. Find it for an annual Sharpe of $0.3$."), 0.045),
  mcq(m(KC, "apply-sharpe-same", "apply", 4, 30, "In the coin example, constant-capital, static and dynamic allocations all have the same per-period Sharpe ratio. The lesson is:"),
    "Sharpe alone doesn't determine long-run wealth; sizing over time matters",
    [
      ["Sharpe is the only metric that matters", "same-only", "The strategies end very differently."],
      ["All three grow at the same rate", "same-growth", "They don't."],
      ["The example is flawed", "same-flawed", "It's correct."],
    ]),
  // level 5
  short(m(KC, "explain-mean-vs-growth", "explain", 5, 120, "Explain why maximizing expected return over many periods leads to ruin while maximizing expected log return does not."),
    [
      ["arith", "Expected wealth is dominated by rare lucky paths; maximizing it bets so much that the typical (median) path shrinks toward zero", 2, true],
      ["geo", "Long-run wealth is the product of gross returns, so its typical behaviour is governed by the average log return (law of large numbers); maximizing that maximizes almost-sure growth", 2, true],
    ]),
  num(m(KC, "apply-time-to-double", "apply", 5, 35, "The expected time to reach wealth multiple $C$ is about $\\frac{\\log C}{g}$. With $g = 0.045$ per year, find the time to double in years. Give $1$ decimal place."), 15.4),
  num(m(KC, "apply-exact-approx", "apply", 5, 40, "A refinement of the approximation is $x^{*} \\approx \\frac{\\mu}{\\sigma^{2} + \\mu^{2}}$. Find it for $\\mu = 0.25$, $\\sigma = 0.75$ (the coin example). Give $4$ decimal places."), 0.4),
  mcq(m(KC, "apply-negative-g", "apply", 5, 30, "If a strategy's expected log growth $g$ is negative, its wealth:"),
    "Tends to zero almost surely, even if its expected simple return is positive",
    [
      ["Grows slowly", "negg-slow", "It shrinks."],
      ["Oscillates forever", "negg-oscillate", "That's $g = 0$."],
      ["Stays constant", "negg-constant", "It decays."],
    ]),
  // level 6
  short(m(KC, "explain-leverage", "explain", 6, 150, "Kelly says a strategy with annual Sharpe $2$ should run dollar volatility of twice its capital. Why do almost no funds do this?"),
    [
      ["estimation", "The Sharpe ratio is estimated with large error; over-estimating it leads to over-betting, which cuts growth sharply and risks ruin", 2, true],
      ["constraints", "Drawdowns at full Kelly are severe; investors, margin and risk limits can't tolerate them; returns are fat-tailed and correlations shift", 2, true],
    ]),
  num(m(KC, "apply-two-assets", "apply", 6, 45, "Two uncorrelated assets with $\\mu = [0.04, 0.06]$ and $\\sigma^{2} = [0.04, 0.09]$. The Kelly portfolio is $\\boldsymbol{\\Omega}^{-1}\\boldsymbol{\\mu}$. Find the fraction in asset 2. Give $4$ decimal places."), 0.6667),
  num(m(KC, "apply-expected-return", "apply", 6, 40, "At the Kelly fraction, expected (arithmetic) excess return equals $\\text{SR}^{2}$. Find it for an annual Sharpe of $0.5$."), 0.25),
  mcq(m(KC, "apply-kelly-mvo", "apply", 6, 35, "Approximating $\\log(1 + xr)$ to second order shows the Kelly portfolio is:"),
    "A mean-variance portfolio with risk aversion equal to $1$ per unit of wealth",
    [
      ["The minimum-variance portfolio", "kmvo-minvar", "Alpha matters."],
      ["The maximum-return portfolio", "kmvo-maxret", "Variance is penalized."],
      ["Unrelated to mean-variance", "kmvo-unrelated", "It's MVO with a specific risk aversion."],
    ]),
  // level 7
  short(m(KC, "derive-kelly", "explain", 7, 150, "Derive the approximate Kelly fraction from $\\mathbb{E}[\\log(1 + xr)]$."),
    [
      ["expand", "Expand $\\log(1 + xr) \\approx xr - \\frac{x^{2}r^{2}}{2}$; take expectations: $x\\mu - \\frac{x^{2}}{2}(\\sigma^{2} + \\mu^{2})$", 2, true],
      ["optimize", "Maximize: $x^{*} = \\frac{\\mu}{\\sigma^{2} + \\mu^{2}} \\approx \\frac{\\mu}{\\sigma^{2}}$ when $\\mu \\ll \\sigma$; valid when $x r$ is small (e.g. daily Sharpe below about $0.1$)", 2, true],
    ]),
  num(m(KC, "apply-overbet-growth", "apply", 7, 45, "With $g(x) = x\\mu - \\frac{x^{2}\\sigma^{2}}{2}$, find the fraction of maximal growth achieved at twice the Kelly fraction."), 0),
  num(m(KC, "apply-1.5-kelly", "apply", 7, 45, "Find the fraction of maximal growth achieved at $1.5$ times the Kelly fraction."), 0.75),
  mcq(m(KC, "apply-symmetric", "apply", 7, 40, "Growth as a function of the betting fraction is:"),
    "A parabola symmetric around the Kelly fraction (in the continuous approximation), so under- and over-betting by the same amount cost the same growth",
    [
      ["Increasing in the fraction", "symm-increasing", "It peaks at Kelly."],
      ["Flat", "symm-flat", "It's curved."],
      ["Asymmetric, with over-betting cheaper", "symm-cheaper", "Over-betting adds more risk for the same growth loss."],
    ]),
  // level 8
  short(m(KC, "explain-asymmetry", "explain", 8, 150, "Growth loss is symmetric around Kelly, yet practitioners strongly prefer to under-bet. Why?"),
    [
      ["risk", "Over-betting brings much higher volatility and deeper drawdowns for the same growth loss; under-betting reduces both", 2, true],
      ["uncertainty", "Given uncertainty in the Sharpe estimate, betting a fraction of estimated Kelly protects against the large losses from over-betting when the true Sharpe is lower", 2, true],
    ]),
  num(m(KC, "apply-us-growth", "apply", 8, 45, "For the US market (Sharpe $0.44$), find the maximal Kelly growth rate $\\frac{\\text{SR}^{2}}{2}$ in percent per year. Give $2$ decimal places."), 9.68),
  num(m(KC, "apply-wrong-sharpe", "apply", 8, 50, "You believe Sharpe is $1$ but it's actually $0.5$ (same volatility). Betting your estimated Kelly fraction (twice the true one) achieves what fraction of true maximal growth?"), 0),
  mcq(m(KC, "apply-drawdown", "apply", 8, 40, "At the full Kelly fraction, the probability of the wealth ever falling to half its peak is about:"),
    "$\\frac{1}{2}$ — deep drawdowns are routine at full Kelly",
    [
      ["Zero", "dd-zero", "Kelly offers no drawdown protection."],
      ["$1\\%$", "dd-one", "Much more likely."],
      ["$100\\%$", "dd-certain", "Not certain."],
    ]),
  // level 9
  short(m(KC, "transfer-allocate", "transfer", 9, 180, "A multi-manager fund allocates capital to PMs with different Sharpe ratios and volatilities. How does Kelly reasoning guide allocation, and what would you adjust?"),
    [
      ["kelly", "Allocate dollar volatility in proportion to each PM's (uncorrelated) Sharpe — the multi-asset Kelly/MVO solution $\\boldsymbol{\\Omega}^{-1}\\boldsymbol{\\mu}$ — and scale total risk to a fraction of Kelly", 2, true],
      ["adjust", "Shrink Sharpe estimates for noise and track record length, account for correlations between PMs, and cap drawdown risk", 2, true],
    ]),
  short(m(KC, "explain-hitting", "explain", 9, 150, "Why does the Kelly strategy reach any wealth target fastest in expectation?"),
    [
      ["bm", "Log wealth behaves like Brownian motion with drift $g$; the expected first time to reach $\\log C$ is $\\frac{\\log C}{g}$", 2, true],
      ["max", "Kelly maximizes $g$, so it minimizes that expected time", 2, true],
    ]),
  num(m(KC, "apply-years-10x", "apply", 9, 60, "A strategy with annual Sharpe $1$ is run at full Kelly. Using $g = \\frac{\\text{SR}^{2}}{2}$, find the expected years to grow wealth tenfold. Give $2$ decimal places."), 4.61),
  mcq(m(KC, "apply-dependence", "apply", 9, 40, "Breiman's optimality results were first proved for:"),
    "Independent returns across periods; extensions (Algoet and Cover) cover dependent processes",
    [
      ["Only Gaussian returns", "dep-gaussian", "Normality isn't required."],
      ["Only two assets", "dep-two", "Any number of strategies."],
      ["Only finite horizons", "dep-finite", "They're asymptotic results."],
    ]),
  // level 10
  short(m(KC, "judge-kelly-critique", "transfer", 10, 180, "Samuelson criticized Kelly as not optimal for investors who aren't log-utility maximizers. Respond."),
    [
      ["right", "He is right that maximizing growth isn't maximizing every utility; investors with other risk preferences (or finite horizons) should choose differently", 2, true],
      ["useful", "But Kelly is a natural upper bound on sensible risk: betting more lowers growth and raises risk, so practitioners use fractions of Kelly as a reference point", 2, true],
    ]),
  short(m(KC, "judge-us-market", "transfer", 10, 180, "Historical data suggest levering the US market about $2.2$ times would have maximized growth. Should an investor do this going forward?"),
    [
      ["no", "No: the optimum is computed with hindsight; the Sharpe is uncertain, future returns may differ, and leverage costs and fat tails (e.g. 1929, 1987) can be catastrophic at $2.2\\times$", 2, true],
      ["fraction", "A fraction of estimated Kelly, with drawdown controls, is far more robust", 2, true],
    ]),
  num(m(KC, "apply-coin-alt", "apply", 10, 90, "A bet wins $+60\\%$ with probability $0.5$ and loses $-30\\%$ otherwise. Find the exact Kelly fraction $x$ maximizing $\\frac{1}{2}\\log(1 + 0.6x) + \\frac{1}{2}\\log(1 - 0.3x)$. Give $4$ decimal places."), 0.8333),
  mcq(m(KC, "judge-max-x", "transfer", 10, 60, "In the previous bet, any fraction $x \\ge \\frac{1}{0.3} \\approx 3.33$ is disastrous because:"),
    "A single loss would wipe out all capital, sending log wealth to $-\\infty$",
    [
      ["The expected return becomes negative", "maxx-mean", "The mean stays positive."],
      ["Gains become capped", "maxx-capped", "No cap."],
      ["Volatility falls", "maxx-vol", "It rises."],
    ]),
];

// ---------------------------------------------------------------------------
// fractional-kelly-and-drawdowns
// ---------------------------------------------------------------------------
const FK = "fractional-kelly-and-drawdowns";
const fractionalKelly: Item[] = [
  // level 1
  mcq(m(FK, "recall-fractional", "recall", 1, 15, "Fractional Kelly means:"),
    "Betting a fixed fraction $f < 1$ of the Kelly fraction",
    [
      ["Betting a fraction of the remaining capital", "frac-capital", "Kelly already bets a fraction of capital."],
      ["Using only some assets", "frac-assets", "It scales the whole bet."],
      ["Betting more than Kelly", "frac-more", "That's over-betting."],
    ]),
  mcq(m(FK, "recall-tradeoff", "recall", 1, 15, "Compared with full Kelly, half Kelly:"),
    "Gives up a quarter of the growth rate for half the volatility",
    [
      ["Gives up half the growth for half the volatility", "tradeoff-half", "Growth falls only by $25\\%$."],
      ["Has the same growth", "tradeoff-same", "Growth falls somewhat."],
      ["Has higher growth", "tradeoff-higher", "Kelly maximizes growth."],
    ]),
  mcq(m(FK, "recall-watermark", "recall", 1, 15, "A drawdown is measured as:"),
    "The percentage decline of wealth from its running maximum (high watermark)",
    [
      ["The daily loss", "watermark-daily", "Drawdowns accumulate over periods."],
      ["Volatility", "watermark-vol", "A different risk measure."],
      ["The decline from initial capital only", "watermark-initial", "Usually from the peak."],
    ]),
  mcq(m(FK, "recall-gz", "recall", 1, 15, "Grossman and Zhou solve the problem of maximizing long-run growth subject to:"),
    "Never falling more than $D$ below the high watermark",
    [
      ["A volatility cap", "gz-vol", "That's the log-variance formulation."],
      ["A fixed leverage", "gz-leverage", "Leverage varies with the drawdown."],
      ["A turnover limit", "gz-turnover", "Unrelated."],
    ]),
  // level 2
  num(m(FK, "apply-growth-frac", "apply", 2, 20, "Growth at fraction $f$ of Kelly is $g^{*}(2f - f^{2})$. Find the fraction of maximal growth at $f = 0.5$."), 0.75),
  num(m(FK, "apply-vol-frac", "apply", 2, 20, "Full Kelly has volatility $40\\%$. Find the volatility of quarter Kelly in percent."), 10),
  num(m(FK, "apply-gz-top", "apply", 2, 25, "In the Grossman–Zhou policy, the invested fraction is Kelly times $1 - \\frac{1 - D}{1 - d_t}$. At the high watermark ($d_t = 0$) with $D = 0.2$, find the multiplier."), 0.2),
  mcq(m(FK, "apply-gz-near", "apply", 2, 20, "As the drawdown $d_t$ approaches the limit $D$, the Grossman–Zhou policy:"),
    "Reduces the risky position toward zero",
    [
      ["Doubles down", "gznear-double", "That would breach the limit."],
      ["Keeps it constant", "gznear-constant", "It scales down."],
      ["Switches to full Kelly", "gznear-full", "It de-risks."],
    ]),
  // level 3
  num(m(FK, "apply-gz-mid", "apply", 3, 30, "With $D = 0.2$ and current drawdown $d_t = 0.1$, find the Grossman–Zhou multiplier $1 - \\frac{1 - D}{1 - d_t}$. Give $4$ decimal places."), 0.1111),
  num(m(FK, "apply-growth-quarter", "apply", 3, 25, "Find the fraction of maximal growth at quarter Kelly."), 0.4375),
  num(m(FK, "apply-growth-abs", "apply", 3, 30, "Full Kelly growth is $\\frac{\\text{SR}^{2}}{2}$. With annual Sharpe $1$, find the growth rate of half Kelly."), 0.375),
  mcq(m(FK, "apply-same-weights", "apply", 3, 25, "A constraint on the variance of log returns leads to a portfolio that:"),
    "Has the same relative weights as Kelly but a smaller gross size — a justification for fractional Kelly",
    [
      ["Changes the relative weights", "sameweights-change", "Only the scale changes."],
      ["Is larger than Kelly", "sameweights-larger", "The constraint shrinks it."],
      ["Holds only cash", "sameweights-cash", "It holds a scaled Kelly portfolio."],
    ]),
  // level 4
  num(m(FK, "apply-gz-unlimited", "apply", 4, 35, "With $D = 1$ (any drawdown tolerated), find the Grossman–Zhou multiplier at any $d_t < 1$."), 1),
  num(m(FK, "apply-sharpe-error", "apply", 4, 40, "You estimate Sharpe $1$ but the truth is $0.7$. Betting your estimated Kelly is $\\frac{1}{0.7} \\approx 1.43$ times true Kelly. Find the fraction of true maximal growth achieved, $2f - f^{2}$. Give $4$ decimal places."), 0.8163),
  num(m(FK, "apply-half-under-error", "apply", 4, 40, "With the same error, betting half your estimated Kelly is about $0.714$ times true Kelly. Find the fraction of true maximal growth. Give $4$ decimal places."), 0.9184),
  mcq(m(FK, "apply-frac-protect", "apply", 4, 30, "The previous two items show that fractional Kelly:"),
    "Is robust to over-estimating the Sharpe ratio, losing little growth when right and avoiding over-betting when wrong",
    [
      ["Always has higher growth", "fracprotect-higher", "Not when the estimate is right."],
      ["Is never optimal", "fracprotect-never", "It's robust under uncertainty."],
      ["Eliminates drawdowns", "fracprotect-eliminate", "It reduces them."],
    ]),
  // level 5
  short(m(FK, "explain-fractional", "explain", 5, 120, "Give two reasons to use fractional rather than full Kelly."),
    [
      ["uncertainty", "Parameter uncertainty: estimated Sharpe ratios are noisy, and over-betting is far costlier in risk than under-betting", 2, true],
      ["drawdowns", "Risk tolerance: full Kelly brings volatility and drawdowns most investors can't tolerate; a fraction cuts them sharply for a modest growth loss", 2, true],
    ]),
  num(m(FK, "apply-gz-deep", "apply", 5, 35, "With $D = 0.3$ and current drawdown $d_t = 0.25$, find the Grossman–Zhou multiplier. Give $4$ decimal places."), 0.0667),
  num(m(FK, "apply-floor", "apply", 5, 35, "The Grossman–Zhou policy keeps wealth above $(1 - D)M_t$. With high watermark $M_t = \\$150$M and $D = 0.2$, find the wealth floor in millions."), 120),
  mcq(m(FK, "apply-compare", "apply", 5, 30, "In Paleologo's simulation with matched expected log return, fractional Kelly versus Grossman–Zhou:"),
    "Fractional Kelly has lower volatility; Grossman–Zhou has smaller maximum drawdown",
    [
      ["Fractional Kelly dominates on both", "compare-dominates", "Each wins on one measure."],
      ["Grossman–Zhou dominates on both", "compare-gz", "It has higher volatility."],
      ["They are identical", "compare-identical", "They differ."],
    ]),
  // level 6
  short(m(FK, "explain-gz-policy", "explain", 6, 150, "Explain the Grossman–Zhou policy intuitively."),
    [
      ["cushion", "Only the cushion above the floor $(1 - D)M_t$ is treated as risk capital; invest Kelly times the cushion, i.e. Kelly times $1 - \\frac{1 - D}{1 - d_t}$ of wealth", 2, true],
      ["behaviour", "At the peak you invest $D$ times Kelly; as losses mount the cushion shrinks and so does the position, reaching zero at the floor; new highs raise the floor", 2, true],
    ]),
  num(m(FK, "apply-cushion", "apply", 6, 40, "Wealth is $\\$130$M, the floor is $\\$120$M, and the Kelly fraction is $1.5$. Find the dollar risky position the Grossman–Zhou policy holds (Kelly times the cushion), in millions."), 15),
  num(m(FK, "apply-vol-at-half", "apply", 6, 40, "A strategy at full Kelly has Sharpe $1.5$, so volatility $150\\%$ of capital. Find half-Kelly volatility as a percentage of capital."), 75),
  mcq(m(FK, "apply-finite", "apply", 6, 35, "With a finite horizon, a drawdown measured against a fixed date, and transaction costs, the optimal sizing policy:"),
    "Must be computed numerically by dynamic programming, and depends on wealth, current position and time",
    [
      ["Is always full Kelly", "finite-full", "Constraints change it."],
      ["Has a simple closed form", "finite-closed", "Not in general."],
      ["Ignores current position", "finite-position", "Costs make it matter."],
    ]),
  // level 7
  short(m(FK, "derive-frac-growth", "explain", 7, 150, "Show that betting fraction $f$ of Kelly gives growth $g^{*}(2f - f^{2})$ and volatility $f\\sigma^{*}$."),
    [
      ["growth", "With $g(x) = x\\mu - \\frac{x^{2}\\sigma^{2}}{2}$ and $x = f\\frac{\\mu}{\\sigma^{2}}$, $g = \\frac{\\mu^{2}}{\\sigma^{2}}\\left(f - \\frac{f^{2}}{2}\\right) = g^{*}(2f - f^{2})$ since $g^{*} = \\frac{\\mu^{2}}{2\\sigma^{2}}$", 2, true],
      ["vol", "Portfolio volatility $x\\sigma$ is linear in $x$, so it scales by $f$", 1, true],
    ]),
  num(m(FK, "apply-growth-per-vol", "apply", 7, 45, "Growth per unit of volatility at fraction $f$ is proportional to $\\frac{2f - f^{2}}{f} = 2 - f$. Find its ratio at half Kelly to that at full Kelly."), 1.5),
  num(m(FK, "apply-ruin-like", "apply", 7, 45, "For a log-wealth Brownian motion with drift $g$ and volatility $s$, the probability of ever falling by a factor $c$ below the start is $c^{2g/s^{2}}$. At full Kelly $\\frac{2g}{s^{2}} = 1$; find the probability of ever halving."), 0.5),
  mcq(m(FK, "apply-ruin-frac", "apply", 7, 40, "At fraction $f$ of Kelly, $\\frac{2g}{s^{2}} = \\frac{2 - f}{f}$. At half Kelly this exponent is $3$, so the probability of ever halving is:"),
    "$\\left(\\frac{1}{2}\\right)^{3} = 12.5\\%$",
    [
      ["$50\\%$", "ruinfrac-50", "That's full Kelly."],
      ["$25\\%$", "ruinfrac-25", "The exponent is $3$, not $2$."],
      ["$0\\%$", "ruinfrac-0", "It's positive."],
    ]),
  // level 8
  short(m(FK, "explain-log-variance", "explain", 8, 150, "Explain Paleologo's log-return mean-variance formulation and why it justifies fractional Kelly."),
    [
      ["formulation", "Maximize expected log return subject to a bound on the variance (second moment) of log returns — a Sharpe ratio for log returns", 2, true],
      ["result", "The solution keeps the Kelly portfolio's relative weights and scales its size down by a factor set by the constraint's multiplier — exactly a fractional Kelly", 2, true],
    ]),
  num(m(FK, "apply-ruin-quarter", "apply", 8, 45, "At quarter Kelly, find the probability of ever losing half of the starting wealth, $\\left(\\frac{1}{2}\\right)^{(2 - f)/f}$. Give $6$ decimal places."), 0.007813),
  num(m(FK, "apply-gz-vs-frac", "apply", 8, 45, "At the high watermark, Grossman–Zhou with $D = 0.25$ invests the same as which fraction of Kelly?"), 0.25),
  mcq(m(FK, "apply-path", "apply", 8, 40, "Unlike fractional Kelly, the Grossman–Zhou policy is:"),
    "Path dependent — its size depends on the current drawdown from the peak",
    [
      ["Independent of past returns", "path-indep", "That's fractional Kelly."],
      ["Always more aggressive", "path-aggressive", "It's less aggressive near the floor."],
      ["Always fully invested", "path-full", "It de-risks."],
    ]),
  // level 9
  short(m(FK, "transfer-fund-policy", "transfer", 9, 180, "Design a risk-allocation policy for a fund whose investors redeem after a $15\\%$ drawdown, and whose Sharpe estimate is uncertain."),
    [
      ["base", "Start from a fraction of estimated Kelly (e.g. a third to a half) to allow for Sharpe uncertainty", 2, true],
      ["drawdown", "Overlay a drawdown rule like Grossman–Zhou with $D$ below $15\\%$, scaling risk down as losses accumulate; consider costs of de-risking and re-risking", 2, true],
    ]),
  short(m(FK, "explain-costs-variant", "explain", 9, 150, "How do transaction costs change optimal intertemporal sizing?"),
    [
      ["band", "Constantly rebalancing to a target fraction costs money; with costs the optimal policy tolerates deviations, trading only when far from target", 2, true],
      ["dp", "The policy depends on the current position, wealth and time, and is computed by dynamic programming", 2, true],
    ]),
  num(m(FK, "apply-target-frac", "apply", 9, 60, "An investor wants the probability of ever halving below $5\\%$. Using $\\left(\\frac{1}{2}\\right)^{(2 - f)/f} \\le 0.05$, find the largest fraction $f$ of Kelly. Give $4$ decimal places."), 0.3758),
  mcq(m(FK, "apply-dd-not-vol", "apply", 9, 40, "Investors in a fund often care about drawdowns measured from a reference date (e.g. the start of the year) rather than from the high watermark. This:"),
    "Changes the optimal policy and makes it time-dependent, requiring a finite-horizon formulation",
    [
      ["Has no effect", "ddref-none", "The constraint changes."],
      ["Makes full Kelly optimal", "ddref-full", "Constraints reduce risk."],
      ["Eliminates the need for sizing", "ddref-eliminate", "Sizing still matters."],
    ]),
  // level 10
  short(m(FK, "judge-choose", "transfer", 10, 180, "Compare fractional Kelly and Grossman–Zhou for a quant fund. Which would you choose and why?"),
    [
      ["tradeoff", "Fractional Kelly gives lower volatility and simplicity; Grossman–Zhou guarantees a drawdown bound but is pro-cyclical (cuts risk after losses, possibly missing rebounds) and trades more", 2, true],
      ["choice", "The choice depends on whether investors and creditors are more sensitive to volatility or to drawdowns; many funds combine a fractional base with drawdown-triggered de-risking", 2, true],
    ]),
  short(m(FK, "judge-procyclical", "transfer", 10, 180, "If many funds follow drawdown-control rules, what could happen in a market sell-off?"),
    [
      ["spiral", "Losses trigger de-risking by many funds simultaneously, selling into falling prices and amplifying the decline (a deleveraging spiral)", 2, true],
      ["link", "This links back to liquidity and funding as sources of excess return: those with capital to provide liquidity then can earn a premium", 2, true],
    ]),
  num(m(FK, "apply-optimal-f-error", "apply", 10, 90, "Your Sharpe estimate is unbiased but uncertain: the true Sharpe is $s$ times your estimate, with $s$ equally likely $0.5$ or $1.5$. Expected growth relative to the best is proportional to $\\mathbb{E}[2fs - f^{2}]$ in units of your estimate. Find the $f$ maximizing it."), 1),
  mcq(m(FK, "judge-error-asym", "transfer", 10, 60, "The previous item finds $f = 1$ because growth is quadratic and the error symmetric. Practitioners still pick $f < 1$ because:"),
    "Estimated Sharpe ratios are typically biased upward by selection, and volatility/drawdown aversion favours under-betting",
    [
      ["The calculation is wrong", "errasym-wrong", "It's correct for that setup."],
      ["Kelly never applies", "errasym-never", "It's a useful benchmark."],
      ["Growth is linear in $f$", "errasym-linear", "It's quadratic."],
    ]),
];

// ---------------------------------------------------------------------------
// performance-attribution
// ---------------------------------------------------------------------------
const PA = "performance-attribution";
const attribution: Item[] = [
  // level 1
  mcq(m(PA, "recall-split", "recall", 1, 15, "Basic factor-based attribution splits a period's position PnL into:"),
    "Factor PnL $\\mathbf{b}_t^{\\top}\\hat{\\mathbf{f}}_t$ and idiosyncratic PnL $\\mathbf{w}_t^{\\top}\\hat{\\boldsymbol{\\epsilon}}_t$",
    [
      ["Long PnL and short PnL", "split-longshort", "That's a different split."],
      ["Realized and unrealized PnL", "split-realized", "Accounting categories."],
      ["Alpha and beta only", "split-alpha", "Factor and idio are the model-based split."],
    ]),
  mcq(m(PA, "recall-trading", "recall", 1, 15, "Trading PnL is:"),
    "The difference between accounting PnL and position PnL (what intra-period trading added or cost)",
    [
      ["The factor PnL", "trading-factor", "Separate component."],
      ["The idiosyncratic PnL", "trading-idio", "Separate component."],
      ["Commissions only", "trading-commissions", "It includes all intra-period effects."],
    ]),
  mcq(m(PA, "recall-paradox", "recall", 1, 15, "The first attribution paradox is that factor-mimicking portfolios:"),
    "Have idiosyncratic risk but are attributed zero idiosyncratic PnL",
    [
      ["Have no factor exposure", "paradox-noexp", "They have unit exposure."],
      ["Always lose money", "paradox-lose", "Not the paradox."],
      ["Have no risk", "paradox-norisk", "They have idio risk."],
    ]),
  mcq(m(PA, "recall-maximal", "recall", 1, 15, "Maximal attribution to a set of factors $S$:"),
    "Assigns to $S$ all the PnL explainable by its factor returns, including the part transmitted through correlated factors",
    [
      ["Ignores factors outside $S$", "maximal-ignore", "It moves their correlated part into $S$."],
      ["Assigns all PnL to $S$", "maximal-all", "Only the explainable part."],
      ["Requires uncorrelated factors", "maximal-uncorr", "It handles correlation."],
    ]),
  // level 2
  num(m(PA, "apply-factor-pnl", "apply", 2, 20, "Exposures $\\mathbf{b} = [2, -1]$ (millions) and factor returns $[0.01, 0.02]$. Find the factor PnL in millions."), 0),
  num(m(PA, "apply-idio-pnl", "apply", 2, 20, "Total position PnL is $\\$1.5$M and factor PnL is $\\$0.4$M. Find idiosyncratic PnL in millions."), 1.1),
  num(m(PA, "apply-trading-pnl", "apply", 2, 20, "Accounting PnL is $\\$2.0$M and position PnL $\\$1.5$M. Find the trading PnL in millions."), 0.5),
  mcq(m(PA, "apply-hft", "apply", 2, 20, "An idealized high-frequency trader ends each day flat. Its daily position PnL is:"),
    "Zero — all its PnL is trading PnL",
    [
      ["All of its PnL", "hft-all", "Position PnL uses end-of-period holdings."],
      ["Mostly factor PnL", "hft-factor", "No overnight positions, no position PnL."],
      ["Negative", "hft-negative", "It's zero."],
    ]),
  // level 3
  num(m(PA, "apply-se-period", "apply", 3, 30, "With exposures $b = 2$ (millions) to one factor whose estimation-error variance is $[(\\mathbf{B}^{\\top}\\boldsymbol{\\Omega}_\\epsilon^{-1}\\mathbf{B})^{-1}] = 0.0001$, find the standard deviation of the true factor PnL around the attributed value, in millions."), 0.02),
  num(m(PA, "apply-se-T", "apply", 3, 30, "Over $T = 250$ periods with constant exposure, the variance grows linearly. Find the standard deviation in millions of the cumulative attribution error. Give $4$ decimal places."), 0.3162),
  num(m(PA, "apply-corr-pnl", "apply", 3, 30, "Estimated factor and idiosyncratic PnL have covariance $-\\mathbf{b}^{\\top}(\\mathbf{B}^{\\top}\\boldsymbol{\\Omega}_\\epsilon^{-1}\\mathbf{B})^{-1}\\mathbf{b}$. With $b = 2$ and error variance $0.0001$, find it."), -0.0004),
  mcq(m(PA, "apply-neg-corr", "apply", 3, 25, "Estimated factor and idiosyncratic PnL series tend to be:"),
    "Negatively correlated, because estimation error moves PnL from one bucket to the other",
    [
      ["Positively correlated", "negcorr-positive", "Errors are shared with opposite signs."],
      ["Uncorrelated", "negcorr-zero", "Errors induce a negative covariance."],
      ["Identical", "negcorr-identical", "They differ."],
    ]),
  // level 4
  num(m(PA, "apply-ci", "apply", 4, 40, "Cumulative idiosyncratic PnL is attributed as $-\\$0.5$M with standard error $\\$0.3$M. Find the upper end of a $95\\%$ interval ($\\pm 1.96$ standard errors), in millions. Give $3$ decimal places."), 0.088),
  num(m(PA, "apply-maximal-1", "apply", 4, 40, "Two factors with variances $0.04$ and $0.01$ and covariance $0.01$. Exposures $\\mathbf{b} = [0, 1]$. Maximal attribution to factor 1 assigns $b_1 + b_2\\frac{\\Omega_{21}}{\\Omega_{11}}$ per unit of $f_1$. Find this coefficient."), 0.25),
  num(m(PA, "apply-maximal-pnl", "apply", 4, 40, "With that coefficient $0.25$ and factor 1 return $-0.08$, find the PnL maximally attributed to factor 1."), -0.02),
  mcq(m(PA, "apply-zero-exposure", "apply", 4, 30, "A PM cuts momentum exposure to zero after a momentum loss, then loses again in the next momentum crash. Maximal attribution would show:"),
    "Momentum-driven losses through factors correlated with momentum, despite zero direct exposure",
    [
      ["Zero momentum PnL", "zeroexp-zero", "That's the standard attribution."],
      ["Gains from momentum", "zeroexp-gains", "Losses were transmitted."],
      ["Only idiosyncratic losses", "zeroexp-idio", "Correlated factors carry it."],
    ]),
  // level 5
  short(m(PA, "explain-paradoxes", "explain", 5, 120, "State the two attribution paradoxes and their resolution."),
    [
      ["paradoxes", "FMPs have idio risk but zero attributed idio PnL; a factor-neutral portfolio plus any amount of an FMP has the same idio PnL but different idio volatility", 2, true],
      ["resolution", "Estimated factor returns are FMP returns, which contain idiosyncratic noise; attributed factor and idio PnL are estimates with errors of variance $\\mathbf{b}^{\\top}(\\mathbf{B}^{\\top}\\boldsymbol{\\Omega}_\\epsilon^{-1}\\mathbf{B})^{-1}\\mathbf{b}$", 2, true],
    ]),
  num(m(PA, "apply-fmp-idio", "apply", 5, 35, "A factor-mimicking portfolio held for $T = 100$ periods has per-period idiosyncratic variance $0.0004$. Find the standard deviation of its true cumulative idiosyncratic PnL."), 0.2),
  mcq(m(PA, "apply-model-choice", "apply", 5, 30, "An advantage of attribution being ex post is that the PM:"),
    "Can analyze performance under several risk models (fundamental, statistical, global), not just the one used to build the portfolio",
    [
      ["Must use the same model", "modelchoice-same", "No such limitation after the trade."],
      ["Needs no risk model", "modelchoice-none", "Factor attribution needs one."],
      ["Can change past positions", "modelchoice-change", "Positions are fixed."],
    ]),
  num(m(PA, "apply-maximal-total", "apply", 5, 40, "Exposures $\\mathbf{b} = [1, 1]$; factor covariance $\\begin{bmatrix} 0.04 & 0.02 \\\\ 0.02 & 0.04 \\end{bmatrix}$; factor 1 returned $0.1$. Find the PnL maximally attributed to factor 1."), 0.15),
  // level 6
  short(m(PA, "explain-conditional", "explain", 6, 150, "Interpret maximal attribution as a conditional expectation."),
    [
      ["formula", "Given $\\mathbf{f}_S$, the expected returns of the other factors are $\\boldsymbol{\\Omega}_{\\bar{S}S}\\boldsymbol{\\Omega}_{SS}^{-1}\\mathbf{f}_S$ (Gaussian conditioning)", 2, true],
      ["attribution", "Maximal PnL to $S$ is $\\mathbf{b}_S^{\\top}\\mathbf{f}_S + \\mathbf{b}_{\\bar{S}}^{\\top}\\mathbb{E}[\\mathbf{f}_{\\bar{S}} \\mid \\mathbf{f}_S]$: what $S$'s moves imply for the whole factor PnL", 2, true],
    ]),
  num(m(PA, "apply-rotated-var", "apply", 6, 45, "After the maximal-attribution rotation, the remaining factor's variance becomes $\\Omega_{22} - \\frac{\\Omega_{21}^{2}}{\\Omega_{11}}$. With $\\Omega_{11} = 0.04$, $\\Omega_{22} = 0.04$, $\\Omega_{21} = 0.02$, find it."), 0.03),
  num(m(PA, "apply-adjusted-beta", "apply", 6, 45, "The adjusted dollar beta to factor 1 is $\\tilde{b} = b_1 + b_2\\frac{\\Omega_{21}}{\\Omega_{11}}$. With $\\mathbf{b} = [3, -2]$, $\\Omega_{11} = 0.01$ and $\\Omega_{21} = 0.005$, find it."), 2),
  mcq(m(PA, "apply-zscore-attr", "apply", 6, 35, "Z-scoring a historical-beta factor in a model with a country factor leaves total factor PnL unchanged but:"),
    "Changes how PnL is split between the country and beta factors",
    [
      ["Changes total risk", "zattr-risk", "It's a rotation."],
      ["Changes idiosyncratic PnL", "zattr-idio", "Residuals are unchanged."],
      ["Has no effect at all", "zattr-none", "Individual attributions change."],
    ]),
  // level 7
  short(m(PA, "explain-nested", "explain", 7, 150, "Describe nested maximal attribution and when it is useful."),
    [
      ["procedure", "Partition factors into themed groups $S_1, S_2, \\dots$; give $S_1$ its maximal attribution, then $S_2$ the maximal share of what remains, and so on, rotating the model each step", 2, true],
      ["use", "It yields an ordered, interpretable story (e.g. market, then value group, then sentiment, then industries) rather than arbitrary splits among correlated factors", 2, true],
    ]),
  num(m(PA, "apply-two-period-attr", "apply", 7, 45, "Over two periods, exposures are $[1, 0]$ then $[0, 2]$ and factor returns $[0.02, 0.01]$ then $[-0.01, 0.03]$. Find total factor PnL."), 0.08),
  num(m(PA, "apply-hedged-se", "apply", 7, 50, "A factor-neutral portfolio plus $\\lambda = 3$ units of an FMP whose factor-return error variance is $0.0001$: find the per-period standard deviation of the idio attribution error, $\\lambda\\sqrt{0.0001}$."), 0.03),
  mcq(m(PA, "apply-report", "apply", 7, 40, "Paleologo's Insight 13.1 recommends that factor attribution reports always include:"),
    "Standard errors of the attributed factor and idiosyncratic PnL",
    [
      ["Only point estimates", "report-point", "Errors matter."],
      ["The PM's opinion", "report-opinion", "Quantitative errors."],
      ["Benchmark returns only", "report-benchmark", "Uncertainty is the point."],
    ]),
  // level 8
  short(m(PA, "explain-minimal", "explain", 8, 150, "What is a “minimal attribution” set, and why is it informative?"),
    [
      ["def", "After maximal attribution to $S$, the complementary set $\\bar{S}$ gets the residual factor PnL; if it is small, $\\bar{S}$ contributes little beyond $S$", 2, true],
      ["use", "It identifies a small set of factors that describes the portfolio's factor performance — a dimensionality reduction for reporting", 2, true],
    ]),
  num(m(PA, "apply-maximal-three", "apply", 8, 50, "Exposures $[1, 2]$; $\\Omega_{11} = 0.04$, $\\Omega_{21} = -0.01$. Factor 1 returned $0.05$. Find the PnL maximally attributed to factor 1."), 0.025),
  num(m(PA, "apply-cum-t", "apply", 8, 45, "Cumulative idio PnL of $\\$1.2$M with attribution standard error $\\$0.5$M. Find the $z$-score."), 2.4),
  mcq(m(PA, "apply-sign-flip", "apply", 8, 40, "In Paleologo's sector-strategy example, momentum had $+\\$2.6$M under standard attribution and $-\\$5$M under maximal attribution. This happens because:"),
    "Correlated factors' PnL that moved with momentum is reassigned to it",
    [
      ["Momentum exposure changed sign", "signflip-exposure", "Exposures are the same; the attribution differs."],
      ["Maximal attribution is wrong", "signflip-wrong", "It's a different, consistent decomposition."],
      ["Idio PnL was moved to momentum", "signflip-idio", "Only factor PnL is redistributed."],
    ]),
  // level 9
  short(m(PA, "transfer-pm-review", "transfer", 9, 180, "Design a monthly performance review for a stock picker using these tools."),
    [
      ["decompose", "Decompose PnL into factor, idiosyncratic and trading PnL, with standard errors; break factor PnL down by groups, with maximal attribution for factors of interest", 2, true],
      ["interpret", "Check whether idio PnL is statistically distinguishable from zero, which factor bets were unintended, and how trading costs affected results; compare across risk models", 2, true],
    ]),
  short(m(PA, "explain-skill-luck", "explain", 9, 150, "How does attribution help distinguish skill from luck, and what are its limits?"),
    [
      ["helps", "It isolates idiosyncratic PnL, the part attributable to stock selection, and its standard error tells how much is noise", 2, true],
      ["limits", "Short histories give wide intervals; model errors and factor misspecification can leak factor PnL into idio PnL", 2, true],
    ]),
  num(m(PA, "apply-years-sig", "apply", 9, 60, "A PM's idio PnL has annual expected value $\\$2$M and annual standard deviation $\\$4$M (true PnL noise). How many years until the cumulative idio PnL reaches a $z$-score of $2$ in expectation?"), 16),
  mcq(m(PA, "apply-time-series-attr", "apply", 9, 40, "Time-series (returns-based) attribution differs from holdings-based attribution in that it:"),
    "Regresses the strategy's returns on factor returns, needing no position data but estimating exposures with error",
    [
      ["Uses daily holdings", "tsattr-holdings", "That's holdings-based."],
      ["Requires no factor returns", "tsattr-nofactors", "It needs them."],
      ["Is exact", "tsattr-exact", "It's statistical."],
    ]),
  // level 10
  short(m(PA, "judge-paradox-impact", "transfer", 10, 180, "A risk team evaluates a factor model by checking that its FMPs have near-zero idiosyncratic PnL. Critique."),
    [
      ["tautology", "FMPs have zero attributed idio PnL by construction (their returns define the factor returns), so the check is meaningless", 2, true],
      ["better", "Use out-of-sample risk tests and account for the FMPs' true idiosyncratic risk via attribution standard errors", 2, true],
    ]),
  short(m(PA, "judge-max-vs-standard", "transfer", 10, 180, "When should a PM look at maximal rather than standard attribution?"),
    [
      ["when", "When the factors of interest are correlated with others in the model — e.g. to see total momentum-related PnL including what's transmitted through correlated styles", 2, true],
      ["caution", "Standard attribution reflects direct exposures (actionable for hedging); maximal reflects economic sensitivity; report both with clear labels", 2, true],
    ]),
  num(m(PA, "apply-maximal-matrix", "apply", 10, 90, "Three factors; $S = \\{1\\}$. $\\Omega_{11} = 0.04$, $\\Omega_{21} = 0.02$, $\\Omega_{31} = -0.01$. Exposures $[1, 2, 4]$. Find the adjusted beta $b_1 + b_2\\frac{\\Omega_{21}}{\\Omega_{11}} + b_3\\frac{\\Omega_{31}}{\\Omega_{11}}$."), 1),
  mcq(m(PA, "judge-neg-idio", "transfer", 10, 60, "A PM's attributed idio PnL is $-\\$1$M with standard error $\\$1.5$M. The right conclusion is:"),
    "The data can't tell whether stock selection lost money; the result is within noise",
    [
      ["The PM has negative skill", "negidio-skill", "Not statistically distinguishable from zero."],
      ["The model is wrong", "negidio-model", "Not implied."],
      ["Factor PnL was negative", "negidio-factor", "Unrelated."],
    ]),
];

// ---------------------------------------------------------------------------
// selection-vs-sizing-attribution
// ---------------------------------------------------------------------------
const SS = "selection-vs-sizing-attribution";
const selection: Item[] = [
  // level 1
  mcq(m(SS, "recall-decomp", "recall", 1, 15, "Paleologo's per-period decomposition of the information ratio is:"),
    "$\\text{IR}_t = (\\text{selection})_t \\times (\\text{diversification})_t + (\\text{sizing})_t$",
    [
      ["$\\text{IR}_t = \\text{selection} + \\text{sizing}$", "decomp-sum", "Selection is multiplied by diversification."],
      ["$\\text{IR}_t = \\text{IC}\\sqrt{N}$", "decomp-flam", "That's the fundamental law."],
      ["$\\text{IR}_t = \\text{sizing} \\times \\text{breadth}$", "decomp-sizing", "Selection and diversification combine."],
    ]),
  mcq(m(SS, "recall-selection", "recall", 1, 15, "Selection skill measures:"),
    "How often, on average, positions are on the right side of their z-scored idiosyncratic returns",
    [
      ["How large the positions are", "sel-size", "That's sizing."],
      ["The number of stocks", "sel-number", "That's breadth/diversification."],
      ["Factor timing", "sel-factor", "It's in idio space."],
    ]),
  mcq(m(SS, "recall-sizing", "recall", 1, 15, "Sizing skill is positive when:"),
    "Larger positions (in dollar volatility) are more often on the right side",
    [
      ["All positions are equal", "size-equal", "Then sizing is zero."],
      ["Positions are large", "size-large", "It's about covariance with correctness."],
      ["Selection is negative", "size-negative-sel", "They're separate."],
    ]),
  mcq(m(SS, "recall-diversification", "recall", 1, 15, "The diversification term equals:"),
    "$\\frac{\\|\\tilde{\\mathbf{w}}\\|_1}{\\|\\tilde{\\mathbf{w}}\\|_2}$ of dollar-volatility positions — $\\frac{1}{\\sqrt{H}}$, ranging from $1$ to $\\sqrt{n}$",
    [
      ["The number of positions", "div-n", "Its square is the effective number."],
      ["The portfolio's volatility", "div-vol", "It's a concentration measure."],
      ["Always $1$", "div-one", "Only for one position."],
    ]),
  // level 2
  num(m(SS, "apply-div-equal", "apply", 2, 20, "A portfolio has $100$ positions with equal dollar volatility. Find the diversification term."), 10),
  num(m(SS, "apply-eff-n", "apply", 2, 20, "A portfolio's diversification term is $5$. Find the effective number of positions."), 25),
  num(m(SS, "apply-selection-simple", "apply", 2, 25, "Signed z-scored idio returns $\\tilde{\\epsilon}_i\\,\\text{sgn}(w_i)$ for four positions are $1$, $-1$, $0.5$ and $0.5$. Find selection (their mean)."), 0.25),
  mcq(m(SS, "apply-zscore-why", "apply", 2, 20, "Idiosyncratic returns are z-scored (divided by idio volatility) in the selection term so that:"),
    "Selection rewards being on the right side, not the magnitude of a volatile stock's move",
    [
      ["Returns become positive", "zwhy-positive", "Signs are kept."],
      ["Large caps dominate", "zwhy-largecap", "It puts assets on the same scale."],
      ["Factor returns are removed", "zwhy-factor", "That's done by using idio returns."],
    ]),
  // level 3
  num(m(SS, "apply-div-two", "apply", 3, 30, "Dollar-volatility positions $[3, 1, -1, -1]$. Find the diversification term $\\frac{\\|\\tilde{\\mathbf{w}}\\|_1}{\\|\\tilde{\\mathbf{w}}\\|_2}$. Give $4$ decimal places."), 1.7321),
  num(m(SS, "apply-ir-direct", "apply", 3, 30, "Positions $\\tilde{\\mathbf{w}} = [3, 1, -1, -1]$ and z-scored idio returns $\\tilde{\\boldsymbol{\\epsilon}} = [1, -1, -0.5, 0.5]$. Find $\\text{IR}_t = \\frac{\\tilde{\\mathbf{w}}^{\\top}\\tilde{\\boldsymbol{\\epsilon}}}{\\|\\tilde{\\mathbf{w}}\\|_2}$. Give $4$ decimal places."), 0.5774),
  num(m(SS, "apply-herf", "apply", 3, 25, "Find the Herfindahl index $H = \\sum_i x_i^{2}$, with $x_i = \\frac{|\\tilde{w}_i|}{\\sum_j|\\tilde{w}_j|}$, for $\\tilde{\\mathbf{w}} = [3, 1, -1, -1]$. Give $4$ decimal places."), 0.3333),
  mcq(m(SS, "apply-div-free", "apply", 3, 25, "Markowitz called diversification the only free lunch. The decomposition shows its benefit is:"),
    "Multiplied by selection skill — with zero selection, more diversification adds nothing",
    [
      ["Independent of skill", "divfree-indep", "It scales selection."],
      ["Always negative", "divfree-negative", "It helps with positive selection."],
      ["Captured by sizing", "divfree-sizing", "Sizing is a separate term."],
    ]),
  // level 4
  num(m(SS, "apply-selection-ex", "apply", 4, 35, "For $\\tilde{\\mathbf{w}} = [3, 1, -1, -1]$ and $\\tilde{\\boldsymbol{\\epsilon}} = [1, -1, -0.5, 0.5]$, find the selection term $\\hat{\\mathbb{E}}[\\tilde{\\epsilon}_i\\,\\text{sgn}(w_i)]$."), 0),
  num(m(SS, "apply-sizing-ex", "apply", 4, 40, "For the same data, sizing is $\\frac{n\\,\\widehat{\\text{cov}}\\left(\\tilde{\\epsilon}_i\\,\\text{sgn}(w_i), |\\tilde{w}_i|\\right)}{\\|\\tilde{\\mathbf{w}}\\|_2}$ (cross-sectional covariance with $\\frac{1}{n}$). Find it. Give $4$ decimal places."), 0.5774),
  num(m(SS, "apply-equal-sizing", "apply", 4, 35, "If all positions have equal dollar volatility, find the sizing term."), 0),
  mcq(m(SS, "apply-interpret", "apply", 4, 30, "In the example above, the IR comes entirely from sizing. This means:"),
    "The PM was right only on average-weighted terms: the large position was right, while the small ones were split",
    [
      ["The PM has strong selection skill", "interp-selection", "Selection is zero."],
      ["The portfolio is concentrated in losers", "interp-losers", "The big position won."],
      ["Diversification drove returns", "interp-div", "It multiplies zero selection."],
    ]),
  // level 5
  short(m(SS, "explain-advice-negative", "explain", 5, 120, "A PM's sizing skill is consistently negative. What should she do, according to the decomposition?"),
    [
      ["equalize", "Stop differentiating position sizes — equal dollar-volatility positions remove the negative sizing term", 2, true],
      ["benefit", "Equal sizes also maximize diversification, magnifying the benefit of her selection skill", 2, true],
    ]),
  num(m(SS, "apply-long-short", "apply", 5, 35, "A book has $60$ long and $40$ short positions; selection on longs is $0.05$ and on shorts $0.02$. Total selection is $q_{\\text{long}}\\text{sel}_L + q_{\\text{short}}\\text{sel}_S$. Find it."), 0.038),
  num(m(SS, "apply-ir-from-parts", "apply", 5, 35, "Selection $0.03$, diversification $8$ and sizing $-0.05$. Find the per-period IR."), 0.19),
  mcq(m(SS, "apply-concentrated", "apply", 5, 30, "One position of \\$999,901 and $99$ positions of \\$1 (equal volatilities) have diversification close to:"),
    "$1$ — effectively a single bet, despite $100$ names",
    [
      ["$10$", "conc-ten", "That would be equal positions."],
      ["$100$", "conc-hundred", "Diversification is at most $\\sqrt{n}$."],
      ["$0$", "conc-zero", "It's at least $1$."],
    ]),
  // level 6
  short(m(SS, "derive-decomposition", "explain", 6, 150, "Derive $\\text{IR}_t = \\text{selection} \\times \\text{diversification} + \\text{sizing}$ from $\\text{IR}_t = \\frac{\\tilde{\\mathbf{w}}^{\\top}\\tilde{\\boldsymbol{\\epsilon}}}{\\|\\tilde{\\mathbf{w}}\\|}$."),
    [
      ["rewrite", "Write $\\tilde{w}_i\\tilde{\\epsilon}_i = |\\tilde{w}_i| \\cdot s_i$ with $s_i = \\tilde{\\epsilon}_i\\,\\text{sgn}(w_i)$; then $\\text{IR}_t = \\frac{n\\hat{\\mathbb{E}}[s|\\tilde{w}|]}{\\|\\tilde{\\mathbf{w}}\\|}$", 2, true],
      ["split", "Use $\\hat{\\mathbb{E}}[xy] = \\hat{\\mathbb{E}}[x]\\hat{\\mathbb{E}}[y] + \\widehat{\\text{cov}}(x, y)$: the first term is $\\hat{\\mathbb{E}}[s] \\times \\frac{\\|\\tilde{\\mathbf{w}}\\|_1}{\\|\\tilde{\\mathbf{w}}\\|_2}$, the second is sizing", 2, true],
    ]),
  num(m(SS, "apply-div-range", "apply", 6, 35, "For $n = 400$ positions, find the maximum possible diversification."), 20),
  num(m(SS, "apply-annual-ir", "apply", 6, 40, "A PM's average per-day IR from the decomposition is $0.08$. Find the annualized IR with $252$ days. Give $2$ decimal places."), 1.27),
  mcq(m(SS, "apply-flam-link", "apply", 6, 35, "Compared with the fundamental law, the decomposition replaces $\\sqrt{N}$ by diversification, which:"),
    "Accounts for unequal position sizes — an effective breadth",
    [
      ["Is always larger than $\\sqrt{N}$", "flam-larger", "It's at most $\\sqrt{N}$."],
      ["Ignores the number of positions", "flam-ignore", "It depends on them."],
      ["Equals the IC", "flam-ic", "Different quantity."],
    ]),
  // level 7
  short(m(SS, "explain-positive-sizing", "explain", 7, 150, "If a PM has positive sizing skill, how should she use it, and what is the tension?"),
    [
      ["use", "Concentrate more risk in high-conviction positions to exploit sizing", 2, true],
      ["tension", "Concentration lowers diversification, which multiplies selection; the optimal sizing balances the two terms", 2, true],
    ]),
  num(m(SS, "apply-equalize-effect", "apply", 7, 45, "A PM has selection $0.02$, diversification $6$ and sizing $-0.04$. Equalizing sizes raises diversification to $10$ and sets sizing to $0$. Find the change in per-period IR."), 0.12),
  num(m(SS, "apply-sel-long-only", "apply", 7, 45, "In a long-only book of $5$ equal positions, z-scored idio returns are $0.5$, $-0.2$, $0.8$, $-0.6$, $0.1$. Find selection."), 0.12),
  mcq(m(SS, "apply-overestimate", "apply", 7, 40, "Paleologo notes that most PMs, when measured:"),
    "Overestimate their sizing skill; finding it low or negative is instructive",
    [
      ["Underestimate their sizing skill", "overest-under", "The opposite."],
      ["Have no selection skill", "overest-noselection", "Not the claim."],
      ["Have perfect diversification", "overest-div", "Not the claim."],
    ]),
  // level 8
  short(m(SS, "explain-breadth-cost", "explain", 8, 150, "Increasing diversification by adding stocks is not free, unlike equalizing positions. Why?"),
    [
      ["coverage", "New stocks need research coverage; the PM's selection skill on unfamiliar names is likely lower, diluting average selection", 2, true],
      ["costs", "More positions also mean more trading and monitoring costs; equalizing existing positions has no such cost", 2, true],
    ]),
  num(m(SS, "apply-sizing-calc2", "apply", 8, 50, "Positions (dollar vol) $[2, 2, 1, 1]$, all long; z-scored idio returns $[1, 0.5, -1, 0]$. Find sizing $\\frac{n\\,\\widehat{\\text{cov}}(s, |\\tilde{w}|)}{\\|\\tilde{\\mathbf{w}}\\|_2}$. Give $4$ decimal places."), 0.3953),
  num(m(SS, "apply-check-total", "apply", 8, 50, "For the same data, find $\\text{IR}_t = \\frac{\\tilde{\\mathbf{w}}^{\\top}\\tilde{\\boldsymbol{\\epsilon}}}{\\|\\tilde{\\mathbf{w}}\\|_2}$. Give $4$ decimal places."), 0.6325),
  mcq(m(SS, "apply-earnings-split", "apply", 8, 40, "Because selection is linear, it can be partitioned further, for example into:"),
    "Selection on positions around earnings versus outside earnings, or by sub-industry",
    [
      ["Factor and idio parts", "split-factor", "It's already idio-only."],
      ["Only long versus short", "split-only-ls", "Any partition works."],
      ["Nothing — it's indivisible", "split-none", "Linearity allows partitions."],
    ]),
  // level 9
  short(m(SS, "transfer-coaching", "transfer", 9, 180, "As head of a pod platform, how would you use selection/sizing attribution to coach PMs?"),
    [
      ["measure", "Measure selection, sizing and diversification over time with standard errors; break selection down by sector, long/short and earnings windows", 2, true],
      ["act", "Advise PMs with negative sizing to equalize positions, those with strong selection to broaden carefully, and those with positive sizing to concentrate within risk limits", 2, true],
    ]),
  short(m(SS, "explain-noise", "explain", 9, 150, "Why should sizing skill estimates be treated with caution?"),
    [
      ["noise", "Sizing is a cross-sectional covariance per period, noisy with few positions; it needs many periods to be distinguishable from zero", 2, true],
      ["bias", "Positions are sized by conviction partly after seeing outcomes (adding to winners), which can create apparent sizing skill", 2, true],
    ]),
  num(m(SS, "apply-div-needed", "apply", 9, 60, "With selection $0.02$ and zero sizing, what diversification gives a per-period IR of $0.1$?"), 5),
  mcq(m(SS, "apply-effective-n", "apply", 9, 40, "Diversification $5$ means the book behaves like:"),
    "$25$ equal-risk independent positions",
    [
      ["$5$ positions", "effn-five", "Effective number is diversification squared."],
      ["$125$ positions", "effn-125", "It's the square."],
      ["$10$ positions", "effn-ten", "It's $25$."],
    ]),
  // level 10
  short(m(SS, "judge-flam", "transfer", 10, 180, "Compare the selection–sizing decomposition with the fundamental law of active management."),
    [
      ["similar", "Both express IR as skill times breadth: selection ~ IC, diversification ~ $\\sqrt{N}$", 2, true],
      ["different", "The decomposition is an ex-post identity using actual positions, accounts for unequal sizes, and adds a sizing term; the law is an ex-ante approximation assuming optimal weights", 2, true],
    ]),
  short(m(SS, "judge-mvo-link", "transfer", 10, 180, "Robust portfolio construction methods and covariance shrinkage tend to equalize positions. Connect this to the decomposition."),
    [
      ["link", "Equalizing positions raises diversification; methods with a lower bound on diversification (Bouchaud et al.) are equivalent to shrinking the covariance", 2, true],
      ["meaning", "So robust MVO implicitly bets that sizing skill (or alpha precision) is low, favouring breadth — consistent with typical PM statistics", 2, true],
    ]),
  num(m(SS, "apply-full-decomp", "apply", 10, 90, "Positions $[2, 2, 1, 1]$ with z-scored idio returns $[1, 0.5, -1, 0]$: find selection times diversification. Give $4$ decimal places."), 0.2372),
  mcq(m(SS, "judge-sizing-sign", "transfer", 10, 60, "A PM with positive selection but negative sizing is most likely:"),
    "Over-sizing her highest-conviction ideas, which turn out no better (or worse) than her small positions",
    [
      ["Under-diversified by design", "sizingsign-under", "Diversification is separate."],
      ["Lucky", "sizingsign-lucky", "Persistence suggests a sizing habit."],
      ["Running a factor-neutral book", "sizingsign-neutral", "Unrelated."],
    ]),
];

export const qi12Items: Item[] = [...kelly, ...fractionalKelly, ...attribution, ...selection];
