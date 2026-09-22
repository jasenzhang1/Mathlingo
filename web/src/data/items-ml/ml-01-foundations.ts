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
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
  },


  {
    id: "ml-introduction--apply-name-the-three-parts",
    conceptId: "ml-introduction",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "A learning problem needs a task, a source of experience, and a performance measure. Identify all three for: 'a system that gets better at recommending films the longer someone uses it.'",
    rubric: {
      elements: [
        {
          id: "task",
          description: "Task: predicting which films this person will rate highly, or rank for them.",
          weight: 2,
          required: true,
        },
        {
          id: "experience",
          description:
            "Experience: the person's accumulating watch history and ratings, plus other users' behaviour.",
          weight: 2,
          required: true,
        },
        {
          id: "performance-measure",
          description:
            "Performance measure: something concretely stated — rating prediction error, click-through, watch-completion rate — not just 'better recommendations'.",
          weight: 3,
          required: true,
        },
      ],
      forbiddenMoves: [
        {
          id: "measure-left-vague",
          description:
            "Leaves the performance measure as 'user satisfaction' or 'accuracy' with no statement of what is counted, which is exactly the part that makes a learning problem well posed.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.1,
    discrimination: 1.3,
    expectedSeconds: 140,
    prereqClosure: ["ml-introduction"],
    source: ML_01,
    status: "live",
  },
  {
    id: "ml-introduction--explain-risk-vs-empirical-risk",
    conceptId: "ml-introduction",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Training minimises the average loss on the data you have, but the quantity you care about is the average loss on data you have not seen. Why can you never compute the second one, and what follows from that?",
    rubric: {
      elements: [
        {
          id: "expectation-over-unknown-distribution",
          description:
            "The quantity of interest is an expectation over the data-generating distribution, which is exactly what you do not have — you only have a sample from it.",
          weight: 4,
          required: true,
        },
        {
          id: "what-follows",
          description:
            "So you minimise the sample average and hope it tracks the true one, which is why held-out evaluation and regularisation exist at all rather than being optional refinements.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.75,
    discrimination: 1.5,
    expectedSeconds: 190,
    prereqClosure: ["ml-introduction"],
    source: ML_01,
    status: "live",
  },
  {
    id: "ml-introduction--transfer-when-not-to-use-ml",
    conceptId: "ml-introduction",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Give a task where reaching for machine learning would be the wrong call, and state the property of the task that makes ordinary code the better answer.",
    rubric: {
      elements: [
        {
          id: "concrete-task",
          description:
            "Names a concrete task whose rule is published or fully specified — computing sales tax, validating a checksum, applying a contractual discount schedule.",
          weight: 3,
          required: true,
        },
        {
          id: "the-deciding-property",
          description:
            "Identifies the property: the rule is already known and exactly stateable, so learning it approximately from examples can only lose accuracy while adding data dependence.",
          weight: 4,
          required: true,
        },
        {
          id: "costs-named",
          description:
            "Bonus: names a concrete cost of the wrong choice — unexplainable errors on cases a rule would handle exactly, or a model that silently drifts.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.25,
    discrimination: 1.4,
    expectedSeconds: 200,
    prereqClosure: ["ml-introduction"],
    source: ML_01,
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
  },


  {
    id: "loss-functions--apply-absolute-vs-squared",
    conceptId: "loss-functions",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "Predictions miss the truth by 1, 1, 1 and 5 on four examples. Compute the total squared-error loss.",
    answerKey: 28,
    tolerance: 0.001,
    difficulty: 0.15,
    discrimination: 1.2,
    expectedSeconds: 80,
    prereqClosure: ["loss-functions"],
    source: ML_01,
    status: "live",
  },
  {
    id: "loss-functions--explain-which-statistic-is-recovered",
    conceptId: "loss-functions",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Minimising expected squared error returns the conditional mean, while minimising expected absolute error returns the conditional median. Why does that make the choice of loss a modelling decision rather than a convenience?",
    rubric: {
      elements: [
        {
          id: "loss-selects-the-summary",
          description:
            "The loss determines which summary of the conditional distribution the model reports — you are choosing what the prediction *means*, not just how it is fitted.",
          weight: 4,
          required: true,
        },
        {
          id: "when-they-differ",
          description:
            "On skewed targets the mean and median differ substantially, so the two losses give genuinely different predictions on the same data, and one of them answers the question being asked.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.6,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["loss-functions"],
    source: ML_01,
    status: "live",
  },
  {
    id: "loss-functions--transfer-asymmetric-cost",
    conceptId: "loss-functions",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A retailer's under-stocking costs a lost sale worth £40; over-stocking costs a day of warehousing worth £2. What does using squared error here assert, and what should be done instead?",
    rubric: {
      elements: [
        {
          id: "what-squared-error-asserts",
          description:
            "Squared error is symmetric, so it asserts that a unit of under-stocking and a unit of over-stocking cost the same — a claim about the business that is false by a factor of twenty.",
          weight: 4,
          required: true,
        },
        {
          id: "the-consequence",
          description:
            "The model will deliver the balanced-cost answer to a question nobody asked, systematically under-stocking relative to what the true costs imply.",
          weight: 3,
          required: true,
        },
        {
          id: "the-fix",
          description:
            "Names an asymmetric or quantile loss encoding the real cost ratio, rather than post-processing the predictions of a symmetric one.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.1,
    discrimination: 1.5,
    expectedSeconds: 200,
    prereqClosure: ["loss-functions"],
    source: ML_01,
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
  },


  {
    id: "types-of-machine-learning--apply-place-self-supervised",
    conceptId: "types-of-machine-learning",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "A model is trained by hiding a word in a sentence and predicting it from the surrounding words. Which family does that belong to, and why is the answer arguably both?",
    rubric: {
      elements: [
        {
          id: "structurally-supervised",
          description:
            "Structurally supervised: there is a target for every example and a loss comparing the prediction to it.",
          weight: 3,
          required: true,
        },
        {
          id: "practically-unsupervised",
          description:
            "Practically unsupervised: no human labelled anything — the targets are manufactured from the raw input itself.",
          weight: 3,
          required: true,
        },
        {
          id: "why-the-distinction-blurs",
          description:
            "Bonus: notes this is why 'self-supervised' is named separately, and why the labels axis is a description of where supervision comes from rather than a clean partition.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.2,
    discrimination: 1.4,
    expectedSeconds: 150,
    prereqClosure: ["types-of-machine-learning"],
    source: ML_01,
    status: "live",
  },
  {
    id: "types-of-machine-learning--explain-rl-data-not-independent",
    conceptId: "types-of-machine-learning",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "In supervised learning the training data is fixed before the model exists. In reinforcement learning it is not. Explain what changes as a result.",
    rubric: {
      elements: [
        {
          id: "agent-generates-its-own-data",
          description:
            "The agent's own actions determine which states it visits, so the data distribution depends on the current policy and shifts as the policy improves.",
          weight: 4,
          required: true,
        },
        {
          id: "consequence",
          description:
            "So the data is not independent of the model being fitted: a policy that never tries an action never learns about it, and evaluation cannot simply be held-out scoring of a fixed set.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.7,
    discrimination: 1.5,
    expectedSeconds: 190,
    prereqClosure: ["types-of-machine-learning"],
    source: ML_01,
    status: "live",
  },
  {
    id: "types-of-machine-learning--transfer-active-learning-budget",
    conceptId: "types-of-machine-learning",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A team can afford to have 500 of their 100,000 records labelled by an expert. Rather than sampling 500 at random, they let the model choose which ones. Why might that be better, and what could go wrong?",
    rubric: {
      elements: [
        {
          id: "why-better",
          description:
            "Labels spent where the model is most uncertain are more informative per unit of cost than labels on cases it already handles confidently.",
          weight: 4,
          required: true,
        },
        {
          id: "what-goes-wrong",
          description:
            "The labelled set is no longer a random sample of the population, so it is biased toward the boundary — it cannot be used to estimate performance, and an early wrong model can steer the selection into a blind spot it never escapes.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.2,
    discrimination: 1.5,
    expectedSeconds: 210,
    prereqClosure: ["types-of-machine-learning"],
    source: ML_01,
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
  },


  {
    id: "supervised-vs-unsupervised-learning--apply-sort-five-methods",
    conceptId: "supervised-vs-unsupervised-learning",
    format: "multi-select",
    cognitive: "apply",
    channels: ["typed"],
    stem: "Select every method that uses no label or outcome information at all.",
    choices: [
      { id: "a", text: "k-means clustering", correct: true },
      { id: "b", text: "principal component analysis", correct: true },
      { id: "c", text: "an autoencoder reconstructing its own input", correct: true },
      {
        id: "d",
        text: "k-nearest-neighbours classification",
        correct: false,
        misconception: {
          id: "knn-mistaken-for-unsupervised",
          description:
            "The shared 'k' with k-means is a coincidence of notation. k-NN votes on its neighbours' *labels*, which makes it supervised.",
          blameConceptId: "supervised-vs-unsupervised-learning",
        },
      },
      {
        id: "e",
        text: "linear discriminant analysis",
        correct: false,
        misconception: {
          id: "lda-mistaken-for-unsupervised",
          description:
            "It looks like PCA and is not: it chooses directions that separate *known classes*, so it cannot run without labels.",
          blameConceptId: "supervised-vs-unsupervised-learning",
        },
      },
    ],
    difficulty: 0.35,
    discrimination: 1.5,
    expectedSeconds: 90,
    prereqClosure: ["supervised-vs-unsupervised-learning"],
    source: ML_01,
    status: "live",
  },
  {
    id: "supervised-vs-unsupervised-learning--explain-clusters-are-not-classes",
    conceptId: "supervised-vs-unsupervised-learning",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "A clustering run returns four clean, well-separated groups. Why is that not yet evidence that four groups exist in the data?",
    rubric: {
      elements: [
        {
          id: "algorithms-always-return-clusters",
          description:
            "The algorithm was asked for four groups and will return four from any data, including pure noise — the output's existence is not evidence about the input.",
          weight: 4,
          required: true,
        },
        {
          id: "what-would-be-evidence",
          description:
            "Names what would count: comparison against a null reference, stability of the assignments across resamples, or an external variable the clusters predict but were not given.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.8,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["supervised-vs-unsupervised-learning"],
    source: ML_01,
    status: "live",
  },
  {
    id: "supervised-vs-unsupervised-learning--transfer-semi-supervised-case",
    conceptId: "supervised-vs-unsupervised-learning",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "With 200 labelled examples and 50,000 unlabelled ones, how can the unlabelled data help fit a classifier at all, given it contains no answers?",
    rubric: {
      elements: [
        {
          id: "unlabelled-data-constrains-the-boundary",
          description:
            "The unlabelled points reveal where the data actually lies, which constrains where a plausible boundary can sit — it should pass through sparse regions rather than through the middle of a dense cluster.",
          weight: 5,
          required: true,
        },
        {
          id: "assumption-being-made",
          description:
            "Names the assumption this rests on: that points in the same dense region tend to share a label. Where that fails, the unlabelled data actively misleads.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.3,
    discrimination: 1.5,
    expectedSeconds: 210,
    prereqClosure: ["supervised-vs-unsupervised-learning"],
    source: ML_01,
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
  },


  {
    id: "classification-vs-regression--apply-ordinal-target",
    conceptId: "classification-vs-regression",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "A target is a 1-to-5 star rating. Say what each framing gets wrong: treating it as regression, and treating it as five unordered classes.",
    rubric: {
      elements: [
        {
          id: "regression-assumes-equal-gaps",
          description:
            "Regression assumes the gap from 1★ to 2★ equals the gap from 4★ to 5★, and that fractional predictions like 3.7★ are meaningful.",
          weight: 3,
          required: true,
        },
        {
          id: "classification-discards-order",
          description:
            "Five unordered classes throws the ordering away, so predicting 1★ when the truth is 5★ costs exactly the same as predicting 4★.",
          weight: 3,
          required: true,
        },
        {
          id: "names-the-middle-ground",
          description:
            "Bonus: names ordinal regression as the framing built for exactly this case.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.45,
    discrimination: 1.4,
    expectedSeconds: 160,
    prereqClosure: ["classification-vs-regression"],
    source: ML_01,
    status: "live",
  },
  {
    id: "classification-vs-regression--explain-same-model-family",
    conceptId: "classification-vs-regression",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Almost every model family has both a classifier and a regressor version — trees, forests, boosting, k-NN, neural networks. What actually differs between the two versions, and what does not?",
    rubric: {
      elements: [
        {
          id: "what-changes",
          description:
            "The output layer and the loss change: a discrete output with a classification loss, or a real-valued output with a regression loss.",
          weight: 4,
          required: true,
        },
        {
          id: "what-stays",
          description:
            "The underlying mechanism does not — the same splits, the same neighbours, the same architecture — which is why the idea is worth learning once rather than twice.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.95,
    discrimination: 1.5,
    expectedSeconds: 180,
    prereqClosure: ["classification-vs-regression"],
    source: ML_01,
    status: "live",
  },
  {
    id: "classification-vs-regression--transfer-cost-of-a-near-miss",
    conceptId: "classification-vs-regression",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A model predicts 79 when the truth is 81, and the decision threshold is 80. Score this under both framings and say what the disagreement tells you about how to choose one.",
    rubric: {
      elements: [
        {
          id: "both-scores",
          description:
            "As regression, squared error (79 − 81)² = 4, a small miss. As classification, predicted 'below', truth 'above' — a full misclassification.",
          weight: 4,
          required: true,
        },
        {
          id: "neither-is-wrong",
          description:
            "Both scores are correct; they answer different questions. The framing to choose is the one whose notion of failure matches the real cost of the decision being made.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.45,
    discrimination: 1.5,
    expectedSeconds: 200,
    prereqClosure: ["classification-vs-regression"],
    source: ML_01,
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
  },


  {
    id: "curse-of-dimensionality--apply-neighbourhood-side-length",
    conceptId: "curse-of-dimensionality",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "To capture a fraction r of the data in a d-dimensional unit cube, a cubic neighbourhood must have side r^(1/d). With r = 0.01 and d = 100, what side length is needed? Give three decimal places.",
    answerKey: 0.955,
    tolerance: 0.005,
    difficulty: 0.2,
    discrimination: 1.4,
    expectedSeconds: 110,
    prereqClosure: ["curse-of-dimensionality"],
    source: ML_01,
    status: "live",
  },
  {
    id: "curse-of-dimensionality--explain-why-anything-works",
    conceptId: "curse-of-dimensionality",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Images with a million pixels are learned from far fewer than the astronomically many examples the curse of dimensionality seems to demand. Why does that not contradict it?",
    rubric: {
      elements: [
        {
          id: "effective-vs-ambient-dimension",
          description:
            "Real data does not fill its ambient space: the pixel patterns that constitute photographs are a vanishing subset of all possible pixel arrays, so the data lies near a much lower-dimensional surface.",
          weight: 5,
          required: true,
        },
        {
          id: "the-curse-applies-to-the-effective-one",
          description:
            "The sample requirement is governed by that effective dimension, not the nominal one — the curse is real and simply not being paid at the nominal rate.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.65,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["curse-of-dimensionality"],
    source: ML_01,
    status: "live",
  },
  {
    id: "curse-of-dimensionality--transfer-which-methods-suffer",
    conceptId: "curse-of-dimensionality",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Some methods degrade sharply as irrelevant features are added and others barely notice. What property separates the two groups?",
    rubric: {
      elements: [
        {
          id: "the-separating-property",
          description:
            "Whether the method combines all features into a single distance or similarity. Anything that does — nearest neighbours, distance-based clustering, radial kernels — has every added feature diluting the signal in that one number.",
          weight: 5,
          required: true,
        },
        {
          id: "the-resistant-group",
          description:
            "Methods that consider features one at a time or weight them individually — trees, and linear models with a sparsity penalty — can ignore an uninformative feature rather than averaging it in.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.15,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["curse-of-dimensionality"],
    source: ML_01,
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
  },


  {
    id: "training-validation-test-set--apply-choose-a-split-scheme",
    conceptId: "training-validation-test-set",
    format: "multi-select",
    cognitive: "apply",
    channels: ["typed"],
    stem: "Select every situation in which a uniformly random row-wise split would produce a misleading evaluation.",
    choices: [
      { id: "a", text: "Daily sales data, predicting next month's demand", correct: true },
      { id: "b", text: "Several clinical measurements per patient, predicting patient outcome", correct: true },
      { id: "c", text: "News articles syndicated to multiple sites under different ids", correct: true },
      {
        id: "d",
        text: "Independently collected survey responses, one per respondent, in no particular order",
        correct: false,
        misconception: {
          id: "random-split-called-unsafe-when-safe",
          description:
            "This is exactly the exchangeable case a random split assumes. Treating every dataset as unsafe is as unhelpful as treating none as unsafe.",
          blameConceptId: "training-validation-test-set",
        },
      },
    ],
    difficulty: 0.5,
    discrimination: 1.5,
    expectedSeconds: 110,
    prereqClosure: ["training-validation-test-set"],
    source: ML_01,
    status: "live",
  },
  {
    id: "training-validation-test-set--explain-winners-curse",
    conceptId: "training-validation-test-set",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "You try 200 configurations and report the best validation score. Explain why that number is biased upward even if all 200 models were genuinely equal in quality.",
    rubric: {
      elements: [
        {
          id: "maximum-of-noisy-estimates",
          description:
            "Each score is the true quality plus noise, and the maximum of 200 such draws sits systematically above their common mean — you selected the configuration that got luckiest on that sample.",
          weight: 5,
          required: true,
        },
        {
          id: "so-the-number-is-not-performance",
          description:
            "The reported figure therefore measures the winner's luck as well as its quality, which is why an untouched test set is needed to estimate the latter.",
          weight: 4,
          required: true,
        },
      ],
      forbiddenMoves: [
        {
          id: "blames-overfitting-the-training-set",
          description:
            "Attributes the bias to the models overfitting the training data, which is a different mechanism and would not arise if all 200 were equal in true quality.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.0,
    discrimination: 1.7,
    expectedSeconds: 200,
    prereqClosure: ["training-validation-test-set"],
    source: ML_01,
    status: "live",
  },
  {
    id: "training-validation-test-set--transfer-preprocessing-inside-the-split",
    conceptId: "training-validation-test-set",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Why must a scaler, an imputer or an encoder be fitted on the training split alone rather than on the whole dataset before splitting — and what practical device enforces this?",
    rubric: {
      elements: [
        {
          id: "fitted-transforms-are-model-parameters",
          description:
            "A fitted transform has parameters estimated from data — a mean, a category vocabulary — so fitting it on everything lets validation and test rows influence how training rows are represented.",
          weight: 4,
          required: true,
        },
        {
          id: "the-device",
          description:
            "Names the practical enforcement: wrapping every fitted step in a pipeline, so cross-validation refits the whole chain inside each fold rather than reusing one global fit.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.5,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["training-validation-test-set"],
    source: ML_01,
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
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
    status: "live",
  },

  {
    id: "data-leakage--apply-spot-the-leaks",
    conceptId: "data-leakage",
    format: "multi-select",
    cognitive: "apply",
    channels: ["typed"],
    stem: "A model predicts whether a customer will cancel their subscription this month. Select every feature that is likely leakage.",
    choices: [
      { id: "a", text: "Whether a cancellation-confirmation email was sent", correct: true },
      { id: "b", text: "Number of refund requests processed this month", correct: true },
      { id: "c", text: "Date the account was closed", correct: true },
      {
        id: "d",
        text: "Number of logins in the previous three months",
        correct: false,
        misconception: {
          id: "legitimate-history-called-leakage",
          description:
            "Prior behaviour recorded before the prediction moment is exactly the signal the model is supposed to use. Treating all predictive features as suspect is the opposite failure.",
          blameConceptId: "data-leakage",
        },
      },
      {
        id: "e",
        text: "The subscription tier the customer signed up on",
        correct: false,
        misconception: {
          id: "static-attribute-called-leakage",
          description:
            "Set at sign-up, long before the outcome, and available at prediction time.",
          blameConceptId: "data-leakage",
        },
      },
    ],
    difficulty: 0.55,
    discrimination: 1.6,
    expectedSeconds: 120,
    prereqClosure: ["data-leakage"],
    source: ML_01,
    status: "live",
  },
  {
    id: "data-leakage--explain-duplicate-rows",
    conceptId: "data-leakage",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Why are near-duplicate records a form of leakage even when every feature is legitimately available at prediction time?",
    rubric: {
      elements: [
        {
          id: "duplicates-straddle-the-split",
          description:
            "A duplicate landing in both training and test means the model has effectively already seen the test row, so its score there measures memorisation rather than generalisation.",
          weight: 4,
          required: true,
        },
        {
          id: "no-individual-feature-is-at-fault",
          description:
            "No single feature is illegitimate — the leak is in the *split*, which is why deduplication belongs to splitting rather than to data cleaning.",
          weight: 4,
          required: true,
        },
        {
          id: "concrete-sources",
          description:
            "Bonus: names concrete sources — the same customer under two ids, an article syndicated to two sites, augmented copies of one image.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.05,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["data-leakage", "training-validation-test-set"],
    source: ML_01,
    status: "live",
  },
  {
    id: "data-leakage--transfer-treat-a-good-score-as-a-bug",
    conceptId: "data-leakage",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A colleague reports 99.4% cross-validated accuracy on a problem domain experts consider roughly 80% achievable. Describe how you would investigate, and what specifically you would look for.",
    rubric: {
      elements: [
        {
          id: "treats-it-as-a-bug-report",
          description:
            "Treats the result as a defect to investigate rather than a success to celebrate — a score above what the problem allows is evidence about the pipeline, not about the model.",
          weight: 3,
          required: true,
        },
        {
          id: "concrete-checks",
          description:
            "Names concrete checks: inspect the highest-importance features and ask when each value is written relative to the outcome; verify the split is by group and by time; confirm every fitted transform sits inside the fold; check for duplicate rows.",
          weight: 5,
          required: true,
        },
        {
          id: "other-signals",
          description:
            "Bonus: notes corroborating signals — validation error below training error, or a single feature carrying implausible importance nobody can explain mechanistically.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.6,
    discrimination: 1.6,
    expectedSeconds: 230,
    prereqClosure: ["data-leakage", "training-validation-test-set"],
    source: ML_01,
    status: "live",
  },


  // =========================================================================
  // Doubling pass — additional items, one block per concept above.
  // =========================================================================

  // --- Machine Learning Introduction (new) ---------------------------------
  {
    id: "ml-introduction--recall-which-component",
    conceptId: "ml-introduction",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "In the task / experience / performance-measure framing of a learning problem, 'accuracy on held-out email' fills which role?",
    choices: [
      { id: "a", text: "Performance measure", correct: true },
      {
        id: "b",
        text: "Task",
        correct: false,
        misconception: {
          id: "accuracy-mistaken-for-task",
          description: "The task is what is being predicted (spam or not); accuracy is how well that prediction is scored, a separate role.",
          blameConceptId: "ml-introduction",
        },
      },
      {
        id: "c",
        text: "Experience",
        correct: false,
        misconception: {
          id: "accuracy-mistaken-for-experience",
          description: "Experience is the data the system learns from; a score computed after the fact is not itself data the system trained on.",
          blameConceptId: "ml-introduction",
        },
      },
      {
        id: "d",
        text: "None of the three — it is a separate fourth component",
        correct: false,
        misconception: {
          id: "invents-fourth-component",
          description: "A well-posed learning problem needs exactly these three components; a scoring rule is precisely what 'performance measure' names.",
          blameConceptId: "ml-introduction",
        },
      },
    ],
    difficulty: -2.4,
    discrimination: 1.0,
    expectedSeconds: 30,
    prereqClosure: ["ml-introduction"],
    source: ML_01,
    status: "live",
  },
  {
    id: "ml-introduction--recall-not-a-component",
    conceptId: "ml-introduction",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which of these is NOT one of the three components (task, experience, performance measure) that define a well-posed learning problem?",
    choices: [
      { id: "a", text: "The programming language used to implement the system", correct: true },
      {
        id: "b",
        text: "The task being learned",
        correct: false,
        misconception: {
          id: "task-mistaken-for-non-component",
          description: "The task is exactly one of the three required components, not an exception to them.",
          blameConceptId: "ml-introduction",
        },
      },
      {
        id: "c",
        text: "The source of experience the system learns from",
        correct: false,
        misconception: {
          id: "experience-mistaken-for-non-component",
          description: "Experience is exactly one of the three required components.",
          blameConceptId: "ml-introduction",
        },
      },
      {
        id: "d",
        text: "The performance measure used to evaluate improvement",
        correct: false,
        misconception: {
          id: "performance-measure-mistaken-for-non-component",
          description: "The performance measure is exactly one of the three required components.",
          blameConceptId: "ml-introduction",
        },
      },
    ],
    difficulty: -2.0,
    discrimination: 1.0,
    expectedSeconds: 30,
    prereqClosure: ["ml-introduction"],
    source: ML_01,
    status: "live",
  },
  {
    id: "ml-introduction--apply-classify-two-more",
    conceptId: "ml-introduction",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "Classify each as traditional programming or machine learning, and say why: (a) a commission calculator that applies a formula finance updates each quarter; (b) a churn-risk score that improves as more customer behaviour is logged.",
    rubric: {
      elements: [
        { id: "a-traditional", description: "(a) traditional programming — the formula is written and updated by a person, not inferred from data.", weight: 2, required: true },
        { id: "b-ml", description: "(b) machine learning — the scoring rule is inferred from accumulating behavioural data.", weight: 2, required: true },
        { id: "reason-names-origin-of-logic", description: "Justifies the split by where the decision logic comes from.", weight: 2 },
      ],
    },
    difficulty: 0.3,
    discrimination: 1.2,
    expectedSeconds: 70,
    prereqClosure: ["ml-introduction"],
    source: ML_01,
    status: "live",
  },
  {
    id: "ml-introduction--apply-fraud-three-parts",
    conceptId: "ml-introduction",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "State the task, experience, and performance measure for a system that flags likely fraudulent transactions and gets better at it over time.",
    rubric: {
      elements: [
        { id: "task", description: "Task: deciding whether a given transaction is fraudulent.", weight: 2, required: true },
        { id: "experience", description: "Experience: historical transactions with confirmed fraud/not-fraud outcomes.", weight: 2, required: true },
        { id: "performance-measure", description: "Performance measure: something concretely stated — e.g. false-negative rate at a fixed false-positive budget — not just 'catches fraud'.", weight: 3, required: true },
      ],
    },
    difficulty: 0.55,
    discrimination: 1.3,
    expectedSeconds: 130,
    prereqClosure: ["ml-introduction"],
    source: ML_01,
    status: "live",
  },
  {
    id: "ml-introduction--explain-measure-fixed-in-advance",
    conceptId: "ml-introduction",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Why must the performance measure be fixed before training and evaluation begin, rather than chosen afterward based on which metric makes the result look best?",
    rubric: {
      elements: [
        { id: "measure-defines-success", description: "The performance measure is what 'learning' means for this problem; changing it after the fact changes the claim being made.", weight: 3, required: true },
        {
          id: "post-hoc-choice-inflates-apparent-success",
          description: "Picking the best-looking metric after seeing several candidate results is a form of selection on the outcome, the same distortion multiple-comparison problems cause elsewhere.",
          weight: 3,
          required: true,
          misconception: {
            id: "metric-shopping-is-harmless",
            description: "Treats choosing a flattering metric after the fact as a neutral reporting choice, rather than as data-dependent selection that inflates the apparent result.",
            blameConceptId: "ml-introduction",
          },
        },
      ],
    },
    difficulty: 0.9,
    discrimination: 1.4,
    expectedSeconds: 140,
    prereqClosure: ["ml-introduction"],
    source: ML_01,
    status: "live",
  },
  {
    id: "ml-introduction--explain-vague-task-not-well-posed",
    conceptId: "ml-introduction",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Explain why 'the model recognises patterns in the data' is not, by itself, an adequate description of a machine learning task.",
    rubric: {
      elements: [
        { id: "no-concrete-task", description: "It names no concrete task — what is predicted, decided, or generated is left unstated.", weight: 3, required: true },
        { id: "no-experience-or-measure", description: "It also implies nothing about what experience the system learns from or how success is measured, so it fails to be a well-posed learning problem in Mitchell's sense.", weight: 3, required: true },
      ],
    },
    difficulty: 1.05,
    discrimination: 1.4,
    expectedSeconds: 130,
    prereqClosure: ["ml-introduction"],
    source: ML_01,
    status: "live",
  },
  {
    id: "ml-introduction--transfer-lookup-table-is-not-learning",
    conceptId: "ml-introduction",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A vendor calls their product 'AI' because it consults a giant, hand-built lookup table of pre-computed answers, with no adaptation over time. Argue, from the definition of machine learning, whether this label is justified.",
    rubric: {
      elements: [
        { id: "no-learning-occurred", description: "Nothing in the system was inferred from data via a training procedure — the table's entries were authored, however large the table.", weight: 4, required: true },
        { id: "conclusion", description: "Concludes the label is not justified by the definition, regardless of how sophisticated the lookup behaviour appears to a user.", weight: 3, required: true },
      ],
    },
    difficulty: 1.6,
    discrimination: 1.4,
    expectedSeconds: 160,
    prereqClosure: ["ml-introduction"],
    source: ML_01,
    status: "live",
  },
  {
    id: "ml-introduction--transfer-who-adjusts-the-rules",
    conceptId: "ml-introduction",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A rule-based system is updated every month by an analyst who reviews recent errors and manually edits the rules. A colleague calls this 'learning from data.' Use the distinction between who or what adjusts the rules to settle whether that label fits.",
    rubric: {
      elements: [
        { id: "human-in-the-loop", description: "The rules change because a person read the errors and edited logic by hand — the adjustment is human judgement informed by data, not an algorithm inferring the update.", weight: 4, required: true },
        { id: "contrast-with-ml", description: "Contrasts this with machine learning, where an algorithm itself computes the update from the data with no hand-authored rule change in the loop.", weight: 3, required: true },
        { id: "conclusion", description: "Concludes the system is data-informed engineering, not machine learning, even though data genuinely drives the changes.", weight: 2 },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.4,
    expectedSeconds: 170,
    prereqClosure: ["ml-introduction"],
    source: ML_01,
    status: "live",
  },

  // --- Loss Functions (new) -------------------------------------------------
  {
    id: "loss-functions--recall-cross-entropy-inputs",
    conceptId: "loss-functions",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Cross-entropy loss is built for predictions that are:",
    choices: [
      { id: "a", text: "Probabilities", correct: true },
      {
        id: "b",
        text: "Raw, unbounded real-valued numbers",
        correct: false,
        misconception: {
          id: "cross-entropy-for-raw-values",
          description: "Cross-entropy compares a predicted probability to an outcome; squared error, not cross-entropy, is the usual fit for an unbounded numeric target.",
          blameConceptId: "loss-functions",
        },
      },
      {
        id: "c",
        text: "Unordered category labels with no confidence attached",
        correct: false,
        misconception: {
          id: "cross-entropy-needs-no-probability",
          description: "Cross-entropy specifically needs a probability for the label to be scored against, not merely a hard label.",
          blameConceptId: "loss-functions",
        },
      },
      {
        id: "d",
        text: "Rankings between pairs of items",
        correct: false,
        misconception: {
          id: "cross-entropy-for-rankings",
          description: "Ranking losses compare relative order between items; cross-entropy compares a probability to a realised outcome.",
          blameConceptId: "loss-functions",
        },
      },
    ],
    difficulty: -2.2,
    discrimination: 1.0,
    expectedSeconds: 30,
    prereqClosure: ["loss-functions"],
    source: ML_01,
    status: "live",
  },
  {
    id: "loss-functions--recall-median-loss",
    conceptId: "loss-functions",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which loss is minimised in expectation by the conditional median rather than the conditional mean?",
    choices: [
      { id: "a", text: "Absolute error", correct: true },
      {
        id: "b",
        text: "Squared error",
        correct: false,
        misconception: {
          id: "squared-error-minimised-by-median",
          description: "Squared error is minimised by the conditional mean; absolute error is the one recovering the median.",
          blameConceptId: "loss-functions",
        },
      },
      {
        id: "c",
        text: "Cross-entropy",
        correct: false,
        misconception: {
          id: "cross-entropy-minimised-by-median",
          description: "Cross-entropy is minimised by matching the true conditional probability, not by any single-number summary like a median.",
          blameConceptId: "loss-functions",
        },
      },
      {
        id: "d",
        text: "Hinge loss",
        correct: false,
        misconception: {
          id: "hinge-loss-minimised-by-median",
          description: "Hinge loss targets a margin around a decision boundary for classification, not a central-tendency summary of a numeric target.",
          blameConceptId: "loss-functions",
        },
      },
    ],
    difficulty: -1.8,
    discrimination: 1.1,
    expectedSeconds: 35,
    prereqClosure: ["loss-functions"],
    source: ML_01,
    status: "live",
  },
  {
    id: "loss-functions--apply-absolute-error-value",
    conceptId: "loss-functions",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "For absolute-error loss L(y, ŷ) = |y − ŷ|, compute the loss when y = 10 and ŷ = 7.",
    answerKey: 3,
    tolerance: 0.001,
    difficulty: -0.2,
    discrimination: 1.0,
    expectedSeconds: 30,
    prereqClosure: ["loss-functions"],
    source: ML_01,
    status: "live",
  },
  {
    id: "loss-functions--apply-squared-error-total",
    conceptId: "loss-functions",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "Predictions miss the truth by 2, 2, 2 and 6 on four examples. Compute the total squared-error loss.",
    answerKey: 48,
    tolerance: 0.001,
    difficulty: 0.25,
    discrimination: 1.2,
    expectedSeconds: 80,
    prereqClosure: ["loss-functions"],
    source: ML_01,
    status: "live",
  },
  {
    id: "loss-functions--explain-01-loss-not-trainable",
    conceptId: "loss-functions",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "0/1 loss (score 0 for an exact match, 1 otherwise) is exactly what many applications ultimately care about, yet it is rarely used directly to train a model. Explain why.",
    rubric: {
      elements: [
        { id: "flat-almost-everywhere", description: "0/1 loss is flat almost everywhere and jumps discontinuously at the decision boundary, so its gradient is zero almost everywhere and undefined at the jump.", weight: 4, required: true },
        { id: "needs-smooth-surrogate", description: "Gradient-based training needs a smooth surrogate — such as cross-entropy or hinge loss — that tracks 0/1 loss's ranking of good and bad predictions but gives a useful gradient everywhere.", weight: 3, required: true },
      ],
    },
    difficulty: 0.75,
    discrimination: 1.5,
    expectedSeconds: 140,
    prereqClosure: ["loss-functions"],
    source: ML_01,
    status: "live",
  },
  {
    id: "loss-functions--explain-hinge-vs-cross-entropy-easy-examples",
    conceptId: "loss-functions",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Hinge loss gives exactly zero loss to a prediction that is already confidently correct beyond its margin, while cross-entropy never reaches exactly zero for a finite score. Explain what this implies about how each loss treats already-easy examples during training.",
    rubric: {
      elements: [
        { id: "hinge-stops-pushing", description: "Once hinge loss's margin condition is satisfied, an example contributes nothing further to the gradient, so training stops spending effort on it.", weight: 3, required: true },
        { id: "cross-entropy-keeps-pushing", description: "Cross-entropy keeps giving a (shrinking but nonzero) gradient even on confidently correct examples, continually nudging predicted probabilities closer to the extremes.", weight: 3, required: true },
      ],
    },
    difficulty: 0.95,
    discrimination: 1.5,
    expectedSeconds: 150,
    prereqClosure: ["loss-functions"],
    source: ML_01,
    status: "live",
  },
  {
    id: "loss-functions--transfer-proxy-metric-mismatch",
    conceptId: "loss-functions",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A recommender's real business goal is revenue per session, but it is trained with squared error against a proxy 'engagement score.' Explain how this can silently optimise the wrong thing, and what should be checked before trusting the proxy.",
    rubric: {
      elements: [
        { id: "proxy-drift", description: "Minimising loss on the proxy only helps the true goal to the extent the proxy tracks it; the model has every incentive to exploit any way the proxy and the true goal diverge.", weight: 3, required: true },
        {
          id: "concrete-failure",
          description: "Gives a concrete failure mode — e.g. maximising a clicks-based engagement score by surfacing clickbait that reduces actual purchases.",
          weight: 3,
          required: true,
          misconception: {
            id: "proxy-optimisation-guarantees-true-goal",
            description: "Assumes optimising a correlated proxy metric automatically optimises the true business goal, ignoring ways the two can be pulled apart.",
            blameConceptId: "loss-functions",
          },
        },
        { id: "check", description: "Recommends periodically validating the proxy against the true metric (e.g. via a holdout experiment measuring actual revenue), not just trusting the correlation once.", weight: 2 },
      ],
    },
    difficulty: 1.6,
    discrimination: 1.4,
    expectedSeconds: 170,
    prereqClosure: ["loss-functions"],
    source: ML_01,
    status: "live",
  },
  {
    id: "loss-functions--transfer-focal-loss-imbalance",
    conceptId: "loss-functions",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Focal loss down-weights the contribution of well-classified, easy examples relative to plain cross-entropy. Explain what problem in heavily imbalanced classification this targets, and why plain cross-entropy handles it poorly.",
    rubric: {
      elements: [
        { id: "easy-majority-dominates", description: "With extreme imbalance, the vast number of easy majority-class examples each contribute a small cross-entropy loss that sums to dominate the total gradient, drowning out the few hard, informative minority examples.", weight: 3, required: true },
        { id: "focal-reweights", description: "Focal loss shrinks the per-example loss further as confidence rises, so easy majority examples contribute even less and the rarer hard examples drive more of the learning signal.", weight: 3, required: true },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.5,
    expectedSeconds: 170,
    prereqClosure: ["loss-functions"],
    source: ML_01,
    status: "live",
  },

  // --- Types of Machine Learning (new) --------------------------------------
  {
    id: "types-of-machine-learning--recall-reward-definition",
    conceptId: "types-of-machine-learning",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "In reinforcement learning, what is a 'reward'?",
    choices: [
      { id: "a", text: "Scalar evaluative feedback about how good an outcome was, given after the agent acts", correct: true },
      {
        id: "b",
        text: "The correct action label for the state the agent was in",
        correct: false,
        misconception: {
          id: "reward-mistaken-for-label",
          description: "A label would say what the right action was; a reward only says how good the outcome turned out to be, which is a weaker, evaluative signal.",
          blameConceptId: "types-of-machine-learning",
        },
      },
      {
        id: "c",
        text: "The gradient used to update the agent's parameters",
        correct: false,
        misconception: {
          id: "reward-mistaken-for-gradient",
          description: "The reward is an input to the learning algorithm, not the gradient itself, which still has to be computed from it.",
          blameConceptId: "types-of-machine-learning",
        },
      },
      {
        id: "d",
        text: "A form of data augmentation applied to the environment",
        correct: false,
        misconception: {
          id: "reward-mistaken-for-augmentation",
          description: "Confuses the core learning signal of reinforcement learning with an unrelated technique for expanding training data.",
          blameConceptId: "types-of-machine-learning",
        },
      },
    ],
    difficulty: -2.2,
    discrimination: 1.0,
    expectedSeconds: 30,
    prereqClosure: ["types-of-machine-learning"],
    source: ML_01,
    status: "live",
  },
  {
    id: "types-of-machine-learning--recall-self-supervised-targets",
    conceptId: "types-of-machine-learning",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Self-supervised learning generates its training targets from:",
    choices: [
      { id: "a", text: "The input data itself, with no external human labels", correct: true },
      {
        id: "b",
        text: "A human annotator labelling each example",
        correct: false,
        misconception: {
          id: "self-supervised-needs-annotator",
          description: "That describes ordinary supervised learning. Self-supervised learning manufactures targets from the data automatically.",
          blameConceptId: "types-of-machine-learning",
        },
      },
      {
        id: "c",
        text: "A reward signal from an environment",
        correct: false,
        misconception: {
          id: "self-supervised-confused-with-rl",
          description: "Self-supervised learning has no environment or reward; it constructs supervised-style targets from the raw input.",
          blameConceptId: "types-of-machine-learning",
        },
      },
      {
        id: "d",
        text: "Random noise unrelated to the input",
        correct: false,
        misconception: {
          id: "self-supervised-targets-are-noise",
          description: "The targets are derived meaningfully from the structure of the input (e.g. a hidden word), not from unrelated noise.",
          blameConceptId: "types-of-machine-learning",
        },
      },
    ],
    difficulty: -1.8,
    discrimination: 1.1,
    expectedSeconds: 35,
    prereqClosure: ["types-of-machine-learning"],
    source: ML_01,
    status: "live",
  },
  {
    id: "types-of-machine-learning--apply-classify-three-more",
    conceptId: "types-of-machine-learning",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "Classify each: (a) a robot arm learning to grasp objects from trial-and-error success/failure feedback; (b) routing support tickets using a dataset of past tickets and their correct department labels; (c) grouping news articles with no predefined topics.",
    rubric: {
      elements: [
        { id: "all-three-correct", description: "(a) reinforcement, (b) supervised, (c) unsupervised.", weight: 5, required: true },
      ],
    },
    difficulty: -0.3,
    discrimination: 1.1,
    expectedSeconds: 60,
    prereqClosure: ["types-of-machine-learning"],
    source: ML_01,
    status: "live",
  },
  {
    id: "types-of-machine-learning--apply-pretrain-then-finetune",
    conceptId: "types-of-machine-learning",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "A model is pretrained on a large set of unlabelled protein structures, then fine-tuned on a small labelled dataset for a specific prediction task. Name the paradigm used at each of the two stages.",
    rubric: {
      elements: [
        { id: "pretrain-stage", description: "Pretraining stage: self-supervised (or unsupervised) learning, since no human labels are used.", weight: 3, required: true },
        { id: "finetune-stage", description: "Fine-tuning stage: supervised learning, since the small dataset carries labels.", weight: 3, required: true },
      ],
    },
    difficulty: 0.25,
    discrimination: 1.3,
    expectedSeconds: 90,
    prereqClosure: ["types-of-machine-learning"],
    source: ML_01,
    status: "live",
  },
  {
    id: "types-of-machine-learning--explain-reward-hacking",
    conceptId: "types-of-machine-learning",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Explain why reinforcement learning is especially prone to 'reward hacking' — finding a way to score highly without doing what the designer intended — in a way supervised learning is not.",
    rubric: {
      elements: [
        { id: "agent-searches-for-any-high-reward-path", description: "The agent is free to discover any sequence of actions that raises reward, and will exploit any gap between the stated reward and the designer's true intent if that gap yields higher score.", weight: 3, required: true },
        { id: "supervised-has-no-comparable-freedom", description: "Supervised learning has no comparable freedom to act — it only fits a fixed mapping to fixed labels, so there is no action space in which to discover an unintended shortcut.", weight: 3, required: true },
      ],
    },
    difficulty: 0.9,
    discrimination: 1.4,
    expectedSeconds: 140,
    prereqClosure: ["types-of-machine-learning"],
    source: ML_01,
    status: "live",
  },
  {
    id: "types-of-machine-learning--explain-exploration-exploitation",
    conceptId: "types-of-machine-learning",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Explain why an agent trained purely by reinforcement learning can get stuck repeating a known-good strategy and never discover a better one, and name the tension this is usually called.",
    rubric: {
      elements: [
        { id: "known-strategy-locks-in", description: "If the agent only ever repeats actions it already knows yield decent reward, it never tries alternatives that might be better but are untested.", weight: 3, required: true },
        { id: "names-tradeoff", description: "Names the exploration-exploitation trade-off: exploiting the best-known action maximises immediate reward, while exploring untested actions is needed to discover something better, and the two pull in opposite directions.", weight: 3, required: true },
      ],
    },
    difficulty: 1.1,
    discrimination: 1.4,
    expectedSeconds: 140,
    prereqClosure: ["types-of-machine-learning"],
    source: ML_01,
    status: "live",
  },
  {
    id: "types-of-machine-learning--transfer-combine-supervised-and-rl",
    conceptId: "types-of-machine-learning",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A company wants an agent to play a new board game well, but simulating games for pure reinforcement learning is expensive. Explain how they might combine supervised learning (from human game records) with reinforcement learning (from self-play) rather than relying on only one.",
    rubric: {
      elements: [
        { id: "supervised-bootstraps", description: "Supervised learning on recorded human games gives the agent a reasonable starting policy quickly, without needing costly trial-and-error from scratch.", weight: 3, required: true },
        { id: "rl-refines-beyond-humans", description: "Reinforcement learning via self-play then refines and can surpass that starting policy, discovering strategies beyond what the human record demonstrated.", weight: 3, required: true },
        { id: "cost-tradeoff", description: "Notes this trades a smaller amount of expensive self-play for a large amount of cheaper supervised pretraining.", weight: 2 },
      ],
    },
    difficulty: 1.7,
    discrimination: 1.4,
    expectedSeconds: 160,
    prereqClosure: ["types-of-machine-learning"],
    source: ML_01,
    status: "live",
  },
  {
    id: "types-of-machine-learning--transfer-contextual-bandits-are-intermediate",
    conceptId: "types-of-machine-learning",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Contextual bandits sit between supervised learning and full reinforcement learning. Explain what they keep from each, and what makes them a genuinely intermediate case rather than just 'reinforcement learning with one step.'",
    rubric: {
      elements: [
        { id: "keeps-from-supervised", description: "Like supervised learning, each decision is a single, independent round with a context (input) and an immediate outcome, with no long-horizon state carried forward.", weight: 3, required: true },
        { id: "keeps-from-rl", description: "Like reinforcement learning, the learner only observes the reward for the action it actually took, never the reward it would have gotten from the actions it did not take.", weight: 3, required: true },
        { id: "genuinely-intermediate", description: "This partial-feedback property (not full-information, as supervised learning has) combined with the single-step structure (not the multi-step credit-assignment problem of full RL) is what makes it a distinct case rather than a trivial special case of either.", weight: 2 },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.4,
    expectedSeconds: 170,
    prereqClosure: ["types-of-machine-learning"],
    source: ML_01,
    status: "live",
  },

  // --- Supervised vs Unsupervised Learning (new) ----------------------------
  {
    id: "supervised-vs-unsupervised-learning--recall-density-estimation",
    conceptId: "supervised-vs-unsupervised-learning",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Fitting a probability model to unlabelled data (density estimation) is an example of:",
    choices: [
      { id: "a", text: "Unsupervised learning", correct: true },
      {
        id: "b",
        text: "Supervised learning",
        correct: false,
        misconception: {
          id: "density-estimation-mistaken-for-supervised",
          description: "No outcome or label is being predicted or matched — the model describes the shape of the data itself.",
          blameConceptId: "supervised-vs-unsupervised-learning",
        },
      },
      {
        id: "c",
        text: "Reinforcement learning",
        correct: false,
        misconception: {
          id: "density-estimation-mistaken-for-rl",
          description: "There is no environment, action, or reward involved.",
          blameConceptId: "types-of-machine-learning",
        },
      },
      {
        id: "d",
        text: "Not machine learning, since no prediction is made",
        correct: false,
        misconception: {
          id: "density-estimation-not-ml",
          description: "Fitting a distribution from data is learning from data — prediction of a single label is not a requirement of the definition.",
          blameConceptId: "ml-introduction",
        },
      },
    ],
    difficulty: -2.0,
    discrimination: 1.0,
    expectedSeconds: 30,
    prereqClosure: ["supervised-vs-unsupervised-learning"],
    source: ML_01,
    status: "live",
  },
  {
    id: "supervised-vs-unsupervised-learning--recall-anomaly-detection",
    conceptId: "supervised-vs-unsupervised-learning",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Flagging anomalies using only a set of unlabelled 'normal' examples is best described as:",
    choices: [
      { id: "a", text: "Unsupervised learning", correct: true },
      {
        id: "b",
        text: "Supervised learning, since it produces a normal/anomalous decision",
        correct: false,
        misconception: {
          id: "anomaly-detection-mistaken-for-supervised",
          description: "Producing a binary-looking decision at the end does not make the method supervised; no labelled anomalies were used to train it.",
          blameConceptId: "supervised-vs-unsupervised-learning",
        },
      },
      {
        id: "c",
        text: "Reinforcement learning",
        correct: false,
        misconception: {
          id: "anomaly-detection-mistaken-for-rl",
          description: "There is no sequential interaction or reward signal here.",
          blameConceptId: "types-of-machine-learning",
        },
      },
      {
        id: "d",
        text: "Impossible without labelled anomalies",
        correct: false,
        misconception: {
          id: "anomaly-detection-needs-labels",
          description: "Unsupervised anomaly detection flags points that look unlike the bulk of the (unlabelled, presumed-normal) data, precisely without needing labelled anomalies.",
          blameConceptId: "supervised-vs-unsupervised-learning",
        },
      },
    ],
    difficulty: -1.6,
    discrimination: 1.1,
    expectedSeconds: 35,
    prereqClosure: ["supervised-vs-unsupervised-learning"],
    source: ML_01,
    status: "live",
  },
  {
    id: "supervised-vs-unsupervised-learning--apply-is-hierarchical-clustering-supervised",
    conceptId: "supervised-vs-unsupervised-learning",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "Is hierarchical clustering supervised or unsupervised? Justify your answer from the definition.",
    rubric: {
      elements: [
        { id: "unsupervised", description: "Unsupervised.", weight: 2, required: true },
        { id: "no-outcome-used", description: "Justifies it: hierarchical clustering groups points by similarity alone and never consults a label or outcome.", weight: 4, required: true },
      ],
    },
    difficulty: 0.0,
    discrimination: 1.2,
    expectedSeconds: 70,
    prereqClosure: ["supervised-vs-unsupervised-learning"],
    source: ML_01,
    status: "live",
  },
  {
    id: "supervised-vs-unsupervised-learning--apply-1-percent-labelled",
    conceptId: "supervised-vs-unsupervised-learning",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "A dataset of product images has quality labels for only 1% of them. Propose whether to start with a fully supervised, fully unsupervised, or semi-supervised approach, and justify.",
    rubric: {
      elements: [
        { id: "semi-supervised-recommended", description: "Recommends a semi-supervised (or self-supervised pretraining plus supervised fine-tuning) approach.", weight: 3, required: true },
        { id: "justification", description: "Justifies it: fully supervised wastes the 99% unlabelled majority; fully unsupervised wastes the labels that do exist, which carry the exact signal being sought.", weight: 4, required: true },
      ],
    },
    difficulty: 0.4,
    discrimination: 1.3,
    expectedSeconds: 100,
    prereqClosure: ["supervised-vs-unsupervised-learning"],
    source: ML_01,
    status: "live",
  },
  {
    id: "supervised-vs-unsupervised-learning--explain-single-number-vs-not",
    conceptId: "supervised-vs-unsupervised-learning",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Explain why a supervised model's test accuracy can be reported as a single trustworthy number, while an unsupervised clustering's 'quality' cannot be reduced to one universally agreed number.",
    rubric: {
      elements: [
        { id: "supervised-has-ground-truth", description: "Supervised accuracy compares predictions to known ground-truth labels, giving an objective, agreed-upon target to measure against.", weight: 3, required: true },
        { id: "unsupervised-quality-is-contested", description: "Clustering quality depends on what 'good structure' should mean for the purpose at hand, and different reasonable criteria (compactness, separation, downstream usefulness) can disagree.", weight: 3, required: true },
      ],
    },
    difficulty: 0.7,
    discrimination: 1.5,
    expectedSeconds: 140,
    prereqClosure: ["supervised-vs-unsupervised-learning"],
    source: ML_01,
    status: "live",
  },
  {
    id: "supervised-vs-unsupervised-learning--explain-representation-learning-bridge",
    conceptId: "supervised-vs-unsupervised-learning",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Explain how representation learning bridges unsupervised and supervised paradigms: what is learned unsupervised, and how does it help a later supervised stage?",
    rubric: {
      elements: [
        { id: "learned-unsupervised", description: "An unsupervised or self-supervised stage learns a compact representation of the raw data's structure, with no labels involved.", weight: 3, required: true },
        { id: "helps-supervised-stage", description: "That representation is then reused as input to a supervised model, which often needs far fewer labelled examples to reach good performance than training on raw data would.", weight: 3, required: true },
      ],
    },
    difficulty: 1.0,
    discrimination: 1.5,
    expectedSeconds: 150,
    prereqClosure: ["supervised-vs-unsupervised-learning"],
    source: ML_01,
    status: "live",
  },
  {
    id: "supervised-vs-unsupervised-learning--transfer-clicks-as-noisy-labels",
    conceptId: "supervised-vs-unsupervised-learning",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A search engine has click logs but no explicit relevance labels. Explain how this could be treated either as noisy supervised learning or as an unsupervised/ranking problem, and what assumption each framing makes about what a click means.",
    rubric: {
      elements: [
        { id: "supervised-framing", description: "As noisy supervised learning: a click is treated as a (noisy) positive label for relevance, and the model is trained to predict clicks; this assumes clicking closely tracks true relevance.", weight: 3, required: true },
        { id: "unsupervised-framing", description: "As an unsupervised/structural problem: click patterns reveal groupings or co-occurrence structure among queries and results without asserting any click directly means 'relevant'.", weight: 3, required: true },
        { id: "assumption-contrast", description: "Contrasts the assumptions: the first bets that clicks are a reasonable relevance proxy; the second sidesteps that bet at the cost of a less direct connection to relevance.", weight: 2 },
      ],
    },
    difficulty: 1.6,
    discrimination: 1.4,
    expectedSeconds: 160,
    prereqClosure: ["supervised-vs-unsupervised-learning"],
    source: ML_01,
    status: "live",
  },
  {
    id: "supervised-vs-unsupervised-learning--transfer-contrastive-is-self-supervised",
    conceptId: "supervised-vs-unsupervised-learning",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Contrastive self-supervised learning trains a model to recognise that two augmented views of the same image are 'the same' and different images are 'different', with no human labels. Explain why this is called self-supervised rather than simply unsupervised, given that neither uses labels.",
    rubric: {
      elements: [
        { id: "manufactured-supervisory-signal", description: "The 'same/different' pairing is a manufactured target built automatically from the data (which augmentations came from which image), giving the training loop the structure of a supervised problem even though no human ever labelled anything.", weight: 4, required: true },
        { id: "pure-unsupervised-has-no-target", description: "Purely unsupervised methods like clustering or PCA have no such per-example target at all; they optimise a criterion over the whole dataset's structure instead.", weight: 3, required: true },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.4,
    expectedSeconds: 160,
    prereqClosure: ["supervised-vs-unsupervised-learning"],
    source: ML_01,
    status: "live",
  },

  // --- Classification vs Regression (new) -----------------------------------
  {
    id: "classification-vs-regression--recall-days-until-churn",
    conceptId: "classification-vs-regression",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Predicting the number of days until a customer churns is best framed as:",
    choices: [
      { id: "a", text: "Regression", correct: true },
      {
        id: "b",
        text: "Classification",
        correct: false,
        misconception: {
          id: "days-until-churn-as-classification",
          description: "A count of days is a continuous numeric target, not a category — bucketing it into ranges would make it classification, but the raw count is regression.",
          blameConceptId: "classification-vs-regression",
        },
      },
      {
        id: "c",
        text: "Unsupervised learning",
        correct: false,
        misconception: {
          id: "days-until-churn-as-unsupervised",
          description: "Past churn dates serve as labels for training, which makes this supervised.",
          blameConceptId: "supervised-vs-unsupervised-learning",
        },
      },
      {
        id: "d",
        text: "Reinforcement learning",
        correct: false,
        misconception: {
          id: "days-until-churn-as-rl",
          description: "There is no sequential decision-making or reward signal here — just a numeric prediction from historical data.",
          blameConceptId: "types-of-machine-learning",
        },
      },
    ],
    difficulty: -1.9,
    discrimination: 1.0,
    expectedSeconds: 30,
    prereqClosure: ["classification-vs-regression"],
    source: ML_01,
    status: "live",
  },
  {
    id: "classification-vs-regression--recall-probability-output",
    conceptId: "classification-vs-regression",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "A model outputs a class probability like 0.83. Is producing that probability itself classification or regression?",
    choices: [
      { id: "a", text: "Technically regression (a continuous score), which is then thresholded into a classification decision", correct: true },
      {
        id: "b",
        text: "Purely classification, since it will be used to decide a category",
        correct: false,
        misconception: {
          id: "probability-output-called-purely-classification",
          description: "Ignores that the number itself is continuous; the classification step happens only when a threshold is applied afterward.",
          blameConceptId: "classification-vs-regression",
        },
      },
      {
        id: "c",
        text: "Neither — probabilities are not predictions",
        correct: false,
        misconception: {
          id: "probability-not-a-prediction",
          description: "A predicted probability is a genuine model output that can itself be scored (e.g. by log loss), not a non-prediction.",
          blameConceptId: "classification-vs-regression",
        },
      },
      {
        id: "d",
        text: "Unsupervised, since no single label is directly output",
        correct: false,
        misconception: {
          id: "probability-output-called-unsupervised",
          description: "The model was still trained against known labels; producing a probability instead of a hard label does not remove the supervision.",
          blameConceptId: "supervised-vs-unsupervised-learning",
        },
      },
    ],
    difficulty: -1.5,
    discrimination: 1.1,
    expectedSeconds: 40,
    prereqClosure: ["classification-vs-regression"],
    source: ML_01,
    status: "live",
  },
  {
    id: "classification-vs-regression--apply-classify-three-more",
    conceptId: "classification-vs-regression",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "Label each as classification or regression: (a) the exact number of days until a piece of equipment fails; (b) whether the equipment fails within 30 days; (c) a movie's age rating.",
    rubric: {
      elements: [
        { id: "all-three-correct", description: "(a) regression, (b) classification, (c) classification.", weight: 4, required: true },
      ],
    },
    difficulty: -0.2,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["classification-vs-regression"],
    source: ML_01,
    status: "live",
  },
  {
    id: "classification-vs-regression--apply-which-part-is-which",
    conceptId: "classification-vs-regression",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "A pipeline predicts the probability a transaction is fraud, then acts if that probability exceeds 0.9. Which part of this pipeline is regression and which is classification?",
    rubric: {
      elements: [
        { id: "probability-is-regression", description: "Predicting the continuous fraud probability is a regression-like step.", weight: 3, required: true },
        { id: "threshold-is-classification", description: "Applying the 0.9 threshold converts that continuous score into a discrete act/don't-act decision — the classification step.", weight: 3, required: true },
      ],
    },
    difficulty: 0.3,
    discrimination: 1.3,
    expectedSeconds: 90,
    prereqClosure: ["classification-vs-regression"],
    source: ML_01,
    status: "live",
  },
  {
    id: "classification-vs-regression--explain-bucketing-loses-information",
    conceptId: "classification-vs-regression",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Explain why converting a regression target into classification 'buckets' loses information, even when the buckets align exactly with a real decision boundary.",
    rubric: {
      elements: [
        { id: "within-bucket-info-lost", description: "Two values in the same bucket are treated as identical even though one might be far closer to the boundary than the other, discarding how confident or marginal a case is.", weight: 3, required: true },
        { id: "cannot-be-recovered", description: "That within-bucket distinction cannot be recovered later — once discretised, no downstream step can reconstruct where within the bucket the true value actually sat.", weight: 3, required: true },
      ],
    },
    difficulty: 0.8,
    discrimination: 1.4,
    expectedSeconds: 140,
    prereqClosure: ["classification-vs-regression"],
    source: ML_01,
    status: "live",
  },
  {
    id: "classification-vs-regression--explain-accuracy-not-comparable-across-regression",
    conceptId: "classification-vs-regression",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Explain why accuracy, a classification metric, cannot be used to compare two regression models, even if both are eventually thresholded the same way downstream.",
    rubric: {
      elements: [
        { id: "accuracy-needs-discrete-labels", description: "Accuracy is defined over discrete predicted and true labels; a raw regression output has no notion of 'exact match' until it is discretised by a chosen threshold.", weight: 3, required: true },
        { id: "threshold-choice-hides-differences", description: "Comparing only after a shared threshold can rank two regressors identically even though one is far more accurate in the continuous sense, or can flip their ranking if the threshold changes.", weight: 3, required: true },
      ],
    },
    difficulty: 1.05,
    discrimination: 1.4,
    expectedSeconds: 140,
    prereqClosure: ["classification-vs-regression"],
    source: ML_01,
    status: "live",
  },
  {
    id: "classification-vs-regression--transfer-censored-survival-times",
    conceptId: "classification-vs-regression",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Survival analysis predicts 'time until an event' but must handle cases where the event has not happened yet by the end of data collection (censoring). Explain why treating this purely as ordinary regression on observed times would be wrong.",
    rubric: {
      elements: [
        { id: "censored-times-are-lower-bounds", description: "For a subject who has not yet experienced the event, the observed time is only a lower bound on the true time, not the true time itself.", weight: 3, required: true },
        { id: "ordinary-regression-mishandles", description: "Treating a censored observation as if it were the exact target systematically underestimates true survival times, biasing the model toward predicting events too early.", weight: 3, required: true },
        { id: "needs-specialised-method", description: "Notes survival analysis needs methods built to use censored information correctly (e.g. Kaplan-Meier, Cox regression) rather than plain regression.", weight: 2 },
      ],
    },
    difficulty: 1.6,
    discrimination: 1.4,
    expectedSeconds: 150,
    prereqClosure: ["classification-vs-regression"],
    source: ML_01,
    status: "live",
  },
  {
    id: "classification-vs-regression--transfer-ordinal-regression-middle-ground",
    conceptId: "classification-vs-regression",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Ordinal regression sits between classification and regression. Explain what it borrows from each, and give a concrete target where using either pure classification or pure regression alone would be a clear mistake.",
    rubric: {
      elements: [
        { id: "borrows-from-classification", description: "Like classification, the outcomes are a finite set of discrete categories.", weight: 2, required: true },
        { id: "borrows-from-regression", description: "Like regression, the categories have a meaningful order the model should respect, so a prediction two levels off should be penalised more than one level off.", weight: 3, required: true },
        { id: "concrete-target", description: "Gives a concrete example, such as a 1-to-5 satisfaction rating, where pure classification would ignore the ordering and pure regression would wrongly assume equal, fractional-meaningful gaps between levels.", weight: 3, required: true },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.4,
    expectedSeconds: 160,
    prereqClosure: ["classification-vs-regression"],
    source: ML_01,
    status: "live",
  },

  // --- Curse of Dimensionality (new) ----------------------------------------
  {
    id: "curse-of-dimensionality--recall-sphere-to-cube-ratio",
    conceptId: "curse-of-dimensionality",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "As dimensionality grows, the ratio of a hypersphere's volume to its enclosing hypercube's volume:",
    choices: [
      { id: "a", text: "Shrinks toward zero", correct: true },
      {
        id: "b",
        text: "Grows toward one",
        correct: false,
        misconception: {
          id: "sphere-cube-ratio-grows",
          description: "Reverses the actual behaviour: in high dimensions almost all of the cube's volume sits in its corners, outside the inscribed sphere.",
          blameConceptId: "curse-of-dimensionality",
        },
      },
      {
        id: "c",
        text: "Stays constant regardless of dimension",
        correct: false,
        misconception: {
          id: "sphere-cube-ratio-constant",
          description: "The ratio changes sharply with dimension; it is only constant in the trivial one-dimensional case.",
          blameConceptId: "curse-of-dimensionality",
        },
      },
      {
        id: "d",
        text: "Oscillates unpredictably with dimension",
        correct: false,
        misconception: {
          id: "sphere-cube-ratio-oscillates",
          description: "The ratio decreases monotonically and predictably with dimension, not erratically.",
          blameConceptId: "curse-of-dimensionality",
        },
      },
    ],
    difficulty: -2.1,
    discrimination: 1.0,
    expectedSeconds: 35,
    prereqClosure: ["curse-of-dimensionality"],
    source: ML_01,
    status: "live",
  },
  {
    id: "curse-of-dimensionality--recall-sample-blowup-new-numbers",
    conceptId: "curse-of-dimensionality",
    format: "numeric",
    cognitive: "recall",
    channels: ["typed", "handwritten"],
    stem: "1,000 points cover a 1-dimensional range at some density. To hold that density in 4 dimensions you need 1,000⁴ points. Give the exponent k in 10^k.",
    answerKey: 12,
    tolerance: 0.001,
    difficulty: -1.7,
    discrimination: 1.1,
    expectedSeconds: 50,
    prereqClosure: ["curse-of-dimensionality"],
    source: ML_01,
    status: "live",
  },
  {
    id: "curse-of-dimensionality--apply-neighbourhood-side-length-new-numbers",
    conceptId: "curse-of-dimensionality",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "To capture a fraction r of the data in a d-dimensional unit cube, a cubic neighbourhood must have side r^(1/d). With r = 0.05 and d = 50, what side length is needed? Give three decimal places.",
    answerKey: 0.942,
    tolerance: 0.005,
    difficulty: 0.15,
    discrimination: 1.4,
    expectedSeconds: 110,
    prereqClosure: ["curse-of-dimensionality"],
    source: ML_01,
    status: "live",
  },
  {
    id: "curse-of-dimensionality--apply-mitigation-strategies",
    conceptId: "curse-of-dimensionality",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "A model uses 500 raw sensor features, most of which are near-constant noise. Propose two concrete strategies to fight the curse of dimensionality here without collecting more data.",
    rubric: {
      elements: [
        { id: "feature-selection-or-reduction", description: "Names a concrete strategy — feature selection to drop uninformative sensors, or dimensionality reduction (e.g. PCA) to project onto a lower-dimensional representation.", weight: 3, required: true },
        { id: "second-strategy", description: "Names a second, distinct strategy — e.g. a sparsity-inducing regulariser (L1) that lets the model itself ignore uninformative features.", weight: 3, required: true },
      ],
    },
    difficulty: 0.45,
    discrimination: 1.3,
    expectedSeconds: 130,
    prereqClosure: ["curse-of-dimensionality"],
    source: ML_01,
    status: "live",
  },
  {
    id: "curse-of-dimensionality--explain-regularization-as-remedy",
    conceptId: "curse-of-dimensionality",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Explain why a regularisation penalty (like an L2 penalty on the weights) can be understood as a partial remedy for the curse of dimensionality, in terms of the model's effective complexity.",
    rubric: {
      elements: [
        { id: "shrinks-effective-freedom", description: "Penalising large weights shrinks the model's effective degrees of freedom below its nominal parameter count, since many weights are pulled toward zero rather than freely fit.", weight: 3, required: true },
        { id: "fewer-effective-dims-need-less-data", description: "A model with fewer effective dimensions needs proportionally less data to fit reliably, which directly counters the sample requirement the curse imposes on the nominal dimensionality.", weight: 3, required: true },
      ],
    },
    difficulty: 0.85,
    discrimination: 1.4,
    expectedSeconds: 140,
    prereqClosure: ["curse-of-dimensionality"],
    source: ML_01,
    status: "live",
  },
  {
    id: "curse-of-dimensionality--explain-full-ambient-dimension-data",
    conceptId: "curse-of-dimensionality",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "PCA and similar methods assume a dataset's intrinsic dimension is much lower than its ambient dimension. Explain what would go wrong if a dataset genuinely used all of its ambient dimensions.",
    rubric: {
      elements: [
        { id: "no-lower-dimensional-surface", description: "There would be no lower-dimensional structure to project onto — every dimension would carry independent, necessary information.", weight: 3, required: true },
        { id: "reduction-loses-information", description: "Any dimensionality reduction would then genuinely discard real signal rather than removing redundancy, and the full curse-of-dimensionality sample requirement would apply at face value with no shortcut available.", weight: 3, required: true },
      ],
    },
    difficulty: 1.05,
    discrimination: 1.4,
    expectedSeconds: 140,
    prereqClosure: ["curse-of-dimensionality"],
    source: ML_01,
    status: "live",
  },
  {
    id: "curse-of-dimensionality--transfer-deep-nets-generalise-anyway",
    conceptId: "curse-of-dimensionality",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Deep neural networks routinely have millions of parameters and inputs with thousands of dimensions, yet often generalise well with datasets far smaller than the curse of dimensionality would seem to demand. Give one structural reason (not just 'more data') why this can work.",
    rubric: {
      elements: [
        { id: "low-effective-dimension-of-real-data", description: "Real data such as images occupies a much lower-dimensional manifold within the huge ambient pixel space, so the effective dimensionality the network actually needs to model is far smaller than the nominal input size.", weight: 4, required: true },
        { id: "architecture-encodes-structure", description: "Architectural choices (e.g. convolution's weight sharing and locality) build in assumptions about that structure, effectively cutting the number of independent parameters that must be learned from scratch.", weight: 3, required: true },
      ],
    },
    difficulty: 1.7,
    discrimination: 1.4,
    expectedSeconds: 150,
    prereqClosure: ["curse-of-dimensionality"],
    source: ML_01,
    status: "live",
  },
  {
    id: "curse-of-dimensionality--transfer-embedding-dimension-paradox",
    conceptId: "curse-of-dimensionality",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A recommendation system represents each user as a vector in a 1,000-dimensional embedding space, fit from only a few thousand users. Explain the specific curse-of-dimensionality risk here, and how a much lower embedding dimension can paradoxically produce better recommendations.",
    rubric: {
      elements: [
        { id: "too-few-users-per-dimension", description: "With only a few thousand users spread across 1,000 dimensions, the embedding space is extremely sparse relative to its size, so distances between user vectors become unreliable and the model overfits idiosyncrasies of individual users.", weight: 4, required: true },
        { id: "lower-dimension-forces-generalisable-structure", description: "A much lower embedding dimension forces the model to represent users through shared, generalisable factors rather than memorising each user individually, which — despite discarding raw capacity — improves recommendations by better matching the amount of available data.", weight: 4, required: true },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.4,
    expectedSeconds: 160,
    prereqClosure: ["curse-of-dimensionality"],
    source: ML_01,
    status: "live",
  },

  // --- Training vs Validation vs Test Set (new) -----------------------------
  {
    id: "training-validation-test-set--recall-why-training-accuracy-misleads",
    conceptId: "training-validation-test-set",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "The most basic reason a model's training accuracy is a poor estimate of its real-world accuracy is:",
    choices: [
      { id: "a", text: "The model was fit specifically to minimise error on that exact data, so it looks better there than on unseen data", correct: true },
      {
        id: "b",
        text: "Training data is always smaller than test data",
        correct: false,
        misconception: {
          id: "training-set-always-smaller",
          description: "Training sets are typically the largest split, not the smallest — size is not the reason training accuracy is optimistic.",
          blameConceptId: "training-validation-test-set",
        },
      },
      {
        id: "c",
        text: "Training accuracy is computed with a different formula than test accuracy",
        correct: false,
        misconception: {
          id: "different-formula-for-train-accuracy",
          description: "The same accuracy formula is used on both; the bias comes from what data the model was fit to, not from a different calculation.",
          blameConceptId: "training-validation-test-set",
        },
      },
      {
        id: "d",
        text: "Training and test data are always drawn from different distributions",
        correct: false,
        misconception: {
          id: "train-test-always-different-distribution",
          description: "A random split usually keeps both from the same distribution; the optimism in training accuracy comes from the fitting process itself, not from a distribution mismatch.",
          blameConceptId: "training-validation-test-set",
        },
      },
    ],
    difficulty: -1.9,
    discrimination: 1.1,
    expectedSeconds: 35,
    prereqClosure: ["training-validation-test-set"],
    source: ML_01,
    status: "live",
  },
  {
    id: "training-validation-test-set--recall-why-k-fold",
    conceptId: "training-validation-test-set",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "K-fold cross-validation is used in place of a single validation split primarily in order to:",
    choices: [
      { id: "a", text: "Get a more stable performance estimate by averaging over multiple splits, especially useful with limited data", correct: true },
      {
        id: "b",
        text: "Eliminate the need for a separate test set entirely",
        correct: false,
        misconception: {
          id: "cross-validation-replaces-test-set",
          description: "Cross-validation is still used for model selection and tuning; a genuinely untouched test set is still needed for a final, unbiased estimate.",
          blameConceptId: "training-validation-test-set",
        },
      },
      {
        id: "c",
        text: "Guarantee the model cannot overfit",
        correct: false,
        misconception: {
          id: "cross-validation-prevents-overfitting",
          description: "Cross-validation measures generalisation more reliably; it does not prevent the model from overfitting during training.",
          blameConceptId: "training-validation-test-set",
        },
      },
      {
        id: "d",
        text: "Make validation computationally faster than a single split",
        correct: false,
        misconception: {
          id: "cross-validation-is-faster",
          description: "K-fold cross-validation is slower than a single split, since it fits the model K times instead of once — its benefit is a more stable estimate, not speed.",
          blameConceptId: "training-validation-test-set",
        },
      },
    ],
    difficulty: -1.5,
    discrimination: 1.1,
    expectedSeconds: 40,
    prereqClosure: ["training-validation-test-set"],
    source: ML_01,
    status: "live",
  },
  {
    id: "training-validation-test-set--apply-small-dataset-split-risk",
    conceptId: "training-validation-test-set",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "A dataset has 200 examples total. Explain why a single 70/15/15 split here is riskier than it would be with 200,000 examples, and what is typically done instead at this small scale.",
    rubric: {
      elements: [
        { id: "small-splits-are-noisy", description: "With only about 30 examples in each of validation and test, a single split's estimate is highly sensitive to which particular examples happened to land where — a very noisy estimate.", weight: 3, required: true },
        { id: "cross-validation-instead", description: "Cross-validation is typically used instead, averaging performance over multiple different splits to get a more stable estimate from the same limited data.", weight: 3, required: true },
      ],
    },
    difficulty: 0.1,
    discrimination: 1.3,
    expectedSeconds: 110,
    prereqClosure: ["training-validation-test-set"],
    source: ML_01,
    status: "live",
  },
  {
    id: "training-validation-test-set--apply-cv-score-reported-as-final",
    conceptId: "training-validation-test-set",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "A team tunes hyperparameters using 5-fold cross-validation, then reports the average cross-validation score as their final number, with no separate test set. Identify the problem.",
    rubric: {
      elements: [
        { id: "cv-score-was-used-for-selection", description: "The cross-validation score was itself used to choose which hyperparameters to keep, so it is a selected, optimistic number rather than an unbiased estimate of the chosen model's true performance.", weight: 4, required: true },
        { id: "needs-untouched-test-set", description: "An untouched test set, never consulted during tuning, is needed to report an honest final performance figure.", weight: 3, required: true },
      ],
    },
    difficulty: 0.4,
    discrimination: 1.4,
    expectedSeconds: 130,
    prereqClosure: ["training-validation-test-set"],
    source: ML_01,
    status: "live",
  },
  {
    id: "training-validation-test-set--explain-nested-cv",
    conceptId: "training-validation-test-set",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Explain why nested cross-validation exists — what does an ordinary single level of cross-validation still leak, when it is also used for hyperparameter tuning?",
    rubric: {
      elements: [
        { id: "single-level-tunes-and-reports-on-same-folds", description: "In a single level of cross-validation, the same folds used to pick the best hyperparameters are also the ones the reported score comes from, so the score is optimistically biased toward whichever configuration got lucky on those folds.", weight: 4, required: true },
        { id: "nested-separates-selection-from-estimate", description: "Nested cross-validation uses an inner loop purely for hyperparameter selection and an outer loop, never used for selection, purely to estimate performance, cleanly separating the two roles.", weight: 3, required: true },
      ],
    },
    difficulty: 0.85,
    discrimination: 1.5,
    expectedSeconds: 150,
    prereqClosure: ["training-validation-test-set"],
    source: ML_01,
    status: "live",
  },
  {
    id: "training-validation-test-set--explain-time-ordered-splits",
    conceptId: "training-validation-test-set",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Explain why time-ordered data (e.g. stock prices) requires the validation and test sets to come strictly after the training set in time, rather than being randomly interspersed.",
    rubric: {
      elements: [
        { id: "future-data-would-leak", description: "A random split would let information from later time points (and the trends they reveal) leak into training, letting the model implicitly 'see the future' relative to the cases it is tested on.", weight: 4, required: true },
        { id: "deployment-only-sees-past", description: "In real deployment the model only ever has access to data up to the current moment, so evaluation must mimic that by testing strictly on data that came after everything the model trained on.", weight: 3, required: true },
      ],
    },
    difficulty: 1.15,
    discrimination: 1.4,
    expectedSeconds: 140,
    prereqClosure: ["training-validation-test-set"],
    source: ML_01,
    status: "live",
  },
  {
    id: "training-validation-test-set--transfer-federated-learning-split",
    conceptId: "training-validation-test-set",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "In federated learning, training data lives on many different users' devices and cannot be centrally pooled to create a random split. Explain what specifically breaks about the usual train/validation/test recipe here, and how it must be adapted.",
    rubric: {
      elements: [
        { id: "no-central-shuffle", description: "There is no single pool of examples to shuffle and randomly partition, since the data never leaves each device, so the ordinary global random split is impossible to construct directly.", weight: 3, required: true },
        { id: "adaptation", description: "The split is instead typically done at the device (or user) level — some entire devices held out for validation and test — and evaluation is often computed locally on each device and aggregated, rather than pooled into a single dataset.", weight: 3, required: true },
      ],
    },
    difficulty: 1.7,
    discrimination: 1.4,
    expectedSeconds: 150,
    prereqClosure: ["training-validation-test-set"],
    source: ML_01,
    status: "live",
  },
  {
    id: "training-validation-test-set--transfer-repeated-ab-tests-winners-curse",
    conceptId: "training-validation-test-set",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A/B testing in production is, in effect, a live test set used repeatedly to decide which model variant wins. Explain why the 'winner's curse' from repeated model selection on validation data also applies to a sequence of A/B tests, and what practice mitigates it.",
    rubric: {
      elements: [
        { id: "same-selection-mechanism", description: "Running many A/B tests and rolling out whichever variant happened to win is the same kind of selection-on-noisy-outcomes process that inflates a chosen model's apparent validation score.", weight: 3, required: true },
        { id: "winning-variant-partly-lucky", description: "The winning variant's measured lift partly reflects favourable noise in that particular experiment, so its true long-run effect is typically smaller than what the winning test reported.", weight: 3, required: true },
        { id: "mitigation", description: "Recommends confirming a winner with a fresh, independent holdout test (or correcting for selection statistically) before trusting the originally observed effect size.", weight: 2 },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.4,
    expectedSeconds: 160,
    prereqClosure: ["training-validation-test-set"],
    source: ML_01,
    status: "live",
  },

  // --- Data Leakage (new) ----------------------------------------------------
  {
    id: "data-leakage--recall-target-leakage",
    conceptId: "data-leakage",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Target leakage occurs when a feature is:",
    choices: [
      { id: "a", text: "A proxy for, or derived from, the very outcome being predicted", correct: true },
      {
        id: "b",
        text: "Measured with some random noise",
        correct: false,
        misconception: {
          id: "noisy-feature-called-leakage",
          description: "Ordinary measurement noise makes a feature less informative; it does not make it a proxy for the outcome, which is what defines leakage.",
          blameConceptId: "data-leakage",
        },
      },
      {
        id: "c",
        text: "Correlated with the outcome for reasons unrelated to any causal or temporal shortcut",
        correct: false,
        misconception: {
          id: "legitimate-correlation-called-leakage",
          description: "A feature that is genuinely predictive for legitimate reasons, and available at prediction time, is not leakage — it is exactly the kind of signal a model should use.",
          blameConceptId: "data-leakage",
        },
      },
      {
        id: "d",
        text: "Missing for some rows",
        correct: false,
        misconception: {
          id: "missingness-called-leakage",
          description: "Missing values are a data-quality issue to be handled (e.g. by imputation); missingness by itself has nothing to do with information flow from the outcome.",
          blameConceptId: "data-leakage",
        },
      },
    ],
    difficulty: -1.8,
    discrimination: 1.1,
    expectedSeconds: 35,
    prereqClosure: ["data-leakage"],
    source: ML_01,
    status: "live",
  },
  {
    id: "data-leakage--recall-group-leakage",
    conceptId: "data-leakage",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Group leakage occurs when:",
    choices: [
      { id: "a", text: "Related records (e.g. from the same patient or customer) end up split across both the training and test sets", correct: true },
      {
        id: "b",
        text: "Two unrelated features happen to be correlated",
        correct: false,
        misconception: {
          id: "feature-correlation-called-group-leakage",
          description: "Correlation between features is an ordinary modelling fact; group leakage is specifically about related records straddling the train/test split.",
          blameConceptId: "data-leakage",
        },
      },
      {
        id: "c",
        text: "The test set is too small to be reliable",
        correct: false,
        misconception: {
          id: "small-test-set-called-group-leakage",
          description: "A small test set is a statistical power problem, not an information-flow problem between related records.",
          blameConceptId: "data-leakage",
        },
      },
      {
        id: "d",
        text: "The model has too many parameters for the sample size",
        correct: false,
        misconception: {
          id: "overfitting-called-group-leakage",
          description: "That describes overfitting from excess model flexibility, a different mechanism from related records leaking across a split.",
          blameConceptId: "data-leakage",
        },
      },
    ],
    difficulty: -1.4,
    discrimination: 1.2,
    expectedSeconds: 35,
    prereqClosure: ["data-leakage"],
    source: ML_01,
    status: "live",
  },
  {
    id: "data-leakage--apply-multiple-images-per-patient",
    conceptId: "data-leakage",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "A medical imaging model splits images randomly into train/test, but each patient contributed multiple images. Explain the specific leak, and how the split should instead be done.",
    rubric: {
      elements: [
        { id: "patient-specific-cues", description: "Images from the same patient share patient-specific cues (anatomy, imaging artefacts) that let the model partly recognise the patient rather than genuinely diagnose the condition — a random image-level split lets those cues appear on both sides.", weight: 4, required: true },
        { id: "split-by-patient", description: "The split should be done by patient (grouped), keeping every image from a given patient entirely within one of train, validation, or test.", weight: 3, required: true },
      ],
    },
    difficulty: 0.0,
    discrimination: 1.4,
    expectedSeconds: 130,
    prereqClosure: ["data-leakage", "training-validation-test-set"],
    source: ML_01,
    status: "live",
  },
  {
    id: "data-leakage--apply-duplicate-sentences-across-pairs",
    conceptId: "data-leakage",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "A near-duplicate-sentence detector is evaluated on test pairs where many of the individual sentences also appear, verbatim, in training pairs (just paired with a different partner sentence). Identify the leak.",
    rubric: {
      elements: [
        { id: "shared-sentences-not-shared-pairs", description: "Although the exact test pairs are new, the model has already seen many of the individual sentences during training and may have memorised representations of them specifically, rather than learning a general notion of similarity.", weight: 4, required: true },
        { id: "consequence", description: "Test performance is inflated relative to how the model would do on genuinely unseen sentences it has never encountered in any pairing.", weight: 3, required: true },
      ],
    },
    difficulty: 0.35,
    discrimination: 1.4,
    expectedSeconds: 130,
    prereqClosure: ["data-leakage", "training-validation-test-set"],
    source: ML_01,
    status: "live",
  },
  {
    id: "data-leakage--explain-invisible-from-accuracy-alone",
    conceptId: "data-leakage",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Explain why leakage is often invisible from the model's own accuracy number alone, and what kind of check does reveal it.",
    rubric: {
      elements: [
        { id: "accuracy-cannot-distinguish-cause", description: "A high accuracy number looks the same whether it reflects genuine learning or an inflated result from leaked information — the metric itself carries no signature of which caused it.", weight: 3, required: true },
        { id: "checks-that-reveal-it", description: "What reveals leakage is inspecting the pipeline directly — auditing when each feature's value is actually recorded relative to the outcome, checking the split respects groups and time, and investigating implausibly high or implausibly important features.", weight: 3, required: true },
      ],
    },
    difficulty: 0.8,
    discrimination: 1.5,
    expectedSeconds: 140,
    prereqClosure: ["data-leakage"],
    source: ML_01,
    status: "live",
  },
  {
    id: "data-leakage--explain-recurring-leakage-in-production",
    conceptId: "data-leakage",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Explain why time-based leakage ('using the future to predict the past') is especially dangerous in production systems that retrain regularly, compared to a one-off leaked feature caught in an initial audit.",
    rubric: {
      elements: [
        { id: "silently-reintroduced-each-retrain", description: "If the leak is baked into a pipeline's feature definitions rather than a one-time modelling mistake, every automatic retraining reintroduces the same leak without anyone deliberately choosing to.", weight: 3, required: true },
        { id: "compounds-undetected", description: "Because each retrained model still looks great on its own (leaked) validation numbers, the problem can persist for a long time before anyone notices the gap between reported and real-world performance.", weight: 3, required: true },
      ],
    },
    difficulty: 1.0,
    discrimination: 1.4,
    expectedSeconds: 140,
    prereqClosure: ["data-leakage"],
    source: ML_01,
    status: "live",
  },
  {
    id: "data-leakage--transfer-benchmark-duplicates-discovered-late",
    conceptId: "data-leakage",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A widely used image-classification benchmark is later found to have near-duplicate images across its train and test splits. Explain what this means for the years of published results built on it, and why detecting this late is especially costly.",
    rubric: {
      elements: [
        { id: "reported-numbers-inflated", description: "Every reported test accuracy on the benchmark is inflated to some degree by memorisation of the duplicated images, so absolute performance numbers across the field's history are systematically optimistic.", weight: 3, required: true },
        { id: "relative-comparisons-may-survive", description: "Comparisons between methods evaluated on the same flawed benchmark may still be roughly valid if the duplication affects all methods similarly, but this cannot be assumed without checking.", weight: 3, required: true },
        { id: "costly-to-fix-late", description: "Fixing it requires re-evaluating a large body of prior work on a corrected split, which is expensive and may never be done exhaustively — so the field can carry a known-wrong number for years.", weight: 2 },
      ],
    },
    difficulty: 1.6,
    discrimination: 1.5,
    expectedSeconds: 160,
    prereqClosure: ["data-leakage", "training-validation-test-set"],
    source: ML_01,
    status: "live",
  },
  {
    id: "data-leakage--transfer-labels-themselves-contaminated",
    conceptId: "data-leakage",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A hiring model backtests excellently on historical hire/no-hire decisions, but auditors find the historical labels were themselves partly produced by human reviewers who had already seen leaked identifiers (e.g. university prestige signals) not meant to influence the decision. Explain why a good backtest score is not sufficient evidence the model is safe to deploy here, and how this differs from ordinary feature-level leakage.",
    rubric: {
      elements: [
        { id: "labels-encode-the-bias-not-just-features", description: "Here the ground-truth labels themselves already reflect the biased signal, so no amount of correctly handling the input features fixes the problem — the model faithfully learns to reproduce exactly the bias baked into what it was told is 'correct'.", weight: 4, required: true },
        { id: "differs-from-feature-leakage", description: "Ordinary feature leakage inflates a metric by letting the model see something it shouldn't at prediction time; this is a different failure where the target itself is the corrupted quantity, so no split or feature audit alone can detect or fix it.", weight: 4, required: true },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.5,
    expectedSeconds: 170,
    prereqClosure: ["data-leakage"],
    source: ML_01,
    status: "live",
  },
];
