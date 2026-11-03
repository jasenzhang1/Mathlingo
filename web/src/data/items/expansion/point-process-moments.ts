import type { Item } from "../../../lib/assessment/types";
import { makeBuilders } from "../authoring";
import { EXPANSION } from "./source";

/**
 * Stochastic processes: Campbell's theorem and product densities, and the
 * log pair-correlation estimator of the cross-covariance of log-intensities.
 * 40 items each.
 */
const { mcq, short, num } = makeBuilders(EXPANSION);

const CT = "campbell-theorem";
const LP = "log-pair-correlation-estimator";

const s = (concept: string, slug: string, level: number, stem: string, a: string, b: string) =>
  short({ concept, slug, cognitive: level >= 8.5 ? "transfer" : "explain", level, seconds: level >= 9 ? 300 : 180, stem },
    [["main", a, 5, true], ["detail", b, 4, true]]);
// Keys below one get half a unit in their last stated decimal; larger keys keep the 1% default.
const n = (concept: string, slug: string, level: number, stem: string, key: number) => {
  const decimals = (key.toFixed(12).replace(/0+$/, "").split(".")[1] ?? "").length;
  const tol = Math.abs(key) >= 1 || key === 0 ? 0.01 : Math.min(0.01, 0.5 * 10 ** -decimals);
  return num({ concept, slug, cognitive: "apply", level, seconds: level >= 7 ? 90 : level >= 4 ? 60 : 30, stem }, key, tol);
};
const m = (concept: string, slug: string, level: number, stem: string, right: string, wrong: [string, string][]) =>
  mcq({ concept, slug, cognitive: level <= 3 ? "recall" : "apply", level, seconds: 25, stem },
    right, wrong.map(([t, why], i) => [t, `${concept}-${slug}-${i}`, why] as [string, string, string]));

