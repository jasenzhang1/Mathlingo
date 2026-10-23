import type { Item } from "../../lib/assessment/types";
import { m, mcq, num, short } from "./infer-shared";

/**
 * Inference with predictions, part 1: conformal prediction and selection bias
 * with inverse probability weighting. Forty questions per lesson, four at each
 * level from 1 to 10.
 */

// ---------------------------------------------------------------------------
// conformal-prediction
// ---------------------------------------------------------------------------
const CP = "conformal-prediction";
const conformal: Item[] = [
  // level 1
  mcq(m(CP, "recall-guarantee", "recall", 1, 15, "Split conformal prediction guarantees that the prediction set $C(X_{n+1})$ satisfies:"),
    "$\\mathbb{P}\\left(Y_{n+1} \\in C(X_{n+1})\\right) \\ge 1 - \\alpha$, averaged over the data",
    [
      ["$\\mathbb{P}\\left(Y \\in C(x) \\mid X = x\\right) \\ge 1 - \\alpha$ for every $x$", "cp-conditional", "That is conditional coverage, which conformal does not guarantee."],
      ["The model's predictions are unbiased", "cp-unbiased", "Conformal says nothing about the model's bias; it only certifies set coverage."],
      ["The interval is the shortest possible", "cp-shortest", "Coverage is guaranteed; optimal width is not."],
    ]),
  mcq(m(CP, "recall-exchangeability", "recall", 1, 15, "The one assumption split conformal prediction needs about the data is:"),
    "The calibration points and the test point are exchangeable",
    [
      ["The errors are normally distributed", "cp-normal", "Conformal is distribution-free; no normality is needed."],
      ["The model is correctly specified", "cp-correct-model", "The guarantee holds for any model, even a bad one."],
      ["The features are independent of each other", "cp-indep-features", "Nothing is assumed about the dependence among features."],
    ]),
  mcq(m(CP, "recall-score", "recall", 1, 15, "In conformal prediction, a nonconformity score $s(x, y)$ is:"),
    "A number that is larger when $y$ looks less consistent with the model's prediction at $x$",
    [
      ["The model's accuracy on the test set", "cp-score-accuracy", "It is computed per point, not as an overall accuracy."],
      ["The probability that $y$ is correct", "cp-score-prob", "Larger scores mean worse fit; it need not be a probability."],
      ["The training loss of the model", "cp-score-train", "Scores are computed on calibration data, not training data."],
    ]),
  mcq(m(CP, "recall-calibration-set", "recall", 1, 15, "In split conformal prediction, the calibration set is used to:"),
    "Compute the scores whose empirical quantile sets the size of the prediction sets",
    [
      ["Fit the model's parameters", "cp-calib-fit", "The model is fit on a separate training split."],
      ["Choose the significance level $\\alpha$", "cp-calib-alpha", "$\\alpha$ is chosen by the user in advance."],
      ["Test whether the data are exchangeable", "cp-calib-test", "Exchangeability is assumed, not tested by the calibration step."],
    ]),
  // level 2
  num(m(CP, "apply-rank-19", "apply", 2, 20, "With $n = 19$ calibration scores and $\\alpha = 0.1$, $\\hat{q}$ is the $k$-th smallest score. Find $k$."), 18),
  num(m(CP, "apply-rank-99", "apply", 2, 20, "With $n = 99$ calibration scores and $\\alpha = 0.05$, $\\hat{q}$ is the $k$-th smallest score. Find $k$."), 95),
  num(m(CP, "apply-upper-endpoint", "apply", 2, 20, "A regression model predicts $\\hat{f}(x) = 5$ and the conformal quantile of absolute residuals is $\\hat{q} = 1.2$. Find the upper endpoint of the prediction interval."), 6.2),
  mcq(m(CP, "apply-class-score", "apply", 2, 20, "For a classifier with predicted class probabilities $\\hat{p}_y(x)$, a standard conformal score is:"),
    "$1 - \\hat{p}_y(x)$, using the probability of the true label $y$",
    [
      ["$\\hat{p}_y(x)$", "cp-class-sign", "Scores must be large for poorly fitting labels; this is reversed."],
      ["$\\max_k \\hat{p}_k(x)$", "cp-class-max", "That ignores the true label entirely."],
      ["The predicted label's index", "cp-class-index", "An index carries no measure of fit."],
    ]),
  // level 3
  num(m(CP, "apply-qhat-list", "apply", 3, 30, "Calibration absolute residuals are $0.3, 0.7, 0.8, 1.0, 1.2, 1.5, 1.9, 2.4, 2.8$. Find $\\hat{q}$ for $\\alpha = 0.2$."), 2.4),
  num(m(CP, "apply-upper-coverage", "apply", 3, 25, "With $n = 49$ calibration points, continuous scores and $\\alpha = 0.1$, coverage is at most $1 - \\alpha + \\frac{1}{n+1}$. Find this upper bound."), 0.92),
  num(m(CP, "apply-min-n", "apply", 3, 30, "What is the smallest number of calibration points $n$ for which a $95\\%$ split conformal interval is finite?"), 19),
  mcq(m(CP, "apply-constant-width", "apply", 3, 25, "With the score $|y - \\hat{f}(x)|$, the conformal interval's width:"),
    "Is the same, $2\\hat{q}$, at every $x$",
    [
      ["Grows where the model is uncertain", "cp-width-adaptive", "Absolute residuals give a constant band; adaptivity needs a scaled score."],
      ["Shrinks to zero as $n$ grows", "cp-width-zero", "It converges to a quantile of the residual distribution, not zero."],
      ["Depends on the test label", "cp-width-label", "The set is built without knowing the test label."],
    ]),
  // level 4
  num(m(CP, "apply-class-set-size", "apply", 4, 40, "A classifier outputs probabilities $[0.55, 0.25, 0.15, 0.05]$ for four classes, and the conformal threshold on the score $1 - \\hat{p}_y$ is $\\hat{q} = 0.8$. How many classes are in the prediction set?"), 2),
  num(m(CP, "apply-normalized-width", "apply", 4, 40, "With the score $\\frac{|y - \\hat{f}(x)|}{\\hat{\\sigma}(x)}$, the calibrated quantile is $\\hat{q} = 2$. At a point with $\\hat{\\sigma}(x) = 0.5$, find the width of the prediction interval."), 2),
  num(m(CP, "apply-cqr-width", "apply", 4, 40, "In conformalized quantile regression the fitted quantiles at $x$ are $\\hat{q}_{\\text{lo}}(x) = 3$ and $\\hat{q}_{\\text{hi}}(x) = 7$, and the calibrated correction is $\\hat{q} = 0.5$. Find the width of the interval $\\left[\\hat{q}_{\\text{lo}} - \\hat{q},\\; \\hat{q}_{\\text{hi}} + \\hat{q}\\right]$."), 5),
  mcq(m(CP, "apply-bad-model", "apply", 4, 30, "You apply split conformal to a poorly fitting model. Compared with a good model, the sets will:"),
    "Still have $1 - \\alpha$ coverage, but be wider",
    [
      ["Lose their coverage guarantee", "cp-bad-invalid", "Validity does not depend on model quality."],
      ["Have the same width", "cp-bad-same", "Larger residuals give a larger quantile and wider sets."],
      ["Become empty", "cp-bad-empty", "Poor fit makes sets larger, not empty."],
    ]),
  // level 5
  short(m(CP, "explain-rank-argument", "explain", 5, 150, "Explain why the split conformal interval covers a new point with probability at least $1 - \\alpha$."),
    [
      ["exchangeable-rank", "Under exchangeability the rank of the new score among the $n + 1$ scores is uniform", 2, true],
      ["quantile-choice", "Taking the $\\lceil (n+1)(1-\\alpha) \\rceil$-th smallest calibration score makes the probability the new score falls at or below it at least $1 - \\alpha$", 2, true],
      ["set-equivalence", "The new label is in the set exactly when its score is at most $\\hat{q}$", 1],
    ]),
  mcq(m(CP, "apply-marginal-meaning", "apply", 5, 35, "A $90\\%$ conformal model is evaluated separately on young and old patients. Coverage is $97\\%$ for young and $78\\%$ for old. This is:"),
    "Consistent with the guarantee, which is marginal over the population",
    [
      ["Impossible if exchangeability holds", "cp-marginal-impossible", "The guarantee averages over $X$; subgroups can differ."],
      ["Proof that the calibration was done wrong", "cp-marginal-bug", "Uneven subgroup coverage is expected with a constant-width score."],
      ["Fixed by collecting more calibration data", "cp-marginal-more-data", "More data sharpens marginal coverage; it does not equalise subgroups."],
    ]),
  mcq(m(CP, "apply-time-series", "apply", 5, 35, "Why can split conformal fail on a time series calibrated on last year's data?"),
    "Later observations are not exchangeable with earlier ones when the series drifts",
    [
      ["Time series have too many points", "cp-ts-size", "Size is not the problem; dependence and drift are."],
      ["Residuals of time series are always negative", "cp-ts-sign", "There is no such rule."],
      ["Conformal needs normal errors", "cp-ts-normal", "Conformal never needs normal errors."],
    ]),
  num(m(CP, "apply-rank-999", "apply", 5, 30, "With $n = 999$ calibration points and $\\alpha = 0.1$, $\\hat{q}$ is the $k$-th smallest score. Find $k$."), 900),
  // level 6
  short(m(CP, "explain-separate-calibration", "explain", 6, 150, "Why must the calibration scores come from data not used to fit the model?"),
    [
      ["overfit-residuals", "Residuals on training data are systematically smaller because the model has fit them", 2, true],
      ["undercoverage", "The quantile would then be too small, so new points would be covered less than $1 - \\alpha$ of the time", 2, true],
      ["exchangeability-broken", "Training scores are not exchangeable with a new point's score", 1],
    ]),
  num(m(CP, "apply-cqr-negative", "apply", 6, 45, "In conformalized quantile regression the fitted quantiles at $x$ are $2$ and $8$, and the calibrated correction is $\\hat{q} = -0.5$ (the quantile model was too conservative). Find the width of the final interval."), 5),
  num(m(CP, "apply-exact-coverage", "apply", 6, 45, "With $n = 9$ calibration points, continuous scores and $\\alpha = 0.25$, the exact coverage is $\\frac{k}{n+1}$, where $k$ is the rank used. Find the exact coverage."), 0.8),
  mcq(m(CP, "apply-mondrian", "apply", 6, 40, "To get $90\\%$ coverage within each of several pre-specified groups, you should:"),
    "Calibrate a separate quantile within each group (group-conditional conformal)",
    [
      ["Use a smaller $\\alpha$ for the whole population", "cp-mondrian-alpha", "That raises average coverage but does not target each group."],
      ["Use more training data", "cp-mondrian-train", "Training data does not change calibration within groups."],
      ["Use the median instead of a quantile", "cp-mondrian-median", "The median gives roughly $50\\%$ coverage."],
    ]),
  // level 7
  short(m(CP, "transfer-covariate-shift", "transfer", 7, 180, "Test inputs come from a different distribution than the calibration inputs, but $Y \\mid X$ is unchanged. How can conformal prediction be adjusted, and what does it need?"),
    [
      ["weighting", "Reweight the calibration scores (and the test point) by the likelihood ratio $\\frac{dP_{\\text{test}}}{dP_{\\text{train}}}(x)$ and use a weighted quantile", 2, true],
      ["ratio-estimation", "Requires knowing or estimating that density ratio, e.g. with a classifier distinguishing calibration from test inputs", 2, true],
      ["link-ipw", "Recognises this as the same inverse-probability idea as correcting selection bias", 1],
    ]),
  num(m(CP, "apply-small-n-coverage", "apply", 7, 45, "With $n = 4$ calibration points, continuous scores and $\\alpha = 0.5$, find the exact coverage probability $\\frac{k}{n+1}$."), 0.6),
  num(m(CP, "apply-class-pipeline", "apply", 7, 60, "On $9$ calibration points the scores $1 - \\hat{p}_{y}$ are $0.05, 0.1, 0.2, 0.3, 0.35, 0.4, 0.6, 0.7, 0.9$. With $\\alpha = 0.1$, how many classes enter the set for a test point with probabilities $[0.6, 0.3, 0.08, 0.02]$?"), 2),
  mcq(m(CP, "apply-test-fraction", "apply", 7, 45, "You calibrate once and then evaluate a $90\\%$ conformal model on $10{,}000$ test points. The fraction covered:"),
    "Fluctuates around about $0.9$ depending on the calibration draw, and can fall a little below it",
    [
      ["Is always at least $0.9$", "cp-fraction-always", "The guarantee averages over calibration sets too."],
      ["Is exactly $0.9$", "cp-fraction-exact", "It is random through the calibration set."],
      ["Is always at least $0.99$", "cp-fraction-99", "Nothing pushes it that high."],
    ]),
  // level 8
  short(m(CP, "explain-full-vs-split", "explain", 8, 180, "Compare full (transductive) conformal prediction with split conformal prediction. What does each cost and gain?"),
    [
      ["full-refit", "Full conformal refits the model with each candidate label added, using all data for both fitting and calibration", 2, true],
      ["split-cheap", "Split conformal fits once and is cheap, but sacrifices data to the calibration split and so gives somewhat wider or noisier sets", 2, true],
      ["both-valid", "Both have the finite-sample coverage guarantee under exchangeability", 1],
    ]),
  num(m(CP, "apply-beta-sd", "apply", 8, 60, "Given the calibration set, split conformal coverage is $\\text{Beta}(k, n + 1 - k)$-distributed. With $n = 99$ and $\\alpha = 0.1$, find its standard deviation. Give $4$ decimal places."), 0.0299),
  mcq(m(CP, "apply-jackknife", "apply", 8, 45, "Jackknife+ and CV+ were introduced to:"),
    "Use all the data for fitting while keeping a coverage guarantee, at the cost of more model fits",
    [
      ["Remove the exchangeability assumption", "cp-jack-exch", "They still assume exchangeability."],
      ["Guarantee conditional coverage", "cp-jack-cond", "They give marginal guarantees."],
      ["Make intervals symmetric", "cp-jack-sym", "Symmetry is not their purpose."],
    ]),
  short(m(CP, "transfer-heteroskedastic", "transfer", 8, 180, "Noise is small for low $x$ and large for high $x$. With the absolute-residual score, what goes wrong, and how would you design a better score?"),
    [
      ["constant-width-problem", "Constant width over-covers where noise is low and under-covers where it is high (still $1 - \\alpha$ on average)", 2, true],
      ["better-score", "Normalise by an estimate of spread, $\\frac{|y - \\hat{f}(x)|}{\\hat{\\sigma}(x)}$, or use conformalized quantile regression", 2, true],
    ]),
  // level 9
  short(m(CP, "derive-coverage-proof", "explain", 9, 240, "Prove the lower bound $\\mathbb{P}(s_{n+1} \\le \\hat{q}) \\ge 1 - \\alpha$, allowing ties among scores."),
    [
      ["rank-bound", "By exchangeability, the probability that $s_{n+1}$ is among the $k$ smallest of the $n+1$ scores is at least $\\frac{k}{n+1}$, with ties only helping", 2, true],
      ["event-equivalence", "$s_{n+1} \\le \\hat{q}$ (the $k$-th smallest calibration score) holds whenever $s_{n+1}$ has rank at most $k$ among all $n+1$", 2, true],
      ["choose-k", "With $k = \\lceil (n+1)(1-\\alpha) \\rceil$, $\\frac{k}{n+1} \\ge 1 - \\alpha$", 1, true],
    ]),
  short(m(CP, "transfer-llm-claims", "transfer", 9, 240, "An LLM writes answers made of separate claims, and each claim gets a confidence score. Sketch how conformal ideas could guarantee that, with probability $90\\%$, all retained claims in an answer are correct."),
    [
      ["calibration-data", "Use a calibration set of answers with claims labelled true or false", 1, true],
      ["score-definition", "Score each answer by the highest confidence among its false claims (the threshold needed to exclude all errors)", 2, true],
      ["threshold", "Set the threshold at the conformal quantile of those scores and keep only claims above it, giving the guarantee by exchangeability", 2, true],
    ]),
  num(m(CP, "apply-n-for-tight-upper", "apply", 9, 60, "With continuous scores and $\\alpha = 0.1$, find the smallest $n$ for which the upper coverage bound $1 - \\alpha + \\frac{1}{n+1}$ is at most $0.91$."), 99),
  mcq(m(CP, "apply-new-hospital", "apply", 9, 45, "A model calibrated at hospital A is deployed at hospital B, where disease prevalence differs but symptoms given disease are the same. This is:"),
    "Label shift, so calibration scores should be reweighted by the ratio of class frequencies",
    [
      ["Covariate shift with unchanged prevalence", "cp-hosp-covariate", "Prevalence, the label distribution, is what changed."],
      ["Harmless, since conformal is distribution-free", "cp-hosp-harmless", "Distribution-free still needs exchangeability."],
      ["Concept drift in $P(Y \\mid X)$ with no fix", "cp-hosp-concept", "With fixed $P(X \\mid Y)$ and changed $P(Y)$, reweighting by class works."],
    ]),
  // level 10
  short(m(CP, "explain-conditional-impossible", "explain", 10, 240, "Why is exact conditional coverage, $\\mathbb{P}(Y \\in C(X) \\mid X = x) \\ge 1 - \\alpha$ for every $x$, impossible to guarantee distribution-free with finite data and informative sets?"),
    [
      ["no-repeats", "With continuous $X$, a new $x$ almost surely never appeared in the data, so there is no information about $Y$ at that exact point", 2, true],
      ["adversarial", "A distribution could hide arbitrary behaviour at points not sampled, so any guarantee for all distributions forces infinite-width sets (with positive probability)", 2, true],
      ["compromise", "Practical compromises are group-conditional or approximate local coverage", 1],
    ]),
  short(m(CP, "transfer-design-check", "transfer", 10, 240, "You must convince a regulator that your conformal intervals are reliable for every age group and over time. Design an evaluation."),
    [
      ["held-out", "Use fresh data never used for training or calibration", 1, true],
      ["subgroups", "Report coverage and width by group (e.g. age bands), with uncertainty, and use group-conditional calibration where needed", 2, true],
      ["drift", "Monitor coverage over time on rolling windows and recalibrate (or use adaptive conformal methods) if it drifts", 2, true],
    ]),
  num(m(CP, "apply-n-beta-variance", "apply", 10, 75, "Using the approximation $\\text{Var} \\approx \\frac{\\alpha(1 - \\alpha)}{n + 2}$ for the calibration-conditional coverage with $\\alpha = 0.1$, find the smallest $n$ for which its standard deviation is at most $0.01$."), 898),
  mcq(m(CP, "apply-ties-discrete", "apply", 10, 60, "Scores are discrete (many ties). Which statement about split conformal coverage is correct?"),
    "The lower bound $1 - \\alpha$ still holds, but the upper bound $1 - \\alpha + \\frac{1}{n+1}$ can fail",
    [
      ["Both bounds fail", "cp-ties-both", "Ties only make the set larger, so the lower bound survives."],
      ["Both bounds still hold exactly", "cp-ties-exact", "Ties can push coverage well above the upper bound."],
      ["Coverage drops below $1 - \\alpha$", "cp-ties-under", "Ties include more points, not fewer."],
    ]),
];

