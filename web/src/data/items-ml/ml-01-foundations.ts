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

];
