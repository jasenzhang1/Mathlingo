import type { WikiArticle } from "../types";

const performativePrediction: WikiArticle = {
  conceptId: "performative-prediction",

  summary:
    "Some predictions change what they predict. A credit-scoring model changes how applicants fill in forms; a traffic forecast changes " +
    "which roads people take; a recommender shapes the tastes it is trained on. Performative prediction (Perdomo, Zrnic, Mendler-Dünner, " +
    "Hardt, 2020) models this with a distribution map $\\mathcal{D}(\\theta)$: deploying parameters $\\theta$ induces the data distribution " +
    "$\\mathcal{D}(\\theta)$. It separates two goals — a stable model that is optimal for the data it creates, and an optimal model that " +
    "minimises loss after accounting for the shift it causes — and gives conditions under which the familiar loop of retraining on new data converges.",

  sections: [
    {
      heading: "Performative risk, stability and optimality",
      blocks: [
        {
          kind: "formula",
          latex: "\\text{PR}(\\theta) = \\mathbb{E}_{Z \\sim \\mathcal{D}(\\theta)}\\left[ \\ell(Z; \\theta) \\right]",
          caption: "Performative risk: the loss of $\\theta$ on the distribution that $\\theta$ itself induces",
        },
        {
          kind: "definitions",
          items: [
            { term: "Performatively optimal", description: "$\\theta_{\\text{PO}} = \\arg\\min_{\\theta} \\text{PR}(\\theta)$ — best loss once the induced shift is accounted for." },
            { term: "Performatively stable", description: "$\\theta_{\\text{PS}} = \\arg\\min_{\\theta} \\mathbb{E}_{Z \\sim \\mathcal{D}(\\theta_{\\text{PS}})}\\left[ \\ell(Z; \\theta) \\right]$ — a fixed point: retraining on the data it produced returns the same model." },
            { term: "$\\varepsilon$-sensitivity", description: "$W_1\\left(\\mathcal{D}(\\theta), \\mathcal{D}(\\theta')\\right) \\le \\varepsilon \\|\\theta - \\theta'\\|$: a small change in the model moves the distribution by at most $\\varepsilon$ times as much (Wasserstein-1 distance)." },
          ],
        },
        {
          kind: "prose",
          text:
            "Stability is what naive retraining aims for; optimality is what the deployer actually wants. They generally differ because a stable model " +
            "ignores the lever it holds over the distribution. When $\\varepsilon = 0$ the map is constant and both reduce to ordinary risk minimisation.",
        },
      ],
    },

    {
      heading: "Repeated risk minimisation",
      blocks: [
        {
          kind: "formula",
          latex: "\\theta_{t+1} = \\arg\\min_{\\theta} \\; \\mathbb{E}_{Z \\sim \\mathcal{D}(\\theta_t)}\\left[ \\ell(Z; \\theta) \\right]",
          caption: "RRM: deploy, collect data, retrain to optimality, repeat",
        },
        {
          kind: "prose",
          text:
            "If the loss is $\\gamma$-strongly convex in $\\theta$, its gradient is $\\beta$-Lipschitz jointly in $(z, \\theta)$, and the map is $\\varepsilon$-sensitive, then",
        },
        {
          kind: "formula",
          latex: "\\|\\theta_{t+1} - \\theta_{\\text{PS}}\\| \\le \\frac{\\varepsilon \\beta}{\\gamma} \\|\\theta_t - \\theta_{\\text{PS}}\\|",
          caption: "Linear convergence to the unique stable point whenever $\\varepsilon < \\frac{\\gamma}{\\beta}$",
        },
        {
          kind: "prose",
          text:
            "The condition is sharp: for $\\varepsilon \\ge \\frac{\\gamma}{\\beta}$ there are examples where RRM diverges. Strong convexity is essential — with merely " +
            "convex losses retraining can oscillate forever. Repeated gradient descent (one gradient step per deployment instead of a full refit) also converges, " +
            "under a somewhat stricter bound on $\\varepsilon$. Stable points are close to optimal ones: $\\|\\theta_{\\text{PO}} - \\theta_{\\text{PS}}\\| \\le \\frac{2 L \\varepsilon}{\\gamma}$ " +
            "when the loss is $L$-Lipschitz in $z$.",
        },
      ],
    },

    {
      heading: "A worked example",
      blocks: [
        {
          kind: "example",
          title: "Stable is not optimal",
          problem:
            "Under $\\theta$, $Z$ has mean $\\mu + \\varepsilon\\theta$. The loss is $\\ell(z; \\theta) = -\\theta z + \\frac{\\theta^{2}}{2}$. With $\\mu = 1$, $\\varepsilon = 0.25$, " +
            "find $\\theta_{\\text{PS}}$, $\\theta_{\\text{PO}}$ and the RRM update.",
          steps: [
            "RRM: minimising $-\\theta\\,\\mathbb{E}[Z] + \\frac{\\theta^{2}}{2}$ gives $\\theta_{t+1} = \\mathbb{E}_{\\theta_t}[Z] = \\mu + \\varepsilon\\theta_t$, a contraction with factor $\\varepsilon = 0.25$.",
            "Fixed point: $\\theta_{\\text{PS}} = \\frac{\\mu}{1 - \\varepsilon} = \\frac{4}{3}$.",
            "$\\text{PR}(\\theta) = -\\theta(\\mu + \\varepsilon\\theta) + \\frac{\\theta^{2}}{2} = -\\mu\\theta + \\left(\\frac{1}{2} - \\varepsilon\\right)\\theta^{2}$, minimised at $\\theta_{\\text{PO}} = \\frac{\\mu}{1 - 2\\varepsilon} = 2$.",
            "$\\text{PR}(\\theta_{\\text{PS}}) = -\\frac{4}{3} + \\frac{1}{4} \\cdot \\frac{16}{9} \\approx -0.889$ versus $\\text{PR}(\\theta_{\\text{PO}}) = -2 + 1 = -1$.",
          ],
          answer: "Retraining settles at $\\frac{4}{3}$, but $2$ does better because it accounts for pushing the mean up.",
        },
      ],
    },

    {
      heading: "Reaching optimality, and where it shows up",
      blocks: [
        {
          kind: "formula",
          latex: "\\nabla \\text{PR}(\\theta) = \\mathbb{E}_{Z \\sim \\mathcal{D}(\\theta)}\\left[ \\nabla_{\\theta} \\ell(Z; \\theta) \\right] + \\mathbb{E}_{Z \\sim \\mathcal{D}(\\theta)}\\left[ \\ell(Z; \\theta) \\, \\nabla_{\\theta} \\log p_{\\theta}(Z) \\right]",
          caption: "The second term — the effect through the distribution — is exactly what retraining drops",
        },
        {
          kind: "prose",
          text:
            "Optimising PR needs some knowledge of how $\\mathcal{D}$ responds: a model of the shift (e.g. a location family $Z = Z_0 + \\varepsilon\\theta$ whose $\\varepsilon$ is " +
            "estimated from deliberate small perturbations of the deployed model), or derivative-free optimisation that treats deployments as function evaluations.",
        },
        {
          kind: "table",
          headers: ["Setting", "How the model moves the data"],
          rows: [
            ["Strategic classification", "Applicants change features to cross the decision threshold"],
            ["Recommender systems", "Recommendations shape the clicks used for retraining"],
            ["Predictive policing", "Patrols go where crime is predicted, so more crime is recorded there"],
            ["Traffic and pricing forecasts", "Users respond to the forecast itself"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Validation lies under performativity",
          text:
            "A held-out test set drawn before deployment measures risk on $\\mathcal{D}(\\theta_{\\text{old}})$, not on the distribution the new model will create. " +
            "Offline accuracy can rise while deployed performance falls.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Shift you cause versus shift that happens",
          text:
            "Ordinary distribution shift is exogenous; performative shift is endogenous, which makes it partly predictable and controllable — " +
            "and makes the deployer partly responsible for it.",
        },
      ],
    },
  ],

  references: [
    { source: "Perdomo, Zrnic, Mendler-Dünner, Hardt, Performative Prediction (ICML 2020)", locator: "definitions, repeated risk minimisation, repeated gradient descent" },
    { source: "Miller, Perdomo, Zrnic, Outside the Echo Chamber: Optimizing the Performative Risk (ICML 2021)", locator: "location families and convexity of PR" },
    { source: "Hardt, Megiddo, Papadimitriou, Wootters, Strategic Classification (ITCS 2016)", locator: "strategic responses to classifiers" },
  ],
};

export const performativePredictionWikis: WikiArticle[] = [performativePrediction];
