import type { WikiArticle } from "../types";

/**
 * Discrete-time Markov chain theory: Chapman–Kolmogorov, classification of
 * states, periodicity, absorbing chains, hitting times, ergodicity, and
 * detailed balance. The chain itself is introduced in `markov-chains`
 * (graphical models); these articles develop its long-run behaviour.
 */

const norris = "Norris, Markov Chains";
const ross = "Ross, Introduction to Probability Models (12th ed.)";
const lpw = "Levin, Peres & Wilmer, Markov Chains and Mixing Times (2nd ed.)";

export const chapmanKolmogorovWiki: WikiArticle = {
  conceptId: "chapman-kolmogorov",
  summary:
    "The Chapman–Kolmogorov equations say that to go from $i$ to $j$ in $m + n$ steps, a chain must be somewhere at time " +
    "$m$, so you sum over that intermediate state. In matrix form, the $n$-step transition matrix is simply the $n$th power " +
    "$P^n$, and the distribution at time $n$ is $\\mu_0P^n$.",
  sections: [
    {
      heading: "The equations",
      blocks: [
        {
          kind: "formula",
          latex: "P^{(m+n)}_{ij} = \\sum_kP^{(m)}_{ik}P^{(n)}_{kj}, \\qquad P^{(n)} = P^n",
          caption: "$P^{(n)}_{ij} = P(X_{t+n} = j \\mid X_t = i)$ for a time-homogeneous chain",
        },
        {
          kind: "prose",
          text:
            "The proof conditions on $X_m$ and uses the Markov property: once the chain is at $k$ at time $m$, how it got there is " +
            "irrelevant. If the initial distribution is the row vector $\\mu_0$, then $P(X_n = j) = (\\mu_0P^n)_j$.",
        },
        {
          kind: "example",
          title: "Two-step weather",
          problem: "States sunny (S) and rainy (R) with $P = \\begin{bmatrix}0.8 & 0.2\\\\0.4 & 0.6\\end{bmatrix}$. If today is sunny, what is the probability it is sunny in two days?",
          steps: ["Sum over tomorrow: $P_{SS}P_{SS} + P_{SR}P_{RS} = 0.8 \\times 0.8 + 0.2 \\times 0.4$."],
          answer: "$0.64 + 0.08 = 0.72$ — the $(S, S)$ entry of $P^2$.",
        },
      ],
    },
    {
      heading: "Computing powers",
      blocks: [
        {
          kind: "list",
          items: [
            "Diagonalise: if $P = V\\Lambda V^{-1}$ then $P^n = V\\Lambda^nV^{-1}$; the eigenvalue $1$ gives the long-run part and $|\\lambda_2|^n$ controls how fast the rest dies out.",
            "For a two-state chain with $P_{12} = a$ and $P_{21} = b$, the second eigenvalue is $1 - a - b$ and $P^n \\to \\frac{1}{a + b}\\begin{bmatrix}b & a\\\\b & a\\end{bmatrix}$.",
            "Repeated squaring computes $P^n$ in $O(\\log n)$ matrix products.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Continuous time",
          text: "The same logic in continuous time gives $P(s + t) = P(s)P(t)$; differentiating yields Kolmogorov's forward and backward equations $P'(t) = P(t)Q = QP(t)$ with generator $Q$.",
        },
      ],
    },
  ],
  references: [{ source: norris, locator: "§1.1" }, { source: ross, locator: "§4.2" }],
};

export const stateClassificationWiki: WikiArticle = {
  conceptId: "state-classification",
  summary:
    "States of a Markov chain are grouped by which can reach which. States that reach each other form communicating " +
    "classes; a chain with one class is irreducible. Each state is either recurrent (returned to with probability $1$) or " +
    "transient (eventually left for good), and this is a class property.",
  sections: [
    {
      heading: "Definitions",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Accessible ($i \\to j$)", description: "$P^{(n)}_{ij} > 0$ for some $n \\ge 0$." },
            { term: "Communicate ($i \\leftrightarrow j$)", description: "$i \\to j$ and $j \\to i$; an equivalence relation whose classes are the communicating classes." },
            { term: "Closed class", description: "No transitions leave it. A closed class of a single state is an absorbing state." },
            { term: "Irreducible", description: "All states communicate: a single class." },
            { term: "Recurrent / transient", description: "State $i$ is recurrent if $P(\\text{return to } i) = 1$, transient otherwise. Recurrent states are positive recurrent if the mean return time is finite, null recurrent if not." },
          ],
        },
        {
          kind: "formula",
          latex: "i \\text{ recurrent} \\iff \\sum_{n=1}^\\infty P^{(n)}_{ii} = \\infty",
          caption: "the expected number of returns is infinite exactly for recurrent states",
        },
      ],
    },
    {
      heading: "Facts to use",
      blocks: [
        {
          kind: "list",
          items: [
            "Recurrence and transience are class properties: all states in a class share them.",
            "In a finite chain, a class is recurrent if and only if it is closed; at least one class is recurrent, and every recurrent class is positive recurrent.",
            "A transient state is visited only finitely often; the number of visits is geometric.",
            "Simple symmetric random walk is recurrent in dimensions $1$ and $2$ but transient in $3$ and higher (Pólya), and in dimension $1$ it is null recurrent.",
          ],
        },
        {
          kind: "example",
          title: "Classifying a chain",
          problem: "States $1, 2, 3$ with $1 \\to 2$, $2 \\to 1$, $2 \\to 3$, and $3 \\to 3$ with probability $1$. Classify the states.",
          steps: ["$\\lbrace 1, 2\\rbrace$ communicate but can leak to $3$, so that class is not closed.", "$\\lbrace 3\\rbrace$ is closed."],
          answer: "$1$ and $2$ are transient; $3$ is absorbing (recurrent). The chain is reducible.",
        },
      ],
    },
  ],
  references: [{ source: norris, locator: "§1.2, §1.5–1.6" }, { source: ross, locator: "§4.3" }],
};

