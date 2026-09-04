import type { WikiArticle } from "../types";

export const forwardBackwardStepwiseSelectionWiki: WikiArticle = {
  conceptId: "forward-backward-stepwise-selection",

  summary:
    "Stepwise methods search the space of predictor subsets one variable at a time: forward " +
    "selection adds, backward elimination removes, and stepwise does both. They are cheap — O(p²) " +
    "fits instead of the 2^p that exhaustive search requires — and they are greedy, so they can " +
    "miss the best subset entirely. Their deeper problem is statistical rather than computational: " +
    "the p-values, confidence intervals and R² reported after a stepwise search are all invalid, " +
    "because the search used the same data it is now being evaluated on.",

  sections: [
    {
      heading: "The three procedures",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "Forward selection",
              description:
                "Start with the intercept only. At each step add the predictor that most improves the criterion. Stop when no addition improves it. Fits about p²/2 models, and works when p > n since the full model is never needed.",
            },
            {
              term: "Backward elimination",
              description:
                "Start with all p predictors. At each step remove the least useful. Stop when no removal improves the criterion. Requires the full model to be fittable, so it fails outright when p ≥ n.",
            },
            {
              term: "Stepwise (bidirectional)",
              description:
                "Forward selection that reconsiders removals after each addition. A variable added early can be dropped once a better correlated variable enters — which is the case forward selection alone handles worst.",
            },
          ],
        },
        {
          kind: "table",
          headers: ["", "Forward", "Backward", "Best subset"],
          rows: [
            ["Models fitted", "≈ p²/2", "≈ p²/2", "2^p"],
            ["Works when p > n", "Yes", "No", "No"],
            ["Finds the global optimum", "No", "No", "Yes"],
            ["Sees interaction-only pairs", "No", "Yes", "Yes"],
            ["Feasible at p = 40", "Yes", "Yes", "No — 10¹² models"],
          ],
        },
      ],
    },

    {
      heading: "Where greedy search fails",
      blocks: [
        {
          kind: "prose",
          text:
            "Greedy means each step is locally optimal and never reconsidered against the whole " +
            "path. The classic failure is a pair of predictors that are useless individually and " +
            "powerful together.",
        },
        {
          kind: "example",
          title: "The pair forward selection cannot find",
          problem:
            "Y depends on X₁ − X₂, and X₁ and X₂ are each nearly uncorrelated with Y on their own. " +
            "A third predictor X₃ has a modest but genuine marginal association. What does forward " +
            "selection do?",
          steps: [
            "Step 1 evaluates each predictor alone. X₁ and X₂ each look like noise; X₃ improves the criterion, so X₃ is added.",
            "Step 2 evaluates adding X₁ or X₂ to a model containing X₃. Each alone still adds little, because the signal lives in their difference.",
            "No single addition improves the criterion enough, so the search stops.",
          ],
          answer:
            "Forward selection returns {X₃} and never discovers {X₁, X₂}, which would have fitted almost perfectly. Backward elimination would have found it, since it starts with both in the model and would see that removing either destroys the fit. This asymmetry is the main reason to prefer backward elimination when p < n allows it.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "'Guaranteed to find the best subset' is exactly backwards",
          text:
            "Stepwise methods search a path of p subsets out of 2^p. Best-subset selection is the " +
            "only method that guarantees the optimum, and it is computationally infeasible beyond " +
            "roughly 30–40 predictors even with branch-and-bound. Greediness is the price of " +
            "tractability, and it is a real price.",
        },
      ],
    },

    {
      heading: "The inference problem",
      blocks: [
        {
          kind: "prose",
          text:
            "This is the criticism that matters, and it applies even when the search happens to find " +
            "a good subset. Selecting a model by looking at the data, then reporting p-values as if " +
            "the model had been specified in advance, produces numbers that mean something other " +
            "than what they claim.",
        },
        {
          kind: "list",
          items: [
            "Selection bias in coefficients: a predictor enters because its estimated effect was large in this sample, so the retained estimate is systematically inflated.",
            "Invalid p-values: the reported t-statistic assumes the model was fixed before seeing the data. With p = 50 pure-noise predictors, a stepwise search at α = 0.05 will typically retain two or three, each with a small p-value.",
            "Overstated R²: the search actively hunted for the subset that fits this sample best, so in-sample fit is optimistically biased.",
            "Instability: a small perturbation of the data — one observation added, or a different bootstrap resample — can produce a substantially different final model.",
            "The stopping rule matters: forward and backward searches on the same data routinely end at different subsets, and neither is the right answer.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Fitting noise, confidently",
          text:
            "Generate 100 observations and 50 predictors, all independent standard normals, with a " +
            "response that is pure noise. A stepwise search will reliably return a model with " +
            "several 'significant' predictors and a respectable R². Nothing is wrong with the " +
            "arithmetic; the search itself manufactured the result, and no diagnostic run on the " +
            "final model will reveal it.",
        },
      ],
    },

    {
      heading: "What to do instead",
      blocks: [
        {
          kind: "table",
          headers: ["Approach", "Why it is better"],
          rows: [
            ["LASSO or elastic net", "Selection happens continuously inside one convex optimisation, not through a sequence of discrete decisions — far more stable under resampling"],
            ["Ridge, keeping every predictor", "Sidesteps selection altogether when the goal is prediction and p is manageable"],
            ["Cross-validated selection", "Choose the model size by held-out error rather than by in-sample criteria"],
            ["Subject-matter specification", "Decide the model before seeing the data; then the reported inference means what it says"],
            ["Post-selection inference", "Selective-inference methods give valid intervals conditional on the selection event, at the cost of width"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The continuous-versus-discrete distinction",
          text:
            "Stepwise makes a hard include/exclude decision at each step, so a tiny change in the " +
            "data can flip a decision and cascade through everything after it. LASSO shrinks " +
            "coefficients continuously as λ varies, and a variable's coefficient approaches zero " +
            "smoothly before reaching it. Continuous paths are stable under perturbation in a way " +
            "greedy discrete paths are not — which is why stepwise selection has largely been " +
            "displaced in modern practice rather than merely criticised.",
        },
        {
          kind: "prose",
          text:
            "Stepwise selection still has legitimate uses: exploratory screening when p is very " +
            "large and the goal is generating hypotheses, or building a candidate set for later " +
            "validation on genuinely held-out data. What is not legitimate is reporting the final " +
            "model's p-values and R² as though the model had been chosen in advance.",
        },
      ],
    },
  ],

  references: [
    { source: "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning", locator: "§6.1, Subset Selection" },
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning", locator: "§3.3, Subset Selection and Forward-Stagewise Methods" },
    { source: "Wasserman, All of Statistics", locator: "§13.6, Model Selection" },
    { source: "Mathlingo assessment bank", locator: "assessments/reg-04-model-selection-and-regularization.md" },
  ],
};
