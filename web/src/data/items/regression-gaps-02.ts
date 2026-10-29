import type { Item } from "../../lib/assessment/types";
import { m, mcq, num, short } from "./regression-gaps-shared";

/**
 * Linear Models gap lessons, part 2: partial least squares, and least angle
 * regression with forward stagewise. Forty questions per lesson, four at each
 * level from 1 to 10.
 */

// ---------------------------------------------------------------------------
// partial-least-squares
// ---------------------------------------------------------------------------
const PL = "partial-least-squares";
const partialLeastSquares: Item[] = [
  // level 1
  mcq(m(PL, "recall-criterion", "recall", 1, 15, "Each PLS direction $\\mathbf{X}\\boldsymbol{\\phi}$ is chosen to maximize:"),
    "Its squared covariance with $Y$ (among unit-norm weights orthogonal to earlier components)",
    [
      ["Its variance", "crit-variance", "That is the principal components criterion."],
      ["Its correlation with $Y$ alone", "crit-correlation", "That would reproduce OLS in one step; PLS also rewards variance."],
      ["The number of zero weights", "crit-sparse", "PLS directions are dense, not sparse."],
    ]),
  mcq(m(PL, "recall-uses-y", "recall", 1, 15, "The key difference between PLS and principal components regression is that PLS:"),
    "Uses $Y$ when choosing its directions",
    [
      ["Uses more components", "uses-more", "Both can use any number up to the rank."],
      ["Requires uncorrelated predictors", "uses-orth", "Neither does; PCR's components are orthogonal by construction."],
      ["Shrinks coefficients exactly to zero", "uses-sparse", "That is the lasso."],
    ]),
  mcq(m(PL, "recall-deflation", "recall", 1, 15, "In the NIPALS algorithm, deflation means:"),
    "Replacing each predictor by its residual after regressing on the latest component",
    [
      ["Dividing predictors by their standard deviations", "defl-standardize", "That is standardization, done once at the start."],
      ["Removing the predictor with the smallest weight", "defl-drop", "No predictor is dropped."],
      ["Shrinking the response toward zero", "defl-shrink", "Deflation orthogonalizes; it does not shrink."],
    ]),
  mcq(m(PL, "recall-full", "recall", 1, 15, "PLS with as many components as the rank of $\\mathbf{X}$ gives:"),
    "The OLS fit",
    [
      ["The ridge fit with $\\lambda = 1$", "full-ridge", "Ridge never equals OLS for $\\lambda > 0$."],
      ["The null model", "full-null", "Zero components is the null model."],
      ["The PCR fit with one component", "full-pcr1", "One PCR component is far from the full fit."],
    ]),
  // level 2
  num(m(PL, "apply-weight", "apply", 2, 20, "Two standardized predictors have covariances $0.3$ and $0.4$ with $Y$. After normalizing the first PLS weight vector $\\boldsymbol{\\phi}_1 \\propto [0.3, 0.4]$ to unit length, what is its second entry?"), 0.8),
  num(m(PL, "apply-r2-orth", "apply", 2, 20, "Two uncorrelated standardized predictors have correlations $0.6$ and $0.2$ with $Y$ ($\\text{Var}(Y) = 1$). What is the $R^2$ of the one-component PLS fit?"), 0.4),
  num(m(PL, "apply-max-components", "apply", 2, 20, "A design matrix has rank $5$. How many PLS components are needed to reproduce OLS exactly?"), 5),
  mcq(m(PL, "apply-standardize", "apply", 2, 20, "Why are predictors usually standardized before PLS?"),
    "Because covariances depend on scale, so unscaled predictors with large units would dominate the weights",
    [
      ["Because PLS requires normality", "std-normal", "PLS is a least-squares algorithm with no normality requirement."],
      ["Because it makes the components uncorrelated", "std-orth", "Deflation does that."],
      ["Because it is required for OLS too", "std-ols", "OLS fitted values do not depend on scaling."],
    ]),
  // level 3
  num(m(PL, "apply-theta", "apply", 3, 25, "Two uncorrelated standardized predictors have covariances $0.3$ and $0.4$ with $Y$. With $\\boldsymbol{\\phi}_1 = [0.6, 0.8]$, find the coefficient $\\hat{\\theta}_1 = \\frac{\\text{Cov}(z_1, Y)}{\\text{Var}(z_1)}$ of $Y$ on the first component."), 0.5),
  num(m(PL, "apply-implied-beta", "apply", 3, 25, "Continuing ($\\hat{\\theta}_1 = 0.5$, $\\boldsymbol{\\phi}_1 = [0.6, 0.8]$), what is the implied coefficient on the first predictor, $\\hat{\\theta}_1\\phi_{11}$?"), 0.3),
  num(m(PL, "apply-pcr-filter", "apply", 3, 25, "Principal components regression with $m = 2$ components applies filter $w_k = \\mathbb{1}[k \\le m]$. What is $w_3$?"), 0),
  mcq(m(PL, "apply-orthogonal-scores", "apply", 3, 25, "The PLS score vectors $\\mathbf{z}_1, \\mathbf{z}_2, \\dots$ are:"),
    "Mutually orthogonal, because of deflation",
    [
      ["Orthogonal to $Y$", "scores-y", "They are chosen to covary with $Y$."],
      ["Eigenvectors of $\\mathbf{X}^T\\mathbf{X}$", "scores-eigen", "Those are PCR directions."],
      ["Unrelated to each other in general", "scores-unrelated", "Deflation makes them orthogonal."],
    ]),
  // level 4
  num(m(PL, "apply-ridge-filter", "apply", 4, 35, "Ridge shrinks principal direction $k$ by $\\frac{d_k^2}{d_k^2 + \\lambda}$. Find the factor for $d_k^2 = 4$ and $\\lambda = 1$."), 0.8),
  num(m(PL, "apply-correlated-pls", "apply", 4, 35, "Standardized predictors have correlation $0.5$ with each other and $0.4$ each with $Y$. One PLS component uses $\\boldsymbol{\\phi}_1 \\propto [1, 1]$. Find the implied coefficient of each predictor. Give $2$ decimal places."), 0.27),
  num(m(PL, "apply-cov-criterion", "apply", 4, 35, "A unit-norm combination $\\mathbf{X}\\boldsymbol{\\phi}$ has variance $2$ and correlation $0.5$ with $Y$, where $\\text{Var}(Y) = 1$. Find the PLS criterion $\\text{Cov}^2(\\mathbf{X}\\boldsymbol{\\phi}, Y)$."), 0.5),
  mcq(m(PL, "apply-one-equals-ols", "apply", 4, 35, "One PLS component reproduces OLS exactly when:"),
    "$\\mathbf{X}^T Y$ is an eigenvector of $\\mathbf{X}^T\\mathbf{X}$ (e.g. orthogonal predictors with equal variances)",
    [
      ["The predictors are highly correlated", "one-collinear", "Correlation makes the covariance direction differ from OLS in general."],
      ["$n > p$", "one-n", "That only guarantees OLS exists."],
      ["Never", "one-never", "It happens whenever the OLS direction is proportional to $\\mathbf{X}^T Y$."],
    ]),
  // level 5
  short(m(PL, "explain-pls-vs-pcr", "explain", 5, 120, "Explain why PLS often needs fewer components than PCR to predict $Y$ well."),
    [
      ["unsupervised", "PCR's components maximize variance of $\\mathbf{X}$ and ignore $Y$", 2, true],
      ["supervised", "PLS's components maximize covariance with $Y$, so predictive directions come first", 2, true],
      ["example", "Gives a case where the predictive direction has low variance and PCR ranks it last", 1, false],
    ]),
  mcq(m(PL, "apply-pcr-miss", "apply", 5, 40, "Predictors are uncorrelated with variances $4$ and $1$, and only the low-variance predictor relates to $Y$. One-component PCR:"),
    "Picks the high-variance predictor and explains nothing",
    [
      ["Picks the predictive one", "miss-picks", "PCR ranks by variance, not relevance."],
      ["Equals OLS", "miss-ols", "It keeps only one direction."],
      ["Equals one-component PLS", "miss-pls", "PLS would pick the predictive direction."],
    ]),
  mcq(m(PL, "apply-nonlinear", "apply", 5, 40, "Unlike ridge or PCR, the PLS fit is nonlinear in $Y$ because:"),
    "The directions themselves depend on $Y$",
    [
      ["It uses squared errors", "nonlin-squared", "All three use squared error."],
      ["It standardizes the predictors", "nonlin-standardize", "Standardization does not involve $Y$."],
      ["It drops variables", "nonlin-drop", "PLS keeps all variables."],
    ]),
  num(m(PL, "apply-pls-r2", "apply", 5, 40, "Uncorrelated predictors have variances $4$ and $1$; $\\text{Cov}(x_1, Y) = 0$, $\\text{Cov}(x_2, Y) = 1$ and $\\text{Var}(Y) = 2$. What is the $R^2$ of one-component PLS?"), 0.5),
  // level 6
  short(m(PL, "explain-df", "explain", 6, 150, "Why does an $M$-component PLS fit use more than $M$ effective degrees of freedom, and what does this imply for model selection?"),
    [
      ["adaptive", "The components are chosen using $Y$, so the fit adapts to noise in $Y$", 2, true],
      ["consequence", "Naive $F$-tests or $C_p$ with $p = M$ are optimistic", 2, true],
      ["cv", "Recommends cross-validation to choose $M$", 1, false],
    ]),
  num(m(PL, "apply-ridge-df", "apply", 6, 50, "A design has $d_1^2 = 9$ and $d_2^2 = 1$. Find the ridge effective degrees of freedom $\\sum_k\\frac{d_k^2}{d_k^2 + \\lambda}$ for $\\lambda = 1$."), 1.4),
  num(m(PL, "apply-ridge-weak", "apply", 6, 50, "Find the ridge shrinkage factor $\\frac{d_k^2}{d_k^2 + \\lambda}$ on a direction with $d_k^2 = 1$ when $\\lambda = 3$."), 0.25),
  mcq(m(PL, "apply-krylov", "apply", 6, 50, "The $M$-component PLS coefficient vector lies in:"),
    "$\\text{span}\\lbrace\\mathbf{X}^T Y, (\\mathbf{X}^T\\mathbf{X})\\mathbf{X}^T Y, \\dots, (\\mathbf{X}^T\\mathbf{X})^{M-1}\\mathbf{X}^T Y\\rbrace$",
    [
      ["The span of the top $M$ eigenvectors of $\\mathbf{X}^T\\mathbf{X}$", "krylov-pcr", "That is PCR."],
      ["The span of $M$ original predictors", "krylov-subset", "That is subset selection."],
      ["The null space of $\\mathbf{X}$", "krylov-null", "Coefficients there have no effect on the fit."],
    ]),
  // level 7
  short(m(PL, "explain-cg", "explain", 7, 150, "Explain the connection between PLS and the conjugate gradient method for the normal equations."),
    [
      ["krylov", "Both build iterates in the Krylov space generated by $\\mathbf{X}^T\\mathbf{X}$ and $\\mathbf{X}^T Y$", 2, true],
      ["optimal", "$M$-step CG from $\\mathbf{0}$ minimizes the squared error over that space, which is exactly PLS($M$)", 2, true],
      ["regularization", "Stopping early acts as regularization", 1, false],
    ]),
  num(m(PL, "apply-cg-beta1", "apply", 7, 60, "With $\\mathbf{X}^T\\mathbf{X} = \\text{diag}(4, 1)$ and $\\mathbf{X}^T Y = [2, 1]$, one-component PLS gives $\\boldsymbol{\\beta} = t\\,\\mathbf{X}^T Y$ with $t = \\frac{\\lVert\\mathbf{X}^T Y\\rVert^2}{(\\mathbf{X}^T Y)^T\\mathbf{X}^T\\mathbf{X}(\\mathbf{X}^T Y)}$. Find $\\beta_1$. Give $2$ decimal places."), 0.59),
  num(m(PL, "apply-cg-beta2", "apply", 7, 60, "In the same setup ($\\mathbf{X}^T\\mathbf{X} = \\text{diag}(4, 1)$, $\\mathbf{X}^T Y = [2, 1]$), find the one-component PLS $\\beta_2$. Give $2$ decimal places."), 0.29),
  mcq(m(PL, "apply-ols-here", "apply", 7, 60, "For $\\mathbf{X}^T\\mathbf{X} = \\text{diag}(4, 1)$ and $\\mathbf{X}^T Y = [2, 1]$, the OLS coefficients are:"),
    "$[0.5, 1]$",
    [
      ["$[2, 1]$", "ols-xty", "That is $\\mathbf{X}^T Y$ without inverting $\\mathbf{X}^T\\mathbf{X}$."],
      ["$[8, 1]$", "ols-multiply", "Multiply by the inverse, not by $\\mathbf{X}^T\\mathbf{X}$."],
      ["$[1, 0.5]$", "ols-swap", "The entries are swapped."],
    ]),
  // level 8
  short(m(PL, "explain-expansion", "explain", 8, 180, "Using $\\mathbf{X}^T\\mathbf{X} = \\text{diag}(4, 1)$ and $\\mathbf{X}^T Y = [2, 1]$, show that one-component PLS expands one OLS coefficient and shrinks the other. Why can't ridge do this?"),
    [
      ["values", "Finds PLS $\\boldsymbol{\\beta} \\approx [0.59, 0.29]$ vs OLS $[0.5, 1]$", 2, true],
      ["expand", "Notes the first coefficient grows (ratio about $1.18$) and the second shrinks", 2, true],
      ["ridge", "Explains ridge factors $\\frac{d_k^2}{d_k^2 + \\lambda}$ always lie in $(0, 1)$", 1, true],
    ]),
  num(m(PL, "apply-expansion-ratio", "apply", 8, 70, "One-component PLS gives $\\beta_1 = \\tfrac{10}{17}$ while OLS gives $\\beta_1 = 0.5$. Find the ratio PLS/OLS. Give $2$ decimal places."), 1.18),
  num(m(PL, "apply-two-components", "apply", 8, 70, "With $\\mathbf{X}^T\\mathbf{X} = \\text{diag}(4, 1)$ and $\\mathbf{X}^T Y = [2, 1]$, what is $\\beta_2$ after two PLS components?"), 1),
  mcq(m(PL, "apply-filter-claim", "apply", 8, 70, "Which statement about PLS shrinkage factors on the principal directions is correct?"),
    "They depend on $Y$ and can exceed $1$",
    [
      ["They are fixed numbers depending only on $\\mathbf{X}$", "filter-fixed", "That holds for ridge and PCR, not PLS."],
      ["They are always $0$ or $1$", "filter-binary", "That is PCR."],
      ["They are always between $0$ and $1$", "filter-bounded", "PLS can expand directions, as the diag$(4, 1)$ example shows."],
    ]),
  // level 9
  short(m(PL, "transfer-factor-zoo", "transfer", 9, 180, "You have $200$ correlated return predictors and $300$ monthly observations. Compare OLS, PCR and PLS for building a forecast, and how you would choose the number of components."),
    [
      ["ols", "OLS overfits badly (many predictors, high variance)", 1, true],
      ["pcr-pls", "PCR ignores $Y$ in choosing directions and may discard the predictive one; PLS targets covariance with returns", 2, true],
      ["selection", "Chooses components by time-series (rolling or blocked) cross-validation, not in-sample fit", 2, true],
    ]),
  short(m(PL, "transfer-overfit", "transfer", 9, 180, "Why can PLS overfit more easily than PCR with the same number of components, especially when $p$ is large relative to $n$?"),
    [
      ["noise", "PLS directions are estimated from $\\mathbf{X}^T Y$, which contains noise that the direction choice fits", 2, true],
      ["pcr", "PCR directions come from $\\mathbf{X}$ alone, so they do not chase noise in $Y$", 2, true],
      ["consequence", "Optimistic in-sample fit; needs honest validation", 1, false],
    ]),
  num(m(PL, "apply-pcr-fraction", "apply", 9, 80, "With $\\mathbf{X}^T\\mathbf{X} = \\text{diag}(4, 1)$ and OLS $\\boldsymbol{\\beta} = [0.5, 1]$, the OLS explained sum of squares is $\\boldsymbol{\\beta}^T\\mathbf{X}^T\\mathbf{X}\\boldsymbol{\\beta} = 2$. One-component PCR keeps only the first direction. What fraction of the explained sum of squares does it capture?"), 0.5),
  mcq(m(PL, "apply-best-one", "apply", 9, 80, "Among all one-dimensional fits along a direction in coefficient space, OLS restricted to the direction $\\mathbf{X}^T Y$ (one-component PLS) is the direction of:"),
    "Steepest descent of the squared error at $\\boldsymbol{\\beta} = \\mathbf{0}$",
    [
      ["Largest variance of $\\mathbf{X}$", "best-pcr", "That is the first principal component."],
      ["Smallest coefficient norm", "best-norm", "That is a ridge-type property."],
      ["Sparsest fit", "best-sparse", "PLS directions are dense."],
    ]),
  // level 10
  short(m(PL, "transfer-ranking", "transfer", 10, 200, "Rank OLS, ridge, PCR and PLS by how much they use $Y$ in choosing the shrinkage pattern, and explain a situation where each is the best choice."),
    [
      ["ranking", "Ridge and PCR choose shrinkage from $\\mathbf{X}$ only; PLS uses $Y$; OLS does not shrink", 2, true],
      ["situations", "Gives sensible situations: OLS with few predictors and much data; ridge with many small effects; PCR when signal lies in top components; PLS when predictive directions have modest variance", 2, true],
      ["validation", "Mentions choosing among them by validation error", 1, false],
    ]),
  short(m(PL, "transfer-signal-low-variance", "transfer", 10, 200, "A predictive signal is a small difference between two large, highly correlated characteristics. Explain how PCR, PLS and ridge would treat it."),
    [
      ["pcr", "PCR keeps the common (high-variance) direction and may drop the difference direction entirely", 2, true],
      ["ridge", "Ridge shrinks the difference direction heavily but not to zero", 1, true],
      ["pls", "PLS can pick up the difference if its covariance with $Y$ is large enough", 2, true],
    ]),
  num(m(PL, "apply-pls-fraction", "apply", 10, 90, "One-component PLS gives $\\boldsymbol{\\beta} = [\\tfrac{10}{17}, \\tfrac{5}{17}]$ with $\\mathbf{X}^T\\mathbf{X} = \\text{diag}(4, 1)$. Its explained sum of squares is $\\boldsymbol{\\beta}^T\\mathbf{X}^T\\mathbf{X}\\boldsymbol{\\beta}$. What fraction of the OLS value $2$ is that? Give $2$ decimal places."), 0.74),
  mcq(m(PL, "apply-zero-components", "apply", 10, 90, "Cross-validation selects zero PLS components. The best interpretation is:"),
    "No linear direction in the predictors forecasts $Y$ better than its mean out of sample",
    [
      ["PLS failed to converge", "zero-converge", "PLS is a finite algorithm."],
      ["The predictors are perfectly collinear", "zero-collinear", "Collinearity would not force zero components."],
      ["$Y$ has zero variance", "zero-variance", "A constant $Y$ is not the usual reason."],
    ]),
];

