import type { Item } from "../../../lib/assessment/types";
import { chapter } from "./shared";

/**
 * Ding Parts VII–IX (Ch. 20, 23–27 and Appendices A–D) as they bear on the
 * existing generalised-model lessons: binary regression, the GLM unification,
 * sandwich covariances for misspecified GLMs, GEE and cluster-robust standard
 * errors, quantile regression, the Cox model, and the M-estimation and matrix
 * facts the book leans on. Ch. 21, Ch. 22 and the Kaplan–Meier half of Ch. 27
 * have their own lessons.
 */

const LR = "logistic-regression";
const PROB = "probit-regression";
const GLM = "glm";
const SW = "sandwich-estimator";
const GEE = "generalized-estimating-equations";
const QR = "quantile-regression";
const COX = "cox-proportional-hazards-model";
const UPD = "updating-and-sweep-operator";
const MEST = "m-estimators-regression";

// --- Ch. 20 · Logistic Regression for Binary Outcomes -------------------------------
const c20 = chapter("Ch. 20, Logistic Regression for Binary Outcomes");
const ch20: Item[] = [
  c20.n(LR, "ding-lpm-variance", 2,
    "Linear probability model: $\\Pr(y = 1 \\mid \\mathbf{x}) = \\mathbf{x}^{\\top}\\boldsymbol{\\beta} = 0.3$ for some unit. What is $\\text{Var}(y \\mid \\mathbf{x})$?",
    0.21),
  c20.m(LR, "ding-lpm-inference", 3, "Because $\\text{Var}(y \\mid \\mathbf{x}) = \\mathbf{x}^{\\top}\\boldsymbol{\\beta}(1 - \\mathbf{x}^{\\top}\\boldsymbol{\\beta})$, OLS inference in the linear probability model should use:",
    "EHW (heteroskedasticity-robust) standard errors", [
      ["Classical OLS standard errors", "The model itself implies heteroskedasticity, so $\\hat{\\sigma}^2(X^{\\top}X)^{-1}$ is wrong."],
      ["No standard errors, since OLS is invalid for binary outcomes", "The decomposition $y = \\mathbf{x}^{\\top}\\boldsymbol{\\beta} + \\varepsilon$ with $\\mathbb{E}(\\varepsilon \\mid \\mathbf{x}) = 0$ is legitimate; only the variance needs care."],
      ["Standard errors from a probit fit", "Mixing models does not fix the OLS covariance."],
    ]),
  c20.n(PROB, "ding-logit-probit-scale", 4,
    "The standard logistic distribution has variance $\\pi^2/3$, so logit coefficients are roughly $\\pi/\\sqrt{3}$ times probit coefficients. Convert a probit slope of $0.5$ to the approximate logit scale. Give $2$ decimal places.",
    0.91),
  c20.m(LR, "ding-case-control", 5, "Cases are sampled with probability $p_1$ and controls with probability $p_0$, whatever their covariates. Fit a logistic regression to the sample. Relative to the population logit model:",
    "The slopes are still consistent; only the intercept shifts, by $\\log(p_1/p_0)$", [
      ["Every coefficient is biased by the factor $p_1/p_0$", "Bayes’ rule moves the shift entirely into the intercept."],
      ["The model is no longer logistic", "Theorem 20.1: conditional on being sampled, the model is still logit."],
      ["The slopes are consistent for any link function", "Kagan showed that the logit is the only link with this property."],
    ]),
  c20.n(LR, "ding-case-control-intercept", 6,
    "The population logit intercept is $-5$. A case-control design samples cases with probability $p_1 = 0.5$ and controls with probability $p_0 = 0.005$. What intercept does the sample logistic fit converge to? Give $2$ decimal places.",
    -0.39),
  c20.n(PROB, "ding-cloglog-poisson", 6,
    "A latent count $y^{*} \\mid \\mathbf{x} \\sim \\text{Poisson}(e^{\\mathbf{x}^{\\top}\\boldsymbol{\\beta}})$ is recorded only as $y = \\mathbb{1}(y^{*} > 0)$, so $\\Pr(y = 1 \\mid \\mathbf{x}) = 1 - \\exp(-e^{\\mathbf{x}^{\\top}\\boldsymbol{\\beta}})$, the complementary log–log model. Evaluate it at $\\mathbf{x}^{\\top}\\boldsymbol{\\beta} = 0$. Give $4$ decimal places.",
    0.6321),
  c20.s(LR, "ding-link-matters", 6,
    "On one dataset the linear probability, probit, logit, cloglog and cauchit models give slopes $-0.10$, $-0.83$, $-1.47$, $-1.07$ and $-2.09$, yet their predicted classes are almost identical. Explain.",
    "Explains that each coefficient lives on its own scale (the latent error distributions differ in spread and shape), so the magnitudes are not comparable; only their signs agree.",
    "Notes that the fitted probabilities, the quantity the models share, are nearly the same, because the links differ mainly in the tails, so predictions and classifications barely change."),
  c20.m(LR, "ding-lda-implies-logit", 7, "If $y \\sim \\text{Bernoulli}(q)$ and $\\mathbf{x} \\mid y = k \\sim \\mathcal{N}(\\boldsymbol{\\mu}_k, \\Sigma)$ with a common $\\Sigma$, then $\\text{logit}\\,\\Pr(y = 1 \\mid \\mathbf{x})$ is linear in $\\mathbf{x}$ with slope:",
    "$\\Sigma^{-1}(\\boldsymbol{\\mu}_1 - \\boldsymbol{\\mu}_0)$", [
      ["$\\boldsymbol{\\mu}_1 - \\boldsymbol{\\mu}_0$", "The mean difference has to be rescaled by the precision $\\Sigma^{-1}$."],
      ["$\\Sigma(\\boldsymbol{\\mu}_1 - \\boldsymbol{\\mu}_0)$", "The quadratic forms produce $\\Sigma^{-1}$, not $\\Sigma$."],
      ["It is not linear; it is quadratic", "Quadratic terms appear only when the class covariances differ (QDA)."],
    ]),
];

