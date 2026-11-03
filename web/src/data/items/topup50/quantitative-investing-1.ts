import type { Item } from "../../../lib/assessment/types";
import { m, n, s } from "./shared";

/**
 * Quantitative Investing top-up, part 1: markets and participants, sources of
 * excess returns, returns, stylized facts, GARCH and EWMA volatility. Ten new
 * items per lesson, one at each level from 1 to 10.
 */

const MP = "markets-and-participants";
const marketsAndParticipants: Item[] = [
  // level 1
  m(MP, "t50-recall-market-order", 1, "A market order is an order that:",
    "Executes immediately against the best prices resting in the book",
    [
      ["Rests in the book until the price reaches a level the trader specified", "That is a limit order; a market order specifies no price."],
      ["Executes only in the closing auction", "That is a market-on-close order, a special case."],
      ["Is routed only to dark pools", "Market orders are routed to lit venues as well; the term refers to immediacy, not venue."],
    ]),
  // level 2
  n(MP, "t50-apply-cross-cost", 2, "A market buy order for $300$ shares fills at the ask of $\\$40.02$ while the mid price is $\\$40.00$. Find the cost relative to the mid, in dollars.", 6),
  // level 3
  m(MP, "t50-apply-passive-limit", 3, "The best bid is $\\$49.97$ and the best ask is $\\$50.00$. A trader submits a limit buy order at $\\$49.95$. What happens?",
    "It rests in the book below the best bid and does not execute immediately",
    [
      ["It executes immediately at $\\$50.00$", "Only a buy limit at or above the ask is marketable; $\\$49.95$ is below the ask."],
      ["It executes immediately at $\\$49.97$", "A buy order never trades against the bid; bids are other buyers."],
      ["It becomes the new best bid", "The best bid is the highest bid, and $\\$49.97$ is higher than $\\$49.95$."],
    ]),
  // level 4
  n(MP, "t50-apply-walk-book", 4, "The ask side of a book holds $200$ shares at $\\$10.00$, $300$ shares at $\\$10.01$ and $500$ shares at $\\$10.02$. A market buy order for $700$ shares walks the book. Find its average fill price in dollars.", 10.01),
  // level 5
  n(MP, "t50-apply-long-short-roe", 5, "A fund with $\\$100$ million of equity holds $\\$250$ million of longs and $\\$250$ million of shorts. Over a year its longs return $4\\%$ and the stocks it is short rise $1\\%$. Ignoring financing and fees, find the return on equity in percent.", 7.5),
  // level 6
  m(MP, "t50-apply-widen-spread", 6, "A dealer comes to believe that a larger share of its incoming orders are from informed traders. It should widen its quoted spread because:",
    "Its expected losses to informed traders per trade rise, and the spread earned on uninformed trades must cover them",
    [
      ["Wider spreads reduce its inventory", "Inventory is managed by skewing quotes; widening both sides symmetrically is about adverse selection."],
      ["Regulators require wider spreads when volume is informed", "No such rule exists; the response is economic, not regulatory."],
      ["Informed traders pay higher commissions", "Dealers earn the spread, not commissions, and informed traders pay no premium for being informed."],
    ]),
  // level 7
  s(MP, "t50-explain-maker-taker", 7, "An exchange pays a rebate to orders that post liquidity and charges a fee to orders that take it. Explain how this tends to affect quoted spreads, and why the all-in cost to a liquidity taker may change much less than the quoted spread does.",
    "Rebates make posting limit orders more profitable, so liquidity providers compete harder and quoted spreads tend to narrow",
    "The taker pays the quoted half-spread plus the take fee, which funds the rebate, so the narrower quote is partly offset by the fee and the all-in cost changes little"),
  // level 8
  m(MP, "t50-apply-bond-otc", 8, "Corporate bonds of a given issuer come in many issues and trade over the counter through dealers on request for quote. Compared with the issuer’s listed stock, you should expect the bonds to have:",
    "Wider effective spreads and less price transparency, because trading is fragmented across bespoke issues and dealers rather than pooled in one book",
    [
      ["Tighter spreads, because dealers compete for each request", "Competition on a request exists, but fragmentation and dealer inventory risk keep bond spreads much wider than stock spreads."],
      ["The same spreads, because the issuer’s credit risk is the same", "Spreads reflect the trading mechanism and liquidity, not just the issuer."],
      ["Continuously published prices from a central book", "OTC trades have no central book; prices are discovered dealer by dealer."],
    ]),
  // level 9
  n(MP, "t50-derive-informed-ask", 9, "A stock is worth either $\\$98$ or $\\$102$ with equal probability. A fraction $0.4$ of traders are informed and buy exactly when the value is $\\$102$ (sell otherwise); the rest buy or sell with probability $\\frac{1}{2}$ each regardless of value. A competitive dealer sets the ask equal to the expected value given that the next order is a buy. Find the ask in dollars.", 100.8),
  // level 10
  s(MP, "t50-judge-toxic-flow", 10, "A fund earns most of its profit from passive limit orders. Its realized spread is about half its quoted spread overall, and close to zero on fills from two particular brokers. Should it keep providing liquidity to all flow? Explain what you would measure and what you would decide.",
    "Uses the gap between realized and quoted spread as the adverse-selection cost: prices move against the fund after it is filled, most of all on the two brokers’ flow",
    "Measures realized spread net of fees and inventory costs by counterparty or venue, and avoids or reprices the flow whose net realized spread is not positive while keeping the profitable flow"),
];

