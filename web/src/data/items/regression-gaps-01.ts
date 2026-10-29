import type { Item } from "../../lib/assessment/types";
import { m, mcq, num, short } from "./regression-gaps-shared";

/**
 * Linear Models gap lessons, part 1: partial correlation and suppression,
 * structural breaks and the Chow test, and Newey–West (HAC) standard errors.
 * Forty questions per lesson, four at each level from 1 to 10.
 */

// ---------------------------------------------------------------------------
// partial-and-semipartial-correlation
// ---------------------------------------------------------------------------
const PC = "partial-and-semipartial-correlation";
const partialCorrelation: Item[] = [
  // level 1
  mcq(m(PC, "recall-semipartial", "recall", 1, 15, "The semipartial correlation $r_{y(1\\cdot2)}$ is the correlation between:"),
    "$Y$ and the residual of $X_1$ after regressing $X_1$ on $X_2$",
    [
      ["The residuals of $Y$ and of $X_1$, both after regressing on $X_2$", "semi-is-partial", "That is the partial correlation: it cleans both variables."],
      ["$Y$ and $X_1$", "semi-is-simple", "That is the simple correlation; nothing is removed."],
      ["$Y$ and the fitted value from regressing $X_1$ on $X_2$", "semi-fitted", "The fitted part is what gets removed, not what is kept."],
    ]),
  mcq(m(PC, "recall-partial", "recall", 1, 15, "The partial correlation $r_{y1\\cdot2}$ removes the linear effect of $X_2$ from:"),
    "Both $Y$ and $X_1$",
    [
      ["Only $X_1$", "partial-one-side", "Removing $X_2$ from $X_1$ alone gives the semipartial correlation."],
      ["Only $Y$", "partial-y-only", "Both variables are residualized."],
      ["Neither", "partial-none", "That is the simple correlation."],
    ]),
  mcq(m(PC, "recall-suppressor", "recall", 1, 15, "A suppressor variable is one that:"),
    "Increases another regressor's coefficient when added, by removing variation in it that is unrelated to $Y$",
    [
      ["Is highly correlated with $Y$", "suppressor-strong", "Suppressors are often uncorrelated with $Y$ altogether."],
      ["Shrinks another regressor's coefficient toward zero", "suppressor-confounder", "That is the confounding pattern."],
      ["Has a coefficient of exactly zero", "suppressor-zero", "A suppressor typically gets a nonzero (often negative) coefficient."],
    ]),
  mcq(m(PC, "recall-semipartial-r2", "recall", 1, 15, "The squared semipartial correlation $r_{y(1\\cdot2)}^2$ equals:"),
    "The increase in $R^2$ when $X_1$ is added to a model that already contains $X_2$",
    [
      ["The $R^2$ of the full model", "semi-total", "That is $\\rho_{y2}^2 + r_{y(1\\cdot2)}^2$."],
      ["The share of $Y$'s residual variance (after $X_2$) explained by $X_1$", "semi-vs-partial-r2", "That is the squared partial correlation."],
      ["$\\beta_1^2$", "semi-beta", "A coefficient is not a correlation unless the regressors are uncorrelated."],
    ]),
  // level 2
  num(m(PC, "apply-semipartial", "apply", 2, 20, "Standardized variables have $\\rho_{y1} = 0.5$, $\\rho_{y2} = 0.3$ and $\\rho_{12} = 0.6$. Find the semipartial correlation $r_{y(1\\cdot2)}$."), 0.4),
  num(m(PC, "apply-beta1", "apply", 2, 20, "With $\\rho_{y1} = 0.5$, $\\rho_{y2} = 0.3$ and $\\rho_{12} = 0.6$ (standardized), find the regression coefficient $\\beta_1$ of $X_1$ in $Y = \\beta_1 X_1 + \\beta_2 X_2 + \\varepsilon$."), 0.5),
  num(m(PC, "apply-ovb-gap", "apply", 2, 20, "In a standardized two-regressor model $\\beta_2 = 0.2$ and $\\rho_{12} = 0.5$. Find $\\rho_{y1} - \\beta_1$, the gap between the short and long coefficients of $X_1$."), 0.1),
  mcq(m(PC, "apply-orthogonal", "apply", 2, 20, "If $\\rho_{12} = 0$, the standardized coefficient $\\beta_1$ equals:"),
    "$\\rho_{y1}$",
    [
      ["$\\rho_{y1}\\rho_{y2}$", "orth-product", "With orthogonal regressors, nothing is partialled out."],
      ["The partial correlation $r_{y1\\cdot2}$ in general", "orth-partial", "The partial still divides by $\\sqrt{1 - \\rho_{y2}^2}$."],
      ["$0$", "orth-zero", "Orthogonal regressors keep their simple slopes."],
    ]),
  // level 3
  num(m(PC, "apply-partial", "apply", 3, 25, "Standardized variables have $\\rho_{y1} = 0.5$, $\\rho_{y2} = 0.6$ and $\\rho_{12} = 0$. Find the partial correlation $r_{y1\\cdot2}$. Give $3$ decimal places."), 0.625),
  num(m(PC, "apply-r2-orthogonal", "apply", 3, 25, "Two uncorrelated standardized regressors have $\\rho_{y1} = 0.3$ and $\\rho_{y2} = 0.4$. Find the $R^2$ of $Y$ on both."), 0.25),
  num(m(PC, "apply-semipartial-sq", "apply", 3, 25, "The regression of $Y$ on $X_2$ alone has $R^2 = 0.25$; adding $X_1$ raises it to $0.40$. Find the squared semipartial correlation $r_{y(1\\cdot2)}^2$."), 0.15),
  mcq(m(PC, "apply-order", "apply", 3, 25, "For any standardized $Y$, $X_1$, $X_2$, which ordering always holds?"),
    "$|r_{y1\\cdot2}| \\ge |r_{y(1\\cdot2)}|$",
    [
      ["$|r_{y(1\\cdot2)}| \\ge |r_{y1\\cdot2}|$", "order-reversed", "The partial divides by the shorter vector $\\tilde{Y}$, so it is larger."],
      ["$|\\rho_{y1}| \\ge |r_{y1\\cdot2}|$", "order-simple", "Partialling out can raise the correlation (suppression)."],
      ["$|\\beta_1| \\le 1$", "order-beta", "Coefficients are not bounded by $1$ when regressors are correlated."],
    ]),
  // level 4
  num(m(PC, "apply-suppression-beta1", "apply", 4, 35, "Standardized variables have $\\rho_{y1} = 0.3$, $\\rho_{y2} = 0$ and $\\rho_{12} = 0.8$. Find $\\beta_1$ in the regression of $Y$ on $X_1$ and $X_2$. Give $2$ decimal places."), 0.83),
  num(m(PC, "apply-suppression-beta2", "apply", 4, 35, "Standardized variables have $\\rho_{y1} = 0.3$, $\\rho_{y2} = 0$ and $\\rho_{12} = 0.8$. Find $\\beta_2$ in the regression of $Y$ on $X_1$ and $X_2$. Give $2$ decimal places."), -0.67),
  num(m(PC, "apply-r2-equal", "apply", 4, 35, "Standardized variables have $\\rho_{y1} = \\rho_{y2} = 0.5$ and $\\rho_{12} = 0.5$. Find the $R^2$ of $Y$ on both. Give $2$ decimal places."), 0.33),
  mcq(m(PC, "apply-confounding", "apply", 4, 35, "Adding $X_2$ to a regression of $Y$ on $X_1$ shrinks the coefficient of $X_1$ from $0.5$ to $0.2$. This pattern is called:"),
    "Confounding: $X_2$ accounted for part of the association between $X_1$ and $Y$",
    [
      ["Suppression", "confound-suppression", "Suppression makes the coefficient grow, not shrink."],
      ["Attenuation from measurement error", "confound-attenuation", "Nothing here involves noise in $X_1$."],
      ["Overfitting", "confound-overfit", "Adding one relevant control is not overfitting."],
    ]),
  // level 5
  short(m(PC, "explain-beta-not-correlation", "explain", 5, 120, "Explain why a standardized regression coefficient $\\beta_1$ is not a correlation when the two regressors are correlated, and why it can exceed $1$ in magnitude."),
    [
      ["projection", "Says $\\beta_1 = \\langle Y, \\tilde{X}_1\\rangle/\\lVert\\tilde{X}_1\\rVert^2$, a projection coefficient onto a vector shorter than $1$", 2, true],
      ["cosine", "Contrasts with a correlation, which divides by the length once (a cosine, bounded by $1$)", 2, true],
      ["collinearity", "Notes that the shorter $\\tilde{X}_1$ is (higher $\\rho_{12}$), the larger $|\\beta_1|$ can be", 1, false],
    ]),
  mcq(m(PC, "apply-uncorrelated-control", "apply", 5, 40, "$X_2$ has zero correlation with $Y$ but correlation $0.6$ with $X_1$. Adding $X_2$ to the regression of $Y$ on $X_1$:"),
    "Raises $R^2$ and makes the coefficient of $X_1$ larger in magnitude",
    [
      ["Leaves $R^2$ unchanged because $X_2$ is uncorrelated with $Y$", "zero-corr-useless", "$X_2$ removes noise from $X_1$, so $R^2$ rises to $\\rho_{y1}^2/(1 - \\rho_{12}^2)$."],
      ["Shrinks the coefficient of $X_1$", "zero-corr-shrink", "The coefficient becomes $\\rho_{y1}/(1 - \\rho_{12}^2)$, larger."],
      ["Gives $X_2$ a coefficient of $0$", "zero-corr-beta0", "Its coefficient is $-\\rho_{12}\\rho_{y1}/(1 - \\rho_{12}^2) \\ne 0$."],
    ]),
  mcq(m(PC, "apply-pythagoras", "apply", 5, 40, "Which identity holds for the two-regressor $R^2$?"),
    "$R^2 = \\rho_{y1}^2 + r_{y(2\\cdot1)}^2$",
    [
      ["$R^2 = \\rho_{y1}^2 + \\rho_{y2}^2$", "pyth-simple", "That only holds when $\\rho_{12} = 0$."],
      ["$R^2 = r_{y1\\cdot2}^2 + r_{y2\\cdot1}^2$", "pyth-partials", "Partial correlations are rescaled by different residual variances and do not add up."],
      ["$R^2 = \\beta_1^2 + \\beta_2^2$", "pyth-betas", "It is $\\beta_1\\rho_{y1} + \\beta_2\\rho_{y2}$, and squares of coefficients ignore the cross term."],
    ]),
  num(m(PC, "apply-psd-bound", "apply", 5, 40, "Two signals each have correlation $0.8$ with a target. What is the smallest possible correlation between the two signals?"), 0.28),
  // level 6
  short(m(PC, "explain-partial-larger", "explain", 6, 150, "Explain geometrically why the partial correlation $r_{y1\\cdot2}$ is always at least as large in magnitude as the semipartial correlation $r_{y(1\\cdot2)}$, and when they are equal."),
    [
      ["numerator", "Notes both share the numerator $\\langle Y, \\tilde{X}_1\\rangle = \\langle\\tilde{Y}, \\tilde{X}_1\\rangle$ because $\\tilde{X}_1 \\perp X_2$", 2, true],
      ["denominator", "The partial divides by $\\lVert\\tilde{Y}\\rVert = \\sqrt{1 - \\rho_{y2}^2} \\le 1$ instead of $\\lVert Y\\rVert = 1$", 2, true],
      ["equality", "Equal when $\\rho_{y2} = 0$ (or both are $0$)", 1, false],
    ]),
  num(m(PC, "apply-partial-mixed", "apply", 6, 50, "Standardized variables have $\\rho_{y1} = 0.6$, $\\rho_{y2} = 0.5$ and $\\rho_{12} = 0.4$. Find the partial correlation $r_{y1\\cdot2}$. Give $3$ decimal places."), 0.504),
  num(m(PC, "apply-r2-mixed", "apply", 6, 50, "Standardized variables have $\\rho_{y1} = 0.6$, $\\rho_{y2} = 0.5$ and $\\rho_{12} = 0.4$. Find the $R^2$ of $Y$ on $X_1$ and $X_2$. Give $2$ decimal places."), 0.44),
  mcq(m(PC, "apply-sign-flip", "apply", 6, 50, "$\\rho_{y1} = 0.2$, $\\rho_{y2} = 0.6$, $\\rho_{12} = 0.5$. What happens to the coefficient of $X_1$ when $X_2$ is added?"),
    "It changes sign: $\\beta_1 = \\frac{0.2 - 0.3}{0.75} < 0$",
    [
      ["It grows: suppression", "flip-grows", "The numerator $\\rho_{y1} - \\rho_{12}\\rho_{y2}$ is negative here."],
      ["It stays at $0.2$", "flip-same", "That needs $\\rho_{12} = 0$."],
      ["It becomes exactly zero", "flip-zero", "Zero requires $\\rho_{y1} = \\rho_{12}\\rho_{y2}$, i.e. $0.2 = 0.3$, which fails."],
    ]),
  // level 7
  short(m(PC, "explain-screening", "transfer", 7, 150, "A quant drops every candidate signal whose correlation with next-day returns is below $0.01$ before running a multivariate regression. Explain how this can throw away useful signals, with a concrete correlation pattern."),
    [
      ["suppressor", "Identifies suppressors: a signal uncorrelated with returns can still raise $R^2$ when combined with another", 2, true],
      ["example", "Gives a pattern such as $\\rho_{y2} = 0$, $\\rho_{12} \\ne 0$, so $R^2$ rises from $\\rho_{y1}^2$ to $\\rho_{y1}^2/(1 - \\rho_{12}^2)$", 2, true],
      ["fix", "Suggests judging signals jointly (incremental $R^2$, partial correlation) rather than marginally", 1, false],
    ]),
  num(m(PC, "apply-min-rho12", "apply", 7, 60, "Two signals each have correlation $0.2$ with a target. Find the smallest admissible correlation between the signals (from positive semidefiniteness of the correlation matrix)."), -0.92),
  num(m(PC, "apply-r2-negative-rho", "apply", 7, 60, "Two standardized signals each have correlation $0.2$ with the target and correlation $-0.5$ with each other. Find the $R^2$ of the target on both."), 0.16),
  mcq(m(PC, "apply-max-r2", "apply", 7, 60, "Two signals each have correlation $0.2$ with a target. As their mutual correlation reaches its smallest admissible value, the joint $R^2$:"),
    "Reaches $1$: the target lies in the plane of the two signals",
    [
      ["Stays at $0.08$", "maxr2-additive", "$0.08$ is the orthogonal case $\\rho_{12} = 0$."],
      ["Falls to $0.04$", "maxr2-single", "That is the duplicated-signal case $\\rho_{12} = 1$."],
      ["Is undefined", "maxr2-undefined", "The correlation matrix becomes singular but $R^2 = \\frac{2r^2}{1 + \\rho_{12}} = 1$."],
    ]),
  // level 8
  short(m(PC, "derive-semipartial", "explain", 8, 180, "Derive $r_{y(1\\cdot2)} = \\frac{\\rho_{y1} - \\rho_{12}\\rho_{y2}}{\\sqrt{1 - \\rho_{12}^2}}$ for standardized variables."),
    [
      ["residual", "Writes $X_1 = \\rho_{12}X_2 + \\tilde{X}_1$ with $\\text{Var}(\\tilde{X}_1) = 1 - \\rho_{12}^2$", 2, true],
      ["covariance", "Computes $\\text{Cov}(Y, \\tilde{X}_1) = \\rho_{y1} - \\rho_{12}\\rho_{y2}$", 2, true],
      ["normalize", "Divides by $\\text{sd}(Y)\\,\\text{sd}(\\tilde{X}_1) = \\sqrt{1 - \\rho_{12}^2}$", 1, true],
    ]),
  num(m(PC, "apply-r2-small", "apply", 8, 70, "Standardized variables have $\\rho_{y1} = 0.3$, $\\rho_{y2} = 0.1$ and $\\rho_{12} = 0.5$. Find the $R^2$ of $Y$ on $X_1$ and $X_2$. Give $3$ decimal places."), 0.093),
  num(m(PC, "apply-semipartial-negative", "apply", 8, 70, "Standardized variables have $\\rho_{y1} = 0.3$, $\\rho_{y2} = 0.1$ and $\\rho_{12} = 0.5$. Find the semipartial correlation $r_{y(2\\cdot1)}$ of $X_2$. Give $3$ decimal places."), -0.058),
  mcq(m(PC, "apply-sequential", "apply", 8, 70, "In a sequential (Type I) ANOVA, $X_1$ is entered before $X_2$. The sum of squares credited to $X_2$, as a fraction of SST, is:"),
    "$r_{y(2\\cdot1)}^2$, the squared semipartial correlation of $X_2$",
    [
      ["$\\rho_{y2}^2$", "seq-simple", "That would be its credit if it were entered first."],
      ["$r_{y2\\cdot1}^2$", "seq-partial", "The partial correlation uses the residual variance of $Y$, not SST, as its base."],
      ["$\\beta_2^2$", "seq-beta", "Coefficients do not decompose $R^2$."],
    ]),
  // level 9
  short(m(PC, "transfer-ovb-sign", "transfer", 9, 180, "Using $\\rho_{y1} - \\beta_1 = \\beta_2\\rho_{12}$, explain how to predict whether adding a control will raise or lower a coefficient, and give one example of each."),
    [
      ["formula", "Explains the change equals the control's coefficient times its correlation with $X_1$", 2, true],
      ["confounding-example", "Gives a case where $\\beta_2\\rho_{12} > 0$ with $\\beta_1 > 0$, so the coefficient falls", 1, true],
      ["suppression-example", "Gives a case where $\\beta_2\\rho_{12} < 0$ with $\\beta_1 > 0$ (e.g. $\\rho_{y2} = 0$), so the coefficient rises", 2, true],
    ]),
  short(m(PC, "transfer-two-signals", "transfer", 9, 180, "Two alpha signals each have correlation $0.1$ with returns. A colleague says combining them can at most double the $R^2$ to $0.02$. Evaluate the claim."),
    [
      ["formula", "Uses $R^2 = \\frac{2r^2}{1 + \\rho_{12}}$ with $r = 0.1$", 2, true],
      ["negative", "Notes that negatively correlated signals give $R^2$ above $0.02$, up to $1$ at $\\rho_{12} = -0.98$", 2, true],
      ["positive", "Notes positively correlated (redundant) signals give less, down to $0.01$", 1, false],
    ]),
  num(m(PC, "apply-ratio", "apply", 9, 80, "If $\\rho_{y2} = 0.6$, what is the ratio $r_{y1\\cdot2}/r_{y(1\\cdot2)}$ of the partial to the semipartial correlation?"), 1.25),
  mcq(m(PC, "apply-standardized-report", "apply", 9, 80, "A report ranks predictors by their standardized coefficients and calls the largest “the most correlated with the outcome”. The main flaw is:"),
    "With correlated predictors, standardized coefficients measure partial effects, not correlations, and can even have the opposite sign",
    [
      ["Standardization changes $R^2$", "report-r2", "Rescaling predictors leaves $R^2$ unchanged."],
      ["Standardized coefficients cannot be compared", "report-incomparable", "They are comparable; they just are not correlations."],
      ["Standardized coefficients are always smaller than correlations", "report-smaller", "Under suppression they are larger."],
    ]),
  // level 10
  short(m(PC, "transfer-max-beta", "transfer", 10, 200, "With $\\rho_{y1} = 0.1$ and $\\rho_{y2} = 0$, how large can $\\beta_1$ become as $\\rho_{12}$ varies over admissible values? Explain what happens near that limit."),
    [
      ["formula", "Writes $\\beta_1 = \\frac{0.1}{1 - \\rho_{12}^2}$", 1, true],
      ["bound", "Uses positive semidefiniteness: $\\rho_{12}^2 \\le 1 - \\rho_{y1}^2 = 0.99$, so $\\beta_1 \\le 10$", 2, true],
      ["limit", "Explains that at the limit $Y$ lies in the span of $X_1$ and $X_2$ ($R^2 = 1$) with huge offsetting coefficients", 2, true],
    ]),
  short(m(PC, "transfer-attribution", "transfer", 10, 200, "A portfolio manager attributes $R^2$ to two factors by squared simple correlations, and the shares sum to more than the model's $R^2$. Explain why, and propose an attribution that adds up."),
    [
      ["overlap", "Explains that correlated factors share explained variance, so squared simple correlations double count it", 2, true],
      ["sequential", "Proposes the semipartial (sequential) decomposition $R^2 = \\rho_{y1}^2 + r_{y(2\\cdot1)}^2$, noting it depends on order", 2, true],
      ["shapley", "Mentions averaging over orders (Shapley / dominance analysis) to remove order dependence", 1, false],
    ]),
  num(m(PC, "apply-max-beta", "apply", 10, 90, "Standardized variables have $\\rho_{y1} = 0.1$ and $\\rho_{y2} = 0$. Find the supremum of $\\beta_1$ over all admissible $\\rho_{12}$."), 10),
  mcq(m(PC, "apply-psd-check", "apply", 10, 90, "Which correlation triple $(\\rho_{y1}, \\rho_{y2}, \\rho_{12})$ is impossible?"),
    "$(0.9, 0.9, 0.5)$",
    [
      ["$(0.9, 0.9, 0.7)$", "psd-07", "The lower bound is $0.81 - 0.19 = 0.62$, so $0.7$ is admissible."],
      ["$(0.5, 0.5, -0.4)$", "psd-neg", "The lower bound is $0.25 - 0.75 = -0.5$, so $-0.4$ is admissible."],
      ["$(0.1, 0.1, -0.9)$", "psd-weak", "The lower bound is $0.01 - 0.99 = -0.98$, so $-0.9$ is admissible."],
    ]),
];