export const campbellTheoremItems: Item[] = [
  // --- level 1 -----------------------------------------------------------
  m(CT, "first-campbell", 1, "Campbell's first formula states that, for a point process $N$ with intensity $\\rho$:",
    "$\\mathbb{E}\\sum_{x \\in N} f(x) = \\int f(s)\\rho(s)\\,ds$",
    [["$\\mathbb{E}\\sum_{x \\in N} f(x) = f\\big(\\int \\rho\\big)$", "The function is applied to each point, not to the total intensity."],
      ["$\\mathbb{E}\\sum_{x \\in N} f(x) = \\int f(s)\\,ds$", "The intensity $\\rho$ weights where points are expected."],
      ["$\\mathbb{E}\\sum_{x \\in N} f(x) = \\sum_x \\rho(x)$", "That sums the intensity over the random points, not the expected value of $f$."]]),
  m(CT, "intensity-meaning", 1, "The intensity $\\rho(s)$ of a point process is best read as:",
    "$\\rho(s)\\,ds \\approx P(\\text{a point lies in } [s, s + ds])$",
    [["the probability of exactly one point in $[0, s]$", "That is a cumulative count probability, not a density in time."],
      ["the number of points in $[0, s]$", "That is the counting process $N(s)$; $\\rho$ is its rate."],
      ["the variance of $N(s)$", "Variance is a second-order quantity; $\\rho$ is first order."]]),
  m(CT, "product-density-meaning", 1, "The product density $\\rho_2(s, t)$ is best read as:",
    "$\\rho_2(s, t)\\,ds\\,dt \\approx P(\\text{points in both } ds \\text{ and } dt)$ for two distinct points",
    [["the covariance of $N(s)$ and $N(t)$", "The covariance is $\\rho_2 - \\rho\\rho$, not $\\rho_2$ itself."],
      ["the product $\\rho(s)\\rho(t)$ for every process", "That is $\\rho_2$ only for a Poisson process."],
      ["the intensity of the superposition of two copies", "It concerns joint occupancy by two distinct points."]]),
  m(CT, "poisson-product", 1, "For a Poisson process, the product density satisfies:",
    "$\\rho_2(s, t) = \\rho(s)\\rho(t)$",
    [["$\\rho_2(s, t) = 0$ for $s \\ne t$", "Points of a Poisson process are independent, so pairs do occur."],
      ["$\\rho_2(s, t) = \\rho(s) + \\rho(t)$", "Joint occupancy multiplies under independence."],
      ["$\\rho_2(s, t) = \\rho(s)^2$", "The two arguments are at different times, with their own intensities."]]),

  // --- level 2 -----------------------------------------------------------
  n(CT, "mean-of-sum", 2, "A process has constant intensity $\\rho = 3$ on $[0, 2]$. Find $\\mathbb{E}\\sum_{x \\in N} x$.", 6),
  n(CT, "mean-count", 2, "A process has intensity $\\rho(t) = 2t$ on $[0, 3]$. Find $\\mathbb{E}N[0, 3]$.", 9),
  n(CT, "poisson-var-count", 2, "A Poisson process has $\\rho = 3$ on $[0, 2]$. Find $\\operatorname{Var}N[0, 2]$ using $\\operatorname{Var}\\sum f = \\int f^2\\rho$ with $f = 1$.", 6),
  n(CT, "poisson-var-count-2", 2, "A Poisson process has $\\rho = 4$ on $[0, 5]$. Find $\\operatorname{Var}N[0, 5]$.", 20),

  // --- level 3 -----------------------------------------------------------
  n(CT, "poisson-shot-var", 3, "A Poisson process has $\\rho = 3$ on $[0, 2]$. Find $\\operatorname{Var}\\sum_{x \\in N} x = \\int_0^2 x^2\\cdot 3\\,dx$.", 8),
  n(CT, "poisson-rho2", 3, "For a Poisson process with $\\rho(s) = 2$ and $\\rho(t) = 3$, find $\\rho_2(s, t)$.", 6),
  n(CT, "pair-corr-value", 3, "A process has $\\rho_2(s, t) = 9$, $\\rho(s) = 2$ and $\\rho(t) = 3$. Find the pair correlation $g(s, t) = \\rho_2/(\\rho\\rho)$. Give $1$ decimal place.", 1.5),
  m(CT, "factorial-moment", 3, "For a set $A$, $\\mathbb{E}[N(A)(N(A) - 1)]$ equals:",
    "$\\iint_{A \\times A}\\rho_2(s, t)\\,ds\\,dt$, the expected number of ordered pairs of distinct points",
    [["$\\big(\\int_A \\rho\\big)^2$", "That equals $\\mathbb{E}[N(A)(N(A) - 1)]$ only for a Poisson process."],
      ["$\\operatorname{Var}N(A)$", "The factorial moment differs from the variance by $\\mathbb{E}N - (\\mathbb{E}N)^2$ terms."],
      ["$\\int_A \\rho_2(s, s)\\,ds$", "Pairs of distinct points involve two integration variables."]]),

  // --- level 4 -----------------------------------------------------------
  n(CT, "poisson-factorial", 4, "A Poisson process has $\\rho = 3$ on $[0, 2]$. Find $\\mathbb{E}[N(N - 1)]$.", 36),
  n(CT, "cox-rho2", 4, "A Cox process has $\\Lambda(t) \\equiv \\Lambda$ with $\\mathbb{E}\\Lambda = 3$ and $\\operatorname{Var}\\Lambda = 4$. Find $\\rho_2(s, t) = \\mathbb{E}\\Lambda^2$.", 13),
  n(CT, "cox-variance", 4, "For that Cox process on $[0, 2]$, find $\\operatorname{Var}N = \\int\\rho + \\iint(\\rho_2 - \\rho\\rho)$.", 22),
  n(CT, "cox-factorial", 4, "For that Cox process on $[0, 2]$, find $\\mathbb{E}[N(N - 1)] = \\iint \\rho_2$.", 52),

  // --- level 5 -----------------------------------------------------------
  m(CT, "cox-rho2-why", 5, "Why does a Cox process have $\\rho_2(s, t) = \\mathbb{E}[\\Lambda(s)\\Lambda(t)]$?",
    "Given $\\Lambda$ the process is Poisson with $\\rho_2 = \\Lambda(s)\\Lambda(t)$; averaging over $\\Lambda$ by the tower property gives the expectation",
    [["Because the intensity $\\Lambda$ is deterministic", "In a Cox process $\\Lambda$ is random."],
      ["Because Cox processes are always Poisson", "Only conditionally on $\\Lambda$ — unconditionally they are overdispersed."],
      ["Because $\\operatorname{Cov}\\{\\Lambda(s), \\Lambda(t)\\} = 0$", "Then $\\rho_2$ would be $\\rho\\rho$; in general the covariance is not zero."]]),
  n(CT, "cross-cov-count", 5, "Neurons $i \\ne j$ are conditionally independent Poisson given constant random intensities with $\\operatorname{Cov}(\\Lambda_i, \\Lambda_j) = 0.5$. Find $\\operatorname{Cov}\\{N_i[0, 2], N_j[0, 1]\\}$.", 1),
  n(CT, "lgcp-rho", 5, "A log-Gaussian Cox process has $\\mu = 0.5$ and $G(s, s) = 1$. Find $\\rho(s) = \\exp\\{\\mu + G(s, s)/2\\}$. Give $4$ decimal places.", 2.7183),
  s(CT, "overdispersion", 5, "Use Campbell's second formula to explain why a Cox process has $\\operatorname{Var}N(A) > \\mathbb{E}N(A)$ whenever the intensity is non-degenerate.",
    "$\\operatorname{Var}N(A) = \\mathbb{E}N(A) + \\iint_{A \\times A}\\{\\rho_2 - \\rho\\rho\\}$ and for a Cox process $\\rho_2 - \\rho\\rho = \\operatorname{Cov}\\{\\Lambda(s), \\Lambda(t)\\}$, whose integral over $A \\times A$ is $\\operatorname{Var}\\int_A \\Lambda \\ge 0$.",
    "Notes that a Poisson process has no extra term, so the excess variance measures the random fluctuation of the cumulative intensity."),

  // --- level 6 -----------------------------------------------------------
  n(CT, "ordered-pairs", 6, "A Poisson process has $\\rho = 2$ on $[0, 3]$. Find the expected number of ordered pairs $(x, y)$ of distinct points, $\\mathbb{E}\\sum_{x \\ne y} 1 = \\iint \\rho_2$.", 36),
  n(CT, "pairs-across-sets", 6, "A Poisson process has $\\rho = 2$. Find the expected number of ordered pairs $(x, y)$ with $x \\in [0, 1]$ and $y \\in [1, 2]$.", 4),
  m(CT, "unbiased-count", 6, "Why is $N(A)$ an unbiased estimator of $\\int_A \\rho$?",
    "First Campbell with $f = \\mathbf{1}_A$ gives $\\mathbb{E}N(A) = \\int_A \\rho$",
    [["Because the counts are always Poisson", "Unbiasedness holds for any point process with intensity $\\rho$."],
      ["Because $N(A)$ is consistent", "Consistency and unbiasedness are different properties."],
      ["Because $\\operatorname{Var}N(A) = 0$", "The count is random with positive variance."]]),
  s(CT, "derive-variance", 6, "Derive $\\operatorname{Var}N(A) = \\int_A \\rho + \\iint_{A \\times A}(\\rho_2 - \\rho\\rho)$ from Campbell's formulas.",
    "$\\mathbb{E}N^2 = \\mathbb{E}[N(N - 1)] + \\mathbb{E}N = \\iint\\rho_2 + \\int\\rho$, and subtracting $(\\mathbb{E}N)^2 = \\iint\\rho\\rho$ gives the formula.",
    "Uses second Campbell with $f = \\mathbf{1}_{A \\times A}$ for distinct pairs and first Campbell for the diagonal term $\\mathbb{E}N$."),

  // --- level 7 -----------------------------------------------------------
  n(CT, "laplace", 7, "For a Poisson process with $\\rho = 3$ on a set of length $2$, $\\mathbb{E}\\exp\\{-\\theta N\\} = \\exp\\{-\\int(1 - e^{-\\theta})\\rho\\}$. Find it for $\\theta = \\ln 2$. Give $4$ decimal places.", 0.0498),
  n(CT, "cov-small-boxes", 7, "Neurons have $\\rho_i = 2$, $\\rho_j = 3$ and $g_{i,j} = 1.5$ near $(s, t)$. Using $\\operatorname{Cov}\\{N_i(A), N_j(B)\\} = \\iint\\rho_i\\rho_j(g - 1)$, find the covariance for $|A| = |B| = 0.1$. Give $2$ decimal places.", 0.03),
  m(CT, "g-interpretation", 7, "A pair correlation $g(s, t) < 1$ means:",
    "points at $s$ and $t$ occur together less often than independence predicts (repulsion / inhibition)",
    [["points at $s$ and $t$ cluster", "Clustering corresponds to $g > 1$."],
      ["the process is Poisson", "Poisson gives $g \\equiv 1$."],
      ["the intensity is zero at $s$ or $t$", "$g$ is a ratio and says nothing about whether $\\rho$ itself vanishes."]]),
  s(CT, "diagonal-exclusion", 7, "Why must a single-process estimator of $\\rho_2$ exclude pairs $(x, x)$, and why does a cross-neuron estimator of $\\rho_{i,j}$ not need to?",
    "$\\rho_2$ counts pairs of *distinct* points; including $(x, x)$ adds a spike of the process at $s = t$ and inflates the diagonal. Spikes of different neurons are different points, so every pair is a legitimate pair.",
    "Notes that the first-order term $\\rho$ would otherwise leak into the second-order estimate, producing spurious clustering at lag $0$."),

  // --- level 8 -----------------------------------------------------------
  n(CT, "gamma-cox-var", 8, "A Cox process on $[0, 1]$ has $\\Lambda \\sim \\text{Gamma}$ with mean $2$ and variance $2$ (constant in time). Find $\\operatorname{Var}N$.", 4),
  n(CT, "gamma-cox-p0", 8, "For $\\Lambda \\sim \\text{Gamma}(\\text{shape } 2, \\text{rate } 1)$ and a Cox process on $[0, 1]$, find $P(N = 0) = \\mathbb{E}e^{-\\Lambda}$. Give $2$ decimal places.", 0.25),
  m(CT, "palm-reading", 8, "For a stationary process, $\\rho_2(s, t)/\\rho(s)$ can be read as:",
    "the intensity at $t$ given that there is a point at $s$ (Palm intensity)",
    [["the marginal intensity at $t$", "Conditioning on a point at $s$ changes the intensity unless the process is Poisson."],
      ["the variance of the count at $t$", "It is an intensity, not a variance."],
      ["the probability that $s = t$", "Distinct points are required, so the diagonal is excluded."]]),
  s(CT, "shot-noise-mean-var", 8, "A stationary Poisson process of rate $\\rho$ drives the shot noise $Y(t) = \\sum_x h(t - x)$. Use Campbell to find $\\mathbb{E}Y(t)$ and $\\operatorname{Var}Y(t)$.",
    "$\\mathbb{E}Y = \\rho\\int h(u)\\,du$ by first Campbell, and for a Poisson process $\\operatorname{Var}Y = \\rho\\int h(u)^2\\,du$.",
    "Explains that the variance has no cross term because $\\rho_2 = \\rho\\rho$ cancels against $(\\mathbb{E}Y)^2$."),

  // --- level 9 -----------------------------------------------------------
  n(CT, "shot-noise-var", 9, "A Poisson process of rate $\\rho = 5$ drives $Y(t) = \\sum_x h(t - x)$ with $h(u) = e^{-u}$ for $u \\ge 0$. Find $\\operatorname{Var}Y(t) = \\rho\\int_0^\\infty h^2$. Give $1$ decimal place.", 2.5),
  n(CT, "shot-noise-cov", 9, "For the same $Y$, $\\operatorname{Cov}\\{Y(t), Y(t + \\tau)\\} = \\rho\\int h(u)h(u + \\tau)\\,du = 5e^{-\\tau}/2$. Find it at $\\tau = 1$. Give $4$ decimal places.", 0.9197),
  m(CT, "need-replicates", 9, "To estimate $\\rho_{i,j}(s, t)$ for a Cox process without assuming stationarity, you need:",
    "many independent trials (replicates) so that products of spikes at $(s, t)$ can be averaged",
    [["one very long recording only", "A single realisation of a non-stationary process gives one observation of each time pair."],
      ["a deterministic intensity", "Then there is no Cox structure to estimate."],
      ["the Hawkes kernel", "A different model; not needed for estimating $\\rho_{i,j}$ by Campbell."]]),
  s(CT, "kernel-estimator", 9, "Use Campbell's second formula to justify the kernel estimator $\\hat\\rho_2(s, t) = \\tfrac1n\\sum_k\\sum_{x \\ne y}K_h(s - x)K_h(t - y)$.",
    "Taking $f(x, y) = K_h(s - x)K_h(t - y)$ gives $\\mathbb{E}\\hat\\rho_2 = \\iint K_h(s - u)K_h(t - v)\\rho_2(u, v)\\,du\\,dv \\approx \\rho_2(s, t)$ for small $h$, and averaging over $n$ independent trials reduces variance.",
    "Mentions the bias–variance trade-off in $h$: a small bandwidth reduces smoothing bias but increases variance."),

  // --- level 10 ----------------------------------------------------------
  s(CT, "hawkes-vs-cox", 10, "A Hawkes process and a Cox process can both show $g > 1$ and overdispersed counts. What can second-order statistics alone tell you about which model fits?",
    "Both produce $\\rho_2 > \\rho\\rho$, so $\\rho$ and $\\rho_2$ cannot always distinguish self-excitation (spikes cause spikes) from a hidden fluctuating intensity (a common cause).",
    "Suggests extra information, such as the asymmetry in time (Hawkes has a causal direction), replicates with different covariates, or the conditional intensity given history."),
  n(CT, "lgcp-var", 10, "Let $\\Lambda = e^{X}$ with $X \\sim \\mathcal{N}(0, 1)$ constant in time, observed on $[0, 1]$. With $\\mathbb{E}N = e^{1/2}$ and $\\mathbb{E}[N(N - 1)] = \\mathbb{E}\\Lambda^2 = e^{2}$, find $\\operatorname{Var}N$. Give $4$ decimal places.", 6.3195),
  m(CT, "judgement", 10, "A colleague estimates $\\operatorname{Cov}\\{N_i(A), N_j(B)\\}$ from spike counts and calls the difference $\\hat\\rho_{i,j} - \\hat\\rho_i\\hat\\rho_j$ 'the dependence'. What is the main drawback?",
    "It scales with firing rates, so it conflates strength of dependence with how active the neurons are",
    [["It is biased downward for every process", "Campbell gives unbiased estimators of the pieces; the issue is interpretation."],
      ["It requires $i = j$", "The cross version is fine for $i \\ne j$."],
      ["It cannot be negative", "It can be negative for inhibition."]]),
  s(CT, "bandwidth-design", 10, "You have $n = 30$ trials of two neurons at about $10$ Hz and want $\\hat\\rho_{i,j}(s, t)$ on a $50 \\times 50$ time grid. Discuss bandwidth, bin counts and what goes wrong at small counts.",
    "Joint pair counts per bin scale like $n\\rho_i\\rho_j\\Delta_s\\Delta_t$, which becomes tiny for narrow bins, so $\\hat\\rho_{i,j}$ is very noisy and often exactly zero; a larger bandwidth trades bias for variance.",
    "Points to smoothing, pooling by lag or using parametric structure, and notes that downstream logs of $\\hat\\rho_{i,j}$ are undefined at zero counts."),
];

