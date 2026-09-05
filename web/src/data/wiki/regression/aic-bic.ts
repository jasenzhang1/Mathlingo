import type { WikiArticle } from "../types";

export const aicBicWiki: WikiArticle = {
  conceptId: "aic-bic",

  summary:
    "AIC and BIC score a model by its maximised likelihood minus a penalty for how many parameters " +
    "it used. They look almost identical — AIC = 2k − 2ln L̂, BIC = k·ln(n) − 2ln L̂ — and differ " +
    "in exactly one place: BIC's per-parameter penalty grows with the sample size while AIC's is " +
    "fixed at 2. That single difference gives them different asymptotic behaviour and different " +
    "jobs. AIC targets predictive accuracy; BIC targets identifying the true model.",

  sections: [
    {
      heading: "The two criteria",
      blocks: [
        {
          kind: "formula",
          latex: "AIC = 2k − 2 ln L̂       BIC = k·ln(n) − 2 ln L̂",
          caption: "Lower is better in both. k counts every estimated parameter, σ² included.",
        },
        {
          kind: "prose",
          text:
            "The −2 ln L̂ term is the deviance: it falls as the fit improves, and it is the same " +
            "quantity for both criteria. The other term is the price of the parameters that bought " +
            "that improvement. Because more parameters always raise the likelihood — for exactly the " +
            "reason R² always rises — a raw likelihood comparison always picks the biggest model, " +
            "and the penalty is what makes the comparison meaningful.",
        },
        {
          kind: "prose",
          text:
            "Under normal errors the deviance has a closed form, and for linear models the criteria " +
            "reduce to something computable directly from SSE: AIC = n·ln(SSE/n) + 2k + constant, " +
            "with ln(n)·k in place of 2k for BIC. The constant is the same for every model fitted to " +
            "the same data, so it drops out of any comparison.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Only differences are meaningful",
          text:
            "An AIC of −412 means nothing on its own — different software includes different " +
            "additive constants, so the same model can score differently in two packages. What is " +
            "comparable is ΔAIC between models fitted to the same response on the same rows. A " +
            "common convention reads Δ < 2 as essentially equivalent, 4–7 as considerably weaker, " +
            "and > 10 as decisive.",
        },
      ],
    },

    {
      heading: "The one difference that matters",
      blocks: [
        {
          kind: "table",
          headers: ["n", "AIC penalty per parameter", "BIC penalty per parameter", "Which is stricter"],
          rows: [
            ["7", "2", "1.95", "AIC, barely"],
            ["8", "2", "2.08", "BIC — the crossover is at n ≈ 7.4"],
            ["100", "2", "4.61", "BIC, by more than double"],
            ["1,000", "2", "6.91", "BIC"],
            ["1,000,000", "2", "13.8", "BIC, decisively"],
          ],
        },
        {
          kind: "prose",
          text:
            "For any realistic sample size BIC penalises complexity harder, so it selects smaller " +
            "models. And because ln(n) grows without bound, BIC becomes arbitrarily strict as data " +
            "accumulates — which is the source of its key theoretical property.",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "BIC is consistent",
              description:
                "If the true model is among the candidates, BIC selects it with probability approaching 1 as n → ∞. The growing penalty eventually rules out any spurious extra parameter.",
            },
            {
              term: "AIC is efficient, not consistent",
              description:
                "AIC's fixed penalty leaves a non-vanishing probability of including useless parameters however large n gets. In exchange, it achieves asymptotically the smallest prediction error among the candidates — which is a different and often more useful optimality.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Neither is 'better' — they optimise different things",
          text:
            "AIC is derived as an estimate of expected out-of-sample prediction error, via the " +
            "Kullback–Leibler divergence between the fitted model and the true data-generating " +
            "process. BIC is derived as a large-sample approximation to the log marginal likelihood, " +
            "so minimising it approximates choosing the model with highest posterior probability " +
            "under equal priors. Different targets, different answers, and the disagreement between " +
            "them is informative rather than embarrassing.",
        },
      ],
    },

    {
      heading: "Choosing between them",
      blocks: [
        {
          kind: "table",
          headers: ["Situation", "Prefer"],
          rows: [
            ["The goal is forecasting new observations", "AIC"],
            ["The goal is identifying which variables genuinely matter", "BIC"],
            ["The truth is likely more complex than any candidate model", "AIC — no candidate is 'true', so consistency is vacuous"],
            ["A small, parsimonious true model is plausible", "BIC"],
            ["Small n relative to k (say n/k < 40)", "AICc, the small-sample-corrected AIC"],
            ["Prediction, with computation to spare", "Cross-validation, which assumes less than either"],
          ],
        },
        {
          kind: "formula",
          latex: "AICc = AIC + 2k(k + 1)/(n − k − 1)",
          caption: "The small-sample correction. It converges to AIC as n grows, so it is safe to use always.",
        },
        {
          kind: "example",
          title: "Two criteria, two answers",
          problem:
            "With n = 100, model A has k = 3 and −2 ln L̂ = 250; model B has k = 8 and " +
            "−2 ln L̂ = 238. Which does each criterion prefer?",
          steps: [
            "AIC(A) = 250 + 2(3) = 256. AIC(B) = 238 + 2(8) = 254.",
            "ln(100) ≈ 4.605.",
            "BIC(A) = 250 + 3(4.605) ≈ 263.8. BIC(B) = 238 + 8(4.605) ≈ 274.8.",
          ],
          answer:
            "AIC prefers B by 2; BIC prefers A by 11. The 12-point gain in deviance was worth 5 extra parameters at AIC's price of 2 each, but not at BIC's price of 4.6 each. Reporting both, and saying which goal you have, is more honest than picking one silently.",
        },
      ],
    },

    {
      heading: "Rules for using them safely",
      blocks: [
        {
          kind: "list",
          items: [
            "Compare models fitted to the same response on the same rows. Dropping a predictor with missing values silently changes n and makes the comparison meaningless.",
            "Transforming the response (y vs log y) changes the likelihood's units, so AIC values across such models are not comparable without a Jacobian correction.",
            "Unlike the partial F-test, AIC and BIC do not require the models to be nested — this is their main practical advantage.",
            "Count every estimated parameter, σ² included. Software conventions differ, so comparisons must come from the same tool.",
            "Neither criterion validates a model; both compare models within a candidate set. If every candidate is bad, one of them still wins.",
            "Selecting a model and then reporting its p-values as if the model had been fixed in advance produces invalid inference. The selection step used the data, and the standard errors do not know that.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "AIC and leave-one-out cross-validation are close cousins",
          text:
            "For linear models with normal errors, AIC is asymptotically equivalent to leave-one-out " +
            "cross-validation — they agree in the limit. AIC gets there with a formula and one fit; " +
            "cross-validation gets there by refitting n times but assumes far less about the model " +
            "being correct. When they disagree in practice, trust cross-validation.",
        },
      ],
    },
  ],

  references: [
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning", locator: "§7.5–7.7, AIC, BIC and the Effective Number of Parameters" },
    { source: "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning", locator: "§6.1.3, Choosing the Optimal Model" },
    { source: "Wasserman, All of Statistics", locator: "§13.6, Model Selection" },
    { source: "Mathlingo assessment bank", locator: "assessments/reg-04-model-selection-and-regularization.md" },
  ],
};
