import type { WikiArticle } from "../types";

export const mgfProperties: WikiArticle = {
  conceptId: "mgf-properties",
  summary:
    "The moment generating function's usefulness rests on four properties: it generates moments by differentiation, it transforms simply under linear maps, it multiplies over independent sums, and it determines the distribution uniquely. Together these turn distributional questions into algebra.",
  sections: [
    {
      heading: "The four properties",
      blocks: [
        {
          kind: "table",
          headers: ["Property", "Statement", "Requires"],
          rows: [
            [
              "Moments",
              "$\\mathbb{E}[X^{n}] = M_X^{(n)}(0)$",
              "$M_X$ finite near 0",
            ],
            [
              "Linear map",
              "$M_{aX+b}(t) = e^{bt}M_X(at)$",
              "nothing",
            ],
            [
              "Independent sum",
              "$M_{X+Y}(t) = M_X(t)M_Y(t)$",
              "**independence**",
            ],
            [
              "Uniqueness",
              "$M_X = M_Y$ near 0 $\\Rightarrow$ $X \\overset{d}{=} Y$",
              "both finite in an open interval about 0",
            ],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Uniqueness is what makes the others useful",
          text: "Without it, multiplying two MGFs would tell you a function and nothing about the distribution. With it, recognising the product as a known MGF *proves* the sum has that distribution. This is the step that converts convolution — a genuinely hard integral — into pattern matching.",
        },
      ],
    },
    {
      heading: "The linear-map property",
      blocks: [
        {
          kind: "formula",
          latex: "M_{aX+b}(t) = \\mathbb{E}\\big[e^{t(aX+b)}\\big] = e^{bt}\\,\\mathbb{E}\\big[e^{(at)X}\\big] = e^{bt}M_X(at)",
          caption: "Shifts multiply by an exponential; scales rescale the argument",
        },
        {
          kind: "example",
          title: "Standardisation, verified",
          problem: "Show that $Z = (X - \\mu)/\\sigma$ is standard normal when $X \\sim \\mathcal{N}(\\mu, \\sigma^{2})$.",
          steps: [
            "$M_X(t) = \\exp\\{\\mu t + \\sigma^{2}t^{2}/2\\}$.",
            "Here $a = 1/\\sigma$ and $b = -\\mu/\\sigma$.",
            "$M_Z(t) = e^{-\\mu t/\\sigma}M_X(t/\\sigma) = e^{-\\mu t/\\sigma}\\exp\\{\\mu t/\\sigma + \\sigma^{2}t^{2}/(2\\sigma^{2})\\}$.",
            "The $\\mu$ terms cancel: $M_Z(t) = e^{t^{2}/2}$.",
          ],
          answer:
            "That is the standard normal MGF, so $Z \\sim \\mathcal{N}(0,1)$ by uniqueness.",
        },
      ],
    },
    {
      heading: "Cumulants",
      blocks: [
        {
          kind: "formula",
          latex: "K_X(t) = \\log M_X(t), \\qquad K'(0) = \\mathbb{E}[X], \\qquad K''(0) = \\operatorname{Var}(X)",
          caption: "The cumulant generating function",
        },
        {
          kind: "prose",
          text: "Taking logs turns the product rule into a sum rule: $K_{X+Y} = K_X + K_Y$ for independent variables. So cumulants are additive, which is why variance adds and why the third and fourth cumulants — skewness and kurtosis — are the natural measures of departure from normality. The normal's cumulants beyond the second are all zero, which is the sharpest characterisation of it.",
        },
      ],
    },
    {
      heading: "Limits of the method",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Existence is a real restriction",
          text: "The MGF must be finite in an open interval around 0. The log-normal and Cauchy fail this — $\\mathbb{E}[e^{tX}]$ diverges for every $t > 0$ — so none of the theory applies to them. Worse, the log-normal has finite moments of all orders and is still not determined by them: other distributions share every moment. Uniqueness is a property of the MGF, not of the moment sequence.",
        },
        {
          kind: "prose",
          text: "The characteristic function $\\varphi_X(t) = \\mathbb{E}[e^{itX}]$ repairs this: $|e^{itX}| = 1$, so it always exists and always determines the distribution. It has the same four properties and is what rigorous proofs of the CLT actually use; the MGF is preferred in teaching only because it avoids complex analysis.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "How the CLT falls out",
          text: "Standardise the sum, expand its MGF as $1 + t^{2}/(2n) + o(1/n)$ using the first two moments, raise to the $n$th power by independence, and let $n \\to \\infty$. The limit is $e^{t^{2}/2}$ — the standard normal MGF. Uniqueness (strictly, Lévy's continuity theorem for characteristic functions) then delivers convergence in distribution. Three of the four properties are used in one argument.",
        },
      ],
    },
  ],
  references: [
    { source: "Casella & Berger, Statistical Inference", locator: "§2.3, Thm 2.3.11–2.3.15" },
    { source: "Blitzstein & Hwang, Introduction to Probability", locator: "Ch. 6.4–6.5, 10.3" },
    { source: "Billingsley, Probability and Measure", locator: "§26, §30" },
    { source: "Mathlingo assessment bank", locator: "assessments/mgf-likelihood-and-estimation.md" },
  ],
};
