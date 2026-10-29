import type { Item } from "../../../lib/assessment/types";
import { chapter } from "./shared";

/** Ch. 6–7: optimal execution with market orders, utility and non-linear impact, price limits, order flow, dark pools (40 items per lesson). */

const OE = "optimal-execution-continuous-trading";
const EU = "execution-utility-and-nonlinear-impact";
const PL = "execution-price-limiter-and-order-flow";
const DP = "execution-lit-and-dark-pools";
const c6 = chapter("Ch. 6, Optimal Execution with Continuous Trading I (§6.1–6.5)");
const c66 = chapter("Ch. 6, Optimal Execution with Continuous Trading I (§6.6–6.7)");
const c7 = chapter("Ch. 7, Optimal Execution with Continuous Trading II (§7.1–7.3)");
const c74 = chapter("Ch. 7, Optimal Execution with Continuous Trading II (§7.4 Lit and Dark Markets)");

const execution: Item[] = [
  // level 1
  c6.m(OE, "recall-tradeoff", 1, "The central trade-off in optimal execution of a large order is between:",
    "Price impact from trading quickly and price risk from trading slowly", [
      ["Fees and rebates", "Fees matter, but the core tension is impact versus risk."],
      ["Limit and market orders only", "Chapter 6 uses MOs only; the trade-off is about speed."],
      ["Buying and selling", "The agent trades in one direction."],
    ]),
  c6.m(OE, "recall-arrival-price", 1, "When the benchmark is the arrival price, the execution cost (implementation shortfall) of a liquidation is:",
    "The value of the shares at the midprice when the order was given, minus the actual revenue", [
      ["The total fees paid", "Fees are only part of the cost."],
      ["The VWAP minus the revenue", "That uses the VWAP benchmark."],
      ["The final midprice times the shares", "The benchmark is the price at arrival."],
    ]),
  c6.m(OE, "recall-temporary", 1, "In the model $\\hat{S}_t = S_t - f(\\nu_t)$, the temporary impact $f$ captures:",
    "The cost of walking the book at the current trading speed, which does not persist", [
      ["The permanent shift of the midprice", "That is $g(\\nu)$ in the midprice drift."],
      ["The bid–ask spread only", "Spread can be included, but $f$ reflects walking the book."],
      ["Volatility", "Volatility is $\\sigma$."],
    ]),
  c6.m(OE, "recall-twap", 1, "TWAP (time-weighted average price) execution means:",
    "Trading at a constant speed $\\mathfrak{N}/T$ over the horizon", [
      ["Trading everything at the start", "That is a block trade."],
      ["Trading in proportion to market volume", "That is VWAP or POV."],
      ["Waiting until the end", "That maximises price risk."],
    ]),

  // level 2
  c6.n(OE, "apply-twap-speed", 2,
    "Liquidate $\\mathfrak{N} = 120{,}000$ shares over $T = 6$ hours at a constant speed. How many shares per hour?",
    20000),
  c6.n(OE, "apply-twap-inventory", 2,
    "Under TWAP, $Q_t = \\mathfrak{N}(1 - t/T)$. With $\\mathfrak{N} = 120{,}000$ and $T = 6$ hours, what inventory remains after $4$ hours?",
    40000),
  c6.n(OE, "apply-gamma", 2,
    "The urgency parameter is $\\gamma = \\sqrt{\\phi/k}$. With running penalty $\\phi = 0.01$ and temporary impact $k = 0.0001$, compute $\\gamma$.",
    10),
  c6.m(OE, "recall-running-penalty", 2, "The running penalty $\\phi\\int_t^T Q_u^2\\,du$ in the objective is:",
    "Not a financial cost, but a way to express urgency and aversion to holding inventory", [
      ["The fee charged by the exchange", "It is not paid to anyone."],
      ["The permanent impact", "Impact is in the price dynamics."],
      ["The terminal liquidation cost", "That is the $\\alpha Q_T^2$ term."],
    ]),

  // level 3
  c6.n(OE, "apply-twap-cost", 3,
    "With linear temporary impact $f(\\nu) = k\\nu$ and TWAP over $T$, the expected execution cost is $k\\mathfrak{N}^2/T$. With $k = 10^{-6}$ dollars per (share per day), $\\mathfrak{N} = 100{,}000$ and $T = 1$ day, compute it in dollars.",
    10000),
  c6.n(OE, "apply-ac-inventory", 3,
    "With $\\alpha \\to \\infty$, the optimal inventory is $Q_t = \\mathfrak{N}\\frac{\\sinh(\\gamma(T - t))}{\\sinh(\\gamma T)}$. With $\\gamma = 2$, $T = 1$ and $t = 0.5$, what fraction of the order remains? Give $4$ decimal places.",
    0.324),
  c6.n(OE, "apply-penalty-acquisition", 3,
    "Acquisition with a terminal penalty $\\alpha$ and no running penalty: the optimal speed is $\\nu^{*}_t = \\frac{Y_t}{(T - t) + k/\\alpha}$ for $Y_t$ shares still to buy. With $k = 0.001$, $\\alpha = 0.01$ and $T = 1$, what is $\\nu^{*}_0/\\mathfrak{N}$? Give $4$ decimal places.",
    0.9091),
  c6.m(OE, "apply-gamma-effect", 3, "As the urgency parameter $\\gamma = \\sqrt{\\phi/k}$ increases, the optimal liquidation schedule:",
    "Front-loads trading, selling faster at the start", [
      ["Approaches TWAP", "TWAP is the limit $\\gamma \\to 0$."],
      ["Delays trading to the end", "Urgency speeds up early trading."],
      ["Is unaffected", "$\\gamma$ shapes the whole schedule."],
    ]),

  // level 4
  c6.n(OE, "apply-left-at-T", 4,
    "In the acquisition problem with terminal penalty and no running penalty, the fraction of the target still unbought at $T$ is $\\frac{k/\\alpha}{T + k/\\alpha}$. With $k = 0.001$, $\\alpha = 0.01$ and $T = 1$, compute it. Give $4$ decimal places.",
    0.0909),
  c6.n(OE, "apply-ac-speed-zero", 4,
    "With $\\alpha \\to \\infty$, the initial speed is $\\nu_0^{*} = \\gamma\\coth(\\gamma T)\\,\\mathfrak{N}$. With $\\gamma = 2$ and $T = 1$, what is $\\nu_0^{*}/\\mathfrak{N}$? Give $4$ decimal places.",
    2.0746),
  c6.n(OE, "apply-permanent-cost", 4,
    "With linear permanent impact $g(\\nu) = b\\nu$, every strategy that completes the liquidation pays the same expected permanent-impact cost $\\frac{b}{2}\\mathfrak{N}^2$. With $b = 10^{-6}$ and $\\mathfrak{N} = 100{,}000$, compute it in dollars.",
    5000),
  c6.s(OE, "explain-twap-optimal", 4,
    "When is TWAP the optimal liquidation strategy in this chapter’s models?",
    "States that with only linear temporary impact, no running inventory penalty ($\\phi = 0$), and full liquidation enforced ($\\alpha \\to \\infty$), the optimal speed is $q/(T - t)$, a constant rate.",
    "Explains why: with no aversion to holding inventory, only the impact cost $k\\int\\nu^2$ matters, and that is minimised by spreading trades evenly (convexity); adding permanent impact does not change it."),

  // level 5
  c6.n(OE, "apply-zeta", 5,
    "With terminal penalty $\\alpha = 0.1$, permanent impact $b = 0.001$, temporary impact $k = 0.001$ and $\\phi = 0.01$, compute $\\zeta = \\frac{\\alpha - b/2 + \\sqrt{k\\phi}}{\\alpha - b/2 - \\sqrt{k\\phi}}$. Give $4$ decimal places.",
    1.0656),
  c6.m(OE, "apply-b-irrelevant", 5, "With $\\alpha \\to \\infty$ (full liquidation forced), the optimal strategy is independent of the permanent impact $b$. Why?",
    "The permanent-impact cost $\\frac{b}{2}\\mathfrak{N}^2$ is the same for every complete liquidation, so it cannot change which strategy is best", [
      ["Permanent impact is zero in practice", "It is not zero; it is just strategy-independent here."],
      ["$b$ cancels from the price dynamics", "It remains in the dynamics but not in the optimisation."],
      ["The agent ignores the midprice", "She values inventory at the midprice."],
    ]),
  c6.n(OE, "apply-inventory-midway", 5,
    "With $\\alpha \\to \\infty$, $\\gamma = 4$ and $T = 1$, what fraction of the order remains at $t = 0.25$? Give $4$ decimal places.",
    0.3671),
  c6.s(OE, "explain-ansatz-solution", 5,
    "Outline how the HJB for liquidation with temporary and permanent impact and a running penalty is solved.",
    "Uses the ansatz $H = x + qS + h(t, q)$, then $h = h_2(t)q^2$, reducing the HJB to a Riccati ODE $\\partial_t h_2 - \\phi + \\frac{1}{k}(h_2 + \\tfrac{b}{2})^2 = 0$ with $h_2(T) = -\\alpha$.",
    "Solves it with the substitution $h_2 = -\\tfrac{b}{2} + \\chi$, giving $\\chi$ in terms of $\\gamma$ and $\\zeta$, and the feedback speed $\\nu^{*} = -\\frac{1}{k}(\\chi(t))q$ in sinh/cosh form."),

  // level 6
  c6.n(OE, "apply-ac-speed-general", 6,
    "The general optimal speed is $\\nu_t^{*} = \\gamma\\frac{\\zeta e^{\\gamma(T - t)} + e^{-\\gamma(T - t)}}{\\zeta e^{\\gamma(T - t)} - e^{-\\gamma(T - t)}}Q_t$. With $\\gamma = 2$, $\\zeta = 3$ and $T - t = 0.5$, what is $\\nu^{*}/Q$? Give $4$ decimal places.",
    2.189),
  c6.s(OE, "explain-terminal-penalty", 6,
    "Explain the role of the terminal penalty $\\alpha$ and what happens in the limits $\\alpha \\to 0$ and $\\alpha \\to \\infty$.",
    "Explains that $\\alpha$ prices the cost of executing the remaining inventory as one block at $T$ (walking the book plus any penalty); larger $\\alpha$ makes leftover inventory more costly.",
    "As $\\alpha \\to \\infty$, all shares must be traded by $T$; as $\\alpha \\to 0$, finishing early has little value, so she trades slowly or not at all if there is no running penalty, leaving shares for $T$."),
  c6.m(OE, "apply-random-strategy", 6, "In the Almgren–Chriss-type model with Brownian midprice and linear impacts, the optimal strategy is deterministic. Why?",
    "The optimal speed depends only on time and inventory, and inventory evolves deterministically under it; price shocks do not enter the feedback rule", [
      ["Prices are deterministic", "Prices are random."],
      ["The agent is risk-neutral", "Even with penalties or CARA utility it is deterministic."],
      ["Impact is zero", "Impact is non-zero."],
    ]),
  c6.n(OE, "apply-cost-ac-vs-twap", 6,
    "As a baseline for comparing schedules, compute the TWAP temporary-impact cost $k\\mathfrak{N}^2/T$ for $k = 2 \\times 10^{-6}$, $\\mathfrak{N} = 50{,}000$ and $T = 0.5$ days, in dollars.",
    10000),

  // level 7
  c6.s(OE, "explain-riccati", 7,
    "Why does the liquidation HJB reduce to a Riccati equation, and what guarantees the quadratic ansatz is consistent?",
    "Explains that the dynamics are linear in the control and state, the impact cost is quadratic in the speed, and the penalties are quadratic in inventory, so optimising the speed yields terms quadratic in $\\partial_q h$.",
    "Notes that with $h = h_2q^2$ every term is proportional to $q^2$ (the terminal condition $-\\alpha q^2$ too), so matching coefficients gives a single Riccati ODE for $h_2$."),
  c6.n(OE, "apply-half-life", 7,
    "With $\\alpha \\to \\infty$ and $\\gamma T$ large, inventory decays roughly like $e^{-\\gamma t}$. With $\\gamma = 6$ per day, how many hours of a $6.5$-hour day until half the order is sold? Give $2$ decimal places.",
    0.75),
  c6.m(OE, "apply-acquisition-vs-liquidation", 7, "For acquisition rather than liquidation, the temporary impact enters the execution price as:",
    "$S_t + k\\nu_t$, since buying quickly walks up the ask side", [
      ["$S_t - k\\nu_t$", "That is for selling."],
      ["$S_t$", "Buying aggressively costs more than the mid."],
      ["$S_t + b\\nu_t$", "$b$ is permanent impact on the midprice drift."],
    ]),
  c6.s(OE, "explain-delay-horizon", 7,
    "Without a running penalty but with terminal penalty $\\alpha$, the acquisition speed is constant and equals TWAP over a longer horizon $T + k/\\alpha$. Interpret this.",
    "Explains that a finite penalty makes it acceptable to leave some shares for a block purchase at $T$, so the agent trades as if her deadline were $k/\\alpha$ later.",
    "Explains that larger $\\alpha$ (expensive block) shrinks the extension toward the true deadline, while larger $k$ (expensive continuous trading) extends it."),

  // level 8
  c6.n(OE, "apply-ac-expected-shortfall", 8,
    "With $\\alpha \\to \\infty$ and $\\phi = 0$, a full liquidation under TWAP has expected revenue $\\mathfrak{N}S_0 - \\frac{b}{2}\\mathfrak{N}^2 - \\frac{k\\mathfrak{N}^2}{T}$. With $S_0 = 50$, $\\mathfrak{N} = 100{,}000$, $b = 10^{-6}$, $k = 10^{-6}$ and $T = 1$, what is the expected implementation shortfall in dollars?",
    15000),
  c6.s(OE, "explain-risk-term", 8,
    "In the risk-neutral model with running penalty $\\phi$, what “risk” does the penalty proxy, and how does it relate to the variance of revenue?",
    "Explains that holding $Q_t$ shares exposes the agent to midprice fluctuations with variance $\\sigma^2Q_t^2dt$, so the variance of terminal revenue is $\\sigma^2\\int Q_t^2dt$.",
    "Concludes that $\\phi\\int Q_t^2dt$ is a mean–variance-style penalty with $\\phi$ playing the role of $\\tfrac{1}{2}\\gamma\\sigma^2$, which Section 6.6 makes exact for CARA utility."),
  c6.m(OE, "apply-drift-midprice", 8, "If the midprice has a known positive drift during liquidation (Exercise E.6.3), the optimal strategy:",
    "Slows down, or may even buy, to benefit from the expected price rise, depending on the drift’s size", [
      ["Is unchanged", "A drift changes the incentive to hold inventory."],
      ["Sells faster", "A rising price rewards selling later."],
      ["Becomes TWAP", "Drift tilts the schedule away from TWAP."],
    ]),
  c6.n(OE, "apply-coth-limit", 8,
    "As $T - t \\to \\infty$ with $\\alpha \\to \\infty$, $\\nu^{*}/Q \\to \\gamma$. With $\\phi = 2.5 \\times 10^{-5}$ and $k = 10^{-7}$, what is this limiting fraction per day?",
    15.81),

  // level 9
  c6.s(OE, "transfer-calibrate", 9,
    "You must liquidate $5\\%$ of average daily volume today. Explain how you would choose $k$, $b$, $\\phi$ and $\\alpha$ for the model and check the resulting schedule makes sense.",
    "Estimates $k$ from the slope of book-walking cost versus size and $b$ from the regression of price changes on order flow (Chapter 4), possibly by time of day.",
    "Sets $\\alpha$ large to force completion and chooses $\\phi$ from risk tolerance (e.g. $\\phi = \\tfrac{1}{2}\\gamma\\sigma^2$ or a target urgency $\\gamma$), then checks that the implied participation rate is reasonable relative to market volume and compares cost and risk with TWAP."),
  c6.n(OE, "apply-optimal-T", 9,
    "If the cost of TWAP is $k\\mathfrak{N}^2/T + \\tfrac{1}{3}\\phi\\mathfrak{N}^2T$ (impact plus inventory penalty), the cost-minimising horizon is $T^{*} = \\sqrt{3k/\\phi}$. With $k = 10^{-6}$ and $\\phi = 3 \\times 10^{-6}$, compute $T^{*}$ in days.",
    1),
  c6.m(OE, "transfer-schedule-shape", 9, "A trader observes that the optimal schedule sells $40\\%$ of the order in the first $10\\%$ of the horizon. This implies:",
    "A high urgency $\\gamma T$, from a large running penalty relative to temporary impact", [
      ["A small $\\gamma$", "Small urgency gives schedules close to TWAP."],
      ["That $\\alpha$ is small", "Small $\\alpha$ leaves shares to the end."],
      ["That permanent impact is large", "With full liquidation, $b$ does not change the schedule."],
    ]),
  c6.s(OE, "transfer-adaptive", 9,
    "The optimal strategy here is deterministic and ignores realised prices. Under what model changes would a good execution algorithm become price-adaptive, and why?",
    "Names changes such as a stochastic drift or alpha signal, order flow affecting prices (Section 7.3), a price limit (Section 7.2), or non-quadratic risk preferences, under which future expected price moves depend on observed variables.",
    "Explains that when information predicts price moves or constraints bind on price, the optimal speed depends on the current state, so the algorithm must update as prices and flows arrive."),

  // level 10
  c6.s(OE, "transfer-mean-variance", 10,
    "Almgren and Chriss originally minimised expected cost plus $\\lambda$ times its variance. Relate this to the running-penalty formulation and explain why the latter is easier to handle with dynamic programming.",
    "Explains that for deterministic strategies the variance of cost is $\\sigma^2\\int Q_t^2dt$, so mean–variance over deterministic schedules equals a running penalty with $\\phi = \\lambda\\sigma^2$.",
    "Explains that a running penalty is an additive, time-consistent objective, whereas variance over adaptive strategies is not, so dynamic programming applies directly to the penalty form."),
  c6.n(OE, "apply-expected-cost-ac", 10,
    "With $\\alpha \\to \\infty$, $\\phi > 0$ and no permanent impact, the optimal value is $x + qS - \\sqrt{k\\phi}\\coth(\\gamma T)q^2$. With $k = 10^{-6}$, $\\phi = 4 \\times 10^{-6}$, $\\gamma T = 2$ and $q = 100{,}000$, what is the total cost (impact plus penalty) in dollars? Give $2$ decimal places.",
    20746.3),
  c6.s(OE, "transfer-multi-asset", 10,
    "Extend the single-asset model to liquidating a portfolio of two correlated stocks. What changes in the optimal schedules?",
    "Explains that the running penalty becomes $\\mathbf{q}^{\\top}\\Phi\\mathbf{q}$ with a covariance-based $\\Phi$ and impact may be a matrix, so the Riccati equation is matrix-valued and the schedules couple.",
    "Notes the consequence: with positive correlation, holding one stock is riskier when the other is held, so both are sold faster; with a hedge-like negative correlation, one can be sold slower; the schedules are no longer separate sinh curves."),
  c6.m(OE, "transfer-nonlinear-impact", 10, "Empirically, impact often scales like the square root of order size. What does linear temporary impact get wrong for very large orders?",
    "It overstates the cost of very fast trading of large size, making optimal schedules too slow relative to a concave impact", [
      ["It understates all costs", "For large sizes linear impact overstates relative to square root."],
      ["Nothing; linear and square root agree at all sizes", "They diverge for large sizes."],
      ["It ignores the spread", "The spread can be added; the issue is the size dependence."],
    ]),
];

