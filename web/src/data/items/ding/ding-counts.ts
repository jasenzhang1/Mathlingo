import type { Item } from "../../../lib/assessment/types";
import { chapter } from "./shared";

/**
 * New lesson from Ding Ch. 22, Regression Models for Count Outcomes (40 items,
 * levels 1–10): overdispersion, Negative-Binomial regression as a
 * Poisson–Gamma mixture, and zero-inflated Poisson and Negative-Binomial
 * regressions.
 */

const CNT = "count-regression-overdispersion";
const { m, n, s } = chapter("Ch. 22, Regression Models for Count Outcomes");

export const dingCountsItems: Item[] = [
  // level 1
  m(CNT, "recall-poisson-equidispersion", 1, "A Poisson random variable with mean $\\lambda$ has variance:",
    "$\\lambda$", [
      ["$\\lambda^2$", "Variance equal to the squared mean describes, for example, the exponential distribution, not the Poisson."],
      ["$\\sqrt{\\lambda}$", "That is the Poisson’s standard deviation."],
      ["A free parameter", "The Poisson has one parameter; its variance is tied to the mean."],
    ]),
  m(CNT, "recall-nb-mixture", 1, "Ding defines the Negative-Binomial $\\text{NB}(\\mu, \\theta)$ as:",
    "A Poisson whose rate is itself Gamma-distributed with mean $\\mu$", [
      ["The number of trials until the first success", "That is the geometric distribution."],
      ["A Poisson truncated at zero", "Truncation removes zeros; the NB arises from a random rate."],
      ["A Binomial with a negative number of trials", "The name has a combinatorial origin, but Ding’s definition is the Poisson–Gamma mixture."],
    ]),
  m(CNT, "recall-zip", 1, "A zero-inflated Poisson random variable is:",
    "A mixture of a point mass at $0$ (probability $p$) and a $\\text{Poisson}(\\lambda)$ (probability $1 - p$)", [
      ["A Poisson with every zero removed", "That is a zero-truncated Poisson."],
      ["A Poisson with a larger mean", "Inflating zeros lowers the mean to $(1 - p)\\lambda$."],
      ["A Negative-Binomial", "The NB has extra zeros through overdispersion, but it is not a two-component mixture with a point mass."],
    ]),
  m(CNT, "recall-overdispersion", 1, "Count data are overdispersed when:",
    "Their variance exceeds their mean", [
      ["They contain many zeros", "Excess zeros are one possible cause, but the definition compares variance with mean."],
      ["Their mean exceeds their variance", "That is underdispersion."],
      ["They are not integers", "Counts are integers by definition."],
    ]),

  // level 2
  n(CNT, "apply-nb-variance", 2,
    "For $y \\sim \\text{NB}(\\mu, \\theta)$, $\\text{Var}(y) = \\mu + \\mu^2/\\theta$. Compute it for $\\mu = 4$ and $\\theta = 2$.",
    12),
  n(CNT, "apply-zip-mean", 2,
    "A zero-inflated Poisson with $p = 0.3$ and $\\lambda = 5$ has mean $(1 - p)\\lambda$. Compute it.",
    3.5),
  n(CNT, "apply-zip-zero", 2,
    "A zero-inflated Poisson with $p = 0.2$ and $\\lambda = 2$. Compute $\\Pr(y = 0) = p + (1 - p)e^{-\\lambda}$. Give $4$ decimal places.",
    0.3083),
  n(CNT, "apply-rate-ratio", 2,
    "In a Poisson or Negative-Binomial regression with log link, a coefficient of $0.3$ multiplies the expected count by $e^{0.3}$ per unit of the covariate. Compute that factor. Give $4$ decimal places.",
    1.3499),

  // level 3
  n(CNT, "apply-zip-variance", 3,
    "A zero-inflated Poisson has $\\text{Var}(y) = \\lambda(1 - p)(1 + p\\lambda)$. Compute it for $p = 0.3$ and $\\lambda = 5$.",
    8.75),
  n(CNT, "apply-nb-zero", 3,
    "For $\\text{NB}(\\mu, \\theta)$, $\\Pr(y = 0) = \\left(\\frac{\\theta}{\\mu + \\theta}\\right)^{\\theta}$. Compute it for $\\mu = 2$ and $\\theta = 1$. Give $4$ decimal places.",
    0.3333),
  n(CNT, "apply-poisson-zero", 3,
    "For comparison, a Poisson with the same mean $2$ has $\\Pr(y = 0) = e^{-2}$. Give $4$ decimal places.",
    0.1353),
  m(CNT, "apply-nb-limit", 3, "As the dispersion parameter $\\theta \\to \\infty$, $\\text{NB}(\\mu, \\theta)$:",
    "Tends to $\\text{Poisson}(\\mu)$, because the Gamma rate collapses to a point mass at $\\mu$", [
      ["Tends to a point mass at $\\mu$", "The rate becomes fixed, but the count is still Poisson around it."],
      ["Becomes more overdispersed", "The extra variance $\\mu^2/\\theta$ goes to zero."],
      ["Tends to a Normal", "Only if $\\mu$ also grows; for fixed $\\mu$ the limit is Poisson."],
    ]),

  // level 4
  n(CNT, "apply-zinb-mean", 4,
    "A zero-inflated Negative-Binomial with $p = 0.25$ and $\\mu = 4$ has mean $(1 - p)\\mu$. Compute it.",
    3),
  n(CNT, "apply-zinb-variance", 4,
    "The zero-inflated Negative-Binomial has $\\text{Var}(y) = (1 - p)\\mu(1 + \\mu/\\theta + p\\mu)$. Compute it for $p = 0.25$, $\\mu = 4$ and $\\theta = 2$.",
    12),
  n(CNT, "apply-le-cam", 4,
    "Le Cam’s theorem bounds the total-variation-type distance between a sum of independent Bernoulli($p_i$) variables and $\\text{Poisson}(\\sum p_i)$ by $2\\sum p_i^2$. For $n = 100$ trials, each with $p_i = 0.02$, compute the bound.",
    0.08),
  m(CNT, "apply-nb-score", 4, "The Negative-Binomial score for $\\boldsymbol{\\beta}$ is $\\sum_i (1 + \\mu_i/\\theta)^{-1}(y_i - \\mu_i)\\mathbf{x}_i$. Compared with the Poisson score, it:",
    "Down-weights units with large fitted means, since their counts are noisier", [
      ["Up-weights units with large fitted means", "The weight $(1 + \\mu_i/\\theta)^{-1}$ falls as $\\mu_i$ grows."],
      ["Is identical", "They coincide only as $\\theta \\to \\infty$."],
      ["Ignores the fitted means", "The residual $y_i - \\mu_i$ is still the core of each term."],
    ]),

  // level 5
  n(CNT, "apply-poisson-tail", 5,
    "A fitted Poisson regression gives $\\hat{\\mu}_i = 2$ for a unit. Predict $\\Pr(y_i \\ge 3) = 1 - e^{-\\hat{\\mu}}(1 + \\hat{\\mu} + \\hat{\\mu}^2/2)$. Give $4$ decimal places.",
    0.3233),
  m(CNT, "apply-nb-orthogonal", 5, "In Negative-Binomial regression the expected cross-derivative $\\mathbb{E}\\{\\partial^2\\log L/\\partial\\boldsymbol{\\beta}\\,\\partial\\theta \\mid X\\} = \\mathbf{0}$. This means:",
    "The Fisher information is block diagonal, so $\\hat{\\boldsymbol{\\beta}}$ and $\\hat{\\theta}$ are asymptotically independent", [
      ["$\\theta$ cannot be estimated", "$\\theta$ has its own non-zero information block."],
      ["$\\hat{\\boldsymbol{\\beta}}$ equals the Poisson MLE", "Orthogonality concerns the joint asymptotics, not equality of estimates."],
      ["The MLE has no closed form", "True, but that is not what orthogonality says."],
    ]),
  n(CNT, "apply-zip-dispersion-index", 5,
    "For a zero-inflated Poisson, the dispersion index $\\text{Var}(y)/\\mathbb{E}(y)$ equals $1 + p\\lambda$. Compute it for $p = 0.1$ and $\\lambda = 4$.",
    1.4),
  s(CNT, "explain-log-ols-counts", 5,
    "Why is OLS of $\\log(y_i + 1)$ on $\\mathbf{x}_i$ an unsatisfying model for count outcomes, even though it avoids negative predictions?",
    "Notes that the $+1$ shift is arbitrary, that coefficients describe a transformed mean rather than $\\mathbb{E}(y \\mid \\mathbf{x})$, and that back-transforming is biased.",
    "Notes that it does not model the count distribution, so it cannot predict probabilities such as $\\Pr(y = 0 \\mid \\mathbf{x})$ or $\\Pr(y > 3 \\mid \\mathbf{x})$, which Poisson or NB regressions give directly."),

  // level 6
  n(CNT, "apply-expected-zeros", 6,
    "A Poisson model with mean $2$ is fitted to $500$ gym members’ weekly visits. How many members does it expect to make zero visits, $500e^{-2}$? Give $1$ decimal place.",
    67.7),
  n(CNT, "apply-nb-moments-theta", 6,
    "Counts have sample mean $3$ and sample variance $7.5$. Match the NB variance $\\mu + \\mu^2/\\theta$ to estimate $\\theta$ by moments.",
    2),
  m(CNT, "apply-poisson-vs-nb-coefs", 6, "Data are overdispersed but $\\mathbb{E}(y \\mid \\mathbf{x}) = e^{\\mathbf{x}^{\\top}\\boldsymbol{\\beta}}$ is correct. Comparing Poisson and NB regressions:",
    "Both estimate $\\boldsymbol{\\beta}$ consistently, but the Poisson model-based standard errors are too small", [
      ["Only the NB estimates are consistent", "The Poisson score has mean zero whenever the mean is right."],
      ["The Poisson standard errors are too large", "Ignoring overdispersion understates the variance."],
      ["They must give identical estimates", "Different weights give different finite-sample estimates."],
    ]),
  s(CNT, "explain-poisson-limit", 6,
    "Why is the Poisson a natural first model for counts such as traffic accidents in an area over a month?",
    "Cites the law of rare events (Le Cam’s theorem): a count summing many independent opportunities, each with a small probability, is approximately Poisson with mean $\\sum p_i$.",
    "Adds the caveat that heterogeneity in rates across units or time, and dependence between events, break the approximation and produce overdispersion."),

  // level 7
  n(CNT, "apply-irls-working-response", 7,
    "Poisson IRLS uses the working response $z_i = \\eta_i + (y_i - \\mu_i)/\\mu_i$ with $\\eta_i = \\log\\mu_i$. Compute $z_i$ for $\\mu_i = 2$ and $y_i = 5$. Give $4$ decimal places.",
    2.1931),
  n(CNT, "apply-poisson-split", 7,
    "Independent $y_1 \\sim \\text{Poisson}(2)$ and $y_2 \\sim \\text{Poisson}(3)$. Given $y_1 + y_2 = 10$, $y_1$ is $\\text{Binomial}(10, 2/5)$. What is $\\mathbb{E}(y_1 \\mid y_1 + y_2 = 10)$?",
    4),
  m(CNT, "apply-poisson-mean-matching", 7, "A Poisson regression includes an intercept. At the MLE:",
    "The fitted means sum to the observed total: $\\sum_i \\hat{\\mu}_i = \\sum_i y_i$", [
      ["The residuals $y_i - \\hat{\\mu}_i$ are all zero", "Only their sum, weighted by the intercept column, must vanish."],
      ["The fitted means all equal $\\bar{y}$", "That holds only when there are no other covariates."],
      ["$\\sum_i \\log\\hat{\\mu}_i = \\sum_i \\log y_i$", "The score equations match raw sums, not log sums (and $\\log 0$ is undefined)."],
    ]),
  s(CNT, "explain-cloglog-latent", 7,
    "Suppose $y_i^{*} \\mid \\mathbf{x}_i \\sim \\text{Poisson}(e^{\\mathbf{x}_i^{\\top}\\boldsymbol{\\beta}})$ is unobserved and you record only $y_i = \\mathbb{1}(y_i^{*} > 0)$. Which binary model results, and how should its coefficients be read?",
    "Derives $\\Pr(y_i = 1 \\mid \\mathbf{x}_i) = 1 - \\exp(-e^{\\mathbf{x}_i^{\\top}\\boldsymbol{\\beta}})$, the complementary log–log model.",
    "Interprets $\\boldsymbol{\\beta}$ as log rate ratios of the underlying event count, the same parameters as the latent Poisson regression, so a cloglog fit recovers them from presence/absence data."),

  // level 8
  s(CNT, "explain-zip-regression", 8,
    "In zero-inflated Poisson regression, $p_i = \\text{expit}(\\mathbf{x}_i^{\\top}\\boldsymbol{\\gamma})$ and $\\lambda_i = e^{\\mathbf{x}_i^{\\top}\\boldsymbol{\\beta}}$. How do you interpret $\\boldsymbol{\\gamma}$ and $\\boldsymbol{\\beta}$, and how does a covariate affect $\\mathbb{E}(y_i \\mid \\mathbf{x}_i)$?",
    "Explains that $\\boldsymbol{\\gamma}$ governs the odds of being a structural zero (never at risk) and $\\boldsymbol{\\beta}$ the log rate among those at risk.",
    "Notes that $\\mathbb{E}(y_i \\mid \\mathbf{x}_i) = (1 - p_i)\\lambda_i$, so a covariate in both parts changes the mean through both, possibly in opposite directions, and its overall effect is not a single coefficient."),
  n(CNT, "apply-zip-prediction", 8,
    "A ZIP regression gives $\\mathbf{x}^{\\top}\\hat{\\boldsymbol{\\gamma}} = 0$ for the zero part and $\\mathbf{x}^{\\top}\\hat{\\boldsymbol{\\beta}} = \\log 3$ for the count part. Predict $\\mathbb{E}(y \\mid \\mathbf{x})$.",
    1.5),
  n(CNT, "apply-delta-se", 8,
    "A fitted log-linear count model predicts $\\hat{\\mu} = e^{\\mathbf{x}^{\\top}\\hat{\\boldsymbol{\\beta}}} = 5$ with $\\text{Var}(\\mathbf{x}^{\\top}\\hat{\\boldsymbol{\\beta}}) = 0.04$. Using the delta method, approximate the standard error of $\\hat{\\mu}$.",
    1),
  m(CNT, "apply-gym-ses", 8, "In Ding’s gym-attendance case study, weekly visits have variance far above their mean. Which standard errors for the incentive effects deserve the most trust?",
    "NB model-based ones, or sandwich standard errors for any of the fits", [
      ["Poisson model-based ones, because the Poisson is the canonical count model", "They assume variance equals the mean and are badly understated here."],
      ["Classical OLS ones", "Counts with variance tied to the mean are heteroskedastic, so classical OLS errors are unreliable too."],
      ["Whichever are smallest", "Choosing standard errors by size is data snooping."],
    ]),

  // level 9
  s(CNT, "transfer-zeros-vs-overdispersion", 9,
    "Your counts have many zeros. How would you decide between a plain Negative-Binomial and a zero-inflated model?",
    "Recognises that overdispersion alone also produces extra zeros, so a high zero share does not by itself call for zero inflation; compare the zeros each fitted model predicts with those observed.",
    "Uses formal or substantive criteria: AIC/BIC or a Vuong-type test between non-nested fits, and whether a structural-zero group is plausible (units never at risk), preferring the simpler NB when it already captures the zeros."),
  n(CNT, "apply-zip-likelihood", 9,
    "ZIP likelihood contributions are $p + (1 - p)e^{-\\lambda}$ for $y = 0$ and $(1 - p)e^{-\\lambda}\\lambda^y/y!$ for $y \\ge 1$. With $p = 0.2$ and $\\lambda = 1$, compute the contribution of an observation $y = 2$. Give $4$ decimal places.",
    0.1472),
  m(CNT, "apply-underdispersion", 9, "Counts show variance well below the mean (underdispersion). Which modelling choice can accommodate this?",
    "A quasi-Poisson fit with estimated dispersion below $1$, or a distribution that allows underdispersion such as the COM-Poisson", [
      ["Negative-Binomial regression", "Its variance $\\mu + \\mu^2/\\theta$ always exceeds the mean."],
      ["Zero-inflated Poisson", "Zero inflation only adds variance."],
      ["Ordinary Poisson regression with model-based standard errors", "Those would overstate the uncertainty."],
    ]),
  s(CNT, "transfer-exposure-offset", 9,
    "Units are observed for different lengths of time (some members for $4$ weeks, others for $52$). How should a count regression account for this, and what does the offset do to the coefficients’ interpretation?",
    "Includes $\\log(\\text{exposure}_i)$ as an offset, a covariate with coefficient fixed at $1$, so $\\mathbb{E}(y_i \\mid \\mathbf{x}_i) = \\text{exposure}_i\\,e^{\\mathbf{x}_i^{\\top}\\boldsymbol{\\beta}}$.",
    "Explains that $\\boldsymbol{\\beta}$ then describes log rate ratios per unit of exposure (for example, visits per week), comparable across units observed for different lengths of time."),

  // level 10
  s(CNT, "transfer-linear-vs-count", 10,
    "In a randomised experiment on gym visits, when might you prefer OLS with EHW standard errors over Poisson or NB regression to estimate the treatment effect?",
    "Notes that OLS of $y$ on the treatment estimates the difference in mean visits, the average treatment effect on the natural scale, with no distributional assumption, and EHW standard errors stay valid under heteroskedasticity.",
    "Contrasts this with count models, whose coefficients are rate ratios that depend on the model, while noting that count models give distributional predictions (zeros, tails) and can be more efficient; in Ding’s case study the models agree in sign and rough magnitude."),
  n(CNT, "apply-gamma-mixing-variance", 10,
    "In the NB construction $y \\mid \\lambda \\sim \\text{Poisson}(\\lambda)$ with $\\lambda \\sim \\text{Gamma}(\\theta, \\text{rate} = \\theta/\\mu)$, find $\\text{Var}(\\lambda)$ for $\\mu = 4$ and $\\theta = 2$; then confirm, via the law of total variance, that $\\text{Var}(y) = \\mu + \\text{Var}(\\lambda)$. Report $\\text{Var}(\\lambda)$.",
    8),
  s(CNT, "transfer-parking-tickets", 10,
    "Fisman and Miguel modelled diplomats’ unpaid parking tickets with an NB regression; a replication argued for a zero-inflated NB. Many diplomats from some countries had zero tickets. Lay out how you would adjudicate between the two, and why the choice matters for the substantive conclusion.",
    "Frames the question as whether some zeros are structural (diplomats who never drive or are never ticketed) versus sampling zeros from a high-dispersion NB, comparing predicted with observed zeros, AIC/BIC or Vuong tests, and the plausibility of a never-at-risk group.",
    "Explains why it matters: in ZINB a covariate can act on being at risk, on the rate, or both, so the effect of a variable such as home-country corruption may be attributed differently; checking the robustness of the sign and size of the key coefficient across specifications is essential."),
  m(CNT, "transfer-poisson-multinomial", 10, "Independent $y_k \\sim \\text{Poisson}(\\lambda_k)$ for $k = 1, \\dots, K$. Conditional on the total $\\sum_k y_k = n$:",
    "$(y_1, \\dots, y_K)$ is $\\text{Multinomial}(n; \\lambda_1/\\lambda, \\dots, \\lambda_K/\\lambda)$ with $\\lambda = \\sum_k \\lambda_k$, which is why Poisson log-linear models and multinomial logits share their slopes", [
      ["The counts remain independent Poissons", "Fixing the total induces negative dependence among the counts."],
      ["Each count is $\\text{Poisson}(n\\lambda_k/\\lambda)$", "Conditionally each count is Binomial, bounded by $n$."],
      ["The counts are uniform over compositions of $n$", "The probabilities are proportional to the $\\lambda_k$, not equal."],
    ]),
];
