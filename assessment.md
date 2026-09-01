# Assessment Framework

How Mathlingo decides what to ask, what a good answer is, what it is worth, and when to ask again.

This is the design document for step 1.4 of the lesson page (`claude.md`). The engine lives in
[`web/src/lib/assessment/`](web/src/lib/assessment/); every section below names the module that
implements it, and the section numbers match the module header comments.

The framework has one organising commitment, and most of the rest follows from it:

> **The unit of memory is the concept, not the question.**

Anki schedules a card, because the card is the thing you memorised. We schedule a *concept* and draw
a **fresh** question from its pool each time it comes due. A learner who sees "P(X = 3) for
Binomial(10, 0.6)" every three weeks learns that answer. A learner who sees a different instance
every time has to re-derive the method, which is the thing we actually want to be durable. This is
why difficulty, memory state, and the EXP bar all attach to the concept, while questions are
interchangeable, disposable, and continuously replaced.

---

## 1. Where problems come from

*Implemented in [`sourcing.ts`](web/src/lib/assessment/sourcing.ts).*

### 1.1 The source registry

Sources are tiered by what we are permitted to do with them, not by how good they are. The tier is
recorded on every item and enforced at ingest.

| Tier | Examples | What we may do |
|---|---|---|
| **open** | MIT OCW (18.05, 18.06, 6.867), OpenStax, NIST/SEMATECH e-Handbook, Blitzstein & Hwang *Introduction to Probability*, ESL and *Deep Learning* free editions, Hyndman & Athanasopoulos *FPP3*, Boyd & Vandenberghe *Convex Optimization*, public PhD qualifying exams | Reproduce with attribution and a licence notice. Watch share-alike terms (most OCW is CC BY-NC-SA) before mixing with other material. |
| **restricted** | Casella & Berger, Bishop *PRML*, Shreve, Resnick, Verbeke & Molenberghs — most of [`textbooks.md`](textbooks.md) | Use the **task skeleton only**: what is being tested, in what form, at what level. The stem, the numbers, and the setting must be freshly authored. |
| **generated** | Authored from the concept and its prerequisites with no external seed | Free to use, and carries the heaviest verification burden, because no editor has ever read it. |

### 1.2 The restricted-tier line, precisely

This is worth being exact about, because the temptation to scrape a solutions manual is real and the
resulting product is both legally exposed and pedagogically worse.

What is protected is the *expression*: the wording, the specific setup, the choice of context and
numbers, the ordering of parts. What is not protected is the *idea* — that a learner should be able
to compute a binomial tail probability, or explain why a sufficient statistic loses no information
about a parameter.

So restricted sources are read for **what to assess**, and the item is written from scratch. In
practice that means recording a locator (`Casella & Berger, Ch. 3, binomial moment exercises`) for
internal traceability, never surfacing it to learners as an attribution, and requiring a named
reviewer before the item can leave draft (`SourceRef.rewriteApprovedBy`, enforced by `checkLicence`).

There is a bonus here rather than only a cost: an original stem set in a context the learner cares
about — a tennis serve, a trading desk, an A/B test — motivates the concept in a way a textbook's
urn problem does not, which is the analogies hypothesis in [`README.md`](README.md) applied to
assessment.

### 1.3 Retrieval pipeline

Runs offline, per concept, producing draft items:

1. **Query expansion.** Concept title plus aliases, standard notation, and the chapters that cover it
   in each registered text. "Sufficient Statistic" also searches for *factorisation theorem*,
   *T(X)*, *Fisher–Neyman*.
2. **Candidate retrieval** over the indexed corpora.
3. **Relevance classification.** Is this problem *about* the concept, or does it merely mention it?
   The common failure is a problem filed under a topic it uses in passing.
4. **Deduplication.** Embedding similarity on the stem, plus a structural fingerprint (format,
   parameter shape, answer type) — near-identical problems recur across texts constantly.
5. **Prerequisite-closure check** (§1.4). The gate a generic question bank cannot implement.
6. **Templating** (§1.5).
7. **Verification** (§1.6).

### 1.4 Prerequisite leakage — the check that matters most

An item filed under concept *C* may only require *C* and *C*'s ancestors in the prerequisite graph.

If it requires anything else, a learner who has legitimately reached *C* can fail it for a reason
that has nothing to do with *C* — and we would then debit their mastery of *C*, schedule *C* for
earlier review, and tell them they do not understand something they understand fine. The classic
case is a perfectly good MLE question that quietly needs the multivariate chain rule.

