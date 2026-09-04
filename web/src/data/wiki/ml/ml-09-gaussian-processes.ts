import type { WikiArticle } from "../types";

/**
 * Machine Learning cluster 9 — the nonparametric Bayesian end of the domain,
 * where the multivariate normal and the kernel meet. Mirrors
 * `assessments/ml-09-gaussian-processes.md`.
 */

const gpRegression: WikiArticle = {
  conceptId: "gp-regression",
  summary:
    "A Gaussian process is a distribution over functions such that any finite set of function " +
    "values is jointly multivariate normal. Regression is then not fitting — it is conditioning " +
    "that joint Gaussian on the observed points, which returns a predictive mean and, for free, a " +
    "predictive variance.",

  sections: [
    {
      heading: "A prior over functions",
      blocks: [
        {
          kind: "formula",
          latex: "f ~ GP(m(x), k(x, x′)),   [f(x₁) … f(xₙ)]ᵀ ~ N(m, K) with Kᵢⱼ = k(xᵢ, xⱼ)",
          caption: "A mean function and a covariance function specify the whole process",
        },
        {
          kind: "prose",
          text:
            "The mean function is usually taken to be zero after centring, so the kernel carries all " +
            "the modelling assumptions. It says how correlated f(x) and f(x′) are as a function of " +
            "how far apart x and x′ are — and that correlation structure is what determines whether " +
            "the sampled functions are smooth, wiggly, periodic, or linear.",
        },
      ],
    },

    {
      heading: "Prediction is conditioning",
      blocks: [
        {
          kind: "formula",
          latex: "f* | y ~ N( K*ᵀ(K + σ²I)⁻¹y,  K** − K*ᵀ(K + σ²I)⁻¹K* )",
          caption: "The standard Gaussian conditioning formulas, applied to function values",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The uncertainty is not bolted on — it is the Schur complement",
          text:
            "Conditioning a joint Gaussian on part of itself yields another Gaussian whose " +
            "covariance is the Schur complement of the observed block. That is where the predictive " +
            "variance comes from: it is a property of the multivariate normal, not an extra " +
            "estimator. Every other model in this domain needs bootstrapping or a separate " +
            "quantile model to say the same thing.",
        },
        {
          kind: "prose",
          text:
            "Notice also that the predictive variance K** − K*ᵀ(K + σ²I)⁻¹K* does not involve y at " +
            "all. GP uncertainty depends on *where* you observed, not on what you saw there — a " +
            "consequence of the Gaussian assumption that is worth knowing before relying on it.",
        },
        {
          kind: "example",
          title: "Why error bars widen away from the data",
          problem: "With an RBF kernel, why is the predictive variance small near training points and large far from them?",
          steps: [
            "k(x, x′) = exp(−γ‖x − x′‖²) decays towards 0 as the points separate.",
            "Far from every training point, K* ≈ 0, so the subtracted term K*ᵀ(K + σ²I)⁻¹K* ≈ 0.",
            "The posterior variance therefore returns to the prior variance K**.",
            "Near a training point, K* is large, the subtraction is large, and the variance collapses towards σ².",
          ],
          answer:
            "The correlation structure of the kernel translates directly into the shape of the error bars. Extrapolation reverts to the prior — honest behaviour, and the opposite of what a fitted polynomial does.",
        },
      ],
    },

    {
      heading: "Cost, and where GPs earn their keep",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "O(n³) time and O(n²) memory",
          text:
            "Inverting (or Cholesky-factorising) the n × n matrix is cubic, which puts exact GPs out " +
            "of reach beyond roughly 10⁴ points. Sparse and inducing-point approximations (FITC, " +
            "SVGP) reduce this to O(nm²) with m ≪ n inducing points, at some cost in fidelity.",
        },
        {
          kind: "prose",
          text:
            "The natural home for GPs is therefore the small-n, expensive-observation regime — which " +
            "is exactly Bayesian optimisation. Tuning hyperparameters where each evaluation is a " +
            "multi-hour training run means you have a handful of observations and desperately need " +
            "calibrated uncertainty to decide where to spend the next one: exploit near the " +
            "predicted optimum, or explore where the model admits it does not know. The acquisition " +
            "function that balances those two consumes precisely the mean and variance a GP returns.",
        },
        {
          kind: "list",
          items: [
            "Kernel hyperparameters (length scale, signal variance, noise σ²) are typically chosen by maximising the marginal likelihood, which has a built-in Occam penalty.",
            "Kernels compose: adding a periodic kernel to an RBF gives periodic behaviour with a slowly varying trend.",
            "A GP with a suitable kernel is the infinite-width limit of a single-layer neural network with random weights (Neal, 1996).",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Rasmussen & Williams, Gaussian Processes for Machine Learning", locator: "Ch. 2, Regression" },
    { source: "Bishop, Pattern Recognition and Machine Learning", locator: "§6.4, Gaussian Processes" },
    { source: "Shi & Choi, Gaussian Process Regression Analysis for Functional Data", locator: "Ch. 2" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-09-gaussian-processes.md" },
  ],
};

const gpClassification: WikiArticle = {
  conceptId: "gp-classification",
  summary:
    "GP classification puts a Gaussian process prior on a latent function and squashes it through a " +
    "sigmoid to get a class probability. That one nonlinearity destroys the conjugacy that made GP " +
    "regression closed-form, so inference becomes approximate — and the model becomes a " +
    "nonparametric generalisation of logistic regression.",

  sections: [
    {
      heading: "The construction",
      blocks: [
        {
          kind: "formula",
          latex: "f ~ GP(0, k),   P(y = 1 | x) = σ(f(x))",
          caption: "A latent GP passed through a sigmoid link",
        },
        {
          kind: "prose",
          text:
            "A GP's outputs are unbounded real numbers, and a probability must lie in [0, 1]. The " +
            "sigmoid is the same link logistic regression uses for the same reason. The difference " +
            "is what sits underneath it: logistic regression assumes the latent score is a linear " +
            "function wᵀx, while GP classification lets it be any function drawn from the GP prior.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "It is logistic regression with the linearity assumption removed",
          text:
            "Same link, same likelihood, an infinitely more flexible latent score. That is the " +
            "generalisation — and the price is that the posterior is no longer available in closed " +
            "form, which is the recurring trade in Bayesian modelling: flexibility bought with " +
            "approximate inference.",
        },
      ],
    },

    {
      heading: "Why the closed form is lost",
      blocks: [
        {
          kind: "prose",
          text:
            "GP regression is exact because a Gaussian prior with a Gaussian likelihood gives a " +
            "Gaussian posterior — conjugacy. The Bernoulli likelihood σ(f)^y (1 − σ(f))^{1−y} is not " +
            "Gaussian in f, so the product of prior and likelihood is not Gaussian and the " +
            "normalising integral has no analytic solution. Nothing about the prior changed; the " +
            "likelihood did.",
        },
        {
          kind: "table",
          headers: ["Method", "Idea", "Trade-off"],
          rows: [
            ["Laplace approximation", "Fit a Gaussian at the posterior mode using its curvature", "Cheapest; underestimates variance when the posterior is skewed"],
            ["Expectation propagation", "Iteratively match moments site by site", "More accurate in practice; no convergence guarantee"],
            ["Variational inference", "Maximise an ELBO over a Gaussian family", "Scales well, integrates with inducing points"],
            ["MCMC", "Sample the posterior directly", "Asymptotically exact, far too slow for routine use"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Approximate uncertainty is still approximate",
          text:
            "GP classification is often chosen precisely for its calibrated probabilities, and the " +
            "Laplace approximation is known to be over-confident because it fits a Gaussian to a " +
            "mode without seeing the tails. If calibration is the reason you reached for a GP, the " +
            "choice of approximation is not an implementation detail — check the calibration you " +
            "actually got.",
        },
        {
          kind: "prose",
          text:
            "Multiclass extensions replace the sigmoid with a softmax over K latent GPs, which " +
            "multiplies the cost by K and leaves the intractability unchanged in kind.",
        },
      ],
    },
  ],

  references: [
    { source: "Rasmussen & Williams, Gaussian Processes for Machine Learning", locator: "Ch. 3, Classification" },
    { source: "Bishop, Pattern Recognition and Machine Learning", locator: "§6.4.5–6.4.6, Gaussian Processes for Classification and the Laplace Approximation" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-09-gaussian-processes.md" },
  ],
};

export const ml09GaussianProcesses: WikiArticle[] = [gpRegression, gpClassification];
