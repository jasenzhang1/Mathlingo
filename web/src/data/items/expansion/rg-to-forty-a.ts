import type { Item } from "../../../lib/assessment/types";
import { makeBuilders } from "../authoring";
import { EXPANSION } from "./source";

/**
 * Linear Models to 40: odds, logistic and probit regression, GLMs, Poisson
 * regression, deviance residuals, Cox models, GEE and mixed models.
 */
const { mcq, short, num } = makeBuilders(EXPANSION);

const s = (concept: string, slug: string, level: number, stem: string, a: string, b: string) =>
  short({ concept, slug, cognitive: level >= 8.5 ? "transfer" : "explain", level, seconds: level >= 9 ? 300 : 180, stem },
    [["main", a, 5, true], ["detail", b, 4, true]]);
const n = (concept: string, slug: string, level: number, stem: string, key: number, tol = 0.01) =>
  num({ concept, slug, cognitive: "apply", level, seconds: level >= 7 ? 90 : level >= 4 ? 60 : 30, stem }, key, tol);
const m = (concept: string, slug: string, level: number, stem: string, right: string, wrong: [string, string][]) =>
  mcq({ concept, slug, cognitive: level <= 3 ? "recall" : "apply", level, seconds: 25, stem },
    right, wrong.map(([t, why], i) => [t, `${concept}-${slug}-${i}`, why] as [string, string, string]));

const OD = "odds-and-log-odds";
const LR = "logistic-regression";
const OR = "odds-ratio";
const PR = "probit-regression";
const GL = "glm";
const PO = "poisson-regression";
const DR = "deviance-residuals";
const CX = "cox-proportional-hazards-model";
const GE = "generalized-estimating-equations";
const MX = "mixed-effect-models";

