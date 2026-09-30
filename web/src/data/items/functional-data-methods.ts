import type { Item, SourceRef } from "../../lib/assessment/types";
import { makeBuilders } from "./authoring";

/**
 * Functional Data Analysis methods: `hilbert-schmidt-operators`,
 * `functional-pca`, `multivariate-fpca` and `functional-regression`. Eight
 * items per concept, two per cognitive level.
 */
const AUTHORED: SourceRef = {
  id: "mathlingo-authored-fda-methods",
  tier: "generated",
  title: "Mathlingo authored item (functional data methods)",
};

const { mcq, short, num } = makeBuilders(AUTHORED);

const HS = "hilbert-schmidt-operators";
const hilbertSchmidt: Item[] = [
  mcq(
    { concept: HS, slug: "recall-condition", cognitive: "recall", level: 2, seconds: 40,
      stem: "An integral operator $(\\mathcal{K}f)(s) = \\int k(s, t) f(t)\\,dt$ on $L^2(\\mathcal{T})$ is Hilbert–Schmidt exactly when:" },
    "The kernel is square-integrable: $\\int\\!\\!\\int k(s, t)^2\\,ds\\,dt < \\infty$",
    [
      ["The kernel is bounded by $1$", "hs-bounded-kernel", "Boundedness on a bounded domain implies square-integrability, but the defining condition is the $L^2$ norm of the kernel."],
      ["The kernel is symmetric", "hs-symmetric", "Symmetry makes the operator self-adjoint, not Hilbert–Schmidt."],
      ["The operator has an inverse", "hs-invertible", "On infinite-dimensional spaces Hilbert–Schmidt operators never have bounded inverses."],
    ],
  ),
  mcq(
    { concept: HS, slug: "recall-covariance-properties", cognitive: "recall", level: 3, seconds: 40,
      stem: "Which properties does the covariance operator of a random curve $X$ with $\\mathbb{E}\\|X\\|^2 < \\infty$ have?" },
    "Self-adjoint, positive semi-definite and trace class",
    [
      ["Self-adjoint and invertible", "cov-op-invertible", "Its eigenvalues decay to $0$, so it has no bounded inverse."],
      ["Positive definite with eigenvalues bounded away from $0$", "cov-op-bounded-below", "The eigenvalues are summable, so they must tend to $0$."],
      ["Skew-symmetric", "cov-op-skew", "$C(s, t) = C(t, s)$ makes it symmetric (self-adjoint)."],
    ],
  ),
  num(
    { concept: HS, slug: "apply-hs-norm", cognitive: "apply", level: 5, seconds: 70,
      stem: "A self-adjoint operator has eigenvalues $\\lambda_j = 1/j^2$ for $j = 1, 2, \\ldots$. Compute its squared Hilbert–Schmidt norm $\\sum_j \\lambda_j^2$, using $\\sum_j j^{-4} = \\pi^4/90$. Give $3$ decimal places." },
    1.082,
  ),
  num(
    { concept: HS, slug: "apply-trace", cognitive: "apply", level: 4, seconds: 50,
      stem: "Brownian motion on $[0, 2]$ has covariance $C(s, t) = \\min(s, t)$. What is the trace of its covariance operator, $\\int_0^2 C(t, t)\\,dt$?" },
    2,
  ),
  short(
    { concept: HS, slug: "explain-no-inverse", cognitive: "explain", level: 7, seconds: 100,
      stem: "Explain why the covariance operator of a random curve has no bounded inverse, and what this means for methods that use $\\Sigma^{-1}$ in the multivariate case." },
    [
      ["decay", "It is trace class, so its eigenvalues are summable and must tend to $0$; the inverse would multiply by $1/\\lambda_j \\to \\infty$.", 4, true],
      ["consequence", "Methods using $\\Sigma^{-1}$ (Mahalanobis distance, regression normal equations, LDA) become ill-posed for curves and need truncation to a few components or regularisation.", 3, true],
    ],
  ),
  mcq(
    { concept: HS, slug: "explain-psd", cognitive: "explain", level: 5, seconds: 45,
      stem: "Why is $\\langle \\mathcal{C}f, f\\rangle \\ge 0$ for every function $f$?" },
    "Because $\\langle \\mathcal{C}f, f\\rangle = \\operatorname{Var}\\big(\\langle X, f\\rangle\\big)$, and variances are non-negative",
    [
      ["Because the covariance function is always positive", "psd-positive-kernel", "Covariances can be negative; positive semi-definiteness is about the quadratic form."],
      ["Because $f$ is square-integrable", "psd-l2", "Square-integrability makes the form finite, not non-negative."],
      ["Because $\\mathcal{C}$ is compact", "psd-compact", "Compact operators can have negative eigenvalues."],
    ],
  ),
  mcq(
    { concept: HS, slug: "transfer-mahalanobis", cognitive: "transfer", level: 7.5, seconds: 50,
      stem: "A team wants to flag outlying curves by the functional analogue of the Mahalanobis distance, $\\langle X - \\mu, \\mathcal{C}^{-1}(X - \\mu)\\rangle$. What is the problem, and a standard fix?" },
    "It is infinite or unstable because $\\mathcal{C}^{-1}$ is unbounded; truncate to the first $K$ principal components, $\\sum_{j \\le K} \\xi_j^2/\\lambda_j$",
    [
      ["There is no problem; use the sample covariance matrix on a grid", "mahal-grid", "On a fine grid the sample covariance is near-singular and its inverse amplifies noise."],
      ["It is always zero for curves", "mahal-zero", "The issue is blow-up, not vanishing."],
      ["Replace $\\mathcal{C}^{-1}$ with $\\mathcal{C}$", "mahal-no-inverse", "That measures something different and down-weights exactly the low-variance directions that reveal outliers."],
    ],
  ),
  short(
    { concept: HS, slug: "transfer-grid", cognitive: "transfer", level: 7, seconds: 120,
      stem: "Curves are observed on a grid with spacing $h$, and you eigendecompose the $m \\times m$ sample covariance matrix. How do the matrix's eigenvalues and eigenvectors relate to the covariance operator's eigenvalues and eigenfunctions?" },
    [
      ["eigenvalues", "The integral $\\int C(s, t) f(t)\\,dt$ is approximated by $h\\sum_t C(s, t) f(t)$, so operator eigenvalues are approximately $h$ times the matrix eigenvalues.", 4, true],
      ["eigenvectors", "Unit-norm eigenvectors must be rescaled by $1/\\sqrt{h}$ so the eigenfunctions have $\\int \\phi^2 = 1$.", 3, true],
    ],
  ),
];

