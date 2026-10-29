import type { WikiArticle } from "../types";

export const partialAndSemipartialCorrelationWiki: WikiArticle = {
  conceptId: "partial-and-semipartial-correlation",

  summary:
    "Once a second regressor is in the model, “how related is $X_1$ to $Y$?” has three different answers. The simple " +
    "correlation $\\rho_{y1}$ ignores $X_2$. The semipartial correlation removes $X_2$ from $X_1$ only. The partial " +
    "correlation removes $X_2$ from both. The standardized regression coefficient $\\beta_1$ is none of these, and the " +
    "gaps between them explain confounding (a coefficient shrinks when a control is added) and suppression (it grows, " +
    "even when the control is uncorrelated with $Y$).",

  sections: [
    {
      heading: "Three correlations as three angles",
      blocks: [
        {
          kind: "prose",
          text:
            "Centre and standardize $Y$, $X_1$, $X_2$ and treat them as unit vectors with $\\langle U, V\\rangle = \\text{Cov}(U, V)$, " +
            "so every correlation is the cosine of an angle. Write $\\tilde{X}_1$ for the residual of $X_1$ after regressing on $X_2$, " +
            "and $\\tilde{Y}$ for the residual of $Y$.",
        },
        {
          kind: "definitions",
          items: [
            { term: "Simple correlation", description: "$\\rho_{y1} = \\text{Corr}(Y, X_1)$: the raw angle between $Y$ and $X_1$." },
            { term: "Semipartial (part) correlation", description: "$r_{y(1\\cdot2)} = \\text{Corr}(Y, \\tilde{X}_1)$: only $X_1$ is cleaned of $X_2$. Its square is the gain in $R^2$ from adding $X_1$ last." },
            { term: "Partial correlation", description: "$r_{y1\\cdot2} = \\text{Corr}(\\tilde{Y}, \\tilde{X}_1)$: both are cleaned. Its square is the share of the variance left unexplained by $X_2$ that $X_1$ explains." },
          ],
        },
        {
          kind: "formula",
          latex:
            "r_{y(1\\cdot2)} = \\frac{\\rho_{y1} - \\rho_{12}\\rho_{y2}}{\\sqrt{1 - \\rho_{12}^2}}, \\qquad " +
            "r_{y1\\cdot2} = \\frac{\\rho_{y1} - \\rho_{12}\\rho_{y2}}{\\sqrt{(1 - \\rho_{12}^2)(1 - \\rho_{y2}^2)}}, \\qquad " +
            "\\beta_1 = \\frac{\\rho_{y1} - \\rho_{12}\\rho_{y2}}{1 - \\rho_{12}^2}",
          caption: "All three share the numerator $\\langle Y, \\tilde{X}_1\\rangle$; they differ only in what they divide by.",
        },
        {
          kind: "prose",
          text:
            "The partial correlation divides by $\\lVert\\tilde{Y}\\rVert = \\sqrt{1 - \\rho_{y2}^2} \\le 1$ instead of $\\lVert Y\\rVert = 1$, so " +
            "$|r_{y1\\cdot2}| \\ge |r_{y(1\\cdot2)}|$. The coefficient divides by $\\lVert\\tilde{X}_1\\rVert^2$ rather than $\\lVert\\tilde{X}_1\\rVert$: " +
            "a projection coefficient, not a cosine. That is why $\\beta_1$ can exceed $1$ in magnitude, and why it equals a correlation " +
            "only when $\\rho_{12} = 0$.",
        },
      ],
    },

    {
      heading: "Confounding and suppression",
      blocks: [
        {
          kind: "prose",
          text:
            "Comparing the short coefficient $\\rho_{y1}$ (regress on $X_1$ alone) with the long one $\\beta_1$: " +
            "$\\rho_{y1} - \\beta_1 = \\beta_2\\rho_{12}$, the omitted-variable formula. When $X_2$ explains part of the $X_1$–$Y$ link, " +
            "the coefficient shrinks (confounding). When $X_2$ explains the part of $X_1$ that is irrelevant to $Y$, " +
            "removing it sharpens $X_1$ and the coefficient grows (suppression).",
        },
        {
          kind: "example",
          title: "A suppressor uncorrelated with Y",
          problem:
            "Standardized variables have $\\rho_{y1} = 0.4$, $\\rho_{y2} = 0$, $\\rho_{12} = 0.6$. Find $\\beta_1$, $\\beta_2$, the semipartial correlation $r_{y(1\\cdot2)}$, and $R^2$ with and without $X_2$.",
          steps: [
            "$\\beta_1 = \\frac{0.4 - 0.6 \\cdot 0}{1 - 0.36} = 0.625$ and $\\beta_2 = \\frac{0 - 0.6 \\cdot 0.4}{0.64} = -0.375$.",
            "$r_{y(1\\cdot2)} = \\frac{0.4}{\\sqrt{0.64}} = 0.5$, and since $\\rho_{y2} = 0$ the partial correlation is also $0.5$.",
            "Alone, $R^2 = \\rho_{y1}^2 = 0.16$. Together, $R^2 = \\beta_1\\rho_{y1} + \\beta_2\\rho_{y2} = 0.25 = \\rho_{y2}^2 + r_{y(1\\cdot2)}^2$.",
          ],
          answer:
            "Adding a variable with zero correlation with $Y$ raises $R^2$ from $0.16$ to $0.25$ and the $X_1$ coefficient from $0.4$ to $0.625$: $X_2$ removes noise from $X_1$.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Do not screen regressors by their correlation with y",
          text:
            "A suppressor looks useless on its own ($\\rho_{y2} = 0$) and is exactly the kind of variable a univariate screen throws away. Forward stepwise selection can miss suppressor pairs for the same reason.",
        },
      ],
    },

    {
      heading: "R² as a Pythagorean sum",
      blocks: [
        {
          kind: "formula",
          latex: "R^2 = \\rho_{y1}^2 + r_{y(2\\cdot1)}^2 = \\rho_{y2}^2 + r_{y(1\\cdot2)}^2",
          caption: "Projecting $Y$ onto the orthogonal basis $(X_1, \\tilde{X}_2)$ of the same plane.",
        },
        {
          kind: "prose",
          text:
            "Enter $X_1$ first and it contributes $\\rho_{y1}^2$; the orthogonalized $\\tilde{X}_2$ then adds the squared semipartial correlation. " +
            "This is the sequential (Type I) sum of squares of ANOVA: the pieces depend on the order of entry, the total does not. " +
            "The same algebra bounds what two signals can achieve together: the $3 \\times 3$ correlation matrix must be positive semidefinite, " +
            "so $1 + 2\\rho_{12}\\rho_{y1}\\rho_{y2} - \\rho_{12}^2 - \\rho_{y1}^2 - \\rho_{y2}^2 \\ge 0$.",
        },
        {
          kind: "table",
          headers: ["Quantity", "Cleans X₁ of X₂?", "Cleans Y of X₂?", "Divides by"],
          rows: [
            ["$\\rho_{y1}$", "No", "No", "$\\lVert X_1\\rVert\\,\\lVert Y\\rVert$"],
            ["$r_{y(1\\cdot2)}$", "Yes", "No", "$\\lVert\\tilde{X}_1\\rVert\\,\\lVert Y\\rVert$"],
            ["$r_{y1\\cdot2}$", "Yes", "Yes", "$\\lVert\\tilde{X}_1\\rVert\\,\\lVert\\tilde{Y}\\rVert$"],
            ["$\\beta_1$", "Yes", "Either", "$\\lVert\\tilde{X}_1\\rVert^2$"],
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Cohen, Cohen, West & Aiken, Applied Multiple Regression/Correlation Analysis (3rd ed.)", locator: "Ch. 3, Multiple Regression/Correlation with Two or More Independent Variables" },
    { source: "Seber & Lee, Linear Regression Analysis (2nd ed.)", locator: "§3.7, Introducing Further Explanatory Variables" },
  ],
};
