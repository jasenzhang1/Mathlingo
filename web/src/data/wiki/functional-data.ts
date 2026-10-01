import type { WikiArticle } from "./types";

/**
 * Functional Data Analysis chapter: function spaces, smoothing and
 * registration, the operator theory behind covariance, and the projection and
 * score machinery of FPCA. The chapter's other articles (`hilbert-space`,
 * `functional-data-analysis`, covariance operators, FPCA, MFPCA, functional
 * regression) live in `./core`, and Karhunen–Loève in `./stochastic`.
 */

const rs = "Ramsay & Silverman, Functional Data Analysis (2nd ed.)";
const he = "Hsing & Eubank, Theoretical Foundations of Functional Data Analysis";
const kr = "Kokoszka & Reimherr, Introduction to Functional Data Analysis";

export const l2SpaceWiki: WikiArticle = {
  conceptId: "l2-space",
  summary:
    "$L^2(\\mathcal{T})$ is the Hilbert space most functional data live in: all functions on an interval $\\mathcal{T}$ whose " +
    "square integrates to something finite. Its inner product replaces the dot product's sum with an integral, and " +
    "everything geometric — lengths, angles, orthogonality, projection — carries over.",
  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "L^2(\\mathcal{T}) = \\Big\\{ f : \\int_{\\mathcal{T}} f(t)^2\\,dt < \\infty \\Big\\}, \\qquad \\langle f, g \\rangle = \\int_{\\mathcal{T}} f(t)g(t)\\,dt, \\qquad \\|f\\| = \\sqrt{\\langle f, f \\rangle}",
        },
        {
          kind: "definitions",
          items: [
            { term: "Cauchy–Schwarz", description: "$|\\langle f, g \\rangle| \\le \\|f\\|\\,\\|g\\|$, so the angle $\\cos\\theta = \\langle f, g\\rangle / (\\|f\\|\\|g\\|)$ is well defined." },
            { term: "Orthogonality", description: "$f \\perp g$ when $\\int fg = 0$ — e.g. $\\sin(2\\pi t)$ and $\\cos(2\\pi t)$ on $[0, 1]$." },
            { term: "Equivalence classes", description: "Functions that differ only on a set of measure zero have distance $0$, so they are the same element. Point evaluation $f(t_0)$ is therefore not defined on $L^2$ — one reason smoothing comes first." },
            { term: "Completeness", description: "Cauchy sequences in the $L^2$ norm converge to an element of $L^2$ (Riesz–Fischer), which makes it a Hilbert space." },
          ],
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Geometry of $1$ and $t$ on $[0, 1]$",
          problem: "Compute $\\langle 1, t \\rangle$, $\\|t\\|$, the angle between $1$ and $t$, and the part of $t$ orthogonal to $1$.",
          steps: [
            "$\\langle 1, t\\rangle = \\int_0^1 t\\,dt = 1/2$; $\\|t\\|^2 = \\int_0^1 t^2\\,dt = 1/3$.",
            "$\\cos\\theta = (1/2)/(\\sqrt{1/3} \\cdot 1) = \\sqrt{3}/2$, so $\\theta = 30^\\circ$.",
            "Remove the projection onto $1$: $t - \\langle t, 1\\rangle 1 = t - 1/2$, with $\\|t - 1/2\\|^2 = 1/12$.",
          ],
          answer: "$\\langle 1, t\\rangle = 1/2$, $\\|t\\| = 1/\\sqrt{3}$, angle $30^\\circ$, orthogonal part $t - 1/2$.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Discretised, it's a weighted dot product",
          text: "On a grid with spacing $\\Delta$, $\\langle f, g\\rangle \\approx \\Delta\\sum_j f(t_j)g(t_j)$. Forgetting the $\\Delta$ is the classic bug that makes “unit-norm” eigenfunctions depend on the grid size.",
        },
      ],
    },
  ],
  references: [
    { source: he, locator: "§2.3–2.4" },
    { source: kr, locator: "Ch. 11" },
  ],
};

