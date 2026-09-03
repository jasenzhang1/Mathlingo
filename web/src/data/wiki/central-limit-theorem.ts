import type { WikiArticle } from "./types";

export const centralLimitTheoremWiki: WikiArticle = {
  conceptId: "central-limit-theorem",
  summary:
    "The central limit theorem says that when you average many independent draws from the same " +
    "distribution, the averaging itself imposes a Normal shape — whatever the population looked " +
    "like, as long as its variance is finite. It is the reason a single family of tables and " +
    "z-scores serves an entire discipline: the sampling distribution of a mean is approximately " +
    "Normal even when the data are skewed, discrete, or bounded.",

  sections: [
    {
      heading: "The statement",
      blocks: [
        {
          kind: "prose",
          text:
            "Let X₁, X₂, … be independent and identically distributed with mean μ and finite " +
            "variance σ². Form the sample mean X̄ₙ = (1/n)ΣXᵢ. Then the standardised mean converges " +
            "in distribution to a standard Normal.",
        },
        {
          kind: "formula",
          latex: "√n (X̄ₙ − μ) / σ  →ᵈ  N(0, 1)   as n → ∞",
          caption: "The Lindeberg–Lévy central limit theorem",
        },
        {
          kind: "prose",
          text:
            "Read the three moving parts separately. Subtracting μ centres the mean at zero. " +
            "Dividing by σ puts it on a scale-free footing. The √n factor is the interesting one: " +
            "it is exactly the magnification needed to keep the fluctuations from collapsing to a " +
            "point, and getting it wrong is the most common way to mis-state the theorem.",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "Convergence in distribution",
              description:
                "The CDFs converge pointwise at every continuity point. It says nothing about any " +
                "individual X̄ₙ getting close to a Normal random variable — only that its " +
                "distribution does.",
            },
            {
              term: "Finite variance",
              description:
                "The one assumption that genuinely cannot be dropped. Heavy-tailed populations " +
                "such as the Cauchy have no finite σ², and their sample means do not become Normal " +
                "at any n — a Cauchy sample mean is Cauchy again, forever.",
            },
            {
              term: "Identically distributed",
              description:
                "Convenient, not essential. Lyapunov's and Lindeberg's conditions extend the result " +
                "to non-identical summands, provided no single term dominates the sum.",
            },
          ],
        },
      ],
    },

    {
      heading: "The practical form",
      blocks: [
        {
          kind: "prose",
          text:
            "In use you almost never manipulate the limit statement directly. You use the " +
            "finite-n approximation it licenses, in one of two equivalent shapes depending on " +
            "whether the question is about a total or an average.",
        },
        {
          kind: "formula",
          latex: "X̄ₙ ≈ N(μ, σ²/n)   and   ΣXᵢ ≈ N(nμ, nσ²)",
          caption: "Approximate sampling distributions of the mean and of the sum",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The √n that shows up everywhere",
          text:
            "SD(X̄ₙ) = σ/√n is the standard error, and its √n is the same √n as in the theorem. " +
            "It is the reason quadrupling a sample only halves the uncertainty — an economic fact " +
            "about data collection that falls straight out of the variance of a sum of independent " +
            "terms, Var(ΣXᵢ) = nσ².",
        },
        {
          kind: "example",
          title: "A mean, approximated",
          problem:
            "A population has mean 50 and variance 100. A sample of n = 64 is drawn. What is the " +
            "approximate distribution of X̄, and what is P(X̄ > 52)?",
          steps: [
            "By the CLT, X̄ ≈ N(50, 100/64) = N(50, 1.5625).",
            "So SD(X̄) = √1.5625 = 1.25.",
            "z = (52 − 50)/1.25 = 1.60.",
            "P(X̄ > 52) = 1 − Φ(1.60).",
          ],
          answer:
            "X̄ ≈ N(50, 1.5625); P(X̄ > 52) ≈ 0.055. Note the population's shape never entered the " +
            "calculation — only its mean and variance did.",
        },
      ],
    },

    {
      heading: "Why it is true: the MGF argument",
      blocks: [
        {
          kind: "prose",
          text:
            "The cleanest proof at this level goes through moment generating functions, using the " +
            "fact that convergence of MGFs on a neighbourhood of 0 implies convergence in " +
            "distribution. Standardise first: let Yᵢ = (Xᵢ − μ)/σ, so E[Yᵢ] = 0 and Var(Yᵢ) = 1.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Expand the MGF of a single standardised term near t = 0: " +
              "M_Y(t) = 1 + t·E[Y] + t²·E[Y²]/2 + o(t²) = 1 + t²/2 + o(t²), since E[Y] = 0 and E[Y²] = 1.",
            "The quantity in the theorem is Sₙ = (1/√n)ΣYᵢ. Because the Yᵢ are independent, " +
              "M_Sₙ(t) = [M_Y(t/√n)]ⁿ.",
            "Substitute the expansion: [1 + t²/(2n) + o(1/n)]ⁿ.",
            "Take n → ∞. This is the classic (1 + a/n)ⁿ → eᵃ limit with a = t²/2, giving e^(t²/2).",
            "e^(t²/2) is exactly the standard Normal's MGF, and MGFs determine distributions " +
              "uniquely — so Sₙ →ᵈ N(0, 1).",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Where the Normal actually comes from",
          text:
            "Notice which moments survived: only the first two. Everything about the population " +
            "beyond its mean and variance sat inside the o(t²) term and was annihilated by the " +
            "limit. That is the whole content of the theorem — the √n scaling is precisely the rate " +
            "at which all higher-order structure washes out, leaving a distribution determined by " +
            "two numbers. The Normal is what is left when nothing but the first two moments survives.",
        },
        {
          kind: "prose",
          text:
            "The argument as written assumes the MGF exists in a neighbourhood of zero, which is " +
            "stronger than the theorem needs. Replacing M with the characteristic function " +
            "φ(t) = E[e^(itX)], which always exists, gives the same proof under the theorem's actual " +
            "hypotheses. Nothing in the structure changes; only the analytic bookkeeping does.",
        },
      ],
    },

    {
      heading: "CLT versus the law of large numbers",
      blocks: [
        {
          kind: "table",
          headers: ["", "Law of large numbers", "Central limit theorem"],
          rows: [
            ["What it describes", "Where X̄ₙ goes", "How X̄ₙ fluctuates on the way"],
            ["Statement", "X̄ₙ → μ", "√n(X̄ₙ − μ)/σ →ᵈ N(0,1)"],
            ["Scaling", "None — the deviation vanishes", "Magnified by √n so it does not vanish"],
            ["What you get", "A single point", "A whole distribution"],
          ],
          caption: "Two theorems about the same quantity, at two different resolutions.",
        },
        {
          kind: "prose",
          text:
            "The LLN says X̄ₙ − μ → 0. That is true and it is also, on its own, uninformative: it " +
            "tells you the error disappears but not how large it is at the n you actually have. The " +
            "CLT is what you get by zooming in on that vanishing error at exactly the right rate. " +
            "Multiply the difference by √n — fast enough to stop it collapsing, slow enough that it " +
            "does not blow up — and a stable, describable shape appears.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Every confidence interval is this",
          text:
            "x̄ ± 1.96·s/√n is the CLT written out. The interval's width comes from the σ/√n " +
            "standard error, and the 1.96 comes from the Normal limit — neither number is available " +
            "from the LLN, which is why interval estimation needs the stronger theorem.",
        },
      ],
    },

    {
      heading: "How large must n be?",
      blocks: [
        {
          kind: "prose",
          text:
            "There is no universal answer, because the theorem is a statement about a limit and not " +
            "about any particular n. The honest version of the question is: how fast does the " +
            "approximation get good? That depends on the population's skewness far more than on " +
            "anything else — the Berry–Esseen theorem bounds the CDF error by roughly " +
            "C·E|X − μ|³ / (σ³√n), so third-moment asymmetry is the quantity that slows convergence.",
        },
        {
          kind: "table",
          headers: ["Population", "Rough n for a good approximation", "Why"],
          rows: [
            ["Symmetric, light tails (e.g. Uniform)", "n ≈ 5–10", "Almost no skew to average away"],
            ["Moderately skewed (e.g. Exponential)", "n ≈ 30–50", "The usual textbook “n ≥ 30” case"],
            ["Heavily skewed (e.g. lognormal income)", "n in the hundreds or more", "Large third moment"],
            ["Binomial with small p", "np ≥ 10 and n(1−p) ≥ 10", "Skew is worst near p = 0 or 1"],
            ["Infinite variance (e.g. Cauchy)", "Never", "The theorem's hypothesis fails"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "“n ≥ 30” is a rule of thumb, not a theorem",
          text:
            "It is a serviceable default for mildly skewed data and badly wrong for heavy-tailed " +
            "data — insurance claims, city sizes, trading returns. When the tail is the thing you " +
            "care about, the CLT approximation is worst precisely in the region of interest, since " +
            "convergence in the tails is slower than in the centre.",
        },
      ],
    },

    {
      heading: "Common misreadings",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "The CLT does not make your data Normal",
          text:
            "It is a statement about the sampling distribution of the mean, not about the " +
            "population and not about the histogram of the observations. Drawing 10,000 " +
            "exponential values gives you an exponential-looking histogram no matter how large the " +
            "sample is. What becomes Normal is the distribution of X̄ across hypothetical repeated " +
            "samples.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "It does not require a Normal population",
          text:
            "This gets the theorem exactly backwards. If the population were already Normal, X̄ " +
            "would be exactly Normal at every n and no limit theorem would be needed. The content " +
            "of the CLT is that it works for populations that are anything but Normal.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Independence is doing real work",
          text:
            "Step 2 of the proof — factoring the MGF of the sum into a product — is where " +
            "independence enters, and it is not a technicality. For strongly dependent data " +
            "(a time series with persistent autocorrelation, cluster-sampled observations) the " +
            "effective sample size is smaller than n, and using σ/√n understates the standard error, " +
            "sometimes by a large factor.",
        },
      ],
    },

    {
      heading: "Where it gets used downstream",
      blocks: [
        {
          kind: "list",
          items: [
            "z-tests and t-tests: the test statistic is Normal (or t) because the CLT makes the " +
              "numerator's sampling distribution Normal.",
            "Confidence intervals for a mean or a proportion, including the Normal approximation to " +
              "the binomial, which is the CLT applied to a sum of Bernoulli trials.",
            "The bootstrap's Normal-interval variant, and the delta method, which pushes the CLT " +
              "through a smooth transformation g by way of a first-order Taylor expansion.",
            "Asymptotic normality of maximum likelihood estimators — the score function is a sum of " +
              "iid terms, so the CLT applies to it directly.",
            "Stochastic gradient descent's mini-batch noise, which is approximately Gaussian for the " +
              "same reason and at the same √(batch size) rate.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Casella & Berger, Statistical Inference (2nd ed.)", locator: "§5.5, Convergence Concepts" },
    { source: "Wasserman, All of Statistics", locator: "§5.3–5.4, The Central Limit Theorem" },
    { source: "Blitzstein & Hwang, Introduction to Probability", locator: "§10.3, Central Limit Theorem" },
    { source: "Mathlingo assessment bank", locator: "assessments/mp-01-multivariate-probability.md" },
  ],
};
