import type { WikiArticle } from "../types";

export const linearQuadraticRegulatorWiki: WikiArticle = {
  conceptId: "linear-quadratic-regulator",

  summary:
    "Most dynamic programs can only be solved numerically, on a grid. The linear-quadratic regulator is the great " +
    "exception: with linear dynamics and quadratic costs, Bellman's recursion keeps the value function quadratic, the " +
    "optimal control comes out linear in the state, and a single matrix recursion — the Riccati equation — gives " +
    "everything. The same Riccati equation, run forward instead of backward, is the Kalman filter. In finance it is the " +
    "engine behind optimal trading with market impact.",

  sections: [
    {
      heading: "The problem and its solution",
      blocks: [
        {
          kind: "formula",
          latex: "\\min_{\\mathbf{u}_0, \\dots, \\mathbf{u}_{T-1}} \\sum_{t=0}^{T-1}\\left(\\mathbf{x}_t^{\\top}\\mathbf{Q}\\mathbf{x}_t + \\mathbf{u}_t^{\\top}\\mathbf{R}\\mathbf{u}_t\\right) + \\mathbf{x}_T^{\\top}\\mathbf{P}_T\\mathbf{x}_T \\quad \\text{s.t.} \\quad \\mathbf{x}_{t+1} = \\mathbf{A}\\mathbf{x}_t + \\mathbf{B}\\mathbf{u}_t",
          caption: "$\\mathbf{Q} \\succeq 0$ penalizes the state, $\\mathbf{R} \\succ 0$ the control",
        },
        {
          kind: "prose",
          text:
            "Guess $V_{t+1}(\\mathbf{x}) = \\mathbf{x}^{\\top}\\mathbf{P}_{t+1}\\mathbf{x}$. The Bellman step minimizes " +
            "$\\mathbf{x}^{\\top}\\mathbf{Q}\\mathbf{x} + \\mathbf{u}^{\\top}\\mathbf{R}\\mathbf{u} + (\\mathbf{A}\\mathbf{x} + \\mathbf{B}\\mathbf{u})^{\\top}\\mathbf{P}_{t+1}(\\mathbf{A}\\mathbf{x} + \\mathbf{B}\\mathbf{u})$ " +
            "— a quadratic in $\\mathbf{u}$ — so the minimizer is linear in $\\mathbf{x}$, and plugging it back gives a " +
            "quadratic $V_t$. By induction from the terminal cost:",
        },
        {
          kind: "formula",
          latex: "\\mathbf{K}_t = (\\mathbf{R} + \\mathbf{B}^{\\top}\\mathbf{P}_{t+1}\\mathbf{B})^{-1}\\mathbf{B}^{\\top}\\mathbf{P}_{t+1}\\mathbf{A}, \\qquad \\mathbf{u}_t = -\\mathbf{K}_t\\mathbf{x}_t, \\qquad \\mathbf{P}_t = \\mathbf{Q} + \\mathbf{A}^{\\top}\\mathbf{P}_{t+1}\\mathbf{A} - \\mathbf{A}^{\\top}\\mathbf{P}_{t+1}\\mathbf{B}(\\mathbf{R} + \\mathbf{B}^{\\top}\\mathbf{P}_{t+1}\\mathbf{B})^{-1}\\mathbf{B}^{\\top}\\mathbf{P}_{t+1}\\mathbf{A}",
          caption: "The backward Riccati recursion; with time-invariant matrices and an infinite horizon, $\\mathbf{P}_t$ converges to a solution of the algebraic Riccati equation and the gain is constant",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Certainty equivalence",
          text:
            "Add zero-mean noise to the dynamics and the optimal policy is unchanged; only the cost rises (by $\\text{tr}(\\mathbf{P}\\mathbf{W})$ " +
            "per period for noise covariance $\\mathbf{W}$). Solve the deterministic problem and apply its feedback to the noisy system.",
        },
      ],
    },
    {
      heading: "The scalar case",
      blocks: [
        {
          kind: "prose",
          text:
            "Take $x_{t+1} = x_t + u_t$ with stage cost $qx^{2} + ru^{2}$. Each period the controller closes the fraction " +
            "$K = \\frac{P}{r + P}$ of the state, and the steady $P$ solves $P = q + P - \\frac{P^{2}}{r + P}$, i.e. " +
            "$P^{2} - qP - qr = 0$.",
        },
        {
          kind: "example",
          title: "Computing the steady gain",
          problem: "$q = 1$, $r = 4$.",
          steps: [
            "$P = \\frac{1 + \\sqrt{1 + 16}}{2} \\approx 2.562$.",
            "$K = \\frac{2.562}{6.562} \\approx 0.390$; the state shrinks by a factor $0.61$ each period.",
          ],
          answer: "This is exactly the Kalman gain of a random walk observed in noise with variance ratio $\\frac{r}{q} = 4$ — the duality made concrete.",
        },
        {
          kind: "table",
          headers: ["Regime", "Steady gain $K$"],
          rows: [
            ["Cheap control ($r \\ll q$)", "$\\to 1$: correct the state immediately"],
            ["Expensive control ($r \\gg q$)", "$\\approx \\sqrt{\\frac{q}{r}}$"],
            ["Myopic one-step controller", "$\\approx \\frac{q}{r}$ — far too timid when control is expensive"],
            ["Self-correcting system ($|a| < 1$)", "Smaller than for $a = 1$"],
            ["Discounting ($\\beta < 1$)", "Smaller: future savings count less"],
          ],
        },
      ],
    },
    {
      heading: "Duality and uses",
      blocks: [
        {
          kind: "prose",
          text:
            "Swap $\\mathbf{A} \\leftrightarrow \\mathbf{A}^{\\top}$, $\\mathbf{B} \\leftrightarrow \\mathbf{C}^{\\top}$ (the " +
            "observation matrix), and treat $\\mathbf{Q}$, $\\mathbf{R}$ as process and measurement noise covariances: the LQR " +
            "Riccati recursion becomes the Kalman filter's covariance recursion, run forward from a prior instead of backward " +
            "from a terminal cost. Paleologo presents both together for this reason.",
        },
        {
          kind: "list",
          items: [
            "**Tracking**: to follow a moving target, apply LQR to the deviation from it, plus a feedforward term for the target's motion.",
            "**Optimal trading**: state = holdings (and alpha), control = trades, $q$ = risk aversion times variance, $r$ = quadratic impact. The gain is the fraction of the gap to the aim portfolio traded each period — the $\\sqrt{q/r}$ speed of multiperiod portfolio optimization.",
            "**Constraints** break the closed form; model-predictive control re-solves a constrained finite-horizon problem each period instead.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Bertsekas, Dynamic Programming and Optimal Control, Vol. I", locator: "Ch. 4.1, Linear Systems and Quadratic Cost" },
    { source: "Anderson and Moore, Optimal Control: Linear Quadratic Methods", locator: "Ch. 2–3, the regulator problem and Riccati equation" },
    { source: "Paleologo, The Elements of Quantitative Investing", locator: "Ch. 14, §14.3–14.4 (the LQR and its discounted version)" },
  ],
};
