import type { Item } from "../../../lib/assessment/types";
import { m, n, s } from "./shared";

/** Top-up to 50: regression foundations (regression through the hat matrix). */

const REG = "regression";
const RTM = "regress-to-the-mean";
const TERM = "linear-regression-terminology";
const SLR = "simple-linear-regression";
const OLS = "ordinary-least-squares";
const NE = "normal-equations";
const GEO = "geometric-interpretation-of-ols";
const HAT = "hat-matrix";

const regression: Item[] = [
  // level 1
  m(REG, "t50-regression-function-def", 1, "The regression function of $Y$ on $X$ is defined as:",
    "$m(x) = \\mathbb{E}[Y \\mid X = x]$", [
      ["$m(y) = \\mathbb{E}[X \\mid Y = y]$", "That is the regression of $X$ on $Y$, a different function."],
      ["$m(x) = P(Y = x \\mid X = x)$", "Regression targets the conditional mean, not a conditional probability of a matching value."],
      ["$m = \\text{Cov}(X, Y)/\\text{Var}(X)$", "That is the slope of the best linear predictor, a single number rather than the whole conditional-mean function."],
    ]),
  m(REG, "t50-nonparametric-example", 1, "Which of these is a nonparametric regression method?",
    "Kernel (Nadaraya–Watson) smoothing of $Y$ against $X$", [
      ["Ordinary least squares with a straight line", "A straight line has a fixed, finite set of parameters, so it is parametric."],
      ["Ridge regression on $10$ fixed predictors", "Ridge still fits a fixed linear form; the penalty does not make it nonparametric."],
      ["Logistic regression with a linear predictor", "A logistic model with a linear index has finitely many parameters."],
    ]),
  m(REG, "t50-binary-response", 1, "A regression whose response is binary and which models $P(Y = 1 \\mid X)$ through a logit link is:",
    "Logistic regression", [
      ["Linear regression with Gaussian errors", "Gaussian errors suit a continuous response, not a $0/1$ one."],
      ["Poisson regression", "Poisson regression models counts through a log link."],
      ["Quantile regression", "Quantile regression models a conditional quantile, not a probability."],
    ]),
  // level 2
  n(REG, "t50-predict-conditional-mean", 2, "The regression function is $\\mathbb{E}[Y \\mid X = x] = 5 - 2x$. Find the predicted mean response at $x = 1.5$.", 2),
  // level 3
  n(REG, "t50-iterated-expectation", 3, "$X$ is $0$ or $1$ with equal probability, $\\mathbb{E}[Y \\mid X = 0] = 2$ and $\\mathbb{E}[Y \\mid X = 1] = 6$. Find $\\mathbb{E}[Y]$.", 4),
  n(REG, "t50-blp-intercept", 3, "$\\mathbb{E}[X] = 2$, $\\mathbb{E}[Y] = 7$, $\\text{Var}(X) = 5$ and $\\text{Cov}(X, Y) = 10$. The best linear predictor of $Y$ is $\\alpha + \\beta X$. Find $\\alpha$.", 3),
  // level 4
  n(REG, "t50-best-constant-mse", 4, "$X$ is uniform on $\\lbrace 1, 2, 3 \\rbrace$, $\\mathbb{E}[Y \\mid X = x] = x^{2}$ and $\\text{Var}(Y \\mid X) = 1$. Find the mean squared error of the best constant predictor $c = \\mathbb{E}[Y]$. Give $2$ decimal places.", 11.89),
  // level 7
  s(REG, "t50-correct-but-useless", 7, "A conditional-mean regression can be correctly specified and precisely estimated yet nearly useless for predicting an individual’s outcome. Explain how, and name the quantity that governs individual prediction error.",
    "Explains that knowing $\\mathbb{E}[Y \\mid X]$ exactly still leaves the scatter of individuals around that mean, so individual predictions can be poor even with a perfect mean function.",
    "Names the conditional variance $\\text{Var}(Y \\mid X)$ (or its average $\\mathbb{E}[\\text{Var}(Y \\mid X)]$, the irreducible error) as what limits individual prediction, as opposed to estimation error in the mean."),
  m(REG, "t50-simpson-regression", 7, "Pooling three hospitals, the slope of recovery time on dose is positive; within each hospital it is negative. The most likely explanation is:",
    "Hospital is associated with both dose and recovery time, so pooling mixes a between-hospital trend with the within-hospital one", [
      ["The pooled slope is right and the within-hospital slopes are noise", "Consistent sign reversal in every group is a structural pattern, not noise."],
      ["Least squares is biased whenever groups are pooled", "OLS correctly estimates the pooled conditional mean; the issue is that it answers a different question."],
      ["Dose must be measured with error", "Measurement error attenuates slopes toward zero; it does not flip signs consistently within every group."],
    ]),
  // level 8
  m(REG, "t50-selection-on-x", 8, "A study keeps only observations with $X$ between $10$ and $20$. In the population $\\mathbb{E}[Y \\mid X]$ is linear. The OLS slope in the selected sample is:",
    "Still unbiased for the population slope, though less precise because the spread of $X$ is reduced", [
      ["Attenuated toward zero", "Attenuation comes from selecting on $Y$ or from measurement error in $X$; selecting on $X$ leaves $\\mathbb{E}[Y \\mid X]$ unchanged."],
      ["Inflated away from zero", "Nothing about restricting $X$ pushes the conditional mean’s slope outward."],
      ["Biased, because the sample is no longer random", "Selection that depends only on $X$ does not change the conditional distribution of $Y$ given $X$."],
    ]),
  // level 9
  s(REG, "t50-truncation-on-y", 9, "Only people whose $Y$ exceeds a threshold enter the sample. The population model is linear with homoskedastic Normal errors. Explain why regressing $Y$ on $X$ in this sample flattens the slope.",
    "Explains that selecting on $Y$ makes the error correlated with $X$ in the sample: at low $X$ only units with large positive errors clear the threshold, while at high $X$ most units do, so $\\mathbb{E}[\\varepsilon \\mid X, \\text{selected}]$ falls as $X$ rises.",
    "Concludes that this negative dependence between the selected errors and $X$ pulls the fitted slope toward zero (attenuation), unlike selection on $X$, which leaves the slope unbiased."),
  // level 10
  s(REG, "t50-flexible-vs-linear", 10, "You must choose between a fully nonparametric regression and a linear model for $n = 200$ observations on $10$ predictors. Argue which to prefer and what evidence would change your mind.",
    "Uses the curse of dimensionality and the bias–variance trade-off: with $10$ dimensions and $200$ points, local methods have very few neighbours, so their variance is huge, while a linear model’s bias may be modest — so the linear (or additive) model is usually preferred.",
    "Names evidence that would change the decision, such as residual plots or cross-validation showing strong nonlinearity or interactions that a linear or additive model misses, or a much larger sample."),
  s(REG, "t50-aid-growth", 10, "Regressing countries’ GDP growth on foreign aid received gives a negative slope, and a commentator concludes aid harms growth. Give the strongest argument that the data are consistent with aid helping, and propose a way to separate the explanations.",
    "Identifies reverse causality or confounding: aid flows to countries in crisis (disasters, wars, recessions), so low growth causes aid, which makes the slope negative even if aid raises growth.",
    "Proposes a design that breaks that link, for example an instrument for aid unrelated to current shocks (such as donor politics or historical ties), a natural experiment, or panel methods comparing changes within countries with pre-trends checked."),
];

