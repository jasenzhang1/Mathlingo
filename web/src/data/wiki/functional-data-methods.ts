import type { WikiArticle } from "./types";

/**
 * The four methods articles of the Functional Data Analysis section, after
 * `hilbert-space` and `functional-data-analysis`: the operator that plays the
 * covariance matrix's role, the PCA it yields, its extension to several curves
 * per subject, and regression with functional predictors or responses — which
 * is where FPCA pays off, since the scores are what make the problem well-posed.
 */

export const hilbertSchmidtOperatorsWiki: WikiArticle = {
  conceptId: "hilbert-schmidt-operators",
  summary:
    "In multivariate statistics the covariance matrix acts on vectors. For a random curve $X(t)$ its role is played by " +
    "the covariance operator, an integral operator whose kernel is the covariance function $C(s, t)$. When the kernel is " +
    "square-integrable, the operator is Hilbert–Schmidt: compact, with a countable set of eigenvalues whose squares sum " +
    "to a finite number. That is exactly what lets it be diagonalised like a matrix.",
  sections: [
    {
      heading: "Integral operators",
      blocks: [
        {
          kind: "formula",
          latex: "(\\mathcal{K} f)(s) = \\int_{\\mathcal{T}} k(s, t)\\, f(t)\\,dt, \\qquad \\|\\mathcal{K}\\|_{\\mathrm{HS}}^2 = \\int\\!\\!\\int k(s, t)^2\\,ds\\,dt = \\sum_j \\lambda_j^2",
          caption: "the last equality holds for self-adjoint $\\mathcal{K}$ with eigenvalues $\\lambda_j$",
        },
        {
          kind: "definitions",
          items: [
            { term: "Hilbert–Schmidt operator", description: "An operator on $L^2(\\mathcal{T})$ with $\\sum_j \\|\\mathcal{K} e_j\\|^2 < \\infty$ for an orthonormal basis $(e_j)$. For an integral operator this is the same as $k \\in L^2(\\mathcal{T} \\times \\mathcal{T})$ — the continuous analogue of a matrix's Frobenius norm." },
            { term: "Compactness", description: "Every Hilbert–Schmidt operator is compact: it is a limit of finite-rank operators, and its nonzero eigenvalues can accumulate only at $0$." },
            { term: "Trace class", description: "A stronger condition, $\\sum_j |\\lambda_j| < \\infty$. Covariance operators of curves with $\\mathbb{E}\\|X\\|^2 < \\infty$ are trace class, with trace $= \\mathbb{E}\\|X - \\mu\\|^2$, the total variance." },
          ],
        },
      ],
    },
    {
      heading: "The covariance operator",
      blocks: [
        {
          kind: "formula",
          latex: "C(s, t) = \\operatorname{Cov}\\big(X(s), X(t)\\big), \\qquad (\\mathcal{C} f)(s) = \\int C(s, t) f(t)\\,dt, \\qquad \\langle \\mathcal{C} f, g \\rangle = \\operatorname{Cov}\\big(\\langle X, f\\rangle, \\langle X, g\\rangle\\big)",
        },
        {
          kind: "list",
          items: [
            "$\\mathcal{C}$ is self-adjoint ($C(s, t) = C(t, s)$) and positive semi-definite ($\\langle \\mathcal{C} f, f \\rangle = \\operatorname{Var}\\langle X, f \\rangle \\ge 0$).",
            "Spectral theorem for compact self-adjoint operators: $\\mathcal{C} f = \\sum_j \\lambda_j \\langle f, \\phi_j\\rangle \\phi_j$ with orthonormal eigenfunctions $\\phi_j$ and $\\lambda_1 \\ge \\lambda_2 \\ge \\cdots \\ge 0$.",
            "Mercer's theorem adds that for a continuous covariance, $C(s, t) = \\sum_j \\lambda_j \\phi_j(s)\\phi_j(t)$ uniformly.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "No inverse",
          text:
            "Because $\\lambda_j \\to 0$, a covariance operator on an infinite-dimensional space has no bounded inverse. " +
            "Anything that would use $\\Sigma^{-1}$ in the multivariate case — Mahalanobis distance, regression's " +
            "$(X^\\top X)^{-1}$ — becomes ill-posed and needs truncation or regularisation.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Brownian motion's covariance operator",
          problem: "For Brownian motion on $[0, 1]$, $C(s, t) = \\min(s, t)$. Its eigenvalues are $\\lambda_j = \\big((j - \\tfrac{1}{2})\\pi\\big)^{-2}$. Find the trace of the covariance operator and check it against $\\int_0^1 C(t, t)\\,dt$.",
          steps: [
            "$\\int_0^1 \\min(t, t)\\,dt = \\int_0^1 t\\,dt = \\tfrac{1}{2}$.",
            "$\\sum_{j \\ge 1} \\big((j - \\tfrac{1}{2})\\pi\\big)^{-2} = \\tfrac{4}{\\pi^2}\\sum_{j \\ge 1} (2j - 1)^{-2} = \\tfrac{4}{\\pi^2} \\cdot \\tfrac{\\pi^2}{8} = \\tfrac{1}{2}$.",
          ],
          answer: "Both equal $\\tfrac{1}{2}$: the trace is the expected squared norm $\\mathbb{E}\\int_0^1 W(t)^2\\,dt$.",
        },
      ],
    },
  ],
  references: [
    { source: "Hsing & Eubank, Theoretical Foundations of Functional Data Analysis", locator: "§4.4–4.6, §7.2" },
    { source: "Ramsay & Silverman, Functional Data Analysis (2nd ed.)", locator: "§8.2" },
  ],
};

export const functionalPcaWiki: WikiArticle = {
  conceptId: "functional-pca",
  summary:
    "Functional PCA finds the few directions — now functions — along which a sample of curves varies most. They are the " +
    "eigenfunctions of the covariance operator, and each curve is summarised by its scores on them. Truncating after a " +
    "handful of components turns an infinite-dimensional object into a short vector, which is what makes almost every " +
    "downstream functional method workable.",
  sections: [
    {
      heading: "The expansion",
      blocks: [
        {
          kind: "formula",
          latex: "X_i(t) = \\mu(t) + \\sum_{j=1}^{\\infty} \\xi_{ij}\\,\\phi_j(t), \\qquad \\xi_{ij} = \\int \\big(X_i(t) - \\mu(t)\\big)\\phi_j(t)\\,dt",
          caption: "the scores $\\xi_{ij}$ are uncorrelated with mean $0$ and variance $\\lambda_j$ — the sample version of the Karhunen–Loève expansion",
        },
        {
          kind: "list",
          items: [
            "$\\phi_1$ maximises $\\operatorname{Var}\\langle X, \\phi \\rangle$ over unit-norm functions; each later $\\phi_j$ does the same orthogonally to the earlier ones.",
            "Fraction of variance explained by the first $K$ components: $\\sum_{j \\le K} \\lambda_j / \\sum_j \\lambda_j$.",
            "Truncation at $K$ is optimal: no other $K$-dimensional basis gives a smaller expected squared reconstruction error.",
            "Eigenfunctions are determined only up to sign; plot $\\mu \\pm 2\\sqrt{\\lambda_j}\\,\\phi_j$ to read each mode.",
          ],
        },
      ],
    },
    {
      heading: "Estimation in practice",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Dense, regular grids", description: "Smooth each curve (or not), estimate $\\hat{\\mu}$ and $\\hat{C}$ on the grid, and eigendecompose the matrix $\\hat{C}$ times the grid spacing, so eigenvectors are normalised in $L^2$ rather than as vectors." },
            { term: "Basis expansion", description: "Represent curves in a B-spline or Fourier basis; FPCA becomes a generalised eigenproblem in the coefficients. A roughness penalty on $\\phi_j$ gives smooth FPCA." },
            { term: "Sparse, irregular data (PACE)", description: "When each subject has a few noisy points, pool all pairs to estimate $C(s, t)$ by bivariate smoothing (excluding the diagonal, which carries the noise variance), then predict scores by conditional expectation $\\mathbb{E}[\\xi_{ij} \\mid \\text{data}_i]$ rather than by numerical integration." },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why the diagonal is dropped",
          text:
            "Measurement noise adds $\\sigma^2$ to $\\operatorname{Var}(Y(t))$ but nothing to $\\operatorname{Cov}(Y(s), Y(t))$ for $s \\ne t$. " +
            "Smoothing only off-diagonal pairs estimates the covariance of the underlying smooth curve; the gap on the diagonal " +
            "estimates $\\sigma^2$.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Choosing the number of components",
          problem: "The estimated eigenvalues of a sample of daily temperature curves are $40, 12, 5, 2, 1$, and the remaining ones sum to $0$. How many components are needed to explain at least $90\\%$ of the variance?",
          steps: [
            "Total $= 60$.",
            "Cumulative: $40/60 = 66.7\\%$, $52/60 = 86.7\\%$, $57/60 = 95\\%$.",
          ],
          answer: "$K = 3$ components explain $95\\%$.",
        },
      ],
    },
  ],
  references: [
    { source: "Ramsay & Silverman, Functional Data Analysis (2nd ed.)", locator: "Ch. 8–9" },
    { source: "Yao, Müller & Wang, Functional data analysis for sparse longitudinal data (JASA, 2005)", locator: "§2" },
  ],
};

