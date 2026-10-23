import type { WikiArticle } from "../types";

export const newtonRaphsonMethodWiki: WikiArticle = {
  conceptId: "newton-raphson-method",

  summary:
    "Newton–Raphson solves $f(x) = 0$ by replacing $f$ with its tangent line at the current guess and jumping to the " +
    "tangent's zero. Near a simple root this converges quadratically — the number of correct digits roughly doubles " +
    "each step — which makes it the fastest common root finder. The price is that it needs the derivative and a " +
    "starting point close enough to the root.",

  sections: [
    {
      heading: "The iteration",
      blocks: [
        {
          kind: "formula",
          latex: "x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}",
          caption: "Solve the linearisation $f(x_n) + f'(x_n)(x - x_n) = 0$ for $x$",
        },
        {
          kind: "example",
          title: "$\\sqrt{2}$ in three steps",
          problem: "Apply Newton–Raphson to $f(x) = x^{2} - 2$ from $x_0 = 1$.",
          steps: [
            "The update is $x_{n+1} = x_n - \\frac{x_n^{2} - 2}{2x_n} = \\frac{1}{2}\\left(x_n + \\frac{2}{x_n}\\right)$.",
            "$x_1 = \\frac{1}{2}(1 + 2) = 1.5$.",
            "$x_2 = \\frac{1}{2}(1.5 + 1.3333) = 1.416667$.",
            "$x_3 = \\frac{1}{2}(1.416667 + 1.411765) = 1.414216$.",
          ],
          answer: "Errors are about $0.086$, $0.0025$ and $0.0000021$: each roughly the square of the one before, scaled by a constant.",
        },
        {
          kind: "prose",
          text:
            "For a system $\\mathbf{F}(\\mathbf{x}) = \\mathbf{0}$ of $n$ equations in $n$ unknowns, the same idea uses the " +
            "Jacobian: solve $J(\\mathbf{x}_n)\\mathbf{s} = -\\mathbf{F}(\\mathbf{x}_n)$ and set $\\mathbf{x}_{n+1} = \\mathbf{x}_n + \\mathbf{s}$. " +
            "Each step costs a linear solve.",
        },
      ],
    },

    {
      heading: "Why it converges quadratically",
      blocks: [
        {
          kind: "formula",
          latex: "e_{n+1} \\approx \\frac{f''(x^{*})}{2f'(x^{*})}\\, e_n^{2}",
          caption: "Error recursion near a simple root ($f'(x^{*}) \\ne 0$), where $e_n = x_n - x^{*}$",
        },
        {
          kind: "prose",
          text:
            "Expanding $f$ around $x_n$ to second order and subtracting the Newton update leaves only the curvature " +
            "term, which is quadratic in the error. The constant $\\frac{f''}{2f'}$ also shows when Newton struggles: a " +
            "nearly flat derivative at the root makes the constant large.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Multiple roots slow it down",
          text:
            "At a root of multiplicity $m > 1$, $f'(x^{*}) = 0$ and convergence drops to linear with rate $1 - \\frac{1}{m}$. " +
            "For $f(x) = (x - 1)^{2}$, every step only halves the error. The fix, if $m$ is known, is the modified update " +
            "$x_{n+1} = x_n - m\\frac{f(x_n)}{f'(x_n)}$.",
        },
      ],
    },

    {
      heading: "How it fails",
      blocks: [
        {
          kind: "table",
          headers: ["Failure", "Example"],
          rows: [
            ["Zero derivative", "$f'(x_n) = 0$ sends the tangent off to infinity, e.g. starting $x^{2} - 2$ at $x_0 = 0$"],
            ["Cycling", "$f(x) = x^{3} - 2x + 2$ from $x_0 = 0$ alternates $0, 1, 0, 1, \\ldots$ forever"],
            ["Divergence", "$f(x) = x^{1/3}$: every step doubles the distance from the root, since $x_{n+1} = -2x_n$"],
            ["Converging to an unwanted root", "Basins of attraction can be intricate (fractal in the complex plane)"],
          ],
        },
        {
          kind: "prose",
          text:
            "Newton–Raphson is **locally** convergent: it is guaranteed only from a close enough start. Global " +
            "strategies keep its speed while adding safety — combine it with bisection when a bracket is known, or " +
            "damp the step ($x_{n+1} = x_n - \\alpha\\frac{f(x_n)}{f'(x_n)}$, $\\alpha \\le 1$) so that $|f|$ decreases.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "From roots to minima",
          text:
            "A minimiser of a smooth $f$ is a root of $f'$. Applying Newton–Raphson to $f'$ gives Newton's method for " +
            "optimisation, $x_{n+1} = x_n - \\frac{f'(x_n)}{f''(x_n)}$ — the subject of a later lesson.",
        },
      ],
    },
  ],

  references: [
    { source: "Burden & Faires, Numerical Analysis", locator: "§2.3, Newton's Method and Its Extensions; §2.4, Error Analysis for Iterative Methods" },
    { source: "Nocedal & Wright, Numerical Optimization", locator: "Ch. 11, Nonlinear Equations (§11.1, Newton's method)" },
  ],
};
