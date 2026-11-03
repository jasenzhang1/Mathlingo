import type { Item } from "../../../lib/assessment/types";
import { m, n, s } from "./shared";

const SRW = "simple-random-walk";
const BM = "brownian-motion";
const PP = "poisson-process";
const PTS = "poisson-thinning-superposition";
const NHPP = "nonhomogeneous-poisson-process";
const CPP = "compound-poisson-process";
const LEVY = "levy-processes";

const simpleRandomWalk: Item[] = [
  // level 1
  m(SRW, "t50-recall-steps", 1,
    "In a simple random walk $S_n = X_1 + \\cdots + X_n$ with $S_0 = 0$, the steps $X_i$ are:",
    "i.i.d., each equal to $+1$ with probability $p$ and $-1$ with probability $1 - p$",
    [
      ["i.i.d. standard normal", "Normal steps give a Gaussian random walk; the simple walk moves by exactly $\\pm 1$."],
      ["Independent, with variance growing in $i$", "The steps are identically distributed, so every step has the same variance $4p(1 - p)$."],
      ["Dependent, each step undoing the previous one", "The steps are independent; a walk that undoes every step would just oscillate."],
    ]),
  // level 2
  n(SRW, "t50-apply-biased-variance", 2,
    "A simple random walk steps $+1$ with probability $p = 0.7$ and $-1$ otherwise. Find $\\text{Var}(S_{20})$.",
    16.8),
  // level 3
  m(SRW, "t50-apply-parity", 3,
    "A simple symmetric random walk starts at $0$. Which value can $S_7$ $\\textbf{NOT}$ take?",
    "$4$",
    [
      ["$7$", "Seven $+1$ steps in a row give $S_7 = 7$, which has positive probability."],
      ["$-3$", "Two $+1$ and five $-1$ steps give $S_7 = -3$; after an odd number of steps any odd value in $[-7, 7]$ is possible."],
      ["$1$", "Four $+1$ and three $-1$ steps give $S_7 = 1$."],
    ]),
  // level 4
  n(SRW, "t50-apply-six-step-return", 4,
    "Find $P(S_6 = 0)$ for a simple symmetric random walk started at $0$. Give $4$ decimal places.",
    0.3125),
  n(SRW, "t50-apply-biased-ruin", 4,
    "A walk steps $+1$ with probability $0.6$ and $-1$ with probability $0.4$. Starting at $1$, find the probability that it hits $3$ before $0$. Give $4$ decimal places.",
    0.4737),
  m(SRW, "t50-apply-no-return", 4,
    "For a simple symmetric random walk from $0$, what is $P(S_k \\ne 0 \\text{ for } k = 1, 2, 3, 4)$?",
    "$\\tfrac{3}{8}$",
    [
      ["$\\tfrac{1}{8}$", "Only counting the two monotone paths ($\\pm 1$ four times) misses paths such as $+1, +1, -1, +1$ that stay positive."],
      ["$\\tfrac{5}{8}$", "This is $1 - P(S_4 = 0)$, but avoiding $0$ at every step is stricter than avoiding it at step $4$."],
      ["$\\tfrac{1}{4}$", "There are $3$ positive paths and $3$ negative ones, $6$ of $16$ in total, not $4$."],
    ]),
  // level 7
  s(SRW, "t50-explain-null-recurrence", 7,
    "The simple symmetric random walk on $\\mathbb{Z}$ returns to $0$ with probability $1$, yet the expected time of the first return is infinite. Explain both facts.",
    "Recurrence: $P(S_{2n} = 0) \\approx 1/\\sqrt{\\pi n}$, whose sum diverges, so the expected number of returns is infinite and the return probability is $1$.",
    "Infinite mean: $P(T > 2n) = P(S_{2n} = 0) \\approx 1/\\sqrt{\\pi n}$ (or an equivalent tail argument), and summing this tail gives $\\mathbb{E}[T] = \\infty$; the walk is null recurrent with no stationary distribution."),
  // level 8
  n(SRW, "t50-derive-biased-duration", 8,
    "A walk steps $+1$ with probability $0.6$ and $-1$ with probability $0.4$, starting at $2$ and stopping at $0$ or $4$. Find the expected number of steps until it stops. Give $2$ decimal places.",
    3.85),
  s(SRW, "t50-derive-reflection-bijection", 8,
    "For the symmetric walk, an integer $a > 0$ and $b \\le a$, show that $P\\left(\\max_{k \\le n} S_k \\ge a,\\ S_n = b\\right) = P(S_n = 2a - b)$.",
    "Reflects the path after its first visit to $a$: the part after the hitting time is mirrored in the level $a$, turning an endpoint $b$ into $2a - b$.",
    "Argues this is a bijection between paths that reach $a$ and end at $b$ and all paths ending at $2a - b \\ge a$ (which must have reached $a$), and that all paths have equal probability $2^{-n}$."),
  // level 10
  s(SRW, "t50-judge-optional-stopping", 10,
    "For a fair walk from $0$, let $T = \\min\\lbrace n : S_n = 1\\rbrace$. Then $T < \\infty$ almost surely and $S_T = 1$, so $\\mathbb{E}[S_T] = 1 \\ne 0 = S_0$. Reconcile this with the optional stopping theorem.",
    "Identifies the failed hypothesis: $T$ is unbounded, $\\mathbb{E}[T] = \\infty$, and the stopped walk $S_{n \\wedge T}$ is not uniformly integrable (it can go very negative first).",
    "Explains the consequence: optional stopping needs bounded $T$, or $\\mathbb{E}[T] < \\infty$ with bounded increments, or uniform integrability; here $\\mathbb{E}[S_{n \\wedge T}] = 0$ for each $n$ but the limit cannot be exchanged with the expectation."),
];

