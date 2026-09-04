import type { WikiArticle } from "../types";

export const logisticRegressionWiki: WikiArticle = {
  conceptId: "logistic-regression",

  summary:
    "Logistic regression models the probability of a binary outcome as sigmoid(xᵀβ). The sigmoid " +
    "keeps predictions inside [0, 1], which a linear function cannot, and its inverse — the logit, " +
    "or log-odds — is what the linear predictor actually equals. That is not a convenient choice " +
    "of transformation: the logit is the natural parameter of the Bernoulli exponential family, so " +
    "logistic regression is modelling the natural parameter as linear in x. Coefficients are " +
    "fitted by maximum likelihood, since no closed form exists.",

  sections: [
    {
      heading: "The model",
      blocks: [
        {
          kind: "formula",
          latex: "P(Y = 1 | x) = σ(xᵀβ) = 1 / (1 + e^(−xᵀβ))",
          caption: "The logistic (sigmoid) function maps the whole real line onto (0, 1).",
        },
        {
          kind: "formula",
          latex: "logit(p) = ln( p / (1 − p) ) = xᵀβ",
          caption: "The same statement inverted: the log-odds is linear in the predictors.",
        },
        {
          kind: "prose",
          text:
            "Reading the second form is usually more useful than reading the first. The model does " +
            "not say the probability is linear in x — it says the log-odds is. The relationship " +
            "between x and the probability itself is S-shaped: nearly flat where the probability is " +
            "close to 0 or 1, steepest at p = 0.5, where a one-unit change in xⱼ moves the " +
            "probability by about βⱼ/4.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Why not just run OLS on a 0/1 outcome?",
          text:
            "A linear function is unbounded, so it will predict probabilities below 0 and above 1 " +
            "for extreme predictor values — not merely inaccurate but meaningless. The errors are " +
            "also necessarily heteroskedastic, since a Bernoulli variable has variance p(1 − p) " +
            "which depends on x, and they cannot be normal because the outcome takes two values. " +
            "The linear probability model is still occasionally used in economics for its " +
            "interpretable marginal effects, but it is a deliberate approximation, not a defensible " +
            "probability model.",
        },
      ],
    },

    {
      heading: "Odds and the interpretation of a coefficient",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Probability p", description: "In [0, 1]. What we ultimately care about." },
            { term: "Odds p/(1 − p)", description: "In (0, ∞). p = 0.8 is odds of 4, or '4 to 1 on'." },
            { term: "Log-odds ln(p/(1−p))", description: "On the whole real line. Symmetric about 0, which corresponds to p = 0.5." },
          ],
        },
        {
          kind: "prose",
          text:
            "A one-unit increase in xⱼ adds βⱼ to the log-odds, which multiplies the odds by " +
            "e^βⱼ. That multiplier is the odds ratio, and it is the standard way logistic " +
            "coefficients are reported. It has the useful property of being constant — the same " +
            "multiplier applies whatever the starting probability was — which is exactly what makes " +
            "the model additive on the log-odds scale and non-additive on the probability scale.",
        },
        {
          kind: "example",
          title: "From a coefficient to a probability",
          problem:
            "A model gives xᵀβ = 2 for a particular case, and the coefficient on age is 0.03 per " +
            "year. Find the predicted probability, and the effect of ten more years of age.",
          steps: [
            "P(Y = 1) = 1/(1 + e^(−2)) = 1/(1 + 0.1353) = 1/1.1353.",
            "Ten years adds 10(0.03) = 0.3 to the log-odds, giving xᵀβ = 2.3.",
            "The odds ratio for ten years is e^0.3 ≈ 1.35 — a 35% increase in the odds.",
            "The new probability is 1/(1 + e^(−2.3)) = 1/(1 + 0.1003).",
          ],
          answer:
            "P ≈ 0.881 at xᵀβ = 2, rising to ≈ 0.909 with ten more years. Note that the same 0.3 shift in log-odds would move a probability of 0.5 to 0.574 — a change of 7.4 points rather than 2.8. Constant on the odds scale is emphatically not constant on the probability scale.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "An odds ratio is not a risk ratio",
          text:
            "They are close when the outcome is rare — under about 10% — and diverge badly " +
            "otherwise. An odds ratio of 3 with a baseline probability of 0.4 corresponds to a risk " +
            "ratio of only about 1.7. Reporting 'three times more likely' from an odds ratio of 3 " +
            "is a standard and consequential misstatement, particularly in medical writing.",
        },
      ],
    },

    {
      heading: "Fitting by maximum likelihood",
      blocks: [
        {
          kind: "formula",
          latex: "ℓ(β) = Σᵢ [ yᵢ·xᵢᵀβ − ln(1 + e^(xᵢᵀβ)) ]",
          caption: "The Bernoulli log-likelihood. Its negative is exactly binary cross-entropy loss.",
        },
        {
          kind: "prose",
          text:
            "Setting the gradient to zero gives Xᵀ(y − p̂) = 0, which is structurally the same " +
            "orthogonality condition as the normal equations — but p̂ depends on β nonlinearly, so " +
            "the system cannot be solved in closed form. Iteratively reweighted least squares " +
            "(equivalently, Newton–Raphson) solves it by repeatedly fitting a weighted least-squares " +
            "problem, with weights p̂ᵢ(1 − p̂ᵢ), until convergence. The log-likelihood is concave, " +
            "so there is a single global maximum and convergence is fast.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Perfect separation makes the MLE diverge",
          text:
            "If some linear combination of the predictors separates the classes exactly, the " +
            "likelihood increases without bound as the coefficients grow, and the MLE does not " +
            "exist. Software typically reports enormous coefficients with enormous standard errors " +
            "and a convergence warning. The remedies are penalisation — ridge or Firth's " +
            "bias-reduced logistic regression — rather than anything about the data.",
        },
      ],
    },

    {
      heading: "Evaluating a fitted model",
      blocks: [
        {
          kind: "table",
          headers: ["Quantity", "What it measures"],
          rows: [
            ["Deviance, −2ln L̂", "The analogue of SSE; used for likelihood-ratio tests between nested models"],
            ["AIC / BIC", "Model comparison, exactly as in linear regression"],
            ["Accuracy at a 0.5 cutoff", "Often misleading — with 1% positives, predicting 'no' always scores 99%"],
            ["ROC curve and AUC", "Discrimination across every possible cutoff, independent of the class balance"],
            ["Calibration plot", "Whether predicted probabilities match observed frequencies"],
            ["Pseudo-R² (McFadden, Nagelkerke)", "Loosely analogous to R², but not a proportion of variance explained"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Discrimination and calibration are different virtues",
          text:
            "A model can rank cases perfectly — AUC of 1.0 — while every predicted probability is " +
            "far too high. It can also be beautifully calibrated and useless for ranking. Which one " +
            "matters depends on the decision: a triage system that only needs an ordering cares " +
            "about discrimination, while anything feeding a probability into a cost calculation " +
            "needs calibration.",
        },
      ],
    },

    {
      heading: "Why this generalises",
      blocks: [
        {
          kind: "prose",
          text:
            "Logistic regression is what the probabilistic view of linear regression looks like when " +
            "you swap the response distribution. Keep the linear predictor xᵀβ, replace Normal with " +
            "Bernoulli, and connect the two with the link function that the exponential family " +
            "supplies as its natural parameter. Nothing else about the framework changes — which is " +
            "why the same iteratively reweighted least squares routine fits linear, logistic, and " +
            "Poisson regression with only the weights and the link changing. That observation is the " +
            "content of the GLM framework, and logistic regression is its most-used instance.",
        },
      ],
    },
  ],

  references: [
    { source: "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning", locator: "§4.3, Logistic Regression" },
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning", locator: "§4.4, Logistic Regression" },
    { source: "Bishop, Pattern Recognition and Machine Learning", locator: "§4.3, Probabilistic Discriminative Models" },
    { source: "Mathlingo assessment bank", locator: "assessments/reg-05-generalized-and-special-regression.md" },
  ],
};
