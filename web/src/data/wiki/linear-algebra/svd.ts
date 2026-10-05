import type { WikiArticle } from "../types";

export const svd: WikiArticle = {
  conceptId: "svd",
  summary:
    "The singular value decomposition factors *any* matrix — square or not, invertible or not — into a rotation, a scaling, and another rotation. It is the most generally applicable decomposition in linear algebra, and it delivers the best low-rank approximation, the pseudoinverse, PCA, and a numerically reliable notion of rank.",
  sections: [
    {
      heading: "The factorisation",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbf{A} = \\mathbf{U}\\boldsymbol{\\Sigma} \\mathbf{V}^{\\top}, \\qquad \\mathbf{A} \\in \\mathbb{R}^{m\\times n}",
          caption: "$\\mathbf{U}$ ($m\\times m$) and $\\mathbf{V}$ ($n\\times n$) orthogonal; $\\boldsymbol{\\Sigma}$ diagonal with $\\sigma_1 \\ge \\sigma_2 \\ge \\cdots \\ge 0$",
        },
        {
          kind: "prose",
          text: "Read right to left as a sequence of geometric steps: $\\mathbf{V}^{\\top}$ rotates the input into a preferred coordinate system, $\\boldsymbol{\\Sigma}$ stretches each axis by a singular value, and $\\mathbf{U}$ rotates the result into the output space. Every linear map, however irregular, is exactly this — rotate, stretch, rotate.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why it always exists, unlike diagonalisation",
          text: "Eigen-decomposition needs a square matrix with enough independent eigenvectors, and fails for defective and non-square matrices. The SVD sidesteps this by using *two* different bases — one for the input space, one for the output. That extra freedom is exactly what makes it universal: $\\mathbf{v}_i$ and $\\mathbf{u}_i$ need not be related, whereas diagonalisation forces one basis to serve both roles.",
        },
        {
          kind: "formula",
          latex: "\\mathbf{A} = \\sum_{k=1}^{r} \\sigma_k\\,\\mathbf{u}_k\\mathbf{v}_k^{\\top}",
          caption: "Equivalently, a sum of $r$ rank-one pieces ordered by importance",
        },
      ],
    },
    {
      heading: "Relation to eigenvalues",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbf{A}^{\\top}\\mathbf{A} = \\mathbf{V}\\boldsymbol{\\Sigma}^{2}\\mathbf{V}^{\\top}, \\qquad \\mathbf{A}\\mathbf{A}^{\\top} = \\mathbf{U}\\boldsymbol{\\Sigma}^{2}\\mathbf{U}^{\\top}",
          caption: "Singular values are the square roots of the eigenvalues of $\\mathbf{A}^{\\top}\\mathbf{A}$",
        },
        {
          kind: "prose",
          text: "Both $\\mathbf{A}^{\\top}\\mathbf{A}$ and $\\mathbf{A}\\mathbf{A}^{\\top}$ are symmetric and positive semidefinite, so the spectral theorem applies and their eigenvalues are non-negative — which is why $\\sigma_k = \\sqrt{\\lambda_k}$ is well defined. This also explains the two sets of vectors: $\\mathbf{V}$ holds eigenvectors of $\\mathbf{A}^{\\top}\\mathbf{A}$ and $\\mathbf{U}$ those of $\\mathbf{A}\\mathbf{A}^{\\top}$.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Forming $\\mathbf{A}^{\\top}\\mathbf{A}$ is a bad way to compute it",
          text: "Squaring the matrix squares the condition number, so small singular values are lost to rounding. A matrix with $\\sigma_{\\min}/\\sigma_{\\max} = 10^{-8}$ is workable directly and hopeless after squaring in double precision. Real implementations use Golub–Kahan bidiagonalisation on $\\mathbf{A}$ itself. The identity above is for understanding, not for computing.",
        },
      ],
    },
    {
      heading: "What it delivers",
      blocks: [
        {
          kind: "table",
          headers: ["Use", "How the SVD gives it"],
          rows: [
            [
              "Rank",
              "the number of non-zero $\\sigma_k$ — and numerically, those above a tolerance",
            ],
            [
              "Best rank-$k$ approximation",
              "truncate the sum after $k$ terms (Eckart–Young)",
            ],
            [
              "Pseudoinverse",
              "$\\mathbf{A}^{+} = \\mathbf{V}\\boldsymbol{\\Sigma}^{+}\\mathbf{U}^{\\top}$, inverting the non-zero $\\sigma_k$",
            ],
            [
              "PCA",
              "SVD of the centred data matrix; $\\mathbf{V}$ holds the principal directions",
            ],
            [
              "Condition number",
              "$\\kappa = \\sigma_{\\max}/\\sigma_{\\min}$",
            ],
            [
              "Four subspaces",
              "$\\mathbf{U},\\mathbf{V}$ columns split into bases for $C(\\mathbf{A})$, $N(\\mathbf{A}^{\\top})$, $C(\\mathbf{A}^{\\top})$, $N(\\mathbf{A})$",
            ],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Eckart–Young is stronger than it sounds",
          text: "Truncating the SVD is not merely *a* good rank-$k$ approximation — it is provably the best possible one, simultaneously in the Frobenius and spectral norms, out of all rank-$k$ matrices. That two different norms agree on the same optimum is unusual, and it is why the same truncation serves image compression, noise reduction, and latent semantic analysis without needing separate justification each time.",
        },
        {
          kind: "example",
          title: "Compression arithmetic",
          problem:
            "A $1000\\times800$ image matrix is approximated by its top 50 singular values. How much is stored, and what fraction of the original?",
          steps: [
            "Full storage: $1000 \\times 800 = 800{,}000$ numbers.",
            "Rank-50: $\\mathbf{U}$ needs $1000\\times50$, $\\mathbf{V}$ needs $800\\times50$, plus 50 singular values.",
            "$50{,}000 + 40{,}000 + 50 = 90{,}050$.",
          ],
          answer:
            "About 11% of the original — and the discarded singular values quantify exactly how much was lost, since the squared Frobenius error is $\\sum_{k>50}\\sigma_k^{2}$.",
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
            "**Singular values are always real and non-negative**, unlike eigenvalues. They are ordered by convention, so $\\sigma_1$ is the largest stretch factor — which equals the spectral norm $\\|\\mathbf{A}\\|_2$.",
            "**Uniqueness is partial.** The singular values are unique; the vectors are not when singular values repeat, and each $(\\mathbf{u}_k,\\mathbf{v}_k)$ pair can flip sign together. Sign flips between library versions are expected, not a bug.",
            "**Truncated SVD is what to compute** for large matrices — algorithms like randomised SVD find the top $k$ without forming the full decomposition.",
            "**A gradual decay of singular values** means there is no natural rank, and any cutoff is a judgement call rather than a discovery.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Strang, Introduction to Linear Algebra", locator: "§7.1–7.4" },
    { source: "Trefethen & Bau, Numerical Linear Algebra", locator: "Lectures 4–5, 31" },
    { source: "Eckart & Young, 'The approximation of one matrix by another of lower rank'", locator: "Psychometrika 1(3), 1936" },
    { source: "Mathlingo assessment bank", locator: "assessments/la-08-svd-and-applications.md" },
  ],
};
