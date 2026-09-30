import type { Item } from "../../../lib/assessment/types";
import { makeBuilders } from "../authoring";
import { EXPANSION } from "./source";

/** Regression 40-pass (part C): constrained/weighted/generalised LS, estimability, ANOVA and hypothesis testing. */
const { mcq, short, num } = makeBuilders(EXPANSION);

const s = (concept: string, slug: string, level: number, stem: string, a: string, b: string) =>
  short({ concept, slug, cognitive: level >= 8.5 ? "transfer" : "explain", level, seconds: level >= 9 ? 300 : 200, stem },
    [["main", a, 5, true], ["detail", b, 4, true]]);
const n = (concept: string, slug: string, level: number, stem: string, key: number, tol = 0.01) =>
  num({ concept, slug, cognitive: "apply", level, seconds: level >= 7 ? 90 : 25, stem }, key, tol);
const m = (concept: string, slug: string, level: number, stem: string, right: string, wrong: [string, string][]) =>
  mcq({ concept, slug, cognitive: level <= 3 ? "recall" : "apply", level, seconds: 25, stem },
    right, wrong.map(([t, why], i) => [t, `${concept}-${slug}-${i}`, why] as [string, string, string]));

const RL = "restricted-least-squares";
const WL = "weighted-least-squares";
const EF = "estimable-functions";
const GL = "generalized-least-squares";
const AN = "anova";
const GH = "general-linear-hypothesis";
const NC = "noncentral-chi-square-and-f";
const LF = "lack-of-fit-test";
const SC = "simultaneous-confidence-intervals";
const CR = "confidence-regions-for-beta";

const RLS = "Unrestricted $\\hat\\beta = (0.7, 0.5)$ with $(X^\\top X)^{-1} = I$, and the constraint $\\beta_1 + \\beta_2 = 1$";

