import type { WikiArticle } from "../types";

export const eckartYoung: WikiArticle = {
  conceptId: "eckart-young",
  summary:
    "The Eckart–Young theorem says truncating the SVD gives the best possible low-rank approximation — not merely a good one. It is optimal simultaneously in the Frobenius and spectral norms, which is unusual and is why one construction serves image compression, denoising, and latent factor models alike.",
  sections: [
    {
      heading: "Statement",
      blocks: [
        {
          kind: "formula",
          latex: "A_k = \\sum_{i=1}^{k} \\sigma_i\\,\\mathbf{u}_i\\mathbf{v}_i^{\\top} \\ = \\ \\arg\\min_{\\operatorname{rank}(B) \\le k} \\|A - B\\|",
          caption: "The truncated SVD minimises the error over all rank-$k$ matrices",
        },
        {
          kind: "formula",
          latex: "\\|A - A_k\\|_2 = \\sigma_{k+1}, \\qquad \\|A - A_k\\|_F = \\sqrt{\\sum_{i>k}\\sigma_i^{2}}",
          caption: "And the error is exactly the discarded singular values",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Two norms, one optimum",
          text: "Different norms usually have different minimisers, so an approximation optimal in one is merely decent in another. Here the *same* truncation is optimal for both the spectral norm (worst-case amplification) and the Frobenius norm (total squared error). That coincidence is why the SVD does not need to be re-justified for each application — whichever error measure the problem cares about, the answer is the same.",
        },
      ],
    },
    {
      heading: "The error is known in advance",
      blocks: [
        {
          kind: "prose",
          text: "Because the residual is expressed in the discarded singular values, the approximation quality can be assessed *before* committing to a rank. The fraction of squared Frobenius norm retained is $\\sum_{i\\le k}\\sigma_i^{2} / \\sum_i \\sigma_i^{2}$ — which, for a centred data matrix, is exactly the proportion of variance explained in PCA.",
        },
        {
          kind: "example",
          title: "Choosing a rank",
          problem:
            "A matrix has singular values $50, 30, 12, 3, 1, 0.4, 0.2$. What rank retains 95% of the Frobenius norm?",
          steps: [
            "Squares: $2500,\\ 900,\\ 144,\\ 9,\\ 1,\\ 0.16,\\ 0.04$. Total $= 3554.2$.",
            "$k=1$: $2500/3554.2 = 70.3\\%$.",
            "$k=2$: $3400/3554.2 = 95.7\\%$. ✓",
            "$k=3$: $3544/3554.2 = 99.7\\%$.",
          ],
          answer:
            "Rank 2 suffices for 95%. The sharp drop from 12 to 3 suggests a natural cutoff at $k=3$ — the elbow in a scree plot is this gap made visible.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "A gradual decay means there is no natural rank",
          text: "The elbow heuristic works when singular values fall off a cliff. When they decay smoothly — which is common for real data — any cutoff is arbitrary, and reporting \"the rank\" implies a structure the data does not have. In that situation the honest options are to justify the rank by downstream performance, or to use a method that shrinks rather than truncates.",
        },
      ],
    },
    {
      heading: "Where it is used",
      blocks: [
        {
          kind: "table",
          headers: ["Application", "What the rank-$k$ structure means"],
          rows: [
            ["PCA", "$k$ principal components capture the dominant variance directions"],
            ["Image compression", "$k(m+n)$ numbers instead of $mn$, with quantified loss"],
            ["Latent semantic analysis", "$k$ latent topics underlying a term–document matrix"],
            ["Recommender systems", "$k$ latent factors for users and items"],
            ["Denoising", "signal in the large singular values, noise spread across the small ones"],
            ["LoRA fine-tuning", "a rank-$k$ update to a large weight matrix"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why denoising works at all",
          text: "Structured signal concentrates into a few directions, producing large singular values; independent noise spreads roughly evenly across all of them. Truncating therefore removes proportionally much more noise than signal. This is an empirical regularity rather than a theorem, and it fails when the noise is itself low-rank — correlated sensor drift, for instance, which truncation will faithfully preserve as though it were signal.",
        },
      ],
    },
    {
      heading: "Boundaries",
      blocks: [
        {
          kind: "list",
          ordered: false,
          items: [
            "**Optimality is for unitarily invariant norms.** Under the $\\ell_1$ norm or with weighted entries, the truncated SVD is no longer optimal, which is why robust PCA and weighted low-rank problems need different algorithms.",
            "**Missing entries break it.** The SVD needs a complete matrix; matrix completion for recommender systems is a genuinely harder, non-convex problem that the theorem does not cover.",
            "**Non-negativity is not preserved.** A truncated SVD of a non-negative matrix generally has negative entries, which is why non-negative matrix factorisation exists as a separate method with a different — and non-unique — solution.",
            "**Computing the full SVD is wasteful** when only the top $k$ are needed; randomised and Krylov methods obtain them far more cheaply for large sparse matrices.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Eckart & Young, 'The approximation of one matrix by another of lower rank'", locator: "Psychometrika 1(3), 1936" },
    { source: "Strang, Introduction to Linear Algebra", locator: "§7.2" },
    { source: "Trefethen & Bau, Numerical Linear Algebra", locator: "Lecture 5" },
    { source: "Mathlingo assessment bank", locator: "assessments/la-08-svd-and-applications.md" },
  ],
};
