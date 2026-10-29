import type { Item } from "../../lib/assessment/types";
import { m, mcq, num, short } from "./regression-gaps-shared";

/**
 * Time-series gap lessons, part 3: unit-root tests (ADF and KPSS), and
 * predictive regressions with Stambaugh bias. Forty questions per lesson,
 * four at each level from 1 to 10.
 */

// ---------------------------------------------------------------------------
// unit-root-tests
// ---------------------------------------------------------------------------
const UR = "unit-root-tests";
const unitRoots: Item[] = [
  // level 1
  mcq(m(UR, "recall-adf-null", "recall", 1, 15, "The null hypothesis of the augmented Dickey–Fuller test is that the series:"),
    "Has a unit root",
    [
      ["Is stationary", "adf-null-stationary", "That is the KPSS null."],
      ["Is white noise", "adf-null-wn", "White noise is stationary; ADF's null is a unit root."],
      ["Has a deterministic trend", "adf-null-trend", "A trend can be included, but the null is still a unit root."],
    ]),
  mcq(m(UR, "recall-kpss-null", "recall", 1, 15, "The null hypothesis of the KPSS test is that the series:"),
    "Is stationary (around a level or trend)",
    [
      ["Has a unit root", "kpss-null-unit", "That is the ADF null."],
      ["Is cointegrated", "kpss-null-coint", "KPSS is a univariate test."],
      ["Has no autocorrelation", "kpss-null-wn", "Stationary series can be autocorrelated."],
    ]),
  mcq(m(UR, "recall-augmented", "recall", 1, 15, "The lagged differences $\\Delta Y_{t-j}$ in the ADF regression are there to:"),
    "Absorb serial correlation so the error is approximately white noise",
    [
      ["Remove the trend", "aug-trend", "A trend term does that."],
      ["Make the series stationary", "aug-stationary", "They do not difference the series further."],
      ["Increase the test's critical value", "aug-critical", "They change the error structure, not the critical values' purpose."],
    ]),
  mcq(m(UR, "recall-df-shape", "recall", 1, 15, "Compared with the standard normal, the Dickey–Fuller distribution of the $t$-ratio is:"),
    "Shifted and skewed to the left, with more negative critical values",
    [
      ["Exactly normal", "dfshape-normal", "Under a unit root the $t$-ratio is not asymptotically normal."],
      ["Skewed to the right", "dfshape-right", "It is skewed left."],
      ["A $t$ distribution with $T - 2$ df", "dfshape-t", "The regressor is a random walk, so standard theory fails."],
    ]),
  // level 2
  num(m(UR, "apply-rho", "apply", 2, 20, "In the AR(1) form $Y_t = \\alpha + \\phi Y_{t-1} + u_t$ with $\\phi = 0.95$, what is $\\rho$ in the Dickey–Fuller form $\\Delta Y_t = \\alpha + \\rho Y_{t-1} + u_t$?"), -0.05),
  num(m(UR, "apply-adf-t", "apply", 2, 20, "An ADF regression gives $\\hat{\\rho} = -0.04$ with standard error $0.02$. What is the ADF $t$-ratio?"), -2),
  num(m(UR, "apply-lag-count", "apply", 2, 20, "If $Y_t$ follows an AR($3$) process, how many lagged differences does the ADF regression need?"), 2),
  mcq(m(UR, "apply-critical", "apply", 2, 20, "With a constant in the ADF regression, the $5\\%$ critical value is about:"),
    "$-2.86$",
    [
      ["$-1.645$", "crit-normal", "That is the one-sided normal value, too lenient here."],
      ["$-1.96$", "crit-two-sided", "That is the two-sided normal value."],
      ["$-3.96$", "crit-trend-1", "That is roughly the $1\\%$ value with a constant and a trend."],
    ]),
  // level 3
  num(m(UR, "apply-half-life", "apply", 3, 25, "A stationary AR(1) has $\\phi = 0.9$. Find the half-life of a shock, $\\frac{\\ln 0.5}{\\ln\\phi}$. Give $2$ decimal places."), 6.58),
  num(m(UR, "apply-rw-variance", "apply", 3, 25, "A random walk $Y_t = Y_{t-1} + \\varepsilon_t$ starts at $Y_0 = 0$ with $\\text{Var}(\\varepsilon_t) = 1$. What is $\\text{Var}(Y_{100})$?"), 100),
  num(m(UR, "apply-adf-t2", "apply", 3, 25, "An ADF regression gives $\\hat{\\rho} = -0.1$ with standard error $0.03$. Find the $t$-ratio. Give $2$ decimal places."), -3.33),
  mcq(m(UR, "apply-kpss-read", "apply", 3, 25, "A level-stationarity KPSS statistic is $0.6$; the $5\\%$ critical value is $0.463$. You:"),
    "Reject stationarity",
    [
      ["Fail to reject stationarity", "kpss-read-fail", "KPSS rejects for large values, and $0.6 > 0.463$."],
      ["Reject the unit root", "kpss-read-unit", "KPSS's null is stationarity."],
      ["Cannot conclude without ADF", "kpss-read-adf", "The KPSS test has its own conclusion; ADF complements it."],
    ]),
  // level 4
  num(m(UR, "apply-kendall", "apply", 4, 35, "Kendall's approximation gives $\\mathbb{E}[\\hat{\\phi} - \\phi] \\approx -\\frac{1 + 3\\phi}{T}$. Find it for $\\phi = 0.9$ and $T = 100$. Give $3$ decimal places."), -0.037),
  num(m(UR, "apply-rw-corr", "apply", 4, 35, "For a random walk started at $0$, $\\text{Corr}(Y_t, Y_{t+k}) = \\sqrt{\\frac{t}{t + k}}$. Find it for $t = 100$ and $k = 44$. Give $2$ decimal places."), 0.83),
  num(m(UR, "apply-normalized-bias", "apply", 4, 35, "With $T = 200$ and $\\hat{\\phi} = 0.97$, find the Dickey–Fuller normalized-bias statistic $T(\\hat{\\phi} - 1)$."), -6),
  mcq(m(UR, "apply-trend-case", "apply", 4, 35, "A series drifts upward over time. In the ADF regression you should:"),
    "Include a constant and a linear trend, and use the corresponding critical values",
    [
      ["Exclude all deterministic terms", "trend-none", "A drifting series would then look nonstationary for the wrong reason."],
      ["Use normal critical values", "trend-normal", "Dickey–Fuller critical values apply in every case."],
      ["Difference twice first", "trend-twice", "That over-differences."],
    ]),
  // level 5
  short(m(UR, "explain-nonstandard", "explain", 5, 120, "Explain why the ADF $t$-ratio does not have a normal distribution under the null."),
    [
      ["regressor", "Under the null the regressor $Y_{t-1}$ is a random walk, not stationary", 2, true],
      ["rate", "Its sum of squares grows like $T^2$, so $\\hat{\\rho}$ converges at rate $T$", 1, true],
      ["limit", "The limit is a functional of Brownian motion ($\\int W\\,dW / (\\int W^2)^{1/2}$), skewed left", 2, true],
    ]),
  mcq(m(UR, "apply-joint-1", "apply", 5, 40, "ADF does not reject a unit root and KPSS rejects stationarity. The data suggest the series is:"),
    "$I(1)$",
    [
      ["$I(0)$", "joint1-i0", "Both tests point toward a unit root."],
      ["Contradictory", "joint1-conflict", "This is the consistent unit-root case."],
      ["White noise", "joint1-wn", "White noise would not reject KPSS."],
    ]),
  mcq(m(UR, "apply-joint-2", "apply", 5, 40, "ADF rejects a unit root and KPSS also rejects stationarity. A likely explanation is:"),
    "Long memory or a structural break",
    [
      ["The series is clearly $I(0)$", "joint2-i0", "KPSS rejecting stationarity conflicts with that."],
      ["The series is clearly $I(1)$", "joint2-i1", "ADF rejecting a unit root conflicts with that."],
      ["Too few observations to say anything", "joint2-power", "Low power usually shows up as both tests failing to reject."],
    ]),
  num(m(UR, "apply-stationary-var", "apply", 5, 40, "A stationary AR(1) with $\\phi = 0.98$ has innovation variance $1$. Find its variance $\\frac{1}{1 - \\phi^2}$. Give $2$ decimal places."), 25.25),
  // level 6
  short(m(UR, "explain-power", "explain", 6, 150, "Why do unit-root tests have low power against stationary but highly persistent alternatives, and what does that mean for interpreting a non-rejection?"),
    [
      ["closeness", "With $\\phi$ near $1$ (e.g. $0.98$), a finite sample looks like a random walk", 2, true],
      ["nonrejection", "Failing to reject is not evidence of a unit root", 2, true],
      ["remedies", "Mentions longer spans, KPSS as a complement, or more powerful tests (DF-GLS)", 1, false],
    ]),
  num(m(UR, "apply-normalized-bias-2", "apply", 6, 50, "An ADF regression on $T = 250$ observations gives $\\hat{\\rho} = -0.06$. Find the normalized-bias statistic $T\\hat{\\rho}$."), -15),
  num(m(UR, "apply-half-life-95", "apply", 6, 50, "Find the half-life $\\frac{\\ln 0.5}{\\ln\\phi}$ of an AR(1) with $\\phi = 0.95$. Give $2$ decimal places."), 13.51),
  mcq(m(UR, "apply-overdiff", "apply", 6, 50, "You difference a series that was already stationary white noise. The differenced series:"),
    "Is an MA(1) with lag-1 autocorrelation $-0.5$ (over-differencing)",
    [
      ["Is still white noise", "overdiff-wn", "$\\varepsilon_t - \\varepsilon_{t-1}$ is correlated with $\\varepsilon_{t-1} - \\varepsilon_{t-2}$."],
      ["Has a unit root", "overdiff-unit", "It has a unit root in its MA part, not its AR part."],
      ["Is a random walk", "overdiff-rw", "Differencing removes, not adds, a random walk."],
    ]),
  // level 7
  short(m(UR, "transfer-spurious", "transfer", 7, 150, "Two independent random walks are regressed on each other and the slope's $t$-statistic is $8$. Explain what happened and what you should do before interpreting any levels regression."),
    [
      ["spurious", "Identifies spurious regression: $t$-statistics diverge even though the series are unrelated", 2, true],
      ["test", "Test each series for a unit root and test the regression residuals (cointegration)", 2, true],
      ["remedy", "If not cointegrated, model differences instead", 1, true],
    ]),
  num(m(UR, "apply-kpss-stat", "apply", 7, 60, "Residuals $[1, -1, 2, -2]$ have partial sums $S_t = [1, 0, 2, 0]$. With $\\hat{\\lambda}^2 = 1$ and $T = 4$, compute $\\frac{1}{T^2\\hat{\\lambda}^2}\\sum_t S_t^2$. Give $2$ decimal places."), 0.31),
  num(m(UR, "apply-variance-ratio", "apply", 7, 60, "For a stationary AR(1) with $\\phi = 0.5$, the two-period variance ratio $\\frac{\\text{Var}(Y_{t+2} - Y_t)}{2\\,\\text{Var}(Y_{t+1} - Y_t)}$ equals $\\frac{1 + \\phi}{2}$. Find it."), 0.75),
  mcq(m(UR, "apply-eg-critical", "apply", 7, 60, "To test whether residuals from a cointegrating regression have a unit root, you use:"),
    "Engle–Granger critical values, which are more negative than Dickey–Fuller ones",
    [
      ["Ordinary Dickey–Fuller critical values", "eg-df", "The residuals were fitted to look stationary, so DF values over-reject."],
      ["Normal critical values", "eg-normal", "Neither DF nor EG statistics are normal."],
      ["KPSS critical values", "eg-kpss", "KPSS tests a different null."],
    ]),
  // level 8
  short(m(UR, "explain-break", "explain", 8, 180, "Explain why a stationary series with a one-time level shift can fail an ADF test, and how to test properly when a break is suspected."),
    [
      ["mimic", "The shift creates apparent persistence, which the test reads as a unit root (Perron)", 2, true],
      ["test", "Use break-robust tests (Perron with a known date, Zivot–Andrews with an unknown one)", 2, true],
      ["kpss", "Notes KPSS would also tend to reject stationarity", 1, false],
    ]),
  num(m(UR, "apply-overdiff-acf", "apply", 8, 70, "If $Y_t$ is white noise, what is the lag-1 autocorrelation of $\\Delta Y_t$?"), -0.5),
  num(m(UR, "apply-drift", "apply", 8, 70, "A random walk with drift $Y_t = 0.1 + Y_{t-1} + \\varepsilon_t$ starts at $Y_0 = 0$. What is $\\mathbb{E}[Y_{50}]$?"), 5),
  mcq(m(UR, "apply-lag-choice", "apply", 8, 70, "Using too few lagged differences in an ADF regression mainly causes:"),
    "Size distortion, because the remaining serial correlation invalidates the null distribution",
    [
      ["Loss of power only", "lag-power", "Too many lags cost power; too few distort size."],
      ["No effect", "lag-none", "The Dickey–Fuller limit assumes white-noise errors."],
      ["A bias in the trend coefficient only", "lag-trend", "The test statistic itself is affected."],
    ]),
  // level 9
  short(m(UR, "transfer-pairs", "transfer", 9, 180, "Before trading a pairs strategy on two stock prices, describe the unit-root and cointegration checks you would run and in what order."),
    [
      ["individual", "Test each price for a unit root (ADF/KPSS) to confirm both are $I(1)$", 1, true],
      ["residual", "Estimate the hedge ratio and test the spread residuals with Engle–Granger critical values (or Johansen)", 2, true],
      ["stability", "Check the half-life and stability of the relationship out of sample", 2, true],
    ]),
  short(m(UR, "transfer-rates", "transfer", 9, 180, "Interest rates are bounded and economically mean-reverting, yet ADF tests often fail to reject a unit root. How should a modeler proceed?"),
    [
      ["power", "Recognizes low power against near-unit-root alternatives over short samples", 2, true],
      ["modeling", "Chooses models robust to either case (local-to-unity methods, or modelling spreads/differences)", 2, true],
      ["economics", "Uses economic priors (boundedness) alongside the test", 1, false],
    ]),
  num(m(UR, "apply-coint-unit-roots", "apply", 9, 80, "Two $I(1)$ series share one cointegrating relation. How many common stochastic trends (unit roots) does the system have?"), 1),
  mcq(m(UR, "apply-dfgls", "apply", 9, 80, "The DF-GLS test improves on ADF mainly by:"),
    "Detrending by GLS before the test, which raises power against persistent alternatives",
    [
      ["Changing the null to stationarity", "dfgls-null", "That is KPSS."],
      ["Removing the need for lags", "dfgls-lags", "Lagged differences are still used."],
      ["Using normal critical values", "dfgls-normal", "It has its own nonstandard critical values."],
    ]),
  // level 10
  short(m(UR, "transfer-predictive", "transfer", 10, 200, "A return predictor has an estimated AR(1) coefficient of $0.98$ and ADF cannot reject a unit root. Explain the consequences for a predictive regression of returns on it."),
    [
      ["persistence", "Near-unit-root predictors make standard $t$-tests unreliable", 2, true],
      ["stambaugh", "If predictor and return shocks are correlated, the slope is biased (Stambaugh bias)", 2, true],
      ["methods", "Suggests local-to-unity / Bonferroni Q or IVX inference", 1, false],
    ]),
  short(m(UR, "transfer-difference-or-not", "transfer", 10, 200, "When is it a mistake to difference two series before regressing one on the other?"),
    [
      ["cointegration", "When they are cointegrated, differencing throws away the long-run relation", 2, true],
      ["ecm", "The right model is an error-correction model that keeps the levels relation", 2, true],
      ["stationary", "Also a mistake when the series are already stationary (over-differencing)", 1, false],
    ]),
  num(m(UR, "apply-local-unity", "apply", 10, 90, "In local-to-unity asymptotics $\\phi = 1 + \\frac{c}{T}$. Find $\\phi$ for $c = -10$ and $T = 200$."), 0.95),
  mcq(m(UR, "apply-spurious-r2", "apply", 10, 90, "As $T \\to \\infty$, the $R^2$ from regressing one independent random walk on another:"),
    "Converges to a nondegenerate random variable rather than to $0$",
    [
      ["Converges to $0$", "spur-zero", "That is what happens with stationary independent series."],
      ["Converges to $1$", "spur-one", "It stays random, often large but not $1$."],
      ["Is exactly $0$ in every sample", "spur-exact", "Sample $R^2$ is never exactly $0$ here."],
    ]),
];

