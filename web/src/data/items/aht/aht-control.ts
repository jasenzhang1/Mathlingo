import type { Item } from "../../../lib/assessment/types";
import { chapter } from "./shared";

/** Ch. 5 and App. A: jump calculus, the HJB equation, control of counting processes, optimal stopping (40 items per lesson). */

const SJ = "stochastic-calculus-with-jumps";
const HJB = "stochastic-control-and-hjb";
const CCP = "control-of-counting-processes";
const OS = "optimal-stopping-variational-inequalities";
const cA = chapter("App. A, Stochastic Calculus for Finance");
const c53 = chapter("Ch. 5, Stochastic Optimal Control and Stopping (§5.1–5.3)");
const c54 = chapter("Ch. 5, Stochastic Optimal Control and Stopping (§5.4 Control for Counting Processes)");
const c55 = chapter("Ch. 5, Stochastic Optimal Control and Stopping (§5.5–5.6 Optimal Stopping)");

const jumps: Item[] = [
  // level 1
  cA.m(SJ, "recall-poisson", 1, "A Poisson process $N_t$ with intensity $\\lambda$ has:",
    "Independent increments, with $N_t - N_s \\sim \\text{Poisson}(\\lambda(t - s))$", [
      ["Normally distributed increments", "Poisson increments are integer-valued counts."],
      ["Increments that depend on the past", "Poisson increments are independent."],
      ["Jumps of random size", "Each jump of a Poisson process has size one; random sizes give a compound Poisson process."],
    ]),
  cA.m(SJ, "recall-compensator", 1, "The compensated Poisson process $\\tilde{N}_t = N_t - \\lambda t$ is:",
    "A martingale", [
      ["A Brownian motion", "It is a pure-jump martingale."],
      ["Always non-negative", "It drifts down between jumps and can be negative."],
      ["A Poisson process with intensity $0$", "Subtracting $\\lambda t$ removes the drift, not the jumps."],
    ]),
  cA.m(SJ, "recall-doubly-stochastic", 1, "A doubly stochastic (Cox) Poisson process is one whose:",
    "Intensity is itself a stochastic process", [
      ["Jumps are of size two", "Jump sizes are one; the intensity is random."],
      ["Increments are Normal", "Increments are counts."],
      ["Time runs backwards", "It is an ordinary counting process with random intensity."],
    ]),
  cA.m(SJ, "recall-compound", 1, "A compound Poisson process $\\sum_{j=1}^{N_t} J_j$:",
    "Jumps at the times of a Poisson process, with i.i.d. jump sizes $J_j$", [
      ["Has jumps of size one only", "That is the plain Poisson process."],
      ["Is continuous", "It is piecewise constant with jumps."],
      ["Has Normal increments", "Its increments are random sums of jumps."],
    ]),

  // level 2
  cA.n(SJ, "apply-poisson-mean", 2,
    "MOs arrive as a Poisson process with intensity $\\lambda = 3$ per second. What is the expected number of MOs in $20$ seconds?",
    60),
  cA.n(SJ, "apply-poisson-zero", 2,
    "With $\\lambda = 0.5$ per second, what is the probability of no arrival in $4$ seconds? Give $4$ decimal places.",
    0.1353),
  cA.n(SJ, "apply-compound-mean", 2,
    "MOs arrive at rate $\\lambda = 2$ per second with i.i.d. sizes of mean $150$ shares. What is the expected volume traded in $30$ seconds?",
    9000),
  cA.m(SJ, "recall-generator-poisson", 2, "The infinitesimal generator of a Poisson process with intensity $\\lambda$ acting on $f(n)$ is:",
    "$\\lambda\\,[f(n + 1) - f(n)]$", [
      ["$\\lambda f'(n)$", "A counting process jumps; it has no derivative term."],
      ["$\\tfrac{1}{2}\\lambda f''(n)$", "That form belongs to a diffusion."],
      ["$f(n + 1)$", "The generator measures the expected rate of change."],
    ]),

  // level 3
  cA.n(SJ, "apply-poisson-variance", 3,
    "With $\\lambda = 3$ per second, what is the standard deviation of the number of arrivals in $12$ seconds?",
    6),
  cA.n(SJ, "apply-compound-variance", 3,
    "Compound Poisson with $\\lambda = 2$ per second and jump sizes with $\\mathbb{E}[J^2] = 40{,}000$ shares$^2$. What is the variance of the volume over $10$ seconds, $\\lambda t\\,\\mathbb{E}[J^2]$?",
    800000),
  cA.n(SJ, "apply-superposition", 3,
    "Buy MOs arrive at rate $1.2$ per second and sell MOs independently at $0.8$ per second. What is the probability that the next MO is a buy?",
    0.6),
  cA.m(SJ, "apply-thinning", 3, "MOs arrive at rate $\\lambda$, and each fills your limit order independently with probability $p$. The fills form:",
    "A Poisson process with intensity $\\lambda p$", [
      ["A Poisson process with intensity $\\lambda$", "Only a fraction $p$ of arrivals fill you."],
      ["A deterministic sequence", "Fill times are random."],
      ["A Brownian motion", "Fills are counts."],
    ]),

  // level 4
  cA.n(SJ, "apply-mgf", 4,
    "For $N_t \\sim \\text{Poisson}(\\lambda t)$, $\\mathbb{E}[e^{\\theta N_t}] = \\exp\\{\\lambda t(e^{\\theta} - 1)\\}$. Compute it for $\\lambda t = 2$ and $\\theta = \\ln 2$. Give $4$ decimal places.",
    7.3891),
  cA.n(SJ, "apply-ou-mean", 4,
    "An OU process $dX_t = \\kappa(\\theta - X_t)dt + \\sigma dW_t$ with $\\kappa = 2$, $\\theta = 1$ and $X_0 = 3$. What is $\\mathbb{E}[X_{0.5}]$? Give $4$ decimal places.",
    1.7358),
  cA.n(SJ, "apply-ou-variance", 4,
    "Same OU process with $\\sigma = 0.4$. What is $\\text{Var}(X_{0.5}) = \\frac{\\sigma^2}{2\\kappa}(1 - e^{-2\\kappa t})$? Give $4$ decimal places.",
    0.0346),
  cA.m(SJ, "apply-ito-jump-term", 4, "Itô’s formula for $f(X_t)$ when $X$ has jumps adds, at each jump time, the term:",
    "$f(X_{t^-} + \\Delta X_t) - f(X_{t^-})$, the exact change in $f$ across the jump", [
      ["$f'(X_{t^-})\\Delta X_t$", "That first-order term is wrong for finite jumps."],
      ["$\\tfrac{1}{2}f''(X_{t^-})(\\Delta X_t)^2$", "Jumps enter through the full difference, not a Taylor term."],
      ["Nothing; jumps do not affect $f$", "Jumps change $f$ discontinuously."],
    ]),

  // level 5
  cA.n(SJ, "apply-generator-compound", 5,
    "The generator of a compound Poisson process with rate $\\lambda$ and jumps $J$ acting on $f(x) = x^2$ is $\\lambda\\,\\mathbb{E}[(x + J)^2 - x^2] = \\lambda(2x\\mathbb{E}[J] + \\mathbb{E}[J^2])$. With $\\lambda = 2$, $x = 10$, $\\mathbb{E}[J] = 1$ and $\\mathbb{E}[J^2] = 5$, compute it.",
    50),
  cA.s(SJ, "explain-compensator", 5,
    "Why does $N_t - \\lambda t$ have zero mean increments, and why is this the jump analogue of “$dW_t$ has zero mean”?",
    "Explains that $\\mathbb{E}[dN_t \\mid \\mathcal{F}_{t}] = \\lambda\\,dt$, so subtracting $\\lambda\\,dt$ leaves increments with conditional mean zero, hence a martingale.",
    "Draws the analogy: in Itô calculus the $dW$ term has zero expectation, and in jump calculus the compensated jump term plays that role, which is how expectations of value functions reduce to their $dt$ terms."),
  cA.n(SJ, "apply-gbm-mean", 5,
    "For GBM $dS = \\mu S\\,dt + \\sigma S\\,dW$ with $\\mu = 0.05$, what is $\\mathbb{E}[S_2]/S_0$? Give $4$ decimal places.",
    1.1052),
  cA.m(SJ, "apply-intensity-depth", 5, "If buy MOs arrive at rate $\\lambda$ and an LO at depth $\\delta$ fills each with probability $e^{-\\kappa\\delta}$, the agent’s fills form a counting process with intensity:",
    "$\\lambda e^{-\\kappa\\delta_t}$, controlled through the depth", [
      ["$\\lambda$", "Not every MO reaches the agent’s depth."],
      ["$\\kappa\\delta_t$", "The fill rate falls with depth."],
      ["$\\lambda + \\kappa\\delta_t$", "The probability multiplies the rate."],
    ]),

  // level 6
  cA.n(SJ, "apply-jump-diffusion-expectation", 6,
    "$dX_t = 0.1\\,dt + 0.2\\,dW_t + J\\,dN_t$ with $N$ Poisson at rate $3$ and $\\mathbb{E}[J] = -0.02$. What is $\\mathbb{E}[X_1 - X_0]$?",
    0.04),
  cA.s(SJ, "explain-feynman-kac-jumps", 6,
    "State the Feynman–Kac link for a jump-diffusion: what PDE does $u(t, x) = \\mathbb{E}_{t,x}[g(X_T)]$ satisfy?",
    "States that $\\partial_t u + \\mathcal{L}u = 0$ with $u(T, x) = g(x)$, where $\\mathcal{L}$ is the generator.",
    "Gives the generator: drift times $\\partial_x u$ plus $\\tfrac{1}{2}\\sigma^2\\partial_{xx}u$ plus $\\lambda\\,\\mathbb{E}[u(t, x + J) - u(t, x)]$, so the PDE becomes a partial integro-differential equation."),
  cA.n(SJ, "apply-first-arrival", 6,
    "Buy MOs arrive at rate $1.5$ per second and sell MOs at $1$ per second, independently. What is the expected waiting time, in seconds, until the first MO of either kind?",
    0.4),
  cA.m(SJ, "apply-quadratic-variation", 6, "The quadratic variation $[N]_t$ of a Poisson process equals:",
    "$N_t$, since each jump of size one contributes $1^2$", [
      ["$\\lambda t$", "That is its predictable compensator, not the realised quadratic variation."],
      ["$0$", "Jumps contribute to quadratic variation."],
      ["$t$", "That is Brownian motion’s quadratic variation."],
    ]),

  // level 7
  cA.n(SJ, "apply-stochastic-exponential", 7,
    "$Y_t = \\exp\\{\\theta N_t - \\lambda t(e^{\\theta} - 1)\\}$ is a martingale. With $\\theta = 0.5$, $\\lambda = 2$ and $t = 1$, what constant must $Y_1$ average to?",
    1),
  cA.s(SJ, "explain-ito-jump", 7,
    "Apply Itô’s formula to $f(N_t) = N_t^2$ for a Poisson process and find $\\mathbb{E}[N_t^2]$.",
    "Writes $d(N_t^2) = [(N_{t^-} + 1)^2 - N_{t^-}^2]dN_t = (2N_{t^-} + 1)dN_t$, so in expectation $d\\mathbb{E}[N_t^2] = \\lambda(2\\mathbb{E}[N_t] + 1)dt$.",
    "Integrates with $\\mathbb{E}[N_t] = \\lambda t$: $\\mathbb{E}[N_t^2] = \\lambda^2t^2 + \\lambda t$, consistent with $\\text{Var}(N_t) = \\lambda t$."),
  cA.n(SJ, "apply-hawkes-mean", 7,
    "A Hawkes process has intensity $\\lambda_t = \\mu + \\sum_{t_i < t}\\alpha e^{-\\beta(t - t_i)}$ with $\\mu = 1$, $\\alpha = 0.6$ and $\\beta = 1.5$. What is its stationary mean intensity, $\\mu/(1 - \\alpha/\\beta)$? Give $4$ decimal places.",
    1.6667),
  cA.m(SJ, "apply-mean-reverting-intensity", 7, "Chapter 9 models market volume with intensity jumps that decay exponentially. Its intensity solves $d\\lambda_t = \\kappa(\\theta - \\lambda_t)dt + \\eta\\,dN_t$. Its long-run mean is:",
    "$\\theta + \\eta\\,\\bar{\\lambda}/\\kappa$, where $\\bar{\\lambda}$ is the mean jump rate, since jumps push it above $\\theta$", [
      ["$\\theta$", "Positive jumps raise the mean above $\\theta$."],
      ["$\\eta$", "The jump size alone is not the mean."],
      ["Zero", "The intensity is positive."],
    ]),

  // level 8
  cA.n(SJ, "apply-ou-stationary", 8,
    "An OU order-flow process $d\\mu_t = -\\kappa\\mu_t dt + \\eta(dN^{+}_t - dN^{-}_t)$, with buy and sell jumps each at rate $\\lambda$, has stationary variance $\\frac{2\\lambda\\eta^2}{2\\kappa}$. With $\\lambda = 1$, $\\eta = 3$ and $\\kappa = 1.5$, compute it.",
    6),
  cA.s(SJ, "explain-why-jumps", 8,
    "Why do algorithmic-trading models use counting processes and jumps rather than only diffusions?",
    "Explains that the events driving trading are discrete: MO arrivals, fills of limit orders, tick moves of the midprice; their timing and count matter for inventory and cash.",
    "Notes that a diffusion cannot represent a fill that changes inventory by one unit, or a price that jumps by a tick, so the models combine Brownian midprices with controlled counting processes."),
  cA.n(SJ, "apply-compound-mgf", 8,
    "For compound Poisson $X_t = \\sum_{j \\le N_t}J_j$ with $\\lambda = 1$ and $J \\sim \\text{Exponential}$ with mean $2$, $\\mathbb{E}[e^{\\theta X_t}] = \\exp\\{\\lambda t(\\mathbb{E}[e^{\\theta J}] - 1)\\}$ with $\\mathbb{E}[e^{\\theta J}] = 1/(1 - 2\\theta)$. Evaluate at $\\theta = 0.25$ and $t = 1$. Give $4$ decimal places.",
    2.7183),
  cA.m(SJ, "apply-girsanov-jumps", 8, "Changing measure for a Poisson process with intensity $\\lambda$ to one with intensity $\\tilde{\\lambda}$ uses a density that depends on:",
    "The ratio $\\tilde{\\lambda}/\\lambda$ raised to the number of jumps, times $e^{-(\\tilde{\\lambda} - \\lambda)t}$", [
      ["Only the Brownian motion", "A pure-jump process changes measure through its jumps."],
      ["The jump sizes alone", "For a Poisson process the intensity ratio matters."],
      ["Nothing; intensities cannot be changed", "Measure changes can alter intensities."],
    ]),

  // level 9
  cA.s(SJ, "transfer-model-choice", 9,
    "You want a model of buy MO arrivals that reproduces clustering (bursts after large orders) and a U-shaped intraday rate. Propose one and explain how you would fit it.",
    "Proposes a Hawkes process (self-exciting) with a deterministic intraday baseline $\\mu(t)$, or a doubly stochastic process with mean-reverting, jumping intensity as in Chapter 9.",
    "Explains fitting by maximum likelihood on event times (the log-likelihood is $\\sum\\log\\lambda_{t_i} - \\int\\lambda_t\\,dt$), with the baseline from historical intraday profiles, and checking fit via time-rescaled residuals that should be unit exponential."),
  cA.n(SJ, "apply-hawkes-cluster", 9,
    "In a Hawkes process with branching ratio $n = \\alpha/\\beta = 0.4$, what is the expected cluster size (the immigrant plus all its descendants), $1/(1 - n)$? Give $4$ decimal places.",
    1.6667),
  cA.m(SJ, "transfer-time-change", 9, "Time-rescaling says that if $N$ has intensity $\\lambda_t$, then the rescaled event times $\\int_0^{t_i}\\lambda_s\\,ds$ form:",
    "A unit-rate Poisson process, which gives a goodness-of-fit test for intensity models", [
      ["A Brownian motion", "They are event times, not a diffusion."],
      ["A deterministic grid", "They are random."],
      ["The same process", "Rescaling standardises the intensity to one."],
    ]),
  cA.s(SJ, "transfer-pide", 9,
    "Value functions in the market-making chapters satisfy equations with difference terms such as $\\lambda[H(q - 1) - H(q)]$ instead of derivatives in $q$. Explain why, and what this means numerically.",
    "Explains that inventory changes in unit jumps when a fill occurs, so the generator of the inventory process is a difference operator, not a derivative.",
    "Notes the numerical consequence: in $q$ the problem becomes a finite system of ODEs in time (one per inventory level), often solved exactly by matrix exponentials or by stepping backwards in time."),

  // level 10
  cA.s(SJ, "transfer-poisson-limit", 10,
    "Explain how a sum of many independent rare Bernoulli events converges to a Poisson process, and argue when this justifies modelling MO arrivals as Poisson and when it fails.",
    "Explains the law of rare events: with many independent traders each having a small probability of sending an MO in $dt$, arrivals are approximately Poisson with rate equal to the summed probabilities per unit time.",
    "Notes the failure modes: traders react to each other and to news (self-excitation, clustering), and intensities vary through the day, so Poisson is a first approximation that needs random or self-exciting intensities."),
  cA.n(SJ, "apply-ou-integral-variance", 10,
    "For an OU process started at its mean, $\\text{Var}\\left(\\int_0^T X_t\\,dt\\right) \\approx \\frac{\\sigma^2 T}{\\kappa^2}$ for large $T$. With $\\sigma = 0.3$, $\\kappa = 3$ and $T = 100$, compute it.",
    1),
  cA.s(SJ, "transfer-martingale-check", 10,
    "Show that $M_t = N_t^2 - 2\\lambda tN_t + \\lambda^2t^2 - \\lambda t$ is a martingale, and use it to give the variance of $N_t$.",
    "Notes that $M_t = (N_t - \\lambda t)^2 - \\lambda t = \\tilde{N}_t^2 - [\\tilde{N}]^{p}_t$, the compensated square, and verifies via Itô with jumps that its $dt$ terms cancel: $d(\\tilde{N}^2) = 2\\tilde{N}_{t^-}d\\tilde{N}_t + dN_t$.",
    "Concludes that $\\mathbb{E}[(N_t - \\lambda t)^2] = \\lambda t$, so $\\text{Var}(N_t) = \\lambda t$."),
  cA.m(SJ, "transfer-intensity-control", 10, "In the control chapters, why is controlling an intensity (through depth) mathematically different from controlling a drift?",
    "The control changes the rate of discrete jumps, so it enters the HJB through jump-difference terms that are often non-linear in the control, rather than through a first-order derivative term", [
      ["It is the same mathematically", "Drift controls enter via derivatives, intensity controls via differences."],
      ["Intensities cannot be controlled", "Posting depth controls the fill intensity."],
      ["Intensity control always gives bang-bang solutions", "Bang-bang arises only without running penalties; with exponential fill rates the solutions are interior."],
    ]),
];

