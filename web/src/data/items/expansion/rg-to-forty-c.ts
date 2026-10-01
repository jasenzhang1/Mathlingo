import type { Item } from "../../../lib/assessment/types";
import { makeBuilders } from "../authoring";
import { EXPANSION } from "./source";

/**
 * Linear Models to 40: regression diagnostics — leverage and influence,
 * studentized residuals, partial residual plots, heteroskedasticity and
 * autocorrelation tests, normal plots, Box–Cox, case deletion, collinearity,
 * misspecification, robustness of the F test and errors in variables.
 */
const { mcq, short, num } = makeBuilders(EXPANSION);

const s = (concept: string, slug: string, level: number, stem: string, a: string, b: string) =>
  short({ concept, slug, cognitive: level >= 8.5 ? "transfer" : "explain", level, seconds: level >= 9 ? 300 : 180, stem },
    [["main", a, 5, true], ["detail", b, 4, true]]);
const n = (concept: string, slug: string, level: number, stem: string, key: number, tol = 0.01) =>
  num({ concept, slug, cognitive: "apply", level, seconds: level >= 7 ? 90 : level >= 4 ? 60 : 30, stem }, key, tol);
const m = (concept: string, slug: string, level: number, stem: string, right: string, wrong: [string, string][]) =>
  mcq({ concept, slug, cognitive: level <= 3 ? "recall" : "apply", level, seconds: 25, stem },
    right, wrong.map(([t, why], i) => [t, `${concept}-${slug}-${i}`, why] as [string, string, string]));

const OL = "outliers-leverage-influence";
const SR = "studentized-residuals";
const PR = "partial-residual-plots";
const HT = "heteroskedasticity-tests";
const DW = "durbin-watson-test";
const NP = "normal-probability-plots";
const BC = "box-cox-transformation";
const CD = "case-deletion-diagnostics";
const CE = "collinearity-eigenanalysis";
const MB = "misspecification-bias";
const RF = "robustness-of-f-test";
const EV = "errors-in-variables";

