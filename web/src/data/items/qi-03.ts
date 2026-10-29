import type { Item } from "../../lib/assessment/types";
import { m, mcq, num, short } from "./qi-shared";

/**
 * Quantitative Investing, part 3: forecasting volatility — GARCH(1,1),
 * realized variance, and the EWMA estimator as a Kalman filter (Paleologo,
 * §2.2–2.3). Forty questions per lesson, four at each level.
 */

// ---------------------------------------------------------------------------
// volatility-forecasting
// ---------------------------------------------------------------------------
const VF = "volatility-forecasting";
const volatilityForecasting: Item[] = [
  // level 1
  mcq(m(VF, "recall-garch", "recall", 1, 15, "In GARCH(1,1), $r_t = h_t\\epsilon_t$ with $\\epsilon_t \\sim \\mathcal{N}(0, 1)$, and the variance evolves as:"),
    "$h_t^{2} = \\alpha_0 + \\alpha_1 r_{t-1}^{2} + \\beta_1 h_{t-1}^{2}$",
    [
      ["$h_t^{2} = \\alpha_0 + \\alpha_1 r_{t-1} + \\beta_1 h_{t-1}$", "garch-levels", "GARCH updates variances from squared returns."],
      ["$h_t^{2} = \\alpha_0 + \\beta_1 h_{t-1}^{2}$", "garch-no-shock", "Without the $r_{t-1}^{2}$ term, volatility never reacts to returns."],
      ["$r_t = \\alpha_0 + \\alpha_1 r_{t-1} + \\beta_1 r_{t-2}$", "garch-arma", "That is an AR model for returns, not variance."],
    ]),
  mcq(m(VF, "recall-persistence", "recall", 1, 15, "In GARCH(1,1), the sum $\\alpha_1 + \\beta_1$ measures:"),
    "How persistent volatility shocks are",
    [
      ["The long-run variance", "pers-longrun", "The long-run variance is $\\frac{\\alpha_0}{1 - \\alpha_1 - \\beta_1}$."],
      ["The expected return", "pers-mean", "GARCH(1,1) here has no mean term."],
      ["The kurtosis of $\\epsilon_t$", "pers-kurt", "$\\epsilon_t$ is standard normal."],
    ]),
  mcq(m(VF, "recall-rv", "recall", 1, 15, "The realized variance of a day split into $n$ intraday returns $r(j)$ is:"),
    "$\\sum_{j=1}^{n} r(j)^{2}$",
    [
      ["$\\frac{1}{n}\\sum_{j=1}^{n} r(j)^{2}$", "rv-average", "Realized variance sums, so it measures the whole day's variance."],
      ["$\\left(\\sum_{j=1}^{n} r(j)\\right)^{2}$", "rv-square-sum", "That is the squared daily return, a much noisier estimate."],
      ["$\\max_j r(j)^{2}$", "rv-max", "That is an extreme, not a variance estimate."],
    ]),
  mcq(m(VF, "recall-garch-symmetric", "recall", 1, 15, "Standard GARCH(1,1) responds to a $-3\\%$ return and a $+3\\%$ return:"),
    "Identically, because only $r_{t-1}^{2}$ enters",
    [
      ["More strongly to the negative return", "sym-negative", "That asymmetry needs extensions such as GJR-GARCH or EGARCH."],
      ["More strongly to the positive return", "sym-positive", "Only the square of the return matters."],
      ["Not at all", "sym-none", "Squared returns drive the update."],
    ]),
  // level 2
  num(m(VF, "apply-uncond", "apply", 2, 20, "A GARCH(1,1) has $\\alpha_0 = 0.00002$, $\\alpha_1 = 0.08$ and $\\beta_1 = 0.90$. Find its unconditional variance."), 0.001),
  num(m(VF, "apply-one-step", "apply", 2, 25, "A GARCH(1,1) has $\\alpha_0 = 10^{-6}$, $\\alpha_1 = 0.1$ and $\\beta_1 = 0.85$. Yesterday $h_{t-1}^{2} = 10^{-4}$ and $r_{t-1} = -0.02$. Find $h_t^{2}$ in units of $10^{-4}$."), 1.26),
  num(m(VF, "apply-rv-sum", "apply", 2, 20, "The intraday returns of a day are $0.01$, $-0.02$ and $0.01$. Find the realized variance in units of $10^{-4}$."), 6),
  mcq(m(VF, "apply-ewma-special", "apply", 2, 20, "GARCH(1,1) becomes an exponentially weighted average of squared returns when:"),
    "$\\alpha_0 = 0$ and $\\alpha_1 + \\beta_1 = 1$",
    [
      ["$\\beta_1 = 0$", "ewma-beta0", "That is ARCH(1), which forgets everything but yesterday."],
      ["$\\alpha_1 = 0$", "ewma-alpha0", "Then variance never reacts to returns."],
      ["$\\alpha_1 + \\beta_1 > 1$", "ewma-explosive", "That is explosive, not an average."],
    ]),
  // level 3
  num(m(VF, "apply-half-life", "apply", 3, 25, "A GARCH(1,1) has $\\alpha_1 + \\beta_1 = 0.97$. Find the half-life, in days, of a shock to the variance forecast. Give $2$ decimal places."), 22.76),
  num(m(VF, "apply-annualise", "apply", 3, 25, "A GARCH model's unconditional daily variance is $10^{-4}$. Find the annualised volatility in percent over $252$ days. Give $2$ decimal places."), 15.87),
  num(m(VF, "apply-five-minute", "apply", 3, 20, "A trading day lasts $6.5$ hours. How many non-overlapping $5$-minute returns does it contain?"), 78),
  mcq(m(VF, "apply-drift-frequency", "apply", 3, 25, "For log prices following $dp = \\mu\\, dt + \\sigma\\, dW$, sampling a day more finely (larger $n$):"),
    "Improves the volatility estimate but not the drift estimate",
    [
      ["Improves both estimates", "drift-both", "The drift estimate is $p(1) - p(0)$ whatever $n$ is."],
      ["Improves the drift estimate but not the volatility", "drift-swapped", "It is the other way round."],
      ["Improves neither", "drift-neither", "Realized variance has error $\\approx \\sigma^{2}\\sqrt{\\frac{2}{n}}$."],
    ]),
  // level 4
  num(m(VF, "apply-k-step", "apply", 4, 40, "For GARCH(1,1), $\\mathbb{E}[h_{t+k}^{2}] = \\bar{\\sigma}^{2} + (\\alpha_1 + \\beta_1)^{k-1}(h_{t+1}^{2} - \\bar{\\sigma}^{2})$. With $\\bar{\\sigma}^{2} = 10^{-4}$, $h_{t+1}^{2} = 4 \\times 10^{-4}$ and $\\alpha_1 + \\beta_1 = 0.95$, find $\\mathbb{E}[h_{t+10}^{2}]$ in units of $10^{-4}$. Give $2$ decimal places."), 2.89),
  num(m(VF, "apply-kurtosis", "apply", 4, 40, "The kurtosis of GARCH(1,1) returns is $\\frac{3\\left(1 - (\\alpha_1 + \\beta_1)^{2}\\right)}{1 - (\\alpha_1 + \\beta_1)^{2} - 2\\alpha_1^{2}}$. Find it for $\\alpha_1 = 0.1$ and $\\beta_1 = 0.8$. Give $4$ decimal places."), 3.3529),
  num(m(VF, "apply-rv-error", "apply", 4, 35, "Realized variance from $n$ returns has standard deviation $\\sigma^{2}\\sqrt{\\frac{2}{n}}$ under constant volatility. With $n = 78$, find the standard deviation relative to $\\sigma^{2}$. Give $4$ decimal places."), 0.1601),
  mcq(m(VF, "apply-nelson", "apply", 4, 30, "Writing $h_t^{2} = a_t h_{t-1}^{2} + \\alpha_0$ with $a_t = \\alpha_1\\epsilon_{t-1}^{2} + \\beta_1$, the variance process has a stationary distribution when:"),
    "$\\mathbb{E}[\\log a_t] < 0$",
    [
      ["$\\mathbb{E}[a_t] > 1$", "nelson-mean-big", "That points toward explosion."],
      ["$\\alpha_0 = 0$", "nelson-alpha0", "With $\\alpha_0 = 0$ the variance collapses or explodes."],
      ["$\\beta_1 = 1$", "nelson-beta1", "That gives $a_t \\ge 1$ and no stationary law."],
    ]),
  // level 5
  short(m(VF, "explain-drift-vs-vol", "explain", 5, 120, "Explain why high-frequency data let you estimate a stock's volatility precisely but not its expected return."),
    [
      ["drift", "The drift estimator is the total change $\\frac{p(1) - p(0)}{1}$ whatever the sampling, so its error $\\sigma$ doesn't shrink with $n$", 2, true],
      ["vol", "Each extra intraday return is new information about $\\sigma^{2}$, so the error of realized variance falls like $\\sqrt{\\frac{2}{n}}$", 2, true],
    ]),
  mcq(m(VF, "apply-noise-bias", "apply", 5, 30, "With microstructure noise $p_j + \\epsilon_j$, realized variance over $n$ intervals is biased by about:"),
    "$+2n\\sigma_\\epsilon^{2}$, growing as sampling gets finer",
    [
      ["$-2n\\sigma_\\epsilon^{2}$", "noise-negative", "Noise adds variance to every return."],
      ["$+\\frac{2\\sigma_\\epsilon^{2}}{n}$", "noise-shrinks", "Each of the $n$ returns contains two noise terms, so the bias grows with $n$."],
      ["Zero", "noise-none", "Noise inflates every squared return."],
    ]),
  num(m(VF, "apply-noise-size", "apply", 5, 35, "A day is split into $390$ one-minute returns and the price noise has $\\sigma_\\epsilon = 0.0005$. Find the bias $2n\\sigma_\\epsilon^{2}$ in units of $10^{-4}$. Give $2$ decimal places."), 1.95),
  num(m(VF, "apply-loglik", "apply", 5, 35, "Ignoring constants, a day's Gaussian log-likelihood contribution is $-\\frac{1}{2}\\left(\\log h_t^{2} + \\frac{r_t^{2}}{h_t^{2}}\\right)$. Find it for $h_t^{2} = 10^{-4}$ and $r_t = 0.02$. Give $4$ decimal places."), 2.6052),
  // level 6
  short(m(VF, "explain-garch-vs-rv", "explain", 6, 150, "Compare GARCH and realized variance as volatility forecasters: what does each need, and where does each struggle?"),
    [
      ["garch", "GARCH needs only daily returns and a model; it is noisy because each $r_t^{2}$ is a rough proxy for variance, and it imposes a parametric form", 2, true],
      ["rv", "RV needs intraday data and no generative model; it suffers from microstructure noise, illiquid stocks, overnight gaps and needs its own dynamics to forecast", 2, true],
    ]),
  num(m(VF, "apply-five-day", "apply", 6, 50, "A GARCH(1,1) has $\\bar{\\sigma}^{2} = 10^{-4}$, $\\alpha_1 + \\beta_1 = 0.9$ and next-day forecast $h_{t+1}^{2} = 2 \\times 10^{-4}$. Find the forecast of total variance over the next $5$ days, in units of $10^{-4}$. Give $1$ decimal place."), 9.1),
  num(m(VF, "apply-acf-lag5", "apply", 6, 50, "GARCH(1,1) squared returns have $\\rho_1 = \\frac{\\alpha_1(1 - \\alpha_1\\beta_1 - \\beta_1^{2})}{1 - 2\\alpha_1\\beta_1 - \\beta_1^{2}}$ and $\\rho_k = \\rho_1(\\alpha_1 + \\beta_1)^{k-1}$. With $\\alpha_1 = 0.1$ and $\\beta_1 = 0.8$, find $\\rho_5$. Give $4$ decimal places."), 0.0919),
  mcq(m(VF, "apply-why-five-min", "apply", 6, 35, "Comparisons across many assets find that plain realized variance from $5$-minute returns is hard to beat because:"),
    "It balances sampling error (too few returns) against microstructure noise (too many)",
    [
      ["Exchanges only publish $5$-minute prices", "fivemin-publish", "Tick data is widely available."],
      ["Volatility is constant within $5$ minutes", "fivemin-constant", "The choice is about noise versus sampling error."],
      ["It removes overnight returns", "fivemin-overnight", "Interval length doesn't address the overnight gap."],
    ]),
  // level 7
  short(m(VF, "explain-stationarity", "explain", 7, 150, "Why must $\\alpha_1 + \\beta_1 < 1$ for GARCH(1,1) to have a finite unconditional variance, and what happens at $\\alpha_1 + \\beta_1 = 1$?"),
    [
      ["derivation", "Taking expectations, $\\sigma^{2} = \\alpha_0 + (\\alpha_1 + \\beta_1)\\sigma^{2}$, so $\\sigma^{2} = \\frac{\\alpha_0}{1 - \\alpha_1 - \\beta_1}$, finite and positive only if the sum is below $1$", 2, true],
      ["igarch", "At $1$ (IGARCH) shocks to the variance forecast never decay and the unconditional variance is infinite — the EWMA case when $\\alpha_0 = 0$", 2, true],
    ]),
  num(m(VF, "apply-kurt-2", "apply", 7, 45, "Using the GARCH(1,1) kurtosis formula, find the kurtosis for $\\alpha_1 = 0.05$ and $\\beta_1 = 0.9$. Give $4$ decimal places."), 3.1622),
  num(m(VF, "apply-ar-rv", "apply", 7, 40, "Realized volatility follows $\\hat{\\sigma}(t + 1) = 0.2 + 0.7\\hat{\\sigma}(t) + \\text{noise}$, and today $\\hat{\\sigma} = 1$ (in percent). Find the two-day-ahead forecast in percent."), 0.83),
  mcq(m(VF, "apply-kurt-mismatch", "apply", 7, 40, "Fitted to stock indices, GARCH(1,1) tends to:"),
    "Imply more autocorrelation in squared returns than observed, for the observed kurtosis",
    [
      ["Imply negative autocorrelation in squared returns", "mismatch-negative", "GARCH squared-return autocorrelations are positive."],
      ["Fit kurtosis and autocorrelation perfectly", "mismatch-perfect", "The model can't match both at once."],
      ["Imply skewed returns", "mismatch-skew", "GARCH(1,1) returns are symmetric."],
    ]),
  // level 8
  short(m(VF, "explain-realgarch", "explain", 8, 150, "RealGARCH replaces $\\alpha_1 r_{t-1}^{2}$ in the GARCH recursion with a term in the previous day's realized variance $x_{t-1}$, and adds an equation linking $x_t$ to $h_t^{2}$. Why should this help?"),
    [
      ["proxy", "$r_{t-1}^{2}$ is a very noisy single-observation proxy for yesterday's variance; realized variance is far more precise, so the update uses better information", 2, true],
      ["measurement", "The extra equation treats RV as a noisy, possibly biased measurement of the latent variance, so its errors are modelled rather than ignored", 2, true],
    ]),
  num(m(VF, "apply-years-for-drift", "apply", 8, 45, "A stock has annual volatility $16\\%$. How many years of data are needed for the standard error of its estimated annual expected return to fall to $2\\%$?"), 64),
  num(m(VF, "apply-variance-target", "apply", 8, 40, "With variance targeting, $\\alpha_0$ is set so the unconditional variance equals the sample variance $2 \\times 10^{-4}$. With $\\alpha_1 = 0.1$ and $\\beta_1 = 0.85$, find $\\alpha_0$ in units of $10^{-5}$."), 1),
  mcq(m(VF, "apply-mle-recursion", "apply", 8, 40, "GARCH(1,1) is estimated by maximum likelihood because:"),
    "Given the parameters and a starting value, the recursion turns past returns into each day's variance, so the likelihood is computable",
    [
      ["The variances are observed directly", "mle-observed", "$h_t$ is latent; it is reconstructed recursively."],
      ["OLS of $r_t$ on $r_{t-1}$ recovers the parameters", "mle-ols", "Variance parameters don't come from a regression of returns on returns."],
      ["The likelihood has a closed-form maximiser", "mle-closed", "It is maximised numerically."],
    ]),
  // level 9
  short(m(VF, "design-vol-system", "transfer", 9, 180, "Design a daily volatility forecast for $3{,}000$ US stocks, some of which are thinly traded. What would you use, and how would you handle the illiquid names?"),
    [
      ["liquid", "For liquid names, use intraday data (e.g. $5$-minute realized variance) combined with a dynamic model such as RealGARCH or an AR model on RV", 2, true],
      ["illiquid", "For thin names, use lower-frequency data, longer intervals or daily-return models (GARCH/EWMA), and possibly shrink toward peers", 1, true],
      ["overnight", "Treat the close-to-open return separately, since it carries news and is not captured by intraday RV", 1, false],
    ]),
  short(m(VF, "explain-proxy", "explain", 9, 150, "When evaluating volatility forecasts, why is comparing them to next-day $r_t^{2}$ problematic, and what is a better target?"),
    [
      ["noisy", "$r_t^{2}$ is an unbiased but extremely noisy proxy for the day's variance (its standard deviation is about $\\sqrt{2}$ times the variance)", 2, true],
      ["better", "Realized variance from intraday returns is a much less noisy proxy; and losses robust to proxy noise (e.g. QLIKE, MSE) keep rankings consistent", 2, true],
    ]),
  num(m(VF, "apply-var", "apply", 9, 50, "A GARCH forecast gives tomorrow's volatility as $1.5\\%$ for a $\\$10$ million position. Assuming Gaussian returns, find the one-day $99\\%$ value-at-risk, using $z = 2.326$, in thousands of dollars. Round to the nearest thousand."), 349),
  mcq(m(VF, "apply-garch-tails", "apply", 9, 40, "Stationary GARCH(1,1) with Gaussian $\\epsilon_t$ has unconditional return tails that are:"),
    "Pareto (power-law), from the random recursive structure of the variance",
    [
      ["Gaussian", "tails-gaussian", "Mixing over random variances fattens the tails."],
      ["Bounded", "tails-bounded", "The variance can grow arbitrarily large."],
      ["Exponential", "tails-exponential", "Kesten-type recursions give power tails."],
    ]),
  // level 10
  short(m(VF, "judge-power-tails", "transfer", 10, 180, "Explain, at an intuitive level, how a GARCH(1,1) with Gaussian innovations generates power-law tails in unconditional returns."),
    [
      ["recursion", "The variance obeys $h_t^{2} = a_t h_{t-1}^{2} + \\alpha_0$ with random multipliers $a_t$; occasionally a run of $a_t > 1$ compounds", 2, true],
      ["tails", "Such multiplicative runs make very large variances only polynomially rare (Kesten), so returns — Gaussian given $h_t$ — inherit power-law tails", 2, true],
    ]),
  short(m(VF, "judge-which-forecaster", "transfer", 10, 180, "When would you expect a GARCH forecast to beat a realized-variance forecast, and when the reverse?"),
    [
      ["garch-wins", "GARCH can win for illiquid assets, noisy or unavailable intraday data, or when long histories of daily data matter more than recent precision", 2, true],
      ["rv-wins", "RV wins for liquid assets with clean intraday data, especially after volatility shifts, because it measures today's variance far more precisely", 2, true],
    ]),
  num(m(VF, "apply-fourth-moment-bound", "apply", 10, 90, "GARCH(1,1) has a finite fourth moment when $(\\alpha_1 + \\beta_1)^{2} + 2\\alpha_1^{2} < 1$. With $\\beta_1 = 0.9$, find the largest $\\alpha_1$ that satisfies it. Give $4$ decimal places."), 0.0916),
  mcq(m(VF, "judge-skew", "transfer", 10, 60, "Equity returns show negative skewness, and volatility tends to rise more after falls. GARCH(1,1) unconditional returns have:"),
    "Zero skewness, so asymmetric extensions are needed to capture these effects",
    [
      ["Negative skewness", "skew-neg", "$\\mathbb{E}[h^{3}\\epsilon^{3}] = 0$ since $\\epsilon$ is symmetric and independent of $h$."],
      ["Positive skewness", "skew-pos", "The symmetric innovation gives zero skewness."],
      ["Undefined skewness", "skew-undefined", "With a finite third moment the skewness is zero."],
    ]),
];

