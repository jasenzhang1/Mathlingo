import type { Item } from "../../../lib/assessment/types";
import { chapter } from "./shared";

/** New lesson from Ding Ch. 17, Interactions in OLS (40 items, levels 1–10). */

const INT = "interactions-in-ols";
const { m, n, s } = chapter("Ch. 17, Interactions in OLS");

export const dingInteractionsItems: Item[] = [
  // level 1
  m(INT, "recall-binary-interaction", 1, "In $y = \\beta_0 + \\beta_1 x_1 + \\beta_2 x_2 + \\beta_{12}x_1x_2 + \\varepsilon$ with binary $x_1, x_2$, the interaction coefficient $\\beta_{12}$ measures:",
    "A difference in differences: how much the effect of $x_2$ changes when $x_1$ goes from $0$ to $1$", [
      ["The effect of $x_1$ and $x_2$ together", "That is $\\beta_1 + \\beta_2 + \\beta_{12}$, the joint effect relative to the $(0, 0)$ cell."],
      ["The correlation between $x_1$ and $x_2$", "Interaction concerns the outcome’s response, not the covariates’ association."],
      ["The effect of $x_1$ when $x_2 = 0$", "That is $\\beta_1$."],
    ]),
  m(INT, "recall-cate", 1, "Under $y = \\beta_0 + \\beta_1 z + \\boldsymbol{\\beta}_2^{\\top}\\mathbf{x} + \\boldsymbol{\\beta}_3^{\\top}\\mathbf{x}z + \\varepsilon$ with binary treatment $z$, the conditional average treatment effect at $\\mathbf{x}$ is:",
    "$\\beta_1 + \\boldsymbol{\\beta}_3^{\\top}\\mathbf{x}$", [
      ["$\\beta_1$", "$\\beta_1$ is the effect only at $\\mathbf{x} = \\mathbf{0}$."],
      ["$\\boldsymbol{\\beta}_3^{\\top}\\mathbf{x}$", "That omits the baseline effect $\\beta_1$."],
      ["$\\beta_1 + \\boldsymbol{\\beta}_2^{\\top}\\mathbf{x}$", "$\\boldsymbol{\\beta}_2$ describes the control group’s outcome, not the effect."],
    ]),
  m(INT, "recall-effect-modification", 1, "“Effect modification”, or treatment-effect heterogeneity, in model $y = \\beta_0 + \\beta_1 z + \\boldsymbol{\\beta}_2^{\\top}\\mathbf{x} + \\boldsymbol{\\beta}_3^{\\top}\\mathbf{x}z + \\varepsilon$ means:",
    "$\\boldsymbol{\\beta}_3 \\ne \\mathbf{0}$: the effect of $z$ varies with $\\mathbf{x}$", [
      ["$\\boldsymbol{\\beta}_2 \\ne \\mathbf{0}$", "That says $\\mathbf{x}$ predicts the outcome, not that it changes the treatment effect."],
      ["$\\beta_1 \\ne 0$", "That is a non-zero effect at $\\mathbf{x} = \\mathbf{0}$, not heterogeneity."],
      ["$z$ and $\\mathbf{x}$ are correlated", "That is confounding or imbalance, a different issue."],
    ]),
  m(INT, "recall-oaxaca", 1, "The Blinder–Oaxaca decomposition splits:",
    "The gap in mean outcomes between two groups into an endowment part, a coefficient part and an interaction part", [
      ["Total variance into explained and residual parts", "That is the ANOVA decomposition behind $R^2$."],
      ["A coefficient into direct and indirect effects", "That is mediation analysis (Baron–Kenny)."],
      ["Prediction error into bias and variance", "That is the bias–variance decomposition."],
    ]),

  // level 2
  n(INT, "apply-cell-interaction", 2,
    "Two binary covariates with cell means $\\bar{y}_{00} = 10$, $\\bar{y}_{10} = 14$, $\\bar{y}_{01} = 12$ and $\\bar{y}_{11} = 20$ (first index $x_1$, second $x_2$). In the saturated OLS fit, what is $\\hat{\\beta}_{12}$?",
    4),
  n(INT, "apply-cell-main", 2,
    "Same cell means: $\\bar{y}_{00} = 10$, $\\bar{y}_{10} = 14$, $\\bar{y}_{01} = 12$ and $\\bar{y}_{11} = 20$. What is $\\hat{\\beta}_1$, the coefficient of $x_1$ in the saturated fit with the interaction?",
    4),
  n(INT, "apply-cate-value", 2,
    "With $\\hat{\\beta}_1 = 2$ and $\\hat{\\beta}_3 = 0.5$ in $y = \\beta_0 + \\beta_1 z + \\beta_2 x + \\beta_3 xz + \\varepsilon$, what is the estimated treatment effect at $x = 4$?",
    4),
  m(INT, "recall-chow", 2, "The Chow test of whether two groups share one regression line is:",
    "The $F$-test of $\\beta_1 = 0$ and $\\boldsymbol{\\beta}_3 = \\mathbf{0}$ in the pooled model with a group dummy and its interactions", [
      ["A $t$-test on the group dummy alone", "Identical lines need equal intercepts and equal slopes."],
      ["A test for serial correlation", "That is Durbin–Watson."],
      ["A test of $\\boldsymbol{\\beta}_3 = \\mathbf{0}$ alone", "That tests parallel lines, allowing different intercepts."],
    ]),

  // level 3
  n(INT, "apply-cell-x2", 3,
    "Same cell means: $\\bar{y}_{00} = 10$, $\\bar{y}_{10} = 14$, $\\bar{y}_{01} = 12$ and $\\bar{y}_{11} = 20$. What is $\\hat{\\beta}_2$?",
    2),
  n(INT, "apply-johnson-neyman-zero", 3,
    "The CATE $\\beta_1 + \\beta_3 x$ has estimates $\\hat{\\beta}_1 = -3$ and $\\hat{\\beta}_3 = 0.6$. At what value of $x$ is the estimated effect exactly zero?",
    5),
  m(INT, "recall-centering-invariance", 3, "Centring $x_1$ and $x_2$ before forming the product term changes:",
    "Only the main-effect coefficients (and the intercept); the interaction estimate and its standard error stay the same", [
      ["Every coefficient, including the interaction", "$\\partial^2\\mathbb{E}(y)/\\partial x_1\\partial x_2 = \\beta_{12}$ does not depend on the origin of either covariate."],
      ["Nothing at all", "The main effects change meaning: they become effects at the means instead of at zero."],
      ["Only the standard errors", "The point estimates of the main effects change too."],
    ]),
  m(INT, "recall-separate-fits", 3, "You fit separate OLS regressions in groups $z = 1$ and $z = 0$, and also the pooled regression of $y$ on $(1, z, \\mathbf{x}, z\\mathbf{x})$. The fitted values:",
    "Are identical for every unit", [
      ["Differ, because pooling borrows strength across groups", "The fully interacted model has a free intercept and slope per group, the same as two separate fits."],
      ["Agree only on average", "They agree unit by unit; so do the leverages."],
      ["Agree only if the groups have equal size", "The equivalence is algebraic and holds for any sizes."],
    ]),

  // level 4
  n(INT, "apply-average-partial-effect", 4,
    "In $\\text{read} = \\beta_0 + \\beta_1\\,\\text{math} + \\beta_2\\,\\text{socst} + \\beta_{12}\\,\\text{math}\\times\\text{socst}$, the fit gives $\\hat{\\beta}_1 = -0.1105$ and $\\hat{\\beta}_{12} = 0.01128$, and mean socst is $52.4$. The average partial effect of math is $\\hat{\\beta}_1 + \\hat{\\beta}_{12}\\overline{\\text{socst}}$. Compute it. Give $2$ decimal places.",
    0.48),
  n(INT, "apply-interaction-variance", 4,
    "With binary $x_1, x_2$, $\\text{Var}(\\hat{\\beta}_{12}) = \\sum_{\\text{cells}}\\sigma^2_{f_1f_2}/n_{f_1f_2}$. Every cell has variance $4$; the cell sizes are $100, 100, 100$ and $10$. Compute $\\text{Var}(\\hat{\\beta}_{12})$.",
    0.52),
  n(INT, "apply-oaxaca-endowment", 4,
    "Blinder–Oaxaca: the endowment component is $E = \\hat{\\boldsymbol{\\beta}}_2^{\\top}(\\bar{\\mathbf{x}}_1 - \\bar{\\mathbf{x}}_0)$. With control-group slopes $\\hat{\\boldsymbol{\\beta}}_2 = [0.08, 0.02]$ (years of education, years of experience) and mean differences $\\bar{\\mathbf{x}}_1 - \\bar{\\mathbf{x}}_0 = [2, 5]$, compute $E$.",
    0.26),
  m(INT, "apply-removable", 4, "The product term is highly significant when $y$ is regressed on $(x_1, x_2, x_1x_2)$ but not when $\\log y$ is. This shows:",
    "The interaction is removable: whether interaction is present depends on the scale of the outcome", [
      ["The log fit has lost power", "In the log fit the main effects are estimated very precisely; the product term is simply absent."],
      ["The data contain an outlier", "This pattern is what a multiplicative model $y = e^{a + b_1x_1 + b_2x_2}$ produces."],
      ["The covariates are collinear", "Collinearity would inflate standard errors on both scales."],
    ]),

  // level 5
  n(INT, "apply-oaxaca-coefficient", 5,
    "The coefficient component is $C = \\hat{\\boldsymbol{\\beta}}_3^{\\top}\\bar{\\mathbf{x}}_0 + \\hat{\\beta}_1$. With $\\hat{\\boldsymbol{\\beta}}_3 = [0.01, -0.005]$, $\\bar{\\mathbf{x}}_0 = [12, 10]$ and $\\hat{\\beta}_1 = -0.2$, compute $C$.",
    -0.13),
  n(INT, "apply-oaxaca-total", 5,
    "With the interaction component $I = \\hat{\\boldsymbol{\\beta}}_3^{\\top}(\\bar{\\mathbf{x}}_1 - \\bar{\\mathbf{x}}_0)$, where $\\hat{\\boldsymbol{\\beta}}_3 = [0.01, -0.005]$ and $\\bar{\\mathbf{x}}_1 - \\bar{\\mathbf{x}}_0 = [2, 5]$, and the components $E = 0.26$ and $C = -0.13$ found before, what is the total gap $E + C + I$ in mean log wage?",
    0.125),
  m(INT, "apply-pooled-from-separate", 5, "Separate fits give $\\hat{y} = \\hat{\\gamma}_1 + \\mathbf{x}^{\\top}\\hat{\\boldsymbol{\\beta}}_1$ (group 1) and $\\hat{\\gamma}_0 + \\mathbf{x}^{\\top}\\hat{\\boldsymbol{\\beta}}_0$ (group 0). In the pooled fit $\\hat{\\alpha}_0 + \\hat{\\alpha}_z z + \\mathbf{x}^{\\top}\\hat{\\boldsymbol{\\alpha}}_x + z\\mathbf{x}^{\\top}\\hat{\\boldsymbol{\\alpha}}_{zx}$:",
    "$\\hat{\\alpha}_0 = \\hat{\\gamma}_0$, $\\hat{\\alpha}_z = \\hat{\\gamma}_1 - \\hat{\\gamma}_0$, $\\hat{\\boldsymbol{\\alpha}}_x = \\hat{\\boldsymbol{\\beta}}_0$, $\\hat{\\boldsymbol{\\alpha}}_{zx} = \\hat{\\boldsymbol{\\beta}}_1 - \\hat{\\boldsymbol{\\beta}}_0$", [
      ["$\\hat{\\boldsymbol{\\alpha}}_x$ is the size-weighted average of $\\hat{\\boldsymbol{\\beta}}_1$ and $\\hat{\\boldsymbol{\\beta}}_0$", "With the interaction included, $\\hat{\\boldsymbol{\\alpha}}_x$ is the slope in the $z = 0$ group."],
      ["$\\hat{\\alpha}_z = \\hat{\\gamma}_1$", "$\\hat{\\alpha}_z$ is the difference in intercepts."],
      ["$\\hat{\\boldsymbol{\\alpha}}_{zx} = \\hat{\\boldsymbol{\\beta}}_1$", "The interaction is the difference in slopes."],
    ]),
  s(INT, "explain-low-power", 5,
    "Why do tests for interaction usually have much less power than tests for main effects, even in a large study?",
    "Uses $\\text{Var}(\\hat{\\beta}_{12}) = \\sum_{\\text{cells}}\\sigma^2_{f_1f_2}/n_{f_1f_2}$: the interaction is a contrast of all four cell means, so its variance is driven by the smallest cell.",
    "Adds that even with balanced cells the interaction contrast has several times the variance of a main-effect contrast, and interaction effects are typically smaller than main effects."),

  // level 6
  n(INT, "apply-power-ratio", 6,
    "A balanced $2 \\times 2$ design with $100$ units per cell and common variance $1$. Compare $\\text{Var}(\\hat{\\beta}_{12})$ with the variance of the main effect of $x_1$ averaged over $x_2$, $\\frac{1}{2}(\\bar{y}_{10} + \\bar{y}_{11}) - \\frac{1}{2}(\\bar{y}_{00} + \\bar{y}_{01})$. How many times larger is $\\text{Var}(\\hat{\\beta}_{12})$?",
    4),
  n(INT, "apply-chow-F", 6,
    "Chow test with $n = 60$ units and $3$ coefficients per group: the restricted pooled fit (one common line) has $\\text{RSS} = 150$; the two separate fits have total $\\text{RSS} = 120$. Compute $F = \\frac{(\\text{RSS}_R - \\text{RSS}_U)/3}{\\text{RSS}_U/(n - 6)}$.",
    4.5),
  m(INT, "apply-main-effect-meaning", 6, "In $y = \\beta_0 + \\beta_1 x_1 + \\beta_2 x_2 + \\beta_{12}x_1x_2 + \\varepsilon$ with uncentred continuous covariates, $\\beta_1$ is:",
    "The slope in $x_1$ when $x_2 = 0$, a value that may lie far outside the data", [
      ["The average effect of $x_1$ over the sample", "The average partial effect is $\\beta_1 + \\beta_{12}\\bar{x}_2$."],
      ["The effect of $x_1$ ignoring $x_2$", "That is the slope from a regression without $x_2$."],
      ["Meaningless and best ignored", "It has a precise meaning; centring moves the reference point to $\\bar{x}_2$."],
    ]),
  s(INT, "explain-average-partial-effect", 6,
    "Define the average partial effect of $x_1$ in $\\mathbb{E}(y \\mid x_1, x_2) = \\beta_0 + \\beta_1 x_1 + \\beta_2 x_2 + \\beta_{12}x_1x_2$, and explain why centring the covariates makes $\\beta_1$ equal to it.",
    "Defines it as $n^{-1}\\sum_i \\partial\\mathbb{E}(y_i \\mid \\cdot)/\\partial x_{i1} = \\beta_1 + \\beta_{12}\\bar{x}_2$.",
    "Notes that after centring $\\bar{x}_2 = 0$, so the coefficient of $x_1$ is the average partial effect, which explains why the main effects become significant again after centring."),

  // level 7
  n(INT, "apply-cate-se", 7,
    "The CATE $\\hat{\\beta}_1 + \\hat{\\beta}_3 x$ has variance $V_{11} + 2xV_{13} + x^2V_{33}$. With $V_{11} = 0.25$, $V_{13} = -0.05$ and $V_{33} = 0.04$, compute its standard error at $x = 2$. Give $4$ decimal places.",
    0.4583),
  n(INT, "apply-johnson-neyman-region", 7,
    "Johnson–Neyman: with $\\hat{\\beta}_1 = 1$, $\\hat{\\beta}_3 = -0.5$, $V_{11} = 0.04$, $V_{13} = 0$, $V_{33} = 0.0025$ and critical value $2$, the effect $\\hat{\\beta}_1 + \\hat{\\beta}_3 x$ is significant where $(\\hat{\\beta}_1 + \\hat{\\beta}_3 x)^2 > 4(V_{11} + x^2V_{33})$. The effect is significantly positive for $x$ below what boundary? Give $2$ decimal places.",
    1.17),
  m(INT, "apply-chow-small-group", 7, "In the Chow setting, group 1 has fewer units than coefficients, so its own regression cannot be fitted. Chow’s alternative test:",
    "Predicts group 1’s outcomes from group 0’s fit and runs an $F$-test on those prediction errors", [
      ["Drops group 1 and declares the lines equal", "That throws away the data the test is about."],
      ["Fits group 1 by ridge regression", "Chow’s test is exact under Normality and uses the group-0 fit only."],
      ["Uses the usual $F$-test anyway", "With $n_1 < p$, group 1’s RSS is zero and its coefficients are not identified."],
    ]),
  s(INT, "explain-interaction-invariance", 7,
    "Why does the coefficient of $x_1x_2$ keep the same estimate and standard error after the covariates are shifted, $x_j \\to x_j - c_j$, while the main effects change?",
    "Notes that $(x_1 - c_1)(x_2 - c_2) = x_1x_2 - c_2x_1 - c_1x_2 + c_1c_2$, so the new design is the old one times a non-singular matrix that leaves the product column’s coefficient alone.",
    "Interprets it: $\\beta_{12} = \\partial^2\\mathbb{E}(y)/\\partial x_1\\partial x_2$ does not depend on the origin, whereas $\\beta_1$ is the slope at $x_2 = 0$, which moves with $c_2$."),

  // level 8
  s(INT, "explain-removable", 8,
    "Explain how a significant interaction on the $y$ scale can disappear on the $\\log y$ scale, and when an interaction cannot be removed by any monotone transformation.",
    "Gives the mechanism: if $\\mathbb{E}(\\log y)$ is additive in $x_1$ and $x_2$, then $y$ is roughly multiplicative, $e^{a + b_1x_1 + b_2x_2}$, so effects on the raw scale grow with the other covariate and a product term appears.",
    "Explains that a qualitative (crossover) interaction, where the sign of one variable’s effect flips with the other, survives every monotone transformation, whereas a quantitative one may be a scale artefact."),
  n(INT, "apply-leverage-equivalence", 8,
    "A unit in group $0$ has leverage $0.3$ in the separate group-$0$ regression. What is its leverage in the pooled fully interacted regression of $y$ on $(1, z, \\mathbf{x}, z\\mathbf{x})$?",
    0.3),
  n(INT, "apply-chow-prediction-F", 8,
    "Chow’s prediction test with $n_1 = 2$ new units: the prediction errors $\\mathbf{d}$ give $\\mathbf{d}^{\\top}\\{I + X_1(X_0^{\\top}X_0)^{-1}X_1^{\\top}\\}^{-1}\\mathbf{d} = 9$, and group 0’s variance estimate is $\\hat{\\sigma}_0^2 = 1.5$. Compute $F = \\text{quadratic form}/(n_1\\hat{\\sigma}_0^2)$.",
    3),
  n(INT, "apply-three-way", 8,
    "Saturated OLS with three binary covariates. The three-way interaction coefficient is the alternating sum $\\sum_{a,b,c}(-1)^{3 - a - b - c}\\bar{y}_{abc}$. With cell means $\\bar{y}_{000} = 1$, $\\bar{y}_{100} = 3$, $\\bar{y}_{010} = 2$, $\\bar{y}_{001} = 4$, $\\bar{y}_{110} = 5$, $\\bar{y}_{101} = 6$, $\\bar{y}_{011} = 7$ and $\\bar{y}_{111} = 12$, compute it.",
    2),

  // level 9
  s(INT, "transfer-rct-centered", 9,
    "In a randomised experiment you regress $y$ on $(1, z, \\mathbf{x} - \\bar{\\mathbf{x}}, z(\\mathbf{x} - \\bar{\\mathbf{x}}))$. Why is the coefficient of $z$ an estimate of the average treatment effect, and why use the fully interacted model rather than adding $\\mathbf{x}$ alone?",
    "Explains that the CATE is $\\beta_1 + \\boldsymbol{\\beta}_3^{\\top}(\\mathbf{x} - \\bar{\\mathbf{x}})$, whose sample average is $\\beta_1$ because the centred covariates average to zero.",
    "Notes that the interacted model fits a separate line in each arm, which is what makes the adjustment robust: it cannot hurt asymptotic precision even if effects vary with $\\mathbf{x}$ (Lin 2013), and it should be paired with EHW standard errors."),
  n(INT, "apply-hc2-interaction", 9,
    "For a saturated $2 \\times 2$ fit, the HC2 variance of $\\hat{\\beta}_{12}$ is $\\sum_{\\text{cells}}\\hat{\\sigma}^2_{f_1f_2}/n_{f_1f_2}$ with the within-cell sample variances. The cells have variances $4, 9, 1, 16$ and sizes $50, 30, 20, 10$. Compute the robust standard error. Give $4$ decimal places.",
    1.4248),
  m(INT, "apply-logistic-interaction", 9, "In a logistic regression the product-term coefficient is exactly zero. On the probability scale, the effect of $x_1$:",
    "Can still differ across levels of $x_2$, because the logistic curve is nonlinear", [
      ["Is the same at every level of $x_2$", "No interaction on the log-odds scale does not mean none on the probability scale."],
      ["Is zero", "A zero product term says nothing about the main effect."],
      ["Equals the coefficient of $x_1$", "The coefficient is a log-odds ratio; probability effects depend on where on the curve you are."],
    ]),
  s(INT, "transfer-power-planning", 9,
    "A team powered its trial to detect a main effect of size $\\delta$ and now wants to test for an interaction of size $\\delta/2$ between treatment and a balanced binary covariate. Roughly how much larger a sample is needed, and why?",
    "Uses the factor of $4$: in a balanced $2 \\times 2$ design the interaction contrast has four times the variance of the main-effect contrast, so equal power for the same effect size needs about $4$ times the sample.",
    "Adds that halving the effect size multiplies the required sample by another $4$, about $16$ times in all, which is why interaction analyses are usually under-powered."),

  // level 10
  s(INT, "transfer-oaxaca-reference", 10,
    "The Blinder–Oaxaca decomposition $E + C + I$ uses group $0$’s coefficients as the reference. What changes if group $1$’s coefficients are used instead, and how should an analyst report the decomposition?",
    "Explains that with group 1 as the reference the endowment part becomes $\\boldsymbol{\\beta}_1^{\\top}(\\bar{\\mathbf{x}}_1 - \\bar{\\mathbf{x}}_0)$ and the parts are reallocated: the split is not unique (the index-number problem), though the total gap is unchanged.",
    "Recommends stating the reference explicitly, reporting standard errors for each part (they are linear in the OLS coefficients), and possibly showing pooled-coefficient versions too, while being careful that the coefficient part is not read causally as discrimination."),
  s(INT, "transfer-johnson-neyman-simultaneous", 10,
    "The Johnson–Neyman technique tests $\\beta_1 + \\beta_3 x = 0$ at every value of $x$ to find the region of non-significant effects. What multiple-testing problem does this raise, and how can the region be made simultaneously valid?",
    "Notes that testing at a continuum of $x$ values with pointwise $\\pm 1.96$ cut-offs inflates the chance of falsely declaring a significant effect somewhere.",
    "Proposes a simultaneous band: because $\\beta_1 + \\beta_3 x$ is a linear combination of two coefficients, use a Scheffé-type critical value $\\sqrt{2F_{2, n - p}(\\alpha)}$ (or a sup-$t$ bootstrap) in place of the pointwise one."),
  s(INT, "transfer-modifier-not-cause", 10,
    "A trial randomises treatment $z$; the OLS fit of $y$ on $(1, z, w, zw)$ shows a strong $z \\times w$ interaction, where $w$ is an observed but non-randomised covariate (say, income). A policymaker concludes that raising income would make the treatment work better. Assess the claim.",
    "Explains that the interaction describes effect heterogeneity across levels of $w$, which the randomisation of $z$ alone identifies, but not what would happen if $w$ were changed: $w$ was not randomised, so it may proxy for other characteristics that truly modify the effect.",
    "Distinguishes effect modification (a descriptive, conditional statement) from causal interaction (needs both factors manipulated, as in a factorial design), and suggests checking whether other covariates correlated with $w$ explain the heterogeneity."),
  m(INT, "transfer-spurious-interaction", 10, "Two correlated continuous covariates; the true mean is $\\beta_1 x_1 + \\beta_2 x_2 + \\gamma x_1^2$ with no interaction. Fitting $(x_1, x_2, x_1x_2)$ may still give a significant product term because:",
    "The omitted curvature $x_1^2$ is correlated with $x_1x_2$, so the product term absorbs the misspecification", [
      ["OLS is biased for every coefficient in small samples", "Under a correct model OLS is unbiased; the problem is the missing $x_1^2$."],
      ["Interaction tests always reject when covariates are correlated", "Correlation alone does not create a spurious interaction; a correct additive model would not."],
      ["The product term is a linear combination of $x_1$ and $x_2$", "It is not, and that is exactly why it can stand in for curvature."],
    ]),
];
