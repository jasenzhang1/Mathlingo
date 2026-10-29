import type { Item } from "../../lib/assessment/types";
import { m, mcq, num, short } from "./qi-shared";

/**
 * Quantitative Investing, part 10: market impact and multiperiod,
 * impact-aware portfolio optimization (Paleologo, Ch. 10). Forty questions per
 * lesson, four at each level.
 */

// ---------------------------------------------------------------------------
// market-impact
// ---------------------------------------------------------------------------
const MI = "market-impact";
const marketImpact: Item[] = [
  // level 1
  mcq(m(MI, "recall-components", "recall", 1, 15, "Expected transaction cost is usually decomposed into:"),
    "Spread cost, temporary market impact and permanent market impact",
    [
      ["Commission and tax only", "comp-commission", "Those are explicit costs; impact is usually larger."],
      ["Alpha and beta", "comp-alpha", "Those are return components."],
      ["Volatility and correlation", "comp-vol", "Those are risk measures."],
    ]),
  mcq(m(MI, "recall-temporary", "recall", 1, 15, "Temporary market impact is:"),
    "The price move during and shortly after execution, which relaxes back toward equilibrium",
    [
      ["The price change that persists long after the trade", "temp-permanent", "That's permanent impact."],
      ["The bid–ask spread", "temp-spread", "Spread cost is separate."],
      ["The broker's commission", "temp-commission", "An explicit fee."],
    ]),
  mcq(m(MI, "recall-sqrt", "recall", 1, 15, "The square-root law says the cost per unit traded of a metaorder of size $Q$ scales as:"),
    "$\\sigma\\sqrt{\\frac{Q}{V}}$, with $\\sigma$ the volatility and $V$ the market volume over the period",
    [
      ["$\\frac{Q}{V}$", "sqrt-linear", "Impact is concave in size."],
      ["$\\sigma\\frac{V}{Q}$", "sqrt-inverse", "Larger trades cost more per share."],
      ["Independent of $Q$", "sqrt-constant", "Bigger orders move prices more."],
    ]),
  mcq(m(MI, "recall-pov", "recall", 1, 15, "The participation rate (POV) of an order is:"),
    "The order's size divided by total market volume over the execution period",
    [
      ["The fraction of the order filled", "pov-filled", "That's the fill rate."],
      ["The price impact in basis points", "pov-impact", "That's a cost."],
      ["The order's share of the portfolio", "pov-portfolio", "It's relative to market volume."],
    ]),
  // level 2
  num(m(MI, "apply-pov", "apply", 2, 20, "You buy $100{,}000$ shares while the market trades $2$ million. Find the participation rate in percent."), 5),
  num(m(MI, "apply-sqrt-cost", "apply", 2, 25, "With cost per unit $Y\\sigma\\sqrt{\\frac{Q}{V}}$, $Y = 1$, daily volatility $2\\%$ and $\\frac{Q}{V} = 0.04$, find the cost in basis points."), 40),
  num(m(MI, "apply-dollar-cost", "apply", 2, 20, "A $\\$10$M trade costs $40$ basis points. Find the cost in dollars."), 40000),
  mcq(m(MI, "apply-market-order", "apply", 2, 20, "A market order:"),
    "Crosses the spread and removes liquidity",
    [
      ["Adds liquidity at a chosen price", "mo-limit", "That's a limit order."],
      ["Never pays the spread", "mo-nospread", "It pays it."],
      ["Waits until the close", "mo-close", "It executes immediately."],
    ]),
  // level 3
  num(m(MI, "apply-sqrt-scale", "apply", 3, 25, "Under the square-root law, by what factor does the cost per share rise if the order size quadruples?"), 2),
  num(m(MI, "apply-total-scale", "apply", 3, 30, "Under the square-root law, total dollar cost scales as $Q^{3/2}$. By what factor does it rise when $Q$ doubles? Give $4$ decimal places."), 2.8284),
  num(m(MI, "apply-shortfall", "apply", 3, 25, "A buy order arrives when the price is $\\$100.00$ and fills at an average $\\$100.12$. Find the implementation shortfall in basis points."), 12),
  mcq(m(MI, "apply-sources", "apply", 3, 25, "Which is $\\textbf{NOT}$ one of the mechanisms behind market impact?"),
    "Dividend payments",
    [
      ["Inventory reduction", "src-inventory", "Removing liquidity moves price."],
      ["Information revealed by trading", "src-info", "Trades signal private beliefs."],
      ["Mimetic and strategic behaviour of others", "src-mimetic", "Others imitate or exploit order flow."],
    ]),
  // level 4
  num(m(MI, "apply-almgren-time", "apply", 4, 40, "In the Almgren model with exponent $\\beta = 0.6$, unit cost scales as $T^{-\\beta}$ for a fixed order. By what factor does it change if the execution time doubles? Give $4$ decimal places."), 0.6598),
  num(m(MI, "apply-breakeven", "apply", 4, 40, "A signal predicts $50$ basis points of alpha. With cost $\\sigma\\sqrt{\\frac{Q}{V}}$ and daily volatility $2\\%$, find the participation $\\frac{Q}{V}$, in percent, at which cost equals alpha. Give $2$ decimal places."), 6.25),
  num(m(MI, "apply-kyle", "apply", 4, 35, "In Kyle's linear model, price moves by $\\lambda$ per share traded, and the total cost of buying $Q$ shares gradually is $\\frac{\\lambda Q^{2}}{2}$. With $\\lambda = 10^{-6}$ dollars per share and $Q = 200{,}000$, find the cost in dollars."), 20000),
  mcq(m(MI, "apply-dimension", "apply", 4, 30, "The dimensional-analysis argument for the square-root law assumes cost depends only on traded value $Q$, market volume $V$ and volatility $\\sigma$, and concludes cost is a function of:"),
    "$\\sigma\\sqrt{\\frac{Q}{V}}$",
    [
      ["$\\frac{Q}{V}$ alone", "dim-ratio", "Volatility's time dimension forces the square root."],
      ["$\\sigma Q$", "dim-sigmaQ", "Not dimensionless."],
      ["$\\frac{V}{\\sigma}$", "dim-v-sigma", "Not dimensionless."],
    ]),
  // level 5
  short(m(MI, "explain-propagator", "explain", 5, 120, "Describe the propagator model of market impact."),
    [
      ["superposition", "Impact at time $T$ is a superposition of past trades: $I(T) = \\int f(\\dot{x}(t))G(T - t)\\,dt$", 2, true],
      ["meaning", "$f$ (increasing) is the instantaneous impact of trading speed; $G$ (decreasing) describes how each trade's impact relaxes back toward equilibrium", 2, true],
    ]),
  mcq(m(MI, "apply-ow", "apply", 5, 30, "In the Obizhaeva–Wang model with resilience time $\\tau$, executing slowly ($T \\gg \\tau$) gives a unit cost that:"),
    "Falls inversely with execution time",
    [
      ["Is independent of execution time", "ow-indep", "That's the fast regime ($T \\ll \\tau$)."],
      ["Rises with execution time", "ow-rises", "Slower trading is cheaper."],
      ["Is zero", "ow-zero", "Costs are positive."],
    ]),
  num(m(MI, "apply-cleanup", "apply", 5, 35, "An order to buy $1{,}000$ shares fills only $800$ before the price rises $\\$0.50$ and the rest is bought at that higher price. Find the clean-up cost in dollars."), 100),
  num(m(MI, "apply-sqrt-bps", "apply", 5, 35, "A stock has daily volatility $1.5\\%$. Find the square-root cost (with $Y = 1$) of trading $9\\%$ of daily volume, in basis points."), 45),
  // level 6
  short(m(MI, "explain-urgency", "explain", 6, 150, "Explain the trade-off between implementation shortfall and clean-up cost in choosing how aggressively to execute."),
    [
      ["aggressive", "Aggressive execution pays more impact (higher shortfall) but finishes the order", 2, true],
      ["passive", "Passive execution pays less impact but risks not completing; unfilled parts are bought later at worse prices (clean-up cost) or the alpha decays", 2, true],
    ]),
  num(m(MI, "apply-optimal-size", "apply", 6, 45, "Net PnL from trading $Q$ (in \\$M) is $0.01Q - 0.002Q^{3/2}$ (alpha minus square-root impact). Find the $Q$ that maximizes it. Give $2$ decimal places."), 11.11),
  num(m(MI, "apply-cost-at-opt", "apply", 6, 40, "At that optimum, what fraction of the gross alpha is paid in impact? Give $4$ decimal places."), 0.6667),
  mcq(m(MI, "apply-gatheral", "apply", 6, 35, "With Gatheral's power-law decay kernel and square-root impact, the unit cost of a constant-rate order is:"),
    "Roughly $\\sigma\\sqrt{\\frac{Q}{v}}$, independent of the execution time",
    [
      ["Inversely proportional to time", "gath-inverse", "That's OW's slow regime."],
      ["Linear in $Q$", "gath-linear", "Square-root in $Q$."],
      ["Zero for slow trades", "gath-zero", "Costs remain."],
    ]),
  // level 7
  short(m(MI, "explain-why-temporary", "explain", 7, 150, "Why does Paleologo focus on temporary impact for portfolio optimization?"),
    [
      ["magnitude", "For a portfolio manager it is by far the largest of the three cost components", 2, true],
      ["priority", "Spread costs are smaller and roughly independent per trade; permanent impact matters for price formation but less for optimization — modelling priorities and brevity", 2, true],
    ]),
  num(m(MI, "apply-capacity-sqrt", "apply", 7, 50, "A strategy trades with alpha $a$ per dollar and square-root impact $kQ^{1/2}$ per dollar, so net PnL $= aQ - kQ^{3/2}$. Find the optimal $Q$ when $a = 0.004$ and $k = 0.0005$."), 28.4444),
  num(m(MI, "apply-two-days", "apply", 7, 45, "Splitting an order equally over two days (each day $\\frac{Q}{2}$ against the same daily volume, impact independent across days) changes the total square-root cost by what factor? Give $4$ decimal places."), 0.7071),
  mcq(m(MI, "apply-vwap", "apply", 7, 40, "A VWAP execution algorithm:"),
    "Spreads the order in proportion to expected market volume through the day, aiming to match the volume-weighted average price",
    [
      ["Trades the whole order at the open", "vwap-open", "It spreads the order."],
      ["Trades at a constant rate regardless of volume", "vwap-twap", "That's TWAP."],
      ["Trades a fixed fraction of live volume", "vwap-pov", "That's POV."],
    ]),
  // level 8
  short(m(MI, "explain-capacity-impact", "explain", 8, 150, "Explain how market impact sets a strategy's capacity."),
    [
      ["scale", "Alpha PnL scales linearly with size while impact costs grow faster (like $Q^{3/2}$ for square-root impact), so net PnL peaks and then declines", 2, true],
      ["capacity", "The size where net PnL peaks — or where net Sharpe hits a floor — is the capacity; slow, low-turnover signals have more capacity", 2, true],
    ]),
  num(m(MI, "apply-turnover-cost", "apply", 8, 45, "A strategy turns over $50\\%$ of a $\\$1$B book daily, paying $8$ basis points per dollar traded. Find the annual cost in millions over $252$ days."), 100.8),
  num(m(MI, "apply-liquidity-days", "apply", 8, 40, "A position of $\\$60$M is held in a stock trading $\\$200$M a day. Keeping participation at $10\\%$, how many days does it take to liquidate?"), 3),
  mcq(m(MI, "apply-resiliency", "apply", 8, 40, "Liquidity has three dimensions — depth, breadth and resiliency. Resiliency is:"),
    "How quickly prices return to equilibrium after a trade",
    [
      ["The amount available at the best quotes", "resil-depth", "That's depth."],
      ["The number of participants", "resil-breadth", "That's breadth."],
      ["The bid–ask spread", "resil-spread", "That's a cost measure."],
    ]),
  // level 9
  short(m(MI, "transfer-calibrate", "transfer", 9, 180, "How would you calibrate a market-impact model for your strategy, and why not use a vendor's model as is?"),
    [
      ["calibrate", "Fit the impact coefficient (e.g. $Y$ in $Y\\sigma\\sqrt{Q/V}$) to your own executions: arrival price versus fills, controlling for volatility, participation and alpha", 2, true],
      ["why", "Impact depends on your execution style and the information in your flow; backtests that align with live PnL need a model calibrated to live trading", 2, true],
    ]),
  short(m(MI, "explain-information", "explain", 9, 150, "Why might informed traders' orders have larger permanent impact than uninformed ones?"),
    [
      ["info", "Their trades reveal information about value; prices move permanently as the market learns it", 2, true],
      ["uninformed", "Uninformed (liquidity) trades cause mostly temporary impact that relaxes as liquidity providers are compensated", 2, true],
    ]),
  num(m(MI, "apply-alpha-vs-days", "apply", 9, 60, "An alpha of $40$ basis points decays by half each day. Trading over one day costs $30$ basis points; over two days, $21.2$ basis points but you capture on average only the alpha remaining as you trade, about $0.75$ of it. Find the net alpha of the two-day plan in basis points."), 8.8),
  mcq(m(MI, "apply-one-day-net", "apply", 9, 40, "For the same signal, the one-day plan's net alpha (capturing all $40$ basis points) is $10$ basis points. Which plan is better?"),
    "The one-day plan, because alpha decay outweighs the impact saving",
    [
      ["The two-day plan", "plan-two", "It nets $8.8$ versus $10$."],
      ["They are equal", "plan-equal", "They differ."],
      ["Neither trades", "plan-neither", "Both are profitable."],
    ]),
  // level 10
  short(m(MI, "judge-backtest-costs", "transfer", 10, 180, "A backtest assumes fixed $5$ basis points per trade for a strategy that would trade $20\\%$ of daily volume in small caps. Critique and fix."),
    [
      ["critique", "Fixed costs ignore that impact grows with participation and volatility; at $20\\%$ participation in volatile small caps, square-root costs are many times $5$ bp", 2, true],
      ["fix", "Use a size-dependent model ($Y\\sigma\\sqrt{Q/V}$) calibrated to live data, include it in the optimizer, and re-estimate capacity", 2, true],
    ]),
  short(m(MI, "judge-universality", "transfer", 10, 180, "The square-root law appears across very different markets and venues. Why is that remarkable, and what does it imply for modelling?"),
    [
      ["remarkable", "Despite different microstructures (exchanges, OTC, dark pools), metaorder costs follow the same concave form — suggesting a universal mechanism (dimensional analysis, latent liquidity)", 2, true],
      ["imply", "A simple, parsimonious model ($Y\\sigma\\sqrt{Q/V}$ with one calibrated constant) is a reasonable default across assets", 2, true],
    ]),
  num(m(MI, "apply-opt-size-general", "apply", 10, 90, "Net PnL $aQ - kQ^{3/2}$ is maximized at $Q^{*} = \\left(\\frac{2a}{3k}\\right)^{2}$. If alpha $a$ halves (signal weakens), by what factor does the optimal size change?"), 0.25),
  mcq(m(MI, "judge-crowded-exit", "transfer", 10, 60, "Many funds hold the same illiquid positions. If they all need to sell, impact models calibrated on normal days will:"),
    "Badly understate costs, since everyone demands liquidity at once and resiliency collapses",
    [
      ["Overstate costs", "crowdexit-over", "Crowded exits are worse than normal."],
      ["Be exactly right", "crowdexit-right", "Normal-day calibration misses joint selling."],
      ["Predict negative costs", "crowdexit-negative", "No."],
    ]),
];