const utility: Item[] = [
  // level 1
  c66.m(EU, "recall-exp-utility", 1, "Exponential (CARA) utility is $u(x) = -e^{-\\gamma x}$. Its coefficient of absolute risk aversion is:",
    "$\\gamma$, constant in wealth", [
      ["$\\gamma/x$", "That would be relative risk aversion."],
      ["$1/\\gamma$", "That is risk tolerance."],
      ["Zero", "It is risk-averse for $\\gamma > 0$."],
    ]),
  c66.m(EU, "recall-equivalence", 1, "Section 6.6 shows that a CARA agent’s optimal liquidation equals that of a risk-neutral agent with running penalty $\\phi$ when:",
    "$\\phi = \\tfrac{1}{2}\\gamma\\sigma^2$", [
      ["$\\phi = \\gamma$", "Volatility enters the mapping."],
      ["$\\phi = \\gamma\\sigma$", "It is the variance, halved."],
      ["$\\phi = 0$", "That would be the risk-neutral case."],
    ]),
  c66.m(EU, "recall-power-impact", 1, "A power-law temporary impact model takes the form:",
    "$f(\\nu) = k\\nu^{a}$ with $a > 0$", [
      ["$f(\\nu) = k e^{\\nu}$", "Impact grows polynomially, not exponentially."],
      ["$f(\\nu) = k$", "Constant impact ignores size."],
      ["$f(\\nu) = k\\log\\nu$", "Not the power-law form."],
    ]),
  c66.m(EU, "recall-legendre", 1, "The Legendre transform of a convex function $F$ is:",
    "$F^{*}(y) = \\sup_x\\{xy - F(x)\\}$", [
      ["$F(-x)$", "That is a reflection."],
      ["$F'(x)$", "The derivative appears inside, but the transform is a supremum."],
      ["$\\int F(x)\\,dx$", "It is an optimisation, not an integral."],
    ]),

  // level 2
  c66.n(EU, "apply-phi-from-gamma", 2,
    "A CARA agent has $\\gamma = 0.02$ per dollar and the midprice volatility is $\\sigma = 0.3$ dollars per $\\sqrt{\\text{day}}$. What is the equivalent running penalty $\\phi = \\tfrac{1}{2}\\gamma\\sigma^2$? Give $4$ decimal places.",
    0.0009),
  c66.n(EU, "apply-urgency-from-gamma", 2,
    "With $\\phi = 0.0009$ and $k = 10^{-5}$, what is the urgency $\\gamma_{\\text{exec}} = \\sqrt{\\phi/k}$ per day? Give $2$ decimal places.",
    9.49),
  c66.n(EU, "apply-power-cost", 2,
    "With $f(\\nu) = k\\nu^{a}$, the cost rate of trading at speed $\\nu$ is $F(\\nu) = \\nu f(\\nu) = k\\nu^{1 + a}$. With $k = 0.001$, $a = 0.5$ and $\\nu = 100$, compute it.",
    1),
  c66.m(EU, "recall-convexity", 2, "The analysis of non-linear impact assumes that $\\nu f(\\nu)$ is convex. This means:",
    "The total cost of trading at rate $\\nu$ grows at least linearly faster as $\\nu$ grows, so the optimisation over speed is well posed", [
      ["Impact $f$ itself must be convex", "Power laws with $a < 1$ are concave in $\\nu$, but $\\nu f(\\nu)$ is still convex."],
      ["Impact must be linear", "Linearity is a special case."],
      ["Impact is negative", "Impact is a cost."],
    ]),

  // level 3
  c66.n(EU, "apply-legendre-quadratic", 3,
    "For $F(x) = kx^2$, the Legendre transform is $F^{*}(y) = \\frac{y^2}{4k}$. With $k = 0.5$ and $y = 2$, compute it.",
    2),
  c66.n(EU, "apply-power-argmax", 3,
    "For $F(x) = kx^{1 + a}$, the maximiser in $\\sup_x\\{xy - F(x)\\}$ is $x^{*} = \\left(\\frac{y}{(1 + a)k}\\right)^{1/a}$. With $k = 1$, $a = 0.5$ and $y = 3$, compute $x^{*}$.",
    4),
  c66.m(EU, "apply-utility-path", 3, "The optimal trading speed of the CARA agent in Section 6.6 has the same form as which earlier result?",
    "The risk-neutral, inventory-averse agent’s speed with $\\phi = \\tfrac{1}{2}\\gamma\\sigma^2$", [
      ["TWAP", "TWAP is the special case $\\phi = 0$."],
      ["The Merton investment", "Merton has no impact."],
      ["The dark-pool strategy", "That is in Chapter 7."],
    ]),
  c66.n(EU, "apply-power-transform-value", 3,
    "Continuing: $F^{*}(y) = x^{*}y - k(x^{*})^{1 + a}$. With $k = 1$, $a = 0.5$, $y = 3$ and $x^{*} = 4$, compute $F^{*}(3)$.",
    4),

  // level 4
  c66.n(EU, "apply-vol-urgency", 4,
    "Doubling volatility $\\sigma$ multiplies the CARA agent’s equivalent penalty $\\phi$ by what factor, and hence the urgency $\\sqrt{\\phi/k}$ by what factor? Report the urgency factor.",
    2),
  c66.s(EU, "explain-value-mapping", 4,
    "How are the CARA agent’s value function and the inventory-averse agent’s value function related?",
    "States that $H^{\\text{exp}} = -\\exp\\{-\\gamma(x + qS + h_2(t)q^2)\\}$ while $H^{\\text{inv}} = x + qS + h_2(t)q^2$ with the same $h_2$ when $\\phi = \\tfrac{1}{2}\\gamma\\sigma^2$.",
    "Concludes that $H^{\\text{exp}} = -\\exp\\{-\\gamma H^{\\text{inv}}\\}$: the CARA value is the utility of the inventory-averse value, so the certainty equivalent of the CARA agent equals the penalised value."),
  c66.n(EU, "apply-power-speed", 4,
    "With power impact, the optimal speed in feedback form is $\\nu^{*} = \\left(\\frac{-(bq + \\partial_q h)}{(1 + a)k}\\right)^{1/a}$. With $bq + \\partial_q h = -0.06$, $k = 0.01$ and $a = 1$, compute $\\nu^{*}$.",
    3),
  c66.m(EU, "apply-power-faster", 4, "Figure 6.4 shows that as the power $a$ decreases (impact less sensitive to size), the agent:",
    "Liquidates faster, since speed costs less in impact, reducing inventory risk", [
      ["Liquidates slower", "Cheaper speed encourages faster trading."],
      ["Trades at TWAP", "Inventory aversion still front-loads trading."],
      ["Stops trading", "She still liquidates."],
    ]),

  // level 5
  c66.n(EU, "apply-legendre-power-general", 5,
    "For $F(x) = kx^{1 + a}$, show $F^{*}(y) = a\\,k\\,(x^{*})^{1 + a}$. With $k = 0.01$, $a = 1$ and $y = 0.06$, compute $F^{*}(y)$.",
    0.09),
  c66.s(EU, "explain-legendre-geometry", 5,
    "Describe the geometric meaning of the Legendre transform used in Section 6.7, and why convexity makes the mapping one-to-one.",
    "Explains that $F^{*}(y)$ is (minus) the vertical intercept of the tangent to $F$ with slope $y$, so the transform maps the graph to its family of tangents.",
    "Explains that for convex $F$ the slope $F'$ is increasing, so each slope $y$ is attained at exactly one point, making the correspondence between points and tangents unique."),
  c66.m(EU, "apply-no-closed-form", 5, "Why does the non-linear impact HJB (6.38) usually need numerical methods?",
    "With $a \\ne 1$, $F^{*}$ is not quadratic, so the quadratic ansatz in $q$ fails and the PDE does not reduce to an ODE", [
      ["The HJB has no solution", "It has a solution, just not in closed form."],
      ["Volatility is stochastic", "Volatility is constant."],
      ["The terminal condition is discontinuous", "It is smooth: $-\\alpha q^2$."],
    ]),
  c66.n(EU, "apply-ce-value", 5,
    "A CARA agent with $\\gamma = 0.001$ faces a value function $-\\exp\\{-\\gamma(x + qS + h_2q^2)\\}$ with $x = 0$, $qS = 1{,}000{,}000$ and $h_2q^2 = -5{,}000$. What is her certainty-equivalent wealth, in dollars?",
    995000),

  // level 6
  c66.s(EU, "explain-utility-vs-penalty", 6,
    "When the two formulations give identical strategies, why might a practitioner still prefer the running-penalty formulation?",
    "Explains that the penalty formulation is linear in cash, so value functions are in dollars and easier to interpret, combine and solve numerically.",
    "Notes that $\\phi$ can be set directly as an urgency choice, and the formulation generalises to settings where utility would complicate the HJB (e.g. with jumps), while still being justified by the CARA equivalence."),
  c66.n(EU, "apply-ratio-a", 6,
    "Two impact models give the same cost at speed $\\nu = 1{,}000$: linear $k_1\\nu$ with $k_1 = 10^{-5}$, and square-root $k_2\\nu^{0.5}$. What is $k_2$? Give $5$ decimal places.",
    0.00032),
  c66.m(EU, "apply-r2-impact", 6, "The book notes impact models typically have $R^2 < 5\\%$. This is used to argue that:",
    "The gain from a more complex impact model may not justify its complexity", [
      ["Impact does not exist", "Impact exists but explains little price variance."],
      ["Linear models are wrong", "Low $R^2$ does not single out linear models."],
      ["Volatility is zero", "Prices are noisy."],
    ]),
  c66.n(EU, "apply-power-cost-compare", 6,
    "Compare the impact cost rate $k\\nu^{1 + a}$ at $\\nu = 400$ for $k = 0.001$ with $a = 1$ and with $a = 0.5$. What is the ratio (linear-impact cost)/(square-root-impact cost)?",
    20),

  // level 7
  c66.s(EU, "explain-derivation-cara", 7,
    "Outline how the CARA execution HJB reduces to the same Riccati ODE as the penalised problem.",
    "Uses the ansatz $H = -\\exp\\{-\\gamma(x + qS + h(t, q))\\}$, so that $\\partial_{SS}H$ produces $\\gamma^2q^2H$ and, after dividing by $-\\gamma H$, a term $-\\tfrac{1}{2}\\gamma\\sigma^2q^2$.",
    "Notes that the remaining terms match the penalised HJB with $\\phi = \\tfrac{1}{2}\\gamma\\sigma^2$, and with $h = h_2q^2$ the same Riccati ODE and terminal condition follow."),
  c66.n(EU, "apply-equivalent-gamma", 7,
    "A desk sets urgency $\\gamma_{\\text{exec}} = \\sqrt{\\phi/k} = 5$ per day with $k = 4 \\times 10^{-6}$ and daily volatility $\\sigma = 0.5$. What CARA risk aversion $\\gamma$ does this correspond to? Give $5$ decimal places.",
    0.0008),
  c66.m(EU, "apply-nonlinear-urgency", 7, "Section 6.7 concludes that with weaker (concave) impact the agent “behaves as if she has a larger urgency parameter”. This is because:",
    "Cheap fast trading means reducing inventory risk early costs less, mimicking a higher $\\phi/k$", [
      ["She becomes more risk-averse", "Her preferences are unchanged."],
      ["Volatility increases", "Volatility is fixed."],
      ["The terminal penalty grows", "The terminal penalty is unchanged."],
    ]),
  c66.s(EU, "explain-finite-difference", 7,
    "Describe how you would solve $\\partial_t h - \\phi q^2 + F^{*}(-(bq + \\partial_q h)) = 0$, $h(T, q) = -\\alpha q^2$, numerically.",
    "Proposes a grid in $q$ and $t$, stepping backwards from $T$: approximate $\\partial_q h$ by finite differences and evaluate $F^{*}$ in closed form for the power law.",
    "Notes stability and boundary issues (an upwind scheme for the first-order non-linear term, a boundary at $q = 0$ where $h = 0$), then recovers the speed from $\\nu^{*} = (F')^{-1}(-(bq + \\partial_q h))$ and integrates inventory forwards."),

  // level 8
  c66.n(EU, "apply-power-limit", 8,
    "For $F(x) = kx^{1 + a}$ the Legendre transform is $F^{*}(y) = a k\\left(\\frac{y}{(1 + a)k}\\right)^{(1 + a)/a}$. With $k = 1$, $a = 2$ and $y = 12$, compute $F^{*}(y)$.",
    16),
  c66.s(EU, "explain-cara-limitations", 8,
    "CARA preferences make the liquidation strategy independent of wealth and deterministic. Critique this property for real execution desks.",
    "Notes that real desks’ risk tolerance may depend on P&L so far, on the size of the order relative to capital, and on limits, which CARA ignores.",
    "Notes that deterministic schedules ignore information arriving during execution (price moves, volume, order flow); desks often add adaptive rules, which other preferences or models (with signals) would justify."),
  c66.m(EU, "apply-legendre-involution", 8, "For a convex, lower semicontinuous $F$, applying the Legendre transform twice gives:",
    "$F$ itself", [
      ["$-F$", "The double transform recovers $F$."],
      ["$F'$", "It recovers the function, not its derivative."],
      ["Zero", "The double transform is not trivial."],
    ]),
  c66.n(EU, "apply-ce-loss", 8,
    "A CARA agent with $\\gamma = 2 \\times 10^{-5}$ holds $q = 10{,}000$ shares for one day without trading, with $\\sigma = 1$ dollar per $\\sqrt{\\text{day}}$. Her certainty-equivalent loss from price risk is $\\tfrac{1}{2}\\gamma\\sigma^2q^2$. Compute it in dollars.",
    1000),

  // level 9
  c66.s(EU, "transfer-choose-a", 9,
    "How would you decide whether to use linear or square-root temporary impact in a production execution model?",
    "Proposes estimating impact on the desk’s own executions across sizes and participation rates, comparing linear and power-law fits out of sample in realised cost, not $R^2$.",
    "Weighs the practical side: the linear model gives closed-form schedules and stable behaviour; a power law needs numerical solution and its exponent is uncertain, so the choice should be judged on realised cost and robustness."),
  c66.n(EU, "apply-root-impact-cost", 9,
    "With square-root impact $f(\\nu) = k\\sqrt{\\nu}$, liquidating $\\mathfrak{N}$ at a constant speed over $T$ costs $k\\mathfrak{N}^{1.5}/\\sqrt{T}$. With $k = 10^{-4}$, $\\mathfrak{N} = 1{,}000{,}000$ and $T = 4$, compute it in dollars.",
    50000),
  c66.m(EU, "transfer-utility-choice", 9, "For a liquidation lasting several days, a desk worries that CARA utility underweights catastrophic losses. A better choice might be:",
    "An objective that penalises tail losses, such as CVaR or a utility with decreasing absolute risk aversion, solved numerically", [
      ["Risk neutrality", "That ignores risk entirely."],
      ["CARA with a smaller $\\gamma$", "That makes it less risk-averse, not tail-aware."],
      ["TWAP always", "TWAP ignores risk preferences."],
    ]),
  c66.s(EU, "transfer-impact-decay", 9,
    "The Chapter 6 models split impact into instantaneous temporary and permanent parts. Real impact decays over minutes (transient impact). How would modelling decay change the optimal strategy?",
    "Explains that with transient impact (e.g. Obizhaeva–Wang, propagator models) past trades depress the price for a while, so trading too quickly accumulates impact, and the price recovers if the agent pauses.",
    "Predicts strategies with bursts and pauses (block trades at the start and end in Obizhaeva–Wang), dependence on the resilience speed of the book, and a need for a state variable tracking accumulated impact."),

  // level 10
  c66.s(EU, "transfer-robust-execution", 10,
    "Parameters $k$, $\\sigma$ and $\\gamma$ are all uncertain. Propose a way to choose an execution schedule that performs well across plausible parameter values.",
    "Proposes evaluating candidate schedules (for different urgencies) under a range of parameter scenarios and choosing one that minimises worst-case or average regret, or using a robust-control formulation.",
    "Notes that the schedule’s sensitivity is mostly through $\\gamma = \\sqrt{\\phi/k}$, so moderate urgency is often robust, and that adaptive recalibration during the day can reduce the cost of misspecification."),
  c66.n(EU, "apply-break-even-a", 10,
    "Linear impact $k_1\\nu$ and square-root impact $k_2\\sqrt{\\nu}$ with $k_1 = 10^{-5}$ and $k_2 = 3.2 \\times 10^{-4}$. At what speed $\\nu$ do they give equal impact?",
    1024),
  c66.s(EU, "transfer-mapping-generality", 10,
    "The book shows the CARA–penalty mapping again for limit-order execution, volume targeting and market making. Why does such a mapping keep appearing, and when would it fail?",
    "Explains that with exponential utility and dynamics where the only risk is a Brownian midprice times inventory, the exponential ansatz turns the price risk into a $\\tfrac{1}{2}\\gamma\\sigma^2q^2$ term, equivalent to a quadratic running penalty.",
    "Notes that it fails, or holds only approximately, when there are jumps whose size is random (the exponential produces non-quadratic terms), when cash flows are non-linear in risk, or when utility is not exponential."),
  c66.m(EU, "transfer-legendre-economics", 10, "In the non-linear impact HJB, $F^{*}(-(bq + \\partial_q h))$ has an economic interpretation as:",
    "The maximal net gain rate from trading, given the marginal value of selling one share faster", [
      ["The midprice", "It is a gain rate, not a price."],
      ["The terminal penalty", "That is $-\\alpha q^2$."],
      ["The volatility", "Volatility is in the diffusion term."],
    ]),
];

