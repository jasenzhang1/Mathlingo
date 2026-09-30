import type { WikiArticle } from "./types";

/**
 * Information Theory — the chapter's nine new articles, in teaching order.
 * `kl-divergence` also belongs to this chapter but its article predates it and
 * lives in `./kl-divergence` (registered in `./core`); `./index` loads both
 * chunks for the domain.
 *
 * One argument runs through them: surprisal is forced to be −log p, entropy is
 * its average, and everything after — conditional entropy, cross-entropy,
 * mutual information, the data processing inequality, maximum entropy — is
 * either an entropy difference or a KL divergence, so non-negativity of KL
 * (Gibbs) does almost all of the proving. Source coding closes the loop by
 * showing entropy is not just a definition but the limit of compression.
 */

const selfInformation: WikiArticle = {
  conceptId: "self-information",
  summary:
    "Self-information, or surprisal, measures how informative it is to learn that an event happened: " +
    "$I(x) = -\\log p(x)$. A certain event tells you nothing; a one-in-a-million event tells you a lot. " +
    "The logarithm is not a stylistic choice — it is the only function that makes the information in two " +
    "independent events add up.",
  sections: [
    {
      heading: "Definition",
      blocks: [
        {
          kind: "formula",
          latex: "I(x) = -\\log_b p(x) = \\log_b \\frac{1}{p(x)}",
          caption: "$b = 2$ gives bits, $b = e$ gives nats; $1$ nat $= 1/\\ln 2 \\approx 1.443$ bits",
        },
        {
          kind: "list",
          items: [
            "$I(x) \\ge 0$, with equality exactly when $p(x) = 1$.",
            "$I$ is decreasing in $p$: rarer outcomes are more surprising.",
            "A fair coin landing heads carries $-\\log_2 \\tfrac{1}{2} = 1$ bit; one face of a fair die carries $\\log_2 6 \\approx 2.585$ bits.",
          ],
        },
      ],
    },
    {
      heading: "Why the logarithm",
      blocks: [
        {
          kind: "prose",
          text:
            "Ask for a function $I(p)$ that is continuous, decreasing, and additive over independent events: learning " +
            "that $A$ and $B$ both happened, with $P(A \\cap B) = P(A)P(B)$, should be worth $I(P(A)) + I(P(B))$. " +
            "So $I(pq) = I(p) + I(q)$ for all $p, q \\in (0, 1]$ — Cauchy's functional equation in multiplicative " +
            "form, whose only continuous solutions are $I(p) = -c \\log p$. The constant $c > 0$ just picks the unit.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Surprisal as code length",
          text:
            "An event of probability $2^{-k}$ can be given a codeword of $k$ bits. Surprisal is the ideal code " +
            "length for an outcome — which is why its average, entropy, turns out to be the limit of compression.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Surprisal adds over independent draws",
          problem: "Two fair dice are rolled. How many bits of information are in learning the outcome is $(6, 6)$?",
          steps: [
            "$P(6, 6) = \\tfrac{1}{36}$, so $I = \\log_2 36$.",
            "Equivalently $I = \\log_2 6 + \\log_2 6 = 2 \\times 2.585$.",
          ],
          answer: "$\\log_2 36 \\approx 5.17$ bits.",
        },
      ],
    },
  ],
  references: [
    { source: "Cover & Thomas, Elements of Information Theory (2nd ed.)", locator: "§2.1" },
    { source: "MacKay, Information Theory, Inference, and Learning Algorithms", locator: "§2.4" },
  ],
};

