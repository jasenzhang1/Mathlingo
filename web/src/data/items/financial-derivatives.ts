import type { Item, SourceRef } from "../../lib/assessment/types";

/**
 * Item bank for five zero-item "financial instruments" concepts:
 * `derivatives-overview`, `forwards-and-futures`, `options-calls-and-puts`,
 * `option-payoff-and-put-call-parity`, and `option-pricing-and-greeks`. Twenty
 * items per concept — a full-maturity pool, mixed across format and cognitive
 * level — authored from each concept and its allowed prerequisite ancestors
 * with no external seed.
 */

const AUTHORED: SourceRef = {
  id: "mathlingo-authored-derivatives",
  tier: "generated",
  title: "Mathlingo authored item (derivatives)",
};

export const financialDerivativesItems: Item[] = [
  // ===========================================================================
  // derivatives-overview
  // ===========================================================================
  {
    id: "derivatives-overview--recall-definition",
    conceptId: "derivatives-overview",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What is a derivative, in the financial sense?",
    choices: [
      {
        id: "a",
        text: "A contract whose value is derived from the price of some other underlying asset",
        correct: true,
      },
      {
        id: "b",
        text: "A share representing residual ownership in a company's assets and earnings",
        correct: false,
        misconception: {
          id: "derivative-confused-with-equity",
          description:
            "Describes a stock. A derivative's value depends on an underlying asset's price rather than being direct ownership of a firm.",
          blameConceptId: "equities-and-stock-markets",
        },
      },
      {
        id: "c",
        text: "A loan that must be repaid with interest by a fixed maturity date",
        correct: false,
        misconception: {
          id: "derivative-confused-with-bond",
          description:
            "Describes a bond. A derivative need not involve any lending at all; its defining feature is that its value is derived from something else.",
          blameConceptId: "bonds-and-fixed-income",
        },
      },
      {
        id: "d",
        text: "Any asset that can be bought and sold on an exchange",
        correct: false,
        misconception: {
          id: "derivative-defined-by-tradability",
          description:
            "Confuses being exchange-traded with being a derivative. Many non-derivative assets (stocks, bonds) trade on exchanges, and many derivatives (forwards) trade privately, off any exchange.",
          blameConceptId: "derivatives-overview",
        },
      },
    ],
    difficulty: -1.5,
    discrimination: 1.1,
    expectedSeconds: 30,
    prereqClosure: ["derivatives-overview"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "derivatives-overview--recall-underlying-examples",
    conceptId: "derivatives-overview",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which of the following can serve as the 'underlying' whose price a derivative contract is based on? Select all that apply.",
    choices: [
      { id: "a", text: "A share of stock", correct: true },
      { id: "b", text: "A commodity such as oil or wheat", correct: true },
      { id: "c", text: "An interest rate or a bond", correct: true },
      {
        id: "d",
        text: "Only physical commodities can be an underlying; financial assets cannot",
        correct: false,
        misconception: {
          id: "underlying-must-be-physical",
          description:
            "Wrongly restricts underlyings to physical goods. Stocks, bonds, interest rates, currencies, and even market indexes are all common derivative underlyings.",
          blameConceptId: "derivatives-overview",
        },
      },
    ],
    difficulty: -1.2,
    discrimination: 1.1,
    expectedSeconds: 40,
    prereqClosure: ["derivatives-overview"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "derivatives-overview--recall-three-uses",
    conceptId: "derivatives-overview",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which of the following are commonly cited reasons market participants use derivatives? Select all that apply.",
    choices: [
      { id: "a", text: "Hedging an existing exposure to reduce risk", correct: true },
      { id: "b", text: "Speculating on the future direction of the underlying's price", correct: true },
      { id: "c", text: "Gaining leveraged exposure without buying the underlying outright", correct: true },
      {
        id: "d",
        text: "Guaranteeing a risk-free profit for both parties in every trade",
        correct: false,
        misconception: {
          id: "derivatives-guarantee-profit",
          description:
            "Assumes derivatives eliminate risk for both sides. A derivative is a zero-sum contract between two parties; one side's gain is the other side's loss, and it does not manufacture risk-free profit out of nothing.",
          blameConceptId: "derivatives-overview",
        },
      },
    ],
    difficulty: -1.0,
    discrimination: 1.2,
    expectedSeconds: 45,
    prereqClosure: ["derivatives-overview"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "derivatives-overview--recall-leverage-idea",
    conceptId: "derivatives-overview",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Why are derivatives often described as offering 'leveraged exposure' to an underlying asset?",
    choices: [
      {
        id: "a",
        text: "A derivative position can be entered for a fraction of the underlying's full price, so a given price move produces a larger percentage gain or loss on the capital committed",
        correct: true,
      },
      {
        id: "b",
        text: "Derivatives always pay a fixed multiple of whatever the underlying pays, regardless of price moves",
        correct: false,
        misconception: {
          id: "leverage-as-fixed-multiplier",
          description:
            "Misdescribes leverage as a guaranteed fixed multiplier rather than as the effect of committing less capital relative to the underlying's full value, which amplifies percentage gains and losses.",
          blameConceptId: "derivatives-overview",
        },
      },
      {
        id: "c",
        text: "Leverage means the derivative's price never moves as much as the underlying's price",
        correct: false,
        misconception: {
          id: "leverage-direction-reversed",
          description:
            "Reverses the idea. Leverage means a derivative position can be far more sensitive (in percentage terms) to underlying price moves than owning the underlying outright, not less.",
          blameConceptId: "derivatives-overview",
        },
      },
    ],
    difficulty: -0.8,
    discrimination: 1.2,
    expectedSeconds: 50,
    prereqClosure: ["derivatives-overview"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "derivatives-overview--recall-otc-vs-exchange",
    conceptId: "derivatives-overview",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What is the main distinction between an over-the-counter (OTC) derivative and an exchange-traded derivative?",
    choices: [
      {
        id: "a",
        text: "An OTC derivative is a privately negotiated, customizable contract between two parties, while an exchange-traded derivative is a standardized contract traded on a regulated exchange",
        correct: true,
      },
      {
        id: "b",
        text: "OTC derivatives can never be used for hedging, only exchange-traded ones can",
        correct: false,
        misconception: {
          id: "otc-cannot-hedge",
          description:
            "Invents a restriction on OTC contracts. Both OTC and exchange-traded derivatives are commonly used for hedging; the difference is standardization and venue, not purpose.",
          blameConceptId: "derivatives-overview",
        },
      },
      {
        id: "c",
        text: "Exchange-traded derivatives have no counterparty risk at all, while OTC derivatives always default",
        correct: false,
        misconception: {
          id: "exchange-traded-zero-risk",
          description:
            "Overstates the safety of exchange-traded contracts. A clearinghouse greatly reduces counterparty risk on exchange-traded derivatives but does not make default impossible, and not every OTC contract defaults.",
          blameConceptId: "derivatives-overview",
        },
      },
    ],
    difficulty: -0.6,
    discrimination: 1.3,
    expectedSeconds: 55,
    prereqClosure: ["derivatives-overview"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "derivatives-overview--apply-classify-hedge-vs-speculation",
    conceptId: "derivatives-overview",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem:
      "An airline, which regularly buys jet fuel, enters a derivative contract to lock in a future fuel price " +
      "because it is worried about rising fuel costs. Is this hedging or speculating?",
    choices: [
      {
        id: "a",
        text: "Hedging, because the derivative offsets a real, pre-existing business exposure the airline already has to fuel prices",
        correct: true,
      },
      {
        id: "b",
        text: "Speculating, because the airline is taking a position on the future price of a commodity",
        correct: false,
        misconception: {
          id: "any-derivative-position-is-speculation",
          description:
            "Treats every derivative position as speculative just because it references a price. What matters is whether the position offsets an existing exposure (hedging) or creates a new, otherwise unnecessary one (speculating).",
          blameConceptId: "derivatives-overview",
        },
      },
      {
        id: "c",
        text: "Neither, since the airline is not a financial firm and cannot use derivatives",
        correct: false,
        misconception: {
          id: "derivatives-restricted-to-financial-firms",
          description:
            "Wrongly assumes only financial firms may use derivatives. Non-financial companies routinely hedge input costs and revenues with derivatives.",
          blameConceptId: "derivatives-overview",
        },
      },
    ],
    difficulty: -0.4,
    discrimination: 1.3,
    expectedSeconds: 70,
    prereqClosure: ["derivatives-overview"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "derivatives-overview--apply-classify-hedge-vs-speculation-2",
    conceptId: "derivatives-overview",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem:
      "A hedge fund with no exposure to gold prices buys a derivative contract purely because it believes gold " +
      "prices will rise. Is this hedging or speculating?",
    choices: [
      {
        id: "a",
        text: "Speculating, because the fund is creating a new exposure to gold prices rather than offsetting one it already had",
        correct: true,
      },
      {
        id: "b",
        text: "Hedging, because any derivative position reduces the total risk in the market",
        correct: false,
        misconception: {
          id: "derivative-always-reduces-risk",
          description:
            "Assumes derivatives always reduce risk in the aggregate. A derivative is zero-sum between the two parties; taking on a brand-new directional bet increases the risk the fund carries, it does not offset anything.",
          blameConceptId: "derivatives-overview",
        },
      },
    ],
    difficulty: -0.3,
    discrimination: 1.3,
    expectedSeconds: 60,
    prereqClosure: ["derivatives-overview"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "derivatives-overview--apply-leverage-numeric",
    conceptId: "derivatives-overview",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A trader can either buy 100 shares of a $50 stock outright for $5,000, or control the same 100 shares' " +
      "worth of exposure through a derivative by posting only $500 of margin. If the stock rises 10% (to $55), " +
      "what percentage return (as a percent of capital committed) does the derivative position earn, ignoring " +
      "fees and financing costs? Give a whole number of percent.",
    answerKey: 100,
    tolerance: 1,
    difficulty: 0.3,
    discrimination: 1.4,
    expectedSeconds: 100,
    prereqClosure: ["derivatives-overview", "equities-and-stock-markets"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "derivatives-overview--apply-leverage-numeric-loss",
    conceptId: "derivatives-overview",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Using the same setup — $500 margin controls $5,000 of stock exposure — if the stock instead falls 10% " +
      "(to $45), what percentage loss (as a percent of capital committed, as a positive number) does the " +
      "derivative position suffer, ignoring fees and financing costs? Give a whole number of percent.",
    answerKey: 100,
    tolerance: 1,
    difficulty: 0.4,
    discrimination: 1.4,
    expectedSeconds: 100,
    prereqClosure: ["derivatives-overview", "equities-and-stock-markets"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "derivatives-overview--recall-zero-sum",
    conceptId: "derivatives-overview",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "In what sense is a typical derivative contract 'zero-sum' between its two parties?",
    choices: [
      {
        id: "a",
        text: "One party's gain on the contract is exactly the other party's loss, so the contract itself creates no new wealth between the two of them",
        correct: true,
      },
      {
        id: "b",
        text: "Both parties are guaranteed to break even on the contract at maturity",
        correct: false,
        misconception: {
          id: "zero-sum-means-no-gain-or-loss",
          description:
            "Confuses 'zero-sum' (gains and losses net to zero across the two parties) with 'zero outcome' (neither party gains or loses). Either party can gain or lose a great deal; the two amounts simply mirror each other.",
          blameConceptId: "derivatives-overview",
        },
      },
      {
        id: "c",
        text: "The contract has no value to either party at any point in its life",
        correct: false,
        misconception: {
          id: "zero-sum-means-zero-value",
          description:
            "Confuses 'zero-sum' with 'zero value'. The contract's value can be large and positive to one side (and equally negative to the other) well before maturity.",
          blameConceptId: "derivatives-overview",
        },
      },
    ],
    difficulty: -0.2,
    discrimination: 1.3,
    expectedSeconds: 60,
    prereqClosure: ["derivatives-overview"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "derivatives-overview--explain-why-not-own-underlying",
    conceptId: "derivatives-overview",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain why an investor might prefer to gain exposure to a stock's price movements through a derivative " +
      "rather than by simply buying the stock itself.",
    rubric: {
      elements: [
        {
          id: "capital-efficiency",
          description:
            "Explains that a derivative typically requires committing far less capital upfront (via margin) than buying the stock outright, freeing capital for other uses or amplifying returns on the capital used.",
          weight: 3,
          required: true,
        },
        {
          id: "other-motives",
          description:
            "Mentions at least one additional motive, such as easier short exposure, hedging an existing position, or accessing the exposure without the operational cost of holding the physical or full-value asset.",
          weight: 2,
        },
      ],
      forbiddenMoves: [
        {
          id: "claims-risk-free",
          description: "Claims the derivative route is risk-free or strictly safer than owning the stock.",
          weight: 1,
        },
      ],
    },
    difficulty: 0.0,
    discrimination: 1.3,
    expectedSeconds: 130,
    prereqClosure: ["derivatives-overview", "equities-and-stock-markets"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "derivatives-overview--explain-counterparty-risk",
    conceptId: "derivatives-overview",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain what 'counterparty risk' means in the context of a derivative contract, and why it tends to be a " +
      "bigger concern for OTC derivatives than for exchange-traded ones.",
    rubric: {
      elements: [
        {
          id: "defines-counterparty-risk",
          description:
            "Defines counterparty risk as the risk that the other party to the contract fails to meet its obligations (e.g. defaults on a payment owed).",
          weight: 3,
          required: true,
        },
        {
          id: "explains-exchange-mitigation",
          description:
            "Explains that exchange-traded derivatives are typically cleared through a central clearinghouse that stands between both parties and requires margin, greatly reducing this risk compared to a bilateral OTC contract.",
          weight: 3,
          required: true,
          misconception: {
            id: "otc-and-exchange-same-risk",
            description:
              "Treats OTC and exchange-traded contracts as carrying identical counterparty risk, missing the role of central clearing and margining on exchanges.",
            blameConceptId: "derivatives-overview",
          },
        },
      ],
    },
    difficulty: 0.3,
    discrimination: 1.4,
    expectedSeconds: 150,
    prereqClosure: ["derivatives-overview"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "derivatives-overview--explain-why-value-derived",
    conceptId: "derivatives-overview",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain, in your own words, what it means for a derivative's value to be 'derived from' an underlying " +
      "asset's price, using a forward contract to buy a stock at a fixed future price as your example.",
    rubric: {
      elements: [
        {
          id: "value-tracks-underlying-gap",
          description:
            "Explains that the forward's value at any time depends on the gap between the current market price of the stock and the fixed price locked into the contract, so it moves when the stock's price moves without the contract itself being the stock.",
          weight: 3,
          required: true,
        },
        {
          id: "no-independent-value",
          description:
            "Notes the derivative has no value of its own independent of the underlying; strip away the stock's price and the forward contract has nothing left to be priced on.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.1,
    discrimination: 1.3,
    expectedSeconds: 140,
    prereqClosure: ["derivatives-overview", "equities-and-stock-markets"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "derivatives-overview--transfer-embedded-derivative",
    conceptId: "derivatives-overview",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A convertible bond pays regular coupons like an ordinary bond, but also lets the holder convert it into a " +
      "fixed number of shares of the issuer's stock. Explain why this bond can be thought of as containing an " +
      "'embedded derivative,' and identify what that embedded piece derives its value from.",
    rubric: {
      elements: [
        {
          id: "identifies-optional-component",
          description:
            "Identifies the conversion feature as an option-like component: the holder has the right, but not the obligation, to convert, which is exactly the asymmetric structure that makes it derivative-like.",
          weight: 3,
          required: true,
        },
        {
          id: "underlying-is-stock",
          description:
            "States that this embedded piece's value is derived from the issuer's stock price — the higher the stock price relative to the conversion terms, the more valuable the conversion right.",
          weight: 3,
          required: true,
          misconception: {
            id: "convertible-value-only-from-coupons",
            description:
              "Treats the bond's entire value as coming from its coupon and principal payments, missing that the conversion right is a separate, stock-price-linked source of value layered on top.",
            blameConceptId: "bonds-and-fixed-income",
          },
        },
      ],
    },
    difficulty: 1.3,
    discrimination: 1.5,
    expectedSeconds: 180,
    prereqClosure: ["derivatives-overview", "bonds-and-fixed-income", "equities-and-stock-markets"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "derivatives-overview--transfer-derivative-of-a-derivative",
    conceptId: "derivatives-overview",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Some contracts are derivatives whose underlying is itself another derivative (for example, an option on " +
      "a futures contract). Explain why this is still consistent with the basic definition of a derivative, and " +
      "why its value might be more sensitive to news than an option written directly on the physical underlying.",
    rubric: {
      elements: [
        {
          id: "definition-is-recursive",
          description:
            "Explains that the definition only requires the contract's value to be derived from the price of 'some other asset,' and nothing prevents that other asset from itself being a derivative, so the layering is still consistent with the definition.",
          weight: 3,
          required: true,
        },
        {
          id: "sensitivity-compounds",
          description:
            "Explains that because the futures price already moves in reaction to the underlying commodity or asset, and the option's value moves in reaction to the futures price, sensitivities can compound across the two layers.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.6,
    discrimination: 1.5,
    expectedSeconds: 190,
    prereqClosure: ["derivatives-overview"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "derivatives-overview--transfer-margin-call-mechanics",
    conceptId: "derivatives-overview",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A trader posts margin to control a derivative position worth many times that margin. Explain what a " +
      "'margin call' is, why it can force the trader to act even before the position matures, and how this " +
      "differs from simply owning the underlying asset outright with cash.",
    rubric: {
      elements: [
        {
          id: "margin-call-defined",
          description:
            "Explains that a margin call is a demand to post additional funds when the position's losses erode the posted margin below a required maintenance level.",
          weight: 3,
          required: true,
        },
        {
          id: "forced-action-before-maturity",
          description:
            "Explains that this can force the trader to deposit more cash or have the position liquidated well before the contract's maturity, unlike simply holding the underlying asset with cash, where an unrealized loss creates no such obligation to act.",
          weight: 3,
          required: true,
          misconception: {
            id: "leverage-has-no-downside-timing-risk",
            description:
              "Misses that leverage introduces a timing risk: losses can force an exit at an inopportune moment, which an outright cash position in the underlying does not face.",
            blameConceptId: "derivatives-overview",
          },
        },
      ],
    },
    difficulty: 1.4,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["derivatives-overview"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "derivatives-overview--apply-mcq-notional-vs-market-value",
    conceptId: "derivatives-overview",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "A derivative contract has a notional value of $1,000,000 but the cash actually posted and at risk in the " +
      "trade is $50,000 of margin. Which figure best represents the trader's actual capital at risk if the " +
      "position were closed out for the maximum loss allowed before a margin call forces action?",
    choices: [
      { id: "a", text: "Roughly the $50,000 of posted margin, since that is the capital actually committed", correct: true },
      {
        id: "b",
        text: "The full $1,000,000 notional, since that is the size of the exposure",
        correct: false,
        misconception: {
          id: "notional-confused-with-capital-at-risk",
          description:
            "Confuses the notional (the reference size used to scale payoffs) with the capital actually committed. The notional determines how large gains and losses are per unit price move, but the cash actually posted is what is directly at risk before further margin is required.",
          blameConceptId: "derivatives-overview",
        },
      },
    ],
    difficulty: 0.5,
    discrimination: 1.4,
    expectedSeconds: 90,
    prereqClosure: ["derivatives-overview"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "derivatives-overview--recall-mcq-timing-of-payoff",
    conceptId: "derivatives-overview",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which statement about when a derivative's economic payoff is determined is most accurate?",
    choices: [
      {
        id: "a",
        text: "The eventual payoff depends on the underlying's price path and/or its price at specified dates, which are typically not known when the contract is entered into",
        correct: true,
      },
      {
        id: "b",
        text: "The payoff is fixed and known with certainty the moment the contract is signed",
        correct: false,
        misconception: {
          id: "payoff-known-at-inception",
          description:
            "Misses the whole point of a derivative — its payoff depends on how the underlying's price evolves, which is unknown at inception, not a fixed number agreed upon upfront.",
          blameConceptId: "derivatives-overview",
        },
      },
    ],
    difficulty: -0.9,
    discrimination: 1.2,
    expectedSeconds: 55,
    prereqClosure: ["derivatives-overview"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "derivatives-overview--apply-basis-risk-scenario",
    conceptId: "derivatives-overview",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem:
      "A wheat farmer hedges using a derivative written on corn futures, because no wheat-specific contract is " +
      "conveniently available. Explain the risk this mismatch introduces, even though the hedge still reduces " +
      "some risk.",
    rubric: {
      elements: [
        {
          id: "identifies-basis-risk",
          description:
            "Identifies that because the hedge's underlying (corn) is not identical to the farmer's actual exposure (wheat), the two prices need not move together perfectly, leaving residual risk even after hedging.",
          weight: 3,
          required: true,
          misconception: {
            id: "assumes-perfect-hedge",
            description:
              "Assumes any derivative hedge eliminates risk completely, missing that a hedge on an imperfectly correlated underlying leaves residual (basis) risk.",
            blameConceptId: "derivatives-overview",
          },
        },
        {
          id: "still-reduces-some-risk",
          description:
            "Acknowledges the hedge is still useful because corn and wheat prices are likely correlated, so it reduces, without eliminating, the farmer's exposure.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.6,
    discrimination: 1.4,
    expectedSeconds: 140,
    prereqClosure: ["derivatives-overview"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "derivatives-overview--transfer-marking-to-market-cash-flow",
    conceptId: "derivatives-overview",
    format: "derivation",
    cognitive: "transfer",
    channels: ["typed", "handwritten"],
    stem:
      "A trader enters a derivative position referencing 1,000 units of an underlying whose price is currently " +
      "$40. Under a daily mark-to-market convention, the position's cash gain or loss each day equals 1,000 " +
      "times the day's price change. Over three days the price moves from $40 to $42, then to $39, then to $41. " +
      "Derive the trader's cumulative cash flow after all three days, showing each day's mark-to-market amount.",
    rubric: {
      elements: [
        {
          id: "day-one-flow",
          description: "Computes day one's cash flow as 1,000 × ($42 − $40) = $2,000.",
          weight: 2,
          required: true,
        },
        {
          id: "day-two-flow",
          description: "Computes day two's cash flow as 1,000 × ($39 − $42) = −$3,000.",
          weight: 2,
          required: true,
        },
        {
          id: "day-three-and-total",
          description:
            "Computes day three's cash flow as 1,000 × ($41 − $39) = $2,000, and sums all three days to a cumulative $1,000, matching 1,000 × ($41 − $40).",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.7,
    discrimination: 1.5,
    expectedSeconds: 170,
    prereqClosure: ["derivatives-overview"],
    source: AUTHORED,
    status: "live",
  },

  // ===========================================================================
  // forwards-and-futures
  // ===========================================================================
  {
    id: "forwards-and-futures--recall-definition",
    conceptId: "forwards-and-futures",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What do both a forward contract and a futures contract commit the two parties to do?",
    choices: [
      {
        id: "a",
        text: "Buy or sell a specified asset at a price agreed upon today, with the transaction happening at a specified future date",
        correct: true,
      },
      {
        id: "b",
        text: "Buy an asset today at today's price, with delivery also happening today",
        correct: false,
        misconception: {
          id: "forward-confused-with-spot",
          description:
            "Describes a spot transaction. The entire point of a forward or futures contract is that the price is locked in today while the transaction itself is deferred to a future date.",
          blameConceptId: "forwards-and-futures",
        },
      },
      {
        id: "c",
        text: "Give one party the right, but not the obligation, to transact at a future date",
        correct: false,
        misconception: {
          id: "forward-confused-with-option",
          description:
            "Describes an option. A forward or futures contract is a firm, symmetric obligation for both parties; neither side can walk away without consequence.",
          blameConceptId: "forwards-and-futures",
        },
      },
    ],
    difficulty: -1.4,
    discrimination: 1.1,
    expectedSeconds: 35,
    prereqClosure: ["forwards-and-futures"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "forwards-and-futures--recall-key-difference",
    conceptId: "forwards-and-futures",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What is the main structural difference between a forward contract and a futures contract?",
    choices: [
      {
        id: "a",
        text: "A forward is a private, customized bilateral contract, while a futures contract is standardized and traded on an exchange, with gains and losses settled daily",
        correct: true,
      },
      {
        id: "b",
        text: "A forward always has a longer maturity than a futures contract",
        correct: false,
        misconception: {
          id: "forward-futures-distinguished-by-maturity",
          description:
            "Invents a maturity-based distinction. The defining differences are customization, venue, and daily settlement — not typical contract length, which varies for both.",
          blameConceptId: "forwards-and-futures",
        },
      },
      {
        id: "c",
        text: "A futures contract can be customized to any terms the two parties like, while a forward is standardized",
        correct: false,
        misconception: {
          id: "customization-reversed",
          description:
            "Reverses which contract is customizable. It is the forward that is privately negotiated and flexible; the futures contract is the standardized, exchange-listed one.",
          blameConceptId: "forwards-and-futures",
        },
      },
    ],
    difficulty: -1.2,
    discrimination: 1.2,
    expectedSeconds: 40,
    prereqClosure: ["forwards-and-futures"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "forwards-and-futures--recall-mark-to-market",
    conceptId: "forwards-and-futures",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What does it mean that a futures contract is 'marked to market daily'?",
    choices: [
      {
        id: "a",
        text: "At the end of each trading day, gains and losses on the contract are settled in cash between the two parties, based on that day's price change",
        correct: true,
      },
      {
        id: "b",
        text: "The exchange resets the contract's strike price to the current market price every day",
        correct: false,
        misconception: {
          id: "mark-to-market-resets-strike",
          description:
            "Confuses daily settlement of gains and losses with changing the locked-in futures price itself. The contract's agreed price does not reset; only the accumulated cash gain or loss is settled each day.",
          blameConceptId: "forwards-and-futures",
        },
      },
      {
        id: "c",
        text: "The contract is revalued once, at maturity, based on the average daily price over its life",
        correct: false,
        misconception: {
          id: "mark-to-market-only-at-maturity",
          description:
            "Misses that marking to market is a daily process throughout the contract's life, not a single calculation done at the end.",
          blameConceptId: "forwards-and-futures",
        },
      },
    ],
    difficulty: -0.9,
    discrimination: 1.2,
    expectedSeconds: 45,
    prereqClosure: ["forwards-and-futures"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "forwards-and-futures--recall-features-multi",
    conceptId: "forwards-and-futures",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which of the following are true of standardized, exchange-traded futures contracts (as opposed to OTC forwards)? Select all that apply.",
    choices: [
      { id: "a", text: "They specify fixed contract sizes and standardized expiration dates set by the exchange", correct: true },
      { id: "b", text: "They typically require posting margin that is adjusted daily as the contract is marked to market", correct: true },
      { id: "c", text: "They usually carry lower counterparty risk than a bilateral OTC forward, due to central clearing", correct: true },
      {
        id: "d",
        text: "Their terms (size, expiration, quality of the underlying) can be freely negotiated by the two parties",
        correct: false,
        misconception: {
          id: "futures-terms-negotiable",
          description:
            "Confuses futures with forwards. Futures terms are standardized by the exchange precisely so that contracts are fungible and can trade liquidly; the two counterparties do not negotiate them.",
          blameConceptId: "forwards-and-futures",
        },
      },
    ],
    difficulty: -0.5,
    discrimination: 1.3,
    expectedSeconds: 65,
    prereqClosure: ["forwards-and-futures"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "forwards-and-futures--apply-forward-price-basic",
    conceptId: "forwards-and-futures",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A non-dividend-paying stock currently trades at $100. The one-year risk-free rate is 5% (simple annual " +
      "compounding). Using F = S0(1+r)^T, what is the theoretical one-year forward price? Give your answer to " +
      "the nearest dollar.",
    answerKey: 105,
    tolerance: 0.5,
    difficulty: -0.3,
    discrimination: 1.3,
    expectedSeconds: 70,
    prereqClosure: ["forwards-and-futures", "time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "forwards-and-futures--apply-forward-price-two-year",
    conceptId: "forwards-and-futures",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A non-dividend-paying stock trades at $200. The risk-free rate is 4% per year (simple annual " +
      "compounding). Using F = S0(1+r)^T, what is the theoretical forward price for delivery in 2 years? Give " +
      "your answer to the nearest cent.",
    answerKey: 216.32,
    tolerance: 0.2,
    difficulty: 0.1,
    discrimination: 1.4,
    expectedSeconds: 90,
    prereqClosure: ["forwards-and-futures", "time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "forwards-and-futures--apply-forward-price-solve-for-spot",
    conceptId: "forwards-and-futures",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A one-year forward contract on a non-dividend-paying stock is quoted at a forward price of $126. The " +
      "risk-free rate is 5% per year (simple annual compounding). Using F = S0(1+r)^T, what must the current " +
      "spot price S0 be? Give your answer to the nearest dollar.",
    answerKey: 120,
    tolerance: 1,
    difficulty: 0.3,
    discrimination: 1.4,
    expectedSeconds: 100,
    prereqClosure: ["forwards-and-futures", "time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "forwards-and-futures--apply-arbitrage-forward-overpriced",
    conceptId: "forwards-and-futures",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem:
      "A non-dividend-paying stock trades at $50, the one-year risk-free rate is 4%, so the fair forward price " +
      "is $52. Suppose the market's actual one-year forward price is quoted at $55. What arbitrage strategy " +
      "would an arbitrageur use to lock in a riskless profit?",
    choices: [
      {
        id: "a",
        text: "Borrow money to buy the stock today, and simultaneously sell (short) the overpriced forward; at maturity, deliver the stock into the forward and repay the loan, keeping the $3 difference",
        correct: true,
      },
      {
        id: "b",
        text: "Sell the stock short today and buy the forward, since the forward is 'expensive'",
        correct: false,
        misconception: {
          id: "arbitrage-direction-reversed",
          description:
            "Reverses the correct arbitrage direction. When the forward is overpriced relative to the cash-and-carry fair value, the arbitrage is to buy the stock (carry it) and sell the forward, not the reverse.",
          blameConceptId: "forwards-and-futures",
        },
      },
      {
        id: "c",
        text: "Do nothing, since forward prices are always fairly priced by the market and cannot deviate from F = S0(1+r)^T",
        correct: false,
        misconception: {
          id: "assumes-no-mispricing-possible",
          description:
            "Assumes markets are always perfectly priced, missing the entire premise of cash-and-carry arbitrage: temporary mispricings are exactly what the no-arbitrage formula is used to detect and exploit.",
          blameConceptId: "forwards-and-futures",
        },
      },
    ],
    difficulty: 0.9,
    discrimination: 1.6,
    expectedSeconds: 150,
    prereqClosure: ["forwards-and-futures", "time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "forwards-and-futures--apply-arbitrage-profit-numeric",
    conceptId: "forwards-and-futures",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A non-dividend-paying stock trades at $50 and the one-year risk-free rate is 4%, so the fair one-year " +
      "forward price is $52. The market's actual forward price is quoted at $55. If an arbitrageur borrows $50 " +
      "to buy the stock, sells one forward contract, and unwinds everything at maturity as in a cash-and-carry " +
      "trade, what is the riskless profit (in dollars) per share, ignoring transaction costs?",
    answerKey: 3,
    tolerance: 0.1,
    difficulty: 1.0,
    discrimination: 1.6,
    expectedSeconds: 160,
    prereqClosure: ["forwards-and-futures", "time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "forwards-and-futures--recall-long-short-payoff-direction",
    conceptId: "forwards-and-futures",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Holding a long forward position, does the holder profit when the underlying's spot price at maturity rises above the forward price, or when it falls below it?",
    choices: [
      {
        id: "a",
        text: "Rises above it — the long holder is committed to buying at the (lower) forward price and can then sell at the higher spot price",
        correct: true,
      },
      {
        id: "b",
        text: "Falls below it — the long holder benefits from paying less than the market price",
        correct: false,
        misconception: {
          id: "long-forward-direction-reversed",
          description:
            "Reverses the payoff direction. The long side of a forward is obligated to buy at the fixed forward price, so it gains when the spot price at maturity ends up above that fixed price, not below it.",
          blameConceptId: "forwards-and-futures",
        },
      },
    ],
    difficulty: -0.6,
    discrimination: 1.3,
    expectedSeconds: 60,
    prereqClosure: ["forwards-and-futures"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "forwards-and-futures--apply-long-forward-payoff-numeric",
    conceptId: "forwards-and-futures",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "An investor is long a forward contract on 1,000 units of a commodity, locked in at a forward price of " +
      "$30 per unit. At maturity, the spot price is $34 per unit. What is the investor's total payoff, in " +
      "dollars?",
    answerKey: 4000,
    tolerance: 10,
    difficulty: -0.2,
    discrimination: 1.3,
    expectedSeconds: 80,
    prereqClosure: ["forwards-and-futures"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "forwards-and-futures--explain-why-no-upfront-cost",
    conceptId: "forwards-and-futures",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain why entering a forward contract typically costs nothing upfront to either party, even though the " +
      "contract can later become quite valuable (or costly) to one side.",
    rubric: {
      elements: [
        {
          id: "forward-price-set-to-zero-value",
          description:
            "Explains that the forward price is deliberately chosen (via F = S0(1+r)^T) so that, at inception, the contract's expected value to both sides is exactly zero — neither side is favored, so no payment changes hands.",
          weight: 3,
          required: true,
        },
        {
          id: "value-drifts-after-inception",
          description:
            "Explains that after inception, as the spot price moves away from the level implied by the original forward price, the contract accumulates positive value for one side and negative value for the other, even though nothing was paid at the start.",
          weight: 3,
          required: true,
          misconception: {
            id: "assumes-value-always-zero",
            description:
              "Assumes the contract remains worth zero throughout its life just because it started at zero value, missing that its value drifts with the underlying's price.",
            blameConceptId: "forwards-and-futures",
          },
        },
      ],
    },
    difficulty: 0.5,
    discrimination: 1.5,
    expectedSeconds: 160,
    prereqClosure: ["forwards-and-futures", "time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "forwards-and-futures--explain-why-carry-cost-drives-price",
    conceptId: "forwards-and-futures",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain, in terms of the cash-and-carry argument, why the forward price F = S0(1+r)^T must hold for a " +
      "non-dividend-paying asset if no arbitrage opportunities are to exist.",
    rubric: {
      elements: [
        {
          id: "replicating-strategy",
          description:
            "Explains that borrowing S0 today, buying the asset, and holding it to time T replicates receiving the asset at T for a known cost of S0(1+r)^T, so a forward priced any other way would let someone earn a riskless profit against this replicating strategy.",
          weight: 4,
          required: true,
        },
        {
          id: "two-sided-arbitrage",
          description:
            "Notes that both a forward price above and a forward price below S0(1+r)^T create an arbitrage (one via buy-stock-sell-forward, the other via short-stock-buy-forward), which is why exactly one price is arbitrage-free.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.2,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["forwards-and-futures", "time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "forwards-and-futures--explain-daily-settlement-purpose",
    conceptId: "forwards-and-futures",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain why daily mark-to-market settlement on a futures exchange reduces counterparty (default) risk " +
      "compared to a forward contract that settles only once, at maturity.",
    rubric: {
      elements: [
        {
          id: "limits-accumulated-exposure",
          description:
            "Explains that by settling gains and losses in cash every day, losses never accumulate into one large amount owed at maturity; the maximum one-day loss that could go unpaid is much smaller than a whole contract life's worth of price movement.",
          weight: 3,
          required: true,
        },
        {
          id: "combined-with-margin",
          description:
            "Notes this works together with required margin balances, so a losing party can be required to top up or be closed out well before their losses become large enough to threaten default.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.4,
    discrimination: 1.4,
    expectedSeconds: 150,
    prereqClosure: ["forwards-and-futures"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "forwards-and-futures--transfer-hedging-with-futures",
    conceptId: "forwards-and-futures",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A wheat farmer expects to harvest and sell 10,000 bushels of wheat in six months and wants to lock in " +
      "today's price. Explain whether the farmer should go long or short a wheat futures contract, and describe " +
      "the combined (physical crop plus futures) outcome if the spot price of wheat falls sharply by harvest " +
      "time.",
    rubric: {
      elements: [
        {
          id: "correct-direction",
          description:
            "States that the farmer should go short (sell) wheat futures, since the farmer will be a seller of the physical wheat and wants to lock in a sale price.",
          weight: 3,
          required: true,
          misconception: {
            id: "wrong-hedge-direction",
            description:
              "Has the farmer go long futures, which would add to, rather than offset, the farmer's exposure to a price decline as a future seller of wheat.",
            blameConceptId: "forwards-and-futures",
          },
        },
        {
          id: "combined-outcome-locked-in",
          description:
            "Explains that if the spot price falls, the loss on the physical crop's sale value is offset by a gain on the short futures position, so the farmer's combined effective sale price stays close to the price locked in at the start.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.8,
    discrimination: 1.5,
    expectedSeconds: 190,
    prereqClosure: ["forwards-and-futures"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "forwards-and-futures--transfer-forward-vs-buy-and-hold-cost",
    conceptId: "forwards-and-futures",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "An investor who wants exposure to a stock's price in one year can either buy the stock outright today " +
      "and hold it, or enter a long forward contract that costs nothing today but obligates the investor to pay " +
      "the forward price F = S0(1+r) in one year to receive the stock. Explain why these two strategies should " +
      "deliver the same total economic outcome once financing is taken into account, even though one requires " +
      "cash today and the other does not.",
    rubric: {
      elements: [
        {
          id: "buy-and-hold-has-implicit-financing-cost",
          description:
            "Explains that buying the stock outright today ties up S0 in cash (or requires borrowing it), which carries an opportunity or financing cost of S0 × r over the year, while the forward defers that same cost to the fixed price paid at maturity.",
          weight: 4,
          required: true,
          misconception: {
            id: "outright-purchase-treated-as-free",
            description:
              "Treats buying the stock outright as costless just because no premium is paid, missing that tying up S0 of capital for a year carries its own opportunity or financing cost of S0 × r.",
            blameConceptId: "forwards-and-futures",
          },
        },
        {
          id: "same-terminal-outcome",
          description:
            "Concludes that once this financing cost is accounted for, both strategies leave the investor owning the stock at the same effective total cost, S0(1+r) = F, which is exactly why the no-arbitrage forward price takes that form.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.1,
    discrimination: 1.6,
    expectedSeconds: 180,
    prereqClosure: ["forwards-and-futures", "time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "forwards-and-futures--transfer-forward-price-vs-expected-future-spot",
    conceptId: "forwards-and-futures",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Explain why the forward price F = S0(1+r)^T is derived purely from no-arbitrage reasoning about today's " +
      "spot price and the risk-free rate, and does not require anyone to forecast what the future spot price " +
      "will actually turn out to be.",
    rubric: {
      elements: [
        {
          id: "replication-not-forecasting",
          description:
            "Explains that F is pinned down by the cost of replicating future delivery today (borrow, buy, and carry the asset), a cost that is fully known today, so no forecast of the future spot price is needed to derive it.",
          weight: 3,
          required: true,
        },
        {
          id: "distinguishes-price-from-forecast",
          description:
            "Distinguishes the no-arbitrage forward price from a market forecast of where the spot price will actually be at T, noting the two can differ, and only an arbitrage argument pins down F.",
          weight: 3,
          required: true,
          misconception: {
            id: "forward-price-treated-as-a-forecast",
            description:
              "Treats the forward price as if it were the market's best guess of the future spot price, rather than a value pinned down by a no-arbitrage replication argument.",
            blameConceptId: "forwards-and-futures",
          },
        },
      ],
    },
    difficulty: 1.7,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["forwards-and-futures", "time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "forwards-and-futures--derivation-forward-price-with-carry-cost",
    conceptId: "forwards-and-futures",
    format: "derivation",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Consider a non-dividend-paying asset with spot price S0 = $60 and a one-year risk-free rate of 5% (simple " +
      "annual compounding). Derive the fair one-year forward price step by step from the cash-and-carry " +
      "argument (borrow S0, buy the asset, repay the loan with interest at T), and give the final numeric value.",
    rubric: {
      elements: [
        {
          id: "sets-up-borrowing",
          description: "States that borrowing S0 = $60 today to buy the asset means repaying S0(1+r) = 60 × 1.05 at time T.",
          weight: 2,
          required: true,
        },
        {
          id: "identifies-fair-forward",
          description:
            "Identifies that the forward price must equal this repayment amount, F = S0(1+r), since the strategy delivers the asset at T for exactly this known cost with no other cash flows.",
          weight: 3,
          required: true,
        },
        {
          id: "correct-numeric-value",
          description: "Computes F = 60 × 1.05 = $63.00.",
          weight: 2,
          required: true,
        },
      ],
    },
    difficulty: 0.4,
    discrimination: 1.4,
    expectedSeconds: 150,
    prereqClosure: ["forwards-and-futures", "time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "forwards-and-futures--derivation-net-cost-of-carry-two-legs",
    conceptId: "forwards-and-futures",
    format: "derivation",
    cognitive: "transfer",
    channels: ["typed", "handwritten"],
    stem:
      "An arbitrageur believes a one-year forward on a non-dividend-paying stock, currently priced at S0 = $90 " +
      "with a risk-free rate of 6% (simple annual compounding), is trading at a market forward price of $100, " +
      "above its fair value. Derive the arbitrageur's riskless profit per share at maturity from a cash-and-carry " +
      "trade (borrow S0, buy the stock, sell the forward), showing the fair forward price and the resulting " +
      "profit.",
    rubric: {
      elements: [
        {
          id: "computes-fair-forward",
          description: "Computes the fair forward price as F* = 90 × 1.06 = $95.40.",
          weight: 3,
          required: true,
        },
        {
          id: "identifies-cash-flows-at-maturity",
          description:
            "Explains that at maturity the arbitrageur delivers the stock into the $100 forward, receiving $100, and owes 90 × 1.06 = $95.40 to repay the loan.",
          weight: 3,
          required: true,
        },
        {
          id: "computes-profit",
          description: "Computes the riskless profit as $100 − $95.40 = $4.60 per share.",
          weight: 2,
          required: true,
        },
      ],
    },
    difficulty: 1.3,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["forwards-and-futures", "time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "forwards-and-futures--apply-mcq-basis-convergence",
    conceptId: "forwards-and-futures",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed"],
    stem: "As a futures contract approaches its expiration date, what happens to the difference between the futures price and the spot price of the underlying (the 'basis')?",
    choices: [
      {
        id: "a",
        text: "It converges to zero, since at expiration the futures price and the spot price must coincide, or a riskless arbitrage would exist",
        correct: true,
      },
      {
        id: "b",
        text: "It grows without bound, since the two prices become less related as expiration nears",
        correct: false,
        misconception: {
          id: "basis-diverges-near-expiry",
          description:
            "Reverses the well-known convergence property. The futures price converges to the spot price as expiration approaches, precisely because at expiration they must represent the same transaction.",
          blameConceptId: "forwards-and-futures",
        },
      },
      {
        id: "c",
        text: "It stays constant at whatever level it started at when the contract was first listed",
        correct: false,
        misconception: {
          id: "basis-treated-as-constant",
          description:
            "Misses that the basis (futures price minus spot price) shrinks over time toward zero as the remaining time to maturity, which drives the cost-of-carry term, shrinks toward zero.",
          blameConceptId: "forwards-and-futures",
        },
      },
    ],
    difficulty: 0.6,
    discrimination: 1.5,
    expectedSeconds: 100,
    prereqClosure: ["forwards-and-futures", "time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },

  // ===========================================================================
  // options-calls-and-puts
  // ===========================================================================
  {
    id: "options-calls-and-puts--recall-call-definition",
    conceptId: "options-calls-and-puts",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What does a call option give its holder?",
    choices: [
      { id: "a", text: "The right, but not the obligation, to buy the underlying asset at a fixed strike price", correct: true },
      {
        id: "b",
        text: "The right, but not the obligation, to sell the underlying asset at a fixed strike price",
        correct: false,
        misconception: {
          id: "call-confused-with-put",
          description: "Swaps calls and puts. A call is the right to buy; a put is the right to sell.",
          blameConceptId: "options-calls-and-puts",
        },
      },
      {
        id: "c",
        text: "The obligation to buy the underlying asset at a fixed strike price no matter what",
        correct: false,
        misconception: {
          id: "call-confused-with-forward",
          description:
            "Describes a firm obligation rather than an option. The defining feature of an option is that exercising it is optional, not obligatory.",
          blameConceptId: "options-calls-and-puts",
        },
      },
    ],
    difficulty: -1.5,
    discrimination: 1.1,
    expectedSeconds: 30,
    prereqClosure: ["options-calls-and-puts"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "options-calls-and-puts--recall-put-definition",
    conceptId: "options-calls-and-puts",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What does a put option give its holder?",
    choices: [
      { id: "a", text: "The right, but not the obligation, to sell the underlying asset at a fixed strike price", correct: true },
      {
        id: "b",
        text: "The right, but not the obligation, to buy the underlying asset at a fixed strike price",
        correct: false,
        misconception: {
          id: "put-confused-with-call",
          description: "Swaps calls and puts. A put is the right to sell; a call is the right to buy.",
          blameConceptId: "options-calls-and-puts",
        },
      },
      {
        id: "c",
        text: "The obligation to sell the underlying asset at a fixed strike price no matter what",
        correct: false,
        misconception: {
          id: "put-confused-with-short-forward",
          description:
            "Describes a firm obligation to sell, not an option. A put buyer can choose not to exercise if it is unfavorable, unlike an outright obligation to sell.",
          blameConceptId: "options-calls-and-puts",
        },
      },
    ],
    difficulty: -1.4,
    discrimination: 1.1,
    expectedSeconds: 30,
    prereqClosure: ["options-calls-and-puts"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "options-calls-and-puts--recall-premium-role",
    conceptId: "options-calls-and-puts",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Why must an option buyer pay a premium upfront, when a forward can be entered for free?",
    choices: [
      {
        id: "a",
        text: "Because the option gives the buyer a one-sided right with no offsetting downside obligation, so the seller must be compensated for taking on all the risk of an adverse move",
        correct: true,
      },
      {
        id: "b",
        text: "Because options are riskier for the buyer than a forward, so the premium compensates the buyer for taking extra risk",
        correct: false,
        misconception: {
          id: "premium-paid-for-buyer-risk",
          description:
            "Reverses who bears the risk that is being compensated. The buyer's downside is capped at the premium; it is the seller (writer) who takes on open-ended risk and must be paid for it.",
          blameConceptId: "options-calls-and-puts",
        },
      },
      {
        id: "c",
        text: "The premium is simply a broker's transaction fee, unrelated to the option's payoff structure",
        correct: false,
        misconception: {
          id: "premium-confused-with-fee",
          description:
            "Confuses the option premium (the economic price of the contract's asymmetric payoff) with a brokerage transaction fee, which is a separate, additional cost.",
          blameConceptId: "options-calls-and-puts",
        },
      },
    ],
    difficulty: -0.8,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["options-calls-and-puts", "derivatives-overview"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "options-calls-and-puts--recall-strike-and-expiration",
    conceptId: "options-calls-and-puts",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which of the following are terms that must be specified for a standard option contract? Select all that apply.",
    choices: [
      { id: "a", text: "The strike (exercise) price", correct: true },
      { id: "b", text: "The expiration date", correct: true },
      { id: "c", text: "Whether it is a call or a put", correct: true },
      {
        id: "d",
        text: "The exact future spot price the underlying will reach",
        correct: false,
        misconception: {
          id: "option-specifies-future-price",
          description:
            "Confuses the strike price (a fixed, contractually specified price) with a prediction of the underlying's actual future price, which is unknown and not part of the contract's terms.",
          blameConceptId: "options-calls-and-puts",
        },
      },
    ],
    difficulty: -1.0,
    discrimination: 1.2,
    expectedSeconds: 50,
    prereqClosure: ["options-calls-and-puts"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "options-calls-and-puts--recall-buyer-vs-writer-obligation",
    conceptId: "options-calls-and-puts",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Between the option buyer (holder) and the option writer (seller), who has an actual obligation once the buyer decides to exercise?",
    choices: [
      { id: "a", text: "The writer, who must honor the exercise (deliver or buy the underlying as specified) once the holder chooses to exercise", correct: true },
      {
        id: "b",
        text: "The buyer, since only the buyer paid a premium",
        correct: false,
        misconception: {
          id: "buyer-treated-as-obligated",
          description:
            "Confuses paying a premium with taking on an obligation. The buyer's only 'obligation' was the premium already paid; from then on the buyer has pure optionality, while the writer must perform if exercised.",
          blameConceptId: "options-calls-and-puts",
        },
      },
      {
        id: "c",
        text: "Neither party has any obligation once the contract is written",
        correct: false,
        misconception: {
          id: "writer-obligation-missed",
          description:
            "Misses that the writer's promise to perform if exercised is precisely what the premium is paid for; the writer cannot simply refuse once the buyer exercises in the money.",
          blameConceptId: "options-calls-and-puts",
        },
      },
    ],
    difficulty: -0.7,
    discrimination: 1.3,
    expectedSeconds: 65,
    prereqClosure: ["options-calls-and-puts"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "options-calls-and-puts--apply-exercise-decision-call-itm",
    conceptId: "options-calls-and-puts",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem:
      "A call option has a strike price of $50. At expiration, the underlying stock trades at $58. Ignoring the " +
      "premium already paid, should the holder exercise the call?",
    choices: [
      { id: "a", text: "Yes — exercising lets the holder buy at $50 and the stock is worth $58, an immediate $8 gain per share", correct: true },
      {
        id: "b",
        text: "No — since $58 is above the $50 strike, exercising would lose money",
        correct: false,
        misconception: {
          id: "call-itm-direction-reversed",
          description:
            "Reverses in-the-money logic for a call. A call is favorable to exercise when the underlying's price is above the strike, since the holder buys cheap and the asset is worth more.",
          blameConceptId: "options-calls-and-puts",
        },
      },
    ],
    difficulty: -0.5,
    discrimination: 1.3,
    expectedSeconds: 60,
    prereqClosure: ["options-calls-and-puts"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "options-calls-and-puts--apply-exercise-decision-put-itm",
    conceptId: "options-calls-and-puts",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem:
      "A put option has a strike price of $40. At expiration, the underlying stock trades at $33. Ignoring the " +
      "premium already paid, should the holder exercise the put?",
    choices: [
      { id: "a", text: "Yes — exercising lets the holder sell at $40 a stock only worth $33, an immediate $7 gain per share", correct: true },
      {
        id: "b",
        text: "No — since the stock price fell, the put has become worthless",
        correct: false,
        misconception: {
          id: "put-value-direction-reversed",
          description:
            "Reverses in-the-money logic for a put. A put gains value as the underlying's price falls below the strike, exactly the opposite of a call.",
          blameConceptId: "options-calls-and-puts",
        },
      },
    ],
    difficulty: -0.5,
    discrimination: 1.3,
    expectedSeconds: 60,
    prereqClosure: ["options-calls-and-puts"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "options-calls-and-puts--apply-net-profit-call-numeric",
    conceptId: "options-calls-and-puts",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "An investor buys a call option with a strike price of $45, paying a premium of $3 per share. At " +
      "expiration, the stock trades at $52. What is the investor's net profit (in dollars) per share, including " +
      "the premium paid?",
    answerKey: 4,
    tolerance: 0.1,
    difficulty: -0.1,
    discrimination: 1.4,
    expectedSeconds: 90,
    prereqClosure: ["options-calls-and-puts"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "options-calls-and-puts--apply-net-profit-put-numeric",
    conceptId: "options-calls-and-puts",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "An investor buys a put option with a strike price of $60, paying a premium of $4 per share. At " +
      "expiration, the stock trades at $50. What is the investor's net profit (in dollars) per share, including " +
      "the premium paid?",
    answerKey: 6,
    tolerance: 0.1,
    difficulty: 0.0,
    discrimination: 1.4,
    expectedSeconds: 90,
    prereqClosure: ["options-calls-and-puts"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "options-calls-and-puts--apply-max-loss-buyer-vs-writer",
    conceptId: "options-calls-and-puts",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "For the buyer (holder) of a call option, what is the maximum possible loss on the position?",
    choices: [
      { id: "a", text: "The premium paid, since the holder can simply let a worthless option expire unexercised", correct: true },
      {
        id: "b",
        text: "Unlimited, since the stock price could theoretically rise without bound",
        correct: false,
        misconception: {
          id: "call-buyer-loss-confused-with-writer",
          description:
            "Confuses the call holder's risk with the call writer's risk. It is the option writer (seller), not the buyer, who faces unlimited loss if the stock price rises without bound; the buyer's loss is capped at the premium.",
          blameConceptId: "options-calls-and-puts",
        },
      },
    ],
    difficulty: -0.3,
    discrimination: 1.4,
    expectedSeconds: 80,
    prereqClosure: ["options-calls-and-puts"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "options-calls-and-puts--apply-max-loss-put-writer",
    conceptId: "options-calls-and-puts",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A trader writes (sells) a put option with a strike price of $30, receiving a premium of $2 per share. If " +
      "the underlying stock's price could in the worst case fall all the way to $0, what is the writer's " +
      "maximum possible loss (in dollars) per share, net of the premium received?",
    answerKey: 28,
    tolerance: 0.5,
    difficulty: 0.5,
    discrimination: 1.5,
    expectedSeconds: 130,
    prereqClosure: ["options-calls-and-puts"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "options-calls-and-puts--explain-asymmetry-and-premium",
    conceptId: "options-calls-and-puts",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain the key asymmetry between the two sides of a single option contract — the buyer (holder) and " +
      "the writer (seller) — and how that asymmetry explains why the buyer must pay the writer a premium " +
      "upfront.",
    rubric: {
      elements: [
        {
          id: "identifies-optionality",
          description:
            "Explains that the buyer has a choice (exercise or not, whichever is favorable), while the writer must perform if the buyer chooses to exercise, with no corresponding choice of their own.",
          weight: 3,
          required: true,
        },
        {
          id: "links-to-premium",
          description:
            "Explains that because the buyer's downside is capped (simply let the option expire) while the writer's exposure is open-ended, the writer must be compensated with a premium for accepting that one-sided risk.",
          weight: 3,
          required: true,
          misconception: {
            id: "premium-unexplained",
            description:
              "States that options simply cost money without connecting this to the underlying asymmetry between the buyer's right and the writer's obligation.",
            blameConceptId: "options-calls-and-puts",
          },
        },
      ],
    },
    difficulty: 0.0,
    discrimination: 1.4,
    expectedSeconds: 140,
    prereqClosure: ["options-calls-and-puts"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "options-calls-and-puts--explain-intrinsic-vs-time-value",
    conceptId: "options-calls-and-puts",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "An option's premium is often decomposed into 'intrinsic value' and 'time value.' Explain what each term " +
      "means, and why an out-of-the-money option (zero intrinsic value) can still trade at a positive premium " +
      "before expiration.",
    rubric: {
      elements: [
        {
          id: "defines-intrinsic-value",
          description:
            "Defines intrinsic value as the payoff the option would have if exercised immediately (e.g. max(S − K, 0) for a call), which is zero when the option is out of the money.",
          weight: 3,
          required: true,
        },
        {
          id: "defines-time-value-and-why-positive",
          description:
            "Defines time value as the extra amount the market pays for the possibility that the option moves into the money before expiration, explaining that this possibility has positive value even when today's intrinsic value is zero.",
          weight: 3,
          required: true,
          misconception: {
            id: "otm-option-should-be-worthless",
            description:
              "Assumes an out-of-the-money option must be worth zero today, missing that there is still time remaining for the underlying's price to move favorably.",
            blameConceptId: "options-calls-and-puts",
          },
        },
      ],
    },
    difficulty: 0.3,
    discrimination: 1.4,
    expectedSeconds: 160,
    prereqClosure: ["options-calls-and-puts"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "options-calls-and-puts--explain-why-writer-needs-margin",
    conceptId: "options-calls-and-puts",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain why an option writer (seller) who does not already own the underlying asset is typically required " +
      "to post margin, while the option buyer is not.",
    rubric: {
      elements: [
        {
          id: "writer-has-open-ended-obligation",
          description:
            "Explains that the writer has taken on a potentially large future obligation (to deliver or buy the underlying at the strike), and margin exists to make sure the writer can perform on that obligation if the option is exercised against them.",
          weight: 3,
          required: true,
        },
        {
          id: "buyer-obligation-already-paid",
          description:
            "Explains that the buyer's maximum liability (the premium) is already paid upfront in full, so there is no future performance risk from the buyer's side that would require margin.",
          weight: 3,
          required: true,
          misconception: {
            id: "buyer-also-needs-margin",
            description:
              "Assumes the buyer also needs margin, missing that the buyer's exposure is capped and already settled via the premium paid at purchase.",
            blameConceptId: "options-calls-and-puts",
          },
        },
      ],
    },
    difficulty: 0.6,
    discrimination: 1.5,
    expectedSeconds: 160,
    prereqClosure: ["options-calls-and-puts"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "options-calls-and-puts--transfer-covered-call-strategy",
    conceptId: "options-calls-and-puts",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "In a 'covered call' strategy, an investor who already owns 100 shares of a stock sells (writes) a call " +
      "option on those same 100 shares. Explain why owning the shares changes the risk of writing the call " +
      "compared to writing a 'naked' call with no shares owned, and what the investor gives up in exchange for " +
      "collecting the premium.",
    rubric: {
      elements: [
        {
          id: "covered-limits-upside-risk",
          description:
            "Explains that because the investor already owns the shares, being forced to deliver them at the strike price if exercised is a known, bounded outcome rather than requiring the investor to buy shares at an unknown, potentially much higher market price, as a naked writer would.",
          weight: 3,
          required: true,
        },
        {
          id: "gives-up-further-upside",
          description:
            "Explains the investor gives up any stock appreciation above the strike price, in exchange for the premium collected — the position caps its upside at strike plus premium.",
          weight: 3,
          required: true,
          misconception: {
            id: "covered-call-treated-as-free-money",
            description:
              "Treats the covered call premium as pure extra income with no tradeoff, missing that the investor forgoes upside beyond the strike price if the stock rallies.",
            blameConceptId: "options-calls-and-puts",
          },
        },
      ],
    },
    difficulty: 1.2,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["options-calls-and-puts", "equities-and-stock-markets"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "options-calls-and-puts--transfer-protective-put-strategy",
    conceptId: "options-calls-and-puts",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "An investor holding a stock buys a 'protective put' on that same stock. Explain how this combined " +
      "position resembles buying insurance, identifying what plays the role of the deductible and what plays " +
      "the role of the premium.",
    rubric: {
      elements: [
        {
          id: "put-caps-downside",
          description:
            "Explains that the put guarantees a minimum sale price (the strike), so losses on the stock below the strike are offset by gains on the put, capping the investor's total downside.",
          weight: 3,
          required: true,
        },
        {
          id: "deductible-and-premium-identified",
          description:
            "Identifies the 'deductible' as the loss the investor still absorbs between the current price and the strike (uninsured against), and the 'premium' as the price paid for the put itself.",
          weight: 3,
          required: true,
          misconception: {
            id: "protective-put-treated-as-full-insurance",
            description:
              "Treats the protective put as eliminating all downside entirely, missing that losses between the purchase price and the strike are not covered — only losses below the strike are.",
            blameConceptId: "options-calls-and-puts",
          },
        },
      ],
    },
    difficulty: 1.3,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["options-calls-and-puts", "equities-and-stock-markets"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "options-calls-and-puts--transfer-bond-embedded-put",
    conceptId: "options-calls-and-puts",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A 'putable bond' lets the bondholder force the issuer to repurchase the bond at a fixed price before " +
      "maturity. Explain why this feature is economically an option held by the bondholder, and state which " +
      "party — the bondholder or the issuer — this feature benefits at the other's expense.",
    rubric: {
      elements: [
        {
          id: "identifies-put-like-right",
          description:
            "Explains that the bondholder has the right, but not the obligation, to sell (put) the bond back to the issuer at a fixed price, exactly matching the structure of a put option with the issuer as the option writer.",
          weight: 3,
          required: true,
        },
        {
          id: "identifies-who-benefits",
          description:
            "States that the feature benefits the bondholder (who can exercise it if market rates rise and the bond's value falls below the put price), effectively at the issuer's expense, since the issuer bears the equivalent of writing a put for free.",
          weight: 3,
          required: true,
          misconception: {
            id: "putable-feature-benefits-issuer",
            description:
              "Reverses who benefits from the embedded option, treating it as favoring the issuer rather than the bondholder who holds the right.",
            blameConceptId: "bonds-and-fixed-income",
          },
        },
      ],
    },
    difficulty: 1.6,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["options-calls-and-puts", "bonds-and-fixed-income"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "options-calls-and-puts--apply-mcq-writer-motivation",
    conceptId: "options-calls-and-puts",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed"],
    stem: "Why would anyone agree to write (sell) an option, given that the writer faces open-ended risk while the buyer's risk is capped?",
    choices: [
      { id: "a", text: "The writer collects the premium upfront and profits if the option ultimately expires worthless or is exercised only slightly against them", correct: true },
      {
        id: "b",
        text: "Writers never actually face any real risk because exchanges guarantee their losses",
        correct: false,
        misconception: {
          id: "writer-risk-guaranteed-away",
          description:
            "Confuses clearinghouse guarantees against counterparty default with the writer's own market risk being eliminated. Margining reduces default risk on the exchange but does not remove the writer's exposure to the option finishing deep in the money.",
          blameConceptId: "options-calls-and-puts",
        },
      },
    ],
    difficulty: 0.1,
    discrimination: 1.4,
    expectedSeconds: 90,
    prereqClosure: ["options-calls-and-puts"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "options-calls-and-puts--derivation-breakeven-call",
    conceptId: "options-calls-and-puts",
    format: "derivation",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A call option has a strike price K = $50 and a premium of $4 per share. Derive the breakeven stock price " +
      "at expiration (the price at which the buyer's net profit, including the premium paid, is exactly zero), " +
      "showing your reasoning.",
    rubric: {
      elements: [
        {
          id: "sets-up-net-profit-equation",
          description: "Writes net profit as max(S − K, 0) − premium, and sets it equal to zero for the in-the-money case: S − 50 − 4 = 0.",
          weight: 3,
          required: true,
        },
        {
          id: "solves-for-breakeven",
          description: "Solves to get S = $54 as the breakeven stock price.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.2,
    discrimination: 1.4,
    expectedSeconds: 130,
    prereqClosure: ["options-calls-and-puts"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "options-calls-and-puts--recall-mcq-american-vs-european",
    conceptId: "options-calls-and-puts",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What is the difference between an American-style option and a European-style option?",
    choices: [
      {
        id: "a",
        text: "An American option can be exercised at any time up to and including expiration, while a European option can only be exercised at expiration",
        correct: true,
      },
      {
        id: "b",
        text: "An American option can only be traded in the United States, while a European option can only be traded in Europe",
        correct: false,
        misconception: {
          id: "american-european-confused-with-geography",
          description:
            "Confuses the naming convention with actual geography. 'American' and 'European' here refer only to the exercise timing rule, not to where the option is traded.",
          blameConceptId: "options-calls-and-puts",
        },
      },
    ],
    difficulty: -1.0,
    discrimination: 1.2,
    expectedSeconds: 50,
    prereqClosure: ["options-calls-and-puts"],
    source: AUTHORED,
    status: "live",
  },

  // ===========================================================================
  // option-payoff-and-put-call-parity
  // ===========================================================================
  {
    id: "option-payoff-and-put-call-parity--recall-call-payoff-formula",
    conceptId: "option-payoff-and-put-call-parity",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What is the payoff at expiration of a European call option with strike K, as a function of the underlying's price S at expiration?",
    choices: [
      { id: "a", text: "max(S − K, 0)", correct: true },
      {
        id: "b",
        text: "max(K − S, 0)",
        correct: false,
        misconception: {
          id: "call-payoff-confused-with-put",
          description: "Writes the put payoff formula instead of the call payoff formula; the two are mirror images of each other.",
          blameConceptId: "options-calls-and-puts",
        },
      },
      {
        id: "c",
        text: "S − K, with no floor at zero",
        correct: false,
        misconception: {
          id: "call-payoff-missing-floor",
          description:
            "Omits the floor at zero, which is exactly what makes an option different from a forward: the holder never pays more than zero even if S is far below K.",
          blameConceptId: "option-payoff-and-put-call-parity",
        },
      },
    ],
    difficulty: -1.3,
    discrimination: 1.2,
    expectedSeconds: 40,
    prereqClosure: ["option-payoff-and-put-call-parity"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "option-payoff-and-put-call-parity--recall-put-payoff-formula",
    conceptId: "option-payoff-and-put-call-parity",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What is the payoff at expiration of a European put option with strike K, as a function of the underlying's price S at expiration?",
    choices: [
      { id: "a", text: "max(K − S, 0)", correct: true },
      {
        id: "b",
        text: "max(S − K, 0)",
        correct: false,
        misconception: {
          id: "put-payoff-confused-with-call",
          description: "Writes the call payoff formula instead of the put payoff formula.",
          blameConceptId: "options-calls-and-puts",
        },
      },
      {
        id: "c",
        text: "K − S, with no floor at zero",
        correct: false,
        misconception: {
          id: "put-payoff-missing-floor",
          description: "Omits the floor at zero, missing that a put holder never has a negative payoff even if S is far above K.",
          blameConceptId: "option-payoff-and-put-call-parity",
        },
      },
    ],
    difficulty: -1.3,
    discrimination: 1.2,
    expectedSeconds: 40,
    prereqClosure: ["option-payoff-and-put-call-parity"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "option-payoff-and-put-call-parity--recall-parity-formula",
    conceptId: "option-payoff-and-put-call-parity",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which equation correctly states put-call parity for European options with the same strike K and maturity T, with S0 the current stock price and r the risk-free rate?",
    choices: [
      { id: "a", text: "C − P = S0 − K/(1+r)^T", correct: true },
      {
        id: "b",
        text: "C + P = S0 − K/(1+r)^T",
        correct: false,
        misconception: {
          id: "parity-sign-error-sum-instead-of-difference",
          description:
            "Uses a sum of the call and put premiums instead of their difference. Parity relates C − P, not C + P, to the stock and discounted strike.",
          blameConceptId: "option-payoff-and-put-call-parity",
        },
      },
      {
        id: "c",
        text: "C − P = S0 − K",
        correct: false,
        misconception: {
          id: "parity-forgets-discounting",
          description:
            "Uses the undiscounted strike K instead of its present value K/(1+r)^T, ignoring the time value of money over the option's life.",
          blameConceptId: "time-value-of-money",
        },
      },
      {
        id: "d",
        text: "P − C = S0 − K/(1+r)^T",
        correct: false,
        misconception: {
          id: "parity-sides-reversed",
          description: "Reverses which side of the identity is C − P versus P − C.",
          blameConceptId: "option-payoff-and-put-call-parity",
        },
      },
    ],
    difficulty: -0.5,
    discrimination: 1.4,
    expectedSeconds: 60,
    prereqClosure: ["option-payoff-and-put-call-parity", "time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "option-payoff-and-put-call-parity--recall-payoff-diagram-shape",
    conceptId: "option-payoff-and-put-call-parity",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What is the shape of a long call's payoff diagram (payoff on the vertical axis, underlying price S at expiration on the horizontal axis)?",
    choices: [
      { id: "a", text: "Flat at zero for S below the strike, then rising linearly with slope 1 for S above the strike — a 'kinked' line", correct: true },
      {
        id: "b",
        text: "A straight line through the origin with slope 1 for all values of S",
        correct: false,
        misconception: {
          id: "call-payoff-drawn-as-forward",
          description:
            "Draws the payoff diagram of a long forward (or the underlying itself) rather than a call. The floor at zero for out-of-the-money outcomes is exactly what makes an option's diagram kinked rather than a straight line.",
          blameConceptId: "option-payoff-and-put-call-parity",
        },
      },
      {
        id: "c",
        text: "Rising linearly with slope 1 for S below the strike, then flat at zero for S above the strike",
        correct: false,
        misconception: {
          id: "call-diagram-direction-reversed",
          description: "Reverses which side of the strike is flat. A call's payoff is flat below the strike and rises above it, not the other way around.",
          blameConceptId: "option-payoff-and-put-call-parity",
        },
      },
    ],
    difficulty: -0.6,
    discrimination: 1.3,
    expectedSeconds: 60,
    prereqClosure: ["option-payoff-and-put-call-parity"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "option-payoff-and-put-call-parity--recall-parity-holds-for-european-only",
    conceptId: "option-payoff-and-put-call-parity",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Put-call parity in its exact form (C − P = S0 − K/(1+r)^T) is derived assuming which style of option?",
    choices: [
      { id: "a", text: "European-style options, which can only be exercised at expiration", correct: true },
      {
        id: "b",
        text: "American-style options, which can be exercised at any time",
        correct: false,
        misconception: {
          id: "parity-assumed-for-american",
          description:
            "The exact equality relies on both options being held to expiration with no early-exercise decision; American options' early-exercise feature breaks the exact equality (it only gives inequalities).",
          blameConceptId: "option-payoff-and-put-call-parity",
        },
      },
    ],
    difficulty: 0.2,
    discrimination: 1.4,
    expectedSeconds: 70,
    prereqClosure: ["option-payoff-and-put-call-parity"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "option-payoff-and-put-call-parity--apply-call-payoff-numeric",
    conceptId: "option-payoff-and-put-call-parity",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "A call option has a strike price of $45. At expiration, the underlying trades at $38. What is the option's payoff, in dollars, per share?",
    answerKey: 0,
    tolerance: 0.01,
    difficulty: -1.0,
    discrimination: 1.2,
    expectedSeconds: 45,
    prereqClosure: ["option-payoff-and-put-call-parity"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "option-payoff-and-put-call-parity--apply-parity-solve-for-put",
    conceptId: "option-payoff-and-put-call-parity",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A stock trades at S0 = $100. A one-year European call with strike K = $100 trades at C = $8. The " +
      "one-year risk-free rate is 5% (simple annual compounding). Using put-call parity C − P = S0 − K/(1+r)^T, " +
      "what should the one-year European put with the same strike be worth? Give your answer to the nearest " +
      "cent.",
    answerKey: 3.76,
    tolerance: 0.1,
    difficulty: 0.4,
    discrimination: 1.5,
    expectedSeconds: 130,
    prereqClosure: ["option-payoff-and-put-call-parity", "time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "option-payoff-and-put-call-parity--apply-parity-solve-for-call",
    conceptId: "option-payoff-and-put-call-parity",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A stock trades at S0 = $50. A one-year European put with strike K = $50 trades at P = $4. The one-year " +
      "risk-free rate is 4% (simple annual compounding). Using put-call parity C − P = S0 − K/(1+r)^T, what " +
      "should the one-year European call with the same strike be worth? Give your answer to the nearest cent.",
    answerKey: 5.92,
    tolerance: 0.1,
    difficulty: 0.4,
    discrimination: 1.5,
    expectedSeconds: 130,
    prereqClosure: ["option-payoff-and-put-call-parity", "time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "option-payoff-and-put-call-parity--apply-parity-solve-for-stock",
    conceptId: "option-payoff-and-put-call-parity",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A one-year European call and put both have strike K = $80. The call trades at C = $10, the put trades " +
      "at P = $6, and the one-year risk-free rate is 5% (simple annual compounding). Using put-call parity " +
      "C − P = S0 − K/(1+r)^T, what is the current stock price S0? Give your answer to the nearest cent.",
    answerKey: 80.19,
    tolerance: 0.2,
    difficulty: 0.7,
    discrimination: 1.6,
    expectedSeconds: 150,
    prereqClosure: ["option-payoff-and-put-call-parity", "time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "option-payoff-and-put-call-parity--apply-arbitrage-parity-violation",
    conceptId: "option-payoff-and-put-call-parity",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem:
      "A stock trades at $100, K = $100, r = 5% (one-year, simple compounding), so put-call parity implies " +
      "C − P should equal $100 − 100/1.05 ≈ $4.76. In the market, C = $9 and P = $3, so C − P = $6, which is too " +
      "high relative to parity. What arbitrage trade exploits this mispricing?",
    choices: [
      {
        id: "a",
        text: "Sell (write) the relatively overpriced call, buy the relatively underpriced put, buy the stock, and borrow the present value of the strike — the resulting position locks in a riskless profit",
        correct: true,
      },
      {
        id: "b",
        text: "Buy the call and buy the put, since both being mispriced means both should be purchased",
        correct: false,
        misconception: {
          id: "buys-both-sides-of-parity",
          description:
            "Buys both legs instead of buying the relatively cheap side and selling the relatively expensive side. Exploiting a parity violation requires being long the underpriced combination and short the overpriced one.",
          blameConceptId: "option-payoff-and-put-call-parity",
        },
      },
    ],
    difficulty: 1.4,
    discrimination: 1.7,
    expectedSeconds: 190,
    prereqClosure: ["option-payoff-and-put-call-parity", "time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "option-payoff-and-put-call-parity--explain-parity-derivation-idea",
    conceptId: "option-payoff-and-put-call-parity",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain the core idea behind deriving put-call parity: what two portfolios have the exact same payoff at " +
      "expiration, no matter what the stock price turns out to be, and why must they therefore have the same " +
      "value today?",
    rubric: {
      elements: [
        {
          id: "identifies-two-portfolios",
          description:
            "Identifies the two matching portfolios: (call + a bond paying K at T) versus (put + one share of stock). Both have terminal payoff max(S,K), so they must be priced equally.",
          weight: 4,
          required: true,
        },
        {
          id: "law-of-one-price",
          description:
            "Invokes the law of one price / no-arbitrage: if two portfolios always deliver identical payoffs, one being cheaper than the other would allow a riskless arbitrage, so their prices today must match.",
          weight: 3,
          required: true,
          misconception: {
            id: "parity-treated-as-empirical-coincidence",
            description:
              "Treats parity as an empirical regularity rather than a strict no-arbitrage consequence of two portfolios sharing identical terminal payoffs.",
            blameConceptId: "option-payoff-and-put-call-parity",
          },
        },
      ],
    },
    difficulty: 0.9,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["option-payoff-and-put-call-parity", "bonds-and-fixed-income", "time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "option-payoff-and-put-call-parity--explain-kink-source",
    conceptId: "option-payoff-and-put-call-parity",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain why an option's payoff diagram has a kink (a point where the slope suddenly changes) exactly at " +
      "the strike price, rather than being a single straight line over the whole range of possible stock " +
      "prices.",
    rubric: {
      elements: [
        {
          id: "max-function-creates-kink",
          description:
            "Explains that the max(·, 0) in the payoff formula creates the kink: the slope is zero on one side of the strike, where exercising would be unfavorable and the holder simply does not exercise, and non-zero on the other side, and these two pieces meet exactly at the strike.",
          weight: 4,
          required: true,
        },
        {
          id: "kink-marks-exercise-boundary",
          description:
            "Explains that the strike price is precisely the boundary between the holder exercising and not exercising, so it is the one point where the payoff's behavior necessarily changes.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.3,
    discrimination: 1.4,
    expectedSeconds: 150,
    prereqClosure: ["option-payoff-and-put-call-parity"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "option-payoff-and-put-call-parity--explain-parity-rearranged-as-synthetic",
    conceptId: "option-payoff-and-put-call-parity",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Put-call parity can be rearranged to S0 = C − P + K/(1+r)^T. Explain what this rearrangement says about " +
      "building a 'synthetic stock' position out of options and a bond, and why this equivalence must hold.",
    rubric: {
      elements: [
        {
          id: "synthetic-stock-recipe",
          description:
            "Explains that buying a call, selling a put (same strike and maturity), and buying a bond paying K at maturity reproduces the exact same payoff as owning the stock outright at every possible stock price at expiration.",
          weight: 3,
          required: true,
        },
        {
          id: "same-payoff-implies-same-price",
          description:
            "Explains that because the combined position's terminal payoff exactly matches owning the stock in every scenario, no-arbitrage forces the combined position's cost today to equal the stock's price today.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.1,
    discrimination: 1.6,
    expectedSeconds: 180,
    prereqClosure: ["option-payoff-and-put-call-parity", "bonds-and-fixed-income", "time-value-of-money", "equities-and-stock-markets"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "option-payoff-and-put-call-parity--transfer-collar-payoff",
    conceptId: "option-payoff-and-put-call-parity",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A 'collar' combines owning the stock, buying a protective put at a lower strike K1, and selling a call at " +
      "a higher strike K2 (often chosen so the premiums roughly offset). Sketch (in words) the shape of the " +
      "combined payoff diagram as a function of the stock price at expiration, and explain what the investor " +
      "gives up and gains compared to holding the stock alone.",
    rubric: {
      elements: [
        {
          id: "describes-capped-both-sides",
          description:
            "Describes the combined payoff as flat below K1 (protected by the put), rising one-for-one with the stock between K1 and K2, and flat above K2 (capped by the written call) — a payoff bounded both above and below.",
          weight: 4,
          required: true,
        },
        {
          id: "tradeoff-named",
          description:
            "Explains the investor gives up upside above K2 in exchange for downside protection below K1, often at little or no net premium cost.",
          weight: 3,
          required: true,
          misconception: {
            id: "collar-treated-as-pure-upside",
            description:
              "Describes the collar as adding protection with no cost or tradeoff, missing that the written call caps the position's upside.",
            blameConceptId: "option-payoff-and-put-call-parity",
          },
        },
      ],
    },
    difficulty: 1.5,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["option-payoff-and-put-call-parity", "equities-and-stock-markets", "options-calls-and-puts"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "option-payoff-and-put-call-parity--transfer-straddle-payoff",
    conceptId: "option-payoff-and-put-call-parity",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A 'long straddle' buys a call and a put with the same strike K and maturity. Using the payoff formulas " +
      "for each leg, explain the shape of the combined payoff diagram, and explain what view about the " +
      "underlying's future volatility (not direction) this position expresses.",
    rubric: {
      elements: [
        {
          id: "combined-payoff-v-shape",
          description:
            "Explains that adding max(S − K, 0) + max(K − S, 0) produces a V-shaped payoff: zero only exactly at S = K, and rising linearly as S moves away from K in either direction.",
          weight: 3,
          required: true,
        },
        {
          id: "bet-on-volatility-not-direction",
          description:
            "Explains that because the position gains from a large move in either direction, it is a bet on high realized volatility (a big move happening) rather than a bet on the stock going up or down specifically.",
          weight: 3,
          required: true,
          misconception: {
            id: "straddle-treated-as-directional-bet",
            description:
              "Treats the straddle as a directional bet (bullish or bearish), missing that its symmetric structure makes it a bet on the magnitude of the move, not its direction.",
            blameConceptId: "option-payoff-and-put-call-parity",
          },
        },
      ],
    },
    difficulty: 1.4,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["option-payoff-and-put-call-parity", "options-calls-and-puts"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "option-payoff-and-put-call-parity--derivation-parity-from-payoffs",
    conceptId: "option-payoff-and-put-call-parity",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "Derive put-call parity from scratch. Consider two portfolios at time T (maturity), both with the same " +
      "strike K: Portfolio A holds one call plus cash of K (grown to K by time T from an initial deposit of " +
      "K/(1+r)^T); Portfolio B holds one put plus one share of stock. Show that both portfolios have terminal " +
      "value max(S,K), and conclude the no-arbitrage pricing relationship between C, P, S0, and K/(1+r)^T.",
    rubric: {
      elements: [
        {
          id: "portfolio-a-terminal-value",
          description:
            "Shows Portfolio A's terminal value is max(S − K, 0) + K, which equals S when S ≥ K and K when S < K — i.e., max(S,K).",
          weight: 3,
          required: true,
        },
        {
          id: "portfolio-b-terminal-value",
          description:
            "Shows Portfolio B's terminal value is max(K − S, 0) + S, which equals K when S < K and S when S ≥ K — also max(S,K).",
          weight: 3,
          required: true,
        },
        {
          id: "concludes-parity",
          description:
            "Concludes that since both portfolios always have identical terminal value, no-arbitrage requires their initial costs to match: C + K/(1+r)^T = P + S0, i.e. C − P = S0 − K/(1+r)^T.",
          weight: 3,
          required: true,
          misconception: {
            id: "skips-no-arbitrage-step",
            description:
              "States the parity formula without explaining that identical terminal payoffs is what forces identical initial prices under no-arbitrage.",
            blameConceptId: "option-payoff-and-put-call-parity",
          },
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.7,
    expectedSeconds: 240,
    prereqClosure: ["option-payoff-and-put-call-parity", "bonds-and-fixed-income", "time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "option-payoff-and-put-call-parity--derivation-net-payoff-covered-call",
    conceptId: "option-payoff-and-put-call-parity",
    format: "derivation",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "An investor holds one share of stock and writes one call option with strike K = $60, receiving a $5 " +
      "premium. Derive an algebraic expression for the combined position's total profit as a function of the " +
      "stock price S at expiration (accounting for the premium received), and evaluate it at S = $50, S = $60, " +
      "and S = $75.",
    rubric: {
      elements: [
        {
          id: "sets-up-combined-expression",
          description:
            "Writes total profit as (S − S0) + 5 − max(S − 60, 0), where S0 is the stock's original purchase price (or equivalently frames profit relative to the $5 premium plus stock payoff capped at 60).",
          weight: 3,
          required: true,
        },
        {
          id: "evaluates-below-strike",
          description: "Correctly evaluates that below the strike (S = $50), the call expires worthless, so the investor keeps the $5 premium plus the stock's own move.",
          weight: 2,
          required: true,
        },
        {
          id: "evaluates-above-strike-capped",
          description:
            "Correctly evaluates that at or above the strike (S = $60 or $75), the call is exercised against the investor, capping the stock-related gain at the strike ($60) regardless of how high S rises, plus the $5 premium.",
          weight: 3,
          required: true,
          misconception: {
            id: "covered-call-upside-not-capped",
            description: "Fails to cap the payoff at the strike for S above K, missing the entire point of writing the call.",
            blameConceptId: "option-payoff-and-put-call-parity",
          },
        },
      ],
    },
    difficulty: 1.0,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["option-payoff-and-put-call-parity", "options-calls-and-puts", "equities-and-stock-markets"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "option-payoff-and-put-call-parity--apply-mcq-parity-implies-bound",
    conceptId: "option-payoff-and-put-call-parity",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "Using put-call parity C − P = S0 − K/(1+r)^T, if the stock price S0 is very high relative to the strike " +
      "K, what does parity imply about the relationship between C and P?",
    choices: [
      { id: "a", text: "C must be substantially larger than P, since S0 − K/(1+r)^T becomes a large positive number", correct: true },
      {
        id: "b",
        text: "C and P must always be equal, regardless of S0 and K",
        correct: false,
        misconception: {
          id: "call-put-always-equal",
          description:
            "Assumes parity forces C = P unconditionally, missing that C − P depends on how far S0 is from the discounted strike; equality only holds in the special case S0 = K/(1+r)^T.",
          blameConceptId: "option-payoff-and-put-call-parity",
        },
      },
      {
        id: "c",
        text: "P must be substantially larger than C in this case",
        correct: false,
        misconception: {
          id: "parity-inequality-direction-reversed",
          description:
            "Reverses the direction implied by parity. When S0 is high relative to the discounted strike, the right-hand side of C − P = S0 − K/(1+r)^T is large and positive, meaning C, not P, must be the larger premium.",
          blameConceptId: "option-payoff-and-put-call-parity",
        },
      },
    ],
    difficulty: 0.5,
    discrimination: 1.5,
    expectedSeconds: 110,
    prereqClosure: ["option-payoff-and-put-call-parity", "time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "option-payoff-and-put-call-parity--transfer-parity-and-dividends-caveat",
    conceptId: "option-payoff-and-put-call-parity",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "The parity relationship C − P = S0 − K/(1+r)^T assumes the underlying stock pays no dividends before " +
      "expiration. Explain, in general terms, why a dividend paid during the option's life would require " +
      "adjusting the formula, without deriving the exact adjusted equation.",
    rubric: {
      elements: [
        {
          id: "dividend-reduces-stock-return-to-holder",
          description:
            "Explains that a stockholder receives dividend cash flows that an option holder does not, so the 'replicating' logic used to derive parity (stock plus put versus call plus bond) no longer produces identical terminal payoffs unless the dividend is accounted for.",
          weight: 4,
          required: true,
        },
        {
          id: "direction-of-adjustment",
          description:
            "Notes the adjustment generally reduces the effective forward-looking value of holding the stock (since some of its return is paid out as dividends before expiration rather than reflected in the terminal stock price), which is why the present value of expected dividends is typically subtracted from S0 in the adjusted formula.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.8,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["option-payoff-and-put-call-parity", "equities-and-stock-markets", "time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "option-payoff-and-put-call-parity--apply-payoff-multi-select-regions",
    conceptId: "option-payoff-and-put-call-parity",
    format: "multi-select",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "A call and a put both have strike K = $50. At expiration the stock trades at S = $60. Which statements " +
      "about the payoffs are correct? Select all that apply.",
    choices: [
      { id: "a", text: "The call's payoff is $10 per share", correct: true },
      { id: "b", text: "The put's payoff is $0 per share", correct: true },
      {
        id: "c",
        text: "The put's payoff is $10 per share, mirroring the call",
        correct: false,
        misconception: {
          id: "put-payoff-mirrors-call-incorrectly",
          description:
            "Assumes both options must have symmetric nonzero payoffs whenever S ≠ K, missing that a put out of the money (S above K) pays exactly zero, not the mirror amount of the call's payoff.",
          blameConceptId: "option-payoff-and-put-call-parity",
        },
      },
      {
        id: "d",
        text: "The call's payoff is $0 per share, since S is above K",
        correct: false,
        misconception: {
          id: "call-itm-otm-reversed",
          description: "Reverses in-the-money logic for a call; a call with S above K is in the money and pays S − K, not zero.",
          blameConceptId: "option-payoff-and-put-call-parity",
        },
      },
    ],
    difficulty: -0.4,
    discrimination: 1.3,
    expectedSeconds: 80,
    prereqClosure: ["option-payoff-and-put-call-parity"],
    source: AUTHORED,
    status: "live",
  },

  // ===========================================================================
  // option-pricing-and-greeks
  // ===========================================================================
  {
    id: "option-pricing-and-greeks--recall-delta-definition",
    conceptId: "option-pricing-and-greeks",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What does an option's 'delta' measure?",
    choices: [
      { id: "a", text: "The sensitivity of the option's price to a small change in the underlying asset's price", correct: true },
      {
        id: "b",
        text: "The sensitivity of the option's price to the passage of time",
        correct: false,
        misconception: {
          id: "delta-confused-with-theta",
          description: "Describes theta (time decay), not delta. Delta is specifically the sensitivity to the underlying's price.",
          blameConceptId: "option-pricing-and-greeks",
        },
      },
      {
        id: "c",
        text: "The sensitivity of the option's price to a change in the underlying's volatility",
        correct: false,
        misconception: {
          id: "delta-confused-with-vega",
          description: "Describes vega, not delta. Delta tracks moves in the underlying's price, while vega tracks moves in volatility.",
          blameConceptId: "option-pricing-and-greeks",
        },
      },
    ],
    difficulty: -0.2,
    discrimination: 1.2,
    expectedSeconds: 45,
    prereqClosure: ["option-pricing-and-greeks"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "option-pricing-and-greeks--recall-gamma-definition",
    conceptId: "option-pricing-and-greeks",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What does an option's 'gamma' measure?",
    choices: [
      { id: "a", text: "The rate of change of delta itself as the underlying's price changes — i.e., how curved the option's price is as a function of the underlying", correct: true },
      {
        id: "b",
        text: "The rate of change of the option's price with respect to the risk-free interest rate",
        correct: false,
        misconception: {
          id: "gamma-confused-with-rho",
          description: "Describes rho, not gamma. Rho is the sensitivity to the interest rate; gamma is the second derivative with respect to the underlying's price.",
          blameConceptId: "option-pricing-and-greeks",
        },
      },
      {
        id: "c",
        text: "The same thing as delta, just under a different name",
        correct: false,
        misconception: {
          id: "gamma-confused-with-delta",
          description: "Conflates gamma with delta. Delta is the first derivative (slope); gamma is the second derivative (how fast that slope itself changes).",
          blameConceptId: "option-pricing-and-greeks",
        },
      },
    ],
    difficulty: 0.0,
    discrimination: 1.3,
    expectedSeconds: 55,
    prereqClosure: ["option-pricing-and-greeks"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "option-pricing-and-greeks--recall-vega-definition",
    conceptId: "option-pricing-and-greeks",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What does an option's 'vega' measure?",
    choices: [
      { id: "a", text: "The sensitivity of the option's price to a change in the underlying's volatility", correct: true },
      {
        id: "b",
        text: "The sensitivity of the option's price to the passage of time (time decay)",
        correct: false,
        misconception: {
          id: "vega-confused-with-theta",
          description: "Describes theta, not vega. Vega measures sensitivity to volatility; theta measures sensitivity to time passing.",
          blameConceptId: "option-pricing-and-greeks",
        },
      },
      {
        id: "c",
        text: "The sensitivity of the option's price to changes in the strike price",
        correct: false,
        misconception: {
          id: "vega-confused-with-strike-sensitivity",
          description:
            "Invents a Greek for strike sensitivity, which is not one of the standard Greeks. Vega specifically tracks sensitivity to implied volatility, an input that itself is not a fixed contract term.",
          blameConceptId: "option-pricing-and-greeks",
        },
      },
    ],
    difficulty: 0.0,
    discrimination: 1.3,
    expectedSeconds: 55,
    prereqClosure: ["option-pricing-and-greeks"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "option-pricing-and-greeks--recall-theta-definition",
    conceptId: "option-pricing-and-greeks",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What does an option's 'theta' measure, and what is its typical sign for a long option position?",
    choices: [
      { id: "a", text: "The sensitivity of the option's price to the passage of time, typically negative for a long option since options generally lose value as expiration nears, all else equal", correct: true },
      {
        id: "b",
        text: "The sensitivity of the option's price to time, typically positive for a long option since more time always adds value",
        correct: false,
        misconception: {
          id: "theta-sign-reversed",
          description:
            "Gets the typical sign backwards for a long position. Holding an option generally loses time value as expiration approaches (all else equal), which is why theta is usually negative for a long option holder, not positive.",
          blameConceptId: "option-pricing-and-greeks",
        },
      },
      {
        id: "c",
        text: "The sensitivity of the option's price to the strike price",
        correct: false,
        misconception: {
          id: "theta-confused-with-strike-sensitivity",
          description: "Misidentifies theta as a strike-price sensitivity rather than a time-decay measure.",
          blameConceptId: "option-pricing-and-greeks",
        },
      },
    ],
    difficulty: 0.1,
    discrimination: 1.3,
    expectedSeconds: 60,
    prereqClosure: ["option-pricing-and-greeks"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "option-pricing-and-greeks--recall-rho-definition",
    conceptId: "option-pricing-and-greeks",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What does an option's 'rho' measure?",
    choices: [
      { id: "a", text: "The sensitivity of the option's price to a change in the risk-free interest rate", correct: true },
      {
        id: "b",
        text: "The sensitivity of the option's price to a change in the underlying's dividend yield only, and nothing else",
        correct: false,
        misconception: {
          id: "rho-confused-with-dividend-sensitivity",
          description:
            "Misidentifies rho, which measures sensitivity to the risk-free interest rate used in discounting and in the option pricing model, not specifically dividend yield.",
          blameConceptId: "option-pricing-and-greeks",
        },
      },
      {
        id: "c",
        text: "The option's correlation with the broader stock market",
        correct: false,
        misconception: {
          id: "rho-confused-with-beta",
          description: "Confuses rho with beta (a measure of market correlation/sensitivity), an unrelated concept from outside the option Greeks.",
          blameConceptId: "option-pricing-and-greeks",
        },
      },
    ],
    difficulty: 0.3,
    discrimination: 1.4,
    expectedSeconds: 60,
    prereqClosure: ["option-pricing-and-greeks"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "option-pricing-and-greeks--recall-bsm-inputs",
    conceptId: "option-pricing-and-greeks",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which of the following are direct inputs to the Black-Scholes-Merton option pricing formula? Select all that apply.",
    choices: [
      { id: "a", text: "The current price of the underlying asset", correct: true },
      { id: "b", text: "The strike price and time to expiration", correct: true },
      { id: "c", text: "The risk-free interest rate and the underlying's volatility", correct: true },
      {
        id: "d",
        text: "The option holder's personal risk tolerance",
        correct: false,
        misconception: {
          id: "bsm-includes-personal-preferences",
          description:
            "Adds a subjective preference parameter that is not part of Black-Scholes-Merton. The model prices options under risk-neutral valuation, independent of any individual investor's personal risk preferences.",
          blameConceptId: "black-scholes-merton-equation",
        },
      },
    ],
    difficulty: 0.2,
    discrimination: 1.3,
    expectedSeconds: 70,
    prereqClosure: ["option-pricing-and-greeks", "black-scholes-merton-equation"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "option-pricing-and-greeks--apply-delta-hedge-shares-basic",
    conceptId: "option-pricing-and-greeks",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A trader has sold (is short) 10 call option contracts, each covering 100 shares, with a delta of 0.6 per " +
      "option. To delta-hedge this short call position by buying shares of the underlying, how many shares " +
      "should the trader buy? (Shares needed = delta × contract size × number of contracts.)",
    answerKey: 600,
    tolerance: 1,
    difficulty: 0.6,
    discrimination: 1.5,
    expectedSeconds: 120,
    prereqClosure: ["option-pricing-and-greeks", "options-calls-and-puts"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "option-pricing-and-greeks--apply-delta-hedge-shares-put",
    conceptId: "option-pricing-and-greeks",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A trader is long 20 put option contracts, each covering 100 shares, with a delta of −0.4 per option. To " +
      "delta-hedge this position, how many shares of the underlying should the trader buy (a positive number) " +
      "or sell (a negative number)? (Shares needed = delta × contract size × number of contracts.)",
    answerKey: -800,
    tolerance: 1,
    difficulty: 0.8,
    discrimination: 1.6,
    expectedSeconds: 140,
    prereqClosure: ["option-pricing-and-greeks", "options-calls-and-puts"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "option-pricing-and-greeks--apply-delta-hedge-shares-larger",
    conceptId: "option-pricing-and-greeks",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A market maker has written 50 call option contracts, each covering 100 shares, with a delta of 0.35 per " +
      "option. To hedge this short call position, how many shares of the underlying stock should the market " +
      "maker buy? (Shares needed = delta × contract size × number of contracts.)",
    answerKey: 1750,
    tolerance: 5,
    difficulty: 0.7,
    discrimination: 1.5,
    expectedSeconds: 130,
    prereqClosure: ["option-pricing-and-greeks", "options-calls-and-puts"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "option-pricing-and-greeks--apply-delta-approx-price-change",
    conceptId: "option-pricing-and-greeks",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A call option has a delta of 0.5. If the underlying stock's price rises by $2, approximately how much " +
      "should the option's price rise, using the delta approximation? Give your answer in dollars.",
    answerKey: 1,
    tolerance: 0.05,
    difficulty: -0.3,
    discrimination: 1.3,
    expectedSeconds: 80,
    prereqClosure: ["option-pricing-and-greeks"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "option-pricing-and-greeks--apply-mcq-delta-near-expiry-itm",
    conceptId: "option-pricing-and-greeks",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed"],
    stem: "As expiration approaches, what happens to the delta of a call option that is deep in the money?",
    choices: [
      { id: "a", text: "It moves toward 1, since the option behaves more and more like owning the stock outright", correct: true },
      {
        id: "b",
        text: "It moves toward 0, since there is less time left for the option to gain more value",
        correct: false,
        misconception: {
          id: "deep-itm-delta-toward-zero",
          description:
            "Confuses shrinking time value with delta shrinking toward zero. A deep in-the-money option's delta actually moves toward 1 (not 0) as expiration nears, since it becomes almost certain to be exercised and behaves like the stock itself.",
          blameConceptId: "option-pricing-and-greeks",
        },
      },
      {
        id: "c",
        text: "It stays exactly at 0.5 regardless of how deep in the money the option is",
        correct: false,
        misconception: {
          id: "delta-assumed-constant-at-half",
          description: "Assumes delta is always 0.5, missing that delta varies continuously with moneyness and time to expiration.",
          blameConceptId: "option-pricing-and-greeks",
        },
      },
    ],
    difficulty: 0.9,
    discrimination: 1.6,
    expectedSeconds: 130,
    prereqClosure: ["option-pricing-and-greeks"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "option-pricing-and-greeks--apply-mcq-delta-near-expiry-otm",
    conceptId: "option-pricing-and-greeks",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed"],
    stem: "As expiration approaches, what happens to the delta of a call option that is deep out of the money?",
    choices: [
      { id: "a", text: "It moves toward 0, since the option becomes very unlikely to ever finish in the money", correct: true },
      {
        id: "b",
        text: "It moves toward 1, since out-of-the-money options become riskier as expiration nears",
        correct: false,
        misconception: {
          id: "deep-otm-delta-toward-one",
          description:
            "Reverses the direction. A deep out-of-the-money option's delta shrinks toward 0 as expiration nears, since the probability of ever finishing in the money keeps falling, not rising.",
          blameConceptId: "option-pricing-and-greeks",
        },
      },
    ],
    difficulty: 0.9,
    discrimination: 1.6,
    expectedSeconds: 120,
    prereqClosure: ["option-pricing-and-greeks"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "option-pricing-and-greeks--explain-gamma-largest-atm",
    conceptId: "option-pricing-and-greeks",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain why gamma is typically largest for an at-the-money option close to expiration, and why this " +
      "makes delta-hedging such a position especially difficult.",
    rubric: {
      elements: [
        {
          id: "gamma-peaks-atm-near-expiry",
          description:
            "Explains that near expiration, a small move in the underlying's price can flip an at-the-money option from virtually certain to expire worthless to virtually certain to be exercised, so delta swings rapidly with the underlying's price right around the strike — that rapid swing in delta is exactly what gamma measures.",
          weight: 3,
          required: true,
        },
        {
          id: "hedging-difficulty",
          description:
            "Explains that high gamma means delta itself becomes unstable, so a hedge ratio computed once quickly becomes wrong, forcing very frequent rehedging (buying and selling the underlying) to stay properly hedged.",
          weight: 3,
          required: true,
          misconception: {
            id: "gamma-treated-as-irrelevant-to-hedging",
            description:
              "Treats gamma as a separate, unrelated statistic from hedging difficulty, missing that gamma is precisely what tells a delta-hedger how often and how much they need to rebalance.",
            blameConceptId: "option-pricing-and-greeks",
          },
        },
      ],
    },
    difficulty: 1.3,
    discrimination: 1.7,
    expectedSeconds: 190,
    prereqClosure: ["option-pricing-and-greeks"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "option-pricing-and-greeks--explain-vega-and-time-to-expiry",
    conceptId: "option-pricing-and-greeks",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain why a longer-dated option generally has higher vega than a similar shorter-dated option, in " +
      "terms of how much time there is for volatility to matter.",
    rubric: {
      elements: [
        {
          id: "more-time-more-uncertainty-accumulates",
          description:
            "Explains that with more time to expiration, a given change in the volatility assumption compounds over a longer horizon, translating into a bigger swing in the range of plausible terminal stock prices and hence a bigger swing in the option's price.",
          weight: 3,
          required: true,
        },
        {
          id: "vega-shrinks-near-expiry",
          description:
            "Notes that as expiration approaches, there is very little time left for volatility to do anything, so vega shrinks toward zero regardless of moneyness.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.1,
    discrimination: 1.6,
    expectedSeconds: 160,
    prereqClosure: ["option-pricing-and-greeks", "geometric-brownian-motion"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "option-pricing-and-greeks--explain-why-bsm-uses-gbm",
    conceptId: "option-pricing-and-greeks",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "The Black-Scholes-Merton model assumes the underlying's price follows geometric Brownian motion. Explain " +
      "what property of geometric Brownian motion makes it a natural (if imperfect) choice for modeling a stock " +
      "price, as opposed to modeling the price as ordinary (arithmetic) Brownian motion.",
    rubric: {
      elements: [
        {
          id: "gbm-keeps-price-positive",
          description:
            "Explains that geometric Brownian motion models percentage (log) returns as normally distributed rather than the price level itself, which keeps the stock price always positive — a property ordinary Brownian motion on the price level does not guarantee.",
          weight: 3,
          required: true,
          misconception: {
            id: "arithmetic-bm-treated-as-equally-valid",
            description:
              "Misses that ordinary Brownian motion on the raw price allows the modeled price to go negative, which is nonsensical for a stock, motivating the switch to geometric Brownian motion.",
            blameConceptId: "geometric-brownian-motion",
          },
        },
        {
          id: "proportional-moves",
          description:
            "Notes that GBM implies price changes scale with the current price level (a $100 stock moves in bigger dollar increments than a $10 stock for the same percentage volatility), matching how real returns are usually thought about.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.4,
    discrimination: 1.7,
    expectedSeconds: 190,
    prereqClosure: ["option-pricing-and-greeks", "geometric-brownian-motion"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "option-pricing-and-greeks--explain-implied-volatility-concept",
    conceptId: "option-pricing-and-greeks",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain what 'implied volatility' is, and how it differs from historical (realized) volatility computed " +
      "from a stock's past price data.",
    rubric: {
      elements: [
        {
          id: "implied-vol-backed-out",
          description:
            "Explains that implied volatility is the volatility input that, when plugged into an option pricing model like Black-Scholes-Merton, makes the model's price match the option's actual observed market price — it is backed out from the market price rather than computed from past data.",
          weight: 3,
          required: true,
        },
        {
          id: "forward-looking-vs-backward-looking",
          description:
            "Contrasts this with historical volatility, which is measured directly from the stock's past price movements, making implied volatility a forward-looking, market-derived expectation rather than a backward-looking statistic.",
          weight: 3,
          required: true,
          misconception: {
            id: "implied-and-historical-vol-conflated",
            description:
              "Treats implied volatility as simply another way of computing historical volatility from past prices, missing that it is instead inferred from the current option's market price using the pricing model in reverse.",
            blameConceptId: "option-pricing-and-greeks",
          },
        },
      ],
    },
    difficulty: 1.2,
    discrimination: 1.6,
    expectedSeconds: 180,
    prereqClosure: ["option-pricing-and-greeks", "black-scholes-merton-equation"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "option-pricing-and-greeks--transfer-delta-as-hedge-ratio-and-probability",
    conceptId: "option-pricing-and-greeks",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Delta is often loosely described both as 'the hedge ratio' (shares of stock needed to offset one " +
      "option's price sensitivity) and, informally, as 'roughly the probability the option finishes in the " +
      "money.' Explain why these are two different-sounding descriptions of related, but not identical, ideas, " +
      "and why practitioners find the hedge-ratio interpretation the more rigorous of the two.",
    rubric: {
      elements: [
        {
          id: "hedge-ratio-is-exact",
          description:
            "Explains that the hedge-ratio interpretation is mathematically exact by construction: delta is literally the partial derivative of the option price with respect to the underlying's price, which is exactly the number of shares needed to offset a small move.",
          weight: 3,
          required: true,
        },
        {
          id: "probability-interpretation-is-approximate",
          description:
            "Explains that the 'probability of finishing in the money' interpretation is only an approximation (and, under risk-neutral valuation, closer to a risk-neutral probability than a real-world one), making it a useful intuition rather than a precise statement.",
          weight: 3,
          required: true,
          misconception: {
            id: "delta-treated-as-exact-real-world-probability",
            description:
              "Treats delta as literally equal to the real-world probability of finishing in the money, missing that this is only a loose intuition and that delta's precise meaning is a price sensitivity (hedge ratio).",
            blameConceptId: "option-pricing-and-greeks",
          },
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.7,
    expectedSeconds: 210,
    prereqClosure: ["option-pricing-and-greeks", "black-scholes-merton-equation"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "option-pricing-and-greeks--transfer-greeks-portfolio-aggregation",
    conceptId: "option-pricing-and-greeks",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A trading desk holds many different option positions on the same underlying stock. Explain why the " +
      "desk's total delta (and total gamma, vega, and so on) can be computed simply by summing each position's " +
      "individual Greek, and why this additivity is operationally useful for risk management.",
    rubric: {
      elements: [
        {
          id: "greeks-are-derivatives-and-linear",
          description:
            "Explains that each Greek is a partial derivative of price with respect to one input, and because differentiation is linear, the derivative of a sum (the desk's total portfolio value) equals the sum of the derivatives of each position — so Greeks simply add across positions on the same underlying.",
          weight: 3,
          required: true,
        },
        {
          id: "operational-usefulness",
          description:
            "Explains that this lets the desk track and hedge one net exposure figure per Greek instead of managing every position separately, making it practical to hedge a large, diverse book with a single offsetting trade.",
          weight: 3,
          required: true,
          misconception: {
            id: "greeks-assumed-nonadditive",
            description:
              "Assumes each position's Greek must be tracked and hedged in isolation, missing that linearity of differentiation lets a desk manage one aggregated net exposure per Greek.",
            blameConceptId: "option-pricing-and-greeks",
          },
        },
      ],
    },
    difficulty: 1.7,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["option-pricing-and-greeks"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "option-pricing-and-greeks--transfer-theta-gamma-tradeoff",
    conceptId: "option-pricing-and-greeks",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Long options generally have negative theta (they decay over time) and positive gamma (their delta grows " +
      "favorably as the underlying moves). Explain the intuitive tradeoff this represents for an option buyer: " +
      "what is being 'paid for' with the negative theta, and what is being 'purchased' with it?",
    rubric: {
      elements: [
        {
          id: "theta-is-cost-of-gamma",
          description:
            "Explains that negative theta is effectively the cost of holding positive gamma: the option loses a little value every day that the underlying does not move, and that steady decay is the price paid for the potential to benefit disproportionately if the underlying does move sharply.",
          weight: 4,
          required: true,
        },
        {
          id: "connects-to-convexity",
          description:
            "Connects this to the option's convex payoff shape: positive gamma means gains from favorable moves accelerate while losses from adverse moves are capped, and time decay is the ongoing charge for holding that convexity.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.1,
    discrimination: 1.7,
    expectedSeconds: 210,
    prereqClosure: ["option-pricing-and-greeks", "option-payoff-and-put-call-parity"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "option-pricing-and-greeks--derivation-net-delta-hedge-portfolio",
    conceptId: "option-pricing-and-greeks",
    format: "derivation",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A trader is short 30 call contracts (delta 0.5 each) and long 10 put contracts (delta −0.3 each), each " +
      "contract covering 100 shares of the same underlying stock. Derive the trader's total position delta (in " +
      "shares of stock-equivalent exposure), and state how many shares of stock the trader must buy or sell to " +
      "become delta-neutral.",
    rubric: {
      elements: [
        {
          id: "computes-call-leg-delta",
          description:
            "Computes the delta contribution from the short calls as −(30 × 100 × 0.5) = −1,500 shares of exposure (negative because the trader is short the calls).",
          weight: 3,
          required: true,
        },
        {
          id: "computes-put-leg-delta",
          description:
            "Computes the delta contribution from the long puts as 10 × 100 × (−0.3) = −300 shares of exposure.",
          weight: 3,
          required: true,
        },
        {
          id: "combines-and-hedges",
          description:
            "Sums the two contributions to a total position delta of −1,800, and concludes the trader must buy 1,800 shares of the underlying stock to bring the net delta to zero.",
          weight: 3,
          required: true,
          misconception: {
            id: "hedge-direction-reversed",
            description:
              "Buys or sells the wrong number of shares, or in the wrong direction, to offset the computed net delta.",
            blameConceptId: "option-pricing-and-greeks",
          },
        },
      ],
    },
    difficulty: 1.5,
    discrimination: 1.7,
    expectedSeconds: 220,
    prereqClosure: ["option-pricing-and-greeks", "options-calls-and-puts"],
    source: AUTHORED,
    status: "live",
  },
];