const hjb: Item[] = [
  // level 1
  c53.m(HJB, "recall-value-function", 1, "The value function $H(t, x)$ of a control problem is:",
    "The best achievable expected performance starting from state $x$ at time $t$", [
      ["The performance of an arbitrary control", "That is the performance criterion $H^{u}$."],
      ["The control itself", "The control is chosen to achieve the value."],
      ["The terminal reward", "The value includes running rewards and future optimisation."],
    ]),
  c53.m(HJB, "recall-dpp", 1, "The dynamic programming principle states that:",
    "The value now equals the best expected value at a later stopping time plus the running reward collected in between", [
      ["The optimal control is constant", "Controls are usually state- and time-dependent."],
      ["The value function is linear", "Value functions are usually non-linear."],
      ["Future decisions do not matter", "Future optimal behaviour is embedded in the later value."],
    ]),
  c53.m(HJB, "recall-hjb", 1, "The HJB equation is:",
    "The infinitesimal form of the dynamic programming principle, a non-linear PDE with a supremum over controls", [
      ["A linear SDE for the state", "It is a PDE for the value function."],
      ["The Black–Scholes equation", "Black–Scholes has no control."],
      ["A martingale condition with no optimisation", "The supremum over controls is essential."],
    ]),
  c53.m(HJB, "recall-admissible", 1, "Admissible controls must be predictable because:",
    "The agent cannot use future information when choosing her action", [
      ["They must be continuous", "Predictability is about information, not continuity."],
      ["They must be constant", "They can vary over time."],
      ["Regulators require it", "It is a modelling requirement against peeking into the future."],
    ]),

  // level 2
  c53.m(HJB, "recall-feedback", 2, "A feedback (Markov) control is one that:",
    "Depends on the current time and state only", [
      ["Depends on the whole history of the state", "Feedback controls use only the current state."],
      ["Is chosen once at time zero", "That is an open-loop control."],
      ["Is random and independent of the state", "Feedback controls react to the state."],
    ]),
  c53.m(HJB, "recall-generator", 2, "For $dX_t = \\mu(X_t, u_t)dt + \\sigma(X_t, u_t)dW_t$, the generator applied to $H$ is:",
    "$\\mu\\,\\partial_x H + \\tfrac{1}{2}\\sigma^2\\partial_{xx}H$", [
      ["$\\mu\\,\\partial_x H$", "The diffusion term is missing."],
      ["$\\partial_t H + \\mu\\,\\partial_x H$", "The time derivative is separate from the generator."],
      ["$\\sigma\\,\\partial_x H$", "Volatility enters through the second derivative."],
    ]),
  c53.m(HJB, "recall-verification", 2, "A verification theorem says that:",
    "If a smooth function solves the HJB with the right terminal condition and its maximiser gives an admissible control, then it is the value function and that control is optimal", [
      ["Every value function is smooth", "Value functions need not be classical solutions."],
      ["The HJB always has a solution", "Existence must be shown."],
      ["Any control satisfying the HJB constraint is optimal", "The maximiser must be admissible and the solution regular."],
    ]),
  c53.n(HJB, "apply-merton-exp", 2,
    "Merton with exponential utility $-e^{-\\gamma x}$, zero interest rate, drift $\\mu = 0.08$, volatility $\\sigma = 0.2$ and $\\gamma = 0.0001$ per dollar. The optimal dollar investment is $\\frac{\\mu - r}{\\gamma\\sigma^2}$. Compute it.",
    20000),

  // level 3
  c53.n(HJB, "apply-merton-crra", 3,
    "With power (CRRA) utility and relative risk aversion $\\gamma = 2$, $\\mu - r = 0.06$ and $\\sigma = 0.2$, the optimal fraction of wealth in the risky asset is $\\frac{\\mu - r}{\\gamma\\sigma^2}$. Compute it.",
    0.75),
  c53.n(HJB, "apply-market-price-risk", 3,
    "The market price of risk is $\\lambda = (\\mu - r)/\\sigma$. With $\\mu = 0.09$, $r = 0.01$ and $\\sigma = 0.25$, compute it. Give $2$ decimal places.",
    0.32),
  c53.m(HJB, "apply-exp-wealth", 3, "In the Merton problem with exponential utility and $r = 0$, the optimal dollar amount invested:",
    "Does not depend on current wealth, because absolute risk aversion is constant", [
      ["Is proportional to wealth", "That is CRRA utility."],
      ["Is zero", "Investing is optimal whenever $\\mu > r$."],
      ["Grows exponentially with wealth", "With CARA utility wealth drops out."],
    ]),
  c53.m(HJB, "apply-sup-pointwise", 3, "In the HJB, the supremum is taken over:",
    "The value of the control at the current time and state only, which is why the optimum can be found pointwise", [
      ["The whole path of controls", "The DPP reduces it to a pointwise choice."],
      ["All past states", "The control acts at the present."],
      ["The terminal condition", "The terminal condition is fixed."],
    ]),

  // level 4
  c53.n(HJB, "apply-first-order-quadratic", 4,
    "An HJB contains $\\sup_{\\pi}\\left\\{a\\pi + \\tfrac{1}{2}b\\pi^2\\right\\}$ with $a = 0.06$ and $b = -0.0002$. What is the maximising $\\pi$?",
    300),
  c53.n(HJB, "apply-max-value", 4,
    "Same expression: what is the maximal value $-a^2/(2b)$?",
    9),
  c53.m(HJB, "apply-concavity", 4, "In the Merton HJB, the supremum over $\\pi$ is attained (rather than infinite) only if:",
    "$\\partial_{xx}H < 0$, so that the quadratic in $\\pi$ is concave", [
      ["$\\partial_x H < 0$", "The value increases in wealth, so $\\partial_x H > 0$."],
      ["$\\mu < r$", "The sign of the excess return sets the direction, not existence."],
      ["$\\sigma = 0$", "Without risk, the problem is linear and unbounded if $\\mu \\ne r$."],
    ]),
  c53.s(HJB, "explain-ansatz", 4,
    "Why do HJB solutions in this book often start from an ansatz such as $H(t, x, S, q) = x + qS + h(t, q)$?",
    "Explains that the terminal condition and the dynamics are linear in cash $x$ and in the book value $qS$, so these parts can be split off exactly.",
    "Explains that this reduces a multi-dimensional non-linear PDE to an equation for $h$ in fewer variables, often an ODE in time after a further ansatz in $q$."),

  // level 5
  c53.n(HJB, "apply-merton-value-exp", 5,
    "With exponential utility, $r = 0$ and market price of risk $\\lambda = 0.4$, the value is $-e^{-\\gamma x - \\frac{1}{2}\\lambda^2(T - t)}$. For $\\gamma x = 1$ and $T - t = 2$, compute it. Give $4$ decimal places.",
    -0.3135),
  c53.s(HJB, "explain-dpp-intuition", 5,
    "Explain intuitively why the dynamic programming principle holds.",
    "Explains that whatever happens up to a later time, an optimal agent then behaves optimally from the state reached, so her continuation value is the value function at that state (Bellman’s principle).",
    "Concludes that today’s value is the supremum over today’s actions of the expected running reward until then plus the value at the later time, an inequality in each direction proved via $\\varepsilon$-optimal controls."),
  c53.m(HJB, "apply-merton-time", 5, "In Merton with exponential utility and positive $r$, using discounted wealth, the optimal dollar investment at time $t$ is proportional to $e^{-r(T - t)}$. This means she invests:",
    "Less early on and more as the horizon approaches, in today’s dollars", [
      ["The same amount at all times", "That holds only when $r = 0$."],
      ["More early on", "The factor $e^{-r(T - t)}$ increases with $t$."],
      ["Nothing until $T$", "She invests throughout."],
    ]),
  c53.n(HJB, "apply-lq-control", 5,
    "Minimise $\\int_0^T u_t^2\\,dt$ subject to $dX = u\\,dt$, $X_0 = 0$, $X_T = 10$, $T = 5$. The optimal control is constant. What is the minimal cost?",
    20),

  // level 6
  c53.s(HJB, "explain-merton-solve", 6,
    "Outline how the exponential-utility Merton HJB is solved.",
    "Writes the HJB, optimises the quadratic in $\\pi$ to get $\\pi^{*} = -\\frac{(\\mu - r)\\partial_x H}{\\sigma^2\\partial_{xx}H}$, and substitutes back to get a non-linear PDE.",
    "Uses the ansatz $H = -\\exp\\{-\\gamma xe^{r(T - t)} - \\beta(t)\\}$ (independent of $S$) so the PDE reduces to ODEs, giving $\\pi^{*} = \\frac{\\mu - r}{\\gamma\\sigma^2}e^{-r(T - t)}$."),
  c53.n(HJB, "apply-certainty-equivalent", 6,
    "With exponential utility $\\gamma = 0.0001$, $r = 0$, $\\lambda = 0.4$ and horizon $T = 1$, the certainty-equivalent gain from optimal investing is $\\frac{\\lambda^2 T}{2\\gamma}$ dollars. Compute it.",
    800),
  c53.m(HJB, "apply-liquidation-impact", 6, "In the toy liquidation problem (5.3), the agent’s own trading enters the midprice dynamics. What distinguishes this from the Merton problem?",
    "Her actions affect the price of the asset she trades, not just her wealth", [
      ["Prices are deterministic", "Prices are stochastic in both."],
      ["There is no terminal condition", "Liquidation has a terminal condition."],
      ["Utility is linear", "The distinction is the price impact, not utility."],
    ]),
  c53.n(HJB, "apply-lq-penalty", 6,
    "Minimise $\\int_0^T (u_t^2 + \\phi X_t^2)\\,dt$ with $dX = u\\,dt$, $X_0 = x$ and free endpoint, for $T \\to \\infty$. The value is $\\sqrt{\\phi}\\,x^2$. With $\\phi = 4$ and $x = 3$, compute it.",
    18),

  // level 7
  c53.s(HJB, "explain-hjb-derivation", 7,
    "Derive the HJB from the DPP for a diffusion in outline.",
    "Applies the DPP over a short interval $[t, t + h]$ with a constant control, writes $H(t + h, X_{t+h})$ by Itô’s lemma, and uses that the stochastic integral has zero mean.",
    "Divides by $h$ and lets $h \\to 0$ to get $\\partial_t H + \\mathcal{L}^{u}H + F \\le 0$ for every $u$, with equality for the optimal control, hence $\\partial_t H + \\sup_u\\{\\mathcal{L}^{u}H + F\\} = 0$."),
  c53.n(HJB, "apply-lq-riccati", 7,
    "For minimising $\\mathbb{E}\\int_0^\\infty e^{-\\rho t}(u^2 + X^2)dt$ with $dX = u\\,dt + \\sigma dW$, the stationary value is $Px^2 + c$ with $P$ solving $P^2 + \\rho P - 1 = 0$, $P > 0$. With $\\rho = 0$, what is the optimal feedback $u^{*} = -Px$ at $x = 2$?",
    -2),
  c53.m(HJB, "apply-viscosity", 7, "When the value function is not smooth enough to satisfy the HJB classically, the theory uses:",
    "Viscosity solutions, a weak notion of solution that still characterises the value function", [
      ["The Black–Scholes formula", "That is specific to option pricing."],
      ["Monte Carlo simulation only", "Simulation is a numerical method, not a solution concept."],
      ["Nothing; the problem has no value", "The value exists; only regularity fails."],
    ]),
  c53.n(HJB, "apply-merton-shares", 7,
    "With exponential utility, $\\gamma = 2 \\times 10^{-5}$ per dollar, $\\mu - r = 0.05$, $\\sigma = 0.25$ and $r = 0$, how many shares should a trader hold if the stock trades at \\$40?",
    1000),

  // level 8
  c53.s(HJB, "explain-markov-sufficiency", 8,
    "The book notes that searching over Markov controls is enough under general conditions. Why is this important in practice?",
    "Explains that the optimum over all predictable controls is attained by a feedback control $u^{*}(t, X_t)$, so the agent needs only the current state, not the whole history.",
    "Concludes that strategies can be stored as functions of a few state variables (time, inventory, price, order flow), computed offline and evaluated in real time, which is essential for high-frequency trading."),
  c53.n(HJB, "apply-hara-fraction", 8,
    "With HARA-type utility $\\frac{(x - L)^{1 - \\gamma}}{1 - \\gamma}$ (a subsistence level $L$), the optimal risky investment is $\\frac{\\mu - r}{\\gamma\\sigma^2}(x - L)$ when $r = 0$. With $x = 150{,}000$, $L = 50{,}000$, $\\gamma = 2$, $\\mu = 0.06$ and $\\sigma = 0.2$, compute it.",
    75000),
  c53.m(HJB, "apply-penalty-vs-utility", 8, "In later chapters, a risk-neutral agent with a running inventory penalty $\\phi\\int q^2\\,dt$ often behaves like an exponential-utility agent. The link is roughly:",
    "$\\phi \\approx \\tfrac{1}{2}\\gamma\\sigma^2$, the variance penalty implied by CARA utility", [
      ["$\\phi = \\gamma$", "The volatility enters the mapping."],
      ["$\\phi = \\sigma$", "Risk aversion enters too."],
      ["There is no link", "The book shows an exact mapping in the execution problem."],
    ]),
  c53.s(HJB, "explain-separation", 8,
    "In the Merton problem with exponential utility, why does the ansatz $H(t, x, S) = h(t, x)$ work?",
    "Notes that the terminal utility depends only on wealth, and the asset’s dynamics (GBM with constant parameters) make the optimal investment problem the same at every price level.",
    "Concludes that the HJB contains no explicit $S$-dependence once $\\pi$ is optimised, so a solution independent of $S$ exists, which the verification theorem confirms is the value function."),

  // level 9
  c53.s(HJB, "transfer-liquidation-formulate", 9,
    "Formulate the optimal liquidation of $\\mathfrak{N}$ shares as a stochastic control problem: state the state variables, control, dynamics and objective.",
    "Names the state (time, cash $x$, midprice $S$, inventory $q$), the control (trading speed $\\nu_t \\ge 0$), and the dynamics $dq = -\\nu\\,dt$, $dS = -g(\\nu)dt + \\sigma dW$, $dx = (S - f(\\nu))\\nu\\,dt$.",
    "Gives the objective: maximise $\\mathbb{E}[x_T + q_T(S_T - \\alpha q_T) - \\phi\\int_t^T q_s^2\\,ds]$ over admissible strategies, with a terminal penalty for unsold shares and a running inventory penalty."),
  c53.n(HJB, "apply-merton-ce-horizon", 9,
    "For a CARA investor with $\\gamma = 0.0001$, $r = 0$ and $\\lambda = 0.3$, how many years $T$ must she invest for the certainty-equivalent gain $\\frac{\\lambda^2 T}{2\\gamma}$ to reach \\$1{,}800?",
    4),
  c53.m(HJB, "transfer-numerical", 9, "For an HJB in two state variables with no closed form, a standard numerical approach is:",
    "A finite-difference scheme stepping backwards from the terminal condition, optimising the control at each grid point", [
      ["Forward Euler simulation of the SDE alone", "Simulation does not optimise the control."],
      ["Solving for the control first, then the value", "The control depends on the value function’s derivatives."],
      ["Linear regression on terminal payoffs", "Regression methods exist, but finite differences are standard."],
    ]),
  c53.s(HJB, "transfer-model-risk", 9,
    "An HJB-derived strategy depends on estimated parameters such as $\\mu$ and $\\sigma$. Discuss how parameter uncertainty affects the Merton strategy and one way to make it robust.",
    "Explains that the Merton investment is proportional to $\\mu - r$, which is estimated very imprecisely, so the strategy can be badly wrong and highly leveraged.",
    "Proposes shrinking the drift estimate, using robust or ambiguity-averse control (penalising model misspecification), or adding constraints on positions."),

  // level 10
  c53.s(HJB, "transfer-verification-check", 10,
    "You propose a candidate value function for a control problem. List what you must check before concluding it is optimal, and why each matters.",
    "Checks that it solves the HJB and the terminal condition, has enough regularity (once in $t$, twice in the diffusive states) to apply Itô’s lemma.",
    "Checks that the maximising feedback control is admissible (predictable, bounded or with integrable dynamics) and that local martingale terms are true martingales, otherwise the candidate may not equal the value."),
  c53.n(HJB, "apply-two-asset-merton", 10,
    "CARA Merton with two uncorrelated assets: excess returns $0.06$ and $0.04$, volatilities $0.2$ and $0.1$, $\\gamma = 10^{-4}$ and $r = 0$. The optimal dollar vector is $\\frac{1}{\\gamma}\\Sigma^{-1}(\\boldsymbol{\\mu} - r)$. What is the total dollar amount invested?",
    55000),
  c53.s(HJB, "transfer-time-consistency", 10,
    "Why are objectives with a running penalty or expected utility time-consistent, while a mean–variance objective on terminal wealth is not, and why does that matter for dynamic programming?",
    "Explains that expected utility and additive penalties satisfy the tower property, so the optimal continuation from any state is the same as the original plan, which is what the DPP needs.",
    "Explains that variance of terminal wealth is not an expectation of a function of terminal wealth (it involves the square of an expectation), so the plan made today is not optimal tomorrow; DP must use tricks (pre-commitment, embedding) or a running-penalty proxy."),
  c53.m(HJB, "transfer-ergodic", 10, "For a market maker operating far from the end of the day, the optimal controls in the book become nearly time-independent. Mathematically this reflects:",
    "Convergence of the finite-horizon value function to a stationary (ergodic) solution as the horizon recedes", [
      ["That the HJB has no time derivative ever", "The time derivative vanishes only asymptotically."],
      ["That inventory is irrelevant", "Controls still depend on inventory."],
      ["Numerical error", "It is a genuine property of the solution."],
    ]),
];

