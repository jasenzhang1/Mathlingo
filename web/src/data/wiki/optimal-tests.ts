import type { WikiArticle } from "./types";

/**
 * Statistical inference additions: the Neyman–Pearson lemma and the uniformly
 * most powerful tests built from it (the "Most Powerful Tests" section), and
 * Q-Q plots, filed with the distribution-free methods beside Kolmogorov–Smirnov.
 */

export const neymanPearsonLemmaWiki: WikiArticle = {
  conceptId: "neyman-pearson-lemma",
  summary:
    "Among all tests that make a Type I error with probability at most $\\alpha$, which one has the most power? For " +
    "a simple null against a simple alternative, the Neyman–Pearson lemma answers completely: reject when the " +
    "likelihood ratio $L_1/L_0$ is large. Every other test of the same size is at most as powerful. It is the reason " +
    "the likelihood ratio sits at the centre of hypothesis testing.",
  sections: [
    {
      heading: "Statement",
      blocks: [
        {
          kind: "formula",
          latex: "H_0: \\theta = \\theta_0 \\;\\text{vs}\\; H_1: \\theta = \\theta_1: \\qquad \\text{reject } H_0 \\iff \\Lambda(x) = \\frac{L(\\theta_1; x)}{L(\\theta_0; x)} > k, \\quad P_{\\theta_0}(\\Lambda(X) > k) = \\alpha",
        },
        {
          kind: "list",
          items: [
            "Both hypotheses must be simple — each names one distribution completely.",
            "The threshold $k$ is set by the size: the probability of rejecting under $H_0$ must equal $\\alpha$.",
            "The test is most powerful: any test $\\phi$ with $\\mathbb{E}_{\\theta_0}[\\phi] \\le \\alpha$ has $\\mathbb{E}_{\\theta_1}[\\phi] \\le$ the likelihood-ratio test's power.",
            "For discrete data, $P(\\Lambda > k)$ jumps, so hitting $\\alpha$ exactly may need a randomised rejection when $\\Lambda = k$.",
          ],
        },
      ],
    },
    {
      heading: "Why it works",
      blocks: [
        {
          kind: "prose",
          text:
            "Let $\\phi^*$ be the likelihood-ratio test and $\\phi$ any other test of size at most $\\alpha$. Wherever " +
            "$\\phi^* = 1$ we have $f_1 > k f_0$ and $\\phi^* - \\phi \\ge 0$; wherever $\\phi^* = 0$, $f_1 \\le k f_0$ and " +
            "$\\phi^* - \\phi \\le 0$. So $(\\phi^* - \\phi)(f_1 - k f_0) \\ge 0$ everywhere. Integrating gives " +
            "$\\text{power}(\\phi^*) - \\text{power}(\\phi) \\ge k\\big(\\text{size}(\\phi^*) - \\text{size}(\\phi)\\big) \\ge 0$.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "A knapsack picture",
          text:
            "Think of each possible data point as an item costing $f_0(x)$ of your $\\alpha$ budget and paying $f_1(x)$ in " +
            "power. The best rejection region takes items in order of value per unit cost — the likelihood ratio — until the " +
            "budget runs out.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Normal mean, simple vs simple",
          problem:
            "$X_1, \\ldots, X_n \\sim \\mathcal{N}(\\mu, 1)$, $H_0: \\mu = 0$ vs $H_1: \\mu = 1$, $n = 4$, $\\alpha = 0.05$. Find the most powerful test and its power.",
          steps: [
            "$\\log \\Lambda = \\sum_i \\big(x_i - \\tfrac{1}{2}\\big)$, which is increasing in $\\bar{x}$, so reject for large $\\bar{x}$.",
            "Under $H_0$, $\\bar{X} \\sim \\mathcal{N}(0, \\tfrac{1}{4})$: reject when $\\bar{x} > 1.645/2 = 0.8225$.",
            "Power: $P_{\\mu = 1}(\\bar{X} > 0.8225) = P(Z > (0.8225 - 1) \\times 2) = P(Z > -0.355) \\approx 0.639$.",
          ],
          answer: "Reject when $\\bar{x} > 0.8225$; power $\\approx 0.64$. No other size-$0.05$ test does better.",
        },
      ],
    },
  ],
  references: [
    { source: "Casella & Berger, Statistical Inference (2nd ed.)", locator: "Theorem 8.3.12" },
    { source: "Lehmann & Romano, Testing Statistical Hypotheses (3rd ed.)", locator: "§3.2" },
  ],
};

