import type { Item } from "../../../lib/assessment/types";
import { makeBuilders } from "../authoring";
import { EXPANSION } from "./source";

/** Probability 40-pass (part B): pmf/pdf, moments, and the named discrete distributions → normal and uniform. */
const { mcq, short, num } = makeBuilders(EXPANSION);

const s = (concept: string, slug: string, level: number, stem: string, a: string, b: string) =>
  short({ concept, slug, cognitive: level >= 8.5 ? "transfer" : "explain", level, seconds: level >= 9 ? 300 : 200, stem },
    [["main", a, 5, true], ["detail", b, 4, true]]);
const n = (concept: string, slug: string, level: number, stem: string, key: number, tol = 0.01) =>
  num({ concept, slug, cognitive: "apply", level, seconds: level >= 7 ? 90 : 25, stem }, key, tol);
void mcq;

const PM = "pmf";
const PD = "pdf";
const EX = "expectation";
const VA = "variance";
const BB = "bernoulli-binomial";
const HG = "hypergeometric-distribution";
const PO = "poisson-distribution";
const GE = "geometric-distribution";
const NB = "negative-binomial-distribution";
const NO = "normal-distribution";
const UN = "uniform-distribution";

export const prFortyBItems: Item[] = [
  // --- pmf ------------------------------------------------------------------------------
  n(PM, "x4p-const", 4, "$p(x) = cx$ for $x = 1, 2, 3, 4$. Compute $c$.", 0.1, 0.001),
  n(PM, "x4p-tail", 7, "$p(x) = 2^{-x}$ for $x = 1, 2, \\ldots$. Compute $P(X \\ge 3)$.", 0.25, 0.001),
  n(PM, "x4p-telescope", 8, "$p(k) = \\frac{1}{k(k + 1)}$ for $k = 1, 2, \\ldots$. Compute $P(X \\ge 10)$.", 0.1, 0.001),
  n(PM, "x4p-trunc-mean", 8, "For the same pmf, compute $\\mathbb{E}[\\min(X, 10)] = \\sum_{k=1}^{10}P(X \\ge k)$.", 2.929, 0.001),
  s(PM, "x4p-infinite-mean", 8.5, "Show that $p(k) = \\frac{1}{k(k + 1)}$ is a valid pmf with infinite mean.",
    "$\\frac{1}{k(k + 1)} = \\frac1k - \\frac1{k + 1}$, so the sum telescopes to $1$; also $P(X \\ge k) = 1/k$.",
    "$\\mathbb{E}[X] = \\sum_kk \\cdot \\frac1{k(k + 1)} = \\sum_k\\frac1{k + 1}$, the harmonic series, which diverges."),
  n(PM, "x4p-zipf", 8.5, "Zipf's law on $\\lbrace 1, \\ldots, 5\\rbrace$ with $p(k) \\propto 1/k$. Compute $P(X = 1)$.", 0.438, 0.001),
  n(PM, "x4p-conv", 9, "$X \\sim \\mathrm{Poisson}(1)$ and $Y \\sim \\mathrm{Poisson}(2)$ are independent. Compute $P(X + Y = 2)$.", 0.224, 0.001),
  s(PM, "x4p-vs-pdf", 9, "Why can a pmf value never exceed $1$, while a pdf value can?",
    "A pmf value is itself a probability, $P(X = x)$.",
    "A pdf value is a probability per unit length; only its integral must be $1$. E.g. $\\mathrm{Uniform}(0, 0.1)$ has density $10$."),
  n(PM, "x4p-bern-sum", 9, "Two independent $\\mathrm{Bernoulli}(0.5)$ variables and one $\\mathrm{Bernoulli}(0.2)$ are added. Compute $P(\\text{sum} = 1)$.", 0.45, 0.001),
  s(PM, "x4p-pgf", 9.5, "What is the probability generating function, and how does it encode the pmf?",
    "$G(s) = \\mathbb{E}[s^X] = \\sum_kp(k)s^k$ for non-negative integer $X$; the pmf is read off as $p(k) = G^{(k)}(0)/k!$.",
    "PGFs of independent sums multiply, $G'(1) = \\mathbb{E}[X]$, and $G''(1) = \\mathbb{E}[X(X - 1)]$ — useful for branching processes and convolutions."),

  // --- pdf ------------------------------------------------------------------------------
  n(PD, "x4p-const", 4, "$f(x) = cx$ on $[0, 2]$. Compute $c$.", 0.5, 0.001),
  n(PD, "x4p-tail", 7, "$f(x) = 3x^2$ on $[0, 1]$. Compute $P(X > 0.5)$.", 0.875, 0.001),
  n(PD, "x4p-peak", 8, "What is the largest value of the density $f(x) = \\lambda e^{-\\lambda x}$ when $\\lambda = 5$?", 5),
  n(PD, "x4p-cauchy", 8, "$f(x) = \\frac{c}{1 + x^2}$ on $\\mathbb{R}$. Compute $c$.", 0.3183, 0.001),
  s(PD, "x4p-cauchy-mean", 8.5, "Why does the Cauchy distribution have no mean?",
    "$\\int|x|\\frac{1}{\\pi(1 + x^2)}\\,dx$ diverges (logarithmically), so $\\mathbb{E}|X| = \\infty$.",
    "Consequently sample means don't settle down: the mean of $n$ i.i.d. Cauchy variables is again standard Cauchy."),
  n(PD, "x4p-mode", 8.5, "Find the mode of $f(x) = 12x^2(1 - x)$ on $[0, 1]$.", 0.6667, 0.001),
  n(PD, "x4p-mixture", 9, "Evaluate the mixture density $0.5N(0, 1) + 0.5N(3, 1)$ at $x = 1.5$.", 0.1295, 0.001),
  s(PD, "x4p-unique", 9, "In what sense is a pdf unique?",
    "Only up to sets of measure zero: changing $f$ at countably many points (or any null set) leaves every probability $\\int_Af$ unchanged.",
    "So statements about “the” density hold almost everywhere; one usually picks a continuous version when it exists."),
  n(PD, "x4p-pareto", 9, "Pareto density $f(x) = (\\alpha - 1)x^{-\\alpha}$ on $x \\ge 1$ with $\\alpha = 3$. Compute $P(X > 10)$.", 0.01, 0.0005),
  s(PD, "x4p-rn", 9.5, "Explain a density as a Radon–Nikodym derivative.",
    "A distribution $P$ has a density with respect to Lebesgue measure exactly when $P$ is absolutely continuous (assigns zero probability to every null set); the density is $dP/d\\lambda$.",
    "A pmf is the density with respect to counting measure. Likelihoods and likelihood ratios are Radon–Nikodym derivatives, which unifies discrete and continuous cases."),

  // --- expectation (9) ------------------------------------------------------------------------
  n(EX, "x4p-all-faces", 7, "What is the expected number of rolls of a fair die needed to see all six faces?", 14.7, 0.001),
  n(EX, "x4p-distinct", 8, "What is the expected number of distinct faces seen in $6$ rolls of a fair die?", 3.9906, 0.001),
  n(EX, "x4p-capped", 8, "St Petersburg game capped at $10$ flips: you win $2^k$ if the first head is on flip $k \\le 10$, otherwise nothing. Compute the expected payout.", 10),
  s(EX, "x4p-indicators", 8.5, "Use indicator variables to find the expected number of fixed points of a random permutation.",
    "Write $X = \\sum_i\\mathbf{1}(\\sigma(i) = i)$; each indicator has expectation $1/n$.",
    "By linearity $\\mathbb{E}[X] = n \\cdot \\frac1n = 1$ for every $n$ — linearity doesn't need independence, though the indicators are dependent."),
  n(EX, "x4p-records", 8.5, "What is the expected number of records (left-to-right maxima) in a random permutation of $10$ items?", 2.929, 0.001),
  n(EX, "x4p-coupon", 9, "Coupon collector with $10$ equally likely coupons: what is the expected number of draws to collect all of them?", 29.29, 0.001),
  s(EX, "x4p-stpete", 9, "Explain the St Petersburg paradox and its main resolutions.",
    "The game pays $2^k$ with probability $2^{-k}$, so its expected value is infinite, yet nobody would pay much to play.",
    "Resolutions: diminishing marginal utility (e.g. log utility gives a finite value), the counterparty's finite wealth capping payouts, and risk aversion."),
  n(EX, "x4p-empty", 9, "$10$ balls are placed independently and uniformly into $10$ boxes. What is the expected number of empty boxes?", 3.4868, 0.001),
  s(EX, "x4p-tailsum", 9.5, "Prove $\\mathbb{E}[X] = \\sum_{k \\ge 1}P(X \\ge k)$ for a non-negative integer $X$, and use it for the geometric distribution.",
    "$X = \\sum_{k \\ge 1}\\mathbf{1}(X \\ge k)$; take expectations term by term.",
    "For a geometric (trials) variable $P(X \\ge k) = (1 - p)^{k-1}$, so $\\mathbb{E}[X] = \\sum_k(1 - p)^{k-1} = 1/p$."),

  // --- variance ---------------------------------------------------------------------------
  n(VA, "x4p-affine", 4, "$\\mathrm{Var}(X) = 4$. Compute $\\mathrm{Var}(3X + 2)$.", 36),
  n(VA, "x4p-die", 7, "Compute the variance of a fair die roll.", 2.9167, 0.001),
  n(VA, "x4p-fixed", 8, "What is the variance of the number of fixed points of a random permutation of $10$ items?", 1),
  s(VA, "x4p-fixed-derive", 8, "Derive the variance of the number of fixed points of a random permutation of $n$ items.",
    "With indicators $I_i$: $\\mathrm{Var}(I_i) = \\frac1n(1 - \\frac1n)$, and for $i \\ne j$, $\\mathrm{Cov}(I_i, I_j) = \\frac1{n(n - 1)} - \\frac1{n^2}$.",
    "Summing: $n \\cdot \\frac1n(1 - \\frac1n) + n(n - 1)(\\frac1{n(n - 1)} - \\frac1{n^2}) = (1 - \\frac1n) + \\frac1n = 1$."),
  n(VA, "x4p-mean", 8.5, "Compute the variance of the mean of $25$ i.i.d. draws with $\\sigma^2 = 100$.", 4),
  n(VA, "x4p-diff", 8.5, "$\\mathrm{Var}(X) = 4$, $\\mathrm{Var}(Y) = 9$ and $\\mathrm{Cov}(X, Y) = 3$. Compute $\\mathrm{Var}(X - Y)$.", 7),
  n(VA, "x4p-heads-tails", 9, "Compute the variance of (heads − tails) in $100$ fair coin flips.", 100),
  s(VA, "x4p-robust", 9, "Why is variance sensitive to outliers, and what are robust alternatives?",
    "It squares deviations, so a single extreme value can dominate it; its influence is unbounded.",
    "Robust measures of spread include the median absolute deviation (MAD) and the interquartile range."),
  n(VA, "x4p-max", 9, "What is the largest possible variance of a random variable taking values in $[0, 1]$?", 0.25, 0.001),
  s(VA, "x4p-popoviciu", 9.5, "Show that a random variable on $[a, b]$ has variance at most $(b - a)^2/4$.",
    "The mean minimises $\\mathbb{E}[(X - c)^2]$, so $\\mathrm{Var}(X) \\le \\mathbb{E}[(X - m)^2]$ with $m = (a + b)/2$, and $|X - m| \\le (b - a)/2$.",
    "Equality holds for the two-point distribution putting mass $\\tfrac12$ at each endpoint."),

  // --- bernoulli-binomial -------------------------------------------------------------------
  n(BB, "x4p-mean", 4, "Compute the mean of $\\mathrm{Bin}(10, 0.3)$.", 3),
  n(BB, "x4p-zero", 7, "For $\\mathrm{Bin}(10, 0.3)$, compute $P(X = 0)$.", 0.02825, 0.0005),
  n(BB, "x4p-center", 8, "For $\\mathrm{Bin}(20, 0.5)$, compute $P(X = 10)$.", 0.1762, 0.001),
  n(BB, "x4p-mode", 8, "Find the mode of $\\mathrm{Bin}(10, 0.35)$.", 3),
  n(BB, "x4p-cc", 8.5, "For $\\mathrm{Bin}(100, 0.5)$, use the normal approximation with continuity correction to find $P(X \\ge 60)$.", 0.0287, 0.0005),
  s(BB, "x4p-cc-why", 8.5, "Why does the continuity correction improve the normal approximation to the binomial?",
    "Each integer $k$ carries a probability that the continuous approximation spreads over $[k - \\tfrac12, k + \\tfrac12]$.",
    "So $P(X \\ge 60)$ should be approximated by the normal area above $59.5$, not $60$, matching the histogram's area."),
  n(BB, "x4p-even", 9, "Compute the probability that $\\mathrm{Bin}(5, 0.3)$ is even.", 0.5051, 0.001),
  s(BB, "x4p-even-derive", 9, "Derive $P(\\mathrm{Bin}(n, p) \\text{ is even}) = \\frac{1 + (1 - 2p)^n}{2}$.",
    "$P(\\text{even}) - P(\\text{odd}) = \\mathbb{E}[(-1)^X] = \\prod_i\\mathbb{E}[(-1)^{X_i}] = (1 - 2p)^n$, using the PGF at $-1$.",
    "Adding $P(\\text{even}) + P(\\text{odd}) = 1$ gives the formula."),
  n(BB, "x4p-phat", 9, "Compute the variance of $\\hat{p} = X/50$ for $X \\sim \\mathrm{Bin}(50, 0.2)$.", 0.0032, 0.0001),
  s(BB, "x4p-lecam", 9.5, "Explain why $\\mathrm{Bin}(n, \\lambda/n) \\to \\mathrm{Poisson}(\\lambda)$ and how good the approximation is.",
    "$\\binom{n}{k}(\\lambda/n)^k(1 - \\lambda/n)^{n-k} \\to e^{-\\lambda}\\lambda^k/k!$, since $\\binom{n}{k}/n^k \\to 1/k!$ and $(1 - \\lambda/n)^n \\to e^{-\\lambda}$.",
    "Le Cam's inequality bounds the total variation distance by $\\sum p_i^2 = \\lambda^2/n$ — and the result extends to unequal $p_i$."),

  // --- hypergeometric-distribution (9) -------------------------------------------------------
  n(HG, "x4p-mean", 7, "An urn has $10$ red and $5$ blue balls; $4$ are drawn without replacement. Compute the expected number of reds.", 2.6667, 0.001),
  n(HG, "x4p-var", 8, "Compute the variance of the number of reds.", 0.6984, 0.001),
  n(HG, "x4p-lotto", 8, "In a $6$-from-$49$ lottery, what is the probability of matching exactly $3$ numbers?", 0.01765, 0.0002),
  s(HG, "x4p-fpc", 8.5, "Explain the finite population correction in the hypergeometric variance.",
    "The variance is $n\\frac{K}{N}(1 - \\frac{K}{N})\\frac{N - n}{N - 1}$: the binomial variance times $\\frac{N - n}{N - 1}$, because sampling without replacement makes draws negatively correlated.",
    "The factor tends to $1$ when $N \\gg n$ and is $0$ when $n = N$ (the whole population is observed)."),
  n(HG, "x4p-capture", 8.5, "Capture–recapture: $50$ animals are marked; later $40$ are caught, of which $8$ are marked. Compute the Lincoln–Petersen estimate of the population size.", 250),
  n(HG, "x4p-qc", 9, "A lot of $100$ items has $5$ defectives. A sample of $10$ is drawn, and the lot is accepted if it contains none. Compute the acceptance probability.", 0.5838, 0.001),
  s(HG, "x4p-approx", 9, "When is the binomial a good approximation to the hypergeometric?",
    "When the sample is a small fraction of the population (say $n/N < 0.05$), because sampling without replacement then barely changes the composition.",
    "The finite population correction is then close to $1$, so the variances nearly agree."),
  n(HG, "x4p-mode", 9.5, "Find the mode $\\lfloor(n + 1)(K + 1)/(N + 2)\\rfloor$ of the hypergeometric with $N = 50$, $K = 20$ and $n = 10$.", 4),
  s(HG, "x4p-fisher", 9.5, "Explain why Fisher's exact test uses the hypergeometric distribution.",
    "Conditioning on both margins of a $2 \\times 2$ table, under independence one cell count determines the table and follows a hypergeometric distribution.",
    "This gives an exact null distribution free of the nuisance proportion; under an odds ratio $\\ne 1$ the count follows Fisher's noncentral hypergeometric distribution."),

  // --- poisson-distribution ----------------------------------------------------------------
  n(PO, "x4p-zero", 4, "For $\\mathrm{Poisson}(3)$, compute $P(X = 0)$.", 0.0498, 0.0005),
  n(PO, "x4p-le2", 7, "For $\\mathrm{Poisson}(3)$, compute $P(X \\le 2)$.", 0.4232, 0.001),
  n(PO, "x4p-equal", 8, "$X \\sim \\mathrm{Poisson}(\\lambda)$ with $P(X = 1) = P(X = 2)$. Find $\\lambda$.", 2),
  n(PO, "x4p-mode", 8, "Find the mode of $\\mathrm{Poisson}(3.7)$.", 3),
  n(PO, "x4p-even", 8.5, "For $\\mathrm{Poisson}(4)$, compute $P(X \\text{ is even}) = (1 + e^{-2\\lambda})/2$.", 0.50017, 0.0001),
  s(PO, "x4p-overdisp", 8.5, "Why does a Poisson variable have variance equal to its mean, and what does overdispersion suggest?",
    "The Poisson is the limit of $\\mathrm{Bin}(n, \\lambda/n)$, whose variance $n\\frac\\lambda n(1 - \\frac\\lambda n) \\to \\lambda$, the mean.",
    "Variance greater than the mean suggests heterogeneity in rates or clustering of events; a negative binomial (gamma–Poisson) model is the usual fix."),
  n(PO, "x4p-factorial", 9, "For $X \\sim \\mathrm{Poisson}(2)$, compute $\\mathbb{E}[X(X - 1)]$.", 4),
  n(PO, "x4p-thin", 9, "Arrivals are $\\mathrm{Poisson}(10)$, and each is female with probability $0.3$ independently. Compute $P(\\text{no female arrivals})$.", 0.0498, 0.0005),
  s(PO, "x4p-split", 9, "Show that splitting a Poisson count by independent coin flips gives independent Poisson counts.",
    "$P(A = a, B = b) = e^{-\\lambda}\\frac{\\lambda^{a+b}}{(a + b)!}\\binom{a + b}{a}p^aq^b = e^{-\\lambda p}\\frac{(\\lambda p)^a}{a!} \\cdot e^{-\\lambda q}\\frac{(\\lambda q)^b}{b!}$.",
    "The joint pmf factorises, so $A \\sim \\mathrm{Poisson}(\\lambda p)$ and $B \\sim \\mathrm{Poisson}(\\lambda q)$ are independent — even though $A + B$ is random."),
  n(PO, "x4p-var-thin", 9.5, "$X \\sim \\mathrm{Poisson}(10)$ and $Y \\mid X \\sim \\mathrm{Bin}(X, 0.3)$. Compute $\\mathrm{Var}(Y)$.", 3),

  // --- geometric-distribution ----------------------------------------------------------------
  n(GE, "x4p-mean", 4, "Number of trials to the first success with $p = 0.2$: compute the mean.", 5),
  n(GE, "x4p-tail", 7, "Compute $P(X > 5)$ for $p = 0.2$.", 0.3277, 0.001),
  n(GE, "x4p-var", 8, "Compute $\\mathrm{Var}(X)$ for $p = 0.2$.", 20),
  n(GE, "x4p-even", 8, "Compute $P(X \\text{ is even})$ for $p = 0.2$.", 0.4444, 0.001),
  s(GE, "x4p-memoryless", 8.5, "Show that the geometric is the only memoryless distribution on the positive integers.",
    "Memorylessness means $P(X > m + n) = P(X > m)P(X > n)$ for all $m, n$, so $P(X > n) = P(X > 1)^n$ by induction.",
    "Writing $q = P(X > 1)$ gives $P(X = n) = q^{n-1}(1 - q)$ — the geometric distribution."),
  n(GE, "x4p-min", 8.5, "$X$ and $Y$ are independent geometric variables with $p = 0.2$. $\\min(X, Y)$ is geometric; find its success probability.", 0.36, 0.001),
  n(GE, "x4p-cond", 9, "Flip a fair coin until the first head. Given that more than $3$ flips are needed, what is the expected total number of flips?", 5),
  n(GE, "x4p-duel", 9, "Two players alternate rolling a die; whoever rolls a six first wins. What is the probability the first player wins?", 0.5455, 0.001),
  s(GE, "x4p-conventions", 9, "Describe the two conventions for the geometric distribution and their means.",
    "Counting trials to the first success gives support $\\lbrace 1, 2, \\ldots\\rbrace$ and mean $1/p$; counting failures before it gives support $\\lbrace 0, 1, \\ldots\\rbrace$ and mean $(1 - p)/p$.",
    "Both have variance $(1 - p)/p^2$; software packages differ (e.g. R and SciPy), so check which one is used."),
  n(GE, "x4p-sum", 9.5, "Three independent geometric (trials) variables with $p = 0.5$ are added. Compute $P(\\text{sum} = 5)$.", 0.1875, 0.001),

  // --- negative-binomial-distribution --------------------------------------------------------
  n(NB, "x4p-mean", 4, "What is the expected number of trials to the $3$rd success when $p = 0.5$?", 6),
  n(NB, "x4p-pmf", 7, "With $p = 0.4$, compute the probability that the $3$rd success occurs on trial $5$.", 0.1382, 0.001),
  n(NB, "x4p-var", 8, "Compute the variance of the number of trials to the $3$rd success when $p = 0.4$.", 11.25, 0.001),
  n(NB, "x4p-overdisp", 8, "A negative binomial with mean $\\mu = 5$ and dispersion $k = 2$ has variance $\\mu + \\mu^2/k$. Compute it.", 17.5, 0.001),
  s(NB, "x4p-gamma-poisson", 8.5, "Explain how the negative binomial arises as a gamma–Poisson mixture.",
    "If $\\lambda \\sim \\mathrm{Gamma}(k, \\text{rate } \\beta)$ and $Y \\mid \\lambda \\sim \\mathrm{Poisson}(\\lambda)$, integrating out $\\lambda$ gives a negative binomial for $Y$.",
    "It models counts whose rates vary across units; the extra variance $\\mu^2/k$ comes from that heterogeneity."),
  n(NB, "x4p-zero-fail", 8.5, "Counting failures before the $5$th success with $p = 0.9$, compute $P(\\text{0 failures})$.", 0.5905, 0.001),
  n(NB, "x4p-series", 9, "A team wins each game independently with probability $0.6$. Compute its probability of winning a best-of-$7$ series.", 0.7102, 0.001),
  s(NB, "x4p-vs-poisson", 9, "Why does the negative binomial often fit count data better than the Poisson, and how do their variance functions differ?",
    "The Poisson forces variance = mean; the negative binomial has $\\mathrm{Var} = \\mu + \\mu^2/k$, which accommodates overdispersion.",
    "As $k \\to \\infty$ it reduces to the Poisson; quasi-Poisson models instead use a variance linear in $\\mu$."),
  n(NB, "x4p-games", 9, "Two evenly matched teams play a best-of-$7$ series. What is the expected number of games played?", 5.8125, 0.001),
  s(NB, "x4p-duality", 9.5, "Explain why $P(\\text{more than } n \\text{ trials to the } r\\text{th success}) = P(\\mathrm{Bin}(n, p) < r)$.",
    "Needing more than $n$ trials to reach $r$ successes means exactly that the first $n$ trials contained fewer than $r$ successes.",
    "The same duality links Poisson counts and Gamma waiting times: $P(S_r > t) = P(N(t) < r)$."),

  // --- normal-distribution -------------------------------------------------------------------
  n(NO, "x4p-z", 4, "$X \\sim N(100, 15^2)$. Compute the z-score of $x = 130$.", 2),
  n(NO, "x4p-tail", 7, "For the same $X$, compute $P(X > 130)$.", 0.02275, 0.0005),
  n(NO, "x4p-iqr", 8, "Compute the interquartile range of $N(0, 4)$ (variance $4$).", 2.698, 0.001),
  n(NO, "x4p-absz", 8, "Compute $\\mathbb{E}|Z|$ for $Z \\sim N(0, 1)$.", 0.7979, 0.001),
  n(NO, "x4p-kurt", 8.5, "Compute $\\mathbb{E}[Z^4]$ for $Z \\sim N(0, 1)$.", 3),
  s(NO, "x4p-why", 8.5, "Why does the normal distribution appear so often?",
    "By the central limit theorem, sums of many small independent effects are approximately normal.",
    "It's also the maximum-entropy distribution for a given mean and variance, and it's closed under linear combinations, which makes it analytically convenient."),
  n(NO, "x4p-mills", 9, "Use the approximation $P(Z > z) \\approx \\varphi(z)/z$ to estimate $P(Z > 4)$.", 0.00003346, 0.000001),
  n(NO, "x4p-sum", 9, "$X$ and $Y$ are i.i.d. $N(0, 1)$. Compute $P(X + Y > 2)$.", 0.0786, 0.0005),
  s(NO, "x4p-uncorr", 9, "Show that uncorrelated jointly normal variables are independent, but uncorrelated variables with normal marginals needn't be.",
    "For a bivariate normal with $\\rho = 0$ the joint density factorises into the product of the marginals.",
    "Counterexample: $X \\sim N(0, 1)$ and $Y = SX$ with an independent random sign $S$: $Y$ is normal and uncorrelated with $X$, but $|Y| = |X|$, and $X + Y$ has an atom at $0$."),
  n(NO, "x4p-max", 9.5, "Compute $\\mathbb{E}[\\max(X, Y)]$ for i.i.d. $X, Y \\sim N(0, 1)$.", 0.5642, 0.001),

  // --- uniform-distribution -------------------------------------------------------------------
  n(UN, "x4p-var", 4, "Compute the variance of $\\mathrm{Uniform}(2, 8)$.", 3),
  n(UN, "x4p-sq", 7, "Compute $\\mathbb{E}[X^2]$ for $X \\sim \\mathrm{Uniform}(0, 1)$.", 0.3333, 0.001),
  n(UN, "x4p-sum", 8, "$X$ and $Y$ are i.i.d. $\\mathrm{Uniform}(0, 1)$. Compute $P(X + Y < 0.5)$.", 0.125, 0.001),
  n(UN, "x4p-absdiff", 8, "Compute $\\mathbb{E}|X - Y|$ for i.i.d. $\\mathrm{Uniform}(0, 1)$ variables.", 0.3333, 0.001),
  n(UN, "x4p-stick", 8.5, "A stick is broken at two independent uniform points. What is the probability the three pieces form a triangle?", 0.25, 0.001),
  s(UN, "x4p-pit", 8.5, "Why is $F(X)$ uniformly distributed when $X$ has a continuous CDF $F$?",
    "$P(F(X) \\le u) = P(X \\le F^{-1}(u)) = F(F^{-1}(u)) = u$ for $u \\in (0, 1)$ — the probability integral transform.",
    "This is why p-values are uniform under a continuous null, and it underlies copulas and goodness-of-fit checks."),
  n(UN, "x4p-min3", 9, "Compute $\\mathbb{E}[\\min]$ of $3$ i.i.d. $\\mathrm{Uniform}(0, 1)$ variables.", 0.25, 0.001),
  n(UN, "x4p-tank", 9, "German tank problem: $4$ serial numbers are drawn from $\\lbrace 1, \\ldots, N\\rbrace$ and the largest is $m = 60$. Compute the estimate $m + m/k - 1$.", 74),
  s(UN, "x4p-mle-bias", 9, "Why is the MLE of $\\theta$ for $\\mathrm{Uniform}(0, \\theta)$ biased, and how is this fixed?",
    "The MLE is the sample maximum, which is always below $\\theta$; $\\mathbb{E}[\\max] = \\frac{n}{n + 1}\\theta$.",
    "Scaling by $\\frac{n + 1}{n}$ gives an unbiased estimator, which is also the UMVUE since the maximum is complete and sufficient."),
  n(UN, "x4p-unbiased", 9.5, "For $\\mathrm{Uniform}(0, \\theta)$ with $n = 4$ and sample maximum $3$, compute the unbiased estimate $\\frac{n + 1}{n}\\max$.", 3.75, 0.001),
];
