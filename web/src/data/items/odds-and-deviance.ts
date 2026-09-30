import type { Item, SourceRef } from "../../lib/assessment/types";
import { makeBuilders } from "./authoring";

/**
 * Linear Models additions: `odds-and-log-odds`, `odds-ratio` and
 * `deviance-residuals`. Eight items per concept, two per cognitive level.
 */
const AUTHORED: SourceRef = {
  id: "mathlingo-authored-odds-deviance",
  tier: "generated",
  title: "Mathlingo authored item (odds and deviance)",
};

const { mcq, short, num } = makeBuilders(AUTHORED);

const OL = "odds-and-log-odds";
const oddsLogOdds: Item[] = [
  mcq(
    { concept: OL, slug: "recall-odds", cognitive: "recall", difficulty: -1.1, seconds: 30,
      stem: "An event has probability $0.8$. What are its odds?" },
    "$4$",
    [
      ["$0.8$", "odds-is-probability", "Odds are $p/(1 - p)$, not $p$."],
      ["$0.25$", "odds-inverted", "That is $(1 - p)/p$, the odds against."],
      ["$1.6$", "odds-times-two", "Odds are $0.8/0.2$, not $0.8 \\times 2$."],
    ],
  ),
  mcq(
    { concept: OL, slug: "recall-range", cognitive: "recall", difficulty: -0.6, seconds: 30,
      stem: "As $p$ ranges over $(0, 1)$, what values can $\\operatorname{logit}(p) = \\log\\big(p/(1 - p)\\big)$ take?" },
    "Every real number, $(-\\infty, \\infty)$",
    [
      ["$(0, 1)$", "logit-range-prob", "That is the range of $p$; the logit stretches it onto the whole line."],
      ["$(0, \\infty)$", "logit-range-odds", "That is the range of the odds; taking the log allows negative values."],
      ["$[-1, 1]$", "logit-range-correlation", "The logit is unbounded in both directions."],
    ],
  ),
  num(
    { concept: OL, slug: "apply-logit", cognitive: "apply", difficulty: -0.3, seconds: 45,
      stem: "Compute the log odds (natural log) of $p = 0.2$. Give $3$ decimal places." },
    -1.386,
  ),
  num(
    { concept: OL, slug: "apply-inverse", cognitive: "apply", difficulty: -0.4, seconds: 40,
      stem: "The odds of an event are $3$. What is its probability?" },
    0.75,
  ),
  short(
    { concept: OL, slug: "explain-why-logit", cognitive: "explain", difficulty: 0.3, seconds: 100,
      stem: "Logistic regression sets $\\operatorname{logit}(p) = \\beta_0 + \\beta^\\top x$ rather than $p = \\beta_0 + \\beta^\\top x$. Explain why." },
    [
      ["range", "A linear predictor can take any real value, but $p$ must lie in $[0, 1]$; modelling $p$ linearly gives impossible predictions.", 4, true],
      ["logit", "The logit maps $(0, 1)$ onto $(-\\infty, \\infty)$, so any linear predictor corresponds to a valid probability through the inverse logit (sigmoid).", 3, true],
      ["canonical", "Mentions that the logit is the Bernoulli's canonical link.", 1],
    ],
  ),
  mcq(
    { concept: OL, slug: "explain-symmetry", cognitive: "explain", difficulty: 0.0, seconds: 40,
      stem: "How does $\\operatorname{logit}(1 - p)$ relate to $\\operatorname{logit}(p)$?" },
    "$\\operatorname{logit}(1 - p) = -\\operatorname{logit}(p)$",
    [
      ["$\\operatorname{logit}(1 - p) = 1 - \\operatorname{logit}(p)$", "logit-complement", "The logit is antisymmetric about $p = \\tfrac{1}{2}$, where it is $0$."],
      ["$\\operatorname{logit}(1 - p) = 1/\\operatorname{logit}(p)$", "logit-reciprocal", "The odds invert; their log changes sign."],
      ["They are equal", "logit-symmetric", "Swapping success and failure flips the sign of the log odds."],
    ],
  ),
  num(
    { concept: OL, slug: "transfer-betting", cognitive: "transfer", difficulty: 0.0, seconds: 45,
      stem: "A bookmaker quotes a horse at “$4$ to $1$ against”. What win probability do these odds imply?" },
    0.2,
  ),
  short(
    { concept: OL, slug: "transfer-rare-common", cognitive: "transfer", difficulty: 0.5, seconds: 100,
      stem: "A news article reports that a treatment “doubles the odds” of recovery and paraphrases it as “doubles the chance”. When is this paraphrase roughly right, and when is it badly wrong?" },
    [
      ["rare", "For rare outcomes, odds $\\approx p$ because $1 - p \\approx 1$, so doubling the odds roughly doubles the probability.", 3, true],
      ["common", "For common outcomes the two diverge: e.g. $p = 0.5$ has odds $1$; doubling to $2$ gives $p \\approx 0.67$, not $1.0$.", 4, true],
    ],
  ),
];

