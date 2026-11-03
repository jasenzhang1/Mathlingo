import type { Item } from "../../../lib/assessment/types";
import { makeBuilders } from "../authoring";
import { EXPANSION } from "./source";

/**
 * Functional Data Analysis: the covariance operator of a vector of random
 * functions (cross-covariance kernels G_ij(s, t), operators Sigma_ij, and the
 * p x p block operator Sigma_X). 40 items.
 */
const { mcq, short, num } = makeBuilders(EXPANSION);

const BC = "block-covariance-operators";

const s = (slug: string, level: number, stem: string, a: string, b: string) =>
  short({ concept: BC, slug, cognitive: level >= 8.5 ? "transfer" : "explain", level, seconds: level >= 9 ? 300 : 180, stem },
    [["main", a, 5, true], ["detail", b, 4, true]]);
// Keys below one get half a unit in their last stated decimal; larger keys keep the 1% default.
const n = (slug: string, level: number, stem: string, key: number) => {
  const decimals = (key.toFixed(12).replace(/0+$/, "").split(".")[1] ?? "").length;
  const tol = Math.abs(key) >= 1 || key === 0 ? 0.01 : Math.min(0.01, 0.5 * 10 ** -decimals);
  return num({ concept: BC, slug, cognitive: "apply", level, seconds: level >= 7 ? 90 : level >= 4 ? 60 : 30, stem }, key, tol);
};
const m = (slug: string, level: number, stem: string, right: string, wrong: [string, string][]) =>
  mcq({ concept: BC, slug, cognitive: level <= 3 ? "recall" : "apply", level, seconds: 25, stem },
    right, wrong.map(([t, why], i) => [t, `${BC}-${slug}-${i}`, why] as [string, string, string]));

