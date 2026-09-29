import type { Item, SourceRef } from "../../lib/assessment/types";

/**
 * `family-wise-error-rate` and `false-discovery-rate` — the two error rates
 * `multiple-testing` introduces side by side, each taken a level deeper: weak
 * versus strong control, step-down versus step-up, what each procedure assumes
 * about dependence, and adjusted p-values / q-values. Eight items per concept,
 * two at each cognitive level.
 */
const AUTHORED: SourceRef = {
  id: "mathlingo-authored-multiple-testing",
  tier: "generated",
  title: "Mathlingo authored item (multiple testing error rates)",
};

const FWER = ["family-wise-error-rate", "multiple-testing", "p-value", "type-i-ii-error"];
const FDR = ["false-discovery-rate", "family-wise-error-rate", "multiple-testing", "p-value", "type-i-ii-error"];

export const multipleTestingErrorRateItems: Item[] = [
  // --- family-wise-error-rate ------------------------------------------------
  {
    id: "family-wise-error-rate--recall-definition",
    conceptId: "family-wise-error-rate",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Among $m$ hypothesis tests, let $V$ be the number of true null hypotheses that are rejected. The family-wise error rate is:",
    choices: [
      { id: "a", text: "$P(V \\ge 1)$ — the probability of at least one false rejection", correct: true },
      {
        id: "b",
        text: "$\\mathbb{E}[V/\\max(R, 1)]$ — the expected share of rejections that are false",
        correct: false,
        misconception: {
          id: "fwer-confused-with-fdr",
          description: "Gives the false discovery rate, a different and weaker error rate.",
          blameConceptId: "multiple-testing",
        },
      },
      {
        id: "c",
        text: "The significance level $\\alpha$ used for each individual test",
        correct: false,
        misconception: {
          id: "fwer-per-comparison",
          description: "Confuses the per-comparison error rate with the error rate of the whole family.",
          blameConceptId: "multiple-testing",
        },
      },
      {
        id: "d",
        text: "$\\mathbb{E}[V]$ — the expected number of false rejections",
        correct: false,
        misconception: {
          id: "fwer-expected-count",
          description: "Gives the per-family error rate; FWER is the probability that the count is at least one, not its mean.",
          blameConceptId: "family-wise-error-rate",
        },
      },
    ],
    difficulty: -0.9,
    discrimination: 1.2,
    expectedSeconds: 35,
    prereqClosure: FWER,
    source: AUTHORED,
    status: "live",
  },
  {
    id: "family-wise-error-rate--recall-weak-vs-strong",
    conceptId: "family-wise-error-rate",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Distinguish weak from strong control of the family-wise error rate, and say which one licenses reporting the individual hypotheses you rejected.",
    rubric: {
      elements: [
        { id: "weak", description: "Weak control: $\\text{FWER} \\le \\alpha$ only when all null hypotheses are true.", weight: 3, required: true },
        { id: "strong", description: "Strong control: $\\text{FWER} \\le \\alpha$ under every configuration of true and false nulls.", weight: 3, required: true },
        { id: "licence", description: "Only strong control justifies claiming the specific rejected hypotheses are real effects.", weight: 2 },
      ],
    },
    difficulty: -0.5,
    discrimination: 1.2,
    expectedSeconds: 70,
    prereqClosure: FWER,
    source: AUTHORED,
    status: "live",
  },
  {
    id: "family-wise-error-rate--apply-holm-count",
    conceptId: "family-wise-error-rate",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Five tests give sorted p-values $0.003, 0.009, 0.014, 0.020, 0.300$. How many hypotheses does Holm's " +
      "procedure reject at $\\alpha = 0.05$? Give a whole number.",
    answerKey: 4,
    tolerance: 0.001,
    difficulty: 0.1,
    discrimination: 1.2,
    expectedSeconds: 90,
    prereqClosure: FWER,
    source: AUTHORED,
    status: "live",
  },
  {
    id: "family-wise-error-rate--apply-sidak-level",
    conceptId: "family-wise-error-rate",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "For $m = 20$ independent tests and a family-wise level of $\\alpha = 0.05$, compute the Šidák per-test " +
      "significance level $1 - (1 - \\alpha)^{1/m}$. Give your answer to $5$ decimal places.",
    answerKey: 0.002561,
    tolerance: 0.00002,
    difficulty: 0.2,
    discrimination: 1.2,
    expectedSeconds: 80,
    prereqClosure: FWER,
    source: AUTHORED,
    status: "live",
  },
  {
    id: "family-wise-error-rate--explain-holm-still-controls",
    conceptId: "family-wise-error-rate",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Holm's procedure uses thresholds $\\alpha/m, \\alpha/(m-1), \\ldots, \\alpha$ — larger than Bonferroni's after the " +
      "first step. Explain why it still controls the family-wise error rate strongly, with no independence assumption.",
    rubric: {
      elements: [
        { id: "first-null", description: "Consider the first true null in the sorted order. At most $m - m_0$ hypotheses come before it, so it is compared with a threshold of at most $\\alpha/m_0$.", weight: 4, required: true },
        { id: "union-bound", description: "A false rejection requires some true null with $p_i \\le \\alpha/m_0$; by the union bound over the $m_0$ true nulls this has probability at most $m_0 \\cdot \\alpha/m_0 = \\alpha$, with no dependence assumption.", weight: 4, required: true },
      ],
    },
    difficulty: 0.7,
    discrimination: 1.2,
    expectedSeconds: 150,
    prereqClosure: FWER,
    source: AUTHORED,
    status: "live",
  },
  {
    id: "family-wise-error-rate--explain-hochberg-assumption",
    conceptId: "family-wise-error-rate",
    format: "mcq",
    cognitive: "explain",
    channels: ["typed"],
    stem: "Hochberg's step-up procedure uses the same thresholds as Holm but can reject more. What does it pay for the extra power?",
    choices: [
      { id: "a", text: "It needs the tests to be independent or positively dependent; under arbitrary dependence its FWER guarantee can fail", correct: true },
      {
        id: "b",
        text: "Nothing — it dominates Holm under every dependence structure",
        correct: false,
        misconception: {
          id: "hochberg-free-lunch",
          description: "Misses that Hochberg's proof relies on the Simes inequality, which needs independence or positive dependence.",
          blameConceptId: "family-wise-error-rate",
        },
      },
      {
        id: "c",
        text: "It only controls FWER weakly",
        correct: false,
        misconception: {
          id: "hochberg-weak-only",
          description: "Under its assumptions Hochberg controls FWER strongly; the cost is the assumption, not the type of control.",
          blameConceptId: "family-wise-error-rate",
        },
      },
      {
        id: "d",
        text: "It controls the false discovery rate instead of the family-wise error rate",
        correct: false,
        misconception: {
          id: "hochberg-is-fdr",
          description: "Confuses Hochberg's step-up FWER procedure with Benjamini–Hochberg's FDR procedure, which uses linearly growing thresholds.",
          blameConceptId: "multiple-testing",
        },
      },
    ],
    difficulty: 0.6,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: FWER,
    source: AUTHORED,
    status: "live",
  },
  {
    id: "family-wise-error-rate--transfer-clinical-endpoints",
    conceptId: "family-wise-error-rate",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A confirmatory drug trial has $3$ primary endpoints (any one would support approval) and $12$ exploratory " +
      "secondary endpoints. Recommend how to handle multiplicity for each group, and justify the choice of error rate.",
    rubric: {
      elements: [
        { id: "primary", description: "Primary endpoints: strong FWER control (e.g. Holm, or a pre-specified hierarchical/gatekeeping order), because each rejection becomes a regulatory claim and a single false claim is costly.", weight: 4, required: true },
        { id: "secondary", description: "Secondary endpoints: either tested only after primaries succeed (gatekeeping) or reported with FDR control / as exploratory, since they generate hypotheses rather than claims.", weight: 3 },
        { id: "prespecify", description: "The procedure must be pre-specified before unblinding.", weight: 1 },
      ],
    },
    difficulty: 0.9,
    discrimination: 1.2,
    expectedSeconds: 150,
    prereqClosure: FWER,
    source: AUTHORED,
    status: "live",
  },
  {
    id: "family-wise-error-rate--transfer-many-metrics",
    conceptId: "family-wise-error-rate",
    format: "mcq",
    cognitive: "transfer",
    channels: ["typed"],
    stem:
      "An experimentation platform tracks $200$ metrics per A/B test and applies Bonferroni at $\\alpha = 0.05$. Teams " +
      "complain it almost never flags anything. What is the most defensible change?",
    choices: [
      { id: "a", text: "Control the false discovery rate instead, since flagged metrics are leads to investigate rather than final claims", correct: true },
      {
        id: "b",
        text: "Drop the correction and test each metric at $\\alpha = 0.05$",
        correct: false,
        misconception: {
          id: "fwer-drop-correction",
          description: "With $200$ uncorrected tests about $10$ false flags are expected per experiment even when nothing changes.",
          blameConceptId: "multiple-testing",
        },
      },
      {
        id: "c",
        text: "Report only the metrics that came out significant, so $m$ is smaller",
        correct: false,
        misconception: {
          id: "fwer-hide-tests",
          description: "The multiplicity is set by the number of tests run, not reported; hiding tests does not remove the problem.",
          blameConceptId: "multiple-testing",
        },
      },
      {
        id: "d",
        text: "Switch from Bonferroni to Šidák, which is much less conservative",
        correct: false,
        misconception: {
          id: "fwer-sidak-much-better",
          description: "Šidák's per-test level is only marginally larger than Bonferroni's; it cannot rescue power at $m = 200$.",
          blameConceptId: "family-wise-error-rate",
        },
      },
    ],
    difficulty: 0.8,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: FWER,
    source: AUTHORED,
    status: "live",
  },

  // --- false-discovery-rate ----------------------------------------------------
  {
    id: "false-discovery-rate--recall-definition",
    conceptId: "false-discovery-rate",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "With $V$ false rejections out of $R$ total rejections, the false discovery rate is:",
    choices: [
      { id: "a", text: "$\\mathbb{E}[V/\\max(R, 1)]$", correct: true },
      {
        id: "b",
        text: "$P(V \\ge 1)$",
        correct: false,
        misconception: {
          id: "fdr-confused-with-fwer",
          description: "Gives the family-wise error rate.",
          blameConceptId: "family-wise-error-rate",
        },
      },
      {
        id: "c",
        text: "$V/R$ in the study at hand",
        correct: false,
        misconception: {
          id: "fdr-realised-proportion",
          description: "Gives the realised false discovery proportion, which is random and unobservable; FDR is its expectation.",
          blameConceptId: "false-discovery-rate",
        },
      },
      {
        id: "d",
        text: "$P(\\text{a rejected hypothesis is null})$ for each test separately at level $\\alpha$",
        correct: false,
        misconception: {
          id: "fdr-per-test",
          description: "Treats FDR as a per-test property rather than a property of the whole set of rejections.",
          blameConceptId: "multiple-testing",
        },
      },
    ],
    difficulty: -0.9,
    discrimination: 1.2,
    expectedSeconds: 35,
    prereqClosure: FDR,
    source: AUTHORED,
    status: "live",
  },
  {
    id: "false-discovery-rate--recall-bh-steps",
    conceptId: "false-discovery-rate",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "State the Benjamini–Hochberg procedure for controlling the false discovery rate at level $q$ over $m$ tests.",
    rubric: {
      elements: [
        { id: "sort", description: "Sort the p-values $p_{(1)} \\le \\cdots \\le p_{(m)}$.", weight: 2, required: true },
        { id: "largest-k", description: "Find the largest $k$ with $p_{(k)} \\le kq/m$.", weight: 3, required: true },
        { id: "reject", description: "Reject the hypotheses with the $k$ smallest p-values (all ranks $1, \\ldots, k$).", weight: 3, required: true },
      ],
    },
    difficulty: -0.6,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: FDR,
    source: AUTHORED,
    status: "live",
  },
  {
    id: "false-discovery-rate--apply-bh-count",
    conceptId: "false-discovery-rate",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Ten tests give sorted p-values $0.002, 0.009, 0.015, 0.031, 0.048, 0.061, 0.120, 0.300, 0.550, 0.900$. " +
      "How many hypotheses does Benjamini–Hochberg reject at $q = 0.10$? Give a whole number.",
    answerKey: 5,
    tolerance: 0.001,
    difficulty: 0.1,
    discrimination: 1.2,
    expectedSeconds: 100,
    prereqClosure: FDR,
    source: AUTHORED,
    status: "live",
  },
  {
    id: "false-discovery-rate--apply-by-factor",
    conceptId: "false-discovery-rate",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "The Benjamini–Yekutieli procedure runs BH at level $q/c(m)$ with $c(m) = \\sum_{i=1}^{m} 1/i$. Compute $c(m)$ " +
      "for $m = 4$, to $3$ decimal places.",
    answerKey: 2.0833,
    tolerance: 0.002,
    difficulty: 0.0,
    discrimination: 1.2,
    expectedSeconds: 50,
    prereqClosure: FDR,
    source: AUTHORED,
    status: "live",
  },
  {
    id: "false-discovery-rate--explain-equals-fwer-under-global-null",
    conceptId: "false-discovery-rate",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Show that when every null hypothesis is true, the false discovery rate equals the family-wise error rate, and " +
      "explain why the two diverge once some effects are real.",
    rubric: {
      elements: [
        { id: "global-null", description: "If all nulls are true then every rejection is false, so $V = R$ and $\\text{FDP} = 1$ whenever $R \\ge 1$ (and $0$ otherwise); hence $\\text{FDR} = P(V \\ge 1) = \\text{FWER}$.", weight: 4, required: true },
        { id: "diverge", description: "With real effects, true discoveries enlarge $R$ and dilute the ratio $V/R$, so $\\text{FDR} \\le \\text{FWER}$ and an FDR procedure can afford more rejections.", weight: 3, required: true },
      ],
    },
    difficulty: 0.5,
    discrimination: 1.2,
    expectedSeconds: 120,
    prereqClosure: FDR,
    source: AUTHORED,
    status: "live",
  },
  {
    id: "false-discovery-rate--explain-step-up",
    conceptId: "false-discovery-rate",
    format: "mcq",
    cognitive: "explain",
    channels: ["typed"],
    stem:
      "Five tests give sorted p-values $0.005, 0.025, 0.029, 0.600, 0.900$. At $q = 0.05$ the BH lines are $0.01, " +
      "0.02, 0.03, 0.04, 0.05$. The second p-value ($0.025$) is above its own line. Is its hypothesis rejected?",
    choices: [
      { id: "a", text: "Yes — BH is step-up: the largest $k$ under its line is $k = 3$, and every hypothesis ranked $1$ to $3$ is rejected", correct: true },
      {
        id: "b",
        text: "No — each hypothesis is rejected only if its own p-value is under its own line",
        correct: false,
        misconception: {
          id: "bh-pointwise",
          description: "Applies the thresholds point by point; BH rejects everything up to the largest rank that falls under the line.",
          blameConceptId: "false-discovery-rate",
        },
      },
      {
        id: "c",
        text: "No — the procedure stops at the first p-value above its line, so only $1$ hypothesis is rejected",
        correct: false,
        misconception: {
          id: "bh-step-down",
          description: "Runs BH as a step-down procedure (as Holm is run); BH scans from the largest p-value down.",
          blameConceptId: "family-wise-error-rate",
        },
      },
      {
        id: "d",
        text: "Yes — but only because $0.025 < 0.05$",
        correct: false,
        misconception: {
          id: "bh-uncorrected",
          description: "Compares with the unadjusted level; the rejection follows from the step-up rule, not from $p < q$.",
          blameConceptId: "multiple-testing",
        },
      },
    ],
    difficulty: 0.5,
    discrimination: 1.2,
    expectedSeconds: 75,
    prereqClosure: FDR,
    source: AUTHORED,
    status: "live",
  },
  {
    id: "false-discovery-rate--transfer-q-values",
    conceptId: "false-discovery-rate",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A genome-wide study of $20{,}000$ genes reports q-values, and $400$ genes have $q \\le 0.05$. A reader says " +
      "‘gene X has $q = 0.04$, so there is a $4\\%$ chance it is a false positive.’ Correct the reading, and say what " +
      "the list of $400$ tells you.",
    rubric: {
      elements: [
        { id: "q-meaning", description: "A q-value is the smallest FDR level at which gene X would be called significant — a property of the list obtained by thresholding there, not the probability that gene X itself is null (that is the local false discovery rate).", weight: 4, required: true },
        { id: "list", description: "Among the $400$ genes with $q \\le 0.05$, about $5\\%$ — roughly $20$ — are expected to be false discoveries, without knowing which ones.", weight: 3, required: true },
      ],
    },
    difficulty: 0.9,
    discrimination: 1.2,
    expectedSeconds: 140,
    prereqClosure: FDR,
    source: AUTHORED,
    status: "live",
  },
  {
    id: "false-discovery-rate--transfer-dependence",
    conceptId: "false-discovery-rate",
    format: "mcq",
    cognitive: "transfer",
    channels: ["typed"],
    stem:
      "An analyst tests many overlapping ratio metrics whose test statistics can be negatively correlated in ways " +
      "that are hard to characterise. Which procedure guarantees FDR control at $q$?",
    choices: [
      { id: "a", text: "Benjamini–Yekutieli, which divides $q$ by $\\sum_{i=1}^m 1/i$ and holds under arbitrary dependence", correct: true },
      {
        id: "b",
        text: "Plain Benjamini–Hochberg, which holds under any dependence",
        correct: false,
        misconception: {
          id: "bh-any-dependence",
          description: "BH's guarantee is proved under independence or positive regression dependence (PRDS), not arbitrary dependence.",
          blameConceptId: "false-discovery-rate",
        },
      },
      {
        id: "c",
        text: "Storey's adaptive BH, which estimates the null proportion to gain power",
        correct: false,
        misconception: {
          id: "storey-for-dependence",
          description: "Adaptive BH increases power by estimating $\\pi_0$; it does not relax — and can worsen — sensitivity to dependence.",
          blameConceptId: "false-discovery-rate",
        },
      },
      {
        id: "d",
        text: "Hochberg's step-up procedure",
        correct: false,
        misconception: {
          id: "hochberg-for-fdr-dependence",
          description: "Hochberg controls FWER, and also relies on independence or positive dependence.",
          blameConceptId: "family-wise-error-rate",
        },
      },
    ],
    difficulty: 0.8,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: FDR,
    source: AUTHORED,
    status: "live",
  },
];