const rtm: Item[] = [
  // level 1
  m(RTM, "t50-condition-for-rtm", 1, "Between two standardised measurements, regression to the mean occurs whenever their correlation $\\rho$ satisfies:",
    "$|\\rho| < 1$", [
      ["$\\rho < 0$", "Positive correlations below $1$ also give regression toward the mean."],
      ["$\\rho = 0$ only", "Zero correlation is the extreme case (full regression), but any imperfect correlation produces it."],
      ["$\\rho > 0.5$", "There is no threshold; the predicted standardised deviation is $\\rho z$ for every $|\\rho| < 1$."],
    ]),
  m(RTM, "t50-perfect-correlation", 1, "If two standardised measurements have correlation exactly $1$, then regression to the mean:",
    "Does not occur: the predicted second $z$-score equals the first", [
      ["Is at its strongest", "Strongest regression happens at $\\rho = 0$, where every prediction is the mean."],
      ["Reverses, so extremes become more extreme", "With $\\rho = 1$ the prediction $\\rho z$ is exactly $z$, neither smaller nor larger."],
      ["Depends on the sample size", "The population prediction $\\rho z$ does not involve $n$."],
    ]),
  m(RTM, "t50-reliability-def", 1, "In the true-score model $X = T + e$ with $e$ independent of $T$, the reliability of $X$ is:",
    "$\\text{Var}(T)/\\text{Var}(X)$", [
      ["$\\text{Var}(e)/\\text{Var}(X)$", "That is the share of variance due to noise, one minus the reliability."],
      ["$\\text{Var}(T)/\\text{Var}(e)$", "That is a signal-to-noise ratio, which can exceed $1$; reliability is a proportion."],
      ["$\\text{Corr}(X, e)$", "Reliability is about how much of $X$ is true score, not the correlation with the error."],
    ]),
  // level 2
  n(RTM, "t50-group-low-pre", 2, "Standardised pre- and post-test scores correlate at $\\rho = 0.3$. A group selected for its mean pre-test $z$-score of $-2$ receives no treatment. Find its predicted mean post-test $z$-score.", -0.6),
  n(RTM, "t50-sat-retest", 2, "A test has mean $500$ and standard deviation $100$ on both sittings, with test–retest correlation $0.7$. A student scored $700$ the first time. Find the predicted retest score.", 640),
  // level 3
  n(RTM, "t50-implied-correlation", 3, "With no intervention, a group selected at mean $z = 2.5$ on the first measurement averages $z = 1.5$ on the second. Find the implied correlation between measurements.", 0.6),
  // level 4
  n(RTM, "t50-treatment-beyond-rtm", 4, "Pre- and post-tests both have mean $100$ and standard deviation $15$ in the population, with correlation $0.5$. A treated group selected at pre-test mean $70$ averages $92$ after treatment. Estimate the treatment effect beyond what regression to the mean predicts.", 7),
  n(RTM, "t50-different-sds", 4, "Test $1$ has mean $60$ and standard deviation $10$; test $2$ has mean $65$ and standard deviation $20$; their correlation is $0.6$. A student scored $80$ on test $1$. Find the predicted score on test $2$.", 89),
  // level 7
  s(RTM, "t50-average-several", 7, "Why does a group chosen for extreme scores on a single noisy measurement regress more on retest than a group chosen using the average of several measurements?",
    "Explains that averaging several measurements reduces the error variance, so the selection score is more reliable and more strongly correlated with the true value (and with the retest).",
    "Concludes that with higher reliability or correlation, less of the selected group’s extremeness is luck, so the predicted retest deviation $\\rho z$ shrinks less toward the mean."),
  // level 8
  n(RTM, "t50-truncated-normal-selection", 8, "$(Z_1, Z_2)$ is standard bivariate Normal with correlation $0.5$. Using $\\mathbb{E}[Z_1 \\mid Z_1 > 0] = \\sqrt{2/\\pi}$, find $\\mathbb{E}[Z_2 \\mid Z_1 > 0]$. Give $4$ decimal places.", 0.3989),
  // level 9
  s(RTM, "t50-surgeon-rankings", 9, "A hospital ranks surgeons by last year’s mortality and finds the worst decile improved most this year. Using only the two years of data on all surgeons, describe how to estimate how much improvement the worst decile would show with no real change.",
    "Estimates the year-to-year correlation (or the share of variance that is persistent, e.g. via an empirical-Bayes or true-score model) from all surgeons, and uses it to predict each surgeon’s second-year rate as a shrinkage toward the overall mean.",
    "Compares the worst decile’s observed improvement with the improvement predicted by that shrinkage; only the excess over the regression-to-the-mean prediction is evidence of real change (and notes sampling noise from small caseloads drives the shrinkage)."),
  // level 10
  s(RTM, "t50-rdd-vs-prepost", 10, "Schools scoring below a cutoff receive extra funding. Explain why comparing schools just below and just above the cutoff avoids the regression-to-the-mean bias that a simple before–after comparison of funded schools suffers.",
    "Explains that a before–after comparison of funded schools mixes any funding effect with regression to the mean, because they were selected for low (partly unlucky) scores and would rise anyway.",
    "Explains that schools just either side of the cutoff were selected on almost identical scores, so they share the same expected regression to the mean; the jump at the cutoff in later outcomes isolates the funding effect (regression-discontinuity logic)."),
  s(RTM, "t50-fund-skill-persistence", 10, "Mutual funds in the top decile of three-year returns usually fall back in rank. Describe a model and data that would estimate what fraction of past outperformance should persist, separating skill from regression to the mean.",
    "Models returns as persistent skill plus transitory luck (a true-score model), so the expected future outperformance is the past outperformance times the reliability $\\text{Var}(\\text{skill})/\\text{Var}(\\text{return})$.",
    "Estimates that reliability from the correlation of returns across non-overlapping periods (or by empirical Bayes over many funds), and uses it to shrink each fund’s record; outperformance beyond the shrunken forecast is what would indicate genuine skill."),
];

