import type { Item } from "../../../lib/assessment/types";
import { makeBuilders } from "../authoring";
import { EXPANSION } from "./source";

/**
 * Linear Models to 40: robust regression (quantile, M-estimation, breakdown
 * and influence, high-breakdown fits) and computation (Cholesky, QR, SVD,
 * updating and the sweep operator, numerical accuracy).
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

const QU = "quantile-regression";
const ME = "m-estimators-regression";
const BP = "breakdown-point-and-influence-function";
const HB = "high-breakdown-regression";
const CH = "least-squares-via-cholesky";
const QR = "least-squares-via-qr";
const SV = "least-squares-via-svd";
const SW = "updating-and-sweep-operator";
const NA = "numerical-accuracy-least-squares";

export const rgToFortyDItems: Item[] = [
  // --- quantile-regression -----------------------------------------------
  m(QU, "f40-tau75", 1.5, "Quantile regression at $\\tau = 0.75$ estimates:", "The conditional $75$th percentile of $y$ given $x$",
    [["The conditional mean of $y$", "That's OLS."], ["$75\\%$ of the conditional mean", "No."], ["The upper quartile of $x$", "It's about $y$ given $x$."]]),
  n(QU, "f40-loss-pos", 2, "Check loss $\\rho_\\tau(u) = u(\\tau - \\mathbf{1}[u < 0])$ with $\\tau = 0.25$ and $u = 4$. What is it?", 1, 0.001),
  n(QU, "f40-loss-neg", 3, "Same $\\tau = 0.25$, now $u = -4$. What is the loss?", 3, 0.001),
  n(QU, "f40-intercept", 3.5, "Intercept-only quantile regression at $\\tau = 0.25$ on $y = 1, 3, 5, 7, 9, 11, 13$. What value minimises the check loss?", 3, 0.001),
  m(QU, "f40-qte", 4.5, "In a quantile regression, the coefficient on a binary treatment at $\\tau = 0.9$ is:", "The difference between the treated and control conditional $90$th percentiles",
    [["The $90$th percentile of individual treatment effects", "Quantiles of differences aren't differences of quantiles."], ["The average treatment effect", "That's the mean."], ["The effect for the top $10\\%$ of individuals", "Only under rank invariance."]]),
  n(QU, "f40-interval", 5, "At some $x$, the fitted $10$th and $90$th percentiles are $20$ and $50$. What is the width of the implied $80\\%$ prediction interval?", 30, 0.001),
  m(QU, "f40-equivariance", 5.5, "You fit quantile regression to $\\log y$. Exponentiating a fitted conditional median gives:", "The conditional median of $y$ itself",
    [["The conditional mean of $y$", "Means aren't preserved by $\\exp$."], ["A biased median", "Quantiles are equivariant to monotone maps."], ["Nothing interpretable", "It's the median of $y$."]]),
  n(QU, "f40-rearrange", 6, "At some $x$, fitted quantiles cross: $\\hat{Q}_{0.8} = 12$ and $\\hat{Q}_{0.9} = 11$. After sorting (rearrangement), what is the $\\tau = 0.9$ value?", 12, 0.001),
  s(QU, "f40-location-scale", 7.5, "In the location–scale model $y = x^\\top\\beta + (x^\\top\\gamma)\\varepsilon$, derive the conditional quantile function and explain what differing slopes across $\\tau$ reveal.",
    "$Q_\\tau(y \\mid x) = x^\\top\\beta + (x^\\top\\gamma)F_\\varepsilon^{-1}(\\tau) = x^\\top(\\beta + \\gamma F_\\varepsilon^{-1}(\\tau))$, so slopes are $\\beta + \\gamma F^{-1}(\\tau)$.",
    "Slopes vary with $\\tau$ exactly when $\\gamma$ has non-intercept components — i.e. $x$ affects the spread (heteroskedasticity); with constant spread all quantile lines are parallel."),
  s(QU, "f40-expectile", 8.5, "Compare expectile regression with quantile regression.",
    "Expectiles minimise an asymmetric squared loss $|\\tau - \\mathbf{1}[u < 0]|u^2$, while quantiles minimise the asymmetric absolute (check) loss.",
    "Expectiles are smooth and easy to compute and include the mean ($\\tau = 0.5$), but they lack quantiles' direct probability interpretation and are less robust to outliers."),

  // --- m-estimators-regression -------------------------------------------
  m(ME, "f40-generalises", 1.5, "M-estimators generalise:", "Maximum likelihood, by minimising $\\sum_i\\rho(r_i)$ for a chosen $\\rho$",
    [["Bayesian estimation", "No prior is involved."], ["The method of moments only", "Not the main idea."], ["Ridge regression", "No."]]),
  n(ME, "f40-huber-w", 2.5, "Huber weight $w(u) = \\min(1, c/|u|)$ with $c = 1.345$ and $u = 1$. What is $w$?", 1, 0.001),
  n(ME, "f40-huber-rho", 3.5, "Huber loss with $c = 2$ and $u = 4$: $\\rho(u) = c|u| - c^2/2$. What is it?", 6, 0.001),
  n(ME, "f40-bisquare-zero", 4, "Tukey's bisquare weight with $c = 4.685$ for a residual $|u| = 5$. What is the weight?", 0, 0.001),
  m(ME, "f40-psi", 4.5, "The $\\psi$ function of an M-estimator is:", "The derivative of $\\rho$, which determines how much each residual pulls on the fit",
    [["The weight function itself", "Weights are $\\psi(u)/u$."], ["The residual's square", "Only for least squares, as $\\rho$."], ["The scale estimate", "No."]]),
  n(ME, "f40-scale", 5, "The median absolute residual (MAD around $0$) is $3$. What is the normal-consistent scale $1.4826 \\times \\mathrm{MAD}$ (to $3$ decimals)?", 4.448, 0.002),
  m(ME, "f40-bisquare-c", 5.5, "The bisquare tuning constant $c = 4.685$ is chosen to give:", "$95\\%$ efficiency relative to least squares under normal errors",
    [["A $50\\%$ breakdown point", "M-estimators in regression don't reach that."], ["Unbiasedness", "Not the criterion."], ["The smallest possible residuals", "No."]]),
  n(ME, "f40-irls", 6, "One IRLS step for a location: values $2, 4, 6, 30$ with weights $1, 1, 1, 0.1$. What is the weighted mean (to $4$ decimals)?", 4.8387, 0.002),
  s(ME, "f40-avar", 8, "State the asymptotic variance of a location M-estimator and explain its sandwich form.",
    "$\\operatorname{Var}(\\hat{\\theta}) \\approx \\frac{1}{n}\\cdot\\frac{E[\\psi(\\varepsilon)^2]}{(E[\\psi'(\\varepsilon)])^2}$ (times $\\sigma^2$ for standardised residuals).",
    "The “meat” $E\\psi^2$ is the variance of the estimating function; the “bread” $E\\psi'$ is its slope. Bounded $\\psi$ limits the meat when errors are heavy-tailed, which is where robustness pays."),
  s(ME, "f40-glm", 9, "How is M-estimation extended to robust generalised linear models?",
    "Replace the GLM score $\\sum_i x_i(y_i - \\mu_i)/V(\\mu_i)$ by $\\sum_i w(x_i)\\psi(r_i)x_i/\\sqrt{V(\\mu_i)} - a(\\beta)$, with $r_i$ Pearson residuals and $\\psi$ bounded (e.g. Huber).",
    "Weights $w(x_i)$ downweight leverage points, and the correction $a(\\beta)$ keeps the equations unbiased (Cantoni–Ronchetti); fitting is by modified IRLS."),

  // --- breakdown-point-and-influence-function ----------------------------
  m(BP, "f40-higher", 1.5, "An estimator with a higher breakdown point:", "Tolerates a larger fraction of arbitrary contamination before failing",
    [["Is always more efficient", "Often the opposite."], ["Has a larger variance always", "Not necessarily."], ["Is unbiased", "Unrelated."]]),
  n(BP, "f40-mad", 2.5, "What is the asymptotic breakdown point of the MAD scale estimator (as a fraction)?", 0.5, 0.001),
  n(BP, "f40-if-mean", 3.5, "The influence function of the mean is $\\text{IF}(z) = z - \\mu$. With $\\mu = 4$, what is $\\text{IF}(10)$?", 6, 0.001),
  m(BP, "f40-bounded", 4, "A bounded influence function means:", "A small fraction of contamination at any point has a limited effect on the estimate",
    [["The estimator can't break down", "Breakdown is a separate (global) property."], ["The estimator is unbiased", "No."], ["Outliers are deleted", "They're downweighted, not necessarily deleted."]]),
  n(BP, "f40-ges", 4.5, "The gross-error sensitivity of Huber's location estimator is $c/P(|Z| \\le c)$. With $c = 1.345$ and $P(|Z| \\le 1.345) = 0.8214$, what is it (to $3$ decimals)?", 1.637, 0.003),
  m(BP, "f40-iqr", 5, "The breakdown point of the interquartile range is:", "$25\\%$",
    [["$50\\%$", "That's the MAD."], ["$0\\%$", "That's the standard deviation."], ["$10\\%$", "No."]]),
  n(BP, "f40-hl", 5.5, "The Hodges–Lehmann estimator's breakdown point is $1 - 1/\\sqrt{2}$. What is it (to $4$ decimals)?", 0.2929, 0.002),
  n(BP, "f40-hl-are", 6, "Its asymptotic relative efficiency to the mean under normality is $3/\\pi$. What is it (to $4$ decimals)?", 0.9549, 0.002),
  s(BP, "f40-local-global", 7.5, "Explain the difference between local robustness (the influence function) and global robustness (breakdown), with an example where they disagree.",
    "The influence function measures the effect of an infinitesimal contamination at a point; breakdown is the largest contamination fraction an estimator survives.",
    "A Huber regression M-estimator has bounded influence in $y$ but breakdown $1/n$, because a single bad leverage point can still carry it away — good locally, poor globally."),
  s(BP, "f40-variance-if", 8.5, "Derive the influence function of the variance functional and explain what it implies.",
    "For $T(F) = \\int(x - \\mu)^2dF$, perturbing $F$ towards a point mass at $z$ gives $\\text{IF}(z) = (z - \\mu)^2 - \\sigma^2$.",
    "It's unbounded and grows quadratically, so the sample variance is even more outlier-sensitive than the mean — motivating robust scales like the MAD or $Q_n$."),

  // --- high-breakdown-regression -----------------------------------------
  m(HB, "f40-h-n", 1.5, "Least trimmed squares with $h = n$ reduces to:", "Ordinary least squares",
    [["Least median of squares", "No."], ["The median", "No."], ["An M-estimator", "No."]]),
  n(HB, "f40-h", 2.5, "For maximum breakdown with $n = 60$ and $p = 4$, what is $h = \\lfloor (n + p + 1)/2 \\rfloor$?", 32, 0.001),
  n(HB, "f40-lts", 3.5, "Squared residuals $1, 4, 9, 16, 100$ with $h = 3$. What is the LTS objective?", 14, 0.001),
  n(HB, "f40-clean", 4.5, "With $10\\%$ contamination and $p = 3$, what is the probability that a random elemental subset is outlier-free, $0.9^3$?", 0.729, 0.001),
  m(HB, "f40-s", 5, "An S-estimator of regression minimises:", "A robust M-estimate of the residual scale",
    [["The sum of squared residuals", "That's OLS."], ["The median of $|x|$", "No."], ["The number of outliers", "No."]]),
  n(HB, "f40-starts", 5.5, "Each random start is clean with probability $0.729$. What is the smallest number of starts giving at least $99\\%$ chance of one clean start?", 4, 0.001),
  m(HB, "f40-mm", 6, "An MM-estimator achieves:", "A high breakdown point (from an S-estimate start and scale) together with high efficiency (from a final M-step)",
    [["Only high efficiency", "It also keeps high breakdown."], ["Only high breakdown", "The M-step adds efficiency."], ["Exact unbiasedness", "No."]]),
  n(HB, "f40-bp", 6.5, "LTS breakdown is $(n - h + 1)/n$. With $n = 100$ and $h = 60$, what is it?", 0.41, 0.001),
  s(HB, "f40-reweight", 7.5, "Why are high-breakdown fits usually followed by a reweighting or M-step?",
    "LTS and LMS have low statistical efficiency (LMS converges at rate $n^{-1/3}$), so on clean data they waste information.",
    "Flagging points with large robust residuals and refitting (reweighted LS, or an MM M-step) recovers near-OLS efficiency while keeping the robustness of the initial fit."),
  s(HB, "f40-exact-fit", 9, "What is the exact-fit property of high-breakdown estimators, and why can it be a double-edged sword?",
    "If more than half the data lie exactly on a hyperplane, a high-breakdown estimator returns that hyperplane regardless of the rest.",
    "That rescues the majority structure from contamination, but if the data are a mixture of two genuine subpopulations, the fit describes only the larger one and labels the other as outliers — the analyst must check which story is true."),

  // --- least-squares-via-cholesky ----------------------------------------
  m(CH, "f40-form", 1.5, "A Cholesky factor of a symmetric positive-definite matrix is:", "Triangular with a positive diagonal",
    [["Orthogonal", "That's $Q$ in QR."], ["Diagonal in general", "Only for diagonal matrices."], ["Symmetric", "It's triangular."]]),
  n(CH, "f40-l11", 2.5, "Cholesky of $\\begin{bmatrix} 16 & 8 \\\\ 8 & 5 \\end{bmatrix}$: what is $\\ell_{11}$?", 4, 0.001),
  n(CH, "f40-l21", 3, "Same matrix: what is $\\ell_{21} = a_{21}/\\ell_{11}$?", 2, 0.001),
  n(CH, "f40-l22", 3.5, "Same matrix: what is $\\ell_{22} = \\sqrt{a_{22} - \\ell_{21}^2}$?", 1, 0.001),
  n(CH, "f40-forward", 4.5, "Forward-solve $Lz = b$ with $L = \\begin{bmatrix} 4 & 0 \\\\ 2 & 1 \\end{bmatrix}$ and $b = (8, 7)$. What is $z_2$?", 3, 0.001),
  m(CH, "f40-semidef", 5, "Running Cholesky without pivoting on a rank-deficient $X^\\top X$:", "Hits a zero (or, with rounding, slightly negative) pivot and fails",
    [["Always succeeds", "Rank deficiency breaks it."], ["Returns the minimum-norm solution", "That's the SVD."], ["Produces an orthogonal factor", "No."]]),
  n(CH, "f40-logdet", 5.5, "A Cholesky factor has diagonal $2$ and $3$. What is $\\log\\det(X^\\top X) = 2\\sum\\log\\ell_{ii}$ (to $4$ decimals)?", 3.5835, 0.002),
  m(CH, "f40-jitter", 6, "When $X^\\top X$ is nearly singular, a common practical fix before Cholesky is to:", "Add a small multiple of the identity (jitter, i.e. a tiny ridge)",
    [["Square the matrix again", "Worsens conditioning."], ["Drop the diagonal", "Breaks positive definiteness."], ["Use single precision", "Worse accuracy."]]),
  s(CH, "f40-mvn", 7.5, "How does the Cholesky factor connect generalised least squares to sampling from a multivariate normal?",
    "If $\\Sigma = LL^\\top$, then $z \\sim N(0, I)$ gives $Lz \\sim N(0, \\Sigma)$ — sampling.",
    "Conversely $L^{-1}$ whitens: GLS with $\\operatorname{Var}(\\varepsilon) = \\Sigma$ is OLS on $L^{-1}X$ and $L^{-1}y$, so the same factorisation serves both."),
  s(CH, "f40-pivoted", 8.5, "What is pivoted Cholesky, and how does it reveal the rank of $X^\\top X$?",
    "At each step, choose the largest remaining diagonal element as the pivot (symmetric permutation), giving $P^\\top X^\\top XP = LL^\\top$.",
    "Pivots decrease, so when the remaining diagonal falls below a tolerance the factorisation stops; the number of steps estimates the numerical rank and identifies a well-conditioned subset of columns."),

  // --- least-squares-via-qr ----------------------------------------------
  m(QR, "f40-q", 1.5, "In the thin QR decomposition of an $n \\times p$ matrix $X$, $Q$ is:", "$n \\times p$ with orthonormal columns",
    [["$p \\times p$ upper triangular", "That's $R$."], ["$n \\times n$ symmetric", "No."], ["Diagonal", "No."]]),
  n(QR, "f40-r", 2.5, "For the single column $x = (6, 8)$, what is $R = \\|x\\|$?", 10, 0.001),
  n(QR, "f40-beta", 3.5, "Same column with $q = (0.6, 0.8)$ and $y = (5, 5)$. What is $\\hat{\\beta} = q^\\top y/R$?", 0.7, 0.001),
  n(QR, "f40-back", 4, "Solve $R\\beta = (8, 6)$ with $R = \\begin{bmatrix} 4 & 2 \\\\ 0 & 3 \\end{bmatrix}$. What is $\\beta_1$?", 1, 0.001),
  m(QR, "f40-householder", 4.5, "A Householder reflection $H = I - 2vv^\\top/(v^\\top v)$ is:", "Symmetric and orthogonal, so $H^{-1} = H$",
    [["Upper triangular", "No."], ["Singular", "It's invertible."], ["A rotation in general", "It's a reflection."]]),
  n(QR, "f40-givens", 5, "A Givens rotation zeroing the second entry of $(3, 4)$ uses $\\cos\\theta = 3/5$. What is $\\cos\\theta$?", 0.6, 0.001),
  n(QR, "f40-leverage", 5.5, "Row $i$ of the thin $Q$ is $(0.3, 0.4)$. What is the leverage $h_{ii}$?", 0.25, 0.001),
  m(QR, "f40-add-col", 6, "Appending a new predictor to an existing QR fit requires:", "Orthogonalising only the new column against the current $Q$",
    [["Refactoring $X$ from scratch", "Not needed."], ["Inverting $X^\\top X$", "QR avoids that."], ["Recomputing all residuals by brute force", "Unnecessary."]]),
  s(QR, "f40-se", 7, "How are coefficient standard errors obtained from a QR fit without forming $(X^\\top X)^{-1}$ by brute force?",
    "Since $X^\\top X = R^\\top R$, $(X^\\top X)^{-1} = R^{-1}R^{-\\top}$; invert the small triangular $R$ by back-substitution.",
    "The diagonal entries are the squared row norms of $R^{-1}$; multiplying by $s^2$ gives the variances, all at $O(p^3)$ cost."),
  s(QR, "f40-cost", 8.5, "Compare the costs of Householder QR and the SVD for least squares, and say when the SVD is worth it.",
    "Householder QR costs about $2np^2 - \\tfrac{2}{3}p^3$ flops; the SVD costs several times more (roughly $4np^2 + 8p^3$ for the thin version).",
    "QR (with pivoting) suffices for full-rank or mildly deficient problems; the SVD is worth it when rank is ambiguous, a minimum-norm solution is needed, or you want to inspect or truncate singular values."),

  // --- least-squares-via-svd ---------------------------------------------
  m(SV, "f40-values", 1.5, "Singular values of a matrix are:", "Non-negative and conventionally listed in decreasing order",
    [["Always positive and equal", "No."], ["Possibly negative", "They're non-negative."], ["The diagonal of $X$", "Not in general."]]),
  n(SV, "f40-cond", 2.5, "Singular values $6$ and $2$. What is the condition number?", 3, 0.001),
  n(SV, "f40-coef", 3, "$u_1^\\top y = 12$ and $d_1 = 4$. What is the coefficient along $v_1$?", 3, 0.001),
  n(SV, "f40-fitted", 4, "$U^\\top y = (2, 1, 2)$. What is $\\|\\hat{y}\\|^2$?", 9, 0.001),
  m(SV, "f40-pinv", 4.5, "The Moore–Penrose pseudoinverse in SVD form is:", "$X^+ = VD^+U^\\top$, inverting only the nonzero singular values",
    [["$X^+ = UDV^\\top$", "That's $X$."], ["$X^+ = (X^\\top X)^{-1}$", "Wrong shape and needs full rank."], ["$X^+ = V^\\top D^{-1}U$", "Order and transposes are wrong."]]),
  n(SV, "f40-tol", 5, "A common rank tolerance is $\\max(n, p)\\,\\epsilon\\,d_1$. With $n = 1000$, $\\epsilon = 10^{-16}$ and $d_1 = 100$, what is it?", 1e-11, 0.01),
  n(SV, "f40-small", 5.5, "$d_2 = 0.1$ and $u_2^\\top y = 0.3$. If this direction is kept, what is its coefficient along $v_2$?", 3, 0.001),
  m(SV, "f40-minnorm", 6, "The minimum-norm least-squares solution from the SVD is:", "Orthogonal to the null space of $X$",
    [["Always unbiased", "Not when $X$ is rank-deficient."], ["The one with the smallest residual among many residuals", "All LS solutions share the same residual."], ["Zero", "No."]]),
  s(SV, "f40-tls", 8, "How does the SVD solve total least squares (errors in both $X$ and $y$)?",
    "Form $[X\\ y]$ and take its SVD; the right singular vector $v$ for the smallest singular value defines the best-fitting hyperplane.",
    "Writing $v = (v_x, v_y)$, the TLS coefficients are $-v_x/v_y$; this minimises perpendicular rather than vertical distances (orthogonal regression)."),
  s(SV, "f40-randomized", 9, "What is randomised SVD, and how can it help with very large regression problems?",
    "Multiply $X$ by a random matrix to capture its range, orthonormalise that sketch, and compute an exact SVD of the much smaller projected matrix.",
    "It gives accurate leading singular triples at a fraction of the cost, enabling truncated-SVD or ridge solutions and PCA-based regression on matrices too large for a full SVD."),

  // --- updating-and-sweep-operator ---------------------------------------
  m(SW, "f40-sm", 1.5, "The Sherman–Morrison formula gives:", "The inverse of a matrix after a rank-one update",
    [["The determinant of any matrix", "No."], ["The QR factorisation", "No."], ["The eigenvalues of $X^\\top X$", "No."]]),
  n(SW, "f40-scalar", 2.5, "Scalar case: $a = 5$, and a new row with $x = 2$ is added. What is the new inverse $1/(a + x^2)$ (to $4$ decimals)?", 0.1111, 0.002),
  n(SW, "f40-sweep-coef", 3.5, "Sweep $M = \\begin{bmatrix} 2 & 6 \\\\ 6 & 25 \\end{bmatrix}$ ($\\sum x^2$, $\\sum xy$, $\\sum y^2$) on position $1$. What is the coefficient entry $a_{1y}/a_{11}$?", 3, 0.001),
  n(SW, "f40-sweep-rss", 4, "Same sweep. What is the residual sum of squares $a_{yy} - a_{1y}^2/a_{11}$?", 7, 0.001),
  m(SW, "f40-woodbury", 4.5, "The Woodbury identity generalises Sherman–Morrison to:", "Rank-$k$ updates of a matrix inverse",
    [["Eigenvalue problems", "No."], ["Only diagonal matrices", "General matrices."], ["Nonlinear models", "No."]]),
  n(SW, "f40-downdate", 5, "Deleting a row: $(A - xx^\\top)^{-1} = A^{-1} + \\frac{A^{-1}xx^\\top A^{-1}}{1 - x^\\top A^{-1}x}$. With scalar $A^{-1} = 0.1$ and $x = 1$, what is it (to $4$ decimals)?", 0.1111, 0.002),
  n(SW, "f40-mean", 5.5, "$9$ observations have mean $20$. A new value $30$ arrives. What is the updated mean?", 21, 0.001),
  m(SW, "f40-forget", 6, "Recursive least squares with a forgetting factor $\\lambda < 1$:", "Discounts older observations so the fit can track changing coefficients",
    [["Ignores new observations", "The opposite."], ["Is identical to batch OLS", "Only when $\\lambda = 1$."], ["Requires storing all past data", "It's recursive."]]),
  s(SW, "f40-partial", 7.5, "How does the sweep operator yield partial correlations, and how is a variable removed?",
    "After sweeping the predictors in $S$, the unswept block holds the residual covariance of the remaining variables given $S$; normalising it gives partial correlations.",
    "Sweeping the same position again (the reverse sweep) undoes it, removing that predictor — which is why sweeps suit stepwise search."),
  s(SW, "f40-loocv", 8.5, "Explain how leave-one-out cross-validation for least squares costs essentially one fit.",
    "Deleting case $i$ is a rank-one downdate; Sherman–Morrison gives the deleted residual $e_i/(1 - h_{ii})$ in closed form.",
    "So $\\mathrm{LOOCV} = \\frac{1}{n}\\sum_i(e_i/(1 - h_{ii}))^2$ needs only the residuals and leverages from the full fit — $O(np^2)$ total instead of $n$ refits."),

  // --- numerical-accuracy-least-squares ----------------------------------
  m(NA, "f40-ill", 1.5, "An ill-conditioned least-squares problem is one where:", "Small changes in the data can cause large changes in the solution",
    [["The data are noisy", "Noise isn't conditioning."], ["The model is nonlinear", "No."], ["There are many observations", "No."]]),
  n(NA, "f40-kappa2", 2.5, "$\\kappa(X) = 10^4$. What is $\\kappa(X^\\top X)$?", 1e8, 0.001),
  n(NA, "f40-digits-qr", 3.5, "With about $16$ significant digits and $\\kappa(X) = 10^5$, about how many correct digits does QR retain ($16 - 5$)?", 11, 0.001),
  n(NA, "f40-kappa", 4, "Singular values of $X$ are $1000$ and $0.01$. What is $\\kappa(X)$?", 1e5, 0.001),
  m(NA, "f40-cancel", 4.5, "Catastrophic cancellation is:", "Losing significant digits by subtracting two nearly equal floating-point numbers",
    [["Overflow from very large numbers", "That's different."], ["Division by zero", "No."], ["Rounding errors cancelling out helpfully", "The opposite."]]),
  n(NA, "f40-single", 5, "Single precision carries about $7$ digits. Using QR with $\\kappa(X) = 10^4$, about how many correct digits remain?", 3, 0.001),
  m(NA, "f40-centre", 5.5, "Centring $x = 2000, \\dots, 2020$ before forming $x^2$ helps because:", "It removes near-collinearity among the intercept, $x$ and $x^2$, sharply reducing $\\kappa$",
    [["It changes the fitted values", "Fits are identical."], ["It removes outliers", "No."], ["It makes errors normal", "No."]]),
  n(NA, "f40-orth", 6, "$X$ has orthogonal columns with norms $50$ and $0.5$. What is its condition number?", 100, 0.001),
  s(NA, "f40-backward", 7.5, "What does it mean for a least-squares algorithm to be backward stable, and why is that the right goal?",
    "The computed solution is the exact solution of a slightly perturbed problem $(X + \\delta X, y + \\delta y)$ with perturbations of order machine epsilon.",
    "Since the data are never exact, an algorithm can't do better than solving a nearby problem; combined with conditioning, backward stability bounds the forward error. Householder QR is backward stable; normal equations are not."),
  s(NA, "f40-refine", 9, "How can iterative refinement or mixed precision improve least-squares accuracy or speed?",
    "Compute a factorisation cheaply (e.g. in lower precision), solve, then compute residuals in higher precision and solve correction equations with the same factorisation.",
    "Each refinement step recovers digits lost to the low-precision factorisation, giving near high-precision accuracy at mostly low-precision cost — provided the problem isn't too ill-conditioned for the factorisation."),
];