export const orthonormalFunctionBasesWiki: WikiArticle = {
  conceptId: "orthonormal-function-bases",
  summary:
    "An orthonormal basis $(e_k)$ of $L^2$ lets any function be written as $f = \\sum_k \\langle f, e_k\\rangle e_k$, with " +
    "coefficients read off by inner products. Keeping the first $K$ terms is the orthogonal projection onto their span — " +
    "the best $L^2$ approximation available from those functions.",
  sections: [
    {
      heading: "Expansions and Parseval",
      blocks: [
        {
          kind: "formula",
          latex: "f = \\sum_{k} c_k e_k,\\quad c_k = \\langle f, e_k \\rangle, \\qquad \\|f\\|^2 = \\sum_k c_k^2 \\;\\;(\\text{Parseval}), \\qquad \\Big\\|f - \\sum_{k \\le K} c_k e_k\\Big\\|^2 = \\sum_{k > K} c_k^2",
        },
        {
          kind: "table",
          headers: ["Basis", "Domain", "Functions", "Good for"],
          rows: [
            ["Fourier", "$[0, 1]$", "$1, \\sqrt{2}\\sin(2\\pi k t), \\sqrt{2}\\cos(2\\pi k t)$", "Periodic data (annual cycles)"],
            ["Legendre", "$[-1, 1]$", "$\\sqrt{1/2},\\; \\sqrt{3/2}\\,t,\\; \\sqrt{5/8}(3t^2 - 1), \\dots$", "Smooth, non-periodic curves"],
            ["Eigenfunctions of $\\mathcal{C}$", "any", "$\\phi_1, \\phi_2, \\dots$", "The data's own modes (FPCA)"],
          ],
        },
        {
          kind: "prose",
          text:
            "Any linearly independent set can be made orthonormal by Gram–Schmidt with the $L^2$ inner product — Legendre " +
            "polynomials are exactly Gram–Schmidt applied to $1, t, t^2, \\dots$ on $[-1, 1]$.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Fourier coefficients of $f(t) = t$ on $[0, 1]$",
          problem: "Find the coefficients of $f(t) = t$ in the Fourier basis and check Parseval.",
          steps: [
            "Constant: $c_0 = \\int_0^1 t\\,dt = 1/2$.",
            "Cosines: $\\int_0^1 t\\sqrt{2}\\cos(2\\pi k t)\\,dt = 0$.",
            "Sines: $\\int_0^1 t\\sqrt{2}\\sin(2\\pi k t)\\,dt = -\\sqrt{2}/(2\\pi k)$.",
            "Parseval: $\\tfrac{1}{4} + \\sum_k \\tfrac{2}{4\\pi^2 k^2} = \\tfrac{1}{4} + \\tfrac{1}{2\\pi^2}\\cdot\\tfrac{\\pi^2}{6} = \\tfrac{1}{3} = \\|t\\|^2$. ✓",
          ],
          answer: "$c_0 = 1/2$, sine coefficients $-\\sqrt{2}/(2\\pi k)$, cosine coefficients $0$.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Periodic bases and non-periodic data",
          text: "$f(t) = t$ has $f(0) \\ne f(1)$, so its Fourier coefficients decay only like $1/k$ and the partial sums overshoot at the ends (Gibbs phenomenon). Use Fourier bases for periodic data; splines or polynomials otherwise.",
        },
      ],
    },
  ],
  references: [
    { source: he, locator: "§2.4" },
    { source: rs, locator: "§3.3" },
  ],
};

export const basisFunctionExpansionWiki: WikiArticle = {
  conceptId: "basis-function-expansion",
  summary:
    "Functional data arrive as discrete, noisy points $y_{ij} = x_i(t_{ij}) + \\varepsilon_{ij}$. The first step of most " +
    "analyses is to represent each curve with a basis, $x_i(t) = \\sum_{k=1}^K c_{ik}\\phi_k(t)$, fitting the coefficients " +
    "by least squares. Everything afterwards works with the $K$ coefficients rather than the raw points.",
  sections: [
    {
      heading: "Least-squares fit",
      blocks: [
        {
          kind: "formula",
          latex: "\\hat{c} = (\\Phi^\\top\\Phi)^{-1}\\Phi^\\top y, \\qquad \\Phi_{jk} = \\phi_k(t_j), \\qquad \\hat{x}(t) = \\phi(t)^\\top\\hat{c}",
          caption: "ordinary regression with the basis functions as covariates",
        },
        {
          kind: "definitions",
          items: [
            { term: "Fourier basis", description: "$K = 2M + 1$ functions for $M$ harmonics; periodic, orthonormal, global — each function affects the whole curve." },
            { term: "B-spline basis", description: "Piecewise polynomials of order $m$ (degree $m - 1$) joined smoothly at knots. $K = $ number of interior knots $+ m$. Local support: at most $m$ basis functions are nonzero at any $t$, so $\\Phi^\\top\\Phi$ is banded." },
            { term: "Choosing $K$", description: "Too small: bias (features smoothed away). Too large: the fit chases noise. Either pick $K$ by cross-validation or take $K$ large and control smoothness with a roughness penalty." },
          ],
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Sizing a spline basis",
          problem: "You fit cubic B-splines (order $4$) with $10$ equally spaced interior knots to growth curves measured at $31$ ages. How many coefficients per curve, and how many residual degrees of freedom?",
          steps: [
            "$K = 10 + 4 = 14$ basis functions.",
            "Residual df $= 31 - 14 = 17$.",
          ],
          answer: "$14$ coefficients per curve; $17$ residual df.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Linear operations act on coefficients",
          text: "With a common basis, the mean curve is $\\phi(t)^\\top\\bar{c}$, derivatives are $\\phi'(t)^\\top c$, and inner products are $c_1^\\top W c_2$ with $W = \\int\\phi\\phi^\\top$ ($W = I$ for an orthonormal basis).",
        },
      ],
    },
  ],
  references: [
    { source: rs, locator: "Ch. 3–4" },
  ],
};