export const logPairCorrelationItems: Item[] = [
  // --- level 1 -----------------------------------------------------------
  m(LP, "rho-def", 1, "For a Cox process with random intensity $\\Lambda_i$, the first-order intensity is:",
    "$\\rho_i(s) = \\mathbb{E}\\Lambda_i(s)$",
    [["$\\rho_i(s) = \\Lambda_i(s)$", "$\\Lambda_i$ is random; $\\rho_i$ is its expectation."],
      ["$\\rho_i(s) = \\exp\\{\\mathbb{E}X_i(s)\\}$", "That omits the variance correction for the lognormal mean."],
      ["$\\rho_i(s) = \\operatorname{Var}\\Lambda_i(s)$", "That is a second-order quantity."]]),
  m(LP, "pair-corr-def", 1, "The pair correlation between neurons $i$ and $j$ is:",
    "$g_{i,j}(s, t) = \\rho_{i,j}(s, t)/\\{\\rho_i(s)\\rho_j(t)\\}$",
    [["$g_{i,j}(s, t) = \\rho_{i,j}(s, t) - \\rho_i(s)\\rho_j(t)$", "That difference is the cross-covariance of the intensities, not the ratio."],
      ["$g_{i,j}(s, t) = \\rho_i(s)\\rho_j(t)$", "That is $\\rho_{i,j}$ under independence."],
      ["$g_{i,j}(s, t) = \\rho_{i,j}(s, t)/\\rho_i(s)$", "The ratio must be normalised by both marginal intensities."]]),
  m(LP, "lgcp-def", 1, "In a log-Gaussian Cox process the intensity of neuron $i$ is:",
    "$\\Lambda_i = \\exp(X_i)$ with $X_i$ a Gaussian process",
    [["$\\Lambda_i = \\log X_i$", "The log is applied to the intensity, not the reverse."],
      ["$\\Lambda_i = X_i^2$", "That would be a chi-square-type intensity."],
      ["$\\Lambda_i = X_i$ with $X_i$ Gaussian", "A Gaussian intensity could be negative; the exponential guarantees positivity."]]),
  m(LP, "main-identity", 1, "For a log-Gaussian Cox model, $\\log\\{\\rho_{i,j}(s, t)/(\\rho_i(s)\\rho_j(t))\\}$ equals:",
    "$G_{i,j}(s, t) = \\operatorname{Cov}\\{X_i(s), X_j(t)\\}$",
    [["$\\operatorname{Cov}\\{\\Lambda_i(s), \\Lambda_j(t)\\}$", "That covariance is on the intensity scale, not the log scale."],
      ["$\\mu_i(s) + \\mu_j(t)$", "The ratio cancels the means."],
      ["$G_{i,i}(s, s) + G_{j,j}(t, t)$", "The ratio cancels the marginal variances too."]]),

  // --- level 2 -----------------------------------------------------------
  n(LP, "g-from-rho", 2, "Given $\\rho_{i,j} = 9$, $\\rho_i = 2$, $\\rho_j = 3$, find $g_{i,j}$. Give $1$ decimal place.", 1.5),
  n(LP, "G-from-g", 2, "Find $G_{i,j} = \\log g_{i,j}$ when $g_{i,j} = 1.5$. Give $4$ decimal places.", 0.4055),
  n(LP, "g-from-G", 2, "A kernel has $G_{i,j}(s, t) = 0.7$. Find $g_{i,j}(s, t) = e^{G_{i,j}}$. Give $2$ decimal places.", 2.01),
  n(LP, "g-from-negG", 2, "A kernel has $G_{i,j}(s, t) = -0.5$. Find $g_{i,j} = e^{G_{i,j}}$. Give $4$ decimal places.", 0.6065),

  // --- level 3 -----------------------------------------------------------
  n(LP, "lognormal-mean", 3, "For $\\mu_i = 0$ and $G_{i,i}(s, s) = 2$, find $\\rho_i(s) = \\exp\\{\\mu_i + G_{i,i}/2\\}$. Give $4$ decimal places.", 2.7183),
  n(LP, "lognormal-joint", 3, "With $\\mu_i = \\mu_j = 0$, $G_{i,i} = G_{j,j} = 1$ and $G_{i,j} = 0.5$, find $\\rho_{i,j} = \\exp\\{(G_{i,i} + G_{j,j})/2 + G_{i,j}\\}$. Give $4$ decimal places.", 4.4817),
  n(LP, "binned-G", 3, "Estimates $\\hat\\rho_i = 12$, $\\hat\\rho_j = 20$ and $\\hat\\rho_{i,j} = 300$. Find $\\hat G_{i,j}$. Give $4$ decimal places.", 0.2231),
  m(LP, "negative-G", 3, "If $\\hat G_{i,j}(s, t) < 0$, the neurons:",
    "fire together at times $s$ and $t$ less often than independence predicts (inhibitory or anticorrelated drive)",
    [["fire more synchronously than chance", "Positive $\\hat G$ corresponds to excess co-firing."],
      ["have no relationship", "No relationship corresponds to $\\hat G = 0$."],
      ["have a zero firing rate", "$\\hat G$ is a ratio and is undefined at zero rates."]]),

  // --- level 4 -----------------------------------------------------------
  n(LP, "pair-corr-from-model", 4, "For the model above ($\\mu = 0$, $G_{i,i} = G_{j,j} = 1$, $G_{i,j} = 0.5$), find the pair correlation $\\rho_{i,j}/(\\rho_i\\rho_j)$. Give $4$ decimal places.", 1.6487),
  n(LP, "binned-rho-i", 4, "$n = 10$ trials, bin width $0.1$ s, $12$ spikes of neuron $i$ in the bin (all trials). Find $\\hat\\rho_i$.", 12),
  n(LP, "binned-rho-ij", 4, "$n = 10$ trials, bins of width $0.1$ and $0.1$ s, and $30$ pairs (spike of $i$ in the first bin, spike of $j$ in the second). Find $\\hat\\rho_{i,j} = \\text{pairs}/(n\\Delta_s\\Delta_t)$.", 300),
  n(LP, "thinning-invariant", 4, "True values are $\\rho_i = 2$, $\\rho_j = 3$, $\\rho_{i,j} = 9$. Each neuron is independently thinned, keeping spikes with probability $0.5$. Find the log-ratio $G_{i,j}$ computed from the thinned process. Give $4$ decimal places.", 0.4055),

  // --- level 5 -----------------------------------------------------------
  m(LP, "why-ratio", 5, "Why divide $\\rho_{i,j}$ by $\\rho_i\\rho_j$ before taking the log?",
    "$\\rho_{i,j}$ mixes $\\mu_i$, $\\mu_j$, $G_{i,i}$, $G_{j,j}$ and $G_{i,j}$; dividing by the marginal intensities cancels everything except $G_{i,j}$",
    [["To make the estimator unbiased", "The ratio is not unbiased; unbiasedness holds for the pieces."],
      ["To force the answer to lie in $[0, 1]$", "The ratio can be larger than $1$."],
      ["To remove the dependence between neurons", "The point is to isolate the dependence, not remove it."]]),
  n(LP, "difference-after-thinning", 5, "True $\\rho_i = 2$, $\\rho_j = 3$, $\\rho_{i,j} = 9$; both neurons thinned by $0.5$. Find $\\rho_{i,j}' - \\rho_i'\\rho_j'$ after thinning. Give $2$ decimal places.", 0.75),
  n(LP, "g-minus-1", 5, "If the true $G_{i,j} = 1$, find $g_{i,j} - 1 = e^{1} - 1$, the quantity one would get from the 'relative covariance' $g - 1$. Give $4$ decimal places.", 1.7183),
  s(LP, "ij-alone", 5, "Why can $G_{i,j}(s, t)$ not be recovered from $\\rho_{i,j}(s, t)$ alone?",
    "In a log-Gaussian model $\\log\\rho_{i,j} = \\mu_i + \\mu_j + \\tfrac12 G_{i,i} + \\tfrac12 G_{j,j} + G_{i,j}$, so many different combinations of means, variances and cross-covariance give the same $\\rho_{i,j}$.",
    "States that normalising by $\\rho_i\\rho_j$ (the same sum without $G_{i,j}$) isolates the cross-covariance."),

  // --- level 6 -----------------------------------------------------------
  n(LP, "delta-sd", 6, "Estimates $\\hat\\rho_{i,j}$, $\\hat\\rho_i$, $\\hat\\rho_j$ have coefficients of variation $0.1$, $0.2$, $0.2$. Treating errors as independent, find the approximate standard deviation of $\\hat G_{i,j}$. Give $1$ decimal place.", 0.3),
  n(LP, "delta-var", 6, "By the delta method $\\operatorname{Var}\\log\\hat\\rho \\approx \\mathrm{CV}^2$. Find the variance for $\\mathrm{CV} = 0.25$. Give $4$ decimal places.", 0.0625),
  m(LP, "log-symmetry", 6, "Why is the log scale natural for comparing excitation and inhibition?",
    "Pair correlations $2$ and $1/2$ map to $+\\log 2$ and $-\\log 2$, so the two directions of departure from independence are treated symmetrically",
    [["Because the log of a ratio is always positive", "The log is negative when the ratio is below $1$."],
      ["Because logs make the estimator unbiased", "Logs introduce Jensen bias; they do not remove bias."],
      ["Because the log removes the need for replicates", "Replicates are still needed to estimate $\\rho_{i,j}$."]]),
  s(LP, "thinning-explain", 6, "Explain why the log-ratio $\\hat G_{i,j}$ is unaffected by independent thinning (imperfect spike detection) while $\\hat\\rho_{i,j} - \\hat\\rho_i\\hat\\rho_j$ is not.",
    "Thinning scales $\\rho_i, \\rho_j, \\rho_{i,j}$ by $q_i, q_j, q_iq_j$, so the ratio $\\rho_{i,j}/(\\rho_i\\rho_j)$ is unchanged, whereas the difference scales by $q_iq_j$.",
    "Concludes that the ratio isolates dependence from firing rate and recording quality, which is why it is comparable across neuron pairs."),

  // --- level 7 -----------------------------------------------------------
  n(LP, "psd-check", 7, "A noisy estimate gives the $2 \\times 2$ matrix $\\begin{bmatrix}1 & 1.2\\\\ 1.2 & 1\\end{bmatrix}$ for $G$ at a single time pair. Find its determinant. Give $2$ decimal places.", -0.44),
  n(LP, "log-corr", 7, "With $G_{i,i} = G_{j,j} = 1$ and $G_{i,j} = 0.5$ at the same time $t$, find $\\operatorname{Corr}(X_i(t), X_j(t))$. Give $1$ decimal place.", 0.5),
  m(LP, "non-lgcp", 7, "In a shared-frailty Cox model, $\\Lambda_i = c_iW$ for a gamma variable $W$. What does $\\log\\{\\rho_{i,j}/(\\rho_i\\rho_j)\\}$ measure?",
    "A log-scale dependence summary, but not the covariance of $\\log\\Lambda_i$ and $\\log\\Lambda_j$, which relies on the log-Gaussian assumption",
    [["Exactly $\\operatorname{Cov}(\\log\\Lambda_i, \\log\\Lambda_j)$", "That identity holds only for jointly Gaussian log-intensities."],
      ["Zero, because $W$ is shared", "A shared random factor creates positive dependence, not zero."],
      ["Nothing — it is undefined", "The ratio is well defined; only its interpretation changes."]]),
  s(LP, "bias-consistency", 7, "The estimators $\\hat\\rho_i$ and $\\hat\\rho_{i,j}$ are unbiased by Campbell. Is $\\hat G_{i,j}$ unbiased? What is true instead?",
    "No: the log and the ratio are nonlinear, so by Jensen's inequality the plug-in $\\hat G_{i,j}$ is biased in finite samples, but it is consistent as the number of trials grows.",
    "Adds that bias is largest when counts per bin are small, which also drives variance and zeros."),

  // --- level 8 -----------------------------------------------------------
  n(LP, "frailty-g", 8, "Let $\\Lambda_i = c_iW$ and $\\Lambda_j = c_jW$ with $\\mathbb{E}W = 1$ and $\\operatorname{Var}W = 0.5$. Find $g_{i,j} = \\mathbb{E}W^2$.", 1.5),
  n(LP, "frailty-log-var", 8, "For $W \\sim \\text{Gamma}(\\text{shape } 2, \\text{rate } 2)$, $\\operatorname{Var}(\\log W) = \\pi^2/6 - 1$. Find it. Give $4$ decimal places.", 0.6449),
  m(LP, "bandwidth", 8, "Widening the smoothing bandwidth $h$ when estimating $\\hat\\rho_{i,j}$ typically:",
    "reduces variance and removes zero cells, at the price of more bias",
    [["increases variance and reduces bias", "That is the effect of narrowing the bandwidth."],
      ["has no effect on the log-ratio", "Both numerator and denominator are smoothed, so the estimate changes."],
      ["makes the estimator exactly unbiased", "Smoothing introduces bias."]]),
  s(LP, "gaussian-mgf", 8, "Derive $\\rho_{i,j}(s, t)/\\{\\rho_i(s)\\rho_j(t)\\} = \\exp\\{G_{i,j}(s, t)\\}$ using $\\mathbb{E}e^{Y} = e^{\\mathbb{E}Y + \\operatorname{Var}Y/2}$ for Gaussian $Y$.",
    "$\\rho_{i,j} = \\mathbb{E}e^{X_i(s) + X_j(t)}$ with $Y = X_i(s) + X_j(t)$ having variance $G_{i,i} + G_{j,j} + 2G_{i,j}$, while $\\rho_i\\rho_j$ uses $\\operatorname{Var}X_i = G_{i,i}$ and $\\operatorname{Var}X_j = G_{j,j}$; the ratio leaves $e^{G_{i,j}}$.",
    "Gets the cross term right: the factor $\\tfrac12 \\cdot 2G_{i,j} = G_{i,j}$ and the cancellation of the means."),

  // --- level 9 -----------------------------------------------------------
  n(LP, "full-binned", 9, "$n = 20$ trials, bins of width $0.05$ s for both neurons. Neuron $i$ has $40$ spikes in its bin, neuron $j$ has $30$ in its bin, and there are $90$ cross pairs. Find $\\hat G_{i,j}$ by computing each $\\hat\\rho$ first. Give $4$ decimal places.", 0.4055),
  m(LP, "zero-fix", 9, "A bin pair has no cross pairs, so $\\hat\\rho_{i,j} = 0$ and $\\log 0 = -\\infty$. The best remedy is:",
    "smooth or pool (wider bandwidth, neighbouring bins), or add a small constant before the log",
    [["drop that bin pair from the matrix without comment", "Silent deletion biases the block matrix and breaks its structure."],
      ["replace $\\hat G$ by $0$", "A zero count signals low information, not independence."],
      ["use $\\hat\\rho_{i,j} - \\hat\\rho_i\\hat\\rho_j$ at that pair only", "Mixing scales across cells makes the blocks incoherent."]]),
  s(LP, "best-in-what-sense", 9, "A collaborator says the log-ratio is the 'best' estimator of $G_{i,j}$. In what sense is that true and in what sense is it not?",
    "It is the natural plug-in estimator because it inverts an exact identity under the log-Gaussian model, using unbiased estimates of $\\rho$'s; it is not necessarily minimum variance and is biased in finite samples.",
    "Mentions that the identity needs the log-Gaussian assumption, so under other Cox models it estimates a different dependence summary."),
  s(LP, "to-operator", 9, "Describe how you would turn the estimated $\\hat G_{i,j}$ into an estimate of the block operator $\\Sigma_X$ and what can go wrong.",
    "Evaluate every $\\hat G_{i,j}(s_a, t_b)$ on a grid, multiply by the grid spacing, assemble the $pm \\times pm$ block matrix, symmetrise and project onto positive semi-definite matrices.",
    "Notes that independent estimation of blocks can give a matrix that is not PSD, and that noisy or zero cells distort the eigen-decomposition."),

  // --- level 10 ----------------------------------------------------------
  s(LP, "pairwise-critique", 10, "A student estimates every $\\hat G_{i,j}$ separately, then computes eigenfunctions of the assembled $\\Sigma_X$. Critique this, and propose an alternative.",
    "Blocks are estimated with different noise levels and not jointly constrained, so the assembled matrix may be indefinite and the eigenfunctions unstable; a joint, regularised fit (PSD projection, low-rank or latent-factor model) is preferable.",
    "Raises sample size issues for the small $\\hat\\rho$ cells and suggests latent-field or Bayesian inference that estimates the Gaussian field directly."),
  n(LP, "spatial-g", 10, "An LGCP has $C(r) = 2e^{-r/5}$. Find the pair correlation $g(5) = \\exp(C(5))$. Give $4$ decimal places.", 2.0871),
  m(LP, "judgement", 10, "Two neurons show $\\hat G_{i,j}(s, t) \\approx 0.8$ for all $(s, t)$ with $s \\approx t$ and near $0$ elsewhere. The most defensible reading is:",
    "their log-intensities are positively correlated at matching times, consistent with a shared drive, but the data alone cannot say whether the link is direct",
    [["neuron $i$ causes neuron $j$ to fire", "Symmetric co-fluctuation at the same time does not give direction or causation."],
      ["the neurons are independent", "$\\hat G \\approx 0.8$ is far from independence."],
      ["the neurons have equal firing rates", "The log-ratio is rate-free; it says nothing about rates."]]),
  s(LP, "model-check", 10, "How would you check whether the log-Gaussian assumption behind $G_{i,j} = \\log g_{i,j}$ is reasonable for your spike trains?",
    "Compare empirical counts and pair statistics with simulations from the fitted log-Gaussian model, and check that fitted marginals (variance of counts, interval statistics) match the data.",
    "Considers alternatives such as shared gamma frailty or Hawkes self-excitation and checks whether the data prefer them."),
];