const SE = "sources-of-excess-returns";
const sourcesOfExcessReturns: Item[] = [
  // level 1
  m(SE, "t50-recall-funding", 1, "In Paleologo’s list, which source of excess returns comes from traders who know an asset is cheap but lack the capital to buy it?",
    "Funding constraints",
    [
      ["Liquidity", "Liquidity concerns assets that are costly to trade or borrow, not the buyer’s lack of capital."],
      ["Predictable flows", "Predictable flows are known trades by institutions on known dates."],
      ["Informational advantage", "Here the traders already know the asset is cheap; what they lack is capital."],
    ]),
  // level 2
  n(SE, "t50-apply-index-dollar-demand", 2, "Index trackers hold $15\\%$ of the shares of every index member. A company with $200$ million shares trading at $\\$30$ is added to the index. Find the trackers’ dollar demand, in millions of dollars.", 900),
  // level 3
  m(SE, "t50-apply-impact-model-stage", 3, "In Paleologo’s investment pipeline, the market-impact model belongs to:",
    "The work done before the trade, alongside the risk model and expected-return models",
    [
      ["The work done during the trade, as part of portfolio construction", "Portfolio construction uses the impact model, but the model itself is built before the trade."],
      ["The work done after the trade, as part of attribution", "Attribution explains realized returns; it does not forecast costs."],
      ["The raw data layer", "Impact models are estimated from data but are models, not data."],
    ]),
  // level 4
  n(SE, "t50-apply-net-index-trade", 4, "A fund buys $\\$50$ million of a stock ahead of its index addition, expecting it to gain $4\\%$ by the effective date. Trading costs $25$ basis points each way. Find the expected net profit of the round trip, in millions of dollars.", 1.75),
  // level 5
  n(SE, "t50-apply-hit-rate-edge", 5, "A signal predicts a stock’s next-day direction correctly $55\\%$ of the time. When right the trade gains $1\\%$, when wrong it loses $1\\%$, and each round trip costs $0.05\\%$. Find the expected net return per trade in percent.", 0.05),
  // level 6
  m(SE, "t50-apply-crash-pattern", 6, "A strategy earns steady profits but suffers occasional large losses during market-wide deleveraging episodes. This pattern suggests its returns are, at least partly:",
    "Compensation for bearing liquidity or crash risk that others want to avoid",
    [
      ["Pure arbitrage profits", "Arbitrage is riskless; large losses in bad states rule it out."],
      ["Proof of an informational edge", "Losses concentrated in bad states point to a risk premium, not to better forecasts."],
      ["The result of front-running client orders", "Nothing in the return pattern involves non-public client information."],
    ]),
  // level 7
  s(SE, "t50-explain-pure-arbitrage", 7, "Explain why pure arbitrage opportunities, such as the same stock trading at two prices on two exchanges, are small and short-lived when they appear, and who tends to capture them.",
    "A riskless profit attracts every trader who can see it, so competition closes the gap almost immediately",
    "The profit goes to the fastest, lowest-cost traders (low-latency firms), and the opportunity has little capacity, so it is not a scalable source of excess return for most investors"),
  // level 8
  m(SE, "t50-apply-long-horizon-investor", 8, "A sovereign wealth fund has very stable capital, a long horizon and no margin calls. Relative to a leveraged hedge fund, which source of excess returns is it best placed to harvest?",
    "Buying from forced sellers when funding-constrained traders must deleverage",
    [
      ["Cross-exchange latency arbitrage", "That edge needs speed and infrastructure, not stable capital."],
      ["Faster processing of news than competitors", "An informational edge depends on research and speed, not on the fund’s capital structure."],
      ["Front-running its own clients’ orders", "That is illegal and has nothing to do with stable capital."],
    ]),
  // level 9
  n(SE, "t50-derive-rebalance-size", 9, "Ahead of an index rebalance a liquidity provider expects a stock to return $2\\%$ over $5$ days. The stock’s daily idiosyncratic volatility is $2\\%$, with independent days, and the round trip costs $0.5\\%$ of the position. The provider chooses the fraction $f$ of capital to hold by maximising $f(\\mu - c) - \\frac{\\lambda}{2}f^{2}\\sigma^{2}$ over the $5$-day horizon, with $\\lambda = 5$. Find $f$.", 1.5),
  // level 10
  s(SE, "t50-judge-alt-data-decay", 10, "A vendor starts selling satellite counts of cars in retailers’ parking lots, and you build a strategy on them. Using the definition of an efficient market with respect to an information set, argue whether the edge is likely to last, and what determines how long.",
    "The edge is informational: once enough traders buy the data and trade on it, prices come to reflect it and its excess return decays",
    "How long it lasts depends on who is on the other side and on the cost and exclusivity of the data, its capacity, and how fast competitors adopt it; widely sold data should be expected to decay quickly"),
];