export const roughnessPenaltyWiki: WikiArticle = {
  conceptId: "roughness-penalty-smoothing",
  summary:
    "Instead of choosing the number of basis functions, use a rich basis and penalise curvature. The penalised fit " +
    "balances closeness to the data against $\\int (x'')^2$, with a single smoothing parameter $\\lambda$ controlling the " +
    "trade-off.",
  sections: [
    {
      heading: "Penalised least squares",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathrm{PENSSE}_\\lambda(x) = \\sum_j \\big(y_j - x(t_j)\\big)^2 + \\lambda\\int \\big(D^2x(t)\\big)^2 dt \\;\\;\\Longrightarrow\\;\\; \\hat{c} = (\\Phi^\\top\\Phi + \\lambda R)^{-1}\\Phi^\\top y",
          caption: "$R_{kl} = \\int D^2\\phi_k\\, D^2\\phi_l$ is the penalty matrix",
        },
        {
          kind: "list",
          items: [
            "Smoother matrix $S_\\lambda = \\Phi(\\Phi^\\top\\Phi + \\lambda R)^{-1}\\Phi^\\top$, so $\\hat{y} = S_\\lambda y$ — a linear smoother.",
            "Effective degrees of freedom $\\mathrm{df}(\\lambda) = \\operatorname{tr} S_\\lambda$, falling from $K$ (at $\\lambda = 0$) to $2$ (as $\\lambda \\to \\infty$).",
            "As $\\lambda \\to \\infty$ the fit tends to the least-squares straight line — the null space of $D^2$, which the penalty can't touch.",
            "Choose $\\lambda$ by generalised cross-validation: $\\mathrm{GCV}(\\lambda) = \\dfrac{n\\,\\mathrm{SSE}}{(n - \\mathrm{df}(\\lambda))^2}$.",
          ],
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Comparing two smoothing parameters",
          problem: "With $n = 100$ points: $\\lambda_1$ gives $\\mathrm{SSE} = 20$ with $\\mathrm{df} = 10$; $\\lambda_2$ gives $\\mathrm{SSE} = 17$ with $\\mathrm{df} = 25$. Which does GCV prefer?",
          steps: [
            "$\\mathrm{GCV}_1 = 100 \\cdot 20/90^2 \\approx 0.247$.",
            "$\\mathrm{GCV}_2 = 100 \\cdot 17/75^2 \\approx 0.302$.",
          ],
          answer: "$\\lambda_1$: the small drop in SSE doesn't justify $15$ extra degrees of freedom.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Penalise the derivative you'll use",
          text: "To estimate velocities or accelerations smoothly, penalise a higher derivative ($\\int (D^4 x)^2$ for smooth acceleration). The general version replaces $D^2$ with any linear differential operator $L$.",
        },
      ],
    },
  ],
  references: [
    { source: rs, locator: "Ch. 5" },
  ],
};

export const curveRegistrationWiki: WikiArticle = {
  conceptId: "curve-registration",
  summary:
    "Curves often differ in two ways at once: how large their features are (amplitude) and when they happen (phase). " +
    "The pubertal growth spurt peaks at different ages for different children. Registration estimates a warping of each " +
    "curve's time axis so features line up, separating the two kinds of variation before averaging or FPCA.",
  sections: [
    {
      heading: "Warping functions",
      blocks: [
        {
          kind: "formula",
          latex: "x_i^*(t) = x_i\\big(h_i(t)\\big), \\qquad h_i \\text{ strictly increasing},\\; h_i(0) = 0,\\; h_i(T) = T",
          caption: "the registered curve $x_i^*$ lives on common “system” time",
        },
        {
          kind: "definitions",
          items: [
            { term: "Landmark registration", description: "Identify features (peaks, zero crossings) at times $\\tau_{ij}$, set targets $\\tau_{0j}$ (e.g. their mean), and interpolate a monotone $h_i$ with $h_i(\\tau_{0j}) = \\tau_{ij}$." },
            { term: "Continuous registration", description: "Choose smooth monotone $h_i$ (e.g. $h' = e^{w}$) to minimise a misalignment criterion against a target curve, such as the smallest eigenvalue of the cross-product matrix of $x_0$ and $x_i \\circ h_i$." },
            { term: "Structural mean", description: "The mean of registered curves. The unregistered cross-sectional mean blurs peaks: averaging spurts at different times gives a lower, wider spurt that no individual has." },
          ],
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "One landmark, piecewise-linear warp",
          problem: "On $[0, 1]$ a curve peaks at $0.6$; the target peak time is $0.5$. Build a piecewise-linear $h$ and find where system time $0.25$ reads from.",
          steps: [
            "Need $h(0) = 0$, $h(0.5) = 0.6$, $h(1) = 1$.",
            "On $[0, 0.5]$: $h(t) = 1.2t$. On $[0.5, 1]$: $h(t) = 0.6 + 0.8(t - 0.5)$.",
            "$h(0.25) = 0.3$, so $x^*(0.25) = x(0.3)$.",
          ],
          answer: "$x^*(t) = x(h(t))$ with the peak moved to $0.5$; $x^*(0.25) = x(0.3)$.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Over-registration",
          text: "Flexible warps can explain genuine amplitude differences away as timing. Constrain warps (smoothness penalties, few landmarks) and keep the warping functions — they are data too, often analysed with their own FPCA.",
        },
      ],
    },
  ],
  references: [
    { source: rs, locator: "Ch. 7" },
    { source: "Marron, Ramsay, Sangalli & Srivastava (2015), Functional Data Analysis of Amplitude and Phase Variation, Statistical Science", locator: "§1–3" },
  ],
};

