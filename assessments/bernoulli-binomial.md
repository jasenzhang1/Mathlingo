# Bernoulli & Binomial — Assessment Bank

Authored questions for [`bernoulli-binomial`](../web/src/data/concepts.ts), ready to be turned into
`Item` entries in [`items.ts`](../web/src/data/items.ts). Structure and vocabulary follow
[`assessment.md`](../assessment.md): four cognitive levels, misconception tags that name a
`blameConceptId`, and difficulty seeds in logits on the engine's scale.

**Difficulty seeds** come from the concept's depth in the graph (15 ancestors → base 0.89):

| Level | Band | Target count |
|---|---|---|
| recall | −0.86 … 0.64 | 3 |
| apply | −0.06 … 1.44 | 3 |
| explain | 0.64 … 2.14 | 3 |
| transfer | 1.14 … 2.64 | 1+ |

**Prerequisite closure.** Fair game: `pmf`, `binomial-theorem`, `mutual-independence`, `expectation`,
`variance`, and everything upstream. Not fair game without re-filing the item: `poisson-distribution`,
`mle`, `hypothesis-test`, `hypergeometric-distribution` — several questions below are marked
**⚠ downstream** where they'd need to live under the later concept instead.

**Source grounding.** Wasserman ch. 2 (2.14.11, 2.14.16); Casella & Berger ch. 3 (3.12 negative-binomial
duality, 3.48 pmf recursion, exponential-family membership, Poisson and Normal approximations); MIT
OCW 18.05; OpenStax *Introductory Statistics* ch. 4. Everything below is freshly authored — the
restricted-tier sources supplied the task skeleton only.

---

## 1. Recall — definitions and forms

**R1. State the PMF.** `mcq` · b ≈ −0.6
X ~ Binomial(n, p). Which expression gives P(X = k) for integer 0 ≤ k ≤ n?
*(Already live as `bernoulli-binomial--recall-pmf-form`. Distractors tagged: dropped binomial
coefficient → `binomial-theorem`; exponents not summing to n → `pmf`.)*

**R2. The four conditions.** `multi-select` · b ≈ −0.4
Which must hold for a count to be Binomial? Correct: fixed number of trials; each trial binary; the
same success probability every trial; trials mutually independent. Distractors: *"n must be large"*
(→ confuses the model with its normal approximation, blame `pmf`); *"p must be ≥ 0.5"*; *"the trials
must occur in time order"*.
> Worth having because every transfer question in §4 is really asking *which of these four broke*.

**R3. Moments.** `short-answer` · b ≈ 0.1
State E[X] and Var(X) for Bernoulli(p) and for Binomial(n, p). Required elements: np and np(1−p);
p and p(1−p); noting the binomial values are exactly n times the Bernoulli ones.

**R4. The CDF.** `short-answer` · b ≈ 0.5
Write the CDF of Binomial(n, p) and say why it's a step function. Bonus element: there is no
elementary closed form for the partial sum — it's the regularised incomplete beta function — which is
why tables and software exist for it.

**R5. The meaning of p.** `mcq` · b ≈ −0.86
For a Bernoulli(p) random variable, what does p represent?
Correct: the probability the trial results in success (X = 1). Distractors: *"the expected number of
successes out of n trials"* (confuses the parameter with a moment computed from many trials → tag
`parameter-as-mean`, blame `expectation`); *"the number of trials needed"* (confuses p with n → tag
`p-vs-n-confusion`, blame `bernoulli-binomial`); *"the variance of X"* (confuses the parameter with a
different moment → tag `parameter-as-variance`, blame `variance`).

