import type { Item, SourceRef } from "../../lib/assessment/types";

/**
 * Precision matrices → Gaussian graphical models → the graphical lasso. Eight
 * items per concept, two at each cognitive level.
 *
 * The thread through all three is one fact: for a multivariate normal,
 * Xᵢ ⊥ Xⱼ | everything else ⇔ Θᵢⱼ = 0. `precision-matrix` establishes it,
 * `gaussian-graphical-models` reads a graph off it, and `graphical-lasso`
 * estimates a Θ with exact zeros so the graph can be learned from data.
 */
const AUTHORED: SourceRef = {
  id: "mathlingo-authored-structure-learning",
  tier: "generated",
  title: "Mathlingo authored item (Gaussian structure learning)",
};

const PRECISION = ["precision-matrix", "covariance-matrix", "conditional-multivariate-normal"];
const GGM = ["gaussian-graphical-models", "precision-matrix", "markov-random-fields"];
const GLASSO = ["graphical-lasso", "gaussian-graphical-models", "precision-matrix", "lasso", "mle"];

export const gaussianStructureLearningItems: Item[] = [
  // --- precision-matrix ------------------------------------------------------
  {
    id: "precision-matrix--recall-conditional-independence",
    conceptId: "precision-matrix",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem:
      "Define the precision matrix $\\Theta$ of a random vector $X$, and state what $\\Theta_{ij} = 0$ means when " +
      "$X$ is multivariate normal.",
    rubric: {
      elements: [
        { id: "definition", description: "$\\Theta = \\Sigma^{-1}$, the inverse of the covariance matrix (which must be positive definite).", weight: 3, required: true },
        { id: "ci", description: "$\\Theta_{ij} = 0$ if and only if $X_i$ and $X_j$ are conditionally independent given all the other variables.", weight: 4, required: true },
      ],
    },
    difficulty: -0.9,
    discrimination: 1.2,
    expectedSeconds: 50,
    prereqClosure: PRECISION,
    source: AUTHORED,
    status: "live",
  },
  {
    id: "precision-matrix--recall-diagonal-meaning",
    conceptId: "precision-matrix",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "For $X \\sim \\mathcal{N}(\\mu, \\Sigma)$ with precision $\\Theta = \\Sigma^{-1}$, what is $\\operatorname{Var}(X_i \\mid X_{-i})$, the variance of $X_i$ given all the other variables?",
    choices: [
      { id: "a", text: "$1/\\Theta_{ii}$", correct: true },
      {
        id: "b",
        text: "$\\Sigma_{ii}$",
        correct: false,
        misconception: {
          id: "precision-conditional-equals-marginal",
          description: "Gives the marginal variance; conditioning on correlated variables can only reduce the variance.",
          blameConceptId: "conditional-multivariate-normal",
        },
      },
      {
        id: "c",
        text: "$\\Theta_{ii}$",
        correct: false,
        misconception: {
          id: "precision-diagonal-is-variance",
          description: "Forgets that precision is an inverse variance: a large $\\Theta_{ii}$ means a small conditional variance.",
          blameConceptId: "precision-matrix",
        },
      },
      {
        id: "d",
        text: "$1/\\Sigma_{ii}$",
        correct: false,
        misconception: {
          id: "precision-elementwise-inverse",
          description: "Treats matrix inversion as element-wise; $(\\Sigma^{-1})_{ii} \\ne 1/\\Sigma_{ii}$ unless $\\Sigma$ is diagonal.",
          blameConceptId: "covariance-matrix",
        },
      },
    ],
    difficulty: -0.5,
    discrimination: 1.2,
    expectedSeconds: 45,
    prereqClosure: PRECISION,
    source: AUTHORED,
    status: "live",
  },
  {
    id: "precision-matrix--apply-partial-correlation",
    conceptId: "precision-matrix",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A Gaussian vector has precision entries $\\Theta_{11} = 4$, $\\Theta_{22} = 9$ and $\\Theta_{12} = -3$. " +
      "Compute the partial correlation of $X_1$ and $X_2$ given all the other variables.",
    answerKey: 0.5,
    tolerance: 0.001,
    difficulty: 0.0,
    discrimination: 1.2,
    expectedSeconds: 70,
    prereqClosure: PRECISION,
    source: AUTHORED,
    status: "live",
  },
  {
    id: "precision-matrix--apply-read-sparsity-pattern",
    conceptId: "precision-matrix",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "$X \\sim \\mathcal{N}(0, \\Theta^{-1})$ with $\\Theta = \\begin{bmatrix} 3 & -1 & 0 \\\\ -1 & 3 & -1 \\\\ 0 & -1 & 3 \\end{bmatrix}$. " +
      "Which statement is correct?",
    choices: [
      { id: "a", text: "$X_1 \\perp X_3 \\mid X_2$, but $X_1$ and $X_3$ are marginally correlated", correct: true },
      {
        id: "b",
        text: "$X_1$ and $X_3$ are marginally independent, since $\\Theta_{13} = 0$",
        correct: false,
        misconception: {
          id: "precision-zero-read-as-marginal",
          description: "Reads a zero in $\\Theta$ as a zero in $\\Sigma$; the precision encodes conditional, not marginal, independence.",
          blameConceptId: "precision-matrix",
        },
      },
      {
        id: "c",
        text: "$X_1 \\perp X_2 \\mid X_3$, since $\\Theta_{12}$ is negative",
        correct: false,
        misconception: {
          id: "precision-negative-means-independent",
          description: "Treats a negative entry as absence of dependence; only an exact zero means conditional independence, and $\\Theta_{12} < 0$ is a positive partial correlation.",
          blameConceptId: "precision-matrix",
        },
      },
      {
        id: "d",
        text: "No pair is conditionally independent, because $\\Sigma = \\Theta^{-1}$ has no zeros",
        correct: false,
        misconception: {
          id: "precision-reads-covariance-for-structure",
          description: "Looks for structure in the covariance instead of the precision.",
          blameConceptId: "covariance-matrix",
        },
      },
    ],
    difficulty: 0.2,
    discrimination: 1.2,
    expectedSeconds: 75,
    prereqClosure: PRECISION,
    source: AUTHORED,
    status: "live",
  },
  {
    id: "precision-matrix--explain-why-zero-means-ci",
    conceptId: "precision-matrix",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain, using the form of the multivariate normal density, why $\\Theta_{ij} = 0$ makes $X_i$ and $X_j$ " +
      "conditionally independent given the remaining variables.",
    rubric: {
      elements: [
        { id: "density", description: "The density is proportional to $\\exp(-\\tfrac{1}{2}(x-\\mu)^\\top\\Theta(x-\\mu))$, and the only term coupling $x_i$ and $x_j$ is $-\\Theta_{ij}(x_i-\\mu_i)(x_j-\\mu_j)$.", weight: 4, required: true },
        { id: "factor", description: "With the other coordinates fixed and $\\Theta_{ij} = 0$, the conditional density of $(x_i, x_j)$ factors into a function of $x_i$ times a function of $x_j$ — which is conditional independence.", weight: 4, required: true },
      ],
    },
    difficulty: 0.5,
    discrimination: 1.2,
    expectedSeconds: 120,
    prereqClosure: PRECISION,
    source: AUTHORED,
    status: "live",
  },
  {
    id: "precision-matrix--explain-dense-covariance-sparse-precision",
    conceptId: "precision-matrix",
    format: "mcq",
    cognitive: "explain",
    channels: ["typed"],
    stem:
      "A stationary Gaussian AR($1$) series $X_1, \\ldots, X_n$ has a dense covariance matrix but a tridiagonal precision " +
      "matrix. What does the tridiagonal pattern tell you?",
    choices: [
      { id: "a", text: "Each $X_t$ is conditionally independent of all non-adjacent values given $X_{t-1}$ and $X_{t+1}$; distant values are correlated only through the chain between them", correct: true },
      {
        id: "b",
        text: "Values more than one step apart are uncorrelated",
        correct: false,
        misconception: {
          id: "precision-tridiagonal-read-as-uncorrelated",
          description: "Confuses zeros of $\\Theta$ with zeros of $\\Sigma$; AR($1$) correlations decay like $\\phi^{|s-t|}$ but never vanish.",
          blameConceptId: "precision-matrix",
        },
      },
      {
        id: "c",
        text: "The precision matrix must be mis-estimated, since it should be as dense as the covariance",
        correct: false,
        misconception: {
          id: "precision-inherits-density",
          description: "Assumes the inverse of a dense matrix is dense; inversion does not preserve the sparsity pattern in either direction.",
          blameConceptId: "covariance-matrix",
        },
      },
      {
        id: "d",
        text: "Only $X_1$ and $X_n$ depend on each other directly",
        correct: false,
        misconception: {
          id: "precision-pattern-misread",
          description: "Misreads which entries are non-zero; the non-zeros sit on the three central diagonals, linking each time point to its neighbours.",
          blameConceptId: "precision-matrix",
        },
      },
    ],
    difficulty: 0.6,
    discrimination: 1.2,
    expectedSeconds: 70,
    prereqClosure: PRECISION,
    source: AUTHORED,
    status: "live",
  },
  {
    id: "precision-matrix--transfer-regression-coefficient",
    conceptId: "precision-matrix",
    format: "mcq",
    cognitive: "transfer",
    channels: ["typed"],
    stem:
      "In a large Gaussian sample you regress $X_1$ on all of $X_2, \\ldots, X_p$ and the population coefficient on " +
      "$X_3$ is exactly $0$. What does this imply about the precision matrix?",
    choices: [
      { id: "a", text: "$\\Theta_{13} = 0$, because the coefficient equals $-\\Theta_{13}/\\Theta_{11}$", correct: true },
      {
        id: "b",
        text: "$\\Sigma_{13} = 0$, because a zero regression coefficient means zero correlation",
        correct: false,
        misconception: {
          id: "precision-coefficient-means-uncorrelated",
          description: "Confuses a multiple-regression coefficient (adjusted for all other predictors) with a marginal correlation.",
          blameConceptId: "conditional-multivariate-normal",
        },
      },
      {
        id: "c",
        text: "$\\Theta_{33} = 0$, because $X_3$ carries no information",
        correct: false,
        misconception: {
          id: "precision-diagonal-zero",
          description: "Diagonal precision entries are always positive for a positive-definite $\\Theta$; the relevant entry is the off-diagonal $\\Theta_{13}$.",
          blameConceptId: "precision-matrix",
        },
      },
      {
        id: "d",
        text: "Nothing — regression coefficients and the precision matrix are unrelated",
        correct: false,
        misconception: {
          id: "precision-regression-unrelated",
          description: "Misses that the conditional mean of $X_1$ given the rest is linear with coefficients $-\\Theta_{1j}/\\Theta_{11}$.",
          blameConceptId: "precision-matrix",
        },
      },
    ],
    difficulty: 0.8,
    discrimination: 1.2,
    expectedSeconds: 70,
    prereqClosure: PRECISION,
    source: AUTHORED,
    status: "live",
  },
  {
    id: "precision-matrix--transfer-portfolio-inverse",
    conceptId: "precision-matrix",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Minimum-variance portfolio weights are proportional to $\\Theta\\mathbf{1}$, where $\\Theta$ is the precision " +
      "matrix of asset returns. With $p = 400$ assets and $n = 500$ days of returns, explain why plugging in " +
      "$\\hat{\\Theta} = S^{-1}$ is dangerous, and suggest a better estimate.",
    rubric: {
      elements: [
        { id: "instability", description: "With $p$ close to $n$ the sample covariance $S$ is nearly singular: its smallest eigenvalues are badly underestimated, so $S^{-1}$ has hugely inflated entries and the weights become extreme and unstable (and $S^{-1}$ does not exist at all if $p > n$).", weight: 4, required: true },
        { id: "fix", description: "Proposes a regularised estimate — the graphical lasso (sparse $\\Theta$), shrinkage of $S$ toward a structured target (e.g. Ledoit–Wolf), or a factor model — before inverting.", weight: 3 },
      ],
    },
    difficulty: 0.9,
    discrimination: 1.2,
    expectedSeconds: 150,
    prereqClosure: PRECISION,
    source: AUTHORED,
    status: "live",
  },

  // --- gaussian-graphical-models ---------------------------------------------
  {
    id: "gaussian-graphical-models--recall-missing-edge",
    conceptId: "gaussian-graphical-models",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "In a Gaussian graphical model, there is no edge between nodes $i$ and $j$. What does that mean?",
    choices: [
      { id: "a", text: "$X_i \\perp X_j$ given all the other variables, i.e. $\\Theta_{ij} = 0$", correct: true },
      {
        id: "b",
        text: "$X_i$ and $X_j$ are marginally independent",
        correct: false,
        misconception: {
          id: "ggm-edge-marginal",
          description: "Reads the conditional-independence graph as a covariance graph; nodes linked by a path of other nodes are usually correlated.",
          blameConceptId: "gaussian-graphical-models",
        },
      },
      {
        id: "c",
        text: "$\\Sigma_{ij} = 0$",
        correct: false,
        misconception: {
          id: "ggm-edge-covariance",
          description: "Places the sparsity in the covariance rather than the precision matrix.",
          blameConceptId: "precision-matrix",
        },
      },
      {
        id: "d",
        text: "There is no path between $i$ and $j$ in the graph",
        correct: false,
        misconception: {
          id: "ggm-edge-path",
          description: "Confuses a missing edge with disconnection; nodes can be linked indirectly through other nodes.",
          blameConceptId: "markov-random-fields",
        },
      },
    ],
    difficulty: -0.8,
    discrimination: 1.2,
    expectedSeconds: 40,
    prereqClosure: GGM,
    source: AUTHORED,
    status: "live",
  },
  {
    id: "gaussian-graphical-models--recall-local-markov",
    conceptId: "gaussian-graphical-models",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "State the local Markov property of a Gaussian graphical model, and say what it implies about regressing $X_i$ on all the other variables.",
    rubric: {
      elements: [
        { id: "local", description: "$X_i$ is conditionally independent of all non-neighbours given its neighbours $X_{N(i)}$.", weight: 4, required: true },
        { id: "regression", description: "In the regression of $X_i$ on all other variables, only the neighbours have non-zero coefficients.", weight: 3 },
      ],
    },
    difficulty: -0.5,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: GGM,
    source: AUTHORED,
    status: "live",
  },
  {
    id: "gaussian-graphical-models--apply-count-zeros",
    conceptId: "gaussian-graphical-models",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A Gaussian graphical model on $X_1, \\ldots, X_5$ is the chain $1 - 2 - 3 - 4 - 5$. How many distinct " +
      "off-diagonal pairs $(i, j)$ with $i < j$ have $\\Theta_{ij} = 0$? Give a whole number.",
    answerKey: 6,
    tolerance: 0.001,
    difficulty: 0.0,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: GGM,
    source: AUTHORED,
    status: "live",
  },
  {
    id: "gaussian-graphical-models--apply-separation",
    conceptId: "gaussian-graphical-models",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "A Gaussian graphical model on $X_1, \\ldots, X_4$ has edges $1 - 2$, $2 - 3$, $3 - 4$ and $2 - 4$. Which " +
      "conditional independence does the graph imply?",
    choices: [
      { id: "a", text: "$X_1 \\perp X_4 \\mid X_2$", correct: true },
      {
        id: "b",
        text: "$X_1 \\perp X_4$ (marginally)",
        correct: false,
        misconception: {
          id: "ggm-separation-marginal",
          description: "Drops the conditioning set; $X_1$ and $X_4$ are connected through node $2$, so they are generally dependent marginally.",
          blameConceptId: "gaussian-graphical-models",
        },
      },
      {
        id: "c",
        text: "$X_3 \\perp X_4 \\mid X_2$",
        correct: false,
        misconception: {
          id: "ggm-separation-adjacent",
          description: "Nodes $3$ and $4$ share an edge, so no conditioning set separates them.",
          blameConceptId: "markov-random-fields",
        },
      },
      {
        id: "d",
        text: "$X_1 \\perp X_3 \\mid X_4$",
        correct: false,
        misconception: {
          id: "ggm-separation-wrong-set",
          description: "Uses a set that does not block the path $1 - 2 - 3$; separation requires every path to pass through the conditioning set.",
          blameConceptId: "markov-random-fields",
        },
      },
    ],
    difficulty: 0.2,
    discrimination: 1.2,
    expectedSeconds: 75,
    prereqClosure: GGM,
    source: AUTHORED,
    status: "live",
  },
  {
    id: "gaussian-graphical-models--explain-neighbourhood-selection",
    conceptId: "gaussian-graphical-models",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Neighbourhood selection learns a Gaussian graphical model by running a lasso regression of each $X_i$ on all " +
      "the other variables. Explain why the non-zero coefficients identify the edges, and name one weakness of the method.",
    rubric: {
      elements: [
        { id: "link", description: "The population coefficient of $X_j$ in the regression of $X_i$ on the rest is $-\\Theta_{ij}/\\Theta_{ii}$, which is zero exactly when there is no edge — so the lasso's support estimates node $i$'s neighbours.", weight: 4, required: true },
        { id: "weakness", description: "Names a weakness: the $p$ regressions can disagree about an edge (asymmetry needing an AND/OR rule), or the method returns a graph but not a valid positive-definite $\\hat{\\Theta}$.", weight: 3 },
      ],
    },
    difficulty: 0.5,
    discrimination: 1.2,
    expectedSeconds: 120,
    prereqClosure: GGM,
    source: AUTHORED,
    status: "live",
  },
  {
    id: "gaussian-graphical-models--explain-correlation-network-misleads",
    conceptId: "gaussian-graphical-models",
    format: "mcq",
    cognitive: "explain",
    channels: ["typed"],
    stem:
      "An analyst draws an edge between every pair of variables whose sample correlation exceeds $0.5$ and calls it the " +
      "dependency network. Why does this differ from a Gaussian graphical model?",
    choices: [
      { id: "a", text: "Correlations include indirect dependence through other variables, so it adds edges between variables that are only linked through a common neighbour", correct: true },
      {
        id: "b",
        text: "It doesn't — for Gaussian data large correlations and edges coincide",
        correct: false,
        misconception: {
          id: "ggm-correlation-equals-edge",
          description: "Equates marginal correlation with direct (conditional) dependence.",
          blameConceptId: "gaussian-graphical-models",
        },
      },
      {
        id: "c",
        text: "Correlations can only detect linear dependence, whereas a GGM detects non-linear dependence",
        correct: false,
        misconception: {
          id: "ggm-detects-nonlinear",
          description: "A GGM is also purely linear-Gaussian; the difference is conditional versus marginal, not linear versus non-linear.",
          blameConceptId: "precision-matrix",
        },
      },
      {
        id: "d",
        text: "The threshold $0.5$ is too low; with a higher threshold the two graphs agree",
        correct: false,
        misconception: {
          id: "ggm-threshold-fixes",
          description: "No threshold on marginal correlation removes indirect dependence; a strong chain produces strong correlation between its endpoints.",
          blameConceptId: "gaussian-graphical-models",
        },
      },
    ],
    difficulty: 0.6,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: GGM,
    source: AUTHORED,
    status: "live",
  },
  {
    id: "gaussian-graphical-models--transfer-gene-network",
    conceptId: "gaussian-graphical-models",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Genes A and C are strongly co-expressed across samples, but a Gaussian graphical model fitted to many genes " +
      "has no edge between them and edges A $-$ B and B $-$ C. What is the most plausible biological reading, and " +
      "what experiment would test it?",
    rubric: {
      elements: [
        { id: "reading", description: "A and C are correlated only through B — e.g. B regulates both, or A acts on C via B — so once B's expression is accounted for, A and C carry no further information about each other.", weight: 4, required: true },
        { id: "experiment", description: "An intervention that fixes or knocks down B (or perturbs A and measures C with B held fixed) should remove the A–C association if the reading is right.", weight: 3 },
      ],
    },
    difficulty: 0.9,
    discrimination: 1.2,
    expectedSeconds: 140,
    prereqClosure: GGM,
    source: AUTHORED,
    status: "live",
  },
  {
    id: "gaussian-graphical-models--transfer-fmri-singular",
    conceptId: "gaussian-graphical-models",
    format: "mcq",
    cognitive: "transfer",
    channels: ["typed"],
    stem:
      "An fMRI study has $100$ brain regions and $60$ time points. Why can't the analysts estimate the graph by " +
      "inverting the sample covariance matrix?",
    choices: [
      { id: "a", text: "The $100 \\times 100$ sample covariance has rank at most $59$, so it is singular and has no inverse", correct: true },
      {
        id: "b",
        text: "The sample covariance of brain signals is always negative definite",
        correct: false,
        misconception: {
          id: "ggm-negative-definite",
          description: "A sample covariance is always positive semi-definite; the problem is rank deficiency, not sign.",
          blameConceptId: "covariance-matrix",
        },
      },
      {
        id: "c",
        text: "Matrix inversion is too slow for $100$ variables",
        correct: false,
        misconception: {
          id: "ggm-inversion-cost",
          description: "Inverting a $100 \\times 100$ matrix is trivial computationally; the obstacle is statistical, not computational.",
          blameConceptId: "gaussian-graphical-models",
        },
      },
      {
        id: "d",
        text: "They can — the inverse exists but every entry will be non-zero",
        correct: false,
        misconception: {
          id: "ggm-inverse-exists",
          description: "Misses that $p > n$ makes the sample covariance singular.",
          blameConceptId: "precision-matrix",
        },
      },
    ],
    difficulty: 0.8,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: GGM,
    source: AUTHORED,
    status: "live",
  },

  // --- graphical-lasso ---------------------------------------------------------
  {
    id: "graphical-lasso--recall-objective",
    conceptId: "graphical-lasso",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "handwritten"],
    stem: "Write the graphical lasso objective for estimating a precision matrix $\\Theta$ from a sample covariance $S$, and say what each term does.",
    rubric: {
      elements: [
        { id: "objective", description: "Maximise $\\log\\det\\Theta - \\operatorname{tr}(S\\Theta) - \\lambda\\sum_{i \\ne j}|\\Theta_{ij}|$ over positive-definite $\\Theta$ (or the equivalent minimisation).", weight: 4, required: true },
        { id: "terms", description: "The first two terms are the Gaussian log-likelihood; the $\\ell_1$ penalty sets many off-diagonal entries exactly to zero, giving a sparse graph.", weight: 3, required: true },
      ],
    },
    difficulty: -0.7,
    discrimination: 1.2,
    expectedSeconds: 70,
    prereqClosure: GLASSO,
    source: AUTHORED,
    status: "live",
  },
  {
    id: "graphical-lasso--recall-lambda-effect",
    conceptId: "graphical-lasso",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What happens to the estimated graph as the graphical lasso penalty $\\lambda$ increases?",
    choices: [
      { id: "a", text: "More entries of $\\hat{\\Theta}$ become exactly zero, so the graph has fewer edges", correct: true },
      {
        id: "b",
        text: "More edges appear, because the penalty rewards dependence",
        correct: false,
        misconception: {
          id: "glasso-penalty-direction",
          description: "Reverses the direction of the penalty; a larger $\\ell_1$ penalty shrinks more entries to zero.",
          blameConceptId: "lasso",
        },
      },
      {
        id: "c",
        text: "Entries shrink toward zero but none reach it exactly, so the graph stays complete",
        correct: false,
        misconception: {
          id: "glasso-ridge-behaviour",
          description: "Describes an $\\ell_2$ (ridge) penalty; the $\\ell_1$ penalty produces exact zeros.",
          blameConceptId: "lasso",
        },
      },
      {
        id: "d",
        text: "Only the diagonal entries change; the edges are fixed by the data",
        correct: false,
        misconception: {
          id: "glasso-diagonal-only",
          description: "The penalty acts on the off-diagonal entries — the ones that define edges — and usually leaves the diagonal unpenalised.",
          blameConceptId: "graphical-lasso",
        },
      },
    ],
    difficulty: -0.6,
    discrimination: 1.2,
    expectedSeconds: 35,
    prereqClosure: GLASSO,
    source: AUTHORED,
    status: "live",
  },
  {
    id: "graphical-lasso--apply-empty-graph-threshold",
    conceptId: "graphical-lasso",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Four standardised variables have sample correlations $S_{12} = 0.42$, $S_{13} = -0.55$, $S_{14} = 0.30$, " +
      "$S_{23} = 0.18$, $S_{24} = -0.21$, $S_{34} = 0.47$. What is the smallest $\\lambda$ at which the graphical " +
      "lasso (off-diagonal penalty) returns a graph with no edges?",
    answerKey: 0.55,
    tolerance: 0.001,
    difficulty: 0.2,
    discrimination: 1.2,
    expectedSeconds: 70,
    prereqClosure: GLASSO,
    source: AUTHORED,
    status: "live",
  },
  {
    id: "graphical-lasso--apply-parameter-count",
    conceptId: "graphical-lasso",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A symmetric precision matrix for $p = 100$ variables is to be estimated from $n = 60$ observations. How many " +
      "distinct free parameters does $\\Theta$ have? Give a whole number.",
    answerKey: 5050,
    tolerance: 0.001,
    difficulty: 0.0,
    discrimination: 1.2,
    expectedSeconds: 50,
    prereqClosure: GLASSO,
    source: AUTHORED,
    status: "live",
  },
  {
    id: "graphical-lasso--explain-exists-when-p-exceeds-n",
    conceptId: "graphical-lasso",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "When $p > n$ the unpenalised Gaussian maximum likelihood estimate of $\\Theta$ does not exist, yet the graphical " +
      "lasso returns a unique positive-definite estimate for any $\\lambda > 0$. Explain both halves.",
    rubric: {
      elements: [
        { id: "mle-fails", description: "$S$ has rank at most $n - 1 < p$, so it is singular: $S^{-1}$ does not exist and the log-likelihood can be driven to $+\\infty$ along directions in the null space of $S$.", weight: 4, required: true },
        { id: "penalty-fixes", description: "The penalty makes the objective bounded and strictly concave (the problem stays convex), so there is a unique maximiser; it acts like a prior that most pairs are not directly connected.", weight: 3, required: true },
      ],
    },
    difficulty: 0.6,
    discrimination: 1.2,
    expectedSeconds: 130,
    prereqClosure: GLASSO,
    source: AUTHORED,
    status: "live",
  },
  {
    id: "graphical-lasso--explain-refit",
    conceptId: "graphical-lasso",
    format: "mcq",
    cognitive: "explain",
    channels: ["typed"],
    stem:
      "Practitioners often use the graphical lasso only to choose the edge set, then re-estimate $\\Theta$ by " +
      "unpenalised maximum likelihood restricted to those edges. Why?",
    choices: [
      { id: "a", text: "The $\\ell_1$ penalty shrinks the surviving non-zero entries toward zero, biasing the estimated partial correlations downward", correct: true },
      {
        id: "b",
        text: "The graphical lasso estimate is not positive definite, so it must be repaired",
        correct: false,
        misconception: {
          id: "glasso-not-pd",
          description: "The graphical lasso is solved over positive-definite matrices, so its estimate is always positive definite.",
          blameConceptId: "graphical-lasso",
        },
      },
      {
        id: "c",
        text: "The penalised estimate is not symmetric",
        correct: false,
        misconception: {
          id: "glasso-not-symmetric",
          description: "Symmetry is a property of the graphical lasso (unlike separate neighbourhood regressions).",
          blameConceptId: "gaussian-graphical-models",
        },
      },
      {
        id: "d",
        text: "Refitting adds back the edges the penalty removed by mistake",
        correct: false,
        misconception: {
          id: "glasso-refit-adds-edges",
          description: "The refit is constrained to the selected edge set; it fixes the size of the estimates, not the graph.",
          blameConceptId: "lasso",
        },
      },
    ],
    difficulty: 0.6,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: GLASSO,
    source: AUTHORED,
    status: "live",
  },
  {
    id: "graphical-lasso--transfer-choose-lambda",
    conceptId: "graphical-lasso",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A team fits the graphical lasso to $200$ gene-expression variables. Cross-validated likelihood picks a $\\lambda$ " +
      "giving $3{,}000$ edges, far more than biologists believe plausible. Explain why cross-validation behaves this " +
      "way, and propose a better way to choose $\\lambda$ when the goal is the graph itself.",
    rubric: {
      elements: [
        { id: "cv-bias", description: "Cross-validated likelihood rewards predictive fit of $\\Theta$; small spurious edges cost little and slightly help prediction, so CV tends to select too small a $\\lambda$ and too many edges.", weight: 4, required: true },
        { id: "alternative", description: "Uses a selection criterion aimed at structure: stability selection (keep edges appearing in most subsample fits), extended BIC, or controlling false edges directly.", weight: 3, required: true },
      ],
    },
    difficulty: 0.9,
    discrimination: 1.2,
    expectedSeconds: 140,
    prereqClosure: GLASSO,
    source: AUTHORED,
    status: "live",
  },
  {
    id: "graphical-lasso--transfer-heavy-tails",
    conceptId: "graphical-lasso",
    format: "mcq",
    cognitive: "transfer",
    channels: ["typed"],
    stem:
      "Daily stock returns have heavy tails and occasional extreme co-movements. A quant fits the graphical lasso to " +
      "the raw returns. What is the main risk, and a standard fix?",
    choices: [
      { id: "a", text: "Outliers distort the sample covariance and the Gaussian link between zeros and conditional independence no longer holds; use a rank-based (nonparanormal) correlation as $S$", correct: true },
      {
        id: "b",
        text: "Heavy tails make the objective non-convex; use a smaller $\\lambda$",
        correct: false,
        misconception: {
          id: "glasso-tails-nonconvex",
          description: "The objective is convex in $\\Theta$ for any $S$; the problem is what $S$ and the zeros mean, not the optimisation.",
          blameConceptId: "graphical-lasso",
        },
      },
      {
        id: "c",
        text: "There is no risk — the graphical lasso makes no distributional assumption",
        correct: false,
        misconception: {
          id: "glasso-distribution-free",
          description: "The likelihood term is Gaussian, and reading zeros as conditional independence relies on Gaussianity.",
          blameConceptId: "precision-matrix",
        },
      },
      {
        id: "d",
        text: "Heavy tails produce too few edges; set $\\lambda = 0$",
        correct: false,
        misconception: {
          id: "glasso-lambda-zero",
          description: "$\\lambda = 0$ removes the regularisation entirely and gives back the unstable $S^{-1}$.",
          blameConceptId: "lasso",
        },
      },
    ],
    difficulty: 0.9,
    discrimination: 1.2,
    expectedSeconds: 70,
    prereqClosure: GLASSO,
    source: AUTHORED,
    status: "live",
  },
];
