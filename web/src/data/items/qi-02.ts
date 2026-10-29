import type { Item } from "../../lib/assessment/types";
import { m, mcq, num, short } from "./qi-shared";

/**
 * Quantitative Investing, part 2: returns and their stylized facts
 * (Paleologo, §2.1). Forty questions per lesson, four at each level.
 */

// ---------------------------------------------------------------------------
// asset-returns
// ---------------------------------------------------------------------------
const AR = "asset-returns";
const assetReturns: Item[] = [
  // level 1
  mcq(m(AR, "recall-simple-return", "recall", 1, 15, "The return of security $i$ from day $0$ to day $1$, with no dividend, is:"),
    "$r_i(1) = \\frac{P_i(1) - P_i(0)}{P_i(0)}$",
    [
      ["$r_i(1) = P_i(1) - P_i(0)$", "return-dollar", "That is a price change in dollars, not a return."],
      ["$r_i(1) = \\frac{P_i(1) - P_i(0)}{P_i(1)}$", "return-wrong-base", "Returns are measured relative to the starting price."],
      ["$r_i(1) = \\log P_i(1) - P_i(0)$", "return-mixed-log", "That mixes a log price with a level."],
    ]),
  mcq(m(AR, "recall-dividend", "recall", 1, 15, "When security $i$ pays a dividend $D_i(1)$, its dividend-adjusted return is:"),
    "$\\frac{P_i(1) + D_i(1) - P_i(0)}{P_i(0)}$",
    [
      ["$\\frac{P_i(1) - P_i(0)}{P_i(0)}$", "div-ignored", "This ignores the cash the holder received."],
      ["$\\frac{P_i(1) - D_i(1) - P_i(0)}{P_i(0)}$", "div-subtracted", "The dividend is income to the holder, so it is added."],
      ["$\\frac{D_i(1)}{P_i(0)}$", "div-only", "That is only the dividend yield."],
    ]),
  mcq(m(AR, "recall-log-return", "recall", 1, 15, "The log return $\\tilde{r}(t)$ is defined as:"),
    "$\\log\\left(1 + r(t)\\right)$",
    [
      ["$\\log r(t)$", "log-of-r", "That is undefined for negative returns."],
      ["$1 + \\log r(t)$", "log-plus-one", "The $1$ goes inside the log."],
      ["$e^{r(t)} - 1$", "log-inverse", "That inverts the transformation."],
    ]),
  mcq(m(AR, "recall-pnl", "recall", 1, 15, "If $\\mathbf{w}$ holds the dollar amounts invested in each asset and $\\mathbf{r}$ the one-period returns, the portfolio's profit and loss is:"),
    "$\\mathbf{w}^{\\top}\\mathbf{r}$",
    [
      ["$\\mathbf{w}^{\\top}\\mathbf{w}$", "pnl-ww", "That is the squared size of the positions."],
      ["$\\mathbf{r}^{\\top}\\mathbf{r}$", "pnl-rr", "That ignores the positions."],
      ["$\\frac{\\mathbf{w}^{\\top}\\mathbf{r}}{\\mathbf{w}^{\\top}\\mathbf{w}}$", "pnl-normalised", "Profit is not normalised by position size."],
    ]),
  // level 2
  num(m(AR, "apply-simple", "apply", 2, 20, "A stock closes at $\\$50$ on day $0$ and $\\$52$ on day $1$. Find its return $r$."), 0.04),
  num(m(AR, "apply-dividend", "apply", 2, 20, "A stock closes at $\\$40$, pays a $\\$1$ dividend, and closes the next day at $\\$41$. Find its dividend-adjusted return $r$."), 0.05),
  num(m(AR, "apply-log-of-ten", "apply", 2, 20, "Find the log return corresponding to a $10\\%$ return. Give $4$ decimal places."), 0.0953),
  mcq(m(AR, "apply-log-additive", "apply", 2, 20, "Over consecutive periods, which quantity simply adds up?"),
    "Log returns",
    [
      ["Simple returns", "add-simple", "Simple returns compound multiplicatively: $(1 + r_1)(1 + r_2) - 1$."],
      ["Percentage price changes measured from the first day", "add-first-day", "Those are cumulative simple returns, which multiply."],
      ["Dollar returns divided by the last price", "add-last-price", "That is not a standard return and doesn't add."],
    ]),
  // level 3
  num(m(AR, "apply-up-down", "apply", 3, 25, "A stock gains $10\\%$ one day and loses $10\\%$ the next. Find its two-day return $r$."), -0.01),
  num(m(AR, "apply-sum-logs", "apply", 3, 25, "Find the two-day log return of a stock that gains $10\\%$ and then loses $10\\%$. Give $4$ decimal places."), -0.0101),
  num(m(AR, "apply-pnl-two", "apply", 3, 25, "A portfolio is $\\$1{,}000{,}000$ long stock A and $\\$500{,}000$ short stock B. A returns $2\\%$ and B returns $1\\%$. Find the PnL in dollars."), 15000),
  num(m(AR, "apply-excess-pnl", "apply", 3, 25, "You hold $\\$1{,}000{,}000$ of a stock financed with borrowed cash. The stock returns $8\\%$ and the borrowing rate is $3\\%$. Find the PnL in dollars."), 50000),
  // level 4
  num(m(AR, "apply-roll-noise", "apply", 4, 35, "In the Roll model, the observed price is $p_t = m_t + \\epsilon_t$, with $m_t$ a random walk and $\\epsilon_t$ independent noise. Consecutive price changes have covariance $-0.0004$. Find the noise standard deviation $\\sigma_\\epsilon$."), 0.02),
  num(m(AR, "apply-roll-autocorr", "apply", 4, 40, "In the Roll model $m_{t+1} = m_t + \\eta_{t+1}$, $p_t = m_t + \\epsilon_t$, with $\\sigma_\\eta = 0.01$ and $\\sigma_\\epsilon = 0.02$, find the lag-one autocorrelation of the price changes $\\Delta p_t$. Give $4$ decimal places."), -0.4444),
  num(m(AR, "apply-annual-from-daily-log", "apply", 4, 40, "A stock's daily log returns over $252$ days average $0.0004$. Find its simple return over the whole period. Give $4$ decimal places."), 0.1061),
  mcq(m(AR, "apply-why-log", "apply", 4, 30, "If single-period log returns are independent and Gaussian, the multi-period log return is:"),
    "Gaussian, with variance equal to the sum of the single-period variances",
    [
      ["Log-normal", "why-log-lognormal", "The multi-period gross return is log-normal; its log is Gaussian."],
      ["Gaussian only if the periods are short", "why-log-short", "Sums of independent Gaussians are Gaussian at any horizon."],
      ["Uniform", "why-log-uniform", "Nothing here produces a uniform distribution."],
    ]),
  // level 5
  short(m(AR, "explain-log-vs-simple", "explain", 5, 120, "Explain why simple returns are convenient across assets but log returns are convenient across time, and when you can treat them as equal."),
    [
      ["cross-section", "Simple returns aggregate linearly across assets: a portfolio's return is the weighted sum $\\mathbf{w}^{\\top}\\mathbf{r}$", 1, true],
      ["time", "Log returns add across periods, so sums of independent Gaussian log returns stay Gaussian with additive variance", 1, true],
      ["approximation", "$\\log(1 + r) \\approx r$ when returns are small, e.g. daily or shorter equity returns", 1, true],
    ]),
  mcq(m(AR, "apply-cum-variance", "apply", 5, 30, "Daily log returns are i.i.d. with variance $\\sigma^{2}$. The variance of the $T$-day log return is:"),
    "$T\\sigma^{2}$",
    [
      ["$\\sqrt{T}\\sigma^{2}$", "cumvar-sqrt", "Standard deviations scale with $\\sqrt{T}$, variances with $T$."],
      ["$T^{2}\\sigma^{2}$", "cumvar-squared", "That would hold for perfectly correlated returns."],
      ["$\\sigma^{2}$", "cumvar-constant", "Variance accumulates over independent periods."],
    ]),
  num(m(AR, "apply-annualise-vol", "apply", 5, 30, "Daily log returns are i.i.d. with standard deviation $1\\%$. Find the annual volatility in percent over $252$ trading days. Give $2$ decimal places."), 15.87),
  num(m(AR, "apply-approx-error", "apply", 5, 30, "A stock returns $5\\%$ on each of two days. By how many percentage points does the exact two-day return exceed the sum of the daily returns?"), 0.25),
  // level 6
  short(m(AR, "explain-smoothed-close", "explain", 6, 150, "Under the Roll model, why can an exponentially weighted average of recent intraday prices be a better daily closing price than the last trade? What is the catch?"),
    [
      ["noise", "The last trade carries bid–ask bounce / measurement noise; averaging recent prices filters it out (the Kalman filter estimate of the true price $m_t$ is an EWMA)", 2, true],
      ["catch", "Consecutive estimates share observations, so returns computed from them become spuriously correlated unless the weight on old prices decays fast relative to the return interval", 2, true],
    ]),
  num(m(AR, "apply-overlap-check", "apply", 6, 30, "A price filter puts weight $(1 - K)^{T}$ on information older than $T$ observations. With $K = 0.3$ and $T = 5$, find $(1 - K)^{T}$. Give $4$ decimal places."), 0.1681),
  num(m(AR, "apply-dollar-neutral", "apply", 6, 40, "A portfolio is $\\$1$ million long stock A and $\\$1$ million short stock B. A returns $3\\%$, B returns $1\\%$, and the risk-free rate over the period is $2\\%$. Find the PnL in dollars when the net market value is financed at the risk-free rate."), 20000),
  mcq(m(AR, "apply-nmv-financing", "apply", 6, 35, "Why does the portfolio return $\\sum_i w_i r_i - \\left(\\sum_i w_i\\right) r_f$ equal $\\sum_i w_i (r_i - r_f)$?"),
    "The portfolio borrows (or lends) its net market value at the risk-free rate, so each position's financing cost can be assigned to it",
    [
      ["Because the risk-free rate is zero", "nmv-zero", "The identity holds for any $r_f$."],
      ["Because the weights sum to one", "nmv-sum-one", "Dollar weights need not sum to one."],
      ["Because short positions earn nothing", "nmv-short", "Shorts receive interest, which the formula captures as $-w_i r_f$ with $w_i < 0$."],
    ]),
  // level 7
  short(m(AR, "derive-roll", "explain", 7, 180, "In the Roll model $m_{t+1} = m_t + \\eta_{t+1}$, $p_t = m_t + \\epsilon_t$ with independent noises, derive $\\text{Cov}(\\Delta p_{t+1}, \\Delta p_t)$."),
    [
      ["expand", "Writes $\\Delta p_{t+1} = \\eta_{t+1} + \\epsilon_{t+1} - \\epsilon_t$ and $\\Delta p_t = \\eta_t + \\epsilon_t - \\epsilon_{t-1}$", 2, true],
      ["result", "Only the shared $\\epsilon_t$ term survives, with opposite signs, giving $-\\sigma_\\epsilon^{2}$", 2, true],
    ]),
  num(m(AR, "apply-div-log", "apply", 7, 30, "A stock goes from $\\$40$ to $\\$41$ and pays a $\\$1$ dividend. Find its dividend-adjusted log return. Give $4$ decimal places."), 0.0488),
  num(m(AR, "apply-total-return-index", "apply", 7, 45, "A stock goes from $\\$100$ to $\\$105$ and pays a $\\$2$ dividend, then falls to $\\$100$ with no dividend. Find its total two-period return $r$. Give $3$ decimal places."), 0.019),
  mcq(m(AR, "apply-bounce-variance", "apply", 7, 40, "In the Roll model, bid–ask bounce makes the measured variance of one-period price changes:"),
    "Too large by $2\\sigma_\\epsilon^{2}$, which matters most at short intervals",
    [
      ["Too small by $2\\sigma_\\epsilon^{2}$", "bounce-small", "Noise adds variance to each price change."],
      ["Exactly right, because noise averages out", "bounce-none", "Each change contains two independent noise terms."],
      ["Too large, mostly at long intervals", "bounce-long", "The noise term is fixed while true variance grows with the interval, so it matters least at long horizons."],
    ]),
  // level 8
  short(m(AR, "explain-approx-fails", "explain", 8, 150, "Give two situations where treating simple and log returns as equal leads you astray, and say what goes wrong."),
    [
      ["large-moves", "Large returns (long horizons, volatile assets, crashes): $\\log(1 + r)$ differs materially from $r$, e.g. $-50\\%$ is $\\log 0.5 \\approx -0.69$", 2, true],
      ["drag", "Averages: the mean log return is below the mean simple return by roughly $\\frac{\\sigma^{2}}{2}$ (volatility drag), so growth is overstated", 1, false],
      ["aggregation", "Cross-sectional aggregation with log returns: a portfolio's log return is not the weighted sum of its assets' log returns", 1, false],
    ]),
  num(m(AR, "apply-mean-log", "apply", 8, 45, "A stock's daily simple return has mean $0.001$ and standard deviation $0.02$. Using $\\mathbb{E}[\\log(1 + r)] \\approx \\mu - \\frac{\\sigma^{2}}{2}$, find the expected daily log return. Give $4$ decimal places."), 0.0008),
  num(m(AR, "apply-drag", "apply", 8, 45, "An asset has an expected annual simple return of $10\\%$ and annual volatility $30\\%$. Using the same approximation, find its expected annual log return in percent. Give $1$ decimal place."), 5.5),
  mcq(m(AR, "apply-compound-variance", "apply", 8, 40, "Why is the variance of a multi-period simple return not just the sum of single-period variances, even for independent periods?"),
    "Simple returns compound by multiplication, $\\prod_t (1 + r_t) - 1$, and the variance of a product involves the means as well",
    [
      ["Because simple returns are always correlated", "cv-correlated", "Independence is assumed here."],
      ["Because simple returns have no variance", "cv-none", "They do."],
      ["Because variances only add for discrete returns", "cv-discrete", "The issue is products versus sums."],
    ]),
  // level 9
  short(m(AR, "design-close", "transfer", 9, 180, "You must produce a daily closing price for an illiquid stock that trades a few times an hour. Describe a robust approach and the trade-off in choosing its smoothing."),
    [
      ["model", "Treat observed trades as a noisy measure of a latent price (Roll / state-space model) and filter them, e.g. an exponentially weighted average of recent prices", 2, true],
      ["trade-off", "More smoothing reduces noise but lags the true price and makes consecutive daily returns spuriously correlated; less smoothing keeps bounce noise", 2, true],
    ]),
  short(m(AR, "explain-excess-convention", "explain", 9, 150, "Why does the book model excess returns $r_i - r_f$ rather than raw returns, and how does the convention handle a long-short portfolio?"),
    [
      ["reason", "Holding a security means financing its cash (or earning on short proceeds); subtracting $r_f$ removes the risk-free asset and measures return from investing per se", 2, true],
      ["long-short", "With dollar positions $w_i$, PnL is $\\sum_i w_i(r_i - r_f)$: longs pay financing, shorts receive it, so a dollar-neutral book's PnL is unaffected by $r_f$", 2, true],
    ]),
  num(m(AR, "apply-roll-spread-bps", "apply", 9, 60, "A stock's consecutive daily returns have covariance $-2.25 \\times 10^{-6}$. Taking the Roll estimate of the effective spread as $2\\sqrt{-\\text{Cov}}$, find the spread in basis points."), 30),
  mcq(m(AR, "apply-roll-higher-lags", "apply", 9, 40, "In a long price series, the lag-one autocorrelation of price changes is negative as the Roll model predicts, but the lag-five autocorrelation is also large. This suggests:"),
    "The true price process has its own dependence that the pure Roll model lacks",
    [
      ["The bid–ask spread is larger than estimated", "lags-spread", "A larger spread only deepens the lag-one effect."],
      ["The data have no microstructure noise", "lags-no-noise", "Lag one already shows noise."],
      ["The Roll model is confirmed", "lags-confirmed", "The model predicts zero autocorrelation beyond lag one."],
    ]),
  // level 10
  short(m(AR, "derive-excess-pnl", "explain", 10, 180, "Show that a portfolio of dollar positions $w_i$ whose net market value is financed at $r_f$ has PnL $\\sum_i w_i (r_i - r_f)$, and explain the consequence for a dollar-neutral portfolio."),
    [
      ["derivation", "Asset PnL is $\\sum_i w_i r_i$; financing the net value $\\sum_i w_i$ costs $\\left(\\sum_i w_i\\right) r_f$; subtracting gives $\\sum_i w_i (r_i - r_f)$", 2, true],
      ["neutral", "If $\\sum_i w_i = 0$, the financing term vanishes, so the PnL is the same whether computed with raw or excess returns", 2, true],
    ]),
  num(m(AR, "apply-product-variance", "apply", 10, 90, "Two independent daily simple returns each have mean $0.01$ and standard deviation $0.05$. Find the variance of the two-day simple return $(1 + r_1)(1 + r_2) - 1$. Give $5$ decimal places."), 0.00511),
  mcq(m(AR, "judge-horizon", "transfer", 10, 60, "A risk model is built on daily log returns and used to forecast the dollar loss of a portfolio over one day. Which error is the largest concern?"),
    "Almost none: at a one-day horizon simple and log returns are close, so the main errors lie elsewhere (volatility and correlation estimates)",
    [
      ["Log returns cannot be aggregated across stocks, so the forecast is meaningless", "horizon-meaningless", "The approximation $\\tilde{r} \\approx r$ is adequate for daily equity returns."],
      ["The volatility drag dominates at one day", "horizon-drag", "Drag scales with the horizon and is tiny for one day."],
      ["Log returns overstate losses by a factor of two", "horizon-factor", "The difference is second order in the return."],
    ]),
  short(m(AR, "judge-dividend-adjust", "transfer", 10, 150, "A backtest computes returns from raw closing prices without adjusting for dividends or splits. Describe the errors this causes and which strategies they would favour."),
    [
      ["splits", "Splits create huge spurious price jumps (e.g. a $2$-for-$1$ split looks like $-50\\%$), corrupting returns and any signal built from them", 2, true],
      ["dividends", "Ignoring dividends understates returns on ex-dates, systematically penalising high-yield stocks and biasing value/yield strategies", 2, true],
    ]),
];

