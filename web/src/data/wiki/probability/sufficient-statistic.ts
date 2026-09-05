import type { WikiArticle } from "../types";

export const sufficientStatistic: WikiArticle = {
  conceptId: "sufficient-statistic",
  summary:
    "A sufficient statistic captures everything in the data that is relevant to a parameter. Once you know it, the raw observations carry no further information about $\\theta$ — you could discard them. This is what makes summarising legitimate rather than lossy, and it is the reason estimators are built from sample means and sums rather than from the whole dataset.",
  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "T(X) \\text{ is sufficient for } \\theta \\iff P\\big(X = x \\mid T(X) = t,\\ \\theta\\big) \\text{ does not depend on } \\theta",
          caption: "Conditioning on $T$ removes all dependence on the parameter",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "What sufficiency actually claims",
          text: "Imagine two statisticians. One sees the full dataset; the other sees only $T(X) = t$ and then simulates a fake dataset from the conditional distribution given $t$. Because that conditional distribution does not involve $\\theta$, the second statistician can do this without knowing $\\theta$ — and their fabricated data has exactly the same distribution as the real thing. Neither has any advantage in estimating $\\theta$. That equivalence is the content of sufficiency.",
        },
      ],
    },
    {
      heading: "The factorisation theorem",
      blocks: [
        {
          kind: "formula",
          latex: "f(x \\mid \\theta) = g\\big(T(x),\\ \\theta\\big) \\cdot h(x)",
          caption: "Fisher–Neyman factorisation — $T$ is sufficient iff the likelihood splits this way",
        },
        {
          kind: "prose",
          text: "This is how sufficiency is checked in practice, since the definition's conditional distribution is awkward to compute. Write the joint density and look for a split: one factor depending on the data only through $T$ and on $\\theta$, and one factor not involving $\\theta$ at all.",
        },
        {
          kind: "example",
          title: "Sufficiency for a Bernoulli proportion",
          problem: "Show that $T = \\sum_{i=1}^{n} X_i$ is sufficient for $p$ in $n$ Bernoulli trials.",
          steps: [
            "Joint pmf: $\\prod_{i=1}^{n} p^{x_i}(1-p)^{1-x_i}$.",
            "Collect exponents: $= p^{\\sum x_i}(1-p)^{n - \\sum x_i}$.",
            "This depends on the data only through $\\sum x_i$, so $g(T,p) = p^{T}(1-p)^{n-T}$ and $h(x) = 1$.",
            "Factorisation holds, so $T$ is sufficient.",
          ],
          answer:
            "The count of successes is sufficient. The *order* of the successes carries no information about $p$ — which is intuitive once stated, and which the factorisation proves.",
        },
        {
          kind: "table",
          headers: ["Model", "Sufficient statistic"],
          rows: [
            ["Bernoulli$(p)$ / Binomial", "$\\sum X_i$"],
            ["Poisson$(\\lambda)$", "$\\sum X_i$"],
            ["Normal$(\\mu, \\sigma^{2})$, both unknown", "$\\left(\\sum X_i,\\ \\sum X_i^{2}\\right)$"],
            ["Exponential$(\\lambda)$", "$\\sum X_i$"],
            ["Uniform$(0, \\theta)$", "$\\max X_i$"],
          ],
          caption:
            "For most familiar models the sufficient statistic reduces $n$ numbers to one or two — which is exactly why those summaries are the ones everyone reports.",
        },
      ],
    },
    {
      heading: "Minimal sufficiency",
      blocks: [
        {
          kind: "prose",
          text: "The whole dataset is always sufficient — trivially, since it withholds nothing. Sufficiency is therefore only interesting when it compresses. A *minimal* sufficient statistic achieves the greatest possible reduction: it is a function of every other sufficient statistic.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The Uniform case is instructive",
          text: "For Uniform$(0,\\theta)$, $\\max X_i$ is sufficient — but $\\sum X_i$ is not, despite being the natural summary elsewhere. The likelihood is $\\theta^{-n}$ if $\\theta \\ge \\max x_i$ and zero otherwise, so the data enter only through the maximum. This is why the moment estimator $2\\bar{X}$ performs so badly here: it discards the sufficient statistic and uses an insufficient one.",
        },
      ],
    },
    {
      heading: "Why it matters",
      blocks: [
        {
          kind: "prose",
          text: "The Rao–Blackwell theorem is the payoff. Given any unbiased estimator, conditioning it on a sufficient statistic produces another unbiased estimator with variance no larger — usually strictly smaller.",
        },
        {
          kind: "formula",
          latex: "\\hat{\\theta}^{*} = \\mathbb{E}\\big[\\hat{\\theta} \\mid T\\big] \\quad\\Longrightarrow\\quad \\mathbb{E}[\\hat{\\theta}^{*}] = \\theta, \\qquad \\operatorname{Var}(\\hat{\\theta}^{*}) \\le \\operatorname{Var}(\\hat{\\theta})",
          caption: "Rao–Blackwellisation",
        },
        {
          kind: "prose",
          text: "The variance reduction is exactly the law of total variance: conditioning removes the within-$T$ variability, which was noise unrelated to $\\theta$. Combined with completeness, this yields the Lehmann–Scheffé theorem — the resulting estimator is the unique best unbiased one. So sufficiency is not merely a compression result; it is the route to optimal estimators.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Sufficiency is model-dependent",
          text: "A statistic is sufficient *for a parameter within an assumed model*. $\\bar{X}$ is sufficient for a normal mean with known variance; it is not sufficient if the distribution might be Cauchy, or if you also care about the variance. Discarding data on grounds of sufficiency assumes the model is right — which is precisely what residual diagnostics, computed from the discarded data, are for.",
        },
      ],
    },
  ],
  references: [
    { source: "Casella & Berger, Statistical Inference", locator: "§6.2, §7.3.3" },
    { source: "Wasserman, All of Statistics", locator: "§9.13" },
    { source: "Mathlingo assessment bank", locator: "assessments/estimation-theory.md" },
  ],
};
