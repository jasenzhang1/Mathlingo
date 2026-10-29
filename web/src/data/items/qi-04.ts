import type { Item } from "../../lib/assessment/types";
import { m, mcq, num, short } from "./qi-shared";

/**
 * Quantitative Investing, part 4: linear factor models — the model and its
 * covariance, alpha spanned and orthogonal, rotations, projections and
 * push-outs, and risk decomposition (Paleologo, Ch. 3). Forty questions per
 * lesson, four at each level.
 */

// ---------------------------------------------------------------------------
// linear-factor-models
// ---------------------------------------------------------------------------
const FM = "linear-factor-models";
const linearFactorModels: Item[] = [
  // level 1
  mcq(m(FM, "recall-model", "recall", 1, 15, "A linear factor model of $n$ excess returns with $m$ factors is:"),
    "$\\mathbf{r}_t = \\boldsymbol{\\alpha} + \\mathbf{B}\\mathbf{f}_t + \\boldsymbol{\\epsilon}_t$, with $\\mathbf{B}$ an $n \\times m$ loadings matrix",
    [
      ["$\\mathbf{f}_t = \\mathbf{B}\\mathbf{r}_t + \\boldsymbol{\\epsilon}_t$", "fm-reversed", "Factors drive returns, not the other way round."],
      ["$\\mathbf{r}_t = \\mathbf{B}\\mathbf{r}_{t-1} + \\boldsymbol{\\epsilon}_t$", "fm-var", "That is a vector autoregression."],
      ["$\\mathbf{r}_t = \\boldsymbol{\\alpha} + \\boldsymbol{\\epsilon}_t$ with $\\boldsymbol{\\epsilon}_t$ fully correlated", "fm-no-factors", "The factor term is what captures common movement."],
    ]),
  mcq(m(FM, "recall-idio", "recall", 1, 15, "The idiosyncratic returns $\\boldsymbol{\\epsilon}_t$ of a factor model are assumed to:"),
    "Have mean zero, be independent of the factor returns, and have a diagonal (or sparse) covariance matrix",
    [
      ["Be perfectly correlated across assets", "idio-correlated", "Common movement belongs in the factor term."],
      ["Have the same variance for every asset", "idio-equal", "Each asset has its own idiosyncratic variance."],
      ["Be equal to the factor returns", "idio-factors", "They are independent of the factors."],
    ]),
  mcq(m(FM, "recall-covariance", "recall", 1, 15, "The covariance matrix implied by a factor model is:"),
    "$\\boldsymbol{\\Omega}_r = \\mathbf{B}\\boldsymbol{\\Omega}_f\\mathbf{B}^{\\top} + \\boldsymbol{\\Omega}_\\epsilon$",
    [
      ["$\\mathbf{B}^{\\top}\\boldsymbol{\\Omega}_f\\mathbf{B} + \\boldsymbol{\\Omega}_\\epsilon$", "cov-transpose", "That is $m \\times m$, not $n \\times n$."],
      ["$\\mathbf{B}\\boldsymbol{\\Omega}_f\\mathbf{B}^{\\top}$", "cov-no-idio", "Idiosyncratic variance adds to the diagonal."],
      ["$\\boldsymbol{\\Omega}_f + \\boldsymbol{\\Omega}_\\epsilon$", "cov-no-loadings", "The dimensions don't match without the loadings."],
    ]),
  mcq(m(FM, "recall-strict", "recall", 1, 15, "A factor model is called “strict” when:"),
    "The idiosyncratic covariance matrix is diagonal",
    [
      ["It has exactly one factor", "strict-one", "The number of factors is irrelevant."],
      ["Its factors are uncorrelated", "strict-factors", "“Strict” refers to the idiosyncratic covariance."],
      ["Its loadings are all $0$ or $1$", "strict-dummy", "That describes industry dummies."],
    ]),
  // level 2
  num(m(FM, "apply-single-vol", "apply", 2, 25, "In a one-factor model a stock has $\\beta = 1.2$, factor volatility $0.2$ and idiosyncratic volatility $0.3$. Find its total volatility. Give $4$ decimal places."), 0.3842),
  num(m(FM, "apply-single-cov", "apply", 2, 20, "In a one-factor model with factor variance $0.04$, two stocks have $\\beta_1 = 1.2$ and $\\beta_2 = 0.8$. Find their covariance."), 0.0384),
  num(m(FM, "apply-full-params", "apply", 2, 20, "How many distinct parameters does an unrestricted covariance matrix of $n = 1{,}000$ assets have?"), 500500),
  mcq(m(FM, "apply-dims", "apply", 2, 20, "With $n = 3{,}000$ stocks and $m = 60$ factors, the factor covariance matrix $\\boldsymbol{\\Omega}_f$ is:"),
    "$60 \\times 60$",
    [
      ["$3{,}000 \\times 3{,}000$", "dims-asset", "That is the size of $\\boldsymbol{\\Omega}_r$."],
      ["$3{,}000 \\times 60$", "dims-loadings", "That is the size of $\\mathbf{B}$."],
      ["$60 \\times 3{,}000$", "dims-transpose", "That is $\\mathbf{B}^{\\top}$."],
    ]),
  // level 3
  num(m(FM, "apply-model-params", "apply", 3, 30, "Count the parameters of a strict factor model with $n = 1{,}000$ assets and $m = 10$ factors: the loadings, the factor covariance and the idiosyncratic variances."), 11055),
  num(m(FM, "apply-conditional-mean", "apply", 3, 25, "A stock has loadings $[1, 0.5, -1]$ and the factor returns are $\\mathbf{f} = [0.01, 0.02, 0.005]$. With $\\alpha_i = 0$, find $\\mathbb{E}[r_i \\mid \\mathbf{f}]$."), 0.015),
  num(m(FM, "apply-single-corr", "apply", 3, 30, "One-factor model, factor variance $0.04$: stock 1 has $\\beta = 1.2$ and idiosyncratic variance $0.09$; stock 2 has $\\beta = 0.8$ and idiosyncratic variance $0.09$. Find their correlation. Give $3$ decimal places."), 0.294),
  mcq(m(FM, "apply-industry", "apply", 3, 25, "In a typical loadings matrix, industry loadings are:"),
    "Dummies equal to $1$ if the stock belongs to the industry and $0$ otherwise",
    [
      ["Standardized scores with mean $0$", "industry-zscore", "That describes style loadings."],
      ["Estimated betas to industry indices", "industry-beta", "In characteristic models they are membership dummies."],
      ["The industry's market capitalization", "industry-cap", "Size is a style characteristic."],
    ]),
  // level 4
  num(m(FM, "apply-sample-rank", "apply", 4, 30, "You estimate the sample covariance of $n = 500$ stocks from $T = 250$ daily returns (uncentered). What is the largest possible rank of the estimate?"), 250),
  num(m(FM, "apply-exposure", "apply", 4, 30, "A portfolio holds $\\$1$M, $\\$2$M and $-\\$1$M in three stocks whose market betas are $1.2$, $0.8$ and $1.5$. Find its market exposure in millions of dollars."), 1.3),
  num(m(FM, "apply-portfolio-var", "apply", 4, 45, "A portfolio has factor exposures $\\mathbf{b} = [1, 0.5]$, factor covariance $\\text{diag}(0.04, 0.01)$, holdings $[1, 1]$ in two stocks, and idiosyncratic variances $0.09$ and $0.04$. Find its total variance."), 0.1725),
  mcq(m(FM, "apply-invertible", "apply", 4, 30, "Why is the factor-model covariance $\\mathbf{B}\\boldsymbol{\\Omega}_f\\mathbf{B}^{\\top} + \\boldsymbol{\\Omega}_\\epsilon$ invertible even when $n$ is much larger than the number of observations?"),
    "$\\boldsymbol{\\Omega}_\\epsilon$ is diagonal with positive entries, which makes the sum positive definite",
    [
      ["$\\mathbf{B}\\boldsymbol{\\Omega}_f\\mathbf{B}^{\\top}$ is full rank", "inv-low-rank", "It has rank at most $m$."],
      ["Factor returns are uncorrelated", "inv-uncorrelated", "Invertibility doesn't need that."],
      ["It is estimated from many observations", "inv-observations", "The structure, not the sample size, guarantees it."],
    ]),
  // level 5
  short(m(FM, "explain-empirical", "explain", 5, 120, "Why is the sample covariance matrix of $n$ stocks a poor risk model when you have fewer observations than stocks?"),
    [
      ["rank", "With $T < n$ it has rank at most $T$, so there are many portfolios (its null space) with zero estimated variance", 2, true],
      ["optimization", "It can't be inverted, and mean-variance optimization would load up on those apparently riskless portfolios", 2, true],
    ]),
  mcq(m(FM, "apply-graphical", "apply", 5, 30, "Viewed as a graphical model, a factor model says:"),
    "A few factor returns drive many asset returns through the loadings, and assets are independent given the factors",
    [
      ["Each asset drives the factors", "graph-reversed", "Edges go from factors to assets."],
      ["Every asset is directly linked to every other", "graph-complete", "Assets connect only through factors."],
      ["Factors are independent of assets", "graph-independent", "Asset returns depend on factor returns."],
    ]),
  num(m(FM, "apply-expected-pnl", "apply", 5, 30, "A portfolio's market exposure is $\\$1.3$ million and the market's expected excess return is $6\\%$. Find the expected factor PnL in millions of dollars."), 0.078),
  mcq(m(FM, "apply-superposition", "apply", 5, 30, "Writing $\\mathbb{E}[\\mathbf{r} \\mid \\mathbf{f}] = \\sum_j [\\mathbf{B}]_{\\cdot, j} f_j$ shows that the factor part of a day's cross-section of returns:"),
    "Lies in the low-dimensional subspace spanned by the columns of $\\mathbf{B}$",
    [
      ["Can be any vector in $\\mathbb{R}^{n}$", "superpos-any", "It is restricted to $m$ directions."],
      ["Is the same for every asset", "superpos-same", "Assets differ in their loadings."],
      ["Is orthogonal to the loadings", "superpos-orthogonal", "It is a combination of the loadings."],
    ]),
  // level 6
  short(m(FM, "derive-covariance", "explain", 6, 150, "Derive $\\text{Cov}(\\mathbf{r}) = \\mathbf{B}\\boldsymbol{\\Omega}_f\\mathbf{B}^{\\top} + \\boldsymbol{\\Omega}_\\epsilon$ from the factor model."),
    [
      ["independence", "$\\boldsymbol{\\alpha}$ is constant and $\\mathbf{B}\\mathbf{f}$ is independent of $\\boldsymbol{\\epsilon}$, so the covariance is $\\text{Cov}(\\mathbf{B}\\mathbf{f}) + \\text{Cov}(\\boldsymbol{\\epsilon})$", 2, true],
      ["linear", "For a linear map, $\\text{Cov}(\\mathbf{B}\\mathbf{f}) = \\mathbf{B}\\,\\text{Cov}(\\mathbf{f})\\mathbf{B}^{\\top}$", 2, true],
    ]),
  num(m(FM, "apply-null-space", "apply", 6, 35, "A sample covariance of $n = 500$ stocks built from $T = 250$ returns has rank $250$. Find the dimension of the space of portfolios with zero estimated variance."), 250),
  num(m(FM, "apply-two-factor-cov", "apply", 6, 40, "Two stocks have loadings $[1, 0.5]$ and $[1, -0.5]$ on a market and a style factor, with factor covariance $\\text{diag}(0.04, 0.01)$. Find their covariance."), 0.0375),
  mcq(m(FM, "apply-approximate", "apply", 6, 35, "An “approximate” factor model allows:"),
    "A sparse, not necessarily diagonal, idiosyncratic covariance",
    [
      ["Correlated factor and idiosyncratic returns", "approx-correlated", "Independence of factors and residuals is kept."],
      ["Loadings that are only roughly estimated", "approx-loadings", "The term refers to the residual covariance."],
      ["Nonlinear dependence on factors", "approx-nonlinear", "The model stays linear."],
    ]),
  // level 7
  short(m(FM, "explain-assumptions", "explain", 7, 150, "What does the assumption that idiosyncratic returns are uncorrelated across assets buy you, and what happens if it fails?"),
    [
      ["buys", "Idiosyncratic risk diversifies: a portfolio's idio variance is $\\sum_i w_i^{2}\\sigma_i^{2}$, and the covariance has only $n$ residual parameters and is invertible", 2, true],
      ["fails", "If residuals are correlated (e.g. missing factors, industry clusters), diversified portfolios carry hidden common risk and the model underestimates their variance", 2, true],
    ]),
  num(m(FM, "apply-precision-entry", "apply", 7, 45, "Two stocks follow a one-factor model with betas $[1, 1]$, factor variance $0.04$ and idiosyncratic variances $0.09$ each. Find the $(1, 1)$ entry of the inverse covariance matrix. Give $4$ decimal places."), 8.4967),
  num(m(FM, "apply-beta-from-cov", "apply", 7, 30, "A stock's covariance with the market is $0.03$ and the market's variance is $0.04$. Find its market beta."), 0.75),
  mcq(m(FM, "apply-time-varying", "apply", 7, 35, "In practice the loadings matrix is written $\\mathbf{B}_t$ because:"),
    "Characteristics such as size or momentum change over time, so loadings are updated",
    [
      ["Loadings are random noise", "tv-noise", "Loadings are measured characteristics or estimates."],
      ["The number of factors changes daily", "tv-number", "The factor set is usually fixed."],
      ["Returns are not stationary", "tv-stationary", "The reason is changing characteristics."],
    ]),
  // level 8
  short(m(FM, "explain-woodbury", "explain", 8, 150, "Explain why a factor model makes inverting the covariance of $n = 5{,}000$ stocks cheap."),
    [
      ["woodbury", "By the Woodbury identity, $(\\mathbf{B}\\boldsymbol{\\Omega}_f\\mathbf{B}^{\\top} + \\boldsymbol{\\Omega}_\\epsilon)^{-1}$ needs only the inverse of the diagonal $\\boldsymbol{\\Omega}_\\epsilon$ and of an $m \\times m$ matrix", 2, true],
      ["cost", "So the cost scales like $nm^{2}$ instead of $n^{3}$", 1, true],
    ]),
  num(m(FM, "apply-r2", "apply", 8, 35, "A stock has $\\beta = 1.2$, factor variance $0.04$ and idiosyncratic variance $0.09$. Find the fraction of its variance explained by the factor. Give $4$ decimal places."), 0.3902),
  num(m(FM, "apply-diversified-idio", "apply", 8, 40, "An equal-weighted portfolio of $100$ stocks, each with idiosyncratic volatility $0.3$ and uncorrelated residuals, is scaled to total weight $1$. Find its idiosyncratic volatility."), 0.03),
  mcq(m(FM, "apply-diversify-factor", "apply", 8, 40, "Adding more stocks to a long-only, equal-weighted portfolio shrinks:"),
    "Its idiosyncratic variance, but not its exposure to the market factor",
    [
      ["Both factor and idiosyncratic variance", "div-both", "Factor exposure averages to the average beta, which doesn't vanish."],
      ["Only its factor variance", "div-factor", "It's the residuals that diversify."],
      ["Neither", "div-neither", "Idiosyncratic risk diversifies like $\\frac{1}{n}$."],
    ]),
  // level 9
  short(m(FM, "transfer-excess-vs-raw", "transfer", 9, 180, "The model is written for excess returns, but practitioners think in raw returns. When does the distinction matter for a portfolio manager?"),
    [
      ["neutral", "For dollar-neutral portfolios it doesn't matter: the risk-free term cancels", 2, true],
      ["net", "For portfolios with net exposure (long-only, levered) it matters: the financing rate is part of the return, and can be modelled as an extra factor", 2, true],
    ]),
  short(m(FM, "transfer-log-returns", "transfer", 9, 180, "Suppose you fit the factor model to log returns instead. What is the relationship between the covariance of log returns and of returns, and when can you ignore it?"),
    [
      ["exact", "Returns are $e^{\\tilde{r}} - 1$, so their covariance is a nonlinear function of the log-return covariance (involving exponentials of variances)", 2, true],
      ["approx", "To first order they are equal, which is accurate for small (e.g. daily) returns", 2, true],
    ]),
  num(m(FM, "apply-idio-share", "apply", 9, 60, "An equal-weighted long portfolio (weights $\\frac{1}{400}$) of $400$ stocks, each with $\\beta = 1$, factor volatility $0.2$ and idiosyncratic volatility $0.3$. Find the idiosyncratic share of its variance, in percent. Give $2$ decimal places."), 0.56),
  mcq(m(FM, "apply-why-factor", "apply", 9, 40, "The main reason risk models impose a factor structure rather than shrinking the sample covariance directly is that a factor structure:"),
    "Cuts the parameters from order $n^{2}$ to order $nm$ while giving interpretable exposures for risk, construction and attribution",
    [
      ["Always fits the data better in-sample", "why-fit", "The sample covariance fits in-sample best."],
      ["Makes returns Gaussian", "why-gaussian", "It says nothing about the distribution."],
      ["Removes the need for idiosyncratic risk", "why-no-idio", "Idiosyncratic risk is part of the model."],
    ]),
  // level 10
  short(m(FM, "judge-model-types", "transfer", 10, 180, "Compare characteristic, statistical and macroeconomic factor models: what is taken as given and what is estimated in each, and when would you prefer each?"),
    [
      ["primitives", "Characteristic: returns and loadings $\\mathbf{B}_t$ given, factor returns estimated. Statistical: only returns given; loadings and factors estimated. Macro: returns and factor time series given; loadings estimated", 2, true],
      ["use", "Characteristic models are interpretable and most common; statistical work where characteristics are missing or at short horizons; macro links risk to economic series", 2, true],
    ]),
  short(m(FM, "judge-hidden-cluster", "transfer", 10, 180, "A strict factor model says a long-short portfolio of $50$ regional bank stocks has very low risk, but it loses heavily in a banking scare. Diagnose."),
    [
      ["missing", "The residuals of the banks were correlated (a missing regional-bank factor), violating the diagonal idiosyncratic assumption", 2, true],
      ["fix", "Add or push out a factor for the cluster, or model off-diagonal residual covariance, and stress-test concentrated books", 2, true],
    ]),
  num(m(FM, "apply-param-ratio", "apply", 10, 60, "Compare the $500{,}500$ parameters of an unrestricted $1{,}000$-asset covariance with the $11{,}055$ of a strict $10$-factor model. Find the ratio. Give $2$ decimal places."), 45.27),
  mcq(m(FM, "judge-uniqueness", "transfer", 10, 60, "Two vendors give different loadings and factor covariances, yet produce identical asset covariance matrices. This is possible because:"),
    "Factor models are identified only up to an invertible rotation of the factors",
    [
      ["One vendor must have made an error", "unique-error", "Rotational indeterminacy allows both."],
      ["Covariance matrices determine loadings uniquely", "unique-determine", "They determine only the factor subspace."],
      ["They use different idiosyncratic variances", "unique-idio", "Identical covariances with identical residuals still allow different rotations."],
    ]),
];

