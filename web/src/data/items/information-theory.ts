import type { Item, SourceRef } from "../../lib/assessment/types";
import { makeBuilders } from "./authoring";

/**
 * Information Theory — the nine concepts added with the chapter (KL divergence
 * already had its own pool). Eight items per concept, two per cognitive level.
 * Numeric answers were computed by hand and are stated to the precision the
 * stem asks for; the default relative tolerance absorbs rounding.
 */
const AUTHORED: SourceRef = {
  id: "mathlingo-authored-information-theory",
  tier: "generated",
  title: "Mathlingo authored item (information theory)",
};

const { mcq, short, num } = makeBuilders(AUTHORED);

// ---------------------------------------------------------------------------
const SI = "self-information";
const selfInformation: Item[] = [
  mcq(
    { concept: SI, slug: "recall-one-eighth", cognitive: "recall", difficulty: -1.2, seconds: 30,
      stem: "An event has probability $\\tfrac{1}{8}$. What is its self-information in bits?" },
    "$3$ bits",
    [
      ["$\\tfrac{1}{8}$ bit", "si-is-probability", "Reports the probability itself rather than $-\\log_2 p$."],
      ["$-3$ bits", "si-sign", "Drops the minus sign in $-\\log_2 p$; surprisal is never negative."],
      ["$\\ln 8 \\approx 2.08$ bits", "si-nats-as-bits", "Uses the natural log (nats) but labels the result in bits."],
    ],
  ),
  mcq(
    { concept: SI, slug: "recall-why-log", cognitive: "recall", difficulty: -0.6, seconds: 40,
      stem: "Which requirement forces self-information to take the form $I(p) = -c \\log p$?" },
    "The information in two independent events together equals the sum of their individual informations",
    [
      ["Information must lie between $0$ and $1$", "si-bounded", "Surprisal is unbounded above; rare events carry arbitrarily many bits."],
      ["Information must be proportional to $1 - p$", "si-linear", "A linear form does not add over independent events, since $1 - pq \\ne (1 - p) + (1 - q)$."],
      ["The information in an event must equal its probability", "si-is-probability", "Probability decreases the wrong way and multiplies over independent events rather than adding."],
    ],
  ),
  num(
    { concept: SI, slug: "apply-one-percent", cognitive: "apply", difficulty: -0.3, seconds: 45,
      stem: "An event has probability $0.01$. Compute its self-information in bits, to $3$ decimal places." },
    6.644,
  ),
  num(
    { concept: SI, slug: "apply-die-at-least-five", cognitive: "apply", difficulty: -0.2, seconds: 50,
      stem: "A fair six-sided die is rolled. How many bits of information are in learning that the result is at least $5$? Give $3$ decimal places." },
    1.585,
  ),
  short(
    { concept: SI, slug: "explain-certain-event", cognitive: "explain", difficulty: 0.1, seconds: 90,
      stem: "Explain why a sensible measure of information must give $0$ for an event of probability $1$ and must increase as the event becomes less likely." },
    [
      ["certain", "A certain event resolves no uncertainty — you learn nothing you did not already know — so it carries $0$ information; $-\\log 1 = 0$.", 3, true],
      ["monotone", "Rarer events are more surprising and rule out more possibilities, so they should carry more information: $I$ is decreasing in $p$.", 3, true],
      ["additivity", "Mentions that additivity over independent events then pins the form down to $-\\log p$.", 2],
    ],
  ),
  mcq(
    { concept: SI, slug: "explain-one-bit-halving", cognitive: "explain", difficulty: 0.2, seconds: 45,
      stem: "Event $A$ carries $10$ bits of self-information and event $B$ carries $5$ bits. What does that say about their probabilities?" },
    "$A$ is $2^5 = 32$ times less likely than $B$",
    [
      ["$A$ is twice as unlikely as $B$", "si-linear-in-p", "Treats bits as proportional to improbability; each extra bit halves the probability."],
      ["$A$ is $5$ times less likely than $B$", "si-difference-as-ratio", "Reads the $5$-bit difference as a ratio instead of an exponent of $2$."],
      ["$A$ is more likely than $B$", "si-direction", "Higher surprisal means lower probability, not higher."],
    ],
  ),
  num(
    { concept: SI, slug: "transfer-password", cognitive: "transfer", difficulty: 0.6, seconds: 90,
      stem: "A password is $8$ characters, each drawn independently and uniformly from $62$ symbols (letters and digits). What is the self-information of one particular password, in bits? Give $1$ decimal place." },
    47.6,
    0.005,
  ),
  short(
    { concept: SI, slug: "transfer-log-loss-zero", cognitive: "transfer", difficulty: 0.8, seconds: 120,
      stem: "A classifier's log loss on one example is the surprisal $-\\log \\hat{p}(y)$ of the true label under its prediction. Explain why predicting $\\hat{p}(y) = 0$ for a label that then occurs is treated as catastrophic, and what practitioners do about it." },
    [
      ["infinite", "The surprisal $-\\log 0$ is infinite, so a single such example makes the average loss infinite.", 3, true],
      ["meaning", "An outcome assigned probability $0$ has no finite code length / the model claimed it impossible, which the data refutes outright.", 2],
      ["remedy", "Probabilities are clipped away from $0$ (e.g. $[\\epsilon, 1 - \\epsilon]$), smoothed, or produced by a softmax that is never exactly $0$.", 3, true],
    ],
  ),
];

