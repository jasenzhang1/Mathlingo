import type { Item } from "../../lib/assessment/types";
import { ML_01 } from "./sources";

/**
 * Cluster 1 — foundations. Ported from `assessments/ml-01-foundations.md`:
 * five items per concept at recall / recall / apply / explain / transfer, with
 * the difficulty seeds and misconception tags the markdown argued for.
 */
export const ml01Items: Item[] = [
  // --- Machine Learning Introduction ---------------------------------------
  {
    id: "ml-introduction--recall-definition",
    conceptId: "ml-introduction",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Define machine learning in one sentence.",
    rubric: {
      elements: [
        {
          id: "learns-from-data",
          description: "Says the system improves at a task from data or experience.",
          weight: 3,
          required: true,
        },
        {
          id: "contrast-with-hand-coded",
          description:
            "Contrasts this with following rules a programmer wrote out explicitly for that task.",
          weight: 2,
          required: true,
        },
      ],
    },
    difficulty: -1.5,
    discrimination: 1.0,
    expectedSeconds: 45,
    prereqClosure: ["ml-introduction"],
    source: ML_01,
    status: "shadow",
  },
  {
    id: "ml-introduction--recall-vs-rule-based",
    conceptId: "ml-introduction",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Machine learning differs from traditional rule-based programming in that:",
    choices: [
      {
        id: "a",
        text: "the rules mapping inputs to outputs are learned from data rather than hand-coded",
        correct: true,
      },
      {
        id: "b",
        text: "it requires more decision logic to be written by hand",
        correct: false,
        misconception: {
          id: "ml-requires-more-hand-coding",
          description:
            "Assumes ML means writing more explicit logic. It is usually the reverse: the decision logic is what the data supplies.",
          blameConceptId: "ml-introduction",
        },
      },
      {
        id: "c",
        text: "it always produces a more accurate program than hand-written rules",
        correct: false,
        misconception: {
          id: "ml-always-more-accurate",
          description:
            "Treats ML as universally superior. For tasks whose rule is easy to state (sales tax, address validation) ordinary code is both more accurate and cheaper.",
          blameConceptId: "ml-introduction",
        },
      },
      {
        id: "d",
        text: "it does not need a way to measure whether the output was any good",
        correct: false,
        misconception: {
          id: "no-performance-measure",
          description:
            "Drops the performance measure from the definition. Without one there is no way to tell learning from noise.",
          blameConceptId: "ml-introduction",
        },
      },
    ],
    difficulty: -1.2,
    discrimination: 1.1,
    expectedSeconds: 30,
    prereqClosure: ["ml-introduction"],
    source: ML_01,
    status: "shadow",
  },
  {
    id: "ml-introduction--apply-classify-two-filters",
    conceptId: "ml-introduction",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "Classify each as traditional programming or machine learning, and say why: (a) a spam filter built from a hand-written list of banned keywords; (b) a spam filter trained on millions of labelled emails.",
    rubric: {
      elements: [
        {
          id: "a-traditional",
          description: "(a) traditional programming — a human wrote the decision rule.",
          weight: 2,
          required: true,
        },
        {
          id: "b-ml",
          description: "(b) machine learning — the rule was inferred from labelled examples.",
          weight: 2,
          required: true,
        },
        {
          id: "reason-names-origin-of-logic",
          description:
            "Justifies the split by where the decision logic came from, not by which one is more complex or more accurate.",
          weight: 2,
        },
      ],
    },
    difficulty: -0.75,
    discrimination: 1.2,
    expectedSeconds: 70,
    prereqClosure: ["ml-introduction"],
    source: ML_01,
    status: "shadow",
  },
  {
    id: "ml-introduction--explain-hard-to-articulate",
    conceptId: "ml-introduction",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Why does machine learning tend to beat hand-coded rules on tasks where the rule is hard to articulate, even when a human recognises the right answer instantly?",
    rubric: {
      elements: [
        {
          id: "recognition-articulation-gap",
          description:
            "Names the gap: the regularity is easy to demonstrate by example and very hard to state as explicit if-then logic.",
          weight: 4,
          required: true,
        },
        {
          id: "learns-from-demonstrations",
          description:
            "Says ML infers the regularity from many examples instead of requiring it to be written down in advance.",
          weight: 3,
          required: true,
        },
        {
          id: "concrete-example",
          description:
            "Grounds it in a concrete case — what makes a handwritten 7 a 7, what makes a search result relevant.",
          weight: 1,
        },
      ],
      forbiddenMoves: [
        {
          id: "asserts-superiority-without-mechanism",
          description:
            "Answers only that ML is 'more powerful' or 'sees patterns humans can't', with no account of why articulation is the binding constraint.",
          weight: 1,
        },
      ],
    },
    difficulty: 0.0,
    discrimination: 1.5,
    expectedSeconds: 150,
    prereqClosure: ["ml-introduction"],
    source: ML_01,
    status: "shadow",
  },
  {
    id: "ml-introduction--transfer-spectrum-not-binary",
    conceptId: "ml-introduction",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Why is 'machine learning' better understood as a point on a spectrum of how much decision logic is learned, rather than as a strict category a system is either in or out of?",
    rubric: {
      elements: [
        {
          id: "mixed-systems-exist",
          description:
            "Notes that real systems combine hand-specified rules with learned components.",
          weight: 3,
          required: true,
        },
        {
          id: "concrete-mixed-example",
          description:
            "Gives a concrete hybrid — e.g. a rule-based filter that defers only ambiguous cases to a learned model.",
          weight: 3,
          required: true,
        },
        {
          id: "proportion-varies-continuously",
          description:
            "States that the learned share of the logic varies continuously rather than switching on or off.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.5,
    discrimination: 1.4,
    expectedSeconds: 180,
    prereqClosure: ["ml-introduction"],
    source: ML_01,
    status: "shadow",
  },

  // --- Loss Functions -------------------------------------------------------
  {
    id: "loss-functions--recall-definition",
    conceptId: "loss-functions",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Define a loss function and state its role in training.",
    rubric: {
      elements: [
        {
          id: "quantifies-wrongness",
          description: "A number saying how wrong a prediction is for a given example.",
          weight: 3,
          required: true,
        },
        {
          id: "training-minimises-it",
          description: "Training minimises it, typically by a gradient-based method.",
          weight: 2,
          required: true,
        },
      ],
    },
    difficulty: -1.15,
    discrimination: 1.0,
    expectedSeconds: 45,
    prereqClosure: ["loss-functions", "ml-introduction"],
    source: ML_01,
    status: "shadow",
  },
  {
    id: "loss-functions--recall-required-property",
    conceptId: "loss-functions",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which property must a usable loss function have?",
    choices: [
      {
        id: "a",
        text: "It is lower for better predictions and higher for worse ones",
        correct: true,
      },
      {
        id: "b",
        text: "It always outputs negative numbers",
        correct: false,
        misconception: {
          id: "loss-sign-convention",
          description:
            "Invents a sign requirement. Only the ordering matters — lower means better — and standard losses are non-negative.",
          blameConceptId: "loss-functions",
        },
      },
      {
        id: "c",
        text: "It is bounded above by 1",
        correct: false,
        misconception: {
          id: "loss-must-be-bounded",
          description:
            "Assumes a bounded scale. Squared error and cross-entropy are both unbounded, and that is deliberate.",
          blameConceptId: "loss-functions",
        },
      },
      {
        id: "d",
        text: "It is symmetric in the two kinds of error",
        correct: false,
        misconception: {
          id: "loss-must-be-symmetric",
          description:
            "Assumes symmetry is required. Asymmetric and quantile losses exist precisely because over- and under-prediction often cost different amounts.",
          blameConceptId: "loss-functions",
        },
      },
    ],
    difficulty: -0.9,
    discrimination: 1.1,
    expectedSeconds: 30,
    prereqClosure: ["loss-functions"],
    source: ML_01,
    status: "shadow",
  },
  {
    id: "loss-functions--apply-squared-error-value",
    conceptId: "loss-functions",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "For squared-error loss L(y, ŷ) = (y − ŷ)², compute the loss when y = 5 and ŷ = 3.",
    answerKey: 4,
    tolerance: 0.001,
    difficulty: -0.35,
    discrimination: 1.0,
    expectedSeconds: 30,
    prereqClosure: ["loss-functions"],
    source: ML_01,
    status: "shadow",
  },
  {
    id: "loss-functions--explain-why-squaring-penalises",
    conceptId: "loss-functions",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Why does squared error penalise large errors disproportionately more than small ones? Use a concrete pair of errors in your answer.",
    rubric: {
      elements: [
        {
          id: "quadratic-scaling",
          description:
            "States the scaling: doubling the error quadruples the loss — an error of 2 costs 4 and an error of 4 costs 16.",
          weight: 4,
          required: true,
        },
        {
          id: "consequence-outliers",
          description:
            "Draws the consequence: the fit is pulled hard by outliers, since removing one large error is worth accepting several small ones.",
          weight: 3,
          required: true,
        },
      ],
      forbiddenMoves: [
        {
          id: "restates-without-numbers",
          description:
            "Says only that squaring 'makes big errors count more' without the concrete 4×-for-2× arithmetic.",
          weight: 1,
        },
      ],
    },
    difficulty: 0.35,
    discrimination: 1.5,
    expectedSeconds: 150,
    prereqClosure: ["loss-functions"],
    source: ML_01,
    status: "shadow",
  },
  {
    id: "loss-functions--transfer-loss-matches-output-type",
    conceptId: "loss-functions",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A house-price predictor is trained with squared error, while a loan-approval model uses a loss built around probabilities instead. What makes squared error the wrong choice for the second?",
    rubric: {
      elements: [
        {
          id: "numeric-target-fits-squared-error",
          description:
            "Explains that squared error suits a raw numeric target where large misses are especially costly.",
          weight: 2,
          required: true,
        },
        {
          id: "probability-output-mismatch",
          description:
            "Names the mismatch specifically: the loan model's output is a probability, and a loss defined on probabilities is what measures its quality.",
          weight: 4,
          required: true,
        },
        {
          id: "points-at-cross-entropy",
          description:
            "Identifies cross-entropy (or log loss) as the loss built for that output type.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.85,
    discrimination: 1.4,
    expectedSeconds: 180,
    prereqClosure: ["loss-functions"],
    source: ML_01,
    status: "shadow",
  },

  // --- Types of Machine Learning -------------------------------------------
  {
    id: "types-of-machine-learning--recall-three-categories",
    conceptId: "types-of-machine-learning",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Name the three broad categories of machine learning.",
    rubric: {
      elements: [
        {
          id: "names-all-three",
          description: "Supervised, unsupervised, and reinforcement learning.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: -1.15,
    discrimination: 0.9,
    expectedSeconds: 30,
    prereqClosure: ["types-of-machine-learning", "ml-introduction"],
    source: ML_01,
    status: "shadow",
  },
  {
    id: "types-of-machine-learning--recall-rl-vs-supervised",
    conceptId: "types-of-machine-learning",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Reinforcement learning differs from supervised learning in that:",
    choices: [
      {
        id: "a",
        text: "it learns from a delayed reward signal obtained by interacting with an environment, rather than from labelled examples",
        correct: true,
      },
      {
        id: "b",
        text: "it uses no data at all",
        correct: false,
        misconception: {
          id: "rl-uses-no-data",
          description:
            "Treats RL as data-free. It still learns from data — the data is generated by its own interaction rather than supplied in advance.",
          blameConceptId: "types-of-machine-learning",
        },
      },
      {
        id: "c",
        text: "its labels simply arrive later than a supervised model's",
        correct: false,
        misconception: {
          id: "rl-is-late-labels",
          description:
            "Misses that reward is evaluative, not instructive: it says how good the outcome was, never what the correct action would have been.",
          blameConceptId: "types-of-machine-learning",
        },
      },
      {
        id: "d",
        text: "it can only be applied to games",
        correct: false,
        misconception: {
          id: "rl-only-games",
          description:
            "Confuses the best-known demonstrations with the scope of the method.",
          blameConceptId: "types-of-machine-learning",
        },
      },
    ],
    difficulty: -0.9,
    discrimination: 1.1,
    expectedSeconds: 35,
    prereqClosure: ["types-of-machine-learning"],
    source: ML_01,
    status: "shadow",
  },
  {
    id: "types-of-machine-learning--apply-classify-three-tasks",
    conceptId: "types-of-machine-learning",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "Classify each: (a) learning chess by playing many games and observing win/loss outcomes; (b) predicting house prices from labelled past sales; (c) grouping customers with no predefined labels.",
    rubric: {
      elements: [
        {
          id: "all-three-correct",
          description: "(a) reinforcement, (b) supervised, (c) unsupervised.",
          weight: 5,
          required: true,
        },
      ],
    },
    difficulty: -0.35,
    discrimination: 1.1,
    expectedSeconds: 60,
    prereqClosure: ["types-of-machine-learning"],
    source: ML_01,
    status: "shadow",
  },
  {
    id: "types-of-machine-learning--explain-labels-as-the-line",
    conceptId: "types-of-machine-learning",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Why is 'are there labels?' the sharpest line specifically between supervised and unsupervised learning, and why is reinforcement learning kept separate rather than placed on that same line?",
    rubric: {
      elements: [
        {
          id: "labels-define-the-objective",
          description:
            "Supervised learning's objective is defined by matching known labels; unsupervised learning has no target to match, only structure to find.",
          weight: 3,
          required: true,
        },
        {
          id: "rl-feedback-is-different-in-kind",
          description:
            "Reinforcement learning's feedback is delayed and interactive rather than present-or-absent, so it is not a third point on the labels axis.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.35,
    discrimination: 1.4,
    expectedSeconds: 150,
    prereqClosure: ["types-of-machine-learning"],
    source: ML_01,
    status: "shadow",
  },
  {
    id: "types-of-machine-learning--transfer-same-task-either-framing",
    conceptId: "types-of-machine-learning",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Give a real task that could be framed as either supervised or unsupervised learning, and say what decides which framing applies.",
    rubric: {
      elements: [
        {
          id: "concrete-dual-task",
          description:
            "Names a task that works both ways — e.g. fraud detection: supervised with confirmed-fraud labels, unsupervised anomaly detection without them.",
          weight: 3,
          required: true,
        },
        {
          id: "data-availability-decides",
          description:
            "Identifies the available data, not the underlying business problem, as what determines the category.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.85,
    discrimination: 1.4,
    expectedSeconds: 180,
    prereqClosure: ["types-of-machine-learning"],
    source: ML_01,
    status: "shadow",
  },

  // --- Supervised vs Unsupervised Learning ---------------------------------
  {
    id: "supervised-vs-unsupervised-learning--recall-definitions",
    conceptId: "supervised-vs-unsupervised-learning",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Define supervised and unsupervised learning.",
    rubric: {
      elements: [
        {
          id: "supervised",
          description: "Supervised: learning a mapping from inputs to known outputs or labels.",
          weight: 3,
          required: true,
        },
        {
          id: "unsupervised",
          description: "Unsupervised: finding structure in data that carries no labels.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: -0.95,
    discrimination: 1.0,
    expectedSeconds: 45,
    prereqClosure: ["supervised-vs-unsupervised-learning", "types-of-machine-learning"],
    source: ML_01,
    status: "shadow",
  },
  {
    id: "supervised-vs-unsupervised-learning--recall-clustering",
    conceptId: "supervised-vs-unsupervised-learning",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Clustering is an example of:",
    choices: [
      { id: "a", text: "unsupervised learning", correct: true },
      {
        id: "b",
        text: "supervised learning",
        correct: false,
        misconception: {
          id: "clustering-mistaken-for-supervised",
          description:
            "Treats the discovered cluster assignments as labels. They are outputs of the algorithm, not inputs to it — clustering uses no labels at all.",
          blameConceptId: "supervised-vs-unsupervised-learning",
        },
      },
      {
        id: "c",
        text: "reinforcement learning",
        correct: false,
        misconception: {
          id: "clustering-mistaken-for-rl",
          description:
            "There is no environment, no action, and no reward — none of the structure that makes a problem reinforcement learning.",
          blameConceptId: "types-of-machine-learning",
        },
      },
      {
        id: "d",
        text: "none of these — clustering is not machine learning",
        correct: false,
        misconception: {
          id: "clustering-not-ml",
          description:
            "Restricts ML to prediction. Discovering structure from data is learning from data, which is the definition.",
          blameConceptId: "ml-introduction",
        },
      },
    ],
    difficulty: -0.7,
    discrimination: 1.1,
    expectedSeconds: 25,
    prereqClosure: ["supervised-vs-unsupervised-learning"],
    source: ML_01,
    status: "shadow",
  },
  {
    id: "supervised-vs-unsupervised-learning--apply-is-pca-supervised",
    conceptId: "supervised-vs-unsupervised-learning",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "Is principal component analysis supervised or unsupervised? Justify your answer from the definition.",
    rubric: {
      elements: [
        {
          id: "unsupervised",
          description: "Unsupervised.",
          weight: 2,
          required: true,
        },
        {
          id: "no-outcome-used",
          description:
            "Justifies it: PCA maximises variance in the inputs and never consults an outcome or label.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: -0.15,
    discrimination: 1.2,
    expectedSeconds: 70,
    prereqClosure: ["supervised-vs-unsupervised-learning"],
    source: ML_01,
    status: "shadow",
  },
  {
    id: "supervised-vs-unsupervised-learning--explain-evaluation-asymmetry",
    conceptId: "supervised-vs-unsupervised-learning",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Why is unsupervised learning generally much harder to evaluate than supervised learning?",
    rubric: {
      elements: [
        {
          id: "supervised-has-ground-truth",
          description:
            "Supervised learning can compare predictions against held-out ground truth, settling a comparison in one number.",
          weight: 3,
          required: true,
        },
        {
          id: "unsupervised-has-no-reference",
          description:
            "Unsupervised learning has no such reference, so quality is judged by indirect or partly subjective criteria that can disagree with each other.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.55,
    discrimination: 1.5,
    expectedSeconds: 150,
    prereqClosure: ["supervised-vs-unsupervised-learning"],
    source: ML_01,
    status: "shadow",
  },
  {
    id: "supervised-vs-unsupervised-learning--transfer-start-unsupervised",
    conceptId: "supervised-vs-unsupervised-learning",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A company has a warehouse of raw data and almost no labels. Why might it start with unsupervised methods before investing in a supervised model?",
    rubric: {
      elements: [
        {
          id: "exploration-is-cheap",
          description:
            "Unsupervised exploration reveals structure without paying for annotation.",
          weight: 3,
          required: true,
        },
        {
          id: "informs-where-to-label",
          description:
            "That structure tells them where labelling effort would actually be worth spending — reconnaissance for a supervised project.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.05,
    discrimination: 1.4,
    expectedSeconds: 180,
    prereqClosure: ["supervised-vs-unsupervised-learning"],
    source: ML_01,
    status: "shadow",
  },

  // --- Classification vs Regression ----------------------------------------
  {
    id: "classification-vs-regression--recall-distinction",
    conceptId: "classification-vs-regression",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Distinguish classification from regression.",
    rubric: {
      elements: [
        {
          id: "discrete-vs-continuous",
          description:
            "Classification predicts a discrete category; regression predicts a continuous numeric value.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: -0.81,
    discrimination: 1.0,
    expectedSeconds: 40,
    prereqClosure: ["classification-vs-regression", "supervised-vs-unsupervised-learning"],
    source: ML_01,
    status: "shadow",
  },
  {
    id: "classification-vs-regression--recall-house-price",
    conceptId: "classification-vs-regression",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Predicting a house's exact sale price is:",
    choices: [
      { id: "a", text: "regression", correct: true },
      {
        id: "b",
        text: "classification",
        correct: false,
        misconception: {
          id: "price-treated-as-category",
          description:
            "Confuses predicting a price with predicting a price bucket. The bucket version genuinely would be classification; the exact figure is not.",
          blameConceptId: "classification-vs-regression",
        },
      },
      {
        id: "c",
        text: "unsupervised learning",
        correct: false,
        misconception: {
          id: "labelled-target-missed",
          description:
            "Overlooks that past sale prices are labels, which makes the task supervised.",
          blameConceptId: "supervised-vs-unsupervised-learning",
        },
      },
      {
        id: "d",
        text: "neither — price is not a valid target",
        correct: false,
        misconception: {
          id: "continuous-target-rejected",
          description:
            "Assumes targets must be categorical. A continuous target is exactly what regression is for.",
          blameConceptId: "classification-vs-regression",
        },
      },
    ],
    difficulty: -0.55,
    discrimination: 1.0,
    expectedSeconds: 25,
    prereqClosure: ["classification-vs-regression"],
    source: ML_01,
    status: "shadow",
  },
  {
    id: "classification-vs-regression--apply-classify-four",
    conceptId: "classification-vs-regression",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "Label each as classification or regression: (a) tomorrow's temperature in degrees; (b) whether it will rain tomorrow; (c) a customer's total lifetime spend; (d) a customer's segment label.",
    rubric: {
      elements: [
        {
          id: "all-four-correct",
          description: "(a) regression, (b) classification, (c) regression, (d) classification.",
          weight: 5,
          required: true,
        },
      ],
    },
    difficulty: 0.0,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["classification-vs-regression"],
    source: ML_01,
    status: "shadow",
  },
  {
    id: "classification-vs-regression--explain-reframing-consequences",
    conceptId: "classification-vs-regression",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "The same underlying task can often be framed as either regression or classification. Why does that choice matter in practice?",
    rubric: {
      elements: [
        {
          id: "two-framings-of-same-info",
          description:
            "Notes that predicting an exact quantity and predicting which bucket it falls in are two framings of related information.",
          weight: 2,
          required: true,
        },
        {
          id: "loss-and-metric-follow",
          description:
            "Names the consequence: the framing determines which loss and which metric are even applicable — squared error does not apply to a category, accuracy does not apply to a real number.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.69,
    discrimination: 1.5,
    expectedSeconds: 160,
    prereqClosure: ["classification-vs-regression"],
    source: ML_01,
    status: "shadow",
  },
  {
    id: "classification-vs-regression--transfer-clinical-threshold",
    conceptId: "classification-vs-regression",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Regression carries strictly more information than classification on the same quantity. Why might a clinical tool still prefer 'is blood pressure in the dangerous range?' over 'predict the exact number'?",
    rubric: {
      elements: [
        {
          id: "decision-is-binary",
          description:
            "The clinical decision is itself binary — act or don't act — so the classification framing answers the operative question directly.",
          weight: 4,
          required: true,
        },
        {
          id: "regression-needs-a-threshold-anyway",
          description:
            "A regression output still requires a separate downstream threshold decision, so the extra information is not free.",
          weight: 2,
          required: true,
        },
        {
          id: "accuracy-where-it-matters",
          description:
            "Bonus: notes that the classification framing concentrates model capacity near the threshold that matters rather than spreading it over the whole range.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.19,
    discrimination: 1.4,
    expectedSeconds: 200,
    prereqClosure: ["classification-vs-regression"],
    source: ML_01,
    status: "shadow",
  },

  // --- Curse of Dimensionality ---------------------------------------------
  {
    id: "curse-of-dimensionality--recall-describe",
    conceptId: "curse-of-dimensionality",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Describe the curse of dimensionality.",
    rubric: {
      elements: [
        {
          id: "exponential-volume",
          description:
            "As the number of features grows, the volume of the space grows exponentially.",
          weight: 3,
          required: true,
        },
        {
          id: "data-becomes-sparse",
          description:
            "So any fixed amount of data covers a vanishing fraction of that space — the data becomes sparse.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: -1.15,
    discrimination: 1.0,
    expectedSeconds: 50,
    prereqClosure: ["curse-of-dimensionality", "ml-introduction"],
    source: ML_01,
    status: "shadow",
  },
  {
    id: "curse-of-dimensionality--recall-distances",
    conceptId: "curse-of-dimensionality",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "As dimensionality increases at a fixed sample size, distances between points tend to:",
    choices: [
      {
        id: "a",
        text: "become less informative — points start to look roughly equidistant from one another",
        correct: true,
      },
      {
        id: "b",
        text: "become more informative and more discriminating",
        correct: false,
        misconception: {
          id: "distances-stay-informative",
          description:
            "Exactly reverses distance concentration. This is the failure that makes k-NN and RBF kernels degrade in high dimensions.",
          blameConceptId: "curse-of-dimensionality",
        },
      },
      {
        id: "c",
        text: "stay unchanged, since distance is a fixed formula",
        correct: false,
        misconception: {
          id: "formula-implies-invariance",
          description:
            "Confuses the formula being well defined with its *distribution* being unchanged. Adding dimensions changes how those distances are spread.",
          blameConceptId: "curse-of-dimensionality",
        },
      },
      {
        id: "d",
        text: "shrink towards zero",
        correct: false,
        misconception: {
          id: "distances-shrink",
          description:
            "Distances grow with dimension; what shrinks is their *relative* spread, which is what makes them uninformative.",
          blameConceptId: "curse-of-dimensionality",
        },
      },
    ],
    difficulty: -0.9,
    discrimination: 1.2,
    expectedSeconds: 35,
    prereqClosure: ["curse-of-dimensionality"],
    source: ML_01,
    status: "shadow",
  },
  {
    id: "curse-of-dimensionality--apply-sample-blowup",
    conceptId: "curse-of-dimensionality",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "100 points cover a 1-dimensional range at some density. To hold that density in 10 dimensions you need 100¹⁰ points. Give the exponent k in 10^k.",
    answerKey: 20,
    tolerance: 0.001,
    difficulty: -0.35,
    discrimination: 1.1,
    expectedSeconds: 60,
    prereqClosure: ["curse-of-dimensionality"],
    source: ML_01,
    status: "shadow",
  },
  {
    id: "curse-of-dimensionality--explain-volume-at-the-corners",
    conceptId: "curse-of-dimensionality",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Why does most of a high-dimensional hypercube's volume sit near its corners and surface rather than near its centre?",
    rubric: {
      elements: [
        {
          id: "differential-volume-growth",
          description:
            "Names the mechanism: the volume of any fixed central region grows far more slowly with dimension than the volume of the full cube, so its share tends to zero.",
          weight: 5,
          required: true,
        },
        {
          id: "connects-to-sparsity",
          description:
            "Connects it back to why 'local' neighbourhoods stop being local in high dimensions.",
          weight: 2,
        },
      ],
      forbiddenMoves: [
        {
          id: "states-fact-without-mechanism",
          description:
            "Restates that volume concentrates at the corners without saying why the growth rates differ.",
          weight: 1,
        },
      ],
    },
    difficulty: 0.35,
    discrimination: 1.6,
    expectedSeconds: 180,
    prereqClosure: ["curse-of-dimensionality"],
    source: ML_01,
    status: "shadow",
  },
  {
    id: "curse-of-dimensionality--transfer-knn-degradation",
    conceptId: "curse-of-dimensionality",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Why does adding many weakly informative features degrade a nearest-neighbour model, even though each feature 'contains information'?",
    rubric: {
      elements: [
        {
          id: "knn-depends-on-distance-ranking",
          description:
            "Nearest-neighbour methods depend on distance comparisons being meaningful.",
          weight: 3,
          required: true,
        },
        {
          id: "noise-dimensions-drown-signal",
          description:
            "Each near-useless dimension adds noise to every distance while contributing almost no signal, so the ranking is dominated by noise and the few genuinely useful features are drowned out.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.85,
    discrimination: 1.5,
    expectedSeconds: 180,
    prereqClosure: ["curse-of-dimensionality"],
    source: ML_01,
    status: "shadow",
  },

  // --- Training vs Validation vs Test Set ----------------------------------
  {
    id: "training-validation-test-set--recall-three-roles",
    conceptId: "training-validation-test-set",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "State the role of each of the training, validation, and test sets.",
    rubric: {
      elements: [
        {
          id: "training",
          description: "Training: fit the model's parameters.",
          weight: 2,
          required: true,
        },
        {
          id: "validation",
          description:
            "Validation: tune hyperparameters and select among candidate models.",
          weight: 2,
          required: true,
        },
        {
          id: "test",
          description:
            "Test: a final unbiased performance estimate, used once at the very end.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: -0.81,
    discrimination: 1.1,
    expectedSeconds: 60,
    prereqClosure: ["training-validation-test-set", "supervised-vs-unsupervised-learning"],
    source: ML_01,
    status: "shadow",
  },
  {
    id: "training-validation-test-set--recall-repeated-test-checks",
    conceptId: "training-validation-test-set",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Repeatedly checking test-set performance while still tuning a model causes:",
    choices: [
      {
        id: "a",
        text: "the test set to act as a second validation set, so the final estimate becomes optimistic",
        correct: true,
      },
      {
        id: "b",
        text: "no problem at all, since the model never trains on the test set",
        correct: false,
        misconception: {
          id: "test-reuse-assumed-harmless",
          description:
            "Assumes only gradient updates can leak information. Selection decisions made on a set consume it as an unbiased estimator just as fitting does.",
          blameConceptId: "training-validation-test-set",
        },
      },
      {
        id: "c",
        text: "the training error to become artificially low",
        correct: false,
        misconception: {
          id: "wrong-quantity-affected",
          description:
            "Training error is unaffected by test-set peeking; what degrades is the test set's value as an honest estimate.",
          blameConceptId: "training-validation-test-set",
        },
      },
      {
        id: "d",
        text: "the model to overfit the training set faster",
        correct: false,
        misconception: {
          id: "confuses-selection-with-fitting",
          description:
            "Conflates over-selection on held-out data with overfitting during parameter estimation. They are different mechanisms with different fixes.",
          blameConceptId: "training-validation-test-set",
        },
      },
    ],
    difficulty: -0.55,
    discrimination: 1.3,
    expectedSeconds: 35,
    prereqClosure: ["training-validation-test-set"],
    source: ML_01,
    status: "shadow",
  },
  {
    id: "training-validation-test-set--apply-70-15-15",
    conceptId: "training-validation-test-set",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "A 1,000-example dataset is split 70/15/15 into train/validation/test. Say what each subset is used for and at what stage of the project.",
    rubric: {
      elements: [
        {
          id: "train-fits-parameters",
          description: "The 700 training examples fit the model's parameters.",
          weight: 2,
          required: true,
        },
        {
          id: "validation-used-repeatedly",
          description:
            "The 150 validation examples are consulted repeatedly during development to tune hyperparameters and choose among models.",
          weight: 2,
          required: true,
        },
        {
          id: "test-used-once-at-the-end",
          description:
            "The 150 test examples are touched only once, at the very end, for the reported number.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.0,
    discrimination: 1.3,
    expectedSeconds: 100,
    prereqClosure: ["training-validation-test-set"],
    source: ML_01,
    status: "shadow",
  },
  {
    id: "training-validation-test-set--explain-selection-leakage",
    conceptId: "training-validation-test-set",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Why is repeatedly checking test-set performance a form of information leakage, even though no gradient step ever touches the test set?",
    rubric: {
      elements: [
        {
          id: "selection-is-the-channel",
          description:
            "Choosing which model or hyperparameters to keep *because of* test performance tunes the final choice to that specific sample.",
          weight: 4,
          required: true,
        },
        {
          id: "decision-not-gradients",
          description:
            "States the distinction explicitly: the test set influenced the decision, not the parameters — and that is enough to inflate the estimate.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.69,
    discrimination: 1.6,
    expectedSeconds: 180,
    prereqClosure: ["training-validation-test-set"],
    source: ML_01,
    status: "shadow",
  },
  {
    id: "training-validation-test-set--transfer-private-leaderboard",
    conceptId: "training-validation-test-set",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Why do machine learning competitions with a public leaderboard also keep a hidden private leaderboard?",
    rubric: {
      elements: [
        {
          id: "public-board-is-tuned-against",
          description:
            "Repeated public submissions let participants implicitly tune to the public test set — the same selection mechanism as peeking at a test set.",
          weight: 4,
          required: true,
        },
        {
          id: "private-set-restores-unbiasedness",
          description:
            "A hidden set revealed only at the end has never entered the selection loop, so it gives a genuinely unbiased final ranking.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.19,
    discrimination: 1.5,
    expectedSeconds: 190,
    prereqClosure: ["training-validation-test-set"],
    source: ML_01,
    status: "shadow",
  },

  // --- Data Leakage ---------------------------------------------------------
  {
    id: "data-leakage--recall-definition",
    conceptId: "data-leakage",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Define data leakage.",
    rubric: {
      elements: [
        {
          id: "unavailable-at-prediction-time",
          description:
            "Information that would not be available at real prediction time — often information generated after the outcome — influences training.",
          weight: 4,
          required: true,
        },
        {
          id: "makes-performance-look-better",
          description:
            "Consequence: measured performance is better than what deployment will deliver.",
          weight: 2,
          required: true,
        },
      ],
    },
    difficulty: -0.7,
    discrimination: 1.1,
    expectedSeconds: 50,
    prereqClosure: ["data-leakage", "training-validation-test-set"],
    source: ML_01,
    status: "shadow",
  },
  {
    id: "data-leakage--recall-classic-example",
    conceptId: "data-leakage",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which of these is a classic example of data leakage?",
    choices: [
      {
        id: "a",
        text: "Using a feature whose value is only recorded after the outcome has already occurred",
        correct: true,
      },
      {
        id: "b",
        text: "Using more training data than strictly necessary",
        correct: false,
        misconception: {
          id: "more-data-called-leakage",
          description:
            "Confuses dataset size with information flow. More data is not leakage; information from the wrong point in time is.",
          blameConceptId: "data-leakage",
        },
      },
      {
        id: "c",
        text: "Choosing a model that is too flexible for the sample size",
        correct: false,
        misconception: {
          id: "leakage-confused-with-overfitting",
          description:
            "Describes overfitting. Overfitting shows up as a train–validation gap; leakage inflates validation performance too.",
          blameConceptId: "data-leakage",
        },
      },
      {
        id: "d",
        text: "Reporting accuracy on an imbalanced dataset",
        correct: false,
        misconception: {
          id: "leakage-confused-with-bad-metric",
          description:
            "That is a metric-choice problem, not an information-flow problem. Nothing unavailable at prediction time has reached the model.",
          blameConceptId: "data-leakage",
        },
      },
    ],
    difficulty: -0.45,
    discrimination: 1.2,
    expectedSeconds: 35,
    prereqClosure: ["data-leakage"],
    source: ML_01,
    status: "shadow",
  },
  {
    id: "data-leakage--apply-collections-flag",
    conceptId: "data-leakage",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "A loan-default model uses 'account flagged for collections' as a feature. The flag is usually set after a default has begun. Why is this likely leakage?",
    rubric: {
      elements: [
        {
          id: "timing-mismatch",
          description:
            "Names the timing mismatch: the flag is written after the event being predicted, so it would not exist at genuine prediction time.",
          weight: 4,
          required: true,
        },
        {
          id: "proxy-for-the-outcome",
          description:
            "Identifies the feature as effectively a proxy for the outcome itself.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.1,
    discrimination: 1.4,
    expectedSeconds: 120,
    prereqClosure: ["data-leakage"],
    source: ML_01,
    status: "shadow",
  },
  {
    id: "data-leakage--explain-preprocessing-leakage",
    conceptId: "data-leakage",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "A pipeline standardises features (or fits PCA) on the entire dataset before splitting into train and test. What has leaked, given that the model never saw a test label?",
    rubric: {
      elements: [
        {
          id: "statistics-carry-test-information",
          description:
            "The means, standard deviations or PCA directions were computed using test rows, so the fitted transformation depends on the test set.",
          weight: 4,
          required: true,
        },
        {
          id: "leakage-through-preprocessing-not-labels",
          description:
            "States the general point: leakage can travel through preprocessing statistics, not only through labels.",
          weight: 3,
          required: true,
        },
        {
          id: "names-the-fix",
          description:
            "Bonus: fit every transform on the training split alone, inside a pipeline that refits per fold.",
          weight: 1,
        },
      ],
    },
    difficulty: 0.8,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["data-leakage", "training-validation-test-set"],
    source: ML_01,
    status: "shadow",
  },
  {
    id: "data-leakage--transfer-great-in-dev-fails-in-prod",
    conceptId: "data-leakage",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Why does leakage typically produce a model that looks excellent in development and fails badly in deployment?",
    rubric: {
      elements: [
        {
          id: "leaked-info-absent-in-production",
          description:
            "The leaked information — a post-outcome feature, or test-set statistics — is simply not available in the same form once the model faces genuinely new data.",
          weight: 4,
          required: true,
        },
        {
          id: "apparent-performance-was-borrowed",
          description:
            "The development performance was borrowing information that deployment cannot supply, so it was never a forecast of production behaviour.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.3,
    discrimination: 1.5,
    expectedSeconds: 190,
    prereqClosure: ["data-leakage"],
    source: ML_01,
    status: "shadow",
  },
];
