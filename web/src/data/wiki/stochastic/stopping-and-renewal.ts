import type { WikiArticle } from "../types";

/**
 * Stopping times and random walks (strong Markov property, gambler's ruin, the
 * ballot theorem, optional and optimal stopping), counting and renewal
 * processes, birth–death processes, and Ogata's thinning algorithm.
 */

const norris = "Norris, Markov Chains";
const ross = "Ross, Introduction to Probability Models (12th ed.)";
const williams = "Williams, Probability with Martingales";
const feller = "Feller, An Introduction to Probability Theory and Its Applications, Vol. I (3rd ed.)";

export const stoppingTimesWiki: WikiArticle = {
  conceptId: "stopping-times-strong-markov",
  summary:
    "A filtration $(\\mathcal{F}_n)$ records the information available at each time. A stopping time is a random time whose " +
    "occurrence can be decided from the information so far — without peeking into the future. The strong Markov property " +
    "says a Markov chain restarts afresh, independent of its past, at any stopping time.",
  sections: [
    {
      heading: "Filtrations and stopping times",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Filtration", description: "An increasing family $\\mathcal{F}_0 \\subseteq \\mathcal{F}_1 \\subseteq \\cdots$ of σ-algebras; typically $\\mathcal{F}_n = \\sigma(X_0, \\ldots, X_n)$, “everything seen up to time $n$”." },
            { term: "Adapted process", description: "$X_n$ is known at time $n$: $X_n$ is $\\mathcal{F}_n$-measurable." },
            { term: "Stopping time", description: "A random time $\\tau$ with $\\lbrace\\tau = n\\rbrace \\in \\mathcal{F}_n$ for every $n$: whether you stop now depends only on the past and present." },
          ],
        },
        {
          kind: "table",
          headers: ["Random time", "Stopping time?", "Why"],
          rows: [
            ["First time the walk hits $5$", "Yes", "Decided when it happens"],
            ["First time after $10$ that $X_n > X_{n-1}$", "Yes", "Uses only the past"],
            ["Last time the walk visits $0$ before time $100$", "No", "Needs the future to know it was the last"],
            ["Time of the maximum over $[0, 100]$", "No", "Needs the whole path"],
          ],
        },
      ],
    },
    {
      heading: "The strong Markov property",
      blocks: [
        {
          kind: "prose",
          text:
            "For a stopping time $\\tau$ with $\\tau < \\infty$ and $X_\\tau = i$, the post-$\\tau$ process $(X_{\\tau + n})_{n \\ge 0}$ is a " +
            "Markov chain started at $i$, independent of $X_0, \\ldots, X_\\tau$. At a fixed time this is the ordinary Markov " +
            "property; the strong version allows random times, as long as they don't look ahead.",
        },
        {
          kind: "example",
          title: "Using it: returns are i.i.d. cycles",
          problem: "Why is the number of returns of a chain to state $i$ geometric?",
          steps: [
            "Let $f = P_i(\\text{return to } i)$. Each return time is a stopping time.",
            "By the strong Markov property the chain restarts at $i$ each time, so each further return happens independently with probability $f$.",
          ],
          answer: "$P(\\text{at least } k \\text{ returns}) = f^k$: geometric, infinite with probability $1$ exactly when $f = 1$.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "It fails at non-stopping times",
          text: "At the last visit to $0$ the future is conditioned never to return — the chain is not restarting afresh. The strong Markov property is also what powers the reflection principle for random walks and Brownian motion.",
        },
      ],
    },
  ],
  references: [{ source: norris, locator: "§1.4" }, { source: williams, locator: "Ch. 10" }],
};

