import type { Item } from "../../lib/assessment/types";
import { m, mcq, num, short } from "./ml-sixty-shared";

/**
 * Regression and hinge losses, distance and cosine similarity, hyperparameter
 * search, permutation importance and partial dependence, each brought from 30
 * to 60 questions. These pools already spanned 1–10, so additions are spread
 * about three per level.
 */

// ---------------------------------------------------------------------------
// regression-losses
// ---------------------------------------------------------------------------
const RLS = "regression-losses";
const regressionLosses: Item[] = [
  // 1–10
  mcq(m(RLS, "recall-mse", "recall", 1, 15, "Mean squared error averages:"),
    "The squared differences between predictions and targets",
    [
      ["The absolute differences", "mse-absolute", "That's MAE."],
      ["The predictions themselves", "mse-predictions", "It averages squared errors."],
      ["The number of wrong predictions", "mse-count", "That's a classification error rate."],
    ]),
  mcq(m(RLS, "recall-mae", "recall", 1, 15, "Mean absolute error averages:"),
    "The absolute differences between predictions and targets",
    [
      ["The squared differences", "mae-squared", "That's MSE."],
      ["The relative (percentage) differences", "mae-percent", "That's MAPE."],
      ["The largest difference", "mae-max", "That's the maximum error."],
    ]),
  mcq(m(RLS, "recall-rmse-units", "recall", 1, 15, "Why is RMSE often reported instead of MSE?"),
    "RMSE is in the same units as the target, so it's easier to interpret",
    [
      ["RMSE is always smaller", "rmse-smaller", "RMSE exceeds MSE when MSE is below $1$."],
      ["RMSE ignores outliers", "rmse-outliers", "It's still driven by squared errors."],
      ["RMSE is a classification metric", "rmse-classification", "It's a regression metric."],
    ]),
  num(m(RLS, "apply-mse", "apply", 2, 20, "Residuals are $2$, $-2$ and $4$. What is the MSE?"), 8),
  num(m(RLS, "apply-mae", "apply", 2, 20, "Residuals are $1$, $-3$ and $2$. What is the MAE?"), 2),
  num(m(RLS, "apply-rmse", "apply", 2, 20, "Residuals are $3$, $-3$, $3$ and $-3$. What is the RMSE?"), 3),
  num(m(RLS, "apply-huber-small", "apply", 3, 25, "Huber loss with $\\delta = 1$ is $\\frac{1}{2}r^{2}$ for $|r| \\le \\delta$. What is it for $r = 0.5$?"), 0.125),
  num(m(RLS, "apply-huber-large", "apply", 3, 25, "Huber loss with $\\delta = 1$ is $\\delta\\left(|r| - \\frac{\\delta}{2}\\right)$ for $|r| > \\delta$. What is it for $r = 3$?"), 2.5),
  num(m(RLS, "apply-pinball-under", "apply", 3, 25, "Pinball loss with $\\tau = 0.8$ is $\\tau(y - \\hat{y})$ when $y > \\hat{y}$. What is it for $y = 10$ and $\\hat{y} = 7$?"), 2.4),
  num(m(RLS, "apply-pinball-over", "apply", 4, 30, "Pinball loss with $\\tau = 0.8$ is $(1 - \\tau)(\\hat{y} - y)$ when $y < \\hat{y}$. What is it for $y = 7$ and $\\hat{y} = 10$?"), 0.6),
  // 11–20
  num(m(RLS, "apply-mae-constant", "apply", 4, 30, "Targets are $2$, $4$ and $9$. Which constant prediction minimises MAE?"), 4),
  num(m(RLS, "apply-mse-constant", "apply", 4, 30, "Targets are $2$, $4$ and $9$. Which constant prediction minimises MSE?"), 5),
  mcq(m(RLS, "apply-mape-zero", "apply", 5, 40, "Why is MAPE a poor choice when some targets are near $0$?"),
    "Percentage errors divide by the target, so they blow up as the target approaches $0$",
    [
      ["MAPE ignores small targets", "mape-ignores", "It amplifies them."],
      ["MAPE can't be computed for positive targets", "mape-positive", "Positive targets are fine."],
      ["MAPE is the same as MSE", "mape-mse", "It's a relative absolute error."],
    ]),
  short(m(RLS, "explain-mse-or-mae", "explain", 5, 90, "When would you train with MAE rather than MSE, and what do you give up?"),
    [
      ["when", "When the data have outliers or heavy tails, or the median is the quantity of interest", 2, true],
      ["cost", "MAE's gradient doesn't shrink near the optimum and it's non-differentiable at $0$, so optimisation can be slower or less stable", 2, true],
    ]),
  num(m(RLS, "apply-mape", "apply", 5, 40, "Targets $100$ and $200$ are predicted as $110$ and $180$. What is the MAPE, in percent?"), 10),
  mcq(m(RLS, "apply-quantile-choice", "apply", 6, 45, "A model should predict a level that demand stays below $90\\%$ of the time. Which loss?"),
    "Pinball (quantile) loss with $\\tau = 0.9$",
    [
      ["MSE", "quantile-mse", "MSE targets the mean."],
      ["MAE", "quantile-mae", "MAE targets the median ($\\tau = 0.5$)."],
      ["Pinball loss with $\\tau = 0.1$", "quantile-low", "That targets the $10$th percentile."],
    ]),
  short(m(RLS, "explain-huber", "explain", 6, 120, "Explain how the Huber loss combines the strengths of MSE and MAE."),
    [
      ["small", "It's quadratic for small residuals, giving smooth gradients near the optimum like MSE", 2, true],
      ["large", "It's linear for large residuals, so outliers have bounded influence like MAE", 2, true],
    ]),
  num(m(RLS, "apply-mse-gradient", "apply", 6, 45, "The loss $(y - \\hat{y})^{2}$ has derivative $-2(y - \\hat{y})$ with respect to $\\hat{y}$. What is it for $y = 5$ and $\\hat{y} = 8$?"), 6),
  num(m(RLS, "transfer-huber-gradient", "transfer", 7, 60, "The Huber gradient magnitude is capped at $\\delta$. With $\\delta = 1.5$, what is the gradient magnitude for a residual of $5$?"), 1.5),
  num(m(RLS, "transfer-rmsle", "transfer", 7, 60, "RMSLE compares $\\ln(1 + y)$ with $\\ln(1 + \\hat{y})$. For one example with $y + 1 = e^{3}$ and $\\hat{y} + 1 = e^{2}$, what is the RMSLE?"), 1),
  // 21–30
  mcq(m(RLS, "transfer-poisson", "transfer", 7, 60, "Targets are counts of website visits, many of them small. Which loss matches this best?"),
    "Poisson deviance with a log link",
    [
      ["Hinge loss", "poisson-hinge", "Hinge loss is for classification."],
      ["Cross-entropy over two classes", "poisson-ce", "Counts aren't binary."],
      ["MSE on raw counts, always", "poisson-mse", "MSE ignores the mean–variance link of counts."],
    ]),
  num(m(RLS, "transfer-coverage", "transfer", 8, 60, "A well-calibrated $\\tau = 0.9$ quantile model is applied to $500$ test points. About how many targets fall below its predictions?"), 450),
  short(m(RLS, "transfer-asymmetric", "transfer", 8, 120, "A stock-out costs a shop far more than overstocking. Why is a symmetric loss like MSE the wrong training objective?"),
    [
      ["symmetric", "MSE penalises over- and under-prediction equally and targets the mean", 2, true],
      ["asymmetric", "An asymmetric (quantile) loss shifts predictions upward to the cost-optimal quantile", 2, true],
    ]),
  num(m(RLS, "transfer-r2", "transfer", 8, 60, "A model's MSE is $4$ and the target's variance is $16$. What is $R^{2} = 1 - \\frac{\\text{MSE}}{\\text{Var}(Y)}$?"), 0.75),
  short(m(RLS, "transfer-zero-inflated", "transfer", 9, 150, "Insurance claims are $0$ for most customers and large for a few. Why does plain MSE struggle, and what loss family is designed for this?"),
    [
      ["struggle", "The mass at $0$ plus a heavy right tail makes MSE dominated by the few large claims and badly suited to the skewed distribution", 2, true],
      ["tweedie", "Tweedie (compound Poisson–gamma) loss models a point mass at $0$ plus a continuous positive part", 2, true],
    ]),
  mcq(m(RLS, "transfer-log-target", "transfer", 9, 75, "A model trained with MSE on $\\ln Y$ is exponentiated to predict $Y$. If $\\ln Y$ is symmetric about its mean, what does the back-transformed prediction estimate?"),
    "The median of $Y$, which is below its mean for right-skewed data",
    [
      ["The mean of $Y$", "log-target-mean", "$e^{\\mathbb{E}[\\ln Y]} \\le \\mathbb{E}[Y]$ by Jensen's inequality."],
      ["The mode of $Y$", "log-target-mode", "It's the median when $\\ln Y$ is symmetric."],
      ["The maximum of $Y$", "log-target-max", "It's a central value."],
    ]),
  num(m(RLS, "transfer-mse-decomposition", "transfer", 9, 75, "A model's bias is $2$, its variance $3$ and the noise variance $1$. What is its expected MSE?"), 8),
  num(m(RLS, "transfer-pinball-minimiser", "transfer", 10, 90, "Targets are $1, 2, \\ldots, 9$. Which constant minimises the total pinball loss with $\\tau = 0.75$?"), 7),
  short(m(RLS, "transfer-match-business", "transfer", 10, 180, "A forecasting team trains with MSE but is judged on MAPE. Explain the mismatch and how to fix it."),
    [
      ["mismatch", "MSE targets the conditional mean and weights large-valued series heavily, while MAPE weights relative errors, favouring low-valued series and under-prediction", 2, true],
      ["fix", "Train with a loss aligned to the evaluation metric (e.g. weighted or relative loss), or choose an evaluation metric that reflects the true business cost", 2, true],
    ]),
  mcq(m(RLS, "transfer-loss-vs-metric", "transfer", 10, 90, "Why might you train with Huber loss but report RMSE?"),
    "Huber makes training robust to outliers, while RMSE is the familiar, interpretable metric stakeholders expect",
    [
      ["Because they always give the same model", "huber-rmse-same", "They can give different models."],
      ["Because RMSE can't be optimised", "rmse-not-optimisable", "It can; robustness is the motivation."],
      ["Because Huber is a classification loss", "huber-classification", "It's a regression loss."],
    ]),
];

