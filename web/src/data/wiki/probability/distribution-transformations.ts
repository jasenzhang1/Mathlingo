import type { WikiArticle } from "../types";

export const distributionTransformations: WikiArticle = {
  conceptId: "distribution-transformations",
  summary:
    "Finding the distribution of $Y = g(X)$ from the distribution of $X$ has two reliable methods: go through the CDF, which always works, or use the change-of-variables formula, which is faster when $g$ is monotone. The Jacobian factor is not optional bookkeeping — it is what keeps total probability equal to 1 when the transformation stretches or compresses the axis.",
  sections: [
    {
      heading: "The CDF method",
      blocks: [
        {
          kind: "prose",
          text: "Compute $F_Y(y) = P(g(X) \\le y)$ by rewriting the event in terms of $X$, then differentiate. It requires no monotonicity, handles many-to-one maps, and is the method to fall back on whenever the shortcut is unclear.",
        },
        {
          kind: "example",
          title: "A many-to-one transform",
          problem: "$Z \\sim \\mathcal{N}(0,1)$. Find the density of $Y = Z^{2}$.",
          steps: [
            "$F_Y(y) = P(Z^{2} \\le y) = P(-\\sqrt{y} \\le Z \\le \\sqrt{y})$ for $y > 0$.",
            "$= \\Phi(\\sqrt{y}) - \\Phi(-\\sqrt{y}) = 2\\Phi(\\sqrt{y}) - 1$, using symmetry.",
            "Differentiate: $f_Y(y) = 2\\varphi(\\sqrt{y}) \\cdot \\dfrac{1}{2\\sqrt{y}} = \\dfrac{\\varphi(\\sqrt{y})}{\\sqrt{y}}$.",
            "Substituting $\\varphi$: $f_Y(y) = \\dfrac{1}{\\sqrt{2\\pi y}}e^{-y/2}$.",
          ],
          answer:
            "That is the $\\chi^{2}_{1}$ density. Note the map is two-to-one — both $\\pm\\sqrt{y}$ give the same $y$ — which is exactly what the change-of-variables formula cannot handle directly.",
        },
      ],
    },
    {
      heading: "Change of variables",
      blocks: [
        {
          kind: "formula",
          latex: "f_Y(y) = f_X\\big(g^{-1}(y)\\big)\\left|\\frac{d}{dy}g^{-1}(y)\\right|",
          caption: "For strictly monotone, differentiable $g$",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why the derivative factor must be there",
          text: "Density is probability per unit length. If $g$ stretches an interval, the same probability now spreads over more length, so the density must fall — and the derivative measures exactly that stretching. Omitting it produces a function that does not integrate to 1, which is the quickest way to catch the error. The absolute value is needed because a decreasing $g$ reverses orientation while probability stays positive.",
        },
        {
          kind: "formula",
          latex: "f_{\\mathbf{Y}}(\\mathbf{y}) = f_{\\mathbf{X}}\\big(g^{-1}(\\mathbf{y})\\big)\\,\\big|\\det J\\big|, \\qquad J_{ij} = \\frac{\\partial x_i}{\\partial y_j}",
          caption: "The multivariate version — the Jacobian determinant replaces the derivative",
        },
      ],
    },
    {
      heading: "Transforms worth knowing",
      blocks: [
        {
          kind: "table",
          headers: ["Transform", "Result", "Use"],
          rows: [
            ["$aX + b$", "location–scale shift of the same family", "standardisation"],
            ["$F_X(X)$", "Uniform$(0,1)$", "probability integral transform; p-values"],
            ["$F^{-1}(U)$", "any target distribution", "inverse transform sampling"],
            ["$Z^{2}$", "$\\chi^{2}_{1}$", "sums of squares"],
            ["$-\\ln U$", "Exponential$(1)$", "simulation"],
            ["$e^{X}$ for normal $X$", "log-normal", "multiplicative growth"],
            ["Box–Muller on two uniforms", "two independent normals", "generating normals"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Properties do not survive transformation",
          text: "$\\mathbb{E}[g(X)] \\ne g(\\mathbb{E}[X])$ unless $g$ is linear — the gap is Jensen's inequality. Unbiasedness likewise: $s^{2}$ is unbiased for $\\sigma^{2}$ while $s$ is biased for $\\sigma$. And a uniform prior on $p$ is not uniform on the odds $p/(1-p)$. Any claim about a parameter must be checked afresh under a reparameterisation; almost nothing transfers automatically.",
        },
      ],
    },
    {
      heading: "The delta method",
      blocks: [
        {
          kind: "formula",
          latex: "\\sqrt{n}\\big(\\hat{\\theta}_n - \\theta\\big) \\xrightarrow{d} \\mathcal{N}(0, \\sigma^{2}) \\ \\Longrightarrow \\ \\sqrt{n}\\big(g(\\hat{\\theta}_n) - g(\\theta)\\big) \\xrightarrow{d} \\mathcal{N}\\big(0,\\ [g'(\\theta)]^{2}\\sigma^{2}\\big)",
          caption: "Approximate transformation of an asymptotic distribution",
        },
        {
          kind: "prose",
          text: "This is a first-order Taylor expansion doing the work the exact change of variables would: near $\\theta$, $g$ looks linear with slope $g'(\\theta)$, and a linear map of a normal is normal with variance scaled by the square of the slope. It is how standard errors are obtained for odds ratios, for $\\log$-transformed estimates, and for any quantity reported on a different scale from the one it was estimated on.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "It fails where $g'(\\theta) = 0$",
          text: "The leading term vanishes and the limiting distribution is no longer normal — a second-order expansion gives a chi-square instead. This is not exotic: it happens whenever the quantity of interest is at a stationary point of the transformation, and the resulting confidence intervals from a naive delta method are simply wrong there.",
        },
      ],
    },
  ],
  references: [
    { source: "Casella & Berger, Statistical Inference", locator: "§2.1, §4.3, §5.5.4" },
    { source: "Blitzstein & Hwang, Introduction to Probability", locator: "Ch. 8.1–8.2" },
    { source: "Wasserman, All of Statistics", locator: "§2.5, §5.5" },
    { source: "Mathlingo assessment bank", locator: "assessments/mgf-likelihood-and-estimation.md" },
  ],
};