`checkPrereqClosure` walks the existing graph in [`prerequisiteGraph.ts`](web/src/lib/prerequisiteGraph.ts)
and blocks the item. A failure is genuinely ambiguous and both readings should be considered: either
the item is mis-filed and belongs downstream, **or** the graph is missing an edge.

The first item written against this check turned out to be the second case. An "explain why binomial
variance peaks at p = ½" item was blocked because Variance and Expectation were not upstream of
Bernoulli and Binomial Distributions — yet that lesson states E[X] = np and Var(X) = np(1 − p), so it
plainly depends on both. The edges were added to `concepts.ts` rather than the item being moved. That
is the check earning its place: it found a defect in the curriculum graph, from a single question, on
its first run.

The same argument was then applied across the rest of the distributions, and the graph made it cheap:
only **three** authored edges were needed. Hypergeometric, Normal, and Uniform gained Expectation and
Variance directly; Poisson, Geometric, and Negative Binomial already inherited them through Bernoulli
and Binomial; and Exponential, Gamma, Beta, Chi-Square, t, and F inherit through Poisson, Normal, or
Gamma. Every named distribution in the catalogue now has both upstream.

Four concepts were deliberately left alone, and the reasoning is worth recording because it is the
same judgement any future closure failure needs:

- **CDF** is *defined* before moments exist, and is an ancestor of Expectation — adding the edge would
  create a cycle, which is the graph stating the argument for us.
- **Joint**, **Marginal**, and **Conditional Distribution** describe how several random variables sit
  together; none of them states a moment. Where moments do enter that area — Covariance, Law of Total
  Expectation — those concepts already carry the dependency themselves.

The lesson generalises: prerequisite edges belong where a lesson *states* something, not everywhere a
topic feels related. A graph that encodes "these ideas are adjacent" gates learners on material they
do not need, and the closure check then inherits that noise and blocks perfectly good items.

### 1.5 Templating: compute the key, do not author it

Wherever the problem admits it, an item is stored as a template — a stem with `{param}` holes, a
sampling domain with cross-parameter constraints, and the *name of a solver* rather than a literal
answer.

Two things fall out of that. Correctness scales: one reviewed solver is worth a thousand reviewed
answer keys, and hand-authored keys are where question banks rot. And the learner cannot memorise
the number, which is the §0 commitment made operational.

Items that resist parameterisation — "why must rank(A) ≤ min(m, n)?" — are authored once and lean on
the rubric instead.

### 1.6 Verification gate

`verifyItem` runs the mechanical checks: prerequisite closure, licence and rewrite approval,
structural completeness per format, difficulty plausibility against the concept's depth in the graph,
and distractor diagnosis coverage. Passing earns **shadow** status, not live.

Going live additionally requires:

- **Two-solver agreement.** The key is computed by two independent implementations (closed form and
  numeric simulation, say) over a sample of drawn parameters. Disagreement blocks.
- **Human spot-review** of a sample from each new template.
- **Exposure floor.** Shadow items are served and graded, but the response does not move the
  learner's bar (`applyReview` checks `item.status === "live"`). Once the item has 30+ exposures and
  no flags from §4, it graduates. This is the single most important safety property in the design: a
  question nobody has vetted can never cost a learner EXP they earned.

---

## 2. What counts as a good answer

*Types in [`types.ts`](web/src/lib/assessment/types.ts).*

### 2.1 Formats and cognitive levels

`claude.md` §1.4 asks for three tiers — exact answers, then method-and-why, then something
multidisciplinary. Adding plain recall underneath gives four `CognitiveLevel`s: **recall**, **apply**,
**explain**, **transfer**. A concept is not considered assessed until it has live items at recall,
apply *and* explain (`auditCoverage` enforces this); a pool of computations measures arithmetic, not
understanding.

| Format | Adjudicated by |
|---|---|
| `numeric` | Relative tolerance against the computed key. Units checked separately from magnitude. |
| `symbolic` | CAS equivalence — `simplify(response − key) == 0` over a declared domain, not string comparison. `(n choose k)p^k(1−p)^(n−k)` has many correct spellings. |
| `mcq` / `multi-select` | Key, plus the misconception attached to whichever distractor was chosen. |
| `short-answer` | Rubric checklist, model judge. |
| `derivation` | Step-level rubric: required claims, plus **forbidden moves**. |
| `interview` | Multi-turn probing; the grader follows up on gaps. Grades several concepts at once. |

