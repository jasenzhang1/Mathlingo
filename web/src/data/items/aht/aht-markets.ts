import type { Item } from "../../../lib/assessment/types";
import { chapter } from "./shared";

/** Ch. 1: electronic markets, their participants, and the limit order book (40 items per lesson). */

const EMP = "electronic-markets-and-participants";
const LOB = "limit-order-book";
const c1 = chapter("Ch. 1, Electronic Markets and the Limit Order Book (§1.1–1.3.3)");
const c1b = chapter("Ch. 1, Electronic Markets and the Limit Order Book (§1.3.4–1.4)");

const participants: Item[] = [
  // level 1
  c1.m(EMP, "recall-ordinary-shares", 1, "An ordinary share (common stock) gives its holder:",
    "A claim on a share of the firm’s profits and the right to vote at shareholder meetings", [
      ["A fixed coupon and priority over equity in liquidation", "That describes a bond."],
      ["A fixed dividend but no vote", "That describes preferred stock."],
      ["A basket of other securities on redemption", "That describes an ETF creation unit."],
    ]),
  c1.m(EMP, "recall-three-classes", 1, "The book’s three primary classes of trader are:",
    "Fundamental (noise or liquidity) traders, informed traders, and market makers", [
      ["Buyers, sellers and brokers", "Buyers and sellers describe a side of a trade, not a motive."],
      ["Retail, institutional and government traders", "That classifies by identity; the book classifies by why they trade."],
      ["Hedgers, speculators and arbitrageurs only", "Arbitrageurs are folded into informed traders, and market makers are missing."],
    ]),
  c1.m(EMP, "recall-closed-end", 1, "A closed-end fund:",
    "Issues a fixed number of shares once, which then trade on an exchange and cannot be redeemed with the fund", [
      ["Creates and redeems shares daily at NAV", "That is an open-end fund."],
      ["Can only be bought by accredited investors", "That describes a hedge fund."],
      ["Always trades exactly at its net asset value", "With no creation or redemption, its price can drift away from NAV."],
    ]),
  c1.m(EMP, "recall-colocation", 1, "Colocation means:",
    "Renting server space next to the exchange’s matching engine, so orders reach it with minimal latency", [
      ["Listing the same stock on two exchanges", "That is cross-listing."],
      ["Routing an order to several venues at once", "That is order routing across a fragmented market."],
      ["Two traders sharing an account", "Colocation is about physical proximity to the matching engine."],
    ]),

  // level 2
  c1.m(EMP, "recall-preferred", 2, "Preferred stock is a hybrid because holders:",
    "Have no vote and receive a pre-arranged income, yet are legally equity, junior to all debt", [
      ["Have a vote and priority over bondholders", "Preferred holders usually have no vote, and all debt is senior to equity."],
      ["Can convert their shares into the fund’s basket", "That is ETF redemption in kind."],
      ["Receive income with the same guarantees as a bond", "Their income has fewer guarantees because it is treated as equity."],
    ]),
  c1.m(EMP, "recall-mo-lo", 2, "A market order (MO) differs from a limit order (LO) in that an MO:",
    "Seeks immediate execution at the best available price, while an LO waits at a chosen price for a counterparty", [
      ["Can only be sent during auctions", "MOs are the standard aggressive order in continuous trading."],
      ["Guarantees a better price than an LO", "An MO pays the spread and may walk the book; it buys immediacy, not price."],
      ["Is hidden from the order book", "LOs rest in the book; MOs execute against them immediately."],
    ]),
  c1.m(EMP, "recall-price-time", 2, "Under price–time priority, an incoming buy MO is matched first against:",
    "The lowest-priced sell LOs, and among those at that price, the oldest", [
      ["The largest sell LOs at any price", "Size gives no priority under price–time rules."],
      ["The most recent sell LOs", "Time priority favours the earliest orders."],
      ["Sell LOs in proportion to their size", "That is a pro-rata rule."],
    ]),
  c1.n(EMP, "apply-pro-rata", 2,
    "A pro-rata market has three sell LOs at the best ask, for $200$, $400$ and $600$ shares. A buy MO for $300$ shares arrives. How many shares does the $400$-share order fill?",
    100),

  // level 3
  c1.n(EMP, "apply-time-priority-fill", 3,
    "Under price–time priority, three sell LOs rest at the best ask in arrival order: $200$, $100$ and $300$ shares. A buy MO for $250$ shares arrives. How many shares of the second LO execute?",
    50),
  c1.m(EMP, "apply-lit-dark", 3, "The book distinguishes lit from dark markets by whether:",
    "Limit order book information is publicly displayed", [
      ["Trading happens during daylight hours", "The terms are about transparency, not trading hours."],
      ["The venue is a regulated exchange", "Some lit venues are ECNs, not exchanges; the line is information, not legal status."],
      ["Market orders are allowed", "Dark pools also match incoming orders, typically at the lit midprice."],
    ]),
  c1.m(EMP, "apply-level-book", 3, "NASDAQ reports an order-based book, while some markets use a level-book method. What can you do with order-based data that you cannot with level-book data?",
    "Match each cancellation or execution to the specific limit order it affects, via its order ID", [
      ["See hidden orders", "Hidden orders are not displayed in either format."],
      ["Observe market orders directly", "MOs are inferred from executions against LOs in both formats."],
      ["Know the identity of every trader", "Participant IDs are usually missing from public feeds."],
    ]),
  c1.n(EMP, "apply-pro-rata-largest", 3,
    "A pro-rata market has buy LOs of $1{,}000$, $1{,}500$ and $2{,}500$ shares at the best bid. A sell MO for $500$ shares arrives. How many shares does the largest LO fill?",
    250),

  // level 4
  c1.m(EMP, "apply-auctions", 4, "Exchanges commonly use auctions rather than continuous matching:",
    "At the open, at the close, and when trading resumes after a halt", [
      ["Only for illiquid stocks", "Opening and closing auctions are used for liquid stocks too."],
      ["Whenever the spread exceeds one tick", "Spreads wider than a tick are routine in continuous trading."],
      ["Never in modern electronic markets", "Opening and closing auctions are standard."],
    ]),
  c1.m(EMP, "apply-trade-through", 4, "US trade-through (order-protection) rules mean that an MO which would walk the book at one venue:",
    "Must first be re-routed to other venues displaying the same best price before it can trade at worse prices", [
      ["Is cancelled", "Only an immediate-or-cancel order is cancelled; protection re-routes the remainder."],
      ["Executes entirely at the next price level", "Better prices elsewhere must be taken first."],
      ["Is held until the next auction", "Continuous trading continues; the order is routed."],
    ]),
  c1.n(EMP, "apply-fibre-latency", 4,
    "Light in optical fibre travels at about $200{,}000$ km/s. What is the one-way latency, in milliseconds, of a $1{,}200$ km fibre link?",
    6),
  c1.s(EMP, "explain-colocation-regulation", 4,
    "Why do exchanges offer colocation, and why does it concern regulators?",
    "Explains that exchanges monetise the demand for speed, giving all colocated clients identical hardware and cable lengths so they receive uniform, fast access to the matching engine.",
    "Notes the concern: anyone not colocated is always slower, so regulators must keep access to colocation competitive and fair."),

  // level 5
  c1.m(EMP, "apply-mm-not-liquidity", 5, "Which statement reflects the book’s warning about a “common error”?",
    "Market makers sometimes take liquidity, and informed traders sometimes provide it with passive orders", [
      ["Market makers always provide liquidity and informed traders always take it", "That is precisely the error the book warns against."],
      ["Noise traders never use limit orders", "Liquidity traders can use either order type."],
      ["Liquidity provision is always unprofitable", "Market makers earn the spread for providing it."],
    ]),
  c1.s(EMP, "explain-fundamental-as-noise", 5,
    "A pension fund rebalancing toward value stocks bases its trades on detailed fundamental analysis. Why might a high-frequency algorithm sensibly treat its orders as noise trades?",
    "Explains that its decisions come from long-horizon portfolio and risk–return considerations that carry little information about price moves within the algorithm’s short horizon.",
    "Adds the exception: if the fund trades on information with short-term impact, such as the known size of a large position change, it belongs with informed traders."),
  c1.m(EMP, "apply-us-venues", 5, "A trader in US equities around 2014 faced roughly:",
    "A dozen lit exchanges and more than $40$ dark venues", [
      ["One national exchange", "US equity trading is highly fragmented."],
      ["Two exchanges, NYSE and NASDAQ, and nothing else", "There were many more lit and dark venues."],
      ["Hundreds of lit exchanges", "There were about a dozen lit exchanges; the dark venues were more numerous."],
    ]),
  c1.n(EMP, "apply-pro-rata-vs-fifo", 5,
    "At the best bid there are $4{,}000$ shares, $1{,}000$ of them yours, posted last. A sell MO for $2{,}000$ shares arrives. How many shares would you fill under a pro-rata rule? (Under price–time priority you would fill none.)",
    500),

  // level 6
  c1.s(EMP, "explain-pro-rata-incentives", 6,
    "How do the incentives of liquidity providers differ under pro-rata matching versus price–time priority?",
    "Explains that price–time priority rewards being first in the queue, so it fuels a race for speed and early posting.",
    "Explains that pro-rata rewards posted size, so traders may oversize their orders to win a bigger share of each fill, accepting the risk of being filled for more than they want."),
  c1.n(EMP, "apply-queue-position", 6,
    "Under price–time priority, $3{,}000$ shares rest ahead of your $500$-share buy LO at the best bid, and no new orders join or cancel. Sell MOs totalling $3{,}200$ shares then arrive. How many of your shares are filled?",
    200),
  c1.m(EMP, "apply-designated-mm", 6, "Some markets give extra priority to orders from a designated market maker. The usual trade-off is that the designated market maker:",
    "Accepts obligations, such as continuous two-sided quoting, in exchange for priority", [
      ["Pays no fees and has no obligations", "Priority is granted in return for obligations."],
      ["Can trade ahead of incoming MOs at better prices", "Priority applies within the matching rules; it does not license front-running."],
      ["Is anonymous to the exchange", "Designated status requires the exchange to know who it is."],
    ]),
  c1.m(EMP, "apply-informed-trade", 6, "Which trade most likely carries short-term information about price moves?",
    "An aggressive buy timed just after a government data release, from a trader who processes news feeds", [
      ["A pension fund’s monthly rebalancing", "That is driven by portfolio considerations, so it is noise at short horizons."],
      ["An ETF buying index constituents to track the S&P 500", "Index tracking is mechanical, not information-driven."],
      ["A household selling shares to pay tuition", "That is a liquidity trade."],
    ]),

  // level 7
  c1.s(EMP, "explain-closed-end-discount", 7,
    "Why can a closed-end fund trade at a price different from its net asset value, while an ETF usually trades close to its NAV?",
    "Explains that closed-end fund shares cannot be created or redeemed after the IPO, so nothing forces their market price toward NAV; it is set by supply and demand among investors.",
    "Explains that ETFs allow creation and redemption of large creation units in kind, so arbitrageurs buy cheap ETF shares and redeem them (or create and sell expensive ones), pinning the price near NAV."),
  c1.m(EMP, "apply-etf-arbitrage", 7, "An ETF trades well above the value of its underlying basket. An authorised participant will typically:",
    "Buy the basket, deliver it for a new creation unit, and sell the ETF shares", [
      ["Buy ETF shares and redeem them", "That profits when the ETF is cheap relative to the basket."],
      ["Wait for the fund to buy back shares at NAV", "ETFs are not obliged to buy shares back for cash."],
      ["Do nothing, since ETF prices cannot be arbitraged", "Creation and redemption exist precisely to allow this arbitrage."],
    ]),
  c1.n(EMP, "apply-etf-arbitrage-profit", 7,
    "An ETF trades at \\$100.40 while its basket is worth \\$100.00 per ETF share. Creating one unit of $50{,}000$ shares costs \\$0.10 per share in fees and trading costs. What is the arbitrage profit, in dollars, from creating one unit and selling it at \\$100.40?",
    15000),
  c1.s(EMP, "explain-hedge-funds", 7,
    "How do hedge funds differ from mutual funds, and why do they matter for exchange trading even though their shares are not exchange-traded?",
    "Explains that hedge funds face lighter regulation and transparency requirements, pursue more aggressive strategies, and are open mainly to accredited investors.",
    "Notes that their managers trade heavily on exchanges as proprietary traders exploiting perceived advantages, so they are a large part of the order flow algorithms meet."),

  // level 8
  c1.n(EMP, "apply-rerouting-average", 8,
    "A sell MO for $250$ shares reaches a venue whose best bid of \\$23.09 has $200$ shares. Order protection re-routes $25$ shares to other venues also bidding \\$23.09; the last $25$ shares return and execute at \\$23.08. What is the average execution price? Give $3$ decimal places.",
    23.089),
  c1.s(EMP, "explain-trade-through-effects", 8,
    "What are the practical consequences of US trade-through rules for how large market orders appear in the data and for execution quality in stressed markets?",
    "Explains that large MOs are rarely seen walking one book; instead they are chopped up and executed across several venues in rapid succession.",
    "Notes the risk in stressed markets: as depth disappears (as in the Flash Crash), an order late in a sequence can execute at very poor prices, even against stub quotes."),
  c1.m(EMP, "apply-level-book-limits", 8, "You want to measure how long limit orders rest before being cancelled. Which data source makes this possible?",
    "Order-based message data, where each LO has an ID linking it to its later cancellation", [
      ["Level-book data", "Level-book messages update price levels without tracking individual orders."],
      ["Trade and quote (TAQ) best-price data", "Best quotes alone cannot follow individual orders."],
      ["Daily closing prices", "These say nothing about individual orders."],
    ]),
  c1.s(EMP, "explain-order-type-knowledge", 8,
    "Why does the book insist that algorithm designers know every order type available on every venue where their asset trades?",
    "Explains that exchange-level order types (pegging, hide-not-slide, post-only and others) are adjusted inside the matching engine, so no trader’s code can beat them on latency.",
    "Notes that ignorance of these types and their priority rules can produce significant losses, because other traders use them to gain queue position or avoid adverse fills."),

  // level 9
  s9("transfer-venue-choice"),
  c1.s(EMP, "transfer-participant-mix", 9,
    "You run a market-making algorithm on a stock that suddenly attracts many informed traders after a merger rumour. Using the book’s classification of participants, explain what changes for you and how your quoting should respond.",
    "Explains that a larger share of informed counterparties means more adverse selection: fills increasingly come just before prices move against the market maker.",
    "Proposes widening quotes, reducing posted size or quoting less aggressively, and anticipates the Glosten–Milgrom result that spreads rise with the prevalence of informed trading."),
  c1.m(EMP, "transfer-dark-pool-tradeoff", 9, "A large seller considers a dark pool that crosses orders at the lit midprice. The central trade-off is:",
    "Saving the spread and avoiding visible price impact, at the cost of uncertain execution", [
      ["Lower fees but a worse price than the lit bid", "Midpoint crossing gives a better price than the bid."],
      ["Guaranteed execution but higher impact", "Dark execution is uncertain, and its appeal is lower impact."],
      ["No trade-off, because dark pools dominate lit markets", "Execution risk is the price of the dark pool’s benefits."],
    ]),
  c1.s(EMP, "transfer-latency-value", 9,
    "Microwave links carry messages from Chicago to New Jersey about $2$–$3$ ms faster than fibre. In a market where quotes change every few milliseconds, explain who gains from that speed advantage and at whose expense.",
    "Explains that faster traders can react to information (for example futures price moves) before slower participants update their quotes, picking off stale limit orders.",
    "Identifies the losers as slower liquidity providers, who face more adverse selection and so widen spreads, and notes the regulatory debate this fuels."),

  // level 10
  c1.s(EMP, "transfer-fragmentation-measurement", 10,
    "You measure liquidity for a US stock using NASDAQ data alone, where NASDAQ handles about $20\\%$ of volume. What can go wrong, and how would you design a better measurement?",
    "Explains that one venue’s book misses depth, trades and hidden liquidity elsewhere, so spreads, depth and price impact estimated from it can be biased, and order flow seen on one venue is a noisy proxy for total demand.",
    "Proposes consolidating feeds across lit venues (the national best bid and offer and consolidated volume), accounting for dark and hidden volume, and checking that conclusions are robust to venue."),
  c1.s(EMP, "transfer-flash-crash", 10,
    "During the Flash Crash some market orders executed against stub quotes. Explain the mechanism, and propose two safeguards an execution algorithm should use.",
    "Explains that as liquidity providers withdrew, depth vanished across venues; routed MOs walked through what remained and hit stub quotes, limit orders posted at absurd prices never meant to execute.",
    "Proposes safeguards such as using marketable limit orders with price limits instead of pure MOs, immediate-or-cancel orders, pausing when depth or spreads breach thresholds, and price collars relative to recent prices."),
  c1.s(EMP, "transfer-closing-auction", 10,
    "An index fund must buy a large amount of stock at the closing price on rebalancing day. Compare executing in the closing auction with trading continuously through the afternoon, using the market-structure ideas of this chapter.",
    "Explains that the closing auction concentrates liquidity at one price that matches the fund’s benchmark (the close), avoiding tracking error and the spread and walking costs of continuous trading.",
    "Weighs the risks: a large imbalance published before the auction can move the closing price, other traders may position ahead of predictable index demand, and splitting between the auction and continuous trading hedges these effects."),
  c1.m(EMP, "transfer-mm-competition", 10, "Exchange design moves from price–time priority to pro-rata matching. Which consequence is most likely?",
    "Less spending on speed to win queue position and more oversized quoting, changing how displayed depth should be interpreted", [
      ["Displayed depth becomes a more reliable measure of willingness to trade", "Oversizing makes displayed depth less reliable."],
      ["Spreads necessarily widen", "The effect on spreads is ambiguous; queue incentives change, not necessarily spreads."],
      ["Market makers disappear", "Market making continues under different priority incentives."],
    ]),
];