// ---------------------------------------------------------------------------
// hinge-loss
// ---------------------------------------------------------------------------
const HL = "hinge-loss";
const hinge: Item[] = [
  // 1–10
  mcq(m(HL, "recall-formula", "recall", 1, 15, "For label $y \\in \\{-1, +1\\}$ and score $f$, the hinge loss is:"),
    "$\\max(0, 1 - yf)$",
    [
      ["$(y - f)^{2}$", "hinge-squared", "That's squared error."],
      ["$\\ln(1 + e^{-yf})$", "hinge-logistic", "That's logistic loss."],
      ["$\\max(0, -yf)$", "hinge-perceptron", "That's the perceptron loss, without the margin."],
    ]),
  mcq(m(HL, "recall-labels", "recall", 1, 15, "Hinge loss is usually written with labels coded as:"),
    "$-1$ and $+1$",
    [
      ["$0$ and $1$", "hinge-01", "The $yf$ form needs $\\pm 1$ labels."],
      ["Any real number", "hinge-real", "It's for binary classification."],
      ["One-hot vectors", "hinge-onehot", "The binary form uses $\\pm 1$."],
    ]),
  mcq(m(HL, "recall-margin", "recall", 1, 15, "The quantity $yf$ in hinge loss is called the:"),
    "Margin",
    [
      ["Residual", "margin-residual", "Residuals are $y - f$ in regression."],
      ["Learning rate", "margin-lr", "Unrelated."],
      ["Bias", "margin-bias", "It's the signed margin."],
    ]),
  num(m(HL, "apply-negative-score", "apply", 2, 20, "What is the hinge loss for $y = +1$ and $f = -0.5$?"), 1.5),
  num(m(HL, "apply-correct-negative", "apply", 2, 20, "What is the hinge loss for $y = -1$ and $f = -2$?"), 0),
  num(m(HL, "apply-on-margin", "apply", 2, 20, "What is the hinge loss for $y = +1$ and $f = 1$?"), 0),
  num(m(HL, "apply-average", "apply", 3, 25, "Three examples: $(y, f) = (+1, 0)$, $(-1, 0.5)$ and $(+1, 0.5)$. What is their average hinge loss?"), 1),
  num(m(HL, "apply-margin-value", "apply", 3, 25, "What is the margin $yf$ for $y = -1$ and $f = -0.3$?"), 0.3),
  num(m(HL, "apply-squared-hinge", "apply", 3, 25, "What is the squared hinge loss $\\max(0, 1 - yf)^{2}$ for $y = +1$ and $f = 0.4$?"), 0.36),
  num(m(HL, "apply-subgradient", "apply", 4, 35, "For $f = wx$ with $y = +1$, $x = 2$ and $yf < 1$, the subgradient of the hinge loss with respect to $w$ is $-yx$. What is it?"), -2),
  // 11–20
  num(m(HL, "apply-vs-zero-one", "apply", 4, 35, "For $y = +1$ and $f = 0.5$, how much larger is the hinge loss than the $0$–$1$ loss?"), 0.5),
  mcq(m(HL, "apply-inside-margin", "apply", 4, 35, "A point has $0 < yf < 1$. What is true of it?"),
    "It's correctly classified but inside the margin, so it still incurs hinge loss",
    [
      ["It's misclassified", "inside-misclassified", "A positive margin means correct."],
      ["It has zero loss", "inside-zero", "Loss is zero only when $yf \\ge 1$."],
      ["It's ignored by the SVM", "inside-ignored", "It's a support vector."],
    ]),
  short(m(HL, "explain-sparsity", "explain", 5, 90, "Why does training with hinge loss make an SVM depend on only some of the training points?"),
    [
      ["flat", "Points with $yf \\ge 1$ have zero loss and zero gradient, so they don't affect the solution", 2, true],
      ["support", "Only points on or inside the margin (support vectors) determine the boundary", 2, true],
    ]),
  mcq(m(HL, "apply-logistic-contrast", "apply", 5, 40, "How does logistic loss differ from hinge loss for a confidently correct point ($yf = 5$)?"),
    "Logistic loss is small but still positive, while hinge loss is exactly $0$",
    [
      ["Both are exactly $0$", "logistic-zero", "Logistic loss never reaches $0$."],
      ["Hinge loss is larger", "hinge-larger", "Hinge is $0$ here."],
      ["Logistic loss is negative", "logistic-negative", "Losses are non-negative."],
    ]),
  num(m(HL, "apply-logistic-at-one", "apply", 5, 40, "What is the logistic loss $\\ln(1 + e^{-yf})$ at $yf = 1$? Give $4$ decimal places."), 0.3133),
  num(m(HL, "apply-objective", "apply", 6, 50, "A 1-D linear SVM uses $\\frac{\\lambda}{2}w^{2}$ plus the mean hinge loss, with $\\lambda = 0.1$ and $w = 2$ (no bias). The points are $(x, y) = (1, +1)$ and $(0.25, +1)$. What is the objective?"), 0.45),
  num(m(HL, "apply-margin-width", "apply", 6, 45, "An SVM's margin width is $\\frac{2}{\\|\\mathbf{w}\\|}$. What is it for $\\mathbf{w} = [3, 4]$?"), 0.4),
  mcq(m(HL, "explain-nondifferentiable", "explain", 6, 50, "Where is hinge loss not differentiable, and how is it optimised anyway?"),
    "At $yf = 1$; subgradient methods (or the dual QP) handle the kink",
    [
      ["At $yf = 0$; it can't be optimised", "kink-zero", "The kink is at $1$, and it's routinely optimised."],
      ["Everywhere; only grid search works", "kink-everywhere", "It's piecewise linear."],
      ["Nowhere", "kink-nowhere", "There's a kink at the margin."],
    ]),
  num(m(HL, "transfer-pegasos-inactive", "transfer", 7, 60, "A subgradient step on $\\frac{\\lambda}{2}w^{2} + \\max(0, 1 - ywx)$ uses $w \\leftarrow w - \\eta\\lambda w$ when $ywx \\ge 1$. With $w = 1$, $\\lambda = 0.1$, $\\eta = 0.5$ and $(x, y) = (2, +1)$, what is the new $w$?"), 0.95),
  num(m(HL, "transfer-pegasos-active", "transfer", 7, 60, "When $ywx < 1$, the step is $w \\leftarrow w - \\eta(\\lambda w - yx)$. With $w = 0.5$, $\\lambda = 0.1$, $\\eta = 0.5$ and $(x, y) = (1, +1)$, what is the new $w$?"), 0.975),
  // 21–30
  mcq(m(HL, "transfer-large-c", "transfer", 7, 60, "In a soft-margin SVM, what happens as $C$ grows very large?"),
    "Margin violations become very costly, so the SVM approaches a hard margin and can overfit",
    [
      ["The margin widens", "large-c-wider", "Large $C$ shrinks the margin to cut violations."],
      ["All points become support vectors", "large-c-all-sv", "Typically fewer points violate the margin."],
      ["The hinge loss is ignored", "large-c-ignored", "It's weighted more heavily."],
    ]),
  short(m(HL, "transfer-outliers", "transfer", 8, 120, "Compare how a badly misclassified outlier affects hinge loss versus squared loss on $\\pm 1$ labels."),
    [
      ["linear", "Hinge loss grows linearly in the margin violation, so the outlier's pull is bounded per unit", 2, true],
      ["quadratic", "Squared loss grows quadratically, so a single outlier can dominate; squared loss also penalises confidently correct points", 2, true],
    ]),
  num(m(HL, "transfer-loss-ratio", "transfer", 8, 60, "For $y = +1$ and $f = -9$, how many times larger is $(1 - yf)^{2}$ than the hinge loss?"), 10),
  mcq(m(HL, "transfer-perceptron", "transfer", 8, 60, "How does hinge loss differ from the perceptron loss $\\max(0, -yf)$?"),
    "Hinge loss demands a margin of at least $1$, not just the correct sign",
    [
      ["They're identical", "perceptron-same", "The margin term differs."],
      ["The perceptron loss is smooth", "perceptron-smooth", "Both have a kink."],
      ["Hinge loss ignores correct points", "perceptron-ignores", "It penalises correct points inside the margin."],
    ]),
  short(m(HL, "transfer-bayes-sign", "transfer", 9, 150, "Explain why minimising expected hinge loss leads to the Bayes classifier, even though the scores aren't probabilities."),
    [
      ["minimiser", "The pointwise minimiser of expected hinge loss is $f = \\operatorname{sign}(2p - 1)$, which predicts the more likely class", 2, true],
      ["consequence", "So hinge is classification-calibrated: it recovers the right decisions, but the scores carry no probability information beyond the sign", 2, true],
    ]),
  num(m(HL, "transfer-crammer-singer", "transfer", 9, 75, "Crammer–Singer multiclass hinge loss is $\\max\\left(0, 1 + \\max_{j \\ne c} s_j - s_c\\right)$. With true-class score $3$ and other scores $2.5$ and $1$, what is it?"), 0.5),
  num(m(HL, "transfer-loo-bound", "transfer", 9, 75, "The leave-one-out error of an SVM is at most the fraction of training points that are support vectors. With $40$ support vectors out of $1{,}000$ points, what is the bound?"), 0.04),
  num(m(HL, "transfer-minimise", "transfer", 10, 90, "Minimise $\\frac{1}{2}w^{2} + 0.5\\max(0, 1 - w)$ over $w$. What is the minimiser?"), 0.5),
  short(m(HL, "transfer-probabilities", "transfer", 10, 180, "A product needs calibrated probabilities from a model trained with hinge loss. Explain the problem and a fix."),
    [
      ["problem", "Hinge loss only cares about margins past $1$, so its scores aren't calibrated probabilities", 2, true],
      ["fix", "Fit a calibration map on held-out scores (Platt scaling or isotonic regression), or switch to logistic loss", 2, true],
    ]),
  mcq(m(HL, "transfer-ranking", "transfer", 10, 90, "A pairwise ranking hinge loss $\\max(0, 1 - (s_i - s_j))$ is applied where item $i$ should rank above $j$. When is it zero?"),
    "When $s_i$ exceeds $s_j$ by at least $1$",
    [
      ["When $s_i = s_j$", "ranking-equal", "Equal scores give loss $1$."],
      ["When $s_i > s_j$ by any amount", "ranking-any", "The gap must be at least $1$."],
      ["Never", "ranking-never", "It's zero once the margin is met."],
    ]),
];

