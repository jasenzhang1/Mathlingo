import type { WikiArticle } from "../types";

export const secantMethodWiki: WikiArticle = {
  conceptId: "secant-method",

  summary:
    "The secant method is Newton–Raphson without the derivative. It replaces $f'(x_n)$ with the slope of the line " +
    "through the last two iterates, so each step needs only one new function value. Convergence is superlinear, " +
    "with order $\\varphi = \\frac{1 + \\sqrt{5}}{2} \\approx 1.618$ — slower per step than Newton, but often faster " +
    "per unit of work when derivatives are expensive. Its idea, approximating curvature from successive gradients, " +
    "is the seed of quasi-Newton methods.",

  sections: [
    {
      heading: "The iteration",
      blocks: [
        {
          kind: "formula",
          latex: "x_{n+1} = x_n - f(x_n)\\,\\frac{x_n - x_{n-1}}{f(x_n) - f(x_{n-1})}",
          caption: "The zero of the secant line through $(x_{n-1}, f(x_{n-1}))$ and $(x_n, f(x_n))$",
        },
        {
          kind: "example",
          title: "$\\sqrt{2}$ again",
          problem: "Apply the secant method to $f(x) = x^{2} - 2$ with $x_0 = 1$ and $x_1 = 2$.",
          steps: [
            "$f(1) = -1$ and $f(2) = 2$, so the slope is $3$ and $x_2 = 2 - \\frac{2}{3} = 1.3333$.",
            "$f(1.3333) = -0.2222$. The slope through $x_1, x_2$ is $\\frac{2 - (-0.2222)}{2 - 1.3333} = 3.3333$, so $x_3 = 1.3333 + \\frac{0.2222}{3.3333} = 1.4$.",
            "$f(1.4) = -0.04$; the slope through $x_2, x_3$ is $2.7333$, so $x_4 = 1.4 + \\frac{0.04}{2.7333} = 1.41463$.",
          ],
          answer: "Errors fall $0.081, 0.014, 0.0004$ — faster than linear, though not quite squaring each time.",
        },
      ],
    },

    {
      heading: "Order of convergence",
      blocks: [
        {
          kind: "formula",
          latex: "e_{n+1} \\approx \\frac{f''(x^{*})}{2f'(x^{*})}\\, e_n\\, e_{n-1} \\quad\\Longrightarrow\\quad e_{n+1} \\approx C\\, e_n^{\\varphi}",
          caption: "The order $p$ satisfies $p^{2} = p + 1$, so $p = \\varphi \\approx 1.618$",
        },
        {
          kind: "prose",
          text:
            "Newton has order $2$ but needs $f$ and $f'$ each step. If evaluating $f'$ costs about as much as $f$, two " +
            "secant steps cost the same as one Newton step and achieve order $\\varphi^{2} \\approx 2.618 > 2$. That is why " +
            "derivative-free root finding is usually secant-based.",
        },
        {
          kind: "table",
          headers: ["Method", "Order", "Evaluations per step", "Needs a bracket?"],
          rows: [
            ["Bisection", "$1$ (rate $\\frac{1}{2}$)", "$f$ once", "Yes"],
            ["Secant", "$\\approx 1.618$", "$f$ once", "No"],
            ["Newton–Raphson", "$2$", "$f$ and $f'$", "No"],
            ["Regula falsi", "$1$ (often slow)", "$f$ once", "Yes"],
          ],
        },
      ],
    },

    {
      heading: "Variants and pitfalls",
      blocks: [
        {
          kind: "prose",
          text:
            "**Regula falsi** (false position) keeps a bracket by always using two points with opposite signs. It can't " +
            "fail, but one endpoint often gets stuck, giving slow linear convergence; the Illinois modification fixes " +
            "this. **Brent's method** combines secant and inverse quadratic interpolation steps with bisection, and is the " +
            "default 1-D root finder in most libraries.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Cancellation near convergence",
          text:
            "As $x_n$ and $x_{n-1}$ approach the root, $f(x_n) - f(x_{n-1})$ is a difference of two tiny numbers, so " +
            "round-off can dominate the slope. Practical codes stop once successive iterates agree to tolerance, and " +
            "guard against a zero denominator.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The secant condition",
          text:
            "The secant slope $b_n$ satisfies $b_n(x_n - x_{n-1}) = f(x_n) - f(x_{n-1})$. In several dimensions the " +
            "analogous requirement $B_{k+1}\\mathbf{s}_k = \\mathbf{y}_k$ — with $\\mathbf{s}_k$ the step and $\\mathbf{y}_k$ the change " +
            "in gradient — is exactly what quasi-Newton methods such as BFGS impose on their Hessian approximations.",
        },
      ],
    },
  ],

  references: [
    { source: "Burden & Faires, Numerical Analysis", locator: "§2.3, Newton's Method and Its Extensions (the secant method and false position)" },
    { source: "Nocedal & Wright, Numerical Optimization", locator: "Ch. 6, Quasi-Newton Methods (§6.1, the secant equation)" },
  ],
};
