import type { Item } from "../../../lib/assessment/types";
import { chapter } from "./shared";

/** Ch. 3–4: empirical and statistical evidence on prices, returns, activity and market quality (40 items per lesson). */

const HD = "hft-data-and-returns";
const IL = "interarrival-latency-and-fragmentation";
const IA = "intraday-activity-patterns";
const MQ = "market-quality-and-price-impact";
const c31 = chapter("Ch. 3, Empirical and Statistical Evidence: Prices and Returns (§3.1–3.2)");
const c33 = chapter("Ch. 3, Empirical and Statistical Evidence: Prices and Returns (§3.3–3.7)");
const c41 = chapter("Ch. 4, Empirical and Statistical Evidence: Activity and Market Quality (§4.1–4.2)");
const c43 = chapter("Ch. 4, Empirical and Statistical Evidence: Activity and Market Quality (§4.3–4.5)");

const data: Item[] = [
  // level 1
  c31.m(HD, "recall-itch", 1, "ITCH-style message data record:",
    "Events affecting limit orders (posts, cancellations, executions), each with an order ID, price, size and timestamp", [
      ["Only the trades that occur", "Trades appear as executions, but posts and cancellations are recorded too."],
      ["The identity of every trader", "Participant IDs are usually missing from the public feed."],
      ["Daily open, high, low and close prices", "That is aggregated daily data, not message data."],
    ]),
  c31.m(HD, "recall-order-flow", 1, "In this chapter, order flow means:",
    "The number of shares bought aggressively minus the number sold aggressively", [
      ["Total traded volume", "Volume counts both sides; order flow is signed."],
      ["The number of limit orders posted", "Posts are passive; order flow tracks aggressive trades."],
      ["The change in the midprice", "Order flow is a quantity, not a price change."],
    ]),
  c31.m(HD, "recall-microprice", 1, "Returns in the one-second analysis are computed from the:",
    "Microprice, the volume-weighted midprice", [
      ["Last trade price", "Trade prices bounce between bid and ask."],
      ["Best bid", "One side of the book is a biased proxy."],
      ["Daily close", "The analysis is intraday."],
    ]),
  c31.m(HD, "recall-fat-tails", 1, "One-second returns of a liquid stock typically have:",
    "Fat tails relative to the Normal distribution", [
      ["Thin tails", "The QQ-plot shows tails heavier than Normal."],
      ["Exactly Normal tails", "High-frequency returns are strongly non-Normal."],
      ["No zero values", "About a third of one-second returns are exactly zero for AAPL."],
    ]),

  // level 2
  c31.n(HD, "apply-trades-per-second", 2,
    "A stock averages $23{,}400$ trades per day on one exchange over the $6.5$-hour session. On average, how many trades per second is that?",
    1),
  c31.n(HD, "apply-turnover", 2,
    "During a year, $2.7$ billion shares of a stock trade, and it has $900$ million shares outstanding. What is its share turnover?",
    3),
  c31.n(HD, "apply-bps", 2,
    "The microprice moves from \\$454.30 to \\$454.75. What is the return in basis points? Give $1$ decimal place.",
    9.9),
  c31.m(HD, "recall-orderflow-significant", 2, "In the daily return regressions for the liquid stocks, which variable is consistently significant and positive?",
    "Order flow", [
      ["The previous day’s return", "It is insignificant for most stocks and negative for AAPL."],
      ["The change in the VIX", "Market sentiment was not significant in 2013 for these stocks."],
      ["The constant", "Mean daily returns are close to zero, as expected."],
    ]),

  // level 3
  c31.n(HD, "apply-zero-returns", 3,
    "In $23{,}400$ one-second intervals, $7{,}722$ microprice returns are exactly zero. What percentage is that?",
    33),
  c31.m(HD, "apply-robust-ols", 3, "The daily regressions use robust OLS with Huber’s loss. Compared with ordinary OLS, Huber’s loss:",
    "Penalises large residuals linearly rather than quadratically, reducing the influence of outliers", [
      ["Ignores all residuals above a threshold", "Huber downweights large residuals; it does not discard them."],
      ["Penalises large residuals more heavily", "That would increase the influence of outliers."],
      ["Requires Normal errors", "Robust estimation is used precisely because errors are heavy-tailed."],
    ]),
  c31.n(HD, "apply-dollar-per-bp", 3,
    "With a microprice of \\$454.30, how many cents is a $1$ basis point move? Give $2$ decimal places.",
    4.54),
  c31.m(HD, "apply-isns-noise", 3, "For a very rarely traded stock, the daily return regression has adjusted $R^2$ near zero. The book’s interpretation is that:",
    "The data are dominated by noise, so the coefficients are unreliable", [
      ["Order flow is irrelevant for small stocks", "Low $R^2$ reflects noise, not proof of irrelevance."],
      ["The stock is perfectly efficient", "Noise and efficiency are different things."],
      ["The regression is misspecified because of the VIX", "Low $R^2$ is driven by infrequent trading."],
    ]),

  // level 4
  c31.n(HD, "apply-hill-estimator", 4,
    "The power-law tail MLE is $\\hat{\\alpha} = 1 + n\\left[\\sum_{i=1}^{n}\\log(x_i/x_{\\min})\\right]^{-1}$. For $n = 4$ tail returns $[2, 3, 4, 8]$ bps with $x_{\\min} = 2$, compute $\\hat{\\alpha}$. Give $2$ decimal places.",
    2.61),
  c31.n(HD, "apply-roll", 4,
    "Roll’s model attributes negative autocorrelation of price changes to the bid–ask bounce, with spread $= 2\\sqrt{-\\text{Cov}(\\Delta p_t, \\Delta p_{t-1})}$. If the autocovariance of trade-price changes is $-0.000025$ dollars$^2$, what spread, in cents, does Roll’s measure imply?",
    1),
  c31.m(HD, "apply-negative-acf", 4, "A significant negative first-lag autocorrelation in AAPL’s one-second microprice returns suggests:",
    "A mean-reverting component at very short horizons", [
      ["Momentum", "Momentum would show positive autocorrelation."],
      ["That returns are independent", "A significant lag-one coefficient rejects independence."],
      ["Higher volatility", "Autocorrelation and volatility are different properties."],
    ]),
  c31.s(HD, "explain-mo-inference", 4,
    "Market orders are not recorded as messages in ITCH-style data. How are they recovered, and why does it matter for measuring order flow?",
    "Explains that an MO appears as one or more executions of resting LOs (or hidden orders) at the same timestamp, so executions are grouped to infer the MO’s size and side.",
    "Explains that order flow, the net aggressive buying, depends on correctly signing these inferred MOs; misclassification adds noise to the order-flow variable."),

  // level 5
  c31.n(HD, "apply-hill-tail-prob", 5,
    "If tail returns follow $\\Pr(X > x) = (x_{\\min}/x)^{\\alpha - 1}$ with $x_{\\min} = 1.94$ bps and $\\alpha = 3.35$, what is $\\Pr(X > 3.88 \\mid X > 1.94)$? Give $4$ decimal places.",
    0.1961),
  c31.s(HD, "explain-sampling-frequency", 5,
    "Why does the choice of sampling frequency matter so much for the empirical distribution of high-frequency returns?",
    "Explains that at very short intervals most returns are zero (prices change in discrete ticks and often do not move), so the distribution is a spike at zero with discrete jumps.",
    "Notes that longer intervals aggregate many ticks and look more continuous and closer to Normal, while microstructure effects (bounce, discreteness) dominate at short intervals."),
  c31.m(HD, "apply-asymmetry-news", 5, "Model M2 adds SPY and VIX returns interacted with down-market indicators. What did it find?",
    "No significant evidence of an asymmetric reaction to good versus bad market news", [
      ["Stocks react twice as strongly to bad news", "The asymmetry terms were not significant."],
      ["Order flow becomes insignificant", "Order flow stays significant."],
      ["All stocks have zero market exposure", "FARO and MENT have significant market exposure."],
    ]),
  c31.n(HD, "apply-order-flow-net", 5,
    "On one day, $1.45$ million shares are bought aggressively and $1.24$ million sold aggressively on NASDAQ. What is the net order flow, in thousands of shares?",
    210),

  // level 6
  c31.s(HD, "explain-bid-ask-bounce", 6,
    "Explain the bid–ask bounce and why it produces negative autocorrelation in transaction-price changes even when the efficient price is a random walk.",
    "Explains that trades alternate randomly between the bid and the ask around an unchanged efficient price, so the observed price jumps up then down by the spread.",
    "Shows the consequence: successive changes tend to reverse, giving negative covariance of about $-s^2/4$ (Roll), which disappears when returns are computed from midprices."),
  c31.n(HD, "apply-roll-cov", 6,
    "In Roll’s model with spread $s = 2$ cents and equally likely buys and sells, $\\text{Cov}(\\Delta p_t, \\Delta p_{t-1}) = -s^2/4$. What is the autocovariance in cents$^2$?",
    -1),
  c31.m(HD, "apply-microprice-reason", 6, "Why use the microprice rather than the last trade price for one-second returns?",
    "It avoids bid–ask bounce and uses queue information, giving a less noisy estimate of the price", [
      ["It is always closer to the true value than the midprice", "It is a better proxy on average, not always."],
      ["It changes less often than trade prices", "It changes whenever queue sizes change, which is often."],
      ["It is required by regulators", "The choice is statistical, not regulatory."],
    ]),
  c31.n(HD, "apply-acf-se", 6,
    "With $23{,}400$ one-second returns, the approximate $95\\%$ bound for a sample autocorrelation under independence is $\\pm 1.96/\\sqrt{n}$. Compute the bound. Give $4$ decimal places.",
    0.0128),

  // level 7
  c31.s(HD, "explain-efficiency-test", 7,
    "The daily regressions test aspects of market efficiency. Which coefficients should be zero under efficiency, and how should a significant order-flow coefficient be interpreted?",
    "States that the constant and the lagged return should be insignificant if returns are unpredictable from past information.",
    "Interprets contemporaneous order flow as consistent with efficiency and with Kyle/Glosten–Milgrom: net demand and prices move together because order flow carries information, which does not imply predictability."),
  c31.n(HD, "apply-hill-recompute", 7,
    "Tail observations above $x_{\\min} = 1$: $[1.5, 2, 3, 6, 10]$. Compute the power-law MLE $\\hat{\\alpha} = 1 + n/\\sum\\log(x_i/x_{\\min})$. Give $3$ decimal places.",
    1.795),
  c31.m(HD, "apply-reconstruct-partial", 7, "A message shows a partial cancellation (type “X”) of $200$ shares from order $4887036$, with no price. To update the book you must:",
    "Look up order $4887036$’s original post to find its price and side, and reduce its size by $200$", [
      ["Assume it is at the best bid", "Price must come from the original order."],
      ["Ignore it, since partial cancellations do not change the book", "They reduce the displayed quantity."],
      ["Treat it as an execution", "Cancellations remove liquidity without a trade."],
    ]),
  c31.s(HD, "explain-power-law-mle", 7,
    "Why fit power laws to return tails by maximum likelihood rather than by linear regression on a log–log plot?",
    "Explains that log–log regression on histogram or survival estimates gives biased and inconsistent estimates with unreliable standard errors, since the points are not independent and the binning is arbitrary.",
    "Explains that the MLE for a Pareto tail has a closed form, is consistent and efficient for the chosen $x_{\\min}$, and gives standard errors (as in Clauset, Shalizi and Newman)."),

  // level 8
  c31.n(HD, "apply-tail-quantile", 8,
    "With $\\Pr(X > x) = 0.05\\,(1.94/x)^{2.35}$ for $x \\ge 1.94$ bps, find the $99.9$th percentile of one-second returns. Give $2$ decimal places.",
    10.25),
  c31.s(HD, "explain-daily-vs-intraday", 8,
    "Contrast what daily data and millisecond message data can tell an algorithmic trader, using the chapter’s analyses.",
    "Explains that daily data reveal broad relationships (order flow and returns, market exposure, unpredictability of daily returns) relevant for long-horizon investors.",
    "Explains that message data reveal the microstructure that drives HFT decisions: zero returns, fat tails, short-horizon reversal, event clustering, queue dynamics and order-level behaviour."),
  c31.m(HD, "apply-r2-interpretation", 8, "Order flow is significant in the daily regressions, yet $R^2$ values are modest. The most sensible conclusion is:",
    "Order flow captures part of the information driving returns, but much of daily return variation reflects other news", [
      ["Order flow causes returns", "The regression is contemporaneous and does not establish causation."],
      ["Order flow predicts tomorrow’s return", "The regression is contemporaneous, not predictive."],
      ["The model is useless", "A significant, sensibly signed coefficient is informative."],
    ]),
  c31.n(HD, "apply-volatility-scaling", 8,
    "If one-second returns had standard deviation $0.5$ bps and were independent, what would the standard deviation of one-hour returns be, in bps? Give $1$ decimal place.",
    30),

  // level 9
  c31.s(HD, "transfer-design-study", 9,
    "Design a study to test whether one-second microprice returns are predictable from order flow over the previous ten seconds, avoiding look-ahead bias.",
    "Proposes regressing the return over $(t, t + 1]$ on order flow over $[t - 10, t]$, using only information time-stamped before $t$, with HAC standard errors for overlapping data.",
    "Addresses pitfalls: timestamp alignment across feeds, trade-signing errors, the bid–ask bounce (use mid or micro prices), intraday seasonality and out-of-sample validation."),
  c31.m(HD, "transfer-negative-acf-trading", 9, "A strategy tries to profit from the negative lag-one autocorrelation of one-second returns by buying after down-ticks. The main obstacle is:",
    "The predictable reversal is smaller than the spread and fees it must pay, so it is not exploitable by liquidity takers", [
      ["The autocorrelation is positive", "It is negative at lag one."],
      ["The effect only exists in daily data", "It is a high-frequency effect."],
      ["Regulations forbid it", "The obstacle is economic."],
    ]),
  c31.s(HD, "transfer-fat-tail-risk", 9,
    "A risk model assumes Normal one-second returns. Using the estimated tail exponent near $3.35$, explain the consequences for risk limits and stop-loss design in a high-frequency strategy.",
    "Explains that a power-law tail implies far more extreme moves than a Normal model predicts, so Normal-based VaR and stop-loss thresholds are breached much more often than expected.",
    "Proposes tail-aware design: empirical or power-law quantiles, stress tests, position limits robust to jumps, and recognising that with $\\alpha \\approx 3.35$ fourth moments may not exist, so kurtosis-based estimates are unstable."),
  c31.n(HD, "apply-tail-ratio", 9,
    "Compare $\\Pr(X > 10\\text{ bps})$ under the power-law tail $0.05(1.94/x)^{2.35}$ with the Normal tail for a standard deviation of $1.2$ bps, $\\Pr(Z > 10/1.2) \\approx 3.9 \\times 10^{-17}$. Compute the power-law probability. Give $5$ decimal places.",
    0.00106),

  // level 10
  c31.s(HD, "transfer-latency-in-data", 10,
    "Timestamps in your message data are the exchange’s, but your strategy receives data with latency. How should this change the way you backtest a strategy built on the chapter’s return properties?",
    "Explains that signals must be computed from data as they would have arrived at the strategy (exchange time plus feed latency), and orders reach the exchange later still, so naive backtests use information too early.",
    "Proposes adding realistic latency to both signals and order arrival, modelling queue position and fill probability, and checking sensitivity of profits to latency, since short-horizon effects can vanish within milliseconds."),
  c31.s(HD, "transfer-orderflow-endogeneity", 10,
    "Order flow and returns are strongly correlated in the daily regressions. Give two reasons the coefficient on order flow cannot be read as the causal price impact of an extra share bought.",
    "Names simultaneity: prices also drive order flow (momentum or contrarian traders react to price moves), so causation runs both ways.",
    "Names omitted variables: news drives both informed order flow and price moves, so the coefficient mixes information with mechanical impact; causal impact needs exogenous variation such as randomised or index-driven trades."),
  c31.m(HD, "transfer-zero-returns-model", 10, "With a third of one-second returns exactly zero, which modelling choice is most appropriate for the high-frequency midprice?",
    "A discrete-state model of price changes (counting processes or jumps of one tick), rather than a continuous diffusion", [
      ["Geometric Brownian motion at one-second resolution", "A diffusion never produces exact zeros."],
      ["An AR(1) on log prices with Normal errors", "That also produces continuous values, not exact zeros."],
      ["Ignoring the zeros", "Dropping them distorts volatility and dynamics."],
    ]),
  c31.n(HD, "apply-hill-se", 10,
    "The Pareto-tail MLE has standard error approximately $(\\hat{\\alpha} - 1)/\\sqrt{n}$. With $\\hat{\\alpha} = 3.35$ estimated from $n = 1{,}170$ tail observations, give an approximate $95\\%$ confidence interval’s half-width. Give $3$ decimal places.",
    0.135),
];