const terminology: Item[] = [
  // level 1
  m(TERM, "t50-regressand", 1, "In regression, the term “regressand” refers to:",
    "The response variable", [
      ["A predictor variable", "Predictors are the regressors; the regressand is what is regressed on them."],
      ["The fitted coefficient vector", "Coefficients are parameters, not variables."],
      ["The residual", "The residual is the observed response minus its fitted value."],
    ]),
  m(TERM, "t50-baseline-category", 1, "A categorical predictor is coded with dummy variables and an intercept. The baseline (reference) category is:",
    "The level with no dummy column, whose mean response the intercept represents (at zero for the other predictors)", [
      ["The level with the most observations", "Any level can be the baseline; it is chosen by the coding, not by frequency."],
      ["The level with the largest coefficient", "The baseline has no coefficient of its own; the others are measured relative to it."],
      ["A level dropped from the data", "Its observations stay in the fit; only its dummy column is omitted."],
    ]),
  m(TERM, "t50-residual-df", 1, "The residual degrees of freedom of a regression are:",
    "The number of observations minus the number of estimated coefficients", [
      ["The number of predictors", "That is (roughly) the model degrees of freedom, not the residual ones."],
      ["The number of observations", "Fitting the coefficients uses up dimensions, so the residuals have fewer."],
      ["The number of nonzero residuals", "Degrees of freedom count dimensions of the residual space, not nonzero entries."],
    ]),
  // level 2
  m(TERM, "t50-dummy-coefficient", 2, "In $\\hat{y} = 3 + 2x_1 + 5d$, where $d$ indicates “treated”, the coefficient $5$ is:",
    "The difference in predicted mean between treated and untreated units with the same $x_1$", [
      ["The predicted mean of treated units", "That mean is $3 + 2x_1 + 5$; the $5$ is only the gap."],
      ["The effect of a one-unit rise in $x_1$ among the treated", "That slope is $2$ in this model, the same in both groups."],
      ["The proportion of treated units", "The coefficient is on the outcome’s scale, not a proportion."],
    ]),
  n(TERM, "t50-standardised-coef", 2, "A slope estimate is $\\hat{\\beta}_1 = 3$, with $s_x = 2$ and $s_y = 12$. Find the standardised coefficient $\\hat{\\beta}_1 s_x / s_y$.", 0.5),
  // level 3
  n(TERM, "t50-count-with-interaction", 3, "A model has an intercept, a $4$-level factor coded by dummies, a continuous $x$, and the interaction of $x$ with the factor. Find the number of coefficients $k$.", 8),
  n(TERM, "t50-log-linear-percent", 3, "In $\\log y = 2 + 0.05x$, find the exact percentage change in $y$ for a one-unit increase in $x$. Give $2$ decimal places.", 5.13),
  m(TERM, "t50-elasticity", 3, "In $\\log y = \\beta_0 + \\beta_1 \\log x + \\varepsilon$, the coefficient $\\beta_1$ is called:",
    "The elasticity of $y$ with respect to $x$ (percent change in $y$ per percent change in $x$)", [
      ["The semi-elasticity", "A semi-elasticity comes from a log–level model such as $\\log y = \\beta_0 + \\beta_1 x$."],
      ["The marginal effect $dy/dx$", "In a log–log model $dy/dx = \\beta_1 y/x$, which varies with $x$."],
      ["The partial correlation", "A coefficient on a log scale is not a correlation."],
    ]),
  // level 4
  n(TERM, "t50-interaction-gap", 4, "The fitted model is $\\hat{y} = 2 + 1.5x_1 + 4d + 2x_1 d$ with $d \\in \\lbrace 0, 1 \\rbrace$. Find the predicted difference between $d = 1$ and $d = 0$ at $x_1 = 3$.", 10),
  n(TERM, "t50-uncentred-intercept", 4, "A model fitted to a centred predictor reads $\\hat{y} = 50 + 2(x - 10)$. Written as $\\hat{y} = b_0 + b_1 x$, find $b_0$.", 30),
  // level 7
  s(TERM, "t50-parameter-estimator-estimate", 7, "Explain the difference between a parameter, an estimator and an estimate, using $\\beta_1$, $\\hat{\\beta}_1 = S_{xy}/S_{xx}$ and “$\\hat{\\beta}_1 = 2.3$” as the examples.",
    "Identifies $\\beta_1$ as the fixed unknown population quantity and $\\hat{\\beta}_1 = S_{xy}/S_{xx}$ as a rule (a random variable, a function of the data) for guessing it.",
    "Identifies $2.3$ as one realised value of that rule on this sample, and notes that sampling properties such as bias and standard error belong to the estimator, not to the single estimate."),
  // level 9
  s(TERM, "t50-what-error-contains", 9, "The word “error” in $\\mathbf{y} = \\mathbf{X}\\boldsymbol{\\beta} + \\boldsymbol{\\varepsilon}$ suggests measurement mistakes. Explain what $\\varepsilon$ contains in a typical observational regression and why that matters for exogeneity.",
    "Explains that $\\varepsilon$ collects everything that affects $y$ but is not in the model — omitted variables, unmodelled nonlinearity, individual heterogeneity — as well as any measurement noise.",
    "Concludes that because omitted causes can be related to the included predictors, $\\mathbb{E}[\\varepsilon \\mid \\mathbf{X}] = 0$ is a substantive assumption that can easily fail, not a technicality about measurement."),
  s(TERM, "t50-significant-vs-important", 9, "Explain why “statistically significant” and “practically important” are different properties of a regression coefficient, giving an example where a coefficient has one but not the other.",
    "Explains that significance concerns whether the estimate is distinguishable from zero relative to its standard error (driven by sample size and noise), while importance concerns the size of the effect in substantive units.",
    "Gives a fitting example, such as a tiny effect that is significant with millions of observations, or a large effect that is not significant in a small noisy sample."),
  // level 10
  s(TERM, "t50-rewrite-effect-sentence", 10, "A paper says: “The effect of education on wages, controlling for experience, is $0.08$.” The data are observational and the model is $\\log(\\text{wage}) = \\beta_0 + \\beta_1 \\text{educ} + \\beta_2 \\text{exper} + \\varepsilon$. Rewrite the sentence so its terminology is accurate, and justify each change.",
    "Replaces causal “effect” with associational language, e.g. “among workers with the same experience, one more year of education is associated with about $8\\%$ higher wages on average”, because observational regression gives conditional comparisons, not causal effects without further assumptions.",
    "Explains the other changes: “controlling for” means adjusting linearly for experience within the model, and $0.08$ on the log scale is approximately a percentage (exactly $e^{0.08} - 1$), and states that a causal reading would need no unmeasured confounding."),
  s(TERM, "t50-fixed-vs-random-design", 10, "Define fixed-design and random-design regression, and explain how the meaning of the bias and variance of $\\hat{\\boldsymbol{\\beta}}$ and of prediction error differs between them.",
    "Defines fixed design as treating $\\mathbf{X}$ as non-random (inference conditional on the observed $\\mathbf{X}$) and random design as treating rows $(\\mathbf{x}_i, y_i)$ as draws from a joint distribution.",
    "Explains that in fixed design bias and variance are conditional on $\\mathbf{X}$ (e.g. $\\sigma^2(\\mathbf{X}^\\top\\mathbf{X})^{-1}$) and prediction error is at the same $\\mathbf{x}_i$, while in random design they average over new $\\mathbf{X}$, so prediction error includes variation from new covariate values and misspecification can be treated as part of the target (the best linear predictor)."),
];

