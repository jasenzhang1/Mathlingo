import type { WikiArticle } from "../types";

export const uniquenessOfSvd: WikiArticle = {
  conceptId: "uniqueness-of-svd",
  summary:
    "The singular values of a matrix are always unique. The singular vectors are not: they carry a sign ambiguity even when singular values are distinct, and a full rotational ambiguity within any subspace where singular values repeat. Both facts trace directly to the same non-uniqueness in the eigenvectors of AᵀA and AAᵀ.",
  sections: [
    {
      heading: "What is fixed, and what is not",
      blocks: [
        {
          kind: "prose",
          text: "Write A = UΣVᵀ with σ₁ ≥ σ₂ ≥ ⋯ ≥ 0. The diagonal entries of Σ — the singular values — are exactly determined by A: they are the (sorted) square roots of the eigenvalues of AᵀA, and a symmetric matrix's eigenvalues are a fixed set of numbers independent of how anyone computes them. The columns of U and V are a different story. Two valid SVDs of the same A can disagree in U and V while agreeing in Σ down to the last digit.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Values are numbers; vectors are directions",
          text: "It helps to keep the two questions separate. \"How much does A stretch along this axis?\" has one answer. \"Which axis, exactly?\" can have several equally correct answers whenever the stretch amount ties with another axis's — and even when it doesn't, \"which axis\" is only pinned down up to a sign, since an axis and its reverse are the same line.",
        },
      ],
    },
    {
      heading: "Sign ambiguity for distinct singular values",
      blocks: [
        {
          kind: "formula",
          latex: "A\\mathbf{v}_i = \\sigma_i \\mathbf{u}_i \\quad\\Longrightarrow\\quad A(-\\mathbf{v}_i) = \\sigma_i(-\\mathbf{u}_i)",
          caption: "Flipping both vectors in a pair leaves the relation — and A — unchanged",
        },
        {
          kind: "prose",
          text: "When σᵢ is a simple (non-repeated) singular value, vᵢ is the unique unit eigenvector of AᵀA for the simple eigenvalue σᵢ² — unique up to an overall sign, since an eigenspace is a line and a line has two unit vectors. Once vᵢ's sign is picked, uᵢ = Avᵢ/σᵢ is forced, and its sign moves with vᵢ's. So the pair (uᵢ, vᵢ) has exactly one bit of freedom: flip both, or flip neither. Never one alone — flipping only vᵢ would break Avᵢ = σᵢuᵢ, since A(−vᵢ) = −σᵢuᵢ ≠ σᵢuᵢ unless uᵢ flips too. The rank-one term σᵢuᵢvᵢᵀ that this pair contributes to A is identical either way, because the two sign flips cancel inside the outer product.",
        },
      ],
    },
    {
      heading: "Rotational ambiguity for repeated singular values",
      blocks: [
        {
          kind: "prose",
          text: "If a singular value σ has multiplicity k — it appears k times on the diagonal of Σ — the corresponding right singular vectors are not one fixed set of k vectors, but *any* orthonormal basis of the k-dimensional eigenspace of AᵀA for eigenvalue σ². This is not a special quirk of SVD; it is inherited wholesale from the Spectral Theorem's own treatment of repeated eigenvalues, because vᵢ is by definition an eigenvector of AᵀA and uᵢ one of AAᵀ.",
        },
        {
          kind: "example",
          title: "A fully degenerate case",
          problem: "A = 3I₂ (a 2×2 matrix). Describe every valid SVD of A.",
          steps: [
            "AᵀA = 9I₂, with the single eigenvalue 9 repeated twice — every nonzero vector is an eigenvector.",
            "So Σ = 3I₂ regardless of any other choice, and any orthonormal V is a valid choice of right singular vectors.",
            "A = UΣVᵀ = 3UVᵀ must equal 3I₂, so UVᵀ = I, i.e. U = V.",
          ],
          answer:
            "Every pair (Q, Q) for Q any 2×2 orthogonal matrix is a valid SVD — an entire one-parameter family of rotations (and their reflections), not just a handful of sign choices. The freedom scales with how degenerate the singular value is.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The subspace is real even when the basis isn't",
          text: "Non-uniqueness of the vectors does not mean anything about A is actually undetermined. The *subspace* spanned by the tied singular vectors, the reconstruction A itself, and every singular value are all exactly fixed. Only the particular labeled basis chosen to describe that subspace is arbitrary.",
        },
      ],
    },
    {
      heading: "Where this shows up in practice",
      blocks: [
        {
          kind: "table",
          headers: ["Setting", "What looks inconsistent", "Why it's fine"],
          rows: [
            [
              "Two SVD library implementations",
              "Different signs, or different vectors for tied singular values",
              "Both are valid SVDs of the same matrix; only a convention differs",
            ],
            [
              "PCA across software or random seeds",
              "A principal component's sign is flipped between runs",
              "Sign ambiguity of singular/eigenvectors; the direction (the line) is identical",
            ],
            [
              "Eigenfaces / near-tied singular values",
              "Individual 'eigenface' directions look unstable across training runs",
              "A near-degenerate subspace lets vectors rotate within it with almost no cost",
            ],
            [
              "Vibration modes of a symmetric structure",
              "Two modes sharing a frequency have no single 'correct' mode shape",
              "A repeated eigenvalue's eigenspace has no preferred orthonormal basis",
            ],
          ],
        },
      ],
    },
    {
      heading: "Practical notes",
      blocks: [
        {
          kind: "list",
          ordered: false,
          items: [
            "**A sign flip is not a bug.** If reconstructing UΣVᵀ still gives back A, both sign conventions are correct — comparing raw vector coordinates across two runs is the wrong test; comparing the reconstructed matrix or the spanned subspace is the right one.",
            "**Ties do not have to be exact to matter.** Singular values that are merely *close* behave numerically like a soft version of a repeated singular value: small perturbations to the data can swing the vectors substantially inside that near-degenerate subspace.",
            "**The values alone are always a safe comparison.** Two SVD routines that disagree on U or V but agree on Σ (up to sorting and rounding) are agreeing about A completely.",
            "**Ordering is a convention, not a discovery.** Listing σ₁ ≥ σ₂ ≥ ⋯ is what makes \"the first singular value\" a well-defined phrase; without an ordering rule, the indices themselves could be permuted arbitrarily.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Strang, Introduction to Linear Algebra", locator: "§7.1" },
    { source: "Trefethen & Bau, Numerical Linear Algebra", locator: "Lecture 4" },
    { source: "Golub & Van Loan, Matrix Computations", locator: "§2.4" },
    { source: "Mathlingo assessment bank", locator: "assessments/la-08-svd-and-applications.md" },
  ],
};