// ---------------------------------------------------------------------------
// structural-breaks-chow-test
// ---------------------------------------------------------------------------
const CH = "structural-breaks-chow-test";
const chowTest: Item[] = [
  // level 1
  mcq(m(CH, "recall-null", "recall", 1, 15, "The null hypothesis of the Chow test at date $T^*$ is that:"),
    "The regression coefficients are the same before and after $T^*$",
    [
      ["The error variance changes at $T^*$", "chow-variance", "The classic test assumes equal variances; it tests coefficients."],
      ["There is a break at $T^*$", "chow-reversed", "That is the alternative."],
      ["The residuals are autocorrelated", "chow-dw", "That is what the Durbin–Watson test checks."],
    ]),
  mcq(m(CH, "recall-dummy", "recall", 1, 15, "The Chow test is equivalent to a partial $F$-test on:"),
    "A break dummy interacted with every regressor (including the intercept)",
    [
      ["The intercept alone", "dummy-intercept", "That tests only a level shift."],
      ["Squared regressors", "dummy-squares", "That is a functional-form test."],
      ["Lagged residuals", "dummy-lags", "That is a test for serial correlation."],
    ]),
  mcq(m(CH, "recall-unknown", "recall", 1, 15, "When the break date is chosen by searching for the largest $F$, the right critical values come from:"),
    "Andrews' sup-$F$ distribution",
    [
      ["The usual $F$ table", "unknown-ftable", "Taking the maximum over dates inflates the statistic, so $F$ tables over-reject."],
      ["The Dickey–Fuller table", "unknown-df", "That is for unit-root tests."],
      ["The standard normal", "unknown-normal", "The statistic is a maximum of $F$'s, not a normal."],
    ]),
  mcq(m(CH, "recall-assumption", "recall", 1, 15, "The exact $F$ distribution of the classic Chow statistic requires:"),
    "Normal errors with the same variance in both regimes",
    [
      ["Equal sample sizes in the two regimes", "assume-equal-n", "The regimes can have different sizes."],
      ["No intercept", "assume-intercept", "Intercepts are allowed and usually included."],
      ["Uncorrelated regressors", "assume-orthogonal", "Regressors can be correlated."],
    ]),
  // level 2
  num(m(CH, "apply-f-basic", "apply", 2, 20, "A Chow test with $p = 2$ coefficients and $T = 44$ observations has $\\text{SSE}_{\\text{pool}} = 100$ and $\\text{SSE}_1 + \\text{SSE}_2 = 80$. Find the $F$-statistic."), 5),
  num(m(CH, "apply-denominator-df", "apply", 2, 20, "A Chow test has $p = 3$ coefficients per regime and $T = 50$ observations. What are the denominator degrees of freedom?"), 44),
  num(m(CH, "apply-numerator-df", "apply", 2, 20, "A model with an intercept and two slopes is tested for a break in all three coefficients. What are the numerator degrees of freedom?"), 3),
  mcq(m(CH, "apply-unrestricted-sse", "apply", 2, 20, "In a Chow test, the unrestricted SSE is:"),
    "$\\text{SSE}_1 + \\text{SSE}_2$ from separate fits before and after the break",
    [
      ["The pooled SSE", "unres-pooled", "The pooled fit is the restricted model."],
      ["$\\text{SSE}_1$ only", "unres-first", "Both regimes contribute residuals."],
      ["The difference $\\text{SSE}_{\\text{pool}} - \\text{SSE}_1$", "unres-diff", "That is not a residual sum of squares."],
    ]),
  // level 3
  num(m(CH, "apply-intercept-break", "apply", 3, 25, "Only the intercept is allowed to shift at $T^*$. With $T = 63$ observations, $p = 2$ original coefficients, restricted $\\text{SSE} = 200$ and unrestricted $\\text{SSE} = 180$, find the $F$-statistic. Give $2$ decimal places."), 6.67),
  num(m(CH, "apply-old-weight", "apply", 3, 25, "A coefficient breaks at $T^* = 80$. At $t = 100$, roughly what weight does an expanding-window estimate put on the old regime?"), 0.8),
  num(m(CH, "apply-expanding-estimate", "apply", 3, 25, "$\\beta_{\\text{old}} = 1$ until $T^* = 60$, then $\\beta_{\\text{new}} = 2$. Assuming similar regressor variation, approximately what does an expanding-window OLS estimate at $t = 100$ converge to?"), 1.4),
  mcq(m(CH, "apply-level-shift", "apply", 3, 25, "To test whether only the level of $Y$ shifted at $T^*$ (slopes unchanged), you add:"),
    "A single dummy $d_t = \\mathbb{1}[t > T^*]$",
    [
      ["The dummy times every regressor", "level-full", "That tests a change in all coefficients."],
      ["A time trend", "level-trend", "A trend is not a shift at one date."],
      ["Separate regressions with no restriction", "level-separate", "That allows slopes to change too."],
    ]),
  // level 4
  num(m(CH, "apply-f-larger", "apply", 4, 35, "Find the Chow $F$-statistic for $T = 104$, $p = 2$, $\\text{SSE}_{\\text{pool}} = 250$, $\\text{SSE}_1 = 90$ and $\\text{SSE}_2 = 110$."), 12.5),
  num(m(CH, "apply-pooled-beta", "apply", 4, 35, "A zero-mean factor has variance $1$ in regime $1$ (probability $0.7$, beta $1$) and variance $4$ in regime $2$ (probability $0.3$, beta $2$). Find the pooled OLS beta. Give $2$ decimal places."), 1.63),
  num(m(CH, "apply-prob-weighted", "apply", 4, 35, "Using the same regimes (probabilities $0.7$ and $0.3$, betas $1$ and $2$), find the probability-weighted average beta that a naive analyst might expect pooled OLS to give."), 1.3),
  mcq(m(CH, "apply-why-tilt", "apply", 4, 35, "Pooled OLS across two regimes tilts toward the high-volatility regime's beta because:"),
    "Each regime is weighted by its probability times its factor variance",
    [
      ["OLS weights by probability only", "tilt-probability", "That would give the probability-weighted average."],
      ["High-volatility regimes have more observations", "tilt-count", "The weights depend on factor variance, not just counts."],
      ["OLS ignores the low-volatility regime", "tilt-ignore", "Both regimes contribute."],
    ]),
  // level 5
  short(m(CH, "explain-sup-f", "explain", 5, 120, "Explain why computing the Chow $F$ at every candidate date and reporting the largest one cannot use ordinary $F$ critical values."),
    [
      ["multiple", "Notes that many (correlated) tests are run and the maximum is selected", 2, true],
      ["inflated", "Explains the maximum is stochastically larger than a single $F$, so $F$ tables over-reject", 2, true],
      ["andrews", "Names Andrews' sup-$F$ critical values (a Brownian-bridge functional)", 1, false],
    ]),
  mcq(m(CH, "apply-variance-break", "apply", 5, 40, "The error variance doubles after $T^*$ but coefficients do not change. The classic Chow test:"),
    "Can have the wrong size, because it assumes equal variances; a robust Wald test is safer",
    [
      ["Is unaffected", "var-unaffected", "Its $F$ distribution relies on a common variance."],
      ["Always rejects", "var-reject", "It does not test variances directly."],
      ["Becomes a test of the variance change", "var-test", "It still tests coefficients, just with a wrong reference distribution."],
    ]),
  mcq(m(CH, "apply-date-choice", "apply", 5, 40, "Which break date can legitimately use ordinary $F$ critical values?"),
    "The date a regulation took effect, fixed before looking at the data",
    [
      ["The date where the residual plot looks most different", "date-eyeball", "Choosing the date from the data is data snooping."],
      ["The date with the largest $F$", "date-max", "That needs sup-$F$ critical values."],
      ["The midpoint of the sample", "date-mid", "Fine if chosen in advance, but there is no reason to expect a break there; the regulation date is the substantive choice."],
    ]),
  num(m(CH, "apply-back-out-sse", "apply", 5, 40, "A test of $q = 3$ restrictions has unrestricted $\\text{SSE} = 150$ on $90$ residual degrees of freedom and $F = 4$. Find the restricted SSE."), 170),
  // level 6
  short(m(CH, "explain-expanding-bias", "explain", 6, 150, "Explain why an expanding-window estimate stays biased for a long time after a structural break, and how a rolling window trades this off."),
    [
      ["mix", "Says the expanding estimate mixes regimes roughly as $\\frac{T^*}{t}\\beta_{\\text{old}} + \\frac{t - T^*}{t}\\beta_{\\text{new}}$", 2, true],
      ["slow", "Notes the old-regime weight decays only like $T^*/t$", 1, true],
      ["rolling", "Explains a rolling window forgets the old regime faster but has higher variance", 2, true],
    ]),
  num(m(CH, "apply-optimal-window", "apply", 6, 50, "With $s = 10$ post-break observations, $\\sigma^2 p = 1$ and squared break size $D = 0.5$, the MSE-optimal rolling window is $W^* = \\frac{2s^2D}{2sD - \\sigma^2 p}$. Find $W^*$. Give $2$ decimal places."), 11.11),
  num(m(CH, "apply-expanding-bias", "apply", 6, 50, "A coefficient jumps by $\\Delta\\beta = 0.5$ at $T^* = 200$. Approximately what is the bias of the expanding-window estimate at $t = 250$?"), -0.4),
  mcq(m(CH, "apply-cusum", "apply", 6, 50, "Which tool monitors for a break without specifying a date?"),
    "A CUSUM test on recursive residuals",
    [
      ["The Chow test at a fixed date", "cusum-chow", "That needs the date."],
      ["The Durbin–Watson test", "cusum-dw", "That tests for serial correlation."],
      ["A Breusch–Pagan test", "cusum-bp", "That tests for heteroskedasticity."],
    ]),
  // level 7
  short(m(CH, "transfer-strategy-live", "transfer", 7, 150, "A signal's backtest coefficient seems to fall after the strategy went live on a known date. Describe how you would test this formally and what else could explain the drop."),
    [
      ["chow", "Proposes a Chow test (or break dummies) at the known go-live date", 2, true],
      ["alternatives", "Mentions alternatives: price impact or crowding, regression to the mean of an overfit backtest, changed volatility", 2, true],
      ["robust", "Mentions robust/HAC standard errors or unequal variances", 1, false],
    ]),
  num(m(CH, "apply-f-three", "apply", 7, 60, "Find the Chow $F$-statistic for $T = 40$, $p = 3$, $\\text{SSE}_{\\text{pool}} = 60$, $\\text{SSE}_1 = 20$, $\\text{SSE}_2 = 25$. Give $2$ decimal places."), 3.78),
  num(m(CH, "apply-gls-regime", "apply", 7, 60, "Two equally likely regimes have factor variance $1$ each, error variances $1$ and $4$, and betas $1$ and $2$. Weighted least squares with weights $1/\\sigma_k^2$ estimates a weighted average of the betas with weights $\\propto \\pi_k\\sigma_{f,k}^2/\\sigma_k^2$. Find it."), 1.2),
  mcq(m(CH, "apply-hidden-regime", "apply", 7, 60, "Regimes are hidden but persistent. The best way to estimate regime-specific betas is:"),
    "A regime-switching (hidden Markov) regression fitted by EM",
    [
      ["Pooled OLS", "hidden-pooled", "Pooled OLS returns a weighted average of the betas."],
      ["WLS with regime variances", "hidden-wls", "Still a single weighted average."],
      ["A Chow test", "hidden-chow", "A test does not estimate betas for hidden regimes."],
    ]),
  // level 8
  short(m(CH, "derive-chow-equivalence", "explain", 8, 180, "Show that a regression with a break dummy interacted with every regressor has residual sum of squares $\\text{SSE}_1 + \\text{SSE}_2$ from separate fits, and hence that the Chow statistic is a partial $F$-test."),
    [
      ["block", "Notes that with full interactions the design is block-diagonal across regimes", 2, true],
      ["separate", "Concludes the least-squares problem separates into the two regime fits", 2, true],
      ["ftest", "Identifies the pooled model as the restriction $\\boldsymbol{\\delta} = \\mathbf{0}$, giving the partial $F$ with $p$ and $T - 2p$ df", 1, true],
    ]),
  num(m(CH, "apply-optimal-window-2", "apply", 8, 70, "With $s = 20$ post-break observations, $\\sigma^2 p = 2$ and squared break size $D = 0.25$, find the MSE-optimal rolling window $W^* = \\frac{2s^2D}{2sD - \\sigma^2 p}$."), 25),
  num(m(CH, "apply-window-mse", "apply", 8, 70, "With $s = 20$, $\\sigma^2 p = 2$ and $D = 0.25$, evaluate $\\text{MSE}(W) = \\frac{\\sigma^2 p}{W} + \\left(\\frac{W - s}{W}\\right)^2 D$ at $W = 25$."), 0.09),
  mcq(m(CH, "apply-window-small-break", "apply", 8, 70, "If the break is small relative to noise, so that $2sD \\le \\sigma^2 p$, the MSE-optimal window is:"),
    "As long as possible (expanding): contaminating with old data is worth the variance reduction",
    [
      ["Exactly $s$", "small-s", "Using only post-break data is optimal only for large breaks."],
      ["Zero", "small-zero", "A window must contain data."],
      ["$\\sigma^2 p$", "small-sigma", "The window length is not a variance."],
    ]),
  // level 9
  short(m(CH, "transfer-pm-rule", "transfer", 9, 180, "Design a decision rule for when a portfolio manager should re-estimate a factor model after a suspected break. Discuss the costs of Type I and Type II errors."),
    [
      ["test", "Uses a break test with appropriate critical values (sup-$F$ or a pre-specified date)", 1, true],
      ["costs", "Type I: needless re-estimation on a short sample and turnover costs; Type II: trading on a stale model", 2, true],
      ["rule", "Proposes a concrete rule, e.g. conservative level plus a minimum post-break sample before switching", 2, true],
    ]),
  short(m(CH, "transfer-many-breaks", "transfer", 9, 180, "How would you handle a series that may have several breaks at unknown dates?"),
    [
      ["bai-perron", "Mentions Bai–Perron sequential or global break estimation", 2, true],
      ["selection", "Explains choosing the number of breaks by sequential sup-$F$ tests or an information criterion", 2, true],
      ["trimming", "Notes minimum regime lengths (trimming) to keep estimates stable", 1, false],
    ]),
  num(m(CH, "apply-false-alarm", "apply", 9, 80, "If $50$ break dates were tested independently at the $5\\%$ level, what is the probability of at least one false rejection? Give $2$ decimal places."), 0.92),
  mcq(m(CH, "apply-perron", "apply", 9, 80, "A stationary series with one level shift is tested for a unit root. A likely outcome is:"),
    "Failing to reject the unit root, because the break mimics persistence",
    [
      ["Rejecting the unit root easily", "perron-reject", "Breaks bias tests toward finding a unit root."],
      ["No effect on the test", "perron-none", "Perron (1989) showed breaks distort unit-root tests."],
      ["The test becomes invalid only with trends", "perron-trend", "Level shifts alone cause the problem."],
    ]),
  // level 10
  short(m(CH, "transfer-break-or-nonlinear", "transfer", 10, 200, "A Chow test at a known date rejects. Give two other explanations besides a genuine shift in coefficients, and how you would distinguish them."),
    [
      ["variance", "Unequal error variances across regimes (test with robust Wald)", 1, true],
      ["misspecification", "Nonlinearity or an omitted variable whose distribution shifts at the date", 2, true],
      ["check", "Describes a check, e.g. adding the omitted variable or nonlinear terms, or comparing pre-break out-of-sample fit", 2, true],
    ]),
  short(m(CH, "transfer-pooling-crisis", "transfer", 10, 200, "Explain why a hedge ratio estimated over a sample containing one market crisis can be badly wrong in calm periods, using the regime-weighting formula."),
    [
      ["weights", "Uses $\\hat{\\beta} \\approx \\frac{\\sum_k\\pi_k\\sigma_{f,k}^2\\beta_k}{\\sum_k\\pi_k\\sigma_{f,k}^2}$", 2, true],
      ["crisis", "Notes that the crisis regime has high factor variance, so it dominates despite its short duration", 2, true],
      ["remedy", "Suggests regime-conditional estimates or reweighting", 1, false],
    ]),
  num(m(CH, "apply-crisis-weight", "apply", 10, 90, "A crisis regime lasts $10\\%$ of the sample with factor variance $9$; the calm regime has factor variance $1$. What share of the pooled-beta weight does the crisis get? Give $2$ decimal places."), 0.5),
  mcq(m(CH, "apply-sup-f-size", "apply", 10, 90, "Using ordinary $F$ critical values for the maximum Chow statistic over many candidate dates makes the test:"),
    "Over-reject: its true size is well above the nominal $5\\%$",
    [
      ["Under-reject", "size-under", "The maximum is larger than a single $F$."],
      ["Exact", "size-exact", "The maximum does not have an $F$ distribution."],
      ["More powerful at no cost", "size-free", "The extra rejections are false alarms."],
    ]),
];

