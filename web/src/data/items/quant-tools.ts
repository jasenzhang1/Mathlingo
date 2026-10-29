import type { Item } from "../../lib/assessment/types";
import { m, mcq, num, short } from "./quant-tools-shared";

/**
 * The math lessons the Quantitative Investing course builds on that no course
 * had yet: exponential smoothing (time series), Rademacher complexity
 * (machine learning), covariance shrinkage and random matrices (multivariate),
 * and the linear-quadratic regulator (optimization). Forty questions per
 * lesson, four at each level from 1 to 10.
 */

// ---------------------------------------------------------------------------
// exponential-smoothing
// ---------------------------------------------------------------------------
const ES = "exponential-smoothing";
const exponentialSmoothing: Item[] = [
  // level 1
  mcq(m(ES, "recall-recursion", "recall", 1, 15, "The exponentially weighted moving average with decay $\\lambda \\in (0, 1)$ updates as:"),
    "$s_t = \\lambda s_{t-1} + (1 - \\lambda) x_t$",
    [
      ["$s_t = s_{t-1} + \\lambda x_t$", "es-no-decay", "Without shrinking $s_{t-1}$ the average grows without bound."],
      ["$s_t = \\frac{1}{t}\\sum_{k \\le t} x_k$", "es-equal-weights", "That is the running mean, with equal weights."],
      ["$s_t = \\lambda x_t + \\lambda s_{t-1}$", "es-weights-sum", "The two weights must sum to one."],
    ]),
  mcq(m(ES, "recall-weights", "recall", 1, 15, "Unrolling the EWMA recursion, the weight on the observation $k$ steps in the past is:"),
    "$(1 - \\lambda)\\lambda^{k}$",
    [
      ["$\\lambda^{k}$", "es-weight-no-scale", "The factor $(1 - \\lambda)$ makes the weights sum to one."],
      ["$\\frac{1}{k}$", "es-weight-harmonic", "The decay is geometric, not harmonic."],
      ["$(1 - \\lambda)^{k}$", "es-weight-swapped", "Old data decays by powers of $\\lambda$."],
    ]),
  mcq(m(ES, "recall-half-life", "recall", 1, 15, "The half-life of an EWMA is:"),
    "The lag at which an observation's weight has fallen to half the weight of the newest one",
    [
      ["Half the length of the data set", "hl-data", "Half-life depends only on $\\lambda$."],
      ["The time until the average reaches half its final value", "hl-convergence", "It is defined through the weights."],
      ["The value $\\frac{\\lambda}{2}$", "hl-lambda-half", "Half-life is a number of periods, $\\frac{\\log 0.5}{\\log \\lambda}$."],
    ]),
  mcq(m(ES, "recall-smoother", "recall", 1, 15, "Increasing $\\lambda$ towards $1$ makes the EWMA:"),
    "Smoother and slower to react to new data",
    [
      ["More reactive to new data", "smooth-reactive", "Larger $\\lambda$ gives old data more weight."],
      ["Identical to the latest observation", "smooth-latest", "That is the limit $\\lambda \\to 0$."],
      ["Biased upward", "smooth-bias", "$\\lambda$ controls memory, not the sign of any bias."],
    ]),
  // level 2
  num(m(ES, "apply-update", "apply", 2, 20, "With $\\lambda = 0.9$, the current average is $s_{t-1} = 10$ and the new observation is $x_t = 20$. Find $s_t$."), 11),
  num(m(ES, "apply-half-life", "apply", 2, 25, "Find the half-life, in periods, of an EWMA with $\\lambda = 0.94$. Give $1$ decimal place."), 11.2),
  num(m(ES, "apply-weight-lag3", "apply", 2, 20, "With $\\lambda = 0.9$, find the weight on the observation $3$ periods in the past. Give $4$ decimal places."), 0.0729),
  mcq(m(ES, "apply-weights-sum", "apply", 2, 20, "For an infinitely long history, the EWMA weights $(1 - \\lambda)\\lambda^{k}$, $k = 0, 1, 2, \\dots$ sum to:"),
    "$1$",
    [
      ["$\\frac{1}{1 - \\lambda}$", "sum-no-scale", "That is the sum of $\\lambda^{k}$ alone."],
      ["$\\lambda$", "sum-lambda", "The geometric series sums to $\\frac{1 - \\lambda}{1 - \\lambda} = 1$."],
      ["It diverges", "sum-diverges", "A geometric series with ratio $\\lambda < 1$ converges."],
    ]),
  // level 3
  num(m(ES, "apply-lambda-from-hl", "apply", 3, 25, "Find the decay $\\lambda$ of an EWMA with a half-life of $20$ periods. Give $4$ decimal places."), 0.9659),
  num(m(ES, "apply-center-of-mass", "apply", 3, 25, "The average age of the data in an EWMA, $\\sum_k k(1 - \\lambda)\\lambda^{k}$, equals $\\frac{\\lambda}{1 - \\lambda}$. Find it for $\\lambda = 0.95$."), 19),
  num(m(ES, "apply-two-updates", "apply", 3, 25, "Starting from $s_0 = 0$ with $\\lambda = 0.8$, the observations $x_1 = 10$ and $x_2 = 10$ arrive. Find $s_2$."), 3.6),
  mcq(m(ES, "apply-forecast-shape", "apply", 3, 20, "Simple exponential smoothing forecasts the next $h$ values of a series as:"),
    "A flat line at the current smoothed level, for every $h$",
    [
      ["A straight line continuing the recent trend", "shape-trend", "That needs Holt's trend extension."],
      ["A curve that decays to zero", "shape-decay", "The level is carried forward unchanged."],
      ["The last observation", "shape-last", "That is the naive forecast, the case $\\lambda = 0$."],
    ]),
  // level 4
  num(m(ES, "apply-variance-iid", "apply", 4, 35, "For i.i.d. data with variance $\\sigma^{2} = 1$, the steady-state variance of an EWMA is $\\frac{1 - \\lambda}{1 + \\lambda}\\sigma^{2}$. Find it for $\\lambda = 0.9$. Give $4$ decimal places."), 0.0526),
  num(m(ES, "apply-effective-n", "apply", 4, 35, "The effective sample size of an EWMA on i.i.d. data is $\\frac{1 + \\lambda}{1 - \\lambda}$. Find it for $\\lambda = 0.94$. Give $2$ decimal places."), 32.33),
  num(m(ES, "apply-kalman-gain", "apply", 4, 45, "In the local-level model $x_{t+1} = x_t + \\eta_{t+1}$, $y_t = x_t + \\epsilon_t$ with $\\text{Var}(\\eta) = q = 1$ and $\\text{Var}(\\epsilon) = r = 4$, the steady-state prior variance solves $P^{2} - qP - qr = 0$ and the gain is $K = \\frac{P}{P + r}$. Find $K$. Give $4$ decimal places."), 0.3904),
  mcq(m(ES, "apply-arima", "apply", 4, 30, "Simple exponential smoothing gives the optimal forecasts for which ARIMA model?"),
    "ARIMA$(0, 1, 1)$",
    [
      ["AR$(1)$", "arima-ar1", "AR(1) forecasts decay to the mean; SES forecasts are flat at the level."],
      ["ARIMA$(1, 1, 0)$", "arima-110", "The equivalent model has a moving-average term, not an AR term."],
      ["White noise", "arima-wn", "For white noise the best forecast is the constant mean."],
    ]),
  // level 5
  short(m(ES, "explain-local-level", "explain", 5, 120, "Explain why an exponentially weighted average is the optimal estimator of a random walk observed with noise."),
    [
      ["kalman", "The local-level model is linear-Gaussian, so the Kalman filter is optimal; its gain converges to a constant $K$", 2, true],
      ["form", "With constant gain the update $\\hat{x}_t = (1 - K)\\hat{x}_{t-1} + K y_t$ is exactly an EWMA with $\\lambda = 1 - K$", 2, true],
    ]),
  mcq(m(ES, "apply-init-bias", "apply", 5, 30, "Starting an EWMA at $s_0 = 0$ on a series of positive values biases the early averages:"),
    "Downward, by the factor $1 - \\lambda^{t}$, which fades as $t$ grows",
    [
      ["Upward", "init-up", "Weight $\\lambda^{t}$ stays on the zero starting value."],
      ["Not at all", "init-none", "The starting value carries weight $\\lambda^{t}$."],
      ["Permanently", "init-permanent", "$\\lambda^{t} \\to 0$."],
    ]),
  num(m(ES, "apply-old-weight", "apply", 5, 30, "With $\\lambda = 0.9$, find the total weight on observations more than $10$ periods old, $\\lambda^{10}$. Give $4$ decimal places."), 0.3487),
  num(m(ES, "apply-init-value", "apply", 5, 35, "Starting from $s_0 = 0$ with $\\lambda = 0.9$, a constant series $x_t = 5$ arrives. Find $s_3$. Give $3$ decimal places."), 1.355),
  // level 6
  short(m(ES, "explain-choose-lambda", "explain", 6, 150, "Explain the trade-off in choosing $\\lambda$ when the quantity being tracked drifts over time."),
    [
      ["variance", "A larger $\\lambda$ averages more data, reducing noise (variance)", 2, true],
      ["bias", "But it lags behind changes in the underlying level (bias); a smaller $\\lambda$ tracks changes faster but is noisier", 2, true],
    ]),
  num(m(ES, "apply-sse", "apply", 6, 45, "Using SES with $\\lambda = 0.5$ and initial forecast $2$, the series $2, 4, 3$ arrives; each forecast is the smoothed value before the observation. Find the sum of squared one-step forecast errors."), 4),
  num(m(ES, "apply-trend-lag", "apply", 6, 40, "A series grows by exactly $1$ per period. In steady state, an EWMA with $\\lambda = 0.8$ lags the current value by $\\frac{\\lambda}{1 - \\lambda}$ times the slope. Find the lag."), 4),
  mcq(m(ES, "apply-signal-to-noise", "apply", 6, 35, "In the local-level model, if the state noise $q$ grows large relative to the observation noise $r$, the optimal gain $K$:"),
    "Approaches $1$: trust the newest observation",
    [
      ["Approaches $0$", "snr-zero", "That happens when observation noise dominates."],
      ["Stays at $\\frac{1}{2}$", "snr-half", "$K$ depends on $\\frac{q}{r}$."],
      ["Becomes negative", "snr-negative", "Gains lie in $(0, 1)$."],
    ]),
  // level 7
  short(m(ES, "derive-weights", "explain", 7, 150, "Derive the weights of the EWMA by unrolling $s_t = \\lambda s_{t-1} + (1 - \\lambda)x_t$ from $s_0$."),
    [
      ["unroll", "Substitutes repeatedly to get $s_t = (1 - \\lambda)\\sum_{k=0}^{t-1}\\lambda^{k}x_{t-k} + \\lambda^{t}s_0$", 2, true],
      ["sum", "Notes the weights sum to $1 - \\lambda^{t}$ on the data plus $\\lambda^{t}$ on $s_0$, i.e. to $1$", 1, true],
    ]),
  num(m(ES, "apply-gain-low-snr", "apply", 7, 45, "In the local-level model with $q = 1$ and $r = 100$, find the steady-state gain $K$. Give $4$ decimal places."), 0.0951),
  num(m(ES, "apply-ma-coefficient", "apply", 7, 40, "SES with $\\lambda = 0.7$ is optimal for $x_t - x_{t-1} = \\varepsilon_t - \\theta\\varepsilon_{t-1}$. Find $\\theta$."), 0.7),
  mcq(m(ES, "apply-sma-match", "apply", 7, 40, "An EWMA with average age $c = \\frac{\\lambda}{1 - \\lambda}$ and a simple moving average of $2c + 1$ points, applied to i.i.d. data, have:"),
    "The same variance, $\\frac{\\sigma^{2}}{2c + 1}$",
    [
      ["Variances differing by a factor $2$", "sma-factor-two", "Substituting $c$ gives $\\frac{1 - \\lambda}{1 + \\lambda} = \\frac{1}{2c + 1}$."],
      ["The same weights", "sma-weights", "The weights differ (flat versus geometric); only the variances agree."],
      ["The EWMA always has the larger variance", "sma-ewma-larger", "They are equal at matched average age."],
    ]),
  // level 8
  short(m(ES, "explain-holt", "explain", 8, 150, "Why does simple exponential smoothing lag a trending series, and how does Holt's method fix it?"),
    [
      ["lag", "SES assumes a locally constant level, so with a trend its estimate always trails by about $\\frac{\\lambda}{1 - \\lambda}$ times the slope", 2, true],
      ["holt", "Holt adds a second smoothed state for the slope, updated from changes in the level, and forecasts level plus $h$ times slope", 2, true],
    ]),
  num(m(ES, "apply-holt", "apply", 8, 50, "Holt's method: $\\ell_t = \\alpha x_t + (1 - \\alpha)(\\ell_{t-1} + b_{t-1})$ and $b_t = \\beta(\\ell_t - \\ell_{t-1}) + (1 - \\beta)b_{t-1}$. With $\\alpha = 0.5$, $\\beta = 0.2$, $\\ell_{t-1} = 10$, $b_{t-1} = 1$ and $x_t = 13$, find the two-step-ahead forecast $\\ell_t + 2b_t$."), 14.4),
  num(m(ES, "apply-posterior-var", "apply", 8, 50, "In the local-level model with $q = 1$ and $r = 4$, the steady-state gain is $K \\approx 0.3904$ and the posterior variance is $P_{t|t} = rK$. Find $P_{t|t}$. Give $4$ decimal places."), 1.5616),
  mcq(m(ES, "apply-ratio-only", "apply", 8, 40, "In the local-level model, the steady-state gain $K$ depends on the noise variances $q$ and $r$ only through:"),
    "Their ratio $\\frac{r}{q}$",
    [
      ["Their sum", "ratio-sum", "Scaling both by the same factor leaves $K$ unchanged."],
      ["$q$ alone", "ratio-q", "Observation noise matters too."],
      ["Their product", "ratio-product", "Only the noise-to-signal ratio matters."],
    ]),
  // level 9
  short(m(ES, "transfer-level-shift", "transfer", 9, 180, "A series jumps permanently from $0$ to $10$ at time $0$. Describe how an EWMA with decay $\\lambda$ responds over time, and how you would choose $\\lambda$ if such jumps are frequent."),
    [
      ["response", "After $t$ periods the EWMA has moved $10(1 - \\lambda^{t})$: it closes the gap geometrically, half of it within one half-life", 2, true],
      ["choice", "Frequent jumps (large state noise relative to measurement noise) call for a smaller $\\lambda$ / shorter half-life", 2, true],
    ]),
  short(m(ES, "transfer-half-life-choice", "transfer", 9, 180, "You smooth a daily signal to forecast it one week ahead. How would you choose the half-life in practice, and what would you check?"),
    [
      ["validation", "Choose the half-life by minimising out-of-sample forecast error over a grid (walk-forward), not in-sample fit", 2, true],
      ["checks", "Check stability across periods and the bias–variance behaviour (lag after shifts versus noise), and avoid look-ahead in the evaluation", 2, true],
    ]),
  num(m(ES, "apply-optimal-lambda", "apply", 9, 60, "In the local-level model with $q = r = 1$, find the optimal smoothing decay $\\lambda = 1 - K$. Give $3$ decimal places."), 0.382),
  mcq(m(ES, "apply-arima-implication", "apply", 9, 40, "Because SES is optimal for ARIMA$(0, 1, 1)$, its forecast errors on data from that model are:"),
    "White noise — uncorrelated one-step errors",
    [
      ["Positively autocorrelated", "imp-positive", "Optimal one-step errors are innovations."],
      ["Trending upward", "imp-trend", "Errors have mean zero."],
      ["Equal to zero", "imp-zero", "The innovations are unpredictable, not zero."],
    ]),
  // level 10
  short(m(ES, "judge-when-suboptimal", "transfer", 10, 180, "Give two kinds of series for which simple exponential smoothing is a poor estimator, and say what you would use instead."),
    [
      ["mean-reverting", "A stationary, mean-reverting series: SES ignores the pull to the mean; an AR model (or a Kalman filter with an AR state) is better", 2, true],
      ["trend-season", "Series with trends or seasonality: use Holt or Holt–Winters, or an ARIMA/state-space model with those components", 1, true],
      ["heavy-tails", "Heavy-tailed observation noise: one outlier moves the EWMA a lot; robust filters or winsorizing help", 1, false],
    ]),
  num(m(ES, "apply-gain-from-lambda", "apply", 10, 90, "An EWMA with $\\lambda = 0.9$ is optimal for a local-level model. Find the implied noise ratio $\\frac{r}{q}$, using $\\frac{K^{2}}{1 - K} = \\frac{q}{r}$ for the steady-state gain $K = 1 - \\lambda$. Give $1$ decimal place."), 90),
  mcq(m(ES, "judge-mean-reverting-gain", "transfer", 10, 60, "If the hidden level in a local-level model mean-reverts instead of following a random walk (same noise variances), the optimal steady-state gain:"),
    "Falls, so the filter discounts the past less",
    [
      ["Rises", "mr-rises", "Mean reversion concentrates the state, making old observations more informative."],
      ["Is unchanged", "mr-unchanged", "The Riccati equation depends on the state dynamics."],
      ["Becomes $1$", "mr-one", "Mean reversion makes the state more predictable, not less."],
    ]),
  short(m(ES, "judge-volatility-use", "transfer", 10, 180, "Explain why exponentially weighting squared returns is a sensible volatility estimator, and what the local-level model gets wrong about volatility."),
    [
      ["rationale", "Squared returns are noisy, unbiased readings of the current variance, and the variance drifts — exactly a level observed in noise, so the EWMA is the filter", 2, true],
      ["flaws", "The model lets variance go negative and wander without bound (real volatility mean-reverts), and the noise in $r^{2}$ is far from Gaussian", 2, true],
    ]),
];