// ---------------------------------------------------------------------------
// stylized-facts-of-returns
// ---------------------------------------------------------------------------
const SF = "stylized-facts-of-returns";
const stylizedFacts: Item[] = [
  // level 1
  mcq(m(SF, "recall-no-autocorr", "recall", 1, 15, "The first stylized fact of daily stock returns is:"),
    "Lagged autocorrelations of returns are small",
    [
      ["Returns are strongly positively autocorrelated", "sf-positive-ac", "Daily returns show little serial correlation outside microstructure time scales."],
      ["Returns are independent", "sf-independent", "Low autocorrelation does not mean independence."],
      ["Returns are normally distributed", "sf-normal", "Returns have heavy tails."],
    ]),
  mcq(m(SF, "recall-heavy-tails", "recall", 1, 15, "“Heavy tails” means that:"),
    "Large returns occur more often than a thin-tailed distribution like the Gaussian would predict",
    [
      ["The average return is large", "tails-mean", "Tails concern extremes, not the mean."],
      ["Returns are skewed to the right", "tails-skew", "Skewness is a different property."],
      ["Volatility is constant", "tails-constant-vol", "That is unrelated to tail heaviness."],
    ]),
  mcq(m(SF, "recall-taylor", "recall", 1, 15, "The Taylor effect is the observation that:"),
    "The autocorrelation of absolute returns is even larger than that of squared returns",
    [
      ["Returns are autocorrelated at lag one", "taylor-returns", "Returns themselves show little autocorrelation."],
      ["Volatility falls when prices rise", "taylor-leverage", "That is the leverage effect."],
      ["Monthly returns are close to Gaussian", "taylor-aggregation", "That is aggregational Gaussianity."],
    ]),
  mcq(m(SF, "recall-aggregational", "recall", 1, 15, "Aggregational Gaussianity says that:"),
    "Returns measured over longer intervals (weekly, monthly) look closer to Gaussian",
    [
      ["Portfolio returns are always Gaussian", "agg-portfolio", "It is about time aggregation, not cross-sectional."],
      ["Intraday returns are Gaussian", "agg-intraday", "Short-interval returns are the least Gaussian."],
      ["The sum of any random variables is Gaussian", "agg-any", "The CLT needs conditions such as finite variance."],
    ]),
  // level 2
  num(m(SF, "apply-excess-kurtosis", "apply", 2, 20, "AAPL's daily log returns have sample kurtosis $5.7$. Find their excess kurtosis."), 2.7),
  num(m(SF, "apply-power-ratio", "apply", 2, 25, "Returns have a power tail $P(r > x) = C x^{-\\alpha}$ with $\\alpha = 4$. Find $\\frac{P(r > 2x)}{P(r > x)}$."), 0.0625),
  num(m(SF, "apply-gauss-kurt", "apply", 2, 15, "Find the kurtosis of a Gaussian random variable."), 3),
  mcq(m(SF, "apply-finite-moments", "apply", 2, 20, "A power-tailed return distribution with tail exponent $\\alpha = 4$ has finite moments of order:"),
    "Less than $4$",
    [
      ["All orders", "moments-all", "Only Gaussian-like thin tails have all moments finite."],
      ["At most $2$", "moments-two", "The third moment is finite too when $\\alpha = 4$."],
      ["Greater than $4$", "moments-greater", "Higher moments are the ones that diverge."],
    ]),
  // level 3
  num(m(SF, "apply-power-extrapolate", "apply", 3, 25, "For a power tail with $\\alpha = 4$, $P(r > 3\\%) = 0.04$. Find $P(r > 6\\%)$."), 0.0025),
  num(m(SF, "apply-mle-alpha", "apply", 3, 30, "The density exponent of a power law $p(x) \\propto x^{-\\alpha}$ is estimated by $\\hat{\\alpha} = 1 + n\\left[\\sum_i \\log\\frac{x_i}{x_{\\min}}\\right]^{-1}$. With $n = 50$ observations above $x_{\\min}$ and $\\sum_i \\log\\frac{x_i}{x_{\\min}} = 15$, find $\\hat{\\alpha}$. Give $4$ decimal places."), 4.3333),
  mcq(m(SF, "apply-kurtosis-horizon", "apply", 3, 25, "As you move from daily to monthly returns, sample kurtosis typically:"),
    "Falls toward $3$",
    [
      ["Rises", "kurt-rises", "Aggregation pushes returns toward Gaussian."],
      ["Stays the same", "kurt-same", "Kurtosis is not invariant to aggregation."],
      ["Becomes negative", "kurt-negative", "Kurtosis is always positive; excess kurtosis heads toward $0$."],
    ]),
  mcq(m(SF, "apply-uncorrelated-dependent", "apply", 3, 25, "Returns $r_t = \\sigma_t z_t$ with $z_t$ i.i.d. $\\mathcal{N}(0, 1)$ and $\\sigma_t$ depending on past returns are:"),
    "Uncorrelated over time but not independent",
    [
      ["Independent", "ud-independent", "$r_t^{2}$ depends on $\\sigma_t$, which depends on the past."],
      ["Positively autocorrelated", "ud-positive", "$\\mathbb{E}[r_t r_s] = 0$ for $t \\ne s$."],
      ["Gaussian unconditionally", "ud-gaussian", "Mixing over $\\sigma_t$ fattens the tails."],
    ]),
  // level 4
  num(m(SF, "apply-gauss-tail", "apply", 4, 40, "Using $P(Z > x) \\approx \\frac{1}{x\\sqrt{2\\pi}} e^{-x^{2}/2}$ for $Z \\sim \\mathcal{N}(0, 1)$, approximate $P(Z > 4)$. Give the answer multiplied by $10^{5}$, to $2$ decimal places."), 3.35),
  num(m(SF, "apply-var-se", "apply", 4, 45, "Daily returns are i.i.d. with mean zero and kurtosis $6$, so $\\text{Var}(r^{2}) = 5\\sigma^{4}$. Find the relative standard error of the variance estimate $\\frac{1}{250}\\sum_t r_t^{2}$, i.e. its standard deviation divided by $\\sigma^{2}$. Give $4$ decimal places."), 0.1414),
  num(m(SF, "apply-power-quantile", "apply", 4, 40, "Returns, in units of their standard deviation, have $P(r > x) = 0.2 x^{-4}$ in the tail. Find the $x$ with $P(r > x) = 0.0001$. Give $2$ decimal places."), 6.69),
  mcq(m(SF, "apply-gbm", "apply", 4, 30, "Geometric Brownian motion $dP = \\mu P\\, dt + \\sigma P\\, dW$ predicts log returns that are:"),
    "Gaussian and independent, contradicting heavy tails and volatility clustering",
    [
      ["Heavy-tailed and clustered", "gbm-heavy", "Constant $\\sigma$ and Brownian increments give Gaussian i.i.d. log returns."],
      ["Autocorrelated", "gbm-autocorr", "Brownian increments are independent."],
      ["Uniform", "gbm-uniform", "Brownian increments are Gaussian."],
    ]),
  // level 5
  short(m(SF, "explain-gbm-fails", "explain", 5, 120, "Which stylized facts does geometric Brownian motion get wrong, and which does it get right?"),
    [
      ["wrong", "Wrong: it predicts thin (Gaussian) tails and constant volatility, so no autocorrelation of absolute or squared returns (no clustering)", 2, true],
      ["right", "Right: it predicts no autocorrelation of returns, and Gaussianity at long horizons", 1, true],
    ]),
  mcq(m(SF, "apply-taylor-measure", "apply", 5, 30, "To detect volatility clustering in a return series, the most direct check is the autocorrelation of:"),
    "$|r_t|$ (or $r_t^{2}$)",
    [
      ["$r_t$", "cluster-raw", "Raw returns are nearly uncorrelated even when volatility clusters."],
      ["$\\text{sign}(r_t)$", "cluster-sign", "Signs carry no information about magnitude."],
      ["$\\log P_t$", "cluster-price", "Price levels are dominated by their random-walk trend."],
    ]),
  num(m(SF, "apply-mixture-kurt", "apply", 5, 45, "Returns are $\\mathcal{N}(0, 1)$ with probability $0.5$ and $\\mathcal{N}(0, 4)$ with probability $0.5$. Find their kurtosis. Give $2$ decimal places."), 4.08),
  mcq(m(SF, "apply-conditional-tails", "apply", 5, 30, "Compared with unconditional returns, returns standardised by their conditional volatility typically have:"),
    "Lighter tails, though often still heavier than Gaussian",
    [
      ["Heavier tails", "cond-heavier", "Removing volatility clustering thins the tails."],
      ["Exactly Gaussian tails", "cond-gaussian", "Some heavy-tailedness usually remains."],
      ["No tails", "cond-none", "Every distribution on $\\mathbb{R}$ has tails."],
    ]),
  // level 6
  short(m(SF, "explain-fourth-moment", "explain", 6, 150, "Why does estimating a stock's volatility from the sample average of $r_t^{2}$ need returns to have a finite fourth moment?"),
    [
      ["clt", "The CLT for the average of $x_t = r_t^{2}$ needs $x_t$ to have finite variance", 2, true],
      ["fourth", "$\\text{Var}(r_t^{2})$ involves $\\mathbb{E}[r_t^{4}]$, so the fourth moment must be finite for the estimate to have a usable error; with tail exponent near $4$ this is borderline", 2, true],
    ]),
  num(m(SF, "apply-regime-kurt", "apply", 6, 45, "Returns are $\\mathcal{N}(0, 1)$ on calm days (probability $0.8$) and $\\mathcal{N}(0, 9)$ on stressed days (probability $0.2$). Find their kurtosis. Give $4$ decimal places."), 7.5444),
  num(m(SF, "apply-aggregate-kurt", "apply", 6, 40, "Daily returns are i.i.d. with excess kurtosis $6$. Find the excess kurtosis of the sum of $20$ daily returns."), 0.3),
  mcq(m(SF, "apply-leverage-effect", "apply", 6, 30, "Paleologo leaves the leverage effect (volatility rising after negative returns) off his list of stylized facts because:"),
    "It is not strong enough in recent data",
    [
      ["It has never been observed", "lev-never", "It was well documented historically."],
      ["It applies only to bonds", "lev-bonds", "It was documented for equities."],
      ["It is implied by GARCH(1,1)", "lev-garch", "Standard GARCH(1,1) is symmetric and has no leverage effect."],
    ]),
  // level 7
  short(m(SF, "explain-uncorrelated-dependent", "explain", 7, 150, "Give an example of two random variables that are uncorrelated but dependent, and connect it to stock returns."),
    [
      ["example", "E.g. $X \\sim \\mathcal{N}(0, 1)$ and $Y = X^{2}$: $\\text{Cov}(X, Y) = \\mathbb{E}[X^{3}] = 0$, yet $Y$ is a function of $X$", 2, true],
      ["returns", "Returns are serially uncorrelated but their magnitudes are dependent (today's large move predicts tomorrow's large move)", 2, true],
    ]),
  num(m(SF, "apply-t-kurt", "apply", 7, 35, "A Student $t$ distribution with $\\nu > 4$ degrees of freedom has excess kurtosis $\\frac{6}{\\nu - 4}$. Find it for $\\nu = 6$."), 3),
  num(m(SF, "apply-t-tail-ratio", "apply", 7, 40, "A Student $t$ with $\\nu$ degrees of freedom has tail exponent $\\nu$. For $\\nu = 3$, find the limiting ratio $\\frac{P(r > 2x)}{P(r > x)}$ as $x \\to \\infty$."), 0.125),
  mcq(m(SF, "apply-model-matches", "apply", 7, 40, "Which model produces returns with zero autocorrelation but positive autocorrelation of squared returns?"),
    "GARCH(1,1)",
    [
      ["AR(1) returns with Gaussian noise", "match-ar1", "AR(1) returns are autocorrelated."],
      ["Geometric Brownian motion", "match-gbm", "GBM squared returns are independent."],
      ["i.i.d. Student $t$ returns", "match-iid-t", "i.i.d. returns have no autocorrelation in squares."],
    ]),
  // level 8
  short(m(SF, "explain-clustering-tails", "explain", 8, 150, "Explain how a model with Gaussian returns conditional on volatility can still produce heavy-tailed unconditional returns."),
    [
      ["mixture", "The unconditional distribution is a mixture of Gaussians with different variances", 2, true],
      ["kurtosis", "Mixing variances raises kurtosis: $\\mathbb{E}[r^{4}] = 3\\mathbb{E}[\\sigma^{4}] \\ge 3\\left(\\mathbb{E}[\\sigma^{2}]\\right)^{2}$ by Jensen, with equality only if volatility is constant", 2, true],
    ]),
  mcq(m(SF, "apply-t4", "apply", 8, 35, "Daily returns follow a Student $t$ with $4$ degrees of freedom. Their sample kurtosis will:"),
    "Not converge, because the fourth moment is infinite",
    [
      ["Converge to $3$", "t4-three", "That is the Gaussian value."],
      ["Converge to $9$", "t4-nine", "The excess-kurtosis formula $\\frac{6}{\\nu - 4}$ blows up at $\\nu = 4$."],
      ["Converge to $6$", "t4-six", "The fourth moment does not exist."],
    ]),
  num(m(SF, "apply-weekly-kurt", "apply", 8, 40, "Daily returns are i.i.d. with excess kurtosis $8$. Find the excess kurtosis of weekly ($5$-day) returns."), 1.6),
  num(m(SF, "apply-mixture-var", "apply", 8, 45, "Returns are $\\mathcal{N}(0, \\sigma^{2})$ where $\\sigma = 1\\%$ with probability $0.9$ and $\\sigma = 4\\%$ with probability $0.1$. Find the unconditional standard deviation in percent. Give $2$ decimal places."), 1.58),
  // level 9
  short(m(SF, "design-tail-estimation", "transfer", 9, 180, "You estimate a stock's tail exponent with a maximum-likelihood power-law fit above a cut-off $x_{\\min}$. Explain the trade-off in choosing $x_{\\min}$."),
    [
      ["bias", "Too low a cut-off includes the body of the distribution, where the power law doesn't hold, biasing the exponent", 2, true],
      ["variance", "Too high a cut-off leaves few observations, so the estimate is very noisy", 2, true],
    ]),
  short(m(SF, "transfer-var-gaussian", "transfer", 9, 180, "A risk manager sets a $99.99\\%$ one-day loss limit assuming Gaussian returns. Using the stylized facts, explain the likely error and how to correct it."),
    [
      ["underestimate", "Heavy tails mean extreme quantiles are much larger than Gaussian ones (Gaussian quantiles grow like $\\sqrt{2\\log(1/p)}$, power-law ones like $p^{-1/\\alpha}$), so the limit is breached far more often", 2, true],
      ["fix", "Use a heavy-tailed model (Student $t$, power-law tail, historical or GARCH-filtered simulation) and conditional volatility", 2, true],
    ]),
  num(m(SF, "apply-quantile-ratio", "apply", 9, 60, "With $P(r > x) = 0.2x^{-4}$ in standard-deviation units, the $10^{-4}$ upper quantile is about $6.69$. The Gaussian $10^{-4}$ upper quantile is $3.719$. Find the ratio of the power-law quantile to the Gaussian one. Give $2$ decimal places."), 1.8),
  mcq(m(SF, "apply-ci-kurtosis", "apply", 9, 40, "WAT's sample kurtosis is $29.8$ with a $99\\%$ bootstrap interval of $12.8$ to $48.1$. The wide interval is mainly because:"),
    "Sample kurtosis is driven by a handful of extreme days when the tail exponent is near $4$",
    [
      ["The sample is too short to estimate the mean", "ci-mean", "The mean is irrelevant to the width here."],
      ["Kurtosis cannot exceed $10$", "ci-cap", "Kurtosis is unbounded above."],
      ["The bootstrap is biased", "ci-bootstrap", "The width reflects genuine sampling noise in fourth moments."],
    ]),
  // level 10
  short(m(SF, "judge-predictable-uncorrelated", "transfer", 10, 180, "Returns show almost no autocorrelation, yet the book insists they are predictable. Reconcile the two."),
    [
      ["linear-only", "Autocorrelation measures only linear prediction from the asset's own past returns", 2, true],
      ["other-info", "Returns can be predicted from other variables (characteristics, other assets, flows) or nonlinearly — weakly, but enough to trade", 2, true],
    ]),
  short(m(SF, "judge-kurtosis-compare", "transfer", 10, 180, "A colleague concludes from point estimates that WAT (kurtosis $29.8$) is far riskier in the tails than NRG (kurtosis $14.3$). Critique this."),
    [
      ["noise", "With tail exponents near $4$, sample kurtosis is extremely noisy and dominated by single events; the bootstrap intervals overlap", 2, true],
      ["better", "Compare tail exponents or tail quantiles (with standard errors) rather than kurtosis; and consider conditional (volatility-standardised) tails", 2, true],
    ]),
  num(m(SF, "apply-mixture-fourth", "apply", 10, 90, "Returns are $\\mathcal{N}(0, \\sigma^{2})$ where $\\sigma = 1\\%$ with probability $0.9$ and $\\sigma = 4\\%$ with probability $0.1$. Find their excess kurtosis. Give $2$ decimal places."), 9.72),
  mcq(m(SF, "judge-annual-tail", "transfer", 10, 60, "Daily returns have tail exponent about $4$. A fund manager argues that annual returns are therefore also extremely fat-tailed. What is the best response?"),
    "With a finite variance, aggregation pushes annual returns toward Gaussian, but slowly; volatility clustering slows convergence further",
    [
      ["Annual returns have the same kurtosis as daily returns", "annual-same", "For i.i.d. returns, excess kurtosis shrinks like $\frac{1}{n}$ under aggregation."],
      ["Annual returns are exactly Gaussian", "annual-exact", "Convergence is gradual, not exact."],
      ["Annual returns have no tails", "annual-none", "Every distribution on $\\mathbb{R}$ has tails."],
    ]),
];

export const qi02Items: Item[] = [...assetReturns, ...stylizedFacts];