export const multivariateFpcaWiki: WikiArticle = {
  conceptId: "multivariate-fpca",
  summary:
    "Often each subject contributes several curves: gait angles at the hip and the knee, several biomarkers over time, " +
    "an image and a trajectory. Analysing each with its own FPCA misses how they vary together. Multivariate FPCA finds " +
    "joint modes of variation across all the variables at once, even when they live on different domains.",
  sections: [
    {
      heading: "The setting",
      blocks: [
        {
          kind: "formula",
          latex: "X_i = \\big(X_i^{(1)}, \\ldots, X_i^{(p)}\\big) \\in \\mathcal{H} = L^2(\\mathcal{T}_1) \\times \\cdots \\times L^2(\\mathcal{T}_p), \\qquad \\langle f, g \\rangle_{\\mathcal{H}} = \\sum_{k=1}^{p} w_k \\langle f^{(k)}, g^{(k)} \\rangle",
          caption: "each eigenfunction is a vector of functions $\\psi_m = (\\psi_m^{(1)}, \\ldots, \\psi_m^{(p)})$ with one score $\\rho_{im}$ per subject",
        },
        {
          kind: "prose",
          text:
            "The weights $w_k$ matter. Variables in different units or with very different total variance would otherwise let " +
            "one of them dominate the joint components. A common choice rescales each variable to unit integrated variance, " +
            "$w_k = 1/\\int \\operatorname{Var}(X^{(k)}(t))\\,dt$.",
        },
      ],
    },
    {
      heading: "The Happ–Greven algorithm",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Run a univariate FPCA (or any basis expansion) on each variable $k$, keeping $M_k$ components and scores $\\xi^{(k)}_{ij}$.",
            "Stack all scores into one vector per subject, of length $M_+ = \\sum_k M_k$, and form their $M_+ \\times M_+$ covariance matrix $Z$ (weighted by $w_k$).",
            "Eigendecompose $Z$: eigenvalues are the multivariate eigenvalues; eigenvectors $c_m$ combine the univariate eigenfunctions into multivariate ones, $\\psi_m^{(k)} = \\sum_j [c_m]^{(k)}_j \\phi^{(k)}_j$.",
            "Multivariate scores are $\\rho_{im} = \\sum_k w_k \\langle X^{(k)}_i - \\mu^{(k)}, \\psi_m^{(k)}\\rangle$.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why go through univariate scores",
          text:
            "The variables may be curves on $[0, 1]$, images on a square, or observed on different grids. Their scores are " +
            "just numbers, so step $2$ is an ordinary PCA regardless of how different the domains are. The cross-covariances " +
            "between different variables' scores are what the univariate analyses discard and MFPCA recovers.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Hip and knee angles",
          problem:
            "Univariate FPCA gives two components for hip angle and two for knee angle. The first multivariate eigenvector of the stacked score covariance puts weights $(0.7, 0, 0.7, 0)$ on (hip FPC1, hip FPC2, knee FPC1, knee FPC2). Interpret the first joint mode.",
          steps: [
            "The mode combines hip FPC1 and knee FPC1 with equal sign and weight.",
            "So subjects who are high on hip FPC1 tend to be high on knee FPC1: those two patterns move together.",
          ],
          answer: "The dominant joint mode is a coordinated hip–knee pattern that separate univariate analyses would report as two unrelated components.",
        },
      ],
    },
  ],
  references: [
    { source: "Happ & Greven, Multivariate functional principal component analysis for data observed on different (dimensional) domains (JASA, 2018)", locator: "§2–3" },
    { source: "Chiou, Chen & Yang, Multivariate functional principal component analysis: a normalization approach (Statistica Sinica, 2014)", locator: "§2" },
  ],
};

