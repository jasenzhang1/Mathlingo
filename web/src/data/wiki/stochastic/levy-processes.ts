import type { WikiArticle } from "../types";

export const levyProcessesWiki: WikiArticle = {
  conceptId: "levy-processes",
  summary:
    "A Lévy process is the continuous-time version of a random walk: it starts at $0$, and its increments over disjoint time intervals are independent, " +
    "with a distribution that depends only on the length of the interval. Brownian motion with drift, the Poisson process and the compound Poisson process " +
    "are all Lévy processes, and so is any independent sum of them — which is why jump-diffusion models and insurance surplus models share one theory.",
  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Starts at zero", description: "$X_0 = 0$." },
            { term: "Independent increments", description: "For $0 \\le t_0 < t_1 < \\cdots < t_n$, the increments $X_{t_1} - X_{t_0}, \\ldots, X_{t_n} - X_{t_{n-1}}$ are independent." },
            { term: "Stationary increments", description: "$X_{t+s} - X_s$ has the same distribution as $X_t$ for all $s, t \\ge 0$." },
            { term: "Stochastic continuity", description: "$P(|X_{t+h} - X_t| > \\varepsilon) \\to 0$ as $h \\to 0$. Jumps may happen, but never at a fixed, predictable time." },
          ],
        },
        {
          kind: "prose",
          text:
            "Every Lévy process has a version with *càdlàg* paths — right-continuous with left limits — so at a jump time $s$ the path takes the post-jump value, " +
            "and the jump is $\\Delta X_s = X_s - X_{s-}$. The only Lévy processes with continuous paths are the Brownian motions with drift, $bt + \\sigma W_t$.",
        },
      ],
    },
    {
      heading: "Examples",
      blocks: [
        {
          kind: "table",
          headers: ["Process", "$X_t$", "Mean", "Variance", "Paths"],
          rows: [
            ["Brownian motion with drift", "$bt + \\sigma W_t$", "$bt$", "$\\sigma^2 t$", "Continuous"],
            ["Poisson", "$N_t$, rate $\\lambda$", "$\\lambda t$", "$\\lambda t$", "Jumps of size $1$"],
            ["Compound Poisson", "$\\sum_{i=1}^{N_t} Y_i$", "$\\lambda t\\,\\mathbb{E}[Y]$", "$\\lambda t\\,\\mathbb{E}[Y^2]$", "Finitely many jumps of random size"],
            ["Gamma", "$X_t \\sim \\text{Gamma}(at, b)$", "$at/b$", "$at/b^2$", "Increasing, infinitely many tiny jumps"],
            ["Cauchy", "$X_t \\sim \\text{Cauchy}(0, t)$", "Undefined", "Infinite", "Jumps of all sizes"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Not every familiar process is Lévy",
          text:
            "Geometric Brownian motion is not: its increments scale with the current price. Its logarithm, $\\log(S_t/S_0) = (\\mu - \\sigma^2/2)t + \\sigma W_t$, is. " +
            "The Ornstein–Uhlenbeck process is not either: its drift pulls toward a level, so increments depend on the current value.",
        },
      ],
    },
    {
      heading: "Moments grow linearly in time",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbb{E}[X_t] = t\\,\\mathbb{E}[X_1], \\qquad \\text{Var}(X_t) = t\\,\\text{Var}(X_1)",
          caption: "Whenever these moments are finite.",
        },
        {
          kind: "prose",
          text:
            "Split $[0, t + s]$ at $s$: $X_{t+s} = X_s + (X_{t+s} - X_s)$, a sum of independent pieces distributed like $X_s$ and $X_t$. Means and variances therefore add, " +
            "and an additive, monotone function of time is linear. Two consequences follow at once:",
        },
        {
          kind: "list",
          items: [
            "Sampling at times $0, \\Delta, 2\\Delta, \\ldots$ gives a random walk whose steps are i.i.d. copies of $X_\\Delta$.",
            "$X_t - t\\,\\mathbb{E}[X_1]$ is a martingale; for a Poisson process this is the compensated process $N_t - \\lambda t$.",
            "Every Lévy process is Markov, with a spatially homogeneous transition law: moving from $x$ is moving from $0$, shifted by $x$.",
          ],
        },
        {
          kind: "example",
          title: "A jump-diffusion",
          problem: "$X_t = 2W_t + C_t$, where $C_t$ is an independent compound Poisson process with rate $3$ and jumps satisfying $\\mathbb{E}[Y^2] = 2$. Find $\\text{Var}(X_5)$.",
          steps: [
            "The pieces are independent Lévy processes, so their variances add: $\\text{Var}(X_1) = 2^2 + 3 \\times 2 = 10$.",
            "Variance is linear in time: $\\text{Var}(X_5) = 5 \\times 10 = 50$.",
          ],
          answer: "$\\text{Var}(X_5) = 50$.",
        },
      ],
    },
    {
      heading: "Where Lévy processes are used",
      blocks: [
        {
          kind: "list",
          items: [
            "**Finance.** Log-prices with jumps (Merton's jump-diffusion) or with no Brownian part at all (variance gamma, CGMY) capture heavy tails and implied-volatility smiles.",
            "**Insurance.** The Cramér–Lundberg surplus $U_t = u + ct - \\sum_{i=1}^{N_t} Y_i$ is a drift minus a compound Poisson process.",
            "**Subordination.** Running Brownian motion on an independent increasing Lévy clock, $W_{T_t}$, gives a variance mixture of normals — a Lévy process with fatter tails.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Cont & Tankov, Financial Modelling with Jump Processes", locator: "Ch. 3" },
    { source: "Applebaum, Lévy Processes and Stochastic Calculus (2nd ed.)", locator: "§1.3" },
    { source: "Kyprianou, Fluctuations of Lévy Processes with Applications", locator: "Ch. 1" },
  ],
};

export const levyKhintchineFormulaWiki: WikiArticle = {
  conceptId: "levy-khintchine-formula",
  summary:
    "The law of $X_1$ determines a Lévy process, and that law must be *infinitely divisible*: for every $n$ it is the law of a sum of $n$ i.i.d. pieces. " +
    "The Lévy–Khintchine formula describes every such law by three ingredients — a drift $b$, a Gaussian variance $\\sigma^2$ and a jump measure $\\nu$ — " +
    "through the characteristic function $\\mathbb{E}[e^{iuX_t}] = e^{t\\psi(u)}$.",
  sections: [
    {
      heading: "Infinite divisibility",
      blocks: [
        {
          kind: "prose",
          text:
            "Write $X_1 = \\sum_{k=1}^{n} \\left(X_{k/n} - X_{(k-1)/n}\\right)$: a sum of $n$ i.i.d. increments, for every $n$. So $X_1$ is infinitely divisible. " +
            "Conversely, every infinitely divisible law is the law of $X_1$ for exactly one Lévy process (up to distribution).",
        },
        {
          kind: "table",
          headers: ["Infinitely divisible", "Not infinitely divisible"],
          rows: [
            ["Normal, Poisson, gamma, Cauchy, negative binomial, Student $t$", "Uniform, Bernoulli, binomial — any bounded, non-degenerate law"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why bounded laws fail",
          text:
            "If a bounded $X$ were a sum of $n$ i.i.d. pieces, each piece would have range of order $1/n$, so $\\text{Var}(X) = n\\,\\text{Var}(Y_1) = O(1/n) \\to 0$, contradicting $\\text{Var}(X) > 0$.",
        },
      ],
    },
    {
      heading: "The characteristic exponent",
      blocks: [
        {
          kind: "prose",
          text:
            "Independent stationary increments give $\\phi_{t+s}(u) = \\phi_t(u)\\phi_s(u)$ for $\\phi_t(u) = \\mathbb{E}[e^{iuX_t}]$. A continuous multiplicative function of time is exponential, so " +
            "$\\phi_t(u) = e^{t\\psi(u)}$ with $\\psi(0) = 0$. The *characteristic exponent* $\\psi$ is the whole process in one function.",
        },
        {
          kind: "formula",
          latex:
            "\\psi(u) = ibu - \\frac{\\sigma^2 u^2}{2} + \\int_{\\mathbb{R}\\setminus\\{0\\}} \\left( e^{iux} - 1 - iux\\,\\mathbf{1}_{|x|<1} \\right) \\nu(dx)",
          caption: "The Lévy–Khintchine formula. $\\nu$ must satisfy $\\int \\min(1, x^2)\\,\\nu(dx) < \\infty$.",
        },
        {
          kind: "definitions",
          items: [
            { term: "$b$ (drift)", description: "A deterministic linear trend." },
            { term: "$\\sigma^2$ (Gaussian part)", description: "The variance rate of the continuous Brownian component." },
            { term: "$\\nu$ (Lévy measure)", description: "$\\nu(A)$ is the expected number of jumps per unit time with size in $A$. It need not be finite: infinitely many small jumps are allowed." },
            { term: "Compensator $-iux\\,\\mathbf{1}_{|x|<1}$", description: "Makes the integral converge when small jumps are infinitely many. If $\\int_{|x|<1} |x|\\,\\nu(dx) < \\infty$ it can be folded into the drift." },
          ],
        },
      ],
    },
    {
      heading: "Exponents of the standard examples",
      blocks: [
        {
          kind: "table",
          headers: ["Process", "Triplet", "$\\psi(u)$"],
          rows: [
            ["Brownian motion with drift", "$(b, \\sigma^2, 0)$", "$ibu - \\sigma^2u^2/2$"],
            ["Poisson, rate $\\lambda$", "$(\\cdot, 0, \\lambda\\delta_1)$", "$\\lambda(e^{iu} - 1)$"],
            ["Compound Poisson, jumps $Y \\sim F$", "$(\\cdot, 0, \\lambda F)$", "$\\lambda\\left(\\mathbb{E}[e^{iuY}] - 1\\right)$"],
            ["Cauchy", "$(0, 0, \\tfrac{1}{\\pi}x^{-2}dx)$", "$-|u|$"],
          ],
        },
        {
          kind: "prose",
          text:
            "Exponents of independent processes add, so triplets add componentwise: $X + Y$ has triplet $(b_1 + b_2, \\sigma_1^2 + \\sigma_2^2, \\nu_1 + \\nu_2)$.",
        },
      ],
    },
    {
      heading: "Moments and cumulants",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbb{E}[X_1] = b + \\int_{|x|\\ge 1} x\\,\\nu(dx), \\qquad \\text{Var}(X_1) = \\sigma^2 + \\int x^2\\,\\nu(dx)",
          caption: "When the integrals are finite. $\\mathbb{E}|X_t|^p < \\infty$ exactly when $\\int_{|x|\\ge1} |x|^p\\,\\nu(dx) < \\infty$: only the large jumps can destroy moments.",
        },
        {
          kind: "prose",
          text:
            "Since $\\log\\phi_t = t\\psi$, every cumulant is linear in $t$: $\\kappa_k(X_t) = t\\,\\kappa_k(X_1)$. Skewness therefore decays like $t^{-1/2}$ and excess kurtosis like $t^{-1}$ — " +
            "aggregated over long horizons, a Lévy model looks increasingly Gaussian.",
        },
        {
          kind: "example",
          title: "Moments from a jump measure",
          problem: "A Lévy process has $\\sigma^2 = 1$, no drift beyond its jumps, and $\\nu = 2\\delta_3$ (jumps of size $3$ at rate $2$). Find $\\mathbb{E}[X_1]$ and $\\text{Var}(X_1)$.",
          steps: [
            "$\\mathbb{E}[X_1] = \\int x\\,\\nu(dx) = 2 \\times 3 = 6$.",
            "$\\text{Var}(X_1) = \\sigma^2 + \\int x^2\\,\\nu(dx) = 1 + 2 \\times 9 = 19$.",
          ],
          answer: "Mean $6$, variance $19$.",
        },
      ],
    },
    {
      heading: "Stable laws and limit theorems",
      blocks: [
        {
          kind: "prose",
          text:
            "An $\\alpha$-stable process satisfies $X_{ct} \\stackrel{d}{=} c^{1/\\alpha}X_t$, which forces $\\psi(cu) = c^\\alpha\\psi(u)$ and a Lévy measure $\\nu(dx) = C_\\pm|x|^{-1-\\alpha}dx$ on each half-line. " +
            "The stable laws are exactly the possible limits of centred, scaled sums of i.i.d. variables: the normal ($\\alpha = 2$) when the summands have finite variance, " +
            "and a heavy-tailed stable law when their tails decay like $|x|^{-\\alpha}$ with $\\alpha < 2$.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why this matters in practice",
          text:
            "Densities of most Lévy models have no closed form, but $e^{t\\psi(u)}$ does. Option prices can be computed from it by Fourier inversion, which is what makes calibrating Lévy models to market prices fast.",
        },
      ],
    },
  ],
  references: [
    { source: "Sato, Lévy Processes and Infinitely Divisible Distributions", locator: "Ch. 2, §8" },
    { source: "Cont & Tankov, Financial Modelling with Jump Processes", locator: "§3.4–3.5" },
    { source: "Applebaum, Lévy Processes and Stochastic Calculus (2nd ed.)", locator: "§1.2" },
  ],
};

export const levyItoDecompositionWiki: WikiArticle = {
  conceptId: "levy-ito-decomposition",
  summary:
    "The Lévy–Khintchine formula describes a Lévy process through its law; the Lévy–Itô decomposition describes its paths. Every Lévy process is a drift, " +
    "plus an independent Brownian motion, plus a compound Poisson process of jumps larger than $1$, plus a compensated sum of the jumps smaller than $1$. " +
    "The Lévy measure $\\nu$ says how many jumps of each size arrive per unit time, and whether there are finitely or infinitely many.",
  sections: [
    {
      heading: "The decomposition",
      blocks: [
        {
          kind: "formula",
          latex:
            "X_t = bt + \\sigma W_t + \\sum_{s \\le t} \\Delta X_s\\,\\mathbf{1}_{|\\Delta X_s| \\ge 1} + \\lim_{\\varepsilon \\to 0}\\left( \\sum_{s \\le t} \\Delta X_s\\,\\mathbf{1}_{\\varepsilon \\le |\\Delta X_s| < 1} - t\\int_{\\varepsilon \\le |x| < 1} x\\,\\nu(dx) \\right)",
          caption: "Drift, Brownian part, large jumps, compensated small jumps — four independent pieces.",
        },
        {
          kind: "definitions",
          items: [
            { term: "Large jumps", description: "$\\nu(|x| \\ge 1) < \\infty$, so there are finitely many on any bounded interval: an ordinary compound Poisson process." },
            { term: "Small jumps", description: "There may be infinitely many, and their sizes may not be summable. Subtracting their mean (compensating) gives a martingale with variance $t\\int_{|x|<1} x^2\\,\\nu(dx)$, which converges." },
            { term: "Jump measure", description: "The points $(s, \\Delta X_s)$ form a Poisson random measure with intensity $ds\\,\\nu(dx)$: jump counts in disjoint time–size regions are independent Poisson." },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The pieces are independent",
          text:
            "The continuous fluctuation and the jumps in disjoint size ranges never interact, so means, variances, characteristic functions and simulations can be built piece by piece.",
        },
      ],
    },
    {
      heading: "Activity and variation",
      blocks: [
        {
          kind: "table",
          headers: ["Property", "Condition", "Example"],
          rows: [
            ["Finite activity", "$\\nu(\\mathbb{R}) < \\infty$", "Compound Poisson"],
            ["Infinite activity, finite variation", "$\\nu(\\mathbb{R}) = \\infty$, $\\sigma^2 = 0$, $\\int \\min(1, |x|)\\,\\nu(dx) < \\infty$", "Gamma; stable with $\\alpha < 1$"],
            ["Infinite variation", "$\\sigma^2 > 0$ or $\\int_{|x|<1} |x|\\,\\nu(dx) = \\infty$", "Brownian motion; stable with $\\alpha \\ge 1$"],
          ],
        },
        {
          kind: "example",
          title: "The gamma process",
          problem: "The gamma process has $\\nu(dx) = a x^{-1} e^{-bx}\\,dx$ on $x > 0$. How many jumps does it make, and do its paths have finite variation?",
          steps: [
            "$\\int_0^1 x^{-1} e^{-bx}\\,dx = \\infty$, so $\\nu$ has infinite mass near $0$: infinitely many jumps in every interval.",
            "$\\int_0^\\infty x \\cdot a x^{-1} e^{-bx}\\,dx = a/b < \\infty$, so the jump sizes are summable: finite variation, with mean $\\mathbb{E}[X_1] = a/b$.",
          ],
          answer: "Infinitely many jumps, finite total size — an increasing, pure-jump path.",
        },
      ],
    },
    {
      heading: "Special classes",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Subordinator", description: "A nondecreasing Lévy process: $\\sigma^2 = 0$, only positive jumps with $\\int_0^\\infty \\min(1, x)\\,\\nu(dx) < \\infty$, and nonnegative drift. Used as random clocks." },
            { term: "Spectrally negative", description: "Only negative jumps — e.g. an insurer's surplus, which jumps down at claims and drifts up with premiums." },
            { term: "$\\alpha$-stable", description: "$\\nu(dx) \\propto |x|^{-1-\\alpha}dx$ with $0 < \\alpha < 2$: infinite variance, and finite variation only when $\\alpha < 1$." },
          ],
        },
      ],
    },
    {
      heading: "Using the decomposition",
      blocks: [
        {
          kind: "list",
          items: [
            "**Simulation.** Simulate the jumps with $|x| \\ge \\varepsilon$ exactly as compound Poisson; replace the rest by their mean or by a Brownian motion with variance $\\int_{|x|<\\varepsilon} x^2\\,\\nu(dx)$. The error variance is $t\\int_{|x|<\\varepsilon} x^2\\,\\nu(dx)$.",
            "**Separating volatility from jumps.** Realised variance tends to $\\sigma^2 t + \\sum_{s \\le t} (\\Delta X_s)^2$; bipower variation or truncated variance isolates $\\sigma^2$.",
            "**Itô's formula with jumps.** The continuous part contributes the usual $f'\\,dX^c + \\frac{1}{2}\\sigma^2 f''\\,dt$, and each jump contributes the exact change $f(X_{s-} + \\Delta X_s) - f(X_{s-})$.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Cont & Tankov, Financial Modelling with Jump Processes", locator: "§3.4, §3.6" },
    { source: "Applebaum, Lévy Processes and Stochastic Calculus (2nd ed.)", locator: "§2.4" },
    { source: "Kyprianou, Fluctuations of Lévy Processes with Applications", locator: "Ch. 2" },
  ],
};
