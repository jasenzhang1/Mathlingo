import type { Item } from "../../../lib/assessment/types";
import { chapter } from "./shared";

/** Ch. 10: market making with inventory, at the touch, with utility, adverse selection and short-term alpha (40 items per lesson). */

const MM = "optimal-market-making";
const MA = "market-making-utility-and-adverse-selection";
const c102 = chapter("Ch. 10, Market Making (§10.1–10.2)");
const c103 = chapter("Ch. 10, Market Making (§10.3–10.4)");

const marketMaker: Item[] = [
  // level 1
  c102.m(MM, "recall-controls", 1, "In Chapter 10, the market maker controls:",
    "The depths $\\delta^{\\pm}$ above and below the midprice at which she posts sell and buy LOs", [
      ["Her trading speed with MOs", "She provides liquidity with LOs."],
      ["The midprice", "The midprice is exogenous to her."],
      ["Other traders’ MO arrival rates", "Those are market parameters."],
    ]),
  c102.m(MM, "recall-inventory-risk", 1, "Why does a market maker care about her inventory?",
    "Non-zero inventory exposes her to midprice moves and to the cost of liquidating it at the end", [
      ["Inventory earns interest", "Inventory risk, not interest, is the concern."],
      ["Regulators require zero inventory at all times", "She is allowed bounded inventory."],
      ["Inventory changes the spread", "Her concern is risk and terminal cost."],
    ]),
  c102.m(MM, "recall-no-penalty-depth", 1, "With no inventory penalty and no terminal liquidation cost, the optimal depth on each side is:",
    "$1/\\kappa$, the depth that maximises expected profit per MO arrival", [
      ["Zero", "Posting at the mid earns nothing per fill."],
      ["Infinite", "Deep orders rarely fill."],
      ["The quoted spread", "It depends on $\\kappa$ only."],
    ]),
  c102.m(MM, "recall-skew", 1, "When the market maker is long inventory, her optimal quotes:",
    "Lower the sell depth and raise the buy depth, encouraging inventory to fall", [
      ["Raise the sell depth", "That discourages selling."],
      ["Stay symmetric", "Inventory skews the quotes."],
      ["Move both closer to the mid", "The buy side moves away."],
    ]),

  // level 2
  c102.n(MM, "apply-depth-1-kappa", 2,
    "With $\\kappa = 100$ per dollar and no inventory considerations, what depth (in cents) does she post on each side?",
    1),
  c102.n(MM, "apply-fill-rate", 2,
    "Buy MOs arrive at $\\lambda^{+} = 1$ per second and fill her sell LO at depth $\\delta^{+}$ with probability $e^{-\\kappa\\delta^{+}}$, $\\kappa = 100$. What is her sell fill rate at $\\delta^{+} = 1$ cent? Give $4$ decimal places.",
    0.3679),
  c102.n(MM, "apply-profit-rate", 2,
    "With both sides at $\\delta = 1$ cent, $\\lambda = 1$ per second each side and $\\kappa = 100$, what is her expected spread income per second, $2\\delta\\lambda e^{-\\kappa\\delta}$, in cents? Give $4$ decimal places.",
    0.7358),
  c102.m(MM, "recall-inventory-bounds", 2, "In the model, inventory is constrained between $\\underline{q}$ and $\\bar{q}$. At $q = \\bar{q}$ she:",
    "Stops posting buy LOs, posting only on the sell side", [
      ["Posts only buy LOs", "At the upper bound she cannot buy more."],
      ["Stops trading", "She can still sell."],
      ["Sends a sell MO", "The model uses LOs; she posts one-sided."],
    ]),

  // level 3
  c102.n(MM, "apply-depth-formula", 3,
    "The optimal sell depth is $\\delta^{+*} = \\frac{1}{\\kappa} - [h(t, q - 1) - h(t, q)]$. With $\\kappa = 100$ and $h(q - 1) - h(q) = 0.003$, compute it in cents.",
    0.7),
  c102.n(MM, "apply-buy-depth", 3,
    "The buy depth is $\\delta^{-*} = \\frac{1}{\\kappa} - [h(t, q + 1) - h(t, q)]$. With $\\kappa = 100$ and $h(q + 1) - h(q) = -0.004$, compute it in cents.",
    1.4),
  c102.n(MM, "apply-inventory-drift", 3,
    "With $\\lambda = 1$ per second, $\\kappa = 100$, $\\delta^{+} = 0.7$ cents and $\\delta^{-} = 1.4$ cents, her expected inventory drift is $\\lambda e^{-\\kappa\\delta^{-}} - \\lambda e^{-\\kappa\\delta^{+}}$. Compute it per second. Give $4$ decimal places.",
    -0.2500),
  c102.m(MM, "apply-mean-reversion", 3, "The optimal strategy induces mean reversion in inventory because:",
    "When inventory is high she quotes so that sells fill more often than buys, and vice versa", [
      ["The midprice mean-reverts", "The midprice is a martingale in the base model."],
      ["She sends MOs to flatten", "Mean reversion comes from LO skew."],
      ["MO arrivals depend on her inventory", "Arrivals are exogenous; fill probabilities change."],
    ]),

  // level 4
  c102.n(MM, "apply-matrix-entry", 4,
    "With $\\kappa^{\\pm} = \\kappa$ and $\\lambda^{\\pm} = \\lambda$, the solution is $\\omega(t) = e^{\\mathbf{A}(T - t)}\\mathbf{z}$ with $\\mathbf{A}_{qq} = -\\phi\\kappa q^2$. With $\\phi = 10^{-3}$, $\\kappa = 100$ and $q = 4$, compute $\\mathbf{A}_{44}$.",
    -1.6),
  c102.n(MM, "apply-offdiag", 4,
    "The off-diagonal entries are $\\mathbf{A}_{q, q\\pm 1} = \\lambda e^{-1}$. With $\\lambda = 1$, compute them. Give $4$ decimal places.",
    0.3679),
  c102.n(MM, "apply-terminal-z", 4,
    "The terminal vector is $z_q = e^{-\\alpha\\kappa q^2}$. With $\\alpha = 10^{-4}$, $\\kappa = 100$ and $q = 10$, compute $z_{10}$. Give $4$ decimal places.",
    0.3679),
  c102.s(MM, "explain-two-components", 4,
    "The optimal depth $\\delta^{\\pm*} = \\frac{1}{\\kappa} - [h(t, q \\mp 1) - h(t, q)]$ has two components. Interpret them.",
    "Interprets $1/\\kappa$ as the depth a risk-neutral, inventory-indifferent market maker would choose, balancing margin per fill against fill probability.",
    "Interprets the second term as the inventory adjustment: the change in the value of her remaining position from one more fill on that side, which skews quotes to push inventory toward the optimal level."),

  // level 5
  c102.n(MM, "apply-h-from-omega", 5,
    "With $h(t, q) = \\frac{1}{\\kappa}\\log\\omega_q(t)$ and $\\kappa = 100$, if $\\omega_1/\\omega_0 = 0.9$, what is $h(q = 1) - h(q = 0)$ in cents? Give $3$ decimal places.",
    -0.105),
  c102.m(MM, "apply-time-effect", 5, "Far from the terminal date, the optimal depths:",
    "Become nearly independent of time, depending mainly on inventory", [
      ["Grow without bound", "They converge to stationary values."],
      ["Become zero", "She still earns depth."],
      ["Become independent of inventory", "Inventory still skews them."],
    ]),
  c102.s(MM, "explain-at-the-touch", 5,
    "In Section 10.2.2 the market maker posts only at the touch and chooses whether to post on each side. Describe the optimal strategy.",
    "Explains that a posted LO earns the half-spread $\\Delta/2$ if filled; she posts on a side if $\\Delta/2 + [h(t, q \\mp 1) - h(t, q)] > 0$, i.e. if the spread earned exceeds the inventory cost of the fill.",
    "Describes the result: a central band of inventories where she posts both sides, and outer regions where she posts only on the side that brings inventory back, a bang-bang posting rule."),
  c102.n(MM, "apply-touch-condition", 5,
    "At the touch she posts a sell LO if $\\Delta/2 + h(q - 1) - h(q) > 0$. With $\\Delta = 1$ cent and $h(q - 1) - h(q) = -0.7$ cents, does she post? Report $1$ for yes, $0$ for no.",
    0),

  // level 6
  c102.n(MM, "apply-profit-symmetric", 6,
    "Without inventory constraints or penalties, her expected profit over $T = 300$ seconds with $\\lambda = 1$ per side, $\\kappa = 100$ and depths $1/\\kappa$ is $2\\lambda T\\frac{1}{\\kappa}e^{-1}$. Compute it in dollars. Give $4$ decimal places.",
    2.2073),
  c102.s(MM, "explain-penalty-effect", 6,
    "How does raising the running inventory penalty $\\phi$ change the market maker’s behaviour and P&L distribution (Figure 10.4)?",
    "Explains that larger $\\phi$ makes quotes skew more strongly with inventory, keeping inventory tighter around zero and reducing exposure to midprice risk.",
    "Notes that this lowers the P&L variance but also its mean (she gives up spread to flatten), so the P&L histogram shifts left and narrows."),
  c102.m(MM, "apply-touch-region", 6, "In Figure 10.5, as $\\phi$ increases, the region of inventories where she posts on both sides:",
    "Shrinks", [
      ["Expands", "Stronger penalties restrict two-sided quoting to inventories near zero."],
      ["Is unchanged", "The penalty changes the posting regions."],
      ["Disappears entirely", "She still posts both sides near zero inventory."],
    ]),
  c102.n(MM, "apply-volume-choice", 6,
    "In Section 10.2.3 she chooses posted volume. If posting $2$ units at the touch earns $\\Delta/2$ per unit on a fill but each unit of inventory costs $0.6$ cents in value, with $\\Delta = 1$ cent, what is the net value per fill of posting $2$ units on the side that increases inventory, in cents?",
    -0.2),

  // level 7
  c102.s(MM, "explain-matrix-solution", 7,
    "Explain how the substitution $h = \\frac{1}{\\kappa}\\log\\omega$ turns the market maker’s non-linear system into a linear matrix ODE.",
    "Explains that optimising each depth gives terms $\\frac{\\lambda}{\\kappa}e^{-1}e^{\\kappa[h(q \\mp 1) - h(q)]}$; with $h = \\frac{1}{\\kappa}\\log\\omega$ these become $\\frac{\\lambda e^{-1}}{\\kappa}\\frac{\\omega_{q \\mp 1}}{\\omega_q}$.",
    "Multiplies through by $\\kappa\\omega_q$ to get $\\partial_t\\omega_q - \\phi\\kappa q^2\\omega_q + \\lambda e^{-1}(\\omega_{q-1} + \\omega_{q+1}) = 0$, a linear tridiagonal system $\\partial_t\\omega + \\mathbf{A}\\omega = 0$, so $\\omega(t) = e^{\\mathbf{A}(T - t)}\\mathbf{z}$."),
  c102.n(MM, "apply-two-state", 7,
    "Take inventories $q \\in \\lbrace 0, 1 \\rbrace$ only, $\\phi\\kappa = 1$, $\\lambda e^{-1} = 0.5$ and $T - t \\to$ large. The stationary ratio $\\omega_1/\\omega_0$ is the eigenvector ratio of $\\mathbf{A} = \\begin{bmatrix} 0 & 0.5 \\\\ 0.5 & -1 \\end{bmatrix}$ for its largest eigenvalue. Compute $\\omega_1/\\omega_0$. Give $4$ decimal places.",
    0.4142),
  c102.m(MM, "apply-strategy-terminal", 7, "Just before $T$, a market maker with large positive inventory and a big terminal penalty:",
    "Posts her sell LO very close to the mid (even inside it) and her buy LO far away", [
      ["Posts symmetric quotes", "Terminal liquidation cost skews her quotes."],
      ["Stops posting sells", "She wants to sell."],
      ["Posts buys close to the mid", "That would add inventory."],
    ]),
  c102.s(MM, "explain-ergodic-depths", 7,
    "Far from $T$, the depths become stationary. How could a practitioner compute these stationary depths directly?",
    "Explains that as $T - t$ grows, $\\omega(t) = e^{\\mathbf{A}(T - t)}\\mathbf{z}$ is dominated by the eigenvector of $\\mathbf{A}$ with the largest eigenvalue, so ratios $\\omega_{q \\mp 1}/\\omega_q$ converge to ratios of that eigenvector’s entries.",
    "Concludes that the stationary depths follow from one eigenvector computation, $\\delta^{\\pm} = \\frac{1}{\\kappa}[1 - \\log(\\omega_{q\\mp1}/\\omega_q)]$, independent of $\\mathbf{z}$."),

  // level 8
  c102.n(MM, "apply-depth-two-state", 8,
    "In that two-state example with $\\omega_1/\\omega_0 = 0.4142$ and $\\kappa = 100$, what is the stationary sell depth at $q = 1$, $\\delta^{+} = \\frac{1}{\\kappa}[1 - \\log(\\omega_0/\\omega_1)]$, in cents? Give $3$ decimal places.",
    0.119),
  c102.s(MM, "explain-pnl-tradeoff", 8,
    "Explain the trade-off a market maker faces between quoting tightly for volume and controlling inventory, and how the model resolves it.",
    "Explains that tight quotes increase fill rates and spread income but also inventory swings and terminal liquidation costs, while wide quotes reduce both.",
    "Explains that the model resolves it through the value function: depths optimally balance the expected spread per fill, the fill probability and the marginal inventory cost, with $\\phi$ and $\\alpha$ encoding aversion."),
  c102.m(MM, "apply-asymmetric-kappa", 8, "If buy-side fill probabilities decay faster ($\\kappa^{-} > \\kappa^{+}$), the optimal depths with no inventory concern are:",
    "$1/\\kappa^{-}$ on the buy side, smaller than $1/\\kappa^{+}$ on the sell side", [
      ["Equal on both sides", "Each side optimises with its own $\\kappa$."],
      ["Larger on the buy side", "A larger $\\kappa$ makes deep posts fill less, so she posts closer."],
      ["Zero on the buy side", "She still earns depth."],
    ]),
  c102.n(MM, "apply-expected-inventory-var", 8,
    "If her inventory follows a symmetric random walk with $2$ fills per second on average and no skew, what is the variance of inventory after $300$ seconds?",
    600),

  // level 9
  c102.s(MM, "transfer-calibrate", 9,
    "How would you calibrate the Chapter 10 market-making model to a liquid stock, and what would you monitor live?",
    "Estimates $\\lambda^{\\pm}$ from MO arrival rates by side and time of day, and $\\kappa^{\\pm}$ from fill probability versus depth; chooses $\\phi$, $\\alpha$ and inventory limits from risk tolerance.",
    "Monitors fill rates against predictions, inventory paths, the P&L split between spread capture and inventory revaluation (adverse selection), and recalibrates when markets change."),
  c102.n(MM, "apply-sharpe-like", 9,
    "A market maker earns a mean P&L of \\$2.2 per $5$-minute session with standard deviation \\$1.1. What is the mean-to-standard-deviation ratio?",
    2),
  c102.m(MM, "transfer-tick", 9, "In reality depths are restricted to whole ticks. A practical approximation is to:",
    "Round the model depth to the nearest feasible tick, or use the at-the-touch model when the spread is one tick", [
      ["Ignore ticks", "Prices must be on the tick grid."],
      ["Always post one tick away", "That ignores inventory skew."],
      ["Post only at the mid", "Mid prices are often not on the grid."],
    ]),
  c102.s(MM, "transfer-competition", 9,
    "The model treats other market makers through the fixed fill parameters. Discuss what happens to the strategy’s profitability if competitors post more tightly.",
    "Explains that tighter competitors lower her fill probability at any depth, effectively changing $\\kappa$ and $\\lambda$ so her expected spread income falls.",
    "Notes that she must recalibrate, perhaps tighten too, and that in equilibrium competition drives depths toward break-even with adverse-selection and inventory costs, as in Glosten–Milgrom and Grossman–Miller."),

  // level 10
  c102.s(MM, "transfer-design", 10,
    "Design a production market-making algorithm based on Section 10.2. Specify state variables, the policy table, safeguards and performance attribution.",
    "Uses state (time of day, inventory, spread, possibly volatility), precomputed depths from the matrix solution for each inventory, and updates quotes on each event.",
    "Adds safeguards (inventory and loss limits, kill switches, latency checks, widening in volatile periods) and attributes P&L to spread capture, inventory revaluation and fees, to detect adverse selection."),
  c102.n(MM, "apply-optimal-at-touch-q", 10,
    "With $\\Delta = 1$ cent and $h(q) = -\\phi'q^2$ (stationary approximation) with $\\phi' = 0.1$ cents, she posts a sell LO at the touch when $\\Delta/2 + h(q - 1) - h(q) > 0$, i.e. $0.5 + 0.1(2q - 1) > 0$. What is the most negative inventory at which she still posts a sell?",
    -1),
  c102.s(MM, "transfer-volatility", 10,
    "In the base model the midprice volatility $\\sigma$ does not affect the optimal depths. Explain why, and whether this is reasonable.",
    "Explains that with a running penalty on inventory (rather than utility), volatility enters only the marked-to-market value, which separates out in the ansatz $x + qS + h$, so $\\sigma$ drops out of $h$.",
    "Notes that it is unrealistic: with utility (Section 10.3) or if $\\phi$ is linked to $\\tfrac{1}{2}\\gamma\\sigma^2$, higher volatility widens skews; and volatility correlates with adverse selection, which matters in practice."),
  c102.m(MM, "transfer-objective", 10, "Which objective would most directly make the market maker’s quotes depend on volatility?",
    "Exponential utility of terminal wealth, or setting $\\phi = \\tfrac{1}{2}\\gamma\\sigma^2$", [
      ["Maximising expected wealth with no penalty", "Then volatility does not matter."],
      ["Maximising the number of fills", "That ignores risk."],
      ["Minimising the spread", "That is not an objective of the model."],
    ]),
];

