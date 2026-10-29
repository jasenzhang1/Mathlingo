import type { Item } from "../../../lib/assessment/types";
import { chapter } from "./shared";

/**
 * New lesson from Ding Ch. 21, Logistic Regressions for Categorical Outcomes
 * (40 items, levels 1–10): the multinomial logit, its latent-utility (Gumbel)
 * form and McFadden's discrete choice model, and the proportional odds model.
 */

const MN = "multinomial-and-ordinal-logistic";
const { m, n, s } = chapter("Ch. 21, Logistic Regressions for Categorical Outcomes");

export const dingMultinomialItems: Item[] = [
  // level 1
  m(MN, "recall-ordinal", 1, "Which outcome is ordinal rather than nominal?",
    "A product review from $1$ to $5$ stars", [
      ["Choice of fruit: apple, orange or pear", "The categories have no natural order, so the outcome is nominal."],
      ["Ride-share company used: Uber, Lyft or transit", "Again unordered, so nominal."],
      ["Housing type: house, townhouse or condo", "These are unordered labels."],
    ]),
  m(MN, "recall-mnl-form", 1, "With category $K$ as the reference, the multinomial logistic model specifies:",
    "$\\log\\{\\pi_k(\\mathbf{x})/\\pi_K(\\mathbf{x})\\} = \\mathbf{x}^{\\top}\\boldsymbol{\\beta}_k$ for $k = 1, \\dots, K - 1$, with $\\boldsymbol{\\beta}_K = \\mathbf{0}$", [
      ["$\\text{logit}\\,\\pi_k(\\mathbf{x}) = \\mathbf{x}^{\\top}\\boldsymbol{\\beta}$ with one common $\\boldsymbol{\\beta}$", "That is $K$ separate binary logits sharing slopes, which need not sum to one."],
      ["$\\pi_k(\\mathbf{x}) = \\mathbf{x}^{\\top}\\boldsymbol{\\beta}_k$", "A linear model for probabilities cannot keep them in $[0, 1]$."],
      ["$\\text{logit}\\,\\Pr(y \\le k \\mid \\mathbf{x}) = \\alpha_k - \\mathbf{x}^{\\top}\\boldsymbol{\\beta}$", "That is the proportional odds model for ordinal outcomes."],
    ]),
  m(MN, "recall-po-form", 1, "In the convention of R’s `polr` (followed by Ding), the proportional odds model is:",
    "$\\text{logit}\\,\\Pr(y \\le k \\mid \\mathbf{x}) = \\alpha_k - \\mathbf{x}^{\\top}\\boldsymbol{\\beta}$, with one $\\boldsymbol{\\beta}$ for every cutpoint", [
      ["$\\text{logit}\\,\\Pr(y = k \\mid \\mathbf{x}) = \\alpha_k + \\mathbf{x}^{\\top}\\boldsymbol{\\beta}_k$", "The model is for cumulative probabilities, with slopes shared across $k$."],
      ["$\\log\\{\\pi_k/\\pi_K\\} = \\mathbf{x}^{\\top}\\boldsymbol{\\beta}_k$", "That is the multinomial logit, which ignores order."],
      ["$\\Pr(y \\le k \\mid \\mathbf{x}) = \\alpha_k - \\mathbf{x}^{\\top}\\boldsymbol{\\beta}$", "Without a link the probabilities could leave $[0, 1]$."],
    ]),
  m(MN, "recall-iia", 1, "The independence of irrelevant alternatives (IIA) property of the logit choice model says:",
    "The odds of choosing $k$ over $l$ do not depend on which other alternatives are available", [
      ["The alternatives are statistically independent", "IIA is about ratios of choice probabilities, not independence of the options."],
      ["Each person’s choice is independent of their covariates", "The covariates drive the utilities."],
      ["Irrelevant covariates have zero coefficients", "IIA concerns alternatives, not covariates."],
    ]),

  // level 2
  n(MN, "apply-multinomial-cov", 2,
    "A categorical $y$ has probabilities $[\\pi_1, \\pi_2, \\pi_3] = [0.2, 0.3, 0.5]$. What is $\\text{Cov}\\{\\mathbb{1}(y = 1), \\mathbb{1}(y = 2)\\}$?",
    -0.06),
  n(MN, "apply-multinomial-var", 2,
    "Same probabilities $[0.2, 0.3, 0.5]$. What is $\\text{Var}\\{\\mathbb{1}(y = 1)\\}$?",
    0.16),
  n(MN, "apply-softmax-prob", 2,
    "Multinomial logit with $K = 3$: $\\mathbf{x}^{\\top}\\boldsymbol{\\beta}_1 = 1$, $\\mathbf{x}^{\\top}\\boldsymbol{\\beta}_2 = 0$ and $\\boldsymbol{\\beta}_3 = \\mathbf{0}$. Compute $\\pi_1(\\mathbf{x})$. Give $4$ decimal places.",
    0.5761),
  n(MN, "apply-relative-odds", 2,
    "In a multinomial logit, the coefficient of covariate $j$ for category $k$ (reference $K$) is $\\beta_{kj} = 0.4$. By what factor does a one-unit increase in $x_j$ multiply the odds $\\pi_k/\\pi_K$? Give $4$ decimal places.",
    1.4918),

  // level 3
  n(MN, "apply-parameter-count", 3,
    "A multinomial logit with $K = 4$ categories and covariate vector $\\mathbf{x}$ of length $p = 3$ (including the intercept). How many free coefficients does it have?",
    9),
  n(MN, "apply-po-parameter-count", 3,
    "A proportional odds model with $K = 5$ ordered categories and $3$ covariates (not counting an intercept). How many free parameters does it have, cutpoints included?",
    7),
  n(MN, "apply-po-middle", 3,
    "Proportional odds with $K = 3$: cutpoints $\\alpha_1 = -1$ and $\\alpha_2 = 1$, and $\\mathbf{x}^{\\top}\\boldsymbol{\\beta} = 0.5$. Compute $\\Pr(y = 2 \\mid \\mathbf{x}) = \\text{expit}(\\alpha_2 - \\mathbf{x}^{\\top}\\boldsymbol{\\beta}) - \\text{expit}(\\alpha_1 - \\mathbf{x}^{\\top}\\boldsymbol{\\beta})$. Give $2$ decimal places.",
    0.44),
  m(MN, "apply-po-sign", 3, "Under the `polr` parametrisation $\\text{logit}\\,\\Pr(y \\le k \\mid \\mathbf{x}) = \\alpha_k - \\mathbf{x}^{\\top}\\boldsymbol{\\beta}$, a positive $\\beta_j$ means that increasing $x_j$:",
    "Shifts probability toward the higher categories", [
      ["Shifts probability toward the lower categories", "The minus sign means a larger $\\mathbf{x}^{\\top}\\boldsymbol{\\beta}$ lowers $\\Pr(y \\le k)$ for every $k$."],
      ["Raises the probability of every category", "Probabilities sum to one; some must fall."],
      ["Changes only the middle categories", "A common shift in the latent variable moves mass across all thresholds."],
    ]),

  // level 4
  n(MN, "apply-po-odds-ratio", 4,
    "Proportional odds with $\\beta_j = 0.7$. By what factor does a one-unit increase in $x_j$ multiply the cumulative odds $\\Pr(y \\le k)/\\Pr(y > k)$, for every $k$? Give $4$ decimal places.",
    0.4966),
  n(MN, "apply-conditional-logit", 4,
    "McFadden’s conditional logit with utilities $V_k = \\beta\\,\\text{price}_k$, $\\beta = -0.02$ per dollar, and two alternatives priced $\\$100$ and $\\$150$. What is the probability of choosing the cheaper one? Give $4$ decimal places.",
    0.7311),
  m(MN, "apply-individual-covariate-drops", 4, "In McFadden’s conditional logit $\\pi_k = e^{\\mathbf{z}_{ik}^{\\top}\\boldsymbol{\\beta}}/\\sum_l e^{\\mathbf{z}_{il}^{\\top}\\boldsymbol{\\beta}}$, a covariate that varies only across individuals (such as income) with a common coefficient:",
    "Cancels from every probability, so it needs choice-specific coefficients to enter", [
      ["Enters exactly like price", "A term $\\gamma\\,\\text{income}_i$ appears in every utility and cancels in the ratio."],
      ["Must be standardised first", "Scaling does not stop the cancellation."],
      ["Makes the model unidentified for all coefficients", "Only that covariate’s common coefficient is unidentified."],
    ]),
  n(MN, "apply-gumbel-softmax", 4,
    "Utilities $U_k = V_k + \\varepsilon_k$ with IID standard Gumbel errors and $\\mathbf{V} = [1, 2, 3]$. Choosing the alternative with the largest utility gives $\\Pr(y = k) = e^{V_k}/\\sum_l e^{V_l}$. Compute $\\Pr(y = 3)$. Give $4$ decimal places.",
    0.6652),

  // level 5
  m(MN, "apply-hessian", 5, "The $(k, k)$ block of the multinomial-logit Hessian is $-\\sum_i \\pi_k(\\mathbf{x}_i)\\{1 - \\pi_k(\\mathbf{x}_i)\\}\\mathbf{x}_i\\mathbf{x}_i^{\\top}$. The full Hessian is negative semi-definite because:",
    "Its blocks are minus the multinomial covariance matrix of the indicators, which is positive semi-definite, tensored with $\\mathbf{x}_i\\mathbf{x}_i^{\\top}$", [
      ["Every block is diagonal", "The off-diagonal blocks $\\sum_i \\pi_k\\pi_l\\mathbf{x}_i\\mathbf{x}_i^{\\top}$ are non-zero."],
      ["Only the diagonal blocks matter for definiteness", "Definiteness is a property of the whole matrix."],
      ["The log-likelihood is linear in $\\boldsymbol{\\beta}$", "The $\\log\\sum_l e^{\\mathbf{x}^{\\top}\\boldsymbol{\\beta}_l}$ term is convex, not linear."],
    ]),
  n(MN, "apply-score", 5,
    "The score for $\\boldsymbol{\\beta}_k$ is $\\sum_i \\mathbf{x}_i\\{\\mathbb{1}(y_i = k) - \\pi_k(\\mathbf{x}_i)\\}$. With an intercept only, $n = 100$ units, $30$ of them in category $k$, and current fitted $\\pi_k = 0.25$, what is the intercept’s score component?",
    5),
  m(MN, "apply-intercept-only-mle", 5, "In an intercept-only multinomial logit, the MLE of the category probabilities is:",
    "The sample proportions in each category", [
      ["$1/K$ for every category", "That is the starting value when every $\\beta_k = 0$, not the MLE."],
      ["The proportions shrunk toward $1/K$", "Shrinkage would need a penalty or prior."],
      ["Undefined without covariates", "The intercepts alone identify the marginal probabilities."],
    ]),
  s(MN, "explain-iia", 5,
    "Explain why the logit choice model implies IIA, and give an example where IIA is implausible.",
    "Shows that $\\pi_k/\\pi_l = \\exp\\{(\\mathbf{z}_k - \\mathbf{z}_l)^{\\top}\\boldsymbol{\\beta}\\}$ involves only the two alternatives, so adding or removing others leaves the ratio unchanged (a consequence of IID Gumbel errors).",
    "Gives an example where alternatives are close substitutes: adding a blue bus identical to a red bus should split the bus share, but the logit keeps the car-to-bus odds fixed (or Ding’s apple, orange, banana example)."),

  // level 6
  n(MN, "apply-iia-numeric", 6,
    "A logit choice model gives $\\Pr(\\text{car}) = 0.6$ and $\\Pr(\\text{red bus}) = 0.4$. A blue bus with exactly the red bus’s utility is added. What does the model now predict for $\\Pr(\\text{car})$? Give $4$ decimal places.",
    0.4286),
  n(MN, "apply-inverse-model", 6,
    "Inverse (discriminant) model with $K = 3$, scalar $x \\mid y = k \\sim \\mathcal{N}(\\mu_k, 1)$, $\\boldsymbol{\\mu} = [0, 1, 2]$ and priors $\\mathbf{q} = [0.5, 0.25, 0.25]$. This implies a multinomial logit with intercepts $\\alpha_k = \\log q_k - \\frac{1}{2}\\mu_k^2$. Compute $\\alpha_3 - \\alpha_1$. Give $4$ decimal places.",
    -2.6931),
  m(MN, "apply-case-control-multinomial", 6, "Outcome-dependent sampling: units in category $k$ enter the sample with probability $p_k$, regardless of $\\mathbf{x}$. A multinomial logit fitted to the sample has:",
    "The same slopes, with each intercept shifted by $\\log p_k$", [
      ["Slopes scaled by $p_k$", "Bayes’ rule adds $\\log p_k$ to each linear predictor, which only the intercepts absorb."],
      ["No valid interpretation", "The slopes, the log odds ratios, are still consistent."],
      ["Shifted slopes but correct intercepts", "It is the other way round."],
    ]),
  s(MN, "explain-one-model-vs-binaries", 6,
    "Why fit one multinomial logit instead of $K - 1$ separate binary logistic regressions of $\\mathbb{1}(y = k)$ on $\\mathbf{x}$?",
    "Notes that the joint model gives coherent probabilities that are positive and sum to one for every $\\mathbf{x}$, which separate fits need not do.",
    "Notes that it models the whole distribution of $y$ with one likelihood, so it is more efficient, while separate fits discard information from the other categories (Ding’s footnote)."),

  // level 7
  n(MN, "apply-po-top", 7,
    "Proportional odds with cutpoints $\\alpha_1 = -1$ and $\\alpha_2 = 1$ and $\\mathbf{x}^{\\top}\\boldsymbol{\\beta} = 0.5$. Compute $\\Pr(y = 3 \\mid \\mathbf{x})$. Give $4$ decimal places.",
    0.3775),
  n(MN, "apply-po-shift", 7,
    "Same model ($\\alpha_1 = -1$, $\\mathbf{x}^{\\top}\\boldsymbol{\\beta} = 0.5$), and one covariate with $\\beta_j = 1$ rises by one unit. By how much does $\\Pr(y = 1 \\mid \\mathbf{x})$ change? Give $4$ decimal places.",
    -0.1066),
  m(MN, "apply-ordered-probit", 7, "The ordered probit differs from the proportional odds model in:",
    "Using a standard Normal latent error instead of a logistic one", [
      ["Allowing different slopes for each cutpoint", "Both share one $\\boldsymbol{\\beta}$ across cutpoints."],
      ["Dropping the cutpoints", "Both need $K - 1$ ordered cutpoints."],
      ["Modelling $\\Pr(y = k)$ directly with a probit link", "Both model cumulative probabilities via a latent variable."],
    ]),
  s(MN, "explain-po-check", 7,
    "How can you check the proportional odds assumption, and what goes wrong if it fails?",
    "Describes a check: fit the $K - 1$ binary logits of $\\mathbb{1}(y \\le k)$ and compare their slopes, or compare with a multinomial or partial-proportional-odds fit by a likelihood-ratio or score (Brant) test.",
    "Explains the consequence: a single $\\boldsymbol{\\beta}$ then averages effects that differ across thresholds, which can misstate effects at the extremes, for instance when a covariate mainly moves people out of the lowest category."),

  // level 8
  s(MN, "explain-mcfadden-lemma", 8,
    "Outline why IID standard Gumbel utility errors give choice probabilities $e^{V_k}/\\sum_l e^{V_l}$ (McFadden’s lemma).",
    "Conditions on $\\varepsilon_k = z$: $\\Pr(y = k) = \\int \\prod_{l \\ne k} F(V_k - V_l + z)f(z)\\,dz$ with Gumbel CDF $F(z) = \\exp(-e^{-z})$.",
    "Substitutes $t = e^{-z}$ to reduce the integral to $\\int_0^\\infty e^{-tC_k}\\,dt = 1/C_k$, where $C_k = 1 + \\sum_{l \\ne k}e^{V_l - V_k}$, giving the softmax (or cites the max-stability of the Gumbel)."),
  n(MN, "apply-inverse-model-log-odds", 8,
    "Inverse model as before: scalar $x \\mid y = k \\sim \\mathcal{N}(\\mu_k, 1)$ with $\\boldsymbol{\\mu} = [0, 1, 2]$ and priors $\\mathbf{q} = [0.5, 0.25, 0.25]$. The implied multinomial logit has $\\alpha_k = \\log q_k - \\frac{1}{2}\\mu_k^2$ and slopes $\\beta_k = \\mu_k$. Compute the log odds $\\log\\{\\Pr(y = 3 \\mid x)/\\Pr(y = 1 \\mid x)\\}$ at $x = 1.5$. Give $4$ decimal places.",
    0.3069),
  m(MN, "apply-identifiability", 8, "In $\\pi_k = e^{\\mathbf{x}^{\\top}\\boldsymbol{\\beta}_k}/\\sum_l e^{\\mathbf{x}^{\\top}\\boldsymbol{\\beta}_l}$, why must one $\\boldsymbol{\\beta}_K$ be fixed at $\\mathbf{0}$?",
    "Adding the same vector to every $\\boldsymbol{\\beta}_k$ leaves every probability unchanged, so only the differences $\\boldsymbol{\\beta}_k - \\boldsymbol{\\beta}_K$ are identified", [
      ["To make the Hessian diagonal", "The constraint fixes identification, not the Hessian’s structure."],
      ["Because the reference category has no observations", "The reference has data; its coefficients are just not separately identified."],
      ["To force the probabilities to sum to one", "The softmax sums to one for any $\\boldsymbol{\\beta}$."],
    ]),
  s(MN, "explain-elasticities", 8,
    "In a conditional logit with price coefficient $\\beta$, derive the own-price derivative $\\partial\\pi_k/\\partial\\,\\text{price}_k$ and the cross-price derivative $\\partial\\pi_k/\\partial\\,\\text{price}_l$, and explain what the cross-price result implies about substitution patterns.",
    "Derives $\\partial\\pi_k/\\partial\\,\\text{price}_k = \\beta\\pi_k(1 - \\pi_k)$ and $\\partial\\pi_k/\\partial\\,\\text{price}_l = -\\beta\\pi_k\\pi_l$ by differentiating the softmax.",
    "Explains that the cross-price elasticity $-\\beta\\,\\text{price}_l\\,\\pi_l$ is the same for every $k \\ne l$: a price rise for $l$ draws customers from all other alternatives in proportion to their shares, which is IIA again and rules out closer substitution between similar options."),

  // level 9
  s(MN, "transfer-karolinska", 9,
    "In Ding’s Karolinska case study, survival after cardia cancer is recorded as $1$, $2$–$4$ or $5{+}$ years and modelled with a multinomial logit and with a proportional odds model. Which would you prefer, and why?",
    "Prefers the proportional odds model when its assumption holds: it uses the ordering, needs one slope per covariate instead of $K - 1$, and gives a single interpretable shift toward longer survival.",
    "Notes the trade-off: the multinomial logit is more flexible and should be used, or compared, if covariates affect the categories non-monotonically (for example, raising both the shortest and longest survival), as a check of the proportional odds restriction."),
  n(MN, "apply-price-change", 9,
    "Conditional logit for three fishing modes with utility $V_k = -0.025\\,\\text{price}_k + 0.8\\,\\text{catch}_k$. Prices are $[20, 30, 50]$ dollars and catch rates $[0.2, 0.5, 1.0]$. Mode $3$’s price rises by $\\$10$. By how much does the probability of choosing mode $1$ increase? Give $4$ decimal places.",
    0.0255),
  m(MN, "apply-relax-iia", 9, "Which model relaxes IIA while keeping a random-utility interpretation?",
    "Nested logit or multinomial probit, which allow correlated utility errors across similar alternatives", [
      ["Adding more covariates to the conditional logit", "With IID Gumbel errors the odds ratio still involves only the two alternatives."],
      ["Changing the reference category", "The reference is a parametrisation choice and changes no predictions."],
      ["The proportional odds model", "That is for ordered outcomes, not choice among alternatives."],
    ]),
  s(MN, "explain-irls", 9,
    "Describe how Newton’s method for the multinomial logit can be written as iteratively reweighted least squares.",
    "Notes that the Newton step is $\\boldsymbol{\\beta}^{\\text{new}} = \\boldsymbol{\\beta}^{\\text{old}} + \\mathcal{I}^{-1}\\,\\text{score}$, where the score stacks $\\sum_i \\mathbf{x}_i\\{\\mathbb{1}(y_i = k) - \\pi_{ik}\\}$ and the information has blocks $\\sum_i W_{i,kl}\\mathbf{x}_i\\mathbf{x}_i^{\\top}$ with $W_i = \\text{diag}(\\boldsymbol{\\pi}_i) - \\boldsymbol{\\pi}_i\\boldsymbol{\\pi}_i^{\\top}$.",
    "Rewrites the step as a weighted least-squares fit of a working response $\\boldsymbol{\\eta}_i + W_i^{-1}(\\mathbf{y}_i - \\boldsymbol{\\pi}_i)$ on the stacked design, with the $(K-1) \\times (K-1)$ weight matrix $W_i$ per unit, as in binary logistic IRLS."),

  // level 10
  s(MN, "transfer-po-crossing", 10,
    "Separate binary logits for $\\mathbb{1}(y \\le 1)$ and $\\mathbb{1}(y \\le 2)$ can give fitted cumulative probabilities that cross, with $\\Pr(y \\le 1) > \\Pr(y \\le 2)$ at some $\\mathbf{x}$. Why can’t this happen in the proportional odds model, and what does that cost?",
    "Explains that with one $\\boldsymbol{\\beta}$ and ordered cutpoints $\\alpha_1 < \\alpha_2$, $\\alpha_1 - \\mathbf{x}^{\\top}\\boldsymbol{\\beta} < \\alpha_2 - \\mathbf{x}^{\\top}\\boldsymbol{\\beta}$ for every $\\mathbf{x}$, so the cumulative curves are parallel on the logit scale and never cross (the latent-variable form guarantees this).",
    "Notes the cost: effects are forced to be the same at every threshold, so genuine threshold-specific effects are averaged away; non-parallel models must enforce ordering explicitly or restrict where they are used."),
  s(MN, "transfer-reference-choice", 10,
    "A colleague reports that switching the reference category of a multinomial logit “changed all the results”. What actually changes, what doesn’t, and how would you present the model?",
    "Explains that the predicted probabilities and the likelihood are identical; only the parametrisation changes, with $\\boldsymbol{\\beta}_k - \\boldsymbol{\\beta}_{\\text{ref}}$ re-expressed against a new reference, so significance of individual coefficients can change because they answer different contrasts.",
    "Recommends presenting reference-free quantities, such as predicted probabilities or average marginal effects on each category, or choosing a substantively meaningful reference and saying so."),
  n(MN, "apply-change-reference", 10,
    "With category $3$ as reference a covariate has $\\beta_1 = 0.8$ and $\\beta_2 = 0.3$. Re-express the model with category $2$ as reference. What is the covariate’s new coefficient for category $3$?",
    -0.3),
  m(MN, "transfer-alternative-constants", 10, "In a conditional logit you want each alternative (beach, pier, boat, charter) to have its own baseline appeal. Since a common intercept cancels, you should:",
    "Add alternative-specific constants: $K - 1$ dummies for the alternatives, each with its own coefficient", [
      ["Add an intercept to every utility", "A common intercept cancels from every choice probability."],
      ["Add income with a common coefficient", "An individual-level covariate with a common coefficient also cancels."],
      ["Nothing; baseline appeal is not identifiable", "Differences in baseline appeal are identified through alternative-specific constants."],
    ]),
];
