import type { Item, SourceRef } from "../../lib/assessment/types";
import { makeBuilders } from "./authoring";

/**
 * Brings `hilbert-space` and `functional-data-analysis` from 3 items each (see
 * items/functional-data-analysis.ts) to 20: 17 more per concept — 4 recall,
 * 5 apply, 4 explain, 4 transfer — so each lesson has 5 at every level.
 */
const AUTHORED: SourceRef = {
  id: "mathlingo-authored-fda",
  tier: "generated",
  title: "Mathlingo authored item (functional data analysis)",
};

const { mcq, short, num } = makeBuilders(AUTHORED);

// ---------------------------------------------------------------------------
const HS = "hilbert-space";
const hilbertSpace: Item[] = [
  // recall
  mcq(
    { concept: HS, slug: "recall-completeness", cognitive: "recall", level: 1.5, seconds: 35,
      stem: "What does it mean for an inner-product space to be complete?" },
    "Every Cauchy sequence in the space converges to a limit that is also in the space",
    [
      ["Every vector has norm $1$", "complete-unit-norm", "That describes normalised vectors, not completeness."],
      ["The space has a finite basis", "complete-finite-basis", "Infinite-dimensional spaces such as $L^2$ are complete too."],
      ["Every sequence converges", "complete-every-sequence", "Only Cauchy sequences need to converge; $x_n = n$ diverges in any normed space."],
    ],
  ),
  mcq(
    { concept: HS, slug: "recall-l2-inner-product", cognitive: "recall", level: 1, seconds: 30,
      stem: "What is the inner product of $f$ and $g$ in $L^2[a, b]$?" },
    "$\\langle f, g \\rangle = \\int_a^b f(t)\\,g(t)\\,dt$",
    [
      ["$\\langle f, g \\rangle = \\int_a^b \\big(f(t) + g(t)\\big)\\,dt$", "l2-sum", "An inner product multiplies the two functions pointwise, like $\\sum_i x_i y_i$."],
      ["$\\langle f, g \\rangle = \\max_t |f(t) - g(t)|$", "l2-sup-distance", "That is the sup-norm distance, not an inner product."],
      ["$\\langle f, g \\rangle = f(b)\\,g(b) - f(a)\\,g(a)$", "l2-endpoints", "The inner product integrates over the whole interval."],
    ],
  ),
  mcq(
    { concept: HS, slug: "recall-induced-norm", cognitive: "recall", level: 1, seconds: 30,
      stem: "How does the inner product of a Hilbert space define the norm of a vector $f$?" },
    "$\\|f\\| = \\sqrt{\\langle f, f \\rangle}$",
    [
      ["$\\|f\\| = \\langle f, f \\rangle$", "norm-no-sqrt", "Without the square root the “norm” scales like $c^2$ rather than $|c|$."],
      ["$\\|f\\| = \\langle f, 1 \\rangle$", "norm-against-one", "That is the integral of $f$, which can be zero or negative for nonzero $f$."],
      ["The norm is chosen independently of the inner product", "norm-independent", "In a Hilbert space the norm is the one induced by the inner product."],
    ],
  ),
  mcq(
    { concept: HS, slug: "recall-cauchy-schwarz", cognitive: "recall", level: 2, seconds: 35,
      stem: "Which inequality holds for all $f, g$ in a Hilbert space?" },
    "$|\\langle f, g \\rangle| \\le \\|f\\|\\,\\|g\\|$",
    [
      ["$|\\langle f, g \\rangle| \\ge \\|f\\|\\,\\|g\\|$", "cs-reversed", "Cauchy–Schwarz bounds the inner product from above."],
      ["$\\|f + g\\| = \\|f\\| + \\|g\\|$", "cs-triangle-equality", "The triangle inequality gives $\\le$, with equality only for aligned vectors."],
      ["$\\langle f, g \\rangle = \\|f\\|\\,\\|g\\|$", "cs-equality", "Equality holds only when $f$ and $g$ are linearly dependent."],
    ],
  ),

  // apply
  num(
    { concept: HS, slug: "apply-inner-product", cognitive: "apply", level: 3, seconds: 45,
      stem: "In $L^2[0, 1]$, compute $\\langle f, g \\rangle$ for $f(t) = t$ and $g(t) = t^2$." },
    0.25,
  ),
  num(
    { concept: HS, slug: "apply-norm", cognitive: "apply", level: 3.5, seconds: 50,
      stem: "In $L^2[0, 1]$, compute $\\|f\\|$ for $f(t) = t$. Give $3$ decimal places." },
    0.577,
  ),
  num(
    { concept: HS, slug: "apply-projection-coefficient", cognitive: "apply", level: 4, seconds: 60,
      stem: "In $L^2[0, 1]$, project $f(t) = t$ onto the constant function $1$. What is the coefficient $\\langle f, 1 \\rangle / \\langle 1, 1 \\rangle$?" },
    0.5,
  ),
  mcq(
    { concept: HS, slug: "apply-orthogonal", cognitive: "apply", level: 4.5, seconds: 45,
      stem: "In $L^2[0, 1]$, are $\\sin(2\\pi t)$ and $\\cos(2\\pi t)$ orthogonal?" },
    "Yes — $\\int_0^1 \\sin(2\\pi t)\\cos(2\\pi t)\\,dt = \\tfrac{1}{2}\\int_0^1 \\sin(4\\pi t)\\,dt = 0$",
    [
      ["No, because both are nonzero functions", "orthogonal-nonzero", "Orthogonality means zero inner product, which nonzero functions can have."],
      ["No, because they are equal at $t = \\tfrac{1}{8}$", "orthogonal-pointwise", "Orthogonality is about the integral of the product, not pointwise values."],
      ["Only on $[0, \\tfrac{1}{2}]$", "orthogonal-half", "The integral over the full period $[0, 1]$ is zero."],
    ],
  ),
  num(
    { concept: HS, slug: "apply-sine-norm", cognitive: "apply", level: 4, seconds: 50,
      stem: "In $L^2[0, 1]$, compute $\\|\\sin(2\\pi t)\\|^2$." },
    0.5,
  ),

  // explain
  short(
    { concept: HS, slug: "explain-why-completeness", cognitive: "explain", level: 6.5, seconds: 100,
      stem: "Why does functional data analysis need its space of functions to be complete, not just to have an inner product?" },
    [
      ["limits", "Methods build functions as limits of approximations — truncated basis expansions, iterative fits — and completeness guarantees those limits exist inside the space.", 4, true],
      ["projection", "Completeness (of closed subspaces) is what guarantees best approximations/orthogonal projections exist, which PCA and regression rely on.", 3, true],
    ],
  ),
  mcq(
    { concept: HS, slug: "explain-continuous-not-complete", cognitive: "explain", level: 7, seconds: 50,
      stem: "The continuous functions $C[0, 1]$ with the $L^2$ inner product $\\int_0^1 fg$ form an inner-product space. Why are they not a Hilbert space?" },
    "Continuous functions can converge in $L^2$ to a discontinuous function (e.g. steeper and steeper ramps approaching a step), so the space is not complete",
    [
      ["They have no inner product", "c01-no-inner-product", "$\\int_0^1 fg$ is a valid inner product on $C[0, 1]$."],
      ["They are not a vector space", "c01-not-vector-space", "Sums and scalar multiples of continuous functions are continuous."],
      ["They are infinite-dimensional", "c01-infinite", "$L^2$ is infinite-dimensional too and is a Hilbert space."],
    ],
  ),
  short(
    { concept: HS, slug: "explain-projection-theorem", cognitive: "explain", level: 7, seconds: 120,
      stem: "State the projection theorem for a closed subspace $M$ of a Hilbert space, and explain why it is the foundation of least squares in function spaces." },
    [
      ["statement", "Every $f$ has a unique closest point $\\hat{f} \\in M$, characterised by $f - \\hat{f} \\perp M$.", 4, true],
      ["least-squares", "Least squares is exactly this: minimising $\\|f - m\\|$ over $m \\in M$, solved by the orthogonality (normal) equations — the same geometry as OLS, now for functions.", 3, true],
    ],
  ),
  mcq(
    { concept: HS, slug: "explain-almost-everywhere", cognitive: "explain", level: 6, seconds: 50,
      stem: "In $L^2[0, 1]$, the function that is $0$ everywhere except $f(0.5) = 7$ is treated as the same element as the zero function. Why?" },
    "$\\|f - 0\\|^2 = \\int_0^1 f^2 = 0$, and elements at distance zero are identified — $L^2$ consists of equivalence classes of functions equal almost everywhere",
    [
      ["Because $7$ is a small number", "ae-small", "Any value at a single point gives integral $0$, however large."],
      ["Because functions in $L^2$ must be continuous", "ae-continuous", "$L^2$ contains many discontinuous functions."],
      ["It isn't; they are different elements", "ae-different", "Without the identification, $\\|\\cdot\\|$ would not be a norm ($\\|f\\| = 0$ for $f \\ne 0$)."],
    ],
  ),

  // transfer
  num(
    { concept: HS, slug: "transfer-best-constant", cognitive: "transfer", level: 5, seconds: 70,
      stem: "The best $L^2[0, 1]$ approximation of $f(t) = t$ by a constant is $c = 0.5$. What is the squared approximation error $\\int_0^1 (t - 0.5)^2\\,dt$? Give $4$ decimal places." },
    0.0833,
  ),
  short(
    { concept: HS, slug: "transfer-fourier", cognitive: "transfer", level: 6.5, seconds: 100,
      stem: "Explain a Fourier series as an expansion in an orthonormal basis of $L^2[0, 1]$, and state what Parseval's identity says about the coefficients." },
    [
      ["basis", "The functions $1, \\sqrt{2}\\cos(2\\pi k t), \\sqrt{2}\\sin(2\\pi k t)$ form an orthonormal basis; each coefficient is the inner product of $f$ with a basis function, just like coordinates in $\\mathbb{R}^n$.", 4, true],
      ["parseval", "Parseval: $\\|f\\|^2 = \\sum_k c_k^2$ — the squared norm equals the sum of squared coefficients.", 3, true],
    ],
  ),
  mcq(
    { concept: HS, slug: "transfer-ell2", cognitive: "transfer", level: 4, seconds: 45,
      stem: "The sequence space $\\ell^2$ contains sequences with $\\sum_n x_n^2 < \\infty$. Which sequence is in $\\ell^2$?" },
    "$x_n = 1/n$",
    [
      ["$x_n = 1/\\sqrt{n}$", "ell2-sqrt", "$\\sum_n 1/n$ diverges, so this sequence has infinite norm."],
      ["$x_n = 1$", "ell2-constant", "$\\sum_n 1 = \\infty$."],
      ["$x_n = (-1)^n$", "ell2-alternating", "The squares are all $1$, so the sum diverges."],
    ],
  ),
  short(
    { concept: HS, slug: "transfer-gram-schmidt", cognitive: "transfer", level: 6, seconds: 120,
      stem: "Apply one step of Gram–Schmidt in $L^2[0, 1]$: make $g(t) = t$ orthogonal to the constant function $1$. What function do you get, and why does the same algorithm work for functions as for vectors in $\\mathbb{R}^n$?" },
    [
      ["result", "$t - \\tfrac{\\langle t, 1 \\rangle}{\\langle 1, 1 \\rangle} \\cdot 1 = t - \\tfrac{1}{2}$.", 4, true],
      ["why", "Gram–Schmidt only uses the inner product (projections and subtraction), so it works in any inner-product space, including spaces of functions — here it produces shifted Legendre polynomials.", 3, true],
    ],
  ),
];

