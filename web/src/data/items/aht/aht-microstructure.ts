import type { Item } from "../../../lib/assessment/types";
import { chapter } from "./shared";

/** Ch. 2: Grossman–Miller market making, Kyle and Glosten–Milgrom (40 items per lesson). */

const MML = "market-making-and-liquidity";
const KY = "kyle-model";
const GM = "glosten-milgrom-model";
const c21 = chapter("Ch. 2, A Primer on the Microstructure of Financial Markets (§2.1 Market Making)");
const c22 = chapter("Ch. 2, A Primer on the Microstructure of Financial Markets (§2.2 Trading on an Informational Advantage)");
const c23 = chapter("Ch. 2, A Primer on the Microstructure of Financial Markets (§2.3 Market Making with an Informational Disadvantage)");

const marketMaking: Item[] = [
  // level 1
  c21.m(MML, "recall-immediacy", 1, "In the microstructure view, the key service market makers sell is:",
    "Immediacy: the ability to trade now without waiting for a counterparty with the offsetting need", [
      ["Information about fundamental value", "That is what informed traders bring, not market makers."],
      ["Guaranteed profits for liquidity traders", "Liquidity traders pay for immediacy; they are not guaranteed anything."],
      ["Custody of securities", "Custody is a back-office service, not liquidity provision."],
    ]),
  c21.m(MML, "recall-gm-risk", 1, "In the Grossman–Miller model, market makers demand compensation because:",
    "Holding inventory until the offsetting trader arrives exposes them to price risk, and they are risk-averse", [
      ["They face informed traders", "Grossman–Miller has no private information; that is Kyle and Glosten–Milgrom."],
      ["Exchanges charge them fees", "Fees are an extension; the core is inventory risk."],
      ["They are risk-neutral but impatient", "Risk aversion is what makes the inventory costly."],
    ]),
  c21.m(MML, "recall-participation-cost", 1, "In Grossman–Miller, higher participation costs for market makers lead to:",
    "Fewer market makers, and therefore a larger liquidity discount", [
      ["More market makers", "Costs deter entry."],
      ["No change in prices", "Competition $n$ falls, which raises the discount."],
      ["A smaller liquidity discount", "Less competition makes the discount larger."],
    ]),
  c21.m(MML, "recall-lo-tradeoff", 1, "A market maker choosing how deep to post a limit order trades off:",
    "Profit per trade, which rises with depth, against the probability of being filled, which falls with depth", [
      ["Fees against rebates", "Fees matter, but the central trade-off is margin versus fill probability."],
      ["Speed against latency", "Those are the same thing."],
      ["Bid against ask", "Both sides face the same trade-off separately."],
    ]),

  // level 2
  c21.n(MML, "apply-gm-mm-holding", 2,
    "In Grossman–Miller, a liquidity trader arrives at $t = 1$ wanting to sell $i = 900$ shares, and there are $n = 8$ market makers. In equilibrium every participant ends $t = 1$ holding $i/(n + 1)$ shares. How many shares does each market maker hold?",
    100),
  c21.n(MML, "apply-gm-lt-sale", 2,
    "Same setting, $i = 900$ and $n = 8$. How many shares does the liquidity trader actually sell at $t = 1$?",
    800),
  c21.n(MML, "apply-ho-stoll-depth", 2,
    "A risk-neutral market maker maximises $\\delta\\,e^{-\\kappa\\delta}$, the depth times the fill probability. With $\\kappa = 50$ per dollar, what depth does she choose, in cents?",
    2),
  c21.m(MML, "recall-t2-price", 2, "In Grossman–Miller, why is the price at $t = 2$ equal to the efficient price $\\mu + \\epsilon_2$?",
    "The offsetting liquidity trader arrives, so there is no aggregate imbalance and nobody needs to be paid to hold risk", [
      ["Market makers are forced to quote it", "Prices are set by market clearing, not obligation."],
      ["Volatility is zero at $t = 2$", "$\\epsilon_3$ is still unknown at $t = 2$."],
      ["Liquidity traders are risk-neutral", "Everyone is risk-averse; the imbalance is what disappears."],
    ]),

  // level 3
  c21.n(MML, "apply-gm-discount", 3,
    "Grossman–Miller discount: $\\mu - S_1 = \\gamma\\sigma^2\\,\\frac{i}{n + 1}$. With risk aversion $\\gamma = 0.02$, variance $\\sigma^2 = 4$, $i = 900$ and $n = 8$, what is the discount per share in dollars?",
    8),
  c21.n(MML, "apply-gm-lambda", 3,
    "Writing the Grossman–Miller price as $S_1 = \\mu - \\lambda\\,q$, where $q = \\frac{n}{n + 1}i$ is what the liquidity trader sells, gives $\\lambda = \\gamma\\sigma^2/n$. Compute $\\lambda$ for $\\gamma = 0.02$, $\\sigma^2 = 4$ and $n = 8$.",
    0.01),
  c21.m(MML, "apply-discount-drivers", 3, "Which change increases the Grossman–Miller liquidity discount?",
    "Higher asset volatility", [
      ["More market makers", "Competition reduces the discount."],
      ["A smaller liquidity shock", "The discount is proportional to $|i|$."],
      ["Lower risk aversion", "Less risk aversion means less compensation is needed."],
    ]),
  c21.n(MML, "apply-ho-stoll-profit", 3,
    "With fill probability $e^{-\\kappa\\delta}$ and $\\kappa = 50$ per dollar, what is the expected profit per MO arrival, $\\delta\\,e^{-\\kappa\\delta}$, at the optimal depth? Give the answer in cents, to $2$ decimal places.",
    0.74),

  // level 4
  c21.n(MML, "apply-gm-competition-limit", 4,
    "With $\\gamma\\sigma^2 = 0.08$ and $i = 900$, compare the discount $\\gamma\\sigma^2 i/(n + 1)$ for $n = 8$ and $n = 89$ market makers. By how many dollars per share does the discount fall?",
    7.2),
  c21.n(MML, "apply-gm-fees", 4,
    "With per-share fees $\\eta$, the Grossman–Miller price becomes $S_1 = \\mu - \\gamma\\sigma^2\\frac{i}{n + 1} - \\frac{2n}{n + 1}\\eta$. With $\\mu = 50$, $\\gamma\\sigma^2 = 0.08$, $i = 900$, $n = 8$ and $\\eta = 0.009$, compute $S_1$. Give $3$ decimal places.",
    41.984),
  c21.m(MML, "apply-fee-incidence", 4, "With trading fees in Grossman–Miller, who bears most of the market makers’ fees?",
    "The liquidity trader who initiates the trade, through a lower sale price", [
      ["The market makers", "They recover $2n\\eta/(n + 1)$ of their $2\\eta$ through the discount."],
      ["The exchange", "The exchange collects the fees."],
      ["The second liquidity trader", "The fees enter at $t = 1$ through the first trader’s price."],
    ]),
  c21.s(MML, "explain-liquidity-measures", 4,
    "Grossman–Miller suggests two empirical measures of liquidity. Name them and explain how each reflects the liquidity discount.",
    "Names price impact, $\\lambda$ in $S_1 = \\mu - \\lambda q$: how far the price moves per unit of order size, larger when liquidity is scarce.",
    "Names the autocovariance of price changes, $\\text{Cov}(\\Delta_1, \\Delta_2) = -\\lambda^2\\text{Var}(q)$: the temporary discount reverses, so price changes are negatively autocorrelated, more so in illiquid markets."),

  // level 5
  c21.n(MML, "apply-autocovariance", 5,
    "In the extended Grossman–Miller model, $\\text{Cov}(\\Delta_1, \\Delta_2) = -\\lambda^2\\text{Var}(q)$. With $\\lambda = 0.01$ and $\\text{Var}(q) = 250{,}000$ shares$^2$, compute the autocovariance of price changes.",
    -25),
  c21.m(MML, "apply-lo-depth-mean", 5, "In the static Ho–Stoll-style model with fill probability $e^{-\\kappa\\delta}$, the optimal depth $1/\\kappa$ equals:",
    "The mean depth of the exponential distribution describing the other orders in the book", [
      ["The quoted spread", "It depends only on $\\kappa$, not on the current spread."],
      ["Zero, because posting at the mid fills most often", "At $\\delta = 0$ the profit per trade is zero."],
      ["Infinity, because deeper orders earn more", "Fill probability vanishes as depth grows."],
    ]),
  c21.s(MML, "explain-gm-split", 5,
    "In Grossman–Miller, why does the first liquidity trader sell only $\\frac{n}{n + 1}$ of the shares she wants to sell at $t = 1$, keeping the rest until $t = 2$?",
    "Explains that she is price-sensitive and risk-averse: selling more at $t = 1$ deepens the discount she must give, so she keeps some shares and bears some of the price risk herself.",
    "Notes that in equilibrium she shares the risk equally with the $n$ market makers (everyone holds $i/(n + 1)$), and that as $n \\to \\infty$ she sells everything at the efficient price."),
  c21.n(MML, "apply-fill-rate-depth", 5,
    "MOs arrive at rate $\\lambda = 60$ per hour, and a sell LO at depth $\\delta$ fills each MO with probability $e^{-\\kappa\\delta}$, where $\\kappa = 100$ per dollar. How many fills per hour are expected at $\\delta = \\$0.01$? Give $2$ decimal places.",
    22.07),

  // level 6
  c21.s(MML, "explain-participation-vs-fees", 6,
    "Participation costs and per-share trading fees both affect liquidity in the Grossman–Miller framework, but through different channels. Explain the difference.",
    "Explains that participation costs act through competition: they deter market makers from entering, lowering $n$ and raising the discount.",
    "Explains that per-share fees act mostly directly on the price and on immediacy (a larger discount and a smaller first-period trade), while market makers recover most of their fees, so fees have a smaller effect through competition."),
  c21.n(MML, "apply-gm-holding-fees", 6,
    "With fees, the first liquidity trader ends $t = 1$ holding $\\frac{i}{n + 1} + \\frac{2n}{n + 1}\\frac{\\eta}{\\gamma\\sigma^2}$ shares. With $i = 900$, $n = 8$, $\\eta = 0.009$ and $\\gamma\\sigma^2 = 0.08$, how many shares does she hold?",
    100.2),
  c21.m(MML, "apply-static-mm-limits", 6, "Which limitation of the static limit-order placement model does the book highlight?",
    "Fill probabilities and arrival rates are exogenous and constant, and the market maker has no inventory risk or dynamic objective", [
      ["It assumes the market maker is risk-averse", "The static model assumes risk neutrality."],
      ["It ignores the midprice", "Depth is measured from the midprice."],
      ["It requires informed traders", "The model has none."],
    ]),
  c21.n(MML, "apply-power-fill", 6,
    "Suppose instead the fill probability is $(1 + \\kappa\\delta)^{-2}$. Maximising $\\delta(1 + \\kappa\\delta)^{-2}$ gives $\\delta^{*} = 1/\\kappa$. For $\\kappa = 50$ per dollar, what is the expected profit per MO arrival at the optimum, in cents?",
    0.5),

  // level 7
  c21.s(MML, "explain-gm-derivation", 7,
    "Derive the Grossman–Miller period-1 price $S_1 = \\mu - \\gamma\\sigma^2\\frac{i}{n + 1}$ from each agent’s CARA–Normal demand.",
    "Uses that with CARA utility and Normal payoffs each agent holds $q = \\frac{\\mathbb{E}[S_2] - S_1}{\\gamma\\sigma^2} = \\frac{\\mu - S_1}{\\gamma\\sigma^2}$, the same for the $n$ market makers and the first liquidity trader.",
    "Imposes market clearing: total holdings $(n + 1)q$ must equal the $i$ shares brought to market, so $(n + 1)\\frac{\\mu - S_1}{\\gamma\\sigma^2} = i$, which gives the formula."),
  c21.n(MML, "apply-entry", 7,
    "Each market maker’s expected profit from one episode is $\\frac{\\gamma\\sigma^2}{2}\\left(\\frac{i}{n + 1}\\right)^2$ in certainty-equivalent terms. With $\\gamma\\sigma^2 = 0.08$ and $i = 900$, what is the largest $n$ for which this covers a participation cost of $c = 50$?",
    24),
  c21.m(MML, "apply-impact-vs-reversal", 7, "In richer dynamic models, price impact and the autocovariance of returns become distinct because:",
    "Some impact is permanent (it shifts the efficient price) while some is temporary (it reverses), and only the temporary part generates negative autocovariance", [
      ["Autocovariance measures volatility, not liquidity", "Negative autocovariance reflects reversal of temporary impact."],
      ["Price impact is always zero in continuous time", "The execution chapters build on non-zero impact."],
      ["They are identical by definition", "They coincide only in the static Grossman–Miller model."],
    ]),
  c21.s(MML, "explain-walrasian-to-lob", 7,
    "Grossman–Miller is solved as if a Walrasian auctioneer cleared the market at one price. How does the book map it onto an electronic limit order book?",
    "Explains that the patient market makers are the limit orders resting in the book, and the eager liquidity trader sends market orders that execute against them.",
    "Explains that as the liquidity trader’s MOs walk the book or arrive in pieces, the price moves away from the initial midprice, and her average execution price $S_1$ embodies the discount relative to the initial mid, the usual proxy for the efficient price."),

  // level 8
  c21.n(MML, "apply-optimal-depth-two-sided", 8,
    "A risk-neutral market maker posts on both sides. Buy MOs arrive with probability $0.6$ and fill a sell LO at depth $\\delta^{+}$ with probability $e^{-40\\delta^{+}}$; sell MOs arrive with probability $0.4$ and fill a buy LO at depth $\\delta^{-}$ with probability $e^{-80\\delta^{-}}$. What is the optimal sum $\\delta^{+} + \\delta^{-}$, in cents?",
    3.75),
  c21.s(MML, "explain-fee-break-even", 8,
    "With per-share fee $\\eta$, a liquidity trader with a small desired trade $|i|$ may prefer not to trade at all. Explain the mechanism and how the threshold depends on $\\eta$.",
    "Explains that the trader pays her own fee plus a large share of the market makers’ fees through the discount, a cost that is roughly proportional to quantity, while her benefit from trading (risk reduction) is roughly quadratic in quantity.",
    "Concludes that for small $|i|$ the risk-sharing gain does not cover the fee-driven costs, so there is a minimum trade size below which she stays out, and this threshold rises with $\\eta$."),
  c21.m(MML, "apply-gm-risk-neutral", 8, "If all agents in Grossman–Miller were risk-neutral, then:",
    "The liquidity discount would vanish and $S_1 = \\mu$, since nobody needs compensation for bearing price risk", [
      ["The discount would be infinite", "Risk-neutral market makers absorb inventory at no cost."],
      ["Market makers would refuse to trade", "They would be indifferent and willing at the efficient price."],
      ["The model would reduce to Kyle", "Kyle needs private information."],
    ]),
  c21.n(MML, "apply-autocorr-sign", 8,
    "In the extended model, $\\Delta_1 = \\epsilon_1 - \\lambda q$ and $\\Delta_2 = \\epsilon_2 + \\lambda q$ with $\\epsilon_t$ independent of variance $\\sigma^2$. Compute $\\text{Corr}(\\Delta_1, \\Delta_2)$ for $\\sigma^2 = 25$, $\\lambda = 0.01$ and $\\text{Var}(q) = 250{,}000$.",
    -0.5),

  // level 9
  c21.s(MML, "transfer-gm-to-hft", 9,
    "Use Grossman–Miller to argue how the entry of many fast, low-cost market makers would affect liquidity for institutional traders, and identify one way the conclusion could fail.",
    "Argues that lower participation costs raise $n$, cutting the discount $\\gamma\\sigma^2 i/(n + 1)$ and letting liquidity traders sell more of their shares immediately.",
    "Identifies a failure mode outside the model: fast market makers may hold tiny inventories and withdraw in volatile periods, or anticipate large orders and trade ahead of them, so effective liquidity for large orders may not improve."),
  c21.n(MML, "apply-crossing-risk", 9,
    "A liquidity trader wants to sell $i = 1{,}000$ shares with $\\gamma\\sigma^2 = 0.05$. Her certainty-equivalent cost of the Grossman–Miller trade (discount on the shares sold) is $\\frac{n}{n + 1}i \\times \\gamma\\sigma^2\\frac{i}{n + 1}$. Compute it for $n = 4$.",
    8000),
  c21.m(MML, "transfer-volatility-spreads", 9, "Ahead of a scheduled earnings announcement, inventory-based theories predict that spreads:",
    "Widen, because the risk of holding inventory through the announcement rises", [
      ["Narrow, because more traders arrive", "More arrivals can help, but the dominant effect of higher risk is wider spreads."],
      ["Are unaffected, since inventory is risk-free", "Inventory risk is the whole point of Grossman–Miller."],
      ["Become negative", "Market makers would lose money on every round trip."],
    ]),
  c21.s(MML, "transfer-static-to-dynamic", 9,
    "The static placement model gives depth $1/\\kappa$ regardless of inventory. Describe how you expect the optimal depths to change once inventory risk and a finite horizon are added, as in Chapter 10.",
    "Predicts inventory-dependent skew: a long market maker lowers her sell depth and raises her buy depth to shed inventory, and vice versa.",
    "Predicts horizon effects: as the end of trading approaches with non-zero inventory, depths shift further to unwind it, and stronger inventory aversion makes the skew larger."),

  // level 10
  c21.s(MML, "transfer-design-liquidity-metric", 10,
    "You must rank stocks by liquidity for an execution desk. Using the measures in this section, propose a metric, say how you would estimate it from intraday data, and explain one bias.",
    "Proposes a price-impact measure, such as the regression slope of midprice changes on signed order flow (an empirical $\\lambda$), possibly together with spread and the negative return autocovariance, estimated over short windows.",
    "Explains a bias: order flow is endogenous (traders trade when liquidity is good), the bid–ask bounce inflates negative autocovariance, and impact varies through the day, so estimates need careful conditioning."),
  c21.n(MML, "apply-break-even-n", 10,
    "Market makers enter while the per-episode certainty-equivalent gain $\\frac{\\gamma\\sigma^2}{2}\\left(\\frac{i}{n + 1}\\right)^2$ is at least the participation cost $c$. With $\\gamma\\sigma^2 = 0.08$, $i = 900$ and $c = 50$, what is the resulting discount $\\gamma\\sigma^2 i/(n + 1)$ per share at the free-entry $n$? Give $2$ decimal places.",
    2.88),
  c21.s(MML, "transfer-two-sources", 10,
    "Compare the two economic sources of the bid–ask spread in this chapter, inventory risk (Grossman–Miller) and adverse selection (Kyle, Glosten–Milgrom), and describe evidence that would distinguish them.",
    "Explains that inventory-risk spreads compensate for price risk and are temporary, so prices revert after trades; adverse-selection spreads compensate for losses to informed traders, so price moves after trades are permanent.",
    "Proposes distinguishing evidence: decompose spreads into realised and price-impact components (reversal versus permanent move after trades), or relate spreads to volatility and inventory versus measures of informed trading."),
  c21.m(MML, "transfer-negative-fees", 10, "A venue introduces large rebates for liquidity providers paid for by takers. In the spirit of Grossman–Miller, which effect is most plausible?",
    "Quoted spreads may narrow, but the cost for liquidity takers, net of fees, may not fall", [
      ["All trading costs fall", "Takers pay the rebates through higher taker fees."],
      ["Market makers leave", "Rebates attract providers."],
      ["The liquidity discount becomes negative", "Rebates shift costs; they do not make immediacy free."],
    ]),
];

