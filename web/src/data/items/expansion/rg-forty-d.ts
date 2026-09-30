import type { Item } from "../../../lib/assessment/types";
import { makeBuilders } from "../authoring";
import { EXPANSION } from "./source";

/** Regression 40-pass (part D): bands, smoothing, special models, polynomials, splines, response surfaces. */
const { mcq, short, num } = makeBuilders(EXPANSION);

const s = (concept: string, slug: string, level: number, stem: string, a: string, b: string) =>
  short({ concept, slug, cognitive: level >= 8.5 ? "transfer" : "explain", level, seconds: level >= 9 ? 300 : 200, stem },
    [["main", a, 5, true], ["detail", b, 4, true]]);
const n = (concept: string, slug: string, level: number, stem: string, key: number, tol = 0.01) =>
  num({ concept, slug, cognitive: "apply", level, seconds: level >= 7 ? 90 : 25, stem }, key, tol);
const m = (concept: string, slug: string, level: number, stem: string, right: string, wrong: [string, string][]) =>
  mcq({ concept, slug, cognitive: level <= 3 ? "recall" : "apply", level, seconds: 25, stem },
    right, wrong.map(([t, why], i) => [t, `${concept}-${slug}-${i}`, why] as [string, string, string]));

const CB = "confidence-bands-regression-surface";
const LO = "loess-smoothing";
const RO = "regression-through-the-origin";
const IP = "inverse-prediction-calibration";
const DV = "dummy-variables-comparing-lines";
const TP = "two-phase-regression";
const PY = "polynomial-regression";
const OG = "orthogonal-polynomials";
const RS = "regression-splines";
const RM = "response-surface-methodology";