const slr: Item[] = [
  // level 1
  m(SLR, "t50-residual-se-meaning", 1, "In simple linear regression, the residual standard error $s$ estimates:",
    "The standard deviation $\\sigma$ of the errors around the true line", [
      ["The standard error of the slope", "The slope’s standard error is $s/\\sqrt{S_{xx}}$, which also depends on the spread of $x$."],
      ["The standard deviation of $y$", "$s$ measures scatter around the line, not around $\\bar{y}$."],
      ["The correlation between $x$ and $y$", "$s$ is on the scale of $y$; correlation is unitless."],
    ]),
  m(SLR, "t50-narrowest-ci", 1, "The confidence interval for the mean response $\\mathbb{E}[Y \\mid x_0]$ is narrowest when:",
    "$x_0 = \\bar{x}$", [
      ["$x_0 = 0$", "The variance term $(x_0 - \\bar{x})^{2}/S_{xx}$ vanishes at $\\bar{x}$, not at zero."],
      ["$x_0$ is the largest observed $x$", "Points far from $\\bar{x}$ have the widest intervals."],
      ["$x_0$ is the median of $y$", "The interval depends on where $x_0$ sits among the $x$ values, not on $y$."],
    ]),
  // level 2
  n(SLR, "t50-r-from-slope", 2, "A simple regression has $\\hat{\\beta}_1 = 1.2$, $s_x = 3$ and $s_y = 6$. Find the correlation $r$.", 0.6),
  // level 3
  n(SLR, "t50-se-slope-from-sse", 3, "A simple regression on $n = 12$ points has $\\text{SSE} = 40$ and $S_{xx} = 250$. Find the standard error of the slope, $\\sqrt{\\text{MSE}/S_{xx}}$ with $\\text{MSE} = \\text{SSE}/(n - 2)$. Give $4$ decimal places.", 0.1265),
  // level 4
  n(SLR, "t50-five-point-slope", 4, "Fit a least-squares line to $(1, 2)$, $(2, 3)$, $(3, 5)$, $(4, 4)$, $(5, 6)$. Find the slope $b_1$.", 0.9),
  n(SLR, "t50-five-point-sse", 4, "For the least-squares line through $(1, 2)$, $(2, 3)$, $(3, 5)$, $(4, 4)$, $(5, 6)$, find the residual sum of squares $\\text{SSE}$.", 1.9),
  // level 5
  n(SLR, "t50-five-point-mean-se", 5, "For the least-squares line through $(1, 2)$, $(2, 3)$, $(3, 5)$, $(4, 4)$, $(5, 6)$, with $s^{2} = \\text{SSE}/(n - 2)$, find the standard error of the fitted mean at $x_0 = 5$, $s\\sqrt{1/n + (x_0 - \\bar{x})^{2}/S_{xx}}$. Give $4$ decimal places.", 0.6164),
  m(SLR, "t50-prediction-wider", 5, "At the same $x_0$, the $95\\%$ prediction interval for a new $Y$ is wider than the $95\\%$ confidence interval for $\\mathbb{E}[Y \\mid x_0]$ because:",
    "It must also cover the new observation’s own error, adding $\\sigma^{2}$ to the variance", [
      ["It uses a larger critical value from a different distribution", "Both intervals use the same $t_{n-2}$ quantile; the difference is in the standard error."],
      ["The fitted line is less accurate for new data", "The uncertainty in the fitted line is the same in both; only the extra error term differs."],
      ["It ignores uncertainty in the slope", "It includes the slope uncertainty and adds the new error on top."],
    ]),
  // level 9
  s(SLR, "t50-errors-in-x-derive", 9, "The true model is $Y = \\beta_0 + \\beta_1 X + \\varepsilon$, but you observe $W = X + U$ with $U$ independent noise of variance $\\sigma_u^{2}$. Derive the probability limit of the OLS slope of $Y$ on $W$, and explain why noise added to $Y$ instead would not bias the slope.",
    "Derives $\\text{plim}\\,\\hat{\\beta}_1 = \\text{Cov}(W, Y)/\\text{Var}(W) = \\beta_1\\sigma_x^{2}/(\\sigma_x^{2} + \\sigma_u^{2})$, an attenuation by the reliability ratio.",
    "Explains that noise in $Y$ just joins the error term, uncorrelated with the regressor, so it inflates the variance of $\\hat{\\beta}_1$ but leaves it unbiased; only noise in the regressor creates correlation between regressor and error."),
  // level 10
  s(SLR, "t50-structural-slope", 10, "Both $x$ and $y$ are measured with error, and you want the structural slope linking their true values. Explain why neither OLS of $y$ on $x$ nor the inverse of OLS of $x$ on $y$ is right, and what extra information identifies the slope.",
    "Explains that $y$-on-$x$ is attenuated by error in $x$, while the inverted $x$-on-$y$ slope is biased the other way by error in $y$, so the true slope lies between them but neither is consistent.",
    "Names the extra information needed, such as the ratio of the two error variances (Deming or orthogonal regression), a known reliability, replicate measurements, or an instrumental variable."),
];

