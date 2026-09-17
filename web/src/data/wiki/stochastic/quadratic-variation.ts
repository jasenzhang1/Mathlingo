import type { WikiArticle } from "../types";

export const quadraticVariationWiki: WikiArticle = {
  conceptId: "quadratic-variation",
  summary:
    "Quadratic variation measures how much a path's squared increments accumulate as you sum them " +
    "over a finer and finer partition. For a smooth function it vanishes; for Brownian motion it " +
    "converges to $t$ itself. That single fact — $[W,W]_t = t$ — is what makes Brownian motion " +
    "impossible to integrate against with ordinary calculus, and it is the justification for the " +
    "multiplication rule $dW \\cdot dW = dt$ used everywhere in the rest of this domain.",

  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "prose",
          text:
            "Partition $[0, t]$ into points $0 = t_0 < t_1 < \\cdots < t_n = t$, and sum the squared " +
            "increments of the path over that partition. Quadratic variation is the limit of that sum as " +
            "the partition's mesh (its widest sub-interval) shrinks to 0.",
        },
        {
          kind: "formula",
          latex:
            "[W,W]_t = \\lim_{\\|\\Pi\\| \\to 0} \\sum_{i=0}^{n-1} \\left(W_{t_{i+1}} - W_{t_i}\\right)^2",
          caption: "The limit is taken in mean-square (or in probability) — it need not hold path-by-path in the ordinary pointwise sense",
        },
        {
          kind: "formula",
          latex: "[W,W]_t = t",
          caption: "The key theorem: Brownian motion's quadratic variation equals elapsed time",
        },
        {
          kind: "prose",
          text:
            "The idea of the proof is a variance computation: each term $(W_{t_{i+1}} - W_{t_i})^2$ has " +
            "expectation $t_{i+1} - t_i$ (since $W_{t_{i+1}} - W_{t_i} \\sim N(0, t_{i+1}-t_i)$), so the " +
            "sum's expectation is always exactly $t$, telescoping regardless of the partition. What takes " +
            "more work is showing the sum's *variance* around that expectation shrinks to 0 as the mesh " +
            "shrinks — using independence across sub-intervals and the fact that a normal's fourth moment " +
            "is finite — which is what turns 'expectation is $t$' into 'the sum converges to $t$'.",
        },
      ],
    },

    {
      heading: "Contrast with a smooth function",
      blocks: [
        {
          kind: "prose",
          text:
            "If $f$ is continuously differentiable, its increments over a fine partition are " +
            "approximately $f(t_{i+1}) - f(t_i) \\approx f'(t_i)(t_{i+1} - t_i)$ — of order $\\Delta t$, " +
            "not $\\sqrt{\\Delta t}$. Squaring makes each term of order $(\\Delta t)^2$, and summing $n " +
            "\\sim 1/\\Delta t$ of them gives a total of order $\\Delta t \\to 0$.",
        },
        {
          kind: "formula",
          latex: "[f,f]_t = 0 \\quad \\text{for any } f \\in C^1",
          caption: "Quadratic variation of a smooth function is identically zero",
        },
        {
          kind: "table",
          headers: ["Path type", "Quadratic variation on [0,t]", "Total variation on [0,t]"],
          rows: [
            ["Smooth ($C^1$) function", "0", "Finite"],
            ["Brownian motion", "t (nonzero, finite)", "Infinite, a.s."],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The pair of facts that breaks ordinary calculus",
          text:
            "Brownian motion sits in the one regime ordinary calculus was never built for: its total " +
            "variation (the sum of *absolute*, not squared, increments) is infinite almost surely, while " +
            "its quadratic variation is finite and nonzero. Riemann-Stieltjes integration requires finite " +
            "total variation in the integrator, which rules out $\\int f\\, dW$ in the classical sense; " +
            "meanwhile the nonzero quadratic variation means the squared-increment terms that ordinary " +
            "calculus discards as negligible higher-order terms cannot be discarded here at all. Both " +
            "facts point to the same conclusion: a genuinely new integral is needed, which is exactly what " +
            "the Itô integral supplies.",
        },
      ],
    },

    {
      heading: "The multiplication table",
      blocks: [
        {
          kind: "prose",
          text:
            "Quadratic variation is usually invoked not as a limit but through a compact heuristic: treat " +
            "$dW_t$ as an infinitesimal increment and multiply pairs of differentials using the rule that " +
            "$[W,W]_t = t$ justifies.",
        },
        {
          kind: "formula",
          latex: "dW \\cdot dW = dt, \\qquad dW \\cdot dt = 0, \\qquad dt \\cdot dt = 0",
          caption: "The informal multiplication table used throughout the rest of this domain",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "$dW \\cdot dW = dt$",
              description: "Directly from [W,W]_t = t: the squared increment over an infinitesimal interval of length dt is itself of order dt, not negligible.",
            },
            {
              term: "$dW \\cdot dt = 0$",
              description: "A cross term of order $\\sqrt{dt} \\cdot dt = (dt)^{3/2}$, which vanishes faster than dt and is dropped.",
            },
            {
              term: "$dt \\cdot dt = 0$",
              description: "Order $(dt)^2$, negligible next to dt — the same convention ordinary calculus already uses.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "This is a bookkeeping heuristic, not literal algebra",
          text:
            "$dW_t$ is not a real number and $dW \\cdot dW = dt$ is not an algebraic identity — it is " +
            "shorthand for the underlying limit-of-partitions argument above. The heuristic is what makes " +
            "Itô's lemma's derivation tractable (it tells you which second-order Taylor term to keep and " +
            "which to discard), but every use of it is ultimately standing in for the rigorous quadratic " +
            "variation limit.",
        },
      ],
    },

    {
      heading: "Why this matters",
      blocks: [
        {
          kind: "list",
          items: [
            "It is the reason W_t² − t, not W_t² alone, is a martingale — the −t exactly cancels the drift that quadratic variation contributes.",
            "It is the direct justification for the Itô isometry, which turns E[(∫Δ dW)²] into an ordinary time integral E[∫Δ² ds] via the same dW·dW = dt substitution.",
            "It is the reason Itô's lemma has an extra ½σ²f″ term that an ordinary chain rule would never produce — that term exists precisely because quadratic variation is nonzero.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Shreve, Stochastic Calculus for Finance II", locator: "§3.4, Quadratic Variation" },
    { source: "Øksendal, Stochastic Differential Equations", locator: "Ch. 2-3, Brownian motion and its variation properties" },
  ],
};