// ---------------------------------------------------------------------------
// hac-standard-errors
// ---------------------------------------------------------------------------
const HAC = "hac-standard-errors";
const hacErrors: Item[] = [
  // level 1
  mcq(m(HAC, "recall-what", "recall", 1, 15, "Newey–West standard errors are robust to:"),
    "Both heteroskedasticity and autocorrelation in the errors",
    [
      ["Heteroskedasticity only", "what-hc", "That is White's estimator."],
      ["Omitted variables", "what-ovb", "No standard error fixes a biased coefficient."],
      ["Measurement error in $X$", "what-eiv", "That biases the estimate; standard errors cannot fix it."],
    ]),
  mcq(m(HAC, "recall-consistent", "recall", 1, 15, "With serially correlated errors (and exogenous regressors), the OLS point estimate is:"),
    "Still unbiased and consistent; only the usual standard errors are wrong",
    [
      ["Biased", "cons-biased", "Unbiasedness needs only $\\mathbb{E}[\\varepsilon \\mid \\mathbf{X}] = 0$."],
      ["Inconsistent", "cons-inconsistent", "Consistency holds under mixing conditions."],
      ["Efficient", "cons-efficient", "GLS would be more efficient."],
    ]),
  mcq(m(HAC, "recall-kernel", "recall", 1, 15, "Newey–West uses Bartlett weights $1 - \\frac{h}{m + 1}$ because they:"),
    "Guarantee a positive semidefinite covariance estimate",
    [
      ["Make the estimator unbiased", "kernel-unbiased", "Kernel estimators are biased; the weights trade bias for variance."],
      ["Include all lags with equal weight", "kernel-equal", "Equal (truncated) weights can give negative variances."],
      ["Remove the need to choose $m$", "kernel-no-m", "$m$ must still be chosen."],
    ]),
  mcq(m(HAC, "recall-lrv", "recall", 1, 15, "The long-run variance $\\Omega$ of a stationary score $g_t$ is:"),
    "$\\sum_{h=-\\infty}^{\\infty}\\Gamma_h$, the sum of all its autocovariances",
    [
      ["$\\Gamma_0$, its variance", "lrv-gamma0", "That ignores autocorrelation."],
      ["$\\Gamma_1$, its first autocovariance", "lrv-gamma1", "All lags contribute."],
      ["The variance of its first difference", "lrv-diff", "Differencing is not involved."],
    ]),
  // level 2
  num(m(HAC, "apply-ar1-factor", "apply", 2, 20, "For estimating a mean with AR(1) errors, $\\Omega/\\Gamma_0 = \\frac{1 + \\rho}{1 - \\rho}$. Find it for $\\rho = 0.6$."), 4),
  num(m(HAC, "apply-se-inflation", "apply", 2, 20, "With AR(1) errors and $\\rho = 0.6$, by what factor do naive standard errors of a sample mean understate the truth?"), 2),
  num(m(HAC, "apply-bartlett-weight", "apply", 2, 20, "With bandwidth $m = 4$, what Bartlett weight $1 - \\frac{h}{m + 1}$ does lag $h = 2$ get?"), 0.6),
  mcq(m(HAC, "apply-direction", "apply", 2, 20, "With positively autocorrelated errors and a persistent regressor, naive OLS standard errors are usually:"),
    "Too small, so $t$-statistics are too large",
    [
      ["Too large", "dir-large", "Positive autocorrelation adds positive covariance terms that the naive formula drops."],
      ["Correct", "dir-correct", "They ignore the cross-period covariances."],
      ["Undefined", "dir-undefined", "They can be computed; they are just wrong."],
    ]),
  // level 3
  num(m(HAC, "apply-nw-m1", "apply", 3, 25, "A score has lag-1 autocorrelation $0.4$. Find the Newey–West ratio $\\hat{\\Omega}/\\Gamma_0$ with $m = 1$."), 1.4),
  num(m(HAC, "apply-rule-of-thumb", "apply", 3, 25, "Using $m = \\lfloor 4(T/100)^{2/9}\\rfloor$, find the bandwidth for $T = 100$."), 4),
  num(m(HAC, "apply-effective-n", "apply", 3, 25, "$n = 300$ observations have AR(1) errors with $\\rho = 0.5$. Find the effective sample size $n\\frac{1 - \\rho}{1 + \\rho}$ for estimating a mean."), 100),
  mcq(m(HAC, "apply-sandwich-part", "apply", 3, 25, "Classical, White and Newey–West standard errors differ only in:"),
    "The estimate of the middle of the sandwich (the score covariance)",
    [
      ["The point estimate $\\hat{\\boldsymbol{\\beta}}$", "part-beta", "All three use the same OLS estimate."],
      ["The bread $(\\mathbf{X}^T\\mathbf{X})^{-1}$", "part-bread", "The bread is common to all three."],
      ["The degrees of freedom only", "part-df", "They differ in which covariances they estimate."],
    ]),
  // level 4
  num(m(HAC, "apply-nw-m2", "apply", 4, 35, "A score has autocorrelations $\\rho_1 = 0.3$ and $\\rho_2 = 0.1$. Find the Newey–West ratio $\\hat{\\Omega}/\\Gamma_0$ with $m = 2$. Give $2$ decimal places."), 1.47),
  num(m(HAC, "apply-overlap-lags", "apply", 4, 35, "You regress overlapping $12$-month returns, sampled monthly, on a predictor. What is the smallest Newey–West bandwidth $m$ that covers the overlap-induced autocorrelation?"), 11),
  num(m(HAC, "apply-t-correct", "apply", 4, 35, "A naive $t$-statistic is $3$. The long-run variance is $4$ times the naive variance. What is the HAC $t$-statistic?"), 1.5),
  mcq(m(HAC, "apply-rectangular", "apply", 4, 35, "Using equal weights on all lags up to $m$ (a truncated kernel) can produce:"),
    "A covariance matrix with negative eigenvalues, i.e. negative variance estimates",
    [
      ["A biased point estimate", "rect-beta", "The kernel only affects standard errors."],
      ["Standard errors that are always too large", "rect-large", "The problem is possible negativity, not a fixed direction."],
      ["Nothing different from Bartlett", "rect-same", "Bartlett's declining weights are what ensure positive semidefiniteness."],
    ]),
  // level 5
  short(m(HAC, "explain-why-naive-fails", "explain", 5, 120, "Explain why $\\hat{\\sigma}^2(\\mathbf{X}^T\\mathbf{X})^{-1}$ is the wrong variance for OLS with autocorrelated errors."),
    [
      ["sandwich", "Writes the true variance as $(\\mathbf{X}^T\\mathbf{X})^{-1}\\left(\\sum_{t,s}\\mathbf{x}_t\\mathbf{x}_s^T\\mathbb{E}[\\varepsilon_t\\varepsilon_s]\\right)(\\mathbf{X}^T\\mathbf{X})^{-1}$", 2, true],
      ["dropped", "Notes the naive formula drops all $t \\ne s$ terms", 2, true],
      ["direction", "Says positive autocorrelation in both errors and regressors makes the naive SE too small", 1, false],
    ]),
  mcq(m(HAC, "apply-white-enough", "apply", 5, 40, "Errors are homoskedastic but autocorrelated. White (HC) standard errors are:"),
    "Not enough: they still ignore the autocorrelation",
    [
      ["Correct", "white-correct", "HC estimators keep only $\\Gamma_0$."],
      ["Too large", "white-large", "They are typically too small here, like the naive ones."],
      ["Identical to Newey–West", "white-nw", "They equal Newey–West only with $m = 0$."],
    ]),
  mcq(m(HAC, "apply-bandwidth-tradeoff", "apply", 5, 40, "Increasing the Newey–West bandwidth $m$:"),
    "Reduces truncation bias but increases the variance of the estimate",
    [
      ["Reduces both bias and variance", "bw-both", "More lags add noise."],
      ["Increases bias", "bw-bias", "More lags capture more of the long-run variance."],
      ["Changes the point estimate", "bw-point", "Only the standard errors change."],
    ]),
  num(m(HAC, "apply-ma1-lrv", "apply", 5, 40, "An MA(1) score with $\\theta = 0.5$ has $\\rho_1 = \\frac{\\theta}{1 + \\theta^2}$ and no higher autocorrelation. Find $\\Omega/\\Gamma_0$."), 1.8),
  // level 6
  short(m(HAC, "explain-psd", "explain", 6, 150, "Why does the Newey–West estimator use declining (Bartlett) weights instead of including the first $m$ autocovariances with weight $1$?"),
    [
      ["psd", "Explains the Bartlett form is positive semidefinite in every sample", 2, true],
      ["negative", "Notes equal weights can produce negative variances", 2, true],
      ["fourier", "Mentions the kernel's nonnegative Fourier transform or the outer-product representation", 1, false],
    ]),
  num(m(HAC, "apply-captured", "apply", 6, 50, "For an MA(1) score with $\\rho_1 = 0.4$, Newey–West with $m = 1$ gives $\\hat{\\Omega}/\\Gamma_0 = 1.4$ while the truth is $1.8$. What fraction of the long-run variance is captured? Give $2$ decimal places."), 0.78),
  num(m(HAC, "apply-overlap-factor", "apply", 6, 50, "Overlapping $3$-period returns built from i.i.d. single-period returns have autocorrelations $\\tfrac{2}{3}$ and $\\tfrac{1}{3}$ at lags $1$ and $2$ and none beyond. Find $\\Omega/\\Gamma_0$."), 3),
  mcq(m(HAC, "apply-gls-vs-hac", "apply", 6, 50, "If the errors are known to be AR(1), compared with OLS plus Newey–West, GLS:"),
    "Is more efficient; HAC keeps the less efficient OLS estimate and only fixes inference",
    [
      ["Is less efficient", "gls-less", "GLS is BLUE under the known covariance."],
      ["Gives the same standard errors", "gls-same", "GLS changes the estimator and its variance."],
      ["Is invalid", "gls-invalid", "It is valid if the AR(1) model is right."],
    ]),
  // level 7
  short(m(HAC, "transfer-fama-macbeth", "transfer", 7, 150, "Fama–MacBeth slopes $\\hat{\\lambda}_t$ are serially correlated because the characteristic is persistent. How should the standard error of their mean be computed, and why?"),
    [
      ["nw", "Applies Newey–West to the time series of $\\hat{\\lambda}_t$", 2, true],
      ["reason", "Explains that $s_\\lambda/\\sqrt{T}$ assumes independent slopes", 2, true],
      ["bandwidth", "Mentions choosing $m$ to cover the persistence", 1, false],
    ]),
  num(m(HAC, "apply-nw-m3", "apply", 7, 60, "A score has autocorrelations $0.5$, $0.25$, $0.125$ at lags $1$–$3$. Find the Newey–West ratio $\\hat{\\Omega}/\\Gamma_0$ with $m = 3$. Give $2$ decimal places."), 2.06),
  num(m(HAC, "apply-var-mean", "apply", 7, 60, "AR(1) errors have $\\Gamma_0 = 4$ and $\\rho = 0.5$. Approximately what is $\\text{Var}(\\bar{Y})$ for $n = 100$?"), 0.12),
  mcq(m(HAC, "apply-small-sample", "apply", 7, 60, "In small samples HAC $t$-tests tend to:"),
    "Over-reject, even with a sensible bandwidth; fixed-$b$ critical values help",
    [
      ["Under-reject", "small-under", "The HAC variance is biased down in small samples."],
      ["Be exact", "small-exact", "The normal approximation is only asymptotic."],
      ["Be identical to naive tests", "small-naive", "They include the autocovariances."],
    ]),
  // level 8
  short(m(HAC, "derive-ar1-factor", "explain", 8, 180, "Derive $\\text{Var}(\\bar{Y}) \\approx \\frac{\\Gamma_0}{n}\\cdot\\frac{1 + \\rho}{1 - \\rho}$ for a stationary AR(1) series."),
    [
      ["sum", "Writes $\\text{Var}(\\bar{Y}) = \\frac{\\Gamma_0}{n}\\left[1 + 2\\sum_{k=1}^{n-1}\\left(1 - \\frac{k}{n}\\right)\\rho^k\\right]$", 2, true],
      ["limit", "Takes $n \\to \\infty$ to get $1 + \\frac{2\\rho}{1 - \\rho} = \\frac{1 + \\rho}{1 - \\rho}$", 2, true],
      ["interpret", "Interprets as an effective sample size $n\\frac{1 - \\rho}{1 + \\rho}$", 1, false],
    ]),
  num(m(HAC, "apply-regression-factor", "apply", 8, 70, "For a slope with an AR(1) regressor ($\\rho_x = 0.9$) and AR(1) errors ($\\rho_e = 0.5$), the variance factor is $\\frac{1 + \\rho_x\\rho_e}{1 - \\rho_x\\rho_e}$. Find it. Give $2$ decimal places."), 2.64),
  num(m(HAC, "apply-rule-500", "apply", 8, 70, "Using $m = \\lfloor 4(T/100)^{2/9}\\rfloor$, find the bandwidth for $T = 500$."), 5),
  mcq(m(HAC, "apply-regressor-persistence", "apply", 8, 70, "Errors are autocorrelated but the regressor is serially independent. The naive OLS slope standard error is:"),
    "Approximately right, because the factor $\\frac{1 + \\rho_x\\rho_e}{1 - \\rho_x\\rho_e}$ is $1$ when $\\rho_x = 0$",
    [
      ["Far too small", "persist-small", "Both the regressor and the error must be persistent for the bias to be large."],
      ["Far too large", "persist-large", "There is no inflation when $\\rho_x = 0$."],
      ["Undefined", "persist-undefined", "It is well defined."],
    ]),
  // level 9
  short(m(HAC, "transfer-overlap", "transfer", 9, 180, "A researcher regresses overlapping $5$-year returns (sampled annually) on the dividend yield and reports OLS $t$-statistics. Explain what is wrong and how to fix it."),
    [
      ["overlap", "Overlap makes errors MA($4$), and the persistent predictor amplifies the problem", 2, true],
      ["fix", "Uses Newey–West with $m \\ge 4$ (or Hansen–Hodrick), or non-overlapping returns", 2, true],
      ["caveat", "Notes HAC tests still over-reject in short samples; mentions simulation or fixed-$b$ inference", 1, false],
    ]),
  short(m(HAC, "transfer-bandwidth-choice", "transfer", 9, 180, "Explain the bias–variance trade-off in choosing the Newey–West bandwidth and the resulting optimal rate."),
    [
      ["bias", "Truncation bias of order $1/m$ from omitted lags", 2, true],
      ["variance", "Estimation variance of order $m/T$ from estimating more autocovariances", 2, true],
      ["rate", "Balancing gives $m \\propto T^{1/3}$", 1, true],
    ]),
  num(m(HAC, "apply-se-ratio", "apply", 9, 80, "With a slope variance factor of $\\frac{1 + 0.45}{1 - 0.45}$, by what factor should naive standard errors be multiplied? Give $2$ decimal places."), 1.62),
  mcq(m(HAC, "apply-cluster", "apply", 9, 80, "In a panel with errors correlated within each firm over time, the analogue of Newey–West is:"),
    "Clustering standard errors by firm",
    [
      ["Clustering by time", "cluster-time", "That handles correlation across firms within a period."],
      ["White standard errors", "cluster-white", "They ignore any correlation."],
      ["Dropping the firm effect", "cluster-drop", "Ignoring it leaves standard errors too small."],
    ]),
  // level 10
  short(m(HAC, "transfer-backtest-tstat", "transfer", 10, 200, "A daily strategy holds positions for $20$ days and reports a Sharpe-based $t$-statistic of $4$ using daily returns as if independent. Assess the claim and describe a correct calculation."),
    [
      ["overlap", "Notes that overlapping holdings induce strong autocorrelation in daily P&L", 2, true],
      ["correction", "Proposes Newey–West with $m \\approx 19$ or more, or non-overlapping (20-day) returns", 2, true],
      ["magnitude", "Estimates the $t$-statistic could shrink substantially (variance factor up to about $20$, SE factor up to about $4.5$)", 1, false],
    ]),
  short(m(HAC, "transfer-fixed-b", "transfer", 10, 200, "Why do HAC-based $t$-tests over-reject in small samples, and what does fixed-$b$ inference change?"),
    [
      ["bias", "The HAC variance estimate is biased down and noisy when $m/T$ is not small", 2, true],
      ["fixed-b", "Fixed-$b$ treats $b = m/T$ as fixed and uses nonstandard critical values that account for this", 2, true],
      ["effect", "Notes the resulting critical values are larger than normal ones", 1, false],
    ]),
  num(m(HAC, "apply-bartlett-bias", "apply", 10, 90, "For AR(1) with $\\rho = 0.5$ (true $\\Omega/\\Gamma_0 = 3$), Newey–West with $m = 1$ gives $1 + 2\\cdot\\tfrac{1}{2}\\cdot 0.5$. What fraction of the truth is that?"), 0.5),
  mcq(m(HAC, "apply-hac-coef", "apply", 10, 90, "Switching from OLS standard errors to Newey–West standard errors changes:"),
    "Only the standard errors, $t$-statistics and confidence intervals; the coefficients are unchanged",
    [
      ["The coefficients and the standard errors", "hac-coef-both", "HAC is a variance estimator, not a new estimator of $\\boldsymbol{\\beta}$."],
      ["Only $R^2$", "hac-coef-r2", "$R^2$ depends only on the fit."],
      ["The residuals", "hac-coef-resid", "Residuals come from the same OLS fit."],
    ]),
];

export const regressionGaps01Items: Item[] = [...partialCorrelation, ...chowTest, ...hacErrors];
