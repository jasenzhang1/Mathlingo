import type { Item } from "../../lib/assessment/types";
import { m, mcq, num, short } from "./qi-shared";

/**
 * Quantitative Investing, part 1: the map and the territory — securities,
 * venues and participants, and where excess returns come from (Paleologo,
 * Ch. 1). Forty questions per lesson, four at each level from 1 to 10.
 */

// ---------------------------------------------------------------------------
// markets-and-participants
// ---------------------------------------------------------------------------
const MP = "markets-and-participants";
const marketsAndParticipants: Item[] = [
  // level 1
  mcq(m(MP, "recall-lob", "recall", 1, 15, "On an exchange, the limit-order book is:"),
    "The ledger of active buy and sell orders, each with a size, direction and price, that the matching engine pairs up",
    [
      ["The list of trades already executed that day", "lob-is-tape", "Executed trades are the tape; the book holds orders still waiting."],
      ["A dealer's private inventory of positions", "lob-is-inventory", "Inventory belongs to a dealer; the book is the exchange's record of resting orders."],
      ["The register of who owns each share", "lob-is-registry", "Ownership records are kept by custodians and registrars, not the order book."],
    ]),
  mcq(m(MP, "recall-dealer", "recall", 1, 15, "A dealer differs from a broker because a dealer:"),
    "Takes the other side of the client's trade and holds the resulting position",
    [
      ["Only routes client orders to exchanges without holding risk", "dealer-broker-swap", "That describes a broker."],
      ["Is always a member of every exchange", "dealer-membership", "Exchange membership is not what separates the two roles."],
      ["Is paid only by commissions", "dealer-commission", "Dealers earn the spread; brokers earn commissions."],
    ]),
  mcq(m(MP, "recall-dark-pool", "recall", 1, 15, "A dark pool is a trading venue that:"),
    "Does not display its order book and reports trade details only after execution",
    [
      ["Trades only after the exchanges close", "dark-after-hours", "Dark pools run during the trading day; “dark” refers to the hidden book."],
      ["Is used only for illegal trading", "dark-illegal", "Dark pools are regulated alternative trading systems."],
      ["Matches only retail orders", "dark-retail", "They mainly serve institutions hiding large orders."],
    ]),
  mcq(m(MP, "recall-indexer", "recall", 1, 15, "Indexers are buy-side participants who:"),
    "Hold portfolios that replicate the composition of a benchmark index",
    [
      ["Try to beat a benchmark with a large tracking error", "indexer-active", "That is an institutional active manager."],
      ["Trade mainly to offset risk from their core business", "indexer-hedger", "That is a hedger."],
      ["Pursue absolute returns uncorrelated with the market", "indexer-hedge-fund", "That is an informed trader such as a hedge fund."],
    ]),
  // level 2
  num(m(MP, "apply-spread-bps", "apply", 2, 25, "A stock is quoted at a bid of $\\$99.98$ and an ask of $\\$100.02$. Find the quoted spread as a fraction of the mid price, in basis points."), 4),
  num(m(MP, "apply-round-trip", "apply", 2, 20, "A retail investor buys $100$ shares at the ask of $\\$50.05$ and immediately sells them at the bid of $\\$50.01$. Find the loss in dollars."), 4),
  num(m(MP, "apply-short-rebate", "apply", 2, 25, "A client is short $\\$1{,}000{,}000$ of stock. The broker pays the client SOFR minus $0.25\\%$ on the cash proceeds, and SOFR is $5\\%$. Find the client's annual interest income in dollars."), 47500),
  mcq(m(MP, "apply-otc", "apply", 2, 20, "Which of these is traded mainly over the counter rather than on an exchange?"),
    "Interest rate swaps",
    [
      ["Large-cap US stocks", "otc-stocks", "Stocks trade mainly on exchanges (and dark pools)."],
      ["Listed equity index futures", "otc-futures", "Futures are exchange-traded contracts."],
      ["Listed vanilla equity options", "otc-options", "Vanilla equity options are listed on exchanges."],
    ]),
  // level 3
  num(m(MP, "apply-margin-loan", "apply", 3, 25, "A hedge fund borrows $\\$2{,}000{,}000$ from its prime broker for one year at SOFR plus $0.5\\%$, with SOFR at $5.3\\%$. Find the interest owed in dollars."), 116000),
  num(m(MP, "apply-dealer-spread", "apply", 3, 25, "A dealer buys $1{,}000$ shares from one client at the bid of $\\$20.00$ and sells $1{,}000$ shares to another at the ask of $\\$20.04$. Find the dealer's profit in dollars."), 40),
  mcq(m(MP, "apply-pfof", "apply", 3, 20, "In payment for order flow:"),
    "Market makers pay retail brokers for routing their clients' orders to them",
    [
      ["Retail clients pay market makers to fill their orders", "pfof-direction", "Money flows from the market maker to the broker."],
      ["Exchanges pay brokers for displaying quotes", "pfof-exchange", "Exchange rebates are a different arrangement."],
      ["Brokers pay hedge funds for research", "pfof-research", "Research payments are unrelated to order routing."],
    ]),
  num(m(MP, "apply-half-spread-bps", "apply", 3, 25, "The mid price of a stock is $\\$10.00$ and a market buy order fills at $\\$10.03$. Find the cost of crossing half the spread, in basis points of the mid."), 30),
  // level 4
  num(m(MP, "apply-information-ratio", "apply", 4, 35, "An active manager returns $9\\%$ in a year when its benchmark returns $7\\%$. Its tracking error (the volatility of the tracking portfolio) is $4\\%$. Find the ratio of active return to tracking error."), 0.5),
  num(m(MP, "apply-short-pnl", "apply", 4, 40, "A fund shorts $10{,}000$ shares at $\\$50$. Over a year the price falls to $\\$45$ and the fund earns a $3\\%$ rebate on the $\\$500{,}000$ of cash proceeds. Find the total profit in dollars."), 65000),
  num(m(MP, "apply-margin-leverage", "apply", 4, 30, "A broker requires $50\\%$ initial margin on long stock positions. A client posts the minimum equity to hold $\\$1{,}000{,}000$ of stock. Find the ratio of the position's market value to the client's equity."), 2),
  mcq(m(MP, "apply-front-running", "apply", 4, 30, "Which of these is front-running?"),
    "A broker-dealer's trading desk buys a stock after learning that a client is about to place a large buy order with the broker",
    [
      ["A hedge fund buys a stock it forecasts will be added to an index at the next public rebalance", "front-run-flow", "Forecasting a public, rule-based flow is liquidity provision, not front-running."],
      ["A dealer quotes a wider spread to a client it suspects is informed", "front-run-spread", "Widening quotes is risk management, not trading ahead of known client orders."],
      ["A market maker buys after a large sell order hits the book", "front-run-after", "Trading after an order is public is not front-running."],
    ]),
  // level 5
  short(m(MP, "explain-standardization", "explain", 5, 120, "Explain why standardization of contracts tends to increase their liquidity, and name one cost of standardization."),
    [
      ["consolidation", "Standard contracts pool demand that would otherwise be scattered across bespoke products, so more buyers and sellers meet in the same contract", 2, true],
      ["process", "Standard terms make trading faster and cheaper (less bargaining, simpler settlement), which attracts participants", 1, false],
      ["cost", "Users lose the ability to customise terms they may need (e.g. bespoke CDS coupons before the 2009 ISDA Big Bang)", 1, true],
    ]),
  mcq(m(MP, "apply-dealer-information", "apply", 5, 30, "Besides the spread, dealers profit from:"),
    "Information they extract from observing their clients' order flow",
    [
      ["Commissions charged to every client", "dealer-info-commission", "Commissions are the broker's compensation."],
      ["A guaranteed return set by regulators", "dealer-info-guarantee", "Special regulatory status does not guarantee returns."],
      ["Fees from exchanges for being members", "dealer-info-fees", "Members pay exchanges, not the other way round."],
    ]),
  mcq(m(MP, "apply-retail-flow", "apply", 5, 30, "Why is retail order flow especially valuable to market makers?"),
    "Retail traders are on average uninformed, so filling them carries little adverse selection",
    [
      ["Retail orders are always very large", "retail-large", "Retail orders are typically small."],
      ["Retail investors pay higher commissions to market makers", "retail-commission", "Market makers pay for retail flow, not the reverse."],
      ["Retail trades never move prices", "retail-no-impact", "The point is the lack of information, not zero impact."],
    ]),
  num(m(MP, "apply-realized-spread", "apply", 5, 35, "A dealer quotes $\\$10.00$ bid and $\\$10.10$ ask. It buys at $\\$10.00$, the price drifts, and it later sells the shares at $\\$10.06$. Find the realized spread per share in dollars."), 0.06),
  // level 6
  short(m(MP, "explain-broker-dealer-conflict", "explain", 6, 120, "Explain the conflict of interest inside a broker-dealer and how it is held in check."),
    [
      ["conflict", "The dealer arm can profit from information the broker arm holds about client orders, e.g. by trading ahead of them (front-running)", 2, true],
      ["control", "Regulation (in the US, the Securities Exchange Act of 1934 and its rules) protects client interests and forbids such behaviour", 1, true],
    ]),
  num(m(MP, "apply-adverse-selection", "apply", 6, 45, "A dealer earns the half-spread $h$ on every trade. A fraction $0.2$ of its trades are with informed traders, on whom it loses an extra $\\$0.50$ per share. Find the break-even half-spread $h$ in dollars."), 0.1),
  num(m(MP, "apply-fees-two-twenty", "apply", 6, 45, "A hedge fund with $\\$1$ billion of assets earns a gross return of $15\\%$. It charges a $2\\%$ management fee and a $20\\%$ performance fee on gains after the management fee. Find the investors' net return in percent."), 10.4),
  mcq(m(MP, "apply-hedger", "apply", 6, 30, "Which participant is a hedger in Paleologo's sense?"),
    "An airline that buys jet-fuel futures to lock in its fuel costs",
    [
      ["A market maker that offsets its inventory with futures", "hedger-dealer", "Dealers hedge, but hedging is not their primary activity."],
      ["A hedge fund that shorts the market against its longs", "hedger-hedge-fund", "Despite the name, the fund's main activity is speculation."],
      ["A pension fund that tracks the S&P 500", "hedger-indexer", "That is an indexer."],
    ]),
  // level 7
  short(m(MP, "explain-dark-pools", "explain", 7, 150, "Why do institutional investors use dark pools, and what is the cost to the rest of the market if much volume moves there?"),
    [
      ["benefit", "Hiding a large order prevents others from seeing it and moving the price against the institution (information leakage / market impact)", 2, true],
      ["cost", "Less volume on lit venues means fewer displayed quotes, so public price discovery becomes thinner or less informative", 2, true],
    ]),
  num(m(MP, "apply-leakage-saving", "apply", 7, 40, "An institution must buy $500{,}000$ shares. If the order were displayed, other traders would push the price up by $\\$0.10$ before it fills. Executing in a dark pool avoids this. Find the saving in dollars."), 50000),
  num(m(MP, "apply-index-hugger", "apply", 7, 50, "An active fund charges $0.80\\%$ a year, while an index fund charges $0.05\\%$. The active fund's tracking error is $1\\%$. Find the ratio of active return to tracking error the active fund needs just to match the index fund after fees."), 0.75),
  mcq(m(MP, "apply-counterparty", "apply", 7, 40, "Brokers reduce bilateral settlement risk for their clients. What happens to counterparty risk?"),
    "It is transferred to the broker, which manages it by vetting clients and holding their collateral",
    [
      ["It disappears completely", "cp-vanishes", "Risk is moved, not removed."],
      ["It moves to the exchange's regulator", "cp-regulator", "Regulators don't take on trading counterparty risk."],
      ["It is passed to the retail investors on the other side", "cp-retail", "The broker stands between the parties."],
    ]),
  // level 8
  short(m(MP, "explain-dealer-vs-speculator", "explain", 8, 150, "Compare how a dealer and a speculator make money, and explain why both face adverse selection."),
    [
      ["dealer", "The dealer is passive: it responds to client demand and earns the spread (plus information from order flow)", 1, true],
      ["speculator", "The speculator actively takes positions it forecasts will gain", 1, true],
      ["adverse-selection", "Both may trade against counterparties who know more, so the trades they get are tilted toward losing ones", 2, true],
    ]),
  num(m(MP, "apply-borrow-fee", "apply", 8, 50, "A fund shorts $\\$10$ million of a hard-to-borrow stock with an annual borrow fee of $25\\%$, expecting the price to fall $5\\%$ over $3$ months. Ignoring the rebate, find the expected profit in dollars over the $3$ months."), -125000),
  num(m(MP, "apply-gross-leverage", "apply", 8, 40, "A long-short fund with $\\$100$ million of assets holds $\\$300$ million of longs and $\\$300$ million of shorts. Find its leverage, the ratio of gross market value to assets."), 6),
  mcq(m(MP, "apply-liquidity-exchange", "apply", 8, 40, "Which statement about exchange trading and liquidity is correct?"),
    "Exchange trading is neither necessary nor sufficient for liquidity: some listed assets barely trade, and some OTC markets are very liquid",
    [
      ["Every exchange-listed asset is liquid", "exch-sufficient", "Many listed securities trade minimal volumes."],
      ["Only exchange-listed assets can be liquid", "exch-necessary", "Currencies trade OTC and are among the most liquid markets."],
      ["Liquidity depends only on the asset's price level", "exch-price", "Liquidity depends on participants, standardization and costs."],
    ]),
  // level 9
  short(m(MP, "explain-pfof", "explain", 9, 180, "A retail broker routes its clients' orders to a wholesale market maker that pays for the flow. Explain how the clients can still get prices better than the exchange quote, and what concern this arrangement raises."),
    [
      ["improvement", "Uninformed flow carries little adverse selection, so the market maker can fill inside the public spread (price improvement) and still profit", 2, true],
      ["concern", "The broker has an incentive to route for payment rather than best execution, and lit markets lose the uninformed flow that narrows their spreads", 2, true],
    ]),
  short(m(MP, "transfer-short-small-caps", "transfer", 9, 180, "You launch a strategy that shorts many small-cap stocks. Which prime-broker services does it depend on, and what risks do those services introduce?"),
    [
      ["locate", "Needs the broker to locate and lend shares, at a borrow fee that can be high for small caps", 2, true],
      ["recall-risk", "Borrow can be recalled or its fee can jump (short squeeze risk), forcing the fund to cover", 1, true],
      ["margin", "Needs margin and financing; margin calls or broker risk limits can force deleveraging at bad times", 1, false],
    ]),
  num(m(MP, "apply-inventory-risk", "apply", 9, 50, "A dealer holds $100{,}000$ shares of a $\\$50$ stock whose daily return volatility is $2\\%$. Find the standard deviation of the inventory's one-day profit and loss, in dollars."), 100000),
  num(m(MP, "apply-spread-with-costs", "apply", 9, 60, "A dealer earns half-spread $h$ on each share traded. A quarter of its volume is with informed traders, on whom it loses an extra $\\$0.40$ per share, and inventory costs $\\$0.02$ per share on all volume. Find the break-even $h$ in dollars."), 0.12),
  // level 10
  short(m(MP, "judge-underperformance", "transfer", 10, 180, "A report finds that over $60\\%$ of active funds underperform their benchmark over one year. Does this show that active managers have no skill? Discuss."),
    [
      ["fees-luck", "Underperformance is measured after fees, and one-year results are dominated by noise, so it is weak evidence about skill either way", 2, true],
      ["heterogeneity", "Funds differ: those serving institutions appear to beat benchmarks while retail funds lag, and some managers are index huggers", 1, false],
      ["persistence", "Skill should show up as persistent outperformance; the lack of persistence is the more relevant evidence", 1, false],
    ]),
  short(m(MP, "judge-liquidity-nature", "transfer", 10, 180, "Is liquidity a property of a security or of the market it trades in? Argue using examples."),
    [
      ["market", "Liquidity depends on standardization, the number of participants and the trading mechanism — e.g. houses are illiquid because each is unique, Apple shares are interchangeable", 2, true],
      ["examples", "Gives examples such as a thinly traded listed stock (illiquid on an exchange) and currencies or Treasurys (liquid OTC)", 1, true],
      ["state-dependence", "Liquidity also varies over time (it can vanish in a crisis), so it is not a fixed attribute", 1, false],
    ]),
  num(m(MP, "apply-dealer-mixture", "apply", 10, 90, "A dealer's half-spread is $\\$0.05$. A fraction $\\pi$ of its trades are with informed traders, on whom it loses an extra $\\$0.30$ per share, and it pays $\\$0.01$ per share in inventory costs. Find the largest $\\pi$ for which the dealer still breaks even. Give $4$ decimal places."), 0.1333),
  mcq(m(MP, "judge-realized-spread", "transfer", 10, 60, "A dealer notices that on trades with one particular client, its realized spread is far below its quoted spread — prices keep moving in the client's favour after each trade. The most likely explanation is:"),
    "The client is informed, so the dealer is adversely selected on its flow",
    [
      ["The client trades in very small sizes", "realized-size", "Small size does not make prices move with the client."],
      ["The quoted spread is too narrow for everyone", "realized-all", "The problem is specific to one client."],
      ["The exchange's tick size is too large", "realized-tick", "Tick size affects all clients alike."],
    ]),
];