export const meanCovarianceFunctionsWiki: WikiArticle = {
  conceptId: "mean-covariance-functions",
  summary:
    "The first two moments of a random curve are functions: the mean $\\mu(t)$ and the covariance surface $C(s, t)$. " +
    "They play the roles of the mean vector and covariance matrix, and their sample versions are the first thing to plot " +
    "in any functional analysis.",
  sections: [
    {
      heading: "Definitions and estimates",
      blocks: [
        {
          kind: "formula",
          latex: "\\mu(t) = \\mathbb{E}X(t), \\quad C(s, t) = \\operatorname{Cov}\\big(X(s), X(t)\\big), \\quad \\rho(s, t) = \\frac{C(s, t)}{\\sqrt{C(s, s)\\,C(t, t)}}",
        },
        {
          kind: "formula",
          latex: "\\hat{\\mu}(t) = \\frac{1}{n}\\sum_i x_i(t), \\qquad \\hat{C}(s, t) = \\frac{1}{n - 1}\\sum_i \\big(x_i(s) - \\hat{\\mu}(s)\\big)\\big(x_i(t) - \\hat{\\mu}(t)\\big)",
        },
        {
          kind: "list",
          items: [
            "The diagonal $C(t, t)$ is the variance function; $\\sqrt{C(t, t)}$ shows where curves spread out.",
            "$C$ is symmetric and positive semi-definite: $\\int\\int C(s, t)f(s)f(t)\\,ds\\,dt \\ge 0$ for all $f$.",
            "Display $\\hat{C}$ or $\\hat{\\rho}$ as a contour or surface plot; the ridge along $s = t$ and how fast correlation decays away from it describe the curves' smoothness and memory.",
          ],
        },
      ],
    },
    {
      heading: "Bands for the mean",
      blocks: [
        {
          kind: "prose",
          text:
            "A pointwise $95\\%$ interval is $\\hat{\\mu}(t) \\pm 1.96\\sqrt{\\hat{C}(t, t)/n}$. It covers $\\mu(t)$ at each fixed $t$, " +
            "but not the whole curve at once. A simultaneous band — covering all of $\\mu$ with probability $0.95$ — must be " +
            "wider, with a critical value from the maximum of a Gaussian process (by bootstrap or simulation) instead of $1.96$.",
        },
        {
          kind: "example",
          title: "A pointwise interval",
          problem: "At $t = 0.3$, $25$ curves have $\\hat{\\mu}(0.3) = 10$ and $\\hat{C}(0.3, 0.3) = 4$. Find the pointwise $95\\%$ interval.",
          steps: ["Standard error $= \\sqrt{4/25} = 0.4$.", "$10 \\pm 1.96 \\times 0.4 = 10 \\pm 0.784$."],
          answer: "$(9.22, 10.78)$.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Noise sits on the diagonal",
          text: "With measurement error $\\sigma^2$, the raw covariance of observations is $C(s, t) + \\sigma^2\\mathbf{1}\\{s = t\\}$. Smoothing the covariance off the diagonal recovers $C$; the jump at the diagonal estimates $\\sigma^2$.",
        },
      ],
    },
  ],
  references: [
    { source: rs, locator: "Ch. 2" },
    { source: kr, locator: "Ch. 1–2" },
  ],
};

export const boundedLinearOperatorsWiki: WikiArticle = {
  conceptId: "bounded-linear-operators",
  summary:
    "A linear operator maps functions to functions and respects sums and scalar multiples — it is what a matrix becomes " +
    "when vectors become functions. Covariance, smoothing, differentiation and regression coefficients in FDA are all " +
    "linear operators, and whether they are bounded decides whether small input errors stay small.",
  sections: [
    {
      heading: "Definitions",
      blocks: [
        {
          kind: "formula",
          latex: "T(af + bg) = aTf + bTg, \\qquad \\|T\\| = \\sup_{f \\ne 0}\\frac{\\|Tf\\|}{\\|f\\|}, \\qquad \\langle Tf, g\\rangle = \\langle f, T^*g\\rangle",
          caption: "linearity, operator norm, adjoint",
        },
        {
          kind: "definitions",
          items: [
            { term: "Bounded", description: "$\\|T\\| < \\infty$. For linear operators, bounded $\\iff$ continuous: $\\|Tf - Tg\\| \\le \\|T\\|\\,\\|f - g\\|$." },
            { term: "Adjoint $T^*$", description: "The operator satisfying $\\langle Tf, g\\rangle = \\langle f, T^*g\\rangle$ — the transpose of a matrix. $\\|T^*\\| = \\|T\\|$." },
            { term: "Self-adjoint", description: "$T = T^*$ — the symmetric-matrix case. Covariance operators are self-adjoint and positive: $\\langle Tf, f\\rangle \\ge 0$." },
            { term: "Norm rules", description: "$\\|Tf\\| \\le \\|T\\|\\|f\\|$ and $\\|ST\\| \\le \\|S\\|\\,\\|T\\|$." },
          ],
        },
      ],
    },
    {
      heading: "Examples",
      blocks: [
        {
          kind: "table",
          headers: ["Operator on $L^2[0, 1]$", "Bounded?", "Norm"],
          rows: [
            ["Identity $f \\mapsto f$", "Yes", "$1$"],
            ["Multiplication $(Mf)(t) = m(t)f(t)$", "If $m$ is bounded", "$\\sup_t |m(t)|$"],
            ["Integration $(Vf)(s) = \\int_0^s f$", "Yes", "$2/\\pi$"],
            ["Differentiation $Df = f'$", "No", "$\\|D(\\sqrt{2}\\sin k\\pi t)\\| = k\\pi \\to \\infty$"],
          ],
        },
        {
          kind: "example",
          title: "A multiplication operator",
          problem: "Find $\\|M\\|$ for $(Mf)(t) = (1 + t)f(t)$ on $L^2[0, 1]$.",
          steps: [
            "$\\|Mf\\|^2 = \\int (1 + t)^2 f^2 \\le 4\\|f\\|^2$, so $\\|M\\| \\le 2$.",
            "Functions concentrated near $t = 1$ make the ratio approach $2$.",
          ],
          answer: "$\\|M\\| = \\sup_t (1 + t) = 2$ — a supremum that is approached, not attained.",
        },
      ],
    },
  ],
  references: [
    { source: he, locator: "§3.1–3.3" },
    { source: kr, locator: "Ch. 11" },
  ],
};