const kyle: Item[] = [
  // level 1
  c22.m(KY, "recall-kyle-setup", 1, "In the Kyle model, which agents trade?",
    "One insider who knows the asset’s value, price-insensitive noise traders, and competitive risk-neutral market makers", [
      ["Many risk-averse market makers and one liquidity trader", "That is Grossman–Miller."],
      ["Only informed traders", "Without noise traders the insider’s trades would reveal her information immediately."],
      ["Market makers who know the value", "In Kyle, only the insider knows $v$."],
    ]),
  c22.m(KY, "recall-semi-strong", 1, "Competition among risk-neutral market makers forces the Kyle price to equal:",
    "$\\mathbb{E}[v \\mid x + u]$, the expected value given total order flow", [
      ["The true value $v$", "Market makers do not observe $v$."],
      ["The unconditional mean $\\mu$", "Prices react to order flow."],
      ["The insider’s demand", "The price is a value, not a quantity."],
    ]),
  c22.m(KY, "recall-lambda", 1, "Kyle’s lambda measures:",
    "How much the price moves per unit of net order flow", [
      ["The insider’s trading intensity", "That is $\\beta$."],
      ["The volatility of the asset’s value", "That is $\\sigma_v$."],
      ["The fraction of informed traders", "Kyle has one insider; that fraction is a Glosten–Milgrom parameter."],
    ]),
  c22.m(KY, "recall-camouflage", 1, "The insider can earn positive expected profits because:",
    "Noise traders’ random orders camouflage her trades", [
      ["Market makers are irrational", "Market makers are rational and Bayesian."],
      ["She trades after the price is set", "Prices are set after observing total order flow, which includes her trade."],
      ["She has lower fees", "There are no fees in the model."],
    ]),

  // level 2
  c22.n(KY, "apply-lambda", 2,
    "In Kyle’s model, $\\lambda = \\frac{\\sigma_v}{2\\sigma_u}$. With $\\sigma_v = 4$ and $\\sigma_u = 1{,}000$ shares, compute $\\lambda$.",
    0.002),
  c22.n(KY, "apply-beta", 2,
    "The insider trades $x = \\beta(v - \\mu)$ with $\\beta = \\frac{\\sigma_u}{\\sigma_v}$. With $\\sigma_v = 4$ and $\\sigma_u = 1{,}000$, compute $\\beta$.",
    250),
  c22.n(KY, "apply-insider-order", 2,
    "With $\\beta = 250$, $\\mu = 50$ and true value $v = 53$, how many shares does the insider buy?",
    750),
  c22.m(KY, "recall-linear-pricing", 2, "Kyle’s equilibrium pricing rule is:",
    "$S = \\mu + \\lambda(x + u)$, linear in net order flow", [
      ["$S = v$", "That would require market makers to know $v$."],
      ["$S = \\mu + \\lambda x$", "Market makers cannot separate $x$ from $u$."],
      ["$S = \\mu - \\lambda(x + u)$", "Prices rise with buying pressure."],
    ]),

  // level 3
  c22.n(KY, "apply-price", 3,
    "With $\\mu = 50$, $\\lambda = 0.002$, the insider buying $750$ shares and noise traders selling $250$, what price do market makers set?",
    51),
  c22.n(KY, "apply-best-response", 3,
    "Given a linear pricing rule with $\\lambda = 0.004$, the insider’s optimal intensity is $\\beta = \\frac{1}{2\\lambda}$. Compute $\\beta$.",
    125),
  c22.m(KY, "apply-lambda-noise", 3, "If noise trading doubles in standard deviation, Kyle’s lambda:",
    "Halves", [
      ["Doubles", "$\\lambda = \\sigma_v/(2\\sigma_u)$ falls as $\\sigma_u$ rises."],
      ["Is unchanged", "More camouflage makes prices less sensitive to order flow."],
      ["Quadruples", "$\\lambda$ is inversely proportional to $\\sigma_u$, not to its square."],
    ]),
  c22.m(KY, "apply-insider-scaling", 3, "When noise trading doubles, the insider:",
    "Doubles her trading intensity, since $\\beta = \\sigma_u/\\sigma_v$", [
      ["Trades the same amount", "More camouflage lets her trade more aggressively."],
      ["Halves her trading", "She scales up, not down."],
      ["Stops trading", "More noise makes informed trading more profitable."],
    ]),

  // level 4
  c22.n(KY, "apply-expected-profit", 4,
    "Conditional on $v$, the insider’s expected profit is $\\frac{\\beta}{2}(v - \\mu)^2$. With $\\beta = 250$ and $v - \\mu = 3$, compute it.",
    1125),
  c22.n(KY, "apply-unconditional-profit", 4,
    "Unconditionally, the insider’s expected profit is $\\frac{\\sigma_u\\sigma_v}{2}$. Compute it for $\\sigma_u = 1{,}000$ and $\\sigma_v = 4$.",
    2000),
  c22.n(KY, "apply-posterior-variance", 4,
    "In Kyle’s equilibrium, $\\text{Var}(v \\mid x + u) = \\frac{\\sigma_v^2}{2}$: half the prior variance is revealed. With $\\sigma_v = 4$, what is the posterior standard deviation? Give $3$ decimal places.",
    2.828),
  c22.s(KY, "explain-adverse-selection", 4,
    "In the Kyle model, who bears the insider’s profits, and why do market makers break even?",
    "Explains that noise traders bear the cost: they trade at prices moved against them by $\\lambda$, losing on average exactly what the insider gains.",
    "Explains that competitive market makers set $S = \\mathbb{E}[v \\mid x + u]$, so their expected profit is zero: their losses to the insider are offset by gains from noise traders."),

  // level 5
  c22.n(KY, "apply-noise-loss", 5,
    "Noise traders’ expected loss is $\\lambda\\sigma_u^2$. With $\\lambda = 0.002$ and $\\sigma_u = 1{,}000$, compute it.",
    2000),
  c22.m(KY, "apply-insider-fullsize", 5, "Why doesn’t the insider trade as much as possible in the direction of her information?",
    "Her own order moves the price through $\\lambda$, so trading more erodes the profit per share; the optimum balances size against impact", [
      ["She is risk-averse", "The insider is risk-neutral in the model."],
      ["Regulations cap her trade", "No regulation is modelled."],
      ["Noise traders front-run her", "Noise traders are price-insensitive and uninformed."],
    ]),
  c22.n(KY, "apply-price-error", 5,
    "With $\\mu = 50$, $\\lambda = 0.002$, $\\beta = 250$ and $v = 54$, the insider buys $\\beta(v - \\mu)$ shares and noise traders buy $u = 0$. How far below $v$ is the price?",
    2),
  c22.s(KY, "explain-fixed-point", 5,
    "Describe the fixed-point logic used to solve the static Kyle model.",
    "Explains that one conjectures a linear price rule $S = \\mu + \\lambda(x + u)$ and solves the insider’s problem, giving $x = (v - \\mu)/(2\\lambda)$.",
    "Explains that one then requires market makers’ pricing to be consistent with that strategy, $\\lambda = \\text{Cov}(v, x + u)/\\text{Var}(x + u)$ by Normal projection, and solves the two equations to get $\\lambda = \\sigma_v/(2\\sigma_u)$."),

  // level 6
  c22.n(KY, "apply-projection-lambda", 6,
    "Given the insider’s rule $x = \\beta(v - \\mu)$, market makers set $\\lambda = \\frac{\\beta\\sigma_v^2}{\\beta^2\\sigma_v^2 + \\sigma_u^2}$. Check this at $\\beta = 250$, $\\sigma_v = 4$ and $\\sigma_u = 1{,}000$.",
    0.002),
  c22.n(KY, "apply-lambda-vol", 6,
    "A stock’s value uncertainty $\\sigma_v$ triples around an announcement while noise trading stays the same. By what factor does the price impact of a $1{,}000$-share net order change?",
    3),
  c22.m(KY, "apply-toxic-flow", 6, "Kyle’s lambda is often read as the price of “toxic” order flow. Why is it larger when informed trading matters more?",
    "Each unit of order flow is more likely to reflect information, so market makers move the price more in response", [
      ["Market makers charge higher fees", "No fees are modelled."],
      ["Noise traders become informed", "Noise traders stay uninformed by assumption."],
      ["The insider trades less", "Lambda reflects how informative flow is, not how much the insider trades."],
    ]),
  c22.s(KY, "explain-price-efficiency", 6,
    "In what sense is the Kyle price semi-strong efficient but not strong-form efficient?",
    "Explains semi-strong efficiency: the price equals the expectation of $v$ given all public information, which here is total order flow.",
    "Explains that it is not strong-form efficient because the insider’s private knowledge of $v$ is only partly impounded: half the prior variance remains."),

  // level 7
  c22.n(KY, "apply-r2-orderflow", 7,
    "In Kyle’s equilibrium, what fraction of the variance of $v$ is explained by total order flow $x + u$?",
    0.5),
  c22.s(KY, "explain-insider-foc", 7,
    "Derive the insider’s optimal order given $S = \\mu + \\lambda(x + u)$.",
    "Writes expected profit $\\mathbb{E}_u[x(v - \\mu - \\lambda(x + u))] = x(v - \\mu) - \\lambda x^2$, using $\\mathbb{E}[u] = 0$.",
    "Maximises the concave quadratic: $v - \\mu - 2\\lambda x = 0$, so $x^{*} = \\frac{v - \\mu}{2\\lambda}$, that is $\\beta = 1/(2\\lambda)$."),
  c22.n(KY, "apply-expected-price-move", 7,
    "With $\\lambda = 0.002$ and $\\beta = 250$, the price’s expected move given $v$ is $\\lambda\\beta(v - \\mu)$. What fraction of the insider’s information is reflected in the price on average?",
    0.5),
  c22.m(KY, "apply-competing-insiders", 7, "Kyle (1989) studies several competing informed traders. Compared with a single insider, competition typically:",
    "Makes them trade more aggressively in total, revealing more information and lowering their combined profits", [
      ["Makes them collude perfectly", "Competing insiders trade more aggressively, unlike a monopolist."],
      ["Leaves prices less informative", "More aggressive informed trading makes prices more informative."],
      ["Eliminates price impact", "Market makers still face adverse selection."],
    ]),

  // level 8
  c22.s(KY, "explain-dynamic-kyle", 8,
    "In the dynamic version of Kyle’s model the insider trades gradually over many periods. Explain why she does not trade all at once, and what happens to price informativeness by the end.",
    "Explains that trading everything at once would reveal her information immediately through a large order-flow imbalance and a large price move, so she trades gradually, hiding in each period’s noise.",
    "States that prices incorporate her information gradually, and by the end of trading the price converges to $v$: all private information is revealed."),
  c22.n(KY, "apply-lambda-from-data", 8,
    "A regression of five-minute midprice changes on net order flow gives slope $2 \\times 10^{-6}$ dollars per share. If net order-flow standard deviation is $50{,}000$ shares and we read the slope as Kyle’s $\\lambda$, what value-uncertainty $\\sigma_v$ does the model imply?",
    0.2),
  c22.m(KY, "apply-risk-averse-mm", 8, "If market makers in Kyle’s model were risk-averse rather than risk-neutral, price impact would:",
    "Rise, combining an adverse-selection component with an inventory-risk component", [
      ["Fall", "Risk aversion adds a reason to move prices against order flow."],
      ["Vanish", "Adverse selection remains."],
      ["Become negative", "Prices still move with order flow."],
    ]),
  c22.s(KY, "explain-kyle-vs-gm-model", 8,
    "Contrast how Kyle and Grossman–Miller each explain why prices move with order flow.",
    "Explains that in Grossman–Miller, risk-averse market makers need a premium to absorb inventory, so price moves are temporary compensation for risk.",
    "Explains that in Kyle, risk-neutral market makers update beliefs because order flow may come from the insider, so price moves reflect information and are permanent."),

  // level 9
  c22.s(KY, "transfer-execution-implication", 9,
    "An institutional trader with no information must buy a large block. Use Kyle’s model to explain why she still faces price impact, and what this implies for how she should trade.",
    "Explains that market makers cannot tell her uninformed order from the insider’s, so any net buying moves the price by $\\lambda$ per share.",
    "Concludes that she should split the order over time or across venues, or signal that it is uninformed (for example via sunshine trading), to reduce the impact that Kyle’s market makers impose on all order flow."),
  c22.n(KY, "apply-impact-cost-block", 9,
    "An uninformed buyer submits $Q = 20{,}000$ shares in one batch into a Kyle market with $\\lambda = 0.002$. Ignoring the noise traders’ flow, what is her expected execution cost relative to $\\mu$, $\\lambda Q^2$, in dollars?",
    800000),
  c22.m(KY, "transfer-disclosure", 9, "A regulator forces insiders to disclose their trades immediately after trading. In Kyle-type reasoning, this would:",
    "Make prices reveal information faster and reduce insiders’ profits, though it may also reduce their incentive to gather information", [
      ["Have no effect, since the trade is already done", "In dynamic models, disclosure removes camouflage for later trades."],
      ["Increase noise traders’ losses", "Faster revelation reduces the time insiders can profit from noise traders."],
      ["Eliminate all price impact", "Market makers still face uncertainty about new orders."],
    ]),
  c22.s(KY, "transfer-crypto", 9,
    "In a market with very little noise trading (say, a thinly traded token with few retail users), what does Kyle’s model predict for spreads, price impact and the profitability of private information? Explain.",
    "Predicts very large $\\lambda$ (impact) because $\\sigma_u$ is small: almost any order flow is suspected to be informed.",
    "Predicts that the insider earns little ($\\sigma_u\\sigma_v/2$ is small) and trades little, so information is incorporated slowly or the market barely functions, consistent with illiquidity feeding on itself."),

  // level 10
  s10kyle(),
  c22.n(KY, "apply-informed-share", 10,
    "Let $\\sigma_v = 4$ and $\\sigma_u = 1{,}000$. In equilibrium, what fraction of the variance of total order flow $x + u$ comes from the insider, $\\frac{\\beta^2\\sigma_v^2}{\\beta^2\\sigma_v^2 + \\sigma_u^2}$?",
    0.5),
  c22.s(KY, "transfer-information-acquisition", 10,
    "If becoming informed (learning $v$) costs $c$, use the Kyle profit formula to discuss when someone acquires information, and how noise trading affects price efficiency in that extended model.",
    "Uses expected insider profit $\\sigma_u\\sigma_v/2$: information is acquired when this exceeds $c$, so more noise trading makes information acquisition worthwhile.",
    "Discusses the Grossman–Stiglitz-type tension: noise trading lowers efficiency directly (camouflage) but raises the incentive to become informed, so in the extended model more noise can make prices more informative."),
  c22.m(KY, "transfer-lambda-dynamics", 10, "Empirically, intraday estimates of Kyle’s lambda are highest at the open. Which explanation fits the model best?",
    "Overnight news creates more value uncertainty $\\sigma_v$ relative to noise trading at the open", [
      ["Market makers are least risk-averse at the open", "Kyle’s market makers are risk-neutral; uncertainty is the driver."],
      ["Noise trading is highest at the open, which raises lambda", "More noise lowers lambda."],
      ["Fees are highest at the open", "Fees are constant through the day."],
    ]),
];

