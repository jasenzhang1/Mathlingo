import type { Item } from "../../lib/assessment/types";
import { m, mcq, num, short } from "./calc-shared";

/**
 * Calculus course, part 6: sequences, infinite series and convergence tests,
 * power series, and Taylor series. Forty questions per lesson, four at each
 * level from 1 to 10.
 */

// ---------------------------------------------------------------------------
// sequences
// ---------------------------------------------------------------------------
const SQ = "sequences";
const sequences: Item[] = [
  // level 1
  mcq(m(SQ, "recall-convergence", "recall", 1, 15, "A sequence $a_n$ converges to $L$ if:"),
    "For every $\\varepsilon > 0$, all terms from some point on are within $\\varepsilon$ of $L$",
    [
      ["Some term equals $L$", "seqconv-hit", "Hitting $L$ once says nothing about the tail."],
      ["The terms approach $L$ but never equal it", "seqconv-never", "Constant sequences converge and equal their limit."],
      ["Every term is at most $L$", "seqconv-bound", "That's an upper bound."],
    ]),
  mcq(m(SQ, "recall-monotone", "recall", 1, 15, "The monotone convergence theorem says:"),
    "A bounded monotone sequence converges",
    [
      ["Every bounded sequence converges", "monotone-bounded", "$(-1)^{n}$ is bounded and diverges."],
      ["Every monotone sequence converges", "monotone-only", "$a_n = n$ is increasing and diverges."],
      ["Every convergent sequence is monotone", "monotone-converse", "$\\frac{(-1)^{n}}{n}$ converges but oscillates."],
    ]),
  mcq(m(SQ, "recall-geometric", "recall", 1, 15, "The sequence $r^{n}$ converges to $0$ when:"),
    "$|r| < 1$",
    [
      ["$r < 1$", "geomseq-negative", "$(-2)^{n}$ doesn't converge."],
      ["$|r| \\le 1$", "geomseq-boundary", "$r = -1$ oscillates and $r = 1$ gives $1$."],
      ["$r > 0$", "geomseq-positive", "$2^{n}$ diverges."],
    ]),
  mcq(m(SQ, "recall-oscillating", "recall", 1, 15, "The sequence $(-1)^{n}$:"),
    "Diverges, because it oscillates between $-1$ and $1$",
    [
      ["Converges to $0$", "osc-zero", "The terms never get close to $0$."],
      ["Converges to $1$", "osc-one", "Odd terms are $-1$."],
      ["Diverges to $\\infty$", "osc-infinite", "It's bounded."],
    ]),
  // level 2
  num(m(SQ, "apply-rational", "apply", 2, 20, "Find $\\lim_{n \\to \\infty} \\frac{3n + 1}{n + 2}$."), 3),
  num(m(SQ, "apply-reciprocal-square", "apply", 2, 20, "Find $\\lim_{n \\to \\infty} \\frac{5}{n^{2}}$."), 0),
  num(m(SQ, "apply-alternating-perturbation", "apply", 2, 20, "Find $\\lim_{n \\to \\infty} \\left(2 + \\frac{(-1)^{n}}{n}\\right)$."), 2),
  mcq(m(SQ, "recall-e-limit", "recall", 2, 20, "$\\lim_{n \\to \\infty} \\left(1 + \\frac{1}{n}\\right)^{n} =$"),
    "$e$",
    [
      ["$1$", "elim-one", "The exponent grows as the base approaches $1$."],
      ["$\\infty$", "elim-infinite", "The terms increase but stay below $3$."],
      ["$2$", "elim-two", "$2$ is only the first term."],
    ]),
  // level 3
  num(m(SQ, "apply-quadratic-ratio", "apply", 3, 25, "Find $\\lim_{n \\to \\infty} \\frac{2n^{2} - n}{5n^{2} + 3}$."), 0.4),
  num(m(SQ, "apply-nth-root", "apply", 3, 25, "Find $\\lim_{n \\to \\infty} n^{1/n}$."), 1),
  num(m(SQ, "apply-recursive-linear", "apply", 3, 25, "Let $a_1 = 1$ and $a_{n + 1} = \\frac{a_n}{2} + 1$. Find $\\lim a_n$."), 2),
  mcq(m(SQ, "apply-bounded-convergent", "apply", 3, 25, "Which statement is true?"),
    "Every convergent sequence is bounded, but not every bounded sequence converges",
    [
      ["Every bounded sequence converges", "bc-bounded", "$(-1)^{n}$ is a counterexample."],
      ["A convergent sequence can be unbounded", "bc-unbounded", "The tail stays near $L$, and finitely many terms are bounded."],
      ["Bounded and convergent are equivalent", "bc-equivalent", "Only one direction holds."],
    ]),
  // level 4
  num(m(SQ, "apply-compound-e3", "apply", 4, 30, "Find $\\lim_{n \\to \\infty} \\left(1 + \\frac{3}{n}\\right)^{n}$. Give $2$ decimal places."), 20.09),
  num(m(SQ, "apply-root-difference", "apply", 4, 30, "Find $\\lim_{n \\to \\infty} \\left(\\sqrt{n^{2} + n} - n\\right)$."), 0.5),
  num(m(SQ, "apply-log-over-n", "apply", 4, 30, "Find $\\lim_{n \\to \\infty} \\frac{\\ln n}{n}$."), 0),
  mcq(m(SQ, "apply-which-diverges", "apply", 4, 30, "Which sequence diverges?"),
    "$\\cos(n\\pi)$",
    [
      ["$\\frac{\\cos n}{n}$", "whichdiv-damped", "It's squeezed to $0$."],
      ["$0.9^{n}$", "whichdiv-geometric", "$|0.9| < 1$, so it tends to $0$."],
      ["$\\frac{n}{n + 1}$", "whichdiv-rational", "It tends to $1$."],
    ]),
  // level 5
  short(m(SQ, "explain-function-limit", "explain", 5, 90, "If $a_n = f(n)$ and $\\lim_{x \\to \\infty} f(x) = L$, why does $a_n \\to L$? Show with an example that the converse fails."),
    [
      ["why", "The function limit controls $f(x)$ for all large real $x$, in particular at the integers", 2, true],
      ["converse", "Counterexample: $\\sin(\\pi n) = 0$ converges, but $\\sin(\\pi x)$ has no limit", 2, true],
    ]),
  mcq(m(SQ, "apply-factorial-power", "apply", 5, 40, "$\\lim_{n \\to \\infty} \\frac{n!}{n^{n}} =$"),
    "$0$",
    [
      ["$1$", "factpow-one", "$\\frac{n!}{n^{n}} = \\frac{1}{n} \\cdot \\frac{2}{n} \\cdots \\frac{n}{n} \\le \\frac{1}{n}$."],
      ["$\\infty$", "factpow-infinite", "$n^{n}$ grows faster than $n!$."],
      ["$\\frac{1}{e}$", "factpow-e", "That's the limit of $\\frac{(n!)^{1/n}}{n}$."],
    ]),
  mcq(m(SQ, "apply-exp-factorial", "apply", 5, 40, "$\\lim_{n \\to \\infty} \\frac{2^{n}}{n!} =$"),
    "$0$",
    [
      ["$\\infty$", "expfact-infinite", "Factorials eventually beat any exponential."],
      ["$2$", "expfact-two", "After $n = 2$ each new factor $\\frac{2}{n}$ is at most $\\frac{2}{3}$."],
      ["$1$", "expfact-one", "The ratio of consecutive terms tends to $0$."],
    ]),
  num(m(SQ, "apply-continuous-compounding", "apply", 5, 40, "\\$$1{,}000$ earns $6\\%$ interest compounded $n$ times a year. What is it worth after one year as $n \\to \\infty$ (in dollars)? Give $2$ decimal places."), 1061.84),
  // level 6
  short(m(SQ, "explain-recursive-root", "explain", 6, 120, "Let $a_1 = 1$ and $a_{n + 1} = \\sqrt{2 + a_n}$. Show the sequence converges and find its limit."),
    [
      ["monotone-bounded", "Shows by induction that $a_n < 2$ and $a_{n + 1} > a_n$, so the monotone convergence theorem applies", 2, true],
      ["limit", "Passes to the limit: $L = \\sqrt{2 + L}$, so $L = 2$ (rejecting $-1$)", 2, true],
    ]),
  num(m(SQ, "apply-recursive-six", "apply", 6, 45, "Let $a_1 = 0$ and $a_{n + 1} = \\sqrt{6 + a_n}$. Find $\\lim a_n$."), 3),
  num(m(SQ, "apply-babylonian", "apply", 6, 45, "Let $a_1 = 1$ and $a_{n + 1} = \\frac{1}{2}\\left(a_n + \\frac{2}{a_n}\\right)$. Find $\\lim a_n$. Give $3$ decimal places."), 1.414),
  mcq(m(SQ, "apply-alternating-root", "apply", 6, 45, "$\\lim_{n \\to \\infty} \\frac{(-1)^{n}}{\\sqrt{n}}$:"),
    "Equals $0$",
    [
      ["Does not exist, because the signs alternate", "altroot-dne", "The size $\\frac{1}{\\sqrt{n}} \\to 0$, which forces the limit to $0$."],
      ["Equals $1$", "altroot-one", "The terms shrink."],
      ["Equals $-1$", "altroot-minus", "The terms shrink."],
    ]),
  // level 7
  short(m(SQ, "explain-geometric-zero", "explain", 7, 120, "Prove that $r^{n} \\to 0$ for $0 < r < 1$."),
    [
      ["method", "Uses monotone convergence ($r^{n}$ decreases and is bounded below by $0$) or logarithms ($n\\ln r \\to -\\infty$)", 2, true],
      ["finish", "Passing to the limit in $a_{n + 1} = ra_n$ gives $L = rL$, so $L = 0$ (or $e^{n\\ln r} \\to 0$)", 2, true],
    ]),
  num(m(SQ, "apply-fibonacci-ratio", "apply", 7, 60, "Find the limit of $\\frac{F_{n + 1}}{F_n}$ for the Fibonacci numbers. Give $3$ decimal places."), 1.618),
  num(m(SQ, "apply-exp-difference", "apply", 7, 60, "Find $\\lim_{n \\to \\infty} n\\left(e^{1/n} - 1\\right)$."), 1),
  mcq(m(SQ, "transfer-fast-exponent", "transfer", 7, 60, "$\\lim_{n \\to \\infty} \\left(1 + \\frac{1}{n}\\right)^{n^{2}}$:"),
    "Is $\\infty$",
    [
      ["Equals $e$", "fastexp-e", "It's $\\left(\\left(1 + \\frac{1}{n}\\right)^{n}\\right)^{n} \\approx e^{n}$."],
      ["Equals $1$", "fastexp-one", "The base is above $1$ and the exponent grows quadratically."],
      ["Equals $e^{2}$", "fastexp-e-squared", "The exponent is $n^{2}$, not $2n$."],
    ]),
  // level 8
  short(m(SQ, "explain-convergent-bounded", "explain", 8, 150, "Prove that every convergent sequence is bounded."),
    [
      ["tail", "With $\\varepsilon = 1$, there's an $N$ with $|a_n - L| < 1$, so $|a_n| < |L| + 1$, for $n > N$", 2, true],
      ["head", "The finitely many terms $a_1, \\ldots, a_N$ are bounded by their maximum; take the larger bound", 2, true],
    ]),
  num(m(SQ, "apply-reciprocal-e", "apply", 8, 75, "Find $\\lim_{n \\to \\infty} \\left(\\frac{n}{n + 1}\\right)^{n}$. Give $3$ decimal places."), 0.368),
  num(m(SQ, "apply-central-binomial", "apply", 8, 75, "Find $\\lim_{n \\to \\infty} \\left(\\frac{(2n)!}{(n!)^{2}}\\right)^{1/n}$."), 4),
  mcq(m(SQ, "recall-subsequence", "recall", 8, 75, "If $a_n \\to L$, then every subsequence of $a_n$:"),
    "Converges to $L$",
    [
      ["May diverge", "subseq-diverge", "A subsequence's tail is part of the original tail."],
      ["Converges, possibly to a different limit", "subseq-other", "Every tail term is within $\\varepsilon$ of $L$."],
      ["Is eventually constant", "subseq-constant", "Nothing forces that."],
    ]),
  // level 9
  short(m(SQ, "transfer-prove-monotone", "transfer", 9, 180, "Prove the monotone convergence theorem for an increasing bounded sequence, using the completeness of $\\mathbb{R}$ (least upper bounds exist)."),
    [
      ["sup", "Let $L = \\sup a_n$, which exists by completeness; for $\\varepsilon > 0$ some $a_N > L - \\varepsilon$", 2, true],
      ["tail", "For $n \\ge N$, $L - \\varepsilon < a_N \\le a_n \\le L$, so $|a_n - L| < \\varepsilon$", 2, true],
    ]),
  short(m(SQ, "transfer-e-sequence", "transfer", 9, 180, "Sketch why $\\left(1 + \\frac{1}{n}\\right)^{n}$ is increasing and bounded above by $3$, using the binomial theorem."),
    [
      ["expand", "Expands: $\\sum_{k=0}^{n} \\frac{1}{k!}\\left(1 - \\frac{1}{n}\\right)\\cdots\\left(1 - \\frac{k - 1}{n}\\right)$; each term grows with $n$ and more terms appear, so it increases", 2, true],
      ["bound", "Each term is at most $\\frac{1}{k!} \\le \\frac{1}{2^{k - 1}}$, so the sum is below $1 + 1 + \\frac{1}{2} + \\frac{1}{4} + \\cdots = 3$", 2, true],
    ]),
  num(m(SQ, "transfer-perturbed-e", "transfer", 9, 90, "Find $\\lim_{n \\to \\infty} \\left(1 + \\frac{1}{n} + \\frac{1}{n^{2}}\\right)^{n}$. Give $3$ decimal places."), 2.718),
  mcq(m(SQ, "recall-bolzano", "recall", 9, 90, "The Bolzano–Weierstrass theorem says:"),
    "Every bounded sequence in $\\mathbb{R}$ has a convergent subsequence",
    [
      ["Every bounded sequence converges", "bw-converges", "$(-1)^{n}$ doesn't, though its even terms do."],
      ["Every sequence has a convergent subsequence", "bw-unbounded", "$a_n = n$ has none."],
      ["Every convergent sequence is monotone", "bw-monotone", "Convergent sequences can oscillate."],
    ]),
  // level 10
  short(m(SQ, "transfer-cesaro", "transfer", 10, 180, "Prove that if $a_n \\to L$, then the averages $\\frac{a_1 + \\cdots + a_n}{n} \\to L$."),
    [
      ["split", "Given $\\varepsilon$, choose $N$ with $|a_k - L| < \\varepsilon$ for $k > N$; split the average into the first $N$ terms and the rest", 2, true],
      ["bound", "The first part is $\\frac{C}{n} \\to 0$ and the second is within $\\varepsilon$ of $L$, so the limit is $L$", 2, true],
    ]),
  short(m(SQ, "transfer-nth-root-proof", "transfer", 10, 180, "Prove that $\\lim_{n \\to \\infty} n^{1/n} = 1$."),
    [
      ["write", "Writes $n^{1/n} = 1 + h_n$ with $h_n \\ge 0$", 1, true],
      ["binomial", "By the binomial theorem $n = (1 + h_n)^{n} \\ge \\frac{n(n - 1)}{2}h_n^{2}$, so $h_n \\le \\sqrt{\\frac{2}{n - 1}} \\to 0$", 3, true],
    ]),
  num(m(SQ, "transfer-dottie", "transfer", 10, 120, "Let $a_1 = 1$ and $a_{n + 1} = \\cos a_n$ (radians). The sequence converges. Find its limit. Give $3$ decimal places."), 0.739),
  mcq(m(SQ, "transfer-sin-n", "transfer", 10, 120, "The sequence $a_n = \\sin n$ (radians):"),
    "Has no limit, and every number in $[-1, 1]$ is the limit of some subsequence",
    [
      ["Converges to $0$", "sinn-zero", "Its terms don't shrink."],
      ["Is eventually periodic", "sinn-periodic", "$\\pi$ is irrational, so $n$ never repeats a phase exactly."],
      ["Has exactly two subsequential limits, $\\pm 1$", "sinn-two", "The values $n \\bmod 2\\pi$ are dense, so every value in $[-1, 1]$ is approached."],
    ]),
];