const interarrival: Item[] = [
  // level 1
  c33.m(IL, "recall-interarrival", 1, "The interarrival times studied in Section 3.3 are the times between:",
    "Successive changes in the best bid or the best ask", [
      ["Successive trading days", "The analysis is at millisecond resolution."],
      ["Successive trades only", "The analysis uses changes in the bid or ask."],
      ["Order posts and their cancellations", "That is order lifetime, a different quantity."],
    ]),
  c33.m(IL, "recall-latency", 1, "Latency is:",
    "The delay between sending a message and its receipt and processing by the exchange", [
      ["The spread between bid and ask", "That is a price gap, not a time delay."],
      ["The time between trades", "That is interarrival time."],
      ["The lifetime of a limit order", "That is order duration."],
    ]),
  c33.m(IL, "recall-tick-size", 1, "In the US, the minimum tick size for stocks priced above one dollar is:",
    "One cent", [
      ["One-tenth of a cent", "Sub-penny quoting is not allowed above \\$1."],
      ["Five cents for all stocks", "Five-cent ticks apply in some pilot programmes, not as the minimum."],
      ["It varies with the price, as in Madrid or Paris", "Price-dependent tick sizes are used in some European markets."],
    ]),
  c33.m(IL, "recall-dark-pool", 1, "A dark pool is a trading venue that:",
    "Does not publicly display its quotes", [
      ["Trades only after the market closes", "Dark pools trade during normal hours."],
      ["Has no regulation", "Dark pools are regulated as alternative trading systems."],
      ["Only trades ETFs", "Dark pools trade many securities."],
    ]),

  // level 2
  c33.m(IL, "recall-interarrival-shape", 2, "Compared with an exponential distribution of the same mean, AAPL’s bid/ask interarrival times:",
    "Have a much heavier, power-law right tail", [
      ["Are almost exactly exponential", "The QQ-plot shows strong departures from the exponential."],
      ["Have a lighter tail", "Very long calm periods are more common than an exponential allows."],
      ["Are uniformly distributed", "The histogram is sharply peaked near zero."],
    ]),
  c33.n(IL, "apply-mean-median", 2,
    "AAPL’s interarrival times have mean $10.4$ ms and median $3$ ms. What is the ratio of the mean to the median? Give $2$ decimal places.",
    3.47),
  c33.m(IL, "recall-clustering", 2, "The ACF of interarrival times shows strong positive autocorrelation. This means that:",
    "Changes cluster: rapid changes are followed by rapid changes, and calm periods by calm periods", [
      ["Changes are independent", "Significant autocorrelation rules that out."],
      ["Fast changes are followed by slow ones", "That would be negative autocorrelation."],
      ["The process is Poisson", "A Poisson process has independent, exponential interarrivals."],
    ]),
  c33.n(IL, "apply-microwave-gain", 2,
    "Chicago-to-New Jersey latency is about $7.0$ ms by fibre and $4.7$ ms by microwave. How many milliseconds does microwave save?",
    2.3),

  // level 3
  c33.n(IL, "apply-exponential-median", 3,
    "For an exponential distribution with mean $10.4$ ms, what is the median, $10.4\\ln 2$? Give $2$ decimal places.",
    7.21),
  c33.m(IL, "apply-reversal-table", 3, "For AAPL’s ask, an uptick is followed by a downtick $57\\%$ of the time. This indicates:",
    "Price changes tend to reverse", [
      ["Momentum in price changes", "Momentum would mean upticks are followed mostly by upticks."],
      ["A Markov chain with independent steps", "Reversal shows dependence on the previous change."],
      ["That the ask never changes", "The table is conditioned on changes occurring."],
    ]),
  c33.n(IL, "apply-pareto-tail", 3,
    "For a Pareto interarrival tail $\\Pr(X > x) = (k/x)^{a}$ with $k = 10$ ms and $a = 5.4$, what is $\\Pr(X > 20\\text{ ms})$? Give $4$ decimal places.",
    0.0237),
  c33.m(IL, "apply-trade-through", 3, "Market fragmentation interacts with trade-through rules so that an aggressive order:",
    "May be split and routed across several venues within milliseconds, exposing it to latency between venues", [
      ["Always executes at one venue", "Order protection routes to venues with better prices."],
      ["Is executed at the average price of all venues", "Each fill happens at a specific venue’s price."],
      ["Is only possible during auctions", "Continuous trading is fragmented too."],
    ]),

  // level 4
  c33.n(IL, "apply-latency-change-prob", 4,
    "If bid changes arrived as a Poisson process with mean interarrival $8$ ms, what is the probability of at least one bid change during a $100$ ms delay? Give $4$ decimal places.",
    1),
  c33.s(IL, "explain-latency-staleness", 4,
    "The empirical tables show that, for liquid stocks, the bid usually does not change over $100$ ms, yet the median interarrival time of a bid change is about $8$ ms. Reconcile these facts.",
    "Explains that changes cluster in bursts: many changes happen within short, active periods, while long calm periods with no changes make up most of the clock time.",
    "Concludes that a Poisson model with the mean rate badly overstates how often a $100$ ms window contains a change, and that latency risk is concentrated in active bursts."),
  c33.n(IL, "apply-conditional-reversal", 4,
    "For AAPL’s bid, an uptick is followed by a downtick $63.5\\%$ of the time and a downtick by an uptick $55.3\\%$ of the time. In a two-state Markov chain with these probabilities, what is the long-run fraction of bid changes that are upticks? Give $4$ decimal places.",
    0.4655),
  c33.m(IL, "apply-tick-binding", 4, "A stock’s quoted spread is one tick almost all of the time. This suggests that:",
    "The tick size is binding: competition would narrow the spread further if it could", [
      ["The stock is illiquid", "Liquid stocks are the ones pinned at one tick."],
      ["Market makers earn no profit", "A binding tick can give them a rent."],
      ["The spread is volatile", "A spread stuck at one tick is very stable."],
    ]),

  // level 5
  c33.n(IL, "apply-markov-two-step", 5,
    "Using the bid transition probabilities ($\\Pr(\\downarrow \\mid \\uparrow) = 0.635$, $\\Pr(\\uparrow \\mid \\downarrow) = 0.553$), given that the last change was an uptick, what is the probability that the change after next is also an uptick? Give $4$ decimal places.",
    0.4844),
  c33.s(IL, "explain-non-markov", 5,
    "The book finds that conditioning on the last two price changes, rather than only the last, changes the probabilities of the next change. What does this say about modelling price changes?",
    "Explains that price changes are not first-order Markov: the probabilities depend on more than the most recent change.",
    "Concludes that models need richer state, such as longer histories, queue sizes or order imbalance (Chapter 12), to capture short-term price dynamics."),
  c33.m(IL, "apply-fragmentation-share", 5, "In 2014, NASDAQ handled about $20\\%$ of US equity trading. For an algorithm that sees only NASDAQ, this means:",
    "Most trading activity and liquidity is invisible to it", [
      ["It sees nearly all trading", "Four-fifths happens elsewhere."],
      ["Its estimates of order flow are unbiased", "Single-venue flow is a noisy, possibly biased proxy."],
      ["Fragmentation is irrelevant for execution", "Routing across venues is central to execution."],
    ]),
  c33.n(IL, "apply-coint-portfolio", 5,
    "The cointegration factor for INTC and SMH is $c_t = A S^{\\text{INTC}}_t + B S^{\\text{SMH}}_t$ with $A = 0.95$ and $B = -0.63$. With prices \\$24.60 and \\$40.10, compute $c_t$. Give $3$ decimal places.",
    -1.893),

  // level 6
  c33.s(IL, "explain-pairs-empirics", 6,
    "Explain how the VAR estimated in Section 3.7 is used to construct a pairs-trading signal for INTC and SMH.",
    "Explains that the VAR for price changes includes lagged levels, from which a cointegrating combination $c_t = AS^{1}_t + BS^{2}_t$ is extracted that is stationary even though each price wanders.",
    "Explains that the signal is the deviation of $c_t$ from its mean: when it is unusually high, sell the portfolio, and when low, buy it, betting on mean reversion."),
  c33.n(IL, "apply-latency-distance", 6,
    "Microwave signals travel close to the speed of light, $300{,}000$ km/s, and fibre at about $200{,}000$ km/s. Over a $1{,}200$ km route, what is the latency difference in milliseconds?",
    2),
  c33.m(IL, "apply-latency-mo", 6, "Why does latency matter more for an aggressive (MO) strategy in a liquid stock than for one that trades a rarely traded stock?",
    "In the liquid stock the book changes within milliseconds, so the price seen when sending can be stale on arrival", [
      ["Illiquid stocks have no latency", "Latency is the same; its consequences differ."],
      ["Liquid stocks have wider spreads", "Liquid stocks have narrower spreads."],
      ["Aggressive orders are not routed", "They are routed and exposed to latency."],
    ]),
  c33.n(IL, "apply-reversal-prob-ask", 6,
    "For AAPL’s ask, $\\Pr(\\downarrow \\mid \\uparrow) = 0.57$ and $\\Pr(\\uparrow \\mid \\downarrow) = 0.618$. What is the long-run fraction of ask changes that are upticks? Give $4$ decimal places.",
    0.5202),

  // level 7
  c33.s(IL, "explain-power-law-arrivals", 7,
    "Why might event interarrival times have power-law tails rather than exponential ones? Suggest a mechanism and a model that captures it.",
    "Suggests a mechanism: trading activity varies (bursts after news or large orders, quiet periods otherwise), so a mixture of rates gives far longer quiet periods than a constant-rate Poisson process.",
    "Proposes a model with self-excitation or random intensity, such as a Hawkes process or a doubly stochastic Poisson process, which produces clustering and heavy-tailed waiting times."),
  c33.n(IL, "apply-mixture-tail", 7,
    "Interarrival times are exponential with mean $2$ ms in active periods ($80\\%$ of events) and mean $40$ ms in calm periods ($20\\%$). What is the probability that an interarrival exceeds $50$ ms? Give $4$ decimal places.",
    0.0573),
  c33.m(IL, "apply-tick-and-queue", 7, "When the tick is large relative to the spread competition would produce, queues at the best prices are long. Who benefits most?",
    "Traders who can secure early queue position, typically the fastest liquidity providers", [
      ["Liquidity takers, because spreads narrow", "A binding tick keeps spreads wide."],
      ["Slow retail limit orders at the back of the queue", "They fill late and are more adversely selected."],
      ["Nobody, since all orders trade at the same price", "Queue position determines who fills first."],
    ]),
  c33.s(IL, "explain-microwave-implications", 7,
    "What are the implications for a market maker in New Jersey equities if some traders receive Chicago futures prices $2$ ms before she does?",
    "Explains that when futures move, faster traders can hit her stale equity quotes before she updates them, so she is adversely selected by latency arbitrage.",
    "Concludes that she must widen spreads, reduce size, or invest in speed, and that this cost is passed on to other traders."),

  // level 8
  c33.n(IL, "apply-coint-ou-halflife", 8,
    "A cointegration factor follows a discrete AR(1), $c_t = 0.997c_{t-1} + \\varepsilon_t$, at one-second steps. What is its half-life of mean reversion in seconds, $\\ln 0.5/\\ln 0.997$? Give $1$ decimal place.",
    230.7),
  c33.s(IL, "explain-routing-latency", 8,
    "A large MO is routed sequentially across four venues. Explain how latency between venues can raise its execution cost, and a technique to mitigate it.",
    "Explains that after the first fill, fast traders who see it can cancel or reprice their quotes at the other venues before the rest of the order arrives, so later fills get worse prices.",
    "Proposes timing child orders to arrive at all venues simultaneously (offsetting the known latency to each), or using IOC orders to avoid resting exposure."),
  c33.m(IL, "apply-fragmentation-benefit", 8, "Which is a plausible benefit of fragmentation across many venues?",
    "Competition among venues in fees, speed and order types", [
      ["Easier price discovery from a single book", "Fragmentation splits the book across venues."],
      ["Lower latency for all traders", "Latency across venues adds complexity."],
      ["Less need for routing technology", "Fragmentation makes routing essential."],
    ]),
  c33.n(IL, "apply-pareto-mean", 8,
    "For a Pareto tail $\\Pr(X > x) = (k/x)^{a}$, $x \\ge k$, with $k = 10$ ms and $a = 5.4$, the mean is $\\frac{a k}{a - 1}$. Compute it. Give $2$ decimal places.",
    12.27),

  // level 9
  c33.s(IL, "transfer-latency-budget", 9,
    "A quote-update strategy must react before its quotes become stale. Using the interarrival evidence, how would you decide what latency is acceptable?",
    "Proposes measuring, in active periods, the distribution of times between relevant book changes and the cost of being picked off as a function of reaction time.",
    "Concludes that the budget should be set by burst behaviour (the median a few ms, much shorter in bursts), not by the average interarrival time, and weighed against the cost of faster infrastructure."),
  c33.m(IL, "transfer-tick-pilot", 9, "A regulator widens ticks for small stocks from one to five cents. For a stock whose natural spread is about two cents, the most likely effect is:",
    "Quoted spreads rise to five cents, depth concentrates at fewer levels, and more trading moves to midpoint or dark venues", [
      ["Quoted spreads fall", "A five-cent minimum cannot produce a two-cent spread."],
      ["Depth disappears", "Depth tends to accumulate at the wider ticks."],
      ["No change, because ticks do not bind", "A five-cent tick binds when the natural spread is two cents."],
    ]),
  c33.s(IL, "transfer-pairs-robustness", 9,
    "Before trading the INTC–SMH pair on the estimated cointegration relation, what robustness checks would you run?",
    "Proposes testing stationarity of the factor out of sample (unit-root or cointegration tests), checking stability of $A$ and $B$ across days, and estimating the half-life.",
    "Proposes accounting for trading costs (spreads on both legs), latency between legs and intraday patterns, and stress-testing for breaks in the relationship (for example around index rebalances or news)."),
  c33.n(IL, "apply-hawkes-branching", 9,
    "In a Hawkes process with baseline rate $\\mu = 20$ events per second and branching ratio $n = 0.75$ (each event triggers on average $0.75$ more), what is the long-run event rate, $\\mu/(1 - n)$?",
    80),

  // level 10
  c33.s(IL, "transfer-non-markov-strategy", 10,
    "Design a short-horizon signal that exploits the reversal patterns of Tables 3.5–3.6 and explain why it may still fail as a trading strategy.",
    "Proposes predicting the next price-change direction from the last one or two changes (and possibly queue imbalance), and using it to adjust limit-order placement rather than trading aggressively.",
    "Explains failure modes: the edge is smaller than the spread and fees for takers, many traders see the same pattern, and latency means the pattern may change before orders arrive."),
  c33.s(IL, "transfer-fragmentation-welfare", 10,
    "Argue both sides: does fragmentation of US equity markets help or hurt investors?",
    "Argues for: competition among venues lowers fees and spurs innovation in order types and speed, and dark venues can lower impact for large orders.",
    "Argues against: liquidity is split, routing and data are costly, latency arbitrage across venues is possible, and dark venues may cream off uninformed flow, worsening lit spreads; concludes the net effect is empirical."),
  c33.n(IL, "apply-markov-stationary-pair", 10,
    "A two-state chain of price-change signs has $\\Pr(\\downarrow \\mid \\uparrow) = 0.6$ and $\\Pr(\\uparrow \\mid \\downarrow) = 0.6$. What is the lag-one autocorrelation of the sign series, $1 - 0.6 - 0.6$?",
    -0.2),
  c33.m(IL, "transfer-latency-arbitrage-fix", 10, "Which market design is specifically proposed to blunt latency arbitrage?",
    "Frequent batch auctions, which match orders in discrete intervals rather than continuously", [
      ["Larger tick sizes", "Ticks affect spreads, not the speed race over stale quotes."],
      ["Maker–taker fees", "Fees do not remove the advantage of speed."],
      ["More dark pools", "Dark pools do not stop picking off stale lit quotes."],
    ]),
];

