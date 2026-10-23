import type { Item } from "../../lib/assessment/types";
import { m, mcq, num, short } from "./infer-shared";

/**
 * Path signatures and signature methods for time series. Forty questions per
 * lesson, four at each level. Paths are piecewise linear unless stated, and the
 * Lévy area is $A^{1,2} = \frac{1}{2}(S^{1,2} - S^{2,1})$.
 */

// ---------------------------------------------------------------------------
// path-signatures
// ---------------------------------------------------------------------------
const PS = "path-signatures";
const signatures: Item[] = [
  // level 1
  mcq(m(PS, "recall-definition", "recall", 1, 15, "The signature of a path $\\mathbf{X}$ is:"),
    "The collection of all its iterated integrals $\\int_{t_1 < \\cdots < t_k} dX^{i_1}_{t_1} \\cdots dX^{i_k}_{t_k}$",
    [
      ["The Fourier coefficients of the path", "ps-def-fourier", "Signatures are iterated integrals, not frequency components."],
      ["The list of sampled values", "ps-def-values", "That is the raw data."],
      ["The path's mean and variance", "ps-def-moments", "Those are summary statistics, not the signature."],
    ]),
  mcq(m(PS, "recall-level-one", "recall", 1, 15, "The level-$1$ signature term $S^{i}$ equals:"),
    "The total increment $X^{i}_b - X^{i}_a$ of coordinate $i$",
    [
      ["The average of coordinate $i$", "ps-l1-mean", "It is an increment, not an average."],
      ["The maximum of coordinate $i$", "ps-l1-max", "Not the maximum."],
      ["The length of the path", "ps-l1-length", "Length is not a signature term."],
    ]),
  mcq(m(PS, "recall-levy-area", "recall", 1, 15, "The Lévy area $A^{i,j} = \\frac{1}{2}\\left(S^{i,j} - S^{j,i}\\right)$ measures:"),
    "The signed area between the path (projected to coordinates $i, j$) and its chord",
    [
      ["The total length of the path", "ps-area-length", "Area, not length."],
      ["The correlation between coordinates", "ps-area-corr", "It captures order of movement, not correlation."],
      ["The product of increments", "ps-area-product", "That is $S^{i,j} + S^{j,i}$."],
    ]),
  mcq(m(PS, "recall-reparam", "recall", 1, 15, "Reparametrisation invariance means the signature:"),
    "Does not change if the path is traversed faster or slower along the same route",
    [
      ["Does not change if the path is shifted in time and value", "ps-reparam-translation", "That is translation invariance, a different property."],
      ["Does not change if the path is reversed", "ps-reparam-reverse", "Reversal changes the signature."],
      ["Is the same for all paths", "ps-reparam-all", "Then it would carry no information."],
    ]),
  // level 2
  num(m(PS, "apply-level-one", "apply", 2, 15, "A path goes in a straight line from $(0, 0)$ to $(3, 1)$. Find $S^{1}$."), 3),
  num(m(PS, "apply-diagonal", "apply", 2, 20, "A coordinate has total increment $4$. Find $S^{i,i} = \\frac{1}{2}(\\Delta X^{i})^{2}$."), 8),
  num(m(PS, "apply-count-level-two", "apply", 2, 15, "How many level-$2$ signature terms does a path in $\\mathbb{R}^{3}$ have?"), 9),
  mcq(m(PS, "apply-shuffle", "apply", 2, 20, "The shuffle identity at level $2$ states:"),
    "$S^{i,j} + S^{j,i} = S^{i}\\,S^{j}$",
    [
      ["$S^{i,j} = S^{j,i}$", "ps-shuffle-symmetric", "They differ by twice the Lévy area."],
      ["$S^{i,j} - S^{j,i} = S^{i} S^{j}$", "ps-shuffle-minus", "The difference is the area, not the product."],
      ["$S^{i,j} = S^{i} + S^{j}$", "ps-shuffle-sum", "Products, not sums."],
    ]),
  // level 3
  num(m(PS, "apply-segment-cross", "apply", 3, 25, "A single straight segment has increment $\\mathbf{v} = [2, 3]$. Using $S^{i,j} = \\frac{v_i v_j}{2}$, find $S^{1,2}$."), 3),
  num(m(PS, "apply-segment-level3", "apply", 3, 25, "A single straight segment has $v_1 = 3$. Using $S^{i_1 \\cdots i_k} = \\frac{v_{i_1} \\cdots v_{i_k}}{k!}$, find $S^{1,1,1}$."), 4.5),
  num(m(PS, "apply-count-to-three", "apply", 3, 25, "How many signature terms (excluding the constant $1$) are there up to level $3$ for a path in $\\mathbb{R}^{2}$?"), 14),
  mcq(m(PS, "apply-straight-area", "apply", 3, 25, "The Lévy area of a single straight segment is:"),
    "$0$, since $S^{i,j} = S^{j,i} = \\frac{v_i v_j}{2}$",
    [
      ["$\\frac{v_1 v_2}{2}$", "ps-straight-half", "That is $S^{1,2}$, not the area."],
      ["$v_1 v_2$", "ps-straight-product", "That is the sum $S^{1,2} + S^{2,1}$."],
      ["Undefined", "ps-straight-undefined", "It is well defined."],
    ]),
  // level 4
  num(m(PS, "apply-l-path-s12", "apply", 4, 35, "Path $(0, 0) \\to (2, 0) \\to (2, 1)$. Using Chen's identity, find $S^{1,2}$."), 2),
  num(m(PS, "apply-l-path-area", "apply", 4, 35, "Same path. Find the Lévy area $A^{1,2}$."), 1),
  num(m(PS, "apply-shuffle-solve", "apply", 4, 30, "A path has $S^{1} = 2$, $S^{2} = 3$ and $S^{1,2} = 4$. Find $S^{2,1}$."), 2),
  mcq(m(PS, "apply-order-flip", "apply", 4, 30, "Two paths have the same endpoints; one moves right then up, the other up then right. Their signatures:"),
    "Agree at level $1$ but have opposite Lévy areas at level $2$",
    [
      ["Are identical", "ps-order-identical", "Level $2$ records the order."],
      ["Differ at level $1$", "ps-order-level1", "Increments are the same."],
      ["Differ only in $S^{1,1}$", "ps-order-diag", "Diagonal terms depend only on increments."],
    ]),
  // level 5
  short(m(PS, "explain-speed", "explain", 5, 150, "Explain why the signature does not depend on how fast the path is traversed."),
    [
      ["change-variables", "Iterated integrals are integrals against $dX$; substituting $t = \\phi(s)$ for increasing $\\phi$ leaves them unchanged", 2, true],
      ["meaning", "So only the route and order of movements matter, not timing; to capture timing, add time as a channel", 2, true],
    ]),
  mcq(m(PS, "apply-chen", "apply", 5, 35, "Chen's identity says the signature of a concatenated path $\\mathbf{X} * \\mathbf{Y}$ is:"),
    "The tensor product $S(\\mathbf{X}) \\otimes S(\\mathbf{Y})$",
    [
      ["The sum $S(\\mathbf{X}) + S(\\mathbf{Y})$", "ps-chen-sum", "That holds only at level $1$."],
      ["The average of the two signatures", "ps-chen-average", "No averaging is involved."],
      ["$S(\\mathbf{Y}) \\otimes S(\\mathbf{X})$", "ps-chen-reversed", "Order matters: $\\mathbf{X}$ first."],
    ]),
  mcq(m(PS, "apply-tree-like", "apply", 5, 35, "A path goes from $(0, 0)$ to $(1, 1)$ and back along the same line. Its signature (beyond the constant) is:"),
    "All zero — it is tree-like, indistinguishable from the constant path",
    [
      ["Twice the signature of the outward path", "ps-tree-double", "The return retraces and cancels the outward path."],
      ["Nonzero only at level $2$", "ps-tree-level2", "Every level cancels."],
      ["Undefined", "ps-tree-undefined", "It is defined and trivial."],
    ]),
  num(m(PS, "apply-count-big", "apply", 5, 30, "How many signature terms up to level $3$ are there for $d = 10$ channels?"), 1110),
  // level 6
  short(m(PS, "explain-time-uniqueness", "explain", 6, 180, "Why does adding time as a coordinate make the signature determine the path uniquely?"),
    [
      ["tree-like", "The signature determines a path only up to tree-like excursions (backtracking)", 2, true],
      ["monotone", "A strictly increasing time coordinate means the path can never retrace itself, so no tree-like pieces exist", 2, true],
    ]),
  num(m(PS, "apply-square-area", "apply", 6, 50, "Path $(0, 0) \\to (1, 0) \\to (1, 1) \\to (0, 1)$. Find the Lévy area $A^{1,2}$."), 1),
  num(m(PS, "apply-square-diag", "apply", 6, 35, "Same path. Find $S^{1,1}$."), 0),
  mcq(m(PS, "apply-stratonovich", "apply", 6, 40, "For Brownian paths, signatures are defined with Stratonovich integrals because:"),
    "The ordinary chain rule then holds, preserving the shuffle identity and $S^{i,i} = \\frac{1}{2}(\\Delta B^{i})^{2}$",
    [
      ["Itô integrals do not exist for Brownian motion", "ps-strat-exist", "They exist."],
      ["Stratonovich integrals are martingales", "ps-strat-martingale", "Itô integrals are the martingales."],
      ["It makes the signature zero", "ps-strat-zero", "It does not."],
    ]),
  // level 7
  short(m(PS, "explain-universality", "explain", 7, 180, "State the universal approximation property of signatures and one practical caveat."),
    [
      ["statement", "Linear functionals of the signature can uniformly approximate any continuous function of paths on a compact set", 2, true],
      ["caveat", "In practice one truncates at a low level, and the number of terms grows exponentially; approximation may need many terms", 2, true],
    ]),
  num(m(PS, "apply-ito-diag", "apply", 7, 40, "A Brownian coordinate has increment $\\Delta B = 1.2$ over a time interval of length $1$. Find the Itô version $\\frac{1}{2}\\left((\\Delta B)^{2} - 1\\right)$ of $S^{i,i}$."), 0.22),
  num(m(PS, "apply-strat-diag", "apply", 7, 30, "Same increment. Find the Stratonovich $S^{i,i} = \\frac{1}{2}(\\Delta B)^{2}$."), 0.72),
  mcq(m(PS, "apply-factorial", "apply", 7, 45, "The bound $|S^{(k)}| \\le \\frac{L^{k}}{k!}$, with $L$ the path's length, implies:"),
    "Higher levels shrink rapidly for paths of moderate length, so low truncation retains most information",
    [
      ["Higher levels are always larger", "ps-fact-larger", "Factorial decay dominates eventually."],
      ["All levels are equal", "ps-fact-equal", "They decay."],
      ["Truncation is never needed", "ps-fact-never", "There are infinitely many levels."],
    ]),
  // level 8
  short(m(PS, "derive-diagonal", "explain", 8, 180, "Derive $S^{i,i} = \\frac{1}{2}\\left(X^{i}_b - X^{i}_a\\right)^{2}$ for a smooth path."),
    [
      ["inner", "The inner integral is $\\int_a^{t} dX^{i}_s = X^{i}_t - X^{i}_a$", 2, true],
      ["outer", "So $S^{i,i} = \\int_a^b (X^{i}_t - X^{i}_a)\\,dX^{i}_t = \\frac{1}{2}(X^{i}_b - X^{i}_a)^{2}$ by the chain rule", 2, true],
    ]),
  num(m(PS, "apply-two-seg-area", "apply", 8, 50, "Path $(0, 0) \\to (1, 2) \\to (3, 2)$. Find the Lévy area $A^{1,2}$."), -2),
  num(m(PS, "apply-factorial-bound", "apply", 8, 40, "A path has length $2$. Find the bound $\\frac{2^{4}}{4!}$ on its level-$4$ terms. Give $4$ decimal places."), 0.6667),
  mcq(m(PS, "apply-log-signature", "apply", 8, 45, "The log-signature is useful because it:"),
    "Removes the redundancy implied by the shuffle identity, giving fewer, algebraically independent features",
    [
      ["Is always the logarithm of each term", "ps-log-elementwise", "It is a tensor logarithm, not elementwise."],
      ["Contains more information than the signature", "ps-log-more", "Same information, fewer terms."],
      ["Only works for one-dimensional paths", "ps-log-1d", "It is most useful in higher dimensions."],
    ]),
  // level 9
  short(m(PS, "explain-expected-signature", "explain", 9, 210, "What is the expected signature of a random path, and why is it useful?"),
    [
      ["definition", "The expectation of each signature term over the path distribution", 2, true],
      ["use", "Under conditions it characterises the law of the path (like moments characterise a distribution), enabling two-sample tests and generative model training", 2, true],
    ]),
  short(m(PS, "explain-green", "explain", 9, 210, "Explain why the Lévy area of a closed planar loop equals its signed enclosed area."),
    [
      ["closed", "For a closed loop $S^{1} = S^{2} = 0$, so $S^{1,2} = -S^{2,1}$", 1, true],
      ["green", "$A^{1,2} = \\frac{1}{2}\\oint (X^{1}\\,dX^{2} - X^{2}\\,dX^{1})$, which by Green's theorem is the signed enclosed area", 2, true],
      ["sign", "Counterclockwise loops give positive area", 1],
    ]),
  num(m(PS, "apply-segment-122", "apply", 9, 40, "A single segment has increment $\\mathbf{v} = [1, 2]$. Find $S^{1,2,2}$. Give $4$ decimal places."), 0.6667),
  mcq(m(PS, "apply-rough-path", "apply", 9, 45, "Rough path theory needs the level-$2$ signature (not just the path) for driving signals like Brownian motion because:"),
    "Such paths are too irregular for iterated integrals to be defined from the path alone, so the area must be supplied",
    [
      ["Brownian motion has no increments", "ps-rough-increments", "It has increments."],
      ["Level $1$ is always zero", "ps-rough-l1", "It is the increment."],
      ["The area is always zero", "ps-rough-zero", "Lévy area is random and nonzero."],
    ]),
  // level 10
  short(m(PS, "derive-reparam", "explain", 10, 240, "Prove reparametrisation invariance for $S^{i,j}$ of a smooth path."),
    [
      ["substitute", "Let $\\tilde{X}_s = X_{\\phi(s)}$ with $\\phi$ increasing; then $d\\tilde{X}_s = \\dot{X}_{\\phi(s)}\\phi'(s)\\,ds$", 2, true],
      ["order", "The region $s_1 < s_2$ maps onto $t_1 < t_2$ since $\\phi$ is increasing", 1, true],
      ["equal", "Changing variables $t = \\phi(s)$ in both integrals gives the same value", 2, true],
    ]),
  short(m(PS, "derive-chen-level2", "explain", 10, 240, "Derive Chen's identity at level $2$: $S(\\mathbf{X} * \\mathbf{Y})^{i,j} = S(\\mathbf{X})^{i,j} + S(\\mathbf{Y})^{i,j} + S(\\mathbf{X})^{i} S(\\mathbf{Y})^{j}$."),
    [
      ["split", "Split the region $t_1 < t_2$ into: both in $\\mathbf{X}$'s interval, both in $\\mathbf{Y}$'s, or $t_1$ in $\\mathbf{X}$'s and $t_2$ in $\\mathbf{Y}$'s", 2, true],
      ["cross", "The cross region factorises into $\\int dX^{i} \\cdot \\int dY^{j} = S(\\mathbf{X})^{i} S(\\mathbf{Y})^{j}$", 2, true],
    ]),
  num(m(PS, "apply-triangle", "apply", 10, 60, "Closed triangle $(0, 0) \\to (1, 0) \\to (0, 1) \\to (0, 0)$. Find the Lévy area $A^{1,2}$."), 0.5),
  mcq(m(PS, "apply-closed-level1", "apply", 10, 45, "Which information distinguishes two different closed loops starting at the origin?"),
    "Level $2$ and higher terms, since level $1$ is zero for every closed loop",
    [
      ["Level $1$ only", "ps-closed-l1", "Level $1$ vanishes for closed loops."],
      ["Nothing — all closed loops have the same signature", "ps-closed-same", "Their areas and higher terms differ."],
      ["Only the starting point", "ps-closed-start", "Signatures are translation invariant."],
    ]),
];