// ---------------------------------------------------------------------------
const H = "shannon-entropy";
const shannonEntropy: Item[] = [
  mcq(
    { concept: H, slug: "recall-uniform", cognitive: "recall", difficulty: -1.0, seconds: 30,
      stem: "What is the entropy, in bits, of a random variable uniform on $n$ outcomes?" },
    "$\\log_2 n$",
    [
      ["$n$", "entropy-is-count", "Confuses the number of outcomes with the bits needed to name one."],
      ["$\\tfrac{1}{n}$", "entropy-is-probability", "Gives the probability of each outcome, not the expected surprisal."],
      ["$1$ bit, whatever $n$ is", "entropy-always-one", "Only a fair coin ($n = 2$) has entropy $1$ bit."],
    ],
  ),
  mcq(
    { concept: H, slug: "recall-zero", cognitive: "recall", difficulty: -0.8, seconds: 30,
      stem: "When is the entropy $H(X)$ of a discrete random variable equal to $0$?" },
    "Exactly when one outcome has probability $1$",
    [
      ["When $X$ is uniform", "entropy-zero-uniform", "Uniform is the maximum-entropy case, not the minimum."],
      ["When $\\mathbb{E}[X] = 0$", "entropy-depends-on-values", "Entropy depends only on the probabilities, never on the values $X$ takes."],
      ["Never — entropy is always positive", "entropy-strictly-positive", "A deterministic variable has no uncertainty and so zero entropy."],
    ],
  ),
  num(
    { concept: H, slug: "apply-half-quarter-quarter", cognitive: "apply", difficulty: -0.4, seconds: 45,
      stem: "$X$ takes three values with probabilities $\\tfrac{1}{2}, \\tfrac{1}{4}, \\tfrac{1}{4}$. Compute $H(X)$ in bits." },
    1.5,
  ),
  num(
    { concept: H, slug: "apply-biased-coin", cognitive: "apply", difficulty: 0.0, seconds: 60,
      stem: "A coin lands heads with probability $0.9$. Compute its entropy in bits, to $3$ decimal places." },
    0.469,
  ),
  short(
    { concept: H, slug: "explain-upper-bound", cognitive: "explain", difficulty: 0.6, seconds: 120,
      stem: "Show that $H(X) \\le \\log |\\mathcal{X}|$ for a variable on $|\\mathcal{X}|$ outcomes, and say when equality holds." },
    [
      ["jensen", "Writes $H(X) = \\mathbb{E}[\\log \\tfrac{1}{p(X)}]$ and applies Jensen to the concave $\\log$: $H(X) \\le \\log \\mathbb{E}[\\tfrac{1}{p(X)}]$.", 4, true],
      ["count", "$\\mathbb{E}[\\tfrac{1}{p(X)}] = \\sum_x p(x) \\cdot \\tfrac{1}{p(x)} = |\\mathcal{X}|$ (over outcomes with positive probability).", 3, true],
      ["equality", "Equality iff $\\tfrac{1}{p(X)}$ is constant, i.e. $X$ is uniform.", 2],
    ],
  ),
  mcq(
    { concept: H, slug: "explain-relabel", cognitive: "explain", difficulty: 0.1, seconds: 45,
      stem: "$X$ is a discrete random variable and $Y = 2X + 3$. How does $H(Y)$ compare with $H(X)$?" },
    "They are equal: the map is one-to-one, so $Y$ has the same probabilities on relabelled outcomes",
    [
      ["$H(Y) = H(X) + 1$ bit", "entropy-scale-shift", "Applies the differential-entropy rule $h(aX) = h(X) + \\log|a|$ to a discrete variable."],
      ["$H(Y) = 2H(X)$", "entropy-linear", "Entropy is not a linear functional of the values."],
      ["$H(Y) = 2H(X) + 3$", "entropy-transforms-like-x", "Treats entropy as if it transformed like the variable itself."],
    ],
  ),
  num(
    { concept: H, slug: "transfer-twenty-questions", cognitive: "transfer", difficulty: 0.3, seconds: 60,
      stem: "One of $1000$ equally likely items is secretly chosen. What is the minimum number of yes/no questions that guarantees identifying it?" },
    10,
    0.001,
  ),
  short(
    { concept: H, slug: "transfer-information-gain", cognitive: "transfer", difficulty: 0.7, seconds: 120,
      stem: "A decision tree node holds $8$ positive and $8$ negative examples. Split $A$ sends them to children with $(8, 0)$ and $(0, 8)$; split $B$ gives $(4, 4)$ and $(4, 4)$. Using entropy, explain which split a tree prefers and why." },
    [
      ["parent", "The parent has entropy $1$ bit (a $50/50$ mix).", 2],
      ["split-a", "Split $A$'s children are pure, entropy $0$, so its information gain is $1$ bit.", 3, true],
      ["split-b", "Split $B$'s children are still $50/50$, entropy $1$, so its gain is $0$ — it tells you nothing about the label.", 3, true],
      ["prefer", "The tree picks the split with the larger reduction in weighted entropy: $A$.", 1],
    ],
  ),
];

