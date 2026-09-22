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
          latex: "M = \\begin{bmatrix} A & B \\\\ C & D \\end{bmatrix}, \\qquad S = A - BD^{-1}C",
          caption: "$S$ is \"the Schur complement of $D$ in $M$\" — $D$ must be invertible",
        },
        {
          kind: "prose",
          text: "$S$ measures what remains of $A$ once the part of $A$ that $B$, $C$, and $D$ together account for has been subtracted off. Symmetrically, if $A$ is invertible instead, the Schur complement of $A$ in $M$ is $D - CA^{-1}B$. The two constructions are related but generally different matrices, and a given block matrix may have either or both well-defined depending on which of $A$, $D$ is invertible.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "It comes from block Gaussian elimination",
          text: "Left-multiplying $M$ by $\\begin{bmatrix} I & -BD^{-1} \\\\ 0 & I\\end{bmatrix}$ zeroes out the top-right block, leaving $\\begin{bmatrix} A-BD^{-1}C & 0 \\\\ C & D\\end{bmatrix}$ — block-upper-triangular, with $S=A-BD^{-1}C$ sitting exactly where elimination would have put it. It is nothing more than Gaussian elimination performed one block at a time instead of one entry at a time.",
        },
      ],
    },
    {
      heading: "Block determinants and inverses",
      blocks: [
        {
          kind: "formula",
          latex: "\\det(M) = \\det(D)\\,\\det(S), \\qquad S = A - BD^{-1}C",
          caption: "A large determinant reduces to two much smaller ones",
        },
        {
          kind: "formula",
          latex: "M^{-1} = \\begin{bmatrix} S^{-1} & -S^{-1}BD^{-1} \\\\ -D^{-1}CS^{-1} & D^{-1} + D^{-1}CS^{-1}BD^{-1} \\end{bmatrix}",
          caption: "The full block inverse, entirely in terms of $D^{-1}$ and $S^{-1}$",
        },
        {
          kind: "example",
          title: "A worked 3×3 block inversion",
          problem:
            "Let $M = \\begin{bmatrix} 5 & 1 & 2 \\\\ 1 & 2 & 0 \\\\ 2 & 0 & 3 \\end{bmatrix}$, partitioned with $A=[5]$, $B=\\begin{bmatrix}1&2\\end{bmatrix}$, $C=B^{\\top}$, $D=\\begin{bmatrix}2&0\\\\0&3\\end{bmatrix}$. Find $\\det(M)$ via the Schur complement of $D$.",
          steps: [
            "$D^{-1} = \\operatorname{diag}(1/2, 1/3)$.",
            "$BD^{-1}C = BD^{-1}B^{\\top} = 1\\cdot\\tfrac12\\cdot 1 + 2\\cdot\\tfrac13\\cdot 2 = \\tfrac12 + \\tfrac43 = \\tfrac{11}{6}$.",
            "$S = A - BD^{-1}C = 5 - \\tfrac{11}{6} = \\tfrac{19}{6}$.",
            "$\\det(D) = 6$, so $\\det(M) = \\det(D)\\cdot S = 6 \\cdot \\tfrac{19}{6} = 19$.",
          ],
          answer:
            "$\\det(M) = 19$ — computed from a $1\\times1$ Schur complement and a $2\\times2$ determinant, never touching a full $3\\times3$ cofactor expansion.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why this scales",
          text: "When $D$ is large but sparse and $A$ is small, this is the whole strategy behind fast solvers for \"arrow\" or \"bordered\" systems in optimization: eliminate the large block first, solve the small Schur-complement system, then back-substitute. Interior-point methods and finite-element domain decomposition both lean on exactly this reduction.",
        },
      ],
    },
    {
      heading: "The exact identity with conditional covariance",
      blocks: [
        {
          kind: "prose",
          text: "Split a jointly Gaussian vector $\\begin{pmatrix}X\\\\Y\\end{pmatrix} \\sim N\\!\\left(\\begin{pmatrix}\\mu_X\\\\\\mu_Y\\end{pmatrix}, \\begin{bmatrix}\\Sigma_{XX} & \\Sigma_{XY} \\\\ \\Sigma_{YX} & \\Sigma_{YY}\\end{bmatrix}\\right)$. Conditioning on $Y=y$ gives $X\\mid Y=y$ a Gaussian distribution whose covariance is",
        },
        {
          kind: "formula",
          latex: "\\operatorname{Cov}(X\\mid Y=y) = \\Sigma_{XX} - \\Sigma_{XY}\\Sigma_{YY}^{-1}\\Sigma_{YX}",
          caption: "This is not an analogy — it is the Schur complement of $\\Sigma_{YY}$ in the joint covariance matrix, verbatim",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The conditional mean falls out of the same block algebra",
          text: "The conditional mean $E[X\\mid Y=y] = \\mu_X + \\Sigma_{XY}\\Sigma_{YY}^{-1}(y-\\mu_Y)$ uses the same $\\Sigma_{XY}\\Sigma_{YY}^{-1}$ term that appears inside the Schur complement — the block-elimination machinery that produces $S$ produces both the conditional mean's regression coefficient and the conditional covariance in one pass. A purely algebraic tool for block matrices turns out to compute two of the central objects of Gaussian conditioning at once.",
        },
        {
          kind: "example",
          title: "Conditional variance of a bivariate normal",
          problem:
            "$(X,Y)$ jointly Gaussian with $\\Sigma = \\begin{bmatrix}4 & 2 \\\\ 2 & 3\\end{bmatrix}$. Find $\\operatorname{Var}(X\\mid Y)$.",
          steps: [
            "Identify $\\Sigma_{XX}=4$, $\\Sigma_{XY}=2$, $\\Sigma_{YX}=2$, $\\Sigma_{YY}=3$.",
            "Schur complement of $\\Sigma_{YY}$: $S = 4 - (2)(1/3)(2) = 4 - 4/3 = 8/3$.",
            "$\\operatorname{Var}(X\\mid Y) = 8/3 \\approx 2.667$, strictly less than the unconditional $\\operatorname{Var}(X)=4$.",
          ],
          answer:
            "$\\operatorname{Var}(X\\mid Y) = 8/3$. Knowing $Y$ shrinks the uncertainty about $X$ from $4$ down to $8/3$ — exactly by the amount the correlation between them predicts.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Conditioning can only shrink covariance",
          text: "$\\Sigma_{XY}\\Sigma_{YY}^{-1}\\Sigma_{YX}$ is always positive semidefinite (it has the form $B D^{-1} B^{\\top}$ with $D$ positive definite, itself a quadratic form argument), so subtracting it from $\\Sigma_{XX}$ can never increase the spread. Algebraically: conditioning on more information never increases uncertainty — the inequality $\\operatorname{Cov}(X\\mid Y) \\preceq \\operatorname{Cov}(X)$ is a direct, unavoidable consequence of the Schur complement's structure, not a separate probabilistic fact bolted on afterward.",
        },
      ],
    },
    {
      heading: "Kalman filters and Gaussian process regression",
      blocks: [
        {
          kind: "prose",
          text: "A Kalman filter's measurement update is a Schur complement computation performed at every time step. The prior state and a new noisy observation are jointly Gaussian; the posterior state estimate and its covariance are exactly the conditional mean and conditional covariance of the state given the observation. The \"innovation covariance\" $S = H P H^{\\top} + R$ and the \"Kalman gain\" $K = PH^{\\top}S^{-1}$ are the $D$ and $BD^{-1}$ pieces of the Schur complement formula, renamed for the filtering literature — there is no separate derivation, only this identity applied recursively.",
        },
        {
          kind: "prose",
          text: "Gaussian process regression uses the same identity at a larger scale. Given training outputs and covariance kernel matrix $K$, cross-covariances $K_*$ to test points, and test covariance $K_{**}$, the predictive covariance at the test points is $K_{**} - K_*^{\\top}K^{-1}K_*$ — the Schur complement of $K$ in the joint (training, test) covariance block matrix. It is the residual uncertainty left at the test points after everything the training data explains has been subtracted away.",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "**Block matrix inversion** — the identity above reduces one large inverse to two small ones, the standard trick behind the matrix inversion lemma (Sherman–Morrison–Woodbury).",
            "**Positive definiteness of block matrices** — a symmetric block matrix $\\begin{bmatrix}A&B\\\\B^{\\top}&D\\end{bmatrix}$ is positive definite iff $D$ is positive definite and the Schur complement $A-BD^{-1}B^{\\top}$ is positive definite, reducing one large check to two smaller ones.",
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