**R6. Support of a Bernoulli variable.** `mcq` · b ≈ −0.75
How many values can a Bernoulli(p) random variable take, and what are they?
Correct: exactly two, 0 and 1. Distractors: *"any integer from 0 to n"* (this is the Binomial's
support, not the Bernoulli's → tag `bernoulli-binomial-conflation`, blame `bernoulli-binomial`);
*"infinitely many values between 0 and 1"* (mistakes the continuous parameter p for the discrete
outcome → tag `discrete-support-confusion`, blame `pmf`); *"exactly n values"* (again substitutes n
for the actual count of outcomes, which is fixed at two regardless of n → tag `p-vs-n-confusion`,
blame `bernoulli-binomial`).

**R7. Which formula is Var(X)?** `mcq` · b ≈ −0.2
For X ~ Binomial(n, p), which expression gives Var(X)?
Correct: np(1−p). Distractors: *"np"* (that's E[X], not Var(X) → tag `mean-variance-confusion`, blame
`variance`); *"n²p²(1−p)²"* (an invented formula with no basis → tag `variance-formula-error`, blame
`variance`); *"p(1−p)"* (this is the Bernoulli's variance, missing the factor of n → tag
`count-vs-proportion`, blame `variance`).

**R8. True or false: the support of Binomial(n, p).** `mcq` · b ≈ 0.64
True or False: X ~ Binomial(n, p) can take any real value between 0 and n.
Correct: **False** — X takes only the integer values 0, 1, …, n; it's discrete, not continuous, and
p being a real number in [0, 1] does not make the outcome continuous. Distractor: *"True"* → tag
`discrete-support-confusion`, blame `pmf`.

---

## 2. Apply — computation

**A2.1 Exact probability.** `numeric`, templated · b ≈ 0.2
*(Live as `bernoulli-binomial--apply-exactly-k`.)* A player lands {n} first serves, each good
independently with probability {p}. P(exactly {k} good)?

**A2.2 "At least one".** `numeric`, templated · b ≈ 0.3
A component fails on any given day with probability {p} = 0.02, independently. Over {n} = 30 days,
what is the probability of at least one failure?
> Answer 1 − (1−p)ⁿ ≈ 0.455. The point is the complement trick, and the surprise: a 2% daily risk is
> a coin flip over a month. Misconception to tag — computing n·p = 0.6 and treating it as a
> probability (blame `pmf`; it's the expected *count*, and it isn't even bounded by 1 in general).

**A2.3 Inverse problem.** `numeric` · b ≈ 0.9
A binomial has mean 6 and variance 2.4. Find n and p.
> np = 6, np(1−p) = 2.4 ⟹ 1−p = 0.4, p = 0.6, n = 10. Excellent item: it can't be done by pattern-
> matching a formula, it forces both moments to be held at once, and it has a unique clean answer.

**A2.4 Sum of binomials.** `short-answer` · b ≈ 1.0
X ~ Bin(n₁, p) and Y ~ Bin(n₂, p) independent. What is the distribution of X + Y? Now suppose Y has a
*different* success probability q ≠ p — is X + Y still binomial? Why not?
> Yes to the first (Bin(n₁+n₂, p)) — the trials pool because they're iid. No to the second: the
> pooled trials are no longer identically distributed, and the sum has larger variance than any
> single binomial with the same mean. Tag: assuming any sum of binomials is binomial → `mutual-independence`.

**A2.5 Mode vs mean.** `numeric` · b ≈ 1.1
For Bin(10, 0.35), find the most likely value of X, and compare it to E[X].
> Mode = ⌊(n+1)p⌋ = 3, mean = 3.5. The mean of a discrete distribution need not be attainable — a
> small point that repeatedly confuses learners.

**A2.6 Zero successes.** `numeric`, templated · b ≈ 0.6
X ~ Binomial(n, p). Write a general formula for P(X = 0), then evaluate it for n = {n}, p = {p}.
> P(X = 0) = (1−p)ⁿ — the binomial coefficient C(n, 0) = 1 and p⁰ = 1 drop out, so this is the one
> case a learner can sanity-check by pure reasoning ("every trial has to fail") without touching the
> general formula. For n = 10, p = 0.3: (0.7)¹⁰ ≈ **0.0282**. Distractor to watch for in grading:
> answering 1 − p rather than (1−p)ⁿ — treating "zero successes" as a single-trial statement.

---

## 3. Explain — why the method works

**E3.1 Why variance peaks at p = ½.** `derivation` · b ≈ 0.7
*(Drafted as `bernoulli-binomial--explain-variance-max`.)* Argue it from what the trials are doing,
not by differentiating. Required: decompose into n iid Bernoullis; a single trial is most
unpredictable when outcomes are equally likely.

**E3.2 What is C(n, k) counting?** `derivation` · b ≈ 0.8
Explain why the PMF needs the binomial coefficient. What does pᵏ(1−p)ⁿ⁻ᵏ alone give you?
> pᵏ(1−p)ⁿ⁻ᵏ is the probability of **one specific sequence** of outcomes; C(n,k) counts how many
> sequences have k successes. This is the single most common binomial error and deserves its own item.

**E3.3 Why does the PMF sum to 1?** `derivation` · b ≈ 1.0
Show that Σₖ C(n,k)pᵏ(1−p)ⁿ⁻ᵏ = 1, and name the theorem doing the work.
> The binomial theorem, with (p + (1−p))ⁿ = 1ⁿ. A satisfying payoff: the prerequisite exists for a
> reason, and the learner sees the algebraic identity and the probabilistic fact are the same statement.

**E3.4 Count vs proportion.** `derivation` · b ≈ 1.3
Var(X) = np(1−p) grows with n, but Var(X/n) = p(1−p)/n shrinks with n. Both are about the same
experiment. Explain why there's no contradiction, and which one the law of large numbers is about.
> The *count* spreads out; the *proportion* concentrates. Getting this backwards is behind a great
> deal of confusion about sample size later on. ⚠ touches `law-of-large-numbers` — keep the required
> elements to the two variance facts and treat the LLN mention as a bonus.

**E3.5 Bernoulli as Binomial(1, p).** `short-answer` · b ≈ 0.7
Show Bernoulli(p) is the n = 1 case, and explain why that observation is more than bookkeeping.
> It licenses the decomposition X = ΣXᵢ, which is what makes E and Var one-liners via linearity and
> independence — and it's the same move that later yields the CLT.

**E3.6 Why independence is load-bearing in Var(X) = np(1−p).** `derivation` · b ≈ 1.8
For X = ΣXᵢ with each Xᵢ ~ Bernoulli(p), expand Var(X) using Var(ΣXᵢ) = ΣVar(Xᵢ) + 2Σᵢ<ⱼCov(Xᵢ,Xⱼ),
and show what independence buys you. Then say what happens to Var(X) if the trials are positively
correlated instead.
> Required: the cross-term expansion, and the observation that independence (or even just pairwise
> zero covariance) is exactly what makes every Cov(Xᵢ,Xⱼ) term vanish, leaving np(1−p). If the trials
> are positively correlated, the covariance terms are positive, so Var(X) **exceeds** np(1−p) — the
> same overdispersion argument as T4.1, but derived here rather than argued informally. Forbidden
> move: writing Var(ΣXᵢ) = ΣVar(Xᵢ) without ever addressing the covariance terms, which quietly
> assumes the very independence the question asks you to examine.

---

## 4. Transfer — modeling judgement

This is where the concept is actually tested. Every question asks the same underlying thing: **which
of the four conditions fails, and what does its failure do to the answer?**

**T4.1 Free throws.** `derivation`, spoken or written · b ≈ 1.6
*Why can't two free throws be modeled as Binomial(2, p)? Think about player confidence.*

Rubric:
- **Names the failing conditions** *(required)* — independence, and constant p. Making the first shot
  can change the probability of making the second: P(make 2nd | made 1st) ≠ P(make 2nd | missed 1st)
  is precisely what dependence means. Confidence, rhythm, and having just calibrated distance and
  feel all push the same way.
- **Situational non-exchangeability** — the second shot isn't taken under the same conditions. If the
  first was missed in a one-point game, the pressure on the second is different. The "trials" aren't
  interchangeable.
- **Says what it does to the math** *(required, and the part that separates good answers)* — if the
  shots are positively correlated, Var(X) = 2p(1−p) + 2Cov(X₁,X₂) **exceeds** the binomial's 2p(1−p).
  The model *understates* the spread: you'd observe more 0s and 2s and fewer 1s than Binomial(2, p)
  predicts. That's overdispersion, and it's empirically checkable.
- **Bonus: the honest caveat** — the hot-hand literature is contested (Gilovich–Vallone–Tversky found
  no effect; Miller & Sanjurjo showed that analysis carried a selection bias and recovered a real
  one). The dependence is probably small, so Binomial(2, p) may still be a serviceable approximation.
  *Whether a violated assumption matters is a quantitative question, not a yes/no one.*
- **Bonus** — pooling across players breaks constant p even if it held within a player.

> Forbidden move: answering only "the trials aren't independent" with no mechanism and no consequence.
> That's the phrase, not the understanding.

**T4.2 Real-world examples.** `short-answer`, open · b ≈ 1.2
*Give three examples of a binomial from a field you care about. For each, name the trial, what counts
as a success, n, and p. Then give one example that looks binomial but isn't, and say which condition
fails.*
> Grading is on the **four components being identified**, not on the examples being impressive. The
> fourth part is the real item — a learner who can generate a good non-example understands the model.
> Strong non-examples: cards drawn without replacement; number of customers arriving in an hour
> (n isn't fixed — that's Poisson); days until first success (n isn't fixed — geometric); defect
> counts when the machine drifts over a shift (p isn't constant).

**T4.3 Airline overbooking.** `numeric` + `short-answer`, two parts · b ≈ 1.5
An airline sells 108 tickets for a 100-seat plane. Each passenger shows up independently with
probability 0.90. (a) What is the probability the flight is overbooked? (b) Which assumption is
doing the most work here, and in which direction is it wrong?
> (a) P(X > 100) where X ~ Bin(108, 0.9) = **0.143** (mean 97.2, so the airline is betting on the
> tail). Selling 105 instead gives 0.017 — worth setting as a follow-up, because three extra seats
> moving the risk almost tenfold is the lesson. (b) Independence: **families and colleagues travel
> together**, so no-shows are positively correlated. That inflates the variance, which puts more mass
> in both tails — so the true overbooking risk is *higher* than the binomial says. A learner who says
> "independence fails" but can't say which direction hasn't finished the problem.

**T4.4 Sampling without replacement.** `short-answer` · b ≈ 1.4 · ⚠ downstream (`hypergeometric-distribution`)
You draw 5 cards from a deck and count hearts. Why isn't this Binomial(5, 0.25)? Now: you sample 1000
voters from a city of 500,000 and count supporters. Why *is* binomial fine there?
> p changes after each draw when the population is small; with n/N ≈ 0.002 the change is negligible
> (the usual rule of thumb is n < 10% of N). Teaches that assumptions are approximations with a
> **regime of validity**, not true-or-false facts. File under Hypergeometric, or trim to the second
> half to keep it here.

**T4.5 Boy-girl.** `short-answer` · b ≈ 1.5
Is the number of boys in a four-child family Binomial(4, 0.5)? Critique the model.
> Three separate problems, and good answers find at least two: p ≈ 0.512, not 0.5; families differ
> (some couples are genuinely more boy-prone, so pooling across families breaks identical p); and
> *family size is not independent of composition* — some parents keep having children until they get
> a girl, which makes n endogenous. That last one is subtle and worth full credit alone.

**T4.6 The rare-event trap.** `numeric` · b ≈ 1.3
A condition affects 1 in 10,000 people. In a city of 50,000, what is P(at least one case)? What is
E[cases]? Why is the answer close to 1 − e⁻⁵?
> 1 − (1 − 10⁻⁴)⁵⁰⁰⁰⁰ ≈ 0.9933; E = 5. Sets up the Poisson limit (n large, p small, np → λ) without
> requiring it. ⚠ keep the Poisson part as a bonus element so the item stays filed here.

**T4.7 Which condition broke?** `mcq`, one scenario per option · b ≈ 1.2
For each scenario, name the violated condition. A rolling quality-control count where the machine
heats up over a shift *(constant p)*; number of emails received before the first spam *(fixed n)*;
number of heads in 10 flips of a coin chosen at random from a bag of biased coins *(independence —
the flips are conditionally independent given the coin, but marginally dependent, since early flips
tell you which coin you drew)*.
> The third is the good one. It's the cleanest everyday example of *conditional* independence not
> implying independence, and it's the same structure as the family-heterogeneity issue in T4.5.

**T4.8 Binomial from two Poissons.** `derivation` · b ≈ 2.3 · ⚠ downstream (`poisson-distribution`)
X ~ Poisson(λ), Y ~ Poisson(μ), independent. Show X | (X + Y = n) is Binomial(n, λ/(λ+μ)).
> *In the style of Wasserman 2.14.16.* Genuinely delightful — the binomial appears with no coins
> anywhere — and a strong candidate for the multidisciplinary slot once Poisson is unlocked.

**T4.9 Two counts from one toss.** `derivation` · b ≈ 1.7
Toss a coin once. Let X = number of heads, Y = number of tails. Prove X and Y are dependent.
> *In the style of Wasserman 2.14.11.* A sharp corrective: X + Y = 1 always, so knowing X determines
> Y exactly. Learners who have been told "coin tosses are independent" have to notice the claim is
> about *trials*, not about every pair of random variables in sight.

**T4.10 A/B test.** `short-answer` · b ≈ 1.6 · ⚠ downstream (`mle`)
You run an ad and get 12 conversions from 100 impressions. State the binomial model, and give the
value of p that makes the data most likely.
> p̂ = 12/100. The bridge from *distribution* to *inference*: up to now p was given, and here it is
> the unknown. Best used as the transfer item that unlocks Maximum Likelihood Estimation.

---

## 5. Misconception index

Every tag below should exist as a `Misconception` with the listed `blameConceptId`, so that a wrong
answer debits the concept that actually failed (§3.4 of `assessment.md`).

| Tag | Looks like | Blame |
|---|---|---|
| `forgets-binomial-coefficient` | uses pᵏ(1−p)ⁿ⁻ᵏ alone | `binomial-theorem` |
| `expected-count-as-probability` | reports np as a probability | `pmf` |
| `assumes-independence` | applies binomial without checking trials | `mutual-independence` |
| `conditional-independence-confusion` | "independent given the coin" ⟹ independent | `mutual-independence` |
| `constant-p-unchecked` | ignores drift or heterogeneity in p | `bernoulli-binomial` |
| `fixed-n-unchecked` | uses binomial when n is itself random | `bernoulli-binomial` |
| `count-vs-proportion` | says variance shrinks with n | `variance` |
| `mean-must-be-attainable` | expects E[X] to be a possible value | `expectation` |
| `sum-of-binomials` | assumes X+Y binomial when p ≠ q | `mutual-independence` |
| `parameter-as-mean` | reports p as an expected count rather than a probability | `expectation` |
| `p-vs-n-confusion` | substitutes n where p belongs, or vice versa | `bernoulli-binomial` |
| `parameter-as-variance` | reports p as Var(X) | `variance` |
| `bernoulli-binomial-conflation` | attributes Binomial's support or formula to a Bernoulli | `bernoulli-binomial` |
| `discrete-support-confusion` | treats a discrete count as continuous, or vice versa | `pmf` |
| `mean-variance-confusion` | gives np when asked for Var(X), or the reverse | `variance` |
| `variance-formula-error` | invents a variance expression with no derivation behind it | `variance` |

## 6. Coverage check

The bank now totals **30 items**: 8 recall, 6 apply, 6 explain, 10 transfer, spanning −0.86 (R5) to
2.3 (T4.8) — a spread of 3.16 logits.

Three transfer items (T4.4, T4.8, T4.10) are marked **⚠ downstream** and would properly be filed
under Hypergeometric, Poisson, and MLE respectively. Filing those under their proper concepts leaves
**27 items here**: 8 recall, 6 apply, 6 explain, 7 transfer, spanning −0.86 to 1.8 (E3.6) — a spread
of 2.66. Either way this clears `auditCoverage`'s bar of 8 live items with all three required levels
present, and comfortably clears the 1.5-logit spread the adaptive selector needs.

The recall section now has real coverage at the easy end — R5 at −0.86 replaces R1's −0.6 as the
floor, and R5–R8 give four one-line, definition-level items (parameter meaning, support, the Var(X)
formula, discrete vs. continuous) below anything that existed before this pass.

Still missing, and worth a second pass: a `symbolic` item (everything here is numeric, MCQ, or
open-response).