// ---------------------------------------------------------------------------
// signature-methods-time-series
// ---------------------------------------------------------------------------
const SM = "signature-methods-time-series";
const methods: Item[] = [
  // level 1
  mcq(m(SM, "recall-why", "recall", 1, 15, "A key practical advantage of signature features for time series is that they:"),
    "Handle irregular sampling and different lengths naturally, giving a fixed-size feature vector",
    [
      ["Require stationary data", "sm-why-stationary", "No stationarity is needed."],
      ["Need millions of training series", "sm-why-data", "They suit small data with linear models."],
      ["Only work for one channel", "sm-why-1d", "They are most informative for several channels."],
    ]),
  mcq(m(SM, "recall-leadlag", "recall", 1, 15, "The lead–lag transform pairs a series with:"),
    "A copy of itself delayed by one step",
    [
      ["Its first difference", "sm-ll-diff", "It pairs the series with its lagged copy."],
      ["Its cumulative sum", "sm-ll-cumsum", "That is a different augmentation."],
      ["The time index", "sm-ll-time", "That is time augmentation."],
    ]),
  mcq(m(SM, "recall-time-aug", "recall", 1, 15, "Adding time as an extra channel is done to:"),
    "Make the signature sensitive to speed and unique for the path",
    [
      ["Make the signature translation invariant", "sm-time-translation", "Signatures already are."],
      ["Reduce the number of features", "sm-time-fewer", "It increases them."],
      ["Remove the need for interpolation", "sm-time-interp", "The path is still interpolated."],
    ]),
  mcq(m(SM, "recall-basepoint", "recall", 1, 15, "Basepoint augmentation (starting the path at $\\mathbf{0}$) makes the signature sensitive to:"),
    "The starting level of the series, not just its changes",
    [
      ["The sampling frequency", "sm-base-freq", "Unrelated."],
      ["The series' volatility", "sm-base-vol", "Lead–lag captures that."],
      ["The order of channels", "sm-base-order", "Unrelated."],
    ]),
  // level 2
  num(m(SM, "apply-level-one", "apply", 2, 15, "A series takes values $1$ then $4$. Find $S^{x}$ of its (time-augmented) path."), 3),
  num(m(SM, "apply-time-increment", "apply", 2, 15, "Observations are at times $0, 1, \\ldots, 5$. Find $S^{t}$ for the time channel."), 5),
  num(m(SM, "apply-feature-count", "apply", 2, 20, "A time-augmented univariate series is a path in $\\mathbb{R}^{2}$. How many signature features are there up to level $2$?"), 6),
  mcq(m(SM, "apply-truncation", "apply", 2, 20, "The truncation level $M$ is usually chosen:"),
    "Small (about $2$ to $4$), balancing information against the exponential growth in features",
    [
      ["As large as possible", "sm-trunc-large", "Feature counts explode."],
      ["Equal to the series length", "sm-trunc-length", "Unrelated to length."],
      ["Always $1$", "sm-trunc-one", "Level $1$ is only increments."],
    ]),
  // level 3
  num(m(SM, "apply-qv", "apply", 3, 25, "A series has increments $1, -2, 1$. Find its realised quadratic variation $\\sum \\Delta_k^{2}$."), 6),
  num(m(SM, "apply-ll-area", "apply", 3, 25, "Same series. Using the lead–lag transform, find the Lévy area between lead and lag."), 3),
  num(m(SM, "apply-tx-s12", "apply", 3, 35, "A series takes values $0, 1, 3$ at times $0, 1, 2$. For the time-augmented path $(t, x)$, find $S^{t,x}$."), 3.5),
  mcq(m(SM, "apply-missing-channel", "apply", 3, 30, "Adding a channel that counts observed values is useful when:"),
    "Whether and when data were recorded carries information (informative missingness)",
    [
      ["Data are complete", "sm-miss-complete", "There is nothing to count."],
      ["The series is stationary", "sm-miss-stationary", "Unrelated."],
      ["You want fewer features", "sm-miss-fewer", "It adds features."],
    ]),
  // level 4
  num(m(SM, "apply-tx-s21", "apply", 4, 35, "Same path ($x = 0, 1, 3$ at $t = 0, 1, 2$). Find $S^{x,t}$."), 2.5),
  num(m(SM, "apply-tx-area", "apply", 4, 35, "Same path. Find the Lévy area $A^{t,x} = \\frac{1}{2}(S^{t,x} - S^{x,t})$."), 0.5),
  num(m(SM, "apply-basepoint", "apply", 4, 30, "A series takes values $5$ then $6$. Find $S^{x}$ after basepoint augmentation (prepending $0$)."), 6),
  mcq(m(SM, "apply-scaling", "apply", 4, 30, "If a path is multiplied by $c$, its level-$k$ signature terms are multiplied by:"),
    "$c^{k}$",
    [
      ["$c$", "sm-scale-c", "Each level scales with its degree."],
      ["$k\\,c$", "sm-scale-kc", "Scaling is multiplicative in each integrand."],
      ["$1$", "sm-scale-one", "Signatures are not scale invariant."],
    ]),
  // level 5
  short(m(SM, "explain-pipeline", "explain", 5, 180, "Describe the signature + adaptive LASSO pipeline for predicting a label from multivariate time series, and why the result is interpretable."),
    [
      ["features", "Interpolate, augment (time, lead–lag, basepoint), normalise, and compute truncated signatures", 2, true],
      ["model", "Fit a linear model with an adaptive LASSO penalty, choosing $\\lambda$ by cross-validation", 1, true],
      ["interpret", "Each selected term is an iterated integral with meaning (trend, timing, volatility, lead–lag between channels)", 2, true],
    ]),
  mcq(m(SM, "apply-vs-deep", "apply", 5, 35, "With $200$ labelled series, why might signatures + LASSO beat a recurrent neural network?"),
    "Fixed features plus a sparse linear model need far less data and are easier to interpret",
    [
      ["Signatures always achieve lower error", "sm-deep-always", "Not always; it depends on data size and task."],
      ["RNNs cannot handle multivariate data", "sm-deep-multi", "They can."],
      ["Signatures need no hyperparameters", "sm-deep-hyper", "Truncation and augmentation must be chosen."],
    ]),
  mcq(m(SM, "apply-normalise", "apply", 5, 35, "Before fitting a LASSO on signature features you should standardise them because:"),
    "Terms at different levels have very different scales, and the L1 penalty is scale-dependent",
    [
      ["Signatures are always negative", "sm-norm-negative", "They can have any sign."],
      ["It makes the features independent", "sm-norm-independent", "Standardising does not remove correlation."],
      ["The LASSO requires binary features", "sm-norm-binary", "It does not."],
    ]),
  num(m(SM, "apply-scale-level3", "apply", 5, 30, "A level-$3$ term equals $0.5$. The path is doubled. Find the new value."), 4),
  // level 6
  short(m(SM, "explain-leadlag-qv", "explain", 6, 180, "Explain why the lead–lag Lévy area equals half the realised quadratic variation."),
    [
      ["step", "Each step moves lead then lag by the same increment $\\Delta_k$, enclosing area $\\frac{\\Delta_k^{2}}{2}$", 2, true],
      ["cross", "Cross terms between steps cancel because each step's net increment is equal in both coordinates", 2, true],
      ["sum", "Summing gives $\\frac{1}{2}\\sum_k \\Delta_k^{2}$", 1],
    ]),
  num(m(SM, "apply-count-three-channels", "apply", 6, 35, "Three channels plus time make $d = 4$. How many signature terms are there up to level $3$?"), 84),
  num(m(SM, "apply-count-leadlag", "apply", 6, 35, "Two channels with lead–lag (four channels) plus time ($d = 5$). How many terms up to level $2$?"), 30),
  mcq(m(SM, "apply-logsig-count", "apply", 6, 40, "Compared with the signature, the log-signature truncated at the same level has:"),
    "Fewer terms carrying the same information",
    [
      ["More terms", "sm-logcount-more", "It removes redundancies."],
      ["Less information", "sm-logcount-less", "The truncated log-signature and signature determine each other."],
      ["Exactly the same number", "sm-logcount-same", "It is smaller beyond level $1$."],
    ]),
  // level 7
  short(m(SM, "explain-fragmented", "explain", 7, 180, "How do signature methods cope with fragmented series — irregular times, gaps and different lengths?"),
    [
      ["interpolate", "Each series is interpolated into a continuous path, so any sampling grid works", 2, true],
      ["fixed-size", "The truncated signature has a fixed size regardless of series length", 1, true],
      ["time-channel", "A time channel (and optionally an observation-count channel) encodes gaps and timing", 2],
    ]),
  num(m(SM, "apply-ll-area-four", "apply", 7, 40, "A series takes values $10, 12, 11, 15$. Find the lead–lag Lévy area."), 10.5),
  num(m(SM, "apply-shuffle-channels", "apply", 7, 35, "Two channels have $S^{x} = 3$, $S^{y} = -2$ and $S^{x,y} = 1$. Find $S^{y,x}$."), -7),
  mcq(m(SM, "apply-cross-area", "apply", 7, 45, "A large positive Lévy area between price and volume (in that order) indicates:"),
    "Moves in price tended to happen before matching moves in volume",
    [
      ["Price and volume are uncorrelated", "sm-cross-uncorr", "Area concerns ordering, not correlation."],
      ["Volume leads price", "sm-cross-reverse", "The sign indicates the opposite order."],
      ["Both series are constant", "sm-cross-constant", "Constant series have zero area."],
    ]),
  // level 8
  short(m(SM, "transfer-icu", "transfer", 8, 240, "Design a signature-based model to predict patient deterioration from irregularly measured vital signs in the ICU."),
    [
      ["prep", "Use a sliding window, time augmentation, basepoint, observation-count channels, and normalise each vital", 2, true],
      ["features", "Compute truncated (log-)signatures at level $2$–$3$", 1, true],
      ["model", "Fit a sparse (adaptive LASSO) logistic model, validate over time, and inspect selected terms clinically", 2, true],
    ]),
  num(m(SM, "apply-logsig-two", "apply", 8, 35, "The level-$2$ log-signature of a path in $\\mathbb{R}^{2}$ has $2$ level-$1$ terms and one Lévy area. How many terms in total?"), 3),
  num(m(SM, "apply-logsig-four", "apply", 8, 45, "For $d = 4$ channels, the log-signature to level $2$ has $d$ level-$1$ terms and $\\frac{d(d - 1)}{2}$ areas. How many terms in total?"), 10),
  mcq(m(SM, "apply-leakage", "apply", 8, 45, "When computing lead–lag features over a forecasting window, a common bug is:"),
    "Including observations from after the prediction time in the window",
    [
      ["Using a time channel", "sm-leak-time", "Time channels are standard."],
      ["Truncating at level $2$", "sm-leak-trunc", "A modelling choice, not a leak."],
      ["Standardising features", "sm-leak-standardise", "Fine if fitted on training data."],
    ]),
  // level 9
  short(m(SM, "explain-vs-arima", "explain", 9, 210, "Contrast signature-based regression with ARIMA modelling for a non-stationary, nonlinear series."),
    [
      ["arima", "ARIMA assumes linear dynamics after differencing and a regular sampling grid", 2, true],
      ["signature", "Signatures make no stationarity or linearity assumption on dynamics, handle irregular data, and model nonlinear functionals of the path via universality", 2, true],
      ["cost", "Signatures do not give a generative model or forecasts by themselves", 1],
    ]),
  short(m(SM, "explain-interpret-terms", "explain", 9, 210, "The fitted model selects $S^{x}$, the lead–lag area of $x$, and $S^{t,x}$. Interpret each."),
    [
      ["level1", "$S^{x}$: the net change (trend) over the window", 1, true],
      ["leadlag", "Lead–lag area: realised volatility of $x$", 2, true],
      ["timing", "$S^{t,x}$: whether the change happened late or early in the window (time-weighted increment)", 2, true],
    ]),
  num(m(SM, "apply-qv-from-sig", "apply", 9, 40, "For a lead–lag path, $S^{\\text{lead},\\text{lag}} = 7$ and $S^{\\text{lag},\\text{lead}} = -1$. Find the realised quadratic variation."), 8),
  mcq(m(SM, "apply-ll-shuffle", "apply", 9, 45, "In the previous question, what is the product of the lead and lag increments, $S^{\\text{lead}} S^{\\text{lag}}$?"),
    "$6$, by the shuffle identity",
    [
      ["$8$", "sm-llshuffle-8", "That is the difference, not the sum."],
      ["$-7$", "sm-llshuffle-m7", "The sum of the two terms is the product."],
      ["$0$", "sm-llshuffle-0", "Not unless the increment is zero."],
    ]),
  // level 10
  short(m(SM, "explain-universal-lasso", "explain", 10, 240, "Universality says linear functions of signatures can approximate any continuous target. What does this imply for using an adaptive LASSO on truncated signatures, and what are its limits?"),
    [
      ["implication", "A linear model suffices in principle; nonlinearity lives in the features, so a sparse linear fit can capture complex targets", 2, true],
      ["limits", "Truncation may omit needed high-level terms; approximation may require many terms, and sparsity in signature coordinates is not guaranteed", 2, true],
      ["practice", "Choose augmentations and level by validation", 1],
    ]),
  short(m(SM, "explain-pitfalls", "explain", 10, 240, "Name three pitfalls in applying signature + LASSO to real time series and how to address each."),
    [
      ["scaling", "Scale differences across levels and channels; standardise", 1, true],
      ["collinearity", "Strong correlation among terms (shuffle products) destabilises selection; use adaptive weights, log-signatures or stability checks", 2, true],
      ["leakage-other", "Look-ahead leakage, too high truncation for the sample size, or missing time channel; use proper windows, validation and augmentation", 2, true],
    ]),
  num(m(SM, "apply-min-level", "apply", 10, 45, "With $d = 5$ channels, find the smallest truncation level $M$ at which the number of signature terms exceeds $500$."), 4),
  mcq(m(SM, "apply-kernel", "apply", 10, 60, "The signature kernel is attractive when $d$ or the needed level is large because it:"),
    "Computes inner products of untruncated signatures directly (via a PDE) without listing features",
    [
      ["Truncates at level $1$", "sm-kernel-l1", "It uses all levels implicitly."],
      ["Is always linear in the path", "sm-kernel-linear", "It is highly nonlinear."],
      ["Requires regular sampling", "sm-kernel-regular", "It handles irregular paths."],
    ]),
];

export const infer06Items: Item[] = [...signatures, ...methods];