**Forbidden moves** deserve their own mention. Dividing by a quantity that may be zero, exchanging a
limit and an integral without justification, inferring independence from zero correlation — these
produce right-looking answers by invalid reasoning, and a rubric that only checks for the right
conclusion rewards them. `effectiveScore` caps any answer using one at 0.25, whatever else it got right.

### 2.2 Distractors are diagnoses

Every incorrect MCQ choice and every rubric element carries an optional `Misconception`, and each
misconception names a `blameConceptId`.

This is what turns a wrong answer from "incorrect" into "you read P(A|B) as P(B|A)" — feedback the
learner can act on, and, in §3.4, a signal about which *prerequisite* actually failed. An untagged
distractor is a warning at verification time, because it tells us the learner was wrong without
telling us the only part worth knowing.

### 2.3 Handwritten and spoken answers

Both normalise into the same pipeline: capture → transcription (math OCR or ASR) → LaTeX
normalisation → the adjudicator the format would have used anyway. Every grader returns the same
`Grade` shape, so the scoring layer never learns which channel a response came through.

Two rules protect the learner from the transcription layer:

- **Never grade an unconfirmed transcription.** Show what we read; let them correct it. A learner
  must not lose EXP because OCR read a 7 as a 1.
- **Confidence flows through to weight.** `confidenceWeightedScore` shrinks a low-confidence grade
  toward the model's prediction, so an uncertain reading moves the ability estimate less than a clean
  one. The attempt is still logged.

For speech: grade content only. Accent, disfluency, and false starts are not evidence about
statistics. Derivations are a poor fit for voice and verification warns on it.

### 2.4 Keeping the model judge honest

An LLM asked "grade this from 0 to 10" is not a measuring instrument. Four constraints make it one:

1. **Rubric-first.** The judge fills in a checklist of testable elements; the score is *computed*
   from the checklist by `effectiveScore`. It never emits a number directly.
2. **Blind.** The judge sees the response, the rubric, and the reference solution — not the learner's
   history, name, or current EXP. Otherwise strong learners get graded generously.
3. **Self-consistency.** Grade k times at temperature, take the median checklist. Disagreement across
   samples *is* the confidence signal.
4. **Abstain and escalate.** Low confidence, or a learner appeal, routes to human review rather than
   guessing.

Agreement with human re-grades is measured continuously per item (§4) and a rubric the judge cannot
apply consistently is treated as a defective rubric, not a defective learner.

---

## 3. Difficulty, grading, and the EXP bar

*Implemented in [`mastery.ts`](web/src/lib/assessment/mastery.ts), [`exp.ts`](web/src/lib/assessment/exp.ts), [`review.ts`](web/src/lib/assessment/review.ts).*

### 3.1 The measurement model

A two-parameter logistic item response model puts learner ability and item difficulty on one scale:

```
P(correct) = sigmoid(a · (θ − b))
```

`θ` is the learner's ability on a concept, `b` the item's difficulty in the same logits, `a` the item's
discrimination. A learner with θ = b has even odds.

Ability is carried as a **Gaussian belief**, not a point estimate, and updated with a one-step Laplace
approximation. Posterior precision is prior precision plus the Fisher information the item carried,
`a²·p·(1−p)`. Three useful things come free from that:

- **Uncertainty-scaled learning.** The first answer moves the estimate a long way; the fiftieth barely
  moves it. No hand-tuned learning-rate schedule.
- **Evidence value is explicit.** Information peaks at p = ½ — the formal statement of the intuition
  that a question the learner was always going to get right teaches us nothing.
- **Confidence is displayable.** A confident 0.8 and a one-lucky-answer 0.8 are different states and
  the bar shows them differently.

A **trust region** caps any single update at 1 logit. Without it the first response on a concept moves
the estimate ~2.4 logits, so one fumbled opening question collapses the bar — and because the item
selector then follows the estimate down, subsequent successes are unsurprising and worth little, so
recovery is slow. The cap keeps the shape of the Bayesian update while making it robust to a
distracted first answer or a bad transcription.

### 3.2 What a response is worth

`effectiveScore` collapses a rubric-level grade into a scalar, under two rules:

- A missed **required** element caps the score below the pass mark. An answer that lands the algebra
  but assumes independence it was not given is not a 70%; it is a miss with partial credit.
