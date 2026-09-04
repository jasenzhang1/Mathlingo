import type { Item, SourceRef } from "../lib/assessment/types";

/**
 * Servable items for cluster 1 of the `statistics` domain — the six foundations
 * concepts, 8 items each, authored from `assessments/statistics-foundations.md`
 * and from the wiki articles in `data/wiki/`.
 *
 * Eight per concept is what `auditCoverage` requires before it will call a pool
 * adequate: at least 8 live items, live coverage at recall/apply/explain, and a
 * difficulty spread of 1.5 logits or more. Every concept below clears all three.
 *
 * Note on prerequisite closures. The first four concepts sit at or near the root
 * of the graph, so their allowed closures are tiny — `sampling-methods` may draw
 * only on itself and `population-vs-sample`. Several natural items (sampling
 * bias versus sampling error, why n rather than N drives precision) want to lean
 * on `standard-error`, which is downstream. Rather than widen the graph as a
 * side effect of authoring, those items are framed in terms the learner already
 * has — "would not shrink however many more you collected" instead of "SE" — and
 * the formal statement is left to the concepts that own it.
 */

/** Authored from the concept and its prerequisites, with no external seed. */
const AUTHORED: SourceRef = {
  id: "mathlingo-authored-stats",
  tier: "generated",
  title: "Mathlingo authored item (statistics sweep)",
};

const WASSERMAN: SourceRef = {
  id: "wasserman-aos",
  tier: "restricted",
  title: "All of Statistics (Wasserman)",
  locator: "Ch. 6, Models, Statistical Inference and Learning",
  rewriteApprovedBy: "pending-review",
};

const CASELLA_BERGER: SourceRef = {
  id: "casella-berger",
  tier: "restricted",
  title: "Statistical Inference (Casella & Berger, 2nd ed.)",
  locator: "§5.1–5.3, random samples and sampling distributions",
  rewriteApprovedBy: "pending-review",
};

