import type { Item } from "../../lib/assessment/types";
import { m, mcq, num, short } from "./infer-shared";

/**
 * Adaptive LASSO. Forty questions, four at each level. Orthonormal-design
 * questions use the objective $\frac{1}{2}\|\mathbf{y} - \mathbf{X}\boldsymbol{\beta}\|^2 + \lambda\sum_j w_j|\beta_j|$,
 * whose solution is weighted soft thresholding at $\lambda w_j$.
 */

const AL = "adaptive-lasso";
const OBJ = "With orthonormal design and objective $\\frac{1}{2}\\left\\|\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta}\\right\\|^{2} + \\lambda\\sum_j w_j|\\beta_j|$, the solution is $\\hat{\\beta}_j = \\text{sign}(z_j)\\left(|z_j| - \\lambda w_j\\right)_{+}$, where $z_j$ is the OLS coefficient.";

const adaptiveLasso: Item[] = [
  // level 1
  mcq(m(AL, "recall-weight", "recall", 1, 15, "In the adaptive LASSO, the penalty weight on coefficient $j$ is:"),
    "$w_j = \\frac{1}{|\\tilde{\\beta}_j|^{\\gamma}}$, from a pilot estimate $\\tilde{\\beta}_j$",
    [
      ["$w_j = |\\tilde{\\beta}_j|^{\\gamma}$", "al-weight-direct", "That would penalise large coefficients more, the opposite of the aim."],
      ["$w_j = 1$ for all $j$", "al-weight-one", "That is the ordinary LASSO."],
      ["$w_j = \\frac{1}{\\text{Var}(\\mathbf{x}_j)}$", "al-weight-variance", "Weights come from a pilot coefficient, not column variance."],
    ]),
  mcq(m(AL, "recall-pilot", "recall", 1, 15, "The pilot estimate in the adaptive LASSO is used to:"),
    "Decide how heavily to penalise each coefficient",
    [
      ["Replace the final estimate", "al-pilot-final", "The final estimate comes from the weighted LASSO."],
      ["Choose the sample size", "al-pilot-n", "Unrelated."],
      ["Standardise the response", "al-pilot-standardise", "It sets weights, not scaling of $\\mathbf{y}$."],
    ]),
  mcq(m(AL, "recall-oracle", "recall", 1, 15, "The oracle property says the adaptive LASSO, asymptotically:"),
    "Selects exactly the true nonzero variables and estimates them as efficiently as OLS on the true model",
    [
      ["Always has lower error than any other method in finite samples", "al-oracle-finite", "It is an asymptotic property."],
      ["Knows the true coefficients in advance", "al-oracle-knows", "It behaves as if the true support were known."],
      ["Sets every coefficient to zero", "al-oracle-zero", "Only the true zeros."],
    ]),
  mcq(m(AL, "recall-gamma", "recall", 1, 15, "The exponent $\\gamma > 0$ in $w_j = \\frac{1}{|\\tilde{\\beta}_j|^{\\gamma}}$ controls:"),
    "How sharply the weights grow as pilot coefficients approach zero",
    [
      ["The overall penalty level", "al-gamma-lambda", "That is $\\lambda$."],
      ["The number of variables", "al-gamma-p", "Unrelated."],
      ["The mixing with a ridge penalty", "al-gamma-elastic", "That is the elastic net's parameter."],
    ]),
  // level 2
  num(m(AL, "apply-weight-g1", "apply", 2, 15, "With $\\gamma = 1$ and pilot $\\tilde{\\beta}_j = 0.5$, find $w_j$."), 2),
  num(m(AL, "apply-weight-g2", "apply", 2, 15, "With $\\gamma = 2$ and pilot $\\tilde{\\beta}_j = 0.5$, find $w_j$."), 4),
  num(m(AL, "apply-lasso-orthonormal", "apply", 2, 20, `${OBJ} For the plain LASSO ($w_j = 1$) with $z_j = 3$ and $\\lambda = 1$, find $\\hat{\\beta}_j$.`), 2),
  mcq(m(AL, "apply-zero-pilot", "apply", 2, 20, "If a first-stage LASSO sets $\\tilde{\\beta}_j = 0$, then in the adaptive LASSO variable $j$:"),
    "Gets infinite weight and stays out of the model",
    [
      ["Is unpenalised", "al-zeropilot-free", "The weight is $\\frac{1}{0}$, i.e. infinite."],
      ["Is penalised like the others", "al-zeropilot-same", "Weights differ by variable."],
      ["Causes the method to fail", "al-zeropilot-fail", "It is handled by dropping the variable."],
    ]),
  // level 3
  num(m(AL, "apply-adaptive-large", "apply", 3, 30, `${OBJ} With $\\gamma = 1$, pilot $=$ OLS, $z_j = 3$ and $\\lambda = 1$, find $\\hat{\\beta}_j$. Give $4$ decimal places.`), 2.6667),
  num(m(AL, "apply-adaptive-small", "apply", 3, 30, `${OBJ} With $\\gamma = 1$, pilot $=$ OLS, $z_j = 0.4$ and $\\lambda = 1$, find $\\hat{\\beta}_j$.`), 0),
  num(m(AL, "apply-adaptive-negative", "apply", 3, 30, `${OBJ} With $\\gamma = 1$, pilot $=$ OLS, $z_j = -1.5$ and $\\lambda = 1$, find $\\hat{\\beta}_j$. Give $4$ decimal places.`), -0.8333),
  mcq(m(AL, "apply-rescale", "apply", 3, 30, "To compute the adaptive LASSO with ordinary LASSO software, you:"),
    "Divide each column by its weight, fit the LASSO, then divide each fitted coefficient by its weight",
    [
      ["Multiply the response by the weights", "al-rescale-y", "Only the columns are rescaled."],
      ["Fit the LASSO twice with the same data", "al-rescale-twice", "The second fit needs rescaled columns."],
      ["Use a ridge solver", "al-rescale-ridge", "The penalty is still L1."],
    ]),
  // level 4
  num(m(AL, "apply-back-transform", "apply", 4, 30, "A column was rescaled to $\\mathbf{x}^{*}_j = \\frac{\\mathbf{x}_j}{w_j}$ with $w_j = 2$, and the LASSO on rescaled data gives $\\beta^{*}_j = 3$. Find the adaptive LASSO coefficient $\\hat{\\beta}_j$."), 1.5),
  num(m(AL, "apply-survival-threshold", "apply", 4, 35, `${OBJ} With $\\gamma = 1$ and pilot $=$ OLS, the threshold is $\\frac{\\lambda}{|z_j|}$, so coefficient $j$ survives when $|z_j| > \\sqrt{\\lambda}$. With $\\lambda = 4$, find the smallest $|z_j|$ that survives.`), 2),
  num(m(AL, "apply-shrinkage", "apply", 4, 35, `${OBJ} With $\\gamma = 1$, pilot $=$ OLS and $\\lambda = 4$, how much is $z_j = 5$ shrunk?`), 0.8),
  mcq(m(AL, "apply-larger-gamma", "apply", 4, 30, "Increasing $\\gamma$ (with $\\lambda$ fixed):"),
    "Penalises small pilot coefficients even more heavily relative to large ones",
    [
      ["Makes all weights equal", "al-gamma-equal", "Weights spread further apart."],
      ["Turns the method into ridge", "al-gamma-ridge", "The penalty stays L1."],
      ["Has no effect", "al-gamma-none", "It changes every weight not equal to $1$."],
    ]),
  // level 5
  short(m(AL, "explain-less-bias", "explain", 5, 150, "Why does the adaptive LASSO shrink large coefficients less than the LASSO does?"),
    [
      ["small-weight", "A large pilot coefficient gives a small weight $\\frac{1}{|\\tilde{\\beta}_j|^{\\gamma}}$, so a small effective penalty", 2, true],
      ["consequence", "So large true effects are nearly unshrunk, reducing bias, while small ones get heavy penalties and are zeroed", 2, true],
    ]),
  mcq(m(AL, "apply-pilot-high-dim", "apply", 5, 35, "When $p > n$ so OLS does not exist, a common pilot is:"),
    "A ridge or ordinary LASSO fit",
    [
      ["A random vector", "al-highdim-random", "The pilot must be informative."],
      ["The zero vector", "al-highdim-zero", "That would give infinite weights everywhere."],
      ["The response mean", "al-highdim-mean", "That is not a coefficient vector."],
    ]),
  mcq(m(AL, "apply-irrepresentable", "apply", 5, 35, "The LASSO is selection-consistent only under the irrepresentable condition, which requires:"),
    "Irrelevant variables not to be too correlated with the relevant ones",
    [
      ["All variables to be uncorrelated with the response", "al-irrep-response", "Relevant variables must correlate with it."],
      ["More observations than variables", "al-irrep-n", "The condition is about correlations."],
      ["Normally distributed errors", "al-irrep-normal", "It concerns the design matrix."],
    ]),
  num(m(AL, "apply-gamma-two", "apply", 5, 40, `${OBJ} With $\\gamma = 2$, pilot $=$ OLS, $z_j = 2$ and $\\lambda = 1$, find $\\hat{\\beta}_j$.`), 1.75),
  // level 6
  short(m(AL, "explain-oracle-intuition", "explain", 6, 180, "Give the intuition for the oracle property of the adaptive LASSO."),
    [
      ["true-zero", "For a true zero the pilot is of order $n^{-1/2}$, so its weight blows up and the penalty forces the coefficient to zero", 2, true],
      ["true-nonzero", "For a true nonzero the weight stays bounded and $\\frac{\\lambda_n}{\\sqrt{n}} \\to 0$, so the penalty is negligible and the estimate behaves like OLS on the true model", 2, true],
    ]),
  num(m(AL, "apply-compare-first", "apply", 6, 40, `${OBJ} With $\\mathbf{z} = [4, 0.5]$, $\\lambda = 1$, $\\gamma = 1$ and pilot $=$ OLS, find the adaptive LASSO estimate of the first coefficient.`), 3.75),
  num(m(AL, "apply-lambda-zero-noise", "apply", 6, 40, `${OBJ} With $\\gamma = 1$ and pilot $=$ OLS, find the smallest $\\lambda$ that sets $z_j = 0.5$ to zero.`), 0.25),
  mcq(m(AL, "apply-postselection", "apply", 6, 40, "After an adaptive LASSO fit, reporting ordinary OLS $p$-values for the selected variables:"),
    "Ignores the selection step and tends to overstate significance",
    [
      ["Is justified by the oracle property", "al-postsel-oracle", "The oracle property is asymptotic and does not cover finite-sample selection."],
      ["Understates significance", "al-postsel-under", "Selection favours variables that look strong."],
      ["Is exactly valid", "al-postsel-valid", "Selection must be accounted for."],
    ]),
  // level 7
  short(m(AL, "explain-lasso-inconsistency", "explain", 7, 180, "Explain why the ordinary LASSO cannot in general achieve both consistent selection and unbiased estimation of large coefficients."),
    [
      ["single-lambda", "One $\\lambda$ must be large enough to zero all noise variables", 2, true],
      ["bias", "but then it also shrinks large true coefficients by about $\\lambda$, causing bias; making $\\lambda$ small keeps noise variables in", 2, true],
      ["correlation", "Correlated designs (failing the irrepresentable condition) can make it select wrong variables at any $\\lambda$", 1],
    ]),
  num(m(AL, "apply-weight-explosion", "apply", 7, 30, "With $n = 10{,}000$, a true-zero coefficient's pilot estimate is $0.01$ (order $n^{-1/2}$). Find its weight with $\\gamma = 1$."), 100),
  num(m(AL, "apply-lambda-rate", "apply", 7, 50, "With $\\gamma = 0.5$ and $\\lambda_n = n^{c}$, the oracle conditions are $\\frac{\\lambda_n}{\\sqrt{n}} \\to 0$ and $\\lambda_n n^{(\\gamma - 1)/2} \\to \\infty$. Find the lower limit of the allowed range of $c$."), 0.25),
  mcq(m(AL, "apply-garrote", "apply", 7, 45, "With $\\gamma = 1$ and orthonormal design, the adaptive LASSO estimate $z_j - \\frac{\\lambda}{z_j}$ (when nonzero) matches:"),
    "The nonnegative garrote",
    [
      ["Ridge regression", "al-garrote-ridge", "Ridge never sets coefficients to zero."],
      ["Hard thresholding", "al-garrote-hard", "Hard thresholding keeps $z_j$ unchanged."],
      ["The ordinary LASSO", "al-garrote-lasso", "LASSO subtracts a constant $\\lambda$."],
    ]),
  // level 8
  short(m(AL, "derive-orthonormal", "explain", 8, 210, "Derive the weighted soft-thresholding solution for the adaptive LASSO with orthonormal design."),
    [
      ["decouple", "With $\\mathbf{X}^{\\top}\\mathbf{X} = \\mathbf{I}$, the objective separates into $\\frac{1}{2}(\\beta_j - z_j)^{2} + \\lambda w_j|\\beta_j|$ plus constants", 2, true],
      ["subgradient", "Setting the subgradient $\\beta_j - z_j + \\lambda w_j\\,\\partial|\\beta_j| \\ni 0$ gives $\\beta_j = 0$ if $|z_j| \\le \\lambda w_j$", 2, true],
      ["solution", "and otherwise $\\beta_j = z_j - \\lambda w_j\\,\\text{sign}(z_j)$", 1, true],
    ]),
  num(m(AL, "apply-lasso-pilot-first", "apply", 8, 50, `${OBJ} A first-stage LASSO gives pilot $[2, 0, -0.5]$, and $\\mathbf{z} = [3, 0.4, -1.5]$. With $\\gamma = 1$ and $\\lambda = 1$, find the adaptive LASSO estimate of the first coefficient.`), 2.5),
  num(m(AL, "apply-lasso-pilot-third", "apply", 8, 50, "Same setting. Find the adaptive LASSO estimate of the third coefficient."), 0),
  mcq(m(AL, "apply-tuning", "apply", 8, 45, "$\\lambda$ and $\\gamma$ are usually chosen by:"),
    "Cross-validation over a grid, refitting the weighted LASSO for each pair",
    [
      ["Setting $\\lambda = \\gamma = 1$ always", "al-tune-fixed", "Defaults exist but tuning matters."],
      ["Maximising the training $R^{2}$", "al-tune-train", "That favours no penalty."],
      ["Using the pilot's $p$-values", "al-tune-pvalues", "Not a standard approach."],
    ]),
  // level 9
  short(m(AL, "transfer-signature", "transfer", 9, 240, "You have $300$ series and $1{,}000$ signature features, many highly correlated. Why is the adaptive LASSO a reasonable model, and how would you fit it?"),
    [
      ["why", "It gives a sparse, interpretable linear model and handles correlated features better than plain LASSO's erratic selection", 2, true],
      ["pilot", "Standardise features, fit a ridge (or LASSO) pilot, build weights", 1, true],
      ["fit", "Fit the weighted LASSO with $\\lambda$ (and $\\gamma$) chosen by cross-validation, then inspect selected features", 2, true],
    ]),
  short(m(AL, "explain-scad", "explain", 9, 210, "Compare the adaptive LASSO with nonconvex penalties such as SCAD or MCP."),
    [
      ["shared", "All aim for the oracle property by penalising large coefficients little", 2, true],
      ["difference", "SCAD/MCP use a single nonconvex penalty (possible local minima); the adaptive LASSO stays convex but needs a pilot estimate", 2, true],
    ]),
  num(m(AL, "apply-count-selected", "apply", 9, 60, `${OBJ} With $\\mathbf{z} = [5, 1.2, 0.3, -2, 0.8]$, $\\gamma = 1$, pilot $=$ OLS and $\\lambda = 1$, how many coefficients are nonzero?`), 3),
  mcq(m(AL, "apply-bad-pilot", "apply", 9, 45, "If the pilot estimate is poor (e.g. very noisy OLS with near-collinear columns), the adaptive LASSO:"),
    "Can mis-weight variables and select poorly, so a stabler pilot like ridge is preferable",
    [
      ["Is unaffected", "al-badpilot-unaffected", "The weights depend directly on the pilot."],
      ["Reduces to ridge", "al-badpilot-ridge", "The penalty remains L1."],
      ["Always selects all variables", "al-badpilot-all", "Noisy pilots can push either way."],
    ]),
  // level 10
  short(m(AL, "derive-oracle-sketch", "explain", 10, 300, "Sketch why the adaptive LASSO is selection consistent: why do true zeros get zeroed with probability tending to $1$?"),
    [
      ["kkt", "A zero solution for $\\beta_j$ requires the KKT condition $|\\mathbf{x}_j^{\\top}(\\mathbf{y} - \\mathbf{X}\\hat{\\boldsymbol{\\beta}})| \\le \\lambda_n w_j$", 2, true],
      ["lhs", "The left side is $O_p(\\sqrt{n})$ for a true zero", 1, true],
      ["rhs", "The right side is $\\lambda_n |\\tilde{\\beta}_j|^{-\\gamma} \\asymp \\lambda_n n^{\\gamma/2}$, which dominates $\\sqrt{n}$ since $\\lambda_n n^{(\\gamma - 1)/2} \\to \\infty$", 2, true],
    ]),
  short(m(AL, "transfer-interpretation", "transfer", 10, 240, "A client wants to know which of $50$ correlated economic indicators “drive” an outcome. You fit an adaptive LASSO. What can and can't you claim?"),
    [
      ["prediction", "You can claim a sparse set of indicators predicts well, with nearly unbiased coefficients for strong effects", 2, true],
      ["not-causal", "You cannot claim causation, and among correlated indicators the selected one may stand in for others", 2, true],
      ["stability", "Check stability of selection (e.g. bootstrap) and use valid post-selection inference before reporting significance", 1],
    ]),
  num(m(AL, "apply-gamma-two-threshold", "apply", 10, 60, `${OBJ} With $\\gamma = 2$, pilot $=$ OLS and $\\lambda = 8$, coefficient $j$ survives when $|z_j| > \\frac{\\lambda}{|z_j|^{2}}$. Find the smallest $|z_j|$ that survives.`), 2),
  mcq(m(AL, "apply-group", "apply", 10, 60, "Signature features come in blocks (all level-$2$ terms of a channel pair). To select whole blocks with oracle-like behaviour you could use:"),
    "An adaptive group LASSO, weighting each group's penalty by its pilot group norm",
    [
      ["Ridge regression", "al-group-ridge", "Ridge does not select."],
      ["Separate LASSOs per feature", "al-group-separate", "That ignores the block structure."],
      ["Stepwise selection by $p$-values", "al-group-stepwise", "That is unstable and lacks these guarantees."],
    ]),
];

export const infer05Items: Item[] = [...adaptiveLasso];
