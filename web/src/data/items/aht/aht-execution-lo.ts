import type { Item } from "../../../lib/assessment/types";
import { chapter } from "./shared";

/** Ch. 8–9: execution with limit orders, with limit and market orders, and volume targeting (40 items per lesson). */

const LO = "execution-with-limit-orders";
const LM = "execution-with-limit-and-market-orders";
const TV = "targeting-volume";
const c82 = chapter("Ch. 8, Optimal Execution with Limit and Market Orders (§8.1–8.3)");
const c84 = chapter("Ch. 8, Optimal Execution with Limit and Market Orders (§8.4–8.5)");
const c9 = chapter("Ch. 9, Targeting Volume");

const limitOnly: Item[] = [
  // level 1
  c82.m(LO, "recall-why-lo", 1, "Why might an agent liquidate with limit orders instead of market orders?",
    "LOs are filled at prices better than the midprice, earning rather than paying the spread, at the cost of execution uncertainty", [
      ["LOs execute faster", "LOs wait for counterparties; MOs are immediate."],
      ["LOs have no execution risk", "They may never fill."],
      ["Exchanges forbid large MOs", "There is no such rule."],
    ]),
  c82.m(LO, "recall-depth", 1, "In Chapter 8, the agent’s control is:",
    "The depth $\\delta_t$ above the midprice at which she posts her sell LO", [
      ["Her trading speed", "That was the Chapter 6 control."],
      ["The size of each MO", "With LOs only, she controls depth."],
      ["The time of the auction", "There is no auction."],
    ]),
  c82.m(LO, "recall-fill", 1, "Her LO at depth $\\delta$ is filled when:",
    "A buy MO arrives that is large enough to walk the book up to $S_t + \\delta$", [
      ["Any MO arrives", "Only MOs that reach her price fill her."],
      ["The midprice rises above her price", "Fills come from MOs, not mid moves alone."],
      ["She cancels it", "Cancellation removes it without a fill."],
    ]),
  c82.m(LO, "recall-reservation", 1, "In the Chapter 8 solution, the quantity $S_t + \\frac{1}{\\kappa} + \\ldots$ has the interpretation of a:",
    "Reservation price: the price at which she is indifferent between selling one more share now and keeping it", [
      ["Market clearing price", "It is specific to her inventory and time."],
      ["Best bid", "It sits above the mid."],
      ["Benchmark VWAP", "It is a valuation, not a benchmark."],
    ]),

  // level 2
  c82.n(LO, "apply-fill-rate", 2,
    "Buy MOs arrive at $\\lambda = 50$ per minute and the fill probability is $e^{-\\kappa\\delta}$ with $\\kappa = 100$ per dollar. What is her fill rate per minute at $\\delta = 1$ cent? Give $2$ decimal places.",
    18.39),
  c82.n(LO, "apply-expected-time", 2,
    "At a fill rate of $18.39$ per minute, what is the expected time to the next fill, in seconds? Give $2$ decimal places.",
    3.26),
  c82.n(LO, "apply-asymptotic-depth", 2,
    "Without inventory or time pressure, the optimal depth is $1/\\kappa$. With $\\kappa = 100$ per dollar, what depth is that, in cents?",
    1),
  c82.m(LO, "recall-terminal", 2, "If inventory remains at $T$, the agent:",
    "Sells it with an MO, receiving $S_T - \\alpha Q_T$ per share, which includes walking the book", [
      ["Keeps it forever", "The programme must end with liquidation."],
      ["Posts deeper LOs", "Trading ends at $T$."],
      ["Sells at the midprice", "Terminal sales pay a penalty."],
    ]),

  // level 3
  c82.n(LO, "apply-lambda-tilde", 3,
    "The solution uses $\\tilde{\\lambda} = \\lambda e^{-1}$. With $\\lambda = 50$ per minute, compute $\\tilde{\\lambda}$. Give $3$ decimal places.",
    18.394),
  c82.n(LO, "apply-omega-q1", 3,
    "With $\\omega(t, q) = \\sum_{n=0}^{q}\\frac{\\tilde{\\lambda}^n}{n!}(T - t)^ne^{-\\kappa\\alpha(q - n)^2}$, compute $\\omega(t, 1)$ for $\\tilde{\\lambda} = 18.394$, $T - t = 1$ minute, $\\kappa = 100$ and $\\alpha = 0.001$. Give $3$ decimal places.",
    19.299),
  c82.m(LO, "apply-depth-inventory", 3, "As her remaining inventory $q$ rises (with time fixed), the optimal depth:",
    "Falls, so she posts closer to the midprice to sell faster", [
      ["Rises", "More inventory means more urgency."],
      ["Is unchanged", "Depth depends on inventory."],
      ["Becomes infinite", "She still wants to sell."],
    ]),
  c82.m(LO, "apply-depth-time", 3, "As $T$ approaches with inventory fixed, the optimal depth:",
    "Falls, to raise the chance of filling before the terminal penalty", [
      ["Rises", "Time pressure pushes posts closer."],
      ["Is constant", "Depth depends on time remaining."],
      ["Jumps to zero at a fixed time", "It decreases smoothly."],
    ]),

  // level 4
  c82.n(LO, "apply-depth-q1", 4,
    "The optimal depth is $\\delta^{*}(t, q) = \\frac{1}{\\kappa} + \\frac{1}{\\kappa}\\log\\frac{\\omega(t, q)}{\\omega(t, q - 1)}$, with $\\omega(t, 0) = 1$. With $\\kappa = 100$ and $\\omega(t, 1) = 19.299$, compute $\\delta^{*}(t, 1)$ in cents. Give $2$ decimal places.",
    3.96),
  c82.n(LO, "apply-omega-terminal", 4,
    "At $t = T$, $\\omega(T, q) = e^{-\\kappa\\alpha q^2}$. With $\\kappa = 100$, $\\alpha = 0.001$ and $q = 3$, compute $\\omega(T, 3)$. Give $4$ decimal places.",
    0.4066),
  c82.s(LO, "explain-log-transform", 4,
    "Why does the substitution $h = \\frac{1}{\\kappa}\\log\\omega$ simplify the DPE for limit-order liquidation?",
    "Explains that optimising over depth produces a term $\\frac{\\lambda}{\\kappa}e^{-1}e^{-\\kappa[h(q) - h(q-1)]}$, exponential in the difference of $h$.",
    "Shows that with $h = \\frac{1}{\\kappa}\\log\\omega$ this becomes $\\tilde{\\lambda}\\,\\omega(q - 1)/\\omega(q)$, so multiplying by $\\omega$ gives a linear system $\\partial_t\\omega(q) + \\tilde{\\lambda}\\,\\omega(q - 1) = 0$, solvable recursively in $q$."),
  c82.m(LO, "apply-negative-depth", 4, "When the formula gives a negative optimal depth, the book’s interpretation is:",
    "A signal to execute an MO, which the model with LOs alone cannot do", [
      ["Post a buy order", "She is selling."],
      ["The model has failed", "It signals a binding constraint."],
      ["Post at infinity", "That is the opposite."],
    ]),

  // level 5
  c82.n(LO, "apply-depth-terminal-q1", 5,
    "At $t = T$ (just before the deadline), $\\omega(T, 1) = e^{-\\kappa\\alpha}$ and $\\omega(T, 0) = 1$. With $\\kappa = 100$ and $\\alpha = 0.001$, what is $\\delta^{*}(T, 1)$ in cents? Give $1$ decimal place.",
    0.9),
  c82.s(LO, "explain-vs-twap", 5,
    "In the simulations, the LO strategy outperforms a TWAP strategy executed with MOs. What is the main reason?",
    "Explains that the LO strategy earns the depth $\\delta$ above the mid on each filled share, whereas TWAP with MOs pays the half-spread and impact on each share.",
    "Notes the caveat: the LO strategy carries execution risk and may need terminal MOs at a penalty, and the comparison ignores adverse selection of LO fills, which would erode its advantage."),
  c82.n(LO, "apply-expected-fills-window", 5,
    "With fill rate $\\lambda e^{-\\kappa\\delta} = 10$ per minute held constant, what is the probability of selling all $5$ shares within $1$ minute? Use $1 - \\sum_{n=0}^{4}e^{-10}\\frac{10^n}{n!}$. Give $4$ decimal places.",
    0.9707),
  c82.m(LO, "apply-asymptotic", 5, "Far from the terminal date, with no running penalty, the optimal depths:",
    "Approach $1/\\kappa$ plus terms that vanish, as the deadline’s influence fades", [
      ["Approach zero", "Without time pressure she posts deeper, not at the mid."],
      ["Grow without bound", "The trade-off with fill probability caps depth."],
      ["Become negative", "Negative depth arises from urgency."],
    ]),

  // level 6
  c82.s(LO, "explain-reservation-price", 6,
    "Interpret the optimal posting $S + \\delta^{*}$ as a reservation-price-plus-margin rule.",
    "Explains that $S + h(q) - h(q - 1)$ is the price at which she is indifferent between selling the marginal share now and keeping it (her reservation price for that share).",
    "Explains that she posts $1/\\kappa$ above that reservation price, the margin that optimally trades price against fill probability, as in the static market-making model."),
  c82.n(LO, "apply-exp-util-depth", 6,
    "With exponential utility $\\gamma$, the constant depth term $1/\\kappa$ becomes $\\frac{1}{\\gamma}\\log(1 + \\frac{\\gamma}{\\kappa})$. With $\\gamma = 20$ and $\\kappa = 100$ (per dollar), compute it in cents. Give $3$ decimal places.",
    0.912),
  c82.m(LO, "apply-utility-bias", 6, "Compared with the risk-neutral case, the utility-maximising agent’s constant depth term $\\frac{1}{\\gamma}\\log(1 + \\gamma/\\kappa)$ is:",
    "Smaller, so she posts closer to the midprice to reduce risk", [
      ["Larger", "$\\log(1 + x) < x$ for $x > 0$, so it is below $1/\\kappa$."],
      ["Identical", "It equals $1/\\kappa$ only as $\\gamma \\to 0$."],
      ["Negative", "It is positive for $\\gamma > 0$."],
    ]),
  c82.n(LO, "apply-running-penalty-effect", 6,
    "A running penalty $\\phi\\int Q_u^2du$ makes the agent more aggressive early. If her depth with $5$ shares left falls from $1.8$ to $1.2$ cents when $\\phi$ is added, by what factor does her fill rate rise, with $\\kappa = 100$ per dollar? Give $4$ decimal places.",
    1.8221),

  // level 7
  c82.s(LO, "explain-recursion", 7,
    "Derive the recursion for $\\omega(t, q)$ and explain why it gives a Poisson-type sum.",
    "From $\\partial_t\\omega(t, q) + \\tilde{\\lambda}\\,\\omega(t, q - 1) = 0$ with $\\omega(t, 0) = 1$ and $\\omega(T, q) = e^{-\\kappa\\alpha q^2}$, integrates backwards: $\\omega(t, q) = e^{-\\kappa\\alpha q^2} + \\tilde{\\lambda}\\int_t^T\\omega(s, q - 1)\\,ds$.",
    "Iterating gives $\\omega(t, q) = \\sum_{n=0}^{q}\\frac{(\\tilde{\\lambda}(T - t))^n}{n!}e^{-\\kappa\\alpha(q - n)^2}$, a Poisson-weighted sum over how many fills occur before $T$."),
  c82.n(LO, "apply-omega-q2", 7,
    "Compute $\\omega(t, 2) = e^{-4\\kappa\\alpha} + \\tilde{\\lambda}(T - t)e^{-\\kappa\\alpha} + \\frac{(\\tilde{\\lambda}(T - t))^2}{2}$ for $\\kappa\\alpha = 0.1$ and $\\tilde{\\lambda}(T - t) = 5$. Give $3$ decimal places.",
    17.695),
  c82.n(LO, "apply-depth-q2", 7,
    "With $\\omega(t, 2) = 17.695$ and $\\omega(t, 1) = e^{-0.1} + 5 = 5.905$, compute $\\delta^{*}(t, 2) = \\frac{1}{\\kappa}[1 + \\log(\\omega_2/\\omega_1)]$ for $\\kappa = 100$, in cents. Give $2$ decimal places.",
    2.1),
  c82.m(LO, "apply-equivalence-cara", 7, "Section 8.3 shows the CARA agent’s problem maps to the penalised risk-neutral one. As in Chapter 6, the mapping requires adjusting:",
    "The fill parameters ($\\lambda$ and the depth term) in addition to the penalty", [
      ["Only the volatility", "With LOs the depth term changes too."],
      ["Nothing", "The utility changes the depth formula."],
      ["The terminal date", "The horizon is unchanged."],
    ]),

  // level 8
  c82.s(LO, "explain-adverse-selection-missing", 8,
    "The Chapter 8 LO model assumes fills are independent of future price moves. Explain why this is optimistic and how adverse selection would change the strategy.",
    "Explains that sell LOs tend to fill when large buy MOs arrive, often before the price rises, so selling at $S + \\delta$ just before an up-move is less profitable than it looks.",
    "Predicts that with adverse selection she would post deeper to compensate (as in Chapter 10’s $\\delta \\ge 1/\\kappa + \\varepsilon$), or use MOs more when signals indicate toxic flow."),
  c82.n(LO, "apply-expected-revenue-premium", 8,
    "If she sells $5$ shares with LOs at an average depth of $2$ cents above the mid, versus MOs paying a half-spread of $0.5$ cents, what is the difference in revenue relative to the mid, in cents, for the $5$ shares?",
    12.5),
  c82.m(LO, "apply-terminal-penalty-role", 8, "In the LO problem, a larger terminal penalty $\\alpha$:",
    "Lowers depths, especially near $T$ and for large inventories, to avoid a costly terminal MO", [
      ["Raises depths", "A costly terminal MO pushes for earlier fills."],
      ["Has no effect far from $T$ only", "It affects depths throughout, most strongly near $T$."],
      ["Forces immediate liquidation", "She still uses LOs."],
    ]),
  c82.n(LO, "apply-fill-prob-before-T", 8,
    "With one share left at fill rate $\\lambda e^{-\\kappa\\delta} = 0.5$ per second held constant, what is the probability of a fill in the last $3$ seconds? Give $4$ decimal places.",
    0.7769),

  // level 9
  c82.s(LO, "transfer-schedule-tracking", 9,
    "An agent must also keep her inventory near a TWAP schedule while using LOs. How would you modify the objective, and what behaviour results?",
    "Proposes a running penalty $\\phi\\int(Q_u - \\bar{q}_u)^2du$ around the schedule $\\bar{q}_u$, rather than around zero.",
    "Predicts she posts closer to the mid (or uses MOs if allowed) when behind schedule and deeper when ahead, so her inventory tracks the schedule while still earning depth."),
  c82.n(LO, "apply-depth-difference", 9,
    "With $\\kappa = 100$, the optimal depths for $q = 1$ and $q = 2$ are $\\frac{1}{\\kappa}[1 + \\log(\\omega_q/\\omega_{q-1})]$. With $\\omega_0 = 1$, $\\omega_1 = 5.905$ and $\\omega_2 = 17.695$, what is $\\delta^{*}(1) - \\delta^{*}(2)$ in cents? Give $2$ decimal places.",
    0.68),
  c82.m(LO, "transfer-fill-model", 9, "Using a block-shaped LOB and exponentially distributed MO sizes with mean $\\eta$ and block height $\\theta$ shares per dollar, the fill probability at depth $\\delta$ becomes $e^{-\\kappa\\delta}$ with:",
    "$\\kappa = \\theta/\\eta$: deeper books or smaller MOs make fills decay faster with depth", [
      ["$\\kappa = \\eta/\\theta$", "Larger MOs reach further, lowering $\\kappa$."],
      ["$\\kappa = \\eta\\theta$", "The ratio, not the product, matters."],
      ["$\\kappa = 1$", "It depends on book shape and MO sizes."],
    ]),
  c82.s(LO, "transfer-competition-queue", 9,
    "The model ignores queue position: her LO at a given price fills as soon as an MO reaches it. How would queue position change the analysis?",
    "Explains that at a price level other LOs may be ahead of hers, so an MO reaching her price may be absorbed by them first, lowering her fill probability below $e^{-\\kappa\\delta}$.",
    "Notes the consequences: the fill rate depends on her queue position and on cancellations ahead of her, adding a state variable; posting at a new price level (front of queue) versus joining a long queue becomes a decision."),

  // level 10
  c82.s(LO, "transfer-lo-vs-mo-cost", 10,
    "A client asks whether an LO-only liquidation is always cheaper than an MO-based schedule. Give a balanced answer.",
    "Explains that LOs earn the spread and avoid walking the book when fills arrive at expected rates, so in calm markets the expected cost is lower.",
    "Explains the risks: non-execution forces costly terminal sales, fills are adversely selected (more likely before adverse moves), and in trending markets LOs fill on the wrong side; the best approach mixes LOs and MOs (Section 8.4)."),
  c82.n(LO, "apply-full-omega", 10,
    "Compute $\\omega(t, 3)$ for $\\kappa\\alpha = 0.1$ and $x = \\tilde{\\lambda}(T - t) = 5$: $e^{-0.9} + xe^{-0.4} + \\frac{x^2}{2}e^{-0.1} + \\frac{x^3}{6}$. Give $3$ decimal places.",
    35.902),
  c82.s(LO, "transfer-calibration", 10,
    "How would you calibrate $\\lambda$, $\\kappa$ and $\\alpha$ for an LO liquidation algorithm in a particular stock, and how would you check the model before deploying it?",
    "Estimates $\\lambda$ from MO arrival rates by time of day, $\\kappa$ from the empirical fill fraction versus depth (Figure 8.1), and $\\alpha$ from the cost of walking the book for terminal MOs.",
    "Checks with backtests on message data that simulate queue position and adverse selection, comparing realised revenue and completion rates with simpler strategies, and monitors live fill rates against predictions."),
  c82.m(LO, "transfer-depth-floor", 10, "Since depth cannot be below zero in practice (posting below the mid would cross the spread), how should the strategy be modified when the formula gives $\\delta^{*} < 0$?",
    "Either post at the best quote and accept the constraint, or allow MOs and solve the QVI of Section 8.4", [
      ["Post a buy LO", "She is liquidating."],
      ["Stop trading", "She still needs to sell."],
      ["Ignore the formula", "The formula signals urgency that should be acted on."],
    ]),
];

