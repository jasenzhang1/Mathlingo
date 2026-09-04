import type { WikiArticle } from "../types";

export const jensenInequality: WikiArticle = {
  conceptId: "jensen-inequality",
  summary:
    "Jensen's inequality says that for a convex function, the expectation of the function is at least the function of the expectation. It is the precise statement of why $\\mathbb{E}[g(X)] \\neq g(\\mathbb{E}[X])$ — and, more usefully, which direction the error runs.",
  sections: [
    {
      heading: "Statement",
      blocks: [
        {
          kind: "formula",
          latex: "g \\text{ convex} \\ \\Longrightarrow \\ \\mathbb{E}[g(X)] \\ \\ge \\ g\\big(\\mathbb{E}[X]\\big)",
          caption: "Jensen's inequality",
        },
        {
          kind: "formula",
          latex: "g \\text{ concave} \\ \\Longrightarrow \\ \\mathbb{E}[g(X)] \\ \\le \\ g\\big(\\mathbb{E}[X]\\big)",
          caption: "The concave case — the inequality simply reverses",
        },
        {
          kind: "prose",
          text: "Equality holds exactly when $g$ is linear on the range of $X$, or when $X$ is constant. So the gap is a measure of how much curvature $g$ has where $X$ actually lives, combined with how spread out $X$ is.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why convexity forces this direction",
          text: "A convex function lies above every one of its tangent lines. Take the tangent at $\\mu = \\mathbb{E}[X]$: since $g(x) \\ge g(\\mu) + g'(\\mu)(x - \\mu)$ for all $x$, taking expectations of both sides gives $\\mathbb{E}[g(X)] \\ge g(\\mu) + g'(\\mu)\\underbrace{\\mathbb{E}[X - \\mu]}_{=\\,0} = g(\\mu)$. That is the entire proof, and it makes clear that the result is about curvature, not about any property of $X$ beyond having a mean.",
        },
      ],
    },
    {
      heading: "Consequences you already use",
      blocks: [
        {
          kind: "table",
          headers: ["Function", "Convexity", "What Jensen gives"],
          rows: [
            ["$g(x) = x^{2}$", "convex", "$\\mathbb{E}[X^{2}] \\ge (\\mathbb{E}[X])^{2}$ — i.e. $\\operatorname{Var}(X) \\ge 0$"],
            ["$g(x) = 1/x$, $x > 0$", "convex", "$\\mathbb{E}[1/X] \\ge 1/\\mathbb{E}[X]$"],
            ["$g(x) = \\log x$", "concave", "$\\mathbb{E}[\\log X] \\le \\log \\mathbb{E}[X]$"],
            ["$g(x) = |x|$", "convex", "$\\mathbb{E}|X| \\ge |\\mathbb{E}[X]|$ — the triangle inequality"],
            ["$g(x) = e^{x}$", "convex", "$\\mathbb{E}[e^{X}] \\ge e^{\\mathbb{E}[X]}$ — used throughout MGF bounds"],
          ],
        },
        {
          kind: "prose",
          text: "The first row is worth pausing on: the non-negativity of variance, which looks like a separate fact, is just Jensen applied to squaring. The log row underpins the arithmetic–geometric mean inequality and the non-negativity of KL divergence.",
        },
      ],
    },
    {
      heading: "Why it matters in practice",
      blocks: [
        {
          kind: "example",
          title: "Volatility drag",
          problem:
            "An investment returns +50% or −40% with equal probability each year. The arithmetic mean return is +5%. What happens to £100 over two years, one of each?",
          steps: [
            "Arithmetic mean: $(0.50 - 0.40)/2 = +5\\%$ per year — apparently a gain.",
            "But wealth compounds multiplicatively: $100 \\times 1.5 \\times 0.6 = 90$.",
            "The relevant quantity is $\\mathbb{E}[\\log(1+R)]$, and $\\log$ is concave.",
            "Jensen: $\\mathbb{E}[\\log(1+R)] \\le \\log(1 + \\mathbb{E}[R]) = \\log(1.05)$.",
            "Here $\\mathbb{E}[\\log(1+R)] = \\tfrac{1}{2}(\\log 1.5 + \\log 0.6) \\approx -0.051 < 0$.",
          ],
          answer:
            "£90 — a loss, despite a positive average return. The gap between the arithmetic and geometric mean is exactly Jensen's inequality, and it is why volatility erodes compounded wealth.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Averaging ratios is not the ratio of averages",
          text: "This is the same error in a different costume. Average speed over a fixed distance is not the average of the speeds — it is the harmonic mean, which is smaller, because $1/x$ is convex. Similarly, the average of per-store profit margins is not the overall margin. Whenever a quantity is a ratio or a rate, check whether you should be averaging the numerator and denominator separately.",
        },
        {
          kind: "prose",
          text: "In statistics, Jensen explains why an unbiased estimator of $\\theta$ generally gives a *biased* estimator of $g(\\theta)$: unbiasedness does not survive non-linear transformation. $s^{2}$ is unbiased for $\\sigma^{2}$, but $s$ is biased for $\\sigma$ — and Jensen tells you which way, since $\\sqrt{\\cdot}$ is concave, so $\\mathbb{E}[s] \\le \\sigma$.",
        },
      ],
    },
  ],
  references: [
    { source: "Casella & Berger, Statistical Inference", locator: "§4.7.1" },
    { source: "Blitzstein & Hwang, Introduction to Probability", locator: "Ch. 10.1" },
    { source: "Boyd & Vandenberghe, Convex Optimization", locator: "§3.1.8" },
    { source: "Mathlingo assessment bank", locator: "assessments/inequalities-and-convergence.md" },
  ],
};
