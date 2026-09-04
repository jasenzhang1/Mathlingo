import type { WikiArticle } from "../types";

export const cauchySchwarz: WikiArticle = {
  conceptId: "cauchy-schwarz",
  summary:
    "The Cauchy–Schwarz inequality bounds a dot product by the product of the lengths. It is what guarantees $\\cos\\theta$ stays in $[-1,1]$, what forces correlation into $[-1,1]$, and what proves the triangle inequality — three results that look unrelated and are one theorem.",
  sections: [
    {
      heading: "Statement",
      blocks: [
        {
          kind: "formula",
          latex: "|\\mathbf{u}\\cdot\\mathbf{v}| \\ \\le \\ \\|\\mathbf{u}\\|\\,\\|\\mathbf{v}\\|",
          caption: "Cauchy–Schwarz, with equality exactly when $\\mathbf{u}$ and $\\mathbf{v}$ are parallel",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why angle is well defined at all",
          text: "Rearranging gives $\\left|\\dfrac{\\mathbf{u}\\cdot\\mathbf{v}}{\\|\\mathbf{u}\\|\\|\\mathbf{v}\\|}\\right| \\le 1$, so that ratio is a legitimate cosine. Without the inequality, defining $\\theta = \\arccos(\\cdot)$ in $\\mathbb{R}^{784}$ would be meaningless — $\\arccos$ of a number outside $[-1,1]$ does not exist. Cauchy–Schwarz is what licenses the geometric reading of the dot product in every dimension.",
        },
        {
          kind: "prose",
          text: "The cleanest proof is a one-line observation. For any scalar $t$, $\\|\\mathbf{u} - t\\mathbf{v}\\|^{2} \\ge 0$, since norms are non-negative. Expanding gives a quadratic in $t$ that is never negative, so its discriminant cannot be positive — and that discriminant condition is exactly the inequality. Equality holds when the quadratic has a root, i.e. when $\\mathbf{u} = t\\mathbf{v}$ for some $t$.",
        },
      ],
    },
    {
      heading: "What it implies",
      blocks: [
        {
          kind: "table",
          headers: ["Setting", "Inner product", "Consequence"],
          rows: [
            [
              "$\\mathbb{R}^{n}$",
              "$\\sum u_i v_i$",
              "$|\\cos\\theta| \\le 1$",
            ],
            [
              "Random variables",
              "$\\mathbb{E}[XY]$",
              "$|\\rho_{XY}| \\le 1$ — correlation is bounded",
            ],
            [
              "Functions on $[a,b]$",
              "$\\int f g$",
              "$\\left|\\int fg\\right| \\le \\sqrt{\\int f^{2}}\\sqrt{\\int g^{2}}$",
            ],
            [
              "Sequences",
              "$\\sum a_n b_n$",
              "Hölder's inequality at $p = q = 2$",
            ],
          ],
        },
        {
          kind: "prose",
          text: "The correlation row is worth dwelling on. Applying Cauchy–Schwarz to the centred variables $X - \\mu_X$ and $Y - \\mu_Y$ under the inner product $\\langle A,B\\rangle = \\mathbb{E}[AB]$ gives $|\\operatorname{Cov}(X,Y)| \\le \\sigma_X\\sigma_Y$ — which is precisely the statement that $|\\rho| \\le 1$. The bound on correlation is not a separate fact about statistics; it is this inequality in a different inner product space.",
        },
      ],
    },
    {
      heading: "The triangle inequality",
      blocks: [
        {
          kind: "formula",
          latex: "\\|\\mathbf{u} + \\mathbf{v}\\|^{2} = \\|\\mathbf{u}\\|^{2} + 2(\\mathbf{u}\\cdot\\mathbf{v}) + \\|\\mathbf{v}\\|^{2} \\le \\|\\mathbf{u}\\|^{2} + 2\\|\\mathbf{u}\\|\\|\\mathbf{v}\\| + \\|\\mathbf{v}\\|^{2} = \\big(\\|\\mathbf{u}\\| + \\|\\mathbf{v}\\|\\big)^{2}",
          caption: "Cauchy–Schwarz applied to the cross term gives the triangle inequality",
        },
        {
          kind: "prose",
          text: "So $\\|\\mathbf{u}+\\mathbf{v}\\| \\le \\|\\mathbf{u}\\| + \\|\\mathbf{v}\\|$ — a detour is never shorter. The middle step is the only place any inequality is used, and it is Cauchy–Schwarz. This is why the triangle inequality holds in every inner product space automatically, rather than needing separate proof.",
        },
        {
          kind: "example",
          title: "Checking the bound",
          problem:
            "For $\\mathbf{u} = (1,2,2)$ and $\\mathbf{v} = (3,0,4)$, verify Cauchy–Schwarz and find how far from equality it is.",
          steps: [
            "$\\mathbf{u}\\cdot\\mathbf{v} = 3 + 0 + 8 = 11$.",
            "$\\|\\mathbf{u}\\|\\,\\|\\mathbf{v}\\| = 3 \\times 5 = 15$.",
            "$11 \\le 15$. ✓",
            "The ratio $11/15 \\approx 0.733$ is $\\cos\\theta$; equality would require the vectors to be parallel.",
          ],
          answer:
            "Satisfied, with slack because the vectors are about $42.8°$ apart rather than aligned.",
        },
      ],
    },
    {
      heading: "Where it does real work",
      blocks: [
        {
          kind: "list",
          ordered: false,
          items: [
            "**Bounding an unknown inner product** by quantities you can compute — the standard first move in analysis proofs.",
            "**The Cramér–Rao bound** is Cauchy–Schwarz applied to an estimator and the score function; the resulting constraint on their correlation *is* the variance floor.",
            "**Kernel methods** rely on it to guarantee that a kernel matrix behaves like a Gram matrix of inner products.",
            "**Matrix norms**: $\\|A\\mathbf{x}\\| \\le \\|A\\|\\,\\|\\mathbf{x}\\|$ is the operator-norm analogue, and it is what makes conditioning analysis possible.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "It is an inequality, not an estimate",
          text: "The bound can be extremely loose. For nearly orthogonal vectors the left side is near zero while the right side is large, so using Cauchy–Schwarz to *approximate* a dot product gives no useful answer. It is a guarantee about the worst case, and it is tight only in the parallel case — the same character as Markov's inequality in probability.",
        },
      ],
    },
  ],
  references: [
    { source: "Axler, Linear Algebra Done Right", locator: "Ch. 6A, Thm 6.15" },
    { source: "Strang, Introduction to Linear Algebra", locator: "§1.2" },
    { source: "Steele, The Cauchy–Schwarz Master Class", locator: "Ch. 1" },
    { source: "Mathlingo assessment bank", locator: "assessments/la-01-vectors-and-operations.md" },
  ],
};
