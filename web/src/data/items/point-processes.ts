import type { Item, SourceRef } from "../../lib/assessment/types";
import { makeBuilders } from "./authoring";

/**
 * The "Point Processes" section beyond the homogeneous Poisson process:
 * superposition and thinning, non-homogeneous and compound Poisson processes,
 * conditional intensity, and Hawkes processes. Eight items per concept, two
 * per cognitive level.
 */
const AUTHORED: SourceRef = {
  id: "mathlingo-authored-point-processes",
  tier: "generated",
  title: "Mathlingo authored item (point processes)",
};

const { mcq, short, num } = makeBuilders(AUTHORED);

const TS = "poisson-thinning-superposition";
const thinning: Item[] = [
  mcq(
    { concept: TS, slug: "recall-superposition", cognitive: "recall", difficulty: -0.8, seconds: 30,
      stem: "Independent Poisson processes with rates $\\lambda_1$ and $\\lambda_2$ are merged. What is the merged process?" },
    "Poisson with rate $\\lambda_1 + \\lambda_2$",
    [
      ["Poisson with rate $\\max(\\lambda_1, \\lambda_2)$", "superpose-max", "Every event of both streams appears in the merge, so the rates add."],
      ["Poisson with rate $\\lambda_1 \\lambda_2$", "superpose-product", "Rates add under superposition; they don't multiply."],
      ["Not a Poisson process", "superpose-not-poisson", "The sum of independent Poisson processes is Poisson."],
    ],
  ),
  mcq(
    { concept: TS, slug: "recall-thinning-independence", cognitive: "recall", difficulty: -0.3, seconds: 40,
      stem: "Each event of a rate-$\\lambda$ Poisson process is kept independently with probability $p$. How are the kept and discarded streams related?" },
    "They are independent Poisson processes with rates $p\\lambda$ and $(1 - p)\\lambda$",
    [
      ["They are negatively correlated, since they share the same events", "thinning-negative", "Surprisingly, the Poisson structure makes the counts independent."],
      ["The kept stream is Poisson but the discarded one is not", "thinning-one-poisson", "The two streams are symmetric; both are Poisson."],
      ["Their counts always sum to a fixed number", "thinning-fixed-total", "The total is itself Poisson, not fixed."],
    ],
  ),
  num(
    { concept: TS, slug: "apply-escalated-rate", cognitive: "apply", difficulty: -0.4, seconds: 45,
      stem: "Calls arrive at rate $3$ per minute from customers and $1$ per minute from partners, independently. $40\\%$ of all calls are escalated, independently. What is the rate of escalated calls per minute?" },
    1.6,
  ),
  num(
    { concept: TS, slug: "apply-none-escalated", cognitive: "apply", difficulty: 0.1, seconds: 60,
      stem: "In the same call centre, what is the probability that no escalated call arrives in a $2$-minute window? Give $4$ decimal places." },
    0.0408,
  ),
  short(
    { concept: TS, slug: "explain-independence", cognitive: "explain", difficulty: 0.7, seconds: 120,
      stem: "Show that when a $\\text{Poisson}(\\Lambda)$ number of events is split by independent coin flips with probability $p$, the kept count $K$ and discarded count $D$ are independent." },
    [
      ["joint", "$P(K = k, D = d) = P(N = k + d)\\binom{k + d}{k}p^k(1 - p)^d = e^{-\\Lambda}\\frac{\\Lambda^{k + d}}{(k + d)!}\\binom{k + d}{k}p^k(1 - p)^d$.", 4, true],
      ["factor", "This simplifies to $e^{-p\\Lambda}\\frac{(p\\Lambda)^k}{k!} \\cdot e^{-(1 - p)\\Lambda}\\frac{((1 - p)\\Lambda)^d}{d!}$, a product of two Poisson pmfs, so $K \\perp D$.", 4, true],
    ],
  ),
  mcq(
    { concept: TS, slug: "explain-dependent-thinning", cognitive: "explain", difficulty: 0.4, seconds: 45,
      stem: "You keep every second event of a Poisson process instead of flipping independent coins. Is the result a Poisson process?" },
    "No — the gaps become sums of two exponentials (Gamma with shape $2$), which are not exponential",
    [
      ["Yes, with half the rate", "thinning-deterministic", "Thinning preserves the Poisson property only when the keep decisions are independent of the process."],
      ["Yes, with the same rate", "thinning-same-rate", "Half the events are removed, and the gap distribution changes."],
      ["Only if the original rate was $1$", "thinning-rate-one", "The rate doesn't matter; the dependence does."],
    ],
  ),
  num(
    { concept: TS, slug: "transfer-store", cognitive: "transfer", difficulty: 0.2, seconds: 60,
      stem: "Customers enter a shop at rate $30$ per hour, and each makes a purchase with probability $0.2$, independently. What is the probability of at least one purchase in a $10$-minute window? Give $3$ decimal places." },
    0.632,
  ),
  short(
    { concept: TS, slug: "transfer-spam", cognitive: "transfer", difficulty: 0.5, seconds: 100,
      stem: "Emails arrive as a Poisson process of rate $20$ per hour, and each is spam with probability $0.3$, independently. In the last hour you received $10$ spam emails. What is your best estimate of the number of legitimate emails in that hour, and why?" },
    [
      ["answer", "$14$ — the expected number of legitimate emails, $0.7 \\times 20$.", 3, true],
      ["why", "By thinning, the spam and legitimate streams are independent Poisson processes, so the spam count carries no information about the legitimate count.", 4, true],
    ],
  ),
];