// ---------------------------------------------------------------------------
// distance-metrics
// ---------------------------------------------------------------------------
const DM = "distance-metrics";
const distances: Item[] = [
  // 1–10
  mcq(m(DM, "recall-l2", "recall", 1, 15, "Euclidean distance is also called the:"),
    "$L_2$ distance",
    [
      ["$L_1$ distance", "l2-l1", "$L_1$ is Manhattan."],
      ["$L_\\infty$ distance", "l2-linf", "$L_\\infty$ is Chebyshev."],
      ["Hamming distance", "l2-hamming", "Hamming counts mismatches."],
    ]),
  mcq(m(DM, "recall-chebyshev", "recall", 1, 15, "Chebyshev distance is:"),
    "The largest absolute difference across coordinates",
    [
      ["The sum of absolute differences", "chebyshev-sum", "That's Manhattan."],
      ["The square root of summed squares", "chebyshev-euclid", "That's Euclidean."],
      ["The number of differing coordinates", "chebyshev-count", "That's Hamming."],
    ]),
  mcq(m(DM, "recall-identity", "recall", 1, 15, "For a metric $d$, $d(\\mathbf{x}, \\mathbf{y}) = 0$ exactly when:"),
    "$\\mathbf{x} = \\mathbf{y}$",
    [
      ["$\\mathbf{x}$ and $\\mathbf{y}$ are orthogonal", "identity-orthogonal", "Orthogonal vectors can be far apart."],
      ["$\\mathbf{x}$ is the zero vector", "identity-zero", "It's about the two points being equal."],
      ["Never", "identity-never", "A point is at distance $0$ from itself."],
    ]),
  num(m(DM, "apply-euclid", "apply", 2, 20, "What is the Euclidean distance between $[0, 0]$ and $[6, 8]$?"), 10),
  num(m(DM, "apply-manhattan", "apply", 2, 20, "What is the Manhattan distance between $[1, 2]$ and $[4, -2]$?"), 7),
  num(m(DM, "apply-hamming", "apply", 2, 20, "What is the Hamming distance between the strings `karolin` and `kathrin`?"), 3),
  num(m(DM, "apply-chebyshev", "apply", 3, 25, "What is the Chebyshev distance between $[1, 5, 2]$ and $[4, 1, 3]$?"), 4),
  num(m(DM, "apply-minkowski", "apply", 3, 30, "The difference between two points is $[1, 2]$. What is their Minkowski distance with $p = 3$? Give $4$ decimal places."), 2.0801),
  num(m(DM, "apply-jaccard", "apply", 3, 25, "What is the Jaccard similarity of the sets $\\lbrace a, b, c \\rbrace$ and $\\lbrace b, c, d \\rbrace$?"), 0.5),
  num(m(DM, "apply-standardised", "apply", 4, 35, "Two features have standard deviations $2$ and $10$, and two points differ by $4$ and $30$. What is their Euclidean distance after dividing each feature by its standard deviation? Give $4$ decimal places."), 3.6056),
  // 11–20
  num(m(DM, "apply-triangle", "apply", 4, 35, "For a metric with $d(a, b) = 3$ and $d(b, c) = 4$, what is the largest possible $d(a, c)$?"), 7),
  mcq(m(DM, "apply-text", "apply", 4, 35, "For comparing documents of very different lengths by word counts, which is usually better than Euclidean distance?"),
    "Cosine distance, which ignores vector length",
    [
      ["Chebyshev distance", "text-chebyshev", "It's still length-sensitive."],
      ["Manhattan distance", "text-manhattan", "Also length-sensitive."],
      ["Hamming distance on raw counts", "text-hamming", "Counts aren't fixed-length symbol strings."],
    ]),
  short(m(DM, "explain-manhattan", "explain", 5, 90, "Give two reasons to prefer Manhattan over Euclidean distance."),
    [
      ["grid", "It matches movement along axes, e.g. city blocks or independent per-feature costs", 2, true],
      ["robust", "It's less dominated by a single large coordinate difference, and keeps more contrast in high dimensions", 2, true],
    ]),
  mcq(m(DM, "apply-mahalanobis-why", "apply", 5, 40, "What does Mahalanobis distance account for that Euclidean doesn't?"),
    "Differing feature scales and correlations between features",
    [
      ["Missing values", "mahalanobis-missing", "It needs complete vectors."],
      ["Categorical features", "mahalanobis-categorical", "It's for continuous features."],
      ["The order of features", "mahalanobis-order", "Order doesn't matter to either."],
    ]),
  num(m(DM, "apply-levenshtein", "apply", 5, 40, "What is the edit (Levenshtein) distance from `cat` to `cart`?"), 1),
  num(m(DM, "apply-mahalanobis-diag", "apply", 6, 45, "With mean $[0, 0]$ and covariance $\\operatorname{diag}(1, 4)$, what is the Mahalanobis distance of $[3, 2]$? Give $4$ decimal places."), 3.1623),
  num(m(DM, "apply-onehot", "apply", 6, 45, "Two different categories are one-hot encoded. What is the Euclidean distance between their vectors? Give $4$ decimal places."), 1.4142),
  short(m(DM, "explain-mixed", "explain", 6, 120, "Why is plain Euclidean distance awkward for data mixing numeric and categorical features?"),
    [
      ["scale", "Numeric features' scales are arbitrary, while one-hot features contribute fixed amounts, so the balance between them is arbitrary", 2, true],
      ["fix", "Use a mixed-type measure such as Gower distance, or scale and weight feature groups deliberately", 2, true],
    ]),
  num(m(DM, "transfer-contrast", "transfer", 7, 60, "In a high-dimensional dataset, a query's farthest neighbour is at distance $10$ and its nearest at $8$. What is the relative contrast $\\frac{d_{\\max} - d_{\\min}}{d_{\\min}}$?"), 0.25),
  short(m(DM, "transfer-concentration", "transfer", 7, 120, "What does “distance concentration” mean in high dimensions, and why does it hurt nearest-neighbour methods?"),
    [
      ["meaning", "As dimension grows, the ratio of farthest to nearest distances tends to $1$, so all points look about equally far", 2, true],
      ["hurt", "Nearest neighbours become barely nearer than random points, so they carry little information", 2, true],
    ]),
  // 21–30
  mcq(m(DM, "transfer-jaccard-sparse", "transfer", 7, 60, "Why is Jaccard similarity suited to sparse binary data such as shopping baskets?"),
    "It ignores shared absences ($0$–$0$ matches), which would otherwise dominate",
    [
      ["It counts shared absences", "jaccard-absences", "It deliberately ignores them."],
      ["It works only for continuous data", "jaccard-continuous", "It's for sets/binary data."],
      ["It's always $1$", "jaccard-one", "It varies with overlap."],
    ]),
  num(m(DM, "transfer-unit-euclid", "transfer", 8, 60, "For unit vectors, $\\|\\mathbf{a} - \\mathbf{b}\\|^{2} = 2 - 2\\cos\\theta$. What is the squared Euclidean distance when $\\cos\\theta = 0.6$?"), 0.8),
  num(m(DM, "transfer-squared-triangle", "transfer", 8, 60, "On the line, take points $0$, $1$ and $2$. By how much does the squared distance from $0$ to $2$ exceed the sum of the squared distances via $1$?"), 2),
  short(m(DM, "transfer-squared-not-metric", "transfer", 8, 120, "Squared Euclidean distance isn't a metric. Why doesn't that stop $k$-means from using it?"),
    [
      ["violation", "Squared Euclidean violates the triangle inequality", 2, true],
      ["fine", "$k$-means only compares distances and minimises within-cluster squared error, which doesn't need the triangle inequality (only methods relying on it, e.g. some indexes, are affected)", 2, true],
    ]),
  mcq(m(DM, "transfer-dtw", "transfer", 9, 75, "Two time series have the same shape but one is shifted and stretched in time. Which distance captures their similarity?"),
    "Dynamic time warping",
    [
      ["Point-wise Euclidean", "dtw-euclid", "It compares misaligned time points."],
      ["Hamming", "dtw-hamming", "It counts exact mismatches."],
      ["Jaccard", "dtw-jaccard", "It's for sets."],
    ]),
  num(m(DM, "transfer-mahalanobis-corr", "transfer", 9, 90, "With $\\Sigma = \\begin{bmatrix} 1 & 0.8 \\\\ 0.8 & 1 \\end{bmatrix}$ and mean $\\mathbf{0}$, what is the squared Mahalanobis distance of $[1, 1]$? Give $4$ decimal places."), 1.1111),
  short(m(DM, "transfer-choose", "transfer", 9, 150, "A $k$-NN recommender uses customer age, income, region and a binary “premium” flag. How would you choose and prepare a distance?"),
    [
      ["prepare", "Scale numeric features (e.g. standardise or rank), and handle region with a categorical match term", 2, true],
      ["choose", "Use a mixed measure such as Gower distance or weighted per-feature terms, and validate the choice by recommendation quality", 2, true],
    ]),
  num(m(DM, "transfer-emd", "transfer", 10, 90, "Distribution P puts mass $0.5$ at $0$ and $0.5$ at $4$; Q puts all its mass at $2$. What is the earth mover's distance between them?"), 2),
  short(m(DM, "transfer-metric-learning", "transfer", 10, 180, "Explain what metric learning does and why a learned Mahalanobis distance can beat Euclidean for $k$-NN."),
    [
      ["what", "It learns a distance (e.g. $M$ in $(\\mathbf{x} - \\mathbf{y})^{\\top}M(\\mathbf{x} - \\mathbf{y})$) from labels so same-class points are close and different-class points far", 2, true],
      ["why", "It stretches informative directions and shrinks irrelevant ones, which Euclidean distance treats equally", 2, true],
    ]),
  mcq(m(DM, "transfer-kdtree", "transfer", 10, 90, "Why do $k$-d trees lose their speed advantage in high dimensions?"),
    "Distances concentrate, so the search can rarely prune branches and visits most of the tree",
    [
      ["They can't store high-dimensional points", "kdtree-storage", "Storage is fine; pruning fails."],
      ["They only support Manhattan distance", "kdtree-manhattan", "They support several metrics."],
      ["They need labels", "kdtree-labels", "They're unsupervised indexes."],
    ]),
];