const counting: Item[] = [
  // level 1
  c54.m(CCP, "recall-controlled-intensity", 1, "In a control problem for counting processes, the agent typically controls:",
    "The intensity at which jumps occur, for example through the depth of a limit order", [
      ["The size of each Brownian increment", "Brownian increments are not controlled."],
      ["The jump size of the Poisson process", "Each jump is a single fill; the rate is what she controls."],
      ["The terminal date", "The horizon is fixed."],
    ]),
  c54.m(CCP, "recall-dpe-counting", 1, "The DPE for a counting process with controlled intensity $\\lambda(u)$ contains the term:",
    "$\\lambda(u)[H(t, n + 1) - H(t, n)]$, the rate of jumps times the change in value", [
      ["$\\lambda(u)\\partial_n H$", "$n$ jumps by one; there is no derivative in $n$."],
      ["$\\tfrac{1}{2}\\lambda(u)^2\\partial_{nn}H$", "That is diffusion-like and wrong here."],
      ["$H(t, n)\\log\\lambda(u)$", "That is not the generator."],
    ]),
  c54.m(CCP, "recall-bang-bang", 1, "A bang-bang control is one that:",
    "Switches between extreme values of the admissible set", [
      ["Changes smoothly with the state", "Smooth controls are interior solutions."],
      ["Makes noise", "The name refers to jumping between bounds."],
      ["Is constant at an interior value", "It sits at the boundaries."],
    ]),
  c54.m(CCP, "recall-exp-fill", 1, "A popular fill-probability model, given that an MO arrives, is $P(\\delta) = e^{-\\kappa\\delta}$. Here $\\kappa$:",
    "Measures how quickly the fill probability decays with depth", [
      ["Is the MO arrival rate", "That is $\\lambda$."],
      ["Is the tick size", "$\\kappa$ has units of one over price."],
      ["Is the agent’s risk aversion", "It describes the market, not the agent."],
    ]),

  // level 2
  c54.n(CCP, "apply-fill-rate", 2,
    "MOs arrive at $\\lambda = 50$ per minute and $P(\\delta) = e^{-\\kappa\\delta}$ with $\\kappa = 100$ per dollar. What is the fill rate per minute for a depth of $2$ cents? Give $2$ decimal places.",
    6.77),
  c54.n(CCP, "apply-depth-unconstrained", 2,
    "Ignoring inventory, a risk-neutral agent maximises $\\delta\\,\\lambda e^{-\\kappa\\delta}$. With $\\kappa = 100$ per dollar, what depth does she choose, in cents?",
    1),
  c54.n(CCP, "apply-power-fill", 2,
    "With fill probability $(1 + \\kappa\\delta)^{-1}$ and $\\kappa = 100$, what is the fill probability at $\\delta = 3$ cents?",
    0.25),
  c54.m(CCP, "recall-round-trip", 2, "In the book’s Section 5.4 example, the agent completes a round trip by:",
    "Buying with an MO at the ask and selling with an LO posted at the midprice plus a chosen depth", [
      ["Buying and selling with MOs", "She uses an LO for the sale."],
      ["Posting LOs on both sides", "The example uses an MO for the purchase."],
      ["Trading in the dark pool", "The example is in the lit market."],
    ]),

  // level 3
  c54.n(CCP, "apply-round-trip-depth", 3,
    "In the round-trip example, she pays the half-spread $\\Delta/2$ to buy and earns depth $\\delta$ when her sell LO fills, so she maximises $(\\delta - \\Delta/2)\\lambda e^{-\\kappa\\delta}$. With $\\Delta = 2$ cents and $\\kappa = 100$ per dollar, what is $\\delta^{*}$ in cents?",
    2),
  c54.n(CCP, "apply-round-trip-profit-rate", 3,
    "Same setting with $\\lambda = 50$ per minute. What is the expected profit rate per minute, $(\\delta^{*} - \\Delta/2)\\lambda e^{-\\kappa\\delta^{*}}$, in cents? Give $2$ decimal places.",
    6.77),
  c54.m(CCP, "apply-bang-bang-reason", 3, "If the agent controls $\\lambda(u)$ directly with $F = 0$, linear in $\\lambda$, the optimal control is bang-bang because:",
    "The HJB is linear in $\\lambda$, so the optimum is at the maximum rate if $H(n + 1) > H(n)$ and at the minimum otherwise", [
      ["The value function is convex in $\\lambda$", "Linearity, not convexity, gives the boundary solution."],
      ["Intensities must be integers", "Intensities are real-valued."],
      ["The problem has no solution", "It has a boundary solution."],
    ]),
  c54.n(CCP, "apply-expected-fills", 3,
    "With fill intensity $\\lambda e^{-\\kappa\\delta} = 6$ per minute held fixed for $5$ minutes, what is the expected number of fills?",
    30),

  // level 4
  c54.n(CCP, "apply-depth-power", 4,
    "With fill probability $(1 + \\kappa\\delta)^{-1}$, maximising $(\\delta - \\Delta/2)(1 + \\kappa\\delta)^{-1}$ has no interior maximum in this form. Instead maximise $\\delta(1 + \\kappa\\delta)^{-2}$, whose optimum is $\\delta = 1/\\kappa$. With $\\kappa = 50$, give the optimal depth in cents.",
    2),
  c54.s(CCP, "explain-round-trip-solution", 4,
    "Interpret the optimal posting $\\delta^{*} = \\Delta/2 + 1/\\kappa$ in the Section 5.4 round-trip example.",
    "Explains that she must at least recover the half-spread $\\Delta/2$ she paid to buy with an MO, so her sell LO sits that far above the mid before earning anything.",
    "Explains that beyond this she adds $1/\\kappa$, the depth that optimally trades margin against fill probability, independent of time and wealth because the problem is linear with no inventory risk."),
  c54.n(CCP, "apply-dpe-term", 4,
    "In a DPE, the jump term is $\\lambda e^{-\\kappa\\delta}[H(n + 1) - H(n)]$. With $\\lambda = 2$, $\\kappa\\delta = 0.5$ and $H(n + 1) - H(n) = 3$, compute it. Give $4$ decimal places.",
    3.6392),
  c54.m(CCP, "apply-combined", 4, "When a controlled counting process drives a secondary process $X$ (such as cash), the DPE contains:",
    "$\\lambda(u)[H(t, x + \\gamma(u), n + 1) - H(t, x, n)]$, the joint change in $X$ and $N$ at a jump", [
      ["Only $\\partial_x H$", "Jumps in $X$ require difference terms."],
      ["Only the $N$ difference", "$X$ jumps too."],
      ["No jump terms", "Jumps are the essence of the problem."],
    ]),

  // level 5
  c54.n(CCP, "apply-first-order-depth", 5,
    "Maximise $e^{-\\kappa\\delta}(\\delta + c)$ over $\\delta$, where $c$ is a constant from the value function. The optimum is $\\delta^{*} = 1/\\kappa - c$. With $\\kappa = 100$ and $c = -0.005$, find $\\delta^{*}$ in cents.",
    1.5),
  c54.s(CCP, "explain-limitations-example", 5,
    "The book lists limitations of the simple Section 5.4 posting example. Name two and say which later chapter addresses them.",
    "Names the absence of inventory risk and terminal liquidation (she can always unwind at no cost) and the constant fill rate, unaffected by the state of the book.",
    "Names the absence of adverse selection (MOs do not move the price) and points to Chapters 8 and 10, which add inventory penalties, terminal conditions and adverse selection."),
  c54.m(CCP, "apply-fill-models", 5, "Compared with $e^{-\\kappa\\delta}$, the fill model $(1 + \\kappa\\delta)^{-1}$:",
    "Has a heavier tail, so deep orders fill more often", [
      ["Decays faster", "A power law decays more slowly than an exponential."],
      ["Equals one everywhere", "It decreases with depth."],
      ["Is increasing in depth", "It decreases."],
    ]),
  c54.n(CCP, "apply-intensity-ratio", 5,
    "By how much does posting $1$ cent deeper multiply the fill intensity when $\\kappa = 100$ per dollar? Give $4$ decimal places.",
    0.3679),

  // level 6
  c54.s(CCP, "explain-difference-operator", 6,
    "Explain why the dynamic programming equation for counting processes is a system of ODEs indexed by $n$ when the state is the count alone.",
    "Explains that with state $(t, n)$ and integer $n$, the generator involves only $H(t, n + 1) - H(t, n)$, so each $H(\\cdot, n)$ satisfies an ODE in $t$ coupled to $H(\\cdot, n + 1)$.",
    "Notes that the system can be solved backwards from the terminal condition, level by level when the coupling runs one way, or as a matrix ODE when it couples neighbours both ways."),
  c54.n(CCP, "apply-expected-time-to-fill", 6,
    "A sell LO at depth $\\delta$ fills at rate $\\lambda e^{-\\kappa\\delta}$ with $\\lambda = 0.5$ per second and $\\kappa\\delta = 1$. What is the expected waiting time to a fill, in seconds? Give $2$ decimal places.",
    5.44),
  c54.m(CCP, "apply-adverse-in-example", 6, "In the Section 5.4 example, why does posting deeper not expose the agent to adverse selection?",
    "Fills are assumed independent of future price moves, so being filled carries no information", [
      ["Deep orders never fill", "They fill less often, not never."],
      ["She is risk-averse", "She is risk-neutral in the example."],
      ["Prices are constant", "The midprice moves, but independently of fills."],
    ]),
  c54.n(CCP, "apply-optimal-depth-penalty", 6,
    "With the value-function difference $h(q - 1) - h(q) = -0.004$, the optimal sell depth is $\\delta^{*} = 1/\\kappa - [h(q - 1) - h(q)]$. With $\\kappa = 200$ per dollar, compute it in cents.",
    0.9),

  // level 7
  c54.s(CCP, "explain-dpe-derivation", 7,
    "Derive the DPE $\\partial_t H + \\sup_u\\{\\lambda(u)[H(t, n + 1) - H(t, n)] + F\\} = 0$ in outline.",
    "Applies the DPP over a short interval with a constant control, writes $H(\\tau, N_\\tau)$ via the jump Itô formula, and uses that the compensated jump integral is a martingale with zero mean.",
    "Divides by $h$, lets $h \\to 0$, and argues equality for the optimal control, giving the DPE with terminal condition $H(T, n) = G(n)$."),
  c54.n(CCP, "apply-depth-negative", 7,
    "With $\\kappa = 100$ and $h(q - 1) - h(q) = 0.015$, the formula $\\delta^{*} = 1/\\kappa - [h(q - 1) - h(q)]$ gives a negative depth. What is it, in cents?",
    -0.5),
  c54.m(CCP, "apply-negative-depth-meaning", 7, "A negative optimal depth for a sell LO signals that:",
    "The agent would rather sell immediately, so the problem should allow an MO or impose $\\delta \\ge 0$", [
      ["She should buy instead", "The urgency is to sell, not buy."],
      ["The model is meaningless", "It shows that a constraint binds."],
      ["She should post at infinity", "Infinite depth means never selling."],
    ]),
  c54.s(CCP, "explain-mixed-dpe", 7,
    "Write the DPE for a problem with a Brownian midprice $S$ and a controlled counting process $N$ of fills, and identify each term.",
    "Writes $\\partial_t H + \\tfrac{1}{2}\\sigma^2\\partial_{SS}H + \\sup_\\delta\\{\\lambda e^{-\\kappa\\delta}[H(t, x + S + \\delta, S, q - 1) - H(t, x, S, q)]\\} = 0$.",
    "Identifies the diffusion of the midprice, the rate of fills, and the jump in cash (by $S + \\delta$) and inventory (by $-1$) when a fill occurs."),

  // level 8
  c54.n(CCP, "apply-liquidation-q1", 8,
    "Liquidating one share with LOs, the excess value $h(t)$ above the midprice satisfies $h' + \\frac{\\lambda}{\\kappa}e^{-1}e^{-\\kappa h} = 0$, $h(T) = 0$ when no penalty is paid. The solution is $h(t) = \\frac{1}{\\kappa}\\log\\left(1 + \\frac{\\lambda}{e}(T - t)\\right)$. With $\\lambda = 1$ per second, $\\kappa = 100$ and $T - t = 10$ seconds, compute $h$ in cents. Give $3$ decimal places.",
    1.543),
  c54.s(CCP, "explain-intensity-nonlinearity", 8,
    "Why does the supremum over depth in these DPEs typically produce exponential non-linearities such as $e^{-\\kappa(\\cdot)}$ in the value-function differences?",
    "Explains that optimising $e^{-\\kappa\\delta}(\\delta + c)$ gives $\\delta^{*} = 1/\\kappa - c$ and a maximal value $\\frac{1}{\\kappa}e^{-1}e^{\\kappa c}$, exponential in the value difference $c$.",
    "Notes that this structure allows the substitution $h = \\frac{1}{\\kappa}\\log\\omega$, which turns the non-linear system into a linear one for $\\omega$, solvable by matrix exponentials."),
  c54.n(CCP, "apply-omega-transform", 8,
    "With $h = \\frac{1}{\\kappa}\\log\\omega$ and $\\kappa = 100$, a value $\\omega = 5$ corresponds to what excess value $h$, in cents? Give $3$ decimal places.",
    1.609),
  c54.m(CCP, "apply-jump-diffusion-control", 8, "In a combined diffusion-and-jump control problem, the agent may control:",
    "The drift, the volatility, the jump sizes and the jump intensities, each entering the DPE through its own term", [
      ["Only the drift", "Jump features can also be controlled."],
      ["Only the intensity", "Other features can be controlled too."],
      ["Nothing, since jumps make control impossible", "Control is well defined with jumps."],
    ]),

  // level 9
  c54.s(CCP, "transfer-formulate-mm", 9,
    "Formulate the market maker’s problem of Chapter 10 using the tools of this section: state, controls, counting processes and DPE.",
    "Names the state $(t, x, S, q)$, the controls $\\delta^{\\pm}$, and the fill processes $N^{\\pm}$ with intensities $\\lambda^{\\pm}e^{-\\kappa^{\\pm}\\delta^{\\pm}}$, with cash and inventory jumping at fills.",
    "Writes the DPE with a diffusion term for $S$, a running inventory penalty $-\\phi q^2$, and two sup terms over $\\delta^{\\pm}$ with jump differences in $(x, q)$, plus a terminal liquidation condition."),
  c54.n(CCP, "apply-liquidation-q1-limit", 9,
    "In the one-share example, $h(t) = \\frac{1}{\\kappa}\\log(1 + \\frac{\\lambda}{e}(T - t))$ and the optimal depth is $\\delta^{*} = \\frac{1}{\\kappa} + h(t)$. With $\\lambda = 1$, $\\kappa = 100$ and $T - t = 10$, compute $\\delta^{*}$ in cents. Give $3$ decimal places.",
    2.543),
  c54.m(CCP, "transfer-time-dependence", 9, "In the one-share LO liquidation, why does the optimal depth fall as $T$ approaches?",
    "With less time left, the chance of a fill before the deadline falls, so she posts closer to the mid to raise the fill rate", [
      ["Volatility rises near $T$", "Volatility is constant."],
      ["The spread narrows near $T$", "The spread is exogenous."],
      ["She becomes more risk-averse", "She is risk-neutral; time drives the effect."],
    ]),
  c54.s(CCP, "transfer-calibrate", 9,
    "Explain how to estimate $\\lambda$ and $\\kappa$ in the fill model $\\lambda e^{-\\kappa\\delta}$ from market data.",
    "Proposes estimating $\\lambda$ as the rate of MOs on each side, and for each depth $\\delta$, the fraction of MOs large enough to reach that depth (walk the book past it), from LOB and trade data.",
    "Fits $\\log$ of the empirical fill fraction against $\\delta$ by regression (slope $-\\kappa$), checking the exponential fit and its stability through the day."),

  // level 10
  c54.s(CCP, "transfer-nonexp-fill", 10,
    "If the fill probability were $(1 + \\kappa\\delta)^{-\\beta}$ rather than exponential, what changes in solving the DPE, and what stays the same?",
    "Explains that the first-order condition for depth changes, so the optimal depth is no longer $1/\\kappa$ minus a value difference, and the convenient logarithmic transform to a linear system no longer applies.",
    "States what stays: the structure of the DPE (jump-difference terms, terminal conditions, the ansatz splitting cash and book value) and the qualitative behaviour (deeper posts when inventory or time pressure is low); the system is solved numerically."),
  c54.n(CCP, "apply-optimal-depth-compare", 10,
    "Compare the optimal depth maximising $\\delta\\,(1 + \\kappa\\delta)^{-\\beta}$ for $\\beta = 3$ and $\\kappa = 100$, which is $\\delta^{*} = \\frac{1}{\\kappa(\\beta - 1)}$, with the exponential model’s $1/\\kappa$. What is the power-law optimum in cents?",
    0.5),
  c54.s(CCP, "transfer-competition", 10,
    "The single-agent models treat fill probabilities as exogenous. Discuss how competition among many market makers using the same model would affect those probabilities and the validity of the solution.",
    "Explains that other market makers’ quotes determine the depth already in the book, so if many use similar strategies, the fill-probability curve shifts as they react, making $\\kappa$ and $\\lambda$ endogenous.",
    "Concludes that the single-agent solution is a best response to a fixed environment; in equilibrium one would need to model strategic interaction (a game), or recalibrate frequently as the environment changes."),
  c54.m(CCP, "transfer-bang-bang-trading", 10, "In which trading problem would you expect a bang-bang control?",
    "When the agent decides only whether to post at the touch or not, with a linear objective, as in Section 10.2.2", [
      ["When choosing a continuous depth with exponential fill rates", "That gives interior solutions."],
      ["In the Merton problem", "Merton’s control is interior and smooth."],
      ["In the Almgren–Chriss schedule", "Almgren–Chriss gives smooth trading speeds."],
    ]),
];