// ---------------------------------------------------------------------------
const JC = "joint-and-conditional-entropy";
const jointConditional: Item[] = [
  mcq(
    { concept: JC, slug: "recall-chain-rule", cognitive: "recall", difficulty: -0.6, seconds: 35,
      stem: "Which identity is the chain rule for entropy?" },
    "$H(X, Y) = H(X) + H(Y \\mid X)$",
    [
      ["$H(X, Y) = H(X) + H(Y)$", "chain-rule-assumes-independence", "Holds only when $X$ and $Y$ are independent."],
      ["$H(X, Y) = H(X) \\cdot H(Y \\mid X)$", "chain-rule-multiplies", "Probabilities multiply; their logarithms, and so entropies, add."],
      ["$H(Y \\mid X) = H(X, Y) + H(X)$", "chain-rule-sign", "Conditional entropy is the joint minus the marginal, not the sum."],
    ],
  ),
  mcq(
    { concept: JC, slug: "recall-function", cognitive: "recall", difficulty: -0.4, seconds: 35,
      stem: "When is $H(Y \\mid X) = 0$?" },
    "When $Y$ is a function of $X$",
    [
      ["When $X$ and $Y$ are independent", "cond-entropy-zero-independent", "Independence gives $H(Y \\mid X) = H(Y)$, the largest it can be."],
      ["When $X$ is a function of $Y$", "cond-entropy-direction", "Reverses the roles: $X = g(Y)$ makes $H(X \\mid Y) = 0$, not $H(Y \\mid X)$."],
      ["When $H(Y) = H(X)$", "cond-entropy-equal-marginals", "Equal marginal entropies say nothing about the dependence between them."],
    ],
  ),
  num(
    { concept: JC, slug: "apply-chain-rule", cognitive: "apply", difficulty: -0.3, seconds: 40,
      stem: "$H(X) = 1.2$ bits and $H(X, Y) = 2.0$ bits. What is $H(Y \\mid X)$ in bits?" },
    0.8,
  ),
  num(
    { concept: JC, slug: "apply-parity", cognitive: "apply", difficulty: 0.2, seconds: 60,
      stem: "$X$ is uniform on $\\{1, 2, 3, 4\\}$ and $Y$ is $1$ if $X$ is odd and $0$ otherwise. Compute $H(X \\mid Y)$ in bits." },
    1,
  ),
  short(
    { concept: JC, slug: "explain-only-on-average", cognitive: "explain", difficulty: 0.7, seconds: 120,
      stem: "Conditioning reduces entropy: $H(Y \\mid X) \\le H(Y)$. Explain why this holds only on average, and give a situation where observing a particular $X = x$ makes $Y$ more uncertain." },
    [
      ["average", "$H(Y \\mid X)$ is the $p(x)$-weighted average of $H(Y \\mid X = x)$; the inequality constrains that average only.", 3, true],
      ["counterexample", "Gives a case where one value $x$ makes the conditional distribution of $Y$ flatter than its marginal — e.g. a rare symptom that makes several diagnoses equally likely.", 3, true],
      ["compensation", "Notes that such $x$ must be compensated by other values that reduce uncertainty more.", 2],
    ],
  ),
  mcq(
    { concept: JC, slug: "explain-subadditivity", cognitive: "explain", difficulty: 0.2, seconds: 40,
      stem: "When does $H(X, Y) = H(X) + H(Y)$ hold?" },
    "Exactly when $X$ and $Y$ are independent",
    [
      ["Always — entropy is additive", "joint-always-additive", "Dependence makes the pair less uncertain than the parts separately; $H(X, Y) \\le H(X) + H(Y)$."],
      ["When $X$ and $Y$ are uncorrelated", "uncorrelated-is-independent", "Zero correlation does not imply independence, and entropy sees all dependence."],
      ["When $H(X) = H(Y)$", "joint-equal-marginals", "Equal marginal entropies say nothing about how the variables depend on each other."],
    ],
  ),
  num(
    { concept: JC, slug: "transfer-dice-sum", cognitive: "transfer", difficulty: 0.4, seconds: 60,
      stem: "Two fair dice are rolled; $D_1$ is the first die and $S$ the sum. Compute $H(S \\mid D_1)$ in bits, to $3$ decimal places." },
    2.585,
  ),
  short(
    { concept: JC, slug: "transfer-language-context", cognitive: "transfer", difficulty: 0.6, seconds: 120,
      stem: "The entropy of the next word in English is far lower given the previous ten words than given none. Use conditional entropy and the chain rule to explain why, and what the chain rule says about the entropy of a whole sentence." },
    [
      ["conditioning", "Context constrains the next word, so $H(W_t \\mid W_{t-10}, \\ldots, W_{t-1}) \\le H(W_t)$ — conditioning reduces entropy on average.", 3, true],
      ["chain", "By the chain rule, $H(W_1, \\ldots, W_n) = \\sum_t H(W_t \\mid W_1, \\ldots, W_{t-1})$: a sentence's entropy is the sum of the next-word conditional entropies.", 3, true],
      ["lm", "Links this to language models, which predict each word from its context.", 1],
    ],
  ),
];

// ---------------------------------------------------------------------------
const CE = "cross-entropy";
const crossEntropy: Item[] = [
  mcq(
    { concept: CE, slug: "recall-decomposition", cognitive: "recall", difficulty: -0.5, seconds: 35,
      stem: "Which decomposition of the cross-entropy $H(P, Q)$ is correct?" },
    "$H(P, Q) = H(P) + D_{\\mathrm{KL}}(P \\,\\|\\, Q)$",
    [
      ["$H(P, Q) = H(Q) + D_{\\mathrm{KL}}(P \\,\\|\\, Q)$", "ce-wrong-entropy", "The unavoidable part is the entropy of the true distribution $P$, not the model $Q$."],
      ["$H(P, Q) = H(P) - D_{\\mathrm{KL}}(P \\,\\|\\, Q)$", "ce-sign", "Using the wrong code can only add bits; KL is added, and $H(P, Q) \\ge H(P)$."],
      ["$H(P, Q) = H(P) + H(Q)$", "ce-sum-of-entropies", "Cross-entropy is not a sum of two entropies; it is $-\\mathbb{E}_P[\\log Q]$."],
    ],
  ),
  mcq(
    { concept: CE, slug: "recall-zero-prob", cognitive: "recall", difficulty: -0.3, seconds: 35,
      stem: "$Q(x) = 0$ for some outcome $x$ with $P(x) > 0$. What is $H(P, Q)$?" },
    "Infinite",
    [
      ["$0$", "ce-zero-ignored", "The term $-P(x) \\log Q(x)$ is $+\\infty$, not $0$; only $P(x) = 0$ terms vanish."],
      ["$H(P)$", "ce-equals-entropy", "Cross-entropy equals $H(P)$ only when $Q = P$."],
      ["Undefined, so that outcome is skipped", "ce-skip-term", "The outcome happens under $P$, so its infinite code length is charged."],
    ],
  ),
  num(
    { concept: CE, slug: "apply-classifier-loss", cognitive: "apply", difficulty: -0.2, seconds: 45,
      stem: "The true class is class $2$ and a classifier outputs probabilities $(0.2, 0.7, 0.1)$ for classes $1, 2, 3$. Compute the cross-entropy loss in nats, to $3$ decimal places." },
    0.357,
  ),
  num(
    { concept: CE, slug: "apply-two-point", cognitive: "apply", difficulty: 0.2, seconds: 60,
      stem: "$P = (\\tfrac{1}{2}, \\tfrac{1}{2})$ and $Q = (\\tfrac{1}{4}, \\tfrac{3}{4})$. Compute $H(P, Q)$ in bits, to $3$ decimal places." },
    1.208,
  ),
  short(
    { concept: CE, slug: "explain-mle", cognitive: "explain", difficulty: 0.5, seconds: 120,
      stem: "Explain why minimising the cross-entropy $H(\\hat{P}, Q_\\theta)$ between the empirical distribution $\\hat{P}$ of a sample and a model $Q_\\theta$ is the same as maximum likelihood, and why it is also the same as minimising $D_{\\mathrm{KL}}(\\hat{P} \\,\\|\\, Q_\\theta)$." },
    [
      ["nll", "$H(\\hat{P}, Q_\\theta) = -\\tfrac{1}{n}\\sum_i \\log Q_\\theta(x_i)$, the average negative log-likelihood, so minimising it maximises the likelihood.", 4, true],
      ["kl", "$H(\\hat{P}, Q_\\theta) = H(\\hat{P}) + D_{\\mathrm{KL}}(\\hat{P} \\,\\|\\, Q_\\theta)$ and $H(\\hat{P})$ does not depend on $\\theta$, so the minimisers coincide.", 4, true],
    ],
  ),
  mcq(
    { concept: CE, slug: "explain-asymmetry", cognitive: "explain", difficulty: 0.3, seconds: 45,
      stem: "Is $H(P, Q) = H(Q, P)$ in general?" },
    "No — the expectation is taken under the first argument, so swapping them changes both the weights and the logs",
    [
      ["Yes, like any entropy it is symmetric", "ce-symmetric", "Cross-entropy inherits KL's asymmetry; only the entropy of a joint distribution is symmetric in its arguments."],
      ["Yes, whenever $H(P) = H(Q)$", "ce-symmetric-equal-entropy", "Equal entropies leave the KL terms $D_{\\mathrm{KL}}(P \\| Q)$ and $D_{\\mathrm{KL}}(Q \\| P)$ generally unequal."],
      ["No, because $H(Q, P)$ is always larger", "ce-order", "Neither direction is always larger; it depends on the distributions."],
    ],
  ),
  num(
    { concept: CE, slug: "transfer-perplexity", cognitive: "transfer", difficulty: 0.4, seconds: 50,
      stem: "A language model's average cross-entropy on held-out text is $2.3$ nats per token. What is its perplexity, $e^{H}$? Give $2$ decimal places." },
    9.97,
  ),
  short(
    { concept: CE, slug: "transfer-label-smoothing", cognitive: "transfer", difficulty: 0.9, seconds: 150,
      stem: "Label smoothing replaces a one-hot target $P$ with $(1 - \\epsilon)P + \\epsilon/K$ over $K$ classes. Using $H(P, Q) = H(P) + D_{\\mathrm{KL}}(P \\,\\|\\, Q)$, explain what this does to the loss a classifier can reach and to the logits it is pushed towards." },
    [
      ["one-hot", "With a one-hot $P$, $H(P) = 0$ and the loss is minimised only as $Q$ puts probability $\\to 1$ on the true class, pushing logits towards infinity.", 3, true],
      ["smoothed", "With the smoothed target, the minimum is at $Q = P$, which has finite logits; the loss floor becomes $H(P) > 0$.", 3, true],
      ["effect", "So the model is discouraged from overconfidence, often improving calibration.", 2],
    ],
  ),
];