export const rgToFortyAItems: Item[] = [
  // --- odds-and-log-odds -------------------------------------------------
  m(OD, "f40-gt1", 1, "Odds greater than $1$ mean the event's probability is:", "Greater than $1/2$",
    [["Greater than $1$", "Probabilities never exceed $1$."], ["Less than $1/2$", "That's odds below $1$."], ["Exactly $1/2$", "That's odds of exactly $1$."]]),
  n(OD, "f40-quarter", 2, "What are the odds of an event with probability $0.25$ (to $4$ decimals)?", 0.3333, 0.002),
  n(OD, "f40-from-odds", 2.5, "The odds of an event are $0.25$. What is its probability?", 0.2, 0.001),
  m(OD, "f40-double", 3, "The odds of an event double from $1$ to $2$. Its probability goes from:", "$0.5$ to about $0.667$",
    [["$0.5$ to $1$", "Doubling odds doesn't double probability."], ["$0.25$ to $0.5$", "Odds $1$ is probability $0.5$."], ["$0.5$ to $0.75$", "Odds $2$ is probability $2/3$."]]),
  n(OD, "f40-logit2", 3.5, "The log odds is $2$. What is the probability (to $4$ decimals)?", 0.8808, 0.002),
  n(OD, "f40-step", 4, "Starting at $p = 0.5$, the log odds increases by $0.5$. What is the new probability (to $4$ decimals)?", 0.6225, 0.002),
  n(OD, "f40-both", 5, "Independent events $A$ and $B$ have odds $2$ and $3$. What are the odds that both happen?", 1, 0.001),
  n(OD, "f40-tail", 6, "What is $\\operatorname{logit}(0.999) - \\operatorname{logit}(0.99)$ (to $3$ decimals)?", 2.312, 0.002),
  s(OD, "f40-bayes", 7.5, "Explain why Bayes' rule becomes additive on the log-odds scale, and why that makes log odds convenient for combining evidence.",
    "Posterior odds $=$ prior odds $\\times$ likelihood ratio, so posterior log odds $=$ prior log odds $+ \\log$ likelihood ratio.",
    "Independent pieces of evidence each add their own log likelihood ratio, so evidence accumulates by addition — the idea behind naive Bayes and logistic regression's linear predictor."),
  s(OD, "f40-jensen", 9, "A population has two equal-sized groups with probabilities $0.1$ and $0.9$. Compare the average of the group log odds with the log odds of the average probability, and explain the consequence for modelling.",
    "The group log odds are $-\\ln 9$ and $\\ln 9$, averaging $0$; the average probability is $0.5$, also log odds $0$ here — but in general the logit of an average is not the average of logits (logit is nonlinear).",
    "So effects averaged on the log-odds scale (conditional, subject-specific) differ from effects on the population-averaged probability scale — the reason mixed-model and GEE logistic coefficients differ."),

  // --- logistic-regression -----------------------------------------------
  m(LR, "f40-dist", 1, "In logistic regression, the response for each observation follows a:", "Bernoulli (or binomial) distribution",
    [["Normal distribution", "That's linear regression."], ["Poisson distribution", "That's for counts."], ["Uniform distribution", "No."]]),
  n(LR, "f40-half", 2, "$\\operatorname{logit}p = -2 + 0.5x$. What is the predicted probability at $x = 4$?", 0.5, 0.001),
  n(LR, "f40-boundary", 3, "$\\operatorname{logit}p = -3 + x$. At what $x$ is the predicted probability $0.5$?", 3, 0.001),
  n(LR, "f40-predict", 4, "$\\operatorname{logit}p = -1 + 0.8x$. What is the predicted probability at $x = 3$ (to $4$ decimals)?", 0.8022, 0.002),
  m(LR, "f40-loglik", 4.5, "The logistic regression log-likelihood is:", "$\\sum_i\\big[y_i\\log p_i + (1 - y_i)\\log(1 - p_i)\\big]$",
    [["$-\\sum_i (y_i - p_i)^2$", "That's least squares."], ["$\\sum_i y_i\\log p_i$ only", "Failures contribute too."], ["$\\sum_i \\log p_i$", "Ignores the outcomes."]]),
  n(LR, "f40-score", 5, "For a logistic model fitted by maximum likelihood with an intercept, what is $\\sum_i (y_i - \\hat{p}_i)$?", 0, 0.001),
  n(LR, "f40-se", 6, "An intercept-only logistic model on $n = 100$ observations gives $\\hat{p} = 0.2$. Its information is $np(1 - p)$. What is the standard error of $\\hat{\\beta}_0$?", 0.25, 0.001),
  m(LR, "f40-casecontrol", 6.5, "Fitting logistic regression to case–control data (sampled on the outcome) gives:", "Consistent slope estimates; only the intercept is distorted",
    [["Biased slopes", "Slopes (log odds ratios) are preserved."], ["A biased everything", "Only the intercept shifts."], ["An unidentifiable model", "It's identifiable."]]),
  s(LR, "f40-gradient", 7.5, "Derive the gradient of the logistic log-likelihood with respect to $\\beta$.",
    "With $p_i = \\sigma(x_i^\\top\\beta)$ and $\\sigma' = \\sigma(1 - \\sigma)$, each term $y_i\\log p_i + (1 - y_i)\\log(1 - p_i)$ has derivative $(y_i - p_i)x_i$.",
    "So $\\nabla\\ell = X^\\top(y - p)$: setting it to zero makes residuals orthogonal to every predictor; there's no closed form, so IRLS or Newton is used."),
  s(LR, "f40-multinomial", 8.5, "How does logistic regression extend to an outcome with $K > 2$ unordered categories?",
    "Multinomial logit: model $K - 1$ log odds against a baseline, $\\log(p_k/p_K) = x^\\top\\beta_k$, equivalently $p_k = e^{x^\\top\\beta_k}/\\sum_j e^{x^\\top\\beta_j}$ (softmax).",
    "Each $\\beta_k$ is a log odds ratio relative to the baseline; the model assumes independence of irrelevant alternatives, and ordered outcomes use cumulative-logit models instead."),

  // --- odds-ratio --------------------------------------------------------
  m(OR, "f40-gt1", 1.5, "An odds ratio greater than $1$ for an exposure means:", "The exposed group has higher odds of the outcome",
    [["The exposure causes the outcome", "Association, not necessarily causation."], ["The risk is more than doubled", "Only if OR $> 2$ and the outcome is rare."], ["The exposed group has lower odds", "That's OR $< 1$."]]),
  n(OR, "f40-simple", 2, "The odds are $0.5$ in group A and $0.25$ in group B. What is the odds ratio (A vs. B)?", 2, 0.001),
  n(OR, "f40-table", 3, "A $2 \\times 2$ table has $a = 40$, $b = 60$, $c = 20$, $d = 80$. What is $\\text{OR} = ad/(bc)$ (to $4$ decimals)?", 2.6667, 0.002),
  n(OR, "f40-risk-low", 4, "Baseline risk is $0.1$ and the odds ratio is $2$. What is the risk in the exposed group (to $4$ decimals)?", 0.1818, 0.002),
  n(OR, "f40-risk-high", 4.5, "Baseline risk is $0.5$ and the odds ratio is $2$. What is the risk in the exposed group (to $4$ decimals)?", 0.6667, 0.002),
  m(OR, "f40-log-predictor", 5, "A logistic model uses $\\ln(\\text{age})$ with coefficient $\\beta$. Doubling age multiplies the odds by:", "$2^\\beta$",
    [["$e^{2\\beta}$", "That's a $2$-unit change in $\\ln(\\text{age})$."], ["$2\\beta$", "Effects multiply odds."], ["$e^\\beta$", "That's multiplying age by $e$."]]),
  n(OR, "f40-double-age", 5.5, "That coefficient is $\\beta = 0.6$. What is the odds ratio for doubling age (to $4$ decimals)?", 1.5157, 0.002),
  n(OR, "f40-pool", 6.5, "Two studies report log odds ratios $0.4$ (SE $0.2$) and $0.8$ (SE $0.4$). What is the inverse-variance pooled log odds ratio?", 0.48, 0.001),
  s(OR, "f40-symmetry", 7.5, "Show that the odds ratio of disease given exposure equals the odds ratio of exposure given disease.",
    "From the $2 \\times 2$ table, the disease odds ratio is $\\frac{a/b}{c/d} = \\frac{ad}{bc}$ (rows: exposed, unexposed).",
    "The exposure odds ratio is $\\frac{a/c}{b/d} = \\frac{ad}{bc}$ — identical, which is why case–control studies sampling on disease still estimate the disease odds ratio."),
  s(OR, "f40-simpson", 9, "Two strata each have an odds ratio of exactly $2$ for an exposure, yet the pooled table gives a different odds ratio. Give two distinct reasons this can happen.",
    "Confounding: if the stratifying variable is associated with both exposure and outcome, pooling mixes groups with different baseline risks (Simpson's paradox).",
    "Non-collapsibility: even without confounding (stratum independent of exposure), the marginal odds ratio is pulled towards $1$ when baseline risks differ, because odds ratios don't average linearly."),

  // --- probit-regression -------------------------------------------------
  m(PR, "f40-formula", 1.5, "In probit regression, the predicted probability is:", "$\\Phi(x^\\top\\beta)$",
    [["$1/(1 + e^{-x^\\top\\beta})$", "That's logistic."], ["$e^{x^\\top\\beta}$", "That's a log link."], ["$\\phi(x^\\top\\beta)$", "That's the density, not the CDF."]]),
  n(PR, "f40-5pct", 2.5, "A probit model has linear predictor $-1.645$. What is the predicted probability (to $2$ decimals)?", 0.05, 0.01),
  n(PR, "f40-inverse", 3, "A probit model predicts probability $0.975$. What is the linear predictor?", 1.96, 0.002),
  n(PR, "f40-change", 4, "The probit linear predictor moves from $0$ to $0.5$ ($\\Phi(0.5) = 0.6915$). By how much does the probability rise (to $4$ decimals)?", 0.1915, 0.002),
  m(PR, "f40-tails", 4.5, "Compared with the logistic curve, the probit curve:", "Has thinner tails, approaching $0$ and $1$ faster",
    [["Has heavier tails", "The normal has lighter tails than the logistic."], ["Is identical", "Close in the middle, different in the tails."], ["Isn't symmetric", "Both are symmetric."]]),
  n(PR, "f40-me", 5.5, "The probit marginal effect is $\\beta\\phi(\\eta)$. With $\\beta = 0.8$ and $\\eta = 1$ ($\\phi(1) = 0.2420$), what is it (to $4$ decimals)?", 0.1936, 0.002),
  m(PR, "f40-ordered", 6, "An ordered probit model for a $3$-level rating has:", "One linear predictor and two cutpoints on the latent normal scale",
    [["Three separate probit models", "One latent variable, several thresholds."], ["No intercept and no cutpoints", "Cutpoints define the categories."], ["A logistic link", "That's ordered logit."]]),
  n(PR, "f40-ordered-num", 6.5, "Ordered probit with cutpoints $-0.5$ and $0.5$ and $\\eta = 0$. What is the probability of the middle category (to $4$ decimals)?", 0.3829, 0.002),
  s(PR, "f40-scale", 7.5, "Why are probit coefficients identified only up to scale, and what quantities are identified?",
    "Multiplying $\\beta$ and the latent error SD by the same constant leaves $P(Y^* > 0)$ unchanged, so the error variance is fixed at $1$ by convention.",
    "Ratios $\\beta_j/\\beta_k$, signs, predicted probabilities and marginal effects are identified; raw coefficients are only meaningful relative to that normalisation."),
  s(PR, "f40-omitted", 9, "In probit regression, omitting a normal covariate independent of $x$ changes $\\beta_x$ even though it's not a confounder. Explain why, and contrast with linear regression.",
    "The omitted term joins the latent error, raising its variance to $1 + \\gamma^2\\sigma_z^2$; renormalising to unit variance divides every coefficient by $\\sqrt{1 + \\gamma^2\\sigma_z^2}$ — attenuation.",
    "In linear regression an independent omitted variable only inflates residual variance and leaves $\\beta_x$ unbiased; in probit (and logit) the scale normalisation makes coefficients non-collapsible."),

  // --- glm ---------------------------------------------------------------
  m(GL, "f40-canonical", 1.5, "The canonical link for a Bernoulli response is:", "The logit",
    [["The identity", "That's for the normal."], ["The log", "That's for the Poisson."], ["The probit", "Valid but not canonical."]]),
  n(GL, "f40-identity", 2, "An identity-link GLM has linear predictor $\\eta = 3$. What is the predicted mean?", 3, 0.001),
  n(GL, "f40-logit", 3, "A logit-link GLM has $\\eta = \\ln(1/4)$. What is the predicted mean?", 0.2, 0.001),
  m(GL, "f40-gamma-var", 3.5, "The variance function of the gamma GLM is:", "$V(\\mu) = \\mu^2$",
    [["$V(\\mu) = \\mu$", "That's the Poisson."], ["$V(\\mu) = 1$", "That's the normal."], ["$V(\\mu) = \\mu(1 - \\mu)$", "That's the Bernoulli."]]),
  n(GL, "f40-inverse", 4, "A gamma GLM with the inverse (reciprocal) link has $\\eta = 0.25$. What is the predicted mean?", 4, 0.001),
  n(GL, "f40-gamma-num", 5, "A gamma GLM has dispersion $\\phi = 0.5$ and mean $\\mu = 10$. What is $\\operatorname{Var}(Y) = \\phi\\mu^2$?", 50, 0.001),
  m(GL, "f40-bprime", 5.5, "For an exponential-family density $\\exp\\{(y\\theta - b(\\theta))/\\phi + c(y, \\phi)\\}$, the mean is:", "$b'(\\theta)$",
    [["$b(\\theta)$", "The derivative gives the mean."], ["$\\phi b''(\\theta)$", "That's the variance."], ["$\\theta$", "Only for the normal."]]),
  n(GL, "f40-poisson-b", 6, "For the Poisson, $b(\\theta) = e^\\theta$ and $\\phi = 1$. At $\\theta = \\ln 3$, what is the variance $\\phi b''(\\theta)$?", 3, 0.001),
  s(GL, "f40-irls-weights", 7.5, "Explain how the variance function and link enter the IRLS weights when fitting a GLM.",
    "Fisher scoring solves a weighted least-squares problem on the working response $z = \\eta + (y - \\mu)g'(\\mu)$ with weights $w = 1/[V(\\mu)g'(\\mu)^2]$.",
    "Observations with high variance (via $V$) or a steep link get less weight; weights are recomputed each iteration until convergence."),
  s(GL, "f40-tweedie", 9, "What are Tweedie GLMs, and why are they popular for insurance claim amounts?",
    "Tweedie models have $V(\\mu) = \\mu^p$; for $1 < p < 2$ the distribution is a compound Poisson–gamma: a Poisson number of gamma-sized claims.",
    "It puts positive probability on exactly zero (no claims) while being continuous above zero, so one GLM handles the many-zeros-plus-skewed-amounts structure with a log link."),

  // --- poisson-regression ------------------------------------------------
  m(PO, "f40-mean", 1.5, "In Poisson regression with a log link, the expected count is:", "$\\exp(x^\\top\\beta)$",
    [["$x^\\top\\beta$", "That's the log of the mean."], ["$1/(1 + e^{-x^\\top\\beta})$", "That's logistic."], ["$(x^\\top\\beta)^2$", "No."]]),
  n(PO, "f40-predict", 2.5, "$\\ln\\mu = 0.5 + 0.2x$. What is the expected count at $x = 5$ (to $4$ decimals)?", 4.4817, 0.002),
  n(PO, "f40-two-units", 3.5, "The rate ratio per unit of $x$ is $1.5$. What is the rate ratio for a $2$-unit increase?", 2.25, 0.001),
  n(PO, "f40-p1", 4.5, "With predicted mean $\\mu = 2$, what is $P(Y = 1)$ (to $4$ decimals)?", 0.2707, 0.002),
  m(PO, "f40-sums", 5, "For a Poisson regression with an intercept fitted by maximum likelihood:", "The fitted counts sum to the observed counts",
    [["The residuals sum to $1$", "They sum to $0$."], ["The fitted counts are all equal", "No."], ["The deviance is $0$", "Only for the saturated model."]]),
  n(PO, "f40-crude-rr", 6, "Group A has $30$ events in $1000$ person-years; group B has $20$ in $2000$. What is the crude rate ratio (A vs. B)?", 3, 0.001),
  s(PO, "f40-qmle", 7.5, "Why are Poisson regression coefficient estimates still consistent when the data are overdispersed?",
    "The Poisson score equations $\\sum_i x_i(y_i - \\mu_i) = 0$ have expectation zero whenever the mean model $E[y \\mid x] = e^{x^\\top\\beta}$ is correct.",
    "So $\\hat{\\beta}$ is a consistent quasi-MLE regardless of the variance; only the standard errors are wrong, fixed with quasi-Poisson scaling or sandwich SEs."),
  s(PO, "f40-hurdle", 8.5, "Distinguish a hurdle model from a zero-inflated Poisson model.",
    "A hurdle model has two parts: a binary model for zero vs. positive, then a zero-truncated count model for positives — all zeros come from one process.",
    "ZIP mixes a point mass at zero with a full Poisson, so zeros come from two sources (structural and sampling); the choice depends on whether \"could have been positive\" zeros make sense."),

  // --- deviance-residuals ------------------------------------------------
  m(DR, "f40-saturated", 1.5, "The saturated model used to define the deviance is the one that:", "Has one parameter per observation and fits the data exactly",
    [["Has no predictors", "That's the null model."], ["Has the fewest parameters", "The opposite."], ["Is the true model", "It's a benchmark, not truth."]]),
  n(DR, "f40-sum", 2, "Deviance residuals are $2$, $-1$, $1$, $0$. What is the residual deviance?", 6, 0.001),
  n(DR, "f40-bern", 3, "A Bernoulli observation has $y = 1$ and $\\hat{p} = 0.5$. What is its deviance residual $\\sqrt{-2\\ln\\hat{p}}$ (to $4$ decimals)?", 1.1774, 0.002),
  n(DR, "f40-poisson", 4, "A Poisson observation has $y = 6$ and $\\hat{\\mu} = 4$. Its deviance contribution is $2[y\\ln(y/\\hat{\\mu}) - (y - \\hat{\\mu})]$. What is the (positive) deviance residual (to $4$ decimals)?", 0.9304, 0.002),
  n(DR, "f40-pearson-zero", 4.5, "A Poisson observation has $y = 0$ and $\\hat{\\mu} = 2$. What is its Pearson residual $(y - \\hat{\\mu})/\\sqrt{\\hat{\\mu}}$ (to $4$ decimals)?", -1.4142, 0.002),
  m(DR, "f40-large", 5, "A standardised deviance residual of $4$ suggests:", "A poorly fitted observation worth investigating",
    [["An excellent fit", "Large residuals mean poor fit."], ["High leverage", "Leverage is separate."], ["Overdispersion necessarily", "One point isn't enough evidence."]]),
  n(DR, "f40-lrt", 5.5, "Nested logistic models have deviances $210.4$ and $204.1$, differing by $2$ parameters. What is the likelihood-ratio statistic?", 6.3, 0.001),
  m(DR, "f40-binary-gof", 6, "For ungrouped binary data, the residual deviance is a poor goodness-of-fit test because:", "It depends only on the fitted probabilities and isn't approximately $\\chi^2_{n - p}$",
    [["It's always zero", "It isn't."], ["It can't be computed", "It can."], ["It equals the Pearson statistic", "Not in general."]]),
  s(DR, "f40-normal", 7.5, "Show that for a normal linear model with known variance $\\sigma^2$, the scaled deviance equals $\\mathrm{RSS}/\\sigma^2$.",
    "The saturated model sets $\\hat{\\mu}_i = y_i$, so $2(\\ell_{\\text{sat}} - \\ell_{\\text{model}}) = 2\\sum_i (y_i - \\hat{\\mu}_i)^2/(2\\sigma^2)$.",
    "That is $\\sum_i (y_i - \\hat{\\mu}_i)^2/\\sigma^2 = \\mathrm{RSS}/\\sigma^2$, so deviance generalises the residual sum of squares."),
  s(DR, "f40-derive-poisson", 8.5, "Derive the Poisson deviance $2\\sum_i[y_i\\ln(y_i/\\hat{\\mu}_i) - (y_i - \\hat{\\mu}_i)]$.",
    "The Poisson log-likelihood is $\\sum_i [y_i\\ln\\mu_i - \\mu_i - \\ln y_i!]$; the saturated model sets $\\mu_i = y_i$.",
    "Twice the difference is $2\\sum_i[y_i\\ln y_i - y_i - y_i\\ln\\hat{\\mu}_i + \\hat{\\mu}_i]$, which rearranges to the formula (with $0\\ln 0 = 0$)."),

  // --- cox-proportional-hazards-model ------------------------------------
  m(CX, "f40-half", 1.5, "A hazard ratio of $0.5$ for treatment means:", "The treated group's instantaneous event rate is half the control's at every time",
    [["Half the treated patients survive", "It's about rates, not proportions."], ["Median survival doubles exactly", "Only under specific models."], ["The treatment has no effect", "That's HR $= 1$."]]),
  n(CX, "f40-age", 2.5, "The hazard ratio is $1.2$ per year of age. What is the hazard ratio for a $5$-year difference (to $4$ decimals)?", 2.4883, 0.002),
  n(CX, "f40-z", 3.5, "A Cox coefficient is $0.3$ with standard error $0.1$. What is the Wald $z$ statistic?", 3, 0.001),
  n(CX, "f40-surv", 4.5, "Baseline survival at $t$ is $0.9$ and a subject's hazard ratio is $2$. What is their survival at $t$, $S_0(t)^{\\text{HR}}$?", 0.81, 0.001),
  m(CX, "f40-ties", 5, "Tied event times in the Cox model are usually handled by:", "The Breslow or Efron approximations to the partial likelihood",
    [["Dropping tied events", "That loses data."], ["Ignoring the problem entirely", "Ties change the partial likelihood."], ["Using a parametric baseline", "Not necessary."]]),
  n(CX, "f40-partial", 5.5, "A risk set has three subjects with $e^{x^\\top\\beta} = 1, 1, 2$. The subject with $2$ fails. What is that event's partial-likelihood contribution?", 0.5, 0.001),
  m(CX, "f40-strata", 6, "A stratified Cox model:", "Lets each stratum have its own baseline hazard while sharing the coefficients",
    [["Fits a separate $\\beta$ per stratum", "Coefficients are common."], ["Estimates an effect for the stratifying variable", "Its effect is absorbed into the baselines."], ["Requires parametric baselines", "Baselines stay unspecified."]]),
  n(CX, "f40-breslow", 6.5, "At an event time there are $2$ deaths and the risk set's $\\sum e^{x^\\top\\beta} = 40$. What is the Breslow increment to the cumulative baseline hazard?", 0.05, 0.001),
  s(CX, "f40-timevarying", 7.5, "What are time-varying covariates in a Cox model, and how does ignoring them cause immortal time bias?",
    "Covariates whose values change during follow-up (e.g. starting treatment) enter as $x(t)$, with the hazard at $t$ depending on the current value.",
    "Classifying subjects by a status reached later (\"ever treated\") credits them with event-free time before treatment — they had to survive to be treated — biasing towards benefit."),
  s(CX, "f40-schoenfeld", 8.5, "What are Schoenfeld residuals, and how do they test proportional hazards?",
    "At each event time, the residual is the failing subject's covariate minus the risk-set weighted average $\\sum x_j e^{x_j^\\top\\beta}/\\sum e^{x_j^\\top\\beta}$.",
    "Under PH, scaled Schoenfeld residuals have mean zero over time; a trend versus time (Grambsch–Therneau test) indicates the effect $\\beta(t)$ varies."),

  // --- generalized-estimating-equations ----------------------------------
  m(GE, "f40-specify", 1.5, "To fit GEE you must specify:", "A mean model, a variance function and a working correlation — not a full joint distribution",
    [["The full joint likelihood", "GEE avoids that."], ["Only the variance", "The mean model is central."], ["Random-effect distributions", "That's a mixed model."]]),
  n(GE, "f40-exch", 2.5, "An exchangeable working correlation with $\\alpha = 0.4$ and cluster size $3$. What is the correlation between observations $1$ and $3$?", 0.4, 0.001),
  n(GE, "f40-ar1", 3, "AR($1$) working correlation with $\\alpha = 0.6$. What is the correlation between times $1$ and $3$?", 0.36, 0.001),
  n(GE, "f40-deff", 4, "Clusters of size $5$ with intraclass correlation $0.25$. What is the design effect $1 + (m - 1)\\rho$?", 2, 0.001),
  n(GE, "f40-ess", 5, "$100$ clusters of $5$ observations with design effect $2$. What is the effective sample size?", 250, 0.001),
  m(GE, "f40-meat", 5, "In the GEE sandwich variance estimator, the “meat” is:", "The empirical covariance of the cluster-level score contributions",
    [["The model-based information matrix", "That's the bread."], ["The working correlation matrix", "That's an input."], ["The residual variance", "Too narrow."]]),
  m(GE, "f40-correct", 6, "If the working correlation happens to be correct, GEE:", "Is efficient within its class and model-based standard errors are valid too",
    [["Becomes biased", "Correctness helps."], ["Requires no sandwich at all, ever", "Sandwich still valid; just not needed."], ["Equals a mixed model for any link", "Not for nonlinear links."]]),
  n(GE, "f40-df", 6.5, "A GEE analysis has $20$ clusters and $3$ regression parameters. A common small-sample correction uses a $t$ distribution with $K - p$ degrees of freedom. How many?", 17, 0.001),
  s(GE, "f40-indep", 7.5, "Explain why GEE with an independence working correlation gives the same point estimates as an ordinary GLM, and what it adds.",
    "With $R = I$ the estimating equations reduce to the GLM score equations, so $\\hat{\\beta}$ is the usual GLM fit.",
    "GEE adds cluster-robust (sandwich) standard errors that account for within-cluster correlation, which the naive GLM SEs ignore."),
  s(GE, "f40-pepe", 9, "Why can a non-independence working correlation bias GEE estimates when covariates vary over time?",
    "Consistency for any working correlation needs $E[y_{it} \\mid x_{i1}, \\dots, x_{iT}] = E[y_{it} \\mid x_{it}]$ — full covariate conditional mean (Pepe & Anderson).",
    "If past or future covariates predict $y_{it}$ (feedback), non-diagonal working correlations mix equations across times and bias $\\hat{\\beta}$; the independence working correlation stays consistent."),

  // --- mixed-effect-models -----------------------------------------------
  m(MX, "f40-dist", 1.5, "In a standard linear mixed model, random effects are assumed:", "Normally distributed with mean zero",
    [["Fixed unknown constants", "That's fixed effects."], ["Uniform", "No."], ["Equal across groups", "They vary by group."]]),
  n(MX, "f40-icc", 2, "$\\sigma_u^2 = 5$ and $\\sigma^2 = 15$. What is the intraclass correlation?", 0.25, 0.001),
  n(MX, "f40-shrink", 3, "$\\sigma_u^2 = 4$, $\\sigma^2 = 8$, and a group has $n_j = 2$. What is the shrinkage factor $\\sigma_u^2/(\\sigma_u^2 + \\sigma^2/n_j)$?", 0.5, 0.001),
  n(MX, "f40-cov", 3.5, "Random intercept variance $\\sigma_u^2 = 3$, residual variance $\\sigma^2 = 7$. What is $\\operatorname{Cov}(y_{ij}, y_{ik})$ for two observations in the same group?", 3, 0.001),
  n(MX, "f40-blup", 4, "A group's mean deviates from the overall mean by $6$, and the shrinkage factor is $0.5$. What is the BLUP of its random intercept?", 3, 0.001),
  m(MX, "f40-slope", 5, "Adding a random slope lets the model:", "Allow the effect of $x$ to vary across groups, typically with a correlated random intercept",
    [["Remove the fixed slope", "The fixed slope remains the average."], ["Make groups independent", "No."], ["Avoid estimating variances", "It adds variance parameters."]]),
  n(MX, "f40-params", 5.5, "A model has a correlated random intercept and random slope plus residual error. How many variance–covariance parameters?", 4, 0.001),
  n(MX, "f40-group-mean-var", 6.5, "$\\sigma_u^2 = 2$, $\\sigma^2 = 8$. What is the variance of a group's sample mean of $n = 4$ observations?", 4, 0.001),
  s(MX, "f40-random-or-fixed", 7, "When should a factor be treated as random rather than fixed?",
    "When its levels are a sample from a larger population of interest (schools, patients) and inference should extend beyond the observed levels.",
    "Also when there are many levels with few observations each, so partial pooling helps; few levels of intrinsic interest (treatments) are better fixed."),
  s(MX, "f40-mundlak", 9, "What goes wrong if a random intercept is correlated with a predictor, and how does the Mundlak approach fix it?",
    "The random-intercept estimator assumes $u_j$ is independent of $x$; if groups with high $u_j$ also have high $\\bar{x}_j$, the slope picks up between-group confounding and is biased.",
    "Adding the group mean $\\bar{x}_j$ as a predictor separates within- and between-group effects; the within effect then matches the fixed-effects estimate."),
];
