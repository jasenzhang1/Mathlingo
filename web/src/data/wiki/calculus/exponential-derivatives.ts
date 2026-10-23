import type { WikiArticle } from "../types";

export const exponentialDerivativesWiki: WikiArticle = {
  conceptId: "exponential-derivatives",

  summary:
    "Every exponential $a^{x}$ has a derivative proportional to itself: $\\frac{d}{dx}a^{x} = (\\ln a)\\,a^{x}$. The number " +
    "$e$ is the one base for which the constant is exactly $1$, so $e^{x}$ is its own derivative. That single fact is " +
    "why exponentials model anything that grows or decays at a rate proportional to its size.",

  sections: [
    {
      heading: "Why $e^{x}$ is its own derivative",
      blocks: [
        {
          kind: "formula",
          latex: "\\frac{a^{x + h} - a^{x}}{h} = a^{x} \\cdot \\frac{a^{h} - 1}{h}",
          caption: "The difference quotient of an exponential factors",
        },
        {
          kind: "prose",
          text:
            "So $\\frac{d}{dx}a^{x} = a^{x} \\cdot \\lim_{h \\to 0}\\frac{a^{h} - 1}{h}$: the derivative is $a^{x}$ times its own " +
            "slope at $0$. For $a = 2$ that slope is about $0.693$, for $a = 3$ about $1.099$. The number $e \\approx 2.718$ " +
            "is defined as the base whose slope at $0$ is exactly $1$.",
        },
        {
          kind: "table",
          headers: ["$f(x)$", "$f'(x)$"],
          rows: [
            ["$e^{x}$", "$e^{x}$"],
            ["$e^{kx}$", "$ke^{kx}$"],
            ["$a^{x}$", "$a^{x}\\ln a$"],
            ["$e^{g(x)}$", "$e^{g(x)}g'(x)$"],
          ],
          caption: "The last row is the chain rule; $a^{x} = e^{x\\ln a}$ explains the third",
        },
      ],
    },
    {
      heading: "Worked examples",
      blocks: [
        {
          kind: "example",
          title: "A Gaussian",
          problem: "Differentiate $y = e^{-x^{2}}$ and find where its slope is $0$.",
          steps: [
            "Chain rule with inner $-x^{2}$: $y' = e^{-x^{2}} \\cdot (-2x)$.",
            "$e^{-x^{2}} > 0$ always, so $y' = 0$ only when $x = 0$.",
          ],
          answer: "$y' = -2xe^{-x^{2}}$, flat only at the peak $x = 0$.",
        },
        {
          kind: "example",
          title: "Product with an exponential",
          problem: "Differentiate $y = x^{2}e^{3x}$.",
          steps: [
            "Product rule: $2x \\cdot e^{3x} + x^{2} \\cdot 3e^{3x}$.",
          ],
          answer: "$y' = xe^{3x}(2 + 3x)$.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Exponential rule, not power rule",
          text:
            "$\\frac{d}{dx}3^{x} = 3^{x}\\ln 3$, not $x \\cdot 3^{x - 1}$. The power rule is for a variable base with a fixed " +
            "exponent; here the exponent varies.",
        },
      ],
    },
    {
      heading: "Growth proportional to size",
      blocks: [
        {
          kind: "formula",
          latex: "y' = ky \\iff y = Ce^{kt}",
          caption: "The only differentiable solutions of $y' = ky$",
        },
        {
          kind: "prose",
          text:
            "If $y' = ky$, then $\\frac{d}{dt}\\left(ye^{-kt}\\right) = y'e^{-kt} - kye^{-kt} = 0$, so $ye^{-kt}$ is constant. " +
            "With $k > 0$ this is exponential growth (populations, compound interest); with $k < 0$, decay (radioactivity, " +
            "cooling). The doubling time of $e^{kt}$ is $\\frac{\\ln 2}{k}$.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Exponentials win",
          text:
            "Because $e^{x}$ keeps reproducing itself under differentiation, it eventually outgrows every polynomial: " +
            "$\\frac{x^{n}}{e^{x}} \\to 0$ for every $n$, which L'Hôpital's rule makes precise.",
        },
      ],
    },
  ],

  references: [
    { source: "Stewart, Calculus: Early Transcendentals, 8th ed.", locator: "§3.1 (exponential functions); §3.8 Exponential Growth and Decay" },
    { source: "OpenStax, Calculus Volume 1", locator: "§3.9 Derivatives of Exponential and Logarithmic Functions" },
  ],
};