export const fdaBlockOperatorsItems: Item[] = [
  // --- level 1 -----------------------------------------------------------
  m("domain-codomain", 1, "The operator $\\Sigma_{X_iX_j}$ with kernel $G_{i,j}(s, t)$ maps:",
    "$\\mathcal{H}_{X_j} \\to \\mathcal{H}_{X_i}$: a function of $t$ in, a function of $s$ out",
    [["$\\mathcal{H}_{X_i} \\to \\mathcal{H}_{X_j}$", "That reverses the roles: $t$ is integrated out and $s$ survives, so the output lives in $\\mathcal{H}_{X_i}$."],
      ["$\\mathcal{H}_{X_i} \\to \\mathbb{R}$", "A scalar output would need both arguments integrated out."],
      ["$\\mathbb{R}^p \\to \\mathbb{R}^p$", "The operator acts on functions, not on finite vectors."]]),
  m("kernel-def", 1, "The cross-covariance kernel between $X_i$ and $X_j$ is:",
    "$G_{i,j}(s, t) = \\operatorname{Cov}\\{X_i(s), X_j(t)\\}$",
    [["$G_{i,j}(s, t) = \\mathbb{E}\\{X_i(s)\\}\\,\\mathbb{E}\\{X_j(t)\\}$", "That is a product of means; covariance subtracts it from $\\mathbb{E}[X_iX_j]$."],
      ["$G_{i,j}(s, t) = \\operatorname{Cov}\\{X_i(s), X_i(t)\\}$", "That is the within-neuron covariance $G_{i,i}$."],
      ["$G_{i,j}(s, t) = \\operatorname{Var}\\{X_i(s) + X_j(t)\\}$", "That variance also contains the two marginal variances."]]),
  m("action-def", 1, "The operator $\\Sigma_{X_iX_j}$ applied to $g$ is:",
    "$(\\Sigma_{X_iX_j}\\, g)(s) = \\int_0^T G_{i,j}(s, t)\\, g(t)\\, dt$",
    [["$(\\Sigma_{X_iX_j}\\, g)(s) = G_{i,j}(s, s)\\, g(s)$", "That is a multiplication operator along the diagonal, not an integral operator."],
      ["$(\\Sigma_{X_iX_j}\\, g)(s) = \\int_0^T G_{i,j}(s, t)\\, dt$", "The input function $g$ has disappeared."],
      ["$(\\Sigma_{X_iX_j}\\, g)(s) = \\int_0^T G_{i,j}(s, t)\\, g(s)\\, dt$", "The input must be evaluated at the integration variable $t$."]]),
  m("matrix-analogy", 1, "In the analogy $(S\\mathbf{g})_r = \\sum_{r'} S_{rr'}\\, g_{r'}$, the sum over $r'$ corresponds to:",
    "the integral over $t$ in $\\int G(s, t)\\,g(t)\\,dt$",
    [["the integral over $s$", "$s$ is the output index (the row), which is not summed."],
      ["evaluating $G$ at $s = t$", "No diagonal is taken; the whole kernel is integrated against $g$."],
      ["taking an expectation over $\\omega$", "The expectation is already inside the covariance; the integral is over time."]]),

  // --- level 2 -----------------------------------------------------------
  n("apply-st-const", 2, "On $[0, 1]$ let $G(s, t) = st$ and $g(t) = 1$. Find $(\\Sigma g)(s)$ at $s = 1$.", 0.5),
  n("apply-sum-kernel", 2, "On $[0, 1]$ let $G(s, t) = s + t$ and $g(t) = 1$. Find $(\\Sigma g)(s)$ at $s = 1$.", 1.5),
  n("product-inner", 2, "In the product space $\\mathcal{H}_1 \\times \\mathcal{H}_2$ with $L^2[0, 1]$ factors, take $\\mathbf{g} = (1, t)$ and $\\mathbf{h} = (2, 3t)$. Find $\\langle \\mathbf{g}, \\mathbf{h}\\rangle = \\sum_i \\int_0^1 g_i h_i\\,dt$.", 3),
  n("matrix-product", 2, "Let $S = \\begin{bmatrix}2 & 1\\\\ 1 & 3\\end{bmatrix}$ and $\\mathbf{g} = [1, 2]^\\top$. Find the second entry of $S\\mathbf{g}$.", 7),

  // --- level 3 -----------------------------------------------------------
  n("count-blocks", 3, "For $p = 4$ neurons, how many operator blocks $\\Sigma_{X_iX_j}$ appear in $\\Sigma_X$?", 16),
  n("count-distinct", 3, "For $p = 3$ neurons, how many blocks are needed to determine all of $\\Sigma_X$, given $\\Sigma_{X_jX_i} = \\Sigma_{X_iX_j}^*$?", 6),
  n("log-ratio", 3, "Estimates are $\\hat\\rho_i(s) = 2$, $\\hat\\rho_j(t) = 3$ and $\\hat\\rho_{i,j}(s, t) = 9$. Find $\\hat G_{i,j}(s, t) = \\log\\{\\hat\\rho_{i,j}/(\\hat\\rho_i\\hat\\rho_j)\\}$. Give $4$ decimal places.", 0.4055),
  m("zero-log-ratio", 3, "If $\\hat\\rho_{i,j}(s, t) = \\hat\\rho_i(s)\\,\\hat\\rho_j(t)$, then $\\hat G_{i,j}(s, t)$ equals:",
    "$0$: no co-fluctuation of $X_i(s)$ and $X_j(t)$",
    [["$1$", "The ratio is $1$, but the log of the ratio is $0$."],
      ["$-\\infty$", "That would need $\\hat\\rho_{i,j} = 0$ with positive marginals."],
      ["$\\log 2$", "Nothing in the setup produces a factor of $2$."]]),

  // --- level 4 -----------------------------------------------------------
  n("variance-const", 4, "On $[0, 1]$ let $G(s, t) = st$ and $g(t) = 1$. Find $\\langle \\Sigma g, g\\rangle = \\operatorname{Var}\\big(\\int_0^1 X(s)\\,ds\\big)$. Give $2$ decimal places.", 0.25),
  n("apply-st-t", 4, "On $[0, 1]$ let $G(s, t) = st$ and $g(t) = t$. Find $(\\Sigma g)(1)$. Give $4$ decimal places.", 0.3333),
  n("block-apply", 4, "On $[0, 1]$ the blocks are $G_{1,1} = G_{1,2} = G_{2,1} = st$ and $G_{2,2} = 2st$. For $\\mathbf{g} = (1, 1)$, find $(\\Sigma_X\\mathbf{g})_1(s)$ at $s = 1$.", 1),
  n("trace", 4, "With $G_{1,1}(s, t) = st$ and $G_{2,2}(s, t) = 2st$ on $[0, 1]$, find $\\operatorname{tr}\\Sigma_X = \\sum_i \\int G_{i,i}(t, t)\\,dt$.", 1),

  // --- level 5 -----------------------------------------------------------
  n("block-variance", 5, "Use the blocks $G_{1,1} = G_{1,2} = G_{2,1} = st$, $G_{2,2} = 2st$ on $[0, 1]$. For $\\mathbf{g} = (1, 1)$, find $\\langle \\Sigma_X\\mathbf{g}, \\mathbf{g}\\rangle = \\operatorname{Var}\\big(\\sum_i \\langle X_i, g_i\\rangle\\big)$. Give $2$ decimal places.", 1.25),
  m("adjoint-block", 5, "The adjoint of the block $\\Sigma_{X_iX_j}$ is:",
    "$\\Sigma_{X_jX_i}$, whose kernel $G_{j,i}(s, t) = G_{i,j}(t, s)$ is the transpose",
    [["$\\Sigma_{X_iX_j}$ itself, because covariance is symmetric", "Symmetry of $\\operatorname{Cov}$ swaps the two functions as well as the times; the block alone is not self-adjoint."],
      ["$\\Sigma_{X_iX_i}$", "The adjoint of a cross block stays a cross block."],
      ["$-\\Sigma_{X_jX_i}$", "Adjoints do not flip signs; the kernel is only transposed."]]),
  n("ratio-from-g", 5, "A fitted kernel has $\\hat G_{i,j}(s, t) = 0.7$. By what factor does the pair intensity $\\rho_{i,j}(s, t)$ exceed $\\rho_i(s)\\rho_j(t)$? Give $2$ decimal places.", 2.01),
  s("explain-analogy", 5, "Explain how $(\\Sigma_{X_iX_j}\\, g)(s) = \\int G_{i,j}(s, t)\\,g(t)\\,dt$ generalises the matrix-vector product $(S\\mathbf{g})_r = \\sum_{r'} S_{rr'}g_{r'}$.",
    "Rows become the time $s$, columns become the time $t$, the kernel $G(s, t)$ plays the role of the entries $S_{rr'}$, and the sum over the column index becomes an integral over $t$.",
    "Mentions that a fine grid with weights $\\Delta$ turns the integral back into an actual matrix-vector product, so the operator is the limit of matrices."),

  // --- level 6 -----------------------------------------------------------
  n("cross-var", 6, "Same blocks as before: $G_{1,1} = G_{1,2} = G_{2,1} = st$, $G_{2,2} = 2st$ on $[0, 1]$. For $\\mathbf{g} = (1, -1)$, find $\\operatorname{Var}\\big(\\langle X_1, 1\\rangle - \\langle X_2, 1\\rangle\\big)$. Give $2$ decimal places.", 0.25),
  n("grid-entry", 6, "Discretise $G(s, t) = st$ on $[0, 1]$ with $m = 2$ midpoints $s_1 = 0.25$, $s_2 = 0.75$ and $\\Delta = 0.5$. Find the matrix entry $S_{12} = G(s_1, t_2)\\Delta$. Give $5$ decimal places.", 0.09375),
  m("not-psd", 6, "Why is only the full block operator $\\Sigma_X$, and not an off-diagonal block $\\Sigma_{X_iX_j}$, guaranteed positive semi-definite?",
    "$\\langle \\Sigma_X\\mathbf{g}, \\mathbf{g}\\rangle$ is the variance of a linear combination, whereas $\\Sigma_{X_iX_j}$ maps between different spaces and is generally not even self-adjoint",
    [["Because off-diagonal blocks are always negative", "Cross-covariances can have either sign; the issue is that they are not self-adjoint."],
      ["Because $\\Sigma_{X_iX_j}$ has infinite rank", "Rank is not what determines positive semi-definiteness."],
      ["Because covariance operators can only be defined for $i = j$", "Cross-covariance operators are well defined; they simply lack the symmetry needed for PSD."]]),
  s("why-array", 6, "Why describe the covariance of $\\mathbf{X} = (X_1, \\dots, X_p)$ as a $p \\times p$ array of operators rather than as one kernel $G(s, t)$ on $[0, T]$?",
    "Each neuron has its own function space and each pair has its own cross-covariance, so the natural object is a block operator acting on the product space $\\mathcal{H}_{X_1} \\times \\dots \\times \\mathcal{H}_{X_p}$, with block $(i, j)$ mapping $\\mathcal{H}_{X_j}$ to $\\mathcal{H}_{X_i}$.",
    "States that the block structure keeps track of which neuron each part refers to, so one can read off within-neuron structure from the diagonal blocks and between-neuron structure from the off-diagonal ones."),

  // --- level 7 -----------------------------------------------------------
  n("hs-norm", 7, "Squared Hilbert–Schmidt norm of $\\Sigma_X$ for $G_{1,1} = G_{1,2} = G_{2,1} = st$ and $G_{2,2} = 2st$ on $[0, 1]$: $\\sum_{i,j}\\iint G_{i,j}^2\\,ds\\,dt$. Give $4$ decimal places.", 0.7778),
  n("block-diag-eig", 7, "Now set the cross blocks to zero: $G_{1,1} = st$, $G_{2,2} = 2st$, $G_{1,2} = G_{2,1} = 0$ on $[0, 1]$. The eigenvalue of $G = st$ is $\\int_0^1 t^2\\,dt = 1/3$. Find the largest eigenvalue of $\\Sigma_X$. Give $4$ decimal places.", 0.6667),
  m("uncorrelated-vs-indep", 7, "Suppose $\\Sigma_{X_1X_2} = 0$. What can you conclude?",
    "$X_1(s)$ and $X_2(t)$ are uncorrelated for all $s, t$; independence also requires, e.g., joint Gaussianity",
    [["$X_1$ and $X_2$ are independent", "Zero covariance does not imply independence in general."],
      ["$\\Sigma_X$ is not positive semi-definite", "Zeroing a cross block leaves a block-diagonal PSD operator."],
      ["$X_1$ must be a constant function", "Zero cross-covariance says nothing about the variability of $X_1$ itself."]]),
  s("lgcp-log", 7, "For a log-Gaussian Cox process, why does $\\log\\{\\rho_{i,j}(s, t)/(\\rho_i(s)\\rho_j(t))\\}$ recover the covariance $G_{i,j}(s, t)$ of the log-intensities?",
    "With $\\Lambda = \\exp(X)$ and Gaussian $X$, $\\mathbb{E}[\\Lambda_i(s)\\Lambda_j(t)]/(\\mathbb{E}\\Lambda_i(s)\\,\\mathbb{E}\\Lambda_j(t)) = \\exp\\{\\operatorname{Cov}(X_i(s), X_j(t))\\}$ by the Gaussian moment generating function, so the log of the ratio is exactly the covariance.",
    "Notes that this identity needs the log-Gaussian assumption; for other intensity models the log ratio is only a transformed summary of dependence."),

  // --- level 8 -----------------------------------------------------------
  n("top-eig", 8, "For $G_{1,1} = G_{1,2} = G_{2,1} = st$, $G_{2,2} = 2st$ on $[0, 1]$, $\\Sigma_X$ has eigenvalues equal to $1/3$ times those of $\\begin{bmatrix}1 & 1\\\\ 1 & 2\\end{bmatrix}$. Find the largest. Give $4$ decimal places.", 0.8727),
  n("bottom-eig", 8, "For the same $\\Sigma_X$, find the smallest non-zero eigenvalue, $1/3$ times the smaller eigenvalue of $\\begin{bmatrix}1 & 1\\\\ 1 & 2\\end{bmatrix}$. Give $4$ decimal places.", 0.1273),
  m("no-inverse", 8, "You want a precision-type quantity $\\Sigma_X^{-1}$ by analogy with a covariance matrix. What goes wrong?",
    "$\\Sigma_X$ is compact, so its eigenvalues tend to $0$ and the inverse is unbounded; the discretised block matrix becomes ill-conditioned as the grid refines, so truncation or a penalty is required",
    [["Nothing: $\\Sigma_X$ is invertible whenever every $G_{i,i}$ is positive", "Positive variance at each point does not prevent eigenvalues from accumulating at zero."],
      ["The blocks do not commute", "Non-commutativity is irrelevant to whether an inverse exists."],
      ["The product space $\\mathcal{H}$ is not complete", "A finite product of Hilbert spaces is a Hilbert space."]]),
  s("psd-proof", 8, "Show that $\\langle \\Sigma_X\\mathbf{g}, \\mathbf{g}\\rangle \\ge 0$ for every $\\mathbf{g} = (g_1, \\dots, g_p)$, and say where the cross blocks enter.",
    "$\\langle \\Sigma_X\\mathbf{g}, \\mathbf{g}\\rangle = \\sum_{i,j}\\langle \\Sigma_{X_iX_j}g_j, g_i\\rangle = \\sum_{i,j}\\operatorname{Cov}(\\langle X_i, g_i\\rangle, \\langle X_j, g_j\\rangle) = \\operatorname{Var}\\big(\\sum_i \\langle X_i, g_i\\rangle\\big) \\ge 0$.",
    "Identifies the $i \\ne j$ terms as the cross-covariance contributions, which enter as covariances between projections of different neurons."),

  // --- level 9 -----------------------------------------------------------
  n("asym-var", 9, "With $X_i(s) = sZ_i$ and $\\operatorname{Cov}(\\mathbf{Z}) = \\begin{bmatrix}1 & 1\\\\ 1 & 2\\end{bmatrix}$, take $g_1(t) = t$ and $g_2(t) = 1$. Find $\\operatorname{Var}\\big(\\langle X_1, g_1\\rangle + \\langle X_2, g_2\\rangle\\big)$. Give $4$ decimal places.", 0.9444),
  m("precision-blocks", 9, "In a Gaussian functional graphical model, a zero off-diagonal block in the *precision* operator $\\Sigma_X^{-1}$ (in the regularised sense) means:",
    "neurons $i$ and $j$ are conditionally independent given all the others",
    [["neurons $i$ and $j$ are marginally independent", "Marginal independence corresponds to a zero block in $\\Sigma_X$, not its inverse."],
      ["neuron $i$ has zero variance", "That concerns a diagonal block, not an off-diagonal one."],
      ["neurons $i$ and $j$ fire at identical times", "A zero precision block says nothing about identical firing."]]),
  s("one-big-operator", 9, "Explain why $\\Sigma_X$ can be viewed as a single covariance operator on $L^2\\big([0, T] \\times \\{1, \\dots, p\\}\\big)$, and what this buys you.",
    "A vector of $p$ functions on $[0, T]$ is one function of the pair $(t, i)$, and the block kernel $G_{i,j}(s, t)$ is the kernel of a single integral operator on that space, with the sum over $j$ playing the role of integration.",
    "Concludes that the usual theory (self-adjoint compact operator, spectral theorem, functional PCA, Karhunen–Loève) applies directly to all neurons jointly."),
  s("marginal-vs-conditional", 9, "Neurons $1$ and $2$ both receive input from neuron $3$ and have no direct link. What do you expect for $\\hat G_{1,2}$ versus the conditional dependence, and why does it matter for reading $\\Sigma_X$?",
    "$\\Sigma_{X_1X_2}$ can be clearly non-zero because both neurons co-vary with neuron $3$, even though they are conditionally independent given $3$; the covariance operator shows marginal association.",
    "Says that conditional (direct) links are read from the precision operator or from partial cross-covariance, not from the raw blocks of $\\Sigma_X$."),

  // --- level 10 ----------------------------------------------------------
  s("hs-summary", 10, "A collaborator proposes summarising each neuron pair by $\\|\\Sigma_{X_iX_j}\\|_{HS}$ and thresholding to build a connectivity graph. Discuss its strengths and weaknesses.",
    "Strength: a single non-negative number per pair that aggregates $G_{i,j}(s, t)$ over all time pairs and is zero iff the blocks are uncorrelated; weakness: it conflates direct and indirect association and depends on the scale of $X_i$ and $X_j$.",
    "Suggests normalising (e.g. by $\\|\\Sigma_{X_iX_i}\\|_{HS}\\|\\Sigma_{X_jX_j}\\|_{HS}$ or using correlation operators), or using conditional measures from a regularised precision operator."),
  n("explained-share", 10, "For the two-neuron operator with eigenvalues $0.8727$ and $0.1273$ (trace $1$), what fraction of total variance is carried by the top eigenfunction? Give $4$ decimal places.", 0.8727),
  m("matrix-analogy-limit", 10, "Where does the picture of $\\Sigma_X$ as 'a big covariance matrix' mislead the most?",
    "Infinite dimension: eigenvalues decay to $0$, there is no bounded inverse, and sample estimates need smoothing or truncation",
    [["Symmetry: $\\Sigma_X$ is not self-adjoint", "$\\Sigma_X$ is self-adjoint, as a covariance operator must be."],
      ["Positivity: $\\Sigma_X$ can have negative eigenvalues", "It is positive semi-definite as a variance form."],
      ["Block structure: operators cannot be arranged in blocks", "Block arrangement on a product space is perfectly well defined."]]),
  s("estimator-critique", 10, "Critique $\\hat G_{i,j}(s, t) = \\log\\{\\hat\\rho_{i,j}(s, t)/(\\hat\\rho_i(s)\\hat\\rho_j(t))\\}$ as an estimator of the cross-covariance kernel from spike trains.",
    "Spike-train second-order estimates are noisy and often zero in some cells, making the log undefined or very variable; the log-ratio only equals $G_{i,j}$ under a log-Gaussian Cox model, so otherwise it is a transformed dependence measure, not a covariance.",
    "Proposes remedies: kernel smoothing of $\\hat\\rho$, adding a small constant or pooling nearby bins, and projecting the resulting block matrix onto a positive semi-definite one before taking eigen-decompositions."),
];