export const functionalRegressionWiki: WikiArticle = {
  conceptId: "functional-regression",
  summary:
    "Functional regression lets the predictor, the response, or both be curves. The workhorse is scalar-on-function " +
    "regression: a scalar outcome predicted by integrating a curve against a coefficient function $\\beta(t)$. With " +
    "infinitely many “coefficients” and finitely many subjects, $\\beta$ is not identifiable without structure — so every " +
    "method restricts or penalises it, most often by expanding it in the first few functional principal components.",
  sections: [
    {
      heading: "Three model types",
      blocks: [
        {
          kind: "table",
          headers: ["Model", "Form"],
          rows: [
            ["Scalar-on-function", "$Y_i = \\alpha + \\int X_i(t)\\beta(t)\\,dt + \\varepsilon_i$"],
            ["Function-on-scalar", "$Y_i(t) = \\beta_0(t) + \\sum_k z_{ik}\\beta_k(t) + \\varepsilon_i(t)$"],
            ["Function-on-function", "$Y_i(s) = \\alpha(s) + \\int X_i(t)\\beta(s, t)\\,dt + \\varepsilon_i(s)$"],
          ],
        },
        {
          kind: "prose",
          text:
            "In the scalar-on-function model, $\\beta(t)$ says how much the predictor's value at time $t$ contributes: where " +
            "$\\beta$ is large and positive, curves that are high there predict large $Y$. Function-on-scalar regression is " +
            "a pointwise linear model in $t$, usually fitted with smoothness penalties on each $\\beta_k(t)$.",
        },
      ],
    },
    {
      heading: "Ill-posedness and two fixes",
      blocks: [
        {
          kind: "prose",
          text:
            "The normal equations become $\\mathcal{C}\\beta = \\operatorname{Cov}(X, Y)$, with $\\mathcal{C}$ the covariance operator. " +
            "Its eigenvalues decay to $0$, so solving for $\\beta$ divides by numbers approaching $0$ and amplifies noise " +
            "without bound: the problem is ill-posed.",
        },
        {
          kind: "definitions",
          items: [
            { term: "FPC regression", description: "Write $\\beta(t) = \\sum_{j \\le K} b_j \\phi_j(t)$. Then $\\int X_i\\beta = \\sum_j \\xi_{ij} b_j$, an ordinary regression of $Y$ on the first $K$ scores, with $\\hat{b}_j = \\widehat{\\operatorname{Cov}}(\\xi_j, Y)/\\hat{\\lambda}_j$. $K$ controls the bias-variance trade-off and is chosen by cross-validation." },
            { term: "Penalised splines", description: "Expand $\\beta$ in a rich B-spline basis and minimise $\\sum_i (Y_i - \\alpha - \\int X_i\\beta)^2 + \\lambda \\int \\beta''(t)^2\\,dt$ — ridge regression with a roughness penalty, fitted as a mixed model or by GCV." },
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Predictions are stable; β(t) is not",
          text:
            "Different methods often give similar predictions but visibly different $\\hat{\\beta}(t)$ curves, because " +
            "directions with tiny eigenvalues barely affect $\\int X\\beta$ but can move $\\beta$ a lot. Interpret the shape of " +
            "$\\hat{\\beta}$ cautiously, and report pointwise bands only with the regularisation in mind.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "FPC regression by hand",
          problem:
            "A predictor curve has first two FPC variances $\\lambda_1 = 4$, $\\lambda_2 = 1$, and the covariances of its scores with $Y$ are $\\operatorname{Cov}(\\xi_1, Y) = 2$ and $\\operatorname{Cov}(\\xi_2, Y) = 1.5$. Using $K = 2$ components, give $\\beta(t)$ in terms of $\\phi_1, \\phi_2$.",
          steps: [
            "$b_1 = 2/4 = 0.5$.",
            "$b_2 = 1.5/1 = 1.5$.",
          ],
          answer: "$\\hat{\\beta}(t) = 0.5\\,\\phi_1(t) + 1.5\\,\\phi_2(t)$ — note the lower-variance component gets the larger coefficient, which is where noise amplification comes from.",
        },
      ],
    },
  ],
  references: [
    { source: "Ramsay & Silverman, Functional Data Analysis (2nd ed.)", locator: "Ch. 13–16" },
    { source: "Morris, Functional regression (Annual Review of Statistics and Its Application, 2015)", locator: "§2–4" },
  ],
};