const limiter: Item[] = [
  // level 1
  c7.m(PL, "recall-limiter", 1, "In the acquisition problem with a price limiter, the agent:",
    "Stops continuous trading and buys the rest in one block if the midprice rises to a cap", [
      ["Never pays above a limit price for any share", "She may pay above the cap when buying the remainder."],
      ["Uses only limit orders", "She uses MOs."],
      ["Sells when the price is high", "She is acquiring."],
    ]),
  c7.m(PL, "recall-order-flow-drift", 1, "In Section 7.3, other traders’ order flow affects:",
    "The drift of the midprice, through permanent impact", [
      ["The agent’s temporary impact only", "Order flow enters the midprice drift."],
      ["The tick size", "The tick is fixed."],
      ["Nothing", "It shifts the midprice drift."],
    ]),
  c7.m(PL, "recall-flow-response", 1, "When net order flow from other traders is on the sell side while the agent liquidates, she:",
    "Speeds up, selling before others push the price down further", [
      ["Slows down", "She slows when flow is on the buy side."],
      ["Stops trading", "She keeps trading, faster."],
      ["Starts buying", "Selling pressure argues for selling sooner."],
    ]),
  c7.m(PL, "recall-ou-flow", 1, "Order flow $\\mu_t$ in Section 7.3 is modelled as:",
    "A mean-reverting process with jumps from buy and sell MOs that decay exponentially", [
      ["A constant", "It varies with arrivals."],
      ["Brownian motion without mean reversion", "Jumps decay toward zero."],
      ["Deterministic", "It is driven by random arrivals."],
    ]),

  // level 2
  c7.n(PL, "apply-flow-decay", 2,
    "Net order flow decays at rate $\\kappa = 5$ per minute between arrivals. Starting at $\\mu = 2{,}000$ shares per minute, what is it after $0.2$ minutes with no arrivals? Give $1$ decimal place.",
    735.8),
  c7.n(PL, "apply-flow-drift", 2,
    "With permanent impact $b = 10^{-5}$ dollars per (share per minute) and net order flow $\\mu = 3{,}000$ shares per minute, what is the midprice drift, $b\\mu$, in cents per minute?",
    3),
  c7.n(PL, "apply-limit-boundary", 2,
    "An acquisition programme has a price cap $\\bar{S} = 52$. The midprice is $50.5$. How far below the cap is the price, in dollars?",
    1.5),
  c7.m(PL, "recall-max-principle", 2, "The maximum principle in Section 7.2 is used to show that the agent with a price limit:",
    "Trades at least as fast as the agent without a limit, at every inventory level", [
      ["Trades slower than TWAP", "She trades faster than the no-limit strategy."],
      ["Never reaches the cap", "She may reach it."],
      ["Has a closed-form strategy", "The strategy is computed numerically in general."],
    ]),

  // level 3
  c7.n(PL, "apply-expected-flow", 3,
    "With $\\mathbb{E}[\\mu_u \\mid \\mu_t] = \\mu_te^{-\\kappa(u - t)}$, $\\kappa = 2$ per hour and $\\mu_t = 1{,}000$, what is the expected flow one hour ahead? Give $1$ decimal place.",
    135.3),
  c7.n(PL, "apply-cum-flow", 3,
    "With the same decay, the expected cumulative order flow from $t$ to $\\infty$ is $\\mu_t/\\kappa$. With $\\mu_t = 1{,}000$ shares per hour and $\\kappa = 2$ per hour, compute it.",
    500),
  c7.m(PL, "apply-limit-volatility", 3, "With a price limiter, Figure 7.1 shows that higher volatility makes the agent:",
    "Acquire faster, because the cap is more likely to be hit", [
      ["Acquire slower", "Volatility raises the risk of hitting the cap."],
      ["Ignore volatility", "Without a limit volatility does not matter, but with one it does."],
      ["Stop at once", "She continues to trade."],
    ]),
  c7.m(PL, "apply-ac-no-vol", 3, "In the Almgren–Chriss model with full liquidation and linear impacts, the optimal speed does not depend on:",
    "The midprice volatility, if there is no running penalty", [
      ["Inventory", "Speed is proportional to inventory."],
      ["Time remaining", "Speed depends on $T - t$."],
      ["The temporary impact $k$", "$k$ sets the urgency $\\gamma$."],
    ]),

  // level 4
  c7.n(PL, "apply-flow-adjustment", 4,
    "With $\\alpha \\to \\infty$, the order-flow adjustment to the speed is $-\\frac{b}{2k}\\int_t^T\\frac{\\sinh(\\gamma(T - u))}{\\sinh(\\gamma(T - t))}\\mathbb{E}[\\mu_u]du$. If the integral evaluates to $400$ shares, $b = 10^{-5}$ and $k = 5 \\times 10^{-5}$, what is the adjustment in shares per unit time?",
    -40),
  c7.s(PL, "explain-hide-orders", 4,
    "The book offers two interpretations of why the liquidating agent speeds up when order flow is sell-heavy. Give both.",
    "Explains the price-trend interpretation: sell-heavy flow pushes the midprice down, so selling earlier captures a higher price.",
    "Explains the camouflage interpretation: she trades more when others trade in the same direction, hiding her orders among theirs."),
  c7.n(PL, "apply-flow-jump", 4,
    "Order flow jumps by $\\eta = 500$ shares per minute at each buy MO. If buy MOs arrive at rate $\\lambda = 2$ per minute and flow decays at $\\kappa = 4$ per minute, what is the long-run mean of the buy component of flow, $\\lambda\\eta/\\kappa$?",
    250),
  c7.m(PL, "apply-flow-volatility", 4, "Does the volatility of order flow, $\\eta$, affect the optimal speed directly?",
    "No: the speed depends on expected future flow, not on its volatility, though a volatile flow path makes the realised speed volatile", [
      ["Yes, higher $\\eta$ always slows trading", "$\\eta$ does not appear in the feedback rule."],
      ["Yes, it sets $\\gamma$", "$\\gamma = \\sqrt{\\phi/k}$."],
      ["Only if $\\alpha$ is small", "It does not enter the rule."],
    ]),

  // level 5
  c7.n(PL, "apply-limit-ode", 5,
    "On the limit boundary the value satisfies a Riccati ODE whose solution $x(t)$ satisfies $0 \\le x \\le \\alpha$ and increases to $\\alpha$ at $T$. If $x(t)/k$ sets the speed per share, $\\nu = x(t)Y/k$, with $x = 0.004$, $k = 0.001$ and $Y = 2{,}000$, compute $\\nu$.",
    8000),
  c7.s(PL, "explain-limiter-dimension", 5,
    "How does ignoring permanent impact reduce the dimension of the price-limiter problem?",
    "Explains that with $b = 0$ the dependence on inventory can be separated: $h(t, S, y) = y^2h(t, S)$ (or similar), so the DPE becomes an equation in $(t, S)$ only.",
    "Notes the result: a $(1 + 1)$-dimensional Fisher-type PDE for $h(t, S)$, solvable numerically by Crank–Nicolson, with the speed proportional to remaining shares."),
  c7.m(PL, "apply-negative-inventory", 5, "In the order-flow model without constraints, the optimal liquidation speed can become negative. This means the agent:",
    "Buys, to profit from expected upward price pressure, even while liquidating overall", [
      ["Is making an error", "It is optimal given the predictable drift."],
      ["Stops trading", "Negative speed means buying."],
      ["Exceeds her target", "She temporarily reverses direction."],
    ]),
  c7.n(PL, "apply-clip-speed", 5,
    "To avoid buying, the book uses $\\nu^{+} = \\max(\\nu^{*}, 0)$ when inventory is positive. If $\\nu^{*} = -1{,}200$ shares per hour, what speed is used?",
    0),

  // level 6
  c7.s(PL, "explain-flow-model", 6,
    "Write down the order-flow model of Section 7.3 and explain how other traders’ MOs affect the midprice.",
    "Writes $d\\mu^{\\pm}_t = -\\kappa\\mu^{\\pm}_t dt + \\eta^{\\pm}dL^{\\pm}_t$ with Poisson arrivals $L^{\\pm}$, and net flow $\\mu = \\mu^{+} - \\mu^{-}$.",
    "Writes the midprice $dS_t = (g(\\mu^{+}_t) - g(\\mu^{-}_t) - g(\\nu_t))dt + \\sigma dW_t$, so with linear $g = b\\cdot$ the drift is $b(\\mu_t - \\nu_t)$: buy pressure pushes prices up, the agent’s selling pushes them down."),
  c7.n(PL, "apply-flow-integral", 6,
    "With $\\alpha \\to \\infty$, $\\gamma \\to 0$ (TWAP limit), the adjustment integral reduces to $\\int_t^T\\frac{T - u}{T - t}\\mathbb{E}[\\mu_u]du$. With $\\mathbb{E}[\\mu_u] = 300$ constant and $T - t = 2$, compute it.",
    300),
  c7.m(PL, "apply-limit-end", 6, "Near the end of the horizon in the order-flow model, the adjustment for order flow:",
    "Shrinks, because little time remains to benefit from expected price trends and she must complete the trade", [
      ["Grows", "There is less time for the flow to matter."],
      ["Is unchanged", "It depends on time remaining."],
      ["Becomes the only term", "The completion term dominates near $T$."],
    ]),
  c7.n(PL, "apply-cap-hit-prob", 6,
    "For a driftless Brownian midprice with $\\sigma = 0.5$ per $\\sqrt{\\text{day}}$, the probability of hitting a cap $1$ dollar above the current price within $T = 1$ day is $2\\Pr(Z > \\frac{1}{\\sigma\\sqrt{T}})$. With $\\Pr(Z > 2) = 0.02275$, compute it. Give $4$ decimal places.",
    0.0455),

  // level 7
  c7.s(PL, "explain-limiter-faster", 7,
    "Explain intuitively why an agent with a price cap acquires faster than one without, especially as the price approaches the cap.",
    "Explains that hitting the cap forces a costly block purchase of the remaining shares (penalty $\\alpha$), so as the price nears the cap the expected cost of leftover shares rises.",
    "Concludes that she accelerates to reduce the inventory still to buy before the cap is breached, accepting more temporary impact in exchange."),
  c7.n(PL, "apply-flow-revenue", 7,
    "If net order flow raises the midprice drift by $b\\bar{\\mu} = 0.02$ dollars per hour for the next $2$ hours, and the agent delays selling $10{,}000$ shares by one hour, what is the extra expected revenue from the drift, ignoring impact?",
    200),
  c7.m(PL, "apply-iteration", 7, "The book’s iterative scheme for the limiter PDE linearises around the previous iterate. Convergence relies on:",
    "The mapping from one iterate to the next being a contraction on a suitable function space", [
      ["The PDE being linear already", "It is non-linear."],
      ["A closed-form solution", "The scheme is used because there is none."],
      ["Monte Carlo averaging", "It is a PDE iteration."],
    ]),
  c7.s(PL, "explain-flow-predictability", 7,
    "The order-flow model introduces predictability into prices. Why might the agent then trade even after her liquidation is complete, and how does the book handle this?",
    "Explains that a predictable drift creates a speculative opportunity, so the unconstrained optimum may buy or sell beyond the liquidation target, holding negative inventory at times.",
    "Notes the book restricts the strategy (no buying while positive inventory, stop at zero), which is a practical approximation to the constrained optimum, which has no closed form."),

  // level 8
  c7.n(PL, "apply-flow-adjust-closed", 8,
    "With $\\gamma \\to 0$, $\\alpha \\to \\infty$ and $\\mathbb{E}[\\mu_u] = \\mu_te^{-\\kappa(u - t)}$, the integral $\\int_t^T\\frac{T - u}{T - t}\\mu_te^{-\\kappa(u - t)}du$ over a long horizon ($T - t \\gg 1/\\kappa$) is about $\\mu_t/\\kappa$. With $\\mu_t = 600$ and $\\kappa = 3$, what is the adjustment $-\\frac{b}{2k}\\cdot$integral for $b/k = 0.5$?",
    -50),
  c7.s(PL, "explain-boundary-condition", 8,
    "The limiter PDE is solved on a grid with an upper boundary at the cap $\\bar{S}$. What boundary condition is natural, and how does the book justify it?",
    "States the condition at $S = \\bar{S}$: $h = \\alpha$ (the remaining shares are bought at the penalty), and at the far lower boundary a condition like $\\partial_{SS}h = 0$.",
    "Explains that the lower condition is justified by showing it implies the agent trades as if no limit existed when the price is far below the cap, which is the desired behaviour."),
  c7.m(PL, "apply-heatmap", 8, "In the simulations, the mean inventory path of the limiter strategy lies above the AC path (for acquisition, more shares bought earlier). Yet the mean trading speed eventually falls below AC’s. Why?",
    "Having bought more early, she has fewer shares left, so her speed, proportional to remaining shares, is lower later", [
      ["The limiter forbids trading late", "She may still trade late."],
      ["Volatility falls late in the day", "Volatility is constant in the model."],
      ["The AC strategy accelerates", "AC slows as inventory shrinks too."],
    ]),
  c7.n(PL, "apply-flow-stationary-var", 8,
    "Net flow $\\mu = \\mu^{+} - \\mu^{-}$ with each side jumping by $\\eta = 400$ at rate $\\lambda = 1.5$ and decaying at $\\kappa = 3$. The stationary variance of $\\mu$ is $2\\cdot\\frac{\\lambda\\eta^2}{2\\kappa}$. Compute it.",
    80000),

  // level 9
  c7.s(PL, "transfer-flow-signal", 9,
    "In practice, how would you estimate the order-flow state $\\mu_t$ that enters the strategy, and what risks does relying on it create?",
    "Proposes estimating it in real time from signed MO volume (buy minus sell aggressive volume) with exponential decay at the calibrated rate, across venues if possible.",
    "Notes the risks: signing errors and fragmented data make the estimate noisy; others may trade on the same signal, so the impact assumption $b$ may change; and the agent’s own trades must be excluded from $\\mu$."),
  c7.m(PL, "transfer-limit-choice", 9, "A client wants to buy “but not above \\$52”. The price-limiter model differs from simply stopping at \\$52 because:",
    "The agent anticipates the cap, accelerating before it is hit so less inventory is left for the penalised block", [
      ["It never buys above \\$52", "Remaining shares are bought at the cap plus penalty."],
      ["It ignores the cap until it is hit", "The strategy changes before the cap."],
      ["It only uses limit orders at \\$52", "It uses MOs continuously."],
    ]),
  c7.n(PL, "apply-camouflage", 9,
    "If the agent’s sell speed is $2{,}000$ shares per minute and other traders’ net sell flow is $6{,}000$ shares per minute, what fraction of total sell flow is hers?",
    0.25),
  c7.s(PL, "transfer-combine", 9,
    "How would you combine the price limiter and the order-flow signal in one execution algorithm, and what new numerical challenges arise?",
    "Proposes a value function in $(t, S, \\mu, q)$ with the cap boundary in $S$ and the order-flow generator in $\\mu$, solving a PIDE with both features.",
    "Notes the challenges: higher dimension (three or four state variables), a boundary in $S$ plus jump terms in $\\mu$, needing finite differences with jump quadrature or approximations such as separating the flow adjustment."),

  // level 10
  c7.s(PL, "transfer-feedback", 10,
    "If many liquidating agents use the order-flow strategy, they all speed up when flow is sell-heavy. Discuss the feedback this creates and its market consequences.",
    "Explains the positive feedback: sell-heavy flow causes agents to sell faster, which adds to sell flow and pushes prices further down, amplifying trends.",
    "Notes the consequences: momentum and possible liquidity spirals, and that the single-agent assumption ($b$ and the flow process fixed) breaks; an equilibrium or mean-field model would be needed."),
  c7.n(PL, "apply-limit-ratio", 10,
    "The book chooses parameters so that $\\alpha/k$ sets the maximum trading speed relative to remaining shares. With $\\alpha = 0.1$ and $k = 0.001$, what is the maximum speed per remaining share per day?",
    100),
  c7.s(PL, "transfer-limit-adverse", 10,
    "Suppose prices rise toward the cap because informed buyers are active. Discuss whether accelerating purchases near the cap is wise in that case, and what a richer model would include.",
    "Explains that if the rise reflects information, prices may keep rising, so buying sooner is valuable; the limiter strategy accelerates, which is directionally right.",
    "Notes the risk: she competes with informed buyers, so impact and adverse price moves are larger than the model assumes, and the cap may be breached anyway; a richer model would include a drift or alpha signal correlated with order flow."),
  c7.m(PL, "transfer-model-check", 10, "To validate the order-flow execution model, which test is most informative?",
    "Comparing realised implementation shortfall against the AC strategy on held-out executions, conditional on order-flow states", [
      ["Checking that the HJB is satisfied", "That verifies the solution, not the model."],
      ["Measuring the volatility of $\\mu$", "Volatility does not enter the strategy."],
      ["Counting the number of trades", "Trade count says little about performance."],
    ]),
];