export const gamblersRuinWiki: WikiArticle = {
  conceptId: "gamblers-ruin",
  summary:
    "A gambler with $k$ bets $1$ at a time, winning each with probability $p$, until reaching $N$ or going broke. First-step " +
    "analysis gives closed forms for the ruin probability and expected duration, and shows how even a small house edge " +
    "makes ruin near-certain against a rich opponent.",
  sections: [
    {
      heading: "Win probabilities",
      blocks: [
        {
          kind: "formula",
          latex: "P_k(\\text{reach } N) = \\begin{cases}\\dfrac{k}{N} & p = \\tfrac12\\\\[2mm]\\dfrac{1 - (q/p)^k}{1 - (q/p)^N} & p \\ne \\tfrac12\\end{cases}",
          caption: "$q = 1 - p$; derived from $h_k = ph_{k+1} + qh_{k-1}$ with $h_0 = 0$ and $h_N = 1$",
        },
        {
          kind: "example",
          title: "A small edge",
          problem: "Start with $k = 10$, target $N = 20$, and $p = 0.49$. Compute the probability of reaching $20$.",
          steps: ["$r = q/p = 0.51/0.49 \\approx 1.0408$.", "$(1 - r^{10})/(1 - r^{20}) = (1 - 1.4919)/(1 - 2.2258)$."],
          answer: "$\\approx 0.401$ — a $1$-point edge per bet turns a fair $50\\%$ into about $40\\%$.",
        },
      ],
    },
    {
      heading: "Duration and limits",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbb{E}_k[T] = k(N - k) \\quad (p = \\tfrac12)",
          caption: "from $D_k = 1 + \\tfrac12D_{k+1} + \\tfrac12D_{k-1}$, $D_0 = D_N = 0$",
        },
        {
          kind: "list",
          items: [
            "Against an infinitely rich opponent ($N \\to \\infty$), a fair or unfavourable gambler is ruined with probability $1$; a favourable one survives with probability $1 - (q/p)^k$.",
            "In the fair game the gambler's fortune is a martingale, and optional stopping gives $k = N \\cdot P(\\text{win})$ immediately; $S_n^2 - n$ is also a martingale and gives the duration $k(N - k)$.",
            "Bold play (stake as much as needed) maximises the win probability in an unfavourable game; timid play minimises it.",
          ],
        },
      ],
    },
  ],
  references: [{ source: feller, locator: "Ch. XIV" }, { source: ross, locator: "§4.5.1" }],
};

export const ballotTheoremWiki: WikiArticle = {
  conceptId: "ballot-theorem",
  summary:
    "If candidate A receives $a$ votes and B receives $b < a$, counted in random order, A is strictly ahead throughout " +
    "the count with probability $\\frac{a - b}{a + b}$. The proof uses the reflection principle, which counts random-walk " +
    "paths that touch a level by reflecting them there.",
  sections: [
    {
      heading: "The reflection principle",
      blocks: [
        {
          kind: "prose",
          text:
            "Among lattice paths of $\\pm1$ steps from height $x > 0$ to $y > 0$, those that touch $0$ are in bijection with all " +
            "paths from $-x$ to $y$: reflect the segment before the first visit to $0$. The number of $n$-step paths from $0$ to " +
            "height $h$ is $\\binom{n}{(n + h)/2}$.",
        },
        {
          kind: "formula",
          latex: "P\\left(\\max_{k \\le n}S_k \\ge m\\right) = P(S_n \\ge m) + P(S_n > m) \\quad (m \\ge 1)",
          caption: "for symmetric simple random walk — the discrete version of $P(\\max_{s \\le t}W_s \\ge m) = 2P(W_t \\ge m)$",
        },
      ],
    },
    {
      heading: "The ballot theorem",
      blocks: [
        {
          kind: "formula",
          latex: "P(\\text{A strictly ahead throughout}) = \\frac{a - b}{a + b}",
          caption: "Bertrand (1887)",
        },
        {
          kind: "example",
          title: "A close election",
          problem: "A wins $6$ votes to $4$. What is the probability A leads after every vote counted?",
          steps: ["$(6 - 4)/(6 + 4)$."],
          answer: "$\\tfrac15$.",
        },
        {
          kind: "list",
          items: [
            "Proof sketch: A must win the first vote. Bad paths starting with a B-vote are equinumerous (by reflection) with bad paths starting with an A-vote, so bad paths $= 2\\binom{a + b - 1}{a}$ and good paths $= \\binom{a + b - 1}{a - 1} - \\binom{a + b - 1}{a}$.",
            "Corollary: for symmetric simple random walk, $P(S_1 \\ne 0, \\ldots, S_{2n} \\ne 0) = P(S_{2n} = 0) = \\binom{2n}{n}2^{-2n}$.",
            "Catalan numbers count paths that never go below zero, another reflection-principle result.",
          ],
        },
      ],
    },
  ],
  references: [{ source: feller, locator: "Ch. III" }, { source: "Grimmett & Stirzaker, Probability and Random Processes (3rd ed.)", locator: "§3.10" }],
};