// ---------------------------------------------------------------------------
// cosine-similarity
// ---------------------------------------------------------------------------
const CS = "cosine-similarity";
const cosine: Item[] = [
  // 1–10
  mcq(m(CS, "recall-range", "recall", 1, 15, "Cosine similarity always lies in:"),
    "$[-1, 1]$",
    [
      ["$[0, 1]$", "cosine-01", "Negative values occur for opposing vectors."],
      ["$[0, \\infty)$", "cosine-unbounded", "It's bounded."],
      ["$[-\\infty, \\infty]$", "cosine-any", "It's a cosine, so bounded by $1$."],
    ]),
  mcq(m(CS, "recall-opposite", "recall", 1, 15, "Two vectors pointing in exactly opposite directions have cosine similarity:"),
    "$-1$",
    [
      ["$0$", "opposite-zero", "$0$ means orthogonal."],
      ["$1$", "opposite-one", "$1$ means the same direction."],
      ["Undefined", "opposite-undefined", "It's defined for nonzero vectors."],
    ]),
  mcq(m(CS, "recall-angle", "recall", 1, 15, "Cosine similarity depends on:"),
    "Only the angle between the vectors, not their lengths",
    [
      ["Only the lengths", "angle-lengths", "Lengths cancel in the formula."],
      ["Both angle and lengths", "angle-both", "Normalising removes length."],
      ["The number of dimensions only", "angle-dimensions", "It depends on direction."],
    ]),
  num(m(CS, "apply-same", "apply", 2, 20, "What is the cosine similarity of $[1, 1]$ and $[1, 1]$?"), 1),
  num(m(CS, "apply-orthogonal", "apply", 2, 20, "What is the cosine similarity of $[1, 0]$ and $[0, 1]$?"), 0),
  num(m(CS, "apply-opposite", "apply", 2, 20, "What is the cosine similarity of $[2, 0]$ and $[-3, 0]$?"), -1),
  num(m(CS, "apply-12-21", "apply", 3, 25, "What is the cosine similarity of $[1, 2]$ and $[2, 1]$?"), 0.8),
  num(m(CS, "apply-3d", "apply", 3, 25, "What is the cosine similarity of $[1, 0, 1]$ and $[1, 1, 0]$?"), 0.5),
  num(m(CS, "apply-unit-dot", "apply", 3, 25, "Two unit vectors are $60°$ apart. What is their dot product?"), 0.5),
  num(m(CS, "apply-34-43", "apply", 4, 30, "What is the cosine similarity of $[3, 4]$ and $[4, 3]$?"), 0.96),
  // 11–20
  num(m(CS, "apply-distance", "apply", 4, 30, "Same vectors. What is the cosine distance $1 - \\cos\\theta$?"), 0.04),
  mcq(m(CS, "apply-normalise", "apply", 4, 35, "After every vector is normalised to unit length, cosine similarity equals:"),
    "The dot product",
    [
      ["The Euclidean distance", "normalise-euclid", "Distance is related but not equal."],
      ["The sum of the coordinates", "normalise-sum", "It's the dot product."],
      ["Always $1$", "normalise-one", "It still varies with angle."],
    ]),
  short(m(CS, "explain-documents", "explain", 5, 90, "Why is cosine similarity preferred over Euclidean distance for comparing documents by word counts?"),
    [
      ["length", "A long document has larger counts, so Euclidean distance mostly reflects length", 2, true],
      ["direction", "Cosine compares the proportions of words (direction), which reflects topic regardless of length", 2, true],
    ]),
  mcq(m(CS, "apply-nonnegative", "apply", 5, 40, "For vectors with only non-negative entries, cosine similarity is:"),
    "Between $0$ and $1$",
    [
      ["Between $-1$ and $0$", "nonneg-negative", "Dot products of non-negative vectors are $\\ge 0$."],
      ["Always $1$", "nonneg-one", "It varies with angle."],
      ["Undefined", "nonneg-undefined", "It's defined for nonzero vectors."],
    ]),
  num(m(CS, "apply-angle-zero", "apply", 5, 40, "Cosine similarity is $0$. What is the angle between the vectors, in degrees?"), 90),
  num(m(CS, "apply-unit-euclid", "apply", 6, 45, "Two unit vectors have cosine similarity $0.5$. What is the Euclidean distance between them?"), 1),
  num(m(CS, "apply-parallel", "apply", 6, 45, "What is the cosine similarity of $[1, 2, 3]$ and $[2, 4, 6]$?"), 1),
  mcq(m(CS, "explain-centring", "explain", 6, 50, "Cosine similarity of mean-centred vectors equals which familiar quantity?"),
    "The Pearson correlation",
    [
      ["The covariance", "centring-covariance", "Covariance isn't normalised by lengths."],
      ["The Euclidean distance", "centring-euclid", "It's a correlation."],
      ["The Jaccard index", "centring-jaccard", "Jaccard is for sets."],
    ]),
  num(m(CS, "transfer-3d", "transfer", 7, 60, "What is the cosine similarity of $[2, 1, 2]$ and $[1, 2, 2]$? Give $4$ decimal places."), 0.8889),
  short(m(CS, "transfer-anisotropy", "transfer", 7, 120, "In some embedding spaces, almost every pair of vectors has cosine above $0.6$. Why is that a problem and what's a simple fix?"),
    [
      ["problem", "The embeddings occupy a narrow cone (anisotropy), so cosine differences between related and unrelated pairs are small", 2, true],
      ["fix", "Subtract the mean embedding (and optionally whiten) before computing cosine", 2, true],
    ]),
  // 21–30
  num(m(CS, "transfer-angle-60", "transfer", 7, 60, "Cosine similarity is $0.5$. What is the angle in degrees?"), 60),
  num(m(CS, "transfer-temperature", "transfer", 8, 60, "Contrastive losses divide cosine similarity by a temperature $\\tau$. What logit does a cosine of $0.8$ give with $\\tau = 0.1$?"), 8),
  mcq(m(CS, "transfer-mips", "transfer", 8, 60, "If all stored embeddings and the query are normalised, maximum inner product search is equivalent to:"),
    "Finding the highest cosine similarity",
    [
      ["Finding the largest-norm vector", "mips-norm", "Norms are all $1$."],
      ["Finding the farthest vector", "mips-farthest", "It finds the most similar."],
      ["Random search", "mips-random", "It's an exact equivalence."],
    ]),
  short(m(CS, "transfer-popularity", "transfer", 8, 120, "In item–item recommendation, why might cosine on raw rating vectors favour popular items, and what helps?"),
    [
      ["bias", "Popular items share many co-raters and their vectors overlap heavily with everything", 2, true],
      ["fix", "Centre ratings per user (adjusted cosine), apply IDF-style down-weighting, or shrink similarities based on few co-ratings", 2, true],
    ]),
  num(m(CS, "transfer-lsh-bit", "transfer", 9, 75, "Random-hyperplane LSH gives two vectors the same bit with probability $1 - \\frac{\\theta}{\\pi}$. What is it for $\\theta = 45°$?"), 0.75),
  num(m(CS, "transfer-lsh-k", "transfer", 9, 75, "Same vectors, a hash of $4$ independent bits. What is the probability all $4$ bits match? Give $4$ decimal places."), 0.3164),
  mcq(m(CS, "transfer-meaning", "transfer", 9, 75, "Two sentences — “the drug is safe” and “the drug is not safe” — get cosine $0.95$ from an embedding model. What does this show?"),
    "High cosine reflects shared topic and wording, not necessarily the same meaning",
    [
      ["The sentences mean the same", "meaning-same", "They contradict each other."],
      ["The model is broken", "meaning-broken", "This is typical behaviour."],
      ["Cosine can't exceed $0.9$", "meaning-cap", "It can reach $1$."],
    ]),
  num(m(CS, "transfer-random-sd", "transfer", 10, 90, "For two random directions in $d$ dimensions, the cosine similarity has standard deviation about $\\frac{1}{\\sqrt{d}}$. What is it for $d = 400$?"), 0.05),
  short(m(CS, "transfer-when-fails", "transfer", 10, 180, "Give a situation where cosine similarity is the wrong measure because magnitude matters, and suggest an alternative."),
    [
      ["situation", "E.g. comparing purchase amounts or rating intensity, where $[1, 1]$ and $[100, 100]$ shouldn't be identical", 2, true],
      ["alternative", "Use Euclidean or another magnitude-sensitive distance, or append the norm as a feature", 2, true],
    ]),
  num(m(CS, "transfer-angular-bound", "transfer", 10, 90, "Angular distance obeys the triangle inequality. If $\\mathbf{a}$ and $\\mathbf{b}$ are $30°$ apart and $\\mathbf{b}$ and $\\mathbf{c}$ are $40°$ apart, what is the largest possible angle between $\\mathbf{a}$ and $\\mathbf{c}$, in degrees?"), 70),
];

