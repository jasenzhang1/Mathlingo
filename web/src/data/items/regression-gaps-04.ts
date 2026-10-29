import type { Item } from "../../lib/assessment/types";
import { m, mcq, num, short } from "./regression-gaps-shared";

/**
 * Time-series gap lessons, part 4: Granger causality, and Fama–MacBeth
 * regression. Forty questions per lesson, four at each level from 1 to 10.
 */

// ---------------------------------------------------------------------------
// granger-causality
// ---------------------------------------------------------------------------
const GC = "granger-causality";
const granger: Item[] = [
  // level 1
  mcq(m(GC, "recall-definition", "recall", 1, 15, "$X$ Granger-causes $Y$ if:"),
    "Past values of $X$ improve forecasts of $Y$ beyond what past values of $Y$ provide",
    [
      ["Changing $X$ changes $Y$", "def-structural", "That is structural causation, which Granger causality does not establish."],
      ["$X$ and $Y$ are correlated", "def-correlation", "Contemporaneous correlation is not the criterion."],
      ["$Y$'s past predicts $X$", "def-reverse", "That is $Y$ Granger-causing $X$."],
    ]),
  mcq(m(GC, "recall-null", "recall", 1, 15, "In the regression $Y_t = c + \\sum_j a_j Y_{t-j} + \\sum_j\\delta_j X_{t-j} + e_t$, the null of no Granger causality is:"),
    "$\\delta_1 = \\dots = \\delta_k = 0$",
    [
      ["$a_1 = \\dots = a_k = 0$", "null-own", "Those are $Y$'s own lags."],
      ["$c = 0$", "null-intercept", "The intercept is irrelevant to causality."],
      ["$\\sum_j\\delta_j = 1$", "null-sum", "The null sets all lag coefficients of $X$ to zero."],
    ]),
  mcq(m(GC, "recall-stationary", "recall", 1, 15, "The standard Granger $F$-test in levels is valid when the series are:"),
    "Stationary",
    [
      ["Random walks", "stat-rw", "With unit roots the test has nonstandard limits."],
      ["Cointegrated", "stat-coint", "Then use the error-correction form."],
      ["Trending deterministically without detrending", "stat-trend", "Trends must be modeled."],
    ]),
  mcq(m(GC, "recall-not-causation", "recall", 1, 15, "Granger causality is best described as:"),
    "Incremental predictability, not proof of a causal mechanism",
    [
      ["Proof of causation", "notcause-proof", "Common drivers and timing can create it without causation."],
      ["A test of correlation", "notcause-corr", "It conditions on $Y$'s own past."],
      ["A test of cointegration", "notcause-coint", "That is a different question."],
    ]),
  // level 2
  num(m(GC, "apply-f-basic", "apply", 2, 20, "With $k = 2$ lags and $T = 105$ observations, $\\text{SSE}_R = 120$ and $\\text{SSE}_U = 110$. The denominator degrees of freedom are $T - 2k - 1$. Find the Granger $F$-statistic. Give $2$ decimal places."), 4.55),
  num(m(GC, "apply-numerator-df", "apply", 2, 20, "A Granger test uses $k = 4$ lags of $X$. What are the numerator degrees of freedom?"), 4),
  num(m(GC, "apply-denominator-df", "apply", 2, 20, "With $T = 200$ and $k = 3$ lags of each variable plus an intercept, find the denominator degrees of freedom $T - 2k - 1$."), 193),
  mcq(m(GC, "apply-both-ways", "apply", 2, 20, "To check for feedback, you should:"),
    "Test whether $X$ Granger-causes $Y$ and whether $Y$ Granger-causes $X$",
    [
      ["Test only $X \\to Y$", "both-one", "Feedback means both directions."],
      ["Test the correlation of $X$ and $Y$", "both-corr", "Correlation does not separate directions."],
      ["Difference both series twice", "both-diff", "Differencing does not test feedback."],
    ]),
  // level 3
  num(m(GC, "apply-f-one-lag", "apply", 3, 25, "With $k = 1$ lag, $T = 103$, $\\text{SSE}_R = 210$ and $\\text{SSE}_U = 200$, find the Granger $F$-statistic (denominator df $T - 2k - 1$)."), 5),
  num(m(GC, "apply-var-params", "apply", 3, 25, "A bivariate VAR($2$) with intercepts has how many coefficients in total (both equations)?"), 10),
  num(m(GC, "apply-toda", "apply", 3, 25, "Toda–Yamamoto: the chosen lag order is $k = 2$ and the maximum integration order is $d_{\\max} = 1$. How many lags do you fit in the levels VAR?"), 3),
  mcq(m(GC, "apply-lag-select", "apply", 3, 25, "The lag length for a Granger test is usually chosen by:"),
    "AIC or BIC on the unrestricted VAR",
    [
      ["Maximizing the $F$-statistic", "lag-max-f", "That is data snooping."],
      ["Always using one lag", "lag-one", "Too few lags can create spurious causality."],
      ["Matching the sample size", "lag-n", "That would exhaust the degrees of freedom."],
    ]),
  // level 4
  num(m(GC, "apply-f-three", "apply", 4, 35, "With $k = 3$, $T = 157$, $\\text{SSE}_R = 95$ and $\\text{SSE}_U = 90$, find the Granger $F$-statistic (denominator df $T - 2k - 1$). Give $2$ decimal places."), 2.78),
  num(m(GC, "apply-wald", "apply", 4, 35, "An $F$-statistic of $2.78$ tests $k = 3$ restrictions. The asymptotic $\\chi^2_3$ Wald statistic is about $kF$. Find it. Give $2$ decimal places."), 8.34),
  num(m(GC, "apply-vecm-lags", "apply", 4, 35, "A levels VAR has $3$ lags. How many lagged differences does the corresponding VECM have?"), 2),
  mcq(m(GC, "apply-instant", "apply", 4, 35, "$X$ affects $Y$ within the same day, and data are daily. A Granger test of $X \\to Y$ with lags $1, 2, \\dots$:"),
    "May find nothing, because the effect is contemporaneous",
    [
      ["Will always detect it", "instant-detect", "Granger tests only use lags."],
      ["Will find $Y \\to X$ instead", "instant-reverse", "Not necessarily; the effect is invisible to lags."],
      ["Is invalid", "instant-invalid", "It is valid, just blind to same-period effects."],
    ]),
  // level 5
  short(m(GC, "explain-common-driver", "explain", 5, 120, "Explain how a common driver can make $X$ Granger-cause $Y$ even though $X$ has no effect on $Y$. Give an example."),
    [
      ["mechanism", "A third variable $Z$ affects $X$ sooner than $Y$, so lagged $X$ carries information about future $Y$", 2, true],
      ["example", "Gives an example such as leading indicators and GDP, or analyst revisions and earnings", 2, true],
      ["fix", "Suggests including the common driver in the VAR", 1, false],
    ]),
  mcq(m(GC, "apply-few-lags", "apply", 5, 40, "Using too few lags of $Y$'s own past in a Granger test can:"),
    "Create spurious Granger causality, because lagged $X$ proxies for omitted $Y$ dynamics",
    [
      ["Only reduce power", "few-power", "It can also bias the test toward rejection."],
      ["Have no effect", "few-none", "Omitted own-lags are an omitted-variable problem."],
      ["Make the test conservative", "few-conservative", "It tends to over-reject."],
    ]),
  mcq(m(GC, "apply-coint-implies", "apply", 5, 40, "If two $I(1)$ series are cointegrated, then:"),
    "At least one must Granger-cause the other",
    [
      ["Neither Granger-causes the other", "coint-neither", "The error-correction term forces causality in at least one direction."],
      ["Both must Granger-cause each other", "coint-both", "One direction is enough."],
      ["Granger causality cannot be tested", "coint-untestable", "Test it in the VECM."],
    ]),
  num(m(GC, "apply-r2-f", "apply", 5, 40, "Adding $k = 2$ lags of $X$ raises $R^2$ from $0.30$ to $0.35$, with $100$ residual degrees of freedom in the unrestricted model. Find $F = \\frac{(R_U^2 - R_R^2)/k}{(1 - R_U^2)/100}$. Give $2$ decimal places."), 3.85),
  // level 6
  short(m(GC, "explain-unit-roots", "explain", 6, 150, "What goes wrong with a Granger $F$-test run in levels on $I(1)$ series, and how should you proceed?"),
    [
      ["nonstandard", "The test statistic has nonstandard limits (Sims–Stock–Watson), so $F$ critical values are invalid", 2, true],
      ["not-coint", "If not cointegrated, test in differences", 1, true],
      ["coint", "If cointegrated, test in the VECM (or use Toda–Yamamoto lag augmentation)", 2, true],
    ]),
  num(m(GC, "apply-proxy-coef", "apply", 6, 50, "$Z_t$ is i.i.d. with variance $1$. $X_t = Z_t + u_t$ with $\\text{Var}(u_t) = 1$, and $Y_t = Z_{t-1}$. What is the population slope of $Y_t$ on $X_{t-1}$?"), 0.5),
  num(m(GC, "apply-f-four", "apply", 6, 50, "With $k = 4$, $T = 209$, $\\text{SSE}_R = 50$ and $\\text{SSE}_U = 45$, find the Granger $F$-statistic (denominator df $T - 2k - 1$). Give $2$ decimal places."), 5.56),
  mcq(m(GC, "apply-conditional", "apply", 6, 50, "Conditional Granger causality adds a third variable $W$ to the VAR. If $X \\to Y$ disappears once $W$ is included, the likely story is:"),
    "$W$ drives both, and $X$ only anticipated $W$'s effect on $Y$",
    [
      ["$X$ causes $W$", "cond-x-w", "The test says nothing about that direction."],
      ["The original test was mis-sized", "cond-size", "The change reflects an omitted common driver."],
      ["$Y$ causes $X$", "cond-reverse", "That is a separate test."],
    ]),
  // level 7
  short(m(GC, "transfer-term-structure", "transfer", 7, 150, "Under the expectations hypothesis, which direction of Granger causality between long and short interest rates do you expect, and why?"),
    [
      ["direction", "The long rate (or the long–short spread) should Granger-cause future short rates", 2, true],
      ["reason", "Long yields embed market expectations of future short rates", 2, true],
      ["premia", "Notes deviations from the implied coefficients suggest time-varying term premia", 1, false],
    ]),
  num(m(GC, "apply-df-equation", "apply", 7, 60, "Each equation of a bivariate VAR($2$) with an intercept is estimated on $T = 100$ observations. How many residual degrees of freedom does each equation have?"), 95),
  num(m(GC, "apply-bonferroni", "apply", 7, 60, "You run Granger tests on $10$ pairs and want a familywise $5\\%$ level. What per-test level does Bonferroni give?"), 0.005),
  mcq(m(GC, "apply-reporting", "apply", 7, 60, "Data for $X$ are released a day before data for $Y$ describing the same period. A Granger test finds $X \\to Y$. The best reading is:"),
    "The result may reflect reporting timing rather than any economic effect",
    [
      ["$X$ causes $Y$", "report-causes", "Release timing alone can create precedence."],
      ["$Y$ causes $X$", "report-reverse", "Nothing suggests that."],
      ["The test is invalid", "report-invalid", "It is valid as a forecasting statement."],
    ]),
  // level 8
  short(m(GC, "explain-vecm-test", "explain", 8, 180, "In the VECM $\\Delta Y_t = \\alpha_Y(Y_{t-1} - \\beta X_{t-1}) + \\sum_j(\\phi_j\\Delta Y_{t-j} + \\psi_j\\Delta X_{t-j}) + e_t$, state the null of no Granger causality from $X$ to $Y$ and explain why the error-correction term matters."),
    [
      ["null", "$\\alpha_Y = 0$ and all $\\psi_j = 0$", 2, true],
      ["ec", "Even without $\\Delta X$ lags, $X_{t-1}$ enters through the error-correction term, so $\\alpha_Y \\ne 0$ means $X$ helps forecast $Y$", 2, true],
      ["standard", "Notes the test in the VECM has a standard $\\chi^2$ limit", 1, false],
    ]),
  num(m(GC, "apply-ec-effect", "apply", 8, 70, "In a VECM, $\\alpha_Y = -0.2$ and last period's disequilibrium $Y_{t-1} - \\beta X_{t-1}$ is $0.5$. What is the error-correction contribution to $\\mathbb{E}[\\Delta Y_t]$?"), -0.1),
  num(m(GC, "apply-ec-half-life", "apply", 8, 70, "If only $Y$ adjusts and $\\alpha_Y = -0.2$, the disequilibrium shrinks by the factor $0.8$ each period. Find its half-life $\\frac{\\ln 0.5}{\\ln 0.8}$. Give $2$ decimal places."), 3.11),
  mcq(m(GC, "apply-weak-exog", "apply", 8, 70, "In a cointegrated system, $\\alpha_X = 0$ means:"),
    "$X$ does not adjust to disequilibrium (it is weakly exogenous for the long-run parameters)",
    [
      ["The series are not cointegrated", "weak-not", "Cointegration needs only one nonzero adjustment speed."],
      ["$X$ Granger-causes nothing", "weak-nothing", "$X$ can still Granger-cause $Y$ through $\\alpha_Y$."],
      ["$Y$ does not adjust", "weak-y", "That is $\\alpha_Y = 0$."],
    ]),
  // level 9
  short(m(GC, "transfer-lead-lag", "transfer", 9, 180, "A futures price Granger-causes the cash price at the $1$-minute frequency. Is this a tradable signal? Discuss."),
    [
      ["mechanism", "Explains price discovery: futures react faster to information", 2, true],
      ["tradability", "Notes the lag may be too short to exploit after latency and costs, or due to stale cash quotes", 2, true],
      ["robustness", "Mentions checking at different frequencies and asynchronous trading effects", 1, false],
    ]),
  short(m(GC, "transfer-policy", "transfer", 9, 180, "A central bank raises rates whenever inflation is expected to rise. A Granger test finds that rate hikes predict higher inflation. Interpret."),
    [
      ["reverse", "The policy reacts to expected inflation, so rates carry information about future inflation", 2, true],
      ["not-causal", "This does not mean hikes cause inflation; the causal effect may even be negative", 2, true],
      ["identification", "Causal effects need identification (narrative shocks, structural VAR restrictions)", 1, false],
    ]),
  num(m(GC, "apply-vecm-restrictions", "apply", 9, 80, "In a VECM with $2$ lagged differences, how many restrictions does the null of no Granger causality from $X$ to $Y$ impose ($\\alpha_Y$ plus the lagged $\\Delta X$ coefficients)?"), 3),
  mcq(m(GC, "apply-instantaneous-var", "apply", 9, 80, "Contemporaneous correlation between the VAR residuals of $X$ and $Y$ indicates:"),
    "Same-period comovement that Granger tests do not assign a direction to",
    [
      ["That $X$ Granger-causes $Y$", "inst-granger", "Granger causality uses lagged terms."],
      ["Misspecification that must be removed", "inst-misspec", "It is normal and is the subject of structural identification."],
      ["Cointegration", "inst-coint", "Cointegration is about levels, not residual correlation."],
    ]),
  // level 10
  short(m(GC, "transfer-structural", "transfer", 10, 200, "Describe what extra assumptions a structural VAR adds to a reduced-form VAR to make causal statements, and why Granger tests alone cannot.") ,
    [
      ["identification", "Identifying restrictions on contemporaneous effects (recursive ordering, sign or long-run restrictions)", 2, true],
      ["shocks", "These define structural shocks whose effects (impulse responses) can be traced", 2, true],
      ["granger", "Granger tests only concern lagged predictability of the reduced form", 1, true],
    ]),
  short(m(GC, "transfer-sampling", "transfer", 10, 200, "How can temporal aggregation (e.g. moving from daily to monthly data) change Granger-causality conclusions?"),
    [
      ["hidden", "Effects within the aggregation interval become contemporaneous and disappear from lagged tests", 2, true],
      ["spurious", "Aggregation can also create spurious bidirectional causality", 2, true],
      ["advice", "Test at the frequency at which the mechanism operates", 1, false],
    ]),
  num(m(GC, "apply-proxy-r2", "apply", 10, 90, "$Z_t$ is i.i.d. with variance $1$, $X_t = Z_t + u_t$ and $Y_t = Z_{t-1} + v_t$ with $\\text{Var}(u_t) = \\text{Var}(v_t) = 1$, all independent. Find the population $R^2$ of $Y_t$ on $X_{t-1}$."), 0.25),
  mcq(m(GC, "apply-noise-direction", "apply", 10, 90, "Two series are driven by the same latent factor, but $X$ is measured with much less noise than $Y$. A Granger test is likely to find:"),
    "$X \\to Y$, because lagged $X$ is a cleaner measure of the shared factor",
    [
      ["$Y \\to X$", "noise-reverse", "The noisier series is the worse predictor."],
      ["No causality in either direction", "noise-none", "The cleaner series helps predict the noisier one."],
      ["Cointegration", "noise-coint", "That is a statement about levels and unit roots."],
    ]),
];