export const optionalStoppingWiki: WikiArticle = {
  conceptId: "optional-stopping-theorem",
  summary:
    "A martingale is a fair game: given the past, the expected next value is the current value. Doob's optional stopping " +
    "theorem says you can't beat a fair game by choosing when to stop — $\\mathbb{E}[M_\\tau] = \\mathbb{E}[M_0]$ — provided the " +
    "stopping time and the martingale are suitably controlled. The conditions matter, as the doubling strategy shows.",
  sections: [
    {
      heading: "Martingales",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbb{E}[M_{n+1} \\mid \\mathcal{F}_n] = M_n, \\qquad \\mathbb{E}|M_n| < \\infty",
          caption: "super- and submartingales replace $=$ by $\\le$ and $\\ge$",
        },
        {
          kind: "list",
          items: [
            "Symmetric random walk $S_n$; $S_n^2 - n$; and the exponential martingale $(q/p)^{S_n}$ for a biased walk.",
            "Doob martingale: $M_n = \\mathbb{E}[Y \\mid \\mathcal{F}_n]$ for any integrable $Y$.",
            "Likelihood ratios under the null hypothesis.",
          ],
        },
      ],
    },
    {
      heading: "Optional stopping",
      blocks: [
        {
          kind: "prose",
          text:
            "If $\\tau$ is a stopping time, then $\\mathbb{E}[M_\\tau] = \\mathbb{E}[M_0]$ when any of these hold: (a) $\\tau$ is bounded; " +
            "(b) $\\mathbb{E}[\\tau] < \\infty$ and the increments $|M_{n+1} - M_n|$ are bounded; (c) the stopped process $M_{n \\wedge \\tau}$ is " +
            "bounded (or uniformly integrable) and $\\tau < \\infty$ almost surely.",
        },
        {
          kind: "example",
          title: "Gambler's ruin in one line",
          problem: "A fair walk starts at $k$ and stops at $0$ or $N$. Find the probability of hitting $N$ first, and the expected duration.",
          steps: [
            "$S_{n \\wedge \\tau}$ is bounded, so $k = \\mathbb{E}[S_\\tau] = N \\cdot P(\\text{hit } N)$.",
            "$S_n^2 - n$ is a martingale: $k^2 = \\mathbb{E}[S_\\tau^2] - \\mathbb{E}[\\tau] = N^2 \\cdot \\tfrac{k}{N} - \\mathbb{E}[\\tau]$.",
          ],
          answer: "$P = k/N$ and $\\mathbb{E}[\\tau] = k(N - k)$.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The doubling strategy",
          text: "Double your stake after each loss and stop at the first win: you win $1$ with probability $1$, so $\\mathbb{E}[M_\\tau] = M_0 + 1$. There's no contradiction — the losses before winning are unbounded and $\\mathbb{E}[\\tau]$-type conditions fail. With finite wealth or a table limit, the edge vanishes.",
        },
      ],
    },
  ],
  references: [{ source: williams, locator: "Ch. 10" }, { source: "Grimmett & Stirzaker, Probability and Random Processes (3rd ed.)", locator: "§12.5" }],
};