export const integralOperatorsWiki: WikiArticle = {
  conceptId: "integral-operators",
  summary:
    "An integral operator multiplies a function by a two-variable kernel and integrates one variable out. It is the " +
    "continuous version of multiplying a vector by a matrix: the kernel $k(s, t)$ is the matrix, with row index $s$ and " +
    "column index $t$.",
  sections: [
    {
      heading: "Rules",
      blocks: [
        {
          kind: "formula",
          latex: "(\\mathcal{K}f)(s) = \\int_{\\mathcal{T}} k(s, t)f(t)\\,dt \\quad\\longleftrightarrow\\quad (Kf)_i = \\sum_j K_{ij}f_j",
        },
        {
          kind: "definitions",
          items: [
            { term: "Adjoint", description: "Kernel $k^*(s, t) = k(t, s)$ — transpose. Symmetric kernel $\\iff$ self-adjoint operator." },
            { term: "Composition", description: "$\\mathcal{K}_1\\mathcal{K}_2$ has kernel $\\int k_1(s, u)k_2(u, t)\\,du$ — matrix multiplication." },
            { term: "Separable kernels", description: "$k(s, t) = \\sum_{r=1}^R a_r(s)b_r(t)$ gives an operator of rank $R$; its range is spanned by the $a_r$." },
            { term: "Volterra operator", description: "$(Vf)(s) = \\int_0^s f(t)\\,dt$ has kernel $\\mathbf{1}\\{t \\le s\\}$; its adjoint is $\\int_s^1 f(t)\\,dt$." },
            { term: "Discretisation", description: "On a grid, $(\\mathcal{K}f)(s_i) \\approx \\sum_j k(s_i, t_j)f(t_j)\\Delta$: a matrix times $\\Delta$. Eigenvectors of $K\\Delta$ divided by $\\sqrt{\\Delta}$ approximate unit-$L^2$-norm eigenfunctions." },
          ],
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "The kernel $k(s, t) = st$ on $[0, 1]$",
          problem: "Apply the operator to $f = 1$, then find its eigenvalue and Hilbert–Schmidt norm.",
          steps: [
            "$(\\mathcal{K}1)(s) = s\\int_0^1 t\\,dt = s/2$.",
            "Rank one, with range spanned by $t$: $(\\mathcal{K}t)(s) = s\\int_0^1 t^2\\,dt = s/3$, so $\\lambda = 1/3$ with eigenfunction $\\sqrt{3}\\,t$.",
            "$\\|\\mathcal{K}\\|_{HS}^2 = \\int\\int s^2t^2 = 1/9$, so $\\|\\mathcal{K}\\|_{HS} = 1/3 = \\lambda$, as it must for rank one.",
          ],
          answer: "$\\mathcal{K}1 = s/2$; single nonzero eigenvalue $1/3$.",
        },
      ],
    },
  ],
  references: [
    { source: he, locator: "§4.6" },
    { source: rs, locator: "§8.3" },
  ],
};

