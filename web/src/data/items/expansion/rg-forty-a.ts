import type { Item } from "../../../lib/assessment/types";
import { makeBuilders } from "../authoring";
import { EXPANSION } from "./source";

/** Regression 40-pass (part A): foundations → the probabilistic linear model. Weighted to the hard end. */
const { mcq, short, num } = makeBuilders(EXPANSION);

const s = (concept: string, slug: string, level: number, stem: string, a: string, b: string) =>
  short({ concept, slug, cognitive: level >= 8.5 ? "transfer" : "explain", level, seconds: level >= 9 ? 300 : 200, stem },
    [["main", a, 5, true], ["detail", b, 4, true]]);
const n = (concept: string, slug: string, level: number, stem: string, key: number, tol = 0.01) =>
  num({ concept, slug, cognitive: "apply", level, seconds: level >= 7 ? 90 : 25, stem }, key, tol);
const m = (concept: string, slug: string, level: number, stem: string, right: string, wrong: [string, string][]) =>
  mcq({ concept, slug, cognitive: level <= 3 ? "recall" : "apply", level, seconds: 25, stem },
    right, wrong.map(([t, why], i) => [t, `${concept}-${slug}-${i}`, why] as [string, string, string]));

const RG = "regression";
const RM = "regress-to-the-mean";
const LT = "linear-regression-terminology";
const SL = "simple-linear-regression";
const OL = "ordinary-least-squares";
const NE = "normal-equations";
const GI = "geometric-interpretation-of-ols";
const ML = "multiple-linear-regression";
const HM = "hat-matrix";
const LP = "linear-regression-probabilistic-version";

