import type { WikiArticle } from "../types";

export const negativeBinomialDistribution: WikiArticle = {
  conceptId: "negative-binomial-distribution",
  summary:
    "The negative binomial counts trials until the $r$th success — the geometric generalised beyond one success. It has a second and now more common life as the standard remedy for overdispersed count data, where its extra parameter lets variance exceed the mean in a way the Poisson cannot.",
  sections: [
    {
      heading: "The waiting-time view",
      blocks: [
        {
          kind: "formula",
          latex: "P(X = k) = \\binom{k-1}{r-1} p^{r}(1-p)^{k-r}, \\qquad k = r, r+1, \\ldots",
          caption: "Trials needed to obtain $r$ successes",
        },
        {
          kind: "prose",
          text: "The structure reads off the experiment. The $k$th trial must be a success — that is forced, and contributes one factor of $p$. Among the first $k-1$ trials, exactly $r-1$ must be successes, in any order: hence $\\binom{k-1}{r-1}$ rather than $\\binom{k}{r}$.",
        },
        {
          kind: "formula",
          latex: "\\mathbb{E}[X] = \\frac{r}{p}, \\qquad \\operatorname{Var}(X) = \\frac{r(1-p)}{p^{2}}",
          caption: "$r$ independent geometric waits, so means and variances add",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Conventions differ, again",
          text: "Some texts count *failures before* the $r$th success rather than total trials, shifting the support to $\\{0, 1, 2, \\ldots\\}$ and the mean to $r(1-p)/p$. Software almost always uses the failures version. The two differ by exactly $r$, and the mismatch is silent.",
        },
      ],
    },
    {
      heading: "Why 'negative'",
      blocks: [
        {
          kind: "prose",
          text: "The name comes from Newton's binomial series with a negative exponent, which is what makes the pmf sum to 1:",
        },
        {
          kind: "formula",
          latex: "(1 - q)^{-r} = \\sum_{j=0}^{\\infty} \\binom{r + j - 1}{j} q^{j}, \\qquad |q| < 1",
          caption: "The negative binomial series — the coefficients are the pmf's",
        },
        {
          kind: "prose",
          text: "Setting $q = 1-p$ and multiplying through by $p^{r}$ gives exactly the probabilities above, summing to $p^{r}(1-(1-p))^{-r} = 1$. Nothing about the distribution is negative; the exponent is.",
        },
      ],
    },
    {
      heading: "The overdispersion view",
      blocks: [
        {
          kind: "callout",
          tone: "insight",
          title: "A Poisson whose rate is itself random",
          text: "Let $\\Lambda \\sim \\text{Gamma}$ and then $X \\mid \\Lambda \\sim \\text{Poisson}(\\Lambda)$. Marginalising out $\\Lambda$ gives exactly a negative binomial. This is why it models overdispersion: the law of total variance adds $\\operatorname{Var}(\\mathbb{E}[X \\mid \\Lambda])$ on top of the Poisson variance, so the variance now strictly exceeds the mean. The interpretation is that units differ — some customers buy more, some regions have more accidents — and that unmodelled heterogeneity inflates the spread.",
        },
        {
          kind: "formula",
          latex: "\\mathbb{E}[X] = \\mu, \\qquad \\operatorname{Var}(X) = \\mu + \\frac{\\mu^{2}}{r}",
          caption: "The regression parameterisation — $r \\to \\infty$ recovers the Poisson",
        },
        {
          kind: "prose",
          text: "In this form $r$ is a dispersion parameter rather than a count of successes, and it need not be an integer. Large $r$ means little extra variance and the model collapses to Poisson; small $r$ means heavy overdispersion.",
        },
        {
          kind: "example",
          title: "Diagnosing overdispersion",
          problem:
            "Insurance claims per policy have sample mean 0.8 and sample variance 2.4. Is a Poisson model adequate?",
          steps: [
            "Poisson requires $\\operatorname{Var} = \\mathbb{E}$, so the variance should be about 0.8.",
            "The observed ratio is $2.4/0.8 = 3$ — threefold overdispersion.",
            "Fit negative binomial: $\\mu = 0.8$ and $\\mu + \\mu^{2}/r = 2.4$.",
            "$0.64/r = 1.6 \\Rightarrow r = 0.4$.",
          ],
          answer:
            "Poisson is inadequate. Fitting it anyway would give standard errors roughly $\\sqrt{3} \\approx 1.7$ times too small, making effects look significant when they are not.",
        },
      ],
    },
    {
      heading: "Choosing between the count models",
      blocks: [
        {
          kind: "table",
          headers: ["Situation", "Model"],
          rows: [
            ["Variance ≈ mean", "Poisson"],
            ["Variance > mean", "Negative binomial"],
            ["Variance < mean (underdispersion)", "Conway–Maxwell–Poisson, or a binomial"],
            ["Excess zeros beyond either", "Zero-inflated or hurdle model"],
          ],
        },
        {
          kind: "prose",
          text: "The negative binomial is the default first response to overdispersed counts, and it nests the Poisson — so a likelihood ratio test on the dispersion parameter is a direct test of whether the extra parameter is needed.",
        },
      ],
    },
  ],
  references: [
    { source: "Casella & Berger, Statistical Inference", locator: "§3.2.2" },
    { source: "Blitzstein & Hwang, Introduction to Probability", locator: "Ch. 4.3" },
    { source: "Cameron & Trivedi, Regression Analysis of Count Data", locator: "Ch. 3–4" },
    { source: "Mathlingo assessment bank", locator: "assessments/discrete-distributions.md" },
  ],
};
