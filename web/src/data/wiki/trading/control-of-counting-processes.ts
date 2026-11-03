import type { WikiArticle } from "../types";

export const controlOfCountingProcessesWiki: WikiArticle = {
  conceptId: "control-of-counting-processes",

  summary: "Many trading decisions control not a drift but the rate of discrete events: posting a limit order deeper lowers the rate at which it fills. Controlling a counting process leads to a dynamic programming equation with difference terms, $\\lambda(u)[H(n + 1) - H(n)]$, instead of derivatives. Linear problems give bang-bang controls; with exponential fill rates the optimal depth is interior, and the round-trip example shows the classic answer: half the spread plus $1/\\kappa$.",

  sections: [
    {
      heading: "The dynamic programming equation",
      blocks: [
        {
          kind: "formula",
          latex: "\\partial_t H(t, x, n) + \\mathcal{L}H + \\sup_u\\left\\{\\lambda(t, u)\\left[H(t, x + \\gamma(u), n + 1) - H(t, x, n)\\right] + F\\right\\} = 0",
          caption: "A controlled counting process $N$ that also moves a secondary state $X$ (such as cash) by $\\gamma(u)$ at each jump.",
        },
        {
          kind: "prose",
          text: "The derivation mirrors the diffusion case: apply the DPP over a short interval, write the value at the later time with Itô’s formula for jumps, use that the compensated jump integral has zero mean, and let the interval shrink. If the problem is linear in the intensity, the optimum sits at a bound (bang-bang).",
        },
      ],
    },
    {
      heading: "The round-trip posting example",
      blocks: [
        {
          kind: "example",
          title: "Buy with an MO, sell with an LO",
          problem: "An agent buys one share with an MO at $S + \\Delta/2$ and posts a sell LO at $S + \\delta$. MOs arrive at rate $\\lambda$ and fill her with probability $e^{-\\kappa\\delta}$. She maximises the expected profit rate.",
          answer: "The answer is independent of time and wealth because the problem has no inventory risk or deadline.",
          steps: [
            "Profit per completed round trip is $\\delta - \\Delta/2$, earned at rate $\\lambda e^{-\\kappa\\delta}$.",
            "Maximising $(\\delta - \\Delta/2)e^{-\\kappa\\delta}$ gives $\\delta^{*} = \\Delta/2 + 1/\\kappa$.",
            "With $\\Delta = 2$ cents, $\\kappa = 100$ per dollar and $\\lambda = 50$ per minute, $\\delta^{*} = 2$ cents and the profit rate is $1 \\times 50e^{-2} \\approx 6.77$ cents per minute.",
          ],
        },
      ],
    },
    {
      heading: "The log transform",
      blocks: [
        {
          kind: "prose",
          text: "With exponential fill rates, optimising $e^{-\\kappa\\delta}(\\delta + c)$ gives $\\delta^{*} = 1/\\kappa - c$ and a maximal value $\\frac{1}{\\kappa}e^{-1}e^{\\kappa c}$, exponential in a value-function difference. Substituting $h = \\frac{1}{\\kappa}\\log\\omega$ turns the non-linear system into a linear one for $\\omega$, which is why execution and market-making problems solve with sums and matrix exponentials.",
        },
        {
          kind: "example",
          title: "One share, no penalty",
          problem: "Liquidate one share with LOs before $T$, with $\\lambda = 1$ per second and $\\kappa = 100$.",
          answer: "Time pressure pulls her quote toward the mid.",
          steps: [
            "The excess value is $h(t) = \\frac{1}{\\kappa}\\log\\left(1 + \\frac{\\lambda}{e}(T - t)\\right)$.",
            "With $10$ seconds left, $h = 0.01\\log(1 + 10/e) \\approx 1.543$ cents.",
            "The depth is $1/\\kappa + h \\approx 2.543$ cents, falling toward $1$ cent as $T$ approaches.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Negative depths",
          text: "If the formula gives $\\delta^{*} < 0$, the agent would rather sell immediately: the problem needs a constraint or a market-order option (a QVI).",
        },
      ],
    },
  ],

  references: [
    { source: "Cartea, Jaimungal & Penalva, Algorithmic and High-Frequency Trading (2015)", locator: "Ch. 5, §5.4 Control for counting processes (DPP, DPE, combined diffusion and jumps, optimal limit-order posting)" },
  ],
};
