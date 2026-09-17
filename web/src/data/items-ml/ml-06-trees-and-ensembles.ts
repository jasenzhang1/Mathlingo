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
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
  },


  {
    id: "decision-tree--apply-extrapolation-limit",
    conceptId: "decision-tree",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "A regression tree is trained on houses between 50 and 250 m². It is asked to price a 600 m² house. What will it predict, and why can no amount of tuning change that?",
    rubric: {
      elements: [
        {
          id: "predicts-a-training-mean",
          description:
            "It predicts the mean of the training targets in whichever leaf the 600 m² house falls into — the leaf holding the largest houses it saw.",
          weight: 3,
          required: true,
        },
        {
          id: "structurally-bounded",
          description:
            "Every prediction is an average of training targets, so the output is bounded by the training range no matter how the tree is grown — extrapolation is impossible by construction, not by mis-tuning.",
          weight: 4,
          required: true,
        },
        {
          id: "contrast",
          description:
            "Bonus: contrasts with a linear model, which extrapolates the trend — sometimes wrongly, but it does produce a value outside the observed range.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.5,
    discrimination: 1.5,
    expectedSeconds: 160,
    prereqClosure: ["decision-tree", "classification-vs-regression"],
    source: ML_06,
    status: "live",
  },
  {
    id: "decision-tree--explain-axis-aligned-limitation",
    conceptId: "decision-tree",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "A boundary at x₁ + x₂ = 1 is a single straight line. Why is it awkward for a tree, and what boundary shape is easy for a tree and awkward for a linear model?",
    rubric: {
      elements: [
        {
          id: "diagonal-needs-a-staircase",
          description:
            "Every split is axis-aligned, so a diagonal must be approximated by a staircase of many cuts, and the corners stay wrong however many are used.",
          weight: 4,
          required: true,
        },
        {
          id: "the-reverse-case",
          description:
            "A rectangular region — a box in two features — takes a tree two splits and takes a linear model an interaction term and some luck.",
          weight: 4,
          required: true,
        },
        {
          id: "neither-dominates",
          description:
            "Bonus: concludes that neither family dominates; they fail in different directions, which is part of why ensembling across families helps.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.05,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["decision-tree"],
    source: ML_06,
    status: "live",
  },
  {
    id: "decision-tree--transfer-instability-and-interpretation",
    conceptId: "decision-tree",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Trees are prized for interpretability. Why does their instability undercut that claim, and what would you need to establish before presenting a single tree as an explanation?",
    rubric: {
      elements: [
        {
          id: "root-change-cascades",
          description:
            "The structure is built top-down, so a handful of different rows can change which split wins at the root, and every subtree below it changes with that — producing a visibly different tree of similar accuracy.",
          weight: 4,
          required: true,
        },
        {
          id: "what-that-means-for-explanation",
          description:
            "So the specific splits shown are one of many near-equivalent stories the data supports; presenting them as *the* explanation overstates what was established.",
          weight: 4,
          required: true,
        },
        {
          id: "what-to-check",
          description:
            "Names what would support it: refit on bootstrap resamples and check that the same splits and orderings recur, rather than reading a single fit.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.55,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["decision-tree"],
    source: ML_06,
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
  },


  {
    id: "splitting-criteria--apply-weighted-reduction",
    conceptId: "splitting-criteria",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "A node of 100 samples has Gini 0.5. A split sends 70 samples to a child with Gini 0.408 and 30 to a pure child. Compute the weighted impurity reduction, to three decimal places.",
    answerKey: 0.214,
    tolerance: 0.005,
    difficulty: 0.75,
    discrimination: 1.4,
    expectedSeconds: 140,
    prereqClosure: ["splitting-criteria"],
    source: ML_06,
    status: "live",
  },
  {
    id: "splitting-criteria--explain-why-weight-the-children",
    conceptId: "splitting-criteria",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "The impurity reduction weights each child by its share of the samples. What would go wrong if the children's impurities were simply averaged unweighted?",
    rubric: {
      elements: [
        {
          id: "tiny-pure-children-would-win",
          description:
            "A split peeling off a single point into a trivially pure child would score as well as one cleanly separating half the data, since the unweighted average would count that one-sample child equally.",
          weight: 4,
          required: true,
        },
        {
          id: "weights-restore-proportionality",
          description:
            "Weighting by sample share makes the criterion measure how much impurity was actually removed from the data, not how pure the cleanest child happens to be.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.25,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["splitting-criteria"],
    source: ML_06,
    status: "live",
  },
  {
    id: "splitting-criteria--transfer-high-cardinality-bias",
    conceptId: "splitting-criteria",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A dataset includes a customer ID column. Explain what raw information gain does with it, why the criterion cannot object, and what the standard corrections are.",
    rubric: {
      elements: [
        {
          id: "id-maximises-gain",
          description:
            "Splitting on the ID puts one row in each child, every child is perfectly pure, and the gain is maximal — the criterion rates the most useless possible split highest.",
          weight: 4,
          required: true,
        },
        {
          id: "why-the-criterion-cannot-object",
          description:
            "Purity is all the criterion measures, and the split is genuinely perfect by that measure — nothing in it expresses that the rule will never fire again on a new customer.",
          weight: 4,
          required: true,
        },
        {
          id: "corrections",
          description:
            "Names corrections: gain ratio dividing by the split's own entropy to penalise many-valued features, binary-only splitting, or simply excluding identifier columns.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.75,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["splitting-criteria", "decision-tree"],
    source: ML_06,
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
  },


  {
    id: "pruning-trees--apply-cost-complexity-comparison",
    conceptId: "pruning-trees",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "Cost-complexity is R(T) + α·|leaves|. Subtree A has R = 0.10 with 12 leaves; subtree B has R = 0.16 with 4 leaves. At which α are the two exactly tied? Give four decimal places.",
    answerKey: 0.0075,
    tolerance: 0.0005,
    difficulty: 1.4,
    discrimination: 1.5,
    expectedSeconds: 160,
    prereqClosure: ["pruning-trees"],
    source: ML_06,
    status: "live",
  },
  {
    id: "pruning-trees--explain-xor-argument-for-post-pruning",
    conceptId: "pruning-trees",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "On an XOR pattern, no single feature reduces impurity at all — every candidate first split scores zero. Use that to explain why growing large and cutting back beats stopping early.",
    rubric: {
      elements: [
        {
          id: "early-stopping-halts-immediately",
          description:
            "Early stopping evaluates each split in isolation, sees zero gain, and returns a stump — never discovering that two levels separate the classes perfectly.",
          weight: 4,
          required: true,
        },
        {
          id: "post-pruning-judges-subtrees",
          description:
            "Growing first and cutting back judges a subtree by what it collectively achieves, so a worthless-looking split that enables excellent ones below it survives.",
          weight: 4,
          required: true,
        },
        {
          id: "the-general-point",
          description:
            "Bonus: identifies this as the greedy algorithm's blind spot made concrete — local scoring cannot see two moves ahead.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.75,
    discrimination: 1.7,
    expectedSeconds: 210,
    prereqClosure: ["pruning-trees", "decision-tree"],
    source: ML_06,
    status: "live",
  },
  {
    id: "pruning-trees--transfer-why-forests-do-not-prune",
    conceptId: "pruning-trees",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Random forests deliberately grow deep, unpruned trees, while boosting uses very shallow ones. Explain both choices in terms of where each method controls complexity.",
    rubric: {
      elements: [
        {
          id: "forests-want-unstable-members",
          description:
            "A forest removes instability by averaging, so it *wants* each tree low-bias and high-variance — pruning would add bias that the averaging cannot undo.",
          weight: 4,
          required: true,
        },
        {
          id: "boosting-wants-weak-members",
          description:
            "Boosting builds complexity up from a deliberately weak base learner, so deep trees would overshoot in a single round and defeat the incremental correction.",
          weight: 4,
          required: true,
        },
        {
          id: "the-common-point",
          description:
            "In both cases complexity is controlled at the ensemble level rather than the tree level, which is why pruning is a single-tree technique first and foremost.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.25,
    discrimination: 1.6,
    expectedSeconds: 230,
    prereqClosure: ["pruning-trees", "decision-tree", "overfitting-underfitting"],
    source: ML_06,
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
  },


  {
    id: "ensemble-methods--apply-correlation-floor",
    conceptId: "ensemble-methods",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "The variance of an average of B models is ρσ² + (1 − ρ)σ²/B. With σ² = 1, ρ = 0.6 and B = 100, what is the variance of the averaged prediction? Give three decimal places.",
    answerKey: 0.604,
    tolerance: 0.005,
    difficulty: 0.75,
    discrimination: 1.4,
    expectedSeconds: 130,
    prereqClosure: ["ensemble-methods"],
    source: ML_06,
    status: "live",
  },
  {
    id: "ensemble-methods--explain-which-term-to-attack",
    conceptId: "ensemble-methods",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "In ρσ² + (1 − ρ)σ²/B, which term should a practitioner spend effort on, and why is adding more members usually the lesser lever?",
    rubric: {
      elements: [
        {
          id: "second-term-vanishes",
          description:
            "The second term already falls with B and is small once B is in the hundreds — going from 100 to 1,000 members shrinks something that barely matters.",
          weight: 4,
          required: true,
        },
        {
          id: "first-term-is-the-floor",
          description:
            "The first term does not depend on B at all: it is a floor set by how correlated the members are, so reducing ρ is the only way past it.",
          weight: 4,
          required: true,
        },
        {
          id: "design-consequence",
          description:
            "Bonus: draws the design consequence — this is why methods bother to force members apart rather than simply adding more of them.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.25,
    discrimination: 1.7,
    expectedSeconds: 200,
    prereqClosure: ["ensemble-methods"],
    source: ML_06,
    status: "live",
  },
  {
    id: "ensemble-methods--transfer-stacking-and-its-risk",
    conceptId: "ensemble-methods",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Stacking trains a second model to combine the first models' predictions. Where does its diversity come from, and what is the specific way it goes wrong if implemented carelessly?",
    rubric: {
      elements: [
        {
          id: "diversity-from-model-families",
          description:
            "Diversity comes from using genuinely different model families, which fail on different examples rather than being different draws of one method.",
          weight: 4,
          required: true,
        },
        {
          id: "the-leakage-failure",
          description:
            "The failure mode is leakage: if the combiner is trained on predictions the base models made for rows they were fitted on, it learns to trust whichever model memorised hardest, and the whole stack is optimistic.",
          weight: 5,
          required: true,
        },
        {
          id: "the-fix",
          description:
            "Bonus: names the fix — train the combiner on out-of-fold predictions so every prediction it sees came from a model that did not see that row.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.75,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["ensemble-methods", "decision-tree"],
    source: ML_06,
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
  },


  {
    id: "bagging--apply-oob-fraction",
    conceptId: "bagging",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "A bootstrap sample draws n rows with replacement from n. The probability a given row is never drawn is (1 − 1/n)ⁿ, which tends to e⁻¹. Give that limiting fraction to three decimal places.",
    answerKey: 0.368,
    tolerance: 0.005,
    difficulty: 0.6,
    discrimination: 1.3,
    expectedSeconds: 90,
    prereqClosure: ["bagging"],
    source: ML_06,
    status: "live",
  },
  {
    id: "bagging--explain-why-trees-are-the-base-learner",
    conceptId: "bagging",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Bagging is almost always applied to deep trees rather than to some other model. What property of trees makes them the natural base learner, and what would happen with a stable one?",
    rubric: {
      elements: [
        {
          id: "instability-creates-diversity",
          description:
            "Trees are unstable: a slightly different sample changes which split wins at the root and thus the whole structure — so 'slightly different data' is enough to produce genuinely different models.",
          weight: 4,
          required: true,
        },
        {
          id: "stable-learners-give-nothing",
          description:
            "A stable learner produces near-identical members across resamples, their average is essentially the original model, and the systematic error is untouched — the procedure costs B fits and returns nothing.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.15,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["bagging", "ensemble-methods", "decision-tree"],
    source: ML_06,
    status: "live",
  },
  {
    id: "bagging--transfer-oob-vs-cross-validation",
    conceptId: "bagging",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Out-of-bag error is often described as free cross-validation. Where is that fair, and where does the analogy break down?",
    rubric: {
      elements: [
        {
          id: "where-it-is-fair",
          description:
            "Fair in that every row is scored by models that never saw it, at no extra fitting cost — it is genuinely held-out and available during training.",
          weight: 4,
          required: true,
        },
        {
          id: "where-it-breaks",
          description:
            "It breaks in that each row is predicted by only about a third of the ensemble rather than the whole thing, so the estimate is slightly pessimistic — noticeably so when the ensemble is small.",
          weight: 4,
          required: true,
        },
        {
          id: "practical-verdict",
          description:
            "Bonus: gives the practical verdict — close enough to k-fold for model selection on a large forest, not a substitute for a final held-out test set.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.65,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["bagging", "ensemble-methods"],
    source: ML_06,
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
  },


  {
    id: "random-forests--apply-default-mtry",
    conceptId: "random-forests",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "For classification the usual default is to consider √d features at each split. With d = 64 features, how many are considered per split?",
    answerKey: 8,
    tolerance: 0.001,
    difficulty: 0.35,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["random-forests"],
    source: ML_06,
    status: "live",
  },
  {
    id: "random-forests--explain-importance-bias",
    conceptId: "random-forests",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "The default impurity-based feature importance from a forest is known to be biased. In which direction, why, and what should be used instead?",
    rubric: {
      elements: [
        {
          id: "direction-and-cause",
          description:
            "It favours high-cardinality and continuous features, because they offer more candidate split points and therefore more chances to reduce impurity by luck alone.",
          weight: 4,
          required: true,
        },
        {
          id: "correlated-features-split-credit",
          description:
            "Correlated features also divide their importance between them, so each looks unimportant even when the group jointly matters.",
          weight: 3,
          required: true,
        },
        {
          id: "the-alternatives",
          description:
            "Names honest alternatives: permutation importance computed on held-out data, or SHAP values.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.1,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["random-forests", "splitting-criteria"],
    source: ML_06,
    status: "live",
  },
  {
    id: "random-forests--transfer-when-boosting-wins",
    conceptId: "random-forests",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Gradient boosting usually beats a random forest at the top of a leaderboard, yet forests remain the recommended first model on new tabular data. Reconcile those two facts.",
    rubric: {
      elements: [
        {
          id: "boosting-wins-after-tuning",
          description:
            "Boosting's advantage is realised only after tuning — the round count, learning rate and depth interact, and a wrong setting actively harms results.",
          weight: 4,
          required: true,
        },
        {
          id: "forest-is-strong-untuned",
          description:
            "A forest gives most of the achievable accuracy with essentially no tuning, cannot be hurt by adding trees, and reports an out-of-bag estimate for free — so it establishes a trustworthy baseline before any effort is spent.",
          weight: 4,
          required: true,
        },
        {
          id: "the-decision-rule",
          description:
            "Bonus: draws the rule — start with a forest to find out what the problem allows, then spend tuning budget on boosting only if the gap is worth it.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.5,
    expectedSeconds: 220,
    prereqClosure: ["random-forests", "bagging", "ensemble-methods"],
    source: ML_06,
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
  },


  {
    id: "adaboost--apply-vote-weight",
    conceptId: "adaboost",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "AdaBoost's vote weight is α = ½·ln((1 − ε)/ε). A weak learner has weighted error ε = 0.2. Compute α to three decimal places.",
    answerKey: 0.693,
    tolerance: 0.005,
    difficulty: 0.75,
    discrimination: 1.4,
    expectedSeconds: 110,
    prereqClosure: ["adaboost"],
    source: ML_06,
    status: "live",
  },
  {
    id: "adaboost--explain-alpha-behaviour",
    conceptId: "adaboost",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Read the vote weight α = ½·ln((1 − ε)/ε) at ε = 0.5, at ε near 0, and at ε > 0.5. What does each case say about the requirement AdaBoost places on a weak learner?",
    rubric: {
      elements: [
        {
          id: "at-half",
          description:
            "At ε = 0.5, α = 0: a learner no better than chance gets no vote at all and contributes nothing.",
          weight: 3,
          required: true,
        },
        {
          id: "near-zero",
          description:
            "As ε → 0, α → ∞: an almost-perfect learner is given an overwhelming vote.",
          weight: 3,
          required: true,
        },
        {
          id: "above-half",
          description:
            "For ε > 0.5, α is negative — a worse-than-random learner is used backwards, which still contributes information.",
          weight: 3,
          required: true,
        },
        {
          id: "the-requirement",
          description:
            "Concludes that the only requirement is beating chance, which is what makes depth-1 stumps a legitimate base learner.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.25,
    discrimination: 1.7,
    expectedSeconds: 210,
    prereqClosure: ["adaboost"],
    source: ML_06,
    status: "live",
  },
  {
    id: "adaboost--transfer-loss-choice-and-noise",
    conceptId: "adaboost",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "AdaBoost is equivalent to stagewise fitting under an exponential loss. Use that to explain its noise sensitivity, and say what changing the loss buys.",
    rubric: {
      elements: [
        {
          id: "exponential-loss-is-unbounded",
          description:
            "The exponential loss grows without bound as an example is misclassified more confidently, which is exactly what drives a mislabelled point's weight up round after round.",
          weight: 4,
          required: true,
        },
        {
          id: "the-loss-is-the-cause",
          description:
            "So the fragility is a property of the loss rather than of boosting as such — the reweighting is just that loss's gradient in disguise.",
          weight: 4,
          required: true,
        },
        {
          id: "what-a-different-loss-buys",
          description:
            "Names the payoff: a logistic or otherwise bounded loss penalises confident errors far less steeply, so a single wrong label cannot capture the ensemble.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.75,
    discrimination: 1.6,
    expectedSeconds: 230,
    prereqClosure: ["adaboost", "ensemble-methods"],
    source: ML_06,
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
  },


  {
    id: "gradient-boosting--apply-shrinkage-tradeoff",
    conceptId: "gradient-boosting",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "As a rule of thumb, halving the learning rate requires roughly doubling the number of rounds for a comparable fit. A model uses ν = 0.1 with 500 rounds. Roughly how many rounds would ν = 0.0125 need?",
    answerKey: 4000,
    tolerance: 1,
    difficulty: 1.2,
    discrimination: 1.3,
    expectedSeconds: 120,
    prereqClosure: ["gradient-boosting"],
    source: ML_06,
    status: "live",
  },
  {
    id: "gradient-boosting--explain-depth-sets-interaction-order",
    conceptId: "gradient-boosting",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "In gradient boosting, tree depth is often described as setting the interaction order rather than the model's complexity. Explain what depth 1 and depth 2 each permit.",
    rubric: {
      elements: [
        {
          id: "depth-one-is-additive",
          description:
            "Depth 1 — a stump — splits on one feature, so the summed model is purely additive: a sum of functions of individual features, with no interactions at all.",
          weight: 4,
          required: true,
        },
        {
          id: "depth-two-allows-pairs",
          description:
            "Depth 2 allows a split on one feature followed by another, so the model can express pairwise interactions, and depth k up to k-way ones.",
          weight: 4,
          required: true,
        },
        {
          id: "why-it-is-not-just-complexity",
          description:
            "Bonus: notes that this makes depth a statement about the *kind* of structure the model may represent, which is why it is chosen from domain knowledge as much as from validation.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.7,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["gradient-boosting", "decision-tree"],
    source: ML_06,
    status: "live",
  },
  {
    id: "gradient-boosting--transfer-loss-menu",
    conceptId: "gradient-boosting",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A forecasting team needs the 90th percentile of demand rather than its mean, so that stock covers demand 90% of the time. How does gradient boosting accommodate that, and what property of the algorithm makes it possible?",
    rubric: {
      elements: [
        {
          id: "quantile-loss",
          description:
            "Fit with a pinball (quantile) loss at τ = 0.9, whose minimiser is the conditional 90th percentile rather than the conditional mean.",
          weight: 4,
          required: true,
        },
        {
          id: "only-the-gradient-is-needed",
          description:
            "It is possible because the algorithm never needs the loss's minimiser in closed form — only its gradient at each training point — so any differentiable loss can be substituted without changing the machinery.",
          weight: 5,
          required: true,
        },
      ],
    },
    difficulty: 2.2,
    discrimination: 1.6,
    expectedSeconds: 230,
    prereqClosure: ["gradient-boosting", "loss-functions", "gradient-descent"],
    source: ML_06,
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
  },

  {
    id: "xgboost--apply-leaf-weight-formula",
    conceptId: "xgboost",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "XGBoost's optimal leaf weight is −Σg/(Σh + λ), where g and h are the summed gradients and Hessians in the leaf. With Σg = 6, Σh = 4 and λ = 2, compute the leaf weight.",
    answerKey: -1,
    tolerance: 0.005,
    difficulty: 1.25,
    discrimination: 1.4,
    expectedSeconds: 110,
    prereqClosure: ["xgboost", "gradient-boosting"],
    source: ML_06,
    status: "live",
  },
  {
    id: "xgboost--explain-gamma-as-a-split-threshold",
    conceptId: "xgboost",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "In Ω(f) = γT + ½λ‖w‖², the γ term is often described as a minimum gain required to justify a split. Explain why penalising the leaf count has exactly that effect.",
    rubric: {
      elements: [
        {
          id: "a-split-adds-a-leaf",
          description:
            "Every split converts one leaf into two, so it adds γ to the objective — a fixed cost charged for the extra leaf.",
          weight: 4,
          required: true,
        },
        {
          id: "so-gain-must-exceed-gamma",
          description:
            "The split is therefore taken only if the loss reduction it buys exceeds γ, which is precisely a minimum-gain threshold expressed as a penalty rather than as a stopping rule.",
          weight: 4,
          required: true,
        },
        {
          id: "why-that-is-better",
          description:
            "Bonus: notes the advantage over an external stopping rule — the threshold is inside the criterion the split finder already optimises, so it is applied consistently everywhere.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["xgboost", "gradient-boosting"],
    source: ML_06,
    status: "live",
  },
  {
    id: "xgboost--transfer-second-order-payoff",
    conceptId: "xgboost",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Standard gradient boosting uses only the first derivative of the loss; XGBoost uses a second-order expansion. What does the extra derivative buy, and why is it affordable here when second-order methods are usually not?",
    rubric: {
      elements: [
        {
          id: "newton-step-not-gradient-step",
          description:
            "Using the Hessian makes each leaf value a Newton step rather than a gradient step, so the update is scaled by the local curvature and converges in fewer rounds.",
          weight: 4,
          required: true,
        },
        {
          id: "why-affordable",
          description:
            "It is affordable because the Hessian needed is per-example and scalar — the second derivative of the loss with respect to that example's prediction — not a full parameter-space matrix to be formed or inverted.",
          weight: 5,
          required: true,
        },
        {
          id: "also-feeds-the-split-gain",
          description:
            "Bonus: notes the same quantities feed the split-gain formula, so the curvature improves which splits are chosen and not just the leaf values.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.35,
    discrimination: 1.6,
    expectedSeconds: 240,
    prereqClosure: ["xgboost", "gradient-boosting", "matrix-calculus"],
    source: ML_06,
    status: "live",
  },

  // =========================================================================
  // Doubling pass — additional items per concept
  // =========================================================================

  // --- Decision Tree ---------------------------------------------------------
  {
    id: "decision-tree--recall-leaf-content",
    conceptId: "decision-tree",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What does a leaf node in a decision tree store?",
    choices: [
      { id: "a", text: "A predicted value — the majority class or the mean of the training targets that reached it", correct: true },
      {
        id: "b",
        text: "A splitting rule on some feature",
        correct: false,
        misconception: {
          id: "leaf-confused-with-internal-node",
          description:
            "Splitting rules live on internal nodes. A leaf is where the recursion stopped, and it holds a prediction, not a further test.",
          blameConceptId: "decision-tree",
        },
      },
      {
        id: "c",
        text: "The overall training accuracy of the tree",
        correct: false,
        misconception: {
          id: "leaf-confused-with-global-metric",
          description: "Accuracy is a property of the whole tree evaluated against data, not something any single leaf stores.",
          blameConceptId: "decision-tree",
        },
      },
      {
        id: "d",
        text: "A reference back to the root node",
        correct: false,
        misconception: {
          id: "leaf-thought-to-store-root-pointer",
          description: "Trees are traversed root-to-leaf; a leaf has no need to point back, and none of the common implementations store one.",
          blameConceptId: "decision-tree",
        },
      },
    ],
    difficulty: -2.2,
    discrimination: 1.0,
    expectedSeconds: 20,
    prereqClosure: ["decision-tree"],
    source: ML_06,
    status: "live",
  },
  {
    id: "decision-tree--recall-partition-description",
    conceptId: "decision-tree",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "In one sentence, state what a decision tree partitions the feature space into, and how a prediction is made within one such region.",
    rubric: {
      elements: [
        {
          id: "axis-aligned-regions",
          description: "Recursively partitions the feature space into axis-aligned regions (rectangular boxes when features are continuous).",
          weight: 3,
          required: true,
        },
        {
          id: "constant-within-region",
          description: "The prediction is constant within a region: whatever the corresponding leaf's majority class or target mean is.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: -1.6,
    discrimination: 1.0,
    expectedSeconds: 45,
    prereqClosure: ["decision-tree"],
    source: ML_06,
    status: "live",
  },
  {
    id: "decision-tree--apply-stump-boundary",
    conceptId: "decision-tree",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "A tree is restricted to depth 1 (a single split, a 'stump') over two continuous features. What is the most complex decision boundary it can produce, and how many regions result?",
    rubric: {
      elements: [
        {
          id: "single-axis-aligned-cut",
          description:
            "Exactly one axis-aligned cut on one feature, producing two regions (two half-planes divided by a line parallel to an axis).",
          weight: 4,
          required: true,
        },
        {
          id: "no-interaction",
          description:
            "The boundary depends on only one feature, so it cannot represent any interaction between the two — the other feature plays no role at all.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: -0.2,
    discrimination: 1.3,
    expectedSeconds: 100,
    prereqClosure: ["decision-tree"],
    source: ML_06,
    status: "live",
  },
  {
    id: "decision-tree--apply-categorical-split",
    conceptId: "decision-tree",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed"],
    stem: "A tree splits on a categorical feature 'colour' with values {red, green, blue}. Which best describes how a standard binary tree splits on it?",
    choices: [
      {
        id: "a",
        text: "By grouping the categories into two disjoint subsets, e.g. {red} vs {green, blue}, chosen to best separate the classes",
        correct: true,
      },
      {
        id: "b",
        text: "By averaging the categories into a single numeric code and thresholding it",
        correct: false,
        misconception: {
          id: "categorical-treated-as-numeric-average",
          description:
            "Categories have no order to average over. Encoding them as arbitrary numbers and thresholding would impose a fake ordering the criterion did not choose.",
          blameConceptId: "decision-tree",
        },
      },
      {
        id: "c",
        text: "It cannot split on categorical features at all",
        correct: false,
        misconception: {
          id: "trees-thought-numeric-only",
          description: "Trees split on categorical features routinely, by grouping categories, not by refusing to handle them.",
          blameConceptId: "decision-tree",
        },
      },
      {
        id: "d",
        text: "By giving every category its own branch, no matter how many categories there are",
        correct: false,
        misconception: {
          id: "categorical-split-assumed-always-multiway",
          description:
            "A one-branch-per-category split is possible in some algorithms but is not what a standard binary tree does, and it fragments the data badly when a feature has many categories.",
          blameConceptId: "decision-tree",
        },
      },
    ],
    difficulty: 0.6,
    discrimination: 1.3,
    expectedSeconds: 45,
    prereqClosure: ["decision-tree"],
    source: ML_06,
    status: "live",
  },
  {
    id: "decision-tree--explain-shallow-tree-underfits",
    conceptId: "decision-tree",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "A tree capped at depth 2 underfits a dataset with genuinely complex structure. Explain the mechanism, and say whether more training data would fix it.",
    rubric: {
      elements: [
        {
          id: "leaf-count-caps-expressiveness",
          description:
            "A depth-2 tree has at most 4 leaves, so it can represent at most 4 distinct predictions — nowhere near enough regions to capture finer structure in the true boundary.",
          weight: 4,
          required: true,
        },
        {
          id: "bias-not-fixed-by-data",
          description:
            "This is a bias problem, not a variance problem — the model class itself is too simple, so more data narrows the estimate of the same wrong function rather than fixing the underfit.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.0,
    discrimination: 1.5,
    expectedSeconds: 170,
    prereqClosure: ["decision-tree"],
    source: ML_06,
    status: "live",
  },
  {
    id: "decision-tree--explain-nonmonotone-feature",
    conceptId: "decision-tree",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "A feature has a U-shaped relationship with the target: the target is high at both low and high values of the feature and low in the middle. Contrast how a tree and a linear model each handle this.",
    rubric: {
      elements: [
        {
          id: "tree-handles-directly",
          description:
            "A tree captures the U-shape directly: it can split the feature into three ranges and give each its own constant prediction, since regions need not follow any monotone order.",
          weight: 4,
          required: true,
        },
        {
          id: "linear-needs-engineering",
          description:
            "A linear model assumes one fixed-sign slope, so it needs an explicit engineered term (e.g. a quadratic) to represent a U-shape at all — the tree needs no such feature engineering.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["decision-tree"],
    source: ML_06,
    status: "live",
  },
  {
    id: "decision-tree--transfer-diagonal-margin-boundary",
    conceptId: "decision-tree",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A two-class dataset is perfectly separated by a single diagonal line with a wide margin. Contrast how many splits a decision tree needs to approximate that boundary well against how many a linear classifier needs, and say what that implies about the resulting tree's interpretability.",
    rubric: {
      elements: [
        {
          id: "staircase-scales-with-resolution",
          description:
            "A diagonal boundary needs a staircase of axis-aligned cuts, and the number needed to approximate it well grows as the desired resolution improves; a linear classifier needs exactly one line regardless.",
          weight: 4,
          required: true,
        },
        {
          id: "interpretability-cost",
          description:
            "The resulting tree, despite being nominally 'interpretable', has many splits whose individual thresholds carry no meaning on their own — the staircase as a whole encodes the diagonal, not any single rule, so the nominal interpretability is largely lost.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.1,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["decision-tree"],
    source: ML_06,
    status: "live",
  },
  {
    id: "decision-tree--transfer-density-following-vs-axis-aligned",
    conceptId: "decision-tree",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A boundary is defined by the ratio of two features, x1/x2 > c — a curve through the origin, not aligned to either axis. Explain why this is awkward for a decision tree specifically, and what change to the input would make it easy.",
    rubric: {
      elements: [
        {
          id: "ratio-boundary-is-curved-and-unaligned",
          description:
            "The boundary is a curve that is not parallel to either axis, so no single axis-aligned split captures it, and a staircase of many splits on x1 and x2 together is needed to approximate the curve.",
          weight: 4,
          required: true,
        },
        {
          id: "engineer-the-ratio",
          description:
            "Adding x1/x2 itself as an input feature turns the boundary into a single threshold on that new feature — one split solves what many splits on the originals could only approximate.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.4,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["decision-tree"],
    source: ML_06,
    status: "live",
  },

  // --- Splitting Criteria ------------------------------------------------------
  {
    id: "splitting-criteria--recall-entropy-formula",
    conceptId: "splitting-criteria",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "State the formula for the entropy of a node with class proportions pᵢ, and what value it takes at a pure node.",
    rubric: {
      elements: [
        { id: "formula", description: "Entropy = −Σ pᵢ log₂(pᵢ).", weight: 3, required: true },
        { id: "pure-value", description: "At a pure node, one pᵢ = 1 and the rest are 0, giving entropy 0.", weight: 3, required: true },
      ],
    },
    difficulty: -2.0,
    discrimination: 1.0,
    expectedSeconds: 40,
    prereqClosure: ["splitting-criteria"],
    source: ML_06,
    status: "live",
  },
  {
    id: "splitting-criteria--recall-inputs-to-criterion",
    conceptId: "splitting-criteria",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Gini impurity and entropy are computed from:",
    choices: [
      { id: "a", text: "only the class proportions within a node, not the raw feature values that produced it", correct: true },
      {
        id: "b",
        text: "the raw feature values directly",
        correct: false,
        misconception: {
          id: "criterion-confused-with-feature-values",
          description: "The criterion only ever sees the resulting class distribution in a node, never the feature values themselves.",
          blameConceptId: "splitting-criteria",
        },
      },
      {
        id: "c",
        text: "the number of features available to split on",
        correct: false,
        misconception: {
          id: "criterion-confused-with-feature-count",
          description: "Feature count affects which splits are considered, not the impurity value computed once a split's children are known.",
          blameConceptId: "splitting-criteria",
        },
      },
      {
        id: "d",
        text: "the depth of the node within the tree",
        correct: false,
        misconception: {
          id: "criterion-confused-with-depth",
          description: "Impurity depends only on the class mixture at a node, not on how many splits it took to get there.",
          blameConceptId: "splitting-criteria",
        },
      },
    ],
    difficulty: -1.7,
    discrimination: 1.0,
    expectedSeconds: 30,
    prereqClosure: ["splitting-criteria"],
    source: ML_06,
    status: "live",
  },
  {
    id: "splitting-criteria--apply-gini-70-30",
    conceptId: "splitting-criteria",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "Using Gini = 1 − Σpᵢ², compute the Gini impurity of a binary node with class proportions (0.7, 0.3).",
    answerKey: 0.42,
    tolerance: 0.005,
    difficulty: -0.1,
    discrimination: 1.2,
    expectedSeconds: 55,
    prereqClosure: ["splitting-criteria"],
    source: ML_06,
    status: "live",
  },
  {
    id: "splitting-criteria--apply-gini-three-classes",
    conceptId: "splitting-criteria",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "A node has three classes with proportions (0.5, 0.3, 0.2). Compute its Gini impurity.",
    answerKey: 0.62,
    tolerance: 0.005,
    difficulty: 0.5,
    discrimination: 1.3,
    expectedSeconds: 70,
    prereqClosure: ["splitting-criteria"],
    source: ML_06,
    status: "live",
  },
  {
    id: "splitting-criteria--explain-entropy-bounds-and-max",
    conceptId: "splitting-criteria",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem: "Explain why entropy is always ≥ 0, and why the binary entropy −p log₂ p − (1−p) log₂(1−p) is maximised exactly at p = ½.",
    rubric: {
      elements: [
        {
          id: "nonnegativity",
          description: "Every term −pᵢ log₂ pᵢ is ≥ 0 since pᵢ ∈ [0,1] makes log₂ pᵢ ≤ 0, so the sum is always ≥ 0.",
          weight: 3,
          required: true,
        },
        {
          id: "max-at-half",
          description:
            "The binary form is maximised at p = ½, matching the point of maximal unpredictability of a single yes/no outcome — the same point where a fair coin flip is hardest to guess.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.5,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["splitting-criteria"],
    source: ML_06,
    status: "live",
  },
  {
    id: "splitting-criteria--explain-gini-entropy-agreement",
    conceptId: "splitting-criteria",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Gini and entropy almost always pick the same split in practice despite differing formulas. Explain why, and when they might disagree.",
    rubric: {
      elements: [
        {
          id: "both-concave-and-similarly-shaped",
          description:
            "Both are concave functions of the class proportions that equal 0 at purity and are maximised at the uniform mixture, so they behave similarly enough to usually rank candidate splits the same way.",
          weight: 4,
          required: true,
        },
        {
          id: "rare-disagreement",
          description:
            "They can disagree in close calls between a slightly purer split and a slightly more balanced one, since their curvature near the extremes differs subtly — but disagreements are rare and small in effect, a difference in emphasis rather than direction.",
          weight: 3,
        },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["splitting-criteria"],
    source: ML_06,
    status: "live",
  },
  {
    id: "splitting-criteria--transfer-candidate-thresholds",
    conceptId: "splitting-criteria",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "For a continuous feature, a split evaluates candidate thresholds. Explain what a candidate threshold is, and why it suffices to consider only the midpoints between consecutive sorted distinct values rather than every real number.",
    rubric: {
      elements: [
        {
          id: "threshold-definition",
          description: "A candidate threshold is a value splitting the sorted training values into a low group and a high group.",
          weight: 3,
          required: true,
        },
        {
          id: "midpoints-suffice",
          description:
            "Between any two consecutive distinct observed values, every threshold in that gap partitions the training points identically, so only the midpoints — one per gap — need to be evaluated; checking more is wasted computation with no change in outcome.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["splitting-criteria"],
    source: ML_06,
    status: "live",
  },
  {
    id: "splitting-criteria--transfer-cost-asymmetry",
    conceptId: "splitting-criteria",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "In a fraud-detection setting, missing a fraud case is far costlier than a false alarm. Splitting criteria like Gini and entropy treat every class symmetrically. Explain what that means in practice and one standard adjustment.",
    rubric: {
      elements: [
        {
          id: "symmetry-in-the-criterion",
          description:
            "Gini and entropy only measure how mixed the classes are, weighted by child size — a split that reduces impurity is scored identically regardless of which class the remaining errors fall on, so the criterion has no notion that one kind of mistake is worse than the other.",
          weight: 4,
          required: true,
        },
        {
          id: "adjustment",
          description:
            "Standard adjustment: apply class weights (inflating the effective count of the costly class) or a cost-sensitive impurity measure, so the criterion itself is biased toward splits that protect against the expensive error.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.15,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["splitting-criteria"],
    source: ML_06,
    status: "live",
  },

  // --- Pruning Trees ------------------------------------------------------------
  {
    id: "pruning-trees--recall-minimiser-set",
    conceptId: "pruning-trees",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Cost-complexity pruning's objective, R(T) + α·|leaves(T)|, is minimised over:",
    choices: [
      { id: "a", text: "candidate subtrees obtained by collapsing branches of the fully grown tree", correct: true },
      {
        id: "b",
        text: "every possible tree shape, not just subtrees of the one already grown",
        correct: false,
        misconception: {
          id: "pruning-thought-to-search-all-trees",
          description:
            "Pruning only ever removes branches from the tree already grown (weakest-link pruning); it never searches the space of all possible trees.",
          blameConceptId: "pruning-trees",
        },
      },
      {
        id: "c",
        text: "the choice of splitting criterion",
        correct: false,
        misconception: {
          id: "pruning-confused-with-criterion-choice",
          description: "Pruning happens after the tree (and its splits) are already fixed; it does not revisit which criterion chose them.",
          blameConceptId: "pruning-trees",
        },
      },
      {
        id: "d",
        text: "which training samples were used to fit the tree",
        correct: false,
        misconception: {
          id: "pruning-confused-with-resampling",
          description: "Pruning does not resample the data; it operates on the structure of the already-fitted tree.",
          blameConceptId: "pruning-trees",
        },
      },
    ],
    difficulty: -1.8,
    discrimination: 1.0,
    expectedSeconds: 40,
    prereqClosure: ["pruning-trees"],
    source: ML_06,
    status: "live",
  },
  {
    id: "pruning-trees--recall-vs-preset-limits",
    conceptId: "pruning-trees",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Name a hyperparameter (other than α) that controls tree complexity a different way than pruning, and say why α exists in addition to it.",
    rubric: {
      elements: [
        {
          id: "names-a-preset-limit",
          description: "Names one of max_depth, min_samples_leaf, or min_samples_split, which cap complexity before or during growth.",
          weight: 3,
          required: true,
        },
        {
          id: "why-alpha-in-addition",
          description:
            "α exists to resolve the accuracy/complexity trade-off after the tree is fully grown, tuned against held-out data, rather than only by a fixed limit chosen before growth.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: -1.4,
    discrimination: 1.0,
    expectedSeconds: 60,
    prereqClosure: ["pruning-trees"],
    source: ML_06,
    status: "live",
  },
  {
    id: "pruning-trees--apply-cost-complexity-value",
    conceptId: "pruning-trees",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "A subtree has R(T) = 0.05 with 20 leaves. Using cost-complexity R(T) + α·|leaves|, what is its cost-complexity at α = 0.002?",
    answerKey: 0.09,
    tolerance: 0.001,
    difficulty: -0.3,
    discrimination: 1.2,
    expectedSeconds: 80,
    prereqClosure: ["pruning-trees"],
    source: ML_06,
    status: "live",
  },
  {
    id: "pruning-trees--apply-compare-two-subtrees",
    conceptId: "pruning-trees",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "Two candidate subtrees: A has R = 0.12 with 6 leaves; B has R = 0.09 with 10 leaves. At α = 0.01, give the lower of the two cost-complexity values, to two decimal places.",
    answerKey: 0.18,
    tolerance: 0.005,
    difficulty: 0.5,
    discrimination: 1.3,
    expectedSeconds: 130,
    prereqClosure: ["pruning-trees"],
    source: ML_06,
    status: "live",
  },
  {
    id: "pruning-trees--explain-weakest-link-order",
    conceptId: "pruning-trees",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Cost-complexity pruning is described as 'weakest-link' pruning. Explain what determines which branch is cut first as α rises from 0, and what this produces as α keeps increasing.",
    rubric: {
      elements: [
        {
          id: "weakest-link-defined",
          description:
            "As α rises from 0, the first branch removed is the one whose removal costs the smallest increase in R(T) per leaf given up — the 'weakest link' in the tree.",
          weight: 4,
          required: true,
        },
        {
          id: "nested-sequence",
          description:
            "This produces a nested sequence of successively smaller subtrees as α increases, rather than an arbitrary search over all possible subtrees.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.2,
    discrimination: 1.5,
    expectedSeconds: 170,
    prereqClosure: ["pruning-trees"],
    source: ML_06,
    status: "live",
  },
  {
    id: "pruning-trees--explain-cv-vs-single-split",
    conceptId: "pruning-trees",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "A tree's α is chosen using k-fold cross-validation rather than a single train/validation split. What does this buy over the single split, and what does it cost?",
    rubric: {
      elements: [
        {
          id: "benefit",
          description:
            "Cross-validation averages the α decision over several folds, so the choice is less sensitive to which particular rows happened to land in one validation set.",
          weight: 4,
          required: true,
        },
        {
          id: "cost",
          description: "The cost is refitting the tree k times (once per fold) instead of once, for the same final decision.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.85,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["pruning-trees"],
    source: ML_06,
    status: "live",
  },
  {
    id: "pruning-trees--transfer-training-accuracy-threshold",
    conceptId: "pruning-trees",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A colleague proposes skipping the α search and just picking the smallest tree whose training accuracy exceeds 95%. Explain what is wrong with using training accuracy as a pruning criterion at all.",
    rubric: {
      elements: [
        {
          id: "monotone-in-size",
          description:
            "Training accuracy is monotonically non-decreasing in tree size, so any fixed threshold is met by trees already close to fully grown — the criterion cannot distinguish 'stopped because it generalises' from 'stopped because we told it to'.",
          weight: 4,
          required: true,
        },
        {
          id: "why-held-out-data-is-needed",
          description:
            "This is exactly why α is tuned on held-out data: training performance never argues for pruning at all, since it always prefers more leaves.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.05,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["pruning-trees"],
    source: ML_06,
    status: "live",
  },
  {
    id: "pruning-trees--transfer-early-stopping-parallel",
    conceptId: "pruning-trees",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Boosting algorithms stop adding trees once a validation metric stops improving — a technique called early stopping. Compare this to cost-complexity pruning of a single tree: what is being trimmed in each, and what stays constant while it happens?",
    rubric: {
      elements: [
        {
          id: "what-is-trimmed",
          description:
            "Pruning trims completed branches of one already-grown tree after the fact; early stopping halts the addition of further trees to an ensemble, so nothing beyond the stopping point is grown at all rather than grown and then cut.",
          weight: 4,
          required: true,
        },
        {
          id: "what-stays-constant",
          description:
            "In both, the fitting rule used to grow whatever is kept never changes — pruning does not re-split the surviving branches, and early stopping does not refit earlier rounds; only how much of the already-committed structure survives is decided.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.3,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["pruning-trees", "decision-tree"],
    source: ML_06,
    status: "live",
  },

  // --- Ensemble Methods ----------------------------------------------------------
  {
    id: "ensemble-methods--recall-combination-not-selection",
    conceptId: "ensemble-methods",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "An ensemble's prediction on a new example is typically formed by:",
    choices: [
      { id: "a", text: "combining every member's prediction (e.g. by averaging or a vote), not selecting just one member", correct: true },
      {
        id: "b",
        text: "picking whichever single member has historically been most accurate and using only its prediction",
        correct: false,
        misconception: {
          id: "ensemble-confused-with-best-member-selection",
          description: "Selecting the single best member is model selection, not ensembling — the statistical gain requires combining, not choosing.",
          blameConceptId: "ensemble-methods",
        },
      },
      {
        id: "c",
        text: "training a single larger model on the combined predictions of all members as extra training data",
        correct: false,
        misconception: {
          id: "ensemble-confused-with-retraining",
          description: "This describes something closer to a form of distillation, not the basic combination step of an ensemble.",
          blameConceptId: "ensemble-methods",
        },
      },
      {
        id: "d",
        text: "running only the fastest member at prediction time to save compute",
        correct: false,
        misconception: {
          id: "ensemble-confused-with-cheapest-member",
          description: "Using only one member for speed abandons the ensembling itself; the whole point is combining several predictions.",
          blameConceptId: "ensemble-methods",
        },
      },
    ],
    difficulty: -1.9,
    discrimination: 1.0,
    expectedSeconds: 30,
    prereqClosure: ["ensemble-methods"],
    source: ML_06,
    status: "live",
  },
  {
    id: "ensemble-methods--recall-two-families",
    conceptId: "ensemble-methods",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Name the two broad families of ensembling by how members are diversified, and give one example algorithm of each.",
    rubric: {
      elements: [
        {
          id: "two-families",
          description:
            "Parallel/independent diversification (e.g. bagging, random forests) versus sequential/adaptive diversification (e.g. boosting).",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: -1.5,
    discrimination: 1.0,
    expectedSeconds: 45,
    prereqClosure: ["ensemble-methods"],
    source: ML_06,
    status: "live",
  },
  {
    id: "ensemble-methods--apply-averaged-variance-five",
    conceptId: "ensemble-methods",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "Five independent models each have prediction variance σ² = 9. What is the variance of their simple average?",
    answerKey: 1.8,
    tolerance: 0.005,
    difficulty: -0.2,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["ensemble-methods"],
    source: ML_06,
    status: "live",
  },
  {
    id: "ensemble-methods--apply-correlated-average-b9",
    conceptId: "ensemble-methods",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "The variance of an average of B correlated models is ρσ² + (1 − ρ)σ²/B. With σ² = 9, ρ = 0.3 and B = 9, what is the variance of the averaged prediction?",
    answerKey: 3.4,
    tolerance: 0.01,
    difficulty: 0.55,
    discrimination: 1.3,
    expectedSeconds: 120,
    prereqClosure: ["ensemble-methods"],
    source: ML_06,
    status: "live",
  },
  {
    id: "ensemble-methods--explain-variance-vs-bias-benefit",
    conceptId: "ensemble-methods",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Why does averaging help more for a high-variance, low-bias model (like a deep tree) than for a high-bias, low-variance one (like a shallow linear model)?",
    rubric: {
      elements: [
        {
          id: "more-variance-to-remove",
          description: "Averaging removes variance, so it has more to remove when the base model is high-variance; a low-variance model has little fluctuation to cancel.",
          weight: 4,
          required: true,
        },
        {
          id: "bias-untouched",
          description:
            "Averaging leaves bias untouched, so a high-bias model gains nothing regardless — its systematic error is the same no matter how many copies are averaged.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.15,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["ensemble-methods"],
    source: ML_06,
    status: "live",
  },
  {
    id: "ensemble-methods--explain-two-model-ensemble",
    conceptId: "ensemble-methods",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "An ensemble of two models is compared to a single model with the average of their individual accuracies. Explain why the ensemble can beat both, and under what condition it instead does no better than the average.",
    rubric: {
      elements: [
        {
          id: "less-than-perfect-correlation-helps",
          description:
            "When the two models' errors are less than perfectly correlated, some of each one's mistakes are corrected by the other, so the combination can exceed the average of their individual accuracies.",
          weight: 4,
          required: true,
        },
        {
          id: "perfect-correlation-fails",
          description:
            "If both models make exactly the same errors (perfect correlation), there is nothing for one to correct in the other, and the ensemble does no better than either member alone.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.6,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["ensemble-methods"],
    source: ML_06,
    status: "live",
  },
  {
    id: "ensemble-methods--transfer-same-architecture-different-seeds",
    conceptId: "ensemble-methods",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A team ensembles five copies of the same neural network trained with different random seeds. Explain what source of diversity this relies on, and why it is weaker than an ensemble across genuinely different model families.",
    rubric: {
      elements: [
        {
          id: "weak-diversity-source",
          description:
            "Diversity here comes only from randomness in initialisation and optimisation trajectory — the models can still learn systematically similar functions if the architecture and data strongly constrain the solution.",
          weight: 4,
          required: true,
        },
        {
          id: "cross-family-is-stronger",
          description:
            "A cross-family ensemble draws on genuinely different inductive biases, so their errors are less likely to be correlated, which is a structurally stronger source of diversity than re-running the same recipe.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["ensemble-methods"],
    source: ML_06,
    status: "live",
  },
  {
    id: "ensemble-methods--transfer-weather-ensemble",
    conceptId: "ensemble-methods",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A forecaster averages the outputs of ten physically-different simulation models to produce an ensemble forecast. Relate this to the statistical argument for ensembling in machine learning, and name one way the ten models could still share a correlated error that averaging would not remove.",
    rubric: {
      elements: [
        {
          id: "same-argument",
          description:
            "Same argument: each model is a noisy estimate of the true weather state, and averaging reduces variance around that shared truth as long as the individual errors are not perfectly correlated.",
          weight: 4,
          required: true,
        },
        {
          id: "shared-error-source",
          description:
            "Names a shared source of error the average would not remove: all models trained/tuned on similar historical data, or all using the same imperfect initial-condition estimate, so a systematic bias common to all of them survives averaging.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.25,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["ensemble-methods"],
    source: ML_06,
    status: "live",
  },

  // --- Bagging ---------------------------------------------------------------
  {
    id: "bagging--recall-name-meaning",
    conceptId: "bagging",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "\"Bagging\" is short for:",
    choices: [
      { id: "a", text: "bootstrap aggregating", correct: true },
      {
        id: "b",
        text: "balanced aggregation",
        correct: false,
        misconception: {
          id: "bagging-name-confused-balanced",
          description: "Bagging has nothing to do with class balance; it names the bootstrap-then-aggregate procedure.",
          blameConceptId: "bagging",
        },
      },
      {
        id: "c",
        text: "boosted aggregation",
        correct: false,
        misconception: {
          id: "bagging-name-confused-boosted",
          description: "Bagging and boosting are different, independent families; the name does not derive from boosting.",
          blameConceptId: "bagging",
        },
      },
      {
        id: "d",
        text: "batch aggregation",
        correct: false,
        misconception: {
          id: "bagging-name-confused-batch",
          description: "The name refers to the bootstrap resampling step, not to processing data in batches.",
          blameConceptId: "bagging",
        },
      },
    ],
    difficulty: -2.0,
    discrimination: 0.9,
    expectedSeconds: 20,
    prereqClosure: ["bagging"],
    source: ML_06,
    status: "live",
  },
  {
    id: "bagging--recall-what-changes-what-stays-fixed",
    conceptId: "bagging",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "State what changes and what stays fixed about the model-fitting procedure itself when moving from a single decision tree to a bagged ensemble of trees.",
    rubric: {
      elements: [
        {
          id: "what-changes",
          description: "What changes: the training set each tree sees (a bootstrap resample) and how predictions are combined (averaged or voted).",
          weight: 3,
          required: true,
        },
        {
          id: "what-stays-fixed",
          description: "What stays fixed: the tree-fitting algorithm itself — the same splitting criterion and growth rule fits every member.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: -1.6,
    discrimination: 1.0,
    expectedSeconds: 55,
    prereqClosure: ["bagging"],
    source: ML_06,
    status: "live",
  },
  {
    id: "bagging--apply-sample-size",
    conceptId: "bagging",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "n = 200 rows. Bagging draws a bootstrap sample for each member. How many rows are in each member's training set?",
    answerKey: 200,
    tolerance: 0.001,
    difficulty: -1.0,
    discrimination: 1.0,
    expectedSeconds: 30,
    prereqClosure: ["bagging"],
    source: ML_06,
    status: "live",
  },
  {
    id: "bagging--apply-expected-distinct-rows",
    conceptId: "bagging",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "With n = 50, what is the expected number of distinct original rows appearing in one bootstrap sample, using the fact that each row is included with probability 1 − e⁻¹ ≈ 0.632?",
    answerKey: 31.6,
    tolerance: 0.5,
    difficulty: 0.85,
    discrimination: 1.3,
    expectedSeconds: 100,
    prereqClosure: ["bagging"],
    source: ML_06,
    status: "live",
  },
  {
    id: "bagging--explain-irreducible-noise-untouched",
    conceptId: "bagging",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Why does bagging not reduce the irreducible error component σ² of a prediction problem?",
    rubric: {
      elements: [
        {
          id: "sigma-is-a-property-of-data",
          description:
            "σ² is a property of the data-generating process — noise inherent even to the true function — not of any model's fit, so no amount of averaging models can shrink it.",
          weight: 4,
          required: true,
        },
        {
          id: "averaging-only-removes-variance",
          description:
            "Averaging only removes the variance component due to sampling instability in the fitted models, a separate term from σ² in the bias-variance-noise decomposition.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.05,
    discrimination: 1.6,
    expectedSeconds: 180,
    prereqClosure: ["bagging"],
    source: ML_06,
    status: "live",
  },
  {
    id: "bagging--explain-not-truly-independent-samples",
    conceptId: "bagging",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Bagging's variance reduction assumes the bootstrap samples behave like independent fresh samples from the population. In what specific way do they fail to be independent, and does this matter in practice?",
    rubric: {
      elements: [
        {
          id: "shared-source",
          description:
            "All bootstrap samples are drawn from the same single original dataset, so they share whatever sampling noise was present in that one dataset relative to the true population — they are not literally independent draws from the population.",
          weight: 4,
          required: true,
        },
        {
          id: "matters-less-in-practice",
          description:
            "In practice this matters less than it sounds: what bagging needs is for the trees to decorrelate enough for averaging to help, and instability in tree structure from resample to resample supplies enough of that even though the underlying data source is shared.",
          weight: 3,
        },
      ],
    },
    difficulty: 1.55,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["bagging"],
    source: ML_06,
    status: "live",
  },
  {
    id: "bagging--transfer-bagging-vs-cv-resampling",
    conceptId: "bagging",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Bagging and k-fold cross-validation both involve resampling the training data. Contrast their purposes, and explain what would go wrong if you tried to use bagging's bootstrap resamples as cross-validation folds.",
    rubric: {
      elements: [
        {
          id: "different-purposes",
          description:
            "Bagging resamples to train diverse models to combine into one predictor; cross-validation resamples (without replacement, into disjoint folds) to estimate how a fitting procedure generalises to unseen data.",
          weight: 4,
          required: true,
        },
        {
          id: "bootstrap-not-a-clean-holdout",
          description:
            "A bootstrap resample overlaps heavily with the original data (about 63% of rows are duplicated in), so evaluating on the rows left out of only one resample is a noisier, biased hold-out compared to a proper disjoint fold — exactly the gap the out-of-bag estimate has to work around.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["bagging"],
    source: ML_06,
    status: "live",
  },
  {
    id: "bagging--transfer-time-series-block-bootstrap",
    conceptId: "bagging",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A dataset has strong temporal structure: rows are daily observations and tomorrow depends on today. Explain why an ordinary bootstrap resample (drawing rows independently with replacement) undermines the assumptions bagging relies on here, and what alternative resampling would be more appropriate.",
    rubric: {
      elements: [
        {
          id: "ordinary-bootstrap-scrambles-order",
          description:
            "The ordinary bootstrap treats rows as exchangeable and independent, shuffling their order and duplicating/dropping days at random — this destroys the temporal dependence a model would need to learn from, so a tree fit this way is trained on scrambled dynamics.",
          weight: 4,
          required: true,
        },
        {
          id: "block-bootstrap-fix",
          description:
            "A block bootstrap — resampling contiguous chunks of consecutive days rather than single independent rows — preserves local temporal structure within each block while still providing resampling variability across members.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.2,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["bagging"],
    source: ML_06,
    status: "live",
  },

  // --- Random Forests ----------------------------------------------------------
  {
    id: "random-forests--recall-distinguishing-addition",
    conceptId: "random-forests",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Random forests differ from plain bagged trees specifically by adding:",
    choices: [
      { id: "a", text: "random feature subsampling at every split", correct: true },
      {
        id: "b",
        text: "bootstrap resampling of the training rows",
        correct: false,
        misconception: {
          id: "row-resampling-thought-to-be-the-addition",
          description: "Row resampling is shared with plain bagging; it is not what distinguishes a random forest from it.",
          blameConceptId: "random-forests",
        },
      },
      {
        id: "c",
        text: "pruning after each tree is trained",
        correct: false,
        misconception: {
          id: "forests-thought-to-prune",
          description: "Random forest trees are typically grown deep and unpruned, relying on averaging, not pruning, to control variance.",
          blameConceptId: "random-forests",
        },
      },
      {
        id: "d",
        text: "a boosting-style reweighting of misclassified examples",
        correct: false,
        misconception: {
          id: "forests-confused-with-boosting",
          description: "Reweighting examples between rounds is boosting's mechanism, not a random forest's — forests train members independently.",
          blameConceptId: "random-forests",
        },
      },
    ],
    difficulty: -1.8,
    discrimination: 1.0,
    expectedSeconds: 30,
    prereqClosure: ["random-forests"],
    source: ML_06,
    status: "live",
  },
  {
    id: "random-forests--recall-two-sources-of-randomness",
    conceptId: "random-forests",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "State the two sources of randomness a random forest combines, and which one is shared with plain bagging.",
    rubric: {
      elements: [
        {
          id: "two-sources",
          description: "Two sources: bootstrap-resampled training rows per tree, and a random subset of candidate features considered at each split.",
          weight: 3,
          required: true,
        },
        {
          id: "shared-one",
          description: "Row resampling is shared with plain bagging; feature subsampling is random forests' own addition.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: -1.5,
    discrimination: 1.0,
    expectedSeconds: 50,
    prereqClosure: ["random-forests", "bagging"],
    source: ML_06,
    status: "live",
  },
  {
    id: "random-forests--apply-default-mtry-sixty",
    conceptId: "random-forests",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "For regression the usual default is to consider d/3 features at each split. With d = 60 continuous features, how many are considered per split? Round down.",
    answerKey: 20,
    tolerance: 0.001,
    difficulty: -0.6,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["random-forests"],
    source: ML_06,
    status: "live",
  },
  {
    id: "random-forests--apply-linear-training-cost",
    conceptId: "random-forests",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "Training cost scales roughly linearly with the number of trees. If 50 trees take 4 minutes to train, roughly how many minutes will 200 trees take?",
    answerKey: 16,
    tolerance: 0.5,
    difficulty: 0.1,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["random-forests"],
    source: ML_06,
    status: "live",
  },
  {
    id: "random-forests--explain-full-depth-default",
    conceptId: "random-forests",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Explain why growing forest trees to full depth (rather than shallow) is the right default, given how the forest controls variance.",
    rubric: {
      elements: [
        {
          id: "high-variance-low-bias-members",
          description:
            "Each individual tree is allowed to overfit — high variance, low bias — because averaging across many decorrelated trees is what removes the variance; pruning any one tree would only add bias that averaging cannot recover.",
          weight: 4,
          required: true,
        },
        {
          id: "opposite-of-single-tree-default",
          description:
            "This is the opposite default from a single tree used alone, where depth must be controlled directly since there is no averaging to lean on.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.9,
    discrimination: 1.5,
    expectedSeconds: 170,
    prereqClosure: ["random-forests", "bagging"],
    source: ML_06,
    status: "live",
  },
  {
    id: "random-forests--explain-oob-vs-cv-agreement",
    conceptId: "random-forests",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "A random forest's out-of-bag error estimate and its cross-validated error estimate typically agree closely. Explain why this is expected, given how OOB is computed.",
    rubric: {
      elements: [
        {
          id: "oob-mirrors-holdout",
          description:
            "OOB predicts each row using only the subset of trees that never saw it in their bootstrap sample, which is functionally the same idea as holding data out in a fold — each row is scored by models that did not train on it.",
          weight: 4,
          required: true,
        },
        {
          id: "same-idea-different-mechanism",
          description:
            "So they are two implementations of the same underlying idea (score on genuinely unseen data), and should track each other once the forest has enough trees that every row has a reasonably sized 'never saw it' subset.",
          weight: 3,
        },
      ],
    },
    difficulty: 1.5,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["random-forests", "bagging"],
    source: ML_06,
    status: "live",
  },
  {
    id: "random-forests--transfer-duplicate-strong-feature",
    conceptId: "random-forests",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A dataset has three near-duplicate copies of the single strongest predictive feature (highly correlated with each other). Explain what this does to a random forest's feature subsampling, and whether it is actually a problem for the forest's accuracy.",
    rubric: {
      elements: [
        {
          id: "subsampling-partially-defeated",
          description:
            "With near-duplicate strong features, the chance that at least one copy is offered as a candidate at any given split stays high even with subsampling, so most trees still find a similarly strong split near the root — the duplication partially defeats the decorrelating purpose of subsampling.",
          weight: 4,
          required: true,
        },
        {
          id: "small-accuracy-cost-but-importance-distorted",
          description:
            "It usually costs little accuracy (the forest still predicts well, since a strong feature keeps getting used one way or another) but it does understate the diversity gain and distorts feature-importance rankings, which split credit across the duplicates.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["random-forests"],
    source: ML_06,
    status: "live",
  },
  {
    id: "random-forests--transfer-sparse-signal-breaks-argument",
    conceptId: "random-forests",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Explain why a random forest's variance-reduction argument breaks down as the number of features truly relevant to the target shrinks toward just one or two, out of hundreds available.",
    rubric: {
      elements: [
        {
          id: "candidate-subsets-miss-relevant-features",
          description:
            "With very few relevant features among many, a randomly drawn candidate subset at a split is likely to contain none of them, so many splits are effectively forced onto noise features, and individual trees become much weaker.",
          weight: 4,
          required: true,
        },
        {
          id: "averaging-cannot-fully-compensate",
          description:
            "This weakens each member so much that averaging cannot fully compensate — the forest can underperform relative to a smaller candidate-set default or relative to a method that explicitly seeks out the relevant features rather than sampling blindly.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.3,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["random-forests"],
    source: ML_06,
    status: "live",
  },

  // --- AdaBoost ---------------------------------------------------------------
  {
    id: "adaboost--recall-weighted-vote-combination",
    conceptId: "adaboost",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "AdaBoost's weak learners are combined into a final prediction by:",
    choices: [
      { id: "a", text: "a weighted vote, weighted by each learner's own vote weight α", correct: true },
      {
        id: "b",
        text: "a simple unweighted majority vote",
        correct: false,
        misconception: {
          id: "adaboost-vote-thought-unweighted",
          description: "Drops the α weighting entirely, describing bagging-style voting rather than AdaBoost's weighted combination.",
          blameConceptId: "adaboost",
        },
      },
      {
        id: "c",
        text: "averaging their raw, unweighted outputs",
        correct: false,
        misconception: {
          id: "adaboost-vote-confused-with-plain-averaging",
          description: "The vote weight α is central to the combination; plain averaging discards the information about which learners were more reliable.",
          blameConceptId: "adaboost",
        },
      },
      {
        id: "d",
        text: "taking only the single best learner's prediction",
        correct: false,
        misconception: {
          id: "adaboost-confused-with-selection",
          description: "AdaBoost combines all rounds' learners; it does not discard all but the best one.",
          blameConceptId: "ensemble-methods",
        },
      },
    ],
    difficulty: -1.9,
    discrimination: 1.0,
    expectedSeconds: 30,
    prereqClosure: ["adaboost"],
    source: ML_06,
    status: "live",
  },
  {
    id: "adaboost--recall-classic-weak-learner",
    conceptId: "adaboost",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "What is the classic choice of weak learner in AdaBoost, and what property must any weak learner satisfy for the algorithm to make progress?",
    rubric: {
      elements: [
        { id: "classic-choice", description: "Classic choice: a depth-1 decision stump.", weight: 3, required: true },
        {
          id: "required-property",
          description: "Required property: it must do better than random guessing (weighted error below 0.5) on the current weights, at least most rounds.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: -1.5,
    discrimination: 1.0,
    expectedSeconds: 45,
    prereqClosure: ["adaboost"],
    source: ML_06,
    status: "live",
  },
  {
    id: "adaboost--apply-vote-weight-eps-35",
    conceptId: "adaboost",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "A weak learner has weighted error ε = 0.35. Compute its vote weight α = ½·ln((1 − ε)/ε), to three decimal places.",
    answerKey: 0.31,
    tolerance: 0.005,
    difficulty: -0.3,
    discrimination: 1.2,
    expectedSeconds: 100,
    prereqClosure: ["adaboost"],
    source: ML_06,
    status: "live",
  },
  {
    id: "adaboost--apply-weight-ratio-after-round",
    conceptId: "adaboost",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "After one round, an example's weight is multiplied by e^α if misclassified and e^(−α) if classified correctly (before renormalising). With α = 0.5, what is the ratio of a misclassified example's new weight to a correctly classified example's new weight, given both started with equal weight?",
    answerKey: 2.718,
    tolerance: 0.01,
    difficulty: 0.6,
    discrimination: 1.3,
    expectedSeconds: 110,
    prereqClosure: ["adaboost"],
    source: ML_06,
    status: "live",
  },
  {
    id: "adaboost--explain-focus-mechanism",
    conceptId: "adaboost",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "AdaBoost is often summarised as making the ensemble 'focus on hard examples'. Explain concretely how the weight update accomplishes this, and what would happen if the weights were never renormalised.",
    rubric: {
      elements: [
        {
          id: "focus-mechanism",
          description:
            "Misclassified examples get an exponentially larger weight for the next round, so the next weak learner's weighted-error objective is dominated by fixing exactly those examples — the concrete mechanism of 'focusing'.",
          weight: 4,
          required: true,
        },
        {
          id: "why-renormalise",
          description:
            "Without renormalisation the weights would grow without bound across rounds (or shrink toward zero for easy examples), destabilising every subsequent weighted-error calculation rather than just rebalancing emphasis among examples.",
          weight: 3,
        },
      ],
    },
    difficulty: 1.05,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["adaboost"],
    source: ML_06,
    status: "live",
  },
  {
    id: "adaboost--explain-accuracy-not-comparable-across-rounds",
    conceptId: "adaboost",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Two weak learners have the same raw accuracy but were evaluated on different rounds' weight distributions. Explain why comparing their raw accuracy numbers directly is misleading.",
    rubric: {
      elements: [
        {
          id: "weights-differ-by-round",
          description:
            "Weighted error is measured against that round's example weights, which differ round to round as earlier misclassifications get amplified — 70% accuracy on round 1 (uniform weights) is not solving the same problem as 70% accuracy on round 10 (concentrated on hard examples).",
          weight: 4,
          required: true,
        },
        {
          id: "alpha-is-comparable-instead",
          description: "Only α, which already accounts for the round's own weighting, is comparable across rounds — raw accuracy numbers are not.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.6,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["adaboost"],
    source: ML_06,
    status: "live",
  },
  {
    id: "adaboost--transfer-weak-to-strong-mechanism",
    conceptId: "adaboost",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "AdaBoost was originally motivated as 'boosting a weak learner into a strong one'. Explain, in terms of the sequence of vote weights across many rounds, why the combined ensemble's training error can reach zero even though no single weak learner does much better than chance.",
    rubric: {
      elements: [
        {
          id: "each-stump-correlates-weakly",
          description:
            "Each round's stump correlates only weakly with the true label, but the weighted sum of many such stumps, each contributing its own α, can represent a much richer decision function than any single term.",
          weight: 4,
          required: true,
        },
        {
          id: "additive-accumulation",
          description:
            "Additively, the ensemble's decision boundary becomes arbitrarily fine-grained as more terms accumulate — this accumulation is exactly the mechanism behind AdaBoost's celebrated training-error guarantee.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["adaboost"],
    source: ML_06,
    status: "live",
  },
  {
    id: "adaboost--transfer-margin-explanation",
    conceptId: "adaboost",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "AdaBoost usually keeps improving test accuracy for many rounds after training error hits zero — the opposite of the classic overfitting story where more capacity always eventually hurts. Give the margin-based explanation for this.",
    rubric: {
      elements: [
        {
          id: "margins-keep-growing",
          description:
            "Even once every training point is classified correctly, further rounds continue to increase the classification margin — how confidently and by how large a weighted vote each point is classified — a form of continued, useful learning a plain training-error curve cannot see.",
          weight: 4,
          required: true,
        },
        {
          id: "larger-margin-generalises-better",
          description:
            "A larger, more uniform margin between the confident classification of each point is understood to correlate with better generalisation, so 'training error is already zero, so nothing more is being learned' is the wrong reading of the curve.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.3,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["adaboost"],
    source: ML_06,
    status: "live",
  },

  // --- Gradient Boosting --------------------------------------------------------
  {
    id: "gradient-boosting--recall-fit-target",
    conceptId: "gradient-boosting",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "In gradient boosting, each new tree is fit to:",
    choices: [
      { id: "a", text: "the negative gradient of the loss with respect to the current ensemble's predictions (the pseudo-residuals)", correct: true },
      {
        id: "b",
        text: "the original training labels directly, exactly as the first tree was",
        correct: false,
        misconception: {
          id: "gb-later-trees-fit-original-labels",
          description: "Every tree after the first is fit to what the ensemble has not yet explained, not to the raw labels again.",
          blameConceptId: "gradient-boosting",
        },
      },
      {
        id: "c",
        text: "the residuals of the very first tree only",
        correct: false,
        misconception: {
          id: "gb-residuals-fixed-from-first-tree",
          description: "The residual target is recomputed after every round against the whole ensemble so far, not frozen from the first tree.",
          blameConceptId: "gradient-boosting",
        },
      },
      {
        id: "d",
        text: "a randomly resampled version of the training data",
        correct: false,
        misconception: {
          id: "gb-confused-with-bagging-resampling",
          description: "Random resampling is bagging's mechanism. Gradient boosting fits each tree to a target derived from the loss, not to a resample.",
          blameConceptId: "gradient-boosting",
        },
      },
    ],
    difficulty: -1.7,
    discrimination: 1.0,
    expectedSeconds: 40,
    prereqClosure: ["gradient-boosting"],
    source: ML_06,
    status: "live",
  },
  {
    id: "gradient-boosting--recall-three-hyperparameters",
    conceptId: "gradient-boosting",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Name the three main hyperparameters that jointly control a gradient-boosted ensemble's fit, and state in one phrase what each one does.",
    rubric: {
      elements: [
        { id: "learning-rate", description: "Learning rate (ν): scales each new tree's contribution down.", weight: 2, required: true },
        { id: "rounds", description: "Number of rounds (trees): how many correction steps are taken.", weight: 2, required: true },
        { id: "depth", description: "Tree depth: how much interaction each individual correction may model.", weight: 2, required: true },
      ],
    },
    difficulty: -1.3,
    discrimination: 1.0,
    expectedSeconds: 60,
    prereqClosure: ["gradient-boosting"],
    source: ML_06,
    status: "live",
  },
  {
    id: "gradient-boosting--apply-shrinkage-arithmetic",
    conceptId: "gradient-boosting",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "A gradient-boosted model uses learning rate ν = 0.05. After a tree predicts a correction of 8.0 at a given point, how much is actually added to the ensemble's running prediction there?",
    answerKey: 0.4,
    tolerance: 0.005,
    difficulty: -0.5,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["gradient-boosting"],
    source: ML_06,
    status: "live",
  },
  {
    id: "gradient-boosting--apply-absolute-error-gradient",
    conceptId: "gradient-boosting",
    format: "derivation",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "For the absolute-error loss L = |y − F(x)|, derive the negative gradient with respect to F(x) away from the non-differentiable point y = F(x), and say what it means for each new tree's target.",
    rubric: {
      elements: [
        {
          id: "sign-derivative",
          description: "Correctly differentiates: ∂L/∂F = −sign(y − F(x)), so the negative gradient is sign(y − F(x)).",
          weight: 4,
          required: true,
        },
        {
          id: "target-is-a-sign-not-a-magnitude",
          description:
            "Each new tree is fit to this sign — a step function of the sign of the residual — unlike squared-error's fit to the residual's actual magnitude, so the target carries direction but no information about how large the error is.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.0,
    discrimination: 1.4,
    expectedSeconds: 170,
    prereqClosure: ["gradient-boosting"],
    source: ML_06,
    status: "live",
  },
  {
    id: "gradient-boosting--explain-small-lr-generalises-better",
    conceptId: "gradient-boosting",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Explain why a small learning rate combined with many rounds usually generalises better than a large learning rate with few rounds, even when both reach the same training loss.",
    rubric: {
      elements: [
        {
          id: "gradual-buildup-is-smoother",
          description:
            "Small steps let the ensemble build up structure gradually, with early mistakes correctable by many small later adjustments rather than one large one, producing a smoother, less erratic fitted function — a regularising effect.",
          weight: 4,
          required: true,
        },
        {
          id: "large-steps-commit-hard",
          description:
            "A large learning rate commits strongly to each tree's correction, so an early tree that overfits noise leaves a large, hard-to-undo mark on the ensemble.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.55,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["gradient-boosting"],
    source: ML_06,
    status: "live",
  },
  {
    id: "gradient-boosting--explain-bias-persists-across-trees",
    conceptId: "gradient-boosting",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Feature importance from a gradient-boosted model shares the same high-cardinality bias as a single tree's impurity-based importance. Explain why having many trees does not fix this bias.",
    rubric: {
      elements: [
        {
          id: "shared-criterion-across-members",
          description:
            "Every tree's splits are still chosen by the same impurity-reduction criterion at each node, so the bias toward high-cardinality or continuous features is present in every member and does not average away — averaging removes variance, not a systematic bias shared by all members.",
          weight: 5,
          required: true,
        },
        {
          id: "fix",
          description: "Names permutation importance, computed on held-out data, as a fix that inherits from the same reasoning used for random forests.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["gradient-boosting"],
    source: ML_06,
    status: "live",
  },
  {
    id: "gradient-boosting--transfer-overconfident-probabilities",
    conceptId: "gradient-boosting",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A team's gradient-boosted classifier has excellent accuracy but its predicted probabilities are poorly calibrated (a predicted 0.9 is right much less than 90% of the time). Explain why boosting under a log-loss objective can still produce overconfident scores, and name one remedy.",
    rubric: {
      elements: [
        {
          id: "boosting-keeps-pushing-confident-points",
          description:
            "Boosting keeps adding correction terms that push confidently-classified points' scores even further in the correct direction, since doing so still reduces the loss slightly — accuracy plateaus while confidence keeps growing, decoupling the score from a well-calibrated probability.",
          weight: 4,
          required: true,
        },
        {
          id: "remedy",
          description: "Remedy: recalibrate the scores after fitting, e.g. with Platt scaling or isotonic regression on held-out data.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.25,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["gradient-boosting"],
    source: ML_06,
    status: "live",
  },
  {
    id: "gradient-boosting--transfer-sequential-stacking-analogy",
    conceptId: "gradient-boosting",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Compare gradient boosting's sequential structure to stacking's combiner-model structure: in what sense is gradient boosting itself a form of sequential stacking, and where does the analogy break?",
    rubric: {
      elements: [
        {
          id: "structural-resemblance",
          description:
            "Each new tree can be seen as fit to correct the current ensemble's residual, structurally similar to a stacked combiner learning from the base models' errors — except the 'combiner' here is just addition with a fixed learning rate, and the base learners are trained sequentially rather than independently.",
          weight: 4,
          required: true,
        },
        {
          id: "no-leakage-risk",
          description:
            "Unlike stacking, boosting's members are not independent — each is fit against the specific gap left by all previous ones, so there is no analogue of stacking's leakage risk from training the combiner on in-sample base predictions.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.3,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["gradient-boosting", "ensemble-methods"],
    source: ML_06,
    status: "live",
  },

  // --- XGBoost ------------------------------------------------------------------
  {
    id: "xgboost--recall-second-order-addition",
    conceptId: "xgboost",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Relative to plain gradient boosting, XGBoost's split-finding criterion additionally accounts for:",
    choices: [
      { id: "a", text: "the second derivative (Hessian) of the loss at each training point, not just the first", correct: true },
      {
        id: "b",
        text: "the total number of training examples only",
        correct: false,
        misconception: {
          id: "xgb-second-order-confused-with-sample-count",
          description: "The gain formula uses per-example curvature information, not merely the overall count of examples.",
          blameConceptId: "xgboost",
        },
      },
      {
        id: "c",
        text: "the correlation between features",
        correct: false,
        misconception: {
          id: "xgb-second-order-confused-with-correlation",
          description: "Feature correlation plays no direct role in the leaf-weight or gain formulas; those are per-example gradient and Hessian sums.",
          blameConceptId: "xgboost",
        },
      },
      {
        id: "d",
        text: "the depth of the tree so far",
        correct: false,
        misconception: {
          id: "xgb-second-order-confused-with-depth",
          description: "Depth is a separate hyperparameter; the second-order information is about the loss's curvature at each point, not tree depth.",
          blameConceptId: "xgboost",
        },
      },
    ],
    difficulty: -1.6,
    discrimination: 1.0,
    expectedSeconds: 40,
    prereqClosure: ["xgboost"],
    source: ML_06,
    status: "live",
  },
  {
    id: "xgboost--recall-engineering-optimisations",
    conceptId: "xgboost",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Name two things XGBoost's implementation does purely for computational speed, as opposed to for statistical benefit.",
    rubric: {
      elements: [
        {
          id: "two-engineering-features",
          description:
            "Any two of: histogram-based/approximate split finding, sparsity-aware handling of missing values, parallel evaluation of candidate splits across features, cache-aware block structure, out-of-core computation for data larger than memory.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: -1.2,
    discrimination: 1.0,
    expectedSeconds: 55,
    prereqClosure: ["xgboost"],
    source: ML_06,
    status: "live",
  },
  {
    id: "xgboost--apply-leaf-weight-no-regularisation",
    conceptId: "xgboost",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "XGBoost's optimal leaf weight is −Σg/(Σh + λ). With Σg = 10, Σh = 5 and λ = 0, what is the leaf weight?",
    answerKey: -2,
    tolerance: 0.005,
    difficulty: -0.3,
    discrimination: 1.2,
    expectedSeconds: 80,
    prereqClosure: ["xgboost", "gradient-boosting"],
    source: ML_06,
    status: "live",
  },
  {
    id: "xgboost--apply-leaf-weight-with-lambda",
    conceptId: "xgboost",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "Using the same leaf-weight formula −Σg/(Σh + λ) with Σg = 10, Σh = 5 and λ = 5, what is the leaf weight now?",
    answerKey: -1,
    tolerance: 0.005,
    difficulty: 0.6,
    discrimination: 1.3,
    expectedSeconds: 100,
    prereqClosure: ["xgboost", "gradient-boosting"],
    source: ML_06,
    status: "live",
  },
  {
    id: "xgboost--explain-hessian-as-trust-weight",
    conceptId: "xgboost",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Explain why using both the gradient and the Hessian lets XGBoost choose split points more accurately than using the gradient alone, in terms of what the Hessian tells the algorithm about a point's loss curvature.",
    rubric: {
      elements: [
        {
          id: "hessian-as-trust-signal",
          description:
            "The Hessian measures how sharply the loss curves at that prediction — a large Hessian means the loss is very sensitive there, so that point's residual should be trusted (and weighted) more when picking the best split and leaf value; a small Hessian means the point contributes less reliable signal.",
          weight: 4,
          required: true,
        },
        {
          id: "gradient-alone-is-coarser",
          description:
            "Using the gradient alone, as in classic gradient boosting, treats every point's correction signal as equally trustworthy regardless of curvature — a coarser approximation to the true loss reduction a split would achieve.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.0,
    discrimination: 1.5,
    expectedSeconds: 180,
    prereqClosure: ["xgboost", "gradient-boosting"],
    source: ML_06,
    status: "live",
  },
  {
    id: "xgboost--explain-ridge-parallel",
    conceptId: "xgboost",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "XGBoost adds λ‖w‖² to its objective, the same penalty form ridge regression adds to its coefficients. Explain what is being regularised in each case, and why the same mathematical form applies to two such different models.",
    rubric: {
      elements: [
        {
          id: "what-each-shrinks",
          description:
            "In ridge regression, λ‖w‖² shrinks the linear coefficients toward zero; in XGBoost it shrinks the leaf values toward zero, which are the analogous 'weights' a tree assigns to its own regions.",
          weight: 4,
          required: true,
        },
        {
          id: "why-the-form-transfers",
          description:
            "The form is the same because both penalise the magnitude of the parameters that directly produce the prediction — a leaf value plays exactly the role a coefficient plays once a tree is viewed as a sum of indicator-region basis functions.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.85,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["xgboost", "gradient-boosting"],
    source: ML_06,
    status: "live",
  },
  {
    id: "xgboost--transfer-attribute-the-two-gains",
    conceptId: "xgboost",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A team switches from plain gradient boosting to XGBoost on the same dataset and sees a modest accuracy gain along with a large speed gain. Attribute each gain to the specific mechanism responsible, and explain why a much larger accuracy gain would be a surprising result.",
    rubric: {
      elements: [
        {
          id: "speed-gain-attributed",
          description:
            "Speed gain: attributable to the engineering — histogram-based splits, parallelism, cache-aware structure — none of which changes what function is being fit.",
          weight: 4,
          required: true,
        },
        {
          id: "accuracy-gain-attributed",
          description:
            "Accuracy gain: attributable to the statistical additions — explicit γ/λ regularisation and the second-order Newton step — both refinements of an already-good algorithm, not a different model class, so a large accuracy jump would be surprising.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.2,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["xgboost", "gradient-boosting"],
    source: ML_06,
    status: "live",
  },
  {
    id: "xgboost--transfer-gatekeepers-compared",
    conceptId: "xgboost",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "XGBoost's γ term and AdaBoost's requirement that a weak learner beat chance both function as gatekeepers, but at different points in the algorithm. Compare where each check happens and what each protects against.",
    rubric: {
      elements: [
        {
          id: "gamma-gatekeeps-splits",
          description:
            "XGBoost's γ acts inside the split-finding step of growing a single tree, blocking any split whose gain does not exceed the fixed cost — it protects against over-splitting one member.",
          weight: 4,
          required: true,
        },
        {
          id: "adaboost-gatekeeps-members",
          description:
            "AdaBoost's chance-beating requirement acts once per round, deciding whether a whole new weak learner is worth adding to the ensemble at all — it protects against adding a member that would carry no information (or negative α).",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.35,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["xgboost", "gradient-boosting"],
    source: ML_06,
    status: "live",
  },
];