// ---------------------------------------------------------------------------
// selection-bias
// ---------------------------------------------------------------------------
const SB = "selection-bias";
const selection: Item[] = [
  // level 1
  mcq(m(SB, "recall-definition", "recall", 1, 15, "Selection bias occurs when:"),
    "Which units are observed is related to the outcome being studied",
    [
      ["The sample size is small", "sb-small", "Small samples are noisy, not necessarily biased."],
      ["Measurements have random error", "sb-measurement", "That is measurement error."],
      ["The model has too many parameters", "sb-overfit", "That is overfitting."],
    ]),
  mcq(m(SB, "recall-ht", "recall", 1, 15, "The Horvitz–Thompson estimator of a population mean is:"),
    "$\\frac{1}{N}\\sum_{i} \\frac{R_i Y_i}{\\pi_i}$",
    [
      ["$\\frac{1}{N}\\sum_{i} R_i Y_i \\pi_i$", "sb-ht-multiply", "Units must be divided by, not multiplied by, their selection probability."],
      ["The mean of the observed $Y_i$", "sb-ht-naive", "That is the naive estimate the weights are meant to correct."],
      ["$\\frac{1}{N}\\sum_i \\frac{Y_i}{1 - \\pi_i}$", "sb-ht-complement", "The weight is $\\frac{1}{\\pi_i}$, not $\\frac{1}{1 - \\pi_i}$."],
    ]),
  mcq(m(SB, "recall-positivity", "recall", 1, 15, "Inverse probability weighting requires positivity, meaning:"),
    "Every unit has a selection probability $\\pi_i > 0$",
    [
      ["Every outcome is positive", "sb-pos-outcome", "Positivity concerns selection probabilities, not outcomes."],
      ["Every weight is less than $1$", "sb-pos-weight", "Weights $\\frac{1}{\\pi}$ are at least $1$."],
      ["The sample mean is positive", "sb-pos-mean", "Unrelated to positivity."],
    ]),
  mcq(m(SB, "recall-weight-meaning", "recall", 1, 15, "In IPW, a selected unit with $\\pi_i = 0.1$ gets weight $10$ because:"),
    "It stands in for about $10$ similar units, most of which were not selected",
    [
      ["It is ten times more accurate", "sb-weight-accuracy", "Weights reflect representation, not accuracy."],
      ["Its outcome is ten times larger", "sb-weight-outcome", "The weight does not depend on the outcome's size."],
      ["It was selected ten times", "sb-weight-repeat", "It was selected once; rarely selected units get large weights."],
    ]),
  // level 2
  num(m(SB, "apply-weight", "apply", 2, 15, "A unit's selection probability is $\\pi = 0.25$. Find its inverse probability weight."), 4),
  num(m(SB, "apply-ht-three", "apply", 2, 25, "A population has $N = 100$ units. Three were selected, with outcomes $10, 20, 30$ and selection probabilities $0.1, 0.2, 0.5$. Find the Horvitz–Thompson estimate of the mean."), 2.6),
  num(m(SB, "apply-kish-simple", "apply", 2, 25, "Three observed units have weights $1, 1, 2$. Find Kish's effective sample size $\\frac{(\\sum w_i)^{2}}{\\sum w_i^{2}}$. Give $2$ decimal places."), 2.67),
  mcq(m(SB, "apply-survivorship", "apply", 2, 20, "A database of mutual funds lists only funds still operating today. Average returns computed from it will tend to be:"),
    "Too high, because poorly performing funds closed and dropped out",
    [
      ["Too low", "sb-surv-low", "The funds that vanish are mostly the poor performers."],
      ["Unbiased, since every listed fund is real", "sb-surv-unbiased", "Being real does not make them representative."],
      ["Unaffected, since returns are random", "sb-surv-random", "Selection depends on returns, which creates bias."],
    ]),
  // level 3
  num(m(SB, "apply-naive-mean", "apply", 3, 25, "A survey gets $80$ responses averaging $10$ from group A and $20$ responses averaging $20$ from group B. Find the naive mean of all responses."), 12),
  num(m(SB, "apply-ht-strata", "apply", 3, 35, "Groups A and B each have $200$ members. A responds with probability $0.4$, B with probability $0.1$. You get $80$ responses from A averaging $10$ and $20$ from B averaging $20$. Find the Horvitz–Thompson estimate of the population mean."), 15),
  num(m(SB, "apply-hajek", "apply", 3, 35, "Observed outcomes are $2, 4, 6$ with selection probabilities $0.5, 0.25, 0.5$. Find the Hájek (normalised IPW) estimate of the mean."), 4),
  mcq(m(SB, "apply-berkson", "apply", 3, 30, "Two diseases are independent in the population, but among hospital patients they appear negatively correlated. The likely cause is:"),
    "Collider bias: hospitalisation depends on having either disease",
    [
      ["The diseases protect against each other", "sb-berkson-causal", "They are independent in the population."],
      ["Small sample size", "sb-berkson-small", "The pattern comes from selection, not noise."],
      ["Measurement error", "sb-berkson-measure", "Selection on a common effect explains it."],
    ]),
  // level 4
  num(m(SB, "apply-bias-formula", "apply", 4, 35, "For selection indicator $R$ and outcome $Y$, $\\text{Cov}(R, Y) = 0.05$ and $\\mathbb{P}(R = 1) = 0.25$. Find the bias $\\mathbb{E}[Y \\mid R = 1] - \\mathbb{E}[Y]$."), 0.2),
  num(m(SB, "apply-kish-skewed", "apply", 4, 40, "Ten units have weight $1$ and two units have weight $10$. Find Kish's effective sample size. Give $2$ decimal places."), 4.29),
  num(m(SB, "apply-ht-total", "apply", 4, 35, "Two units are selected, with outcomes $5$ and $8$ and selection probabilities $0.1$ and $0.4$. Find the Horvitz–Thompson estimate of the population total $\\sum Y_i$."), 70),
  mcq(m(SB, "apply-ignorable", "apply", 4, 35, "Selection depends only on an observed covariate $X$, with known $\\pi(X)$. Which estimate of $\\mathbb{E}[Y]$ is unbiased?"),
    "The inverse-probability-weighted mean",
    [
      ["The unweighted mean of selected units", "sb-ign-naive", "It over-represents units with high $\\pi(X)$."],
      ["The mean of $X$ among selected units", "sb-ign-x", "That estimates a different quantity."],
      ["The median of selected units", "sb-ign-median", "Changing the summary does not fix the selection."],
    ]),
  // level 5
  short(m(SB, "explain-ipw-unbiased", "explain", 5, 150, "Show why $\\mathbb{E}\\left[\\frac{R\\,Y}{\\pi(X)}\\right] = \\mathbb{E}[Y]$ when selection depends only on $X$."),
    [
      ["condition", "Condition on $X$ and $Y$: $\\mathbb{E}[R \\mid X, Y] = \\pi(X)$ because selection does not depend on $Y$ given $X$", 2, true],
      ["cancel", "So $\\mathbb{E}\\left[\\frac{RY}{\\pi(X)}\\right] = \\mathbb{E}\\left[\\frac{Y \\pi(X)}{\\pi(X)}\\right] = \\mathbb{E}[Y]$, requiring $\\pi(X) > 0$", 2, true],
    ]),
  mcq(m(SB, "apply-hajek-vs-ht", "apply", 5, 35, "Compared with Horvitz–Thompson, the Hájek estimator:"),
    "Divides by the sum of weights, so it is slightly biased but usually less variable",
    [
      ["Is exactly unbiased and always more variable", "sb-hajek-unbiased", "Normalising introduces a small bias and usually reduces variance."],
      ["Ignores the weights", "sb-hajek-ignore", "It is a weighted mean."],
      ["Needs no selection probabilities", "sb-hajek-nopi", "It uses the same weights $\\frac{1}{\\pi_i}$."],
    ]),
  mcq(m(SB, "apply-estimated-pi", "apply", 5, 35, "When $\\pi(X)$ is unknown in an observational survey, it is usually:"),
    "Estimated, e.g. by logistic regression of the selection indicator on $X$",
    [
      ["Set to the overall response rate for everyone", "sb-est-constant", "That gives the naive mean back."],
      ["Estimated by regressing $Y$ on $X$", "sb-est-outcome", "That is an outcome model, not a selection model."],
      ["Impossible to estimate, so IPW cannot be used", "sb-est-impossible", "$R$ and $X$ are observed for everyone, so $\\pi(X)$ is estimable."],
    ]),
  num(m(SB, "apply-selection-on-y", "apply", 5, 45, "Binary $Y$ has $\\mathbb{P}(Y = 1) = 0.3$. Units with $Y = 1$ are selected with probability $0.6$, units with $Y = 0$ with probability $0.2$. Find $\\mathbb{E}[Y \\mid R = 1]$. Give $4$ decimal places."), 0.5625),
  // level 6
  short(m(SB, "explain-selection-on-y", "explain", 6, 150, "Patients drop out of a study because their outcome is bad, even after accounting for every recorded covariate. Why can't IPW using the covariates fix this?"),
    [
      ["depends-on-y", "The selection probability depends on the unobserved outcome itself, not just on $X$", 2, true],
      ["not-estimable", "That probability cannot be estimated from the observed data, so the weights are wrong and the bias remains (MNAR)", 2, true],
      ["remedies", "Needs extra data (e.g. following up dropouts) or untestable assumptions with sensitivity analysis", 1],
    ]),
  num(m(SB, "apply-correct-on-y", "apply", 6, 45, "You observe $60$ units with $Y = 1$ and $40$ with $Y = 0$. Selection probabilities are known: $0.6$ for $Y = 1$ and $0.2$ for $Y = 0$. Find the IPW estimate of $\\mathbb{P}(Y = 1)$. Give $4$ decimal places."), 0.3333),
  num(m(SB, "apply-ht-variance", "apply", 6, 45, "Under independent Bernoulli selection, $\\text{Var}(\\hat{\\mu}_{\\text{HT}}) = \\frac{1}{N^{2}}\\sum_i \\frac{Y_i^{2}(1 - \\pi_i)}{\\pi_i}$. With $N = 2$, $Y = [1, 2]$ and $\\pi_i = 0.5$ for both, find this variance."), 1.25),
  mcq(m(SB, "apply-trimming", "apply", 6, 40, "Trimming (capping) very large IPW weights:"),
    "Reduces variance at the cost of some bias",
    [
      ["Reduces both bias and variance", "sb-trim-both", "Changing correct weights introduces bias."],
      ["Increases variance", "sb-trim-var-up", "Extreme weights are what inflate variance."],
      ["Has no effect on the estimate", "sb-trim-none", "It changes the weights, so it changes the estimate."],
    ]),
  // level 7
  short(m(SB, "explain-berkson-mechanism", "explain", 7, 180, "Explain, with a concrete example, how conditioning on a variable caused by two independent factors creates a spurious association between them."),
    [
      ["collider", "Identifies the selection variable as a common effect (collider) of both factors", 2, true],
      ["explaining-away", "Within the selected group, knowing one factor is absent makes the other more likely (explaining away), inducing negative correlation", 2, true],
      ["example", "Gives a concrete example, e.g. hospital admission, college admission on talent or athletics", 1],
    ]),
  num(m(SB, "apply-berkson-prob", "apply", 7, 60, "Diseases $A$ and $B$ are independent, each with prevalence $0.1$. People are hospitalised if they have at least one. Find $\\mathbb{P}(A \\mid \\text{hospitalised})$. Give $4$ decimal places."), 0.5263),
  num(m(SB, "apply-design-effect", "apply", 7, 50, "$100$ respondents: half have weight $1$ and half have weight $3$. Find the design effect $\\frac{n}{n_{\\text{eff}}}$ using Kish's formula."), 1.25),
  mcq(m(SB, "apply-surv-direction", "apply", 7, 40, "Studying only startups that raised a second round, you find founders' prior experience is unrelated to growth. A likely issue is:"),
    "Selection on an outcome-related event can hide or distort the true relationship",
    [
      ["Experience truly has no effect", "sb-startup-true", "The selected sample cannot establish that."],
      ["The sample is too large", "sb-startup-large", "Size does not remove selection bias."],
      ["Growth is measured with error", "sb-startup-error", "The concern here is who was included."],
    ]),
  // level 8
  short(m(SB, "transfer-design-weighting", "transfer", 8, 210, "Only $30\\%$ of customers answer a satisfaction survey, and you know each customer's age, region and purchase history. Describe a weighting analysis and the assumptions it rests on."),
    [
      ["model", "Model response probability $\\pi(X)$ from the covariates for all customers (e.g. logistic regression)", 2, true],
      ["weight", "Weight respondents by $\\frac{1}{\\hat{\\pi}(X)}$ (Hájek mean), checking weight extremes and balance of covariates", 1],
      ["assumptions", "Requires missing at random given $X$ (no dependence on satisfaction itself beyond $X$) and positivity", 2, true],
    ]),
  num(m(SB, "apply-ipw-unit-variance", "apply", 8, 60, "Every unit is selected independently with probability $\\pi = 0.5$. With $\\mathbb{E}[Y^{2}] = 5$ and $\\mathbb{E}[Y] = 2$, find the variance of a single IPW term $\\frac{RY}{\\pi}$."), 6),
  num(m(SB, "apply-ht-constant", "apply", 8, 50, "All $N = 100$ units have $Y = 1$. Each is selected with probability $0.25$, and $30$ happen to be selected. Find the Horvitz–Thompson estimate of the mean."), 1.2),
  mcq(m(SB, "apply-hajek-invariance", "apply", 8, 45, "If a constant $c$ is added to every outcome, which estimator shifts by exactly $c$?"),
    "Hájek",
    [
      ["Horvitz–Thompson", "sb-inv-ht", "HT shifts by $c$ times $\\frac{1}{N}\\sum \\frac{R_i}{\\pi_i}$, which is random."],
      ["Both", "sb-inv-both", "Only the normalised estimator is location-equivariant."],
      ["Neither", "sb-inv-neither", "Hájek's weights sum to one, so it shifts by $c$."],
    ]),
  // level 9
  short(m(SB, "transfer-audit-flagged", "transfer", 9, 240, "A bank audits only transactions its fraud model flags as risky, then reports the fraud rate among audited transactions as the overall fraud rate. Explain the problem and propose a design that gives an unbiased estimate."),
    [
      ["bias", "Flagged transactions are far more likely to be fraud, so the audited fraud rate overstates the overall rate", 2, true],
      ["design", "Audit every transaction with a known, positive probability (higher for risky, lower but nonzero for others)", 2, true],
      ["estimate", "Weight audited transactions by $\\frac{1}{\\pi_i}$ to estimate the overall rate unbiasedly", 1, true],
    ]),
  short(m(SB, "explain-propensity-extremes", "explain", 9, 210, "Explain why estimated selection probabilities near $0$ are dangerous even when the selection model is correct, and name two practical responses."),
    [
      ["variance", "Tiny $\\pi$ produces huge weights, so a few units dominate and variance explodes (small effective sample size)", 2, true],
      ["sensitivity", "Small errors in $\\hat{\\pi}$ near $0$ cause large errors in $\\frac{1}{\\hat{\\pi}}$", 1],
      ["responses", "Names responses such as trimming/stabilising weights, restricting the target population (overlap), or augmented/doubly robust estimators", 2, true],
    ]),
  num(m(SB, "apply-pps-total", "apply", 9, 60, "A sample of $10$ units is drawn with probability proportional to size: $\\pi_i = \\frac{10 x_i}{1000}$, where the sizes $x_i$ total $1{,}000$. Every unit has $Y_i = 3 x_i$. Find the Horvitz–Thompson estimate of the population total of $Y$."), 3000),
  mcq(m(SB, "apply-pps-zero", "apply", 9, 45, "In the previous design ($\\pi_i \\propto x_i$ and $Y_i = 3 x_i$), the HT estimate of the total has variance:"),
    "Zero, because every $\\frac{Y_i}{\\pi_i}$ equals the same constant",
    [
      ["The same as simple random sampling", "sb-pps-same", "Matching $\\pi$ to $Y$'s size removes variability."],
      ["Infinite", "sb-pps-inf", "All $\\pi_i$ are positive and finite."],
      ["Larger than simple random sampling", "sb-pps-larger", "Here PPS is ideal."],
    ]),
  // level 10
  short(m(SB, "derive-hajek-ratio", "explain", 10, 240, "Explain why the Hájek estimator is a ratio estimator, why it is biased in finite samples, and why the bias vanishes as $N$ grows."),
    [
      ["ratio", "It is $\\frac{\\hat{T}_Y}{\\hat{N}}$, the HT total divided by the HT estimate of the population size, both unbiased", 2, true],
      ["bias", "The expectation of a ratio is not the ratio of expectations, so it is biased", 1, true],
      ["vanishing", "Both estimates concentrate as $N$ grows; a Taylor (delta-method) expansion shows the bias is $O\\left(\\frac{1}{N}\\right)$, negligible relative to the standard error", 2, true],
    ]),
  short(m(SB, "transfer-ml-labels", "transfer", 10, 240, "A dataset of images was labelled only when a model's confidence was below $0.7$, and you want to estimate the share of images that contain a defect. What would you need to have recorded, and what estimator would you use?"),
    [
      ["problem", "Labelled images are a selected, low-confidence subset, so their defect share is biased", 1, true],
      ["randomise", "Need a known positive labelling probability for every image (randomise, including some high-confidence ones), recorded per image", 2, true],
      ["estimator", "Use IPW, or better combine model predictions with weighted label corrections (active inference)", 2, true],
    ]),
  num(m(SB, "apply-truncated-normal", "apply", 10, 75, "$Y \\sim \\mathcal{N}(0, 1)$, and only units with $Y > 0$ are observed. Find the selection bias $\\mathbb{E}[Y \\mid R = 1] - \\mathbb{E}[Y]$. Give $4$ decimal places."), 0.7979),
  mcq(m(SB, "apply-truncation-ipw", "apply", 10, 45, "In the previous question, can IPW recover $\\mathbb{E}[Y]$?"),
    "No: units with $Y \\le 0$ have selection probability $0$, violating positivity",
    [
      ["Yes, weight each observed unit by $2$", "sb-trunc-weight2", "No weighting of positive values can produce the negative half."],
      ["Yes, if the sample is large", "sb-trunc-large", "More selected units are still all positive."],
      ["Yes, using the Hájek estimator", "sb-trunc-hajek", "Normalising does not fix zero selection probability."],
    ]),
];

export const infer01Items: Item[] = [...conformal, ...selection];
