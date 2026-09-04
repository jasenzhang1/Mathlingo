import type { WikiArticle } from "../types";

export const linearTransformations: WikiArticle = {
  conceptId: "linear-transformations",
  summary:
    "A linear transformation is a function that respects addition and scaling. That single restriction is what makes matrices possible: any such map is completely determined by what it does to a basis, so the entire function can be recorded in a finite table of numbers.",
  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "T(\\mathbf{u} + \\mathbf{v}) = T(\\mathbf{u}) + T(\\mathbf{v}), \\qquad T(c\\mathbf{u}) = c\\,T(\\mathbf{u})",
          caption: "Additivity and homogeneity — together, linearity",
        },
        {
          kind: "prose",
          text: "Equivalently, $T$ preserves linear combinations: $T(c_1\\mathbf{v}_1 + \\cdots + c_k\\mathbf{v}_k) = c_1T(\\mathbf{v}_1) + \\cdots + c_kT(\\mathbf{v}_k)$. Setting $c = 0$ forces $T(\\mathbf{0}) = \\mathbf{0}$, so any map moving the origin is not linear.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "$f(x) = mx + b$ is not linear",
          text: "It is *affine*. The constant $b$ breaks both conditions — $f(2x) \\ne 2f(x)$ unless $b = 0$. This clashes with the everyday use of \"linear\" for a straight line, and it matters: an affine map has no matrix in the usual sense. The standard fix is to append a coordinate of 1 and absorb $b$ into a larger matrix, which is exactly what the bias term in a neural network layer and homogeneous coordinates in graphics both do.",
        },
      ],
    },
    {
      heading: "Every linear map is a matrix",
      blocks: [
        {
          kind: "formula",
          latex: "A = \\begin{bmatrix} | & & | \\\\ T(\\mathbf{e}_1) & \\cdots & T(\\mathbf{e}_n) \\\\ | & & | \\end{bmatrix}, \\qquad T(\\mathbf{x}) = A\\mathbf{x}",
          caption: "Record the images of the basis vectors as columns",
        },
        {
          kind: "prose",
          text: "The argument is short. Write $\\mathbf{x} = \\sum_j x_j\\mathbf{e}_j$; linearity gives $T(\\mathbf{x}) = \\sum_j x_j T(\\mathbf{e}_j)$, which is precisely $A\\mathbf{x}$ with those images as columns. So a function on an infinite set of inputs is determined by $n$ vectors — the reason linear algebra is computable at all.",
        },
        {
          kind: "table",
          headers: ["Transformation", "Matrix in $\\mathbb{R}^{2}$", "Effect"],
          rows: [
            ["Rotation by $\\theta$", "$\\begin{bmatrix}\\cos\\theta & -\\sin\\theta\\\\ \\sin\\theta & \\cos\\theta\\end{bmatrix}$", "preserves lengths and angles"],
            ["Scaling by $c$", "$cI$", "uniform stretch"],
            ["Reflection in the $x$-axis", "$\\begin{bmatrix}1 & 0\\\\ 0 & -1\\end{bmatrix}$", "flips orientation"],
            ["Shear", "$\\begin{bmatrix}1 & k\\\\ 0 & 1\\end{bmatrix}$", "slides layers; preserves area"],
            ["Projection onto $x$-axis", "$\\begin{bmatrix}1 & 0\\\\ 0 & 0\\end{bmatrix}$", "collapses a dimension; not invertible"],
          ],
        },
      ],
    },
    {
      heading: "Kernel and image",
      blocks: [
        {
          kind: "formula",
          latex: "\\ker T = \\{\\mathbf{x} : T(\\mathbf{x}) = \\mathbf{0}\\}, \\qquad \\operatorname{im} T = \\{T(\\mathbf{x}) : \\mathbf{x} \\in \\mathbb{R}^{n}\\}",
          caption: "What gets crushed to zero, and what can be reached",
        },
        {
          kind: "prose",
          text: "These are the null space and column space of the matrix, under different names. The rank–nullity theorem $\\dim\\ker T + \\dim\\operatorname{im} T = n$ is then a conservation statement: every input dimension is either flattened or survives into the output.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Composition is matrix multiplication",
          text: "$(S \\circ T)(\\mathbf{x}) = S(T(\\mathbf{x}))$ corresponds to the product $BA$ — which is the entire reason matrix multiplication is defined as it is. Non-commutativity is then unsurprising: rotating then reflecting differs from reflecting then rotating, so the matrices must differ too.",
        },
        {
          kind: "example",
          title: "Building a matrix from a description",
          problem:
            "Find the matrix of the transformation that reflects $\\mathbb{R}^{2}$ across the line $y = x$.",
          steps: [
            "Where does $\\mathbf{e}_1 = (1,0)$ go? Reflecting across $y=x$ swaps coordinates: $(0,1)$.",
            "Where does $\\mathbf{e}_2 = (0,1)$ go? To $(1,0)$.",
            "Those images are the columns.",
          ],
          answer:
            "$A = \\begin{bmatrix} 0 & 1 \\\\ 1 & 0\\end{bmatrix}$. Note $A^{2} = I$ — reflecting twice returns you to the start, as it must.",
        },
      ],
    },
    {
      heading: "Why linearity is worth insisting on",
      blocks: [
        {
          kind: "prose",
          text: "Linear maps are the only ones with a finite exact representation, a complete theory of invertibility, and eigen-decompositions. That is why so much applied mathematics works by *linearising*: derivatives are the best linear approximation to a function, the delta method is a linear approximation to a transformation of an estimator, and a neural network is a stack of linear maps with non-linearities inserted precisely because a stack of purely linear maps would collapse into a single one.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "That last point is not a curiosity",
          text: "Composing linear layers gives $W_3W_2W_1\\mathbf{x}$, which is one matrix. Without activation functions a hundred-layer network has exactly the expressive power of a single layer. The non-linearity is not a refinement — it is the only thing making depth meaningful.",
        },
      ],
    },
  ],
  references: [
    { source: "Axler, Linear Algebra Done Right", locator: "Ch. 3A–3B" },
    { source: "Strang, Introduction to Linear Algebra", locator: "§8.1–8.2" },
    { source: "Mathlingo assessment bank", locator: "assessments/la-02-matrices-and-structure.md" },
  ],
};
