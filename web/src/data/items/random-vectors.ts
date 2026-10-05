import type { Item, SourceRef } from "../../lib/assessment/types";
import { makeBuilders } from "./authoring";

/**
 * Random Vectors and Linear Transformations of Random Vectors — the two
 * lessons that open the multivariate chapter. Thirty items each, spanning
 * levels 1–10: definitions at the bottom, single-formula computations in the
 * middle, and derivations, feasibility arguments and Gaussian transfer
 * problems at the top. Numeric keys were computed by hand and re-checked; the
 * default relative tolerance absorbs rounding to the precision each stem asks.
 */
const AUTHORED: SourceRef = {
  id: "mathlingo-authored-random-vectors",
  tier: "generated",
  title: "Mathlingo authored item (random vectors)",
};

const { mcq, short, num } = makeBuilders(AUTHORED);

// ---------------------------------------------------------------------------
const RV = "random-vectors";
const randomVectors: Item[] = [
  mcq(
    { concept: RV, slug: "recall-definition", cognitive: "recall", level: 1, seconds: 30,
      stem: "What is a random vector $\\mathbf{X} \\in \\mathbb{R}^k$?" },
    "A column of $k$ random variables, all defined on the same sample space",
    [
      ["A fixed vector whose entries were once chosen at random", "rv-fixed-after-draw", "Confuses the random vector with one realisation $\\mathbf{x}$ of it."],
      ["$k$ random variables, each from its own unrelated experiment", "rv-unrelated-experiments", "Stacking needs one outcome to determine every component; unrelated experiments have no joint distribution."],
      ["A single random variable whose distribution has $k$ parameters", "rv-parameters", "The number of parameters of a scalar distribution has nothing to do with the dimension of a random vector."],
    ],
  ),
  mcq(
    { concept: RV, slug: "recall-mean-vector", cognitive: "recall", level: 1, seconds: 30,
      stem: "How is the mean vector $\\boldsymbol{\\mu} = \\mathbb{E}[\\mathbf{X}]$ of a random vector defined?" },
    "Componentwise: $\\mu_i = \\mathbb{E}[X_i]$ for each $i$",
    [
      ["As the single number $\\mathbb{E}[X_1 + \\cdots + X_k]$", "rv-mean-scalar", "That is $\\mathbf{1}^\\top\\boldsymbol{\\mu}$, a scalar summary — the mean of a vector is a vector."],
      ["As $\\mathbb{E}[\\|\\mathbf{X}\\|]$, the expected length", "rv-mean-norm", "The expected length is a scalar and is not the length of $\\boldsymbol{\\mu}$ in general."],
      ["Only when the components are independent", "rv-mean-needs-independence", "Componentwise expectation needs no independence; only each $\\mathbb{E}[X_i]$ must exist."],
    ],
  ),
  mcq(
    { concept: RV, slug: "recall-notation", cognitive: "recall", level: 1.5, seconds: 30,
      stem: "In the statement $P(\\mathbf{X} = \\mathbf{x})$, what is the difference between $\\mathbf{X}$ and $\\mathbf{x}$?" },
    "$\\mathbf{X}$ is the random vector; $\\mathbf{x}$ is a fixed point of $\\mathbb{R}^k$, a possible realisation",
    [
      ["$\\mathbf{X}$ is a matrix and $\\mathbf{x}$ is a vector", "rv-case-means-matrix", "Bold capitals can denote matrices elsewhere, but here the capital marks randomness, not shape."],
      ["$\\mathbf{x}$ is the mean of $\\mathbf{X}$", "rv-lowercase-mean", "The mean is written $\\boldsymbol{\\mu}$; $\\mathbf{x}$ is any value $\\mathbf{X}$ might take."],
      ["There is no difference; the case is a style choice", "rv-case-style", "The convention carries meaning: capitals are random, lowercase are realisations."],
    ],
  ),
  mcq(
    { concept: RV, slug: "recall-joint-cdf", cognitive: "recall", level: 2, seconds: 40,
      stem: "Which expression is the joint CDF $F_{\\mathbf{X}}(\\mathbf{x})$ of $\\mathbf{X} = [X_1, \\ldots, X_k]^\\top$?" },
    "$P(X_1 \\le x_1, X_2 \\le x_2, \\ldots, X_k \\le x_k)$",
    [
      ["$F_{X_1}(x_1) F_{X_2}(x_2) \\cdots F_{X_k}(x_k)$", "rv-cdf-product", "The product of marginal CDFs equals the joint CDF only when the components are independent."],
      ["$P(X_1 \\le x_1 \\text{ or } \\cdots \\text{ or } X_k \\le x_k)$", "rv-cdf-union", "The joint CDF requires every inequality at once — an intersection, not a union."],
      ["$P(X_1 + \\cdots + X_k \\le x_1 + \\cdots + x_k)$", "rv-cdf-sum", "This is the CDF of the sum, a single scalar summary that loses the joint information."],
    ],
  ),
  mcq(
    { concept: RV, slug: "recall-marginal", cognitive: "recall", level: 2, seconds: 40,
      stem: "$\\mathbf{X} = [X_1, X_2, X_3]^\\top$ has joint density $f_{\\mathbf{X}}$. How is the marginal density of $X_1$ obtained?" },
    "Integrate $f_{\\mathbf{X}}(x_1, x_2, x_3)$ over $x_2$ and $x_3$",
    [
      ["Set $x_2 = x_3 = 0$ in $f_{\\mathbf{X}}$", "rv-marginal-by-zeroing", "Fixing the other coordinates gives a slice (proportional to a conditional density), not the marginal."],
      ["Integrate $f_{\\mathbf{X}}$ over $x_1$", "rv-marginal-wrong-variable", "Integrating out $x_1$ removes $X_1$ — it leaves the joint density of $X_2$ and $X_3$."],
      ["Divide $f_{\\mathbf{X}}$ by the marginals of $X_2$ and $X_3$", "rv-marginal-divide", "Dividing by marginals produces a conditional density, and only under extra assumptions."],
    ],
  ),
  mcq(
    { concept: RV, slug: "recall-independence", cognitive: "recall", level: 2, seconds: 40,
      stem: "The components of a continuous random vector $\\mathbf{X}$ are mutually independent exactly when…" },
    "the joint density factors as $f_{\\mathbf{X}}(\\mathbf{x}) = \\prod_i f_{X_i}(x_i)$ for all $\\mathbf{x}$",
    [
      ["every covariance $\\text{Cov}(X_i, X_j)$ with $i \\ne j$ is $0$", "rv-uncorrelated-is-independent", "Zero covariance rules out only linear dependence; it does not imply independence."],
      ["every pair $X_i, X_j$ is independent", "rv-pairwise-is-mutual", "Pairwise independence is weaker than mutual independence of the whole collection."],
      ["the mean vector is $\\mathbf{0}$", "rv-mean-zero-independent", "Centring says nothing about dependence."],
    ],
  ),
  num(
    { concept: RV, slug: "apply-portfolio-mean", cognitive: "apply", level: 2, seconds: 45,
      stem: "$\\mathbf{X} = [X_1, X_2, X_3]^\\top$ has mean $\\boldsymbol{\\mu} = [2, -1, 4]$. Compute $\\mathbb{E}[\\mathbf{w}^\\top\\mathbf{X}]$ for $\\mathbf{w} = [1, 2, 0.5]$." },
    2,
  ),
  num(
    { concept: RV, slug: "apply-count-covariances", cognitive: "apply", level: 2, seconds: 40,
      stem: "A random vector has $5$ components. How many distinct covariances $\\text{Cov}(X_i, X_j)$ with $i < j$ are there?" },
    10,
  ),
  num(
    { concept: RV, slug: "apply-affine-mean", cognitive: "apply", level: 3, seconds: 60,
      stem: "$\\mathbb{E}[\\mathbf{X}] = [1, 3]$, $\\mathbf{A} = \\begin{bmatrix} 2 & -1 \\\\ 0 & 4 \\end{bmatrix}$ and $\\mathbf{b} = [5, -2]$. What is the second component of $\\mathbb{E}[\\mathbf{A}\\mathbf{X} + \\mathbf{b}]$?" },
    10,
  ),
  num(
    { concept: RV, slug: "apply-var-sum", cognitive: "apply", level: 3, seconds: 45,
      stem: "$\\text{Var}(X_1) = 4$, $\\text{Var}(X_2) = 9$ and $\\text{Cov}(X_1, X_2) = -3$. Compute $\\text{Var}(X_1 + X_2)$." },
    7,
  ),
  mcq(
    { concept: RV, slug: "recall-sample-as-vector", cognitive: "recall", level: 3, seconds: 45,
      stem: "A sample $X_1, \\ldots, X_n$ is stacked into $\\mathbf{X} \\in \\mathbb{R}^n$. Which expression is the sample mean $\\bar{X}$?" },
    "$\\tfrac{1}{n}\\mathbf{1}^\\top\\mathbf{X}$, where $\\mathbf{1}$ is the vector of ones",
    [
      ["$\\tfrac{1}{n}\\mathbf{X}^\\top\\mathbf{X}$", "rv-mean-as-gram", "$\\mathbf{X}^\\top\\mathbf{X} = \\sum X_i^2$ — that leads to a second moment, not the mean."],
      ["$\\tfrac{1}{n}\\mathbf{1}\\mathbf{X}^\\top$", "rv-mean-outer-product", "$\\mathbf{1}\\mathbf{X}^\\top$ is an $n \\times n$ matrix, not a scalar."],
      ["$\\mathbb{E}[\\mathbf{X}]$", "rv-sample-mean-is-expectation", "$\\mathbb{E}[\\mathbf{X}]$ is a fixed vector of population means; $\\bar{X}$ is a random scalar computed from the data."],
    ],
  ),
  mcq(
    { concept: RV, slug: "explain-why-matrix", cognitive: "explain", level: 3, seconds: 60,
      stem: "Why is the spread of a random vector recorded in a $k \\times k$ matrix rather than a list of $k$ variances?" },
    "The variance of a weighted sum depends on every pairwise covariance, and those are naturally indexed by a pair $(i, j)$",
    [
      ["Because matrices are required to store more than $k$ numbers in a computer", "rv-matrix-storage", "The reason is mathematical, not a storage convention: the extra numbers are needed information."],
      ["Because the variances themselves are matrices when $k > 1$", "rv-variance-is-matrix", "Each $\\text{Var}(X_i)$ is still a scalar; the matrix is needed for the covariances between components."],
      ["It is not needed: the $k$ variances determine the covariances", "rv-variances-determine-cov", "Vectors with identical variances can have any covariances in a feasible range, giving very different spreads for sums."],
    ],
  ),
  num(
    { concept: RV, slug: "apply-weighted-var", cognitive: "apply", level: 4, seconds: 60,
      stem: "$\\text{Var}(X_1) = 1$, $\\text{Var}(X_2) = 4$ and $\\text{Cov}(X_1, X_2) = 0.5$. Compute $\\text{Var}(2X_1 - X_2)$." },
    6,
  ),
  num(
    { concept: RV, slug: "apply-paired-difference", cognitive: "apply", level: 4, seconds: 60,
      stem: "A patient’s blood pressure is measured before ($X_1$) and after ($X_2$) a treatment. Each has variance $25$ and their correlation is $0.8$. Compute $\\text{Var}(X_2 - X_1)$." },
    10,
  ),
  num(
    { concept: RV, slug: "apply-bernoulli-complement", cognitive: "apply", level: 4, seconds: 60,
      stem: "$X_1 \\sim \\text{Bernoulli}(0.5)$ and $X_2 = 1 - X_1$. Compute $\\text{Cov}(X_1, X_2)$." },
    -0.25,
  ),
  num(
    { concept: RV, slug: "apply-parameter-count", cognitive: "apply", level: 4, seconds: 60,
      stem: "To describe a $10$-dimensional random vector by its mean vector and all its variances and covariances, how many distinct numbers are needed?" },
    65,
  ),
  mcq(
    { concept: RV, slug: "explain-uncorrelated-not-independent", cognitive: "explain", level: 4, seconds: 60,
      stem: "$X_1 \\sim \\mathcal{N}(0, 1)$ and $X_2 = X_1^2$. Which statement is true of $\\mathbf{X} = [X_1, X_2]^\\top$?" },
    "$\\text{Cov}(X_1, X_2) = 0$, yet $X_1$ and $X_2$ are dependent",
    [
      ["$\\text{Cov}(X_1, X_2) = 0$, so $X_1$ and $X_2$ are independent", "rv-uncorrelated-is-independent", "Covariance detects only linear dependence; $X_2$ is a deterministic function of $X_1$."],
      ["$\\text{Cov}(X_1, X_2) = 1$ because $X_2$ is determined by $X_1$", "rv-function-means-cov-one", "$\\text{Cov}(X_1, X_1^2) = \\mathbb{E}[X_1^3] - 0 = 0$ by symmetry."],
      ["$\\mathbf{X}$ is not a random vector because its components are not independent", "rv-requires-independence", "A random vector's components may depend on each other in any way."],
    ],
  ),
  num(
    { concept: RV, slug: "apply-joint-pmf-cov", cognitive: "apply", level: 5, seconds: 90,
      stem: "$\\mathbf{X} = [X_1, X_2]^\\top$ takes values in $\\{0, 1\\}^2$ with $P(0, 0) = 0.2$, $P(0, 1) = 0.3$, $P(1, 0) = 0.1$, $P(1, 1) = 0.4$. Compute $\\text{Cov}(X_1, X_2)$." },
    0.05,
  ),
  num(
    { concept: RV, slug: "apply-three-term-sum", cognitive: "apply", level: 5, seconds: 75,
      stem: "$X_1, X_2, X_3$ each have variance $2$, and every pair has covariance $0.5$. Compute $\\text{Var}(X_1 + X_2 + X_3)$." },
    9,
  ),
  mcq(
    { concept: RV, slug: "explain-marginals-not-enough", cognitive: "explain", level: 5, seconds: 75,
      stem: "$X \\sim \\mathcal{N}(0, 1)$. Compare $\\mathbf{U} = [X, X]^\\top$ and $\\mathbf{V} = [X, -X]^\\top$. Which statement is correct?" },
    "Both have two standard normal marginals, but they are different random vectors: $U_1 + U_2$ has variance $4$ while $V_1 + V_2 = 0$",
    [
      ["They have the same distribution because their marginals agree", "rv-marginals-determine-joint", "Marginals discard the dependence between components; $\\mathbf{U}$ lies on $x_2 = x_1$ and $\\mathbf{V}$ on $x_2 = -x_1$."],
      ["$\\mathbf{V}$ is not a valid random vector because $-X$ is not normal", "rv-negative-not-normal", "$-X \\sim \\mathcal{N}(0, 1)$ by symmetry of the normal."],
      ["They differ only in their mean vectors", "rv-differ-in-mean", "Both have mean $\\mathbf{0}$; they differ in their covariance, $+1$ versus $-1$."],
    ],
  ),
  short(
    { concept: RV, slug: "explain-linearity-no-independence", cognitive: "explain", level: 5, seconds: 120,
      stem: "Explain why $\\mathbb{E}[\\mathbf{A}\\mathbf{X} + \\mathbf{b}] = \\mathbf{A}\\,\\mathbb{E}[\\mathbf{X}] + \\mathbf{b}$ holds for a fixed matrix $\\mathbf{A}$ and fixed vector $\\mathbf{b}$, even when the components of $\\mathbf{X}$ are dependent." },
    [
      ["componentwise", "Writes the $i$-th component as $\\sum_j a_{ij}X_j + b_i$ and takes its expectation.", 3, true],
      ["scalar-linearity", "Uses scalar linearity of expectation, $\\mathbb{E}[\\sum_j a_{ij}X_j + b_i] = \\sum_j a_{ij}\\mathbb{E}[X_j] + b_i$, which is the $i$-th entry of $\\mathbf{A}\\boldsymbol{\\mu} + \\mathbf{b}$.", 3, true],
      ["no-independence", "Notes that linearity of expectation never requires independence — only that each $\\mathbb{E}[X_j]$ exists.", 2, true],
    ],
  ),
  num(
    { concept: RV, slug: "apply-zero-variance-cov", cognitive: "apply", level: 6, seconds: 90,
      stem: "$\\text{Var}(X_1) = 4$ and $\\text{Var}(X_2) = 1$. For what value of $\\text{Cov}(X_1, X_2)$ is $X_1 - 2X_2$ almost surely constant?" },
    2,
  ),
  num(
    { concept: RV, slug: "transfer-portfolio-sd", cognitive: "transfer", level: 6, seconds: 120,
      stem: "Two assets have return standard deviations $0.2$ and $0.3$ and correlation $-0.5$. A portfolio puts weight $0.6$ on the first and $0.4$ on the second. Compute the portfolio’s return standard deviation." },
    0.12,
  ),
  short(
    { concept: RV, slug: "explain-same-moments-different-spread", cognitive: "explain", level: 6, seconds: 150,
      stem: "Give two random vectors $[X_1, X_2]^\\top$ with the same mean vector and the same component variances for which $\\text{Var}(X_1 + X_2)$ differs, and explain what this shows about describing a random vector’s spread." },
    [
      ["example", "Gives a valid pair, e.g. $X_2 = X_1$ versus $X_2 = -X_1$ (or independent components), with the same means and variances.", 3, true],
      ["compute", "Computes the two values of $\\text{Var}(X_1 + X_2)$ correctly, e.g. $4\\sigma^2$ versus $0$.", 2],
      ["conclusion", "Concludes that the variances do not determine the spread of combinations: the covariances are needed too, which motivates the covariance matrix.", 3, true],
    ],
  ),
  short(
    { concept: RV, slug: "explain-variance-double-sum", cognitive: "explain", level: 7, seconds: 180,
      stem: "Starting from $\\text{Var}(Y) = \\mathbb{E}[(Y - \\mathbb{E}[Y])^2]$, show that $\\text{Var}\\!\\left(\\sum_i w_i X_i\\right) = \\sum_i \\sum_j w_i w_j \\,\\text{Cov}(X_i, X_j)$." },
    [
      ["centre", "Writes $Y - \\mathbb{E}[Y] = \\sum_i w_i (X_i - \\mu_i)$ using linearity of expectation.", 3, true],
      ["square", "Expands the square of the sum as the double sum $\\sum_i \\sum_j w_i w_j (X_i - \\mu_i)(X_j - \\mu_j)$.", 3, true],
      ["expect", "Takes expectations term by term and recognises $\\mathbb{E}[(X_i - \\mu_i)(X_j - \\mu_j)] = \\text{Cov}(X_i, X_j)$, with the $i = j$ terms giving the variances.", 3, true],
    ],
  ),
  num(
    { concept: RV, slug: "transfer-min-variance-weight", cognitive: "transfer", level: 7, seconds: 150,
      stem: "$\\text{Var}(X_1) = 4$, $\\text{Var}(X_2) = 9$ and $\\text{Cov}(X_1, X_2) = 2$. Find the weight $w$ that minimises $\\text{Var}\\!\\left(wX_1 + (1 - w)X_2\\right)$. Give $3$ decimal places." },
    7 / 9,
  ),
  mcq(
    { concept: RV, slug: "transfer-independent-vectors", cognitive: "transfer", level: 5, seconds: 75,
      stem: "Random vectors $\\mathbf{X} \\in \\mathbb{R}^2$ and $\\mathbf{Y} \\in \\mathbb{R}^2$ are independent of each other. Which covariance is guaranteed to be $0$?" },
    "$\\text{Cov}(X_1, Y_2)$",
    [
      ["$\\text{Cov}(X_1, X_2)$", "rv-between-means-within", "Independence of the two vectors says nothing about dependence among the components inside one vector."],
      ["$\\text{Cov}(X_1 + Y_1, X_1)$", "rv-shared-component", "This equals $\\text{Var}(X_1) + \\text{Cov}(Y_1, X_1) = \\text{Var}(X_1)$, which is positive unless $X_1$ is constant."],
      ["None of them — independence of vectors only constrains their means", "rv-independence-means-only", "Independence makes every component of $\\mathbf{X}$ independent of every component of $\\mathbf{Y}$, so all cross-covariances vanish."],
    ],
  ),
  num(
    { concept: RV, slug: "transfer-equicorrelation-bound", cognitive: "transfer", level: 8, seconds: 180,
      stem: "$X_1, \\ldots, X_5$ each have variance $1$, and every pair has the same correlation $\\rho$. Using only the fact that $\\text{Var}(X_1 + \\cdots + X_5) \\ge 0$, find the smallest possible value of $\\rho$." },
    -0.25,
  ),
  short(
    { concept: RV, slug: "transfer-infeasible-covariances", cognitive: "transfer", level: 8, seconds: 240,
      stem: "A risk model claims three unit-variance returns with $\\text{Cov}(X_1, X_2) = 0.9$, $\\text{Cov}(X_2, X_3) = 0.9$ and $\\text{Cov}(X_1, X_3) = -0.9$. Show that no random vector can have these covariances." },
    [
      ["combination", "Chooses a linear combination designed to exploit the signs, e.g. $X_1 - X_2 + X_3$.", 3, true],
      ["compute", "Computes its variance: $3 - 2(0.9) - 2(0.9) - 2(0.9) = -2.4$.", 3, true],
      ["contradiction", "Concludes that a variance cannot be negative, so the stated covariances are impossible.", 3, true],
    ],
  ),
  num(
    { concept: RV, slug: "transfer-correlation-range", cognitive: "transfer", level: 9, seconds: 300,
      stem: "$X_1, X_2, X_3$ each have variance $1$, with $\\text{Corr}(X_1, X_2) = \\text{Corr}(X_1, X_3) = 0.8$. What is the smallest possible value of $\\text{Corr}(X_2, X_3)$? (Hint: consider the residuals $X_2 - 0.8X_1$ and $X_3 - 0.8X_1$.)" },
    0.28,
  ),
];

