import type { Item } from "../../../lib/assessment/types";
import { chapter } from "./shared";

/**
 * New lesson from Ding Ch. 27, Modeling Time-to-Event Outcomes (§27.1–27.4,
 * §27.5.4 and §27.7), 40 items at levels 1–10: survival and hazard functions,
 * censoring, the Kaplan–Meier curve with Greenwood's formula, and the log-rank
 * test. The Cox-model half of the chapter extends the existing Cox lesson.
 */

const KM = "kaplan-meier-estimator";
const { m, n, s } = chapter("Ch. 27, Modeling Time-to-Event Outcomes");

export const dingSurvivalItems: Item[] = [
  // level 1
  m(KM, "recall-survival-function", 1, "The survival function of a time to event $T$ is:",
    "$S(t) = \\Pr(T > t)$", [
      ["$S(t) = \\Pr(T \\le t)$", "That is the CDF $F(t) = 1 - S(t)$."],
      ["$S(t) = f(t)/F(t)$", "Ratios of density to CDF are not the survival function; the hazard is $f(t)/S(t)$."],
      ["$S(t) = \\mathbb{E}(T \\mid T > t)$", "That is a conditional mean, not a probability."],
    ]),
  m(KM, "recall-hazard", 1, "The hazard function $\\lambda(t)$ is:",
    "$\\lim_{\\Delta t \\to 0}\\Pr(t \\le T < t + \\Delta t \\mid T \\ge t)/\\Delta t$, the instantaneous event rate among those still at risk", [
      ["The probability of the event before $t$", "That is $F(t)$."],
      ["The density $f(t)$", "The hazard divides the density by $S(t)$, conditioning on survival to $t$."],
      ["The expected remaining lifetime", "That is the mean residual life."],
    ]),
  m(KM, "recall-censoring", 1, "With right censoring at time $C$, what is observed for each unit?",
    "$y = \\min(T, C)$ and the event indicator $\\delta = \\mathbb{1}(T \\le C)$", [
      ["$T$ and $C$ separately", "Once the unit is censored, $T$ is never seen."],
      ["$\\max(T, C)$", "Follow-up stops at whichever comes first."],
      ["Only units with $\\delta = 1$", "Censored units are kept; they contribute time at risk."],
    ]),
  m(KM, "recall-product-limit", 1, "The Kaplan–Meier estimator is also called the:",
    "Product-limit estimator, $\\hat{S}(t) = \\prod_{k: t_k \\le t}(1 - d_k/r_k)$", [
      ["Life-table mean", "It estimates a whole survival curve, not a mean."],
      ["Nelson–Aalen estimator", "Nelson–Aalen estimates the cumulative hazard $\\sum d_k/r_k$."],
      ["Partial likelihood", "That is Cox’s method for regression coefficients."],
    ]),

  // level 2
  n(KM, "apply-exponential-survival", 2,
    "For $T \\sim \\text{Exponential}(\\lambda)$, $S(t) = e^{-\\lambda t}$. Compute $S(5)$ for $\\lambda = 0.1$. Give $4$ decimal places.",
    0.6065),
  n(KM, "apply-mean-area", 2,
    "$\\mathbb{E}(T) = \\int_0^\\infty S(t)\\,dt$ for a non-negative $T$. What is $\\mathbb{E}(T)$ for $T \\sim \\text{Exponential}(\\lambda = 0.25)$?",
    4),
  n(KM, "apply-km-one-step", 2,
    "At the first event time, $20$ patients are at risk and $2$ die. What is the Kaplan–Meier estimate just after that time?",
    0.9),
  n(KM, "apply-exponential-hazard", 2,
    "What is the hazard of an $\\text{Exponential}(0.3)$ time at $t = 7$?",
    0.3),

  // level 3
  n(KM, "apply-km-three-steps", 3,
    "Event times with (number at risk, deaths): $(10, 1)$, $(8, 2)$, $(5, 1)$. Compute $\\hat{S}(t)$ after the third event time.",
    0.54),
  n(KM, "apply-weibull-hazard", 3,
    "A $\\text{Weibull}(a, b)$ time has hazard $\\lambda(t) = \\frac{a}{b}\\left(\\frac{t}{b}\\right)^{a - 1}$. Compute $\\lambda(3)$ for shape $a = 2$ and scale $b = 1$.",
    6),
  m(KM, "apply-weibull-shape", 3, "A Weibull time with shape $a < 1$ has a hazard that is:",
    "Decreasing in $t$", [
      ["Increasing in $t$", "That is the case $a > 1$, such as wear-out."],
      ["Constant", "That is $a = 1$, the exponential."],
      ["First rising then falling", "That shape occurs for the log-Normal, not the Weibull."],
    ]),
  n(KM, "apply-discrete-survival", 3,
    "A discrete $T$ has masses $0.1, 0.05, 0.15, 0.2, 0.3, 0.2$ at $t = 1, \\dots, 6$. Compute $S(3) = \\Pr(T > 3)$.",
    0.7),

  // level 4
  n(KM, "apply-greenwood", 4,
    "Greenwood’s formula: $\\widehat{\\text{Var}}\\{\\log\\hat{S}(t)\\} = \\sum_{t_k \\le t} \\frac{d_k}{r_k(r_k - d_k)}$. For event times with (at risk, deaths) $(10, 1)$, $(8, 2)$, $(5, 1)$, compute it after the third time. Give $4$ decimal places.",
    0.1028),
  n(KM, "apply-discrete-hazard", 4,
    "Same discrete distribution (masses $0.1, 0.05, 0.15, 0.2, 0.3, 0.2$ at $1, \\dots, 6$). The discrete hazard at $t = 3$ is $f(3)/S(3^{-})$, where $S(3^{-}) = \\Pr(T \\ge 3)$. Give $4$ decimal places.",
    0.1765),
  n(KM, "apply-discrete-mean", 4,
    "For the same distribution, compute $\\mathbb{E}(T) = \\sum_{t \\ge 1}\\Pr(T \\ge t)$.",
    4.15),
  m(KM, "apply-loglog-ci", 4, "Why are Kaplan–Meier confidence intervals usually built on the $\\log\\{-\\log S(t)\\}$ scale rather than the $\\log S(t)$ scale?",
    "The log–log transform maps $(0, 1)$ onto the whole real line, so the back-transformed interval stays inside $[0, 1]$", [
      ["Greenwood’s formula is only valid on the log–log scale", "Greenwood’s formula is for $\\log\\hat{S}$; the log–log variance follows from it by the delta method."],
      ["It always gives narrower intervals", "Its advantage is respecting the range, not width."],
      ["The log scale is undefined for survival probabilities", "$\\log S$ is defined but can give upper limits above $1$."],
    ]),

  // level 5
  n(KM, "apply-km-censored", 5,
    "Six patients with times $2, 3^{+}, 4, 4, 6^{+}, 7$ (a $^{+}$ marks censoring). Compute the Kaplan–Meier estimate $\\hat{S}(5)$. Give $4$ decimal places.",
    0.4167),
  n(KM, "apply-min-exponentials", 5,
    "A patient faces two independent exponential risks with rates $0.2$ and $0.3$ per year. The time to the first event is exponential with the summed rate. What is its mean, in years?",
    2),
  m(KM, "apply-noninformative", 5, "The Kaplan–Meier curve is consistent for the survival function of $T$ when:",
    "Censoring is non-informative: the censoring time $C$ is independent of $T$", [
      ["There is no censoring after the median", "The pattern of censoring times matters less than its independence of $T$."],
      ["$T$ is exponential", "Kaplan–Meier is nonparametric and needs no distributional form."],
      ["Fewer than half the units are censored", "The amount of censoring affects precision, not validity."],
    ]),
  s(KM, "explain-naive-bias", 5,
    "Why does it bias the estimated survival curve to drop censored patients, or to treat censoring times as deaths?",
    "Explains that dropping censored patients removes people known to have survived at least to their censoring time, removing long survivors and biasing $S(t)$ downward; treating censoring as death biases it down too.",
    "Explains that Kaplan–Meier instead keeps each censored patient in the risk set until they leave, so they count in the denominators $r_k$ for exactly the time they were observed."),

  // level 6
  n(KM, "apply-logrank-score", 6,
    "Log-rank test, treatment $x \\in \\lbrace 0, 1 \\rbrace$. Three event times: (i) $10$ at risk, $5$ treated, the death is treated; (ii) $8$ at risk, $4$ treated, the death is control; (iii) $6$ at risk, $2$ treated, the death is treated. The score is $\\sum_k(x_k - r_{k1}/r_k)$. Give $4$ decimal places.",
    0.6667),
  n(KM, "apply-logrank-z", 6,
    "For the same three event times, the null variance is $\\sum_k (r_{k1}/r_k)(1 - r_{k1}/r_k)$. Compute the standardised log-rank statistic, score divided by the square root of the variance. Give $2$ decimal places.",
    0.78),
  m(KM, "apply-logrank-cox", 6, "In Ding’s derivation, the log-rank statistic arises as:",
    "The score test of $b = 0$ in a Cox model with a binary treatment indicator", [
      ["A likelihood-ratio test between two exponential fits", "It needs no parametric model for the baseline hazard."],
      ["A comparison of the two Kaplan–Meier medians", "It sums observed minus expected events over every event time."],
      ["A chi-square test on a $2 \\times 2$ table of final status", "That ignores the timing of events."],
    ]),
  s(KM, "explain-identifiability", 6,
    "With independent continuous $T$ and $C$, show that the hazard of $T$ is identified from the observable $(y, \\delta)$ with $y = \\min(T, C)$.",
    "Writes $\\Pr(y \\in [t, t + dt), \\delta = 1) = \\Pr(T \\in [t, t + dt), C \\ge t) = f_T(t)S_C(t)\\,dt$ and $\\Pr(y \\ge t) = S_T(t)S_C(t)$, using independence.",
    "Divides to get $\\lambda_T(t) = \\Pr(y = t, \\delta = 1)/\\Pr(y \\ge t)$, in which the unknown censoring distribution cancels, so the hazard, and hence $S_T$, is recoverable."),

  // level 7
  n(KM, "apply-loglog-se", 7,
    "With $\\hat{S}(t) = 0.54$ and Greenwood variance $\\widehat{\\text{Var}}\\{\\log\\hat{S}(t)\\} = 0.102778$, the delta method gives $\\widehat{\\text{Var}}[\\log\\{-\\log\\hat{S}(t)\\}] = \\widehat{\\text{Var}}\\{\\log\\hat{S}(t)\\}/\\{\\log\\hat{S}(t)\\}^2$. Compute the standard error on the log–log scale. Give $4$ decimal places.",
    0.5203),
  n(KM, "apply-memoryless", 7,
    "For $T \\sim \\text{Exponential}(0.2)$, compute $\\Pr(T > 10 \\mid T > 4)$. Give $4$ decimal places.",
    0.3012),
  m(KM, "apply-crossing-curves", 7, "Two treatment arms’ Kaplan–Meier curves cross partway through follow-up. This suggests:",
    "The proportional hazards assumption is doubtful, so a single hazard ratio summarises the comparison poorly", [
      ["The log-rank test is the most powerful choice", "Early and late differences of opposite sign cancel in the log-rank sum."],
      ["Censoring must be informative", "Crossing curves are about the hazards, not censoring."],
      ["The arms have the same survival", "Crossing means each arm is ahead at different times."],
    ]),
  s(KM, "explain-hernan", 7,
    "Explain Hernán’s critique of hazard ratios in a randomised trial, and the summary measures he recommends.",
    "Explains that the hazard at $t$ conditions on survival to $t$; if treatment is effective, the surviving treated and control patients differ (selection by survival), so the hazard ratio at $t$ is not a randomised comparison even though baseline assignment was.",
    "Recommends comparing survival functions directly, such as survival probabilities at fixed times, differences in restricted mean survival, or whole Kaplan–Meier curves."),

  // level 8
  s(KM, "explain-greenwood-derivation", 8,
    "Derive Greenwood’s formula heuristically with the delta method.",
    "Treats $\\hat{\\lambda}_k = d_k/r_k$ as a Binomial proportion with variance $\\lambda_k(1 - \\lambda_k)/r_k$, and linearises $\\log\\hat{S}(t) = \\sum_{t_k \\le t}\\log(1 - \\hat{\\lambda}_k)$ so that each term has variance $(1 - \\lambda_k)^{-2}\\text{Var}(\\hat{\\lambda}_k)$.",
    "Plugs in estimates and sums, treating the terms as independent: $\\sum_k \\frac{\\hat{\\lambda}_k}{r_k(1 - \\hat{\\lambda}_k)} = \\sum_k \\frac{d_k}{r_k(r_k - d_k)}$, and notes that counting-process theory justifies this despite the dependence."),
  n(KM, "apply-hazard-from-survival", 8,
    "A time to event has $S(t) = \\exp(-t^2)$. Using $\\lambda(t) = -\\frac{d}{dt}\\log S(t)$, compute $\\lambda(1.5)$.",
    3),
  n(KM, "apply-rmst", 8,
    "For the six patients with times $2, 3^{+}, 4, 4, 6^{+}, 7$, the Kaplan–Meier curve is $1$ on $[0, 2)$, $5/6$ on $[2, 4)$ and $5/12$ on $[4, 7)$. Compute the restricted mean survival time up to $\\tau = 5$, $\\int_0^5 \\hat{S}(t)\\,dt$. Give $4$ decimal places.",
    4.0833),
  m(KM, "apply-weibull-both", 8, "Writing $T = bZ^{1/a}$ with $Z \\sim \\text{Exponential}(1)$, so $\\log T = \\log b + a^{-1}\\log Z$, shows that a Weibull regression with $\\log b = \\mathbf{x}^{\\top}\\boldsymbol{\\gamma}$ is:",
    "Both an accelerated failure time model and a proportional hazards model", [
      ["Only an accelerated failure time model", "Its hazard $\\frac{a}{b}(t/b)^{a-1}$ factors into a function of $t$ times $b^{-a}$, so it is also PH."],
      ["Only a proportional hazards model", "$\\log T$ is linear in $\\mathbf{x}$ plus a fixed error, which is the AFT form."],
      ["Neither", "The Weibull is the classic family that is both."],
    ]),

  // level 9
  s(KM, "transfer-km-no-censoring", 9,
    "Show that with no censoring, the Kaplan–Meier estimator equals the empirical survival function $n^{-1}\\sum_i \\mathbb{1}(T_i > t)$.",
    "Notes that with no censoring the risk set shrinks only by deaths, so $r_{k+1} = r_k - d_k$, with $r_1 = n$.",
    "Shows that the product telescopes: $\\prod_{t_k \\le t}\\frac{r_k - d_k}{r_k} = \\frac{r_{K'} - d_{K'}}{n}$, the fraction still alive after $t$, which is the empirical survival function."),
  n(KM, "apply-identified-hazard", 9,
    "From observed data, $\\Pr(y \\in [t, t + dt), \\delta = 1) \\approx 0.05\\,dt$ (an observed-event density of $0.05$) and $\\Pr(y \\ge t) = 0.25$. Under independent censoring, what is the hazard of $T$ at $t$?",
    0.2),
  s(KM, "transfer-competing-risks", 9,
    "In a study of time to cancer relapse, some patients die of heart disease first, and the analyst censors those deaths. Why is that problematic, and what should be reported instead?",
    "Explains that death from another cause is not independent censoring (those patients can never relapse), so $1 - \\text{KM}$ estimates relapse risk in a hypothetical world without competing deaths and overstates the real cumulative incidence.",
    "Recommends a competing-risks analysis: cumulative incidence functions (Aalen–Johansen), cause-specific hazards, or a Fine–Gray model, depending on the question."),
  m(KM, "apply-stratified-cox", 9, "A stratified Cox model with strata defined by study centre:",
    "Lets each centre have its own baseline hazard while sharing the coefficients $\\boldsymbol{\\beta}$", [
      ["Fits a separate $\\boldsymbol{\\beta}$ in each centre", "That is fitting separate models; stratification shares $\\boldsymbol{\\beta}$."],
      ["Adds centre dummies to the linear predictor", "Dummies assume proportional hazards across centres; strata do not."],
      ["Estimates the centre effects as hazard ratios", "Centre effects are absorbed into the baseline hazards and not estimated."],
    ]),

  // level 10
  s(KM, "transfer-crossing-summary", 10,
    "Two arms’ survival curves cross at $18$ months, and the log-rank test is non-significant. The sponsor wants to conclude “no difference”. What would you do, and why?",
    "Explains that crossing curves violate proportional hazards and the log-rank test can lose power when early and late differences cancel, so non-significance is not evidence of no difference.",
    "Proposes pre-specified alternatives that answer clinically meaningful questions: differences in restricted mean survival time up to a horizon, landmark survival probabilities, or weighted log-rank tests, and reports the curves themselves."),
  n(KM, "apply-weibull-mean", 10,
    "A $\\text{Weibull}(a, b)$ time has mean $b\\,\\Gamma(1 + 1/a)$. Compute the mean for shape $a = 2$ and scale $b = 2$. Give $4$ decimal places.",
    1.7725),
  s(KM, "transfer-rank-invariance", 10,
    "If $T \\mid \\mathbf{x}$ follows a proportional hazards model, so does $g(T) \\mid \\mathbf{x}$ for any strictly increasing $g$. Explain why, and connect this to the fact that the Kaplan–Meier ordering, the log-rank test and Cox’s partial likelihood use only the ranks of the event times.",
    "Shows that $S_{g(T)}(u \\mid \\mathbf{x}) = S_T(g^{-1}(u) \\mid \\mathbf{x}) = S_0(g^{-1}(u))^{\\exp(\\mathbf{x}^{\\top}\\boldsymbol{\\beta})}$, again of PH form with the same $\\boldsymbol{\\beta}$ and a new baseline.",
    "Concludes that $\\boldsymbol{\\beta}$ cannot depend on the time scale, so inference should depend only on which units are at risk when each event happens, which is exactly what the risk sets in the partial likelihood and the log-rank test use."),
  m(KM, "transfer-not-identifiable", 10, "Follow-up ends for everyone at $\\tau = 5$ years, and $\\hat{S}(5) = 0.4$. Which quantity cannot be estimated without extra assumptions?",
    "The mean survival time $\\mathbb{E}(T)$", [
      ["$S(3)$", "Times before $\\tau$ are fully covered by the risk sets."],
      ["The restricted mean survival time up to $5$ years", "It integrates $\\hat{S}$ over $[0, 5]$, which is observed."],
      ["The median survival time", "Here $\\hat{S}(5) = 0.4 < 0.5$, so the median is reached within follow-up."],
    ]),
];