const ols: Item[] = [
  // level 1
  m(OLS, "t50-linear-estimator", 1, "OLS is called a linear estimator because:",
    "$\\hat{\\boldsymbol{\\beta}} = \\mathbf{A}\\mathbf{y}$ for a matrix $\\mathbf{A}$ that depends only on $\\mathbf{X}$", [
      ["It fits a straight line", "OLS can fit polynomials; “linear estimator” is about how it depends on $\\mathbf{y}$."],
      ["Its residuals are linear in $\\mathbf{X}$", "The property concerns the estimator as a function of the response."],
      ["It assumes $\\mathbf{y}$ is Normal", "Linearity in $\\mathbf{y}$ holds whatever the error distribution."],
    ]),
  m(OLS, "t50-cov-beta", 1, "Under the Gauss–Markov assumptions, the covariance matrix of $\\hat{\\boldsymbol{\\beta}}$ is:",
    "$\\sigma^{2}(\\mathbf{X}^\\top\\mathbf{X})^{-1}$", [
      ["$\\sigma^{2}\\mathbf{X}^\\top\\mathbf{X}$", "More information in $\\mathbf{X}^\\top\\mathbf{X}$ should shrink the variance, so it enters inverted."],
      ["$\\sigma^{2}\\mathbf{I}$", "That is the covariance of the errors, not of the coefficients."],
      ["$\\sigma^{2}\\mathbf{H}$", "That is the covariance of the fitted values $\\hat{\\mathbf{y}}$."],
    ]),
  m(OLS, "t50-best-meaning", 1, "In “best linear unbiased estimator”, “best” means:",
    "Smallest variance among all linear unbiased estimators", [
      ["Smallest mean squared error among all estimators", "Biased or nonlinear estimators can have smaller MSE; the claim is restricted to linear unbiased ones."],
      ["Highest $R^{2}$", "$R^{2}$ is a property of the fit, not a criterion for comparing estimators."],
      ["Maximum likelihood under any error distribution", "OLS is the MLE only under Normal errors; Gauss–Markov does not need Normality."],
    ]),
  // level 2
  n(OLS, "t50-intercept-only-rss", 2, "Fit an intercept-only model by OLS to $y = 3, 7, 8, 10, 12$. Find the residual sum of squares.", 46),
  // level 3
  n(OLS, "t50-se-from-inverse", 3, "$\\sigma^{2} = 9$ and the $(2, 2)$ entry of $(\\mathbf{X}^\\top\\mathbf{X})^{-1}$ is $0.04$. Find the standard error of $\\hat{\\beta}_2$.", 0.6),
  // level 4
  n(OLS, "t50-four-point-predict", 4, "Fit OLS of $y$ on $x$ with an intercept to $(0, 1)$, $(1, 2)$, $(2, 2)$, $(3, 5)$. Find the fitted value at $x = 4$.", 5.5),
  n(OLS, "t50-endpoint-vs-ols", 4, "With $x = 0, 1, 2, 3, 4$ and i.i.d. errors of variance $1$, the endpoint slope $(y_5 - y_1)/(x_5 - x_1)$ has variance $2/(x_5 - x_1)^{2}$ and the OLS slope has variance $1/S_{xx}$. Find the ratio of the endpoint variance to the OLS variance.", 1.25),
  // level 5
  m(OLS, "t50-endpoint-gm", 5, "Under the Gauss–Markov assumptions, the endpoint slope estimator $(y_n - y_1)/(x_n - x_1)$ is:",
    "Linear and unbiased, so its variance is at least that of the OLS slope", [
      ["Biased, which is why OLS beats it", "Its expectation is $\\beta_1$; it loses on variance, not bias."],
      ["Nonlinear, so Gauss–Markov does not apply", "It is a fixed linear combination of the $y_i$."],
      ["Better than OLS when $n$ is small", "Gauss–Markov holds for every $n$; it never has smaller variance."],
    ]),
  n(OLS, "t50-var-linear-combo", 5, "$\\sigma^{2} = 4$ and $(\\mathbf{X}^\\top\\mathbf{X})^{-1} = \\begin{bmatrix} 0.5 & -0.1 \\\\ -0.1 & 0.2 \\end{bmatrix}$. Find $\\text{Var}(\\hat{\\beta}_1 + \\hat{\\beta}_2)$.", 2),
  // level 10
  s(OLS, "t50-optimism-out-of-sample", 10, "OLS minimises in-sample squared error. With $p$ close to $n$, explain why it does not minimise expected out-of-sample squared error, quantify the gap between training and test error under the classical model, and say what you would use instead.",
    "Explains that the training error is optimistic because the fit adapts to the noise: under the classical model $\\mathbb{E}[\\text{RSS}/n] = \\sigma^{2}(1 - p/n)$, while prediction error at the same $\\mathbf{x}_i$ is $\\sigma^{2}(1 + p/n)$, a gap of $2p\\sigma^{2}/n$ that is large when $p$ is close to $n$.",
    "Recommends a method that trades a little bias for less variance or picks complexity honestly — ridge, lasso, subset selection guided by cross-validation, AIC or $C_p$."),
  s(OLS, "t50-two-point-errors", 10, "The errors are i.i.d. taking values $+1$ or $-1$ with probability $\\tfrac12$ each. Explain why a nonlinear estimator can recover $\\boldsymbol{\\beta}$ exactly with probability tending to $1$, while OLS keeps variance $\\sigma^{2}(\\mathbf{X}^\\top\\mathbf{X})^{-1}$. What does this say about Gauss–Markov?",
    "Explains that because each $y_i - \\mathbf{x}_i^\\top\\boldsymbol{\\beta}$ must be exactly $\\pm 1$, a nonlinear rule (searching for the $\\boldsymbol{\\beta}$ that makes every residual $\\pm 1$, or similar) pins down $\\boldsymbol{\\beta}$ exactly once enough distinct observations exist, which OLS’s averaging cannot do.",
    "Concludes that Gauss–Markov’s optimality is confined to linear unbiased estimators; when the error distribution has exploitable structure, nonlinear estimators (MLE-type) can be far better, so “BLUE” is not “best”."),
];

