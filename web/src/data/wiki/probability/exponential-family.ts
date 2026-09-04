import type { WikiArticle } from "../types";

export const exponentialFamily: WikiArticle = {
  conceptId: "exponential-family",
  summary:
    "An exponential family is a class of distributions whose density factors into a specific exponential form. Almost every distribution in routine use belongs to one, and membership is not a curiosity: it guarantees a low-dimensional sufficient statistic, conjugate priors, and the entire theory of generalised linear models.",
  sections: [
    {
      heading: "The form",
      blocks: [
        {
          kind: "formula",
          latex: "f(x \\mid \\theta) = h(x)\\,\\exp\\!\\left\\{\\sum_{i=1}^{k} \\eta_i(\\theta)\\,T_i(x) - A(\\theta)\\right\\}",
          caption: "The general exponential family form",
        },
        {
          kind: "definitions",
          items: [
            { term: "$T(x)$", description: "the sufficient statistic — the only function of the data the parameter interacts with." },
            { term: "$\\eta(\\theta)$", description: "the natural (canonical) parameter." },
            { term: "$A(\\theta)$", description: "the log-partition function, which normalises the density." },
            { term: "$h(x)$", description: "the base measure, carrying no dependence on $\\theta$." },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The defining feature is the separation",
          text: "Data and parameter meet only through the product $\\eta(\\theta)\\,T(x)$ inside the exponential. That is precisely the Fisher–Neyman factorisation, so $T(x)$ is sufficient — immediately, by inspection of the form. Everything else here follows from that separation.",
        },
      ],
    },
    {
      heading: "Members",
      blocks: [
        {
          kind: "table",
          headers: ["Distribution", "Sufficient statistic", "Natural parameter"],
          rows: [
            ["Bernoulli$(p)$", "$x$", "$\\log\\dfrac{p}{1-p}$ — the logit"],
            ["Poisson$(\\lambda)$", "$x$", "$\\log\\lambda$"],
            ["Normal$(\\mu, \\sigma^{2})$", "$(x,\\ x^{2})$", "$(\\mu/\\sigma^{2},\\ -1/(2\\sigma^{2}))$"],
            ["Exponential$(\\lambda)$", "$x$", "$-\\lambda$"],
            ["Gamma$(\\alpha,\\lambda)$", "$(\\log x,\\ x)$", "$(\\alpha - 1,\\ -\\lambda)$"],
            ["Beta$(\\alpha,\\beta)$", "$(\\log x,\\ \\log(1-x))$", "$(\\alpha-1,\\ \\beta-1)$"],
          ],
          caption:
            "The natural parameters are exactly the link functions of generalised linear models — logit for logistic regression, log for Poisson regression. That is not a coincidence.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Uniform$(0,\\theta)$ is not a member",
          text: "Its support depends on the parameter, which the form cannot express. This single exclusion explains a string of anomalies met earlier: its MLE sits on a boundary rather than at a stationary point, its sufficient statistic is $\\max X_i$ rather than a sum, and the Cramér–Rao bound does not apply to it. Whenever a standard result fails, a support depending on $\\theta$ is the first thing to check.",
        },
      ],
    },
    {
      heading: "What membership buys",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbb{E}[T(X)] = A'(\\eta), \\qquad \\operatorname{Var}(T(X)) = A''(\\eta)",
          caption: "Moments by differentiating the log-partition function",
        },
        {
          kind: "prose",
          text: "No integration is needed — differentiating $A$ generates the cumulants of the sufficient statistic. This is the same mechanism as the MGF, and it is why $A$ is called the cumulant function.",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "**Fixed-dimension sufficiency.** The sufficient statistic has the same dimension however large $n$ grows — the Pitman–Koopman–Darmois theorem says exponential families are the *only* families with this property (given a support free of $\\theta$). It is why $\\sum X_i$ suffices for a million Poisson observations.",
            "**Conjugate priors always exist**, and have a closed form obtained by reading off the same structure. Beta–binomial and gamma–Poisson are the familiar instances.",
            "**The MLE is well behaved.** The log-likelihood is concave in the natural parameter, so there is a unique maximum and no local optima — which is why logistic and Poisson regression fit reliably while neural networks do not.",
            "**Cramér–Rao is attained.** Efficient unbiased estimators exist exactly in this setting, estimating the natural parameter.",
          ],
        },
      ],
    },
    {
      heading: "Generalised linear models",
      blocks: [
        {
          kind: "prose",
          text: "A GLM assumes the response follows an exponential family and models the natural parameter as linear in the predictors, $\\eta = \\mathbf{x}^{\\top}\\boldsymbol{\\beta}$. Choosing the family fixes the link, and the whole apparatus — iteratively reweighted least squares, deviance, the asymptotic standard errors — follows from the properties above rather than being invented per model.",
        },
        {
          kind: "table",
          headers: ["Response", "Family", "Canonical link", "Model"],
          rows: [
            ["binary", "Bernoulli", "logit", "logistic regression"],
            ["count", "Poisson", "log", "Poisson regression"],
            ["continuous", "Normal", "identity", "ordinary least squares"],
            ["positive, skewed", "Gamma", "inverse (or log)", "gamma regression"],
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Casella & Berger, Statistical Inference", locator: "§3.4" },
    { source: "Wasserman, All of Statistics", locator: "§9.13" },
    { source: "McCullagh & Nelder, Generalized Linear Models", locator: "Ch. 2" },
    { source: "Mathlingo assessment bank", locator: "assessments/estimation-theory.md" },
  ],
};