const NH = "nonhomogeneous-poisson-process";
const nonhomogeneous: Item[] = [
  mcq(
    { concept: NH, slug: "recall-count", cognitive: "recall", difficulty: -0.5, seconds: 40,
      stem: "For a non-homogeneous Poisson process with rate $\\lambda(t)$, what is the distribution of the number of events in $(a, b]$?" },
    "$\\text{Poisson}\\big(\\int_a^b \\lambda(s)\\,ds\\big)$",
    [
      ["$\\text{Poisson}\\big(\\lambda(b)(b - a)\\big)$", "nhpp-endpoint-rate", "The mean is the area under the rate curve, not the endpoint rate times the length."],
      ["$\\text{Poisson}\\big((b - a)\\big)$", "nhpp-unit-rate", "That ignores the rate function."],
      ["Not Poisson, because the rate varies", "nhpp-not-poisson", "Counts over windows remain Poisson; only the mean changes."],
    ],
  ),
  mcq(
    { concept: NH, slug: "recall-waiting", cognitive: "recall", difficulty: -0.1, seconds: 40,
      stem: "In a non-homogeneous Poisson process, are the times between events i.i.d. exponential?" },
    "No — the distribution of the next gap depends on the current time through $\\lambda(t)$",
    [
      ["Yes, with rate equal to the average of $\\lambda$", "nhpp-average-rate", "Gaps are longer where the rate is low and shorter where it is high."],
      ["Yes, with rate $\\lambda(0)$", "nhpp-initial-rate", "The rate changes after time $0$."],
      ["Yes, because increments are independent", "nhpp-independent-increments", "Independent increments don't make the process stationary."],
    ],
  ),
  num(
    { concept: NH, slug: "apply-expected-count", cognitive: "apply", difficulty: -0.2, seconds: 50,
      stem: "Arrivals have rate $\\lambda(t) = 2 + t$ per hour for $t \\in [0, 4]$. What is the expected number of arrivals over the four hours?" },
    16,
  ),
  num(
    { concept: NH, slug: "apply-no-arrivals", cognitive: "apply", difficulty: 0.1, seconds: 60,
      stem: "With the same rate $\\lambda(t) = 2 + t$, what is the probability of no arrivals during the first hour? Give $4$ decimal places." },
    0.0821,
  ),
  short(
    { concept: NH, slug: "explain-thinning-simulation", cognitive: "explain", difficulty: 0.6, seconds: 120,
      stem: "Explain the thinning (Lewis–Shedler) algorithm for simulating a non-homogeneous Poisson process, and why it produces the right rate." },
    [
      ["algorithm", "Choose $\\lambda^* \\ge \\lambda(t)$ on the window, simulate a homogeneous rate-$\\lambda^*$ process, and keep a candidate at time $t$ with probability $\\lambda(t)/\\lambda^*$.", 4, true],
      ["why", "Independent thinning with a time-dependent keep probability leaves a Poisson process whose rate at $t$ is $\\lambda^* \\cdot \\lambda(t)/\\lambda^* = \\lambda(t)$.", 3, true],
      ["efficiency", "Notes that a tight $\\lambda^*$ reduces wasted candidates.", 1],
    ],
  ),
  mcq(
    { concept: NH, slug: "explain-time-change", cognitive: "explain", difficulty: 0.6, seconds: 50,
      stem: "Let $\\Lambda(t) = \\int_0^t \\lambda(s)\\,ds$. What is the process $\\tilde{N}(u) = N(\\Lambda^{-1}(u))$?" },
    "A homogeneous Poisson process with rate $1$",
    [
      ["A homogeneous Poisson process with rate $\\Lambda(T)$", "time-change-rate", "Rescaling time by $\\Lambda$ makes the expected count per unit of new time exactly $1$."],
      ["A non-homogeneous process with rate $1/\\lambda(t)$", "time-change-reciprocal", "The time change removes the time variation."],
      ["A Brownian motion", "time-change-bm", "It is still a counting process."],
    ],
  ),
  num(
    { concept: NH, slug: "transfer-piecewise", cognitive: "transfer", difficulty: 0.2, seconds: 60,
      stem: "A website receives visits at $10$ per hour until $2$ pm and $30$ per hour from $2$ pm to $3$ pm. What is the expected number of visits between $1$ pm and $2{:}30$ pm?" },
    25,
  ),
  short(
    { concept: NH, slug: "transfer-call-centre", cognitive: "transfer", difficulty: 0.5, seconds: 100,
      stem: "A call centre plans staffing with a homogeneous Poisson model fitted to the daily average call rate. Calls peak sharply at lunchtime. What goes wrong, and how does a non-homogeneous model fix it?" },
    [
      ["problem", "A constant rate understates the peak load and overstates quiet periods, so staff is too thin at lunch (long waits) and idle at other times.", 4, true],
      ["fix", "A non-homogeneous model estimates $\\lambda(t)$ through the day (e.g. hourly), so staffing can follow the expected load $\\lambda(t)$ in each period.", 3, true],
    ],
  ),
];

