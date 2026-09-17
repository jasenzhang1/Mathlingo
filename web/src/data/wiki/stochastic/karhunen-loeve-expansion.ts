import type { WikiArticle } from "../types";

export const karhunenLoeveExpansionWiki: WikiArticle = {
  conceptId: "karhunen-loeve-expansion",
  summary:
    "The Karhunen-Loève (KL) expansion writes a random process X(t) as an infinite sum of *fixed* " +
    "orthogonal functions, each multiplied by an *uncorrelated random* coefficient — a Fourier-style " +
    "series where the randomness lives entirely in the coefficients, not the basis. It exists because " +
    "`mercers-theorem` applies to any covariance function exactly as it applies to any kernel, and it is " +
    "the reason `brownian-motion` has a clean closed-form series representation at all.",
  sections: [
    {
      heading: "The expansion",
      blocks: [
        {
          kind: "formula",
          latex: "X(t) = \\mu(t) + \\sum_{k=1}^{\\infty} \\sqrt{\\lambda_k}\\, Z_k \\, \\phi_k(t), \\qquad Z_k \\sim \\mathcal{N}(0,1) \\text{ i.i.d.}",
          caption: "μ(t) the mean function; (λₖ, φₖ) the eigenvalue/eigenfunction pairs of the covariance function",
        },
        {
          kind: "prose",
          text: "The φₖ are deterministic functions, fixed once and for all by the process's covariance — they don't change from one sample path to the next. Everything random about a particular realization of X(t) is packed into the coefficients Zₖ, which are uncorrelated (independent, in the Gaussian case) across k. This is exactly `hilbert-space`'s orthonormal-basis decomposition, applied to a *random* element of the function space instead of a fixed one.",
        },
      ],
    },
    {
      heading: "Where the eigenfunctions come from",
      blocks: [
        {
          kind: "prose",
          text: "The covariance function K(s, t) = Cov(X(s), X(t)) is itself a valid kernel (symmetric, positive semi-definite), so `mercers-theorem` guarantees K(s, t) = Σ_k λₖ φₖ(s) φₖ(t) for an orthonormal basis {φₖ} of eigenfunctions with eigenvalues λₖ ≥ 0. The KL expansion is what happens when you plug that same eigenbasis into the process itself rather than just its covariance — this is not a coincidence, it's a theorem (Mercer's theorem applied to Cov(X(s), X(t)) is precisely what licenses the expansion).",
        },
      ],
    },
    {
      heading: "The canonical example: Brownian motion",
      blocks: [
        {
          kind: "formula",
          latex: "W(t) = \\sqrt{2} \\sum_{k=1}^{\\infty} Z_k \\, \\frac{\\sin\\!\\big((k - \\tfrac12)\\pi t\\big)}{(k - \\tfrac12)\\pi}, \\quad t \\in [0, 1]",
          caption: "The KL expansion of standard Brownian motion on [0, 1]",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why the eigenvalues decay",
          text: "λₖ ∝ 1/(k − ½)² here — the eigenvalues shrink quickly, which is what makes truncating the sum at a few dozen terms a good finite-dimensional approximation of a genuinely infinite-dimensional object. This is the same phenomenon `stick-breaking-construction`'s weights show for a different reason: a small number of terms carries most of the 'mass' (there, probability mass; here, variance), and the tail is a rapidly vanishing correction.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Variance from the eigenvalues",
          problem:
            "A process has KL eigenvalues λ₁ = 4, λ₂ = 1, λ₃ = 0.25, and Var(X(t)) = Σₖ λₖ φₖ(t)² with φₖ(t)² = 1 for all k at some fixed t. Using only the first two terms, what fraction of the total variance (all three terms) is captured at that t?",
          steps: [
            "Total variance (3 terms) = 4 + 1 + 0.25 = 5.25.",
            "First two terms = 4 + 1 = 5.",
            "Fraction captured = 5 / 5.25.",
          ],
          answer: "5/5.25 ≈ 0.952 — about 95% of the variance at that point is captured by just the first two KL terms, illustrating the rapid eigenvalue decay.",
        },
      ],
    },
  ],
  references: [
    { source: "Shreve, Stochastic Calculus for Finance II", locator: "§3.9 (via the Brownian bridge)" },
    { source: "Ramsay & Silverman, Functional Data Analysis", locator: "Ch. 8, Principal components analysis for functional data" },
  ],
};
