import type { Item } from "../../lib/assessment/types";
import { AUTHORED, CASELLA_BERGER_REG, ESL, ISLR, NIST_HANDBOOK, OCW_18_06, OCW_18_650 } from "./sources";

/**
 * REG-1 — Regression, Regress to the Mean, Linear Regression Terminology,
 * Simple Linear Regression, Ordinary Least Squares, Normal Equations.
 *
 * Authored from `assessments/reg-01-foundations.md`, which carries the design
 * rationale and the cluster misconception index. Eight items per concept — two
 * at each cognitive level — so every pool clears the MIN_LIVE_ITEMS = 8 bar the
 * coverage audit enforces.
 *
 * Two constraints shaped every item below. `prereqClosure` may only name the
 * concept and its ancestors, so an item for `regression` (a graph root) cannot
 * touch covariance at all, while `normal-equations` may reach into matrix
 * multiplication. And every numeric `answerKey` was recomputed by script rather
 * than carried over from the markdown bank.
 */
export const regressionFoundationsItems: Item[] = [
  // --- Regression -----------------------------------------------------------
  {
    id: "regression--recall-definition",
    conceptId: "regression",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What does a regression model estimate?",
    choices: [
      {
        id: "a",
        text: "How the average value of an outcome changes as the predictors change",
        correct: true,
      },
      {
        id: "b",
        text: "Groups of similar observations, discovered without any labelled outcome",
        correct: false,
        misconception: {
          id: "regression-as-unsupervised",
          description:
            "Confuses regression with clustering. Regression needs an observed outcome to fit against; clustering has none.",
          blameConceptId: "regression",
        },
      },
      {
        id: "c",
        text: "Whether two variables are statistically independent",
        correct: false,
        misconception: {
          id: "regression-as-independence-test",
          description:
            "Treats regression as a hypothesis test about independence rather than a model of a conditional mean.",
          blameConceptId: "regression",
        },
      },
      {
        id: "d",
        text: "The distribution of a single variable, with no predictors involved",
        correct: false,
        misconception: {
          id: "regression-without-predictors",
          description:
            "Drops the predictors, which is what makes regression conditional rather than marginal.",
          blameConceptId: "regression",
        },
      },
    ],
    difficulty: -1.5,
    discrimination: 1.1,
    expectedSeconds: 30,
    prereqClosure: ["regression"],
    source: ISLR,
    status: "live",
  },
  {
    id: "regression--recall-supervised-continuous",
    conceptId: "regression",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which statements about regression are true? Select all that apply.",
    choices: [
      { id: "a", text: "It requires an observed outcome variable in the training data", correct: true },
      { id: "b", text: "It models the outcome as a function of one or more predictors", correct: true },
      { id: "c", text: "It can be used for prediction or for explanation", correct: true },
      {
        id: "d",
        text: "A fitted coefficient is by itself evidence of a causal effect",
        correct: false,
        misconception: {
          id: "coefficient-implies-cause",
          description:
            "Reads an association produced by the fitting procedure as a causal effect. Nothing in the arithmetic distinguishes the two.",
          blameConceptId: "regression",
        },
      },
      {
        id: "e",
        text: "It can only be applied when the outcome is measured on a continuous scale",
        correct: false,
        misconception: {
          id: "regression-continuous-only",
          description:
            "Overstates the restriction: the same framework handles binary and count outcomes by changing the link function.",
          blameConceptId: "regression",
        },
      },
    ],
    difficulty: -1.2,
    discrimination: 1.2,
    expectedSeconds: 50,
    prereqClosure: ["regression"],
    source: ISLR,
    status: "live",
  },
  {
    id: "regression--apply-classify-problems",
    conceptId: "regression",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem:
      "Which of these is a regression problem? (a) predicting a house's sale price from its square footage; " +
      "(b) grouping customers into segments with no outcome variable recorded; " +
      "(c) deciding which of five product categories an item belongs to.",
    choices: [
      { id: "a", text: "(a) only", correct: true },
      {
        id: "b",
        text: "(a) and (b)",
        correct: false,
        misconception: {
          id: "clustering-counted-as-regression",
          description:
            "Counts an unsupervised task as regression. With no outcome recorded there is nothing to regress on anything.",
          blameConceptId: "regression",
        },
      },
      {
        id: "c",
        text: "(a) and (c)",
        correct: false,
        misconception: {
          id: "classification-counted-as-regression",
          description:
            "Counts an unordered multi-category outcome as a regression problem. It is supervised, but it is classification.",
          blameConceptId: "regression",
        },
      },
      {
        id: "d",
        text: "All three",
        correct: false,
        misconception: {
          id: "everything-is-regression",
          description: "Does not separate supervised from unsupervised, or continuous outcomes from categorical ones.",
          blameConceptId: "regression",
        },
      },
    ],
    difficulty: -0.75,
    discrimination: 1.3,
    expectedSeconds: 45,
    prereqClosure: ["regression"],
    source: ISLR,
    status: "live",
  },
  {
    id: "regression--apply-name-response-and-predictor",
    conceptId: "regression",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem:
      "A hospital wants to predict a patient's length of stay from their age, diagnosis, and the number of " +
      "prior admissions. Say which quantity is the response and which are the predictors, and say what the " +
      "fitted model estimates about length of stay.",
    rubric: {
      elements: [
        {
          id: "identifies-roles",
          description:
            "Names length of stay as the response and age, diagnosis and prior admissions as the predictors.",
          weight: 2,
          required: true,
          misconception: {
            id: "reverses-response-and-predictor",
            description:
              "Puts a predictor on the left-hand side. The response is the quantity being explained, not one of the inputs.",
            blameConceptId: "regression",
          },
        },
        {
          id: "conditional-mean",
          description:
            "States that the model estimates the average (expected) length of stay for patients with given predictor values — not a single patient's exact stay.",
          weight: 2,
          required: true,
        },
        {
          id: "uncertainty-remains",
          description:
            "Notes that individual patients vary around that average, so the model describes a centre rather than a certainty.",
          weight: 1,
        },
      ],
    },
    difficulty: -0.4,
    discrimination: 1.3,
    expectedSeconds: 90,
    prereqClosure: ["regression"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "regression--explain-prediction-vs-explanation",
    conceptId: "regression",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Regression is used both to predict and to explain. Describe how these two goals differ, and give one " +
      "concrete way they can pull a modeller in opposite directions.",
    rubric: {
      elements: [
        {
          id: "states-both-goals",
          description:
            "Prediction asks what the outcome will be for a new case; explanation asks how a particular predictor relates to the outcome.",
          weight: 2,
          required: true,
        },
        {
          id: "names-a-tension",
          description:
            "Gives a concrete conflict — e.g. a complex model that predicts better but has uninterpretable coefficients, or a predictor that improves accuracy while corrupting the coefficient of interest.",
          weight: 3,
          required: true,
          misconception: {
            id: "goals-treated-as-identical",
            description:
              "Treats a well-predicting model as automatically a well-explaining one, so no tension is possible.",
            blameConceptId: "regression",
          },
        },
        {
          id: "different-success-criteria",
          description:
            "Notes that the two goals are judged differently — held-out error versus unbiasedness and interval coverage.",
          weight: 1,
        },
      ],
    },
    difficulty: 0.0,
    discrimination: 1.5,
    expectedSeconds: 150,
    prereqClosure: ["regression"],
    source: ESL,
    status: "live",
  },
  {
    id: "regression--explain-signal-plus-noise",
    conceptId: "regression",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "A regression is often written Y = μ(X) + ε with E[ε | X] = 0. Explain why that mean-zero condition is " +
      "close to a definition rather than a substantive assumption, and say where the real assumptions enter.",
    rubric: {
      elements: [
        {
          id: "definitional-character",
          description:
            "Explains that whatever part of Y is predictable from X has been placed inside μ(X), so by construction nothing predictable is left in ε.",
          weight: 3,
          required: true,
          misconception: {
            id: "mean-zero-as-strong-assumption",
            description:
              "Treats E[ε | X] = 0 as an empirical claim about the errors rather than a consequence of defining μ(X) as the conditional mean.",
            blameConceptId: "regression",
          },
        },
        {
          id: "where-assumptions-enter",
          description:
            "Identifies the real commitments: restricting μ to a particular family (such as linear in the coefficients), and any claim about the variance or distribution of ε.",
          weight: 3,
          required: true,
        },
        {
          id: "misspecification-consequence",
          description:
            "Notes that if the assumed family is wrong, the fitted errors do carry structure — which is what residual plots are checking for.",
          weight: 1,
        },
      ],
    },
    difficulty: 0.3,
    discrimination: 1.5,
    expectedSeconds: 180,
    prereqClosure: ["regression"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "regression--transfer-galton-origin",
    conceptId: "regression",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "The word 'regression' names a broad class of models today, but it started as the name of a specific " +
      "empirical finding. Explain the original meaning and how the modern usage grew out of it.",
    rubric: {
      elements: [
        {
          id: "galton-observation",
          description:
            "Identifies Galton's finding that the children of unusually tall parents were, on average, closer to the population mean — 'regression toward mediocrity'.",
          weight: 3,
          required: true,
        },
        {
          id: "generalisation",
          description:
            "Explains that the line fitted to that data took the phenomenon's name, and the name was then generalised to any model of a conditional mean, whether or not anything regresses.",
          weight: 3,
          required: true,
          misconception: {
            id: "name-assumed-descriptive",
            description:
              "Assumes the word still describes what the method does, rather than being a historical artefact of one 1880s finding.",
            blameConceptId: "regression",
          },
        },
      ],
    },
    difficulty: 0.5,
    discrimination: 1.4,
    expectedSeconds: 150,
    prereqClosure: ["regression"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "regression--transfer-family-and-scoring",
    conceptId: "regression",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Every regression method makes two choices: which shapes are allowed for the conditional mean, and what " +
      "counts as a good fit. Use those two axes to say how a method that penalises large coefficients differs " +
      "from ordinary least squares, and how a method for a binary outcome differs from both.",
    rubric: {
      elements: [
        {
          id: "penalty-changes-scoring",
          description:
            "Places the penalised method as changing the scoring rule — fit plus a penalty — while keeping the same family of shapes.",
          weight: 3,
          required: true,
          misconception: {
            id: "penalty-mistaken-for-new-family",
            description:
              "Thinks a penalty changes what shapes the model can produce, rather than which of them the scoring rule prefers.",
            blameConceptId: "regression",
          },
        },
        {
          id: "binary-changes-both",
          description:
            "Places the binary-outcome method as changing both axes: the allowed shapes must stay inside [0, 1], and the scoring rule becomes a likelihood rather than squared error.",
          weight: 3,
          required: true,
        },
        {
          id: "framework-value",
          description:
            "Notes that reading a new method by which axis it changed is what keeps a long list of named methods organised.",
          weight: 1,
        },
      ],
    },
    difficulty: 0.9,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["regression"],
    source: AUTHORED,
    status: "live",
  },

  // --- Regress to the Mean --------------------------------------------------
  {
    id: "regress-to-the-mean--recall-definition",
    conceptId: "regress-to-the-mean",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Regression to the mean is the tendency for:",
    choices: [
      {
        id: "a",
        text: "An extreme measurement to be followed by a less extreme one, from random variation alone",
        correct: true,
      },
      {
        id: "b",
        text: "Every measurement to drift toward the mean over time as the underlying quantity changes",
        correct: false,
        misconception: {
          id: "rtm-as-real-change",
          description:
            "Attributes the effect to a change in the underlying quantity. Nothing about the unit changes — only the noise is redrawn.",
          blameConceptId: "regress-to-the-mean",
        },
      },
      {
        id: "c",
        text: "A fitted regression line to pass through the mean of the predictors",
        correct: false,
        misconception: {
          id: "rtm-confused-with-fitted-line",
          description:
            "Confuses the phenomenon with the algebraic fact that the least-squares line passes through the point of means.",
          blameConceptId: "regress-to-the-mean",
        },
      },
      {
        id: "d",
        text: "Sample means to converge to the population mean as the sample grows",
        correct: false,
        misconception: {
          id: "rtm-confused-with-lln",
          description:
            "Confuses it with the law of large numbers, which is about an estimator converging, not about a repeated measurement on the same unit.",
          blameConceptId: "regress-to-the-mean",
        },
      },
    ],
    difficulty: -1.15,
    discrimination: 1.2,
    expectedSeconds: 35,
    prereqClosure: ["regress-to-the-mean", "regression"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "regress-to-the-mean--recall-conditions",
    conceptId: "regress-to-the-mean",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which conditions produce regression to the mean? Select all that apply.",
    choices: [
      { id: "a", text: "The measurement contains a component of chance", correct: true },
      { id: "b", text: "Units are selected on an extreme value of that measurement", correct: true },
      { id: "c", text: "The chance component is redrawn independently at the second measurement", correct: true },
      {
        id: "d",
        text: "Some intervention has been applied between the two measurements",
        correct: false,
        misconception: {
          id: "rtm-requires-intervention",
          description:
            "Believes an intervention is needed. The effect appears with no intervention at all, which is exactly why it fakes one so convincingly.",
          blameConceptId: "regress-to-the-mean",
        },
      },
      {
        id: "e",
        text: "The two measurements are perfectly correlated",
        correct: false,
        misconception: {
          id: "rtm-at-r-equals-one",
          description:
            "Reverses the condition: at r = 1 there is no noise and no regression at all. The effect grows as the correlation falls.",
          blameConceptId: "regress-to-the-mean",
        },
      },
    ],
    difficulty: -0.85,
    discrimination: 1.3,
    expectedSeconds: 55,
    prereqClosure: ["regress-to-the-mean", "regression"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "regress-to-the-mean--apply-standardised-prediction",
    conceptId: "regress-to-the-mean",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "Two administrations of the same test correlate at r = 0.4. A student scores 2.5 standard deviations " +
      "above the mean on the first. In standard-deviation units, what is their expected score on the second? " +
      "Give a decimal to two places.",
    answerKey: 1.0,
    tolerance: 0.01,
    difficulty: -0.35,
    discrimination: 1.4,
    expectedSeconds: 75,
    prereqClosure: ["regress-to-the-mean", "regression"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "regress-to-the-mean--apply-raw-units",
    conceptId: "regress-to-the-mean",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "Repeated blood-pressure readings on the same patients correlate at r = 0.6, and both readings have the " +
      "same standard deviation. A patient reads 30 mmHg above the group mean on the first measurement. By how " +
      "many mmHg above the mean is their second reading expected to be? Give a whole number.",
    answerKey: 18,
    tolerance: 0.5,
    difficulty: -0.1,
    discrimination: 1.4,
    expectedSeconds: 90,
    prereqClosure: ["regress-to-the-mean", "regression"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "regress-to-the-mean--explain-noise-mechanism",
    conceptId: "regress-to-the-mean",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "A baseball player has an exceptional season and then performs closer to his career average the next " +
      "year. Explain precisely why this is expected even if his ability did not change at all.",
    rubric: {
      elements: [
        {
          id: "decomposition",
          description:
            "Decomposes observed performance into a stable ability component plus independent chance.",
          weight: 2,
          required: true,
        },
        {
          id: "selection-on-noise",
          description:
            "Argues that an extreme observed season more likely reflects good ability plus a large favourable chance draw than exceptional ability alone, because merely-good players vastly outnumber exceptional ones.",
          weight: 3,
          required: true,
          misconception: {
            id: "no-noise-argument",
            description:
              "Restates that performance fell without explaining that the first observation was selected partly on luck.",
            blameConceptId: "regress-to-the-mean",
          },
        },
        {
          id: "fresh-noise",
          description:
            "States that the next season draws fresh, independent noise averaging zero, so the favourable draw does not repeat and the observation moves back toward true ability.",
          weight: 3,
          required: true,
        },
      ],
      forbiddenMoves: [
        {
          id: "invokes-fatigue-or-pressure",
          description:
            "Explains the drop by a causal story (fatigue, complacency, opponents adjusting) without noting that no cause is needed.",
          weight: 1,
        },
      ],
    },
    difficulty: 0.35,
    discrimination: 1.6,
    expectedSeconds: 180,
    prereqClosure: ["regress-to-the-mean", "regression"],
    source: OCW_18_650,
    status: "live",
  },
  {
    id: "regress-to-the-mean--explain-reliability-scaling",
    conceptId: "regress-to-the-mean",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Two districts both give extra funding to their lowest-scoring schools. District A's test is highly " +
      "reliable (repeat scores correlate at 0.95); District B's is noisy (correlation 0.35). Which district " +
      "will see the larger apparent improvement, and why?",
    rubric: {
      elements: [
        {
          id: "identifies-b",
          description: "Says District B, the one with the noisier measure, will show the larger apparent gain.",
          weight: 2,
          required: true,
          misconception: {
            id: "reliability-direction-reversed",
            description:
              "Picks the reliable measure, missing that regression to the mean is driven by the noise fraction 1 − r.",
            blameConceptId: "regress-to-the-mean",
          },
        },
        {
          id: "quantifies",
          description:
            "Explains that the expected second score is r times the first in standardised units, so the move back toward the mean is a fraction 1 − r — 0.05 in District A and 0.65 in District B.",
          weight: 3,
          required: true,
        },
        {
          id: "implication",
          description:
            "Draws the uncomfortable conclusion: the least trustworthy measurement manufactures the most impressive-looking programme effect.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.6,
    discrimination: 1.7,
    expectedSeconds: 200,
    prereqClosure: ["regress-to-the-mean", "regression"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "regress-to-the-mean--transfer-flight-instructors",
    conceptId: "regress-to-the-mean",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Flight instructors observed that praised trainees flew worse on their next attempt and criticised " +
      "trainees flew better, and concluded that criticism is more effective than praise. Explain why this " +
      "conclusion does not follow.",
    rubric: {
      elements: [
        {
          id: "both-directions",
          description:
            "Applies the mechanism to both groups: praise followed an unusually good landing (inflated by luck), criticism an unusually bad one (deflated by luck), and both regress toward the trainee's typical performance.",
          weight: 4,
          required: true,
          misconception: {
            id: "feedback-effect-assumed",
            description:
              "Accepts the causal reading, or applies the argument to only one of the two groups.",
            blameConceptId: "regress-to-the-mean",
          },
        },
        {
          id: "mimics-a-real-effect",
          description:
            "States that the two regressions together produce exactly the pattern a real feedback effect would produce, so the data cannot distinguish them.",
          weight: 2,
          required: true,
        },
        {
          id: "what-would-settle-it",
          description:
            "Notes that randomising the feedback among similarly-performing trainees would separate the effect from the artefact.",
          weight: 1,
        },
      ],
    },
    difficulty: 0.85,
    discrimination: 1.8,
    expectedSeconds: 210,
    prereqClosure: ["regress-to-the-mean", "regression"],
    source: OCW_18_650,
    status: "live",
  },
  {
    id: "regress-to-the-mean--transfer-study-design",
    conceptId: "regress-to-the-mean",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A clinic enrols the 10% of patients with the highest cholesterol, gives them a new drug, and reports a " +
      "large average drop after six months. Design a study that would let them separate the drug's effect from " +
      "regression to the mean, and explain why your design works.",
    rubric: {
      elements: [
        {
          id: "control-selected-identically",
          description:
            "Proposes a control group selected by the same extreme-value rule, so both arms regress by the same amount.",
          weight: 3,
          required: true,
          misconception: {
            id: "control-from-general-population",
            description:
              "Uses a control group drawn from the general population, which has no extreme to regress from, so the comparison still confounds the two effects.",
            blameConceptId: "regress-to-the-mean",
          },
        },
        {
          id: "randomise",
          description:
            "Randomises treatment among the eligible high-cholesterol patients, so assignment is independent of the luck in the enrolment measurement.",
          weight: 3,
          required: true,
        },
        {
          id: "difference-cancels",
          description:
            "Explains that the drug's effect is then the difference between arms, in which the shared regression cancels.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.1,
    discrimination: 1.7,
    expectedSeconds: 240,
    prereqClosure: ["regress-to-the-mean", "regression"],
    source: OCW_18_650,
    status: "live",
  },

  // --- Linear Regression Terminology ----------------------------------------
  {
    id: "linear-regression-terminology--recall-parts",
    conceptId: "linear-regression-terminology",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "In the model sales = β₀ + β₁·advertising + ε, which description is correct?",
    choices: [
      {
        id: "a",
        text: "sales is the response, advertising the predictor, β₁ the slope coefficient, and ε the error term",
        correct: true,
      },
      {
        id: "b",
        text: "advertising is the response, since it is the variable the company controls",
        correct: false,
        misconception: {
          id: "response-chosen-by-controllability",
          description:
            "Assigns the response by which variable is manipulable rather than by which is being explained.",
          blameConceptId: "linear-regression-terminology",
        },
      },
      {
        id: "c",
        text: "β₀ is the slope and β₁ the intercept",
        correct: false,
        misconception: {
          id: "intercept-slope-swapped",
          description: "Swaps intercept and slope. β₀ multiplies nothing, so it is the intercept.",
          blameConceptId: "linear-regression-terminology",
        },
      },
      {
        id: "d",
        text: "ε is the residual, computed as the observed minus the fitted value",
        correct: false,
        misconception: {
          id: "error-called-residual",
          description:
            "Conflates the unobservable error (defined with the true β) with the residual (computed from the fitted β̂).",
          blameConceptId: "linear-regression-terminology",
        },
      },
    ],
    difficulty: -1.15,
    discrimination: 1.2,
    expectedSeconds: 40,
    prereqClosure: ["linear-regression-terminology", "regression"],
    source: ISLR,
    status: "live",
  },
  {
    id: "linear-regression-terminology--recall-error-vs-residual",
    conceptId: "linear-regression-terminology",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which statements about residuals (as opposed to errors) are true? Select all that apply.",
    choices: [
      { id: "a", text: "A residual is observed minus fitted, and can be computed once the model is fitted", correct: true },
      { id: "b", text: "The residuals sum to exactly zero when the model includes an intercept", correct: true },
      { id: "c", text: "Residuals are used as stand-ins for the unobservable errors in diagnostics", correct: true },
      {
        id: "d",
        text: "Residuals are mutually independent whenever the errors are",
        correct: false,
        misconception: {
          id: "residuals-assumed-independent",
          description:
            "Misses that fitting imposes p + 1 linear constraints on the residuals, so they are slightly correlated even under independent errors.",
          blameConceptId: "linear-regression-terminology",
        },
      },
      {
        id: "e",
        text: "The residual and the error for observation i are the same quantity",
        correct: false,
        misconception: {
          id: "error-residual-identified",
          description:
            "Identifies the two. The error uses the unknown true β; the residual uses the estimated β̂.",
          blameConceptId: "linear-regression-terminology",
        },
      },
    ],
    difficulty: -0.6,
    discrimination: 1.4,
    expectedSeconds: 60,
    prereqClosure: ["linear-regression-terminology", "regression"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "linear-regression-terminology--apply-compute-residual",
    conceptId: "linear-regression-terminology",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "A fitted model gives Ŷ = 3.5 + 2.0·X. For an observation with X = 4 and an observed Y of 14, what is " +
      "the residual? Give a decimal to one place.",
    answerKey: 2.5,
    tolerance: 0.01,
    difficulty: -0.55,
    discrimination: 1.3,
    expectedSeconds: 60,
    prereqClosure: ["linear-regression-terminology", "regression"],
    source: ISLR,
    status: "live",
  },
  {
    id: "linear-regression-terminology--apply-residual-df",
    conceptId: "linear-regression-terminology",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "A regression is fitted on 50 observations with 4 predictors and an intercept. How many residual degrees " +
      "of freedom does it have? Give a whole number.",
    answerKey: 45,
    tolerance: 0.001,
    difficulty: -0.2,
    discrimination: 1.4,
    expectedSeconds: 60,
    prereqClosure: ["linear-regression-terminology", "regression"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "linear-regression-terminology--explain-independent-variable-misnomer",
    conceptId: "linear-regression-terminology",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Predictors are traditionally called 'independent variables'. Explain why that name is misleading given " +
      "what 'independent' means everywhere else in probability.",
    rubric: {
      elements: [
        {
          id: "names-the-clash",
          description:
            "States that 'independent' here means only 'on the right-hand side', not probabilistically independent of anything.",
          weight: 3,
          required: true,
          misconception: {
            id: "predictors-assumed-independent",
            description:
              "Believes the terminology implies, or requires, that the predictors are statistically independent of each other.",
            blameConceptId: "linear-regression-terminology",
          },
        },
        {
          id: "contradiction-in-practice",
          description:
            "Points out that predictors are usually correlated in practice, a situation important enough to have its own name (multicollinearity) and its own diagnostics.",
          weight: 3,
          required: true,
        },
        {
          id: "safer-vocabulary",
          description: "Recommends 'predictor' and 'response', which are unambiguous.",
          weight: 1,
        },
      ],
    },
    difficulty: 0.35,
    discrimination: 1.5,
    expectedSeconds: 150,
    prereqClosure: ["linear-regression-terminology", "regression"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "linear-regression-terminology--explain-df-correction",
    conceptId: "linear-regression-terminology",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "The estimated error variance divides the sum of squared residuals by n − p − 1 rather than by n. " +
      "Explain what the subtraction is compensating for.",
    rubric: {
      elements: [
        {
          id: "constraints",
          description:
            "Explains that fitting p + 1 coefficients imposes p + 1 linear constraints on the residuals, so they are not n freely varying numbers.",
          weight: 3,
          required: true,
          misconception: {
            id: "df-as-arbitrary-convention",
            description:
              "Treats n − p − 1 as an arbitrary convention or a small-sample fudge rather than a count of free coordinates.",
            blameConceptId: "linear-regression-terminology",
          },
        },
        {
          id: "bias-consequence",
          description:
            "States that dividing by n would systematically underestimate the error variance, because fitting shrinks the residuals mechanically.",
          weight: 3,
          required: true,
        },
        {
          id: "limiting-behaviour",
          description:
            "Notes the correction matters most when p is large relative to n and becomes negligible as n grows.",
          weight: 1,
        },
      ],
    },
    difficulty: 0.65,
    discrimination: 1.5,
    expectedSeconds: 180,
    prereqClosure: ["linear-regression-terminology", "regression"],
    source: CASELLA_BERGER_REG,
    status: "live",
  },
  {
    id: "linear-regression-terminology--transfer-cross-field-vocabulary",
    conceptId: "linear-regression-terminology",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "An economist, a statistician, and a machine-learning engineer describe the same fitted model and appear " +
      "to share almost no vocabulary. Give the corresponding terms from at least two of those fields for the " +
      "response, the predictors, and the coefficients, and say why the mismatch matters.",
    rubric: {
      elements: [
        {
          id: "two-vocabularies",
          description:
            "Supplies at least two consistent translations — e.g. dependent/independent variable, endogenous/exogenous variable, target/feature, and coefficient versus weight.",
          weight: 3,
          required: true,
        },
        {
          id: "why-it-matters",
          description:
            "Explains that the same model can be described in three papers with no shared words, so the mismatch is a genuine barrier to reading across fields rather than a curiosity.",
          weight: 2,
          required: true,
          misconception: {
            id: "vocabulary-treated-as-cosmetic",
            description:
              "Treats the differences as purely stylistic, missing that they routinely cause readers to think two identical methods are different.",
            blameConceptId: "linear-regression-terminology",
          },
        },
      ],
    },
    difficulty: 0.85,
    discrimination: 1.3,
    expectedSeconds: 180,
    prereqClosure: ["linear-regression-terminology", "regression"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "linear-regression-terminology--transfer-interpret-intercept",
    conceptId: "linear-regression-terminology",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A model of house price on square footage reports an intercept of $48,000. A colleague says this means " +
      "a house with no floor area would sell for $48,000. Say what is wrong with that reading and what the " +
      "intercept is actually doing.",
    rubric: {
      elements: [
        {
          id: "extrapolation",
          description:
            "Identifies that X = 0 lies far outside the observed range, so the intercept is an extrapolation the data cannot support.",
          weight: 3,
          required: true,
          misconception: {
            id: "intercept-read-literally",
            description:
              "Reads the intercept as a meaningful prediction at zero even when zero is outside the data.",
            blameConceptId: "linear-regression-terminology",
          },
        },
        {
          id: "role-of-intercept",
          description:
            "States that the intercept mainly positions the line vertically over the observed range, and is usually worth including even when its literal reading is meaningless.",
          weight: 3,
          required: true,
        },
        {
          id: "centring-fix",
          description:
            "Notes that centring the predictor makes the intercept the fitted value at the average square footage, which is interpretable.",
          weight: 1,
        },
      ],
    },
    difficulty: 1.05,
    discrimination: 1.5,
    expectedSeconds: 180,
    prereqClosure: ["linear-regression-terminology", "regression"],
    source: ISLR,
    status: "live",
  },

  // --- Simple Linear Regression ---------------------------------------------
  {
    id: "simple-linear-regression--recall-slope-formula",
    conceptId: "simple-linear-regression",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "For the model Y = β₀ + β₁X + ε, the least-squares slope estimate is:",
    choices: [
      { id: "a", text: "β̂₁ = Cov(X, Y) / Var(X)", correct: true },
      {
        id: "b",
        text: "β̂₁ = Cov(X, Y) / Var(Y)",
        correct: false,
        misconception: {
          id: "wrong-variance-in-denominator",
          description:
            "Divides by the response's variance. Only the predictor's spread belongs in the denominator, which is why regressing Y on X differs from regressing X on Y.",
          blameConceptId: "sample-variance",
        },
      },
      {
        id: "c",
        text: "β̂₁ = Cov(X, Y) / (Var(X)·Var(Y))",
        correct: false,
        misconception: {
          id: "slope-confused-with-standardised-quantity",
          description:
            "Divides by both variances, producing a scale-free quantity rather than a rate of change in the units of Y per unit of X.",
          blameConceptId: "covariance",
        },
      },
      {
        id: "d",
        text: "β̂₁ = Ȳ / X̄",
        correct: false,
        misconception: {
          id: "slope-as-ratio-of-means",
          description:
            "Uses a ratio of means, which ignores how the two variables co-vary and would give a slope even for uncorrelated data.",
          blameConceptId: "sample-mean",
        },
      },
    ],
    difficulty: 0.0,
    discrimination: 1.3,
    expectedSeconds: 40,
    prereqClosure: ["simple-linear-regression", "covariance", "sample-variance", "sample-mean"],
    source: ISLR,
    status: "live",
  },
  {
    id: "simple-linear-regression--recall-line-through-means",
    conceptId: "simple-linear-regression",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which statements about the fitted simple-linear-regression line are true? Select all that apply.",
    choices: [
      { id: "a", text: "It passes through the point of means (x̄, ȳ)", correct: true },
      { id: "b", text: "β̂₀ = ȳ − β̂₁x̄", correct: true },
      { id: "c", text: "The residuals sum to exactly zero", correct: true },
      {
        id: "d",
        text: "Regressing Y on X and regressing X on Y give the same fitted line",
        correct: false,
        misconception: {
          id: "regression-assumed-symmetric",
          description:
            "Assumes symmetry. Only the predictor's variance is in the denominator, so the two lines differ unless the fit is perfect.",
          blameConceptId: "simple-linear-regression",
        },
      },
      {
        id: "e",
        text: "The line minimises the perpendicular distance from each point to the line",
        correct: false,
        misconception: {
          id: "perpendicular-instead-of-vertical",
          description:
            "Minimises perpendicular rather than vertical deviations. That is a different method (total least squares), and it is symmetric in X and Y.",
          blameConceptId: "simple-linear-regression",
        },
      },
    ],
    difficulty: 0.3,
    discrimination: 1.4,
    expectedSeconds: 60,
    prereqClosure: ["simple-linear-regression", "sample-mean"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "simple-linear-regression--apply-intercept-from-summaries",
    conceptId: "simple-linear-regression",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A simple linear regression has Cov(X, Y) = 6, Var(X) = 3, x̄ = 10 and ȳ = 50. What is the fitted " +
      "intercept β̂₀? Give a whole number.",
    answerKey: 30,
    tolerance: 0.01,
    difficulty: 0.8,
    discrimination: 1.5,
    expectedSeconds: 90,
    prereqClosure: ["simple-linear-regression", "covariance", "sample-variance", "sample-mean"],
    source: OCW_18_650,
    status: "live",
  },
  {
    id: "simple-linear-regression--apply-slope-from-sums",
    conceptId: "simple-linear-regression",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "For a sample, Σ(xᵢ − x̄)(yᵢ − ȳ) = 48 and Σ(xᵢ − x̄)² = 32. What is the least-squares slope β̂₁? " +
      "Give a decimal to two places.",
    answerKey: 1.5,
    tolerance: 0.01,
    difficulty: 0.95,
    discrimination: 1.5,
    expectedSeconds: 90,
    prereqClosure: ["simple-linear-regression", "sample-mean"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "simple-linear-regression--explain-derive-slope",
    conceptId: "simple-linear-regression",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "Derive β̂₁ = Σ(xᵢ − x̄)(yᵢ − ȳ) / Σ(xᵢ − x̄)² from first principles, by minimising " +
      "S(β₀, β₁) = Σ(yᵢ − β₀ − β₁xᵢ)². Show the steps, not just the result.",
    rubric: {
      elements: [
        {
          id: "both-partials",
          description:
            "Takes partial derivatives of S with respect to both β₀ and β₁ and sets each to zero.",
          weight: 3,
          required: true,
          misconception: {
            id: "quotes-formula",
            description:
              "Asserts the formula without carrying out the minimisation, so nothing is actually derived.",
            blameConceptId: "simple-linear-regression",
          },
        },
        {
          id: "eliminates-intercept",
          description:
            "Uses the first equation to get β₀ = ȳ − β₁x̄ and substitutes it into the second to eliminate the intercept.",
          weight: 3,
          required: true,
        },
        {
          id: "collects-to-result",
          description:
            "Collects terms into Σ(xᵢ − x̄)(yᵢ − ȳ) − β₁Σ(xᵢ − x̄)² = 0 and solves for β̂₁.",
          weight: 2,
          required: true,
        },
        {
          id: "reads-the-conditions",
          description:
            "Bonus: reads the two stationarity conditions as statements — the residuals have mean zero and are uncorrelated with the predictor.",
          weight: 1,
        },
      ],
      forbiddenMoves: [
        {
          id: "no-convexity-check",
          description:
            "Claims a minimum without noting that S is a convex quadratic, so the stationary point is global.",
          weight: 1,
        },
      ],
    },
    difficulty: 1.5,
    discrimination: 1.7,
    expectedSeconds: 300,
    prereqClosure: ["simple-linear-regression", "sample-mean", "sample-variance"],
    source: CASELLA_BERGER_REG,
    status: "live",
  },
  {
    id: "simple-linear-regression--explain-only-x-spread",
    conceptId: "simple-linear-regression",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Var(Y) appears nowhere in the slope formula β̂₁ = Cov(X, Y)/Var(X). Explain what that asymmetry implies " +
      "about regressing Y on X versus regressing X on Y.",
    rubric: {
      elements: [
        {
          id: "identifies-asymmetry",
          description:
            "States that only the predictor's spread is in the denominator, so swapping the roles of X and Y changes the denominator and therefore the slope.",
          weight: 3,
          required: true,
          misconception: {
            id: "two-regressions-assumed-identical",
            description:
              "Assumes the two regressions describe the same line, missing that each minimises deviations in a different direction.",
            blameConceptId: "simple-linear-regression",
          },
        },
        {
          id: "which-errors-are-minimised",
          description:
            "Explains that regressing Y on X minimises vertical deviations while regressing X on Y minimises horizontal ones — different objectives, different answers.",
          weight: 3,
          required: true,
        },
        {
          id: "when-they-coincide",
          description:
            "Notes the two lines coincide only when the points lie exactly on a line.",
          weight: 1,
        },
      ],
    },
    difficulty: 1.6,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["simple-linear-regression", "covariance", "sample-variance"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "simple-linear-regression--transfer-units",
    conceptId: "simple-linear-regression",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A height–weight regression measured with height in inches gives a slope of 5 pounds per inch. The " +
      "heights are re-expressed in centimetres and the regression refitted. Explain what happens to the slope, " +
      "and what happens to the scale-free quantity Cov(X, Y)/(s_X·s_Y).",
    rubric: {
      elements: [
        {
          id: "slope-rescales",
          description:
            "States that the slope is divided by 2.54 (to about 1.97 pounds per centimetre), because the units of the denominator changed.",
          weight: 3,
          required: true,
          misconception: {
            id: "slope-assumed-unit-free",
            description:
              "Believes the slope is unaffected by units, missing that it carries the units of Y per unit of X.",
            blameConceptId: "simple-linear-regression",
          },
        },
        {
          id: "scale-free-quantity-unchanged",
          description:
            "States that Cov(X, Y)/(s_X·s_Y) is unchanged, because the scale factor multiplies the covariance and s_X identically and cancels.",
          weight: 3,
          required: true,
        },
        {
          id: "different-questions",
          description:
            "Concludes that the two quantities answer different questions — how much Y changes per unit of X, versus how tightly the points follow a line.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.8,
    expectedSeconds: 240,
    prereqClosure: ["simple-linear-regression", "covariance", "sample-variance"],
    source: OCW_18_650,
    status: "live",
  },
  {
    id: "simple-linear-regression--transfer-anscombe",
    conceptId: "simple-linear-regression",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Four datasets share the same x̄, ȳ, Var(X), Var(Y), Cov(X, Y) and therefore the same fitted line — yet " +
      "one is genuinely linear, one is a clean parabola, one is linear except for a single far-off point, and " +
      "one has all its x values identical except for one. Explain what this shows about relying on the fitted " +
      "coefficients, and what you would do instead.",
    rubric: {
      elements: [
        {
          id: "summaries-are-lossy",
          description:
            "States that the summary statistics the slope is built from cannot distinguish these shapes, so identical coefficients are compatible with wildly different data.",
          weight: 3,
          required: true,
          misconception: {
            id: "coefficients-treated-as-sufficient",
            description:
              "Treats the fitted coefficients and their standard errors as a complete description of the relationship.",
            blameConceptId: "simple-linear-regression",
          },
        },
        {
          id: "plot-first",
          description:
            "Says to plot the data and the residuals, which separates the four cases immediately.",
          weight: 2,
          required: true,
        },
        {
          id: "names-specific-failures",
          description:
            "Names at least two of the specific pathologies — unmodelled curvature, an outlier dragging the line, or a single point determining the slope.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.1,
    discrimination: 1.7,
    expectedSeconds: 240,
    prereqClosure: ["simple-linear-regression", "covariance", "sample-variance", "sample-mean"],
    source: NIST_HANDBOOK,
    status: "live",
  },

  // --- Ordinary Least Squares -----------------------------------------------
  {
    id: "ordinary-least-squares--recall-objective",
    conceptId: "ordinary-least-squares",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Ordinary least squares chooses the coefficients that minimise:",
    choices: [
      { id: "a", text: "The sum of squared residuals, Σ(yᵢ − ŷᵢ)²", correct: true },
      {
        id: "b",
        text: "The sum of the residuals, Σ(yᵢ − ŷᵢ)",
        correct: false,
        misconception: {
          id: "unsquared-residual-sum",
          description:
            "Sums signed residuals, which cancel — any line through the point of means makes this zero, so it cannot single out a fit.",
          blameConceptId: "ordinary-least-squares",
        },
      },
      {
        id: "c",
        text: "The sum of absolute residuals, Σ|yᵢ − ŷᵢ|",
        correct: false,
        misconception: {
          id: "lad-called-ols",
          description:
            "Describes least absolute deviations, a different estimator that targets the conditional median and has no closed form.",
          blameConceptId: "ordinary-least-squares",
        },
      },
      {
        id: "d",
        text: "The perpendicular distance from each point to the fitted line",
        correct: false,
        misconception: {
          id: "orthogonal-regression-called-ols",
          description:
            "Describes total least squares. OLS measures deviations vertically, in the units of the response.",
          blameConceptId: "ordinary-least-squares",
        },
      },
    ],
    difficulty: 0.02,
    discrimination: 1.2,
    expectedSeconds: 35,
    prereqClosure: ["ordinary-least-squares", "simple-linear-regression"],
    source: ISLR,
    status: "live",
  },
  {
    id: "ordinary-least-squares--recall-gauss-markov",
    conceptId: "ordinary-least-squares",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem:
      "The Gauss–Markov theorem says OLS is the Best Linear Unbiased Estimator. Which statements about it are " +
      "correct? Select all that apply.",
    choices: [
      { id: "a", text: "'Best' means smallest variance within the stated class", correct: true },
      { id: "b", text: "The comparison class is restricted to linear, unbiased estimators", correct: true },
      { id: "c", text: "It requires homoskedastic, uncorrelated errors with mean zero given X", correct: true },
      {
        id: "d",
        text: "It requires the errors to be normally distributed",
        correct: false,
        misconception: {
          id: "gauss-markov-needs-normality",
          description:
            "Adds normality to the theorem's conditions. Normality is needed for exact t- and F-tests, not for the Gauss–Markov result.",
          blameConceptId: "ordinary-least-squares",
        },
      },
      {
        id: "e",
        text: "It implies no estimator of any kind can have lower mean squared error than OLS",
        correct: false,
        misconception: {
          id: "blue-read-as-globally-best",
          description:
            "Drops the 'unbiased' qualifier. Biased estimators such as ridge sit outside the class and can have far lower total error.",
          blameConceptId: "ordinary-least-squares",
        },
      },
    ],
    difficulty: 0.6,
    discrimination: 1.5,
    expectedSeconds: 70,
    prereqClosure: ["ordinary-least-squares", "variance", "expectation"],
    source: CASELLA_BERGER_REG,
    status: "live",
  },
  {
    id: "ordinary-least-squares--apply-sse-from-fit",
    conceptId: "ordinary-least-squares",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A fitted line is Ŷ = 2 + 3X. The observed points are (1, 4), (2, 9) and (3, 10). What is the sum of " +
      "squared residuals? Give a whole number.",
    answerKey: 3,
    tolerance: 0.01,
    difficulty: 0.82,
    discrimination: 1.4,
    expectedSeconds: 120,
    prereqClosure: ["ordinary-least-squares", "simple-linear-regression"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "ordinary-least-squares--apply-sse-from-residuals",
    conceptId: "ordinary-least-squares",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "A regression on five observations leaves residuals of 2, −1, 0, 3 and −2. What is the sum of squared " +
      "residuals? Give a whole number.",
    answerKey: 18,
    tolerance: 0.01,
    difficulty: 0.5,
    discrimination: 1.3,
    expectedSeconds: 60,
    prereqClosure: ["ordinary-least-squares"],
    source: NIST_HANDBOOK,
    status: "live",
  },
  {
    id: "ordinary-least-squares--explain-why-squared",
    conceptId: "ordinary-least-squares",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Minimising Σ|yᵢ − ŷᵢ| is a perfectly sensible idea, yet it has no closed-form solution while OLS does. " +
      "Explain the mathematical reason, and say what each objective actually estimates.",
    rubric: {
      elements: [
        {
          id: "non-differentiability",
          description:
            "Identifies that the absolute value is not differentiable at zero, so setting a derivative to zero — the step producing OLS's formula — is unavailable.",
          weight: 3,
          required: true,
          misconception: {
            id: "squared-error-called-more-accurate",
            description:
              "Justifies squared error by vague accuracy rather than by differentiability and the closed form it enables.",
            blameConceptId: "ordinary-least-squares",
          },
        },
        {
          id: "different-targets",
          description:
            "States that squared error estimates the conditional mean while absolute error estimates the conditional median — genuinely different quantities on skewed data.",
          weight: 3,
          required: true,
        },
        {
          id: "outlier-sensitivity",
          description:
            "Notes the practical consequence: squaring makes large deviations disproportionately costly, so OLS is far more sensitive to outliers.",
          weight: 1,
        },
      ],
    },
    difficulty: 1.52,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["ordinary-least-squares", "expectation"],
    source: ESL,
    status: "live",
  },
  {
    id: "ordinary-least-squares--explain-guaranteed-properties",
    conceptId: "ordinary-least-squares",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "An analyst checks that the residuals of their fitted model sum to zero and are uncorrelated with the " +
      "predictor, and reports this as evidence the model fits well. Explain why that is not evidence of " +
      "anything, and say what a residual check should look at instead.",
    rubric: {
      elements: [
        {
          id: "properties-are-forced",
          description:
            "Explains that both properties are consequences of the least-squares fitting conditions, so they hold for every OLS fit — including a straight line fitted to an obviously curved relationship.",
          weight: 4,
          required: true,
          misconception: {
            id: "guaranteed-property-as-diagnostic",
            description:
              "Treats an algebraic identity of the fitting procedure as an empirical check that could have failed.",
            blameConceptId: "ordinary-least-squares",
          },
        },
        {
          id: "what-to-check-instead",
          description:
            "Says to look at the pattern of residuals — against fitted values, against each predictor, against time — where curvature, funnelling or runs are informative.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.7,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["ordinary-least-squares", "simple-linear-regression"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "ordinary-least-squares--transfer-blue-loophole",
    conceptId: "ordinary-least-squares",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Two predictors correlate at 0.999. OLS returns coefficients of +180 and −176 with standard errors near " +
      "60; a shrinkage method returns +2.1 and +1.8 with standard errors near 0.4. Gauss–Markov says OLS is " +
      "BLUE. Explain how both facts can be true, and which estimator you would use.",
    rubric: {
      elements: [
        {
          id: "unbiased-qualifier",
          description:
            "States that BLUE is optimality within the class of linear unbiased estimators, and the shrinkage estimator is biased, so it is not in that class — there is no contradiction.",
          weight: 4,
          required: true,
          misconception: {
            id: "blue-treated-as-unbeatable",
            description:
              "Reads 'best' as best overall, so a lower-error competitor looks like a violation of the theorem.",
            blameConceptId: "ordinary-least-squares",
          },
        },
        {
          id: "mse-decomposition",
          description:
            "Invokes total error as bias squared plus variance, and notes that collinearity has inflated OLS's variance enough that accepting a little bias lowers the total.",
          weight: 3,
          required: true,
        },
        {
          id: "practical-choice",
          description:
            "Chooses the shrinkage estimator here, noting that unbiasedness is cold comfort when any single sample is wildly off.",
          weight: 1,
        },
      ],
    },
    difficulty: 2.02,
    discrimination: 1.8,
    expectedSeconds: 240,
    prereqClosure: ["ordinary-least-squares", "variance", "expectation"],
    source: ESL,
    status: "live",
  },
  {
    id: "ordinary-least-squares--transfer-choose-loss",
    conceptId: "ordinary-least-squares",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "An analyst models household income against several predictors. The income distribution is strongly " +
      "right-skewed and a handful of households earn many times the median. Argue for or against OLS here, " +
      "naming an alternative and what it would change.",
    rubric: {
      elements: [
        {
          id: "outlier-leverage-on-ols",
          description:
            "Explains that squaring makes the extreme incomes dominate the objective, so the fit is pulled toward a small number of observations.",
          weight: 3,
          required: true,
          misconception: {
            id: "skew-ignored",
            description:
              "Treats the choice of loss as independent of the response's distribution, so no issue is identified.",
            blameConceptId: "ordinary-least-squares",
          },
        },
        {
          id: "names-alternative",
          description:
            "Names a concrete alternative — least absolute deviations or quantile regression, or modelling log income — and says what it targets instead.",
          weight: 3,
          required: true,
        },
        {
          id: "which-question",
          description:
            "Notes that the choice depends on whether the mean or the median income is the quantity of interest, which is a question about the problem rather than about statistics.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.2,
    discrimination: 1.7,
    expectedSeconds: 240,
    prereqClosure: ["ordinary-least-squares", "expectation", "variance"],
    source: AUTHORED,
    status: "live",
  },

  // --- Normal Equations -----------------------------------------------------
  {
    id: "normal-equations--recall-matrix-form",
    conceptId: "normal-equations",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "The normal equations for the least-squares fit of y on a design matrix X are:",
    choices: [
      { id: "a", text: "XᵀX β̂ = Xᵀy, giving β̂ = (XᵀX)⁻¹Xᵀy when XᵀX is invertible", correct: true },
      {
        id: "b",
        text: "Xβ̂ = y, solved directly for β̂",
        correct: false,
        misconception: {
          id: "treats-system-as-consistent",
          description:
            "Assumes y lies in the column space of X. With n > p it generally does not, which is exactly why a least-squares fit is needed at all.",
          blameConceptId: "matrix-multiplication",
        },
      },
      {
        id: "c",
        text: "XXᵀ β̂ = Xᵀy",
        correct: false,
        misconception: {
          id: "wrong-gram-matrix",
          description:
            "Uses XXᵀ, which is n × n and acts on observations rather than coefficients, so the dimensions do not even match β̂.",
          blameConceptId: "matrix-multiplication",
        },
      },
      {
        id: "d",
        text: "β̂ = X⁻¹y",
        correct: false,
        misconception: {
          id: "inverts-rectangular-matrix",
          description:
            "Inverts a rectangular matrix, which has no inverse. The Gram matrix XᵀX is what can be inverted.",
          blameConceptId: "matrix-multiplication",
        },
      },
    ],
    difficulty: 0.11,
    discrimination: 1.3,
    expectedSeconds: 40,
    prereqClosure: ["normal-equations", "matrix-multiplication", "ordinary-least-squares"],
    source: OCW_18_06,
    status: "live",
  },
  {
    id: "normal-equations--recall-invertibility",
    conceptId: "normal-equations",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which statements about XᵀX in the normal equations are true? Select all that apply.",
    choices: [
      { id: "a", text: "It is symmetric and positive semi-definite", correct: true },
      { id: "b", text: "It is (p+1) × (p+1), so its size depends on the number of predictors, not the number of observations", correct: true },
      { id: "c", text: "It is invertible exactly when X has full column rank", correct: true },
      {
        id: "d",
        text: "It is always invertible, since XᵀX is a square matrix",
        correct: false,
        misconception: {
          id: "square-implies-invertible",
          description:
            "Confuses being square with being invertible. Duplicated predictors, a full set of category indicators, or p ≥ n all make it singular.",
          blameConceptId: "matrix-multiplication",
        },
      },
      {
        id: "e",
        text: "When it is singular, the least-squares problem has no solution at all",
        correct: false,
        misconception: {
          id: "singular-means-no-solution",
          description:
            "Says there is no solution when in fact there are infinitely many — the fitted values ŷ are still unique, only β̂ is not.",
          blameConceptId: "normal-equations",
        },
      },
    ],
    difficulty: 0.41,
    discrimination: 1.5,
    expectedSeconds: 70,
    prereqClosure: ["normal-equations", "matrix-multiplication", "vectors"],
    source: OCW_18_06,
    status: "live",
  },
  {
    id: "normal-equations--apply-solve-2x2",
    conceptId: "normal-equations",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "For a regression with an intercept, XᵀX = [[3, 6], [6, 14]] and Xᵀy = (9, 21)ᵀ. Solve the normal " +
      "equations for the slope β̂₁. Give a decimal to two places.",
    answerKey: 1.5,
    tolerance: 0.01,
    difficulty: 0.91,
    discrimination: 1.6,
    expectedSeconds: 150,
    prereqClosure: ["normal-equations", "matrix-multiplication", "vector-operations"],
    source: OCW_18_06,
    status: "live",
  },
  {
    id: "normal-equations--apply-solve-2x2-negative-intercept",
    conceptId: "normal-equations",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "For a regression with an intercept, XᵀX = [[4, 8], [8, 24]] and Xᵀy = (12, 40)ᵀ. Solve the normal " +
      "equations for the intercept β̂₀. Give a whole number.",
    answerKey: -1,
    tolerance: 0.01,
    difficulty: 1.2,
    discrimination: 1.6,
    expectedSeconds: 150,
    prereqClosure: ["normal-equations", "matrix-multiplication", "vector-operations"],
    source: OCW_18_06,
    status: "live",
  },
  {
    id: "normal-equations--explain-derive-by-gradient",
    conceptId: "normal-equations",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "Derive the normal equations by differentiating ‖y − Xβ‖² with respect to β. Show the expansion and the " +
      "gradient explicitly.",
    rubric: {
      elements: [
        {
          id: "expands-quadratic",
          description:
            "Expands (y − Xβ)ᵀ(y − Xβ) into yᵀy − 2βᵀXᵀy + βᵀXᵀXβ, noting the two cross terms are equal scalars.",
          weight: 3,
          required: true,
          misconception: {
            id: "quotes-normal-equations",
            description: "States the result without differentiating anything.",
            blameConceptId: "normal-equations",
          },
        },
        {
          id: "computes-gradient",
          description:
            "Computes ∇_β = −2Xᵀy + 2XᵀXβ, equivalently −2Xᵀ(y − Xβ).",
          weight: 3,
          required: true,
        },
        {
          id: "sets-to-zero",
          description: "Sets the gradient to zero and rearranges to XᵀXβ̂ = Xᵀy.",
          weight: 2,
          required: true,
        },
        {
          id: "convexity",
          description:
            "Bonus: notes XᵀX is positive semi-definite, so the objective is convex and the stationary point is a global minimum.",
          weight: 1,
        },
      ],
    },
    difficulty: 1.61,
    discrimination: 1.7,
    expectedSeconds: 300,
    prereqClosure: ["normal-equations", "matrix-multiplication", "vector-operations", "vectors"],
    source: OCW_18_06,
    status: "live",
  },
  {
    id: "normal-equations--explain-residual-sum-zero",
    conceptId: "normal-equations",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "The residuals of an OLS fit sum to exactly zero — but only when the model includes an intercept. " +
      "Explain how that fact is contained in the normal equations, and what happens without an intercept.",
    rubric: {
      elements: [
        {
          id: "intercept-row",
          description:
            "Identifies that the first column of X is all ones, so the first row of Xᵀ(y − Xβ̂) = 0 reads Σ(yᵢ − ŷᵢ) = 0.",
          weight: 4,
          required: true,
          misconception: {
            id: "zero-sum-as-separate-fact",
            description:
              "Treats the vanishing residual sum as an independent property of OLS rather than as one scalar equation of the normal equations.",
            blameConceptId: "normal-equations",
          },
        },
        {
          id: "without-intercept",
          description:
            "States that a model through the origin has no such row, so the residuals need not sum to zero.",
          weight: 3,
          required: true,
        },
        {
          id: "consequence",
          description:
            "Notes a downstream consequence, such as the SST = SSR + SSE identity failing without an intercept.",
          weight: 1,
        },
      ],
    },
    difficulty: 1.8,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["normal-equations", "matrix-multiplication", "ordinary-least-squares"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "normal-equations--transfer-orthogonality",
    conceptId: "normal-equations",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "The normal equations can be written Xᵀ(y − Xβ̂) = 0. Read this form geometrically: say what it asserts " +
      "about the residual vector, and why that makes OLS a projection rather than something merely analogous " +
      "to one.",
    rubric: {
      elements: [
        {
          id: "residual-orthogonal-to-columns",
          description:
            "States that the equation says the residual vector has zero inner product with every column of X — it is orthogonal to the entire column space.",
          weight: 4,
          required: true,
          misconception: {
            id: "projection-as-loose-analogy",
            description:
              "Describes OLS as 'like' a projection without recognising that the orthogonality condition is the definition of one.",
            blameConceptId: "normal-equations",
          },
        },
        {
          id: "identical-condition",
          description:
            "Notes that exactly one point of a subspace has an error orthogonal to it, and it is the closest point — so the normal equations are the projection's defining condition, not a resemblance to it.",
          weight: 3,
          required: true,
        },
        {
          id: "fitted-values-in-span",
          description:
            "Observes that ŷ = Xβ̂ is by construction a linear combination of the predictor columns, hence lies in that subspace.",
          weight: 1,
        },
      ],
    },
    difficulty: 2.11,
    discrimination: 1.8,
    expectedSeconds: 240,
    prereqClosure: ["normal-equations", "matrix-multiplication", "vectors", "vector-operations"],
    source: OCW_18_06,
    status: "live",
  },
  {
    id: "normal-equations--transfer-singular-fallback",
    conceptId: "normal-equations",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A researcher includes indicator columns for all four levels of a categorical predictor alongside an " +
      "intercept, and the software reports that the model cannot be fitted. Diagnose the problem and give two " +
      "different ways of proceeding.",
    rubric: {
      elements: [
        {
          id: "diagnoses-dependence",
          description:
            "Identifies that the four indicators sum to the intercept column, so X does not have full column rank and XᵀX is singular.",
          weight: 3,
          required: true,
          misconception: {
            id: "blames-software-or-data-size",
            description:
              "Attributes the failure to a bug or to insufficient data rather than to an exact linear dependence among the columns.",
            blameConceptId: "normal-equations",
          },
        },
        {
          id: "drop-a-level",
          description:
            "Gives the standard fix: drop one category as a baseline, so the remaining coefficients are differences from it.",
          weight: 2,
          required: true,
        },
        {
          id: "second-route",
          description:
            "Gives a second route — omit the intercept and keep all four indicators, or use a pseudo-inverse for the minimum-norm solution — and notes that the fitted values are the same either way.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.3,
    discrimination: 1.7,
    expectedSeconds: 240,
    prereqClosure: ["normal-equations", "matrix-multiplication", "vectors"],
    source: NIST_HANDBOOK,
    status: "live",
  },
];