const intraday: Item[] = [
  // level 1
  c41.m(IA, "recall-volume-volatility", 1, "At the daily frequency, trading volume and volatility are:",
    "Highly correlated and both persistent", [
      ["Uncorrelated", "They move together strongly."],
      ["Negatively correlated", "High-volume days are high-volatility days."],
      ["Independent white noise", "Both are persistent."],
    ]),
  c41.m(IA, "recall-u-shape", 1, "Intraday volume in US equities typically follows:",
    "A U-shape: high at the open, lower at midday, and highest near the close", [
      ["A flat profile", "Volume varies strongly across the day."],
      ["A steady decline from open to close", "Volume rises again into the close."],
      ["A peak at noon", "Midday is the quietest part of the day."],
    ]),
  c41.m(IA, "recall-round-prices", 1, "Transaction prices cluster at:",
    "Whole-dollar and half-dollar prices, with smaller spikes at multiples of ten and five cents", [
      ["Random cents with no pattern", "There is a clear preference for round prices."],
      ["Prices ending in $99$ cents", "Psychological pricing is not what the data show."],
      ["Only the opening price", "Clustering is visible throughout the day."],
    ]),
  c41.m(IA, "recall-intraday-vol", 1, "Intraday volatility of one-minute returns is typically:",
    "Highest at the open, then lower, reaching a plateau from about midday", [
      ["Highest at noon", "Midday is calmer."],
      ["Constant all day", "Volatility varies strongly through the day."],
      ["Lowest at the open", "The open absorbs overnight news, so it is the most volatile."],
    ]),

  // level 2
  c41.n(IA, "apply-volume-share", 2,
    "A stock trades $8$ million shares in a day, $1.2$ million of them in the last half hour. What percentage of the day’s volume is that?",
    15),
  c41.n(IA, "apply-realized-vol", 2,
    "Realised volatility over a window is $\\sqrt{\\sum_j r_j^2}$. Three one-minute returns are $3$, $-4$ and $0$ bps. Compute it in bps.",
    5),
  c41.m(IA, "recall-intrasecond", 2, "Within each second, volume is not uniform: it spikes at particular milliseconds. A likely explanation is:",
    "Algorithms that trade on timers, sending orders at the start of each second or other round time points", [
      ["Exchange clocks are faulty", "The pattern is too regular to be clock error."],
      ["Human traders react faster at those times", "Millisecond regularity is machine-driven."],
      ["Data are recorded only at whole seconds", "The data have millisecond timestamps."],
    ]),
  c41.m(IA, "recall-forecast-vol", 2, "Because volume and volatility are correlated and persistent, which variable can help forecast future volatility?",
    "Any variable correlated with volatility, such as bid–ask spreads, quote intensity or volume", [
      ["Only past returns", "Andersen and Bondarenko stress that many correlates have forecasting power."],
      ["Only the opening price", "A single price level carries little volatility information."],
      ["None, since volatility is unpredictable", "Volatility is persistent and forecastable."],
    ]),

  // level 3
  c41.n(IA, "apply-rv-15min", 3,
    "Over a $15$-minute window, the sum of squared one-minute returns is $225$ bps$^2$. What is the realised volatility in bps?",
    15),
  c41.n(IA, "apply-round-dollar-excess", 3,
    "If trade prices were spread uniformly over the $100$ cent values, $1\\%$ of trades would end in $00$ cents. In the data, $5\\%$ do. What is the ratio of observed to uniform frequency?",
    5),
  c41.m(IA, "apply-open-reason", 3, "Why is trading activity high at the open?",
    "Overnight information must be incorporated into prices, prompting both informed and rebalancing trades", [
      ["Exchanges cut fees at the open", "Fee schedules do not vary like this."],
      ["Market makers are absent", "They are present; volume is driven by news and urgency."],
      ["The tick size is smaller at the open", "Ticks do not change through the day."],
    ]),
  c41.m(IA, "apply-close-reason", 3, "Why does volume peak near the close?",
    "Traders who must complete positions by day’s end, index funds tracking closing prices, and the closing auction concentrate trading there", [
      ["New information arrives only at the close", "News arrives throughout the day."],
      ["Spreads are widest at the close", "Spreads are typically narrow near the close."],
      ["Market makers start trading at the close", "Market makers trade all day."],
    ]),

  // level 4
  c41.n(IA, "apply-rv-annualize", 4,
    "A stock’s daily realised volatility is $1.2\\%$. Assuming $252$ trading days and independent days, what is the annualised volatility in percent? Give $1$ decimal place.",
    19),
  c41.s(IA, "explain-urgency-feedback", 4,
    "The book explains intraday patterns by information arrival and by urgency interacting with market quality. Explain the feedback.",
    "Explains that new information raises trading volume, and impatient traders who need to trade (for example before the close) add volume.",
    "Explains the feedback: more trading improves market quality (depth, narrower spreads), which lowers the cost of trading and attracts still more trading, concentrating volume at certain times."),
  c41.n(IA, "apply-volume-curve", 4,
    "A volume profile allocates $12\\%$ of daily volume to the first half hour, $5\\%$ to each of eight midday half hours, and the rest of the remaining four half hours equally. What share goes to each of those four? (The day has $13$ half hours.)",
    12),
  c41.m(IA, "apply-stop-loss-clustering", 4, "One proposed explanation for clustering of trades at round prices is:",
    "Stop-loss and momentum orders are often placed at round prices, so liquidity accumulates and executes there", [
      ["Regulators require round prices", "There is no such rule."],
      ["The tick size is larger at round prices", "Ticks are uniform."],
      ["Round prices are more efficient", "Efficiency gives no reason to prefer round prices."],
    ]),

  // level 5
  c41.n(IA, "apply-vwap-curve", 5,
    "To match a VWAP benchmark, you plan to trade proportionally to expected volume. If the first half hour carries $12\\%$ of expected volume and your order is $250{,}000$ shares, how many shares should you plan to trade then?",
    30000),
  c41.s(IA, "explain-functional-view", 5,
    "The book plots each day’s intraday volume profile as one curve (a functional data view). What does this view reveal that a single average curve does not?",
    "Explains that treating each day’s profile as an observation shows the variability around the mean shape and the typical modes of variation, such as heavier opens or closes on some days.",
    "Notes that this matters for execution algorithms that forecast intraday volume: the uncertainty around the mean profile determines how much a volume-targeting strategy will deviate."),
  c41.m(IA, "apply-volatility-spread-link", 5, "Spreads tend to be widest at the open. The connection to volatility is that:",
    "Higher uncertainty and adverse-selection risk early in the day make liquidity providers demand wider spreads", [
      ["Wide spreads cause high volatility mechanically", "Causation mostly runs from uncertainty to spreads."],
      ["Spreads and volatility are unrelated", "They co-move strongly."],
      ["The open has the most market makers", "Market makers are cautious at the open."],
    ]),
  c41.n(IA, "apply-rv-ratio", 5,
    "Realised volatility in the first $15$ minutes is $12$ bps and the midday plateau is $5$ bps. By what factor is early-session variance larger than midday variance? Give $2$ decimal places.",
    5.76),

  // level 6
  c41.s(IA, "explain-round-number-liquidity", 6,
    "The book says the round-price pattern reveals a “preference for providing liquidity” at round prices. Why phrase it in terms of liquidity provision rather than trading?",
    "Explains that a transaction occurs when an aggressive MO meets a resting LO, and its price is the LO’s price, so the price is chosen by the liquidity provider.",
    "Concludes that clustering at round prices reflects where limit orders are posted, perhaps by stop-loss and momentum programmes, rather than where takers want to trade."),
  c41.n(IA, "apply-rv-noise", 6,
    "Microstructure noise with variance $\\omega^2$ inflates realised variance computed from $n$ returns by about $2n\\omega^2$. With $\\omega = 0.5$ bps and $n = 390$ one-minute returns, what is the bias in bps$^2$?",
    195),
  c41.m(IA, "apply-sampling-rv", 6, "Why do practitioners often compute realised volatility from five-minute rather than one-second returns?",
    "To limit the upward bias from microstructure noise, which grows with the number of returns", [
      ["Five-minute data are more accurate", "Both use the same prices; the issue is noise accumulation."],
      ["One-second returns have no variance", "They do, but they are dominated by noise."],
      ["Regulators require five-minute sampling", "The choice is statistical."],
    ]),
  c41.n(IA, "apply-close-share", 6,
    "A closing auction trades $9\\%$ of daily volume. An index fund must trade $3\\%$ of the stock’s expected daily volume at the close. What fraction of the auction volume is that? Give $2$ decimal places.",
    0.33),

  // level 7
  c41.s(IA, "explain-volume-forecast", 7,
    "Describe a simple intraday volume forecasting model consistent with this section, and how an execution algorithm would use it.",
    "Proposes forecasting each interval’s volume as the day’s total forecast (from persistent daily volume and volatility) times a historical intraday share for that interval, updated as the day unfolds.",
    "Explains its use: VWAP or POV algorithms allocate the order across intervals in proportion to forecast volume, adjusting the remaining schedule when actual volume deviates."),
  c41.n(IA, "apply-ar1-volume", 7,
    "Log daily volume follows an AR(1) around its mean with coefficient $0.8$. Yesterday’s log volume was $0.5$ above its mean. What is the forecast deviation for tomorrow (two days after yesterday)?",
    0.32),
  c41.m(IA, "apply-intrasecond-implication", 7, "Given intrasecond volume spikes at predictable milliseconds, an execution algorithm should:",
    "Avoid sending child orders at those predictable instants, or randomise timing, to avoid competing with or revealing itself to timer-based algorithms", [
      ["Always trade at the start of each second", "That concentrates its orders where competition is greatest."],
      ["Ignore timing within the second", "The pattern can affect fill quality."],
      ["Trade only once per minute", "Coarse timing is not required; randomisation suffices."],
    ]),
  c41.s(IA, "explain-volatility-plateau", 7,
    "Volatility falls through the morning and plateaus from midday. Give an information-based explanation and a liquidity-based one.",
    "Information-based: overnight news is digested early, so price uncertainty and the arrival of informed trades decline as the day progresses.",
    "Liquidity-based: depth builds and spreads narrow after the open, so the same order flow moves prices less, lowering measured volatility."),

  // level 8
  c41.n(IA, "apply-two-scale", 8,
    "Realised variance from one-minute returns is $260$ bps$^2$ for a day with $390$ intervals, and noise variance is estimated at $\\omega^2 = 0.08$ bps$^2$. Subtract the noise bias $2n\\omega^2$. What noise-corrected realised variance remains? Give $1$ decimal place.",
    197.6),
  c41.s(IA, "explain-volume-volatility-mechanism", 8,
    "Why might volume and volatility be so strongly correlated? Explain a mixture-of-distributions argument.",
    "Explains that both are driven by the same latent rate of information arrival: on days with more news, more trades occur and each moves prices, so volume and volatility rise together.",
    "Notes the implication: returns are a mixture of Normals with random variance, giving fat tails unconditionally, and conditioning on volume or trade count makes returns closer to Normal."),
  c41.m(IA, "apply-round-price-strategy", 8, "Knowing that liquidity clusters at round prices, a liquidating seller might:",
    "Expect deeper bids and more fills at round prices, and avoid placing sell orders just above a round number where many sell orders already queue", [
      ["Always sell at whole dollars", "Long queues at round prices also mean long waits."],
      ["Ignore price levels", "The pattern carries information about depth."],
      ["Post only at prices ending in 99 cents", "There is no evidence for that pattern."],
    ]),
  c41.n(IA, "apply-seasonal-adjust", 8,
    "A one-minute return of $9$ bps occurs at the open, where typical one-minute volatility is $6$ bps, and another of $6$ bps at midday, where typical volatility is $2.5$ bps. Which is the larger standardised move? Report the larger $z$-score.",
    2.4),

  // level 9
  c41.s(IA, "transfer-schedule-design", 9,
    "You must sell $2\\%$ of daily volume by the close. Using intraday volume and volatility patterns, design a schedule and justify how it trades off cost and risk.",
    "Proposes trading more where volume is high (open and close) to reduce impact per share, following a volume-curve (VWAP-like) baseline.",
    "Adjusts for risk and cost: the open is expensive (wide spreads, high volatility), so the schedule may underweight the first minutes, use the closing auction for a chunk, and adapt to realised volume."),
  c41.m(IA, "transfer-anomaly", 9, "On one day, volume at noon is three times its usual level. A volume-based execution algorithm should most sensibly:",
    "Treat it as possible news, raising its volume forecast for the rest of the day and checking for an information event before accelerating", [
      ["Ignore it, since the intraday curve is fixed", "Persistence means today’s surprise predicts more volume."],
      ["Stop trading for the day", "High volume often means good liquidity."],
      ["Trade all remaining shares immediately", "That ignores impact and the possible information content."],
    ]),
  c41.s(IA, "transfer-cross-market", 9,
    "Would you expect the same intraday U-shape in a 24-hour FX market? Explain using the mechanisms in this section.",
    "Argues that FX has no single open and close, so the pronounced U-shape driven by overnight information and closing needs should be absent.",
    "Predicts instead peaks tied to regional sessions and their overlaps (for example London–New York), fixes and data releases, consistent with activity following information arrival and liquidity concentration."),
  c41.n(IA, "apply-forecast-error", 9,
    "Daily volume forecasts have a $25\\%$ standard error. A VWAP order targets $2\\%$ of forecast volume, $100{,}000$ shares. If actual volume is $1$ standard error below forecast, what percentage of actual volume does the order represent? Give $2$ decimal places.",
    2.67),

  // level 10
  c41.s(IA, "transfer-microstructure-noise-estimation", 10,
    "Explain why realised volatility from very high-frequency returns is biased, and outline one estimator that corrects it.",
    "Explains that observed prices equal efficient prices plus microstructure noise (bounce, discreteness), so each squared return includes noise variance, and the bias grows with the sampling frequency.",
    "Outlines a correction: two-scale realised volatility (combining fast and slow sampling), realised kernels, or pre-averaging, which remove the noise component."),
  c41.s(IA, "transfer-intraday-strategy", 10,
    "A market maker wants to set her quoting aggressiveness by time of day. Combine the intraday volume, volatility and spread evidence into a rule, and explain the risk if she ignores the pattern.",
    "Proposes quoting wider and smaller at the open (high volatility and adverse selection), tighter and larger at midday, and adjusting near the close as volume rises and inventory must be flattened.",
    "Explains the risk of a uniform rule: being picked off at the open, earning too little at midday, and ending the day with unwanted inventory."),
  c41.n(IA, "apply-variance-share", 10,
    "Intraday one-minute volatility is $10$ bps in the first $30$ minutes and $4$ bps for the remaining $360$ minutes of a $390$-minute day. What fraction of daily return variance occurs in the first $30$ minutes? Give $3$ decimal places.",
    0.342),
  c41.m(IA, "transfer-mixture", 10, "Conditioning daily returns on the number of trades that day typically makes them:",
    "Much closer to Normal, consistent with a mixture of distributions driven by information arrival", [
      ["More fat-tailed", "Conditioning removes the variation in variance that creates fat tails."],
      ["Perfectly predictable", "The direction remains unpredictable."],
      ["Uniformly distributed", "They become closer to Normal, not uniform."],
    ]),
];