// ---------------------------------------------------------------------------
// infinite-series
// ---------------------------------------------------------------------------
const SR = "infinite-series";
const infiniteSeries: Item[] = [
  // level 1
  mcq(m(SR, "recall-definition", "recall", 1, 15, "The sum of an infinite series $\\sum a_n$ is defined as:"),
    "The limit of its partial sums $S_N = a_1 + \\cdots + a_N$",
    [
      ["The limit of its terms $a_n$", "series-terms", "That's a property of the sequence, not the sum."],
      ["The largest partial sum", "series-max", "Partial sums needn't have a maximum."],
      ["The sum of the first $1{,}000$ terms", "series-finite", "That's only an approximation."],
    ]),
  mcq(m(SR, "recall-geometric", "recall", 1, 15, "The geometric series $\\sum_{n=0}^{\\infty} ar^{n}$ (with $a \\ne 0$) converges exactly when:"),
    "$|r| < 1$",
    [
      ["$r < 1$", "geomser-negative", "$r = -2$ diverges."],
      ["$|r| \\le 1$", "geomser-boundary", "$r = 1$ and $r = -1$ diverge."],
      ["$a < 1$", "geomser-a", "Convergence depends on $r$."],
    ]),
  mcq(m(SR, "recall-divergence-test", "recall", 1, 15, "The divergence test says that if $a_n \\not\\to 0$, then $\\sum a_n$:"),
    "Diverges",
    [
      ["Converges", "divtest-converges", "Terms must shrink to $0$ for a sum to settle."],
      ["Might converge or diverge", "divtest-inconclusive", "That's when $a_n \\to 0$."],
      ["Converges absolutely", "divtest-absolute", "It diverges."],
    ]),
  mcq(m(SR, "recall-harmonic", "recall", 1, 15, "The harmonic series $\\sum_{n=1}^{\\infty} \\frac{1}{n}$:"),
    "Diverges",
    [
      ["Converges to $1$", "harmonic-one", "Its partial sums grow like $\\ln N$."],
      ["Converges, since $\\frac{1}{n} \\to 0$", "harmonic-terms", "Terms tending to $0$ isn't sufficient."],
      ["Converges to $\\ln 2$", "harmonic-alternating", "That's the alternating harmonic series."],
    ]),
  // level 2
  num(m(SR, "apply-geometric-half", "apply", 2, 20, "Find $\\sum_{n=0}^{\\infty} \\left(\\frac{1}{2}\\right)^{n}$."), 2),
  num(m(SR, "apply-geometric-quarter", "apply", 2, 20, "Find $\\sum_{n=0}^{\\infty} 3\\left(\\frac{1}{4}\\right)^{n}$."), 4),
  num(m(SR, "apply-partial-sum", "apply", 2, 20, "Find the partial sum $S_3$ of $\\sum_{n=1}^{\\infty} \\frac{1}{n(n + 1)}$."), 0.75),
  mcq(m(SR, "apply-divergence-test", "apply", 2, 20, "$\\sum_{n=1}^{\\infty} \\frac{n}{n + 1}$:"),
    "Diverges, since the terms tend to $1$",
    [
      ["Converges to $1$", "divapply-limit", "$1$ is the limit of the terms, not the sum."],
      ["Converges by comparison with $\\sum \\frac{1}{n}$", "divapply-comparison", "The terms don't even tend to $0$."],
      ["Converges, since the terms are below $1$", "divapply-bounded", "Infinitely many terms near $1$ add up without bound."],
    ]),
  // level 3
  num(m(SR, "apply-geometric-two-thirds", "apply", 3, 25, "Find $\\sum_{n=1}^{\\infty} \\left(\\frac{2}{3}\\right)^{n}$."), 2),
  num(m(SR, "apply-telescoping", "apply", 3, 25, "Find $\\sum_{n=1}^{\\infty} \\frac{1}{n(n + 1)}$."), 1),
  num(m(SR, "apply-geometric-negative", "apply", 3, 25, "Find $\\sum_{n=0}^{\\infty} \\left(-\\frac{1}{3}\\right)^{n}$."), 0.75),
  mcq(m(SR, "apply-p-series", "apply", 3, 25, "$\\sum_{n=1}^{\\infty} \\frac{1}{n^{2}}$:"),
    "Converges, since it's a $p$-series with $p = 2 > 1$",
    [
      ["Diverges like the harmonic series", "pseries-harmonic", "Squaring makes the terms shrink fast enough."],
      ["Converges to $2$", "pseries-two", "It converges to $\\frac{\\pi^{2}}{6} \\approx 1.645$."],
      ["Diverges by the divergence test", "pseries-divtest", "The terms do tend to $0$."],
    ]),
  // level 4
  num(m(SR, "apply-geometric-shifted", "apply", 4, 30, "Find $\\sum_{n=2}^{\\infty} \\left(\\frac{1}{3}\\right)^{n}$. Give $4$ decimal places."), 0.1667),
  num(m(SR, "apply-telescoping-roots", "apply", 4, 30, "Find $\\sum_{n=1}^{\\infty} \\left(\\frac{1}{\\sqrt{n}} - \\frac{1}{\\sqrt{n + 1}}\\right)$."), 1),
  num(m(SR, "apply-alternating-bound", "apply", 4, 30, "Approximating $\\sum_{n=1}^{\\infty} \\frac{(-1)^{n + 1}}{n^{2}}$ by $S_4$, what bound does the alternating series estimate give on the error?"), 0.04),
  mcq(m(SR, "apply-ratio-factorial", "apply", 4, 30, "By the ratio test, $\\sum_{n=1}^{\\infty} \\frac{n!}{10^{n}}$:"),
    "Diverges, since the ratio $\\frac{n + 1}{10} \\to \\infty$",
    [
      ["Converges, since the ratio is below $1$ for small $n$", "ratiofact-early", "Only the limit of the ratio matters."],
      ["Converges, since $10^{n}$ grows fast", "ratiofact-exp", "$n!$ eventually grows faster than $10^{n}$."],
      ["The test is inconclusive", "ratiofact-inconclusive", "The limit is $\\infty$, not $1$."],
    ]),
  // level 5
  short(m(SR, "explain-harmonic", "explain", 5, 90, "Explain why the harmonic series diverges, using a grouping argument."),
    [
      ["group", "Groups the terms: $\\frac{1}{3} + \\frac{1}{4} > \\frac{1}{2}$, $\\frac{1}{5} + \\cdots + \\frac{1}{8} > \\frac{1}{2}$, and so on, each block of length $2^{k}$ exceeding $\\frac{1}{2}$", 2, true],
      ["conclude", "Infinitely many halves add up without bound, so the partial sums are unbounded", 2, true],
    ]),
  mcq(m(SR, "apply-comparison", "apply", 5, 40, "$\\sum_{n=1}^{\\infty} \\frac{1}{n^{2} + 1}$:"),
    "Converges by comparison with $\\sum \\frac{1}{n^{2}}$",
    [
      ["Diverges by comparison with $\\sum \\frac{1}{n}$", "comp-wrong", "Being below a divergent series proves nothing."],
      ["Diverges by the divergence test", "comp-divtest", "The terms tend to $0$."],
      ["Converges to $\\frac{\\pi^{2}}{6}$", "comp-value", "Each term is less than $\\frac{1}{n^{2}}$, so the sum is smaller."],
    ]),
  mcq(m(SR, "apply-ratio-inconclusive", "apply", 5, 40, "The ratio test is inconclusive when the limit is $1$. Which example shows why?"),
    "$\\sum \\frac{1}{n}$ diverges and $\\sum \\frac{1}{n^{2}}$ converges, yet both give ratio limit $1$",
    [
      ["$\\sum 2^{-n}$ and $\\sum 3^{-n}$ both converge", "inconcl-geometric", "Those have ratios $\\frac{1}{2}$ and $\\frac{1}{3}$, not $1$."],
      ["$\\sum n!$ diverges", "inconcl-factorial", "Its ratio tends to $\\infty$."],
      ["Every series with ratio $1$ diverges", "inconcl-always", "$\\sum \\frac{1}{n^{2}}$ converges."],
    ]),
  num(m(SR, "apply-arithmetico-geometric", "apply", 5, 40, "Find $\\sum_{n=1}^{\\infty} \\frac{n}{2^{n}}$."), 2),
  // level 6
  short(m(SR, "explain-integral-test", "explain", 6, 120, "Use the integral test to show $\\sum \\frac{1}{n^{p}}$ converges if and only if $p > 1$."),
    [
      ["hypotheses", "For $p > 0$, $f(x) = x^{-p}$ is positive and decreasing, so the series and $\\int_1^{\\infty} x^{-p}\\,dx$ converge together (for $p \\le 0$ the terms don't tend to $0$)", 2, true],
      ["integral", "$\\int_1^{\\infty} x^{-p}\\,dx$ converges exactly for $p > 1$", 2, true],
    ]),
  num(m(SR, "apply-n-squared-over-2n", "apply", 6, 45, "Find $\\sum_{n=1}^{\\infty} \\frac{n^{2}}{2^{n}}$."), 6),
  num(m(SR, "apply-geometric-fourth", "apply", 6, 45, "Find $\\sum_{n=1}^{\\infty} \\frac{1}{4^{n}}$. Give $4$ decimal places."), 0.3333),
  mcq(m(SR, "apply-alternating-harmonic", "apply", 6, 45, "$\\sum_{n=1}^{\\infty} \\frac{(-1)^{n}}{n}$:"),
    "Converges conditionally",
    [
      ["Converges absolutely", "altharm-absolute", "$\\sum \\frac{1}{n}$ diverges."],
      ["Diverges", "altharm-diverges", "The alternating series test applies."],
      ["Converges to $0$", "altharm-zero", "It converges to $-\\ln 2$."],
    ]),
  // level 7
  short(m(SR, "explain-n-log-n", "explain", 7, 120, "Use the integral test to show $\\sum_{n=2}^{\\infty} \\frac{1}{n\\ln n}$ diverges."),
    [
      ["integral", "$\\int_2^{t} \\frac{dx}{x\\ln x} = \\ln(\\ln t) - \\ln(\\ln 2)$ by substituting $u = \\ln x$", 2, true],
      ["conclude", "This tends to $\\infty$, and the integrand is positive and decreasing, so the series diverges", 2, true],
    ]),
  num(m(SR, "apply-terms-needed", "apply", 7, 60, "How many terms $N$ of $\\sum_{n=1}^{\\infty} \\frac{(-1)^{n + 1}}{n}$ does the alternating series estimate need to guarantee an error of at most $0.01$ (the smallest such $N$)?"), 99),
  num(m(SR, "apply-telescoping-triple", "apply", 7, 60, "Find $\\sum_{n=1}^{\\infty} \\frac{1}{n(n + 1)(n + 2)}$."), 0.25),
  mcq(m(SR, "apply-sin-over-square", "apply", 7, 60, "$\\sum_{n=1}^{\\infty} \\frac{\\sin n}{n^{2}}$:"),
    "Converges absolutely",
    [
      ["Diverges, since $\\sin n$ doesn't tend to $0$", "sinsq-numerator", "$\\left|\\frac{\\sin n}{n^{2}}\\right| \\le \\frac{1}{n^{2}}$."],
      ["Converges only conditionally", "sinsq-conditional", "The absolute values converge too."],
      ["The tests can't decide it", "sinsq-undecidable", "Comparison with $\\frac{1}{n^{2}}$ does."],
    ]),
  // level 8
  short(m(SR, "explain-absolute-conditional", "explain", 8, 150, "Explain the difference between absolute and conditional convergence, and why it matters when a series is rearranged."),
    [
      ["definitions", "Absolute: $\\sum |a_n|$ converges (which implies $\\sum a_n$ converges); conditional: $\\sum a_n$ converges but $\\sum |a_n|$ doesn't", 2, true],
      ["rearrangement", "Absolutely convergent series can be reordered without changing the sum; conditionally convergent ones can be rearranged to any sum (Riemann)", 2, true],
    ]),
  num(m(SR, "apply-alternating-harmonic-sum", "apply", 8, 75, "Find $\\sum_{n=1}^{\\infty} \\frac{(-1)^{n + 1}}{n}$. Give $3$ decimal places."), 0.693),
  num(m(SR, "apply-reciprocal-factorials", "apply", 8, 75, "Find $\\sum_{n=0}^{\\infty} \\frac{1}{n!}$. Give $3$ decimal places."), 2.718),
  mcq(m(SR, "apply-root-test", "apply", 8, 75, "By the root test, $\\sum_{n=1}^{\\infty} \\left(\\frac{n}{2n + 1}\\right)^{n}$:"),
    "Converges, since the $n$th root tends to $\\frac{1}{2}$",
    [
      ["Diverges, since the terms tend to $\\frac{1}{2}$", "root-terms", "The terms are $\\left(\\approx\\frac{1}{2}\\right)^{n} \\to 0$."],
      ["The test is inconclusive", "root-inconclusive", "The root limit is $\\frac{1}{2} \\ne 1$."],
      ["Diverges, since the root tends to $2$", "root-inverted", "$\\frac{n}{2n + 1} \\to \\frac{1}{2}$."],
    ]),
  // level 9
  short(m(SR, "transfer-divergence-proof", "transfer", 9, 180, "Prove the divergence test: if $\\sum a_n$ converges, then $a_n \\to 0$."),
    [
      ["difference", "Writes $a_n = S_n - S_{n - 1}$", 2, true],
      ["limit", "If $S_n \\to S$, then $S_{n - 1} \\to S$ too, so $a_n \\to S - S = 0$", 2, true],
    ]),
  short(m(SR, "transfer-integral-bounds", "transfer", 9, 180, "Use the integral test to bound the tail $\\sum_{n = N + 1}^{\\infty} \\frac{1}{n^{2}}$ above and below."),
    [
      ["bounds", "Comparing rectangles with $\\int \\frac{dx}{x^{2}}$: $\\int_{N + 1}^{\\infty} \\frac{dx}{x^{2}} \\le \\text{tail} \\le \\int_{N}^{\\infty} \\frac{dx}{x^{2}}$", 2, true],
      ["values", "So $\\frac{1}{N + 1} \\le \\text{tail} \\le \\frac{1}{N}$", 2, true],
    ]),
  num(m(SR, "transfer-basel", "transfer", 9, 90, "Find $\\sum_{n=1}^{\\infty} \\frac{1}{n^{2}}$. Give $4$ decimal places."), 1.6449),
  mcq(m(SR, "transfer-which-converges", "transfer", 9, 90, "Which series converges?"),
    "$\\sum \\frac{1}{n^{1.001}}$",
    [
      ["$\\sum \\frac{1}{n^{0.999}}$", "whichconv-below", "$p = 0.999 < 1$."],
      ["$\\sum \\frac{1}{n\\ln n}$", "whichconv-nlogn", "That diverges, by the integral test."],
      ["$\\sum \\frac{1}{\\sqrt{n}}$", "whichconv-root", "$p = \\frac{1}{2}$."],
    ]),
  // level 10
  short(m(SR, "transfer-basel-bound", "transfer", 10, 180, "Prove $\\sum_{n=1}^{\\infty} \\frac{1}{n^{2}} < 2$ by comparing with a telescoping series."),
    [
      ["compare", "For $n \\ge 2$, $\\frac{1}{n^{2}} < \\frac{1}{n(n - 1)} = \\frac{1}{n - 1} - \\frac{1}{n}$", 2, true],
      ["sum", "So the sum is less than $1 + \\sum_{n \\ge 2}\\left(\\frac{1}{n - 1} - \\frac{1}{n}\\right) = 1 + 1 = 2$", 2, true],
    ]),
  short(m(SR, "transfer-log-p", "transfer", 10, 180, "Show that $\\sum_{n=2}^{\\infty} \\frac{1}{n(\\ln n)^{p}}$ converges if and only if $p > 1$."),
    [
      ["integral", "The integrand is positive and decreasing; substituting $u = \\ln x$ turns $\\int_2^{\\infty} \\frac{dx}{x(\\ln x)^{p}}$ into $\\int_{\\ln 2}^{\\infty} \\frac{du}{u^{p}}$", 2, true],
      ["conclude", "That converges exactly when $p > 1$, so the series does too (integral test, or Cauchy condensation)", 2, true],
    ]),
  num(m(SR, "transfer-zeta-four", "transfer", 10, 120, "Find $\\sum_{n=1}^{\\infty} \\frac{1}{n^{4}}$. Give $4$ decimal places."), 1.0823),
  mcq(m(SR, "transfer-riemann-rearrangement", "transfer", 10, 120, "By the Riemann rearrangement theorem, the terms of a conditionally convergent series can be reordered to:"),
    "Sum to any real number, or diverge",
    [
      ["Only the original sum", "riemann-same", "That's true only for absolutely convergent series."],
      ["Only sums between $0$ and the original", "riemann-between", "Any target can be reached by taking positives until above it, then negatives until below, and so on."],
      ["Only diverge", "riemann-diverge", "They can also converge to any chosen value."],
    ]),
];

