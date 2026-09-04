import type { WikiArticle } from "./types";

export const laplaceApproximationWiki: WikiArticle = {
  conceptId: "laplace-approximation",
  summary:
    "The Laplace approximation replaces an awkward distribution with a Gaussian centred at its mode. " +
    "The construction is a second-order Taylor expansion of the log-density: the first-order term " +
    "vanishes because you expanded at a mode, and what remains is a quadratic — which is exactly what " +
    "the log of a Gaussian looks like. The covariance turns out to be the inverse negative Hessian, " +
    "which at the MLE is the observed Fisher information, so the sharpness of the peak sets the width " +
    "of the approximation.",

  sections: [
    {
      heading: "The construction",
      blocks: [
        {
          kind: "prose",
          text:
            "Let p(θ) be a distribution you can evaluate up to a constant — a Bayesian posterior, " +
            "typically, where the normaliser is the intractable part. Two steps: find the mode, then " +
            "Taylor-expand the log-density there.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Find θ̂ = argmax log p(θ). This is an optimisation, not an integration — usually much easier.",
            "Expand: log p(θ) ≈ log p(θ̂) + ∇log p(θ̂)ᵀ(θ − θ̂) + ½(θ − θ̂)ᵀH(θ − θ̂), where H is the Hessian of log p at θ̂.",
            "The gradient is zero at a mode, so the linear term disappears entirely.",
            "What is left is log p(θ̂) − ½(θ − θ̂)ᵀ(−H)(θ − θ̂): a constant minus a quadratic form.",
            "Exponentiate. A constant times exp(−½ quadratic) is an unnormalised Gaussian, and matching terms gives the covariance.",
          ],
        },
        {
          kind: "formula",
          latex: "p(θ) ≈ N(θ ; θ̂, (−H)⁻¹),   H = ∇²log p(θ)|_{θ=θ̂}",
          caption: "Mode as the mean, inverse negative Hessian as the covariance",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why the answer is a Gaussian and could not have been anything else",
          text:
            "The Gaussian is not chosen for convenience — it is forced. A second-order expansion of any " +
            "log-density gives a quadratic, and the only distribution whose log is exactly quadratic is " +
            "the Gaussian. Deciding to stop at second order is the same act as deciding the answer will " +
            "be Normal. Going to third order would not give you a nicer distribution, just a " +
            "non-integrable mess.",
        },
      ],
    },

    {
      heading: "The covariance is Fisher information",
      blocks: [
        {
          kind: "prose",
          text:
            "The Hessian of the log-likelihood at the MLE, negated, is the observed Fisher information " +
            "J(θ̂). So the Laplace covariance is J(θ̂)⁻¹ — the same expression that gives the asymptotic " +
            "variance of the MLE. This is not a resemblance; it is the same quantity arrived at from two " +
            "directions.",
        },
        {
          kind: "formula",
          latex: "J(θ̂) = −∇²log L(θ)|_{θ=θ̂},   Cov ≈ J(θ̂)⁻¹",
          caption: "Observed Fisher information, and the Cramér–Rao-style inverse relationship",
        },
        {
          kind: "prose",
          text:
            "Fisher information's standard intuition — a sharper peak means more information means " +
            "lower variance — is therefore an exact statement about this approximation rather than a " +
            "loose analogy. A large second derivative in magnitude means strong curvature, means large " +
            "information, means a small inverse, means a narrow Gaussian. A flat log-density means the " +
            "data barely distinguishes nearby parameter values, and the approximation is correspondingly " +
            "wide.",
        },
        {
          kind: "example",
          title: "Laplace on a Beta posterior",
          problem:
            "Beta(3, 2) posterior for p, i.e. log density ∝ 2 log p + 1 log(1 − p). Find the Laplace " +
            "approximation and compare its variance to the exact one.",
          steps: [
            "d/dp: 2/p − 1/(1 − p) = 0 gives 2(1 − p) = p, so p̂ = 2/3.",
            "d²/dp²: −2/p² − 1/(1 − p)². At p̂ = 2/3: −2/(4/9) − 1/(1/9) = −4.5 − 9 = −13.5.",
            "Variance ≈ 1/13.5 ≈ 0.0741, so sd ≈ 0.272.",
            "Exact Beta(3,2) variance: αβ/[(α+β)²(α+β+1)] = 6/(25 × 6) = 0.04, sd = 0.2.",
          ],
          answer:
            "Laplace gives N(0.667, 0.0741) against an exact variance of 0.04 — the approximation is " +
            "about 36% too wide in standard deviation. Beta(3,2) is noticeably skewed, and a symmetric " +
            "Gaussian cannot match a skewed shape; the approximation improves as α and β grow and the " +
            "Beta becomes more symmetric.",
        },
      ],
    },

    {
      heading: "Approximating the evidence",
      blocks: [
        {
          kind: "prose",
          text:
            "The same expansion also estimates the normalising constant, which is often the quantity " +
            "you actually wanted. Integrating the Gaussian approximation to the unnormalised posterior " +
            "gives a closed form for the marginal likelihood.",
        },
        {
          kind: "formula",
          latex: "∫ p(x | θ)p(θ) dθ  ≈  p(x | θ̂)p(θ̂) · (2π)^{d/2} |−H|^{−1/2}",
          caption: "The Laplace approximation to the model evidence, for a d-dimensional θ",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "This is where BIC comes from",
          text:
            "Take the log of that expression, keep only the terms that grow with n, and the result is " +
            "log p(x) ≈ log L̂ − (d/2)log n. Multiply by −2 and you have BIC exactly. The Bayesian " +
            "information criterion is a Laplace approximation to the log evidence with the O(1) terms " +
            "discarded — which is why it carries a log n penalty rather than the 2 that AIC uses.",
        },
      ],
    },

    {
      heading: "When it fails",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "One mode is all it can see",
          text:
            "A multimodal posterior — the norm for mixture models, neural networks, and anything with " +
            "label-switching symmetry — is fitted by a single Gaussian around whichever mode the " +
            "optimiser found. The other modes are not merely underweighted; they are invisible. All the " +
            "mass the approximation reports sits in one basin.",
        },
        {
          kind: "list",
          items: [
            "Skewness cannot be represented: the approximation is symmetric by construction, so a skewed posterior gets a symmetric fit, as in the Beta example above.",
            "Heavy tails are lost — a Gaussian's tails decay faster than almost anything else, so tail probabilities and extreme quantiles are underestimated.",
            "Bounded parameters are a problem: a variance must be positive, a probability must lie in [0,1], and a Gaussian puts mass outside. Reparameterising to an unbounded scale (log σ, logit p) before expanding usually helps a great deal.",
            "It is asymptotic in n. With little data the posterior is not yet approximately Gaussian and the approximation can be badly off.",
            "The Hessian must be computed and inverted, which is O(d³) and infeasible for large models without further approximation — diagonal, block-diagonal, or Kronecker-factored.",
          ],
        },
        {
          kind: "prose",
          text:
            "These limitations are what motivate variational inference, covered next. Rather than " +
            "accepting whatever Gaussian a local expansion produces, VI chooses the member of a family " +
            "of distributions that is closest to the posterior under a global divergence criterion — so " +
            "the fit accounts for the whole posterior rather than the curvature at one point. Laplace " +
            "remains valuable for being enormously cheaper: one optimisation and one Hessian, with no " +
            "iterative fitting of an approximate distribution at all.",
        },
      ],
    },
  ],

  references: [
    { source: "Bishop, Pattern Recognition and Machine Learning", locator: "§4.4, The Laplace Approximation; §4.4.1 model comparison and BIC" },
    { source: "Gelman et al., Bayesian Data Analysis (3rd ed.)", locator: "Ch. 4, Asymptotics and normal approximations" },
    { source: "Murphy, Probabilistic Machine Learning: An Introduction", locator: "§4.6.8, The Laplace approximation" },
    { source: "Mathlingo assessment bank", locator: "assessments/gm-02-latent-variables-and-em.md" },
  ],
};