export const optimalStoppingWiki: WikiArticle = {
  conceptId: "optimal-stopping",
  summary:
    "Optimal stopping asks when to stop observing a random sequence to maximise the expected reward. On a finite horizon " +
    "it is solved by backward induction: stop when the current reward beats the expected value of continuing. The value " +
    "process is the Snell envelope, and famous answers include the secretary problem's $1/e$ rule and the early exercise of American options.",
  sections: [
    {
      heading: "Backward induction",
      blocks: [
        {
          kind: "formula",
          latex: "V_N = Z_N, \\qquad V_n = \\max\\left(Z_n, \\mathbb{E}[V_{n+1} \\mid \\mathcal{F}_n]\\right), \\qquad \\tau^* = \\min\\lbrace n : Z_n = V_n\\rbrace",
          caption: "$V$ is the Snell envelope: the smallest supermartingale dominating the rewards $Z$",
        },
        {
          kind: "example",
          title: "Roll a die up to twice",
          problem: "You may roll a fair die, keep the result, or reroll once and keep the second roll. What is the optimal rule and its value?",
          steps: ["Continuing is worth $\\mathbb{E}[\\text{roll}] = 3.5$.", "Keep a first roll of $4$, $5$ or $6$; reroll $1$, $2$ or $3$.", "Value $= \\tfrac12 \\times 5 + \\tfrac12 \\times 3.5$."],
          answer: "$4.25$.",
        },
      ],
    },
    {
      heading: "The secretary problem",
      blocks: [
        {
          kind: "prose",
          text:
            "$n$ candidates arrive in random order; you can only rank those seen so far and must accept or reject on the spot. To " +
            "maximise the probability of picking the best, reject the first $r - 1$ candidates and then take the first one better " +
            "than all before. The success probability is $\\frac{r - 1}{n}\\sum_{k=r}^n\\frac{1}{k - 1}$, maximised at $r \\approx n/e$, " +
            "where it tends to $1/e \\approx 0.368$.",
        },
        {
          kind: "list",
          items: [
            "Infinite-horizon problems use the optimality equation $V = \\max(Z, PV)$ and need conditions (e.g. discounting) for a solution to exist.",
            "The one-step look-ahead rule is optimal in monotone problems, where once stopping is better than continuing one more step it stays better.",
            "American options are optimal-stopping problems: exercise when the payoff reaches the continuation value; for a call on a non-dividend stock it is never optimal to exercise early.",
          ],
        },
      ],
    },
  ],
  references: [{ source: "Ferguson, Optimal Stopping and Applications", locator: "Ch. 1–3" }, { source: "Chow, Robbins & Siegmund, Great Expectations: The Theory of Optimal Stopping", locator: "Ch. 3" }],
};

export const countingProcessesWiki: WikiArticle = {
  conceptId: "counting-processes",
  summary:
    "A counting process $N(t)$ records how many events have happened by time $t$. Its defining properties are simple — " +
    "non-negative, integer-valued, non-decreasing, right-continuous — and the Poisson process is the special case with " +
    "independent, stationary increments and no simultaneous events.",
  sections: [
    {
      heading: "Definitions",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Counting process", description: "$N(0) = 0$, $N(t) \\in \\lbrace 0, 1, 2, \\ldots\\rbrace$, $N(s) \\le N(t)$ for $s \\le t$; $N(t) - N(s)$ counts events in $(s, t]$." },
            { term: "Independent increments", description: "Counts in disjoint intervals are independent." },
            { term: "Stationary increments", description: "The distribution of $N(t + h) - N(t)$ depends only on $h$." },
            { term: "Orderly (simple)", description: "$P(N(h) \\ge 2) = o(h)$: events arrive one at a time." },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Characterising the Poisson process",
          text: "A counting process with independent, stationary increments that is orderly, with $P(N(h) = 1) = \\lambda h + o(h)$, must be a Poisson process with rate $\\lambda$: $N(t) \\sim \\mathrm{Poisson}(\\lambda t)$.",
        },
      ],
    },
    {
      heading: "Examples and non-examples",
      blocks: [
        {
          kind: "table",
          headers: ["Process", "Independent increments?", "Stationary increments?"],
          rows: [
            ["Poisson process", "Yes", "Yes"],
            ["Non-homogeneous Poisson", "Yes", "No"],
            ["Renewal process (non-exponential gaps)", "No", "Only if started in equilibrium"],
            ["Hawkes process", "No — past events raise the rate", "Yes, once stationary"],
          ],
        },
        {
          kind: "example",
          title: "Using increments",
          problem: "For a Poisson process with $\\lambda = 2$, compute $\\mathrm{Cov}(N(1), N(3))$.",
          steps: ["$N(3) = N(1) + (N(3) - N(1))$, and the increment is independent of $N(1)$.", "$\\mathrm{Cov} = \\mathrm{Var}(N(1)) = \\lambda \\times 1$."],
          answer: "$2$ — in general $\\mathrm{Cov}(N(s), N(t)) = \\lambda\\min(s, t)$.",
        },
      ],
    },
  ],
  references: [{ source: ross, locator: "§5.3" }, { source: "Daley & Vere-Jones, An Introduction to the Theory of Point Processes, Vol. I", locator: "Ch. 3" }],
};