const brownianMotion: Item[] = [
  // level 1
  m(BM, "t50-recall-increment-law", 1,
    "Which property is part of the definition of standard Brownian motion $B$?",
    "$B(t) - B(s) \\sim \\mathcal{N}(0, t - s)$ for $s < t$",
    [
      ["$B(t) \\sim \\mathcal{N}(0, t^{2})$", "The variance of $B(t)$ is $t$, not $t^{2}$; the standard deviation grows like $\\sqrt{t}$."],
      ["Its sample paths are differentiable", "Brownian paths are continuous but nowhere differentiable."],
      ["$B(t) - B(s)$ depends on $B(s)$", "Increments are independent of the past, including $B(s)$."],
    ]),
  // level 2
  m(BM, "t50-apply-scaled-variance", 2,
    "Find $\\text{Var}(3B(2))$ for standard Brownian motion.",
    "$18$",
    [
      ["$6$", "The constant must be squared: $\\text{Var}(cX) = c^{2}\\text{Var}(X)$."],
      ["$36$", "This squares $3 \\cdot 2$; only the constant is squared, and $\\text{Var}(B(2)) = 2$."],
      ["$9$", "This forgets that $\\text{Var}(B(2)) = 2$, not $1$."],
    ]),
  n(BM, "t50-apply-conditional-mean", 2,
    "For standard Brownian motion, find $\\mathbb{E}[B(6) \\mid B(2) = 1.5]$.",
    1.5),
  // level 3
  n(BM, "t50-apply-sum-variance", 3,
    "Find $\\text{Var}(B(2) + B(3))$ for standard Brownian motion.",
    9),
  // level 4
  n(BM, "t50-apply-three-sum-variance", 4,
    "Find $\\text{Var}(B(1) + B(2) + B(3))$ for standard Brownian motion.",
    14),
  n(BM, "t50-apply-difference-variance", 4,
    "Find $\\text{Var}(B(4) - 2B(1))$ for standard Brownian motion.",
    4),
  m(BM, "t50-apply-conditional-law", 4,
    "Given $B(1) = 1$, what is the distribution of $B(3)$?",
    "$\\mathcal{N}(1, 2)$",
    [
      ["$\\mathcal{N}(1, 3)$", "Only the increment $B(3) - B(1)$ is random given $B(1)$, and its variance is $3 - 1 = 2$."],
      ["$\\mathcal{N}(0, 2)$", "Conditioning on $B(1) = 1$ shifts the mean to $1$, since increments have mean $0$."],
      ["$\\mathcal{N}(3, 2)$", "Brownian motion has no drift, so the mean stays at the current value $1$."],
    ]),
  // level 8
  n(BM, "t50-derive-both-positive", 8,
    "For standard Brownian motion, find $P(B(1) > 0 \\text{ and } B(2) > 0)$. Give $3$ decimal places.",
    0.375),
  s(BM, "t50-derive-bridge-law", 8,
    "For $0 < s < t$, derive the conditional distribution of $B(s)$ given $B(t) = x$.",
    "Uses that $(B(s), B(t))$ is jointly Gaussian with variances $s$, $t$ and covariance $s$, so the conditional mean is $(s/t)x$.",
    "Gets the conditional variance $s - s^{2}/t = s(t - s)/t$ and recognises the Brownian bridge (normal law with these parameters)."),
  // level 10
  s(BM, "t50-derive-hitting-laplace", 10,
    "Let $\\tau_a = \\inf\\lbrace t : B(t) = a\\rbrace$ for $a > 0$. Use the martingale $\\exp\\left(\\theta B(t) - \\theta^{2}t/2\\right)$ to show $\\mathbb{E}\\left[e^{-\\lambda\\tau_a}\\right] = e^{-a\\sqrt{2\\lambda}}$, and justify the stopping step.",
    "Sets $\\theta = \\sqrt{2\\lambda}$ and stops at $\\tau_a$, where $B = a$, giving $\\mathbb{E}\\left[e^{\\theta a - \\lambda\\tau_a}\\right] = 1$ and hence the formula.",
    "Justifies optional stopping: for $\\theta > 0$ the stopped martingale is bounded by $e^{\\theta a}$, and $\\tau_a < \\infty$ a.s. (or on $\\tau_a = \\infty$ the martingale tends to $0$), so bounded convergence applies."),
];

