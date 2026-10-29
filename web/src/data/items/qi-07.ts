import type { Item } from "../../lib/assessment/types";
import { m, mcq, num, short } from "./qi-shared";

/**
 * Quantitative Investing, part 7: statistical factor models — PCA as best
 * low-rank fit and as maximum likelihood, the spiked covariance model and
 * eigenvalue shrinkage, and PCA models in practice (Paleologo, Ch. 7). Forty
 * questions per lesson, four at each level.
 */

// ---------------------------------------------------------------------------
// statistical-factor-models
// ---------------------------------------------------------------------------
const ST = "statistical-factor-models";
const statisticalModels: Item[] = [
  // level 1
  mcq(m(ST, "recall-inputs", "recall", 1, 15, "In a statistical factor model, what is given and what is estimated?"),
    "Only returns are given; loadings, factor returns and idiosyncratic returns are all estimated",
    [
      ["Returns and loadings are given", "stat-fundamental", "That is a fundamental model."],
      ["Returns and factor returns are given", "stat-macro", "That is a macroeconomic model."],
      ["Nothing is estimated", "stat-nothing", "Everything but returns is estimated."],
    ]),
  mcq(m(ST, "recall-eckart", "recall", 1, 15, "By the Eckart–Young theorem, the best rank-$m$ approximation of the return matrix $\\mathbf{R} = \\mathbf{U}\\mathbf{S}\\mathbf{V}^{\\top}$ is:"),
    "$\\mathbf{U}_m\\mathbf{S}_m\\mathbf{V}_m^{\\top}$, keeping the $m$ largest singular values",
    [
      ["$\\mathbf{U}_m\\mathbf{U}_m^{\\top}$", "eckart-uu", "That's a projection matrix, not an approximation of $\\mathbf{R}$."],
      ["The $m$ smallest singular values", "eckart-smallest", "Keep the largest."],
      ["Any $m$ columns of $\\mathbf{R}$", "eckart-columns", "Column subset selection is a different problem."],
    ]),
  mcq(m(ST, "recall-pc1", "recall", 1, 15, "The first principal component of a covariance matrix $\\hat{\\boldsymbol{\\Omega}}$ is:"),
    "The unit-norm portfolio $\\mathbf{w}$ maximizing $\\mathbf{w}^{\\top}\\hat{\\boldsymbol{\\Omega}}\\mathbf{w}$ — its top eigenvector",
    [
      ["The minimum-variance portfolio", "pc1-minvar", "That's the bottom eigenvector direction (for unit norm)."],
      ["The equal-weighted portfolio", "pc1-equal", "Only if it happens to be the top eigenvector."],
      ["The asset with the largest variance", "pc1-asset", "PCs are combinations of assets."],
    ]),
  mcq(m(ST, "recall-interpret", "recall", 1, 15, "The main disadvantage of statistical factor models is that:"),
    "Their loadings are harder to interpret than characteristics",
    [
      ["They can't be estimated from returns", "disadv-estimate", "Returns are all they need."],
      ["They need firm characteristics", "disadv-characteristics", "They don't."],
      ["They have no factor returns", "disadv-no-factors", "They do."],
    ]),
  // level 2
  num(m(ST, "apply-top-eig", "apply", 2, 20, "Find the largest eigenvalue of $\\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}$."), 3),
  num(m(ST, "apply-var-share", "apply", 2, 25, "A covariance matrix has eigenvalues $10$, $4$, $1.2$, $0.9$, $0.9$. Find the fraction of total variance explained by the first component. Give $4$ decimal places."), 0.5882),
  num(m(ST, "apply-rank", "apply", 2, 20, "A loadings matrix $\\mathbf{B}$ is $n \\times m$ and factor returns $\\mathbf{F}$ are $m \\times T$, with $m = 10$. What is the largest possible rank of $\\mathbf{B}\\mathbf{F}$?"), 10),
  mcq(m(ST, "apply-why-stat", "apply", 2, 20, "Which is a good reason to build a statistical model alongside a fundamental one?"),
    "At very short horizons, or in asset classes without good characteristics, it may be the only or the best option",
    [
      ["It is always more interpretable", "whystat-interpret", "It is less interpretable."],
      ["It never changes over time", "whystat-static", "It is re-estimated on rolling windows."],
      ["It needs no returns", "whystat-no-returns", "It needs only returns."],
    ]),
  // level 3
  num(m(ST, "apply-ppca-noise", "apply", 3, 30, "Probabilistic PCA with $m = 2$ factors on sample eigenvalues $10$, $4$, $1.2$, $0.9$, $0.9$ estimates the idiosyncratic variance as the average of the remaining eigenvalues. Find it."), 1),
  num(m(ST, "apply-ppca-factor", "apply", 3, 30, "With that noise estimate $\\hat{\\sigma}^{2} = 1$, PPCA's first factor variance is the sample eigenvalue minus $\\hat{\\sigma}^{2}$. Find it."), 9),
  num(m(ST, "apply-two-share", "apply", 3, 25, "For eigenvalues $10$, $4$, $1.2$, $0.9$, $0.9$, find the fraction of variance explained by the first two components. Give $4$ decimal places."), 0.8235),
  mcq(m(ST, "apply-equal-eigs", "apply", 3, 25, "If two eigenvalues of a covariance are equal, their eigenvectors are:"),
    "Not unique — any orthonormal pair spanning the same plane works",
    [
      ["Unique up to sign", "equaleig-unique", "Degeneracy allows rotations within the plane."],
      ["Identical", "equaleig-identical", "They're orthogonal."],
      ["Undefined", "equaleig-undefined", "Eigenvectors exist; they're just not unique."],
    ]),
  // level 4
  num(m(ST, "apply-pc-loading", "apply", 4, 35, "Find the first component's weight on asset 1 for $\\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}$ (unit norm, positive sign). Give $4$ decimal places."), 0.7071),
  num(m(ST, "apply-fmp-idio", "apply", 4, 40, "With pervasive factors, a factor-mimicking portfolio's idiosyncratic variance is at most $\\frac{1}{Cn}$. Find this bound for $C = 0.5$ and $n = 1{,}000$."), 0.002),
  num(m(ST, "apply-svd-factor-var", "apply", 4, 40, "A return matrix with $T = 250$ columns has top singular value $s_1 = 50$. Find the first factor's (uncentered) variance $\\frac{s_1^{2}}{T}$."), 10),
  mcq(m(ST, "apply-pervasive", "apply", 4, 30, "Why do pervasive factor eigenvalues grow roughly linearly in the number of assets $n$?"),
    "$\\mathbf{B}^{\\top}\\mathbf{B} = \\sum_i \\mathbf{b}_i\\mathbf{b}_i^{\\top} \\approx n\\,\\mathbb{E}[\\mathbf{b}\\mathbf{b}^{\\top}]$ when loadings are drawn from a common distribution",
    [
      ["Because idiosyncratic variances grow with $n$", "pervasive-idio", "Idiosyncratic eigenvalues stay bounded."],
      ["Because $T$ grows with $n$", "pervasive-T", "It holds for fixed $T$ in population."],
      ["Because factors are uncorrelated", "pervasive-uncorr", "Correlation isn't the driver."],
    ]),
  // level 5
  short(m(ST, "explain-ppca", "explain", 5, 120, "What does probabilistic PCA add to plain PCA, and what is its solution?"),
    [
      ["model", "It is a Gaussian factor model $\\mathbf{r} = \\mathbf{B}\\mathbf{f} + \\boldsymbol{\\epsilon}$ with equal idiosyncratic variances, fitted by maximum likelihood", 2, true],
      ["solution", "$\\hat{\\mathbf{B}} = \\mathbf{U}_m(\\mathbf{S}_m^{2} - \\hat{\\sigma}^{2}\\mathbf{I})^{1/2}$ with $\\hat{\\sigma}^{2}$ the average of the discarded eigenvalues: factor variances are shrunk sample eigenvalues; PCA is the limit $\\hat{\\sigma}^{2} \\to 0$", 2, true],
    ]),
  mcq(m(ST, "apply-svd-regression", "apply", 5, 30, "If you take $\\mathbf{B} = \\mathbf{U}_m$ from the SVD and run cross-sectional regressions of returns on it, the estimated factor returns are:"),
    "Exactly the SVD's factor returns $\\mathbf{S}_m\\mathbf{V}_m^{\\top}$",
    [
      ["Zero", "svdreg-zero", "They recover the SVD factors."],
      ["The singular values", "svdreg-sv", "Those are scales, not time series."],
      ["Different from the SVD's", "svdreg-different", "With orthonormal $\\mathbf{U}_m$, $\\mathbf{U}_m^{\\top}\\mathbf{R} = \\mathbf{S}_m\\mathbf{V}_m^{\\top}$."],
    ]),
  num(m(ST, "apply-max-var", "apply", 5, 35, "For $\\hat{\\boldsymbol{\\Omega}} = \\begin{bmatrix} 4 & 0 \\\\ 0 & 1 \\end{bmatrix}$, find the variance of the unit-norm portfolio $\\mathbf{w} = \\left[\\frac{1}{\\sqrt{2}}, \\frac{1}{\\sqrt{2}}\\right]$, and compare with the maximum. Report the portfolio's variance."), 2.5),
  num(m(ST, "apply-mle-noise-3", "apply", 5, 35, "PPCA with $m = 1$ on sample eigenvalues $8$, $2$, $1$, $1$: find $\\hat{\\sigma}^{2}$, the mean of the discarded eigenvalues. Give $4$ decimal places."), 1.3333),
  // level 6
  short(m(ST, "explain-svd-unique", "explain", 6, 150, "Paleologo notes that the SVD is the only factorization where loadings are the time-series betas of returns on the factor returns, and factor returns are the cross-sectional regression coefficients on the loadings. Explain why this is a satisfying property."),
    [
      ["consistency", "Both estimation directions agree: regressing over time on $\\hat{\\mathbf{F}}$ gives back $\\mathbf{U}_m$, and regressing across stocks on $\\mathbf{U}_m$ gives back $\\hat{\\mathbf{F}}$ — a fixed point", 2, true],
      ["use", "So loadings for assets outside the estimation universe can be imputed by time-series regression on the factor returns", 2, true],
    ]),
  num(m(ST, "apply-fmp-ratio", "apply", 6, 40, "A pervasive factor's mimicking portfolio has factor variance $1$ and idiosyncratic variance at most $\\frac{1}{Cn}$ with $C = 0.5$. Find the largest idiosyncratic share of its variance for $n = 2{,}000$. Give $4$ decimal places."), 0.001),
  num(m(ST, "apply-ppca-loading", "apply", 6, 45, "PPCA, one factor: top sample eigenvalue $9$, $\\hat{\\sigma}^{2} = 1$, eigenvector entry for stock 1 equal to $0.6$. The loading is $u_1\\sqrt{\\lambda_1 - \\hat{\\sigma}^{2}}$. Find it. Give $4$ decimal places."), 1.6971),
  mcq(m(ST, "apply-pca-limit", "apply", 6, 35, "PPCA's solution reduces to plain PCA when:"),
    "The idiosyncratic variance is negligible compared with factor variances",
    [
      ["There is only one asset", "pcalimit-one", "Unrelated."],
      ["The idiosyncratic variance is huge", "pcalimit-huge", "Then shrinkage matters most."],
      ["$T < n$", "pcalimit-T", "The limit concerns $\\hat{\\sigma}^{2}$."],
    ]),
  // level 7
  short(m(ST, "derive-pca-eigen", "explain", 7, 150, "Show that maximizing $\\mathbf{w}^{\\top}\\hat{\\boldsymbol{\\Omega}}\\mathbf{w}$ subject to $\\|\\mathbf{w}\\| = 1$ gives an eigenvector, and that the maximum is the top eigenvalue."),
    [
      ["lagrange", "The Lagrangian condition $2\\hat{\\boldsymbol{\\Omega}}\\mathbf{w} - 2\\lambda\\mathbf{w} = \\mathbf{0}$ is the eigenvalue equation $\\hat{\\boldsymbol{\\Omega}}\\mathbf{w} = \\lambda\\mathbf{w}$", 2, true],
      ["value", "At an eigenvector the objective equals $\\mathbf{w}^{\\top}\\lambda\\mathbf{w} = \\lambda$, so the best choice is the largest eigenvalue", 2, true],
    ]),
  num(m(ST, "apply-residual-frob", "apply", 7, 40, "A return matrix has singular values $20$, $10$, $3$, $2$. Find the squared Frobenius error of its best rank-$2$ approximation."), 13),
  num(m(ST, "apply-explained-sv", "apply", 7, 40, "For singular values $20$, $10$, $3$, $2$, find the fraction of the total sum of squares captured by rank $2$. Give $4$ decimal places."), 0.9747),
  mcq(m(ST, "apply-rotation-svd", "apply", 7, 40, "Any invertible $\\mathbf{C}$ gives an equally good low-rank fit $\\tilde{\\mathbf{B}} = \\mathbf{B}\\mathbf{C}$, $\\tilde{\\mathbf{F}} = \\mathbf{C}^{-1}\\mathbf{F}$. The SVD is a convenient choice because:"),
    "Its loadings are orthonormal and its factor returns are uncorrelated (in sample)",
    [
      ["It is the only exact fit", "rotsvd-only", "All rotations fit equally."],
      ["It gives the highest-variance loadings", "rotsvd-variance", "Loadings are unit norm."],
      ["It makes factors interpretable", "rotsvd-interpret", "Interpretation still takes work."],
    ]),
  // level 8
  short(m(ST, "explain-pervasive-fmp", "explain", 8, 150, "Explain why, with pervasive factors and many assets, factor-mimicking portfolios track factor returns almost perfectly."),
    [
      ["formula", "The FMP $\\mathbf{w}_i = \\mathbf{B}(\\mathbf{B}^{\\top}\\mathbf{B})^{-1}\\mathbf{e}_i$ has unit factor variance and idiosyncratic variance $\\mathbf{e}_i^{\\top}(\\mathbf{B}^{\\top}\\mathbf{B})^{-1}\\mathbf{e}_i$", 2, true],
      ["scale", "With pervasive factors the eigenvalues of $\\mathbf{B}^{\\top}\\mathbf{B}$ grow like $n$, so idiosyncratic variance shrinks like $\\frac{1}{n}$ — it diversifies away", 2, true],
    ]),
  num(m(ST, "apply-ppca-two", "apply", 8, 50, "PPCA with $m = 2$ on sample eigenvalues $12$, $6$, $2$, $1.5$, $1.5$, $1$: find the shrunk second factor variance $\\lambda_2 - \\hat{\\sigma}^{2}$, with $\\hat{\\sigma}^{2}$ the mean of the remaining eigenvalues."), 4.5),
  num(m(ST, "apply-ts-beta", "apply", 8, 45, "A factor return series has variance $4$ and a stock's covariance with it is $1.2$. Find the stock's imputed loading by time-series regression."), 0.3),
  mcq(m(ST, "apply-litterman", "apply", 8, 40, "Litterman and Scheinkman's three statistical factors of bond yields are usually interpreted as:"),
    "Level, slope (steepness) and curvature of the yield curve",
    [
      ["Value, momentum and size", "littsch-equity", "Those are equity styles."],
      ["Inflation, growth and credit", "littsch-macro", "Those are macro factors."],
      ["Duration, convexity and coupon", "littsch-bond", "Those are bond characteristics."],
    ]),
  // level 9
  short(m(ST, "transfer-complement", "transfer", 9, 180, "How can a statistical model complement an existing fundamental model in a production risk system?"),
    [
      ["detect", "Fit PCA to the fundamental model's residuals to detect missing structure, and push those statistical factors out into the model", 2, true],
      ["constrain", "In optimization, bound factor variance under both models simultaneously, guarding against each one's blind spots", 2, true],
    ]),
  short(m(ST, "explain-ml-bias", "explain", 9, 150, "Paleologo's PPCA simulations show sample factor variances biased up, PPCA-shrunk variances biased down, and the bias not constant. What does that suggest?"),
    [
      ["shrink", "Shrinkage of eigenvalues is necessary, but a constant offset is not optimal", 2, true],
      ["better", "Optimal shrinkage should depend on each eigenvalue's size and on $\\gamma$ (and the loss), as random-matrix theory prescribes", 2, true],
    ]),
  num(m(ST, "apply-n-for-fmp", "apply", 9, 60, "For the idiosyncratic share bound $\\frac{1}{Cn}$ of an FMP to fall below $0.001$ with $C = 0.25$, find the smallest $n$."), 4000),
  mcq(m(ST, "apply-uncentered", "apply", 9, 40, "Paleologo uses the uncentered covariance $\\frac{1}{T}\\mathbf{R}\\mathbf{R}^{\\top}$ for daily returns because:"),
    "Daily mean returns are tiny relative to volatility, so centering changes little and complicates the SVD link",
    [
      ["Centering is mathematically invalid", "uncent-invalid", "It's valid, just unnecessary."],
      ["Means are always exactly zero", "uncent-zero", "They're small, not zero."],
      ["It removes the market factor", "uncent-market", "It keeps it."],
    ]),
  // level 10
  short(m(ST, "judge-stat-vs-fund", "transfer", 10, 180, "When would you trust a statistical model over a fundamental one, and vice versa?"),
    [
      ["stat", "Statistical: short horizons, asset classes without characteristics, fast-changing regimes, or as a check for missing factors", 2, true],
      ["fund", "Fundamental: when interpretability, stable loadings, attribution to named factors and alpha research matter, and characteristics are informative", 2, true],
    ]),
  short(m(ST, "judge-pca-portfolio", "transfer", 10, 180, "A PM hedges the first five principal components of returns. What risks remain, and what could go wrong?"),
    [
      ["remaining", "Risk from weaker factors below the cut-off and idiosyncratic risk remain; the hedge targets estimated, not true, components", 2, true],
      ["wrong", "Sample eigenvectors of weaker components are noisy and turnover-heavy; degenerate components can rotate between periods, making the hedge unstable", 2, true],
    ]),
  num(m(ST, "apply-ppca-lik", "apply", 10, 90, "PPCA with $m = 1$ on $n = 4$ sample eigenvalues $9$, $1.5$, $1$, $0.5$. Find the estimated total variance of the model, $(\\lambda_1 - \\hat{\\sigma}^{2}) + n\\hat{\\sigma}^{2}$, and compare with the sample trace. Report the model's total."), 12),
  mcq(m(ST, "judge-err-more", "transfer", 10, 60, "Paleologo advises erring toward more factors rather than fewer because:"),
    "Missing factors leave unhedged common risk that optimizers exploit, while an extra weak factor mostly adds a little noise",
    [
      ["More factors always fit better out of sample", "errmore-fit", "Not always; the costs are asymmetric."],
      ["Fewer factors cause rank deficiency", "errmore-rank", "Unrelated."],
      ["Regulators require many factors", "errmore-regulators", "No such rule."],
    ]),
];

