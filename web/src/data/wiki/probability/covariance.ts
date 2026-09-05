import type { WikiArticle } from "../types";

export const covariance: WikiArticle = {
  conceptId: "covariance",
  summary:
    "Covariance measures whether two random variables tend to deviate from their means in the same direction. Its sign is interpretable; its magnitude is not, because it carries the units of both variables — which is why correlation, the scale-free version, is usually what gets reported.",
  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "\\operatorname{Cov}(X, Y) = \\mathbb{E}\\big[(X - \\mu_X)(Y - \\mu_Y)\\big] = \\mathbb{E}[XY] - \\mathbb{E}[X]\\,\\mathbb{E}[Y]",
          caption: "Covariance, in definitional and computing form",
        },
        {
          kind: "prose",
          text: "Read the product inside the expectation. When both variables are above their means, or both below, the product is positive. When one is above and the other below, it is negative. Covariance averages these products, so it is positive when the variables move together and negative when they move oppositely.",
        },
        {
          kind: "prose",
          text: "Note that $\\operatorname{Cov}(X, X) = \\operatorname{Var}(X)$ — variance is the special case of a variable with itself, which is why variance and covariance obey such similar algebra.",
        },
      ],
    },
    {
      heading: "Properties",
      blocks: [
        {
          kind: "table",
          headers: ["Property", "Statement"],
          rows: [
            ["Symmetry", "$\\operatorname{Cov}(X,Y) = \\operatorname{Cov}(Y,X)$"],
            ["Bilinearity", "$\\operatorname{Cov}(aX + b,\\ cY + d) = ac\\,\\operatorname{Cov}(X,Y)$"],
            ["Additivity", "$\\operatorname{Cov}(X + Y,\\ Z) = \\operatorname{Cov}(X,Z) + \\operatorname{Cov}(Y,Z)$"],
            ["Independence", "$X \\perp\\!\\!\\!\\perp Y \\Rightarrow \\operatorname{Cov}(X,Y) = 0$ — but **not** conversely"],
            ["Variance of a sum", "$\\operatorname{Var}(X+Y) = \\operatorname{Var}(X) + \\operatorname{Var}(Y) + 2\\operatorname{Cov}(X,Y)$"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Shifts do not matter, scales do",
          text: "Adding a constant leaves covariance unchanged — the $b$ and $d$ vanish from the bilinearity rule — because covariance is about deviations from the mean, and shifting moves the mean by the same amount. Multiplying by constants multiplies the covariance by their product, which is exactly why the magnitude is uninterpretable: measure a height in millimetres rather than metres and the covariance grows by a factor of 1000 while nothing about the relationship changed.",
        },
      ],
    },
    {
      heading: "Zero covariance is not independence",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "The implication runs one way only",
          text: "Independence forces zero covariance. Zero covariance does not force independence, because covariance only detects *linear* association — it is blind to any relationship that is symmetric about the mean.",
        },
        {
          kind: "example",
          title: "Uncorrelated but completely dependent",
          problem:
            "Let $X$ be uniform on $\\{-1, 0, 1\\}$ and let $Y = X^{2}$. Compute $\\operatorname{Cov}(X, Y)$.",
          steps: [
            "$\\mathbb{E}[X] = (-1 + 0 + 1)/3 = 0$.",
            "$XY = X \\cdot X^{2} = X^{3}$, which takes values $-1, 0, 1$ with equal probability, so $\\mathbb{E}[XY] = 0$.",
            "$\\operatorname{Cov}(X,Y) = \\mathbb{E}[XY] - \\mathbb{E}[X]\\mathbb{E}[Y] = 0 - 0 = 0$.",
            "Yet $Y$ is a deterministic function of $X$ — knowing $X$ determines $Y$ exactly.",
          ],
          answer:
            "$\\operatorname{Cov}(X,Y) = 0$ despite total dependence. The relationship is symmetric, so positive and negative products cancel.",
        },
        {
          kind: "prose",
          text: "The one important exception: if $(X, Y)$ are *jointly* normal, zero covariance does imply independence. This is a special property of the multivariate normal and does not follow from each being marginally normal — a common misreading.",
        },
      ],
    },
    {
      heading: "Correlation",
      blocks: [
        {
          kind: "formula",
          latex: "\\rho_{XY} = \\frac{\\operatorname{Cov}(X,Y)}{\\sigma_X \\sigma_Y} \\in [-1, 1]",
          caption: "The correlation coefficient — covariance normalised by both standard deviations",
        },
        {
          kind: "prose",
          text: "Dividing by both standard deviations cancels the units and bounds the result, which is what makes correlations comparable across different pairs of variables. The bound $|\\rho| \\le 1$ is Cauchy–Schwarz applied to centred variables, and $|\\rho| = 1$ exactly when $Y$ is an exact linear function of $X$.",
        },
        {
          kind: "example",
          title: "Variance of a sum",
          problem:
            "Two assets have $\\sigma_X = 0.20$, $\\sigma_Y = 0.30$, and $\\rho = -0.5$. What is the standard deviation of an equally weighted portfolio $\\frac{1}{2}(X + Y)$?",
          steps: [
            "$\\operatorname{Cov}(X,Y) = \\rho\\sigma_X\\sigma_Y = -0.5(0.20)(0.30) = -0.03$.",
            "$\\operatorname{Var}\\!\\left(\\tfrac{1}{2}X + \\tfrac{1}{2}Y\\right) = \\tfrac{1}{4}\\operatorname{Var}(X) + \\tfrac{1}{4}\\operatorname{Var}(Y) + 2 \\cdot \\tfrac{1}{4}\\operatorname{Cov}(X,Y)$.",
            "$= 0.25(0.04) + 0.25(0.09) + 0.5(-0.03) = 0.01 + 0.0225 - 0.015 = 0.0175$.",
            "$\\sqrt{0.0175} \\approx 0.1323$.",
          ],
          answer:
            "About $13.2\\%$ — lower than either asset alone. Negative covariance is the mathematical content of diversification.",
        },
      ],
    },
  ],
  references: [
    { source: "Blitzstein & Hwang, Introduction to Probability", locator: "Ch. 7.3" },
    { source: "Casella & Berger, Statistical Inference", locator: "§4.5" },
    { source: "Wasserman, All of Statistics", locator: "§3.3" },
    { source: "Mathlingo assessment bank", locator: "assessments/joint-and-conditional-structure.md" },
  ],
};