const poissonProcess: Item[] = [
  // level 1
  m(PP, "t50-recall-interarrivals", 1,
    "The times between consecutive events of a rate-$\\lambda$ Poisson process are:",
    "i.i.d. exponential with mean $1/\\lambda$",
    [
      ["i.i.d. exponential with mean $\\lambda$", "$\\lambda$ is the rate; the mean gap is its reciprocal."],
      ["i.i.d. $\\text{Poisson}(\\lambda)$", "Poisson describes counts in a window, not the continuous waiting times."],
      ["i.i.d. uniform on $[0, 1/\\lambda]$", "Uniform gaps would make the process too regular and not memoryless."],
    ]),
  // level 3
  n(PP, "t50-apply-one-event", 3,
    "Events arrive as a Poisson process at $6$ per hour. Find the probability of exactly one event in half an hour. Give $4$ decimal places.",
    0.1494),
  // level 4
  n(PP, "t50-apply-joint-counts", 4,
    "A Poisson process has rate $2$. Find $P(N(1) = 1,\\ N(3) = 4)$. Give $4$ decimal places.",
    0.0529),
  n(PP, "t50-apply-product-moment", 4,
    "A Poisson process has rate $3$. Find $\\mathbb{E}[N(2)N(5)]$.",
    96),
  m(PP, "t50-apply-conditional-binomial", 4,
    "A Poisson process has rate $2$. Given $N(4) = 6$, what is the distribution of $N(1)$?",
    "$\\text{Binomial}\\left(6, \\tfrac{1}{4}\\right)$",
    [
      ["$\\text{Poisson}(2)$", "This ignores the conditioning; given $N(4) = 6$ the count in $[0, 1]$ cannot exceed $6$."],
      ["$\\text{Binomial}\\left(6, \\tfrac{1}{2}\\right)$", "Each of the $6$ events lands in $[0, 1]$ with probability $1/4$, the fraction of the window."],
      ["$\\text{Poisson}(1.5)$", "Given the total, the count is binomial, not Poisson with mean $6/4$."],
    ]),
  // level 7
  s(PP, "t50-explain-residual-time", 7,
    "At a fixed time $t$, why is the time until the next event of a rate-$\\lambda$ Poisson process exponential with rate $\\lambda$ whatever happened before $t$? Why does this fail for a renewal process with uniform gaps?",
    "Uses memorylessness (or independent increments): $P(\\text{no event in } (t, t + u] \\mid \\text{past}) = e^{-\\lambda u}$, independent of the history.",
    "Notes that uniform gaps are not memoryless: the residual time depends on how long it has been since the last event (it is bounded by the remaining gap), so the past matters."),
  // level 8
  n(PP, "t50-derive-total-waiting", 8,
    "Passengers arrive at a stop as a Poisson process of rate $2$ per minute from time $0$, and a bus leaves at time $10$ minutes. Find the expected total waiting time of all passengers (in minutes).",
    100),
  n(PP, "t50-derive-second-before-third-after", 8,
    "A Poisson process has rate $1$. Find the probability that the $2$nd event occurs before time $1$ and the $3$rd event occurs after time $2$. Give $4$ decimal places.",
    0.0677),
  s(PP, "t50-derive-gamma-from-counts", 8,
    "Derive the density of the $n$th arrival time $T_n$ of a rate-$\\lambda$ Poisson process from the counting process.",
    "Uses $P(T_n \\le t) = P(N(t) \\ge n) = 1 - \\sum_{k < n} e^{-\\lambda t}(\\lambda t)^{k}/k!$.",
    "Differentiates and telescopes the sum to get $f(t) = \\lambda e^{-\\lambda t}(\\lambda t)^{n-1}/(n - 1)!$, the $\\text{Gamma}(n, \\lambda)$ density."),
  // level 10
  s(PP, "t50-derive-poisson-from-axioms", 10,
    "A counting process has $N(0) = 0$, stationary independent increments, $P(N(h) = 1) = \\lambda h + o(h)$ and $P(N(h) \\ge 2) = o(h)$. Sketch why $N(t) \\sim \\text{Poisson}(\\lambda t)$.",
    "Derives $P_0(t + h) = P_0(t)(1 - \\lambda h + o(h))$, so $P_0' = -\\lambda P_0$ and $P_0(t) = e^{-\\lambda t}$.",
    "Gets $P_n' = -\\lambda P_n + \\lambda P_{n-1}$ for $n \\ge 1$ (the $o(h)$ term kills multiple jumps) and solves by induction to $P_n(t) = e^{-\\lambda t}(\\lambda t)^{n}/n!$."),
];