function s10kyle(): Item {
  return c22.s(KY, "transfer-multi-asset", 10,
    "Generalise Kyle’s intuition to an ETF and its constituents: an insider has information about one constituent. Where would she prefer to trade, and what does that imply for the ETF’s and the stock’s price impact?",
    "Argues that she trades where her information-to-noise ratio is best: in the stock if its noise trading is large enough, or partly via the ETF, where her information is diluted but noise trading is heavier.",
    "Implies that the stock’s lambda reflects its information asymmetry, while the ETF’s is lower (diluted information, more noise), so informed flow migrates and liquidity provision differs across the two.");
}

const glostenMilgrom: Item[] = [
  // level 1
  c23.m(GM, "recall-gm-setup", 1, "In the Glosten–Milgrom model, traders arriving at the market maker are:",
    "With probability $\\alpha$ informed (buying if the value is high, selling if low), otherwise uninformed and equally likely to buy or sell", [
      ["Always informed", "With only informed traders there would be no trade at any break-even spread."],
      ["Risk-averse liquidity traders with inventories", "That is Grossman–Miller."],
      ["One insider and many noise traders submitting a net order", "That is Kyle."],
    ]),
  c23.m(GM, "recall-ask-meaning", 1, "In Glosten–Milgrom, the competitive ask price equals:",
    "The expected value of the asset conditional on a buy order arriving", [
      ["The unconditional expected value", "A buy is informative, so the ask is above it."],
      ["The high value $V_H$", "That would hold only if every buyer were informed."],
      ["The last trade price", "Quotes are set from beliefs, not past prices."],
    ]),
  c23.m(GM, "recall-toxicity", 1, "In the book’s interpretation, the prevalence of toxicity is:",
    "$\\alpha$, the fraction of informed traders", [
      ["$p$, the probability of the high state", "$p$ shapes the magnitude of buy versus sell toxicity."],
      ["The spread itself", "The spread responds to toxicity."],
      ["The volatility of the asset", "The model has two values, not a volatility."],
    ]),
  c23.m(GM, "recall-martingale", 1, "In the dynamic Glosten–Milgrom model, transaction prices form:",
    "A martingale, since each price is the conditional expectation of the asset’s value given the history and the current order", [
      ["A mean-reverting process", "Rational updating makes prices unpredictable."],
      ["A deterministic path", "Prices depend on the random sequence of buys and sells."],
      ["A random walk with drift", "There is no predictable drift."],
    ]),

  // level 2
  c23.n(GM, "apply-unconditional-mean", 2,
    "The asset is worth $V_H = 105$ with probability $p = 0.5$ and $V_L = 95$ otherwise. What is its unconditional expected value?",
    100),
  c23.n(GM, "apply-buy-probability", 2,
    "With $\\alpha = 0.2$ informed traders and $p = 0.5$, the probability that the next order is a buy is $\\alpha p + \\frac{1 - \\alpha}{2}$. Compute it.",
    0.5),
  c23.n(GM, "apply-informed-given-buy", 2,
    "Same setting. What is the probability that a buyer is informed, $\\frac{\\alpha p}{\\alpha p + (1 - \\alpha)/2}$?",
    0.2),
  c23.m(GM, "recall-zero-profit", 2, "The bid and ask are pinned down by:",
    "Competition among market makers driving their expected profit on each side to zero", [
      ["The market maker’s risk aversion", "The market maker is risk-neutral."],
      ["Inventory limits", "Inventory plays no role in Glosten–Milgrom."],
      ["Exchange rules on tick size", "The model abstracts from ticks."],
    ]),

  // level 3
  c23.n(GM, "apply-ask-halfspread", 3,
    "$\\Delta_a = \\frac{\\alpha p}{\\alpha p + (1 - \\alpha)/2}(V_H - \\mu)$. With $V_H = 105$, $V_L = 95$, $p = 0.5$ and $\\alpha = 0.2$, compute the ask half-spread.",
    1),
  c23.n(GM, "apply-spread", 3,
    "Same parameters; by symmetry the bid half-spread is also $1$. What is the quoted spread?",
    2),
  c23.n(GM, "apply-ask-price", 3,
    "With $V_H = 110$, $V_L = 90$, $p = 0.5$ and $\\alpha = 0.3$, compute the ask price $a = \\mu + \\Delta_a$.",
    103),
  c23.m(GM, "apply-alpha-spread", 3, "As the fraction of informed traders $\\alpha$ rises, the Glosten–Milgrom spread:",
    "Widens", [
      ["Narrows", "More informed traders means more adverse selection to recover."],
      ["Is unchanged", "Each half-spread increases with $\\alpha$."],
      ["Becomes zero", "That happens only when $\\alpha = 0$."],
    ]),

  // level 4
  c23.n(GM, "apply-posterior-after-buy", 4,
    "With $p = 0.5$ and $\\alpha = 0.2$, after one buy the market maker updates to $p' = \\frac{p(\\alpha + (1 - \\alpha)/2)}{\\alpha p + (1 - \\alpha)/2}$. Compute $p'$.",
    0.6),
  c23.n(GM, "apply-new-ask", 4,
    "After that buy, $p' = 0.6$ with $V_H = 105$ and $V_L = 95$. The new expected value is $\\mu' = p'V_H + (1 - p')V_L$. Compute it.",
    101),
  c23.n(GM, "apply-asym-bid", 4,
    "With $V_H = 105$, $V_L = 95$, $p = 0.7$ and $\\alpha = 0.2$, compute the bid half-spread $\\Delta_b = \\frac{\\alpha(1 - p)}{\\alpha(1 - p) + (1 - \\alpha)/2}(\\mu - V_L)$. Give $3$ decimal places.",
    0.913),
  c23.s(GM, "explain-loss-recovery", 4,
    "Explain how the Glosten–Milgrom market maker recovers from uninformed traders what she loses to informed ones.",
    "Explains that the ask exceeds the current expected value by $\\Delta_a$: she earns $\\Delta_a$ on each uninformed buyer and loses $V_H - a$ on each informed buyer.",
    "Explains that zero expected profit sets $\\Delta_a$ so that the probability-weighted gains from uninformed buyers exactly offset the losses to informed buyers."),

  // level 5
  c23.n(GM, "apply-ask-high-p", 5,
    "With $V_H = 105$, $V_L = 95$, $p = 0.7$ and $\\alpha = 0.2$, compute the ask half-spread. Give $3$ decimal places.",
    0.778),
  c23.m(GM, "apply-asymmetry", 5, "When the high state is more likely ($p > 0.5$), the bid half-spread is larger than the ask half-spread mainly because:",
    "Although sells are less often informed, an informed sell reveals a large drop from a mean that sits close to $V_H$", [
      ["Informed traders prefer to sell", "Informed traders sell only in the low state, which is less likely."],
      ["The market maker holds inventory", "There is no inventory in the model."],
      ["Uninformed traders sell more often", "Uninformed traders buy and sell with equal probability."],
    ]),
  c23.n(GM, "apply-two-buys", 5,
    "Starting from $p = 0.5$ with $\\alpha = 0.2$, two buys arrive in a row. Applying the update twice (each time $p \\mapsto \\frac{0.6p}{0.2p + 0.4}$), what is the posterior probability of the high state? Give $4$ decimal places.",
    0.6923),
  c23.s(GM, "explain-price-discovery", 5,
    "How does the dynamic Glosten–Milgrom model describe price discovery?",
    "Explains that each buy or sell is a noisy signal of $v$; the market maker updates $p_t = \\mathbb{P}(v = V_H \\mid \\mathcal{F}_t)$ by Bayes’ rule and resets the bid and ask.",
    "Concludes that as orders accumulate, beliefs converge toward the true value and the spread narrows, so information is gradually impounded into prices."),

  // level 6
  c23.n(GM, "apply-buy-sell-cancel", 6,
    "Starting from $p = 0.5$ with $\\alpha = 0.2$, a buy is followed by a sell. Uninformed traders sell with probability $0.5$ and informed traders sell only in the low state, so $\\Pr(\\text{sell} \\mid V_H) = 0.4$ and $\\Pr(\\text{sell} \\mid V_L) = 0.6$. What is the posterior probability of the high state after the buy and the sell?",
    0.5),
  c23.m(GM, "apply-no-trade-informed", 6, "Why do informed traders in Glosten–Milgrom never refuse to trade when the market maker quotes $a < V_H$ and $b > V_L$?",
    "They make a sure profit on every trade in the direction of their information", [
      ["They are forced to trade", "They trade because it is profitable."],
      ["They are risk-averse", "They are risk-neutral, and the profit is certain."],
      ["They cannot see the quotes", "They see the quotes and act on them."],
    ]),
  c23.n(GM, "apply-urgency-halfspread", 6,
    "With price-sensitive liquidity traders, $\\Delta_a = \\frac{V_H - \\mu}{1 + \\frac{(1 - \\alpha)(1 - F(\\Delta_a))}{2\\alpha p}}$. With $V_H - \\mu = 5$, $\\alpha = 0.2$, $p = 0.5$ and $1 - F(\\Delta_a) = 0.5$ at the solution, what is $\\Delta_a$? Give $4$ decimal places.",
    1.6667),
  c23.s(GM, "explain-urgency", 6,
    "When liquidity traders are price-sensitive (they trade only if their urgency $c_i$ exceeds the half-spread), why do half-spreads widen compared with the basic model?",
    "Explains that a wider half-spread drives away the least urgent uninformed traders, while informed traders keep trading.",
    "Concludes that the informed share of orders rises with the half-spread, so the break-even half-spread must be larger than when all liquidity traders always trade."),

  // level 7
  c23.s(GM, "explain-market-collapse", 7,
    "Explain how the Glosten–Milgrom market can collapse when liquidity traders are price-sensitive and their urgency is low.",
    "Explains the feedback loop: raising the spread drives out uninformed traders, which raises the informed share and requires an even larger spread.",
    "Concludes that if urgency parameters are small, the only solution is $\\Delta_a = V_H - \\mu$ and $\\Delta_b = \\mu - V_L$, at which no uninformed trader trades: the market shuts down, and any trade reveals the value."),
  c23.n(GM, "apply-expected-loss-informed", 7,
    "With $V_H = 105$, $\\mu = 100$, $\\alpha = 0.2$, $p = 0.5$ and ask $a = 101$, what is the market maker’s expected loss per order to informed buyers, $\\alpha p(V_H - a)$?",
    0.4),
  c23.n(GM, "apply-expected-gain-uninformed", 7,
    "Same setting. What is her expected gain per order from uninformed buyers, $\\frac{1 - \\alpha}{2}(a - \\mu)$?",
    0.4),
  c23.m(GM, "apply-quote-after-buy", 7, "Immediately after a buy at the ask, the dynamic Glosten–Milgrom market maker’s new bid and ask:",
    "Both move up, because her estimate of $v$ has risen", [
      ["Both move down", "A buy is evidence for the high value."],
      ["Stay the same", "Bayesian updating changes beliefs after every trade."],
      ["Move apart symmetrically around the old mid", "The whole quote shifts up."],
    ]),

  // level 8
  c23.s(GM, "explain-zero-profit-derivation", 8,
    "Derive $\\Delta_a = \\frac{\\alpha p}{\\alpha p + (1 - \\alpha)/2}(V_H - \\mu)$ from the market maker’s zero-profit condition.",
    "Writes expected profit from posting $a = \\mu + \\Delta_a$: uninformed buyers arrive with probability $(1 - \\alpha)/2$ and give $\\Delta_a$; informed buyers arrive with probability $\\alpha p$ and give $\\Delta_a - (V_H - \\mu)$.",
    "Sets the total to zero: $\\left(\\frac{1 - \\alpha}{2} + \\alpha p\\right)\\Delta_a = \\alpha p(V_H - \\mu)$, which gives the formula, equivalently $a = \\mathbb{E}[v \\mid \\text{buy}]$."),
  c23.n(GM, "apply-orders-to-converge", 8,
    "With $\\alpha = 0.2$, each buy multiplies the odds $p/(1 - p)$ of the high state by $\\frac{\\alpha + (1 - \\alpha)/2}{(1 - \\alpha)/2} = 1.5$. Starting from even odds, how many consecutive buys does it take for $p$ to exceed $0.95$?",
    8),
  c23.m(GM, "apply-alpha-zero", 8, "When $\\alpha = 0$ in Glosten–Milgrom:",
    "The spread is zero and prices never move, since order flow carries no information", [
      ["The spread equals $V_H - V_L$", "That is the collapse case with only informed traders."],
      ["The market collapses", "Without informed traders there is no adverse selection."],
      ["Prices still converge to $v$", "Without informed traders orders are uninformative, so beliefs never change."],
    ]),
  c23.s(GM, "explain-gm-vs-kyle", 8,
    "Compare Glosten–Milgrom with Kyle: what is the trading mechanism in each, and what plays the role of Kyle’s lambda?",
    "Explains that Glosten–Milgrom has sequential unit orders at quoted bid and ask prices, whereas Kyle has a batch auction in which market makers see net order flow and set one price.",
    "Identifies the half-spreads (equivalently, the price revision after a trade) as the analogue of Kyle’s lambda: both are compensation for adverse selection that grows with the informativeness of order flow."),

  // level 9
  c23.s(GM, "transfer-mm-strategy", 9,
    "A high-frequency market maker can observe signals that predict short-term price moves. Using Glosten–Milgrom, explain how this changes her quoting and how it affects other liquidity providers.",
    "Explains that with a signal she can quote tighter when flow is likely uninformed and widen or step back when it is likely toxic, reducing her adverse selection.",
    "Notes that slower market makers without the signal then face a more toxic residual flow and must widen their spreads, linking to Chapter 10’s short-term-alpha market making."),
  c23.n(GM, "apply-vpin-like", 9,
    "Over a window, buys are $70\\%$ of orders. If uninformed orders are equally likely to be buys or sells, and informed traders all buy in this state, what informed share $\\alpha$ explains the imbalance? (Solve $\\alpha + (1 - \\alpha)/2 = 0.7$.)",
    0.4),
  c23.m(GM, "transfer-dark-pool", 9, "A dark pool that crosses at the lit midprice attracts mostly uninformed flow. Glosten–Milgrom predicts the lit market’s spread will then:",
    "Widen, because the lit market is left with a more toxic order mix", [
      ["Narrow, because total liquidity rises", "Informed traders stay in the lit market, raising its informed share."],
      ["Stay unchanged", "The order mix in the lit market changes."],
      ["Become negative", "Spreads cannot be negative at break-even."],
    ]),
  c23.s(GM, "transfer-earnings-day", 9,
    "On the morning of an earnings release, spreads are wide and narrow over the day. Explain this pattern using the dynamic Glosten–Milgrom model.",
    "Explains that information asymmetry is greatest early (informed traders know more), so the informed share and the spread are high.",
    "Explains that as trades reveal information, the market maker’s beliefs converge, the remaining asymmetry falls, and the spread narrows."),

  // level 10
  c23.s(GM, "transfer-estimation", 10,
    "Outline how you would estimate the probability of informed trading from a day’s sequence of buys and sells using the Glosten–Milgrom logic, and name a limitation.",
    "Proposes a likelihood-based approach (as in the PIN model): model buy and sell arrivals as Poisson with extra intensity from informed traders on news days, and estimate the informed share by maximum likelihood from daily buy and sell counts.",
    "Names a limitation: order imbalance also arises from liquidity needs, inventory management or order splitting, and trade classification (signing trades) is noisy, so the estimate can confound information with other imbalance."),
  c23.n(GM, "apply-posterior-sequence", 10,
    "With $\\alpha = 0.2$, a buy multiplies the odds by $1.5$ and a sell multiplies them by $1/1.5$. Starting from $p = 0.5$, the sequence is buy, buy, sell, buy, buy. What is the posterior $p$? Give $4$ decimal places.",
    0.7714),
  c23.s(GM, "transfer-regulation-transparency", 10,
    "A proposal would publish the identity type (informed fund, retail, market maker) of every trade in real time. Using Glosten–Milgrom, discuss the likely effects on spreads and on the incentive to gather information.",
    "Argues that market makers could price each order by its type, tightening spreads for uninformed traders and widening or refusing them for informed traders, so adverse-selection costs shift onto the informed.",
    "Discusses the trade-off: informed traders’ profits fall, reducing the incentive to acquire information and slowing price discovery, and traders would try to disguise their type, so the net effect on market quality is ambiguous."),
  c23.m(GM, "transfer-gm-limit", 10, "Which statement about the Glosten–Milgrom model is false?",
    "The market maker earns positive expected profit on each trade", [
      ["Prices are semi-strong efficient", "This is true: prices are conditional expectations given public information."],
      ["The spread can exist without inventory costs", "This is true: the spread comes purely from adverse selection."],
      ["Uninformed traders lose on average", "This is true: they pay the half-spread to cover losses to informed traders."],
    ]),
];

export const ahtMicrostructureItems: Item[] = [...marketMaking, ...kyle, ...glostenMilgrom];
