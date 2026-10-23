import type { Item } from "../../lib/assessment/types";
import { m, mcq, num, short } from "./infer-shared";

/**
 * Missing data and causal effects, part 1: missingness mechanisms and
 * potential outcomes. Forty questions per lesson, four at each level.
 */

// ---------------------------------------------------------------------------
// missing-data-mechanisms
// ---------------------------------------------------------------------------
const MD = "missing-data-mechanisms";
const missing: Item[] = [
  // level 1
  mcq(m(MD, "recall-mcar", "recall", 1, 15, "Data are missing completely at random (MCAR) when:"),
    "Whether a value is missing is independent of both the observed and the missing data",
    [
      ["Missingness depends only on observed covariates", "md-mcar-mar", "That is MAR."],
      ["Missingness depends on the missing value itself", "md-mcar-mnar", "That is MNAR."],
      ["Fewer than $5\\%$ of values are missing", "md-mcar-amount", "The mechanism is about why, not how much."],
    ]),
  mcq(m(MD, "recall-mar", "recall", 1, 15, "Missing at random (MAR) means:"),
    "Given the observed covariates $X$, missingness is independent of the outcome: $R \\perp Y \\mid X$",
    [
      ["Missingness is independent of everything", "md-mar-mcar", "That is the stronger MCAR condition."],
      ["Values are missing at random positions in the file", "md-mar-positions", "The term is technical, not about layout."],
      ["Missingness depends on $Y$ given $X$", "md-mar-mnar", "That is MNAR."],
    ]),
  mcq(m(MD, "recall-mnar", "recall", 1, 15, "Missing not at random (MNAR) means:"),
    "The probability of missingness depends on the unobserved value even after conditioning on observed data",
    [
      ["Missingness is unrelated to anything", "md-mnar-mcar", "That is MCAR."],
      ["Missingness depends only on observed covariates", "md-mnar-mar", "That is MAR."],
      ["The data were deleted on purpose", "md-mnar-deliberate", "Intent is not the definition."],
    ]),
  mcq(m(MD, "recall-complete-case", "recall", 1, 15, "Complete-case analysis means:"),
    "Analysing only units with no missing values",
    [
      ["Filling in missing values with the mean", "md-cc-mean", "That is mean imputation."],
      ["Using every unit with weights", "md-cc-weights", "That is weighting."],
      ["Collecting the missing values later", "md-cc-follow", "That is follow-up or double sampling."],
    ]),
  // level 2
  mcq(m(MD, "apply-classify-sensor", "apply", 2, 20, "A lab instrument randomly fails on $3\\%$ of samples regardless of the sample. The missingness is:"),
    "MCAR",
    [
      ["MAR", "md-sensor-mar", "It does not depend on any variable."],
      ["MNAR", "md-sensor-mnar", "It does not depend on the missing value."],
      ["Impossible to classify", "md-sensor-unknown", "The mechanism is stated."],
    ]),
  mcq(m(MD, "apply-classify-income", "apply", 2, 20, "High earners are more likely to skip a survey's income question, even among people with the same job and education. The missingness is:"),
    "MNAR",
    [
      ["MCAR", "md-income-mcar", "It depends on income."],
      ["MAR", "md-income-mar", "It depends on income beyond the observed covariates."],
      ["Ignorable", "md-income-ignorable", "MNAR is non-ignorable."],
    ]),
  num(m(MD, "apply-complete-fraction", "apply", 2, 25, "Three variables are each missing for $10\\%$ of units, independently. What fraction of units are complete cases? Give $3$ decimal places."), 0.729),
  num(m(MD, "apply-ipw-weight", "apply", 2, 20, "Under MAR, units with $X = 1$ respond with probability $0.5$. Find the inverse probability weight for a responder with $X = 1$."), 2),
  // level 3
  num(m(MD, "apply-cc-mean", "apply", 3, 35, "Half of units have $X = 1$. Response rates are $0.9$ for $X = 0$ and $0.5$ for $X = 1$. Respondent means are $4$ and $8$. Find the complete-case mean. Give $4$ decimal places."), 5.4286),
  num(m(MD, "apply-mar-mean", "apply", 3, 30, "Same setting. Find the MAR estimate of $\\mathbb{E}[Y]$."), 6),
  mcq(m(MD, "apply-test-mcar", "apply", 3, 30, "Which can be checked from the observed data?"),
    "Whether missingness depends on observed covariates (evidence against MCAR)",
    [
      ["Whether MAR holds", "md-test-mar", "MAR versus MNAR is not testable from observed data alone."],
      ["Whether MNAR holds", "md-test-mnar", "Same problem: it involves unobserved values."],
      ["Whether missing values are larger than observed ones", "md-test-larger", "The missing values are unseen."],
    ]),
  num(m(MD, "apply-missing-share", "apply", 3, 25, "Same setting (half with $X = 1$, response rates $0.9$ and $0.5$). What fraction of all outcomes is missing?"), 0.3),
  // level 4
  num(m(MD, "apply-ipw-counts", "apply", 4, 40, "$100$ units have $X = 0$, of which $90$ respond with mean $4$; $100$ have $X = 1$, of which $50$ respond with mean $8$. Using response probabilities $0.9$ and $0.5$, find the IPW (Horvitz–Thompson) estimate of the mean."), 6),
  num(m(MD, "apply-delta", "apply", 4, 45, "Same setting (half with $X = 1$; rates $0.9$, $0.5$; respondent means $4$, $8$). Under the pattern-mixture model, non-respondents have mean $\\delta = -1$ below respondents with the same $X$. Find $\\mathbb{E}[Y]$."), 5.7),
  num(m(MD, "apply-tipping", "apply", 4, 45, "Same setting: the MAR estimate is $6$ and $30\\%$ of outcomes are missing. A shift $\\delta$ for all non-respondents changes the estimate to $6 + 0.3\\delta$. Find the $\\delta$ that makes the estimate $5$. Give $4$ decimal places."), -3.3333),
  mcq(m(MD, "apply-cc-regression", "apply", 4, 35, "Missingness in $Y$ depends only on the covariate $X$. A complete-case linear regression of $Y$ on $X$ (correctly specified) is:"),
    "Unbiased for the regression coefficients",
    [
      ["Biased, because the sample is unrepresentative", "md-ccreg-biased", "Selection on a predictor does not bias a correct regression."],
      ["Unbiased only under MCAR", "md-ccreg-mcar", "MAR on $X$ suffices for the conditional mean."],
      ["Undefined", "md-ccreg-undefined", "It is an ordinary regression on fewer units."],
    ]),
  // level 5
  short(m(MD, "explain-untestable", "explain", 5, 150, "Why can't the observed data distinguish MAR from MNAR?"),
    [
      ["unseen", "The data contain no outcome values for non-respondents, so the distribution of $Y$ among them is unconstrained", 2, true],
      ["equivalent-models", "For any MNAR model one can build a MAR model that reproduces exactly the same observed-data distribution", 2, true],
      ["consequence", "So MAR is an assumption, motivating sensitivity analyses or extra data", 1],
    ]),
  mcq(m(MD, "apply-omit-x", "apply", 5, 35, "Missingness depends on age, but your analysis of the mean does not use age. The result is:"),
    "Biased, because MAR helps only if you condition on (or weight by) the variables that drive missingness",
    [
      ["Unbiased, because the data are MAR", "md-omit-unbiased", "MAR given age requires using age."],
      ["Unbiased if the sample is large", "md-omit-large", "Bias does not shrink with size."],
      ["MNAR", "md-omit-mnar", "The mechanism is MAR; the analysis ignores it."],
    ]),
  mcq(m(MD, "apply-multiple-imputation", "apply", 5, 35, "Multiple imputation creates several completed datasets in order to:"),
    "Reflect uncertainty about the missing values in the final standard errors",
    [
      ["Remove the need for the MAR assumption", "md-mi-mnar", "Standard MI assumes MAR."],
      ["Increase the sample size", "md-mi-size", "It does not create real data."],
      ["Choose the best imputation", "md-mi-best", "Results are combined, not selected."],
    ]),
  num(m(MD, "apply-rubin-total", "apply", 5, 35, "With $m = 5$ imputations, the average within-imputation variance is $\\bar{W} = 0.04$ and the between-imputation variance is $B = 0.01$. Find the total variance $T = \\bar{W} + \\left(1 + \\frac{1}{m}\\right)B$."), 0.052),
  // level 6
  short(m(MD, "explain-cc-regression", "explain", 6, 180, "Explain why complete-case regression of $Y$ on $X$ is unbiased when missingness depends only on $X$, but biased when it depends on $Y$."),
    [
      ["x-only", "If $R$ depends only on $X$, then $\\mathbb{E}[Y \\mid X, R = 1] = \\mathbb{E}[Y \\mid X]$, so the conditional mean is unchanged among complete cases", 2, true],
      ["y-depends", "If $R$ depends on $Y$, the complete cases at a given $X$ over- or under-represent certain $Y$ values, distorting $\\mathbb{E}[Y \\mid X, R = 1]$", 2, true],
    ]),
  num(m(MD, "apply-rubin-se", "apply", 6, 35, "Continuing, $T = 0.052$. Find the standard error. Give $4$ decimal places."), 0.228),
  num(m(MD, "apply-fmi", "apply", 6, 45, "Using $\\frac{(1 + 1/m)B}{T}$ as the fraction of missing information, with $m = 5$, $B = 0.01$ and $T = 0.052$, find it. Give $4$ decimal places."), 0.2308),
  mcq(m(MD, "apply-mean-imputation", "apply", 6, 40, "Replacing every missing value with the observed mean and then analysing as if complete:"),
    "Understates variance and attenuates correlations",
    [
      ["Is unbiased for correlations under MCAR", "md-meanimp-corr", "Imputed points sit at the mean and weaken correlations."],
      ["Correctly reflects uncertainty", "md-meanimp-uncert", "It treats guesses as data."],
      ["Fixes MNAR", "md-meanimp-mnar", "It assumes missing values look like the average."],
    ]),
  // level 7
  short(m(MD, "explain-pattern-vs-selection", "explain", 7, 180, "Contrast selection models and pattern-mixture models for MNAR data."),
    [
      ["selection", "Selection models specify the outcome distribution and the probability of missingness given the outcome, $p(Y)\\,p(R \\mid Y)$", 2, true],
      ["pattern", "Pattern-mixture models specify the outcome distribution separately for each missingness pattern, $p(R)\\,p(Y \\mid R)$", 2, true],
      ["sensitivity", "Pattern-mixture parameters like a shift $\\delta$ are often easier to interpret for sensitivity analysis", 1],
    ]),
  num(m(MD, "apply-mnar-respondent-mean", "apply", 7, 50, "Binary $Y$ with $\\mathbb{P}(Y = 1) = 0.5$. Units with $Y = 1$ respond with probability $0.4$, units with $Y = 0$ with probability $0.8$. Find the mean of $Y$ among respondents. Give $4$ decimal places."), 0.3333),
  num(m(MD, "apply-mnar-bias", "apply", 7, 50, "Same setting. Find the bias of the respondent mean as an estimate of $\\mathbb{P}(Y = 1)$. Give $4$ decimal places."), -0.1667),
  mcq(m(MD, "apply-locf", "apply", 7, 40, "Last observation carried forward (LOCF) in a weight-loss study tends to:"),
    "Assume no change after dropout, which can bias the estimated trajectory and understate uncertainty",
    [
      ["Be valid under MAR", "md-locf-mar", "LOCF imposes a specific, often implausible MNAR-type assumption."],
      ["Always be conservative", "md-locf-conservative", "Its direction of bias depends on the true trajectory."],
      ["Reflect imputation uncertainty", "md-locf-uncertainty", "It is a single imputation."],
    ]),
  // level 8
  short(m(MD, "transfer-sensitivity-design", "transfer", 8, 210, "Design a sensitivity analysis for an EHR study where $5$-year weight is missing for $40\\%$ of patients."),
    [
      ["primary", "Start from a MAR analysis using all relevant recorded covariates", 1, true],
      ["delta", "Vary a shift $\\delta$ for non-respondents (possibly by treatment arm) and recompute the estimate and interval", 2, true],
      ["tipping", "Report the tipping point and judge its plausibility with clinical input", 2, true],
    ]),
  num(m(MD, "apply-flip-delta", "apply", 8, 50, "Under MAR the treated mean is $10$ and the control mean $8$. $40\\%$ of treated outcomes are missing. If treated non-respondents are shifted by $\\delta$ (controls unchanged), the treated mean becomes $10 + 0.4\\delta$. Find the $\\delta$ that makes the effect zero."), -5),
  num(m(MD, "apply-manski-width", "apply", 8, 50, "$Y \\in [0, 1]$, $30\\%$ of outcomes are missing and the observed mean is $0.6$. Without assumptions, $\\mathbb{E}[Y]$ lies between $0.7 \\times 0.6 + 0.3 \\times 0$ and $0.7 \\times 0.6 + 0.3 \\times 1$. Find the width of this interval."), 0.3),
  mcq(m(MD, "apply-mar-plausible", "apply", 8, 45, "Which makes MAR more plausible in an EHR study?"),
    "Recording rich covariates that drive both follow-up and the outcome, such as prior weight and visit history",
    [
      ["Increasing the sample size", "md-plaus-size", "Size does not change the mechanism."],
      ["Using fewer covariates", "md-plaus-fewer", "Fewer covariates make MAR less plausible."],
      ["Deleting incomplete records", "md-plaus-delete", "That is complete-case analysis."],
    ]),
  // level 9
  short(m(MD, "transfer-bariatric", "transfer", 9, 240, "In an EHR study of weight after bariatric surgery, why might the outcome be MNAR, and what would that do to a MAR-based estimate?"),
    [
      ["mechanism", "Patients who regain weight or have poor outcomes may avoid follow-up visits, so missingness depends on the outcome itself", 2, true],
      ["direction", "A MAR estimate would then overstate weight loss (non-respondents look worse than similar respondents)", 2, true],
      ["covariates-insufficient", "Recorded covariates cannot fully capture this", 1],
    ]),
  short(m(MD, "explain-not-actionable", "explain", 9, 210, "Why are sensitivity analyses sometimes “not guaranteed to yield actionable conclusions”?"),
    [
      ["range", "They report a range of answers over unidentified parameters rather than one estimate", 2, true],
      ["plausible-flip", "If the conclusion flips at a value of the sensitivity parameter that experts find plausible, the study cannot decide", 2, true],
      ["need-data", "Resolving it requires extra information, such as data on non-respondents", 1],
    ]),
  num(m(MD, "apply-manski-lower", "apply", 9, 50, "In the previous bounds question ($30\\%$ missing, observed mean $0.6$, $Y \\in [0, 1]$), find the lower bound."), 0.42),
  mcq(m(MD, "apply-identify-mnar", "apply", 9, 45, "Which extra information can identify a mean under MNAR?"),
    "Outcomes for a random subsample of the non-respondents",
    [
      ["More covariates on respondents only", "md-ident-cov", "Respondent data cannot reveal non-respondents' outcomes."],
      ["A larger sample from the same process", "md-ident-larger", "The same missingness persists."],
      ["A different imputation model", "md-ident-impute", "Any imputation model is an assumption."],
    ]),
  // level 10
  short(m(MD, "derive-mar-mnar-equivalence", "explain", 10, 240, "Show that for any MNAR model there is a MAR model with the same observed-data distribution."),
    [
      ["observed-law", "The observed data determine only $p(X)$, $p(R \\mid X)$ and $p(Y \\mid X, R = 1)$", 2, true],
      ["construct", "Define a MAR model by keeping these and setting $p(Y \\mid X, R = 0) = p(Y \\mid X, R = 1)$", 2, true],
      ["conclusion", "Both models generate identical observed data, so no test based on the observed data can tell them apart", 1, true],
    ]),
  short(m(MD, "explain-mi-vs-weighting", "explain", 10, 240, "Compare multiple imputation and inverse probability weighting under MAR in terms of the models they need and their failure modes."),
    [
      ["mi", "MI needs a correct model for the outcome given covariates; misspecifying it biases results", 2, true],
      ["ipw", "IPW needs a correct model for the response probability; extreme weights inflate variance", 2, true],
      ["dr", "Augmented (doubly robust) estimators combine both and stay consistent if either model is right", 1],
    ]),
  num(m(MD, "apply-mar-ipw-binary", "apply", 10, 60, "$40\\%$ of units have $X = 1$. Response probabilities are $0.5$ ($X = 0$) and $0.8$ ($X = 1$), and respondent means are $0.2$ ($X = 0$) and $0.7$ ($X = 1$). Find the complete-case mean minus the MAR mean. Give $4$ decimal places."), 0.0581),
  mcq(m(MD, "apply-auxiliary", "apply", 10, 60, "Adding an auxiliary variable that predicts both missingness and the outcome (but is not of scientific interest) to the imputation model:"),
    "Can make MAR more plausible and improve efficiency",
    [
      ["Always biases the analysis", "md-aux-bias", "Auxiliary variables are recommended for exactly this reason."],
      ["Is only allowed under MCAR", "md-aux-mcar", "They are most useful when data are not MCAR."],
      ["Has no effect on the estimate", "md-aux-none", "They change the imputations."],
    ]),
];

