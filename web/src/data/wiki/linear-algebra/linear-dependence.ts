import type { WikiArticle } from "../types";

export const linearDependence: WikiArticle = {
  conceptId: "linear-dependence",
  summary:
    "A set of vectors is linearly dependent when one of them is redundant — expressible as a combination of the others. Independence is the absence of that redundancy, and it is the property that makes representations unique, bases well defined, and regression coefficients interpretable.",
  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "c_1\\mathbf{v}_1 + c_2\\mathbf{v}_2 + \\cdots + c_k\\mathbf{v}_k = \\mathbf{0} \\ \\Longrightarrow \\ c_1 = c_2 = \\cdots = c_k = 0",
          caption: "Linear independence — only the trivial combination gives zero",
        },
        {
          kind: "prose",
          text: "Dependence is the negation: some combination with *not all* coefficients zero produces $\\mathbf{0}$. Rearranging such a combination expresses one vector in terms of the others, which is the redundancy made explicit.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Independence is a property of the set, not of pairs",
          text: "Three vectors can be pairwise non-parallel and still dependent — $(1,0)$, $(0,1)$, $(1,1)$ in $\\mathbb{R}^{2}$, where the third is the sum of the first two. Checking pairs is not enough, exactly as it was not enough for mutual independence of events. The condition quantifies over all combinations at once.",
        },
      ],
    },
    {
      heading: "How to check",
      blocks: [
        {
          kind: "prose",
          text: "Put the vectors in the columns of a matrix $A$ and ask whether $A\\mathbf{c} = \\mathbf{0}$ has a non-zero solution. Three equivalent answers:",
        },
        {
          kind: "table",
          headers: ["Test", "Independent when", "Note"],
          rows: [
            ["Null space", "$N(A) = \\{\\mathbf{0}\\}$", "the definition, restated"],
            ["Rank", "$\\operatorname{rank}(A) = k$ (full column rank)", "usually the practical test"],
            ["Row reduction", "every column has a pivot", "how it is computed by hand"],
            [
              "Determinant",
              "$\\det(A) \\neq 0$",
              "**only for square $A$** — $k$ vectors in $\\mathbb{R}^{k}$",
            ],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "More vectors than dimensions is automatically dependent",
          text: "Any $k > n$ vectors in $\\mathbb{R}^{n}$ must be dependent — there are more unknowns than equations, so $A\\mathbf{c} = \\mathbf{0}$ has a non-trivial solution by counting alone. Three vectors in $\\mathbb{R}^{2}$ can never be independent, whatever they are. This is why a dataset with more predictors than observations always has collinear columns, and why $p > n$ regression has no unique least-squares solution.",
        },
        {
          kind: "example",
          title: "Detecting dependence",
          problem:
            "Are $(1,2,3)$, $(2,4,6)$, and $(1,0,1)$ independent?",
          steps: [
            "Notice $(2,4,6) = 2(1,2,3)$ — the second is a multiple of the first.",
            "So $2\\mathbf{v}_1 - \\mathbf{v}_2 + 0\\mathbf{v}_3 = \\mathbf{0}$ with coefficients not all zero.",
            "Dependent, and the third vector was irrelevant to the conclusion.",
          ],
          answer:
            "Dependent. The set spans only a 2-dimensional subspace, so its rank is 2 rather than 3.",
        },
      ],
    },
    {
      heading: "Why it matters",
      blocks: [
        {
          kind: "formula",
          latex: "\\text{independent} \\iff \\text{every vector in the span has a } \\textbf{unique} \\text{ representation}",
          caption: "The property that makes coordinates meaningful",
        },
        {
          kind: "prose",
          text: "If a set is dependent, some vector in its span can be written as a combination in more than one way — so \"the coefficients\" is not well defined. Independence is precisely what rules that out, and it is why a basis must be independent: coordinates would otherwise be ambiguous.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Near-dependence is the practical problem",
          text: "Exact collinearity is rare in real data and easy to detect. Vectors that are *nearly* dependent are common and far more damaging: $A^{\\top}A$ is technically invertible but ill-conditioned, so coefficients swing wildly with tiny data changes while predictions stay stable. Height in centimetres and height in inches, entered as separate predictors, is exactly this. The variance inflation factor measures it, and ridge regression is the standard remedy.",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "**In regression**, collinear predictors make individual coefficients uninterpretable — the model cannot attribute an effect between two variables carrying the same information.",
            "**In dimensionality reduction**, dependence is what makes reduction possible: PCA finds that the data occupy a lower-dimensional subspace than the number of columns suggests.",
            "**Any orthogonal set of non-zero vectors is independent** — a useful shortcut, since orthogonality is often easier to verify.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Strang, Introduction to Linear Algebra", locator: "§3.4" },
    { source: "Axler, Linear Algebra Done Right", locator: "Ch. 2A" },
    { source: "Mathlingo assessment bank", locator: "assessments/la-03-vector-spaces-and-bases.md" },
  ],
};
