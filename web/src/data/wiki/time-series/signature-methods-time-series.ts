import type { WikiArticle } from "../types";

export const signatureMethodsTimeSeriesWiki: WikiArticle = {
  conceptId: "signature-methods-time-series",

  summary:
    "Real time series are often non-stationary, nonlinear, multivariate and fragmented — sampled at irregular times, with gaps and of " +
    "different lengths. ARMA-type models assume too much; deep sequence models assume little but need large training sets and are hard to " +
    "interpret. The signature method sits between them: turn each series into a path, augment it so the right information is visible, " +
    "compute a truncated signature, and fit a sparse linear model such as the adaptive LASSO on those features. Each selected feature is an " +
    "iterated integral with a meaning — an increment, a lead–lag area, a volatility — so the fitted model can be read.",

  sections: [
    {
      heading: "From data to path",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Interpolate the observations $(t_k, \\mathbf{x}_k)$ into a continuous path, usually piecewise linear. Irregular spacing and different lengths need no special handling.",
            "Augment: add channels that expose what the signature would otherwise miss (table below).",
            "Normalise each channel (for example by its scale) so that level-$k$ terms, which scale like the $k$-th power, are comparable.",
            "Compute the signature (or log-signature) truncated at level $M$, typically $2$ to $4$.",
            "Fit a linear or logistic model on the features, with a sparsity penalty to choose among them.",
          ],
        },
        {
          kind: "table",
          headers: ["Augmentation", "Construction", "What it adds"],
          rows: [
            ["Time", "Add $t$ as a coordinate: $(t, \\mathbf{x}_t)$", "Uniqueness and sensitivity to speed (signatures are otherwise speed-blind)"],
            ["Basepoint", "Prepend the origin $\\mathbf{0}$", "Sensitivity to the starting level, not only increments"],
            ["Lead–lag", "Pair each channel with a one-step-delayed copy", "Quadratic variation (realised volatility) appears at level 2"],
            ["Missingness channel", "Add a channel that counts observed values", "Lets the model learn from when data were missing"],
          ],
        },
      ],
    },

    {
      heading: "A worked feature computation",
      blocks: [
        {
          kind: "example",
          title: "A three-point series with time augmentation",
          problem:
            "A series takes values $0, 2, 1$ at times $0, 1, 2$. Compute the level-1 and level-2 signature of the time-augmented path $(t, x)$.",
          steps: [
            "Path $(0, 0) \\to (1, 2) \\to (2, 1)$: segments $\\mathbf{v} = [1, 2]$ and $\\mathbf{w} = [1, -1]$.",
            "Level 1: $S^{t} = 2$, $S^{x} = 1$.",
            "$S^{t,t} = \\frac{2^{2}}{2} = 2$ and $S^{x,x} = \\frac{1^{2}}{2} = 0.5$.",
            "$S^{t,x} = \\frac{1 \\cdot 2}{2} + \\frac{1 \\cdot (-1)}{2} + 1 \\cdot (-1) = -0.5$ and $S^{x,t} = 1 - 0.5 + 2 \\cdot 1 = 2.5$.",
            "Check the shuffle identity: $-0.5 + 2.5 = 2 = S^{t} S^{x}$. Lévy area: $\\frac{-0.5 - 2.5}{2} = -1.5$.",
          ],
          answer: "Features $[2, 1, 2, -0.5, 2.5, 0.5]$. The negative area says the rise came early and the fall late.",
        },
        {
          kind: "prose",
          text:
            "Lead–lag in one dimension makes the link to volatility exact. The path alternates moving the lead coordinate and then the lag coordinate " +
            "by the same increment $\\Delta_k$; each step encloses area $\\frac{\\Delta_k^{2}}{2}$ and the cross terms cancel, so",
        },
        {
          kind: "formula",
          latex: "S^{\\text{lead},\\text{lag}} - S^{\\text{lag},\\text{lead}} = \\sum_{k} \\Delta_k^{2}",
          caption: "Twice the lead–lag Lévy area is the realised quadratic variation",
        },
      ],
    },

    {
      heading: "Signature + adaptive LASSO",
      blocks: [
        {
          kind: "formula",
          latex: "Y \\approx \\beta_0 + \\sum_{|I| \\le M} \\beta_I \\, S^{I}(\\hat{\\mathbf{X}}), \\qquad \\hat{\\boldsymbol{\\beta}} = \\arg\\min \\frac{1}{2}\\sum_n \\left( y_n - \\beta_0 - \\langle \\boldsymbol{\\beta}, S(\\hat{\\mathbf{X}}_n) \\rangle \\right)^{2} + \\lambda \\sum_I w_I |\\beta_I|",
          caption: "Linear regression on signature terms, weighted L1 penalty, $\\hat{\\mathbf{X}}$ the augmented path",
        },
        {
          kind: "list",
          items: [
            "Universality says a linear model on enough signature terms can approximate any continuous functional of the path, so nonlinearity is handled by the features, not the model.",
            "Signature features are highly correlated (the shuffle identity makes products of low levels reappear at higher ones), which is exactly where plain LASSO selects erratically and adaptive weights help.",
            "With few samples, a few hundred features and a sparse model is a sensible regime where deep networks would overfit.",
            "The selected words $I$ are interpretable: $S^{x}$ is a trend, $S^{t,x}$ timing of a rise, a lead–lag area a volatility, a cross-channel area a lead–lag relation between two variables.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Scale before you penalise",
          text:
            "A level-$k$ term scales like $c^{k}$ when the path is scaled by $c$. Without standardising channels and features, the L1 penalty favours whichever " +
            "level happens to have large numbers, not whichever is predictive.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Related tools",
          text:
            "Log-signatures give a minimal set of independent features; signature kernels compute inner products of untruncated signatures via a PDE; " +
            "neural controlled differential equations are the continuous-depth deep-learning cousin.",
        },
      ],
    },
  ],

  references: [
    { source: "Chevyrev, Kormilitzin, A Primer on the Signature Method in Machine Learning (2016)", locator: "§2, applications; lead–lag and time augmentation" },
    { source: "Morrill, Fermanian, Kidger, Lyons, A Generalised Signature Method for Multivariate Time Series Feature Extraction (2020)", locator: "augmentations, normalisation and truncation choices" },
    { source: "Zou, The Adaptive Lasso and Its Oracle Properties (JASA 2006)", locator: "weighted L1 penalty" },
  ],
};