export const rgToFortyCItems: Item[] = [
  // --- outliers-leverage-influence ---------------------------------------
  m(OL, "f40-depends", 1.5, "An observation's leverage $h_{ii}$ depends on:", "Only its predictor values, not its response",
    [["Only its response", "Leverage ignores $y$."], ["Its residual", "Residuals use $y$; leverage doesn't."], ["Both $x$ and $y$ equally", "Only $x$."]]),
  n(OL, "f40-sum", 2.5, "A model has $p = 4$ parameters (including the intercept). What is the sum of all leverages?", 4, 0.001),
  n(OL, "f40-simple", 3, "Simple regression with $n = 10$, $\\bar{x} = 5$, $S_{xx} = 40$. What is the leverage of a point at $x = 9$, $1/n + (x - \\bar{x})^2/S_{xx}$?", 0.5, 0.001),
  m(OL, "f40-range", 4, "In a model with an intercept, each leverage lies in:", "$[1/n, 1]$",
    [["$[0, 1/n]$", "With an intercept, the minimum is $1/n$."], ["$[0, p]$", "Leverages are at most $1$."], ["$(-1, 1)$", "They're non-negative."]]),
  n(OL, "f40-cutoff", 4.5, "Using the stricter leverage cutoff $3p/n$, what is it for $p = 3$ and $n = 60$?", 0.15, 0.001),
  m(OL, "f40-pull", 5, "A high-leverage point lying off the trend of the others usually:", "Pulls the line towards itself, so its own residual looks deceptively small",
    [["Has the largest raw residual", "It drags the fit towards itself."], ["Doesn't affect the fit", "It can dominate it."], ["Only affects the intercept", "It mainly affects the slope."]]),
  n(OL, "f40-mahal", 5.5, "Leverage relates to Mahalanobis distance by $h_{ii} = 1/n + \\mathrm{MD}_i^2/(n - 1)$. With $n = 51$ and $\\mathrm{MD}_i^2 = 10$, what is $h_{ii}$ (to $4$ decimals)?", 0.2196, 0.002),
  n(OL, "f40-cook", 6.5, "Cook's $D_i = \\frac{r_i^2}{p}\\cdot\\frac{h_{ii}}{1 - h_{ii}}$ with $r_i = 2$, $p = 2$ and $h_{ii} = 0.5$. What is $D_i$?", 2, 0.001),
  s(OL, "f40-glm", 8, "How is leverage defined in logistic regression, and why can an extreme-$x$ point have low leverage there?",
    "Leverage comes from the weighted hat matrix $W^{1/2}X(X^\\top WX)^{-1}X^\\top W^{1/2}$ with $w_i = \\hat{p}_i(1 - \\hat{p}_i)$.",
    "A point with extreme $x$ often has $\\hat{p}_i$ near $0$ or $1$, so its weight — and hence its leverage — is small, even though it's far out in predictor space."),
  s(OL, "f40-robust-dist", 9, "Why can classical leverage miss a cluster of high-leverage points, and how do robust distances help?",
    "A cluster of outlying $x$ values inflates the sample mean and covariance used in leverage/Mahalanobis distance, masking each other.",
    "Robust estimates of location and scatter (e.g. minimum covariance determinant) aren't pulled by the cluster, so robust distances flag all of its members."),

  // --- studentized-residuals ---------------------------------------------
  m(SR, "f40-unequal", 1.5, "Raw least-squares residuals have unequal variances because:", "$\\operatorname{Var}(e_i) = \\sigma^2(1 - h_{ii})$ depends on leverage",
    [["The errors have unequal variances", "Even with equal error variances."], ["Residuals are independent", "They're correlated, but that's not why."], ["The intercept is estimated", "Not the full reason."]]),
  n(SR, "f40-sd", 2.5, "$\\sigma^2 = 4$ and $h_{ii} = 0.36$. What is the standard deviation of $e_i$?", 1.6, 0.001),
  n(SR, "f40-ri", 3.5, "$e_i = 2$, $s = 1$, $h_{ii} = 0.36$. What is the internally studentized residual?", 2.5, 0.001),
  n(SR, "f40-ti", 4.5, "$r_i = 2.5$ and $n - p = 30$. Using $t_i = r_i\\sqrt{\\frac{n - p - 1}{n - p - r_i^2}}$, what is $t_i$ (to $3$ decimals)?", 2.763, 0.002),
  m(SR, "f40-meanshift", 5, "The externally studentized residual $t_i$ is the $t$ statistic for:", "A dummy variable that is $1$ for case $i$ and $0$ otherwise, added to the model",
    [["The slope of $y$ on $x$", "No."], ["The intercept", "No."], ["The leverage of case $i$", "Leverage isn't tested."]]),
  n(SR, "f40-expected3", 5.5, "Among $1000$ observations with normal errors, about how many have $|t_i| > 3$ by chance ($P(|Z| > 3) = 0.0027$)?", 2.7, 0.01),
  m(SR, "f40-leverage", 6, "Studentizing a high-leverage point's residual:", "Inflates it, since its raw residual is deflated by $\\sqrt{1 - h_{ii}}$",
    [["Shrinks it", "Dividing by $\\sqrt{1 - h_{ii}} < 1$ enlarges it."], ["Leaves it unchanged", "Only if $h_{ii} = 0$."], ["Makes it zero", "No."]]),
  n(SR, "f40-s-del", 6.5, "$n - p = 25$, $s^2 = 3$, $e_i = 4$, $h_{ii} = 0.2$. Using $(n - p - 1)s_{(i)}^2 = (n - p)s^2 - e_i^2/(1 - h_{ii})$, what is $s_{(i)}^2$ (to $4$ decimals)?", 2.2917, 0.002),
  s(SR, "f40-procedure", 7.5, "Describe a formal outlier test using externally studentized residuals.",
    "Compute $t_i$ for every case; under the null each is $t_{n - p - 1}$, and the most extreme $|t_i|$ is compared with a Bonferroni-adjusted critical value $t_{n - p - 1}^{\\alpha/(2n)}$.",
    "A rejection identifies a candidate outlier to investigate (data error, special case) rather than an automatic deletion; check its leverage and influence too."),
  s(SR, "f40-bound", 9, "Show that internally studentized residuals satisfy $|r_i| \\le \\sqrt{n - p}$, and name the distribution of $r_i^2/(n - p)$.",
    "The deletion identity $(n - p)s^2 = (n - p - 1)s_{(i)}^2 + e_i^2/(1 - h_{ii})$ gives $(n - p)s^2 \\ge e_i^2/(1 - h_{ii})$, so $r_i^2 = \\frac{e_i^2}{s^2(1 - h_{ii})} \\le n - p$.",
    "Under normal errors $r_i^2/(n - p) \\sim \\mathrm{Beta}(1/2, (n - p - 1)/2)$, so $r_i$ isn't $t$-distributed — one reason the external version is preferred."),

  // --- partial-residual-plots --------------------------------------------
  m(PR, "f40-avp", 1.5, "An added-variable (partial regression) plot for $x_j$ shows:", "Residuals of $y$ on the other predictors against residuals of $x_j$ on the other predictors",
    [["$y$ against $x_j$", "That's a raw scatterplot."], ["Partial residuals against $x_j$", "That's a component-plus-residual plot."], ["Residuals against fitted values", "That's a residual plot."]]),
  n(PR, "f40-pr", 2.5, "$e_i = 1.5$, $\\hat{\\beta}_j = -1$, $x_{ij} = 2$. What is the partial residual $e_i + \\hat{\\beta}_jx_{ij}$?", -0.5, 0.001),
  n(PR, "f40-avp-slope", 3.5, "In an added-variable plot, the sum of products of the two residual sets is $12$ and the sum of squares of the $x$-residuals is $4$. What is the slope?", 3, 0.001),
  m(PR, "f40-avp-resid", 4, "The residuals around the line in an added-variable plot equal:", "The full-model residuals",
    [["The residuals of $y$ on $x_j$ alone", "No."], ["The partial residuals", "Different quantity."], ["Zero", "No."]]),
  m(PR, "f40-ceres", 4.5, "CERES plots improve on partial residual plots when:", "The predictors are nonlinearly related to each other",
    [["There's only one predictor", "Then a scatterplot suffices."], ["The errors are normal", "Not the issue."], ["The sample is huge", "Not the issue."]]),
  m(PR, "f40-collinear", 5.5, "In an added-variable plot, the $x$-residuals span a tiny range. This means:", "$x_j$ is nearly collinear with the other predictors, so $\\hat{\\beta}_j$ is poorly determined",
    [["$x_j$ has a huge effect", "The range says nothing about size."], ["The model fits perfectly", "No."], ["$x_j$ should be squared", "That's a curvature question."]]),
  n(PR, "f40-curve", 6, "Partial residuals at $x_j = 1, 2, 3$ are $2, 5, 10$. What is the middle value minus the average of the two ends (a curvature check)?", -1, 0.001),
  m(PR, "f40-interaction", 6.5, "If $x_j$'s effect depends on another predictor (an interaction), a partial residual plot for $x_j$:", "May not reveal it, because it assumes the model is additive",
    [["Always shows two clear lines", "Not unless you colour by the other predictor."], ["Shows a perfect straight line", "No."], ["Is identical to the AV plot", "Different plots."]]),
  s(PR, "f40-workflow", 7.5, "Describe how you would diagnose and fix nonlinearity in one predictor using a partial residual plot.",
    "Plot $e + \\hat{\\beta}_jx_j$ against $x_j$ with a smoother; curvature away from the fitted line suggests the wrong functional form.",
    "Replace $x_j$ with a transformation or spline (e.g. $\\log x_j$ or natural cubic spline), refit, and redraw the plot to confirm the pattern is gone without overfitting."),
  s(PR, "f40-fwl", 8.5, "Show that the slope of the added-variable plot is $\\hat{\\beta}_j$ and its residuals are the full-model residuals.",
    "By Frisch–Waugh–Lovell, regressing $M_{-j}y$ on $M_{-j}x_j$ (residuals after projecting out the other predictors) gives exactly the full-model coefficient $\\hat{\\beta}_j$.",
    "Its residuals are $M_{-j}y - \\hat{\\beta}_jM_{-j}x_j = M_{-j}(y - X\\hat{\\beta}) = e$, since the full residuals are already orthogonal to the other predictors."),

  // --- heteroskedasticity-tests ------------------------------------------
  m(HT, "f40-def", 1.5, "Heteroskedasticity means:", "The error variance changes across observations",
    [["The errors are correlated", "That's autocorrelation."], ["The errors aren't normal", "Different issue."], ["The mean is nonlinear", "Different issue."]]),
  n(HT, "f40-koenker", 2.5, "Koenker's statistic $nR^2$ with $n = 150$ and auxiliary $R^2 = 0.06$. What is it?", 9, 0.001),
  n(HT, "f40-reject", 3.5, "A heteroskedasticity test on $1$ df gives $5.2$; the $5\\%$ critical value is $3.84$. Enter $1$ to reject, $0$ otherwise.", 1, 0.001),
  m(HT, "f40-ols", 4, "Under heteroskedasticity with a correct mean model, OLS coefficient estimates are:", "Unbiased but inefficient, and the usual standard errors are wrong",
    [["Biased", "Unbiasedness holds."], ["Efficient", "WLS would be more efficient."], ["Unchanged in every respect", "Inference is affected."]]),
  n(HT, "f40-hc0", 4.5, "Simple regression: deviations $x_i - \\bar{x} = (-1, 0, 1)$ and residuals $e = (2, 1, -2)$. The HC0 slope variance is $\\sum(x_i - \\bar{x})^2e_i^2/S_{xx}^2$. What is it?", 2, 0.001),
  n(HT, "f40-hc1", 5.5, "HC1 multiplies HC0 by $n/(n - p)$. With $n = 20$ and $p = 2$, what is the factor (to $4$ decimals)?", 1.1111, 0.002),
  m(HT, "f40-glejser", 6, "Glejser's test regresses:", "The absolute residuals $|e_i|$ on the predictors",
    [["$e_i^2$ on fitted values only", "That's closer to BP."], ["$y$ on $x$", "That's the main model."], ["Lagged residuals", "That's for autocorrelation."]]),
  n(HT, "f40-wls", 6.5, "If $\\operatorname{Var}(\\varepsilon_i) \\propto x_i$, the WLS weight is $1/x_i$. What is the weight at $x = 4$ relative to $x = 1$?", 0.25, 0.001),
  s(HT, "f40-mean-first", 7.5, "Why can an apparently significant heteroskedasticity test be caused by a misspecified mean model?",
    "Omitted curvature or interactions leave systematic structure in the residuals; squared residuals then grow where the mean is badly fit, mimicking non-constant variance.",
    "Fix the mean model first (residual plots, partial residuals), then test variance; otherwise you may weight or transform to treat a symptom of the wrong model."),
  s(HT, "f40-hc3", 9, "What is the HC3 covariance estimator, and why is it preferred in small samples?",
    "HC3 scales each squared residual by $1/(1 - h_{ii})^2$: $\\widehat{V} = (X^\\top X)^{-1}X^\\top\\mathrm{diag}(e_i^2/(1 - h_{ii})^2)X(X^\\top X)^{-1}$.",
    "Raw residuals are shrunk at high-leverage points, so HC0 underestimates variance; HC3 approximates the jackknife and gives better small-sample coverage."),

  // --- durbin-watson-test ------------------------------------------------
  m(DW, "f40-order", 1.5, "The Durbin–Watson statistic is computed from:", "Residuals in time (or observation) order",
    [["Residuals sorted by size", "Order matters; sorting destroys it."], ["The predictors only", "No."], ["Fitted values", "No."]]),
  n(DW, "f40-neg", 2.5, "The residual lag-$1$ autocorrelation is $-0.3$. Approximate $d \\approx 2(1 - \\hat{\\rho})$.", 2.6, 0.001),
  n(DW, "f40-compute", 3.5, "Residuals in order are $2, 1, 0, -1$. What is $d = \\sum(e_t - e_{t-1})^2/\\sum e_t^2$?", 0.5, 0.001),
  m(DW, "f40-se", 4, "With positively autocorrelated errors and a trending regressor, OLS standard errors are typically:", "Too small, overstating significance",
    [["Too large", "Usually understated."], ["Correct", "Not with autocorrelation."], ["Exactly zero", "No."]]),
  n(DW, "f40-co", 4.5, "Cochrane–Orcutt transforms $y_t^* = y_t - \\rho y_{t-1}$. With $y_1 = 10$, $y_2 = 12$ and $\\rho = 0.5$, what is $y_2^*$?", 7, 0.001),
  m(DW, "f40-depends-x", 5, "The Durbin–Watson statistic's exact null distribution:", "Depends on the design matrix, which is why bounds or computed $p$-values are used",
    [["Is standard normal", "No."], ["Doesn't depend on anything", "It depends on $X$."], ["Is $\\chi^2_1$", "No."]]),
  n(DW, "f40-ess", 5.5, "AR($1$) errors with $\\rho = 0.5$: the effective sample size for a mean of $n = 100$ is about $n(1 - \\rho)/(1 + \\rho)$. What is it (to $2$ decimals)?", 33.33, 0.002),
  n(DW, "f40-bg", 6.5, "The Breusch–Godfrey LM test uses $nR^2$ from regressing residuals on regressors and lagged residuals. With $n = 80$ and $R^2 = 0.1$, what is it?", 8, 0.001),
  s(DW, "f40-seasonal", 7.5, "Why does the Durbin–Watson test have low power for quarterly data with seasonal (lag-4) correlation, and what should you do?",
    "DW only measures lag-$1$ correlation, so dependence at lag $4$ with little lag-$1$ structure leaves $d$ near $2$.",
    "Use the Breusch–Godfrey test with lags up to $4$, or the Wallis lag-$4$ DW variant, and inspect the residual ACF."),
  s(DW, "f40-misspec", 8.5, "Explain how a misspecified mean model can produce a low Durbin–Watson statistic even when the true errors are independent.",
    "If a trend or curvature is omitted, residuals contain a smooth systematic component, so neighbouring residuals have the same sign — positive lag-$1$ correlation.",
    "So low $d$ can signal the wrong functional form; check residuals against time and predictors and fix the mean before modelling autocorrelation."),

  // --- normal-probability-plots ------------------------------------------
  m(NP, "f40-axis", 1.5, "On a normal probability plot, the theoretical axis shows:", "Expected standard normal quantiles for each rank",
    [["The observation indices", "That's an index plot."], ["Fitted values", "That's a residual plot."], ["Uniform quantiles", "Those make a uniform QQ plot."]]),
  n(NP, "f40-pos", 2.5, "Plotting position $(i - 0.5)/n$ for the $4$th smallest of $n = 8$. What is it?", 0.4375, 0.001),
  n(NP, "f40-quantile", 3, "What is the standard normal quantile $\\Phi^{-1}(0.8413)$?", 1, 0.003),
  n(NP, "f40-blom", 4, "Blom's position $(i - 3/8)/(n + 1/4)$ for $i = 5$, $n = 10$. What is it (to $4$ decimals)?", 0.4512, 0.002),
  m(NP, "f40-intercept", 4.5, "On a normal QQ plot of a sample, the intercept of the fitted line estimates:", "The mean (location)",
    [["The variance", "The slope estimates the SD."], ["The median absolute deviation", "No."], ["The skewness", "No."]]),
  m(NP, "f40-discrete", 5, "Rounded or discrete responses typically show on a normal plot as:", "Horizontal runs of points (plateaus or steps)",
    [["A perfect line", "Ties create plateaus."], ["An S-shape", "That's tail behaviour."], ["One isolated point", "That's an outlier."]]),
  n(NP, "f40-sf", 5.5, "The correlation between ordered residuals and normal scores is $0.98$. What is the Shapiro–Francia-type statistic $r^2$?", 0.9604, 0.001),
  m(NP, "f40-mixture", 6, "Normal errors with unequal variances (heteroskedasticity) can make a residual normal plot look:", "Heavy-tailed, because a mixture of normals with different spreads has heavy tails",
    [["Perfectly straight", "Mixtures distort it."], ["Light-tailed", "The opposite."], ["Skewed left always", "Not necessarily skewed."]]),
  s(NP, "f40-raw-y", 7, "Why is a normal probability plot of the raw response $y$, rather than of residuals, misleading in regression?",
    "Normality is assumed for the errors given $x$, not for $y$ marginally; $y$ mixes distributions with different means.",
    "A skewed or multimodal $y$ can come from the predictors' distribution even with perfectly normal errors, so only residuals (ideally studentized) test the assumption."),
  s(NP, "f40-daniel", 8.5, "How is a half-normal plot used to identify active effects in an unreplicated factorial design?",
    "Plot the absolute estimated effects against half-normal quantiles; inactive effects estimate pure noise and fall on a line through the origin.",
    "Effects that sit well above that line are judged active (Daniel's method), substituting for an error estimate when there are no replicates."),

  // --- box-cox-transformation --------------------------------------------
  m(BC, "f40-lam1", 1.5, "In the Box–Cox family, $\\lambda = 1$ corresponds to:", "No real transformation (just $y - 1$)",
    [["The log", "That's $\\lambda = 0$."], ["The reciprocal", "That's $\\lambda = -1$."], ["The square root", "That's $\\lambda = 0.5$."]]),
  n(BC, "f40-sqrt", 2.5, "Compute $(y^\\lambda - 1)/\\lambda$ for $y = 16$, $\\lambda = 0.5$.", 6, 0.001),
  n(BC, "f40-log", 3.5, "Compute the Box–Cox transform of $y = e^2$ at $\\lambda = 0$.", 2, 0.001),
  n(BC, "f40-square", 4, "Compute $(y^\\lambda - 1)/\\lambda$ for $y = 2$, $\\lambda = 2$.", 1.5, 0.001),
  m(BC, "f40-recip", 4.5, "$\\lambda = -1$ corresponds to:", "A reciprocal transformation",
    [["A log", "That's $\\lambda = 0$."], ["A square", "That's $\\lambda = 2$."], ["No change", "That's $\\lambda = 1$."]]),
  n(BC, "f40-lrt", 5, "Profile log-likelihoods: $\\ell(\\hat{\\lambda}) = -80$ and $\\ell(1) = -83$. What is the likelihood-ratio statistic for $H_0: \\lambda = 1$?", 6, 0.001),
  m(BC, "f40-yj", 5.5, "The Yeo–Johnson transformation extends Box–Cox by:", "Allowing zero and negative responses",
    [["Requiring positive data", "That's Box–Cox."], ["Transforming predictors only", "No."], ["Fixing $\\lambda = 0$", "No."]]),
  n(BC, "f40-normalised", 6.5, "Normalised transform $(y^\\lambda - 1)/(\\lambda\\dot{y}^{\\lambda - 1})$ with $y = 9$, $\\lambda = 0.5$ and geometric mean $\\dot{y} = 4$. What is it?", 8, 0.001),
  s(BC, "f40-x-or-y", 7.5, "Contrast transforming the response (Box–Cox) with transforming a predictor. What does each fix?",
    "Transforming $y$ changes the error structure and the mean simultaneously — it targets non-constant variance and skewed errors as well as curvature.",
    "Transforming $x$ (e.g. Box–Tidwell, splines) only changes the shape of the mean function and leaves the error distribution alone, so it's preferred when variance looks fine."),
  s(BC, "f40-inference", 9, "Why are confidence intervals for $\\beta$ computed after choosing $\\lambda$ from the data optimistic, and what was the Bickel–Doksum debate?",
    "Treating $\\hat{\\lambda}$ as known ignores its uncertainty; because $\\beta$'s scale depends on $\\lambda$, its variance can be badly understated.",
    "Bickel and Doksum showed huge variance inflation when $\\lambda$ is estimated; Box and Cox replied that $\\beta$ is only meaningful on a fixed scale, so one should round $\\lambda$ to an interpretable value and condition on it."),

  // --- case-deletion-diagnostics -----------------------------------------
  m(CD, "f40-dffits", 1.5, "DFFITS for case $i$ measures:", "The scaled change in its own fitted value when it's deleted",
    [["The change in all coefficients jointly", "That's Cook's distance."], ["The change in one coefficient", "That's DFBETAS."], ["The change in $s^2$", "That's part of COVRATIO."]]),
  n(CD, "f40-dfbetas", 2.5, "The DFBETAS screening cutoff is $2/\\sqrt{n}$. What is it for $n = 64$?", 0.25, 0.001),
  n(CD, "f40-press", 3.5, "A case has residual $e_i = 1.5$ and leverage $h_{ii} = 0.25$. What is its deleted residual $e_i/(1 - h_{ii})$?", 2, 0.001),
  n(CD, "f40-cook", 4.5, "Cook's $D_i = \\frac{r_i^2}{p}\\cdot\\frac{h_{ii}}{1 - h_{ii}}$ with $r_i = 2$, $h_{ii} = 0.2$, $p = 4$. What is $D_i$?", 0.25, 0.001),
  m(CD, "f40-fit-change", 5, "The change in case $i$'s own fitted value when it's deleted is:", "$\\hat{y}_i - \\hat{y}_{i(i)} = h_{ii}e_i/(1 - h_{ii})$",
    [["$e_i$", "Too large unless $h_{ii} = 1/2$."], ["$h_{ii}e_i$", "Missing the $1/(1 - h_{ii})$ factor."], ["$e_i/(1 - h_{ii})$", "That's the deleted residual."]]),
  n(CD, "f40-fit-num", 5.5, "With $h_{ii} = 0.5$ and $e_i = 1$, what is $\\hat{y}_i - \\hat{y}_{i(i)}$?", 1, 0.001),
  n(CD, "f40-covratio", 6, "$\\text{COVRATIO}_i = (s_{(i)}^2/s^2)^p/(1 - h_{ii})$ with $s_{(i)}^2/s^2 = 0.8$, $p = 2$, $h_{ii} = 0.2$. What is it?", 0.8, 0.001),
  m(CD, "f40-covratio-low", 6.5, "A COVRATIO well below $1$ indicates that case $i$:", "Reduces the precision of the estimates — typically a large-residual case",
    [["Greatly improves precision", "That's COVRATIO above $1$."], ["Has zero leverage", "Not implied."], ["Has no influence", "It affects precision."]]),
  s(CD, "f40-local", 8, "What is Cook's local influence approach, and how does it differ from case deletion?",
    "Instead of deleting cases, perturb the model slightly (e.g. case weights $w_i = 1 + \\epsilon_i$) and study the curvature of the likelihood displacement in the perturbation direction.",
    "The direction of maximum curvature shows which cases jointly matter most, handling simultaneous small perturbations and avoiding the masking of single-case deletion."),
  s(CD, "f40-timeseries", 9, "Why are standard deletion diagnostics awkward for time-series regressions with lagged variables, and what can be done?",
    "Deleting one time point also removes it as a lag for the next observation, so a single deletion changes several rows and the formulas based on independent cases don't apply.",
    "Treat a suspicious point as missing (or model it with an intervention dummy) and refit, or delete blocks of observations; compare via likelihood or forecast changes."),

  // --- collinearity-eigenanalysis ----------------------------------------
  m(CE, "f40-perfect", 1.5, "Perfect collinearity means:", "One column of $X$ is an exact linear combination of others, so $X^\\top X$ is singular",
    [["Two predictors have correlation $0.5$", "That's ordinary correlation."], ["The response is constant", "No."], ["All predictors are orthogonal", "The opposite."]]),
  n(CE, "f40-vif", 2.5, "$R_j^2 = 0.8$ from regressing $x_j$ on the other predictors. What is $\\mathrm{VIF}_j$?", 5, 0.001),
  n(CE, "f40-cond", 3.5, "Correlation-matrix eigenvalues are $1.5$ and $0.5$. What is the condition number $\\sqrt{\\lambda_{\\max}/\\lambda_{\\min}}$ (to $4$ decimals)?", 1.7321, 0.002),
  n(CE, "f40-vif95", 4, "Two predictors have correlation $0.95$. What is the VIF (to $2$ decimals)?", 10.26, 0.002),
  m(CE, "f40-affects", 4.5, "Collinearity mainly damages:", "The precision of individual coefficients, not predictions within the data's range",
    [["The overall $R^2$", "Fit is unaffected."], ["Predictions at typical $x$", "These stay accurate."], ["The residuals", "They're unchanged."]]),
  n(CE, "f40-se-factor", 5.5, "A coefficient has $\\mathrm{VIF} = 16$. By what factor is its standard error inflated?", 4, 0.001),
  m(CE, "f40-cure", 6, "The most effective cure for collinearity, when possible, is:", "Collecting data that break the correlation between the predictors",
    [["Dropping the response", "No."], ["Using more decimal places", "Doesn't help."], ["Ignoring standard errors", "No."]]),
  n(CE, "f40-prop", 6.5, "For $\\hat{\\beta}_j$, the variance terms $v_{jk}^2/\\lambda_k$ are $0.3/1.8$ and $0.7/0.07$. What proportion comes from the second eigenvalue (to $4$ decimals)?", 0.9836, 0.002),
  s(CE, "f40-centering", 7.5, "Why does centring $x$ before forming $x^2$ reduce collinearity, and does it change the fitted model?",
    "For positive $x$, $x$ and $x^2$ are highly correlated; centring makes $x - \\bar{x}$ and $(x - \\bar{x})^2$ nearly uncorrelated for symmetric $x$.",
    "The fitted values and overall fit are identical (it's a reparameterisation); only the meaning and precision of the lower-order coefficients change."),
  s(CE, "f40-goal", 8.5, "How should the importance of collinearity depend on whether the goal is prediction or attributing effects to individual predictors?",
    "For prediction at $x$ values resembling the data, collinearity is largely harmless: the fitted surface is well determined along the data's directions.",
    "For attribution, separating correlated predictors' effects is genuinely hard — the data contain little information about the contrast — so report joint effects or redesign the study."),

  // --- misspecification-bias ---------------------------------------------
  m(MB, "f40-ovb", 1.5, "Omitted-variable bias in $\\hat{\\beta}_1$ requires the omitted variable to:", "Affect $y$ and be correlated with $x_1$",
    [["Only affect $y$", "Uncorrelated omissions don't bias $\\hat{\\beta}_1$."], ["Only correlate with $x_1$", "If it doesn't affect $y$, no bias."], ["Be measured with error", "Different problem."]]),
  n(MB, "f40-short", 2.5, "True $\\beta_1 = 3$, $\\beta_2 = 2$, and the slope of $x_2$ on $x_1$ is $-0.5$. What does the short regression estimate?", 2, 0.001),
  n(MB, "f40-bias", 3.5, "Same setting. What is the bias of the short-regression slope?", -1, 0.001),
  m(MB, "f40-irrelevant", 4, "Including an irrelevant predictor correlated with $x_1$ mainly costs:", "Precision — larger variance for $\\hat{\\beta}_1$",
    [["Bias in $\\hat{\\beta}_1$", "It stays unbiased."], ["Nothing", "Variance rises."], ["A biased $s^2$", "$s^2$ stays unbiased."]]),
  n(MB, "f40-inflate", 4.5, "An irrelevant predictor has correlation $0.6$ with $x_1$. By what factor does including it inflate $\\operatorname{Var}(\\hat{\\beta}_1)$, $1/(1 - r^2)$?", 1.5625, 0.002),
  m(MB, "f40-sign", 5, "The omitted variable has a negative effect on $y$ and is negatively correlated with $x_1$. The short-regression slope is biased:", "Upwards",
    [["Downwards", "Negative times negative is positive."], ["Not at all", "Both conditions for bias hold."], ["Towards zero always", "Direction depends on signs."]]),
  n(MB, "f40-s2", 5.5, "$\\sigma^2 = 2$, the omitted part contributes $40$ to the expected RSS, and $n - p = 20$. What is $E(s^2)$?", 4, 0.001),
  n(MB, "f40-mse", 6.5, "The short-model slope has bias $0.2$ and variance $0.04$. What is its MSE?", 0.08, 0.001),
  s(MB, "f40-proxy", 7.5, "How does including a proxy for an unmeasured confounder affect omitted-variable bias?",
    "A proxy correlated with the confounder absorbs part of its effect, so the bias in $\\hat{\\beta}_1$ shrinks.",
    "Unless the proxy captures the confounder perfectly, residual confounding remains — the measurement error in the proxy leaves part of the bias in place."),
  s(MB, "f40-bad-control", 9, "What is a “bad control,” and why can adding it introduce bias rather than remove it?",
    "A bad control is a variable affected by the treatment (a mediator) or a collider caused by both treatment and outcome.",
    "Conditioning on a mediator blocks part of the effect being estimated; conditioning on a collider opens a spurious path — either way the coefficient no longer estimates the total causal effect."),

  // --- robustness-of-f-test ----------------------------------------------
  m(RF, "f40-balanced", 1.5, "The ANOVA $F$ test for means is most robust to assumption violations when:", "Group sizes are equal",
    [["Group sizes are very unequal", "Imbalance hurts robustness."], ["There are only two observations per group", "Small groups are fragile."], ["Variances are very different", "That's a violation."]]),
  n(RF, "f40-rate", 2.5, "A simulation rejects $520$ times in $10\\,000$ null datasets at nominal $\\alpha = 0.05$. What is the estimated Type I error rate?", 0.052, 0.001),
  n(RF, "f40-mcse", 3.5, "With $2000$ replicates and a true rate of $0.05$, what is the Monte Carlo SE $\\sqrt{0.05 \\times 0.95/2000}$ (to $4$ decimals)?", 0.0049, 0.02),
  m(RF, "f40-skew", 4, "With large, balanced groups and skewed errors, the $F$ test's actual level is:", "Close to nominal, by the central limit theorem",
    [["Far above nominal", "Means are approximately normal."], ["Exactly zero", "No."], ["Undefined", "No."]]),
  n(RF, "f40-ratio", 4.5, "Group standard deviations are $1.5$ and $3$. What is the ratio of the largest to smallest variance?", 4, 0.001),
  m(RF, "f40-welch", 5, "Welch's ANOVA differs from the classical $F$ test by:", "Not assuming equal group variances",
    [["Assuming normal errors more strictly", "No."], ["Using medians", "No."], ["Requiring equal group sizes", "No."]]),
  n(RF, "f40-equicorr", 5.5, "Errors within a group of $n = 6$ are equicorrelated with $\\rho = 0.2$. By what factor is the variance of the group mean inflated, $1 + (n - 1)\\rho$?", 2, 0.001),
  m(RF, "f40-kurtosis", 6, "Tests about variances are sensitive to non-normality mainly because:", "$\\operatorname{Var}(s^2)$ depends on the kurtosis of the errors",
    [["$s^2$ is biased under non-normality", "It's unbiased regardless."], ["Means become biased", "No."], ["Sample sizes shrink", "No."]]),
  s(RF, "f40-simulate", 7, "How would you design a simulation to check the $F$ test's Type I error for your design and a suspected error distribution?",
    "Fix the actual design (group sizes, $X$), generate many datasets under $H_0$ with errors from the suspected distribution (e.g. skewed or heteroskedastic), and run the test on each.",
    "The rejection proportion estimates the true level; report it with its Monte Carlo SE and compare alternatives (Welch, permutation, robust SEs) on the same datasets."),
  s(RF, "f40-dependence", 8.5, "Why is serial dependence typically more damaging to the $F$ test than non-normality?",
    "Non-normality affects tail shapes, which averaging largely washes out; dependence changes the variance of means by a factor like $(1 + \\rho)/(1 - \\rho)$ that doesn't shrink with $n$.",
    "With $\\rho = 0.5$ that's a factor of $3$ in variance, so the $F$ statistic is inflated and the Type I error can be many times nominal; randomisation and blocking protect against it."),

  // --- errors-in-variables -----------------------------------------------
  m(EV, "f40-attenuation", 1.5, "Attenuation bias from classical measurement error in $x$ means the OLS slope is biased:", "Towards zero",
    [["Away from zero", "It's diluted."], ["Upwards always", "Towards zero, whatever the sign."], ["Not at all", "Classical error in $x$ biases the slope."]]),
  n(EV, "f40-reliab", 2.5, "True $x$ has variance $9$ and measurement error variance $1$. What is the reliability ratio?", 0.9, 0.001),
  n(EV, "f40-naive", 3.5, "True slope $4$ and reliability $0.75$. What does OLS on the noisy predictor estimate?", 3, 0.001),
  n(EV, "f40-disattenuate", 4.5, "Observed correlation $0.4$; reliabilities of $x$ and $y$ are $0.8$ and $0.5$. What is the disattenuated correlation $0.4/\\sqrt{0.8 \\times 0.5}$ (to $4$ decimals)?", 0.6325, 0.002),
  m(EV, "f40-y-error", 5, "Measurement error in the response only (classical, independent):", "Doesn't bias the slope but increases its variance",
    [["Biases the slope towards zero", "That's error in $x$."], ["Biases the slope away from zero", "No."], ["Has no effect at all", "It adds noise."]]),
  m(EV, "f40-deming", 5.5, "Deming regression requires knowing:", "The ratio of the error variances in $y$ and $x$",
    [["The true $x$ values", "Then there'd be no problem."], ["Nothing extra", "The slope isn't identified without it."], ["The sample size only", "No."]]),
  n(EV, "f40-iv", 6, "An instrument $z$ has $\\widehat{\\operatorname{Cov}}(z, y) = 6$ and $\\widehat{\\operatorname{Cov}}(z, x_{\\text{obs}}) = 2$. What is the IV slope?", 3, 0.001),
  n(EV, "f40-calibration", 6.5, "Regression calibration replaces $w$ by $E[x \\mid w] = \\mu + \\lambda(w - \\mu)$. With $\\mu = 10$, $\\lambda = 0.8$ and $w = 15$, what is it?", 14, 0.001),
  s(EV, "f40-replicates", 7, "How do replicate measurements reduce attenuation, and what's the reliability of an average of $k$ replicates?",
    "Averaging $k$ independent measurements divides the error variance by $k$.",
    "Reliability becomes $\\sigma_x^2/(\\sigma_x^2 + \\sigma_u^2/k)$, which rises towards $1$; replicates also let you estimate $\\sigma_u^2$ to correct the remaining bias."),
  s(EV, "f40-bounds", 9, "With one error-prone predictor, why does the true slope lie between the OLS slope of $y$ on $x$ and the reciprocal of the slope of $x$ on $y$?",
    "Regressing $y$ on $x_{\\text{obs}}$ attenuates the slope (error in $x$); the reverse regression attributes all noise to $x$, so $1/b_{x \\mid y}$ overstates it.",
    "Under classical error in $x$ and equation error in $y$, these two estimates bracket the true slope (Frisch bounds), giving a range when reliability is unknown."),
];
