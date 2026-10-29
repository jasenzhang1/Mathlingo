import type { WikiArticle } from "../types";

export const eigenvalueShrinkageWiki: WikiArticle = {
  conceptId: "eigenvalue-shrinkage",

  summary:
    "A rescaled factor model is a spiked covariance: a few large eigenvalues above a flat floor of idiosyncratic " +
    "variance. Random-matrix theory then tells us exactly how PCA misleads when the number of stocks $n$ is comparable to " +
    "the number of observations $T$: factor eigenvalues come out too large, eigenvectors tilt into noise, and weak " +
    "factors disappear below a threshold. This lesson applies those results — from the Random Matrices lesson — to " +
    "correct factor variances and to choose how many factors to keep.",

  sections: [
    {
      heading: "What PCA gets wrong",
      blocks: [
        {
          kind: "formula",
          latex: "\\ell > 1 + \\sqrt{\\gamma}: \\quad \\hat{\\lambda} \\approx \\ell\\left(1 + \\frac{\\gamma}{\\ell - 1}\\right), \\qquad \\cos^{2}(\\hat{\\mathbf{u}}, \\mathbf{u}) \\approx \\frac{1 - \\gamma/(\\ell - 1)^{2}}{1 + \\gamma/(\\ell - 1)}, \\qquad \\gamma = \\frac{n}{T}",
          caption: "For returns standardized to unit idiosyncratic variance; below the threshold the top eigenvalue sits at the bulk edge and its eigenvector is uninformative",
        },
        {
          kind: "prose",
          text:
            "In practice $n$ is in the thousands and $T$ between $250$ and $2{,}000$, so $\\gamma$ ranges from about $2$ " +
            "to $7$ or more. Consequences: predicted variances of portfolios in the span of the top eigenvectors are " +
            "overstated (by roughly $\\gamma$ per unit of exposure for strong factors), while portfolios orthogonal to them " +
            "are understated. Pervasive factors, whose eigenvalues grow like $n$, keep $\\frac{\\gamma}{\\ell - 1}$ bounded, " +
            "so they remain well estimated even as $\\gamma$ grows.",
        },
        {
          kind: "example",
          title: "A thousand stocks, one year",
          problem: "$n = 1{,}000$, $T = 250$, a factor with true variance $\\ell = 10$ (in idiosyncratic units).",
          steps: [
            "$\\gamma = 4$; threshold $1 + 2 = 3$: detectable.",
            "Sample eigenvalue $\\approx 10\\left(1 + \\frac{4}{9}\\right) \\approx 14.4$ — a $44\\%$ overshoot.",
            "$\\cos^{2} \\approx \\frac{1 - 4/81}{1 + 4/9} \\approx 0.66$: a third of the eigenvector's squared norm is noise.",
          ],
          answer: "Even a fairly strong factor is materially distorted at realistic sample sizes.",
        },
      ],
    },
    {
      heading: "Shrinking the eigenvalues",
      blocks: [
        {
          kind: "formula",
          latex: "\\hat{\\ell} = \\frac{(\\hat{\\lambda} + 1 - \\gamma) + \\sqrt{(\\hat{\\lambda} + 1 - \\gamma)^{2} - 4\\hat{\\lambda}}}{2} \\ \\approx \\ \\hat{\\lambda} - \\gamma \\text{ for large } \\hat{\\lambda}",
          caption: "Inverting the overshoot; for strong factors it is a constant offset, like PPCA's",
        },
        {
          kind: "list",
          items: [
            "**The loss matters.** Donoho, Gavish and Johnstone derive optimal shrinkers for many losses; for an optimizer, the loss on the precision matrix is the relevant one, and bulk eigenvalues should be set to the noise level.",
            "**Heavy tails change the picture.** In Paleologo's simulations with $t_5$ returns, the offset rule fails and scaling all factor eigenvalues by a common factor works better; a fitted linear rule $\\tilde{\\lambda} = a\\hat{\\lambda} + b$ covers both.",
            "**Frobenius (Ledoit–Wolf) shrinkage is not recommended here**: it assumes $n$ fixed with $T \\to \\infty$, restricts the estimate to a blend of the sample matrix and the identity, and doesn't match the optimal spike shrinkage.",
          ],
        },
      ],
    },
    {
      heading: "How many factors?",
      blocks: [
        {
          kind: "table",
          headers: ["Method", "Rule"],
          rows: [
            ["Threshold", "Keep eigenvalues above the noise edge $(1 + \\sqrt{\\gamma})^{2}$ (unit noise), i.e. spikes above $1 + \\sqrt{\\gamma}$"],
            ["Scree plot", "Cut where the steep fall turns into a slow, nearly linear decline (or use log eigenvalues)"],
            ["Maximum gap", "Choose $k$ maximizing $\\hat{\\lambda}_k - \\hat{\\lambda}_{k+1}$ or its log version, up to a cap (Onatski)"],
            ["Penalty", "Minimize residual error plus a penalty increasing in $m$ (Bai–Ng information criteria)"],
          ],
        },
        {
          kind: "example",
          title: "Rules can disagree",
          problem: "Unit noise, $\\gamma = 0.5$, sample eigenvalues $12$, $5$, $3.1$, $2.9$, $2.8$.",
          steps: [
            "Bulk edge $(1 + \\sqrt{0.5})^{2} \\approx 2.91$: the threshold keeps $12$, $5$ and $3.1$ — three factors.",
            "Largest gap is $12 - 5 = 7$: one factor.",
          ],
          answer: "Telling the number of factors is either easy (a wide gap) or hopeless (a gradual decline).",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Err toward more",
          text:
            "Finding the right factors matters more than their exact number. A missing factor is left in the residuals as " +
            "“diversifiable” risk that optimizers will happily concentrate in; an extra weak factor mostly adds a little " +
            "noise and turnover. Choose among candidates with out-of-sample risk tests.",
        },
      ],
    },
  ],

  references: [
    { source: "Paleologo, The Elements of Quantitative Investing", locator: "Ch. 7, §7.2 Beyond the Basics (§7.2.1–7.2.5) and Ch. 14, §14.5" },
    { source: "Donoho, Gavish and Johnstone, “Optimal shrinkage of eigenvalues in the spiked covariance model”, Annals of Statistics (2018)", locator: "Loss-dependent shrinkers" },
    { source: "Bai and Ng, “Determining the Number of Factors in Approximate Factor Models”, Econometrica (2002)", locator: "Information criteria" },
    { source: "Onatski, “Determining the number of factors from empirical distribution of eigenvalues”, REStat (2010)", locator: "Eigenvalue-gap rules" },
  ],
};