const thinningSuperposition: Item[] = [
  // level 1
  m(PTS, "t50-recall-superposition", 1,
    "Superposing independent Poisson processes means:",
    "Pooling all their event times into a single process",
    [
      ["Keeping only the times at which all processes have an event", "That would be an intersection, which is almost surely empty for independent processes."],
      ["Multiplying their counting processes", "Superposition adds counts; it does not multiply them."],
      ["Keeping each event independently with some probability", "That is thinning, the reverse operation."],
    ]),
  // level 3
  n(PTS, "t50-apply-kept-void", 3,
    "A Poisson stream of rate $12$ per hour is thinned, keeping each event with probability $0.25$. Find the probability that no kept event occurs in $20$ minutes. Give $4$ decimal places.",
    0.3679),
  m(PTS, "t50-apply-merged-first", 3,
    "Independent Poisson streams of rates $3$ and $7$ are merged. The time until the first merged event is:",
    "Exponential with rate $10$ (mean $0.1$)",
    [
      ["Exponential with rate $3$", "The first event can come from either stream, so the rates add."],
      ["Exponential with mean $\\tfrac{1}{3} + \\tfrac{1}{7}$", "Means do not add; it is the rates that add for the minimum of exponentials."],
      ["$\\text{Gamma}(2, 10)$", "A Gamma$(2)$ time is the second event, not the first."],
    ]),
  // level 4
  n(PTS, "t50-apply-total-given-kept", 4,
    "A rate-$5$ Poisson process on $[0, 1]$ is thinned, keeping each event with probability $0.4$. Given that exactly $3$ events were kept, find the expected total number of events.",
    6),
  // level 8
  n(PTS, "t50-derive-three-before-one", 8,
    "Men arrive at a shop at rate $4$ per hour and women at rate $6$ per hour, as independent Poisson processes. Find the probability that $3$ women arrive before the first man.",
    0.216),
  n(PTS, "t50-derive-both-types", 8,
    "Events of a rate-$10$ Poisson process are independently type A with probability $0.3$ and type B otherwise. Find the expected time until at least one event of each type has occurred. Give $4$ decimal places.",
    0.3762),
  s(PTS, "t50-derive-superposition-proof", 8,
    "Show that the superposition of independent Poisson processes with rates $\\lambda_1$ and $\\lambda_2$ is a Poisson process with rate $\\lambda_1 + \\lambda_2$.",
    "Increments: the merged count over disjoint intervals is a function of independent pieces of the two processes, so it has independent (and stationary) increments.",
    "Marginals: the count in a window of length $t$ is a sum of independent $\\text{Poisson}(\\lambda_1 t)$ and $\\text{Poisson}(\\lambda_2 t)$, which is $\\text{Poisson}((\\lambda_1 + \\lambda_2)t)$ (for example by multiplying generating functions)."),
  // level 9
  n(PTS, "t50-transfer-infinite-server", 9,
    "Customers arrive at an empty infinite-server queue as a Poisson process of rate $6$ per hour from time $0$, and each stays an independent $\\text{Uniform}[0, 1]$ number of hours. Find the expected number in the system at time $0.5$ hours.",
    2.25),
  // level 10
  s(PTS, "t50-judge-dependent-thinning", 10,
    "A colleague claims that any rule for discarding events splits a Poisson process into independent Poisson streams, for example “keep only the first $5$ events”. Refute this and state what condition the keep/discard rule needs.",
    "Gives a counterexample: keeping the first $5$ events gives a kept count bounded by $5$ (not Poisson), and the kept and discarded counts are dependent (discards occur only once $5$ are kept).",
    "States the condition: each event’s keep/discard decision must be independent of the rest of the process (i.i.d. marks, or a probability depending only on the event’s own time or location)."),
  s(PTS, "t50-transfer-displacement", 10,
    "Each point of a rate-$\\lambda$ Poisson process on $\\mathbb{R}$ is moved by an independent $\\mathcal{N}(0, 1)$ displacement. Argue that the displaced points again form a Poisson process of rate $\\lambda$.",
    "Treats displacements as independent marks, so the displaced points form a Poisson process (marking/mapping theorem) with mean measure $\\int \\lambda\\,\\phi(y - x)\\,dx$.",
    "Computes that this intensity is $\\lambda\\int \\phi(y - x)\\,dx = \\lambda$ for every $y$, so the result is homogeneous Poisson with the same rate."),
];

