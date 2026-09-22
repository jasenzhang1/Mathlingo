import type { WikiArticle } from "../types";

export const itoDoeblinFormulaWiki: WikiArticle = {
  conceptId: "ito-doeblin-formula",
  summary:
    "Itô's lemma (the Itô-Doeblin formula) is the chain rule for stochastic calculus: for $X_t$ " +
    "satisfying $dX = \\mu\\, dt + \\sigma\\, dW$ and a sufficiently smooth $f$, it gives $df(t, X_t)$ as " +
    "a Taylor expansion kept to second order in $dX$, where the ordinary chain rule stops at first " +
    "order. That extra $\\tfrac12 \\sigma^2 f_{xx}\\, dt$ term exists purely because $dW \\cdot dW = dt$ " +
    "is not negligible, and it is the single most-used formula in the rest of this domain.",

  sections: [
    {
      heading: "Statement",
      blocks: [
        {
          kind: "formula",
          latex: "dX_t = \\mu\\, dt + \\sigma\\, dW_t",
          caption: "X_t is an Itô process: μ and σ may themselves depend on t and X_t",
        },
        {
          kind: "formula",
          latex:
            "df(t, X_t) = \\left[f_t + \\mu f_x + \\tfrac{1}{2}\\sigma^2 f_{xx}\\right] dt + \\sigma f_x\\, dW_t",
          caption: "f(t,x) must be once differentiable in t and twice in x",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "$f_t$",
              description: "The explicit time-dependence of f, if any (0 if f doesn't depend on t directly).",
            },
            {
              term: "$\\mu f_x$",
              description: "The ordinary chain-rule term — what you'd get treating X as if it moved deterministically at rate μ.",
            },
            {
              term: "$\\tfrac12 \\sigma^2 f_{xx}$",
              description: "The Itô correction: the second-derivative term that survives because (dX)² is not negligible.",
            },
            {
              term: "$\\sigma f_x\\, dW$",
              description: "The random (martingale) part of df — the only term that carries genuine noise.",
            },
          ],
        },
      ],
    },

    {
      heading: "Derivation: a Taylor expansion that can't stop at first order",
      blocks: [
        {
          kind: "prose",
          text:
            "Start with a Taylor expansion of $f(t + dt, X_t + dX)$ around $(t, X_t)$, kept to second " +
            "order — ordinary multivariable calculus would justify dropping every term beyond first order " +
            "as $o(dt)$, but that reasoning assumes $dX$ scales like $dt$.",
        },
        {
          kind: "formula",
          latex:
            "df = f_t\\, dt + f_x\\, dX + \\tfrac{1}{2} f_{xx} (dX)^2 + \\tfrac{1}{2} f_{tt} (dt)^2 + f_{tx}\\, dt\\, dX + \\cdots",
          caption: "Full second-order Taylor expansion, before discarding anything",
        },
        {
          kind: "prose",
          text:
            "Now substitute $dX = \\mu\\, dt + \\sigma\\, dW$ and expand $(dX)^2$ using the quadratic " +
            "variation multiplication table: $(dX)^2 = \\mu^2 (dt)^2 + 2\\mu\\sigma\\, dt\\, dW + " +
            "\\sigma^2 (dW)^2$. Every term here is negligible except $\\sigma^2 (dW)^2$, because $dW \\cdot " +
            "dW = dt$ while $dt \\cdot dW = 0$ and $(dt)^2 = 0$.",
        },
        {
          kind: "formula",
          latex: "(dX)^2 = \\sigma^2 (dW)^2 + o(dt) = \\sigma^2\\, dt + o(dt)",
          caption: "The one Taylor term ordinary calculus would discard as second-order — but which is actually order dt, not smaller",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "This is the entire reason Itô's lemma differs from the chain rule",
          text:
            "An ordinary function of time has $(dX)^2 = O((dt)^2)$, genuinely negligible next to $dt$. " +
            "Brownian motion's quadratic variation breaks that assumption: $(dX)^2$ contains a term of " +
            "*exactly* order $dt$, not smaller, so it cannot be dropped. Keeping that one term through the " +
            "Taylor expansion, and dropping every other second-order term as truly negligible, is the " +
            "entire content of the derivation — everything else is bookkeeping.",
        },
        {
          kind: "prose",
          text:
            "Substituting $dX = \\mu\\, dt + \\sigma\\, dW$ back into $f_x\\, dX$ and combining all " +
            "surviving $dt$ terms and all $dW$ terms recovers the statement above.",
        },
      ],
    },

    {
      heading: "Example: f(x) = x²",
      blocks: [
        {
          kind: "prose",
          text:
            "Apply the formula to $X_t = W_t$ (so $\\mu = 0$, $\\sigma = 1$) and $f(x) = x^2$, so " +
            "$f_x = 2x$ and $f_{xx} = 2$:",
        },
        {
          kind: "formula",
          latex:
            "d(W_t^2) = \\left[0 \\cdot 2W_t + \\tfrac{1}{2}(1)^2(2)\\right] dt + (1)(2W_t)\\, dW_t = dt + 2W_t\\, dW_t",
          caption: "d(W_t²) = dt + 2W_t dW_t",
        },
        {
          kind: "prose",
          text:
            "Integrating both sides from 0 to $t$ gives $W_t^2 - 0 = t + 2\\int_0^t W_s\\, dW_s$, i.e. " +
            "$W_t^2 - t = 2\\int_0^t W_s\\, dW_s$. The right side is an Itô integral, hence a martingale " +
            "starting at 0 — recovering exactly the fact from martingales-in-continuous-time that " +
            "$W_t^2 - t$ is a martingale, now derived mechanically from Itô's lemma rather than by direct " +
            "conditional-expectation computation.",
        },
      ],
    },

    {
      heading: "Why this matters",
      blocks: [
        {
          kind: "list",
          items: [
            "Every closed-form SDE solution in this domain — geometric Brownian motion via f = log X, the Ornstein-Uhlenbeck process via an integrating factor — is Itô's lemma applied to a cleverly chosen f.",
            "The Black-Scholes-Merton PDE is derived by applying Itô's lemma to the option value V(S,t) and matching the resulting dt-coefficient against a no-arbitrage condition.",
            "Applying it to f(x) = log x on geometric Brownian motion is the canonical worked example — see geometric-brownian-motion for the full derivation, which follows this exact template.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Shreve, Stochastic Calculus for Finance II", locator: "§4.4, Itô's Formula" },
    { source: "Øksendal, Stochastic Differential Equations", locator: "Ch. 4, Itô Formula and the Martingale Representation Theorem" },
  ],
};
