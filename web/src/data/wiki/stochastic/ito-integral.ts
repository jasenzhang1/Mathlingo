import type { WikiArticle } from "../types";

export const itoIntegralWiki: WikiArticle = {
  conceptId: "ito-integral",
  summary:
    "The Itô integral $\\int_0^t \\Delta_s\\, dW_s$ makes sense of integrating an adapted process against " +
    "Brownian motion — something Riemann-Stieltjes theory cannot do, since $W_t$ has infinite total " +
    "variation. It is built as a limit of left-endpoint Riemann sums, and that specific choice of " +
    "evaluation point is not a technicality: it is exactly what makes the result a martingale. The Itô " +
    "isometry then turns variance computations on these integrals into ordinary time integrals.",

  sections: [
    {
      heading: "Definition: left-endpoint Riemann sums",
      blocks: [
        {
          kind: "formula",
          latex:
            "\\int_0^t \\Delta_s\\, dW_s = \\lim_{\\|\\Pi\\| \\to 0} \\sum_i \\Delta_{t_i}\\left(W_{t_{i+1}} - W_{t_i}\\right)",
          caption: "Δ must be adapted and square-integrable: $E\\left[\\int_0^t \\Delta_s^2\\, ds\\right] < \\infty$",
        },
        {
          kind: "prose",
          text:
            "The integrand $\\Delta_s$ is evaluated at the *left* endpoint $t_i$ of each sub-interval — " +
            "using only information available at time $t_i$ — before multiplying by the increment " +
            "$W_{t_{i+1}} - W_{t_i}$ that happens afterward. The limit is taken in mean-square (an $L^2$ " +
            "limit), the same sense of convergence used to define quadratic variation.",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "Adapted",
              description: "$\\Delta_s$ must be $\\mathcal F_s$-measurable — it can depend on the Brownian path up to time s, never beyond it.",
            },
            {
              term: "Square-integrable",
              description: "$E\\left[\\int_0^t \\Delta_s^2\\, ds\\right] < \\infty$ — a technical condition needed for the Itô isometry below to give a finite answer.",
            },
          ],
        },
      ],
    },

    {
      heading: "Why the left endpoint, and not the right",
      blocks: [
        {
          kind: "prose",
          text:
            "Evaluating $\\Delta$ at the left endpoint is what makes each partial sum a martingale: " +
            "conditioning on $\\mathcal F_{t_i}$, the factor $\\Delta_{t_i}$ is already known, and " +
            "$E[W_{t_{i+1}} - W_{t_i} \\mid \\mathcal F_{t_i}] = 0$ by independent increments, so the " +
            "expected increment of the partial sum is exactly 0 at every step. That property survives the " +
            "limit, which is why $\\int_0^t \\Delta_s\\, dW_s$ (as a process in $t$) is a martingale.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The right-endpoint choice gives a different, non-martingale integral",
          text:
            "Evaluating $\\Delta$ at the right endpoint $t_{i+1}$ instead defines the Stratonovich " +
            "integral, which obeys the ordinary chain rule (no Itô correction term) but is *not* a " +
            "martingale in general — using $\\Delta_{t_{i+1}}$ lets the integrand 'see' part of the very " +
            "increment it's being multiplied against, breaking the zero-conditional-expectation argument " +
            "above. This is not a minor stylistic difference: it is the choice between an integral " +
            "friendly to fair-game arguments (Itô, used throughout this domain) and one friendly to " +
            "ordinary calculus (Stratonovich, more common in physics). The two differ by a deterministic " +
            "correction term and are related but not interchangeable.",
        },
      ],
    },

    {
      heading: "The Itô isometry",
      blocks: [
        {
          kind: "formula",
          latex: "E\\left[\\left(\\int_0^t \\Delta_s\\, dW_s\\right)^2\\right] = E\\left[\\int_0^t \\Delta_s^2\\, ds\\right]",
          caption: "Variance of a stochastic integral equals the ordinary time integral of the expected squared integrand",
        },
        {
          kind: "prose",
          text:
            "This is the single most useful computational tool attached to the Itô integral. It follows " +
            "from squaring the Riemann sum, using independence of increments across sub-intervals to kill " +
            "the cross terms, and using $E[(W_{t_{i+1}} - W_{t_i})^2] = t_{i+1} - t_i$ (the same fact " +
            "behind $dW \\cdot dW = dt$) on the diagonal terms — exactly the same limiting argument as " +
            "quadratic variation, applied to a weighted sum instead of an unweighted one.",
        },
        {
          kind: "example",
          title: "Variance of ∫₀ᵗ W_s dW_s",
          problem: "Use the Itô isometry to find $\\text{Var}\\left(\\int_0^t W_s\\, dW_s\\right)$.",
          steps: [
            "The integral has mean 0 (it's an Itô integral, hence a martingale starting at 0), so Var = E[(∫W_s dW_s)²].",
            "By the Itô isometry, E[(∫₀ᵗ W_s dW_s)²] = E[∫₀ᵗ W_s² ds] = ∫₀ᵗ E[W_s²] ds.",
            "E[W_s²] = s, so ∫₀ᵗ s ds = t²/2.",
          ],
          answer:
            "Var(∫₀ᵗ W_s dW_s) = t²/2 — computed with no need to know the integral's full distribution, " +
            "only the isometry.",
        },
      ],
    },

    {
      heading: "Why this matters",
      blocks: [
        {
          kind: "list",
          items: [
            "Every SDE dX = μ dt + σ dW is shorthand for $X_t = X_0 + \\int_0^t \\mu\\, ds + \\int_0^t \\sigma\\, dW_s$ — the Itô integral is what gives the second term meaning.",
            "The martingale property of the Itô integral is exactly what the martingale representation theorem later shows is not a coincidence: every martingale in a Brownian filtration is one of these.",
            "The Itô isometry is the standard tool for computing hedging error and variance in derivative pricing, since it converts a stochastic quantity into an ordinary, deterministic integral.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Shreve, Stochastic Calculus for Finance II", locator: "§4.2-4.3, The Itô Integral" },
    { source: "Øksendal, Stochastic Differential Equations", locator: "Ch. 3, Itô Integrals" },
  ],
};