const shannonEntropy: WikiArticle = {
  conceptId: "shannon-entropy",
  summary:
    "Entropy is the expected surprisal of a random variable: $H(X) = \\mathbb{E}[-\\log p(X)]$. It measures " +
    "uncertainty before you look — zero for a constant, largest for a uniform distribution — and in bits it " +
    "is the average number of yes/no questions an optimal strategy needs to identify the outcome.",
  sections: [
    {
      heading: "Definition and range",
      blocks: [
        {
          kind: "formula",
          latex: "H(X) = -\\sum_{x} p(x) \\log p(x), \\qquad 0 \\le H(X) \\le \\log |\\mathcal{X}|",
          caption: "convention: $0 \\log 0 = 0$, since $p \\log p \\to 0$ as $p \\to 0$",
        },
        {
          kind: "list",
          items: [
            "$H(X) = 0$ iff $X$ is deterministic — one outcome has probability $1$.",
            "$H(X) = \\log |\\mathcal{X}|$ iff $X$ is uniform over its $|\\mathcal{X}|$ outcomes. The upper bound is Jensen's inequality applied to the concave $\\log$: $\\mathbb{E}[\\log \\tfrac{1}{p(X)}] \\le \\log \\mathbb{E}[\\tfrac{1}{p(X)}] = \\log |\\mathcal{X}|$.",
            "Entropy depends only on the probabilities, not on the values: relabelling outcomes, or replacing $X$ by any one-to-one function of it, leaves $H$ unchanged.",
          ],
        },
      ],
    },
    {
      heading: "The binary entropy function",
      blocks: [
        {
          kind: "formula",
          latex: "H_b(p) = -p \\log_2 p - (1 - p) \\log_2 (1 - p)",
          caption: "the entropy of a $\\text{Bernoulli}(p)$ variable; symmetric about $p = 1/2$, where it equals $1$ bit",
        },
        {
          kind: "prose",
          text:
            "$H_b$ is concave, $0$ at both ends and maximal at $p = 1/2$. A coin with $p = 0.9$ has entropy about " +
            "$0.469$ bits — less than half a fair coin's, because you can usually guess the outcome.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Entropy as guessing questions",
          problem: "$X$ takes values $a, b, c, d$ with probabilities $\\tfrac{1}{2}, \\tfrac{1}{4}, \\tfrac{1}{8}, \\tfrac{1}{8}$. Find $H(X)$ in bits and interpret it.",
          steps: [
            "$H = \\tfrac{1}{2}(1) + \\tfrac{1}{4}(2) + \\tfrac{1}{8}(3) + \\tfrac{1}{8}(3)$.",
            "$= 0.5 + 0.5 + 0.375 + 0.375 = 1.75$ bits.",
            "Strategy: ask “is it $a$?” (answers half the time), then “is it $b$?”, then “is it $c$?”. The expected number of questions is exactly $1.75$.",
          ],
          answer: "$H(X) = 1.75$ bits, below the $\\log_2 4 = 2$ bits a uniform distribution on four outcomes would need.",
        },
      ],
    },
  ],
  references: [
    { source: "Cover & Thomas, Elements of Information Theory (2nd ed.)", locator: "§2.1, §2.6" },
    { source: "Shannon, A Mathematical Theory of Communication (1948)", locator: "§6" },
  ],
};

