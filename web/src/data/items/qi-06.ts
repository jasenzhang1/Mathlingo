import type { Item } from "../../lib/assessment/types";
import { m, mcq, num, short } from "./qi-shared";

/**
 * Quantitative Investing, part 6: fundamental factor models — cross-sectional
 * regression, the factor and idiosyncratic covariances, winsorization, and the
 * classic style factors (Paleologo, Ch. 6). Forty questions per lesson, four
 * at each level.
 */

// ---------------------------------------------------------------------------
// cross-sectional-factor-regression
// ---------------------------------------------------------------------------
const CS = "cross-sectional-factor-regression";
const crossSectional: Item[] = [
  // level 1
  mcq(m(CS, "recall-inputs", "recall", 1, 15, "In a fundamental (characteristic) factor model, each period's factor returns are estimated by:"),
    "Regressing the cross-section of asset returns $\\mathbf{r}_t$ on the known loadings $\\mathbf{B}_t$",
    [
      ["Regressing each stock's returns over time on the market", "csr-time-series", "That estimates betas, as in a macro or single-index model."],
      ["Taking principal components of returns", "csr-pca", "That is a statistical model."],
      ["Averaging returns across all stocks", "csr-average", "That gives only one factor, without using loadings."],
    ]),
  mcq(m(CS, "recall-wls", "recall", 1, 15, "The weighted least squares estimate of factor returns with weight matrix $\\mathbf{W}$ is:"),
    "$\\hat{\\mathbf{f}}_t = (\\mathbf{B}^{\\top}\\mathbf{W}\\mathbf{B})^{-1}\\mathbf{B}^{\\top}\\mathbf{W}\\mathbf{r}_t$",
    [
      ["$\\hat{\\mathbf{f}}_t = \\mathbf{B}^{\\top}\\mathbf{r}_t$", "wls-no-inverse", "That ignores the scale and correlation of the loadings."],
      ["$\\hat{\\mathbf{f}}_t = (\\mathbf{B}\\mathbf{B}^{\\top})^{-1}\\mathbf{r}_t$", "wls-wrong-gram", "$\\mathbf{B}\\mathbf{B}^{\\top}$ is $n \\times n$ and singular."],
      ["$\\hat{\\mathbf{f}}_t = \\mathbf{W}\\mathbf{r}_t$", "wls-no-loadings", "Loadings must enter."],
    ]),
  mcq(m(CS, "recall-weights", "recall", 1, 15, "The natural WLS weights for stock $i$ in the cross-sectional regression are proportional to:"),
    "$\\frac{1}{\\sigma_{\\epsilon, i}^{2}}$, the inverse idiosyncratic variance",
    [
      ["The stock's market capitalization", "weights-cap", "Cap weighting is a common proxy, but the optimal weight is the inverse residual variance."],
      ["$\\sigma_{\\epsilon, i}^{2}$", "weights-variance", "Noisy stocks should count less, not more."],
      ["The stock's return", "weights-return", "Weights must not depend on the dependent variable."],
    ]),
  mcq(m(CS, "recall-steps", "recall", 1, 15, "Which is the right order of the main steps in building a fundamental model?"),
    "Winsorize returns, build loadings, choose the estimation universe, run cross-sectional regressions, then estimate covariances",
    [
      ["Estimate covariances, then run regressions", "steps-cov-first", "Covariances are estimated from the regression outputs."],
      ["Run regressions, then build loadings", "steps-loadings-last", "Loadings are inputs to the regressions."],
      ["Winsorize the factor covariance first", "steps-winsor-cov", "Winsorization applies to returns before regression."],
    ]),
  // level 2
  num(m(CS, "apply-market-wls", "apply", 2, 25, "A one-factor (country) model has loadings $1$ for all three stocks. Returns are $0.01$, $0.02$ and $0.03$, with WLS weights $1$, $1$ and $2$. Find $\\hat{f}$. Give $4$ decimal places."), 0.0225),
  num(m(CS, "apply-two-factor", "apply", 2, 30, "Loadings: country $[1, 1, 1]$ and style $[1, 0, -1]$; returns $[0.03, 0.01, 0.02]$; equal weights. The columns are orthogonal. Find the style factor return."), 0.005),
  num(m(CS, "apply-weight-ratio", "apply", 2, 20, "Stock A has idiosyncratic variance $0.04$ and stock B has $0.01$. Find the ratio of A's WLS weight to B's."), 0.25),
  mcq(m(CS, "apply-random-design", "apply", 2, 20, "In the cross-sectional regression, what is observed and what is estimated?"),
    "Returns and loadings are observed; factor returns and idiosyncratic returns are estimated",
    [
      ["Factor returns are observed; loadings are estimated", "design-macro", "That is a macroeconomic model."],
      ["Everything is observed", "design-all", "Factor returns are latent."],
      ["Only returns are observed", "design-stat", "That is a statistical model."],
    ]),
  // level 3
  num(m(CS, "apply-country-term", "apply", 3, 25, "For the returns $[0.03, 0.01, 0.02]$ with country loadings $[1, 1, 1]$ and style loadings $[1, 0, -1]$ (equal weights), find the country factor return."), 0.02),
  num(m(CS, "apply-residual", "apply", 3, 30, "With country return $0.02$ and style return $0.005$, find the idiosyncratic return of the stock with loadings $[1, -1]$ and return $0.02$."), 0.005),
  num(m(CS, "apply-se-market", "apply", 3, 30, "A country-only model weights $100$ stocks by inverse idiosyncratic variance; each has daily idiosyncratic volatility $0.02$. The factor's standard error is $\\left(\\sum_i \\sigma_i^{-2}\\right)^{-1/2}$. Find it."), 0.002),
  mcq(m(CS, "apply-why-unbiased", "apply", 3, 25, "Paleologo favours (weighted) least squares for the cross-sectional regression partly because unbiased factor returns matter for:"),
    "Performance attribution, where small biases accumulate over many periods",
    [
      ["Faster computation", "unbiased-speed", "Speed isn't the argument."],
      ["Making returns Gaussian", "unbiased-gaussian", "Regression doesn't change the distribution of returns."],
      ["Eliminating the need for winsorization", "unbiased-winsor", "Outliers still matter."],
    ]),
  // level 4
  num(m(CS, "apply-null-dim", "apply", 4, 35, "A loadings matrix has a country column of ones and $10$ industry dummies (each stock in exactly one industry). Find the dimension of its null space."), 1),
  num(m(CS, "apply-multi-country-null", "apply", 4, 40, "A global model has $10$ industry dummies and $5$ country dummies (each stock in one industry and one country), and no intercept. Find the rank deficiency (dimension of the null space)."), 1),
  num(m(CS, "apply-wls-two", "apply", 4, 40, "A country-only model: two stocks with returns $0.04$ and $0.01$ and idiosyncratic variances $0.04$ and $0.01$. Find the WLS factor return with weights $\\frac{1}{\\sigma^{2}}$."), 0.016),
  mcq(m(CS, "apply-annihilator", "apply", 4, 30, "With a country column first and then $K$ industry dummies, which vector $\\mathbf{v}$ satisfies $\\mathbf{B}\\mathbf{v} = \\mathbf{0}$?"),
    "$\\mathbf{v} = [1, -1, -1, \\dots, -1]$",
    [
      ["$\\mathbf{v} = [1, 1, \\dots, 1]$", "annih-ones", "That gives $2$ for every stock."],
      ["$\\mathbf{v} = [0, 1, \\dots, 1]$", "annih-industries", "That gives $1$ for every stock."],
      ["No such vector exists", "annih-none", "The country column equals the sum of the industry columns."],
    ]),
  // level 5
  short(m(CS, "explain-rank-deficiency", "explain", 5, 120, "Why does a model with a country factor and a full set of industry dummies have a rank-deficient loadings matrix, and what are three ways to fix it?"),
    [
      ["cause", "Every stock is in exactly one industry, so the industry columns sum to the country column of ones: the columns are linearly dependent", 2, true],
      ["fixes", "Drop a factor, add a small ridge penalty $\\lambda\\|\\mathbf{f}\\|^{2}$, or impose linear constraints $\\mathbf{C}\\mathbf{f} = \\mathbf{a}$ (e.g. cap-weighted industry returns sum to zero)", 2, true],
    ]),
  mcq(m(CS, "apply-ridge-cost", "apply", 5, 30, "The drawback of resolving the degeneracy with a ridge penalty is that:"),
    "Factor return estimates are no longer unbiased",
    [
      ["The regression becomes non-convex", "ridge-convex", "Ridge keeps it convex."],
      ["It removes an industry from the model", "ridge-remove", "That's the drop-a-factor fix."],
      ["It changes the loadings", "ridge-loadings", "Loadings are unchanged."],
    ]),
  mcq(m(CS, "apply-constraint-meaning", "apply", 5, 30, "The constraint that cap-weighted industry factor returns sum to zero can be read as:"),
    "The cap-weighted benchmark has no net industry return, so its return is carried by the country factor",
    [
      ["Every industry has zero return", "constr-each-zero", "Only the weighted sum is zero."],
      ["The country factor return is zero", "constr-country", "The country factor absorbs the market return."],
      ["Industries are uncorrelated", "constr-uncorrelated", "It's a level constraint, not a correlation one."],
    ]),
  num(m(CS, "apply-se-ratio", "apply", 5, 35, "If the number of stocks in the cross-section quadruples (same idiosyncratic variances), by what factor does the standard error of a country factor's estimate change?"), 0.5),
  // level 6
  short(m(CS, "explain-constraint-invariance", "explain", 6, 150, "Different valid constraints $\\mathbf{C}\\mathbf{f} = \\mathbf{a}$ give different factor returns and factor covariances. Why don't they change any portfolio's risk?"),
    [
      ["form", "Constrained solutions differ by a vector in the null space of $\\mathbf{B}$: $\\mathbf{f} = \\mathbf{H}\\mathbf{f}^{*} + \\text{const}$ with $\\mathbf{B}\\mathbf{H} = \\mathbf{B}$", 2, true],
      ["risk", "So $\\mathbf{B}\\mathbf{f}$ is unchanged and $\\mathbf{w}^{\\top}\\mathbf{B}\\mathbf{H}\\hat{\\boldsymbol{\\Omega}}_f\\mathbf{H}^{\\top}\\mathbf{B}^{\\top}\\mathbf{w} = \\mathbf{w}^{\\top}\\mathbf{B}\\hat{\\boldsymbol{\\Omega}}_f\\mathbf{B}^{\\top}\\mathbf{w}$; the constant offset doesn't affect covariances", 2, true],
    ]),
  num(m(CS, "apply-fmp-weight", "apply", 6, 40, "In a country-only model with WLS weights $w_i$, the factor-mimicking portfolio holds $\\frac{w_i}{\\sum_j w_j}$ in stock $i$. With weights $[1, 1, 2]$, find the holding in the third stock."), 0.5),
  num(m(CS, "apply-two-stock-se", "apply", 6, 45, "A country-only model weights two stocks with idiosyncratic variances $0.04$ and $0.01$ by $\\frac{1}{\\sigma^{2}}$. Find the variance of the factor estimate, $\\left(\\sum_i\\sigma_i^{-2}\\right)^{-1}$."), 0.008),
  mcq(m(CS, "apply-fmp-meaning", "apply", 6, 35, "The rows of $(\\mathbf{B}^{\\top}\\mathbf{W}\\mathbf{B})^{-1}\\mathbf{B}^{\\top}\\mathbf{W}$ are:"),
    "Portfolios (factor-mimicking portfolios) whose returns equal the estimated factor returns",
    [
      ["The factor loadings", "fmprow-loadings", "Loadings are the columns of $\\mathbf{B}$."],
      ["The residual returns", "fmprow-residuals", "Residuals are $\\mathbf{r} - \\mathbf{B}\\hat{\\mathbf{f}}$."],
      ["The factor covariance", "fmprow-cov", "That is $\\boldsymbol{\\Omega}_f$."],
    ]),
  // level 7
  short(m(CS, "explain-heteroskedasticity", "explain", 7, 150, "Explain why weighting by inverse idiosyncratic variance is the right choice, using the transformation $\\boldsymbol{\\Omega}_\\epsilon^{-1/2}$."),
    [
      ["transform", "Pre-multiplying $\\mathbf{r}_t = \\mathbf{B}\\mathbf{f}_t + \\boldsymbol{\\epsilon}_t$ by $\\boldsymbol{\\Omega}_\\epsilon^{-1/2}$ makes the residuals homoskedastic with unit variance", 2, true],
      ["gauss-markov", "OLS on the transformed model is BLUE and equals WLS with $\\mathbf{W} = \\boldsymbol{\\Omega}_\\epsilon^{-1}$, so noisy stocks don't dominate the estimate", 2, true],
    ]),
  num(m(CS, "apply-fit-two-factor", "apply", 7, 45, "Using country return $0.02$ and style return $0.005$ with style loadings $[1, 0, -1]$, find the sum of squared residuals for returns $[0.03, 0.01, 0.02]$."), 0.00015),
  num(m(CS, "apply-se-two-factor", "apply", 7, 45, "With equal weights and residual variance $\\sigma^{2} = 0.0004$, the covariance of OLS factor estimates is $\\sigma^{2}(\\mathbf{B}^{\\top}\\mathbf{B})^{-1}$. For orthogonal columns $[1, 1, 1]$ and $[1, 0, -1]$, find the variance of the style estimate."), 0.0002),
  mcq(m(CS, "apply-universe", "apply", 7, 40, "Which criterion is $\\textbf{NOT}$ one of Paleologo's for the estimation universe?"),
    "Stocks with the highest recent returns",
    [
      ["Tradability (liquidity)", "univ-tradable", "Factor-mimicking portfolios hold these stocks."],
      ["Data quality (well-discovered prices)", "univ-quality", "Prices must be reliable for the regression."],
      ["Relevance to the strategy's investment universe", "univ-relevance", "It should overlap the traded universe."],
    ]),
  // level 8
  short(m(CS, "derive-constrained", "explain", 8, 150, "Starting from the minimum-norm solution $\\mathbf{f}^{*}$ and a null-space basis $\\mathbf{V}$ ($\\mathbf{B}\\mathbf{V} = \\mathbf{0}$), derive the solution satisfying $\\mathbf{C}\\mathbf{f} = \\mathbf{a}$."),
    [
      ["family", "All least-squares solutions are $\\mathbf{f}^{*} + \\mathbf{V}\\mathbf{x}$", 1, true],
      ["solve", "Impose $\\mathbf{C}(\\mathbf{f}^{*} + \\mathbf{V}\\mathbf{x}) = \\mathbf{a}$: $\\mathbf{x} = (\\mathbf{C}\\mathbf{V})^{-1}(\\mathbf{a} - \\mathbf{C}\\mathbf{f}^{*})$, giving $\\mathbf{f} = \\left(\\mathbf{I} - \\mathbf{V}(\\mathbf{C}\\mathbf{V})^{-1}\\mathbf{C}\\right)\\mathbf{f}^{*} + \\mathbf{V}(\\mathbf{C}\\mathbf{V})^{-1}\\mathbf{a}$", 2, true],
      ["condition", "Requires $\\mathbf{C}\\mathbf{V}$ to be invertible", 1, true],
    ]),
  num(m(CS, "apply-industry-shift", "apply", 8, 50, "Two stocks: stock 1 in industry A, stock 2 in industry B, plus a country factor. Returns $0.03$ and $0.01$. Imposing equal-weighted industry returns summing to zero, find the country factor return."), 0.02),
  num(m(CS, "apply-industry-a", "apply", 8, 45, "In the same setup (returns $0.03$ and $0.01$, industry returns summing to zero), find industry A's factor return."), 0.01),
  mcq(m(CS, "apply-closing-auction", "apply", 8, 40, "Paleologo stresses the closing auction when defining daily returns because:"),
    "The model is only reliable if its prices are ones at which trades could actually execute",
    [
      ["Auction prices are always higher", "auction-higher", "Direction isn't the point."],
      ["Auctions remove all noise", "auction-noise", "They concentrate liquidity; noise remains."],
      ["Intraday prices are illegal to use", "auction-illegal", "Any executable price can be used."],
    ]),
  // level 9
  short(m(CS, "transfer-periodicity", "transfer", 9, 180, "How should the liquidity of the universe influence the periodicity of a fundamental model (daily versus $30$-minute returns)?"),
    [
      ["noise", "Shorter intervals make prices noisier (bid–ask, stale quotes); illiquid stocks have poorly discovered prices at short horizons", 2, true],
      ["choice", "So high-frequency models should restrict the universe to very liquid stocks, while broad universes call for daily or longer periods", 2, true],
    ]),
  short(m(CS, "explain-fama-macbeth", "explain", 9, 150, "How does the time series of cross-sectional factor returns relate to Fama–MacBeth regression?"),
    [
      ["same", "Fama–MacBeth runs a cross-sectional regression each period and averages the coefficients — the same per-period regressions as a fundamental model", 2, true],
      ["use", "Their mean and its time-series standard error test whether a characteristic earns a premium; the model additionally uses their covariance for risk", 2, true],
    ]),
  num(m(CS, "apply-gls-general", "apply", 9, 60, "Country-only model with three stocks: returns $[0.02, 0.01, -0.01]$, idiosyncratic variances $[0.01, 0.02, 0.04]$. Find the WLS factor return with weights $\\frac{1}{\\sigma^{2}}$. Give $4$ decimal places."), 0.0129),
  mcq(m(CS, "apply-high-r2", "apply", 9, 40, "A colleague adds $20$ new style factors and reports a higher cross-sectional $R^{2}$. This shows:"),
    "Little — in-sample $R^{2}$ always rises with factors; the model must be judged on out-of-sample risk tests",
    [
      ["The new factors are real", "r2-real", "Random factors also raise $R^{2}$."],
      ["The covariance forecasts improved", "r2-cov", "$R^{2}$ doesn't measure that."],
      ["The model overfits for sure", "r2-overfit", "It might or might not; $R^{2}$ can't tell."],
    ]),
  // level 10
  short(m(CS, "judge-drop-vs-constrain", "transfer", 10, 180, "A PM complains that the model dropped her main industry to fix rank deficiency. Argue for the constraint approach instead."),
    [
      ["interpretability", "Constraints keep every industry and the country factor, so exposures are complete and interpretable (country exposure says net long/short)", 2, true],
      ["equivalence", "Risk is identical under any valid constraint, so nothing is lost; constraints like zero cap-weighted industry return give natural meanings to factor returns", 2, true],
    ]),
  short(m(CS, "judge-wls-weights", "transfer", 10, 180, "Practitioners often weight the cross-sectional regression by the square root of market cap rather than by inverse idiosyncratic variance. Why might that be a reasonable proxy, and what is the risk?"),
    [
      ["proxy", "Large caps tend to have lower idiosyncratic volatility, so $\\sqrt{\\text{cap}}$ roughly tracks $\\frac{1}{\\sigma_\\epsilon^{2}}$, and it is stable and known in advance", 2, true],
      ["risk", "If the proxy mismatches true residual variances, estimates are less efficient; very large caps can dominate the regression", 2, true],
    ]),
  num(m(CS, "apply-se-advantage", "apply", 10, 90, "Country-only model, two stocks with idiosyncratic variances $0.04$ and $0.01$. Find the ratio of the OLS (equal-weight) estimator's variance to the WLS estimator's variance."), 1.5625),
  mcq(m(CS, "judge-time-varying-b", "transfer", 10, 60, "Loadings change daily as characteristics update. In the regression, this means:"),
    "Each period uses that period's loadings $\\mathbf{B}_t$; formulas are unchanged, but factor-mimicking portfolios trade as loadings move",
    [
      ["The model can't be estimated", "tvb-impossible", "Per-period regressions handle it."],
      ["Loadings must be averaged over time first", "tvb-average", "That would use stale and future information."],
      ["Factor returns become unbiased only weekly", "tvb-weekly", "Unbiasedness doesn't depend on the update frequency."],
    ]),
];