// ---------------------------------------------------------------------------
// alpha-spanned-and-orthogonal
// ---------------------------------------------------------------------------
const AS = "alpha-spanned-and-orthogonal";
const alphaSpanned: Item[] = [
  // level 1
  mcq(m(AS, "recall-split", "recall", 1, 15, "Splitting expected excess returns as $\\boldsymbol{\\alpha} = \\mathbf{B}\\boldsymbol{\\lambda} + \\boldsymbol{\\alpha}_\\perp$, the orthogonal alpha satisfies:"),
    "$\\mathbf{B}^{\\top}\\boldsymbol{\\alpha}_\\perp = \\mathbf{0}$",
    [
      ["$\\boldsymbol{\\alpha}_\\perp = \\mathbf{0}$", "split-zero", "It need not be zero; it is orthogonal to the loadings."],
      ["$\\mathbf{B}\\boldsymbol{\\alpha}_\\perp = \\mathbf{0}$", "split-dims", "The dimensions don't match; orthogonality is $\\mathbf{B}^{\\top}\\boldsymbol{\\alpha}_\\perp = \\mathbf{0}$."],
      ["$\\boldsymbol{\\alpha}_\\perp^{\\top}\\boldsymbol{\\alpha}_\\perp = 1$", "split-unit", "There is no normalisation."],
    ]),
  mcq(m(AS, "recall-spanned", "recall", 1, 15, "Alpha spanned by the factors is:"),
    "Indistinguishable from the factors' expected returns",
    [
      ["Riskless", "spanned-riskless", "It comes with factor risk."],
      ["Always zero", "spanned-zero", "It is often the main source of excess return."],
      ["Uncorrelated with the loadings", "spanned-orth", "That describes orthogonal alpha."],
    ]),
  mcq(m(AS, "recall-rotation", "recall", 1, 15, "Under an invertible $m \\times m$ matrix $\\mathbf{C}$, a factor model's loadings and factor returns become:"),
    "$\\tilde{\\mathbf{B}} = \\mathbf{B}\\mathbf{C}^{-1}$ and $\\tilde{\\mathbf{f}} = \\mathbf{C}\\mathbf{f}$, leaving $\\mathbf{B}\\mathbf{f}$ unchanged",
    [
      ["$\\tilde{\\mathbf{B}} = \\mathbf{B}\\mathbf{C}$ and $\\tilde{\\mathbf{f}} = \\mathbf{C}\\mathbf{f}$", "rot-both-c", "Then $\\tilde{\\mathbf{B}}\\tilde{\\mathbf{f}} = \\mathbf{B}\\mathbf{C}^{2}\\mathbf{f}$ changes."],
      ["$\\tilde{\\mathbf{B}} = \\mathbf{C}\\mathbf{B}$", "rot-left", "$\\mathbf{C}$ is $m \\times m$ and acts on the factor side."],
      ["Only the idiosyncratic returns change", "rot-idio", "Residuals are unaffected."],
    ]),
  mcq(m(AS, "recall-projection", "recall", 1, 15, "Model projections are called projections because applying the same projection twice:"),
    "Gives the same model as applying it once (they are idempotent)",
    [
      ["Returns the original model", "proj-inverse", "That would be an involution."],
      ["Doubles the factor variance", "proj-double", "The second application changes nothing."],
      ["Removes all factors", "proj-remove", "It keeps the target factors."],
    ]),
  // level 2
  num(m(AS, "apply-orth-component", "apply", 2, 25, "In a market-only model ($\\mathbf{B} = [1, 1, 1]^{\\top}$), three stocks have alphas $[0.03, 0.01, 0.02]$. Find the orthogonal alpha of the first stock."), 0.01),
  num(m(AS, "apply-lambda", "apply", 2, 20, "In the same market-only model with alphas $[0.03, 0.01, 0.02]$, find the spanned coefficient $\\lambda$."), 0.02),
  num(m(AS, "apply-rotate-loading", "apply", 2, 20, "A one-factor model is rotated with $C = 2$, so $\\tilde{\\mathbf{B}} = \\frac{\\mathbf{B}}{2}$. A stock's loading was $1.2$. Find its new loading."), 0.6),
  mcq(m(AS, "apply-rotated-cov", "apply", 2, 20, "After the rotation $\\tilde{\\mathbf{f}} = \\mathbf{C}\\mathbf{f}$, the factor covariance becomes:"),
    "$\\mathbf{C}\\boldsymbol{\\Omega}_f\\mathbf{C}^{\\top}$",
    [
      ["$\\mathbf{C}^{-1}\\boldsymbol{\\Omega}_f\\mathbf{C}^{-\\top}$", "rotcov-inverse", "That's how the loadings side would transform a quadratic form."],
      ["$\\boldsymbol{\\Omega}_f$", "rotcov-same", "Rescaling the factors changes their covariance."],
      ["$\\mathbf{C}\\boldsymbol{\\Omega}_f$", "rotcov-one-side", "Covariances transform on both sides."],
    ]),
  // level 3
  num(m(AS, "apply-rotated-var", "apply", 3, 20, "A one-factor model with factor variance $0.04$ is rotated with $C = 2$. Find the new factor variance."), 0.16),
  num(m(AS, "apply-zscore", "apply", 3, 30, "A style's loadings across three stocks are $2$, $4$ and $6$. Z-score them using the population standard deviation. Find the third stock's z-score. Give $4$ decimal places."), 1.2247),
  num(m(AS, "apply-projection-coef", "apply", 3, 35, "Project a model with loadings $\\mathbf{B} = \\begin{bmatrix} 1 & 1 \\\\ 1 & 2 \\\\ 1 & 3 \\end{bmatrix}$ onto $\\mathbf{A} = [1, 1, 1]^{\\top}$ via $g = \\mathbf{H}\\mathbf{f}$ with $\\mathbf{H} = (\\mathbf{A}^{\\top}\\mathbf{A})^{-1}\\mathbf{A}^{\\top}\\mathbf{B}$. For $\\mathbf{f} = [0.01, 0.005]$, find $g$."), 0.02),
  mcq(m(AS, "apply-why-project", "apply", 3, 25, "Which is a reason to project a risk model onto fewer factors?"),
    "Some factors' loadings change so fast that hedging and managing them is impractical",
    [
      ["To increase the model's accuracy in-sample", "whyproj-accuracy", "Dropping factors can only lose in-sample fit."],
      ["To make the idiosyncratic covariance diagonal", "whyproj-diagonal", "Projection acts on the factor part."],
      ["To add a missing factor", "whyproj-add", "That's a push-out."],
    ]),
  // level 4
  num(m(AS, "apply-orth-norm", "apply", 4, 30, "The orthogonal alphas of three stocks are $[0.01, -0.01, 0]$. Find $\\|\\boldsymbol{\\alpha}_\\perp\\|$. Give $4$ decimal places."), 0.0141),
  num(m(AS, "apply-sharpe-bound", "apply", 4, 40, "The portfolio $\\mathbf{w} \\propto \\boldsymbol{\\alpha}_\\perp$ has a Sharpe ratio of at least $\\frac{\\mu\\sqrt{n}}{\\sigma_{\\max}}$, where $\\mu$ bounds the average $|\\alpha_{\\perp, i}|$ from below and $\\sigma_{\\max}$ is the largest idiosyncratic volatility. Find the bound for $n = 400$, $\\mu = 0.01$ and $\\sigma_{\\max} = 0.3$. Give $4$ decimal places."), 0.6667),
  num(m(AS, "apply-identity-rotation", "apply", 4, 40, "To make the factor covariance $\\text{diag}(0.04, 0.01)$ the identity, rotate with $\\mathbf{C} = \\text{diag}(5, 10)$. A stock's loading on the second factor is $0.5$. Find its new loading."), 0.05),
  mcq(m(AS, "apply-zscore-condition", "apply", 4, 30, "Centering loadings (as in z-scoring) gives an equivalent factor model only if:"),
    "The vector of ones $\\mathbf{e}$ is in the span of the loadings, e.g. the model has a market or full set of industry factors",
    [
      ["The loadings are already positive", "zcond-positive", "Sign doesn't matter."],
      ["The factors are uncorrelated", "zcond-uncorrelated", "The condition concerns the loadings' span."],
      ["Always", "zcond-always", "Scaling is always allowed; shifting is not."],
    ]),
  // level 5
  short(m(AS, "explain-orth-small", "explain", 5, 120, "Explain why, if a factor model is correct, orthogonal alpha must be small for most stocks."),
    [
      ["portfolio", "The portfolio proportional to $\\boldsymbol{\\alpha}_\\perp$ has no factor exposure, expected return $\\|\\boldsymbol{\\alpha}_\\perp\\|$, and only diversifiable idiosyncratic risk", 2, true],
      ["sharpe", "If typical $|\\alpha_{\\perp, i}|$ stayed bounded away from zero, its Sharpe would grow like $\\sqrt{n}$ — unrealistically large — so orthogonal alpha must shrink", 2, true],
    ]),
  mcq(m(AS, "apply-industry-center", "apply", 5, 30, "A model has a full set of industry dummies (each stock in exactly one industry) and z-scored styles. Centering a style's loadings:"),
    "Gives an equivalent model, because the industry columns sum to $\\mathbf{e}$",
    [
      ["Changes risk forecasts", "indcenter-changes", "With $\\mathbf{e}$ in the span, centering is a rotation."],
      ["Is impossible", "indcenter-impossible", "It's possible because $\\mathbf{e} = \\mathbf{B}\\mathbf{a}$."],
      ["Requires removing an industry", "indcenter-remove", "No factor needs removing."],
    ]),
  num(m(AS, "apply-sharpe-bound-big", "apply", 5, 35, "Using the bound $\\frac{\\mu\\sqrt{n}}{\\sigma_{\\max}}$ with $\\mu = 0.01$ and $\\sigma_{\\max} = 0.3$, find it for $n = 2{,}500$. Give $4$ decimal places."), 1.6667),
  num(m(AS, "apply-lambda-style", "apply", 5, 45, "With orthogonal loading columns $[1, 1, 1]$ (market) and $[1, 0, -1]$ (style), and alphas $[0.03, 0.01, 0.02]$, find the style's spanned coefficient $\\lambda_2$."), 0.005),
  // level 6
  short(m(AS, "explain-push-out", "explain", 6, 150, "What is a push-out of a factor model, when would you need one, and what condition keeps the original factor returns unchanged?"),
    [
      ["what", "Adding factors: model the residuals as $\\mathbf{A}\\mathbf{g} + \\boldsymbol{\\eta}$, giving $\\mathbf{r} = \\mathbf{B}\\mathbf{f} + \\mathbf{A}\\mathbf{g} + \\boldsymbol{\\eta}$", 1, true],
      ["when", "Needed when residuals show structure, e.g. the model was built on data from a different regime", 1, true],
      ["condition", "The new loadings must be orthogonal to the old, $\\mathbf{A}^{\\top}\\mathbf{B} = \\mathbf{0}$; otherwise part of $\\mathbf{g}$ is absorbed into $\\mathbf{f}$", 2, true],
    ]),
  num(m(AS, "apply-orth-second", "apply", 6, 40, "With the market and style columns $[1, 1, 1]$ and $[1, 0, -1]$ and alphas $[0.03, 0.01, 0.02]$, find the second stock's orthogonal alpha."), -0.01),
  num(m(AS, "apply-rotation-invariant", "apply", 6, 35, "A portfolio has exposures $[1, 0.5]$ and factor covariance $\\text{diag}(0.04, 0.01)$. Find its factor variance — the same in any rotation of the model."), 0.0425),
  mcq(m(AS, "apply-rotation-changes", "apply", 6, 35, "Rotating a factor model leaves unchanged:"),
    "Total factor variance and idiosyncratic variance, but not the variance attributed to individual factors",
    [
      ["Every individual factor's variance contribution", "rotchg-each", "Single-factor attributions depend on the rotation."],
      ["Nothing — all risk numbers change", "rotchg-all", "Total factor risk is invariant."],
      ["Only the idiosyncratic variance", "rotchg-idio", "Total factor variance is also invariant."],
    ]),
  // level 7
  short(m(AS, "derive-idempotent", "explain", 7, 150, "Show that projecting a model with loadings $\\mathbf{A}$ onto $\\mathbf{A}$ itself leaves it unchanged."),
    [
      ["h", "$\\mathbf{H} = (\\mathbf{A}^{\\top}\\mathbf{A})^{-1}\\mathbf{A}^{\\top}\\mathbf{A} = \\mathbf{I}$", 2, true],
      ["result", "So $\\mathbf{g} = \\mathbf{f}$ and $\\boldsymbol{\\Omega}_g = \\boldsymbol{\\Omega}_f$: a second projection changes nothing", 1, true],
    ]),
  num(m(AS, "apply-projected-cov", "apply", 7, 40, "A projection has $\\mathbf{H} = [1, 2]$ and the original factor covariance is $\\text{diag}(0.04, 0.01)$. Find the projected factor variance $\\mathbf{H}\\boldsymbol{\\Omega}_f\\mathbf{H}^{\\top}$."), 0.08),
  num(m(AS, "apply-spanned-share", "apply", 7, 45, "With alphas $[0.03, 0.01, 0.02]$ and spanned part $[0.025, 0.02, 0.015]$, find $\\frac{\\|\\mathbf{B}\\boldsymbol{\\lambda}\\|^{2}}{\\|\\boldsymbol{\\alpha}\\|^{2}}$. Give $4$ decimal places."), 0.8929),
  mcq(m(AS, "apply-one-factor-center", "apply", 7, 40, "In a one-factor model whose loadings are not all equal and with no market factor, centering the loadings:"),
    "Produces a different model, since $\\mathbf{e}$ is not in the span of $\\mathbf{B}$",
    [
      ["Is a rotation", "onecenter-rotation", "A $1 \\times 1$ rotation can only rescale."],
      ["Leaves risk unchanged", "onecenter-same", "Shifting loadings changes covariances."],
      ["Is required", "onecenter-required", "It's optional and here changes the model."],
    ]),
  // level 8
  short(m(AS, "explain-identity-view", "explain", 8, 150, "Why might a user want a rotated model whose factors are uncorrelated with unit variance, and how is the rotation built?"),
    [
      ["benefit", "Exposures then read directly as factor volatilities, and factor variance is the sum of squared exposures with no covariance terms", 2, true],
      ["build", "Take $\\boldsymbol{\\Omega}_f = \\mathbf{U}\\mathbf{S}\\mathbf{U}^{\\top}$ and set $\\mathbf{C} = \\mathbf{S}^{-1/2}\\mathbf{U}^{\\top}$, so $\\mathbf{C}\\boldsymbol{\\Omega}_f\\mathbf{C}^{\\top} = \\mathbf{I}$", 2, true],
    ]),
  num(m(AS, "apply-orth-sharpe", "apply", 8, 50, "Orthogonal alphas are $[0.005, -0.01, 0.005]$ and each stock has idiosyncratic volatility $0.2$ (uncorrelated). Find the Sharpe ratio of the portfolio $\\mathbf{w} = \\frac{\\boldsymbol{\\alpha}_\\perp}{\\|\\boldsymbol{\\alpha}_\\perp\\|}$. Give $4$ decimal places."), 0.0612),
  num(m(AS, "apply-orthonormal", "apply", 8, 40, "A one-factor model has loadings $[3, 4]$. Rotate it so the loadings have unit norm. Find the new loading of the second stock."), 0.8),
  mcq(m(AS, "apply-svd-orthonormal", "apply", 8, 40, "With $\\mathbf{B} = \\mathbf{U}\\mathbf{S}\\mathbf{V}^{\\top}$, the rotation $\\mathbf{C}^{-1} = \\mathbf{V}\\mathbf{S}^{-1}$ gives loadings:"),
    "$\\tilde{\\mathbf{B}} = \\mathbf{U}$, with orthonormal columns",
    [
      ["$\\tilde{\\mathbf{B}} = \\mathbf{V}$", "svd-v", "$\\mathbf{V}$ is $m \\times m$."],
      ["$\\tilde{\\mathbf{B}} = \\mathbf{S}$", "svd-s", "$\\mathbf{B}\\mathbf{V}\\mathbf{S}^{-1} = \\mathbf{U}$."],
      ["$\\tilde{\\mathbf{B}} = \\mathbf{I}$", "svd-identity", "$\\mathbf{B}$ is $n \\times m$."],
    ]),
  // level 9
  short(m(AS, "explain-indistinguishable", "explain", 9, 180, "Explain why alpha spanned by the factors cannot be separated from the factors' expected returns, and what you can still identify."),
    [
      ["rewrite", "$\\mathbf{r} = \\mathbf{B}\\boldsymbol{\\lambda} + \\boldsymbol{\\alpha}_\\perp + \\mathbf{B}\\mathbf{f} + \\boldsymbol{\\epsilon}$ can be rewritten with $\\mathbf{B}\\left(\\boldsymbol{\\lambda} + \\mathbb{E}[\\mathbf{f}]\\right)$; any split of the sum gives the same returns", 2, true],
      ["identified", "Only the total $\\boldsymbol{\\lambda} + \\mathbb{E}[\\mathbf{f}]$ (and $\\boldsymbol{\\alpha}_\\perp$) is identified; by convention set $\\boldsymbol{\\lambda} = \\mathbf{0}$ and call it factor expected return", 2, true],
    ]),
  short(m(AS, "transfer-vendor-gap", "transfer", 9, 180, "Your vendor risk model leaves strong structure in your strategy's residuals. How would you fix the model without discarding it?"),
    [
      ["pushout", "Estimate extra factors from the residuals (e.g. PCA on residuals) and push them out, keeping their loadings orthogonal to the vendor's", 2, true],
      ["validate", "Check out-of-sample that residual correlations fall and risk forecasts improve, and that the original factor returns are unchanged", 2, true],
    ]),
  num(m(AS, "apply-projection-loss", "apply", 9, 60, "Project loadings $\\mathbf{B}$ with columns $[1, 1, 1]$ and $[1, 0, -1]$ onto $\\mathbf{A} = [1, 1, 1]^{\\top}$. For $\\mathbf{f} = [0.01, 0.01]$, find $\\|\\mathbf{B}\\mathbf{f} - \\mathbf{A}g\\|^{2}$ with $g = \\mathbf{H}\\mathbf{f}$."), 0.0002),
  mcq(m(AS, "apply-excess-source", "apply", 9, 40, "Paleologo concludes that most excess returns available to investors are likely to be:"),
    "Spanned alpha, which carries factor risk that does not diversify away",
    [
      ["Orthogonal alpha, which is nearly riskless", "source-orth", "A large orthogonal alpha would imply implausibly high Sharpe ratios."],
      ["Neither, since markets are efficient", "source-none", "He argues excess returns exist."],
      ["Idiosyncratic noise", "source-noise", "Noise has zero mean."],
    ]),
  // level 10
  short(m(AS, "judge-apt", "transfer", 10, 180, "Connect the alpha spanned/orthogonal argument to the Arbitrage Pricing Theory."),
    [
      ["apt", "APT says that, absent near-arbitrage, expected returns are approximately linear in factor loadings: $\\boldsymbol{\\alpha} \\approx \\mathbf{B}\\boldsymbol{\\lambda}$", 2, true],
      ["link", "The bound shows that sizeable orthogonal alpha would create diversified portfolios with Sharpe ratios growing like $\\sqrt{n}$ — near-arbitrage — so orthogonal alpha must be small", 2, true],
    ]),
  short(m(AS, "judge-zscore-error", "transfer", 10, 180, "A team z-scores the loadings of a model that has no market or industry factors and is surprised that its risk forecasts change. Explain."),
    [
      ["reason", "Centering adds a multiple of $\\mathbf{e}$ to each loading column; if $\\mathbf{e}$ is not in the span of $\\mathbf{B}$, this is not a rotation and changes the subspace", 2, true],
      ["fix", "Add an intercept/market factor (or industries summing to one) before z-scoring, or only rescale without centering", 2, true],
    ]),
  num(m(AS, "apply-identity-exposure", "apply", 10, 90, "A portfolio has exposures $\\mathbf{b} = [2, 1]$ in a model with factor covariance $\\text{diag}(0.04, 0.01)$. The model is rotated to unit factor covariance with $\\mathbf{C} = \\text{diag}(5, 10)$, so the new exposures are $\\tilde{\\mathbf{b}} = \\mathbf{C}^{-\\top}\\mathbf{b}$. Find the sum of squared new exposures."), 0.17),
  mcq(m(AS, "judge-which-alpha", "transfer", 10, 60, "A signal's predicted returns are almost entirely explained by stocks' value loadings. For a portfolio manager this means:"),
    "The signal mostly repackages the value factor, so its returns carry value risk that cannot be diversified",
    [
      ["The signal is pure idiosyncratic alpha", "which-idio", "Its alphas lie in the span of the loadings."],
      ["The signal has no value", "which-worthless", "Spanned alpha can still be profitable, but it is factor risk."],
      ["The value factor should be removed from the risk model", "which-remove", "That hides the risk rather than managing it."],
    ]),
];