// ---------------------------------------------------------------------------
// hyperparameter-search
// ---------------------------------------------------------------------------
const HS = "hyperparameter-search";
const hyperSearch: Item[] = [
  // 1–10
  mcq(m(HS, "recall-definition", "recall", 1, 15, "A hyperparameter is:"),
    "A setting chosen before training rather than learned from the data by the training algorithm",
    [
      ["A weight learned by gradient descent", "hyper-weight", "That's a model parameter."],
      ["A feature of the data", "hyper-feature", "It configures the learner."],
      ["The test-set score", "hyper-score", "Scores are used to choose it."],
    ]),
  mcq(m(HS, "recall-example", "recall", 1, 15, "Which is a hyperparameter of a neural network?"),
    "The learning rate",
    [
      ["A weight in the first layer", "example-weight", "Weights are learned."],
      ["A bias term", "example-bias", "Biases are learned."],
      ["An activation value", "example-activation", "Activations are computed."],
    ]),
  mcq(m(HS, "recall-not-test", "recall", 1, 15, "Hyperparameters should be chosen using:"),
    "A validation set or cross-validation, not the test set",
    [
      ["The test set", "not-test-test", "That makes the test score optimistic."],
      ["The training loss alone", "not-test-train", "Training loss rewards overfitting."],
      ["Random guessing only", "not-test-random", "They should be chosen by validation."],
    ]),
  num(m(HS, "apply-grid", "apply", 2, 20, "A grid has $5$ values of one hyperparameter and $4$ of another. How many configurations?"), 20),
  num(m(HS, "apply-cv-fits", "apply", 2, 20, "Those $20$ configurations are each scored by $3$-fold cross-validation. How many model fits?"), 60),
  num(m(HS, "apply-random-fits", "apply", 2, 20, "Random search tries $50$ configurations with $5$-fold CV. How many fits?"), 250),
  num(m(HS, "apply-log-midpoint", "apply", 3, 25, "On a log scale, what value lies midway between $10^{-4}$ and $10^{-2}$?"), 0.001),
  num(m(HS, "apply-top5", "apply", 3, 25, "What is the probability that one random configuration lands in the top $5\\%$ of the search space?"), 0.05),
  num(m(HS, "apply-top5-any", "apply", 3, 30, "With $20$ independent random configurations, what is the probability at least one lands in the top $5\\%$? Give $4$ decimal places."), 0.6415),
  num(m(HS, "apply-grid-explosion", "apply", 4, 35, "A grid uses $6$ values for each of $4$ hyperparameters. How many configurations?"), 1296),
  // 11–20
  num(m(HS, "apply-distinct-values", "apply", 4, 35, "A $3 \\times 3$ grid and $9$ random configurations both cost $9$ runs. How many distinct values of the first hyperparameter does random search (with continuous sampling) try?"), 9),
  mcq(m(HS, "apply-coarse-fine", "apply", 4, 35, "A coarse search finds the best learning rate near $10^{-3}$. What's the usual next step?"),
    "Search more finely in a narrower range around $10^{-3}$",
    [
      ["Stop and use $10^{-3}$ on the test set repeatedly", "coarse-test", "Repeated test use leaks."],
      ["Restart the search over the original range", "coarse-restart", "Refine near the good region."],
      ["Switch to a fixed learning rate of $1$", "coarse-one", "That ignores the search."],
    ]),
  short(m(HS, "explain-test-leak", "explain", 5, 90, "Why is choosing hyperparameters by test-set score a mistake?"),
    [
      ["selection", "Choosing the best of many configurations on the test set fits the selection to that set's noise", 2, true],
      ["optimistic", "So the reported test score is optimistically biased and no longer estimates performance on new data", 2, true],
    ]),
  mcq(m(HS, "apply-halving", "apply", 5, 40, "Which strategy gives many configurations a small budget and repeatedly keeps only the best fraction?"),
    "Successive halving",
    [
      ["Grid search", "halving-grid", "Grid gives each configuration the full budget."],
      ["Bayesian optimisation", "halving-bo", "BO chooses configurations by a surrogate model."],
      ["Manual search", "halving-manual", "That's not a systematic budget scheme."],
    ]),
  num(m(HS, "apply-halving-budget", "apply", 5, 40, "Successive halving runs $27$ configurations for $1$ epoch, $9$ for $3$, $3$ for $9$ and $1$ for $27$. How many epochs in total?"), 108),
  num(m(HS, "apply-hours", "apply", 6, 45, "$120$ configurations, $5$-fold CV, each fit taking $1$ minute. How many hours does the search take on one machine?"), 10),
  short(m(HS, "explain-bo-tradeoff", "explain", 6, 120, "Explain the exploration–exploitation trade-off in Bayesian optimisation."),
    [
      ["exploit", "Exploitation evaluates configurations the surrogate predicts are good", 2, true],
      ["explore", "Exploration evaluates where the surrogate is uncertain; the acquisition function balances the two", 2, true],
    ]),
  mcq(m(HS, "explain-parallel", "explain", 6, 50, "Why is random search easier to parallelise than standard Bayesian optimisation?"),
    "Random configurations are independent, while BO chooses each configuration using results from previous ones",
    [
      ["Random search uses less memory", "parallel-memory", "Independence, not memory, is the point."],
      ["BO can't run on GPUs", "parallel-gpu", "Hardware isn't the issue."],
      ["Random search needs fewer evaluations", "parallel-fewer", "Often it needs more."],
    ]),
  num(m(HS, "transfer-ucb", "transfer", 7, 60, "A GP-UCB acquisition is $\\mu + \\kappa\\sigma$. With $\\mu = 0.8$, $\\sigma = 0.05$ and $\\kappa = 2$, what is it?"), 0.9),
  mcq(m(HS, "transfer-log-scale", "transfer", 7, 60, "Why search a regularisation strength $\\lambda$ on a log scale?"),
    "Its effect changes by orders of magnitude, so equal steps in $\\log\\lambda$ matter about equally",
    [
      ["$\\lambda$ must be an integer", "log-integer", "It's continuous."],
      ["Linear scales can't contain $0$", "log-zero", "The reason is relative sensitivity."],
      ["Log scales are always faster", "log-faster", "Cost is the same per evaluation."],
    ]),
  // 21–30
  short(m(HS, "transfer-noise", "transfer", 7, 120, "Two configurations score $0.812$ and $0.809$ in a single run each. Why shouldn't you conclude the first is better?"),
    [
      ["noise", "Run-to-run variation from seeds and data splits can easily exceed a $0.003$ gap", 2, true],
      ["fix", "Repeat with several seeds or folds and compare means relative to their spread", 2, true],
    ]),
  num(m(HS, "transfer-nested-fits", "transfer", 8, 60, "Nested CV with $5$ outer folds, $4$ inner folds and $10$ configurations, plus one refit per outer fold, needs how many fits?"), 205),
  mcq(m(HS, "transfer-low-effective-dim", "transfer", 8, 60, "Only one of three hyperparameters matters much. Why does random search beat a grid of the same size here?"),
    "Random search tries many distinct values of the important hyperparameter, while a grid repeats only a few",
    [
      ["Grid search can't handle three dimensions", "low-dim-grid", "It can; it wastes runs."],
      ["Random search ignores unimportant hyperparameters", "low-dim-ignores", "It samples them too, but that costs nothing extra."],
      ["Grids always miss the optimum", "low-dim-always", "Not always; just less efficiently."],
    ]),
  short(m(HS, "transfer-budget", "transfer", 8, 120, "You have budget for $100$ training runs. Describe a sensible plan for using them."),
    [
      ["broad", "Spend part on a broad random (or low-fidelity) search over sensible log-scaled ranges", 2, true],
      ["focus", "Spend the rest refining around good regions (or with BO/successive halving), and keep some for repeated runs of finalists", 2, true],
    ]),
  num(m(HS, "transfer-hyperband-brackets", "transfer", 9, 75, "Hyperband with maximum budget $R = 81$ and $\\eta = 3$ runs $\\lfloor \\log_{3} 81 \\rfloor + 1$ brackets. How many?"), 5),
  short(m(HS, "transfer-validation-overfit", "transfer", 9, 150, "After trying $5{,}000$ configurations, the best validation score is much higher than its test score. Explain why."),
    [
      ["selection", "With many configurations, the best validation score is partly lucky noise (winner's curse)", 2, true],
      ["fix", "Use a larger validation set, nested CV or a held-out test set, and limit the effective number of comparisons", 2, true],
    ]),
  mcq(m(HS, "transfer-warm-start", "transfer", 9, 75, "A team retunes the same model weekly on fresh data. What saves the most search effort?"),
    "Warm-starting the search from last week's best configurations",
    [
      ["Starting from scratch each week", "warm-scratch", "That discards useful knowledge."],
      ["Using the test set for tuning", "warm-test", "That leaks."],
      ["Fixing all hyperparameters forever", "warm-fixed", "Data drift may change the optimum."],
    ]),
  num(m(HS, "transfer-expected-max", "transfer", 10, 90, "If configuration quality is uniform on $[0, 1]$, the expected best of $n$ random draws is $\\frac{n}{n + 1}$. What is it for $n = 19$?"), 0.95),
  short(m(HS, "transfer-report", "transfer", 10, 180, "How should the final performance of a tuned model be reported honestly?"),
    [
      ["separate", "Estimate it on data not used in any tuning decision (a held-out test set or the outer loop of nested CV)", 2, true],
      ["context", "Report the search space and budget, and variance across seeds/folds", 2, true],
    ]),
  mcq(m(HS, "transfer-interaction", "transfer", 10, 90, "The best learning rate depends on the batch size. What does this imply for tuning?"),
    "Tune them jointly (or reparametrise, e.g. scale the learning rate with batch size), not one at a time",
    [
      ["Tune each independently with the other fixed", "interaction-independent", "Interaction makes one-at-a-time search miss the optimum."],
      ["Batch size needn't be tuned", "interaction-ignore", "It interacts with the learning rate."],
      ["Use the largest batch always", "interaction-largest", "That changes the optimal learning rate."],
    ]),
];

