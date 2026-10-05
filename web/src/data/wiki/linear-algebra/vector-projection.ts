import type { WikiArticle } from "../types";

export const vectorProjection: WikiArticle = {
  conceptId: "vector-projection",
  summary:
    "Projecting $\\mathbf{b}$ onto $\\mathbf{a}$ finds the closest point to $\\mathbf{b}$ along the line through $\\mathbf{a}$. The defining property is that the error is orthogonal to the direction — and that single condition, generalised from a line to a subspace, is the whole of least squares.",
  sections: [
    {
      heading: "Projection onto a line",
      blocks: [
        {
          kind: "formula",
          latex: "\\operatorname{proj}_{\\mathbf{a}}\\mathbf{b} = \\frac{\\mathbf{a}\\cdot\\mathbf{b}}{\\mathbf{a}\\cdot\\mathbf{a}}\\,\\mathbf{a} = \\frac{\\mathbf{a}\\cdot\\mathbf{b}}{\\|\\mathbf{a}\\|^{2}}\\,\\mathbf{a}",
          caption: "The component of $\\mathbf{b}$ along $\\mathbf{a}$",
        },
        {
          kind: "prose",
          text: "The derivation is short and worth doing once. Write the projection as $\\hat{x}\\mathbf{a}$ for an unknown scalar. The error $\\mathbf{b} - \\hat{x}\\mathbf{a}$ must be orthogonal to $\\mathbf{a}$, so $\\mathbf{a}\\cdot(\\mathbf{b} - \\hat{x}\\mathbf{a}) = 0$, giving $\\hat{x} = (\\mathbf{a}\\cdot\\mathbf{b})/(\\mathbf{a}\\cdot\\mathbf{a})$.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Orthogonality is the definition, not a by-product",
          text: "“Closest point” and “error is perpendicular” are the same condition. Any other point on the line gives an error with a component along $\\mathbf{a}$, and removing that component strictly shortens it — by Pythagoras. So minimising distance and imposing orthogonality are two descriptions of one requirement, which is why least squares can be derived either by calculus or by geometry.",
        },
        {
          kind: "formula",
          latex: "\\mathbf{P} = \\frac{\\mathbf{a}\\mathbf{a}^{\\top}}{\\mathbf{a}^{\\top}\\mathbf{a}}, \\qquad \\operatorname{proj}_{\\mathbf{a}}\\mathbf{b} = \\mathbf{P}\\mathbf{b}",
          caption: "The projection matrix onto the line through $\\mathbf{a}$",
        },
      ],
    },
    {
      heading: "Projection matrices",
      blocks: [
        {
          kind: "table",
          headers: ["Property", "Statement", "Meaning"],
          rows: [
            ["Idempotent", "$\\mathbf{P}^{2} = \\mathbf{P}$", "projecting twice changes nothing"],
            ["Symmetric", "$\\mathbf{P}^{\\top} = \\mathbf{P}$", "the projection is orthogonal, not oblique"],
            ["Rank", "$\\operatorname{rank}(\\mathbf{P}) = \\dim$ of the target subspace", "1 for a line"],
            ["Complement", "$\\mathbf{I} - \\mathbf{P}$ projects onto the orthogonal complement", "gives the error vector"],
            ["Eigenvalues", "only 0 and 1", "1 on the subspace, 0 on its complement"],
          ],
        },
        {
          kind: "prose",
          text: "Idempotence is the algebraic signature. A matrix satisfying $\\mathbf{P}^{2} = \\mathbf{P}$ and $\\mathbf{P}^{\\top} = \\mathbf{P}$ *is* an orthogonal projection onto its column space — no further checking needed. The decomposition $\\mathbf{b} = \\mathbf{P}\\mathbf{b} + (\\mathbf{I}-\\mathbf{P})\\mathbf{b}$ splits any vector into a part in the subspace and a part orthogonal to it, uniquely.",
        },
      ],
    },
    {
      heading: "Onto a subspace",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbf{P} = \\mathbf{A}\\big(\\mathbf{A}^{\\top}\\mathbf{A}\\big)^{-1}\\mathbf{A}^{\\top}, \\qquad \\hat{\\mathbf{x}} = \\big(\\mathbf{A}^{\\top}\\mathbf{A}\\big)^{-1}\\mathbf{A}^{\\top}\\mathbf{b}",
          caption: "Projection onto the column space of $\\mathbf{A}$, when $\\mathbf{A}$ has independent columns",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "This is exactly linear regression",
          text: "Least squares solves $\\min_{\\boldsymbol{\\beta}}\\|\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta}\\|^{2}$ — find the point in the column space of $\\mathbf{X}$ closest to $\\mathbf{y}$. The normal equations $\\mathbf{X}^{\\top}\\mathbf{X}\\boldsymbol{\\beta} = \\mathbf{X}^{\\top}\\mathbf{y}$ are the orthogonality condition $\\mathbf{X}^{\\top}(\\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta}) = 0$ written out: the residuals are orthogonal to every predictor. Fitted values are $\\hat{\\mathbf{y}} = \\mathbf{P}\\mathbf{y}$, which is why $\\mathbf{P}$ is called the hat matrix.",
        },
        {
          kind: "example",
          title: "Projecting onto a line",
          problem: "Project $\\mathbf{b} = [4, 1]$ onto $\\mathbf{a} = [3, 4]$, and verify orthogonality.",
          steps: [
            "$\\mathbf{a}\\cdot\\mathbf{b} = 12 + 4 = 16$, and $\\mathbf{a}\\cdot\\mathbf{a} = 9 + 16 = 25$.",
            "$\\hat{x} = 16/25 = 0.64$.",
            "Projection: $0.64(3,4) = (1.92,\\ 2.56)$.",
            "Error: $\\mathbf{b} - \\operatorname{proj} = (4 - 1.92,\\ 1 - 2.56) = (2.08,\\ -1.56)$.",
            "Check: $[3, 4]\\cdot(2.08,-1.56) = 6.24 - 6.24 = 0$. ✓",
          ],
          answer: "$(1.92,\\ 2.56)$, with error orthogonal to $\\mathbf{a}$ as required.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "$(\\mathbf{A}^{\\top}\\mathbf{A})^{-1}$ needs independent columns",
          text: "If the columns of $\\mathbf{A}$ are linearly dependent — perfectly collinear predictors — then $\\mathbf{A}^{\\top}\\mathbf{A}$ is singular and the formula fails. The projection itself still exists and is unique; it is the *coefficients* that are not. Near-collinearity is worse in practice than exact collinearity: the inverse exists but is enormous, so coefficients become wildly unstable while the fitted values stay fine. This is what ridge regression and the pseudoinverse address.",
        },
      ],
    },
  ],
  references: [
    { source: "Strang, Introduction to Linear Algebra", locator: "§4.2–4.3" },
    { source: "Axler, Linear Algebra Done Right", locator: "Ch. 6C" },
    { source: "MIT 18.06 (OpenCourseWare)", locator: "Lectures 15–16" },
    { source: "Mathlingo assessment bank", locator: "assessments/la-01-vectors-and-operations.md" },
  ],
};