// ---------------------------------------------------------------------------
const MI = "mutual-information";
const mutualInformation: Item[] = [
  mcq(
    { concept: MI, slug: "recall-zero", cognitive: "recall", difficulty: -0.6, seconds: 35,
      stem: "When is $I(X; Y) = 0$?" },
    "Exactly when $X$ and $Y$ are independent",
    [
      ["Exactly when $X$ and $Y$ are uncorrelated", "mi-is-correlation", "Zero correlation rules out only linear dependence; mutual information detects every kind."],
      ["When $H(X) = H(Y)$", "mi-equal-entropies", "Equal entropies say nothing about how much the variables share."],
      ["Never — mutual information is always positive", "mi-strictly-positive", "It is non-negative and equals $0$ under independence."],
    ],
  ),
  mcq(
    { concept: MI, slug: "recall-identity", cognitive: "recall", difficulty: -0.4, seconds: 35,
      stem: "Which expression equals $I(X; Y)$?" },
    "$H(X) + H(Y) - H(X, Y)$",
    [
      ["$H(X, Y) - H(X) - H(Y)$", "mi-sign", "This is $-I(X; Y)$, which is never positive."],
      ["$H(X \\mid Y) + H(Y \\mid X)$", "mi-conditional-sum", "That is the part of the joint entropy outside the overlap, not the overlap itself."],
      ["$D_{\\mathrm{KL}}\\big(p(x)\\,p(y) \\,\\|\\, p(x, y)\\big)$", "mi-kl-order", "The KL form has the joint first: $D_{\\mathrm{KL}}\\big(p(x, y) \\,\\|\\, p(x)p(y)\\big)$."],
    ],
  ),
  num(
    { concept: MI, slug: "apply-bsc", cognitive: "apply", difficulty: 0.2, seconds: 75,
      stem: "A fair bit $X$ is sent through a channel that flips it with probability $0.2$, producing $Y$. Compute $I(X; Y)$ in bits, to $3$ decimal places." },
    0.278,
  ),
  num(
    { concept: MI, slug: "apply-gaussian", cognitive: "apply", difficulty: 0.3, seconds: 60,
      stem: "$(X, Y)$ is bivariate normal with correlation $\\rho = 0.8$. Compute $I(X; Y) = -\\tfrac{1}{2}\\ln(1 - \\rho^2)$ in nats, to $3$ decimal places." },
    0.511,
  ),
  short(
    { concept: MI, slug: "explain-uncorrelated-dependent", cognitive: "explain", difficulty: 0.5, seconds: 100,
      stem: "Give an example of random variables with zero correlation but positive mutual information, and explain why mutual information catches the dependence." },
    [
      ["example", "An example such as $X \\sim \\mathcal{N}(0, 1)$ (or uniform on $\\{-1, 0, 1\\}$) and $Y = X^2$: $\\operatorname{Cov}(X, Y) = \\mathbb{E}[X^3] = 0$.", 3, true],
      ["dependent", "$Y$ is a function of $X$, so $p(x, y) \\ne p(x)p(y)$ and $I(X; Y) > 0$.", 3, true],
      ["why", "Correlation measures only linear association; mutual information is the KL from the joint to the product of marginals, zero only under full independence.", 2],
    ],
  ),
  mcq(
    { concept: MI, slug: "explain-self", cognitive: "explain", difficulty: 0.0, seconds: 35,
      stem: "For a discrete random variable $X$, what is $I(X; X)$?" },
    "$H(X)$ — knowing $X$ removes all of its uncertainty",
    [
      ["$0$", "mi-self-zero", "A variable is maximally dependent on itself, not independent of it."],
      ["$2H(X)$", "mi-self-double", "Applies $H(X) + H(X)$ but forgets to subtract $H(X, X) = H(X)$."],
      ["Infinite", "mi-self-infinite", "Infinite self-information arises for continuous variables; for discrete $X$ it is $H(X)$."],
    ],
  ),
  num(
    { concept: MI, slug: "transfer-feature-selection", cognitive: "transfer", difficulty: 0.1, seconds: 45,
      stem: "A binary label $Y$ has $H(Y) = 1$ bit. Feature $X_1$ gives $H(Y \\mid X_1) = 0.6$ bits and feature $X_2$ gives $H(Y \\mid X_2) = 0.85$ bits. What is the larger of the two mutual informations $I(X_i; Y)$, in bits?" },
    0.4,
  ),
  short(
    { concept: MI, slug: "transfer-invariance", cognitive: "transfer", difficulty: 0.8, seconds: 120,
      stem: "Mutual information is unchanged if $X$ is replaced by any invertible transformation $f(X)$. Explain why, and why this makes it attractive for screening features compared with correlation." },
    [
      ["why", "An invertible map loses no information: $I(f(X); Y) \\le I(X; Y)$ and $I(X; Y) = I(f^{-1}(f(X)); Y) \\le I(f(X); Y)$ by the data processing inequality, so they are equal.", 3, true],
      ["screening", "A feature related to the target through a monotone or nonlinear curve scores the same as if it had been perfectly transformed, whereas correlation can miss or understate such relationships.", 3, true],
      ["caveat", "Notes that MI must be estimated, and estimates from finite samples are biased or noisy.", 1],
    ],
  ),
];