const limitMarket: Item[] = [
  // level 1
  c84.m(LM, "recall-lm-choice", 1, "In Section 8.4, at each instant the agent can:",
    "Post an LO at a chosen depth, or execute an MO", [
      ["Only post LOs", "MOs are added in Section 8.4."],
      ["Only trade continuously at a speed", "That is Chapter 6."],
      ["Trade only at $T$", "She trades throughout."],
    ]),
  c84.m(LM, "recall-qvi", 1, "Mixing LOs with discretionary MOs leads to:",
    "A quasi-variational inequality", [
      ["A linear PDE", "The MO choice is an impulse, giving a QVI."],
      ["An ODE without optimisation", "There are two optimisations: depth and MO timing."],
      ["The Black–Scholes equation", "This is an execution problem."],
    ]),
  c84.m(LM, "recall-mo-price", 1, "Her MO sells one share at:",
    "The best bid, $S_t - \\Delta/2$", [
      ["The midprice", "MOs cross half the spread."],
      ["The best ask", "A sell MO hits the bid."],
      ["$S_t + \\delta$", "That is her LO price."],
    ]),
  c84.m(LM, "recall-boundary", 1, "The solution partitions inventory–time space into regions where she:",
    "Posts LOs, or executes MOs immediately", [
      ["Buys or sells", "She only sells."],
      ["Uses the dark pool or the lit market", "Dark pools are Chapter 7."],
      ["Trades or sleeps", "She is always posting when not crossing."],
    ]),

  // level 2
  c84.n(LM, "apply-mo-revenue", 2,
    "With midprice \\$30.00 and spread $2$ cents, what does she receive per share from a sell MO, in dollars?",
    29.99),
  c84.n(LM, "apply-mo-condition", 2,
    "She executes an MO when $h(t, q - 1) - h(t, q) \\ge \\Delta/2$. With $\\Delta = 2$ cents, what is the threshold for $h(q - 1) - h(q)$, in cents?",
    1),
  c84.n(LM, "apply-depth-at-boundary", 2,
    "The LO depth is $\\delta^{*} = \\frac{1}{\\kappa} - [h(q - 1) - h(q)]$. At the MO threshold $h(q - 1) - h(q) = \\Delta/2$, with $\\kappa = 100$ and $\\Delta = 2$ cents, what is $\\delta^{*}$ in cents?",
    0),
  c84.m(LM, "recall-penalty-urgency", 2, "In the LO–MO problem, the running penalty $\\phi$ mainly controls:",
    "How quickly she is willing to cross the spread rather than wait for LO fills", [
      ["The spread", "The spread is exogenous."],
      ["The MO arrival rate", "That is $\\lambda$, set by the market."],
      ["The tick size", "Ticks are fixed."],
    ]),

  // level 3
  c84.n(LM, "apply-mo-value", 3,
    "With $H = x + qS + h(t, q)$, an MO changes the value by $-\\frac{\\Delta}{2} + h(t, q - 1) - h(t, q)$. With $\\Delta = 2$ cents, $h(q - 1) = -0.004$ and $h(q) = -0.016$ (dollars), what is the change in cents?",
    0.2),
  c84.m(LM, "apply-mo-or-not", 3, "Given that value change of $+0.2$ cents, she should:",
    "Execute the MO, since it raises her value", [
      ["Post an LO instead", "Crossing is better here."],
      ["Do nothing", "The MO improves her value."],
      ["Buy a share", "She is liquidating."],
    ]),
  c84.n(LM, "apply-depth-generic", 3,
    "With $\\kappa = 100$ per dollar and $h(q - 1) - h(q) = 0.004$, what is the optimal LO depth $\\frac{1}{\\kappa} - [h(q - 1) - h(q)]$, in cents?",
    0.6),
  c84.m(LM, "apply-time-mo", 3, "Holding inventory fixed, the MO region expands as $T$ approaches because:",
    "Less time remains for LO fills, so the value of holding inventory falls and crossing becomes worthwhile", [
      ["The spread narrows at $T$", "The spread is constant in the model."],
      ["Volatility rises", "Volatility is constant."],
      ["LOs are forbidden near $T$", "They are allowed until $T$."],
    ]),

  // level 4
  c84.s(LM, "explain-qvi-structure", 4,
    "Write the QVI for liquidation with LOs and MOs and interpret both parts.",
    "Writes $\\max\\{\\partial_t H + \\tfrac{1}{2}\\sigma^2\\partial_{SS}H - \\phi q^2 + \\lambda\\sup_\\delta e^{-\\kappa\\delta}[H(x + S + \\delta, q - 1) - H];\\; H(x + S - \\Delta/2, q - 1) - H\\} = 0$.",
    "Interprets the first part as continuing to post an LO (with diffusion, penalty and fill terms) and the second as an immediate MO; the larger is zero, and the MO region is where the second binds."),
  c84.n(LM, "apply-mo-count", 4,
    "In Figure 8.6, inventory $10$ is in the MO region, and she executes MOs until reaching inventory $6$, which is in the LO region. How many MOs does she send?",
    4),
  c84.m(LM, "apply-small-phi", 4, "If the running penalty $\\phi$ is very small, the analysis of Section 8.4 shows that:",
    "She never executes an MO before $T$, posting LOs until a final MO an instant before maturity if needed", [
      ["She always executes MOs immediately", "That happens when $\\phi$ is large."],
      ["She never posts LOs", "LOs are attractive when urgency is low."],
      ["The problem has no solution", "It has a solution in both regimes."],
    ]),
  c84.n(LM, "apply-q1-mo-condition", 4,
    "For one share, the book shows that it is always optimal to wait if the continuation value exceeds immediate execution: $g_1(t) \\ge e^{-\\kappa\\Delta/2}$. With $\\kappa = 100$ and $\\Delta = 2$ cents, compute $e^{-\\kappa\\Delta/2}$. Give $4$ decimal places.",
    0.3679),

  // level 5
  c84.s(LM, "explain-two-regimes", 5,
    "The one- and two-share cases of Section 8.4 have two parameter regimes. Describe them and their financial intuition.",
    "Describes the low-urgency regime: when $\\phi$ is small she prefers LOs throughout and only crosses (if at all) right before maturity.",
    "Describes the high-urgency regime: when $\\phi$ is large, holding inventory is so costly that she crosses immediately, or after a critical time, rather than wait for fills."),
  c84.n(LM, "apply-revenue-mix", 5,
    "She sells $6$ shares by LOs at an average depth of $1.5$ cents and $4$ shares by MOs at the bid, with a $2$-cent spread. What is her average price relative to the mid, in cents?",
    0.5),
  c84.m(LM, "apply-depth-jump", 5, "Right after an MO execution reduces inventory, her LO depth:",
    "Jumps up, since with less inventory she is less urgent and can post deeper", [
      ["Jumps down", "Less inventory reduces urgency."],
      ["Stays the same", "Depth depends on inventory."],
      ["Becomes zero", "Zero depth would indicate high urgency."],
    ]),
  c84.n(LM, "apply-critical-time", 5,
    "For two shares, the critical time $T_2$ after which she crosses is found from the continuation equation. If $T = 60$ seconds and $T_2 = 45$ seconds, for how many seconds at the end is the MO region active for two shares?",
    15),

  // level 6
  c84.s(LM, "explain-schedule-targeting", 6,
    "Section 8.5 adds a target schedule. Why would a desk want an LO–MO strategy to track a schedule, and how is it modelled?",
    "Explains that clients often benchmark against TWAP or VWAP and want execution risk controlled relative to a schedule, not only total completion.",
    "Models it with a running penalty $\\phi\\int(Q_u - \\bar{q}_u)^2du$, so being behind schedule pushes toward MOs and lower depths, and being ahead toward deeper LOs."),
  c84.n(LM, "apply-behind-schedule", 6,
    "Under a TWAP schedule for $10$ shares over $60$ seconds, how many shares should remain after $36$ seconds?",
    4),
  c84.m(LM, "apply-mo-region-shape", 6, "In the optimal strategy, the MO region in inventory–time space lies:",
    "At high inventory and late time, where urgency is highest", [
      ["At low inventory early", "That is where she is least urgent."],
      ["At all inventories at $t = 0$", "Early on she prefers LOs unless very urgent."],
      ["Nowhere", "MOs are used when urgency is high."],
    ]),
  c84.n(LM, "apply-depth-shift", 6,
    "If an extra unit of inventory lowers $h(q) - h(q - 1)$ by $0.3$ cents, by how many cents does the optimal LO depth fall?",
    0.3),

  // level 7
  c84.s(LM, "explain-numerical", 7,
    "The book solves the QVI numerically with an explicit finite-difference scheme. Describe the scheme.",
    "Describes stepping backwards in time on a grid of inventories, computing the continuation value from the LO part (with the optimal depth formula) one step earlier.",
    "Describes the obstacle step: at each grid point, compare continuation with the immediate MO value $H(q - 1) + S - \\Delta/2$ and take the maximum, which identifies the MO region; the time step must be small enough for stability."),
  c84.n(LM, "apply-w-transform", 7,
    "With $h = \\frac{1}{\\kappa}\\log w$, the MO condition $h(q - 1) - h(q) \\ge \\Delta/2$ becomes $w(q) \\le w(q - 1)e^{-\\kappa\\Delta/2}$. With $w(q - 1) = 2.5$, $\\kappa = 100$ and $\\Delta = 2$ cents, what is the threshold for $w(q)$? Give $4$ decimal places.",
    0.9197),
  c84.m(LM, "apply-terminal-cross", 7, "Why can her value just before $T$ differ from the terminal condition, in the LO–MO model?",
    "She can execute an MO an instant before $T$, paying only the half-spread, which may beat the terminal penalty $\\alpha q$", [
      ["The value is always continuous at $T$", "The MO option creates a jump in effective terminal value."],
      ["Prices jump at $T$", "Prices are continuous."],
      ["LOs fill with certainty at $T$", "Fills are random."],
    ]),
  c84.s(LM, "explain-mo-vs-lo-economics", 7,
    "Explain the economic trade-off that determines when she crosses the spread.",
    "Explains that crossing costs half the spread plus forgoes the depth premium, while waiting risks the running penalty and non-execution near $T$.",
    "Concludes that she crosses when the marginal value of reducing inventory by one share now exceeds that cost, which happens when inventory is high relative to time remaining."),

  // level 8
  c84.n(LM, "apply-cost-compare", 8,
    "Selling $10$ shares: strategy A uses only MOs (half-spread $1$ cent each); strategy B sells $7$ by LOs at average depth $1.2$ cents and $3$ by MOs. What is B’s total advantage over A, in cents?",
    15.4),
  c84.s(LM, "explain-impulse-control", 8,
    "Why is the MO decision an impulse control rather than a continuous control?",
    "Explains that an MO changes inventory and cash by discrete amounts instantaneously, rather than at a rate, so it is modelled as a jump in the state chosen at stopping times.",
    "Notes that impulse controls lead to QVIs, where the intervention operator compares the value after the jump with the continuation value."),
  c84.m(LM, "apply-adverse-lm", 8, "If LO fills were adversely selected, the MO region would likely:",
    "Expand, since LOs become less attractive relative to crossing", [
      ["Shrink", "Worse LOs make MOs relatively better."],
      ["Disappear", "MOs remain useful."],
      ["Be unaffected", "LO profitability affects the trade-off."],
    ]),
  c84.n(LM, "apply-expected-lo-fills", 8,
    "With $40$ seconds remaining, fill rate $0.2$ per second at her depth, and $5$ shares left, what is the expected number of LO fills (ignoring that fills stop at zero inventory)?",
    8),

  // level 9
  c84.s(LM, "transfer-urgency-calibration", 9,
    "How should a desk choose $\\phi$ in the LO–MO algorithm for a client order?",
    "Proposes linking $\\phi$ to the client’s risk tolerance (e.g. $\\phi = \\tfrac{1}{2}\\gamma\\sigma^2$) or to a target completion profile, choosing it so that the expected share executed by MOs or the expected completion time matches the client’s urgency.",
    "Suggests simulating the strategy for several $\\phi$ values to show the trade-off between average price (relative to the mid) and the dispersion of completion times or tracking error, and letting the client pick."),
  c84.n(LM, "apply-tracking-error", 9,
    "With a schedule penalty $\\phi(q - \\bar{q})^2$ and $\\phi = 10^{-4}$ per second, being $3$ shares behind schedule for $10$ seconds costs how much in penalty units?",
    0.009),
  c84.m(LM, "transfer-hidden", 9, "To reduce the information conveyed by her MOs, the agent could:",
    "Use IOC or midpoint-pegged orders instead of plain MOs when available", [
      ["Send larger MOs", "That reveals more."],
      ["Post LOs further from the mid", "That does not hide her MOs."],
      ["Stop trading", "She must liquidate."],
    ]),
  c84.s(LM, "transfer-multi-level", 9,
    "The model lets the agent post one unit at one depth. How would allowing multiple LOs at several depths change the problem?",
    "Explains that she could ladder orders across depths, so fills come at different prices and the fill-intensity structure becomes a sum over posts.",
    "Notes that the control space grows (a vector of depths and sizes), queue positions matter, and the DPE’s sup becomes multidimensional; in practice the optimum often concentrates near the single-depth solution plus deeper backups."),

  // level 10
  c84.s(LM, "transfer-design", 10,
    "Design a production execution algorithm based on Section 8.4. Identify the state variables it must track, the controls, and the safeguards needed.",
    "Tracks time, inventory, midprice, spread and (ideally) imbalance or flow signals, with controls being LO depth and the decision to cross, from a precomputed policy table.",
    "Adds safeguards: price limits, maximum participation rates, cancellation and repost logic, handling partial fills and queue position, and recalibration when spreads or fill rates change."),
  c84.n(LM, "apply-mo-share", 10,
    "Simulations show that, on average, $30\\%$ of shares are sold by MOs at a cost of $1$ cent below the mid, and $70\\%$ by LOs at $1.4$ cents above the mid. What is the average price relative to the mid, in cents?",
    0.68),
  c84.s(LM, "transfer-regime-change", 10,
    "Spreads widen suddenly mid-execution. How should the LO–MO strategy react, and what does the model imply?",
    "Explains that a wider spread raises the cost of MOs ($\\Delta/2$), so the MO region shrinks and she posts LOs more; fill rates and $\\kappa$ may also change.",
    "Notes the model implication: the policy should be recomputed with the new $\\Delta$ and fill parameters, and if wide spreads signal information, adverse selection risk argues for caution in posting close to the mid."),
  c84.m(LM, "transfer-objective", 10, "Which objective change would make the LO–MO strategy use MOs more often, all else equal?",
    "Raising the running penalty $\\phi$ or the terminal penalty $\\alpha$", [
      ["Lowering $\\phi$", "That makes waiting cheaper."],
      ["Raising the fill rate $\\lambda$", "Faster LO fills make MOs less needed."],
      ["Widening the spread", "Wider spreads make MOs costlier."],
    ]),
];