export const compactOperatorsWiki: WikiArticle = {
  conceptId: "compact-operators",
  summary:
    "Compact operators are the infinite-dimensional operators that behave most like matrices: they can be approximated " +
    "arbitrarily well by finite-rank operators, and the self-adjoint ones diagonalise in an orthonormal basis of " +
    "eigenfunctions. The price is that their eigenvalues must fall to zero — so they can never be inverted stably.",
  sections: [
    {
      heading: "Definition and spectral theorem",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Compact", description: "$T$ maps bounded sets to sets whose closure is compact; equivalently (in a Hilbert space) $\\|T - T_K\\| \\to 0$ for some finite-rank $T_K$." },
            { term: "Examples", description: "Finite-rank operators; Hilbert–Schmidt integral operators (square-integrable kernels); covariance operators. Not compact: the identity on an infinite-dimensional space." },
          ],
        },
        {
          kind: "formula",
          latex: "Tf = \\sum_{j} \\lambda_j \\langle f, e_j\\rangle e_j, \\qquad |\\lambda_1| \\ge |\\lambda_2| \\ge \\cdots \\to 0",
          caption: "spectral theorem for compact self-adjoint $T$: real eigenvalues, orthonormal eigenfunctions",
        },
        {
          kind: "prose",
          text:
            "Truncating the sum at $K$ gives the best rank-$K$ approximation, with error $\\|T - T_K\\| = |\\lambda_{K + 1}|$ — the " +
            "operator version of the Eckart–Young theorem.",
        },
      ],
    },
    {
      heading: "Ill-posed inverses",
      blocks: [
        {
          kind: "formula",
          latex: "Tf = g \\;\\Rightarrow\\; f = \\sum_j \\frac{\\langle g, e_j\\rangle}{\\lambda_j}e_j",
          caption: "noise in the $j$-th coefficient of $g$ is multiplied by $1/\\lambda_j \\to \\infty$",
        },
        {
          kind: "example",
          title: "Noise amplification",
          problem: "A compact operator has $\\lambda_j = 1/j^2$. By what factor is error in the $10$th coefficient of $g$ amplified when solving $Tf = g$? What does Tikhonov regularisation with $\\alpha = 0.01$ do instead?",
          steps: [
            "Naive inverse: factor $1/\\lambda_{10} = 100$.",
            "Tikhonov solves $(T^2 + \\alpha I)f = Tg$, replacing $1/\\lambda_j$ by $\\lambda_j/(\\lambda_j^2 + \\alpha)$.",
            "For $\\lambda_{10} = 0.01$: $0.01/(0.0001 + 0.01) \\approx 0.99$ instead of $100$.",
          ],
          answer: "$100\\times$ amplification naively; about $1\\times$ with Tikhonov — at the cost of bias in that component.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why FDA keeps meeting this",
          text: "Functional regression, functional CCA and Bayesian inverse problems all need to “divide by” a covariance or forward operator. Truncation (use only $j \\le K$) and Tikhonov/ridge penalties are the two standard cures.",
        },
      ],
    },
  ],
  references: [
    { source: he, locator: "§4.1–4.3" },
    { source: "Kress, Linear Integral Equations (3rd ed.)", locator: "Ch. 15" },
  ],
};

export const linearDifferentialOperatorsWiki: WikiArticle = {
  conceptId: "linear-differential-operators",
  summary:
    "A linear differential operator combines derivatives: $Lx = D^m x + \\beta_{m-1}D^{m-1}x + \\cdots + \\beta_0 x$. In FDA " +
    "it serves as a roughness penalty tailored to the data — functions with $Lx = 0$ go unpenalised — and as a model of " +
    "dynamics estimated from the curves themselves.",
  sections: [
    {
      heading: "Null spaces and penalties",
      blocks: [
        {
          kind: "table",
          headers: ["Operator $L$", "Null space ($Lx = 0$)", "Penalty $\\int (Lx)^2$ shrinks towards"],
          rows: [
            ["$D$", "constants", "flat curves"],
            ["$D^2$", "$\\{1, t\\}$", "straight lines"],
            ["$D + \\beta$", "$\\{e^{-\\beta t}\\}$", "exponential decay"],
            ["$D^2 + \\omega^2 I$", "$\\{\\sin\\omega t, \\cos\\omega t\\}$", "harmonic motion with period $2\\pi/\\omega$"],
          ],
          caption: "an order-$m$ operator has an $m$-dimensional null space",
        },
        {
          kind: "prose",
          text:
            "Replacing $\\int (D^2x)^2$ by $\\int (Lx)^2$ in penalised smoothing means a large $\\lambda$ pulls the fit towards the " +
            "null space of $L$ rather than towards a line. For annual temperature, $L = D^2 + (2\\pi)^2 I$ (time in years) " +
            "shrinks towards a pure sinusoid, and roughness means departure from it.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Unbounded",
          text: "$D$ is not a bounded operator on $L^2$: $\\sqrt{2}\\sin(k\\pi t)$ has norm $1$ but derivative norm $k\\pi$. Differentiation amplifies high-frequency noise, which is why curves are smoothed before derivatives are taken.",
        },
      ],
    },
    {
      heading: "Principal differential analysis",
      blocks: [
        {
          kind: "prose",
          text:
            "PDA estimates the coefficient functions $\\beta_k(t)$ so that $Lx_i \\approx 0$ for all curves, by minimising " +
            "$\\sum_i \\int (Lx_i)^2$ — regressing $D^m x_i$ on lower derivatives. The fitted $L$ is a data-driven differential " +
            "equation describing the dynamics, and its null space is a small basis capturing most of the curves.",
        },
        {
          kind: "example",
          title: "Recovering a frequency",
          problem: "Curves behave like $x(t) = a\\sin(3t) + b\\cos(3t)$. Which $L = D^2 + \\omega^2 I$ annihilates them?",
          steps: ["$D^2 x = -9x$, so $Lx = (\\omega^2 - 9)x$.", "This vanishes for every $a, b$ iff $\\omega^2 = 9$."],
          answer: "$L = D^2 + 9I$ ($\\omega = 3$).",
        },
      ],
    },
  ],
  references: [
    { source: rs, locator: "Ch. 13–15, 19" },
  ],
};