// ---------------------------------------------------------------------------
// factor-risk-decomposition
// ---------------------------------------------------------------------------
const RD = "factor-risk-decomposition";
const riskDecomposition: Item[] = [
  // level 1
  mcq(m(RD, "recall-pnl-split", "recall", 1, 15, "A portfolio's one-period PnL in a factor model splits as:"),
    "$\\mathbf{w}^{\\top}\\mathbf{r} = \\mathbf{b}^{\\top}\\mathbf{f} + \\mathbf{w}^{\\top}(\\boldsymbol{\\alpha} + \\boldsymbol{\\epsilon})$, with exposures $\\mathbf{b} = \\mathbf{B}^{\\top}\\mathbf{w}$",
    [
      ["$\\mathbf{w}^{\\top}\\mathbf{r} = \\mathbf{w}^{\\top}\\mathbf{f}$", "split-dims", "$\\mathbf{w}$ is in asset space and $\\mathbf{f}$ in factor space."],
      ["$\\mathbf{w}^{\\top}\\mathbf{r} = \\mathbf{b}^{\\top}\\mathbf{f}$ only", "split-no-idio", "The idiosyncratic part is missing."],
      ["$\\mathbf{w}^{\\top}\\mathbf{r} = \\mathbf{B}\\mathbf{w}$", "split-wrong", "That is not even a scalar."],
    ]),
  mcq(m(RD, "recall-exposure", "recall", 1, 15, "A portfolio's exposure to factor $j$ is:"),
    "The holdings-weighted sum of the stocks' loadings on factor $j$",
    [
      ["The factor's return", "exp-return", "Exposure is a property of the portfolio, not the factor."],
      ["The number of stocks with positive loading", "exp-count", "Holdings weight the loadings."],
      ["The correlation of the portfolio with the factor", "exp-corr", "Exposure is $[\\mathbf{B}^{\\top}\\mathbf{w}]_j$."],
    ]),
  mcq(m(RD, "recall-idio-pct", "recall", 1, 15, "The percentage of idiosyncratic variance of a portfolio is:"),
    "$100 \\times$ idiosyncratic variance divided by total variance",
    [
      ["$100 \\times$ idiosyncratic volatility divided by total volatility", "pct-vol", "Variances add, so the share is computed in variance."],
      ["The fraction of stocks with idiosyncratic returns", "pct-stocks", "Every stock has idiosyncratic returns."],
      ["$100$ minus the number of factors", "pct-factors", "It depends on the portfolio's risk."],
    ]),
  mcq(m(RD, "recall-uses", "recall", 1, 15, "Which is $\\textbf{NOT}$ one of the uses of factor models listed by Paleologo?"),
    "Setting the price of newly issued shares",
    [
      ["Forecasting and decomposing volatility", "uses-risk", "That is a core use."],
      ["Portfolio construction", "uses-construction", "That is a core use."],
      ["Performance attribution and alpha research", "uses-attribution", "Both are listed uses."],
    ]),
  // level 2
  num(m(RD, "apply-exposure", "apply", 2, 25, "A portfolio holds $\\$2$M and $-\\$1$M in two stocks with momentum loadings $0.5$ and $-1$. Find its momentum exposure in millions of dollars."), 2),
  num(m(RD, "apply-factor-var", "apply", 2, 25, "A portfolio has exposures $[2, 1]$ (in millions) and factor covariance $\\text{diag}(0.04, 0.01)$. Find its factor variance in squared millions."), 0.17),
  num(m(RD, "apply-idio-var", "apply", 2, 20, "A portfolio holds $\\$2$M and $-\\$1$M in two stocks with idiosyncratic variances $0.09$ and $0.04$ (uncorrelated). Find its idiosyncratic variance in squared millions."), 0.4),
  mcq(m(RD, "apply-characteristic-inputs", "apply", 2, 20, "In a characteristic (fundamental) factor model, the inputs are:"),
    "Returns and stock characteristics used as loadings; factor returns are estimated",
    [
      ["Returns only", "inputs-returns", "That is a statistical model."],
      ["Returns and macroeconomic factor series", "inputs-macro", "That is a macroeconomic model."],
      ["Factor returns only", "inputs-factors", "Asset returns are always needed."],
    ]),
  // level 3
  num(m(RD, "apply-total-vol", "apply", 3, 25, "A portfolio has factor variance $0.17$ and idiosyncratic variance $0.4$ (squared millions). Find its volatility in millions. Give $3$ decimal places."), 0.755),
  num(m(RD, "apply-idio-pct", "apply", 3, 25, "A portfolio has factor variance $0.17$ and idiosyncratic variance $0.4$. Find its percentage of idiosyncratic variance. Give $2$ decimal places."), 70.18),
  num(m(RD, "apply-factor-pnl", "apply", 3, 25, "A portfolio's exposures are $[2, 1]$ (millions) and the factor returns are $[0.01, -0.02]$. Find the factor PnL in millions."), 0),
  mcq(m(RD, "apply-macro", "apply", 3, 20, "In a macroeconomic factor model, what is estimated?"),
    "The loadings and idiosyncratic returns, given asset returns and macro factor series",
    [
      ["The factor returns, given loadings", "macro-factors", "That's a characteristic model."],
      ["Everything, from returns alone", "macro-all", "That's a statistical model."],
      ["Nothing — all quantities are observed", "macro-nothing", "Loadings must be estimated."],
    ]),
  // level 4
  num(m(RD, "apply-group-share", "apply", 4, 40, "A portfolio's risk splits into two groups with variances $0.04$ and $0.01$ and covariance $0.005$. Assigning each group its own variance plus half the covariance, find group 1's share of total variance."), 0.75),
  num(m(RD, "apply-mcr", "apply", 4, 45, "Two assets have covariance $\\begin{bmatrix} 0.04 & 0.01 \\\\ 0.01 & 0.09 \\end{bmatrix}$ and the portfolio is $\\mathbf{w} = [1, 1]$. Find the marginal contribution to risk of asset 1, $\\frac{(\\boldsymbol{\\Omega}\\mathbf{w})_1}{\\sigma}$. Give $4$ decimal places."), 0.1291),
  num(m(RD, "apply-contribution-pct", "apply", 4, 45, "For the same portfolio, find asset 2's percentage contribution to total variance, $\\frac{w_2(\\boldsymbol{\\Omega}\\mathbf{w})_2}{\\mathbf{w}^{\\top}\\boldsymbol{\\Omega}\\mathbf{w}}$, in percent. Give $2$ decimal places."), 66.67),
  mcq(m(RD, "apply-euler", "apply", 4, 30, "The risk contributions $w_i\\frac{\\partial\\sigma}{\\partial w_i}$ of all positions:"),
    "Sum exactly to the portfolio volatility $\\sigma$",
    [
      ["Sum to $1$", "euler-one", "Percentage contributions sum to $1$; the contributions themselves sum to $\\sigma$."],
      ["Sum to the variance", "euler-variance", "$\\sigma$ is homogeneous of degree one in $\\mathbf{w}$, so they sum to $\\sigma$."],
      ["Are always positive", "euler-positive", "Hedges have negative contributions."],
    ]),
  // level 5
  short(m(RD, "explain-beta-share", "explain", 5, 120, "Explain why a group's percentage of variance equals the beta of the group's PnL to the portfolio's PnL."),
    [
      ["share", "The share is $\\frac{\\text{Var}(X_i) + \\sum_{j \\ne i}\\text{Cov}(X_i, X_j)}{\\text{Var}(P)} = \\frac{\\text{Cov}(X_i, P)}{\\text{Var}(P)}$ where $P = \\sum_j X_j$", 2, true],
      ["beta", "That ratio is exactly the regression beta of $X_i$ on $P$; the betas sum to $1$", 1, true],
    ]),
  num(m(RD, "apply-group-beta", "apply", 5, 35, "Group PnLs have variances $0.04$ and $0.01$ and covariance $0.005$. Find the beta of group 2 to the total."), 0.25),
  mcq(m(RD, "apply-rotation-decomp", "apply", 5, 30, "After rotating a factor model, a portfolio's:"),
    "Total factor variance is unchanged, but the variance attributed to each factor can change",
    [
      ["Exposures are unchanged", "rotdec-exposures", "Exposures become $\\mathbf{C}^{-\\top}\\mathbf{b}$."],
      ["Idiosyncratic variance changes", "rotdec-idio", "Residuals are unaffected by rotations."],
      ["Total risk changes", "rotdec-total", "The covariance matrix is unchanged."],
    ]),
  num(m(RD, "apply-dollar-vol", "apply", 5, 30, "A portfolio's market exposure is $\\$50$ million and the market's annual volatility is $16\\%$. Find the market factor's contribution to volatility in millions of dollars."), 8),
  // level 6
  short(m(RD, "explain-sharpe-sensitivity", "explain", 6, 150, "When does scaling up one group of positions raise a portfolio's Sharpe ratio?"),
    [
      ["condition", "When the group's share of expected PnL exceeds its share of variance (its beta to the portfolio): $\\mu_i > p_i\\mu$", 2, true],
      ["reason", "Scaling adds $\\mu_i$ to expected PnL and about $p_i\\sigma$ to volatility, so the Sharpe derivative is proportional to $\\mu_i - p_i\\mu$", 2, true],
    ]),
  num(m(RD, "apply-sharpe-derivative", "apply", 6, 40, "A portfolio expects $\\$10$M of PnL; group $i$ expects $\\$6$M and accounts for $p_i = 0.75$ of variance. Find $\\mu_i - p_i\\mu$ in millions."), -1.5),
  num(m(RD, "apply-annual-pnl-sum", "apply", 6, 35, "Over a year, a portfolio's factor PnL was $\\$3$M from styles and $-\\$1$M from industries, and its idiosyncratic PnL was $\\$5$M. Find the total PnL in millions."), 7),
  mcq(m(RD, "apply-attribution-time", "apply", 6, 35, "Summing the per-period decomposition $\\mathbf{b}_t^{\\top}\\mathbf{f}_t + \\mathbf{w}_t^{\\top}\\boldsymbol{\\epsilon}_t$ over time gives:"),
    "Cumulative PnL split into factor-by-factor and stock-by-stock residual contributions",
    [
      ["The portfolio's average exposure", "time-exposure", "It sums PnL, not exposures."],
      ["The factor covariance", "time-cov", "It's an ex-post PnL decomposition."],
      ["Only factor PnL", "time-factor-only", "Residual PnL is part of it."],
    ]),
  // level 7
  short(m(RD, "explain-precision-role", "explain", 7, 150, "Why is the factor structure especially valuable for portfolio optimization, beyond forecasting risk?"),
    [
      ["precision", "Optimal portfolios need the inverse covariance (precision) matrix; the sample covariance is singular or ill-conditioned, while the factor model's is well defined and cheap to invert", 2, true],
      ["alpha", "It also separates factor expected returns from orthogonal alpha, which carry different risk and are managed differently", 1, false],
    ]),
  num(m(RD, "apply-hedge-exposure", "apply", 7, 40, "A portfolio's market exposure is $\\$12$M. It hedges with an index future of beta $1$. Find the short position, in millions, that zeroes its market exposure."), 12),
  num(m(RD, "apply-contribution-negative", "apply", 7, 45, "Two positions: variances $0.04$ and $0.04$, correlation $-0.5$, holdings $[2, 1]$. Find the second position's contribution to variance, $w_2(\\boldsymbol{\\Omega}\\mathbf{w})_2$."), 0),
  mcq(m(RD, "apply-negative-contribution", "apply", 7, 40, "A position with a negative risk contribution:"),
    "Hedges the rest of the portfolio — adding a little more of it would lower total risk",
    [
      ["Has negative variance", "neg-variance", "Variances are non-negative; contributions can be negative."],
      ["Should always be removed", "neg-remove", "It is reducing risk."],
      ["Is losing money", "neg-losing", "Risk contributions are not PnL."],
    ]),
  // level 8
  short(m(RD, "explain-partition", "explain", 8, 150, "Risk managers often report factor variance by group (styles, industries, countries). Why does the choice of grouping and rotation matter, and what stays fixed?"),
    [
      ["changes", "Group shares include covariance terms and depend on the rotation, so different groupings tell different (equally valid) stories", 2, true],
      ["fixed", "Total factor variance, total idiosyncratic variance and total variance are invariant", 2, true],
    ]),
  num(m(RD, "apply-idio-pct-portfolio", "apply", 8, 50, "A dollar-neutral portfolio has factor exposures $[0.5, -0.2]$ (millions) with factor covariance $\\begin{bmatrix} 0.04 & 0.01 \\\\ 0.01 & 0.02 \\end{bmatrix}$, and idiosyncratic variance $0.05$. Find its percentage of idiosyncratic variance. Give $2$ decimal places."), 85.03),
  num(m(RD, "apply-mcr-scale", "apply", 8, 40, "A portfolio's volatility is $\\$10$M. A group's beta to the portfolio is $0.3$. Approximately how much does portfolio volatility rise, in millions, if the group is scaled up by $10\\%$?"), 0.3),
  mcq(m(RD, "apply-percent-idio-meaning", "apply", 8, 40, "A market-neutral stock picker reports $85\\%$ idiosyncratic variance. This suggests:"),
    "Most of the risk comes from stock-specific bets rather than factor exposures, as intended",
    [
      ["The portfolio is poorly hedged", "pidio-unhedged", "High idio share means factors are largely hedged."],
      ["Its returns will be $85\\%$ idiosyncratic", "pidio-returns", "The share is of variance, not of PnL."],
      ["The risk model is wrong", "pidio-model", "It's a typical target for stock pickers."],
    ]),
  // level 9
  short(m(RD, "transfer-risk-report", "transfer", 9, 180, "Design a one-page daily risk report for a long-short equity book using the factor model. What would you include and why?"),
    [
      ["totals", "Total volatility with the factor/idiosyncratic split and percentage of idio variance", 1, true],
      ["groups", "Exposures and variance contributions by factor group (market, styles, industries) and the largest single-name and factor contributors", 2, true],
      ["changes", "Changes since yesterday and marginal contributions, so the manager knows which trades reduce risk", 1, false],
    ]),
  short(m(RD, "explain-three-users", "explain", 9, 150, "Paleologo says the signal researcher cares about $\\boldsymbol{\\alpha}$, the risk manager about $\\mathbf{B}\\mathbf{f}$, and the portfolio manager combines them with costs. Explain how one factor model serves all three."),
    [
      ["shared", "It provides a common language: exposures and volatility for risk, a split of expected returns into factor and orthogonal parts for research", 2, true],
      ["pm", "The PM uses its covariance (and precision) to size and hedge, and its attribution to see which bets paid off", 2, true],
    ]),
  num(m(RD, "apply-three-group", "apply", 9, 60, "Three groups have variances $0.04$, $0.02$, $0.01$; covariances are $0.01$ between groups 1 and 2, $-0.005$ between 1 and 3, and $0$ between 2 and 3. Find group 1's share of total variance. Give $4$ decimal places."), 0.5625),
  mcq(m(RD, "apply-macro-use", "apply", 9, 40, "A pension fund wants to know how its equity book reacts to inflation surprises. Which model type fits best?"),
    "A macroeconomic model, which estimates loadings on observed macro series such as inflation",
    [
      ["A statistical model", "macrouse-stat", "Its factors are not tied to named macro series."],
      ["A model with industry dummies only", "macrouse-industry", "It has no inflation factor."],
      ["The sample covariance matrix", "macrouse-sample", "It says nothing about inflation."],
    ]),
  // level 10
  short(m(RD, "judge-rotation-plus", "transfer", 10, 180, "Single-factor risk attributions change when a model is rotated. Is this a weakness? Argue."),
    [
      ["not-weakness", "Not a weakness: totals are invariant, and the freedom lets you choose a representation whose factors are meaningful to the user", 2, true],
      ["caveat", "But single-factor numbers must be read with the representation in mind; comparing attributions across vendors or rotations is meaningless", 2, true],
    ]),
  short(m(RD, "judge-empirical-pnl", "transfer", 10, 180, "A PM says “my idiosyncratic PnL is my skill, factor PnL is luck”. Critique."),
    [
      ["factor-skill", "Factor PnL can reflect deliberate, skilful factor timing; and idio PnL contains noise — over short periods most of it is luck", 2, true],
      ["test", "Skill needs statistical evidence (e.g. idio Sharpe and its standard error over enough periods), and depends on the risk model being right", 2, true],
    ]),
  num(m(RD, "apply-woodbury-precision", "apply", 10, 90, "One factor, two stocks: betas $[1, 2]$, factor variance $0.04$, idiosyncratic variances $0.04$ each. Find the $(1, 2)$ entry of the inverse covariance. Give $4$ decimal places."), -8.3333),
  mcq(m(RD, "judge-vol-target", "transfer", 10, 60, "A PM targets $10\\%$ volatility using a factor model, but realised volatility comes in at $14\\%$ in a crisis. The most likely model failure is:"),
    "Factor covariances (correlations and volatilities) rose faster than the model's estimates adapted",
    [
      ["The idiosyncratic variances were overestimated", "voltgt-idio-over", "Overestimation would lower realised versus forecast."],
      ["The loadings were z-scored", "voltgt-zscore", "Z-scoring with a market factor doesn't change risk."],
      ["The PM's alphas were wrong", "voltgt-alpha", "Alpha errors affect returns, not volatility forecasts."],
    ]),
];

export const qi04Items: Item[] = [...linearFactorModels, ...alphaSpanned, ...riskDecomposition];
