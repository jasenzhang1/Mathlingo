export type Domain =
  | "discrete-math"
  | "probability"
  | "linear-algebra"
  | "multivariate-probability"
  | "statistics"
  | "regression"
  | "machine-learning"
  | "deep-learning"
  | "graphical-models"
  | "stochastic-processes"
  | "stochastic-calculus"
  | "financial-instruments"
  | "time-series"
  | "python";

export interface DomainMeta {
  label: string;
  color: string;
}

export const domainMeta: Record<Domain, DomainMeta> = {
  "discrete-math": { label: "Discrete Math Fundamentals", color: "#be185d" },
  probability: { label: "Probability", color: "#5b3df0" },
  "linear-algebra": { label: "Linear Algebra", color: "#0f9a8e" },
  "multivariate-probability": {
    label: "Multivariate & Asymptotics",
    color: "#d1495b",
  },
  statistics: { label: "Statistical Inference", color: "#e0a72f" },
  regression: { label: "Regression", color: "#2f6fed" },
  "machine-learning": { label: "Machine Learning", color: "#16a34a" },
  "deep-learning": { label: "Deep Learning", color: "#ec4899" },
  "graphical-models": { label: "Graphical Models & Bayesian ML", color: "#a855f7" },
  "stochastic-processes": { label: "Stochastic Processes", color: "#c2410c" },
  "stochastic-calculus": { label: "Stochastic Calculus", color: "#0891b2" },
  "financial-instruments": { label: "Financial Instruments", color: "#7c3aed" },
  "time-series": { label: "Stochastic Processes & Time Series", color: "#c2410c" },
  /**
   * Deliberately last. Chapter order is an editorial call (see
   * `lib/learningOrder.ts`), and the math spine is the book — Python is the
   * toolkit you carry through it. It is also the one chapter with no edges into
   * or out of the rest of the graph, so a learner can read it cold, first or
   * last, without any of the ordering above changing meaning.
   */
  python: { label: "Python for Data Work", color: "#ea7317" },
};

export interface Concept {
  id: string;
  title: string;
  domain: Domain;
  blurb: string;
  /** ids of concepts that should be understood first */
  prerequisites: string[];
  /** URL of an embedded lesson (e.g. a Canva presentation), if one exists yet */
  embedUrl?: string;
}

