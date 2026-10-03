import type { Item } from "../../../lib/assessment/types";
import { makeBuilders } from "../authoring";
import { EXPANSION } from "./source";

/** Regression 40-pass (part B): assumptions, properties, sums of squares, R², collinearity, partitioning. */
const { mcq, short, num } = makeBuilders(EXPANSION);

const s = (concept: string, slug: string, level: number, stem: string, a: string, b: string) =>
  short({ concept, slug, cognitive: level >= 8.5 ? "transfer" : "explain", level, seconds: level >= 9 ? 300 : 200, stem },
    [["main", a, 5, true], ["detail", b, 4, true]]);
const n = (concept: string, slug: string, level: number, stem: string, key: number, tol = 0.01) =>
  num({ concept, slug, cognitive: "apply", level, seconds: level >= 7 ? 90 : 25, stem }, key, tol);
const m = (concept: string, slug: string, level: number, stem: string, right: string, wrong: [string, string][]) =>
  mcq({ concept, slug, cognitive: level <= 3 ? "recall" : "apply", level, seconds: 25, stem },
    right, wrong.map(([t, why], i) => [t, `${concept}-${slug}-${i}`, why] as [string, string, string]));

const OA = "ols-assumptions";
const OP = "ols-properties";
const SS = "ssr-sse-sst";
const R2 = "r-squared";
const EA = "effect-of-adding-another-variable";
const LF = "less-than-full-rank-models";
const CS = "centering-and-scaling";
const HO = "homoskedasticity";
const VI = "vif";
const PR = "partitioned-regression";