const volume: Item[] = [
  // level 1
  c9.m(TV, "recall-vwap", 1, "The VWAP of a trading period is:",
    "$\\sum_i p_iv_i/\\sum_i v_i$, the volume-weighted average of trade prices", [
      ["The average of the high and low prices", "That is not volume-weighted."],
      ["The time-weighted average price", "That is TWAP."],
      ["The closing price", "VWAP uses all trades."],
    ]),
  c9.m(TV, "recall-pov", 1, "A percentage-of-volume (POV) strategy targets:",
    "Trading a fixed fraction $\\rho$ of the market’s rate of trading", [
      ["A fixed number of shares per minute", "That is TWAP."],
      ["The closing price", "That is a closing-auction benchmark."],
      ["Zero market impact", "Impact is still present."],
    ]),
  c9.m(TV, "recall-pocv", 1, "Percentage of cumulative volume (POCV) targets:",
    "A fraction of the total volume traded over the horizon, which is unknown in advance", [
      ["A fraction of the current trading rate", "That is POV."],
      ["The VWAP price", "POCV is a quantity target."],
      ["A fraction of the shares outstanding", "It is relative to traded volume."],
    ]),
  c9.m(TV, "recall-why-vwap", 1, "Investors target VWAP because:",
    "Trading in proportion to market volume means trading when liquidity is greatest, and VWAP is a common benchmark for execution quality", [
      ["VWAP is always lower than the arrival price", "VWAP can be above or below."],
      ["It eliminates price risk", "Price risk remains."],
      ["Regulators require it", "It is a convention."],
    ]),

  // level 2
  c9.n(TV, "apply-vwap", 2,
    "Three trades: $100$ shares at \\$10.00, $300$ at \\$10.10 and $600$ at \\$10.05. Compute the VWAP. Give $2$ decimal places.",
    10.06),
  c9.n(TV, "apply-pov-speed", 2,
    "The market trades $5{,}000$ shares per minute and the POV target is $\\rho = 10\\%$. At what speed should she trade?",
    500),
  c9.n(TV, "apply-pocv-target", 2,
    "She targets $\\rho = 5\\%$ of cumulative volume. If the market trades $2.4$ million shares over the horizon, how many shares does she aim to trade?",
    120000),
  c9.m(TV, "recall-pov-vwap", 2, "Why does a POV strategy tend to achieve an average price close to VWAP?",
    "Trading a constant fraction of the market at every instant gives her the same volume weights as the market", [
      ["Because she trades at the midprice", "She pays impact and spread."],
      ["Because VWAP is constant", "VWAP depends on the path."],
      ["Because she trades only at the close", "POV trades throughout."],
    ]),

  // level 3
  c9.n(TV, "apply-own-impact-pov", 3,
    "Her POV rate is $\\rho = 0.1$ of the market’s rate including her own trades. If others trade $4{,}500$ shares per minute, what rate $\\nu$ satisfies $\\nu = 0.1(4{,}500 + \\nu)$?",
    500),
  c9.n(TV, "apply-vwap-shortfall", 3,
    "She sells at an average price of \\$50.02 while the period VWAP is \\$50.05. What is her shortfall versus VWAP, in cents per share?",
    3),
  c9.m(TV, "apply-pov-completion", 3, "A pure POV strategy may fail to complete a liquidation because:",
    "Market volume over the horizon may be lower than expected, so $\\rho$ times the volume is less than her order", [
      ["She always trades too fast", "POV adapts to volume."],
      ["POV ignores time", "It is the volume that is uncertain."],
      ["Prices may rise", "Completion depends on volume, not price."],
    ]),
  c9.m(TV, "apply-competing", 3, "The performance criterion of Section 9.2 penalises deviations from $\\rho\\mu_t$ and leftover inventory at $T$. These objectives:",
    "Compete unless expected market volume over the horizon exactly matches her order divided by $\\rho$", [
      ["Always agree", "Tracking the rate need not complete the order."],
      ["Are identical", "One is a rate target, the other a quantity target."],
      ["Are irrelevant", "They define the strategy."],
    ]),

  // level 4
  c9.n(TV, "apply-double-limit", 4,
    "In the limit $\\phi, \\alpha \\to \\infty$, the speed is $\\nu^{*}_t = \\rho\\left[\\mu_t - \\frac{1}{T - t}\\int_t^T\\mathbb{E}[\\mu_u]du\\right] + \\frac{Q_t}{T - t}$. With $\\rho = 0.1$, $\\mu_t = 5{,}000$, expected average future rate $4{,}000$ per minute, $Q_t = 30{,}000$ and $T - t = 60$ minutes, compute $\\nu^{*}$.",
    600),
  c9.n(TV, "apply-ou-volume-mean", 4,
    "Market trading rate mean-reverts: $\\mathbb{E}[\\mu_u] = \\bar{\\mu} + (\\mu_t - \\bar{\\mu})e^{-\\kappa(u - t)}$. With $\\bar{\\mu} = 4{,}000$, $\\mu_t = 6{,}000$ and $\\kappa = 0.1$ per minute, what is the expected rate in $10$ minutes? Give $1$ decimal place.",
    4735.8),
  c9.s(TV, "explain-decomposition", 4,
    "The optimal POV speed decomposes into a TWAP-like term and a correction. Interpret each.",
    "Interprets $Q_t/(T - t)$ as the TWAP-like term that guarantees completion by $T$.",
    "Interprets the correction $\\rho[\\mu_t - \\text{average expected future rate}]$: trade more when the market is currently busier than expected on average, and less when quieter, so her trades follow market volume."),
  c9.m(TV, "apply-pov-end", 4, "Near the end of the horizon, the POV-tracking strategy:",
    "Ignores the POV target and focuses on completing the order", [
      ["Tracks POV most tightly", "Completion dominates near $T$."],
      ["Stops trading", "She must complete."],
      ["Doubles $\\rho$", "The correction vanishes near $T$."],
    ]),

  // level 5
  c9.n(TV, "apply-average-expected", 5,
    "With the OU mean above, the average of $\\mathbb{E}[\\mu_u]$ over $[t, T]$ is $\\bar{\\mu} + (\\mu_t - \\bar{\\mu})\\frac{1 - e^{-\\kappa(T - t)}}{\\kappa(T - t)}$. With $\\bar{\\mu} = 4{,}000$, $\\mu_t = 6{,}000$, $\\kappa = 0.1$ and $T - t = 60$, compute it. Give $1$ decimal place.",
    4332.5),
  c9.s(TV, "explain-vwap-pov-link", 5,
    "Explain why minimising the deviation of her trading rate from $\\rho$ times the market rate makes her average price close to VWAP.",
    "Explains that if $\\nu_t = \\rho\\mu_t$ exactly, her shares at each instant are a fixed fraction of market shares, so her volume-weighted price equals the market’s VWAP (apart from her impact).",
    "Notes the deviations: impact, the completion term near $T$, and volume uncertainty make her price differ from VWAP; the penalty $\\phi$ controls how tightly she tracks."),
  c9.n(TV, "apply-compound-volume", 5,
    "Volume arrives as a compound Poisson process: trades at rate $\\lambda = 3$ per second with mean size $200$ shares. What is the expected market volume over $10$ minutes?",
    360000),
  c9.m(TV, "apply-u-shape", 5, "The trading intensity in Figure 9.2 follows a U-shape. A volume-targeting strategy therefore:",
    "Trades most at the open and close and least at midday", [
      ["Trades evenly", "That is TWAP."],
      ["Trades most at midday", "Midday is quietest."],
      ["Ignores the pattern", "It follows market volume."],
    ]),

  // level 6
  c9.s(TV, "explain-feynman-kac", 6,
    "The book derives a probabilistic representation of the solution using Feynman–Kac. What does the representation say about the optimal speed?",
    "States that the PDE coefficient multiplying $q$ is an expectation of future market volume over the remaining horizon, computed by Feynman–Kac from the linear PDE it satisfies.",
    "Concludes that the speed depends on the current market rate relative to the expected total remaining volume: she trades a fraction of current volume adjusted by how much volume she expects to come."),
  c9.n(TV, "apply-pocv-speed", 6,
    "POCV: she aims for $\\rho = 4\\%$ of the volume remaining in the horizon. Expected remaining market volume is $1.5$ million shares, and she has already traded her share of past volume. How many shares does she still plan to trade?",
    60000),
  c9.m(TV, "apply-include-own", 6, "Section 9.4 includes the agent’s own trades in the market volume. The main effect is:",
    "Her target rises with her own trading, so she must scale her speed by $\\frac{1}{1 - \\rho}$ to hit the fraction of total volume", [
      ["No change", "Her trades are part of total volume."],
      ["She trades less", "Including herself raises the total she targets."],
      ["It removes impact", "Impact remains."],
    ]),
  c9.n(TV, "apply-scaled-rate", 6,
    "If others trade at $\\mu = 9{,}000$ shares per minute and she wants $\\rho = 10\\%$ of total volume including herself, her rate is $\\frac{\\rho}{1 - \\rho}\\mu$. Compute it.",
    1000),

  // level 7
  c9.s(TV, "explain-utility-volume", 7,
    "Section 9.5 adds exponential utility to volume targeting. How does risk aversion change the strategy relative to the risk-neutral POV problem?",
    "Explains that price risk from holding inventory adds an effective running penalty $\\tfrac{1}{2}\\gamma\\sigma^2q^2$, pushing her to trade faster early.",
    "Notes that the strategy then front-loads relative to the volume-tracking target, trading more than $\\rho$ times the market early, with the degree set by $\\gamma\\sigma^2$ relative to impact and the tracking penalty."),
  c9.n(TV, "apply-vwap-cost", 7,
    "Her POV execution achieves an average price \\$0.012 worse than VWAP on $200{,}000$ shares, while a TWAP alternative would have been \\$0.020 worse. How much does POV save in dollars?",
    1600),
  c9.m(TV, "apply-mean-reversion-volume", 7, "When the market rate $\\mu_t$ is far above its mean, the POV strategy with a mean-reverting volume model:",
    "Trades more now, expecting volume to fall back, while keeping completion on track", [
      ["Trades less now", "High current volume offers cheap liquidity."],
      ["Ignores the current rate", "The current rate drives the correction."],
      ["Stops trading until volume reverts", "She trades with the volume."],
    ]),
  c9.n(TV, "apply-correction-size", 7,
    "With $\\rho = 0.08$, current rate $7{,}000$ and expected average future rate $5{,}000$ shares per minute, what is the POV correction term $\\rho(\\mu_t - \\text{average})$?",
    160),

  // level 8
  c9.s(TV, "explain-impact-others", 8,
    "In Section 9.4, other traders’ order flow also affects the midprice. How does this interact with the volume-targeting strategy?",
    "Explains that other traders’ volume pushes prices (permanent impact), so periods of high volume may come with price trends that affect her revenue.",
    "Notes the strategy adjusts not only to track volume but also to the expected price impact of others’ trading, similar to the order-flow adjustment of Chapter 7: for a seller, trading with sell-heavy flow is attractive."),
  c9.n(TV, "apply-vwap-dev", 8,
    "Over two periods the market trades $30{,}000$ shares at \\$20.00 and $10{,}000$ at \\$20.20. She trades $2{,}000$ in the first and $2{,}000$ in the second. What is her average price minus VWAP, in cents?",
    5),
  c9.m(TV, "apply-vwap-gaming", 8, "A broker guaranteeing VWAP to clients has an incentive problem because:",
    "Her own trading moves prices and so the VWAP benchmark, so a large order can partly set its own benchmark", [
      ["VWAP cannot be computed", "It is easily computed."],
      ["Clients always beat VWAP", "Beating VWAP is not guaranteed."],
      ["VWAP ignores volume", "It weights by volume."],
    ]),
  c9.n(TV, "apply-forecast-adjust", 8,
    "Halfway through the day she has traded $60{,}000$ of a $150{,}000$-share order. The updated forecast of remaining market volume is $1.8$ million shares. What POCV fraction should she target for the rest of the day?",
    0.05),

  // level 9
  c9.s(TV, "transfer-volume-forecast", 9,
    "A volume-targeting algorithm depends on forecasts of market volume. Describe how you would build and update the forecast intraday.",
    "Proposes a daily total from persistence (AR models of log volume) and conditioning information (volatility, events), split by an intraday profile (U-shape), possibly with functional data methods.",
    "Proposes updating during the day: Bayesian or regression updates of the total as cumulative volume deviates from forecast, and real-time estimation of the current rate (e.g. exponential smoothing), feeding the strategy’s expected future volume."),
  c9.n(TV, "apply-pov-vs-vwap-risk", 9,
    "If daily volume is lognormal with $\\sigma = 0.3$ and she follows POV at $\\rho = 0.05$, what is the standard deviation of the log of her total executed shares?",
    0.3),
  c9.m(TV, "transfer-benchmark-choice", 9, "A portfolio manager with information that decays quickly should prefer which benchmark?",
    "Arrival price (implementation shortfall), since delay costs alpha", [
      ["VWAP", "VWAP encourages spreading trades over the day."],
      ["Closing price", "That waits until the close."],
      ["TWAP", "It also spreads trades."],
    ]),
  c9.s(TV, "transfer-pov-signalling", 9,
    "A POV strategy that trades exactly $10\\%$ of every print is easy to detect. How can others exploit it, and how would you disguise it?",
    "Explains that predictable responses to volume let others infer her presence and direction, then trade ahead (e.g. buy before her expected purchases after volume spikes).",
    "Proposes randomising participation around $\\rho$, varying venues and order types, using LOs as well as MOs, and imposing price limits."),

  // level 10
  c9.s(TV, "transfer-compare-strategies", 10,
    "Compare TWAP, POV and Almgren–Chriss (implementation shortfall) execution for a large order. When would you recommend each?",
    "Explains that TWAP is simple and predictable, good when volume is stable; POV follows liquidity and tracks VWAP, good when the benchmark is VWAP or volume is uncertain; AC front-loads to reduce price risk, good when the benchmark is the arrival price and information decays.",
    "Notes the trade-offs: POV may not complete; AC ignores intraday volume patterns unless extended; TWAP ignores both; hybrid strategies combine them, with penalties for tracking and completion."),
  c9.n(TV, "apply-pov-completion-prob", 10,
    "With $\\rho = 0.05$ and log total market volume Normal with mean $\\ln(2{,}000{,}000)$ and standard deviation $0.3$, what is the probability that POV completes an order of $100{,}000$ shares? (It completes when market volume is at least $2{,}000{,}000$.) Give $1$ decimal place.",
    0.5),
  c9.s(TV, "transfer-close-target", 10,
    "A client wants to beat the closing price while limiting impact. Combine the ideas of this chapter into a strategy.",
    "Proposes participating in the closing auction for a large fraction, since the benchmark is the close, while trading a POV-style fraction in the last part of the day to reduce reliance on the auction.",
    "Discusses risks: auction imbalance can move the close, so monitor published imbalances, keep tracking error versus the close low, and avoid trading early in the day when the benchmark is far away."),
  c9.m(TV, "transfer-penalty-tuning", 10, "Raising the tracking penalty $\\phi$ in the POV objective, with $\\alpha$ fixed, makes the strategy:",
    "Follow the market rate more tightly at the cost of possibly leaving more inventory for the terminal penalty", [
      ["Trade at TWAP", "Higher $\\phi$ ties her more closely to market volume."],
      ["Ignore market volume", "It tightens tracking."],
      ["Always complete the order", "Completion depends on $\\alpha$ and volume."],
    ]),
];

export const ahtExecutionLoItems: Item[] = [...limitOnly, ...limitMarket, ...volume];