// ---------------------------------------------------------------------------
// rademacher-complexity
// ---------------------------------------------------------------------------
const RC = "rademacher-complexity";
const rademacherComplexity: Item[] = [
  // level 1
  mcq(m(RC, "recall-definition", "recall", 1, 15, "The empirical Rademacher complexity of a class $\\mathcal{F}$ on points $x_1, \\dots, x_n$ is:"),
    "$\\hat{R}(\\mathcal{F}) = \\mathbb{E}_\\sigma\\left[\\sup_{f \\in \\mathcal{F}} \\frac{1}{n}\\sum_{i=1}^{n} \\sigma_i f(x_i)\\right]$ with i.i.d. random signs $\\sigma_i$",
    [
      ["$\\sup_{f} \\frac{1}{n}\\sum_i f(x_i)$", "rc-no-signs", "Without random signs it measures the best average, not the ability to fit noise."],
      ["$\\frac{1}{n}\\sum_i \\sigma_i x_i$", "rc-no-class", "The supremum over the class is essential."],
      ["The number of functions in $\\mathcal{F}$", "rc-count", "It accounts for how different the functions are, not just how many."],
    ]),
  mcq(m(RC, "recall-meaning", "recall", 1, 15, "A large Rademacher complexity means the class:"),
    "Can correlate well with random noise labels, so its best in-sample fit is likely to overstate out-of-sample performance",
    [
      ["Fits the true signal well", "rcmean-signal", "It measures fit to pure noise."],
      ["Has few parameters", "rcmean-few", "Rich classes have large complexity."],
      ["Always generalizes", "rcmean-generalize", "It's the opposite."],
    ]),
  mcq(m(RC, "recall-sigma", "recall", 1, 15, "Rademacher variables take the values:"),
    "$+1$ and $-1$, each with probability $\\frac{1}{2}$",
    [
      ["$0$ and $1$", "sigma-bernoulli", "That is a Bernoulli variable."],
      ["Any real number", "sigma-real", "They are signs."],
      ["$-1$, $0$ and $1$", "sigma-three", "Only two values."],
    ]),
  mcq(m(RC, "recall-bound-shape", "recall", 1, 15, "For losses in $[0, 1]$, with probability at least $1 - \\delta$, every $f \\in \\mathcal{F}$ satisfies:"),
    "$L(f) \\le \\hat{L}(f) + 2R_n(\\mathcal{F}) + \\sqrt{\\frac{\\log(1/\\delta)}{2n}}$",
    [
      ["$L(f) \\le \\hat{L}(f)$", "bound-none", "The training loss is optimistic."],
      ["$L(f) \\le \\hat{L}(f) + R_n(\\mathcal{F})^{2}$", "bound-squared", "The complexity enters linearly, times $2$."],
      ["$L(f) = \\hat{L}(f) + \\frac{1}{n}$", "bound-equal", "It's a high-probability inequality."],
    ]),
  // level 2
  num(m(RC, "apply-single", "apply", 2, 20, "Find the Rademacher complexity of a class containing a single fixed function."), 0),
  num(m(RC, "apply-massart", "apply", 2, 25, "Massart's lemma: for $N$ functions bounded by $1$, $\\hat{R} \\le \\sqrt{\\frac{2\\log N}{n}}$. Find the bound for $N = 100$, $n = 1{,}000$. Give $3$ decimal places."), 0.096),
  num(m(RC, "apply-linear", "apply", 2, 20, "For linear functions $x \\mapsto \\mathbf{w}^{\\top}\\mathbf{x}$ with $\\|\\mathbf{w}\\| \\le B$ and data $\\|\\mathbf{x}\\| \\le X$, $\\hat{R} \\le \\frac{BX}{\\sqrt{n}}$. Find it for $B = 2$, $X = 3$, $n = 900$."), 0.2),
  mcq(m(RC, "apply-scale", "apply", 2, 20, "Multiplying every function in $\\mathcal{F}$ by $3$ multiplies $\\hat{R}(\\mathcal{F})$ by:"),
    "$3$",
    [
      ["$9$", "scale-nine", "The supremum of a linear expression scales linearly."],
      ["$1$", "scale-one", "Scaling changes the fit to noise proportionally."],
      ["$\\sqrt{3}$", "scale-root", "No square root arises."],
    ]),
  // level 3
  num(m(RC, "apply-conf-term", "apply", 3, 25, "Find the confidence term $\\sqrt{\\frac{\\log(1/\\delta)}{2n}}$ for $\\delta = 0.05$ and $n = 1{,}000$. Give $4$ decimal places."), 0.0387),
  num(m(RC, "apply-hoeffding", "apply", 3, 25, "Hoeffding: for $n$ i.i.d. variables in $[0, 1]$, $P(|\\bar{X} - \\mu| \\ge t) \\le 2e^{-2nt^{2}}$. Find the bound for $n = 1{,}000$ and $t = 0.05$. Give $4$ decimal places."), 0.0135),
  num(m(RC, "apply-sample-size", "apply", 3, 25, "With $B = X = 1$, how many samples make the linear-class bound $\\frac{BX}{\\sqrt{n}}$ equal to $0.05$?"), 400),
  mcq(m(RC, "apply-duplicates", "apply", 3, 25, "Adding a copy of a function already in $\\mathcal{F}$:"),
    "Leaves $\\hat{R}$ unchanged",
    [
      ["Doubles $\\hat{R}$", "dup-doubles", "The supremum over identical functions is unchanged."],
      ["Increases $\\hat{R}$ by $\\frac{1}{n}$", "dup-increment", "Nothing new can fit the noise."],
      ["Sets $\\hat{R}$ to zero", "dup-zero", "Other functions remain."],
    ]),
  // level 4
  num(m(RC, "apply-two-functions", "apply", 4, 40, "On $n = 2$ points, $\\mathcal{F}$ has two functions with value vectors $[1, 1]$ and $[-1, -1]$. Compute $\\hat{R}$ exactly over the four sign vectors."), 0.5),
  num(m(RC, "apply-shatter", "apply", 4, 40, "On $n = 2$ points, $\\mathcal{F}$ contains all four sign patterns $[\\pm 1, \\pm 1]$. Compute $\\hat{R}$."), 1),
  num(m(RC, "apply-unit-vectors", "apply", 4, 40, "On $n = 2$ points, $\\mathcal{F}$ has value vectors $[1, 0]$ and $[0, 1]$. Compute $\\hat{R}$."), 0.25),
  mcq(m(RC, "apply-shift", "apply", 4, 30, "Adding a fixed function $g$ to every member of $\\mathcal{F}$ changes $\\hat{R}$ by:"),
    "Nothing, since $\\mathbb{E}_\\sigma\\left[\\frac{1}{n}\\sum_i\\sigma_i g(x_i)\\right] = 0$",
    [
      ["$\\frac{1}{n}\\sum_i g(x_i)$", "shift-mean", "Random signs average the shift away."],
      ["A factor of $2$", "shift-double", "Shifts don't rescale."],
      ["It becomes infinite", "shift-infinite", "It stays finite."],
    ]),
  // level 5
  short(m(RC, "explain-why-noise", "explain", 5, 120, "Explain why the ability to fit random signs measures overfitting risk."),
    [
      ["noise", "Random signs contain no learnable structure, so any correlation a class achieves with them is pure fitting of noise", 2, true],
      ["link", "A class that fits noise well will also fit the noise in real training data, inflating in-sample performance by about that amount", 2, true],
    ]),
  mcq(m(RC, "apply-hull", "apply", 5, 30, "Replacing $\\mathcal{F}$ by its convex hull (all mixtures of its functions):"),
    "Leaves $\\hat{R}$ unchanged",
    [
      ["Increases $\\hat{R}$", "hull-increase", "A linear objective's supremum over a hull is attained at extreme points."],
      ["Decreases $\\hat{R}$", "hull-decrease", "The hull contains the original functions."],
      ["Makes $\\hat{R}$ infinite", "hull-infinite", "It stays bounded."],
    ]),
  num(m(RC, "apply-full-bound", "apply", 5, 40, "A classifier has training error $0.10$ on $n = 2{,}000$ points and its class has $R_n = 0.03$. With $\\delta = 0.05$, find the generalization bound $\\hat{L} + 2R_n + \\sqrt{\\frac{\\log(1/\\delta)}{2n}}$. Give $3$ decimal places."), 0.187),
  num(m(RC, "apply-massart-big", "apply", 5, 35, "Using Massart's lemma, bound $\\hat{R}$ for $N = 10^{6}$ functions bounded by $1$ on $n = 10{,}000$ points. Give $4$ decimal places."), 0.0526),
  // level 6
  short(m(RC, "explain-vs-count", "explain", 6, 150, "Why is Rademacher complexity a better measure of a class's richness than the number of functions in it?"),
    [
      ["dependence", "It accounts for how different the functions are on the data: near-duplicates add almost nothing, while many very different functions add a lot", 2, true],
      ["data", "It is data-dependent and also handles infinite classes (e.g. bounded linear functions), where counting fails", 2, true],
    ]),
  num(m(RC, "apply-three-functions", "apply", 6, 50, "On $n = 3$ points, $\\mathcal{F}$ has value vectors $[1, 1, 1]$ and $[1, -1, 1]$. Compute $\\hat{R}$ exactly. Give $4$ decimal places."), 0.3333),
  num(m(RC, "apply-n-for-conf", "apply", 6, 40, "How many samples make $\\sqrt{\\frac{\\log(1/\\delta)}{2n}} = 0.02$ when $\\delta = 0.05$? Round up to a whole number."), 3745),
  mcq(m(RC, "apply-log-growth", "apply", 6, 35, "By Massart's lemma, multiplying the number of (bounded) functions by $1{,}000$ raises the complexity bound:"),
    "Only logarithmically — adding $\\log 1{,}000$ inside the square root",
    [
      ["By a factor of $1{,}000$", "growth-linear", "Growth is logarithmic in $N$."],
      ["By a factor of $\\sqrt{1{,}000}$", "growth-sqrt", "The square root is over $\\log N$."],
      ["Not at all", "growth-none", "It grows, slowly."],
    ]),
  // level 7
  short(m(RC, "derive-symmetrization", "explain", 7, 150, "Outline the symmetrization argument that bounds $\\mathbb{E}\\left[\\sup_f (\\mathbb{E}f - \\hat{\\mathbb{E}}f)\\right]$ by $2R_n$."),
    [
      ["ghost", "Replace $\\mathbb{E}f$ by the average over an independent ghost sample, and pull the supremum outside by Jensen", 2, true],
      ["signs", "Swapping a point with its ghost doesn't change the distribution, so insert random signs $\\sigma_i$; splitting the two samples gives two Rademacher averages, hence $2R_n$", 2, true],
    ]),
  num(m(RC, "apply-mcdiarmid-c", "apply", 7, 40, "For $f(x_1, \\dots, x_n) = \\sup_{g}\\frac{1}{n}\\sum_i g(x_i)$ with $g$ taking values in $[0, 1]$, by at most how much can changing one $x_i$ move $f$, for $n = 500$?"), 0.002),
  num(m(RC, "apply-bounded-two", "apply", 7, 40, "For two functions on $n = 2$ points with value vectors $[1, -1]$ and $[-1, 1]$, compute $\\hat{R}$."), 0.5),
  mcq(m(RC, "apply-contraction", "apply", 7, 40, "Talagrand's contraction lemma lets you bound the complexity of a loss class $\\ell \\circ \\mathcal{F}$ by:"),
    "$L \\cdot \\hat{R}(\\mathcal{F})$ when the loss is $L$-Lipschitz",
    [
      ["$\\hat{R}(\\mathcal{F})^{L}$", "contract-power", "The relation is linear in $L$."],
      ["$\\hat{R}(\\mathcal{F}) + L$", "contract-add", "It's multiplicative."],
      ["Zero", "contract-zero", "Lipschitz losses don't remove complexity."],
    ]),
  // level 8
  short(m(RC, "explain-mcdiarmid-role", "explain", 8, 150, "What role does McDiarmid's (bounded differences) inequality play in Rademacher generalization bounds?"),
    [
      ["concentration", "The worst-case gap $\\sup_f (\\mathbb{E}f - \\hat{\\mathbb{E}}f)$ changes by at most $\\frac{c}{n}$ when one sample changes, so it concentrates around its expectation", 2, true],
      ["terms", "That gives the $\\sqrt{\\frac{\\log(1/\\delta)}{2n}}$ term; applying it again lets you replace $R_n$ by the computable empirical $\\hat{R}$", 2, true],
    ]),
  num(m(RC, "apply-linear-needed", "apply", 8, 45, "A linear class has $\\|\\mathbf{w}\\| \\le 5$ and features with $\\|\\mathbf{x}\\| \\le 2$. How many samples make $2\\frac{BX}{\\sqrt{n}}$ at most $0.1$?"), 40000),
  num(m(RC, "apply-hoeffding-n", "apply", 8, 45, "How many samples make the Hoeffding bound $2e^{-2nt^{2}}$ equal $0.01$ for $t = 0.02$? Round up to a whole number."), 6623),
  mcq(m(RC, "apply-gaussian-vs", "apply", 8, 40, "Gaussian complexity replaces $\\sigma_i$ by standard normals. Up to constants and log factors, it is:"),
    "Equivalent to Rademacher complexity",
    [
      ["Always zero", "gauss-zero", "It measures the same richness."],
      ["Unrelated", "gauss-unrelated", "They bound each other."],
      ["Infinite for finite classes", "gauss-infinite", "It's finite for bounded finite classes."],
    ]),
  // level 9
  short(m(RC, "transfer-backtests", "transfer", 9, 180, "Explain how Rademacher complexity applies to choosing the best of many trading strategies, where each strategy's daily performance plays the role of $f(x_t)$."),
    [
      ["mapping", "Each strategy is a function; the data are the $T$ days; the best backtest is the supremum of in-sample averages", 2, true],
      ["haircut", "The best strategy's true performance is at least its in-sample average minus $2\\hat{R}$ minus a confidence term — a uniform data-snooping haircut that accounts for strategy correlations", 2, true],
    ]),
  short(m(RC, "explain-estimate", "explain", 9, 150, "How would you compute $\\hat{R}$ for a set of $10^{6}$ strategies over $2{,}500$ days in practice?"),
    [
      ["monte-carlo", "Draw many random sign vectors, compute $\\max_n \\frac{1}{T}\\boldsymbol{\\sigma}^{\\top}\\mathbf{x}_n$ for each (one matrix–vector product), and average", 2, true],
      ["cost", "Each draw costs $O(TN)$; a few hundred draws give a precise estimate, and the average concentrates quickly", 1, true],
    ]),
  num(m(RC, "apply-combined", "apply", 9, 60, "For $N = 1{,}000$ strategies with performance in $[-1, 1]$ over $T = 2{,}500$ periods, Massart gives $\\hat{R} \\le \\sqrt{\\frac{2\\log N}{T}}$. Find the resulting snooping haircut $2\\hat{R}$. Give $4$ decimal places."), 0.1487),
  mcq(m(RC, "apply-vc", "apply", 9, 40, "For a class of binary classifiers with VC dimension $d$, Rademacher complexity scales roughly as:"),
    "$\\sqrt{\\frac{d\\log n}{n}}$",
    [
      ["$\\frac{d}{n^{2}}$", "vc-square", "Too fast a decay."],
      ["$d$", "vc-constant", "It decreases with $n$."],
      ["$\\sqrt{dn}$", "vc-grow", "It shrinks with more data."],
    ]),
  // level 10
  short(m(RC, "judge-limits", "transfer", 10, 180, "What assumptions behind Rademacher generalization bounds are most likely to fail in financial data, and how can you mitigate them?"),
    [
      ["iid", "The i.i.d. assumption: returns have serial dependence (especially in volatility) and non-stationarity", 2, true],
      ["mitigate", "Mitigate by blocking (averaging over non-overlapping blocks), standardizing by forecast volatility, and walk-forward testing; bounds on unbounded data need sub-Gaussian tails", 2, true],
    ]),
  short(m(RC, "judge-loose", "transfer", 10, 180, "Rademacher bounds are often loose. Why are they still useful for model selection?"),
    [
      ["relative", "They rank classes by their capacity to fit noise in a data-dependent way, which is what matters for comparing options", 2, true],
      ["guarantee", "And they provide a finite-sample, distribution-free guarantee that holds uniformly over the class, unlike single-model p-values", 2, true],
    ]),
  num(m(RC, "apply-ratio-bound", "apply", 10, 90, "Two strategy sets on $T = 2{,}500$ days: set A has $N = 10$ and set B has $N = 10^{6}$ bounded strategies. Using Massart's bound $\\sqrt{\\frac{2\\log N}{T}}$, find the ratio of B's bound to A's. Give $3$ decimal places."), 2.449),
  mcq(m(RC, "judge-sup-attained", "transfer", 10, 60, "Why is the supremum over the class, not the average, used inside the definition?"),
    "Because learning selects the best-looking function, so the relevant error is that of the worst-case (most overfit) member",
    [
      ["Because the average is always zero", "sup-avg", "The average correlation with random signs is zero only per function."],
      ["For computational convenience", "sup-compute", "The supremum is harder to compute."],
      ["Because classes are finite", "sup-finite", "Infinite classes use the supremum too."],
    ]),
];