export const concepts: Concept[] = [
  // ---------------------------------------------------------------------
  // Discrete Math Fundamentals
  // ---------------------------------------------------------------------
  {
    id: "propositional-logic",
    title: "Propositional Logic",
    domain: "discrete-math",
    blurb: "If-then, iff, not, and, or — statements, connectives, and truth tables.",
    prerequisites: [],
  },
  {
    id: "logical-equivalences",
    title: "Logical Equivalences & Quantifiers",
    domain: "discrete-math",
    blurb: "De Morgan's laws, contrapositives, and the ∀/∃ quantifiers that state theorems.",
    prerequisites: ["propositional-logic"],
  },
  {
    id: "direct-proof",
    title: "Direct Proof",
    domain: "discrete-math",
    blurb: "Chaining if-then statements from hypothesis to conclusion.",
    prerequisites: ["logical-equivalences"],
  },
  {
    id: "proof-by-contradiction",
    title: "Proof by Contradiction",
    domain: "discrete-math",
    blurb: "Assuming the negation of what you want and deriving an absurdity.",
    prerequisites: ["logical-equivalences"],
  },
  {
    id: "mathematical-induction",
    title: "Mathematical Induction",
    domain: "discrete-math",
    blurb: "Proving a statement for every n from a base case and an inductive step.",
    prerequisites: ["direct-proof"],
  },
  {
    id: "strong-induction",
    title: "Strong Induction",
    domain: "discrete-math",
    blurb: "Proving the inductive step from every smaller case, not just the one before it.",
    prerequisites: ["mathematical-induction"],
  },
  {
    id: "recursion",
    title: "Recursion & Recurrence Relations",
    domain: "discrete-math",
    blurb: "Defining a sequence or structure in terms of smaller instances of itself.",
    prerequisites: ["strong-induction"],
  },
  {
    id: "fibonacci-numbers",
    title: "Fibonacci Numbers",
    domain: "discrete-math",
    blurb: "The recurrence F(n) = F(n-1) + F(n-2), and the closed form hiding inside it.",
    prerequisites: ["recursion"],
  },
  {
    id: "set-theory",
    title: "Set Theory",
    domain: "discrete-math",
    blurb: "Unions, intersections, complements — the language everything else is written in.",
    prerequisites: [],
  },
  {
    id: "power-set",
    title: "Power Set",
    domain: "discrete-math",
    blurb: "The set of all subsets of a set, and why it has 2^n elements.",
    prerequisites: ["set-theory"],
  },
  {
    id: "cartesian-product",
    title: "Cartesian Product",
    domain: "discrete-math",
    blurb: "Pairing every element of one set with every element of another.",
    prerequisites: ["set-theory"],
  },
  {
    id: "proof-by-sets",
    title: "Proof by Sets (Double Inclusion)",
    domain: "discrete-math",
    blurb: "Proving two sets equal by showing each is a subset of the other, or by chasing a single element.",
    prerequisites: ["set-theory", "direct-proof"],
  },
  {
    id: "functions-relations",
    title: "Functions & Relations",
    domain: "discrete-math",
    blurb: "Domains, codomains, and the correspondence rules that connect them.",
    prerequisites: ["set-theory"],
  },
  {
    id: "equivalence-relations",
    title: "Equivalence Relations & Partitions",
    domain: "discrete-math",
    blurb: "Reflexive, symmetric, transitive relations, and the partition of a set they induce.",
    prerequisites: ["functions-relations"],
  },
  {
    id: "injections-surjections-bijections",
    title: "Injections, Surjections, and Bijections",
    domain: "discrete-math",
    blurb: "One-to-one, onto, and both at once — and what each says about the sets involved.",
    prerequisites: ["functions-relations"],
  },
  {
    id: "cardinality",
    title: "Cardinality & Countability",
    domain: "discrete-math",
    blurb: "Comparing the size of infinite sets with a bijection instead of a count.",
    prerequisites: ["injections-surjections-bijections"],
  },
  {
    id: "counting-methods",
    title: "Counting Methods",
    domain: "discrete-math",
    blurb: "The rule of sum and rule of product — the two principles everything else in combinatorics builds from.",
    prerequisites: ["set-theory"],
  },
  {
    id: "pigeonhole-principle",
    title: "Pigeonhole Principle",
    domain: "discrete-math",
    blurb: "If you stuff more pigeons than holes, some hole gets at least two.",
    prerequisites: ["counting-methods"],
  },
  {
    id: "factorials",
    title: "Factorials",
    domain: "discrete-math",
    blurb: "n! — the number of ways to arrange n distinct objects in order.",
    prerequisites: ["counting-methods"],
  },
  {
    id: "permutations",
    title: "Permutations",
    domain: "discrete-math",
    blurb: "Ordered selections of k objects from n, and where n!/(n-k)! comes from.",
    prerequisites: ["factorials"],
  },
  {
    id: "combinations",
    title: "Combinations",
    domain: "discrete-math",
    blurb: "Unordered selections of k objects from n — permutations with the ordering divided back out.",
    prerequisites: ["permutations"],
  },
  {
    id: "stars-and-bars",
    title: "Stars and Bars",
    domain: "discrete-math",
    blurb: "Counting the ways to split n identical items into k groups.",
    prerequisites: ["combinations"],
  },
  {
    id: "integer-partitions",
    title: "Integer Partitions",
    domain: "discrete-math",
    blurb: "Splitting n into a sum of positive integers where order doesn't matter — unlike stars and bars, the groups aren't labeled.",
    prerequisites: ["stars-and-bars"],
  },
  {
    id: "binomial-theorem",
    title: "Binomial Theorem",
    domain: "discrete-math",
    blurb: "Expanding (a + b)^n, and where those binomial coefficients come from.",
    prerequisites: ["combinations"],
  },
  // ---------------------------------------------------------------------
  // Probability
  // ---------------------------------------------------------------------
  {
    id: "pie-boole",
    title: "PIE, Boole's Inequality",
    domain: "probability",
    blurb: "Counting overlapping sets, and bounding the probability of a union.",
    prerequisites: ["set-theory"],
  },
  {
    id: "sigma-algebra",
    title: "Sigma Algebra",
    domain: "probability",
    blurb: "The collection of events we're allowed to assign a probability to.",
    prerequisites: ["set-theory"],
  },
  {
    id: "axioms-of-probability",
    title: "Axioms of Probability",
    domain: "probability",
    blurb: "The three rules that make something a valid probability measure.",
    prerequisites: ["sigma-algebra"],
  },
  {
    id: "probability-function",
    title: "Probability Function",
    domain: "probability",
    blurb: "Assigning a number in [0,1] to every event, consistently.",
    prerequisites: ["axioms-of-probability"],
  },
  {
    id: "conditional-probability",
    title: "Conditional Probability",
    domain: "probability",
    blurb: "Updating a probability once you know another event occurred.",
    prerequisites: ["probability-function"],
  },
  {
    id: "bayes-rule",
    title: "Bayes' Rule",
    domain: "probability",
    blurb: "Flipping a conditional probability around: P(A|B) from P(B|A).",
    prerequisites: ["conditional-probability"],
  },
  {
    id: "independence-set-theory",
    title: "Independence (Set Theory)",
    domain: "probability",
    blurb: "When knowing one event tells you nothing about another.",
    prerequisites: ["probability-function"],
  },
  {
    id: "mutual-independence",
    title: "Mutual Independence",
    domain: "probability",
    blurb: "Independence that holds across every subset of a collection of events.",
    prerequisites: ["independence-set-theory"],
  },
  {
    id: "random-variables",
    title: "Random Variables",
    domain: "probability",
    blurb: "Mapping outcomes of a random experiment to numbers.",
    prerequisites: ["probability-function"],
  },
  {
    id: "discrete-vs-continuous-random-variables",
    title: "Discrete vs Continuous Random Variables",
    domain: "probability",
    blurb: "Countable outcomes versus a continuum — and why each needs its own toolkit.",
    prerequisites: ["random-variables"],
  },
  {
    id: "cdf",
    title: "Cumulative Distribution Function (CDF)",
    domain: "probability",
    blurb: "P(X ≤ x) as a function of x — works for any random variable.",
    prerequisites: ["random-variables"],
  },
  {
    id: "pmf",
    title: "Probability Mass Function (PMF)",
    domain: "probability",
    blurb: "The probability a discrete random variable takes each exact value.",
    prerequisites: ["discrete-vs-continuous-random-variables", "cdf"],
  },
  {
    id: "pdf",
    title: "Probability Density Function (PDF)",
    domain: "probability",
    blurb: "The density whose area under a curve gives probability for continuous variables.",
    prerequisites: ["discrete-vs-continuous-random-variables", "cdf"],
  },
  {
    id: "bernoulli-binomial",
    title: "Bernoulli and Binomial Distributions",
    domain: "probability",
    blurb: "A single yes/no trial, and the count of successes over many of them.",
    // The lesson states E[X] = np and Var(X) = np(1 - p), so it genuinely needs
    // both. `pmf` and `expectation` are transitively implied via `variance` and
    // are dropped from the map by the transitive reduction; they are listed here
    // because they are real requirements of the lesson.
    prerequisites: [
      "pmf",
      "binomial-theorem",
      "mutual-independence",
      "expectation",
      "variance",
    ],
    embedUrl:
      "https://vanessawong.my.canva.site/024-bernoulli-and-binomial-distributions",
  },
  {
    id: "poisson-distribution",
    title: "Poisson Distribution",
    domain: "probability",
    blurb: "Counting rare events over a fixed window of time or space.",
    prerequisites: ["bernoulli-binomial"],
  },
  {
    id: "hypergeometric-distribution",
    title: "Hypergeometric Distribution",
    domain: "probability",
    blurb: "Sampling without replacement from a finite population of two types.",
    // Mean nK/N, and a variance carrying the finite-population correction.
    prerequisites: ["counting-methods", "pmf", "expectation", "variance"],
  },
  {
    id: "geometric-distribution",
    title: "Geometric Distribution",
    domain: "probability",
    blurb: "The number of trials until the first success.",
    prerequisites: ["bernoulli-binomial"],
  },
  {
    id: "negative-binomial-distribution",
    title: "Negative Binomial Distribution",
    domain: "probability",
    blurb: "The number of trials until a fixed number of successes.",
    prerequisites: ["geometric-distribution"],
  },
  {
    id: "normal-distribution",
    title: "Normal Distribution",
    domain: "probability",
    blurb: "The bell curve, and why it shows up everywhere.",
    // Parameterised by its mean and variance, so it depends on both more
    // directly than any other distribution. Adding them here is also what
    // carries Expectation and Variance to the rest of the continuous branch:
    // Chi-Square, t, and F all reach them through Normal or Gamma.
    prerequisites: ["pdf", "expectation", "variance"],
  },
  {
    id: "uniform-distribution",
    title: "Uniform Distribution",
    domain: "probability",
    blurb: "Every outcome in a range is equally likely.",
    // Mean (a + b)/2 and variance (b - a)^2/12.
    prerequisites: ["pdf", "expectation", "variance"],
  },
  {
    id: "exponential-distribution",
    title: "Exponential Distribution",
    domain: "probability",
    blurb: "The waiting time between events in a Poisson process.",
    prerequisites: ["pdf", "poisson-distribution"],
  },
  {
    id: "gamma-distribution",
    title: "Gamma Distribution",
    domain: "probability",
    blurb: "The waiting time until several Poisson events have occurred.",
    prerequisites: ["exponential-distribution"],
  },
  {
    id: "beta-distribution",
    title: "Beta Distribution",
    domain: "probability",
    blurb: "A distribution over probabilities themselves, built from two Gammas.",
    prerequisites: ["gamma-distribution"],
  },
  {
    id: "chi-square-distribution",
    title: "Chi Square Distribution",
    domain: "probability",
    blurb: "The distribution of a sum of squared standard normals.",
    prerequisites: ["normal-distribution", "gamma-distribution"],
  },
  {
    id: "t-distribution",
    title: "Student's t-Distribution",
    domain: "probability",
    blurb: "Like the normal, but heavier-tailed to account for an estimated variance.",
    prerequisites: ["normal-distribution", "chi-square-distribution"],
  },
  {
    id: "f-distribution",
    title: "F-Distribution",
    domain: "probability",
    blurb: "The ratio of two chi-square distributions — the backbone of ANOVA.",
    prerequisites: ["chi-square-distribution"],
  },
  {
    id: "expectation",
    title: "Expectation",
    domain: "probability",
    blurb: "The long-run average value of a random variable.",
    prerequisites: ["pmf", "pdf"],
  },
  {
    id: "variance",
    title: "Variance",
    domain: "probability",
    blurb: "How spread out a random variable is around its mean.",
    prerequisites: ["expectation"],
  },
  {
    id: "joint-distribution",
    title: "Joint Distribution",
    domain: "probability",
    blurb: "The behavior of two or more random variables considered together.",
    prerequisites: ["random-variables"],
  },
  {
    id: "marginal-distribution",
    title: "Marginal Distribution",
    domain: "probability",
    blurb: "Recovering the distribution of one variable from a joint distribution.",
    prerequisites: ["joint-distribution"],
  },
  {
    id: "conditional-distribution",
    title: "Conditional Distribution",
    domain: "probability",
    blurb: "The distribution of one variable given the value of another.",
    prerequisites: ["joint-distribution", "conditional-probability"],
  },
  {
    id: "covariance",
    title: "Covariance",
    domain: "probability",
    blurb: "Whether two random variables tend to move together.",
    prerequisites: ["expectation", "joint-distribution"],
  },
  {
    id: "law-of-total-expectation",
    title: "Law of Total Expectation",
    domain: "probability",
    blurb: "Computing a mean by averaging conditional means.",
    prerequisites: ["expectation", "conditional-distribution"],
  },
  {
    id: "mgf",
    title: "Moment Generating Function (MGF)",
    domain: "probability",
    blurb: "A function that encodes every moment of a distribution.",
    prerequisites: ["expectation"],
  },
  {
    id: "mgf-properties",
    title: "MGF Properties and Applications",
    domain: "probability",
    blurb: "Using MGFs to identify distributions and sums of independent variables.",
    prerequisites: ["mgf"],
  },
  {
    id: "likelihood-vs-probability",
    title: "Likelihood vs Probability",
    domain: "probability",
    blurb: "Same function, two readings: fixed data vs. fixed parameter.",
    prerequisites: ["probability-function", "pmf", "pdf"],
  },
  {
    id: "method-of-moments",
    title: "Method of Moments Estimation",
    domain: "probability",
    blurb: "Estimating parameters by matching sample moments to theoretical ones.",
    prerequisites: ["expectation"],
  },
  {
    id: "mle",
    title: "Maximum Likelihood Estimation",
    domain: "probability",
    blurb: "Choosing the parameter value that makes the observed data most likely.",
    prerequisites: ["likelihood-vs-probability"],
  },
  {
    id: "unbiased-estimator",
    title: "Unbiased Estimator",
    domain: "probability",
    blurb: "An estimator whose average value equals the true parameter.",
    prerequisites: ["mle", "method-of-moments"],
  },
  {
    id: "distribution-transformations",
    title: "Distribution Transformations",
    domain: "probability",
    blurb: "Finding the distribution of a function of a random variable.",
    prerequisites: ["pdf", "pmf"],
  },
  {
    id: "exponential-family",
    title: "Exponential Family",
    domain: "probability",
    blurb: "A common form that unifies the Normal, Poisson, Binomial, and more.",
    prerequisites: ["pmf", "pdf", "mgf"],
  },
  {
    id: "power",
    title: "Power",
    domain: "probability",
    blurb: "The probability a hypothesis test correctly detects a real effect.",
    prerequisites: ["hypothesis-test", "type-i-ii-error"],
  },
  {
    id: "sufficient-statistic",
    title: "Sufficient Statistic",
    domain: "probability",
    blurb: "A statistic that captures everything the data says about a parameter.",
    prerequisites: ["likelihood-vs-probability", "mle"],
  },
  {
    id: "correlation",
    title: "Correlation",
    domain: "probability",
    blurb: "A scale-free measure of how linearly two variables relate.",
    prerequisites: ["covariance", "variance"],
  },
  {
    id: "law-of-total-variance",
    title: "Law of Total Variance",
    domain: "probability",
    blurb: "Splitting variance into an expected-within-group part and a between-group part.",
    prerequisites: ["variance", "law-of-total-expectation"],
  },
  {
    id: "markov-inequality",
    title: "Markov's Inequality",
    domain: "probability",
    blurb: "A crude but universal bound on how far a nonnegative variable can stray.",
    prerequisites: ["expectation"],
  },
  {
    id: "chebyshev-inequality",
    title: "Chebyshev's Inequality",
    domain: "probability",
    blurb: "Bounding the chance of deviating from the mean, using only the variance.",
    prerequisites: ["markov-inequality", "variance"],
  },
  {
    id: "jensen-inequality",
    title: "Jensen's Inequality",
    domain: "probability",
    blurb: "For convex functions, the average of f(X) is at least f of the average.",
    prerequisites: ["expectation"],
  },
  {
    id: "modes-of-convergence",
    title: "Modes of Convergence",
    domain: "probability",
    blurb: "The different senses in which a sequence of random variables can settle down.",
    prerequisites: ["random-variables"],
  },
  {
    id: "law-of-large-numbers",
    title: "Law of Large Numbers",
    domain: "probability",
    blurb: "Why sample averages converge to the true mean as data piles up.",
    prerequisites: ["modes-of-convergence", "chebyshev-inequality"],
  },
  {
    id: "order-statistics",
    title: "Order Statistics",
    domain: "probability",
    blurb: "The distribution of a sample's min, max, median, and everything between.",
    prerequisites: ["cdf", "random-variables"],
  },
  {
    id: "fisher-information",
    title: "Fisher Information",
    domain: "probability",
    blurb: "How much a sample tells you about an unknown parameter.",
    prerequisites: ["likelihood-vs-probability", "mle"],
  },
  {
    id: "cramer-rao-lower-bound",
    title: "Cramér–Rao Lower Bound",
    domain: "probability",
    blurb: "The best possible variance any unbiased estimator can achieve.",
    prerequisites: ["fisher-information", "unbiased-estimator"],
  },

  // ---------------------------------------------------------------------
  // Linear Algebra
  // ---------------------------------------------------------------------
  {
    id: "vectors",
    title: "Vectors",
    domain: "linear-algebra",
    blurb: "Ordered lists of numbers representing a point or direction.",
    prerequisites: [],
  },
  {
    id: "vector-operations",
    title: "Vector Operations",
    domain: "linear-algebra",
    blurb: "Adding vectors and scaling them.",
    prerequisites: ["vectors"],
  },
  {
    id: "dot-product",
    title: "Dot Product",
    domain: "linear-algebra",
    blurb: "Multiplying two vectors together to get a single number.",
    prerequisites: ["vector-operations"],
  },
  {
    id: "vector-norm",
    title: "Vector Norm",
    domain: "linear-algebra",
    blurb: "Measuring the length of a vector.",
    prerequisites: ["dot-product"],
  },
  {
    id: "cauchy-schwarz",
    title: "Cauchy-Schwarz Inequality",
    domain: "linear-algebra",
    blurb: "The dot product of two vectors is bounded by the product of their lengths.",
    prerequisites: ["dot-product", "vector-norm"],
  },
  {
    id: "vector-angles",
    title: "Vector Angles",
    domain: "linear-algebra",
    blurb: "Recovering the angle between two vectors from their dot product.",
    prerequisites: ["cauchy-schwarz"],
  },
  {
    id: "vector-projection",
    title: "Vector Projection",
    domain: "linear-algebra",
    blurb: "Casting one vector's shadow onto another.",
    prerequisites: ["dot-product", "vector-norm"],
  },
  {
    id: "linear-dependence",
    title: "Linear Dependence",
    domain: "linear-algebra",
    blurb: "When one vector can be written as a combination of the others.",
    prerequisites: ["vector-operations"],
  },
  {
    id: "orthogonal-vectors",
    title: "Orthogonal Vectors",
    domain: "linear-algebra",
    blurb: "Vectors that meet at a right angle — dot product zero.",
    prerequisites: ["dot-product"],
  },
  {
    id: "matrix-multiplication",
    title: "Matrix Multiplication",
    domain: "linear-algebra",
    blurb: "Combining matrices row by column — and what it really means.",
    prerequisites: ["vector-operations"],
  },
  {
    id: "matrices",
    title: "Matrices",
    domain: "linear-algebra",
    blurb: "Rectangular arrays of numbers that represent linear maps.",
    prerequisites: ["matrix-multiplication"],
  },
  {
    id: "trace",
    title: "Trace",
    domain: "linear-algebra",
    blurb: "The sum of a matrix's diagonal entries, and its surprising invariances.",
    prerequisites: ["matrices"],
  },
  {
    id: "linear-transformations",
    title: "Linear Transformations",
    domain: "linear-algebra",
    blurb: "Functions between vector spaces that preserve addition and scaling.",
    prerequisites: ["matrices"],
  },
  {
    // Added to give `gradient-descent` and the neural-network branch of
    // machine-learning something to stand on: the graph previously had no
    // concept defining what a gradient or a Jacobian even is, despite
    // gradient-descent being named after one. Grounded in Math for Machine
    // Learning ch. 5 (Vector Calculus) and Strang's treatment of gradients
    // in the optimization chapters of Linear Algebra and Learning from Data.
    id: "matrix-calculus",
    title: "Matrix Calculus (Gradients & Jacobians)",
    domain: "linear-algebra",
    blurb: "The gradient of a scalar function and the Jacobian of a vector function, in vector form.",
    prerequisites: ["linear-transformations", "vector-norm"],
  },
  {
    id: "vector-spaces",
    title: "Vector Spaces",
    domain: "linear-algebra",
    blurb: "The abstract rules any collection of 'vectors' must satisfy.",
    prerequisites: ["vector-operations"],
  },
  {
    id: "span",
    title: "Span",
    domain: "linear-algebra",
    blurb: "Every vector reachable by combining a given set of vectors.",
    prerequisites: ["vector-spaces", "linear-dependence"],
  },
  {
    id: "basis",
    title: "Basis",
    domain: "linear-algebra",
    blurb: "A minimal set of vectors that spans an entire space.",
    prerequisites: ["span", "linear-dependence"],
  },
  {
    id: "change-of-basis",
    title: "Change of Basis",
    domain: "linear-algebra",
    blurb: "Rewriting the same vector's coordinates in a different basis.",
    prerequisites: ["basis", "linear-transformations"],
  },
  {
    id: "four-fundamental-subspaces",
    title: "Four Fundamental Subspaces",
    domain: "linear-algebra",
    blurb: "The column, null, row, and left null spaces of a matrix.",
    prerequisites: ["linear-transformations", "vector-spaces"],
  },
  {
    id: "column-space",
    title: "Column Space",
    domain: "linear-algebra",
    blurb: "Every output a matrix can possibly produce.",
    prerequisites: ["four-fundamental-subspaces"],
  },
  {
    id: "null-space",
    title: "Null Space",
    domain: "linear-algebra",
    blurb: "Every input a matrix collapses to zero.",
    prerequisites: ["four-fundamental-subspaces"],
  },
  {
    id: "row-space",
    title: "Row Space",
    domain: "linear-algebra",
    blurb: "The span of a matrix's rows.",
    prerequisites: ["four-fundamental-subspaces"],
  },
  {
    id: "left-null-space",
    title: "Left Null Space",
    domain: "linear-algebra",
    blurb: "The null space of a matrix's transpose.",
    prerequisites: ["four-fundamental-subspaces"],
  },
  {
    id: "matmul-four-fundamental-subspaces",
    title: "Matmul on Four Fundamental Subspaces",
    domain: "linear-algebra",
    blurb: "How multiplying by a matrix moves vectors between the four subspaces.",
    prerequisites: ["column-space", "null-space", "row-space", "left-null-space"],
  },
  {
    id: "disjointness-four-fundamental-subspaces",
    title: "Disjointness of Four Fundamental Subspaces",
    domain: "linear-algebra",
    blurb: "Why the row space and null space (and column space and left null space) are orthogonal complements.",
    prerequisites: ["matmul-four-fundamental-subspaces"],
  },
  {
    id: "rank",
    title: "Rank",
    domain: "linear-algebra",
    blurb: "The dimension of a matrix's column space — its true degrees of freedom.",
    prerequisites: ["column-space", "row-space"],
  },
  {
    id: "rank-nullity-theorem",
    title: "Rank-Nullity Theorem",
    domain: "linear-algebra",
    blurb: "Rank plus nullity always equals the number of columns.",
    prerequisites: ["rank", "null-space"],
  },
  {
    id: "orthonormal-basis",
    title: "Orthonormal Basis",
    domain: "linear-algebra",
    blurb: "A basis whose vectors are mutually perpendicular and unit length.",
    prerequisites: ["basis", "orthogonal-vectors"],
  },
  {
    id: "gram-schmidt",
    title: "Gram-Schmidt Algorithm",
    domain: "linear-algebra",
    blurb: "Turning any basis into an orthonormal one, one vector at a time.",
    prerequisites: ["orthonormal-basis"],
  },
  {
    id: "qr-decomposition",
    title: "QR Decomposition",
    domain: "linear-algebra",
    blurb: "Factoring a matrix into an orthonormal part and an upper-triangular part.",
    prerequisites: ["gram-schmidt"],
  },
  {
    id: "invertible-matrices",
    title: "Invertible Matrices",
    domain: "linear-algebra",
    blurb: "When a matrix's transformation can be perfectly undone.",
    prerequisites: ["rank", "matrices"],
  },
  {
    id: "lu-decomposition",
    title: "LU Decomposition",
    domain: "linear-algebra",
    blurb: "Factoring a matrix into lower- and upper-triangular pieces for fast solving.",
    prerequisites: ["invertible-matrices"],
  },
  {
    id: "determinant",
    title: "Determinant",
    domain: "linear-algebra",
    blurb: "A single number describing how a matrix scales volume.",
    prerequisites: ["matrices"],
  },
  {
    id: "determinant-properties",
    title: "Determinant Properties",
    domain: "linear-algebra",
    blurb: "How determinants behave under multiplication, transposition, and row operations.",
    prerequisites: ["determinant"],
  },
  {
    id: "eigenvalues-eigenvectors",
    title: "Eigenvalues and Eigenvectors",
    domain: "linear-algebra",
    blurb: "The directions a matrix only stretches, never rotates.",
    prerequisites: ["invertible-matrices", "determinant"],
  },
  {
    id: "diagonalization",
    title: "Diagonalization",
    domain: "linear-algebra",
    blurb: "Rewriting a matrix in a basis where it acts like pure scaling.",
    prerequisites: ["eigenvalues-eigenvectors"],
  },
  {
    id: "eigendecomposition",
    title: "Eigendecomposition",
    domain: "linear-algebra",
    blurb: "Factoring a matrix into its eigenvectors and eigenvalues.",
    prerequisites: ["diagonalization"],
  },
  {
    id: "symmetric-matrices",
    title: "Symmetric Matrices",
    domain: "linear-algebra",
    blurb: "Matrices that equal their own transpose, with unusually nice structure.",
    prerequisites: ["matrices"],
  },
  {
    id: "spectral-theorem",
    title: "Spectral Theorem",
    domain: "linear-algebra",
    blurb: "Every symmetric matrix diagonalizes with an orthonormal eigenbasis.",
    prerequisites: ["symmetric-matrices", "eigendecomposition", "orthonormal-basis"],
  },
  {
    id: "orthogonal-matrices",
    title: "Orthogonal Matrices",
    domain: "linear-algebra",
    blurb: "Matrices that rotate or reflect without distorting length.",
    prerequisites: ["orthonormal-basis"],
  },
  {
    id: "positive-definite-matrices",
    title: "Positive Definite Matrices",
    domain: "linear-algebra",
    blurb: "Symmetric matrices that behave like a positive number — always positive eigenvalues.",
    prerequisites: ["symmetric-matrices", "eigenvalues-eigenvectors"],
  },
  {
    id: "cholesky-decomposition",
    title: "Cholesky Decomposition",
    domain: "linear-algebra",
    blurb: "Factoring a positive definite matrix into a triangular matrix times its transpose.",
    prerequisites: ["positive-definite-matrices"],
  },
  {
    id: "idempotent-matrices",
    title: "Idempotent Matrices",
    domain: "linear-algebra",
    blurb: "Matrices that do nothing the second time — P² = P — and why every linear model's hat matrix is one.",
    prerequisites: ["symmetric-matrices", "eigenvalues-eigenvectors", "trace", "vector-projection"],
  },
  {
    id: "schur-complement",
    title: "Schur Complement",
    domain: "linear-algebra",
    blurb: "A tool for inverting and reasoning about block-structured matrices.",
    prerequisites: ["invertible-matrices"],
  },
  {
    id: "svd",
    title: "Singular Value Decomposition (SVD)",
    domain: "linear-algebra",
    blurb: "Factoring any matrix into rotate-scale-rotate.",
    prerequisites: ["positive-definite-matrices", "eigendecomposition"],
  },
  {
    id: "uniqueness-of-svd",
    title: "Uniqueness of SVD",
    domain: "linear-algebra",
    blurb: "What's guaranteed to be unique about a matrix's SVD, and what isn't.",
    prerequisites: ["svd"],
  },
  {
    id: "svd-four-fundamental-subspaces",
    title: "SVD and Four Fundamental Subspaces",
    domain: "linear-algebra",
    blurb: "How the SVD hands you orthonormal bases for all four subspaces at once.",
    prerequisites: ["svd", "four-fundamental-subspaces"],
  },
  {
    id: "moore-penrose-inverse",
    title: "Moore-Penrose Inverse",
    domain: "linear-algebra",
    blurb: "A best-possible 'inverse' for matrices that aren't actually invertible.",
    prerequisites: ["svd"],
  },
  {
    id: "rayleigh-quotient",
    title: "Rayleigh Quotient",
    domain: "linear-algebra",
    blurb: "A ratio that's maximized exactly at a matrix's top eigenvector.",
    prerequisites: ["symmetric-matrices", "eigenvalues-eigenvectors"],
  },
  {
    id: "pca-matrix-edition",
    title: "Principal Component Analysis (Matrix Edition)",
    domain: "linear-algebra",
    blurb: "Deriving PCA from the SVD of a data matrix, with no statistics required.",
    prerequisites: ["svd", "rayleigh-quotient", "covariance"],
  },
  {
    id: "eckart-young",
    title: "Eckart-Young Theorem",
    domain: "linear-algebra",
    blurb: "Why truncating the SVD gives the best possible low-rank approximation.",
    prerequisites: ["svd"],
  },
  {
    id: "matrix-norms",
    title: "Matrix Norms",
    domain: "linear-algebra",
    blurb: "Measuring the 'size' of a matrix, several different ways.",
    prerequisites: ["vector-norm"],
  },
  {
    id: "matrix-stability",
    title: "Matrix Stability",
    domain: "linear-algebra",
    blurb: "Condition numbers, and why some matrices amplify tiny errors.",
    prerequisites: ["eigenvalues-eigenvectors", "matrix-norms"],
  },
  {
    id: "kronecker-product",
    title: "Kronecker Product",
    domain: "linear-algebra",
    blurb: "A way of combining two matrices into a much larger block matrix.",
    prerequisites: ["matrix-multiplication"],
  },
  {
    id: "subspace-operations",
    title: "Subspace Operations",
    domain: "linear-algebra",
    blurb: "Taking sums and intersections of subspaces.",
    prerequisites: ["vector-spaces", "span"],
  },

  // ---------------------------------------------------------------------
  // Multivariate & Asymptotics
  // ---------------------------------------------------------------------
  {
    id: "change-of-variables-jacobian",
    title: "Change of Variables (Jacobian)",
    domain: "multivariate-probability",
    blurb: "Transforming a density across a change of variables using the Jacobian.",
    prerequisites: ["pdf", "determinant"],
  },
  {
    id: "covariance-matrix",
    title: "Covariance Matrix",
    domain: "multivariate-probability",
    blurb: "Every pairwise covariance among a vector of random variables, in one matrix.",
    // Variance was reachable only through Covariance's own ancestors, which do
    // not include it. The diagonal of Σ *is* the variances, and every quadratic
    // form aᵀΣa is one, so the edge is a real dependency rather than a tidy-up.
    prerequisites: ["covariance", "variance", "positive-definite-matrices"],
  },
  {
    id: "bivariate-normal",
    title: "Bivariate Normal",
    domain: "multivariate-probability",
    blurb: "Two jointly normal variables, and the shape their correlation traces out.",
    prerequisites: ["normal-distribution", "covariance", "change-of-variables-jacobian"],
  },
  {
    id: "multivariate-normal",
    title: "Multivariate Normal",
    domain: "multivariate-probability",
    blurb: "The bell curve generalized to many correlated dimensions at once.",
    prerequisites: ["bivariate-normal", "covariance-matrix", "eigendecomposition"],
  },
  {
    id: "pearson-correlation",
    title: "Pearson Correlation",
    domain: "multivariate-probability",
    blurb: "Estimating correlation from sample data, and reading a correlation coefficient.",
    prerequisites: ["correlation", "sample-variance"],
  },
  {
    id: "central-limit-theorem",
    title: "Central Limit Theorem",
    domain: "multivariate-probability",
    blurb: "Why sums of many independent variables look normal, almost no matter what.",
    // Normal Distribution and Mutual Independence were both missing: the
    // theorem's conclusion names N(0, 1) and its hypothesis is iid sampling, so
    // neither can be stated without them. Found by `checkPrereqClosure`
    // blocking the CLT items, the same way the Expectation/Variance edges on
    // `bernoulli-binomial` were found.
    prerequisites: [
      "modes-of-convergence",
      "mgf",
      "law-of-large-numbers",
      "normal-distribution",
      "mutual-independence",
    ],
  },
  {
    id: "multivariate-mgf",
    title: "Multivariate MGF",
    domain: "multivariate-probability",
    blurb: "One scalar function of a vector argument that pins down a whole joint distribution.",
    /**
     * `multivariate-normal` is upstream rather than downstream on purpose. The
     * general definition M(t) = E[e^(tᵀX)] is cheap; what makes the tool worth
     * a lesson is that it turns the MVN's closure properties into two lines of
     * algebra, and a learner cannot see that before meeting the family whose
     * MGF exp(tᵀμ + ½tᵀΣt) is the whole payoff.
     */
    prerequisites: [
      "mgf",
      "mgf-properties",
      "multivariate-normal",
      "covariance-matrix",
      // The factorisation criterion — X and Y independent iff the joint MGF is
      // the product of the marginals — is one of the three theorems this lesson
      // exists to deliver, so independence has to be upstream of it rather than
      // borrowed sideways.
      "mutual-independence",
    ],
  },
  {
    id: "quadratic-forms-random-vectors",
    title: "Quadratic Forms in Random Vectors",
    domain: "multivariate-probability",
    blurb: "XᵀAX — the shape every sum of squares in statistics turns out to have.",
    /**
     * `trace` and `rank` are load-bearing, not decorative: E[XᵀAX] = tr(AΣ) +
     * μᵀAμ is proved by the cyclic property of the trace, and the degrees of
     * freedom of the resulting chi-square is rank(A). `chi-square-distribution`
     * is what the form converges on whenever A is idempotent.
     */
    prerequisites: [
      "multivariate-normal",
      "covariance-matrix",
      "trace",
      "rank",
      "chi-square-distribution",
    ],
  },
  {
    id: "conditional-multivariate-normal",
    title: "Conditional Distributions of the Multivariate Normal",
    domain: "multivariate-probability",
    blurb: "Where X₁ | X₂ = x₂'s mean and covariance formulas actually come from, derived rather than quoted.",
    /**
     * The formula in `multivariate-normal`'s closure table is stated, not
     * derived — this concept is the derivation, and it needs both of that
     * article's siblings to do it. `multivariate-mgf` supplies the
     * independence-from-zero-covariance argument the proof turns on;
     * `quadratic-forms-random-vectors` supplies the Var(aᵀX) = aᵀΣa machinery
     * used to compute the residual's covariance. `schur-complement` is upstream
     * because the resulting covariance formula Σ₁₁ − Σ₁₂Σ₂₂⁻¹Σ₂₁ is exactly
     * that complement, and the connection is the payoff, not a coincidence to
     * gloss over.
     */
    prerequisites: [
      "multivariate-normal",
      "multivariate-mgf",
      "quadratic-forms-random-vectors",
      "schur-complement",
    ],
  },
  {
    id: "cochrans-theorem",
    title: "Cochran's Theorem",
    domain: "multivariate-probability",
    blurb: "When a sum of squares splits into independent chi-squares, and why the ranks have to add up.",
    prerequisites: [
      "quadratic-forms-random-vectors",
      "mutual-independence",
      "sample-variance",
      "t-distribution",
    ],
  },
  {
    id: "distribution-of-beta-hat",
    title: "Distribution of β̂",
    domain: "multivariate-probability",
    blurb: "Every standard error, t-statistic and F-test a regression prints, derived from one multivariate normal.",
    /**
     * Filed under `multivariate-probability` rather than `regression` because
     * it is the domain's payoff rather than a new regression method: β̂ is an
     * affine map of a normal vector, s² is a quadratic form in the same vector,
     * and their independence is Cochran's theorem. `geometric-interpretation-of-ols`
     * is the edge that supplies the hat matrix, whose idempotency is what makes
     * the residual sum of squares a chi-square at all.
     */
    prerequisites: [
      "cochrans-theorem",
      "multivariate-mgf",
      "linear-regression-probabilistic-version",
      "geometric-interpretation-of-ols",
      "f-distribution",
    ],
  },
  {
    id: "kl-divergence",
    title: "Kullback-Leibler Divergence",
    domain: "multivariate-probability",
    blurb: "A measure of how one probability distribution diverges from another.",
    // Gibbs' inequality — the non-negativity that licenses "minimise the KL" as
    // an objective at all — is one application of Jensen's inequality to the
    // convex function −log. The edge records that dependency.
    prerequisites: ["pdf", "pmf", "expectation", "jensen-inequality"],
  },

  // ---------------------------------------------------------------------
  // Statistical Inference
  // ---------------------------------------------------------------------
  {
    id: "population-vs-sample",
    title: "Population vs Sample",
    domain: "statistics",
    blurb: "The whole group you care about versus the slice of it you actually observe.",
    prerequisites: [],
  },
  {
    id: "parameter-vs-statistic",
    title: "Parameter vs Statistic",
    domain: "statistics",
    blurb: "A fixed truth about a population versus a number computed from a sample.",
    prerequisites: ["population-vs-sample"],
  },
  {
    id: "data-types",
    title: "Data Types",
    domain: "statistics",
    blurb: "Categorical, ordinal, discrete, continuous — and why the type dictates the method.",
    prerequisites: ["population-vs-sample"],
  },
  {
    id: "sampling-methods",
    title: "Sampling Methods",
    domain: "statistics",
    blurb: "How to actually select a sample that represents the population.",
    prerequisites: ["population-vs-sample"],
  },
  {
    id: "sample-mean",
    title: "Sample Mean",
    domain: "statistics",
    blurb: "The average of your observed data, used to estimate the population mean.",
    prerequisites: ["parameter-vs-statistic", "expectation"],
  },
  {
    id: "sample-variance",
    title: "Sample Variance",
    domain: "statistics",
    blurb: "Estimating spread from data — and why you divide by n-1.",
    prerequisites: ["sample-mean", "variance"],
  },
  {
    id: "sampling-distribution",
    title: "Sampling Distribution",
    domain: "statistics",
    blurb: "The distribution a statistic itself would follow across repeated samples.",
    prerequisites: ["sample-mean", "sample-variance", "central-limit-theorem"],
  },
  {
    id: "standard-error",
    title: "Standard Error",
    domain: "statistics",
    blurb: "The standard deviation of a statistic's own sampling distribution.",
    prerequisites: ["sampling-distribution"],
  },
  {
    id: "test-statistic",
    title: "Test Statistic",
    domain: "statistics",
    blurb: "A single number, computed from data, used to decide between hypotheses.",
    prerequisites: ["sampling-distribution"],
  },
  {
    id: "rejection-region",
    title: "Rejection Region",
    domain: "statistics",
    blurb: "The range of test-statistic values that leads you to reject the null.",
    prerequisites: ["test-statistic"],
  },
  {
    id: "hypothesis-test",
    title: "Hypothesis Test",
    domain: "statistics",
    blurb: "The formal procedure for weighing evidence against a null hypothesis.",
    prerequisites: ["test-statistic", "rejection-region"],
  },
  {
    id: "p-value",
    title: "P-Value",
    domain: "statistics",
    blurb: "The probability of data this extreme if the null hypothesis were true.",
    prerequisites: ["hypothesis-test"],
  },
  {
    id: "type-i-ii-error",
    title: "Type I and Type II Error",
    domain: "statistics",
    blurb: "False alarms versus missed effects — the two ways a test can go wrong.",
    prerequisites: ["hypothesis-test"],
  },
  {
    id: "confidence-interval",
    title: "Confidence Interval",
    domain: "statistics",
    blurb: "A range of plausible values for a parameter, with a stated confidence level.",
    prerequisites: ["standard-error", "sampling-distribution"],
  },
  {
    id: "one-sample-z-test",
    title: "One Sample Z-Test",
    domain: "statistics",
    blurb: "Testing a mean against a known value when the population variance is known.",
    prerequisites: ["hypothesis-test", "standard-error", "normal-distribution"],
  },
  {
    id: "one-sample-t-test",
    title: "One Sample T-Test",
    domain: "statistics",
    blurb: "Testing a mean against a known value when the variance must be estimated too.",
    prerequisites: ["one-sample-z-test", "t-distribution"],
  },
  {
    id: "one-sample-proportions-z-test",
    title: "One Sample Proportions Z-Test",
    domain: "statistics",
    blurb: "Testing whether a population proportion equals some hypothesized value.",
    prerequisites: ["one-sample-z-test", "bernoulli-binomial"],
  },
  {
    id: "two-sample-z-test",
    title: "Two Sample Z-Test",
    domain: "statistics",
    blurb: "Comparing two population means when both variances are known.",
    prerequisites: ["one-sample-z-test"],
  },
  {
    id: "two-sample-t-test",
    title: "Two Sample T-Test",
    domain: "statistics",
    blurb: "Comparing two independent group means with estimated variances.",
    prerequisites: ["one-sample-t-test", "two-sample-z-test"],
  },
  {
    id: "paired-t-test",
    title: "Paired T-Test",
    domain: "statistics",
    blurb: "Comparing two measurements taken on the same subjects.",
    prerequisites: ["two-sample-t-test"],
  },
  {
    id: "chi-square-test-of-independence",
    title: "Chi Square Test of Independence",
    domain: "statistics",
    blurb: "Testing whether two categorical variables are related.",
    prerequisites: ["chi-square-distribution", "hypothesis-test"],
  },
  {
    id: "chi-square-goodness-of-fit-test",
    title: "Chi Square Goodness of Fit Test",
    domain: "statistics",
    blurb: "Testing whether observed category counts match an expected distribution.",
    prerequisites: ["chi-square-test-of-independence"],
  },
  {
    id: "fischers-exact-test",
    title: "Fisher's Exact Test",
    domain: "statistics",
    blurb: "An exact test of independence for small 2x2 contingency tables.",
    prerequisites: ["chi-square-test-of-independence", "hypergeometric-distribution"],
  },
  {
    id: "wilcoxon-rank-sum-test",
    title: "Wilcoxon Rank Sum Test",
    domain: "statistics",
    blurb: "A nonparametric alternative to the t-test, based on ranks rather than values.",
    prerequisites: ["order-statistics", "hypothesis-test"],
  },
  {
    id: "bootstrapping",
    title: "Bootstrapping",
    domain: "statistics",
    blurb: "Estimating a statistic's sampling distribution by resampling your own data.",
    prerequisites: ["sampling-distribution", "sample-mean"],
  },
  {
    id: "two-sample-proportions-z-test",
    title: "Two Sample Proportions Z-Test",
    domain: "statistics",
    blurb: "Comparing two rates — the test behind nearly every A/B experiment.",
    prerequisites: ["one-sample-proportions-z-test", "two-sample-z-test"],
  },
  {
    id: "effect-size",
    title: "Effect Size",
    domain: "statistics",
    blurb: "How big the difference is, on a scale that does not grow with the sample.",
    prerequisites: ["p-value", "standard-error"],
  },
  {
    id: "multiple-testing",
    title: "Multiple Testing",
    domain: "statistics",
    blurb: "Run enough tests and something is significant by construction. Bonferroni, FWER, and FDR.",
    prerequisites: ["p-value", "type-i-ii-error"],
  },
  {
    id: "equivalence-testing",
    title: "Equivalence Testing",
    domain: "statistics",
    blurb: "Establishing that an effect is negligible, which failing to reject never does.",
    prerequisites: ["confidence-interval", "hypothesis-test"],
  },
  {
    id: "sequential-testing",
    title: "Sequential Testing and Optional Stopping",
    domain: "statistics",
    blurb: "Why peeking inflates the error rate, and the designs that let you stop early anyway.",
    prerequisites: ["p-value", "type-i-ii-error"],
  },
  {
    id: "prediction-interval",
    title: "Prediction Interval",
    domain: "statistics",
    blurb: "A range for the next observation, not for a parameter — and it never shrinks to zero.",
    prerequisites: ["confidence-interval", "sampling-distribution"],
  },
  {
    id: "permutation-test",
    title: "Permutation Test",
    domain: "statistics",
    blurb: "Build the null distribution by reshuffling the labels the null says are arbitrary.",
    prerequisites: ["hypothesis-test", "p-value", "counting-methods"],
  },
  {
    id: "wilcoxon-signed-rank-test",
    title: "Wilcoxon Signed Rank Test",
    domain: "statistics",
    blurb: "The paired counterpart of the rank-sum test: ranks the within-pair differences.",
    prerequisites: ["wilcoxon-rank-sum-test", "paired-t-test"],
  },
  {
    id: "kruskal-wallis-test",
    title: "Kruskal-Wallis Test",
    domain: "statistics",
    blurb: "Comparing three or more groups on ranks alone.",
    prerequisites: ["wilcoxon-rank-sum-test", "chi-square-distribution"],
  },
  {
    id: "mcnemar-test",
    title: "McNemar's Test",
    domain: "statistics",
    blurb: "Paired categorical data, where only the disagreements carry information.",
    prerequisites: ["chi-square-test-of-independence", "paired-t-test"],
  },
  {
    id: "kolmogorov-smirnov-test",
    title: "Kolmogorov-Smirnov Test",
    domain: "statistics",
    blurb: "Comparing distributions through the largest gap between their CDFs — no binning required.",
    prerequisites: ["chi-square-goodness-of-fit-test", "cdf"],
  },

  // ---------------------------------------------------------------------
  // Regression
  // ---------------------------------------------------------------------
  {
    id: "regression",
    title: "Regression",
    domain: "regression",
    blurb: "Modeling how an outcome variable depends on one or more predictors.",
    prerequisites: [],
  },
  {
    id: "regress-to-the-mean",
    title: "Regress to the Mean",
    domain: "regression",
    blurb: "Why extreme measurements tend to be followed by more average ones.",
    prerequisites: ["regression"],
  },
  {
    id: "linear-regression-terminology",
    title: "Linear Regression Terminology",
    domain: "regression",
    blurb: "Response, predictors, coefficients, residuals — the shared vocabulary.",
    prerequisites: ["regression"],
  },
  {
    id: "simple-linear-regression",
    title: "Simple Linear Regression",
    domain: "regression",
    blurb: "Fitting a straight line to predict one variable from another.",
    prerequisites: ["linear-regression-terminology", "covariance", "sample-variance"],
  },
  {
    id: "ordinary-least-squares",
    title: "Ordinary Least Squares",
    domain: "regression",
    blurb: "Choosing the line that minimizes the sum of squared errors.",
    prerequisites: ["simple-linear-regression"],
  },
  {
    id: "normal-equations",
    title: "Normal Equations",
    domain: "regression",
    blurb: "The matrix equation that solves OLS in one shot.",
    prerequisites: ["ordinary-least-squares", "matrix-multiplication"],
  },
  {
    id: "geometric-interpretation-of-ols",
    title: "Geometric Interpretation of OLS",
    domain: "regression",
    blurb: "OLS as projecting the response vector onto the predictors' column space.",
    prerequisites: ["normal-equations", "column-space", "vector-projection"],
  },
  {
    id: "hat-matrix",
    title: "The Hat Matrix",
    domain: "regression",
    blurb: "Why H = X(XᵀX)⁻¹Xᵀ being idempotent is the one fact behind n − p degrees of freedom and every t-statistic a regression prints.",
    prerequisites: ["idempotent-matrices", "geometric-interpretation-of-ols"],
  },
  {
    id: "multiple-linear-regression",
    title: "Multiple Linear Regression",
    domain: "regression",
    blurb: "Extending linear regression to many predictors at once.",
    prerequisites: ["ordinary-least-squares", "normal-equations"],
  },
  {
    id: "linear-regression-probabilistic-version",
    title: "Linear Regression, Probabilistic Version",
    domain: "regression",
    blurb: "Recasting OLS as maximum likelihood under normally distributed errors.",
    prerequisites: ["multiple-linear-regression", "mle", "normal-distribution"],
  },
  {
    id: "ols-assumptions",
    title: "OLS Assumptions",
    domain: "regression",
    blurb: "The conditions that need to hold for OLS estimates to behave well.",
    prerequisites: ["multiple-linear-regression"],
  },
  {
    id: "homoskedasticity",
    title: "Homoskedasticity",
    domain: "regression",
    blurb: "Constant error variance across all levels of the predictors.",
    prerequisites: ["ols-assumptions"],
  },
  {
    id: "weighted-least-squares",
    title: "Weighted Least Squares",
    domain: "regression",
    blurb: "Down-weighting noisier observations to restore efficiency under known heteroskedasticity.",
    prerequisites: ["homoskedasticity"],
  },
  {
    id: "sandwich-estimator",
    title: "Sandwich Estimator",
    domain: "regression",
    blurb: "A heteroskedasticity-consistent covariance estimator that gets standard errors right without ever specifying how the variance depends on x.",
    prerequisites: ["homoskedasticity", "ols-properties"],
  },
  {
    id: "generalized-estimating-equations",
    title: "Generalized Estimating Equations (GEE)",
    domain: "regression",
    blurb: "Fitting a GLM mean structure to clustered or repeated-measures data with only a working guess at the within-cluster correlation, then correcting the standard errors with a sandwich.",
    prerequisites: ["glm", "sandwich-estimator"],
  },
  {
    id: "ols-properties",
    title: "OLS Properties",
    domain: "regression",
    blurb: "Why OLS is the best linear unbiased estimator under its assumptions.",
    /**
     * `central-limit-theorem` is a genuine prerequisite, not a convenience: the
     * asymptotic normality of beta-hat without normal errors is one of the four
     * properties this concept covers, and it is the CLT applied to beta-hat as a
     * weighted sum of the observations. The gap surfaced as a prereq-closure
     * block on an authored item, the same way `bernoulli-binomial`'s missing
     * expectation/variance edges did.
     */
    prerequisites: ["ols-assumptions", "linear-regression-probabilistic-version", "central-limit-theorem"],
  },
  {
    id: "ssr-sse-sst",
    title: "SSR, SSE, SST",
    domain: "regression",
    blurb: "Decomposing total variation into what the model explains and what it doesn't.",
    prerequisites: ["simple-linear-regression"],
  },
  {
    id: "r-squared",
    title: "R²",
    domain: "regression",
    blurb: "The share of the outcome's variance explained by the model.",
    prerequisites: ["ssr-sse-sst"],
  },
  {
    id: "anova",
    title: "ANOVA",
    domain: "regression",
    blurb: "Testing whether several group means differ by comparing variances.",
    prerequisites: ["ssr-sse-sst", "f-distribution", "hypothesis-test"],
  },
  {
    id: "effect-of-adding-another-variable",
    title: "Effect of Adding Another Variable",
    domain: "regression",
    blurb: "Why adding a predictor never decreases R² — and what it can still hurt.",
    prerequisites: ["multiple-linear-regression", "r-squared"],
  },
  {
    id: "vif",
    title: "Variance Inflation Factor (VIF)",
    domain: "regression",
    blurb: "Quantifying how much collinearity inflates a coefficient's variance.",
    prerequisites: ["effect-of-adding-another-variable"],
  },
  {
    id: "outliers-leverage-influence",
    title: "Outliers, Leverage, and Influence",
    domain: "regression",
    blurb: "Telling apart an unusual response, an unusual predictor value, and a point that actually moves the fit.",
    prerequisites: ["geometric-interpretation-of-ols"],
  },
  {
    id: "aic-bic",
    title: "AIC, BIC",
    domain: "regression",
    blurb: "Scoring models by fit, penalized for complexity.",
    prerequisites: ["linear-regression-probabilistic-version", "mle"],
  },
  {
    id: "forward-backward-stepwise-selection",
    title: "Forward, Backward, Stepwise Selection",
    domain: "regression",
    blurb: "Algorithms for adding or removing predictors to find a good model.",
    prerequisites: ["aic-bic", "multiple-linear-regression"],
  },
  {
    id: "regularization",
    title: "Regularization",
    domain: "regression",
    blurb: "Penalizing model complexity to trade a little bias for a lot less variance.",
    prerequisites: ["multiple-linear-regression", "bias-variance-tradeoff"],
  },
  {
    id: "lasso",
    title: "LASSO",
    domain: "regression",
    blurb: "L1-penalized regression that can shrink coefficients to exactly zero.",
    prerequisites: ["regularization"],
  },
  {
    id: "ridge-regression",
    title: "Ridge Regression",
    domain: "regression",
    blurb: "L2-penalized regression that shrinks coefficients toward zero.",
    prerequisites: ["regularization"],
  },
  {
    id: "elastic-net",
    title: "Elastic Net",
    domain: "regression",
    blurb: "Blending LASSO and Ridge penalties into one regularizer.",
    prerequisites: ["lasso", "ridge-regression"],
  },
  {
    id: "polynomial-regression",
    title: "Polynomial Regression",
    domain: "regression",
    blurb: "Fitting curved relationships by adding powers of a predictor as extra linear-model columns.",
    /**
     * `vif` is a genuine prerequisite, not a convenience: x and x² are
     * strongly correlated by construction over any positive range, so
     * diagnosing and centring away that structural collinearity is a normal
     * part of this concept, not an optional aside. Surfaced by
     * `checkPrereqClosure` blocking an authored item, the same way the
     * `central-limit-theorem` edge on `ols-properties` was found.
     */
    prerequisites: ["multiple-linear-regression", "vif"],
  },
  {
    id: "quantile-regression",
    title: "Quantile Regression",
    domain: "regression",
    blurb: "Modeling a conditional quantile of the response instead of its mean.",
    prerequisites: ["ordinary-least-squares"],
  },
  {
    id: "loess-smoothing",
    title: "LOESS Smoothing",
    domain: "regression",
    blurb: "Fitting a flexible curve by combining many local regressions.",
    prerequisites: ["simple-linear-regression"],
  },
  {
    id: "mixed-effect-models",
    title: "Mixed Effect Models",
    domain: "regression",
    blurb: "Regression with both population-level effects and group-specific random effects.",
    prerequisites: ["multiple-linear-regression", "sampling-methods"],
  },
  {
    id: "logistic-regression",
    title: "Logistic Regression",
    domain: "regression",
    blurb: "Modeling the probability of a binary outcome as a function of predictors.",
    prerequisites: ["mle", "bernoulli-binomial", "multiple-linear-regression"],
  },
  {
    id: "probit-regression",
    title: "Probit Regression",
    domain: "regression",
    blurb: "Modeling binary outcomes with a normal-CDF link instead of a logistic one.",
    prerequisites: ["logistic-regression", "normal-distribution"],
  },
  {
    id: "glm",
    title: "Generalized Linear Model (GLM)",
    domain: "regression",
    blurb: "A single framework that unifies linear, logistic, and Poisson regression.",
    prerequisites: ["logistic-regression", "exponential-family"],
  },
  {
    id: "poisson-regression",
    title: "Poisson Regression",
    domain: "regression",
    blurb: "Modeling count outcomes with a log link and a mean-equals-variance response distribution.",
    prerequisites: ["glm", "poisson-distribution"],
  },
  {
    id: "cox-proportional-hazards-model",
    title: "Cox Proportional Hazards Model",
    domain: "regression",
    blurb: "Modeling how predictors affect the risk of an event over time.",
    prerequisites: ["glm", "mle"],
  },

  // ---------------------------------------------------------------------
  // Stochastic Processes & Time Series
  //
  // A new domain rather than a section bolted onto `regression`: the object
  // of study is a single realisation of a process indexed by time, not i.i.d.
  // rows, and the tests, identities, and failure modes below (autocorrelated
  // errors, unit roots, spurious regression) are specific to that setting.
  // `stochastic-processes` reopens the general framework and reuses
  // `markov-chains` (in `graphical-models`) for the fully-worked
  // transition-matrix / stationary-distribution / ergodicity case rather than
  // duplicating it; everything downstream specialises to *stationary* real-
  // or vector-valued processes, which is the setting ACF, ARMA/ARIMA, GARCH
  // and cointegration actually live in.
  // ---------------------------------------------------------------------
  {
    id: "stochastic-processes",
    title: "Stochastic Processes",
    domain: "time-series",
    blurb: "A family of random variables indexed by time — state spaces, sample paths, and the Markov case.",
    prerequisites: ["random-variables", "markov-chains"],
  },
  {
    id: "stationarity-white-noise",
    title: "Stationarity & White Noise",
    domain: "time-series",
    blurb: "When a process's statistics don't depend on when you look — and the pure-noise process that anchors everything built on top of it.",
    prerequisites: ["stochastic-processes", "covariance"],
  },
  {
    id: "acf",
    title: "Autocorrelation Function (ACF)",
    domain: "time-series",
    blurb: "How correlated a series is with lagged copies of itself, and what its decay shape reveals about the process.",
    prerequisites: ["stationarity-white-noise", "correlation"],
  },
  {
    id: "pacf",
    title: "Partial Autocorrelation Function (PACF)",
    domain: "time-series",
    blurb: "Correlation with a lag after netting out every shorter lag in between — the tool that tells AR order from MA order.",
    prerequisites: ["acf", "multiple-linear-regression"],
  },
  {
    id: "ar-models",
    title: "Autoregressive (AR) Models",
    domain: "time-series",
    blurb: "Predicting the present from a weighted sum of its own past values, plus noise.",
    prerequisites: ["stationarity-white-noise", "acf"],
  },
  {
    id: "ma-models",
    title: "Moving Average (MA) Models",
    domain: "time-series",
    blurb: "Modeling the present as a weighted sum of current and past shocks, not past levels.",
    prerequisites: ["stationarity-white-noise", "acf"],
  },
  {
    id: "wold-decomposition",
    title: "Wold Decomposition",
    domain: "time-series",
    blurb: "Why every stationary process can be written as an infinite MA — the theorem that justifies AR and ARMA as approximations.",
    prerequisites: ["ar-models", "ma-models"],
  },
  {
    id: "arma",
    title: "ARMA Models",
    domain: "time-series",
    blurb: "Combining AR and MA terms for a more parsimonious fit, and using ACF/PACF shape to identify (p, q).",
    prerequisites: ["ar-models", "ma-models", "pacf"],
  },
  {
    id: "arima",
    title: "ARIMA & Unit Roots",
    domain: "time-series",
    blurb: "Differencing away a trend or unit root before fitting ARMA to what's left.",
    prerequisites: ["arma"],
  },
  {
    id: "garch",
    title: "ARCH & GARCH",
    domain: "time-series",
    blurb: "Modeling volatility itself as autoregressive, for series whose variance — not just its mean — clusters over time.",
    prerequisites: ["arma", "variance"],
  },
  {
    id: "cointegration",
    title: "Cointegration",
    domain: "time-series",
    blurb: "When two non-stationary series share a stationary combination — and why regressing one on the other can look significant for no real reason.",
    prerequisites: ["arima"],
  },

  // ---------------------------------------------------------------------
  // Machine Learning
  // ---------------------------------------------------------------------
  {
    id: "ml-introduction",
    title: "Machine Learning Introduction",
    domain: "machine-learning",
    blurb: "What machine learning is, and how it differs from classical statistics.",
    prerequisites: [],
  },
  {
    id: "types-of-machine-learning",
    title: "Types of Machine Learning",
    domain: "machine-learning",
    blurb: "Supervised, unsupervised, and reinforcement learning at a glance.",
    prerequisites: ["ml-introduction"],
  },
  {
    id: "supervised-vs-unsupervised-learning",
    title: "Supervised vs Unsupervised Learning",
    domain: "machine-learning",
    blurb: "Learning from labeled examples versus finding structure with none.",
    prerequisites: ["types-of-machine-learning"],
  },
  {
    id: "classification-vs-regression",
    title: "Classification vs Regression",
    domain: "machine-learning",
    blurb: "Predicting a category versus predicting a number.",
    prerequisites: ["supervised-vs-unsupervised-learning"],
  },
  {
    // The three concepts below (perceptron, neural-networks, backpropagation)
    // fill a gap the graph had no coverage for at all: ISL ch. 10 ("Deep
    // Learning") and Bishop ch. 5 ("Neural Networks") both give this a full
    // chapter, and `variational-inference-vaes` already referenced "a neural
    // network" in its own blurb with nothing upstream to define one.
    id: "perceptron",
    title: "Perceptron",
    domain: "deep-learning",
    blurb: "The simplest linear classifier: a weighted sum of inputs, thresholded.",
    prerequisites: ["classification-vs-regression"],
  },
  {
    id: "neural-networks",
    title: "Neural Networks",
    domain: "deep-learning",
    blurb: "Layers of perceptron-like units with nonlinear activations, composed together.",
    prerequisites: ["perceptron", "matrix-calculus"],
  },
  {
    id: "backpropagation",
    title: "Backpropagation",
    domain: "deep-learning",
    blurb: "Computing a neural network's gradient efficiently with the chain rule.",
    prerequisites: ["neural-networks", "gradient-descent"],
  },
  {
    id: "loss-functions",
    title: "Loss Functions",
    domain: "machine-learning",
    blurb: "The score a model is trained to minimize.",
    prerequisites: ["ml-introduction"],
  },
  {
    id: "cross-entropy-loss",
    title: "Cross Entropy Loss",
    domain: "machine-learning",
    blurb: "The loss function behind most classifiers, straight from likelihood.",
    prerequisites: ["loss-functions", "likelihood-vs-probability"],
  },
  {
    id: "gradient-descent",
    title: "Gradient Descent",
    domain: "machine-learning",
    blurb: "Iteratively nudging parameters downhill to minimize a loss function.",
    prerequisites: ["loss-functions", "matrix-calculus"],
  },
  {
    id: "bias-variance-tradeoff",
    title: "Bias Variance Tradeoff",
    domain: "machine-learning",
    blurb: "The tension between a model that's too simple and one that's too flexible.",
    prerequisites: ["loss-functions", "variance"],
  },
  {
    id: "overfitting-underfitting",
    title: "Overfitting and Underfitting",
    domain: "machine-learning",
    blurb: "Memorizing the training data versus never learning it in the first place.",
    prerequisites: ["bias-variance-tradeoff"],
  },
  {
    id: "curse-of-dimensionality",
    title: "Curse of Dimensionality",
    domain: "machine-learning",
    blurb: "Why intuitions about distance and density break down in high dimensions.",
    prerequisites: ["ml-introduction"],
  },
  {
    id: "training-validation-test-set",
    title: "Training vs Validation vs Test Set",
    domain: "machine-learning",
    blurb: "Splitting data so you can honestly evaluate a model you tuned.",
    prerequisites: ["supervised-vs-unsupervised-learning"],
  },
  {
    id: "k-fold-cross-validation",
    title: "K-Fold Cross-Validation",
    domain: "machine-learning",
    blurb: "Getting a more reliable performance estimate by rotating the validation split.",
    prerequisites: ["training-validation-test-set", "overfitting-underfitting"],
  },
  {
    id: "hyperparameters",
    title: "Hyperparameters",
    domain: "machine-learning",
    blurb: "The settings you choose before training, and how to tune them.",
    prerequisites: ["k-fold-cross-validation"],
  },
  {
    id: "multiclass-classification",
    title: "Multiclass Classification",
    domain: "machine-learning",
    blurb: "Extending classification from two classes to many.",
    prerequisites: ["classification-vs-regression"],
  },
  {
    id: "confusion-matrices",
    title: "Confusion Matrices",
    domain: "machine-learning",
    blurb: "A table of what a classifier got right and how it got things wrong.",
    prerequisites: ["classification-vs-regression"],
  },
  {
    id: "roc-curves",
    title: "ROC Curves",
    domain: "machine-learning",
    blurb: "Visualizing a classifier's tradeoff between true and false positives.",
    prerequisites: ["confusion-matrices"],
  },
  {
    id: "data-leakage",
    title: "Data Leakage",
    domain: "machine-learning",
    blurb: "When information from outside training sneaks in and inflates performance.",
    prerequisites: ["training-validation-test-set"],
  },
  {
    id: "sensitivity-analysis",
    title: "Sensitivity Analysis",
    domain: "machine-learning",
    blurb: "Checking how much a model's output changes as inputs or settings shift.",
    prerequisites: ["hyperparameters"],
  },
  {
    id: "generative-vs-discriminative-models",
    title: "Generative vs Discriminative Models",
    domain: "machine-learning",
    blurb: "Modeling how the data was generated versus modeling the decision boundary directly.",
    prerequisites: ["classification-vs-regression"],
  },
  {
    id: "knn",
    title: "K Nearest Neighbors",
    domain: "machine-learning",
    blurb: "Classifying a point by a vote among its closest labeled neighbors.",
    prerequisites: ["classification-vs-regression", "curse-of-dimensionality"],
  },
  {
    id: "lda",
    title: "Linear Discriminant Analysis",
    domain: "machine-learning",
    blurb: "Classifying by assuming each class is Gaussian with shared covariance.",
    prerequisites: [
      "classification-vs-regression",
      "multivariate-normal",
      "generative-vs-discriminative-models",
    ],
  },
  {
    id: "naive-bayes",
    title: "Naive Bayes",
    domain: "machine-learning",
    blurb: "Classifying with Bayes' rule under a (usually false) independence assumption.",
    prerequisites: ["bayes-rule", "generative-vs-discriminative-models"],
  },
  {
    id: "pca",
    title: "Principal Component Analysis (PCA)",
    domain: "machine-learning",
    blurb: "Finding the directions of greatest variance to reduce dimensionality.",
    prerequisites: ["pca-matrix-edition", "covariance-matrix"],
  },
  {
    id: "kernel",
    title: "Kernel",
    domain: "machine-learning",
    blurb: "A shortcut for computing dot products in a much higher-dimensional space.",
    prerequisites: ["dot-product"],
  },
  {
    id: "mercers-theorem",
    title: "Mercer's Theorem",
    domain: "machine-learning",
    blurb: "The condition that guarantees a function is a valid kernel.",
    prerequisites: ["kernel", "positive-definite-matrices"],
  },
  {
    id: "rbf",
    title: "Radial Basis Function (RBF)",
    domain: "machine-learning",
    blurb: "A kernel based purely on distance between points.",
    prerequisites: ["kernel"],
  },
  {
    id: "svm",
    title: "Support Vector Machine",
    domain: "machine-learning",
    blurb: "Finding the classification boundary with the widest possible margin.",
    prerequisites: ["kernel", "classification-vs-regression"],
  },
  {
    id: "svms-for-regression",
    title: "SVMs for Regression",
    domain: "machine-learning",
    blurb: "Adapting the max-margin idea to predict continuous outcomes.",
    prerequisites: ["svm"],
  },
  {
    id: "decision-tree",
    title: "Decision Tree",
    domain: "machine-learning",
    blurb: "Predicting by asking a sequence of yes/no questions about the input.",
    prerequisites: ["classification-vs-regression"],
  },
  {
    id: "splitting-criteria",
    title: "Splitting Criteria",
    domain: "machine-learning",
    blurb: "How a tree decides which question to ask at each node.",
    prerequisites: ["decision-tree"],
  },
  {
    id: "pruning-trees",
    title: "Pruning Trees",
    domain: "machine-learning",
    blurb: "Trimming a tree back to keep it from overfitting the training data.",
    prerequisites: ["decision-tree", "overfitting-underfitting"],
  },
  {
    id: "ensemble-methods",
    title: "Ensemble Methods",
    domain: "machine-learning",
    blurb: "Combining many weak models into one strong one.",
    prerequisites: ["decision-tree"],
  },
  {
    id: "bagging",
    title: "Bagging",
    domain: "machine-learning",
    blurb: "Averaging models trained on bootstrap resamples to cut variance.",
    prerequisites: ["ensemble-methods"],
  },
  {
    id: "random-forests",
    title: "Random Forests",
    domain: "machine-learning",
    blurb: "Bagged trees, decorrelated further by randomizing which features they see.",
    prerequisites: ["bagging", "splitting-criteria"],
  },
  {
    id: "adaboost",
    title: "AdaBoost",
    domain: "machine-learning",
    blurb: "Boosting that reweights misclassified examples after every round.",
    prerequisites: ["ensemble-methods"],
  },
  {
    id: "gradient-boosting",
    title: "Gradient Boosting",
    domain: "machine-learning",
    blurb: "Boosting that fits each new model to the previous model's residual errors.",
    prerequisites: ["ensemble-methods", "gradient-descent"],
  },
  {
    id: "xgboost",
    title: "XGBoost",
    domain: "machine-learning",
    blurb: "A fast, regularized, engineering-heavy implementation of gradient boosting.",
    prerequisites: ["gradient-boosting"],
  },
  {
    id: "clustering-methods",
    title: "Clustering Methods",
    domain: "machine-learning",
    blurb: "Grouping unlabeled points by similarity.",
    prerequisites: ["supervised-vs-unsupervised-learning"],
  },
  {
    id: "k-means-clustering",
    title: "K-Means Clustering",
    domain: "machine-learning",
    blurb: "Partitioning points into k clusters by iteratively updating cluster centers.",
    prerequisites: ["clustering-methods"],
  },
  {
    id: "svd-for-clustering",
    title: "SVD for Clustering",
    domain: "machine-learning",
    blurb: "Using a low-rank SVD approximation to make clustering easier and faster.",
    prerequisites: ["clustering-methods", "svd"],
  },
  {
    id: "probabilistic-pca",
    title: "Probabilistic PCA",
    domain: "machine-learning",
    blurb: "Recasting PCA as maximum likelihood under a latent Gaussian model.",
    prerequisites: ["pca", "mle"],
  },
  {
    id: "kernel-pca",
    title: "Kernel PCA",
    domain: "machine-learning",
    blurb: "Running PCA implicitly in a higher-dimensional feature space via kernels.",
    prerequisites: ["pca", "kernel"],
  },
  {
    id: "t-sne",
    title: "t-SNE",
    domain: "machine-learning",
    blurb: "A nonlinear technique for visualizing high-dimensional data in 2D.",
    prerequisites: ["clustering-methods", "kl-divergence"],
  },
  {
    id: "umap",
    title: "UMAP",
    domain: "machine-learning",
    blurb: "A faster, more structure-preserving alternative to t-SNE.",
    prerequisites: ["t-sne"],
  },
  {
    id: "ica",
    title: "Independent Component Analysis (ICA)",
    domain: "machine-learning",
    blurb: "Unmixing signals by finding statistically independent (not just uncorrelated) components.",
    prerequisites: ["pca", "kl-divergence"],
  },
  {
    id: "gp-regression",
    title: "GP Regression",
    domain: "machine-learning",
    blurb: "Regression that returns a full distribution over functions, not just a point estimate.",
    prerequisites: ["multivariate-normal", "kernel"],
  },
  {
    id: "gp-classification",
    title: "GP Classification",
    domain: "machine-learning",
    blurb: "Squashing a Gaussian process through a logistic link for classification.",
    prerequisites: ["gp-regression", "logistic-regression"],
  },

  // ---------------------------------------------------------------------
  // Machine Learning — practical modelling and evaluation.
  //
  // Every concept below was already being *referred to* by articles and items
  // in the fifty above — feature scaling by k-NN, SVM and gradient descent,
  // calibration by ROC/AUC and naive Bayes, precision-recall by ROC's own
  // imbalance warning — without existing as a node anyone could study. These
  // close those dangling references.
  //
  // All new edges point from a new concept to an existing one, so no existing
  // concept's ancestor set (and therefore no existing item's seeded difficulty)
  // changes. Where a new concept arguably belongs *upstream* of an old one —
  // `feature-scaling` before `knn` is the clearest case — that rewiring is left
  // as a graph decision and recorded in assessments/README.md.
  // ---------------------------------------------------------------------
  {
    id: "feature-scaling",
    title: "Feature Scaling",
    domain: "machine-learning",
    blurb:
      "Standardising and normalising features — and which methods silently depend on it.",
    prerequisites: ["curse-of-dimensionality", "training-validation-test-set"],
  },
  {
    id: "feature-selection",
    title: "Feature Selection",
    domain: "machine-learning",
    blurb:
      "Filter, wrapper and embedded methods for deciding which features earn their place.",
    // `data-leakage` is a real prerequisite, not a cross-reference: selecting
    // features outside the resampling fold is the defining mistake here, and it
    // cannot be explained to someone who has not met leakage.
    prerequisites: ["curse-of-dimensionality", "k-fold-cross-validation", "data-leakage"],
  },
  {
    id: "class-imbalance",
    title: "Class Imbalance",
    domain: "machine-learning",
    blurb:
      "What breaks when one class is rare, and which of the standard remedies actually help.",
    prerequisites: ["confusion-matrices", "loss-functions"],
  },
  {
    id: "precision-recall-curves",
    title: "Precision-Recall Curves",
    domain: "machine-learning",
    blurb:
      "The curve to read when positives are rare and ROC flatters the model.",
    prerequisites: ["roc-curves", "class-imbalance"],
  },
  {
    id: "probability-calibration",
    title: "Probability Calibration",
    domain: "machine-learning",
    blurb:
      "When a predicted 0.7 really means 70% — measuring it, and fixing it when it does not.",
    // The calibration map must itself be fitted on held-out data, so the
    // train/validation/test split is upstream of doing this correctly.
    prerequisites: ["roc-curves", "cross-entropy-loss", "training-validation-test-set"],
  },
  {
    id: "nested-cross-validation",
    title: "Nested Cross-Validation",
    domain: "machine-learning",
    blurb:
      "Scoring the whole selection procedure rather than its luckiest configuration.",
    prerequisites: ["hyperparameters", "data-leakage"],
  },
  {
    id: "learning-curves",
    title: "Learning Curves",
    domain: "machine-learning",
    blurb:
      "Error against training-set size — the diagnostic that says whether more data would help.",
    prerequisites: ["overfitting-underfitting", "k-fold-cross-validation"],
  },
  {
    id: "distribution-shift",
    title: "Distribution Shift",
    domain: "machine-learning",
    blurb:
      "Covariate shift, label shift and concept drift — why a good model stops being one.",
    // A deployed model shapes the data it is next retrained on, which is a
    // leakage-shaped failure and needs `data-leakage` to state.
    prerequisites: ["training-validation-test-set", "generative-vs-discriminative-models", "data-leakage"],
  },
  {
    id: "model-interpretability",
    title: "Model Interpretability",
    domain: "machine-learning",
    blurb:
      "Permutation importance, partial dependence and Shapley values — and what each does not tell you.",
    prerequisites: ["random-forests", "sensitivity-analysis"],
  },
  {
    id: "anomaly-detection",
    title: "Anomaly Detection",
    domain: "machine-learning",
    blurb:
      "Finding the unusual when you have almost no examples of it, and often no labels at all.",
    // High dimension is why the field's methods look the way they do: distance
    // and density both degrade, which is exactly what isolation- and
    // reconstruction-based scores are designed to sidestep.
    prerequisites: ["clustering-methods", "generative-vs-discriminative-models", "curse-of-dimensionality"],
  },

  // ---------------------------------------------------------------------
  // Machine Learning — deep learning.
  //
  // `neural-networks` and `backpropagation` previously dead-ended: the graph
  // could train a dense network and had nothing to say about what is actually
  // built with one. This branch runs from the pieces every architecture shares
  // (activations, optimisers, the two standard regularisers) through the three
  // architectural families, to the representations they produce.
  // ---------------------------------------------------------------------
  {
    id: "activation-functions",
    title: "Activation Functions",
    domain: "deep-learning",
    blurb:
      "Sigmoid, tanh, ReLU and its successors — the nonlinearity that stops depth collapsing.",
    prerequisites: ["neural-networks"],
  },
  {
    id: "sgd-and-adaptive-optimizers",
    title: "SGD and Adaptive Optimizers",
    domain: "deep-learning",
    blurb:
      "Momentum, RMSProp and Adam — why plain gradient descent is rarely what actually runs.",
    prerequisites: ["gradient-descent", "backpropagation"],
  },
  {
    id: "dropout",
    title: "Dropout",
    domain: "deep-learning",
    blurb:
      "Randomly deleting units at training time, and why that regularises rather than breaks.",
    prerequisites: ["neural-networks", "overfitting-underfitting"],
  },
  {
    id: "batch-normalization",
    title: "Batch Normalization",
    domain: "deep-learning",
    blurb:
      "Normalising activations mid-network — what it fixes, and the train/inference asymmetry it creates.",
    prerequisites: ["backpropagation", "feature-scaling"],
  },
  {
    id: "convolutional-neural-networks",
    title: "Convolutional Neural Networks",
    domain: "deep-learning",
    blurb:
      "Weight sharing and locality — turning an image's structure into a prior on the architecture.",
    // The architecture *is* a regularisation choice — a prior expressed in which
    // weights exist — so the overfitting story is upstream of understanding why
    // it works and why augmentation is not optional.
    prerequisites: ["neural-networks", "activation-functions", "overfitting-underfitting"],
  },
  {
    id: "recurrent-neural-networks",
    title: "Recurrent Neural Networks",
    domain: "deep-learning",
    blurb:
      "Sharing weights across time for sequences, and the gradient problem that follows.",
    prerequisites: ["backpropagation", "activation-functions"],
  },
  {
    id: "attention-mechanism",
    title: "Attention Mechanism",
    domain: "deep-learning",
    blurb:
      "Queries, keys and values — letting every position look directly at every other.",
    // The √d scaling is derived from the variance of a sum of independent
    // products, so `variance` is genuinely needed rather than merely cited.
    prerequisites: ["recurrent-neural-networks", "dot-product", "variance"],
  },
  {
    id: "transformers",
    title: "Transformers",
    domain: "deep-learning",
    blurb:
      "Self-attention, multiple heads and positional encoding — attention as the whole architecture.",
    prerequisites: ["attention-mechanism", "batch-normalization"],
  },
  {
    id: "embeddings",
    title: "Embeddings",
    domain: "deep-learning",
    blurb:
      "Learned dense vectors for discrete things, where geometry carries meaning.",
    prerequisites: ["neural-networks", "pca"],
  },
  {
    id: "autoencoders",
    title: "Autoencoders",
    domain: "deep-learning",
    blurb:
      "Reconstructing the input through a bottleneck — nonlinear dimensionality reduction that learns.",
    prerequisites: ["neural-networks", "probabilistic-pca"],
  },

  // ---------------------------------------------------------------------
  // Machine Learning — neural network architectures.
  //
  // Cluster 11 stops at three families and the representations they produce.
  // What it does not do is put the families side by side, or carry the sequence
  // story past attention: an LSTM is described in a paragraph of
  // `recurrent-neural-networks` and has no node, next-token prediction is
  // assumed by `transformers` and defined nowhere, and the linear-recurrence
  // models that now compete with attention on long sequences are absent
  // entirely. This branch is the architecture zoo — what each family assumes
  // about its data, and what that assumption costs.
  // ---------------------------------------------------------------------
  {
    id: "architecture-families",
    title: "Architecture Families",
    domain: "deep-learning",
    blurb:
      "Dense, convolutional, recurrent and attentional networks compared by the assumption each one builds into its wiring.",
    // Reads as a comparison of the three families cluster 11 introduces, so it
    // genuinely requires all three rather than merely mentioning them.
    prerequisites: [
      "convolutional-neural-networks",
      "recurrent-neural-networks",
      "transformers",
    ],
  },
  {
    id: "residual-networks",
    title: "Residual Networks",
    domain: "deep-learning",
    blurb:
      "Adding the input back to the output of a block, and why that one change made depth usable.",
    // The argument is a derivative computation: the skip contributes a +1 term
    // to the Jacobian, so the chain of factors backpropagation multiplies can
    // no longer collapse to zero. That is `backpropagation`, not intuition.
    prerequisites: ["backpropagation", "convolutional-neural-networks"],
  },
  {
    id: "lstm-and-gru",
    title: "LSTM and GRU",
    domain: "deep-learning",
    blurb:
      "Gated cells that carry a memory forward by addition, so gradients survive hundreds of steps.",
    prerequisites: ["recurrent-neural-networks", "activation-functions"],
  },
  {
    id: "autoregressive-models",
    title: "Autoregressive Models",
    domain: "deep-learning",
    blurb:
      "Factorising a joint distribution into a product of next-step conditionals — the objective behind every language model.",
    // The factorisation is the chain rule of probability applied n − 1 times;
    // without `conditional-probability` the objective cannot even be stated.
    prerequisites: ["conditional-probability", "lstm-and-gru", "transformers"],
  },
  {
    id: "state-space-models",
    title: "State Space Models",
    domain: "deep-learning",
    blurb:
      "A linear recurrence that also runs as a convolution — S4 and Mamba, and why linear time matters again.",
    // Diagonalising the transition matrix is what turns the recurrence into a
    // closed form, and the eigenvalue moduli are what decide whether memory
    // decays or blows up. Both are `eigenvalues-eigenvectors`.
    //
    // `attention-mechanism` is a genuine prerequisite rather than a neighbour:
    // the family exists to buy back linear time in the sequence length, and
    // every design decision in it — the two evaluation forms, the fixed-size
    // generation state, the hybrid stacks — is an answer to what attention
    // costs. A learner who has not met attention cannot read any of it.
    prerequisites: [
      "lstm-and-gru",
      "convolutional-neural-networks",
      "eigenvalues-eigenvectors",
      "attention-mechanism",
    ],
  },
  {
    id: "graph-neural-networks",
    title: "Graph Neural Networks",
    domain: "deep-learning",
    blurb:
      "Message passing over edges — a convolution for data whose neighbourhoods are given rather than gridded.",
    prerequisites: ["graphs", "convolutional-neural-networks"],
  },
  {
    id: "generative-adversarial-networks",
    title: "Generative Adversarial Networks",
    domain: "deep-learning",
    blurb:
      "A generator and a discriminator trained against each other, and the equilibrium that is hard to reach.",
    // The optimal-discriminator substitution turns the game's value into a
    // Jensen-Shannon divergence, which is where mode collapse and vanishing
    // generator gradients are actually read off.
    prerequisites: [
      "generative-vs-discriminative-models",
      "neural-networks",
      "kl-divergence",
    ],
  },
  {
    id: "diffusion-models",
    title: "Diffusion Models",
    domain: "deep-learning",
    blurb:
      "Destroy the data with noise on a fixed schedule, then learn to undo one step at a time.",
    prerequisites: [
      "autoencoders",
      "normal-distribution",
      "generative-adversarial-networks",
    ],
  },
  {
    id: "mixture-of-experts",
    title: "Mixture of Experts",
    domain: "deep-learning",
    blurb:
      "Routing each token to a few of many sub-networks, so capacity grows without the compute growing with it.",
    prerequisites: ["transformers", "ensemble-methods"],
  },

  // ---------------------------------------------------------------------
  // Machine Learning — training deep networks at scale.
  //
  // Clusters 11 and 13 cover what gets built and why. Nothing covers what it
  // takes to actually train one: the graph could not say how weights are
  // initialised, why transformers normalise per-token rather than per-batch,
  // what a warmup is for, or why a run that fits on one device is a different
  // problem from one that does not. Each of these is a decision every
  // practitioner makes and none of them had a node.
  // ---------------------------------------------------------------------
  {
    id: "weight-initialization",
    title: "Weight Initialization",
    domain: "deep-learning",
    blurb:
      "Xavier and He scaling — choosing the starting variance so signal neither dies nor explodes with depth.",
    // Both schemes are derived by asking that the variance of the activations
    // be preserved layer to layer, so `variance` is the argument rather than a
    // citation, and the fan-in factor differs by activation. `loss-functions`
    // is here because the standard check on an initialisation is the loss it
    // reports at step zero — ln(k) for k balanced classes — which cannot be
    // stated without it.
    prerequisites: [
      "neural-networks",
      "activation-functions",
      "variance",
      "loss-functions",
    ],
  },
  {
    id: "layer-normalization",
    title: "Layer Normalization",
    domain: "deep-learning",
    blurb:
      "Normalising across features rather than across the batch — and why every transformer uses it.",
    // The content that matters here is pre-norm versus post-norm and the
    // batch-independence argument, neither of which can be stated without the
    // architecture that made the choice consequential.
    prerequisites: ["batch-normalization", "transformers"],
  },
  {
    id: "learning-rate-schedules",
    title: "Learning Rate Schedules",
    domain: "deep-learning",
    blurb:
      "Warmup, decay and cosine annealing — the hyperparameter that is a function of time, not a number.",
    prerequisites: ["sgd-and-adaptive-optimizers", "layer-normalization"],
  },
  {
    id: "data-augmentation",
    title: "Data Augmentation",
    domain: "deep-learning",
    blurb:
      "Manufacturing training examples from invariances you already believe, and the ones you do not.",
    // Augmentation is defined as a training-split-only transform, and its worst
    // failure — augmenting before the split, so near-duplicates land on both
    // sides — cannot even be stated without the split.
    prerequisites: [
      "convolutional-neural-networks",
      "overfitting-underfitting",
      "training-validation-test-set",
    ],
  },
  {
    id: "mixed-precision-training",
    title: "Mixed Precision Training",
    domain: "deep-learning",
    blurb:
      "Half-precision arithmetic with a full-precision safety net — loss scaling, master weights, and what underflows.",
    prerequisites: ["sgd-and-adaptive-optimizers", "backpropagation"],
  },
  {
    id: "distributed-training",
    title: "Distributed Training",
    domain: "deep-learning",
    blurb:
      "Data, model and pipeline parallelism — what is split, what is communicated, and what the batch size does to the schedule.",
    prerequisites: ["learning-rate-schedules", "mixed-precision-training"],
  },

  // ---------------------------------------------------------------------
  // Machine Learning — further paradigms and methods.
  //
  // Reinforcement learning was named in `types-of-machine-learning` and defined
  // nowhere; stacking was named in `ensemble-methods`, DBSCAN and hierarchical
  // clustering in `clustering-methods`, and Bayesian optimisation in
  // `gp-regression`. Each is given a node here.
  // ---------------------------------------------------------------------
  {
    id: "transfer-learning",
    title: "Transfer Learning",
    domain: "deep-learning",
    blurb:
      "Reusing a model trained elsewhere — feature extraction, fine-tuning, and when it backfires.",
    // Matching the pretrained model's own input normalisation is not optional
    // and is the most common silent mistake here, so `feature-scaling` is
    // genuinely needed rather than merely adjacent.
    prerequisites: ["convolutional-neural-networks", "embeddings", "feature-scaling"],
  },
  {
    id: "self-supervised-learning",
    title: "Self-Supervised Learning",
    domain: "deep-learning",
    blurb:
      "Manufacturing labels from the input itself — the engine behind modern pretraining.",
    prerequisites: ["transfer-learning", "autoencoders"],
  },
  {
    id: "reinforcement-learning",
    title: "Reinforcement Learning",
    domain: "machine-learning",
    blurb:
      "Learning from delayed, evaluative reward through interaction rather than from labels.",
    prerequisites: ["types-of-machine-learning", "markov-chains"],
  },
  {
    id: "multi-armed-bandits",
    title: "Multi-Armed Bandits",
    domain: "machine-learning",
    blurb:
      "Exploration versus exploitation in its simplest complete form, with regret as the scoreboard.",
    prerequisites: ["reinforcement-learning", "confidence-interval"],
  },
  {
    id: "bayesian-optimization",
    title: "Bayesian Optimization",
    domain: "machine-learning",
    blurb:
      "Tuning something expensive by modelling the score surface and its uncertainty.",
    prerequisites: ["gp-regression", "hyperparameters"],
  },
  {
    id: "stacking",
    title: "Stacking",
    domain: "machine-learning",
    blurb:
      "Training a model to combine models — and the out-of-fold discipline that keeps it honest.",
    prerequisites: ["ensemble-methods", "nested-cross-validation"],
  },
  {
    id: "hierarchical-clustering",
    title: "Hierarchical Clustering",
    domain: "machine-learning",
    blurb:
      "Dendrograms and linkage rules — every granularity at once, and the cut still to choose.",
    prerequisites: ["clustering-methods"],
  },
  {
    id: "density-based-clustering",
    title: "Density-Based Clustering",
    domain: "machine-learning",
    blurb:
      "DBSCAN: clusters as connected dense regions, with noise as a first-class outcome.",
    prerequisites: ["clustering-methods", "k-means-clustering"],
  },

  // ---------------------------------------------------------------------
  // Machine Learning — scaling, adapting and serving.
  //
  // The last stretch of the deep-learning branch, and the part a professional
  // actually spends time on: how big a model should be for a compute budget,
  // what the input is chopped into before it is embedded, how a pretrained
  // model is bent to a new task without retraining it, how a preference is
  // turned into an objective, and how a trained model is made small enough to
  // serve. Everything here depends on the adaptation concepts above, which is
  // why it reads after them rather than beside them.
  // ---------------------------------------------------------------------
  {
    id: "scaling-laws",
    title: "Scaling Laws",
    domain: "deep-learning",
    blurb:
      "Loss as a power law in parameters, data and compute — and the budget question that follows from it.",
    prerequisites: ["learning-curves", "autoregressive-models"],
  },
  {
    id: "tokenization",
    title: "Tokenization",
    domain: "deep-learning",
    blurb:
      "Byte-pair encoding and its relatives: the vocabulary decision made before any weight is trained.",
    prerequisites: ["embeddings", "autoregressive-models"],
  },
  {
    id: "contrastive-learning",
    title: "Contrastive Learning",
    domain: "deep-learning",
    blurb:
      "Pulling matched pairs together and pushing everything else apart — InfoNCE, and where the negatives come from.",
    // The InfoNCE objective is literally a cross-entropy over similarity
    // scores with the positive as the correct class, so the loss is not an
    // analogy to classification — it is one.
    prerequisites: ["self-supervised-learning", "cross-entropy-loss", "embeddings"],
  },
  {
    id: "parameter-efficient-fine-tuning",
    title: "Parameter-Efficient Fine-Tuning",
    domain: "deep-learning",
    blurb:
      "LoRA and adapters: training a low-rank correction instead of every weight, and why that is usually enough.",
    // LoRA is a rank constraint written as BA with an inner dimension r, and
    // the parameter arithmetic that motivates it is rank arithmetic.
    prerequisites: ["transfer-learning", "rank", "transformers"],
  },
  {
    id: "instruction-tuning-and-rlhf",
    title: "Instruction Tuning and RLHF",
    domain: "deep-learning",
    blurb:
      "Turning a next-token predictor into something that follows instructions, and the KL leash that keeps it there.",
    prerequisites: ["reinforcement-learning", "autoregressive-models", "kl-divergence"],
  },
  {
    id: "knowledge-distillation",
    title: "Knowledge Distillation",
    domain: "deep-learning",
    blurb:
      "Training a small model on a large one's full output distribution rather than on the labels.",
    // The method was introduced to compress an ensemble into one model, and the
    // comparison against paying for every member at inference is the clearest
    // statement of what it buys.
    prerequisites: [
      "cross-entropy-loss",
      "kl-divergence",
      "neural-networks",
      "ensemble-methods",
    ],
  },
  {
    id: "quantization",
    title: "Quantization",
    domain: "deep-learning",
    blurb:
      "Storing and computing in 8 or 4 bits — where the error goes, and why serving is memory-bound anyway.",
    prerequisites: ["mixed-precision-training", "knowledge-distillation"],
  },

  // ---------------------------------------------------------------------
  // Graphical Models & Bayesian ML
  // ---------------------------------------------------------------------
  {
    id: "graphs",
    title: "Graphs",
    domain: "graphical-models",
    blurb: "Nodes and edges — the structure behind every graphical model.",
    prerequisites: ["set-theory"],
  },
  {
    id: "directed-vs-undirected-graphs",
    title: "Directed vs Undirected Graphs",
    domain: "graphical-models",
    blurb: "Causal-looking arrows versus symmetric connections between variables.",
    prerequisites: ["graphs"],
  },
  {
    id: "conditional-independence-d-separation",
    title: "Conditional Independence and D-Separation",
    domain: "graphical-models",
    blurb: "Reading independence relationships directly off a graph's structure.",
    prerequisites: [
      "directed-vs-undirected-graphs",
      "independence-set-theory",
      "conditional-probability",
    ],
  },
  {
    id: "markov-random-fields",
    title: "Markov Random Fields",
    domain: "graphical-models",
    blurb: "Undirected graphical models where each node depends only on its neighbors.",
    prerequisites: ["directed-vs-undirected-graphs", "conditional-independence-d-separation"],
  },
  {
    id: "markov-chains",
    title: "Markov Chains",
    domain: "graphical-models",
    blurb: "A sequence of states where the future depends only on the present.",
    prerequisites: ["directed-vs-undirected-graphs", "conditional-probability"],
  },
  {
    id: "hmm",
    title: "Hidden Markov Models (HMM)",
    domain: "graphical-models",
    blurb: "A Markov chain of hidden states, observed only through noisy emissions.",
    prerequisites: ["markov-chains", "joint-distribution"],
  },
  {
    id: "mixture-models-and-latent-variables",
    title: "Mixture Models and Latent Variables",
    domain: "graphical-models",
    blurb: "Modeling data as coming from a mix of hidden subpopulations.",
    prerequisites: ["joint-distribution", "marginal-distribution"],
  },
  {
    id: "em-algorithm",
    title: "EM Algorithm",
    domain: "graphical-models",
    blurb: "Alternating between guessing latent variables and re-fitting parameters.",
    prerequisites: ["mle", "mixture-models-and-latent-variables"],
  },
  {
    id: "gaussian-mixture-models",
    title: "Gaussian Mixture Models",
    domain: "graphical-models",
    blurb: "Clustering by fitting a mixture of multivariate Gaussians via EM.",
    prerequisites: ["em-algorithm", "multivariate-normal"],
  },
  {
    id: "variational-inference-elbo",
    title: "Variational Inference: ELBO",
    domain: "graphical-models",
    blurb: "Approximating an intractable posterior by maximizing a tractable lower bound.",
    prerequisites: ["mixture-models-and-latent-variables", "kl-divergence"],
  },
  {
    id: "laplace-approximation",
    title: "Laplace Approximation",
    domain: "graphical-models",
    blurb: "Approximating a posterior with a Gaussian centered at its mode.",
    prerequisites: ["mle", "multivariate-normal"],
  },
  {
    id: "conjugate-priors",
    title: "Conjugate Priors",
    domain: "graphical-models",
    blurb: "Priors chosen so the posterior stays in the same family, turning Bayesian updating into closed-form arithmetic on the parameters.",
    prerequisites: ["bayes-rule", "mle"],
  },
  {
    id: "importance-sampling",
    title: "Importance Sampling",
    domain: "graphical-models",
    blurb: "Estimating an expectation under a distribution you can't sample from by sampling a different one and reweighting.",
    prerequisites: ["expectation", "joint-distribution"],
  },
  {
    id: "markov-chain-monte-carlo",
    title: "Markov Chain Monte Carlo (MCMC)",
    domain: "graphical-models",
    blurb: "Building a Markov chain whose stationary distribution is the posterior you want, then sampling it by just running the chain.",
    prerequisites: ["markov-chains", "importance-sampling"],
  },
  {
    id: "gibbs-sampling",
    title: "Gibbs Sampling",
    domain: "graphical-models",
    blurb: "The Metropolis-Hastings special case that always accepts: cycle through each variable and resample it from its full conditional.",
    prerequisites: ["markov-chain-monte-carlo", "conditional-probability"],
  },
  {
    id: "dirichlet-process",
    title: "Dirichlet Process",
    domain: "graphical-models",
    blurb: "A distribution over distributions: the nonparametric-Bayes prior that lets a mixture model discover its own number of clusters from the data.",
    prerequisites: ["conjugate-priors", "gibbs-sampling"],
  },
  {
    id: "stick-breaking-construction",
    title: "Stick-Breaking Construction",
    domain: "graphical-models",
    blurb: "Building a Dirichlet process draw by hand: repeatedly break off a random fraction of what's left of a unit-length stick to get infinitely many cluster weights that sum to one.",
    prerequisites: ["dirichlet-process"],
  },
  {
    id: "variational-inference-vaes",
    title: "Variational Inference: VAEs",
    domain: "deep-learning",
    blurb: "Learning a latent-variable generative model with a neural network and the ELBO.",
    prerequisites: ["variational-inference-elbo", "neural-networks", "backpropagation"],
  },
  {
    id: "gaussian-process",
    title: "Gaussian Process",
    domain: "graphical-models",
    blurb: "A distribution over functions, defined by a mean and a kernel.",
    prerequisites: ["multivariate-normal", "kernel"],
  },
  {
    id: "hilbert-space",
    title: "Hilbert Space",
    domain: "graphical-models",
    blurb: "A vector space with an inner product, complete enough that limits of Cauchy sequences stay inside it — the setting that lets 'vector' mean a function instead of a finite list of numbers.",
    prerequisites: ["dot-product", "vector-norm"],
  },
  {
    id: "functional-data-analysis",
    title: "Functional Data Analysis",
    domain: "graphical-models",
    blurb: "Treating each observation as a whole curve rather than a finite vector of features — a data point living in a Hilbert space of functions.",
    prerequisites: ["hilbert-space"],
  },
  {
    id: "rkhs",
    title: "Reproducing Kernel Hilbert Space (RKHS)",
    domain: "graphical-models",
    blurb: "The function space that makes kernel methods mathematically rigorous.",
    prerequisites: ["kernel", "mercers-theorem"],
  },
  {
    id: "wasserstein-distance",
    title: "Wasserstein Distance",
    domain: "graphical-models",
    blurb: "Measuring the distance between distributions as the cost of moving mass.",
    prerequisites: ["kl-divergence"],
  },

  // ---------------------------------------------------------------------
  // Stochastic Processes
  //
  // Simple Random Walk is the discrete process with independent ±1 steps;
  // Brownian Motion is its continuous-time limit (Shreve, Stochastic Calculus
  // for Finance II, ch. 3) — together the two building blocks the Stochastic
  // Calculus chapter borrows as prerequisites. Poisson Process and
  // Continuous-Time Markov Chains round out the other classical building
  // block (jump processes rather than diffusions); Kalman Filter is the
  // linear-Gaussian state-space model, a continuous-state sibling of `hmm`
  // (graphical-models) that leans on `conditional-multivariate-normal` for
  // its update step.
  // ---------------------------------------------------------------------
  {
    id: "simple-random-walk",
    title: "Simple Random Walk",
    domain: "stochastic-processes",
    blurb:
      "Sum up independent ±1 coin flips — the first process where 'independent increments' and 'fair game' become precise, and the discrete skeleton every continuous-time model below is a limit of.",
    prerequisites: ["bernoulli-binomial", "independence-set-theory"],
  },
  {
    id: "brownian-motion",
    title: "Brownian Motion",
    domain: "stochastic-processes",
    blurb:
      "The continuous-time, continuous-path limit of the simple random walk: independent Gaussian increments, and a path so jagged it has no derivative anywhere.",
    prerequisites: ["simple-random-walk", "normal-distribution", "central-limit-theorem"],
  },
  {
    id: "poisson-process",
    title: "Poisson Process",
    domain: "stochastic-processes",
    blurb:
      "The counting process built from independent Exponential waiting times — events land one at a time at a constant rate, and the count in any window is Poisson.",
    prerequisites: ["poisson-distribution", "exponential-distribution"],
  },
  {
    id: "continuous-time-markov-chains",
    title: "Continuous-Time Markov Chains",
    domain: "stochastic-processes",
    blurb:
      "A Markov chain that jumps at random times instead of fixed steps: an Exponential holding time in each state, a generator matrix instead of a transition matrix.",
    prerequisites: ["markov-chains", "poisson-process"],
  },
  {
    id: "kalman-filter",
    title: "Kalman Filter",
    domain: "stochastic-processes",
    blurb:
      "The linear-Gaussian state-space model: a hidden state that evolves and emits noisy observations, tracked exactly by alternating a predict step and a conditional-Gaussian update.",
    prerequisites: ["hmm", "conditional-multivariate-normal"],
  },
  {
    id: "karhunen-loeve-expansion",
    title: "Karhunen-Loève Expansion",
    domain: "stochastic-processes",
    blurb:
      "Writing a random process as an infinite sum of fixed orthogonal functions times uncorrelated random coefficients — Mercer's theorem applied to a covariance function, and the reason Brownian motion has a closed-form series representation at all.",
    prerequisites: ["functional-data-analysis", "mercers-theorem", "brownian-motion"],
  },

  // ---------------------------------------------------------------------
  // Stochastic Calculus
  //
  // Follows the spine of Shreve's Stochastic Calculus for Finance II:
  // Continuous-Time Models — ch. 2 (information/martingales), ch. 4 (the
  // Itô integral, Itô-Doeblin formula, and Black-Scholes-Merton equation),
  // ch. 5 (Girsanov's theorem and risk-neutral pricing), and ch. 6 (the
  // Feynman-Kac link back to PDEs). Brownian Motion and Simple Random Walk
  // are borrowed from the Stochastic Processes chapter above rather than
  // redefined here.
  // ---------------------------------------------------------------------
  {
    id: "filtrations-and-adapted-processes",
    title: "Filtrations and Adapted Processes",
    domain: "stochastic-calculus",
    blurb:
      "Formalizing 'everything observable by time t' as a growing sigma-algebra, and calling a process adapted when it only looks at the past.",
    prerequisites: ["sigma-algebra", "brownian-motion"],
  },
  {
    id: "martingales-continuous-time",
    title: "Martingales in Continuous Time",
    domain: "stochastic-calculus",
    blurb:
      "A process whose best forecast of tomorrow is today's value — Brownian motion is one, and it's the property every hedging and pricing argument ahead leans on.",
    prerequisites: ["filtrations-and-adapted-processes", "expectation", "simple-random-walk"],
  },
  {
    id: "quadratic-variation",
    title: "Quadratic Variation",
    domain: "stochastic-calculus",
    blurb:
      "Brownian motion accumulates (ΔW)² at rate dt even though it has no derivative — the single fact that makes dW·dW behave like dt in every Itô computation.",
    prerequisites: ["brownian-motion"],
  },
  {
    id: "ito-integral",
    title: "Itô Integral",
    domain: "stochastic-calculus",
    blurb:
      "Defining ∫ Δ dW against an integrator of unbounded variation by evaluating the integrand at the left endpoint of every partition — and why that choice is what keeps the integral a martingale.",
    prerequisites: ["quadratic-variation", "martingales-continuous-time"],
  },
  {
    id: "ito-doeblin-formula",
    title: "Itô's Lemma (Itô-Doeblin Formula)",
    domain: "stochastic-calculus",
    blurb:
      "The chain rule for stochastic processes: a second-order correction term survives differentiation because (dW)² = dt instead of vanishing.",
    prerequisites: ["ito-integral"],
  },
  {
    id: "stochastic-differential-equations",
    title: "Stochastic Differential Equations (SDEs)",
    domain: "stochastic-calculus",
    blurb:
      "Equations of the form dX = μ(X,t) dt + σ(X,t) dW — an ODE plus a noise term whose size can itself depend on where the process currently is.",
    prerequisites: ["ito-doeblin-formula"],
  },
  {
    id: "geometric-brownian-motion",
    title: "Geometric Brownian Motion",
    domain: "stochastic-calculus",
    blurb:
      "The SDE dS = μS dt + σS dW, solved by applying Itô's lemma to log S — the default model for a stock price and the engine behind Black-Scholes.",
    prerequisites: ["stochastic-differential-equations"],
  },
  {
    id: "ornstein-uhlenbeck-process",
    title: "Ornstein-Uhlenbeck Process",
    domain: "stochastic-calculus",
    blurb:
      "The SDE dX = θ(μ − X) dt + σ dW — a mean-reverting sibling of geometric Brownian motion, solved by an integrating factor rather than Itô's lemma on a logarithm.",
    prerequisites: ["stochastic-differential-equations"],
  },
  {
    id: "multidimensional-ito-calculus",
    title: "Multidimensional Itô Calculus",
    domain: "stochastic-calculus",
    blurb:
      "Itô's lemma and its cross-variation terms when several, possibly correlated, Brownian motions drive the same process.",
    prerequisites: ["ito-doeblin-formula"],
  },
  {
    id: "black-scholes-merton-equation",
    title: "Black-Scholes-Merton Equation",
    domain: "stochastic-calculus",
    blurb:
      "Hedging an option with a self-financing stock-and-bond portfolio and setting the resulting drift to zero turns option pricing into a backward parabolic PDE.",
    prerequisites: ["geometric-brownian-motion"],
  },
  {
    id: "girsanov-theorem",
    title: "Girsanov's Theorem",
    domain: "stochastic-calculus",
    blurb:
      "Changing probability measure can cancel a process's drift entirely — turning a Brownian motion with drift under one measure into a driftless one under another.",
    prerequisites: ["martingales-continuous-time", "stochastic-differential-equations"],
  },
  {
    id: "risk-neutral-pricing",
    title: "Risk-Neutral Pricing",
    domain: "stochastic-calculus",
    blurb:
      "Under the measure Girsanov's theorem supplies, every discounted asset price is a martingale — so a derivative's price is just a discounted expectation, no drift assumption required.",
    prerequisites: ["girsanov-theorem"],
  },
  {
    id: "martingale-representation-theorem",
    title: "Martingale Representation Theorem",
    domain: "stochastic-calculus",
    blurb:
      "Every martingale in a Brownian filtration is itself an Itô integral of some adapted process — the fact that guarantees a replicating hedge always exists.",
    prerequisites: ["ito-integral", "girsanov-theorem"],
  },
  {
    id: "feynman-kac-theorem",
    title: "Feynman-Kac Theorem",
    domain: "stochastic-calculus",
    blurb:
      "The bridge back to PDEs: a conditional expectation of a diffusion solves a parabolic PDE, and that PDE's solution recovers the expectation — Black-Scholes-Merton is the special case.",
    prerequisites: ["stochastic-differential-equations", "black-scholes-merton-equation"],
  },

  // ---------------------------------------------------------------------
  // Financial Instruments
  //
  // Every financial instrument, from a savings bond to a swap, is a
  // contract for moving cash flows across time and across parties. This
  // chapter starts with the discounting arithmetic that prices any cash
  // flow, builds up fixed income and equity as the two basic claims on a
  // firm, and ends with derivatives (forwards, options, swaps) as
  // contracts *on* those instruments, priced by the same no-arbitrage
  // logic Stochastic Calculus develops in full (Black-Scholes-Merton,
  // risk-neutral pricing) for the continuous-time case.
  // ---------------------------------------------------------------------
  {
    id: "time-value-of-money",
    title: "Time Value of Money",
    domain: "financial-instruments",
    blurb:
      "A dollar today is worth more than a dollar tomorrow — discounting and compounding are the arithmetic that makes cash flows at different dates comparable.",
    prerequisites: [],
  },
  {
    id: "bonds-and-fixed-income",
    title: "Bonds and Fixed Income",
    domain: "financial-instruments",
    blurb:
      "A bond is a promise to pay coupons and a face value on a schedule — pricing one is just discounting those promised cash flows back to today.",
    prerequisites: ["time-value-of-money"],
  },
  {
    id: "yield-to-maturity",
    title: "Yield to Maturity",
    domain: "financial-instruments",
    blurb:
      "The single discount rate that makes a bond's promised cash flows equal its market price — the market's summary number for a bond's return.",
    prerequisites: ["bonds-and-fixed-income"],
  },
  {
    id: "yield-curve-and-term-structure",
    title: "Yield Curves and the Term Structure",
    domain: "financial-instruments",
    blurb:
      "Plotting yield to maturity against time to maturity for otherwise-similar bonds — its shape (upward, flat, inverted) is read as a signal about growth and rate expectations.",
    prerequisites: ["yield-to-maturity"],
  },
  {
    id: "bond-duration-and-convexity",
    title: "Duration and Convexity",
    domain: "financial-instruments",
    blurb:
      "Duration is a bond price's first-order sensitivity to a shift in yield; convexity is the second-order correction — together a Taylor expansion of price in yield.",
    prerequisites: ["yield-to-maturity"],
  },
  {
    id: "equities-and-stock-markets",
    title: "Equities and Stock Markets",
    domain: "financial-instruments",
    blurb:
      "A share is a residual claim on a firm's assets and earnings after every other claim (including bondholders) is paid — the other basic building block alongside fixed income.",
    prerequisites: ["time-value-of-money"],
  },
  {
    id: "etfs-and-index-funds",
    title: "ETFs and Index Funds",
    domain: "financial-instruments",
    blurb:
      "Pooled vehicles that hold a basket of underlying securities and track an index — an ETF trades intraday like a stock, while a traditional index fund prices once a day at NAV.",
    prerequisites: ["equities-and-stock-markets"],
  },
  {
    id: "mutual-funds-and-nav",
    title: "Mutual Funds and Net Asset Value",
    domain: "financial-instruments",
    blurb:
      "A mutual fund's price is its net asset value: total portfolio value divided by shares outstanding, computed once per day rather than traded continuously.",
    prerequisites: ["etfs-and-index-funds"],
  },
  {
    id: "derivatives-overview",
    title: "Derivatives: An Overview",
    domain: "financial-instruments",
    blurb:
      "A derivative is a contract whose value is derived from an underlying asset's price — used to hedge risk, speculate, or gain leveraged exposure without owning the asset outright.",
    prerequisites: ["bonds-and-fixed-income", "equities-and-stock-markets"],
  },
  {
    id: "forwards-and-futures",
    title: "Forwards and Futures",
    domain: "financial-instruments",
    blurb:
      "Both lock in today a price for buying or selling an asset later; a forward is a private, customized contract, while a futures contract is standardized, exchange-traded, and marked to market daily.",
    prerequisites: ["derivatives-overview", "time-value-of-money"],
  },
  {
    id: "options-calls-and-puts",
    title: "Options: Calls and Puts",
    domain: "financial-instruments",
    blurb:
      "A call gives the right (not the obligation) to buy at a fixed strike price; a put gives the right to sell — that asymmetry, paid for upfront as a premium, is what separates options from forwards.",
    prerequisites: ["derivatives-overview"],
  },
  {
    id: "option-payoff-and-put-call-parity",
    title: "Option Payoffs and Put-Call Parity",
    domain: "financial-instruments",
    blurb:
      "Kinked payoff diagrams (max(S-K,0) for a call, max(K-S,0) for a put) combine into an exact no-arbitrage identity linking a call, a put, the stock, and a bond at the same strike and maturity.",
    prerequisites: ["options-calls-and-puts", "bonds-and-fixed-income"],
  },
  {
    id: "option-pricing-and-greeks",
    title: "Option Pricing and the Greeks",
    domain: "financial-instruments",
    blurb:
      "Black-Scholes-Merton prices a call or put in closed form under geometric Brownian motion; the Greeks (delta, gamma, vega, theta, rho) are the price's sensitivities to each input.",
    prerequisites: [
      "option-payoff-and-put-call-parity",
      "black-scholes-merton-equation",
      "geometric-brownian-motion",
    ],
  },
  {
    id: "interest-rate-and-currency-swaps",
    title: "Interest Rate and Currency Swaps",
    domain: "financial-instruments",
    blurb:
      "Two parties agree to exchange cash flows on a schedule — fixed for floating interest payments, or payments in one currency for another — without ever exchanging the underlying principal.",
    prerequisites: ["derivatives-overview", "yield-curve-and-term-structure"],
  },
  {
    id: "credit-default-swaps",
    title: "Credit Default Swaps",
    domain: "financial-instruments",
    blurb:
      "Insurance on a bond issuer's default: the protection buyer pays a periodic premium, and the seller pays out if a specified credit event occurs — pricing one means estimating a default probability.",
    prerequisites: ["interest-rate-and-currency-swaps", "bonds-and-fixed-income"],
  },

  // ---------------------------------------------------------------------
  // Python for Data Work
  //
  // A self-contained chain: the two built-in containers, then the loop forms
  // that walk them, then comprehensions as the expression version of those
  // loops — and then the same operations again at array and table scale, where
  // the loop disappears into a vectorised call. The whole point of the chapter
  // is that last move, so `numpy-arrays` genuinely depends on the loop it
  // replaces: you cannot see what vectorisation buys you without first having
  // written the `for` it eliminates.
  // ---------------------------------------------------------------------
  {
    id: "python-variables-types",
    title: "Variables and Core Data Types",
    domain: "python",
    blurb:
      "Binding a name with = and the four building-block types — int, float, str, bool — everything else is built from.",
    prerequisites: [],
  },
  {
    id: "python-type-conversion",
    title: "Type Conversion and Truthiness",
    domain: "python",
    blurb:
      "Converting explicitly between types with int(), float(), str(), bool() — and why bool(\"0\") is True.",
    prerequisites: ["python-variables-types"],
  },
  {
    id: "python-operators",
    title: "Arithmetic, Comparison, and Boolean Operators",
    domain: "python",
    blurb:
      "// and % beyond plain division, short-circuiting and/or, and building strings with f-strings.",
    prerequisites: ["python-type-conversion"],
  },
  {
    id: "python-conditionals",
    title: "Conditionals: if, elif, else",
    domain: "python",
    blurb:
      "The first logical expression that changes what a program does — indentation-delimited branches, and exactly one runs.",
    prerequisites: ["python-operators"],
  },
  {
    id: "python-while-loops",
    title: "while Loops",
    domain: "python",
    blurb:
      "Repeating for as long as a condition holds — re-checked before every pass, including the first.",
    prerequisites: ["python-conditionals"],
  },
  {
    id: "python-for-loops",
    title: "for Loops and range",
    domain: "python",
    blurb:
      "Walking an iterable one item at a time, and range()'s half-open convention for counting a fixed number of times.",
    prerequisites: ["python-conditionals"],
  },
  {
    id: "python-functions",
    title: "Functions: def, Parameters, and Return",
    domain: "python",
    blurb:
      "Packaging a computation behind a name — positional and default parameters, return vs. a bare print, and the local scope a function body runs in.",
    prerequisites: ["python-for-loops"],
  },
  {
    id: "python-lists-intro",
    title: "Introduction to Lists",
    domain: "python",
    blurb:
      "Building an ordered, mutable collection with [ ] — creation, len(), and membership before indexing gets involved.",
    prerequisites: ["python-for-loops"],
  },
  {
    id: "python-indexing",
    title: "Indexing: Accessing List Items",
    domain: "python",
    blurb:
      "Zero-based positions, and negative indices that count backward from the end without needing len().",
    prerequisites: ["python-lists-intro"],
  },
  {
    id: "python-slicing",
    title: "Slicing: Getting Sublists",
    domain: "python",
    blurb:
      "The half-open slice convention that makes a[:k] + a[k:] whole again — and why a slice never raises where an index would.",
    prerequisites: ["python-indexing"],
  },
  {
    id: "python-list-operations",
    title: "Mutating Lists and Useful Methods",
    domain: "python",
    blurb:
      "Aliasing (b = a shares one object), the mutating methods that return None, and sort/sorted/count/index.",
    prerequisites: ["python-slicing"],
  },
  {
    id: "python-tuples",
    title: "Tuples",
    domain: "python",
    blurb:
      "Fixed, ordered, and immutable — the sequence you reach for when a list would invite the wrong kind of change.",
    prerequisites: ["python-list-operations"],
  },
  {
    id: "python-dictionaries",
    title: "Dictionaries",
    domain: "python",
    blurb:
      "Hash-based lookup by key in O(1): counting, grouping, inverting, and d[k] versus d.get(k).",
    prerequisites: ["python-list-operations"],
  },
  {
    id: "python-sets",
    title: "Sets",
    domain: "python",
    blurb:
      "A dict with the values thrown away: unique membership in O(1), set algebra, and why keys must be hashable.",
    prerequisites: ["python-dictionaries"],
  },
  {
    id: "python-loops",
    title: "Loops, enumerate, and zip",
    domain: "python",
    blurb:
      "Iterating over items rather than indices — and reaching for enumerate or zip when you need both.",
    prerequisites: ["python-list-operations", "python-dictionaries", "python-for-loops"],
  },
  {
    id: "python-comprehensions",
    title: "Comprehensions",
    domain: "python",
    blurb:
      "The same loop written as one expression, for lists, dicts, and sets — and when a loop is still clearer.",
    prerequisites: ["python-loops"],
  },
  {
    id: "numpy-arrays",
    title: "NumPy Arrays and Vectorization",
    domain: "python",
    blurb:
      "One dtype, one contiguous block, and elementwise operations that push the loop into C.",
    prerequisites: ["python-list-operations", "python-loops"],
  },
  {
    id: "numpy-array-creation",
    title: "Creating Arrays: arange, linspace, and Friends",
    domain: "python",
    blurb:
      "arange for a step size, linspace for a point count, and zeros/ones/full/eye for a shape with no data yet.",
    prerequisites: ["numpy-arrays"],
  },
  {
    id: "numpy-indexing",
    title: "Indexing, Boolean Masks, and Fancy Indexing",
    domain: "python",
    blurb:
      "A[i, j] over nested brackets, a[a > 0] over a loop, and which selections return a view versus a copy.",
    prerequisites: ["numpy-array-creation"],
  },
  {
    id: "numpy-broadcasting",
    title: "Broadcasting and Axis Reductions",
    domain: "python",
    blurb:
      "Shape alignment from the trailing axis, and what axis= actually means in a sum, mean, or argmax.",
    prerequisites: ["numpy-indexing"],
  },
  {
    id: "numpy-matrices",
    title: "Matrices: @, Transpose, and linalg",
    domain: "python",
    blurb:
      "@ for matrix multiplication versus * for elementwise, plus the identity, inverse, and solve from numpy.linalg.",
    prerequisites: ["numpy-broadcasting"],
  },
  {
    id: "pandas-dataframes",
    title: "pandas Series and DataFrames",
    domain: "python",
    blurb:
      "Labelled arrays: the index is the point, and .loc and .iloc are not interchangeable.",
    prerequisites: ["numpy-arrays", "python-dictionaries"],
  },
  {
    id: "pandas-groupby",
    title: "groupby, Merge, and Reshape",
    domain: "python",
    blurb:
      "Split-apply-combine, joins that silently change row counts, and the long/wide pivot.",
    prerequisites: ["pandas-dataframes", "python-comprehensions"],
  },
];

export const conceptById: Map<string, Concept> = new Map(
  concepts.map((concept) => [concept.id, concept]),
);