// ---------------------------------------------------------------------------
// ewma-volatility
// ---------------------------------------------------------------------------
const EV = "ewma-volatility";
const ewmaVolatility: Item[] = [
  // level 1
  mcq(m(EV, "recall-ewma-var", "recall", 1, 15, "The EWMA variance estimate with decay $\\lambda$ updates as:"),
    "$\\hat{\\sigma}_t^{2} = \\lambda\\hat{\\sigma}_{t-1}^{2} + (1 - \\lambda)r_{t-1}^{2}$",
    [
      ["$\\hat{\\sigma}_t^{2} = \\lambda\\hat{\\sigma}_{t-1}^{2} + r_{t-1}^{2}$", "ewmav-noscale", "The weights must sum to one."],
      ["$\\hat{\\sigma}_t = \\lambda\\hat{\\sigma}_{t-1} + (1 - \\lambda)r_{t-1}$", "ewmav-levels", "The average is of squared returns, giving a variance."],
      ["$\\hat{\\sigma}_t^{2} = \\frac{1}{t}\\sum_s r_s^{2}$", "ewmav-equal", "That uses equal weights."],
    ]),
  mcq(m(EV, "recall-practice", "recall", 1, 15, "Among practitioners and commercial risk models (RiskMetrics, Barra, Axioma), the dominant volatility estimator is:"),
    "The EWMA of squared returns",
    [
      ["Full GARCH estimation for every asset", "practice-garch", "Academic attention favours GARCH; practice favours EWMA."],
      ["Implied volatility from options only", "practice-implied", "Most assets have no liquid options."],
      ["The equal-weighted variance of all history", "practice-equal", "Practitioners discount old data."],
    ]),
  mcq(m(EV, "recall-muth", "recall", 1, 15, "In Muth's model applied to volatility, the hidden state and the observation are:"),
    "The current variance, observed through the squared return $r_t^{2}$",
    [
      ["The return, observed through the price", "muth-return", "The state here is the variance."],
      ["The volatility, observed directly", "muth-direct", "Volatility is never observed directly."],
      ["The mean return, observed through the variance", "muth-mean", "That reverses the roles."],
    ]),
  mcq(m(EV, "recall-garch-map", "recall", 1, 15, "An EWMA with decay $\\lambda$ is the GARCH(1,1) with:"),
    "$\\alpha_0 = 0$, $\\alpha_1 = 1 - \\lambda$, $\\beta_1 = \\lambda$",
    [
      ["$\\alpha_0 = 0$, $\\alpha_1 = \\lambda$, $\\beta_1 = 1 - \\lambda$", "map-swapped", "$\\beta_1$ multiplies the old variance, which gets weight $\\lambda$."],
      ["$\\alpha_0 = \\lambda$, $\\alpha_1 = 0$, $\\beta_1 = 1$", "map-constant", "Then variance never reacts to returns."],
      ["$\\alpha_0 = 1$, $\\alpha_1 = \\lambda$, $\\beta_1 = \\lambda$", "map-sum", "The weights must sum to one and the offset be zero."],
    ]),
  // level 2
  num(m(EV, "apply-update", "apply", 2, 25, "With $\\lambda = 0.94$, yesterday's variance estimate is $10^{-4}$ and yesterday's return is $3\\%$. Find today's estimate in units of $10^{-4}$."), 1.48),
  num(m(EV, "apply-half-life", "apply", 2, 20, "Find the half-life, in days, of an EWMA variance estimator with $\\lambda = 0.94$. Give $1$ decimal place."), 11.2),
  num(m(EV, "apply-lambda-from-hl", "apply", 2, 25, "A risk model uses a $60$-day half-life. Find its $\\lambda$. Give $4$ decimal places."), 0.9885),
  mcq(m(EV, "apply-reactive", "apply", 2, 20, "Lowering $\\lambda$ from $0.97$ to $0.90$ makes the volatility estimate:"),
    "React faster to new returns, at the cost of more noise",
    [
      ["Smoother", "react-smoother", "Lower $\\lambda$ forgets the past faster."],
      ["Biased downward", "react-bias", "$\\lambda$ affects memory, not the mean."],
      ["Insensitive to large returns", "react-insensitive", "Large returns move it more, not less."],
    ]),
  // level 3
  num(m(EV, "apply-vol-after", "apply", 3, 30, "Yesterday's volatility estimate was $1\\%$, and yesterday's return was $-3\\%$. With $\\lambda = 0.94$, find today's volatility estimate in percent. Give $2$ decimal places."), 1.22),
  num(m(EV, "apply-alpha-from-lambda", "apply", 3, 20, "An EWMA has $\\lambda = 0.94$. Find the GARCH coefficient $\\alpha_1$ it corresponds to."), 0.06),
  num(m(EV, "apply-gain-approx", "apply", 3, 25, "In Muth's model, the noise ratio is $\\kappa = \\frac{\\sigma_\\epsilon}{\\sigma_\\eta} = 9$. Using the approximation $K \\approx \\frac{1}{\\kappa + 1}$, find the gain $K$."), 0.1),
  mcq(m(EV, "apply-kappa-meaning", "apply", 3, 25, "A large noise-to-signal ratio $\\kappa = \\frac{\\sigma_\\epsilon}{\\sigma_\\eta}$ in Muth's model calls for:"),
    "A small gain and a long half-life",
    [
      ["A large gain and a short half-life", "kappa-large-gain", "Noisy observations should be averaged over many periods."],
      ["Using only the latest observation", "kappa-latest", "That's optimal when observation noise is negligible."],
      ["Ignoring the observations", "kappa-ignore", "The gain is small but positive."],
    ]),
  // level 4
  num(m(EV, "apply-exact-gain", "apply", 4, 45, "In Muth's model with $\\sigma_\\eta^{2} = 1$ and $\\sigma_\\epsilon^{2} = 81$, the steady-state prior variance solves $P^{2} - P - 81 = 0$ and $K = \\frac{P}{P + 81}$. Find $K$. Give $4$ decimal places."), 0.1051),
  num(m(EV, "apply-hs-update", "apply", 4, 45, "In the simplified Harvey–Shephard model, $\\hat{x}_{t+1|t} = (1 - K)\\hat{x}_{t|t-1} + K\\left(\\log r_t^{2} + 1.27\\right)$. With $K = 0.1$, $\\hat{x}_{t|t-1} = -9.2$ and $\\log r_t^{2} = -8$, find $\\hat{x}_{t+1|t}$. Give $3$ decimal places."), -8.953),
  num(m(EV, "apply-hs-vol", "apply", 4, 30, "In the Harvey–Shephard model the volatility estimate is $e^{\\hat{x}/2}$. Find it for $\\hat{x} = -9.2$. Give $4$ decimal places."), 0.0101),
  mcq(m(EV, "apply-hs-positive", "apply", 4, 30, "An advantage of filtering $\\log r_t^{2}$ (Harvey–Shephard) over filtering $r_t^{2}$ (Muth) is that:"),
    "The volatility estimate $e^{\\hat{x}/2}$ is positive by construction",
    [
      ["It needs no choice of gain", "hs-no-gain", "It still uses a Kalman gain."],
      ["It ignores large returns", "hs-ignores", "Large returns still enter, but their log is compressed."],
      ["It makes returns Gaussian", "hs-gaussian", "Returns are locally log-normal in the model, not Gaussian."],
    ]),
  // level 5
  short(m(EV, "explain-kalman-ewma", "explain", 5, 120, "Explain why the EWMA of squared returns is the optimal estimator under Muth's model of variance."),
    [
      ["model", "Muth's model: variance follows a random walk $x_{t+1} = x_t + \\eta_{t+1}$, observed noisily as $y_t = r_t^{2} = x_t + \\epsilon_t$", 2, true],
      ["filter", "The Kalman filter for this local-level model has a constant steady-state gain $K$, and its update $\\hat{x}_{t+1} = (1 - K)\\hat{x}_t + K y_t$ is an EWMA", 2, true],
    ]),
  mcq(m(EV, "apply-muth-flaws", "apply", 5, 30, "Which is $\\textbf{NOT}$ a shortcoming of Muth's model for variance?"),
    "It produces estimates that are hard to compute",
    [
      ["It allows the variance to go negative", "muthflaw-negative", "A random walk with Gaussian steps can cross zero."],
      ["Its variance wanders without bound instead of reverting", "muthflaw-wander", "Real volatility mean-reverts."],
      ["Its observation noise is far from Gaussian", "muthflaw-noise", "$r_t^{2} - \\sigma_t^{2}$ is skewed and heavy-tailed."],
    ]),
  num(m(EV, "apply-proxy-noise", "apply", 5, 35, "For Gaussian returns, $\\text{Var}(r_t^{2}) = 2\\sigma_t^{4}$. Find the standard deviation of $r_t^{2}$ divided by $\\sigma_t^{2}$. Give $4$ decimal places."), 1.4142),
  num(m(EV, "apply-gain-equal", "apply", 5, 35, "In Muth's model with equal noise variances $\\sigma_\\eta^{2} = \\sigma_\\epsilon^{2} = 1$, find the steady-state gain $K$. Give $3$ decimal places."), 0.618),
  // level 6
  short(m(EV, "explain-mean-reversion-gain", "explain", 6, 150, "Adding mean reversion to the variance state, $x_{t+1} = x_t - \\kappa(x_t - \\mu) + \\eta_{t+1}$, lowers the optimal gain. Explain why."),
    [
      ["concentration", "Mean reversion keeps the variance concentrated around its long-run level, so it changes less from period to period", 2, true],
      ["memory", "Old observations remain informative about today's variance, so the filter discounts the past less (smaller $K$, longer half-life)", 2, true],
    ]),
  num(m(EV, "apply-stationary-sd", "apply", 6, 40, "For $x_{t+1} = x_t - \\kappa(x_t - \\mu) + \\eta_{t+1}$ with $\\kappa = 0.1$ and $\\sigma_\\eta = 1$, the stationary standard deviation is $\\frac{\\sigma_\\eta}{\\sqrt{2\\kappa - \\kappa^{2}}}$. Find it. Give $3$ decimal places."), 2.294),
  num(m(EV, "apply-gain-ar", "apply", 6, 50, "With an AR state $u_{t+1} = 0.9u_t + \\eta_{t+1}$, $\\sigma_\\eta^{2} = 1$ and $\\sigma_\\epsilon^{2} = 81$, the steady prior variance solves $P = 0.81\\left(P - \\frac{P^{2}}{P + 81}\\right) + 1$. Find $K = \\frac{P}{P + 81}$. Give $4$ decimal places."), 0.0507),
  mcq(m(EV, "apply-mr-ewma", "apply", 6, 35, "With a mean-reverting variance state, the optimal filter is:"),
    "Still an EWMA (of deviations from the long-run mean), with a smaller gain",
    [
      ["No longer linear", "mr-nonlinear", "The model is still linear-Gaussian."],
      ["An equal-weighted average", "mr-equal", "Weights stay geometric."],
      ["The last observation", "mr-latest", "That would ignore the noise."],
    ]),
  // level 7
  short(m(EV, "explain-garch-offset", "explain", 7, 150, "Write GARCH(1,1) as an EWMA “with an offset” and explain what the offset $\\alpha_0$ does that a plain EWMA cannot."),
    [
      ["rewrite", "$h_t^{2} = \\alpha_0 + \\alpha_1 r_{t-1}^{2} + \\beta_1 h_{t-1}^{2}$ is an exponentially weighted average of past squared returns plus a constant", 2, true],
      ["offset", "With $\\alpha_1 + \\beta_1 < 1$ the constant pulls forecasts back to the long-run variance $\\frac{\\alpha_0}{1 - \\alpha_1 - \\beta_1}$ (mean reversion); the EWMA forecasts stay flat at today's level", 2, true],
    ]),
  num(m(EV, "apply-center-of-mass", "apply", 7, 35, "Find the average age, $\\frac{\\lambda}{1 - \\lambda}$ days, of the data in an EWMA with $\\lambda = 0.97$. Give $2$ decimal places."), 32.33),
  num(m(EV, "apply-gain-ar95", "apply", 7, 50, "With an AR state with coefficient $0.95$, $\\sigma_\\eta^{2} = 1$ and $\\sigma_\\epsilon^{2} = 81$, the steady-state gain is $K = \\frac{P}{P + 81}$ where $P = 0.9025\\left(P - \\frac{P^{2}}{P + 81}\\right) + 1$. Find $K$. Give $3$ decimal places."), 0.071),
  mcq(m(EV, "apply-forecast-flat", "apply", 7, 35, "A plain EWMA's forecast of the variance $10$ days ahead is:"),
    "The same as its one-day-ahead forecast",
    [
      ["Closer to the long-run variance", "flat-reverts", "That is GARCH's mean reversion; EWMA has no long-run level."],
      ["Ten times the one-day forecast", "flat-times-ten", "That is the forecast of total variance over $10$ days, not of the daily variance."],
      ["Zero", "flat-zero", "The level is carried forward."],
    ]),
  // level 8
  short(m(EV, "explain-hs", "explain", 8, 150, "Explain how the Harvey–Shephard model turns stochastic volatility into a linear state-space model, and what the constant $-1.27$ is."),
    [
      ["log", "With $u_t = e^{x_t/2}\\epsilon_t$, squaring and taking logs gives $\\log u_t^{2} = x_t + \\log\\epsilon_t^{2}$: linear in the log-variance $x_t$", 2, true],
      ["constant", "$\\log\\epsilon_t^{2}$ has mean $\\approx -1.27$ (for $\\epsilon \\sim \\mathcal{N}(0, 1)$) and standard deviation $\\approx 2.22$, so subtracting $-1.27$ gives a zero-mean observation noise for the Kalman filter", 2, true],
    ]),
  num(m(EV, "apply-log-chi-mean", "apply", 8, 45, "For $\\epsilon \\sim \\mathcal{N}(0, 1)$, $\\mathbb{E}[\\log\\epsilon^{2}] = \\psi\\left(\\frac{1}{2}\\right) + \\log 2$, where $\\psi\\left(\\frac{1}{2}\\right) = -1.9635$. Find it. Give $4$ decimal places."), -1.2704),
  num(m(EV, "apply-log-chi-sd", "apply", 8, 40, "For $\\epsilon \\sim \\mathcal{N}(0, 1)$, $\\text{Var}(\\log\\epsilon^{2}) = \\frac{\\pi^{2}}{2}$. Find the standard deviation. Give $4$ decimal places."), 2.2214),
  mcq(m(EV, "apply-jensen", "apply", 8, 40, "If you filter $\\log r_t^{2}$ but forget to subtract the mean of $\\log\\epsilon_t^{2}$, your volatility estimates $e^{\\hat{x}/2}$ will be:"),
    "Biased downward, by a factor of about $e^{-1.27/2} \\approx 0.53$",
    [
      ["Unbiased", "jensen-unbiased", "$\\mathbb{E}[\\log\\epsilon^{2}] \\ne 0$."],
      ["Biased upward", "jensen-up", "The mean of $\\log\\epsilon^{2}$ is negative."],
      ["Negative", "jensen-negative", "An exponential is always positive."],
    ]),
  // level 9
  short(m(EV, "design-half-life", "transfer", 9, 180, "How would you choose the half-life of the EWMA volatility estimate in a daily equity risk model?"),
    [
      ["horizon", "Match it to how the forecast is used: shorter for short horizons and fast-reacting risk control, longer where stability and low turnover matter", 2, true],
      ["validation", "Pick it by out-of-sample evaluation with a robust loss (e.g. QLIKE against realized variance), checking stability across calm and crisis periods", 2, true],
    ]),
  short(m(EV, "explain-why-practitioners", "explain", 9, 150, "Why do practitioners prefer EWMA to fully estimated GARCH models for large risk models?"),
    [
      ["simplicity", "One interpretable parameter (the half-life), no per-asset maximum likelihood that can fail or be unstable", 2, true],
      ["scale", "Extends trivially to thousands of assets and to covariance matrices, and is cheap to update; GARCH's extra benefit (mean reversion) matters mainly at longer horizons", 2, true],
    ]),
  num(m(EV, "apply-uncentered-bias", "apply", 9, 45, "Daily returns have mean $0.0005$ and standard deviation $0.01$. Using uncentered squared returns, find the relative bias of the variance estimate, $\\frac{\\mu^{2}}{\\sigma^{2}}$, in percent. Give $2$ decimal places."), 0.25),
  mcq(m(EV, "apply-crisis", "apply", 9, 40, "During a volatility spike, a $90$-day half-life EWMA compared with a $10$-day half-life EWMA will:"),
    "Lag the spike, understating current risk at first and overstating it after the spike fades",
    [
      ["React faster", "crisis-faster", "Longer memory reacts more slowly."],
      ["Give the same estimate", "crisis-same", "Half-life controls responsiveness."],
      ["Ignore the spike entirely", "crisis-ignore", "It reacts, just slowly."],
    ]),
  // level 10
  short(m(EV, "judge-heavy-tails", "transfer", 10, 180, "Heavy-tailed returns make the EWMA of $r_t^{2}$ jump after a single extreme day. Propose two remedies and their costs."),
    [
      ["robust", "Robustify the input, e.g. winsorize or cap $r_t^{2}$, or average $|r_t|$ (rescaled) instead of $r_t^{2}$", 2, true],
      ["model", "Or filter $\\log r_t^{2}$ (Harvey–Shephard), which compresses outliers; costs: bias that must be corrected, and slower reaction to genuine regime changes", 2, true],
    ]),
  short(m(EV, "judge-garch-vs-ewma", "transfer", 10, 180, "A colleague claims GARCH is strictly better than EWMA because it nests it. Respond."),
    [
      ["nesting", "Nesting means GARCH can fit at least as well in-sample, not that it forecasts better out-of-sample: extra parameters add estimation error", 2, true],
      ["practice", "At short horizons the two forecasts are very close (mean reversion matters little); EWMA is more robust and scales to many assets", 2, true],
    ]),
  num(m(EV, "apply-implied-ratio", "apply", 10, 90, "An EWMA variance estimator with $\\lambda = 0.94$ is optimal for Muth's model. Using $\\frac{K^{2}}{1 - K} = \\frac{\\sigma_\\eta^{2}}{\\sigma_\\epsilon^{2}}$ with $K = 1 - \\lambda$, find the implied ratio $\\frac{\\sigma_\\epsilon}{\\sigma_\\eta}$ of observation to state noise. Give $2$ decimal places."), 16.16),
  mcq(m(EV, "judge-overlap", "transfer", 10, 60, "A team estimates volatility with an EWMA of half-life $5$ days and then uses it to scale positions held for $3$ months. The main concern is:"),
    "The estimate is tuned for a far shorter horizon, so it is noisy and over-reactive for a $3$-month decision",
    [
      ["The estimate is biased upward", "overlap-bias", "Half-life affects noise and lag, not systematic bias."],
      ["EWMA cannot be used for sizing", "overlap-sizing", "Volatility estimates are routinely used to size positions."],
      ["Five days is too long for any purpose", "overlap-too-long", "The mismatch is the reverse: too short for the horizon."],
    ]),
];

export const qi03Items: Item[] = [...volatilityForecasting, ...ewmaVolatility];