// ---------------------------------------------------------------------------
// power-series
// ---------------------------------------------------------------------------
const PS = "power-series";
const powerSeries: Item[] = [
  // level 1
  mcq(m(PS, "recall-form", "recall", 1, 15, "A power series centred at $a$ has the form:"),
    "$\\sum_{n=0}^{\\infty} c_n (x - a)^{n}$",
    [
      ["$\\sum_{n=0}^{\\infty} c_n a^{n}$", "psform-constant", "That's a number, not a function of $x$."],
      ["$\\sum_{n=0}^{\\infty} x^{c_n}$", "psform-exponent", "The powers of $(x - a)$ are the integers $n$."],
      ["$\\sum_{n=0}^{\\infty} c_n e^{nx}$", "psform-exp", "That's an exponential series."],
    ]),
  mcq(m(PS, "recall-radius", "recall", 1, 15, "A power series centred at $a$ has radius of convergence $R$. This means it:"),
    "Converges absolutely for $|x - a| < R$ and diverges for $|x - a| > R$",
    [
      ["Converges exactly on $[a - R, a + R]$", "radius-closed", "The endpoints must be checked separately."],
      ["Converges only at $x = a \\pm R$", "radius-endpoints", "It converges inside the interval."],
      ["Converges for $|x - a| > R$", "radius-reversed", "It's inside the radius that it converges."],
    ]),
  mcq(m(PS, "recall-endpoints", "recall", 1, 15, "At the endpoints $x = a \\pm R$ of the interval of convergence, a power series:"),
    "May converge or diverge; each endpoint must be checked",
    [
      ["Always converges", "endpoints-converge", "$\\sum x^{n}$ diverges at both $\\pm 1$."],
      ["Always diverges", "endpoints-diverge", "$\\sum \\frac{x^{n}}{n^{2}}$ converges at both."],
      ["Converges at one end and diverges at the other", "endpoints-one-each", "All four combinations occur."],
    ]),
  mcq(m(PS, "recall-geometric", "recall", 1, 15, "$\\frac{1}{1 - x} = \\sum_{n=0}^{\\infty} x^{n}$ holds for:"),
    "$|x| < 1$",
    [
      ["All $x \\ne 1$", "geom-all", "At $x = 2$ the series diverges while $\\frac{1}{1 - x} = -1$."],
      ["$x < 1$", "geom-left", "At $x = -2$ the series diverges."],
      ["$|x| \\le 1$", "geom-closed", "At $x = -1$ the partial sums oscillate."],
    ]),
  // level 2
  num(m(PS, "apply-radius-three", "apply", 2, 20, "Find the radius of convergence of $\\sum_{n=0}^{\\infty} \\frac{x^{n}}{3^{n}}$."), 3),
  num(m(PS, "apply-radius-n", "apply", 2, 20, "Find the radius of convergence of $\\sum_{n=1}^{\\infty} nx^{n}$."), 1),
  num(m(PS, "apply-geometric-value", "apply", 2, 20, "Evaluate $\\sum_{n=0}^{\\infty} x^{n}$ at $x = \\frac{1}{3}$."), 1.5),
  mcq(m(PS, "apply-radius-factorial", "apply", 2, 20, "The radius of convergence of $\\sum_{n=0}^{\\infty} \\frac{x^{n}}{n!}$ is:"),
    "$\\infty$",
    [
      ["$1$", "radfact-one", "The ratio $\\frac{|x|}{n + 1} \\to 0$ for every $x$."],
      ["$0$", "radfact-zero", "That's for $\\sum n!\\,x^{n}$."],
      ["$e$", "radfact-e", "$e$ is the sum at $x = 1$, not the radius."],
    ]),
  // level 3
  num(m(PS, "apply-radius-five", "apply", 3, 25, "Find the radius of convergence of $\\sum_{n=1}^{\\infty} \\frac{(x - 2)^{n}}{n\\,5^{n}}$."), 5),
  num(m(PS, "apply-centre", "apply", 3, 25, "Where is $\\sum_{n=0}^{\\infty} \\frac{(x + 4)^{n}}{2^{n}}$ centred? Give the centre $a$."), -4),
  num(m(PS, "apply-radius-half", "apply", 3, 25, "Find the radius of convergence of $\\sum_{n=0}^{\\infty} 2^{n}x^{n}$."), 0.5),
  mcq(m(PS, "apply-only-centre", "apply", 3, 25, "$\\sum_{n=0}^{\\infty} n!\\,x^{n}$:"),
    "Converges only at $x = 0$",
    [
      ["Converges for $|x| < 1$", "onlycentre-one", "The ratio $(n + 1)|x| \\to \\infty$ for any $x \\ne 0$."],
      ["Converges everywhere", "onlycentre-all", "That's $\\sum \\frac{x^{n}}{n!}$."],
      ["Diverges everywhere, even at $0$", "onlycentre-none", "At $x = 0$ only the constant term survives."],
    ]),
  // level 4
  num(m(PS, "apply-endpoints-harmonic", "apply", 4, 30, "How many endpoints of its interval of convergence does $\\sum_{n=1}^{\\infty} \\frac{x^{n}}{n}$ include?"), 1),
  num(m(PS, "apply-endpoints-square", "apply", 4, 30, "How many endpoints of its interval of convergence does $\\sum_{n=1}^{\\infty} \\frac{x^{n}}{n^{2}}$ include?"), 2),
  num(m(PS, "apply-coefficient", "apply", 4, 30, "In the power series $\\frac{1}{1 + x^{2}} = \\sum c_n x^{n}$, find $c_4$."), 1),
  mcq(m(PS, "apply-interval", "apply", 4, 30, "The interval of convergence of $\\sum_{n=1}^{\\infty} \\frac{(x - 3)^{n}}{n\\,2^{n}}$ is:"),
    "$[1, 5)$",
    [
      ["$(1, 5)$", "interval-open", "At $x = 1$ the series is alternating harmonic, which converges."],
      ["$(1, 5]$", "interval-wrong-end", "At $x = 5$ it's the harmonic series, which diverges."],
      ["$[1, 5]$", "interval-closed", "The right endpoint gives the harmonic series."],
    ]),
  // level 5
  short(m(PS, "explain-ratio-radius", "explain", 5, 90, "Explain how the ratio test finds the radius of convergence of a power series."),
    [
      ["ratio", "Computes $\\lim\\left|\\frac{c_{n + 1}(x - a)^{n + 1}}{c_n (x - a)^{n}}\\right| = L|x - a|$", 2, true],
      ["radius", "The series converges when $L|x - a| < 1$ and diverges when $> 1$, so $R = \\frac{1}{L}$; endpoints need separate checks", 2, true],
    ]),
  mcq(m(PS, "apply-differentiate-geometric", "apply", 5, 40, "Differentiating $\\sum_{n=0}^{\\infty} x^{n} = \\frac{1}{1 - x}$ term by term gives:"),
    "$\\sum_{n=1}^{\\infty} nx^{n - 1} = \\frac{1}{(1 - x)^{2}}$",
    [
      ["$\\sum_{n=0}^{\\infty} x^{n - 1} = \\frac{1}{(1 - x)^{2}}$", "diffgeom-no-n", "The power rule brings down $n$."],
      ["$\\sum_{n=1}^{\\infty} nx^{n - 1} = -\\frac{1}{(1 - x)^{2}}$", "diffgeom-sign", "$\\frac{d}{dx}(1 - x)^{-1} = +(1 - x)^{-2}$."],
      ["$\\sum_{n=0}^{\\infty} \\frac{x^{n + 1}}{n + 1} = \\frac{1}{(1 - x)^{2}}$", "diffgeom-integrate", "That's integrating, and it gives $-\\ln(1 - x)$."],
    ]),
  mcq(m(PS, "apply-rescale", "apply", 5, 40, "A power series for $\\frac{1}{2 - x}$ is:"),
    "$\\sum_{n=0}^{\\infty} \\frac{x^{n}}{2^{n + 1}}$, valid for $|x| < 2$",
    [
      ["$\\sum_{n=0}^{\\infty} \\frac{x^{n}}{2^{n}}$, valid for $|x| < 2$", "rescale-factor", "$\\frac{1}{2 - x} = \\frac{1}{2} \\cdot \\frac{1}{1 - x/2}$: an extra factor $\\frac{1}{2}$."],
      ["$\\sum_{n=0}^{\\infty} 2^{n}x^{n}$, valid for $|x| < \\frac{1}{2}$", "rescale-inverted", "Dividing $x$ by $2$, not multiplying."],
      ["$\\sum_{n=0}^{\\infty} (x - 2)^{n}$", "rescale-shift", "That's $\\frac{1}{3 - x}$, centred at $2$."],
    ]),
  num(m(PS, "apply-sum-by-derivative", "apply", 5, 40, "Use $\\sum_{n=1}^{\\infty} nx^{n} = \\frac{x}{(1 - x)^{2}}$ to find $\\sum_{n=1}^{\\infty} \\frac{n}{3^{n}}$."), 0.75),
  // level 6
  short(m(PS, "explain-log-series", "explain", 6, 120, "Derive the power series for $\\ln(1 + x)$ from the geometric series."),
    [
      ["geometric", "$\\frac{1}{1 + x} = \\sum (-1)^{n}x^{n}$ for $|x| < 1$", 2, true],
      ["integrate", "Integrating from $0$: $\\ln(1 + x) = \\sum_{n=0}^{\\infty} \\frac{(-1)^{n}x^{n + 1}}{n + 1} = x - \\frac{x^{2}}{2} + \\frac{x^{3}}{3} - \\cdots$", 2, true],
    ]),
  num(m(PS, "apply-log-coefficient", "apply", 6, 45, "Find the coefficient of $x^{5}$ in the power series of $\\ln(1 + x)$."), 0.2),
  num(m(PS, "apply-arctan-coefficient", "apply", 6, 45, "Find the coefficient of $x^{7}$ in the power series of $\\arctan x$. Give $4$ decimal places."), -0.1429),
  mcq(m(PS, "apply-radius-preserved", "apply", 6, 45, "Integrating a power series term by term:"),
    "Keeps the same radius of convergence (though endpoint behaviour can change)",
    [
      ["Doubles the radius", "preserved-double", "The ratio test gives the same limit."],
      ["Halves the radius", "preserved-half", "Factors like $\\frac{1}{n + 1}$ don't change the radius."],
      ["Always makes it converge everywhere", "preserved-everywhere", "$\\ln(1 + x)$ still has $R = 1$."],
    ]),
  // level 7
  short(m(PS, "explain-x-over-square", "explain", 7, 120, "Find a power series for $\\frac{x}{(1 - x)^{2}}$ and its radius of convergence."),
    [
      ["series", "Differentiates the geometric series to get $\\frac{1}{(1 - x)^{2}} = \\sum nx^{n - 1}$, then multiplies by $x$: $\\sum_{n=1}^{\\infty} nx^{n}$", 3, true],
      ["radius", "$R = 1$", 1, true],
    ]),
  num(m(PS, "apply-n-squared-sum", "apply", 7, 60, "Find $\\sum_{n=1}^{\\infty} \\frac{n^{2}}{2^{n}}$."), 6),
  num(m(PS, "apply-log-two-series", "apply", 7, 60, "Find $\\sum_{n=1}^{\\infty} \\frac{1}{n\\,2^{n}}$. Give $3$ decimal places."), 0.693),
  mcq(m(PS, "apply-even-powers", "apply", 7, 60, "The radius of convergence of $\\sum_{n=0}^{\\infty} \\frac{x^{2n}}{4^{n}}$ is:"),
    "$2$",
    [
      ["$4$", "evenpow-four", "The series is $\\sum \\left(\\frac{x^{2}}{4}\\right)^{n}$, needing $x^{2} < 4$."],
      ["$\\frac{1}{4}$", "evenpow-quarter", "It converges for $|x| < 2$."],
      ["$16$", "evenpow-sixteen", "Solve $\\frac{x^{2}}{4} < 1$."],
    ]),
  // level 8
  short(m(PS, "explain-complex-singularity", "explain", 8, 150, "$\\frac{1}{1 + x^{2}}$ is smooth on all of $\\mathbb{R}$, yet its Maclaurin series has radius $1$. Explain why."),
    [
      ["series", "The series $\\sum (-1)^{n}x^{2n}$ is geometric with ratio $-x^{2}$, so it needs $x^{2} < 1$", 2, true],
      ["complex", "As a complex function, $\\frac{1}{1 + z^{2}}$ blows up at $z = \\pm i$, at distance $1$ from $0$; the radius is the distance to the nearest singularity", 2, true],
    ]),
  num(m(PS, "apply-second-derivative-sum", "apply", 8, 75, "Use $\\sum_{n=2}^{\\infty} n(n - 1)x^{n} = \\frac{2x^{2}}{(1 - x)^{3}}$ to find $\\sum_{n=2}^{\\infty} \\frac{n(n - 1)}{3^{n}}$."), 0.75),
  num(m(PS, "apply-central-binomial-radius", "apply", 8, 75, "Find the radius of convergence of $\\sum_{n=0}^{\\infty} \\frac{(n!)^{2}}{(2n)!}x^{n}$."), 4),
  mcq(m(PS, "transfer-abel-lemma", "transfer", 8, 75, "If $\\sum c_n x^{n}$ converges at $x = 3$, it must converge absolutely at:"),
    "$x = -2$",
    [
      ["$x = 4$", "abel-outside", "Convergence at $3$ only gives $R \\ge 3$."],
      ["$x = -3$", "abel-endpoint", "$-3$ may be an endpoint where it diverges."],
      ["$x = 5$", "abel-far", "That's beyond the guaranteed radius."],
    ]),
  // level 9
  short(m(PS, "transfer-abel-proof", "transfer", 9, 180, "Prove that if $\\sum c_n x_0^{n}$ converges, then $\\sum c_n x^{n}$ converges absolutely for every $|x| < |x_0|$."),
    [
      ["bounded", "Convergence gives $c_n x_0^{n} \\to 0$, so $|c_n x_0^{n}| \\le M$ for all $n$", 2, true],
      ["compare", "Then $|c_n x^{n}| \\le M\\left|\\frac{x}{x_0}\\right|^{n}$, a convergent geometric series", 2, true],
    ]),
  short(m(PS, "transfer-ode-series", "transfer", 9, 180, "Find the power series solution $y = \\sum c_n x^{n}$ of $y' = y$ with $y(0) = 1$."),
    [
      ["recurrence", "Matching coefficients of $x^{n}$ gives $(n + 1)c_{n + 1} = c_n$, with $c_0 = 1$", 2, true],
      ["solution", "So $c_n = \\frac{1}{n!}$ and $y = \\sum \\frac{x^{n}}{n!} = e^{x}$", 2, true],
    ]),
  num(m(PS, "apply-radius-third", "apply", 9, 90, "Find the radius of convergence of $\\sum_{n=1}^{\\infty} \\frac{(3x)^{n}}{n}$. Give $4$ decimal places."), 0.3333),
  mcq(m(PS, "transfer-fibonacci-gf", "transfer", 9, 90, "With $F_0 = 0$, $F_1 = 1$ and $F_{n + 1} = F_n + F_{n - 1}$, the generating function $\\sum F_n x^{n}$ equals:"),
    "$\\frac{x}{1 - x - x^{2}}$",
    [
      ["$\\frac{1}{1 - x - x^{2}}$", "fibgf-shift", "That starts $1 + x + 2x^{2} + \\cdots$, the sequence shifted by one."],
      ["$\\frac{x}{1 - x}$", "fibgf-geometric", "That generates $0, 1, 1, 1, \\ldots$."],
      ["$\\frac{x}{1 + x + x^{2}}$", "fibgf-sign", "The recurrence adds, so the signs are negative in the denominator."],
    ]),
  // level 10
  short(m(PS, "transfer-exp-series", "transfer", 10, 180, "Let $E(x) = \\sum_{n=0}^{\\infty} \\frac{x^{n}}{n!}$. Show that $E' = E$ and conclude $E(x) = e^{x}$."),
    [
      ["derivative", "Differentiates term by term (valid since $R = \\infty$): $E'(x) = \\sum_{n=1}^{\\infty} \\frac{x^{n - 1}}{(n - 1)!} = E(x)$", 2, true],
      ["conclude", "With $E(0) = 1$: $(E(x)e^{-x})' = 0$, so $E(x)e^{-x} = 1$ and $E(x) = e^{x}$", 2, true],
    ]),
  short(m(PS, "transfer-endpoint-abel", "transfer", 10, 180, "The series $\\ln(1 + x) = x - \\frac{x^{2}}{2} + \\frac{x^{3}}{3} - \\cdots$ was derived for $|x| < 1$. Explain why it still gives $\\ln 2$ at $x = 1$, and why this needs justification."),
    [
      ["converges", "At $x = 1$ the series is the alternating harmonic series, which converges by the alternating series test", 2, true],
      ["abel", "Term-by-term results hold inside the radius; at an endpoint you need an extra argument (Abel's theorem, or an integral remainder estimate) to identify the sum as $\\ln 2$", 2, true],
    ]),
  num(m(PS, "transfer-n-cubed-sum", "transfer", 10, 120, "Find $\\sum_{n=1}^{\\infty} \\frac{n^{3}}{2^{n}}$."), 26),
  mcq(m(PS, "transfer-lacunary", "transfer", 10, 120, "The radius of convergence of $\\sum_{n=1}^{\\infty} x^{n!}$ is:"),
    "$1$",
    [
      ["$0$", "lacunary-zero", "For $|x| < 1$ it's dominated by $\\sum |x|^{k}$."],
      ["$\\infty$", "lacunary-infinite", "At $x = 1$ every term is $1$, so it diverges."],
      ["$\\frac{1}{e}$", "lacunary-e", "The coefficients are $0$ or $1$, so the radius is $1$."],
    ]),
];

