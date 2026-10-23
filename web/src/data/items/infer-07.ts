import type { Item } from "../../lib/assessment/types";
import { m, mcq, num, short } from "./infer-shared";

/**
 * Performative prediction. Sixty questions, six at each level, matching the
 * machine-learning course's pool size. Most calculations use a location family:
 * deploying $\theta$ makes $Z$ have mean $\mu + \varepsilon\theta$.
 */

const PF = "performative-prediction";
const LOC = "Deploying $\\theta$ makes $Z$ have mean $\\mu + \\varepsilon\\theta$.";
const SQ = `${LOC} The loss is $\\ell(z; \\theta) = \\frac{1}{2}(z - \\theta)^{2}$.`;
const LIN = `${LOC} The loss is $\\ell(z; \\theta) = -\\theta z + \\frac{\\theta^{2}}{2}$.`;

const performative: Item[] = [
  // level 1
  mcq(m(PF, "recall-distribution-map", "recall", 1, 15, "In performative prediction, the distribution map $\\mathcal{D}(\\theta)$ gives:"),
    "The data distribution that arises when model $\\theta$ is deployed",
    [
      ["The model's predicted distribution of labels", "pf-map-predictive", "It is the real-world data distribution, not a model output."],
      ["The training distribution, fixed in advance", "pf-map-fixed", "The point is that it depends on $\\theta$."],
      ["The distribution of model parameters", "pf-map-posterior", "It is a distribution over data."],
    ]),
  mcq(m(PF, "recall-performative-risk", "recall", 1, 15, "The performative risk of $\\theta$ is:"),
    "$\\mathbb{E}_{Z \\sim \\mathcal{D}(\\theta)}[\\ell(Z; \\theta)]$",
    [
      ["$\\mathbb{E}_{Z \\sim \\mathcal{D}(\\theta_0)}[\\ell(Z; \\theta)]$ for a fixed $\\theta_0$", "pf-risk-fixed", "That ignores the shift $\\theta$ induces."],
      ["The training loss", "pf-risk-training", "Training loss is on past data."],
      ["$\\ell(\\mathbb{E}[Z]; \\theta)$", "pf-risk-plugin", "Loss of the mean is not the mean loss."],
    ]),
  mcq(m(PF, "recall-stable", "recall", 1, 15, "A model $\\theta_{\\text{PS}}$ is performatively stable if:"),
    "It minimises the loss on the distribution it itself induces, so retraining returns it",
    [
      ["It minimises performative risk", "pf-stable-optimal", "That is performative optimality."],
      ["Its predictions never change", "pf-stable-constant", "Stability is a fixed-point property of retraining."],
      ["It has zero loss", "pf-stable-zero", "Stable models can have positive loss."],
    ]),
  mcq(m(PF, "recall-optimal", "recall", 1, 15, "A performatively optimal model:"),
    "Minimises $\\text{PR}(\\theta)$, accounting for the shift it causes",
    [
      ["Is any fixed point of retraining", "pf-optimal-stable", "That defines stability."],
      ["Is the model trained on the first dataset", "pf-optimal-first", "That ignores performativity."],
      ["Always equals the stable model", "pf-optimal-equal", "They usually differ."],
    ]),
  mcq(m(PF, "recall-sensitivity", "recall", 1, 15, "$\\varepsilon$-sensitivity of the distribution map means:"),
    "$W_1\\left(\\mathcal{D}(\\theta), \\mathcal{D}(\\theta')\\right) \\le \\varepsilon\\|\\theta - \\theta'\\|$",
    [
      ["The loss is $\\varepsilon$-Lipschitz", "pf-sens-loss", "It is a property of the distribution map."],
      ["The model is $\\varepsilon$-accurate", "pf-sens-accuracy", "Unrelated to accuracy."],
      ["$\\mathcal{D}(\\theta)$ has variance $\\varepsilon$", "pf-sens-variance", "It bounds how far distributions move."],
    ]),
  mcq(m(PF, "recall-rrm", "recall", 1, 15, "Repeated risk minimisation (RRM) is:"),
    "Deploy $\\theta_t$, collect data from $\\mathcal{D}(\\theta_t)$, set $\\theta_{t+1}$ to the risk minimiser on that data, repeat",
    [
      ["Minimising the same risk several times with different seeds", "pf-rrm-seeds", "The data change between rounds."],
      ["Gradient descent on the performative risk", "pf-rrm-gd", "RRM ignores the dependence of $\\mathcal{D}$ on $\\theta$."],
      ["Choosing the best of several models", "pf-rrm-select", "It is an iterative retraining loop."],
    ]),
  // level 2
  num(m(PF, "apply-rrm-step1", "apply", 2, 20, `${SQ} RRM sets $\\theta_{t+1} = \\mu + \\varepsilon\\theta_t$. With $\\mu = 2$, $\\varepsilon = 0.5$ and $\\theta_0 = 0$, find $\\theta_1$.`), 2),
  num(m(PF, "apply-rrm-step2", "apply", 2, 20, "Continuing ($\\mu = 2$, $\\varepsilon = 0.5$, $\\theta_1 = 2$), find $\\theta_2$."), 3),
  num(m(PF, "apply-contraction-factor", "apply", 2, 20, "RRM contracts by the factor $\\frac{\\varepsilon\\beta}{\\gamma}$. Find it for $\\varepsilon = 0.2$, $\\beta = 1$, $\\gamma = 2$."), 0.1),
  num(m(PF, "apply-threshold", "apply", 2, 20, "RRM is guaranteed to converge when $\\varepsilon < \\frac{\\gamma}{\\beta}$. Find this threshold for $\\gamma = 3$, $\\beta = 2$."), 1.5),
  mcq(m(PF, "apply-example", "apply", 2, 20, "Which is an example of performativity?"),
    "A credit model's cutoffs lead applicants to change how they report income",
    [
      ["Sensor drift in a factory", "pf-example-drift", "The model did not cause it."],
      ["Seasonal changes in sales", "pf-example-season", "Exogenous shift."],
      ["A change of measurement units", "pf-example-units", "Not caused by the predictions."],
    ]),
  mcq(m(PF, "apply-eps-zero", "apply", 2, 20, "When $\\varepsilon = 0$:"),
    "Deployment does not affect the data, and stable and optimal models coincide with the ordinary risk minimiser",
    [
      ["RRM never converges", "pf-eps0-diverge", "It converges in one step."],
      ["Performative risk is undefined", "pf-eps0-undefined", "It equals the ordinary risk."],
      ["Stable models do not exist", "pf-eps0-none", "The ordinary minimiser is stable."],
    ]),
  // level 3
  num(m(PF, "apply-ps-sq", "apply", 3, 30, `${SQ} With $\\mu = 3$ and $\\varepsilon = 0.25$, find the stable point $\\theta_{\\text{PS}} = \\frac{\\mu}{1 - \\varepsilon}$.`), 4),
  num(m(PF, "apply-ps-lin", "apply", 3, 30, `${LIN} RRM gives $\\theta_{t+1} = \\mathbb{E}_{\\theta_t}[Z]$. With $\\mu = 1$ and $\\varepsilon = 0.5$, find $\\theta_{\\text{PS}}$.`), 2),
  num(m(PF, "apply-po-lin", "apply", 3, 30, `${LIN} Here $\\text{PR}(\\theta) = -\\mu\\theta + \\left(\\frac{1}{2} - \\varepsilon\\right)\\theta^{2}$. With $\\mu = 1$ and $\\varepsilon = 0.25$, find $\\theta_{\\text{PO}}$.`), 2),
  num(m(PF, "apply-error-decay", "apply", 3, 25, "RRM's distance to the stable point is $8$ and the contraction factor is $0.5$. Find the distance after $3$ more rounds (worst case)."), 1),
  mcq(m(PF, "apply-ps-vs-po", "apply", 3, 25, "In general, the stable model and the optimal model:"),
    "Differ, though they are close when $\\varepsilon$ is small",
    [
      ["Are always identical", "pf-psvpo-identical", "They coincide only in special cases."],
      ["Are far apart when $\\varepsilon$ is small", "pf-psvpo-far", "The gap shrinks with $\\varepsilon$."],
      ["Cannot both exist", "pf-psvpo-exist", "Both can exist."],
    ]),
  mcq(m(PF, "apply-validation", "apply", 3, 25, "A model's accuracy on a pre-deployment test set:"),
    "Measures performance on the old distribution, not the one the model will induce",
    [
      ["Exactly predicts deployed accuracy", "pf-valid-exact", "Deployment shifts the data."],
      ["Is always too pessimistic", "pf-valid-pessimistic", "The shift can go either way."],
      ["Becomes irrelevant once $\\varepsilon > 0$", "pf-valid-irrelevant", "It is informative but biased."],
    ]),
  // level 4
  num(m(PF, "apply-pr-value", "apply", 4, 35, `${LIN} With $\\mu = 1$ and $\\varepsilon = 0.25$, find $\\text{PR}(1) = -1 \\cdot (\\mu + \\varepsilon \\cdot 1) + \\frac{1}{2}$.`), -0.75),
  num(m(PF, "apply-rounds-needed", "apply", 4, 35, "RRM contracts by $0.5$ per round from an initial distance of $1$. How many rounds guarantee a distance of at most $0.01$?"), 7),
  num(m(PF, "apply-w1-shift", "apply", 4, 30, "Changing $\\theta$ by $2$ shifts the distribution's location by $\\varepsilon$ times that, with $\\varepsilon = 0.3$. Find the Wasserstein-1 distance between the two distributions."), 0.6),
  num(m(PF, "apply-gap-bound", "apply", 4, 30, "Find the bound $\\frac{2L\\varepsilon}{\\gamma}$ on $\\|\\theta_{\\text{PO}} - \\theta_{\\text{PS}}\\|$ for $L = 1$, $\\varepsilon = 0.1$, $\\gamma = 1$."), 0.2),
  mcq(m(PF, "apply-strong-convexity", "apply", 4, 35, "RRM's convergence guarantee needs the loss to be strongly convex in $\\theta$ because:"),
    "Without it, retraining can oscillate or fail to converge even for tiny $\\varepsilon$",
    [
      ["Otherwise the loss has no gradient", "pf-sc-gradient", "Convex losses have (sub)gradients."],
      ["It makes $\\varepsilon$ zero", "pf-sc-eps", "$\\varepsilon$ is a property of the world."],
      ["It guarantees zero loss", "pf-sc-zero", "Unrelated."],
    ]),
  mcq(m(PF, "apply-rgd", "apply", 4, 35, "Repeated gradient descent differs from RRM in that it:"),
    "Takes one gradient step per deployment rather than retraining to optimality",
    [
      ["Optimises the performative risk", "pf-rgd-po", "It still converges to stability, not optimality."],
      ["Needs no data", "pf-rgd-nodata", "Each step uses data from the current deployment."],
      ["Never converges", "pf-rgd-diverge", "It converges for small enough $\\varepsilon$."],
    ]),
  // level 5
  short(m(PF, "explain-ps-not-po", "explain", 5, 150, "Why does a performatively stable model generally fail to be performatively optimal?"),
    [
      ["ignores-lever", "Retraining treats the current distribution as fixed, ignoring how changing $\\theta$ would move the distribution", 2, true],
      ["optimal-uses", "The optimal model also accounts for the effect of $\\theta$ on the data, which can lower the loss further", 2, true],
    ]),
  num(m(PF, "apply-pr-at-ps", "apply", 5, 40, `${LIN} With $\\mu = 1$ and $\\varepsilon = 0.25$, $\\theta_{\\text{PS}} = \\frac{4}{3}$. Find $\\text{PR}(\\theta_{\\text{PS}}) = -\\mu\\theta + \\left(\\frac{1}{2} - \\varepsilon\\right)\\theta^{2}$. Give $4$ decimal places.`), -0.8889),
  num(m(PF, "apply-pr-at-po", "apply", 5, 35, "Same setting, $\\theta_{\\text{PO}} = 2$. Find $\\text{PR}(\\theta_{\\text{PO}})$."), -1),
  num(m(PF, "apply-pr-gap", "apply", 5, 35, "Same setting. How much lower is $\\text{PR}(\\theta_{\\text{PO}})$ than $\\text{PR}(\\theta_{\\text{PS}})$? Give $4$ decimal places."), 0.1111),
  mcq(m(PF, "apply-gradient-term", "apply", 5, 35, "The gradient of performative risk has an extra term beyond $\\mathbb{E}_{\\mathcal{D}(\\theta)}[\\nabla_{\\theta}\\ell]$. It captures:"),
    "How changing $\\theta$ reshapes the data distribution, weighted by the loss",
    [
      ["Regularisation", "pf-grad-reg", "No penalty is involved."],
      ["Noise in the gradient estimate", "pf-grad-noise", "It is a deterministic term in the true gradient."],
      ["The learning rate", "pf-grad-lr", "Unrelated."],
    ]),
  mcq(m(PF, "apply-strategic", "apply", 5, 35, "In strategic classification, agents change their features to obtain a positive decision. Relative to the non-strategic optimum, the deployed threshold should typically be:"),
    "Raised (or features reweighted) to anticipate gaming",
    [
      ["Left unchanged", "pf-strat-same", "That ignores manipulation."],
      ["Lowered", "pf-strat-lower", "Lowering invites more false positives."],
      ["Randomised uniformly", "pf-strat-random", "Not the standard response."],
    ]),
  // level 6
  short(m(PF, "explain-contraction", "explain", 6, 180, "Explain why RRM converges when $\\varepsilon < \\frac{\\gamma}{\\beta}$."),
    [
      ["distribution-moves", "Changing $\\theta$ by $\\delta$ moves the distribution by at most $\\varepsilon\\delta$", 1, true],
      ["minimiser-moves", "Strong convexity and smoothness imply the risk minimiser moves by at most $\\frac{\\beta}{\\gamma}$ times the distribution shift", 2, true],
      ["contraction", "So the retraining map is a contraction with factor $\\frac{\\varepsilon\\beta}{\\gamma} < 1$, converging to a unique fixed point", 2, true],
    ]),
  short(m(PF, "explain-vs-shift", "explain", 6, 150, "How does performative shift differ from ordinary distribution shift?"),
    [
      ["endogenous", "Performative shift is caused by the deployed model itself (endogenous); ordinary shift comes from outside", 2, true],
      ["consequence", "So it can be anticipated, controlled or optimised over, and the deployer bears some responsibility", 2, true],
    ]),
  num(m(PF, "apply-diverge", "apply", 6, 40, `${SQ} With $\\mu = 1$ and $\\varepsilon = 1.5$, RRM gives $\\theta_{t+1} = 1 + 1.5\\theta_t$. From $\\theta_0 = 0$, find $\\theta_3$.`), 4.75),
  num(m(PF, "apply-rgd-step", "apply", 6, 40, `${SQ} Repeated gradient descent: $\\theta_{t+1} = \\theta_t - \\eta\\left(\\theta_t - \\mathbb{E}_{\\theta_t}[Z]\\right)$. With $\\eta = 0.5$, $\\mu = 2$, $\\varepsilon = 0.5$ and $\\theta_0 = 0$, find $\\theta_1$.`), 1),
  mcq(m(PF, "apply-merely-convex", "apply", 6, 40, "With a convex but not strongly convex loss, RRM:"),
    "May fail to converge, even when $\\varepsilon$ is small",
    [
      ["Always converges faster", "pf-convex-faster", "Strong convexity is what drives contraction."],
      ["Converges to the optimum", "pf-convex-optimum", "RRM targets stability, if anything."],
      ["Is unaffected", "pf-convex-same", "The guarantee needs strong convexity."],
    ]),
  mcq(m(PF, "apply-sq-equal", "apply", 6, 40, `${SQ} In this example, $\\theta_{\\text{PS}}$ and $\\theta_{\\text{PO}}$:`),
    "Coincide at $\\frac{\\mu}{1 - \\varepsilon}$, since $\\text{PR}$ is minimised where $\\mathbb{E}_{\\theta}[Z] = \\theta$",
    [
      ["Differ by $\\varepsilon$", "pf-sqeq-eps", "Here they coincide."],
      ["Are both $\\mu$", "pf-sqeq-mu", "The shift moves them away from $\\mu$."],
      ["Do not exist", "pf-sqeq-none", "Both exist for $\\varepsilon < 1$."],
    ]),
  // level 7
  short(m(PF, "derive-gradient", "explain", 7, 210, "Derive the performative risk gradient $\\nabla\\text{PR}(\\theta) = \\mathbb{E}[\\nabla_{\\theta}\\ell] + \\mathbb{E}[\\ell\\,\\nabla_{\\theta}\\log p_{\\theta}(Z)]$ for a density $p_{\\theta}$."),
    [
      ["integral", "Write $\\text{PR}(\\theta) = \\int \\ell(z; \\theta)\\,p_{\\theta}(z)\\,dz$ and differentiate under the integral", 2, true],
      ["product-rule", "The product rule gives $\\int \\nabla_{\\theta}\\ell\\,p_{\\theta} + \\int \\ell\\,\\nabla_{\\theta}p_{\\theta}$", 1, true],
      ["score", "Use $\\nabla p_{\\theta} = p_{\\theta}\\nabla\\log p_{\\theta}$ to write the second term as an expectation", 2, true],
    ]),
  short(m(PF, "explain-estimate-eps", "explain", 7, 180, "How could a platform estimate how strongly its model shifts user behaviour, in order to optimise rather than merely retrain?"),
    [
      ["perturb", "Deploy small deliberate perturbations of $\\theta$ (e.g. randomised to user groups) and measure the induced change in the data", 2, true],
      ["model", "Fit a model of the distribution map (e.g. location family slope $\\varepsilon$) and plug it into the performative risk", 2, true],
      ["optimise", "Minimise the estimated performative risk; repeat as needed", 1],
    ]),
  num(m(PF, "apply-estimate-eps", "apply", 7, 40, `${LOC} Deploying $\\theta = 1$ gives mean $3.2$; deploying $\\theta = 2$ gives mean $3.5$. Estimate $\\varepsilon$.`), 0.3),
  num(m(PF, "apply-estimate-po", "apply", 7, 50, `${LIN} From deployments, $\\mu = 2.9$ and $\\varepsilon = 0.3$. Find $\\theta_{\\text{PO}} = \\frac{\\mu}{1 - 2\\varepsilon}$.`), 7.25),
  mcq(m(PF, "apply-two-stage", "apply", 7, 45, "A “two-stage” approach to performative optimality:"),
    "First learns a model of the distribution map, then optimises the performative risk under that model",
    [
      ["Retrains twice per round", "pf-twostage-retrain", "That is still RRM."],
      ["Uses two separate loss functions", "pf-twostage-loss", "One loss; two estimation stages."],
      ["Trains on old data then new data", "pf-twostage-data", "That ignores the map."],
    ]),
  mcq(m(PF, "apply-echo", "apply", 7, 45, "A recommender retrained on clicks it caused can end in an “echo chamber” because:"),
    "Stable points reinforce the model's own influence rather than optimising the true objective",
    [
      ["Clicks are random", "pf-echo-random", "They are shaped by recommendations."],
      ["The model has too few parameters", "pf-echo-params", "Capacity is not the issue."],
      ["Users never change", "pf-echo-static", "Their changing in response is the issue."],
    ]),
  // level 8
  short(m(PF, "derive-ps-sq", "explain", 8, 180, `${SQ} Derive $\\theta_{\\text{PS}}$ and show RRM converges when $|\\varepsilon| < 1$.`),
    [
      ["rrm-map", "Minimising $\\mathbb{E}_{\\theta_t}\\left[\\frac{1}{2}(Z - \\theta)^{2}\\right]$ gives $\\theta_{t+1} = \\mathbb{E}_{\\theta_t}[Z] = \\mu + \\varepsilon\\theta_t$", 2, true],
      ["fixed-point", "The fixed point solves $\\theta = \\mu + \\varepsilon\\theta$, so $\\theta_{\\text{PS}} = \\frac{\\mu}{1 - \\varepsilon}$", 2, true],
      ["converge", "The error obeys $e_{t+1} = \\varepsilon e_t$, which shrinks to $0$ when $|\\varepsilon| < 1$", 1, true],
    ]),
  short(m(PF, "explain-performative-power", "explain", 8, 180, "What is performative power, and why might regulators care about it?"),
    [
      ["definition", "A measure of how much a firm's algorithm can change the behaviour or distribution of its users or market", 2, true],
      ["relevance", "High power signals ability to steer outcomes (and potential market dominance or harm), informing competition policy and oversight", 2, true],
    ]),
  num(m(PF, "apply-extra-term", "apply", 8, 50, `${LIN} Here $\\text{PR}'(\\theta) = -\\mu - 2\\varepsilon\\theta + \\theta$, while retraining's gradient is $-\\mu - \\varepsilon\\theta + \\theta$. With $\\mu = 2$ and $\\varepsilon = 0.25$, find the difference $-\\varepsilon\\theta$ at $\\theta_{\\text{PS}} = \\frac{8}{3}$. Give $4$ decimal places.`), -0.6667),
  num(m(PF, "apply-rounds-to-tol", "apply", 8, 45, "RRM contracts by $0.25$ per round from an initial distance of $10$. How many rounds guarantee a distance below $0.001$?"), 7),
  mcq(m(PF, "apply-multiplayer", "apply", 8, 45, "When several competing firms each retrain on data shaped by all their models, the natural solution concept is:"),
    "A Nash-type equilibrium of the induced game",
    [
      ["Each firm's performative optimum, independently", "pf-multi-independent", "Each firm's distribution depends on the others."],
      ["The average of all models", "pf-multi-average", "Not a solution concept."],
      ["Whichever firm trains last", "pf-multi-last", "Order alone does not define a solution."],
    ]),
  mcq(m(PF, "apply-label-vs-feature", "apply", 8, 45, "Traffic predictions that change which routes drivers take shift mainly:"),
    "The outcome itself (travel times), not just the features",
    [
      ["Only the features", "pf-traffic-features", "Travel times change too."],
      ["Nothing", "pf-traffic-nothing", "Drivers respond to forecasts."],
      ["Only the loss function", "pf-traffic-loss", "The loss is fixed."],
    ]),
  // level 9
  short(m(PF, "transfer-credit", "transfer", 9, 240, "A lender's credit model is gamed by applicants who inflate reported income. Describe how you would detect and respond to this performative effect."),
    [
      ["detect", "Compare feature distributions and outcomes before and after deployment or across randomised model variants", 2, true],
      ["respond", "Use features that are hard to game, model strategic responses (strategic classification), or optimise performative risk with an estimated response", 2, true],
      ["monitor", "Monitor deployed accuracy and retrain with awareness of the feedback loop", 1],
    ]),
  short(m(PF, "transfer-fairness", "transfer", 9, 240, "How can performative effects create long-term fairness problems, even if a model is fair at deployment?"),
    [
      ["feedback", "Decisions change future data and opportunities (e.g. denied loans lower future credit scores), so groups can diverge over time", 2, true],
      ["static-fails", "Static fairness metrics on a fixed test set miss these dynamics", 1, true],
      ["remedy", "Evaluate with dynamic models or simulations and consider long-term outcomes", 2],
    ]),
  num(m(PF, "apply-strategic-share", "apply", 9, 50, "Scores are $\\text{Uniform}[0, 1]$. Anyone within $0.1$ below the threshold raises their score to it. With threshold $0.6$, what fraction ends up accepted?"), 0.5),
  num(m(PF, "apply-strategic-share-2", "apply", 9, 45, "Same gaming behaviour, threshold raised to $0.7$. What fraction is accepted?"), 0.4),
  mcq(m(PF, "apply-gaming-cost", "apply", 9, 45, "In the previous example, raising the threshold by the gaming budget ($0.1$):"),
    "Restores the originally intended acceptance rate, but at a cost to honest applicants just below the new threshold",
    [
      ["Removes all errors", "pf-cost-noerrors", "Honest applicants in $[0.6, 0.7)$ are now rejected."],
      ["Has no effect", "pf-cost-noeffect", "It changes who is accepted."],
      ["Increases the acceptance rate", "pf-cost-increase", "It lowers it."],
    ]),
  mcq(m(PF, "apply-outcome-performativity", "apply", 9, 45, "Predicting a student will fail and assigning extra tutoring that prevents failure is a case where:"),
    "The prediction changes the outcome, so accuracy against observed outcomes can look poor even if the prediction was useful",
    [
      ["The model was simply wrong", "pf-tutor-wrong", "The intervention caused the change."],
      ["There is no feedback loop", "pf-tutor-noloop", "The prediction triggered the intervention."],
      ["Retraining fixes the problem", "pf-tutor-retrain", "Retraining on post-intervention data learns the wrong lesson."],
    ]),
  // level 10
  short(m(PF, "explain-sharp", "explain", 10, 300, `Explain why the condition $\\varepsilon < \\frac{\\gamma}{\\beta}$ for RRM is sharp, using the example: ${SQ}`),
    [
      ["constants", "Here $\\gamma = \\beta = 1$, so the condition is $\\varepsilon < 1$", 1, true],
      ["map", "RRM is $\\theta_{t+1} = \\mu + \\varepsilon\\theta_t$", 2, true],
      ["diverge", "For $\\varepsilon \\ge 1$ (and $\\mu \\ne 0$) the iterates do not converge, so no weaker condition could suffice in general", 2, true],
    ]),
  short(m(PF, "transfer-monitoring", "transfer", 10, 300, "You deploy a pricing model that affects demand. Design a deployment and monitoring plan that accounts for performativity."),
    [
      ["experiment", "Randomise small price perturbations to estimate the demand response (the distribution map)", 2, true],
      ["optimise", "Optimise expected revenue/loss under the estimated response rather than retraining naively", 2, true],
      ["monitor", "Track deployed metrics over time, guard against feedback loops, and update the response model", 1],
    ]),
  num(m(PF, "apply-max-eps", "apply", 10, 45, `${LIN} $\\text{PR}(\\theta) = -\\mu\\theta + \\left(\\frac{1}{2} - \\varepsilon\\right)\\theta^{2}$ has a minimiser only if $\\frac{1}{2} - \\varepsilon > 0$. Find the supremum of allowed $\\varepsilon$.`), 0.5),
  num(m(PF, "apply-ps-po-gap", "apply", 10, 50, `${LIN} With $\\mu = 1$ and $\\varepsilon = 0.25$, find $\\theta_{\\text{PO}} - \\theta_{\\text{PS}}$. Give $4$ decimal places.`), 0.6667),
  mcq(m(PF, "apply-convexity-pr", "apply", 10, 60, "Even if $\\ell(z; \\theta)$ is convex in $\\theta$, the performative risk $\\text{PR}(\\theta)$:"),
    "Need not be convex, since $\\theta$ also enters through the distribution",
    [
      ["Is always convex", "pf-prconvex-always", "The distribution's dependence can break convexity."],
      ["Is always linear", "pf-prconvex-linear", "No reason for linearity."],
      ["Is constant", "pf-prconvex-constant", "It varies with $\\theta$."],
    ]),
  mcq(m(PF, "apply-stochastic", "apply", 10, 60, "When each deployment yields only a finite sample, RRM's guarantee becomes:"),
    "Convergence to a neighbourhood of the stable point whose size shrinks with the sample size per round",
    [
      ["Exact convergence regardless of sample size", "pf-stoch-exact", "Sampling noise prevents exactness."],
      ["Divergence for any sample size", "pf-stoch-diverge", "Large samples still give approximate convergence."],
      ["Convergence to the optimum", "pf-stoch-optimum", "RRM targets stability."],
    ]),
];

export const infer07Items: Item[] = [...performative];