// ---------------------------------------------------------------------------
// eigenvalue-shrinkage
// ---------------------------------------------------------------------------
const EG = "eigenvalue-shrinkage";
const eigenvalueShrinkage: Item[] = [
  // level 1
  mcq(m(EG, "recall-bias", "recall", 1, 15, "In the spiked model, sample factor eigenvalues are:"),
    "Biased upward relative to the true factor variances",
    [
      ["Biased downward", "eigbias-down", "Noise adds variance along the estimated directions."],
      ["Unbiased", "eigbias-none", "They overshoot."],
      ["Always zero", "eigbias-zero", "They are large."],
    ]),
  mcq(m(EG, "recall-threshold", "recall", 1, 15, "A true (unit-noise) spike is detectable when it exceeds:"),
    "$1 + \\sqrt{\\gamma}$, with $\\gamma = \\frac{n}{T}$",
    [
      ["$1$", "eigthr-one", "Weak spikes above $1$ can be invisible."],
      ["$\\gamma$", "eigthr-gamma", "The threshold involves $\\sqrt{\\gamma}$."],
      ["$(1 + \\gamma)^{2}$", "eigthr-square", "That's not the BBP threshold."],
    ]),
  mcq(m(EG, "recall-scree", "recall", 1, 15, "The scree plot chooses the number of factors by:"),
    "Plotting eigenvalues against rank and cutting where the steep drop gives way to a slow, nearly linear decline",
    [
      ["Keeping eigenvalues above $1$", "scree-kaiser", "That's the Kaiser rule."],
      ["Keeping all eigenvalues", "scree-all", "That's no selection."],
      ["Cross-validating Sharpe ratios", "scree-sharpe", "It's a visual rule."],
    ]),
  mcq(m(EG, "recall-eigvec", "recall", 1, 15, "Below the detection threshold, the top sample eigenvector:"),
    "Carries asymptotically no information about the true factor direction",
    [
      ["Equals the true direction", "eigvec-equal", "Only strong spikes align well."],
      ["Is exactly the opposite direction", "eigvec-opposite", "It's orthogonal, not reversed."],
      ["Has zero length", "eigvec-zero", "Eigenvectors have unit norm."],
    ]),
  // level 2
  num(m(EG, "apply-gamma", "apply", 2, 15, "Find $\\gamma$ for $n = 1{,}000$ assets and $T = 250$ days."), 4),
  num(m(EG, "apply-threshold", "apply", 2, 20, "Find the detection threshold $1 + \\sqrt{\\gamma}$ for $\\gamma = 4$."), 3),
  num(m(EG, "apply-inflate", "apply", 2, 25, "A spike $\\ell = 10$ with $\\gamma = 4$: find the sample eigenvalue $\\ell\\left(1 + \\frac{\\gamma}{\\ell - 1}\\right)$. Give $4$ decimal places."), 14.4444),
  mcq(m(EG, "apply-large-spike", "apply", 2, 20, "For very large spikes, the relative upward bias of the sample eigenvalue:"),
    "Becomes small",
    [
      ["Grows without bound", "largespike-grow", "Relative bias $\\frac{\\gamma}{\\ell - 1}$ shrinks."],
      ["Stays constant", "largespike-constant", "It depends on $\\ell$."],
      ["Becomes negative", "largespike-negative", "It stays positive."],
    ]),
  // level 3
  num(m(EG, "apply-invert", "apply", 3, 30, "Invert the spike relation: an observed eigenvalue $\\lambda = 14.4444$ with $\\gamma = 4$ comes from which $\\ell$ (larger root of $\\ell^{2} - (\\lambda + 1 - \\gamma)\\ell + \\lambda = 0$)? Give $2$ decimal places."), 10),
  num(m(EG, "apply-offset", "apply", 3, 25, "For large $\\ell$, the shrinkage $\\ell \\approx \\lambda - \\gamma$ is a constant offset. Approximate $\\ell$ for $\\lambda = 50$ and $\\gamma = 4$."), 46),
  num(m(EG, "apply-count", "apply", 3, 25, "With unit noise and $\\gamma = 0.25$, the bulk edge is $(1 + \\sqrt{\\gamma})^{2}$. How many of the sample eigenvalues $9.1$, $4.0$, $2.6$, $2.1$, $1.9$ lie above it?"), 3),
  mcq(m(EG, "apply-max-gap", "apply", 3, 25, "The maximum-gap (Onatski-style) rule selects the number of factors $k$ that:"),
    "Maximizes the gap between the $k$-th and $(k+1)$-th eigenvalue (or their logs)",
    [
      ["Minimizes the gap", "maxgap-min", "It looks for the largest gap."],
      ["Maximizes the largest eigenvalue", "maxgap-largest", "That's always $k = 1$."],
      ["Keeps all positive eigenvalues", "maxgap-positive", "That's no selection."],
    ]),
  // level 4
  num(m(EG, "apply-cos", "apply", 4, 40, "For $\\ell = 10$ and $\\gamma = 4$, find the squared cosine between sample and true eigenvectors, $\\frac{1 - \\gamma/(\\ell - 1)^{2}}{1 + \\gamma/(\\ell - 1)}$. Give $4$ decimal places."), 0.6581),
  num(m(EG, "apply-gap-k", "apply", 4, 35, "Eigenvalues $12$, $5$, $3.1$, $2.9$, $2.8$. Using the largest gap between consecutive eigenvalues, how many factors are selected?"), 1),
  num(m(EG, "apply-log-gap", "apply", 4, 35, "For eigenvalues $12$, $9$, $2$, $1.8$, $1.7$, find the number of factors chosen by the largest gap in log eigenvalues."), 2),
  mcq(m(EG, "apply-heavy", "apply", 4, 30, "Paleologo's simulations found that for heavy-tailed ($t_5$) returns, the theoretical offset shrinkage works poorly, and better results come from:"),
    "Scaling the eigenvalues by a common factor (proportional shrinkage)",
    [
      ["No shrinkage", "heavy-none", "Sample eigenvalues remain biased."],
      ["Setting eigenvalues to one", "heavy-one", "That erases factor strength."],
      ["Doubling the eigenvalues", "heavy-double", "That inflates them further."],
    ]),
  // level 5
  short(m(EG, "explain-offset", "explain", 5, 120, "Why does a portfolio living in the span of the top sample eigenvectors have its predicted variance overstated?"),
    [
      ["bias", "Each spiked sample eigenvalue overstates its true variance (by roughly $\\gamma$ for strong spikes), so variance forecasts along those directions are too high", 2, true],
      ["fix", "Shrinking the eigenvalues (e.g. subtracting the offset, or the exact inverse map) corrects it", 2, true],
    ]),
  num(m(EG, "apply-pred-var", "apply", 5, 35, "A unit-norm portfolio along the top sample eigenvector has predicted variance $\\lambda = 50$ (unit noise, $\\gamma = 4$). Using $\\ell \\approx \\lambda - \\gamma$, what is its approximately true factor variance?"), 46),
  mcq(m(EG, "apply-more-factors", "apply", 5, 30, "Telling the exact number of factors is “either very easy or hopelessly hard” because:"),
    "With pervasive factors there is a wide gap; otherwise eigenvalues decline gradually and no rule finds a sharp cut",
    [
      ["Eigenvalues are always equal", "easyhard-equal", "They're not."],
      ["PCA can't be computed for large $n$", "easyhard-compute", "It can."],
      ["The number of factors is always $1$", "easyhard-one", "No."],
    ]),
  num(m(EG, "apply-threshold-T", "apply", 5, 40, "With $n = 1{,}000$ assets, how many observations make the detection threshold $1 + \\sqrt{\\gamma}$ equal $2$?"), 1000),
  // level 6
  short(m(EG, "explain-loss-matters", "explain", 6, 150, "Donoho, Gavish and Johnstone show that the optimal eigenvalue shrinkage depends on the loss. Why should a portfolio manager care which loss is used?"),
    [
      ["losses", "Different uses weigh errors differently: operator-norm loss on the covariance matters for worst-case volatility forecasts, loss on the precision matrix matters for optimization", 2, true],
      ["choice", "So the shrinkage should be chosen for the application (e.g. precision-matrix loss for an optimizer), not by a generic Frobenius criterion", 2, true],
    ]),
  num(m(EG, "apply-cos-strong", "apply", 6, 40, "For $\\ell = 50$, $\\gamma = 4$, find the squared cosine between sample and true eigenvectors. Give $3$ decimal places."), 0.923),
  num(m(EG, "apply-edge-gamma4", "apply", 6, 35, "For unit noise and $\\gamma = 4$, find the upper edge of the noise bulk $(1 + \\sqrt{\\gamma})^{2}$."), 9),
  mcq(m(EG, "apply-frobenius-critique", "apply", 6, 35, "Paleologo does not recommend Ledoit–Wolf-style Frobenius shrinkage of a spiked covariance because, among other reasons:"),
    "It is derived for fixed $n$ with $T \\to \\infty$, while in practice $n$ is comparable to or larger than $T$",
    [
      ["It is too hard to compute", "frobcrit-compute", "It's easy to compute."],
      ["It increases the condition number", "frobcrit-cond", "It decreases it."],
      ["It requires characteristics", "frobcrit-chars", "It doesn't."],
    ]),
  // level 7
  short(m(EG, "explain-penalty", "explain", 7, 150, "Describe penalty-based selection of the number of factors."),
    [
      ["form", "Minimize the residual sum of squares of the rank-$m$ fit plus a penalty increasing in $m$ (as in Bai and Ng's information criteria), trading fit against complexity", 2, true],
      ["choice", "The penalty depends on $n$ and $T$ so that the selected $m$ is consistent as both grow", 2, true],
    ]),
  num(m(EG, "apply-invert-2", "apply", 7, 45, "With $\\gamma = 2$, invert an observed eigenvalue $\\lambda = 10$: find the larger root of $\\ell^{2} - (\\lambda + 1 - \\gamma)\\ell + \\lambda = 0$. Give $4$ decimal places."), 7.7016),
  num(m(EG, "apply-linear-shrink", "apply", 7, 40, "A linear eigenvalue shrinkage $\\tilde{\\lambda} = 0.8\\lambda - 0.5$ is applied to $\\lambda = 20$. Find $\\tilde{\\lambda}$."), 15.5),
  mcq(m(EG, "apply-orthogonal-bias", "apply", 7, 40, "For portfolios orthogonal to the top sample eigenvectors, predicted variance (from bulk eigenvalues) tends to be:"),
    "Biased downward — the smallest sample eigenvalues understate risk",
    [
      ["Biased upward", "orthbias-up", "It's the spiked directions that overshoot."],
      ["Exactly right", "orthbias-exact", "The bulk is spread below and above."],
      ["Infinite", "orthbias-infinite", "It's finite."],
    ]),
  // level 8
  short(m(EG, "derive-offset", "explain", 8, 150, "Starting from $\\lambda = \\ell\\left(1 + \\frac{\\gamma}{\\ell - 1}\\right)$, show that for large $\\ell$ the bias is approximately the constant $\\gamma$."),
    [
      ["expand", "$\\lambda = \\ell + \\frac{\\gamma\\ell}{\\ell - 1} = \\ell + \\gamma\\left(1 + \\frac{1}{\\ell - 1}\\right)$", 2, true],
      ["limit", "As $\\ell \\to \\infty$, $\\frac{1}{\\ell - 1} \\to 0$, so $\\lambda - \\ell \\to \\gamma$ — a constant offset, as in PPCA", 2, true],
    ]),
  num(m(EG, "apply-bias-exact", "apply", 8, 40, "For $\\ell = 5$ and $\\gamma = 4$, find the bias $\\lambda - \\ell$."), 5),
  num(m(EG, "apply-cos-at-T", "apply", 8, 50, "A spike $\\ell = 4$ with $n = 500$ assets: find the squared eigenvector cosine for $T = 1{,}000$. Give $4$ decimal places."), 0.8095),
  mcq(m(EG, "apply-spike-scaling", "apply", 8, 40, "If factor eigenvalues grow linearly in $n$ (pervasive factors) while $\\gamma = \\frac{n}{T}$ also grows, the relative bias $\\frac{\\gamma}{\\ell - 1}$:"),
    "Stays bounded and can be small, since both numerator and denominator scale with $n$",
    [
      ["Explodes", "spikescale-explode", "$\\ell \\propto n$ offsets $\\gamma \\propto n$."],
      ["Is always zero", "spikescale-zero", "It's positive."],
      ["Becomes negative", "spikescale-negative", "It stays positive."],
    ]),
  // level 9
  short(m(EG, "transfer-choose-k", "transfer", 9, 180, "You must choose the number of factors for a statistical model of $3{,}000$ stocks with one year of daily data. Describe a practical procedure."),
    [
      ["candidates", "Standardize returns (e.g. by idio volatility), then get candidates from the bulk-edge threshold, scree/log-scree and max-gap rules", 2, true],
      ["validate", "Choose among them by out-of-sample risk tests (QLIKE, minimum-variance realized risk), erring toward more factors", 2, true],
    ]),
  short(m(EG, "explain-heavy-tails", "explain", 9, 150, "Why might the theoretical (Gaussian) eigenvalue shrinkage fail for real, heavy-tailed returns?"),
    [
      ["assumption", "The BBP formulas assume light tails (finite fourth moments in the limit theory) and identical noise; heavy tails inflate sample eigenvalues more and differently", 2, true],
      ["practice", "So calibrate the shrinkage empirically (e.g. proportional scaling or fitted linear shrinkage) and validate out of sample", 2, true],
    ]),
  num(m(EG, "apply-weakest-detect", "apply", 9, 60, "A daily model of $n = 2{,}000$ stocks uses $T = 500$ days. In units of (standardized) idiosyncratic variance, find the weakest detectable spike $1 + \\sqrt{\\gamma}$."), 3),
  mcq(m(EG, "apply-turnover-link", "apply", 9, 40, "Weak factors just above the detection threshold are problematic in production mainly because:"),
    "Their eigenvectors are poorly aligned and unstable, causing high factor turnover",
    [
      ["Their eigenvalues are too small to compute", "weak-compute", "They compute fine."],
      ["They are always the market", "weak-market", "The market is strong."],
      ["They make the covariance singular", "weak-singular", "They don't."],
    ]),
  // level 10
  short(m(EG, "judge-shrink-policy", "transfer", 10, 180, "Propose an eigenvalue shrinkage policy for a statistical risk model used by an optimizer, and justify it."),
    [
      ["spikes", "Shrink factor eigenvalues with the inverse BBP map (or a calibrated linear rule), and set the bulk to the estimated idiosyncratic level", 2, true],
      ["justify", "The optimizer uses the precision matrix, so choose shrinkage by precision-matrix loss or realized minimum-variance risk; validate under heavy tails", 2, true],
    ]),
  short(m(EG, "judge-too-few", "transfer", 10, 180, "What goes wrong in portfolio optimization if a statistical model uses too few factors?"),
    [
      ["hidden", "A real factor left in the residuals is treated as diversifiable idiosyncratic risk", 2, true],
      ["exploit", "The optimizer, seeking low-risk combinations, concentrates in that factor's direction; realized risk exceeds forecast", 2, true],
    ]),
  num(m(EG, "apply-two-step-ell", "apply", 10, 90, "With $\\gamma = 4$, an observed eigenvalue of $20$ is shrunk by the inverse map. Find the shrunk value. Give $4$ decimal places."), 15.7284),
  mcq(m(EG, "judge-donoho", "transfer", 10, 60, "Optimal eigenvalue shrinkers for the spiked model share which feature?"),
    "Eigenvalues inside the noise bulk are shrunk to the noise level, and spikes are pulled down by amounts that depend on $\\gamma$ and the loss",
    [
      ["Every eigenvalue is shrunk by the same fraction", "donoho-same", "That's linear shrinkage, generally suboptimal here."],
      ["Spikes are inflated", "donoho-inflate", "They're deflated."],
      ["Eigenvectors are replaced too", "donoho-vectors", "These shrinkers keep eigenvectors."],
    ]),
];