// --- Ch. 23 · Generalized Linear Models ---------------------------------------------
const c23 = chapter("Ch. 23, Generalized Linear Models: A Unification");
const ch23: Item[] = [
  c23.m(GLM, "ding-exp-family-mean", 2, "For $f(y) = \\exp\\left\\{\\frac{y\\theta - b(\\theta)}{a(\\phi)} + c(y, \\phi)\\right\\}$, the mean of $y$ is:",
    "$b'(\\theta)$", [
      ["$b(\\theta)$", "The cumulant function’s first derivative, not the function itself, gives the mean."],
      ["$a(\\phi)b''(\\theta)$", "That is the variance."],
      ["$\\theta$", "$\\theta$ is the natural parameter; it equals the mean only for the Normal."],
    ]),
  c23.n(GLM, "ding-variance-function", 3,
    "For the Poisson, $b(\\theta) = e^{\\theta}$ and $a(\\phi) = 1$, so $\\text{Var}(y) = a(\\phi)b''(\\theta)$. What is the variance when $\\theta = \\log 3$?",
    3),
  c23.n(GLM, "ding-binary-regressor-poisson", 4,
    "Poisson regression of $y$ on $(1, z)$ with binary $z$. The groups have mean outcomes $\\bar{y}_1 = 6$ and $\\bar{y}_0 = 4$. The MLE of the coefficient of $z$ is $\\log\\bar{y}_1 - \\log\\bar{y}_0$. Give $4$ decimal places.",
    0.4055),
  c23.n(GLM, "ding-binary-regressor-logit", 5,
    "Logistic regression of $y$ on $(1, z)$ with binary $z$. The groups have success proportions $\\bar{y}_1 = 0.5$ and $\\bar{y}_0 = 0.2$. The MLE of the coefficient of $z$ is $\\text{logit}(\\bar{y}_1) - \\text{logit}(\\bar{y}_0)$. Give $4$ decimal places.",
    1.3863),
  c23.s(GLM, "ding-gamma-log-ols", 8,
    "Under a Gamma regression with log link and common shape $\\nu$, Ding shows $\\mathbb{E}(\\log y \\mid \\mathbf{x}) = \\psi(\\nu) - \\log\\nu + \\mathbf{x}^{\\top}\\boldsymbol{\\beta}$ and $\\text{Var}(\\log y \\mid \\mathbf{x}) = \\psi'(\\nu)$. What does this imply for OLS of $\\log y$ on $\\mathbf{x}$?",
    "Concludes that $\\log y$ follows a homoskedastic linear model, so OLS of $\\log y$ on $\\mathbf{x}$ (with an intercept) estimates every slope in $\\boldsymbol{\\beta}$ consistently.",
    "Notes that only the intercept is shifted, by $\\psi(\\nu) - \\log\\nu$, and that OLS is a valid if less efficient alternative to the Gamma MLE."),
];