const normalEq: Item[] = [
  // level 1
  m(NE, "t50-xtx-entry", 1, "In the normal equations $\\mathbf{X}^\\top\\mathbf{X}\\hat{\\boldsymbol{\\beta}} = \\mathbf{X}^\\top\\mathbf{y}$, the $(j, k)$ entry of $\\mathbf{X}^\\top\\mathbf{X}$ is:",
    "The inner product $\\mathbf{x}_j \\cdot \\mathbf{x}_k$ of columns $j$ and $k$", [
      ["The correlation of columns $j$ and $k$", "Correlations need centring and scaling; $\\mathbf{X}^\\top\\mathbf{X}$ uses raw columns."],
      ["The product of row $j$ and row $k$", "$\\mathbf{X}^\\top\\mathbf{X}$ multiplies columns; rows give $\\mathbf{X}\\mathbf{X}^\\top$."],
      ["$x_{jk}^{2}$", "Each entry sums over all $n$ observations."],
    ]),
  m(NE, "t50-jth-equation", 1, "The $j$th normal equation, $\\mathbf{x}_j^\\top(\\mathbf{y} - \\mathbf{X}\\hat{\\boldsymbol{\\beta}}) = 0$, says the residual vector is:",
    "Orthogonal to the $j$th column of $\\mathbf{X}$", [
      ["Equal to zero in its $j$th entry", "It constrains an inner product over all observations, not one residual."],
      ["Parallel to the $j$th column", "Orthogonal, not parallel: a zero inner product."],
      ["Of length $\\hat{\\beta}_j$", "The equation says nothing about the residual’s length."],
    ]),
  m(NE, "t50-slr-xtx", 1, "For simple regression with an intercept, $\\mathbf{X}^\\top\\mathbf{X}$ equals:",
    "$\\begin{bmatrix} n & \\sum x_i \\\\ \\sum x_i & \\sum x_i^{2} \\end{bmatrix}$", [
      ["$\\begin{bmatrix} n & 0 \\\\ 0 & \\sum x_i^{2} \\end{bmatrix}$", "The off-diagonal is $\\sum x_i$, which is zero only for centred $x$."],
      ["$\\begin{bmatrix} \\sum y_i & \\sum x_i y_i \\end{bmatrix}$", "That is $\\mathbf{X}^\\top\\mathbf{y}$ (as a row), the right-hand side."],
      ["$\\begin{bmatrix} 1 & \\bar{x} \\\\ \\bar{x} & 1 \\end{bmatrix}$", "That looks like a scaled correlation matrix; $\\mathbf{X}^\\top\\mathbf{X}$ holds raw sums."],
    ]),
  // level 2
  n(NE, "t50-det-slr", 2, "Simple regression with $n = 5$, $\\sum x_i = 10$ and $\\sum x_i^{2} = 30$. Find $\\det(\\mathbf{X}^\\top\\mathbf{X})$.", 50),
  // level 3
  n(NE, "t50-group-indicators", 3, "No intercept, with indicator columns for group A ($3$ observations) and group B ($2$ observations). Then $\\mathbf{X}^\\top\\mathbf{X} = \\text{diag}(3, 2)$ and $\\mathbf{X}^\\top\\mathbf{y} = [12, 10]$. Find $\\hat{\\beta}_B$.", 5),
  m(NE, "t50-orthogonal-decouple", 3, "If the columns of $\\mathbf{X}$ are mutually orthogonal, the normal equations:",
    "Decouple, giving $\\hat{\\beta}_j = \\mathbf{x}_j^\\top\\mathbf{y}/\\mathbf{x}_j^\\top\\mathbf{x}_j$ for each $j$ separately", [
      ["Have no solution", "Orthogonal columns make $\\mathbf{X}^\\top\\mathbf{X}$ diagonal and easy to invert."],
      ["Force every coefficient to be equal", "Each coefficient depends on its own column and $\\mathbf{y}$."],
      ["Give $\\hat{\\boldsymbol{\\beta}} = \\mathbf{X}^\\top\\mathbf{y}$", "Only if every column also has unit length; in general you divide by $\\|\\mathbf{x}_j\\|^{2}$."],
    ]),
  // level 4
  n(NE, "t50-solve-2x2", 4, "$\\mathbf{X}^\\top\\mathbf{X} = \\begin{bmatrix} 3 & 3 \\\\ 3 & 5 \\end{bmatrix}$ and $\\mathbf{X}^\\top\\mathbf{y} = [6, 10]$. Solve the normal equations for $\\hat{\\beta}_2$.", 2),
  n(NE, "t50-form-and-solve-slope", 4, "Form and solve the normal equations for the line through $(1, 2)$, $(2, 3)$, $(4, 7)$. Find the slope $b_1$. Give $4$ decimal places.", 1.7143),
  n(NE, "t50-form-and-solve-intercept", 4, "Form and solve the normal equations for the line through $(1, 2)$, $(2, 3)$, $(4, 7)$. Find the intercept $b_0$.", 0),
  n(NE, "t50-two-col-from-data", 4, "No intercept, with $\\mathbf{x}_1 = [1, 0, 1]$, $\\mathbf{x}_2 = [0, 1, 1]$ and $\\mathbf{y} = [1, 2, 4]$. Form and solve the normal equations for $\\hat{\\beta}_1$. Give $4$ decimal places.", 1.3333),
  // level 5
  n(NE, "t50-min-norm-collinear", 5, "Columns $\\mathbf{x}_1 = [1, 1, 1, 1]$ and $\\mathbf{x}_2 = [2, 2, 2, 2]$, and $\\bar{y} = 3$. The normal equations reduce to $\\beta_1 + 2\\beta_2 = 3$. Find $\\beta_2$ in the minimum-norm solution.", 1.2),
  m(NE, "t50-duplicate-column", 5, "You add a column equal to twice an existing column. The normal equations then:",
    "Have infinitely many solutions, all giving the same fitted values", [
      ["Have no solution", "$\\mathbf{X}^\\top\\mathbf{y}$ always lies in the column space of $\\mathbf{X}^\\top\\mathbf{X}$, so solutions exist."],
      ["Have a unique solution with the new coefficient zero", "That is one solution among infinitely many; nothing singles it out."],
      ["Give different fitted values for different solutions", "Every solution projects $\\mathbf{y}$ onto the same column space, so $\\hat{\\mathbf{y}}$ is unique."],
    ]),
  s(NE, "t50-mean-equation", 5, "With an intercept in the model, show that the first normal equation implies $\\bar{y} = \\bar{\\mathbf{x}}^\\top\\hat{\\boldsymbol{\\beta}}$, and say what this means for the prediction at the covariate means.",
    "Writes the first normal equation as $\\mathbf{1}^\\top(\\mathbf{y} - \\mathbf{X}\\hat{\\boldsymbol{\\beta}}) = 0$, i.e. $\\sum y_i = \\sum \\mathbf{x}_i^\\top\\hat{\\boldsymbol{\\beta}}$, and divides by $n$ to get $\\bar{y} = \\bar{\\mathbf{x}}^\\top\\hat{\\boldsymbol{\\beta}}$.",
    "Concludes that the fitted surface passes through the point of means, so predicting at the average covariate values returns exactly $\\bar{y}$."),
  // level 9
  s(NE, "t50-centring-reduction", 9, "Show by block elimination that, with an intercept, the slope part of the normal equations reduces to $\\mathbf{X}_c^\\top\\mathbf{X}_c\\boldsymbol{\\beta}_s = \\mathbf{X}_c^\\top\\mathbf{y}$, where $\\mathbf{X}_c$ holds the centred predictors, and explain why this form is numerically preferable.",
    "Uses the first equation to write $\\hat{\\beta}_0 = \\bar{y} - \\bar{\\mathbf{x}}^\\top\\boldsymbol{\\beta}_s$, substitutes into the remaining equations, and shows the cross-product terms become centred sums, giving $\\mathbf{X}_c^\\top\\mathbf{X}_c\\boldsymbol{\\beta}_s = \\mathbf{X}_c^\\top\\mathbf{y}$.",
    "Explains that centring removes the large shared mean component, so $\\mathbf{X}_c^\\top\\mathbf{X}_c$ is much better conditioned than the raw $\\mathbf{X}^\\top\\mathbf{X}$ when predictors have means far from zero, reducing round-off error."),
  // level 10
  s(NE, "t50-restricted-normal-eq", 10, "Derive the system of equations for minimising $\\|\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta}\\|^{2}$ subject to linear constraints $\\mathbf{R}\\boldsymbol{\\beta} = \\mathbf{r}$, and give the restricted estimator in terms of the unrestricted $\\hat{\\boldsymbol{\\beta}}$.",
    "Forms the Lagrangian and gets the bordered system $\\mathbf{X}^\\top\\mathbf{X}\\boldsymbol{\\beta} + \\mathbf{R}^\\top\\boldsymbol{\\lambda} = \\mathbf{X}^\\top\\mathbf{y}$ (up to the factor of $2$) together with $\\mathbf{R}\\boldsymbol{\\beta} = \\mathbf{r}$.",
    "Solves it as $\\tilde{\\boldsymbol{\\beta}} = \\hat{\\boldsymbol{\\beta}} - (\\mathbf{X}^\\top\\mathbf{X})^{-1}\\mathbf{R}^\\top[\\mathbf{R}(\\mathbf{X}^\\top\\mathbf{X})^{-1}\\mathbf{R}^\\top]^{-1}(\\mathbf{R}\\hat{\\boldsymbol{\\beta}} - \\mathbf{r})$, a correction that moves the unrestricted estimate onto the constraint set."),
];