const nonhomogeneous: Item[] = [
  // level 1
  m(NHPP, "t50-recall-mean-function", 1,
    "For a non-homogeneous Poisson process with rate $\\lambda(t)$, the mean-value function is:",
    "$\\Lambda(t) = \\int_0^t \\lambda(s)\\,ds$",
    [
      ["$\\Lambda(t) = \\lambda(t)\\,t$", "This only holds when the rate is constant."],
      ["$\\Lambda(t) = \\lambda'(t)$", "The mean count accumulates the rate; it is the integral, not the derivative."],
      ["$\\Lambda(t) = \\max_{s \\le t}\\lambda(s)$", "The maximum rate is the bound used in thinning, not the expected count."],
    ]),
  // level 2
  m(NHPP, "t50-apply-linear-count", 2,
    "Arrivals follow a non-homogeneous Poisson process with $\\lambda(t) = 4t$ on $[0, 2]$. What is the expected number of arrivals on $[0, 2]$?",
    "$8$",
    [
      ["$16$", "This multiplies the final rate $\\lambda(2) = 8$ by the length $2$, overstating an increasing rate."],
      ["$4$", "The integral of $4t$ over $[0, 2]$ is $2t^{2}\\big|_0^2 = 8$."],
      ["$32$", "This integrates $4t^{2}$ or squares the wrong term; $\\int_0^2 4t\\,dt = 8$."],
    ]),
  // level 3
  n(NHPP, "t50-apply-void-linear", 3,
    "A non-homogeneous Poisson process has $\\lambda(t) = 1 + t$. Find $P(N(0, 1] = 0)$. Give $4$ decimal places.",
    0.2231),
  // level 4
  n(NHPP, "t50-apply-conditional-share", 4,
    "A non-homogeneous Poisson process has rate $3$ on $[0, 2)$ and rate $1$ on $[2, 5]$. Given $N(0, 5] = 9$, find the expected number of events in $[0, 2)$.",
    6),
  n(NHPP, "t50-apply-two-events", 4,
    "A non-homogeneous Poisson process has $\\lambda(t) = 2t$. Find $P(N(1, 2] = 2)$. Give $4$ decimal places.",
    0.224),
  // level 7
  m(NHPP, "t50-explain-conditional-times", 7,
    "Given $N(0, T] = n$ for a non-homogeneous Poisson process with rate $\\lambda(t)$, the unordered event times are:",
    "i.i.d. on $[0, T]$ with density $\\lambda(t)/\\Lambda(T)$",
    [
      ["i.i.d. uniform on $[0, T]$", "Uniform times hold only when the rate is constant; times cluster where $\\lambda(t)$ is large."],
      ["Separated by i.i.d. exponential gaps", "Gaps of an NHPP are not i.i.d., and conditioning on $n$ events changes the gap law anyway."],
      ["Equally spaced on $[0, T]$", "Event times stay random given their number."],
    ]),
  // level 8
  n(NHPP, "t50-derive-first-median", 8,
    "A non-homogeneous Poisson process has $\\lambda(t) = 2t$. Find the median of the first event time $T_1$. Give $4$ decimal places.",
    0.8326),
  s(NHPP, "t50-derive-order-statistics", 8,
    "Derive the joint density of the event times of a non-homogeneous Poisson process on $[0, T]$ given that exactly $n$ events occurred.",
    "Writes the probability of events in $[t_i, t_i + dt_i)$ for each $i$ and none elsewhere as $\\prod_i \\lambda(t_i)\\,dt_i \\cdot e^{-\\Lambda(T)}$.",
    "Divides by $P(N(T) = n) = e^{-\\Lambda(T)}\\Lambda(T)^{n}/n!$ to get $n!\\prod_i \\lambda(t_i)/\\Lambda(T)^{n}$ on ordered times, i.e. the order statistics of i.i.d. draws with density $\\lambda/\\Lambda(T)$."),
  // level 10
  n(NHPP, "t50-judge-finite-total", 10,
    "A non-homogeneous Poisson process on $[0, \\infty)$ has $\\lambda(t) = e^{-t}$, so only finitely many events ever occur. Find the expected time of the first event given that at least one event occurs. Give $4$ decimal places.",
    0.7106),
  s(NHPP, "t50-transfer-inverse-time-change", 10,
    "Let $E_1 < E_2 < \\cdots$ be the event times of a unit-rate Poisson process. Show that $\\Lambda^{-1}(E_i)$ are the event times of a Poisson process with intensity $\\lambda$, and explain what changes when $\\Lambda(\\infty) < \\infty$.",
    "Shows the count of mapped points in $(a, b]$ equals the number of $E_i$ in $(\\Lambda(a), \\Lambda(b)]$, which is $\\text{Poisson}(\\Lambda(b) - \\Lambda(a))$, with independence across disjoint intervals.",
    "Notes that with $\\Lambda(\\infty) < \\infty$ only the $E_i$ below $\\Lambda(\\infty)$ map to times; the total number of events is $\\text{Poisson}(\\Lambda(\\infty))$, so the process stops after finitely many events."),
];

