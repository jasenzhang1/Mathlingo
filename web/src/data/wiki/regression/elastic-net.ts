import type { WikiArticle } from "../types";

export const elasticNetWiki: WikiArticle = {
  conceptId: "elastic-net",

  summary:
    "Elastic net mixes the L1 and L2 penalties in one objective, with a mixing parameter α that " +
    "slides continuously from pure ridge at α = 0 to pure LASSO at α = 1. The point is not " +
    "hedging: the L1 part still produces exact zeros, while the L2 part supplies a grouping effect " +
    "that makes correlated predictors enter and leave together rather than being chosen among " +
    "arbitrarily. It also lifts LASSO's hard ceiling of n selected variables when p > n.",

  sections: [
    {
      heading: "The objective",
      blocks: [
        {
          kind: "formula",
          latex: "β̂ = argmin_β [ ‖y − Xβ‖² + λ( α Σⱼ|βⱼ| + (1 − α) Σⱼ βⱼ² ) ]",
          caption: "Two hyperparameters: λ sets the total strength, α sets the blend.",
        },
        {
          kind: "definitions",
          items: [
            { term: "α = 1", description: "Pure LASSO. Maximum sparsity, and the arbitrary-choice problem in full." },
            { term: "α = 0", description: "Pure ridge. No sparsity, but stable across correlated groups." },
            { term: "0 < α < 1", description: "Both effects: exact zeros from the L1 part, group stability from the L2 part." },
            { term: "λ", description: "Overall shrinkage strength. At λ = 0 the estimator is OLS regardless of α." },
          ],
        },
        {
          kind: "prose",
          text:
            "Any α > 0 keeps the corners of the constraint region, so sparsity survives at any " +
            "positive mixing weight. The L2 part rounds the edges between the corners, which is " +
            "geometrically exactly what removes the knife-edge choice among correlated predictors.",
        },
      ],
    },

    {
      heading: "The grouping effect",
      blocks: [
        {
          kind: "prose",
          text:
            "This is the property elastic net was invented for. LASSO applied to a set of strongly " +
            "correlated predictors keeps roughly one and zeroes the rest, and which one survives is " +
            "unstable across resamples. Elastic net assigns them similar coefficients and moves them " +
            "into and out of the model as a block.",
        },
        {
          kind: "prose",
          text:
            "The reason is the strict convexity that the L2 term supplies. With a pure L1 penalty " +
            "and two identical predictors, splitting a coefficient of 2 as (2, 0), (1, 1) or (0, 2) " +
            "gives exactly the same penalty — the objective is flat along that direction, so the " +
            "solver's choice is arbitrary. Add any squared penalty and (1, 1) becomes strictly " +
            "better, because 1² + 1² = 2 is less than 2² + 0² = 4. Splitting a coefficient between " +
            "correlated predictors is now cheaper than concentrating it, and the tie is broken in " +
            "favour of sharing.",
        },
        {
          kind: "example",
          title: "Forty correlated genes",
          problem:
            "In a study with n = 100 samples and p = 5,000 genes, forty genes in one pathway are " +
            "correlated at about 0.9 and are all genuinely associated with the outcome. How do " +
            "LASSO and elastic net differ?",
          steps: [
            "LASSO keeps perhaps two or three of the forty and zeroes the rest, and a different bootstrap sample keeps a different two or three.",
            "The prediction is roughly as good either way, since the retained genes carry the shared signal.",
            "The biological conclusion is badly distorted: the pathway looks like a handful of specific genes.",
            "Elastic net at α ≈ 0.5 retains most of the forty with similar coefficients, and the selected set is stable across resamples.",
          ],
          answer:
            "Comparable prediction, very different interpretation. When the scientific question is 'which pathway is involved?' rather than 'what will this sample's outcome be?', the grouping effect is the whole point.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "It also lifts LASSO's selection ceiling",
          text:
            "When p > n, LASSO can select at most n predictors — a hard limit from the geometry of " +
            "its path, not a tuning artefact. In a problem with 5,000 predictors and 100 samples " +
            "where 300 are truly relevant, LASSO cannot possibly recover them. Elastic net has no " +
            "such ceiling, because the ridge component keeps the problem strictly convex.",
        },
      ],
    },

    {
      heading: "Tuning two hyperparameters",
      blocks: [
        {
          kind: "prose",
          text:
            "The added flexibility has a direct cost: cross-validation now searches a two-dimensional " +
            "grid rather than a one-dimensional path. The standard approach is to fix a small set of " +
            "α values, compute the full λ path for each, and take the best (α, λ) pair by " +
            "cross-validated error.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Choose a handful of α values — 0, 0.25, 0.5, 0.75, 1 is a common default.",
            "For each α, compute the whole λ path, which is cheap because path algorithms warm-start from the previous λ.",
            "Cross-validate over the grid, using identical folds for every (α, λ) so that the comparison is not contaminated by fold-to-fold variation.",
            "Pick the pair minimising CV error, or apply the one-standard-error rule for a simpler model.",
            "Refit on the full training data at that pair.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Naive elastic net double-shrinks",
          text:
            "Applying both penalties directly shrinks the coefficients twice — once by each term — " +
            "which introduces more bias than either penalty alone would. Zou and Hastie's fix is to " +
            "rescale the solution by (1 + λ(1 − α)), and standard software implements the corrected " +
            "version. It is worth knowing the correction exists, because the uncorrected estimator " +
            "underperforms both of its parents.",
        },
      ],
    },

    {
      heading: "Choosing among the three",
      blocks: [
        {
          kind: "table",
          headers: ["Situation", "Best choice", "Why"],
          rows: [
            ["Few true predictors, all uncorrelated", "LASSO (α = 1)", "The sparsity assumption is exactly right"],
            ["All predictors matter a little, correlated", "Ridge (α = 0)", "Nothing to select; shrink everything"],
            ["Correlated groups, sparse at group level", "Elastic net (α ≈ 0.5)", "Sparsity plus grouping"],
            ["p ≫ n with more than n relevant predictors", "Elastic net", "LASSO cannot select more than n"],
            ["Unsure", "Elastic net with α cross-validated", "The grid contains both extremes, so nothing is lost"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The general lesson: penalty shape is a design choice",
          text:
            "The diamond and the circle produce sparse and smooth shrinkage respectively, and " +
            "blending them blends the behaviours. That principle generalises far beyond these three " +
            "methods: the group LASSO uses a penalty that zeroes whole blocks of coefficients at " +
            "once, the fused LASSO penalises differences between adjacent coefficients to enforce " +
            "smoothness along an ordering, and nuclear-norm penalties produce low-rank matrices. In " +
            "each case, choosing the geometry of the penalty is choosing what kind of structure the " +
            "solution will have.",
        },
      ],
    },
  ],

  references: [
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning", locator: "§3.4, Shrinkage Methods and the Elastic Net" },
    { source: "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning", locator: "§6.2, Shrinkage Methods" },
    { source: "Bishop, Pattern Recognition and Machine Learning", locator: "§3.1.4, Regularized Least Squares" },
    { source: "Mathlingo assessment bank", locator: "assessments/reg-04-model-selection-and-regularization.md" },
  ],
};