const quality: Item[] = [
  // level 1
  c43.m(MQ, "recall-effective-spread", 1, "The effective spread of a trade measures:",
    "How far the execution price is from the midprice at the time of the trade, doubled", [
      ["The quoted ask minus bid", "That is the quoted spread."],
      ["The fee per share", "Fees are separate."],
      ["The change in midprice after the trade", "That is price impact."],
    ]),
  c43.m(MQ, "recall-depth", 1, "Market depth refers to:",
    "The volume posted in the LOB and available for immediate execution, often measured at the best quotes", [
      ["The number of price levels with orders", "Depth is about volume, not just price levels."],
      ["The spread", "The spread is a price gap."],
      ["Daily traded volume", "Depth is standing volume in the book."],
    ]),
  c43.m(MQ, "recall-temporary-permanent", 1, "Temporary price impact is the effect of an order on:",
    "Its own execution price, from walking the book, without changing the midprice afterwards", [
      ["The midprice’s future level", "That is permanent impact."],
      ["The spread’s long-run average", "Impact concerns prices, not average spreads."],
      ["Other traders’ fees", "Fees are unaffected."],
    ]),
  c43.m(MQ, "recall-hidden", 1, "Hidden orders help explain why:",
    "Effective spreads are often smaller than quoted spreads", [
      ["Quoted spreads are always one tick", "Quoted spreads vary."],
      ["Volume is U-shaped", "Hidden orders do not explain intraday volume."],
      ["Prices cluster at round numbers", "That is a different pattern."],
    ]),

  // level 2
  c43.n(MQ, "apply-relative-spread", 2,
    "A stock has a median quoted spread of $1.4$ cents and a median midprice of \\$473.00. What is the relative spread in basis points? Give $2$ decimal places.",
    0.3),
  c43.n(MQ, "apply-effective", 2,
    "A buy executes at \\$20.02 when the midprice is \\$20.005. What is the effective spread $2(p - m)$, in cents? Give $1$ decimal place.",
    3),
  c43.n(MQ, "apply-isns-bps", 2,
    "A stock’s median quoted spread is $22$ cents with median midprice \\$5.25. What is its relative spread in bps? Give $0$ decimal places.",
    419),
  c43.m(MQ, "recall-negative-es", 2, "A negative effective spread on a buy means:",
    "The buyer paid less than the prevailing midprice, for example by executing against a hidden order inside the spread", [
      ["The buyer overpaid", "Overpaying gives a positive effective spread."],
      ["The trade was cancelled", "Cancelled trades have no effective spread."],
      ["A data error", "It can be genuine price improvement."],
    ]),

  // level 3
  c43.n(MQ, "apply-qes", 3,
    "Quantity-weighted effective spread: three trades of $100$, $300$ and $600$ shares have effective spreads $2$, $1$ and $1.5$ cents. Compute $\\sum_j q_j ES_j/\\sum_j q_j$ in cents.",
    1.4),
  c43.n(MQ, "apply-depth-dollars", 3,
    "The best bid has $189$ shares and the best ask $201$ shares for a \\$473 stock. What is the dollar depth at the touch, in dollars?",
    184470),
  c43.m(MQ, "apply-mo-timing", 3, "MOs tend to arrive when spreads are narrow. As a result, the observed spread right after an MO is:",
    "Typically wider, partly because the MO consumed liquidity at the best price, not necessarily because MOs cause spreads to widen in general", [
      ["Always narrower", "Executions remove depth at the touch."],
      ["Unaffected", "The book changes when liquidity is taken."],
      ["Negative", "The spread cannot be negative."],
    ]),
  c43.m(MQ, "apply-fundamental-vs-noise", 3, "The literature distinguishes fundamental volatility from microstructure noise because:",
    "Some price fluctuation reflects changes in true value while some comes only from how the market operates", [
      ["Both are the same thing", "They have different sources and implications."],
      ["Microstructure noise always dominates", "Its share depends on the sampling frequency."],
      ["Fundamental volatility is unobservable in principle", "It can be estimated with noise-robust methods."],
    ]),

  // level 4
  c43.n(MQ, "apply-temp-impact", 4,
    "Temporary impact is modelled as $\\hat{S} - S^{\\text{best}} = \\tfrac{\\Delta}{2} + k\\,q$, the average execution premium over the best price for an MO of $q$ shares. With $k = 3 \\times 10^{-6}$ dollars per share and $q = 5{,}000$, what is the premium beyond the half-spread, in cents?",
    1.5),
  c43.n(MQ, "apply-perm-impact", 4,
    "Permanent impact is estimated by regressing five-minute midprice changes on net order flow: $\\Delta S = b\\,\\mu + \\varepsilon$. With $b = 1.8 \\times 10^{-6}$ dollars per share and net order flow $\\mu = 20{,}000$ shares, what is the predicted midprice change in cents?",
    3.6),
  c43.m(MQ, "apply-b-over-k", 4, "Table 4.13 reports the ratio $b/k$ of permanent to temporary impact. Why does this ratio matter for execution?",
    "It determines how much a trader gains from slowing down: temporary impact punishes speed, while permanent impact is paid regardless of timing", [
      ["It measures volatility", "Both are impact parameters, not volatility."],
      ["It determines the tick size", "Tick size is set by regulation."],
      ["It is always below one", "Estimates range from about $1$ to over $7$."],
    ]),
  c43.n(MQ, "apply-fill-ratio", 4,
    "Of $5{,}193$ LOs posted $2$ ticks from the midprice, $13.5\\%$ were executed. About how many executed? Give $1$ decimal place.",
    701.1),

  // level 5
  c43.n(MQ, "apply-walk-cost", 5,
    "A buy MO of $3{,}000$ shares walks a book with $1{,}000$ shares at each of the asks \\$40.01, \\$40.02 and \\$40.03, with the bid at \\$40.00. Compute its average premium over the midprice, in cents.",
    1.5),
  c43.s(MQ, "explain-depth-meaning", 5,
    "Why is depth at the touch an imperfect measure of the price impact a large order will face?",
    "Explains that depth at the touch shows how much can trade without walking the book, but a large order also consumes deeper levels and hidden liquidity that the touch does not show.",
    "Adds that depth is dynamic: the book replenishes or withdraws in response to trading, and visible depth can be cancelled before the order arrives."),
  c43.m(MQ, "apply-cancellation-rate", 5, "Most posted limit orders are cancelled rather than executed. The book’s explanation is that:",
    "Liquidity providers constantly reposition orders as new information arrives, especially low-latency market makers", [
      ["Most orders are posted by mistake", "Cancellation is a deliberate strategy."],
      ["Exchanges cancel stale orders", "Traders cancel their own orders."],
      ["Orders are only posted to be cancelled", "Most cancellations are repositioning, not spoofing."],
    ]),
  c43.n(MQ, "apply-fill-decay", 5,
    "Suppose the fraction of posted LOs executed falls exponentially with distance $d$ (in ticks), $e^{-\\kappa d}$. If $55\\%$ execute at $d = 2$ and $28\\%$ at $d = 5$, estimate $\\kappa$. Give $3$ decimal places.",
    0.225),

  // level 6
  c43.s(MQ, "explain-impact-estimation", 6,
    "Describe how the book estimates the temporary impact parameter $k$ from snapshots of the LOB.",
    "Explains that at each snapshot one computes the average execution price of hypothetical MOs of various sizes walking the book, and the difference from the best quote.",
    "Explains that $k$ is the slope of a linear regression of this premium on order size, with intercept fixed at the half-spread, estimated every second and averaged over the day."),
  c43.n(MQ, "apply-impact-total", 6,
    "With temporary impact $k = 2.5 \\times 10^{-7}$ dollars per share per share and permanent impact $b = 6.15 \\times 10^{-7}$, compare the immediate execution premium $kq$ and the permanent midprice move $bq$ for $q = 40{,}000$ shares. What is $b/k$? Give $2$ decimal places.",
    2.46),
  c43.m(MQ, "apply-same-side-arrival", 6, "Table 4.10 shows that after a large buy MO, other buy MOs follow in about $43\\%$ of cases and sells in about $8\\%$. This is evidence of:",
    "Clustering of same-side order flow, as from order splitting or herding", [
      ["Independence of order arrivals", "Same-side clustering contradicts independence."],
      ["Immediate reversal of order flow", "Opposite-side arrivals are rare."],
      ["Market makers taking the other side", "Market makers use LOs, not MOs."],
    ]),
  c43.n(MQ, "apply-hidden-share", 6,
    "A stock has $3{,}849$ shares of hidden volume executed per day on average and $25{,}000$ shares of total executed volume per day. What percentage of execution is against hidden orders? Give $1$ decimal place.",
    15.4),

  // level 7
  c43.s(MQ, "explain-effective-vs-quoted", 7,
    "Effective spreads are less volatile than quoted spreads and often smaller. Give two reasons.",
    "Notes that traders time MOs to arrive when quoted spreads are narrow, so executions sample the tighter moments.",
    "Notes hidden orders and midpoint or price-improving executions, which trade inside the quoted spread."),
  c43.n(MQ, "apply-realized-spread", 7,
    "A buy executes at \\$20.02 with midprice \\$20.00; five minutes later the midprice is \\$20.015. The realised spread is $2(p - m_{t+5})$ and the price impact is $2(m_{t+5} - m_t)$. Compute the realised spread in cents.",
    1),
  c43.m(MQ, "apply-realized-meaning", 7, "In the decomposition effective spread $=$ realised spread $+$ price impact, the price-impact part measures:",
    "The liquidity provider’s loss to the information in the trade, which persists after it", [
      ["The exchange fee", "Fees are not in this decomposition."],
      ["The liquidity provider’s profit", "That is the realised spread."],
      ["The tick size", "Ticks bound spreads but are not a component."],
    ]),
  c43.s(MQ, "explain-cancel-execution-ratio", 7,
    "What do high cancellation-to-execution ratios imply for an execution algorithm reading displayed depth?",
    "Explains that much displayed depth is fleeting: it may be cancelled before or as an order arrives, especially when the order reveals itself.",
    "Concludes that the algorithm should discount displayed depth, estimate the probability depth survives, and avoid signalling its intentions, for example by randomising child orders."),

  // level 8
  c43.n(MQ, "apply-impact-schedule", 8,
    "Selling $Q = 100{,}000$ shares at a constant rate over $T$ minutes, with temporary impact $k\\nu$ per share where $\\nu = Q/T$ is shares per minute and $k = 4 \\times 10^{-6}$ dollars per (share per minute), the total temporary cost is $kQ^2/T$. Compute it for $T = 100$ minutes, in dollars.",
    400),
  c43.s(MQ, "explain-impact-intraday", 8,
    "The slope of the linear temporary-impact model is highest in the morning and lowest near the close. What does this imply for an execution schedule, and why might the pattern arise?",
    "Implies that trading is cheaper later in the day per share, so a cost-minimising schedule shifts volume away from the open, balanced against risk.",
    "Explains the pattern by thin depth and wide spreads early (uncertainty, adverse selection) and deep books late, matching the intraday spread and depth evidence."),
  c43.m(MQ, "apply-linearity", 8, "Figure 4.10 shows expected order flow conditional on price changes is roughly linear except at the extremes. For modelling, this supports:",
    "A linear permanent-impact model over the range where most observations lie, with caution for very large moves", [
      ["A purely nonlinear model everywhere", "Linearity fits most of the data."],
      ["No relationship between flow and prices", "The relationship is clearly positive."],
      ["Dropping order flow from execution models", "Order flow is central to Chapters 7 and 12."],
    ]),
  c43.n(MQ, "apply-perm-cost", 8,
    "With permanent impact $b = 1.82 \\times 10^{-6}$ dollars per share, selling $Q = 200{,}000$ shares lowers the midprice by $bQ$ by the end. If the decline accrues linearly as she sells, her average extra cost per share is $bQ/2$. What is her total permanent-impact cost, in dollars?",
    36400),

  // level 9
  c43.s(MQ, "transfer-impact-measurement", 9,
    "Your desk wants to estimate its own permanent impact. Why is regressing price changes on its own trades problematic, and how would you do better?",
    "Explains that the desk trades more when prices move (or when information arrives), so its trades are correlated with price changes for reasons other than impact, biasing the estimate.",
    "Proposes using variation in trading that is unrelated to price signals, such as randomised child-order timing or client-driven flow, and measuring the impact that persists after the trade."),
  c43.m(MQ, "transfer-hidden-strategy", 9, "A liquidity provider wants to post inside the spread without revealing size. Which approach do the chapter’s facts support?",
    "Hidden or midpoint-pegged orders, which execute ahead of displayed liquidity at better prices on many venues", [
      ["Large displayed orders at the touch", "Those reveal size."],
      ["Stub quotes", "Stub quotes are far from the market and not meant to fill."],
      ["Repeated cancellations", "Cancellation does not hide size."],
    ]),
  c43.s(MQ, "transfer-hft-market-quality", 9,
    "Does high-frequency trading improve market quality? Use the dimensions in Section 4.3 to frame the evidence you would look for.",
    "Frames market quality as spreads (quoted, effective, realised), volatility, depth and price impact, and proposes checking how each moves with HFT participation, ideally using exogenous changes such as latency upgrades.",
    "Notes the nuances: narrower spreads and more depth may coexist with fleeting liquidity, larger cancellation rates and adverse selection of slower traders, so conclusions depend on which dimension and which traders."),
  c43.n(MQ, "apply-impact-ratio-optimal", 9,
    "If a strategy’s cost is $kQ^2/T$ for temporary impact plus a risk penalty $\\phi\\,Q^2T/3$, the cost-minimising $T$ is $\\sqrt{3k/\\phi}$. With $k = 4 \\times 10^{-6}$ and $\\phi = 1.2 \\times 10^{-9}$ (per minute), compute it in minutes.",
    100),

  // level 10
  c43.s(MQ, "transfer-cancellation-regulation", 10,
    "A regulator proposes a minimum resting time for limit orders to curb cancellations. Predict the effects on spreads, depth and adverse selection, using the evidence of this chapter.",
    "Predicts that providers who cannot cancel quickly face more adverse selection (stale quotes), so they quote wider, post less depth, or post further from the mid.",
    "Notes possible benefits (displayed depth becomes more reliable, less fleeting liquidity) and argues that the net effect on investors is likely worse liquidity in fast-moving stocks."),
  c43.s(MQ, "transfer-impact-model-choice", 10,
    "Linear impact models explain a small share of price variation ($R^2$ often below $5\\%$). Argue whether an execution desk should adopt a more complex impact model.",
    "Argues that low $R^2$ reflects the dominance of unrelated price noise, so even a correct impact model explains little variance; complexity risks overfitting with small gains.",
    "Proposes keeping a simple, robust (linear or square-root) model calibrated by time of day and stock, validated on execution cost out of sample rather than $R^2$, and adding complexity only when it improves realised costs."),
  c43.n(MQ, "apply-depth-halfspread", 10,
    "A stock has half-spread $0.5$ cents, temporary impact $k = 3 \\times 10^{-6}$ dollars per share and permanent impact $b = 6 \\times 10^{-6}$. For a single $10{,}000$-share MO, the immediate cost per share is $\\Delta/2 + kq$ and the permanent shift $bq$ also hits the remaining position. With $50{,}000$ shares still to sell after this MO, what is the total cost in dollars of the MO, including the permanent effect on the remainder?",
    3350),
  c43.m(MQ, "transfer-spread-components", 10, "Spreads across stocks are wider when price impact (the adverse-selection part) is larger, holding volatility fixed. This is most consistent with:",
    "An important adverse-selection component in spreads", [
      ["Spreads being purely inventory compensation", "Inventory theories predict a link to volatility, not to permanent impact."],
      ["Spreads set by tick size alone", "Ticks bind only for some stocks."],
      ["Spreads being independent of information", "The link to permanent impact says otherwise."],
    ]),
];

export const ahtEmpiricsItems: Item[] = [...data, ...interarrival, ...intraday, ...quality];