export const uniformlyMostPowerfulTestWiki: WikiArticle = {
  conceptId: "uniformly-most-powerful-test",
  summary:
    "A test is uniformly most powerful (UMP) if it is the most powerful size-$\\alpha$ test against every alternative " +
    "in $H_1$ at once. The Neyman–Pearson lemma gives a best test for each alternative separately; when those best " +
    "tests all coincide, the common test is UMP. The Karlin–Rubin theorem says this happens for one-sided hypotheses " +
    "whenever the family has a monotone likelihood ratio — and it fails for two-sided ones.",
  sections: [
    {
      heading: "Monotone likelihood ratio and Karlin–Rubin",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Monotone likelihood ratio (MLR)", description: "A family $\\{f_\\theta\\}$ has MLR in a statistic $T$ if for every $\\theta_1 > \\theta_0$, $f_{\\theta_1}(x)/f_{\\theta_0}(x)$ is a non-decreasing function of $T(x)$." },
            { term: "Karlin–Rubin", description: "If the family has MLR in a sufficient statistic $T$, then for $H_0: \\theta \\le \\theta_0$ vs $H_1: \\theta > \\theta_0$ the test rejecting when $T > c$, with $P_{\\theta_0}(T > c) = \\alpha$, is UMP of size $\\alpha$." },
          ],
        },
        {
          kind: "prose",
          text:
            "The proof is Neyman–Pearson applied one alternative at a time: for any $\\theta_1 > \\theta_0$, “$\\Lambda > k$” " +
            "is the same event as “$T > c$”, and $c$ does not depend on $\\theta_1$. MLR also makes the power function " +
            "increasing, so the size over the whole composite null is attained at $\\theta_0$.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Exponential families have it",
          text:
            "A one-parameter exponential family $f_\\theta(x) = h(x)\\exp\\big(\\eta(\\theta) T(x) - A(\\theta)\\big)$ with $\\eta$ " +
            "increasing has MLR in $T$. So normal means, binomial and Poisson rates, and exponential rates all have " +
            "one-sided UMP tests. (If $\\eta$ is decreasing, reverse the direction of the rejection region.)",
        },
      ],
    },
    {
      heading: "When no UMP test exists",
      blocks: [
        {
          kind: "prose",
          text:
            "For $H_0: \\mu = 0$ vs $H_1: \\mu \\ne 0$ with normal data, the most powerful test against $\\mu = 1$ rejects for " +
            "large $\\bar{x}$, while the most powerful test against $\\mu = -1$ rejects for small $\\bar{x}$. No single test " +
            "can be best against both, so no UMP test exists. The usual two-sided test $|\\bar{x}| > c$ is instead UMP " +
            "among unbiased tests — tests whose power never falls below $\\alpha$.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Poisson rate",
          problem: "$X_1, \\ldots, X_n \\sim \\text{Poisson}(\\lambda)$. Find the form of the UMP test of $H_0: \\lambda \\le 2$ vs $H_1: \\lambda > 2$.",
          steps: [
            "The likelihood is $\\propto \\lambda^{\\sum x_i} e^{-n\\lambda}$, an exponential family with $T = \\sum x_i$ and natural parameter $\\log \\lambda$, increasing in $\\lambda$.",
            "So the family has MLR in $T$, and by Karlin–Rubin the UMP test rejects when $\\sum x_i > c$.",
            "Choose $c$ (randomising at the boundary if needed) so that $P_{\\lambda = 2}(\\sum X_i > c) = \\alpha$, using $\\sum X_i \\sim \\text{Poisson}(2n)$.",
          ],
          answer: "Reject when the total count is large: $\\sum x_i > c$.",
        },
      ],
    },
  ],
  references: [
    { source: "Casella & Berger, Statistical Inference (2nd ed.)", locator: "§8.3.2, Theorem 8.3.17" },
    { source: "Lehmann & Romano, Testing Statistical Hypotheses (3rd ed.)", locator: "§3.4, §4.1" },
  ],
};