// ---------------------------------------------------------------------------
// factor-covariance-estimation
// ---------------------------------------------------------------------------
const FC = "factor-covariance-estimation";
const factorCovariance: Item[] = [
  // level 1
  mcq(m(FC, "recall-inflation", "recall", 1, 15, "The sample covariance of estimated factor returns $\\hat{\\mathbf{f}}_t$ tends to:"),
    "Overstate the true factor covariance, by the estimation-error covariance $(\\mathbf{B}^{\\top}\\boldsymbol{\\Omega}_\\epsilon^{-1}\\mathbf{B})^{-1}$",
    [
      ["Understate it", "infl-under", "Estimation noise adds variance."],
      ["Equal it exactly", "infl-equal", "Regression noise inflates it."],
      ["Be singular", "infl-singular", "With $T > m$ it is usually invertible."],
    ]),
  mcq(m(FC, "recall-lw", "recall", 1, 15, "Ledoit–Wolf shrinkage toward a scaled identity replaces the sample covariance $\\mathbf{S}$ by:"),
    "$(1 - \\rho)\\mathbf{S} + \\rho\\mu\\mathbf{I}$, with $\\mu = \\frac{\\text{tr}(\\mathbf{S})}{m}$",
    [
      ["$\\mathbf{S} + \\rho\\mathbf{I}$", "lw-add", "Shrinkage is a convex combination."],
      ["$\\rho\\mathbf{S}$", "lw-scale", "That only rescales."],
      ["$\\mathbf{S}^{-1}$", "lw-inverse", "Shrinkage doesn't invert."],
    ]),
  mcq(m(FC, "recall-vol-corr", "recall", 1, 15, "Practitioners often estimate factor volatilities and correlations:"),
    "Separately, with exponential weights of different half-lives (longer for correlations)",
    [
      ["With equal weights over all history", "volcorr-equal", "Recent data get more weight."],
      ["With the same half-life always", "volcorr-same", "Correlations need more data to estimate."],
      ["Only from option prices", "volcorr-options", "They're estimated from factor returns."],
    ]),
  mcq(m(FC, "recall-nw", "recall", 1, 15, "Newey–West correction of the factor covariance addresses:"),
    "Autocorrelation in factor returns, which makes daily covariances misstate longer-horizon risk",
    [
      ["Heavy tails", "nw-tails", "That's handled by robust methods or winsorizing."],
      ["Rank deficiency of the loadings", "nw-rank", "That's a regression issue."],
      ["Missing industries", "nw-missing", "Unrelated."],
    ]),
  // level 2
  num(m(FC, "apply-correction", "apply", 2, 25, "A factor's estimated returns have sample variance $0.0005$ and the regression's estimation-error variance is $0.0001$. Find the corrected factor variance."), 0.0004),
  num(m(FC, "apply-lw-diag", "apply", 2, 25, "Shrink $\\mathbf{S} = \\begin{bmatrix} 0.04 & 0.012 \\\\ 0.012 & 0.01 \\end{bmatrix}$ toward $\\mu\\mathbf{I}$ with $\\mu = \\frac{\\text{tr}(\\mathbf{S})}{2}$ and $\\rho = 0.3$. Find the new $(1, 1)$ entry."), 0.0355),
  num(m(FC, "apply-lw-off", "apply", 2, 20, "In the same shrinkage, find the new off-diagonal entry."), 0.0084),
  mcq(m(FC, "apply-shrink-eigen", "apply", 2, 20, "Shrinking toward a scaled identity changes the sample covariance's:"),
    "Eigenvalues (pulled toward their mean), not its eigenvectors",
    [
      ["Eigenvectors, not eigenvalues", "shrinkeig-vectors", "Adding a multiple of $\\mathbf{I}$ keeps eigenvectors."],
      ["Neither", "shrinkeig-neither", "Eigenvalues move toward $\\mu$."],
      ["Trace", "shrinkeig-trace", "The trace is preserved by this target."],
    ]),
  // level 3
  num(m(FC, "apply-rel-se", "apply", 3, 25, "The relative standard error of a variance estimated from $T$ i.i.d. Gaussian observations is $\\sqrt{\\frac{2}{T}}$. Find it for $T = 500$. Give $4$ decimal places."), 0.0632),
  num(m(FC, "apply-corrected-vol", "apply", 3, 25, "A factor's estimated returns have sample variance $0.0005$ and estimation-error variance $0.0001$. Find the corrected daily volatility."), 0.02),
  num(m(FC, "apply-nw-lag1", "apply", 3, 30, "A factor has daily variance $C_0 = 0.0001$ and lag-one autocovariance $C_1 = 0.00001$. With one lag, Newey–West gives $C_0 + \\frac{1}{2}(2C_1)$. Find it."), 0.00011),
  mcq(m(FC, "apply-stfu-why", "apply", 3, 25, "Short-term factor updating (STFU) exists because long-half-life EWMA covariances:"),
    "React too slowly when volatility jumps at the onset of a crisis (and when it falls back)",
    [
      ["React too quickly", "stfu-quick", "Long half-lives are sluggish."],
      ["Are not positive definite", "stfu-pd", "EWMA covariances are positive semidefinite."],
      ["Ignore factor correlations", "stfu-corr", "They include correlations."],
    ]),
  // level 4
  num(m(FC, "apply-horizon-scale", "apply", 4, 40, "Daily returns have variance $\\sigma^{2}$ and lag-one autocorrelation $0.1$ (none beyond). By what factor is the variance of a $T$-day sum, for large $T$, larger than $T\\sigma^{2}$?"), 1.2),
  num(m(FC, "apply-stfu-scale", "apply", 4, 40, "Over the last few days a factor's returns divided by its model volatility have mean square $2.25$. If STFU scales variance by that amount, by what factor does the factor's volatility rise?"), 1.5),
  num(m(FC, "apply-cond-number", "apply", 4, 45, "A $2 \\times 2$ sample covariance has eigenvalues $0.045$ and $0.005$. Shrinking toward $\\mu\\mathbf{I}$ ($\\mu$ = mean eigenvalue) with $\\rho = 0.3$, find the new condition number (largest over smallest eigenvalue). Give $4$ decimal places."), 3.5455),
  mcq(m(FC, "apply-why-shrink", "apply", 4, 30, "Shrinkage helps factor covariances most when:"),
    "The number of factors is not much smaller than the number of observations",
    [
      ["There are very few factors and decades of data", "whyshrink-many-obs", "Then the sample covariance is already precise."],
      ["Factor returns are exactly Gaussian", "whyshrink-gaussian", "Shrinkage helps regardless of normality."],
      ["Factors are uncorrelated", "whyshrink-uncorr", "Estimation error exists anyway."],
    ]),
  // level 5
  short(m(FC, "explain-fmp-inflation", "explain", 5, 120, "Explain, using factor-mimicking portfolios, why the covariance of estimated factor returns overstates the true factor covariance."),
    [
      ["fmp", "Each estimated factor return is the return of its mimicking portfolio: true factor return plus that portfolio's idiosyncratic return", 2, true],
      ["cov", "So $\\text{Cov}(\\hat{\\mathbf{f}}) = \\boldsymbol{\\Omega}_f + (\\mathbf{B}^{\\top}\\boldsymbol{\\Omega}_\\epsilon^{-1}\\mathbf{B})^{-1}$; subtracting the second term debiases it", 2, true],
    ]),
  mcq(m(FC, "apply-half-lives", "apply", 5, 30, "In daily equity models, typical half-lives for the factor covariance are:"),
    "Months (roughly three months to a year), with longer half-lives for correlations than for volatilities",
    [
      ["One or two days", "hl-days", "Far too noisy for a covariance."],
      ["Ten years", "hl-decade", "Far too slow to adapt."],
      ["The same as for STFU (10–20 days)", "hl-stfu", "STFU is a short-term overlay on top."],
    ]),
  num(m(FC, "apply-stfu-hl", "apply", 5, 35, "An STFU filter uses a half-life of $15$ days. Find its decay $\\lambda = 0.5^{1/15}$. Give $4$ decimal places."), 0.9548),
  num(m(FC, "apply-lw-trace", "apply", 5, 30, "Shrinking $\\mathbf{S}$ with trace $0.05$ toward $\\frac{\\text{tr}(\\mathbf{S})}{m}\\mathbf{I}$ with $\\rho = 0.4$, find the trace of the result."), 0.05),
  // level 6
  short(m(FC, "explain-vol-corr-split", "explain", 6, 150, "Why estimate volatilities and correlations with different half-lives, and how are they recombined?"),
    [
      ["why", "Volatilities change quickly and are estimated precisely from little data; correlations need more observations and are more stable, so they get longer half-lives", 2, true],
      ["combine", "$\\hat{\\boldsymbol{\\Omega}}_f = \\mathbf{V}\\mathbf{C}\\mathbf{V}$, with $\\mathbf{V}$ the diagonal of volatilities and $\\mathbf{C}$ the correlation matrix (correlations from volatility-standardized returns)", 2, true],
    ]),
  num(m(FC, "apply-recombine", "apply", 6, 40, "Two factors have volatilities $0.02$ and $0.01$ and correlation $0.3$. Find their covariance."), 0.00006),
  num(m(FC, "apply-nw-two-lags", "apply", 6, 45, "A factor has $C_0 = 0.0001$, $C_1 = 0.00002$ and $C_2 = 0.00001$. Newey–West with $L = 2$ uses weights $1 - \\frac{l}{L + 1}$ on $2C_l$. Find the estimate. Give $7$ decimal places."), 0.0001333),
  mcq(m(FC, "apply-dcc", "apply", 6, 35, "Dynamic conditional correlation (DCC) models extend constant-correlation models by:"),
    "Letting the correlation matrix itself evolve over time, alongside GARCH-type volatilities",
    [
      ["Fixing volatilities and correlations", "dcc-fixed", "DCC makes correlations dynamic."],
      ["Removing volatilities from the model", "dcc-no-vol", "Volatilities are still modelled."],
      ["Using only one factor", "dcc-one", "It is multivariate."],
    ]),
  // level 7
  short(m(FC, "explain-stfu", "explain", 7, 150, "Describe the idea of short-term factor updating as a state-space model, and its effect on the covariance."),
    [
      ["model", "Factor returns are scaled by a latent common multiplier $e^{x_t/2}$; taking logs of squared standardized returns gives a linear observation of $x_t$, filtered with a short half-life (10–20 days)", 2, true],
      ["effect", "The covariance is multiplied by about $e^{\\hat{x}_t}$: if recent standardized returns are larger than one, risk is revised up quickly, and down when the shock fades", 2, true],
    ]),
  num(m(FC, "apply-annual-autocorr", "apply", 7, 45, "A factor's daily volatility is $1\\%$ and its lag-one autocorrelation is $0.15$ (none beyond). Find its annualised volatility in percent over $252$ days, accounting for autocorrelation. Give $1$ decimal place."), 18.1),
  num(m(FC, "apply-debias-matrix", "apply", 7, 45, "In the simple case $\\mathbf{B}^{\\top}\\mathbf{B} = \\mathbf{I}$, $\\boldsymbol{\\Omega}_\\epsilon = \\sigma^{2}\\mathbf{I}$ with $\\sigma^{2} = 0.0004$, the debiasing subtracts $\\sigma^{2}\\mathbf{I}$. If a factor's sample variance is $0.0009$, find its corrected variance."), 0.0005),
  mcq(m(FC, "apply-crisis-lag", "apply", 7, 40, "Without a short-term update, the main practical danger of a long-half-life factor covariance is that investors:"),
    "Severely underestimate systematic risk exactly when it matters most, at the start of a crisis",
    [
      ["Overestimate risk at the start of a crisis", "crisislag-over", "The estimate lags upward moves."],
      ["Trade too little", "crisislag-trade", "The issue is risk measurement."],
      ["Get a non-invertible covariance", "crisislag-singular", "Invertibility is unaffected."],
    ]),
  // level 8
  short(m(FC, "explain-nw-weights", "explain", 8, 150, "Why does Newey–West use declining weights $1 - \\frac{l}{L + 1}$ on the lagged covariances rather than simply adding them?"),
    [
      ["psd", "The declining (Bartlett) weights guarantee a positive semidefinite estimate", 2, true],
      ["noise", "They also damp noisy high-lag autocovariance estimates; with $L$ growing slowly with $T$ the estimator is consistent", 2, true],
    ]),
  num(m(FC, "apply-lw-full", "apply", 8, 50, "$\\mathbf{S} = \\begin{bmatrix} 0.09 & 0.03 \\\\ 0.03 & 0.01 \\end{bmatrix}$ is shrunk toward $\\mu\\mathbf{I}$ with $\\rho = 0.5$. Find the correlation implied by the shrunk matrix. Give $4$ decimal places."), 0.3273),
  num(m(FC, "apply-fmp-cov", "apply", 8, 45, "Two factor-mimicking portfolios have true factor covariance $0.0002$ and estimation-error covariance $[(\\mathbf{B}^{\\top}\\boldsymbol{\\Omega}_\\epsilon^{-1}\\mathbf{B})^{-1}]_{12} = 0.00005$. Find the covariance of their returns."), 0.00025),
  mcq(m(FC, "apply-pairwise", "apply", 8, 40, "Estimating factor covariances from pairwise-complete observations (when markets have different holidays) risks:"),
    "A matrix that is not positive definite, which must then be repaired (e.g. by shrinking cross-block covariances)",
    [
      ["Biased factor returns", "pairwise-bias", "The regressions are unaffected."],
      ["Too few factors", "pairwise-factors", "The factor set is unchanged."],
      ["Infinite variances", "pairwise-infinite", "Variances stay finite."],
    ]),
  // level 9
  short(m(FC, "design-factor-cov", "transfer", 9, 180, "Design the factor covariance estimator for a daily US equity model with $70$ factors and two years of data."),
    [
      ["base", "EWMA volatilities (shorter half-life) and correlations (longer), debiased for estimation error and shrunk (e.g. Ledoit–Wolf) since $m$ is not small relative to $T$", 2, true],
      ["extras", "Newey–West for autocorrelation when forecasting longer horizons, and an STFU overlay for fast regime changes; validate with QLIKE and minimum-variance tests", 2, true],
    ]),
  short(m(FC, "explain-asynchroneity", "explain", 9, 150, "In a global model, markets close at different times. What does this do to estimated factor covariances and how can it be addressed?"),
    [
      ["effect", "Same-day returns of different markets reflect different information, understating contemporaneous correlation and creating lagged cross-correlation", 2, true],
      ["fix", "Aggregate returns over several days, apply Newey–West to capture lagged covariances, or model asynchronous returns in a state-space framework", 2, true],
    ]),
  num(m(FC, "apply-shrink-target-eig", "apply", 9, 60, "A $3 \\times 3$ sample covariance has eigenvalues $3$, $1$ and $0.2$. Shrink toward the mean eigenvalue with $\\rho = 0.5$. Find the smallest eigenvalue of the result."), 0.8),
  mcq(m(FC, "apply-relative-error", "apply", 9, 40, "Estimating a factor's variance from $T = 126$ days instead of $T = 504$ days multiplies its relative standard error by:"),
    "$2$",
    [
      ["$4$", "relerr-four", "It scales like $\\frac{1}{\\sqrt{T}}$."],
      ["$\\sqrt{2}$", "relerr-root-two", "$\\sqrt{504/126} = 2$."],
      ["$1$", "relerr-one", "Less data, more error."],
    ]),
  // level 10
  short(m(FC, "judge-debias-risk", "transfer", 10, 180, "Debiasing subtracts $(\\mathbf{B}^{\\top}\\boldsymbol{\\Omega}_\\epsilon^{-1}\\mathbf{B})^{-1}$ from the sample factor covariance. What can go wrong, and how would you guard against it?"),
    [
      ["negative", "If the correction is large relative to the sample covariance (thin factors, noisy idio estimates), the result can lose positive definiteness or give tiny/negative variances", 2, true],
      ["guard", "Combine with shrinkage toward a well-conditioned target, floor eigenvalues, and check the factor's realized FMP variance", 2, true],
    ]),
  short(m(FC, "judge-local-global", "transfer", 10, 180, "Explain the idea of linking local models into a global one with a block-diagonal rotation $\\mathbf{C}^{(i)} = \\mathbf{V}_{ii}^{-1/2}\\left(\\hat{\\boldsymbol{\\Omega}}_f^{(i)}\\right)^{1/2}$."),
    [
      ["goal", "Keep each local model's own factor covariance (estimated with all its data) for local portfolios, while borrowing cross-market covariances from an integrated model", 2, true],
      ["mechanism", "Rotating each diagonal block of the integrated covariance to match the local one and applying the same rotation to off-diagonal blocks aligns them with minimal change; block shrinkage can follow", 2, true],
    ]),
  num(m(FC, "apply-nw-annual-vol", "apply", 10, 90, "A factor has daily variance $0.0001$, lag-one autocovariance $0.00002$ and lag-two autocovariance $0.00001$. Using the long-run variance $C_0 + 2C_1 + 2C_2$ (no down-weighting), find its annualised volatility in percent over $252$ days. Give $2$ decimal places."), 20.08),
  mcq(m(FC, "judge-which-target", "transfer", 10, 60, "For a factor covariance with very different factor volatilities (market $1\\%$ daily, a style $0.2\\%$), shrinking toward $\\mu\\mathbf{I}$ is problematic because:"),
    "It drags small-volatility factors' variances up and the market's down; shrinking the correlation matrix toward the identity (keeping volatilities) is safer",
    [
      ["Shrinkage can't be applied to factors", "target-cant", "It can, with a sensible target."],
      ["It makes the matrix singular", "target-singular", "Shrinking toward $\\mu\\mathbf{I}$ improves conditioning."],
      ["It changes the trace", "target-trace", "This target preserves the trace."],
    ]),
];