export const rgFortyAItems: Item[] = [
  // --- regression -------------------------------------------------------------------
  n(RG, "x4r-predict", 5, "The fitted line is $\\hat{y} = 3 + 2x$. Predict $y$ at $x = 4$.", 11),
  n(RG, "x4r-resid", 6.5, "For the same line, compute the residual of the observation $(4, 13)$.", 2),
  m(RG, "x4r-models", 7, "A regression model describes:", "How the conditional distribution (typically the mean) of $Y$ changes with $X$",
    [["The joint distribution of all variables", "It conditions on $X$."], ["Causal effects automatically", "Only under extra assumptions."], ["The marginal distribution of $X$", "No."]]),
  n(RG, "x4r-cond-mean", 7.5, "$Y = X^2 + \\varepsilon$ with $\\mathbb{E}[\\varepsilon \\mid X] = 0$ and $X$ uniform on $\\lbrace -1, 0, 1\\rbrace$. Compute $\\mathbb{E}[Y \\mid X = 1]$.", 1),
  s(RG, "x4r-optimal", 8, "Why is $\\mathbb{E}[Y \\mid X]$ the best predictor of $Y$ under squared error?",
    "For any $g$, $\\mathbb{E}[(Y - g(X))^2] = \\mathbb{E}[(Y - m(X))^2] + \\mathbb{E}[(m(X) - g(X))^2]$ with $m(X) = \\mathbb{E}[Y \\mid X]$.",
    "The cross term vanishes by the tower property, so the second term — zero only when $g = m$ — is the excess error."),
  n(RG, "x4r-blp-zero", 8, "For $X$ uniform on $\\lbrace -1, 0, 1\\rbrace$ and $Y = X^2$, compute the slope of the best linear predictor of $Y$ from $X$.", 0),
  s(RG, "x4r-zero-slope", 8.5, "Using the previous example, explain why a zero regression slope doesn't mean $Y$ is unrelated to $X$.",
    "$Y$ is a deterministic function of $X$, yet $\\mathrm{Cov}(X, X^2) = \\mathbb{E}[X^3] = 0$ by symmetry, so the best linear fit is flat.",
    "Linear regression measures only linear association; nonlinear dependence needs nonlinear terms or nonparametric methods."),
  s(RG, "x4r-goals", 9, "Distinguish prediction, description and causal inference as goals of regression.",
    "Prediction needs only accurate $\\hat{y}$ for new cases from the same distribution; coefficients can be uninterpretable.",
    "Description summarises associations (conditional on the included variables); causal inference needs the coefficient to equal an intervention effect, which requires assumptions such as no unmeasured confounding."),
  n(RG, "x4r-blp", 9, "$\\mathrm{Var}(X) = 4$ and $\\mathrm{Cov}(X, Y) = 6$. What is the slope of the best linear predictor of $Y$?", 1.5, 0.001),
  s(RG, "x4r-ovb", 9.5, "Explain omitted-variable bias in a regression slope.",
    "If $Y = \\beta X + \\gamma Z + \\varepsilon$ but $Z$ is omitted, the slope on $X$ converges to $\\beta + \\gamma\\frac{\\mathrm{Cov}(X, Z)}{\\mathrm{Var}(X)}$.",
    "The bias is nonzero when the omitted variable both affects $Y$ ($\\gamma \\ne 0$) and correlates with $X$ — a confounder; its sign is the product of the two signs."),

  // --- regress-to-the-mean ----------------------------------------------------------
  n(RM, "x4r-z", 5, "Standardised scores have $\\rho = 0.5$. What is the predicted $z_2$ for $z_1 = 2$?", 1),
  n(RM, "x4r-retest", 6.5, "Test–retest correlation $0.8$, mean $100$, SD $15$. What is the predicted retest score for someone who scored $130$?", 124),
  m(RM, "x4r-why", 7, "Regression to the mean occurs because:", "Extreme observations partly reflect transient noise that doesn't repeat",
    [["People deliberately change", "It happens with no change at all."], ["Measurement instruments drift", "Not required."], ["Samples are too small", "It occurs at any sample size."]]),
  n(RM, "x4r-persist", 7.5, "With test–retest correlation $0.6$, what fraction of an extreme standardised deviation is expected to persist?", 0.6, 0.001),
  s(RM, "x4r-bp", 8, "Patients selected for very high blood pressure tend to improve on retest even without treatment. Why?",
    "They were selected partly because of positive measurement noise and day-to-day fluctuation, which doesn't recur on the next measurement.",
    "So their average falls towards the population mean; a before–after comparison in such a group overstates any treatment effect."),
  n(RM, "x4r-galton", 8, "The regression slope of child height on parent height is $0.65$. A parent is $3$ inches above average. How far above average is the child predicted to be?", 1.95, 0.001),
  s(RM, "x4r-both-ways", 8.5, "Why does regression to the mean work in both directions of time?",
    "The regression of time-1 scores on time-2 scores also has slope $\\rho < 1$ (in standard units): people extreme at time 2 were less extreme at time 1.",
    "So it's a statistical property of imperfect correlation, not a causal process that makes people more average."),
  n(RM, "x4r-jinx", 9, "Season performance is skill plus luck, each with variance $1$ and independent across seasons. A player has $z = 2$ this season. What is the expected $z$ next season?", 1),
  s(RM, "x4r-design", 9, "How can a study separate a treatment effect from regression to the mean?",
    "Randomise patients selected in the same way (on extreme baseline values) to treatment and control; both groups regress equally, so the difference estimates the treatment effect.",
    "Alternatively, select on one baseline measurement and use another as the pre-treatment value, or adjust for baseline (ANCOVA)."),
  n(RM, "x4r-kelley", 9.5, "Observed $X = T + e$ with $\\mathrm{Var}(T) = 3$, $\\mathrm{Var}(e) = 1$ and means $0$. Compute Kelley's estimate $\\mathbb{E}[T \\mid X = 4]$.", 3),

  // --- linear-regression-terminology ------------------------------------------------
  m(LT, "x4r-design", 5, "In $y = X\\beta + \\varepsilon$, the matrix $X$ is called:", "The design matrix",
    [["The hat matrix", "That's $X(X^\\top X)^{-1}X^\\top$."], ["The residual matrix", "No."], ["The response", "That's $y$."]]),
  m(LT, "x4r-fitted", 6.5, "A fitted value is:", "$\\hat{y}_i = x_i^\\top\\hat\\beta$",
    [["$y_i - \\hat{y}_i$", "That's the residual."], ["$x_i^\\top\\beta$", "That uses the unknown true $\\beta$."], ["$\\bar{y}$", "No."]]),
  n(LT, "x4r-df", 7, "With $n = 50$ and $p = 5$ coefficients (including the intercept), how many residual degrees of freedom are there?", 45),
  m(LT, "x4r-error-resid", 7.5, "The difference between an error and a residual is:", "Errors are unobservable deviations from the true regression; residuals are deviations from the fitted one",
    [["They're the same", "They differ."], ["Residuals are always larger", "No."], ["Errors are computed from the data", "They're unobservable."]]),
  s(LT, "x4r-linear", 8, "Why is “linear” in linear regression about the parameters rather than the predictors?",
    "The model $y = \\sum_j\\beta_jf_j(x) + \\varepsilon$ is linear in $\\beta$ for any fixed functions $f_j$ (polynomials, logs, splines), so least squares still has a closed form.",
    "What's excluded is nonlinearity in the parameters, such as $\\beta_0e^{\\beta_1x}$, which needs nonlinear least squares."),
  n(LT, "x4r-params", 8, "How many parameters are in $y = \\beta_0 + \\beta_1x + \\beta_2x^2 + \\beta_3\\log x + \\varepsilon$ (excluding $\\sigma^2$)?", 4),
  s(LT, "x4r-prf", 8.5, "Distinguish the population regression function from the sample regression function.",
    "The population regression function $\\mathbb{E}[Y \\mid X = x]$ (or its best linear approximation) is a fixed, unknown feature of the data-generating process.",
    "The sample regression function $\\hat{y} = x^\\top\\hat\\beta$ is an estimate that varies from sample to sample; residuals estimate the errors around the population function."),
  m(LT, "x4r-nonlinear", 9, "Which model is NOT linear in its parameters?", "$y = \\beta_0e^{\\beta_1x} + \\varepsilon$",
    [["$y = \\beta_0 + \\beta_1x^2 + \\varepsilon$", "Linear in the $\\beta$s."], ["$y = \\beta_0 + \\beta_1\\sin x + \\varepsilon$", "Linear in the $\\beta$s."], ["$\\log y = \\beta_0 + \\beta_1x + \\varepsilon$", "Linear after transforming $y$."]]),
  s(LT, "x4r-holding", 9, "What does “holding the other variables constant” mean for a regression coefficient, and what are its limits?",
    "$\\beta_j$ is the change in the mean of $y$ per unit change in $x_j$ among cases with the same values of the other included predictors.",
    "It can be meaningless when predictors can't vary independently (e.g. $x$ and $x^2$, or strongly collinear variables) and is causal only under strong assumptions."),
  s(LT, "x4r-depends", 9.5, "Why does “the effect of $X$” in a regression depend on which other variables are included?",
    "Each coefficient is a partial association conditional on the other included variables, so adding or removing a correlated predictor changes what's being held fixed.",
    "Including a confounder removes bias; including a mediator removes part of the effect; including a collider can create bias — so the right set depends on the causal question."),

  // --- simple-linear-regression -------------------------------------------------------
  n(SL, "x4r-intercept", 5, "$\\bar{x} = 2$, $\\bar{y} = 5$ and the slope is $3$. Compute the intercept.", -1),
  n(SL, "x4r-slope", 6.5, "$S_{xy} = 30$ and $S_{xx} = 10$. Compute the slope.", 3),
  n(SL, "x4r-slope-r", 7, "$r = 0.8$, $s_y = 10$ and $s_x = 4$. Compute the slope.", 2),
  n(SL, "x4r-se", 7.5, "$s = 2$ and $S_{xx} = 16$. Compute the SE of the slope.", 0.5, 0.001),
  n(SL, "x4r-t", 8, "The slope is $3$ with SE $0.5$. Compute the t-statistic.", 6),
  s(SL, "x4r-mean-point", 8, "Why does the least squares line pass through $(\\bar{x}, \\bar{y})$?",
    "Setting the derivative with respect to the intercept to zero gives $\\sum(y_i - b_0 - b_1x_i) = 0$, i.e. $\\bar{y} = b_0 + b_1\\bar{x}$.",
    "So the residuals sum to zero and the line goes through the centroid; this is why centring $x$ makes the intercept equal $\\bar{y}$."),
  n(SL, "x4r-reverse", 8.5, "With $r = 0.8$, $s_x = 4$ and $s_y = 10$, what is the slope of the regression of $x$ on $y$?", 0.32, 0.001),
  s(SL, "x4r-not-reciprocal", 9, "Why isn't the slope of $x$ on $y$ the reciprocal of the slope of $y$ on $x$?",
    "Each regression minimises vertical errors in its own response: $b_{y|x} = rs_y/s_x$ while $b_{x|y} = rs_x/s_y$.",
    "Their product is $r^2 \\le 1$, so the two lines coincide only when $|r| = 1$; both regress towards the mean."),
  n(SL, "x4r-product", 9, "Compute the product of the two slopes for $r = 0.8$.", 0.64, 0.001),
  s(SL, "x4r-design", 9.5, "Derive $\\mathrm{Var}(\\hat\\beta_1) = \\sigma^2/S_{xx}$ and explain its implications for choosing $x$ values.",
    "$\\hat\\beta_1 = \\sum(x_i - \\bar{x})y_i/S_{xx}$ is a linear combination of independent $y_i$ with variance $\\sigma^2$, so $\\mathrm{Var} = \\sigma^2\\sum(x_i - \\bar{x})^2/S_{xx}^2 = \\sigma^2/S_{xx}$.",
    "Spreading $x$ out (large $S_{xx}$) sharpens the slope — optimally at the extremes — but leaves no ability to detect curvature, so designs usually include middle points too."),

  // --- ordinary-least-squares -------------------------------------------------------
  n(OL, "x4r-exact-slope", 5, "Fit OLS to the points $(0, 1)$, $(1, 3)$, $(2, 5)$. Compute the slope.", 2),
  n(OL, "x4r-exact-int", 6, "Compute the intercept for the same data.", 1),
  n(OL, "x4r-exact-rss", 6.5, "Compute the residual sum of squares for the same data.", 0),
  n(OL, "x4r-slope2", 7, "Fit OLS to $(0, 0)$, $(1, 1)$, $(2, 1)$. Compute the slope.", 0.5, 0.001),
  n(OL, "x4r-rss2", 8, "Compute the residual sum of squares for that fit.", 0.1667, 0.001),
  s(OL, "x4r-why-squares", 8, "Why minimise squared rather than absolute residuals? Give motivations and drawbacks.",
    "Squared loss gives a closed-form, unique solution (linear algebra), estimates the conditional mean, and is maximum likelihood under normal errors; Gauss–Markov makes it BLUE.",
    "It's sensitive to outliers because large residuals are heavily weighted; absolute loss (median regression) is robust but has no closed form."),
  s(OL, "x4r-sum-zero", 8.5, "Show that OLS residuals sum to zero when the model includes an intercept.",
    "The normal equations say $X^\\top e = 0$: the residuals are orthogonal to every column of $X$.",
    "The intercept column is all ones, so $\\mathbf{1}^\\top e = \\sum e_i = 0$ — without an intercept this needn't hold."),
  n(OL, "x4r-orth", 9, "For an OLS fit with an intercept, compute $\\sum_ie_i\\hat{y}_i$.", 0),
  s(OL, "x4r-outliers", 9, "Why is OLS sensitive to outliers?",
    "Each observation's influence on $\\hat\\beta$ is proportional to its residual times its leverage, with no bound — its influence function is unbounded.",
    "A single high-leverage outlier can pull the fitted line arbitrarily far: OLS has breakdown point $0$."),
  s(OL, "x4r-gauss-markov", 9.5, "State what the Gauss–Markov theorem claims and what “linear unbiased” excludes.",
    "Under $\\mathbb{E}[\\varepsilon] = 0$ and $\\mathrm{Var}(\\varepsilon) = \\sigma^2I$, OLS has the smallest variance among all estimators that are linear in $y$ and unbiased (BLUE) — no normality required.",
    "It says nothing about biased estimators (ridge can have lower MSE) or nonlinear ones (robust estimators can be far better with heavy-tailed errors)."),

  // --- normal-equations ---------------------------------------------------------------
  n(NE, "x4r-diag2", 5, "$X^\\top X = \\mathrm{diag}(2, 8)$ and $X^\\top y = (4, 16)$. Compute $\\hat\\beta_2$.", 2),
  n(NE, "x4r-diag1", 6, "For the same system, compute $\\hat\\beta_1$.", 2),
  n(NE, "x4r-solve", 7, "$X^\\top X = \\begin{bmatrix}4 & 2\\\\2 & 2\\end{bmatrix}$ and $X^\\top y = (6, 4)$. Compute $\\hat\\beta_1$.", 1),
  n(NE, "x4r-det", 7.5, "Compute $\\det(X^\\top X)$ for that matrix.", 4),
  s(NE, "x4r-derive", 8, "Derive the normal equations.",
    "Minimise $S(\\beta) = (y - X\\beta)^\\top(y - X\\beta)$: the gradient is $-2X^\\top(y - X\\beta)$.",
    "Setting it to zero gives $X^\\top X\\hat\\beta = X^\\top y$; the Hessian $2X^\\top X$ is PSD, so this is a minimum."),
  n(NE, "x4r-inv11", 8, "Compute the $(1, 1)$ entry of $(X^\\top X)^{-1}$ for $X^\\top X = \\begin{bmatrix}4 & 2\\\\2 & 2\\end{bmatrix}$.", 0.5, 0.001),
  s(NE, "x4r-invertible", 8.5, "Why is $X^\\top X$ invertible exactly when $X$ has full column rank?",
    "$X^\\top Xv = 0$ implies $\\|Xv\\|^2 = 0$, so $\\mathrm{null}(X^\\top X) = \\mathrm{null}(X)$.",
    "So $X^\\top X$ is nonsingular iff $Xv = 0$ only for $v = 0$, i.e. the columns of $X$ are linearly independent."),
  n(NE, "x4r-var", 9, "With $\\sigma^2 = 2$ and $(X^\\top X)^{-1}_{11} = 0.5$, compute $\\mathrm{Var}(\\hat\\beta_1)$.", 1),
  s(NE, "x4r-numerics", 9, "Why are the normal equations usually not solved directly in floating point?",
    "Forming $X^\\top X$ squares the condition number, so an ill-conditioned $X$ loses about twice as many digits.",
    "QR (or SVD) works on $X$ directly and is more accurate; Cholesky on $X^\\top X$ is fast and fine when $X$ is well conditioned."),
  s(NE, "x4r-projection", 9.5, "Interpret $X^\\top(y - X\\hat\\beta) = 0$ geometrically.",
    "It says the residual is orthogonal to every column of $X$, i.e. $X\\hat\\beta$ is the orthogonal projection of $y$ onto $\\mathrm{col}(X)$.",
    "By Pythagoras that projection is the closest point of $\\mathrm{col}(X)$ to $y$ — so the normal equations are exactly the least squares condition."),

  // --- geometric-interpretation-of-ols (8) -------------------------------------------------
  n(GI, "x4r-pyth", 5, "$\\hat{y}$ is the projection of $y$ onto $\\mathrm{col}(X)$. If $\\|y\\|^2 = 50$ and $\\|\\hat{y}\\|^2 = 40$, compute $\\|e\\|^2$.", 10),
  n(GI, "x4r-cos2", 6, "Compute $\\cos^2$ of the angle between $y$ and $\\hat{y}$ for those values (the uncentred $R^2$).", 0.8, 0.001),
  n(GI, "x4r-dim", 8.5, "With $n = 10$ and $p = 3$ (full rank), what is the dimension of the space the residual lies in?", 7),
  s(GI, "x4r-orth", 8.5, "Why is the residual vector orthogonal to every column of $X$?",
    "$\\hat{y}$ is the orthogonal projection of $y$ onto $\\mathrm{col}(X)$, so $y - \\hat{y}$ lies in the orthogonal complement of $\\mathrm{col}(X)$.",
    "Algebraically this is the normal equations $X^\\top e = 0$."),
  n(GI, "x4r-angle", 9, "The angle between centred $y$ and centred $\\hat{y}$ is $30°$. Compute $R^2$.", 0.75, 0.001),
  s(GI, "x4r-add-col", 9, "Why does adding a column to $X$ never decrease $R^2$, geometrically?",
    "Adding a column enlarges $\\mathrm{col}(X)$, and the projection onto a bigger subspace is at least as close to $y$.",
    "So the residual length can't increase and $R^2$ can't decrease — even for a pure-noise column."),
  s(GI, "x4r-ftest", 9, "Explain the geometry of the F-test for nested models.",
    "The reduced model's column space sits inside the full model's; $\\mathrm{RSS}_R - \\mathrm{RSS}_F$ is the squared length of the projection of $y$ onto the extra directions, and $\\mathrm{RSS}_F$ is the squared length in the residual space.",
    "Under $H_0$ both are $\\sigma^2$ times $\\chi^2$ variables on orthogonal subspaces of dimensions $q$ and $n - p$, so their scaled ratio is $F_{q, n-p}$."),
  s(GI, "x4r-invariance", 9.5, "Why do OLS fitted values depend only on $\\mathrm{col}(X)$, not on the particular columns?",
    "$\\hat{y}$ is the projection onto $\\mathrm{col}(X)$, and any reparameterisation $X \\to XA$ with invertible $A$ spans the same space.",
    "So fitted values, residuals and $R^2$ are unchanged (e.g. centring, rescaling, or using orthogonal polynomials); only the coefficients transform, as $\\hat\\beta \\to A^{-1}\\hat\\beta$."),

  // --- multiple-linear-regression (9) -------------------------------------------------------
  n(ML, "x4r-predict", 5, "$\\hat{y} = 2 + 3x_1 - x_2$. Predict $y$ at $(x_1, x_2) = (1, 4)$.", 1),
  n(ML, "x4r-change", 6, "For the same model, by how much does $\\hat{y}$ change when $x_1$ increases by $2$ with $x_2$ held fixed?", 6),
  n(ML, "x4r-s2", 8.5, "$n = 30$, $p = 4$ coefficients (including intercept) and $\\mathrm{RSS} = 52$. Compute $s^2$.", 2),
  s(ML, "x4r-interpret", 8.5, "How is a coefficient in a multiple regression interpreted?",
    "$\\beta_j$ is the expected change in $y$ per unit increase in $x_j$ with the other predictors held fixed.",
    "Equivalently (Frisch–Waugh–Lovell), it's the slope of $y$ on the part of $x_j$ not explained by the other predictors."),
  n(ML, "x4r-adjr2", 9, "$R^2 = 0.5$ with $n = 30$ and $k = 3$ predictors. Compute adjusted $R^2 = 1 - (1 - R^2)\\frac{n - 1}{n - k - 1}$.", 0.4423, 0.001),
  s(ML, "x4r-sign-flip", 9, "Why can a coefficient change sign when another variable is added?",
    "Before, the coefficient absorbs the effect of the omitted correlated variable (omitted-variable bias); after, it measures the partial association with that variable held fixed.",
    "E.g. ice-cream sales may correlate positively with drownings marginally, but not once temperature is included; with strong correlation a sign can flip (Simpson's paradox)."),
  n(ML, "x4r-uncorr", 9, "Two uncorrelated (centred) predictors have simple-regression slopes $2$ and $3$. What is the multiple-regression slope on the first predictor?", 2),
  s(ML, "x4r-partial", 9, "Distinguish marginal from partial association in regression.",
    "The marginal slope comes from regressing $y$ on $x_j$ alone; the partial slope conditions on the other predictors.",
    "They're equal when $x_j$ is uncorrelated with the other predictors (orthogonal design); otherwise they can differ in size and sign."),
  s(ML, "x4r-residual-confounding", 9.5, "Why doesn't including a confounder that is measured with error fully “control for” it?",
    "Adjusting for a noisy proxy $W = Z + u$ removes only the part of the confounding explained by $W$; the rest leaks into the coefficient of interest (residual confounding).",
    "The more error in the measured confounder, the closer the adjusted estimate stays to the unadjusted, biased one — a major problem in observational studies."),

  // --- hat-matrix ----------------------------------------------------------------------
  n(HM, "x4r-trace", 6, "A regression has $p = 5$ coefficients. Compute $\\mathrm{tr}(H)$.", 5),
  n(HM, "x4r-avg", 6.5, "With $n = 50$ and $p = 5$, what is the average leverage?", 0.1, 0.001),
  n(HM, "x4r-threshold", 7, "With $n = 50$ and $p = 5$, what is the rule-of-thumb high-leverage threshold $2p/n$?", 0.2, 0.001),
  n(HM, "x4r-slr", 7.5, "Simple regression with $n = 10$, $S_{xx} = 30$: compute the leverage $h = 1/n + (x - \\bar{x})^2/S_{xx}$ for a point with $x - \\bar{x} = 3$.", 0.4, 0.001),
  n(HM, "x4r-var-e", 8, "With $\\sigma^2 = 4$ and $h_{ii} = 0.4$, compute $\\mathrm{Var}(e_i) = \\sigma^2(1 - h_{ii})$.", 2.4, 0.001),
  s(HM, "x4r-resid-cov", 8, "Why are OLS residuals correlated and heteroscedastic even when the errors are i.i.d.?",
    "$e = (I - H)\\varepsilon$, so $\\mathrm{Cov}(e) = \\sigma^2(I - H)$: not diagonal and not constant on the diagonal.",
    "High-leverage points have small residual variance $\\sigma^2(1 - h_{ii})$ because the fit is pulled towards them; studentising corrects for this."),
  n(HM, "x4r-var-fit", 8.5, "With $\\sigma^2 = 4$ and $h_{ii} = 0.4$, compute $\\mathrm{Var}(\\hat{y}_i) = \\sigma^2h_{ii}$.", 1.6, 0.001),
  s(HM, "x4r-bounds", 8.5, "Why is $0 \\le h_{ii} \\le 1$, and when does $h_{ii} = 1$?",
    "$H$ is a symmetric idempotent matrix, so $h_{ii} = \\sum_jh_{ij}^2 = h_{ii}^2 + \\sum_{j \\ne i}h_{ij}^2 \\ge h_{ii}^2$, giving $0 \\le h_{ii} \\le 1$.",
    "$h_{ii} = 1$ means the fit passes exactly through point $i$ whatever $y_i$ is (e.g. the only observation at a level of a dummy variable); then its residual is always $0$."),
  n(HM, "x4r-loo", 9, "An observation has residual $1.2$ and leverage $0.4$. Compute its leave-one-out prediction residual $e_i/(1 - h_{ii})$.", 2, 0.001),
  s(HM, "x4r-press", 9.5, "Derive the leave-one-out shortcut $y_i - \\hat{y}_{(i)} = e_i/(1 - h_{ii})$.",
    "Deleting row $i$ is a rank-one downdate of $X^\\top X$; by Sherman–Morrison, $\\hat\\beta - \\hat\\beta_{(i)} = \\frac{(X^\\top X)^{-1}x_ie_i}{1 - h_{ii}}$.",
    "Then $y_i - x_i^\\top\\hat\\beta_{(i)} = e_i + h_{ii}\\frac{e_i}{1 - h_{ii}} = \\frac{e_i}{1 - h_{ii}}$, so PRESS and LOOCV need only one fit."),

  // --- linear-regression-probabilistic-version -------------------------------------------
  n(LP, "x4r-prob", 5, "$y \\mid x \\sim N(1 + 2x, 4)$. Compute $P(y > 5 \\mid x = 1)$.", 0.1587, 0.001),
  n(LP, "x4r-loglik-term", 5.5, "Compute the log-likelihood contribution $-\\tfrac12\\log(2\\pi\\sigma^2) - e^2/(2\\sigma^2)$ for residual $e = 2$ and $\\sigma^2 = 4$.", -2.1121, 0.001),
  n(LP, "x4r-mle-s2", 8.5, "$\\mathrm{RSS} = 40$ with $n = 20$. Compute the MLE $\\hat\\sigma^2 = \\mathrm{RSS}/n$.", 2),
  s(LP, "x4r-mle-ols", 8.5, "Why does maximum likelihood under normal errors give the OLS estimate of $\\beta$?",
    "The log-likelihood is $-\\frac n2\\log(2\\pi\\sigma^2) - \\frac1{2\\sigma^2}\\|y - X\\beta\\|^2$.",
    "For any fixed $\\sigma^2$, maximising over $\\beta$ means minimising $\\|y - X\\beta\\|^2$ — exactly least squares."),
  n(LP, "x4r-s2", 9, "Same fit with $p = 4$: compute the unbiased $s^2 = \\mathrm{RSS}/(n - p)$.", 2.5, 0.001),
  s(LP, "x4r-adds", 9, "What does the probabilistic (normal-errors) model add beyond the algebra of least squares?",
    "Exact sampling distributions: $\\hat\\beta \\sim N(\\beta, \\sigma^2(X^\\top X)^{-1})$ independent of $s^2$, giving t and F tests and confidence intervals.",
    "It also gives prediction intervals and a likelihood for comparing models (AIC, likelihood ratio tests)."),
  n(LP, "x4r-maxll", 9, "Compute the maximised log-likelihood $-\\frac n2(\\log(2\\pi\\hat\\sigma^2) + 1)$ for $n = 20$ and $\\hat\\sigma^2 = 2$.", -35.31, 0.001),
  s(LP, "x4r-laplace", 9, "How would maximum likelihood change if the errors were Laplace instead of normal?",
    "The Laplace log-likelihood is $-\\frac1b\\sum|y_i - x_i^\\top\\beta|$ plus constants, so the MLE minimises the sum of absolute residuals.",
    "That's least absolute deviations (median) regression — more robust to outliers, with no closed form (solved by linear programming)."),
  s(LP, "x4r-conditional", 9.5, "Why does regression condition on $X$, and when does it matter that $X$ is random?",
    "The model specifies $y \\mid X$; if $X$'s distribution doesn't involve $\\beta$, it contributes nothing to the likelihood for $\\beta$, so inference conditional on the observed $X$ is valid.",
    "It matters when $X$ is measured with error, depends on past errors (endogeneity) or when the goal is unconditional (e.g. random-design prediction error or sandwich variances under misspecification)."),
  n(LP, "x4r-aic", 9.5, "For the same model with $4$ coefficients plus $\\sigma^2$ ($5$ parameters), compute $\\mathrm{AIC} = -2\\ell + 2k$.", 80.62, 0.001),
];