// ---------------------------------------------------------------------------
// potential-outcomes
// ---------------------------------------------------------------------------
const PO = "potential-outcomes";
const outcomes: Item[] = [
  // level 1
  mcq(m(PO, "recall-potential", "recall", 1, 15, "The potential outcome $Y(1)$ is:"),
    "The outcome a unit would have if it received treatment",
    [
      ["The observed outcome of treated units", "po-pot-observed", "It is defined for every unit, treated or not."],
      ["The probability of treatment", "po-pot-propensity", "That is the propensity score."],
      ["The treatment effect", "po-pot-effect", "The effect compares $Y(1)$ with $Y(0)$."],
    ]),
  mcq(m(PO, "recall-ate", "recall", 1, 15, "The average treatment effect is:"),
    "$\\mathbb{E}[Y(1) - Y(0)]$",
    [
      ["$\\mathbb{E}[Y \\mid A = 1] - \\mathbb{E}[Y \\mid A = 0]$", "po-ate-naive", "That is the observed difference, equal to the ATE only without confounding."],
      ["$\\mathbb{E}[Y(1)]$", "po-ate-y1", "That is one mean counterfactual."],
      ["$\\mathbb{P}(A = 1)$", "po-ate-pa", "That is the treatment rate."],
    ]),
  mcq(m(PO, "recall-fundamental", "recall", 1, 15, "The fundamental problem of causal inference is that:"),
    "Each unit reveals at most one of its potential outcomes",
    [
      ["Treatments are expensive", "po-fund-cost", "A practical issue, not the fundamental one."],
      ["Outcomes are noisy", "po-fund-noise", "Noise is a separate issue."],
      ["Samples are small", "po-fund-small", "Even infinite data never show both outcomes for one unit."],
    ]),
  mcq(m(PO, "recall-positivity", "recall", 1, 15, "Positivity requires that:"),
    "Every covariate pattern has a nonzero chance of each treatment: $0 < e(X) < 1$",
    [
      ["All outcomes are positive", "po-pos-outcome", "Outcomes can be any value."],
      ["The treatment effect is positive", "po-pos-effect", "Positivity is about treatment probabilities."],
      ["Everyone is treated", "po-pos-all", "That violates positivity for the control arm."],
    ]),
  // level 2
  num(m(PO, "apply-unit-effect", "apply", 2, 15, "A unit has $Y(1) = 7$ and $Y(0) = 4$. Find its individual treatment effect."), 3),
  num(m(PO, "apply-oracle-ate", "apply", 2, 25, "Four units have $Y(1) = [5, 3, 6, 2]$ and $Y(0) = [4, 3, 2, 3]$. Find the ATE."), 1),
  num(m(PO, "apply-consistency", "apply", 2, 15, "A treated unit ($A = 1$) has $Y(1) = 5$ and $Y(0) = 2$. Find its observed outcome $Y$."), 5),
  mcq(m(PO, "apply-rct", "apply", 2, 20, "In a randomized trial, the difference in mean outcomes between arms is:"),
    "Unbiased for the ATE, because randomization makes treatment independent of the potential outcomes",
    [
      ["Biased, since the groups differ by chance", "po-rct-chance", "Chance imbalances average out; there is no bias."],
      ["Unbiased only for large samples", "po-rct-large", "It is unbiased for any size."],
      ["Equal to the effect for every unit", "po-rct-every", "It estimates an average."],
    ]),
  // level 3
  num(m(PO, "apply-diff-means", "apply", 3, 20, "In a randomized trial, the treated mean is $12$ and the control mean is $9$. Estimate the ATE."), 3),
  num(m(PO, "apply-ipw-weight-treated", "apply", 3, 20, "A treated unit has propensity score $e(X) = 0.25$. Find its IPW weight $\\frac{1}{e(X)}$."), 4),
  num(m(PO, "apply-ipw-weight-control", "apply", 3, 25, "A control unit has propensity score $e(X) = 0.25$. Find its IPW weight $\\frac{1}{1 - e(X)}$. Give $4$ decimal places."), 1.3333),
  mcq(m(PO, "apply-sutva", "apply", 3, 30, "Vaccinating one person lowers their neighbours' infection risk. This violates:"),
    "No interference (part of SUTVA)",
    [
      ["Positivity", "po-sutva-positivity", "Positivity is about treatment probabilities."],
      ["No unmeasured confounding", "po-sutva-confounding", "The issue is one unit's treatment affecting another's outcome."],
      ["Randomization", "po-sutva-random", "Even a randomized trial has this problem."],
    ]),
  // level 4
  num(m(PO, "apply-g-formula", "apply", 4, 35, "$\\mathbb{P}(X = 1) = 0.3$. Mean outcomes: treated $6$ ($X = 0$) and $10$ ($X = 1$); control $4$ ($X = 0$) and $5$ ($X = 1$). Find the ATE by the g-formula."), 2.9),
  num(m(PO, "apply-naive-confounded", "apply", 4, 50, "Same setting with $e(0) = 0.2$ and $e(1) = 0.8$. Find the naive difference $\\mathbb{E}[Y \\mid A = 1] - \\mathbb{E}[Y \\mid A = 0]$. Give $4$ decimal places."), 4.4295),
  num(m(PO, "apply-ipw-y1", "apply", 4, 40, "Four units have $A = [1, 0, 1, 0]$, $Y = [6, 2, 8, 3]$ and $e = [0.5, 0.5, 0.8, 0.4]$. Find the IPW estimate $\\frac{1}{n}\\sum \\frac{A_i Y_i}{e_i}$ of $\\mathbb{E}[Y(1)]$."), 5.5),
  mcq(m(PO, "apply-att", "apply", 4, 30, "The ATT differs from the ATE because it averages the effect over:"),
    "Only the units that actually received treatment",
    [
      ["Only the control units", "po-att-control", "That is the ATC."],
      ["The whole population", "po-att-population", "That is the ATE."],
      ["Units with positive effects", "po-att-positive", "Individual effects are unobservable."],
    ]),
  // level 5
  short(m(PO, "explain-g-formula", "explain", 5, 180, "Derive $\\mathbb{E}[Y(1)] = \\mathbb{E}\\left[\\mathbb{E}[Y \\mid A = 1, X]\\right]$, naming each assumption used."),
    [
      ["tower", "Write $\\mathbb{E}[Y(1)] = \\mathbb{E}\\left[\\mathbb{E}[Y(1) \\mid X]\\right]$", 1, true],
      ["exchangeability", "No unmeasured confounding gives $\\mathbb{E}[Y(1) \\mid X] = \\mathbb{E}[Y(1) \\mid A = 1, X]$", 2, true],
      ["consistency-positivity", "Consistency gives $\\mathbb{E}[Y(1) \\mid A = 1, X] = \\mathbb{E}[Y \\mid A = 1, X]$, well defined by positivity", 2, true],
    ]),
  mcq(m(PO, "apply-unmeasured", "apply", 5, 35, "Doctors give a drug to patients they judge frail, using information not in the database. This threatens:"),
    "No unmeasured confounding",
    [
      ["Consistency", "po-unmeas-consistency", "The treatment is well defined."],
      ["Positivity", "po-unmeas-positivity", "Both treatments still occur."],
      ["Nothing, if the sample is large", "po-unmeas-large", "Confounding bias does not vanish with size."],
    ]),
  mcq(m(PO, "apply-positivity-violation", "apply", 5, 35, "A surgery is never performed on patients over $80$. Estimating its ATE for the whole population:"),
    "Violates positivity, so the effect for patients over $80$ cannot be learned from the data",
    [
      ["Is fine with IPW", "po-posv-ipw", "IPW would divide by zero."],
      ["Only violates SUTVA", "po-posv-sutva", "The issue is a zero treatment probability."],
      ["Is fine with a larger sample", "po-posv-large", "More data still contain no treated patients over $80$."],
    ]),
  num(m(PO, "apply-ipw-y0", "apply", 5, 40, "Same four units ($A = [1, 0, 1, 0]$, $Y = [6, 2, 8, 3]$, $e = [0.5, 0.5, 0.8, 0.4]$). Find the IPW estimate $\\frac{1}{n}\\sum \\frac{(1 - A_i) Y_i}{1 - e_i}$ of $\\mathbb{E}[Y(0)]$."), 2.25),
  // level 6
  short(m(PO, "explain-missing-data-view", "explain", 6, 180, "Explain the sense in which causal inference is a missing-data problem."),
    [
      ["missing-po", "For each unit one potential outcome is observed and the other is missing", 2, true],
      ["mechanism", "Treatment assignment plays the role of the missingness indicator", 1, true],
      ["mar-analogue", "No unmeasured confounding is the analogue of MAR, and IPW/imputation methods carry over", 2, true],
    ]),
  num(m(PO, "apply-ipw-ate", "apply", 6, 30, "Using the previous two estimates ($5.5$ and $2.25$), find the IPW estimate of the ATE."), 3.25),
  num(m(PO, "apply-qte", "apply", 6, 40, "In a large randomized trial, the median outcome is $30$ in the treated arm and $22$ in the control arm. Find the median (quantile) treatment effect at $p = 0.5$."), 8),
  mcq(m(PO, "apply-qte-meaning", "apply", 6, 40, "A quantile treatment effect of $8$ at the median means:"),
    "The median of $Y(1)$ exceeds the median of $Y(0)$ by $8$",
    [
      ["The median individual effect is $8$", "po-qte-individual", "QTEs compare marginal distributions, not individual effects."],
      ["Half the patients benefit by at least $8$", "po-qte-half", "That is a statement about individual effects."],
      ["The ATE is $8$", "po-qte-ate", "Means and medians differ."],
    ]),
  // level 7
  short(m(PO, "explain-individual-unidentified", "explain", 7, 180, "Why can the ATE be identified from a randomized trial while the share of patients harmed by treatment cannot?"),
    [
      ["margins", "Randomization identifies the marginal distributions of $Y(1)$ and $Y(0)$, hence their means", 2, true],
      ["joint", "The share harmed depends on the joint distribution of $(Y(1), Y(0))$, which is never observed", 2, true],
      ["bounds", "Only bounds (e.g. Fréchet–Hoeffding) are available without further assumptions", 1],
    ]),
  num(m(PO, "apply-confounding-bias", "apply", 7, 60, "$\\mathbb{P}(X = 1) = 0.5$, $e(0) = 0.1$, $e(1) = 0.9$. Treated means are $2$ ($X = 0$) and $8$ ($X = 1$); control means $1$ and $7$. Find the naive difference minus the ATE."), 4.8),
  num(m(PO, "apply-ate-strata", "apply", 7, 40, "Same setting. Find the ATE."), 1),
  mcq(m(PO, "apply-trimming", "apply", 7, 45, "Restricting analysis to units with $0.1 < \\hat{e}(X) < 0.9$:"),
    "Improves stability but changes the target to the effect in the overlap population",
    [
      ["Leaves the target unchanged", "po-trim-same", "Excluded units change the population averaged over."],
      ["Introduces confounding", "po-trim-confounding", "It changes the estimand, not confounding."],
      ["Is always invalid", "po-trim-invalid", "It is common practice when the estimand is reported honestly."],
    ]),
  // level 8
  short(m(PO, "explain-balancing", "explain", 8, 210, "Explain why it suffices to adjust for the propensity score $e(X)$ instead of all of $X$."),
    [
      ["balancing", "$e(X)$ is a balancing score: $X \\perp A \\mid e(X)$", 2, true],
      ["inherit", "If $A \\perp Y(a) \\mid X$, then also $A \\perp Y(a) \\mid e(X)$", 2, true],
      ["practice", "So matching, stratifying or weighting on the one-dimensional $e(X)$ removes confounding by $X$", 1],
    ]),
  num(m(PO, "apply-stabilized", "apply", 8, 40, "$\\mathbb{P}(A = 1) = 0.4$ and a treated unit has $e(X) = 0.8$. Find its stabilised weight $\\frac{\\mathbb{P}(A = 1)}{e(X)}$."), 0.5),
  num(m(PO, "apply-att-weight", "apply", 8, 40, "For the ATT, control units are weighted by $\\frac{e(X)}{1 - e(X)}$. Find this weight for a control unit with $e(X) = 0.6$."), 1.5),
  mcq(m(PO, "apply-post-treatment", "apply", 8, 45, "Adjusting for a variable measured after treatment that treatment affects (e.g. post-surgery diet adherence):"),
    "Can bias the total effect estimate, since it blocks part of the effect or opens collider paths",
    [
      ["Always reduces bias", "po-post-reduce", "Adjusting for mediators changes the estimand."],
      ["Is needed for no unmeasured confounding", "po-post-needed", "Confounders are pre-treatment."],
      ["Has no effect", "po-post-none", "It can change the estimate substantially."],
    ]),
  // level 9
  short(m(PO, "transfer-bariatric-design", "transfer", 9, 240, "Plan an EHR analysis of the effect of bariatric surgery versus usual care on $5$-year weight. What assumptions must you defend, and how?"),
    [
      ["confounders", "Measure pre-surgery confounders such as baseline BMI, age, comorbidities and insurance, to defend no unmeasured confounding", 2, true],
      ["positivity", "Check overlap of propensity scores between surgery and non-surgery patients", 1, true],
      ["missingness", "Address missing $5$-year outcomes, which may be MNAR, as a separate threat", 2, true],
    ]),
  short(m(PO, "explain-unmeasured-sensitivity", "explain", 9, 210, "What does an E-value report, and why is it useful when no unmeasured confounding cannot be verified?"),
    [
      ["definition", "The minimum strength of association (risk ratio) an unmeasured confounder would need with both treatment and outcome to explain away the observed effect", 2, true],
      ["use", "Large E-values mean only implausibly strong confounding could overturn the result; small ones flag fragility", 2, true],
    ]),
  num(m(PO, "apply-e-value", "apply", 9, 40, "For an observed risk ratio $\\text{RR} = 2$, the E-value is $\\text{RR} + \\sqrt{\\text{RR}(\\text{RR} - 1)}$. Find it. Give $4$ decimal places."), 3.4142),
  mcq(m(PO, "apply-ipw-misspec", "apply", 9, 45, "IPW with a misspecified propensity model and outcome regression with a correct outcome model will typically give:"),
    "A biased IPW estimate and a consistent regression estimate",
    [
      ["Both consistent", "po-misspec-both", "IPW needs a correct propensity model."],
      ["Both biased", "po-misspec-bothbad", "The outcome model is correct."],
      ["Identical answers", "po-misspec-same", "They differ when one model is wrong."],
    ]),
  // level 10
  short(m(PO, "derive-ipw", "explain", 10, 240, "Prove that $\\mathbb{E}\\left[\\frac{A\\,Y}{e(X)}\\right] = \\mathbb{E}[Y(1)]$ under consistency, no unmeasured confounding and positivity."),
    [
      ["consistency", "Use consistency: $A\\,Y = A\\,Y(1)$", 1, true],
      ["condition", "Condition on $X$: $\\mathbb{E}[A\\,Y(1) \\mid X] = \\mathbb{E}[A \\mid X]\\,\\mathbb{E}[Y(1) \\mid X] = e(X)\\,\\mathbb{E}[Y(1) \\mid X]$ by no unmeasured confounding", 2, true],
      ["cancel", "Divide by $e(X) > 0$ (positivity) and take the outer expectation", 2, true],
    ]),
  short(m(PO, "transfer-qte-estimation", "transfer", 10, 240, "Describe how to estimate the quantile treatment effect at $p = 0.9$ from observational data with confounders $X$."),
    [
      ["weighted-cdf", "Estimate the distribution of $Y(a)$ with IPW: weight units with $A = a$ by $\\frac{1}{\\mathbb{P}(A = a \\mid X)}$ in the empirical CDF", 2, true],
      ["solve", "Solve the weighted estimating equation $\\sum_i w_i\\left(\\mathbb{I}\\lbrace Y_i \\le q \\rbrace - 0.9\\right) = 0$ for each arm", 2, true],
      ["difference", "Take the difference $q_1 - q_0$, with bootstrap intervals", 1],
    ]),
  num(m(PO, "apply-manski-ate", "apply", 10, 75, "Binary $Y$. $\\mathbb{P}(A = 1) = 0.5$, $\\mathbb{E}[Y \\mid A = 1] = 0.6$ and $\\mathbb{E}[Y \\mid A = 0] = 0.4$. With no assumptions on the unobserved potential outcomes, find the lower bound on the ATE."), -0.4),
  mcq(m(PO, "apply-manski-width", "apply", 10, 60, "The no-assumption bounds on the ATE for a binary outcome always have width:"),
    "$1$, and so always include $0$",
    [
      ["$0$", "po-manski-zero", "Without assumptions the ATE is not point identified."],
      ["$2$", "po-manski-two", "The observed data cut the possible range $[-1, 1]$ in half."],
      ["It depends on the sample size", "po-manski-n", "These are population bounds."],
    ]),
];

export const infer03Items: Item[] = [...missing, ...outcomes];
