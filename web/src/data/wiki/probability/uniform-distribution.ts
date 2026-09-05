import type { WikiArticle } from "../types";

export const uniformDistribution: WikiArticle = {
  conceptId: "uniform-distribution",
  summary:
    "The continuous uniform distribution spreads probability evenly across an interval. It is the simplest continuous distribution and the most useful one computationally: every other distribution can be simulated from it, and it is the natural model for a quantity known only to lie within known bounds.",
  sections: [
    {
      heading: "Density and moments",
      blocks: [
        {
          kind: "formula",
          latex: "f_X(x) = \\frac{1}{b-a} \\ \\text{ for } a \\le x \\le b, \\qquad F_X(x) = \\frac{x-a}{b-a}",
          caption: "Uniform$(a,b)$ density and CDF",
        },
        {
          kind: "formula",
          latex: "\\mathbb{E}[X] = \\frac{a+b}{2}, \\qquad \\operatorname{Var}(X) = \\frac{(b-a)^{2}}{12}",
          caption: "Mean at the midpoint; variance depends only on the width",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Where the 12 comes from",
          text: "It is not arbitrary. Computing $\\mathbb{E}[X^2] - (\\mathbb{E}[X])^2$ for Uniform$(0,1)$ gives $1/3 - 1/4 = 1/12$, and scaling to width $b-a$ multiplies variance by $(b-a)^2$. The practical consequence: the standard deviation is $(b-a)/\\sqrt{12} \\approx 0.289(b-a)$, noticeably smaller than a quarter of the range — uniform mass is more concentrated than intuition suggests, because there are no tails.",
        },
        {
          kind: "prose",
          text: "Because the density is constant, probability is proportional to length: $P(c \\le X \\le d) = (d-c)/(b-a)$ for any subinterval. Position within the range is irrelevant, which is the defining feature.",
        },
      ],
    },
    {
      heading: "The simulation workhorse",
      blocks: [
        {
          kind: "formula",
          latex: "U \\sim \\text{Uniform}(0,1) \\ \\Longrightarrow \\ F^{-1}(U) \\sim F",
          caption: "Inverse transform sampling",
        },
        {
          kind: "prose",
          text: "The proof is one line: $P(F^{-1}(U) \\le x) = P(U \\le F(x)) = F(x)$, using that $U$ is uniform. This is why random number generators produce uniforms and nothing else — everything downstream is a transformation.",
        },
        {
          kind: "example",
          title: "Simulating an exponential",
          problem: "Given $U \\sim \\text{Uniform}(0,1)$, produce an Exponential$(\\lambda)$ variable.",
          steps: [
            "The exponential CDF is $F(x) = 1 - e^{-\\lambda x}$.",
            "Set $u = 1 - e^{-\\lambda x}$ and solve for $x$.",
            "$e^{-\\lambda x} = 1 - u \\Rightarrow x = -\\ln(1-u)/\\lambda$.",
            "Since $1 - U$ is also Uniform$(0,1)$, the simpler $-\\ln(U)/\\lambda$ works equally well.",
          ],
          answer: "$X = -\\ln(U)/\\lambda \\sim \\text{Exponential}(\\lambda)$.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The probability integral transform",
          text: "The converse also holds: if $X$ has continuous CDF $F$, then $F(X) \\sim \\text{Uniform}(0,1)$. This is the foundation of p-values — under the null hypothesis a p-value is uniform, which is exactly why \"$p < 0.05$ occurs 5% of the time by chance\" is true. It also underlies Q–Q plots and copula methods.",
        },
      ],
    },
    {
      heading: "Discrete uniform",
      blocks: [
        {
          kind: "formula",
          latex: "P(X = k) = \\frac{1}{n} \\ \\text{ for } k = 1, \\ldots, n, \\qquad \\mathbb{E}[X] = \\frac{n+1}{2}, \\qquad \\operatorname{Var}(X) = \\frac{n^{2}-1}{12}",
          caption: "The discrete analogue — a fair die is Uniform on $\\{1,\\ldots,6\\}$",
        },
        {
          kind: "prose",
          text: "The same $12$ appears, for the same reason. Note $\\mathbb{E}[X] = 3.5$ for a die: a value the variable cannot take, which is a useful early reminder that an expectation is an average, not a prediction.",
        },
      ],
    },
    {
      heading: "When it is the wrong model",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Uniform is a strong claim, not a neutral one",
          text: "\"I know nothing, so I'll assume uniform\" sounds cautious but asserts a great deal: that every value in the range is equally likely and that values outside are impossible. Both are substantive. Worse, uniformity is not preserved under transformation — if $X$ is uniform then $X^{2}$ is not, so a claim of ignorance about $X$ becomes a definite opinion about $X^{2}$. This is the standard objection to uniform priors as \"uninformative\".",
        },
        {
          kind: "list",
          ordered: false,
          items: [
            "**Hard boundaries.** Real quantities rarely stop abruptly at an endpoint; a uniform assigns zero probability just outside and full density just inside.",
            "**Estimating the endpoints.** For Uniform$(0,\\theta)$ the MLE is $\\max(x_i)$, which is biased downward — it can never exceed $\\theta$ and is always at least slightly below it.",
            "**No mode or central tendency.** If the data cluster anywhere, uniform is the wrong shape.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Blitzstein & Hwang, Introduction to Probability", locator: "Ch. 5.3" },
    { source: "Casella & Berger, Statistical Inference", locator: "§3.3.2, Thm 2.1.10" },
    { source: "Wasserman, All of Statistics", locator: "§2.4" },
    { source: "Mathlingo assessment bank", locator: "assessments/continuous-distributions.md" },
  ],
};