const AR = "asset-returns";
const assetReturns: Item[] = [
  // level 1
  m(AR, "t50-recall-excess-return", 1, "The excess return of asset $i$ over a period is:",
    "$r_i - r_f$, its return minus the risk-free rate",
    [
      ["$r_i - r_m$, its return minus the market’s", "That is a return relative to the market (an active return), not an excess return."],
      ["$\\log(1 + r_i)$", "That is the log return."],
      ["$\\frac{r_i}{r_f}$", "Excess returns are differences, not ratios."],
    ]),
  // level 2
  n(AR, "t50-apply-log-to-simple", 2, "A stock’s log return over a month is $0.05$. Find its simple return. Give $4$ decimal places.", 0.0513),
  // level 3
  m(AR, "t50-apply-cross-section-linear", 3, "At a single date, which return of a portfolio equals the capital-weighted average of its assets’ returns?",
    "The simple return",
    [
      ["The log return", "The log of a weighted sum of gross returns is not the weighted sum of their logs."],
      ["Both, exactly", "Only simple returns aggregate linearly across assets."],
      ["Neither; returns never aggregate across assets", "Simple returns do: the portfolio PnL is $\\sum_i w_i r_i$."],
    ]),
  // level 4
  n(AR, "t50-apply-three-day-compound", 4, "A stock returns $2\\%$, $-3\\%$ and $5\\%$ on three consecutive days. Find its three-day simple return. Give $4$ decimal places.", 0.0389),
  // level 5
  n(AR, "t50-apply-long-short-financing", 5, "A portfolio is $\\$2$ million long stock A and $\\$1.5$ million short stock B, and its net market value is financed at the risk-free rate. Over the period A returns $4\\%$, B returns $2\\%$ and the risk-free rate is $1\\%$. Find the PnL in dollars.", 45000),
  // level 6
  m(AR, "t50-apply-halve-and-double", 6, "A stock falls from $\\$100$ to $\\$50$ and then rises back to $\\$100$. Which statement is correct?",
    "The two log returns sum to zero, while the average of the two simple returns is $25\\%$",
    [
      ["The two simple returns sum to zero", "They are $-50\\%$ and $+100\\%$, which sum to $50\\%$."],
      ["The average log return is $25\\%$", "The log returns are $\\mp 0.693$, which average to zero."],
      ["Both the simple and the log returns average to zero", "Only the log returns do; simple returns are not additive over time."],
    ]),
  // level 7
  s(AR, "t50-explain-volatility-drag", 7, "Explain why the arithmetic average of a stock’s daily simple returns overstates the rate at which an investor’s wealth actually compounds, and which quantity measures the compounding rate.",
    "Compounding is multiplicative, so volatility drags growth below the arithmetic mean: the growth rate is about $\\mu - \\frac{\\sigma^{2}}{2}$",
    "The average log return measures the compound growth rate of wealth, since wealth after $T$ periods is the exponential of the summed log returns"),
  // level 8
  m(AR, "t50-apply-roll-sampling", 8, "In the Roll model $p_t = m_t + \\epsilon_t$, with $m_t$ a random walk with increment variance $\\sigma_\\eta^{2}$, you measure price changes over $k$ days instead of one. The noise contribution to their variance:",
    "Stays at $2\\sigma_\\epsilon^{2}$ while the efficient-price part grows like $k\\sigma_\\eta^{2}$, so the relative bias shrinks as $k$ grows",
    [
      ["Grows in proportion to $k$", "Only the endpoints’ noise enters a $k$-day change, so the noise term does not grow with $k$."],
      ["Vanishes entirely for $k \\ge 2$", "The two endpoint noises are still there for any $k$."],
      ["Doubles with each doubling of $k$", "The noise term is fixed; it is the signal term that grows."],
    ]),
  // level 9
  n(AR, "t50-derive-roll-two-day", 9, "In the Roll model $m_{t+1} = m_t + \\eta_{t+1}$, $p_t = m_t + \\epsilon_t$, with independent noises, $\\sigma_\\eta = 0.01$ and $\\sigma_\\epsilon = 0.02$, find the correlation between consecutive non-overlapping two-day price changes $p_{t+2} - p_t$ and $p_{t+4} - p_{t+2}$.", -0.4),
  // level 10
  s(AR, "t50-judge-portfolio-log", 10, "An analyst computes a long-short portfolio’s daily log return as the capital-weighted sum of its assets’ daily log returns, then sums these over a year. Explain what goes wrong and how the annual return should be computed.",
    "The portfolio log return is not the weighted sum of asset log returns; the error grows with the dispersion of returns and with leverage, and is worst for long-short books whose gross exposure exceeds capital",
    "Compute each day’s portfolio simple return as $\\sum_i w_i r_i$ (with financing), then compound across days, or sum the logs of $1 +$ the daily portfolio simple returns"),
];