const CP = "compound-poisson-process";
const compound: Item[] = [
  mcq(
    { concept: CP, slug: "recall-mean", cognitive: "recall", difficulty: -0.6, seconds: 35,
      stem: "$S(t) = \\sum_{i=1}^{N(t)} Y_i$ with $N$ Poisson of rate $\\lambda$ and i.i.d. jumps $Y_i$ independent of $N$. What is $\\mathbb{E}[S(t)]$?" },
    "$\\lambda t\\, \\mathbb{E}[Y]$",
    [
      ["$\\lambda\\, \\mathbb{E}[Y]$", "compound-mean-no-t", "The expected number of jumps by time $t$ is $\\lambda t$."],
      ["$\\mathbb{E}[Y]$", "compound-mean-one-jump", "That is the mean of a single jump."],
      ["$\\lambda t + \\mathbb{E}[Y]$", "compound-mean-sum", "Expected count and expected size multiply (Wald)."],
    ],
  ),
  mcq(
    { concept: CP, slug: "recall-variance", cognitive: "recall", difficulty: -0.2, seconds: 40,
      stem: "What is $\\operatorname{Var}(S(t))$ for a compound Poisson process?" },
    "$\\lambda t\\, \\mathbb{E}[Y^2]$",
    [
      ["$\\lambda t\\, \\operatorname{Var}(Y)$", "compound-var-no-mean", "This misses the variability from the random number of jumps, which contributes $\\operatorname{Var}(N)\\mu_Y^2$."],
      ["$(\\lambda t)^2 \\operatorname{Var}(Y)$", "compound-var-squared", "Variances of independent jumps add linearly in the count."],
      ["$\\lambda t\\, (\\mathbb{E}[Y])^2$", "compound-var-mean-squared", "This misses the within-jump variance."],
    ],
  ),
  num(
    { concept: CP, slug: "apply-variance", cognitive: "apply", difficulty: 0.0, seconds: 50,
      stem: "Claims arrive at rate $50$ per year with sizes of mean $2$ and standard deviation $3$. What is the variance of the annual claim total?" },
    650,
  ),
  num(
    { concept: CP, slug: "apply-mean", cognitive: "apply", difficulty: -0.6, seconds: 35,
      stem: "Jumps occur at rate $4$ per day and have mean size $5$. What is the expected total after $2$ days?" },
    40,
  ),
  short(
    { concept: CP, slug: "explain-derive-variance", cognitive: "explain", difficulty: 0.6, seconds: 120,
      stem: "Derive $\\operatorname{Var}(S(t)) = \\lambda t\\, \\mathbb{E}[Y^2]$ using the law of total variance." },
    [
      ["conditional", "Given $N = n$: $\\mathbb{E}[S \\mid N] = N\\mu_Y$ and $\\operatorname{Var}(S \\mid N) = N\\sigma_Y^2$.", 3, true],
      ["total", "$\\operatorname{Var}(S) = \\mathbb{E}[N]\\sigma_Y^2 + \\operatorname{Var}(N)\\mu_Y^2$.", 3, true],
      ["poisson", "With $\\mathbb{E}[N] = \\operatorname{Var}(N) = \\lambda t$, this is $\\lambda t(\\sigma_Y^2 + \\mu_Y^2) = \\lambda t\\, \\mathbb{E}[Y^2]$.", 2],
    ],
  ),
  mcq(
    { concept: CP, slug: "explain-second-moment", cognitive: "explain", difficulty: 0.4, seconds: 45,
      stem: "Why does the variance of a compound Poisson process involve $\\mathbb{E}[Y^2]$ rather than just $\\operatorname{Var}(Y)$?" },
    "The random number of jumps adds variance $\\operatorname{Var}(N)\\mu_Y^2$, and because $\\operatorname{Var}(N) = \\mathbb{E}[N]$ it combines with $\\mathbb{E}[N]\\sigma_Y^2$ into $\\mathbb{E}[N]\\,\\mathbb{E}[Y^2]$",
    [
      ["Because the jumps are dependent", "compound-dependent", "The jumps are i.i.d.; the extra term comes from the random count."],
      ["It is a notational convention; the two are equal", "compound-same", "$\\mathbb{E}[Y^2] = \\operatorname{Var}(Y) + \\mu_Y^2$, which differs unless $\\mu_Y = 0$."],
      ["Because $S$ is always positive", "compound-positive", "Jumps can be negative; the formula still holds."],
    ],
  ),
  num(
    { concept: CP, slug: "transfer-symmetric-jumps", cognitive: "transfer", difficulty: 0.3, seconds: 60,
      stem: "A price moves by $+1$ or $-1$ tick with equal probability at each trade, and trades arrive at rate $10$ per second. What is the variance of the price change over $1$ second?" },
    10,
  ),
  short(
    { concept: CP, slug: "transfer-normal-approx", cognitive: "transfer", difficulty: 0.7, seconds: 120,
      stem: "An insurer approximates its annual claim total by a normal distribution with the compound Poisson mean and variance, and sets reserves at the $99.5\\%$ quantile. When is this dangerous?" },
    [
      ["heavy-tails", "When claim sizes are heavy-tailed or skewed (e.g. catastrophes), the total is right-skewed and the normal quantile understates the tail.", 4, true],
      ["few-claims", "When the expected number of claims $\\lambda t$ is small, the CLT approximation is poor.", 3, true],
      ["alternative", "Mentions simulation, Panjer recursion or fitting a skewed distribution.", 1],
    ],
  ),
];

