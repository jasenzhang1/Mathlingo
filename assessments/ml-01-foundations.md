# Machine Learning Cluster 1 — Foundations

ML Introduction, Loss Functions, Types of ML, Supervised vs Unsupervised, Classification vs
Regression, Curse of Dimensionality, Training/Validation/Test Set, Data Leakage (8 concepts). Same
table format as the linear-algebra clusters (e.g. [la-01](la-01-vectors-and-operations.md)), 5 items
per concept.

---

## Machine Learning Introduction (`ml-introduction`)
*Root · ancestors 0 · b₀ = −0.50*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −1.5 | Define machine learning in one sentence. | a system that improves its performance on a task from data/experience, rather than following explicitly hand-coded rules for that task | — |
| R2 | recall | mcq | −1.2 | ML differs from traditional rule-based programming in that: | ML *learns* the rules/patterns from data rather than having them hand-coded | claims "ML requires more code to be written by hand" — usually the reverse | — |
| A1 | apply | short-answer | −0.75 | Classify: (a) a spam filter using a hand-written banned-keyword list (b) a spam filter trained on millions of labeled emails. | (a) traditional programming; (b) machine learning | — |
| E1 | explain | short-answer | 0.0 | Why does ML tend to outperform hand-coded rules for tasks where the rules are hard to *articulate*, even when a human can easily recognize examples? | recognizing "what makes a handwritten 7 look like a 7" draws on pattern regularities that are easy to demonstrate but extremely hard to write down as explicit if-then rules; ML infers those regularities from many examples instead of requiring them to be stated in advance *(required)* | — |
| T1 | transfer | short-answer | 0.5 | Why is "machine learning" best understood as a spectrum of automation in decision logic, rather than a strict binary category? | many real systems mix hand-specified rules with learned components (e.g. a rule-based filter that defers ambiguous cases to a learned model) — the amount of logic that's learned versus specified varies continuously, not as an on/off switch *(required: a concrete mixed example)* | — |
| R3 | recall | mcq | −1.80 | Machine learning systems primarily improve their performance by: | being exposed to more data/experience | picks "being given more explicit hand-written rules" — that's the traditional-programming approach ML is contrasted with → `ml-introduction` |
| R4 | recall | short-answer | −1.35 | Name one classic example task where ML dramatically outperforms hand-coded rule systems. | image/handwriting recognition (or another example where "the rules" are hard to write down explicitly, e.g. speech recognition) | — |
| R5 | recall | mcq | −1.60 | Traditional rule-based programming requires a human to: | explicitly write out the logic/rules the system follows | picks "manually label millions of training examples" — that's a data-labeling task associated with supervised ML, not rule-writing → `ml-introduction` |
| R6 | recall | short-answer | −1.05 | Fill in the blank: ML systems are said to "___" from data, rather than being explicitly programmed. | learn | — |
| R7 | recall | mcq | −1.70 | True or false: a lookup table hard-coded by a human counts as machine learning. | false — it contains no learning process; it's just hard-coded rules stored as data | picks "true, since it uses data (the table)" — containing data isn't the same as learning from it → `ml-introduction` |
| R8 | recall | short-answer | −1.20 | Give one reason ML can adapt more easily than hand-coded rules when the underlying patterns in the world shift over time. | ML can be retrained on new data to capture the shift, whereas hand-coded rules require a human to notice the shift and manually rewrite the logic | — |
| R9 | recall | mcq | −1.90 | The term "training" in machine learning refers to: | the process of fitting a model's parameters to data | picks "the process of a human manually tuning rule thresholds" — that's not what training means in ML → `ml-introduction` |
| R10 | recall | short-answer | −1.10 | True or false: every computer program that processes data is doing machine learning. | false — only programs that improve/adapt their behavior *from* data (rather than following fixed hand-coded logic) count as ML | — |
| R11 | recall | mcq | −1.45 | Which of these is the clearest example of traditional (non-ML) programming? | a calculator app that adds two numbers using a fixed formula | picks "a spam filter trained on millions of labeled emails" — that's a canonical ML example → `ml-introduction` |
| R12 | recall | short-answer | −1.65 | State the one-sentence contrast between ML and traditional programming, in terms of what's given versus what's produced. | traditional programming: rules + data → output; machine learning: data + output (examples) → rules (a model) | — |
| R13 | recall | mcq | −1.00 | A key advantage of ML systems is that they generally require: | less manual rule-articulation, since the system infers patterns from data | picks "less data than rule-based systems need" — ML typically requires *more* data, not less → `ml-introduction` |
| R14 | recall | short-answer | −1.85 | True or false: hand-coded rule systems can, in principle, be extremely accurate on the exact cases their author anticipated. | true — their limitation is generalizing to cases the author didn't anticipate, not necessarily accuracy on anticipated cases | — |
| R15 | recall | mcq | −1.50 | The core question machine learning answers is: | "can a system learn to perform well on a task from examples, without being explicitly told how?" | picks "can a computer run faster than a human calculates?" — irrelevant to what defines ML → `ml-introduction` |
| R16 | recall | short-answer | −1.15 | Fill in the blank: ML is often summarized as "programming with ___ instead of instructions." | data (examples) | — |
| A2 | apply | short-answer | −0.60 | Classify: a thermostat that turns on heating below a fixed temperature threshold set by the installer. | traditional programming — the threshold rule is fixed and hand-set, not learned from data | — |
| A3 | apply | short-answer | −0.50 | Classify: a music app that adjusts its song recommendations based on which songs you've skipped versus replayed. | machine learning — it adapts its behavior based on observed data (your listening behavior) | — |
| A4 | apply | short-answer | −0.40 | Give one reason a self-driving car's object-detection system is a better fit for ML than for hand-coded rules. | the visual variety of real-world objects (lighting, angle, occlusion, weather) is far too vast to enumerate as explicit rules, but is learnable from many labeled examples | — |
| A5 | apply | short-answer | −0.20 | A company currently uses a hand-coded rule ("flag any transaction over $10,000") to catch fraud. Why might they eventually replace it with an ML model? | fraud patterns evolve and are often subtler than a single fixed threshold can catch; an ML model can learn more nuanced, adaptive patterns from historical fraud data | — |
| A6 | apply | short-answer | −0.05 | Give an example of a task where hand-coded rules remain clearly preferable to ML, and briefly say why. | e.g. tax bracket calculation — the rule is exact, simple, and never ambiguous, so there's nothing for a learned model to improve on, and ML would only add unnecessary uncertainty | — |
| E2 | explain | short-answer | 0.10 | Explain why "the rules are known exactly" is a signal that a task does NOT need machine learning. | if the exact logic mapping inputs to correct outputs is already known and simple to state, hand-coding it is both easier to build and more reliable than training a model to approximate something that's already fully specified — ML's advantage is specifically for tasks where the mapping is *not* easy to state explicitly *(required: names the already-fully-specified condition as the reason ML adds no value)* | — |
| E3 | explain | short-answer | 0.20 | Explain why "more data generally helps" is true for ML but not really meaningful for traditional rule-based programs. | ML models statistically estimate patterns from examples, so additional examples generally sharpen that estimate (up to a point); a rule-based program's behavior is fixed by its explicit logic and doesn't change or improve just because more data passes through it, since nothing in the program is being fit to that data *(required: the estimation-improves-with-more-examples argument, contrasted with fixed logic)* | — |
| E4 | explain | short-answer | 0.30 | Explain why ML systems can fail unpredictably on inputs unlike anything in their training data, in a way a well-specified rule-based system does not. | an ML model's behavior on any given input is really an interpolation/extrapolation from patterns seen during training; on inputs far outside that training distribution, there's no guarantee the learned pattern still applies, whereas a rule-based system's behavior on any input (even a bizarre one) is exactly whatever the explicit rule says, predictable by construction *(required: contrasts interpolation-based ML behavior with rule-based systems' explicit, input-independent predictability)* | — |
| E5 | explain | short-answer | 0.40 | Explain why the same underlying problem can sometimes be solved by either approach, with the choice coming down to engineering tradeoffs rather than one approach being objectively "right." | for some tasks (e.g. simple spam filtering with a short banned-word list), both a hand-coded rule and a trained ML model could achieve reasonable performance; the choice then hinges on practical tradeoffs — development time, need for labeled data, interpretability requirements, and how often the underlying patterns are expected to shift — rather than one approach being categorically superior *(required: a concrete example admitting both approaches, plus naming the tradeoff dimensions)* | — |
| T2 | transfer | short-answer | 0.65 | Why might a regulated industry (e.g. loan approval) sometimes prefer a simpler, hand-coded rule system over a more accurate ML model, even at some cost to raw predictive performance? | hand-coded rules are fully transparent and auditable — a regulator or affected customer can trace exactly why a decision was made — while many ML models (especially complex ones) are comparatively opaque; in a regulated context, interpretability and legal defensibility can outweigh a marginal accuracy gain *(required: names the interpretability/auditability tradeoff specifically)* | — |
| T3 | transfer | short-answer | 0.80 | Why does the rise of large pretrained models (e.g. large language models) blur the traditional-programming-versus-ML distinction even further than the mixed systems described in T1? | such models are trained once on massive general data, then applied to entirely new tasks via prompting or fine-tuning, without a human writing task-specific rules OR collecting task-specific training data in the traditional supervised sense — the model's "knowledge" spans far beyond any one deployment's directly observed data, making the traditional lines between "rules," "training data," and "task" harder to draw cleanly than in T1's simpler mixed-system example *(required: explains specifically how pretraining/transfer breaks the clean rules-vs-data-vs-task boundaries)* | — |