const SF = "stylized-facts-of-returns";
const stylizedFacts: Item[] = [
  // level 1
  m(SF, "t50-recall-clustering", 1, "Volatility clustering means that:",
    "Large returns, of either sign, tend to be followed by large returns",
    [
      ["Positive returns tend to be followed by positive returns", "That would be autocorrelation of returns, which is close to zero."],
      ["Volatility is constant over time", "Clustering says the opposite: volatility moves in regimes."],
      ["Stocks in the same industry have similar volatilities", "Clustering is a time-series property of one return series."],
    ]),
  // level 2
  n(SF, "t50-apply-kurtosis-moments", 2, "Daily returns have variance $4 \\times 10^{-4}$ and fourth central moment $8 \\times 10^{-7}$. Find their kurtosis.", 5),
  // level 3
  m(SF, "t50-apply-peaked-shape", 3, "Compared with a Gaussian of the same variance, a heavy-tailed return distribution typically has:",
    "More probability near the center and in the tails, and less in the shoulders",
    [
      ["Less probability near the center", "Matching the variance with fatter tails forces a taller, narrower peak."],
      ["The same shape, only stretched", "Stretching a Gaussian changes its variance but not its kurtosis."],
      ["A bounded range of possible values", "Heavy tails mean extreme values are more likely, not ruled out."],
    ]),
  // level 4
  n(SF, "t50-apply-tail-exponent-from-two", 4, "A return tail follows $P(r > x) = C x^{-\\alpha}$. You estimate $P(r > 2\\%) = 0.05$ and $P(r > 4\\%) = 0.003125$. Find $\\alpha$.", 4),
  // level 5
  n(SF, "t50-apply-days-to-normal", 5, "Daily returns are i.i.d. with excess kurtosis $12$. Find the smallest number of days $n$ for which the $n$-day summed return has excess kurtosis at most $0.5$.", 24),
  // level 6
  m(SF, "t50-apply-iid-t-fails", 6, "Returns are modelled as $r_t = \\sigma z_t$ with constant $\\sigma$ and i.i.d. Student $t$ innovations $z_t$ with $5$ degrees of freedom. Which stylized fact does this model miss?",
    "Volatility clustering: the autocorrelation of squared returns is zero",
    [
      ["Absence of return autocorrelation", "i.i.d. returns have zero autocorrelation, as the data do."],
      ["Heavy tails", "A $t$ with $5$ degrees of freedom has heavy tails."],
      ["Aggregational Gaussianity", "With finite variance, sums of i.i.d. returns become Gaussian by the central limit theorem."],
    ]),
  // level 7
  s(SF, "t50-explain-var-breach-clusters", 7, "A risk desk forecasts daily volatility as the constant sample standard deviation of the past five years. Using volatility clustering, explain how its back-tested $99\\%$ value-at-risk breaches will look.",
    "In high-volatility regimes the constant forecast is too low, so breaches are too frequent; in calm regimes it is too high, so breaches are too rare",
    "Breaches therefore bunch together in time rather than arriving independently, even if their overall rate is near $1\\%$"),
  // level 8
  m(SF, "t50-apply-alpha-two-half", 8, "A crypto asset’s daily returns have an estimated tail exponent of about $2.5$. Which consequence follows?",
    "The variance is finite but the fourth moment is not, so the sample kurtosis never settles down and variance estimates converge slowly",
    [
      ["The variance is infinite", "Moments of order below $2.5$, including the variance, are finite."],
      ["All moments are finite", "Moments of order $2.5$ and above are infinite."],
      ["Daily returns must be Gaussian", "A power tail with exponent $2.5$ is far heavier than Gaussian."],
    ]),
  // level 9
  n(SF, "t50-derive-days-for-variance", 9, "Daily returns are i.i.d. with mean zero and kurtosis $9$. Find the number of days $n$ needed for the standard deviation of the estimator $\\frac{1}{n}\\sum_t r_t^{2}$ to equal $10\\%$ of the true variance $\\sigma^{2}$.", 800),
  // level 10
  s(SF, "t50-judge-swap-to-t", 10, "A colleague notices that a Gaussian i.i.d. model underestimates tail events, and replaces it with an i.i.d. Student $t$ with $3$ degrees of freedom scaled to the sample variance. Assess whether this fixes the risk model.",
    "It matches the unconditional heavy tails better, but it is still i.i.d., so it ignores volatility clustering and mistimes risk: too low in turbulent periods, too high in calm ones",
    "A better fix models conditional volatility (for example EWMA or GARCH) and then uses moderately heavy-tailed standardized residuals, since returns scaled by conditional volatility have much thinner tails; a $t$ with $3$ degrees of freedom also has infinite kurtosis, which overstates the tails"),
];

