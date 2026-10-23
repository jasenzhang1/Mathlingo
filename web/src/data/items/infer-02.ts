import type { Item } from "../../lib/assessment/types";
import { m, mcq, num, short } from "./infer-shared";

/**
 * Inference with predictions, part 2: prediction-powered inference and active
 * statistical inference. Forty questions per lesson, four at each level.
 */

// ---------------------------------------------------------------------------
// prediction-powered-inference
// ---------------------------------------------------------------------------
const PP = "prediction-powered-inference";
const ppi: Item[] = [
  // level 1
  mcq(m(PP, "recall-rectifier", "recall", 1, 15, "In prediction-powered inference, the rectifier is:"),
    "The average of $f(X_i) - Y_i$ over the labeled data — the model's estimated bias",
    [
      ["The average prediction on the unlabeled data", "ppi-rect-unlabeled", "That is the prediction estimate the rectifier corrects."],
      ["A model retrained on the labeled data", "ppi-rect-retrain", "No retraining is involved."],
      ["The variance of the labels", "ppi-rect-variance", "It is a mean difference, not a variance."],
    ]),
  mcq(m(PP, "recall-data", "recall", 1, 15, "PPI combines:"),
    "A small labeled set of pairs $(X_i, Y_i)$ with a large unlabeled set of inputs and a model's predictions",
    [
      ["Two labeled datasets from different studies", "ppi-data-two-labeled", "The large set has no labels."],
      ["Only model predictions, with no labels", "ppi-data-no-labels", "Labels are needed to measure the model's bias."],
      ["A training set and a test set for model selection", "ppi-data-model-selection", "PPI is about inference on a parameter, not model selection."],
    ]),
  mcq(m(PP, "recall-unbiased", "recall", 1, 15, "The PPI estimate of a mean is unbiased:"),
    "For any fixed model, accurate or not",
    [
      ["Only if the model is accurate", "ppi-unb-accurate", "The rectifier removes the model's bias whatever it is."],
      ["Only if the model is unbiased", "ppi-unb-model-unbiased", "Model bias is exactly what the rectifier subtracts."],
      ["Only when $n = N$", "ppi-unb-equal", "Unbiasedness holds for any sample sizes."],
    ]),
  mcq(m(PP, "recall-goal", "recall", 1, 15, "The main benefit of PPI over using only the labeled data is:"),
    "Narrower confidence intervals that remain valid",
    [
      ["Removing the need for any labels", "ppi-goal-nolabels", "A labeled sample is still required."],
      ["A more accurate model", "ppi-goal-model", "The model is fixed; PPI improves inference, not the model."],
      ["Avoiding the need for independence", "ppi-goal-indep", "The samples are still assumed i.i.d."],
    ]),
  // level 2
  num(m(PP, "apply-estimate", "apply", 2, 20, "Mean prediction on the unlabeled set is $0.70$. On the labeled set the mean prediction is $0.65$ and the mean label is $0.60$. Find the PPI estimate of the mean label."), 0.65),
  num(m(PP, "apply-rectifier", "apply", 2, 20, "On the labeled set the mean prediction is $3.2$ and the mean label is $3.0$. Find the rectifier $\\hat{\\Delta}$."), 0.2),
  num(m(PP, "apply-classical-se", "apply", 2, 20, "Labels have variance $0.16$ and there are $n = 400$ of them. Find the classical standard error of $\\bar{Y}$."), 0.02),
  mcq(m(PP, "apply-perfect-model", "apply", 2, 20, "If the model predicts every label exactly, the rectifier's variance is:"),
    "$0$, so the interval width is set by the unlabeled sample size $N$",
    [
      ["The same as $\\text{Var}(Y)$", "ppi-perfect-var-y", "$f - Y = 0$ has zero variance."],
      ["Infinite", "ppi-perfect-inf", "A perfect model makes the correction exact."],
      ["$\\frac{1}{n}$", "ppi-perfect-1n", "The variance of a constant zero is zero."],
    ]),
  // level 3
  num(m(PP, "apply-ppi-se", "apply", 3, 30, "$\\hat{\\sigma}^{2}_{f} = 0.09$ with $N = 9{,}000$ and $\\hat{\\sigma}^{2}_{f - Y} = 0.04$ with $n = 100$. Find the PPI standard error. Give $4$ decimal places."), 0.0202),
  num(m(PP, "apply-halfwidth", "apply", 3, 25, "A PPI estimate has standard error $0.02$. Find the half-width of its $95\\%$ confidence interval (use $z = 1.96$). Give $4$ decimal places."), 0.0392),
  num(m(PP, "apply-infinite-n", "apply", 3, 25, "With unlimited unlabeled data, $\\hat{\\sigma}^{2}_{f - Y} = 0.01$ and $n = 100$. Find the PPI standard error."), 0.01),
  mcq(m(PP, "apply-imputation-bias", "apply", 3, 25, "Treating the model's predictions as if they were true labels and computing a standard confidence interval gives:"),
    "An interval centred on the model's biased average, often too narrow to cover the truth",
    [
      ["A valid but wide interval", "ppi-imp-valid", "Nothing corrects the model's bias."],
      ["The same interval as PPI", "ppi-imp-same", "PPI subtracts the rectifier and adds its variance."],
      ["An unbiased estimate with correct coverage", "ppi-imp-unbiased", "Only if the model happens to be unbiased."],
    ]),
  // level 4
  num(m(PP, "apply-label-multiplier", "apply", 4, 35, "With unlimited unlabeled data, $\\text{Var}(Y) = 0.25$ and $\\text{Var}(f - Y) = 0.05$. By what factor more labels would the classical estimator need to match PPI's variance?"), 5),
  num(m(PP, "apply-share", "apply", 4, 30, "A classifier's mean prediction is $0.42$ on unlabeled data and $0.45$ on labeled data, where the mean label is $0.40$. Find the PPI estimate."), 0.37),
  num(m(PP, "apply-lower-bound", "apply", 4, 30, "A PPI estimate is $0.37$ with standard error $0.01$. Find the lower end of its $95\\%$ interval (use $z = 1.96$). Give $4$ decimal places."), 0.3504),
  mcq(m(PP, "apply-when-worse", "apply", 4, 35, "Plain PPI (no power tuning) can be wider than the classical interval when:"),
    "$\\text{Var}(f - Y) > \\text{Var}(Y)$, e.g. predictions are noisy and barely related to the labels",
    [
      ["The model is perfect", "ppi-worse-perfect", "A perfect model gives the narrowest interval."],
      ["$N$ is very large", "ppi-worse-bigN", "Large $N$ only helps."],
      ["Labels are binary", "ppi-worse-binary", "Binary labels are fine."],
    ]),
  // level 5
  short(m(PP, "explain-unbiased", "explain", 5, 150, "Explain why the PPI mean estimator is unbiased for $\\mathbb{E}[Y]$."),
    [
      ["first-term", "The unlabeled average has expectation $\\mathbb{E}[f(X)]$", 1, true],
      ["rectifier", "The rectifier has expectation $\\mathbb{E}[f(X) - Y]$ because the labeled data come from the same distribution", 2, true],
      ["difference", "Subtracting gives $\\mathbb{E}[f(X)] - \\mathbb{E}[f(X)] + \\mathbb{E}[Y] = \\mathbb{E}[Y]$", 2, true],
    ]),
  mcq(m(PP, "apply-variances-add", "apply", 5, 35, "The PPI variance is a sum of a term in $\\frac{1}{N}$ and a term in $\\frac{1}{n}$ because:"),
    "The labeled and unlabeled samples are independent",
    [
      ["The model is linear", "ppi-add-linear", "No linearity is required."],
      ["$N = n$", "ppi-add-equal", "The sizes typically differ greatly."],
      ["The labels are normally distributed", "ppi-add-normal", "Variances of independent sums add regardless of distribution."],
    ]),
  mcq(m(PP, "apply-lambda-zero", "apply", 5, 35, "In PPI++, $\\hat{\\theta}_{\\lambda} = \\bar{Y} + \\lambda\\left(\\bar{f}_N - \\bar{f}_n\\right)$. Setting $\\lambda = 0$ gives:"),
    "The classical estimator $\\bar{Y}$",
    [
      ["Plain PPI", "ppi-lambda-ppi", "Plain PPI is $\\lambda = 1$."],
      ["The prediction-only estimate", "ppi-lambda-pred", "That would ignore the labels."],
      ["A biased estimator", "ppi-lambda-biased", "Every $\\lambda$ is unbiased."],
    ]),
  num(m(PP, "apply-lambda-star", "apply", 5, 40, "Find $\\lambda^{*} = \\frac{\\text{Cov}(Y, f)}{\\left(1 + \\frac{n}{N}\\right)\\text{Var}(f)}$ for $\\text{Cov}(Y, f) = 0.03$, $\\text{Var}(f) = 0.04$, $n = 100$ and $N = 900$."), 0.675),
  // level 6
  short(m(PP, "explain-small-gain", "explain", 6, 150, "A model's predictions are almost uncorrelated with the labels. What happens to PPI and PPI++, and why?"),
    [
      ["ppi-wide", "Plain PPI's rectifier then has variance about $\\text{Var}(f) + \\text{Var}(Y)$, so it can be wider than classical", 2, true],
      ["ppi-plus", "PPI++ chooses $\\lambda^{*} \\approx 0$, falling back to the classical estimator, so it never does much worse", 2, true],
      ["valid", "Both remain valid; only efficiency is lost", 1],
    ]),
  num(m(PP, "apply-var-diff", "apply", 6, 40, "$\\text{Var}(f) = 0.04$, $\\text{Var}(Y) = 0.09$ and $\\text{Cov}(f, Y) = 0.05$. Find $\\text{Var}(f - Y)$."), 0.03),
  num(m(PP, "apply-se-from-cov", "apply", 6, 45, "Continuing with $\\text{Var}(f) = 0.04$ and $\\text{Var}(f - Y) = 0.03$, take $N = 10{,}000$ and $n = 100$. Find the PPI standard error. Give $4$ decimal places."), 0.0174),
  mcq(m(PP, "apply-nonrandom-labels", "apply", 6, 40, "Labels were collected only for documents the model found hard. Plain PPI is now:"),
    "Biased, because the rectifier measures the model's error on hard documents, not the population",
    [
      ["Still unbiased", "ppi-nonrand-unbiased", "The rectifier no longer estimates the population bias."],
      ["More efficient and still unbiased", "ppi-nonrand-efficient", "Efficiency needs weights to remain unbiased."],
      ["Equivalent to the classical estimator", "ppi-nonrand-classical", "It is neither."],
    ]),
  // level 7
  short(m(PP, "explain-m-estimation", "explain", 7, 180, "How does PPI extend from a mean to a parameter defined by a convex loss, such as a regression coefficient?"),
    [
      ["rectified-loss", "Minimise the loss on predicted labels over the unlabeled data, plus a correction: the labeled-data average of loss with true labels minus loss with predicted labels", 2, true],
      ["unbiased-objective", "The rectified objective (or gradient) is unbiased for the true population loss (gradient)", 2, true],
      ["intervals", "Confidence sets come from the asymptotic normality of the estimate, with variance combining both samples", 1],
    ]),
  num(m(PP, "apply-optimal-ratio", "apply", 7, 60, "With unlimited unlabeled data, PPI++ at $\\lambda^{*}$ has variance $(1 - \\rho^{2})$ times the classical variance, where $\\rho = \\text{Corr}(f, Y)$. With $\\text{Var}(Y) = 0.09$, $\\text{Var}(f) = 0.04$ and $\\text{Cov}(f, Y) = 0.05$, find this ratio. Give $4$ decimal places."), 0.3056),
  num(m(PP, "apply-plain-ratio", "apply", 7, 60, "Same numbers, unlimited unlabeled data. Find the ratio of plain PPI's variance, $\\frac{\\text{Var}(f - Y)}{n}$, to the classical $\\frac{\\text{Var}(Y)}{n}$. Give $4$ decimal places."), 0.3333),
  mcq(m(PP, "apply-model-trained-on-labels", "apply", 7, 45, "You fit the model on the same labeled data used for the rectifier. The problem is:"),
    "The model's errors on those points are too small, so the rectifier underestimates its bias",
    [
      ["None, more data for training is always good", "ppi-trained-fine", "The rectifier must be computed on data independent of the model."],
      ["The unlabeled data become biased", "ppi-trained-unlabeled", "The issue is with the labeled data."],
      ["The variance becomes negative", "ppi-trained-negative", "Variances cannot be negative."],
    ]),
  // level 8
  short(m(PP, "derive-variance", "explain", 8, 210, "Derive $\\text{Var}\\left(\\hat{\\theta}^{\\text{PP}}\\right) = \\frac{\\sigma^{2}_{f}}{N} + \\frac{\\sigma^{2}_{f - Y}}{n}$, stating every assumption."),
    [
      ["iid", "Unlabeled inputs i.i.d., labeled pairs i.i.d., the two samples independent, model fixed", 2, true],
      ["mean-variance", "Variance of a mean of $N$ i.i.d. terms $f(\\tilde{X}_j)$ is $\\frac{\\sigma^{2}_{f}}{N}$; of $n$ i.i.d. terms $f(X_i) - Y_i$ is $\\frac{\\sigma^{2}_{f-Y}}{n}$", 2, true],
      ["independence-adds", "Independence makes the covariance between the two terms zero, so the variances add", 1, true],
    ]),
  num(m(PP, "apply-match-n", "apply", 8, 50, "A PPI estimate has variance $0.000104$. The labels have variance $0.09$. Find the smallest whole number of labels $n$ for which the classical estimator's variance is at most $0.000104$."), 866),
  num(m(PP, "apply-budget", "apply", 8, 50, "With unlimited unlabeled data and $\\text{Var}(f - Y) = 0.02$, how many labels $n$ make the PPI standard error equal $0.01$?"), 200),
  mcq(m(PP, "apply-coverage-claim", "apply", 8, 45, "A $95\\%$ PPI interval means:"),
    "Over repeated draws of both samples, about $95\\%$ of such intervals contain the true $\\theta$",
    [
      ["The model is correct with probability $0.95$", "ppi-cov-model", "The interval is about $\\theta$, not the model."],
      ["$95\\%$ of predictions fall in the interval", "ppi-cov-predictions", "It is a confidence interval for a parameter."],
      ["$\\theta$ is in this particular interval with probability $0.95$ given the data", "ppi-cov-bayes", "That is a Bayesian credible statement."],
    ]),
  // level 9
  short(m(PP, "transfer-alphafold", "transfer", 9, 240, "A biologist uses predicted protein structures for $200{,}000$ proteins to test whether disordered regions are associated with a modification, and has experimental structures for $5{,}000$. Explain why using predictions as data is risky and how PPI addresses it."),
    [
      ["risk", "Prediction errors may be correlated with the variables being studied, biasing the association, and a naive interval ignores this uncertainty", 2, true],
      ["ppi", "Use the experimental subset to estimate and remove the bias of the prediction-based estimate (rectifier), with intervals that combine both sources of variance", 2, true],
      ["requirement", "The experimental subset must be a random sample of the same population", 1],
    ]),
  short(m(PP, "transfer-regression-coefficient", "transfer", 9, 240, "Sketch PPI for a logistic regression coefficient of $Y$ on covariates $\\mathbf{X}$ when $Y$ is predicted by a model for most units."),
    [
      ["gradient", "Write the logistic score equation; evaluate it with predicted $Y$ on the unlabeled set", 2, true],
      ["rectify", "Add the labeled-set average of (score with true $Y$ minus score with predicted $Y$) and solve the rectified equation", 2, true],
      ["inference", "Get standard errors from the sandwich form combining both samples' variances", 1],
    ]),
  num(m(PP, "apply-effective-labels", "apply", 9, 60, "PPI uses $N = 5{,}000$ with $\\sigma^{2}_{f} = 0.05$ and $n = 200$ with $\\sigma^{2}_{f - Y} = 0.02$. With $\\text{Var}(Y) = 0.1$, how many labels would the classical estimator need for the same variance? Give the nearest whole number."), 909),
  mcq(m(PP, "apply-cross-prediction", "apply", 9, 45, "Cross-prediction-powered inference trains the model on folds of the labeled data. Its purpose is to:"),
    "Use the labeled data both to train the predictor and to rectify, without the rectifier seeing a model fit to the same points",
    [
      ["Remove the need for unlabeled data", "ppi-cross-nounlabeled", "Unlabeled data are still the source of the gain."],
      ["Guarantee conditional coverage", "ppi-cross-conditional", "It targets a parameter, not prediction sets."],
      ["Make the estimator biased but faster", "ppi-cross-biased", "The point is to keep validity."],
    ]),
  // level 10
  short(m(PP, "transfer-llm-annotation", "transfer", 10, 300, "You have $1{,}000{,}000$ social-media posts annotated for stance by an LLM, and budget for $500$ human labels. Design the study to estimate the share of posts with a given stance, and name two pitfalls."),
    [
      ["sampling", "Draw the $500$ posts uniformly at random (or with known probabilities) from the same population", 2, true],
      ["estimate", "Compute PPI or PPI++ with the LLM labels on all posts and the human-labeled rectifier, reporting the interval", 2, true],
      ["pitfalls", "Pitfalls such as prompt or model changes between labeled and unlabeled sets, human label noise, or choosing which posts to label based on the LLM output", 1, true],
    ]),
  short(m(PP, "derive-lambda-star", "explain", 10, 240, "Derive the optimal PPI++ weight $\\lambda^{*} = \\frac{\\text{Cov}(Y, f)}{\\left(1 + \\frac{n}{N}\\right)\\text{Var}(f)}$ for a mean."),
    [
      ["variance-expression", "Write $\\text{Var}(\\hat{\\theta}_{\\lambda}) = \\frac{\\sigma^{2}_{Y}}{n} + \\lambda^{2}\\sigma^{2}_{f}\\left(\\frac{1}{n} + \\frac{1}{N}\\right) - \\frac{2\\lambda\\,\\text{Cov}(Y, f)}{n}$", 2, true],
      ["minimise", "Differentiate in $\\lambda$ and set to zero", 1, true],
      ["solve", "Solve to get $\\lambda^{*} = \\frac{\\text{Cov}(Y, f)}{(1 + n/N)\\,\\sigma^{2}_{f}}$", 2, true],
    ]),
  num(m(PP, "apply-lambda-equal-sizes", "apply", 10, 60, "With $n = N = 500$, $\\text{Cov}(Y, f) = 0.02$ and $\\text{Var}(f) = 0.05$, find $\\lambda^{*}$."), 0.2),
  mcq(m(PP, "apply-power-tuning-guarantee", "apply", 10, 60, "Why can PPI++ with an estimated $\\hat{\\lambda}$ be asymptotically no worse than the classical estimator?"),
    "$\\hat{\\lambda} \\to \\lambda^{*}$, and the variance at $\\lambda^{*}$ is at most the variance at $\\lambda = 0$",
    [
      ["Because $\\hat{\\lambda}$ is always $1$", "ppi-tune-one", "$\\hat{\\lambda}$ is estimated from data."],
      ["Because the model is retrained", "ppi-tune-retrain", "No retraining occurs."],
      ["Because $N$ is larger than $n$", "ppi-tune-sizes", "The guarantee comes from optimising over $\\lambda$, which includes $0$."],
    ]),
];