const FP = "functional-pca";
const fpca: Item[] = [
  mcq(
    { concept: FP, slug: "recall-eigenfunctions", cognitive: "recall", level: 1, seconds: 35,
      stem: "In functional PCA, the principal component functions are:" },
    "The eigenfunctions of the covariance operator, ordered by eigenvalue",
    [
      ["The first few sample curves", "fpca-sample-curves", "Principal components summarise variation across curves; they are not individual observations."],
      ["A fixed Fourier basis", "fpca-fourier", "Fourier functions are data-independent; FPCs adapt to the sample's covariance."],
      ["The derivatives of the mean function", "fpca-derivatives", "The mean is removed first; components describe variation around it."],
    ],
  ),
  mcq(
    { concept: FP, slug: "recall-scores", cognitive: "recall", level: 2.5, seconds: 40,
      stem: "What are the properties of the FPC scores $\\xi_{ij} = \\langle X_i - \\mu, \\phi_j\\rangle$?" },
    "Mean $0$, variance $\\lambda_j$, and uncorrelated across $j$",
    [
      ["Mean $0$, variance $1$, uncorrelated", "fpca-standardised", "Scores have variance equal to their eigenvalue unless explicitly standardised."],
      ["Independent and normally distributed", "fpca-independent-normal", "They are uncorrelated; independence and normality hold only for Gaussian processes."],
      ["Positively correlated across $j$", "fpca-correlated", "Orthogonality of the eigenfunctions makes the scores uncorrelated."],
    ],
  ),
  num(
    { concept: FP, slug: "apply-variance-explained", cognitive: "apply", level: 2, seconds: 45,
      stem: "FPCA eigenvalues are $40, 12, 5, 2, 1$ and the rest are $0$. What fraction of the total variance do the first two components explain? Give $3$ decimal places." },
    0.867,
  ),
  num(
    { concept: FP, slug: "apply-reconstruction", cognitive: "apply", level: 4, seconds: 60,
      stem: "A centred curve is $X - \\mu = 2\\phi_1 - \\phi_2 + 0.5\\phi_3$ with orthonormal $\\phi_j$. What is the squared $L^2$ error of its reconstruction from the first two components?" },
    0.25,
  ),
  short(
    { concept: FP, slug: "explain-diagonal", cognitive: "explain", level: 7.5, seconds: 120,
      stem: "When estimating the covariance surface from noisy, sparse measurements $Y_{ij} = X_i(t_{ij}) + \\varepsilon_{ij}$, methods such as PACE exclude pairs with $s = t$. Why?" },
    [
      ["noise", "The measurement error adds $\\sigma^2$ to $\\operatorname{Var}(Y(t))$ on the diagonal but contributes nothing to $\\operatorname{Cov}(Y(s), Y(t))$ for $s \\ne t$.", 4, true],
      ["estimate", "Smoothing only off-diagonal pairs estimates the covariance of the smooth process; the gap between the raw diagonal and the smoothed surface estimates $\\sigma^2$.", 3, true],
    ],
  ),
  mcq(
    { concept: FP, slug: "explain-sign", cognitive: "explain", level: 3, seconds: 40,
      stem: "Two software packages return FPC $\\phi_1$ curves that are mirror images, $\\phi_1$ and $-\\phi_1$. What does this mean?" },
    "Nothing substantive — eigenfunctions are only defined up to sign, and the scores flip sign with them",
    [
      ["One package has a bug", "fpca-sign-bug", "Both are valid; $-\\phi_1$ is an eigenfunction with the same eigenvalue."],
      ["The data have two opposite modes of variation", "fpca-sign-two-modes", "A sign flip is the same mode described from the other end."],
      ["The eigenvalue is negative in one package", "fpca-sign-eigenvalue", "The eigenvalue is unchanged by flipping the eigenfunction."],
    ],
  ),
  short(
    { concept: FP, slug: "transfer-sparse-growth", cognitive: "transfer", level: 8, seconds: 120,
      stem: "Children's heights are measured at $2$ to $4$ irregular ages each. Why can't you compute FPC scores by numerically integrating each child's curve against $\\phi_j$, and what does PACE do instead?" },
    [
      ["problem", "With a few irregular points per child, the integral $\\int (X_i - \\mu)\\phi_j$ can't be approximated well, and measurement error biases it.", 3, true],
      ["pace", "PACE pools all children to estimate $\\mu$ and $C(s, t)$, then predicts each child's scores by the conditional expectation $\\mathbb{E}[\\xi_{ij} \\mid Y_i]$ (a BLUP under a Gaussian assumption), borrowing strength across subjects.", 4, true],
    ],
  ),
  num(
    { concept: FP, slug: "transfer-grid-eigenvalue", cognitive: "transfer", level: 5, seconds: 50,
      stem: "Curves on $[0, 1]$ are sampled on a grid with spacing $h = 0.01$. The top eigenvalue of the $101 \\times 101$ sample covariance matrix is $250$. What is the corresponding eigenvalue of the covariance operator?" },
    2.5,
  ),
];