export const rgFortyCItems: Item[] = [
  // --- restricted-least-squares ---------------------------------------------------------
  n(RL, "x4r-b1", 5, `${RLS}. Compute the restricted estimate of $\\beta_1$.`, 0.6, 0.001),
  n(RL, "x4r-b2", 6.5, `${RLS}. Compute the restricted estimate of $\\beta_2$.`, 0.4, 0.001),
  n(RL, "x4r-cd", 7, "A Cobb–Douglas fit is restricted to constant returns, $b + c = 1$. If $\\hat{b} = 0.4$ in the restricted fit, what is $\\hat{c}$?", 0.6, 0.001),
  n(RL, "x4r-rss", 7.5, `${RLS}. Compute the increase in RSS, $(A\\hat\\beta - c)^\\top[A(X^\\top X)^{-1}A^\\top]^{-1}(A\\hat\\beta - c)$.`, 0.02, 0.0005),
  s(RL, "x4r-lagrange", 8, "Derive the restricted least squares estimator for $A\\beta = c$ using Lagrange multipliers.",
    "Minimise $\\|y - X\\beta\\|^2 + 2\\lambda^\\top(A\\beta - c)$: the first-order conditions give $X^\\top X\\tilde\\beta = X^\\top y - A^\\top\\lambda$.",
    "Solving with the constraint yields $\\tilde\\beta = \\hat\\beta - (X^\\top X)^{-1}A^\\top[A(X^\\top X)^{-1}A^\\top]^{-1}(A\\hat\\beta - c)$ — OLS corrected towards the constraint."),
  n(RL, "x4r-F", 8, "Restricting $\\beta_2 = 0$ raises RSS from $50$ to $60$; there is $q = 1$ restriction and $n - p = 25$. Compute $F$.", 5),
  s(RL, "x4r-tradeoff", 8.5, "Why is restricted least squares more efficient when the restriction is true, but biased when it's false?",
    "The restriction adds information, so $\\mathrm{Var}(\\tilde\\beta) = \\mathrm{Var}(\\hat\\beta) - $ (a PSD matrix): it's never less precise.",
    "If $A\\beta \\ne c$, $\\tilde\\beta$ is biased by the projection of the violation; the MSE comparison then depends on the size of the violation relative to the variance saved."),
  n(RL, "x4r-Fone", 8.5, "One restriction raises RSS by $6$, and $s^2 = 2$. Compute $F$.", 3),
  s(RL, "x4r-reparam", 9, "Explain reparameterisation as an alternative to constrained estimation, using the Cobb–Douglas constant-returns example.",
    "Substitute the constraint: with $b + c = 1$, $\\log Y = a + b\\log K + (1 - b)\\log L$ becomes $\\log(Y/L) = a + b\\log(K/L)$.",
    "Ordinary least squares on the transformed variables gives the restricted estimates and correct standard errors directly."),
  s(RL, "x4r-inequality", 9.5, "How do estimation and inference change with inequality constraints such as $\\beta \\ge 0$?",
    "Estimation becomes a quadratic program (e.g. non-negative least squares): the solution is OLS when the constraint is inactive and lies on the boundary otherwise.",
    "Inference is non-standard near the boundary: test statistics follow chi-bar-squared mixtures, and ordinary intervals can include impossible values or undercover."),

  // --- weighted-least-squares --------------------------------------------------------------
  n(WL, "x4r-mean-weight", 5, "Group means have variance $\\sigma^2/n_i$. What weight does a mean based on $n_i = 10$ get?", 10),
  n(WL, "x4r-wmean", 6.5, "Compute the WLS estimate of a common mean from $2$ (weight $1$) and $5$ (weight $2$).", 4),
  n(WL, "x4r-wvar", 7, "With $\\mathrm{Var}_i = \\sigma^2/w_i$ and $\\sigma^2 = 6$, compute the variance of that weighted mean.", 2),
  n(WL, "x4r-transform", 7.5, "WLS rescales each row by $\\sqrt{w_i}$. For $w = 4$ and $y = 3$, what is the transformed $y$?", 6),
  s(WL, "x4r-ols-transformed", 8, "Show that WLS is OLS on transformed data.",
    "With $W = \\mathrm{diag}(w_i)$, minimising $\\sum w_i(y_i - x_i^\\top\\beta)^2 = \\|W^{1/2}y - W^{1/2}X\\beta\\|^2$ is OLS for $y^* = W^{1/2}y$ and $X^* = W^{1/2}X$.",
    "The transformed errors have constant variance, so Gauss–Markov applies: $\\hat\\beta_W = (X^\\top WX)^{-1}X^\\top Wy$ is BLUE when $w_i \\propto 1/\\mathrm{Var}(\\varepsilon_i)$."),
  n(WL, "x4r-ols-var", 8, "Two observations of a common mean have variances $1$ and $4$. Compute the variance of their unweighted average.", 1.25, 0.001),
  n(WL, "x4r-wls-var", 8.5, "Compute the variance of the optimally weighted (WLS) mean of the same two observations.", 0.8, 0.001),
  s(WL, "x4r-misspec", 8.5, "What happens if the WLS weights are misspecified?",
    "The estimator stays unbiased (weights don't affect unbiasedness under exogeneity) but loses efficiency.",
    "The usual WLS standard errors are wrong; a sandwich estimator restores valid inference."),
  n(WL, "x4r-fwls", 9, "Feasible WLS with estimated $\\sigma_i^2 = \\exp(\\gamma_0 + \\gamma_1x_i)$, $\\gamma_0 = 0$ and $\\gamma_1 = 0.5$: what weight does an observation with $x = 2$ get?", 0.3679, 0.001),
  s(WL, "x4r-irls", 9.5, "How does GLM fitting use weighted least squares?",
    "Iteratively reweighted least squares: at each step, form a working response $z = \\eta + (y - \\mu)g'(\\mu)$ and weights $w = 1/[V(\\mu)g'(\\mu)^2]$, then solve a WLS problem.",
    "Repeating until convergence gives the MLE; it's Fisher scoring (Newton's method for the canonical link), and the final weights give the estimated covariance $(X^\\top WX)^{-1}\\phi$."),

  // --- estimable-functions ---------------------------------------------------------------
  m(EF, "x4r-which", 5, "In the one-way model $y_{ij} = \\mu + \\alpha_i + \\varepsilon_{ij}$, which of these is estimable?", "$\\alpha_1 - \\alpha_2$",
    [["$\\mu$", "Not estimable without a constraint."], ["$\\alpha_1$", "Not estimable without a constraint."], ["$\\alpha_1 + \\alpha_2$", "Not estimable."]]),
  n(EF, "x4r-contrast", 6.5, "Group means are $10$ and $14$. Estimate $\\alpha_1 - \\alpha_2$.", -4),
  n(EF, "x4r-mean", 7, "Estimate $\\mu + \\alpha_2$ for the same data.", 14),
  n(EF, "x4r-contrast3", 7.5, "Group means are $10$, $14$ and $20$. Estimate the contrast $\\alpha_1 - 2\\alpha_2 + \\alpha_3$.", 2),
  s(EF, "x4r-def", 8, "Define an estimable function.",
    "$c^\\top\\beta$ is estimable if some linear function of the data is unbiased for it: $\\mathbb{E}[a^\\top y] = c^\\top\\beta$ for all $\\beta$.",
    "Equivalently $c^\\top = a^\\top X$ — $c$ lies in the row space of $X$ — so the function depends on $\\beta$ only through $\\mathbb{E}[y] = X\\beta$."),
  n(EF, "x4r-var", 8, "With $\\sigma^2 = 8$ and $n_1 = n_2 = 4$, compute the variance of the estimate of $\\alpha_1 - \\alpha_2$.", 4),
  s(EF, "x4r-invariant", 8.5, "Why is the estimate of an estimable function the same for every generalised-inverse solution?",
    "Solutions differ by null-space vectors $v$ of $X$, and $c^\\top = a^\\top X$ gives $c^\\top v = a^\\top Xv = 0$.",
    "So $c^\\top\\hat\\beta = a^\\top X\\hat\\beta = a^\\top\\hat{y}$, which is unique; by Gauss–Markov it's BLUE."),
  n(EF, "x4r-twoway", 9, "In a two-way additive model with all cells observed, is $\\mu + \\alpha_1 + \\beta_1$ estimable? Answer $1$ for yes, $0$ for no.", 1),
  s(EF, "x4r-test", 9, "Give a practical test for whether $c^\\top\\beta$ is estimable.",
    "$c^\\top\\beta$ is estimable iff $c^\\top GX^\\top X = c^\\top$ for a generalised inverse $G$ of $X^\\top X$ (equivalently $c$ is orthogonal to the null space of $X$).",
    "E.g. in one-way ANOVA, $c$ must satisfy $c_\\mu = \\sum_ic_{\\alpha_i}$, so contrasts ($\\sum c_{\\alpha_i} = 0$ with $c_\\mu = 0$) and cell means qualify."),
  s(EF, "x4r-connected", 9.5, "What is a connected design in a two-way layout, and why does it matter for estimability?",
    "A design is connected if its cells link all row and column levels (the bipartite graph of observed cells is connected).",
    "Then all row contrasts and all column contrasts are estimable; in a disconnected design, contrasts between levels in different components aren't."),

  // --- generalized-least-squares ------------------------------------------------------------
  n(GL, "x4r-weights", 5, "GLS with $\\Sigma = \\mathrm{diag}(1, 4)$: what weight does the second observation get?", 0.25, 0.001),
  n(GL, "x4r-ar1-var", 6.5, "AR(1) errors with $\\rho = 0.5$ and innovation variance $1$. Compute the stationary error variance $1/(1 - \\rho^2)$.", 1.3333, 0.001),
  n(GL, "x4r-ar1-corr", 7, "What is the correlation between AR(1) errors two steps apart when $\\rho = 0.5$?", 0.25, 0.001),
  n(GL, "x4r-pw", 7.5, "The Prais–Winsten transform uses $y_t^* = y_t - \\rho y_{t-1}$. For $y = (2, 3)$ and $\\rho = 0.5$, compute $y_2^*$.", 2),
  s(GL, "x4r-whiten", 8, "Derive GLS by whitening.",
    "With $\\mathrm{Var}(\\varepsilon) = \\sigma^2\\Sigma$, premultiply by $\\Sigma^{-1/2}$: the transformed errors have covariance $\\sigma^2I$.",
    "OLS on $(\\Sigma^{-1/2}X, \\Sigma^{-1/2}y)$ gives $\\hat\\beta_{GLS} = (X^\\top\\Sigma^{-1}X)^{-1}X^\\top\\Sigma^{-1}y$ with covariance $\\sigma^2(X^\\top\\Sigma^{-1}X)^{-1}$."),
  n(GL, "x4r-equi", 8, "Equicorrelated errors: the variance of the mean is $\\sigma^2(1 + (n - 1)\\rho)/n$. Compute it for $\\sigma^2 = 1$, $n = 10$ and $\\rho = 0.2$.", 0.28, 0.001),
  s(GL, "x4r-aitken", 8.5, "State Aitken's theorem.",
    "With $\\mathrm{Var}(\\varepsilon) = \\sigma^2\\Sigma$ for a known positive definite $\\Sigma$, GLS is the best linear unbiased estimator.",
    "It's Gauss–Markov applied to the whitened model; OLS remains unbiased but is less efficient and its usual SEs are wrong."),
  n(GL, "x4r-ess", 9, "Compute the effective sample size $n/(1 + (n - 1)\\rho)$ for $n = 10$ equicorrelated observations with $\\rho = 0.2$.", 3.5714, 0.001),
  s(GL, "x4r-kruskal", 9, "When does OLS coincide with GLS (Kruskal's theorem)?",
    "OLS equals GLS for all $y$ exactly when $\\mathrm{col}(X)$ is invariant under $\\Sigma$ ($\\Sigma X = XB$ for some $B$).",
    "E.g. equicorrelated errors with an intercept in the model: OLS is then fully efficient, although the usual SEs still need the correct covariance."),
  s(GL, "x4r-fgls", 9.5, "What are the pitfalls of feasible GLS?",
    "$\\Sigma$ must be estimated; a misspecified or noisy $\\hat\\Sigma$ can make FGLS less efficient than OLS and its standard errors (which ignore estimating $\\Sigma$) too small.",
    "In finite samples FGLS isn't unbiased in general; safer practice is FGLS with sandwich SEs, or OLS with robust (e.g. HAC or cluster) SEs."),

  // --- anova ---------------------------------------------------------------------------
  n(AN, "x4r-msb", 5, "Three groups of $5$: $SS_B = 40$ and $SS_W = 60$. Compute $MS_B$.", 20),
  n(AN, "x4r-msw", 6.5, "Compute $MS_W$.", 5),
  n(AN, "x4r-F", 7, "Compute $F$.", 4),
  n(AN, "x4r-eta", 7.5, "Compute $\\eta^2 = SS_B/SS_T$.", 0.4, 0.001),
  s(AN, "x4r-why", 8, "Why use a one-way ANOVA F-test rather than all pairwise t-tests?",
    "Many pairwise tests inflate the family-wise Type I error (three groups already give three tests).",
    "The F-test gives a single level-$\\alpha$ test of equality of all means, pooling the variance estimate; pairwise comparisons follow with a multiplicity correction."),
  n(AN, "x4r-emsb", 8, "Under $H_0$ with $\\sigma^2 = 5$, what is $\\mathbb{E}[MS_B]$?", 5),
  s(AN, "x4r-regression", 8.5, "Show that one-way ANOVA is a regression with dummy variables.",
    "Regress $y$ on an intercept and $k - 1$ group indicators; the fitted values are the group means.",
    "The regression F-test that all dummy coefficients are zero is exactly the ANOVA F-test, with $SS_B = \\mathrm{SSR}$ and $SS_W = \\mathrm{SSE}$."),
  n(AN, "x4r-emsb-alt", 9, "$n = 5$ per group, effects $(-2, 0, 2)$ and $\\sigma^2 = 5$. Compute $\\mathbb{E}[MS_B] = \\sigma^2 + n\\sum\\alpha_i^2/(k - 1)$.", 25),
  s(AN, "x4r-robust", 9, "How robust is the ANOVA F-test to unequal variances?",
    "With equal group sizes it's fairly robust; with unequal sizes it can be badly off — anti-conservative when small groups have large variances, conservative when large groups do.",
    "Welch's ANOVA or heteroskedasticity-robust tests are safer defaults."),
  n(AN, "x4r-ncp", 9.5, "For the same design, compute the noncentrality parameter $\\lambda = n\\sum\\alpha_i^2/\\sigma^2$.", 8),

  // --- general-linear-hypothesis ----------------------------------------------------------
  n(GH, "x4r-df", 5, "$H_0: C\\beta = d$ with $C$ having $3$ linearly independent rows. How many numerator degrees of freedom does the F-test have?", 3),
  n(GH, "x4r-F", 6.5, "Scalar case: $C\\hat\\beta - d = 2$, $C(X^\\top X)^{-1}C^\\top = 0.5$, $q = 1$ and $s^2 = 2$. Compute $F$.", 4),
  n(GH, "x4r-rows", 7, "Testing $\\beta_1 = \\beta_2$ uses $C = (0, 1, -1)$. How many rows does $C$ have?", 1),
  n(GH, "x4r-t", 7.5, "A single-restriction F-statistic is $4$. What is the equivalent $|t|$?", 2),
  s(GH, "x4r-nested", 8, "Show that every nested-model F-test is a general linear hypothesis.",
    "A reduced model is the full model with linear restrictions on $\\beta$ (e.g. setting coefficients to zero or equal), which can be written as $C\\beta = d$.",
    "The F-statistic $\\frac{(\\mathrm{RSS}_R - \\mathrm{RSS}_F)/q}{\\mathrm{RSS}_F/(n - p)}$ equals $\\frac{(C\\hat\\beta - d)^\\top[C(X^\\top X)^{-1}C^\\top]^{-1}(C\\hat\\beta - d)}{qs^2}$."),
  n(GH, "x4r-wald", 8, "A Wald statistic with $q = 2$ is $7.2$, and the $\\chi^2_2$ critical value is $5.99$. By how much does it exceed the critical value?", 1.21, 0.001),
  s(GH, "x4r-invariant", 8.5, "Why is the F-statistic unchanged if the restrictions $C\\beta = d$ are rewritten as $AC\\beta = Ad$ with invertible $A$?",
    "The restricted parameter set is the same, so the restricted fit and $\\mathrm{RSS}_R$ are unchanged.",
    "Algebraically, $A$ cancels: $[AC(X^\\top X)^{-1}C^\\top A^\\top]^{-1} = A^{-\\top}[C(X^\\top X)^{-1}C^\\top]^{-1}A^{-1}$."),
  n(GH, "x4r-rss", 9, "$\\mathrm{RSS}_H = 130$, $\\mathrm{RSS} = 100$, $q = 2$ and $n - p = 40$. Compute $F$.", 6),
  s(GH, "x4r-nonlinear", 9, "How can you test a nonlinear hypothesis such as $\\beta_1\\beta_2 = 1$?",
    "Use a Wald test with the delta method: $g(\\hat\\beta) = \\hat\\beta_1\\hat\\beta_2 - 1$ has variance $\\approx\\nabla g^\\top\\widehat{\\mathrm{Var}}(\\hat\\beta)\\nabla g$ with $\\nabla g = (\\hat\\beta_2, \\hat\\beta_1)$.",
    "Wald tests of nonlinear restrictions aren't invariant to how the restriction is written; a likelihood ratio test (fitting the restricted model) avoids that."),
  s(GH, "x4r-trinity", 9.5, "Why do the Wald, likelihood ratio and score tests coincide in the normal linear model but differ in GLMs?",
    "With normal errors and known $\\sigma^2$ the log-likelihood is exactly quadratic in $\\beta$, so all three give the same statistic (and with $\\sigma^2$ estimated, monotone functions of the same F).",
    "In GLMs the log-likelihood isn't quadratic, so they differ in finite samples (Wald can behave badly, e.g. the Hauck–Donner effect) while agreeing asymptotically."),

  // --- noncentral-chi-square-and-f ---------------------------------------------------------
  n(NC, "x4r-mean", 5, "Compute the mean of $\\chi^2_4$ with noncentrality $\\lambda = 6$.", 10),
  n(NC, "x4r-var", 6.5, "Compute the variance $2(k + 2\\lambda)$ for $k = 4$ and $\\lambda = 6$.", 32),
  n(NC, "x4r-ncp", 7, "Testing $\\mu = 0$ with $n = 25$ and true $\\mu/\\sigma = 0.4$: compute $\\lambda = n\\mu^2/\\sigma^2$.", 4),
  n(NC, "x4r-power", 7.5, "A $1$-df $\\chi^2$ test at $\\alpha = 0.05$ with $\\lambda = 4$ has power $P(|Z + 2| > 1.96)$. Compute it.", 0.516, 0.001),
  s(NC, "x4r-def", 8, "Define the noncentral chi-square distribution.",
    "If $Z_i \\sim N(\\mu_i, 1)$ independently, then $\\sum_{i=1}^kZ_i^2$ is noncentral $\\chi^2_k$ with noncentrality $\\lambda = \\sum\\mu_i^2$.",
    "It depends on the means only through $\\lambda$; test statistics follow it under the alternative, which is how power is computed."),
  n(NC, "x4r-Fmean", 8, "For large denominator df, a noncentral $F(1, \\infty, \\lambda)$ has mean $1 + \\lambda$. Compute it for $\\lambda = 4$.", 5),
  s(NC, "x4r-effect", 8.5, "How does the noncentrality parameter relate to effect size and sample size?",
    "$\\lambda$ is (roughly) $n$ times a squared standardised effect, e.g. $n\\sum\\alpha_i^2/\\sigma^2$ in ANOVA or $n(\\mu/\\sigma)^2$ for a mean.",
    "So power depends on $n$ and the effect size together through $\\lambda$; required sample sizes come from solving for the $\\lambda$ that gives the target power."),
  n(NC, "x4r-req", 9, "What noncentrality gives $80\\%$ power for a $1$-df test at $\\alpha = 0.05$? Compute $(1.96 + 0.8416)^2$.", 7.849, 0.001),
  s(NC, "x4r-mixture", 9, "Why is the noncentral $\\chi^2$ a Poisson mixture of central $\\chi^2$ distributions?",
    "Its density can be written as $\\sum_jP(J = j)f_{\\chi^2_{k+2j}}(x)$ with $J \\sim \\mathrm{Poisson}(\\lambda/2)$.",
    "Rotating so the mean vector lies along one axis reduces it to $(Z + \\sqrt\\lambda)^2 + \\chi^2_{k-1}$; expanding the first term's density produces the Poisson weights. This representation is used for computing its CDF."),
  n(NC, "x4r-n", 9.5, "Each observation contributes $0.1$ to the noncentrality ($\\lambda = 0.1n$). How many observations give $80\\%$ power for a $1$-df test at $\\alpha = 0.05$?", 79),

  // --- lack-of-fit-test --------------------------------------------------------------
  n(LF, "x4r-pe-df", 5, "There are $5$ $x$-levels with $3$ replicates each. How many degrees of freedom does pure error have?", 10),
  n(LF, "x4r-lof-df", 6.5, "Fitting a straight line ($2$ parameters) to those $5$ levels, how many lack-of-fit degrees of freedom are there?", 3),
  n(LF, "x4r-sslof", 7, "$\\mathrm{SSE} = 50$ and $\\mathrm{SS}_{PE} = 30$. Compute $\\mathrm{SS}_{LOF}$.", 20),
  n(LF, "x4r-F", 7.5, "Compute $F_{LOF} = (\\mathrm{SS}_{LOF}/3)/(\\mathrm{SS}_{PE}/10)$.", 2.2222, 0.001),
  s(LF, "x4r-decomp", 8, "Explain the decomposition of the residual sum of squares into pure error and lack of fit.",
    "With replicates, $\\mathrm{SSE} = \\sum(y_{ij} - \\bar{y}_i)^2 + \\sum n_i(\\bar{y}_i - \\hat{y}_i)^2$: variation within replicates (pure error) plus the gap between level means and the fitted curve (lack of fit).",
    "Pure error estimates $\\sigma^2$ whether or not the model is right; lack of fit is inflated only if the mean function is wrong, so their ratio tests the model's form."),
  n(LF, "x4r-norep", 8, "With no replicated $x$-values, how many pure-error degrees of freedom are there?", 0),
  s(LF, "x4r-no-reps", 8.5, "How can you check lack of fit without replicates?",
    "Group observations with nearly equal $x$ (near-replicates) to get an approximate pure-error estimate, or compare against a more flexible model (polynomial, spline, smoother).",
    "Residual plots against fitted values and predictors also reveal systematic lack of fit."),
  n(LF, "x4r-sigma", 9, "Estimate $\\sigma^2$ from pure error with $\\mathrm{SS}_{PE} = 30$ on $10$ degrees of freedom.", 3),
  s(LF, "x4r-model-free", 9, "Why is the lack-of-fit test's denominator model-free?",
    "Pure error uses only variation among replicates at the same $x$, whose expectation is $\\sigma^2$ regardless of the true mean function.",
    "The residual mean square, by contrast, is biased upwards when the model is wrong, so it can't serve as a benchmark for detecting misspecification."),
  s(LF, "x4r-compare", 9.5, "Compare the formal lack-of-fit test with residual plots and with adding higher-order terms.",
    "The F-test is formal and model-free in its denominator but needs replicates, and it's omnibus — it doesn't say what's wrong.",
    "Residual plots show the pattern of misfit; testing added polynomial or spline terms targets specific alternatives with more power. In practice they're complementary."),

  // --- simultaneous-confidence-intervals ---------------------------------------------------
  n(SC, "x4r-bonf", 5, "Bonferroni for $5$ intervals with $95\\%$ family confidence: what confidence level (in percent) should each interval have?", 99),
  n(SC, "x4r-scheffe", 6.5, "Compute the Scheffé multiplier $\\sqrt{pF_{p,\\nu,\\alpha}}$ with $p = 3$ and $F = 3.0$.", 3),
  n(SC, "x4r-ratio", 7, "How many times wider is the Scheffé interval than an individual interval with multiplier $2.0$?", 1.5, 0.001),
  n(SC, "x4r-bonf-z", 7.5, "Using normal critical values, compute the Bonferroni multiplier $z_{1 - 0.05/6}$ for $3$ two-sided intervals.", 2.394, 0.001),
  s(SC, "x4r-choose", 8, "When is Bonferroni better, and when is Scheffé better?",
    "Bonferroni is better for a small number of pre-specified intervals; its multiplier grows slowly with their number.",
    "Scheffé covers every linear combination at once, so it wins when many (or data-suggested) contrasts are examined."),
  n(SC, "x4r-wh", 8, "The Working–Hotelling band uses multiplier $\\sqrt{2F_{2,\\nu}}$. Compute it with $F = 3.5$.", 2.6458, 0.001),
  s(SC, "x4r-scheffe-why", 8.5, "Why do Scheffé intervals cover all linear combinations simultaneously?",
    "By Cauchy–Schwarz, $\\sup_c\\frac{(c^\\top(\\hat\\beta - \\beta))^2}{c^\\top(X^\\top X)^{-1}c} = (\\hat\\beta - \\beta)^\\top X^\\top X(\\hat\\beta - \\beta)$, which is $ps^2F_{p,\\nu}$-distributed.",
    "So the event that all intervals cover equals the event that $\\beta$ is in the $F$-based confidence ellipsoid, which has probability $1 - \\alpha$."),
  n(SC, "x4r-scheffe4", 9, "For $p = 4$ and large $\\nu$, the Scheffé multiplier is $\\sqrt{\\chi^2_{4, 0.95}} = \\sqrt{9.488}$. Compute it.", 3.0803, 0.001),
  s(SC, "x4r-tukey", 9, "Compare Tukey's method with Scheffé's for pairwise comparisons.",
    "Tukey's HSD is based on the studentised range and is exact for all pairwise comparisons in balanced designs.",
    "It gives shorter intervals than Scheffé for pairwise differences, while Scheffé pays for covering all contrasts; for unbalanced designs Tukey–Kramer is approximately valid."),
  s(SC, "x4r-ellipsoid", 9.5, "Explain the duality between simultaneous intervals and confidence ellipsoids.",
    "A confidence ellipsoid for $\\beta$ implies intervals for every $c^\\top\\beta$: project the ellipsoid onto the direction $c$. These projections are exactly the Scheffé intervals.",
    "Conversely, the intersection of all Scheffé intervals recovers the ellipsoid; Bonferroni intervals correspond to a box, which is simpler but not the same region."),

  // --- confidence-regions-for-beta ----------------------------------------------------------
  m(CR, "x4r-shape", 5, "A joint confidence region for two regression coefficients (normal errors) is:", "An ellipse",
    [["A rectangle", "That's the product of individual intervals."], ["A circle always", "Only in special designs."], ["A line segment", "No."]]),
  n(CR, "x4r-rhs", 6.5, "The region is $(\\beta - \\hat\\beta)^\\top X^\\top X(\\beta - \\hat\\beta) \\le ps^2F$. Compute the right-hand side for $s^2 = 1$, $p = 2$ and $F = 3.2$.", 6.4, 0.001),
  n(CR, "x4r-inside", 7, "With $X^\\top X = \\mathrm{diag}(4, 1)$, compute the quadratic form for $\\beta = \\hat\\beta + (1, 0)$.", 4),
  n(CR, "x4r-axis", 7.5, "Compute the half-length of the ellipse along $\\beta_1$, $\\sqrt{6.4/4}$.", 1.2649, 0.001),
  s(CR, "x4r-not-box", 8, "Why isn't a joint confidence region the rectangle formed by the individual intervals?",
    "Each individual interval covers its own coefficient with $95\\%$ probability, but the rectangle doesn't have $95\\%$ joint coverage, and it ignores correlation between the estimates.",
    "The joint region accounts for that correlation (a tilted ellipse), so some points inside the rectangle are implausible jointly and vice versa."),
  n(CR, "x4r-corr", 8, "$(X^\\top X)^{-1} = \\begin{pmatrix}1 & -0.5\\\\-0.5 & 1\\end{pmatrix}$. What is the correlation between $\\hat\\beta_1$ and $\\hat\\beta_2$?", -0.5, 0.001),
  s(CR, "x4r-tilt", 8.5, "Why is the confidence ellipse tilted when the coefficient estimates are correlated?",
    "The ellipse's axes are the eigenvectors of $X^\\top X$; when $X^\\top X$ isn't diagonal, those axes aren't aligned with the coordinates.",
    "E.g. positively correlated predictors give negatively correlated estimates: the data pin down one combination of the coefficients well but not their split."),
  n(CR, "x4r-area", 9, "The area of $\\lbrace x : x^\\top Ax \\le c\\rbrace$ in two dimensions is $\\pi c/\\sqrt{\\det A}$. Compute it for $A = \\mathrm{diag}(4, 1)$ and $c = 6.4$.", 10.053, 0.001),
  s(CR, "x4r-collinear", 9, "Describe the confidence region under collinearity and how to interpret it.",
    "The ellipse becomes long and thin along the direction of the near-dependence: individual coefficients are poorly determined, while certain combinations are precise.",
    "Individual t-tests can all be insignificant while the joint F-test is highly significant; report and test the well-determined combinations."),
  s(CR, "x4r-likelihood", 9.5, "Contrast likelihood-based confidence regions with Wald ellipsoids in nonlinear models.",
    "Wald ellipsoids rely on a quadratic approximation at the estimate and can be poor when the model is strongly nonlinear or the sample small.",
    "Likelihood-ratio regions $\\lbrace\\theta : 2(\\ell(\\hat\\theta) - \\ell(\\theta)) \\le \\chi^2_{p,1 - \\alpha}\\rbrace$ follow the likelihood's actual shape (possibly curved or asymmetric) and are invariant to reparameterisation."),
];