function s9(slug: string): Item {
  return c1.s(EMP, slug, 9,
    "A strategy posts small passive orders and relies on early queue position to be filled before prices move. Would you rather run it on a price–time or a pro-rata venue? Justify, including what you would monitor.",
    "Chooses price–time priority, where early posting secures queue position, whereas on a pro-rata venue a small order gets only a small share of each fill however early it arrives.",
    "Mentions monitoring queue position, fill rates and the adverse selection of fills (being filled mainly just before the price moves against you), and the latency needed to keep queue position.");
}

const book: Item[] = [
  // level 1
  c1b.m(LOB, "recall-spread", 1, "The quoted spread is:",
    "The best ask minus the best bid", [
      ["The best ask plus the best bid, divided by two", "That is the midprice."],
      ["The difference between the last two trade prices", "That is a price change, not the spread."],
      ["The fee an exchange charges per share", "Fees are separate from the spread."],
    ]),
  c1b.m(LOB, "recall-midprice", 1, "The midprice is:",
    "The average of the best bid and the best ask", [
      ["The last traded price", "Trades occur at the bid or ask, not the mid."],
      ["The volume-weighted average of all posted prices", "The midprice uses only the best quotes."],
      ["The best bid", "The bid is one side of the spread."],
    ]),
  c1b.m(LOB, "recall-iceberg", 1, "An iceberg order:",
    "Displays only part of its quantity, replenishing the visible part as it fills", [
      ["Hides its entire quantity", "That is a hidden order."],
      ["Executes in full or not at all", "That is fill-or-kill."],
      ["Is cancelled at a fixed time", "That is good-till-time."],
    ]),
  c1b.m(LOB, "recall-maker-taker", 1, "Under a maker–taker fee schedule:",
    "The trader whose MO takes liquidity pays a fee, while the trader whose LO is filled pays less or receives a rebate", [
      ["Both sides pay the same fee", "Maker–taker distinguishes liquidity providers from takers."],
      ["The liquidity provider pays more than the taker", "That is the inverted, taker–maker schedule."],
      ["Only cancelled orders are charged", "Fees are charged on executions."],
    ]),

  // level 2
  c1b.n(LOB, "apply-quoted-spread", 2,
    "The best bid is \\$21.15 and the best ask is \\$21.16. What is the quoted spread in cents?",
    1),
  c1b.n(LOB, "apply-midprice", 2,
    "The best bid is \\$23.09 and the best ask is \\$23.12. What is the midprice? Give $3$ decimal places.",
    23.105),
  c1b.m(LOB, "recall-ioc", 2, "An immediate-or-cancel (IOC) order:",
    "Executes as much as possible at the best price and cancels the rest, without re-routing or walking the book", [
      ["Executes its full size or nothing", "That is fill-or-kill."],
      ["Rests in the book until the end of the day", "That is a day order."],
      ["Moves with the midpoint", "That is a pegged order."],
    ]),
  c1b.m(LOB, "recall-locked", 2, "A market is locked when:",
    "The best bid equals the best ask, so the spread is zero", [
      ["Trading is halted", "A halt stops trading; a locked market is about quotes."],
      ["The bid exceeds the ask", "That is a crossed market."],
      ["The book is empty", "An empty book has no quotes at all."],
    ]),

  // level 3
  c1b.n(LOB, "apply-walk-book", 3,
    "A buy MO for $500$ shares meets an ask side with $200$ shares at \\$50.00, $200$ at \\$50.01 and $300$ at \\$50.02. What is its average execution price? Give $3$ decimal places.",
    50.008),
  c1b.n(LOB, "apply-microprice", 3,
    "The microprice weights each best quote by the volume on the opposite side: $S^{\\mu} = \\frac{V^{b}P^{a} + V^{a}P^{b}}{V^{b} + V^{a}}$. With bid \\$10.00 (volume $300$) and ask \\$10.02 (volume $100$), compute it. Give $3$ decimal places.",
    10.015),
  c1b.n(LOB, "apply-tick-bps", 3,
    "A stock trades near \\$454.30 with a one-cent tick. How many basis points is one tick? Give $2$ decimal places.",
    0.22),
  c1b.m(LOB, "apply-microprice-meaning", 3, "When the bid queue is much larger than the ask queue, the microprice:",
    "Lies closer to the ask than to the bid, reflecting buying pressure", [
      ["Lies closer to the bid", "The weights put more weight on the price opposite the larger queue."],
      ["Equals the midprice", "It equals the mid only when the two queues are equal."],
      ["Is undefined", "It is defined whenever both queues are non-empty."],
    ]),

  // level 4
  c1b.n(LOB, "apply-walk-book-impact", 4,
    "Same book: $200$ shares at \\$50.00, $200$ at \\$50.01 and $300$ at \\$50.02, with the best bid at \\$49.99. By how many cents does the average price of the $500$-share buy MO exceed the midprice?",
    1.3),
  c1b.n(LOB, "apply-maker-taker-net", 4,
    "Under maker–taker fees, a taker pays $0.30$ cents per share and a maker receives a $0.20$ cent rebate. A buy MO lifts a sell LO at \\$20.01. What net price per share, in dollars, does the maker receive? Give $3$ decimal places.",
    20.012),
  c1b.m(LOB, "apply-fees-distort", 4, "Why do exchange fees matter when interpreting observed prices?",
    "The economically relevant price is the net price after fees and rebates, which differs from the quoted price and by venue", [
      ["Fees are always included in quoted prices", "Quotes are gross of fees."],
      ["Fees only matter for retail traders", "Fees matter most for high-volume traders working on thin margins."],
      ["Fees affect only cancelled orders", "Fees are charged on executions."],
    ]),
  c1b.n(LOB, "apply-relative-spread", 4,
    "A stock has a median quoted spread of $12$ cents and a median midprice of \\$40.62. What is the quoted spread in basis points? Give $1$ decimal place.",
    29.5),

  // level 5
  c1b.m(LOB, "apply-liquid-vs-illiquid", 5, "Compared with a liquid stock, the LOB of an illiquid stock typically shows:",
    "A wide spread, thin depth and irregular gaps between occupied price levels", [
      ["A one-tick spread with orders at every tick", "That describes a liquid stock such as HPQ in the book’s example."],
      ["More events per minute", "Illiquid stocks reach any given event count much later in the day."],
      ["More depth in dollar terms", "Depth is thinner in both shares and dollars."],
    ]),
  c1b.n(LOB, "apply-dollar-depth", 5,
    "Stock A trades near \\$21 with $1{,}000$ shares in the top two levels; stock B trades near \\$41 with $90$ shares there. How many times larger is A’s dollar depth in those levels than B’s? Give $1$ decimal place.",
    5.7),
  c1b.m(LOB, "apply-hidden-priority", 5, "Hidden orders matter for a trader who reads the visible book because:",
    "Incoming MOs can execute against hidden liquidity at or inside the displayed quotes, so the visible book understates available depth", [
      ["Hidden orders always trade after all visible orders", "They may trade ahead of visible orders at better prices."],
      ["Hidden orders cannot execute against MOs", "They do execute; they are just not displayed."],
      ["Hidden orders widen the quoted spread", "They are not displayed, so they cannot widen the visible spread."],
    ]),
  c1b.s(LOB, "explain-pegged", 5,
    "What do pegged and discretionary orders do, and why can’t a trader replicate them from her own servers?",
    "Explains that pegged orders move automatically with the midpoint or national best price, and discretionary orders display one price but can execute at more aggressive hidden prices.",
    "Explains that these adjustments happen inside the exchange’s matching engine, so any outside attempt to cancel and repost would be slower."),

  // level 6
  c1b.n(LOB, "apply-sweep-size", 6,
    "The ask side has $150$ shares at \\$30.00, $250$ at \\$30.01 and $400$ at \\$30.02. What is the largest buy MO that keeps the average price at or below \\$30.01? Assume shares fill in book order.",
    550),
  c1b.n(LOB, "apply-queue-after-cancel", 6,
    "You post a $300$-share buy LO at the best bid behind $2{,}500$ shares. Then $800$ shares ahead of you are cancelled and sell MOs for $1{,}900$ shares arrive. How many of your shares are filled?",
    200),
  c1b.m(LOB, "apply-inverted-fees", 6, "On a taker–maker (inverted) venue, who is most attracted to route orders there?",
    "Traders who want to take liquidity, since they pay less or are rebated", [
      ["Passive liquidity providers", "Under inverted fees, providers pay the higher fee."],
      ["Nobody, since inverted venues have no volume", "Inverted venues attract takers and providers who value queue position."],
      ["Only dark pool participants", "Fee schedules apply to lit venues."],
    ]),
  c1b.s(LOB, "explain-walking-impact", 6,
    "Explain why an MO that walks the book pays more than the spread, and how this motivates splitting a large order into child orders.",
    "Explains that once the best level is exhausted, the remainder executes at successively worse prices deeper in the book, so the average price moves away from the best quote by an amount that grows with order size.",
    "Notes that splitting the order over time lets the book replenish between child orders, trading off lower walking cost against the price risk of waiting (the subject of the execution chapters)."),

  // level 7
  c1b.n(LOB, "apply-linear-impact", 7,
    "A block-shaped ask side has the same depth of $500$ shares at every tick (one cent apart), starting at the best ask. For a buy MO of $2{,}000$ shares, by how many cents does the average price exceed the best ask?",
    1.5),
  c1b.n(LOB, "apply-microprice-shift", 7,
    "Bid \\$10.00 and ask \\$10.02, with $100$ shares on each side. Then $80$ ask shares are cancelled. By how many cents does the microprice move? Give $2$ decimal places.",
    0.67),
  c1b.m(LOB, "apply-stub-quote", 7, "A stub quote is:",
    "A limit order posted at a price so far from the market that it is not expected to execute", [
      ["A quote at the best price for one round lot", "That is a normal quote."],
      ["A hidden order inside the spread", "Hidden orders are not displayed; stub quotes are displayed but absurdly priced."],
      ["A quote that locks the market", "A locked market has bid equal to ask."],
    ]),
  c1b.s(LOB, "explain-microprice-vs-mid", 7,
    "Why might the microprice be a better estimate of the “true” price than the midprice at high frequency?",
    "Explains that it weights the quotes by queue sizes, so it incorporates order imbalance: a heavier bid queue signals buying pressure and a likely next move up.",
    "Notes that the midprice ignores this and changes only when a best quote changes, while the microprice moves with queue sizes, linking to the order-imbalance models of Chapter 12."),

  // level 8
  c1b.n(LOB, "apply-block-impact-general", 8,
    "A block-shaped book has depth $D$ shares per tick of size $\\Delta$, so a buy MO of $Q = mD$ shares (with $m$ a whole number) pays an average of $\\Delta(m - 1)/2$ above the best ask. With $D = 400$, $\\Delta = \\$0.01$ and $Q = 4{,}000$, compute the extra cost per share in cents.",
    4.5),
  c1b.m(LOB, "apply-fee-spread-interaction", 8, "With a one-cent tick, a taker fee of $0.30$ cents and a maker rebate of $0.20$ cents, the effective spread a liquidity taker pays on a round trip of two MOs is:",
    "$1.6$ cents per share: the one-cent spread plus two $0.30$-cent fees", [
      ["$1$ cent", "That ignores the fees paid on both legs."],
      ["$0.6$ cents", "That counts the fees but forgets the spread."],
      ["$1.2$ cents", "That uses the maker rebate; the taker pays the taker fee."],
    ]),
  c1b.s(LOB, "explain-reconstruct-book", 8,
    "Explain how to reconstruct the full limit order book from order-level message data, and why market orders never appear in it directly.",
    "Describes processing messages in time order: add posted LOs (B, S) at their price and size, remove or reduce them on cancellations (C, D) and executions (E, F), matching each later message to its original order ID.",
    "Explains that MOs are not messages in the feed; they are inferred from the executions against resting LOs (and against hidden orders) that they trigger."),
  c1b.m(LOB, "apply-tick-constraint", 8, "Why does a one-cent minimum tick matter more for a \\$20 stock than for a \\$450 stock?",
    "It is a much larger fraction of the price, so it can bind the spread above what competition would set", [
      ["It does not; a tick is a cent for both", "In relative terms the tick is about $22$ times larger for the cheaper stock."],
      ["High-priced stocks have larger minimum ticks", "In the US the minimum is one cent above \\$1 regardless of price."],
      ["Ticks only matter for illiquid stocks", "Ticks can bind for liquid low-priced stocks."],
    ]),

  // level 9
  c1b.s(LOB, "transfer-routing-design", 9,
    "Design a routing rule for a $5{,}000$-share buy order in a fragmented market with several venues showing depth at the best ask, different taker fees, and hidden liquidity.",
    "Takes displayed liquidity at the best price across venues first (as order protection requires), ranking venues by net price after fees and by the likelihood of hidden or replenished liquidity.",
    "Discusses information leakage: sending sequential child orders telegraphs the order’s progress, so routing should be simultaneous or randomised, using IOC or limit-priced orders to avoid walking a single book."),
  c1b.n(LOB, "apply-imbalance-microprice", 9,
    "Let $I = V^{b}/(V^{b} + V^{a})$. Show the microprice equals $P^{b} + I(P^{a} - P^{b})$, then compute it for bid \\$100.00, ask \\$100.04 and $I = 0.75$.",
    100.03),
  c1b.m(LOB, "transfer-queue-value", 9, "Why can being at the front of the queue at the best bid be valuable even though every order there trades at the same price?",
    "Orders at the front fill against small, mostly uninformed MOs, while orders at the back fill mainly when large MOs sweep the level just before the price drops", [
      ["Front orders receive a price improvement", "All orders at a price level trade at that price."],
      ["Front orders pay no fees", "Fees do not depend on queue position."],
      ["Back orders can never execute", "Back orders execute once the orders ahead are cleared."],
    ]),
  c1b.s(LOB, "transfer-fill-probability", 9,
    "A market maker posts a sell LO at depth $\\delta$ above the midprice. Explain how the shape of the LOB and the size distribution of market orders determine its fill probability, and why that probability falls with $\\delta$.",
    "Explains that the LO fills only if a buy MO arrives large enough to consume all depth posted at better prices, so the fill probability is the probability that the MO size exceeds the cumulative depth up to $\\delta$.",
    "Concludes that deeper posts sit behind more depth and so need larger, rarer MOs; with exponential MO sizes and a flat book the fill probability is $e^{-\\kappa\\delta}$, the form used in the market-making chapters."),

  // level 10
  c1b.s(LOB, "transfer-tick-policy", 10,
    "Regulators consider widening the tick for small-capitalisation stocks. Using the LOB concepts in this chapter, argue the likely effects on spreads, depth, queue competition and execution costs for large traders.",
    "Argues that a larger tick raises the minimum spread (worse for small traders where the tick binds) but concentrates depth at fewer price levels and lengthens queues, raising the value of queue position.",
    "Discusses that large traders may face less walking per share because of deeper levels, and that liquidity may move to hidden or midpoint orders and dark pools to trade inside the wider spread, so the net effect is empirical."),
  c1b.n(LOB, "apply-optimal-split", 10,
    "Each child MO of size $x$ walks a block book with depth $D = 500$ per one-cent tick, costing about $\\frac{x^2}{2D}$ cents in total beyond the best price, and the book fully replenishes between child orders. How many cents in walking cost do you save by sending $2{,}000$ shares as four child orders of $500$ instead of one order?",
    3000),
  c1b.s(LOB, "transfer-hidden-vs-displayed", 10,
    "A large buyer can post a displayed LO, an iceberg, or a fully hidden order at the bid. Discuss the trade-offs for queue priority, information leakage and fill probability.",
    "Explains that displayed orders get full priority and attract sellers, but reveal the buyer’s interest; icebergs reveal only the tip, with the hidden part usually losing time priority each time it refreshes.",
    "Explains that fully hidden orders leak least but rank behind displayed orders at the same price on many venues and may fill less, so the choice trades leakage against priority and execution risk."),
  c1b.m(LOB, "transfer-midprice-proxy", 10, "When is the midprice a poor proxy for the “true” price of an asset?",
    "When the spread is wide relative to price moves or the queues are very unbalanced, so the next trade is likely far from the mid", [
      ["Never; the midprice is the efficient price by definition", "It is only a proxy, and imbalance or wide spreads make it noisy."],
      ["Only when the market is locked", "When the market is locked, bid, ask and mid all coincide."],
      ["Only for ETFs", "The issue applies to any asset."],
    ]),
];

export const ahtMarketsItems: Item[] = [...participants, ...book];