const OR = "odds-ratio";
const oddsRatio: Item[] = [
  mcq(
    { concept: OR, slug: "recall-exp-beta", cognitive: "recall", difficulty: -0.7, seconds: 35,
      stem: "In a logistic regression, a one-unit increase in $x_1$, holding the other predictors fixed, multiplies the odds by:" },
    "$e^{\\beta_1}$",
    [
      ["$\\beta_1$", "or-is-beta", "$\\beta_1$ is added to the log odds; the odds are multiplied by its exponential."],
      ["$1 + \\beta_1$", "or-linear", "That is only a first-order approximation for small $\\beta_1$."],
      ["$\\sigma(\\beta_1)$", "or-sigmoid", "The sigmoid maps log odds to probability; the odds ratio is $e^{\\beta_1}$."],
    ],
  ),
  mcq(
    { concept: OR, slug: "recall-null", cognitive: "recall", difficulty: -0.9, seconds: 30,
      stem: "What odds ratio corresponds to $\\beta_1 = 0$?" },
    "$1$ — no association between $x_1$ and the odds",
    [
      ["$0$", "or-null-zero", "$e^0 = 1$; an odds ratio of $0$ is impossible."],
      ["$0.5$", "or-null-half", "That would correspond to $\\beta_1 = \\ln 0.5 < 0$."],
      ["It is undefined", "or-null-undefined", "$e^0 = 1$ is perfectly defined."],
    ],
  ),
  num(
    { concept: OR, slug: "apply-exp", cognitive: "apply", difficulty: -0.3, seconds: 40,
      stem: "A logistic regression coefficient is $\\hat{\\beta} = 0.25$. What is the estimated odds ratio? Give $3$ decimal places." },
    1.284,
  ),
  num(
    { concept: OR, slug: "apply-ci", cognitive: "apply", difficulty: 0.3, seconds: 70,
      stem: "$\\hat{\\beta} = 0.25$ with standard error $0.1$. Compute the upper endpoint of the $95\\%$ confidence interval for the odds ratio, $e^{\\hat{\\beta} + 1.96\\,\\text{SE}}$, to $3$ decimal places." },
    1.562,
  ),
  short(
    { concept: OR, slug: "explain-constant-or", cognitive: "explain", difficulty: 0.6, seconds: 120,
      stem: "In a logistic regression the odds ratio for $x_1$ is the same at every value of $x_1$, but the change in probability from a one-unit increase is not. Explain why." },
    [
      ["or", "The log odds are linear in $x_1$, so a unit step always adds $\\beta_1$ and multiplies the odds by $e^{\\beta_1}$, whatever the starting point.", 4, true],
      ["prob", "The probability is the sigmoid of the log odds, which is steepest at $p = 0.5$ and flat near $0$ and $1$, so the same log-odds change moves $p$ by different amounts.", 4, true],
    ],
  ),
  mcq(
    { concept: OR, slug: "explain-or-vs-rr", cognitive: "explain", difficulty: 0.4, seconds: 60,
      stem: "The probability of an outcome is $0.4$ in a control group and $0.6$ in a treated group. Which statement is correct?" },
    "The risk ratio is $1.5$ but the odds ratio is $2.25$",
    [
      ["Both the risk ratio and the odds ratio are $1.5$", "or-equals-rr", "They coincide only for rare outcomes; here $(0.6/0.4)/(0.4/0.6) = 2.25$."],
      ["The odds ratio is $1.5$ and the risk ratio is $2.25$", "or-rr-swapped", "The risk ratio is $0.6/0.4 = 1.5$."],
      ["The odds ratio is $0.2$", "or-difference", "$0.2$ is the risk difference, not a ratio."],
    ],
  ),
  num(
    { concept: OR, slug: "transfer-table", cognitive: "transfer", difficulty: 0.2, seconds: 70,
      stem: "In a case-control study, $30$ cases and $70$ controls were exposed, and $10$ cases and $90$ controls were unexposed. Compute the odds ratio for exposure, to $3$ decimal places." },
    3.857,
  ),
  short(
    { concept: OR, slug: "transfer-case-control", cognitive: "transfer", difficulty: 0.8, seconds: 120,
      stem: "Why can a case-control study, which samples people by whether they have the disease, estimate an odds ratio for an exposure but not a risk ratio?" },
    [
      ["risk", "Sampling on the outcome fixes the proportion of cases by design, so the observed disease probabilities — and hence risks and risk ratios — do not reflect the population.", 4, true],
      ["or", "The odds ratio is symmetric: the exposure odds ratio among cases vs controls equals the disease odds ratio among exposed vs unexposed, and it is unaffected by outcome-based sampling (only the logistic intercept shifts).", 4, true],
    ],
  ),
];

