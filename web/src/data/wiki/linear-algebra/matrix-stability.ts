import type { WikiArticle } from "../types";

export const matrixStability: WikiArticle = {
  conceptId: "matrix-stability",
  summary:
    "Whether repeatedly applying a matrix drives a vector to zero, keeps it bounded, or sends it to infinity is governed by a single number: the spectral radius, the largest eigenvalue magnitude. A related but distinct number, the condition number, governs a different kind of stability — how much a small error in the input of a linear system gets amplified in the output. Both numbers explain phenomena from Markov chain mixing to exploding gradients in deep networks.",
  sections: [
    {
      heading: "Long-run behavior of x_{k+1} = Ax_k",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbf{x}_{k+1} = A\\mathbf{x}_k \\;\\Rightarrow\\; \\mathbf{x}_k = A^{k}\\mathbf{x}_0",
          caption: "Repeated application of the same matrix",
        },
        {
          kind: "formula",
          latex: "\\rho(A) = \\max\\{|\\lambda_i| : \\lambda_i \\text{ an eigenvalue of } A\\}",
          caption: "The spectral radius — the largest eigenvalue magnitude, possibly complex",
        },
        {
          kind: "prose",
          text: "Writing $A = PDP^{-1}$ (when $A$ is diagonalizable) gives $A^k\\mathbf{x}_0 = PD^kP^{-1}\\mathbf{x}_0$. Raising a diagonal matrix to the $k$-th power just raises each entry to the $k$-th power, so whichever eigenvalue has the largest magnitude eventually dominates every other term as $k$ grows — regardless of the initial mixture, unless the starting vector happens to have exactly zero component in that direction.",
        },
        {
          kind: "table",
          headers: ["Condition", "Long-run behavior of $\\mathbf{x}_k$"],
          rows: [
            ["$\\rho(A) < 1$", "$\\mathbf{x}_k \\to \\mathbf{0}$ for every starting vector"],
            ["$\\rho(A) = 1$ (diagonalizable)", "bounded, generally not converging to $0$"],
            ["$\\rho(A) > 1$", "$\\|\\mathbf{x}_k\\| \\to \\infty$ for generic starting vectors"],
            ["$\\rho(A) = 1$, non-diagonalizable", "can still grow — see the caveat below"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The determinant is not the test",
          text: "$\\det(A) = \\prod_i \\lambda_i$ can be small even when one eigenvalue is enormous — a matrix with eigenvalues $10$ and $0.01$ has $\\det \\approx 0.1$ but is wildly unstable in the direction of the eigenvalue $10$. Stability is a statement about the largest eigenvalue magnitude specifically, never about their product or their average.",
        },
      ],
    },
    {
      heading: "The caveat: repeated eigenvalues and Jordan blocks",
      blocks: [
        {
          kind: "formula",
          latex: "J = \\begin{bmatrix} \\lambda & 1 \\\\ 0 & \\lambda \\end{bmatrix}, \\qquad J^{k} = \\begin{bmatrix} \\lambda^{k} & k\\lambda^{k-1} \\\\ 0 & \\lambda^{k} \\end{bmatrix}",
          caption: "A Jordan block's power grows an extra factor of $k$ in the off-diagonal entry",
        },
        {
          kind: "prose",
          text: "A matrix that is not diagonalizable — one with a repeated eigenvalue but too few independent eigenvectors — can have $\\rho(A) = 1$ exactly and still be unstable, because $A^k$ contains a term growing like $k\\lambda^{k-1}$. Even at $|\\lambda|=1$, this polynomial-in-$k$ factor is unbounded. The spectral radius is the right tool for diagonalizable matrices; a symmetric matrix (always diagonalizable, by the spectral theorem) never has this problem, which is one more reason symmetric matrices are the well-behaved case throughout linear algebra.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Transient growth: \"stable\" isn't the same as \"safe\"",
          text: "Even a genuinely stable matrix with $\\rho(A) < 1$ can show $\\|A^k\\mathbf{x}_0\\|$ grow substantially before its eventual decay, if $A$ is non-normal (its eigenvectors are far from orthogonal). The eigenvalue-only picture describes only the asymptotic $k\\to\\infty$ trend — transient amplification along the way is a separate, practically important phenomenon in control theory and fluid dynamics, where a system can be technically stable yet blow past acceptable operating limits before it settles down.",
        },
      ],
    },
    {
      heading: "Condition number: error amplification in Ax = b",
      blocks: [
        {
          kind: "formula",
          latex: "\\kappa(A) = \\|A\\|\\,\\|A^{-1}\\| = \\frac{\\sigma_{\\max}}{\\sigma_{\\min}}",
          caption: "How much a relative error in $b$ (or in $A$ itself) can be amplified in the solution $x$",
        },
        {
          kind: "prose",
          text: "Solving $A\\mathbf{x}=\\mathbf{b}$ for $\\mathbf{x}$ is a different question from iterating $A$, but it has the same character: a relative perturbation of size $\\varepsilon$ in $\\mathbf{b}$ can produce a relative change of size roughly $\\kappa(A)\\varepsilon$ in the computed $\\mathbf{x}$. With double-precision arithmetic supplying about 16 accurate digits, a system with $\\kappa(A)=10^{10}$ leaves only about 6 trustworthy digits, and $\\kappa(A)=10^{16}$ leaves essentially none.",
        },
        {
          kind: "example",
          title: "Condition number of a diagonal matrix",
          problem: "Compute $\\kappa_2(A)$ for $A = \\operatorname{diag}(100, 1)$.",
          steps: [
            "For a diagonal matrix, the singular values are the absolute values of the diagonal entries: $100$ and $1$.",
            "$\\kappa_2(A) = \\sigma_{\\max}/\\sigma_{\\min} = 100/1 = 100$.",
          ],
          answer:
            "$\\kappa_2(A) = 100$ — a moderately ill-conditioned matrix; a $0.1\\%$ error in $b$ could show up as up to a $10\\%$ error in the solution $x$.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Conditioning is a property of the matrix, not the algorithm",
          text: "No algorithm can recover accuracy an ill-conditioned matrix has already lost — the sensitivity lives in $A$ itself. This is why forming $A^{\\top}A$ (as in the naive normal equations for least squares) is criticized: it squares the condition number, turning a barely tractable problem into an intractable one, which is exactly why QR decomposition (via orthogonal matrices, whose condition number is always $1$) is preferred instead.",
        },
      ],
    },
    {
      heading: "How ρ(A) and the operator norm relate",
      blocks: [
        {
          kind: "formula",
          latex: "\\rho(A) \\le \\|A\\| \\quad \\text{(any operator norm)}, \\qquad \\rho(A) = \\|A\\|_2 \\text{ when } A = A^{\\top}",
          caption: "The spectral radius is always upper-bounded by the operator norm — and equal to it for symmetric matrices",
        },
        {
          kind: "prose",
          text: "If $A\\mathbf{v}=\\lambda\\mathbf{v}$ for the largest-magnitude eigenvalue, then $\\|A\\mathbf{v}\\| = |\\lambda|\\,\\|\\mathbf{v}\\| = \\rho(A)\\|\\mathbf{v}\\|$; but the operator norm satisfies $\\|A\\mathbf{v}\\| \\le \\|A\\|\\,\\|\\mathbf{v}\\|$ by its very definition, so $\\rho(A) \\le \\|A\\|$ follows immediately. For a symmetric matrix the spectral theorem makes this an equality: $A = Q\\Lambda Q^{\\top}$ with $Q$ orthogonal, so $\\|A\\|_2 = \\max_{\\|\\mathbf{x}\\|=1}\\|Q\\Lambda Q^{\\top}\\mathbf{x}\\| = \\max_{\\|\\mathbf{y}\\|=1}\\|\\Lambda\\mathbf{y}\\| = \\max_i|\\lambda_i| = \\rho(A)$, since $Q^{\\top}$ preserves length.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why this matters practically",
          text: "The spectral radius is often expensive or numerically delicate to compute exactly, especially for large or non-symmetric matrices, while operator norms (particularly the Frobenius norm, which upper-bounds $\\|A\\|_2$ and is trivial to compute) are cheap. Checking $\\|A\\| < 1$ gives an easy, if sometimes loose, sufficient condition for stability without ever finding an eigenvalue.",
        },
      ],
    },
    {
      heading: "Where it shows up",
      blocks: [
        {
          kind: "list",
          ordered: false,
          items: [
            "**Markov chains.** A reversible chain's transition matrix is similar to a symmetric matrix; after the trivial eigenvalue-$1$ stationary direction is removed, the second-largest eigenvalue magnitude controls exactly how fast the chain converges to its stationary distribution — a smaller value means faster mixing.",
            "**Deep learning.** Backpropagating a gradient through many layers multiplies by many Jacobian matrices in sequence, structurally identical to $\\mathbf{x}_{k+1}=A\\mathbf{x}_k$. If the dominant singular value of these Jacobians is consistently above $1$, gradients explode roughly like $\\rho^L$ over $L$ layers; if consistently below $1$, they vanish — which is why orthogonal or careful weight initialization (singular values near $1$) is standard practice.",
            "**Numerical ODE solvers.** A discretized linear dynamical system is stable exactly when its update matrix's spectral radius is at most $1$; explicit time-stepping schemes are typically only stable for a limited range of step sizes for precisely this reason.",
            "**Control theory.** Whether a feedback-controlled system settles down or oscillates out of control is a spectral radius question on the closed-loop system matrix, with condition-number and transient-growth analysis added for the difference between technically stable and practically robust.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "\"Technically stable\" is not \"practically safe\"",
          text: "A discretized structural model with $\\rho(A) = 0.999$ satisfies the stability criterion but decays extremely slowly — and if the matrix is non-normal, may show substantial transient amplification before that slow decay even begins. Engineers checking only \"is $\\rho(A)$ below $1$\" without examining how close to $1$, or how non-normal the matrix is, can be badly surprised by a system that is unstable in every sense that matters operationally.",
        },
      ],
    },
  ],
  references: [
    { source: "Trefethen & Bau, Numerical Linear Algebra", locator: "Lectures 12, 24, 25" },
    { source: "Strang, Introduction to Linear Algebra", locator: "§6.4, §9.3" },
    { source: "Horn & Johnson, Matrix Analysis", locator: "Ch. 5" },
    { source: "Mathlingo assessment bank", locator: "assessments/la-07-spectral-theory-and-special-matrices.md" },
  ],
};
