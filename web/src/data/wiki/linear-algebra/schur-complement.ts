import type { WikiArticle } from "../types";

export const schurComplement: WikiArticle = {
  conceptId: "schur-complement",
  summary:
    "The Schur complement is what's left of one block of a partitioned matrix after algebraically removing everything the other block already explains. It turns block-matrix inversion and determinants into smaller sub-problems, and — remarkably — it is exactly the conditional covariance of a jointly Gaussian vector, not merely an analogue of it.",
  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbf{M} = \\begin{bmatrix} \\mathbf{A} & \\mathbf{B} \\\\ \\mathbf{C} & \\mathbf{D} \\end{bmatrix}, \\qquad \\mathbf{S} = \\mathbf{A} - \\mathbf{B}\\mathbf{D}^{-1}\\mathbf{C}",
          caption: "$\\mathbf{S}$ is “the Schur complement of $\\mathbf{D}$ in $\\mathbf{M}$” — $\\mathbf{D}$ must be invertible",
        },
        {
          kind: "prose",
          text: "$\\mathbf{S}$ measures what remains of $\\mathbf{A}$ once the part of $\\mathbf{A}$ that $\\mathbf{B}$, $\\mathbf{C}$, and $\\mathbf{D}$ together account for has been subtracted off. Symmetrically, if $\\mathbf{A}$ is invertible instead, the Schur complement of $\\mathbf{A}$ in $\\mathbf{M}$ is $\\mathbf{D} - \\mathbf{C}\\mathbf{A}^{-1}\\mathbf{B}$. The two constructions are related but generally different matrices, and a given block matrix may have either or both well-defined depending on which of $\\mathbf{A}$, $\\mathbf{D}$ is invertible.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "It comes from block Gaussian elimination",
          text: "Left-multiplying $\\mathbf{M}$ by $\\begin{bmatrix} \\mathbf{I} & -\\mathbf{B}\\mathbf{D}^{-1} \\\\ 0 & \\mathbf{I}\\end{bmatrix}$ zeroes out the top-right block, leaving $\\begin{bmatrix} \\mathbf{A}-\\mathbf{B}\\mathbf{D}^{-1}\\mathbf{C} & 0 \\\\ \\mathbf{C} & \\mathbf{D}\\end{bmatrix}$ — block-upper-triangular, with $\\mathbf{S}=\\mathbf{A}-\\mathbf{B}\\mathbf{D}^{-1}\\mathbf{C}$ sitting exactly where elimination would have put it. It is nothing more than Gaussian elimination performed one block at a time instead of one entry at a time.",
        },
      ],
    },
    {
      heading: "Block determinants and inverses",
      blocks: [
        {
          kind: "formula",
          latex: "\\det(\\mathbf{M}) = \\det(\\mathbf{D})\\,\\det(\\mathbf{S}), \\qquad \\mathbf{S} = \\mathbf{A} - \\mathbf{B}\\mathbf{D}^{-1}\\mathbf{C}",
          caption: "A large determinant reduces to two much smaller ones",
        },
        {
          kind: "formula",
          latex: "\\mathbf{M}^{-1} = \\begin{bmatrix} \\mathbf{S}^{-1} & -\\mathbf{S}^{-1}\\mathbf{B}\\mathbf{D}^{-1} \\\\ -\\mathbf{D}^{-1}\\mathbf{C}\\mathbf{S}^{-1} & \\mathbf{D}^{-1} + \\mathbf{D}^{-1}\\mathbf{C}\\mathbf{S}^{-1}\\mathbf{B}\\mathbf{D}^{-1} \\end{bmatrix}",
          caption: "The full block inverse, entirely in terms of $\\mathbf{D}^{-1}$ and $\\mathbf{S}^{-1}$",
        },
        {
          kind: "example",
          title: "A worked $3 \\times 3$ block inversion",
          problem:
            "Let $\\mathbf{M} = \\begin{bmatrix} 5 & 1 & 2 \\\\ 1 & 2 & 0 \\\\ 2 & 0 & 3 \\end{bmatrix}$, partitioned with $\\mathbf{A}=[5]$, $\\mathbf{B}=\\begin{bmatrix}1&2\\end{bmatrix}$, $\\mathbf{C}=\\mathbf{B}^{\\top}$, $\\mathbf{D}=\\begin{bmatrix}2&0\\\\0&3\\end{bmatrix}$. Find $\\det(\\mathbf{M})$ via the Schur complement of $\\mathbf{D}$.",
          steps: [
            "$\\mathbf{D}^{-1} = \\operatorname{diag}(1/2, 1/3)$.",
            "$\\mathbf{B}\\mathbf{D}^{-1}\\mathbf{C} = \\mathbf{B}\\mathbf{D}^{-1}\\mathbf{B}^{\\top} = 1\\cdot\\tfrac12\\cdot 1 + 2\\cdot\\tfrac13\\cdot 2 = \\tfrac12 + \\tfrac43 = \\tfrac{11}{6}$.",
            "$\\mathbf{S} = \\mathbf{A} - \\mathbf{B}\\mathbf{D}^{-1}\\mathbf{C} = 5 - \\tfrac{11}{6} = \\tfrac{19}{6}$.",
            "$\\det(\\mathbf{D}) = 6$, so $\\det(\\mathbf{M}) = \\det(\\mathbf{D})\\cdot \\mathbf{S} = 6 \\cdot \\tfrac{19}{6} = 19$.",
          ],
          answer:
            "$\\det(\\mathbf{M}) = 19$ — computed from a $1\\times1$ Schur complement and a $2\\times2$ determinant, never touching a full $3\\times3$ cofactor expansion.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why this scales",
          text: "When $\\mathbf{D}$ is large but sparse and $\\mathbf{A}$ is small, this is the whole strategy behind fast solvers for “arrow” or “bordered” systems in optimization: eliminate the large block first, solve the small Schur-complement system, then back-substitute. Interior-point methods and finite-element domain decomposition both lean on exactly this reduction.",
        },
      ],
    },
    {
      heading: "The exact identity with conditional covariance",
      blocks: [
        {
          kind: "prose",
          text: "Split a jointly Gaussian vector $\\begin{bmatrix}X\\\\Y\\end{bmatrix} \\sim \\mathcal{N}\\!\\left(\\begin{bmatrix}\\mu_X\\\\\\mu_Y\\end{bmatrix}, \\begin{bmatrix}\\boldsymbol{\\Sigma}_{XX} & \\boldsymbol{\\Sigma}_{XY} \\\\ \\boldsymbol{\\Sigma}_{YX} & \\boldsymbol{\\Sigma}_{YY}\\end{bmatrix}\\right)$. Conditioning on $Y=y$ gives $X\\mid Y=y$ a Gaussian distribution whose covariance is",
        },
        {
          kind: "formula",
          latex: "\\text{Cov}(X\\mid Y=y) = \\boldsymbol{\\Sigma}_{XX} - \\boldsymbol{\\Sigma}_{XY}\\boldsymbol{\\Sigma}_{YY}^{-1}\\boldsymbol{\\Sigma}_{YX}",
          caption: "This is not an analogy — it is the Schur complement of $\\boldsymbol{\\Sigma}_{YY}$ in the joint covariance matrix, verbatim",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The conditional mean falls out of the same block algebra",
          text: "The conditional mean $\\mathbb{E}[X\\mid Y=y] = \\mu_X + \\boldsymbol{\\Sigma}_{XY}\\boldsymbol{\\Sigma}_{YY}^{-1}(y-\\mu_Y)$ uses the same $\\boldsymbol{\\Sigma}_{XY}\\boldsymbol{\\Sigma}_{YY}^{-1}$ term that appears inside the Schur complement — the block-elimination machinery that produces $\\mathbf{S}$ produces both the conditional mean's regression coefficient and the conditional covariance in one pass. A purely algebraic tool for block matrices turns out to compute two of the central objects of Gaussian conditioning at once.",
        },
        {
          kind: "example",
          title: "Conditional variance of a bivariate normal",
          problem:
            "$(X,Y)$ jointly Gaussian with $\\boldsymbol{\\Sigma} = \\begin{bmatrix}4 & 2 \\\\ 2 & 3\\end{bmatrix}$. Find $\\text{Var}(X\\mid Y)$.",
          steps: [
            "Identify $\\boldsymbol{\\Sigma}_{XX}=4$, $\\boldsymbol{\\Sigma}_{XY}=2$, $\\boldsymbol{\\Sigma}_{YX}=2$, $\\boldsymbol{\\Sigma}_{YY}=3$.",
            "Schur complement of $\\boldsymbol{\\Sigma}_{YY}$: $\\mathbf{S} = 4 - (2)(1/3)(2) = 4 - 4/3 = 8/3$.",
            "$\\text{Var}(X\\mid Y) = 8/3 \\approx 2.667$, strictly less than the unconditional $\\text{Var}(X)=4$.",
          ],
          answer:
            "$\\text{Var}(X\\mid Y) = 8/3$. Knowing $Y$ shrinks the uncertainty about $X$ from $4$ down to $8/3$ — exactly by the amount the correlation between them predicts.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Conditioning can only shrink covariance",
          text: "$\\boldsymbol{\\Sigma}_{XY}\\boldsymbol{\\Sigma}_{YY}^{-1}\\boldsymbol{\\Sigma}_{YX}$ is always positive semidefinite (it has the form $\\mathbf{B} \\mathbf{D}^{-1} \\mathbf{B}^{\\top}$ with $\\mathbf{D}$ positive definite, itself a quadratic form argument), so subtracting it from $\\boldsymbol{\\Sigma}_{XX}$ can never increase the spread. Algebraically: conditioning on more information never increases uncertainty — the inequality $\\text{Cov}(X\\mid Y) \\preceq \\text{Cov}(X)$ is a direct, unavoidable consequence of the Schur complement's structure, not a separate probabilistic fact bolted on afterward.",
        },
      ],
    },
    {
      heading: "Kalman filters and Gaussian process regression",
      blocks: [
        {
          kind: "prose",
          text: "A Kalman filter's measurement update is a Schur complement computation performed at every time step. The prior state and a new noisy observation are jointly Gaussian; the posterior state estimate and its covariance are exactly the conditional mean and conditional covariance of the state given the observation. The “innovation covariance” $\\mathbf{S} = \\mathbf{H} \\mathbf{P} \\mathbf{H}^{\\top} + R$ and the “Kalman gain” $\\mathbf{K} = \\mathbf{P}\\mathbf{H}^{\\top}\\mathbf{S}^{-1}$ are the $\\mathbf{D}$ and $\\mathbf{B}\\mathbf{D}^{-1}$ pieces of the Schur complement formula, renamed for the filtering literature — there is no separate derivation, only this identity applied recursively.",
        },
        {
          kind: "prose",
          text: "Gaussian process regression uses the same identity at a larger scale. Given training outputs and covariance kernel matrix $\\mathbf{K}$, cross-covariances $\\mathbf{K}_*$ to test points, and test covariance $\\mathbf{K}_{**}$, the predictive covariance at the test points is $\\mathbf{K}_{**} - \\mathbf{K}_*^{\\top}\\mathbf{K}^{-1}\\mathbf{K}_*$ — the Schur complement of $\\mathbf{K}$ in the joint (training, test) covariance block matrix. It is the residual uncertainty left at the test points after everything the training data explains has been subtracted away.",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "**Block matrix inversion** — the identity above reduces one large inverse to two small ones, the standard trick behind the matrix inversion lemma (Sherman–Morrison–Woodbury).",
            "**Positive definiteness of block matrices** — a symmetric block matrix $\\begin{bmatrix}\\mathbf{A}&\\mathbf{B}\\\\B^{\\top}&\\mathbf{D}\\end{bmatrix}$ is positive definite iff $\\mathbf{D}$ is positive definite and the Schur complement $\\mathbf{A}-\\mathbf{B}\\mathbf{D}^{-1}\\mathbf{B}^{\\top}$ is positive definite, reducing one large check to two smaller ones.",
            "**Partial correlation** in statistics is defined directly from Schur complements of a covariance or precision matrix, measuring correlation between two variables after controlling for a third.",
            "**Sparse linear solvers** eliminate large, sparse blocks first via their Schur complement, leaving a small dense system to solve directly — the same block-elimination idea scaled to millions of variables.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Boyd & Vandenberghe, Convex Optimization", locator: "§A.5.5" },
    { source: "Horn & Johnson, Matrix Analysis", locator: "§0.8" },
    { source: "Bishop, Pattern Recognition and Machine Learning", locator: "§2.3.1 (conditional Gaussians)" },
    { source: "Mathlingo assessment bank", locator: "assessments/la-07-spectral-theory-and-special-matrices.md" },
  ],
};
