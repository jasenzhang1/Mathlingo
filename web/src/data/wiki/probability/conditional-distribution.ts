import type { WikiArticle } from "../types";

export const conditionalDistribution: WikiArticle = {
  conceptId: "conditional-distribution",
  summary:
    "A conditional distribution describes one variable once another is known. It is the joint divided by the marginal — restrict to the slice where $X = x$, then renormalise so that slice has total probability 1. Every predictive model is an attempt to estimate a conditional distribution, which makes this the central object of applied statistics.",
  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "f_{Y \\mid X}(y \\mid x) = \\frac{f_{X,Y}(x, y)}{f_X(x)}, \\qquad f_X(x) > 0",
          caption: "The conditional density of $Y$ given $X = x$",
        },
        {
          kind: "prose",
          text: "For each fixed $x$ this is a genuine probability distribution in $y$: non-negative, and integrating to 1 because the denominator is exactly $\\int f_{X,Y}(x,y)\\,dy$. The division is what performs the renormalisation.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Conditioning on a probability-zero event",
          text: "For continuous $X$, the event $\\{X = x\\}$ has probability zero, so the elementary definition $P(A \\mid B) = P(A \\cap B)/P(B)$ divides by zero and says nothing. The density ratio above is the correct construction, justified as a limit of conditioning on $\\{x < X \\le x + \\varepsilon\\}$. This is not merely technical: the Borel–Kolmogorov paradox shows that conditioning on a measure-zero event can give different answers depending on how the limit is taken, so the parameterisation matters.",
        },
      ],
    },
    {
      heading: "The factorisation",
      blocks: [
        {
          kind: "formula",
          latex: "f_{X,Y}(x,y) = f_{Y \\mid X}(y \\mid x)\\,f_X(x) = f_{X \\mid Y}(x \\mid y)\\,f_Y(y)",
          caption: "Joint = conditional × marginal, in either order",
        },
        {
          kind: "prose",
          text: "Equating the two right-hand sides and dividing gives Bayes' rule for densities. It also gives the standard way to *specify* a model: rather than writing down a joint distribution directly, describe a marginal for one variable and a conditional for the other. \"Draw $\\theta$ from the prior, then draw data given $\\theta$\" is exactly this, and so is every hierarchical model.",
        },
        {
          kind: "formula",
          latex: "X \\perp\\!\\!\\!\\perp Y \\iff f_{Y \\mid X}(y \\mid x) = f_Y(y) \\ \\text{ for all } x",
          caption: "Independence means conditioning changes nothing",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "From joint to conditional",
          problem:
            "$f_{X,Y}(x,y) = 2$ on the triangle $0 < x < y < 1$. Find $f_{Y \\mid X}(y \\mid x)$ and $\\mathbb{E}[Y \\mid X = x]$.",
          steps: [
            "Marginal: $f_X(x) = \\int_x^1 2\\,dy = 2(1 - x)$ for $0 < x < 1$.",
            "Conditional: $f_{Y \\mid X}(y \\mid x) = \\dfrac{2}{2(1-x)} = \\dfrac{1}{1-x}$ for $x < y < 1$.",
            "That is Uniform on $(x, 1)$ — constant density over the admissible range.",
            "So $\\mathbb{E}[Y \\mid X = x] = \\dfrac{x + 1}{2}$, the midpoint.",
          ],
          answer:
            "$Y \\mid X = x \\sim \\text{Uniform}(x, 1)$, with conditional mean $(1+x)/2$. Note the conditional distribution's *support* depends on $x$ — which immediately shows the variables are dependent.",
        },
      ],
    },
    {
      heading: "Conditional expectation as prediction",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbb{E}[Y \\mid X] = \\arg\\min_{g} \\ \\mathbb{E}\\big[(Y - g(X))^{2}\\big]",
          caption: "The conditional mean is the best predictor under squared error",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why regression estimates a conditional mean",
          text: "Among all functions of $X$, the one minimising expected squared prediction error is exactly $\\mathbb{E}[Y \\mid X]$. That is what regression targets — linear regression restricts the search to linear $g$, and more flexible methods widen it. Changing the loss changes the target: absolute error gives the conditional *median*, and quantile loss gives conditional quantiles, which is what quantile regression estimates.",
        },
        {
          kind: "prose",
          text: "This reframing is worth holding onto. \"Predict $Y$ from $X$\" is not a request for a number; it is a request for a conditional distribution, of which the mean is one summary. Reporting only $\\mathbb{E}[Y \\mid X]$ discards the conditional spread, which is what prediction intervals are made of — and conditional variance can change with $x$ even when the conditional mean is perfectly linear.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Conditioning is not marginalising",
          text: "$\\mathbb{E}[Y \\mid X = x]$ and $\\mathbb{E}[Y]$ answer different questions, and averaging conditional means over the wrong distribution of $X$ produces Simpson's paradox: a relationship present in every subgroup can vanish or reverse in the pooled data. The tower property, $\\mathbb{E}[Y] = \\mathbb{E}[\\mathbb{E}[Y \\mid X]]$, is the only correct way to get back from one to the other.",
        },
      ],
    },
  ],
  references: [
    { source: "Blitzstein & Hwang, Introduction to Probability", locator: "Ch. 7.1, 9.1–9.3" },
    { source: "Casella & Berger, Statistical Inference", locator: "§4.2, §4.4" },
    { source: "Wasserman, All of Statistics", locator: "§2.8, §3.5" },
    { source: "Mathlingo assessment bank", locator: "assessments/joint-and-conditional-structure.md" },
  ],
};
