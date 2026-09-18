import type { Item, SourceRef } from "../../lib/assessment/types";

/**
 * Item bank for two zero-item "financial instruments" concepts:
 * `interest-rate-and-currency-swaps` and `credit-default-swaps`. Twenty items
 * per concept — a full-maturity pool, mixed across format and cognitive
 * level — authored from the concept and its allowed prerequisite ancestors
 * with no external seed.
 */

const AUTHORED: SourceRef = {
  id: "mathlingo-authored-swaps-credit",
  tier: "generated",
  title: "Mathlingo authored item (swaps and credit)",
};

export const financialSwapsCreditItems: Item[] = [
  // ===========================================================================
  // interest-rate-and-currency-swaps
  // ===========================================================================
  {
    id: "interest-rate-and-currency-swaps--recall-definition",
    conceptId: "interest-rate-and-currency-swaps",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What best describes an interest rate swap?",
    choices: [
      {
        id: "a",
        text: "An agreement between two parties to exchange interest payments on a notional amount, with no exchange of the notional itself",
        correct: true,
      },
      {
        id: "b",
        text: "A loan where the borrower repays the principal plus interest to the lender at maturity",
        correct: false,
        misconception: {
          id: "swap-confused-with-loan",
          description:
            "Treats the swap as an ordinary loan. No principal changes hands in a plain interest rate swap; only the interest cash flows are exchanged.",
          blameConceptId: "interest-rate-and-currency-swaps",
        },
      },
      {
        id: "c",
        text: "A contract that gives one party the right, but not the obligation, to exchange interest payments",
        correct: false,
        misconception: {
          id: "swap-confused-with-option",
          description:
            "Describes an option (a right without obligation). A swap is a firm bilateral commitment to exchange cash flows, not an optional one.",
          blameConceptId: "derivatives-overview",
        },
      },
      {
        id: "d",
        text: "A single upfront payment made to transfer default risk on a bond to another party",
        correct: false,
        misconception: {
          id: "swap-confused-with-cds",
          description:
            "Describes a credit default swap's protection payment, not an interest rate swap, which exchanges periodic interest cash flows rather than transferring default risk.",
          blameConceptId: "interest-rate-and-currency-swaps",
        },
      },
    ],
    difficulty: -1.4,
    discrimination: 1.1,
    expectedSeconds: 30,
    prereqClosure: ["interest-rate-and-currency-swaps"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "interest-rate-and-currency-swaps--recall-no-principal-exchange",
    conceptId: "interest-rate-and-currency-swaps",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "In a plain vanilla fixed-for-floating interest rate swap, what role does the notional principal play?",
    choices: [
      {
        id: "a",
        text: "It is only a reference amount used to calculate each side's interest payments; it is never itself exchanged",
        correct: true,
      },
      {
        id: "b",
        text: "It is exchanged at the start of the swap and returned at maturity, like a currency swap's principal",
        correct: false,
        misconception: {
          id: "principal-exchanged-in-irs",
          description:
            "Imports the principal exchange from a currency swap. In a single-currency interest rate swap the notional is never physically exchanged, which is why it is called 'notional'.",
          blameConceptId: "interest-rate-and-currency-swaps",
        },
      },
      {
        id: "c",
        text: "It shrinks over time as each interest payment is made, like an amortizing loan balance",
        correct: false,
        misconception: {
          id: "notional-amortizes-by-default",
          description:
            "Assumes amortization is automatic. A plain vanilla swap uses a constant notional throughout unless the contract specifically calls for an amortizing schedule.",
          blameConceptId: "interest-rate-and-currency-swaps",
        },
      },
    ],
    difficulty: -1.0,
    discrimination: 1.2,
    expectedSeconds: 35,
    prereqClosure: ["interest-rate-and-currency-swaps"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "interest-rate-and-currency-swaps--recall-currency-swap-difference",
    conceptId: "interest-rate-and-currency-swaps",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "How does a currency swap differ from a plain vanilla single-currency interest rate swap?",
    choices: [
      {
        id: "a",
        text: "A currency swap exchanges cash flows denominated in two different currencies, and typically does exchange principal at inception and maturity",
        correct: true,
      },
      {
        id: "b",
        text: "A currency swap never involves any exchange of principal, exactly like an interest rate swap",
        correct: false,
        misconception: {
          id: "currency-swap-no-principal",
          description:
            "Misses the key structural difference: because the two legs are in different currencies, the principal amounts are usually exchanged at the start and re-exchanged at maturity so each side ends up back in its own currency.",
          blameConceptId: "interest-rate-and-currency-swaps",
        },
      },
      {
        id: "c",
        text: "A currency swap always uses two floating rates, while an interest rate swap always uses two fixed rates",
        correct: false,
        misconception: {
          id: "swap-type-confused-with-rate-type",
          description:
            "Confuses the currency dimension with the fixed/floating dimension. Either swap type can be fixed-for-fixed, fixed-for-floating, or floating-for-floating.",
          blameConceptId: "interest-rate-and-currency-swaps",
        },
      },
    ],
    difficulty: -0.8,
    discrimination: 1.2,
    expectedSeconds: 45,
    prereqClosure: ["interest-rate-and-currency-swaps"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "interest-rate-and-currency-swaps--recall-features",
    conceptId: "interest-rate-and-currency-swaps",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which statements about interest rate and currency swaps are true? Select all that apply.",
    choices: [
      { id: "a", text: "The two parties agree on a payment schedule in advance", correct: true },
      { id: "b", text: "A fixed-for-floating swap has one leg tied to a reference rate that resets periodically", correct: true },
      { id: "c", text: "Swaps are traded over-the-counter and can be customized to the parties' needs", correct: true },
      {
        id: "d",
        text: "Every swap must have a maturity of one year or less",
        correct: false,
        misconception: {
          id: "swap-maturity-capped",
          description:
            "Invents a maturity restriction. Swaps commonly run for several years to match the underlying exposure being hedged.",
          blameConceptId: "interest-rate-and-currency-swaps",
        },
      },
      {
        id: "e",
        text: "Only banks are permitted to be counterparties to a swap",
        correct: false,
        misconception: {
          id: "swap-counterparty-restricted",
          description:
            "Overstates who may enter a swap. Corporations, governments, and investment funds all use swaps directly, often with a bank as one side but not both.",
          blameConceptId: "interest-rate-and-currency-swaps",
        },
      },
    ],
    difficulty: -0.6,
    discrimination: 1.3,
    expectedSeconds: 60,
    prereqClosure: ["interest-rate-and-currency-swaps", "derivatives-overview"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "interest-rate-and-currency-swaps--apply-net-payment-fixed-receiver",
    conceptId: "interest-rate-and-currency-swaps",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A swap has a notional of $10,000,000. Party A receives a fixed rate of 4% per year and pays a floating " +
      "rate, currently set at 3% per year for the period. For this one-year period, what net payment (in " +
      "dollars) does Party A receive from Party B? Give a whole number.",
    answerKey: 100000,
    tolerance: 1,
    difficulty: -0.5,
    discrimination: 1.3,
    expectedSeconds: 75,
    prereqClosure: ["interest-rate-and-currency-swaps", "time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "interest-rate-and-currency-swaps--apply-net-payment-floating-receiver",
    conceptId: "interest-rate-and-currency-swaps",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A swap has a notional of $5,000,000. Party B pays a fixed rate of 5% per year and receives a floating " +
      "rate, currently set at 6.5% per year for the period. For this one-year period, what net payment (in " +
      "dollars) does Party B receive from Party A? Give a whole number.",
    answerKey: 75000,
    tolerance: 1,
    difficulty: -0.3,
    discrimination: 1.3,
    expectedSeconds: 90,
    prereqClosure: ["interest-rate-and-currency-swaps", "time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "interest-rate-and-currency-swaps--apply-half-year-payment",
    conceptId: "interest-rate-and-currency-swaps",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A swap has a notional of $20,000,000 and pays net settlements semiannually. The fixed rate is 3% per " +
      "year and the floating rate for the upcoming period is 2.2% per year. What is the net payment (in " +
      "dollars) from the floating-rate payer to the fixed-rate payer for this half-year period? Give a whole " +
      "number.",
    answerKey: 80000,
    tolerance: 1,
    difficulty: 0.2,
    discrimination: 1.4,
    expectedSeconds: 110,
    prereqClosure: ["interest-rate-and-currency-swaps", "time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "interest-rate-and-currency-swaps--apply-identify-who-benefits",
    conceptId: "interest-rate-and-currency-swaps",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem:
      "A company pays fixed and receives floating on an interest rate swap. Interest rates rise sharply after " +
      "the swap is entered into. Who benefits from this move, all else equal?",
    choices: [
      { id: "a", text: "The company, since it now receives a larger floating payment while still paying the same fixed rate", correct: true },
      {
        id: "b",
        text: "The counterparty, since floating rates rising always favors whoever pays floating",
        correct: false,
        misconception: {
          id: "floating-payer-always-benefits",
          description:
            "Assumes the floating payer always benefits from rate increases, when in fact rising rates raise the floating payer's own cost and instead favor the party receiving floating.",
          blameConceptId: "interest-rate-and-currency-swaps",
        },
      },
      {
        id: "c",
        text: "Neither party, since the fixed and floating legs always move together",
        correct: false,
        misconception: {
          id: "swap-legs-always-offset",
          description:
            "Assumes the fixed leg automatically tracks the floating leg. The fixed leg is contractually locked in, which is exactly why a rate move creates a winner and a loser.",
          blameConceptId: "interest-rate-and-currency-swaps",
        },
      },
    ],
    difficulty: 0.0,
    discrimination: 1.4,
    expectedSeconds: 90,
    prereqClosure: ["interest-rate-and-currency-swaps", "yield-curve-and-term-structure"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "interest-rate-and-currency-swaps--apply-currency-swap-principal-flows",
    conceptId: "interest-rate-and-currency-swaps",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "At the start of a currency swap, a US firm exchanges $10,000,000 for euros at a spot rate of 1.25 " +
      "USD/EUR. How many euros (in whole numbers) does the US firm receive at inception?",
    answerKey: 8000000,
    tolerance: 1000,
    difficulty: -0.2,
    discrimination: 1.3,
    expectedSeconds: 90,
    prereqClosure: ["interest-rate-and-currency-swaps"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "interest-rate-and-currency-swaps--apply-fixed-for-fixed-currency-payments",
    conceptId: "interest-rate-and-currency-swaps",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "In a fixed-for-fixed currency swap, one party pays 4% per year on a €8,000,000 notional and receives 6% " +
      "per year on a $10,000,000 notional, with interest payments made annually. What is the dollar amount of " +
      "the annual payment this party receives, before converting the euro leg? Give a whole number.",
    answerKey: 600000,
    tolerance: 1,
    difficulty: 0.1,
    discrimination: 1.4,
    expectedSeconds: 100,
    prereqClosure: ["interest-rate-and-currency-swaps"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "interest-rate-and-currency-swaps--explain-why-no-principal-exchange",
    conceptId: "interest-rate-and-currency-swaps",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain why a single-currency interest rate swap does not need to exchange the notional principal, " +
      "even though the notional is essential to computing the payments.",
    rubric: {
      elements: [
        {
          id: "same-currency-cancels",
          description:
            "Explains that because both legs are denominated in the same currency and same notional, exchanging the principal at the start and returning the identical amount at the end would net to zero and change nothing real.",
          weight: 3,
          required: true,
          misconception: {
            id: "notional-thought-necessary",
            description:
              "Believes the notional must physically change hands for the swap to be valid, missing that it is purely a reference quantity here.",
            blameConceptId: "interest-rate-and-currency-swaps",
          },
        },
        {
          id: "notional-as-reference",
          description:
            "States that the notional's only role is to scale the interest rate differential into a dollar cash flow each period.",
          weight: 2,
          required: true,
        },
        {
          id: "contrast-currency-swap",
          description:
            "Contrasts this with a currency swap, where the two legs are in different currencies, so exchanging and re-exchanging principal is not a no-op and does matter.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.2,
    discrimination: 1.4,
    expectedSeconds: 150,
    prereqClosure: ["interest-rate-and-currency-swaps"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "interest-rate-and-currency-swaps--explain-comparative-advantage-motive",
    conceptId: "interest-rate-and-currency-swaps",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "One classic motive for entering a swap is 'comparative advantage' in borrowing markets. Explain the " +
      "basic idea: how can two firms both end up better off by swapping interest payments, if neither firm's " +
      "actual borrowing costs change?",
    rubric: {
      elements: [
        {
          id: "different-relative-costs",
          description:
            "Explains that each firm has a different relative advantage across fixed versus floating markets (e.g. one firm's fixed rate is only slightly better than the other's, but its floating rate is much better), even if one firm has an absolute advantage in both.",
          weight: 3,
          required: true,
        },
        {
          id: "borrow-in-strength-then-swap",
          description:
            "States that each firm borrows in the market where it has the comparative advantage and then swaps into the exposure it actually wants, so both firms achieve a lower effective cost than borrowing directly in their desired form.",
          weight: 3,
          required: true,
          misconception: {
            id: "no-gain-without-arbitrage",
            description:
              "Assumes no mutual gain is possible unless someone is being cheated, missing that comparative — not absolute — advantage is what creates the shared surplus.",
            blameConceptId: "interest-rate-and-currency-swaps",
          },
        },
        {
          id: "counterparty-risk-caveat",
          description: "Notes this gain assumes the swap counterparty performs; it does not eliminate default risk on either side.",
          weight: 1,
        },
      ],
    },
    difficulty: 0.6,
    discrimination: 1.5,
    expectedSeconds: 180,
    prereqClosure: ["interest-rate-and-currency-swaps", "bonds-and-fixed-income"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "interest-rate-and-currency-swaps--explain-swap-rate-and-yield-curve",
    conceptId: "interest-rate-and-currency-swaps",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain how the fixed rate quoted on a newly issued at-market interest rate swap relates to the current " +
      "yield curve, and why that fixed rate is generally different for a 2-year swap versus a 10-year swap.",
    rubric: {
      elements: [
        {
          id: "fixed-rate-from-curve",
          description:
            "Explains that the fixed swap rate is set so the present value of the fixed leg equals the present value of the expected floating leg, both discounted along the current yield curve, making the swap worth zero at inception.",
          weight: 3,
          required: true,
        },
        {
          id: "term-structure-drives-differences",
          description:
            "Explains that different maturities reference different points on the term structure, so a non-flat yield curve produces different fixed rates for different swap tenors.",
          weight: 3,
          required: true,
          misconception: {
            id: "single-fixed-rate-assumed",
            description:
              "Assumes one fixed rate applies to all swap maturities, ignoring that the swap rate is itself a curve derived from the term structure.",
            blameConceptId: "yield-curve-and-term-structure",
          },
        },
      ],
    },
    difficulty: 0.9,
    discrimination: 1.6,
    expectedSeconds: 180,
    prereqClosure: ["interest-rate-and-currency-swaps", "yield-curve-and-term-structure"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "interest-rate-and-currency-swaps--explain-counterparty-risk-both-directions",
    conceptId: "interest-rate-and-currency-swaps",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "In a bond, only the issuer can default on the bondholder. Explain why an interest rate swap's " +
      "counterparty risk is different, and who bears the risk at a given point in time.",
    rubric: {
      elements: [
        {
          id: "two-way-obligation",
          description:
            "Explains that both parties owe payments to each other, so either side could default, unlike a bond where only the issuer owes anything.",
          weight: 3,
          required: true,
          misconception: {
            id: "one-sided-risk-assumed",
            description:
              "Treats swap counterparty risk as one-directional like bond issuer risk, missing that a swap is a mutual obligation.",
            blameConceptId: "interest-rate-and-currency-swaps",
          },
        },
        {
          id: "risk-follows-current-value",
          description:
            "States that at any moment, the party for whom the swap currently has positive value is the one exposed to the other's default, and this can flip over the life of the swap as rates move.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.7,
    discrimination: 1.5,
    expectedSeconds: 160,
    prereqClosure: ["interest-rate-and-currency-swaps", "bonds-and-fixed-income"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "interest-rate-and-currency-swaps--transfer-swap-as-bond-portfolio",
    conceptId: "interest-rate-and-currency-swaps",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "An interest rate swap can be valued as the difference between a fixed-rate bond and a floating-rate " +
      "bond. Explain this equivalence: which position corresponds to the fixed-rate payer, and why the " +
      "floating-rate bond's value is easy to pin down at each reset date.",
    rubric: {
      elements: [
        {
          id: "long-short-bond-view",
          description:
            "States that a fixed-rate payer is equivalent to being short a fixed-rate bond and long a floating-rate bond (paying fixed coupons, receiving rate-linked coupons), of the same notional and maturity.",
          weight: 3,
          required: true,
        },
        {
          id: "floating-bond-resets-to-par",
          description:
            "Explains that a floating-rate bond's value resets to par immediately after each coupon payment, because its next coupon is set at the then-current market rate, so its value is easy to determine at reset dates.",
          weight: 3,
          required: true,
          misconception: {
            id: "floating-bond-value-uncertain",
            description:
              "Treats the floating-rate bond's value as hard to pin down, missing that resetting the coupon to the market rate is exactly what keeps it at par right after each reset.",
            blameConceptId: "bonds-and-fixed-income",
          },
        },
        {
          id: "fixed-bond-priced-by-discounting",
          description:
            "Notes the fixed-rate bond is priced the ordinary way, by discounting its fixed coupons and principal along the current yield curve.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.5,
    discrimination: 1.7,
    expectedSeconds: 220,
    prereqClosure: ["interest-rate-and-currency-swaps", "bonds-and-fixed-income", "yield-to-maturity"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "interest-rate-and-currency-swaps--transfer-hedging-a-bond-issue",
    conceptId: "interest-rate-and-currency-swaps",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A company has issued fixed-rate debt but wants its interest expense to track short-term rates instead. " +
      "Describe the swap position it should enter, and explain what its combined (bond + swap) cash flows look " +
      "like afterward.",
    rubric: {
      elements: [
        {
          id: "receive-fixed-pay-floating",
          description:
            "Identifies that the company should enter a swap to receive fixed and pay floating, on a notional and schedule matching the bond.",
          weight: 3,
          required: true,
          misconception: {
            id: "wrong-swap-direction",
            description:
              "Has the company pay fixed and receive floating, which would add to, rather than offset, its fixed-rate exposure.",
            blameConceptId: "interest-rate-and-currency-swaps",
          },
        },
        {
          id: "fixed-legs-cancel",
          description:
            "Explains that the fixed coupon the company pays on the bond is offset by the fixed payment it receives on the swap, leaving a net floating-rate payment.",
          weight: 3,
          required: true,
        },
        {
          id: "synthetic-floating-debt",
          description: "Concludes the combination synthetically converts the fixed-rate bond into floating-rate debt.",
          weight: 1,
        },
      ],
    },
    difficulty: 1.3,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["interest-rate-and-currency-swaps", "bonds-and-fixed-income"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "interest-rate-and-currency-swaps--transfer-equity-swap-analogy",
    conceptId: "interest-rate-and-currency-swaps",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Some swaps exchange a fixed or floating interest payment for the total return on a stock index instead " +
      "of a second interest rate leg. Explain how this 'equity swap' still fits the general definition of a " +
      "swap, and identify one new risk it introduces that a fixed-for-floating interest rate swap does not have.",
    rubric: {
      elements: [
        {
          id: "still-a-cash-flow-exchange",
          description:
            "Explains that it still fits the definition — two parties exchanging a scheduled series of cash flows on a notional, without exchanging the notional itself — only one leg is now linked to an equity index rather than a reference interest rate.",
          weight: 3,
          required: true,
        },
        {
          id: "new-risk-named",
          description:
            "Names a risk unique to the equity leg, such as the index return being far more volatile than a reference interest rate, or the payer of the equity leg potentially owing money to the other side if the index falls.",
          weight: 3,
          required: true,
          misconception: {
            id: "equity-swap-risk-same-as-irs",
            description:
              "Assumes the equity swap carries exactly the risk profile of an interest rate swap, missing that linking a leg to an equity index brings in market risk of a different magnitude and sign pattern.",
            blameConceptId: "equities-and-stock-markets",
          },
        },
      ],
    },
    difficulty: 1.6,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["interest-rate-and-currency-swaps", "equities-and-stock-markets"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "interest-rate-and-currency-swaps--apply-mcq-floating-rate-source",
    conceptId: "interest-rate-and-currency-swaps",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "A floating-rate leg of a swap resets every six months to a reference rate observed at the start of each " +
      "period. If the reference rate rises between the first and second reset, what happens to the payment made " +
      "at the end of the second period, compared to the first?",
    choices: [
      { id: "a", text: "It increases, since the reset happens before the period begins and locks in the higher rate for that period", correct: true },
      {
        id: "b",
        text: "It stays the same, since floating payments are only recalculated at maturity",
        correct: false,
        misconception: {
          id: "floating-rate-fixed-until-maturity",
          description:
            "Misses that the floating leg resets periodically throughout the life of the swap, not just once at the end.",
          blameConceptId: "interest-rate-and-currency-swaps",
        },
      },
      {
        id: "c",
        text: "It decreases, since a higher reference rate means the floating payer owes less",
        correct: false,
        misconception: {
          id: "floating-rate-inverse-relationship",
          description:
            "Reverses the direction: a higher reference rate produces a larger floating payment, not a smaller one.",
          blameConceptId: "interest-rate-and-currency-swaps",
        },
      },
    ],
    difficulty: -0.1,
    discrimination: 1.3,
    expectedSeconds: 70,
    prereqClosure: ["interest-rate-and-currency-swaps"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "interest-rate-and-currency-swaps--derivation-swap-value-two-bonds",
    conceptId: "interest-rate-and-currency-swaps",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "A fixed-rate payer's swap has notional N, fixed rate c, one remaining annual payment, and the floating " +
      "leg has just reset. Let r be the one-year discount rate. Using the fixed-bond-minus-floating-bond " +
      "decomposition, derive an expression for the value of the swap to the fixed-rate payer, and simplify it " +
      "as much as possible.",
    rubric: {
      elements: [
        {
          id: "sets-up-both-bond-values",
          description:
            "Writes the fixed-leg value as the present value of a final coupon-plus-notional payment, N(1+c)/(1+r), and the floating-leg value as N (par, since it has just reset).",
          weight: 3,
          required: true,
        },
        {
          id: "correct-sign",
          description:
            "Takes the swap value to the fixed-rate payer as (value of floating leg) − (value of fixed leg) = N − N(1+c)/(1+r), since the fixed-rate payer effectively receives the floating bond and owes the fixed bond.",
          weight: 3,
          required: true,
          misconception: {
            id: "sign-reversed",
            description:
              "Reverses which leg is received versus owed, producing the value with the wrong sign for the fixed-rate payer.",
              blameConceptId: "interest-rate-and-currency-swaps",
          },
        },
        {
          id: "simplifies",
          description:
            "Simplifies to N[(1+r) − (1+c)]/(1+r) = N(r − c)/(1+r), showing the swap gains value for the fixed-rate payer when the market rate r rises above the locked-in fixed rate c.",
          weight: 2,
          required: true,
        },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.7,
    expectedSeconds: 260,
    prereqClosure: ["interest-rate-and-currency-swaps", "bonds-and-fixed-income", "time-value-of-money", "yield-to-maturity"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "interest-rate-and-currency-swaps--transfer-basis-swap",
    conceptId: "interest-rate-and-currency-swaps",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A 'basis swap' exchanges two different floating rates (for example, one reference rate for another) " +
      "rather than a fixed rate for a floating rate. Explain why this still qualifies as a swap under the " +
      "general definition, and describe one real-world reason a firm might want to enter one.",
    rubric: {
      elements: [
        {
          id: "fits-general-definition",
          description:
            "Explains that the general definition only requires exchanging a scheduled series of cash flows on a notional without exchanging the notional; nothing requires one leg to be fixed, so two floating legs still qualify.",
          weight: 3,
          required: true,
          misconception: {
            id: "swap-requires-a-fixed-leg",
            description:
              "Assumes a swap must always have a fixed leg, missing that the fixed-for-floating structure is only the most common example, not part of the definition.",
            blameConceptId: "interest-rate-and-currency-swaps",
          },
        },
        {
          id: "gives-real-reason",
          description:
            "Gives a plausible reason, such as a firm holding floating-rate assets tied to one reference rate and floating-rate liabilities tied to another, wanting to align the two exposures.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.4,
    discrimination: 1.5,
    expectedSeconds: 180,
    prereqClosure: ["interest-rate-and-currency-swaps"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "interest-rate-and-currency-swaps--apply-numeric-currency-swap-net-interest",
    conceptId: "interest-rate-and-currency-swaps",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "In a fixed-for-fixed currency swap, Party X pays 5% annually on a $12,000,000 notional and receives 3% " +
      "annually on a €10,000,000 notional. The spot exchange rate is 1.20 USD/EUR, used to convert the euro " +
      "interest into dollars for comparison. What is Party X's net dollar cash flow this year (amount received " +
      "in dollar-equivalent terms minus amount paid)? Give a whole number; a negative number means a net " +
      "outflow.",
    answerKey: -240000,
    tolerance: 1000,
    difficulty: 0.8,
    discrimination: 1.5,
    expectedSeconds: 150,
    prereqClosure: ["interest-rate-and-currency-swaps"],
    source: AUTHORED,
    status: "live",
  },

  // ===========================================================================
  // credit-default-swaps
  // ===========================================================================
  {
    id: "credit-default-swaps--recall-definition",
    conceptId: "credit-default-swaps",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What does a credit default swap (CDS) do?",
    choices: [
      {
        id: "a",
        text: "The protection buyer pays a periodic premium to the protection seller, who pays out if a specified credit event occurs on the reference bond or issuer",
        correct: true,
      },
      {
        id: "b",
        text: "It exchanges fixed interest payments for floating interest payments between two parties",
        correct: false,
        misconception: {
          id: "cds-confused-with-irs",
          description:
            "Describes an interest rate swap. A CDS transfers default risk on a specific reference entity, not interest rate exposure.",
          blameConceptId: "interest-rate-and-currency-swaps",
        },
      },
      {
        id: "c",
        text: "It guarantees the buyer a fixed return regardless of the reference issuer's credit quality",
        correct: false,
        misconception: {
          id: "cds-as-guaranteed-return",
          description:
            "Treats the CDS as a return guarantee. It only pays out on a defined credit event; absent that, the buyer only pays premiums and receives nothing.",
          blameConceptId: "credit-default-swaps",
        },
      },
      {
        id: "d",
        text: "It requires the protection buyer to physically deliver the reference bond to the seller at inception",
        correct: false,
        misconception: {
          id: "cds-requires-upfront-bond-delivery",
          description:
            "Confuses the CDS with a repo or a bond sale. No bond changes hands at inception; the buyer pays a periodic premium and delivery (if any) happens only after a credit event.",
          blameConceptId: "credit-default-swaps",
        },
      },
    ],
    difficulty: -1.4,
    discrimination: 1.1,
    expectedSeconds: 35,
    prereqClosure: ["credit-default-swaps"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "credit-default-swaps--recall-insurance-analogy",
    conceptId: "credit-default-swaps",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "A CDS is often compared to insurance. In that analogy, what plays the role of the 'insurance premium'?",
    choices: [
      { id: "a", text: "The periodic spread payment the protection buyer makes to the protection seller", correct: true },
      {
        id: "b",
        text: "The payout the protection seller makes after a credit event",
        correct: false,
        misconception: {
          id: "payout-confused-with-premium",
          description:
            "Confuses the contingent payout (what insurance pays when a claim occurs) with the premium (the regular cost of holding the coverage).",
          blameConceptId: "credit-default-swaps",
        },
      },
      {
        id: "c",
        text: "The face value of the reference bond",
        correct: false,
        misconception: {
          id: "notional-confused-with-premium",
          description:
            "Confuses the notional amount being insured with the periodic cost of the insurance itself, which is only a small fraction of the notional.",
          blameConceptId: "credit-default-swaps",
        },
      },
    ],
    difficulty: -1.1,
    discrimination: 1.2,
    expectedSeconds: 40,
    prereqClosure: ["credit-default-swaps"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "credit-default-swaps--recall-credit-event",
    conceptId: "credit-default-swaps",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which of the following are typically defined as 'credit events' that can trigger a CDS payout? Select all that apply.",
    choices: [
      { id: "a", text: "Failure to make a scheduled interest or principal payment on the reference debt", correct: true },
      { id: "b", text: "A formal bankruptcy filing by the reference entity", correct: true },
      { id: "c", text: "A restructuring of the reference debt that is unfavorable to creditors", correct: true },
      {
        id: "d",
        text: "A downgrade of the reference entity's credit rating by one notch",
        correct: false,
        misconception: {
          id: "downgrade-as-credit-event",
          description:
            "Treats a rating downgrade as a payout trigger. A downgrade changes the CDS spread and market value but is not itself a defined credit event under standard CDS documentation.",
          blameConceptId: "credit-default-swaps",
        },
      },
      {
        id: "e",
        text: "A decline in the reference entity's stock price",
        correct: false,
        misconception: {
          id: "stock-decline-as-credit-event",
          description:
            "Confuses equity market moves with defined credit events. A CDS pays out on defined debt-related events, not on equity price movements.",
          blameConceptId: "equities-and-stock-markets",
        },
      },
    ],
    difficulty: -0.7,
    discrimination: 1.3,
    expectedSeconds: 65,
    prereqClosure: ["credit-default-swaps", "bonds-and-fixed-income"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "credit-default-swaps--recall-buyer-vs-seller-view",
    conceptId: "credit-default-swaps",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which party in a CDS is effectively 'short' the reference entity's credit risk — that is, benefits if the reference entity's credit quality deteriorates?",
    choices: [
      { id: "a", text: "The protection buyer, who profits (or is made whole) if a credit event occurs", correct: true },
      {
        id: "b",
        text: "The protection seller, who profits if a credit event occurs",
        correct: false,
        misconception: {
          id: "seller-benefits-from-default",
          description:
            "Reverses the direction: the protection seller collects a steady premium but must pay out if a credit event occurs, so the seller is effectively long the credit, not short it.",
          blameConceptId: "credit-default-swaps",
        },
      },
      {
        id: "c",
        text: "Both parties benefit equally from a credit event, since the payout simply passes value between them",
        correct: false,
        misconception: {
          id: "cds-symmetric-payoff-assumed",
          description:
            "Misses that a CDS payoff is asymmetric: one side pays a small fixed premium regardless of outcome, while the other side faces a large contingent liability only in the bad state.",
          blameConceptId: "credit-default-swaps",
        },
      },
    ],
    difficulty: -0.5,
    discrimination: 1.3,
    expectedSeconds: 60,
    prereqClosure: ["credit-default-swaps"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "credit-default-swaps--apply-annual-premium-payment",
    conceptId: "credit-default-swaps",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A CDS references $10,000,000 of notional debt and has an annual spread of 150 basis points. What is the " +
      "annual premium (in dollars) the protection buyer pays? Give a whole number.",
    answerKey: 150000,
    tolerance: 1,
    difficulty: -0.6,
    discrimination: 1.3,
    expectedSeconds: 70,
    prereqClosure: ["credit-default-swaps"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "credit-default-swaps--apply-quarterly-premium-payment",
    conceptId: "credit-default-swaps",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A CDS has a notional of $6,000,000 and an annual spread of 200 basis points, paid quarterly in equal " +
      "installments. What is each quarterly premium payment (in dollars)? Give a whole number.",
    answerKey: 30000,
    tolerance: 1,
    difficulty: -0.1,
    discrimination: 1.4,
    expectedSeconds: 100,
    prereqClosure: ["credit-default-swaps"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "credit-default-swaps--apply-payout-after-default-cash-settlement",
    conceptId: "credit-default-swaps",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A CDS with $8,000,000 notional is cash-settled after a credit event. The reference bond's recovery rate " +
      "is 40% of face value. What does the protection seller pay the protection buyer? Give a whole number, in " +
      "dollars.",
    answerKey: 4800000,
    tolerance: 1000,
    difficulty: 0.1,
    discrimination: 1.4,
    expectedSeconds: 110,
    prereqClosure: ["credit-default-swaps", "bonds-and-fixed-income"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "credit-default-swaps--apply-expected-loss",
    conceptId: "credit-default-swaps",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A bond has a notional of $5,000,000, a one-year default probability of 3%, and a recovery rate of 40% " +
      "if default occurs. What is the expected loss (in dollars) over the year? Give a whole number.",
    answerKey: 90000,
    tolerance: 100,
    difficulty: 0.3,
    discrimination: 1.5,
    expectedSeconds: 120,
    prereqClosure: ["credit-default-swaps", "bonds-and-fixed-income"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "credit-default-swaps--apply-implied-default-probability",
    conceptId: "credit-default-swaps",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A one-year CDS trades at a spread of 300 basis points, and the recovery rate on the reference bond is " +
      "expected to be 50%. Using the rough approximation that the annual spread equals the default probability " +
      "times the loss given default, what one-year default probability (as a decimal) is implied? Give a " +
      "decimal to two places.",
    answerKey: 0.06,
    tolerance: 0.005,
    difficulty: 0.7,
    discrimination: 1.6,
    expectedSeconds: 150,
    prereqClosure: ["credit-default-swaps", "bonds-and-fixed-income"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "credit-default-swaps--apply-implied-default-probability-higher-recovery",
    conceptId: "credit-default-swaps",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A one-year CDS trades at a spread of 400 basis points, and the recovery rate is expected to be 60%. " +
      "Using the approximation that the annual spread equals the default probability times the loss given " +
      "default, what one-year default probability (as a decimal) is implied? Give a decimal to two places.",
    answerKey: 0.10,
    tolerance: 0.005,
    difficulty: 0.75,
    discrimination: 1.6,
    expectedSeconds: 150,
    prereqClosure: ["credit-default-swaps", "bonds-and-fixed-income"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "credit-default-swaps--explain-why-recovery-rate-matters",
    conceptId: "credit-default-swaps",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Two reference bonds have the same one-year default probability, but one has a recovery rate of 20% and " +
      "the other 70%. Explain why the CDS spreads on these two bonds should differ, and which one should have " +
      "the higher spread.",
    rubric: {
      elements: [
        {
          id: "identifies-higher-spread-bond",
          description: "States that the bond with the lower recovery rate (20%) should have the higher CDS spread.",
          weight: 2,
          required: true,
          misconception: {
            id: "recovery-direction-reversed",
            description:
              "Picks the higher-recovery bond as having the higher spread, missing that a smaller recovery means a larger loss given default and thus a costlier payout to insure.",
            blameConceptId: "credit-default-swaps",
          },
        },
        {
          id: "explains-loss-given-default",
          description:
            "Explains that the protection seller's expected payout depends on the loss given default (1 − recovery rate), not the default probability alone, so a lower recovery rate raises the expected cost of protection even at the same default probability.",
          weight: 3,
          required: true,
        },
        {
          id: "premium-compensates-expected-cost",
          description: "Notes the spread is set to compensate the seller for this expected cost, so it should scale with the loss given default.",
          weight: 1,
        },
      ],
    },
    difficulty: 0.5,
    discrimination: 1.5,
    expectedSeconds: 170,
    prereqClosure: ["credit-default-swaps", "bonds-and-fixed-income"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "credit-default-swaps--explain-hedging-a-bond-position",
    conceptId: "credit-default-swaps",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "An investor holds a corporate bond and is worried about the issuer defaulting before maturity. Explain " +
      "how buying a CDS referencing that issuer's debt hedges this risk, and what net exposure the investor is " +
      "left with.",
    rubric: {
      elements: [
        {
          id: "buy-protection",
          description:
            "States that the investor should buy CDS protection on the issuer, paying the periodic premium.",
          weight: 2,
          required: true,
          misconception: {
            id: "sells-protection-instead",
            description:
              "Has the investor sell protection, which would add default exposure to the issuer rather than hedge the existing bond position.",
            blameConceptId: "credit-default-swaps",
          },
        },
        {
          id: "payout-offsets-bond-loss",
          description:
            "Explains that if a credit event occurs, the CDS payout offsets the loss on the bond (up to the notional and terms of the CDS), largely canceling the default loss.",
          weight: 3,
          required: true,
        },
        {
          id: "residual-exposure",
          description:
            "Notes the investor is left mainly with interest rate risk on the bond and the cost of the CDS premium, rather than issuer default risk.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.6,
    discrimination: 1.5,
    expectedSeconds: 170,
    prereqClosure: ["credit-default-swaps", "bonds-and-fixed-income"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "credit-default-swaps--explain-spread-and-yield-curve",
    conceptId: "credit-default-swaps",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain why a CDS spread on a given issuer tends to rise when that issuer's bond yields rise relative to " +
      "the risk-free yield curve, holding the recovery assumption fixed.",
    rubric: {
      elements: [
        {
          id: "spread-reflects-credit-risk",
          description:
            "Explains that the gap between a risky bond's yield and the risk-free yield curve (the credit spread) largely compensates investors for default risk, the same risk the CDS is pricing.",
          weight: 3,
          required: true,
        },
        {
          id: "co-movement",
          description:
            "Explains that if the market reprices the issuer's default probability upward, both the bond's yield spread and the CDS spread should rise together, since they are pricing the same underlying risk from two different instruments.",
          weight: 3,
          required: true,
          misconception: {
            id: "bond-spread-and-cds-spread-unrelated",
            description:
              "Treats the bond yield spread and the CDS spread as unrelated quantities, missing that both are market prices for the same default risk.",
            blameConceptId: "yield-curve-and-term-structure",
          },
        },
      ],
    },
    difficulty: 1.0,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["credit-default-swaps", "yield-curve-and-term-structure", "bonds-and-fixed-income"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "credit-default-swaps--transfer-naked-cds-speculation",
    conceptId: "credit-default-swaps",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A 'naked' CDS position is one bought by an investor who does not own the underlying reference bond. " +
      "Explain what this position is really a bet on, and why it can be entered without ever holding the bond.",
    rubric: {
      elements: [
        {
          id: "bet-on-default-probability",
          description:
            "Explains that a naked CDS buyer is speculating that the reference entity's credit quality will deteriorate (or a credit event will occur), profiting from a payout or from the CDS's own spread widening, without needing to own the bond at all.",
          weight: 3,
          required: true,
        },
        {
          id: "cds-is-a-separate-contract",
          description:
            "Explains that a CDS is a standalone bilateral contract between buyer and seller referencing an entity's debt; nothing in its structure requires the buyer to hold the underlying bond, unlike an insurance policy that normally requires an insurable interest.",
          weight: 3,
          required: true,
          misconception: {
            id: "cds-requires-ownership",
            description:
              "Assumes a CDS, like traditional insurance, requires the buyer to own the underlying asset, missing that a naked CDS is precisely a position with no such requirement.",
            blameConceptId: "credit-default-swaps",
          },
        },
      ],
    },
    difficulty: 1.4,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["credit-default-swaps", "bonds-and-fixed-income"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "credit-default-swaps--transfer-cds-index-diversification",
    conceptId: "credit-default-swaps",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A CDS index references a basket of many issuers instead of a single one, and pays out proportionally as " +
      "issuers in the basket default one by one. Explain how this changes the risk profile compared to a " +
      "single-name CDS, and why a protection seller might prefer the index.",
    rubric: {
      elements: [
        {
          id: "diversification-effect",
          description:
            "Explains that losses are diversified across many issuers, so the seller's payout is driven by the fraction of the basket that defaults rather than an all-or-nothing outcome on one issuer.",
          weight: 3,
          required: true,
        },
        {
          id: "still-priced-on-aggregate-default-risk",
          description:
            "Notes the index spread still reflects the average expected loss across the basket, so it behaves like a portfolio version of the same single-name mechanics, just spread across more names.",
          weight: 3,
          required: true,
          misconception: {
            id: "index-cds-treated-as-risk-free",
            description:
              "Treats diversification as eliminating credit risk entirely rather than smoothing it — a systemic downturn can still hit many names in the basket at once.",
            blameConceptId: "credit-default-swaps",
          },
        },
      ],
    },
    difficulty: 1.5,
    discrimination: 1.5,
    expectedSeconds: 200,
    prereqClosure: ["credit-default-swaps", "bonds-and-fixed-income"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "credit-default-swaps--transfer-cds-vs-swap-structure",
    conceptId: "credit-default-swaps",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Both an interest rate swap and a credit default swap involve one side making periodic payments to the " +
      "other. Explain the key structural difference between the two contracts in terms of what triggers the " +
      "counterparty's payment obligation.",
    rubric: {
      elements: [
        {
          id: "irs-payments-both-scheduled",
          description:
            "Explains that in an interest rate swap, both legs make scheduled payments on every period regardless of any external event — only the size of the floating leg is uncertain.",
          weight: 3,
          required: true,
        },
        {
          id: "cds-payment-contingent",
          description:
            "Explains that in a CDS, only the protection buyer's premium is scheduled; the protection seller's payment is contingent on a discrete credit event that may never occur, making the CDS structurally closer to insurance than to a symmetric cash-flow exchange.",
          weight: 3,
          required: true,
          misconception: {
            id: "cds-treated-as-symmetric-exchange",
            description:
              "Treats the CDS as a symmetric periodic exchange like an interest rate swap, missing that the protection seller's obligation is contingent and usually never paid.",
            blameConceptId: "interest-rate-and-currency-swaps",
          },
        },
      ],
    },
    difficulty: 1.2,
    discrimination: 1.5,
    expectedSeconds: 180,
    prereqClosure: ["credit-default-swaps", "interest-rate-and-currency-swaps"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "credit-default-swaps--derivation-single-period-fair-spread",
    conceptId: "credit-default-swaps",
    format: "derivation",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Consider a one-year CDS on notional N with default probability p, recovery rate R, and one-year " +
      "discount factor equal to 1 (ignore discounting). Derive the fair annual spread s (as a fraction of N) by " +
      "setting the expected premium collected equal to the expected payout, and simplify your answer in terms " +
      "of p and R.",
    rubric: {
      elements: [
        {
          id: "sets-up-expected-premium",
          description: "Writes the expected premium collected by the seller as s·N (paid regardless of default, under the no-discounting simplification).",
          weight: 2,
          required: true,
        },
        {
          id: "sets-up-expected-payout",
          description: "Writes the expected payout as p·N·(1 − R), the default probability times the loss given default on the notional.",
          weight: 3,
          required: true,
          misconception: {
            id: "forgets-recovery-in-payout",
            description:
              "Sets the expected payout equal to p·N, forgetting that the seller only pays the loss given default, N(1 − R), not the full notional.",
            blameConceptId: "credit-default-swaps",
          },
        },
        {
          id: "solves-for-spread",
          description: "Equates s·N = p·N(1 − R) and solves to get s = p(1 − R).",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.7,
    discrimination: 1.7,
    expectedSeconds: 220,
    prereqClosure: ["credit-default-swaps", "bonds-and-fixed-income", "time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "credit-default-swaps--transfer-basis-trade",
    conceptId: "credit-default-swaps",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "The 'CDS-bond basis' is the CDS spread minus the bond's yield spread over the risk-free curve for the " +
      "same issuer. In principle these two should be close, since both price the same default risk. Explain " +
      "one practical reason they can diverge in real markets.",
    rubric: {
      elements: [
        {
          id: "names-a-real-friction",
          description:
            "Names a plausible friction driving divergence — e.g. differing liquidity between the bond and CDS markets, funding costs or repo specialness in shorting the bond, counterparty risk on the CDS itself, or supply/demand imbalances from investors who can trade one instrument but not the other.",
          weight: 4,
          required: true,
          misconception: {
            id: "basis-should-be-exactly-zero",
            description:
              "Assumes the two markets must always price identically because they reference the same default risk, missing that real trading frictions prevent perfect arbitrage.",
            blameConceptId: "credit-default-swaps",
          },
        },
        {
          id: "notes-limits-to-arbitrage",
          description:
            "Notes that exploiting the gap requires capital, is not risk-free, and can persist because arbitrageurs face constraints.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["credit-default-swaps", "bonds-and-fixed-income", "yield-curve-and-term-structure"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "credit-default-swaps--apply-mcq-mark-to-market-direction",
    conceptId: "credit-default-swaps",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "An investor bought CDS protection on a company three months ago. Since then, the market has become " +
      "increasingly worried about that company's ability to repay its debt, and CDS spreads on the company have " +
      "widened sharply. What has happened to the mark-to-market value of the investor's CDS position?",
    choices: [
      { id: "a", text: "It has increased in value, since protection is now more expensive to buy, making the investor's existing cheaper contract more valuable", correct: true },
      {
        id: "b",
        text: "It has decreased in value, since the company's problems make the protection less useful",
        correct: false,
        misconception: {
          id: "widening-spread-value-reversed",
          description:
            "Reverses the mark-to-market direction: a protection buyer gains value when spreads widen, because new protection now costs more than the rate locked in on the existing contract.",
          blameConceptId: "credit-default-swaps",
        },
      },
      {
        id: "c",
        text: "It is unaffected, since the contract's premium and terms were fixed at inception",
        correct: false,
        misconception: {
          id: "cds-value-treated-as-static",
          description:
            "Confuses the fixed contractual premium with the contract's market value, which does change as spreads move even though the premium rate itself is locked in.",
          blameConceptId: "credit-default-swaps",
        },
      },
    ],
    difficulty: 1.1,
    discrimination: 1.6,
    expectedSeconds: 130,
    prereqClosure: ["credit-default-swaps"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "credit-default-swaps--apply-numeric-portfolio-expected-loss",
    conceptId: "credit-default-swaps",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A portfolio holds $2,000,000 of Bond A (default probability 4%, recovery 30%) and $3,000,000 of Bond B " +
      "(default probability 2%, recovery 50%), with independent default risk. What is the total expected loss " +
      "(in dollars) across both bonds over the year? Give a whole number.",
    answerKey: 86000,
    tolerance: 100,
    difficulty: 1.0,
    discrimination: 1.6,
    expectedSeconds: 160,
    prereqClosure: ["credit-default-swaps", "bonds-and-fixed-income"],
    source: AUTHORED,
    status: "live",
  },
];