export const rgFortyBItems: Item[] = [
  // --- ols-assumptions (9) --------------------------------------------------------------
  m(OA, "x4r-unbiased", 5, "Which of these is NOT needed for OLS to be unbiased?", "Normally distributed errors",
    [["$\\mathbb{E}[\\varepsilon \\mid X] = 0$", "Needed."], ["A correctly specified linear mean", "Needed."], ["Full column rank of $X$", "Needed for $\\hat\\beta$ to exist."]]),
  m(OA, "x4r-exog", 6.5, "Exogeneity $\\mathbb{E}[\\varepsilon \\mid X] = 0$ fails when:", "An omitted variable that affects $y$ is correlated with $X$",
    [["The errors are heteroskedastic", "That's a variance issue."], ["The errors are non-normal", "Doesn't affect exogeneity."], ["$n$ is small", "No."]]),
  n(OA, "x4r-ovb", 8.5, "An omitted variable has coefficient $\\gamma = 2$ and $\\mathrm{Cov}(X, Z)/\\mathrm{Var}(X) = 0.3$. What is the bias in the slope on $X$?", 0.6, 0.001),
  s(OA, "x4r-which", 8.5, "Which assumptions are needed for OLS to be unbiased, to be BLUE, and to give exact t and F inference?",
    "Unbiased: correct linear mean, full rank, and $\\mathbb{E}[\\varepsilon \\mid X] = 0$. BLUE (Gauss–Markov): additionally homoskedastic, uncorrelated errors.",
    "Exact finite-sample t/F: additionally normal errors. For large samples, normality can be dropped (CLT), and heteroskedasticity handled with robust SEs."),
  s(OA, "x4r-hetero", 9, "Why does heteroskedasticity leave OLS unbiased but invalidate its usual standard errors?",
    "Unbiasedness uses only $\\mathbb{E}[\\varepsilon \\mid X] = 0$, not the variance.",
    "The usual formula $\\sigma^2(X^\\top X)^{-1}$ assumes $\\mathrm{Var}(\\varepsilon) = \\sigma^2I$; with non-constant variance the true covariance is the sandwich $(X^\\top X)^{-1}X^\\top\\Omega X(X^\\top X)^{-1}$, so tests and intervals are wrong and OLS is no longer efficient."),
  n(OA, "x4r-simultaneity", 9, "With endogeneity the OLS slope converges to $\\beta + \\mathrm{Cov}(x, \\varepsilon)/\\mathrm{Var}(x)$. Compute it for $\\beta = 1$, $\\mathrm{Cov}(x, \\varepsilon) = 0.5$ and $\\mathrm{Var}(x) = 2$.", 1.25, 0.001),
  s(OA, "x4r-endog", 9, "Describe three sources of endogeneity and the standard remedy.",
    "Omitted variables correlated with $x$; measurement error in $x$ (attenuation); simultaneity or reverse causality ($y$ affects $x$).",
    "Instrumental variables — a variable correlated with $x$ but affecting $y$ only through $x$ — give consistent estimates (2SLS); panel fixed effects and experiments are alternatives."),
  s(OA, "x4r-linearity", 9, "Why is correct specification of the mean (linearity) arguably the most important assumption?",
    "If $\\mathbb{E}[y \\mid x]$ isn't linear in the included terms, the coefficients estimate only the best linear approximation, whose meaning depends on the distribution of $x$.",
    "Tests, intervals and predictions about the conditional mean are then biased no matter how the errors behave; violations of error assumptions mainly affect efficiency and SEs."),
  s(OA, "x4r-check", 9.5, "Which OLS assumptions can be checked from the residuals, and which can't?",
    "Residual plots and tests check linearity (curvature), constant variance, normality (QQ plots) and, with ordering, serial correlation.",
    "Exogeneity can't be checked: OLS residuals are orthogonal to $X$ by construction, whatever the true correlation between $X$ and the errors. It must be argued from design or subject knowledge."),

  // --- ols-properties -----------------------------------------------------------------
  n(OP, "x4r-mean", 5, "Under exogeneity with true $\\beta = 3$, what is $\\mathbb{E}[\\hat\\beta]$?", 3),
  n(OP, "x4r-se", 6.5, "$\\sigma^2 = 4$ and $(X^\\top X)^{-1}_{22} = 0.05$. Compute $\\mathrm{SE}(\\hat\\beta_2)$.", 0.4472, 0.001),
  n(OP, "x4r-n", 7, "A slope has SE $0.4$ with $n = 100$. What SE do you expect with $n = 400$ (same design)?", 0.2, 0.001),
  n(OP, "x4r-ers", 7.5, "With $\\sigma^2 = 3$, $n = 25$ and $p = 5$, compute $\\mathbb{E}[\\mathrm{RSS}] = \\sigma^2(n - p)$.", 60),
  s(OP, "x4r-unbiased-proof", 8, "Prove that OLS is unbiased under $\\mathbb{E}[\\varepsilon \\mid X] = 0$.",
    "$\\hat\\beta = (X^\\top X)^{-1}X^\\top y = \\beta + (X^\\top X)^{-1}X^\\top\\varepsilon$.",
    "Conditioning on $X$, $\\mathbb{E}[\\hat\\beta \\mid X] = \\beta + (X^\\top X)^{-1}X^\\top\\mathbb{E}[\\varepsilon \\mid X] = \\beta$; take expectations over $X$."),
  n(OP, "x4r-cov", 8, "Compute $\\mathrm{Cov}(\\hat\\beta, e)$ (entrywise) under normal errors.", 0),
  s(OP, "x4r-indep", 8.5, "Why are $\\hat\\beta$ and $s^2$ independent under normal errors?",
    "$\\hat\\beta$ depends on $y$ only through $Hy$ and $s^2$ only through $(I - H)y$; these are projections onto orthogonal subspaces.",
    "Their covariance is $\\sigma^2H(I - H) = 0$, and for jointly Gaussian vectors zero covariance means independence — the basis of the t-distribution of $(\\hat\\beta_j - \\beta_j)/\\mathrm{SE}$."),
  n(OP, "x4r-shrink", 9, "Scalar case: OLS has variance $1$ and no bias, with $\\beta = 1$. Compute the MSE of the shrunk estimator $0.8\\hat\\beta$.", 0.68, 0.001),
  s(OP, "x4r-consistent", 9, "What does OLS consistency require as $n \\to \\infty$?",
    "$\\hat\\beta - \\beta = (X^\\top X/n)^{-1}(X^\\top\\varepsilon/n)$; we need $X^\\top X/n \\to Q$ positive definite and $X^\\top\\varepsilon/n \\to 0$, i.e. $\\mathbb{E}[x\\varepsilon] = 0$.",
    "No normality or homoskedasticity is needed; consistency fails under endogeneity or if the design stops adding information (e.g. $x_i \\to$ a constant)."),
  s(OP, "x4r-asymp", 9.5, "Explain the asymptotic normality of OLS without normal errors.",
    "$\\sqrt{n}(\\hat\\beta - \\beta) = (X^\\top X/n)^{-1}X^\\top\\varepsilon/\\sqrt{n}$, and by a CLT $X^\\top\\varepsilon/\\sqrt{n} \\to N(0, \\mathbb{E}[\\varepsilon^2xx^\\top])$.",
    "So $\\sqrt{n}(\\hat\\beta - \\beta) \\to N(0, Q^{-1}\\mathbb{E}[\\varepsilon^2xx^\\top]Q^{-1})$ — the sandwich, which reduces to $\\sigma^2Q^{-1}$ under homoskedasticity."),

  // --- ssr-sse-sst --------------------------------------------------------------------
  n(SS, "x4r-ssr", 5, "$\\mathrm{SST} = 100$ and $\\mathrm{SSE} = 30$. Compute $\\mathrm{SSR}$.", 70),
  n(SS, "x4r-r2", 6.5, "Compute $R^2$ for the same values.", 0.7, 0.001),
  n(SS, "x4r-mse", 7, "$\\mathrm{SSE} = 30$ with $n = 20$ and $p = 3$. Compute the MSE.", 1.7647, 0.001),
  n(SS, "x4r-f", 7.5, "$\\mathrm{SSR} = 70$, $\\mathrm{SSE} = 30$, $n = 20$ and $p = 3$. Compute the overall F-statistic.", 19.833, 0.001),
  s(SS, "x4r-decomp", 8, "Prove $\\mathrm{SST} = \\mathrm{SSR} + \\mathrm{SSE}$ for a model with an intercept.",
    "$y_i - \\bar{y} = (\\hat{y}_i - \\bar{y}) + e_i$; square and sum.",
    "The cross term $2\\sum(\\hat{y}_i - \\bar{y})e_i = 0$ because $e$ is orthogonal to $\\hat{y}$ and, with an intercept, to $\\mathbf{1}$."),
  n(SS, "x4r-df", 8, "With $n = 20$ and $p = 3$, how many degrees of freedom does $\\mathrm{SSR}$ have?", 2),
  s(SS, "x4r-no-int", 8.5, "Why can the decomposition fail without an intercept?",
    "Without an intercept the residuals needn't sum to zero, so $\\sum(\\hat{y}_i - \\bar{y})e_i$ can be nonzero.",
    "The uncentred decomposition $\\|y\\|^2 = \\|\\hat{y}\\|^2 + \\|e\\|^2$ still holds, which is why no-intercept software reports an uncentred $R^2$ that isn't comparable."),
  n(SS, "x4r-essr", 9, "Under $H_0$ that all slopes are zero, with $\\sigma^2 = 2$ and $p - 1 = 2$, compute $\\mathbb{E}[\\mathrm{SSR}]$.", 4),
  n(SS, "x4r-esse", 9, "With $\\sigma^2 = 2$ and $n - p = 17$, compute $\\mathbb{E}[\\mathrm{SSE}]$.", 34),
  s(SS, "x4r-sequential", 9.5, "Explain the sum-of-squares decomposition as Pythagoras, and its sequential (Type I) extension.",
    "Centred $y$ splits into its projection on the centred column space ($\\mathrm{SSR}$) and the orthogonal residual ($\\mathrm{SSE}$).",
    "Adding predictors one at a time splits $\\mathrm{SSR}$ into orthogonal pieces — the extra projection gained by each term given those before it. These sequential sums of squares depend on the order unless the predictors are orthogonal."),

  // --- r-squared ----------------------------------------------------------------------
  n(R2, "x4r-basic", 5, "$\\mathrm{SSE} = 20$ and $\\mathrm{SST} = 80$. Compute $R^2$.", 0.75, 0.001),
  n(R2, "x4r-r", 6.5, "Simple regression with $r = -0.6$: compute $R^2$.", 0.36, 0.001),
  n(R2, "x4r-adj", 7, "$R^2 = 0.8$ with $n = 25$ and $k = 4$ predictors. Compute adjusted $R^2$.", 0.76, 0.001),
  n(R2, "x4r-noise", 7.5, "With $k = 5$ pure-noise predictors and $n = 51$, the expected $R^2$ is about $k/(n - 1)$. Compute it.", 0.1, 0.001),
  s(R2, "x4r-misleading", 8, "Why can $R^2$ be high for a wrong model, or low for a useful one?",
    "A misspecified model (e.g. a line through curved data, or trending time series) can explain most variance while systematically missing structure.",
    "A correct model with a small but real effect and large irreducible noise has low $R^2$ yet useful, precise coefficients; $R^2$ measures fit relative to total variation, not correctness."),
  n(R2, "x4r-fromF", 8, "Using $R^2 = \\frac{Fk}{Fk + n - k - 1}$, compute $R^2$ for $F = 10$, $k = 2$ and $n = 23$.", 0.5, 0.001),
  s(R2, "x4r-transform", 8.5, "Why can't $R^2$ values be compared between models for $y$ and for $\\log y$?",
    "$R^2$ is relative to the variance of the response being modelled; $\\log y$ has a different total sum of squares, so the “explained” fractions aren't on the same scale.",
    "Compare on a common scale instead: back-transform predictions and compute errors on the original $y$, or use likelihood-based criteria including the Jacobian."),
  n(R2, "x4r-oos", 9, "A model has test MSE $1.2$, and the test responses have variance $1$. Compute its out-of-sample $R^2 = 1 - \\mathrm{MSE}/\\mathrm{Var}(y)$.", -0.2, 0.001),
  s(R2, "x4r-range", 9, "Why does restricting the range of $x$ lower $R^2$ even when the slope and noise are unchanged?",
    "$R^2 = \\frac{\\beta^2\\mathrm{Var}(x)}{\\beta^2\\mathrm{Var}(x) + \\sigma^2}$, so a smaller spread of $x$ lowers the explained share while $\\sigma^2$ stays the same.",
    "So $R^2$ reflects the design as much as the relationship; the slope and residual SD are more portable summaries."),
  s(R2, "x4r-corr", 9.5, "Prove that $R^2$ equals the squared correlation between $y$ and $\\hat{y}$ (with an intercept).",
    "$\\mathrm{Cov}(y, \\hat{y}) = \\mathrm{Cov}(\\hat{y} + e, \\hat{y}) = \\mathrm{Var}(\\hat{y})$, because $e$ is orthogonal to $\\hat{y}$ and has mean zero.",
    "So $\\mathrm{corr}^2(y, \\hat{y}) = \\frac{\\mathrm{Var}(\\hat{y})^2}{\\mathrm{Var}(y)\\mathrm{Var}(\\hat{y})} = \\frac{\\mathrm{Var}(\\hat{y})}{\\mathrm{Var}(y)} = \\mathrm{SSR}/\\mathrm{SST}$."),

  // --- effect-of-adding-another-variable -----------------------------------------------
  n(EA, "x4r-dr2", 5, "RSS falls from $100$ to $90$ when a variable is added, with $\\mathrm{SST} = 200$. By how much does $R^2$ increase?", 0.05, 0.001),
  n(EA, "x4r-partialF", 6.5, "Same change, with $n - p = 45$ residual degrees of freedom in the larger model. Compute the partial F-statistic.", 5),
  n(EA, "x4r-partialR2", 7, "Compute the partial $R^2$ of the new variable, $(\\mathrm{RSS}_R - \\mathrm{RSS}_F)/\\mathrm{RSS}_R$.", 0.1, 0.001),
  n(EA, "x4r-t", 7.5, "The new coefficient's $t^2$ equals the partial F. Compute $|t|$.", 2.2361, 0.001),
  s(EA, "x4r-adj", 8, "Why can't $R^2$ decrease when a variable is added, while adjusted $R^2$ can?",
    "$R^2$ can't fall because the larger model can always reproduce the smaller fit (coefficient $0$), so RSS can't increase.",
    "Adjusted $R^2$ divides RSS by $n - p$, so it penalises the lost degree of freedom and falls when the new variable's $|t| < 1$."),
  n(EA, "x4r-t1", 8, "Adjusted $R^2$ increases when a variable is added exactly when its $|t|$ exceeds what value?", 1),
  s(EA, "x4r-fwl", 8.5, "Use Frisch–Waugh–Lovell to explain how a newly added variable's coefficient is computed.",
    "Regress $y$ and the new variable $z$ separately on the existing predictors, and keep both sets of residuals.",
    "The new coefficient is the slope of $y$'s residuals on $z$'s residuals: only the part of $z$ not explained by the existing predictors is used."),
  n(EA, "x4r-inflate", 9, "Adding a predictor correlated $0.8$ with an existing one inflates the existing coefficient's SE by $\\sqrt{1/(1 - r^2)}$. Compute this factor.", 1.6667, 0.001),
  s(EA, "x4r-change", 9, "When does adding a variable change the other coefficients, and when doesn't it?",
    "If the new variable is uncorrelated (orthogonal) with the existing predictors, the other coefficients don't change (though their SEs can, via $\\sigma^2$).",
    "If it's correlated with them and related to $y$, their coefficients shift by the omitted-variable bias they were previously absorbing."),
  s(EA, "x4r-tradeoff", 9.5, "Explain the bias–variance trade-off of including variables, including when omitting a relevant variable can improve prediction.",
    "Including a variable removes omitted-variable bias but adds estimation variance, especially when it's correlated with other predictors or its effect is small.",
    "If $|\\beta_j|$ is small relative to its SE, dropping it can lower mean squared prediction error (the basis of $C_p$/AIC selection and shrinkage)."),

  // --- less-than-full-rank-models -----------------------------------------------------
  m(LF, "x4r-oneway", 5, "A one-way ANOVA with an intercept and a dummy for each of the $k$ groups is:", "Rank deficient by one",
    [["Full rank", "The dummies sum to the intercept column."], ["Rank deficient by $k$", "Only one dependency."], ["Always singular in the residual", "No."]]),
  n(LF, "x4r-rank", 6.5, "What is the rank of $X$ with an intercept plus $3$ dummies for $3$ groups?", 3),
  n(LF, "x4r-null", 7, "What is the dimension of the null space of that $X$?", 1),
  n(LF, "x4r-fitted", 7.5, "Group means are $5$, $7$ and $9$. What is the fitted value for an observation in group $2$ (under any solution of the normal equations)?", 7),
  s(LF, "x4r-unique-fit", 8, "Why are the fitted values unique even though $\\hat\\beta$ isn't in a rank-deficient model?",
    "The fitted values are the orthogonal projection of $y$ onto $\\mathrm{col}(X)$, which is unique.",
    "Different solutions of the normal equations differ by null-space vectors of $X$, which don't change $X\\hat\\beta$."),
  n(LF, "x4r-sumzero-int", 8, "With the sum-to-zero constraint on group effects and group means $5$, $7$, $9$ (equal sizes), what is the intercept?", 7),
  n(LF, "x4r-sumzero-a1", 8.5, "Under the same constraint, what is the effect $\\alpha_1$?", -2),
  s(LF, "x4r-ginv", 8.5, "Explain generalised inverses in rank-deficient least squares.",
    "A generalised inverse $G$ satisfies $X^\\top XGX^\\top X = X^\\top X$, and $\\hat\\beta = GX^\\top y$ solves the normal equations; different $G$ give different $\\hat\\beta$.",
    "$XGX^\\top$ is the same projection for every choice, so fitted values and estimable functions are unaffected; the Moore–Penrose inverse gives the minimum-norm solution."),
  n(LF, "x4r-corner", 9, "With the reference-level constraint $\\alpha_1 = 0$ and group means $5$, $7$, $9$, what is the intercept?", 5),
  s(LF, "x4r-estimable", 9.5, "Which linear functions $c^\\top\\beta$ are estimable in a rank-deficient model?",
    "$c^\\top\\beta$ is estimable iff $c$ lies in the row space of $X$, i.e. $c^\\top\\beta = a^\\top\\mathbb{E}[y]$ for some $a$.",
    "Then $c^\\top\\hat\\beta$ is the same for every solution and is BLUE; e.g. group means and contrasts $\\alpha_i - \\alpha_j$ are estimable, individual $\\alpha_i$ aren't."),

  // --- centering-and-scaling -------------------------------------------------------------
  n(CS, "x4r-intercept", 5, "With $x$ centred, the intercept of a simple regression equals $\\bar{y}$. If $\\bar{y} = 12$, what is it?", 12),
  n(CS, "x4r-rescale", 6.5, "The slope is $3$ per unit of $x$. If $x$ is re-expressed in thousands ($x' = x/1000$), what is the new slope?", 3000),
  n(CS, "x4r-std", 7, "Slope $2$ with $s_x = 3$ and $s_y = 12$. Compute the standardised coefficient.", 0.5, 0.001),
  n(CS, "x4r-corr-raw", 7.5, "For $x = 1, 2, 3$, compute $\\mathrm{corr}(x, x^2)$.", 0.9897, 0.001),
  s(CS, "x4r-meaning", 8, "Why does centring change the intercept's meaning but not the slope?",
    "Replacing $x$ by $x - \\bar{x}$ just shifts the origin; the line's steepness is unchanged, so the slope is the same.",
    "The intercept now gives the predicted $y$ at $x = \\bar{x}$ (a typical value) instead of at $x = 0$, which may be meaningless or far outside the data."),
  n(CS, "x4r-corr-centred", 8, "After centring, compute $\\mathrm{corr}(x, x^2)$ for $x = 1, 2, 3$ (i.e. $x = -1, 0, 1$).", 0),
  s(CS, "x4r-penalised", 8.5, "Why are predictors standardised before ridge or lasso?",
    "The penalty treats all coefficients alike, but a coefficient's size depends on its variable's units; unstandardised, variables with small scales get large coefficients and are penalised more.",
    "Standardising makes the penalty scale-invariant (and the intercept is left unpenalised)."),
  n(CS, "x4r-std-r", 9, "After standardising both $x$ and $y$ in a simple regression with $r = 0.4$, what is the slope?", 0.4, 0.001),
  s(CS, "x4r-collinear", 9, "Does centring fix multicollinearity?",
    "It removes “non-essential” collinearity created by the parameterisation, such as between $x$ and $x^2$ or main effects and interactions, which improves numerical conditioning.",
    "It can't fix “essential” collinearity between genuinely related predictors; the fitted values and the highest-order coefficients are unchanged."),
  s(CS, "x4r-interaction", 9.5, "How does centring affect main-effect interpretation in a model with an interaction?",
    "In $y = \\beta_0 + \\beta_1x + \\beta_2z + \\beta_3xz$, $\\beta_1$ is the slope of $x$ when $z = 0$.",
    "Centring $z$ makes $\\beta_1$ the slope at the average $z$, which is usually more meaningful; $\\beta_3$ and the fit are unchanged."),

  // --- homoskedasticity ----------------------------------------------------------------
  n(HO, "x4r-ratio", 5, "Residual variance is $4$ in group A and $16$ in group B. What is the ratio of B's variance to A's?", 4),
  m(HO, "x4r-def", 6, "Homoskedasticity means:", "The error variance is the same for all values of the predictors",
    [["The errors are normal", "A different assumption."], ["The errors are independent", "A different assumption."], ["The predictors have equal variances", "No."]]),
  n(HO, "x4r-var", 8, "$\\mathrm{Var}(\\varepsilon \\mid x) = \\sigma^2x^2$ with $\\sigma^2 = 1$. Compute the variance at $x = 3$.", 9),
  n(HO, "x4r-weight", 8.5, "What is the WLS weight ($1/$variance) for that observation?", 0.1111, 0.001),
  s(HO, "x4r-consequences", 8.5, "What are the consequences of heteroskedasticity for OLS?",
    "OLS remains unbiased and consistent, but it's no longer BLUE (WLS is better).",
    "The usual standard errors are wrong — typically too small where high-variance points have high leverage — so t-tests, F-tests and intervals are invalid unless robust SEs are used."),
  n(HO, "x4r-log", 9, "If the SD of $y$ is proportional to its mean, with $\\mathrm{SD} = 0.1 \\times$ mean, what is the approximate SD of $\\log y$?", 0.1, 0.001),
  s(HO, "x4r-vst", 9, "Explain variance-stabilising transformations.",
    "If $\\mathrm{Var}(y) = g(\\mu)$, the delta method shows $h(y)$ has roughly constant variance when $h'(\\mu) \\propto 1/\\sqrt{g(\\mu)}$.",
    "Examples: $\\sqrt{y}$ for Poisson counts, $\\log y$ when $\\mathrm{SD} \\propto \\mu$, $\\arcsin\\sqrt{p}$ for binomial proportions. The transformation also changes the mean model, so GLMs are often preferable."),
  s(HO, "x4r-plots", 9, "How are residual plots used to detect heteroskedasticity?",
    "Plot residuals (or $\\sqrt{|\\text{studentised residuals}|}$) against fitted values or each predictor; a funnel or trend in spread signals non-constant variance.",
    "Studentised residuals matter because raw residuals have unequal variances $\\sigma^2(1 - h_{ii})$ even under homoskedasticity."),
  n(HO, "x4r-sqrt", 9, "For Poisson counts, what is the approximate variance of $\\sqrt{Y}$ for large means?", 0.25, 0.001),
  s(HO, "x4r-robust-vs-wls", 9.5, "When should you use heteroskedasticity-robust SEs, and when WLS?",
    "Robust (sandwich) SEs keep the OLS estimate and correct inference without modelling the variance — ideal when the variance form is unknown and $n$ is large.",
    "WLS models the variance and gains efficiency when the variance function is known or well estimated; with an estimated variance model, combining WLS with robust SEs guards against getting it wrong."),

  // --- vif ---------------------------------------------------------------------------
  n(VI, "x4r-basic", 5, "A predictor has $R_j^2 = 0.8$ when regressed on the others. Compute its VIF.", 5),
  n(VI, "x4r-se", 6.5, "A VIF of $9$ inflates the coefficient's SE by what factor?", 3),
  n(VI, "x4r-r2", 7, "What $R_j^2$ corresponds to a VIF of $10$?", 0.9, 0.001),
  n(VI, "x4r-pair", 7.5, "Two predictors have correlation $0.95$. Compute their VIF.", 10.256, 0.001),
  s(VI, "x4r-def", 8, "What does the VIF measure, and how is it computed?",
    "$\\mathrm{VIF}_j = 1/(1 - R_j^2)$, where $R_j^2$ comes from regressing $x_j$ on the other predictors.",
    "It's the factor by which $\\mathrm{Var}(\\hat\\beta_j)$ is inflated relative to a design where $x_j$ is uncorrelated with the others."),
  n(VI, "x4r-orth", 8, "What are the VIFs of mutually orthogonal predictors?", 1),
  s(VI, "x4r-not-problem", 8.5, "Why isn't a high VIF necessarily a problem?",
    "Collinearity inflates the variances of individual coefficients but not of predictions within the data range, so it's harmless for pure prediction.",
    "It's also fine among control variables you don't interpret, or when $n$ is large enough that SEs are still small; the real issue is imprecision of the coefficients you care about."),
  n(VI, "x4r-invcorr", 9, "The VIFs are the diagonal of the inverse correlation matrix. For the correlation matrix $\\begin{bmatrix}1 & 0.6\\\\0.6 & 1\\end{bmatrix}$, compute the VIF.", 1.5625, 0.001),
  s(VI, "x4r-multi", 9, "Why can a VIF be large when no pairwise correlation is high?",
    "Collinearity can involve several variables: $x_1$ may be nearly a linear combination of $x_2, \\ldots, x_5$ while each pairwise correlation is modest.",
    "$R_j^2$ captures the combined linear dependence, so VIFs (or condition indices) detect what a pairwise correlation matrix misses."),
  s(VI, "x4r-ratio", 9.5, "Show that the VIF equals the ratio of $\\mathrm{Var}(\\hat\\beta_j)$ to its value in an orthogonal design.",
    "By Frisch–Waugh, $\\mathrm{Var}(\\hat\\beta_j) = \\sigma^2/\\|M_{-j}x_j\\|^2$, where $M_{-j}$ residualises on the other predictors (with an intercept).",
    "$\\|M_{-j}x_j\\|^2 = \\mathrm{SST}_j(1 - R_j^2)$, while in an orthogonal design it would be $\\mathrm{SST}_j$; the ratio is $1/(1 - R_j^2)$."),

  // --- partitioned-regression -----------------------------------------------------------
  n(PR, "x4r-fwl", 5, "After residualising on $X_1$, $y$ has residuals $(1, -1, 0)$ and $x_2$ has residuals $(2, -2, 0)$. Compute $\\hat\\beta_2$.", 0.5, 0.001),
  n(PR, "x4r-orth", 6.5, "$X_1$ and $X_2$ are orthogonal, and the simple regression of $y$ on $x_2$ gives slope $1.7$. What is $\\hat\\beta_2$ in the joint regression?", 1.7, 0.001),
  n(PR, "x4r-inv", 7, "$x_2^\\top M_1x_2 = 25$. Compute $(X^\\top X)^{-1}_{22} = 1/(x_2^\\top M_1x_2)$.", 0.04, 0.001),
  n(PR, "x4r-se", 7.5, "With $\\sigma = 2$, compute $\\mathrm{SE}(\\hat\\beta_2)$.", 0.4, 0.001),
  s(PR, "x4r-fwl-state", 8, "State the Frisch–Waugh–Lovell theorem.",
    "In $y = X_1\\beta_1 + X_2\\beta_2 + \\varepsilon$, $\\hat\\beta_2$ equals the coefficient from regressing $M_1y$ on $M_1X_2$, where $M_1 = I - X_1(X_1^\\top X_1)^{-1}X_1^\\top$.",
    "The residuals are also identical; the theorem explains “controlling for” $X_1$ and underlies fixed-effects (within) estimators."),
  n(PR, "x4r-centre", 8, "The residual-maker for an intercept-only model centres a vector. What is the middle entry of $M_1x$ for $x = (1, 2, 3)$?", 0),
  s(PR, "x4r-intercept", 8.5, "Use Frisch–Waugh–Lovell to explain why including an intercept is equivalent to centring.",
    "Take $X_1 = \\mathbf{1}$: $M_1$ subtracts the mean, so residualising $y$ and the predictors on the intercept is exactly centring them.",
    "So the slopes from a model with an intercept equal those from a no-intercept regression of centred $y$ on centred predictors."),
  n(PR, "x4r-partial-r", 9, "Compute the partial correlation of $y$ and $x_2$ given $x_1$ from $r_{yx_2} = 0.5$, $r_{yx_1} = 0.4$ and $r_{x_1x_2} = 0.6$.", 0.3546, 0.001),
  s(PR, "x4r-avplot", 9, "Explain the added-variable plot and its relation to Frisch–Waugh–Lovell.",
    "Plot the residuals of $y$ on the other predictors against the residuals of $x_j$ on the other predictors.",
    "By FWL its least squares slope is exactly $\\hat\\beta_j$, and its residuals are the full model's; it shows the partial relationship and which points drive it."),
  s(PR, "x4r-partitioned-inverse", 9.5, "Explain the partitioned-inverse formula for $(X^\\top X)^{-1}$ and its connection to the Schur complement.",
    "The $(2, 2)$ block of $(X^\\top X)^{-1}$ is $(X_2^\\top X_2 - X_2^\\top X_1(X_1^\\top X_1)^{-1}X_1^\\top X_2)^{-1} = (X_2^\\top M_1X_2)^{-1}$ — the inverse Schur complement.",
    "So $\\mathrm{Var}(\\hat\\beta_2) = \\sigma^2(X_2^\\top M_1X_2)^{-1}$, which is FWL expressed in matrix form."),
];