const compoundPoisson: Item[] = [
  // level 1
  m(CPP, "t50-recall-independence", 1,
    "In $S(t) = \\sum_{i=1}^{N(t)} Y_i$, which assumption is standard for a compound Poisson process?",
    "$N$ is a Poisson process independent of the i.i.d. jumps $Y_i$",
    [
      ["The jumps $Y_i$ must be positive", "Jumps may take any sign, e.g. $\\pm 1$ price ticks."],
      ["The jumps $Y_i$ must be normal", "Any jump distribution is allowed."],
      ["$N(t)$ is deterministic", "The number of jumps is Poisson, which is what makes the sum compound."],
    ]),
  m(CPP, "t50-recall-unit-jumps", 1,
    "If every jump $Y_i$ equals $1$, the compound Poisson process $S$ is:",
    "The Poisson process $N$ itself",
    [
      ["A Brownian motion", "With unit jumps $S$ still moves only by jumps; it has no continuous part."],
      ["The deterministic line $\\lambda t$", "That is the mean of $S(t)$, not the process."],
      ["A binomial process", "The number of jumps is Poisson, not binomial."],
    ]),
  // level 3
  n(CPP, "t50-apply-two-size-mean", 3,
    "Jumps arrive at rate $3$ and each jump is $1$ or $2$ with probability $\\tfrac{1}{2}$ each. Find $\\mathbb{E}[S(2)]$.",
    9),
  // level 4
  n(CPP, "t50-apply-two-size-variance", 4,
    "Jumps arrive at rate $3$ and each jump is $1$ or $2$ with probability $\\tfrac{1}{2}$ each. Find $\\text{Var}(S(2))$.",
    15),
  // level 7
  m(CPP, "t50-explain-martingale", 7,
    "Jumps have finite mean. Which process is a martingale?",
    "$S(t) - \\lambda t\\,\\mathbb{E}[Y]$",
    [
      ["$S(t) - \\lambda t$", "This compensates only the number of jumps; it is a martingale only if $\\mathbb{E}[Y] = 1$."],
      ["$S(t)^{2} - \\lambda t\\,\\mathbb{E}[Y]^{2}$", "The quadratic compensator needs $\\mathbb{E}[Y^{2}]$ and a centred $S$, not $\\mathbb{E}[Y]^{2}$."],
      ["$e^{S(t)} - 1$", "An exponential needs the compensator $\\exp(-\\lambda t(M_Y(1) - 1))$ to be a martingale."],
    ]),
  // level 8
  n(CPP, "t50-derive-exp-tail", 8,
    "Jumps arrive at rate $2$ and are exponential with mean $1$. Find $P(S(1) > 1)$. Give $4$ decimal places.",
    0.6155),
  n(CPP, "t50-derive-signed-zero", 8,
    "Price ticks occur at rate $4$ per minute and each tick is $+1$ or $-1$ with probability $\\tfrac{1}{2}$ each. Find $P(S(1) = 0)$, the probability the net move after one minute is zero. Give $4$ decimal places.",
    0.2075),
  // level 9
  n(CPP, "t50-transfer-integer-split", 9,
    "Jumps arrive at rate $2$ and each jump is $1$ or $2$ with probability $\\tfrac{1}{2}$ each. Find $P(S(1) = 3)$. Give $4$ decimal places.",
    0.1579),
  // level 10
  s(CPP, "t50-judge-reinsurance", 10,
    "An insurer’s claims form a compound Poisson process with rate $\\lambda$ and sizes $Y$. A reinsurer pays $(Y - d)^{+}$ on each claim. Describe the ceded total as a process, and decide whether the ceded and retained totals are independent.",
    "Ceded total: thinning keeps claims with $Y > d$ at rate $\\lambda P(Y > d)$ with jumps distributed as $Y - d$ given $Y > d$, so it is compound Poisson.",
    "Dependence: the retained part $\\sum \\min(Y_i, d)$ includes a contribution $d$ from every ceded claim, so the two totals share claims and are positively dependent (unlike a split by independent claim types)."),
  s(CPP, "t50-judge-decompounding", 10,
    "You observe only daily totals $S(k) - S(k - 1)$ of a compound Poisson process, never individual jumps. How can you estimate $\\lambda$ and the jump law, and what identifiability problem arises?",
    "Gives an estimation route: cumulants $\\lambda\\mathbb{E}[Y^{k}]$ matched to the daily mean, variance and third cumulant, or $P(\\text{daily total} = 0) = e^{-\\lambda}$ for continuous nonzero jumps, or inverting the empirical characteristic function (decompounding).",
    "Identifies the problem: an atom of the jump law at $0$ cannot be separated from the rate ($\\lambda$ with $P(Y = 0) = q$ looks the same as rate $\\lambda(1 - q)$), and several jumps in a day are aggregated so the jump law must be deconvolved."),
];