export const projectedVarianceWiki: WikiArticle = {
  conceptId: "projected-variance",
  summary:
    "A random curve has infinitely many directions it can vary in. Projecting it onto a function $f$ gives a scalar, " +
    "$\\langle X, f\\rangle$, whose variance is a quadratic form in the covariance operator. Projecting onto a subspace " +
    "captures part of the total variance — and the eigenfunctions of $\\mathcal{C}$ are the subspaces that capture the most.",
  sections: [
    {
      heading: "Variance of a projection",
      blocks: [
        {
          kind: "formula",
          latex: "\\operatorname{Var}\\langle X, f\\rangle = \\langle \\mathcal{C}f, f\\rangle = \\int\\!\\!\\int C(s, t)f(s)f(t)\\,ds\\,dt = \\sum_j \\lambda_j\\langle f, \\phi_j\\rangle^2",
        },
        {
          kind: "formula",
          latex: "\\mathbb{E}\\|X - \\mu\\|^2 = \\operatorname{tr}\\mathcal{C} = \\int C(t, t)\\,dt = \\sum_j \\lambda_j",
          caption: "total variance",
        },
      ],
    },
    {
      heading: "Projecting onto subspaces",
      blocks: [
        {
          kind: "prose",
          text:
            "For a $K$-dimensional subspace with orthonormal basis $e_1, \\dots, e_K$ and projection $P$, the captured variance is " +
            "$\\mathbb{E}\\|P(X - \\mu)\\|^2 = \\sum_{k \\le K}\\langle\\mathcal{C}e_k, e_k\\rangle$, and the rest, " +
            "$\\mathbb{E}\\|(I - P)(X - \\mu)\\|^2$, is the reconstruction error. Their sum is always $\\operatorname{tr}\\mathcal{C}$.",
        },
        {
          kind: "list",
          items: [
            "Maximum captured variance over all $K$-dimensional subspaces is $\\lambda_1 + \\cdots + \\lambda_K$, attained by $\\operatorname{span}(\\phi_1, \\dots, \\phi_K)$ (Ky Fan).",
            "So FPCA truncation minimises expected squared reconstruction error among all $K$-term expansions.",
            "The fraction of variance explained is $\\sum_{j \\le K}\\lambda_j / \\sum_j\\lambda_j$.",
          ],
        },
        {
          kind: "example",
          title: "Projected variances",
          problem: "Eigenvalues $6, 3, 1$ (the rest $0$). Find $\\operatorname{Var}\\langle X, f\\rangle$ for $f = (\\phi_1 + \\phi_2)/\\sqrt{2}$ and the variance left after projecting onto $\\operatorname{span}(\\phi_1, \\phi_2)$.",
          steps: [
            "$\\langle f, \\phi_1\\rangle^2 = \\langle f, \\phi_2\\rangle^2 = 1/2$, so $\\operatorname{Var} = 6/2 + 3/2 = 4.5$.",
            "Residual $= \\lambda_3 = 1$, i.e. $10\\%$ of the total $10$.",
          ],
          answer: "$4.5$; residual variance $1$ ($90\\%$ explained).",
        },
      ],
    },
  ],
  references: [
    { source: he, locator: "§7.2" },
    { source: kr, locator: "§11.4" },
  ],
};

export const fpcScoresWiki: WikiArticle = {
  conceptId: "fpc-scores",
  summary:
    "FPCA's eigenfunctions (the loadings, or weight functions) say how curves vary; the scores say how much each curve " +
    "varies that way. Scores turn each curve into a short vector that feeds regression, clustering and outlier detection.",
  sections: [
    {
      heading: "Scores and loadings",
      blocks: [
        {
          kind: "formula",
          latex: "\\xi_{ij} = \\int \\big(X_i(t) - \\mu(t)\\big)\\phi_j(t)\\,dt, \\qquad \\mathbb{E}\\xi_{ij} = 0,\\; \\operatorname{Var}\\xi_{ij} = \\lambda_j,\\; \\operatorname{Cov}(\\xi_{ij}, \\xi_{ik}) = 0",
        },
        {
          kind: "definitions",
          items: [
            { term: "Loading (weight) function", description: "$\\phi_j$: the curve integrated against $X_i - \\mu$ to get a score. Some authors scale it to $\\sqrt{\\lambda_j}\\phi_j$, whose size then shows the component's variance in the data's own units." },
            { term: "Reconstruction", description: "$\\hat{X}_i = \\hat{\\mu} + \\sum_{j \\le K}\\xi_{ij}\\phi_j$." },
            { term: "Reading a component", description: "Plot $\\mu \\pm 2\\sqrt{\\lambda_j}\\phi_j$: a positive score moves the curve towards the “+” curve. Signs are arbitrary — flipping $\\phi_j$ flips every score." },
            { term: "Score plots", description: "Scatter $\\xi_{i1}$ against $\\xi_{i2}$ to spot clusters and outlying curves." },
          ],
        },
      ],
    },
    {
      heading: "Sparse data: scores by conditional expectation",
      blocks: [
        {
          kind: "prose",
          text:
            "With a few noisy points per curve, the integral can't be computed. PACE assumes Gaussian scores and errors and " +
            "predicts each score by its conditional expectation given that subject's observations — a best linear unbiased " +
            "predictor that shrinks towards $0$ when the data are uninformative.",
        },
        {
          kind: "formula",
          latex: "\\hat{\\xi}_{ij} = \\lambda_j\\,\\phi_{ij}^\\top\\,\\Sigma_{Y_i}^{-1}(Y_i - \\mu_i), \\qquad \\Sigma_{Y_i} = \\big[C(t_{il}, t_{im})\\big]_{l,m} + \\sigma^2 I",
          caption: "$\\phi_{ij}$ is $\\phi_j$ evaluated at subject $i$'s observation times",
        },
        {
          kind: "example",
          title: "One component, one observation",
          problem: "$\\lambda_1 = 4$, $\\phi_1(t) = 0.5$ at the single observation time, $y - \\mu(t) = 2$, noise variance $\\sigma^2 = 1$. Predict the score.",
          steps: [
            "$\\Sigma_Y = \\lambda_1\\phi_1(t)^2 + \\sigma^2 = 4(0.25) + 1 = 2$.",
            "$\\hat{\\xi} = 4 \\times 0.5 \\times 2 / 2 = 2$.",
          ],
          answer: "$\\hat{\\xi}_1 = 2$ (versus $4$ if you naively divided $2$ by $\\phi_1 = 0.5$ and ignored the noise).",
        },
      ],
    },
  ],
  references: [
    { source: rs, locator: "§8.2–8.5" },
    { source: "Yao, Müller & Wang (2005), Functional Data Analysis for Sparse Longitudinal Data, JASA", locator: "§2–3" },
  ],
};