// --- Ch. 24 · Misspecified GLMs and the sandwich ------------------------------------
const c24 = chapter("Ch. 24, Misspecified Generalized Linear Models: Restricted Mean Models and Sandwich Covariance Matrix");
const ch24: Item[] = [
  c24.m(SW, "ding-poisson-restricted-mean", 5, "Counts are overdispersed, but $\\mathbb{E}(y \\mid \\mathbf{x}) = e^{\\mathbf{x}^{\\top}\\boldsymbol{\\beta}}$ is correctly specified. The Poisson MLE:",
    "Is still consistent for $\\boldsymbol{\\beta}$; use the sandwich covariance for inference", [
      ["Is inconsistent because the variance is wrong", "The Poisson score has mean zero whenever the conditional mean is right."],
      ["Is consistent, and its model-based standard errors are fine", "The model-based standard errors assume $\\text{Var} = \\text{mean}$ and are too small under overdispersion."],
      ["Must be replaced by OLS", "OLS targets the best linear approximation, a different parameter."],
    ]),
  c24.m(SW, "ding-binary-mean-determines", 6, "Why is there no “restricted mean” version of logistic regression analogous to quasi-Poisson?",
    "For a binary outcome the conditional mean determines the whole conditional distribution, so a correct mean model is a correct model", [
      ["Because logistic regression has no variance parameter to estimate", "True, but the reason is that $\\Pr(y = 1 \\mid \\mathbf{x})$ pins down the Bernoulli distribution."],
      ["Because the logit link is not invertible", "The logit link is invertible."],
      ["There is one: quasi-binomial fixes everything", "A dispersion factor cannot rescue a misspecified mean, and with a correct mean there is nothing left to fix for independent binary data."],
    ]),
  c24.s(SW, "ding-sandwich-limits", 8,
    "Freedman (2006) criticised reaching for robust standard errors whenever a GLM may be misspecified. What is his point, and when are sandwich standard errors genuinely helpful?",
    "Explains that sandwich standard errors fix the variance only; if the conditional mean is misspecified, the MLE converges to a pseudo-true parameter that may have no useful interpretation, so the uncertainty is correct for the wrong target.",
    "States that they are useful when the mean model is right but the variance or distribution is wrong (overdispersion, heteroskedasticity), so the mean specification still has to be checked."),
];

