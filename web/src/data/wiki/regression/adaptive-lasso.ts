import type { WikiArticle } from "../types";

export const adaptiveLassoWiki: WikiArticle = {
  conceptId: "adaptive-lasso",

  summary:
    "The LASSO applies the same penalty $\\lambda$ to every coefficient, so it must choose between shrinking large, real effects too much " +
    "and letting small, spurious ones survive — and in general it cannot pick out the true variables consistently. The adaptive LASSO " +
    "(Zou, 2006) gives each coefficient its own weight $w_j = \\frac{1}{|\\tilde{\\beta}_j|^{\\gamma}}$ from a pilot estimate: coefficients " +
    "that look large are penalised lightly, those that look near zero are penalised heavily. With suitable $\\lambda$ it has the oracle " +
    "property — it selects the right variables and estimates them as well as if the true model had been known in advance — while " +
    "remaining a convex problem solvable by any LASSO code.",

  sections: [
    {
      heading: "The objective",
      blocks: [
        {
          kind: "formula",
          latex: "\\hat{\\boldsymbol{\\beta}}^{\\text{AL}} = \\arg\\min_{\\boldsymbol{\\beta}} \\; \\frac{1}{2}\\left\\| \\mathbf{y} - \\mathbf{X}\\boldsymbol{\\beta} \\right\\|^{2} + \\lambda \\sum_{j=1}^{p} w_j \\left| \\beta_j \\right|, \\qquad w_j = \\frac{1}{\\left| \\tilde{\\beta}_j \\right|^{\\gamma}}",
        },
        {
          kind: "definitions",
          items: [
            { term: "Pilot estimate $\\tilde{\\boldsymbol{\\beta}}$", description: "Any root-$n$ consistent estimate: OLS when $p < n$, ridge or a first LASSO fit otherwise." },
            { term: "$\\gamma > 0$", description: "How sharply the weights react; $\\gamma = 1$ is the common default, tuned with $\\lambda$ by cross-validation." },
            { term: "Infinite weight", description: "If $\\tilde{\\beta}_j = 0$ (e.g. a first-stage LASSO dropped it), $w_j = \\infty$ and the variable stays out." },
          ],
        },
        {
          kind: "prose",
          text:
            "Computation is a rescaling trick: set $\\mathbf{x}^{*}_j = \\frac{\\mathbf{x}_j}{w_j}$, solve an ordinary LASSO in $\\boldsymbol{\\beta}^{*}$, " +
            "then return $\\hat{\\beta}_j = \\frac{\\beta^{*}_j}{w_j}$. Because $w_j|\\beta_j| = |\\beta^{*}_j|$, the two problems are identical.",
        },
      ],
    },

    {
      heading: "Orthonormal design: weighted soft thresholding",
      blocks: [
        {
          kind: "prose",
          text:
            "When $\\mathbf{X}^{\\top}\\mathbf{X} = \\mathbf{I}$, with $z_j = \\mathbf{x}_j^{\\top}\\mathbf{y}$ the OLS coefficient, each coordinate decouples:",
        },
        {
          kind: "formula",
          latex: "\\hat{\\beta}_j = \\text{sign}(z_j)\\left( |z_j| - \\lambda w_j \\right)_{+}",
          caption: "Plain LASSO is the case $w_j = 1$",
        },
        {
          kind: "example",
          title: "Less bias on the big coefficient",
          problem: "OLS gives $\\mathbf{z} = [3, 0.4, -1.5]$. Compare LASSO and adaptive LASSO ($\\gamma = 1$, pilot $= $ OLS) at $\\lambda = 1$.",
          steps: [
            "LASSO: threshold every coordinate by $1$: $[2, 0, -0.5]$.",
            "Adaptive weights: $w = \\left[\\frac{1}{3}, 2.5, \\frac{2}{3}\\right]$, so thresholds $\\lambda w = [0.333, 2.5, 0.667]$.",
            "Adaptive LASSO: $[3 - 0.333,\\; 0,\\; -(1.5 - 0.667)] = [2.667, 0, -0.833]$.",
          ],
          answer: "Both drop the noise coordinate, but the adaptive version shrinks the large coefficient by $0.333$ instead of $1$.",
        },
        {
          kind: "prose",
          text:
            "With $\\gamma = 1$ the threshold is $\\frac{\\lambda}{|z_j|}$, so the estimate is $z_j - \\frac{\\lambda}{z_j}$ when $|z_j| > \\sqrt{\\lambda}$. As $|z_j|$ grows the " +
            "shrinkage vanishes — the nonnegative-garrote shape, nearly unbiased for large effects.",
        },
      ],
    },

    {
      heading: "The oracle property",
      blocks: [
        {
          kind: "list",
          items: [
            "Selection consistency: $\\mathbb{P}\\left( \\lbrace j : \\hat{\\beta}_j \\ne 0 \\rbrace = \\mathcal{A} \\right) \\to 1$, where $\\mathcal{A}$ is the true support.",
            "Asymptotic normality: $\\sqrt{n}\\left( \\hat{\\boldsymbol{\\beta}}_{\\mathcal{A}} - \\boldsymbol{\\beta}_{\\mathcal{A}} \\right)$ has the same normal limit as OLS fitted on $\\mathcal{A}$ alone.",
            "Conditions (fixed $p$): $\\frac{\\lambda_n}{\\sqrt{n}} \\to 0$ and $\\lambda_n n^{(\\gamma - 1)/2} \\to \\infty$, with a root-$n$ consistent pilot.",
          ],
        },
        {
          kind: "prose",
          text:
            "The intuition: for a true zero, $\\tilde{\\beta}_j = O_p(n^{-1/2})$, so $w_j$ blows up like $n^{\\gamma/2}$ and the penalty kills the coefficient. " +
            "For a true nonzero, $w_j$ stays bounded, and since $\\frac{\\lambda_n}{\\sqrt{n}} \\to 0$ the penalty becomes negligible at the $\\sqrt{n}$ scale.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Why plain LASSO falls short",
          text:
            "The LASSO selects consistently only under the irrepresentable condition (noise variables not too correlated with the true ones), and even " +
            "then its common $\\lambda$ biases the large coefficients. The adaptive weights remove both problems, at the cost of a two-stage fit.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Oracle is asymptotic",
          text:
            "In finite samples a small true effect can still be dropped, and inference after selection is still post-selection inference. The oracle " +
            "property is a reason to prefer the method, not a licence to read naive $p$-values off the selected model.",
        },
        {
          kind: "prose",
          text:
            "In practice adaptive LASSO is popular for interpretable models on large engineered feature sets — for example on signature features of time " +
            "series, where it keeps the few iterated integrals that matter and leaves them nearly unshrunk.",
        },
      ],
    },
  ],

  references: [
    { source: "Zou, The Adaptive Lasso and Its Oracle Properties (JASA 2006)", locator: "definition, oracle property and computation via rescaled LASSO" },
    { source: "Hastie, Tibshirani, Friedman, The Elements of Statistical Learning", locator: "Ch. 3, §3.4.2 (the lasso), §3.8 (more on the lasso)" },
    { source: "Fan, Li, Variable Selection via Nonconcave Penalized Likelihood and Its Oracle Properties (JASA 2001)", locator: "the oracle property" },
  ],
};