// ---------------------------------------------------------------------------
// idiosyncratic-risk-estimation
// ---------------------------------------------------------------------------
const IR = "idiosyncratic-risk-estimation";
const idioRisk: Item[] = [
  // level 1
  mcq(m(IR, "recall-source", "recall", 1, 15, "Idiosyncratic variances are estimated from:"),
    "The residuals $\\hat{\\boldsymbol{\\epsilon}}_t = \\mathbf{r}_t - \\mathbf{B}_t\\hat{\\mathbf{f}}_t$ of the cross-sectional regressions",
    [
      ["The factor returns", "idiosrc-factors", "Factor returns feed the factor covariance."],
      ["Raw returns, ignoring factors", "idiosrc-raw", "That would double-count factor risk."],
      ["Analyst forecasts", "idiosrc-analyst", "They're estimated from residuals."],
    ]),
  mcq(m(IR, "recall-diagonal", "recall", 1, 15, "Why can't you simply use the sample covariance of residuals as $\\boldsymbol{\\Omega}_\\epsilon$?"),
    "With $T < n$ it is neither sparse nor positive definite",
    [
      ["Residuals have zero variance", "diag-zero", "They have positive variance."],
      ["It is always diagonal already", "diag-already", "Sample correlations are never exactly zero."],
      ["It needs factor returns", "diag-factors", "It needs residuals, which are available."],
    ]),
  mcq(m(IR, "recall-winsor", "recall", 1, 15, "Winsorizing a return means:"),
    "Capping its magnitude at a threshold rather than deleting it",
    [
      ["Deleting it", "winsor-delete", "That's trimming."],
      ["Replacing it with zero", "winsor-zero", "That discards its sign and size entirely."],
      ["Replacing it with the median", "winsor-median", "Winsorizing keeps the sign and caps the size."],
    ]),
  mcq(m(IR, "recall-genuine", "recall", 1, 15, "Large returns caused by genuine news (earnings surprises, mergers) should:"),
    "Generally be kept in estimation, because removing them distorts factor returns and risk",
    [
      ["Always be deleted", "genuine-delete", "They are real risk."],
      ["Be set to zero", "genuine-zero", "That hides real losses."],
      ["Be doubled", "genuine-double", "No reason to inflate them."],
    ]),
  // level 2
  num(m(IR, "apply-robust-z", "apply", 2, 25, "A stock returns $-20\\%$ today; the median of its recent absolute log returns is $0.015$. Find the robust z-score $\\frac{|\\log(1 + r)|}{\\text{median}}$. Give $2$ decimal places."), 14.88),
  num(m(IR, "apply-shrink-var", "apply", 2, 25, "A stock's estimated idiosyncratic variance is $0.09$ and its peer group's average is $0.04$. With weight $0.6$ on its own estimate, find the shrunk variance."), 0.07),
  num(m(IR, "apply-idio-ewma", "apply", 2, 25, "With $\\lambda = 0.98$, yesterday's idiosyncratic variance estimate is $0.0004$ and today's residual is $0.05$. Find the new estimate. Give $6$ decimal places."), 0.000442),
  mcq(m(IR, "apply-share-classes", "apply", 2, 20, "BRK.A and BRK.B have nearly identical returns. For a fundamental long-only strategy, the model should:"),
    "Include only one representative (usually the most liquid) share class",
    [
      ["Include both with diagonal residual covariance", "share-both-diag", "That treats them as independent — badly wrong."],
      ["Exclude Berkshire entirely", "share-exclude", "One class suffices."],
      ["Average their prices", "share-average", "They have different values per share."],
    ]),
  // level 3
  num(m(IR, "apply-winsorize", "apply", 3, 30, "A stock's typical absolute daily log return is $0.015$ and the winsorization threshold is $10$ robust z-scores. A return of $-20\\%$ is capped at $|\\log(1 + r)| = 0.15$. Find the winsorized simple return. Give $4$ decimal places."), -0.1393),
  num(m(IR, "apply-earnings-scale", "apply", 3, 30, "Near earnings, idiosyncratic variance is scaled by $(1 - a) + ae^{\\hat{x}}$. With $a = 0.5$ and $e^{\\hat{x}} = 4$, find the scale factor."), 2.5),
  num(m(IR, "apply-diversified", "apply", 3, 25, "A portfolio holds $\\$1$M in each of $25$ stocks with uncorrelated idiosyncratic volatility $30\\%$. Find its idiosyncratic volatility in millions."), 1.5),
  mcq(m(IR, "apply-tent", "apply", 3, 25, "The earnings “tent” variable $a_{i,t}$ is:"),
    "Largest on the earnings date and decays to zero outside a window around it",
    [
      ["Constant over the quarter", "tent-constant", "It concentrates updates near earnings."],
      ["Zero on the earnings date", "tent-zero", "It peaks there."],
      ["Equal to the stock's beta", "tent-beta", "Unrelated to beta."],
    ]),
  // level 4
  num(m(IR, "apply-cluster-threshold", "apply", 4, 35, "Residual correlations are thresholded at $0.55$. Among the pairs with correlations $0.62$, $-0.58$, $0.40$, $0.55$ and $-0.20$, how many have absolute value strictly above the threshold?"), 2),
  num(m(IR, "apply-pair-var", "apply", 4, 40, "Two share classes each have idiosyncratic variance $0.04$ with residual correlation $0.95$. A long $\\$1$ / short $\\$1$ position has true idiosyncratic variance $2\\sigma^{2}(1 - \\rho)$. Find it."), 0.004),
  num(m(IR, "apply-pair-diag", "apply", 4, 35, "In the same pair, a diagonal idiosyncratic model would report the variance of the long/short position as $2\\sigma^{2}$. By what factor does it overstate the true variance?"), 20),
  mcq(m(IR, "apply-ah-shares", "apply", 4, 30, "Mainland A shares and Hong Kong H shares of the same company show highly correlated residuals. A good modelling response is:"),
    "Model the dependence explicitly (e.g. a factor or off-diagonal block for the pair) rather than assuming they are identical or independent",
    [
      ["Treat them as the same security", "ah-same", "They trade at different prices and aren't identical."],
      ["Assume independent residuals", "ah-independent", "That misstates spread risk."],
      ["Drop both", "ah-drop", "Information is lost."],
    ]),
  // level 5
  short(m(IR, "explain-visual", "explain", 5, 120, "Why does Paleologo recommend visually inspecting the residual correlation matrix before forcing it to be diagonal?"),
    [
      ["patterns", "Striking residual correlation patterns reveal missing factors or linked securities (share classes, dual listings, clusters)", 2, true],
      ["cost", "Setting off-diagonal terms to zero is a radical shrinkage that hides real risk if such structure exists", 2, true],
    ]),
  mcq(m(IR, "apply-outlier-sources", "apply", 5, 30, "Which outlier source should be fixed by choosing the universe rather than by winsorizing?"),
    "Very illiquid micro-caps and stocks trading OTC near delisting or bankruptcy",
    [
      ["Earnings surprises", "outsrc-earnings", "Genuine news should stay."],
      ["Stray prints in liquid stocks", "outsrc-stray", "Those are fixed by inspecting price traces."],
      ["Merger announcements", "outsrc-merger", "Genuine news."],
    ]),
  num(m(IR, "apply-short-term-update", "apply", 5, 35, "A stock's long-half-life idiosyncratic volatility is $25\\%$. Within its earnings window ($a = 1$) the filter estimates $e^{\\hat{x}} = 2.25$. Find the updated volatility in percent. Give $1$ decimal place."), 37.5),
  num(m(IR, "apply-bayes-weight", "apply", 5, 40, "A stock's idiosyncratic variance estimate has sampling variance $0.0004$, and true variances in its peer group scatter with variance $0.0001$ around the group mean. The optimal weight on the stock's own estimate is $\\frac{0.0001}{0.0001 + 0.0004}$. Find it."), 0.2),
  // level 6
  short(m(IR, "explain-why-shrink", "explain", 6, 150, "Why shrink individual idiosyncratic variances toward a peer-group value, and how should the shrinkage weight be chosen?"),
    [
      ["why", "Single-stock estimates are noisy; extreme estimates are partly noise, so pulling them toward similar stocks (same industry/size) reduces error — empirical Bayes", 2, true],
      ["weight", "Weight the stock's own estimate more when it is precise (long history, stable) and less when the sampling noise is large relative to true dispersion among peers", 2, true],
    ]),
  num(m(IR, "apply-ewma-normaliser", "apply", 6, 40, "An EWMA with half-life $\\tau = 126$ days uses weights proportional to $e^{-t/\\tau'}$ with $\\tau' = \\frac{\\tau}{\\log 2}$. Find the daily decay factor $e^{-1/\\tau'}$. Give $4$ decimal places."), 0.9945),
  num(m(IR, "apply-cluster-portfolio", "apply", 6, 45, "Five stocks in a residual cluster each have idiosyncratic variance $0.04$ and pairwise residual correlation $0.5$. Find the idiosyncratic variance of an equal-weighted $\\$1$-each long position."), 0.6),
  mcq(m(IR, "apply-winsor-effect", "apply", 6, 35, "Winsorizing a large genuine return in the cross-sectional regression distorts the estimated factor return because:"),
    "The factor return is a portfolio's return, and the portfolio's true return used the unwinsorized stock return",
    [
      ["Regression can't handle large values", "winseff-cant", "It can; the issue is fidelity to real PnL."],
      ["It changes the loadings", "winseff-loadings", "Loadings are unchanged."],
      ["It makes the residuals correlated", "winseff-corr", "That's not the main effect."],
    ]),
  // level 7
  short(m(IR, "explain-winsor-rules", "explain", 7, 150, "State Paleologo's two rules for winsorization in research and production, and why they matter."),
    [
      ["report", "Report every winsorized data point and examine them one by one — they may be data errors or real events", 2, true],
      ["universe", "Keep the investment universe to liquid, tradable assets, so most remaining outliers are genuine and few need capping", 2, true],
    ]),
  num(m(IR, "apply-diag-cluster", "apply", 7, 45, "For the five-stock cluster (variances $0.04$, correlation $0.5$, $\\$1$ each), a diagonal model reports variance $5 \\times 0.04$. By what factor does it understate the true variance?"), 3),
  num(m(IR, "apply-earnings-vol", "apply", 7, 45, "A stock's idiosyncratic volatility is $20\\%$. Near earnings, with $a = 0.6$ and $e^{\\hat{x}} = 3$, find the adjusted volatility in percent. Give $2$ decimal places."), 29.66),
  mcq(m(IR, "apply-threshold-choice", "apply", 7, 40, "When clustering residual correlations by thresholding, a good threshold is one where clusters are:"),
    "Stable under small changes of the threshold, interpretable, and the resulting matrix stays positive definite",
    [
      ["As large as possible", "thresh-large", "Large clusters may be spurious."],
      ["Exactly one per industry", "thresh-industry", "Clusters needn't follow industries."],
      ["Chosen to maximise in-sample $R^{2}$", "thresh-r2", "Stability and interpretability matter."],
    ]),
  // level 8
  short(m(IR, "explain-earnings-update", "explain", 8, 150, "Why apply short-term volatility updates to idiosyncratic risk mainly around earnings dates?"),
    [
      ["shock", "Earnings bring scheduled information shocks; a long-half-life EWMA won't react within a few days", 2, true],
      ["targeted", "Restricting updates to the earnings window catches these shocks while avoiding noise-driven changes elsewhere; residual correlations are near zero so the update is per stock", 2, true],
    ]),
  num(m(IR, "apply-pair-hedge", "apply", 8, 50, "Two share classes have idiosyncratic volatilities $20\\%$ and residual correlation $0.98$. Find the volatility in percent of a $\\$1$ long / $\\$1$ short position (idiosyncratic only)."), 4),
  num(m(IR, "apply-winsor-share", "apply", 8, 45, "In a backtest, $36$ of $1{,}200{,}000$ stock-day returns were winsorized. Find the fraction in parts per million."), 30),
  mcq(m(IR, "apply-robust-scale", "apply", 8, 40, "The robust z-score divides by the median of recent absolute returns rather than their standard deviation because:"),
    "The median is barely affected by the very outliers being detected",
    [
      ["It is always larger", "robscale-larger", "It's usually smaller than the SD for heavy tails."],
      ["It makes returns Gaussian", "robscale-gaussian", "It's a scale estimate, not a transform."],
      ["It is faster to compute", "robscale-fast", "Robustness is the reason."],
    ]),
  // level 9
  short(m(IR, "design-idio-pipeline", "transfer", 9, 180, "Outline an idiosyncratic-risk pipeline for a $3{,}000$-stock daily model."),
    [
      ["estimate", "Residuals from the cross-sectional regression; EWMA variances with a long half-life; shrinkage toward peer groups", 2, true],
      ["adjust", "Short-term updates near earnings; explicit handling of share classes, dual listings and residual clusters; robust outlier detection with reported winsorization", 2, true],
    ]),
  short(m(IR, "explain-enron", "explain", 9, 150, "Paleologo recalls Enron's stock jumping from about $\\$86$ to $\\$90$ at a closing auction and falling back next day. What lesson about data does this illustrate?"),
    [
      ["stray", "Single prints (especially at auctions) can be stray or unrepresentative even for liquid stocks", 2, true],
      ["inspect", "Inspect the full price trace rather than the last print, and treat sudden one-day reversals as possible outliers", 2, true],
    ]),
  num(m(IR, "apply-cluster-hedged", "apply", 9, 60, "Five clustered stocks have idiosyncratic variance $0.04$ each and pairwise residual correlation $0.5$. A portfolio is long $\\$1$ in two of them and short $\\$1$ in two others. Find its idiosyncratic variance."), 0.08),
  mcq(m(IR, "apply-dual-strategy", "apply", 9, 40, "When should a model include both share classes of the same company?"),
    "When the strategy trades the small mispricings between them, so their joint (highly correlated) risk must be modelled",
    [
      ["Always", "dual-always", "A fundamental strategy only needs one."],
      ["Never", "dual-never", "Pairs strategies need both."],
      ["Only if their returns are uncorrelated", "dual-uncorr", "They're highly correlated by nature."],
    ]),
  // level 10
  short(m(IR, "judge-winsor-tradeoff", "transfer", 10, 180, "A researcher winsorizes all returns beyond $5$ robust z-scores in both risk modelling and alpha backtests, and the strategy's backtested Sharpe rises. Critique."),
    [
      ["bias", "Capping returns removes real gains and losses the strategy would have experienced; backtested PnL no longer matches executable PnL and tail risk is understated", 2, true],
      ["fix", "Winsorize only to protect estimation (and report each case), compute PnL with actual returns, and fix data errors at the source", 2, true],
    ]),
  short(m(IR, "judge-diagonal-assumption", "transfer", 10, 180, "When is a diagonal idiosyncratic covariance a good enough approximation, and when does it fail badly?"),
    [
      ["ok", "Good enough for broad, diversified portfolios when the factor model captures common movement and residual correlations are small", 2, true],
      ["fails", "Fails for concentrated books in residual clusters, pairs of linked securities, or when a factor is missing — risk can be understated or overstated many-fold", 2, true],
    ]),
  num(m(IR, "apply-shrink-optimal", "apply", 10, 90, "A stock's sample idiosyncratic variance is $0.10$ (sampling variance $0.0009$); its peers average $0.05$ with cross-sectional variance of true values $0.0003$. Using the precision-weighted estimate, find the shrunk variance."), 0.0625),
  mcq(m(IR, "judge-update-everywhere", "transfer", 10, 60, "Why not apply the short-term idiosyncratic update to every stock every day instead of only near earnings?"),
    "Most days carry little scheduled information, so constant updating mostly chases noise and adds turnover to risk forecasts",
    [
      ["Because it is mathematically invalid", "everywhere-invalid", "It's valid, just noisier."],
      ["Because residuals don't change", "everywhere-static", "They do."],
      ["Because earnings are the only risk", "everywhere-only", "Other shocks exist; the targeted update trades off noise."],
    ]),
];

