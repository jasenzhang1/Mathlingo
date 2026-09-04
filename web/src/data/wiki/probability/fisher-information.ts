import type { WikiArticle } from "../types";

export const fisherInformation: WikiArticle = {
  conceptId: "fisher-information",
  summary:
    "Fisher information measures how sharply the likelihood identifies a parameter. A peaked log-likelihood means the data distinguish nearby parameter values well and estimation will be precise; a flat one means it cannot. It is the quantity that converts \"how much does this experiment tell me?\" into a number, and its reciprocal is the floor on any unbiased estimator's variance.",
  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "I(\\theta) = \\mathbb{E}\\!\\left[\\left(\\frac{\\partial}{\\partial\\theta}\\log f(X \\mid \\theta)\\right)^{2}\\right] = -\\,\\mathbb{E}\\!\\left[\\frac{\\partial^{2}}{\\partial\\theta^{2}}\\log f(X \\mid \\theta)\\right]",
          caption: "Fisher information — the variance of the score, equivalently the expected curvature",
        },
        {
          kind: "prose",
          text: "The quantity being differentiated is the *score*, $S(\\theta) = \\partial_\\theta \\log f(X \\mid \\theta)$. Under regularity conditions the score has mean zero, so its variance is the first expression above. The second form — negative expected second derivative — is usually far easier to compute and is the one used in practice.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why curvature is information",
          text: "The MLE sits at the peak of the log-likelihood. If that peak is sharp, a small change in $\\theta$ makes the observed data much less probable, so the data pin down $\\theta$ tightly. If it is nearly flat, many parameter values explain the data almost equally well and the estimate is unstable. Curvature at the maximum is precisely the mathematical statement of \"sharpness\", which is why the second derivative appears.",
        },
      ],
    },
    {
      heading: "Additivity",
      blocks: [
        {
          kind: "formula",
          latex: "I_n(\\theta) = n\\,I_1(\\theta) \\qquad \\text{for } n \\text{ i.i.d. observations}",
          caption: "Information adds across independent observations",
        },
        {
          kind: "prose",
          text: "This is the formal version of \"more data is more information\", and it is where the $\\sqrt{n}$ rate comes from: variance scales like $1/I_n = 1/(nI_1)$, so standard errors shrink like $1/\\sqrt{n}$. It also shows immediately why dependent observations are worth less — the additivity requires independence, and correlated data contribute overlapping information.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Information in a Bernoulli trial",
          problem: "Compute $I(p)$ for a single Bernoulli$(p)$ observation, and interpret it.",
          steps: [
            "$\\log f(x \\mid p) = x\\log p + (1-x)\\log(1-p)$.",
            "Score: $\\partial_p \\log f = \\dfrac{x}{p} - \\dfrac{1-x}{1-p}$.",
            "Second derivative: $-\\dfrac{x}{p^{2}} - \\dfrac{1-x}{(1-p)^{2}}$.",
            "Take $-\\mathbb{E}[\\cdot]$ using $\\mathbb{E}[X] = p$: $I(p) = \\dfrac{p}{p^{2}} + \\dfrac{1-p}{(1-p)^{2}} = \\dfrac{1}{p} + \\dfrac{1}{1-p}$.",
            "Simplify: $I(p) = \\dfrac{1}{p(1-p)}$.",
          ],
          answer:
            "$I(p) = 1/[p(1-p)]$ — minimised at $p = 1/2$ where it equals 4, and diverging as $p \\to 0$ or $1$.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Rare events are individually informative",
          text: "The information is *largest* near $p = 0$ or $p = 1$, which seems backwards until you consider what a single observation tells you. If $p$ is near 0.001, observing a success is enormously surprising and shifts your estimate a great deal. If $p$ is near 0.5, each flip barely distinguishes 0.50 from 0.51. The catch: near $p = 0$ you almost never see a success, so most observations are uninformative in practice — which is why estimating rare-event probabilities still needs large samples.",
        },
      ],
    },
    {
      heading: "What it is used for",
      blocks: [
        {
          kind: "table",
          headers: ["Result", "Statement"],
          rows: [
            [
              "Cramér–Rao bound",
              "$\\operatorname{Var}(\\hat{\\theta}) \\ge 1/I_n(\\theta)$ for any unbiased $\\hat{\\theta}$",
            ],
            [
              "MLE asymptotics",
              "$\\sqrt{n}(\\hat{\\theta}_{\\text{MLE}} - \\theta) \\to \\mathcal{N}\\big(0,\\ I_1(\\theta)^{-1}\\big)$",
            ],
            [
              "Standard errors",
              "$\\widehat{\\operatorname{SE}} = 1/\\sqrt{I_n(\\hat{\\theta})}$ — where reported standard errors come from",
            ],
            [
              "Jeffreys prior",
              "$p(\\theta) \\propto \\sqrt{I(\\theta)}$ — the prior invariant under reparameterisation",
            ],
          ],
        },
        {
          kind: "prose",
          text: "In practice software rarely computes $I(\\theta)$ analytically. It uses the *observed* information — the negative Hessian of the log-likelihood at $\\hat{\\theta}$, without taking an expectation. The two agree asymptotically, and there is a reasonable argument that the observed version is the better one to condition on, since it reflects the data you actually have rather than an average over data you might have seen.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Regularity conditions are not decoration",
          text: "The whole theory assumes the support of the distribution does not depend on $\\theta$, and that differentiation under the integral sign is valid. Uniform$(0,\\theta)$ violates the first, and the Cramér–Rao bound genuinely fails there — the MLE $\\max X_i$ has variance shrinking like $1/n^{2}$, far below what the bound would suggest. When a result seems to beat the bound, check the support first.",
        },
      ],
    },
  ],
  references: [
    { source: "Casella & Berger, Statistical Inference", locator: "§7.3.2, §10.1.2" },
    { source: "Wasserman, All of Statistics", locator: "§9.7–9.9" },
    { source: "Lehmann & Casella, Theory of Point Estimation", locator: "Ch. 2.6" },
    { source: "Mathlingo assessment bank", locator: "assessments/estimation-theory.md" },
  ],
};
