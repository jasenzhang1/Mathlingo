import type { WikiArticle } from "../types";

export const vectorAngles: WikiArticle = {
  conceptId: "vector-angles",
  summary:
    "The angle between two vectors is recovered from the dot product: $\\cos\\theta = \\dfrac{\\mathbf{u}\\cdot\\mathbf{v}}{\\|\\mathbf{u}\\|\\|\\mathbf{v}\\|}$. Cauchy–Schwarz is what makes this a legal cosine in every dimension, and the same formula is, under a different inner product, exactly the definition of correlation.",
  sections: [
    {
      heading: "The formula",
      blocks: [
        {
          kind: "formula",
          latex: "\\cos\\theta = \\frac{\\mathbf{u}\\cdot\\mathbf{v}}{\\|\\mathbf{u}\\|\\,\\|\\mathbf{v}\\|}",
          caption: "Solving the geometric dot-product formula for the angle",
        },
        {
          kind: "prose",
          text: "This comes directly from rearranging $\\mathbf{u}\\cdot\\mathbf{v} = \\|\\mathbf{u}\\|\\|\\mathbf{v}\\|\\cos\\theta$. It works in $\\mathbb{R}^2$ and $\\mathbb{R}^3$, where $\\theta$ is a picture you can draw, and it works exactly the same way in $\\mathbb{R}^{100}$, where it isn't. The formula is what *defines* angle once dimension gets too high to see.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why this is guaranteed to be a valid cosine",
          text: "A cosine must lie in $[-1,1]$, and nothing about the formula $\\dfrac{\\mathbf{u}\\cdot\\mathbf{v}}{\\|\\mathbf{u}\\|\\|\\mathbf{v}\\|}$ obviously stays in that range on its own. The guarantee is `cauchy-schwarz`: $|\\mathbf{u}\\cdot\\mathbf{v}| \\le \\|\\mathbf{u}\\|\\|\\mathbf{v}\\|$, so dividing both sides by $\\|\\mathbf{u}\\|\\|\\mathbf{v}\\|$ gives exactly $\\left|\\dfrac{\\mathbf{u}\\cdot\\mathbf{v}}{\\|\\mathbf{u}\\|\\|\\mathbf{v}\\|}\\right| \\le 1$. Without Cauchy–Schwarz, there would be no reason $\\arccos$ of that ratio should exist at all — it is the inequality, not the geometry, that licenses the formula in arbitrary dimensions.",
        },
      ],
    },
    {
      heading: "Reading the sign and size of the angle",
      blocks: [
        {
          kind: "table",
          headers: ["$\\cos\\theta$", "$\\theta$", "Meaning"],
          rows: [
            ["$1$", "$0°$", "same direction (parallel)"],
            ["$0 < \\cos\\theta < 1$", "$0° < \\theta < 90°$", "broadly aligned"],
            ["$0$", "$90°$", "orthogonal"],
            ["$-1 < \\cos\\theta < 0$", "$90° < \\theta < 180°$", "broadly opposed"],
            ["$-1$", "$180°$", "opposite direction"],
          ],
        },
        {
          kind: "example",
          title: "Two worked angles",
          problem:
            "Find the angle between $\\mathbf{u} = (1,0)$ and $\\mathbf{v} = (1,1)$, and between $\\mathbf{a} = (2,0,0)$ and $\\mathbf{b} = (1,1,1)$.",
          steps: [
            "$\\mathbf{u}\\cdot\\mathbf{v} = 1$, $\\|\\mathbf{u}\\| = 1$, $\\|\\mathbf{v}\\| = \\sqrt2$, so $\\cos\\theta = 1/\\sqrt2$, giving $\\theta = 45°$.",
            "$\\mathbf{a}\\cdot\\mathbf{b} = 2$, $\\|\\mathbf{a}\\| = 2$, $\\|\\mathbf{b}\\| = \\sqrt3$, so $\\cos\\theta = 2/(2\\sqrt3) = 1/\\sqrt3 \\approx 0.577$.",
            "$\\theta = \\arccos(0.577) \\approx 54.7°$.",
          ],
          answer: "$45°$ and about $54.7°$.",
        },
      ],
    },
    {
      heading: "The correlation connection",
      blocks: [
        {
          kind: "prose",
          text: "Nothing in the derivation of $\\cos\\theta = \\mathbf{u}\\cdot\\mathbf{v}/(\\|\\mathbf{u}\\|\\|\\mathbf{v}\\|)$ used coordinates specifically — it only used that an inner product $\\langle \\cdot,\\cdot\\rangle$ exists, together with the induced norm $\\|\\mathbf{w}\\| = \\sqrt{\\langle \\mathbf{w},\\mathbf{w}\\rangle}$. Random variables have exactly this structure once they're centered.",
        },
        {
          kind: "formula",
          latex: "\\langle X,Y\\rangle := \\operatorname{Cov}(X,Y), \\quad \\|X\\| := \\sqrt{\\operatorname{Var}(X)} = \\sigma_X",
          caption: "Covariance as an inner product on centered random variables",
        },
        {
          kind: "formula",
          latex: "\\cos\\theta = \\frac{\\langle X,Y\\rangle}{\\|X\\|\\,\\|Y\\|} = \\frac{\\operatorname{Cov}(X,Y)}{\\sigma_X\\sigma_Y} = \\rho_{XY}",
          caption: "Substituting the statistical inner product reproduces Pearson correlation exactly",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Not an analogy — the same equation",
          text: "Every symbol lines up: covariance plays the role of the dot product, standard deviation plays the role of norm, and $\\rho$ plays the role of $\\cos\\theta$. `cauchy-schwarz` applied to this inner product is exactly the classical proof that $|\\rho| \\le 1$. Correlation *is* the cosine of the angle between two centered random variables — the geometry and the statistics are the identical theorem viewed through two different vocabularies.",
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
            "**Cosine similarity** in search, recommendation, and NLP is $\\cos\\theta$ between two feature vectors — dividing out the norms so that a long document isn't automatically judged \"more similar\" to everything just because its word counts are larger.",
            "**Physical work** $W = \\mathbf{F}\\cdot\\mathbf{d} = \\|\\mathbf{F}\\|\\|\\mathbf{d}\\|\\cos\\theta$ vanishes at $\\theta = 90°$ regardless of how large the force or displacement are — carrying a heavy box at constant height does zero work because gravity is perpendicular to the motion.",
            "**PCA** chooses directions to minimize the angle between data points and the retained axes, equivalently maximizing $\\cos^2\\theta$ summed over the data.",
            "**Correlation and regression**: the angle between a predictor and the response vector, after centering, determines $R^2$ in simple linear regression — $R^2 = \\rho^2 = \\cos^2\\theta$.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Angle is undefined for the zero vector",
          text: "$\\cos\\theta$ divides by $\\|\\mathbf{u}\\|\\|\\mathbf{v}\\|$, so the \"angle to the zero vector\" is not a meaningful quantity — the zero vector has no direction to measure from. Any claim like \"the zero vector is orthogonal to everything\" is a convention about the dot product being zero, not a statement that a $90°$ angle has been measured.",
        },
      ],
    },
  ],
  references: [
    { source: "Strang, Introduction to Linear Algebra", locator: "§1.2" },
    { source: "Axler, Linear Algebra Done Right", locator: "Ch. 6A" },
    { source: "Mathlingo assessment bank", locator: "assessments/la-01-vectors-and-operations.md" },
  ],
};
