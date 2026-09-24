import type { Item, SourceRef } from "../../lib/assessment/types";

/**
 * Seed bank for three "financial instruments" concepts that previously had
 * zero items: `equities-and-stock-markets`, `etfs-and-index-funds`, and
 * `mutual-funds-and-nav`. Twenty items per concept, spanning all four
 * cognitive levels and a mix of formats (mcq, multi-select, numeric,
 * short-answer, derivation).
 *
 * Every numeric `answerKey` below was recomputed by hand from the stem's
 * stated figures. `prereqClosure` is restricted, per concept, to that
 * concept's id plus its allowed ancestors in the prerequisite graph:
 *   - equities-and-stock-markets: [equities-and-stock-markets, time-value-of-money]
 *   - etfs-and-index-funds: [etfs-and-index-funds, equities-and-stock-markets, time-value-of-money]
 *   - mutual-funds-and-nav: [mutual-funds-and-nav, etfs-and-index-funds, equities-and-stock-markets, time-value-of-money]
 */

const AUTHORED: SourceRef = {
  id: "mathlingo-authored-equities-funds",
  tier: "generated",
  title: "Mathlingo authored item (equities and funds)",
};

export const financialEquitiesFundsItems: Item[] = [
  // ===========================================================================
  // --- Equities and Stock Markets -------------------------------------------
  // ===========================================================================

  // -- recall (6) --
  {
    id: "equities-and-stock-markets--recall-residual-claim",
    conceptId: "equities-and-stock-markets",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What does owning a share of common stock entitle a shareholder to?",
    choices: [
      {
        id: "a",
        text: "A residual claim on the firm's assets and earnings, paid only after all other claims — including bondholders — are satisfied",
        correct: true,
      },
      {
        id: "b",
        text: "A fixed, guaranteed dividend payment every quarter",
        correct: false,
        misconception: {
          id: "equity-dividend-guaranteed",
          description:
            "Treats a dividend as a contractual guarantee like a bond coupon. Dividends are declared at the board's discretion and can be cut or skipped entirely.",
          blameConceptId: "equities-and-stock-markets",
        },
      },
      {
        id: "c",
        text: "A promise that the invested principal will be returned on a set maturity date",
        correct: false,
        misconception: {
          id: "equity-treated-as-bond",
          description:
            "Imports bond features — a maturity date and a promised repayment of principal — onto equity, which has neither.",
          blameConceptId: "equities-and-stock-markets",
        },
      },
      {
        id: "d",
        text: "Priority over bondholders in a bankruptcy liquidation",
        correct: false,
        misconception: {
          id: "equity-priority-reversed",
          description:
            "Reverses the seniority order. Equity is junior to debt; bondholders are paid first out of whatever remains.",
          blameConceptId: "equities-and-stock-markets",
        },
      },
    ],
    difficulty: -1.5,
    discrimination: 1.1,
    expectedSeconds: 30,
    prereqClosure: ["equities-and-stock-markets"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "equities-and-stock-markets--recall-limited-liability",
    conceptId: "equities-and-stock-markets",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "A shareholder's liability for a corporation's debts is limited to:",
    choices: [
      { id: "a", text: "The amount they paid for their shares", correct: true },
      {
        id: "b",
        text: "The amount they paid for their shares, plus a pro-rata share of any unpaid corporate debt",
        correct: false,
        misconception: {
          id: "equity-liability-unlimited",
          description:
            "Overstates liability beyond the invested capital, contradicting the whole point of limited liability.",
          blameConceptId: "equities-and-stock-markets",
        },
      },
      {
        id: "c",
        text: "Nothing — shareholders can never lose their investment",
        correct: false,
        misconception: {
          id: "equity-treated-as-riskless",
          description:
            "Equity value can fall all the way to zero. Limited liability caps the loss at the amount invested, not at zero.",
          blameConceptId: "equities-and-stock-markets",
        },
      },
      {
        id: "d",
        text: "Whatever a court decides is fair, on a case-by-case basis",
        correct: false,
        misconception: {
          id: "equity-liability-arbitrary",
          description: "Limited liability is a fixed legal cap on losses, not a discretionary judgment call.",
          blameConceptId: "equities-and-stock-markets",
        },
      },
    ],
    difficulty: -1.3,
    discrimination: 1.1,
    expectedSeconds: 30,
    prereqClosure: ["equities-and-stock-markets"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "equities-and-stock-markets--recall-market-cap-definition",
    conceptId: "equities-and-stock-markets",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "A company's market capitalization is defined as:",
    choices: [
      { id: "a", text: "Shares outstanding multiplied by the current share price", correct: true },
      {
        id: "b",
        text: "Total assets on the balance sheet",
        correct: false,
        misconception: {
          id: "market-cap-as-book-assets",
          description:
            "Confuses the market value of equity with the book value of assets, which also reflects liabilities and accounting conventions.",
          blameConceptId: "equities-and-stock-markets",
        },
      },
      {
        id: "c",
        text: "Annual revenue multiplied by shares outstanding",
        correct: false,
        misconception: {
          id: "market-cap-as-revenue-times-shares",
          description: "Mixes in an income-statement figure that has no direct relationship to per-share price.",
          blameConceptId: "equities-and-stock-markets",
        },
      },
      {
        id: "d",
        text: "The price of a single share, on its own",
        correct: false,
        misconception: {
          id: "market-cap-as-share-price-only",
          description: "Ignores the number of shares outstanding, so it cannot compare firms of different sizes.",
          blameConceptId: "equities-and-stock-markets",
        },
      },
    ],
    difficulty: -1.4,
    discrimination: 1.1,
    expectedSeconds: 30,
    prereqClosure: ["equities-and-stock-markets"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "equities-and-stock-markets--recall-shareholder-rights",
    conceptId: "equities-and-stock-markets",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which statements about common shareholders are true? Select all that apply.",
    choices: [
      { id: "a", text: "They typically have the right to vote on major corporate matters, such as electing the board", correct: true },
      { id: "b", text: "They hold a residual claim on the firm's assets and earnings, after creditors are paid", correct: true },
      { id: "c", text: "Any dividend they receive is at the board's discretion, not a contractual obligation", correct: true },
      {
        id: "d",
        text: "They are guaranteed a dividend payment once per quarter",
        correct: false,
        misconception: {
          id: "shareholder-dividend-guaranteed",
          description: "Dividends are declared at the board's discretion and are never contractually guaranteed.",
          blameConceptId: "equities-and-stock-markets",
        },
      },
      {
        id: "e",
        text: "They rank ahead of bondholders if the firm is liquidated",
        correct: false,
        misconception: {
          id: "shareholder-priority-over-debt",
          description: "Reverses the seniority order: equity is paid only after bondholders and other creditors.",
          blameConceptId: "equities-and-stock-markets",
        },
      },
    ],
    difficulty: -1.1,
    discrimination: 1.2,
    expectedSeconds: 55,
    prereqClosure: ["equities-and-stock-markets"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "equities-and-stock-markets--recall-primary-vs-secondary",
    conceptId: "equities-and-stock-markets",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which statements about primary and secondary equity markets are true? Select all that apply.",
    choices: [
      { id: "a", text: "An IPO is a primary-market transaction, in which the company itself receives the proceeds", correct: true },
      { id: "b", text: "Trades on an exchange like the NYSE, after the IPO, are secondary-market transactions", correct: true },
      { id: "c", text: "Secondary-market trading sets the price at which any future primary offering would be priced", correct: true },
      {
        id: "d",
        text: "The company receives cash proceeds every time its stock changes hands on the secondary market",
        correct: false,
        misconception: {
          id: "secondary-trade-funds-company",
          description:
            "Secondary trades exchange existing shares between investors; the issuing firm receives no cash from them.",
          blameConceptId: "equities-and-stock-markets",
        },
      },
      {
        id: "e",
        text: "A company must approve each secondary-market trade of its own stock",
        correct: false,
        misconception: {
          id: "company-approves-secondary-trades",
          description: "Secondary trading happens between investors on an exchange, with no per-trade issuer approval.",
          blameConceptId: "equities-and-stock-markets",
        },
      },
    ],
    difficulty: -0.9,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["equities-and-stock-markets"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "equities-and-stock-markets--recall-dividend-vs-capital-gain",
    conceptId: "equities-and-stock-markets",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem:
      "Name the two components of the total return an investor earns from holding a stock over some period, " +
      "and say what each one measures.",
    rubric: {
      elements: [
        {
          id: "dividend-income",
          description: "Names dividend income — cash distributions paid to shareholders out of earnings, at the board's discretion.",
          weight: 2,
          required: true,
        },
        {
          id: "capital-gain",
          description: "Names the capital gain or loss — the change in the share price from purchase to sale (or to a valuation date).",
          weight: 2,
          required: true,
        },
        {
          id: "sums-to-total",
          description: "States that total return combines both: dividends received plus the price change, relative to the initial price.",
          weight: 1,
        },
      ],
    },
    difficulty: -0.8,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["equities-and-stock-markets"],
    source: AUTHORED,
    status: "live",
  },

  // -- apply (6) --
  {
    id: "equities-and-stock-markets--apply-market-cap",
    conceptId: "equities-and-stock-markets",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A company has 50 million shares outstanding, trading at $20 per share. What is its market capitalization, " +
      "in millions of dollars?",
    answerKey: 1000,
    tolerance: 5,
    difficulty: -0.5,
    discrimination: 1.3,
    expectedSeconds: 60,
    prereqClosure: ["equities-and-stock-markets"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "equities-and-stock-markets--apply-dividend-yield",
    conceptId: "equities-and-stock-markets",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "A stock pays an annual dividend of $2.00 per share and trades at $40 per share. What is its dividend yield, " +
      "as a percent? Give a decimal to one place.",
    answerKey: 5.0,
    tolerance: 0.1,
    difficulty: -0.4,
    discrimination: 1.3,
    expectedSeconds: 60,
    prereqClosure: ["equities-and-stock-markets"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "equities-and-stock-markets--apply-pe-implied-price",
    conceptId: "equities-and-stock-markets",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A company has earnings per share of $4.00 and trades at a price-to-earnings ratio of 15. What is its share " +
      "price? Give a whole number of dollars.",
    answerKey: 60,
    tolerance: 0.5,
    difficulty: -0.2,
    discrimination: 1.3,
    expectedSeconds: 75,
    prereqClosure: ["equities-and-stock-markets"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "equities-and-stock-markets--apply-price-weighted-index",
    conceptId: "equities-and-stock-markets",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A price-weighted index tracks two stocks priced at $50 and $150, with a divisor of 2. What is the index " +
      "level?",
    answerKey: 100,
    tolerance: 0.5,
    difficulty: 0.0,
    discrimination: 1.3,
    expectedSeconds: 75,
    prereqClosure: ["equities-and-stock-markets"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "equities-and-stock-markets--apply-cap-weight",
    conceptId: "equities-and-stock-markets",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "In a market-cap-weighted index with total constituent market cap of $2 billion, one stock has a market cap " +
      "of $400 million. What weight, in percent, does that stock have in the index?",
    answerKey: 20,
    tolerance: 0.5,
    difficulty: -0.1,
    discrimination: 1.3,
    expectedSeconds: 75,
    prereqClosure: ["equities-and-stock-markets"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "equities-and-stock-markets--apply-stock-split",
    conceptId: "equities-and-stock-markets",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "A company does a 2-for-1 stock split: shares outstanding rise from 10 million to 20 million and the price " +
      "falls from $100 to $50 per share. What happens to its market capitalization?",
    choices: [
      { id: "a", text: "It is unchanged, at $1 billion before and after", correct: true },
      {
        id: "b",
        text: "It doubles, to $2 billion",
        correct: false,
        misconception: {
          id: "split-doubles-market-cap",
          description: "Counts the doubled share count without noticing the price halved to exactly offset it.",
          blameConceptId: "equities-and-stock-markets",
        },
      },
      {
        id: "c",
        text: "It is cut in half, to $500 million",
        correct: false,
        misconception: {
          id: "split-halves-market-cap",
          description: "Applies only the price drop and ignores that the share count doubled to compensate.",
          blameConceptId: "equities-and-stock-markets",
        },
      },
      {
        id: "d",
        text: "It cannot be determined without knowing the company's earnings",
        correct: false,
        misconception: {
          id: "split-needs-earnings",
          description: "Market cap is fully determined by price times shares outstanding; no earnings figure is needed.",
          blameConceptId: "equities-and-stock-markets",
        },
      },
    ],
    difficulty: 0.1,
    discrimination: 1.4,
    expectedSeconds: 70,
    prereqClosure: ["equities-and-stock-markets"],
    source: AUTHORED,
    status: "live",
  },

  // -- explain (5) --
  {
    id: "equities-and-stock-markets--explain-residual-claim-risk",
    conceptId: "equities-and-stock-markets",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "A firm has both bonds and common stock outstanding. Explain why the stock is inherently riskier than the " +
      "bonds, even though both are claims on the same firm.",
    rubric: {
      elements: [
        {
          id: "residual-position",
          description: "States that equity is a residual claim, paid only after bondholders and other creditors are satisfied in full.",
          weight: 3,
          required: true,
          misconception: {
            id: "equity-treated-as-equal-seniority",
            description: "Treats bond and stock claims as equally senior, missing that equity absorbs losses first.",
            blameConceptId: "equities-and-stock-markets",
          },
        },
        {
          id: "no-fixed-payment",
          description: "Notes that bond coupons and principal are contractual, fixed obligations, while dividends are discretionary and can be cut or omitted.",
          weight: 3,
          required: true,
        },
        {
          id: "upside-tradeoff",
          description: "Notes the compensating factor: equity has unlimited upside, while a bond's return is capped at its promised cash flows.",
          weight: 1,
        },
      ],
    },
    difficulty: 0.0,
    discrimination: 1.4,
    expectedSeconds: 150,
    prereqClosure: ["equities-and-stock-markets"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "equities-and-stock-markets--explain-price-reaction-to-earnings",
    conceptId: "equities-and-stock-markets",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "A company reports a genuine profit for the quarter, yet its stock price falls sharply on the announcement. " +
      "Explain how this is consistent with rational pricing.",
    rubric: {
      elements: [
        {
          id: "priced-in-expectations",
          description:
            "Explains that the price already reflected expected earnings, so the price moves on the surprise — actual relative to what was expected — not on the sign of the reported number.",
          weight: 3,
          required: true,
          misconception: {
            id: "profit-must-raise-price",
            description: "Assumes any positive profit should raise the price, ignoring that price reflects expectations already built in.",
            blameConceptId: "equities-and-stock-markets",
          },
        },
        {
          id: "forward-looking",
          description:
            "Notes that price reflects the present value of expected future cash flows, so guidance or outlook accompanying the report can move the price more than the reported quarter itself.",
          weight: 3,
          required: true,
        },
        {
          id: "example",
          description: "Gives or implies a concrete case, such as an earnings beat accompanied by cut guidance or a revenue beat with missed margins.",
          weight: 1,
        },
      ],
    },
    difficulty: 0.3,
    discrimination: 1.5,
    expectedSeconds: 150,
    prereqClosure: ["equities-and-stock-markets"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "equities-and-stock-markets--explain-limited-liability-rationale",
    conceptId: "equities-and-stock-markets",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain why limited liability for shareholders is considered important for encouraging investment in the " +
      "stock market, and what it would mean for investors if it did not exist.",
    rubric: {
      elements: [
        {
          id: "caps-downside",
          description: "States that limited liability caps an investor's maximum loss at the amount invested, regardless of how large the firm's debts become.",
          weight: 3,
          required: true,
        },
        {
          id: "enables-participation",
          description:
            "Explains that this cap lets investors take a stake in a risky enterprise without exposing their entire personal wealth, making outside investment in risky ventures feasible at scale.",
          weight: 3,
          required: true,
          misconception: {
            id: "no-limited-liability-still-safe",
            description: "Fails to see that, without limited liability, a shareholder's other assets could be at risk if the firm's debts exceeded its assets.",
            blameConceptId: "equities-and-stock-markets",
          },
        },
        {
          id: "diversification-consequence",
          description: "Notes that limited liability also makes it reasonable to hold small stakes in many different companies, since a single failure can cost at most that stake.",
          weight: 1,
        },
      ],
    },
    difficulty: 0.4,
    discrimination: 1.4,
    expectedSeconds: 150,
    prereqClosure: ["equities-and-stock-markets"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "equities-and-stock-markets--explain-dual-class-shares",
    conceptId: "equities-and-stock-markets",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Some companies issue two classes of common stock — one with ten votes per share for founders and one with " +
      "one vote per share for public investors — while both classes have equal claims on dividends. Explain what " +
      "this structure achieves and what it costs public shareholders.",
    rubric: {
      elements: [
        {
          id: "control-retained",
          description: "Explains that the structure lets founders retain voting control of the company while still raising capital by selling shares with weaker or no voting rights.",
          weight: 3,
          required: true,
        },
        {
          id: "economic-rights-unaffected",
          description: "Notes that both classes typically have the same claim on dividends and residual assets — only voting power differs.",
          weight: 2,
          required: true,
          misconception: {
            id: "share-class-affects-cash-flow-rights",
            description: "Assumes the lower-vote class also receives a smaller share of dividends or liquidation proceeds, when only voting power typically differs.",
            blameConceptId: "equities-and-stock-markets",
          },
        },
        {
          id: "governance-cost",
          description: "States the cost to public shareholders: reduced ability to influence or discipline management through voting, even while bearing the same economic risk.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.6,
    discrimination: 1.5,
    expectedSeconds: 180,
    prereqClosure: ["equities-and-stock-markets"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "equities-and-stock-markets--explain-derive-index-return-as-weighted-average",
    conceptId: "equities-and-stock-markets",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "A market-cap-weighted index holds two stocks, A and B, with market caps V_A and V_B out of total index " +
      "value V = V_A + V_B. Let R_A and R_B be their returns over a period. Derive the index's return in terms " +
      "of the weights w_A = V_A/V and w_B = V_B/V, starting from the definition of the index's total value " +
      "before and after the period.",
    rubric: {
      elements: [
        {
          id: "values-after",
          description: "Writes each stock's ending value as its starting value times (1 + its return): V_A(1+R_A) and V_B(1+R_B).",
          weight: 3,
          required: true,
        },
        {
          id: "index-return-definition",
          description: "Writes the index return as (ending total value − starting total value) / starting total value = [V_A(1+R_A) + V_B(1+R_B) − (V_A+V_B)] / V.",
          weight: 3,
          required: true,
          misconception: {
            id: "index-return-averaged-unweighted",
            description: "Averages R_A and R_B directly (unweighted), ignoring that a cap-weighted index return is a value-weighted average.",
            blameConceptId: "equities-and-stock-markets",
          },
        },
        {
          id: "simplifies-to-weighted-average",
          description: "Simplifies the numerator to V_A R_A + V_B R_B and divides by V to get w_A R_A + w_B R_B, the weighted average of the constituent returns.",
          weight: 2,
          required: true,
        },
        {
          id: "generalizes",
          description: "Notes the result generalizes to any number of constituents: the index return is always the market-cap-weighted average of the constituents' returns.",
          weight: 1,
        },
      ],
    },
    difficulty: 1.3,
    discrimination: 1.6,
    expectedSeconds: 240,
    prereqClosure: ["equities-and-stock-markets"],
    source: AUTHORED,
    status: "live",
  },

  // -- transfer (3) --
  {
    id: "equities-and-stock-markets--transfer-price-as-pv-of-dividends",
    conceptId: "equities-and-stock-markets",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Using the idea that money today is worth more than money in the future, explain why a stock's price can " +
      "be thought of as the present value of all the dividends it is expected to pay, discounted at some " +
      "required rate of return.",
    rubric: {
      elements: [
        {
          id: "cash-flows-to-owner",
          description: "Identifies dividends (and eventually the sale price, itself the present value of later dividends) as the cash flows an equity owner actually receives.",
          weight: 3,
          required: true,
        },
        {
          id: "discounting-applies",
          description: "Applies the time-value-of-money principle that a future dollar must be discounted back to be compared to a present price, exactly as with a bond's coupons.",
          weight: 3,
          required: true,
          misconception: {
            id: "stock-price-arbitrary",
            description: "Treats the stock price as set by sentiment alone with no link to discounted future cash flows, missing the discounting logic used for any asset.",
            blameConceptId: "time-value-of-money",
          },
        },
        {
          id: "uncertainty-in-cash-flows",
          description: "Notes the key difference from a bond: the dividends are uncertain and can grow, unlike a bond's fixed promised coupons, so both the required rate and a growth assumption matter.",
          weight: 1,
        },
      ],
    },
    difficulty: 1.0,
    discrimination: 1.5,
    expectedSeconds: 180,
    prereqClosure: ["equities-and-stock-markets", "time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "equities-and-stock-markets--transfer-required-return-and-discount-rate",
    conceptId: "equities-and-stock-markets",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Two investors value the same stock's expected future dividends identically but use different required " +
      "rates of return: one uses 6%, the other 10%. Explain which investor computes the higher present value, " +
      "and connect this to the general relationship between discount rates and present value.",
    rubric: {
      elements: [
        {
          id: "lower-rate-higher-value",
          description: "Correctly identifies the 6% investor as computing the higher present value.",
          weight: 2,
          required: true,
          misconception: {
            id: "higher-rate-higher-value",
            description: "Reverses the relationship, believing a higher discount rate produces a higher present value.",
            blameConceptId: "time-value-of-money",
          },
        },
        {
          id: "general-relationship",
          description: "States the general time-value-of-money relationship: present value of a future cash flow is a decreasing function of the discount rate, since a higher rate divides the future amount by more.",
          weight: 3,
          required: true,
        },
        {
          id: "required-return-interpretation",
          description: "Connects the discount rate here to required return: it reflects the risk and opportunity cost the investor demands, so the more demanding investor pays less today for the same expected dividends.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.9,
    discrimination: 1.5,
    expectedSeconds: 180,
    prereqClosure: ["equities-and-stock-markets", "time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "equities-and-stock-markets--transfer-derive-two-period-price",
    conceptId: "equities-and-stock-markets",
    format: "derivation",
    cognitive: "transfer",
    channels: ["typed", "handwritten"],
    stem:
      "An investor plans to hold a stock for one year, collect a dividend D₁ at the end of the year, and sell it " +
      "for price P₁. The required annual return is r. Derive an expression for the price today, P₀, and show " +
      "that it is exactly the present-value logic used for any cash flow under the time value of money.",
    rubric: {
      elements: [
        {
          id: "identifies-cash-flows",
          description: "Identifies the two cash flows the investor receives at the end of year one: the dividend D₁ and the sale proceeds P₁.",
          weight: 2,
          required: true,
        },
        {
          id: "discounts-each",
          description: "Discounts the combined end-of-year amount by (1+r), writing P₀ = (D₁ + P₁) / (1 + r).",
          weight: 3,
          required: true,
          misconception: {
            id: "no-discounting-applied",
            description: "Sets P₀ equal to D₁ + P₁ with no discounting, ignoring that those amounts arrive a year in the future.",
            blameConceptId: "time-value-of-money",
          },
        },
        {
          id: "recognizes-recursive-structure",
          description: "Notes that P₁ is itself the present value, as of year one, of that stock's later dividends and eventual sale price, so the formula recurses into a dividend-discount model as the holding period is extended.",
          weight: 2,
          required: true,
        },
        {
          id: "links-to-tvm",
          description: "States explicitly that this is the same single-cash-flow discounting formula PV = FV/(1+r) from the time value of money, applied to a bundle of two future amounts.",
          weight: 1,
        },
      ],
    },
    difficulty: 1.6,
    discrimination: 1.7,
    expectedSeconds: 240,
    prereqClosure: ["equities-and-stock-markets", "time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },

  // ===========================================================================
  // --- ETFs and Index Funds --------------------------------------------------
  // ===========================================================================

  // -- recall (6) --
  {
    id: "etfs-and-index-funds--recall-definition",
    conceptId: "etfs-and-index-funds",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What best describes an ETF (exchange-traded fund)?",
    choices: [
      {
        id: "a",
        text: "A pooled investment vehicle holding a basket of securities that trades on an exchange throughout the day, like a stock",
        correct: true,
      },
      {
        id: "b",
        text: "A fund that can only be bought or sold once per day, at its net asset value",
        correct: false,
        misconception: {
          id: "etf-confused-with-traditional-index-fund",
          description: "Describes the once-daily forward-pricing of a traditional index mutual fund, not an ETF, which trades continuously at a market-quoted price.",
          blameConceptId: "etfs-and-index-funds",
        },
      },
      {
        id: "c",
        text: "A single company's stock, repackaged under a new ticker symbol",
        correct: false,
        misconception: {
          id: "etf-as-single-stock",
          description: "Misses that an ETF holds a basket of many underlying securities, not one company's shares.",
          blameConceptId: "etfs-and-index-funds",
        },
      },
      {
        id: "d",
        text: "A loan made directly to the issuer of the index it tracks",
        correct: false,
        misconception: {
          id: "etf-as-loan",
          description: "Confuses an equity-like fund with a debt instrument; an ETF holds ownership stakes, not a loan to any single issuer.",
          blameConceptId: "etfs-and-index-funds",
        },
      },
    ],
    difficulty: -1.5,
    discrimination: 1.1,
    expectedSeconds: 30,
    prereqClosure: ["etfs-and-index-funds"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "etfs-and-index-funds--recall-nav-once-daily",
    conceptId: "etfs-and-index-funds",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "A traditional (non-ETF) index mutual fund is priced:",
    choices: [
      { id: "a", text: "Once per day, at its net asset value calculated after the market closes", correct: true },
      {
        id: "b",
        text: "Continuously throughout the trading day, like a stock",
        correct: false,
        misconception: {
          id: "index-fund-confused-with-etf",
          description: "Attributes intraday market pricing to a traditional index fund; that is the ETF's structural feature, not the mutual fund's.",
          blameConceptId: "etfs-and-index-funds",
        },
      },
      {
        id: "c",
        text: "Whenever the fund manager decides to reprice it",
        correct: false,
        misconception: {
          id: "index-fund-pricing-discretionary",
          description: "Treats NAV pricing as a discretionary choice rather than a mechanical daily calculation from portfolio value.",
          blameConceptId: "etfs-and-index-funds",
        },
      },
      {
        id: "d",
        text: "Only weekly, on Fridays",
        correct: false,
        misconception: {
          id: "index-fund-priced-weekly",
          description: "NAV is calculated every trading day the fund is open, not on a weekly schedule.",
          blameConceptId: "etfs-and-index-funds",
        },
      },
    ],
    difficulty: -1.3,
    discrimination: 1.1,
    expectedSeconds: 30,
    prereqClosure: ["etfs-and-index-funds"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "etfs-and-index-funds--recall-tracking-purpose",
    conceptId: "etfs-and-index-funds",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "What is the primary goal of an index fund or index ETF's manager?",
    choices: [
      { id: "a", text: "To replicate the performance of a specified index as closely as possible, not to beat it", correct: true },
      {
        id: "b",
        text: "To pick the best-performing stocks within the index",
        correct: false,
        misconception: {
          id: "index-fund-picks-winners",
          description: "Describes active stock-picking. An index fund's mandate is passive replication, not selection.",
          blameConceptId: "etfs-and-index-funds",
        },
      },
      {
        id: "c",
        text: "To trade actively so as to outperform the index",
        correct: false,
        misconception: {
          id: "index-fund-tries-to-beat-index",
          description: "Contradicts the passive mandate: an index fund's benchmark is the index itself, not beating it.",
          blameConceptId: "etfs-and-index-funds",
        },
      },
      {
        id: "d",
        text: "To guarantee a fixed return regardless of how the index performs",
        correct: false,
        misconception: {
          id: "index-fund-guarantees-return",
          description: "An index fund's return tracks the index and is not guaranteed or fixed in any way.",
          blameConceptId: "etfs-and-index-funds",
        },
      },
    ],
    difficulty: -1.2,
    discrimination: 1.1,
    expectedSeconds: 35,
    prereqClosure: ["etfs-and-index-funds"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "etfs-and-index-funds--recall-etf-vs-index-fund-differences",
    conceptId: "etfs-and-index-funds",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which statements correctly distinguish ETFs from traditional index mutual funds? Select all that apply.",
    choices: [
      { id: "a", text: "ETFs trade intraday at market prices that can vary from NAV", correct: true },
      { id: "b", text: "Traditional index funds transact once daily, at NAV", correct: true },
      { id: "c", text: "Both aim to passively track a specified index", correct: true },
      {
        id: "d",
        text: "ETFs are only allowed to hold bonds, not stocks",
        correct: false,
        misconception: {
          id: "etf-restricted-to-bonds",
          description: "ETFs exist across essentially every asset class, including broad stock-market indexes, not only bonds.",
          blameConceptId: "etfs-and-index-funds",
        },
      },
      {
        id: "e",
        text: "A traditional index fund's price changes continuously during market hours",
        correct: false,
        misconception: {
          id: "index-fund-priced-intraday",
          description: "Traditional index funds use forward pricing: a single NAV computed after the close, not a continuously updating price.",
          blameConceptId: "etfs-and-index-funds",
        },
      },
    ],
    difficulty: -0.9,
    discrimination: 1.3,
    expectedSeconds: 60,
    prereqClosure: ["etfs-and-index-funds"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "etfs-and-index-funds--recall-expense-ratio",
    conceptId: "etfs-and-index-funds",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which statements about a fund's expense ratio are true? Select all that apply.",
    choices: [
      { id: "a", text: "It is an ongoing annual fee, expressed as a percent of assets under management", correct: true },
      { id: "b", text: "All else equal, a lower expense ratio leaves the investor with more of the index's return over time", correct: true },
      { id: "c", text: "It is deducted continuously from the fund's assets rather than billed as a separate invoice in most cases", correct: true },
      {
        id: "d",
        text: "It is identical across every provider that tracks the same index",
        correct: false,
        misconception: {
          id: "expense-ratios-uniform",
          description: "Providers compete on price, so expense ratios for funds tracking the same index can differ meaningfully.",
          blameConceptId: "etfs-and-index-funds",
        },
      },
      {
        id: "e",
        text: "Actively managed funds typically charge lower expense ratios than passive index funds",
        correct: false,
        misconception: {
          id: "active-funds-cheaper",
          description: "Reverses the typical pattern: active management usually costs more, due to research and higher trading costs.",
          blameConceptId: "etfs-and-index-funds",
        },
      },
    ],
    difficulty: -0.7,
    discrimination: 1.3,
    expectedSeconds: 65,
    prereqClosure: ["etfs-and-index-funds"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "etfs-and-index-funds--recall-creation-redemption",
    conceptId: "etfs-and-index-funds",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem:
      "Briefly describe the creation/redemption mechanism that lets authorized participants create or redeem ETF " +
      "shares, and why this mechanism helps keep an ETF's market price close to its NAV.",
    rubric: {
      elements: [
        {
          id: "ap-mechanism",
          description: "Describes an authorized participant assembling the underlying basket of securities and exchanging it, in-kind, for a large block of new ETF shares — or the reverse for redemption.",
          weight: 3,
          required: true,
        },
        {
          id: "arbitrage-effect",
          description: "Explains that when the ETF trades away from NAV, this creation/redemption arbitrage becomes profitable, and authorized participants trading on that gap push the market price back toward NAV.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: -0.4,
    discrimination: 1.2,
    expectedSeconds: 90,
    prereqClosure: ["etfs-and-index-funds"],
    source: AUTHORED,
    status: "live",
  },

  // -- apply (6) --
  {
    id: "etfs-and-index-funds--apply-expense-ratio-drag-20yr",
    conceptId: "etfs-and-index-funds",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "An ETF charges an expense ratio of 0.5% per year. Using the approximation that the fraction of terminal " +
      "value lost to fees after N years is 1 − (1 − 0.005)^N, what fraction of value is lost over 20 years? Give " +
      "a percent to one decimal.",
    answerKey: 9.5,
    tolerance: 0.3,
    difficulty: 0.6,
    discrimination: 1.4,
    expectedSeconds: 120,
    prereqClosure: ["etfs-and-index-funds"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "etfs-and-index-funds--apply-nav-basic",
    conceptId: "etfs-and-index-funds",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "An ETF holds a portfolio worth $500 million and has 10 million shares outstanding, with no liabilities. " +
      "What is its NAV per share, in dollars?",
    answerKey: 50,
    tolerance: 0.5,
    difficulty: -0.4,
    discrimination: 1.3,
    expectedSeconds: 60,
    prereqClosure: ["etfs-and-index-funds"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "etfs-and-index-funds--apply-premium-to-nav",
    conceptId: "etfs-and-index-funds",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "An ETF's NAV per share is $50, but it trades on the exchange at $50.75. What is its premium to NAV, as a " +
      "percent? Give a decimal to one place.",
    answerKey: 1.5,
    tolerance: 0.1,
    difficulty: 0.0,
    discrimination: 1.4,
    expectedSeconds: 75,
    prereqClosure: ["etfs-and-index-funds"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "etfs-and-index-funds--apply-tracking-error",
    conceptId: "etfs-and-index-funds",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "Over a year, an index ETF returns 9.8% while its benchmark index returns 10.0%. What is the tracking " +
      "error — the return shortfall — in percentage points? Give a decimal to one place.",
    answerKey: 0.2,
    tolerance: 0.05,
    difficulty: -0.1,
    discrimination: 1.3,
    expectedSeconds: 60,
    prereqClosure: ["etfs-and-index-funds"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "etfs-and-index-funds--apply-fee-comparison-dollars",
    conceptId: "etfs-and-index-funds",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "Fund A charges an expense ratio of 0.05%; Fund B, tracking the same index, charges 0.75%. On a $20,000 " +
      "investment, how many more dollars in annual fees does Fund B charge than Fund A?",
    answerKey: 140,
    tolerance: 2,
    difficulty: 0.1,
    discrimination: 1.4,
    expectedSeconds: 90,
    prereqClosure: ["etfs-and-index-funds"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "etfs-and-index-funds--apply-intraday-trading-scenario",
    conceptId: "etfs-and-index-funds",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "An investor wants to buy into an S&P 500 tracker at 11:00 am because they believe the market will rise " +
      "later that day. Which vehicle lets them lock in the price they see at that moment?",
    choices: [
      { id: "a", text: "An ETF, because it trades continuously on the exchange", correct: true },
      {
        id: "b",
        text: "A traditional index mutual fund, because it also updates its price every second",
        correct: false,
        misconception: {
          id: "index-fund-priced-every-second",
          description: "Traditional index funds use forward pricing at a single end-of-day NAV; they do not quote continuously updating prices.",
          blameConceptId: "etfs-and-index-funds",
        },
      },
      {
        id: "c",
        text: "Either works identically, since both settle at end-of-day NAV",
        correct: false,
        misconception: {
          id: "etf-and-index-fund-treated-as-identical-pricing",
          description: "Ignores the structural difference: an ETF trades at a live market price all day, while a mutual fund settles once, at day's-end NAV.",
          blameConceptId: "etfs-and-index-funds",
        },
      },
      {
        id: "d",
        text: "Neither — index funds and ETFs can only be traded after the market closes",
        correct: false,
        misconception: {
          id: "etf-trading-restricted-to-close",
          description: "ETFs trade throughout the regular session, exactly like a listed stock.",
          blameConceptId: "etfs-and-index-funds",
        },
      },
    ],
    difficulty: 0.2,
    discrimination: 1.4,
    expectedSeconds: 70,
    prereqClosure: ["etfs-and-index-funds"],
    source: AUTHORED,
    status: "live",
  },

  // -- explain (5) --
  {
    id: "etfs-and-index-funds--explain-intraday-vs-forward-pricing",
    conceptId: "etfs-and-index-funds",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain the structural reason an ETF can trade continuously all day while a traditional index mutual fund " +
      "cannot — and why forward pricing (settling orders at a NAV not yet known when the order is placed) " +
      "protects the mutual fund's existing shareholders.",
    rubric: {
      elements: [
        {
          id: "in-kind-mechanism",
          description: "Attributes the ETF's continuous trading to the in-kind creation/redemption mechanism and a live secondary market, unlike a mutual fund which only issues and redeems shares directly with the fund itself.",
          weight: 3,
          required: true,
        },
        {
          id: "forward-pricing-prevents-stale-price-arbitrage",
          description: "Explains that forward pricing prevents an investor from trading on already-known, stale information relative to that day's still-unpublished NAV — a form of arbitrage that would otherwise dilute existing shareholders.",
          weight: 3,
          required: true,
          misconception: {
            id: "same-day-known-price-assumed-safe",
            description: "Assumes trading at a known, already-published NAV would be harmless, missing that it invites arbitrage against the fund's remaining shareholders.",
            blameConceptId: "etfs-and-index-funds",
          },
        },
      ],
    },
    difficulty: 0.5,
    discrimination: 1.5,
    expectedSeconds: 180,
    prereqClosure: ["etfs-and-index-funds"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "etfs-and-index-funds--explain-passive-vs-active-cost-tradeoff",
    conceptId: "etfs-and-index-funds",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain why passive index funds and ETFs typically charge much lower fees than actively managed funds, " +
      "and what that fee gap implies for long-run net returns when both hold similar securities.",
    rubric: {
      elements: [
        {
          id: "cost-source",
          description: "Explains that active management incurs the cost of research, analyst staff, and more frequent trading to try to select winners, while a passive fund simply replicates a published index with minimal turnover.",
          weight: 3,
          required: true,
        },
        {
          id: "net-return-consequence",
          description: "Notes that if gross returns before fees are similar, the lower-fee vehicle keeps more of that return for the investor every single year, and the gap compounds.",
          weight: 3,
          required: true,
          misconception: {
            id: "fee-difference-treated-as-trivial",
            description: "Treats a fraction-of-a-percent fee gap as too small to matter, missing that it compounds every year the money stays invested.",
            blameConceptId: "etfs-and-index-funds",
          },
        },
      ],
    },
    difficulty: 0.2,
    discrimination: 1.4,
    expectedSeconds: 150,
    prereqClosure: ["etfs-and-index-funds"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "etfs-and-index-funds--explain-tracking-error-causes",
    conceptId: "etfs-and-index-funds",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "An index ETF's return slightly lags its benchmark index most years, even beyond what its expense ratio " +
      "alone would predict. Name at least two other sources of this tracking error.",
    rubric: {
      elements: [
        {
          id: "cash-drag",
          description: "Names cash drag: holding a small cash buffer for redemptions or dividend timing that is not fully invested and so does not track the index exactly.",
          weight: 2,
          required: true,
        },
        {
          id: "sampling",
          description: "Names sampling or optimization: holding a representative subset of a large index's securities instead of every single constituent, especially for very broad or illiquid indexes.",
          weight: 2,
          required: true,
        },
        {
          id: "trading-and-rebalancing-costs",
          description: "Names trading costs incurred when the index is reconstituted or rebalanced, which the fund must replicate by buying and selling.",
          weight: 2,
        },
        {
          id: "not-only-fee",
          description: "States explicitly that the expense ratio alone does not fully explain tracking error — these other frictions add to it.",
          weight: 1,
          required: true,
          misconception: {
            id: "tracking-error-equals-expense-ratio",
            description: "Assumes tracking error is entirely explained by the expense ratio, missing cash drag, sampling, and trading-cost effects.",
            blameConceptId: "etfs-and-index-funds",
          },
        },
      ],
    },
    difficulty: 0.7,
    discrimination: 1.5,
    expectedSeconds: 180,
    prereqClosure: ["etfs-and-index-funds"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "etfs-and-index-funds--explain-single-trade-diversification",
    conceptId: "etfs-and-index-funds",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain why buying one share of a broad market-index ETF gives an investor instant diversification across " +
      "many companies, and what risk still remains even after that diversification.",
    rubric: {
      elements: [
        {
          id: "basket-mechanism",
          description: "Explains that the ETF share represents a proportional claim on a basket of many underlying companies at once, so firm-specific bad news in any one holding barely moves the fund.",
          weight: 3,
          required: true,
        },
        {
          id: "market-risk-remains",
          description: "States that systematic (market-wide) risk cannot be diversified away this way — if every stock in the index falls together, the fund falls with it.",
          weight: 3,
          required: true,
          misconception: {
            id: "diversification-eliminates-all-risk",
            description: "Believes diversification within a broad index eliminates risk entirely, missing that market-wide risk remains.",
            blameConceptId: "etfs-and-index-funds",
          },
        },
      ],
    },
    difficulty: 0.1,
    discrimination: 1.4,
    expectedSeconds: 150,
    prereqClosure: ["etfs-and-index-funds", "equities-and-stock-markets"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "etfs-and-index-funds--explain-derive-expense-ratio-compounding",
    conceptId: "etfs-and-index-funds",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "A fund charges a constant expense ratio e per year, deducted from assets at the end of each year, with no " +
      "other frictions. Starting from year-by-year compounding, derive the fraction of terminal value that " +
      "remains after N years relative to a hypothetical zero-fee fund with the same gross return, and express " +
      "the fraction of value lost to fees.",
    rubric: {
      elements: [
        {
          id: "one-year-factor",
          description: "Establishes that each year, the fee multiplies the value by a factor of (1 − e), independent of the gross investment return, since it shrinks whatever assets are held that year by the same proportion.",
          weight: 3,
          required: true,
          misconception: {
            id: "fee-treated-as-flat-amount",
            description: "Treats the expense ratio as a fixed dollar amount rather than a proportional multiplier applied to that year's asset value.",
            blameConceptId: "etfs-and-index-funds",
          },
        },
        {
          id: "compounds-over-n-years",
          description: "Chains the per-year factor across N years to get a cumulative retained fraction of (1 − e)^N, since each year's shrinkage compounds on the previous year's already-reduced base.",
          weight: 3,
          required: true,
        },
        {
          id: "drag-as-complement",
          description: "States that the fraction of value lost to fees relative to the zero-fee case is 1 − (1 − e)^N, and notes it grows with N even though e itself is small and constant.",
          weight: 2,
          required: true,
        },
      ],
    },
    difficulty: 1.4,
    discrimination: 1.6,
    expectedSeconds: 240,
    prereqClosure: ["etfs-and-index-funds"],
    source: AUTHORED,
    status: "live",
  },

  // -- transfer (3) --
  {
    id: "etfs-and-index-funds--transfer-fee-compounding-over-decades",
    conceptId: "etfs-and-index-funds",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Two otherwise identical index funds track the same index: one charges 0.03% annually and the other 0.60%. " +
      "Using the time-value-of-money idea that steady percentage drags compound over time, explain why the fee " +
      "difference matters far more over 30 years than a single year's numbers suggest.",
    rubric: {
      elements: [
        {
          id: "single-year-looks-small",
          description: "Acknowledges that a 0.57-percentage-point gap looks negligible when applied to a single year's return.",
          weight: 1,
        },
        {
          id: "compounding-argument",
          description: "Explains that each year's small extra fee also shrinks the base every later year compounds on, so the cumulative gap grows multiplicatively — the same mechanism that makes a slightly higher interest rate produce a much larger future value over a long horizon.",
          weight: 4,
          required: true,
          misconception: {
            id: "linear-extrapolation-of-fee-gap",
            description: "Extrapolates the single-year fee gap linearly (e.g. '0.57% times 30 years'), missing that the fee reduces a compounding base every year, not a fixed amount.",
            blameConceptId: "time-value-of-money",
          },
        },
        {
          id: "connects-to-tvm",
          description: "Explicitly connects this to the time value of money: a persistent rate difference, compounded, behaves like comparing two different interest rates over a long horizon.",
          weight: 2,
          required: true,
        },
      ],
    },
    difficulty: 1.1,
    discrimination: 1.5,
    expectedSeconds: 180,
    prereqClosure: ["etfs-and-index-funds", "time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "etfs-and-index-funds--transfer-basket-of-residual-claims",
    conceptId: "etfs-and-index-funds",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "An S&P 500 index ETF is often called 'buying the whole stock market in one trade.' Connect this to what a " +
      "single share of an individual company's stock represents, and explain what specifically changes — and " +
      "what stays the same — when you hold a diversified basket of many such residual claims instead of just one.",
    rubric: {
      elements: [
        {
          id: "same-underlying-claim",
          description: "States that each holding inside the ETF is still an ordinary residual claim on one company's assets and earnings, exactly as with a single stock — the ETF just holds many of them proportionally.",
          weight: 3,
          required: true,
        },
        {
          id: "firm-specific-risk-diversified",
          description: "Explains that pooling many such claims diversifies away firm-specific risk — one company's bad news barely moves the whole basket.",
          weight: 3,
          required: true,
          misconception: {
            id: "etf-changes-nature-of-underlying-claim",
            description: "Believes wrapping shares in an ETF changes what kind of claim they represent, rather than simply pooling many ordinary residual claims together.",
            blameConceptId: "equities-and-stock-markets",
          },
        },
        {
          id: "market-risk-unchanged",
          description: "Notes that market-wide (systematic) risk is unchanged — the basket still moves with the overall market, just as an individual stock's price is influenced by market-wide moves.",
          weight: 1,
        },
      ],
    },
    difficulty: 0.9,
    discrimination: 1.5,
    expectedSeconds: 180,
    prereqClosure: ["etfs-and-index-funds", "equities-and-stock-markets"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "etfs-and-index-funds--transfer-derive-future-value-of-index-investment",
    conceptId: "etfs-and-index-funds",
    format: "derivation",
    cognitive: "transfer",
    channels: ["typed", "handwritten"],
    stem:
      "An investor puts P₀ dollars into a broad index ETF expected to compound in value at an average annual " +
      "rate g (combining price appreciation and reinvested dividends), with no further contributions or " +
      "withdrawals. Using the time value of money, derive the expected value of the investment after N years, " +
      "and explain how this expression lets the investor compare the ETF against a bond-like alternative with " +
      "a known, fixed compounding rate r.",
    rubric: {
      elements: [
        {
          id: "compounding-recursion",
          description: "Sets up the value after one year as P₀(1+g), after two years as P₀(1+g)² by reapplying the same growth factor, and generalizes to N years by induction.",
          weight: 3,
          required: true,
        },
        {
          id: "future-value-formula",
          description: "States the resulting expected future value as P_N = P₀(1+g)^N — the identical compound-growth formula used for any fixed-rate time-value-of-money problem.",
          weight: 3,
          required: true,
          misconception: {
            id: "equity-growth-treated-as-linear",
            description: "Computes the future value by adding g each year to a fixed base (linear growth) rather than compounding multiplicatively.",
            blameConceptId: "time-value-of-money",
          },
        },
        {
          id: "comparability-to-bond",
          description: "Explains that plugging g into the same PV/FV machinery as the bond's fixed rate r makes the two directly comparable — the ETF investment is 'worth more' over N years exactly when g exceeds r, in expectation, though g itself is uncertain while r is contractually fixed.",
          weight: 2,
          required: true,
        },
      ],
    },
    difficulty: 1.5,
    discrimination: 1.6,
    expectedSeconds: 240,
    prereqClosure: ["etfs-and-index-funds", "time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },

  // ===========================================================================
  // --- Mutual Funds and Net Asset Value ---------------------------------------
  // ===========================================================================

  // -- recall (6) --
  {
    id: "mutual-funds-and-nav--recall-nav-formula",
    conceptId: "mutual-funds-and-nav",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "A mutual fund's net asset value (NAV) per share is calculated as:",
    choices: [
      { id: "a", text: "(Total value of fund assets − liabilities) ÷ shares outstanding", correct: true },
      {
        id: "b",
        text: "Total assets ÷ number of holdings in the portfolio",
        correct: false,
        misconception: {
          id: "nav-divided-by-holdings-count",
          description: "Divides by the number of securities held rather than the number of fund shares outstanding, so it does not give a per-share price at all.",
          blameConceptId: "mutual-funds-and-nav",
        },
      },
      {
        id: "c",
        text: "Total assets alone, with no subtraction of liabilities",
        correct: false,
        misconception: {
          id: "nav-ignores-liabilities",
          description: "Omits subtracting liabilities, overstating the value actually attributable to shareholders.",
          blameConceptId: "mutual-funds-and-nav",
        },
      },
      {
        id: "d",
        text: "The average price of the fund's ten largest holdings",
        correct: false,
        misconception: {
          id: "nav-as-top-holdings-average",
          description: "NAV reflects the value of the entire portfolio, not an average price of just a few large positions.",
          blameConceptId: "mutual-funds-and-nav",
        },
      },
    ],
    difficulty: -1.5,
    discrimination: 1.1,
    expectedSeconds: 30,
    prereqClosure: ["mutual-funds-and-nav"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "mutual-funds-and-nav--recall-pricing-frequency",
    conceptId: "mutual-funds-and-nav",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "A mutual fund's NAV is calculated:",
    choices: [
      { id: "a", text: "Once per trading day, after the markets close", correct: true },
      {
        id: "b",
        text: "Continuously throughout the trading day",
        correct: false,
        misconception: {
          id: "mutual-fund-priced-continuously",
          description: "Confuses a mutual fund's once-daily NAV with the continuous market quotes of a stock or an ETF.",
          blameConceptId: "mutual-funds-and-nav",
        },
      },
      {
        id: "c",
        text: "Only at the start of each month",
        correct: false,
        misconception: {
          id: "mutual-fund-priced-monthly",
          description: "NAV is computed every trading day the fund is open, not on a monthly schedule.",
          blameConceptId: "mutual-funds-and-nav",
        },
      },
      {
        id: "d",
        text: "Whenever an investor places an order, using that moment's prices",
        correct: false,
        misconception: {
          id: "mutual-fund-priced-on-demand",
          description: "Misses forward pricing: all orders during the day settle at the single NAV computed after the close, regardless of when the order was placed.",
          blameConceptId: "mutual-funds-and-nav",
        },
      },
    ],
    difficulty: -1.4,
    discrimination: 1.1,
    expectedSeconds: 30,
    prereqClosure: ["mutual-funds-and-nav"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "mutual-funds-and-nav--recall-forward-pricing",
    conceptId: "mutual-funds-and-nav",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem:
      "An investor places an order to buy mutual fund shares at 2:00 pm, while the market is open. What price " +
      "do they receive?",
    choices: [
      { id: "a", text: "That day's NAV, calculated after the market closes — not a 2:00 pm price", correct: true },
      {
        id: "b",
        text: "The fund's NAV from the previous day's close",
        correct: false,
        misconception: {
          id: "mutual-fund-priced-at-prior-close",
          description: "Forward pricing settles the order at the NAV struck at the end of the same trading day the order was placed, not the day before.",
          blameConceptId: "mutual-funds-and-nav",
        },
      },
      {
        id: "c",
        text: "The price quoted to them at 2:00 pm",
        correct: false,
        misconception: {
          id: "mutual-fund-priced-at-order-time",
          description: "Mutual funds do not quote a live tradable price during the day; the price is not known until NAV is struck after the close.",
          blameConceptId: "mutual-funds-and-nav",
        },
      },
      {
        id: "d",
        text: "The average NAV over the past five trading days",
        correct: false,
        misconception: {
          id: "mutual-fund-priced-on-average",
          description: "Each order settles at a single day's NAV, not an average over multiple days.",
          blameConceptId: "mutual-funds-and-nav",
        },
      },
    ],
    difficulty: -1.0,
    discrimination: 1.2,
    expectedSeconds: 45,
    prereqClosure: ["mutual-funds-and-nav"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "mutual-funds-and-nav--recall-nav-facts",
    conceptId: "mutual-funds-and-nav",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which statements about mutual fund NAV are true? Select all that apply.",
    choices: [
      { id: "a", text: "NAV changes daily as the value of the fund's underlying holdings changes", correct: true },
      { id: "b", text: "NAV per share falls, all else equal, when the fund pays a distribution to shareholders", correct: true },
      { id: "c", text: "A fund must compute its NAV every trading day it is open", correct: true },
      {
        id: "d",
        text: "NAV is fixed at whatever price was set when the fund first launched",
        correct: false,
        misconception: {
          id: "nav-fixed-at-launch",
          description: "NAV moves every day with the value of the fund's holdings; it is not pinned to a launch-day price.",
          blameConceptId: "mutual-funds-and-nav",
        },
      },
      {
        id: "e",
        text: "A rising NAV means new investors buying in today will earn a higher future return than existing shareholders",
        correct: false,
        misconception: {
          id: "nav-level-implies-future-return",
          description: "NAV level says nothing about future returns — investors buying at any NAV share proportionally in whatever the portfolio does from that point forward.",
          blameConceptId: "mutual-funds-and-nav",
        },
      },
    ],
    difficulty: -0.9,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["mutual-funds-and-nav"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "mutual-funds-and-nav--recall-load-vs-noload",
    conceptId: "mutual-funds-and-nav",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which statements about mutual fund sales loads are true? Select all that apply.",
    choices: [
      { id: "a", text: "A front-end load is a sales charge deducted when shares are purchased", correct: true },
      { id: "b", text: "A no-load fund charges no sales commission on purchase or sale", correct: true },
      { id: "c", text: "A load reduces the amount of the investor's money that actually gets invested in fund shares", correct: true },
      {
        id: "d",
        text: "The expense ratio and the sales load are the same fee, just described differently",
        correct: false,
        misconception: {
          id: "load-and-expense-ratio-conflated",
          description: "A load is a one-time transaction charge; the expense ratio is a separate, ongoing annual fee. Both can apply to the same fund.",
          blameConceptId: "mutual-funds-and-nav",
        },
      },
      {
        id: "e",
        text: "A no-load fund cannot charge an ongoing expense ratio",
        correct: false,
        misconception: {
          id: "noload-means-no-expense-ratio",
          description: "'No-load' only means there is no sales commission; a no-load fund still charges its ongoing annual expense ratio.",
          blameConceptId: "mutual-funds-and-nav",
        },
      },
    ],
    difficulty: -0.6,
    discrimination: 1.3,
    expectedSeconds: 65,
    prereqClosure: ["mutual-funds-and-nav"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "mutual-funds-and-nav--recall-nav-vs-market-price",
    conceptId: "mutual-funds-and-nav",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem:
      "Explain why a traditional mutual fund has no meaningful 'market price' separate from its NAV, unlike a " +
      "stock or an ETF.",
    rubric: {
      elements: [
        {
          id: "transacts-with-fund-not-market",
          description: "Explains that mutual fund shares are bought from and sold back to the fund itself, at NAV, rather than traded between investors on an exchange at a supply-and-demand price.",
          weight: 3,
          required: true,
        },
        {
          id: "no-secondary-market",
          description: "Notes there is no continuous secondary market quoting a separate price, so there is no gap between 'what the fund is worth' and 'what it trades for' to speak of.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: -0.5,
    discrimination: 1.2,
    expectedSeconds: 90,
    prereqClosure: ["mutual-funds-and-nav"],
    source: AUTHORED,
    status: "live",
  },

  // -- apply (6) --
  {
    id: "mutual-funds-and-nav--apply-nav-basic",
    conceptId: "mutual-funds-and-nav",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A mutual fund holds assets worth $120 million and has liabilities of $2 million. It has 5 million shares " +
      "outstanding. What is its NAV per share, in dollars? Give a decimal to one place.",
    answerKey: 23.6,
    tolerance: 0.1,
    difficulty: -0.3,
    discrimination: 1.3,
    expectedSeconds: 75,
    prereqClosure: ["mutual-funds-and-nav"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "mutual-funds-and-nav--apply-shares-purchased",
    conceptId: "mutual-funds-and-nav",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "An investor sends $2,360 to buy shares of a no-load fund whose NAV is $23.60 per share. How many shares " +
      "do they receive?",
    answerKey: 100,
    tolerance: 0.1,
    difficulty: -0.2,
    discrimination: 1.3,
    expectedSeconds: 60,
    prereqClosure: ["mutual-funds-and-nav"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "mutual-funds-and-nav--apply-nav-change-from-distribution",
    conceptId: "mutual-funds-and-nav",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A fund's NAV is $50 per share before it pays a distribution of $2 per share, in cash, out of the fund's " +
      "assets. Assuming no other change in the value of the underlying holdings, what is the NAV per share " +
      "immediately after the distribution?",
    answerKey: 48,
    tolerance: 0.1,
    difficulty: -0.1,
    discrimination: 1.3,
    expectedSeconds: 75,
    prereqClosure: ["mutual-funds-and-nav"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "mutual-funds-and-nav--apply-front-load",
    conceptId: "mutual-funds-and-nav",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A fund charges a 5% front-end load. An investor writes a check for $10,000. How many dollars actually " +
      "get invested in fund shares, after the load is deducted?",
    answerKey: 9500,
    tolerance: 5,
    difficulty: 0.0,
    discrimination: 1.3,
    expectedSeconds: 75,
    prereqClosure: ["mutual-funds-and-nav"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "mutual-funds-and-nav--apply-expense-ratio-dollars",
    conceptId: "mutual-funds-and-nav",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "A mutual fund charges a 0.75% expense ratio, and an investor holds $40,000 in the fund. Approximately how " +
      "many dollars do they pay in fund expenses over one year?",
    answerKey: 300,
    tolerance: 2,
    difficulty: -0.1,
    discrimination: 1.3,
    expectedSeconds: 60,
    prereqClosure: ["mutual-funds-and-nav"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "mutual-funds-and-nav--apply-two-fund-comparison",
    conceptId: "mutual-funds-and-nav",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "Fund X has an NAV of $10 and 50 million shares outstanding; Fund Y has an NAV of $100 and 5 million " +
      "shares outstanding. Both hold portfolios of identical total value. Which fund is 'more expensive' to " +
      "invest in, on a per-dollar basis?",
    choices: [
      {
        id: "a",
        text: "Neither — a higher NAV per share does not make a fund more expensive to own; a given dollar amount simply buys proportionally fewer higher-priced shares of the same underlying portfolio",
        correct: true,
      },
      {
        id: "b",
        text: "Fund Y, because its per-share price is higher",
        correct: false,
        misconception: {
          id: "higher-nav-means-more-expensive",
          description: "Treats a higher per-share NAV as making a fund costlier to own, ignoring that the number of shares purchased per dollar simply scales inversely with the price.",
          blameConceptId: "mutual-funds-and-nav",
        },
      },
      {
        id: "c",
        text: "Fund X, because its per-share price is lower and so seems like a bargain",
        correct: false,
        misconception: {
          id: "lower-nav-means-cheaper",
          description: "A lower NAV per share is not a bargain; it only reflects more shares outstanding against the same total portfolio value.",
          blameConceptId: "mutual-funds-and-nav",
        },
      },
      {
        id: "d",
        text: "It cannot be determined without knowing each fund's expense ratio",
        correct: false,
        misconception: {
          id: "cost-comparison-requires-more-info-than-nav",
          description: "Correctly notes expense ratios matter for cost, but the question as posed is specifically about whether NAV level itself implies a cost difference — it does not.",
          blameConceptId: "mutual-funds-and-nav",
        },
      },
    ],
    difficulty: 0.3,
    discrimination: 1.4,
    expectedSeconds: 90,
    prereqClosure: ["mutual-funds-and-nav"],
    source: AUTHORED,
    status: "live",
  },

  // -- explain (5) --
  {
    id: "mutual-funds-and-nav--explain-forward-pricing-rationale",
    conceptId: "mutual-funds-and-nav",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain why mutual funds use forward pricing — settling every order at a NAV not yet known when the " +
      "order is placed — rather than letting investors trade at that day's already-published NAV.",
    rubric: {
      elements: [
        {
          id: "prevents-stale-price-arbitrage",
          description: "Explains that trading at an already-known, stale NAV would let an investor exploit information learned after that NAV was struck (a rising market overseas, for instance) at the expense of the fund's existing shareholders.",
          weight: 4,
          required: true,
          misconception: {
            id: "known-price-trading-assumed-fair",
            description: "Assumes letting investors trade at an already-published NAV is harmless, missing the arbitrage it would invite against existing shareholders.",
            blameConceptId: "mutual-funds-and-nav",
          },
        },
        {
          id: "protects-remaining-shareholders",
          description: "States that forward pricing ensures every investor transacts at a price that reflects the same information set — no one can react to news the fund's own NAV hasn't yet captured.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 0.5,
    discrimination: 1.5,
    expectedSeconds: 180,
    prereqClosure: ["mutual-funds-and-nav"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "mutual-funds-and-nav--explain-nav-drop-not-a-loss",
    conceptId: "mutual-funds-and-nav",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "A fund's NAV drops from $50 to $48 the day it pays a $2-per-share capital gains distribution. Explain " +
      "why this is not a $2 loss to an existing shareholder who reinvests the distribution.",
    rubric: {
      elements: [
        {
          id: "value-conserved",
          description: "Explains that the shareholder now holds $48 of NAV plus $2 in cash (or, if reinvested, additional shares purchased with that $2), so total value is unchanged at $50.",
          weight: 4,
          required: true,
          misconception: {
            id: "nav-drop-treated-as-loss",
            description: "Treats the NAV drop on distribution as a genuine loss of value, missing that the distributed amount simply moved from the fund's NAV into the shareholder's own hands.",
            blameConceptId: "mutual-funds-and-nav",
          },
        },
        {
          id: "tax-consequence-caveat",
          description: "Notes a real practical wrinkle: the distribution can still be a taxable event in a non-tax-advantaged account, even though no economic value was lost.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.4,
    discrimination: 1.5,
    expectedSeconds: 150,
    prereqClosure: ["mutual-funds-and-nav"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "mutual-funds-and-nav--explain-expenses-reflected-in-nav",
    conceptId: "mutual-funds-and-nav",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "A shareholder never receives a separate bill for a mutual fund's expense ratio. Explain how the fee is " +
      "actually collected, and why an investor who never checks a statement still ends up paying it.",
    rubric: {
      elements: [
        {
          id: "deducted-from-assets-daily",
          description: "Explains that the fund accrues and deducts a pro-rata slice of the annual expense ratio from its assets each day, before NAV is struck.",
          weight: 3,
          required: true,
        },
        {
          id: "shows-up-as-lower-nav-growth",
          description: "States that the effect is a slightly lower reported NAV growth over time than the portfolio's gross performance would otherwise imply, so the fee is paid invisibly through a smaller reported return rather than a visible transaction.",
          weight: 3,
          required: true,
          misconception: {
            id: "no-bill-means-no-fee",
            description: "Assumes that because no separate invoice arrives, the expense ratio is not actually being paid.",
            blameConceptId: "mutual-funds-and-nav",
          },
        },
      ],
    },
    difficulty: 0.3,
    discrimination: 1.4,
    expectedSeconds: 150,
    prereqClosure: ["mutual-funds-and-nav"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "mutual-funds-and-nav--explain-active-vs-index-mutual-fund",
    conceptId: "mutual-funds-and-nav",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Both an actively managed mutual fund and an index mutual fund compute NAV the same way. Explain what " +
      "actually determines whether one grows faster than a chosen benchmark over time, given that both are " +
      "priced identically.",
    rubric: {
      elements: [
        {
          id: "portfolio-selection-differs",
          description: "Explains that the NAV formula is identical; what differs is what securities sit inside the portfolio and in what weights — the active manager deviates from the benchmark's weights in an attempt to outperform it.",
          weight: 3,
          required: true,
        },
        {
          id: "fees-and-outcome-uncertain",
          description: "Notes that active management also usually carries higher fees, and that deviating from the benchmark can help or hurt performance, so outperformance is not guaranteed even with skillful selection.",
          weight: 3,
          required: true,
          misconception: {
            id: "nav-mechanics-assumed-to-differ",
            description: "Assumes the NAV calculation itself differs between active and index funds, rather than the portfolio held inside it.",
            blameConceptId: "mutual-funds-and-nav",
          },
        },
      ],
    },
    difficulty: 0.6,
    discrimination: 1.5,
    expectedSeconds: 180,
    prereqClosure: ["mutual-funds-and-nav", "etfs-and-index-funds"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "mutual-funds-and-nav--explain-derive-nav-invariance-to-flows",
    conceptId: "mutual-funds-and-nav",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "A fund has assets worth V and S shares outstanding, so NAV = V/S. A new investor contributes cash c and " +
      "receives newly issued shares priced at the current NAV. Derive the fund's NAV immediately after the " +
      "subscription, and show that it is unchanged by the new investor's purchase — in contrast to what happens " +
      "when the value of the fund's existing holdings itself changes.",
    rubric: {
      elements: [
        {
          id: "sets-up-new-shares",
          description: "Computes the number of new shares issued as n = c / (V/S) = cS/V, since shares are sold at the prevailing NAV.",
          weight: 3,
          required: true,
        },
        {
          id: "computes-new-nav",
          description: "Computes new NAV as (V + c) / (S + n), substitutes n = cS/V, and simplifies to show it equals V/S — the original NAV, unchanged.",
          weight: 3,
          required: true,
          misconception: {
            id: "subscriptions-assumed-to-move-nav",
            description: "Assumes new money flowing into a fund changes its NAV per share, missing that both assets and shares outstanding scale together at the current price.",
            blameConceptId: "mutual-funds-and-nav",
          },
        },
        {
          id: "contrasts-with-value-change",
          description: "Contrasts this with a change in the value of the fund's existing holdings (V changing with S fixed), which does move NAV — the two situations look similar in the ledger but have opposite effects.",
          weight: 2,
          required: true,
        },
      ],
    },
    difficulty: 1.4,
    discrimination: 1.6,
    expectedSeconds: 240,
    prereqClosure: ["mutual-funds-and-nav"],
    source: AUTHORED,
    status: "live",
  },

  // -- transfer (3) --
  {
    id: "mutual-funds-and-nav--transfer-mutual-fund-vs-etf-order",
    conceptId: "mutual-funds-and-nav",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A traditional mutual fund and an ETF can hold the exact same portfolio of stocks and have numerically " +
      "equal NAVs, yet behave very differently to an investor placing a market order at noon. Explain the " +
      "difference, and which structural feature you learned about ETFs is responsible for it.",
    rubric: {
      elements: [
        {
          id: "mutual-fund-forward-priced",
          description: "States that the mutual fund order settles at that day's NAV, computed only after the close — the investor does not know the exact execution price at noon.",
          weight: 3,
          required: true,
        },
        {
          id: "etf-executes-at-quoted-market-price",
          description: "States that the ETF order executes immediately at whatever price the continuous market is quoting at noon, which can differ slightly from NAV.",
          weight: 3,
          required: true,
          misconception: {
            id: "same-nav-implies-same-trading-experience",
            description: "Assumes that because NAV is numerically equal, the trading experience must be equal too, missing that only the ETF has a live secondary market and continuous creation/redemption arbitrage keeping its price near NAV.",
            blameConceptId: "etfs-and-index-funds",
          },
        },
        {
          id: "names-the-structural-cause",
          description: "Attributes the difference to the ETF's creation/redemption mechanism and exchange listing, which give it a continuously tradable market price, versus the mutual fund's direct issue/redeem-with-the-fund structure.",
          weight: 1,
        },
      ],
    },
    difficulty: 1.0,
    discrimination: 1.5,
    expectedSeconds: 180,
    prereqClosure: ["mutual-funds-and-nav", "etfs-and-index-funds"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "mutual-funds-and-nav--transfer-nav-built-from-residual-claims",
    conceptId: "mutual-funds-and-nav",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Explain how a mutual fund's NAV is, at bottom, built from the equities concepts you already know: it " +
      "aggregates the market value of many individual residual claims — shares of underlying companies — into " +
      "one per-share price. What does this imply about the fund's own share price if every stock it holds fell " +
      "by exactly the same percentage on the same day?",
    rubric: {
      elements: [
        {
          id: "nav-as-aggregation",
          description: "Explains that fund assets are simply the sum of the current market values of its individual equity holdings, each itself a residual claim on some company, so NAV inherits its value entirely from those underlying share prices.",
          weight: 3,
          required: true,
        },
        {
          id: "proportional-drop",
          description: "Concludes that if every underlying stock fell by the same percentage, total assets fall by that same percentage, and since shares outstanding are unaffected, NAV per share falls by exactly that percentage too.",
          weight: 3,
          required: true,
          misconception: {
            id: "fund-structure-cushions-uniform-decline",
            description: "Assumes pooling many stocks into a fund cushions a decline that hits every holding equally, missing that diversification only helps against idiosyncratic (firm-specific) moves, not a market-wide uniform move.",
            blameConceptId: "equities-and-stock-markets",
          },
        },
      ],
    },
    difficulty: 0.8,
    discrimination: 1.5,
    expectedSeconds: 150,
    prereqClosure: ["mutual-funds-and-nav", "equities-and-stock-markets"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "mutual-funds-and-nav--transfer-derive-future-nav",
    conceptId: "mutual-funds-and-nav",
    format: "derivation",
    cognitive: "transfer",
    channels: ["typed", "handwritten"],
    stem:
      "A mutual fund's underlying assets compound in value at a constant annual rate r, with no distributions " +
      "and no change in shares outstanding. Using the time value of money, derive the fund's NAV per share " +
      "after N years, starting from today's NAV₀, and explain how this expression makes an investment in the " +
      "fund comparable, cash-flow-wise, to any other lump sum growing at a compounded rate.",
    rubric: {
      elements: [
        {
          id: "assets-compound",
          description: "Notes that total fund assets after N years equal today's assets times (1+r)^N, by the standard compound-growth relationship.",
          weight: 3,
          required: true,
        },
        {
          id: "shares-fixed-so-nav-scales-identically",
          description: "Explains that because shares outstanding do not change, dividing both sides by the (unchanged) share count gives NAV_N = NAV₀ (1+r)^N — NAV per share compounds at exactly the same rate as total assets.",
          weight: 3,
          required: true,
          misconception: {
            id: "nav-growth-decoupled-from-asset-growth",
            description: "Treats NAV per share as growing at some different rate than the fund's total assets, missing that with shares outstanding fixed, the two must compound identically.",
            blameConceptId: "mutual-funds-and-nav",
          },
        },
        {
          id: "connects-to-tvm-comparability",
          description: "States that NAV₀ (1+r)^N is the exact same present-value/future-value relationship used for a bond or a bank deposit, so a mutual fund investment can be placed on the same footing as any other compounding cash flow when comparing alternatives.",
          weight: 1,
        },
      ],
    },
    difficulty: 1.5,
    discrimination: 1.6,
    expectedSeconds: 240,
    prereqClosure: ["mutual-funds-and-nav", "time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
];
