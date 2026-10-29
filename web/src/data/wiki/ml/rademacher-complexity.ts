import type { WikiArticle } from "../types";

const rademacherComplexity: WikiArticle = {
  conceptId: "rademacher-complexity",

  summary:
    "When you pick the best of many models on the same data, the winner's training score is too good: it was selected " +
    "partly for fitting noise. Rademacher complexity measures exactly how much noise a class of models can fit — the " +
    "expected best correlation between its members and a sequence of random $\\pm 1$ signs. It yields generalization " +
    "bounds that hold simultaneously for every member of the class, with finite samples, and it automatically discounts " +
    "near-duplicate models. It underlies modern learning theory and, in the Quantitative Investing course, a haircut for " +
    "the best of many backtests.",

  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "\\hat{R}(\\mathcal{F}) = \\mathbb{E}_{\\boldsymbol{\\sigma}}\\left[\\sup_{f \\in \\mathcal{F}} \\frac{1}{n}\\sum_{i=1}^{n} \\sigma_i f(x_i)\\right], \\qquad \\sigma_i \\overset{\\text{iid}}{=} \\pm 1 \\text{ with probability } \\tfrac{1}{2}",
          caption: "Empirical Rademacher complexity on a sample $x_1, \\dots, x_n$; $R_n(\\mathcal{F})$ is its expectation over samples",
        },
        {
          kind: "prose",
          text:
            "Think of $\\boldsymbol{\\sigma}$ as random labels with no structure at all. For each draw, find the member of " +
            "$\\mathcal{F}$ that correlates best with them; average over draws. A class that can match any sign pattern " +
            "(it “shatters” the sample) has $\\hat{R} = 1$ for $\\pm 1$-valued functions; a single function has " +
            "$\\hat{R} = 0$, because $\\mathbb{E}[\\sigma_i] = 0$.",
        },
        {
          kind: "example",
          title: "Two points, a few classes",
          problem: "On $n = 2$ points, compute $\\hat{R}$ for the classes with value vectors (a) $\\{[1, 1], [-1, -1]\\}$, (b) all four sign patterns, (c) $\\{[1, 0], [0, 1]\\}$.",
          steps: [
            "Enumerate $\\boldsymbol{\\sigma} \\in \\{[1, 1], [1, -1], [-1, 1], [-1, -1]\\}$, each with probability $\\frac{1}{4}$.",
            "(a) Best correlations: $1, 0, 0, 1$, so $\\hat{R} = 0.5$.",
            "(b) The class contains $\\boldsymbol{\\sigma}$ itself every time, so $\\hat{R} = 1$.",
            "(c) Best values $\\frac{1}{2}\\max(\\sigma_1, \\sigma_2)$: $\\frac{1}{2}, \\frac{1}{2}, \\frac{1}{2}, -\\frac{1}{2}$, so $\\hat{R} = 0.25$.",
          ],
          answer: "More, and more different, functions fit noise better.",
        },
        {
          kind: "list",
          items: [
            "**Scaling**: $\\hat{R}(c\\mathcal{F}) = |c|\\hat{R}(\\mathcal{F})$.",
            "**Shifts and copies**: adding a fixed function to every member, or duplicating members, changes nothing.",
            "**Convex hull**: mixtures of members add no complexity.",
            "**Contraction**: an $L$-Lipschitz loss multiplies complexity by at most $L$.",
          ],
        },
      ],
    },
    {
      heading: "The generalization bound",
      blocks: [
        {
          kind: "formula",
          latex: "\\Pr\\left[\\forall f \\in \\mathcal{F}: \\ \\mathbb{E}[f] \\ge \\hat{\\mathbb{E}}_n[f] - 2R_n(\\mathcal{F}) - \\sqrt{\\frac{\\log(1/\\delta)}{2n}}\\right] \\ge 1 - \\delta \\qquad (f \\in [0, 1])",
          caption: "One inequality, valid for every member at once — including the one you selected after looking",
        },
        {
          kind: "prose",
          text:
            "Two ingredients produce it. **Symmetrization**: compare the sample with an independent “ghost” sample; " +
            "swapping a point with its ghost doesn't change the joint distribution, so random signs can be inserted, and " +
            "the expected worst-case gap $\\mathbb{E}\\left[\\sup_f(\\mathbb{E}f - \\hat{\\mathbb{E}}f)\\right]$ is at most " +
            "$2R_n$. **Concentration** (McDiarmid's bounded-differences inequality): changing one sample moves the " +
            "worst-case gap by at most $\\frac{1}{n}$, so it rarely exceeds its mean by more than " +
            "$\\sqrt{\\frac{\\log(1/\\delta)}{2n}}$. A second McDiarmid step swaps $R_n$ for the computable $\\hat{R}$.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Hoeffding is the one-function case",
          text:
            "For a single function, $\\hat{R} = 0$ and the bound is Hoeffding's inequality, $\\Pr(|\\bar{X} - \\mu| \\ge t) " +
            "\\le 2e^{-2nt^{2}}$. Rademacher complexity is the price of choosing among many.",
        },
      ],
    },
    {
      heading: "Computing and bounding it",
      blocks: [
        {
          kind: "table",
          headers: ["Class", "Bound on $\\hat{R}$"],
          rows: [
            ["$N$ functions with $|f| \\le a$ (Massart)", "$a\\sqrt{\\frac{2\\log N}{n}}$"],
            ["Linear, $\\|\\mathbf{w}\\| \\le B$, $\\|\\mathbf{x}\\| \\le X$", "$\\frac{BX}{\\sqrt{n}}$"],
            ["Binary classifiers of VC dimension $d$", "$\\approx \\sqrt{\\frac{d\\log n}{n}}$"],
          ],
        },
        {
          kind: "example",
          title: "A million candidates",
          problem: "You compare $N = 10^{6}$ bounded strategies on $n = 10{,}000$ observations. How big can the snooping effect be?",
          steps: [
            "Massart: $\\hat{R} \\le \\sqrt{\\frac{2\\log 10^{6}}{10^{4}}} = \\sqrt{\\frac{27.6}{10^{4}}} \\approx 0.053$.",
            "Multiplying $N$ by $1{,}000$ only adds $\\log 1{,}000 \\approx 6.9$ inside the root.",
          ],
          answer: "At most about $0.11$ ($2\\hat{R}$) — and much less if the strategies are highly correlated, which the exact $\\hat{R}$ captures and Massart does not.",
        },
        {
          kind: "prose",
          text:
            "In practice $\\hat{R}$ is estimated by Monte Carlo: draw a few hundred sign vectors, and for each take " +
            "$\\max_f \\frac{1}{n}\\boldsymbol{\\sigma}^{\\top}\\mathbf{f}$ — a single matrix–vector product over all " +
            "candidates — then average.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Assumptions",
          text:
            "The bounds need i.i.d. samples and bounded (or sub-Gaussian) values. Time series violate the first; blocking " +
            "into non-overlapping averages restores approximate independence at the cost of fewer observations.",
        },
      ],
    },
  ],

  references: [
    { source: "Mohri, Rostamizadeh and Talwalkar, Foundations of Machine Learning (2nd ed.)", locator: "Ch. 3, Rademacher Complexity and VC-Dimension" },
    { source: "Shalev-Shwartz and Ben-David, Understanding Machine Learning", locator: "Ch. 26, Rademacher Complexities" },
    { source: "Boucheron, Lugosi and Massart, Concentration Inequalities", locator: "Ch. 6, the bounded differences inequality" },
  ],
};

export const rademacherComplexityWikis: WikiArticle[] = [rademacherComplexity];