// --- Ch. 25 · GEE and cluster-robust standard errors --------------------------------
const c25 = chapter("Ch. 25, Generalized Estimating Equation for Correlated Multivariate Data");
const ch25: Item[] = [
  c25.m(GEE, "ding-pooled-ols-point", 2, "In a linear marginal model with the independence working covariance, the GEE point estimate equals:",
    "Pooled OLS over all $N$ observations", [
      ["The average of separate per-cluster OLS fits", "GEE with independence pools every observation into one estimating equation."],
      ["GLS with an estimated exchangeable covariance", "That uses an exchangeable working covariance, not independence."],
      ["The between-cluster regression of cluster means", "That discards within-cluster variation."],
    ]),
  c25.m(GEE, "ding-cluster-meat", 4, "Compare the Liang–Zeger cluster-robust covariance with the EHW covariance for pooled OLS:",
    "Same bread $(X^{\\top}X)^{-1}$; the meat sums $(X_i^{\\top}\\hat{\\boldsymbol{\\varepsilon}}_i)(X_i^{\\top}\\hat{\\boldsymbol{\\varepsilon}}_i)^{\\top}$ over clusters instead of $\\hat{\\varepsilon}_{it}^2\\mathbf{x}_{it}\\mathbf{x}_{it}^{\\top}$ over observations", [
      ["Different bread, same meat", "The point estimate, and hence the bread, is identical; only the meat changes."],
      ["They are always equal", "They differ by the within-cluster cross-products $\\hat{\\varepsilon}_{it}\\hat{\\varepsilon}_{is}\\mathbf{x}_{it}\\mathbf{x}_{is}^{\\top}$."],
      ["Cluster-robust is always smaller", "With positive within-cluster correlation it is usually much larger."],
    ]),
  c25.m(GEE, "ding-independent-working", 6, "Why is the independence working covariance often defended even when outcomes within a cluster are correlated?",
    "It needs only the marginal mean $\\mathbb{E}(y_{it} \\mid \\mathbf{x}_{it})$ to be right (Pepe and Anderson), at some cost in efficiency", [
      ["It is always the most efficient choice", "A correct non-independence working covariance can be more efficient."],
      ["It makes the cluster-robust standard error unnecessary", "Independence is a working assumption; the sandwich is still needed."],
      ["It removes the need for a correct mean model", "GEE consistency always rests on the mean model."],
    ]),
  c25.n(GEE, "ding-cluster-se-binary", 7,
    "Pooled OLS of $y_{it}$ on $(1, x_i)$ with a cluster-level binary $x_i$. The cluster-robust variance of the slope is $\\sum_{x_i = 1} R_i^2/N_1^2 + \\sum_{x_i = 0} R_i^2/N_0^2$, where $R_i$ sums cluster $i$’s residuals about its group mean. Treated clusters have $R_i = 3, -1, -2$ with $N_1 = 12$ observations in all; control clusters have $R_i = 2, -2$ with $N_0 = 8$. Compute the cluster-robust standard error. Give $4$ decimal places.",
    0.4714),
  c25.s(GEE, "ding-few-clusters", 7,
    "Why can confidence intervals based on cluster-robust standard errors under-cover when there are few clusters, even if each cluster is large?",
    "Explains that each cluster contributes one independent term to the meat, so the effective sample size is the number of clusters; with few of them the meat is badly estimated and the Normal approximation is poor.",
    "Mentions a remedy or consequence: small-sample corrections, $t$ critical values with $G - 1$ degrees of freedom, the wild cluster bootstrap, or design-based alternatives."),
  c25.m(GEE, "ding-dynamics-assumption", 8, "GEE with a non-independence working covariance needs $\\mathbb{E}(y_{it} \\mid X_i) = \\mathbb{E}(y_{it} \\mid \\mathbf{x}_{it})$. This fails when:",
    "Lagged covariates affect the outcome, or past outcomes feed back into future covariates", [
      ["The covariates are time-invariant", "Then $X_i$ carries nothing beyond $\\mathbf{x}_{it}$, so the condition holds automatically."],
      ["The outcomes are binary", "The condition is about the dynamics, not the outcome type."],
      ["Clusters have different sizes", "Unbalanced clusters do not violate it."],
    ]),
];

