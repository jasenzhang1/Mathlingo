import type { WikiArticle } from "../types";

/**
 * Machine Learning cluster 12 — paradigms and methods the first eleven clusters
 * named without defining. Reinforcement learning was listed as one of the three
 * families in `types-of-machine-learning` and had no node; stacking was cited by
 * `ensemble-methods`, DBSCAN and hierarchical clustering by `clustering-methods`,
 * and Bayesian optimisation by `gp-regression`.
 */

const transferLearning: WikiArticle = {
  conceptId: "transfer-learning",
  summary:
    "Transfer learning reuses a model trained on one task as the starting point for another. It " +
    "works because the early layers of a large model learn features that are general rather than " +
    "task-specific, and it is the reason a useful image or language model can be built from " +
    "hundreds of examples rather than millions.",

  sections: [
    {
      heading: "Two ways to reuse a model",
      blocks: [
        {
          kind: "table",
          headers: ["", "Feature extraction", "Fine-tuning"],
          rows: [
            ["What is trained", "A new head only; the backbone is frozen", "Some or all of the backbone, plus the head"],
            ["Data needed", "Very little — hundreds of examples", "More — thousands upward"],
            ["Compute", "One forward pass per example, cacheable", "Full backward pass through the unfrozen layers"],
            ["Risk", "Underfits if the domains differ", "Overfits, or forgets what made the model useful"],
            ["Learning rate", "Normal", "Much smaller — often 10–100× lower than from scratch"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why the early layers transfer and the late ones do not",
          text:
            "The first layers of a vision model learn edges and textures — facts about images, not " +
            "about the thousand categories it was trained on. Those are as true of medical scans as " +
            "of photographs. The last layers encode the specific decision boundary, and that does " +
            "not transfer. This gradient of generality is why the standard recipe replaces the head, " +
            "keeps the stem, and unfreezes progressively from the top if it unfreezes at all.",
        },
      ],
    },

    {
      heading: "Doing it well",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Replace the head with one shaped for the new task and train only that, with the backbone frozen. Establish this baseline before anything more ambitious.",
            "If it underfits, unfreeze the top block or two and continue at a much lower learning rate.",
            "Use discriminative learning rates — smaller for earlier layers — so the general features are perturbed less than the specific ones.",
            "Match the preprocessing to the pretrained model exactly: its own normalisation statistics, its input size, its tokenizer. A mismatch here silently degrades everything downstream.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Catastrophic forgetting is the characteristic failure",
          text:
            "Fine-tuning aggressively on a small dataset overwrites the general features with " +
            "whatever fits those few hundred examples, and the model ends up worse than the frozen " +
            "backbone would have been. Low learning rates, early stopping, freezing most of the " +
            "network, and parameter-efficient methods that adapt a small number of added weights " +
            "all exist to prevent this.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Negative transfer is real when the domains are far apart",
          text:
            "Transfer is not free. If the source and target distributions differ enough, the " +
            "pretrained features can be actively unhelpful and a smaller model trained from scratch " +
            "does better. The assumption being made — that the source task's features are relevant " +
            "here — is an empirical claim about your data, and the frozen-backbone baseline is how " +
            "you test it cheaply.",
        },
      ],
    },
  ],

  references: [
    { source: "Yosinski et al., How Transferable Are Features in Deep Neural Networks?", locator: "NeurIPS 2014" },
    { source: "Howard & Ruder, Universal Language Model Fine-tuning for Text Classification", locator: "ACL 2018" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-12-further-paradigms.md" },
  ],
};

const selfSupervisedLearning: WikiArticle = {
  conceptId: "self-supervised-learning",
  summary:
    "Self-supervised learning manufactures its supervision from the input itself: hide part of the " +
    "data and predict it, or require two views of the same item to agree. The result is supervised " +
    "training with no annotation cost, which is what made pretraining on internet-scale corpora " +
    "possible.",

  sections: [
    {
      heading: "The trick, and why it is not a contradiction",
      blocks: [
        {
          kind: "prose",
          text:
            "It is structurally supervised — there is a target for every example and a loss " +
            "comparing the prediction to it — and practically unsupervised, because no human " +
            "produced any of those targets. The label comes from withholding information the data " +
            "already contained. That is the whole idea, and everything else is a choice of what to " +
            "withhold.",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "Masked prediction",
              description:
                "Hide tokens or patches and reconstruct them from the surrounding context. The dominant approach for language, and increasingly for vision.",
            },
            {
              term: "Next-token prediction",
              description:
                "Predict each element from all previous ones. The objective behind autoregressive language models — a self-supervised task whose scaling behaviour turned out to be remarkable.",
            },
            {
              term: "Contrastive learning",
              description:
                "Produce two augmented views of the same item and require their representations to be close, while pushing apart views of different items. Strong for vision, and dependent on the augmentations chosen.",
            },
            {
              term: "Pretext tasks",
              description:
                "Earlier hand-designed puzzles — predict a patch's rotation, solve a jigsaw of image tiles. Largely superseded, and useful for seeing the idea in its clearest form.",
            },
          ],
        },
      ],
    },

    {
      heading: "Why the representations turn out to be good",
      blocks: [
        {
          kind: "callout",
          tone: "insight",
          title: "A hard enough prediction task forces genuine structure",
          text:
            "Filling in a masked word from context cannot be done by memorisation at scale; it " +
            "requires syntax, and often semantics and world knowledge. The prediction itself is " +
            "usually not wanted — the internal representation built in order to make it is. The " +
            "pretext task is scaffolding, and it is discarded once the model is fine-tuned on " +
            "something real.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The task must not be solvable by a shortcut",
          text:
            "If a trivial cue answers the pretext task, the model learns the cue and nothing else. " +
            "Contrastive methods on images are the cautionary case: without care, colour histograms " +
            "alone identify which crops came from the same photograph, and the model learns colour " +
            "statistics rather than object structure. Designing augmentations that destroy the " +
            "shortcuts while preserving the meaning is most of the practical difficulty.",
        },
        {
          kind: "list",
          items: [
            "Contrastive methods need large batches or a memory bank, because the quality of the signal depends on having many negatives to push against.",
            "Collapse — every input mapped to the same vector — is the degenerate solution these objectives must be designed to avoid.",
            "The pairing with transfer learning is the point: pretrain self-supervised on abundant unlabelled data, then fine-tune on the small labelled set you actually have.",
            "The same recipe has moved into speech, video, code, protein sequences and tabular data, because the requirement — abundant unlabelled data with internal structure — is common.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Devlin et al., BERT: Pre-training of Deep Bidirectional Transformers", locator: "NAACL 2019" },
    { source: "Chen et al., A Simple Framework for Contrastive Learning of Visual Representations", locator: "ICML 2020" },
    { source: "He et al., Masked Autoencoders Are Scalable Vision Learners", locator: "CVPR 2022" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-12-further-paradigms.md" },
  ],
};

const reinforcementLearning: WikiArticle = {
  conceptId: "reinforcement-learning",
  summary:
    "Reinforcement learning is learning to act from delayed, evaluative reward. An agent takes " +
    "actions in an environment, receives a scalar reward, and must work out which of its past " +
    "choices deserve the credit. Two features make it genuinely different from supervised " +
    "learning: the feedback never says what the right action was, and the agent's own behaviour " +
    "determines the data it sees.",

  sections: [
    {
      heading: "The formal setting",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "State s", description: "What the agent observes. The Markov property — that the current state summarises everything relevant from the past — is what makes the problem tractable." },
            { term: "Action a", description: "What the agent may do." },
            { term: "Reward r", description: "A scalar arriving after an action, often zero for long stretches." },
            { term: "Policy π(a | s)", description: "The agent's behaviour: a distribution over actions given a state. This is what is learned." },
            { term: "Value V(s), Q(s, a)", description: "Expected discounted future reward from a state, or from a state-action pair. The quantity most algorithms estimate." },
            { term: "Discount γ", description: "How much future reward is worth relative to immediate reward. Below 1 it keeps infinite-horizon sums finite and expresses a preference for sooner." },
          ],
        },
        {
          kind: "formula",
          latex: "Q(s, a) = E[ r + γ·maxₐ′ Q(s′, a′) ]",
          caption: "The Bellman equation: today's value in terms of tomorrow's, which is what makes learning from single steps possible",
        },
      ],
    },

    {
      heading: "The two things that make it hard",
      blocks: [
        {
          kind: "callout",
          tone: "insight",
          title: "Evaluative feedback, not instructive feedback",
          text:
            "A supervised label says what the output should have been. A reward says only how good " +
            "the outcome was, and never what the better action would have been — so the agent " +
            "cannot compute an error to correct. It must try alternatives to find out, which is why " +
            "exploration is a structural necessity here and simply absent from supervised learning.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Temporal credit assignment",
          text:
            "A reward at move 40 may be owed to a decision at move 3. Nothing in the signal says so. " +
            "Value functions and eligibility traces exist to propagate credit backwards through " +
            "time, and the sparser the reward, the harder that becomes — which is why sparse-reward " +
            "tasks are the standard hard case.",
        },
        {
          kind: "prose",
          text:
            "A third difficulty follows from the first two: the data is not independent of the " +
            "model. A policy that never tries an action never learns about it, so an early " +
            "preference can become self-confirming. This is why held-out evaluation, the backbone " +
            "of supervised practice, does not transfer directly.",
        },
      ],
    },

    {
      heading: "Families of method",
      blocks: [
        {
          kind: "table",
          headers: ["Family", "What is learned", "Note"],
          rows: [
            ["Value-based (Q-learning, DQN)", "Q(s, a); the policy is argmax over it", "Natural for discrete actions; off-policy, so it can reuse old experience"],
            ["Policy-gradient (REINFORCE, PPO)", "The policy directly", "Handles continuous actions; higher variance, and usually on-policy"],
            ["Actor-critic", "Both, with the critic reducing the actor's variance", "The practical default for most modern work"],
            ["Model-based", "A model of the environment's dynamics", "Far more sample-efficient, and only as good as the learned model"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Reward specification is the part that goes wrong in practice",
          text:
            "An agent optimises the reward you wrote, not the outcome you meant. Reward a cleaning " +
            "robot for collected dirt and it learns to tip the bin out and re-collect it. Every " +
            "such story is the same failure: an objective that was easy to measure and not quite " +
            "the goal. Getting the reward right is usually harder than getting the algorithm right.",
        },
        {
          kind: "list",
          items: [
            "Sample efficiency is the standing weakness: methods that need millions of episodes are fine in a simulator and impossible on physical hardware.",
            "Simulation-to-reality transfer is its own research problem, since a policy exploits a simulator's inaccuracies as readily as its physics.",
            "Offline reinforcement learning — learning from a fixed logged dataset with no further interaction — is where the field meets the constraints of most real applications.",
            "Bandits are the special case with a single state, and are the right place to see the exploration problem in isolation.",
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Sutton & Barto, Reinforcement Learning: An Introduction (2nd ed.)", locator: "Ch. 1–6" },
    { source: "Mnih et al., Human-level Control through Deep Reinforcement Learning", locator: "Nature 518, 2015" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-12-further-paradigms.md" },
  ],
};

const multiArmedBandits: WikiArticle = {
  conceptId: "multi-armed-bandits",
  summary:
    "A bandit problem is reinforcement learning stripped to its core: several actions, each with " +
    "an unknown reward distribution, no state, and a fixed number of pulls. It isolates the " +
    "exploration-exploitation trade-off completely, which is why the algorithms that solve it come " +
    "with guarantees the general case does not have.",

  sections: [
    {
      heading: "The trade-off, and how it is scored",
      blocks: [
        {
          kind: "formula",
          latex: "Regret(T) = T·μ* − Σₜ E[reward at t]",
          caption: "Cumulative shortfall against always having played the best arm",
        },
        {
          kind: "prose",
          text:
            "Every pull is a choice between exploiting the arm that currently looks best and " +
            "exploring one whose value is still uncertain. Regret is the right scoreboard because " +
            "it charges for both mistakes at once: exploiting too early leaves you stuck on a " +
            "suboptimal arm forever, exploring too long spends pulls on arms already known to be " +
            "worse. Sublinear regret — regret growing more slowly than T — is the goal, and means " +
            "the average per-pull loss tends to zero.",
        },
      ],
    },

    {
      heading: "The standard algorithms",
      blocks: [
        {
          kind: "definitions",
          items: [
            {
              term: "ε-greedy",
              description:
                "Play the best-looking arm with probability 1 − ε, otherwise pick at random. Trivial to implement, and its regret is linear at fixed ε because it never stops exploring at a constant rate. Decaying ε fixes this.",
            },
            {
              term: "Upper confidence bound (UCB)",
              description:
                "Play the arm with the highest optimistic estimate — its mean plus a confidence width that shrinks as it is pulled more. Optimism in the face of uncertainty, and it achieves logarithmic regret.",
            },
            {
              term: "Thompson sampling",
              description:
                "Keep a posterior over each arm's value, draw one sample from each, and play the argmax. Explores in proportion to the probability that an arm is best, and is usually the strongest performer in practice as well as being provably good.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "UCB's confidence width is doing exactly what a Gaussian process's variance does",
          text:
            "An arm pulled rarely has a wide interval and therefore a high optimistic estimate, so " +
            "it gets tried. As evidence accumulates the interval narrows and the arm is judged on " +
            "its mean. That is the same balance a Bayesian optimiser strikes using a model's " +
            "predictive variance — bandits are the version where the uncertainty comes from a " +
            "count rather than from a fitted surface.",
        },
      ],
    },

    {
      heading: "Where they are used",
      blocks: [
        {
          kind: "list",
          items: [
            "Adaptive A/B testing: rather than splitting traffic evenly for a fixed period, shift it toward the winning variant as evidence accumulates, which reduces the cost of testing a bad variant on real users.",
            "Contextual bandits add features describing each round, so the best arm depends on who is being served — the setting behind most recommendation and ad-selection systems.",
            "Clinical trial design, where the ethical cost of assigning patients to a treatment already believed inferior is exactly what regret measures.",
            "Hyperparameter search: successive halving and Hyperband are bandit algorithms over configurations, allocating budget to the ones still looking promising.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Adaptive allocation breaks the standard significance test",
          text:
            "A classical hypothesis test assumes the sample sizes were fixed in advance. A bandit " +
            "deliberately violates that — allocation depends on results so far — so p-values " +
            "computed as if it had not are wrong. If a defensible significance statement is needed " +
            "alongside the traffic savings, an always-valid sequential test is required, not the " +
            "usual one applied at the end.",
        },
      ],
    },
  ],

  references: [
    { source: "Lattimore & Szepesvári, Bandit Algorithms", locator: "Ch. 4–8" },
    { source: "Russo et al., A Tutorial on Thompson Sampling", locator: "Foundations and Trends in ML 11(1), 2018" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-12-further-paradigms.md" },
  ],
};

const bayesianOptimization: WikiArticle = {
  conceptId: "bayesian-optimization",
  summary:
    "Bayesian optimisation tunes an expensive black-box function by fitting a probabilistic model " +
    "to the observations so far and using its uncertainty to choose where to evaluate next. It is " +
    "the method of choice when each evaluation costs hours and only a few dozen are affordable.",

  sections: [
    {
      heading: "The loop",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Fit a surrogate model — usually a Gaussian process — to the configurations tried and the scores they gave.",
            "Maximise an acquisition function over the surrogate to choose the next configuration.",
            "Evaluate the real objective there, add the result, and repeat.",
          ],
        },
        {
          kind: "prose",
          text:
            "The acquisition function is cheap to optimise because it is defined on the surrogate, " +
            "not on the real objective. That is the trade the whole method rests on: replace a few " +
            "expensive queries with many cheap ones against a model of what those queries would " +
            "return.",
        },
        {
          kind: "definitions",
          items: [
            { term: "Expected improvement", description: "Expected amount by which a point beats the best score so far. The standard default, and it balances the two concerns automatically." },
            { term: "Upper confidence bound", description: "Predicted mean plus a multiple of the predictive standard deviation. One explicit parameter controlling how much exploration is bought." },
            { term: "Probability of improvement", description: "Probability of beating the incumbent at all, regardless of by how much. Tends to under-explore, since a tiny certain gain outranks a large uncertain one." },
          ],
        },
      ],
    },

    {
      heading: "Why a Gaussian process is the natural surrogate",
      blocks: [
        {
          kind: "callout",
          tone: "insight",
          title: "The acquisition function consumes exactly what a GP returns",
          text:
            "Every acquisition function needs a predicted mean and a predicted variance at any " +
            "candidate point. A Gaussian process returns both, from conditioning rather than from " +
            "a bolt-on estimator, and its cubic cost is irrelevant when there are forty " +
            "observations. The fit is close to exact: the regime where GPs are computationally " +
            "hopeless is precisely the regime where evaluations are cheap and Bayesian optimisation " +
            "is unnecessary.",
        },
        {
          kind: "table",
          headers: ["Surrogate", "Suits", "Note"],
          rows: [
            ["Gaussian process", "Continuous, low-dimensional spaces", "The default; calibrated uncertainty from conditioning"],
            ["Tree-structured Parzen estimator", "Mixed and conditional spaces", "Models p(x | good) and p(x | bad) instead of the objective — handles categorical and conditional hyperparameters naturally"],
            ["Random forest", "Mixed spaces, more observations", "Uncertainty from the spread of tree predictions; less principled, more scalable"],
          ],
        },
      ],
    },

    {
      heading: "When to use it, and when not to",
      blocks: [
        {
          kind: "list",
          items: [
            "Use it when a single evaluation costs minutes to hours, the budget is tens of evaluations, and the objective is a black box with no usable gradient.",
            "Do not use it when evaluations are cheap: random search is simpler, parallelises trivially, and will have tried more configurations by the time the surrogate is fitted.",
            "It degrades in high dimensions, like most methods that model a surface — beyond roughly twenty hyperparameters the surrogate has too little data per dimension to be informative.",
            "Parallel evaluation needs care: the loop is inherently sequential, so batch variants must deliberately pick diverse points rather than the same optimum several times.",
            "Successive halving and Hyperband attack the same problem from the other direction — cheap partial evaluations of many configurations rather than careful choice of few — and hybrids of the two are strong.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Its own settings are hyperparameters, and it cannot tune them",
          text:
            "The kernel, its length scales, the acquisition function and any exploration constant " +
            "are all choices, and a badly specified kernel produces a surrogate that misleads the " +
            "search. Marginal-likelihood optimisation of the kernel parameters helps and does not " +
            "eliminate the regress. On a small budget it is worth checking that the method is " +
            "beating random search rather than assuming it.",
        },
      ],
    },
  ],

  references: [
    { source: "Snoek, Larochelle & Adams, Practical Bayesian Optimization of Machine Learning Algorithms", locator: "NeurIPS 2012" },
    { source: "Shahriari et al., Taking the Human Out of the Loop: A Review of Bayesian Optimization", locator: "Proc. IEEE 104(1), 2016" },
    { source: "Rasmussen & Williams, Gaussian Processes for Machine Learning", locator: "Ch. 2, Regression" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-12-further-paradigms.md" },
  ],
};

const stacking: WikiArticle = {
  conceptId: "stacking",
  summary:
    "Stacking trains a second-level model to combine the predictions of several first-level ones. " +
    "Unlike bagging and boosting it draws its diversity from using genuinely different model " +
    "families, and unlike them it has a leakage failure mode that must be designed around rather " +
    "than avoided by luck.",

  sections: [
    {
      heading: "The construction",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Choose several base models from different families — a boosted ensemble, a regularised linear model, a nearest-neighbour model, a network.",
            "Generate out-of-fold predictions: for each fold, fit each base model on the other folds and predict the held-out one. Every row ends up with predictions from models that never saw it.",
            "Train the meta-model on that matrix of out-of-fold predictions, with the true labels as its target.",
            "Refit each base model on all the data for deployment, and apply the meta-model to their outputs.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Step 2 is the whole method, and skipping it is the classic failure",
          text:
            "Train the meta-model on predictions the base models made for rows they were fitted on " +
            "and it sees near-perfect inputs from whichever base model overfitted hardest. It " +
            "learns to trust that model, which will not reproduce its training performance on new " +
            "data, and the entire stack is optimistic. The out-of-fold discipline is what makes the " +
            "meta-model's inputs resemble what it will actually receive.",
        },
      ],
    },

    {
      heading: "Choosing the parts",
      blocks: [
        {
          kind: "callout",
          tone: "insight",
          title: "Diversity here comes from disagreement about *how*, not from resampling",
          text:
            "Bagging manufactures diversity by resampling one algorithm; boosting by aiming each " +
            "member at the last one's errors. Stacking gets it by combining families whose " +
            "inductive biases genuinely differ — a tree ensemble and a linear model fail on " +
            "different examples because they assume different things. Stacking five variants of the " +
            "same gradient-boosted model recovers very little, which is the practical test of " +
            "whether your base set is diverse.",
        },
        {
          kind: "list",
          items: [
            "Keep the meta-model simple. A regularised linear model or a shallow tree is standard; a complex one overfits the small out-of-fold matrix and adds variance where the point was to remove it.",
            "Feeding predicted probabilities rather than hard labels gives the meta-model more to work with.",
            "Adding the original features alongside the base predictions lets the meta-model learn which base model to trust in which region — powerful, and a further overfitting risk.",
            "Blending is the cheaper cousin: one held-out split rather than full k-fold. Faster, and the meta-model is fitted on less data.",
            "Gains are usually small — a fraction of a percent — for a large increase in complexity and serving cost. It earns its place in competitions and rarely in production.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Honest evaluation of a stack requires an outer loop",
          text:
            "The out-of-fold predictions were built using the labels, and the meta-model was " +
            "selected against them, so a cross-validated score computed inside the same folds is " +
            "optimistic. Scoring the whole stacking procedure needs an outer resampling loop around " +
            "the entire pipeline — the same argument that motivates nested cross-validation, " +
            "applied to a construction that makes the temptation especially easy to miss.",
        },
      ],
    },
  ],

  references: [
    { source: "Wolpert, Stacked Generalization", locator: "Neural Networks 5(2), 1992" },
    { source: "Breiman, Stacked Regressions", locator: "Machine Learning 24(1), 1996" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-12-further-paradigms.md" },
  ],
};

const hierarchicalClustering: WikiArticle = {
  conceptId: "hierarchical-clustering",
  summary:
    "Hierarchical clustering builds a tree of nested groupings rather than one partition. It needs " +
    "no k in advance, produces a dendrogram showing structure at every scale, and defers the " +
    "granularity decision to inspection — which is genuinely useful when that decision is the " +
    "question.",

  sections: [
    {
      heading: "Agglomerative merging",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Start with every point as its own cluster.",
            "Merge the two closest clusters, where 'closest' is defined by the linkage rule.",
            "Repeat until one cluster remains, recording the distance at each merge.",
          ],
        },
        {
          kind: "prose",
          text:
            "The record of merges is the dendrogram: a tree whose height at each join is the " +
            "distance at which those groups combined. Cutting it horizontally at any height yields " +
            "a partition, so one fit supplies every k at once. Divisive clustering runs the other " +
            "way, splitting from a single cluster down, and is far less common because the first " +
            "split is an expensive search.",
        },
      ],
    },

    {
      heading: "Linkage is the modelling assumption",
      blocks: [
        {
          kind: "table",
          headers: ["Linkage", "Distance between clusters", "Tendency"],
          rows: [
            ["Single", "Closest pair", "Follows chains; finds elongated shapes, and suffers chaining through noise bridges"],
            ["Complete", "Furthest pair", "Compact, roughly equal-diameter clusters; sensitive to outliers"],
            ["Average", "Mean over all cross pairs", "A compromise, and the common default"],
            ["Ward", "Increase in within-cluster sum of squares", "Compact, similarly sized clusters — the k-means objective, greedily and hierarchically"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The linkage rule changes the answer as much as the algorithm does",
          text:
            "Single linkage will merge two well-separated blobs joined by a thin bridge of noise " +
            "points, because the closest pair spans the bridge. Complete linkage will refuse to, " +
            "and will also refuse to keep a genuinely elongated cluster together. Neither is wrong; " +
            "each encodes a different belief about what a cluster is, and it must be chosen rather " +
            "than defaulted to.",
        },
      ],
    },

    {
      heading: "Costs and honest limits",
      blocks: [
        {
          kind: "list",
          items: [
            "Cost is O(n² log n) time and O(n²) memory for the distance matrix, so it does not reach the sample sizes k-means handles comfortably.",
            "Merges are greedy and irreversible: a bad early merge cannot be undone by a later one, which is the same limitation a decision tree's greedy splitting has.",
            "The dendrogram's leaf ordering is not unique — many orderings are consistent with the same tree — so apparent adjacency in the plot means nothing.",
            "Ward linkage requires a Euclidean metric to be meaningful, since its criterion is defined through sums of squares.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Not needing k in advance is not the same as not needing to choose",
          text:
            "The dendrogram defers the decision rather than removing it: where to cut is exactly as " +
            "unfalsifiable as choosing k, and is now made by eye. The genuine gain is that you can " +
            "see the structure at every scale before deciding, and whether the merge distances jump " +
            "sharply anywhere — which is real information a single partition does not give you.",
        },
      ],
    },
  ],

  references: [
    { source: "Hastie, Tibshirani & Friedman, The Elements of Statistical Learning", locator: "§14.3.12, Hierarchical Clustering" },
    { source: "James et al., An Introduction to Statistical Learning", locator: "§12.4.2, Hierarchical Clustering" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-12-further-paradigms.md" },
  ],
};

const densityBasedClustering: WikiArticle = {
  conceptId: "density-based-clustering",
  summary:
    "DBSCAN defines a cluster as a maximal set of points connected through dense neighbourhoods. " +
    "It finds arbitrarily shaped clusters, requires no k, and — uniquely among the standard " +
    "methods — labels points that belong to no cluster as noise rather than forcing them into one.",

  sections: [
    {
      heading: "Three kinds of point",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Core point", description: "Has at least minPts neighbours within distance ε. These are the points dense enough to grow a cluster from." },
            { term: "Border point", description: "Within ε of a core point but without enough neighbours of its own. It joins that cluster and cannot extend it." },
            { term: "Noise point", description: "Neither. It is assigned to no cluster at all, which is an output the method is willing to give." },
          ],
        },
        {
          kind: "prose",
          text:
            "A cluster is then a maximal set of density-connected points: start from a core point, " +
            "absorb everything within ε, and keep expanding from any new core points found. Because " +
            "growth follows connectivity rather than distance to a centre, a cluster can be any " +
            "shape at all — two concentric rings separate cleanly, where a centroid method must cut " +
            "them into wedges.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Noise as a first-class outcome is the real distinction",
          text:
            "k-means assigns every point to a cluster, so an outlier is forced in and drags its " +
            "centroid. DBSCAN can say a point belongs nowhere. That single difference makes it " +
            "robust to outliers and makes it usable as an anomaly detector, and it is why the " +
            "output cannot be evaluated with metrics that assume a complete partition.",
        },
      ],
    },

    {
      heading: "Choosing ε and minPts",
      blocks: [
        {
          kind: "list",
          items: [
            "minPts: a common starting point is twice the dimensionality. Larger values give more robust density estimates and more points labelled noise.",
            "ε: plot each point's distance to its k-th nearest neighbour, sorted. The elbow in that curve is the standard heuristic — below it, points are in dense regions; above, they are isolated.",
            "Both depend on the distance metric, so features must be scaled first — an unscaled feature sets ε's meaning by itself.",
            "The two interact: raising minPts usually requires raising ε to avoid labelling most of the data noise.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "A single global ε cannot serve clusters of different densities",
          text:
            "This is DBSCAN's characteristic failure. One ε that correctly separates a dense cluster " +
            "will merge two sparser ones, and one that separates the sparse pair will shatter the " +
            "dense cluster into fragments and noise. HDBSCAN exists precisely for this: it builds a " +
            "hierarchy over density levels and extracts clusters that are stable across them, " +
            "removing ε as a parameter altogether.",
        },
        {
          kind: "table",
          headers: ["", "k-means", "DBSCAN"],
          rows: [
            ["Needs k", "Yes", "No — but needs ε and minPts"],
            ["Cluster shape", "Convex, roughly spherical", "Arbitrary"],
            ["Outliers", "Forced into a cluster", "Labelled noise"],
            ["Clusters of differing density", "Handled poorly", "Handled poorly, for a different reason"],
            ["Cost", "Linear per iteration", "O(n log n) with a spatial index, O(n²) without"],
            ["Determinism", "Depends on initialisation", "Deterministic apart from border-point ties"],
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Ester et al., A Density-Based Algorithm for Discovering Clusters", locator: "KDD 1996" },
    { source: "Campello, Moulavi & Sander, Density-Based Clustering Based on Hierarchical Density Estimates", locator: "PAKDD 2013" },
    { source: "Mathlingo assessment bank", locator: "assessments/ml-12-further-paradigms.md" },
  ],
};

export const ml12FurtherParadigms: WikiArticle[] = [
  transferLearning,
  selfSupervisedLearning,
  reinforcementLearning,
  multiArmedBandits,
  bayesianOptimization,
  stacking,
  hierarchicalClustering,
  densityBasedClustering,
];