// ---------------------------------------------------------------------------
const DPI = "data-processing-inequality";
const dataProcessing: Item[] = [
  mcq(
    { concept: DPI, slug: "recall-statement", cognitive: "recall", difficulty: -0.5, seconds: 35,
      stem: "$X \\to Y \\to Z$ is a Markov chain. What does the data processing inequality state?" },
    "$I(X; Z) \\le I(X; Y)$",
    [
      ["$I(X; Z) \\ge I(X; Y)$", "dpi-direction", "Processing $Y$ can only lose information about $X$, never gain it."],
      ["$H(Z) \\le H(Y)$", "dpi-entropy", "The inequality is about information shared with $X$, not the entropy of the processed variable; a noisy $Z$ can have higher entropy."],
      ["$I(X; Z) = I(X; Y)$", "dpi-equality", "Equality needs $Z$ to be sufficient for $X$; in general information is lost."],
    ],
  ),
  mcq(
    { concept: DPI, slug: "recall-equality", cognitive: "recall", difficulty: -0.1, seconds: 40,
      stem: "For a Markov chain $X \\to Y \\to Z$, when is $I(X; Z) = I(X; Y)$?" },
    "When $Z$ is a sufficient statistic of $Y$ for $X$, so $X \\to Z \\to Y$ is also a Markov chain",
    [
      ["Whenever $Z$ is a deterministic function of $Y$", "dpi-deterministic-lossless", "Deterministic maps can still discard information, e.g. $Z = 0$."],
      ["When $H(Z) = H(Y)$", "dpi-entropy-equality", "Equal entropy is neither necessary nor sufficient for keeping the information about $X$."],
      ["Never", "dpi-strict", "Invertible maps or sufficient statistics keep all of it."],
    ],
  ),
  num(
    { concept: DPI, slug: "apply-chain", cognitive: "apply", difficulty: 0.1, seconds: 50,
      stem: "$X \\to Y \\to Z$ is a Markov chain with $I(X; Y) = 0.8$ bits and $I(X; Y \\mid Z) = 0.3$ bits. What is $I(X; Z)$ in bits?" },
    0.5,
  ),
  mcq(
    { concept: DPI, slug: "apply-broken-chain", cognitive: "apply", difficulty: 0.4, seconds: 50,
      stem: "In which case can $I(X; Z)$ exceed $I(X; Y)$?" },
    "$Z = f(Y, X)$ — the processing also looks at $X$",
    [
      ["$Z = Y^2$", "dpi-nonlinear-escape", "A deterministic function of $Y$ alone forms a Markov chain, so the inequality applies."],
      ["$Z = Y + N$ with noise $N$ independent of $(X, Y)$", "dpi-noise-escape", "Independent noise keeps $X \\to Y \\to Z$ intact."],
      ["$Z$ is the output of a deep network applied to $Y$", "dpi-deep-escape", "However complex, a function of $Y$ alone cannot create information about $X$."],
    ],
  ),
  short(
    { concept: DPI, slug: "explain-proof", cognitive: "explain", difficulty: 0.8, seconds: 150,
      stem: "Prove the data processing inequality for $X \\to Y \\to Z$ using the chain rule for mutual information." },
    [
      ["expand", "Expands $I(X; Y, Z)$ two ways: $I(X; Z) + I(X; Y \\mid Z) = I(X; Y) + I(X; Z \\mid Y)$.", 4, true],
      ["markov", "Uses the Markov property $X \\perp Z \\mid Y$ to set $I(X; Z \\mid Y) = 0$.", 3, true],
      ["conclude", "Concludes $I(X; Z) = I(X; Y) - I(X; Y \\mid Z) \\le I(X; Y)$ since conditional MI is non-negative.", 2],
    ],
  ),
  short(
    { concept: DPI, slug: "explain-feature-engineering", cognitive: "explain", difficulty: 0.5, seconds: 100,
      stem: "The data processing inequality says transforming features cannot add information about the label. Why, then, does feature engineering often improve a model's accuracy?" },
    [
      ["usable", "The inequality limits the information available, not how easily a particular model class can extract it; a transform can make existing information usable (e.g. linearly separable).", 4, true],
      ["finite-sample", "With finite data and a restricted model, a good representation reduces variance / sample complexity even though it adds no information.", 3, true],
    ],
  ),
  mcq(
    { concept: DPI, slug: "transfer-deep-network", cognitive: "transfer", difficulty: 0.5, seconds: 45,
      stem: "A feed-forward network computes $h_1 = f_1(X)$, $h_2 = f_2(h_1)$, $h_3 = f_3(h_2)$. What must hold?" },
    "$I(X; h_3) \\le I(X; h_2) \\le I(X; h_1)$",
    [
      ["$I(X; h_3) \\ge I(X; h_2) \\ge I(X; h_1)$", "dpi-depth-increases", "Deeper layers can make information easier to use but cannot contain more of it."],
      ["All three are equal, since the network is deterministic", "dpi-deterministic-preserves", "Deterministic layers can still discard information (e.g. ReLU zeroes out regions)."],
      ["Nothing — the inequality does not apply to neural networks", "dpi-not-general", "Any chain of processing steps forms a Markov chain, so the inequality applies."],
    ],
  ),
  short(
    { concept: DPI, slug: "transfer-sufficiency", cognitive: "transfer", difficulty: 1.0, seconds: 150,
      stem: "$X_1, \\ldots, X_n \\sim \\mathcal{N}(\\mu, 1)$ independently, with a prior on $\\mu$. Explain, using the data processing inequality, why $I(\\mu; \\bar{X}) = I(\\mu; X_1, \\ldots, X_n)$, and what that says about $\\bar{X}$." },
    [
      ["chain", "$\\mu \\to (X_1, \\ldots, X_n) \\to \\bar{X}$ is a Markov chain, so $I(\\mu; \\bar{X}) \\le I(\\mu; X_1, \\ldots, X_n)$.", 3, true],
      ["reverse", "Because $\\bar{X}$ is sufficient, the data given $\\bar{X}$ do not depend on $\\mu$, so $\\mu \\to \\bar{X} \\to (X_1, \\ldots, X_n)$ is also a chain and the reverse inequality holds.", 3, true],
      ["meaning", "Hence $\\bar{X}$ keeps all the information in the sample about $\\mu$ — the information-theoretic meaning of sufficiency.", 2],
    ],
  ),
];