const VF = "volatility-forecasting";
const volatilityForecasting: Item[] = [
  // level 1
  m(VF, "t50-recall-uncond-formula", 1, "The unconditional variance of a stationary GARCH(1,1) is:",
    "$\\frac{\\alpha_0}{1 - \\alpha_1 - \\beta_1}$",
    [
      ["$\\frac{\\alpha_0}{1 - \\beta_1}$", "This drops the $\\alpha_1$ term: squared returns also feed back into variance."],
      ["$\\alpha_0$", "The intercept is only the floor of each update, not the long-run level."],
      ["$\\frac{\\alpha_0}{\\alpha_1 + \\beta_1}$", "The denominator is one minus the persistence, not the persistence."],
    ]),
  // level 2
  n(VF, "t50-apply-rv-to-vol", 2, "A day’s realized variance is $2.25 \\times 10^{-4}$. Find the day’s realized volatility in percent.", 1.5),
  // level 3
  m(VF, "t50-apply-long-horizon-forecast", 3, "After an unusually large return today, the GARCH(1,1) forecast of the variance $20$ days ahead is:",
    "Closer to the unconditional variance than tomorrow’s forecast is",
    [
      ["Equal to tomorrow’s forecast", "That flat term structure belongs to a plain EWMA; GARCH forecasts mean-revert."],
      ["Equal to today’s squared return", "Even tomorrow’s forecast only partly reflects today’s squared return."],
      ["Further from the unconditional variance than tomorrow’s", "The gap shrinks by the factor $\\alpha_1 + \\beta_1 < 1$ each day."],
    ]),
  // level 4
  n(VF, "t50-apply-garch-vol", 4, "A GARCH(1,1) has $\\alpha_0 = 2 \\times 10^{-6}$, $\\alpha_1 = 0.05$ and $\\beta_1 = 0.93$. Yesterday $h_{t-1}^{2} = 2 \\times 10^{-4}$ and $r_{t-1} = 0.03$. Find today’s volatility forecast $h_t$ in percent. Give $2$ decimal places.", 1.53),
  // level 5
  n(VF, "t50-apply-days-to-revert", 5, "A GARCH(1,1) has $\\alpha_1 + \\beta_1 = 0.95$. The forecast gap $\\mathbb{E}[h_{t+k}^{2}] - \\bar{\\sigma}^{2}$ equals $(\\alpha_1 + \\beta_1)^{k-1}$ times the gap at $k = 1$. Find the smallest $k$ for which the gap is at most $10\\%$ of the gap at $k = 1$.", 46),
  // level 6
  m(VF, "t50-apply-near-integrated", 6, "A GARCH(1,1) fitted to a long daily sample gives $\\alpha_1 + \\beta_1 = 0.999$. The best interpretation is:",
    "Variance shocks barely decay, so the long-run variance is poorly pinned down; shifts in volatility regime within the sample can produce such estimates",
    [
      ["The variance is already infinite", "The unconditional variance is finite for any persistence below $1$, though very uncertain here."],
      ["Volatility is nearly constant", "Near-constant volatility would show up as a small $\\alpha_1$, not high persistence."],
      ["Returns are strongly autocorrelated", "Persistence concerns squared returns, not returns."],
    ]),
  // level 7
  s(VF, "t50-explain-garch-estimation", 7, "Explain why GARCH(1,1) parameters are found by numerical maximum likelihood, and what tends to go wrong when the sample is short.",
    "Each $h_t^{2}$ depends recursively on the parameters and all past returns, so the likelihood has no closed-form maximiser and must be optimised numerically",
    "On short samples persistence and the long-run variance are weakly identified: estimates hit boundaries (such as $\\alpha_1 + \\beta_1$ close to $1$), are unstable, or depend on starting values"),
  // level 8
  m(VF, "t50-apply-overnight-gap", 8, "Realized variance computed from $5$-minute returns during US trading hours, used as a measure of the full close-to-close variance, systematically misses:",
    "The variance of the overnight (close-to-open) return, which must be added or scaled in",
    [
      ["Nothing, because $5$-minute sampling is fine enough", "Fine sampling during the session says nothing about the price move while the market is closed."],
      ["The drift of the intraday price", "The drift is negligible at these horizons."],
      ["The variance during the first $5$ minutes", "The first interval is included like any other."],
    ]),
  // level 9
  n(VF, "t50-derive-ten-day-vol", 9, "A GARCH(1,1) has $\\bar{\\sigma}^{2} = 10^{-4}$, $\\alpha_1 + \\beta_1 = 0.9$ and next-day forecast $h_{t+1}^{2} = 6 \\times 10^{-4}$. Using $\\mathbb{E}[h_{t+k}^{2}] = \\bar{\\sigma}^{2} + (\\alpha_1 + \\beta_1)^{k-1}(h_{t+1}^{2} - \\bar{\\sigma}^{2})$ and independent daily returns, find the forecast volatility of the total return over the next $10$ days, in percent. Give $2$ decimal places.", 6.52),
  // level 10
  s(VF, "t50-judge-sqrt-ten", 10, "Right after a market shock, a risk manager computes $10$-day value-at-risk by scaling tomorrow’s GARCH volatility forecast by $\\sqrt{10}$. Critique this.",
    "Scaling by $\\sqrt{10}$ assumes the variance stays at tomorrow’s level; GARCH forecasts mean reversion, so after a shock this overstates the $10$-day variance (and in calm periods understates it)",
    "The consistent approach sums the $k$-step variance forecasts for $k = 1, \\dots, 10$; the manager should also allow for heavy tails, since the Gaussian quantile understates extreme losses"),
];