const MF = "multivariate-fpca";
const mfpca: Item[] = [
  mcq(
    { concept: MF, slug: "recall-goal", cognitive: "recall", level: 1.5, seconds: 35,
      stem: "What does multivariate FPCA estimate that separate univariate FPCAs of each variable do not?" },
    "Joint modes of variation that capture how the different functional variables co-vary across subjects",
    [
      ["Smoother eigenfunctions for each variable", "mfpca-smoother", "Smoothness is a separate choice; MFPCA's point is the cross-variable covariance."],
      ["The mean curve of each variable", "mfpca-mean", "Means are estimated identically either way."],
      ["More components per variable", "mfpca-more-components", "The number of components is a tuning choice in both."],
    ],
  ),
  mcq(
    { concept: MF, slug: "recall-happ-greven", cognitive: "recall", level: 2.5, seconds: 40,
      stem: "In the Happ–Greven algorithm for MFPCA, what is done after univariate FPCA of each variable?" },
    "An ordinary PCA of the stacked vector of all univariate scores",
    [
      ["The univariate eigenfunctions are averaged", "hg-average", "Averaging would discard the cross-covariances MFPCA exists to find."],
      ["Each variable's curves are concatenated and smoothed", "hg-concatenate", "Concatenation fails when the variables live on different domains."],
      ["A separate regression of each score on the others", "hg-regression", "The joint structure comes from an eigendecomposition, not regressions."],
    ],
  ),
  num(
    { concept: MF, slug: "apply-dimension", cognitive: "apply", level: 2, seconds: 35,
      stem: "Three functional variables keep $3$, $2$ and $4$ univariate components. What is the dimension of the score covariance matrix eigendecomposed in the Happ–Greven algorithm?" },
    9,
    0.001,
  ),
  num(
    { concept: MF, slug: "apply-weight", cognitive: "apply", level: 2, seconds: 40,
      stem: "Weights $w_k = 1/\\int \\operatorname{Var}(X^{(k)}(t))\\,dt$ are used. A variable has integrated variance $25$. What is its weight?" },
    0.04,
  ),
  short(
    { concept: MF, slug: "explain-weights", cognitive: "explain", level: 5.5, seconds: 100,
      stem: "Why does MFPCA usually reweight the variables before combining them, and what goes wrong otherwise?" },
    [
      ["scale", "Variables may be in different units or have very different total variance; without weights the joint inner product is dominated by the largest-variance variable.", 4, true],
      ["result", "The leading joint components then mostly reproduce that variable's univariate FPCA, hiding joint structure; weighting (e.g. to unit integrated variance) balances them.", 3, true],
    ],
  ),
  mcq(
    { concept: MF, slug: "explain-cross-covariance", cognitive: "explain", level: 5, seconds: 45,
      stem: "In the stacked score covariance matrix, which blocks carry the information that makes MFPCA different from separate univariate analyses?" },
    "The off-diagonal blocks — covariances between scores of different variables",
    [
      ["The diagonal blocks", "mfpca-diagonal", "Diagonal blocks are the univariate eigenvalues, already known from separate FPCAs."],
      ["The trace of the matrix", "mfpca-trace", "The trace is the total variance, the same with or without cross-covariances."],
      ["None — the matrix is diagonal by construction", "mfpca-diagonal-matrix", "Scores of different variables are generally correlated."],
    ],
  ),
  mcq(
    { concept: MF, slug: "transfer-different-domains", cognitive: "transfer", level: 5, seconds: 50,
      stem: "Each patient has a brain image (a function on a $2$-dimensional domain) and a blood-marker trajectory (a function of time). Can MFPCA analyse them jointly?" },
    "Yes — each variable is reduced to scores by its own basis expansion, and the joint PCA runs on those scores regardless of domain",
    [
      ["No — all variables must be curves on the same interval", "mfpca-same-domain", "Working through univariate scores is exactly what allows different domains."],
      ["Only after resampling the image onto a time grid", "mfpca-resample", "No resampling across domains is needed."],
      ["Only if both have the same number of components", "mfpca-same-k", "Each variable can keep a different number of components."],
    ],
  ),
  short(
    { concept: MF, slug: "transfer-interpret", cognitive: "transfer", level: 6, seconds: 100,
      stem: "In a gait study, the first multivariate eigenvector places weights $(0.7, 0, -0.7, 0)$ on (hip FPC$1$, hip FPC$2$, knee FPC$1$, knee FPC$2$). Interpret the leading joint mode." },
    [
      ["opposite", "The mode combines hip FPC$1$ and knee FPC$1$ with opposite signs: subjects high on the hip pattern tend to be low on the knee pattern.", 4, true],
      ["meaning", "It is a coordinated, compensating hip–knee pattern that separate univariate analyses would report as two unrelated components.", 3, true],
    ],
  ),
];