export const rgFortyDItems: Item[] = [
  // --- confidence-bands-regression-surface ------------------------------------------------
  n(CB, "x4r-se-mean", 5, "Simple regression with $s = 4$ and $n = 16$: compute the SE of the fitted mean at $x = \\bar{x}$, $s/\\sqrt{n}$.", 1),
  n(CB, "x4r-se-x", 6.5, "Same fit: compute the SE of the fitted mean at an $x$ with $(x - \\bar{x})^2/S_{xx} = 0.25$.", 2.2361, 0.001),
  m(CB, "x4r-narrow", 7, "A confidence band for a simple regression line is narrowest at:", "$x = \\bar{x}$",
    [["The smallest $x$", "It's widest at the extremes."], ["$x = 0$", "Only if $\\bar{x} = 0$."], ["It has constant width", "It widens away from $\\bar{x}$."]]),
  n(CB, "x4r-wh", 7.5, "Compute the Working–Hotelling multiplier $\\sqrt{2F_{2,14}}$ with $F_{2,14} = 3.74$.", 2.735, 0.001),
  s(CB, "x4r-pointwise", 8, "Distinguish a pointwise confidence interval for the mean response from a simultaneous confidence band.",
    "A pointwise interval covers the true mean at one pre-chosen $x$ with $95\\%$ probability.",
    "A simultaneous band (Working–Hotelling or Scheffé) covers the entire regression line at all $x$ at once with $95\\%$ probability, so it's wider."),
  n(CB, "x4r-ratio", 8, "How many times wider is that Working–Hotelling band than the pointwise interval with $t = 2.145$?", 1.275, 0.001),
  s(CB, "x4r-hyperbola", 8.5, "Why does the confidence band widen away from $\\bar{x}$?",
    "$\\mathrm{Var}(\\hat{y}(x)) = \\sigma^2(1/n + (x - \\bar{x})^2/S_{xx})$: uncertainty in the slope matters more the further you are from the centroid.",
    "The band's edges are hyperbolas; extrapolation far from the data carries much larger uncertainty even before any model misspecification."),
  n(CB, "x4r-pred", 9, "At $x = \\bar{x}$ with $s = 4$ and $n = 16$, compute the prediction SE $s\\sqrt{1 + 1/n}$.", 4.1231, 0.001),
  s(CB, "x4r-use", 9, "When should a simultaneous band be used rather than pointwise intervals?",
    "When conclusions are drawn about the line at many $x$ values, or at values chosen after seeing the data — e.g. reading off where the line crosses a threshold.",
    "Pointwise intervals then have inflated error rates across all the statements made."),
  s(CB, "x4r-smoother", 9.5, "Why can pointwise bands from nonparametric smoothers be misleading?",
    "The usual bands reflect only variance; a smoother is biased (it flattens peaks and valleys), so the band is centred at the wrong place where curvature is high.",
    "Remedies: undersmoothing, bias correction, Bayesian (e.g. GAM posterior) intervals that include bias on average, and simultaneous bands via bootstrap or volume-of-tube methods."),

  // --- loess-smoothing ------------------------------------------------------------------
  n(LO, "x4r-span", 5, "Loess with span $0.3$ and $n = 200$: how many points go into each local fit?", 60),
  n(LO, "x4r-tricube", 6.5, "Compute the tricube weight $(1 - |u|^3)^3$ at $u = 0.5$.", 0.6699, 0.001),
  n(LO, "x4r-tricube1", 7, "Compute the tricube weight at $u = 1$.", 0),
  m(LO, "x4r-boundary", 7.5, "Which has less bias at the boundaries of the data?", "Local linear regression",
    [["Local constant (Nadaraya–Watson) regression", "It has first-order boundary bias."], ["They're identical", "No."], ["A global mean", "No."]]),
  s(LO, "x4r-span-tradeoff", 8, "Explain the bias–variance trade-off controlled by the loess span.",
    "A small span fits locally with few points: low bias but high variance (a wiggly curve).",
    "A large span averages over many points: low variance but high bias where the curve bends; the span should be chosen by cross-validation or GCV."),
  n(LO, "x4r-df", 8, "A loess fit has $\\mathrm{tr}(S) = 5.4$. Roughly how many parameters of a parametric fit is it equivalent to (rounded)?", 5),
  s(LO, "x4r-robust", 8.5, "How does robust loess work?",
    "After an initial fit, compute robustness weights from the residuals with the bisquare function $(1 - (r/6s)^2)^2$ ($s$ the median absolute residual), then refit with local weights × robustness weights.",
    "Iterating a few times downweights outliers so they don't distort the smooth."),
  n(LO, "x4r-bisquare", 9, "Compute the bisquare robustness weight $(1 - (r/6s)^2)^2$ for a residual $r = 3s$.", 0.5625, 0.001),
  s(LO, "x4r-curse", 9, "Why does loess suffer from the curse of dimensionality?",
    "With $d$ predictors, a neighbourhood containing a fixed fraction of the data must cover a large range in each dimension, so fits aren't truly local.",
    "Estimation error grows rapidly with $d$; additive models (GAMs) or other structure are used instead of full multivariate smoothing."),
  s(LO, "x4r-gcv", 9.5, "How is the span chosen by generalised cross-validation (GCV)?",
    "GCV approximates leave-one-out CV for linear smoothers $\\hat{y} = Sy$: $\\mathrm{GCV} = \\frac{n\\,\\mathrm{RSS}}{(n - \\mathrm{tr}S)^2}$.",
    "It replaces each leverage $S_{ii}$ by their average; minimise it over the span. It's cheap and rotation-invariant but can undersmooth with correlated errors."),

  // --- regression-through-the-origin ------------------------------------------------------
  n(RO, "x4r-slope", 5, "Regression through the origin: $\\hat\\beta = \\sum xy/\\sum x^2$. Compute it for $\\sum xy = 50$ and $\\sum x^2 = 25$.", 2),
  n(RO, "x4r-var", 6.5, "Compute $\\mathrm{Var}(\\hat\\beta) = \\sigma^2/\\sum x^2$ for $\\sigma^2 = 4$ and $\\sum x^2 = 25$.", 0.16, 0.001),
  n(RO, "x4r-df", 7, "How many residual degrees of freedom does a through-origin fit have with $n = 12$?", 11),
  n(RO, "x4r-sum", 7.5, "Fit through the origin to $(1, 1)$ and $(2, 3)$. Compute the sum of the residuals.", -0.2, 0.001),
  s(RO, "x4r-when", 8, "When is regression through the origin appropriate, and what are its risks?",
    "When theory requires $\\mathbb{E}[y] = 0$ at $x = 0$ and the data extend near $x = 0$ (e.g. proportional relationships).",
    "If the true line has an intercept, forcing it through the origin biases the slope; residuals needn't sum to zero, and the usual $R^2$ isn't comparable."),
  n(RO, "x4r-r2", 8, "For the same data, compute the uncentred $R^2 = \\sum\\hat{y}^2/\\sum y^2$.", 0.98, 0.001),
  s(RO, "x4r-r2-misleading", 8.5, "Why is the uncentred $R^2$ of a through-origin fit misleading?",
    "It compares the fit with predicting $0$ rather than predicting $\\bar{y}$, so it's usually very high even for a poor fit.",
    "It can't be compared with an intercept model's $R^2$; compare residual variances or information criteria instead."),
  n(RO, "x4r-ratio", 9, "For the data $(1, 1)$ and $(2, 3)$, compute the ratio estimator $\\bar{y}/\\bar{x}$.", 1.3333, 0.001),
  s(RO, "x4r-weighting", 9, "Which error-variance assumptions lead to the ratio estimator $\\bar{y}/\\bar{x}$ versus $\\sum xy/\\sum x^2$?",
    "With $\\mathrm{Var}(\\varepsilon_i) = \\sigma^2$ constant, OLS through the origin gives $\\sum xy/\\sum x^2$.",
    "With $\\mathrm{Var}(\\varepsilon_i) \\propto x_i$, WLS with weights $1/x_i$ gives $\\sum y/\\sum x = \\bar{y}/\\bar{x}$ — the classical ratio estimator in survey sampling."),
  s(RO, "x4r-test-first", 9.5, "Should you test $H_0$: intercept $= 0$ before forcing the line through the origin? What are the pitfalls?",
    "Testing the intercept is a sensible check, but failing to reject doesn't prove it's zero, especially if the data are far from $x = 0$ (the intercept is then poorly estimated).",
    "Pre-testing also changes the error properties of the final inference. Prefer subject-matter justification, and keep the intercept unless there's a strong reason."),

  // --- inverse-prediction-calibration --------------------------------------------------------
  n(IP, "x4r-x0", 5, "The calibration line is $y = 2 + 0.5x$. Estimate $x_0$ for an observed $y_0 = 6$.", 8),
  n(IP, "x4r-rel", 6.5, "The slope $0.5$ has SE $0.05$. What is its relative SE?", 0.1, 0.001),
  n(IP, "x4r-se", 7, "Delta-method SE of $\\hat{x}_0$: $\\frac{s}{|b|}\\sqrt{1 + \\frac1n + \\frac{(\\hat{x}_0 - \\bar{x})^2}{S_{xx}}}$ with $s = 1$, $b = 0.5$, $n = 10$, $\\hat{x}_0 - \\bar{x} = 2$ and $S_{xx} = 40$. Compute it.", 2.1909, 0.001),
  n(IP, "x4r-se-reps", 7.5, "Same, but $y_0$ is the mean of $m = 4$ replicates, so the $1$ becomes $1/m$. Compute the SE.", 1.3416, 0.001),
  s(IP, "x4r-classical", 8, "Compare the classical calibration estimator with the inverse (regress $x$ on $y$) estimator.",
    "Classical: fit $y$ on $x$ and invert, $\\hat{x}_0 = (y_0 - a)/b$ — consistent, but with infinite mean in small samples.",
    "Inverse: regress $x$ on $y$ directly — shrinks towards $\\bar{x}$, has lower MSE for $x_0$ near the centre of the calibration data, but is biased at the extremes."),
  n(IP, "x4r-g", 8, "Compute $g = t^2s^2/(b^2S_{xx})$ for $t = 2$, $s = 1$, $b = 0.5$ and $S_{xx} = 40$.", 0.4, 0.001),
  s(IP, "x4r-unbounded", 8.5, "Why can a Fieller calibration interval be unbounded, and when does that happen?",
    "The interval comes from solving a quadratic in $x_0$ whose leading coefficient is proportional to $1 - g$.",
    "When $g \\ge 1$ — equivalently the slope isn't significantly different from zero — the set is unbounded (the whole line or two half-lines): the data can't pin down $x_0$."),
  n(IP, "x4r-rule", 9, "A common rule of thumb says the simple delta-method interval is adequate when $g$ is below what value?", 0.1, 0.001),
  s(IP, "x4r-fieller", 9, "Explain the idea of Fieller's theorem for a ratio of means.",
    "To get a CI for $\\theta = \\mu_1/\\mu_2$, note that $\\bar{y}_1 - \\theta\\bar{y}_2$ has mean zero and a known variance for each $\\theta$.",
    "The confidence set is all $\\theta$ for which the resulting t-statistic isn't significant — a quadratic inequality, giving exact coverage but possibly unbounded sets."),
  s(IP, "x4r-bayes", 9.5, "How does a Bayesian approach handle calibration (predicting $x$ from $y$)?",
    "Put a prior on $x_0$ (e.g. the distribution of $x$ in the population measured) and compute $p(x_0 \\mid y_0, \\text{data}) \\propto p(y_0 \\mid x_0, \\text{data})p(x_0)$, integrating over the calibration parameters.",
    "It always gives proper intervals, and naturally shrinks towards typical values — the inverse estimator is its large-sample analogue when $x$ values are a sample from the population."),

  // --- dummy-variables-comparing-lines ------------------------------------------------------
  n(DV, "x4r-intercept-diff", 5, "$y = 2 + 3x + 1.5D$. What is the difference in intercepts between the groups?", 1.5, 0.001),
  n(DV, "x4r-slope1", 6.5, "$y = 2 + 3x + 1.5D + 0.5xD$. What is the slope for the group with $D = 1$?", 3.5, 0.001),
  n(DV, "x4r-cross", 7, "For the same model, at what $x$ do the two groups' lines intersect?", -3),
  n(DV, "x4r-parallel", 7.5, "With two groups, how many restrictions does the “parallel lines” hypothesis impose on the separate-lines model?", 1),
  s(DV, "x4r-hierarchy", 8, "Describe the nested models for comparing regression lines across groups.",
    "Coincident (one line) ⊂ parallel (common slope, different intercepts) and concurrent (common intercept, different slopes) ⊂ separate lines (group-specific intercepts and slopes).",
    "Compare them with extra-sum-of-squares F-tests, starting from the most general model."),
  n(DV, "x4r-restrictions", 8, "With $3$ groups, how many restrictions separate the “separate lines” model from a single common line?", 4),
  s(DV, "x4r-joint", 8.5, "Why fit one model with dummies and interactions rather than separate regressions per group?",
    "A joint model pools the error variance (more residual degrees of freedom) and gives formal tests of differences in intercepts and slopes.",
    "It also allows sharing some parameters (e.g. a common slope) — impossible with separate fits — while giving identical group-specific lines when fully interacted."),
  n(DV, "x4r-trap", 9, "A model with an intercept includes a categorical variable with $4$ levels. How many dummy variables are needed?", 3),
  s(DV, "x4r-interpret", 9, "How is the coefficient on $D$ interpreted when a $D \\times x$ interaction is present?",
    "It's the difference between the groups' lines at $x = 0$, which may be far outside the data and not a general group effect.",
    "Centre $x$ so the coefficient becomes the group difference at the average $x$, or report differences at chosen $x$ values."),
  s(DV, "x4r-chow", 9.5, "Explain the Chow test.",
    "It tests whether one regression applies to two groups (or two time periods) by comparing the pooled model's RSS with the sum of the RSS from separate fits.",
    "$F = \\frac{(\\mathrm{RSS}_P - \\mathrm{RSS}_1 - \\mathrm{RSS}_2)/p}{(\\mathrm{RSS}_1 + \\mathrm{RSS}_2)/(n_1 + n_2 - 2p)}$ — equivalent to testing all dummy and interaction terms in a fully interacted model, assuming equal error variances."),

  // --- two-phase-regression ---------------------------------------------------------------
  n(TP, "x4r-hinge", 5, "In $y = a + bx + c(x - 10)_+$ with $c = 2$, what does the hinge term contribute at $x = 12$?", 4),
  n(TP, "x4r-slope-after", 6.5, "With $b = 1$ and $c = 2$, what is the slope after the breakpoint?", 3),
  n(TP, "x4r-params-cont", 7, "How many mean parameters does a continuous two-phase linear model with a known breakpoint have?", 3),
  n(TP, "x4r-params-disc", 7.5, "How many does a discontinuous two-phase model (separate lines) with a known breakpoint have?", 4),
  s(TP, "x4r-nonregular", 8, "Why does an unknown breakpoint make two-phase regression non-standard?",
    "The model isn't differentiable in the breakpoint, so the likelihood is non-smooth and the usual Taylor-expansion theory fails.",
    "Estimation needs a grid search or profile likelihood, and the breakpoint estimate converges at non-standard rates with a non-normal distribution."),
  n(TP, "x4r-grid", 8, "A grid search over $50$ candidate breakpoints requires how many linear least squares fits?", 50),
  s(TP, "x4r-davies", 8.5, "Why doesn't the likelihood ratio test for the existence of a change point follow a $\\chi^2$ distribution?",
    "Under $H_0$ (no change) the breakpoint isn't identified — it appears only under the alternative (Davies' problem) — so regularity conditions fail.",
    "The null distribution is that of the supremum of a random process; use simulation, bootstrap, or Davies' bounds for p-values."),
  n(TP, "x4r-at-knot", 9, "What is the value of $(x - 10)_+$ at $x = 10$?", 0),
  s(TP, "x4r-threshold", 9, "How is segmented regression used for threshold effects, and how is uncertainty in the breakpoint handled?",
    "Threshold (e.g. dose–response or physiological) models posit no effect below a breakpoint and a linear effect above it.",
    "Use profile-likelihood intervals for the breakpoint, or bootstrap, since Wald intervals are unreliable; report the uncertainty, since data often support a range of breakpoints."),
  s(TP, "x4r-compare", 9.5, "Compare hinge (piecewise linear) models with splines and smooth-transition models.",
    "A hinge model is a linear spline with one knot, with interpretable pre- and post-break slopes; a fixed-knot spline is linear in its parameters.",
    "Smooth-transition models (e.g. logistic transitions) avoid the kink and make estimation regular; splines with many knots fit smooth curves without asserting a sharp threshold."),

  // --- polynomial-regression ---------------------------------------------------------------
  n(PY, "x4r-vertex", 5, "Find the vertex $x$ of $\\hat{y} = 1 + 2x - 0.5x^2$.", 2),
  n(PY, "x4r-max", 6.5, "What is the maximum fitted value?", 3),
  n(PY, "x4r-marginal", 7, "Compute the marginal effect $d\\hat{y}/dx$ at $x = 1$.", 1),
  n(PY, "x4r-interp", 7.5, "What polynomial degree is needed to interpolate $5$ points (distinct $x$) exactly?", 4),
  s(PY, "x4r-runge", 8, "Why are high-degree polynomial fits problematic?",
    "Global polynomials oscillate wildly between and beyond data points (Runge's phenomenon), especially near the edges, and a change in one region affects the fit everywhere.",
    "Their design matrices are also badly conditioned; splines give flexibility with local control and better stability."),
  n(PY, "x4r-terms", 8, "How many terms (including the intercept) are in a full quadratic model in $3$ variables?", 10),
  s(PY, "x4r-hierarchy", 8.5, "What is the hierarchy principle in polynomial regression, and why follow it?",
    "If $x^k$ is in the model, include all lower powers (and for interactions, the main effects).",
    "Otherwise the model isn't invariant to shifting $x$ (centring changes which terms are present), and dropping a lower term imposes an arbitrary constraint, such as the vertex being at $x = 0$."),
  n(PY, "x4r-centred-corr", 9, "For $x$ equally spaced and symmetric about $0$ after centring, what is $\\mathrm{corr}(x, x^2)$?", 0),
  s(PY, "x4r-extrapolate", 9, "Why is extrapolating a polynomial fit dangerous?",
    "Outside the data the highest-order term dominates, so predictions shoot to $\\pm\\infty$ regardless of the true relationship.",
    "Confidence bands widen rapidly too; a quadratic fit to a saturating curve will eventually predict a decline that isn't real."),
  s(PY, "x4r-alternatives", 9.5, "Why are orthogonal polynomials or splines usually preferred over raw polynomial terms?",
    "Raw powers are highly collinear, making the design ill-conditioned and coefficients unstable; orthogonal polynomials make coefficients uncorrelated and fits numerically stable.",
    "Splines add flexibility locally without global oscillation; both give the same fitted values as the equivalent raw basis where they span the same space."),

  // --- orthogonal-polynomials ---------------------------------------------------------------
  n(OG, "x4r-lin3", 5, "The linear orthogonal-polynomial contrast for $3$ equally spaced levels is $(-1, 0, c)$. Find $c$.", 1),
  n(OG, "x4r-quad3", 6.5, "The quadratic contrast for $3$ levels is $(1, c, 1)$. Find $c$.", -2),
  n(OG, "x4r-lin4", 7, "The linear contrast for $4$ levels is $(-3, -1, 1, c)$. Find $c$.", 3),
  n(OG, "x4r-quad4", 7.5, "The quadratic contrast for $4$ levels is $(1, -1, -1, c)$. Find $c$.", 1),
  s(OG, "x4r-sequential", 8, "Why do orthogonal polynomials make the sequential tests for each degree independent of the fitting order?",
    "The columns are orthogonal, so each degree's sum of squares is the squared length of the projection onto its own column, unaffected by the other terms.",
    "The linear, quadratic, cubic, ... sums of squares add up to the total, and each can be tested separately (with the same error term)."),
  n(OG, "x4r-ss-lin", 8, "Means $2, 4, 6$ with $n = 5$ per group and contrast $(-1, 0, 1)$: compute $SS = nL^2/\\sum c^2$.", 40),
  s(OG, "x4r-unchanged", 8.5, "Why doesn't adding a higher-degree orthogonal polynomial change the lower-degree coefficients?",
    "With orthogonal columns, $X^\\top X$ is diagonal, so each coefficient is $q_k^\\top y/\\|q_k\\|^2$, depending only on its own column.",
    "Raw polynomial coefficients, by contrast, all change when a new power is added because the columns are correlated."),
  n(OG, "x4r-ss-quad", 9, "For the same means $2, 4, 6$, compute the quadratic contrast value $L = 2 - 2 \\cdot 4 + 6$.", 0),
  s(OG, "x4r-unequal", 9, "How are orthogonal polynomials constructed for unequally spaced $x$?",
    "Apply Gram–Schmidt (equivalently a QR factorisation) to the columns $1, x, x^2, \\ldots$ evaluated at the observed $x$ values.",
    "The result is orthogonal for that particular design; software (e.g. R's `poly`) does this automatically, and the tabled integer contrasts only apply to equally spaced, balanced designs."),
  s(OG, "x4r-conditioning", 9.5, "Why are raw polynomial design matrices ill-conditioned?",
    "For $x$ in, say, $[1, 10]$, the columns $x^k$ all increase steeply and become nearly collinear as $k$ grows, so $X^\\top X$ has a huge condition number (a Hilbert-like matrix).",
    "Rounding errors then swamp the coefficients; centring and scaling help, and orthogonal polynomials remove the problem entirely."),

  // --- regression-splines -------------------------------------------------------------------
  n(RS, "x4r-basis", 5, "A cubic spline with $3$ knots in the truncated power basis (with intercept) has how many basis functions?", 7),
  n(RS, "x4r-natural", 6.5, "A natural cubic spline with $K = 5$ knots has $K$ degrees of freedom (including the intercept). How many?", 5),
  n(RS, "x4r-trunc", 7, "Evaluate the truncated power basis function $(x - 2)_+^3$ at $x = 4$.", 8),
  n(RS, "x4r-cont", 7.5, "Up to which derivative order is a cubic spline continuous at its knots?", 2),
  s(RS, "x4r-natural-why", 8, "Why do natural splines constrain the fit to be linear beyond the boundary knots?",
    "Polynomials are highly variable near and beyond the boundary; forcing linearity there reduces variance where data are sparse.",
    "It also frees up $4$ degrees of freedom (two constraints at each end) that can be spent on interior knots."),
  n(RS, "x4r-linear", 8, "A linear spline with $4$ knots has how many parameters?", 6),
  s(RS, "x4r-bspline", 8.5, "Why are B-splines preferred to the truncated power basis in computation?",
    "Truncated power functions overlap heavily and grow large, giving an ill-conditioned design.",
    "B-splines span the same space but each is non-zero over only a few adjacent intervals, giving a sparse, well-conditioned design matrix."),
  n(RS, "x4r-quantile", 9, "With $3$ interior knots placed at quantiles of $x$, at which percentile is the first knot placed?", 25),
  s(RS, "x4r-knots", 9, "How should the number and placement of knots be chosen?",
    "Place knots at quantiles of $x$ so each region has similar data; choose their number by cross-validation, AIC, or a rule of thumb ($3$–$7$ usually suffices).",
    "Alternatively use many knots with a smoothness penalty (penalised splines), which makes the choice of knots much less critical."),
  s(RS, "x4r-local", 9.5, "Contrast splines with global polynomials in terms of local support.",
    "A change in the data in one region affects a spline fit mainly near that region, because the basis functions (especially B-splines) have local support.",
    "A global polynomial's fit changes everywhere, which causes edge oscillation and sensitivity; splines achieve flexibility without that non-local behaviour."),

  // --- response-surface-methodology ------------------------------------------------------------
  n(RM, "x4r-params", 5, "How many parameters does a full second-order model in $2$ factors have?", 6),
  n(RM, "x4r-stat1d", 6.5, "Find the stationary point of $\\hat{y} = 10 + 2x - x^2$.", 1),
  n(RM, "x4r-stat-x1", 7, "For $\\hat{y} = 10 + 4x_1 + 2x_2 - x_1^2 - x_2^2$, find the stationary value of $x_1$.", 2),
  n(RM, "x4r-stat-x2", 7.5, "Find the stationary value of $x_2$.", 1),
  s(RM, "x4r-canonical", 8, "Explain canonical analysis of a fitted second-order surface.",
    "Write $\\hat{y} = b_0 + x^\\top b + x^\\top Bx$; the stationary point is $x_s = -\\tfrac12B^{-1}b$, and rotating to $B$'s eigenvectors gives $\\hat{y} = \\hat{y}_s + \\sum\\lambda_iw_i^2$.",
    "All $\\lambda_i < 0$: a maximum; all $> 0$: a minimum; mixed signs: a saddle. Small $|\\lambda_i|$ indicate ridges along which the response barely changes."),
  n(RM, "x4r-value", 8, "Compute the predicted response at that stationary point.", 15),
  s(RM, "x4r-ascent", 8.5, "What is the method of steepest ascent in the first phase of response surface methodology?",
    "Fit a first-order model near the current conditions and move along the gradient direction $b$ in steps proportional to the coefficients.",
    "Run experiments along that path until the response stops improving, then fit a new first-order model or, near the optimum, a second-order model."),
  n(RM, "x4r-ccd", 9, "A central composite design in $2$ factors has $4$ factorial runs, $4$ axial runs and $3$ centre runs. How many runs in total?", 11),
  n(RM, "x4r-alpha", 9, "For a rotatable central composite design, $\\alpha = n_f^{1/4}$. Compute it for $n_f = 4$ factorial runs.", 1.4142, 0.001),
  s(RM, "x4r-ridge", 9.5, "When the stationary point is a saddle or lies outside the experimental region, what does ridge analysis do?",
    "It finds the best predicted response on spheres of increasing radius about the design centre (constrained optimisation with a Lagrange multiplier).",
    "Tracing this path shows how the optimum moves and how the response changes, giving practical operating conditions within the region where the model is trusted."),
];