export const periodicityWiki: WikiArticle = {
  conceptId: "periodicity",
  summary:
    "The period of a state is the greatest common divisor of the times at which the chain can return to it. A chain that " +
    "can only return at even times alternates forever and $P^n$ never converges; aperiodicity is the extra condition, beyond " +
    "irreducibility, needed for the distribution to settle down.",
  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "d(i) = \\gcd\\lbrace n \\ge 1 : P^{(n)}_{ii} > 0\\rbrace",
          caption: "state $i$ is aperiodic when $d(i) = 1$",
        },
        {
          kind: "list",
          items: [
            "Period is a class property: communicating states share a period.",
            "Any self-loop ($P_{ii} > 0$) makes the class aperiodic.",
            "Return times $\\lbrace 2, 3\\rbrace$ give period $\\gcd(2, 3) = 1$ even though no return happens in one step.",
          ],
        },
        {
          kind: "example",
          title: "Random walk on a cycle",
          problem: "A walk on a cycle of $6$ vertices moves to a uniformly chosen neighbour. What is its period? What about a cycle of $5$?",
          steps: ["On an even cycle every return takes an even number of steps.", "On an odd cycle you can return in $2$ steps or go all the way round in $5$."],
          answer: "Period $2$ for the $6$-cycle, period $1$ for the $5$-cycle.",
        },
      ],
    },
    {
      heading: "Why it matters",
      blocks: [
        {
          kind: "prose",
          text:
            "For the two-state chain that always switches, $P^n$ alternates between $I$ and the swap matrix. The stationary " +
            "distribution $(\\tfrac12, \\tfrac12)$ exists, and time averages converge to it, but $P(X_n = 1)$ does not. A periodic " +
            "chain with period $d$ has eigenvalues at the $d$th roots of unity, all of modulus $1$.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The lazy fix",
          text: "Replacing $P$ by $\\tfrac12(I + P)$ — stay put with probability $\\tfrac12$ — makes any chain aperiodic without changing its stationary distribution. MCMC analyses use lazy chains for exactly this reason.",
        },
      ],
    },
  ],
  references: [{ source: norris, locator: "§1.8" }, { source: lpw, locator: "§1.3" }],
};

