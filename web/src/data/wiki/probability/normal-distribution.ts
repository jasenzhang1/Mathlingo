import type { WikiArticle } from "../types";

export const normalDistribution: WikiArticle = {
  conceptId: "normal-distribution",
  summary:
    "The normal distribution is the one every other distribution tends toward. Its prominence is not aesthetic: the central limit theorem makes it the limiting shape of sums and averages, whatever they are sums of, which is why it appears wherever many small independent effects accumulate — and why assuming it where they do not is a standard modelling error.",
  sections: [
    {
      heading: "Density and parameters",
      blocks: [
        {
          kind: "formula",
          latex: "f_X(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}}\\,\\exp\\!\\left(-\\frac{(x-\\mu)^{2}}{2\\sigma^{2}}\\right), \\qquad x \\in \\mathbb{R}",
          caption: "Normal$(\\mu, \\sigma^{2})$ density",
        },
        {
          kind: "prose",
          text: "The two parameters are exactly the mean and variance, which is unusually convenient — for most distributions the parameters and the moments are different quantities related by some formula. Here $\\mathbb{E}[X] = \\mu$ and $\\operatorname{Var}(X) = \\sigma^{2}$ directly.",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "Symmetric about $\\mu$, so mean, median, and mode coincide.",
            "Support is all of $\\mathbb{R}$ — every real value has positive density, however far into the tail.",
            "The tails decay like $e^{-x^{2}}$, which is extremely fast. This is the source of both its convenience and its danger as a model.",
          ],
        },
      ],
    },
    {
      heading: "Standardisation",
      blocks: [
        {
          kind: "formula",
          latex: "Z = \\frac{X - \\mu}{\\sigma} \\sim \\mathcal{N}(0, 1)",
          caption: "Any normal becomes standard normal by centring and scaling",
        },
        {
          kind: "prose",
          text: "This is why a single table (or a single function, $\\Phi$) suffices for the entire family. Subtracting $\\mu$ shifts the centre to zero; dividing by $\\sigma$ rescales to unit variance — and because variance scales by the *square*, dividing by $\\sigma$ divides variance by $\\sigma^{2}$.",
        },
        {
          kind: "example",
          title: "Worked example",
          problem:
            "Adult heights are approximately Normal with $\\mu = 170$ cm and $\\sigma = 10$ cm. What fraction exceed 190 cm?",
          steps: [
            "Standardise: $z = (190 - 170)/10 = 2$.",
            "$P(X > 190) = P(Z > 2) = 1 - \\Phi(2)$.",
            "$\\Phi(2) \\approx 0.9772$.",
            "$1 - 0.9772 = 0.0228$.",
          ],
          answer: "About $2.3\\%$.",
        },
        {
          kind: "table",
          headers: ["Range", "Probability", "Common name"],
          rows: [
            ["$\\mu \\pm 1\\sigma$", "$\\approx 0.6827$", "68%"],
            ["$\\mu \\pm 1.96\\sigma$", "$\\approx 0.9500$", "the 95% interval"],
            ["$\\mu \\pm 2\\sigma$", "$\\approx 0.9545$", "95% (approximately)"],
            ["$\\mu \\pm 3\\sigma$", "$\\approx 0.9973$", "99.7%"],
          ],
          caption:
            "The exact 95% multiplier is 1.96, not 2 — the difference matters when a confidence interval is reported to three significant figures.",
        },
      ],
    },
    {
      heading: "Why it appears everywhere",
      blocks: [
        {
          kind: "formula",
          latex: "\\frac{\\bar{X}_n - \\mu}{\\sigma/\\sqrt{n}} \\ \\xrightarrow{d} \\ \\mathcal{N}(0,1) \\quad \\text{as } n \\to \\infty",
          caption: "The central limit theorem",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The CLT is about sums, not about data",
          text: "It says the *sampling distribution of an average* becomes normal, regardless of the distribution being averaged. It does not say your data are normal, and it does not make them so. Heights are roughly normal because many small genetic and environmental contributions add up; incomes are not, because they compound multiplicatively rather than adding — which produces a log-normal shape instead.",
        },
        {
          kind: "prose",
          text: "Two closure properties make the normal family unusually easy to work with. A linear transformation of a normal is normal: $aX + b \\sim \\mathcal{N}(a\\mu + b,\\ a^{2}\\sigma^{2})$. And a sum of *independent* normals is normal, with means and variances adding:",
        },
        {
          kind: "formula",
          latex: "X_1 \\sim \\mathcal{N}(\\mu_1, \\sigma_1^{2}),\\ X_2 \\sim \\mathcal{N}(\\mu_2, \\sigma_2^{2}) \\ \\Rightarrow\\ X_1 + X_2 \\sim \\mathcal{N}(\\mu_1 + \\mu_2,\\ \\sigma_1^{2} + \\sigma_2^{2})",
          caption: "Closure under addition — independence is required",
        },
      ],
    },
    {
      heading: "Where the model fails",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Thin tails understate extreme events",
          text: "A $5\\sigma$ event has normal probability about $3 \\times 10^{-7}$ — roughly once in 7,000 years of daily observations. Financial returns produce such moves far more often, because volatility clusters and shocks are not independent. Assuming normality in the tails is not a small approximation error; it can understate catastrophic risk by orders of magnitude. Heavier-tailed alternatives such as the $t$ distribution exist for this reason.",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "**Bounded or non-negative quantities.** A normal puts positive probability on every real number, including negative heights, negative durations, and proportions above 1.",
            "**Skewed data.** The normal is symmetric; incomes, waiting times, and reaction times are not.",
            "**Assuming the CLT has taken effect.** Convergence is fast for well-behaved distributions and slow for strongly skewed or heavy-tailed ones. $n = 30$ is a rule of thumb, not a theorem.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Blitzstein & Hwang, Introduction to Probability", locator: "Ch. 5.4, 10.3" },
    { source: "Casella & Berger, Statistical Inference", locator: "§3.3, §5.5" },
    { source: "Wasserman, All of Statistics", locator: "§2.4, §5.3" },
    { source: "Mathlingo assessment bank", locator: "assessments/continuous-distributions.md" },
  ],
};
