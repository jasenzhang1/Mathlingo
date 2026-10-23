import type { Item } from "../../lib/assessment/types";
import { m, mcq, num, short } from "./infer-shared";

/**
 * Missing data and causal effects, part 2: doubly robust (AIPW) estimation and
 * double sampling for outcomes missing not at random. Forty questions per
 * lesson, four at each level.
 */

// ---------------------------------------------------------------------------
// doubly-robust-estimation
// ---------------------------------------------------------------------------
const DR = "doubly-robust-estimation";
const doublyRobust: Item[] = [
  // level 1
  mcq(m(DR, "recall-aipw", "recall", 1, 15, "The AIPW estimator of $\\mathbb{E}[Y(1)]$ averages, over all units:"),
    "$\\hat{\\mu}_1(X) + \\frac{A(Y - \\hat{\\mu}_1(X))}{\\hat{e}(X)}$",
    [
      ["$\\frac{AY}{\\hat{e}(X)}$", "dr-aipw-ipw", "That is plain IPW."],
      ["$\\hat{\\mu}_1(X)$", "dr-aipw-reg", "That is plain outcome regression."],
      ["$\\hat{\\mu}_1(X) \\cdot \\hat{e}(X)$", "dr-aipw-product", "The models are combined by a residual correction, not a product."],
    ]),
  mcq(m(DR, "recall-doubly-robust", "recall", 1, 15, "“Doubly robust” means the estimator is consistent if:"),
    "Either the outcome model or the propensity model is correctly specified",
    [
      ["Both models are correct", "dr-def-both", "Only one needs to be."],
      ["Neither model is needed", "dr-def-neither", "It uses both models."],
      ["The sample is twice as large", "dr-def-size", "The name refers to two chances at correctness."],
    ]),
  mcq(m(DR, "recall-propensity", "recall", 1, 15, "The propensity score is:"),
    "$e(X) = \\mathbb{P}(A = 1 \\mid X)$",
    [
      ["$\\mathbb{E}[Y \\mid A = 1, X]$", "dr-ps-outcome", "That is the outcome regression."],
      ["$\\mathbb{P}(Y = 1 \\mid X)$", "dr-ps-y", "It is about treatment, not outcome."],
      ["$\\mathbb{P}(A = 1)$", "dr-ps-marginal", "It conditions on $X$."],
    ]),
  mcq(m(DR, "recall-crossfit", "recall", 1, 15, "Cross-fitting means:"),
    "Fitting the nuisance models on some folds and evaluating the AIPW terms on held-out folds, then rotating",
    [
      ["Fitting the outcome model on treated and control units separately", "dr-cf-arms", "That is stratified fitting, not cross-fitting."],
      ["Cross-validating the final effect estimate", "dr-cf-cv", "The effect is not tuned by CV."],
      ["Fitting both models with the same algorithm", "dr-cf-same", "Unrelated to cross-fitting."],
    ]),
  // level 2
  num(m(DR, "apply-term-treated", "apply", 2, 20, "A treated unit has $\\hat{\\mu}_1 = 5$, $Y = 7$ and $\\hat{e} = 0.5$. Find its AIPW term for $\\mathbb{E}[Y(1)]$."), 9),
  num(m(DR, "apply-term-untreated", "apply", 2, 20, "An untreated unit has $\\hat{\\mu}_1 = 4$ and $\\hat{e} = 0.3$. Find its AIPW term for $\\mathbb{E}[Y(1)]$."), 4),
  num(m(DR, "apply-term-negative-residual", "apply", 2, 25, "A treated unit has $\\hat{\\mu}_1 = 6$, $Y = 5$ and $\\hat{e} = 0.25$. Find its AIPW term for $\\mathbb{E}[Y(1)]$."), 2),
  mcq(m(DR, "apply-perfect-outcome", "apply", 2, 25, "If the outcome model is exactly right, the weighted residual correction term:"),
    "Has mean zero, whatever the propensity model",
    [
      ["Removes the propensity model's bias", "dr-perf-ps", "There is no bias to remove when the outcome model is right."],
      ["Is always zero for every unit", "dr-perf-zero", "Individual residuals are noise; only their mean is zero."],
      ["Becomes infinite", "dr-perf-inf", "It is bounded if $\\hat{e}$ is."],
    ]),
  // level 3
  num(m(DR, "apply-term-control", "apply", 3, 25, "A control unit has $\\hat{\\mu}_0 = 3$, $Y = 2$ and $\\hat{e} = 0.6$. Find its AIPW term $\\hat{\\mu}_0 + \\frac{(1 - A)(Y - \\hat{\\mu}_0)}{1 - \\hat{e}}$."), 0.5),
  num(m(DR, "apply-term-control-treated", "apply", 3, 20, "A treated unit has $\\hat{\\mu}_0 = 3$. Find its AIPW term for $\\mathbb{E}[Y(0)]$."), 3),
  num(m(DR, "apply-se", "apply", 3, 25, "The per-unit AIPW terms for the ATE have standard deviation $2$ over $n = 400$ units. Find the standard error."), 0.1),
  mcq(m(DR, "apply-ps-right", "apply", 3, 30, "The propensity model is right but the outcome model is wrong. AIPW is:"),
    "Consistent, because the weighting corrects the outcome model's error on average",
    [
      ["Inconsistent", "dr-psright-inconsistent", "One correct model suffices."],
      ["Identical to the outcome regression", "dr-psright-reg", "The correction term is not zero."],
      ["Undefined", "dr-psright-undefined", "It is computable."],
    ]),
  // level 4
  num(m(DR, "apply-aipw-four", "apply", 4, 50, "Units $(A, Y, \\hat{\\mu}_1, \\hat{e})$: $(1, 10, 8, 0.5)$, $(0, \\cdot, 6, 0.5)$, $(1, 4, 6, 0.4)$, $(0, \\cdot, 5, 0.2)$. Find the AIPW estimate of $\\mathbb{E}[Y(1)]$."), 6),
  num(m(DR, "apply-reg-four", "apply", 4, 30, "Same units. Find the outcome-regression estimate $\\frac{1}{n}\\sum \\hat{\\mu}_1(X_i)$."), 6.25),
  num(m(DR, "apply-ipw-four", "apply", 4, 35, "Same units. Find the IPW estimate $\\frac{1}{n}\\sum \\frac{A_i Y_i}{\\hat{e}_i}$."), 7.5),
  mcq(m(DR, "apply-both-wrong", "apply", 4, 30, "If both nuisance models are badly wrong, AIPW:"),
    "Is generally biased, though the bias is a product of the two errors",
    [
      ["Is still consistent", "dr-bothwrong-consistent", "Double robustness needs at least one correct model."],
      ["Is always worse than IPW", "dr-bothwrong-worse", "It is often better, but not guaranteed."],
      ["Equals the naive difference in means", "dr-bothwrong-naive", "There is no such identity."],
    ]),
  // level 5
  short(m(DR, "explain-double-robustness", "explain", 5, 180, "Explain in words why AIPW is consistent if either model is correct."),
    [
      ["outcome-right", "If the outcome model is right, residuals $Y - \\mu_1(X)$ have mean zero given $X$ among treated, so the correction averages to zero and the regression part is right", 2, true],
      ["ps-right", "If the propensity is right, the weighted residuals estimate exactly the average error of the outcome model, so adding them removes its bias", 2, true],
    ]),
  mcq(m(DR, "apply-rate-dr", "apply", 5, 35, "Rate double robustness means:"),
    "The estimator's bias depends on the product of the two nuisance errors, so each can converge slowly",
    [
      ["Both nuisances must converge at rate $n^{-1/2}$", "dr-rate-parametric", "The product needs to be $o(n^{-1/2})$, not each factor."],
      ["The estimator converges twice as fast", "dr-rate-twice", "It converges at the usual $\\sqrt{n}$ rate."],
      ["Only the propensity rate matters", "dr-rate-ps", "Both rates enter the product."],
    ]),
  mcq(m(DR, "apply-missing-version", "apply", 5, 35, "For estimating $\\mathbb{E}[Y]$ with outcomes missing at random, AIPW averages:"),
    "$\\hat{m}(X) + \\frac{R(Y - \\hat{m}(X))}{\\hat{\\pi}(X)}$",
    [
      ["$\\frac{RY}{\\hat{\\pi}(X)}$ only", "dr-miss-ipw", "That is IPW."],
      ["$\\hat{m}(X)$ only among respondents", "dr-miss-cc", "That ignores non-respondents' covariates."],
      ["$R\\,Y$", "dr-miss-cc2", "That is a complete-case sum."],
    ]),
  num(m(DR, "apply-ci-upper", "apply", 5, 30, "An AIPW estimate of the ATE is $2.4$ with standard error $0.5$. Find the upper end of the $95\\%$ interval (use $z = 1.96$)."), 3.38),
  // level 6
  short(m(DR, "explain-crossfit", "explain", 6, 180, "Why is cross-fitting recommended when the nuisance models are flexible machine-learning fits?"),
    [
      ["overfit", "In-sample, a flexible outcome model overfits its own residuals, biasing the correction term", 2, true],
      ["independence", "Evaluating on held-out folds makes the nuisance fit independent of the units it is applied to, removing this own-observation bias without Donsker conditions", 2, true],
      ["efficiency", "Rotating folds uses all data, so no efficiency is lost", 1],
    ]),
  num(m(DR, "apply-bias-product", "apply", 6, 40, "At a covariate value, the propensity error is $e - \\bar{e} = 0.1$, the outcome model error is $\\mu_1 - \\bar{\\mu}_1 = 2$, and $\\bar{e} = 0.5$. Find the bias contribution $\\frac{(e - \\bar{e})(\\mu_1 - \\bar{\\mu}_1)}{\\bar{e}}$."), 0.4),
  num(m(DR, "apply-bias-halved", "apply", 6, 40, "Both errors in the previous question are halved, with $\\bar{e} = 0.5$ unchanged. Find the new bias contribution."), 0.1),
  mcq(m(DR, "apply-quarter-rate", "apply", 6, 40, "Each nuisance model converges faster than $n^{-1/4}$. The AIPW estimator:"),
    "Can still be $\\sqrt{n}$-consistent and asymptotically normal",
    [
      ["Converges only at rate $n^{-1/4}$", "dr-quarter-slow", "The bias is a product of the two errors, which is $o(n^{-1/2})$."],
      ["Is inconsistent", "dr-quarter-inconsistent", "Both models still converge."],
      ["Needs parametric models", "dr-quarter-parametric", "The point is that flexible models suffice."],
    ]),
  // level 7
  short(m(DR, "explain-eif", "explain", 7, 180, "What is the efficient influence function, and how is it used to get a standard error for AIPW?"),
    [
      ["definition", "It is the per-unit contribution whose average gives the first-order behaviour of the estimator; its variance is the semiparametric efficiency bound", 2, true],
      ["se", "The AIPW per-unit terms minus the estimate estimate it, so their sample standard deviation over $\\sqrt{n}$ is the standard error", 2, true],
    ]),
  num(m(DR, "apply-veff-balanced", "apply", 7, 45, "$\\sigma^{2}_{1}(X) = 4$, $\\sigma^{2}_{0}(X) = 1$, $e(X) = 0.5$ everywhere and the effect is constant. Find the efficiency bound $V_{\\text{eff}} = \\mathbb{E}\\left[\\frac{\\sigma^{2}_{1}}{e} + \\frac{\\sigma^{2}_{0}}{1 - e} + (\\mu_1 - \\mu_0 - \\tau)^{2}\\right]$."), 10),
  num(m(DR, "apply-veff-se", "apply", 7, 40, "With $V_{\\text{eff}} = 10$ and $n = 1{,}000$, find the best achievable standard error $\\sqrt{\\frac{V_{\\text{eff}}}{n}}$."), 0.1),
  mcq(m(DR, "apply-tmle", "apply", 7, 45, "Targeted maximum likelihood estimation (TMLE) is:"),
    "Another doubly robust, efficient estimator that updates the outcome model so the plug-in estimate solves the efficient score equation",
    [
      ["A form of IPW that ignores the outcome", "dr-tmle-ipw", "It uses both nuisance models."],
      ["A way to estimate propensity scores", "dr-tmle-ps", "It estimates the target parameter."],
      ["A non-robust maximum likelihood fit", "dr-tmle-nonrobust", "It shares AIPW's double robustness."],
    ]),
  // level 8
  short(m(DR, "derive-bias", "explain", 8, 240, "Derive that the bias of the AIPW mean for $\\mathbb{E}[Y(1)]$ with limits $\\bar{\\mu}_1$, $\\bar{e}$ is $\\mathbb{E}\\left[\\frac{(e - \\bar{e})(\\mu_1 - \\bar{\\mu}_1)}{\\bar{e}}\\right]$."),
    [
      ["condition", "Condition on $X$: $\\mathbb{E}[A(Y - \\bar{\\mu}_1) \\mid X] = e(X)\\left(\\mu_1(X) - \\bar{\\mu}_1(X)\\right)$, using consistency and no unmeasured confounding", 2, true],
      ["combine", "So the expectation is $\\mathbb{E}\\left[\\bar{\\mu}_1 + \\frac{e}{\\bar{e}}(\\mu_1 - \\bar{\\mu}_1)\\right]$; subtract $\\mathbb{E}[\\mu_1]$", 2, true],
      ["factor", "Rearrange to $\\mathbb{E}\\left[(\\mu_1 - \\bar{\\mu}_1)\\left(\\frac{e}{\\bar{e}} - 1\\right)\\right]$, the stated product", 1, true],
    ]),
  num(m(DR, "apply-veff-imbalanced", "apply", 8, 45, "$\\sigma^{2}_{1} = 4$, $\\sigma^{2}_{0} = 1$, constant effect, but now $e(X) = 0.2$ everywhere. Find $V_{\\text{eff}}$."), 21.25),
  num(m(DR, "apply-veff-ratio", "apply", 8, 45, "By what factor does $V_{\\text{eff}}$ grow when $e$ moves from $0.5$ (where it is $10$) to $0.2$ (where it is $21.25$)? Give $3$ decimal places."), 2.125),
  mcq(m(DR, "apply-extreme-ps", "apply", 8, 45, "Propensity scores near $0$ or $1$ hurt AIPW because:"),
    "The weights $\\frac{1}{\\hat{e}}$ or $\\frac{1}{1 - \\hat{e}}$ become huge, inflating variance, and the efficiency bound itself grows",
    [
      ["They make the estimator biased even with correct models", "dr-extreme-bias", "With correct models it remains unbiased asymptotically."],
      ["They make the outcome model wrong", "dr-extreme-outcome", "The outcome model is separate."],
      ["They have no effect on AIPW", "dr-extreme-none", "AIPW still divides by them."],
    ]),
  // level 9
  short(m(DR, "transfer-dml-ehr", "transfer", 9, 240, "Describe a double/debiased machine learning analysis of a treatment effect in a large EHR cohort with hundreds of covariates."),
    [
      ["nuisances", "Fit flexible models for $\\mathbb{E}[Y \\mid A, X]$ and $e(X)$ (e.g. boosted trees, lasso)", 1, true],
      ["crossfit", "Use $K$-fold cross-fitting to compute AIPW terms on held-out folds", 2, true],
      ["inference", "Average the terms for the ATE, use their standard deviation for a confidence interval, and check overlap of $\\hat{e}$", 2, true],
    ]),
  short(m(DR, "explain-robust-vs-efficient", "explain", 9, 210, "A nonparametric AIPW estimator and an estimator that exploits an extra assumption (e.g. a known MAR structure) are both available. Explain the trade-off."),
    [
      ["restricted-efficient", "Under the extra assumption a restricted estimator can have smaller variance, since the efficiency bound is lower in a smaller model", 2, true],
      ["bias-risk", "If the assumption fails, the restricted estimator is biased, while the nonparametric one stays consistent", 2, true],
      ["adaptive", "Adaptive or testing-based approaches try to get the best of both", 1],
    ]),
  num(m(DR, "apply-aipw-missing", "apply", 9, 60, "Estimate $\\mathbb{E}[Y]$ under MAR from units $(R, Y, \\hat{m}, \\hat{\\pi})$: $(1, 5, 4, 0.5)$, $(0, \\cdot, 3, 0.5)$, $(1, 2, 3, 0.8)$, $(0, \\cdot, 6, 0.25)$. Give $4$ decimal places."), 4.1875),
  mcq(m(DR, "apply-ate-pieces", "apply", 9, 45, "AIPW estimates of $\\mathbb{E}[Y(1)]$ and $\\mathbb{E}[Y(0)]$ are $6.0$ and $4.5$. Their per-unit terms are positively correlated. Compared with treating them as independent, the correct SE of the difference is:"),
    "Smaller, because positive covariance reduces the variance of a difference",
    [
      ["Larger", "dr-pieces-larger", "Positive covariance subtracts from the variance of a difference."],
      ["The same", "dr-pieces-same", "Covariance matters."],
      ["Undefined", "dr-pieces-undefined", "Compute the SD of the per-unit differences."],
    ]),
  // level 10
  short(m(DR, "explain-eif-variance", "explain", 10, 300, "Interpret each term of $V_{\\text{eff}} = \\mathbb{E}\\left[\\frac{\\sigma^{2}_{1}(X)}{e(X)} + \\frac{\\sigma^{2}_{0}(X)}{1 - e(X)} + \\left(\\mu_1(X) - \\mu_0(X) - \\tau\\right)^{2}\\right]$."),
    [
      ["noise-treated", "The first term is outcome noise among treated, inflated where few units are treated", 2, true],
      ["noise-control", "The second is the same for controls", 1, true],
      ["heterogeneity", "The third is variation of the conditional effect across $X$, present even with no outcome noise", 2, true],
    ]),
  short(m(DR, "explain-crossfit-validity", "explain", 10, 240, "Sketch why cross-fit AIPW intervals stay valid when nuisances are estimated by machine learning."),
    [
      ["expansion", "Expand the estimator as the oracle average of influence-function terms plus a remainder", 2, true],
      ["remainder", "The remainder is a product of nuisance errors, $o_p(n^{-1/2})$ if each converges faster than $n^{-1/4}$; cross-fitting controls the empirical-process term", 2, true],
      ["clt", "The oracle term obeys the CLT, so the interval is asymptotically correct", 1, true],
    ]),
  num(m(DR, "apply-rate-product", "apply", 10, 45, "The propensity and outcome models each converge at rate $n^{-0.3}$. The remainder is of order $n^{-a}$. Find $a$."), 0.6),
  mcq(m(DR, "apply-rate-check", "apply", 10, 60, "Rates $n^{-0.2}$ for the propensity and $n^{-0.35}$ for the outcome model give a remainder:"),
    "Of order $n^{-0.55}$, which is $o(n^{-1/2})$, so inference is valid",
    [
      ["Of order $n^{-0.2}$, too slow", "dr-ratecheck-min", "The remainder is the product of the two rates."],
      ["Of order $n^{-0.35}$, too slow", "dr-ratecheck-max", "Rates multiply, exponents add."],
      ["Of order $n^{-0.07}$", "dr-ratecheck-multiply", "Exponents add rather than multiply."],
    ]),
];

