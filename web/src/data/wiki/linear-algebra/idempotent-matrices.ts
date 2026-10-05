import type { WikiArticle } from "../types";

export const idempotentMatrices: WikiArticle = {
  conceptId: "idempotent-matrices",
  summary:
    "An idempotent matrix does nothing new the second time it acts: $\\mathbf{P}^2 = \\mathbf{P}$. Applying $\\mathbf{P}$ once moves a vector somewhere; applying it again leaves that result exactly where it was. That single algebraic condition forces every eigenvalue to be $0$ or $1$, forces the trace to equal the rank, and — when $\\mathbf{P}$ is also symmetric — forces $\\mathbf{P}$ to be an orthogonal projection onto its own column space. The hat matrix of a linear model, $\\mathbf{H} = X(\\mathbf{X}^{\\top}\\mathbf{X})^{-1}\\mathbf{X}^{\\top}$, is exactly such a matrix, and its idempotence is the single fact underneath degrees of freedom, the geometry of residuals, and the exact distribution of the residual sum of squares.",
  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbf{P} \\in \\mathbb{R}^{n\\times n} \\text{ is idempotent} \\iff \\mathbf{P}^2 = \\mathbf{P}",
          caption: "Applying $\\mathbf{P}$ twice is the same as applying it once",
        },
        {
          kind: "prose",
          text: "This is a purely algebraic condition — it says nothing about symmetry. $\\mathbf{P} = \\begin{bmatrix}1&1\\\\0&0\\end{bmatrix}$ satisfies $\\mathbf{P}^2=\\mathbf{P}$ but is not symmetric; it is an *oblique* projection, one that projects along a direction that is not orthogonal to the target subspace. The overwhelming majority of idempotent matrices you meet in statistics and machine learning are symmetric as well, and that extra condition is doing real work — see below.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Idempotent = “already at a fixed point”",
          text: "For any vector $\\mathbf{v}$, $\\mathbf{P}\\mathbf{v}$ is a fixed point of $\\mathbf{P}$: $P(\\mathbf{P}\\mathbf{v}) = \\mathbf{P}\\mathbf{v}$. So the range of $\\mathbf{P}$ is exactly its set of fixed points. This is the algebraic signature of a *projection* onto that range — geometrically, projecting something that is already in the target subspace should leave it untouched, and idempotence is precisely that requirement written as an equation.",
        },
      ],
    },
    {
      heading: "Eigenvalues are forced to be 0 or 1",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbf{P}\\mathbf{v} = \\lambda\\mathbf{v} \\;\\Rightarrow\\; \\mathbf{P}^2\\mathbf{v} = \\lambda^2\\mathbf{v} = \\mathbf{P}\\mathbf{v} = \\lambda\\mathbf{v} \\;\\Rightarrow\\; \\lambda^2 = \\lambda \\;\\Rightarrow\\; \\lambda \\in \\{0,1\\}",
          caption: "Every eigenvalue of an idempotent matrix satisfies $\\lambda^2=\\lambda$",
        },
        {
          kind: "prose",
          text: "There is no third option. A matrix that scales anything by $0.5$ or by $-1$ cannot be idempotent, because applying it twice would scale by $0.25$ or $1$ — not reproduce the first application. The eigenvectors with $\\lambda=1$ span exactly the range of $\\mathbf{P}$ (the subspace it projects *onto*); the eigenvectors with $\\lambda=0$ span exactly the null space of $\\mathbf{P}$ (the subspace it projects *along* or *out of*).",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Trace equals rank",
          text: "The trace of any square matrix is the sum of its eigenvalues. For an idempotent matrix that sum only ever adds $0$s and $1$s, so $\\operatorname{tr}(\\mathbf{P})$ is exactly the *count* of unit eigenvalues — which is the dimension of the range, i.e. $\\operatorname{rank}(\\mathbf{P})$. So $\\operatorname{tr}(\\mathbf{P}) = \\operatorname{rank}(\\mathbf{P})$ for every idempotent matrix, and this integer is computable by simply summing the diagonal — no eigendecomposition required.",
        },
      ],
    },
    {
      heading: "Symmetric + idempotent = orthogonal projection",
      blocks: [
        {
          kind: "prose",
          text: "Idempotence alone only guarantees $\\mathbf{P}$ reproduces its own range. Adding symmetry ($\\mathbf{P} = \\mathbf{P}^{\\top}$) pins down *how* it gets there: for any $\\mathbf{v}$, decompose $\\mathbf{v} = \\mathbf{P}\\mathbf{v} + (\\mathbf{v} - \\mathbf{P}\\mathbf{v})$. The second piece is orthogonal to the range of $\\mathbf{P}$, because for any $\\mathbf{u}$ in that range (so $\\mathbf{u} = \\mathbf{P}\\mathbf{w}$ for some $\\mathbf{w}$),",
        },
        {
          kind: "formula",
          latex: "\\mathbf{u}^{\\top}(\\mathbf{v}-\\mathbf{P}\\mathbf{v}) = (\\mathbf{P}\\mathbf{w})^{\\top}(\\mathbf{v}-\\mathbf{P}\\mathbf{v}) = \\mathbf{w}^{\\top}\\mathbf{P}^{\\top}(\\mathbf{I}-\\mathbf{P})\\mathbf{v} = \\mathbf{w}^{\\top}P(\\mathbf{I}-\\mathbf{P})\\mathbf{v} = \\mathbf{w}^{\\top}(\\mathbf{P}-\\mathbf{P}^2)\\mathbf{v} = 0",
          caption: "Symmetry ($\\mathbf{P}^{\\top}=\\mathbf{P}$) plus idempotence ($\\mathbf{P}^2=\\mathbf{P}$) forces $\\mathbf{P} - \\mathbf{P}^2 = 0$ in exactly this spot",
        },
        {
          kind: "prose",
          text: "So a symmetric idempotent matrix splits $\\mathbb{R}^n$ into its range and the orthogonal complement of its range, and sends every vector to its orthogonal shadow on the range — precisely the orthogonal projection built one vector at a time in `vector-projection`, now packaged as a single matrix that does it for every vector in $\\mathbb{R}^n$ at once. A non-symmetric idempotent matrix still projects, but obliquely — along a direction that is not perpendicular to the target.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "$\\mathbf{I} - \\mathbf{P}$ is idempotent too, and orthogonal to $\\mathbf{P}$",
          text: "If $\\mathbf{P}$ is symmetric idempotent, so is $\\mathbf{I} - \\mathbf{P}$: $(\\mathbf{I}-\\mathbf{P})^2 = \\mathbf{I} - 2\\mathbf{P} + \\mathbf{P}^2 = \\mathbf{I} - 2\\mathbf{P} + \\mathbf{P} = \\mathbf{I} - \\mathbf{P}$. And $P(\\mathbf{I}-\\mathbf{P}) = \\mathbf{P} - \\mathbf{P}^2 = 0$ — the two projections annihilate each other, because they project onto orthogonal complementary subspaces. Their ranks add to $n$: $\\operatorname{rank}(\\mathbf{P}) + \\operatorname{rank}(\\mathbf{I}-\\mathbf{P}) = \\operatorname{tr}(\\mathbf{P}) + \\operatorname{tr}(\\mathbf{I}-\\mathbf{P}) = \\operatorname{tr}(\\mathbf{I}) = n$.",
        },
      ],
    },
    {
      heading: "The hat matrix is the working example",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbf{H} = X(\\mathbf{X}^{\\top}\\mathbf{X})^{-1}\\mathbf{X}^{\\top}, \\qquad \\hat{\\mathbf{y}} = \\mathbf{H}\\mathbf{y}, \\qquad \\mathbf{I} - \\mathbf{H} \\text{ produces the residuals}",
          caption: "$\\mathbf{X}$ is $n\\times p$ of full column rank; $\\mathbf{H}$ is the orthogonal projector onto $C(\\mathbf{X})$",
        },
        {
          kind: "example",
          title: "Verifying $\\mathbf{H}$ is symmetric and idempotent",
          problem: "Show $\\mathbf{H} = X(\\mathbf{X}^{\\top}\\mathbf{X})^{-1}\\mathbf{X}^{\\top}$ satisfies $\\mathbf{H}^{\\top}=\\mathbf{H}$ and $\\mathbf{H}^2=\\mathbf{H}$.",
          steps: [
            "$\\mathbf{H}^{\\top} = \\mathbf{X}^{\\top\\top}\\big((\\mathbf{X}^{\\top}\\mathbf{X})^{-1}\\big)^{\\top}\\mathbf{X}^{\\top} = X(\\mathbf{X}^{\\top}\\mathbf{X})^{-1}\\mathbf{X}^{\\top} = \\mathbf{H}$, using that $(\\mathbf{X}^{\\top}\\mathbf{X})^{-1}$ is itself symmetric.",
            "$\\mathbf{H}^2 = X(\\mathbf{X}^{\\top}\\mathbf{X})^{-1}\\mathbf{X}^{\\top}X(\\mathbf{X}^{\\top}\\mathbf{X})^{-1}\\mathbf{X}^{\\top}$.",
            "The middle $\\mathbf{X}^{\\top}X(\\mathbf{X}^{\\top}\\mathbf{X})^{-1}$ collapses to the identity matrix $\\mathbf{I}_p$.",
            "What remains is $\\mathbf{X} \\cdot \\mathbf{I}_p \\cdot (\\mathbf{X}^{\\top}\\mathbf{X})^{-1}\\mathbf{X}^{\\top} = X(\\mathbf{X}^{\\top}\\mathbf{X})^{-1}\\mathbf{X}^{\\top} = \\mathbf{H}$.",
          ],
          answer:
            "$\\mathbf{H}^{\\top}=\\mathbf{H}$ and $\\mathbf{H}^2=\\mathbf{H}$: $\\mathbf{H}$ is a symmetric idempotent matrix, hence the orthogonal projector onto $C(\\mathbf{X})$ — exactly the least-squares fit $\\hat{\\mathbf{y}}$ is defined to be.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Degrees of freedom is $\\operatorname{tr}(\\mathbf{H})$",
          text: "$\\mathbf{H}$ is idempotent, so $\\operatorname{rank}(\\mathbf{H}) = \\operatorname{tr}(\\mathbf{H})$. Since $\\mathbf{H}$ projects onto $C(\\mathbf{X})$ and $\\mathbf{X}$ has full column rank $p$, $\\operatorname{rank}(\\mathbf{H}) = p$ — the number of estimated coefficients. “Model degrees of freedom equals the number of parameters” is not a separate fact bolted onto regression; it is $\\operatorname{tr}(\\mathbf{H})=p$, read off the diagonal of a matrix that is idempotent for purely algebraic reasons. Symmetrically, $\\mathbf{I}-\\mathbf{H}$ is the complementary projector onto the orthogonal complement of $C(\\mathbf{X})$, with $\\operatorname{tr}(\\mathbf{I}-\\mathbf{H}) = n-p$ — the *residual* degrees of freedom that divides $\\text{RSS}$ in $s^2 = \\text{RSS}/(n-p)$.",
        },
        {
          kind: "prose",
          text: "Because $H(\\mathbf{I}-\\mathbf{H})=0$, the fitted values and the residuals are orthogonal: $\\hat{\\mathbf{y}}^{\\top}(\\mathbf{y}-\\hat{\\mathbf{y}}) = (\\mathbf{H}\\mathbf{y})^{\\top}(\\mathbf{I}-\\mathbf{H})\\mathbf{y} = \\mathbf{y}^{\\top}H(\\mathbf{I}-\\mathbf{H})\\mathbf{y} = 0$. This is the Pythagorean split $\\|\\mathbf{y}\\|^2 = \\|\\hat{\\mathbf{y}}\\|^2 + \\|\\mathbf{y}-\\hat{\\mathbf{y}}\\|^2$ behind the ANOVA decomposition $\\text{SST} = \\text{SSR} + \\text{SSE}$, and it is also why the residual sum of squares, written as the quadratic form $\\mathbf{\\varepsilon}^{\\top}(\\mathbf{I}-\\mathbf{H})\\mathbf{\\varepsilon}$, has an exact chi-square distribution with $n-p$ degrees of freedom under normal errors — a quadratic form in a standard normal vector built from a rank-$(n-p)$ symmetric idempotent matrix is exactly the definition of $\\chi^2_{n-p}$, the same fact `distribution-of-beta-hat` and `quadratic-forms-random-vectors` use directly.",
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
            "Leverage: the diagonal entries $h_{ii}$ of $\\mathbf{H}$ satisfy $0 \\le h_{ii} \\le 1$ — a direct consequence of $\\mathbf{H}$ being idempotent, since $h_{ii} = (\\mathbf{H}^2)_{ii} = \\sum_j h_{ij}^2 \\ge h_{ii}^2$, forcing $h_{ii}(1-h_{ii}) \\ge 0$.",
            "Centering matrix $C = \\mathbf{I} - \\tfrac{1}{n}\\mathbf{1}\\mathbf{1}^{\\top}$ (used to remove a mean before computing sample variance or PCA) is symmetric idempotent, projecting onto the subspace orthogonal to the all-ones vector; $\\operatorname{tr}(C) = n-1$ is exactly the divisor in the sample variance's degrees of freedom.",
            "Any orthogonal projection matrix built from an orthonormal basis $Q$ of a subspace, $\\mathbf{P} = QQ^{\\top}$, is automatically symmetric idempotent: $\\mathbf{P}^{\\top}=QQ^{\\top}=\\mathbf{P}$ and $\\mathbf{P}^2 = Q(Q^{\\top}Q)Q^{\\top} = QIQ^{\\top} = \\mathbf{P}$.",
            "In ANOVA and experimental design, every sum-of-squares term is $\\mathbf{y}^{\\top}A_i\\mathbf{y}$ for some symmetric idempotent $A_i$, and Cochran's theorem's independence and chi-square conclusions both key off $A_iA_j=0$ and idempotence exactly as above.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Idempotent does not mean invertible",
          text: "Only the identity matrix is both idempotent and invertible: if $\\mathbf{P}^2=\\mathbf{P}$ and $\\mathbf{P}^{-1}$ exists, multiply both sides by $\\mathbf{P}^{-1}$ to get $\\mathbf{P}=\\mathbf{I}$. Every other idempotent matrix is singular — it collapses the directions in its null space to zero, which is precisely what a projection is supposed to do. Don't reach for $\\mathbf{P}^{-1}$ when the actual object of interest is a projection's rank or trace.",
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