// ---------------------------------------------------------------------------
// permutation-importance
// ---------------------------------------------------------------------------
const PI = "permutation-importance";
const permImportance: Item[] = [
  // 1–10
  mcq(m(PI, "recall-agnostic", "recall", 1, 15, "Permutation importance can be computed for:"),
    "Any trained model, since it only needs predictions",
    [
      ["Only linear models", "agnostic-linear", "It's model-agnostic."],
      ["Only decision trees", "agnostic-trees", "It works with any model."],
      ["Only neural networks", "agnostic-nn", "It works with any model."],
    ]),
  mcq(m(PI, "recall-no-retrain", "recall", 1, 15, "Does permutation importance require retraining the model?"),
    "No — it shuffles a feature and re-scores the already-trained model",
    [
      ["Yes, once per feature", "retrain-per-feature", "That's drop-column importance."],
      ["Yes, once overall", "retrain-once", "No retraining is needed."],
      ["Only for categorical features", "retrain-categorical", "No retraining for any feature."],
    ]),
  mcq(m(PI, "recall-large-drop", "recall", 1, 15, "Shuffling a feature causes a large drop in accuracy. This means:"),
    "The model relies heavily on that feature",
    [
      ["The feature is noise", "drop-noise", "Noise features give drops near $0$."],
      ["The feature should be removed", "drop-remove", "It's important to the model."],
      ["The model is overfitting", "drop-overfit", "It just shows reliance."],
    ]),
  num(m(PI, "apply-drop", "apply", 2, 20, "Baseline accuracy is $0.92$; after shuffling a feature it's $0.80$. What is the importance (drop)?"), 0.12),
  num(m(PI, "apply-rmse-increase", "apply", 2, 20, "Baseline RMSE is $2.0$; after shuffling a feature it's $2.6$. What is the importance (increase)?"), 0.6),
  num(m(PI, "apply-ratio", "apply", 2, 20, "Same numbers. What is the ratio form of the importance, $\\frac{\\text{RMSE}_{\\text{shuffled}}}{\\text{RMSE}_{\\text{baseline}}}$?"), 1.3),
  num(m(PI, "apply-mean-repeats", "apply", 3, 25, "Three shuffles give accuracy drops $0.05$, $0.07$ and $0.06$. What is the importance estimate?"), 0.06),
  num(m(PI, "apply-evaluations", "apply", 3, 25, "With $10$ features shuffled $5$ times each, plus one baseline evaluation, how many model evaluations are needed?"), 51),
  num(m(PI, "apply-rank", "apply", 3, 25, "Importances are A: $0.02$, B: $0.09$, C: $0.04$. What rank does C get (1 = most important)?"), 2),
  num(m(PI, "apply-negative", "apply", 4, 30, "Accuracy is $0.85$ and becomes $0.86$ after shuffling a feature. What is its importance?"), -0.01),
  // 11–20
  mcq(m(PI, "apply-holdout", "apply", 4, 35, "Why compute permutation importance on held-out data rather than training data?"),
    "On training data an overfit model may seem to rely on features that don't help it generalise",
    [
      ["Training data can't be shuffled", "holdout-shuffle", "They can; the result is misleading."],
      ["Held-out data are larger", "holdout-larger", "Size isn't the reason."],
      ["It makes the computation faster", "holdout-faster", "Speed isn't the point."],
    ]),
  num(m(PI, "apply-auc-drop", "apply", 4, 30, "AUC falls from $0.75$ to $0.50$ after shuffling a feature. What is its importance?"), 0.25),
  short(m(PI, "explain-vs-drop-column", "explain", 5, 90, "How does permutation importance differ from drop-column importance?"),
    [
      ["permutation", "Permutation shuffles a feature in an existing model, measuring that model's reliance on it", 2, true],
      ["drop", "Drop-column retrains without the feature, measuring how much the best achievable model loses — so correlated substitutes can take over", 2, true],
    ]),
  mcq(m(PI, "apply-unused", "apply", 5, 40, "A trained model never uses feature X. What is X's permutation importance?"),
    "Exactly $0$, since predictions don't change",
    [
      ["Positive", "unused-positive", "Unchanged predictions give no drop."],
      ["Negative", "unused-negative", "There's no change at all."],
      ["Undefined", "unused-undefined", "It's simply $0$."],
    ]),
  num(m(PI, "apply-share", "apply", 5, 40, "Importances are $0.10$, $0.06$ and $0.04$. What share of the total does the first feature have?"), 0.5),
  num(m(PI, "apply-linear-mse", "apply", 6, 50, "The correct model is $\\hat{y} = 2x_1 + x_2$ with $x_1, x_2$ i.i.d. with variance $1$. Shuffling $x_1$ increases MSE by $2\\beta_1^{2}\\text{Var}(X_1)$. By how much?"), 8),
  short(m(PI, "explain-correlated", "explain", 6, 120, "Why can permutation importance be misleading when features are strongly correlated?"),
    [
      ["unrealistic", "Shuffling one creates unrealistic combinations with its correlated partner, probing the model off the data manifold", 2, true],
      ["substitution", "The model may split reliance between them, so each looks less (or more) important than the pair's joint role", 2, true],
    ]),
  mcq(m(PI, "explain-mdi", "explain", 6, 50, "Why is permutation importance often preferred to impurity-based (MDI) importance for random forests?"),
    "MDI is biased toward high-cardinality features and computed on training data",
    [
      ["MDI can't be computed", "mdi-impossible", "It's computed during training."],
      ["Permutation importance is always faster", "mdi-faster", "It's usually slower."],
      ["MDI is model-agnostic", "mdi-agnostic", "It's specific to trees."],
    ]),
  num(m(PI, "transfer-se", "transfer", 7, 60, "Repeated shuffles give importances with standard deviation $0.02$. With $4$ repeats, what is the standard error of their mean?"), 0.01),
  mcq(m(PI, "transfer-leak", "transfer", 7, 60, "A “record ID” feature has the highest permutation importance. What's the likely explanation?"),
    "Leakage — the ID correlates with the label through how the data were collected",
    [
      ["IDs are genuinely predictive", "leak-genuine", "IDs shouldn't carry signal."],
      ["Permutation importance is broken", "leak-broken", "It's correctly revealing reliance."],
      ["The feature should be standardised", "leak-standardise", "Scaling doesn't fix leakage."],
    ]),
  // 21–30
  short(m(PI, "transfer-time-series", "transfer", 7, 120, "Why is naively shuffling a lag feature in a time-series model problematic?"),
    [
      ["structure", "It breaks the relation between the lag and other lags/trends, creating impossible series", 2, true],
      ["alternative", "Use block permutation or conditional schemes that respect temporal structure", 2, true],
    ]),
  num(m(PI, "transfer-cost", "transfer", 8, 60, "$50$ features, $10$ repeats each, and $3$ seconds per evaluation on the test set. How many minutes does it take (ignoring the baseline)?"), 25),
  mcq(m(PI, "transfer-conditional", "transfer", 8, 60, "Conditional permutation importance shuffles a feature only within groups of similar correlated features. What question does it answer?"),
    "How much the feature adds beyond what its correlated features already provide",
    [
      ["How much the model uses it marginally", "conditional-marginal", "That's standard permutation."],
      ["Whether it's causal", "conditional-causal", "It's still not causal."],
      ["How fast the model runs", "conditional-speed", "Unrelated."],
    ]),
  short(m(PI, "transfer-model-not-data", "transfer", 8, 120, "Explain why permutation importance describes the model, not the data-generating process."),
    [
      ["model", "It measures how much this model's predictions rely on the feature", 2, true],
      ["differ", "Another equally accurate model might use a correlated substitute, giving a very different importance", 2, true],
    ]),
  num(m(PI, "transfer-pvalue", "transfer", 9, 75, "To test an importance, the label is permuted $99$ times. Only $3$ null importances exceed the observed one. What is the permutation $p$-value $\\frac{3 + 1}{99 + 1}$?"), 0.04),
  short(m(PI, "transfer-selection", "transfer", 9, 150, "What can go wrong when using permutation importance to drop features one batch at a time?"),
    [
      ["correlated", "Correlated features each look unimportant, so both may be dropped even though one was needed", 2, true],
      ["leakage", "Selecting on the same data used for evaluation biases the final score; selection should be inside the CV loop", 2, true],
    ]),
  mcq(m(PI, "transfer-vs-shap", "transfer", 9, 75, "How does permutation importance differ from mean absolute SHAP value?"),
    "Permutation measures the loss in performance; mean |SHAP| measures how much the feature moves predictions",
    [
      ["They're identical", "shap-identical", "They measure different things."],
      ["SHAP needs labels", "shap-labels", "SHAP is computed from predictions alone."],
      ["Permutation importance is local", "shap-local", "It's global."],
    ]),
  num(m(PI, "transfer-binary-drop", "transfer", 10, 90, "A balanced binary label is perfectly predicted by one feature (accuracy $1.0$). After shuffling it, the model's accuracy is about $0.5$. What is the importance?"), 0.5),
  short(m(PI, "transfer-rashomon", "transfer", 10, 180, "Explain model class reliance and why it gives a fuller picture than one model's permutation importance."),
    [
      ["definition", "Model class reliance is the range of importances across all models that perform nearly as well", 2, true],
      ["fuller", "A feature with high minimum reliance is needed by every good model; one with a wide range may be replaceable", 2, true],
    ]),
  mcq(m(PI, "transfer-shift", "transfer", 10, 90, "Permutation importances computed last year differ sharply from those computed today on new data. What does this suggest?"),
    "The data distribution (or the model's use of features) has shifted, so the model should be checked for drift",
    [
      ["Permutation importance is random", "shift-random", "Large systematic changes aren't just noise."],
      ["The model got more accurate", "shift-accurate", "Importance changes don't imply that."],
      ["Nothing", "shift-nothing", "It's a warning sign."],
    ]),
];