// ---------------------------------------------------------------------------
const FDA = "functional-data-analysis";
const functionalData: Item[] = [
  // recall
  mcq(
    { concept: FDA, slug: "recall-unit", cognitive: "recall", level: 1, seconds: 30,
      stem: "In functional data analysis, what is a single observation?" },
    "An entire curve (or surface) measured on a continuum, such as a subject's growth trajectory",
    [
      ["A single measurement at one time point", "fda-unit-point", "Individual measurements are samples of the observation, not the observation itself."],
      ["A summary statistic such as the mean of a curve", "fda-unit-summary", "FDA keeps the whole curve rather than collapsing it."],
      ["A row of unrelated features", "fda-unit-features", "The values are ordered along a continuum and related by smoothness."],
    ],
  ),
  mcq(
    { concept: FDA, slug: "recall-smoothing-step", cognitive: "recall", level: 2, seconds: 35,
      stem: "Raw functional data usually arrive as noisy values at discrete times. What is the typical first step?" },
    "Represent each curve by a smooth basis expansion (e.g. B-splines or Fourier), often with a roughness penalty",
    [
      ["Discard curves with missing time points", "fda-drop-missing", "Basis expansions handle irregular and missing times; dropping curves wastes data."],
      ["Treat each time point as an independent variable", "fda-independent-points", "That ignores the ordering and smoothness that make the data functional."],
      ["Sort the values within each curve", "fda-sort", "Sorting destroys the curve's time structure."],
    ],
  ),
  mcq(
    { concept: FDA, slug: "recall-mean-function", cognitive: "recall", level: 1.5, seconds: 30,
      stem: "How is the mean function $\\mu(t)$ of a sample of curves estimated?" },
    "By averaging the curves pointwise: $\\hat{\\mu}(t) = \\tfrac{1}{n}\\sum_i X_i(t)$",
    [
      ["By averaging each curve over time", "mean-over-time", "That gives one number per curve, not a mean function."],
      ["By taking the curve with the median area", "mean-median-curve", "The mean function need not be any observed curve."],
      ["By fitting a straight line through all points", "mean-line", "The mean function can have any shape."],
    ],
  ),
  mcq(
    { concept: FDA, slug: "recall-dense-sparse", cognitive: "recall", level: 2, seconds: 35,
      stem: "What distinguishes sparse from dense functional data?" },
    "Sparse data have only a few, often irregular, measurements per curve; dense data have many per curve",
    [
      ["Sparse data have few curves; dense data have many", "sparse-few-curves", "Sparsity refers to measurements per curve, not the number of curves."],
      ["Sparse data have many zero values", "sparse-zeros", "This is not the matrix sense of sparsity."],
      ["Sparse data are always noise-free", "sparse-noise-free", "Sparse data are typically noisy as well."],
    ],
  ),

  // apply
  num(
    { concept: FDA, slug: "apply-pointwise-mean", cognitive: "apply", level: 1.5, seconds: 30,
      stem: "Three curves take the values $2$, $4$ and $9$ at $t = 0.5$. What is the estimated mean function at $t = 0.5$?" },
    5,
  ),
  num(
    { concept: FDA, slug: "apply-pointwise-variance", cognitive: "apply", level: 2.5, seconds: 45,
      stem: "Three curves take the values $2$, $4$ and $9$ at $t = 0.5$. What is the sample variance (divisor $n - 1$) of $X(0.5)$?" },
    13,
  ),
  num(
    { concept: FDA, slug: "apply-covariance", cognitive: "apply", level: 4, seconds: 80,
      stem: "Three curves have values $(X(s), X(t)) = (1, 2)$, $(3, 4)$ and $(5, 9)$. Estimate the covariance function $C(s, t)$ with divisor $n - 1$." },
    7,
  ),
  num(
    { concept: FDA, slug: "apply-l2-distance", cognitive: "apply", level: 5, seconds: 70,
      stem: "Compute the $L^2[0, 1]$ distance between the curves $f(t) = t$ and $g(t) = t^2$. Give $3$ decimal places." },
    0.183,
  ),
  mcq(
    { concept: FDA, slug: "apply-roughness-penalty", cognitive: "apply", level: 4, seconds: 45,
      stem: "A curve is fitted by minimising $\\sum_j (y_j - f(t_j))^2 + \\lambda\\int f''(t)^2\\,dt$. What happens as $\\lambda \\to \\infty$?" },
    "The fit is forced towards $f'' = 0$, i.e. the least-squares straight line",
    [
      ["The fit interpolates every data point", "penalty-interpolate", "Interpolation is the $\\lambda \\to 0$ limit."],
      ["The fit becomes the constant $0$", "penalty-zero", "The penalty is on curvature, not size; straight lines are unpenalised."],
      ["The fit becomes more wiggly", "penalty-wiggly", "A larger roughness penalty makes the fit smoother."],
    ],
  ),

  // explain
  short(
    { concept: FDA, slug: "explain-amplitude-phase", cognitive: "explain", level: 6, seconds: 120,
      stem: "Growth curves differ both in how large the pubertal spurt is and in when it happens. Explain amplitude versus phase variation, and why the pointwise mean of unaligned curves can be misleading." },
    [
      ["definitions", "Amplitude variation is differences in the height of features; phase variation is differences in their timing.", 3, true],
      ["mean", "Averaging curves whose peaks occur at different times smears the peaks, giving a mean with a lower, wider spurt than any individual has.", 3, true],
      ["registration", "Registration (time warping to align features) separates the two before averaging.", 2],
    ],
  ),
  mcq(
    { concept: FDA, slug: "explain-irregular", cognitive: "explain", level: 4, seconds: 45,
      stem: "Why are curves measured at different, irregular times not a problem for FDA, when they would be for an ordinary data matrix?" },
    "Each curve is converted to a function (e.g. a basis expansion), which can be evaluated at any time, so the curves become comparable objects",
    [
      ["Because FDA discards the time information", "irregular-discard-time", "FDA uses the time information; that's what makes curves comparable."],
      ["Because FDA only uses the first measurement of each curve", "irregular-first-point", "FDA uses all measurements."],
      ["Because irregular times are always interpolated linearly", "irregular-linear", "Linear interpolation is one crude option; smooth basis fits are standard."],
    ],
  ),
  short(
    { concept: FDA, slug: "explain-derivatives", cognitive: "explain", level: 5.5, seconds: 100,
      stem: "Why must functional data be smoothed before estimating derivatives such as velocity or acceleration?" },
    [
      ["noise", "Differencing noisy measurements amplifies the noise — divided differences with small spacing blow up measurement error, worse for second derivatives.", 4, true],
      ["smooth", "A smooth fit (e.g. a spline with a penalty on a higher derivative) can be differentiated analytically, giving stable derivative estimates.", 3, true],
    ],
  ),
  mcq(
    { concept: FDA, slug: "explain-choose-lambda", cognitive: "explain", level: 3.5, seconds: 45,
      stem: "How is the smoothing parameter $\\lambda$ of a roughness-penalised fit usually chosen?" },
    "By (generalised) cross-validation, balancing fit to the data against smoothness",
    [
      ["By making $\\lambda$ as large as possible", "lambda-max", "Very large $\\lambda$ oversmooths and removes real features."],
      ["By making $\\lambda$ as small as possible", "lambda-min", "Very small $\\lambda$ interpolates the noise."],
      ["By setting $\\lambda = 1$ always", "lambda-one", "The right scale depends on the data and units."],
    ],
  ),

  // transfer
  short(
    { concept: FDA, slug: "transfer-growth-velocity", cognitive: "transfer", level: 6, seconds: 100,
      stem: "You have smoothed height curves for $100$ children. How would you use them to estimate each child's age at peak growth velocity?" },
    [
      ["derivative", "Differentiate each smooth height curve to get growth velocity $h'(t)$.", 3, true],
      ["peak", "Find the age maximising $h'(t)$ in the pubertal range (where $h''(t) = 0$ and changes sign).", 3, true],
      ["smoothing", "Mentions that the smoothing penalty (e.g. on a higher derivative) must be chosen so the velocity curves are not dominated by noise.", 1],
    ],
  ),
  mcq(
    { concept: FDA, slug: "transfer-which-functional", cognitive: "transfer", level: 2, seconds: 35,
      stem: "Which dataset is most naturally analysed as functional data?" },
    "Hourly electricity demand for each day over a year, one curve per day",
    [
      ["Answers to a $20$-question multiple-choice survey", "functional-survey", "Survey items are distinct variables with no continuum between them."],
      ["Each customer's country and age", "functional-demographics", "These are scalar attributes, not curves."],
      ["The results of $1000$ coin tosses", "functional-coins", "Independent tosses have no smooth underlying curve."],
    ],
  ),
  short(
    { concept: FDA, slug: "transfer-yield-curves", cognitive: "transfer", level: 7, seconds: 120,
      stem: "Each day's government bond yield curve (yield as a function of maturity) is treated as one functional observation. What do the first few principal modes of variation typically look like, and why is a functional view natural here?" },
    [
      ["modes", "The first three modes are typically level (a near-constant shift), slope (short vs long maturities moving oppositely) and curvature (middle maturities vs the ends).", 4, true],
      ["functional", "Yields are observed at a handful of maturities but describe a smooth underlying curve; treating it as a function allows interpolation and comparing days on a common footing.", 3, true],
    ],
  ),
  mcq(
    { concept: FDA, slug: "transfer-different-grids", cognitive: "transfer", level: 4.5, seconds: 45,
      stem: "Two hospitals record patients' temperature curves on different time grids. What is the standard way to put the curves on a common footing?" },
    "Fit each curve in a common basis (e.g. B-splines on the same knots), so every curve is represented by coefficients in the same basis",
    [
      ["Keep only the time points both hospitals share", "grids-intersect", "This throws away most of the data and may leave almost nothing."],
      ["Analyse each hospital separately and never combine them", "grids-separate", "A common functional representation allows a joint analysis."],
      ["Pad the shorter records with zeros", "grids-zero-pad", "Zeros are not plausible temperatures and would distort every estimate."],
    ],
  ),
];

export const functionalDataExpansionItems: Item[] = [...hilbertSpace, ...functionalData];