export const absorbingChainsWiki: WikiArticle = {
  conceptId: "absorbing-markov-chains",
  summary:
    "An absorbing state is one the chain can never leave. When every state can reach an absorbing state, the chain is " +
    "absorbed with probability $1$, and the fundamental matrix $N = (I - Q)^{-1}$ gives expected visits, expected time to " +
    "absorption and where the chain ends up.",
  sections: [
    {
      heading: "Canonical form",
      blocks: [
        {
          kind: "formula",
          latex: "P = \\begin{bmatrix}Q & R\\\\0 & I\\end{bmatrix}, \\qquad N = (I - Q)^{-1} = \\sum_{n \\ge 0}Q^n",
          caption: "$Q$: transient→transient; $R$: transient→absorbing",
        },
        {
          kind: "definitions",
          items: [
            { term: "$N_{ij}$", description: "Expected number of visits to transient state $j$ starting from transient state $i$." },
            { term: "$t = N\\mathbf{1}$", description: "Expected number of steps before absorption from each transient state." },
            { term: "$B = NR$", description: "$B_{ik}$ is the probability of being absorbed in state $k$ starting from $i$." },
          ],
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "A walk on $\\lbrace 0, 1, 2, 3\\rbrace$",
          problem: "A fair walk on $\\lbrace 0, 1, 2, 3\\rbrace$ is absorbed at $0$ and $3$. Find the expected time to absorption from $1$ and the probability of ending at $3$.",
          steps: [
            "$Q = \\begin{bmatrix}0 & \\tfrac12\\\\\\tfrac12 & 0\\end{bmatrix}$, so $N = (I - Q)^{-1} = \\frac{1}{3}\\begin{bmatrix}4 & 2\\\\2 & 4\\end{bmatrix}$.",
            "$t = N\\mathbf{1} = (2, 2)$.",
            "$R = \\begin{bmatrix}\\tfrac12 & 0\\\\0 & \\tfrac12\\end{bmatrix}$, so $B = NR = \\frac13\\begin{bmatrix}2 & 1\\\\1 & 2\\end{bmatrix}$.",
          ],
          answer: "From $1$: expected $2$ steps, and absorption at $3$ with probability $\\tfrac13$.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Where this shows up",
          text: "Gambler's ruin, the expected number of coin flips to see a pattern, credit-rating migration to default, and the expected length of board games are all absorbing-chain calculations.",
        },
      ],
    },
  ],
  references: [{ source: "Kemeny & Snell, Finite Markov Chains", locator: "Ch. III" }, { source: "Grinstead & Snell, Introduction to Probability", locator: "§11.2" }],
};

export const hittingTimesWiki: WikiArticle = {
  conceptId: "first-passage-hitting-times",
  summary:
    "The hitting time of a set $A$ is the first time the chain enters it. Hitting probabilities and expected hitting times " +
    "solve linear equations obtained by first-step analysis: condition on the first move and use the Markov property.",
  sections: [
    {
      heading: "First-step analysis",
      blocks: [
        {
          kind: "formula",
          latex: "h_i = \\begin{cases}1 & i \\in A\\\\\\sum_jP_{ij}h_j & i \\notin A\\end{cases} \\qquad k_i = \\begin{cases}0 & i \\in A\\\\1 + \\sum_jP_{ij}k_j & i \\notin A\\end{cases}",
          caption: "$h_i = P_i(\\text{hit } A)$ and $k_i = \\mathbb{E}_i[T_A]$; take the minimal non-negative solution",
        },
        {
          kind: "example",
          title: "Waiting for HH",
          problem: "Flip a fair coin until two heads in a row. What is the expected number of flips?",
          steps: [
            "States: $0$ (no progress), $1$ (last flip H), done.",
            "$k_0 = 1 + \\tfrac12k_1 + \\tfrac12k_0$ and $k_1 = 1 + \\tfrac12 \\cdot 0 + \\tfrac12k_0$.",
            "Substituting: $k_0 = 6$.",
          ],
          answer: "$6$ flips (whereas HT takes only $4$).",
        },
      ],
    },
    {
      heading: "Return times",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbb{E}_i[T_i^+] = \\frac{1}{\\pi_i}",
          caption: "Kac's formula for an irreducible positive-recurrent chain with stationary distribution $\\pi$",
        },
        {
          kind: "list",
          items: [
            "Minimality matters: for an infinite chain the equations can have several solutions, and the hitting probability is the smallest non-negative one.",
            "For a random walk on a graph, the stationary probability is $\\deg(v)/2|E|$, so the expected return time to $v$ is $2|E|/\\deg(v)$.",
            "Commute time between $u$ and $v$ equals $2|E|$ times the effective resistance between them.",
          ],
        },
      ],
    },
  ],
  references: [{ source: norris, locator: "§1.3" }, { source: lpw, locator: "§1.5, Ch. 10" }],
};