// ---------------------------------------------------------------------------
// partial-dependence
// ---------------------------------------------------------------------------
const PD = "partial-dependence";
const partialDependence: Item[] = [
  // 1–10
  mcq(m(PD, "recall-average", "recall", 1, 15, "A partial dependence plot shows:"),
    "The model's average prediction as one feature varies, averaging over the others",
    [
      ["One row's prediction", "pd-one-row", "That's an ICE curve."],
      ["The data's histogram", "pd-histogram", "It shows model predictions."],
      ["The feature's importance score", "pd-importance", "It shows a curve, not one number."],
    ]),
  mcq(m(PD, "recall-ice", "recall", 1, 15, "An ICE plot draws:"),
    "One curve per instance, showing how its prediction changes with the feature",
    [
      ["The average curve only", "ice-average", "That's the PDP."],
      ["A bar per feature", "ice-bars", "That's an importance chart."],
      ["Residuals", "ice-residuals", "It plots predictions."],
    ]),
  mcq(m(PD, "recall-global", "recall", 1, 15, "A partial dependence plot is a:"),
    "Global explanation",
    [
      ["Local explanation", "pd-local", "It averages over the dataset."],
      ["Training algorithm", "pd-training", "It explains a trained model."],
      ["Loss function", "pd-loss", "It's an explanation tool."],
    ]),
  num(m(PD, "apply-additive", "apply", 2, 20, "Model $f(x, z) = 3x + z$, with observed $z \\in \\lbrace 0, 4 \\rbrace$. What is the partial dependence at $x = 2$?"), 8),
  num(m(PD, "apply-additive-zero", "apply", 2, 20, "Model $f(x, z) = x + 2z$, with observed $z \\in \\lbrace 1, 3 \\rbrace$. What is the partial dependence at $x = 0$?"), 4),
  num(m(PD, "apply-ice-average", "apply", 2, 20, "At $x = 5$, three ICE curves take values $1$, $3$ and $5$. What is the PDP value there?"), 3),
  num(m(PD, "apply-square", "apply", 3, 25, "Model $f(x, z) = x^{2} + z$, with observed $z$ averaging $0$. What is the partial dependence at $x = 3$?"), 9),
  num(m(PD, "apply-slope", "apply", 3, 25, "Model $f(x, z) = xz$, with observed $z \\in \\lbrace 1, 2, 3 \\rbrace$. What is the slope of the PDP in $x$?"), 2),
  num(m(PD, "apply-cost", "apply", 3, 25, "A PDP over $20$ grid values on $1{,}000$ rows needs how many predictions?"), 20000),
  num(m(PD, "apply-interaction-pd", "apply", 4, 30, "Model $f(x, z) = x + xz$, with observed $z \\in \\lbrace -1, 1 \\rbrace$. What is the PD at $x = 5$?"), 5),
  // 11–20
  num(m(PD, "apply-interaction-ice", "apply", 4, 30, "Same model. What is the ICE value at $x = 5$ for the row with $z = 1$?"), 10),
  mcq(m(PD, "apply-flat-crossing", "apply", 4, 35, "The PDP for a feature is flat, but its ICE curves slope sharply up and down. What does this suggest?"),
    "The feature matters through interactions whose effects cancel on average",
    [
      ["The feature is irrelevant", "flat-irrelevant", "ICE shows strong individual effects."],
      ["The model is linear", "flat-linear", "Crossing curves indicate interaction."],
      ["The plot is broken", "flat-broken", "This is a known PDP limitation."],
    ]),
  short(m(PD, "explain-ale", "explain", 5, 90, "How do ALE plots differ from PDPs, and when are they better?"),
    [
      ["method", "ALE accumulates local prediction differences within small intervals of the feature, using only nearby real data", 2, true],
      ["when", "They're better when features are correlated, since PDPs then average over unrealistic combinations", 2, true],
    ]),
  mcq(m(PD, "apply-centred-ice", "apply", 5, 40, "Centred ICE plots subtract each curve's value at a reference point. Why?"),
    "So differences in shape (heterogeneous effects) stand out instead of differences in level",
    [
      ["To remove all variation", "cice-remove", "They keep shape differences."],
      ["To compute the PDP faster", "cice-faster", "It's about readability."],
      ["To make the curves cross", "cice-cross", "It aligns their starting points."],
    ]),
  num(m(PD, "apply-2d-cost", "apply", 5, 40, "A two-dimensional PDP on a $10 \\times 10$ grid over $500$ rows needs how many predictions?"), 50000),
  num(m(PD, "apply-indicator", "apply", 6, 45, "Model $f(x, z) = x \\cdot \\mathbb{1}[z > 0]$, with $z$ equally likely to be $1$ or $-1$. What is the slope of the PDP in $x$?"), 0.5),
  short(m(PD, "explain-extrapolation", "explain", 6, 120, "Why does a PDP extrapolate when the feature of interest is correlated with others?"),
    [
      ["combinations", "It sets the feature to every grid value for every row, pairing it with others' values that never co-occur with it", 2, true],
      ["consequence", "The model is evaluated in regions with no training data, so the curve can reflect arbitrary behaviour", 2, true],
    ]),
  mcq(m(PD, "explain-scale", "explain", 6, 50, "For a classifier, PDPs are often drawn on the log-odds scale rather than the probability scale. Why?"),
    "Effects that are additive in log-odds look non-linear and compressed on the probability scale near $0$ and $1$",
    [
      ["Probabilities can't be averaged", "scale-average", "They can; the scale changes interpretation."],
      ["Log-odds are always positive", "scale-positive", "They can be negative."],
      ["It makes the plot faster", "scale-faster", "Speed isn't the reason."],
    ]),
  num(m(PD, "transfer-mplot", "transfer", 7, 60, "Model $f = 3x_1 + x_2$, and in the data $x_2 = x_1$ exactly. The M-plot averages predictions over rows with that $x_1$. What is the M-plot's slope?"), 4),
  short(m(PD, "transfer-steps", "transfer", 7, 120, "Why do PDPs of tree ensembles often look like staircases?"),
    [
      ["splits", "Trees predict piecewise-constant values, changing only at split thresholds", 2, true],
      ["ensemble", "Averaging many trees smooths this somewhat, but the curve still jumps at common thresholds and is flat outside the data range", 2, true],
    ]),
  // 21–30
  mcq(m(PD, "transfer-not-causal", "transfer", 7, 60, "A PDP shows predicted sales rising with ad spend. Does this show that more ad spend causes more sales?"),
    "Not by itself — it describes the model's behaviour, which reflects associations in the data",
    [
      ["Yes, PDPs are causal", "pd-causal", "They're causal only under strong assumptions."],
      ["Yes, if the model is accurate", "pd-accurate", "Accuracy doesn't make it causal."],
      ["No, PDPs never relate to causation", "pd-never", "Under assumptions they can."],
    ]),
  num(m(PD, "transfer-ale", "transfer", 8, 60, "For $f(x) = x^{2}$ with ALE bins $[0, 1]$ and $[1, 2]$, the local effects are $f(1) - f(0)$ and $f(2) - f(1)$. What is the (uncentred) accumulated effect at $x = 2$?"), 4),
  mcq(m(PD, "transfer-marginal-conditional", "transfer", 8, 60, "A PDP averages over the marginal distribution of the other features; an M-plot over their conditional distribution. Which mixes in the effects of correlated features?"),
    "The M-plot",
    [
      ["The PDP", "marginal-pdp", "The PDP holds the others' distribution fixed."],
      ["Neither", "marginal-neither", "The M-plot absorbs correlated effects."],
      ["Both equally", "marginal-both", "Only the conditional average does."],
    ]),
  short(m(PD, "transfer-monotonic", "transfer", 8, 120, "A credit model should never lower the score as income rises. How can PDPs and ICE curves help check this, and what's a stronger guarantee?"),
    [
      ["check", "Inspect the income PDP and ICE curves for any decreasing segments", 2, true],
      ["guarantee", "Plots only check sampled points; enforce a monotonic constraint during training (e.g. in gradient boosting) for a guarantee", 2, true],
    ]),
  num(m(PD, "transfer-x2z", "transfer", 9, 75, "Model $f(x, z) = x^{2}z$, with observed $z \\in \\lbrace 1, 3 \\rbrace$. What is the PD at $x = 2$?"), 8),
  short(m(PD, "transfer-causal-condition", "transfer", 9, 150, "Under what condition can a PDP be read as a causal effect of the feature on the outcome?"),
    [
      ["model", "The model must be a good approximation of the true outcome function", 2, true],
      ["backdoor", "The other features must block all confounding paths (satisfy the backdoor criterion) for that feature", 2, true],
    ]),
  mcq(m(PD, "transfer-rug", "transfer", 9, 75, "Why do PDPs often include a rug plot or histogram along the $x$-axis?"),
    "To show where data are dense, so regions with little data (where the curve is unreliable) are visible",
    [
      ["To show feature importance", "rug-importance", "It shows data density."],
      ["To show the labels", "rug-labels", "It marks observed feature values."],
      ["Decoration", "rug-decoration", "It's informative."],
    ]),
  num(m(PD, "transfer-slope-interaction", "transfer", 10, 90, "Model $f(x, z) = x + z + xz$, with observed $z \\in \\lbrace 0, 2 \\rbrace$. What is the PD at $x = 3$?"), 7),
  short(m(PD, "transfer-h-statistic", "transfer", 10, 180, "Describe the idea behind Friedman's $H$-statistic for detecting interactions."),
    [
      ["decompose", "Without interaction, the two-way partial dependence equals the sum of the one-way partial dependences", 2, true],
      ["measure", "$H^{2}$ is the share of the two-way PD's variance not explained by that sum, so larger values mean stronger interaction", 2, true],
    ]),
  mcq(m(PD, "transfer-heterogeneity", "transfer", 10, 90, "ICE curves split into two groups with opposite slopes. What's a good next step?"),
    "Find which feature separates the groups (e.g. colour ICE curves by candidate features) to identify the interaction",
    [
      ["Report only the PDP", "heterogeneity-pdp", "That hides the split."],
      ["Drop the feature", "heterogeneity-drop", "It matters strongly to subgroups."],
      ["Retrain with more trees", "heterogeneity-retrain", "The split is likely real structure."],
    ]),
];

export const mlSixty11Items: Item[] = [
  ...regressionLosses,
  ...hinge,
  ...distances,
  ...cosine,
  ...hyperSearch,
  ...permImportance,
  ...partialDependence,
];
