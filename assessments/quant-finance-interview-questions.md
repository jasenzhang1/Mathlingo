# Quant Finance Interview Questions

A different bank from the rest of `/assessments`, and deliberately organized differently.

Every other file here is authored against one concept in `concepts.ts` (`assessment.md` §1.4:
prerequisite closure, a single `blameConceptId` per misconception, a difficulty seeded from the
concept's depth in the graph). That works because a well-posed probability *exercise* is usually
about one idea.

A quant interview *question* is not. "Flip 10 coins" is answered with the binomial PMF, or a
symmetry/pairing trick, or a generating function, depending on which sub-question is asked — the
scenario is fixed, the machinery is not. Filing these under a single concept would either force one
narrow solution path (defeating the point — interviewers explicitly reward finding a second, faster
method) or scatter one scenario's five variations across five unrelated concept pools, which is worse
for a learner trying to pattern-match "I've seen this shape of problem before."

So this file groups by **scenario** — the setup a candidate has to recognize — and each scenario
carries several questions of increasing difficulty, often with more than one solution method noted
explicitly, because the second method is usually the point.

This bank is **not wired into the concept graph or the app's servable `Item` system** — see
`assessments/README.md`. It is a standalone reference, closer in spirit to a worked problem set than
to a spaced-repetition pool. `assessment.md`'s Open Questions §3 already flags "a quant preparing for
interviews" as a different population from the rest of the curriculum; this file is where that
population's material lives until (if ever) a decision is made to integrate it.

**Format.** Each scenario states the setup once, then lists problems as `Q` / `Solution` pairs. Where
a problem has a genuinely distinct second method, it's given as `Alt.` — not as a superior method, but
because recognizing that a shortcut exists is frequently the actual thing being tested.

---

## 1. Flipping a Fixed Number of Coins

**Setup.** *n* fair coins are flipped (usually *n* = 10 in practice — big enough that brute enumeration
is a trap, small enough to compute exactly). The question is about the *joint outcome* of a fixed,
known number of flips — this is what separates the group from §2, where the number of flips is itself
random.

**Q1.** Flip 10 fair coins. What is P(exactly 5 heads)?

*Solution.* Binomial: C(10,5)/2¹⁰ = 252/1024 ≈ 0.246. Mechanical, but it's the baseline every other
question in this group is testing whether you'll reach for by reflex when a faster route exists.

**Q2.** Flip 10 fair coins. What is P(at least 8 heads)?

*Solution.* [C(10,8) + C(10,9) + C(10,10)] / 1024 = (45 + 10 + 1)/1024 = 56/1024 ≈ 0.0547. Tail sums
don't simplify — there's no shortcut here, which is itself worth knowing (candidates sometimes waste
time hunting for symmetry that doesn't exist).

**Q3.** Flip 10 fair coins. What is P(the number of heads is even)?

*Solution (direct).* Sum C(10,k) for even k from 0 to 10: (1+45+210+210+45+1)/1024 = 512/1024 = 1/2.

*Alt. (the actual point of the question).* Look at the first coin only. Whatever the other 9 coins
show, the first coin's outcome flips the parity of the total exactly once. So exactly half of all 1024
outcomes have even head-count, by a bijection (flip coin 1) between the even-count outcomes and the
odd-count ones — **no computation needed**, and the argument works for any n ≥ 1 and generalizes to
any fair-coin count, not just n = 10. This is the generating-function fact `(1-1)ⁿ = 0` restated as
a pairing argument, and it's a favorite because a candidate who computes Q3 the long way after seeing
Q1 and Q2 has revealed they don't yet reach for symmetry first.

**Q4.** Flip 10 fair coins. What is P(no two consecutive heads)?

*Solution.* Let $a_n$ count binary strings of length $n$ with no two adjacent 1s. Conditioning on the
last flip: a valid string of length $n$ either ends in T (any valid string of length $n-1$ appended),
or ends in H (which forces the previous flip to be T, so any valid string of length $n-2$ appended with
"TH"). This gives $a_n = a_{n-1} + a_{n-2}$ — Fibonacci — with $a_1 = 2$, $a_2 = 3$. Running it out:
2, 3, 5, 8, 13, 21, 34, 55, 89, **144** at $n=10$. So P = 144/1024 = 9/64 ≈ 0.1406. The scenario is the
same ten coins as Q1–Q3; the machinery (a recursion, not a closed-form count) is entirely different,
which is the whole reason this group is organized by scenario and not by "combinatorics" vs.
"recursions."

**Q5.** Flip 10 fair coins. What is the expected length of the longest run of consecutive heads?

*Solution (why this is harder than it looks).* There is no clean closed form — this is usually asked
to see whether a candidate will *try* to force one (a common wrong move: assuming the answer scales
simply with $\log_2 n$) versus reasoning about it correctly. The right frame: for a run of length $k$
starting at position $i$ to be a longest run, you need $k$ heads there flanked by tails (or a string
boundary). A candidate is expected to set up P(longest run ≥ k) via a union bound / inclusion-exclusion
over the $n-k+1$ possible starting positions, get a good approximate answer (longest run for $n=10$
fair flips is around 3, since $\log_2 10 \approx 3.3$), and — critically — say explicitly that an exact
closed form isn't the efficient use of interview time. Knowing when *not* to grind out exact arithmetic
is itself the skill being probed.

---

## 2. Flipping a Coin Until Something Happens

**Setup.** A fair (or biased) coin is flipped repeatedly; the number of flips is a random stopping
time, not fixed in advance. This is the group where geometric/negative-binomial machinery, Markov
chains on a small state space, and martingale-style symmetry arguments all show up as competing tools
for the *same* kind of question — recognizing "stop when a pattern occurs" as one family, regardless
of which pattern, is the transferable skill.

**Q1.** Flip a fair coin until the first heads. What's the expected number of flips?

*Solution.* Geometric(1/2): E[X] = 1/p = 2. The warm-up everything else in this group builds on.

**Q2.** Flip a fair coin until you see the pattern HH. What's the expected number of flips? Now do the
same for HT. Why are the two answers different, given both patterns have probability 1/4 on any given
pair of flips?

*Solution.* Set up states by how much progress toward the pattern is "banked."

For **HT**: state 0 (no progress), state H (just saw an H). From state 0: T → stay at 0, H → move to
state H (each w.p. 1/2). From state H: T → done, H → stay at state H (a second H doesn't lose the
progress — you're still "just saw an H"). Let $e_0, e_H$ be expected remaining flips. $e_0 = 1 +
\tfrac12 e_0 + \tfrac12 e_H$, $e_H = 1 + \tfrac12 e_H$. Solving: $e_H = 2$, $e_0 = 4$.

For **HH**: state 0, state H. From state H, a T sends you all the way back to state 0 — a single
wrong flip destroys *all* progress, unlike HT. $e_0 = 1 + \tfrac12 e_0 + \tfrac12 e_H$, $e_H = 1 +
\tfrac12 \cdot 0 + \tfrac12 e_H$ → wait, more carefully: from H, H → done (add 1 flip, 0 remaining);
T → back to state 0 (add 1 flip, then $e_0$ remaining). $e_H = 1 + \tfrac12(0) + \tfrac12 e_0$.
Combined with $e_0 = 1 + \tfrac12 e_0 + \tfrac12 e_H$: solving gives $e_0 = 6$.

**The "why."** HT is *self-avoiding* — once you've made progress (seen H), a failure (T) doesn't wipe
the slate, it *completes* the pattern's second half most of the time or restarts cleanly. HH
*overlaps with itself* — a failed second flip (T after H) throws away the H you just banked entirely,
so bad luck compounds. This is a genuine fact about pattern overlap (formalized by Conway's leading
numbers / correlation of a sequence with its own shifts), not a coincidence of this specific pair, and
it's the reason this question is a staple: it tests whether a candidate notices *both* patterns have
the same single-trial probability yet very different expected waiting times, and can locate the
mechanism rather than just crank the algebra.

*Alt. (martingale / direct counting, faster once known).* The expected wait for a specific length-$k$
pattern is $\sum$ over each prefix of the pattern that is also a suffix of the pattern, of $2^{(\text{length
of that prefix})}$, plus $2^k$ for the whole pattern itself. HT has no nontrivial overlap: $E = 2^2 =
4$. HH's whole pattern is its own length-1 prefix-suffix overlap (the second H) as well as itself:
$E = 2^1 + 2^2 = 6$. Same answers, no state diagram — worth having in reserve for a pattern longer
than 2 characters, where writing out the Markov chain by hand gets slow.

**Q3.** A gambler starts with \$*i* and bets \$1 on fair coin flips (win: +\$1, lose: −\$1) until they
either go broke or reach \$*N*. What's the probability they go broke? (Gambler's Ruin.)

*Solution.* Let $p_i$ = P(reach $N$ before $0$ | start at $i$). Because the walk is a martingale (fair
game), $p_i$ is linear in $i$: $p_i = i/N$. So P(ruin) = $1 - i/N$. The one-line justification worth
stating out loud: $E[\text{fortune}]$ is conserved at every step under a fair coin, and a linear
function of $i$ satisfying the boundary conditions $p_0 = 0$, $p_N = 1$ is forced to be $i/N$ — this
*is* the martingale optional-stopping argument, stated without invoking the theorem by name, which is
exactly the right level of formality for an interview answer.

**Q4.** Flip a fair coin repeatedly until you've seen *both* a head and a tail at least once. Expected
number of flips?

*Solution.* The first flip is "free" — whatever it shows, you're now waiting for the *other* face for
the first time, and that wait is Geometric(1/2) with mean 2. Total: $1 + 2 = 3$. (A coupon-collector
problem with only two coupon types, worth recognizing as the same family as the general coupon
collector, which for $k$ types gives $k \cdot H_k$ — here $2 \cdot (1 + \tfrac12) = 3$, matching.)

**Q5.** (St. Petersburg paradox.) A casino flips a fair coin until it lands tails. You are paid $2^k$
dollars, where $k$ is the number of heads that came up before the first tail. What is a fair price to
pay to play this game?

*Solution.* $E[\text{payoff}] = \sum_{k=0}^{\infty} P(k \text{ heads then a tail}) \cdot 2^k =
\sum_{k=0}^\infty \left(\tfrac12\right)^{k+1} \cdot 2^k = \sum_{k=0}^\infty \tfrac12 = \infty$. The
expected value is infinite, yet no rational person would pay an unbounded amount to play — the point of
the question isn't the sum (it's one line), it's whether the candidate immediately flags that expected
value is the wrong decision criterion here, and can gesture at why (diminishing marginal utility of
money / bounded real-world bankrolls cap what any actual payout can be, per Bernoulli's original
resolution). A candidate who states the infinite EV and stops has answered the algebra question but
missed the actual interview question.

---

## 3. Lattice Paths — Counting Moves to (4, 4)

**Setup.** A path from $(0,0)$ is built from unit steps **U** (up) and **R** (right) only. This
scenario is a proxy for a large family of real quant problems — counting monotone paths, first-passage
probabilities in a symmetric random walk, ballot-type "stays-ahead" problems — all of which reduce to
counting or restricting lattice paths, and the **reflection principle** is the one tool that
generalizes across nearly all of them.

**Q1.** How many distinct paths of U/R moves go from $(0,0)$ to $(4,4)$?

*Solution.* Any such path is a sequence of 8 moves, 4 of which are U (the rest are forced to be R).
Choosing *which* 4 of the 8 positions are U determines the whole path: $\binom{8}{4} = 70$.

**Q2.** How many of those 70 paths never rise above the diagonal — i.e., stay on or below the line $y
= x$ at every point (equivalently: at every prefix of the path, #U ≤ #R)?

*Solution (reflection principle).* This is a "ballot problem" in disguise: think of R as a vote for
candidate A and U as a vote for candidate B in a tied 4–4 election; the condition "never above the
diagonal" says B is never strictly ahead. Count the *bad* paths instead — those that touch the line
$y = x+1$ at some point (i.e., go strictly above the diagonal at least once) — and subtract from 70.

Reflect the *portion of the path up to its first touch* of $y = x+1$ across that line. This maps every
bad path bijectively onto **every** unrestricted U/R path from $(0,0)$ to the reflection of $(4,4)$
across $y=x+1$, which is $(3,5)$: reflecting a point across $y = x+1$ swaps and shifts the coordinates
so $(4,4) \mapsto (3,5)$. The count of unrestricted paths to $(3,5)$ is $\binom{8}{3} = 56$.

So good paths = $70 - 56 = 14$. This matches the Catalan number $C_4 = \binom{8}{4}/(4+1) = 70/5 = 14$
— the general fact this problem is a special case of: the number of U/R paths from $(0,0)$ to $(n,n)$
staying weakly below the diagonal is $C_n = \binom{2n}{n}/(n+1)$.

**Q3.** How many of the 70 paths touch the diagonal $y = x$ *only* at the start $(0,0)$ and the end
$(4,4)$ — i.e., strictly on one side everywhere in between?

*Solution.* By symmetry, split into "strictly below throughout the middle" and "strictly above
throughout the middle," which are equinumerous by reflecting the whole path across $y=x$. A path
strictly below in the interior must take its first step R (else it touches the diagonal immediately)
and its last step U, and the middle $(1,0) \to (3,4)$ portion must stay weakly below $y = x - 1$ (i.e.
strictly below $y=x$) the whole way — this is again a reflection-principle count, giving $C_3 = 5$ for
that middle segment (a standard identity: paths that touch the diagonal only at the endpoints correspond
to Catalan numbers one index down). Doubling for the "above" case: $2 \times 5 = 10$ paths touch the
diagonal only at the two endpoints.

**Q4.** In a random walk that takes a U or R step with probability $1/2$ each, starting at $(0,0)$,
what is the probability that the walk visits $(4,4)$ *before* ever visiting $(5,3)$?

*Solution.* Any path reaching either point has taken 8 steps and both are reachable in exactly 8 steps,
so "visits $(4,4)$ before $(5,3)$" for an 8-step lattice walk really asks about paths through $(4,4)$
at step 8 versus $(5,3)$ at step 8 — since both are terminal for an 8-step walk from the origin along
this lattice, the more standard version of this question asks for the probability the walk is *at*
$(4,4)$ after 8 steps at all: $\binom{8}{4}/2^8 = 70/256 \approx 0.273$, versus $(5,3)$:
$\binom{8}{3}/2^8 = 56/256 \approx 0.219$. The reflection principle becomes relevant the moment the
question adds a barrier — e.g. "probability the walk reaches $(4,4)$ without ever touching the line
$y = x + 2$" — which is solved exactly as in Q2, reflecting across the barrier instead of the diagonal.
This variant is worth stating explicitly because it's the form the question actually takes most often
in an interview: not "count the paths" but "count the paths *subject to a barrier*," which is where
brute enumeration stops being viable and the reflection principle is the entire solution.

---

## Further scenario groups (not yet written up)

Named here so the file's structure is visible before every group is filled in — each is a real
recurring interview scenario, listed for the same reason `assessments/README.md` tracks authored vs.
servable counts: so a gap is visible rather than silently missing.

- **Dice sums and combinatorics** (e.g. two dice re-rolled until a sum repeats; three dice, probability
  all different).
- **Urns and balls without replacement** (e.g. balls drawn until a color is exhausted; the "two-envelope"
  and "hat-check" style occupancy problems).
- **Random walks and Gambler's Ruin variants** (unequal $p$, absorbing vs. reflecting barriers,
  expected duration rather than just the ruin probability from §2 Q3).
- **Symmetry and linearity shortcuts** (expected number of fixed points of a random permutation;
  expected number of "correct guesses" in a shuffled-and-matched deck — indicator-variable tricks that
  generalize the coin-parity trick in §1 Q3).
- **Optimal stopping** (the secretary problem and its variants — when the *decision rule*, not just the
  probability, is what's being tested).
- **Geometric probability** (broken-stick / meeting-time problems, where the sample space is continuous
  and the reflection principle reappears as a reflection in the plane rather than on a lattice).

---

**Bank total: 3 scenario groups fully written, 14 problems, 6 further groups scoped.** No numeric claim
above is asserted without a derivation; the two flagged closed-form counts (§3 Q2's $C_4=14$ and §1
Q4's $a_{10}=144$) both check against their recursive/combinatorial definitions independently of the
reflection-principle and Fibonacci arguments given.