// ---------------------------------------------------------------------------
// predictive-regression-stambaugh-bias
// ---------------------------------------------------------------------------
const SB = "predictive-regression-stambaugh-bias";
const stambaugh: Item[] = [
  // level 1
  mcq(m(SB, "recall-source", "recall", 1, 15, "Stambaugh bias in $r_{t+1} = \\alpha + \\beta x_t + \\varepsilon_{t+1}$ arises because:"),
    "The predictor's innovations are correlated with return innovations and the predictor is persistent",
    [
      ["The predictor is measured with error", "source-eiv", "That is attenuation bias, a different mechanism."],
      ["Returns are heteroskedastic", "source-hetero", "Heteroskedasticity affects standard errors, not bias."],
      ["The sample is too large", "source-large", "The bias shrinks as $T$ grows."],
    ]),
  mcq(m(SB, "recall-kendall", "recall", 1, 15, "In finite samples, the OLS estimate $\\hat{\\phi}$ of a persistent AR(1) coefficient is:"),
    "Biased downward (Kendall bias)",
    [
      ["Unbiased", "kendall-unbiased", "It is consistent but biased in finite samples."],
      ["Biased upward", "kendall-up", "The bias is negative."],
      ["Biased only if $\\phi = 1$", "kendall-unit", "The bias exists for any $\\phi$, roughly $-(1 + 3\\phi)/T$."],
    ]),
  mcq(m(SB, "recall-sign-dy", "recall", 1, 15, "For the dividend yield as predictor, the correlation between return shocks and predictor shocks is typically:"),
    "Strongly negative, because a price rise lowers the dividend yield",
    [
      ["Positive", "sign-positive", "Higher prices mean lower yields."],
      ["Zero", "sign-zero", "Prices enter both the return and the yield."],
      ["Undefined", "sign-undefined", "It is well defined and estimable."],
    ]),
  mcq(m(SB, "recall-direction", "recall", 1, 15, "With a negative shock correlation, the Stambaugh bias in $\\hat{\\beta}$ is:"),
    "Upward, toward finding predictability",
    [
      ["Downward", "dir-down", "The bias has the sign of $-\\sigma_{\\varepsilon\\eta}$."],
      ["Zero", "dir-zero", "It is zero only if the shocks are uncorrelated."],
      ["Toward zero", "dir-zero-shrink", "It pushes the estimate up, not toward zero."],
    ]),
  // level 2
  num(m(SB, "apply-kendall-50", "apply", 2, 20, "Using $\\mathbb{E}[\\hat{\\phi} - \\phi] \\approx -\\frac{1 + 3\\phi}{T}$, find the bias for $\\phi = 0.9$ and $T = 50$."), -0.074),
  num(m(SB, "apply-ratio", "apply", 2, 20, "Return shocks have SD $0.15$, predictor shocks have SD $0.005$, and their correlation is $-0.9$. Find $\\frac{\\sigma_{\\varepsilon\\eta}}{\\sigma_\\eta^2} = \\rho\\frac{\\sigma_\\varepsilon}{\\sigma_\\eta}$."), -27),
  num(m(SB, "apply-kendall-unit", "apply", 2, 20, "Using $-\\frac{1 + 3\\phi}{T}$, find the approximate bias of $\\hat{\\phi}$ for $\\phi = 1$ and $T = 100$."), -0.04),
  mcq(m(SB, "apply-predetermined", "apply", 2, 20, "In a predictive regression, $x_t$ is:"),
    "Predetermined (uncorrelated with $\\varepsilon_{t+1}$) but not strictly exogenous",
    [
      ["Strictly exogenous", "pre-strict", "Future values of $x$ respond to past return shocks."],
      ["Endogenous with $\\varepsilon_{t+1}$", "pre-endog", "$x_t$ is set before $\\varepsilon_{t+1}$."],
      ["Irrelevant to the bias", "pre-irrelevant", "Non-strict exogeneity is exactly the source."],
    ]),
  // level 3
  num(m(SB, "apply-bias", "apply", 3, 25, "With $\\frac{\\sigma_{\\varepsilon\\eta}}{\\sigma_\\eta^2} = -30$, $\\phi = 0.9$ and $T = 50$, find the Stambaugh bias $-\\frac{\\sigma_{\\varepsilon\\eta}}{\\sigma_\\eta^2}\\cdot\\frac{1 + 3\\phi}{T}$."), 2.22),
  num(m(SB, "apply-corrected", "apply", 3, 25, "OLS gives $\\hat{\\beta} = 3$ and the estimated Stambaugh bias is $2.22$. Find the bias-corrected estimate."), 0.78),
  num(m(SB, "apply-t-for-bias-1", "apply", 3, 25, "With $\\frac{\\sigma_{\\varepsilon\\eta}}{\\sigma_\\eta^2} = -30$ and $\\phi = 0.95$, for what $T$ is the bias $30\\cdot\\frac{1 + 3\\phi}{T}$ equal to $1$? Give $1$ decimal place."), 115.5),
  mcq(m(SB, "apply-consistent", "apply", 3, 25, "As $T \\to \\infty$ with $\\phi < 1$ fixed, the Stambaugh bias:"),
    "Vanishes, since OLS is consistent",
    [
      ["Stays constant", "cons-constant", "It is of order $1/T$."],
      ["Grows", "cons-grows", "More data reduces it."],
      ["Changes sign", "cons-sign", "Its sign is fixed by $\\sigma_{\\varepsilon\\eta}$."],
    ]),
  // level 4
  num(m(SB, "apply-lewellen", "apply", 4, 35, "Lewellen's adjustment is $\\hat{\\beta} - \\frac{\\sigma_{\\varepsilon\\eta}}{\\sigma_\\eta^2}(\\hat{\\phi} - \\phi)$ with $\\phi$ set just below $1$. Compute it for $\\hat{\\beta} = 2$, $\\frac{\\sigma_{\\varepsilon\\eta}}{\\sigma_\\eta^2} = -30$, $\\hat{\\phi} = 0.96$ and $\\phi = 0.9999$. Give $2$ decimal places."), 0.8),
  num(m(SB, "apply-phi-corrected", "apply", 4, 35, "An AR(1) estimate is $\\hat{\\phi} = 0.90$ with $T = 50$. Using $\\hat{\\phi} + \\frac{1 + 3\\hat{\\phi}}{T}$, find a bias-corrected $\\phi$. Give $3$ decimal places."), 0.974),
  num(m(SB, "apply-null-mean", "apply", 4, 35, "There is no true predictability ($\\beta = 0$), $\\frac{\\sigma_{\\varepsilon\\eta}}{\\sigma_\\eta^2} = -20$, $\\phi = 0.95$ and $T = 40$. Approximately what is $\\mathbb{E}[\\hat{\\beta}]$? Give $2$ decimal places."), 1.93),
  mcq(m(SB, "apply-uncorrelated", "apply", 4, 35, "If predictor shocks were uncorrelated with return shocks ($\\sigma_{\\varepsilon\\eta} = 0$), the predictive regression slope would be:"),
    "Unbiased, however persistent the predictor",
    [
      ["Still biased by Kendall's bias", "uncorr-kendall", "Kendall's bias reaches $\\hat{\\beta}$ only through $\\sigma_{\\varepsilon\\eta}$."],
      ["Biased downward", "uncorr-down", "With no shock correlation there is no transmission."],
      ["Inconsistent", "uncorr-incons", "OLS is consistent either way."],
    ]),
  // level 5
  short(m(SB, "explain-mechanism", "explain", 5, 120, "Explain, using the projection $\\varepsilon_{t+1} = \\frac{\\sigma_{\\varepsilon\\eta}}{\\sigma_\\eta^2}\\eta_{t+1} + v_{t+1}$, how the bias in $\\hat{\\phi}$ is transmitted to $\\hat{\\beta}$."),
    [
      ["same-regressor", "Both regressions use $x_t$ as the regressor, so their estimation errors are linked", 2, true],
      ["formula", "$\\hat{\\beta} - \\beta = \\frac{\\sigma_{\\varepsilon\\eta}}{\\sigma_\\eta^2}(\\hat{\\phi} - \\phi) + \\text{mean-zero noise}$", 2, true],
      ["sign", "Concludes the bias is $-\\frac{\\sigma_{\\varepsilon\\eta}}{\\sigma_\\eta^2}\\cdot\\frac{1 + 3\\phi}{T}$", 1, false],
    ]),
  mcq(m(SB, "apply-oos", "apply", 5, 40, "Goyal and Welch (2008) found that many in-sample return predictors:"),
    "Fail to beat the historical mean out of sample",
    [
      ["Become stronger out of sample", "oos-stronger", "Most weakened or vanished."],
      ["Are all valid once Stambaugh-corrected", "oos-corrected", "Correction reduces, not restores, the evidence."],
      ["Work only at long horizons", "oos-long", "Long horizons do not rescue them out of sample."],
    ]),
  mcq(m(SB, "apply-overlap", "apply", 5, 40, "Using overlapping long-horizon returns in a predictive regression:"),
    "Raises $R^2$ mechanically and needs HAC standard errors, which still over-reject",
    [
      ["Removes Stambaugh bias", "overlap-removes", "It compounds the problem."],
      ["Makes OLS standard errors valid", "overlap-valid", "Overlap induces serial correlation."],
      ["Has no effect on inference", "overlap-none", "It strongly affects inference."],
    ]),
  num(m(SB, "apply-oos-r2", "apply", 5, 40, "Out of sample, a predictive model has MSE $1.02$ while the historical-mean forecast has MSE $1.00$. Find $R^2_{\\text{OOS}} = 1 - \\frac{\\text{MSE}_{\\text{model}}}{\\text{MSE}_{\\text{mean}}}$."), -0.02),
  // level 6
  short(m(SB, "explain-lewellen", "explain", 6, 150, "Explain Lewellen's conservative test: why assuming $\\phi$ is just below $1$ is conservative, and when it is more powerful than the Stambaugh correction."),
    [
      ["worst", "Setting $\\phi$ near $1$ gives the largest plausible bias adjustment, so the test is conservative", 2, true],
      ["power", "When $\\hat{\\phi}$ is near $1$, the adjustment term is small and less noisy, giving more power", 2, true],
      ["assumption", "Relies on the predictor being stationary ($\\phi < 1$)", 1, false],
    ]),
  num(m(SB, "apply-projection", "apply", 6, 50, "Return shocks have SD $0.2$, predictor shocks have SD $0.01$ and correlation $-0.8$. Find the projection coefficient $\\frac{\\sigma_{\\varepsilon\\eta}}{\\sigma_\\eta^2}$."), -16),
  num(m(SB, "apply-residual-var", "apply", 6, 50, "Return shocks have variance $0.04$ and correlation $-0.8$ with predictor shocks. Find the variance of the part $v$ of the return shock uncorrelated with the predictor shock, $\\sigma_\\varepsilon^2(1 - \\rho^2)$. Give $4$ decimal places."), 0.0144),
  mcq(m(SB, "apply-ivx", "apply", 6, 50, "IVX inference for predictive regressions works by:"),
    "Instrumenting the persistent predictor with a less persistent filtered version of itself",
    [
      ["Differencing the returns", "ivx-diff", "Returns are already stationary."],
      ["Adding lagged returns", "ivx-lags", "That does not address persistence of the predictor."],
      ["Using White standard errors", "ivx-white", "Heteroskedasticity is not the issue."],
    ]),
  // level 7
  short(m(SB, "transfer-dividend-yield", "transfer", 7, 150, "A $60$-year annual regression of stock returns on the lagged dividend yield gives a $t$-statistic of $2.3$. List the reasons to be skeptical."),
    [
      ["stambaugh", "Stambaugh bias inflates the slope because the shock correlation is strongly negative", 2, true],
      ["persistence", "Near-unit-root persistence makes the $t$-test's null distribution nonstandard", 1, true],
      ["oos", "Data mining across predictors and weak out-of-sample performance", 2, true],
    ]),
  num(m(SB, "apply-bias-share", "apply", 7, 60, "An estimated slope is $4$ and its Stambaugh bias is $2.5$. What fraction of the estimate is bias? Give $2$ decimal places."), 0.63),
  num(m(SB, "apply-monthly-bias", "apply", 7, 60, "Monthly data: $T = 600$, $\\phi = 0.99$ and $\\frac{\\sigma_{\\varepsilon\\eta}}{\\sigma_\\eta^2} = -100$. Find the Stambaugh bias. Give $2$ decimal places."), 0.66),
  mcq(m(SB, "apply-monthly-vs-annual", "apply", 7, 60, "Moving from annual to monthly data over the same span:"),
    "Raises $T$ but also raises $\\phi$ toward $1$, so the bias does not fall as much as $T$ alone suggests",
    [
      ["Eliminates the bias", "monthly-eliminate", "Persistence rises with sampling frequency."],
      ["Has no effect on persistence", "monthly-persistence", "$\\phi$ per period moves closer to $1$."],
      ["Reverses the sign of the bias", "monthly-sign", "The sign depends on the shock correlation."],
    ]),
  // level 8
  short(m(SB, "derive-bias", "explain", 8, 180, "Derive $\\mathbb{E}[\\hat{\\beta} - \\beta] \\approx \\frac{\\sigma_{\\varepsilon\\eta}}{\\sigma_\\eta^2}\\mathbb{E}[\\hat{\\phi} - \\phi]$."),
    [
      ["projection", "Decomposes $\\varepsilon_{t+1} = \\frac{\\sigma_{\\varepsilon\\eta}}{\\sigma_\\eta^2}\\eta_{t+1} + v_{t+1}$ with $v$ independent of the $\\eta$'s", 2, true],
      ["errors", "Writes $\\hat{\\beta} - \\beta$ as an OLS of $\\varepsilon_{t+1}$ on $x_t$ and $\\hat{\\phi} - \\phi$ as an OLS of $\\eta_{t+1}$ on $x_t$", 2, true],
      ["expectation", "Takes expectations, using that the $v$ term has mean zero given the $x$'s", 1, true],
    ]),
  num(m(SB, "apply-horizon", "apply", 8, 70, "With one-period slope $\\beta = 0.1$ and predictor persistence $\\phi = 0.9$, the slope for the sum of the next $k$ returns is about $\\beta\\frac{1 - \\phi^k}{1 - \\phi}$. Find it for $k = 5$. Give $2$ decimal places."), 0.41),
  num(m(SB, "apply-half-life-98", "apply", 8, 70, "A monthly predictor has $\\phi = 0.98$. Find its half-life $\\frac{\\ln 0.5}{\\ln\\phi}$ in months. Give $2$ decimal places."), 34.31),
  mcq(m(SB, "apply-unit-root-predictor", "apply", 8, 70, "If the predictor had an exact unit root and returns were stationary with $\\beta = 0$, the OLS slope would:"),
    "Converge to $0$ quickly, but its $t$-statistic would have a nonstandard, shifted distribution",
    [
      ["Diverge", "unit-diverge", "Divergence is the spurious-regression case with two random walks."],
      ["Be unbiased with a normal $t$", "unit-normal", "The $t$-statistic is nonstandard when shocks are correlated."],
      ["Be undefined", "unit-undefined", "It can be computed."],
    ]),
  // level 9
  short(m(SB, "transfer-new-predictor", "transfer", 9, 180, "You discover a new valuation ratio that predicts monthly returns with $t = 2.8$ over $40$ years. Describe a full robustness protocol before trading it."),
    [
      ["bias", "Estimate persistence and the shock correlation; apply a Stambaugh correction or robust (Bonferroni Q / IVX) inference", 2, true],
      ["oos", "Out-of-sample $R^2$ against the historical mean, with rolling estimation", 2, true],
      ["multiple", "Adjust for how many predictors were tried (data mining)", 1, false],
    ]),
  short(m(SB, "transfer-economic", "transfer", 9, 180, "Even if the bias-corrected slope is significant, why might the predictability be useless for trading?"),
    [
      ["r2", "Out-of-sample $R^2$ may be tiny or negative, so portfolio gains are small", 2, true],
      ["costs", "Persistent predictors imply slow signals; turnover, costs and estimation risk can eat the gains", 2, true],
      ["stability", "Coefficients may be unstable across regimes", 1, false],
    ]),
  num(m(SB, "apply-bonferroni", "apply", 9, 80, "The Bonferroni Q-test splits a $5\\%$ test into a confidence interval for persistence and a test of $\\beta$, each at an equal share. What is each level?"), 0.025),
  mcq(m(SB, "apply-sign-reverse", "apply", 9, 80, "For a predictor whose innovations are positively correlated with return innovations, the Stambaugh bias in $\\hat{\\beta}$ is:"),
    "Downward",
    [
      ["Upward", "rev-up", "The bias has the sign of $-\\sigma_{\\varepsilon\\eta}$."],
      ["Zero", "rev-zero", "It is zero only when $\\sigma_{\\varepsilon\\eta} = 0$."],
      ["Always toward zero", "rev-zero-shrink", "The direction depends on the sign, not on $\\beta$."],
    ]),
  // level 10
  short(m(SB, "transfer-general", "transfer", 10, 200, "Give another setting in finance or economics where a regressor is predetermined but not strictly exogenous, and explain the resulting finite-sample bias."),
    [
      ["example", "A valid example: lagged dependent variable (dynamic panel / Nickell bias), lagged volatility predicting returns, or policy rates responding to past outcomes", 2, true],
      ["mechanism", "Explains that future regressor values respond to past errors", 2, true],
      ["bias", "States the bias is finite-sample (order $1/T$) and grows with persistence", 1, false],
    ]),
  short(m(SB, "transfer-simulation", "transfer", 10, 200, "Describe a simulation to obtain correct $p$-values for a predictive regression with a persistent predictor."),
    [
      ["null", "Simulate under $\\beta = 0$ with an AR(1) predictor and correlated shocks calibrated to the data", 2, true],
      ["distribution", "Re-estimate the regression in each simulated sample to build the null distribution of $\\hat{\\beta}$ or $t$", 2, true],
      ["pvalue", "Compare the actual statistic to that distribution (bootstrap residuals if errors are non-normal)", 1, false],
    ]),
  num(m(SB, "apply-local-c", "apply", 10, 90, "With $T = 600$ months and $\\phi = 0.99$, find the local-to-unity parameter $c = T(\\phi - 1)$."), -6),
  mcq(m(SB, "apply-correction-variance", "apply", 10, 90, "Applying the Stambaugh correction to $\\hat{\\beta}$:"),
    "Reduces bias but increases variance, because $\\hat{\\phi}$ and $\\hat{\\sigma}_{\\varepsilon\\eta}$ are estimated",
    [
      ["Removes bias at no cost", "corr-free", "The correction uses noisy estimates."],
      ["Reduces both bias and variance", "corr-both", "Estimated corrections add variance."],
      ["Changes only the standard error", "corr-se", "It changes the point estimate."],
    ]),
];

export const regressionGaps03Items: Item[] = [...unitRoots, ...stambaugh];
