import type { WikiArticle } from "./types";

export const gaussianProcessWiki: WikiArticle = {
  conceptId: "gaussian-process",
  summary:
    "A Gaussian process is a probability distribution over functions. It is specified by a mean " +
    "function and a kernel, and its defining property is that any finite collection of function " +
    "values has a joint multivariate Normal distribution. That single property is enough: because " +
    "conditioning a multivariate Normal on some of its coordinates yields another Normal, observing " +
    "data updates the prior over functions into a posterior over functions in closed form, with " +
    "calibrated uncertainty attached.",

  sections: [
    {
      heading: "The definition",
      blocks: [
        {
          kind: "formula",
          latex: "f ~ GP(m(x), k(x, x′))   ⟺   [f(x₁), …, f(x_n)]ᵀ ~ N(m, K) for every finite set {x₁,…,x_n}",
          caption: "K_{ij} = k(xᵢ, xⱼ); the kernel must be a valid positive semi-definite covariance function",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "Mean function m(x)",
              description:
                "E[f(x)], the prior expectation of the function at x. Usually taken to be zero after centring the data — the kernel carries the interesting structure.",
            },
            {
              term: "Kernel k(x, x′)",
              description:
                "Cov(f(x), f(x′)) — how strongly the function's values at two inputs covary. This encodes every assumption you are making about smoothness, periodicity, and scale.",
            },
            {
              term: "Marginalisation consistency",
              description:
                "Any subset of a GP's coordinates is itself Gaussian with the corresponding submatrix. This is what makes an infinite-dimensional object usable — you never handle more than the finitely many points you care about.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The kernel is the model",
          text:
            "Nothing else in a GP carries assumptions. Choose an RBF kernel and you have assumed the " +
            "function is infinitely differentiable; a Matérn 3/2 and you have assumed it is once " +
            "differentiable and rougher; a periodic kernel and you have assumed it repeats. Whether the " +
            "GP works on your problem is almost entirely the question of whether the kernel matches the " +
            "function's actual behaviour.",
        },
      ],
    },

    {
      heading: "An infinite-dimensional graphical model",
      blocks: [
        {
          kind: "prose",
          text:
            "A GP does not look like a graph, which raises a fair question about why it sits in this " +
            "domain. The answer is that it is the limit of one. A multivariate Normal over n variables " +
            "is a graphical model — a Gaussian MRF — whose edges are given by the zeros of the " +
            "precision matrix. A GP is what you get when the index set becomes a continuum: every " +
            "possible input point x is implicitly a node, and the kernel function specifies the " +
            "dependence between every pair of them.",
        },
        {
          kind: "table",
          headers: ["Finite Gaussian graphical model", "Gaussian process"],
          rows: [
            ["n variables", "A node for every point in the input space"],
            ["Covariance matrix Σ", "Covariance function k(x, x′)"],
            ["Mean vector μ", "Mean function m(x)"],
            ["Conditioning gives a Normal", "Conditioning gives a GP"],
            ["Σ must be PSD", "k must be a PSD kernel (Mercer)"],
          ],
        },
        {
          kind: "prose",
          text:
            "The dictionary transfers exactly, which is why every GP computation reduces to standard " +
            "multivariate Normal manipulation on the finitely many inputs you have actually evaluated.",
        },
      ],
    },

    {
      heading: "Regression: conditioning the prior",
      blocks: [
        {
          kind: "prose",
          text:
            "Observe y = f(X) + ε with ε ~ N(0, σ²I) at training inputs X, and ask about f at test " +
            "inputs X*. Write down the joint over training and test values — it is Normal by " +
            "definition — and apply the Gaussian conditioning formula.",
        },
        {
          kind: "formula",
          latex: "μ* = K(X*, X)[K(X, X) + σ²I]⁻¹y",
          caption: "Posterior mean at the test points",
        },
        {
          kind: "formula",
          latex: "Σ* = K(X*, X*) − K(X*, X)[K(X, X) + σ²I]⁻¹K(X, X*)",
          caption: "Posterior covariance — note it never depends on the observed y values",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Two things worth noticing in those formulas",
          text:
            "First, the posterior mean is a linear combination of the observed y's, with weights given " +
            "by kernel similarity — a GP is a weighted-nearest-neighbour predictor where the kernel " +
            "defines “near”. Second, the posterior variance depends only on where you looked, not on " +
            "what you found. Uncertainty shrinks near training inputs and reverts to the prior far from " +
            "them, which is exactly the behaviour that makes GPs the standard tool in Bayesian " +
            "optimisation, where the whole point is knowing where you are ignorant.",
        },
        {
          kind: "example",
          title: "One observation, one query",
          problem:
            "Zero-mean GP with k(x, x′) = exp(−(x − x′)²/2) and noise σ² = 0. Observe f(0) = 2. What " +
            "are the posterior mean and variance at x* = 1?",
          steps: [
            "K(X, X) = k(0,0) = 1. K(x*, X) = k(1, 0) = e^{−0.5} ≈ 0.6065. K(x*, x*) = 1.",
            "μ* = 0.6065 × 1⁻¹ × 2 = 1.2131.",
            "Σ* = 1 − 0.6065 × 1⁻¹ × 0.6065 = 1 − 0.3679.",
            "= 0.6321.",
          ],
          answer:
            "μ* ≈ 1.213, variance ≈ 0.632. The single observation pulled the prediction 61% of the way " +
            "from the prior mean of 0 toward the observed 2, and cut the variance from 1 to 0.632. At " +
            "x* = 5 the kernel value would be e^{−12.5} ≈ 4×10⁻⁶ and both effects would vanish.",
        },
      ],
    },

    {
      heading: "What “nonparametric” means here",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "It does not mean “no parameters”",
          text:
            "GPs have hyperparameters and they matter enormously — the kernel's length-scale, its " +
            "output variance, the noise level — and they are typically fitted by maximising the marginal " +
            "likelihood. “Nonparametric” means the model's effective complexity is not capped by a fixed " +
            "parameter count; it does not mean the model has nothing to tune.",
        },
        {
          kind: "prose",
          text:
            "Contrast with a linear regression. Fit it to 100 points or 100,000 and you still have the " +
            "same handful of β coefficients, so the model's expressiveness is capped in advance by a " +
            "choice made before seeing the data. A GP's posterior mean is a sum of n kernel functions, " +
            "one per training point, so the representation grows with the data and the function can " +
            "become as intricate as the data warrants. You are placing a prior over an entire function " +
            "space rather than over a finite parameter vector.",
        },
      ],
    },

    {
      heading: "Why it is Bayesian, and what it costs",
      blocks: [
        {
          kind: "prose",
          text:
            "A GP is Bayesian in the strict sense: the process itself is a prior, the data enter " +
            "through a likelihood, and the conditioning formulas above are Bayes' rule. The output is a " +
            "full posterior distribution over functions, not a point estimate — which is why a GP " +
            "returns error bars as a matter of course rather than as an add-on. The only unusual feature " +
            "is that the object being updated is infinite-dimensional.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "O(n³) is the binding constraint",
          text:
            "That matrix inverse is over an n × n matrix, costing O(n³) time and O(n²) memory. Exact " +
            "GP regression is comfortable to a few thousand points and painful beyond that. Sparse " +
            "approximations based on m inducing points bring it to O(nm²), and structured kernels " +
            "exploit grid structure where it exists — but the naive method does not scale, and this is " +
            "the single largest practical reason GPs are less common than their statistical properties " +
            "would suggest.",
        },
        {
          kind: "list",
          items: [
            "Classification loses the closed form — a Bernoulli likelihood is not conjugate to a Gaussian prior, so Laplace approximation, expectation propagation, or variational inference is needed.",
            "Marginal-likelihood optimisation over hyperparameters is non-convex and can find poor local optima; multiple restarts are routine.",
            "In high input dimensions ordinary kernels suffer from the curse of dimensionality — every point becomes roughly equidistant and the kernel stops discriminating.",
            "Model misspecification shows up as overconfident error bars: the posterior variance is correct given the kernel, and says nothing about whether the kernel was right.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Rasmussen & Williams, Gaussian Processes for Machine Learning", locator: "Ch. 2, Regression; Ch. 4, Covariance Functions" },
    { source: "Bishop, Pattern Recognition and Machine Learning", locator: "§6.4, Gaussian Processes" },
    { source: "Murphy, Probabilistic Machine Learning: An Introduction", locator: "Ch. 17, Gaussian processes" },
    { source: "Mathlingo assessment bank", locator: "assessments/gm-03-variational-inference-and-kernels.md" },
  ],
};