const jointConditionalEntropy: WikiArticle = {
  conceptId: "joint-and-conditional-entropy",
  summary:
    "Joint entropy $H(X, Y)$ is the uncertainty in the pair; conditional entropy $H(Y \\mid X)$ is the " +
    "uncertainty left in $Y$ once $X$ is known, averaged over $X$. The chain rule ties them together — " +
    "$H(X, Y) = H(X) + H(Y \\mid X)$ — and conditioning can only reduce entropy on average.",
  sections: [
    {
      heading: "Definitions",
      blocks: [
        {
          kind: "formula",
          latex: "H(X, Y) = -\\sum_{x, y} p(x, y) \\log p(x, y), \\qquad H(Y \\mid X) = \\sum_x p(x)\\, H(Y \\mid X = x) = -\\sum_{x, y} p(x, y) \\log p(y \\mid x)",
        },
        {
          kind: "prose",
          text:
            "Note what $H(Y \\mid X)$ averages: the entropy of each conditional distribution $p(y \\mid x)$, weighted by " +
            "how often that $x$ occurs. It is a number, not a function of $x$.",
        },
      ],
    },
    {
      heading: "Chain rule and conditioning",
      blocks: [
        {
          kind: "formula",
          latex: "H(X_1, \\ldots, X_n) = \\sum_{i=1}^{n} H(X_i \\mid X_1, \\ldots, X_{i-1}), \\qquad H(Y \\mid X) \\le H(Y)",
          caption: "equality in the second holds iff $X$ and $Y$ are independent",
        },
        {
          kind: "list",
          items: [
            "Chain rule: take $-\\log$ of $p(x, y) = p(x)\\,p(y \\mid x)$ and average.",
            "Subadditivity: $H(X, Y) \\le H(X) + H(Y)$, with equality iff $X \\perp Y$.",
            "$H(Y \\mid X) = 0$ iff $Y$ is a function of $X$.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Only on average",
          text:
            "$H(Y \\mid X) \\le H(Y)$ is about the average over $x$. A particular observation can increase " +
            "uncertainty: learning a rare symptom may make several diagnoses equally plausible, so " +
            "$H(Y \\mid X = x) > H(Y)$ for that $x$.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "A small joint table",
          problem: "$p(0,0) = \\tfrac{1}{2}$, $p(0,1) = \\tfrac{1}{4}$, $p(1,0) = 0$, $p(1,1) = \\tfrac{1}{4}$. Find $H(X, Y)$, $H(X)$ and $H(Y \\mid X)$ in bits.",
          steps: [
            "$H(X, Y) = \\tfrac{1}{2}(1) + \\tfrac{1}{4}(2) + \\tfrac{1}{4}(2) = 1.5$ bits.",
            "$X$ has marginal $(\\tfrac{3}{4}, \\tfrac{1}{4})$, so $H(X) = H_b(0.25) \\approx 0.811$ bits.",
            "Chain rule: $H(Y \\mid X) = 1.5 - 0.811 = 0.689$ bits. Check directly: given $X = 0$, $Y$ is $(\\tfrac{2}{3}, \\tfrac{1}{3})$ with entropy $0.918$; given $X = 1$, $Y = 1$ surely. $\\tfrac{3}{4}(0.918) + \\tfrac{1}{4}(0) = 0.689$.",
          ],
          answer: "$H(X, Y) = 1.5$, $H(X) \\approx 0.811$, $H(Y \\mid X) \\approx 0.689$ bits.",
        },
      ],
    },
  ],
  references: [{ source: "Cover & Thomas, Elements of Information Theory (2nd ed.)", locator: "§2.2, §2.5–2.6" }],
};

const crossEntropy: WikiArticle = {
  conceptId: "cross-entropy",
  summary:
    "Cross-entropy $H(P, Q) = -\\mathbb{E}_P[\\log Q(X)]$ is the average code length when data come from $P$ " +
    "but the code was designed for $Q$. It splits exactly into the unavoidable part, $H(P)$, and the penalty for " +
    "using the wrong model, $D_{\\mathrm{KL}}(P \\,\\|\\, Q)$. Because $H(P)$ does not depend on $Q$, minimising " +
    "cross-entropy over $Q$ is minimising KL — which is why it is the loss behind almost every classifier.",
  sections: [
    {
      heading: "Definition and decomposition",
      blocks: [
        {
          kind: "formula",
          latex: "H(P, Q) = -\\sum_x P(x) \\log Q(x) = H(P) + D_{\\mathrm{KL}}(P \\,\\|\\, Q) \\ge H(P)",
          caption: "equality iff $Q = P$; not symmetric, since $H(P, Q) \\ne H(Q, P)$ in general",
        },
        {
          kind: "list",
          items: [
            "If $Q(x) = 0$ for some $x$ with $P(x) > 0$, then $H(P, Q) = \\infty$: the code has no word for an outcome that happens.",
            "With $P$ the empirical distribution of a sample, $H(\\hat{P}, Q_\\theta) = -\\tfrac{1}{n}\\sum_i \\log Q_\\theta(x_i)$ — the average negative log-likelihood. Minimising cross-entropy is maximum likelihood.",
          ],
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "The price of a wrong model",
          problem: "$P = (\\tfrac{1}{2}, \\tfrac{1}{2})$ and $Q = (\\tfrac{3}{4}, \\tfrac{1}{4})$. Compute $H(P, Q)$ and $D_{\\mathrm{KL}}(P \\,\\|\\, Q)$ in bits.",
          steps: [
            "$H(P, Q) = -\\tfrac{1}{2}\\log_2 \\tfrac{3}{4} - \\tfrac{1}{2}\\log_2 \\tfrac{1}{4} = \\tfrac{1}{2}(0.415) + \\tfrac{1}{2}(2) = 1.208$ bits.",
            "$H(P) = 1$ bit, so $D_{\\mathrm{KL}}(P \\,\\|\\, Q) = 0.208$ bits.",
          ],
          answer: "$H(P, Q) \\approx 1.208$ bits, of which $0.208$ is the penalty for using $Q$.",
        },
      ],
    },
    {
      heading: "Where it shows up",
      blocks: [
        {
          kind: "table",
          headers: ["Setting", "$P$", "$Q$"],
          rows: [
            ["Classification loss", "one-hot true label", "model's softmax output"],
            ["Language modelling", "the next token in the corpus", "the model's next-token distribution; $\\exp$ of cross-entropy in nats is perplexity"],
            ["Compression", "the source", "the model the coder was built for"],
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Cover & Thomas, Elements of Information Theory (2nd ed.)", locator: "§5.4" },
    { source: "Murphy, Probabilistic Machine Learning: An Introduction", locator: "§6.1.6" },
  ],
};

const mutualInformation: WikiArticle = {
  conceptId: "mutual-information",
  summary:
    "Mutual information $I(X; Y)$ is how much knowing one variable reduces uncertainty about the other: " +
    "$I(X; Y) = H(Y) - H(Y \\mid X)$. It is symmetric, never negative, and zero exactly when $X$ and $Y$ are " +
    "independent — unlike correlation, it sees every kind of dependence, not just linear.",
  sections: [
    {
      heading: "Three equivalent forms",
      blocks: [
        {
          kind: "formula",
          latex: "I(X; Y) = H(X) - H(X \\mid Y) = H(X) + H(Y) - H(X, Y) = D_{\\mathrm{KL}}\\big(p(x, y) \\,\\|\\, p(x)\\,p(y)\\big)",
        },
        {
          kind: "list",
          items: [
            "Symmetry $I(X; Y) = I(Y; X)$ is visible in the middle form.",
            "Non-negativity follows from the KL form and Gibbs' inequality; $I = 0$ iff $p(x, y) = p(x)p(y)$ everywhere — independence.",
            "$I(X; X) = H(X)$: entropy is self-information in this sense. And $I(X; Y) \\le \\min(H(X), H(Y))$ for discrete variables.",
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Picture it as a Venn diagram",
          text:
            "Draw $H(X)$ and $H(Y)$ as overlapping circles. The overlap is $I(X; Y)$, the union is $H(X, Y)$, and the " +
            "parts outside the overlap are $H(X \\mid Y)$ and $H(Y \\mid X)$. The picture is exact for two variables — " +
            "but with three, the central region can be negative, so don't lean on it there.",
        },
      ],
    },
    {
      heading: "Gaussian case",
      blocks: [
        {
          kind: "formula",
          latex: "(X, Y) \\text{ bivariate normal with correlation } \\rho: \\qquad I(X; Y) = -\\tfrac{1}{2} \\log(1 - \\rho^2)",
          caption: "for jointly Gaussian variables, mutual information is a function of $\\rho$ alone",
        },
        {
          kind: "prose",
          text:
            "Outside the Gaussian family the two decouple: $Y = X^2$ with $X \\sim \\mathcal{N}(0, 1)$ has " +
            "$\\operatorname{Corr}(X, Y) = 0$ but $Y$ is a function of $X$, so the dependence is total.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "A noisy binary channel",
          problem:
            "$X \\sim \\text{Bernoulli}(\\tfrac{1}{2})$ is sent through a channel that flips it with probability $0.1$, giving $Y$. Find $I(X; Y)$ in bits.",
          steps: [
            "By symmetry $Y$ is also $\\text{Bernoulli}(\\tfrac{1}{2})$, so $H(Y) = 1$.",
            "Given $X$, $Y$ is wrong with probability $0.1$, so $H(Y \\mid X) = H_b(0.1) \\approx 0.469$.",
            "$I(X; Y) = 1 - 0.469$.",
          ],
          answer: "$I(X; Y) \\approx 0.531$ bits — the capacity of this binary symmetric channel.",
        },
      ],
    },
  ],
  references: [
    { source: "Cover & Thomas, Elements of Information Theory (2nd ed.)", locator: "§2.3–2.4, §8.5" },
    { source: "MacKay, Information Theory, Inference, and Learning Algorithms", locator: "§8.1" },
  ],
};

const dataProcessingInequality: WikiArticle = {
  conceptId: "data-processing-inequality",
  summary:
    "If $X \\to Y \\to Z$ is a Markov chain — $Z$ depends on $X$ only through $Y$ — then $I(X; Z) \\le I(X; Y)$. " +
    "No computation on $Y$, however clever, can create information about $X$ that $Y$ did not already carry. " +
    "Equality holds exactly when $Z$ is a sufficient statistic of $Y$ for $X$.",
  sections: [
    {
      heading: "Statement and proof",
      blocks: [
        {
          kind: "formula",
          latex: "X \\to Y \\to Z \\;\\Longrightarrow\\; I(X; Z) \\le I(X; Y)",
          caption: "$X \\to Y \\to Z$ means $X \\perp Z \\mid Y$, i.e. $p(z \\mid x, y) = p(z \\mid y)$",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Expand $I(X; Y, Z)$ with the chain rule for mutual information in two orders: $I(X; Z) + I(X; Y \\mid Z) = I(X; Y) + I(X; Z \\mid Y)$.",
            "The Markov property gives $I(X; Z \\mid Y) = 0$.",
            "So $I(X; Z) = I(X; Y) - I(X; Y \\mid Z) \\le I(X; Y)$, since conditional mutual information is non-negative.",
          ],
        },
      ],
    },
    {
      heading: "Consequences",
      blocks: [
        {
          kind: "list",
          items: [
            "Deterministic processing: $Z = g(Y)$ gives $X \\to Y \\to g(Y)$, so $I(X; g(Y)) \\le I(X; Y)$. Feature engineering can make information easier to use; it cannot add any.",
            "Sufficiency: $T(Y)$ is sufficient for a parameter $\\theta$ iff $I(\\theta; T(Y)) = I(\\theta; Y)$ for every prior on $\\theta$ — the information-theoretic statement of the factorisation theorem.",
            "Deep networks: each layer $h_{k+1} = f(h_k)$ forms a chain $X \\to h_1 \\to h_2 \\to \\cdots$, so $I(X; h_k)$ is non-increasing with depth.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The chain order matters",
          text:
            "The inequality needs $Z$ to be computed from $Y$ alone. If the processing also looks at $X$ — or at fresh " +
            "side information correlated with $X$ — the chain is broken and $I(X; Z)$ can exceed $I(X; Y)$.",
        },
      ],
    },
  ],
  references: [{ source: "Cover & Thomas, Elements of Information Theory (2nd ed.)", locator: "§2.8–2.9" }],
};

const differentialEntropy: WikiArticle = {
  conceptId: "differential-entropy",
  summary:
    "Differential entropy extends entropy to densities: $h(X) = -\\int f(x) \\log f(x)\\, dx$. It keeps most of the " +
    "algebra — chain rule, mutual information — but loses two properties: it can be negative, and it changes " +
    "under rescaling. Differences of differential entropies, such as mutual information, are still fully meaningful.",
  sections: [
    {
      heading: "Definition and standard values",
      blocks: [
        {
          kind: "formula",
          latex: "h(X) = -\\int f(x) \\log f(x)\\, dx",
        },
        {
          kind: "table",
          headers: ["Distribution", "$h(X)$ in nats"],
          rows: [
            ["$\\text{Uniform}(a, b)$", "$\\ln(b - a)$"],
            ["$\\mathcal{N}(\\mu, \\sigma^2)$", "$\\tfrac{1}{2}\\ln(2\\pi e \\sigma^2)$"],
            ["$\\text{Exponential}(\\lambda)$", "$1 - \\ln \\lambda$"],
            ["$\\mathcal{N}_k(\\mu, \\Sigma)$", "$\\tfrac{1}{2}\\ln\\big((2\\pi e)^k \\det \\Sigma\\big)$"],
          ],
        },
        {
          kind: "prose",
          text:
            "$\\text{Uniform}(0, \\tfrac{1}{2})$ has $h = \\ln \\tfrac{1}{2} < 0$. A negative value is not a paradox: a density can " +
            "exceed $1$, so $-\\log f$ can be negative. Differential entropy is not the limit of discrete entropy — quantising " +
            "$X$ into bins of width $\\Delta$ gives $H(X^\\Delta) \\approx h(X) - \\log \\Delta$, which diverges as $\\Delta \\to 0$.",
        },
      ],
    },
    {
      heading: "Transformations",
      blocks: [
        {
          kind: "formula",
          latex: "h(X + c) = h(X), \\qquad h(aX) = h(X) + \\log |a|, \\qquad h(AX) = h(X) + \\log |\\det A|",
          caption: "the $\\log|\\det A|$ term is the same Jacobian correction as in the change-of-variables formula",
        },
      ],
    },
    {
      heading: "The Gaussian maximises it",
      blocks: [
        {
          kind: "prose",
          text:
            "Among all densities with variance $\\sigma^2$, the normal has the largest differential entropy. Proof: for any " +
            "$f$ with that variance and $\\phi$ the matching normal, $0 \\le D_{\\mathrm{KL}}(f \\,\\|\\, \\phi) = -h(f) - \\int f \\log \\phi$, " +
            "and $\\int f \\log \\phi$ depends on $f$ only through its first two moments, so it equals $\\int \\phi \\log \\phi = -h(\\phi)$. " +
            "Hence $h(f) \\le h(\\phi)$.",
        },
      ],
    },
  ],
  references: [{ source: "Cover & Thomas, Elements of Information Theory (2nd ed.)", locator: "§8.1–8.6" }],
};

const maximumEntropy: WikiArticle = {
  conceptId: "maximum-entropy",
  summary:
    "The principle of maximum entropy says: given only some constraints — a known mean, a known variance, a " +
    "known support — pick the distribution with the largest entropy that satisfies them. It is the least committal " +
    "choice, assuming nothing you were not told. The answer always has exponential-family form, which is one " +
    "reason those families appear everywhere.",
  sections: [
    {
      heading: "The general solution",
      blocks: [
        {
          kind: "formula",
          latex: "\\max_p H(p) \\;\\text{s.t.}\\; \\mathbb{E}_p[T_j(X)] = \\mu_j \\;(j = 1, \\ldots, k) \\quad\\Longrightarrow\\quad p^*(x) \\propto \\exp\\Big(\\sum_{j=1}^{k} \\lambda_j T_j(x)\\Big)",
          caption: "the $\\lambda_j$ are Lagrange multipliers chosen so that the constraints hold",
        },
        {
          kind: "prose",
          text:
            "The proof mirrors the Gaussian one. For any feasible $q$, $H(p^*) - H(q) = D_{\\mathrm{KL}}(q \\,\\|\\, p^*) \\ge 0$, " +
            "because $\\log p^*$ is linear in the $T_j$ and so $\\mathbb{E}_q[\\log p^*] = \\mathbb{E}_{p^*}[\\log p^*]$.",
        },
      ],
    },
    {
      heading: "Standard cases",
      blocks: [
        {
          kind: "table",
          headers: ["Constraints", "Maximum-entropy distribution"],
          rows: [
            ["finite support of size $n$, nothing else", "uniform on the $n$ points"],
            ["support $[a, b]$", "$\\text{Uniform}(a, b)$"],
            ["support $[0, \\infty)$, mean $\\mu$", "$\\text{Exponential}(1/\\mu)$"],
            ["support $\\mathbb{R}$, mean $\\mu$, variance $\\sigma^2$", "$\\mathcal{N}(\\mu, \\sigma^2)$"],
            ["support $\\{0, 1, 2, \\ldots\\}$, mean $\\mu$", "geometric"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Maximum entropy meets maximum likelihood",
          text:
            "Fitting an exponential family by maximum likelihood forces its expected sufficient statistics to match their " +
            "sample averages. So the MLE in the family is exactly the maximum-entropy distribution under those " +
            "moment constraints: the two principles are dual. Multinomial logistic regression is the classic example.",
        },
      ],
    },
  ],
  references: [
    { source: "Cover & Thomas, Elements of Information Theory (2nd ed.)", locator: "§12.1–12.2" },
    { source: "Jaynes, Information Theory and Statistical Mechanics (Physical Review, 1957)", locator: "§2" },
  ],
};

const sourceCoding: WikiArticle = {
  conceptId: "source-coding",
  summary:
    "Source coding is where entropy earns its meaning. Any uniquely decodable binary code for $X$ has expected " +
    "length at least $H(X)$ bits, and there is always a prefix code within one bit of it. The Kraft inequality " +
    "says which codeword lengths are achievable; Huffman's algorithm finds the optimal ones.",
  sections: [
    {
      heading: "Prefix codes and Kraft",
      blocks: [
        {
          kind: "formula",
          latex: "\\text{a binary prefix code with lengths } \\ell_1, \\ldots, \\ell_n \\text{ exists} \\iff \\sum_{i=1}^{n} 2^{-\\ell_i} \\le 1",
        },
        {
          kind: "prose",
          text:
            "A prefix code — no codeword is the beginning of another — can be decoded symbol by symbol without lookahead. " +
            "Each codeword of length $\\ell$ is a leaf of a binary tree and claims a $2^{-\\ell}$ share of it, so the shares " +
            "cannot exceed $1$. McMillan showed the same inequality holds for every uniquely decodable code, so restricting " +
            "to prefix codes costs nothing.",
        },
      ],
    },
    {
      heading: "The source coding theorem",
      blocks: [
        {
          kind: "formula",
          latex: "H(X) \\le L^* < H(X) + 1, \\qquad L = \\sum_x p(x)\\,\\ell(x)",
          caption: "$L^*$ is the minimum expected length over prefix codes, in bits",
        },
        {
          kind: "list",
          items: [
            "Lower bound: $L - H(X) = D_{\\mathrm{KL}}(p \\,\\|\\, r) + \\log_2 \\tfrac{1}{c} \\ge 0$, where $r(x) = 2^{-\\ell(x)}/c$ and $c = \\sum 2^{-\\ell(x)} \\le 1$.",
            "Upper bound: Shannon code lengths $\\ell(x) = \\lceil -\\log_2 p(x) \\rceil$ satisfy Kraft and lose less than one bit.",
            "Coding blocks of $n$ symbols together shrinks the overhead to under $1/n$ bit per symbol, so the entropy rate is achievable in the limit.",
            "Using lengths built for the wrong distribution $q$ costs $D_{\\mathrm{KL}}(p \\,\\|\\, q)$ extra bits per symbol — the cross-entropy penalty made concrete.",
          ],
        },
      ],
    },
    {
      heading: "Huffman coding",
      blocks: [
        {
          kind: "example",
          title: "Building a Huffman code",
          problem: "Symbols with probabilities $0.4, 0.3, 0.2, 0.1$. Build a Huffman code and compare its expected length to $H(X)$.",
          steps: [
            "Merge the two smallest, $0.2 + 0.1 = 0.3$. Now $0.4, 0.3, 0.3$.",
            "Merge $0.3 + 0.3 = 0.6$. Now $0.4, 0.6$; merge to $1$.",
            "Lengths: $0.4 \\mapsto 1$, $0.3 \\mapsto 2$, $0.2 \\mapsto 3$, $0.1 \\mapsto 3$. $L = 0.4 + 0.6 + 0.6 + 0.3 = 1.9$ bits.",
            "$H(X) = -\\sum p \\log_2 p \\approx 0.529 + 0.521 + 0.464 + 0.332 = 1.846$ bits.",
          ],
          answer: "$L = 1.9$ bits against $H \\approx 1.846$ — within the one-bit guarantee, and optimal among symbol-by-symbol prefix codes.",
        },
      ],
    },
  ],
  references: [
    { source: "Cover & Thomas, Elements of Information Theory (2nd ed.)", locator: "§5.1–5.8" },
    { source: "Huffman, A Method for the Construction of Minimum-Redundancy Codes (Proc. IRE, 1952)", locator: "full paper" },
  ],
};

export const informationTheoryWikis: WikiArticle[] = [
  selfInformation,
  shannonEntropy,
  jointConditionalEntropy,
  crossEntropy,
  mutualInformation,
  dataProcessingInequality,
  differentialEntropy,
  maximumEntropy,
  sourceCoding,
];