const stopping: Item[] = [
  // level 1
  c55.m(OS, "recall-stopping-time", 1, "A stopping time $\\tau$ is a random time such that:",
    "Whether $\\tau \\le t$ can be determined from information available at $t$", [
      ["It is always finite", "Stopping times can be infinite with positive probability."],
      ["It is chosen at time zero", "It depends on the evolving information."],
      ["It looks into the future", "It must not peek into the future."],
    ]),
  c55.m(OS, "recall-vi", 1, "An optimal stopping problem’s value function satisfies a variational inequality of the form:",
    "$\\max\\{\\partial_t H + \\mathcal{L}H,\\; G - H\\} = 0$", [
      ["$\\partial_t H + \\mathcal{L}H = 0$ everywhere", "That holds only in the continuation region."],
      ["$H = G$ everywhere", "That holds only in the stopping region."],
      ["$\\sup_u\\{\\mathcal{L}^{u}H\\} = 0$", "That is an HJB without stopping."],
    ]),
  c55.m(OS, "recall-regions", 1, "In the stopping region, the value function:",
    "Equals the reward $G$ of stopping now", [
      ["Exceeds $G$", "That is the continuation region."],
      ["Is zero", "It equals the stopping reward."],
      ["Satisfies the linear PDE", "The PDE holds in the continuation region."],
    ]),
  c55.m(OS, "recall-qvi", 1, "Combining optimal stopping with control leads to:",
    "A quasi-variational inequality, with a supremum over controls inside the continuation part", [
      ["A linear PDE", "Control introduces non-linearity."],
      ["A plain variational inequality", "The control makes it quasi-variational."],
      ["An algebraic equation", "It is a PDE inequality."],
    ]),

  // level 2
  c55.n(OS, "apply-two-period", 2,
    "You can stop now for a reward of $5$, or wait one period and receive $8$ or $2$ with equal probability (then stop). What is the value of the problem?",
    5),
  c55.n(OS, "apply-two-period-wait", 2,
    "Same, but waiting gives $10$ or $2$ with equal probability. What is the value?",
    6),
  c55.m(OS, "recall-continuation", 2, "In the continuation region, the value process (with no running reward) is:",
    "A martingale", [
      ["A supermartingale strictly", "Strict decrease happens where it would be optimal to stop."],
      ["Deterministic", "It is random."],
      ["Equal to the reward", "It exceeds the reward there."],
    ]),
  c55.m(OS, "recall-american", 2, "Pricing an American option is an optimal stopping problem because:",
    "The holder chooses when to exercise to maximise the expected discounted payoff", [
      ["The exercise date is fixed", "That is a European option."],
      ["It has no payoff", "Its payoff is collected on exercise."],
      ["It requires control of the drift", "There is no control of the dynamics."],
    ]),

  // level 3
  c55.n(OS, "apply-three-period", 3,
    "Backward induction: at $t = 2$ you must stop, receiving $X_2$. At $t = 1$ the reward of stopping is $4$, and continuing gives $\\mathbb{E}[X_2] = 5$. At $t = 0$ stopping gives $4.5$. What is the value at $t = 0$, assuming the state at $t = 1$ is known in advance?",
    5),
  c55.n(OS, "apply-discounted-stop", 3,
    "A reward of $10$ is available now, or $12$ for sure in one period with discount factor $0.9$. What is the value?",
    10.8),
  c55.m(OS, "apply-supermartingale", 3, "The value process of an optimal stopping problem (with no running reward) is:",
    "The smallest supermartingale that dominates the reward process (the Snell envelope)", [
      ["The largest submartingale below the reward", "The value dominates the reward."],
      ["Always a martingale", "It strictly decreases where stopping is optimal and the reward falls."],
      ["Equal to the reward", "It exceeds the reward in the continuation region."],
    ]),
  c55.m(OS, "apply-smooth-pasting", 3, "For many diffusion stopping problems, the value function meets the reward at the boundary with:",
    "Matching value and matching first derivative (smooth pasting)", [
      ["A jump in value", "Value matching holds at the boundary."],
      ["A kink only", "Smooth pasting rules out a kink for diffusions with smooth rewards."],
      ["No contact", "The value meets the reward at the boundary."],
    ]),

  // level 4
  c55.n(OS, "apply-perpetual-put-threshold", 4,
    "The perpetual American put on GBM with rate $r$ and volatility $\\sigma$ is exercised when $S \\le S^{*} = \\frac{\\beta K}{1 + \\beta}$ with $\\beta = 2r/\\sigma^2$. With $K = 100$, $r = 0.05$ and $\\sigma = 0.25$, compute $S^{*}$. Give $2$ decimal places.",
    61.54),
  c55.s(OS, "explain-vi-meaning", 4,
    "Interpret the two parts of the variational inequality $\\max\\{\\partial_t H + \\mathcal{L}H, G - H\\} = 0$.",
    "Explains that $H \\ge G$ everywhere, since stopping now is always available, and where $H > G$ (continuation) the value is a martingale: $\\partial_t H + \\mathcal{L}H = 0$.",
    "Explains that where $H = G$ (stopping), $\\partial_t H + \\mathcal{L}H \\le 0$: continuing would make the value a supermartingale, so it is optimal to stop."),
  c55.n(OS, "apply-geometric-stop", 4,
    "Each period you can stop and take $10$, or continue and pay $1$; the reward then rises to $12$ with probability $0.5$ or stays at $10$. You may stop only once, after one more period at most. What is the value of continuing one period?",
    10),
  c55.m(OS, "apply-stop-boundary", 4, "In a time-dependent stopping problem, the optimal stopping rule is described by:",
    "A boundary in time–state space separating the continuation and stopping regions", [
      ["A single fixed time", "The rule depends on the state."],
      ["A fixed price level for all time", "The boundary generally moves with time."],
      ["A random number drawn at time zero", "The rule is adapted to information."],
    ]),

  // level 5
  c55.n(OS, "apply-perpetual-put-value", 5,
    "With $S^{*} = 61.54$, $\\beta = 1.6$ and $K = 100$, the perpetual put value for $S > S^{*}$ is $(K - S^{*})(S/S^{*})^{-\\beta}$. Compute it at $S = 80$. Give $2$ decimal places.",
    25.28),
  c55.s(OS, "explain-snell", 5,
    "Explain the Snell envelope by backward induction in a discrete-time stopping problem.",
    "Defines $V_N = G_N$ at the final date and, going backwards, $V_n = \\max\\{G_n, \\mathbb{E}[V_{n+1} \\mid \\mathcal{F}_n]\\}$: stop or continue, whichever is better.",
    "Notes that the optimal stopping time is the first time $V_n = G_n$, and that $V$ is the smallest supermartingale dominating $G$."),
  c55.m(OS, "apply-no-stop", 5, "If the reward process $G_t$ is a submartingale and there is no discounting, it is optimal to:",
    "Wait until the last possible time", [
      ["Stop immediately", "The expected reward increases by waiting."],
      ["Never stop", "With a finite horizon you stop at the end."],
      ["Stop at a random time independent of $G$", "Waiting to the end dominates."],
    ]),
  c55.n(OS, "apply-discrete-dp", 5,
    "A reward $G = S$ with $S$ moving $\\pm 1$ with equal probability each period, horizon $2$ periods, discount factor $0.95$ per period, $S_0 = 10$. What is the value at time zero? Give $2$ decimal places.",
    10),

  // level 6
  c55.s(OS, "explain-qvi-terms", 6,
    "In the execution chapter with limit and market orders, the QVI has the form $\\max\\{\\partial_t H + \\sup_\\delta(\\cdot),\\; H(\\text{after MO}) - H\\} = 0$. Interpret it.",
    "Explains that at each instant the agent either continues posting LOs at an optimally chosen depth (the first part satisfies the HJB) or executes an MO, an impulse that jumps the state.",
    "Explains that the MO is used where its immediate value (after paying the spread) exceeds continuing, defining an execution boundary in inventory and time."),
  c55.n(OS, "apply-perpetual-call-dividend", 6,
    "A perpetual problem $\\sup_\\tau\\mathbb{E}[e^{-\\rho\\tau}(X_\\tau - c)]$ with Brownian $X$ (no drift, volatility $\\sigma$) has threshold $x^{*} = c + \\sigma/\\sqrt{2\\rho}$. With $c = 1$, $\\sigma = 0.5$ and $\\rho = 0.125$, compute $x^{*}$.",
    2),
  c55.m(OS, "apply-discount-urgency", 6, "In the pairs-trading exit problem, a higher discount rate $\\rho$:",
    "Lowers the exit threshold, since waiting is more costly", [
      ["Raises the exit threshold", "Impatience makes her accept less."],
      ["Has no effect", "Discounting affects the value of waiting."],
      ["Forces immediate exit always", "She still waits when the factor is far below the threshold."],
    ]),
  c55.n(OS, "apply-brownian-threshold-value", 6,
    "Same problem: the value for $x < x^{*}$ is $(x^{*} - c)e^{\\sqrt{2\\rho}(x - x^{*})/\\sigma}$. Compute it at $x = 1$. Give $4$ decimal places.",
    0.3679),

  // level 7
  c55.s(OS, "explain-smooth-fit", 7,
    "Why does smooth pasting (equal first derivatives at the boundary) characterise the optimal threshold in diffusion stopping problems?",
    "Explains that among candidate thresholds, value matching alone gives a family of solutions; a kink at the boundary would mean a nearby threshold gives a higher value.",
    "Explains that optimality picks the threshold where the derivatives match, the first-order condition for maximising the value over thresholds."),
  c55.n(OS, "apply-smooth-pasting-solve", 7,
    "For $\\sup_\\tau\\mathbb{E}[e^{-\\rho\\tau}(X_\\tau - c)]$ with $X$ Brownian, the value below threshold $b$ is $A e^{\\theta x}$ with $\\theta = \\sqrt{2\\rho}/\\sigma$. Smooth pasting gives $b - c = 1/\\theta$. With $\\rho = 0.08$, $\\sigma = 0.4$ and $c = 2$, compute $b$.",
    3),
  c55.m(OS, "apply-time-change-boundary", 7, "In a finite-horizon stopping problem (like an American put), the exercise boundary as maturity approaches:",
    "Moves toward the strike, since there is less time value to wait for", [
      ["Moves away from the strike", "Less time means exercising earlier becomes more attractive."],
      ["Is constant", "Finite horizons make the boundary time-dependent."],
      ["Disappears", "It converges to the strike."],
    ]),
  c55.s(OS, "explain-stopping-control", 7,
    "Give an algorithmic-trading example of combined optimal stopping and control, and say what is stopped and what is controlled.",
    "Gives an example: execution with LOs and MOs (Section 8.4), where depth is a continuous control and the decision to send an MO is a stopping (impulse) decision.",
    "Or: an acquisition programme with a price limiter, or pairs trading, where the agent controls trading and stops by entering or exiting a position when a threshold is hit."),

  // level 8
  c55.n(OS, "apply-bermudan", 8,
    "A two-period binomial American put: $S_0 = 100$, up factor $1.1$, down factor $0.9$, risk-neutral probability $0.5$, no discounting, strike $100$. What is its value?",
    5.25),
  c55.s(OS, "explain-viscosity-stopping", 8,
    "Why are viscosity solutions used for optimal stopping problems even when smooth pasting holds?",
    "Explains that the value function is generally only once differentiable across the boundary (the second derivative jumps), so it is not a classical $C^{2}$ solution everywhere.",
    "Explains that viscosity solutions give a rigorous meaning to the VI with such regularity and come with comparison and uniqueness results, so numerical schemes converge to the right function."),
  c55.m(OS, "apply-impulse", 8, "In a QVI, executing an MO of one unit at time $t$ moves the state to:",
    "$(x + S - \\Delta/2,\\; q - 1)$: cash rises by the bid price and inventory falls by one", [
      ["$(x, q)$", "An MO changes cash and inventory."],
      ["$(x + S + \\delta, q - 1)$", "That is a filled LO, not an MO."],
      ["$(x - S, q + 1)$", "That is a buy."],
    ]),
  c55.n(OS, "apply-perpetual-put-beta", 8,
    "For the perpetual put, $\\beta = 2r/\\sigma^2$. What volatility gives $S^{*} = 50$ when $K = 100$ and $r = 0.04$? Give $4$ decimal places.",
    0.2828),

  // level 9
  c55.s(OS, "transfer-pairs-exit", 9,
    "In pairs trading, the agent who is long the cointegration portfolio chooses when to exit. Formulate this as an optimal stopping problem and describe the shape of the solution.",
    "Formulates $H_{+}(\\varepsilon) = \\sup_\\tau\\mathbb{E}[e^{-\\rho\\tau}(\\varepsilon_\\tau - c)]$ with $\\varepsilon$ an OU process and transaction cost $c$.",
    "Describes the solution: a threshold $\\varepsilon^{*}$ above which she exits immediately; below it the value solves the ODE $\\rho H = \\kappa(\\theta - \\varepsilon)H' + \\tfrac{1}{2}\\sigma^2H''$, with value matching and smooth pasting at $\\varepsilon^{*}$."),
  c55.n(OS, "apply-snell-three", 9,
    "Reward $G_n = |S_n - 10|$ with $S$ a symmetric $\\pm 1$ walk, $S_0 = 10$, horizon $2$, no discounting. What is the optimal stopping value at time zero?",
    1),
  c55.m(OS, "transfer-numerical-vi", 9, "A standard numerical method for a VI is:",
    "Backward time-stepping of the PDE with a projection $H \\leftarrow \\max\\{H, G\\}$ at each step", [
      ["Forward simulation without optimisation", "Stopping must be optimised."],
      ["Solving the PDE once and ignoring the reward", "The constraint $H \\ge G$ must be enforced."],
      ["Setting $H = G$ everywhere", "That ignores the option to wait."],
    ]),
  c55.s(OS, "transfer-entry-exit", 9,
    "Why must the optimal entry problem in pairs trading be solved after the exit problem?",
    "Explains that the reward from entering is the value of the position just entered, which depends on how optimally she will later exit, so $H_{+}(\\varepsilon) - (\\varepsilon + c)$ is the entry payoff.",
    "Notes the nested structure: solve the exit problem first to get $H_{+}$, then solve a second stopping problem with that payoff; the result orders entry below exit."),

  // level 10
  c55.s(OS, "transfer-stopping-model-risk", 10,
    "An optimal stopping rule relies on an estimated mean-reversion speed. Discuss the consequences if mean reversion is slower than estimated, and how to make the rule robust.",
    "Explains that with slower reversion, waiting for the threshold takes longer, positions are held through larger adverse excursions, and thresholds are too tight, so expected profits fall and losses grow.",
    "Proposes robustness: estimate uncertainty and use conservative parameters, add stop-loss or time limits, recalibrate frequently, and check sensitivity of thresholds to parameters."),
  c55.n(OS, "apply-american-early", 10,
    "Two-period binomial American put with $S_0 = 100$, up $1.2$, down $0.8$, risk-neutral up probability $0.5$, no discounting and strike $110$. What is its value?",
    18.5),
  c55.s(OS, "transfer-impulse-vs-continuous", 10,
    "Compare modelling MO executions as a continuous trading speed (Chapter 6) versus as impulses in a QVI (Chapter 8). When is each appropriate?",
    "Explains that continuous-speed models approximate many small MOs over time, with impact depending on the speed, suitable for large orders executed steadily.",
    "Explains that impulse models treat each MO as a discrete event paying the spread, suitable when trading one unit at a time and mixing with LOs, where the decision is when to cross the spread."),
  c55.m(OS, "transfer-stopping-pitfall", 10, "In a backtest, a stopping rule that uses the day’s high to decide when to exit is flawed because:",
    "It uses information not available at the stopping time, so it is not a valid stopping time", [
      ["Highs are noisy", "The flaw is look-ahead, not noise."],
      ["Stopping rules must be fixed times", "Valid stopping times are random but adapted."],
      ["It ignores fees", "Fees matter, but look-ahead is the fundamental flaw."],
    ]),
];

export const ahtControlItems: Item[] = [...jumps, ...hjb, ...counting, ...stopping];