export const crossCovarianceOperatorsWiki: WikiArticle = {
  conceptId: "cross-covariance-operators",
  summary:
    "The covariance operator describes how one random curve varies with itself. The cross-covariance operator describes " +
    "how two random functions $X$ and $Y$ vary together. It is the functional version of $\\operatorname{Cov}(x, y)$ between " +
    "two random vectors, and it's the key ingredient in functional regression and canonical correlation.",
  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathcal{C}_{XY}f = \\mathbb{E}\\big[\\langle X - \\mu_X, f\\rangle(Y - \\mu_Y)\\big], \\qquad (\\mathcal{C}_{XY}f)(t) = \\int C_{XY}(s, t)f(s)\\,ds, \\qquad C_{XY}(s, t) = \\operatorname{Cov}\\big(X(s), Y(t)\\big)",
        },
        {
          kind: "list",
          items: [
            "$\\langle\\mathcal{C}_{XY}f, g\\rangle = \\operatorname{Cov}(\\langle X, f\\rangle, \\langle Y, g\\rangle)$ — every pair of projections' covariance is encoded.",
            "The adjoint is $\\mathcal{C}_{YX}$, with kernel $C_{XY}(t, s)$. It's not self-adjoint in general, and $X$ and $Y$ may live on different domains.",
            "It is Hilbert–Schmidt (hence compact) when $\\mathbb{E}\\|X\\|^2, \\mathbb{E}\\|Y\\|^2 < \\infty$; its singular value decomposition pairs directions of $X$ with directions of $Y$ (functional PLS).",
            "For scalar $Y$ it reduces to the cross-covariance function $c(s) = \\operatorname{Cov}(X(s), Y)$.",
          ],
        },
      ],
    },
    {
      heading: "Role in regression",
      blocks: [
        {
          kind: "prose",
          text:
            "In $Y = \\int\\beta(s, t)X(s)\\,ds + \\varepsilon$, the population normal equation is $\\mathcal{C}_{XY} = \\mathcal{B}\\mathcal{C}_{XX}$ " +
            "(with $\\mathcal{B}$ the operator with kernel $\\beta$). Solving it needs $\\mathcal{C}_{XX}^{-1}$, which is unbounded — so " +
            "the problem is ill-posed. Expanding in eigenfunctions, $\\beta(s, t) = \\sum_{j, k}\\frac{\\mathbb{E}[\\xi_j\\zeta_k]}{\\lambda_j}\\phi_j(s)\\psi_k(t)$, " +
            "and truncating or penalising stabilises it.",
        },
        {
          kind: "example",
          title: "Scalar-on-function coefficient",
          problem: "Scalar $Y$; eigenvalues $\\lambda_1 = 4$, $\\lambda_2 = 0.1$; cross-covariances $\\langle c, \\phi_1\\rangle = 2$, $\\langle c, \\phi_2\\rangle = 0.3$. Find the coefficients of $\\beta$ on $\\phi_1, \\phi_2$.",
          steps: [
            "$b_j = \\langle c, \\phi_j\\rangle/\\lambda_j$.",
            "$b_1 = 2/4 = 0.5$; $b_2 = 0.3/0.1 = 3$.",
          ],
          answer: "$\\beta \\approx 0.5\\phi_1 + 3\\phi_2$ — the poorly-determined second direction dominates, a warning sign of ill-posedness.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Functional CCA needs regularisation",
          text: "Without a penalty, the maximal canonical correlation between two infinite-dimensional random functions can be made arbitrarily close to $1$ by chasing high-frequency directions. Regularised CCA penalises roughness or truncates to leading FPCs.",
        },
      ],
    },
  ],
  references: [
    { source: he, locator: "§7.3, Ch. 10" },
    { source: rs, locator: "Ch. 11, 16" },
  ],
};

export const functionalDataWikis: WikiArticle[] = [
  l2SpaceWiki,
  orthonormalFunctionBasesWiki,
  basisFunctionExpansionWiki,
  roughnessPenaltyWiki,
  curveRegistrationWiki,
  meanCovarianceFunctionsWiki,
  boundedLinearOperatorsWiki,
  integralOperatorsWiki,
  compactOperatorsWiki,
  linearDifferentialOperatorsWiki,
  projectedVarianceWiki,
  fpcScoresWiki,
  crossCovarianceOperatorsWiki,
];