export const interarrivalTimesWiki: WikiArticle = {
  conceptId: "interarrival-times",
  summary:
    "The times between successive events are the interarrival times. For a Poisson process they are i.i.d. Exponential, " +
    "the $n$th arrival time is Gamma distributed, and memorylessness leads to the waiting-time paradox: the gap containing a " +
    "fixed time is on average twice as long as a typical gap.",
  sections: [
    {
      heading: "The Poisson case",
      blocks: [
        {
          kind: "formula",
          latex: "T_1, T_2, \\ldots \\overset{\\text{iid}}{\\sim}\\mathrm{Exp}(\\lambda), \\qquad S_n = T_1 + \\cdots + T_n \\sim \\mathrm{Gamma}(n, \\lambda)",
          caption: "$P(N(t) \\ge n) = P(S_n \\le t)$ links counts and arrival times",
        },
        {
          kind: "list",
          items: [
            "Memorylessness: $P(T > s + t \\mid T > s) = P(T > t)$, so the time to the next event doesn't depend on how long you've waited.",
            "Given $N(t) = n$, the arrival times are distributed as the order statistics of $n$ independent $\\mathrm{Uniform}(0, t)$ variables.",
            "The minimum of independent exponentials with rates $\\lambda_i$ is exponential with rate $\\sum\\lambda_i$, and it is the $i$th with probability $\\lambda_i/\\sum\\lambda_j$.",
          ],
        },
        {
          kind: "example",
          title: "Waiting for the third bus",
          problem: "Buses arrive as a Poisson process with rate $4$ per hour. Find the mean and variance of the time until the third bus.",
          steps: ["$S_3 \\sim \\mathrm{Gamma}(3, 4)$.", "Mean $3/4$ hour, variance $3/16$."],
          answer: "Mean $45$ minutes, variance $0.1875$ hours².",
        },
      ],
    },
    {
      heading: "The waiting-time paradox",
      blocks: [
        {
          kind: "prose",
          text:
            "Arrive at a stop at a random time. With Poisson buses at rate $\\lambda$, your wait is $\\mathrm{Exp}(\\lambda)$ (mean $1/\\lambda$) " +
            "and the time since the last bus is also about $\\mathrm{Exp}(\\lambda)$, so the gap you fell into has mean about $2/\\lambda$ " +
            "— twice the average gap. Long gaps cover more time, so you are more likely to land in one (length-biased sampling).",
        },
      ],
    },
  ],
  references: [{ source: ross, locator: "§5.3.3–5.3.5" }, { source: feller, locator: "Vol. II, §I.4" }],
};