// ---------------------------------------------------------------------------
// taylor-series
// ---------------------------------------------------------------------------
const TS = "taylor-series";
const taylorSeries: Item[] = [
  // level 1
  mcq(m(TS, "recall-coefficient", "recall", 1, 15, "The coefficient of $(x - a)^{k}$ in the Taylor series of $f$ at $a$ is:"),
    "$\\frac{f^{(k)}(a)}{k!}$",
    [
      ["$f^{(k)}(a)$", "taylorcoef-no-factorial", "Differentiating $(x - a)^{k}$ $k$ times gives $k!$, which must be divided out."],
      ["$\\frac{f^{(k)}(a)}{k}$", "taylorcoef-k", "It's $k!$, not $k$."],
      ["$\\frac{f(a)}{k!}$", "taylorcoef-value", "Each coefficient uses the $k$th derivative."],
    ]),
  mcq(m(TS, "recall-maclaurin", "recall", 1, 15, "A Maclaurin series is:"),
    "A Taylor series centred at $0$",
    [
      ["Any power series", "maclaurin-any", "It's specifically the Taylor series of $f$ at $0$."],
      ["A Taylor series with finitely many terms", "maclaurin-finite", "That's a Taylor polynomial."],
      ["A Taylor series centred at $1$", "maclaurin-one", "The centre is $0$."],
    ]),
  mcq(m(TS, "recall-exp", "recall", 1, 15, "The Maclaurin series of $e^{x}$ is:"),
    "$\\sum_{n=0}^{\\infty} \\frac{x^{n}}{n!}$",
    [
      ["$\\sum_{n=0}^{\\infty} x^{n}$", "exp-geometric", "That's $\\frac{1}{1 - x}$."],
      ["$\\sum_{n=0}^{\\infty} \\frac{x^{n}}{n}$", "exp-n", "The $n = 0$ term would be undefined, and it's not $e^{x}$."],
      ["$\\sum_{n=0}^{\\infty} n!\\,x^{n}$", "exp-inverted", "That diverges for $x \\ne 0$."],
    ]),
  mcq(m(TS, "recall-first-degree", "recall", 1, 15, "The degree-$1$ Taylor polynomial $T_1$ of $f$ at $a$ is:"),
    "The tangent line (linearisation) at $a$",
    [
      ["The secant line through two points", "t1-secant", "$T_1$ matches $f$ and $f'$ at a single point."],
      ["The constant $f(a)$", "t1-constant", "That's $T_0$."],
      ["The best-fitting parabola", "t1-parabola", "That's $T_2$."],
    ]),
  // level 2
  num(m(TS, "apply-t2-exp", "apply", 2, 20, "Use $T_2(x) = 1 + x + \\frac{x^{2}}{2}$ for $e^{x}$ to estimate $e^{0.1}$. Give $3$ decimal places."), 1.105),
  num(m(TS, "apply-sin-cubic-coefficient", "apply", 2, 20, "Find the coefficient of $x^{3}$ in the Maclaurin series of $\\sin x$. Give $4$ decimal places."), -0.1667),
  num(m(TS, "apply-cos-quadratic-coefficient", "apply", 2, 20, "Find the coefficient of $x^{2}$ in the Maclaurin series of $\\cos x$."), -0.5),
  mcq(m(TS, "recall-cos-series", "recall", 2, 20, "The Maclaurin series of $\\cos x$ is:"),
    "$1 - \\frac{x^{2}}{2!} + \\frac{x^{4}}{4!} - \\cdots$",
    [
      ["$x - \\frac{x^{3}}{3!} + \\frac{x^{5}}{5!} - \\cdots$", "cos-sine", "That's $\\sin x$."],
      ["$1 + \\frac{x^{2}}{2!} + \\frac{x^{4}}{4!} + \\cdots$", "cos-cosh", "That's $\\cosh x$; cosine alternates."],
      ["$1 - x + \\frac{x^{2}}{2!} - \\cdots$", "cos-exp-minus", "That's $e^{-x}$."],
    ]),
  // level 3
  num(m(TS, "apply-exp-2x-coefficient", "apply", 3, 25, "Find the coefficient of $x^{3}$ in the Maclaurin series of $e^{2x}$. Give $4$ decimal places."), 1.3333),
  num(m(TS, "apply-t3-sin", "apply", 3, 25, "Use $T_3(x) = x - \\frac{x^{3}}{6}$ to estimate $\\sin 0.5$. Give $4$ decimal places."), 0.4792),
  num(m(TS, "apply-fifth-derivative-sin", "apply", 3, 25, "Find the fifth derivative of $\\sin x$ at $x = 0$."), 1),
  mcq(m(TS, "apply-gaussian-series", "apply", 3, 25, "The Maclaurin series of $e^{-x^{2}}$ is:"),
    "$\\sum_{n=0}^{\\infty} \\frac{(-1)^{n}x^{2n}}{n!}$",
    [
      ["$\\sum_{n=0}^{\\infty} \\frac{(-1)^{n}x^{2n}}{(2n)!}$", "gaussser-factorial", "Substitute $-x^{2}$ into $\\sum \\frac{u^{n}}{n!}$: the factorial stays $n!$."],
      ["$\\sum_{n=0}^{\\infty} \\frac{(-x)^{n}}{n!}$", "gaussser-linear", "That's $e^{-x}$."],
      ["$\\sum_{n=0}^{\\infty} \\frac{x^{2n}}{n!}$", "gaussser-sign", "The signs alternate."],
    ]),
  // level 4
  num(m(TS, "apply-high-derivative", "apply", 4, 30, "Find the tenth derivative of $e^{x^{2}}$ at $x = 0$."), 30240),
  num(m(TS, "apply-log-at-one", "apply", 4, 30, "Find the coefficient of $(x - 1)^{3}$ in the Taylor series of $\\ln x$ at $x = 1$. Give $4$ decimal places."), 0.3333),
  num(m(TS, "apply-series-limit", "apply", 4, 30, "Use series to find $\\lim_{x \\to 0} \\frac{\\sin x - x}{x^{3}}$. Give $4$ decimal places."), -0.1667),
  mcq(m(TS, "apply-binomial-root", "apply", 4, 30, "Near $x = 0$, $\\sqrt{1 + x} \\approx$"),
    "$1 + \\frac{x}{2} - \\frac{x^{2}}{8}$",
    [
      ["$1 + \\frac{x}{2} + \\frac{x^{2}}{8}$", "binroot-sign", "$\\binom{1/2}{2} = \\frac{(1/2)(-1/2)}{2} = -\\frac{1}{8}$."],
      ["$1 + \\frac{x}{2} - \\frac{x^{2}}{4}$", "binroot-factorial", "Divide by $2!$: $-\\frac{1}{4} \\cdot \\frac{1}{2} = -\\frac{1}{8}$."],
      ["$1 + 2x - x^{2}$", "binroot-inverted", "The exponent is $\\frac{1}{2}$, not $2$."],
    ]),
  // level 5
  short(m(TS, "explain-coefficient-formula", "explain", 5, 90, "Explain why, if $f(x) = \\sum c_k (x - a)^{k}$ near $a$, the coefficients must be $c_k = \\frac{f^{(k)}(a)}{k!}$."),
    [
      ["differentiate", "Differentiating $k$ times kills the lower terms and turns $c_k (x - a)^{k}$ into $k!\\,c_k$; the higher terms still have factors of $(x - a)$", 2, true],
      ["evaluate", "Setting $x = a$ gives $f^{(k)}(a) = k!\\,c_k$", 2, true],
    ]),
  mcq(m(TS, "recall-lagrange", "recall", 5, 40, "The Lagrange form of the remainder $R_n(x) = f(x) - T_n(x)$ is:"),
    "$\\frac{f^{(n + 1)}(c)}{(n + 1)!}(x - a)^{n + 1}$ for some $c$ between $a$ and $x$",
    [
      ["$\\frac{f^{(n)}(c)}{n!}(x - a)^{n}$", "lagrange-order", "The remainder is one order higher than the last term kept."],
      ["$f^{(n + 1)}(a)(x - a)^{n + 1}$", "lagrange-factorial", "The derivative is evaluated at some $c$, and there's a factorial."],
      ["$0$", "lagrange-zero", "Only for polynomials of degree at most $n$."],
    ]),
  mcq(m(TS, "recall-euler", "recall", 5, 40, "Substituting $ix$ into the series for $e^{x}$ gives:"),
    "$e^{ix} = \\cos x + i\\sin x$",
    [
      ["$e^{ix} = \\cos x - i\\sin x$", "euler-sign", "That's $e^{-ix}$."],
      ["$e^{ix} = \\sin x + i\\cos x$", "euler-swap", "The even (real) terms form $\\cos x$."],
      ["$e^{ix} = 1 + ix$", "euler-linear", "That's only the first two terms."],
    ]),
  num(m(TS, "apply-second-order-root", "apply", 5, 40, "Use the degree-$2$ Taylor polynomial of $\\sqrt{x}$ at $4$ to estimate $\\sqrt{4.1}$. Give $5$ decimal places."), 2.02484),
  // level 6
  short(m(TS, "explain-e-error", "explain", 6, 120, "Bound the error in approximating $e$ by $T_4(1) = 1 + 1 + \\frac{1}{2} + \\frac{1}{6} + \\frac{1}{24}$."),
    [
      ["remainder", "$R_4(1) = \\frac{e^{c}}{5!}$ for some $0 < c < 1$", 2, true],
      ["bound", "Since $e^{c} < 3$, the error is below $\\frac{3}{120} = 0.025$", 2, true],
    ]),
  num(m(TS, "apply-terms-for-e", "apply", 6, 45, "Using the bound $R_n(1) < \\frac{3}{(n + 1)!}$, what is the smallest $n$ for which $T_n(1)$ approximates $e$ with error below $10^{-6}$?"), 9),
  num(m(TS, "apply-gaussian-integral-series", "apply", 6, 45, "Estimate $\\int_0^{1} e^{-x^{2}}\\,dx$ using the first four nonzero terms of its series, $1 - \\frac{1}{3} + \\frac{1}{10} - \\frac{1}{42}$. Give $4$ decimal places."), 0.7429),
  mcq(m(TS, "apply-polynomial-series", "apply", 6, 45, "The Taylor series of a polynomial $p$ at any centre is:"),
    "The polynomial $p$ itself, rewritten in powers of $(x - a)$",
    [
      ["An infinite series that approximates $p$", "polyser-infinite", "All derivatives beyond the degree are $0$."],
      ["The tangent line", "polyser-tangent", "That's only $T_1$."],
      ["Zero", "polyser-zero", "The coefficients reproduce $p$."],
    ]),
  // level 7
  short(m(TS, "explain-series-limit", "explain", 7, 120, "Use Maclaurin series to find $\\lim_{x \\to 0} \\frac{1 - \\cos x - \\frac{x^{2}}{2}}{x^{4}}$."),
    [
      ["expand", "$1 - \\cos x = \\frac{x^{2}}{2} - \\frac{x^{4}}{24} + O(x^{6})$, so the numerator is $-\\frac{x^{4}}{24} + O(x^{6})$", 2, true],
      ["limit", "Dividing by $x^{4}$ gives $-\\frac{1}{24}$", 2, true],
    ]),
  num(m(TS, "apply-quartic-limit", "apply", 7, 60, "Find $\\lim_{x \\to 0} \\frac{1 - \\cos x - \\frac{x^{2}}{2}}{x^{4}}$. Give $4$ decimal places."), -0.0417),
  num(m(TS, "apply-recognise-exp", "apply", 7, 60, "Find $\\sum_{n=0}^{\\infty} \\frac{2^{n}}{n!}$. Give $3$ decimal places."), 7.389),
  mcq(m(TS, "apply-shifted-coefficient", "apply", 7, 60, "The coefficient of $x^{5}$ in the Maclaurin series of $x^{2}e^{x}$ is:"),
    "$\\frac{1}{6}$",
    [
      ["$\\frac{1}{120}$", "shiftcoef-unshifted", "Multiplying by $x^{2}$ shifts the $x^{3}$ coefficient $\\frac{1}{3!}$ up to $x^{5}$."],
      ["$\\frac{1}{24}$", "shiftcoef-off-by-one", "You need the $x^{3}$ term of $e^{x}$, which is $\\frac{1}{3!}$."],
      ["$\\frac{1}{2}$", "shiftcoef-two", "That's the $x^{2}$ coefficient of $e^{x}$."],
    ]),
  // level 8
  short(m(TS, "explain-not-analytic", "explain", 8, 150, "Explain why $f(x) = e^{-1/x^{2}}$ (with $f(0) = 0$) shows that a Taylor series can converge to the wrong function."),
    [
      ["derivatives", "Every derivative of $f$ at $0$ is $0$, so its Maclaurin series is identically $0$", 2, true],
      ["mismatch", "But $f(x) > 0$ for $x \\ne 0$, so the series (which converges everywhere) doesn't equal $f$; the remainder doesn't tend to $0$", 2, true],
    ]),
  num(m(TS, "apply-recognise-cos", "apply", 8, 75, "Find $\\sum_{n=0}^{\\infty} \\frac{(-1)^{n}\\pi^{2n}}{(2n)!}$."), -1),
  num(m(TS, "apply-t3-sin-small", "apply", 8, 75, "Use $T_3(x) = x - \\frac{x^{3}}{6}$ to estimate $\\sin 0.2$. Give $5$ decimal places."), 0.19867),
  mcq(m(TS, "recall-converges-to-f", "recall", 8, 75, "The Taylor series of $f$ at $a$ converges to $f(x)$ exactly when:"),
    "The remainder $R_n(x) \\to 0$ as $n \\to \\infty$",
    [
      ["$f$ is infinitely differentiable", "convf-smooth", "$e^{-1/x^{2}}$ is smooth but its series is $0$."],
      ["The series converges", "convf-converges", "It may converge to the wrong function."],
      ["$f(a) = 0$", "convf-value", "The value at $a$ is irrelevant."],
    ]),
  // level 9
  short(m(TS, "transfer-euler-formula", "transfer", 9, 180, "Derive Euler's formula $e^{ix} = \\cos x + i\\sin x$ from the Maclaurin series."),
    [
      ["substitute", "Substitutes $ix$ into $\\sum \\frac{z^{n}}{n!}$ and uses $i^{2} = -1$, $i^{3} = -i$, $i^{4} = 1$", 2, true],
      ["separate", "The real terms give $1 - \\frac{x^{2}}{2!} + \\cdots = \\cos x$ and the imaginary terms give $x - \\frac{x^{3}}{3!} + \\cdots = \\sin x$", 2, true],
    ]),
  short(m(TS, "transfer-e-irrational", "transfer", 9, 180, "Sketch the proof that $e$ is irrational, using $e = \\sum \\frac{1}{k!}$."),
    [
      ["assume", "Suppose $e = \\frac{p}{q}$; then $q!\\left(e - \\sum_{k=0}^{q} \\frac{1}{k!}\\right)$ is a positive integer", 2, true],
      ["bound", "But it equals $\\frac{1}{q + 1} + \\frac{1}{(q + 1)(q + 2)} + \\cdots < \\frac{1}{q} \\le 1$, a contradiction", 2, true],
    ]),
  num(m(TS, "apply-two-e", "apply", 9, 90, "Find $\\sum_{n=0}^{\\infty} \\frac{n + 1}{n!}$. Give $3$ decimal places."), 5.437),
  mcq(m(TS, "recall-binomial-minus-one", "recall", 9, 90, "The binomial series for $(1 + x)^{-1}$ is:"),
    "$1 - x + x^{2} - x^{3} + \\cdots$",
    [
      ["$1 + x + x^{2} + \\cdots$", "binneg-geometric", "That's $(1 - x)^{-1}$."],
      ["$1 - x$", "binneg-linear", "The series doesn't stop; the exponent isn't a positive integer."],
      ["$1 - x + \\frac{x^{2}}{2} - \\cdots$", "binneg-exp", "That's $e^{-x}$."],
    ]),
  // level 10
  short(m(TS, "transfer-multivariable-taylor", "transfer", 10, 180, "Write the second-order Taylor expansion of $f: \\mathbb{R}^{n} \\to \\mathbb{R}$ at $\\mathbf{x}$, and explain how it gives the second derivative test at a critical point."),
    [
      ["expansion", "$f(\\mathbf{x} + \\mathbf{h}) \\approx f(\\mathbf{x}) + \\nabla f(\\mathbf{x})^{\\top}\\mathbf{h} + \\frac{1}{2}\\mathbf{h}^{\\top}\\mathbf{H}\\mathbf{h}$, with $\\mathbf{H}$ the Hessian", 2, true],
      ["test", "At a critical point $\\nabla f = \\mathbf{0}$, so the sign of $\\mathbf{h}^{\\top}\\mathbf{H}\\mathbf{h}$ decides: positive definite gives a min, negative definite a max, indefinite a saddle", 2, true],
    ]),
  short(m(TS, "transfer-tan-series", "transfer", 10, 180, "Find the Maclaurin series of $\\tan x$ up to the $x^{5}$ term."),
    [
      ["method", "Divides the series of $\\sin x$ by that of $\\cos x$ (or solves $\\tan x \\cdot \\cos x = \\sin x$ for the coefficients)", 2, true],
      ["result", "Gets $\\tan x = x + \\frac{x^{3}}{3} + \\frac{2x^{5}}{15} + \\cdots$", 2, true],
    ]),
  num(m(TS, "transfer-tan-coefficient", "transfer", 10, 120, "Find the coefficient of $x^{5}$ in the Maclaurin series of $\\tan x$. Give $4$ decimal places."), 0.1333),
  mcq(m(TS, "transfer-log-radius", "transfer", 10, 120, "The Taylor series of $\\ln x$ centred at $a = 2$ has radius of convergence:"),
    "$2$",
    [
      ["$1$", "lnradius-one", "The nearest singularity, at $x = 0$, is $2$ away."],
      ["$\\infty$", "lnradius-infinite", "$\\ln x$ blows up at $0$."],
      ["$\\frac{1}{2}$", "lnradius-half", "The radius is the distance from the centre to $0$."],
    ]),
];

export const calc06Items: Item[] = [...sequences, ...infiniteSeries, ...powerSeries, ...taylorSeries];
