import type { WikiArticle } from "../types";

export const conformalPredictionWiki: WikiArticle = {
  conceptId: "conformal-prediction",

  summary:
    "Conformal prediction wraps any fitted model — a gradient-boosted tree, a neural net, a large language model — and turns its point " +
    "predictions into prediction sets $C(x)$ with a finite-sample guarantee: $\\mathbb{P}\\left(Y_{n+1} \\in C(X_{n+1})\\right) \\ge 1 - \\alpha$. " +
    "It needs no distributional assumptions and no correctness of the model, only that the calibration data and the new point are " +
    "exchangeable. The trick is to rank the new point's “nonconformity” among held-out calibration scores: if all orderings are " +
    "equally likely, the new score lands below the right empirical quantile with probability at least $1 - \\alpha$.",

  sections: [
    {
      heading: "Split conformal prediction",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Split the labeled data. Fit any model $\\hat{f}$ on the training part.",
            "On the $n$ calibration points compute nonconformity scores, e.g. $s_i = |y_i - \\hat{f}(x_i)|$.",
            "Let $\\hat{q}$ be the $\\lceil (n+1)(1-\\alpha) \\rceil$-th smallest score.",
            "For a new $x$, report $C(x) = \\lbrace y : s(x, y) \\le \\hat{q} \\rbrace$; with absolute residuals this is $\\left[\\hat{f}(x) - \\hat{q},\\; \\hat{f}(x) + \\hat{q}\\right]$.",
          ],
        },
        {
          kind: "formula",
          latex: "1 - \\alpha \\;\\le\\; \\mathbb{P}\\left(Y_{n+1} \\in C(X_{n+1})\\right) \\;\\le\\; 1 - \\alpha + \\frac{1}{n+1}",
          caption: "The coverage guarantee; the upper bound needs continuous scores (no ties)",
        },
        {
          kind: "prose",
          text:
            "Why it works: the scores $s_1, \\ldots, s_n, s_{n+1}$ are exchangeable, so the rank of $s_{n+1}$ among all $n+1$ is uniform on " +
            "$\\lbrace 1, \\ldots, n+1 \\rbrace$. The new score is at most the $k$-th smallest calibration score with probability $\\frac{k}{n+1}$, and " +
            "choosing $k = \\lceil (n+1)(1-\\alpha) \\rceil$ makes that at least $1 - \\alpha$. The $+1$ is the new point itself.",
        },
        {
          kind: "definitions",
          items: [
            { term: "Exchangeability", description: "The joint law of $(Z_1, \\ldots, Z_{n+1})$ is unchanged by permuting them. I.i.d. data are exchangeable; time series and shifted test data usually are not." },
            { term: "Nonconformity score", description: "Any function $s(x, y)$ where larger means “$y$ looks less like what the model expects at $x$”. The guarantee holds for every choice; a good choice gives small sets." },
            { term: "Marginal coverage", description: "Coverage averaged over the random draw of $X_{n+1}$ and the calibration set — not coverage at each fixed $x$." },
          ],
        },
      ],
    },

    {
      heading: "A worked example",
      blocks: [
        {
          kind: "example",
          title: "An $80\\%$ interval from nine residuals",
          problem:
            "A model's absolute residuals on $n = 9$ calibration points are $0.2, 0.5, 0.9, 1.1, 1.4, 1.6, 2.0, 2.3, 3.1$. Build an $80\\%$ " +
            "conformal interval at a point where $\\hat{f}(x) = 10$.",
          steps: [
            "$\\alpha = 0.2$, so $k = \\lceil 10 \\times 0.8 \\rceil = 8$.",
            "The $8$-th smallest score is $\\hat{q} = 2.3$.",
            "$C(x) = [10 - 2.3,\\; 10 + 2.3] = [7.7,\\; 12.3]$.",
            "Coverage is between $0.8$ and $0.8 + \\frac{1}{10} = 0.9$.",
          ],
          answer: "$[7.7, 12.3]$. Asking for $\\alpha = 0.05$ would need $k = \\lceil 9.5 \\rceil = 10 > 9$: with nine points the interval is infinite.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Too few calibration points",
          text:
            "If $\\lceil (n+1)(1-\\alpha) \\rceil > n$, then $\\hat{q} = \\infty$. A $95\\%$ guarantee needs at least $n = 19$ calibration points.",
        },
      ],
    },

    {
      heading: "Better scores, other tasks",
      blocks: [
        {
          kind: "table",
          headers: ["Task", "Score $s(x, y)$", "Resulting set"],
          rows: [
            ["Regression", "$|y - \\hat{f}(x)|$", "Constant-width band around $\\hat{f}(x)$"],
            ["Regression, heteroskedastic", "$\\frac{|y - \\hat{f}(x)|}{\\hat{\\sigma}(x)}$", "Width scales with $\\hat{\\sigma}(x)$"],
            ["Conformalized quantile regression", "$\\max\\left(\\hat{q}_{\\text{lo}}(x) - y,\\; y - \\hat{q}_{\\text{hi}}(x)\\right)$", "Quantile band widened or narrowed by $\\hat{q}$"],
            ["Classification", "$1 - \\hat{p}_y(x)$", "All labels whose predicted probability is at least $1 - \\hat{q}$"],
          ],
        },
        {
          kind: "prose",
          text:
            "Set size is the honest uncertainty readout: a confident classifier returns one label, a confused one returns several. The " +
            "guarantee never depends on the model being good — a bad model just yields wide sets.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Marginal, not conditional",
          text:
            "$1 - \\alpha$ coverage on average can hide $60\\%$ coverage in one subgroup and $99\\%$ in another. Exact conditional coverage " +
            "$\\mathbb{P}(Y \\in C(X) \\mid X = x) \\ge 1 - \\alpha$ for every $x$ is impossible without assumptions; group-conditional " +
            "(Mondrian) conformal calibrates separately within chosen groups.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "When exchangeability breaks",
          text:
            "Under covariate shift, weighted conformal prediction reweights calibration scores by the likelihood ratio $\\frac{dP_{\\text{test}}}{dP_{\\text{train}}}(x)$ — " +
            "the same inverse-probability idea as in selection bias. The same calibrate-then-certify mindset drives prediction-powered inference.",
        },
      ],
    },
  ],

  references: [
    { source: "Angelopoulos, Bates, A Gentle Introduction to Conformal Prediction and Distribution-Free Uncertainty Quantification", locator: "§1–2 (split conformal), §2.2 (conformalized quantile regression)" },
    { source: "Vovk, Gammerman, Shafer, Algorithmic Learning in a Random World", locator: "Ch. 2, Conformal Prediction" },
    { source: "Lei, G’Sell, Rinaldo, Tibshirani, Wasserman, Distribution-Free Predictive Inference for Regression (JASA 2018)", locator: "§2, split conformal" },
  ],
};