const CI = "conditional-intensity";
const conditional: Item[] = [
  mcq(
    { concept: CI, slug: "recall-definition", cognitive: "recall", difficulty: -0.4, seconds: 40,
      stem: "What is the conditional intensity $\\lambda^*(t)$ of a point process?" },
    "The instantaneous rate of events at time $t$ given the history of events before $t$",
    [
      ["The expected number of events up to time $t$", "ci-cumulative", "That is the cumulative mean $\\mathbb{E}[N(t)]$, not a rate."],
      ["The probability of exactly one event in $[0, t]$", "ci-probability", "The intensity is a rate per unit time, conditional on the past."],
      ["The average gap between events", "ci-gap", "That is roughly the reciprocal of an average rate."],
    ],
  ),
  mcq(
    { concept: CI, slug: "recall-poisson", cognitive: "recall", difficulty: -0.3, seconds: 35,
      stem: "What distinguishes a (possibly non-homogeneous) Poisson process in terms of its conditional intensity?" },
    "$\\lambda^*(t)$ depends only on $t$, never on the history of past events",
    [
      ["$\\lambda^*(t)$ is constant", "ci-poisson-constant", "That describes only the homogeneous case."],
      ["$\\lambda^*(t)$ increases after each event", "ci-poisson-self-exciting", "That is self-excitation, as in a Hawkes process."],
      ["$\\lambda^*(t)$ is zero between events", "ci-poisson-zero", "The intensity is positive between events."],
    ],
  ),
  num(
    { concept: CI, slug: "apply-mle", cognitive: "apply", difficulty: -0.5, seconds: 40,
      stem: "A homogeneous Poisson process yields $30$ events over $T = 10$ hours. Maximising $n \\log \\lambda - \\lambda T$, what is $\\hat{\\lambda}$ per hour?" },
    3,
  ),
  num(
    { concept: CI, slug: "apply-loglik", cognitive: "apply", difficulty: 0.2, seconds: 60,
      stem: "Compute the log-likelihood $\\sum_i \\log \\lambda^*(t_i) - \\int_0^T \\lambda^*(s)\\,ds$ of $5$ events on $[0, 3]$ under a homogeneous rate $\\lambda = 2$. Give $3$ decimal places." },
    -2.534,
  ),
  short(
    { concept: CI, slug: "explain-likelihood", cognitive: "explain", difficulty: 0.5, seconds: 100,
      stem: "The point-process log-likelihood is $\\sum_i \\log \\lambda^*(t_i) - \\int_0^T \\lambda^*(s)\\,ds$. Explain what each term rewards or penalises." },
    [
      ["first", "The sum rewards a model that puts high intensity at the times where events actually occurred.", 3, true],
      ["compensator", "The integral (compensator) is the expected number of events; it penalises high intensity where no events happened, so the model can't just set the rate high everywhere.", 4, true],
    ],
  ),
  mcq(
    { concept: CI, slug: "explain-time-rescaling", cognitive: "explain", difficulty: 0.6, seconds: 50,
      stem: "A point-process model is fitted and each event is transformed to $\\tau_i = \\int_0^{t_i} \\lambda^*(s)\\,ds$. If the model is correct, what should the gaps $\\tau_i - \\tau_{i-1}$ look like?" },
    "I.i.d. $\\text{Exponential}(1)$",
    [
      ["I.i.d. $\\mathcal{N}(0, 1)$", "rescale-normal", "Gaps are positive; the rescaled process is unit-rate Poisson."],
      ["All equal to $1$", "rescale-constant", "The expected gap is $1$, but the gaps are random."],
      ["Uniform on $[0, 1]$", "rescale-uniform", "Uniformity applies to $1 - e^{-\\text{gap}}$, not to the gaps themselves."],
    ],
  ),
  mcq(
    { concept: CI, slug: "transfer-renewal", cognitive: "transfer", difficulty: 0.6, seconds: 50,
      stem: "A renewal process has i.i.d. gaps with hazard function $h(\\cdot)$. What is its conditional intensity at time $t$?" },
    "$h(t - t_{\\text{last}})$ — the gap hazard evaluated at the time since the most recent event",
    [
      ["$h(t)$", "renewal-absolute-time", "The renewal restarts at each event, so the relevant clock is time since the last one."],
      ["$1/\\mathbb{E}[\\text{gap}]$", "renewal-average", "That is the long-run average rate, not the conditional intensity."],
      ["A constant, as for any stationary process", "renewal-constant", "Only exponential gaps give a constant hazard."],
    ],
  ),
  short(
    { concept: CI, slug: "transfer-neuron", cognitive: "transfer", difficulty: 0.7, seconds: 120,
      stem: "A neuron cannot fire again for about $2$ ms after a spike (a refractory period). Why is a Poisson process a poor model of its spike train, and how would you express the refractory period through the conditional intensity?" },
    [
      ["poisson", "A Poisson process has intensity independent of history, so it allows spikes arbitrarily soon after one another.", 3, true],
      ["intensity", "Make $\\lambda^*(t)$ depend on the time since the last spike — e.g. zero for $2$ ms, then recovering — as in a renewal or history-dependent model.", 4, true],
    ],
  ),
];