export const ergodicityWiki: WikiArticle = {
  conceptId: "ergodicity",
  summary:
    "An irreducible, aperiodic, positive-recurrent chain is ergodic: whatever its starting point, the distribution of $X_n$ " +
    "converges to the unique stationary distribution $\\pi$, and long-run time averages equal averages under $\\pi$. This is " +
    "what justifies both long-run predictions and MCMC.",
  sections: [
    {
      heading: "The two theorems",
      blocks: [
        {
          kind: "formula",
          latex: "\\lim_{n\\to\\infty}P^{(n)}_{ij} = \\pi_j, \\qquad \\frac1n\\sum_{t=1}^nf(X_t) \\xrightarrow{\\text{a.s.}} \\sum_j\\pi_jf(j)",
          caption: "convergence theorem (needs aperiodicity) and ergodic theorem (needs only irreducibility and positive recurrence)",
        },
        {
          kind: "example",
          title: "Long-run weather",
          problem: "For $P = \\begin{bmatrix}0.8 & 0.2\\\\0.4 & 0.6\\end{bmatrix}$, find the long-run fraction of sunny days.",
          steps: ["Solve $\\pi P = \\pi$: $0.2\\pi_S = 0.4\\pi_R$, so $\\pi_S = 2\\pi_R$.", "Normalise: $\\pi = (\\tfrac23, \\tfrac13)$."],
          answer: "$\\tfrac23$ of days are sunny, whatever today's weather.",
        },
      ],
    },
    {
      heading: "Rates of convergence",
      blocks: [
        {
          kind: "list",
          items: [
            "For a finite reversible chain, the distance to stationarity decays like $|\\lambda_2|^n$, where $\\lambda_2$ is the second-largest eigenvalue in modulus; the spectral gap $1 - |\\lambda_2|$ sets the mixing time.",
            "Coupling: run two copies from different starts until they meet; the total-variation distance is at most the probability they haven't met.",
            "A Markov-chain CLT holds for time averages, but with an asymptotic variance inflated by autocorrelation — the effective sample size in MCMC.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Each condition matters",
          text: "Reducible: the limit depends on where you start. Periodic: $P^n$ oscillates. Null recurrent (e.g. simple random walk on the integers): no stationary distribution exists and $P^{(n)}_{ij} \\to 0$.",
        },
      ],
    },
  ],
  references: [{ source: norris, locator: "§1.7–1.10" }, { source: lpw, locator: "Ch. 4, 12" }],
};

export const detailedBalanceWiki: WikiArticle = {
  conceptId: "detailed-balance-reversibility",
  summary:
    "A distribution $\\pi$ satisfies detailed balance if the probability flow from $i$ to $j$ equals the flow back: " +
    "$\\pi_iP_{ij} = \\pi_jP_{ji}$. Detailed balance implies stationarity and means the stationary chain is reversible — " +
    "statistically identical when run backwards. It is the design principle behind Metropolis–Hastings.",
  sections: [
    {
      heading: "Detailed balance implies stationarity",
      blocks: [
        {
          kind: "formula",
          latex: "\\sum_i\\pi_iP_{ij} = \\sum_i\\pi_jP_{ji} = \\pi_j",
          caption: "sum the detailed balance equations over $i$",
        },
        {
          kind: "example",
          title: "Birth–death chain",
          problem: "A chain on $\\lbrace 0, 1, 2\\rbrace$ moves up with probability $p = 0.4$ and down with probability $q = 0.6$ (staying put at the ends otherwise). Find $\\pi$.",
          steps: ["Detailed balance on each edge: $\\pi_{k+1} = \\pi_k\\,p/q = \\tfrac23\\pi_k$.", "So $\\pi \\propto (1, \\tfrac23, \\tfrac49)$, which sums to $\\tfrac{19}{9}$."],
          answer: "$\\pi = (\\tfrac{9}{19}, \\tfrac{6}{19}, \\tfrac{4}{19})$.",
        },
      ],
    },
    {
      heading: "Reversibility",
      blocks: [
        {
          kind: "list",
          items: [
            "Kolmogorov's criterion: a chain is reversible if and only if, for every cycle, the product of transition probabilities is the same in both directions.",
            "Every stationary birth–death chain and every random walk on an undirected (weighted) graph is reversible, with $\\pi_v \\propto$ the (weighted) degree.",
            "A chain with a net circulation — e.g. a walk on a cycle that moves clockwise with probability $0.9$ — has a stationary distribution (uniform) but is not reversible.",
            "Reversible chains have real eigenvalues, which is what makes their spectral analysis tractable.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Metropolis–Hastings",
          text: "Accepting a proposal $j$ from $i$ with probability $\\min\\left(1, \\frac{\\pi_jq(j, i)}{\\pi_iq(i, j)}\\right)$ is exactly what makes $\\pi_iP_{ij} = \\pi_jP_{ji}$, so $\\pi$ is stationary without ever computing its normalising constant.",
        },
      ],
    },
  ],
  references: [{ source: norris, locator: "§1.9" }, { source: "Kelly, Reversibility and Stochastic Networks", locator: "Ch. 1" }],
};

export const markovChainTheoryWikis: WikiArticle[] = [
  chapmanKolmogorovWiki,
  stateClassificationWiki,
  periodicityWiki,
  absorbingChainsWiki,
  hittingTimesWiki,
  ergodicityWiki,
  detailedBalanceWiki,
];