const DV = "deviance-residuals";
const deviance: Item[] = [
  mcq(
    { concept: DV, slug: "recall-definition", cognitive: "recall", difficulty: -0.4, seconds: 40,
      stem: "The deviance of a fitted GLM is:" },
    "$2\\big[\\ell(\\text{saturated}) - \\ell(\\hat{\\beta})\\big]$ — twice the log-likelihood gap to a model that fits every observation exactly",
    [
      ["$2\\big[\\ell(\\hat{\\beta}) - \\ell(\\text{null})\\big]$", "deviance-vs-null", "That is the likelihood-ratio statistic against the intercept-only model, the null deviance minus the residual deviance."],
      ["The sum of squared raw residuals $\\sum (y_i - \\hat{\\mu}_i)^2$", "deviance-is-rss", "That equals the deviance only for the normal family."],
      ["The variance of the fitted values", "deviance-variance", "Deviance measures lack of fit, not the spread of fitted values."],
    ],
  ),
  mcq(
    { concept: DV, slug: "recall-normal", cognitive: "recall", difficulty: -0.2, seconds: 35,
      stem: "For a normal linear model with known unit variance, what is the deviance?" },
    "The residual sum of squares",
    [
      ["$R^2$", "deviance-r2", "$R^2$ is a ratio; the deviance for the normal family is the RSS itself."],
      ["The log-likelihood", "deviance-loglik", "The deviance is a difference of log-likelihoods, scaled by $2$."],
      ["Zero, since the normal model is saturated", "deviance-normal-zero", "The saturated model has one mean per observation; a regression model does not."],
    ],
  ),
  num(
    { concept: DV, slug: "apply-poisson-residual", cognitive: "apply", difficulty: 0.4, seconds: 90,
      stem: "In a Poisson regression, an observation has $y = 4$ and fitted mean $\\hat{\\mu} = 2$. Its unit deviance is $d = 2\\big[y\\ln(y/\\hat{\\mu}) - (y - \\hat{\\mu})\\big]$. Compute its deviance residual $\\operatorname{sign}(y - \\hat{\\mu})\\sqrt{d}$, to $3$ decimal places." },
    1.243,
  ),
  num(
    { concept: DV, slug: "apply-nested", cognitive: "apply", difficulty: 0.0, seconds: 50,
      stem: "A Poisson model with $4$ parameters has residual deviance $98.3$; dropping $2$ predictors gives residual deviance $112.4$. What is the likelihood-ratio statistic for the two dropped predictors?" },
    14.1,
  ),
  short(
    { concept: DV, slug: "explain-binary", cognitive: "explain", difficulty: 0.8, seconds: 120,
      stem: "The residual deviance of a Poisson model with large counts can be compared with $\\chi^2_{n - p}$ to test goodness of fit. Explain why the same check is invalid for logistic regression on ungrouped binary data, and what can be used instead." },
    [
      ["asymptotics", "The $\\chi^2$ approximation needs each observation's count to be large; with $m_i = 1$ the saturated model's parameters grow with $n$ and the deviance is not approximately $\\chi^2_{n - p}$.", 4, true],
      ["alternative", "Use grouped goodness-of-fit checks such as Hosmer–Lemeshow, binned residual plots, or compare nested models by deviance differences, which remain valid.", 3, true],
    ],
  ),
  mcq(
    { concept: DV, slug: "explain-vs-pearson", cognitive: "explain", difficulty: 0.5, seconds: 45,
      stem: "Why are deviance residuals often preferred to Pearson residuals for diagnostic plots in a Poisson regression with small counts?" },
    "Their distribution is usually closer to normal, so outliers and patterns are easier to judge",
    [
      ["They are always smaller", "dev-smaller", "Neither type is uniformly smaller; the advantage is their shape."],
      ["They sum to zero exactly", "dev-sum-zero", "Neither type is guaranteed to sum to zero in general."],
      ["They don't depend on the fitted means", "dev-no-mu", "Both depend on $\\hat{\\mu}_i$."],
    ],
  ),
  mcq(
    { concept: DV, slug: "transfer-overdispersion", cognitive: "transfer", difficulty: 0.5, seconds: 50,
      stem: "A Poisson regression fitted to $54$ counts with $4$ parameters has residual deviance $98.3$. What is the most appropriate conclusion?" },
    "The fit is poor — deviance about twice its $50$ degrees of freedom suggests overdispersion or a missing term; consider quasi-Poisson or negative binomial",
    [
      ["The fit is excellent, since a larger deviance means more explained variation", "dev-larger-better", "Deviance measures lack of fit; larger is worse."],
      ["The fit is adequate, since $98.3 < 100$", "dev-threshold-100", "The reference is the $\\chi^2_{50}$ distribution, with mean $50$."],
      ["Nothing can be concluded from a deviance", "dev-uninformative", "For Poisson data with moderate counts, $D \\approx \\chi^2_{n - p}$ gives a usable goodness-of-fit check."],
    ],
  ),
  short(
    { concept: DV, slug: "transfer-residual-plot", cognitive: "transfer", difficulty: 0.6, seconds: 100,
      stem: "You plot the deviance residuals of a Poisson regression against the fitted linear predictor $\\hat{\\eta}$ and see a clear U-shaped curve. What does this suggest, and what would you try?" },
    [
      ["mean-structure", "The mean is misspecified: a missing nonlinear term (e.g. a quadratic or spline in a predictor), a missing interaction, or the wrong link function.", 4, true],
      ["try", "Add the suggested term or try another link, then re-examine the residuals and compare deviances.", 3, true],
    ],
  ),
];

export const oddsAndDevianceItems: Item[] = [...oddsLogOdds, ...oddsRatio, ...deviance];