// ---------------------------------------------------------------------------
// active-statistical-inference
// ---------------------------------------------------------------------------
const AI = "active-statistical-inference";
const active: Item[] = [
  // level 1
  mcq(m(AI, "recall-pi", "recall", 1, 15, "In active statistical inference, $\\pi(x)$ is:"),
    "The probability, chosen by the analyst, of requesting the label for a point with features $x$",
    [
      ["The model's predicted probability that $Y = 1$", "ai-pi-pred", "That is the model output, not the labeling rule."],
      ["The fraction of positive labels", "ai-pi-prevalence", "That is the target, not the sampling rule."],
      ["The population size", "ai-pi-size", "$\\pi$ is a probability per point."],
    ]),
  mcq(m(AI, "recall-weights", "recall", 1, 15, "Labeled corrections are weighted by $\\frac{1}{\\pi(X_i)}$ in order to:"),
    "Keep the estimator unbiased even though uncertain points are labeled more often",
    [
      ["Give more influence to confident points", "ai-weights-confident", "Confident points have small $\\pi$ and get large weights only when labeled."],
      ["Reduce the labeling cost", "ai-weights-cost", "Weights do not change which points are labeled."],
      ["Calibrate the model", "ai-weights-calibrate", "They correct the estimator, not the model."],
    ]),
  mcq(m(AI, "recall-vs-active-learning", "recall", 1, 15, "Active statistical inference differs from active learning because it chooses labels to:"),
    "Shrink the confidence interval for a target quantity",
    [
      ["Improve the model's accuracy", "ai-vs-al-model", "That is active learning's goal."],
      ["Reduce training time", "ai-vs-al-time", "Neither method is about training time."],
      ["Avoid needing a model", "ai-vs-al-nomodel", "It relies on a model's predictions."],
    ]),
  mcq(m(AI, "recall-known-pi", "recall", 1, 15, "Why is IPW exactly unbiased here, unlike in most observational studies?"),
    "The selection probabilities are set by the analyst, so they are known",
    [
      ["The model is always correct", "ai-known-model", "Validity does not depend on the model."],
      ["The labels are noise-free", "ai-known-noise", "Label noise is a separate issue."],
      ["The sample is very large", "ai-known-large", "Unbiasedness is exact, not asymptotic."],
    ]),
  // level 2
  num(m(AI, "apply-weight", "apply", 2, 15, "A point is labeled with probability $\\pi = 0.2$. By what factor is its correction $Y - f(X)$ multiplied if it is labeled?"), 5),
  num(m(AI, "apply-term-labeled", "apply", 2, 25, "A labeled point has $f(X) = 0.3$, $Y = 1$ and $\\pi = 0.5$. Find its term $f(X) + (Y - f(X))\\frac{\\xi}{\\pi}$ with $\\xi = 1$."), 1.7),
  num(m(AI, "apply-term-unlabeled", "apply", 2, 20, "An unlabeled point has $f(X) = 0.4$ and $\\xi = 0$. Find its term in the active estimator."), 0.4),
  mcq(m(AI, "apply-budget", "apply", 2, 20, "To expect $n_b$ labels among $N$ points, the rule must satisfy:"),
    "$\\frac{1}{N}\\sum_i \\pi(X_i) = \\frac{n_b}{N}$ on average",
    [
      ["$\\pi(X_i) = n_b$ for every point", "ai-budget-count", "$\\pi$ is a probability, at most $1$."],
      ["$\\sum_i \\pi(X_i) = 1$", "ai-budget-sum-one", "That would give one label in expectation."],
      ["$\\pi(X_i) = \\frac{1}{n_b}$", "ai-budget-inverse", "That is not tied to the budget correctly."],
    ]),
  // level 3
  num(m(AI, "apply-mean-pi", "apply", 3, 20, "You have $N = 10{,}000$ points and can afford $1{,}000$ labels. What must the average labeling probability be?"), 0.1),
  num(m(AI, "apply-ratio-to-pi", "apply", 3, 30, "Two equally large groups get labeling probabilities in ratio $1 : 3$ and the average must be $0.2$. Find the larger probability."), 0.3),
  num(m(AI, "apply-uncertainty-ratio", "apply", 3, 30, "Using $u(x) = \\sqrt{p(1 - p)}$ with $\\pi \\propto u$, find $\\frac{\\pi(p = 0.5)}{\\pi(p = 0.9)}$. Give $4$ decimal places."), 1.6667),
  mcq(m(AI, "apply-pi-zero", "apply", 3, 25, "If $\\pi(x) = 0$ for some region of inputs:"),
    "The model's error there is never measured, and the estimator can be biased",
    [
      ["The estimator is still unbiased", "ai-zero-fine", "Unbiasedness requires $\\pi > 0$ everywhere."],
      ["The variance becomes zero", "ai-zero-var", "Zero probability breaks the weights."],
      ["Labeling cost rises", "ai-zero-cost", "Cost falls; validity is lost."],
    ]),
  // level 4
  num(m(AI, "apply-extra-uniform", "apply", 4, 35, "Everywhere $\\mathbb{E}[(Y - f)^{2} \\mid X] = 0.04$ and labels are requested uniformly with $\\pi = 0.25$. Find the extra variance term $\\mathbb{E}\\left[(Y - f)^{2}\\left(\\frac{1}{\\pi} - 1\\right)\\right]$."), 0.12),
  num(m(AI, "apply-n-var", "apply", 4, 35, "Continuing, $\\text{Var}(Y) = 0.2$. Find $N \\cdot \\text{Var}(\\hat{\\theta}) = \\text{Var}(Y) + $ the extra term."), 0.32),
  num(m(AI, "apply-mixing", "apply", 4, 30, "An uncertainty rule gives $\\pi_u = 0.4$ at a point, the uniform rule is $0.1$, and the mixing weight is $\\tau = 0.5$. Find $\\pi = (1 - \\tau)\\pi_u + \\tau \\cdot 0.1$."), 0.25),
  mcq(m(AI, "apply-useless-uncertainty", "apply", 4, 35, "If the uncertainty score is unrelated to the model's actual errors, active inference is:"),
    "Still valid, but gains little or may lose a bit relative to uniform labeling",
    [
      ["Invalid", "ai-useless-invalid", "Validity only needs known positive $\\pi$."],
      ["Always much better than uniform", "ai-useless-better", "Gains come from matching $\\pi$ to errors."],
      ["Biased toward the model's predictions", "ai-useless-biased", "The weights remove bias regardless."],
    ]),
  // level 5
  short(m(AI, "explain-unbiased", "explain", 5, 150, "Explain why the active estimator $\\frac{1}{N}\\sum_i \\left[f(X_i) + (Y_i - f(X_i))\\frac{\\xi_i}{\\pi(X_i)}\\right]$ is unbiased for $\\mathbb{E}[Y]$."),
    [
      ["xi-expectation", "Given $X_i$ and $Y_i$, $\\mathbb{E}\\left[\\frac{\\xi_i}{\\pi(X_i)}\\right] = 1$ because $\\xi_i \\sim \\text{Bernoulli}(\\pi(X_i))$", 2, true],
      ["term-expectation", "So each term has conditional expectation $f(X_i) + Y_i - f(X_i) = Y_i$, whose mean is $\\mathbb{E}[Y]$", 2, true],
      ["positivity", "Requires $\\pi > 0$ wherever it matters", 1],
    ]),
  mcq(m(AI, "apply-vs-ppi", "apply", 5, 35, "Compared with PPI, active inference:"),
    "Lets the labeling probability depend on $X$ and corrects with inverse probability weights",
    [
      ["Uses no unlabeled data", "ai-vsppi-nounlabeled", "It predicts on all points."],
      ["Needs no labels", "ai-vsppi-nolabels", "It needs labels for selected points."],
      ["Requires a perfect model", "ai-vsppi-perfect", "No model accuracy is required."],
    ]),
  mcq(m(AI, "apply-regression-uncertainty", "apply", 5, 35, "For a regression model, a natural uncertainty score $u(x)$ is:"),
    "A prediction of the absolute error $|Y - f(x)|$, e.g. from a second model trained on held-out residuals",
    [
      ["The prediction $f(x)$ itself", "ai-reg-pred", "Large predictions are not necessarily uncertain."],
      ["The feature norm $\\|x\\|$", "ai-reg-norm", "Unrelated to error in general."],
      ["A constant", "ai-reg-constant", "That gives uniform labeling."],
    ]),
  num(m(AI, "apply-estimator-four", "apply", 5, 50, "Four points have $f = [0.2, 0.8, 0.5, 0.9]$, $\\pi = [0.5, 0.25, 0.5, 0.25]$ and $\\xi = [1, 0, 1, 0]$. The labeled points have $Y_1 = 0$ and $Y_3 = 1$. Find the active estimate of $\\mathbb{E}[Y]$."), 0.75),
  // level 6
  short(m(AI, "explain-sqrt-rule", "explain", 6, 150, "Give the intuition for why the optimal labeling probability is proportional to the square root of the conditional mean squared error, rather than to the error itself."),
    [
      ["tradeoff", "Variance contribution is error times $\\frac{1}{\\pi}$, and budget is linear in $\\pi$", 2, true],
      ["balance", "Balancing marginal variance reduction $\\frac{e}{\\pi^{2}}$ against marginal cost gives $\\pi^{2} \\propto e$, i.e. $\\pi \\propto \\sqrt{e}$", 2, true],
    ]),
  num(m(AI, "apply-optimal-hard", "apply", 6, 50, "$80\\%$ of points have $\\mathbb{E}[(Y - f)^{2} \\mid X] = 0.01$ and $20\\%$ have $0.16$. The budget is $10\\%$ of points. With $\\pi \\propto \\sqrt{\\text{error}}$, find $\\pi$ for the hard points."), 0.25),
  num(m(AI, "apply-optimal-easy", "apply", 6, 50, "Same setting. Find $\\pi$ for the easy points. Give $4$ decimal places."), 0.0625),
  mcq(m(AI, "apply-cap", "apply", 6, 40, "If the formula $\\pi \\propto \\sqrt{\\text{error}}$ gives values above $1$ for some points:"),
    "Cap those at $1$ (always label them) and rescale the rest to meet the budget",
    [
      ["Use the values anyway", "ai-cap-anyway", "Probabilities cannot exceed $1$."],
      ["Drop those points", "ai-cap-drop", "Dropping them causes bias."],
      ["Switch to uniform labeling", "ai-cap-uniform", "Capping preserves most of the gain."],
    ]),
  // level 7
  short(m(AI, "explain-sequential", "explain", 7, 180, "In a sequential version, the model and $\\pi$ are updated after each batch of labels. What condition keeps inference valid, and why?"),
    [
      ["predictable", "Each $\\pi_t$ and $f_t$ must depend only on data from earlier batches (be predictable)", 2, true],
      ["martingale", "Then each term's error has conditional mean zero given the past, forming a martingale difference sequence, so a martingale CLT gives valid intervals", 2, true],
    ]),
  num(m(AI, "apply-extra-optimal", "apply", 7, 60, "Same setting ($80\\%$ easy at $0.01$, $20\\%$ hard at $0.16$, budget $10\\%$). Find the extra variance term under the optimal rule."), 0.216),
  num(m(AI, "apply-extra-uniform-two", "apply", 7, 50, "Same setting with uniform labeling at $\\pi = 0.1$. Find the extra variance term."), 0.36),
  mcq(m(AI, "apply-ci", "apply", 7, 45, "A confidence interval for the active estimate uses:"),
    "The sample standard deviation of the per-point terms divided by $\\sqrt{N}$",
    [
      ["The standard deviation of the labeled $Y$ only, divided by $\\sqrt{n_b}$", "ai-ci-labeled", "That ignores the weighting and predictions."],
      ["The model's training loss", "ai-ci-loss", "Unrelated to the estimator's variance."],
      ["No interval: active estimates have no variance", "ai-ci-none", "They are random through $\\xi$ and the data."],
    ]),
  // level 8
  short(m(AI, "derive-optimal-rule", "explain", 8, 240, "Derive $\\pi^{*}(x) \\propto \\sqrt{e(x)}$, where $e(x) = \\mathbb{E}[(Y - f)^{2} \\mid X = x]$, by minimising $\\mathbb{E}\\left[\\frac{e(X)}{\\pi(X)}\\right]$ subject to $\\mathbb{E}[\\pi(X)] = c$."),
    [
      ["lagrangian", "Form the Lagrangian $\\mathbb{E}\\left[\\frac{e}{\\pi}\\right] + \\mu\\left(\\mathbb{E}[\\pi] - c\\right)$ and minimise pointwise in $\\pi(x)$", 2, true],
      ["stationarity", "Pointwise derivative $-\\frac{e(x)}{\\pi(x)^{2}} + \\mu = 0$ gives $\\pi(x) = \\sqrt{\\frac{e(x)}{\\mu}}$", 2, true],
      ["normalise", "$\\mu$ is set by the budget, giving $\\pi \\propto \\sqrt{e}$ (capped at $1$)", 1],
    ]),
  num(m(AI, "apply-reduction", "apply", 8, 50, "In the example where the extra term falls from $0.36$ (uniform) to $0.216$ (optimal), find the fractional reduction $1 - \\frac{0.216}{0.36}$."), 0.4),
  num(m(AI, "apply-uniform-match", "apply", 8, 60, "Same setting: $\\mathbb{E}[(Y - f)^{2}] = 0.04$ overall. What uniform labeling fraction $b$ would give the same extra term $0.04\\left(\\frac{1}{b} - 1\\right) = 0.216$? Give $3$ decimal places."), 0.156),
  mcq(m(AI, "apply-misestimated", "apply", 8, 45, "If the error model used to set $\\pi$ is badly wrong but $\\pi$ stays positive and recorded:"),
    "The estimate is still unbiased and the interval valid; only efficiency suffers",
    [
      ["The estimate becomes biased", "ai-mis-biased", "Known $\\pi$ is what unbiasedness needs."],
      ["The interval becomes too narrow", "ai-mis-narrow", "The variance estimate accounts for the realised weights."],
      ["Labels must be discarded", "ai-mis-discard", "They remain usable."],
    ]),
  // level 9
  short(m(AI, "transfer-survey-llm", "transfer", 9, 240, "A political scientist has an LLM classify $50{,}000$ open-ended survey answers and can hand-code $2{,}000$. Describe an active inference design, and what to record."),
    [
      ["uncertainty", "Use the LLM's confidence (or disagreement across prompts) to set $\\pi$ higher for uncertain answers, with a uniform floor", 2, true],
      ["record", "Record each answer's $\\pi$ and coin flip, and keep the model fixed or updated only from past data", 1, true],
      ["estimate", "Estimate the share with the IPW-corrected active estimator and report the CLT interval", 2, true],
    ]),
  short(m(AI, "explain-mixing", "explain", 9, 210, "Why mix the uncertainty-based rule with a uniform rule, $\\pi = (1 - \\tau)\\pi_u + \\tau \\frac{n_b}{N}$? What does $\\tau$ trade off?"),
    [
      ["floor", "The uniform part keeps every $\\pi$ at least $\\tau \\frac{n_b}{N}$, preventing exploding weights", 2, true],
      ["robustness", "Protects against a miscalibrated uncertainty score", 1],
      ["tradeoff", "Larger $\\tau$ is safer but gives up some of the efficiency gain from targeting", 2, true],
    ]),
  num(m(AI, "apply-ci-halfwidth", "apply", 9, 60, "An active estimate over $N = 10{,}000$ points has per-point terms with sample variance $0.36$. Find the half-width of its $95\\%$ confidence interval (use $z = 1.96$). Give $4$ decimal places."), 0.0118),
  mcq(m(AI, "apply-m-estimation", "apply", 9, 45, "To estimate a regression coefficient actively, the label-dependent part of the loss is:"),
    "Weighted by $\\frac{\\xi_i}{\\pi(X_i)}$ inside a rectified objective, with predictions used for all points",
    [
      ["Ignored for unlabeled points and unweighted for labeled ones", "ai-m-unweighted", "Unweighted labels reintroduce selection bias."],
      ["Replaced entirely by predictions", "ai-m-predictions", "That is biased."],
      ["Weighted by $\\pi(X_i)$", "ai-m-pi", "The weight is the inverse probability."],
    ]),
  // level 10
  short(m(AI, "transfer-design-comparison", "transfer", 10, 300, "You must choose between classical labeling, PPI with uniform labeling, and active inference for estimating a disease prevalence from medical images, with a classifier available. How would you decide, and what would you check first?"),
    [
      ["model-quality", "Check how well predictions track labels (correlation/residual variance) on a pilot; PPI helps when residual variance is much smaller than outcome variance", 2, true],
      ["uncertainty-signal", "Active inference adds value when the classifier's uncertainty reliably flags where it errs; check calibration on the pilot", 2, true],
      ["validity", "All three are valid if sampling is random with known probabilities; choose by expected interval width per label cost", 1, true],
    ]),
  short(m(AI, "derive-variance", "explain", 10, 240, "Derive $N \\cdot \\text{Var}(\\hat{\\theta}) = \\text{Var}(Y) + \\mathbb{E}\\left[(Y - f)^{2}\\left(\\frac{1}{\\pi} - 1\\right)\\right]$ for the active estimator with i.i.d. data and a fixed model."),
    [
      ["total-variance", "Apply the law of total variance to one term $T = f + (Y - f)\\frac{\\xi}{\\pi}$, conditioning on $(X, Y)$", 2, true],
      ["conditional-mean", "$\\mathbb{E}[T \\mid X, Y] = Y$, contributing $\\text{Var}(Y)$", 1, true],
      ["conditional-variance", "$\\text{Var}(T \\mid X, Y) = (Y - f)^{2}\\frac{\\pi(1 - \\pi)}{\\pi^{2}} = (Y - f)^{2}\\left(\\frac{1}{\\pi} - 1\\right)$", 2, true],
    ]),
  num(m(AI, "apply-four-groups", "apply", 10, 75, "Four equally large groups have conditional errors $0.01, 0.04, 0.09, 0.16$ and the budget is $20\\%$. Find $\\pi$ for the hardest group under the optimal rule $\\pi \\propto \\sqrt{\\text{error}}$ (no capping needed)."), 0.32),
  mcq(m(AI, "apply-deterministic", "apply", 10, 60, "Why not simply label the $n_b$ most uncertain points deterministically?"),
    "Then all other points have $\\pi = 0$, so their errors are never measured and the estimate can be biased",
    [
      ["It costs more labels", "ai-det-cost", "It uses exactly $n_b$ labels."],
      ["It gives too much variance", "ai-det-variance", "The problem is bias, not variance."],
      ["Uncertain points are easier", "ai-det-easier", "They are harder, which is why they are chosen."],
    ]),
];

export const infer02Items: Item[] = [...ppi, ...active];
