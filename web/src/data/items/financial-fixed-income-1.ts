import type { Item, SourceRef } from "../../lib/assessment/types";

/**
 * Item bank for three zero-item "financial instruments" concepts:
 * `time-value-of-money`, `bonds-and-fixed-income`, and `yield-to-maturity`.
 * Twenty items per concept — a full-maturity pool, mixed across format and
 * cognitive level — authored from each concept and its allowed prerequisite
 * ancestors with no external seed.
 */

const AUTHORED: SourceRef = {
  id: "mathlingo-authored-fixed-income-1",
  tier: "generated",
  title: "Mathlingo authored item (fixed income, part 1)",
};

export const financialFixedIncome1Items: Item[] = [
  // ===========================================================================
  // time-value-of-money
  // ===========================================================================
  {
    id: "time-value-of-money--recall-core-principle",
    conceptId: "time-value-of-money",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which statement best captures the core idea of the time value of money?",
    choices: [
      {
        id: "a",
        text: "A dollar available today is worth more than a dollar available in the future, because today's dollar can be invested to earn a return",
        correct: true,
      },
      {
        id: "b",
        text: "A dollar is worth the same amount no matter when it is received, since its face amount never changes",
        correct: false,
        misconception: {
          id: "ignores-opportunity-cost",
          description:
            "Ignores the opportunity cost of waiting: money in hand today can be invested and grown, so an equal nominal amount later is worth less now.",
          blameConceptId: "time-value-of-money",
        },
      },
      {
        id: "c",
        text: "A dollar received in the future is always worth more than a dollar today, because prices tend to rise over time",
        correct: false,
        misconception: {
          id: "future-dollar-worth-more",
          description:
            "Reverses the core relationship. Even setting inflation aside, the ability to invest today's dollar makes it worth more now, not less.",
          blameConceptId: "time-value-of-money",
        },
      },
      {
        id: "d",
        text: "The time value of money only applies to bank loans, not to savings, investments, or business decisions",
        correct: false,
        misconception: {
          id: "scope-restricted-to-loans",
          description:
            "Wrongly narrows the principle to lending. Discounting and compounding apply to any cash flow occurring at a different date, not just loans.",
          blameConceptId: "time-value-of-money",
        },
      },
    ],
    difficulty: -1.6,
    discrimination: 1.1,
    expectedSeconds: 30,
    prereqClosure: ["time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "time-value-of-money--recall-discounting-definition",
    conceptId: "time-value-of-money",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What does it mean to 'discount' a future cash flow?",
    choices: [
      {
        id: "a",
        text: "Convert a future amount into its equivalent value today by dividing by (1 + rate) raised to the number of periods",
        correct: true,
      },
      {
        id: "b",
        text: "Convert a future amount into its equivalent value today by multiplying by (1 + rate) raised to the number of periods",
        correct: false,
        misconception: {
          id: "multiply-instead-of-divide",
          description:
            "Confuses discounting with compounding. Multiplying by the growth factor moves a value forward in time; discounting divides by it to move a value backward.",
          blameConceptId: "time-value-of-money",
        },
      },
      {
        id: "c",
        text: "Subtract a fixed dollar fee from a future amount to account for the cost of waiting",
        correct: false,
        misconception: {
          id: "confuses-discount-with-fee",
          description:
            "Treats discounting as subtracting a flat fee, rather than dividing by a compounding factor that scales with both the rate and the number of periods.",
          blameConceptId: "time-value-of-money",
        },
      },
    ],
    difficulty: -1.3,
    discrimination: 1.2,
    expectedSeconds: 35,
    prereqClosure: ["time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "time-value-of-money--recall-effect-of-rate-on-pv",
    conceptId: "time-value-of-money",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "All else equal, what happens to the present value of a fixed future cash flow as the discount rate increases?",
    choices: [
      {
        id: "a",
        text: "The present value decreases, since the same future amount is divided by a larger discount factor",
        correct: true,
      },
      {
        id: "b",
        text: "The present value increases, since a higher rate means money grows faster",
        correct: false,
        misconception: {
          id: "confuses-growth-with-discounting",
          description:
            "Confuses how a higher rate affects future value (grows faster) with how it affects present value of a fixed future amount, which shrinks as the rate rises.",
          blameConceptId: "time-value-of-money",
        },
      },
      {
        id: "c",
        text: "The present value is unaffected, since it depends only on the future amount, not the rate",
        correct: false,
        misconception: {
          id: "ignores-discount-rate",
          description: "Drops the discount rate from the present value calculation entirely, when it is one of the two inputs that determine it.",
          blameConceptId: "time-value-of-money",
        },
      },
    ],
    difficulty: -1.2,
    discrimination: 1.2,
    expectedSeconds: 35,
    prereqClosure: ["time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "time-value-of-money--recall-compounding-statements",
    conceptId: "time-value-of-money",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which of the following statements about compounding are true? Select all that apply.",
    choices: [
      { id: "a", text: "Compound interest earns interest on both the original principal and previously accumulated interest", correct: true },
      { id: "b", text: "For a given nominal annual rate, more frequent compounding periods produce a higher effective annual rate", correct: true },
      { id: "c", text: "Present value and future value calculations rely on the same underlying compounding relationship, applied in opposite directions", correct: true },
      {
        id: "d",
        text: "Simple interest and compound interest produce identical total interest over any multi-year horizon",
        correct: false,
        misconception: {
          id: "simple-equals-compound",
          description:
            "Assumes simple and compound interest always agree. They only agree in the first period; compound interest exceeds simple interest in every later period because it earns interest on interest.",
          blameConceptId: "time-value-of-money",
        },
      },
      {
        id: "e",
        text: "Under compound interest, the future value of a single sum grows linearly with the number of periods",
        correct: false,
        misconception: {
          id: "compound-growth-treated-as-linear",
          description:
            "Compound growth is exponential in the number of periods, not linear; treating it as linear understates value far in the future.",
          blameConceptId: "time-value-of-money",
        },
      },
    ],
    difficulty: -0.7,
    discrimination: 1.3,
    expectedSeconds: 60,
    prereqClosure: ["time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "time-value-of-money--recall-simple-vs-compound",
    conceptId: "time-value-of-money",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What is the key difference between simple interest and compound interest?",
    choices: [
      {
        id: "a",
        text: "Simple interest is computed only on the original principal each period; compound interest is computed on the principal plus all previously accumulated interest",
        correct: true,
      },
      {
        id: "b",
        text: "Simple interest is computed on principal plus accumulated interest; compound interest is computed only on the original principal",
        correct: false,
        misconception: {
          id: "simple-compound-reversed",
          description: "Swaps the two definitions. It is compound interest, not simple interest, that is computed on the growing balance.",
          blameConceptId: "time-value-of-money",
        },
      },
      {
        id: "c",
        text: "Simple interest always compounds annually, while compound interest always compounds continuously",
        correct: false,
        misconception: {
          id: "confuses-with-compounding-frequency",
          description:
            "Confuses the simple/compound distinction (whether interest earns interest) with compounding frequency (how often interest is credited), which is a separate, independent choice.",
          blameConceptId: "time-value-of-money",
        },
      },
    ],
    difficulty: -1.0,
    discrimination: 1.2,
    expectedSeconds: 40,
    prereqClosure: ["time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "time-value-of-money--recall-compounding-frequency-effect",
    conceptId: "time-value-of-money",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "A bank switches an account from annual compounding to monthly compounding, keeping the same stated (nominal) annual rate. What happens to the interest earned in one year?",
    choices: [
      { id: "a", text: "It increases, since interest is credited and starts earning its own interest more often within the year", correct: true },
      {
        id: "b",
        text: "It decreases, since each individual crediting period now earns a much smaller rate",
        correct: false,
        misconception: {
          id: "smaller-period-rate-assumed-worse",
          description:
            "Notices the per-period rate is smaller but misses that there are proportionally more periods, and compounding more often always weakly raises the effective annual rate.",
          blameConceptId: "time-value-of-money",
        },
      },
      {
        id: "c",
        text: "It stays exactly the same, since the nominal annual rate has not changed",
        correct: false,
        misconception: {
          id: "nominal-rate-treated-as-effective",
          description: "Treats the nominal rate as if it were the effective rate, ignoring that compounding frequency changes the effective annual rate.",
          blameConceptId: "time-value-of-money",
        },
      },
    ],
    difficulty: -0.9,
    discrimination: 1.3,
    expectedSeconds: 45,
    prereqClosure: ["time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "time-value-of-money--apply-future-value-single-sum",
    conceptId: "time-value-of-money",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "You invest $1,000 today at an annual interest rate of 5%, compounded annually. What is the value of the " +
      "investment after 3 years? Round to the nearest cent.",
    answerKey: 1157.63,
    tolerance: 0.05,
    difficulty: -0.5,
    discrimination: 1.3,
    expectedSeconds: 70,
    prereqClosure: ["time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "time-value-of-money--apply-present-value-single-sum",
    conceptId: "time-value-of-money",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "How much would you need to invest today at an annual rate of 10%, compounded annually, to have $1,000 in " +
      "2 years? Round to the nearest cent.",
    answerKey: 826.45,
    tolerance: 0.05,
    difficulty: -0.4,
    discrimination: 1.3,
    expectedSeconds: 70,
    prereqClosure: ["time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "time-value-of-money--apply-fv-semiannual-compounding",
    conceptId: "time-value-of-money",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "You deposit $2,000 in an account paying a nominal annual rate of 6%, compounded semiannually. What is the " +
      "account balance after 1 year? Round to the nearest cent.",
    answerKey: 2121.8,
    tolerance: 0.05,
    difficulty: -0.1,
    discrimination: 1.4,
    expectedSeconds: 90,
    prereqClosure: ["time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "time-value-of-money--apply-pv-four-years",
    conceptId: "time-value-of-money",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "What is the present value of $5,000 to be received in 4 years, using an annual discount rate of 8% " +
      "compounded annually? Round to the nearest cent.",
    answerKey: 3675.15,
    tolerance: 0.5,
    difficulty: 0.0,
    discrimination: 1.4,
    expectedSeconds: 100,
    prereqClosure: ["time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "time-value-of-money--apply-compare-timing-of-payments",
    conceptId: "time-value-of-money",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem:
      "An investor can choose to receive $10,000 today or $11,000 in 2 years. Her opportunity cost of capital is " +
      "8% per year, compounded annually. Comparing present values, which option should she prefer?",
    choices: [
      {
        id: "a",
        text: "$10,000 today, since its present value exceeds the present value of $11,000 received in 2 years at an 8% discount rate",
        correct: true,
      },
      {
        id: "b",
        text: "$11,000 in 2 years, since $11,000 is the larger nominal amount",
        correct: false,
        misconception: {
          id: "compares-nominal-amounts-only",
          description:
            "Compares raw dollar amounts without discounting the later payment back to today, ignoring the time value of money entirely.",
          blameConceptId: "time-value-of-money",
        },
      },
      {
        id: "c",
        text: "They are equivalent, since $11,000 is only about 10% more than $10,000",
        correct: false,
        misconception: {
          id: "confuses-nominal-growth-with-required-return",
          description:
            "Confuses the nominal percentage difference between the two amounts with the investor's actual required discount rate over the actual waiting period.",
          blameConceptId: "time-value-of-money",
        },
      },
    ],
    difficulty: 0.1,
    discrimination: 1.4,
    expectedSeconds: 110,
    prereqClosure: ["time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "time-value-of-money--apply-effective-annual-rate",
    conceptId: "time-value-of-money",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A bank quotes a nominal annual rate of 12%, compounded monthly. What is the effective annual rate, as a " +
      "percentage rounded to two decimal places?",
    answerKey: 12.68,
    tolerance: 0.05,
    difficulty: 0.3,
    discrimination: 1.5,
    expectedSeconds: 120,
    prereqClosure: ["time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "time-value-of-money--explain-why-dollar-today-worth-more",
    conceptId: "time-value-of-money",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain, in terms of opportunity cost, why a dollar received today is worth more than the same dollar " +
      "amount received in one year, even with no inflation and no risk of not being paid.",
    rubric: {
      elements: [
        {
          id: "invest-today-to-earn-return",
          description:
            "Explains that a dollar in hand today can be invested immediately at some positive rate of return, so by next year it will have grown to more than one dollar.",
          weight: 3,
          required: true,
          misconception: {
            id: "no-opportunity-cost-recognized",
            description: "Fails to identify that the ability to invest today's dollar is exactly what makes it worth more than a dollar received later.",
            blameConceptId: "time-value-of-money",
          },
        },
        {
          id: "same-nominal-amount-later-is-less",
          description: "States that receiving the identical nominal amount later forfeits that growth, so it is worth less in today's terms.",
          weight: 2,
          required: true,
        },
        {
          id: "notes-not-about-inflation-or-risk",
          description: "Notes this holds purely from opportunity cost, separate from any inflation or default-risk argument.",
          weight: 1,
        },
      ],
    },
    difficulty: 0.3,
    discrimination: 1.4,
    expectedSeconds: 140,
    prereqClosure: ["time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "time-value-of-money--explain-compounding-frequency-interest-cost",
    conceptId: "time-value-of-money",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain why two loans with the same stated (nominal) annual interest rate can charge different total " +
      "amounts of interest over a year, if one compounds annually and the other compounds monthly.",
    rubric: {
      elements: [
        {
          id: "more-frequent-compounding-raises-effective-rate",
          description:
            "Explains that monthly compounding applies interest to already-accrued interest more often within the year, which raises the effective annual rate above the nominal rate.",
          weight: 3,
          required: true,
          misconception: {
            id: "nominal-and-effective-conflated",
            description: "Treats the nominal rate as automatically equal to the effective rate, missing that compounding frequency changes what borrowers actually pay.",
            blameConceptId: "time-value-of-money",
          },
        },
        {
          id: "annual-compounding-baseline",
          description: "Notes that annual compounding is the special case where the effective annual rate exactly equals the nominal rate.",
          weight: 2,
          required: true,
        },
      ],
    },
    difficulty: 0.4,
    discrimination: 1.4,
    expectedSeconds: 150,
    prereqClosure: ["time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "time-value-of-money--explain-discount-rate-as-opportunity-cost",
    conceptId: "time-value-of-money",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "When computing a present value, why is the discount rate typically chosen to be the rate of return " +
      "available on an alternative investment of similar risk, rather than an arbitrary number?",
    rubric: {
      elements: [
        {
          id: "discount-rate-is-opportunity-cost",
          description:
            "Explains that the discount rate represents what an investor gives up (the opportunity cost) by tying money up in this cash flow instead of the best comparable alternative.",
          weight: 3,
          required: true,
        },
        {
          id: "wrong-rate-misstates-equivalence",
          description:
            "Explains that using a rate different from the true available alternative would produce a present value that does not represent a genuinely equivalent amount of money today.",
          weight: 3,
          required: true,
          misconception: {
            id: "discount-rate-treated-as-arbitrary",
            description: "Treats the discount rate as a free modeling choice rather than an economically meaningful opportunity cost tied to a real alternative.",
            blameConceptId: "time-value-of-money",
          },
        },
      ],
    },
    difficulty: 0.6,
    discrimination: 1.5,
    expectedSeconds: 160,
    prereqClosure: ["time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "time-value-of-money--explain-inflation-in-discount-rate",
    conceptId: "time-value-of-money",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Two people agree a cash flow will be $1,000 in one year, stated in ordinary (nominal) dollars. One says " +
      "the discount rate used to value it today should include expected inflation, not just pure time preference; " +
      "the other says inflation should be ignored. Explain why including expected inflation in the discount rate " +
      "matters for getting a present value that reflects the cash flow's real purchasing power.",
    rubric: {
      elements: [
        {
          id: "nominal-cash-flow-needs-nominal-rate",
          description:
            "Explains that since the $1,000 is a nominal amount, it must be discounted with a nominal rate (one that already embeds expected inflation) to get a consistent present value.",
          weight: 3,
          required: true,
        },
        {
          id: "ignoring-inflation-overstates-value",
          description:
            "Explains that discounting a nominal cash flow with a rate that excludes expected inflation overstates today's value, because it fails to account for the erosion of purchasing power over the year.",
          weight: 3,
          required: true,
          misconception: {
            id: "mismatches-nominal-and-real",
            description: "Mixes a nominal cash flow with a real (inflation-free) discount rate, producing an internally inconsistent present value.",
            blameConceptId: "time-value-of-money",
          },
        },
      ],
    },
    difficulty: 0.9,
    discrimination: 1.6,
    expectedSeconds: 170,
    prereqClosure: ["time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "time-value-of-money--explain-compounding-frequency-which-grows-fastest",
    conceptId: "time-value-of-money",
    format: "mcq",
    cognitive: "explain",
    channels: ["typed"],
    stem:
      "Account A and Account B both offer a nominal annual rate of 8%. Account A compounds annually and Account " +
      "B compounds daily. Over several years, which account accumulates more value, and why?",
    choices: [
      {
        id: "a",
        text: "Account B, because more frequent compounding lets interest start earning its own interest sooner within each year, raising its effective annual rate above Account A's",
        correct: true,
      },
      {
        id: "b",
        text: "Account A, because compounding less often avoids losing value to fees built into frequent compounding",
        correct: false,
        misconception: {
          id: "assumes-frequent-compounding-costly",
          description: "Invents a cost to frequent compounding. Compounding frequency alone never reduces an account's growth; it can only match or exceed less frequent compounding.",
          blameConceptId: "time-value-of-money",
        },
      },
      {
        id: "c",
        text: "They accumulate the same amount, since both quote the same nominal annual rate",
        correct: false,
        misconception: {
          id: "nominal-rate-assumed-sufficient",
          description: "Assumes the nominal rate alone determines growth, ignoring that compounding frequency changes the effective annual rate actually earned.",
          blameConceptId: "time-value-of-money",
        },
      },
    ],
    difficulty: 0.2,
    discrimination: 1.4,
    expectedSeconds: 90,
    prereqClosure: ["time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "time-value-of-money--transfer-implied-discount-rate",
    conceptId: "time-value-of-money",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A friend says $100 today and $110 in one year 'are basically the same amount of money,' so the choice " +
      "between them shouldn't matter much. Find the implicit annual discount rate that would make your friend " +
      "genuinely indifferent between the two amounts, and explain what that rate says about their assumed " +
      "opportunity cost.",
    rubric: {
      elements: [
        {
          id: "computes-implied-rate",
          description: "Computes the implied rate as 110/100 − 1 = 10% per year, the rate at which $100 today grows exactly into $110 in one year.",
          weight: 3,
          required: true,
        },
        {
          id: "interprets-as-opportunity-cost",
          description:
            "Explains that this 10% is the opportunity cost the friend is implicitly assuming; if their true available return is below 10% they should prefer $110 later, and if it is above 10% they should prefer $100 now.",
          weight: 3,
          required: true,
          misconception: {
            id: "treats-amounts-as-truly-equal",
            description: "Accepts the friend's claim that the two amounts are 'basically the same' rather than identifying the specific rate at which that equivalence actually holds.",
            blameConceptId: "time-value-of-money",
          },
        },
      ],
    },
    difficulty: 1.1,
    discrimination: 1.6,
    expectedSeconds: 170,
    prereqClosure: ["time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "time-value-of-money--transfer-derive-periods-to-target-value",
    conceptId: "time-value-of-money",
    format: "derivation",
    cognitive: "transfer",
    channels: ["typed", "handwritten"],
    stem:
      "Derive a general formula for the number of years n it takes an investment of present value PV to grow to " +
      "a target future value FV, at a fixed annual compound rate r, expressing n in terms of natural logarithms.",
    rubric: {
      elements: [
        {
          id: "sets-up-fv-equation",
          description: "Starts from FV = PV(1 + r)^n, the standard compound growth relationship.",
          weight: 2,
          required: true,
        },
        {
          id: "takes-logs",
          description: "Takes the natural log of both sides to get ln(FV/PV) = n·ln(1 + r).",
          weight: 3,
          required: true,
          misconception: {
            id: "mishandles-logarithm-of-power",
            description: "Fails to correctly apply the log-of-a-power rule when moving the exponent n out of (1 + r)^n.",
            blameConceptId: "time-value-of-money",
          },
        },
        {
          id: "solves-for-n",
          description: "Isolates n to get n = ln(FV/PV) / ln(1 + r).",
          weight: 2,
          required: true,
        },
      ],
    },
    difficulty: 1.4,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "time-value-of-money--transfer-derive-two-stage-compounding",
    conceptId: "time-value-of-money",
    format: "derivation",
    cognitive: "transfer",
    channels: ["typed", "handwritten"],
    stem:
      "A deposit of P earns compound interest at annual rate r1 for m years. The entire resulting balance is then " +
      "immediately moved into a new account earning a different annual rate r2 for an additional k years. Derive " +
      "an expression for the final future value FV in terms of P, r1, r2, m, and k.",
    rubric: {
      elements: [
        {
          id: "intermediate-balance",
          description: "Writes the balance after the first stage as P(1 + r1)^m.",
          weight: 3,
          required: true,
        },
        {
          id: "applies-second-rate-to-full-balance",
          description: "Treats that entire intermediate balance as the new principal for the second stage, compounding it at r2 for k more years.",
          weight: 3,
          required: true,
          misconception: {
            id: "reapplies-original-principal",
            description: "Incorrectly compounds the second stage starting from the original P rather than from the grown balance P(1 + r1)^m, losing the interest earned in stage one.",
            blameConceptId: "time-value-of-money",
          },
        },
        {
          id: "final-expression",
          description: "Concludes FV = P(1 + r1)^m · (1 + r2)^k.",
          weight: 2,
          required: true,
        },
      ],
    },
    difficulty: 1.2,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },

  // ===========================================================================
  // bonds-and-fixed-income
  // ===========================================================================
  {
    id: "bonds-and-fixed-income--recall-what-a-bond-is",
    conceptId: "bonds-and-fixed-income",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Buying a newly issued bond is best described as:",
    choices: [
      { id: "a", text: "Lending money to the issuer, who promises to pay coupons and return the face value at maturity", correct: true },
      {
        id: "b",
        text: "Buying partial ownership of the issuer, sharing in its future profits",
        correct: false,
        misconception: {
          id: "bond-as-ownership",
          description: "Confuses a bond (a debt claim with promised fixed payments) with equity (an ownership claim on residual profits).",
          blameConceptId: "bonds-and-fixed-income",
        },
      },
      {
        id: "c",
        text: "A short-term insurance contract against the issuer's default",
        correct: false,
        misconception: {
          id: "bond-as-insurance",
          description: "Confuses owning a bond with buying credit protection on one, which are opposite positions.",
          blameConceptId: "bonds-and-fixed-income",
        },
      },
    ],
    difficulty: -1.6,
    discrimination: 1.1,
    expectedSeconds: 30,
    prereqClosure: ["bonds-and-fixed-income"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "bonds-and-fixed-income--recall-coupon-vs-face-value",
    conceptId: "bonds-and-fixed-income",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "For a standard coupon bond, which statement correctly distinguishes the coupon payment from the face value?",
    choices: [
      { id: "a", text: "The coupon is a periodic interest payment; the face value is the principal repaid once, at maturity", correct: true },
      {
        id: "b",
        text: "The face value is paid every period; the coupon is paid only once, at maturity",
        correct: false,
        misconception: {
          id: "reverses-coupon-and-face",
          description: "Swaps the two cash flow types: it is the coupon that recurs each period, and the face value that arrives only once, at maturity.",
          blameConceptId: "bonds-and-fixed-income",
        },
      },
      {
        id: "c",
        text: "They are two names for the same cash flow",
        correct: false,
        misconception: {
          id: "coupon-face-conflated",
          description: "Fails to distinguish two structurally different cash flows: a recurring interest payment and a one-time principal repayment.",
          blameConceptId: "bonds-and-fixed-income",
        },
      },
    ],
    difficulty: -1.5,
    discrimination: 1.1,
    expectedSeconds: 30,
    prereqClosure: ["bonds-and-fixed-income"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "bonds-and-fixed-income--recall-premium-discount-par",
    conceptId: "bonds-and-fixed-income",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which of the following correctly describe when a bond trades at a premium, at par, or at a discount? Select all that apply.",
    choices: [
      { id: "a", text: "A bond trades at par when its coupon rate equals the market yield required on comparably risky bonds", correct: true },
      { id: "b", text: "A bond trades at a premium (above face value) when its coupon rate exceeds the market yield", correct: true },
      { id: "c", text: "A bond trades at a discount (below face value) when its coupon rate is below the market yield", correct: true },
      {
        id: "d",
        text: "A bond trades at a premium whenever its face value exceeds $1,000",
        correct: false,
        misconception: {
          id: "premium-tied-to-face-size",
          description: "Confuses the size of the face value with the premium/discount relationship, which depends only on coupon rate versus market yield, not on the face value's magnitude.",
          blameConceptId: "bonds-and-fixed-income",
        },
      },
      {
        id: "e",
        text: "Whether a bond trades above or below par is fixed at issuance and never changes afterward",
        correct: false,
        misconception: {
          id: "premium-discount-treated-as-fixed",
          description: "Treats premium/discount status as permanent, when it is determined by the *current* market yield relative to the coupon rate and so can flip as rates move.",
          blameConceptId: "bonds-and-fixed-income",
        },
      },
    ],
    difficulty: -0.6,
    discrimination: 1.4,
    expectedSeconds: 60,
    prereqClosure: ["bonds-and-fixed-income"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "bonds-and-fixed-income--recall-price-yield-direction",
    conceptId: "bonds-and-fixed-income",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "All else equal, when the market yield required on a bond rises, its price:",
    choices: [
      { id: "a", text: "Falls, because the same fixed future cash flows are now discounted at a higher rate", correct: true },
      {
        id: "b",
        text: "Rises, because the bond now offers a more competitive rate",
        correct: false,
        misconception: {
          id: "confuses-yield-level-with-price-direction",
          description: "Confuses the yield being 'more competitive' in absolute terms with the mechanical effect of discounting fixed cash flows at a higher rate, which lowers present value.",
          blameConceptId: "bonds-and-fixed-income",
        },
      },
      {
        id: "c",
        text: "Is unaffected, since the coupon and face value are contractually fixed",
        correct: false,
        misconception: {
          id: "ignores-discounting-effect",
          description: "Correctly notes the cash flows are fixed but misses that their present value still depends on the rate used to discount them.",
          blameConceptId: "time-value-of-money",
        },
      },
    ],
    difficulty: -0.9,
    discrimination: 1.3,
    expectedSeconds: 40,
    prereqClosure: ["bonds-and-fixed-income", "time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "bonds-and-fixed-income--recall-current-yield-definition",
    conceptId: "bonds-and-fixed-income",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "A bond's 'current yield' is defined as:",
    choices: [
      { id: "a", text: "Annual coupon payment divided by the bond's current market price", correct: true },
      {
        id: "b",
        text: "Annual coupon payment divided by the bond's face value",
        correct: false,
        misconception: {
          id: "current-yield-as-coupon-rate",
          description: "Confuses current yield with the coupon rate, which divides by face value rather than by the bond's current market price.",
          blameConceptId: "bonds-and-fixed-income",
        },
      },
      {
        id: "c",
        text: "The total return an investor earns if the bond is held to maturity",
        correct: false,
        misconception: {
          id: "current-yield-as-ytm",
          description: "Confuses current yield, a simple one-period income measure, with yield to maturity, which accounts for the full schedule of cash flows and any price gain or loss to maturity.",
          blameConceptId: "bonds-and-fixed-income",
        },
      },
    ],
    difficulty: -0.5,
    discrimination: 1.3,
    expectedSeconds: 40,
    prereqClosure: ["bonds-and-fixed-income"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "bonds-and-fixed-income--recall-cash-flow-structure",
    conceptId: "bonds-and-fixed-income",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem: "A 5-year, annual-pay coupon bond with face value $1,000 makes which of the following cash flows? Select all that apply.",
    choices: [
      { id: "a", text: "A coupon payment at the end of each of the 5 years", correct: true },
      { id: "b", text: "The $1,000 face value repaid at the end of year 5, alongside that year's coupon", correct: true },
      {
        id: "c",
        text: "A single lump-sum payment only at maturity, with no interim coupons",
        correct: false,
        misconception: {
          id: "confuses-with-zero-coupon",
          description: "Describes a zero-coupon bond's cash flow pattern rather than a coupon-paying bond's, which pays interim coupons every period.",
          blameConceptId: "bonds-and-fixed-income",
        },
      },
      {
        id: "d",
        text: "The face value repaid gradually, in equal installments across all 5 years",
        correct: false,
        misconception: {
          id: "confuses-with-amortizing-loan",
          description: "Describes an amortizing loan's principal schedule, not a standard bond's, which repays the entire face value in one lump sum at maturity.",
          blameConceptId: "bonds-and-fixed-income",
        },
      },
    ],
    difficulty: -1.0,
    discrimination: 1.3,
    expectedSeconds: 55,
    prereqClosure: ["bonds-and-fixed-income"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "bonds-and-fixed-income--apply-price-at-par",
    conceptId: "bonds-and-fixed-income",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A 2-year bond has face value $1,000, an annual coupon rate of 6% (paid once per year), and the market " +
      "requires a 6% annual yield on bonds of this risk. What is the bond's price today? Round to the nearest cent.",
    answerKey: 1000.0,
    tolerance: 0.5,
    difficulty: -0.4,
    discrimination: 1.3,
    expectedSeconds: 90,
    prereqClosure: ["bonds-and-fixed-income", "time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "bonds-and-fixed-income--apply-price-premium-bond",
    conceptId: "bonds-and-fixed-income",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A 2-year bond has face value $1,000 and pays an annual coupon rate of 8% once per year. The market yield " +
      "on comparable bonds is 6%. What is the bond's price today? Round to the nearest cent.",
    answerKey: 1036.67,
    tolerance: 0.5,
    difficulty: 0.1,
    discrimination: 1.4,
    expectedSeconds: 110,
    prereqClosure: ["bonds-and-fixed-income", "time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "bonds-and-fixed-income--apply-price-discount-bond",
    conceptId: "bonds-and-fixed-income",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A 2-year bond has face value $1,000 and pays an annual coupon rate of 4% once per year. The market yield " +
      "on comparable bonds is 6%. What is the bond's price today? Round to the nearest cent.",
    answerKey: 963.33,
    tolerance: 0.5,
    difficulty: 0.1,
    discrimination: 1.4,
    expectedSeconds: 110,
    prereqClosure: ["bonds-and-fixed-income", "time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "bonds-and-fixed-income--apply-price-zero-coupon",
    conceptId: "bonds-and-fixed-income",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A zero-coupon bond has face value $1,000, matures in 3 years, and the market yield on comparable bonds is " +
      "5% per year. What is the bond's price today? Round to the nearest cent.",
    answerKey: 863.84,
    tolerance: 0.5,
    difficulty: 0.0,
    discrimination: 1.4,
    expectedSeconds: 100,
    prereqClosure: ["bonds-and-fixed-income", "time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "bonds-and-fixed-income--apply-current-yield",
    conceptId: "bonds-and-fixed-income",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A bond pays an annual coupon of $70 and currently trades at a market price of $950. What is its current " +
      "yield, as a percentage rounded to two decimal places?",
    answerKey: 7.37,
    tolerance: 0.05,
    difficulty: -0.2,
    discrimination: 1.3,
    expectedSeconds: 70,
    prereqClosure: ["bonds-and-fixed-income"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "bonds-and-fixed-income--apply-total-coupon-income",
    conceptId: "bonds-and-fixed-income",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "A bond has face value $1,000, an annual coupon rate of 5%, and matures in 4 years, paying coupons once " +
      "per year. Ignoring reinvestment of the coupons, what is the total dollar amount of coupon payments " +
      "received over the bond's life?",
    answerKey: 200,
    tolerance: 0.01,
    difficulty: -1.1,
    discrimination: 1.1,
    expectedSeconds: 50,
    prereqClosure: ["bonds-and-fixed-income"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "bonds-and-fixed-income--explain-why-price-yield-inverse",
    conceptId: "bonds-and-fixed-income",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Explain, mechanically, why a bond's price and its yield always move in opposite directions.",
    rubric: {
      elements: [
        {
          id: "price-is-pv-of-fixed-cash-flows",
          description: "States that a bond's price is the present value of a fixed schedule of future cash flows (coupons and face value).",
          weight: 2,
          required: true,
        },
        {
          id: "higher-discount-rate-lowers-pv",
          description: "Explains that the yield is the rate used to discount those fixed cash flows, and a higher discount rate mechanically produces a lower present value for any fixed future amount.",
          weight: 3,
          required: true,
          misconception: {
            id: "misses-discounting-mechanism",
            description: "Asserts the inverse relationship without tying it to the discounting mechanism — that raising the rate in the denominator of a present-value calculation lowers the result.",
            blameConceptId: "time-value-of-money",
          },
        },
        {
          id: "cash-flows-unchanged",
          description: "Notes the coupons and face value themselves do not change; only how they are valued today changes.",
          weight: 1,
        },
      ],
    },
    difficulty: 0.2,
    discrimination: 1.4,
    expectedSeconds: 140,
    prereqClosure: ["bonds-and-fixed-income", "time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "bonds-and-fixed-income--explain-premium-bond-intuition",
    conceptId: "bonds-and-fixed-income",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain, in plain economic terms (not just algebra), why a bond with an 8% coupon trades above face value " +
      "when the market only requires a 6% yield on bonds of similar risk.",
    rubric: {
      elements: [
        {
          id: "above-market-coupon-is-more-attractive",
          description: "Explains that the bond pays more income each period (8% of face) than a newly issued bond at the going 6% market rate would, making its cash flows more valuable.",
          weight: 3,
          required: true,
        },
        {
          id: "investors-bid-up-price-until-yield-matches",
          description: "Explains that investors compete for that above-market coupon, bidding the price up until the resulting yield on the now-higher price falls back to the market's required 6%.",
          weight: 3,
          required: true,
          misconception: {
            id: "premium-treated-as-unexplained-fact",
            description: "States the bond trades at a premium without explaining the competitive bidding mechanism that produces it.",
            blameConceptId: "bonds-and-fixed-income",
          },
        },
      ],
    },
    difficulty: 0.5,
    discrimination: 1.5,
    expectedSeconds: 150,
    prereqClosure: ["bonds-and-fixed-income"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "bonds-and-fixed-income--explain-pull-to-par",
    conceptId: "bonds-and-fixed-income",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "A bond trades at a premium today. Explain why, if market yields stay unchanged, the bond's price must " +
      "gradually move toward its face value as maturity approaches ('pull to par').",
    rubric: {
      elements: [
        {
          id: "fewer-remaining-cash-flows",
          description: "Notes that as time passes, fewer coupon payments remain to be discounted, and the single remaining cash flow closest to maturity is the face value itself.",
          weight: 2,
          required: true,
        },
        {
          id: "final-payoff-is-face-value",
          description: "States that at maturity the bond pays exactly face value, no more and no less, so the price must converge exactly to face value at that instant.",
          weight: 3,
          required: true,
          misconception: {
            id: "premium-treated-as-permanent",
            description: "Assumes the premium (or discount) persists unchanged all the way to maturity, ignoring that the bond must pay exactly face value at that final date.",
            blameConceptId: "bonds-and-fixed-income",
          },
        },
        {
          id: "smooth-convergence",
          description: "Notes the convergence is gradual and smooth, not a sudden jump, since it reflects the shrinking number of remaining discounted cash flows above face value.",
          weight: 1,
        },
      ],
    },
    difficulty: 0.8,
    discrimination: 1.6,
    expectedSeconds: 160,
    prereqClosure: ["bonds-and-fixed-income", "time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "bonds-and-fixed-income--explain-credit-risk-and-yield",
    conceptId: "bonds-and-fixed-income",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Two bonds have identical coupons, face values, and maturities, but Bond X is issued by a financially " +
      "weaker company than Bond Y. Explain why the market requires a higher yield on Bond X, and what that does " +
      "to its price relative to Bond Y.",
    rubric: {
      elements: [
        {
          id: "compensation-for-default-risk",
          description: "Explains that a weaker issuer carries a higher chance of missing a coupon or failing to repay face value, so investors demand extra compensation (a higher required yield) for bearing that risk.",
          weight: 3,
          required: true,
        },
        {
          id: "higher-yield-lower-price",
          description: "Connects the higher required yield to a lower price for Bond X relative to Bond Y, since the same fixed cash flows are discounted at a higher rate.",
          weight: 3,
          required: true,
          misconception: {
            id: "ignores-price-yield-link",
            description: "Identifies the higher required yield but fails to connect it back to the resulting lower price for the riskier bond's identical cash flows.",
            blameConceptId: "bonds-and-fixed-income",
          },
        },
      ],
    },
    difficulty: 0.4,
    discrimination: 1.4,
    expectedSeconds: 150,
    prereqClosure: ["bonds-and-fixed-income"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "bonds-and-fixed-income--derivation-general-pricing-formula",
    conceptId: "bonds-and-fixed-income",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "Derive the general pricing formula for an n-year annual coupon bond with coupon payment C, face value F, " +
      "and annual market yield y, by discounting each promised cash flow to today.",
    rubric: {
      elements: [
        {
          id: "lists-cash-flows",
          description: "Lists the cash flow at each date: C at the end of years 1 through n-1, and C + F at the end of year n.",
          weight: 2,
          required: true,
        },
        {
          id: "discounts-each-cash-flow",
          description: "Discounts each cash flow at rate y for the appropriate number of years and sums them: Price = Σ (from t=1 to n) of C/(1+y)^t, plus F/(1+y)^n.",
          weight: 3,
          required: true,
          misconception: {
            id: "discounts-all-cash-flows-by-same-power",
            description: "Applies the same discount exponent to every cash flow instead of discounting each one by its own number of years until payment.",
            blameConceptId: "time-value-of-money",
          },
        },
        {
          id: "recognizes-annuity-plus-lump-sum",
          description: "Recognizes the coupon stream as an ordinary annuity and the face value as a separate single lump sum, so the price can also be written as C times an annuity factor plus F times a single discount factor.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.0,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["bonds-and-fixed-income", "time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "bonds-and-fixed-income--transfer-compare-two-coupons",
    conceptId: "bonds-and-fixed-income",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Bond A and Bond B have the same face value, maturity, and market yield, but Bond A has a higher coupon " +
      "rate than Bond B. Which bond has the higher price, and does the coupon difference matter more or less as " +
      "the common yield gets higher? Explain your reasoning.",
    rubric: {
      elements: [
        {
          id: "higher-coupon-higher-price",
          description: "States that Bond A (higher coupon) has the higher price, since it delivers strictly larger cash flows at every date, all else equal.",
          weight: 3,
          required: true,
        },
        {
          id: "gap-shrinks-at-higher-yield",
          description: "Explains that at a higher common yield, all cash flows (including the extra coupon amounts) are discounted more heavily, shrinking the dollar price gap between the two bonds.",
          weight: 3,
          required: true,
          misconception: {
            id: "assumes-fixed-dollar-gap",
            description: "Assumes the dollar price difference between the two bonds stays constant regardless of the yield level, missing that heavier discounting compresses differences in future cash flows.",
            blameConceptId: "time-value-of-money",
          },
        },
      ],
    },
    difficulty: 1.3,
    discrimination: 1.7,
    expectedSeconds: 180,
    prereqClosure: ["bonds-and-fixed-income", "time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "bonds-and-fixed-income--transfer-zero-coupon-as-special-case",
    conceptId: "bonds-and-fixed-income",
    format: "derivation",
    cognitive: "transfer",
    channels: ["typed", "handwritten"],
    stem:
      "Starting from the general n-year coupon bond pricing formula Price = Σ (from t=1 to n) of C/(1+y)^t, plus F/(1+y)^n, " +
      "show that the zero-coupon bond pricing formula Price = F/(1+y)^n is the special case C = 0, and explain " +
      "why setting C = 0 makes economic sense for a zero-coupon bond.",
    rubric: {
      elements: [
        {
          id: "substitutes-c-equals-zero",
          description: "Substitutes C = 0 into the general formula, making every term in the summation vanish and leaving only F/(1+y)^n.",
          weight: 3,
          required: true,
        },
        {
          id: "economic-meaning",
          description: "Explains that a zero-coupon bond by definition makes no periodic interest payments, so its only cash flow is the single face-value repayment at maturity — exactly what C = 0 represents.",
          weight: 3,
          required: true,
          misconception: {
            id: "treats-zero-coupon-as-unrelated-formula",
            description: "Treats the zero-coupon formula as a separate, unrelated rule rather than recognizing it as the C = 0 special case of the same general pricing formula.",
            blameConceptId: "bonds-and-fixed-income",
          },
        },
      ],
    },
    difficulty: 1.1,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["bonds-and-fixed-income", "time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "bonds-and-fixed-income--transfer-reinvestment-risk",
    conceptId: "bonds-and-fixed-income",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "An investor buys a 10-year, 6% annual coupon bond, planning to reinvest every coupon at whatever rate is " +
      "available when it is received. If market interest rates fall shortly after purchase and stay low, explain " +
      "what happens to the investor's actual realized return relative to the bond's quoted yield at purchase, and why.",
    rubric: {
      elements: [
        {
          id: "identifies-reinvestment-risk",
          description: "Identifies that coupons received over the bond's life must be reinvested at future market rates, which are not locked in at purchase.",
          weight: 3,
          required: true,
        },
        {
          id: "lower-rates-lower-realized-return",
          description: "Explains that if rates fall, each coupon is reinvested at a lower rate than originally assumed, so the investor's realized return ends up below the yield quoted at purchase.",
          weight: 3,
          required: true,
          misconception: {
            id: "assumes-quoted-yield-guaranteed",
            description: "Assumes the yield quoted at purchase is automatically the investor's realized return, ignoring that it implicitly assumes coupons are reinvested at that same rate.",
            blameConceptId: "time-value-of-money",
          },
        },
      ],
    },
    difficulty: 1.5,
    discrimination: 1.7,
    expectedSeconds: 190,
    prereqClosure: ["bonds-and-fixed-income", "time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },

  // ===========================================================================
  // yield-to-maturity
  // ===========================================================================
  {
    id: "yield-to-maturity--recall-definition",
    conceptId: "yield-to-maturity",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "A bond's yield to maturity (YTM) is best defined as:",
    choices: [
      { id: "a", text: "The single constant discount rate that makes the present value of all the bond's promised cash flows equal its current market price", correct: true },
      {
        id: "b",
        text: "The bond's coupon rate, expressed as a percentage of face value",
        correct: false,
        misconception: {
          id: "ytm-as-coupon-rate",
          description: "Confuses YTM with the coupon rate. The coupon rate is fixed at issuance; YTM moves with the bond's current market price.",
          blameConceptId: "yield-to-maturity",
        },
      },
      {
        id: "c",
        text: "The total dollar amount of coupons the bond will pay before maturity",
        correct: false,
        misconception: {
          id: "ytm-as-total-coupons",
          description: "Confuses a rate of return with a raw dollar total of coupon payments, dropping the time value of money entirely.",
          blameConceptId: "yield-to-maturity",
        },
      },
    ],
    difficulty: -1.2,
    discrimination: 1.2,
    expectedSeconds: 35,
    prereqClosure: ["yield-to-maturity", "bonds-and-fixed-income"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "yield-to-maturity--recall-reinvestment-assumption",
    conceptId: "yield-to-maturity",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "The standard yield-to-maturity calculation implicitly assumes that:",
    choices: [
      { id: "a", text: "Every coupon received is reinvested at a rate exactly equal to the YTM itself", correct: true },
      {
        id: "b",
        text: "Coupons are never reinvested, and are simply held as cash until maturity",
        correct: false,
        misconception: {
          id: "assumes-no-reinvestment",
          description: "Drops the reinvestment assumption entirely; YTM's derivation as an internal rate of return requires that interim cash flows be reinvested at that same rate to be mathematically consistent.",
          blameConceptId: "yield-to-maturity",
        },
      },
      {
        id: "c",
        text: "Coupons are automatically reinvested at the original coupon rate, regardless of market conditions",
        correct: false,
        misconception: {
          id: "confuses-reinvestment-rate-with-coupon-rate",
          description: "Substitutes the coupon rate for the YTM as the assumed reinvestment rate; the internal-rate-of-return construction of YTM requires reinvestment at YTM, not at the coupon rate.",
          blameConceptId: "yield-to-maturity",
        },
      },
    ],
    difficulty: 0.0,
    discrimination: 1.4,
    expectedSeconds: 60,
    prereqClosure: ["yield-to-maturity"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "yield-to-maturity--recall-par-bond-relationship",
    conceptId: "yield-to-maturity",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "If a bond currently trades exactly at par (price equals face value), its yield to maturity must be:",
    choices: [
      { id: "a", text: "Equal to its coupon rate", correct: true },
      {
        id: "b",
        text: "Always equal to zero",
        correct: false,
        misconception: {
          id: "par-implies-zero-ytm",
          description: "Confuses trading at par with paying zero return; a par bond can carry any coupon rate, and its YTM equals that coupon rate, not zero.",
          blameConceptId: "yield-to-maturity",
        },
      },
      {
        id: "c",
        text: "Higher than its coupon rate",
        correct: false,
        misconception: {
          id: "par-implies-ytm-above-coupon",
          description: "Confuses the par case with the discount-bond case; YTM exceeds the coupon rate only when the bond trades below par, not at par.",
          blameConceptId: "yield-to-maturity",
        },
      },
    ],
    difficulty: -0.5,
    discrimination: 1.3,
    expectedSeconds: 45,
    prereqClosure: ["yield-to-maturity", "bonds-and-fixed-income"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "yield-to-maturity--recall-premium-discount-ordering",
    conceptId: "yield-to-maturity",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which of the following statements about the relationship between YTM and coupon rate are correct? Select all that apply.",
    choices: [
      { id: "a", text: "If a bond trades at a premium (above face value), its YTM is below its coupon rate", correct: true },
      { id: "b", text: "If a bond trades at a discount (below face value), its YTM is above its coupon rate", correct: true },
      { id: "c", text: "If a bond trades at par, its YTM equals its coupon rate", correct: true },
      {
        id: "d",
        text: "A premium bond's YTM is always above its coupon rate",
        correct: false,
        misconception: {
          id: "premium-ytm-reversed",
          description: "Reverses the premium relationship: a premium bond's YTM is below, not above, its coupon rate.",
          blameConceptId: "yield-to-maturity",
        },
      },
      {
        id: "e",
        text: "YTM and coupon rate are unrelated to whether a bond trades above or below par",
        correct: false,
        misconception: {
          id: "denies-ytm-price-link",
          description: "Denies a relationship that is definitional: premium/discount/par status is defined precisely by how YTM compares to the coupon rate.",
          blameConceptId: "yield-to-maturity",
        },
      },
    ],
    difficulty: -0.1,
    discrimination: 1.5,
    expectedSeconds: 70,
    prereqClosure: ["yield-to-maturity", "bonds-and-fixed-income"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "yield-to-maturity--recall-ytm-vs-current-yield",
    conceptId: "yield-to-maturity",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "How does yield to maturity differ from current yield?",
    choices: [
      { id: "a", text: "YTM accounts for the full schedule of coupons plus any capital gain or loss to maturity; current yield only measures annual coupon income relative to price", correct: true },
      {
        id: "b",
        text: "Current yield accounts for capital gains to maturity, while YTM only measures coupon income",
        correct: false,
        misconception: {
          id: "reverses-ytm-and-current-yield",
          description: "Swaps the two measures: it is YTM, not current yield, that incorporates the price's eventual convergence to face value.",
          blameConceptId: "yield-to-maturity",
        },
      },
      {
        id: "c",
        text: "They are always numerically identical for any bond",
        correct: false,
        misconception: {
          id: "assumes-ytm-current-yield-equal",
          description: "Assumes equality that only holds exactly for a par bond; for premium and discount bonds the two measures diverge.",
          blameConceptId: "yield-to-maturity",
        },
      },
    ],
    difficulty: 0.1,
    discrimination: 1.4,
    expectedSeconds: 60,
    prereqClosure: ["yield-to-maturity", "bonds-and-fixed-income"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "yield-to-maturity--recall-zero-coupon-ytm-is-total-return",
    conceptId: "yield-to-maturity",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem:
      "For a zero-coupon bond held to maturity, why does its yield to maturity exactly equal the investor's " +
      "realized annualized return, with no reinvestment-assumption caveat?",
    choices: [
      { id: "a", text: "There are no interim coupon payments to reinvest, so there is nothing for a reinvestment-rate assumption to apply to", correct: true },
      {
        id: "b",
        text: "Zero-coupon bonds are risk-free, so their YTM is always realized exactly",
        correct: false,
        misconception: {
          id: "confuses-zero-coupon-with-risk-free",
          description: "Confuses the absence of coupons with the absence of default risk; a zero-coupon bond can still default, and that is unrelated to why its YTM avoids the reinvestment caveat.",
          blameConceptId: "yield-to-maturity",
        },
      },
      {
        id: "c",
        text: "Zero-coupon bonds have no face value, so there is no price sensitivity to reinvestment rates",
        correct: false,
        misconception: {
          id: "denies-zero-coupon-face-value",
          description: "Incorrectly claims zero-coupon bonds have no face value; they still repay a face value at maturity, they simply pay no periodic coupons.",
          blameConceptId: "bonds-and-fixed-income",
        },
      },
    ],
    difficulty: 0.4,
    discrimination: 1.5,
    expectedSeconds: 80,
    prereqClosure: ["yield-to-maturity", "bonds-and-fixed-income"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "yield-to-maturity--apply-one-year-zero-ytm",
    conceptId: "yield-to-maturity",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A 1-year zero-coupon bond with face value $1,000 currently trades at $950. What is its yield to maturity, " +
      "as a percentage rounded to two decimal places?",
    answerKey: 5.26,
    tolerance: 0.05,
    difficulty: -0.6,
    discrimination: 1.3,
    expectedSeconds: 80,
    prereqClosure: ["yield-to-maturity", "bonds-and-fixed-income"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "yield-to-maturity--apply-three-year-zero-ytm",
    conceptId: "yield-to-maturity",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A 3-year zero-coupon bond with face value $1,000 currently trades at $863.84. What is its yield to " +
      "maturity, as a percentage rounded to two decimal places?",
    answerKey: 5.0,
    tolerance: 0.05,
    difficulty: 0.2,
    discrimination: 1.5,
    expectedSeconds: 110,
    prereqClosure: ["yield-to-maturity", "bonds-and-fixed-income"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "yield-to-maturity--apply-two-year-zero-ytm",
    conceptId: "yield-to-maturity",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A 2-year zero-coupon bond with face value $1,000 currently trades at $890.00. What is its yield to " +
      "maturity, as a percentage rounded to two decimal places?",
    answerKey: 6.0,
    tolerance: 0.05,
    difficulty: 0.1,
    discrimination: 1.4,
    expectedSeconds: 100,
    prereqClosure: ["yield-to-maturity", "bonds-and-fixed-income"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "yield-to-maturity--apply-par-bond-ytm",
    conceptId: "yield-to-maturity",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "A bond with a 6% annual coupon rate currently trades at exactly $1,000, its face value. What is its yield " +
      "to maturity, as a percentage?",
    answerKey: 6.0,
    tolerance: 0.01,
    difficulty: -0.8,
    discrimination: 1.2,
    expectedSeconds: 50,
    prereqClosure: ["yield-to-maturity", "bonds-and-fixed-income"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "yield-to-maturity--apply-premium-bond-ytm-check",
    conceptId: "yield-to-maturity",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A 2-year bond with an 8% annual coupon rate and face value $1,000 currently trades at $1,036.67. Verify " +
      "that its yield to maturity is 6% by checking that discounting its cash flows (an $80 coupon in year 1, " +
      "and $1,080 in year 2) at 6% reproduces the given price. State the yield to maturity, as a percentage.",
    answerKey: 6.0,
    tolerance: 0.05,
    difficulty: 0.3,
    discrimination: 1.5,
    expectedSeconds: 130,
    prereqClosure: ["yield-to-maturity", "bonds-and-fixed-income", "time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "yield-to-maturity--apply-discount-bond-ytm-check",
    conceptId: "yield-to-maturity",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A 2-year bond with a 4% annual coupon rate and face value $1,000 currently trades at $963.33. Verify that " +
      "its yield to maturity is 6% by checking that discounting its cash flows (a $40 coupon in year 1, and " +
      "$1,040 in year 2) at 6% reproduces the given price. State the yield to maturity, as a percentage.",
    answerKey: 6.0,
    tolerance: 0.05,
    difficulty: 0.3,
    discrimination: 1.5,
    expectedSeconds: 130,
    prereqClosure: ["yield-to-maturity", "bonds-and-fixed-income", "time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "yield-to-maturity--explain-why-numerical-solution-needed",
    conceptId: "yield-to-maturity",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "For a bond with more than one coupon remaining, explain why solving for yield to maturity generally " +
      "requires trial-and-error or a numerical solver, rather than a simple closed-form formula like the one " +
      "for a zero-coupon bond.",
    rubric: {
      elements: [
        {
          id: "polynomial-in-y",
          description: "Recognizes that the pricing equation Price = Σ C/(1+y)^t + F/(1+y)^n is a polynomial equation in (1+y) of degree equal to the number of periods, once cleared of fractions.",
          weight: 3,
          required: true,
        },
        {
          id: "no-general-closed-form",
          description: "Explains that polynomial equations of degree 3 or higher generally have no simple closed-form solution solvable by basic algebra, so y must be found by iterative approximation.",
          weight: 3,
          required: true,
          misconception: {
            id: "assumes-formula-always-exists",
            description: "Assumes a bond's YTM can always be isolated algebraically the way a zero-coupon bond's can, missing that multiple cash flows turn the equation into a higher-degree polynomial.",
            blameConceptId: "yield-to-maturity",
          },
        },
        {
          id: "zero-coupon-is-special-case",
          description: "Notes the zero-coupon case works because it reduces to a single term, F/(1+y)^n, which can be isolated with one root extraction.",
          weight: 1,
        },
      ],
    },
    difficulty: 0.9,
    discrimination: 1.6,
    expectedSeconds: 170,
    prereqClosure: ["yield-to-maturity", "bonds-and-fixed-income"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "yield-to-maturity--explain-premium-ytm-below-coupon",
    conceptId: "yield-to-maturity",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain, in terms of the bond's total return components, why a premium bond's yield to maturity is below " +
      "its coupon rate.",
    rubric: {
      elements: [
        {
          id: "two-return-components",
          description: "Identifies that an investor's total return combines coupon income plus any price change from the purchase price to face value at maturity.",
          weight: 2,
          required: true,
        },
        {
          id: "premium-implies-capital-loss",
          description: "Explains that a premium bond's price must fall from above face value down to exactly face value by maturity, so the price component of return is negative, dragging the overall YTM below the coupon-only return.",
          weight: 3,
          required: true,
          misconception: {
            id: "ignores-price-convergence-to-par",
            description: "Focuses only on the coupon income and ignores the built-in capital loss as a premium bond's price converges down to face value by maturity.",
            blameConceptId: "yield-to-maturity",
          },
        },
      ],
    },
    difficulty: 0.7,
    discrimination: 1.6,
    expectedSeconds: 150,
    prereqClosure: ["yield-to-maturity", "bonds-and-fixed-income"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "yield-to-maturity--explain-discount-ytm-above-coupon",
    conceptId: "yield-to-maturity",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain, in terms of the bond's total return components, why a discount bond's yield to maturity is above " +
      "its coupon rate.",
    rubric: {
      elements: [
        {
          id: "two-return-components",
          description: "Identifies that an investor's total return combines coupon income plus any price change from the purchase price to face value at maturity.",
          weight: 2,
          required: true,
        },
        {
          id: "discount-implies-capital-gain",
          description: "Explains that a discount bond's price must rise from below face value up to exactly face value by maturity, so the price component of return is positive, pushing the overall YTM above the coupon-only return.",
          weight: 3,
          required: true,
          misconception: {
            id: "ignores-price-convergence-to-par",
            description: "Focuses only on the coupon income and ignores the built-in capital gain as a discount bond's price converges up to face value by maturity.",
            blameConceptId: "yield-to-maturity",
          },
        },
      ],
    },
    difficulty: 0.7,
    discrimination: 1.6,
    expectedSeconds: 150,
    prereqClosure: ["yield-to-maturity", "bonds-and-fixed-income"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "yield-to-maturity--transfer-order-three-measures",
    conceptId: "yield-to-maturity",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "For a bond currently trading at a discount to face value, put its coupon rate, current yield, and yield " +
      "to maturity in increasing order, and justify each step of the ordering.",
    rubric: {
      elements: [
        {
          id: "correct-ordering",
          description: "Gives the ordering coupon rate < current yield < yield to maturity for a discount bond.",
          weight: 3,
          required: true,
        },
        {
          id: "coupon-vs-current-yield",
          description: "Justifies coupon rate < current yield by noting current yield divides the same coupon by a price below face value, which raises the ratio above the coupon rate.",
          weight: 2,
          required: true,
        },
        {
          id: "current-yield-vs-ytm",
          description: "Justifies current yield < YTM by noting YTM additionally captures the capital gain as the discounted price rises to face value by maturity, which current yield ignores.",
          weight: 2,
          required: true,
          misconception: {
            id: "ignores-capital-gain-in-ordering",
            description: "Omits the capital-gain component that separates current yield from YTM, treating the two measures as if they should coincide.",
            blameConceptId: "yield-to-maturity",
          },
        },
      ],
    },
    difficulty: 1.4,
    discrimination: 1.8,
    expectedSeconds: 190,
    prereqClosure: ["yield-to-maturity", "bonds-and-fixed-income"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "yield-to-maturity--transfer-rates-rise-price-falls-link",
    conceptId: "yield-to-maturity",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Market interest rates rise broadly across the economy. Explain, step by step, how this changes the " +
      "yield to maturity investors require on an existing fixed-coupon bond, and what that does to the bond's " +
      "market price.",
    rubric: {
      elements: [
        {
          id: "required-ytm-rises-with-market-rates",
          description: "Explains that investors now demand a higher YTM on the existing bond, to keep it competitive with newly issued bonds paying the higher prevailing rates.",
          weight: 3,
          required: true,
        },
        {
          id: "fixed-coupon-cannot-adjust",
          description: "Notes that the bond's coupon rate is fixed by its original contract and cannot rise to match, so the only way to deliver a higher YTM on fixed cash flows is for the price to fall.",
          weight: 3,
          required: true,
          misconception: {
            id: "assumes-coupon-adjusts",
            description: "Assumes the bond's coupon payment itself adjusts upward with market rates, when it is contractually fixed; only the price adjusts.",
            blameConceptId: "bonds-and-fixed-income",
          },
        },
      ],
    },
    difficulty: 1.0,
    discrimination: 1.6,
    expectedSeconds: 160,
    prereqClosure: ["yield-to-maturity", "bonds-and-fixed-income", "time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "yield-to-maturity--transfer-derive-zero-coupon-ytm-formula",
    conceptId: "yield-to-maturity",
    format: "derivation",
    cognitive: "transfer",
    channels: ["typed", "handwritten"],
    stem:
      "Starting from the zero-coupon bond pricing equation P = F/(1+y)^n, derive a closed-form expression for " +
      "the yield to maturity y in terms of P, F, and n.",
    rubric: {
      elements: [
        {
          id: "isolates-power-term",
          description: "Rearranges P = F/(1+y)^n to (1+y)^n = F/P.",
          weight: 2,
          required: true,
        },
        {
          id: "takes-nth-root",
          description: "Takes the n-th root of both sides to get 1+y = (F/P)^(1/n).",
          weight: 3,
          required: true,
          misconception: {
            id: "mishandles-root-extraction",
            description: "Fails to correctly invert the exponent n when isolating y, for instance by dividing by n instead of taking an n-th root.",
            blameConceptId: "yield-to-maturity",
          },
        },
        {
          id: "final-formula",
          description: "Concludes y = (F/P)^(1/n) − 1.",
          weight: 2,
          required: true,
        },
      ],
    },
    difficulty: 1.2,
    discrimination: 1.6,
    expectedSeconds: 180,
    prereqClosure: ["yield-to-maturity", "bonds-and-fixed-income", "time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "yield-to-maturity--explain-ytm-as-internal-rate-of-return",
    conceptId: "yield-to-maturity",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain why yield to maturity is described as the bond's 'internal rate of return,' connecting this to " +
      "how YTM is actually defined and solved for.",
    rubric: {
      elements: [
        {
          id: "irr-defined-as-rate-equating-pv-to-price",
          description: "Explains that an internal rate of return is, by definition, the single discount rate that makes the present value of a stream of cash flows equal to its cost — exactly the equation YTM solves.",
          weight: 3,
          required: true,
        },
        {
          id: "bond-specific-instance",
          description: "Identifies the bond's cash flows (coupons and face value) and its market price as the specific inputs plugged into that general internal-rate-of-return equation.",
          weight: 3,
          required: true,
          misconception: {
            id: "treats-ytm-as-unrelated-to-irr",
            description: "Treats yield to maturity as a bond-specific formula unrelated to the general internal-rate-of-return concept, rather than recognizing it as that concept applied to a bond's cash flows.",
            blameConceptId: "yield-to-maturity",
          },
        },
      ],
    },
    difficulty: 0.6,
    discrimination: 1.4,
    expectedSeconds: 140,
    prereqClosure: ["yield-to-maturity", "bonds-and-fixed-income"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "yield-to-maturity--explain-reinvestment-risk-caveat",
    conceptId: "yield-to-maturity",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "An investor buys a coupon bond and plans to hold it to maturity. Explain why the yield to maturity quoted " +
      "at purchase is not guaranteed to equal the investor's actual realized annualized return, even if the " +
      "issuer never misses a payment.",
    rubric: {
      elements: [
        {
          id: "quoted-ytm-assumes-fixed-reinvestment-rate",
          description: "Notes that the quoted YTM is only achieved if every coupon is reinvested at that same YTM rate for the remaining life of the bond.",
          weight: 3,
          required: true,
        },
        {
          id: "actual-reinvestment-rates-vary",
          description: "Explains that actual future reinvestment rates depend on where market interest rates go, which is unknown at purchase, so the realized return can end up above or below the quoted YTM.",
          weight: 3,
          required: true,
          misconception: {
            id: "conflates-no-default-with-guaranteed-return",
            description: "Assumes that avoiding default is sufficient to guarantee the quoted YTM, missing that the reinvestment-rate assumption is a separate source of uncertainty.",
            blameConceptId: "yield-to-maturity",
          },
        },
      ],
    },
    difficulty: 0.8,
    discrimination: 1.5,
    expectedSeconds: 150,
    prereqClosure: ["yield-to-maturity", "bonds-and-fixed-income"],
    source: AUTHORED,
    status: "live",
  },
];
