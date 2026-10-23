import type { WikiArticle } from "../types";

export const taylorSeriesWiki: WikiArticle = {
  conceptId: "taylor-series",

  summary:
    "The tangent line matches a function's value and slope at a point. The Taylor polynomial of degree $n$ matches its " +
    "first $n$ derivatives too, giving ever-better local approximations; letting $n \\to \\infty$ gives the Taylor " +
    "series. For $e^{x}$, $\\sin x$, $\\cos x$ and many others the series converges to the function, and Taylor's " +
    "theorem says how large the error of any finite truncation can be.",

  sections: [
    {
      heading: "Taylor polynomials and series",
      blocks: [
        {
          kind: "formula",
          latex: "T_n(x) = \\sum_{k=0}^{n} \\frac{f^{(k)}(a)}{k!}(x - a)^{k} = f(a) + f'(a)(x - a) + \\frac{f''(a)}{2}(x - a)^{2} + \\cdots",
          caption: "The degree-$n$ Taylor polynomial at $a$ (a Maclaurin polynomial when $a = 0$)",
        },
        {
          kind: "prose",
          text:
            "The coefficient $\\frac{f^{(k)}(a)}{k!}$ is forced: differentiating $(x - a)^{k}$ exactly $k$ times leaves $k!$, " +
            "so this is the only coefficient that makes $T_n^{(k)}(a) = f^{(k)}(a)$. In particular, if $f$ equals a power " +
            "series near $a$, that series must be its Taylor series.",
        },
        {
          kind: "table",
          headers: ["Function", "Maclaurin series", "Valid for"],
          rows: [
            ["$e^{x}$", "$\\sum \\frac{x^{n}}{n!} = 1 + x + \\frac{x^{2}}{2!} + \\frac{x^{3}}{3!} + \\cdots$", "all $x$"],
            ["$\\sin x$", "$x - \\frac{x^{3}}{3!} + \\frac{x^{5}}{5!} - \\cdots$", "all $x$"],
            ["$\\cos x$", "$1 - \\frac{x^{2}}{2!} + \\frac{x^{4}}{4!} - \\cdots$", "all $x$"],
            ["$\\ln(1 + x)$", "$x - \\frac{x^{2}}{2} + \\frac{x^{3}}{3} - \\cdots$", "$-1 < x \\le 1$"],
            ["$\\arctan x$", "$x - \\frac{x^{3}}{3} + \\frac{x^{5}}{5} - \\cdots$", "$-1 \\le x \\le 1$"],
            ["$(1 + x)^{k}$", "$\\sum \\binom{k}{n}x^{n} = 1 + kx + \\frac{k(k - 1)}{2}x^{2} + \\cdots$", "$|x| < 1$"],
          ],
        },
      ],
    },
    {
      heading: "Taylor's theorem: the size of the error",
      blocks: [
        {
          kind: "formula",
          latex: "f(x) = T_n(x) + R_n(x), \\qquad R_n(x) = \\frac{f^{(n + 1)}(c)}{(n + 1)!}(x - a)^{n + 1}",
          caption: "Lagrange form of the remainder, for some $c$ between $a$ and $x$",
        },
        {
          kind: "example",
          title: "How many terms for $e$?",
          problem: "Bound the error in approximating $e$ by $T_4(1) = 1 + 1 + \\frac{1}{2} + \\frac{1}{6} + \\frac{1}{24}$.",
          steps: [
            "$T_4(1) = \\frac{65}{24} \\approx 2.70833$.",
            "$R_4(1) = \\frac{e^{c}}{5!}$ with $0 < c < 1$, and $e^{c} < 3$.",
          ],
          answer: "Error $< \\frac{3}{120} = 0.025$; the actual error is $e - 2.70833 \\approx 0.00995$.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Smooth isn't enough",
          text:
            "$f(x) = e^{-1/x^{2}}$ (with $f(0) = 0$) has every derivative equal to $0$ at $x = 0$, so its Maclaurin series is " +
            "identically $0$ — yet $f(x) > 0$ for $x \\ne 0$. A Taylor series can converge to the wrong function; the " +
            "remainder must be shown to vanish.",
        },
      ],
    },
    {
      heading: "Using Taylor series",
      blocks: [
        {
          kind: "example",
          title: "A limit",
          problem: "Find $\\lim_{x \\to 0} \\frac{\\sin x - x}{x^{3}}$.",
          steps: [
            "$\\sin x - x = -\\frac{x^{3}}{6} + \\frac{x^{5}}{120} - \\cdots$.",
            "Divide by $x^{3}$: $-\\frac{1}{6} + \\frac{x^{2}}{120} - \\cdots \\to -\\frac{1}{6}$.",
          ],
          answer: "$-\\frac{1}{6}$ — faster than three rounds of L'Hôpital.",
        },
        {
          kind: "example",
          title: "An integral with no elementary antiderivative",
          problem: "Estimate $\\int_0^{1} e^{-x^{2}}\\,dx$.",
          steps: [
            "$e^{-x^{2}} = 1 - x^{2} + \\frac{x^{4}}{2} - \\frac{x^{6}}{6} + \\cdots$.",
            "Integrate term by term: $1 - \\frac{1}{3} + \\frac{1}{10} - \\frac{1}{42} + \\frac{1}{216} - \\cdots$.",
          ],
          answer: "$\\approx 0.7475$ after five terms; the alternating-series bound puts the error below $\\frac{1}{1320}$.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Euler's formula",
          text:
            "Substituting $ix$ into the series for $e^{x}$ and separating real and imaginary parts gives " +
            "$e^{ix} = \\cos x + i\\sin x$. At $x = \\pi$: $e^{i\\pi} + 1 = 0$.",
        },
        {
          kind: "prose",
          text:
            "In several variables the second-order Taylor expansion $f(\\mathbf{x} + \\mathbf{h}) \\approx f(\\mathbf{x}) + \\nabla f^{\\top}\\mathbf{h} + \\frac{1}{2}\\mathbf{h}^{\\top}\\mathbf{H}\\mathbf{h}$ " +
            "is the basis of Newton's method and of the second derivative test.",
        },
      ],
    },
  ],

  references: [
    { source: "Stewart, Calculus: Early Transcendentals, 8th ed.", locator: "§11.10 Taylor and Maclaurin Series; §11.11 Applications of Taylor Polynomials" },
    { source: "Spivak, Calculus", locator: "Ch. 20, Approximation by Polynomial Functions" },
  ],
};