export const qqPlotsWiki: WikiArticle = {
  conceptId: "qq-plots",
  summary:
    "A quantile–quantile plot checks whether data could come from a reference distribution — most often the normal — " +
    "by plotting the sorted sample against the quantiles that distribution predicts. If the model fits, the points fall " +
    "on a straight line; the way they bend away tells you how it fails: skew, heavy tails, or outliers. Formal tests " +
    "such as Shapiro–Wilk turn the straightness into a p-value.",
  sections: [
    {
      heading: "Construction",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Sort the data: $x_{(1)} \\le \\cdots \\le x_{(n)}$.",
            "Assign plotting positions $p_i = \\dfrac{i - 0.5}{n}$ (other conventions, such as $\\tfrac{i - 3/8}{n + 1/4}$, differ only slightly).",
            "Plot the points $\\big(\\Phi^{-1}(p_i),\\, x_{(i)}\\big)$: theoretical quantiles on the horizontal axis, sample quantiles on the vertical.",
          ],
        },
        {
          kind: "prose",
          text:
            "If $X \\sim \\mathcal{N}(\\mu, \\sigma^2)$, its quantiles are $\\mu + \\sigma \\Phi^{-1}(p)$, so the points lie near a line " +
            "with intercept $\\mu$ and slope $\\sigma$. Location and scale do not affect straightness, which is why you never " +
            "need to standardise first.",
        },
      ],
    },
    {
      heading: "Reading the shapes",
      blocks: [
        {
          kind: "table",
          headers: ["Pattern", "Meaning"],
          rows: [
            ["Straight line", "consistent with the reference distribution"],
            ["Both ends bend upward (convex, U-shape)", "right skew: the upper tail is stretched"],
            ["Both ends bend downward (concave)", "left skew"],
            ["Low end below the line, high end above (S-shape)", "heavy tails — more extreme values than normal"],
            ["Low end above the line, high end below", "light tails, e.g. uniform-like data"],
            ["One or two isolated points off the end", "outliers"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Small samples wiggle",
          text:
            "With $n = 20$ even genuinely normal data wander noticeably off the line, especially in the tails. Judge the " +
            "overall shape, not individual points, or overlay a simulation envelope.",
        },
      ],
    },
    {
      heading: "Formal tests of normality",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Shapiro–Wilk", description: "$W$ is essentially the squared correlation between the ordered sample and optimally weighted normal scores; values well below $1$ reject normality. Among the most powerful general normality tests." },
            { term: "Kolmogorov–Smirnov / Lilliefors", description: "The largest gap between the empirical CDF and the fitted normal CDF; Lilliefors corrects the null distribution for estimating $\\mu$ and $\\sigma$." },
            { term: "Anderson–Darling", description: "A weighted CDF distance that gives the tails more weight than KS." },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The large-sample trap",
          text:
            "With $n$ in the thousands, a normality test rejects deviations too small to matter, and many procedures (a " +
            "$t$-test via the CLT) are robust to them anyway. With small $n$ it has little power. The Q-Q plot shows the size " +
            "and kind of departure, which is what decides whether it matters.",
        },
      ],
    },
  ],
  references: [
    { source: "Wilk & Gnanadesikan, Probability plotting methods for the analysis of data (Biometrika, 1968)", locator: "§2" },
    { source: "Shapiro & Wilk, An analysis of variance test for normality (Biometrika, 1965)", locator: "§2–3" },
  ],
};