- **Speed does not enter this number.** Being slow but right is a correct answer, and taking longer
  should not lower our estimate of what the learner knows.

Speed is not discarded — it is spent in §5 instead, where it belongs. Slow-but-correct means *not yet
fluent*, and the right response to that is to see the concept again sooner, not to be marked down.
That split is the framework's answer to "depending on the speed and accuracy of their responses" in
`claude.md` §1.4.

### 3.3 The bar

```
EXP = 100 × mastery × retrievability
```

- **mastery** is the durable factor: the probability of clearing a reference-difficulty item, quoted
  at one standard deviation *below* the ability mean. It only moves when the learner is assessed, and
  the lower confidence bound means it has to be earned across several items rather than won on one.
- **retrievability** is the perishable factor: recall probability right now, draining along the
  forgetting curve of §5 with no input from the learner at all. This is what creates the pull back to
  a topic — the Anki mechanic rendered as a bar instead of a queue.

The product means a half-learned concept never looks full even when freshly reviewed, and a genuinely
mastered one still fades if abandoned. `ExpSnapshot.ceiling` reports the un-decayed mastery; drawn as
a ghost line behind the bar it tells the learner *"one review restores this"*, which is the honest
reading of the model rather than "you have lost this".

**Unlocking.** Dependent concepts open at `ceiling ≥ 65` — measured against the ceiling, not the
current value, so the gate does not slam shut on a proven concept the learner has not seen for a
fortnight. This threshold is the most consequential product dial in the framework, so its exchange
rate is worth knowing; simulated against a pool spanning ±2.5 logits:

| true ability θ | ≈ success rate on a typical item | mastery by item 10 | by item 25 | by item 60 |
|---|---|---|---|---|
| 2.0 | 85% | 75 | 81 | 86 |
| 1.0 | 72% | 59 | 63 | 69 |
| 0.0 | 50% | 32 | 36 | 43 |

A strong learner unlocks within a session; a shaky one needs a few. Raising the gate to 80 would make
most of the tree impassable — the conservatism is already carried by the lower confidence bound, and
doubling up on it here just blocks everyone.

### 3.4 Blame flows to prerequisites

`claude.md` §1.4 asks that "grades from previous units may also be affected". `applyReview` propagates
along the reduced prerequisite graph, asymmetrically:

| Signal | Weight | Rationale |
|---|---|---|
| Failure with a **diagnosed** misconception | 0.35 to the named `blameConceptId` | Strong evidence. The learner picked the distractor that swaps P(A\|B) for P(B\|A); we have genuinely observed something about Conditional Probability even though the question was about Bayes' Rule. |
| Failure with **no** diagnosis | 0.12 spread over immediate prerequisites, halving per hop, 2 hops max | Weak evidence, thinly spread. |
| Success | 0.05 credit to immediate prerequisites | Weakest. Getting a downstream question right suggests the scaffolding held, but it is no substitute for assessing the scaffolding. |

Indirect evidence is modelled as a virtual item pitched at the learner's current ability with
discrimination scaled by the weight — the same Bayesian machinery, explicitly worth a fraction of a
real observation. It does **not** increment `observations`, because we have not assessed that concept
and the item selector must not behave as though we have.

On blame the prerequisite is also **destabilised** (`stability × (1 − w/2)`), pulling its next review
forward. That is the more important half: we have not measured the prerequisite, so we should not
claim to have, but we have good reason to stop trusting that it is fresh — and the cheapest fix is to
go and look.

### 3.5 Choosing the next question

Pure maximum-information selection targets a 50% success rate: statistically optimal, motivationally
miserable. `selectNextItem` targets **75%** — hard enough to force real retrieval and to be
informative, easy enough that a session is not an exam — and breaks ties toward sharper items, away
from recently-seen instances, and toward cognitive levels the session has not covered yet, so a
review cannot end up being all arithmetic. Shadow items are penalised so they trickle through for
calibration without crowding out the assessment.

### 3.6 A known limit: online estimation is path-dependent

The streaming update has to exist — the bar must move the instant a learner submits. But items are
selected against the current estimate, so a bad early streak pitches later items low, which makes
later successes cheap. Simulated against a well-specified learner the online estimate recovers true
ability within about ±0.2 logits by item 60, which is fine; under model misspecification it can
wander further.