// ---------------------------------------------------------------------------
// covariance-shrinkage
// ---------------------------------------------------------------------------
const CV = "covariance-shrinkage";
const covarianceShrinkage: Item[] = [
  // level 1
  mcq(m(CV, "recall-form", "recall", 1, 15, "Linear shrinkage of a sample covariance $\\mathbf{S}$ toward a target $\\mathbf{F}$ produces:"),
    "$\\hat{\\boldsymbol{\\Sigma}} = \\rho\\mathbf{F} + (1 - \\rho)\\mathbf{S}$ with $\\rho \\in [0, 1]$",
    [
      ["$\\mathbf{S} + \\mathbf{F}$", "shr-sum", "Shrinkage is a weighted average, not a sum."],
      ["$\\mathbf{S}\\mathbf{F}$", "shr-product", "The product needn't be symmetric or a covariance."],
      ["$\\rho\\mathbf{S}$", "shr-scale", "Scaling alone doesn't move toward a target."],
    ]),
  mcq(m(CV, "recall-why", "recall", 1, 15, "Shrinkage improves a covariance estimate by:"),
    "Accepting a little bias toward a structured target in exchange for a large reduction in estimation variance",
    [
      ["Removing all bias", "why-unbiased", "The sample covariance is already unbiased; shrinkage adds bias."],
      ["Using more data", "why-data", "It uses the same data."],
      ["Making the matrix diagonal", "why-diagonal", "Only an extreme target does that."],
    ]),
  mcq(m(CV, "recall-singular", "recall", 1, 15, "With $p$ variables and $T < p$ observations, the sample covariance matrix is:"),
    "Singular, with at least $p - T$ zero eigenvalues",
    [
      ["Always invertible", "sing-invertible", "Its rank is at most $T$."],
      ["Diagonal", "sing-diagonal", "Sample correlations are nonzero."],
      ["Negative definite", "sing-negative", "It is positive semidefinite."],
    ]),
  mcq(m(CV, "recall-target", "recall", 1, 15, "Which is a common shrinkage target?"),
    "A scaled identity $\\mu\\mathbf{I}$ with $\\mu = \\frac{\\text{tr}(\\mathbf{S})}{p}$",
    [
      ["The zero matrix", "target-zero", "That would shrink all variances to zero."],
      ["The inverse of $\\mathbf{S}$", "target-inverse", "Not a covariance target."],
      ["A random matrix", "target-random", "Targets are structured, low-variance estimates."],
    ]),
  // level 2
  num(m(CV, "apply-mu", "apply", 2, 20, "A $3 \\times 3$ sample covariance has diagonal $0.04$, $0.09$ and $0.02$. Find $\\mu = \\frac{\\text{tr}(\\mathbf{S})}{3}$."), 0.05),
  num(m(CV, "apply-entry", "apply", 2, 25, "With that $\\mu = 0.05$ and $\\rho = 0.4$, find the shrunk variance of the first variable (sample $0.04$)."), 0.044),
  num(m(CV, "apply-off", "apply", 2, 20, "With $\\rho = 0.4$ toward $\\mu\\mathbf{I}$, a sample covariance of $0.015$ becomes what?"), 0.009),
  mcq(m(CV, "apply-eigvec", "apply", 2, 20, "Shrinking toward $\\mu\\mathbf{I}$ leaves unchanged the sample covariance's:"),
    "Eigenvectors",
    [
      ["Eigenvalues", "eigvec-values", "Eigenvalues move toward $\\mu$."],
      ["Off-diagonal entries", "eigvec-offdiag", "They shrink by $1 - \\rho$."],
      ["Condition number", "eigvec-cond", "It improves."],
    ]),
  // level 3
  num(m(CV, "apply-eig-shrink", "apply", 3, 25, "A sample covariance has eigenvalues $3$, $1$ and $0.2$. Shrink toward the mean eigenvalue with $\\rho = 0.5$. Find the new largest eigenvalue."), 2.2),
  num(m(CV, "apply-cond-before", "apply", 3, 20, "Find the condition number (largest over smallest eigenvalue) of the matrix with eigenvalues $3$, $1$ and $0.2$."), 15),
  num(m(CV, "apply-cond-after", "apply", 3, 25, "After shrinking those eigenvalues halfway to their mean $1.4$, find the condition number."), 2.75),
  mcq(m(CV, "apply-rho-extremes", "apply", 3, 20, "Shrinkage intensity $\\rho = 1$ gives:"),
    "The target alone",
    [
      ["The sample covariance", "rho-sample", "That is $\\rho = 0$."],
      ["The zero matrix", "rho-zero", "It gives $\\mathbf{F}$."],
      ["The inverse of the target", "rho-inverse", "No inversion is involved."],
    ]),
  // level 4
  num(m(CV, "apply-optimal-rho", "apply", 4, 40, "Under a simple model, the Frobenius-optimal intensity is $\\rho^{*} = \\frac{\\mathbb{E}\\|\\mathbf{S} - \\boldsymbol{\\Sigma}\\|^{2}}{\\mathbb{E}\\|\\mathbf{S} - \\mathbf{F}\\|^{2}}$. With numerator $0.3$ and denominator $1.2$, find $\\rho^{*}$."), 0.25),
  num(m(CV, "apply-zero-eigs", "apply", 4, 30, "A sample covariance of $p = 500$ stocks from $T = 300$ returns (uncentered). Find the minimum number of zero eigenvalues."), 200),
  num(m(CV, "apply-shrunk-min-eig", "apply", 4, 40, "A singular sample covariance has eigenvalues $2$, $1$ and $0$. Shrinking toward $\\mu\\mathbf{I}$ with $\\rho = 0.2$, find the smallest eigenvalue of the result."), 0.2),
  mcq(m(CV, "apply-const-corr", "apply", 4, 30, "The constant-correlation target keeps each sample variance but sets every correlation to:"),
    "The average sample correlation",
    [
      ["Zero", "constcorr-zero", "That is the diagonal target."],
      ["One", "constcorr-one", "That would be singular."],
      ["The largest sample correlation", "constcorr-max", "It uses the average."],
    ]),
  // level 5
  short(m(CV, "explain-dispersion", "explain", 5, 120, "Explain why the eigenvalues of a sample covariance are too dispersed, and how shrinkage toward $\\mu\\mathbf{I}$ corrects this."),
    [
      ["dispersion", "With finite $T$, noise spreads sample eigenvalues: the largest are biased up and the smallest down, even when the true eigenvalues are all equal", 2, true],
      ["correction", "Shrinkage pulls every eigenvalue toward their mean by the factor $1 - \\rho$, undoing part of the spread while keeping eigenvectors", 2, true],
    ]),
  num(m(CV, "apply-frob", "apply", 5, 35, "Find the squared Frobenius distance between $\\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}$ and $\\mathbf{I}$."), 4),
  mcq(m(CV, "apply-mvp", "apply", 5, 30, "Why does shrinkage matter especially for minimum-variance portfolios?"),
    "They use the inverse covariance, which amplifies errors in the smallest eigenvalues — exactly the ones the sample underestimates",
    [
      ["They only use variances", "mvp-variances", "They use the full inverse."],
      ["They ignore covariance", "mvp-ignore", "They depend on it entirely."],
      ["Shrinkage raises their expected return", "mvp-return", "It improves risk, not expected return."],
    ]),
  num(m(CV, "apply-ratio-pT", "apply", 5, 30, "With $p = 400$ assets and $T = 500$ observations, find the concentration ratio $\\frac{p}{T}$."), 0.8),
  // level 6
  short(m(CV, "explain-target-choice", "explain", 6, 150, "Compare the scaled-identity, constant-correlation and single-factor targets."),
    [
      ["identity", "Scaled identity: simplest; shrinks all variances and correlations toward a common level — poor when volatilities differ a lot", 1, true],
      ["constcorr", "Constant correlation: keeps individual variances, shrinks correlations toward their average", 1, true],
      ["factor", "Single-factor: $\\sigma_m^{2}\\boldsymbol{\\beta}\\boldsymbol{\\beta}^{\\top} + \\mathbf{D}$, keeps market structure; usually best for stocks", 2, true],
    ]),
  num(m(CV, "apply-factor-target", "apply", 6, 40, "A single-factor target has market variance $0.04$, betas $1.2$ and $0.8$, and residual variances $0.05$ and $0.03$. Find its $(1, 2)$ entry."), 0.0384),
  num(m(CV, "apply-factor-target-diag", "apply", 6, 40, "For the same target, find its $(1, 1)$ entry."), 0.1076),
  mcq(m(CV, "apply-rho-T", "apply", 6, 35, "As the number of observations $T$ grows with $p$ fixed, the optimal shrinkage intensity:"),
    "Falls toward zero, since the sample covariance becomes precise",
    [
      ["Rises toward one", "rhoT-rises", "More data means less need to shrink."],
      ["Stays constant", "rhoT-constant", "It depends on estimation error."],
      ["Becomes negative", "rhoT-negative", "It stays in $[0, 1]$."],
    ]),
  // level 7
  short(m(CV, "derive-optimal", "explain", 7, 150, "Derive the optimal intensity $\\rho^{*}$ minimizing $\\mathbb{E}\\|\\rho\\mathbf{F} + (1 - \\rho)\\mathbf{S} - \\boldsymbol{\\Sigma}\\|^{2}$ when $\\mathbf{F}$ is fixed and $\\mathbb{E}[\\mathbf{S}] = \\boldsymbol{\\Sigma}$."),
    [
      ["expand", "Write the error as $(1 - \\rho)(\\mathbf{S} - \\boldsymbol{\\Sigma}) + \\rho(\\mathbf{F} - \\boldsymbol{\\Sigma})$; its expected square is $(1 - \\rho)^{2}\\mathbb{E}\\|\\mathbf{S} - \\boldsymbol{\\Sigma}\\|^{2} + \\rho^{2}\\|\\mathbf{F} - \\boldsymbol{\\Sigma}\\|^{2}$ (cross term vanishes)", 2, true],
      ["solve", "Setting the derivative to zero: $\\rho^{*} = \\frac{\\mathbb{E}\\|\\mathbf{S} - \\boldsymbol{\\Sigma}\\|^{2}}{\\mathbb{E}\\|\\mathbf{S} - \\boldsymbol{\\Sigma}\\|^{2} + \\|\\mathbf{F} - \\boldsymbol{\\Sigma}\\|^{2}} = \\frac{\\text{variance}}{\\mathbb{E}\\|\\mathbf{S} - \\mathbf{F}\\|^{2}}$", 2, true],
    ]),
  num(m(CV, "apply-rho-from-parts", "apply", 7, 45, "If $\\mathbb{E}\\|\\mathbf{S} - \\boldsymbol{\\Sigma}\\|^{2} = 0.2$ and $\\|\\mathbf{F} - \\boldsymbol{\\Sigma}\\|^{2} = 0.6$, find $\\rho^{*}$."), 0.25),
  num(m(CV, "apply-risk-at-opt", "apply", 7, 45, "With those values, find the minimized expected loss $(1 - \\rho^{*})^{2}(0.2) + \\rho^{*2}(0.6)$."), 0.15),
  mcq(m(CV, "apply-lw-estimate", "apply", 7, 40, "Ledoit and Wolf's contribution was to:"),
    "Give consistent estimators of the optimal intensity from the data, so shrinkage needs no tuning",
    [
      ["Invent shrinkage", "lw-invent", "Stein shrinkage came earlier."],
      ["Prove the sample covariance is optimal", "lw-optimal", "They show it can be improved."],
      ["Replace covariances with correlations", "lw-corr", "They shrink covariances."],
    ]),
  // level 8
  short(m(CV, "explain-nonlinear", "explain", 8, 150, "How does nonlinear (eigenvalue-wise) shrinkage differ from linear shrinkage, and when does it help?"),
    [
      ["nonlinear", "It keeps sample eigenvectors but replaces each eigenvalue by its own corrected value rather than moving all by the same fraction", 2, true],
      ["when", "It helps when the true spectrum is uneven (e.g. a few large factors plus a bulk), where one intensity can't fix both ends", 2, true],
    ]),
  num(m(CV, "apply-mvp-var", "apply", 8, 50, "A two-asset sample covariance is $\\text{diag}(0.01, 0.04)$ but the truth is $\\text{diag}(0.02, 0.03)$. Find the true variance of the fully invested minimum-variance portfolio built from the sample covariance."), 0.014),
  num(m(CV, "apply-mvp-var-shrunk", "apply", 8, 50, "Shrink $\\text{diag}(0.01, 0.04)$ halfway toward $\\mu\\mathbf{I}$ ($\\rho = 0.5$). Find the true variance (truth $\\text{diag}(0.02, 0.03)$) of the resulting fully invested minimum-variance portfolio. Give $4$ decimal places."), 0.0121),
  mcq(m(CV, "apply-overshrink", "apply", 8, 40, "Shrinking too much toward the identity hurts by:"),
    "Erasing genuine structure, such as strong correlations, so the estimate is badly biased",
    [
      ["Making the matrix singular", "overshrink-singular", "Shrinking toward $\\mu\\mathbf{I}$ improves conditioning."],
      ["Increasing estimation variance", "overshrink-variance", "Variance falls with shrinkage."],
      ["Changing the eigenvectors", "overshrink-eigvec", "They're unchanged."],
    ]),
  // level 9
  short(m(CV, "transfer-factor-vs-shrink", "transfer", 9, 180, "Relate covariance shrinkage to factor models: in what sense is a factor model a kind of shrinkage?"),
    [
      ["structure", "A factor model imposes a low-rank-plus-diagonal structure, like shrinking the sample covariance fully toward a factor target", 2, true],
      ["tradeoff", "Both trade bias for variance; shrinking toward a factor target blends the two, keeping some sample information the factor structure misses", 2, true],
    ]),
  short(m(CV, "explain-stein", "explain", 9, 150, "How is covariance shrinkage related to Stein's result that the sample mean is inadmissible in three or more dimensions?"),
    [
      ["stein", "Stein showed that shrinking a vector of means toward a common point beats estimating each separately in total squared error, for $p \\ge 3$", 2, true],
      ["link", "Covariance shrinkage applies the same idea to the many entries (or eigenvalues) of a matrix: pooling toward structure reduces total error", 2, true],
    ]),
  num(m(CV, "apply-cond-target", "apply", 9, 60, "A sample covariance has eigenvalues $4$ and $0.04$. Find the smallest $\\rho$ that brings the condition number down to $10$ when shrinking toward their mean. Give $4$ decimal places."), 0.1653),
  mcq(m(CV, "apply-cross-validate", "apply", 9, 40, "Instead of a formula, the shrinkage intensity can be chosen by:"),
    "Cross-validating an out-of-sample loss such as the realized variance of optimized portfolios or the Gaussian likelihood",
    [
      ["Maximizing in-sample likelihood", "cv-insample", "In-sample, $\\rho = 0$ always wins."],
      ["Setting $\\rho = 1$", "cv-one", "That ignores the data."],
      ["Minimizing the trace", "cv-trace", "The trace doesn't measure accuracy."],
    ]),
  // level 10
  short(m(CV, "judge-portfolio", "transfer", 10, 180, "A quant uses the raw sample covariance of $1{,}000$ stocks estimated from $500$ days in a mean-variance optimizer. Predict what happens and propose a fix."),
    [
      ["failure", "The matrix is singular: the optimizer finds portfolios with near-zero estimated risk (in the null space), takes huge positions, and realized risk is far above forecast", 2, true],
      ["fix", "Use a factor model and/or shrinkage (Ledoit–Wolf toward a factor or constant-correlation target), and validate by out-of-sample realized variance", 2, true],
    ]),
  short(m(CV, "judge-what-loss", "transfer", 10, 180, "Why might the best shrinkage intensity for forecasting individual variances differ from the best one for portfolio optimization?"),
    [
      ["different", "Variance forecasts depend on the covariance itself; optimization depends on its inverse, dominated by the smallest eigenvalues", 2, true],
      ["choose", "So choose the intensity with a loss matched to the use — e.g. minimum-variance realized risk for optimizers", 2, true],
    ]),
  num(m(CV, "apply-two-sided", "apply", 10, 90, "Shrinking $\\text{diag}(0.01, 0.04)$ toward $\\mu\\mathbf{I}$, find the $\\rho$ that makes the resulting minimum-variance portfolio exactly the true one for truth $\\text{diag}(0.02, 0.03)$. Give $4$ decimal places."), 0.6667),
  mcq(m(CV, "judge-identity-stocks", "transfer", 10, 60, "For a universe mixing utilities ($15\\%$ volatility) and biotech stocks ($60\\%$), the scaled-identity target is a poor choice because:"),
    "It pulls all variances toward one common level, distorting both groups' risk",
    [
      ["It makes the matrix singular", "idstocks-singular", "It improves conditioning."],
      ["It ignores the trace", "idstocks-trace", "It preserves the trace."],
      ["It changes eigenvectors", "idstocks-eigvec", "It keeps them."],
    ]),
];