const FR = "functional-regression";
const functionalRegression: Item[] = [
  mcq(
    { concept: FR, slug: "recall-scalar-on-function", cognitive: "recall", level: 1, seconds: 35,
      stem: "Which is the scalar-on-function linear model?" },
    "$Y_i = \\alpha + \\int X_i(t)\\beta(t)\\,dt + \\varepsilon_i$",
    [
      ["$Y_i(t) = \\beta_0(t) + z_i\\beta_1(t) + \\varepsilon_i(t)$", "fr-function-on-scalar", "That has a functional response and scalar predictor."],
      ["$Y_i = \\alpha + \\beta X_i(t_0) + \\varepsilon_i$", "fr-single-point", "Using one time point ignores the rest of the curve."],
      ["$Y_i(s) = \\int X_i(t)\\beta(s, t)\\,dt + \\varepsilon_i(s)$", "fr-function-on-function", "That is function-on-function regression."],
    ],
  ),
  mcq(
    { concept: FR, slug: "recall-ill-posed", cognitive: "recall", level: 4, seconds: 40,
      stem: "Why is estimating $\\beta(t)$ in scalar-on-function regression ill-posed without regularisation?" },
    "Solving $\\mathcal{C}\\beta = \\operatorname{Cov}(X, Y)$ divides by eigenvalues of the covariance operator that tend to $0$, amplifying noise",
    [
      ["Because $Y$ is scalar", "ill-posed-scalar", "The problem comes from the functional predictor, not the response."],
      ["Because curves can't be integrated numerically", "ill-posed-integration", "Numerical integration is routine; the issue is inverting $\\mathcal{C}$."],
      ["Because there are too few time points", "ill-posed-grid", "Finer grids make the problem worse, not better."],
    ],
  ),
  num(
    { concept: FR, slug: "apply-coefficient", cognitive: "apply", level: 2.5, seconds: 50,
      stem: "In FPC regression, $\\hat{b}_j = \\widehat{\\operatorname{Cov}}(\\xi_j, Y)/\\hat{\\lambda}_j$. If $\\widehat{\\operatorname{Cov}}(\\xi_2, Y) = 0.6$ and $\\hat{\\lambda}_2 = 0.2$, what is $\\hat{b}_2$?" },
    3,
  ),
  num(
    { concept: FR, slug: "apply-prediction", cognitive: "apply", level: 4, seconds: 70,
      stem: "A fitted model has $\\hat{\\alpha} = 10$ and $\\hat{\\beta}(t) = 0.5\\phi_1(t) + 1.5\\phi_2(t)$ with orthonormal $\\phi_j$. A new centred curve has scores $\\xi_1 = 2$, $\\xi_2 = -1$ and none on later components. What is the predicted $Y$?" },
    9.5,
  ),
  short(
    { concept: FR, slug: "explain-fpc-regression", cognitive: "explain", level: 6.5, seconds: 100,
      stem: "Explain how expanding $\\beta(t)$ in the first $K$ functional principal components turns scalar-on-function regression into an ordinary multiple regression." },
    [
      ["expansion", "With $\\beta = \\sum_{j \\le K} b_j\\phi_j$ and $X_i - \\mu = \\sum_j \\xi_{ij}\\phi_j$, orthonormality gives $\\int (X_i - \\mu)\\beta = \\sum_{j \\le K} \\xi_{ij}b_j$.", 4, true],
      ["regression", "So $Y$ is regressed on the $K$ scores by least squares; since the scores are uncorrelated, $\\hat{b}_j = \\widehat{\\operatorname{Cov}}(\\xi_j, Y)/\\hat{\\lambda}_j$.", 3, true],
      ["tradeoff", "$K$ trades bias (too few components) against variance (dividing by small $\\lambda_j$).", 1],
    ],
  ),
  mcq(
    { concept: FR, slug: "explain-stability", cognitive: "explain", level: 7, seconds: 50,
      stem: "Two regularisation methods give similar predictions of $Y$ but visibly different estimated $\\beta(t)$ curves. Why?" },
    "Directions with tiny eigenvalues barely change $\\int X\\beta$ but can change $\\beta$ a lot, so the data pin down predictions better than the coefficient function",
    [
      ["One of the methods must be wrong", "fr-one-wrong", "Both can be reasonable; $\\beta$ is only weakly identified in low-variance directions."],
      ["Predictions and coefficients are always equally stable", "fr-equally-stable", "Predictions depend on $\\beta$ only through its projection on well-estimated directions."],
      ["Because the curves were not centred", "fr-centering", "Centring affects the intercept, not the shape instability of $\\beta$."],
    ],
  ),
  mcq(
    { concept: FR, slug: "transfer-model-type", cognitive: "transfer", level: 3, seconds: 45,
      stem: "You want to model each weather station's annual temperature curve as a function of its latitude and altitude. Which model type fits?" },
    "Function-on-scalar regression",
    [
      ["Scalar-on-function regression", "fr-type-scalar-on-function", "Here the response is the curve and the predictors are scalars."],
      ["Function-on-function regression", "fr-type-fof", "The predictors are scalars, not curves."],
      ["Functional PCA alone", "fr-type-fpca", "FPCA describes variation but doesn't relate it to predictors."],
    ],
  ),
  short(
    { concept: FR, slug: "transfer-tuning", cognitive: "transfer", level: 6.5, seconds: 100,
      stem: "You predict a patient's outcome from a $24$-hour heart-rate curve using FPC regression. How should you choose the number of components $K$, and what happens if $K$ is too large?" },
    [
      ["cv", "Choose $K$ by cross-validated prediction error (or an information criterion), not by variance explained alone.", 3, true],
      ["too-large", "Too large a $K$ includes components with tiny $\\lambda_j$, whose coefficients are estimated by dividing by near-zero numbers — high variance, a wiggly $\\hat{\\beta}$ and overfitting.", 4, true],
    ],
  ),
];

export const functionalDataMethodsItems: Item[] = [
  ...hilbertSchmidt,
  ...fpca,
  ...mfpca,
  ...functionalRegression,
];