`estimateAbilityFromLog` is the correction: a batch MAP fit over the learner's whole response log for
a concept, order-independent by construction. It runs nightly. It matters for a second reason too —
item difficulties are continuously re-estimated (§4), so old responses were scored against `b` values
we no longer believe, and only a batch re-fit can retroactively account for that.

---

## 4. Keeping the bank honest

*Implemented in [`calibration.ts`](web/src/lib/assessment/calibration.ts).*

Every item is a measuring instrument, and instruments arrive faulty, drift, or turn out to measure
something else. With 232 concepts nobody is going to re-read the bank, so this has to come from
response data.

### 4.1 Item statistics

Computed per item once it clears 30 exposures:

- **mean score** (the IRT p-value) — how hard it turned out to be, versus what we assumed.
- **discrimination** — point-biserial correlation between score on this item and the learner's mastery
  of the concept. *The single most diagnostic number in the set.* Near-zero on a well-exposed item
  almost always means one of three things: the key is wrong, the wording is ambiguous, or the item is
  filed under the wrong concept. An item that strong and weak learners do equally well on is worse
  than useless, because it spends the learner's EXP on noise.
- **median latency** against the item's `expectedSeconds`, which is what the §5 speed signal is scaled
  against.
- **abandon rate** — opened and never submitted, usually meaning "I cannot tell what is being asked".
- **appeal rate**, and **judge–human agreement** on responses that got both.

### 4.2 Triage

`flagItem` sorts problems into three actions:

| Flag | Trigger | Action |
|---|---|---|
| `non-discriminating` | point-biserial < 0.1 | **quarantine** |
| `disputed` | appeal rate > 5% | **quarantine** |
| `too-hard` | mean score < 0.08 | review |
| `ambiguous` | abandon rate > 25% | review |
| `judge-unreliable` | agreement < 0.85 | review — the rubric is under-specified |
| `too-easy` | mean score > 0.97 | recalibrate |
| `slow` | median > 4× expected | recalibrate |

Thresholds are deliberately trigger-happy on quarantine. Pulling a good item costs one question out
of a large bank; leaving a mis-keyed one live costs a learner EXP they earned, which is the thing that
destroys trust in the bar and therefore in the product.

### 4.3 Learner feedback

A **report** control on every question, with a reason taxonomy that maps onto the flags above:
ambiguous / wrong answer key / typo / not about this topic / graded unfairly.

An **appeal** re-grades the response with a human or a higher-effort judge. A sustained appeal
**refunds** the EXP — replaying `applyReview` with the corrected grade, which is possible only because
the whole engine is pure and clock-injected — and quarantines the item. Making the refund automatic
and visible is what makes the bar feel like a fair account of what the learner knows.

### 4.4 Coverage audits

`auditCoverage` checks each concept's pool for: at least 8 live items (below that, a learner on a
monthly cadence starts recognising instances rather than re-deriving); live items at recall, apply,
*and* explain; and a difficulty spread of at least 1.5 logits, since a pool clustered at one level
gives the adaptive selector nothing to work with. This is the queue that tells authoring where to
spend its next hour.

### 4.5 What to optimise for

The tempting metric is immediate accuracy. It is the wrong one — it is maximised by making questions
easy, which is exactly the failure mode to avoid. The metrics of record are:

1. **Retention at the next review** at a fixed interval. Did the learning stick?
2. **Downstream success** on dependent concepts. Does clearing this concept actually predict clearing
   what it unlocks? This is a direct, testable check on the whole prerequisite graph.
3. **Appeal and report rates**, as a trust proxy.

A/B tests run on item variants, rubric versions, and scheduler parameters, and are scored on (1) and
(2) — never on session accuracy.

### 4.6 Re-fitting

Three loops, at three timescales:

- **Per response:** item difficulty, by Elo (`updateItemDifficulty`), with a step size that shrinks
  with exposure so new items calibrate fast and settled ones are not yanked by one answer.
- **Nightly:** learner abilities, by batch MAP over the full log (§3.6).
- **Periodically, once the review log is large enough:** the FSRS weights in §5, and a full IRT re-fit
  of the item bank. The shipped weights are a published prior, not a claim about our learners.

---

## 5. Decay and spaced recall

*Implemented in [`scheduling.ts`](web/src/lib/assessment/scheduling.ts).*

This is **FSRS**, the algorithm Anki has shipped as its default scheduler since 2023, not SM-2. SM-2
tracks an "ease factor" with no meaning outside the algorithm. FSRS tracks two quantities that are
exactly the things we want to reason about and show:

