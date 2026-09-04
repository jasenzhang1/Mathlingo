import type { WikiArticle } from "./types";

export const klDivergenceWiki: WikiArticle = {
  conceptId: "kl-divergence",
  summary:
    "The Kullback–Leibler divergence measures how far a distribution Q is from a reference " +
    "distribution P, in units of information: it is the expected number of extra nats you pay to " +
    "encode data drawn from P using a code designed for Q. It is always non-negative and zero only " +
    "when the two agree, which is what makes “minimise the KL” a well-posed objective — but it is " +
    "not symmetric and does not satisfy the triangle inequality, so it is not a distance.",

  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "D_KL(P ‖ Q) = E_P[ log( P(X)/Q(X) ) ] = Σₓ P(x) log(P(x)/Q(x))",
          caption: "Discrete form; replace the sum by an integral over p(x) log(p(x)/q(x)) dx for densities",
        },
        {
          kind: "prose",
          text:
            "Read the expectation carefully: the log-ratio is averaged under P, the first argument. " +
            "That asymmetry in the definition is the source of every asymmetry downstream. The " +
            "quantity log(P(x)/Q(x)) is the log-likelihood ratio at x — how much more probable that " +
            "observation is under P than under Q — so the divergence is the average log-likelihood " +
            "ratio in favour of P, when P is the truth.",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "Units",
              description:
                "Nats with a natural log, bits with log₂. Only the constant factor changes; the " +
                "sign and the zero point do not.",
            },
            {
              term: "Absolute continuity",
              description:
                "D_KL(P‖Q) = ∞ unless Q(x) > 0 wherever P(x) > 0. If P puts mass where Q assigns " +
                "none, the log ratio blows up — a real and consequential property, not an edge case.",
            },
            {
              term: "0 log 0",
              description:
                "Taken as 0 by convention, justified by the limit t log t → 0 as t → 0⁺. So P " +
                "putting no mass somewhere costs nothing, whatever Q does there.",
            },
          ],
        },
        {
          kind: "example",
          title: "A Bernoulli calculation, both ways round",
          problem:
            "P = Bernoulli(0.5), Q = Bernoulli(0.9). Compute D_KL(P‖Q) and D_KL(Q‖P) in nats.",
          steps: [
            "D_KL(P‖Q) = 0.5·ln(0.5/0.9) + 0.5·ln(0.5/0.1).",
            "= 0.5(−0.5878) + 0.5(1.6094) = −0.2939 + 0.8047.",
            "D_KL(Q‖P) = 0.9·ln(0.9/0.5) + 0.1·ln(0.1/0.5).",
            "= 0.9(0.5878) + 0.1(−1.6094) = 0.5290 − 0.1609.",
          ],
          answer:
            "D_KL(P‖Q) ≈ 0.511 and D_KL(Q‖P) ≈ 0.368. Both are positive, and they differ by nearly " +
            "40% — the asymmetry is not a rounding artefact but a substantive feature.",
        },
      ],
    },

    {
      heading: "Non-negativity: Gibbs' inequality",
      blocks: [
        {
          kind: "prose",
          text:
            "The single most-used property is D_KL(P‖Q) ≥ 0, with equality if and only if P = Q " +
            "almost everywhere. The proof is one application of Jensen's inequality.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Rewrite the divergence as D_KL(P‖Q) = E_P[ −log( Q(X)/P(X) ) ].",
            "The function −log is convex, so Jensen's inequality gives " +
              "E_P[−log(Q/P)] ≥ −log( E_P[Q(X)/P(X)] ).",
            "Compute the inner expectation over P's support: " +
              "E_P[Q(X)/P(X)] = Σₓ P(x)·Q(x)/P(x) = Σₓ Q(x) ≤ 1.",
            "So the bound is at least −log(1) = 0, giving D_KL(P‖Q) ≥ 0.",
            "Equality in Jensen requires the argument to be constant almost surely — here " +
              "Q(x)/P(x) = c — and summing to one forces c = 1, i.e. P = Q.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why this makes KL a usable loss",
          text:
            "A quantity that is always ≥ 0 and attains 0 exactly at the target is precisely what " +
            "an optimisation objective needs: minimising it has a known floor and a known " +
            "minimiser. That is the entire licence for “minimise the KL divergence” as an " +
            "algorithm, and it is what variational inference, t-SNE, and the training of " +
            "classifiers by cross-entropy are all leaning on.",
        },
        {
          kind: "prose",
          text:
            "The last step of the proof is also where the ≤ 1 matters. If Q is only " +
            "sub-normalised on P's support — because Q assigns mass outside it — the sum is " +
            "strictly less than one, which only strengthens the bound. Non-negativity never fails.",
        },
      ],
    },

    {
      heading: "The asymmetry, and what each direction does",
      blocks: [
        {
          kind: "prose",
          text:
            "D_KL(P‖Q) ≠ D_KL(Q‖P) in general, and the two orderings have genuinely different " +
            "behaviour when Q is a simpler family being fitted to a complicated P. This is the " +
            "practical content of the asymmetry, not a footnote about it.",
        },
        {
          kind: "table",
          headers: ["Direction", "Name", "Behaviour when fitting Q to P"],
          rows: [
            [
              "min_Q D_KL(P ‖ Q)",
              "Forward / moment-matching / mass-covering",
              "Heavily penalised wherever P has mass and Q does not, so Q spreads out to cover all of P's support — a unimodal Q fitted to a bimodal P straddles both modes",
            ],
            [
              "min_Q D_KL(Q ‖ P)",
              "Reverse / mode-seeking / zero-forcing",
              "Penalised wherever Q has mass and P does not, so Q collapses onto one mode of P and ignores the rest",
            ],
          ],
        },
        {
          kind: "prose",
          text:
            "Maximum likelihood estimation is the forward direction: maximising the expected " +
            "log-likelihood under the empirical distribution is the same as minimising " +
            "D_KL(P̂_data ‖ Q_θ), since the entropy of the data distribution does not depend on θ. " +
            "Variational inference is the reverse direction, minimising D_KL(q ‖ p) over a " +
            "tractable family q — which is exactly why variational posteriors are famous for being " +
            "over-confident and too narrow.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Not a metric, in three separate ways",
          text:
            "It is not symmetric; it does not satisfy the triangle inequality; and it can be " +
            "infinite. Calling it a “distance” invites all three mistakes at once. When a genuine " +
            "metric is required — comparing distributions with disjoint support, or needing " +
            "symmetry — the usual substitutes are the Jensen–Shannon divergence " +
            "(½D_KL(P‖M) + ½D_KL(Q‖M) with M the mixture, symmetric and bounded) or the Wasserstein " +
            "distance, which stays finite and informative even when the supports do not overlap.",
        },
      ],
    },

    {
      heading: "Relatives: entropy, cross-entropy, and mutual information",
      blocks: [
        {
          kind: "formula",
          latex: "D_KL(P ‖ Q) = H(P, Q) − H(P),   H(P, Q) = −Σₓ P(x) log Q(x)",
          caption: "Divergence = cross-entropy minus entropy",
        },
        {
          kind: "prose",
          text:
            "H(P) is the unavoidable cost of encoding data from P with the best possible code. " +
            "H(P, Q) is the cost of encoding it with the code that would be optimal for Q. The " +
            "difference is the waste, and it is the KL divergence. This decomposition explains a " +
            "detail of everyday machine learning: training a classifier minimises cross-entropy, " +
            "but since H(P) is fixed by the data and does not depend on the parameters, minimising " +
            "cross-entropy and minimising the KL divergence to the label distribution are the same " +
            "optimisation problem.",
        },
        {
          kind: "formula",
          latex: "I(X; Y) = D_KL( P_XY ‖ P_X ⊗ P_Y )",
          caption: "Mutual information is the divergence from the joint to the product of marginals",
        },
        {
          kind: "prose",
          text:
            "Reading mutual information this way makes its key property immediate. By Gibbs' " +
            "inequality it is non-negative, and it is zero exactly when the joint equals the " +
            "product of the marginals — that is, exactly when X and Y are independent. Unlike " +
            "correlation, it is therefore a genuine test of independence rather than of linear " +
            "association only.",
        },
        {
          kind: "example",
          title: "KL between two Normals",
          problem:
            "Compute D_KL(N(μ₁, σ₁²) ‖ N(μ₂, σ₂²)), and specialise to equal variances.",
          steps: [
            "The general closed form is log(σ₂/σ₁) + (σ₁² + (μ₁ − μ₂)²)/(2σ₂²) − ½.",
            "Set σ₁ = σ₂ = σ: the log term vanishes and the variance ratio contributes ½, which " +
              "cancels the −½.",
            "What remains is (μ₁ − μ₂)²/(2σ²).",
          ],
          answer:
            "With equal variances, D_KL = (μ₁ − μ₂)²/(2σ²) — symmetric in this special case, and " +
            "growing with the squared separation in units of variance. For N(0,1) against N(1,1) it " +
            "is 0.5 nats. Note that the general formula is asymmetric: N(0,1) against N(0,4) " +
            "gives 0.318, while the reverse gives 0.807.",
        },
      ],
    },

    {
      heading: "Where it shows up",
      blocks: [
        {
          kind: "list",
          items: [
            "Maximum likelihood: fitting a model is minimising the forward KL from the empirical " +
              "distribution to the model.",
            "Cross-entropy loss: the standard classification objective, equal to the KL up to a " +
              "constant.",
            "Variational inference and the ELBO: the evidence lower bound is the log evidence minus " +
              "D_KL(q ‖ p), so maximising the bound is minimising that divergence.",
            "Variational autoencoders: the regularisation term is the KL from the encoder's " +
              "posterior to the prior, in closed form because both are Gaussian.",
            "t-SNE: minimises the KL from the high-dimensional neighbourhood distribution to the " +
              "low-dimensional one, and its mode-seeking asymmetry is why t-SNE preserves local " +
              "structure at the expense of global structure.",
            "Model selection: the AIC is derived as an estimate of the expected KL divergence " +
              "between the fitted model and the truth.",
            "Reinforcement learning: trust-region and PPO-style methods constrain the KL between " +
              "successive policies to keep updates from moving too far.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Infinite divergence is a real failure mode",
          text:
            "If Q assigns zero probability anywhere P has mass, the divergence is infinite and " +
            "gradients are useless. In practice this is why models are smoothed, why a Gaussian " +
            "with full support is a convenient variational family, and why comparing two empirical " +
            "distributions with disjoint support needs a different divergence entirely — the " +
            "problem that motivated Wasserstein GANs.",
        },
      ],
    },
  ],

  references: [
    { source: "Cover & Thomas, Elements of Information Theory (2nd ed.)", locator: "§2.3, Relative Entropy and Mutual Information" },
    { source: "Bishop, Pattern Recognition and Machine Learning", locator: "§1.6.1, Relative Entropy and Mutual Information" },
    { source: "Murphy, Probabilistic Machine Learning: An Introduction", locator: "§6.2, KL Divergence" },
    { source: "Mathlingo assessment bank", locator: "assessments/mp-01-multivariate-probability.md" },
  ],
};