const dark: Item[] = [
  // level 1
  c74.m(DP, "recall-dark-price", 1, "Orders in the dark pool of Section 7.4 execute at:",
    "The lit market’s midprice, with no price impact", [
      ["The lit bid", "Midpoint crossing is assumed."],
      ["A price set by an auction in the dark pool", "The book assumes pegging to the lit mid."],
      ["The agent’s limit price", "Dark orders are pegged."],
    ]),
  c74.m(DP, "recall-dark-risk", 1, "The main risk of posting in a dark pool is:",
    "Execution risk: a matching order may not arrive before the deadline", [
      ["Price impact", "Dark orders are assumed to have none."],
      ["Paying the spread", "Midpoint execution avoids it."],
      ["Information leakage through the visible book", "Dark orders are not displayed."],
    ]),
  c74.m(DP, "recall-dark-arrival", 1, "Matching orders arrive in the dark pool:",
    "At Poisson times with random volumes", [
      ["Continuously", "They arrive at discrete random times."],
      ["Once a day", "They arrive throughout the day."],
      ["Only when the agent posts", "Arrival is independent of the agent."],
    ]),
  c74.m(DP, "recall-full-post", 1, "In the model, the agent posts in the dark pool:",
    "Her entire remaining inventory, since posting more has no cost", [
      ["A fixed small fraction", "With no impact or cost, posting everything is optimal."],
      ["Nothing until the end", "She posts throughout."],
      ["Only when lit trading stops", "She trades in both venues simultaneously."],
    ]),

  // level 2
  c74.n(DP, "apply-dark-wait", 2,
    "Matching orders arrive at rate $\\lambda = 0.5$ per hour. What is the expected waiting time for the first match, in hours?",
    2),
  c74.n(DP, "apply-dark-prob", 2,
    "With $\\lambda = 0.5$ per hour, what is the probability of at least one match within $4$ hours? Give $4$ decimal places.",
    0.8647),
  c74.n(DP, "apply-dark-fill-partial", 2,
    "The agent posts $Y = 30{,}000$ shares in the dark; a matching order of $\\xi = 12{,}000$ arrives. How many shares execute, $\\min(Y, \\xi)$?",
    12000),
  c74.m(DP, "recall-dark-vs-lit", 2, "Compared with the lit market, trading in the dark pool offers:",
    "No temporary impact and a midpoint price, but uncertain timing", [
      ["Guaranteed execution", "Execution is uncertain."],
      ["Higher fees and worse prices", "The appeal is the price."],
      ["Visibility of the order book", "Dark pools do not display quotes."],
    ]),

  // level 3
  c74.n(DP, "apply-no-match-prob", 3,
    "With $\\lambda = 1.2$ per day, what is the probability that no match arrives during a $1$-day horizon? Give $4$ decimal places.",
    0.3012),
  c74.n(DP, "apply-dark-roots", 3,
    "With full execution in the dark, the coefficient $h_2$ of $q^2$ solves $\\partial_t h_2 - \\phi - \\lambda h_2 + \\frac{1}{k}h_2^2 = 0$, whose negative constant solution is $h_2 = -p$ with $p = \\frac{k}{2}\\left(\\sqrt{\\lambda^2 + 4\\phi/k} - \\lambda\\right)$. With $\\phi = 0.01$, $\\lambda = 2$ and $k = 0.001$, compute $p$. Give $5$ decimal places.",
    0.00232),
  c74.m(DP, "apply-dark-lambda-zero", 3, "When $\\lambda = 0$ (no dark liquidity), the lit-market strategy:",
    "Reduces to the Almgren–Chriss solution of Chapter 6", [
      ["Becomes TWAP", "It is AC, which is TWAP only if $\\phi = 0$."],
      ["Is to trade nothing", "She still must liquidate."],
      ["Is undefined", "It is the usual AC strategy."],
    ]),
  c74.m(DP, "apply-dark-post-full", 3, "Why is it optimal to post all remaining inventory in the dark pool?",
    "Dark execution has no impact or cost and removes inventory risk, so a larger post can only help", [
      ["Regulations require it", "It is an economic choice."],
      ["Posting more raises the fill rate", "The arrival rate does not depend on her size."],
      ["It hides her lit orders", "The lit orders are separate."],
    ]),

  // level 4
  c74.n(DP, "apply-dark-speed", 4,
    "The lit speed is $\\nu^{*} = -\\frac{h_2(t)}{k}q$. With $h_2 = -0.005$, $k = 0.001$ and $q = 4{,}000$, compute $\\nu^{*}$.",
    20000),
  c74.s(DP, "explain-dark-strategy", 4,
    "Describe the shape of the optimal lit-market speed when a dark pool is available, compared with Almgren–Chriss.",
    "Explains that early on she trades more slowly in the lit market than AC, hoping the dark pool fills her order at the mid without impact.",
    "Explains that if no match arrives, her lit speed later rises above AC’s to make sure the position is liquidated by $T$; once the dark order fills, inventory drops to zero."),
  c74.n(DP, "apply-dark-expected-fill", 4,
    "If the dark pool fills the entire remainder on the first match, with $\\lambda = 0.8$ per day over a $1$-day horizon, what is the probability of being filled in the dark before $T$? Give $4$ decimal places.",
    0.5507),
  c74.m(DP, "apply-dark-convexity", 4, "Figure 7.6 shows that with a dark pool, the lit-market inventory path before a dark fill:",
    "Can be convex or concave depending on parameters, unlike the always-convex AC path", [
      ["Is always linear", "It is generally curved."],
      ["Is identical to AC", "It differs because of the dark pool."],
      ["Is always increasing", "Inventory falls."],
    ]),

  // level 5
  c74.s(DP, "explain-dark-ode", 5,
    "With full execution in the dark, the DPE gives a Riccati ODE for $h_2$ with an extra term $-\\lambda h_2$. Explain where the term comes from.",
    "Explains that at rate $\\lambda$ a match arrives and the agent’s inventory drops from $q$ to $0$, so the value jumps from $x + qS + h_2q^2$ to $x + qS$ (sold at the mid).",
    "Concludes that the jump contributes $\\lambda[0 - h_2q^2]$, adding $-\\lambda h_2$ to the $q^2$ coefficient equation, which shifts the solution relative to AC."),
  c74.n(DP, "apply-dark-impact-saved", 5,
    "Selling $50{,}000$ shares in the lit market at TWAP over one day costs $k\\mathfrak{N}^2/T$ with $k = 2 \\times 10^{-6}$. If a dark fill of the whole order happens with probability $0.4$ (saving that cost entirely), what is the expected saving in dollars?",
    2000),
  c74.m(DP, "apply-dark-queue", 5, "Exercise E.7.2 assumes other orders are ahead of the agent’s in the dark pool queue. This makes:",
    "Her effective fill probability lower, since matches first fill orders ahead of hers", [
      ["Her fills more likely", "Orders ahead take liquidity first."],
      ["No difference", "Queue position affects fills."],
      ["Her order execute at a better price", "Price is the mid regardless."],
    ]),
  c74.n(DP, "apply-dark-partial-expected", 5,
    "Matches arrive at $\\lambda = 3$ per day with mean size $\\mathbb{E}[\\xi] = 5{,}000$ shares. If her posted size always exceeds each match, what volume does she expect to execute in the dark in half a day?",
    7500),

  // level 6
  c74.s(DP, "explain-dark-tradeoff", 6,
    "Why might access to a dark pool make the agent trade either faster or slower in the lit market than without one?",
    "Explains slower: the chance of a free midpoint fill makes waiting attractive, so she defers lit trading to save impact.",
    "Explains faster: a dark fill removes inventory risk only probabilistically, and as time runs out without a fill she must catch up; depending on $\\phi$, $\\lambda$ and $\\alpha$ the net effect on the lit speed can go either way."),
  c74.n(DP, "apply-dark-steady-speed", 6,
    "Far from $T$, $h_2$ approaches $-p$ with $p = \\frac{k}{2}\\left(\\sqrt{\\lambda^2 + 4\\phi/k} - \\lambda\\right)$, so the lit speed is $p\\,q/k$. With $\\phi = 0.01$, $\\lambda = 2$ and $k = 0.001$, what is the steady lit speed per share of inventory? Give $2$ decimal places.",
    2.32),
  c74.m(DP, "apply-dark-adverse", 6, "A realistic concern omitted from the basic dark-pool model is:",
    "Adverse selection: dark fills may occur mostly when the price is about to move against the agent", [
      ["Fees in the lit market", "Fees can be added; adverse selection is the deeper concern."],
      ["The midprice being Brownian", "That is assumed."],
      ["The agent’s inventory", "Inventory is tracked."],
    ]),
  c74.n(DP, "apply-ac-speed-compare", 6,
    "Without the dark pool ($\\lambda = 0$), the steady speed per share is $\\sqrt{\\phi/k}$. With $\\phi = 0.01$ and $k = 0.001$, compute it. Give $2$ decimal places.",
    3.16),

  // level 7
  c74.s(DP, "explain-dark-solution", 7,
    "Outline how the Riccati ODE $\\partial_t h_2 - \\phi - \\lambda h_2 + \\frac{1}{k}h_2^2 = 0$ is solved with terminal condition $h_2(T) = -\\alpha$.",
    "Identifies the constant solutions as the roots $\\zeta_{\\pm}$ of the quadratic, and writes $\\frac{dh_2}{(h_2 - \\zeta_{+})(h_2 - \\zeta_{-})} = \\frac{1}{k}dt$, integrating by partial fractions.",
    "Obtains $\\log\\frac{h_2 - \\zeta_{+}}{h_2 - \\zeta_{-}}$ linear in $t$, solves for $h_2(t)$ using $h_2(T) = -\\alpha$, and recovers the speed $\\nu^{*} = -h_2q/k$, which reduces to AC when $\\lambda = 0$."),
  c74.n(DP, "apply-dark-vs-lit-speed", 7,
    "Using the two steady speeds per share, $2.32$ with the dark pool and $3.16$ without, by what factor does the dark pool multiply the steady lit speed? Give $2$ decimal places.",
    0.73),
  c74.m(DP, "apply-dark-steady-interpretation", 7, "Far from the deadline, the lit speed with a dark pool is below the Almgren–Chriss speed. This is because:",
    "A possible costless dark fill makes holding inventory less costly in expectation, so it pays to defer impact-costly lit trading", [
      ["Dark fills create impact in the lit market", "Dark fills have no impact."],
      ["She is forbidden to trade in both venues", "She trades in both simultaneously."],
      ["The dark pool removes the running penalty", "The penalty applies until inventory is zero."],
    ]),
  c74.s(DP, "explain-dark-ethics", 7,
    "Dark pools are criticised for fragmenting liquidity. From the agent’s perspective, what are the benefits, and what are the costs to the lit market?",
    "Lists benefits: midpoint prices, no visible footprint, no temporary impact, reduced information leakage for large orders.",
    "Lists costs to the lit market: uninformed flow migrates to the dark, so lit liquidity providers face more toxic flow and widen spreads; price discovery relies on the lit market, which becomes thinner."),

  // level 8
  c74.n(DP, "apply-dark-time-value", 8,
    "A dark match of the full remainder arrives at rate $\\lambda$; the expected lit cost saved by a fill at time $t$ is proportional to the remaining inventory. If inventory under the strategy halves every $1/2$ day and $\\lambda = 1$ per day, what is the expected fraction of the initial inventory still held when the first match arrives, $\\int_0^\\infty \\lambda e^{-\\lambda t}2^{-2t}dt$? Give $4$ decimal places.",
    0.4191),
  c74.s(DP, "explain-dark-partial", 8,
    "Without the full-execution assumption, matches have random sizes $\\xi$ and only $\\min(y, \\xi)$ executes. How does this change the DPE and the solution?",
    "Explains that the jump term becomes $\\lambda\\,\\mathbb{E}[H(\\cdot, q - \\min(y, \\xi)) - H(\\cdot, q)]$, with $y$ the posted size, an expectation over the match size.",
    "Notes that the value is no longer exactly quadratic in $q$, so the solution is generally numerical, though posting the whole inventory remains optimal when dark trading is costless."),
  c74.m(DP, "apply-dark-information", 8, "If the dark pool’s fills are correlated with subsequent lit price moves (adverse selection), the optimal strategy should:",
    "Value dark fills less, posting less or only under certain conditions, and rely more on lit trading", [
      ["Post more in the dark", "Adverse selection makes dark fills costlier."],
      ["Ignore the correlation", "It changes the value of dark fills."],
      ["Stop lit trading", "Lit trading becomes relatively more attractive."],
    ]),
  c74.n(DP, "apply-dark-expected-saving-rate", 8,
    "A trader sells $100{,}000$ shares. Lit impact cost would be $\\$20{,}000$ if all were sold in the lit market. If on average $35\\%$ of the order fills in the dark at the mid, and lit cost scales with the square of lit volume, what is the expected lit cost? (Use $(1 - 0.35)^2 \\times 20{,}000$.)",
    8450),

  // level 9
  c74.s(DP, "transfer-venue-allocation", 9,
    "With several dark pools of different fill rates and toxicity, how would you allocate a large order across them and the lit market?",
    "Proposes estimating each pool’s fill rate and the adverse selection of its fills (price moves after fills), and allocating posts to pools with high fill rates and low toxicity.",
    "Notes the dynamic aspect: update estimates as fills occur (learning, as in bandit or censored-exploration methods), keep the lit schedule as the backstop to ensure completion, and avoid leaking information across venues."),
  c74.n(DP, "apply-multi-pool", 9,
    "Two independent dark pools fill the full remainder at rates $0.4$ and $0.6$ per day. What is the probability that at least one fills within one day? Give $4$ decimal places.",
    0.6321),
  c74.m(DP, "transfer-dark-gaming", 9, "Some traders send small orders to dark pools to detect large resting orders. To protect against this, a large seller can:",
    "Set a minimum execution quantity, so small probing orders cannot trade against her", [
      ["Post larger orders", "That increases exposure to probing."],
      ["Use only market orders", "That gives up the dark pool’s benefits."],
      ["Post at a worse price", "Dark orders execute at the mid."],
    ]),
  c74.s(DP, "transfer-dark-equilibrium", 9,
    "If all large sellers use the Section 7.4 strategy, how might dark-pool fill rates and lit prices respond?",
    "Argues that with more sellers posting in the dark, sell-side liquidity there grows relative to buyers, lowering each seller’s fill rate $\\lambda$.",
    "Argues that with sellers deferring lit trading, lit selling pressure is lower early and higher later (catch-up), which buyers and market makers may anticipate, so $\\lambda$ and impact parameters become endogenous."),

  // level 10
  c74.s(DP, "transfer-dark-model-extension", 10,
    "Extend the dark-pool model to include adverse selection of dark fills. Propose the modification and predict its effect on the optimal strategy.",
    "Proposes that on a dark fill the midprice jumps against the agent (e.g. $S \\to S - \\epsilon$ for a sell), so a fill of $y$ shares costs $y\\epsilon$ relative to the mid, entering the jump term of the DPE.",
    "Predicts that dark fills become less valuable, the lit speed moves toward AC, and if $\\epsilon$ is large enough she may post less than her full inventory or avoid the dark pool."),
  c74.n(DP, "apply-dark-break-even", 10,
    "A dark fill of $y = 20{,}000$ shares saves lit impact of $0.02$ dollars per share but is followed by an adverse price move of $\\epsilon$ per share on the filled shares. What $\\epsilon$ makes the dark fill break even, in cents?",
    2),
  c74.s(DP, "transfer-regulation", 10,
    "Regulators consider capping dark trading at a percentage of total volume. Using the chapter’s model, discuss the effect on large traders’ execution costs and on lit market quality.",
    "Argues that capping dark volume reduces $\\lambda$ for large traders, so they trade more in the lit market, raising expected impact costs and making schedules closer to AC.",
    "Argues the possible benefit: more uninformed flow returns to the lit market, improving price discovery and spreads, so the net effect depends on the toxicity and size of dark-pool flow."),
  c74.m(DP, "transfer-dark-assumption", 10, "Which assumption of Section 7.4 is most important for posting the full inventory in the dark pool to be optimal?",
    "Dark execution is costless and uninformative: no fees, no impact, no adverse selection", [
      ["The midprice is Brownian", "The result holds for other midprice models too."],
      ["Lit impact is linear", "Linearity gives closed forms but not the full-post result."],
      ["The horizon is one day", "The horizon length does not matter."],
    ]),
];

export const ahtExecutionMoItems: Item[] = [...execution, ...utility, ...limiter, ...dark];
