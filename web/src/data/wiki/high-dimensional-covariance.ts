import type { WikiArticle } from "./types";

const covarianceShrinkage: WikiArticle = {
  conceptId: "covariance-shrinkage",

  summary:
    "The sample covariance matrix is unbiased, but when the number of variables $p$ is comparable to the number of " +
    "observations $T$ it is badly behaved: its eigenvalues are too spread out, its smallest ones are far too small, and " +
    "for $p > T$ it is singular. Shrinkage blends it with a simple, low-variance target — a scaled identity, a " +
    "constant-correlation matrix or a one-factor model — trading a little bias for a large cut in estimation error. " +
    "Ledoit and Wolf showed how to pick the blend from the data. It is Stein's insight applied to matrices.",

  sections: [
    {
      heading: "Why the sample covariance fails",
      blocks: [
        {
          kind: "prose",
          text:
            "With $\\mathbf{S} = \\frac{1}{T}\\sum_t \\mathbf{x}_t\\mathbf{x}_t^{\\top}$, there are $\\frac{p(p + 1)}{2}$ " +
            "parameters estimated from $pT$ numbers. When $\\frac{p}{T}$ is not small, noise spreads the sample eigenvalues: " +
            "the largest come out too large and the smallest too small, even if all true eigenvalues are equal (see the " +
            "Random Matrices lesson for exactly how much). For $T < p$, $\\mathbf{S}$ has rank at most $T$ and at least " +
            "$p - T$ zero eigenvalues.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Inverses amplify the damage",
          text:
            "Minimum-variance and mean-variance portfolios use $\\mathbf{S}^{-1}$, which is dominated by the smallest " +
            "eigenvalues — the ones most underestimated. Optimizers pile into directions that look nearly riskless and are " +
            "not.",
        },
      ],
    },
    {
      heading: "Linear shrinkage",
      blocks: [
        {
          kind: "formula",
          latex: "\\hat{\\boldsymbol{\\Sigma}} = \\rho\\mathbf{F} + (1 - \\rho)\\mathbf{S}, \\qquad \\rho^{*} = \\frac{\\mathbb{E}\\|\\mathbf{S} - \\boldsymbol{\\Sigma}\\|_F^{2}}{\\mathbb{E}\\|\\mathbf{S} - \\boldsymbol{\\Sigma}\\|_F^{2} + \\|\\mathbf{F} - \\boldsymbol{\\Sigma}\\|_F^{2}}",
          caption: "The optimal intensity balances the sample's variance against the target's bias (for a fixed target)",
        },
        {
          kind: "table",
          headers: ["Target $\\mathbf{F}$", "Keeps", "Best for"],
          rows: [
            ["Scaled identity $\\mu\\mathbf{I}$, $\\mu = \\frac{\\text{tr}\\,\\mathbf{S}}{p}$", "Eigenvectors and trace; pulls eigenvalues toward $\\mu$", "Variables on a common scale"],
            ["Constant correlation", "Each variance; correlations pulled to their average", "Assets with very different volatilities"],
            ["Single factor $\\sigma_m^{2}\\boldsymbol{\\beta}\\boldsymbol{\\beta}^{\\top} + \\mathbf{D}$", "Market structure", "Stocks"],
          ],
        },
        {
          kind: "example",
          title: "Taming the condition number",
          problem: "A sample covariance has eigenvalues $3$, $1$ and $0.2$. Shrink halfway toward $\\mu\\mathbf{I}$.",
          steps: [
            "$\\mu = \\frac{3 + 1 + 0.2}{3} = 1.4$.",
            "New eigenvalues: $0.5(3) + 0.7 = 2.2$, $0.5(1) + 0.7 = 1.2$, $0.5(0.2) + 0.7 = 0.8$.",
            "Condition number: $\\frac{3}{0.2} = 15$ before, $\\frac{2.2}{0.8} = 2.75$ after.",
          ],
          answer: "Same eigenvectors, same trace, far better conditioned — and invertible even if $\\mathbf{S}$ was singular.",
        },
        {
          kind: "example",
          title: "Shrinkage and the minimum-variance portfolio",
          problem: "The truth is $\\text{diag}(0.02, 0.03)$ but the sample says $\\text{diag}(0.01, 0.04)$. Compare fully invested minimum-variance portfolios.",
          steps: [
            "Sample MVP: weights $\\propto [100, 25]$, i.e. $[0.8, 0.2]$; true variance $0.64(0.02) + 0.04(0.03) = 0.0140$.",
            "Shrunk halfway to $\\mu = 0.025$: $\\text{diag}(0.0175, 0.0325)$, weights $[0.65, 0.35]$; true variance $0.0121$.",
            "The true MVP, weights $[0.6, 0.4]$, has variance $0.0120$; shrinkage with $\\rho = \\frac{2}{3}$ recovers it exactly here.",
          ],
          answer: "Shrinkage removed most of the excess risk of the naive optimizer.",
        },
      ],
    },
    {
      heading: "In practice",
      blocks: [
        {
          kind: "list",
          items: [
            "Ledoit and Wolf give consistent plug-in estimates of $\\rho^{*}$, so linear shrinkage needs no tuning; alternatively, cross-validate an out-of-sample loss matched to the use (variance forecasts versus the realized risk of optimized portfolios).",
            "**Nonlinear shrinkage** corrects each eigenvalue separately — better when the true spectrum has a few large factors plus a bulk.",
            "A **factor model** is shrinkage taken all the way to a low-rank-plus-diagonal target; shrinking toward a factor target keeps some of what the factors miss.",
            "The idea is Stein's: estimating many quantities jointly and pooling toward structure beats estimating each separately.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Ledoit and Wolf, “A well-conditioned estimator for large-dimensional covariance matrices”, Journal of Multivariate Analysis (2004)", locator: "Linear shrinkage toward the identity" },
    { source: "Ledoit and Wolf, “Improved estimation of the covariance matrix of stock returns…”, Journal of Empirical Finance (2003)", locator: "Single-factor target" },
    { source: "Paleologo, The Elements of Quantitative Investing", locator: "Ch. 6, §6.3.1 Factor Covariance Shrinkage" },
  ],
};

const randomMatrixTheory: WikiArticle = {
  conceptId: "random-matrix-theory",

  summary:
    "Random matrix theory answers a precise question: what do the eigenvalues of a sample covariance look like when " +
    "there is nothing but noise? The Marchenko–Pastur law says they spread over a predictable band whose width depends " +
    "only on $\\gamma = \\frac{p}{T}$. Add a few genuine factors (“spikes”) and a phase transition appears: a factor is " +
    "visible only if its strength exceeds $1 + \\sqrt{\\gamma}$, and even then its sample eigenvalue overshoots and its " +
    "eigenvector tilts into noise — by amounts we can compute and undo. These results drive the statistical factor " +
    "models of the Quantitative Investing course.",

  sections: [
    {
      heading: "The Marchenko–Pastur law",
      blocks: [
        {
          kind: "formula",
          latex: "\\lambda_{\\pm} = \\sigma^{2}\\left(1 \\pm \\sqrt{\\gamma}\\right)^{2}, \\qquad \\gamma = \\frac{p}{T}",
          caption: "Edges of the bulk of sample eigenvalues when $\\boldsymbol{\\Sigma} = \\sigma^{2}\\mathbf{I}$ and $p, T \\to \\infty$",
        },
        {
          kind: "prose",
          text:
            "The eigenvalues still average $\\sigma^{2}$ (the trace is unbiased) but spread with variance about " +
            "$\\gamma\\sigma^{4}$ over $[\\lambda_-, \\lambda_+]$. For $\\gamma > 1$ a fraction $1 - \\frac{1}{\\gamma}$ of them " +
            "is exactly zero. At finite size, the largest noise eigenvalue fluctuates around $\\lambda_+$ on a small " +
            "(Tracy–Widom) scale, so barely exceeding the edge proves little.",
        },
        {
          kind: "example",
          title: "Noise that looks like a factor",
          problem: "$p = 500$ independent unit-variance series observed for $T = 1{,}000$ days. Where do the sample eigenvalues fall?",
          steps: [
            "$\\gamma = 0.5$, $\\sqrt{\\gamma} \\approx 0.707$.",
            "$\\lambda_- = 0.293^{2} \\approx 0.086$, $\\lambda_+ = 1.707^{2} \\approx 2.91$.",
          ],
          answer: "Pure noise yields eigenvalues up to $2.9$ — nearly three times the true value. A big sample eigenvalue alone is not a factor.",
        },
      ],
    },
    {
      heading: "Spikes and the BBP transition",
      blocks: [
        {
          kind: "prose",
          text:
            "Take unit noise plus a few spikes: true eigenvalues $\\ell_1, \\dots, \\ell_k > 1$, the rest equal to $1$. " +
            "Baik, Ben Arous and Péché showed a sharp threshold:",
        },
        {
          kind: "formula",
          latex: "\\ell > 1 + \\sqrt{\\gamma}: \\quad \\lambda \\to \\ell\\left(1 + \\frac{\\gamma}{\\ell - 1}\\right), \\qquad \\cos^{2}(\\hat{\\mathbf{u}}, \\mathbf{u}) \\to \\frac{1 - \\gamma/(\\ell - 1)^{2}}{1 + \\gamma/(\\ell - 1)}",
          caption: "Above threshold: the sample eigenvalue overshoots and the eigenvector is only partly aligned. Below it: the eigenvalue sticks to $\\lambda_+$ and the eigenvector is asymptotically orthogonal",
        },
        {
          kind: "example",
          title: "A moderate factor",
          problem: "$\\gamma = 0.5$ and a true spike $\\ell = 3$.",
          steps: [
            "Threshold $1 + \\sqrt{0.5} \\approx 1.71$: detectable.",
            "Sample eigenvalue $3\\left(1 + \\frac{0.5}{2}\\right) = 3.75$ — a $25\\%$ overshoot.",
            "Overlap $\\cos^{2} = \\frac{1 - 0.5/4}{1 + 0.5/2} = 0.7$: the eigenvector is $30\\%$ noise in squared terms.",
          ],
          answer: "Strong spikes ($\\ell = 11$: eigenvalue $11.55$, $\\cos^{2} \\approx 0.95$) are nearly unbiased; weak ones are distorted, and those below threshold vanish.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Undoing the overshoot",
          text:
            "Invert $\\lambda = \\ell + \\frac{\\gamma\\ell}{\\ell - 1}$: $\\ell$ is the larger root of " +
            "$\\ell^{2} - (\\lambda + 1 - \\gamma)\\ell + \\lambda = 0$. Replacing each spiked eigenvalue by its estimated " +
            "true value — and the bulk by the noise level — is nonlinear eigenvalue shrinkage, the basis of optimal " +
            "shrinkage for statistical factor models.",
        },
      ],
    },
    {
      heading: "Using it on returns",
      blocks: [
        {
          kind: "list",
          items: [
            "**How many factors?** Count eigenvalues clearly above $\\sigma^{2}(1 + \\sqrt{\\gamma})^{2}$, with $\\sigma^{2}$ estimated from the bulk.",
            "**How much data?** A factor of strength $\\ell$ needs $\\gamma < (\\ell - 1)^{2}$: with $p = 1{,}000$ and $\\ell = 1.5$, $T > 4{,}000$.",
            "**Caveats**: returns are heavy-tailed and heteroskedastic, and idiosyncratic variances differ, so the edge is a guide — standardize returns first and validate out of sample. Longer histories shrink $\\gamma$ but mix regimes.",
            "**Near-equal spikes** are estimated well as a subspace, but their individual eigenvectors are unstable and mix.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Marchenko and Pastur, “Distribution of eigenvalues for some sets of random matrices”, Math. USSR-Sbornik (1967)", locator: "The bulk law" },
    { source: "Baik, Ben Arous and Péché, “Phase transition of the largest eigenvalue for nonnull complex sample covariance matrices”, Annals of Probability (2005)", locator: "The spiked transition" },
    { source: "Paul, “Asymptotics of sample eigenstructure for a large dimensional spiked covariance model”, Statistica Sinica (2007)", locator: "Eigenvalue and eigenvector limits" },
    { source: "Paleologo, The Elements of Quantitative Investing", locator: "Ch. 7, §7.2 and Ch. 14, §14.5 Spiked Covariance Matrix" },
  ],
};

/** High-dimensional covariance lessons of the `multivariate-probability` domain. */
export const highDimensionalCovarianceWikis: WikiArticle[] = [covarianceShrinkage, randomMatrixTheory];
