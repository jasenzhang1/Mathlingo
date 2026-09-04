import type { WikiArticle } from "./types";

export const bernoulliBinomialWiki: WikiArticle = {
  conceptId: "bernoulli-binomial",
  summary:
    "A Bernoulli trial is a single yes/no experiment. The binomial distribution counts how many " +
    "successes occur across a fixed number of independent Bernoulli trials that all share the same " +
    "success probability. Almost every other discrete distribution in this curriculum is defined by " +
    "relaxing one of those conditions, so it is worth knowing precisely which four assumptions the " +
    "binomial makes.",

  sections: [
    {
      heading: "The Bernoulli trial",
      blocks: [
        {
          kind: "prose",
          text:
            "A Bernoulli random variable X takes the value 1 (“success”) with probability p " +
            "and 0 (“failure”) with probability 1 − p. Which outcome you label “success” " +
            "is a modelling choice, not a value judgment — for a defect-counting problem, a defect is " +
            "usually the “success.”",
        },
        {
          kind: "formula",
          latex: "P(X = x) = p^{x}(1-p)^{1-x}, \\qquad x \\in \\{0, 1\\}",
          caption: "Bernoulli(p) probability mass function",
        },
        {
          kind: "prose",
          text:
            "Writing it as a single expression rather than two cases is a small trick worth absorbing: " +
            "substituting x = 1 leaves p, and x = 0 leaves 1 − p. That exponent form is what makes the " +
            "likelihood factor cleanly when you later fit p by maximum likelihood.",
        },
        {
          kind: "definitions",
          items: [
            { term: "E[X]", description: "p — the long-run fraction of trials that succeed." },
            {
              term: "Var(X)",
              description:
                "p(1 − p) — maximised at p = ½, where a single trial is least predictable.",
            },
          ],
        },
      ],
    },

    {
      heading: "From one trial to many: the binomial",
      blocks: [
        {
          kind: "prose",
          text:
            "If X₁, …, Xₙ are independent Bernoulli(p) trials, their sum X = ΣXᵢ counts " +
            "the successes. That count is Binomial(n, p). Four conditions have to hold, and they are worth " +
            "memorising as a checklist — every classic misuse of the binomial is one of them failing.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Binary — each trial has exactly two outcomes.",
            "Independent — no trial's outcome affects any other's.",
            "Fixed n — the number of trials is decided in advance, not by the results.",
            "Same p — the success probability is identical on every trial.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The checklist is the whole subject in miniature",
          text:
            "Drop “fixed n” and you get the geometric or negative binomial (keep going until you " +
            "hit r successes). Drop “same p / independent” by sampling without replacement and you get " +
            "the hypergeometric. Let n grow while p shrinks with np fixed and you get the Poisson. " +
            "Knowing which condition broke tells you which distribution to reach for instead.",
        },
      ],
    },

    {
      heading: "The probability mass function",
      blocks: [
        {
          kind: "formula",
          latex: "P(X = k) = \\binom{n}{k} p^{k}(1-p)^{n-k}, \\qquad k = 0, 1, \\ldots, n",
          caption: "Binomial(n, p) probability mass function",
        },
        {
          kind: "prose",
          text:
            "The term pᵏ(1 − p)ⁿ⁻ᵏ is the probability of one specific sequence with k " +
            "successes — say, success on the first k trials and failure on the rest. But the order does " +
            "not matter to the count, and C(n, k) = n! / (k!(n − k)!) is exactly how many orderings " +
            "produce k successes. Forgetting that coefficient is the single most common binomial error.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why it sums to 1",
          text:
            "Σₖ C(n,k)pᵏ(1−p)ⁿ⁻ᵏ = (p + (1 − p))ⁿ = 1ⁿ = 1, " +
            "by the binomial theorem. The algebraic identity and the probabilistic fact are the same " +
            "statement — which is why the binomial theorem is a prerequisite for this lesson.",
        },
        {
          kind: "example",
          title: "Exactly k successes",
          problem:
            "A tennis player lands each first serve independently with probability 0.6. Over 10 serves, " +
            "what is the probability exactly 7 land?",
          steps: [
            "This is Binomial(n = 10, p = 0.6); we want P(X = 7).",
            "C(10, 7) = 120 orderings give exactly 7 successes.",
            "Each such ordering has probability 0.6⁷ · 0.4³.",
            "P(X = 7) = 120 · 0.6⁷ · 0.4³.",
          ],
          answer: "≈ 0.2150",
        },
      ],
    },

    {
      heading: "The cumulative distribution function",
      blocks: [
        {
          kind: "formula",
          latex: "F(x) = P(X \\le x) = \\sum_{k=0}^{\\lfloor x \\rfloor} \\binom{n}{k} p^{k}(1-p)^{n-k}",
          caption: "Binomial CDF — a step function, jumping at each integer",
        },
        {
          kind: "prose",
          text:
            "There is no elementary closed form for this partial sum — it equals a regularised " +
            "incomplete beta function — which is why binomial tables and software functions exist at " +
            "all. In practice you compute tail probabilities like P(X ≥ k) with the complement rule, " +
            "since summing from the far tail is usually fewer terms.",
        },
        {
          kind: "example",
          title: "At least one",
          problem:
            "A component fails on any given day with probability 0.02, independently. What is the " +
            "probability of at least one failure over 30 days?",
          steps: [
            "P(at least one) = 1 − P(none).",
            "P(none) = (1 − 0.02)³⁰ = 0.98³⁰.",
            "1 − 0.98³⁰ = 1 − 0.5455.",
          ],
          answer:
            "≈ 0.4545 — a 2% daily risk is close to a coin flip over a month, which surprises most people.",
        },
      ],
    },

    {
      heading: "Mean, variance, and the MGF",
      blocks: [
        {
          kind: "table",
          headers: ["Quantity", "Bernoulli(p)", "Binomial(n, p)"],
          rows: [
            ["Mean", "p", "np"],
            ["Variance", "p(1 − p)", "np(1 − p)"],
            ["MGF", "(1 − p) + peᵗ", "[(1 − p) + peᵗ]ⁿ"],
          ],
          caption: "The binomial values are exactly n times the Bernoulli ones — no coincidence.",
        },
        {
          kind: "prose",
          text:
            "Both moments follow immediately from the decomposition X = ΣXᵢ. Linearity of " +
            "expectation gives E[X] = ΣE[Xᵢ] = np with no independence needed at all. Variance does " +
            "need independence: because the trials are independent, the covariance terms vanish and the " +
            "variances simply add, giving np(1 − p).",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why variance peaks at p = ½",
          text:
            "Var = np(1 − p) is largest at p = ½ because that is where a single trial is least " +
            "predictable. As p approaches 0 or 1 each trial becomes nearly deterministic, so the count " +
            "barely varies. This is the same p(1 − p) shape that reappears later as Gini impurity in " +
            "decision trees — Gini for a binary split is exactly 2p(1 − p).",
        },
      ],
    },

    {
      heading: "Properties worth knowing",
      blocks: [
        {
          kind: "list",
          items: [
            "Bernoulli(p) = Binomial(1, p) — the n = 1 case, which licenses the sum decomposition.",
            "If X ~ Bin(n₁, p) and Y ~ Bin(n₂, p) are independent and share the same p, then " +
              "X + Y ~ Bin(n₁ + n₂, p). If their p differ, the sum is not binomial.",
            "The distribution is symmetric only when p = ½; otherwise it is skewed toward the more " +
              "likely outcome.",
            "The mode is ⌊(n + 1)p⌋, which need not equal the mean np — the mean of a " +
              "discrete distribution need not be an attainable value.",
            "The MLE of p from an observed count k is simply k/n, the sample proportion.",
          ],
        },
      ],
    },

    {
      heading: "Two useful approximations",
      blocks: [
        {
          kind: "prose",
          text:
            "The binomial is exact but its sums get unwieldy for large n, so two limiting approximations " +
            "come up constantly.",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "Poisson, when n is large and p small",
              description:
                "With np = λ held fixed as n → ∞, Binomial(n, p) → Poisson(λ). Good " +
                "for rare events over many opportunities — typos per page, defects per batch.",
            },
            {
              term: "Normal, when np and n(1−p) are both large",
              description:
                "By the central limit theorem the count is approximately Normal(np, np(1−p)). The " +
                "usual rule of thumb is np ≥ 10 and n(1 − p) ≥ 10; when p is extreme, the " +
                "Poisson approximation is the better choice.",
            },
          ],
        },
      ],
    },

    {
      heading: "Where the binomial gets misapplied",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Two free throws are not Binomial(2, p)",
          text:
            "Making the first shot plausibly changes the probability of making the second — confidence, " +
            "rhythm, and having just calibrated distance all point the same way — so the trials are not " +
            "independent. The consequence is measurable: if the shots are positively correlated, " +
            "Var(X) = 2p(1−p) + 2Cov exceeds the binomial's 2p(1−p), so you would see more 0s and 2s " +
            "and fewer 1s than the model predicts.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Drawing cards is not binomial",
          text:
            "Count the hearts in 5 cards drawn from a deck and p genuinely changes after each draw " +
            "(13/52, then 12/51 or 13/51, …). That is the hypergeometric distribution. The binomial " +
            "becomes a good approximation only when the sample is small relative to the population — " +
            "the usual rule of thumb is n < 10% of N.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "A random number of trials is not binomial",
          text:
            "If you keep inspecting until you find 5 defects, n is not fixed in advance — it is itself " +
            "random, and is in fact the quantity you are modelling. That is the negative binomial. " +
            "Substituting n's average value and using a binomial discards exactly the variability you " +
            "care about.",
        },
      ],
    },

    {
      heading: "Worked example: recovering the parameters",
      blocks: [
        {
          kind: "example",
          title: "From moments back to n and p",
          problem: "A binomial distribution has mean 6 and variance 2.4. Find n and p.",
          steps: [
            "np = 6 and np(1 − p) = 2.4.",
            "Divide the second by the first: (1 − p) = 2.4 / 6 = 0.4.",
            "So p = 0.6, and n = 6 / 0.6.",
          ],
          answer: "n = 10, p = 0.6",
        },
        {
          kind: "prose",
          text:
            "This kind of problem is worth practising because it cannot be pattern-matched to a single " +
            "formula — it forces you to hold both moments at once and see that their ratio isolates p.",
        },
      ],
    },
  ],

  references: [
    { source: "Casella & Berger, Statistical Inference (2nd ed.)", locator: "§3.2, Discrete Distributions" },
    { source: "Wasserman, All of Statistics", locator: "§2.3, Important Discrete Random Variables" },
    { source: "Blitzstein & Hwang, Introduction to Probability", locator: "Ch. 3, Random Variables and their Distributions" },
    { source: "Mathlingo assessment bank", locator: "assessments/bernoulli-binomial.md" },
  ],
};