// ---------------------------------------------------------------------------
// random-matrix-theory
// ---------------------------------------------------------------------------
const RM = "random-matrix-theory";
const randomMatrixTheory: Item[] = [
  // level 1
  mcq(m(RM, "recall-mp", "recall", 1, 15, "The Marchenko–Pastur law describes:"),
    "The limiting distribution of the eigenvalues of a sample covariance of pure noise as $p, T \\to \\infty$ with $\\frac{p}{T} \\to \\gamma$",
    [
      ["The distribution of sample means", "mp-means", "It concerns eigenvalues."],
      ["The largest eigenvalue of any matrix", "mp-largest", "It describes the whole bulk."],
      ["The eigenvalues of the true covariance", "mp-true", "It describes the sample covariance."],
    ]),
  mcq(m(RM, "recall-edges", "recall", 1, 15, "For $\\boldsymbol{\\Sigma} = \\sigma^{2}\\mathbf{I}$ and $\\gamma = \\frac{p}{T} \\le 1$, the Marchenko–Pastur bulk lies on:"),
    "$\\left[\\sigma^{2}(1 - \\sqrt{\\gamma})^{2}, \\sigma^{2}(1 + \\sqrt{\\gamma})^{2}\\right]$",
    [
      ["$[0, \\sigma^{2}]$", "edges-zero", "The bulk is centred near $\\sigma^{2}$, not below it."],
      ["$\\{\\sigma^{2}\\}$ exactly", "edges-point", "That's the $\\gamma \\to 0$ limit."],
      ["$[\\sigma^{2}(1 - \\gamma), \\sigma^{2}(1 + \\gamma)]$", "edges-linear", "The edges involve $\\sqrt{\\gamma}$, squared."],
    ]),
  mcq(m(RM, "recall-spiked", "recall", 1, 15, "A spiked covariance model is:"),
    "A few large eigenvalues (the spikes) on top of an identity-like noise covariance",
    [
      ["A covariance with one zero eigenvalue", "spiked-zero", "Spikes are large, not zero."],
      ["A covariance with heavy-tailed entries", "spiked-tails", "It's about the spectrum."],
      ["A diagonal covariance", "spiked-diagonal", "Spikes come from factor directions."],
    ]),
  mcq(m(RM, "recall-bbp", "recall", 1, 15, "The BBP phase transition says a spike is visible as a separate sample eigenvalue only if:"),
    "Its true size exceeds a threshold $1 + \\sqrt{\\gamma}$ (for unit noise variance)",
    [
      ["It is positive", "bbp-positive", "Small spikes are swallowed by the bulk."],
      ["$T > p$", "bbp-T", "The threshold depends on $\\gamma$ and the spike size."],
      ["It is exactly $1$", "bbp-one", "That's no spike at all."],
    ]),
  // level 2
  num(m(RM, "apply-upper-edge", "apply", 2, 20, "For pure noise with $\\sigma^{2} = 1$ and $\\gamma = 0.25$, find the upper edge of the Marchenko–Pastur bulk."), 2.25),
  num(m(RM, "apply-lower-edge", "apply", 2, 20, "For $\\sigma^{2} = 1$ and $\\gamma = 0.25$, find the lower edge."), 0.25),
  num(m(RM, "apply-gamma", "apply", 2, 15, "Find $\\gamma$ for $p = 500$ stocks and $T = 1{,}000$ days."), 0.5),
  mcq(m(RM, "apply-mean", "apply", 2, 20, "For pure noise with $\\sigma^{2} = 1$, the average sample eigenvalue is:"),
    "$1$, the trace divided by $p$",
    [
      ["$\\gamma$", "mean-gamma", "$\\gamma$ is the variance of the eigenvalue distribution."],
      ["$(1 + \\sqrt{\\gamma})^{2}$", "mean-edge", "That's the upper edge."],
      ["$0$", "mean-zero", "The trace of $\\mathbf{S}$ averages $p\\sigma^{2}$."],
    ]),
  // level 3
  num(m(RM, "apply-edge-half", "apply", 3, 25, "For $\\sigma^{2} = 1$ and $\\gamma = 0.5$, find the upper bulk edge. Give $4$ decimal places."), 2.9142),
  num(m(RM, "apply-threshold", "apply", 3, 25, "For $\\gamma = 0.5$ and unit noise, find the BBP detection threshold $1 + \\sqrt{\\gamma}$. Give $4$ decimal places."), 1.7071),
  num(m(RM, "apply-zero-count", "apply", 3, 25, "With $p = 500$ and $T = 250$ (uncentered), how many sample eigenvalues are exactly zero?"), 250),
  mcq(m(RM, "apply-noise-spread", "apply", 3, 25, "When all true eigenvalues equal $1$, the sample eigenvalues for $\\gamma = 0.5$ range roughly from $0.09$ to $2.91$. This means:"),
    "A large sample eigenvalue alone is not evidence of a real factor",
    [
      ["The data contain a factor with variance $2.9$", "spread-factor", "Pure noise produces that spread."],
      ["The estimator is biased in the mean", "spread-mean", "The mean is still $1$."],
      ["$T$ is too large", "spread-T", "Spread shrinks as $T$ grows."],
    ]),
  // level 4
  num(m(RM, "apply-spike-eig", "apply", 4, 35, "A spike of size $\\ell = 3$ with $\\gamma = 0.5$ produces a sample eigenvalue near $\\ell\\left(1 + \\frac{\\gamma}{\\ell - 1}\\right)$. Find it."), 3.75),
  num(m(RM, "apply-spike-cos", "apply", 4, 40, "For $\\ell = 3$, $\\gamma = 0.5$, the squared cosine between sample and true eigenvectors is $\\frac{1 - \\gamma/(\\ell - 1)^{2}}{1 + \\gamma/(\\ell - 1)}$. Find it."), 0.7),
  num(m(RM, "apply-spike-big", "apply", 4, 40, "For a large spike $\\ell = 11$ with $\\gamma = 0.5$, find the sample eigenvalue $\\ell\\left(1 + \\frac{\\gamma}{\\ell - 1}\\right)$."), 11.55),
  mcq(m(RM, "apply-below", "apply", 4, 30, "A spike below the BBP threshold yields a top sample eigenvalue:"),
    "Stuck at the bulk edge, with an eigenvector asymptotically orthogonal to the true one",
    [
      ["Exactly equal to the spike", "below-equal", "Below threshold, no information survives."],
      ["Below the bulk", "below-under", "It sits at the edge."],
      ["Infinite", "below-infinite", "It stays at the edge."],
    ]),
  // level 5
  short(m(RM, "explain-overshoot", "explain", 5, 120, "Explain why sample eigenvalues of real factors overshoot their true values, and what happens to the eigenvectors."),
    [
      ["overshoot", "Noise in the other directions adds variance along the estimated factor direction, so $\\lambda \\approx \\ell\\left(1 + \\frac{\\gamma}{\\ell - 1}\\right) > \\ell$", 2, true],
      ["eigvec", "The sample eigenvector tilts partly into noise directions; its overlap with the true one falls as $\\ell$ approaches the threshold", 2, true],
    ]),
  num(m(RM, "apply-cos-2", "apply", 5, 35, "Find the squared cosine for $\\ell = 2$ and $\\gamma = 0.25$."), 0.6),
  num(m(RM, "apply-eig-2", "apply", 5, 35, "Find the sample eigenvalue for $\\ell = 2$ and $\\gamma = 0.25$."), 2.5),
  mcq(m(RM, "apply-gamma-effect", "apply", 5, 30, "Doubling $T$ with $p$ fixed:"),
    "Narrows the noise bulk and lowers the detection threshold",
    [
      ["Widens the bulk", "gameff-widen", "Smaller $\\gamma$ narrows it."],
      ["Has no effect on eigenvalues", "gameff-none", "$\\gamma$ halves."],
      ["Raises the threshold", "gameff-raise", "The threshold $1 + \\sqrt{\\gamma}$ falls."],
    ]),
  // level 6
  short(m(RM, "explain-count-factors", "explain", 6, 150, "How can the Marchenko–Pastur edge be used to choose the number of factors in a statistical model?"),
    [
      ["rule", "Count sample eigenvalues above the noise upper edge $\\sigma^{2}(1 + \\sqrt{\\gamma})^{2}$ (with $\\sigma^{2}$ estimated from the bulk); those are likely real factors", 2, true],
      ["caveat", "Real returns aren't i.i.d. Gaussian and idiosyncratic variances differ, so the edge is approximate; weak factors below threshold are undetectable", 2, true],
    ]),
  num(m(RM, "apply-invert", "apply", 6, 45, "Invert $\\lambda = \\ell + \\frac{\\gamma\\ell}{\\ell - 1}$: for an observed $\\lambda = 2.5$ and $\\gamma = 0.25$, find $\\ell > 1$."), 2),
  num(m(RM, "apply-invert-2", "apply", 6, 45, "For an observed top eigenvalue $\\lambda = 4$ with $\\gamma = 0.5$, estimate the true spike $\\ell$ by solving $\\ell^{2} - (\\lambda + 1 - \\gamma)\\ell + \\lambda = 0$ for the larger root. Give $4$ decimal places."), 3.2808),
  mcq(m(RM, "apply-above-edge", "apply", 6, 35, "With $\\gamma = 0.25$ and unit noise, which observed eigenvalues suggest a real factor?"),
    "Those clearly above $2.25$",
    [
      ["Those above $1$", "above-one", "Noise alone reaches $2.25$."],
      ["Those above $1.5$", "above-threshold", "That's the threshold for the true spike; the noise edge for observed eigenvalues is $2.25$."],
      ["All of them", "above-all", "Most are noise."],
    ]),
  // level 7
  short(m(RM, "explain-threshold-meaning", "explain", 7, 150, "Why is there a threshold below which a real factor cannot be detected at all, however clever the estimator?"),
    [
      ["noise", "Below $1 + \\sqrt{\\gamma}$ the factor's signal is weaker than the noise fluctuations of the bulk, so its direction is lost in noise", 2, true],
      ["info", "Asymptotically the sample eigenvector has zero overlap with the true one — the data carry no recoverable information about it", 2, true],
    ]),
  num(m(RM, "apply-bulk-width", "apply", 7, 40, "Find the width of the Marchenko–Pastur bulk, $4\\sqrt{\\gamma}$, for $\\gamma = 0.25$ and unit noise."), 2),
  num(m(RM, "apply-noise-scale", "apply", 7, 40, "Noise has variance $\\sigma^{2} = 0.0004$ and $\\gamma = 0.25$. Find the bulk upper edge."), 0.0009),
  mcq(m(RM, "apply-gamma-gt1", "apply", 7, 40, "When $\\gamma > 1$ ($p > T$), the Marchenko–Pastur law:"),
    "Puts mass $1 - \\frac{1}{\\gamma}$ at zero and the rest on the same kind of bulk",
    [
      ["Has no zero eigenvalues", "gt1-none", "Rank is at most $T$."],
      ["Has all eigenvalues at zero", "gt1-all", "$T$ eigenvalues are positive."],
      ["Is undefined", "gt1-undefined", "It's well defined."],
    ]),
  // level 8
  short(m(RM, "derive-cos-limit", "explain", 8, 150, "Show from $\\cos^{2} = \\frac{1 - \\gamma/(\\ell - 1)^{2}}{1 + \\gamma/(\\ell - 1)}$ that the overlap vanishes exactly at the threshold and tends to $1$ for strong spikes."),
    [
      ["threshold", "At $\\ell = 1 + \\sqrt{\\gamma}$, $(\\ell - 1)^{2} = \\gamma$, so the numerator is $0$", 2, true],
      ["strong", "As $\\ell \\to \\infty$, both $\\frac{\\gamma}{(\\ell - 1)^{2}}$ and $\\frac{\\gamma}{\\ell - 1}$ vanish, so $\\cos^{2} \\to 1$", 2, true],
    ]),
  num(m(RM, "apply-at-threshold", "apply", 8, 45, "At the threshold $\\ell = 1 + \\sqrt{\\gamma}$, the sample eigenvalue equals the bulk edge $(1 + \\sqrt{\\gamma})^{2}$. Verify numerically for $\\gamma = 0.25$: find $\\ell\\left(1 + \\frac{\\gamma}{\\ell - 1}\\right)$ at $\\ell = 1.5$."), 2.25),
  num(m(RM, "apply-cos-strong", "apply", 8, 45, "Find the squared cosine for $\\ell = 11$, $\\gamma = 0.5$. Give $4$ decimal places."), 0.9476),
  mcq(m(RM, "apply-shrink-link", "apply", 8, 40, "Inverting $\\lambda \\mapsto \\ell$ to replace each large sample eigenvalue by an estimate of its true value is a form of:"),
    "Nonlinear eigenvalue shrinkage",
    [
      ["Linear shrinkage toward the identity", "link-linear", "Each eigenvalue gets its own correction."],
      ["Winsorization", "link-winsor", "That caps data, not eigenvalues."],
      ["Bootstrapping", "link-bootstrap", "No resampling is involved."],
    ]),
  // level 9
  short(m(RM, "transfer-returns", "transfer", 9, 180, "Apply these results to $1{,}000$ stocks with $T = 2{,}000$ daily returns: what do they predict about the market factor and about weak style factors in a PCA?"),
    [
      ["market", "$\\gamma = 0.5$; the market factor's eigenvalue is huge relative to the threshold, so it is detected with an eigenvector very close to the truth (slightly inflated eigenvalue)", 2, true],
      ["weak", "Weak factors near or below $1 + \\sqrt{0.5} \\approx 1.71$ (in units of idiosyncratic variance) are poorly estimated or invisible, and their eigenvalues overstate their variance", 2, true],
    ]),
  short(m(RM, "explain-assumptions", "explain", 9, 150, "Which Marchenko–Pastur assumptions fail for stock returns, and how does that affect its use?"),
    [
      ["fail", "Returns are heavy-tailed, heteroskedastic over time, and idiosyncratic variances differ across stocks — the noise isn't $\\sigma^{2}\\mathbf{I}$ with i.i.d. entries", 2, true],
      ["use", "So the edge is a guide, not a test: standardize returns (e.g. by volatility), and validate the number of factors out of sample", 2, true],
    ]),
  num(m(RM, "apply-detect-T", "apply", 9, 60, "With $p = 1{,}000$ assets and a factor of true size $\\ell = 1.5$ (unit noise), find the $T$ at which the BBP threshold $1 + \\sqrt{p/T}$ equals $\\ell$ (any larger $T$ detects it)."), 4000),
  mcq(m(RM, "apply-tracy-widom", "apply", 9, 40, "For finite $p$ and $T$, the largest noise eigenvalue fluctuates around the edge on a scale of:"),
    "Order $T^{-2/3}$ (Tracy–Widom fluctuations), so slightly exceeding the edge is not conclusive",
    [
      ["Order $1$", "tw-one", "Fluctuations shrink with size."],
      ["Exactly zero", "tw-zero", "Finite samples fluctuate."],
      ["Order $T$", "tw-T", "They shrink, not grow."],
    ]),
  // level 10
  short(m(RM, "judge-portfolio-risk", "transfer", 10, 180, "An optimizer uses the top $k$ sample eigenvectors as factors. Using random-matrix results, explain how this can understate the risk of optimized portfolios."),
    [
      ["eigvec", "Sample eigenvectors of weak factors point partly at noise; the optimizer finds portfolios orthogonal to the estimated factors that still carry true factor risk", 2, true],
      ["eigval", "Small (bulk) eigenvalues are biased down, so the optimizer loads on directions whose risk is underestimated; realized risk exceeds forecast", 2, true],
    ]),
  short(m(RM, "judge-more-data", "transfer", 10, 180, "A researcher proposes using $20$ years of daily data to estimate a statistical model so that $\\gamma$ is small. What is the trade-off?"),
    [
      ["benefit", "Smaller $\\gamma$ shrinks the bulk and lowers the threshold, so factors are estimated more precisely", 2, true],
      ["cost", "But factor structure changes over time (non-stationarity); old data describe stale factors, so recent data or exponential weighting may be better", 2, true],
    ]),
  num(m(RM, "apply-invert-large", "apply", 10, 90, "Observed top eigenvalue $\\lambda = 11.55$ with $\\gamma = 0.5$. Estimate the true spike as the larger root of $\\ell^{2} - (\\lambda + 1 - \\gamma)\\ell + \\lambda = 0$."), 11),
  mcq(m(RM, "judge-equal-spikes", "transfer", 10, 60, "Two true spikes of nearly equal size are well above threshold. Their individual sample eigenvectors will:"),
    "Be unstable and mix between the two directions, though the two-dimensional subspace is well estimated",
    [
      ["Be exactly the true eigenvectors", "equal-exact", "Near-degenerate eigenvectors are ill-determined."],
      ["Both be orthogonal to the truth", "equal-orth", "Their span is well estimated."],
      ["Merge into one eigenvalue", "equal-merge", "There are still two eigenvalues."],
    ]),
];

