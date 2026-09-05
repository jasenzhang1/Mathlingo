import type { WikiArticle } from "./types";

export const variationalInferenceElboWiki: WikiArticle = {
  conceptId: "variational-inference-elbo",
  summary:
    "Variational inference turns Bayesian inference into optimisation. Rather than sampling from an " +
    "intractable posterior p(Z | X), you pick a family of tractable distributions and search it for " +
    "the member closest to the posterior in KL divergence. The obstacle is that the objective " +
    "contains the evidence p(X), which is the very thing you cannot compute — and the ELBO is the " +
    "rearrangement that removes it, leaving a bound you can maximise instead.",

  sections: [
    {
      heading: "The goal, and the obstacle",
      blocks: [
        {
          kind: "prose",
          text:
            "Bayes' rule gives p(Z | X) = p(X, Z)/p(X). The numerator is usually easy — it is the model " +
            "you wrote down. The denominator p(X) = ∫p(X, Z)dZ is an integral over the whole latent " +
            "space, and for anything beyond a conjugate toy model it has no closed form and no feasible " +
            "quadrature.",
        },
        {
          kind: "prose",
          text:
            "Variational inference proposes an approximation q(Z) from a family Q chosen for " +
            "tractability, and picks the best member by minimising KL divergence to the true posterior.",
        },
        {
          kind: "formula",
          latex: "q* = argmin_{q ∈ Q}  D_KL(q(Z) ‖ p(Z | X))",
          caption: "The variational problem — but the objective still mentions the intractable posterior",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The objective is not directly computable",
          text:
            "Expanding, D_KL(q ‖ p(Z|X)) = E_q[log q(Z)] − E_q[log p(Z | X)], and the second term needs " +
            "p(Z | X), which needs p(X). So the goal cannot be pursued as stated. The claim that “KL is " +
            "easier to compute directly” has it exactly backwards — the intractability of p(X) is " +
            "precisely what forces the ELBO detour.",
        },
      ],
    },

    {
      heading: "The decomposition",
      blocks: [
        {
          kind: "prose",
          text:
            "Substituting p(Z | X) = p(X, Z)/p(X) into the KL and separating out the log p(X) term — " +
            "which does not depend on Z and so comes out of the expectation as a constant — gives an " +
            "exact identity:",
        },
        {
          kind: "formula",
          latex: "log p(X) = L(q) + D_KL(q(Z) ‖ p(Z | X)),   L(q) = E_q[log p(X, Z)] − E_q[log q(Z)]",
          caption: "The evidence splits exactly into the ELBO plus the approximation's KL gap",
        },
        {
          kind: "prose",
          text:
            "L(q) is the evidence lower bound. Every term in it is computable: p(X, Z) is the model, and " +
            "q is a distribution you chose and can evaluate and sample from. The intractable p(X) has " +
            "been isolated into a single constant on the left.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why “lower bound”: it is Gibbs' inequality, reused",
          text:
            "KL divergence is non-negative — Gibbs' inequality, proved via Jensen's inequality when KL " +
            "divergence was introduced. Applying that same result here, L(q) = log p(X) − D_KL(·) ≤ " +
            "log p(X) for every q. The name is a direct consequence of a fact already proved, not a new " +
            "argument. Equality holds exactly when q is the true posterior, which is when the KL term " +
            "vanishes.",
        },
      ],
    },

    {
      heading: "Why maximising the ELBO is the right move",
      blocks: [
        {
          kind: "prose",
          text:
            "log p(X) is a property of the model and the data. It contains no q. So in the identity " +
            "log p(X) = L(q) + D_KL(q ‖ p(Z | X)), the left side is a constant as q varies, and the two " +
            "terms on the right must trade off exactly. Pushing L(q) up pushes the KL gap down by the " +
            "same amount.",
        },
        {
          kind: "formula",
          latex: "argmax_q L(q) = argmin_q D_KL(q(Z) ‖ p(Z | X))",
          caption: "Same optimiser, because they differ by a constant in q",
        },
        {
          kind: "prose",
          text:
            "That is the whole trick: an objective you cannot evaluate has been replaced by one you can, " +
            "with the same argmax. As a bonus, the value of L(q) at the optimum is a lower bound on the " +
            "log evidence, which is useful for model comparison — though a loose one, since the bound is " +
            "only as tight as the family Q allows.",
        },
        {
          kind: "prose",
          text:
            "The ELBO also has a second, more interpretable grouping: L(q) = E_q[log p(X | Z)] − " +
            "D_KL(q(Z) ‖ p(Z)). Read this way it is a reconstruction term (does a sample from q explain " +
            "the data?) minus a regularisation term (does q stay near the prior?). This is the form the " +
            "VAE objective is written in.",
        },
      ],
    },

    {
      heading: "Choosing the family Q",
      blocks: [
        {
          kind: "prose",
          text:
            "Everything above works for any Q. The art is choosing one that is rich enough to be a " +
            "decent approximation and simple enough to optimise over.",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "Mean-field",
              description:
                "q(Z) = ∏ᵢ qᵢ(Zᵢ) — the latent variables are treated as independent. The workhorse choice, and the source of the classic coordinate-ascent updates.",
            },
            {
              term: "Structured",
              description:
                "Keeps some dependence, e.g. a chain over time steps, giving a better fit at higher cost.",
            },
            {
              term: "Amortised",
              description:
                "q(Z | X) is output by a neural network shared across all data points, instead of fitting a separate q per point. This is what makes VAEs scale.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Mean-field VI underestimates variance",
          text:
            "The direction of the KL matters. D_KL(q ‖ p) is large wherever q has mass and p does not, " +
            "so the optimiser keeps q inside the posterior's high-density region — mode-seeking " +
            "behaviour. The consequence is systematic: on a correlated posterior, a factorised q fits " +
            "inside the correlation ellipse and reports credible intervals that are too narrow. " +
            "Point estimates from VI are usually decent; its uncertainty estimates should be treated " +
            "with suspicion. Reversing the KL to D_KL(p ‖ q) would give mass-covering behaviour instead, " +
            "but that direction requires expectations under p, which is what you could not do.",
        },
      ],
    },

    {
      heading: "EM is variational inference",
      blocks: [
        {
          kind: "prose",
          text:
            "The EM algorithm's monotonicity proof relied on a lower bound that was left partly " +
            "unexplained at the time. That bound is the ELBO, and EM is coordinate ascent on it.",
        },
        {
          kind: "table",
          headers: ["Step", "What it optimises", "Over what"],
          rows: [
            ["E-step", "L(q, θ)", "q — set exactly to p(Z | X, θ), driving the KL gap to zero"],
            ["M-step", "L(q, θ)", "θ — with q held fixed"],
          ],
          caption: "Two coordinate ascent steps on one objective, not two unrelated procedures",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The distinction that remains",
          text:
            "EM's E-step is exact: it sets q to the true posterior, so the bound becomes tight at the " +
            "current θ. Variational inference is what you do when that is impossible — you restrict q " +
            "to a tractable family, and the bound stays loose by however much the family misses. EM is " +
            "the special case where Q is unrestricted and the argmin is available in closed form. This " +
            "unification is the payoff for having introduced both, and it means improvements to " +
            "variational machinery apply to EM-style models automatically.",
        },
      ],
    },
  ],

  references: [
    { source: "Bishop, Pattern Recognition and Machine Learning", locator: "Ch. 10, Approximate Inference — §10.1 variational inference and the ELBO" },
    { source: "Murphy, Probabilistic Machine Learning: An Introduction", locator: "Ch. 10, Variational inference" },
    { source: "Gelman et al., Bayesian Data Analysis (3rd ed.)", locator: "Ch. 13, Modal and distributional approximations" },
    { source: "Mathlingo assessment bank", locator: "assessments/gm-03-variational-inference-and-kernels.md" },
  ],
};