// ---------------------------------------------------------------------------
const DE = "differential-entropy";
const differentialEntropy: Item[] = [
  mcq(
    { concept: DE, slug: "recall-negative", cognitive: "recall", difficulty: -0.4, seconds: 35,
      stem: "Can differential entropy be negative?" },
    "Yes — for example $\\text{Uniform}(0, \\tfrac{1}{2})$ has $h = \\ln \\tfrac{1}{2} < 0$",
    [
      ["No, like discrete entropy it is always non-negative", "de-nonnegative", "A density can exceed $1$, so $-\\log f$ can be negative and so can its average."],
      ["Only for discrete variables", "de-discrete", "Discrete entropy is never negative; differential entropy can be."],
      ["Only when the variance is negative", "de-variance", "Variance is never negative; a small spread is what makes $h$ negative."],
    ],
  ),
  mcq(
    { concept: DE, slug: "recall-scaling", cognitive: "recall", difficulty: -0.1, seconds: 40,
      stem: "How does differential entropy change under $X \\mapsto aX$ for a constant $a \\ne 0$?" },
    "$h(aX) = h(X) + \\log |a|$",
    [
      ["$h(aX) = h(X)$", "de-scale-invariant", "That is the rule for discrete entropy; for densities, stretching spreads the mass and raises $h$."],
      ["$h(aX) = |a|\\, h(X)$", "de-scale-multiplies", "The change is additive in $\\log |a|$, not multiplicative."],
      ["$h(aX) = h(X) + a$", "de-scale-linear", "The correction is $\\log |a|$, the log of the Jacobian."],
    ],
  ),
  num(
    { concept: DE, slug: "apply-uniform", cognitive: "apply", difficulty: -0.5, seconds: 35,
      stem: "Compute the differential entropy of $\\text{Uniform}(0, 4)$ in bits." },
    2,
  ),
  num(
    { concept: DE, slug: "apply-standard-normal", cognitive: "apply", difficulty: 0.1, seconds: 50,
      stem: "Compute the differential entropy of $\\mathcal{N}(0, 1)$ in nats, $\\tfrac{1}{2}\\ln(2\\pi e)$, to $3$ decimal places." },
    1.419,
  ),
  short(
    { concept: DE, slug: "explain-gaussian-max", cognitive: "explain", difficulty: 0.9, seconds: 150,
      stem: "Explain why, among all densities on $\\mathbb{R}$ with variance $\\sigma^2$, the normal has the largest differential entropy." },
    [
      ["kl", "For any such $f$ and the matching normal $\\phi$, $0 \\le D_{\\mathrm{KL}}(f \\,\\|\\, \\phi) = -h(f) - \\int f \\log \\phi$.", 4, true],
      ["moments", "$\\log \\phi$ is quadratic in $x$, so $\\int f \\log \\phi$ depends only on the first two moments and equals $\\int \\phi \\log \\phi = -h(\\phi)$.", 3, true],
      ["conclude", "Hence $h(f) \\le h(\\phi)$, with equality iff $f = \\phi$.", 1],
    ],
  ),
  mcq(
    { concept: DE, slug: "explain-not-limit", cognitive: "explain", difficulty: 0.5, seconds: 50,
      stem: "Quantise a continuous $X$ into bins of width $\\Delta$ to get a discrete $X^\\Delta$. How does $H(X^\\Delta)$ relate to $h(X)$ as $\\Delta \\to 0$?" },
    "$H(X^\\Delta) \\approx h(X) - \\log \\Delta$, which grows without bound",
    [
      ["$H(X^\\Delta) \\to h(X)$", "de-is-limit", "The discrete entropy diverges: pinning a real number down exactly takes infinitely many bits."],
      ["$H(X^\\Delta) \\to 0$", "de-limit-zero", "Finer bins mean more outcomes and more uncertainty, not less."],
      ["$H(X^\\Delta) = h(X)$ for every $\\Delta$", "de-exact", "They differ by about $-\\log \\Delta$, which depends on the bin width."],
    ],
  ),
  num(
    { concept: DE, slug: "transfer-variance-change", cognitive: "transfer", difficulty: 0.3, seconds: 50,
      stem: "By how many nats does the differential entropy of $\\mathcal{N}(0, 4)$ exceed that of $\\mathcal{N}(0, 1)$? Give $3$ decimal places." },
    0.693,
  ),
  short(
    { concept: DE, slug: "transfer-mi-units", cognitive: "transfer", difficulty: 0.8, seconds: 120,
      stem: "Measuring height in centimetres instead of metres changes its differential entropy. Explain why the mutual information between height and weight does not change." },
    [
      ["h-shift", "Rescaling by $a = 100$ adds $\\log 100$ to both $h(X)$ and $h(X \\mid Y)$.", 3, true],
      ["cancel", "$I(X; Y) = h(X) - h(X \\mid Y)$, so the $\\log |a|$ terms cancel.", 3, true],
      ["general", "Mutual information is invariant under invertible transformations, so it is the meaningful quantity for continuous variables.", 2],
    ],
  ),
];