// --- Ch. 26 · Quantile Regression -----------------------------------------------------
const c26 = chapter("Ch. 26, Quantile Regression");
const ch26: Item[] = [
  c26.n(QR, "ding-check-loss", 2,
    "The check loss is $\\rho_\\tau(u) = u\\{\\tau - \\mathbb{1}(u < 0)\\}$. Evaluate it at $\\tau = 0.9$ and $u = -2$.",
    0.2),
  c26.m(QR, "ding-laplace-mle", 3, "If $y_i = \\mathbf{x}_i^{\\top}\\boldsymbol{\\beta} + \\varepsilon_i$ with IID Laplace errors, the MLE of $\\boldsymbol{\\beta}$ is:",
    "Least absolute deviations (median regression)", [
      ["OLS", "OLS is the MLE under Normal errors; the Laplace log-density is $-|\\varepsilon|$."],
      ["Quantile regression at $\\tau = 0.25$", "The Laplace density is symmetric, so the median, $\\tau = 0.5$, is the right quantile."],
      ["Ridge regression", "Ridge comes from a Normal prior on $\\boldsymbol{\\beta}$, not from the error law."],
    ]),
  c26.m(QR, "ding-bvn-parallel", 5, "If $(x, y)$ is bivariate Normal, the conditional quantile functions $Q_\\tau(y \\mid x)$ are:",
    "Linear in $x$, with the same slope for every $\\tau$", [
      ["Linear with slopes increasing in $\\tau$", "The conditional variance does not depend on $x$, so the lines are parallel."],
      ["Nonlinear except at the median", "Every conditional quantile is $\\mu_{y|x} + \\sigma_{y|x}z_\\tau$, linear in $x$."],
      ["Constant in $x$", "They share the slope of the conditional mean, which is non-zero unless $\\rho = 0$."],
    ]),
  c26.n(QR, "ding-binary-qr", 6,
    "Median regression of $y$ on $(1, x)$ with binary $x$: $y \\mid x = 1 \\sim \\text{Exponential}(1)$ and $y \\mid x = 0 \\sim \\text{Exponential}(2)$ (rates). The population slope is the difference in group medians. Compute it. Give $4$ decimal places.",
    0.3466),
  c26.s(QR, "ding-qr-heterogeneity", 7,
    "In Ding’s U.S. wage-structure example, quantile regressions of log wage on education at several $\\tau$ give different slopes. What does that reveal that OLS cannot?",
    "Explains that slopes varying with $\\tau$ mean education shifts the spread and shape of the conditional wage distribution, not just its location (heteroskedasticity or changing inequality).",
    "Contrasts this with OLS, which reports only the effect on the conditional mean; for example, larger returns at upper quantiles point to widening within-education inequality."),
];

// --- Ch. 27 · Cox model ----------------------------------------------------------------
const c27 = chapter("Ch. 27, Modeling Time-to-Event Outcomes");
const ch27: Item[] = [
  c27.n(COX, "ding-logrank-term", 4,
    "Log-rank score with a binary treatment $x$. At a failure time with $r_k = 20$ units at risk, $r_{k1} = 8$ of them treated, the failure is a treated unit. Its score contribution is $x_k - r_{k1}/r_k$. Compute it.",
    0.6),
  c27.m(COX, "ding-logrank-score", 6, "The log-rank test comparing two survival curves is (apart from the handling of ties):",
    "The score test of $b = 0$ in a Cox model with a binary treatment indicator", [
      ["The likelihood-ratio test from an exponential model", "The log-rank test is nonparametric about the baseline hazard."],
      ["A Wald test on Kaplan–Meier medians", "It compares observed with expected failures at each event time."],
      ["A $t$-test on the observed times", "Censoring makes a $t$-test on raw times invalid."],
    ]),
  c27.m(COX, "ding-ph-invariance", 7, "If $T \\mid \\mathbf{x}$ follows a proportional hazards model, then for a strictly increasing $g$, $g(T) \\mid \\mathbf{x}$:",
    "Also follows a proportional hazards model with the same coefficients; only the baseline hazard changes", [
      ["Follows PH only if $g$ is linear", "The hazard ratio survives any strictly increasing time change."],
      ["Follows an accelerated failure time model instead", "AFT and PH coincide only for the Weibull."],
      ["Has coefficients rescaled by $g'$", "The Jacobian enters the baseline hazard, which cancels from the ratio."],
    ]),
  c27.s(COX, "ding-hernan-critique", 8,
    "Hernán (2010) argues that hazard ratios are hard to interpret causally even in a randomised trial. Explain the argument and what he recommends instead.",
    "Explains that the hazard at time $t$ conditions on surviving to $t$, and if treatment works, the treated and control survivors at $t$ differ in their mix of frailty, so the hazard ratio compares non-comparable groups despite randomisation at baseline.",
    "Recommends comparing survival functions directly (for example survival at a fixed time or restricted mean survival), which keep the randomised comparison."),
];