// ---------------------------------------------------------------------------
const LT = "linear-transformations-random-vectors";
const linearTransformations: Item[] = [
  mcq(
    { concept: LT, slug: "recall-covariance-rule", cognitive: "recall", level: 1, seconds: 30,
      stem: "$\\mathbf{X}$ has covariance matrix $\\boldsymbol{\\Sigma}$, and $\\mathbf{A}$, $\\mathbf{b}$ are fixed. What is $\\text{Cov}(\\mathbf{A}\\mathbf{X} + \\mathbf{b})$?" },
    "$\\mathbf{A}\\boldsymbol{\\Sigma}\\mathbf{A}^\\top$",
    [
      ["$\\mathbf{A}\\boldsymbol{\\Sigma}$", "lt-cov-one-sided", "Covariance is quadratic, so $\\mathbf{A}$ appears on both sides; $\\mathbf{A}\\boldsymbol{\\Sigma}$ is not even square in general."],
      ["$\\mathbf{A}^\\top\\boldsymbol{\\Sigma}\\mathbf{A}$", "lt-cov-transpose-order", "The order is reversed: $(\\mathbf{X} - \\boldsymbol{\\mu})$ is multiplied by $\\mathbf{A}$ on the left, giving $\\mathbf{A}\\boldsymbol{\\Sigma}\\mathbf{A}^\\top$."],
      ["$\\mathbf{A}\\boldsymbol{\\Sigma}\\mathbf{A}^\\top + \\mathbf{b}\\mathbf{b}^\\top$", "lt-shift-adds-cov", "A fixed shift moves the mean only; it cancels when you centre."],
    ],
  ),
  mcq(
    { concept: LT, slug: "recall-shift", cognitive: "recall", level: 1.5, seconds: 30,
      stem: "Adding a fixed vector $\\mathbf{b}$ to a random vector $\\mathbf{X}$ changes…" },
    "the mean vector, but not the covariance matrix",
    [
      ["the covariance matrix, but not the mean vector", "lt-shift-backwards", "A shift moves every realisation by the same amount: the centre moves, the spread does not."],
      ["both the mean vector and the covariance matrix", "lt-shift-adds-cov", "Centring cancels $\\mathbf{b}$, so the covariance is unchanged."],
      ["neither, since $\\mathbf{b}$ is not random", "lt-constant-irrelevant", "A constant still moves the mean: $\\mathbb{E}[\\mathbf{X} + \\mathbf{b}] = \\boldsymbol{\\mu} + \\mathbf{b}$."],
    ],
  ),
  mcq(
    { concept: LT, slug: "recall-shape", cognitive: "recall", level: 2, seconds: 40,
      stem: "$\\mathbf{X} \\in \\mathbb{R}^3$ and $\\mathbf{A}$ is a $2 \\times 3$ matrix. What size is $\\text{Cov}(\\mathbf{A}\\mathbf{X})$?" },
    "$2 \\times 2$",
    [
      ["$3 \\times 3$", "lt-shape-input", "That is the size of $\\boldsymbol{\\Sigma}$; $\\mathbf{A}\\mathbf{X}$ lives in $\\mathbb{R}^2$."],
      ["$2 \\times 3$", "lt-shape-of-a", "That is the size of $\\mathbf{A}$ (and of $\\mathbf{A}\\boldsymbol{\\Sigma}$); a covariance matrix is always square."],
      ["$1 \\times 1$", "lt-shape-scalar", "Only a single row $\\mathbf{a}^\\top$ produces a scalar."],
    ],
  ),
  mcq(
    { concept: LT, slug: "recall-gaussian-closure", cognitive: "recall", level: 2, seconds: 40,
      stem: "$\\mathbf{X} \\sim \\mathcal{N}(\\boldsymbol{\\mu}, \\boldsymbol{\\Sigma})$ is multivariate normal. What is the distribution of $\\mathbf{A}\\mathbf{X} + \\mathbf{b}$?" },
    "$\\mathcal{N}(\\mathbf{A}\\boldsymbol{\\mu} + \\mathbf{b},\\ \\mathbf{A}\\boldsymbol{\\Sigma}\\mathbf{A}^\\top)$",
    [
      ["$\\mathcal{N}(\\mathbf{A}\\boldsymbol{\\mu},\\ \\mathbf{A}\\boldsymbol{\\Sigma}\\mathbf{A}^\\top + \\mathbf{b})$", "lt-shift-in-cov", "The shift belongs to the mean; it does not affect the covariance."],
      ["$\\mathcal{N}(\\mathbf{A}\\boldsymbol{\\mu} + \\mathbf{b},\\ \\mathbf{A}^2\\boldsymbol{\\Sigma})$", "lt-scalar-square", "Copies the scalar rule $a^2\\sigma^2$; for matrices it becomes $\\mathbf{A}\\boldsymbol{\\Sigma}\\mathbf{A}^\\top$."],
      ["Its mean and covariance are known, but it need not be normal", "lt-gaussian-not-closed", "Linear maps of a jointly normal vector are always normal; that is the closure property."],
    ],
  ),
  mcq(
    { concept: LT, slug: "recall-density-formula", cognitive: "recall", level: 2, seconds: 45,
      stem: "$\\mathbf{A}$ is square and invertible and $\\mathbf{X}$ has density $f_{\\mathbf{X}}$. What is the density of $\\mathbf{Y} = \\mathbf{A}\\mathbf{X} + \\mathbf{b}$?" },
    "$f_{\\mathbf{Y}}(\\mathbf{y}) = \\dfrac{1}{|\\det \\mathbf{A}|}\\, f_{\\mathbf{X}}\\!\\left(\\mathbf{A}^{-1}(\\mathbf{y} - \\mathbf{b})\\right)$",
    [
      ["$f_{\\mathbf{Y}}(\\mathbf{y}) = f_{\\mathbf{X}}(\\mathbf{A}\\mathbf{y} + \\mathbf{b})$", "lt-density-forward-map", "The density is evaluated at the preimage $\\mathbf{A}^{-1}(\\mathbf{y} - \\mathbf{b})$, and the volume factor is missing."],
      ["$f_{\\mathbf{Y}}(\\mathbf{y}) = |\\det \\mathbf{A}|\\, f_{\\mathbf{X}}\\!\\left(\\mathbf{A}^{-1}(\\mathbf{y} - \\mathbf{b})\\right)$", "lt-jacobian-inverted", "Stretching volume by $|\\det \\mathbf{A}|$ must lower the density by that factor, not raise it."],
      ["$f_{\\mathbf{Y}}(\\mathbf{y}) = f_{\\mathbf{X}}\\!\\left(\\mathbf{A}^{-1}(\\mathbf{y} - \\mathbf{b})\\right)$", "lt-no-jacobian", "Without the $1/|\\det \\mathbf{A}|$ factor the result does not integrate to $1$ unless $|\\det \\mathbf{A}| = 1$."],
    ],
  ),
  num(
    { concept: LT, slug: "apply-mean-component", cognitive: "apply", level: 2, seconds: 45,
      stem: "$\\mathbb{E}[\\mathbf{X}] = [2, -1]$, $\\mathbf{A} = \\begin{bmatrix} 3 & 1 \\\\ 0 & 2 \\end{bmatrix}$ and $\\mathbf{b} = [1, 1]$. Compute the first component of $\\mathbb{E}[\\mathbf{A}\\mathbf{X} + \\mathbf{b}]$." },
    6,
  ),
  num(
    { concept: LT, slug: "apply-quadratic-form", cognitive: "apply", level: 3, seconds: 60,
      stem: "$\\text{Cov}(\\mathbf{X}) = \\begin{bmatrix} 2 & 1 \\\\ 1 & 3 \\end{bmatrix}$ and $\\mathbf{a} = [1, 2]$. Compute $\\text{Var}(\\mathbf{a}^\\top\\mathbf{X})$." },
    18,
  ),
  num(
    { concept: LT, slug: "apply-sample-mean-variance", cognitive: "apply", level: 3, seconds: 60,
      stem: "$\\mathbf{X} \\in \\mathbb{R}^3$ has $\\text{Cov}(\\mathbf{X}) = 12\\,\\mathbf{I}$. Using $\\bar{X} = \\tfrac{1}{3}\\mathbf{1}^\\top\\mathbf{X}$, compute $\\text{Var}(\\bar{X})$." },
    4,
  ),
  num(
    { concept: LT, slug: "apply-cov-entry", cognitive: "apply", level: 4, seconds: 75,
      stem: "$\\text{Cov}(\\mathbf{X}) = \\begin{bmatrix} 1 & 0.5 \\\\ 0.5 & 2 \\end{bmatrix}$ and $\\mathbf{Y} = \\mathbf{A}\\mathbf{X}$ with $\\mathbf{A} = \\begin{bmatrix} 1 & 0 \\\\ 1 & 1 \\end{bmatrix}$. Compute the $(1, 2)$ entry of $\\text{Cov}(\\mathbf{Y})$." },
    1.5,
  ),
  num(
    { concept: LT, slug: "apply-cov-diagonal", cognitive: "apply", level: 4, seconds: 75,
      stem: "With $\\text{Cov}(\\mathbf{X}) = \\begin{bmatrix} 1 & 0.5 \\\\ 0.5 & 2 \\end{bmatrix}$ and $\\mathbf{A} = \\begin{bmatrix} 1 & 0 \\\\ 1 & 1 \\end{bmatrix}$, compute the $(2, 2)$ entry of $\\mathbf{A}\\,\\text{Cov}(\\mathbf{X})\\,\\mathbf{A}^\\top$." },
    4,
  ),
  num(
    { concept: LT, slug: "apply-cross-covariance", cognitive: "apply", level: 4, seconds: 75,
      stem: "$\\text{Cov}(\\mathbf{X}) = \\begin{bmatrix} 3 & 1 \\\\ 1 & 2 \\end{bmatrix}$. Compute $\\text{Cov}(X_1 + X_2,\\ X_1 - X_2)$." },
    1,
  ),
  num(
    { concept: LT, slug: "apply-uniform-scaled-density", cognitive: "apply", level: 4, seconds: 75,
      stem: "$\\mathbf{X}$ is uniform on the unit square $[0, 1]^2$ and $\\mathbf{Y} = 3\\mathbf{X}$. What is the value of the density of $\\mathbf{Y}$ at any point of $(0, 3)^2$? Give $4$ decimal places." },
    1 / 9,
  ),
  num(
    { concept: LT, slug: "apply-determinant-density", cognitive: "apply", level: 4, seconds: 75,
      stem: "$\\mathbf{X}$ is uniform on $[0, 1]^2$ and $\\mathbf{Y} = \\mathbf{A}\\mathbf{X}$ with $\\mathbf{A} = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$. What is the density of $\\mathbf{Y}$ at points inside the image of the square?" },
    0.5,
  ),
  num(
    { concept: LT, slug: "apply-rank-of-augmented", cognitive: "apply", level: 4, seconds: 75,
      stem: "$\\mathbf{X} \\in \\mathbb{R}^2$ has an invertible covariance matrix, and $\\mathbf{Y} = [X_1,\\ X_2,\\ X_1 + X_2]^\\top$. What is the rank of $\\text{Cov}(\\mathbf{Y})$?" },
    2,
  ),
  mcq(
    { concept: LT, slug: "explain-uniform-sum", cognitive: "explain", level: 4, seconds: 60,
      stem: "$X_1, X_2$ are independent $\\text{Uniform}(0, 1)$. What can be said about $Y = X_1 + X_2$?" },
    "$\\mathbb{E}[Y] = 1$ and $\\text{Var}(Y) = \\tfrac{1}{6}$, but $Y$ is not uniform — its density is triangular on $[0, 2]$",
    [
      ["$Y \\sim \\text{Uniform}(0, 2)$, since linear maps preserve the family", "lt-family-preserved", "Only special families (such as the normal) are closed under linear maps; sums near $1$ are more likely than sums near $0$ or $2$."],
      ["$Y$ is normal, since it is a sum of random variables", "lt-sum-is-normal", "A sum of two uniforms is not normal; the CLT is about many terms and is only approximate."],
      ["Nothing, because the mean and variance cannot be computed without the density of $Y$", "lt-need-density-for-moments", "The mean and covariance rules work directly from those of $\\mathbf{X}$, with no density needed."],
    ],
  ),
  num(
    { concept: LT, slug: "apply-cholesky-entry", cognitive: "apply", level: 5, seconds: 90,
      stem: "Find the lower-triangular $\\mathbf{L}$ with positive diagonal such that $\\mathbf{L}\\mathbf{L}^\\top = \\begin{bmatrix} 9 & 3 \\\\ 3 & 5 \\end{bmatrix}$. What is its $(2, 2)$ entry $\\ell_{22}$?" },
    2,
  ),
  num(
    { concept: LT, slug: "apply-construct-variance", cognitive: "apply", level: 5, seconds: 75,
      stem: "$Z_1, Z_2$ are independent $\\mathcal{N}(0, 1)$ and $\\mathbf{X} = \\mathbf{L}\\mathbf{Z}$ with $\\mathbf{L} = \\begin{bmatrix} 1 & 0 \\\\ 2 & 3 \\end{bmatrix}$. Compute $\\text{Var}(X_2)$." },
    13,
  ),
  num(
    { concept: LT, slug: "apply-gaussian-density-at-zero", cognitive: "apply", level: 5, seconds: 90,
      stem: "$\\mathbf{Z} \\in \\mathbb{R}^2$ has independent $\\mathcal{N}(0, 1)$ components and $\\mathbf{Y} = \\begin{bmatrix} 2 & 0 \\\\ 0 & 1 \\end{bmatrix}\\mathbf{Z}$. Compute $f_{\\mathbf{Y}}(\\mathbf{0})$ to $4$ decimal places." },
    1 / (4 * Math.PI),
  ),
  mcq(
    { concept: LT, slug: "explain-degenerate", cognitive: "explain", level: 5, seconds: 75,
      stem: "$\\mathbf{X} \\in \\mathbb{R}^2$ has an invertible covariance matrix and $\\mathbf{A}$ is a $3 \\times 2$ matrix. What must be true of $\\mathbf{Y} = \\mathbf{A}\\mathbf{X}$?" },
    "$\\text{Cov}(\\mathbf{Y})$ is singular, so $\\mathbf{Y}$ has no density on $\\mathbb{R}^3$ and lies on a plane (or lower-dimensional flat)",
    [
      ["$\\text{Cov}(\\mathbf{Y})$ is $3 \\times 3$ and invertible, because $\\boldsymbol{\\Sigma}$ is", "lt-rank-inflates", "$\\text{rank}(\\mathbf{A}\\boldsymbol{\\Sigma}\\mathbf{A}^\\top) \\le 2 < 3$: a linear map cannot create new dimensions of randomness."],
      ["$\\mathbf{Y}$ is undefined because $\\mathbf{A}$ is not square", "lt-needs-square", "$\\mathbf{A}\\mathbf{X}$ is defined for any conformable $\\mathbf{A}$; only the density formula needs a square, invertible $\\mathbf{A}$."],
      ["$\\text{Cov}(\\mathbf{Y})$ is $2 \\times 2$", "lt-shape-input", "$\\mathbf{Y}$ has $3$ components, so its covariance matrix is $3 \\times 3$ — just not of full rank."],
    ],
  ),
  num(
    { concept: LT, slug: "apply-pca-variance", cognitive: "apply", level: 5, seconds: 90,
      stem: "$\\text{Cov}(\\mathbf{X}) = \\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}$. $\\mathbf{Y} = \\mathbf{Q}^\\top\\mathbf{X}$, where the columns of $\\mathbf{Q}$ are orthonormal eigenvectors of $\\text{Cov}(\\mathbf{X})$. What is the largest variance among the components of $\\mathbf{Y}$?" },
    3,
  ),
  short(
    { concept: LT, slug: "explain-derive-covariance-rule", cognitive: "explain", level: 6, seconds: 180,
      stem: "Derive $\\text{Cov}(\\mathbf{A}\\mathbf{X} + \\mathbf{b}) = \\mathbf{A}\\boldsymbol{\\Sigma}\\mathbf{A}^\\top$ from the definition $\\text{Cov}(\\mathbf{Y}) = \\mathbb{E}\\!\\left[(\\mathbf{Y} - \\mathbb{E}[\\mathbf{Y}])(\\mathbf{Y} - \\mathbb{E}[\\mathbf{Y}])^\\top\\right]$." },
    [
      ["centre", "Shows $\\mathbf{Y} - \\mathbb{E}[\\mathbf{Y}] = \\mathbf{A}(\\mathbf{X} - \\boldsymbol{\\mu})$, so $\\mathbf{b}$ cancels.", 3, true],
      ["transpose", "Uses $(\\mathbf{A}\\mathbf{v})^\\top = \\mathbf{v}^\\top\\mathbf{A}^\\top$ to write the outer product as $\\mathbf{A}(\\mathbf{X} - \\boldsymbol{\\mu})(\\mathbf{X} - \\boldsymbol{\\mu})^\\top\\mathbf{A}^\\top$.", 3, true],
      ["pull-out", "Moves the fixed $\\mathbf{A}$ and $\\mathbf{A}^\\top$ outside the expectation to get $\\mathbf{A}\\boldsymbol{\\Sigma}\\mathbf{A}^\\top$.", 3, true],
    ],
  ),
  num(
    { concept: LT, slug: "apply-gaussian-probability", cognitive: "apply", level: 6, seconds: 120,
      stem: "$\\mathbf{X} \\sim \\mathcal{N}\\!\\left([1, 2],\\ \\begin{bmatrix} 1 & 0.5 \\\\ 0.5 & 2 \\end{bmatrix}\\right)$. Compute $P(X_1 > X_2)$ to $4$ decimal places." },
    0.2398,
  ),
  num(
    { concept: LT, slug: "apply-decorrelate", cognitive: "apply", level: 6, seconds: 120,
      stem: "$\\mathbf{X} \\sim \\mathcal{N}\\!\\left(\\mathbf{0},\\ \\begin{bmatrix} 4 & 2 \\\\ 2 & 3 \\end{bmatrix}\\right)$. For what constant $c$ is $X_2 - cX_1$ independent of $X_1$?" },
    0.5,
  ),
  num(
    { concept: LT, slug: "apply-triangle-density", cognitive: "apply", level: 6, seconds: 120,
      stem: "$X_1, X_2$ are independent $\\text{Uniform}(0, 1)$. Using the transformation $Y_1 = X_1 + X_2$, $Y_2 = X_2$ and integrating out $y_2$, find the density of $Y_1$ at $y_1 = 1.5$." },
    0.5,
  ),
  mcq(
    { concept: LT, slug: "explain-normal-marginals", cognitive: "explain", level: 6, seconds: 90,
      stem: "$X_1 \\sim \\mathcal{N}(0, 1)$ and $X_2 = SX_1$, where $S = \\pm 1$ with probability $\\tfrac{1}{2}$ each, independent of $X_1$. Why does the closure rule not show that $X_1 + X_2$ is normal?" },
    "$X_1$ and $X_2$ are each normal, but $[X_1, X_2]^\\top$ is not jointly normal — indeed $X_1 + X_2 = 0$ with probability $\\tfrac{1}{2}$",
    [
      ["Because $X_2$ is not normal", "lt-sign-flip-not-normal", "By symmetry $SX_1 \\sim \\mathcal{N}(0, 1)$; each marginal is normal."],
      ["The closure rule does apply, so $X_1 + X_2 \\sim \\mathcal{N}(0, 2)$", "lt-marginals-suffice", "The rule needs a jointly normal vector; normal marginals alone are not enough."],
      ["Because $X_1$ and $X_2$ are correlated", "lt-correlation-breaks-closure", "Correlation is no obstacle (jointly normal vectors are usually correlated); here in fact $\\text{Cov}(X_1, X_2) = 0$."],
    ],
  ),
  mcq(
    { concept: LT, slug: "explain-mean-residual-uncorrelated", cognitive: "explain", level: 7, seconds: 120,
      stem: "$\\text{Cov}(\\mathbf{X}) = \\sigma^2\\mathbf{I}_n$. Why are $\\bar{X}$ and the residual $X_1 - \\bar{X}$ uncorrelated?" },
    "Both are linear maps of $\\mathbf{X}$, $\\mathbf{a}^\\top\\mathbf{X}$ and $\\mathbf{c}^\\top\\mathbf{X}$, and $\\text{Cov} = \\sigma^2\\mathbf{a}^\\top\\mathbf{c} = \\sigma^2\\left(\\tfrac{1}{n} - n \\cdot \\tfrac{1}{n^2}\\right) = 0$",
    [
      ["Because $\\bar{X}$ and $X_1$ are independent", "lt-mean-indep-component", "$\\bar{X}$ contains $X_1$, so $\\text{Cov}(\\bar{X}, X_1) = \\sigma^2/n \\ne 0$; the cancellation comes from subtracting $\\bar{X}$."],
      ["Because residuals always have mean $0$", "lt-mean-zero-uncorrelated", "A zero mean says nothing about covariance with another variable."],
      ["They are uncorrelated only when $\\mathbf{X}$ is normal", "lt-needs-normality", "Uncorrelatedness follows from $\\mathbf{A}\\boldsymbol{\\Sigma}\\mathbf{B}^\\top = \\mathbf{0}$ alone; normality is needed only to upgrade it to independence."],
    ],
  ),
  num(
    { concept: LT, slug: "transfer-whitening-distance", cognitive: "transfer", level: 7, seconds: 150,
      stem: "$\\boldsymbol{\\Sigma} = \\mathbf{L}\\mathbf{L}^\\top$ with $\\mathbf{L} = \\begin{bmatrix} 2 & 0 \\\\ 1 & 2 \\end{bmatrix}$, and an observation has $\\mathbf{x} - \\boldsymbol{\\mu} = [2, 3]$. Compute the squared length $\\|\\mathbf{z}\\|^2$ of the whitened vector $\\mathbf{z} = \\mathbf{L}^{-1}(\\mathbf{x} - \\boldsymbol{\\mu})$." },
    2,
  ),
  num(
    { concept: LT, slug: "transfer-portfolio-var", cognitive: "transfer", level: 7, seconds: 180,
      stem: "Daily returns are $\\mathbf{X} \\sim \\mathcal{N}\\!\\left([0.01, 0.02],\\ \\begin{bmatrix} 0.04 & 0.01 \\\\ 0.01 & 0.09 \\end{bmatrix}\\right)$, and a portfolio holds $\\mathbf{w} = [0.5, 0.5]$. Find the $5\\%$ quantile of the portfolio return $\\mathbf{w}^\\top\\mathbf{X}$, to $3$ decimal places. (Use $z_{0.95} = 1.6449$.)" },
    -0.3035,
  ),
  short(
    { concept: LT, slug: "transfer-exponential-sum", cognitive: "transfer", level: 8, seconds: 300,
      stem: "$X_1, X_2$ are independent $\\text{Exponential}(1)$. Use the invertible transformation $Y_1 = X_1 + X_2$, $Y_2 = X_2$ to find the density of $Y_1$." },
    [
      ["jacobian", "Writes $\\mathbf{A} = \\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix}$ with $|\\det \\mathbf{A}| = 1$, and inverse $x_1 = y_1 - y_2$, $x_2 = y_2$.", 3, true],
      ["joint", "Gets $f_{\\mathbf{Y}}(y_1, y_2) = e^{-(y_1 - y_2)}e^{-y_2} = e^{-y_1}$ on the region $0 < y_2 < y_1$.", 3, true],
      ["marginal", "Integrates $y_2$ from $0$ to $y_1$ to get $f_{Y_1}(y_1) = y_1 e^{-y_1}$ for $y_1 > 0$ (a $\\text{Gamma}(2, 1)$ density).", 3, true],
    ],
  ),
  num(
    { concept: LT, slug: "transfer-orthant-probability", cognitive: "transfer", level: 9, seconds: 360,
      stem: "$\\mathbf{X} \\sim \\mathcal{N}\\!\\left(\\mathbf{0},\\ \\begin{bmatrix} 1 & 0.6 \\\\ 0.6 & 1 \\end{bmatrix}\\right)$. By writing $\\mathbf{X} = \\mathbf{L}\\mathbf{Z}$ for independent standard normals and using the rotational symmetry of $\\mathbf{Z}$, compute $P(X_1 > 0, X_2 > 0)$ to $4$ decimal places." },
    0.25 + Math.asin(0.6) / (2 * Math.PI),
  ),
];

export const randomVectorItems: Item[] = [...randomVectors, ...linearTransformations];