const geometry: Item[] = [
  // level 1
  m(GEO, "t50-residual-maker", 1, "The matrix $\\mathbf{M} = \\mathbf{I} - \\mathbf{H}$ projects onto:",
    "The orthogonal complement of the column space of $\\mathbf{X}$", [
      ["The column space of $\\mathbf{X}$", "That is what $\\mathbf{H}$ does; $\\mathbf{M}$ projects onto the complement."],
      ["The row space of $\\mathbf{X}$", "The row space lives in $\\mathbb{R}^{p}$; $\\mathbf{M}$ acts on vectors in $\\mathbb{R}^{n}$."],
      ["The span of $\\mathbf{y}$", "$\\mathbf{M}$ depends only on $\\mathbf{X}$, not on $\\mathbf{y}$."],
    ]),
  m(GEO, "t50-variable-space", 1, "In the “variable space” picture of OLS, each column of $\\mathbf{X}$ and the response $\\mathbf{y}$ are:",
    "Vectors in $\\mathbb{R}^{n}$, one coordinate per observation", [
      ["Points in a scatterplot with one point per observation", "That is the observation-space picture with $n$ points in $\\mathbb{R}^{p}$."],
      ["Vectors in $\\mathbb{R}^{p}$", "Each variable has $n$ values, so it lives in $\\mathbb{R}^{n}$."],
      ["Lines through the origin", "The columns span a subspace; each column itself is a vector."],
    ]),
  m(GEO, "t50-cosine-correlation", 1, "The cosine of the angle between the centred vectors $\\mathbf{x} - \\bar{x}\\mathbf{1}$ and $\\mathbf{y} - \\bar{y}\\mathbf{1}$ equals:",
    "The sample correlation $r_{xy}$", [
      ["The slope of $y$ on $x$", "The slope is $r\\,s_y/s_x$, which depends on the lengths of the vectors."],
      ["$R^{2}$", "$R^{2}$ is the squared cosine."],
      ["The covariance of $x$ and $y$", "The covariance is the inner product divided by $n - 1$, not normalised by lengths."],
    ]),
  // level 2
  n(GEO, "t50-proj-coef", 2, "Project $\\mathbf{y} = [3, 1]$ onto the span of $\\mathbf{x} = [1, 2]$. Find the coefficient $c$ in $\\hat{\\mathbf{y}} = c\\mathbf{x}$.", 1),
  n(GEO, "t50-angle-from-r", 2, "Two centred vectors have correlation $0.5$. Find the angle between them, in degrees.", 60),
  // level 3
  n(GEO, "t50-proj-sq-length", 3, "Project $\\mathbf{y} = [1, 2, 3]$ onto the span of $\\mathbf{x} = [1, 1, 0]$. Find the squared length of the projection.", 4.5),
  m(GEO, "t50-y-in-colspace", 3, "If $\\mathbf{y}$ already lies in the column space of $\\mathbf{X}$, then:",
    "The residual vector is zero and $\\hat{\\mathbf{y}} = \\mathbf{y}$", [
      ["The residual vector equals $\\mathbf{y}$", "That happens when $\\mathbf{y}$ is orthogonal to the column space."],
      ["OLS has no solution", "A vector in the column space is fitted exactly."],
      ["$R^{2}$ is zero", "A perfect fit gives $R^{2} = 1$ (with an intercept)."],
    ]),
  // level 4
  n(GEO, "t50-orth-cols-fit", 4, "The column space is spanned by the orthogonal vectors $[1, 1, 1]$ and $[1, 0, -1]$, and $\\mathbf{y} = [2, 4, 9]$. Find the third coordinate of $\\hat{\\mathbf{y}}$.", 8.5),
  n(GEO, "t50-orth-cols-rss", 4, "The column space is spanned by the orthogonal vectors $[1, 1, 1]$ and $[1, 0, -1]$, and $\\mathbf{y} = [2, 4, 9]$. Find $\\|\\mathbf{e}\\|^{2}$.", 1.5),
  n(GEO, "t50-cos-angle", 4, "Regress $\\mathbf{y} = [1, 2, 3, 6]$ on the single column $\\mathbf{1}$ (no other terms). Find the cosine of the angle between $\\mathbf{y}$ and $\\hat{\\mathbf{y}}$. Give $4$ decimal places.", 0.8485),
  // level 5
  m(GEO, "t50-same-fits", 5, "Two design matrices $\\mathbf{X}_1$ and $\\mathbf{X}_2$ give identical OLS fitted values for every possible $\\mathbf{y}$ exactly when:",
    "They have the same column space", [
      ["They have the same number of columns", "Different subspaces of the same dimension give different projections."],
      ["$\\mathbf{X}_1^\\top\\mathbf{X}_1 = \\mathbf{X}_2^\\top\\mathbf{X}_2$", "Equal Gram matrices do not imply equal column spaces (rotate $\\mathbf{X}$ in $\\mathbb{R}^{n}$)."],
      ["They have the same first column", "The projection depends on the whole subspace."],
    ]),
  s(GEO, "t50-two-lines-geometry", 5, "Use the variable-space picture (centred $\\mathbf{x}$ and $\\mathbf{y}$ as vectors in $\\mathbb{R}^{n}$) to explain why regressing $y$ on $x$ and $x$ on $y$ give different lines.",
    "Explains that regressing $y$ on $x$ projects $\\mathbf{y}$ onto the line through $\\mathbf{x}$, while regressing $x$ on $y$ projects $\\mathbf{x}$ onto the line through $\\mathbf{y}$ — two different projections sharing the same angle $\\theta$ with $\\cos\\theta = r$.",
    "Gets the slopes $r\\,s_y/s_x$ and $r\\,s_x/s_y$ from projection lengths, so they are reciprocals only when $|r| = 1$ (vectors parallel); otherwise the second line is steeper when drawn in the $(x, y)$ plane."),
  n(GEO, "t50-fitted-length", 5, "The centred response has $\\|\\mathbf{y}_c\\|^{2} = 40$ and $R^{2} = 0.75$. Find the length $\\|\\hat{\\mathbf{y}}_c\\|$ of the centred fitted vector. Give $4$ decimal places.", 5.4772),
  // level 10
  s(GEO, "t50-t-stat-cotangent", 10, "Show that the $t$-statistic for one coefficient $\\beta_j$ is $\\sqrt{n - p}\\,\\cot\\theta$, where $\\theta$ is the angle between $\\mathbf{x}_j$ and $\\mathbf{y}$ after both are residualised on the other columns, and interpret this geometrically.",
    "Uses Frisch–Waugh–Lovell: $\\hat{\\beta}_j$ comes from regressing residualised $\\mathbf{y}$ on residualised $\\mathbf{x}_j$, so the fitted part has length $\\|\\tilde{\\mathbf{y}}\\|\\cos\\theta$ and the residual has length $\\|\\tilde{\\mathbf{y}}\\|\\sin\\theta$, which gives $t = \\sqrt{n - p}\\cos\\theta/\\sin\\theta$ (equivalently $t = r\\sqrt{n - p}/\\sqrt{1 - r^{2}}$ with $r$ the partial correlation).",
    "Interprets that significance depends only on how small the angle is between the two residualised vectors, scaled by the residual degrees of freedom, not on the units of either variable."),
  s(GEO, "t50-min-norm-interp", 10, "With $p > n$ and $\\mathbf{X}$ of rank $n$, the minimum-norm least-squares solution interpolates the data. Use geometry to explain why the in-sample residuals then carry no information, and describe the minimum-norm $\\hat{\\boldsymbol{\\beta}}$ as a projection.",
    "Explains that when the column space of $\\mathbf{X}$ is all of $\\mathbb{R}^{n}$, $\\mathbf{y}$ is projected onto itself, so $\\mathbf{e} = \\mathbf{0}$ whatever the noise, and training error cannot judge fit or estimate $\\sigma^{2}$ (no residual degrees of freedom).",
    "Describes the solutions of $\\mathbf{X}\\boldsymbol{\\beta} = \\mathbf{y}$ as an affine subspace of $\\mathbb{R}^{p}$, with the minimum-norm solution the projection of the origin onto it, which lies in the row space of $\\mathbf{X}$ ($\\hat{\\boldsymbol{\\beta}} = \\mathbf{X}^\\top(\\mathbf{X}\\mathbf{X}^\\top)^{-1}\\mathbf{y}$)."),
];