- **stability `S`** — days until recall probability falls to 90%.
- **retrievability `R(t)`** — recall probability right now. *This is the EXP bar's decay curve.*

```
R(t) = (1 + (19/81)·t/S) ^ −0.5
```

A power law, not an exponential — and the difference is not academic. The fat tail is why a mature
concept can go months without the learner actually losing it, whereas an exponential model would
insist on reviewing it fortnightly forever.

A successful review multiplies stability by a growth factor that is largest when retrievability was
*low* — reviewing something you nearly forgot is worth far more than reviewing something you just saw,
which is the whole point of spaced repetition and the reason cramming does not work. A lapse cuts
stability back, scaled by how difficult the concept has proven for this learner.

### 5.1 Speed enters here

`reviewGradeFor` combines accuracy and latency into the FSRS grade:

| Outcome | Grade | Effect |
|---|---|---|
| below pass | `AGAIN` | stability cut; concept returns within a day or two |
| pass, > 2× expected time | `HARD` | stability grows, but penalised — knows it, not fluent yet |
| pass, near expected | `GOOD` | normal growth |
| near-perfect, < 0.6× expected | `EASY` | bonus growth; interval stretches |

The `EASY` bucket is the one to watch during tuning. It multiplies stability by ~3, so a generously
set `expectedSeconds` makes it fire constantly and intervals balloon — in the seed bank's easy
two-item pool a simulated learner reaches a 688-day interval after eight reviews. The `slow` flag in
§4.2 catches `expectedSeconds` set too low; the mirror case needs the median-latency statistic
watched in the other direction too, and `expectedSeconds` should be re-fit from observed medians as
soon as there is data rather than left at the author's guess.

Fluency and knowledge are different things and this is where the distinction pays off. The slow-correct
learner keeps their mastery and gets asked again sooner, which is the correct treatment for someone
who can derive it but cannot yet recall it — the stated goal in `README.md` of material that is
"drilled and fluent for professionals".

### 5.2 Target retention varies across the graph

Forgetting a leaf concept costs the learner that concept. Forgetting a **hub** — Expectation, say,
which sits upstream of most of statistics — silently corrupts every review that depends on it, and we
would misattribute the resulting failures to the downstream topics.

So `targetRetentionFor` scales the retention target with the concept's transitive descendant count,
already computed for the concept map: **0.86 for a leaf, up to 0.94 for a major hub.** Hubs come back
sooner. This is a piece of scheduling that a flashcard app cannot do at all, and Mathlingo can only
because it has the graph.

`reviewPriority` orders the queue by how far past its target a concept has drifted, breaking ties
toward hubs for the same reason.

### 5.3 What decay looks like

For a concept at stability ≈ 64 days (roughly six successful reviews):

| elapsed | R | EXP (at ceiling 100) | due? |
|---|---|---|---|
| 0d | 1.000 | 100 | no |
| 7d | 0.987 | 99 | no |
| 30d | 0.949 | 95 | no |
| 90d | 0.867 | 87 | yes |
| 365d | 0.654 | 65 | yes |

The bar drains slowly and visibly rather than expiring. `dailyDecay` exposes the current slope for
display ("−0.4/day") — a number the learner watches ticking down is a considerably better nudge than
a due date they have to remember to check.

---

## Open questions

1. **Interview-format grading across concepts.** `README.md` wants a mock-interview mode grading
   several concepts at once. The blame-attribution problem there is genuinely harder than §3.4:
   evidence is entangled across a conversation rather than attached to one item. Probably needs the
   judge to attribute each exchange to a concept explicitly before any scoring happens.
2. **Cold start.** A learner arriving with a statistics degree should not grind from zero through 232
   concepts. A placement test that assesses hubs only and propagates *positive* evidence down the
   graph would fix this, but the credit weights in §3.4 are deliberately tuned for the opposite
   direction and would need separate calibration.
3. **Shared item difficulty across populations.** A first-year undergraduate and a quant preparing for
   interviews are not the same population, and a single `b` per item averages them. Multi-group IRT is
   the standard answer; it is worth deferring until there is enough data to see the split.
4. **How honest to be about the bar.** Showing mastery as a lower confidence bound is defensible and
   also means the number is lower than the learner expects. Worth testing whether the ghost-line
   ceiling is enough to make that feel fair rather than stingy.