// ---------------------------------------------------------------------------
// multiperiod-portfolio-optimization
// ---------------------------------------------------------------------------
const MP = "multiperiod-portfolio-optimization";
const multiperiod: Item[] = [
  // level 1
  mcq(m(MP, "recall-ar1", "recall", 1, 15, "In the Baldacci–Benveniste–Ritter model, the alpha signal follows:"),
    "An AR(1) process $\\mu_t = \\phi\\mu_{t-1} + \\epsilon_t$",
    [
      ["A random walk", "ar1-rw", "Alpha mean-reverts (decays)."],
      ["A constant", "ar1-constant", "It changes over time."],
      ["A GARCH process", "ar1-garch", "Its mean, not its variance, is modelled."],
    ]),
  mcq(m(MP, "recall-objective", "recall", 1, 15, "The multiperiod objective is:"),
    "Discounted expected PnL minus a risk penalty minus (quadratic) trading costs, summed over time",
    [
      ["The next period's Sharpe ratio", "obj-sharpe", "It looks over many periods."],
      ["Total turnover", "obj-turnover", "Turnover enters through costs."],
      ["Final wealth only", "obj-final", "It sums per-period mean-variance terms."],
    ]),
  mcq(m(MP, "recall-policy", "recall", 1, 15, "The optimal policy with quadratic costs is to:"),
    "Move partway each period from the current portfolio toward an alpha-driven target",
    [
      ["Trade fully to the MVO portfolio every period", "policy-full", "That ignores costs."],
      ["Never trade", "policy-never", "Alpha must be harvested."],
      ["Trade only once at the start", "policy-once", "Alpha changes over time."],
    ]),
  mcq(m(MP, "recall-nocost", "recall", 1, 15, "As trading costs go to zero, the multiperiod solution becomes:"),
    "The single-period MVO portfolio $(\\kappa\\boldsymbol{\\Omega})^{-1}\\boldsymbol{\\mu}_t$, rebalanced instantly",
    [
      ["Zero holdings", "nocost-zero", "Alpha is still exploited."],
      ["The minimum-variance portfolio", "nocost-minvar", "Alpha matters."],
      ["An equal-weight portfolio", "nocost-equal", "Not optimal."],
    ]),
  // level 2
  num(m(MP, "apply-decay-time", "apply", 2, 20, "Alpha follows AR(1) with $\\phi = 0.9$ per day. Find the decay time scale $-\\frac{1}{\\log\\phi}$ in days. Give $2$ decimal places."), 9.49),
  num(m(MP, "apply-half-life", "apply", 2, 25, "Find the half-life in days of an alpha with $\\phi = 0.9$. Give $2$ decimal places."), 6.58),
  num(m(MP, "apply-mvo-target", "apply", 2, 20, "A single asset has expected return $\\mu = 0.001$, variance $\\sigma^{2} = 0.0004$ and risk aversion $\\kappa = 2$. Find the MVO holding $\\frac{\\mu}{\\kappa\\sigma^{2}}$."), 1.25),
  mcq(m(MP, "apply-acf", "apply", 2, 20, "For an AR(1) alpha, $\\text{Corr}(\\mu_{t+s}, \\mu_t)$ equals:"),
    "$\\phi^{s}$",
    [
      ["$\\phi s$", "acf-linear", "Decay is geometric."],
      ["$1 - \\phi^{s}$", "acf-complement", "That rises with $s$."],
      ["$\\phi$ for all $s$", "acf-constant", "It decays with lag."],
    ]),
  // level 3
  num(m(MP, "apply-liquidate", "apply", 3, 25, "With no alpha, the optimal policy liquidates as $x(t) = e^{-\\gamma t}x(0)$. With $x(0) = 100$ and $\\gamma = 0.1$ per day, find $x(10)$. Give $2$ decimal places."), 36.79),
  num(m(MP, "apply-gamma", "apply", 3, 30, "The liquidation rate is $\\gamma = \\sqrt{\\frac{\\kappa\\sigma^{2}}{c}}$. Find it for $\\kappa = 2$, $\\sigma^{2} = 0.0004$ and $c = 0.08$."), 0.1),
  num(m(MP, "apply-liq-half", "apply", 3, 25, "At liquidation rate $\\gamma = 0.1$ per day, find the half-life of the position in days. Give $2$ decimal places."), 6.93),
  mcq(m(MP, "apply-liq-factors", "apply", 3, 25, "The optimal liquidation is faster when:"),
    "Risk aversion or volatility is higher, or trading cost is lower",
    [
      ["Trading cost is higher", "liqf-cost", "Higher cost slows liquidation."],
      ["Volatility is lower", "liqf-vol", "Lower risk allows slower exit."],
      ["Risk aversion is lower", "liqf-ra", "Less aversion, slower exit."],
    ]),
  // level 4
  num(m(MP, "apply-single-vs-multi", "apply", 4, 40, "With $\\frac{\\kappa\\sigma^{2}}{c} = 0.01$, the single-period cost-aware policy closes about $\\frac{\\kappa\\sigma^{2}}{c}$ of the gap per period while the multiperiod policy closes about $\\sqrt{\\frac{\\kappa\\sigma^{2}}{c}}$. Find the ratio of the multiperiod to the single-period trading speed."), 10),
  num(m(MP, "apply-exact-step", "apply", 4, 40, "The exact single-asset update is $x_{t+1} = \\frac{x_t + \\frac{\\mu}{c}}{1 + \\frac{\\kappa\\sigma^{2}}{c}}$ (single-period with quadratic cost). With $x_t = 0$, $\\mu = 0.001$, $c = 0.08$, $\\kappa\\sigma^{2} = 0.0008$, find $x_{t+1}$. Give $4$ decimal places."), 0.0124),
  num(m(MP, "apply-ar1-sd", "apply", 4, 35, "An AR(1) alpha has innovation standard deviation $0.0002$ and $\\phi = 0.9$. Find its stationary standard deviation $\\frac{\\sigma_\\epsilon}{\\sqrt{1 - \\phi^{2}}}$. Give $6$ decimal places."), 0.000459),
  mcq(m(MP, "apply-why-partial", "apply", 4, 30, "Why trade only partway toward the target each period?"),
    "Quadratic costs make fast trading expensive, and the target itself moves as alpha decays and refreshes",
    [
      ["To avoid all costs", "partial-avoid", "Some trading cost is accepted."],
      ["Because targets are never reached", "partial-never", "It's a cost–benefit trade-off."],
      ["To increase risk", "partial-risk", "Lagging the target typically reduces alpha capture, not increases risk deliberately."],
    ]),
  // level 5
  short(m(MP, "explain-sqrt", "explain", 5, 120, "Why does a square root of $\\frac{\\kappa\\sigma^{2}}{c}$ appear in the multiperiod trading rate but not in the single-period cost-aware policy?"),
    [
      ["single", "The single-period problem trades off this period's cost against this period's risk/alpha only, giving a rate $\\approx \\frac{\\kappa\\sigma^{2}}{c}$", 2, true],
      ["multi", "The multiperiod problem accounts for the future: costs are spread over many periods, and the Riccati/ODE solution balances them at rate $\\sqrt{\\frac{\\kappa\\sigma^{2}}{c}}$, much faster when the ratio is small", 2, true],
    ]),
  mcq(m(MP, "apply-spike", "apply", 5, 30, "With a known one-off alpha “spike” at time $t_0$, the optimal policy:"),
    "Builds the position in advance, peaking at $t_0$, then liquidates exponentially",
    [
      ["Trades only at $t_0$", "spike-at", "Costs favour spreading trades before."],
      ["Ignores the spike", "spike-ignore", "Known alpha is worth trading for."],
      ["Holds forever after", "spike-forever", "No alpha remains after $t_0$."],
    ]),
  num(m(MP, "apply-liq-left", "apply", 5, 35, "A position decays as $e^{-\\gamma t}$ with $\\gamma = 0.2$ per day. What fraction remains after $5$ days? Give $4$ decimal places."), 0.3679),
  num(m(MP, "apply-alpha-left", "apply", 5, 35, "An AR(1) alpha with $\\phi = 0.8$: what fraction of today's expected alpha remains $3$ days ahead? Give $3$ decimal places."), 0.512),
  // level 6
  short(m(MP, "explain-target", "explain", 6, 150, "With decaying alpha, the target the optimal policy trades toward is not today's MVO portfolio. What is it, intuitively?"),
    [
      ["future", "A weighted average of current and expected future MVO portfolios, discounted by alpha decay and by how fast one can trade (an “aim” portfolio)", 2, true],
      ["effect", "Fast-decaying alpha gets less weight because it will be gone before the position is built; slow alpha dominates", 2, true],
    ]),
  num(m(MP, "apply-gap-close", "apply", 6, 40, "Current holding $0$, target $100$, and the policy closes $10\\%$ of the gap each day (target fixed). Find the holding after $3$ days."), 27.1),
  num(m(MP, "apply-cost-halve", "apply", 6, 40, "If the trading-cost coefficient $c$ is quartered, by what factor does the multiperiod trading speed $\\sqrt{\\frac{\\kappa\\sigma^{2}}{c}}$ change?"), 2),
  mcq(m(MP, "apply-mixing", "apply", 6, 35, "When combining several AR(1) signals with different decay rates, the slow signals:"),
    "Receive more effective weight in positions, since there is time to trade into them",
    [
      ["Are discarded", "mix-discard", "They're the most tradable."],
      ["Get the same weight as fast ones", "mix-same", "Decay matters with costs."],
      ["Must be traded instantly", "mix-instant", "No — they allow slow trading."],
    ]),
  // level 7
  short(m(MP, "explain-lqr-link", "explain", 7, 150, "Explain why the multiperiod portfolio problem with quadratic costs is a linear-quadratic regulator problem."),
    [
      ["structure", "The state (holdings, alpha) evolves linearly in the control (trades), and the objective is quadratic (variance, quadratic costs) minus linear (alpha)", 2, true],
      ["solution", "So the value function is quadratic, the optimal trade is linear in the state, and a Riccati equation gives the gain — the same machinery as LQR and, by duality, the Kalman filter", 2, true],
    ]),
  num(m(MP, "apply-riccati-scalar", "apply", 7, 50, "A scalar version: trading $u_t$ moves holdings $x_{t+1} = x_t + u_t$ with per-period cost $qx_t^{2} + ru_t^{2}$ ($q$ for risk, $r$ for impact). The steady value coefficient solves $P^{2} - qP - qr = 0$ and each period trades the fraction $K = \\frac{P}{P + r}$ of the gap. Find $K$ for $q = 1$, $r = 100$. Give $4$ decimal places."), 0.0951),
  num(m(MP, "apply-approx-k", "apply", 7, 40, "For $q \\ll r$, $K \\approx \\sqrt{\\frac{q}{r}}$. Approximate $K$ for $q = 1$, $r = 100$."), 0.1),
  mcq(m(MP, "apply-discount", "apply", 7, 40, "Increasing the discount on future PnL (caring less about the future) makes the optimal policy:"),
    "Closer to the myopic single-period policy",
    [
      ["Trade more aggressively toward future targets", "disc-aggressive", "Future benefits matter less."],
      ["Never trade", "disc-never", "Current alpha still matters."],
      ["Ignore costs", "disc-ignore-cost", "Costs remain."],
    ]),
  // level 8
  short(m(MP, "explain-liquidation", "explain", 8, 150, "Derive the optimal no-alpha liquidation path $x(t) = e^{-\\gamma t}x(0)$ intuitively, and interpret $\\gamma$."),
    [
      ["balance", "Holding costs risk $\\kappa\\sigma^{2}x^{2}$ per unit time while trading costs $c\\dot{x}^{2}$; the Euler–Lagrange equation $c\\ddot{x} = \\kappa\\sigma^{2}x$ gives exponential decay", 2, true],
      ["gamma", "$\\gamma = \\sqrt{\\frac{\\kappa\\sigma^{2}}{c}}$: faster with risk and risk aversion, slower with costs", 2, true],
    ]),
  num(m(MP, "apply-total-cost-liq", "apply", 8, 50, "Liquidating $x(0) = 100$ along $e^{-\\gamma t}$ costs $\\int_0^{\\infty} c\\dot{x}^{2}\\,dt = \\frac{c\\gamma x(0)^{2}}{2}$. With $c = 0.08$ and $\\gamma = 0.1$, find it."), 40),
  num(m(MP, "apply-risk-cost-liq", "apply", 8, 50, "The risk cost $\\int_0^{\\infty}\\kappa\\sigma^{2}x^{2}\\,dt = \\frac{\\kappa\\sigma^{2}x(0)^{2}}{2\\gamma}$. With $\\kappa\\sigma^{2} = 0.0008$, $x(0) = 100$ and $\\gamma = 0.1$, find it."), 40),
  mcq(m(MP, "apply-equal-costs", "apply", 8, 40, "The previous two items give equal trading and risk costs on the optimal path. This is:"),
    "A general feature of the optimum: at the best speed, the marginal costs of trading faster and of holding longer balance",
    [
      ["A coincidence of the numbers", "equalcost-coincidence", "With $\\gamma = \\sqrt{\\kappa\\sigma^{2}/c}$ they're always equal."],
      ["A sign of error", "equalcost-error", "It's correct."],
      ["Only true for $x(0) = 100$", "equalcost-specific", "It holds for any $x(0)$."],
    ]),
  // level 9
  short(m(MP, "transfer-implement", "transfer", 9, 180, "How would you implement multiperiod optimization in a daily equity strategy with thousands of stocks?"),
    [
      ["approx", "Use the closed-form partial-adjustment policy: each day trade a fraction (from the Riccati/square-root rate) toward an aim portfolio built from decay-weighted alphas", 2, true],
      ["details", "Calibrate costs and decay per signal, assume diagonal (idio-space) costs for tractability, and add constraints via a single-period optimizer around the aim", 2, true],
    ]),
  short(m(MP, "explain-signal-decay", "explain", 9, 150, "Why does the time scale of alpha decay matter so much for strategies with significant market impact?"),
    [
      ["fast", "Fast-decaying alpha must be traded quickly, paying high impact, or it is gone before positions are built", 2, true],
      ["slow", "Slow alpha can be traded gradually at low cost, so it supports larger size; the decay rate jointly with costs determines capacity", 2, true],
    ]),
  num(m(MP, "apply-capture", "apply", 9, 60, "An alpha decays as $e^{-t/\\tau}$ with $\\tau = 5$ days, and the position is built as $1 - e^{-\\gamma t}$ with $\\gamma = 0.2$. The fraction of the alpha's total integral captured is $\\frac{\\gamma\\tau}{1 + \\gamma\\tau}$. Find it."), 0.5),
  mcq(m(MP, "apply-faster-capture", "apply", 9, 40, "Raising $\\gamma$ (trading faster) increases the captured fraction $\\frac{\\gamma\\tau}{1 + \\gamma\\tau}$ but:"),
    "Raises trading costs, so the optimal $\\gamma$ balances capture against cost",
    [
      ["Lowers trading costs", "faster-lowers", "Faster trading costs more."],
      ["Has no other effect", "faster-none", "Costs rise."],
      ["Reduces alpha", "faster-alpha", "Alpha is exogenous."],
    ]),
  // level 10
  short(m(MP, "judge-single-vs-multi", "transfer", 10, 180, "When is single-period optimization with a cost penalty a good enough approximation to the multiperiod solution, and when is it not?"),
    [
      ["ok", "Good enough when costs are small relative to alpha and risk, or alpha is very persistent, so trades are small and myopic decisions are near-optimal", 2, true],
      ["not", "Not when impact is large or alpha decays at speeds comparable to trading — the myopic policy trades far too slowly (rate $\\frac{\\kappa\\sigma^{2}}{c}$ versus $\\sqrt{\\frac{\\kappa\\sigma^{2}}{c}}$) or ignores future alpha", 2, true],
    ]),
  short(m(MP, "judge-turnover", "transfer", 10, 180, "A PM imposes a hard daily turnover limit instead of modelling impact. Compare with the multiperiod approach."),
    [
      ["limit", "A turnover limit caps trading crudely: it ignores which trades are cheap or valuable and binds equally in calm and volatile markets", 2, true],
      ["model", "Modelling impact prices each trade, trades more when alpha is strong or decaying fast, and gives a principled speed; the limit can remain as a safety net", 2, true],
    ]),
  num(m(MP, "apply-optimal-gamma", "apply", 10, 90, "Choose $\\gamma$ to maximize captured alpha $A\\frac{\\gamma\\tau}{1 + \\gamma\\tau}$ minus a cost $\\frac{c\\gamma}{2}$, with $A = 1$, $\\tau = 5$ and $c = 2$. Find the optimal $\\gamma$. Give $4$ decimal places."), 0.2472),
  mcq(m(MP, "judge-noise-signal", "transfer", 10, 60, "Combining a fast, strong signal and a slow, weak signal under heavy impact, the optimal portfolio:"),
    "Is driven mostly by the slow signal, using the fast one mainly to time trades that are happening anyway",
    [
      ["Is driven mostly by the fast signal", "noisesig-fast", "Impact makes fast alpha expensive to capture."],
      ["Ignores both", "noisesig-ignore", "Both have value."],
      ["Weights them by raw IC only", "noisesig-ic", "Decay and costs change the weights."],
    ]),
];

export const qi10Items: Item[] = [...marketImpact, ...multiperiod];