// ---------------------------------------------------------------------------
const ME = "maximum-entropy";
const maximumEntropy: Item[] = [
  mcq(
    { concept: ME, slug: "recall-finite-support", cognitive: "recall", difficulty: -0.8, seconds: 30,
      stem: "With no constraint other than a support of $n$ points, which distribution has maximum entropy?" },
    "The uniform distribution on the $n$ points",
    [
      ["A point mass on one point", "maxent-point-mass", "A point mass has minimum entropy, $0$."],
      ["A binomial distribution", "maxent-binomial", "Any non-uniform distribution has entropy below $\\log n$."],
      ["A normal distribution", "maxent-normal-always", "The normal is the maximum-entropy answer for fixed mean and variance on $\\mathbb{R}$, not for a finite support."],
    ],
  ),
  mcq(
    { concept: ME, slug: "recall-positive-mean", cognitive: "recall", difficulty: -0.4, seconds: 35,
      stem: "Which distribution has maximum entropy among densities on $[0, \\infty)$ with a fixed mean $\\mu$?" },
    "$\\text{Exponential}$ with rate $1/\\mu$",
    [
      ["$\\text{Uniform}(0, 2\\mu)$", "maxent-uniform-mean", "Restricting to a bounded interval is an extra constraint the problem did not impose."],
      ["$\\mathcal{N}(\\mu, \\mu^2)$", "maxent-normal-positive", "The normal puts mass on negative values and needs a variance constraint."],
      ["$\\text{Gamma}$ with shape $2$", "maxent-gamma", "A shape-$2$ Gamma matches the mean but has lower entropy than the exponential."],
    ],
  ),
  num(
    { concept: ME, slug: "apply-exponential-entropy", cognitive: "apply", difficulty: 0.2, seconds: 60,
      stem: "Find the maximum-entropy density on $[0, \\infty)$ with mean $2$, and report its differential entropy $1 - \\ln \\lambda$ in nats, to $3$ decimal places." },
    1.693,
  ),
  mcq(
    { concept: ME, slug: "apply-die-mean", cognitive: "apply", difficulty: 0.5, seconds: 60,
      stem: "Among distributions on the faces $\\{1, \\ldots, 6\\}$ of a die with mean $4.5$, what form does the maximum-entropy distribution take?" },
    "$p_k \\propto e^{\\lambda k}$ with $\\lambda > 0$, so probabilities increase geometrically with $k$",
    [
      ["Uniform on $\\{1, \\ldots, 6\\}$", "maxent-ignore-constraint", "The uniform has mean $3.5$ and violates the constraint."],
      ["All mass split between faces $4$ and $5$", "maxent-concentrate", "Concentrating mass lowers entropy; maxent spreads it as much as the constraint allows."],
      ["$p_k \\propto e^{\\lambda k}$ with $\\lambda < 0$", "maxent-lambda-sign", "A negative $\\lambda$ tilts mass towards small faces and gives a mean below $3.5$."],
    ],
  ),
  short(
    { concept: ME, slug: "explain-exponential-family", cognitive: "explain", difficulty: 0.9, seconds: 150,
      stem: "Explain why the maximum-entropy distribution subject to $\\mathbb{E}[T_j(X)] = \\mu_j$ has the form $p^*(x) \\propto \\exp\\big(\\sum_j \\lambda_j T_j(x)\\big)$." },
    [
      ["lagrange", "Maximising $H(p)$ with Lagrange multipliers for normalisation and each moment constraint, and setting the derivative in $p(x)$ to zero, gives $\\log p(x) = \\text{const} + \\sum_j \\lambda_j T_j(x)$.", 4, true],
      ["or-kl", "Or: for feasible $q$, $H(p^*) - H(q) = D_{\\mathrm{KL}}(q \\,\\|\\, p^*) \\ge 0$ because $\\log p^*$ is linear in the $T_j$.", 3],
      ["family", "That is an exponential family with sufficient statistics $T_j$.", 2, true],
    ],
  ),
  mcq(
    { concept: ME, slug: "explain-mle-duality", cognitive: "explain", difficulty: 0.7, seconds: 50,
      stem: "How are maximum entropy and maximum likelihood related for an exponential family with sufficient statistics $T$?" },
    "The MLE matches $\\mathbb{E}_\\theta[T]$ to the sample average of $T$, which makes it the maximum-entropy distribution under those moment constraints",
    [
      ["They are unrelated principles that usually disagree", "maxent-mle-unrelated", "They are dual: the same distribution solves both."],
      ["Maximum entropy always gives the uniform distribution, so it ignores the data", "maxent-always-uniform", "The moment constraints come from the data; only unconstrained maxent gives the uniform."],
      ["Maximum likelihood maximises the entropy of the data", "maxent-mle-maximises-data-entropy", "MLE minimises cross-entropy to the empirical distribution; entropy is maximised over the model subject to constraints."],
    ],
  ),
  mcq(
    { concept: ME, slug: "transfer-gaussian-noise", cognitive: "transfer", difficulty: 0.3, seconds: 45,
      stem: "A modeller knows only that measurement errors have mean $0$ and variance $\\sigma^2$. Which error distribution does the maximum-entropy principle recommend?" },
    "$\\mathcal{N}(0, \\sigma^2)$ — the least committal distribution matching those two moments",
    [
      ["$\\text{Uniform}(-\\sigma, \\sigma)$", "maxent-uniform-errors", "That uniform has variance $\\sigma^2/3$ and lower entropy than the normal."],
      ["Laplace with scale $\\sigma$", "maxent-laplace", "The Laplace is maximum-entropy for a fixed mean absolute deviation, not a fixed variance."],
      ["A point mass at $0$", "maxent-point-mass-errors", "That violates the variance constraint and has minimal entropy."],
    ],
  ),
  short(
    { concept: ME, slug: "transfer-logistic", cognitive: "transfer", difficulty: 1.0, seconds: 150,
      stem: "Multinomial logistic regression is often called a maximum-entropy classifier. Explain what constraints it satisfies and why its softmax form is the maximum-entropy solution." },
    [
      ["constraints", "At the MLE, the model's expected feature–class counts $\\sum_i \\sum_k p(k \\mid x_i) x_i \\mathbb{1}[\\text{class } k]$ match the observed counts.", 4, true],
      ["form", "Maximising conditional entropy subject to these expectation constraints gives $p(k \\mid x) \\propto \\exp(\\beta_k^\\top x)$ — the softmax.", 3, true],
      ["meaning", "It is the least committal model consistent with those feature statistics.", 1],
    ],
  ),
];