const EV = "ewma-volatility";
const ewmaVolatility: Item[] = [
  // level 1
  m(EV, "t50-recall-lambda-role", 1, "In an EWMA variance estimator, the decay parameter $\\lambda$ controls:",
    "How fast the weights on older squared returns shrink, the weight on a return $k$ days old being proportional to $\\lambda^{k}$",
    [
      ["The long-run level the variance reverts to", "A plain EWMA has no long-run level; that is GARCH’s $\\alpha_0$."],
      ["The mean return subtracted from each observation", "$\\lambda$ sets weights, not the centering."],
      ["The exact number of days in a rolling window", "EWMA weights every past day, with geometrically shrinking weights."],
    ]),
  // level 2
  n(EV, "t50-apply-weight-ratio", 2, "In an EWMA with $\\lambda = 0.9$, the weight on a squared return $k$ days old is proportional to $\\lambda^{k}$. Find the ratio of the weight on a return $10$ days old to the weight on the newest one. Give $4$ decimal places.", 0.3487),
  // level 3
  m(EV, "t50-apply-weights-sum", 3, "The EWMA weights $(1 - \\lambda)\\lambda^{k}$ for $k = 0, 1, 2, \\dots$ sum to:",
    "$1$",
    [
      ["$\\frac{1}{1 - \\lambda}$", "That is the sum of $\\lambda^{k}$ alone, before multiplying by $1 - \\lambda$."],
      ["$\\lambda$", "The factor $1 - \\lambda$ is chosen exactly so the weights sum to one."],
      ["$1 - \\lambda$", "That is only the weight on the newest observation."],
    ]),
  // level 4
  n(EV, "t50-apply-two-updates", 4, "An EWMA variance estimate with $\\lambda = 0.9$ starts at $10^{-4}$. The next two daily returns are $2\\%$ and then $-1\\%$. Find the estimate after both updates, in units of $10^{-4}$.", 1.27),
  // level 5
  n(EV, "t50-apply-recent-weight-share", 5, "For an EWMA with $\\lambda = 0.97$, find the fraction of the total weight that falls on the most recent $20$ days. Give $4$ decimal places.", 0.4562),
  // level 6
  m(EV, "t50-apply-abs-ewma", 6, "Returns are heavy-tailed. Replacing the EWMA of $r_t^{2}$ with an EWMA of $|r_t|$ (and converting it to a volatility) would:",
    "Make the estimate less sensitive to single extreme days, but it needs a scaling constant (such as $\\sqrt{\\frac{\\pi}{2}}$ for Gaussian returns) to estimate $\\sigma$",
    [
      ["Estimate $\\sigma$ without any rescaling", "$\\mathbb{E}|r_t|$ is smaller than $\\sigma$, so the raw average is biased down."],
      ["Make the estimate more sensitive to extreme days", "An outlier enters linearly rather than squared, so its influence falls."],
      ["Give exactly the same estimate", "Averaging absolute values and averaging squares weight outliers differently."],
    ]),
  // level 7
  s(EV, "t50-explain-initialization", 7, "An EWMA variance recursion must be started from an initial value $\\sigma_0^{2}$. Explain how long the initial value keeps influencing the estimate and how you would initialise it in practice.",
    "The initial value’s weight after $t$ updates is $\\lambda^{t}$, so it fades geometrically and is negligible after a few half-lives",
    "Initialise with a sensible level such as the sample variance of a burn-in window, and discard the first several half-lives of estimates before using them"),
  // level 8
  m(EV, "t50-apply-unadjusted-split", 8, "A stock does a $2$-for-$1$ split, and the price series fed to an EWMA volatility estimator is not split-adjusted. The estimate will:",
    "Spike on the split day from a spurious $-50\\%$ return, then decay back at the estimator’s half-life",
    [
      ["Be unaffected, because EWMA is robust to outliers", "The squared return of a fake $-50\\%$ move dominates the update."],
      ["Shift permanently to a higher level", "The spurious return’s weight decays geometrically like any other."],
      ["Change only the estimated mean return", "The EWMA here is of squared returns, so the variance is what jumps."],
    ]),
  // level 9
  n(EV, "t50-derive-muth-half-life", 9, "In Muth’s model with $\\sigma_\\eta^{2} = 1$ and $\\sigma_\\epsilon^{2} = 400$, the steady-state prior variance solves $P^{2} - P - 400 = 0$, the optimal gain is $K = \\frac{P}{P + 400}$ and the filter is an EWMA with $\\lambda = 1 - K$. Find its half-life in days. Give $1$ decimal place.", 13.9),
  // level 10
  s(EV, "t50-judge-rv-input", 10, "For a risk model of liquid stocks you can run an EWMA either on daily squared returns $r_t^{2}$ or on daily realized variances from intraday data. Argue which input you would use and how the optimal $\\lambda$ should differ between the two.",
    "Realized variance is a far less noisy observation of $\\sigma_t^{2}$ than $r_t^{2}$, so in Muth’s terms the observation noise is smaller and the optimal gain is larger",
    "With realized variances the optimal $\\lambda$ is lower (shorter half-life), letting the estimate react faster at the same noise level; caveats include microstructure noise, the overnight gap and lack of intraday data for illiquid names"),
];

export const t50QuantitativeInvesting1Items: Item[] = [
  ...marketsAndParticipants,
  ...sourcesOfExcessReturns,
  ...assetReturns,
  ...stylizedFacts,
  ...volatilityForecasting,
  ...ewmaVolatility,
];