// ---------------------------------------------------------------------------
// least-angle-regression
// ---------------------------------------------------------------------------
const LA = "least-angle-regression";
const leastAngle: Item[] = [
  // level 1
  mcq(m(LA, "recall-first", "recall", 1, 15, "LARS starts by moving toward the predictor that:"),
    "Has the largest absolute correlation with the residual (initially $Y$)",
    [
      ["Has the largest variance", "first-variance", "Predictors are standardized; LARS uses correlation."],
      ["Gives the largest drop in SSE after a full fit", "first-stepwise", "That is how forward stepwise chooses, and it then jumps all the way."],
      ["Is listed first", "first-order", "The order of columns is irrelevant."],
    ]),
  mcq(m(LA, "recall-equiangular", "recall", 1, 15, "After two predictors are active, LARS moves the fit along a direction that:"),
    "Makes equal angles with both active predictors",
    [
      ["Is the newest predictor alone", "equi-newest", "That would make the correlations unequal."],
      ["Is the OLS fit on all predictors", "equi-ols", "LARS approaches OLS only at the end."],
      ["Is orthogonal to both active predictors", "equi-orthogonal", "Moving orthogonally would not change their correlations."],
    ]),
  mcq(m(LA, "recall-lasso-mod", "recall", 1, 15, "The modification that turns LARS into an algorithm for the lasso path is:"),
    "Dropping a variable from the active set when its coefficient hits zero",
    [
      ["Adding an $\\ell_2$ penalty", "mod-ridge", "That gives the elastic net."],
      ["Standardizing the predictors", "mod-standardize", "LARS already assumes standardized predictors."],
      ["Using smaller steps", "mod-small", "Small steps give forward stagewise."],
    ]),
  mcq(m(LA, "recall-stagewise", "recall", 1, 15, "Forward stagewise regression updates the fit by:"),
    "A tiny step $\\pm\\eta$ on the coefficient most correlated with the residual",
    [
      ["A full least-squares refit after adding a variable", "stage-stepwise", "That is forward stepwise."],
      ["Shrinking all coefficients proportionally", "stage-ridge", "That is ridge-like shrinkage."],
      ["Removing the least significant variable", "stage-backward", "That is backward elimination."],
    ]),
  // level 2
  num(m(LA, "apply-max-corr", "apply", 2, 20, "Standardized predictors have correlations $[0.3, -0.5, 0.2]$ with $Y$. What is the maximum absolute correlation $C$ that determines the first entry?"), 0.5),
  num(m(LA, "apply-kkt-level", "apply", 2, 20, "For the lasso objective $\\lVert\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta}\\rVert^2 + \\lambda\\lVert\\boldsymbol{\\beta}\\rVert_1$ with $\\lambda = 0.6$, what is the absolute correlation $|\\mathbf{X}_j^T\\mathbf{e}|$ of every active predictor?"), 0.3),
  num(m(LA, "apply-stagewise-norm", "apply", 2, 20, "Forward stagewise takes $50$ steps of size $\\eta = 0.01$. What is the largest possible $\\lVert\\hat{\\boldsymbol{\\beta}}\\rVert_1$?"), 0.5),
  mcq(m(LA, "apply-which-enters", "apply", 2, 20, "Correlations with $Y$ are $[0.3, -0.5, 0.2]$. Which predictor enters first, and with what sign?"),
    "Predictor $2$, with a negative coefficient",
    [
      ["Predictor $1$, positive", "enter-first", "LARS uses absolute correlation."],
      ["Predictor $3$, positive", "enter-third", "It has the smallest correlation."],
      ["Predictor $2$, positive", "enter-sign", "The coefficient moves in the direction of the correlation's sign."],
    ]),
  // level 3
  num(m(LA, "apply-tie-step", "apply", 3, 25, "Unit-norm predictors have $\\mathbf{X}_1^T\\mathbf{X}_2 = 0.2$ and $\\mathbf{X}^T Y = [0.9, 0.5]$. Moving $\\beta_1$ by $\\gamma$ gives $c_1 = 0.9 - \\gamma$ and $c_2 = 0.5 - 0.2\\gamma$. Find the $\\gamma$ at which they tie."), 0.5),
  num(m(LA, "apply-tie-corr", "apply", 3, 25, "In the same setup ($\\mathbf{X}^T Y = [0.9, 0.5]$, $\\mathbf{X}_1^T\\mathbf{X}_2 = 0.2$), what is the common correlation when the second predictor enters?"), 0.4),
  num(m(LA, "apply-steps", "apply", 3, 25, "With $p = 5$ predictors, $n = 100$ observations and no variable ever dropped, how many LARS steps does it take to reach the OLS fit?"), 5),
  mcq(m(LA, "apply-piecewise", "apply", 3, 25, "The lasso coefficient path as a function of $\\lambda$ is:"),
    "Piecewise linear, with kinks where variables enter or leave",
    [
      ["Smooth and curved", "path-smooth", "That describes the ridge path."],
      ["A step function", "path-step", "That describes best subset or stepwise paths."],
      ["Linear throughout", "path-linear", "The direction changes at each event."],
    ]),
  // level 4
  num(m(LA, "apply-soft-threshold", "apply", 4, 35, "With orthonormal predictors, the lasso soft-thresholds the OLS coefficients at $\\lambda/2$. Find the lasso coefficient for $\\hat{\\beta}_{OLS} = 0.7$ and $\\lambda/2 = 0.3$."), 0.4),
  num(m(LA, "apply-soft-zero", "apply", 4, 35, "With orthonormal predictors and threshold $\\lambda/2 = 0.3$, what is the lasso coefficient when $\\hat{\\beta}_{OLS} = -0.2$?"), 0),
  num(m(LA, "apply-ols-endpoint", "apply", 4, 35, "Unit-norm predictors have $\\mathbf{X}_1^T\\mathbf{X}_2 = 0.2$ and $\\mathbf{X}^T Y = [0.9, 0.5]$. LARS ends at OLS. Find the OLS $\\beta_2$. Give $2$ decimal places."), 0.33),
  mcq(m(LA, "apply-stepwise-vs-lars", "apply", 4, 35, "Compared with forward stepwise, LARS:"),
    "Adds variables in a similar order but moves coefficients only part of the way",
    [
      ["Refits all coefficients by OLS at each step", "lars-refit", "That is forward stepwise."],
      ["Never reaches the OLS fit", "lars-never", "It does at the end."],
      ["Uses an $\\ell_2$ penalty", "lars-l2", "LARS has no explicit penalty."],
    ]),
  // level 5
  short(m(LA, "explain-least-angle", "explain", 5, 120, "Why is LARS called “least angle” regression?"),
    [
      ["angle", "The entering predictor makes the smallest angle (largest correlation) with the current residual", 2, true],
      ["equiangular", "The fit then moves along the direction making equal angles with all active predictors", 2, true],
      ["tie", "It stops when another predictor's angle ties", 1, false],
    ]),
  mcq(m(LA, "apply-kkt-inactive", "apply", 5, 40, "At a lasso solution, an inactive predictor ($\\hat{\\beta}_j = 0$) must satisfy:"),
    "$|\\mathbf{X}_j^T\\mathbf{e}| \\le \\lambda/2$",
    [
      ["$\\mathbf{X}_j^T\\mathbf{e} = 0$", "kkt-zero", "That is the OLS condition."],
      ["$|\\mathbf{X}_j^T\\mathbf{e}| > \\lambda/2$", "kkt-greater", "Then it would enter the model."],
      ["$|\\mathbf{X}_j^T\\mathbf{e}| = \\lambda$", "kkt-lambda", "The threshold is $\\lambda/2$ for this scaling, and inactive ones may be below it."],
    ]),
  mcq(m(LA, "apply-boosting", "apply", 5, 40, "Gradient boosting with linear base learners and a small learning rate is essentially:"),
    "Forward stagewise regression",
    [
      ["Ridge regression", "boost-ridge", "Its implicit penalty is $\\ell_1$-like, not $\\ell_2$."],
      ["Best subset selection", "boost-subset", "Boosting never does a combinatorial search."],
      ["PCR", "boost-pcr", "It does not use principal components."],
    ]),
  num(m(LA, "apply-equiangular-a", "apply", 5, 40, "Two unit-norm predictors have $\\mathbf{X}_1^T\\mathbf{X}_2 = 0.5$. The equiangular unit vector is $\\mathbf{u} = (\\mathbf{X}_1 + \\mathbf{X}_2)/\\sqrt{3}$. Find $\\mathbf{X}_1^T\\mathbf{u}$. Give $2$ decimal places."), 0.87),
  // level 6
  short(m(LA, "explain-drop", "explain", 6, 150, "Explain why plain LARS can violate the lasso conditions, and how the drop step fixes it."),
    [
      ["sign", "The lasso requires each active coefficient's sign to match its correlation's sign", 2, true],
      ["cross", "Plain LARS can move a coefficient through zero, breaking that condition", 2, true],
      ["fix", "The drop step stops at zero, removes the variable, and recomputes the direction", 1, true],
    ]),
  num(m(LA, "apply-drop-step", "apply", 6, 50, "An active coefficient is $0.3$ and changes at rate $-0.6$ per unit step along the current LARS direction. After what step length does it hit zero?"), 0.5),
  num(m(LA, "apply-soft-count", "apply", 6, 50, "Orthonormal design, OLS coefficients $[0.5, -0.1, 0.25, -0.4]$, threshold $\\lambda/2 = 0.2$. How many lasso coefficients are nonzero?"), 3),
  mcq(m(LA, "apply-stagewise-limit", "apply", 6, 50, "As the step $\\eta \\to 0$, forward stagewise traces:"),
    "A monotone version of the lasso path, identical to it when no lasso coefficient shrinks back toward zero",
    [
      ["Exactly the ridge path", "limit-ridge", "Stagewise is $\\ell_1$-like."],
      ["The forward stepwise path", "limit-stepwise", "Stepwise jumps; stagewise is continuous."],
      ["Always exactly the lasso path", "limit-always", "They differ when a lasso coefficient moves back toward zero."],
    ]),
  // level 7
  short(m(LA, "explain-implicit-l1", "explain", 7, 150, "Explain why stopping forward stagewise early acts like an $\\ell_1$ penalty."),
    [
      ["increment", "Each step adds exactly $\\eta$ to $\\lVert\\boldsymbol{\\beta}\\rVert_1$", 2, true],
      ["budget", "After $k$ steps $\\lVert\\boldsymbol{\\beta}\\rVert_1 \\le k\\eta$, like the lasso budget $t$", 2, true],
      ["sparse", "Variables never selected stay exactly zero", 1, false],
    ]),
  num(m(LA, "apply-path-b1", "apply", 7, 60, "Unit-norm predictors with $\\mathbf{X}_1^T\\mathbf{X}_2 = 0.5$ and $\\mathbf{X}^T Y = [0.8, 0.6]$: LARS reaches $[0.4, 0]$ when the common correlation is $0.4$, then moves along $[1, 1]$, lowering the common correlation by $1.5$ per unit step. Find the lasso $\\beta_1$ at $\\lambda/2 = 0.3$. Give $2$ decimal places."), 0.47),
  num(m(LA, "apply-path-b2", "apply", 7, 60, "In the same path, find the lasso $\\beta_2$ at $\\lambda/2 = 0.3$. Give $2$ decimal places."), 0.07),
  mcq(m(LA, "apply-collinear-entry", "apply", 7, 60, "Two predictors are nearly identical and both relate to $Y$. Along the lasso path:"),
    "Which one enters first can flip with small changes in the data",
    [
      ["Both always enter together with equal coefficients", "coll-together", "That is the elastic net's grouping behaviour."],
      ["Neither ever enters", "coll-neither", "They are strongly correlated with $Y$."],
      ["The lasso cannot be computed", "coll-fail", "The fit is unique even if the coefficients are not."],
    ]),
  // level 8
  short(m(LA, "derive-tie-step", "explain", 8, 180, "Derive the LARS step length for an inactive predictor $j$: $\\gamma_j = \\min^{+}\\left\\lbrace\\frac{C - c_j}{A_A - a_j}, \\frac{C + c_j}{A_A + a_j}\\right\\rbrace$, where $a_j = \\mathbf{X}_j^T\\mathbf{u}_A$."),
    [
      ["update", "Along $\\mathbf{u}_A$, active correlations become $C - \\gamma A_A$ and predictor $j$'s becomes $c_j - \\gamma a_j$", 2, true],
      ["tie", "Sets $|c_j - \\gamma a_j| = C - \\gamma A_A$ and solves both sign cases", 2, true],
      ["minimum", "Takes the smallest positive solution over inactive $j$", 1, true],
    ]),
  num(m(LA, "apply-stagewise-steps", "apply", 8, 70, "Forward stagewise with $\\eta = 0.01$ moves only $\\beta_1$ until it reaches $0.4$. How many steps is that?"), 40),
  num(m(LA, "apply-lars-steps", "apply", 8, 70, "With $p = 10$ predictors, $n = 500$, and no coefficient ever crossing zero, how many LARS–lasso steps reach the full OLS fit?"), 10),
  mcq(m(LA, "apply-cost", "apply", 8, 70, "The computational cost of the whole LARS path for $p < n$ is about:"),
    "The same order as a single OLS fit",
    [
      ["$p$ times an OLS fit", "cost-p", "Each step is an incremental update, not a refit."],
      ["Exponential in $p$", "cost-exp", "That is best subset."],
      ["Independent of $n$", "cost-n", "Correlations require passes over the data."],
    ]),
  // level 9
  short(m(LA, "transfer-select-or-fit", "transfer", 9, 180, "A researcher uses the LARS path to pick the “top five signals” and reports their OLS $t$-statistics. Critique the approach."),
    [
      ["selection", "Selection used the same data, so post-selection $t$-statistics are biased upward", 2, true],
      ["instability", "With correlated signals the selected set is unstable", 1, true],
      ["fix", "Suggests sample splitting, selective inference, or stability selection", 2, true],
    ]),
  short(m(LA, "transfer-compare", "transfer", 9, 180, "Compare forward stepwise, forward stagewise and LARS on greediness, computational cost and stability."),
    [
      ["stepwise", "Stepwise is greedy, jumps to full fits, and is unstable", 2, true],
      ["stagewise", "Stagewise is cautious, smooth and stable but needs many tiny steps", 1, true],
      ["lars", "LARS takes the stagewise geometry in exact large steps at about the cost of one OLS fit", 2, true],
    ]),
  num(m(LA, "apply-soft-l1", "apply", 9, 80, "Orthonormal design, OLS coefficients $[1.2, -0.5, 0.3]$, threshold $\\lambda/2 = 0.4$. Find the $\\ell_1$ norm of the lasso solution."), 0.9),
  mcq(m(LA, "apply-relaxed", "apply", 9, 80, "The relaxed lasso refits OLS on the variables the lasso selects. Its main purpose is to:"),
    "Remove the shrinkage bias on the selected coefficients while keeping the lasso's selection",
    [
      ["Select more variables", "relaxed-more", "It keeps the same set."],
      ["Make the path smooth", "relaxed-smooth", "It refits; smoothness is not the goal."],
      ["Fix collinearity", "relaxed-collinear", "Refitting by OLS does not help collinearity."],
    ]),
  // level 10
  short(m(LA, "transfer-boosting-overfit", "transfer", 10, 200, "Explain, via its link to forward stagewise, why gradient boosting with a small learning rate and early stopping resists overfitting."),
    [
      ["stagewise", "Small-learning-rate boosting is forward stagewise", 2, true],
      ["l1", "Early stopping bounds the $\\ell_1$ norm of the coefficients, an implicit lasso penalty", 2, true],
      ["tuning", "The number of iterations is chosen by validation, playing the role of $\\lambda$", 1, false],
    ]),
  short(m(LA, "transfer-path-pick", "transfer", 10, 200, "How would you choose a single model from the LARS–lasso path for a forecasting application with time-series data?"),
    [
      ["cv", "Uses cross-validation along the path, or an information criterion with df equal to the number of active variables", 2, true],
      ["time", "Uses blocked or rolling-origin validation that respects time order", 2, true],
      ["one-se", "Mentions the one-standard-error rule for a sparser, more stable model", 1, false],
    ]),
  num(m(LA, "apply-lambda-max", "apply", 10, 90, "Unit-norm predictors have $\\mathbf{X}^T Y = [0.9, 0.5]$. For $\\lVert\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta}\\rVert^2 + \\lambda\\lVert\\boldsymbol{\\beta}\\rVert_1$, find the smallest $\\lambda$ at which every coefficient is zero."), 1.8),
  mcq(m(LA, "apply-df-lasso", "apply", 10, 90, "For the lasso, an unbiased estimate of the degrees of freedom is:"),
    "The number of nonzero coefficients",
    [
      ["$p$", "df-p", "That is OLS on all predictors."],
      ["$\\sum_k\\frac{d_k^2}{d_k^2 + \\lambda}$", "df-ridge", "That is ridge's."],
      ["Always more than the number of active variables", "df-more", "For the lasso the active-set size is unbiased for df (Zou, Hastie and Tibshirani)."],
    ]),
];

export const regressionGaps02Items: Item[] = [...partialLeastSquares, ...leastAngle];