// ---------------------------------------------------------------------------
// fama-macbeth-regression
// ---------------------------------------------------------------------------
const FM = "fama-macbeth-regression";
const famaMacbeth: Item[] = [
  // level 1
  mcq(m(FM, "recall-procedure", "recall", 1, 15, "The Fama–MacBeth procedure estimates a risk premium by:"),
    "Running a cross-sectional regression each period and averaging the slopes over time",
    [
      ["Running one pooled regression on all observations", "proc-pooled", "That is pooled OLS."],
      ["Running one time-series regression per asset", "proc-ts", "That is the first pass that estimates betas."],
      ["Averaging returns across assets", "proc-average", "That gives the market return, not a premium."],
    ]),
  mcq(m(FM, "recall-se", "recall", 1, 15, "The Fama–MacBeth standard error of $\\hat{\\lambda}$ is computed from:"),
    "The time-series standard deviation of the period-by-period slopes, divided by $\\sqrt{T}$",
    [
      ["The cross-sectional residuals", "se-resid", "Those are correlated across assets."],
      ["The pooled OLS formula", "se-pooled", "That ignores cross-sectional correlation."],
      ["The standard deviation of returns", "se-returns", "The slopes, not returns, are averaged."],
    ]),
  mcq(m(FM, "recall-robust", "recall", 1, 15, "Fama–MacBeth standard errors are robust to:"),
    "Cross-sectional correlation of the residuals within each period",
    [
      ["Serial correlation of the slopes", "robust-serial", "That needs a Newey–West correction."],
      ["Errors in estimated betas", "robust-eiv", "That needs portfolios or the Shanken correction."],
      ["Firm effects persisting over time", "robust-firm", "That needs clustering by firm."],
    ]),
  mcq(m(FM, "recall-eiv", "recall", 1, 15, "Using estimated betas $\\hat{\\beta}_i$ in the cross-sectional regressions biases $\\hat{\\lambda}_1$:"),
    "Toward zero (attenuation)",
    [
      ["Away from zero", "eiv-away", "Classical measurement error attenuates."],
      ["Not at all", "eiv-none", "Estimated betas are noisy regressors."],
      ["Only in its standard error", "eiv-se", "The point estimate is biased too."],
    ]),
  // level 2
  num(m(FM, "apply-se", "apply", 2, 20, "Monthly slopes have standard deviation $3\\%$ over $T = 100$ months. Find the Fama–MacBeth standard error (in $\\%$)."), 0.3),
  num(m(FM, "apply-t", "apply", 2, 20, "The average slope is $0.6\\%$ with standard error $0.3\\%$. Find the $t$-statistic."), 2),
  num(m(FM, "apply-annualize", "apply", 2, 20, "A monthly risk premium is $0.5\\%$. What is it per year (in $\\%$, simple annualization)?"), 6),
  mcq(m(FM, "apply-slope-portfolio", "apply", 2, 20, "Each period's cross-sectional slope $\\hat{\\lambda}_{1,t}$ can be read as:"),
    "The return on a zero-cost portfolio with unit exposure to the characteristic",
    [
      ["The market return", "slope-market", "That is roughly the intercept plus average exposure times the slope."],
      ["A firm's beta", "slope-beta", "Betas are the regressors."],
      ["The risk-free rate", "slope-rf", "The intercept is closer to a zero-beta rate."],
    ]),
  // level 3
  num(m(FM, "apply-se-225", "apply", 3, 25, "Slopes have standard deviation $5\\%$ over $T = 225$ months. Find the standard error (in $\\%$). Give $2$ decimal places."), 0.33),
  num(m(FM, "apply-reliability", "apply", 3, 25, "True betas have cross-sectional variance $0.09$ and beta estimation error has variance $0.03$. Find the reliability ratio $\\frac{\\text{Var}(\\beta)}{\\text{Var}(\\beta) + \\text{Var}(\\xi)}$."), 0.75),
  num(m(FM, "apply-portfolio-noise", "apply", 3, 25, "Individual beta estimates have independent errors with variance $0.04$. What is the error variance of the average beta of a $100$-stock portfolio?"), 0.0004),
  mcq(m(FM, "apply-portfolio-cost", "apply", 3, 25, "The main cost of sorting stocks into beta portfolios before the second pass is:"),
    "Fewer cross-sectional observations and less dispersion in betas, so less precise slopes",
    [
      ["Higher beta estimation error", "pcost-error", "Portfolios reduce estimation error."],
      ["Biased slopes", "pcost-bias", "Portfolios reduce the bias."],
      ["Look-ahead bias by construction", "pcost-lookahead", "Sorting on pre-ranking betas avoids it."],
    ]),
  // level 4
  num(m(FM, "apply-attenuated", "apply", 4, 35, "The true premium is $0.6\\%$ and the reliability of estimated betas is $0.75$. Approximately what does Fama–MacBeth estimate (in $\\%$)?"), 0.45),
  num(m(FM, "apply-shanken-factor", "apply", 4, 35, "Shanken's variance multiplier is $1 + \\frac{\\lambda^2}{\\sigma_f^2}$. Find it for $\\lambda = 0.5$ and $\\sigma_f = 4$ (monthly $\\%$). Give $3$ decimal places."), 1.016),
  num(m(FM, "apply-shanken-t", "apply", 4, 35, "A naive Fama–MacBeth $t$-statistic is $2.5$. After a Shanken correction that multiplies the variance by $1.25$, what is the $t$-statistic? Give $2$ decimal places."), 2.24),
  mcq(m(FM, "apply-pooled-se", "apply", 4, 35, "Pooled OLS standard errors in a panel of monthly stock returns are usually:"),
    "Far too small, because returns in the same month share common shocks",
    [
      ["Too large", "pooled-large", "Ignoring positive within-period correlation understates variance."],
      ["Correct", "pooled-correct", "They assume independent observations."],
      ["Identical to Fama–MacBeth", "pooled-same", "Only the point estimates can coincide."],
    ]),
  // level 5
  short(m(FM, "explain-why-time-series", "explain", 5, 120, "Explain why the Fama–MacBeth standard error is computed from the time series of slopes rather than from the cross-sectional regressions' residuals."),
    [
      ["correlation", "Residuals within a period are correlated across assets (common shocks)", 2, true],
      ["absorb", "Each period's slope absorbs that dependence, so the slopes can be treated as $T$ roughly independent draws", 2, true],
      ["consequence", "Cross-sectional or pooled standard errors would be far too small", 1, false],
    ]),
  mcq(m(FM, "apply-equal-pooled", "apply", 5, 40, "Fama–MacBeth point estimates coincide with pooled OLS when:"),
    "The regressors (exposures) are the same every period",
    [
      ["The panel is balanced", "equal-balanced", "Balance alone is not enough if exposures change."],
      ["Returns are uncorrelated across assets", "equal-uncorr", "That affects standard errors, not the point estimates."],
      ["There are more assets than periods", "equal-n", "Dimensions do not matter here."],
    ]),
  mcq(m(FM, "apply-firm-effect", "apply", 5, 40, "A firm's residuals are positively correlated over time. Fama–MacBeth standard errors are then:"),
    "Too small; cluster by firm or use a two-way clustered estimator",
    [
      ["Correct", "firm-correct", "Fama–MacBeth handles cross-sectional, not time-series, dependence within firms."],
      ["Too large", "firm-large", "Positive correlation omitted means understated variance."],
      ["Undefined", "firm-undefined", "They can be computed."],
    ]),
  num(m(FM, "apply-nw-se", "apply", 5, 40, "The naive Fama–MacBeth standard error is $0.3\\%$, but the slopes are autocorrelated with a long-run variance $2$ times their variance. Find the Newey–West standard error (in $\\%$). Give $2$ decimal places."), 0.42),
  // level 6
  short(m(FM, "explain-portfolios", "explain", 6, 150, "Explain how sorting stocks into portfolios by pre-ranking beta reduces the errors-in-variables problem, and why the sort must use pre-ranking (not post-ranking) betas."),
    [
      ["averaging", "Portfolio betas average out idiosyncratic estimation error, raising reliability", 2, true],
      ["spread", "Sorting on beta preserves cross-sectional spread in betas", 1, true],
      ["prerank", "Using betas from a separate (earlier) window avoids sorting on the estimation error itself", 2, true],
    ]),
  num(m(FM, "apply-t-five", "apply", 6, 50, "Five monthly slopes are $1$, $-2$, $3$, $0$ and $3$ ($\\%$). Find the Fama–MacBeth $t$-statistic (sample SD with $T - 1$). Give $2$ decimal places."), 1.05),
  num(m(FM, "apply-se-five", "apply", 6, 50, "For the five slopes $1$, $-2$, $3$, $0$ and $3$, find the Fama–MacBeth standard error. Give $2$ decimal places."), 0.95),
  mcq(m(FM, "apply-intercept-bias", "apply", 6, 50, "Attenuation of the slope on estimated betas also biases the cross-sectional intercept $\\hat{\\lambda}_0$:"),
    "Upward, because the line through the average return flattens",
    [
      ["Downward", "int-down", "A flatter line through the same centroid has a higher intercept."],
      ["Not at all", "int-none", "Slope and intercept estimates are linked."],
      ["Toward the risk-free rate", "int-rf", "It moves away from the zero-beta rate."],
    ]),
  // level 7
  short(m(FM, "transfer-shanken", "transfer", 7, 150, "Explain what the Shanken correction fixes in Fama–MacBeth inference and when it matters most."),
    [
      ["first-pass", "The betas are estimated in a first pass, and naive standard errors ignore that error", 2, true],
      ["formula", "Variance is scaled by $1 + \\boldsymbol{\\lambda}^T\\boldsymbol{\\Sigma}_f^{-1}\\boldsymbol{\\lambda}$ plus a factor-variance term", 2, true],
      ["when", "Matters most when factor Sharpe ratios are large", 1, false],
    ]),
  num(m(FM, "apply-intercept-shift", "apply", 7, 60, "The true slope is $0.6$, Fama–MacBeth estimates $0.45$, and the average beta is $1$. By how much is the intercept biased upward?"), 0.15),
  num(m(FM, "apply-shanken-se", "apply", 7, 60, "A factor's squared Sharpe ratio is $0.25$. By what factor does the Shanken correction scale the standard error, $\\sqrt{1 + 0.25}$? Give $2$ decimal places."), 1.12),
  mcq(m(FM, "apply-characteristics", "apply", 7, 60, "When the regressors are observed characteristics (e.g. book-to-market) rather than estimated betas:"),
    "The errors-in-variables problem from a first pass disappears",
    [
      ["The Shanken correction is still needed", "char-shanken", "There is no first-pass estimation."],
      ["Fama–MacBeth cannot be used", "char-cannot", "It is widely used with characteristics."],
      ["Standard errors no longer matter", "char-se", "Inference still matters."],
    ]),
  // level 8
  short(m(FM, "derive-equal-pooled", "explain", 8, 180, "Show that with time-invariant exposures $\\mathbf{B}$, the average of period-by-period OLS slopes equals the pooled OLS slope."),
    [
      ["linear", "Each $\\hat{\\boldsymbol{\\lambda}}_t = (\\mathbf{B}^T\\mathbf{B})^{-1}\\mathbf{B}^T\\mathbf{r}_t$ is linear in $\\mathbf{r}_t$ with the same matrix", 2, true],
      ["average", "Averaging gives $(\\mathbf{B}^T\\mathbf{B})^{-1}\\mathbf{B}^T\\bar{\\mathbf{r}}$", 2, true],
      ["pooled", "Pooled OLS on stacked data gives the same expression", 1, true],
    ]),
  num(m(FM, "apply-reliability-est", "apply", 8, 70, "Estimated betas have cross-sectional variance $0.12$, of which $0.03$ is estimation error. Find the reliability ratio."), 0.75),
  num(m(FM, "apply-corrected-lambda", "apply", 8, 70, "Fama–MacBeth gives $\\hat{\\lambda} = 0.45$ with reliability ratio $0.75$. Find the errors-in-variables-corrected premium."), 0.6),
  mcq(m(FM, "apply-rolling-beta", "apply", 8, 70, "Using betas estimated over the same months as the cross-sectional regressions (instead of earlier months) risks:"),
    "Correlation between beta estimation error and returns, biasing the slope",
    [
      ["Nothing, since betas are just regressors", "roll-nothing", "The error is mechanically linked to the same returns."],
      ["Only larger standard errors", "roll-se", "It can bias the point estimate."],
      ["Smaller attenuation with no downside", "roll-free", "Same-window betas create look-ahead problems."],
    ]),
  // level 9
  short(m(FM, "transfer-design", "transfer", 9, 180, "Design a Fama–MacBeth test of whether a new characteristic earns a premium beyond size and value, listing the standard-error choices you would make."),
    [
      ["regression", "Monthly cross-sectional regressions of returns on the characteristic plus size and value controls", 2, true],
      ["se", "Newey–West on the slope series if persistent; clustering or two-way robust SEs as a check", 2, true],
      ["data", "Point-in-time data and the full universe including delisted stocks", 1, false],
    ]),
  short(m(FM, "transfer-weighting", "transfer", 9, 180, "Fama–MacBeth weights every stock equally in each cross-section. Why might that mislead, and what alternatives exist?"),
    [
      ["microcaps", "Tiny, illiquid stocks dominate the count and can drive the premium", 2, true],
      ["alternatives", "Use value weights (WLS), drop microcaps, or test with value-weighted portfolios", 2, true],
      ["economic", "Checks whether the premium is economically tradable", 1, false],
    ]),
  num(m(FM, "apply-count", "apply", 9, 80, "How many monthly cross-sectional regressions does a $50$-year sample produce?"), 600),
  mcq(m(FM, "apply-gls-cs", "apply", 9, 80, "Running the cross-sectional regressions by GLS (using the residual covariance) instead of OLS:"),
    "Can be more efficient, but the estimated covariance is noisy when there are many assets",
    [
      ["Is always worse", "gls-worse", "With a good covariance estimate it is more efficient."],
      ["Removes errors in variables", "gls-eiv", "It does not fix noisy betas."],
      ["Gives identical estimates", "gls-identical", "Weights change the estimates."],
    ]),
  // level 10
  short(m(FM, "transfer-survivorship", "transfer", 10, 200, "A Fama–MacBeth study uses only stocks that survived to the end of the sample. Explain how this biases the estimated premium on a profitability characteristic."),
    [
      ["selection", "Survival depends on returns, so surviving stocks had better-than-expected returns", 2, true],
      ["correlation", "If the characteristic also predicts survival, the selection term loads on it and biases the slope", 2, true],
      ["fix", "Use the full point-in-time universe with delisting returns, or model selection explicitly", 1, false],
    ]),
  short(m(FM, "transfer-time-varying", "transfer", 10, 200, "Should Fama–MacBeth use the average premium or look at its variation over time? Discuss what the time series of $\\hat{\\lambda}_t$ can tell you."),
    [
      ["average", "The average tests whether the premium is nonzero on average", 1, true],
      ["variation", "The series shows regime dependence, decay after publication, and correlation with market conditions", 2, true],
      ["tests", "Suggests subsample tests, rolling averages, or regressing $\\hat{\\lambda}_t$ on state variables", 2, true],
    ]),
  num(m(FM, "apply-sharpe", "apply", 10, 90, "A characteristic's monthly slopes average $0.4\\%$ with standard deviation $2\\%$. Find the annualized Sharpe ratio of the implied zero-cost portfolio, $\\frac{0.4}{2}\\sqrt{12}$. Give $2$ decimal places."), 0.69),
  mcq(m(FM, "apply-two-pass-vs-ts", "apply", 10, 90, "For traded factors, a time-series regression test (testing whether intercepts are zero) differs from the Fama–MacBeth cross-sectional test in that:"),
    "It imposes that the factor premium equals the factor's average excess return",
    [
      ["It does not need factor betas", "ts-betas", "It estimates betas in each time-series regression."],
      ["It is always less powerful", "ts-power", "With traded factors it uses the restriction efficiently."],
      ["It cannot test pricing errors", "ts-alpha", "The intercepts are the pricing errors."],
    ]),
];

export const regressionGaps04Items: Item[] = [...granger, ...famaMacbeth];