export const renewalProcessesWiki: WikiArticle = {
  conceptId: "renewal-processes",
  summary:
    "A renewal process counts events whose interarrival times are i.i.d. with a general distribution of mean $\\mu$ — " +
    "machine replacements, bus arrivals, customer returns. The renewal theorems say events occur at long-run rate $1/\\mu$, " +
    "and renewal–reward theory turns long-run averages into ratios of cycle expectations.",
  sections: [
    {
      heading: "Limit theorems",
      blocks: [
        {
          kind: "formula",
          latex: "\\frac{N(t)}{t} \\xrightarrow{\\text{a.s.}} \\frac1\\mu, \\qquad \\frac{\\mathbb{E}[N(t)]}{t} \\to \\frac1\\mu, \\qquad N(t) \\approx N\\left(\\frac{t}{\\mu}, \\frac{\\sigma^2t}{\\mu^3}\\right)",
          caption: "strong law, elementary renewal theorem, and renewal CLT ($\\sigma^2$ = interarrival variance)",
        },
        {
          kind: "formula",
          latex: "\\lim_{t\\to\\infty}\\frac{\\text{total reward by } t}{t} = \\frac{\\mathbb{E}[\\text{reward per cycle}]}{\\mathbb{E}[\\text{cycle length}]}",
          caption: "the renewal–reward theorem",
        },
        {
          kind: "example",
          title: "Age replacement",
          problem: "A machine part lasts $\\mathrm{Uniform}(0, 10)$ years. Replacing it at failure costs $\\$500$. What is the long-run cost per year?",
          steps: ["Cycle length mean $\\mu = 5$ years; cost per cycle $\\$500$."],
          answer: "$\\$100$ per year.",
        },
      ],
    },
    {
      heading: "The inspection paradox",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbb{E}[\\text{length of interval containing } t] \\to \\frac{\\mathbb{E}[T^2]}{\\mathbb{E}[T]} = \\mu + \\frac{\\sigma^2}{\\mu} \\ge \\mu",
          caption: "the covering interval is length-biased; its mean exceeds $\\mu$ unless the gaps are constant",
        },
        {
          kind: "list",
          items: [
            "The equilibrium residual life (time until the next renewal) has density $\\bar{F}(x)/\\mu$ and mean $\\mathbb{E}[T^2]/2\\mu$.",
            "For exponential gaps, $\\mathbb{E}[T^2]/\\mathbb{E}[T] = 2/\\lambda$: the Poisson waiting-time paradox is the special case.",
            "Blackwell's renewal theorem: for non-lattice gaps, the expected number of renewals in $(t, t + h]$ tends to $h/\\mu$.",
          ],
        },
      ],
    },
  ],
  references: [{ source: ross, locator: "Ch. 7" }, { source: "Grimmett & Stirzaker, Probability and Random Processes (3rd ed.)", locator: "Ch. 10" }],
};

export const birthDeathWiki: WikiArticle = {
  conceptId: "birth-death-processes",
  summary:
    "A birth–death process is a continuous-time Markov chain on $\\lbrace 0, 1, 2, \\ldots\\rbrace$ that only moves up by one (at " +
    "rate $\\lambda_n$) or down by one (at rate $\\mu_n$). Its stationary distribution follows from balancing flow across each " +
    "edge, and queues, populations and epidemics are all birth–death models.",
  sections: [
    {
      heading: "Stationary distribution",
      blocks: [
        {
          kind: "formula",
          latex: "\\pi_n\\lambda_n = \\pi_{n+1}\\mu_{n+1} \\implies \\pi_n = \\pi_0\\prod_{k=1}^n\\frac{\\lambda_{k-1}}{\\mu_k}",
          caption: "flow up across the cut between $n$ and $n + 1$ equals flow down; a stationary distribution exists iff these products are summable",
        },
        {
          kind: "example",
          title: "The M/M/1 queue",
          problem: "Customers arrive at rate $\\lambda = 3$ per hour and are served at rate $\\mu = 4$. Find the stationary distribution, mean number in system, and mean time in system.",
          steps: [
            "$\\rho = \\lambda/\\mu = 0.75$ and $\\pi_n = (1 - \\rho)\\rho^n$ — geometric.",
            "$L = \\rho/(1 - \\rho) = 3$.",
            "Little's law: $W = L/\\lambda = 1$ hour.",
          ],
          answer: "$\\pi_n = 0.25 \\times 0.75^n$, $L = 3$ customers, $W = 1$ hour.",
        },
      ],
    },
    {
      heading: "Other models",
      blocks: [
        {
          kind: "table",
          headers: ["Model", "$\\lambda_n$", "$\\mu_n$", "Stationary law"],
          rows: [
            ["M/M/1", "$\\lambda$", "$\\mu$", "Geometric, needs $\\lambda < \\mu$"],
            ["M/M/∞", "$\\lambda$", "$n\\mu$", "$\\mathrm{Poisson}(\\lambda/\\mu)$"],
            ["Linear birth–death (Yule if $\\mu = 0$)", "$n\\lambda$", "$n\\mu$", "Extinction or growth; no nontrivial stationary law"],
          ],
        },
        {
          kind: "list",
          items: [
            "Stationary birth–death processes are reversible: the balance equations above are detailed balance.",
            "For the linear birth–death process starting from one individual, extinction is certain if $\\lambda \\le \\mu$, and has probability $\\mu/\\lambda$ otherwise.",
            "By Burke's theorem, the departures from a stationary M/M/1 queue form a Poisson process with rate $\\lambda$ — a consequence of reversibility.",
          ],
        },
      ],
    },
  ],
  references: [{ source: ross, locator: "§6.3, Ch. 8" }, { source: norris, locator: "§3.5, §5.2" }],
};