export const statisticsFoundationsItems: Item[] = [
  // =========================================================================
  // Population vs Sample
  // =========================================================================
  {
    id: "population-vs-sample--recall-which-is-observed",
    conceptId: "population-vs-sample",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "In a statistical study, which of the two is actually observed?",
    choices: [
      { id: "a", text: "The sample", correct: true },
      {
        id: "b",
        text: "The population",
        correct: false,
        misconception: {
          id: "population-observed",
          description:
            "Reverses the basic setup. The population is the thing we want to know about and almost never see; inference exists precisely because of that gap.",
          blameConceptId: "population-vs-sample",
        },
      },
      {
        id: "c",
        text: "Both, in equal measure",
        correct: false,
        misconception: {
          id: "both-observed",
          description:
            "Blurs the distinction that the whole domain rests on.",
          blameConceptId: "population-vs-sample",
        },
      },
      {
        id: "d",
        text: "Neither — statistics works from assumptions alone",
        correct: false,
        misconception: {
          id: "neither-observed",
          description: "Discards the empirical input entirely.",
          blameConceptId: "population-vs-sample",
        },
      },
    ],
    difficulty: -1.5,
    discrimination: 1.1,
    expectedSeconds: 20,
    prereqClosure: ["population-vs-sample"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "population-vs-sample--recall-define-census",
    conceptId: "population-vs-sample",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "A census is best described as:",
    choices: [
      { id: "a", text: "An attempt to measure the entire population", correct: true },
      {
        id: "b",
        text: "A type of hypothesis test",
        correct: false,
        misconception: {
          id: "census-as-test",
          description:
            "Conflates a data-collection strategy with an inferential procedure. A census needs no inference, because nothing is left unobserved.",
          blameConceptId: "population-vs-sample",
        },
      },
      {
        id: "c",
        text: "A very large sample, chosen at random",
        correct: false,
        misconception: {
          id: "census-as-big-sample",
          description:
            "A census is not a sample at all — it is the whole population, so there is no sampling variability to quantify.",
          blameConceptId: "population-vs-sample",
        },
      },
      {
        id: "d",
        text: "A government survey specifically",
        correct: false,
        misconception: {
          id: "census-as-government",
          description: "Takes one familiar instance for the general definition.",
          blameConceptId: "population-vs-sample",
        },
      },
    ],
    difficulty: -1.3,
    discrimination: 1.0,
    expectedSeconds: 25,
    prereqClosure: ["population-vs-sample"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "population-vs-sample--apply-destructive-testing",
    conceptId: "population-vs-sample",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "A quality engineer wants the average lifespan of a batch of 10,000 bulbs. Explain why taking a census here is not merely expensive but self-defeating.",
    rubric: {
      elements: [
        {
          id: "destructive",
          description:
            "Identifies that measuring lifespan is destructive — each bulb must be run until it fails.",
          weight: 3,
          required: true,
        },
        {
          id: "destroys-batch",
          description:
            "Concludes that a census destroys the entire batch the engineer was trying to sell.",
          weight: 2,
          required: true,
        },
        {
          id: "sampling-essential",
          description:
            "States that sampling is therefore essential rather than merely convenient.",
          weight: 1,
        },
      ],
    },
    difficulty: -0.7,
    discrimination: 1.2,
    expectedSeconds: 70,
    prereqClosure: ["population-vs-sample"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "population-vs-sample--apply-moving-population",
    conceptId: "population-vs-sample",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "A pollster wants the opinions of \"American voters,\" but people turn 18, move, and die every day. Why does this make even defining the population a methodological decision?",
    rubric: {
      elements: [
        {
          id: "moving-target",
          description:
            "Recognises the population is a moving, fuzzy target requiring a snapshot definition fixed in time.",
          weight: 3,
          required: true,
        },
        {
          id: "competing-definitions",
          description:
            "Names at least two defensible but different definitions — registered, eligible, or likely voters.",
          weight: 2,
        },
        {
          id: "different-answers",
          description:
            "States that different reasonable definitions yield genuinely different true values, so the choice is itself part of the method.",
          weight: 2,
          required: true,
        },
      ],
    },
    difficulty: -0.5,
    discrimination: 1.3,
    expectedSeconds: 80,
    prereqClosure: ["population-vs-sample"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "population-vs-sample--explain-nonhuman-population",
    conceptId: "population-vs-sample",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Give an example of a population that is not a group of people and is inherently infinite or hypothetical, and say what makes it a legitimate population.",
    rubric: {
      elements: [
        {
          id: "valid-example",
          description:
            "Offers a genuinely infinite or hypothetical example — all possible rolls of a die, all measurements an instrument could produce — rather than a merely large finite group.",
          weight: 3,
          required: true,
          misconception: {
            id: "population-must-be-finite-people",
            description:
              "Believes a population must be an enumerable group of people, which rules out the measurement-error and process models that depend on the wider definition.",
            blameConceptId: "population-vs-sample",
          },
        },
        {
          id: "definition",
          description:
            "States that a population is any well-defined collection the researcher wants to draw conclusions about.",
          weight: 2,
          required: true,
        },
      ],
    },
    difficulty: 0.0,
    discrimination: 1.2,
    expectedSeconds: 80,
    prereqClosure: ["population-vs-sample"],
    source: WASSERMAN,
    status: "live",
  },
  {
    id: "population-vs-sample--explain-logical-structure",
    conceptId: "population-vs-sample",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "State the logical structure of statistical inference in one or two sentences, using the population/sample distinction.",
    rubric: {
      elements: [
        {
          id: "never-observe-population",
          description: "States that the population is not observed directly.",
          weight: 2,
          required: true,
        },
        {
          id: "sample-to-population",
          description:
            "States that properties of the sample are used to draw conclusions about properties of the population.",
          weight: 3,
          required: true,
        },
        {
          id: "quantified-uncertainty",
          description:
            "Notes that the conclusion carries quantifiable uncertainty rather than being exact.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.2,
    discrimination: 1.4,
    expectedSeconds: 75,
    prereqClosure: ["population-vs-sample"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "population-vs-sample--transfer-ab-test-population",
    conceptId: "population-vs-sample",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A company wants to know what fraction of \"all possible users\" would click a new button, but most of those people have never used the app. How does an A/B test handle a population that does not exist yet?",
    rubric: {
      elements: [
        {
          id: "redefines",
          description:
            "Explains that the practical population is redefined to something well-defined, such as all visits under conditions like today's.",
          weight: 3,
          required: true,
        },
        {
          id: "sample-is-window",
          description:
            "Identifies the sample as the visitors who arrived during the test window.",
          weight: 2,
        },
        {
          id: "not-an-escape",
          description:
            "States that this does not escape the population/sample framework but narrows it, and that conclusions inherit the narrowing.",
          weight: 2,
          required: true,
          misconception: {
            id: "ab-test-avoids-framework",
            description:
              "Treats A/B testing as somehow sidestepping the need for a defined population rather than pragmatically redefining one.",
            blameConceptId: "population-vs-sample",
          },
        },
      ],
    },
    difficulty: 0.6,
    discrimination: 1.3,
    expectedSeconds: 110,
    prereqClosure: ["population-vs-sample"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "population-vs-sample--transfer-contradictory-polls",
    conceptId: "population-vs-sample",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Two well-run polls released the same week report support at 47% and 52%. Neither made an arithmetic error and neither was unusually unlucky. Give a reason both can be correct.",
    rubric: {
      elements: [
        {
          id: "different-populations",
          description:
            "Identifies that the polls may have defined different populations — registered versus likely voters, say — and so estimated different true quantities.",
          weight: 3,
          required: true,
        },
        {
          id: "not-contradiction",
          description:
            "Concludes that two correct answers to two different questions is not a contradiction.",
          weight: 2,
          required: true,
        },
        {
          id: "check-methods",
          description:
            "Draws the practical lesson that comparing studies requires checking that the populations match.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.9,
    discrimination: 1.2,
    expectedSeconds: 110,
    prereqClosure: ["population-vs-sample"],
    source: AUTHORED,
    status: "live",
  },
  // =========================================================================
  // Parameter vs Statistic
  // =========================================================================
  {
    id: "parameter-vs-statistic--recall-notation",
    conceptId: "parameter-vs-statistic",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What is the standard notational convention for parameters and statistics?",
    choices: [
      { id: "a", text: "Greek letters for parameters, Latin letters (often hatted) for statistics", correct: true },
      {
        id: "b",
        text: "Latin letters for parameters, Greek letters for statistics",
        correct: false,
        misconception: {
          id: "reversed-notation",
          description: "Reverses the convention, so every formula reads backwards about which quantity is unknown.",
          blameConceptId: "parameter-vs-statistic",
        },
      },
      {
        id: "c",
        text: "Capitals for parameters, lowercase for statistics",
        correct: false,
        misconception: {
          id: "case-convention",
          description: "Case distinguishes random variables from realised values, which is a different distinction.",
          blameConceptId: "parameter-vs-statistic",
        },
      },
      {
        id: "d",
        text: "There is no convention; usage varies freely",
        correct: false,
        misconception: {
          id: "no-convention",
          description: "Misses that the notation itself signals which quantities are estimable.",
          blameConceptId: "parameter-vs-statistic",
        },
      },
    ],
    difficulty: -1.2,
    discrimination: 1.1,
    expectedSeconds: 25,
    prereqClosure: ["parameter-vs-statistic"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "parameter-vs-statistic--recall-which-is-fixed",
    conceptId: "parameter-vs-statistic",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Before a sample is drawn, which description is correct?",
    choices: [
      { id: "a", text: "The parameter is fixed; the statistic is random", correct: true },
      {
        id: "b",
        text: "Both are random",
        correct: false,
        misconception: {
          id: "parameter-random-frequentist",
          description: "Treats the population parameter as random. In this framework it is an unknown constant — which is exactly why a confidence interval cannot be given a probability interpretation about it.",
          blameConceptId: "parameter-vs-statistic",
        },
      },
      {
        id: "c",
        text: "Both are fixed",
        correct: false,
        misconception: {
          id: "statistic-fixed-before",
          description: "Misses that the statistic is a function of not-yet-realised data, and so has a distribution.",
          blameConceptId: "parameter-vs-statistic",
        },
      },
      {
        id: "d",
        text: "The parameter is random; the statistic is fixed",
        correct: false,
        misconception: {
          id: "fully-reversed",
          description: "Reverses both roles at once.",
          blameConceptId: "parameter-vs-statistic",
        },
      },
    ],
    difficulty: -0.9,
    discrimination: 1.3,
    expectedSeconds: 30,
    prereqClosure: ["parameter-vs-statistic", "population-vs-sample"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "parameter-vs-statistic--apply-classify",
    conceptId: "parameter-vs-statistic",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed"],
    stem: "Classify each as a parameter or a statistic: (a) the true defect proportion across a factory's annual output; (b) the defect proportion in a batch of 50 you inspected; (c) the mean height of all trees in a national park; (d) the mean height from a 200-tree survey of that park.",
    rubric: {
      elements: [
        { id: "a-param", description: "(a) parameter", weight: 1, required: true },
        { id: "b-stat", description: "(b) statistic", weight: 1, required: true },
        { id: "c-param", description: "(c) parameter", weight: 1, required: true },
        { id: "d-stat", description: "(d) statistic", weight: 1, required: true },
      ],
    },
    difficulty: -0.6,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["parameter-vs-statistic", "population-vs-sample"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "parameter-vs-statistic--apply-xbar-before-after",
    conceptId: "parameter-vs-statistic",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "Is the sample mean random or fixed before a sample of n = 30 is drawn? What about after it is computed? Explain both halves.",
    rubric: {
      elements: [
        {
          id: "before-random",
          description: "Before: a random variable, being a function of not-yet-realised data that would differ on a hypothetical repeat.",
          weight: 3,
          required: true,
        },
        {
          id: "after-fixed",
          description: "After: one specific number, fixed.",
          weight: 2,
          required: true,
        },
        {
          id: "repeat-framing",
          description: "Uses the hypothetical-repeat framing to justify the 'random' half rather than asserting it.",
          weight: 2,
        },
      ],
    },
    difficulty: -0.2,
    discrimination: 1.3,
    expectedSeconds: 85,
    prereqClosure: ["parameter-vs-statistic", "population-vs-sample"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "parameter-vs-statistic--explain-why-randomness-matters",
    conceptId: "parameter-vs-statistic",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Why is treating a statistic as a random variable, before data collection, essential rather than a technicality?",
    rubric: {
      elements: [
        {
          id: "gives-distribution",
          description: "Only a random quantity has a distribution — a centre, a spread, a shape.",
          weight: 3,
          required: true,
        },
        {
          id: "enables-precision",
          description: "That distribution is what lets us attach precision or uncertainty to a computed estimate.",
          weight: 3,
          required: true,
        },
        {
          id: "otherwise-nothing",
          description: "Without the framing there is no way to say how much to trust the number.",
          weight: 1,
        },
      ],
    },
    difficulty: 0.3,
    discrimination: 1.4,
    expectedSeconds: 90,
    prereqClosure: ["parameter-vs-statistic", "population-vs-sample"],
    source: WASSERMAN,
    status: "live",
  },
  {
    id: "parameter-vs-statistic--explain-close-vs-equal",
    conceptId: "parameter-vs-statistic",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Distinguish \"the sample mean is close to the population mean\" from \"the sample mean equals the population mean.\" Why does conflating them matter?",
    rubric: {
      elements: [
        {
          id: "estimate-with-error",
          description: "A statistic is an estimate carrying sampling variability, not an assertion of equality.",
          weight: 3,
          required: true,
        },
        {
          id: "overconfidence",
          description: "Treating the statistic as if it were the parameter, with no estimation error, is a root cause of statistical overconfidence.",
          weight: 3,
          required: true,
          misconception: {
            id: "statistic-is-parameter",
            description: "Silently drops the estimation error, reporting a best guess as though it were the truth.",
            blameConceptId: "parameter-vs-statistic",
          },
        },
      ],
    },
    difficulty: 0.5,
    discrimination: 1.3,
    expectedSeconds: 90,
    prereqClosure: ["parameter-vs-statistic", "population-vs-sample"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "parameter-vs-statistic--transfer-poll-no-margin",
    conceptId: "parameter-vs-statistic",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A news article reports \"the poll shows 52% support,\" with no margin of error. Using the parameter/statistic distinction, say what the 52% is and why the report is incomplete.",
    rubric: {
      elements: [
        {
          id: "names-statistic",
          description: "Names the 52% explicitly as a statistic, not merely as 'an estimate'.",
          weight: 3,
          required: true,
        },
        {
          id: "estimates-parameter",
          description: "States that it estimates the unknown parameter, true support in the defined population.",
          weight: 2,
          required: true,
        },
        {
          id: "implies-certainty",
          description: "Explains that reporting it alone implies a certainty about the parameter the data does not support.",
          weight: 2,
          required: true,
          misconception: {
            id: "poll-taken-at-face-value",
            description: "Treats the reported percentage as directly informative about the population with no further qualification needed.",
            blameConceptId: "parameter-vs-statistic",
          },
        },
      ],
    },
    difficulty: 0.8,
    discrimination: 1.3,
    expectedSeconds: 110,
    prereqClosure: ["parameter-vs-statistic", "population-vs-sample"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "parameter-vs-statistic--transfer-two-polls-same-parameter",
    conceptId: "parameter-vs-statistic",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Two polls of the same population, run identically on the same day, report 49% and 53%. Using only the parameter/statistic distinction, explain why this is expected rather than evidence that one is wrong.",
    rubric: {
      elements: [
        {
          id: "same-parameter",
          description: "Identifies that both estimate the same fixed parameter.",
          weight: 2,
          required: true,
        },
        {
          id: "statistics-vary",
          description: "Explains that statistics are random and vary from sample to sample, so two draws differing is the expected behaviour.",
          weight: 3,
          required: true,
        },
        {
          id: "spread-quantifiable",
          description: "Notes that how much they should differ is itself quantifiable, which is what makes the disagreement checkable rather than merely tolerated.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.0,
    discrimination: 1.2,
    expectedSeconds: 105,
    prereqClosure: ["parameter-vs-statistic", "population-vs-sample"],
    source: AUTHORED,
    status: "live",
  },

  // =========================================================================
  // Data Types
  // =========================================================================
  {
    id: "data-types--recall-four-types",
    conceptId: "data-types",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Name the four basic data types and give one example of each.",
    rubric: {
      elements: [
        { id: "nominal", description: "Nominal — unordered categories, e.g. eye colour or blood type.", weight: 2, required: true },
        { id: "ordinal", description: "Ordinal — ordered categories, e.g. T-shirt size or a 1–5 rating.", weight: 2, required: true },
        { id: "discrete", description: "Discrete quantitative — countable numbers, e.g. number of siblings.", weight: 2, required: true },
        { id: "continuous", description: "Continuous quantitative — measured on a continuum, e.g. height.", weight: 2, required: true },
      ],
    },
    difficulty: -1.2,
    discrimination: 1.0,
    expectedSeconds: 60,
    prereqClosure: ["data-types"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "data-types--recall-which-is-ordinal",
    conceptId: "data-types",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which of these is ordinal rather than nominal?",
    choices: [
      { id: "a", text: "T-shirt size (S, M, L, XL)", correct: true },
      {
        id: "b",
        text: "Blood type (A, B, AB, O)",
        correct: false,
        misconception: {
          id: "blood-type-ordered",
          description: "Reads a familiar category list as ordered. Blood types have no inherent ranking.",
          blameConceptId: "data-types",
        },
      },
      {
        id: "c",
        text: "Zip code",
        correct: false,
        misconception: {
          id: "numeric-label-as-ordered",
          description: "Mistakes a numeric-looking label for ordered quantitative data. Zip codes are nominal — the digits identify, they do not measure.",
          blameConceptId: "data-types",
        },
      },
      {
        id: "d",
        text: "Favourite programming language",
        correct: false,
        misconception: {
          id: "preference-as-ordered",
          description: "A preference among unordered options is still nominal.",
          blameConceptId: "data-types",
        },
      },
    ],
    difficulty: -0.9,
    discrimination: 1.2,
    expectedSeconds: 30,
    prereqClosure: ["data-types"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "data-types--apply-classify-four",
    conceptId: "data-types",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed"],
    stem: "Classify each: (a) number of siblings; (b) a 1–5 star satisfaction rating; (c) exact weight in kg; (d) favourite programming language.",
    rubric: {
      elements: [
        { id: "a", description: "(a) discrete quantitative", weight: 1, required: true },
        { id: "b", description: "(b) ordinal", weight: 1, required: true },
        { id: "c", description: "(c) continuous quantitative", weight: 1, required: true },
        { id: "d", description: "(d) nominal", weight: 1, required: true },
      ],
    },
    difficulty: -0.5,
    discrimination: 1.2,
    expectedSeconds: 55,
    prereqClosure: ["data-types"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "data-types--apply-average-zip-code",
    conceptId: "data-types",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "Computing the average zip code is arithmetically valid but produces a meaningless number. Explain why, and say what summary would be meaningful instead.",
    rubric: {
      elements: [
        {
          id: "labels-not-magnitudes",
          description: "Explains that nominal categories carry no ordering or magnitude — the digits are labels, so averaging them corresponds to no typical value.",
          weight: 3,
          required: true,
        },
        {
          id: "right-summary",
          description: "Offers a mode or a set of category proportions as the meaningful summary.",
          weight: 2,
          required: true,
        },
      ],
    },
    difficulty: -0.3,
    discrimination: 1.3,
    expectedSeconds: 75,
    prereqClosure: ["data-types"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "data-types--explain-ordinal-middle-ground",
    conceptId: "data-types",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Why does ordinal data sit awkwardly between nominal and quantitative? What specifically is uncertain about it?",
    rubric: {
      elements: [
        {
          id: "has-order",
          description: "It has a genuine order, unlike nominal data.",
          weight: 2,
          required: true,
        },
        {
          id: "gaps-unequal",
          description: "The gaps between adjacent categories are not necessarily equal or comparable — the 1→2 difference need not match 4→5.",
          weight: 3,
          required: true,
        },
        {
          id: "debated",
          description: "Notes this ambiguity is exactly why taking a mean of ordinal data is a debated practice rather than a settled error.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.3,
    discrimination: 1.3,
    expectedSeconds: 85,
    prereqClosure: ["data-types"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "data-types--explain-type-drives-method",
    conceptId: "data-types",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Name a specific statistical method that requires quantitative data, and say what goes wrong if it is applied to nominal categories anyway.",
    rubric: {
      elements: [
        {
          id: "names-method",
          description: "Names a real method — a standard deviation, a t-test, a regression coefficient — rather than saying 'some tests don't work'.",
          weight: 3,
          required: true,
        },
        {
          id: "computable-uninterpretable",
          description: "Explains the result is computable but uninterpretable, because the method assumes ordered, meaningfully-spaced values.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.5,
    discrimination: 1.2,
    expectedSeconds: 85,
    prereqClosure: ["data-types"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "data-types--transfer-average-opinion",
    conceptId: "data-types",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A researcher codes Disagree = 1, Neutral = 2, Agree = 3 and reports the average response, 2.3, as \"the average opinion.\" Critique this and propose a more defensible summary.",
    rubric: {
      elements: [
        {
          id: "equal-spacing-assumption",
          description: "Names the equal-spacing assumption specifically — that 2.3 implicitly asserts Neutral sits exactly halfway between Disagree and Agree.",
          weight: 3,
          required: true,
          misconception: {
            id: "accepts-coded-mean",
            description: "Accepts the 2.3 at face value without noticing that the numeric coding smuggled in an assumption about attitudes.",
            blameConceptId: "data-types",
          },
        },
        {
          id: "assumption-not-fact",
          description: "States that the assumption is a modelling choice, not a property of the coding.",
          weight: 2,
          required: true,
        },
        {
          id: "alternative",
          description: "Offers a concrete alternative — the median response, or the full distribution of category percentages.",
          weight: 2,
          required: true,
        },
      ],
    },
    difficulty: 0.9,
    discrimination: 1.3,
    expectedSeconds: 115,
    prereqClosure: ["data-types"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "data-types--transfer-continuous-recorded-discretely",
    conceptId: "data-types",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Height is continuous, yet it is always recorded to the nearest centimetre — a countable set of values. Does that make the recorded data discrete? Explain what the distinction is actually about.",
    rubric: {
      elements: [
        {
          id: "about-the-model",
          description: "Explains the distinction concerns the model you are entitled to use for the underlying quantity, not the precision of the recording instrument.",
          weight: 3,
          required: true,
          misconception: {
            id: "rounding-makes-discrete",
            description: "Concludes that finite measurement precision makes every real variable discrete, which would discard the continuous model everywhere.",
            blameConceptId: "data-types",
          },
        },
        {
          id: "still-continuous",
          description: "Concludes height is still treated as continuous, with rounding understood as measurement granularity.",
          weight: 2,
          required: true,
        },
      ],
    },
    difficulty: 1.1,
    discrimination: 1.1,
    expectedSeconds: 100,
    prereqClosure: ["data-types"],
    source: AUTHORED,
    status: "live",
  },

  // =========================================================================
  // Sampling Methods
  // =========================================================================
  {
    id: "sampling-methods--recall-simple-random-sample",
    conceptId: "sampling-methods",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What defines a simple random sample of size n?",
    choices: [
      { id: "a", text: "Every subset of size n is equally likely to be chosen", correct: true },
      {
        id: "b",
        text: "Every unit has some non-zero chance of being chosen",
        correct: false,
        misconception: {
          id: "srs-as-any-probability-sample",
          description: "Describes probability sampling in general. Stratified and cluster designs also give every unit a non-zero chance, yet are not simple random samples.",
          blameConceptId: "sampling-methods",
        },
      },
      {
        id: "c",
        text: "The sample was collected without any deliberate plan",
        correct: false,
        misconception: {
          id: "random-as-haphazard",
          description: "Confuses randomness with haphazardness. An unplanned sample is a convenience sample, which is the opposite of a designed random one.",
          blameConceptId: "sampling-methods",
        },
      },
      {
        id: "d",
        text: "The sample is large enough to represent the population",
        correct: false,
        misconception: {
          id: "srs-as-size",
          description: "Makes representativeness a matter of size rather than of selection mechanism.",
          blameConceptId: "sampling-methods",
        },
      },
    ],
    difficulty: -1.1,
    discrimination: 1.2,
    expectedSeconds: 30,
    prereqClosure: ["sampling-methods"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "sampling-methods--recall-stratified-vs-cluster",
    conceptId: "sampling-methods",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which best distinguishes stratified sampling from cluster sampling?",
    choices: [
      {
        id: "a",
        text: "Stratified samples within every group; cluster samples whole groups and measures everyone inside",
        correct: true,
      },
      {
        id: "b",
        text: "They are two names for the same design",
        correct: false,
        misconception: {
          id: "stratify-equals-cluster",
          description: "They look similar and pull in opposite directions: stratifying removes between-group variability, clustering retains within-group correlation.",
          blameConceptId: "sampling-methods",
        },
      },
      {
        id: "c",
        text: "Stratified is for people; cluster is for places",
        correct: false,
        misconception: {
          id: "design-by-subject-matter",
          description: "Picks the design by what is being sampled rather than by the structure of the selection.",
          blameConceptId: "sampling-methods",
        },
      },
      {
        id: "d",
        text: "Cluster sampling always gives smaller standard errors",
        correct: false,
        misconception: {
          id: "cluster-more-precise",
          description: "Backwards. Cluster sampling is cheaper but less precise per unit, because units inside a cluster are correlated.",
          blameConceptId: "sampling-methods",
        },
      },
    ],
    difficulty: -0.6,
    discrimination: 1.3,
    expectedSeconds: 40,
    prereqClosure: ["sampling-methods"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "sampling-methods--apply-identify-bias-type",
    conceptId: "sampling-methods",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "An online poll is posted on a company's website and 4,000 customers respond. Name two distinct ways this sample can systematically misrepresent the company's customers.",
    rubric: {
      elements: [
        {
          id: "frame-or-selection",
          description: "Names a selection or coverage problem — only customers who visit the site, and who are online, can be sampled at all.",
          weight: 3,
          required: true,
        },
        {
          id: "voluntary-response",
          description: "Names voluntary-response or non-response bias — people with strong opinions opt in at higher rates than the indifferent.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: -0.4,
    discrimination: 1.2,
    expectedSeconds: 80,
    prereqClosure: ["sampling-methods", "population-vs-sample"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "sampling-methods--apply-systematic-periodicity",
    conceptId: "sampling-methods",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "A factory inspects every 12th item off a line that cycles through 12 moulds in order. Why is this systematic sample a problem, and what is the general condition to watch for?",
    rubric: {
      elements: [
        {
          id: "same-mould",
          description: "Identifies that every inspected item comes from the same mould, so eleven moulds are never checked.",
          weight: 3,
          required: true,
        },
        {
          id: "period-alignment",
          description: "States the general condition: systematic sampling fails when the list has a period that aligns with the sampling interval.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.0,
    discrimination: 1.3,
    expectedSeconds: 85,
    prereqClosure: ["sampling-methods"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "sampling-methods--explain-bias-vs-size",
    conceptId: "sampling-methods",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "A colleague proposes fixing a systematically unrepresentative survey by collecting ten times more responses the same way. Explain why this does not work.",
    rubric: {
      elements: [
        {
          id: "bias-does-not-shrink",
          description: "Explains that a systematic misrepresentation does not shrink as more data is collected the same way — it is a property of the selection mechanism, not of the count.",
          weight: 3,
          required: true,
          misconception: {
            id: "size-fixes-bias",
            description: "Believes a large enough sample is representative by virtue of size, conflating random error with systematic error.",
            blameConceptId: "sampling-methods",
          },
        },
        {
          id: "confidently-wrong",
          description: "Notes the estimate becomes more precise around the wrong value, so more data makes the study more confidently wrong.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.4,
    discrimination: 1.4,
    expectedSeconds: 90,
    prereqClosure: ["sampling-methods", "population-vs-sample"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "sampling-methods--explain-cannot-inspect-data",
    conceptId: "sampling-methods",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Why can you not verify that a sample was drawn properly by examining the collected data itself? What does this imply about how studies should be read?",
    rubric: {
      elements: [
        {
          id: "bias-invisible",
          description: "Explains that a biased sample looks perfectly ordinary — the numbers carry no record of who was excluded.",
          weight: 3,
          required: true,
        },
        {
          id: "established-by-design",
          description: "States the assumption is established by how the sample was drawn, not by any property of the values.",
          weight: 3,
          required: true,
        },
        {
          id: "methods-section",
          description: "Concludes that the methods section carries more weight than the results section.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.7,
    discrimination: 1.3,
    expectedSeconds: 95,
    prereqClosure: ["sampling-methods", "population-vs-sample"],
    source: WASSERMAN,
    status: "live",
  },
  {
    id: "sampling-methods--transfer-literary-digest",
    conceptId: "sampling-methods",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "In 1936 a magazine mailed 10 million ballots, received 2.4 million back, and confidently predicted the wrong presidential winner. Explain how a sample that large could fail so badly.",
    rubric: {
      elements: [
        {
          id: "frame-skewed",
          description: "Identifies a skewed sampling frame — lists drawn from telephone and car registrations over-represented the wealthy in 1936.",
          weight: 3,
          required: true,
        },
        {
          id: "nonresponse",
          description: "Notes that a 24% return rate compounds the problem, since responders differ systematically from non-responders.",
          weight: 2,
        },
        {
          id: "precision-not-accuracy",
          description: "Draws the distinction: 2.4 million responses buy extraordinary precision around a biased centre. Precision comes from n, accuracy from the design.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.9,
    discrimination: 1.4,
    expectedSeconds: 120,
    prereqClosure: ["sampling-methods", "population-vs-sample"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "sampling-methods--transfer-convenience-sample-honest",
    conceptId: "sampling-methods",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Most real datasets — web analytics, clinical volunteers, scraped corpora — are convenience samples. Are they therefore useless? Say what such a study can honestly claim.",
    rubric: {
      elements: [
        {
          id: "not-useless",
          description: "States they are not useless — they can still be informative.",
          weight: 2,
          required: true,
        },
        {
          id: "narrower-population",
          description: "Identifies the population as something like 'units that ended up in this dataset', rather than the broader group one might wish to describe.",
          weight: 3,
          required: true,
        },
        {
          id: "state-it",
          description: "Concludes the write-up should state that narrowing rather than quietly generalising past it.",
          weight: 2,
          required: true,
        },
      ],
    },
    difficulty: 1.1,
    discrimination: 1.2,
    expectedSeconds: 110,
    prereqClosure: ["sampling-methods", "population-vs-sample"],
    source: AUTHORED,
    status: "live",
  },

  // =========================================================================
  // Sample Mean
  // =========================================================================
  {
    id: "sample-mean--recall-unbiased",
    conceptId: "sample-mean",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "State E[X̄] for an i.i.d. sample with population mean μ, and say which property of expectation the result depends on.",
    rubric: {
      elements: [
        { id: "value", description: "E[X̄] = μ, so X̄ is unbiased for μ.", weight: 3, required: true },
        {
          id: "linearity",
          description: "Notes it follows from linearity of expectation alone, so no independence assumption is needed for this half.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: -0.7,
    discrimination: 1.2,
    expectedSeconds: 55,
    prereqClosure: ["sample-mean", "expectation"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "sample-mean--explain-least-squares",
    conceptId: "sample-mean",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem: "Show that X̄ is the value of c minimising Σ(Xᵢ − c)², and state one consequence of that fact.",
    rubric: {
      elements: [
        {
          id: "differentiate",
          description: "Differentiates with respect to c to get −2Σ(Xᵢ − c) and sets it to zero.",
          weight: 3,
          required: true,
        },
        {
          id: "solve",
          description: "Solves to c = ΣXᵢ/n = X̄.",
          weight: 2,
          required: true,
        },
        {
          id: "second-order",
          description: "Confirms it is a minimum, the second derivative being 2n > 0.",
          weight: 1,
        },
        {
          id: "consequence",
          description: "Names a consequence — residuals from the mean sum to zero, or this is why the sample variance divides by n − 1.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.3,
    discrimination: 1.3,
    expectedSeconds: 130,
    prereqClosure: ["sample-mean", "expectation"],
    source: CASELLA_BERGER,
    status: "live",
  },
  {
    id: "sample-mean--transfer-breakdown-point",
    conceptId: "sample-mean",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Incomes in thousands are 40, 45, 48, 52, 55. A sixth person earning 5,000 joins. Compute the new mean, compare it to the median, and say which summary answers \"what does a typical person earn.\"",
    rubric: {
      elements: [
        {
          id: "computes-mean",
          description: "Computes the new mean as (240 + 5000)/6 ≈ 873.3.",
          weight: 2,
          required: true,
        },
        {
          id: "mean-exceeds-most",
          description: "Observes the mean now exceeds five of the six observations.",
          weight: 2,
          required: true,
        },
        {
          id: "median-robust",
          description: "Notes the median moves only from 50 to 51.5.",
          weight: 2,
        },
        {
          id: "which-answers-what",
          description: "Concludes the median answers 'typical', while the mean remains correct for totals — a mean is not wrong here, it is answering a different question.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.8,
    discrimination: 1.3,
    expectedSeconds: 130,
    prereqClosure: ["sample-mean", "expectation"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "sample-mean--transfer-when-mean-is-right",
    conceptId: "sample-mean",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Salary data is right-skewed, so a colleague proposes always reporting the median. Give a concrete question about the same data that the median cannot answer and the mean can.",
    rubric: {
      elements: [
        {
          id: "totals",
          description: "Identifies a question about a total — the payroll budget is n × X̄, and no median yields it.",
          weight: 3,
          required: true,
          misconception: {
            id: "median-always-better-when-skewed",
            description: "Takes skewness alone as the criterion, when the criterion is what question is being asked.",
            blameConceptId: "sample-mean",
          },
        },
        {
          id: "criterion",
          description: "States the general rule: choose by the question — mean for totals and aggregates, median for a typical case.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.0,
    discrimination: 1.2,
    expectedSeconds: 105,
    prereqClosure: ["sample-mean", "expectation"],
    source: AUTHORED,
    status: "live",
  },

  {
    id: "sample-mean--recall-definition",
    conceptId: "sample-mean",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which expression defines the sample mean of observations X₁, …, Xₙ?",
    choices: [
      { id: "a", text: "(1/n) Σᵢ Xᵢ", correct: true },
      {
        id: "b",
        text: "Σᵢ Xᵢ",
        correct: false,
        misconception: {
          id: "mean-as-sum",
          description: "Gives the total rather than the average — the 1/n is what makes the quantity comparable across samples of different sizes.",
          blameConceptId: "sample-mean",
        },
      },
      {
        id: "c",
        text: "The middle value once the observations are sorted",
        correct: false,
        misconception: {
          id: "mean-as-median",
          description: "Defines the median. The two coincide for symmetric data and diverge sharply for skewed data.",
          blameConceptId: "sample-mean",
        },
      },
      {
        id: "d",
        text: "(1/(n − 1)) Σᵢ Xᵢ",
        correct: false,
        misconception: {
          id: "n-minus-1-for-mean",
          description: "Imports the sample-variance divisor. No degree of freedom has been spent yet — the mean is the thing being estimated, not a residual from it.",
          blameConceptId: "sample-mean",
        },
      },
    ],
    difficulty: -1.4,
    discrimination: 1.1,
    expectedSeconds: 20,
    prereqClosure: ["sample-mean"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "sample-mean--apply-compute",
    conceptId: "sample-mean",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem: "Compute the sample mean of 12, 15, 15, 18, 20.",
    answerKey: 16,
    tolerance: 0.02,
    difficulty: -1,
    discrimination: 1.1,
    expectedSeconds: 35,
    prereqClosure: ["sample-mean"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "sample-mean--apply-shift-and-scale",
    conceptId: "sample-mean",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem: "A dataset has sample mean 16. Every observation is then doubled and 3 is subtracted from each. What is the new sample mean?",
    answerKey: 29,
    tolerance: 0.02,
    difficulty: -0.4,
    discrimination: 1.2,
    expectedSeconds: 45,
    prereqClosure: ["sample-mean", "expectation"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "sample-mean--explain-unbiased-without-independence",
    conceptId: "sample-mean",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "E[X̄] = μ holds even when the observations are dependent — for instance, when consecutive measurements from a drifting instrument are correlated. Explain why dependence cannot break this result.",
    rubric: {
      elements: [
        {
          id: "linearity-unconditional",
          description: "States that expectation is linear for any random variables, so E[ΣXᵢ] = ΣE[Xᵢ] regardless of how they are related.",
          weight: 3,
          required: true,
          misconception: {
            id: "linearity-needs-independence",
            description: "Attaches an independence condition to linearity of expectation, which is the one rule that never needs it — and so hedges on the most broadly usable tool in the subject.",
            blameConceptId: "sample-mean",
          },
        },
        {
          id: "each-term-mu",
          description: "Notes each term contributes μ, so the sum is nμ and dividing by n returns μ.",
          weight: 2,
          required: true,
        },
        {
          id: "what-does-break",
          description: "Distinguishes what dependence does break: how far a typical X̄ strays from μ, which is a separate question from where it is centred.",
          weight: 3,
        },
      ],
    },
    difficulty: 0.5,
    discrimination: 1.4,
    expectedSeconds: 100,
    prereqClosure: ["sample-mean", "expectation"],
    source: AUTHORED,
    status: "live",
  },
  // =========================================================================
  // Sample Variance
  // =========================================================================
  {
    id: "sample-variance--recall-divisor",
    conceptId: "sample-variance",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "The sample variance s² divides the sum of squared deviations by which quantity, and why?",
    choices: [
      { id: "a", text: "n − 1, because estimating the mean from the same data consumed one degree of freedom", correct: true },
      {
        id: "b",
        text: "n, because there are n observations",
        correct: false,
        misconception: {
          id: "divide-by-n",
          description: "Gives the maximum-likelihood estimator, which is biased low at every sample size because deviations are taken from X̄ rather than from the unknown μ.",
          blameConceptId: "sample-variance",
        },
      },
      {
        id: "c",
        text: "n − 1, purely as a small-sample correction that stops mattering for large n",
        correct: false,
        misconception: {
          id: "n-minus-1-as-fudge",
          description: "Treats an exact unbiasedness result as an approximation. E[s²] = σ² holds at every n, not just asymptotically.",
          blameConceptId: "sample-variance",
        },
      },
      {
        id: "d",
        text: "n − 2, matching the two moments being estimated",
        correct: false,
        misconception: {
          id: "n-minus-2",
          description: "Only the mean was estimated to form the residuals, so exactly one degree of freedom is spent.",
          blameConceptId: "sample-variance",
        },
      },
    ],
    difficulty: -0.8,
    discrimination: 1.4,
    expectedSeconds: 40,
    prereqClosure: ["sample-variance", "sample-mean", "variance"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "sample-variance--recall-residuals-sum-to-zero",
    conceptId: "sample-variance",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "How many of the n residuals Xᵢ − X̄ are free to vary once X̄ is computed from the same data?",
    choices: [
      { id: "a", text: "n − 1, because they must sum to zero", correct: true },
      {
        id: "b",
        text: "All n, since each observation is separate",
        correct: false,
        misconception: {
          id: "residuals-all-free",
          description: "Misses the constraint Σ(Xᵢ − X̄) = 0, which is what makes the last residual determined by the others.",
          blameConceptId: "sample-variance",
        },
      },
      {
        id: "c",
        text: "n − 2",
        correct: false,
        misconception: {
          id: "two-constraints",
          description: "Counts a second constraint that is not there — only the mean was estimated.",
          blameConceptId: "sample-variance",
        },
      },
      {
        id: "d",
        text: "It depends on the distribution",
        correct: false,
        misconception: {
          id: "df-distributional",
          description: "The count is algebraic, following from the definition of X̄, not from any distributional assumption.",
          blameConceptId: "sample-variance",
        },
      },
    ],
    difficulty: -0.4,
    discrimination: 1.3,
    expectedSeconds: 35,
    prereqClosure: ["sample-variance", "sample-mean"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "sample-variance--apply-compute",
    conceptId: "sample-variance",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem: "Compute the sample variance s² of the data 2, 4, 4, 4, 6.",
    answerKey: 2,
    tolerance: 0.02,
    difficulty: -0.3,
    discrimination: 1.3,
    expectedSeconds: 70,
    prereqClosure: ["sample-variance", "sample-mean"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "sample-variance--apply-both-divisors",
    conceptId: "sample-variance",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem: "For the data 2, 4, 4, 4, 6, the sum of squared deviations from the mean is 8. What value results from dividing by n instead of n − 1?",
    answerKey: 1.6,
    tolerance: 0.02,
    difficulty: 0.0,
    discrimination: 1.2,
    expectedSeconds: 45,
    prereqClosure: ["sample-variance", "sample-mean"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "sample-variance--explain-why-deviations-too-small",
    conceptId: "sample-variance",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Explain why Σ(Xᵢ − X̄)² is systematically smaller than Σ(Xᵢ − μ)², without appealing to degrees of freedom.",
    rubric: {
      elements: [
        {
          id: "xbar-minimises",
          description: "States that X̄ is by construction the value minimising Σ(Xᵢ − c)² over all c.",
          weight: 3,
          required: true,
        },
        {
          id: "strict-inequality",
          description: "Concludes the sum from X̄ is no larger than the sum from μ, and strictly smaller whenever X̄ ≠ μ — which is almost always.",
          weight: 3,
          required: true,
        },
        {
          id: "hence-biased",
          description: "Draws the conclusion that dividing that too-small sum by n inherits the downward bias.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.4,
    discrimination: 1.4,
    expectedSeconds: 100,
    prereqClosure: ["sample-variance", "sample-mean"],
    source: CASELLA_BERGER,
    status: "live",
  },
  {
    id: "sample-variance--explain-s-not-unbiased-for-sigma",
    conceptId: "sample-variance",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "s² is unbiased for σ². Is s unbiased for σ? Justify your answer.",
    rubric: {
      elements: [
        {
          id: "no",
          description: "Answers no — s is biased low for σ.",
          weight: 2,
          required: true,
          misconception: {
            id: "unbiasedness-survives-sqrt",
            description: "Assumes unbiasedness is preserved by taking a square root, when it is not preserved by any nonlinear transformation.",
            blameConceptId: "sample-variance",
          },
        },
        {
          id: "jensen",
          description: "Justifies it by concavity of the square root: E[√(s²)] < √(E[s²]) = σ.",
          weight: 3,
          required: true,
        },
        {
          id: "general-lesson",
          description: "States the general lesson that unbiasedness does not survive nonlinear transformation.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.7,
    discrimination: 1.3,
    expectedSeconds: 95,
    prereqClosure: ["sample-variance", "expectation", "variance"],
    source: CASELLA_BERGER,
    status: "live",
  },
  {
    id: "sample-variance--transfer-ddof-mismatch",
    conceptId: "sample-variance",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A Python script reports a standard deviation of 1.43 for a 5-point dataset; an R script reports 1.60 for the same numbers. Neither has a bug. Explain the discrepancy and say which is larger and why.",
    rubric: {
      elements: [
        {
          id: "ddof",
          description: "Identifies the differing divisor convention — NumPy defaults to dividing by n, R to n − 1.",
          weight: 3,
          required: true,
        },
        {
          id: "which-larger",
          description: "States that the n − 1 version is larger, since dividing by a smaller number gives a bigger result, so R's 1.60 is the unbiased one.",
          weight: 3,
          required: true,
        },
        {
          id: "matters-at-small-n",
          description: "Notes the gap is (n − 1)/n and so matters most exactly when data is scarcest.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.9,
    discrimination: 1.2,
    expectedSeconds: 110,
    prereqClosure: ["sample-variance", "sample-mean"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "sample-variance--transfer-df-generalises",
    conceptId: "sample-variance",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A model estimates p parameters from the data before computing residuals. By analogy with the n − 1 in s², what divisor should its residual variance use, and why?",
    rubric: {
      elements: [
        {
          id: "n-minus-p",
          description: "Gives n − p.",
          weight: 3,
          required: true,
        },
        {
          id: "same-accounting",
          description: "Explains it is the same accounting: each estimated parameter imposes one linear constraint on the residuals, so p of them are no longer free.",
          weight: 3,
          required: true,
        },
        {
          id: "s2-is-special-case",
          description: "Notes s² is the p = 1 case, the single parameter being the mean.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.2,
    discrimination: 1.3,
    expectedSeconds: 110,
    prereqClosure: ["sample-variance", "sample-mean", "variance"],
    source: AUTHORED,
    status: "live",
  },
];