// ---------------------------------------------------------------------------
// sources-of-excess-returns
// ---------------------------------------------------------------------------
const SE = "sources-of-excess-returns";
const sourcesOfExcessReturns: Item[] = [
  // level 1
  mcq(m(SE, "recall-efficient", "recall", 1, 15, "In Malkiel's definition, a market is efficient with respect to an information set $\\Theta$ if:"),
    "Revealing $\\Theta$ to all participants would leave security prices unchanged",
    [
      ["Prices cannot be predicted using $\\Theta$", "emh-unpredictable", "Prices may be predictable; efficiency says traders cannot profit enough to move them."],
      ["Every investor earns the same return", "emh-same-return", "Efficiency is about prices and information, not equal returns."],
      ["Prices never change", "emh-static", "Prices change as new information arrives."],
    ]),
  mcq(m(SE, "recall-excess", "recall", 1, 15, "An “excess” return is a return in excess of:"),
    "A portfolio invested in risk-free assets such as short-dated Treasurys",
    [
      ["The market index", "excess-vs-market", "Return over a benchmark is an active return."],
      ["Zero", "excess-vs-zero", "That is the raw return."],
      ["The asset's own average return", "excess-vs-mean", "That is a demeaned return."],
    ]),
  mcq(m(SE, "recall-sources", "recall", 1, 15, "Which is $\\textbf{NOT}$ one of the sources of excess returns Paleologo lists?"),
    "Guaranteed returns from holding any stock long enough",
    [
      ["Compensation for bearing risk", "src-risk", "Risk is the first source he lists."],
      ["Predictable flows such as index rebalancing", "src-flows", "Predictable flows are a listed source."],
      ["Informational advantage", "src-info", "Informational advantage is a listed source."],
    ]),
  mcq(m(SE, "recall-leverage", "recall", 1, 15, "Leverage, in the sense used for intertemporal risk allocation, is the ratio of:"),
    "Gross market value of the portfolio to assets under management",
    [
      ["Net market value to gross market value", "lev-net-gross", "That measures how directional the book is."],
      ["Profit to assets under management", "lev-return", "That is a return."],
      ["Long positions to short positions", "lev-long-short", "That is a balance ratio, not leverage."],
    ]),
  // level 2
  num(m(SE, "apply-excess-return", "apply", 2, 20, "You expect the US market to return $8\\%$ next year while cash returns $2\\%$. Find the expected excess return in percent."), 6),
  num(m(SE, "apply-excess-over-vol", "apply", 2, 25, "The market's expected excess return is $6\\%$ and its volatility is $20\\%$. Find the ratio of expected excess return to volatility."), 0.3),
  num(m(SE, "apply-gmv-aum", "apply", 2, 20, "A fund has $\\$125$ million of assets and a gross market value of $\\$500$ million. Find its leverage."), 4),
  mcq(m(SE, "apply-classify-index", "apply", 2, 20, "Buying a stock ahead of its forecast addition to an index, and selling it to index funds on the effective date, exploits:"),
    "Predictable flows",
    [
      ["Pure arbitrage", "classify-arb", "The trade carries risk until the effective date; it is not riskless."],
      ["Funding constraints", "classify-funding", "Nobody here is capital-constrained."],
      ["Front-running", "classify-front-run", "The forecast uses public, rule-based information, so it is not front-running."],
    ]),
  // level 3
  num(m(SE, "apply-stub-value", "apply", 3, 30, "After the Palm IPO, 3Com's market value was $\\$28$ billion and it still owned $95\\%$ of Palm, whose market value was $\\$54$ billion. Find the implied value of 3Com's other assets, in billions of dollars. Give $1$ decimal place."), -23.3),
  num(m(SE, "apply-index-demand", "apply", 3, 25, "Index-tracking funds hold $20\\%$ of the shares of every index member. A company with $500$ million shares is added to the index. Find how many shares, in millions, the trackers must buy."), 100),
  mcq(m(SE, "apply-characteristic", "apply", 3, 20, "Which is a time series rather than a characteristic, in Paleologo's classification of data?"),
    "The VIX index",
    [
      ["A stock's free cash flow divided by its market cap", "char-quality", "That is a per-security characteristic."],
      ["A stock's return over the past six months", "char-momentum", "That is a per-security characteristic."],
      ["A stock's book-to-price ratio", "char-value", "That is a per-security characteristic."],
    ]),
  mcq(m(SE, "apply-stat-arb", "apply", 3, 20, "“Statistical arbitrage” is best described as an edge from:"),
    "Informational advantage: predicting returns using insights competitors don't have",
    [
      ["Riskless price differences across exchanges", "statarb-pure", "That is pure arbitrage; stat arb carries risk."],
      ["Holding the market portfolio", "statarb-beta", "That earns the market risk premium."],
      ["Lending securities to short sellers", "statarb-lending", "That is a broker service."],
    ]),
  // level 4
  num(m(SE, "apply-rebalance-profit", "apply", 4, 30, "A fund buys $1$ million shares at $\\$100$ ahead of an index addition and sells them at the closing auction on the effective date at a price $3\\%$ higher. Find the profit in dollars."), 3000000),
  num(m(SE, "apply-borrow-cost", "apply", 4, 35, "To trade the 3Com–Palm mispricing, a fund shorts $\\$10$ million of Palm, whose borrow fee is $60\\%$ a year. Find the borrow cost for one month in dollars."), 500000),
  num(m(SE, "apply-optimal-fraction", "apply", 4, 40, "An investor maximises $f\\mu - \\frac{\\lambda}{2}f^{2}\\sigma^{2}$, where $f$ is the fraction of wealth in the market. With expected excess return $\\mu = 0.06$, volatility $\\sigma = 0.2$ and risk aversion $\\lambda = 3$, find the optimal $f$."), 0.5),
  mcq(m(SE, "apply-after-trade", "apply", 4, 25, "Which component of the investment process happens “after the trade”?"),
    "Performance attribution",
    [
      ["Estimating expected returns", "process-alpha", "That happens before the trade."],
      ["Signal aggregation", "process-aggregation", "That happens during portfolio construction."],
      ["Transaction-cost modelling", "process-tcost", "That is developed before the trade."],
    ]),
  // level 5
  short(m(SE, "explain-predictable-not-traded", "explain", 5, 120, "An investor believes the market will return $8\\%$ against $2\\%$ for cash. Explain why that forecast alone does not justify putting all their money in the market."),
    [
      ["risk", "The forecast is uncertain: with roughly $20\\%$ volatility, the risk of the position is large relative to the expected gain", 2, true],
      ["sizing", "Position size should balance expected excess return against risk (risk aversion), giving a partial allocation", 1, false],
    ]),
  mcq(m(SE, "apply-flow-vs-front-run", "apply", 5, 30, "Providing liquidity ahead of a predictable flow differs from front-running because:"),
    "Its forecast of the flow is built from public information",
    [
      ["It carries no risk", "flowfr-riskless", "Liquidity providers hold risk until the flow arrives."],
      ["It only happens in dark pools", "flowfr-venue", "Venue is irrelevant to the distinction."],
      ["It trades in the opposite direction to the flow", "flowfr-direction", "Providers trade in the same direction ahead of the flow, then take the other side at the event."],
    ]),
  mcq(m(SE, "apply-funding", "apply", 5, 30, "A small fund is confident that assets sold off in a deleveraging spiral will rebound, but cannot buy because it lacks margin capital and needs a loss buffer. This illustrates:"),
    "A funding constraint limiting the exploitation of information",
    [
      ["Market efficiency", "funding-efficient", "The forecast may be right; the fund cannot act on it."],
      ["A risk premium", "funding-risk-premium", "The binding issue is capital, not risk preference."],
      ["Pure arbitrage", "funding-arb", "The trade is risky, not riskless."],
    ]),
  num(m(SE, "apply-flow-risk", "apply", 5, 40, "A liquidity provider holds $\\$50$ million of a stock for $5$ days before an index rebalance. The stock's daily idiosyncratic volatility is $3\\%$ and days are independent. Find the standard deviation of the profit and loss over the $5$ days, in millions of dollars. Give $2$ decimal places."), 3.35),
  // level 6
  short(m(SE, "explain-classify-strategies", "explain", 6, 150, "Classify the main edge behind each strategy: (a) buying a stock on one exchange and selling it on another at a higher price simultaneously; (b) holding a diversified portfolio of value stocks; (c) buying stocks forced out of an index by a rule change."),
    [
      ["arbitrage", "(a) is pure arbitrage (riskless if both legs fill)", 1, true],
      ["risk", "(b) is mainly compensation for risk (a risk premium), possibly with behavioural mispricing", 1, true],
      ["flow", "(c) is predictable flow / liquidity provision to forced sellers", 1, true],
    ]),
  num(m(SE, "apply-net-alpha", "apply", 6, 35, "A signal predicts a $50$ basis-point excess return on a stock that costs $30$ basis points to trade each way. Find the net expected return of the round trip, in basis points."), -10),
  num(m(SE, "apply-break-even-cost", "apply", 6, 40, "A strategy turns its portfolio over $20$ times a year (each turnover is a full round trip) and has a gross expected return of $12\\%$ a year. Find the largest one-way trading cost, in basis points, at which it still breaks even."), 30),
  mcq(m(SE, "apply-during-trade", "apply", 6, 25, "Which decision is made “during the trade”?"),
    "How to combine many forecasts of the same asset's return into one signal",
    [
      ["How to split realised profit into its sources", "during-attribution", "That is attribution, after the trade."],
      ["How to model the covariance of returns", "during-risk", "Risk models are built before the trade."],
      ["How much leverage to run next quarter", "during-leverage", "Intertemporal risk allocation comes after the trade in the book's scheme."],
    ]),
  // level 7
  short(m(SE, "explain-3com-palm", "explain", 7, 150, "In 2000, 3Com's market value implied that its non-Palm assets were worth about $-\\$22$ billion. Explain why arbitrageurs did not immediately close the mispricing."),
    [
      ["borrow", "Shorting Palm required borrowing shares, which were scarce, so borrow fees were very high or shares unavailable", 2, true],
      ["limits", "So the trade was costly and risky to hold (fees, recall risk, possibly widening mispricing) — a liquidity limit to arbitrage", 1, true],
    ]),
  num(m(SE, "apply-funding-capacity", "apply", 7, 45, "A fund has $\\$10$ million of equity. Its broker requires margin of $25\\%$ of gross market value, and the fund keeps $40\\%$ of its equity unused as a loss buffer. Find the largest gross market value it can hold, in millions of dollars."), 24),
  mcq(m(SE, "apply-risk-premium", "apply", 7, 40, "Which explanation of a strategy's returns is a risk-based one?"),
    "Its returns are compensation for losing money in bad states of the world, when investors most need wealth",
    [
      ["Its returns come from trading ahead of index funds", "rp-flow", "That is predictable flow."],
      ["Its returns come from better data on company sales", "rp-info", "That is informational advantage."],
      ["Its returns come from simultaneous price differences across venues", "rp-arb", "That is pure arbitrage."],
    ]),
  num(m(SE, "apply-inclusion-ev", "apply", 7, 40, "You estimate a $70\\%$ chance a stock is added to an index. If added, it gains $5\\%$ by the effective date; if not, it loses $2\\%$. Find the expected return in percent."), 2.9),
  // level 8
  short(m(SE, "explain-liquidity-premium", "explain", 8, 150, "Why can providing liquidity earn a premium, and when does that premium turn into a large loss?"),
    [
      ["premium", "Liquidity demanders (forced or impatient traders) pay a price concession to trade immediately; the provider is paid for holding inventory risk", 2, true],
      ["failure", "In deleveraging spirals or crises many need to sell at once; prices keep falling and providers with limited capital face losses and forced selling", 2, true],
    ]),
  num(m(SE, "apply-program-sharpe", "apply", 8, 50, "A fund trades $20$ independent index events a year, each with an expected profit of $\\$100{,}000$ and standard deviation $\\$400{,}000$. Find the ratio of the annual expected profit to its standard deviation. Give $2$ decimal places."), 1.12),
  mcq(m(SE, "apply-intertemporal", "apply", 8, 30, "Which pipeline component answers “how much risk should I run this year versus next”?"),
    "Intertemporal volatility allocation and leverage",
    [
      ["Hedging", "intertemporal-hedging", "Hedging removes unwanted exposures within a period."],
      ["Signal aggregation", "intertemporal-signal", "That combines forecasts, not risk across time."],
      ["Performance attribution", "intertemporal-attribution", "That analyses past PnL."],
    ]),
  num(m(SE, "apply-ev-with-probability", "apply", 8, 50, "You forecast an index deletion with probability $0.6$: if deleted, a stock you short falls $8\\%$; if not, it rises $3\\%$. The borrow fee over the holding period is $0.5\\%$. Find the expected return of the short, in percent."), 3.1),
  // level 9
  short(m(SE, "transfer-decompose-edge", "transfer", 9, 180, "A fund buys stocks with high recent analyst-estimate upgrades and shorts those with downgrades. Describe how you would argue which of the five sources of excess return explains its profits, and what evidence would distinguish them."),
    [
      ["hypotheses", "Names plausible sources: informational advantage (faster/better use of revisions), risk compensation, or flows (e.g. funds chasing upgrades)", 2, true],
      ["evidence", "Proposes evidence such as exposure to known risk factors, crash behaviour in bad states, decay speed after the signal, or capacity/costs", 2, true],
    ]),
  short(m(SE, "explain-efficiency-definition", "explain", 9, 150, "Malkiel's definition says prices would be unaffected by revealing $\\Theta$ to everyone. Explain why this is consistent with returns being partly predictable from $\\Theta$."),
    [
      ["no-profit", "Efficiency means no one can make economic profits trading on $\\Theta$, not that $\\Theta$ has no predictive power", 2, true],
      ["frictions", "Predictability can remain because of risk, liquidity, funding or cost limits that stop traders pushing prices all the way", 2, true],
    ]),
  num(m(SE, "apply-latency-arb", "apply", 9, 60, "A stock is $\\$100.00$ on one exchange and $\\$100.03$ on another. Fees are $\\$0.01$ per share per leg. You trade $10{,}000$ shares; both legs fill with probability $0.6$, otherwise you unwind one leg at a loss of $\\$0.05$ per share. Find the expected profit in dollars."), -140),
  mcq(m(SE, "apply-unstructured", "apply", 9, 30, "Which of these is unstructured data?"),
    "Earnings-call transcripts",
    [
      ["Daily closing prices", "unstructured-prices", "Prices are structured numerical data."],
      ["Industry membership codes", "unstructured-categorical", "Categorical codes in a table are structured."],
      ["Analyst rankings of stocks", "unstructured-ordinal", "Ordinal rankings in tabular form are structured."],
    ]),
  // level 10
  short(m(SE, "judge-risk-vs-information", "transfer", 10, 180, "Paleologo notes that the line between being paid for risk and holding an informational edge is usually unclear. Discuss this using the momentum strategy (buying recent winners and shorting recent losers) as an example."),
    [
      ["risk-story", "A risk story: momentum earns a premium for occasional severe crashes (e.g. sharp reversals after market rebounds)", 2, true],
      ["information-story", "An information/behavioural story: investors underreact to news, so recent winners keep winning — exploiting others' slow processing", 1, true],
      ["indistinguishable", "Both stories predict the same average profit, so returns alone cannot separate them; one needs crash timing, decay, or cross-sectional tests", 1, false],
    ]),
  short(m(SE, "judge-index-cost", "transfer", 10, 180, "Index investing is called cheap, yet Paleologo notes that buyers of index products bear an indirect cost from rebalancing. Explain the cost and who earns it."),
    [
      ["mechanism", "Index funds must buy additions and sell deletions at known times (often at the close of the effective date), so others buy before and sell to them at inflated prices", 2, true],
      ["who", "Liquidity providers and informed traders who anticipate the reconstitution earn the price concession, which is a hidden cost borne by index holders", 2, true],
    ]),
  num(m(SE, "apply-optimal-with-cost", "apply", 10, 90, "An investor maximises $f\\mu - c|f| - \\frac{\\lambda}{2}f^{2}\\sigma^{2}$ over the fraction $f \\ge 0$ held in a stock, where $c$ is a one-off trading cost per unit held. With $\\mu = 0.06$, $c = 0.01$, $\\sigma = 0.2$ and $\\lambda = 3$, find the optimal $f$. Give $4$ decimal places."), 0.4167),
  mcq(m(SE, "judge-persistent-anomaly", "transfer", 10, 60, "A well-published anomaly keeps earning returns long after academics documented it. Which explanation is most consistent with an efficient market?"),
    "Its returns compensate investors for a risk or a liquidity cost that remains after publication",
    [
      ["Investors have not read the papers", "anomaly-ignorance", "Ignorance is an inefficiency explanation, and implausible for professional investors."],
      ["The anomaly is pure arbitrage", "anomaly-arb", "Pure arbitrage would be competed away quickly."],
      ["Publication guarantees the returns will continue", "anomaly-guarantee", "Publication usually shrinks anomaly returns."],
    ]),
];

export const qi01Items: Item[] = [...marketsAndParticipants, ...sourcesOfExcessReturns];