const levyProcesses: Item[] = [
  // level 1
  m(LEVY, "t50-recall-independent-increments", 1,
    "For a Lévy process $X$, “independent increments” means:",
    "For $t_0 < t_1 < \\cdots < t_n$, the increments $X_{t_1} - X_{t_0}, \\ldots, X_{t_n} - X_{t_{n-1}}$ are independent",
    [
      ["$X_t$ is independent of $X_s$ for all $s \\ne t$", "Values at different times are dependent; only increments over disjoint intervals are independent."],
      ["Increments over intervals of equal length have the same law", "That is stationarity of increments, a separate condition."],
      ["Increments are uncorrelated with time", "Independence is a statement about the increments’ joint law, not about correlation with $t$."],
    ]),
  m(LEVY, "t50-recall-start-at-zero", 1,
    "Which condition is part of the definition of a Lévy process?",
    "$X_0 = 0$ almost surely",
    [
      ["Continuous sample paths", "The Poisson process is a Lévy process with jumps."],
      ["Finite variance", "The Cauchy process is a Lévy process with infinite variance."],
      ["Normally distributed $X_t$", "Only Brownian motion with drift has normal marginals."],
    ]),
  // level 2
  n(LEVY, "t50-apply-mean-scaling", 2,
    "A Lévy process has $\\mathbb{E}[X_1] = -0.5$. Find $\\mathbb{E}[X_6]$.",
    -3),
  // level 7
  m(LEVY, "t50-explain-not-levy", 7,
    "Which process is $\\textbf{NOT}$ a Lévy process? ($B$ is standard Brownian motion and $N$ an independent Poisson process.)",
    "$B_t - tB_1$ on $[0, 1]$",
    [
      ["$2t - 3N_t$", "A linear drift plus a scaled Poisson process still has stationary independent increments."],
      ["$B_{2t}$", "Time-scaled Brownian motion is Brownian motion with variance $2$ per unit time, a Lévy process."],
      ["$B_t + N_t$", "Sums of independent Lévy processes are Lévy processes."],
    ]),
  // level 8
  n(LEVY, "t50-derive-second-moment", 8,
    "$X_t = 2t + W_t - N_t$, where $W$ is standard Brownian motion and $N$ an independent Poisson process with rate $3$. Find $\\mathbb{E}[X_2^{2}]$.",
    12),
  // level 9
  s(LEVY, "t50-derive-continuous-gaussian", 9,
    "Sketch why a Lévy process with continuous sample paths must be Brownian motion with drift, $\\mu t + \\sigma W_t$.",
    "Splits $X_t$ into $n$ i.i.d. increments and uses path continuity to show the largest increment tends to $0$, so a central limit theorem (triangular arrays/Lindeberg) makes $X_t$ normal.",
    "Uses stationary independent increments to get mean and variance linear in $t$, so $X_t = \\mu t + \\sigma W_t$ with independent Gaussian increments."),
  n(LEVY, "t50-transfer-subordinated-fourth", 9,
    "$X_t = W_{N_t}$, where $W$ is standard Brownian motion and $N$ an independent Poisson process with rate $2$. Find $\\mathbb{E}[X_3^{4}]$.",
    126),
  // level 10
  s(LEVY, "t50-judge-kurtosis-scaling", 10,
    "Daily log-returns of an asset have excess kurtosis $10$, while $20$-day returns have excess kurtosis $8$. Is this consistent with a Lévy model for the log-price? What does it suggest?",
    "States that for a Lévy process cumulants are linear in $t$, so excess kurtosis scales like $1/t$: the $20$-day value should be about $10/20 = 0.5$, so $8$ is inconsistent.",
    "Suggests dependent increments, such as volatility clustering or stochastic volatility, which keep tails fat at longer horizons."),
  s(LEVY, "t50-judge-fixed-time-jumps", 10,
    "A Lévy process can have infinitely many jumps in every time interval, yet it almost surely does not jump at any fixed time $t$. Reconcile these facts.",
    "Uses stochastic continuity: $P(|X_t - X_{t-h}| > \\varepsilon) \\to 0$, so $P(\\Delta X_t \\ne 0) = 0$ for each fixed $t$.",
    "Explains that the jump times are countable and randomly placed (jumps larger than $\\varepsilon$ are finitely many on compacts), so infinitely many jumps in an interval do not put positive probability on any single time."),
  s(LEVY, "t50-judge-integer-valued", 10,
    "You want a Lévy process taking only integer values (for example cumulative defaults with batch sizes). Characterise all such processes and justify.",
    "Shows they are compound Poisson with integer-valued jumps (possibly of both signs): integer paths can only move by jumps of size at least $1$, so $\\nu$ puts no mass on $(-1, 1)$ and is finite.",
    "Rules out drift and a Brownian part, since either would move the path continuously off the integers."),
];

export const t50StochasticProcesses11Items: Item[] = [
  ...simpleRandomWalk,
  ...brownianMotion,
  ...poissonProcess,
  ...thinningSuperposition,
  ...nonhomogeneous,
  ...compoundPoisson,
  ...levyProcesses,
];