const utilityAdverse: Item[] = [
  // level 1
  c103.m(MA, "recall-utility-mm", 1, "In Section 10.3 the market maker maximises:",
    "Expected exponential utility of terminal wealth", [
      ["Expected wealth with a running penalty", "That is Section 10.2."],
      ["Fill count", "Fills are a means, not the objective."],
      ["Sharpe ratio", "The objective is CARA utility."],
    ]),
  c103.m(MA, "recall-adverse", 1, "Adverse selection in market making means:",
    "Her fills tend to come just before the price moves against her position", [
      ["Her quotes are too tight", "Tight quotes may worsen it, but the definition is about fill timing."],
      ["She trades with liquidity traders", "Those are the profitable counterparties."],
      ["Fees are too high", "Fees are separate."],
    ]),
  c103.m(MA, "recall-mo-impact", 1, "In Section 10.4.1, each MO affects the midprice by:",
    "A random jump in the direction of the order, a permanent price impact", [
      ["Nothing", "MOs move the midprice in this section."],
      ["A temporary move that reverses", "The jump is permanent."],
      ["Only changing the spread", "They shift the midprice."],
    ]),
  c103.m(MA, "recall-alpha", 1, "Short-term alpha in Section 10.4.2 refers to:",
    "A mean-reverting drift in the midprice, driven by order flow, that predicts short-run price moves", [
      ["The market maker’s skill", "It is a model of the price drift."],
      ["The CAPM intercept", "Here it is a short-term drift process."],
      ["The fill probability", "That is $e^{-\\kappa\\delta}$."],
    ]),

  // level 2
  c103.n(MA, "apply-utility-depth", 2,
    "With CARA risk aversion $\\gamma$, the depth term becomes $\\frac{1}{\\gamma}\\log(1 + \\frac{\\gamma}{\\kappa})$. With $\\gamma = 50$ and $\\kappa = 100$ per dollar, compute it in cents. Give $3$ decimal places.",
    0.811),
  c103.n(MA, "apply-adverse-depth", 2,
    "With MO-induced midprice jumps of mean $\\varepsilon = 0.4$ cents, the optimal depth shifts out by $\\varepsilon$: with $\\kappa = 100$ and no inventory concerns, $\\delta^{*} = \\frac{1}{\\kappa} + \\varepsilon$. Compute it in cents.",
    1.4),
  c103.n(MA, "apply-alpha-drift", 2,
    "With short-term alpha $\\alpha_t = 0.02$ dollars per second, how much is the midprice expected to drift over $5$ seconds, in cents?",
    10),
  c103.m(MA, "recall-zero-gamma", 2, "As risk aversion $\\gamma \\to 0$, the utility-maximising market maker’s depths:",
    "Converge to the risk-neutral depths of Section 10.2", [
      ["Become zero", "They converge to $1/\\kappa$-based depths."],
      ["Become infinite", "Zero risk aversion removes the bias."],
      ["Become random", "They remain deterministic functions of inventory."],
    ]),

  // level 3
  c103.n(MA, "apply-utility-depth-small", 3,
    "With $\\gamma = 1$ and $\\kappa = 100$, compare $\\frac{1}{\\gamma}\\log(1 + \\gamma/\\kappa)$ with $1/\\kappa$. What is the difference, in hundredths of a cent? Give $1$ decimal place.",
    0.5),
  c103.n(MA, "apply-jump-midprice", 3,
    "After a buy MO the midprice jumps by $\\varepsilon^{+}$, with mean $0.3$ cents. If $40$ buy MOs and $30$ sell MOs (mean jump $0.3$ cents down) arrive, what is the expected net midprice change in cents?",
    3),
  c103.m(MA, "apply-adverse-loss", 3, "If she does not widen her quotes for adverse selection, her average P&L per fill is:",
    "The depth minus the expected price jump against her, which can be negative", [
      ["Always the depth", "The jump erodes her margin."],
      ["Always zero", "It depends on depth versus jump size."],
      ["The depth plus the jump", "The jump goes against her."],
    ]),
  c103.m(MA, "apply-alpha-quotes", 3, "When short-term alpha is positive (the price is expected to rise), the market maker:",
    "Posts her sell LO deeper and her buy LO closer to the mid", [
      ["Posts her sell LO closer", "Selling before a rise is costly."],
      ["Posts symmetric quotes", "Alpha skews quotes."],
      ["Stops posting buys", "Buying before a rise is attractive."],
    ]),

  // level 4
  c103.n(MA, "apply-value-loss-fill", 4,
    "Her sell LO at depth $1$ cent fills, and then the midprice jumps up by $1.4$ cents on average. What is her expected marked-to-market P&L on that fill, in cents?",
    -0.4),
  c103.s(MA, "explain-utility-mapping", 4,
    "How does the utility-maximising market maker’s problem map to the penalised risk-neutral one?",
    "Explains that with the ansatz $G = -\\exp\\{-\\gamma(x + qS + g(t, q))\\}$ the HJB yields an equation for $g$ like the penalised one, with $\\phi = \\tfrac{1}{2}\\gamma\\sigma^2$.",
    "Notes the fill parameters change: $\\lambda$ is replaced by an adjusted rate and the depth term becomes $\\frac{1}{\\gamma}\\log(1 + \\gamma/\\kappa)$, so the strategies coincide up to a constant shift in depths."),
  c103.n(MA, "apply-adjusted-lambda", 4,
    "In the mapping, the effective arrival rate becomes $\\lambda\\frac{\\kappa}{\\kappa + \\gamma}\\left(1 + \\frac{\\gamma}{\\kappa}\\right)^{-\\kappa/\\gamma}$-type adjustments. As a simpler check, compute $\\frac{\\kappa}{\\kappa + \\gamma}$ for $\\kappa = 100$ and $\\gamma = 25$.",
    0.8),
  c103.m(MA, "apply-informed-flow", 4, "In Section 10.4.1, MOs that move the midprice permanently represent:",
    "Trades by better-informed participants, or information carried by order flow", [
      ["Noise traders", "Noise trades would not move the price permanently."],
      ["The market maker’s own trades", "She trades via LOs."],
      ["Exchange errors", "They are a model of information."],
    ]),

  // level 5
  c103.n(MA, "apply-optimal-inventory-drift", 5,
    "Because each MO raises the mid by $\\varepsilon$, a market maker holding inventory $q$ gains $q\\varepsilon$ per buy MO and loses $q\\varepsilon$ per sell MO. With buy MOs at $1.2$ per second, sell MOs at $0.8$ per second and $\\varepsilon = 0.5$ cents, what is the expected gain rate per unit of inventory, in cents per second?",
    0.2),
  c103.s(MA, "explain-optimal-inventory-level", 5,
    "In Figure 10.8 the optimal inventory level is not zero when buy and sell MO rates differ. Explain why.",
    "Explains that with more buy than sell MOs and permanent impact, the midprice drifts up on average, so holding positive inventory earns the drift.",
    "Concludes that the strategy mean-reverts inventory to a positive level, skewing quotes accordingly, balanced against the inventory penalty."),
  c103.m(MA, "apply-alpha-model", 5, "In Section 10.4.2, short-term alpha follows $d\\alpha_t = -\\zeta\\alpha_t dt + \\eta\\,dW^{\\alpha}_t + \\varepsilon^{+}dM^{+}_t - \\varepsilon^{-}dM^{-}_t$. The MO terms mean:",
    "Buy MOs push alpha up and sell MOs push it down, after which it mean-reverts", [
      ["MOs have no effect on alpha", "They jump it."],
      ["Alpha jumps the midprice directly", "Alpha is a drift, not a level."],
      ["Alpha never reverts", "It mean-reverts at rate $\\zeta$."],
    ]),
  c103.n(MA, "apply-alpha-decay", 5,
    "Alpha jumps to $0.03$ after a buy MO and decays at $\\zeta = 2$ per second. What is the expected cumulative midprice drift over the following time, $\\alpha/\\zeta$, in cents?",
    1.5),

  // level 6
  c103.s(MA, "explain-alpha-strategy", 6,
    "How does a market maker who observes short-term alpha adjust her quotes, and what happens to one who ignores it?",
    "Explains that with positive alpha she widens her sell depth and tightens her buy depth (and vice versa), avoiding selling before rises and buying before falls; with large alpha she may stop quoting one side.",
    "Explains that a market maker who ignores alpha is systematically picked off: her sells fill before rises and her buys before falls, so her P&L suffers from adverse selection."),
  c103.n(MA, "apply-pnl-alpha", 6,
    "A market maker ignoring alpha earns $1$ cent of depth per fill but loses on average $1.3$ cents per fill from subsequent price moves. Over $5{,}000$ fills, what is her expected P&L in dollars?",
    -15),
  c103.m(MA, "apply-latency-alpha", 6, "Why does exploiting short-term alpha require low latency?",
    "Alpha decays within seconds, so quotes must be updated before the predicted move happens", [
      ["Alpha is constant", "It mean-reverts."],
      ["Latency increases alpha", "Latency does not change alpha."],
      ["Regulators require it", "It is an economic necessity."],
    ]),
  c103.n(MA, "apply-jump-mean-exp", 6,
    "If midprice jumps after MOs are exponentially distributed with mean $0.4$ cents, what is the probability that a jump exceeds $1$ cent? Give $4$ decimal places.",
    0.0821),

  // level 7
  c103.s(MA, "explain-adverse-dpe", 7,
    "How does the DPE change when MOs also move the midprice by a random jump $\\varepsilon$?",
    "Explains that each MO arrival now changes $S$ by $\\pm\\varepsilon$ whether or not it fills her, so the DPE has an expectation over $\\varepsilon$ of the value after the jump, both for filled and unfilled arrivals.",
    "Notes that with the ansatz $x + qS + h$, the jump contributes $q\\,\\mathbb{E}[\\varepsilon]$ terms to the equation for $h$ and shifts the optimal depth out by $\\mathbb{E}[\\varepsilon]$."),
  c103.n(MA, "apply-depth-with-inventory-adverse", 7,
    "With adverse selection, $\\delta^{+*} = \\frac{1}{\\kappa} + \\varepsilon - [h(q - 1) - h(q)]$. With $\\kappa = 100$, $\\varepsilon = 0.3$ cents and $h(q - 1) - h(q) = 0.5$ cents, compute $\\delta^{+*}$ in cents.",
    0.8),
  c103.m(MA, "apply-utility-vs-penalty", 7, "Section 10.3 notes the utility and penalty value functions are related by:",
    "$G = -\\exp\\{-\\gamma(x + qS + g)\\}$, where $g$ coincides with the penalised $h$ up to a constant shift", [
      ["$G = h$", "One is a utility, the other a dollar value."],
      ["$G = \\log h$", "The link is exponential."],
      ["There is no relationship", "The book shows an explicit mapping."],
    ]),
  c103.n(MA, "apply-alpha-depth-shift", 7,
    "In a simplified alpha model, the sell depth shifts by $+c\\alpha$ and the buy depth by $-c\\alpha$ with $c = 0.5$ seconds. With $\\alpha = 0.02$ dollars per second and base depths $1$ cent, what is the new buy depth in cents?",
    0),

  // level 8
  c103.s(MA, "explain-realized-spread", 8,
    "How would you measure, from your own fills, how much adverse selection your market-making strategy suffers?",
    "Proposes computing, for each fill, the change in midprice over short horizons after the fill, signed against your position (the price impact component), and comparing it with the depth earned.",
    "Notes that a realised spread (depth minus subsequent adverse move) near zero or negative indicates heavy adverse selection; break it down by time of day, order size and signals to adjust quoting."),
  c103.n(MA, "apply-break-even-depth", 8,
    "If the expected adverse move after a fill rises linearly with how aggressive she is, $\\varepsilon(\\delta) = 0.8 - 0.4\\delta$ cents, what depth $\\delta$ in cents makes her expected P&L per fill zero? Give $4$ decimal places.",
    0.5714),
  c103.m(MA, "apply-alpha-onesided", 8, "When alpha is very large and positive, the optimal market maker may:",
    "Stop posting on the sell side and post aggressively on the buy side", [
      ["Post both sides tighter", "That invites adverse selection on the sell side."],
      ["Post both sides wider symmetrically", "Alpha calls for asymmetric quotes."],
      ["Ignore alpha", "Alpha predicts price moves."],
    ]),
  c103.n(MA, "apply-utility-relative", 8,
    "Compute the ratio of the CARA depth term to the risk-neutral one, $\\frac{\\kappa}{\\gamma}\\log(1 + \\gamma/\\kappa)$, for $\\gamma/\\kappa = 1$. Give $4$ decimal places.",
    0.6931),

  // level 9
  c103.s(MA, "transfer-signal-integration", 9,
    "You have an order-imbalance signal predicting the next price move. How would you incorporate it into the Chapter 10 market maker?",
    "Proposes treating the signal as a state variable (like alpha) driving the midprice drift, adding it to the HJB, so depths depend on inventory and the signal.",
    "Notes the practical approximation: shift both quotes in the direction of the predicted move and skew more when the signal is strong, with calibration of how strongly the signal predicts and how quickly it decays."),
  c103.n(MA, "apply-informed-cost-total", 9,
    "A market maker fills $10{,}000$ times a day, earning $1$ cent each. A fraction $20\\%$ of fills come from informed traders, after which the price moves $4$ cents against her. What is her daily expected P&L in dollars?",
    20),
  c103.m(MA, "transfer-utility-choice", 9, "For a market maker with large capital relative to positions, the most suitable choice of risk aversion in the CARA model is:",
    "Small $\\gamma$, so behaviour is close to the risk-neutral penalised model with modest skew", [
      ["Very large $\\gamma$", "That makes her extremely cautious."],
      ["Zero inventory limits", "Limits are separate from $\\gamma$."],
      ["Negative $\\gamma$", "That would be risk-seeking."],
    ]),
  c103.s(MA, "transfer-toxicity-regime", 9,
    "Order-flow toxicity changes through the day. How should the market maker adapt $\\varepsilon$ (expected adverse jump) in real time?",
    "Proposes estimating toxicity from recent post-fill price moves or from flow measures (imbalance, trade sizes, VPIN-like indicators), updating $\\varepsilon$ through exponential weighting.",
    "Notes that higher estimated $\\varepsilon$ should widen depths and reduce size, and that the model with time-varying $\\varepsilon$ needs it as a state variable or frequent recalibration."),

  // level 10
  c103.s(MA, "transfer-equilibrium", 10,
    "If all market makers widen quotes by the expected adverse move $\\varepsilon$, what happens to liquidity traders and to the informativeness of prices? Relate to Glosten–Milgrom.",
    "Explains that spreads rise by the adverse-selection component, so liquidity traders pay more; with price-sensitive liquidity traders, some leave, raising the informed share further.",
    "Relates to Glosten–Milgrom: spreads reflect toxicity, and if toxicity is high enough the market can collapse; prices still incorporate information through the trades that occur."),
  c103.n(MA, "apply-ce-mm", 10,
    "A CARA market maker with $\\gamma = 0.01$ per dollar has terminal wealth approximately Normal with mean \\$50 and standard deviation \\$40. What is her certainty equivalent, $\\mu - \\tfrac{1}{2}\\gamma\\sigma^2$, in dollars?",
    42),
  c103.s(MA, "transfer-alpha-vs-hft", 10,
    "Argue whether a market maker should invest in short-term alpha signals or in speed, using the chapter’s models.",
    "Argues that alpha signals reduce adverse selection directly (quoting away from predicted moves), raising per-fill profit, but only if acted on before the move.",
    "Argues that speed is needed to act on signals and to avoid being picked off by faster traders; the two are complements, and the right investment depends on how quickly alpha decays relative to one’s latency."),
  c103.m(MA, "transfer-model-test", 10, "To test whether the alpha-adjusted strategy improves on the base strategy, the most convincing evidence is:",
    "Higher realised spreads (depth minus post-fill adverse moves) on comparable fills, out of sample", [
      ["More fills", "More fills may mean more adverse selection."],
      ["Lower inventory variance alone", "Inventory control is not the main aim."],
      ["A better HJB solution", "The question is empirical."],
    ]),
];

export const ahtMarketMakingItems: Item[] = [...marketMaker, ...utilityAdverse];