export const ogataThinningWiki: WikiArticle = {
  conceptId: "ogata-thinning",
  summary:
    "Ogata's thinning algorithm simulates a point process from its conditional intensity $\\lambda(t \\mid \\mathcal{H}_t)$. " +
    "It proposes candidate times from a Poisson process with a dominating rate $\\lambda^*$ and accepts each with probability " +
    "$\\lambda(t)/\\lambda^*$ — Lewis–Shedler thinning, extended to intensities that depend on the process's own history.",
  sections: [
    {
      heading: "The algorithm",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "At the current time $t$, find an upper bound $\\lambda^* \\ge \\lambda(s)$ valid for $s \\ge t$ until the next event (for a Hawkes process with decaying kernels, $\\lambda(t^+)$ works).",
            "Draw $E \\sim \\mathrm{Exp}(\\lambda^*)$ and set $t \\leftarrow t + E$.",
            "Accept $t$ as an event with probability $\\lambda(t)/\\lambda^*$ (draw $U \\sim \\mathrm{Uniform}(0, 1)$, accept if $U\\lambda^* \\le \\lambda(t)$).",
            "Whether or not you accept, update the bound and repeat until the horizon.",
          ],
        },
        {
          kind: "example",
          title: "One Hawkes step",
          problem: "A Hawkes process has $\\lambda(t) = 1 + 0.5e^{-(t - t_1)}$ with one past event at $t_1 = 0$. At $t = 0$, use $\\lambda^* = 1.5$. The proposal lands at $t = 0.7$. What is the acceptance probability?",
          steps: ["$\\lambda(0.7) = 1 + 0.5e^{-0.7} = 1 + 0.5 \\times 0.4966 = 1.2483$.", "Accept with probability $1.2483/1.5$."],
          answer: "$\\approx 0.832$.",
        },
      ],
    },
    {
      heading: "Why it works, and its costs",
      blocks: [
        {
          kind: "list",
          items: [
            "Thinning a Poisson process of rate $\\lambda^*$ by retention probability $\\lambda(t)/\\lambda^*$ leaves a process with intensity $\\lambda(t)$ — the thinning property applied locally, conditional on the history.",
            "The bound must hold until the next proposal; with self-excitation, intensity only jumps up at accepted events, when the bound is recomputed.",
            "Efficiency is the expected acceptance rate: a loose bound wastes proposals. Adaptive bounds, or exact simulation via the cluster (branching) representation of Hawkes processes, avoid this.",
            "The time-rescaling theorem gives an alternative: $\\Lambda(t_i) - \\Lambda(t_{i-1})$ are i.i.d. $\\mathrm{Exp}(1)$, used both to simulate and to check model fit.",
          ],
        },
      ],
    },
  ],
  references: [{ source: "Ogata (1981), On Lewis' Simulation Method for Point Processes, IEEE Trans. Inf. Theory", locator: "§2–3" }, { source: "Lewis & Shedler (1979), Simulation of Nonhomogeneous Poisson Processes by Thinning, Naval Research Logistics Quarterly", locator: "§2" }],
};

export const stoppingAndRenewalWikis: WikiArticle[] = [
  stoppingTimesWiki,
  gamblersRuinWiki,
  ballotTheoremWiki,
  optionalStoppingWiki,
  optimalStoppingWiki,
  countingProcessesWiki,
  interarrivalTimesWiki,
  renewalProcessesWiki,
  birthDeathWiki,
  ogataThinningWiki,
];
