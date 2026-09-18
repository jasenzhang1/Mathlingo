import type { Item, SourceRef } from "../../lib/assessment/types";

/**
 * Item bank for two zero-item "financial instruments" concepts:
 * `yield-curve-and-term-structure` and `bond-duration-and-convexity`. Twenty
 * items per concept — a full-maturity pool, mixed across format and cognitive
 * level — authored from each concept and its allowed prerequisite ancestors
 * with no external seed.
 */

const AUTHORED: SourceRef = {
  id: "mathlingo-authored-fixed-income-2",
  tier: "generated",
  title: "Mathlingo authored item (fixed income, part 2)",
};

export const financialFixedIncome2Items: Item[] = [
  // ===========================================================================
  // yield-curve-and-term-structure
  // ===========================================================================
  {
    id: "yield-curve-and-term-structure--recall-definition",
    conceptId: "yield-curve-and-term-structure",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What does a yield curve plot?",
    choices: [
      {
        id: "a",
        text: "Yield to maturity against time to maturity for a set of otherwise-similar bonds (e.g. same issuer or credit quality)",
        correct: true,
      },
      {
        id: "b",
        text: "A bond's price against its coupon rate, holding maturity fixed",
        correct: false,
        misconception: {
          id: "curve-axes-wrong",
          description:
            "Puts the wrong quantities on the axes. The yield curve holds credit quality roughly fixed and varies maturity, plotting yield against time to maturity, not price against coupon.",
          blameConceptId: "yield-curve-and-term-structure",
        },
      },
      {
        id: "c",
        text: "A single bond's yield to maturity over calendar time as interest rates change day to day",
        correct: false,
        misconception: {
          id: "curve-confused-with-time-series",
          description:
            "Confuses the term structure (yields across maturities at one point in time) with a time series of one bond's yield across calendar dates.",
          blameConceptId: "yield-to-maturity",
        },
      },
    ],
    difficulty: -1.4,
    discrimination: 1.1,
    expectedSeconds: 30,
    prereqClosure: ["yield-curve-and-term-structure"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "yield-curve-and-term-structure--recall-ytm-vs-spot",
    conceptId: "yield-curve-and-term-structure",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What is a 'spot rate' in the context of the term structure?",
    choices: [
      {
        id: "a",
        text: "The yield to maturity on a zero-coupon bond of a given maturity, used to discount a single cash flow at that maturity",
        correct: true,
      },
      {
        id: "b",
        text: "The coupon rate on a newly issued bond priced at par",
        correct: false,
        misconception: {
          id: "spot-confused-with-par-coupon",
          description:
            "Confuses the spot rate with the par yield (the coupon rate that prices a coupon bond at par). The two coincide only for a single-period bond; in general the par yield is a blend of spot rates across maturities.",
          blameConceptId: "yield-curve-and-term-structure",
        },
      },
      {
        id: "c",
        text: "The rate a bond earned since it was originally issued",
        correct: false,
        misconception: {
          id: "spot-confused-with-realized-return",
          description:
            "Treats the spot rate as a backward-looking realized return rather than the current market discount rate for a cash flow of that maturity.",
          blameConceptId: "yield-to-maturity",
        },
      },
    ],
    difficulty: -1.1,
    discrimination: 1.2,
    expectedSeconds: 40,
    prereqClosure: ["yield-curve-and-term-structure", "yield-to-maturity"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "yield-curve-and-term-structure--recall-par-yield",
    conceptId: "yield-curve-and-term-structure",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What is the 'par yield' for a given maturity?",
    choices: [
      {
        id: "a",
        text: "The coupon rate that would make a coupon-paying bond of that maturity price exactly at par (100), given the current spot rate curve",
        correct: true,
      },
      {
        id: "b",
        text: "The average of all spot rates from one year out to that maturity",
        correct: false,
        misconception: {
          id: "par-yield-as-simple-average",
          description:
            "Treats the par yield as a plain average of spot rates. It is instead the coupon rate implied by discounting each cash flow at its own spot rate and setting the resulting price equal to par — a present-value-weighted construction, not a simple average.",
          blameConceptId: "yield-curve-and-term-structure",
        },
      },
      {
        id: "c",
        text: "The yield on the shortest-maturity bond available in the market",
        correct: false,
        misconception: {
          id: "par-yield-confused-with-short-rate",
          description:
            "Confuses the par yield at a given maturity with the short-term (money market) rate, which is a different point on the curve entirely.",
          blameConceptId: "yield-curve-and-term-structure",
        },
      },
    ],
    difficulty: -0.5,
    discrimination: 1.3,
    expectedSeconds: 55,
    prereqClosure: ["yield-curve-and-term-structure", "bonds-and-fixed-income"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "yield-curve-and-term-structure--recall-shapes",
    conceptId: "yield-curve-and-term-structure",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which of the following are recognized yield curve shapes? Select all that apply.",
    choices: [
      { id: "a", text: "Upward-sloping (normal): longer maturities have higher yields", correct: true },
      { id: "b", text: "Inverted: longer maturities have lower yields than shorter ones", correct: true },
      { id: "c", text: "Flat: yields are roughly the same across maturities", correct: true },
      {
        id: "d",
        text: "Circular: yields repeat in a fixed cycle every few years by construction",
        correct: false,
        misconception: {
          id: "invented-curve-shape",
          description: "Invents a 'circular' shape that is not a recognized description of the term structure; curves are described by their slope (up, down, flat) and sometimes local humps.",
          blameConceptId: "yield-curve-and-term-structure",
        },
      },
      {
        id: "e",
        text: "Vertical: all maturities share the exact same price regardless of yield",
        correct: false,
        misconception: {
          id: "curve-shape-price-confusion",
          description: "Confuses price with yield; the yield curve is a relationship between yield and maturity, and 'vertical' does not describe any recognized term-structure shape.",
          blameConceptId: "yield-curve-and-term-structure",
        },
      },
    ],
    difficulty: -0.9,
    discrimination: 1.2,
    expectedSeconds: 55,
    prereqClosure: ["yield-curve-and-term-structure"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "yield-curve-and-term-structure--recall-inverted-signal",
    conceptId: "yield-curve-and-term-structure",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "An inverted yield curve (short-term yields above long-term yields) is most commonly read by markets as a signal of what?",
    choices: [
      { id: "a", text: "Expectations that growth will slow and short-term rates will be cut in the future", correct: true },
      {
        id: "b",
        text: "Expectations that inflation and growth will accelerate going forward",
        correct: false,
        misconception: {
          id: "inversion-signal-reversed",
          description:
            "Reverses the standard reading of an inversion. An inverted curve is typically associated with expected slowing, not accelerating, growth and future rate cuts.",
          blameConceptId: "yield-curve-and-term-structure",
        },
      },
      {
        id: "c",
        text: "A purely mechanical artifact with no informational content about the economy",
        correct: false,
        misconception: {
          id: "curve-shape-uninformative",
          description:
            "Dismisses the term structure as uninformative, when in fact its shape is widely used (imperfectly) as a leading indicator, precisely because it reflects the market's aggregated rate expectations.",
          blameConceptId: "yield-curve-and-term-structure",
        },
      },
    ],
    difficulty: -0.3,
    discrimination: 1.3,
    expectedSeconds: 50,
    prereqClosure: ["yield-curve-and-term-structure"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "yield-curve-and-term-structure--recall-normal-shape-reason",
    conceptId: "yield-curve-and-term-structure",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Under the liquidity preference (term premium) view, why does the yield curve usually slope upward even when short-term rates are expected to stay flat?",
    choices: [
      {
        id: "a",
        text: "Investors demand extra compensation (a term premium) for locking up money longer and bearing more interest rate risk",
        correct: true,
      },
      {
        id: "b",
        text: "Longer-maturity bonds always have higher default risk than short-maturity bonds from the same issuer",
        correct: false,
        misconception: {
          id: "term-premium-confused-with-credit-risk",
          description:
            "Confuses the term premium (compensation for interest rate and liquidity risk over time) with credit risk, which is about issuer default and need not rise with maturity at all for a given issuer's term structure.",
          blameConceptId: "bonds-and-fixed-income",
        },
      },
      {
        id: "c",
        text: "Coupon payments are legally required to increase with a bond's maturity",
        correct: false,
        misconception: {
          id: "invented-coupon-rule",
          description: "Invents a rule that does not exist; coupon rates are set at issuance and are not mandated to rise with maturity.",
          blameConceptId: "bonds-and-fixed-income",
        },
      },
    ],
    difficulty: 0.0,
    discrimination: 1.4,
    expectedSeconds: 60,
    prereqClosure: ["yield-curve-and-term-structure", "bonds-and-fixed-income"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "yield-curve-and-term-structure--apply-forward-rate-basic",
    conceptId: "yield-curve-and-term-structure",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "The 1-year spot rate is 4% and the 2-year spot rate is 5% (both annually compounded). Using " +
      "(1+s2)^2 = (1+s1)(1+f), where f is the implied 1-year forward rate starting in year 1, compute f as a " +
      "percentage to two decimal places.",
    answerKey: 6.01,
    tolerance: 0.1,
    difficulty: 0.3,
    discrimination: 1.4,
    expectedSeconds: 120,
    prereqClosure: ["yield-curve-and-term-structure", "time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "yield-curve-and-term-structure--apply-forward-rate-second",
    conceptId: "yield-curve-and-term-structure",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "The 1-year spot rate is 3% and the 2-year spot rate is 4.5% (both annually compounded). Using " +
      "(1+s2)^2 = (1+s1)(1+f), compute the implied 1-year forward rate f, starting in year 1, as a percentage " +
      "to two decimal places.",
    answerKey: 6.02,
    tolerance: 0.1,
    difficulty: 0.4,
    discrimination: 1.4,
    expectedSeconds: 130,
    prereqClosure: ["yield-curve-and-term-structure", "time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "yield-curve-and-term-structure--apply-spot-from-forward",
    conceptId: "yield-curve-and-term-structure",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "The 1-year spot rate is 5% and the implied 1-year forward rate starting in year 1 is 9%. Using " +
      "(1+s2)^2 = (1+s1)(1+f), compute the 2-year spot rate s2 as a percentage to two decimal places.",
    answerKey: 6.98,
    tolerance: 0.1,
    difficulty: 0.5,
    discrimination: 1.5,
    expectedSeconds: 140,
    prereqClosure: ["yield-curve-and-term-structure", "time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "yield-curve-and-term-structure--apply-identify-shape-from-data",
    conceptId: "yield-curve-and-term-structure",
    format: "mcq",
    cognitive: "apply",
    channels: ["typed"],
    stem:
      "Yields observed today: 1-year = 5.0%, 2-year = 4.3%, 5-year = 3.6%, 10-year = 3.2%. What shape best " +
      "describes this yield curve?",
    choices: [
      { id: "a", text: "Inverted — yields decline as maturity lengthens", correct: true },
      {
        id: "b",
        text: "Upward-sloping (normal) — yields rise as maturity lengthens",
        correct: false,
        misconception: {
          id: "shape-misread-as-normal",
          description: "Misreads a clearly declining sequence of yields as rising; the given yields fall monotonically from 5.0% down to 3.2% as maturity increases.",
          blameConceptId: "yield-curve-and-term-structure",
        },
      },
      {
        id: "c",
        text: "Flat — yields are essentially the same at every maturity",
        correct: false,
        misconception: {
          id: "shape-misread-as-flat",
          description: "Treats a curve with nearly a 2 percentage-point spread between the shortest and longest maturities as flat, missing the clear downward slope.",
          blameConceptId: "yield-curve-and-term-structure",
        },
      },
    ],
    difficulty: -0.2,
    discrimination: 1.3,
    expectedSeconds: 70,
    prereqClosure: ["yield-curve-and-term-structure"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "yield-curve-and-term-structure--apply-par-yield-bootstrap",
    conceptId: "yield-curve-and-term-structure",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "The 1-year spot rate is 4% and the 2-year spot rate is 6% (both annually compounded). A 2-year bond " +
      "with face value 100 pays an annual coupon of C and is priced so that C/(1.04) + (C+100)/(1.06)^2 = 100 " +
      "(i.e. it is priced at par). Solve for C as a percentage of face value (the par yield), to two decimal places.",
    answerKey: 5.94,
    tolerance: 0.1,
    difficulty: 1.0,
    discrimination: 1.6,
    expectedSeconds: 180,
    prereqClosure: ["yield-curve-and-term-structure", "bonds-and-fixed-income", "time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "yield-curve-and-term-structure--apply-implied-expected-rate",
    conceptId: "yield-curve-and-term-structure",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "The 1-year spot rate is 4% and the 2-year spot rate is 6%. Under the pure expectations hypothesis, the " +
      "implied 1-year forward rate equals the market's expected 1-year spot rate one year from now. Compute " +
      "this implied expected rate as a percentage to two decimal places.",
    answerKey: 8.04,
    tolerance: 0.1,
    difficulty: 0.9,
    discrimination: 1.5,
    expectedSeconds: 150,
    prereqClosure: ["yield-curve-and-term-structure", "time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "yield-curve-and-term-structure--explain-inverted-recession-signal",
    conceptId: "yield-curve-and-term-structure",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain the economic logic behind why an inverted yield curve is often treated as a leading indicator of " +
      "recession, in terms of what long-term yields reflect about expected future short-term rates.",
    rubric: {
      elements: [
        {
          id: "long-yield-reflects-expected-path",
          description:
            "Explains that a long-term yield can be thought of as roughly an average of expected future short-term rates (plus a term premium), so a long yield below the current short rate implies the market expects short rates to fall.",
          weight: 3,
          required: true,
          misconception: {
            id: "long-yield-treated-as-independent",
            description: "Treats long-term yields as unrelated to expectations about future short rates, missing the core mechanism linking curve shape to expectations.",
            blameConceptId: "yield-curve-and-term-structure",
          },
        },
        {
          id: "rate-cuts-signal-slowdown",
          description: "Connects expected future rate cuts to an expectation that the central bank will need to loosen policy in response to weaker growth or inflation, which historically has often preceded a recession.",
          weight: 3,
          required: true,
        },
        {
          id: "not-a-perfect-predictor",
          description: "Notes this is a statistical regularity, not a guaranteed mechanism — inversions have preceded most but not literally all recessions, and with varying lead times.",
          weight: 1,
        },
      ],
    },
    difficulty: 0.6,
    discrimination: 1.5,
    expectedSeconds: 170,
    prereqClosure: ["yield-curve-and-term-structure"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "yield-curve-and-term-structure--explain-liquidity-preference",
    conceptId: "yield-curve-and-term-structure",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain the liquidity preference theory of the term structure: why does it predict an upward-sloping " +
      "curve on average, even if investors expect short-term rates to stay constant?",
    rubric: {
      elements: [
        {
          id: "term-premium-compensation",
          description:
            "States that investors require a term (liquidity) premium to hold longer-maturity bonds, because those bonds are more exposed to interest rate risk and are less liquid than short-term instruments.",
          weight: 3,
          required: true,
        },
        {
          id: "premium-grows-with-maturity",
          description: "Explains the premium tends to increase with maturity, which by itself tilts the curve upward even when expected future short rates are flat.",
          weight: 3,
          required: true,
          misconception: {
            id: "upward-slope-implies-rising-rate-expectations",
            description: "Assumes an upward slope can only mean the market expects rates to rise, missing that a term premium alone can produce an upward slope with flat rate expectations.",
            blameConceptId: "yield-curve-and-term-structure",
          },
        },
      ],
    },
    difficulty: 0.4,
    discrimination: 1.4,
    expectedSeconds: 160,
    prereqClosure: ["yield-curve-and-term-structure"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "yield-curve-and-term-structure--explain-market-segmentation",
    conceptId: "yield-curve-and-term-structure",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Under the market segmentation theory of the term structure, short- and long-maturity bonds are treated " +
      "as trading in largely separate markets. Explain what drives yields under this theory, and how it differs " +
      "from the pure expectations hypothesis.",
    rubric: {
      elements: [
        {
          id: "segmented-supply-demand",
          description:
            "Explains that under segmentation, yields at each maturity are set mainly by the supply and demand of investors and issuers who specifically want that maturity (e.g. banks preferring short maturities, pension funds preferring long ones), rather than by expectations linking maturities together.",
          weight: 3,
          required: true,
        },
        {
          id: "contrast-with-expectations",
          description:
            "Contrasts this with the pure expectations hypothesis, where long rates are tightly determined by the expected path of short rates, so the two theories can predict different curve shapes for the same set of rate expectations.",
          weight: 3,
          required: true,
          misconception: {
            id: "segmentation-confused-with-expectations",
            description: "Describes market segmentation as if it were the expectations hypothesis, missing that segmentation explicitly denies that investors freely substitute across maturities.",
            blameConceptId: "yield-curve-and-term-structure",
          },
        },
      ],
    },
    difficulty: 0.8,
    discrimination: 1.5,
    expectedSeconds: 180,
    prereqClosure: ["yield-curve-and-term-structure"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "yield-curve-and-term-structure--explain-expectations-hypothesis",
    conceptId: "yield-curve-and-term-structure",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "State the pure expectations hypothesis of the term structure, and explain why it implies that investing " +
      "in a sequence of short-term bonds should have the same expected return as investing in one long-term " +
      "bond of matching total maturity.",
    rubric: {
      elements: [
        {
          id: "states-hypothesis",
          description: "States that under the pure expectations hypothesis, long-term rates are determined entirely by the market's expectations of future short-term rates, with no additional risk premium.",
          weight: 3,
          required: true,
        },
        {
          id: "explains-equal-expected-return-logic",
          description:
            "Explains that if this holds, rolling over short-term bonds and holding a single long bond must have the same expected payoff, otherwise investors would shift toward whichever strategy offered a better expected return, and that arbitrage-like behavior would move rates until the two are equalized in expectation.",
          weight: 3,
          required: true,
          misconception: {
            id: "expectations-hypothesis-allows-premium",
            description: "Includes a risk premium while calling it the pure expectations hypothesis, conflating it with the liquidity preference theory.",
            blameConceptId: "yield-curve-and-term-structure",
          },
        },
      ],
    },
    difficulty: 0.5,
    discrimination: 1.4,
    expectedSeconds: 160,
    prereqClosure: ["yield-curve-and-term-structure"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "yield-curve-and-term-structure--explain-term-premium-vs-forward",
    conceptId: "yield-curve-and-term-structure",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "The forward rate implied by two spot rates need not equal the market's true expected future spot rate. " +
      "Explain why these two quantities can differ, and what the gap between them is usually called.",
    rubric: {
      elements: [
        {
          id: "gap-is-term-premium",
          description: "Identifies the gap between the implied forward rate and the true expected future spot rate as (roughly) the term premium.",
          weight: 3,
          required: true,
        },
        {
          id: "explains-why-they-differ",
          description:
            "Explains that the forward rate is a mechanical, no-arbitrage consequence of today's observed spot rates, while the expected future spot rate is investors' actual belief about the future; the two coincide only if investors demand no compensation for the extra risk of holding longer-maturity instruments.",
          weight: 3,
          required: true,
          misconception: {
            id: "forward-rate-treated-as-perfect-forecast",
            description: "Treats the forward rate as literally the market's best forecast of the future spot rate, missing that a term premium can drive a wedge between the two.",
            blameConceptId: "yield-curve-and-term-structure",
          },
        },
      ],
    },
    difficulty: 1.1,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["yield-curve-and-term-structure", "time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "yield-curve-and-term-structure--transfer-duration-risk-across-curve",
    conceptId: "yield-curve-and-term-structure",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A bond investor holds two bonds with the same yield to maturity today but very different maturities. " +
      "Explain why a parallel shift in the entire yield curve would affect the two bonds' prices by different " +
      "amounts, connecting this to how each bond's cash flows are distributed over time.",
    rubric: {
      elements: [
        {
          id: "longer-maturity-more-sensitive",
          description: "Explains that the longer-maturity bond's price is more sensitive to a given yield change, because more of its cash flows (especially the principal) are discounted over a longer horizon, compounding the effect of the rate change.",
          weight: 3,
          required: true,
        },
        {
          id: "links-to-cash-flow-timing",
          description: "Connects sensitivity to the average timing of cash flows being pushed further out for the longer bond, not merely to the number of years until maturity in isolation.",
          weight: 3,
          required: true,
          misconception: {
            id: "same-ytm-implies-same-sensitivity",
            description: "Assumes bonds with the same yield to maturity must react identically to a rate shift, missing that price sensitivity depends on the timing of cash flows, not on the yield level alone.",
            blameConceptId: "bonds-and-fixed-income",
          },
        },
      ],
    },
    difficulty: 1.3,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["yield-curve-and-term-structure", "bonds-and-fixed-income"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "yield-curve-and-term-structure--transfer-price-bond-from-curve",
    conceptId: "yield-curve-and-term-structure",
    format: "derivation",
    cognitive: "transfer",
    channels: ["typed", "handwritten"],
    stem:
      "Spot rates are: 1-year = 4%, 2-year = 5%, 3-year = 6% (annually compounded). Price a 3-year bond with " +
      "face value 100 and an annual coupon of 5, by discounting each cash flow at the spot rate matching its " +
      "own maturity. Set up the calculation and give the price to two decimal places.",
    rubric: {
      elements: [
        {
          id: "discounts-each-cash-flow-at-its-own-rate",
          description:
            "Discounts the year-1 coupon of 5 at 4%, the year-2 coupon of 5 at 5% (compounded twice), and the year-3 coupon-plus-principal of 105 at 6% (compounded three times) — using a distinct spot rate for each maturity rather than one blended yield.",
          weight: 3,
          required: true,
          misconception: {
            id: "uses-single-ytm-instead-of-curve",
            description: "Discounts every cash flow at one flat rate, missing the point of using the term structure: each maturity has its own spot rate.",
            blameConceptId: "yield-curve-and-term-structure",
          },
        },
        {
          id: "sums-correctly",
          description:
            "Computes each present value correctly (5/1.04 ≈ 4.81, 5/1.05^2 ≈ 4.54, 105/1.06^3 ≈ 88.17) and sums them to a price of approximately 97.52.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.7,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["yield-curve-and-term-structure", "bonds-and-fixed-income", "time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "yield-curve-and-term-structure--transfer-derive-general-forward-rate",
    conceptId: "yield-curve-and-term-structure",
    format: "derivation",
    cognitive: "transfer",
    channels: ["typed", "handwritten"],
    stem:
      "Generalize the two-period no-arbitrage forward rate relationship to periods m and n (with m < n), where " +
      "sm and sn are the m-year and n-year spot rates. Derive an expression for the forward rate f(m,n) that " +
      "applies from year m to year n, using the no-arbitrage argument that investing to year n directly must " +
      "match investing to year m and then rolling forward at f(m,n).",
    rubric: {
      elements: [
        {
          id: "sets-up-no-arbitrage-equation",
          description: "Sets up (1+sn)^n = (1+sm)^m · (1+f(m,n))^(n-m), reflecting that compounding at the n-year spot rate to year n must equal compounding at the m-year spot rate to year m and then at the forward rate for the remaining n−m years.",
          weight: 3,
          required: true,
          misconception: {
            id: "wrong-exponents",
            description: "Uses the wrong exponents (e.g. treats the forward leg as spanning n years instead of n−m years), producing an equation that does not represent two routes to the same maturity.",
            blameConceptId: "yield-curve-and-term-structure",
          },
        },
        {
          id: "solves-for-forward-rate",
          description: "Solves to get f(m,n) = [(1+sn)^n / (1+sm)^m]^(1/(n−m)) − 1.",
          weight: 3,
          required: true,
        },
        {
          id: "notes-two-period-special-case",
          description: "Notes this reduces to the earlier two-period formula when m = 1 and n = 2.",
          weight: 1,
        },
      ],
    },
    difficulty: 2.2,
    discrimination: 1.8,
    expectedSeconds: 260,
    prereqClosure: ["yield-curve-and-term-structure", "time-value-of-money"],
    source: AUTHORED,
    status: "live",
  },

  // ===========================================================================
  // bond-duration-and-convexity
  // ===========================================================================
  {
    id: "bond-duration-and-convexity--recall-duration-definition",
    conceptId: "bond-duration-and-convexity",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Macaulay duration is best described as:",
    choices: [
      { id: "a", text: "The weighted-average time until a bond's cash flows are received, weighted by each cash flow's share of the bond's present value", correct: true },
      {
        id: "b",
        text: "The number of years until the bond matures",
        correct: false,
        misconception: {
          id: "duration-as-maturity",
          description: "Confuses duration with time to maturity. They coincide only for a zero-coupon bond; a coupon bond's duration is always shorter than its maturity.",
          blameConceptId: "bond-duration-and-convexity",
        },
      },
      {
        id: "c",
        text: "The bond's annual coupon rate",
        correct: false,
        misconception: {
          id: "duration-as-coupon-rate",
          description: "Confuses a measure of interest-rate sensitivity and timing with the coupon rate, an unrelated cash-flow parameter.",
          blameConceptId: "bond-duration-and-convexity",
        },
      },
    ],
    difficulty: -0.9,
    discrimination: 1.2,
    expectedSeconds: 45,
    prereqClosure: ["bond-duration-and-convexity", "bonds-and-fixed-income"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "bond-duration-and-convexity--recall-zero-coupon-duration",
    conceptId: "bond-duration-and-convexity",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "For a zero-coupon bond, Macaulay duration equals:",
    choices: [
      { id: "a", text: "Exactly the bond's time to maturity", correct: true },
      {
        id: "b",
        text: "Half the bond's time to maturity",
        correct: false,
        misconception: {
          id: "halves-zero-coupon-duration",
          description: "Invents a halving rule; with a single cash flow at maturity, all the weight in the duration average sits at that one date, so duration equals maturity exactly.",
          blameConceptId: "bond-duration-and-convexity",
        },
      },
      {
        id: "c",
        text: "Zero, since there are no coupons to weight",
        correct: false,
        misconception: {
          id: "confuses-no-coupons-with-zero-duration",
          description: "Confuses 'no coupons' with 'no duration'; duration still measures the timing of the single remaining cash flow, which occurs at maturity, not at time zero.",
          blameConceptId: "bond-duration-and-convexity",
        },
      },
    ],
    difficulty: -0.5,
    discrimination: 1.3,
    expectedSeconds: 50,
    prereqClosure: ["bond-duration-and-convexity", "bonds-and-fixed-income"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "bond-duration-and-convexity--recall-modified-duration-relationship",
    conceptId: "bond-duration-and-convexity",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Modified duration relates to Macaulay duration by:",
    choices: [
      { id: "a", text: "Dividing Macaulay duration by (1 + yield per period)", correct: true },
      {
        id: "b",
        text: "Multiplying Macaulay duration by (1 + yield per period)",
        correct: false,
        misconception: {
          id: "multiplies-instead-of-divides",
          description: "Inverts the relationship; modified duration is always slightly smaller than Macaulay duration because it divides by (1 + y), not multiplies.",
          blameConceptId: "bond-duration-and-convexity",
        },
      },
      {
        id: "c",
        text: "They are always exactly equal",
        correct: false,
        misconception: {
          id: "assumes-macaulay-equals-modified",
          description: "Assumes no adjustment is needed, missing the (1 + y) scaling that converts a time-weighted average into a price-sensitivity measure.",
          blameConceptId: "bond-duration-and-convexity",
        },
      },
    ],
    difficulty: -0.3,
    discrimination: 1.3,
    expectedSeconds: 45,
    prereqClosure: ["bond-duration-and-convexity", "yield-to-maturity"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "bond-duration-and-convexity--recall-what-duration-drives-down",
    conceptId: "bond-duration-and-convexity",
    format: "multi-select",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which of the following, all else equal, tend to lower a coupon bond's Macaulay duration? Select all that apply.",
    choices: [
      { id: "a", text: "A higher coupon rate, since more cash flow arrives earlier rather than being concentrated at maturity", correct: true },
      { id: "b", text: "A shorter time to maturity", correct: true },
      { id: "c", text: "A higher yield to maturity, since it discounts later, more heavily-weighted cash flows more steeply", correct: true },
      {
        id: "d",
        text: "A larger face value, holding coupon rate, maturity, and yield fixed",
        correct: false,
        misconception: {
          id: "face-value-scale-affects-duration",
          description: "Treats duration as sensitive to the overall scale of cash flows; scaling every cash flow by the same factor leaves the *weighted average timing* unchanged.",
          blameConceptId: "bond-duration-and-convexity",
        },
      },
      {
        id: "e",
        text: "A longer time to maturity",
        correct: false,
        misconception: {
          id: "reverses-maturity-effect",
          description: "Reverses the maturity relationship; longer maturity pushes more weight onto later cash flows, which raises Macaulay duration, not lowers it.",
          blameConceptId: "bond-duration-and-convexity",
        },
      },
    ],
    difficulty: 0.2,
    discrimination: 1.5,
    expectedSeconds: 90,
    prereqClosure: ["bond-duration-and-convexity", "bonds-and-fixed-income"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "bond-duration-and-convexity--recall-convexity-role",
    conceptId: "bond-duration-and-convexity",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "In the price-yield relationship of a standard (option-free) bond, convexity captures:",
    choices: [
      { id: "a", text: "The second-order (curvature) correction to the linear, duration-only estimate of the price change", correct: true },
      {
        id: "b",
        text: "The same information as duration, expressed in different units",
        correct: false,
        misconception: {
          id: "convexity-as-duration-restated",
          description: "Treats convexity as redundant with duration, missing that duration is a first-order (linear) approximation and convexity is the next-order correction to it.",
          blameConceptId: "bond-duration-and-convexity",
        },
      },
      {
        id: "c",
        text: "The bond's default probability",
        correct: false,
        misconception: {
          id: "convexity-as-credit-risk",
          description: "Confuses a purely mathematical curvature property of the price-yield function with credit risk, an unrelated concept.",
          blameConceptId: "bond-duration-and-convexity",
        },
      },
    ],
    difficulty: 0.1,
    discrimination: 1.4,
    expectedSeconds: 60,
    prereqClosure: ["bond-duration-and-convexity"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "bond-duration-and-convexity--recall-convexity-sign-benefit",
    conceptId: "bond-duration-and-convexity",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "For a standard option-free bond, positive convexity means that, compared to the duration-only linear estimate, the bond's actual price:",
    choices: [
      { id: "a", text: "Falls by less than predicted when yields rise, and rises by more than predicted when yields fall", correct: true },
      {
        id: "b",
        text: "Falls by more than predicted when yields rise, and rises by less than predicted when yields fall",
        correct: false,
        misconception: {
          id: "reverses-convexity-benefit",
          description: "Reverses the direction of the correction; positive convexity always works in the bondholder's favor relative to the linear estimate, in both directions.",
          blameConceptId: "bond-duration-and-convexity",
        },
      },
      {
        id: "c",
        text: "Matches the duration-only estimate exactly, since convexity only matters for very large yield changes",
        correct: false,
        misconception: {
          id: "assumes-convexity-negligible",
          description: "Assumes away the correction rather than recognizing that convexity systematically improves on the linear estimate whenever the price-yield curve is not exactly straight.",
          blameConceptId: "bond-duration-and-convexity",
        },
      },
    ],
    difficulty: 0.5,
    discrimination: 1.5,
    expectedSeconds: 80,
    prereqClosure: ["bond-duration-and-convexity"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "bond-duration-and-convexity--apply-macaulay-duration-par-bond",
    conceptId: "bond-duration-and-convexity",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A 2-year bond with face value $1,000, an annual coupon rate of 6%, priced at exactly par ($1,000) with a " +
      "6% yield, pays a $60 coupon at the end of year 1 and $1,060 at the end of year 2. What is its Macaulay " +
      "duration, in years, rounded to two decimal places?",
    answerKey: 1.94,
    tolerance: 0.02,
    difficulty: 0.4,
    discrimination: 1.5,
    expectedSeconds: 150,
    prereqClosure: ["bond-duration-and-convexity", "bonds-and-fixed-income", "yield-to-maturity"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "bond-duration-and-convexity--apply-modified-duration-from-macaulay",
    conceptId: "bond-duration-and-convexity",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A bond has a Macaulay duration of 1.94 years and a yield to maturity of 6% per year. What is its modified " +
      "duration, in years, rounded to two decimal places?",
    answerKey: 1.83,
    tolerance: 0.02,
    difficulty: 0.0,
    discrimination: 1.4,
    expectedSeconds: 90,
    prereqClosure: ["bond-duration-and-convexity", "yield-to-maturity"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "bond-duration-and-convexity--apply-zero-coupon-modified-duration",
    conceptId: "bond-duration-and-convexity",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A 5-year zero-coupon bond has a yield to maturity of 5% per year. What is its modified duration, in " +
      "years, rounded to two decimal places?",
    answerKey: 4.76,
    tolerance: 0.02,
    difficulty: 0.2,
    discrimination: 1.4,
    expectedSeconds: 100,
    prereqClosure: ["bond-duration-and-convexity", "bonds-and-fixed-income", "yield-to-maturity"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "bond-duration-and-convexity--apply-price-change-duration-only",
    conceptId: "bond-duration-and-convexity",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A bond has a modified duration of 7 years. Using the duration-only (linear) approximation, what is the " +
      "estimated percentage change in its price if its yield rises by 0.50 percentage points? Give your answer " +
      "as a percentage (include the sign), rounded to two decimal places.",
    answerKey: -3.5,
    tolerance: 0.05,
    difficulty: 0.3,
    discrimination: 1.5,
    expectedSeconds: 100,
    prereqClosure: ["bond-duration-and-convexity"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "bond-duration-and-convexity--apply-price-change-with-convexity",
    conceptId: "bond-duration-and-convexity",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A bond has a modified duration of 7 years and a convexity of 60. Using the duration-plus-convexity " +
      "approximation %ΔP ≈ −(modified duration)×Δy + 0.5×(convexity)×(Δy)², estimate the percentage price " +
      "change if the yield rises by 2 percentage points (Δy = 0.02). Give your answer as a percentage (include " +
      "the sign), rounded to two decimal places.",
    answerKey: -12.8,
    tolerance: 0.1,
    difficulty: 0.9,
    discrimination: 1.6,
    expectedSeconds: 160,
    prereqClosure: ["bond-duration-and-convexity"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "bond-duration-and-convexity--apply-dollar-price-change",
    conceptId: "bond-duration-and-convexity",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A bond currently priced at $1,000 has a modified duration of 7 years. Using the duration-only " +
      "approximation, what is the estimated new price if its yield rises by 0.50 percentage points? Round to " +
      "the nearest dollar.",
    answerKey: 965,
    tolerance: 1,
    difficulty: 0.5,
    discrimination: 1.5,
    expectedSeconds: 130,
    prereqClosure: ["bond-duration-and-convexity"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "bond-duration-and-convexity--explain-duration-as-slope",
    conceptId: "bond-duration-and-convexity",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain why modified duration can be interpreted as (approximately) the slope of the bond's price-yield " +
      "curve, expressed in percentage-price terms per unit change in yield.",
    rubric: {
      elements: [
        {
          id: "duration-as-first-derivative",
          description: "Explains that modified duration is proportional to the first derivative of price with respect to yield, capturing the instantaneous rate of change of price as yield moves.",
          weight: 3,
          required: true,
        },
        {
          id: "linear-approximation-near-current-yield",
          description: "Explains that using this slope to project a price change is a linear (tangent-line) approximation, accurate for small yield changes near the current yield.",
          weight: 3,
          required: true,
          misconception: {
            id: "treats-duration-estimate-as-exact",
            description: "Treats the duration-based price-change estimate as exact for any size of yield move, missing that it is only a local, linear approximation to a curved relationship.",
            blameConceptId: "bond-duration-and-convexity",
          },
        },
      ],
    },
    difficulty: 0.8,
    discrimination: 1.6,
    expectedSeconds: 160,
    prereqClosure: ["bond-duration-and-convexity"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "bond-duration-and-convexity--explain-why-duration-alone-insufficient",
    conceptId: "bond-duration-and-convexity",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain why relying on duration alone tends to understate a bond's true price when yields move by a large " +
      "amount, in either direction.",
    rubric: {
      elements: [
        {
          id: "price-yield-curve-is-not-a-straight-line",
          description: "Explains that the true price-yield relationship is curved (convex), not straight, so a straight-line (duration-only) approximation increasingly diverges from the true curve as the yield move gets larger.",
          weight: 3,
          required: true,
        },
        {
          id: "curve-lies-above-tangent-line",
          description: "Explains that because the curve is convex, it lies above its own tangent line at every other point, so the true price is always at least as high as the duration-only estimate predicts.",
          weight: 3,
          required: true,
          misconception: {
            id: "assumes-tangent-line-matches-curve",
            description: "Assumes the tangent line used for the duration estimate coincides with the actual curved price-yield relationship away from the point of tangency.",
            blameConceptId: "bond-duration-and-convexity",
          },
        },
      ],
    },
    difficulty: 1.0,
    discrimination: 1.6,
    expectedSeconds: 170,
    prereqClosure: ["bond-duration-and-convexity"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "bond-duration-and-convexity--explain-coupon-effect-on-duration",
    conceptId: "bond-duration-and-convexity",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem:
      "Explain, using the weighted-average interpretation of duration, why a bond with a higher coupon rate has " +
      "a lower Macaulay duration than an otherwise identical bond with a lower coupon rate.",
    rubric: {
      elements: [
        {
          id: "weights-are-pv-shares",
          description: "Recalls that Macaulay duration weights each cash flow's time by that cash flow's share of the bond's total present value.",
          weight: 2,
          required: true,
        },
        {
          id: "higher-coupon-shifts-weight-earlier",
          description: "Explains that a higher coupon rate puts more present value into the earlier coupon payments relative to the final face-value payment, shifting weight toward earlier dates and pulling the weighted average down.",
          weight: 3,
          required: true,
          misconception: {
            id: "ignores-weight-redistribution",
            description: "Focuses on the coupon size itself rather than on how a bigger coupon redistributes the present-value weights across time, which is what actually moves the weighted average.",
            blameConceptId: "bond-duration-and-convexity",
          },
        },
      ],
    },
    difficulty: 0.9,
    discrimination: 1.6,
    expectedSeconds: 160,
    prereqClosure: ["bond-duration-and-convexity", "bonds-and-fixed-income"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "bond-duration-and-convexity--derivation-taylor-expansion-source",
    conceptId: "bond-duration-and-convexity",
    format: "derivation",
    cognitive: "explain",
    channels: ["typed", "handwritten"],
    stem:
      "Explain how the duration-plus-convexity price-change formula %ΔP ≈ −(modified duration)×Δy + " +
      "0.5×(convexity)×(Δy)² arises as a second-order Taylor expansion of price around the current yield.",
    rubric: {
      elements: [
        {
          id: "taylor-expansion-setup",
          description: "Sets up the second-order Taylor expansion of P(y) around the current yield y₀: ΔP ≈ P'(y₀)Δy + 0.5·P''(y₀)(Δy)².",
          weight: 3,
          required: true,
        },
        {
          id: "identifies-duration-term",
          description: "Identifies that dividing through by P and rescaling P'(y₀) gives (minus) the modified duration term, matching the linear part of the formula.",
          weight: 2,
          required: true,
        },
        {
          id: "identifies-convexity-term",
          description: "Identifies that the second-derivative term P''(y₀), similarly rescaled by price, gives the convexity term, matching the quadratic part of the formula.",
          weight: 2,
          required: true,
          misconception: {
            id: "misses-second-derivative-origin",
            description: "Treats the convexity term as an ad hoc correction rather than recognizing it as the second-derivative term of the same Taylor expansion that produces the duration term.",
            blameConceptId: "bond-duration-and-convexity",
          },
        },
      ],
    },
    difficulty: 1.6,
    discrimination: 1.8,
    expectedSeconds: 220,
    prereqClosure: ["bond-duration-and-convexity"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "bond-duration-and-convexity--transfer-compare-two-bonds-same-duration",
    conceptId: "bond-duration-and-convexity",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "Bond X and Bond Y have the same modified duration, but Bond X has higher convexity than Bond Y. For a " +
      "large change in yield (up or down), which bond performs better, and why might an investor be willing to " +
      "accept a lower yield on Bond X for this property?",
    rubric: {
      elements: [
        {
          id: "higher-convexity-bond-outperforms",
          description: "Explains that Bond X (higher convexity) will have a higher price than Bond Y after any large yield move, in either direction, since the duration-only estimate they'd otherwise share is corrected upward more by X's larger convexity term.",
          weight: 3,
          required: true,
        },
        {
          id: "convexity-priced-as-valuable",
          description: "Explains that this asymmetric protection (smaller losses on the downside, larger gains on the upside relative to Bond Y) is valuable to risk-averse investors, so they may accept a lower yield to hold Bond X.",
          weight: 3,
          required: true,
          misconception: {
            id: "assumes-equal-duration-means-equal-performance",
            description: "Assumes that matching modified duration implies the two bonds behave identically under any size of yield change, ignoring the second-order convexity difference.",
            blameConceptId: "bond-duration-and-convexity",
          },
        },
      ],
    },
    difficulty: 1.7,
    discrimination: 1.8,
    expectedSeconds: 200,
    prereqClosure: ["bond-duration-and-convexity"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "bond-duration-and-convexity--transfer-portfolio-duration-matching",
    conceptId: "bond-duration-and-convexity",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "A pension fund wants a bond portfolio whose value moves as little as possible when interest rates shift, " +
      "over the time horizon of its liabilities. Explain how the fund could use duration to construct such a " +
      "portfolio, and name one limitation of relying on duration alone for this purpose.",
    rubric: {
      elements: [
        {
          id: "match-duration-to-horizon",
          description: "Explains the fund can choose a mix of bonds whose portfolio-weighted average duration matches the horizon of its liabilities, so interest-rate-driven price changes and reinvestment-rate changes offset (immunization).",
          weight: 3,
          required: true,
        },
        {
          id: "names-a-limitation",
          description: "Names a genuine limitation: duration is only a linear, local approximation (breaks down for large or non-parallel yield curve shifts), and/or that duration itself changes as time passes and yields move, requiring periodic rebalancing.",
          weight: 3,
          required: true,
          misconception: {
            id: "treats-duration-matching-as-permanent-fix",
            description: "Treats a one-time duration match as a permanent solution, missing that duration drifts with time and yield changes and so needs rebalancing.",
            blameConceptId: "bond-duration-and-convexity",
          },
        },
      ],
    },
    difficulty: 1.5,
    discrimination: 1.7,
    expectedSeconds: 190,
    prereqClosure: ["bond-duration-and-convexity", "yield-to-maturity"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "bond-duration-and-convexity--transfer-rate-shock-bond-choice",
    conceptId: "bond-duration-and-convexity",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem:
      "An investor strongly expects interest rates to fall sharply over the next year. Between a short-duration " +
      "bond and a long-duration bond of similar credit quality, which should the investor prefer to maximize " +
      "expected capital gains, and why?",
    rubric: {
      elements: [
        {
          id: "prefers-long-duration",
          description: "Recommends the long-duration bond.",
          weight: 2,
          required: true,
        },
        {
          id: "duration-scales-price-sensitivity",
          description: "Explains that a larger duration means a larger percentage price increase for the same drop in yield, since %ΔP ≈ −(modified duration)×Δy scales directly with duration.",
          weight: 3,
          required: true,
          misconception: {
            id: "ignores-duration-scaling-of-gain",
            description: "Recommends a bond without connecting the choice back to how duration scales the magnitude of the price response to the anticipated yield change.",
            blameConceptId: "bond-duration-and-convexity",
          },
        },
        {
          id: "acknowledges-risk-if-wrong",
          description: "Notes the flip side: if rates instead rise, the long-duration bond would lose more value than a short-duration one, so the position is a bet, not a free gain.",
          weight: 1,
        },
      ],
    },
    difficulty: 1.1,
    discrimination: 1.6,
    expectedSeconds: 160,
    prereqClosure: ["bond-duration-and-convexity"],
    source: AUTHORED,
    status: "live",
  },
  {
    id: "bond-duration-and-convexity--apply-price-change-yield-falls",
    conceptId: "bond-duration-and-convexity",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem:
      "A bond has a modified duration of 7 years and a convexity of 60. Using the duration-plus-convexity " +
      "approximation %ΔP ≈ −(modified duration)×Δy + 0.5×(convexity)×(Δy)², estimate the percentage price " +
      "change if the yield falls by 2 percentage points (Δy = −0.02). Give your answer as a percentage " +
      "(include the sign), rounded to two decimal places.",
    answerKey: 15.2,
    tolerance: 0.1,
    difficulty: 0.9,
    discrimination: 1.6,
    expectedSeconds: 160,
    prereqClosure: ["bond-duration-and-convexity"],
    source: AUTHORED,
    status: "live",
  },
];