// ---------------------------------------------------------------------------
// pca-models-in-practice
// ---------------------------------------------------------------------------
const PP = "pca-models-in-practice";
const pcaInPractice: Item[] = [
  // level 1
  mcq(m(PP, "recall-normalize", "recall", 1, 15, "Paleologo finds that PCA on returns divided by idiosyncratic volatility, compared with raw returns:"),
    "Concentrates more variance in fewer factors and gives more stable eigenfactors",
    [
      ["Spreads variance over more factors", "norm-spread", "It concentrates it."],
      ["Gives identical results", "norm-identical", "Normalization changes the spectrum."],
      ["Removes the market factor", "norm-market", "The market is still the first factor."],
    ]),
  mcq(m(PP, "recall-sign", "recall", 1, 15, "Eigenvectors from consecutive PCAs must be aligned because:"),
    "An eigenvector is defined only up to sign, so it can flip between periods",
    [
      ["Eigenvectors always change sign", "sign-always", "They may or may not flip."],
      ["Eigenvalues can be negative", "sign-eigvals", "Covariance eigenvalues are non-negative."],
      ["PCA is random", "sign-random", "It's deterministic given the data."],
    ]),
  mcq(m(PP, "recall-pc1-market", "recall", 1, 15, "Regressing the first principal component's loadings on style characteristics typically shows it is:"),
    "Overwhelmingly the market (intercept) factor",
    [
      ["Momentum", "pc1-momentum", "That appears in later components."],
      ["Size", "pc1-size", "Size shows up in the second component."],
      ["Uninterpretable", "pc1-uninterp", "The first is the easiest to interpret."],
    ]),
  mcq(m(PP, "recall-two-stage", "recall", 1, 15, "Two-stage PCA first estimates proxy idiosyncratic volatilities and then:"),
    "Reruns PCA on returns divided by those volatilities",
    [
      ["Drops the most volatile stocks", "twostage-drop", "It reweights rather than drops."],
      ["Uses a fundamental model", "twostage-fund", "It stays statistical."],
      ["Averages the two PCAs", "twostage-average", "The second stage replaces the first."],
    ]),
  // level 2
  num(m(PP, "apply-turnover", "apply", 2, 20, "Two consecutive unit-norm eigenvectors have cosine similarity $0.9$. Find the quadratic turnover $2(1 - |\\cos|)$."), 0.2),
  num(m(PP, "apply-flip", "apply", 2, 25, "Two consecutive eigenvectors have cosine $-0.95$. After flipping the sign of the new one, find the quadratic turnover."), 0.1),
  num(m(PP, "apply-half-life-weight", "apply", 2, 25, "Time weights are $e^{-t/\\tau}$ with $\\tau = 90$ days. Find the weight on an observation $90$ days old relative to today's (weight $1$). Give $4$ decimal places."), 0.3679),
  mcq(m(PP, "apply-impute", "apply", 2, 20, "Loadings for a stock outside the estimation universe but with a full return history can be imputed by:"),
    "Time-series regression of its returns on the estimated factor returns",
    [
      ["Copying the loadings of the largest stock", "impute-copy", "That ignores the stock's own behaviour."],
      ["Setting them to zero", "impute-zero", "That claims no factor risk."],
      ["Rerunning PCA including only that stock", "impute-alone", "One stock can't define factors."],
    ]),
  // level 3
  num(m(PP, "apply-raw-factors", "apply", 3, 25, "For one period Paleologo reports that $50\\%$ of variance needed $30$ factors on raw returns but $10$ on idio-vol-normalized returns. Find the ratio."), 3),
  num(m(PP, "apply-turnover1", "apply", 3, 30, "An eigenportfolio moves from $[0.6, 0.8]$ to $[0.8, 0.6]$. Find the gross-value turnover $\\frac{\\sum_i|v_i(t) - v_i(t - 1)|}{\\sum_j|v_j(t - 1)|}$. Give $4$ decimal places."), 0.2857),
  num(m(PP, "apply-quad-turnover", "apply", 3, 30, "For the same move, find the quadratic turnover $\\|\\mathbf{v}(t) - \\mathbf{v}(t - 1)\\|^{2}$."), 0.08),
  mcq(m(PP, "apply-degenerate", "apply", 3, 25, "High turnover of individual eigenfactors with nearly equal eigenvalues matters most for:"),
    "Single-factor performance attribution",
    [
      ["Portfolio volatility forecasts", "degen-vol", "The covariance doesn't depend on the rotation within the subspace."],
      ["Optimization with total factor-risk constraints", "degen-opt", "Those depend only on the subspace."],
      ["Idiosyncratic risk", "degen-idio", "Unaffected."],
    ]),
  // level 4
  num(m(PP, "apply-procrustes-1d", "apply", 4, 35, "For one factor, the rotation minimizing $\\|\\mathbf{B}_t - \\mathbf{B}_{t+1}x\\|^{2}$ with $x^{2} = 1$ is $x = \\text{sign}(\\mathbf{B}_t^{\\top}\\mathbf{B}_{t+1})$. If $\\mathbf{B}_t^{\\top}\\mathbf{B}_{t+1} = -0.9$, find $x$."), -1),
  num(m(PP, "apply-loading-scale", "apply", 4, 35, "In two-stage PCA the final loadings are $\\mathbf{B} = \\mathbf{W}^{-1}\\hat{\\mathbf{U}}_m$ with $\\mathbf{W} = \\text{diag}(\\sigma_i^{-1})$. A stock has $\\sigma_i = 0.02$ and $[\\hat{\\mathbf{U}}_m]_{i1} = 0.05$. Find its loading."), 0.001),
  num(m(PP, "apply-subspace-sim", "apply", 4, 40, "Subspace similarity uses $1 - \\sigma_1(\\mathbf{A}^{\\top}\\mathbf{B})$, where $\\sigma_1$ is the top singular value. If $\\mathbf{A}^{\\top}\\mathbf{B} = \\text{diag}(0.99, 0.95)$, find it."), 0.01),
  mcq(m(PP, "apply-vol-corr-scales", "apply", 4, 30, "The two-stage procedure uses a fast half-life for volatilities and a slow one for correlations because:"),
    "Volatilities change within days (up to fourfold in crises) while correlations are comparatively stable",
    [
      ["Correlations change faster", "scales-reverse", "It's the opposite."],
      ["It reduces computation", "scales-compute", "The reason is statistical."],
      ["Both change at the same speed", "scales-same", "They don't."],
    ]),
  // level 5
  short(m(PP, "explain-clustering", "explain", 5, 120, "Explain the clustering interpretation of principal-component loadings."),
    [
      ["relaxation", "K-means with cluster-indicator vectors (scaled to unit norm, orthogonal) becomes, after relaxing the discrete constraint, the same trace maximization as uncentered PCA (Ding and He)", 2, true],
      ["use", "So loadings act as soft cluster memberships; clustering the loadings of the first few components reveals groups of similar stocks", 2, true],
    ]),
  mcq(m(PP, "apply-pc2", "apply", 5, 30, "Paleologo's example second component loads positively on dividend yield and size and negatively on short-term momentum. He reads it as:"),
    "A defensive, “risk-off” factor",
    [
      ["A pure momentum factor", "pc2-momentum", "Momentum enters negatively, alongside value and size."],
      ["The market factor", "pc2-market", "That's the first component."],
      ["Noise", "pc2-noise", "It has a coherent interpretation."],
    ]),
  num(m(PP, "apply-regression-interpret", "apply", 5, 35, "A component's loadings regressed on two orthogonal unit-norm characteristic vectors give inner products $0.8$ and $0.3$ with them. Find the fraction of the (unit-norm) loading vector's squared norm they explain."), 0.73),
  num(m(PP, "apply-quad-from-cos", "apply", 5, 30, "Find the quadratic turnover for consecutive eigenvectors with cosine $0.6$."), 0.8),
  // level 6
  short(m(PP, "explain-procrustes", "explain", 6, 150, "Explain how to rotate this period's loadings to be as close as possible to last period's without changing the model, and give the solution."),
    [
      ["problem", "Minimize $\\|\\mathbf{B}_t - \\mathbf{B}_{t+1}\\mathbf{X}\\|_F$ over orthogonal $\\mathbf{X}$ — equivalent to maximizing $\\text{tr}(\\mathbf{A}\\mathbf{X})$ with $\\mathbf{A} = \\mathbf{B}_t^{\\top}\\mathbf{B}_{t+1}$ (orthogonal Procrustes / Wahba's problem)", 2, true],
      ["solution", "With $\\mathbf{A} = \\mathbf{U}\\mathbf{S}\\mathbf{V}^{\\top}$, $\\mathbf{X} = \\mathbf{V}\\mathbf{U}^{\\top}$; the covariance is unchanged, so this costs nothing", 2, true],
    ]),
  num(m(PP, "apply-procrustes-2d", "apply", 6, 50, "Two-factor loadings satisfy $\\mathbf{B}_t^{\\top}\\mathbf{B}_{t+1} = \\begin{bmatrix} 0 & 1 \\\\ 1 & 0 \\end{bmatrix}$ (the factors swapped order). The optimal $\\mathbf{X}$ is also a swap. Find $\\text{tr}(\\mathbf{A}\\mathbf{X})$ at the optimum."), 2),
  num(m(PP, "apply-idio-proxy", "apply", 6, 45, "After removing $p = 5$ components, a stock's residual returns over $4$ days are $0.01$, $-0.02$, $0.01$, $0$. Find its proxy idiosyncratic variance $\\sum_t \\epsilon_t^{2}$ in units of $10^{-4}$."), 6),
  mcq(m(PP, "apply-p-zero", "apply", 6, 35, "In two-stage PCA, setting $p = 0$ (no first-stage factors removed) makes the reweighting:"),
    "Divide by total volatility, so the second stage is PCA on the correlation matrix",
    [
      ["Divide by idiosyncratic volatility", "pzero-idio", "With no factors removed, residuals are total returns."],
      ["Do nothing", "pzero-nothing", "It still z-scores."],
      ["Remove all factors", "pzero-all", "It removes none."],
    ]),
  // level 7
  short(m(PP, "explain-universe", "explain", 7, 150, "Statistical models face a changing estimation universe. What is the dilemma, and how should missing loadings be handled?"),
    [
      ["dilemma", "Using today's universe brings in stocks whose past returns may be unreliable (recent IPOs, illiquid periods); using past universes changes the model's assets over time", 2, true],
      ["impute", "Assets with good return histories get loadings by time-series regression on factor returns; new or long-untraded assets get loadings imputed from characteristics (regression of loadings on characteristics)", 2, true],
    ]),
  num(m(PP, "apply-cos-quad", "apply", 7, 40, "Quadratic turnover between consecutive eigenvectors is $0.5$. Find $|\\cos|$ between them."), 0.75),
  num(m(PP, "apply-ewma-norm", "apply", 7, 45, "Exponential time weights $e^{-t/\\tau}$ for $t = 1, 2, \\dots$ are normalized to sum to one. For $\\tau = 1$, find the normalized weight on $t = 1$, i.e. $1 - e^{-1/\\tau}$. Give $4$ decimal places."), 0.6321),
  mcq(m(PP, "apply-impute-justify", "apply", 7, 40, "Imputing loadings by time-series regression is justified because:"),
    "For the SVD, time-series regression of returns on the factor returns recovers exactly the loadings",
    [
      ["Regression always gives true betas", "impjust-always", "It depends on the factor returns being accurate."],
      ["Loadings are constant over time", "impjust-constant", "That's not the argument."],
      ["Characteristics are unavailable", "impjust-chars", "That's why characteristics aren't used, not why regression works."],
    ]),
  // level 8
  short(m(PP, "explain-degenerate-invariance", "explain", 8, 150, "Why doesn't instability of individual eigenfactors with nearly equal variances affect risk forecasts or factor-risk-constrained optimization?"),
    [
      ["invariance", "If the factor covariance is proportional to the identity on a subspace, any orthonormal basis of that subspace gives the same $\\mathbf{B}\\boldsymbol{\\Omega}_f\\mathbf{B}^{\\top}$", 2, true],
      ["consequence", "So portfolio volatility, and constraints on total factor risk, depend only on the subspace, which is stable; only single-factor attribution is affected", 2, true],
    ]),
  num(m(PP, "apply-normalized-factor", "apply", 8, 45, "Returns are divided by idiosyncratic volatility $\\sigma_i$ before PCA. A stock with $\\sigma_i = 0.03$ has normalized-space loading $0.04$ and the factor has variance $9$ in normalized space. Find the stock's factor variance in raw return units. Give $8$ decimal places."), 0.00001296),
  num(m(PP, "apply-subspace-angle", "apply", 8, 45, "The smallest singular value of $\\mathbf{A}^{\\top}\\mathbf{B}$ for two orthonormal $3$-dimensional subspaces is $0.9$. This is the cosine of the largest principal angle. Find the angle in degrees. Give $2$ decimal places."), 25.84),
  mcq(m(PP, "apply-subspace-stable", "apply", 8, 40, "Paleologo finds the distance between consecutive top-eight eigen-subspaces is tiny even when individual eigenvectors churn. This means:"),
    "The risk model's factor subspace is stable; churn is a rotation within it",
    [
      ["The model is useless", "substable-useless", "The subspace, which drives risk, is stable."],
      ["The eigenvalues are wrong", "substable-eig", "It's about eigenvectors."],
      ["All factors are identical", "substable-identical", "They span different directions."],
    ]),
  // level 9
  short(m(PP, "design-statmodel", "transfer", 9, 180, "Outline a production procedure for a daily statistical risk model."),
    [
      ["estimation", "Time-weight returns (fast half-life), first-stage SVD, proxy idio volatilities from residuals, reweight, second-stage SVD with a slow half-life, PPCA-style shrinkage", 2, true],
      ["maintenance", "Align signs and rotate (Procrustes) to limit turnover, manage the estimation universe, impute loadings for others, and validate with out-of-sample risk tests", 2, true],
    ]),
  short(m(PP, "transfer-interpret", "transfer", 9, 180, "Your statistical model's third component has no obvious meaning. How would you interpret it?"),
    [
      ["regression", "Regress its loadings on a set of style and industry characteristics to see which explain it", 2, true],
      ["clustering", "Inspect or cluster the stocks with extreme loadings and examine its factor-return history around known events", 2, true],
    ]),
  num(m(PP, "apply-procrustes-angle", "apply", 9, 60, "In two dimensions, this period's loadings equal last period's rotated by $30^{\\circ}$. The optimal Procrustes rotation undoes it, and $\\text{tr}(\\mathbf{A}\\mathbf{X})$ at the optimum equals $2$. Find $\\text{tr}(\\mathbf{A})$ before rotating ($X = \\mathbf{I}$), i.e. $2\\cos 30^{\\circ}$. Give $4$ decimal places."), 1.7321),
  mcq(m(PP, "apply-correlation-pca", "apply", 9, 40, "Running PCA on the correlation matrix rather than the covariance matrix is motivated by:"),
    "Correlations being more stable than covariances, as in Bollerslev's constant-correlation idea and some commercial statistical models",
    [
      ["Correlations having larger eigenvalues", "corrpca-larger", "Scale isn't the reason."],
      ["Covariances being unavailable", "corrpca-unavailable", "Both are available."],
      ["Removing the market factor", "corrpca-market", "The market remains."],
    ]),
  // level 10
  short(m(PP, "judge-normalization", "transfer", 10, 180, "Normalizing returns by idiosyncratic volatility makes eigenvalues more concentrated. Is that evidence the normalized model is better? Discuss."),
    [
      ["not-proof", "Not by itself: variance explained is not a measure of risk-model performance", 2, true],
      ["support", "But it brings the data closer to the spiked model's assumptions (equal noise), and the more stable eigenfactors support it; confirm with out-of-sample risk tests", 2, true],
    ]),
  short(m(PP, "judge-attribution", "transfer", 10, 180, "A PM wants factor-by-factor attribution from a statistical model whose eigenfactors churn. What would you recommend?"),
    [
      ["rotate", "Apply Procrustes rotation each period so loadings stay as close as possible to the previous period's", 2, true],
      ["group", "Report attribution for the stable subspace (or for interpretable rotations, e.g. regressed on styles) rather than for individual degenerate eigenfactors", 2, true],
    ]),
  num(m(PP, "apply-share-normalized", "apply", 10, 90, "A normalized-returns PCA has eigenvalues $40$, $10$, $5$ followed by $995$ eigenvalues of $1$. Find the fraction of total variance explained by the top three. Give $4$ decimal places."), 0.0524),
  mcq(m(PP, "judge-new-ipo", "transfer", 10, 60, "A large IPO has two weeks of returns. The best way to give it statistical-model loadings is:"),
    "Impute from characteristics (industry, size) via a regression of loadings on characteristics for existing stocks",
    [
      ["Time-series regression on two weeks of data", "ipo-short-ts", "Far too few observations."],
      ["Zero loadings until a year of data", "ipo-zero", "That ignores obvious factor risk."],
      ["Copy the loadings of the market index", "ipo-index", "Ignores its industry and style."],
    ]),
];

export const qi07Items: Item[] = [...statisticalModels, ...eigenvalueShrinkage, ...pcaInPractice];