const HK = "hawkes-process";
const hawkes: Item[] = [
  mcq(
    { concept: HK, slug: "recall-self-exciting", cognitive: "recall", difficulty: -0.6, seconds: 35,
      stem: "What distinguishes a Hawkes process from a Poisson process?" },
    "Each event temporarily raises the intensity of future events (self-excitation)",
    [
      ["Each event temporarily lowers the intensity", "hawkes-inhibiting", "That would be self-inhibition; Hawkes processes excite."],
      ["Its rate varies deterministically with time of day", "hawkes-is-nhpp", "That is a non-homogeneous Poisson process."],
      ["Events carry random sizes", "hawkes-is-compound", "That is a compound (marked) process."],
    ],
  ),
  mcq(
    { concept: HK, slug: "recall-stationarity", cognitive: "recall", difficulty: -0.2, seconds: 40,
      stem: "With intensity $\\mu + \\sum_{t_i < t} \\alpha e^{-\\beta(t - t_i)}$, when is the Hawkes process stationary?" },
    "When the branching ratio $\\alpha/\\beta < 1$",
    [
      ["When $\\alpha < 1$", "hawkes-alpha-only", "The total excitation per event is $\\alpha/\\beta$, the area under the kernel."],
      ["When $\\mu < 1$", "hawkes-mu", "The baseline scales the rate but doesn't decide stability."],
      ["Always", "hawkes-always-stationary", "With $\\alpha/\\beta \\ge 1$ each event triggers at least one more on average and activity explodes."],
    ],
  ),
  num(
    { concept: HK, slug: "apply-long-run-rate", cognitive: "apply", difficulty: 0.1, seconds: 60,
      stem: "A Hawkes process has $\\mu = 2$, $\\alpha = 1.5$ and $\\beta = 2$. What is its long-run average event rate?" },
    8,
  ),
  num(
    { concept: HK, slug: "apply-intensity", cognitive: "apply", difficulty: -0.1, seconds: 50,
      stem: "A Hawkes process has $\\mu = 1$, $\\alpha = 0.8$, $\\beta = 1$, and a single event at $t = 0$. What is the intensity at $t = 1$? Give $3$ decimal places." },
    1.294,
  ),
  short(
    { concept: HK, slug: "explain-branching", cognitive: "explain", difficulty: 0.6, seconds: 120,
      stem: "Describe the branching (cluster) representation of a Hawkes process and use it to explain why the long-run rate is $\\mu/(1 - n)$, where $n$ is the branching ratio." },
    [
      ["representation", "Immigrants arrive as a Poisson process of rate $\\mu$; each event independently produces a $\\text{Poisson}(n)$ number of children spread out by the kernel, and so on.", 4, true],
      ["cluster", "Each immigrant's cluster has expected size $1 + n + n^2 + \\cdots = 1/(1 - n)$ when $n < 1$.", 3, true],
      ["rate", "So the long-run rate is $\\mu \\times 1/(1 - n)$.", 1],
    ],
  ),
  mcq(
    { concept: HK, slug: "explain-fraction", cognitive: "explain", difficulty: 0.4, seconds: 45,
      stem: "In a stationary Hawkes process with branching ratio $n$, what fraction of events are triggered by earlier events rather than arriving spontaneously?" },
    "$n$",
    [
      ["$1 - n$", "hawkes-fraction-reversed", "$1 - n$ is the spontaneous (immigrant) fraction: $\\mu$ out of $\\mu/(1 - n)$."],
      ["$n/(1 - n)$", "hawkes-fraction-odds", "That is the ratio of triggered to spontaneous events, not the fraction."],
      ["$1/2$ always", "hawkes-fraction-half", "The fraction depends on $n$."],
    ],
  ),
  mcq(
    { concept: HK, slug: "transfer-evidence", cognitive: "transfer", difficulty: 0.5, seconds: 50,
      stem: "Which observation most suggests that trade arrivals should be modelled as a Hawkes process rather than a homogeneous Poisson process?" },
    "Counts in fixed windows are overdispersed (variance well above the mean) and trades cluster in bursts",
    [
      ["Counts in fixed windows have variance equal to their mean", "evidence-equidispersed", "Equal mean and variance is the Poisson signature."],
      ["Gaps between trades are exponentially distributed", "evidence-exponential", "Exponential gaps support a homogeneous Poisson model."],
      ["The average trade rate is high", "evidence-high-rate", "A high rate says nothing about clustering."],
    ],
  ),
  short(
    { concept: HK, slug: "transfer-seasonality", cognitive: "transfer", difficulty: 0.8, seconds: 120,
      stem: "A Hawkes model fitted to a full day of trades, with a constant baseline $\\mu$, reports a branching ratio of $0.95$. Why might this overstate how much trading is self-excited, and how would you check?" },
    [
      ["confounding", "Intraday seasonality (busy open and close) creates clustering that a constant baseline can't explain, so the model attributes it to excitation, inflating $n$.", 4, true],
      ["check", "Refit with a time-varying baseline $\\mu(t)$ (or on deseasonalised/short windows) and compare the branching ratio; use time-rescaling residuals to check fit.", 3, true],
    ],
  ),
];

export const pointProcessItems: Item[] = [
  ...thinning,
  ...nonhomogeneous,
  ...compound,
  ...conditional,
  ...hawkes,
];