// --- Appendices A–D -----------------------------------------------------------------
const cA = chapter("App. A, Linear Algebra");
const cD = chapter("App. D, M-Estimation and MLE");
const appendices: Item[] = [
  cA.n(UPD, "ding-determinant-lemma", 4,
    "The matrix determinant lemma: $\\det(A + \\mathbf{u}\\mathbf{v}^{\\top}) = \\det(A)(1 + \\mathbf{v}^{\\top}A^{-1}\\mathbf{u})$. Compute $\\det(I_3 + \\mathbf{u}\\mathbf{u}^{\\top})$ for $\\mathbf{u} = [1, 1, 1]$.",
    4),
  cA.n(UPD, "ding-sherman-morrison", 5,
    "Sherman–Morrison: $(A + \\mathbf{u}\\mathbf{v}^{\\top})^{-1} = A^{-1} - \\frac{A^{-1}\\mathbf{u}\\mathbf{v}^{\\top}A^{-1}}{1 + \\mathbf{v}^{\\top}A^{-1}\\mathbf{u}}$. For $A = I_2$ and $\\mathbf{u} = \\mathbf{v} = [1, 1]$, what is the $(1, 1)$ entry of $(A + \\mathbf{u}\\mathbf{v}^{\\top})^{-1}$? Give $4$ decimal places.",
    0.6667),
  cD.m(MEST, "ding-m-sandwich", 4, "An M-estimator solves $\\sum_i \\boldsymbol{\\psi}(\\mathbf{w}_i, \\boldsymbol{\\theta}) = \\mathbf{0}$. Its asymptotic covariance is:",
    "$B^{-1}MB^{-\\top}/n$, with $B = -\\mathbb{E}\\,\\partial\\boldsymbol{\\psi}/\\partial\\boldsymbol{\\theta}^{\\top}$ and $M = \\mathbb{E}\\,\\boldsymbol{\\psi}\\boldsymbol{\\psi}^{\\top}$", [
      ["$M^{-1}/n$", "That is the inverse-information form, valid only when the information identity $B = M$ holds (a correct likelihood)."],
      ["$B^{-1}/n$", "The bread alone ignores the variability of the estimating function."],
      ["$BMB^{\\top}/n$", "The bread enters inverted."],
    ]),
  cD.s(MEST, "ding-misspecified-exponential", 8,
    "You fit an $\\text{Exponential}(\\lambda)$ model by maximum likelihood to IID positive data that are not exponential. What does $\\hat{\\lambda} = 1/\\bar{y}$ estimate, and which standard error should you report?",
    "Explains that the score equation $\\sum_i(1/\\lambda - y_i) = 0$ still has the pseudo-true solution $\\lambda^{*} = 1/\\mathbb{E}(y)$, so $\\hat{\\lambda}$ consistently estimates the reciprocal mean.",
    "Explains that the model-based standard error $\\hat{\\lambda}/\\sqrt{n}$ assumes $\\text{Var}(y) = \\mathbb{E}(y)^2$, whereas the sandwich (or delta-method) standard error $\\hat{\\lambda}^2 s_y/\\sqrt{n}$ uses the sample variance and stays valid."),
];

export const dingGlmBeyondItems: Item[] = [...ch20, ...ch23, ...ch24, ...ch25, ...ch26, ...ch27, ...appendices];