*Coverage: 16/6/5/3 — 30 items, −1.90…0.80.*

---

## Loss Functions (`loss-functions`)
*Prereq: ML Introduction · ancestors 1 · b₀ = −0.15*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −1.15 | Define a loss function and its role in training. | a number quantifying how wrong a prediction is for a given example; training minimizes it (typically via gradient descent) | — |
| R2 | recall | mcq | −0.9 | A good loss function should: | be lower for better predictions and higher for worse ones | claims it should "always output negative numbers" — an arbitrary, unnecessary requirement → `loss-functions` |
| A1 | apply | numeric | −0.35 | For squared error L(y,ŷ)=(y−ŷ)², compute the loss for y=5, ŷ=3. `[verified: 4]` | (5−3)²=4 | — |
| E1 | explain | short-answer | 0.35 | Why does squared error penalize large errors disproportionately more than small ones? `[verified: error 4 vs error 2 gives loss 16 vs 4, a 4x jump for a 2x larger error]` | squaring means doubling the error quadruples the loss (2²=4 vs 4²=16) rather than merely doubling it — large errors are punished much more than proportionally, which is exactly why squared loss is sensitive to outliers *(required: the concrete 4x-for-2x scaling)* | — |
| T1 | transfer | short-answer | 0.85 | Why might a house-price predictor prefer squared-error loss, while a loan-approval model prefers a different loss tailored to probability-like outputs? | squared error is well-suited to raw numeric targets where large misses are especially costly (house prices); a probability-valued output (approve/deny) calls for a loss built around probabilities themselves, like cross-entropy — a mismatch here foreshadows why `cross-entropy-loss` exists as a separate concept *(required: names the probability-output mismatch specifically)* | — |
| R3 | recall | short-answer | −1.45 | Define Mean Absolute Error (MAE) as a loss function. | the average of \|y−ŷ\| across examples — the absolute value of the error, rather than its square | — |
| R4 | recall | mcq | −1.05 | The "cost function," as distinct from a single-example "loss," is: | the loss averaged (or summed) over the whole training set | picks "identical to the loss — the terms are never distinguished" → `loss-functions` |
| R5 | recall | short-answer | −1.35 | What is the common shorthand name for squared-error loss, referencing its exponent? | L2 loss | — |
| R6 | recall | mcq | −0.95 | What is the common shorthand name for absolute-error loss? | L1 loss | picks "L0 loss" — a different, much less common construction counting nonzero errors → `loss-functions` |
| R7 | recall | short-answer | −1.55 | Define 0/1 loss for classification. | loss is 0 if the prediction is correct, 1 if incorrect | — |
| R8 | recall | mcq | −1.15 | Why is 0/1 loss rarely used directly for gradient-descent training? | it's not differentiable — a step function with zero or undefined gradient almost everywhere | picks "it's too computationally expensive to evaluate" — 0/1 loss is trivial to compute; the real issue is its gradient → `loss-functions` |
| R9 | recall | short-answer | −0.75 | State the general property a loss function usually needs for gradient-descent training to work smoothly. | differentiability (or at least sub-differentiability) with respect to the model's parameters | — |
| R10 | recall | mcq | −1.40 | Squared error, compared to absolute error, penalizes a given-size error: | more heavily (quadratically) as that error grows larger | picks "identically — both scale linearly with the size of the error" → `loss-functions` |
| R11 | recall | short-answer | −0.85 | True or false: the loss used during training must always be identical to the metric used to report final performance. | false — e.g. a model may train on smooth cross-entropy while being evaluated on accuracy, since accuracy isn't differentiable | — |
| R12 | recall | mcq | −1.25 | Minimizing the loss function over training data is generally the: | training objective — what the optimizer directly tries to reduce | picks "a side effect with no direct connection to what's being optimized" → `loss-functions` |
| R13 | recall | short-answer | −0.65 | Fill in the blank: absolute-error loss is defined as L(y,ŷ) = ___. | \|y − ŷ\| | — |
| R14 | recall | mcq | −1.50 | Compared to squared error, absolute error (MAE) is generally considered: | more robust to outliers, since it doesn't disproportionately amplify large errors | picks "equally sensitive to outliers as squared error" → `loss-functions` |
| R15 | recall | short-answer | −1.10 | True or false: a lower loss value always corresponds to a better-performing model on new, unseen data. | false — a very low *training* loss can reflect overfitting and doesn't guarantee good performance on unseen data | — |
| R16 | recall | mcq | −0.55 | Cross-entropy loss, studied as its own concept, is typically used for: | classification tasks with probability-valued outputs | picks "any regression task with a continuous numeric target" — cross-entropy is built around probabilities specifically → `loss-functions` |
| A2 | apply | numeric | −0.30 | For MAE with y=10, ŷ=7, compute the loss. `[verified: 3]` | \|10−7\|=3 | — |
| A3 | apply | numeric | −0.20 | For squared error with y=10, ŷ=7, compute the loss. `[verified: 9]` | (10−7)²=9 | — |
| A4 | apply | short-answer | −0.05 | Given the same error (3) in A2/A3, why do the two losses differ (3 vs 9)? | squaring amplifies the error nonlinearly, so a moderate error like 3 already yields a noticeably larger squared loss than the same error under absolute loss, per R10 | — |
| A5 | apply | numeric | 0.15 | A classifier is wrong on 8 of 40 test examples. Compute the average 0/1 loss. `[verified: 0.2]` | 8/40=0.2 | — |
| A6 | apply | numeric | 0.30 | For y=5: ŷ_A=6 (error 1), ŷ_B=9 (error 4). Compare the ratio of squared-error losses to the ratio of raw errors. `[verified: loss ratio 16, error ratio 4]` | squared losses are 1 and 16 (ratio 16); raw errors are 1 and 4 (ratio 4) — squared error amplifies the gap far beyond the raw errors' own ratio | — |
| E2 | explain | short-answer | 0.50 | Explain why 0/1 loss's non-differentiability specifically blocks gradient-descent training, using what gradient descent needs at each step. | gradient descent updates parameters using the loss's gradient with respect to them; 0/1 loss is a step function, flat (zero gradient) almost everywhere and discontinuous at the decision boundary, so it gives gradient descent no useful direction to move in — nearly every step sees zero gradient signal, even when the model is clearly wrong *(required: explains specifically why a flat/discontinuous loss gives no usable gradient signal)* | — |
| E3 | explain | short-answer | 0.60 | Explain why choosing squared error over absolute error is a meaningful design decision when a dataset has extreme outlier errors. | since squared error grows quadratically with error size, a handful of large outlier errors can dominate the total loss and pull the model's fit toward reducing those specific errors, potentially at the expense of the bulk of typical points; absolute error's linear scaling gives outliers proportionally less leverage, so the choice directly determines how much influence outliers have on the fitted model *(required: names the outlier-leverage mechanism specifically)* | — |
| E4 | explain | short-answer | 0.75 | Explain why "lower training loss" and "better model" can diverge, connecting to overfitting. | a model with enough capacity can drive training loss near zero by memorizing the training examples' specific noise rather than learning the genuine pattern; its loss on new, unseen data (which doesn't share that noise) can be far worse, even though training loss looked excellent — this is the seed of what `overfitting-underfitting` studies in depth *(required: names memorization-of-noise as the mechanism for the divergence)* | — |
| E5 | explain | short-answer | 0.90 | Explain why a training loss and a reporting metric can legitimately differ, using accuracy versus cross-entropy. | accuracy is easy to interpret but step-function-like and non-differentiable, making it unsuitable as a direct training signal (per E2); cross-entropy is differentiable and smoothly penalizes how confidently wrong a prediction was, giving gradient descent a usable signal, while remaining closely related to what accuracy is ultimately trying to improve *(required: explains both why accuracy can't train directly and why a differentiable proxy is legitimate)* | — |
| T2 | transfer | short-answer | 1.05 | Why might a weather company use different loss functions for predicting exact temperature versus probability of rain, from the same system? | exact temperature is a continuous target suited to squared or absolute error, which measure numeric closeness directly; probability of rain is probability-valued, better matched to a loss like cross-entropy that penalizes miscalibrated probabilities rather than raw numeric distance — the same mismatch T1 warned about with house prices versus loan approval *(required: connects to T1's probability-output mismatch argument, applied to a new example)* | — |
| T3 | transfer | short-answer | 1.35 | A recommender switches from squared error on star ratings to a ranking-based loss. Why might this improve real-world satisfaction even if exact rating predictions get numerically worse? | users mainly care which items rank at the top of a list, not an exact numeric rating value — a ranking loss directly optimizes correct relative ordering, which drives the actual user experience, while squared error on ratings can waste model capacity precisely predicting numbers the experience barely depends on; the "right" loss should reflect the true downstream objective, not just the most naturally available numeric target *(required: names the mismatch between what's easy to optimize and what matters, and the capacity-misallocation consequence)* | — |

*Coverage: 16/6/5/3 — 30 items, −1.55…1.35.*

---

## Types of Machine Learning (`types-of-machine-learning`)
*Prereq: ML Introduction · ancestors 1 · b₀ = −0.15*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −1.15 | Name the three broad categories of machine learning. | supervised, unsupervised, reinforcement learning | — |
| R2 | recall | mcq | −0.9 | Reinforcement learning differs from supervised learning in that: | it learns from delayed reward signals through interaction with an environment, rather than from labeled examples | claims it "uses no data at all" — RL still learns from data, just data generated through interaction → `types-of-machine-learning` |
| A1 | apply | short-answer | −0.35 | Classify: (a) learning chess by playing many games and observing win/loss outcomes (b) predicting house prices from labeled past sales (c) grouping customers with no predefined labels. | (a) reinforcement; (b) supervised; (c) unsupervised | — |
| E1 | explain | short-answer | 0.35 | Why is "having labels" the sharpest defining line specifically between supervised and unsupervised learning? | supervised learning's entire objective is defined by matching known labels; unsupervised learning has no such target to match against, only structure to discover — reinforcement learning is kept separate because its feedback is delayed and interactive rather than either present-or-absent labels *(required)* | — |
| T1 | transfer | short-answer | 0.85 | Give a real task that could be framed as either supervised or unsupervised learning depending on available data (e.g. fraud detection). Explain what determines the framing. | fraud detection with labeled past fraud cases is supervised; without labels, it becomes unsupervised anomaly/cluster detection — the *available data*, not the underlying task, determines which category applies *(required: names the data availability as the deciding factor)* | — |
| R3 | recall | short-answer | −1.45 | Name the five key components typically used to describe a reinforcement learning setup. | agent, environment, state, action, reward | — |
| R4 | recall | mcq | −1.05 | In reinforcement learning, feedback (reward) is typically: | delayed and often sparse, arriving after a sequence of actions | picks "immediate and available after every single action, just like supervised learning's labels" → `types-of-machine-learning` |
| R5 | recall | short-answer | −1.35 | Give two canonical examples of unsupervised learning tasks. | clustering and dimensionality reduction (e.g. PCA) | — |
| R6 | recall | mcq | −0.95 | Give two canonical examples of supervised learning tasks. | classification and regression | picks "clustering and anomaly detection" — both are unsupervised → `types-of-machine-learning` |
| R7 | recall | short-answer | −1.55 | What learning paradigm describes an agent learning through "trial and error" interactions? | reinforcement learning | — |
| R8 | recall | mcq | −1.15 | Semi-supervised learning is best described as: | training on a mix of a small amount of labeled data and a larger amount of unlabeled data | picks "training entirely on unlabeled data, like standard unsupervised learning" — the defining feature is the mix, not zero labels → `types-of-machine-learning` |
| R9 | recall | short-answer | −0.75 | True or false: supervised learning requires every training example to have a known label/output. | true | — |
| R10 | recall | mcq | −1.40 | A self-driving car learning to navigate through repeated attempts, penalized for crashes and rewarded for safe progress, is best framed as: | reinforcement learning | picks "supervised learning, since it's learning from experience" — the reward-driven trial-and-error structure, with no fixed labeled dataset of correct actions, points specifically to RL → `types-of-machine-learning` |
| R11 | recall | short-answer | −0.85 | State one key difference between the feedback signal in supervised learning versus reinforcement learning. | supervised learning gets an immediate, explicit correct-answer label per example; RL gets a reward signal that may be delayed and doesn't directly say what the correct action was | — |
| R12 | recall | mcq | −1.25 | Clustering, dimensionality reduction, and anomaly detection (without labeled anomalies) all fall under: | unsupervised learning | picks "reinforcement learning, since they all involve iterative algorithms" → `types-of-machine-learning` |
| R13 | recall | short-answer | −0.65 | Fill in the blank: reinforcement learning's goal is typically to learn a ___ that maximizes cumulative reward. | policy (a mapping from states to actions) | — |
| R14 | recall | mcq | −1.50 | Does unsupervised learning use any form of feedback signal at all? | no external reward signal, but it does use the structure/statistics inherent in the unlabeled data itself | picks "yes, an explicit reward signal just like reinforcement learning" — that's specifically what RL has and unsupervised learning lacks → `types-of-machine-learning` |
| R15 | recall | short-answer | −1.10 | True or false: a task can, in principle, be tackled using more than one of the three ML paradigms depending on how it's framed. | true, as with `ml-introduction`'s T2 fraud-detection example | — |
| R16 | recall | mcq | −0.55 | Which paradigm suits a robot learning to walk through repeated physical attempts, with no dataset of "correct" joint movements provided in advance? | reinforcement learning | picks "supervised learning, since walking is a well-defined physical task" — there's no pre-existing labeled dataset of correct movements, which rules out supervised learning → `types-of-machine-learning` |
| A2 | apply | short-answer | −0.30 | Classify: a robot vacuum that gets a positive signal for cleaning more area and a negative signal for bumping furniture, learning over many runs. | reinforcement learning — reward-driven trial and error, no dataset of pre-labeled correct actions | — |
| A3 | apply | short-answer | −0.15 | Classify: grouping news articles into topics with no predefined topic labels. | unsupervised learning (clustering) | — |
| A4 | apply | short-answer | 0.00 | Classify: predicting whether an email is spam, given a large labeled dataset of past spam/non-spam emails. | supervised learning (classification) | — |
| A5 | apply | short-answer | 0.15 | A dataset has 100,000 unlabeled images and only 500 labeled ones. Which paradigm is a natural fit for using all of this data together? | semi-supervised learning — combining the small labeled set with the much larger unlabeled set | — |
| A6 | apply | short-answer | 0.30 | An AI agent plays a video game, only finding out its final score at the end of a long sequence of moves. Which paradigm, and what specific challenge does this describe? | reinforcement learning; this describes the delayed/sparse-reward credit-assignment challenge — figuring out which of the many earlier moves actually contributed to the final score | — |
| E2 | explain | short-answer | 0.50 | Explain why reinforcement learning's reward signal, despite being weaker than a supervised label, is still sufficient to train a competent agent. | even though a reward doesn't say "this specific action was correct," aggregating reward signals over many trials lets the agent statistically associate actions/states with better or worse long-run outcomes, gradually shaping a policy favoring reward-producing behavior — sparser per step than a label, but accumulating into a genuine learning signal over enough interaction *(required: the aggregation-over-many-trials argument)* | — |
| E3 | explain | short-answer | 0.60 | Explain why semi-supervised learning can genuinely outperform supervised learning trained on the labeled subset alone, not just serve as a fallback when labels are scarce. | unlabeled data, even without labels, carries information about the input distribution's structure (e.g. which points cluster together); a semi-supervised method can use this structure to make better use of the few labels it does have, effectively letting the unlabeled data help "fill in" where the decision boundary should plausibly lie — information supervised-only training on the small labeled set has no access to *(required: names the structure-of-the-input-distribution argument, not just "more data is better")* | — |
| E4 | explain | short-answer | 0.75 | Explain why a robot-arm laundry-folding task could reasonably be tackled with either supervised learning or reinforcement learning, and what determines which is more practical. | if a large dataset of expert human demonstrations (correct joint trajectories) is available, this becomes supervised imitation learning; if no such dataset exists but the robot can attempt the task repeatedly with a success/failure signal, reinforcement learning becomes the natural fit — the deciding factor is which kind of data is actually available *(required: connects the choice explicitly to data availability, echoing `ml-introduction`'s T2 framing)* | — |
| E5 | explain | short-answer | 0.90 | Explain why "no labels" in unsupervised learning doesn't mean "no assumptions" — what must a clustering algorithm still assume? | even without labels, a clustering algorithm implicitly assumes some notion of similarity or distance between points (e.g. that nearby points in feature space likely belong together), and the quality of the resulting clusters depends heavily on whether that assumed similarity actually matches the data's real underlying structure *(required: names the implicit similarity/distance assumption as the hidden requirement)* | — |
| T2 | transfer | short-answer | 1.05 | Why has reinforcement learning proven historically harder to apply in real-world business settings than supervised learning, despite RL's conceptual appeal for sequential decisions? | RL typically needs many trial-and-error interactions with a real or simulated environment, but many real-world settings can't tolerate the cost/risk of live experimentation (a bad supply-chain decision has real consequences) or lack an accurate enough simulator to substitute for it; supervised learning, by contrast, can learn entirely from a historical dataset already on hand, with no risky live experimentation required *(required: names both the real-world-experimentation-risk barrier and the lack of accurate simulators)* | — |
| T3 | transfer | short-answer | 1.40 | Why might a recommendation system shift from a purely supervised "predict the next click" model toward a reinforcement-learning framing, even though the supervised version already works reasonably well? | a supervised click predictor optimizes immediate, single-step engagement, but maximizing long-run user satisfaction (not showing the same content repeatedly, occasionally exploring new content) is a sequential decision problem where today's recommendation affects tomorrow's engagement — RL's framing around cumulative reward over a sequence of decisions captures this long-run tradeoff in a way a single-step supervised predictor structurally cannot *(required: explains the single-step-versus-cumulative-sequential-reward distinction as the actual motivation)* | — |

*Coverage: 16/6/5/3 — 30 items, −1.55…1.40.*

---

## Supervised vs Unsupervised Learning (`supervised-vs-unsupervised-learning`)
*Prereq: Types of Machine Learning · ancestors 2 · b₀ = 0.05*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.95 | Define supervised and unsupervised learning. | supervised: learning a mapping from inputs to known outputs/labels; unsupervised: finding structure in unlabeled data | — |
| R2 | recall | mcq | −0.7 | Clustering is: | unsupervised | picks "supervised," missing that clustering uses no labels at all → `supervised-vs-unsupervised-learning` |
| A1 | apply | short-answer | −0.15 | Is PCA supervised or unsupervised? | unsupervised — it uses no outcome/label information, per `pca-matrix-edition`'s T1 in the linear-algebra sweep | — |
| E1 | explain | short-answer | 0.55 | Why is unsupervised learning generally harder to *evaluate* than supervised learning? | supervised learning has ground-truth labels to directly measure predictions against; unsupervised learning has no such reference, so "how good" a clustering or structure discovery is often requires indirect or subjective criteria *(required)* | — |
| T1 | transfer | short-answer | 1.05 | Why might a company with lots of raw data but few labels start with an unsupervised approach before investing in supervised modeling? | clustering or other unsupervised exploration can reveal structure in the data cheaply, without the expensive process of labeling, helping decide where labeling effort would even be worthwhile *(required)* | — |

*Coverage: 5 items, −0.95…1.05.*

---

## Classification vs Regression (`classification-vs-regression`)
*Prereq: Supervised vs Unsupervised Learning · ancestors 3 · b₀ = 0.19*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.81 | Distinguish classification from regression. | classification predicts a discrete category; regression predicts a continuous numeric value | — |
| R2 | recall | mcq | −0.55 | Predicting a house's exact sale price is: | regression | treats it as classification, perhaps by analogy to predicting a price *bucket* (which genuinely would be classification) → `classification-vs-regression` |
| A1 | apply | short-answer | 0.0 | Classify: (a) tomorrow's temperature in degrees (b) whether it will rain (c) a customer's total lifetime spend (d) a customer's segment label. | (a) regression (b) classification (c) regression (d) classification | — |
| E1 | explain | short-answer | 0.69 | Why can the same underlying task be reframed as either regression or classification, and why does that choice matter? | predicting an exact numeric quantity (regression) versus which bucket it falls into (classification) are different framings of related information; the choice determines which loss function and evaluation metric are appropriate — squared error doesn't apply to a category, and accuracy doesn't apply to a real number *(required: names that the loss/metric choice follows from the framing)* | — |
| T1 | transfer | short-answer | 1.19 | Why might "is blood pressure in the dangerous range" (classification) be more useful for a clinical decision tool than "predict the exact number" (regression), despite regression being more information-rich? | the clinical decision is itself binary (act or don't act), so a classification framing directly answers the question that matters operationally, while a regression output still requires a separate threshold decision downstream — more raw information doesn't always mean more decision-relevant output *(required)* | — |

*Coverage: 5 items, −0.81…1.19.*

---

## Curse of Dimensionality (`curse-of-dimensionality`)
*Prereq: ML Introduction · ancestors 1 · b₀ = −0.15*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −1.15 | Describe the curse of dimensionality. | as the number of features grows, the volume of the space grows exponentially, so any fixed amount of data covers a vanishing fraction of it — data becomes increasingly sparse | — |
| R2 | recall | mcq | −0.9 | As dimensionality increases (fixed sample size), distances between points tend to: | become less informative — points start looking roughly equidistant from each other | claims distances "become more informative/discriminating" — the opposite, and the source of KNN's high-dimensional struggles → `curse-of-dimensionality` |
| A1 | apply | numeric | −0.35 | If 100 points adequately cover a 1D range at some density, roughly how many are needed for the same density in 10 dimensions? `[verified: 100^10=10^20]` | 100¹⁰=10²⁰ — an astronomically larger requirement, illustrating the exponential blowup concretely | — |
| E1 | explain | short-answer | 0.35 | Why is most of a high-dimensional hypercube's volume near its corners/surface rather than its center? | as dimensions increase, the fraction of a cube's volume within any fixed distance of the center shrinks toward zero, since that "central" region's volume grows far more slowly than the full cube's — a genuinely counter-intuitive geometric fact underlying several curse-of-dimensionality phenomena *(required: names the differential volume growth, not just states the fact)* | — |
| T1 | transfer | short-answer | 0.85 | Why does the curse of dimensionality make K-Nearest-Neighbors degrade badly with many irrelevant features? | KNN relies on distance comparisons being meaningful; as noisy/irrelevant dimensions accumulate, per R2 all points start looking equidistant, drowning out the signal from the few genuinely useful features — a direct foreshadowing of `knn`'s own dependence on this concept | — |

*Coverage: 5 items, −1.15…0.85.*

---

## Training vs Validation vs Test Set (`training-validation-test-set`)
*Prereq: Supervised vs Unsupervised Learning · ancestors 3 · b₀ = 0.19*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.81 | Define the roles of the training, validation, and test sets. | training: fit the model; validation: tune hyperparameters/select among models; test: a final, unbiased performance estimate, used only once at the end | — |
| R2 | recall | mcq | −0.55 | Repeatedly checking test-set performance *while* tuning a model causes: | the test set to effectively become a second validation set, giving an overly optimistic final estimate | claims this causes "no problem at all" → `training-validation-test-set` |
| A1 | apply | short-answer | 0.0 | A 1000-example dataset is split 70/15/15 into train/val/test. Describe what each subset is used for, and at which stage. | training (70%) fits model parameters; validation (15%) is checked repeatedly during development to tune hyperparameters and pick among models; test (15%) is touched only once, at the very end, for the final reported number *(required: the "used only once" timing for test)* | — |
| E1 | explain | short-answer | 0.69 | Why is repeatedly checking test-set performance a form of subtle information leakage, even without directly training on it? | choosing which model or hyperparameters to keep *based on* test performance implicitly tunes the final choice to that specific test set — the test set influenced the decision even though no gradient step ever touched it, inflating its apparent future performance *(required: the "influenced the decision, not the gradients" distinction)* | — |
| T1 | transfer | short-answer | 1.19 | Why do ML competitions with a public leaderboard risk the same leakage problem, and why do they typically hold back a separate private leaderboard? | repeated public-leaderboard submissions let participants implicitly tune to the public test set exactly as in E1; a hidden private set, revealed only at the end, gives a genuinely unbiased final measure uncontaminated by that iterative tuning *(required: connects explicitly to E1's mechanism)* | — |

*Coverage: 5 items, −0.81…1.19.*

---

## Data Leakage (`data-leakage`)
*Prereq: Training vs Validation vs Test Set · ancestors 4 · b₀ = 0.30*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.7 | Define data leakage. | information that wouldn't be available at real prediction time (often, information from after the outcome occurred) accidentally influences training, making performance look better than it will be in practice | — |
| R2 | recall | mcq | −0.45 | A classic leakage example is: | using a feature only known *after* the outcome has already occurred | picks "using more training data" — unrelated to leakage → `data-leakage` |
| A1 | apply | short-answer | 0.1 | A loan-default model uses "account flagged for collections" as a feature. Why is this likely leakage if the flag is usually set *after* a default begins? | the feature is effectively a proxy for the outcome itself, available only once the default has already started — at true prediction time (before any default), this information wouldn't exist yet *(required: names the timing mismatch)* | — |
| E1 | explain | short-answer | 0.8 | Describe the subtler leakage that occurs when normalization or PCA is applied to the *entire* dataset before splitting into train/test. | the test set's own statistics (its mean, SD, or contribution to the PCA directions) leak into the preprocessing step, influencing the "trained" transformation even though the model itself never saw test labels directly *(required: names that leakage can happen through preprocessing statistics, not just labels)* | — |
| T1 | transfer | short-answer | 1.3 | Why does data leakage typically produce a model that looks great in development but fails badly in deployment? | the leaked information (future data, or test-set statistics) simply won't be available in the same form once the model faces genuinely new data in production — the apparent performance was borrowing information that deployment can't supply *(required)* | — |

*Coverage: 5 items, −0.7…1.3.*

---

## Cluster misconception index

| Tag | Blame |
|---|---|
| ML vs rule-based programming treated as requiring more manual code | `ml-introduction` |
| loss function sign/magnitude conventions assumed arbitrary | `loss-functions` |
| reinforcement learning assumed to use no data | `types-of-machine-learning` |
| clustering mistaken for supervised | `supervised-vs-unsupervised-learning` |
| numeric-vs-bucket framing conflated as always equivalent | `classification-vs-regression` |
| high-dimensional distances assumed to stay informative | `curse-of-dimensionality` |
| test set reused during iterative tuning | `training-validation-test-set` |
| leakage assumed to require direct label exposure | `data-leakage` |

**Cluster total: 40 items across 8 concepts.** All numeric claims verified by script, including the
100¹⁰ illustration of exponential data-density requirements.