// ---------------------------------------------------------------------------
const SC = "source-coding";
const sourceCoding: Item[] = [
  mcq(
    { concept: SC, slug: "recall-kraft", cognitive: "recall", difficulty: -0.5, seconds: 35,
      stem: "A binary prefix code with codeword lengths $\\ell_1, \\ldots, \\ell_n$ exists if and only if:" },
    "$\\sum_i 2^{-\\ell_i} \\le 1$",
    [
      ["$\\sum_i \\ell_i \\le n$", "kraft-sum-lengths", "Kraft constrains the shares $2^{-\\ell_i}$ of the code tree, not the total length."],
      ["$\\sum_i 2^{-\\ell_i} \\ge 1$", "kraft-direction", "The shares cannot exceed the whole tree; the inequality is $\\le 1$."],
      ["All lengths are equal", "kraft-equal-lengths", "Variable-length prefix codes exist — that is the point of Huffman coding."],
    ],
  ),
  mcq(
    { concept: SC, slug: "recall-theorem", cognitive: "recall", difficulty: -0.2, seconds: 35,
      stem: "For the optimal expected length $L^*$ of a binary prefix code for $X$, which bound holds?" },
    "$H(X) \\le L^* < H(X) + 1$",
    [
      ["$L^* = H(X)$ always", "sc-exact", "Equality needs every $p(x)$ to be a power of $\\tfrac{1}{2}$; in general there is up to one bit of overhead."],
      ["$L^* < H(X)$", "sc-below-entropy", "No uniquely decodable code beats entropy on average."],
      ["$L^* \\le \\log_2 |\\mathcal{X}|$ and nothing better", "sc-fixed-length", "That is the fixed-length bound; variable-length codes approach $H(X)$."],
    ],
  ),
  num(
    { concept: SC, slug: "apply-dyadic-huffman", cognitive: "apply", difficulty: -0.1, seconds: 60,
      stem: "Build a Huffman code for symbols with probabilities $\\tfrac{1}{2}, \\tfrac{1}{4}, \\tfrac{1}{8}, \\tfrac{1}{8}$. What is its expected codeword length in bits?" },
    1.75,
  ),
  mcq(
    { concept: SC, slug: "apply-kraft-check", cognitive: "apply", difficulty: 0.1, seconds: 50,
      stem: "Which list of codeword lengths can be realised by a binary prefix code?" },
    "$1, 2, 3, 3$",
    [
      ["$1, 1, 2$", "kraft-overfull-a", "$\\tfrac{1}{2} + \\tfrac{1}{2} + \\tfrac{1}{4} > 1$: two length-$1$ words use up the whole tree."],
      ["$1, 2, 2, 3$", "kraft-overfull-b", "$\\tfrac{1}{2} + \\tfrac{1}{4} + \\tfrac{1}{4} + \\tfrac{1}{8} = 1.125 > 1$."],
      ["$2, 2, 2, 2, 2$", "kraft-overfull-c", "$5 \\times \\tfrac{1}{4} = 1.25 > 1$: there are only four length-$2$ words."],
    ],
  ),
  short(
    { concept: SC, slug: "explain-wrong-code", cognitive: "explain", difficulty: 0.7, seconds: 120,
      stem: "A code is designed with lengths $\\ell(x) = -\\log_2 q(x)$ for a model $q$, but symbols actually come from $p$. Explain how many bits per symbol this costs compared with the best code for $p$." },
    [
      ["expected", "Expected length is $\\sum_x p(x)(-\\log_2 q(x)) = H(p, q)$, the cross-entropy.", 3, true],
      ["penalty", "Compared with $H(p)$ this is an extra $D_{\\mathrm{KL}}(p \\,\\|\\, q)$ bits per symbol.", 3, true],
      ["interpretation", "So KL divergence is literally the coding cost of using the wrong model.", 1],
    ],
  ),
  short(
    { concept: SC, slug: "explain-block-coding", cognitive: "explain", difficulty: 0.8, seconds: 120,
      stem: "A symbol-by-symbol code can waste up to one bit per symbol relative to $H(X)$. Explain how coding blocks of $n$ symbols at a time removes this waste." },
    [
      ["block-bound", "For i.i.d. blocks, $H(X_1, \\ldots, X_n) = nH(X)$, so an optimal block code has expected length below $nH(X) + 1$.", 4, true],
      ["per-symbol", "Per symbol that is below $H(X) + \\tfrac{1}{n}$, which tends to $H(X)$ as $n$ grows.", 3, true],
    ],
  ),
  num(
    { concept: SC, slug: "transfer-huffman", cognitive: "transfer", difficulty: 0.3, seconds: 90,
      stem: "Build a Huffman code for symbols with probabilities $0.4, 0.3, 0.2, 0.1$. What is its expected length in bits?" },
    1.9,
  ),
  mcq(
    { concept: SC, slug: "transfer-random-data", cognitive: "transfer", difficulty: 0.4, seconds: 45,
      stem: "Why does running a lossless compressor on a file of uniformly random bytes fail to shrink it?" },
    "Uniform bytes already have the maximum entropy of $8$ bits per byte, so no lossless code can average fewer",
    [
      ["The compressor has a bug", "sc-implementation", "It is a theorem, not an implementation limit: $L \\ge H$."],
      ["Random data compresses well, but only with Huffman coding", "sc-huffman-magic", "Huffman cannot beat entropy either."],
      ["Compression needs the file to be longer", "sc-length", "More uniform bytes add $8$ bits of entropy each; length does not help."],
    ],
  ),
];

export const informationTheoryItems: Item[] = [
  ...selfInformation,
  ...shannonEntropy,
  ...jointConditional,
  ...crossEntropy,
  ...mutualInformation,
  ...dataProcessing,
  ...differentialEntropy,
  ...maximumEntropy,
  ...sourceCoding,
];
