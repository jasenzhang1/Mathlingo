import type { WikiArticle } from "../types";

export const idempotentMatrices: WikiArticle = {
  conceptId: "idempotent-matrices",
  summary:
    "An idempotent matrix does nothing new the second time it acts: $P^2 = P$. Applying $P$ once moves a vector somewhere; applying it again leaves that result exactly where it was. That single algebraic condition forces every eigenvalue to be $0$ or $1$, forces the trace to equal the rank, and — when $P$ is also symmetric — forces $P$ to be an orthogonal projection onto its own column space. The hat matrix of a linear model, $H = X(X^{\\top}X)^{-1}X^{\\top}$, is exactly such a matrix, and its idempotence is the single fact underneath degrees of freedom, the geometry of residuals, and the exact distribution of the residual sum of squares.",
  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "P \\in \\mathbb{R}^{n\\times n} \\text{ is idempotent} \\iff P^2 = P",
          caption: "Applying $P$ twice is the same as applying it once",
        },
        {
          kind: "prose",
          text: "This is a purely algebraic condition — it says nothing about symmetry. $P = \\begin{bmatrix}1&1\\\\0&0\\end{bmatrix}$ satisfies $P^2=P$ but is not symmetric; it is an *oblique* projection, one that projects along a direction that is not orthogonal to the target subspace. The overwhelming majority of idempotent matrices you meet in statistics and machine learning are symmetric as well, and that extra condition is doing real work — see below.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Idempotent = \"already at a fixed point\"",
          text: "For any vector $\\mathbf{v}$, $P\\mathbf{v}$ is a fixed point of $P$: $P(P\\mathbf{v}) = P\\mathbf{v}$. So the range of $P$ is exactly its set of fixed points. This is the algebraic signature of a *projection* onto that range — geometrically, projecting something that is already in the target subspace should leave it untouched, and idempotence is precisely that requirement written as an equation.",
        },
      ],
    },
    {
      heading: "Eigenvalues are forced to be 0 or 1",
      blocks: [
        {
          kind: "formula",
          latex: "P\\mathbf{v} = \\lambda\\mathbf{v} \\;\\Rightarrow\\; P^2\\mathbf{v} = \\lambda^2\\mathbf{v} = P\\mathbf{v} = \\lambda\\mathbf{v} \\;\\Rightarrow\\; \\lambda^2 = \\lambda \\;\\Rightarrow\\; \\lambda \\in \\{0,1\\}",
          caption: "Every eigenvalue of an idempotent matrix satisfies $\\lambda^2=\\lambda$",
        },
        {
          kind: "prose",
          text: "There is no third option. A matrix that scales anything by $0.5$ or by $-1$ cannot be idempotent, because applying it twice would scale by $0.25$ or $1$ — not reproduce the first application. The eigenvectors with $\\lambda=1$ span exactly the range of $P$ (the subspace it projects *onto*); the eigenvectors with $\\lambda=0$ span exactly the null space of $P$ (the subspace it projects *along* or *out of*).",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Trace equals rank",
          text: "The trace of any square matrix is the sum of its eigenvalues. For an idempotent matrix that sum only ever adds $0$s and $1$s, so $\\operatorname{tr}(P)$ is exactly the *count* of unit eigenvalues — which is the dimension of the range, i.e. $\\operatorname{rank}(P)$. So $\\operatorname{tr}(P) = \\operatorname{rank}(P)$ for every idempotent matrix, and this integer is computable by simply summing the diagonal — no eigendecomposition required.",
        },
      ],
    },
    {
      heading: "Symmetric + idempotent = orthogonal projection",
      blocks: [
        {
          kind: "prose",
          text: "Idempotence alone only guarantees $P$ reproduces its own range. Adding symmetry ($P = P^{\\top}$) pins down *how* it gets there: for any $\\mathbf{v}$, decompose $\\mathbf{v} = P\\mathbf{v} + (\\mathbf{v} - P\\mathbf{v})$. The second piece is orthogonal to the range of $P$, because for any $\\mathbf{u}$ in that range (so $\\mathbf{u} = P\\mathbf{w}$ for some $\\mathbf{w}$),",
        },
        {
          kind: "formula",
          latex: "\\mathbf{u}^{\\top}(\\mathbf{v}-P\\mathbf{v}) = (P\\mathbf{w})^{\\top}(\\mathbf{v}-P\\mathbf{v}) = \\mathbf{w}^{\\top}P^{\\top}(I-P)\\mathbf{v} = \\mathbf{w}^{\\top}P(I-P)\\mathbf{v} = \\mathbf{w}^{\\top}(P-P^2)\\mathbf{v} = 0",
          caption: "Symmetry ($P^{\\top}=P$) plus idempotence ($P^2=P$) forces $P - P^2 = 0$ in exactly this spot",
        },
        {
          kind: "prose",
          text: "So a symmetric idempotent matrix splits $\\mathbb{R}^n$ into its range and the orthogonal complement of its range, and sends every vector to its orthogonal shadow on the range — precisely the orthogonal projection built one vector at a time in `vector-projection`, now packaged as a single matrix that does it for every vector in $\\mathbb{R}^n$ at once. A non-symmetric idempotent matrix still projects, but obliquely — along a direction that is not perpendicular to the target.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "$I - P$ is idempotent too, and orthogonal to $P$",
          text: "If $P$ is symmetric idempotent, so is $I - P$: $(I-P)^2 = I - 2P + P^2 = I - 2P + P = I - P$. And $P(I-P) = P - P^2 = 0$ — the two projections annihilate each other, because they project onto orthogonal complementary subspaces. Their ranks add to $n$: $\\operatorname{rank}(P) + \\operatorname{rank}(I-P) = \\operatorname{tr}(P) + \\operatorname{tr}(I-P) = \\operatorname{tr}(I) = n$.",
        },
      ],
    },
    {
      heading: "The hat matrix is the working example",
      blocks: [
        {
          kind: "formula",
          latex: "H = X(X^{\\top}X)^{-1}X^{\\top}, \\qquad \\hat{\\mathbf{y}} = H\\mathbf{y}, \\qquad I - H \\text{ produces the residuals}",
          caption: "$X$ is $n\\times p$ of full column rank; $H$ is the orthogonal projector onto $C(X)$",
        },
        {
          kind: "example",
          title: "Verifying $H$ is symmetric and idempotent",
          problem: "Show $H = X(X^{\\top}X)^{-1}X^{\\top}$ satisfies $H^{\\top}=H$ and $H^2=H$.",
          steps: [
            "$H^{\\top} = X^{\\top\\top}\\big((X^{\\top}X)^{-1}\\big)^{\\top}X^{\\top} = X(X^{\\top}X)^{-1}X^{\\top} = H$, using that $(X^{\\top}X)^{-1}$ is itself symmetric.",
            "$H^2 = X(X^{\\top}X)^{-1}X^{\\top}X(X^{\\top}X)^{-1}X^{\\top}$.",
            "The middle $X^{\\top}X(X^{\\top}X)^{-1}$ collapses to the identity matrix $I_p$.",
            "What remains is $X \\cdot I_p \\cdot (X^{\\top}X)^{-1}X^{\\top} = X(X^{\\top}X)^{-1}X^{\\top} = H$.",
          ],
          answer:
            "$H^{\\top}=H$ and $H^2=H$: $H$ is a symmetric idempotent matrix, hence the orthogonal projector onto $C(X)$ — exactly the least-squares fit $\\hat{\\mathbf{y}}$ is defined to be.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Degrees of freedom is $\\operatorname{tr}(H)$",
          text: "$H$ is idempotent, so $\\operatorname{rank}(H) = \\operatorname{tr}(H)$. Since $H$ projects onto $C(X)$ and $X$ has full column rank $p$, $\\operatorname{rank}(H) = p$ — the number of estimated coefficients. \"Model degrees of freedom equals the number of parameters\" is not a separate fact bolted onto regression; it is $\\operatorname{tr}(H)=p$, read off the diagonal of a matrix that is idempotent for purely algebraic reasons. Symmetrically, $I-H$ is the complementary projector onto the orthogonal complement of $C(X)$, with $\\operatorname{tr}(I-H) = n-p$ — the *residual* degrees of freedom that divides $\\text{RSS}$ in $s^2 = \\text{RSS}/(n-p)$.",
        },
        {
          kind: "prose",
          text: "Because $H(I-H)=0$, the fitted values and the residuals are orthogonal: $\\hat{\\mathbf{y}}^{\\top}(\\mathbf{y}-\\hat{\\mathbf{y}}) = (H\\mathbf{y})^{\\top}(I-H)\\mathbf{y} = \\mathbf{y}^{\\top}H(I-H)\\mathbf{y} = 0$. This is the Pythagorean split $\\|\\mathbf{y}\\|^2 = \\|\\hat{\\mathbf{y}}\\|^2 + \\|\\mathbf{y}-\\hat{\\mathbf{y}}\\|^2$ behind the ANOVA decomposition $\\text{SST} = \\text{SSR} + \\text{SSE}$, and it is also why the residual sum of squares, written as the quadratic form $\\mathbf{\\varepsilon}^{\\top}(I-H)\\mathbf{\\varepsilon}$, has an exact chi-square distribution with $n-p$ degrees of freedom under normal errors — a quadratic form in a standard normal vector built from a rank-$(n-p)$ symmetric idempotent matrix is exactly the definition of $\\chi^2_{n-p}$, the same fact `distribution-of-beta-hat` and `quadratic-forms-random-vectors` use directly.",
        },
      ],
    },
    {
      heading: "Recognizing idempotence elsewhere",
      blocks: [
        {
          kind: "list",
          ordered: false,
          items: [
            "Leverage: the diagonal entries $h_{ii}$ of $H$ satisfy $0 \\le h_{ii} \\le 1$ — a direct consequence of $H$ being idempotent, since $h_{ii} = (H^2)_{ii} = \\sum_j h_{ij}^2 \\ge h_{ii}^2$, forcing $h_{ii}(1-h_{ii}) \\ge 0$.",
            "Centering matrix $C = I - \\tfrac{1}{n}\\mathbf{1}\\mathbf{1}^{\\top}$ (used to remove a mean before computing sample variance or PCA) is symmetric idempotent, projecting onto the subspace orthogonal to the all-ones vector; $\\operatorname{tr}(C) = n-1$ is exactly the divisor in the sample variance's degrees of freedom.",
            "Any orthogonal projection matrix built from an orthonormal basis $Q$ of a subspace, $P = QQ^{\\top}$, is automatically symmetric idempotent: $P^{\\top}=QQ^{\\top}=P$ and $P^2 = Q(Q^{\\top}Q)Q^{\\top} = QIQ^{\\top} = P$.",
            "In ANOVA and experimental design, every sum-of-squares term is $\\mathbf{y}^{\\top}A_i\\mathbf{y}$ for some symmetric idempotent $A_i$, and Cochran's theorem's independence and chi-square conclusions both key off $A_iA_j=0$ and idempotence exactly as above.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Idempotent does not mean invertible",
          text: "Only the identity matrix is both idempotent and invertible: if $P^2=P$ and $P^{-1}$ exists, multiply both sides by $P^{-1}$ to get $P=I$. Every other idempotent matrix is singular — it collapses the directions in its null space to zero, which is precisely what a projection is supposed to do. Don't reach for $P^{-1}$ when the actual object of interest is a projection's rank or trace.",
        },
      ],
    },
  ],
  references: [
    { source: "Strang, Introduction to Linear Algebra", locator: "§4.2 (projection matrices)" },
    { source: "MIT 18.06 (OpenCourseWare)", locator: "Lecture 15" },
    { source: "Mathlingo assessment bank", locator: "assessments/la-07-spectral-theory-and-special-matrices.md" },
    { source: "Mathlingo assessment bank", locator: "assessments/mp-02-quadratic-forms-and-regression.md (distribution-of-beta-hat)" },
  ],
};