// ---------------------------------------------------------------------------
// linear-quadratic-regulator
// ---------------------------------------------------------------------------
const LQ = "linear-quadratic-regulator";
const lqr: Item[] = [
  // level 1
  mcq(m(LQ, "recall-problem", "recall", 1, 15, "The discrete-time linear-quadratic regulator minimizes:"),
    "$\\sum_t \\left(\\mathbf{x}_t^{\\top}\\mathbf{Q}\\mathbf{x}_t + \\mathbf{u}_t^{\\top}\\mathbf{R}\\mathbf{u}_t\\right)$ subject to $\\mathbf{x}_{t+1} = \\mathbf{A}\\mathbf{x}_t + \\mathbf{B}\\mathbf{u}_t$",
    [
      ["$\\sum_t |\\mathbf{x}_t| + |\\mathbf{u}_t|$ with nonlinear dynamics", "lqr-l1", "Both cost and dynamics are linear-quadratic."],
      ["The final state only", "lqr-final", "Costs accrue each period."],
      ["$\\max_t \\|\\mathbf{x}_t\\|$", "lqr-max", "That's a minimax problem."],
    ]),
  mcq(m(LQ, "recall-policy", "recall", 1, 15, "The optimal LQR control is:"),
    "Linear in the state, $\\mathbf{u}_t = -\\mathbf{K}_t\\mathbf{x}_t$",
    [
      ["Bang-bang (maximal or zero)", "policy-bang", "Quadratic control costs give smooth, linear control."],
      ["Constant", "policy-constant", "It depends on the state."],
      ["Quadratic in the state", "policy-quad", "The value is quadratic; the control is linear."],
    ]),
  mcq(m(LQ, "recall-value", "recall", 1, 15, "In LQR, the optimal cost-to-go from state $\\mathbf{x}$ is:"),
    "A quadratic form $\\mathbf{x}^{\\top}\\mathbf{P}_t\\mathbf{x}$",
    [
      ["Linear in $\\mathbf{x}$", "value-linear", "Costs are quadratic."],
      ["Independent of $\\mathbf{x}$", "value-constant", "It depends on the state."],
      ["Exponential in $\\mathbf{x}$", "value-exp", "Quadratics are preserved by the recursion."],
    ]),
  mcq(m(LQ, "recall-riccati", "recall", 1, 15, "The matrices $\\mathbf{P}_t$ are computed by:"),
    "A backward Riccati recursion from the terminal cost",
    [
      ["A forward Kalman recursion from the initial state", "riccati-forward", "LQR runs backward in time."],
      ["Gradient descent on the controls", "riccati-gd", "A closed-form recursion exists."],
      ["Inverting $\\mathbf{A}$", "riccati-inverse", "Not sufficient."],
    ]),
  // level 2
  num(m(LQ, "apply-one-step", "apply", 2, 25, "Scalar, one step: minimize $u^{2} + (x + u)^{2}$ over $u$ with $x = 2$. Find the optimal $u$."), -1),
  num(m(LQ, "apply-one-step-cost", "apply", 2, 25, "In the same problem, find the minimal cost."), 2),
  num(m(LQ, "apply-gain", "apply", 2, 25, "Scalar LQR with $x_{t+1} = x_t + u_t$, terminal value coefficient $P = 1$ and control cost $r = 1$: the gain is $K = \\frac{P}{r + P}$. Find $K$."), 0.5),
  mcq(m(LQ, "apply-more-cost", "apply", 2, 20, "Raising the control cost $\\mathbf{R}$ makes the optimal controller:"),
    "Less aggressive — smaller gains",
    [
      ["More aggressive", "cost-aggressive", "Expensive control is used less."],
      ["Unchanged", "cost-unchanged", "The gain depends on $\\mathbf{R}$."],
      ["Unstable", "cost-unstable", "Not necessarily."],
    ]),
  // level 3
  num(m(LQ, "apply-riccati-step", "apply", 3, 30, "Scalar: $x_{t+1} = x_t + u_t$, stage cost $qx^{2} + ru^{2}$ with $q = 1$, $r = 1$, terminal $P_T = 1$. One Riccati step gives $P_{T-1} = q + P_T - \\frac{P_T^{2}}{r + P_T}$. Find $P_{T-1}$."), 1.5),
  num(m(LQ, "apply-gain-2", "apply", 3, 30, "With $P_{T-1} = 1.5$ and $r = 1$, find the next gain back in time, $K_{T-2} = \\frac{P_{T-1}}{r + P_{T-1}}$."), 0.6),
  num(m(LQ, "apply-steady", "apply", 3, 30, "The steady state solves $P^{2} - qP - qr = 0$. Find $P$ for $q = r = 1$. Give $4$ decimal places."), 1.618),
  mcq(m(LQ, "apply-infinite", "apply", 3, 25, "For an infinite horizon with time-invariant matrices, the Riccati recursion typically:"),
    "Converges to a constant $\\mathbf{P}$ solving the algebraic Riccati equation, giving a constant gain",
    [
      ["Diverges", "infinite-diverge", "Under stabilizability it converges."],
      ["Oscillates forever", "infinite-oscillate", "It converges monotonically in many cases."],
      ["Gives zero gain", "infinite-zero", "The gain is positive."],
    ]),
  // level 4
  num(m(LQ, "apply-steady-k", "apply", 4, 35, "For $q = r = 1$, $P \\approx 1.618$. Find the steady gain $K = \\frac{P}{r + P}$. Give $4$ decimal places."), 0.618),
  num(m(LQ, "apply-steady-qr", "apply", 4, 40, "Find the steady $P$ for $q = 1$, $r = 4$. Give $4$ decimal places."), 2.5616),
  num(m(LQ, "apply-closed-loop", "apply", 4, 35, "Under the steady policy $u = -Kx$ with $K = 0.39$, the closed loop is $x_{t+1} = (1 - K)x_t$. Starting from $x_0 = 10$, find $x_3$. Give $4$ decimal places."), 2.2698),
  mcq(m(LQ, "apply-certainty", "apply", 4, 30, "With additive Gaussian noise in the dynamics, the optimal LQR policy:"),
    "Is the same as without noise (certainty equivalence); only the cost increases",
    [
      ["Becomes nonlinear", "ce-nonlinear", "It stays linear."],
      ["Ignores the state", "ce-ignore", "It still feeds back the state."],
      ["Uses larger gains", "ce-larger", "Gains are unchanged."],
    ]),
  // level 5
  short(m(LQ, "explain-bellman", "explain", 5, 120, "Explain why the value function stays quadratic under Bellman's recursion in LQR."),
    [
      ["minimize", "Assuming $V_{t+1}(\\mathbf{x}) = \\mathbf{x}^{\\top}\\mathbf{P}_{t+1}\\mathbf{x}$, the Bellman step minimizes a quadratic in $\\mathbf{u}$ (stage cost plus $V_{t+1}$ of a linear function), giving a linear minimizer", 2, true],
      ["quadratic", "Substituting a linear $\\mathbf{u}$ into a quadratic yields a quadratic in $\\mathbf{x}$, so $V_t$ is quadratic: induction from the terminal cost", 2, true],
    ]),
  num(m(LQ, "apply-two-step", "apply", 5, 40, "Scalar, $q = 0$, $r = 1$, $P_T = 1$, $x_{t+1} = x_t + u_t$. Compute $P_{T-1} = q + P_T - \\frac{P_T^{2}}{r + P_T}$, then $P_{T-2}$ the same way. Give $4$ decimal places."), 0.3333),
  num(m(LQ, "apply-ratio-small", "apply", 5, 35, "For $q \\ll r$, the steady gain is approximately $\\sqrt{\\frac{q}{r}}$. Approximate it for $q = 1$, $r = 400$."), 0.05),
  mcq(m(LQ, "apply-kalman-dual", "apply", 5, 30, "The LQR Riccati equation is dual to which estimation algorithm's?"),
    "The Kalman filter's covariance recursion",
    [
      ["Gradient descent", "dual-gd", "No."],
      ["The EM algorithm", "dual-em", "No."],
      ["Least squares with no noise", "dual-ls", "The dual is the Kalman filter."],
    ]),
  // level 6
  short(m(LQ, "explain-duality", "explain", 6, 150, "Describe the duality between LQR and the Kalman filter."),
    [
      ["map", "Replacing $\\mathbf{A} \\to \\mathbf{A}^{\\top}$, $\\mathbf{B} \\to \\mathbf{C}^{\\top}$ (observation matrix), $\\mathbf{Q}$ and $\\mathbf{R}$ by process and measurement noise covariances turns one Riccati equation into the other", 2, true],
      ["direction", "LQR runs backward from a terminal cost; the filter runs forward from a prior; the scalar random-walk cases give identical gains", 2, true],
    ]),
  num(m(LQ, "apply-discounted", "apply", 6, 45, "Discounted scalar LQR: $P = q + \\beta\\left(P - \\frac{P^{2}}{r + P}\\right)$ with $x_{t+1} = x_t + u_t$. For $q = 1$, $r = 1$, $\\beta = 0.9$, find the steady $P$ (positive root). Give $4$ decimal places."), 1.5466),
  num(m(LQ, "apply-cost-to-go", "apply", 6, 40, "With steady $P = 1.618$, find the optimal infinite-horizon cost from $x_0 = 2$. Give $3$ decimal places."), 6.472),
  mcq(m(LQ, "apply-tracking", "apply", 6, 35, "To make the state track a moving target $\\mathbf{x}^{*}_t$, LQR is applied to:"),
    "The deviation $\\mathbf{x}_t - \\mathbf{x}^{*}_t$ (with a feedforward term for the target's motion)",
    [
      ["The target only", "track-target", "The state must enter."],
      ["The control only", "track-control", "The deviation is the state."],
      ["Nothing — LQR can't track", "track-cant", "Tracking is a standard extension."],
    ]),
  // level 7
  short(m(LQ, "derive-gain", "explain", 7, 150, "Derive the scalar gain: minimize $ru^{2} + P(x + u)^{2}$ over $u$."),
    [
      ["foc", "Setting the derivative to zero: $2ru + 2P(x + u) = 0$", 2, true],
      ["solve", "So $u = -\\frac{P}{r + P}x$, i.e. $K = \\frac{P}{r + P}$, closing that fraction of the gap", 2, true],
    ]),
  num(m(LQ, "apply-matrix-gain", "apply", 7, 50, "Two independent scalar systems with $q = (1, 1)$ and $r = (1, 4)$ (diagonal). Find the steady gain of the second system. Give $4$ decimal places."), 0.3904),
  num(m(LQ, "apply-a-scale", "apply", 7, 50, "Scalar $x_{t+1} = ax_t + u_t$ with $a = 0.5$, $q = 1$, $r = 1$: the steady $P$ solves $P = q + a^{2}\\left(P - \\frac{P^{2}}{r + P}\\right)$. Find $P$. Give $4$ decimal places."), 1.1328),
  mcq(m(LQ, "apply-stable-a", "apply", 7, 40, "When the uncontrolled system already decays ($|a| < 1$), the optimal gain is:"),
    "Smaller than for a random walk ($a = 1$), since the state partly corrects itself",
    [
      ["Larger", "stable-larger", "Self-correction reduces the need for control."],
      ["The same", "stable-same", "It depends on $a$."],
      ["Zero always", "stable-zero", "Control still helps when $q > 0$."],
    ]),
  // level 8
  short(m(LQ, "explain-portfolio", "explain", 8, 150, "Map a single-asset trading problem with quadratic impact onto LQR."),
    [
      ["state", "State: deviation of holdings from the target (or holdings and alpha); control: the trade; dynamics: next holdings = current + trade", 2, true],
      ["costs", "Stage cost: risk aversion times variance (and lost alpha) as $q$, quadratic impact as $r$; the gain gives the fraction of the gap to trade each period", 2, true],
    ]),
  num(m(LQ, "apply-finite-k", "apply", 8, 50, "Scalar, $q = 1$, $r = 1$, $P_T = 0$ (no terminal cost). Compute $P_{T-1}$, $P_{T-2}$, and report the gain applied at $T - 3$, $K = \\frac{P_{T-2}}{1 + P_{T-2}}$. Give $4$ decimal places."), 0.6),
  num(m(LQ, "apply-liq-steps", "apply", 8, 45, "With steady gain $K = 0.1$, after how many periods has the state fallen below half its starting value?"), 7),
  mcq(m(LQ, "apply-horizon-effect", "apply", 8, 40, "With $P_T = 0$, gains near the end of the horizon are:"),
    "Smaller, since there is little future cost left to save by controlling now",
    [
      ["Larger", "horizon-larger", "With no terminal cost, late control is less valuable."],
      ["Equal to the steady gain", "horizon-equal", "They converge only far from the end."],
      ["Negative", "horizon-negative", "They stay non-negative."],
    ]),
  // level 9
  short(m(LQ, "transfer-mpc", "transfer", 9, 180, "Compare solving an LQR via Riccati with model-predictive control (re-solving a finite-horizon problem each period). When would you use each?"),
    [
      ["riccati", "Riccati gives closed-form linear feedback, cheap and exact for unconstrained linear-quadratic problems", 2, true],
      ["mpc", "MPC handles constraints (position limits, no shorting) and time-varying models by re-optimizing each step, at higher computational cost", 2, true],
    ]),
  short(m(LQ, "explain-sqrt-rate", "explain", 9, 150, "Explain why the steady LQR gain behaves like $\\sqrt{\\frac{q}{r}}$ when control is expensive, and why a myopic one-step controller would get $\\frac{q}{r}$ instead."),
    [
      ["steady", "From $P^{2} - qP - qr = 0$, for $q \\ll r$, $P \\approx \\sqrt{qr}$ and $K = \\frac{P}{r + P} \\approx \\sqrt{\\frac{q}{r}}$ — the future value of reducing the state accumulates", 2, true],
      ["myopic", "A one-step controller sees only the next period's state cost $q$, giving $K \\approx \\frac{q}{r}$, far too small when $q \\ll r$", 2, true],
    ]),
  num(m(LQ, "apply-myopic-vs", "apply", 9, 60, "For $q = 1$ and $r = 10{,}000$, find the ratio of the approximate steady gain $\\sqrt{q/r}$ to the myopic gain $\\frac{q}{r}$."), 100),
  mcq(m(LQ, "apply-noise-cost", "apply", 9, 40, "Adding process noise of variance $w$ per period to a steady scalar LQR adds to the long-run average cost per period:"),
    "$Pw$, without changing the policy",
    [
      ["Nothing", "noise-nothing", "Noise must be controlled at a cost."],
      ["A change in the gain", "noise-gain", "Certainty equivalence: the gain is unchanged."],
      ["$\\frac{w}{P}$", "noise-inverse", "It's $Pw$."],
    ]),
  // level 10
  short(m(LQ, "judge-assumptions", "transfer", 10, 180, "Which LQR assumptions are most questionable for trading problems, and how can you cope?"),
    [
      ["costs", "Impact costs are closer to square-root (power $1.5$ total) than quadratic, and constraints (limits, no shorts) break linearity", 2, true],
      ["cope", "Use LQR as an approximation (quadratic fit to costs), add constraints via MPC or single-period optimization around the LQR aim, and validate in simulation", 2, true],
    ]),
  short(m(LQ, "judge-dp", "transfer", 10, 180, "Why is LQR one of the few dynamic programs solvable in closed form, and what does that teach about modelling choices?"),
    [
      ["closure", "Linear dynamics and quadratic costs keep the value function in the quadratic family under the Bellman operator, so the recursion acts on finite-dimensional matrices", 2, true],
      ["lesson", "Choosing linear-quadratic approximations buys tractable, interpretable solutions (like Paleologo's “almost everything is linear or quadratic”), at some cost in realism", 2, true],
    ]),
  num(m(LQ, "apply-discount-gain", "apply", 10, 90, "Using the discounted steady $P \\approx 1.5466$ (from $q = r = 1$, $\\beta = 0.9$), the gain is $K = \\frac{\\beta P}{r + \\beta P}$. Find $K$. Give $4$ decimal places."), 0.5819),
  mcq(m(LQ, "judge-discount-effect", "transfer", 10, 60, "Compared with the undiscounted gain $0.618$, the discounted gain $\\approx 0.582$ is smaller because:"),
    "Future state costs count less, so paying control costs now to reduce them is less worthwhile",
    [
      ["Discounting raises control costs", "disceff-raise", "Control costs today aren't discounted."],
      ["The dynamics change", "disceff-dynamics", "They're the same."],
      ["It's a rounding effect", "disceff-rounding", "It's a genuine effect."],
    ]),
];

export const quantToolsItems: Item[] = [
  ...exponentialSmoothing,
  ...rademacherComplexity,
  ...covarianceShrinkage,
  ...randomMatrixTheory,
  ...lqr,
];