const hat: Item[] = [
  // level 1
  m(HAT, "t50-residual-maker-name", 1, "The matrix $\\mathbf{I} - \\mathbf{H}$ is often called:",
    "The residual-maker (annihilator) matrix, since $(\\mathbf{I} - \\mathbf{H})\\mathbf{y} = \\mathbf{e}$", [
      ["The precision matrix", "The precision matrix is an inverse covariance matrix."],
      ["The leverage matrix", "Leverages are the diagonal entries of $\\mathbf{H}$ itself."],
      ["The design matrix", "The design matrix is $\\mathbf{X}$."],
    ]),
  m(HAT, "t50-off-diagonal", 1, "The off-diagonal entry $h_{ij}$ of the hat matrix measures:",
    "How much $y_j$ contributes to the fitted value $\\hat{y}_i$", [
      ["The correlation between residuals $i$ and $j$", "That correlation is $-h_{ij}/\\sqrt{(1 - h_{ii})(1 - h_{jj})}$, not $h_{ij}$ itself."],
      ["The distance between observations $i$ and $j$", "$h_{ij}$ is a weight in a linear combination, not a distance."],
      ["The leverage of observation $i$", "Leverage is the diagonal entry $h_{ii}$."],
    ]),
  // level 4
  n(HAT, "t50-h33", 4, "An intercept and $x = 0, 1, 2$ form $\\mathbf{X}$. Find the leverage $h_{33}$ of the point at $x = 2$. Give $4$ decimal places.", 0.8333),
  // level 5
  n(HAT, "t50-h13", 5, "An intercept and $x = 0, 1, 2$ form $\\mathbf{X}$. Using $h_{ij} = 1/n + (x_i - \\bar{x})(x_j - \\bar{x})/S_{xx}$, find $h_{13}$. Give $4$ decimal places.", -0.1667),
  // level 6
  m(HAT, "t50-add-column-leverage", 6, "A new column is added to $\\mathbf{X}$ (keeping full rank). The leverages $h_{ii}$:",
    "Cannot decrease for any observation", [
      ["All decrease", "The column space grows, so each projection weight can only grow or stay the same."],
      ["Stay the same", "They stay the same only if the new column’s residualised version is zero at that observation."],
      ["Decrease on average", "Their sum rises by $1$, from $p$ to $p + 1$."],
    ]),
  // level 7
  s(HAT, "t50-leverage-at-least-1n", 7, "Explain why $h_{ii} \\ge 1/n$ for every observation when the model contains an intercept.",
    "Splits the column space into the span of $\\mathbf{1}$ plus its orthogonal complement within $C(\\mathbf{X})$, so $\\mathbf{H} = \\mathbf{1}\\mathbf{1}^\\top/n + \\mathbf{H}_2$ with $\\mathbf{H}_2$ also a projection.",
    "Notes that the diagonal of a projection is non-negative ($h_{ii} = \\sum_j h_{ij}^{2}$), so $h_{ii} = 1/n + (\\mathbf{H}_2)_{ii} \\ge 1/n$."),
  // level 10
  s(HAT, "t50-append-observation", 10, "Use the Sherman–Morrison formula to show how the leverage $h_{ii}$ of an existing observation changes when a new row $\\mathbf{x}_0$ is appended, and explain why no existing leverage can increase.",
    "Writes $(\\mathbf{X}^\\top\\mathbf{X} + \\mathbf{x}_0\\mathbf{x}_0^\\top)^{-1} = \\mathbf{A}^{-1} - \\mathbf{A}^{-1}\\mathbf{x}_0\\mathbf{x}_0^\\top\\mathbf{A}^{-1}/(1 + \\mathbf{x}_0^\\top\\mathbf{A}^{-1}\\mathbf{x}_0)$ with $\\mathbf{A} = \\mathbf{X}^\\top\\mathbf{X}$, giving $h_{ii}^{\\text{new}} = h_{ii} - (\\mathbf{x}_i^\\top\\mathbf{A}^{-1}\\mathbf{x}_0)^{2}/(1 + h_{00})$, where $h_{00} = \\mathbf{x}_0^\\top\\mathbf{A}^{-1}\\mathbf{x}_0$.",
    "Concludes that the subtracted term is a square over a positive number, so every existing leverage falls or stays the same — extra data can only spread the influence more thinly."),
  s(HAT, "t50-smoother-df", 10, "For a linear smoother $\\hat{\\mathbf{y}} = \\mathbf{S}\\mathbf{y}$ that is not a projection (e.g. LOESS), three definitions of degrees of freedom are $\\text{tr}(\\mathbf{S})$, $\\text{tr}(\\mathbf{S}^\\top\\mathbf{S})$ and $\\text{tr}(2\\mathbf{S} - \\mathbf{S}\\mathbf{S}^\\top)$. Explain where each comes from and why they coincide for the hat matrix.",
    "Explains the origins: $\\text{tr}(\\mathbf{S}) = \\sum \\text{Cov}(\\hat{y}_i, y_i)/\\sigma^{2}$ (covariance or optimism df), $\\text{tr}(\\mathbf{S}^\\top\\mathbf{S})$ from $\\sum \\text{Var}(\\hat{y}_i)/\\sigma^{2}$, and $n - \\text{tr}(2\\mathbf{S} - \\mathbf{S}\\mathbf{S}^\\top)$ as the residual df from $\\mathbb{E}\\|\\mathbf{y} - \\mathbf{S}\\mathbf{y}\\|^{2}$.",
    "Shows that for a symmetric idempotent $\\mathbf{H}$, $\\mathbf{H}^\\top\\mathbf{H} = \\mathbf{H}\\mathbf{H}^\\top = \\mathbf{H}$, so all three equal $\\text{tr}(\\mathbf{H}) = p$; for a general smoother they differ."),
];

export const t50Regression11Items: Item[] = [
  ...regression,
  ...rtm,
  ...terminology,
  ...slr,
  ...ols,
  ...normalEq,
  ...geometry,
  ...hat,
];