// ---------------------------------------------------------------------------
// style-factors
// ---------------------------------------------------------------------------
const SF = "style-factors";
const styleFactors: Item[] = [
  // level 1
  mcq(m(SF, "recall-momentum", "recall", 1, 15, "The momentum anomaly (Jegadeesh and Titman) says that:"),
    "Stocks that outperformed their peers over the past $3$ to $12$ months tend to keep outperforming",
    [
      ["Last month's winners reverse next month", "mom-reversal", "That's short-term reversal."],
      ["Cheap stocks outperform", "mom-value", "That's value."],
      ["Small stocks outperform", "mom-size", "That's size."],
    ]),
  mcq(m(SF, "recall-value", "recall", 1, 15, "A value loading is typically built from:"),
    "Ratios of accounting fundamentals to price, such as book-to-price or earnings-to-price",
    [
      ["Past returns", "value-returns", "That's momentum."],
      ["Market capitalization alone", "value-cap", "That's size."],
      ["Beta to the market", "value-beta", "That's a beta/low-volatility loading."],
    ]),
  mcq(m(SF, "recall-low-vol", "recall", 1, 15, "The low-beta (low-volatility) anomaly is that:"),
    "Low-beta stocks have earned higher risk-adjusted returns than the CAPM predicts",
    [
      ["High-beta stocks earn more than the CAPM predicts", "lowvol-reverse", "It's the opposite."],
      ["Volatile stocks are always cheap", "lowvol-cheap", "Unrelated to valuation."],
      ["Beta has no relationship with returns at all", "lowvol-none", "The relationship is flatter than CAPM, not absent."],
    ]),
  mcq(m(SF, "recall-market", "recall", 1, 15, "In a fundamental model the market factor's loadings are usually either:"),
    "All ones (a country intercept) or stocks' estimated betas to a market index",
    [
      ["Market capitalizations", "market-cap", "Cap is a size characteristic."],
      ["Industry dummies", "market-industry", "Those are industry factors."],
      ["Past returns", "market-returns", "That's momentum."],
    ]),
  // level 2
  num(m(SF, "apply-mom-calc", "apply", 2, 20, "A stock's price was $\\$50$ twelve months ago and $\\$70$ one month ago. Find its $12$–$1$ month momentum return."), 0.4),
  num(m(SF, "apply-bp", "apply", 2, 20, "A company has book value per share $\\$40$ and price $\\$80$. Find its book-to-price ratio."), 0.5),
  num(m(SF, "apply-zscore", "apply", 2, 25, "A stock's raw momentum is $0.40$; the cross-section has mean $0.10$ and standard deviation $0.20$. Find its z-scored loading."), 1.5),
  mcq(m(SF, "apply-skip-month", "apply", 2, 20, "Momentum signals usually skip the most recent month because:"),
    "Returns over the last month tend to reverse (short-term reversal), which would contaminate the signal",
    [
      ["Last month's data are not available", "skip-unavailable", "They are available."],
      ["It reduces trading costs to zero", "skip-costs", "It doesn't eliminate costs."],
      ["Regulators require it", "skip-regulation", "No such rule."],
    ]),
  // level 3
  num(m(SF, "apply-ep", "apply", 3, 25, "A company earns $\\$6$ per share and trades at $\\$120$. Find its earnings-to-price ratio."), 0.05),
  num(m(SF, "apply-industry-sum", "apply", 3, 20, "A stock belongs to exactly one of $60$ industries. Find the sum of its industry loadings."), 1),
  num(m(SF, "apply-size", "apply", 3, 25, "Size loadings are often the log of market cap. Find $\\log_{10}$ of a $\\$10$ billion market cap."), 10),
  mcq(m(SF, "apply-industry-vs-country", "apply", 3, 25, "Country and industry factors are treated as a homogeneous group because:"),
    "Both are coded as $0/1$ memberships summing to one per stock, and their relative importance is a classic research question",
    [
      ["They have identical returns", "indctry-identical", "Their returns differ."],
      ["They are always uncorrelated", "indctry-uncorr", "They can be correlated."],
      ["They are style factors", "indctry-style", "Styles are continuous characteristics."],
    ]),
  // level 4
  num(m(SF, "apply-t-premium", "apply", 4, 35, "A factor's annual Sharpe ratio is $0.4$, measured over $30$ years. Find the $t$-statistic of its mean return, $\\text{SR}\\sqrt{Y}$. Give $2$ decimal places."), 2.19),
  num(m(SF, "apply-years-t3", "apply", 4, 35, "How many years of data does a factor with annual Sharpe $0.3$ need for a $t$-statistic of $3$?"), 100),
  num(m(SF, "apply-bab-lever", "apply", 4, 35, "A betting-against-beta portfolio levers a portfolio of beta $0.6$ up to beta $1$. Find the leverage factor. Give $4$ decimal places."), 1.6667),
  mcq(m(SF, "apply-hlz", "apply", 4, 30, "Harvey, Liu and Zhu argue that, given hundreds of tested factors, a new factor should clear:"),
    "A $t$-statistic of about $3$ rather than $2$",
    [
      ["A $t$-statistic of $1$", "hlz-one", "That would admit even more false discoveries."],
      ["A $t$-statistic of $2$, as usual", "hlz-two", "Multiple testing raises the bar."],
      ["No statistical test at all", "hlz-none", "They argue for stricter tests."],
    ]),
  // level 5
  short(m(SF, "explain-momentum-story", "explain", 5, 120, "Give a behavioural and a risk-based explanation for the momentum premium."),
    [
      ["behavioural", "Investors underreact to news (slow diffusion, anchoring), so prices trend as information is gradually incorporated", 2, true],
      ["risk", "Momentum is exposed to severe crash risk (sharp reversals, e.g. after market rebounds), and the premium compensates for it", 2, true],
    ]),
  mcq(m(SF, "apply-value-story", "apply", 5, 30, "A risk-based explanation of the value premium is that cheap stocks:"),
    "Are often distressed firms whose cash flows suffer most in bad economic times",
    [
      ["Have lower volatility", "valuestory-vol", "Value stocks aren't necessarily less volatile."],
      ["Are always larger", "valuestory-size", "Value and size are distinct."],
      ["Pay no dividends", "valuestory-dividends", "Value stocks often pay high dividends."],
    ]),
  mcq(m(SF, "apply-bab-story", "apply", 5, 30, "Frazzini and Pedersen explain the low-beta anomaly by:"),
    "Leverage constraints: investors who can't lever up buy high-beta stocks instead, bidding them up",
    [
      ["Low-beta stocks being riskier", "bab-riskier", "They're less risky by beta."],
      ["Accounting errors", "bab-accounting", "The story is about constraints."],
      ["Index rebalancing", "bab-index", "Unrelated."],
    ]),
  num(m(SF, "apply-crash", "apply", 5, 35, "A momentum portfolio has $\\$100$M gross exposure and, during a sharp rebound, its winners return $+5\\%$ while its losers return $+30\\%$. With $\\$50$M long winners and $\\$50$M short losers, find the PnL in millions."), -12.5),
  // level 6
  short(m(SF, "explain-factor-in-model", "explain", 6, 150, "Why do style factors belong in a risk model even if you don't believe they earn a premium?"),
    [
      ["risk", "They explain co-movement: stocks with similar momentum or value loadings move together, so ignoring them leaves correlated residuals and understated risk", 2, true],
      ["attribution", "Including them lets you measure, hedge and attribute unintended style exposures in your portfolio", 2, true],
    ]),
  num(m(SF, "apply-exposure-style", "apply", 6, 40, "A portfolio holds $\\$3$M in a stock with value loading $1.2$, $\\$2$M with loading $-0.5$, and is short $\\$4$M of a stock with loading $0.8$. Find its value exposure in millions."), -0.6),
  num(m(SF, "apply-z-cap-weighted", "apply", 6, 45, "Loadings are standardized so the cap-weighted mean is zero. Two stocks with caps $3$ and $1$ have raw loadings $2$ and $6$. Find the first stock's loading after subtracting the cap-weighted mean."), -1),
  mcq(m(SF, "apply-quality", "apply", 6, 35, "A quality factor (Asness et al.) ranks stocks by:"),
    "Profitability, growth, safety and payout — the characteristics investors should pay more for",
    [
      ["Recent price changes", "quality-momentum", "That's momentum."],
      ["Book-to-price only", "quality-value", "That's value."],
      ["Trading volume", "quality-volume", "That's liquidity."],
    ]),
  // level 7
  short(m(SF, "explain-zoo", "explain", 7, 150, "What is the “factor zoo”, and why should a quant be sceptical of a newly published factor?"),
    [
      ["zoo", "Hundreds of factors have been published, many variants of a few ideas, found by searching the same data", 2, true],
      ["sceptic", "With so many tests, many are false discoveries or data-mined; demand higher $t$-statistics, out-of-sample and out-of-market evidence, and an economic story", 2, true],
    ]),
  num(m(SF, "apply-mom-z", "apply", 7, 45, "Three stocks have $12$–$1$ momentum $0.10$, $0.30$ and $-0.10$. Z-score them using the population standard deviation. Find the second stock's loading. Give $4$ decimal places."), 1.2247),
  num(m(SF, "apply-fdr", "apply", 7, 45, "Of $300$ published factors, suppose $90\\%$ are truly null and each was tested at the $5\\%$ level with power $80\\%$ for the real ones. Find the expected fraction of “significant” factors that are false. Give $4$ decimal places."), 0.36),
  mcq(m(SF, "apply-low-vol-exposure", "apply", 7, 40, "A long-only low-volatility fund will typically have:"),
    "A market beta below one, so in a strong bull market it lags the index even if its factor works",
    [
      ["A beta above one", "lowvolexp-high", "Low-vol stocks have low betas."],
      ["Zero market exposure", "lowvolexp-zero", "Long-only portfolios are net long."],
      ["Negative value exposure always", "lowvolexp-value", "Not necessarily."],
    ]),
  // level 8
  short(m(SF, "explain-publication-decay", "explain", 8, 150, "Anomaly returns are often lower after publication. Give two explanations and what each implies."),
    [
      ["data-mining", "Some anomalies were partly data-mined: in-sample returns overstated the truth, so post-publication returns fall to their genuine level", 2, true],
      ["arbitrage", "Investors trade on published anomalies, pushing prices and shrinking the premium — implying mispricing that is being arbitraged (limited by costs and risk)", 2, true],
    ]),
  num(m(SF, "apply-mom-turnover", "apply", 8, 45, "A monthly-rebalanced momentum portfolio replaces $40\\%$ of its names each month, and each replacement costs $20$ basis points one way (so $40$ round trip). Find the annual cost drag in percent of gross exposure. Give $2$ decimal places."), 1.92),
  num(m(SF, "apply-combined-sharpe", "apply", 8, 50, "Value and momentum factors each have annual Sharpe $0.4$ and correlation $-0.5$. Find the Sharpe of an equal-risk combination, $\\frac{2 \\times 0.4}{\\sqrt{2 + 2\\rho}}$. Give $2$ decimal places."), 0.8),
  mcq(m(SF, "apply-industry-momentum", "apply", 8, 40, "Part of stock momentum is explained by industry momentum. In a model with industry factors, a stock-level momentum factor:"),
    "Captures the remaining within-industry momentum, since industry co-movement is already in the industry factors",
    [
      ["Becomes redundant", "indmom-redundant", "Within-industry momentum remains."],
      ["Must be removed to avoid rank deficiency", "indmom-rank", "A continuous style doesn't cause that."],
      ["Equals the market factor", "indmom-market", "It's a style factor."],
    ]),
  // level 9
  short(m(SF, "transfer-new-factor", "transfer", 9, 180, "You discover a new characteristic whose long-short portfolio earns a Sharpe of $0.8$ over $15$ years. What tests would you run before adding it as a factor or an alpha?"),
    [
      ["significance", "Account for how many characteristics were tried (haircut or $t > 3$), check stability across subperiods and markets", 2, true],
      ["spanning", "Regress its returns on existing factors (market, value, momentum, size, quality, low-vol): is the alpha orthogonal, or is it a repackaged known factor? Check costs and capacity", 2, true],
    ]),
  short(m(SF, "explain-why-market-e", "explain", 9, 150, "What is the difference between using all-ones loadings and using estimated betas for the market factor in a fundamental model?"),
    [
      ["ones", "All-ones (country) loadings make every stock equally exposed; differences in market sensitivity must then be captured by a beta style factor", 2, true],
      ["betas", "Estimated-beta loadings put sensitivity into the market factor directly; with an intercept-free model, ones and industries interact differently (no rank deficiency from the country column)", 2, true],
    ]),
  num(m(SF, "apply-t-after-haircut", "apply", 9, 60, "A factor's annual Sharpe estimate is $0.5$ over $20$ years. Halving its Sharpe for post-publication decay, find the $t$-statistic of the remaining premium. Give $2$ decimal places."), 1.12),
  mcq(m(SF, "apply-smart-beta", "apply", 9, 40, "“Smart beta” products sell investors:"),
    "Systematic exposure to factor premia such as value, momentum, quality or low volatility, at low cost",
    [
      ["Orthogonal stock-specific alpha", "smartbeta-alpha", "They sell factor (spanned) returns."],
      ["Leveraged market beta", "smartbeta-lever", "They tilt toward factors, not just leverage."],
      ["Options strategies", "smartbeta-options", "They are equity factor tilts."],
    ]),
  // level 10
  short(m(SF, "judge-premium-source", "transfer", 10, 180, "Using the five sources of excess returns, classify the likely edges behind value, momentum and low-beta."),
    [
      ["value", "Value: largely risk (distress) and possibly behavioural overreaction", 1, true],
      ["momentum", "Momentum: behavioural underreaction (information) plus crash-risk compensation", 1, true],
      ["lowbeta", "Low-beta: funding/leverage constraints on other investors — a funding source", 2, true],
    ]),
  short(m(SF, "judge-diversify-factors", "transfer", 10, 180, "Why do quant funds combine several factor strategies rather than pick the single best one?"),
    [
      ["correlation", "Factors like value and momentum are weakly or negatively correlated, so a combination has a higher Sharpe than any single factor", 2, true],
      ["uncertainty", "Each factor's future premium is uncertain and some may be data-mined or crowded; diversification protects against any one failing or crashing", 2, true],
    ]),
  num(m(SF, "apply-three-factor-sharpe", "apply", 10, 90, "Three uncorrelated factors each have annual Sharpe $0.4$. Find the Sharpe ratio of the optimal (equal-risk) combination. Give $4$ decimal places."), 0.6928),
  mcq(m(SF, "judge-crowding", "transfer", 10, 60, "In August 2007 many quant equity funds suffered simultaneous large losses on common factor positions. This illustrates:"),
    "Crowding: when many funds hold similar factor bets, forced deleveraging by some causes losses for all",
    [
      ["That factors never work", "crowding-never", "They recovered; the event was a liquidity spiral."],
      ["A failure of the CAPM", "crowding-capm", "It was about positioning and liquidity."],
      ["Random bad luck with no common cause", "crowding-luck", "The losses were correlated across funds."],
    ]),
];

export const qi06Items: Item[] = [...crossSectional, ...factorCovariance, ...idioRisk, ...styleFactors];
