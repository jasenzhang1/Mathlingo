import type { WikiArticle } from "../types";

export const tDistribution: WikiArticle = {
  conceptId: "t-distribution",
  summary:
    "The $t$ distribution is what replaces the normal when the standard deviation has to be estimated rather than known. Its heavier tails are not a stylistic difference — they are the exact price of the extra uncertainty introduced by estimating $\\sigma$, and ignoring them makes confidence intervals too narrow in small samples.",
  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "T = \\frac{Z}{\\sqrt{V/k}}, \\qquad Z \\sim \\mathcal{N}(0,1),\\ V \\sim \\chi^{2}_{k},\\ Z \\perp\\!\\!\\!\\perp V",
          caption: "A standard normal divided by the root of an independent scaled chi-square",
        },
        {
          kind: "prose",
          text: "In the one-sample setting the pieces are exactly the sample mean and sample variance. Standardising with the *estimated* standard deviation gives",
        },
        {
          kind: "formula",
          latex: "\\frac{\\bar{X} - \\mu}{s/\\sqrt{n}} \\sim t_{n-1}",
          caption: "The one-sample $t$ statistic, for normal data",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why the tails are heavier",
          text: "In $\\frac{\\bar{X}-\\mu}{\\sigma/\\sqrt{n}}$ the denominator is a constant, so all the randomness is in the numerator. Replacing $\\sigma$ with $s$ makes the denominator random too — and crucially, a small $s$ inflates the ratio. Occasionally underestimating $\\sigma$ therefore produces occasional very large $t$ values, which is precisely a heavier tail. The $t$ distribution is the exact accounting of that extra variability, not an approximation to it.",
        },
      ],
    },
    {
      heading: "Behaviour with degrees of freedom",
      blocks: [
        {
          kind: "table",
          headers: ["df", "97.5th percentile", "vs normal (1.96)"],
          rows: [
            ["1", "12.71", "6.5× wider"],
            ["5", "2.571", "31% wider"],
            ["10", "2.228", "14% wider"],
            ["30", "2.042", "4% wider"],
            ["100", "1.984", "1% wider"],
            ["$\\infty$", "1.960", "identical"],
          ],
          caption:
            "The multiplier for a 95% confidence interval. This is why $n = 30$ is the usual rule of thumb — beyond it the difference stops mattering for most purposes.",
        },
        {
          kind: "prose",
          text: "As $k \\to \\infty$ the $t$ converges to the standard normal, because $s \\to \\sigma$ and the denominator stops being random. At the other extreme, $t_1$ is the Cauchy distribution — so heavy-tailed that it has no mean at all. More generally $t_k$ has a mean only for $k > 1$ and a variance only for $k > 2$, where it equals $k/(k-2)$.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "A small-sample confidence interval",
          problem:
            "Eight measurements have $\\bar{x} = 24.5$ and $s = 2.1$. Construct a 95% confidence interval for the mean.",
          steps: [
            "$\\sigma$ is unknown and $n$ is small, so use $t$ with $n - 1 = 7$ degrees of freedom.",
            "$t_{0.975,\\,7} = 2.365$.",
            "Standard error: $s/\\sqrt{n} = 2.1/\\sqrt{8} \\approx 0.7425$.",
            "Margin: $2.365 \\times 0.7425 \\approx 1.756$.",
            "Interval: $24.5 \\pm 1.756$.",
            "Using $1.96$ instead would give $\\pm 1.455$ — about 17% too narrow, and an interval that fails to cover the true mean more often than the advertised 5%.",
          ],
          answer: "$(22.74,\\ 26.26)$.",
        },
      ],
    },
    {
      heading: "Assumptions and robustness",
      blocks: [
        {
          kind: "callout",
          tone: "insight",
          title: "Where normality is and is not needed",
          text: "The exact $t$ result requires the *data* to be normal. But the $t$-test is famously robust: by the CLT, $\\bar{X}$ becomes approximately normal for moderate $n$ regardless of the underlying distribution, so the test's error rate stays close to nominal even for fairly non-normal data. The contrast with the chi-square variance test is instructive — that one is not robust, because it depends on normality of the data directly rather than through an average.",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "**Outliers still hurt**, even with the CLT. They inflate $s$, widening intervals, and can shift $\\bar{x}$ substantially in small samples.",
            "**Strong skew slows convergence.** For heavily skewed data $n = 30$ may not be enough; a bootstrap interval is a better choice.",
            "**Independence is not negotiable.** No amount of sample size rescues a $t$-test applied to correlated observations — the standard error is simply wrong.",
          ],
        },
        {
          kind: "prose",
          text: "Beyond testing, the $t$ distribution is used deliberately as a heavy-tailed *model*: robust regression and Bayesian models often assume $t$ errors precisely because the tails tolerate outliers that would dominate a normal likelihood. Small degrees of freedom, typically 3 to 7, give a distribution that looks normal in the middle and forgives extremes.",
        },
      ],
    },
  ],
  references: [
    { source: "Casella & Berger, Statistical Inference", locator: "§5.3.2, Thm 5.3.1" },
    { source: "Wasserman, All of Statistics", locator: "§10.2" },
    { source: "Student (W.S. Gosset), 'The Probable Error of a Mean'", locator: "Biometrika 6(1), 1908" },
    { source: "Mathlingo assessment bank", locator: "assessments/continuous-distributions.md" },
  ],
};