// ---------------------------------------------------------------------------
// double-sampling-mnar
// ---------------------------------------------------------------------------
const DS = "double-sampling-mnar";
const doubleSampling: Item[] = [
  // level 1
  mcq(m(DS, "recall-design", "recall", 1, 15, "Double sampling for missing outcomes means:"),
    "Selecting a random subsample of the units with missing outcomes and making extra effort to measure their outcomes",
    [
      ["Measuring every outcome twice", "ds-design-twice", "Only non-respondents are sampled again."],
      ["Imputing missing values twice", "ds-design-impute", "It collects real data rather than imputing."],
      ["Doubling the sample size", "ds-design-size", "The second sample comes from the non-respondents."],
    ]),
  mcq(m(DS, "recall-random", "recall", 1, 15, "The follow-up subsample must be chosen at random (with known probabilities) so that:"),
    "Followed-up units represent all non-respondents with the same covariates",
    [
      ["Follow-up is cheaper", "ds-random-cheap", "Randomness is for validity, not cost."],
      ["The model fits better", "ds-random-model", "It is about representativeness."],
      ["Outcomes are more accurate", "ds-random-accuracy", "Measurement accuracy is separate."],
    ]),
  mcq(m(DS, "recall-assumption", "recall", 1, 15, "The key design assumption is:"),
    "$S \\perp Y \\mid R = 0, A, X$: among non-respondents, being followed up does not depend on the outcome",
    [
      ["$R \\perp Y \\mid A, X$", "ds-assume-mar", "That is MAR at stage one, which double sampling does not need."],
      ["$S \\perp A$", "ds-assume-treatment", "Follow-up may depend on treatment and covariates."],
      ["All outcomes are observed at stage one", "ds-assume-all", "Then no double sampling would be needed."],
    ]),
  mcq(m(DS, "recall-rho", "recall", 1, 15, "$\\rho(A, X)$ denotes:"),
    "The probability that a non-respondent with treatment $A$ and covariates $X$ is selected for follow-up",
    [
      ["The response rate at stage one", "ds-rho-stage1", "That is $\\lambda$."],
      ["The correlation between $Y$ and $X$", "ds-rho-corr", "Here $\\rho$ is a sampling probability."],
      ["The propensity score", "ds-rho-ps", "That is $\\mathbb{P}(A = 1 \\mid X)$."],
    ]),
  // level 2
  num(m(DS, "apply-weight-followed", "apply", 2, 15, "A followed-up non-respondent was selected with $\\rho = 0.25$. Find its weight."), 4),
  num(m(DS, "apply-weight-respondent", "apply", 2, 15, "Find the weight of a unit whose outcome was recorded at stage one ($R = 1$)."), 1),
  num(m(DS, "apply-followup-count", "apply", 2, 20, "$400$ outcomes are missing and each is followed up with probability $0.2$. How many follow-ups do you expect?"), 80),
  mcq(m(DS, "apply-origin", "apply", 2, 20, "The idea of following up a subsample of non-respondents dates back to:"),
    "Hansen and Hurwitz's work on survey non-response",
    [
      ["Fisher's randomized experiments", "ds-origin-fisher", "Related spirit, different problem."],
      ["The bootstrap", "ds-origin-bootstrap", "The bootstrap resamples observed data."],
      ["Multiple imputation", "ds-origin-mi", "MI fills in values rather than measuring them."],
    ]),
  // level 3
  num(m(DS, "apply-mean", "apply", 3, 30, "$700$ of $1{,}000$ patients have a recorded outcome averaging $20$. Of the $300$ missing, a random $60$ are followed up and average $14$. Estimate the mean outcome."), 18.2),
  num(m(DS, "apply-cc", "apply", 3, 20, "Same data. What is the complete-case mean?"), 20),
  num(m(DS, "apply-bias", "apply", 3, 25, "Same data. By how much does the complete-case mean exceed the double-sampling estimate?"), 1.8),
  mcq(m(DS, "apply-mar-model", "apply", 3, 30, "A MAR-based analysis predicts each non-respondent's outcome by:"),
    "The mean of respondents with the same treatment and covariates",
    [
      ["The mean of followed-up non-respondents", "ds-marmodel-followed", "That is the nonparametric double-sampling approach."],
      ["Zero", "ds-marmodel-zero", "No analysis does this by default."],
      ["The overall mean of all respondents regardless of covariates", "ds-marmodel-overall", "MAR conditions on covariates."],
    ]),
  // level 4
  num(m(DS, "apply-arm-surgery", "apply", 4, 35, "In the surgery arm (within a covariate stratum) $60\\%$ have a recorded weight loss averaging $30$, and followed-up non-respondents average $22$. Find the arm's mean."), 26.8),
  num(m(DS, "apply-arm-control", "apply", 4, 35, "In the control arm (same stratum) $70\\%$ have a recorded change averaging $5$, and followed-up non-respondents average $3$. Find the arm's mean."), 4.4),
  num(m(DS, "apply-weighted-sum", "apply", 4, 40, "$600$ units are observed with outcome sum $18{,}000$. $100$ followed-up units ($\\rho = 0.25$) have outcome sum $2{,}200$. There are $1{,}000$ units in all. Find the weighted mean."), 26.8),
  mcq(m(DS, "apply-test-mar", "apply", 4, 35, "Double sampling makes MAR testable by comparing:"),
    "Recorded outcomes with followed-up outcomes among units with the same treatment and covariates",
    [
      ["Respondents' outcomes with their covariates", "ds-test-respondents", "That uses only respondents."],
      ["Treated with control units", "ds-test-arms", "That compares treatments."],
      ["Response rates across covariates", "ds-test-rates", "That checks MCAR, not MAR."],
    ]),
  // level 5
  short(m(DS, "explain-identification", "explain", 5, 180, "Explain why double sampling identifies $\\mathbb{E}[Y \\mid A = a, X]$ even when stage-one missingness is MNAR."),
    [
      ["decompose", "Split into respondents and non-respondents: $\\lambda\\,\\mathbb{E}[Y \\mid R = 1] + (1 - \\lambda)\\,\\mathbb{E}[Y \\mid R = 0]$ within $(a, X)$", 2, true],
      ["followup", "Because follow-up is random among non-respondents, $\\mathbb{E}[Y \\mid R = 0, a, X] = \\mathbb{E}[Y \\mid R = 0, S = 1, a, X]$, which is observed", 2, true],
      ["no-mar", "No assumption about how $R$ depends on $Y$ is needed", 1],
    ]),
  mcq(m(DS, "apply-followup-nonresponse", "apply", 5, 35, "Some patients selected for follow-up still cannot be reached. This:"),
    "Reintroduces possible MNAR bias, since the design assumes every selected unit yields its outcome",
    [
      ["Is harmless", "ds-fnr-harmless", "Those unreached may differ systematically."],
      ["Only reduces the sample size", "ds-fnr-size", "It can also bias."],
      ["Makes the data MCAR", "ds-fnr-mcar", "It does not change the mechanism to MCAR."],
    ]),
  num(m(DS, "apply-ate", "apply", 5, 30, "With arm means $26.8$ (surgery) and $4.4$ (control) in a stratum, find the stratum's treatment effect."), 22.4),
  mcq(m(DS, "apply-rho-known", "apply", 5, 35, "Why is it an advantage that $\\rho$ is set by the investigator?"),
    "The follow-up weights are known exactly, so no selection model has to be guessed for stage two",
    [
      ["It makes follow-up cheaper", "ds-rhoknown-cheap", "The advantage is statistical."],
      ["It makes stage one MAR", "ds-rhoknown-mar", "Stage one can still be MNAR."],
      ["It removes the need for covariates", "ds-rhoknown-cov", "Covariates are still needed for confounding."],
    ]),
  // level 6
  short(m(DS, "explain-np-vs-mar", "explain", 6, 180, "Compare the nonparametric double-sampling estimator with the estimator that assumes stage-one missingness was MAR."),
    [
      ["np", "The nonparametric estimator uses followed-up units to estimate non-respondents' outcomes and is valid under MNAR, but relies on a small follow-up sample, so it has larger variance", 2, true],
      ["mar", "The MAR-based estimator pools follow-up and recorded outcomes, gaining efficiency, but is biased if MAR fails", 2, true],
    ]),
  num(m(DS, "apply-component-se", "apply", 6, 45, "$40\\%$ of outcomes are missing. The non-respondents' mean is estimated from $100$ followed-up units with standard deviation $10$. Find this component's contribution to the standard error of the overall mean, $0.4 \\times \\frac{10}{\\sqrt{100}}$."), 0.4),
  num(m(DS, "apply-halve-se", "apply", 6, 40, "How many followed-up units would halve that contribution?"), 400),
  mcq(m(DS, "apply-adaptive", "apply", 6, 40, "An adaptive estimator in this setting:"),
    "Leans toward the MAR-based estimate when the data show little evidence against MAR, and toward the nonparametric one otherwise",
    [
      ["Always uses the MAR estimate", "ds-adaptive-mar", "That is not adaptive."],
      ["Discards the follow-up data", "ds-adaptive-discard", "Follow-up data provide the evidence."],
      ["Averages the two with equal weight", "ds-adaptive-equal", "Weights depend on the evidence."],
    ]),
  // level 7
  short(m(DS, "explain-quantile", "explain", 7, 210, "How do you estimate a quantile treatment effect with double-sampled outcomes?"),
    [
      ["weights", "Give each unit weight $w = R + \\frac{(1 - R)S}{\\rho}$, times the treatment weight $\\frac{1}{\\mathbb{P}(A = a \\mid X)}$", 2, true],
      ["equation", "Solve $\\sum_i w_i\\left(\\mathbb{I}\\lbrace Y_i \\le q \\rbrace - p\\right) = 0$ within each arm", 2, true],
      ["difference", "The effect is $q_1 - q_0$", 1, true],
    ]),
  num(m(DS, "apply-weighted-proportion", "apply", 7, 50, "$1{,}000$ patients: $600$ recorded, of whom $30\\%$ lost under $10$ kg; $400$ missing, of whom $100$ ($\\rho = 0.25$) were followed up and $50\\%$ lost under $10$ kg. Estimate the share losing under $10$ kg."), 0.38),
  num(m(DS, "apply-wald", "apply", 7, 40, "Followed-up non-respondents average $8$ kg less weight loss than respondents with the same covariates, with standard error $2$. Find the Wald statistic for $H_0$: MAR."), -4),
  mcq(m(DS, "apply-wald-meaning", "apply", 7, 40, "A Wald statistic of $-4$ for the MAR test suggests:"),
    "Strong evidence that stage-one missingness is not at random",
    [
      ["Strong evidence for MAR", "ds-wald-for", "Large $|z|$ is evidence against the null of MAR."],
      ["Nothing, since MAR is untestable", "ds-wald-untestable", "Double sampling makes it testable."],
      ["The treatment has no effect", "ds-wald-effect", "The test is about missingness."],
    ]),
  // level 8
  short(m(DS, "derive-ipw", "explain", 8, 240, "Show that $\\mathbb{E}\\left[\\left(R + \\frac{(1 - R)S}{\\rho(A, X)}\\right)Y \\,\\middle|\\, A, X\\right] = \\mathbb{E}[Y \\mid A, X]$."),
    [
      ["split", "Split into $\\mathbb{E}[RY \\mid A, X] + \\mathbb{E}\\left[\\frac{(1 - R)SY}{\\rho} \\,\\middle|\\, A, X\\right]$", 1, true],
      ["condition-s", "Condition on $R = 0$, $Y$: $\\mathbb{E}[S \\mid R = 0, A, X, Y] = \\rho(A, X)$ by the design assumption", 2, true],
      ["combine", "So the second term is $\\mathbb{E}[(1 - R)Y \\mid A, X]$ and the sum is $\\mathbb{E}[Y \\mid A, X]$", 2, true],
    ]),
  num(m(DS, "apply-aipw-followed", "apply", 8, 60, "Use $\\varphi_a = \\mu_a + \\frac{\\mathbb{I}\\lbrace A = a \\rbrace}{\\mathbb{P}(A = a \\mid X)}\\left[RY + (1 - R)\\left(m_0 + \\frac{S(Y - m_0)}{\\rho}\\right) - \\mu_a\\right]$ for a unit with $A = a$, $\\mathbb{P}(A = a \\mid X) = 0.5$, $R = 0$, $S = 1$, $Y = 20$, $m_0 = 22$, $\\rho = 0.25$ and $\\mu_a = 26.8$."), 1.2),
  num(m(DS, "apply-aipw-unsampled", "apply", 8, 50, "Same formula and values, but the unit was not followed up ($R = 0$, $S = 0$). Find $\\varphi_a$."), 17.2),
  mcq(m(DS, "apply-mar-efficient", "apply", 8, 45, "Why is the MAR-based estimator more efficient when MAR holds?"),
    "It can use the many stage-one respondents to estimate outcomes for non-respondents, rather than only the small follow-up sample",
    [
      ["It uses more covariates", "ds-mareff-cov", "Both can use the same covariates."],
      ["It ignores the follow-up data", "ds-mareff-ignore", "It pools them in."],
      ["It assumes MNAR", "ds-mareff-mnar", "It assumes MAR."],
    ]),
  // level 9
  short(m(DS, "transfer-design-bariatric", "transfer", 9, 240, "Design a double-sampling follow-up for an EHR bariatric surgery study with a fixed budget for phone surveys."),
    [
      ["sampling", "Randomly select non-respondents for follow-up with recorded probabilities, possibly stratified by arm and covariates", 2, true],
      ["allocation", "Allocate more follow-up where non-respondents are numerous or their outcomes variable, keeping every $\\rho > 0$", 1],
      ["completeness", "Invest to reach nearly all selected patients, since non-response at follow-up reintroduces bias", 2, true],
    ]),
  short(m(DS, "explain-test-limits", "explain", 9, 210, "What can a non-significant MAR test with double-sampled data tell you, and what can it not?"),
    [
      ["power", "Failing to reject may reflect low power from a small follow-up sample, not that MAR holds", 2, true],
      ["choice", "It can justify leaning on the more efficient MAR estimator only cautiously; pre-specified adaptive procedures account for this choice", 2, true],
    ]),
  num(m(DS, "apply-neyman", "apply", 9, 50, "Two strata have $300$ and $100$ non-respondents with outcome standard deviations $10$ and $30$. With $60$ follow-ups allocated in proportion to $N_h \\sigma_h$, how many go to the second stratum?"), 30),
  mcq(m(DS, "apply-ds-vs-sensitivity", "apply", 9, 45, "Compared with a sensitivity analysis alone, double sampling:"),
    "Replaces an unverifiable sensitivity parameter with data, at the cost of collecting extra outcomes",
    [
      ["Needs stronger assumptions", "ds-vs-stronger", "It needs design assumptions that are controlled, not stronger ones."],
      ["Is always cheaper", "ds-vs-cheaper", "Follow-up costs money."],
      ["Gives identical conclusions", "ds-vs-identical", "It can resolve what sensitivity analysis leaves open."],
    ]),
  // level 10
  short(m(DS, "explain-mar-bias", "explain", 10, 240, "If MAR fails, what is the bias of the MAR-based estimator of $\\mathbb{E}[Y \\mid A = a, X]$, in terms of $\\lambda$, $m_1$ and $m_0$?"),
    [
      ["mar-estimate", "The MAR estimator targets $m_1 = \\mathbb{E}[Y \\mid R = 1, a, X]$ (or pools toward it)", 2, true],
      ["truth", "The truth is $\\lambda m_1 + (1 - \\lambda) m_0$", 1, true],
      ["bias", "So the bias is $(1 - \\lambda)(m_1 - m_0)$: the missing share times the respondent–non-respondent gap", 2, true],
    ]),
  short(m(DS, "transfer-cost-tradeoff", "transfer", 10, 300, "Follow-up costs $\\$50$ per patient, and you can either follow up more non-respondents or enlarge the EHR cohort. How would you reason about the trade-off?"),
    [
      ["variance-sources", "Write the variance as a stage-one part (shrinks with cohort size) plus a non-respondent part (shrinks with follow-up count, scaled by the missing share squared)", 2, true],
      ["bias", "Enlarging the cohort does nothing about MNAR bias; only follow-up identifies non-respondents' outcomes", 2, true],
      ["optimise", "Allocate budget to minimise total variance per cost, ensuring enough follow-up to test MAR", 1],
    ]),
  num(m(DS, "apply-mar-bias-num", "apply", 10, 50, "In a stratum, $\\lambda = 0.6$, respondents average $m_1 = 30$ and followed-up non-respondents $m_0 = 22$. Find the bias of the MAR estimate, $(1 - \\lambda)(m_1 - m_0)$."), 3.2),
  mcq(m(DS, "apply-ds-qte-tails", "apply", 10, 60, "Why might a quantile treatment effect be more informative than the ATE for weight loss after surgery?"),
    "Surgery may shift the tails (very large losses or failures) differently from the average, which matters clinically",
    [
      ["Quantiles need no assumptions", "ds-qte-noassump", "They need the same identification assumptions."],
      ["The ATE is undefined for weight", "ds-qte-undefined", "The ATE is well defined."],
      ["Quantiles are always larger", "ds-qte-larger", "No such rule."],
    ]),
];

export const infer04Items: Item[] = [...doublyRobust, ...doubleSampling];
