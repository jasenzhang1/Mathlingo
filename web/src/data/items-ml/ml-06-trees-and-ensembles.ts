import type { Item } from "../../lib/assessment/types";
import { ML_06 } from "./sources";

/**
 * Cluster 6 — trees and ensembles. Ported from
 * `assessments/ml-06-trees-and-ensembles.md`.
 *
 * This cluster's markdown leans hardest on cross-references, and most of them
 * point sideways rather than upstream: `knn` and `bias-variance-tradeoff` from
 * `decision-tree`, `bernoulli-binomial` from `splitting-criteria`,
 * `hyperparameters` from `pruning-trees`, `sample-mean` and `variance` from
 * `ensemble-methods`, `bootstrapping` from `bagging`, `pruning-trees` from
 * `xgboost`. Each item keeps the connection — it is usually the whole point —
 * but states the borrowed fact in the stem, so answering needs only the
 * concept's own ancestry.
 *
 * Worth flagging for the graph rather than working around silently:
 * `ensemble-methods` has no probability concept upstream at all, yet its whole
 * justification is a variance-of-an-average argument. That looks like a missing
 * prerequisite edge in `concepts.ts`, not a quirk of these items.
 */
export const ml06Items: Item[] = [
  // --- Decision Tree --------------------------------------------------------
  {
    id: "decision-tree--recall-prediction-mechanism",
    conceptId: "decision-tree",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Describe how a decision tree makes a prediction.",
    rubric: {
      elements: [
        {
          id: "sequence-of-splits",
          description:
            "A sequence of if-then splits on feature values that recursively partitions the space.",
          weight: 3,
          required: true,
        },
        {
          id: "leaf-prediction",
          description:
            "The leaf reached gives the prediction: the majority class, or the mean of the training targets there.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: -0.7,
    discrimination: 1.0,
    expectedSeconds: 50,
    prereqClosure: ["decision-tree", "classification-vs-regression"],
    source: ML_06,
    status: "shadow",
  },
  {
    id: "decision-tree--recall-scale-invariance",
    conceptId: "decision-tree",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Distance-based methods must have their features standardised before use. Decision trees are:",
    choices: [
      {
        id: "a",
        text: "invariant to feature scale, because each split compares values within one feature at a time",
        correct: true,
      },
      {
        id: "b",
        text: "equally sensitive to feature scale",
        correct: false,
        misconception: {
          id: "trees-thought-scale-sensitive",
          description:
            "Imports the distance-based weakness. Trees never combine features into one number, so no feature can dominate through its units.",
          blameConceptId: "decision-tree",
        },
      },
      {
        id: "c",
        text: "invariant to scale only if every feature is numeric",
        correct: false,
        misconception: {
          id: "invariance-thought-conditional",
          description:
            "The invariance comes from splitting on order within a single feature, which is unaffected by what other features look like.",
          blameConceptId: "decision-tree",
        },
      },
      {
        id: "d",
        text: "invariant to scale because they standardise features internally",
        correct: false,
        misconception: {
          id: "trees-thought-to-standardise",
          description:
            "Right conclusion, wrong reason. No standardisation happens — the split rule simply never needs it.",
          blameConceptId: "decision-tree",
        },
      },
    ],
    difficulty: -0.45,
    discrimination: 1.2,
    expectedSeconds: 35,
    prereqClosure: ["decision-tree"],
    source: ML_06,
    status: "shadow",
  },
  {
    id: "decision-tree--apply-rescaling-income",
    conceptId: "decision-tree",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "A tree splits on 'income > $50,000'. Income is then re-expressed in thousands, so the same split reads 'income > 50'. Do any predictions change? Justify it.",
    rubric: {
      elements: [
        {
          id: "no-change",
          description: "No — predictions are identical.",
          weight: 2,
          required: true,
        },
        {
          id: "partition-unchanged",
          description:
            "The threshold rescales with the feature, so exactly the same rows fall on each side — the split only ever compares ordering, which a monotone rescaling preserves.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.1,
    discrimination: 1.3,
    expectedSeconds: 110,
    prereqClosure: ["decision-tree"],
    source: ML_06,
    status: "shadow",
  },
  {
    id: "decision-tree--explain-greedy",
    conceptId: "decision-tree",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Why is decision tree construction called 'greedy', and what does that cost?",
    rubric: {
      elements: [
        {
          id: "locally-best-split",
          description:
            "At each node it takes the single best split available right now by its criterion.",
          weight: 3,
          required: true,
        },
        {
          id: "no-lookahead",
          description:
            "It never considers whether a locally worse split would enable much better ones below — local, not global, optimality.",
          weight: 4,
          required: true,
        },
        {
          id: "why-greedy-at-all",
          description:
            "Bonus: notes that finding the globally optimal tree is NP-hard, so greediness is a necessary compromise rather than an oversight.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.8,
    discrimination: 1.5,
    expectedSeconds: 170,
    prereqClosure: ["decision-tree"],
    source: ML_06,
    status: "shadow",
  },
  {
    id: "decision-tree--transfer-two-fixes",
    conceptId: "decision-tree",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A single tree grown to full depth almost always generalises badly. Explain why, and name the two structurally different families of fix this motivates.",
    rubric: {
      elements: [
        {
          id: "memorisation-mechanism",
          description:
            "An unconstrained tree splits until every leaf is pure — in the limit one training row per leaf — so it memorises the sample rather than learning a rule, and its fit swings wildly with the data it happened to see.",
          weight: 4,
          required: true,
        },
        {
          id: "names-both-fixes",
          description:
            "Names both: pruning (simplify the single tree) and ensembling (combine many trees).",
          weight: 3,
          required: true,
        },
        {
          id: "same-root-cause",
          description:
            "States that these attack the same root cause by opposite means — one reduces each tree's flexibility, the other keeps it and averages the instability away.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.3,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["decision-tree"],
    source: ML_06,
    status: "shadow",
  },

  // --- Splitting Criteria ---------------------------------------------------
  {
    id: "splitting-criteria--recall-two-criteria",
    conceptId: "splitting-criteria",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Name two common classification splitting criteria and say what they measure.",
    rubric: {
      elements: [
        {
          id: "names-both",
          description: "Gini impurity and entropy (information gain).",
          weight: 3,
          required: true,
        },
        {
          id: "what-they-measure",
          description:
            "Both measure how mixed the classes are within a node; splits are chosen to maximise the weighted reduction.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: -0.6,
    discrimination: 1.0,
    expectedSeconds: 45,
    prereqClosure: ["splitting-criteria", "decision-tree"],
    source: ML_06,
    status: "shadow",
  },
  {
    id: "splitting-criteria--recall-pure-node",
    conceptId: "splitting-criteria",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "A perfectly pure node — every example in it belongs to one class — has:",
    choices: [
      { id: "a", text: "zero impurity", correct: true },
      {
        id: "b",
        text: "maximum impurity",
        correct: false,
        misconception: {
          id: "impurity-scale-inverted",
          description:
            "Reads the scale backwards. Impurity is maximal at a uniform mixture and zero when one class holds everything.",
          blameConceptId: "splitting-criteria",
        },
      },
      {
        id: "c",
        text: "impurity equal to the class proportion",
        correct: false,
        misconception: {
          id: "impurity-confused-with-proportion",
          description:
            "Impurity is a function of the whole class distribution, not one proportion — and at p = 1 it is 0, not 1.",
          blameConceptId: "splitting-criteria",
        },
      },
      {
        id: "d",
        text: "undefined impurity",
        correct: false,
        misconception: {
          id: "pure-node-thought-undefined",
          description:
            "Both Gini and entropy are well defined at a pure node; entropy uses the convention 0·log 0 = 0.",
          blameConceptId: "splitting-criteria",
        },
      },
    ],
    difficulty: -0.35,
    discrimination: 1.1,
    expectedSeconds: 30,
    prereqClosure: ["splitting-criteria"],
    source: ML_06,
    status: "shadow",
  },
  {
    id: "splitting-criteria--apply-gini-90-10",
    conceptId: "splitting-criteria",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "Using Gini = 1 − Σpᵢ², compute the Gini impurity of a binary node with class proportions (0.9, 0.1). (For reference, a (0.5, 0.5) node gives 0.5.)",
    answerKey: 0.18,
    tolerance: 0.005,
    difficulty: 0.2,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["splitting-criteria"],
    source: ML_06,
    status: "shadow",
  },
  {
    id: "splitting-criteria--explain-gini-is-twice-bernoulli-variance",
    conceptId: "splitting-criteria",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem: "Show that binary Gini impurity simplifies to 2p(1 − p), and explain what that tells you about where it is maximised. A single yes/no trial with success probability p has variance p(1 − p) — say how the two quantities are related.",
    rubric: {
      elements: [
        {
          id: "algebra",
          description:
            "Carries out the algebra: 1 − (p² + (1 − p)²) = 1 − (2p² − 2p + 1) = 2p(1 − p).",
          weight: 4,
          required: true,
        },
        {
          id: "exactly-twice-the-variance",
          description:
            "States the relation exactly: Gini is precisely twice that variance — an identity, not a resemblance.",
          weight: 4,
          required: true,
        },
        {
          id: "why-max-at-half",
          description:
            "Explains the shared maximum at p = ½ by the shared reason: that is where a single binary outcome is least predictable.",
          weight: 3,
          required: true,
        },
      ],
      forbiddenMoves: [
        {
          id: "calls-it-an-analogy",
          description:
            "Describes the two as 'similar' or 'analogous' rather than establishing the factor-of-2 identity by algebra.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.9,
    discrimination: 1.7,
    expectedSeconds: 220,
    prereqClosure: ["splitting-criteria"],
    source: ML_06,
    status: "shadow",
  },
  {
    id: "splitting-criteria--transfer-size-imbalance",
    conceptId: "splitting-criteria",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A candidate split sends 990 examples one way and 10 the other, and both children are perfectly pure. Impurity reduction rates this as excellent. Why, and what does that reveal about the criterion?",
    rubric: {
      elements: [
        {
          id: "criterion-measures-only-mixedness",
          description:
            "The criterion measures only how mixed each child is, weighted by child size — two pure children drive the weighted impurity to zero regardless of how lopsided the sizes are.",
          weight: 4,
          required: true,
        },
        {
          id: "imbalance-is-outside-the-criterion",
          description:
            "States the general point: size balance is simply not among the things the criterion measures, so a greedy tree can pick splits that look unhelpful to a human yet are optimal by this rule.",
          weight: 4,
          required: true,
        },
        {
          id: "practical-guard",
          description:
            "Bonus: notes that min_samples_leaf and similar constraints exist precisely to impose the preference the criterion lacks.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.4,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["splitting-criteria", "decision-tree"],
    source: ML_06,
    status: "shadow",
  },

  // --- Pruning Trees --------------------------------------------------------
  {
    id: "pruning-trees--recall-describe",
    conceptId: "pruning-trees",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Describe pruning.",
    rubric: {
      elements: [
        {
          id: "grow-then-cut",
          description:
            "Grow the tree to full or near-full depth, then remove branches that do not improve held-out performance.",
          weight: 4,
          required: true,
        },
        {
          id: "purpose",
          description: "The purpose is to combat overfitting.",
          weight: 2,
          required: true,
        },
      ],
    },
    difficulty: 0.0,
    discrimination: 1.1,
    expectedSeconds: 50,
    prereqClosure: ["pruning-trees", "decision-tree", "overfitting-underfitting"],
    source: ML_06,
    status: "shadow",
  },
  {
    id: "pruning-trees--recall-what-it-is",
    conceptId: "pruning-trees",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Pruning is best understood as:",
    choices: [
      {
        id: "a",
        text: "a regularisation technique — trading some training accuracy for better generalisation",
        correct: true,
      },
      {
        id: "b",
        text: "a way to make training faster",
        correct: false,
        misconception: {
          id: "pruning-read-as-speed",
          description:
            "A possible side effect at prediction time, but not the purpose — and post-pruning costs *more* training time, since the full tree is grown first.",
          blameConceptId: "pruning-trees",
        },
      },
      {
        id: "c",
        text: "a way to remove features from the dataset",
        correct: false,
        misconception: {
          id: "pruning-confused-with-feature-selection",
          description:
            "Pruning removes subtrees, not columns. A pruned-away feature may still be used elsewhere in the tree.",
          blameConceptId: "pruning-trees",
        },
      },
      {
        id: "d",
        text: "a way to increase training accuracy",
        correct: false,
        misconception: {
          id: "pruning-thought-to-raise-training-accuracy",
          description:
            "Pruning always lowers training accuracy — that is the price paid, and the reason it must be judged on held-out data.",
          blameConceptId: "pruning-trees",
        },
      },
    ],
    difficulty: 0.3,
    discrimination: 1.3,
    expectedSeconds: 35,
    prereqClosure: ["pruning-trees"],
    source: ML_06,
    status: "shadow",
  },
  {
    id: "pruning-trees--apply-alpha-regimes",
    conceptId: "pruning-trees",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "Cost-complexity pruning minimises R(T) + α·|leaves(T)|. Describe the resulting tree at α = 0, at a moderate α, and as α → ∞.",
    rubric: {
      elements: [
        {
          id: "alpha-zero",
          description: "α = 0: no penalty, so the full unpruned tree minimises the objective.",
          weight: 2,
          required: true,
        },
        {
          id: "moderate-alpha",
          description:
            "Moderate α: each extra leaf must pay for itself in training error, so the tree shrinks to its genuinely useful structure.",
          weight: 2,
          required: true,
        },
        {
          id: "alpha-large",
          description: "α → ∞: the tree collapses to a single leaf — one constant prediction.",
          weight: 2,
          required: true,
        },
      ],
    },
    difficulty: 0.8,
    discrimination: 1.4,
    expectedSeconds: 150,
    prereqClosure: ["pruning-trees"],
    source: ML_06,
    status: "shadow",
  },
  {
    id: "pruning-trees--explain-alpha-on-validation",
    conceptId: "pruning-trees",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Why must the pruning parameter α be chosen on held-out data rather than on training performance?",
    rubric: {
      elements: [
        {
          id: "training-loss-prefers-no-pruning",
          description:
            "More leaves lower training error monotonically, so training loss always prefers α = 0 — the unpruned tree — whatever the data.",
          weight: 5,
          required: true,
        },
        {
          id: "general-principle",
          description:
            "Recognises this as the general rule for any complexity-controlling setting: training loss is a biased guide for them, so a separate held-out signal is required.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.5,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["pruning-trees", "overfitting-underfitting"],
    source: ML_06,
    status: "shadow",
  },
  {
    id: "pruning-trees--transfer-pruning-vs-ensembling",
    conceptId: "pruning-trees",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Pruning and ensembling both address an overfitting tree, but by opposite philosophies. Describe each mechanism and explain why they do not overlap.",
    rubric: {
      elements: [
        {
          id: "pruning-mechanism",
          description:
            "Pruning makes one tree simpler, cutting its flexibility so its fit stops chasing the sample.",
          weight: 3,
          required: true,
        },
        {
          id: "ensembling-mechanism",
          description:
            "Ensembling keeps the trees complex and unpruned, and averages their independent errors away instead.",
          weight: 3,
          required: true,
        },
        {
          id: "no-overlap",
          description:
            "States why they do not overlap: one reduces each model's instability directly, the other leaves each model unstable and cancels the instability across models — which is why random forests deliberately do not prune.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.5,
    expectedSeconds: 220,
    prereqClosure: ["pruning-trees", "decision-tree"],
    source: ML_06,
    status: "shadow",
  },

  // --- Ensemble Methods -----------------------------------------------------
  {
    id: "ensemble-methods--recall-definition",
    conceptId: "ensemble-methods",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Define ensemble methods.",
    rubric: {
      elements: [
        {
          id: "combines-models",
          description:
            "Combining the predictions of several models into one prediction that is better than any single member's.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: -0.6,
    discrimination: 1.0,
    expectedSeconds: 40,
    prereqClosure: ["ensemble-methods", "decision-tree"],
    source: ML_06,
    status: "shadow",
  },
  {
    id: "ensemble-methods--recall-why-it-works",
    conceptId: "ensemble-methods",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "The statistical principle behind ensembling is that:",
    choices: [
      {
        id: "a",
        text: "averaging several noisy estimates of the same quantity gives a less variable estimate than any one of them",
        correct: true,
      },
      {
        id: "b",
        text: "more models always means more overfitting",
        correct: false,
        misconception: {
          id: "more-models-thought-to-overfit",
          description:
            "Reverses the effect for averaging ensembles. Adding members to a bagged ensemble reduces variance and never increases bias — the count is not a complexity knob.",
          blameConceptId: "ensemble-methods",
        },
      },
      {
        id: "c",
        text: "the best single member's predictions are selected for each input",
        correct: false,
        misconception: {
          id: "ensemble-confused-with-selection",
          description:
            "Describes model selection, not ensembling. The gain comes from combining members, not from picking one.",
          blameConceptId: "ensemble-methods",
        },
      },
      {
        id: "d",
        text: "combining models removes their shared systematic error",
        correct: false,
        misconception: {
          id: "averaging-thought-to-remove-bias",
          description:
            "Averaging cancels *independent* error. Error that every member shares survives the average untouched — which is why an ensemble of biased models stays biased.",
          blameConceptId: "ensemble-methods",
        },
      },
    ],
    difficulty: -0.35,
    discrimination: 1.3,
    expectedSeconds: 40,
    prereqClosure: ["ensemble-methods"],
    source: ML_06,
    status: "shadow",
  },
  {
    id: "ensemble-methods--apply-averaged-variance",
    conceptId: "ensemble-methods",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "Averaging n independent quantities each with variance σ² gives an average with variance σ²/n. Ten independent models each have prediction variance σ² = 4. What is the variance of their averaged prediction?",
    answerKey: 0.4,
    tolerance: 0.005,
    difficulty: 0.2,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["ensemble-methods"],
    source: ML_06,
    status: "shadow",
  },
  {
    id: "ensemble-methods--explain-diversity-requirement",
    conceptId: "ensemble-methods",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Why does ensembling work best when the members are as diverse as possible, and what happens in the limit where they are identical?",
    rubric: {
      elements: [
        {
          id: "identical-members-gain-nothing",
          description:
            "If every model makes exactly the same errors, their average is that same model — averaging perfectly correlated quantities reduces nothing.",
          weight: 4,
          required: true,
        },
        {
          id: "correlation-sets-the-floor",
          description:
            "Only the uncorrelated part of the error cancels, so the average pairwise correlation sets a floor on how much variance can be removed no matter how many members are added.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.9,
    discrimination: 1.6,
    expectedSeconds: 180,
    prereqClosure: ["ensemble-methods"],
    source: ML_06,
    status: "shadow",
  },
  {
    id: "ensemble-methods--transfer-bagging-vs-boosting-philosophy",
    conceptId: "ensemble-methods",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Contrast how bagging and boosting each manufacture diversity among their members.",
    rubric: {
      elements: [
        {
          id: "bagging-mechanism",
          description:
            "Bagging trains members in parallel on randomised resamples of the same data, relying on randomness plus an unstable base learner to produce difference.",
          weight: 4,
          required: true,
        },
        {
          id: "boosting-mechanism",
          description:
            "Boosting trains members sequentially, each one aimed deliberately at what the previous ones got wrong — diversity by design rather than by chance.",
          weight: 4,
          required: true,
        },
        {
          id: "consequence",
          description:
            "Bonus: draws the consequence — bagging parallelises and cannot overfit by adding members, boosting cannot parallelise across rounds and can.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.4,
    discrimination: 1.5,
    expectedSeconds: 210,
    prereqClosure: ["ensemble-methods"],
    source: ML_06,
    status: "shadow",
  },

  // --- Bagging --------------------------------------------------------------
  {
    id: "bagging--recall-describe",
    conceptId: "bagging",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Describe bagging.",
    rubric: {
      elements: [
        {
          id: "bootstrap-resamples",
          description:
            "Train one model per bootstrap resample — n draws with replacement from the n training rows.",
          weight: 4,
          required: true,
        },
        {
          id: "combine",
          description: "Average their predictions, or take a majority vote.",
          weight: 2,
          required: true,
        },
      ],
    },
    difficulty: -0.53,
    discrimination: 1.1,
    expectedSeconds: 50,
    prereqClosure: ["bagging", "ensemble-methods"],
    source: ML_06,
    status: "shadow",
  },
  {
    id: "bagging--recall-what-it-reduces",
    conceptId: "bagging",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Bagging primarily reduces:",
    choices: [
      { id: "a", text: "variance", correct: true },
      {
        id: "b",
        text: "bias",
        correct: false,
        misconception: {
          id: "bagging-thought-to-reduce-bias",
          description:
            "Averaging cancels sample-to-sample fluctuation, not systematic error. An ensemble of models that are all wrong the same way stays wrong.",
          blameConceptId: "ensemble-methods",
        },
      },
      {
        id: "c",
        text: "the irreducible noise in the data",
        correct: false,
        misconception: {
          id: "bagging-thought-to-beat-noise-floor",
          description:
            "Nothing reduces σ². It is a property of the data-generating process, not of the model.",
          blameConceptId: "bagging",
        },
      },
      {
        id: "d",
        text: "prediction time",
        correct: false,
        misconception: {
          id: "bagging-thought-to-speed-prediction",
          description:
            "Bagging multiplies prediction cost by the number of members. Its benefit is statistical, and it is paid for in compute.",
          blameConceptId: "bagging",
        },
      },
    ],
    difficulty: -0.28,
    discrimination: 1.2,
    expectedSeconds: 30,
    prereqClosure: ["bagging"],
    source: ML_06,
    status: "shadow",
  },
  {
    id: "bagging--apply-resampling-procedure",
    conceptId: "bagging",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "Describe exactly how each member's training set is constructed in bagging, and why sampling with replacement — rather than a random subset without replacement — is what the method calls for.",
    rubric: {
      elements: [
        {
          id: "n-draws-with-replacement",
          description:
            "Each training set is n draws with replacement from the original n rows, so it is the same size but contains duplicates and omits others.",
          weight: 4,
          required: true,
        },
        {
          id: "why-with-replacement",
          description:
            "With replacement keeps each member's sample size at n, so the members are comparable to a model fitted on the full data; sampling a smaller subset without replacement would weaken every member as well as decorrelating them.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.27,
    discrimination: 1.4,
    expectedSeconds: 150,
    prereqClosure: ["bagging"],
    source: ML_06,
    status: "shadow",
  },
  {
    id: "bagging--explain-which-base-learners",
    conceptId: "bagging",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Why is bagging highly effective for deep decision trees but of almost no use for ordinary linear regression?",
    rubric: {
      elements: [
        {
          id: "mechanism-is-variance-reduction",
          description:
            "Bagging's entire mechanism is averaging away sample-to-sample fluctuation, so it can only help where that fluctuation is the dominant error.",
          weight: 4,
          required: true,
        },
        {
          id: "stable-learners-gain-nothing",
          description:
            "A linear fit barely moves across bootstrap resamples, so the members are near-identical and their average is essentially the original model — with the systematic error untouched.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.97,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["bagging", "ensemble-methods"],
    source: ML_06,
    status: "shadow",
  },
  {
    id: "bagging--transfer-oob-estimate",
    conceptId: "bagging",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "handwritten"],
    stem: "Explain out-of-bag error estimation, including roughly what fraction of rows each bootstrap sample leaves out and where that figure comes from.",
    rubric: {
      elements: [
        {
          id: "the-fraction-and-its-source",
          description:
            "About 37% — a given row is missed by all n draws with probability (1 − 1/n)ⁿ, which tends to e⁻¹ ≈ 0.368.",
          weight: 4,
          required: true,
        },
        {
          id: "how-the-estimate-is-formed",
          description:
            "Each row is predicted by the subset of members that never saw it, and those predictions are scored — a held-out estimate obtained from the fit you were already doing.",
          weight: 4,
          required: true,
        },
        {
          id: "caveat",
          description:
            "Bonus: notes it uses only about a third of the ensemble per row, so it is slightly pessimistic when the ensemble is small.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.47,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["bagging"],
    source: ML_06,
    status: "shadow",
  },

  // --- Random Forests -------------------------------------------------------
  {
    id: "random-forests--recall-extra-ingredient",
    conceptId: "random-forests",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "What does a random forest add beyond bagged trees?",
    rubric: {
      elements: [
        {
          id: "feature-subsampling",
          description:
            "At every split, only a random subset of the features is considered as candidates.",
          weight: 4,
          required: true,
        },
        {
          id: "per-split-not-per-tree",
          description:
            "The subset is redrawn at each split, not chosen once per tree.",
          weight: 2,
          required: true,
        },
      ],
    },
    difficulty: -0.4,
    discrimination: 1.2,
    expectedSeconds: 50,
    prereqClosure: ["random-forests", "bagging", "splitting-criteria"],
    source: ML_06,
    status: "shadow",
  },
  {
    id: "random-forests--recall-why-subsample",
    conceptId: "random-forests",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Feature subsampling at each split exists specifically to:",
    choices: [
      {
        id: "a",
        text: "further reduce the correlation between the trees",
        correct: true,
      },
      {
        id: "b",
        text: "speed up training",
        correct: false,
        misconception: {
          id: "subsampling-read-as-speed",
          description:
            "A real side effect, but not the motivation — and it would not justify making each individual tree worse, which subsampling does.",
          blameConceptId: "random-forests",
        },
      },
      {
        id: "c",
        text: "make each individual tree more accurate",
        correct: false,
        misconception: {
          id: "subsampling-thought-to-help-each-tree",
          description:
            "Exactly backwards. Withholding features makes every tree weaker; the forest gains because the trees stop agreeing.",
          blameConceptId: "random-forests",
        },
      },
      {
        id: "d",
        text: "perform feature selection, discarding useless features permanently",
        correct: false,
        misconception: {
          id: "subsampling-confused-with-selection",
          description:
            "No feature is discarded — every feature remains eligible at every other split.",
          blameConceptId: "random-forests",
        },
      },
    ],
    difficulty: -0.1,
    discrimination: 1.3,
    expectedSeconds: 35,
    prereqClosure: ["random-forests"],
    source: ML_06,
    status: "shadow",
  },
  {
    id: "random-forests--apply-dominant-feature",
    conceptId: "random-forests",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "Without feature subsampling, why would many bagged trees still split on the same feature at the root even though each was fitted to a different bootstrap sample?",
    rubric: {
      elements: [
        {
          id: "strongest-feature-wins-everywhere",
          description:
            "A strongly predictive feature gives the best split by the impurity criterion on almost any resample, so resampling alone is not enough to change the root.",
          weight: 4,
          required: true,
        },
        {
          id: "leaves-trees-correlated",
          description:
            "The trees therefore stay similar, and correlated members are exactly what caps the variance reduction an average can deliver.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.4,
    discrimination: 1.5,
    expectedSeconds: 160,
    prereqClosure: ["random-forests", "bagging", "splitting-criteria"],
    source: ML_06,
    status: "shadow",
  },
  {
    id: "random-forests--explain-diversity-connection",
    conceptId: "random-forests",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Feature subsampling makes each individual tree worse. Explain why the forest is nonetheless better, using the diversity argument.",
    rubric: {
      elements: [
        {
          id: "each-tree-weaker",
          description:
            "Concedes the cost: withholding the best feature at a split forces a weaker structure, so each tree alone is less accurate.",
          weight: 3,
          required: true,
        },
        {
          id: "correlation-is-the-binding-constraint",
          description:
            "Explains the gain: correlation is what limits how much averaging can remove, so trading a little individual quality for a large drop in correlation is a net win.",
          weight: 5,
          required: true,
        },
      ],
      forbiddenMoves: [
        {
          id: "claims-trees-also-improve",
          description:
            "Asserts that subsampling makes the individual trees better too, which loses the whole point that this is a trade.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.1,
    discrimination: 1.7,
    expectedSeconds: 200,
    prereqClosure: ["random-forests", "ensemble-methods", "bagging"],
    source: ML_06,
    status: "shadow",
  },
  {
    id: "random-forests--transfer-nearly-free-lunch",
    conceptId: "random-forests",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Random forests are often called a 'nearly free lunch' because they need so little tuning. What specifically makes them robust to their own hyperparameters?",
    rubric: {
      elements: [
        {
          id: "more-trees-never-hurts",
          description:
            "The main knob — the number of trees — cannot harm performance: more members monotonically reduce variance and only cost compute, so it needs no tuning at all.",
          weight: 4,
          required: true,
        },
        {
          id: "other-settings-are-forgiving",
          description:
            "The remaining settings are forgiving: depth is usually left unlimited because variance is controlled by averaging, and the defaults for features-per-split are close to optimal across a wide range of problems.",
          weight: 3,
          required: true,
        },
        {
          id: "contrast",
          description:
            "Bonus: contrasts with methods where a wrong setting actively harms results — a boosting round count, or a learning rate past its stability threshold.",
          weight: 3,
        },
      ],
    },
    difficulty: 1.6,
    discrimination: 1.5,
    expectedSeconds: 210,
    prereqClosure: ["random-forests", "bagging", "ensemble-methods"],
    source: ML_06,
    status: "shadow",
  },

  // --- AdaBoost -------------------------------------------------------------
  {
    id: "adaboost--recall-mechanism",
    conceptId: "adaboost",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Describe AdaBoost's core mechanism.",
    rubric: {
      elements: [
        {
          id: "sequential-reweighting",
          description:
            "Train weak learners in sequence, raising the weight of the examples the previous learners misclassified.",
          weight: 4,
          required: true,
        },
        {
          id: "weighted-vote",
          description:
            "Combine them by a weighted vote in which more accurate learners get a larger say.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: -0.53,
    discrimination: 1.1,
    expectedSeconds: 55,
    prereqClosure: ["adaboost", "ensemble-methods"],
    source: ML_06,
    status: "shadow",
  },
  {
    id: "adaboost--recall-diversity-mechanism",
    conceptId: "adaboost",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "AdaBoost's route to diversity differs from bagging's because it:",
    choices: [
      {
        id: "a",
        text: "sequentially and deliberately targets what the previous learners got wrong, rather than relying on randomness",
        correct: true,
      },
      {
        id: "b",
        text: "uses random resampling, just as bagging does",
        correct: false,
        misconception: {
          id: "adaboost-thought-to-resample-randomly",
          description:
            "Misses the defining mechanism. Reweighting is deterministic and directed; that is what makes boosting sequential and unparallelisable.",
          blameConceptId: "adaboost",
        },
      },
      {
        id: "c",
        text: "trains all its learners simultaneously on different feature subsets",
        correct: false,
        misconception: {
          id: "adaboost-confused-with-random-forest",
          description:
            "Describes a random forest. Boosting rounds are strictly ordered — round t + 1 is defined by round t's errors.",
          blameConceptId: "adaboost",
        },
      },
      {
        id: "d",
        text: "uses a different model family for each member",
        correct: false,
        misconception: {
          id: "adaboost-confused-with-stacking",
          description:
            "Describes stacking. AdaBoost typically uses the same weak learner throughout — classically a depth-1 stump.",
          blameConceptId: "ensemble-methods",
        },
      },
    ],
    difficulty: -0.28,
    discrimination: 1.3,
    expectedSeconds: 40,
    prereqClosure: ["adaboost"],
    source: ML_06,
    status: "shadow",
  },
  {
    id: "adaboost--apply-weight-direction",
    conceptId: "adaboost",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "An example is classified correctly in the current round. Does its weight go up or down for the next round, and why?",
    rubric: {
      elements: [
        {
          id: "decreases",
          description: "It decreases, in relative terms.",
          weight: 2,
          required: true,
        },
        {
          id: "reason",
          description:
            "AdaBoost raises the weight of misclassified examples and renormalises, so the ones already handled receive proportionally less emphasis — the next learner is aimed at what remains unsolved.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.27,
    discrimination: 1.3,
    expectedSeconds: 110,
    prereqClosure: ["adaboost"],
    source: ML_06,
    status: "shadow",
  },
  {
    id: "adaboost--explain-why-bias-reduction",
    conceptId: "adaboost",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Bagging reduces variance. Why does boosting reduce bias instead, given that both combine many models?",
    rubric: {
      elements: [
        {
          id: "members-solve-different-problems",
          description:
            "Each boosted learner is fitted to a different problem — what is still unexplained — so the sum represents structure no single member could.",
          weight: 4,
          required: true,
        },
        {
          id: "contrast-with-averaging-equals",
          description:
            "Contrasts with bagging, where every member solves the same problem on a resample, so averaging cancels their independent errors without adding representational power.",
          weight: 4,
          required: true,
        },
        {
          id: "stumps-become-flexible",
          description:
            "Bonus: notes the consequence — depth-1 stumps, individually near-useless, sum into a highly flexible model.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.97,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["adaboost", "ensemble-methods"],
    source: ML_06,
    status: "shadow",
  },
  {
    id: "adaboost--transfer-noise-sensitivity",
    conceptId: "adaboost",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Why is AdaBoost markedly more sensitive to mislabelled training examples than bagging or random forests?",
    rubric: {
      elements: [
        {
          id: "runaway-weight",
          description:
            "Names the runaway mechanism: a mislabelled point is missed every round, so its weight is multiplied up round after round.",
          weight: 5,
          required: true,
        },
        {
          id: "ensemble-chases-the-bad-point",
          description:
            "Later learners then devote themselves to satisfying that one enormous weight, distorting the ensemble around a wrong label.",
          weight: 3,
          required: true,
        },
        {
          id: "contrast-and-remedy",
          description:
            "Bonus: contrasts with bagging, where one bad row appears in only some resamples and is averaged down, and names a bounded-loss alternative such as logistic-loss boosting.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.47,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["adaboost", "ensemble-methods"],
    source: ML_06,
    status: "shadow",
  },

  // --- Gradient Boosting ----------------------------------------------------
  {
    id: "gradient-boosting--recall-mechanism",
    conceptId: "gradient-boosting",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Describe gradient boosting's core mechanism.",
    rubric: {
      elements: [
        {
          id: "fits-negative-gradient",
          description:
            "Train models sequentially, each fitted to the negative gradient of the loss with respect to the current ensemble's predictions.",
          weight: 4,
          required: true,
        },
        {
          id: "squared-error-special-case",
          description:
            "For squared error those pseudo-residuals are just the ordinary residuals.",
          weight: 2,
          required: true,
        },
      ],
    },
    difficulty: -0.08,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["gradient-boosting", "ensemble-methods", "gradient-descent"],
    source: ML_06,
    status: "shadow",
  },
  {
    id: "gradient-boosting--recall-generalisation",
    conceptId: "gradient-boosting",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Gradient boosting generalises reweighting-based boosting by:",
    choices: [
      {
        id: "a",
        text: "allowing any differentiable loss, by fitting each new model to that loss's gradient",
        correct: true,
      },
      {
        id: "b",
        text: "removing the sequential structure entirely",
        correct: false,
        misconception: {
          id: "gb-thought-parallel",
          description:
            "Gradient boosting is fully sequential — each tree is fitted to residuals that only exist once the previous trees are fixed.",
          blameConceptId: "gradient-boosting",
        },
      },
      {
        id: "c",
        text: "replacing trees with linear models",
        correct: false,
        misconception: {
          id: "gb-confused-with-base-learner-choice",
          description:
            "The base learner is a free choice in both. What generalises is the loss, not the model class.",
          blameConceptId: "gradient-boosting",
        },
      },
      {
        id: "d",
        text: "requiring the loss to have a closed-form minimiser",
        correct: false,
        misconception: {
          id: "gb-thought-to-need-closed-form",
          description:
            "Exactly the opposite: needing only the gradient is what frees it from closed-form requirements and opens up Huber, quantile and ranking losses.",
          blameConceptId: "gradient-boosting",
        },
      },
    ],
    difficulty: 0.22,
    discrimination: 1.3,
    expectedSeconds: 40,
    prereqClosure: ["gradient-boosting"],
    source: ML_06,
    status: "shadow",
  },
  {
    id: "gradient-boosting--apply-residual-derivation",
    conceptId: "gradient-boosting",
    format: "derivation",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "For squared-error loss L = (y − F(x))², show that fitting to the negative gradient with respect to F(x) is, up to a constant factor, fitting to the residual.",
    rubric: {
      elements: [
        {
          id: "derivative",
          description: "Computes ∂L/∂F = −2(y − F(x)).",
          weight: 4,
          required: true,
        },
        {
          id: "negative-gradient-is-residual",
          description:
            "So the negative gradient is 2(y − F(x)), which is the residual times 2 — the factor is absorbed by the step size.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.72,
    discrimination: 1.5,
    expectedSeconds: 180,
    prereqClosure: ["gradient-boosting", "matrix-calculus"],
    source: ML_06,
    status: "shadow",
  },
  {
    id: "gradient-boosting--explain-function-space",
    conceptId: "gradient-boosting",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Why is gradient boosting described as gradient descent 'in function space'?",
    rubric: {
      elements: [
        {
          id: "ordinary-gd-updates-a-vector",
          description:
            "Ordinary gradient descent nudges a fixed vector of parameters against the gradient.",
          weight: 3,
          required: true,
        },
        {
          id: "boosting-adds-a-function",
          description:
            "Here each step adds a whole new function — a tree — to the ensemble, and the step direction is itself a function: the negative gradient evaluated at each training point.",
          weight: 5,
          required: true,
        },
      ],
      forbiddenMoves: [
        {
          id: "restates-the-phrase",
          description:
            "Repeats the phrase 'descent in function space' without contrasting a parameter update against adding a function.",
          weight: 1,
        },
      ],
    },
    difficulty: 1.42,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["gradient-boosting", "gradient-descent"],
    source: ML_06,
    status: "shadow",
  },
  {
    id: "gradient-boosting--transfer-overfitting-with-rounds",
    conceptId: "gradient-boosting",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Adding trees to a bagged ensemble never hurts, but adding rounds to a boosted one eventually does. Why, and what is the standard remedy?",
    rubric: {
      elements: [
        {
          id: "rounds-keep-fitting-residuals",
          description:
            "Each round fits more closely to what the current ensemble has not explained, and once the signal is exhausted what remains is noise.",
          weight: 4,
          required: true,
        },
        {
          id: "contrast-with-bagging",
          description:
            "Contrasts with bagging, where members are independent draws rather than corrections, so more of them only sharpens the average.",
          weight: 3,
          required: true,
        },
        {
          id: "early-stopping",
          description:
            "Names early stopping on a validation set as the specific remedy, rather than a fixed round count.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.92,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["gradient-boosting", "ensemble-methods"],
    source: ML_06,
    status: "shadow",
  },

  // --- XGBoost --------------------------------------------------------------
  {
    id: "xgboost--recall-one-sentence",
    conceptId: "xgboost",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Describe XGBoost in one sentence.",
    rubric: {
      elements: [
        {
          id: "regularised-gradient-boosting",
          description:
            "A regularised implementation of gradient boosting that puts explicit complexity penalties into the objective.",
          weight: 3,
          required: true,
        },
        {
          id: "engineering",
          description:
            "Plus substantial engineering optimisations for speed and scale.",
          weight: 2,
          required: true,
        },
      ],
    },
    difficulty: -0.05,
    discrimination: 1.1,
    expectedSeconds: 50,
    prereqClosure: ["xgboost", "gradient-boosting"],
    source: ML_06,
    status: "shadow",
  },
  {
    id: "xgboost--recall-what-regularisation-targets",
    conceptId: "xgboost",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "XGBoost's explicit regularisation term primarily combats:",
    choices: [
      {
        id: "a",
        text: "boosting's tendency to overfit as rounds accumulate and trees grow complex",
        correct: true,
      },
      {
        id: "b",
        text: "the curse of dimensionality specifically",
        correct: false,
        misconception: {
          id: "xgb-regularisation-misattributed",
          description:
            "Regularising leaf count and leaf values has nothing to do with distance concentration in high dimensions — trees never compute a distance.",
          blameConceptId: "xgboost",
        },
      },
      {
        id: "c",
        text: "class imbalance",
        correct: false,
        misconception: {
          id: "xgb-regularisation-confused-with-weighting",
          description:
            "Imbalance is addressed by class weights or a different metric, not by penalising tree complexity.",
          blameConceptId: "xgboost",
        },
      },
      {
        id: "d",
        text: "slow convergence of the boosting rounds",
        correct: false,
        misconception: {
          id: "regularisation-confused-with-convergence",
          description:
            "Confuses a statistical penalty with an optimisation property. Regularisation typically needs *more* rounds, not fewer.",
          blameConceptId: "xgboost",
        },
      },
    ],
    difficulty: 0.25,
    discrimination: 1.3,
    expectedSeconds: 40,
    prereqClosure: ["xgboost"],
    source: ML_06,
    status: "shadow",
  },
  {
    id: "xgboost--apply-penalty-parallel",
    conceptId: "xgboost",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "Cost-complexity pruning minimises training error plus α times the number of leaves. XGBoost's objective adds γT + ½λ‖w‖², where T is the leaf count and w the leaf values. What do these two have in common, and where do they differ?",
    rubric: {
      elements: [
        {
          id: "shared-principle",
          description:
            "Both put an explicit complexity penalty into the objective rather than controlling complexity only by stopping early.",
          weight: 4,
          required: true,
        },
        {
          id: "difference-in-stage",
          description:
            "The difference is when it applies: pruning cuts back a tree already grown, while XGBoost's penalty is inside the criterion each split is chosen by, so no unjustified split is ever made.",
          weight: 4,
          required: true,
        },
        {
          id: "leaf-values-too",
          description:
            "Bonus: notes XGBoost also penalises the leaf *values* through λ, which cost-complexity pruning does not.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.75,
    discrimination: 1.5,
    expectedSeconds: 190,
    prereqClosure: ["xgboost", "gradient-boosting"],
    source: ML_06,
    status: "shadow",
  },
  {
    id: "xgboost--explain-engineering-vs-statistics",
    conceptId: "xgboost",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Distinguish XGBoost's engineering optimisations from its statistical improvements, and say why the distinction matters.",
    rubric: {
      elements: [
        {
          id: "engineering-category",
          description:
            "Engineering: histogram-based split finding, sparsity-aware handling of missing values, parallel evaluation across features, cache-aware and out-of-core computation — these make it run faster and at larger scale.",
          weight: 4,
          required: true,
        },
        {
          id: "statistical-category",
          description:
            "Statistical: the regularisation term and the second-order (Newton) approximation, which make the model generalise better per unit of training.",
          weight: 4,
          required: true,
        },
        {
          id: "why-it-matters",
          description:
            "Bonus: notes they are complementary and that speed mattered indirectly too — being fast enough to tune properly was a large part of the practical advantage.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.45,
    discrimination: 1.5,
    expectedSeconds: 210,
    prereqClosure: ["xgboost", "gradient-boosting"],
    source: ML_06,
    status: "shadow",
  },
  {
    id: "xgboost--transfer-tabular-vs-unstructured",
    conceptId: "xgboost",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Why have gradient-boosted trees historically dominated tabular-data competitions while neural networks dominate images, audio and text?",
    rubric: {
      elements: [
        {
          id: "trees-suit-tabular",
          description:
            "Trees handle mixed types, nonlinearities and interactions among a moderate number of individually meaningful columns with almost no preprocessing or feature engineering.",
          weight: 4,
          required: true,
        },
        {
          id: "networks-suit-raw-signal",
          description:
            "Networks excel where features must be *learned* from raw, high-dimensional signal in which no single input dimension means anything on its own — a pixel, a sample, a token.",
          weight: 4,
          required: true,
        },
        {
          id: "no-extrapolation",
          description:
            "Bonus: notes trees cannot extrapolate beyond the training range, which is another reason the split falls where it does.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.95,
    discrimination: 1.5,
    expectedSeconds: 230,
    prereqClosure: ["xgboost", "gradient-boosting", "decision-tree"],
    source: ML_06,
    status: "shadow",
  },
];
