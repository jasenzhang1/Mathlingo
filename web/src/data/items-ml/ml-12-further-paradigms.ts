import type { Item } from "../../lib/assessment/types";
import { ML_12 } from "./sources";

/**
 * Cluster 12 — further paradigms and methods. Eight items per concept, two each
 * at recall, apply, explain and transfer. Authored directly in typed form; see
 * `assessments/ml-12-further-paradigms.md` for the design record.
 */
export const ml12Items: Item[] = [
  // --- Transfer Learning ----------------------------------------------------
  {
    id: "transfer-learning--recall-two-modes",
    conceptId: "transfer-learning",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Name the two ways of reusing a pretrained model and say what is trained in each.",
    rubric: {
      elements: [
        { id: "feature-extraction", description: "Feature extraction: freeze the backbone and train only a new head.", weight: 3, required: true },
        { id: "fine-tuning", description: "Fine-tuning: also update some or all of the backbone, at a much lower learning rate.", weight: 3, required: true },
      ],
    },
    difficulty: 0.4,
    discrimination: 1.2,
    expectedSeconds: 55,
    prereqClosure: ["transfer-learning", "convolutional-neural-networks"],
    source: ML_12,
    status: "live",
  },
  {
    id: "transfer-learning--recall-which-layers-transfer",
    conceptId: "transfer-learning",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Which part of a pretrained network transfers best to a new task?",
    choices: [
      { id: "a", text: "The early layers, which learn general features rather than task-specific ones", correct: true },
      {
        id: "b",
        text: "The final classification layer, which is the most refined",
        correct: false,
        misconception: {
          id: "head-thought-to-transfer",
          description:
            "The head encodes the specific decision boundary for the original label set — it is the one part that is always replaced.",
          blameConceptId: "transfer-learning",
        },
      },
      {
        id: "c",
        text: "All layers transfer equally well",
        correct: false,
        misconception: {
          id: "uniform-transfer-assumed",
          description:
            "Missing the gradient of generality is what leads people to fine-tune everything aggressively and destroy the features they came for.",
          blameConceptId: "transfer-learning",
        },
      },
      {
        id: "d",
        text: "None — a pretrained model must be retrained from scratch for a new task",
        correct: false,
        misconception: {
          id: "transfer-thought-impossible",
          description:
            "This denies the phenomenon entirely. Early-layer features are facts about the input medium, not about the original task's categories.",
          blameConceptId: "transfer-learning",
        },
      },
    ],
    difficulty: 0.7,
    discrimination: 1.4,
    expectedSeconds: 45,
    prereqClosure: ["transfer-learning"],
    source: ML_12,
    status: "live",
  },
  {
    id: "transfer-learning--apply-pick-a-mode",
    conceptId: "transfer-learning",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "You have 400 labelled images for a new classification task and a large pretrained vision backbone. Which mode do you start with, and what would make you change?",
    rubric: {
      elements: [
        { id: "start-frozen", description: "Start with feature extraction: freeze the backbone, train only a new head. 400 examples is far too few to update a large backbone safely.", weight: 4, required: true },
        { id: "when-to-change", description: "If it underfits — training and validation error both high and close — unfreeze the top block or two and continue at a much lower learning rate.", weight: 4, required: true },
      ],
    },
    difficulty: 1.05,
    discrimination: 1.5,
    expectedSeconds: 160,
    prereqClosure: ["transfer-learning", "overfitting-underfitting"],
    source: ML_12,
    status: "live",
  },
  {
    id: "transfer-learning--apply-preprocessing-match",
    conceptId: "transfer-learning",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "A team fine-tunes a pretrained model but normalises inputs with their own dataset's statistics rather than the ones the model was trained with. Why does this quietly hurt, and how would it show up?",
    rubric: {
      elements: [
        {
          id: "the-mismatch",
          description:
            "Every layer's learned weights are calibrated to inputs on the original scale; feeding differently normalised inputs shifts every activation away from the range the weights expect.",
          weight: 4,
          required: true,
        },
        {
          id: "how-it-shows",
          description:
            "It shows as unexpectedly poor frozen-backbone performance and a fine-tuning run that has to move the weights much further than it should — easily mistaken for the pretrained features being unsuitable.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.4,
    discrimination: 1.5,
    expectedSeconds: 170,
    prereqClosure: ["transfer-learning", "feature-scaling"],
    source: ML_12,
    status: "live",
  },
  {
    id: "transfer-learning--explain-gradient-of-generality",
    conceptId: "transfer-learning",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Explain why early layers transfer and late ones do not, and how that shapes the standard recipe.",
    rubric: {
      elements: [
        {
          id: "early-are-general",
          description:
            "Early layers learn edges and textures — facts about images rather than about the original categories — and those are as true of medical scans as of photographs.",
          weight: 4,
          required: true,
        },
        {
          id: "late-are-specific",
          description:
            "Late layers encode the specific decision boundary for the original label set, which does not transfer at all.",
          weight: 3,
          required: true,
        },
        {
          id: "the-recipe",
          description:
            "Hence: replace the head, keep the stem, and unfreeze progressively from the top if you unfreeze at all.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 1.75,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["transfer-learning", "convolutional-neural-networks"],
    source: ML_12,
    status: "live",
  },
  {
    id: "transfer-learning--explain-catastrophic-forgetting",
    conceptId: "transfer-learning",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Describe catastrophic forgetting in fine-tuning, and name two defences against it.",
    rubric: {
      elements: [
        {
          id: "the-failure",
          description:
            "Fine-tuning aggressively on a small dataset overwrites the general features with whatever fits those few hundred examples, leaving the model worse than the frozen backbone would have been.",
          weight: 5,
          required: true,
        },
        {
          id: "defences",
          description:
            "Names two: much lower learning rates, discriminative rates by depth, early stopping, freezing most of the network, or parameter-efficient methods that adapt a small set of added weights.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.05,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["transfer-learning", "overfitting-underfitting"],
    source: ML_12,
    status: "live",
  },
  {
    id: "transfer-learning--transfer-negative-transfer",
    conceptId: "transfer-learning",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Transfer learning is not always beneficial. State the assumption it makes, describe negative transfer, and say how to test the assumption cheaply.",
    rubric: {
      elements: [
        {
          id: "the-assumption",
          description:
            "That the source task's features are relevant to the target — an empirical claim about your data, not a general property of pretrained models.",
          weight: 4,
          required: true,
        },
        {
          id: "negative-transfer",
          description:
            "When the domains differ enough, the pretrained features are actively unhelpful and a smaller model trained from scratch does better.",
          weight: 4,
          required: true,
        },
        {
          id: "the-cheap-test",
          description:
            "The frozen-backbone baseline is the test: if features extracted from the pretrained model carry almost no signal for the new task, the assumption has failed and no amount of fine-tuning is the right response.",
          weight: 3,
          required: true,
        },
      ],
    },
    difficulty: 2.35,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["transfer-learning"],
    source: ML_12,
    status: "live",
  },
  {
    id: "transfer-learning--transfer-discriminative-rates",
    conceptId: "transfer-learning",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A common fine-tuning recipe updates earlier layers by much smaller amounts per step than later ones. Justify that from what each layer holds.",
    rubric: {
      elements: [
        {
          id: "early-layers-are-worth-more",
          description:
            "Early layers hold general features learned from far more data than the fine-tuning set contains, so they are the part most worth preserving and the part a small dataset is least entitled to rewrite.",
          weight: 5,
          required: true,
        },
        {
          id: "late-layers-must-move",
          description:
            "Late layers must adapt substantially — they encoded the wrong task's boundary — so holding them back would prevent the adaptation the procedure exists for.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.5,
    discrimination: 1.5,
    expectedSeconds: 210,
    prereqClosure: ["transfer-learning"],
    source: ML_12,
    status: "live",
  },

  // --- Self-Supervised Learning --------------------------------------------
  {
    id: "self-supervised-learning--recall-where-labels-come-from",
    conceptId: "self-supervised-learning",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Where do the training targets come from in self-supervised learning?",
    rubric: {
      elements: [
        { id: "from-the-input", description: "From the input itself — part of the data is withheld and predicted from the rest, or two views of the same item are required to agree.", weight: 4, required: true },
        { id: "no-annotation", description: "No human annotation is involved, which is what makes internet-scale pretraining possible.", weight: 3, required: true },
      ],
    },
    difficulty: 0.45,
    discrimination: 1.2,
    expectedSeconds: 55,
    prereqClosure: ["self-supervised-learning", "transfer-learning"],
    source: ML_12,
    status: "live",
  },
  {
    id: "self-supervised-learning--recall-classify-it",
    conceptId: "self-supervised-learning",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Is self-supervised learning supervised or unsupervised?",
    choices: [
      { id: "a", text: "Structurally supervised and practically unsupervised — there is a target and a loss, but no human made the targets", correct: true },
      {
        id: "b",
        text: "Purely unsupervised, since there are no labels",
        correct: false,
        misconception: {
          id: "ssl-called-unsupervised",
          description:
            "There is a target for every example and a loss comparing the prediction to it, which is exactly supervised machinery — the novelty is where the targets came from.",
          blameConceptId: "self-supervised-learning",
        },
      },
      {
        id: "c",
        text: "Purely supervised, since there is a loss against targets",
        correct: false,
        misconception: {
          id: "ssl-called-supervised",
          description:
            "Correct about the machinery and it misses the point: no annotation was purchased, which is the entire practical significance.",
          blameConceptId: "self-supervised-learning",
        },
      },
      {
        id: "d",
        text: "Reinforcement learning, since the model generates its own signal",
        correct: false,
        misconception: {
          id: "ssl-confused-with-rl",
          description:
            "The feedback here is instructive — it says what the withheld value was — not evaluative, and there is no environment or action.",
          blameConceptId: "types-of-machine-learning",
        },
      },
    ],
    difficulty: 0.75,
    discrimination: 1.4,
    expectedSeconds: 50,
    prereqClosure: ["self-supervised-learning"],
    source: ML_12,
    status: "live",
  },
  {
    id: "self-supervised-learning--apply-design-a-pretext-task",
    conceptId: "self-supervised-learning",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "You have millions of unlabelled sensor traces from industrial machines and a few hundred labelled failures. Propose a self-supervised pretext task and say what it would force the model to learn.",
    rubric: {
      elements: [
        {
          id: "a-concrete-task",
          description:
            "Proposes something concrete — mask a window of the trace and reconstruct it, predict the next segment from the previous, or require two augmented views of the same trace to agree.",
          weight: 4,
          required: true,
        },
        {
          id: "what-it-forces",
          description:
            "Explains what it forces: to fill in or predict a segment the model must learn the normal temporal and cross-channel structure of the signal, which is precisely the representation a failure detector needs.",
          weight: 4,
          required: true,
        },
        {
          id: "then-fine-tune",
          description:
            "Bonus: names the pairing — pretrain on the millions, then fine-tune on the few hundred labels.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.1,
    discrimination: 1.5,
    expectedSeconds: 180,
    prereqClosure: ["self-supervised-learning", "transfer-learning"],
    source: ML_12,
    status: "live",
  },
  {
    id: "self-supervised-learning--apply-shortcut-detection",
    conceptId: "self-supervised-learning",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "A contrastive image method requires two crops of the same photograph to have similar representations. Identify the shortcut this invites and how augmentation design removes it.",
    rubric: {
      elements: [
        {
          id: "the-shortcut",
          description:
            "Colour statistics: two crops of the same photograph share a colour histogram, so matching on colour alone solves the task without learning anything about objects.",
          weight: 5,
          required: true,
        },
        {
          id: "the-fix",
          description:
            "Augment aggressively in colour — jitter, grayscale conversion — so the shortcut is destroyed while the object identity that should be matched on survives.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.45,
    discrimination: 1.6,
    expectedSeconds: 180,
    prereqClosure: ["self-supervised-learning"],
    source: ML_12,
    status: "live",
  },
  {
    id: "self-supervised-learning--explain-why-representations-are-good",
    conceptId: "self-supervised-learning",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "The prediction a self-supervised model makes is usually not wanted. Explain what is, and why a hard pretext task produces it.",
    rubric: {
      elements: [
        {
          id: "the-representation-is-the-product",
          description:
            "The internal representation built in order to make the prediction is the product; the pretext task is scaffolding, discarded once the model is fine-tuned.",
          weight: 4,
          required: true,
        },
        {
          id: "hard-tasks-force-structure",
          description:
            "Filling in a masked word from context cannot be done by memorisation at scale — it requires syntax, and often semantics and world knowledge — so a hard enough task forces genuine structure into the representation.",
          weight: 5,
          required: true,
        },
      ],
    },
    difficulty: 1.8,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["self-supervised-learning", "transfer-learning"],
    source: ML_12,
    status: "live",
  },
  {
    id: "self-supervised-learning--explain-collapse",
    conceptId: "self-supervised-learning",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Representation collapse is the degenerate solution contrastive objectives must be designed to avoid. Describe it and say what prevents it.",
    rubric: {
      elements: [
        {
          id: "what-collapse-is",
          description:
            "Mapping every input to the same vector: all views of the same item are then trivially identical, so an objective that only rewards agreement is perfectly satisfied while nothing has been learned.",
          weight: 5,
          required: true,
        },
        {
          id: "what-prevents-it",
          description:
            "A repulsive term — pushing apart views of *different* items, which is what the negatives are for — or an architectural device such as a stop-gradient and predictor asymmetry in methods that use no negatives.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.15,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["self-supervised-learning", "autoencoders"],
    source: ML_12,
    status: "live",
  },
  {
    id: "self-supervised-learning--transfer-batch-size-dependence",
    conceptId: "self-supervised-learning",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Contrastive methods are notoriously sensitive to batch size in a way supervised training is not. Explain why, from the objective.",
    rubric: {
      elements: [
        {
          id: "negatives-come-from-the-batch",
          description:
            "The negatives an example is pushed away from are the other items in its batch, so batch size directly determines how many comparisons each update makes.",
          weight: 5,
          required: true,
        },
        {
          id: "signal-quality",
          description:
            "With few negatives the task is easy — almost anything separates a handful of items — so the gradient carries little information; large batches or a memory bank of stored representations are what make it demanding.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.45,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["self-supervised-learning"],
    source: ML_12,
    status: "live",
  },
  {
    id: "self-supervised-learning--transfer-why-the-recipe-spread",
    conceptId: "self-supervised-learning",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "The pretrain-then-fine-tune recipe has moved into speech, video, code, protein sequences and tabular data. State the precondition a domain must satisfy, and name a domain where it fails.",
    rubric: {
      elements: [
        {
          id: "the-precondition",
          description:
            "Abundant unlabelled data with genuine internal structure — enough redundancy that part of an example can be predicted from the rest.",
          weight: 4,
          required: true,
        },
        {
          id: "where-it-fails",
          description:
            "Gives a case where it fails: a domain with few examples in total, or one where the data is essentially unstructured noise so withholding part of it leaves nothing predictable — no pretext task can manufacture structure that is not there.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.6,
    discrimination: 1.5,
    expectedSeconds: 210,
    prereqClosure: ["self-supervised-learning", "transfer-learning"],
    source: ML_12,
    status: "live",
  },

  // --- Reinforcement Learning ----------------------------------------------
  {
    id: "reinforcement-learning--recall-elements",
    conceptId: "reinforcement-learning",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Name four elements of the reinforcement learning setting and say what each is.",
    rubric: {
      elements: [
        {
          id: "four-elements",
          description:
            "Any four of: state (what the agent observes), action (what it may do), reward (a scalar arriving after an action), policy (its behaviour, a distribution over actions given a state), value (expected discounted future reward), discount factor.",
          weight: 5,
          required: true,
        },
      ],
    },
    difficulty: -0.3,
    discrimination: 1.1,
    expectedSeconds: 60,
    prereqClosure: ["reinforcement-learning", "types-of-machine-learning"],
    source: ML_12,
    status: "live",
  },
  {
    id: "reinforcement-learning--recall-evaluative-feedback",
    conceptId: "reinforcement-learning",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "How does a reward differ from a supervised label?",
    choices: [
      { id: "a", text: "It says how good the outcome was, never what the correct action would have been", correct: true },
      {
        id: "b",
        text: "It arrives later, but otherwise carries the same information",
        correct: false,
        misconception: {
          id: "reward-thought-to-be-a-late-label",
          description:
            "Timing is not the essential difference. A label is instructive — it names the right answer; a reward is evaluative and never does, which is why exploration is structurally necessary.",
          blameConceptId: "reinforcement-learning",
        },
      },
      {
        id: "c",
        text: "It is always binary",
        correct: false,
        misconception: {
          id: "reward-thought-binary",
          description:
            "Rewards are scalars and are frequently zero for long stretches; their sparsity, not their arity, is what makes credit assignment hard.",
          blameConceptId: "reinforcement-learning",
        },
      },
      {
        id: "d",
        text: "There is no difference — reinforcement learning is supervised learning on delayed labels",
        correct: false,
        misconception: {
          id: "rl-reduced-to-supervised",
          description:
            "If it were, the agent could compute an error and correct it. It cannot, which is the reason the field exists separately.",
          blameConceptId: "types-of-machine-learning",
        },
      },
    ],
    difficulty: 0.0,
    discrimination: 1.4,
    expectedSeconds: 45,
    prereqClosure: ["reinforcement-learning", "types-of-machine-learning"],
    source: ML_12,
    status: "live",
  },
  {
    id: "reinforcement-learning--apply-discounted-return",
    conceptId: "reinforcement-learning",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "With discount γ = 0.9, an agent receives rewards 0, 0, and 10 on the next three steps. What is the discounted return from now, counting the first reward at exponent 0?",
    answerKey: 8.1,
    tolerance: 0.01,
    difficulty: 0.35,
    discrimination: 1.3,
    expectedSeconds: 110,
    prereqClosure: ["reinforcement-learning"],
    source: ML_12,
    status: "live",
  },
  {
    id: "reinforcement-learning--apply-credit-assignment",
    conceptId: "reinforcement-learning",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "A game is lost at move 40 because of a mistake at move 3, with zero reward in between. Explain what makes this hard and what machinery addresses it.",
    rubric: {
      elements: [
        {
          id: "the-difficulty",
          description:
            "Nothing in the signal indicates which move was responsible — a single scalar at the end must be apportioned across forty decisions, and the intervening rewards carry no information at all.",
          weight: 4,
          required: true,
        },
        {
          id: "the-machinery",
          description:
            "Value functions propagate credit backwards through time via the Bellman relation, so a state's value is learned from its successor's; eligibility traces spread it further per update.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.75,
    discrimination: 1.5,
    expectedSeconds: 170,
    prereqClosure: ["reinforcement-learning", "markov-chains"],
    source: ML_12,
    status: "live",
  },
  {
    id: "reinforcement-learning--explain-why-exploration-is-structural",
    conceptId: "reinforcement-learning",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Exploration is a structural necessity in reinforcement learning and simply absent from supervised learning. Explain why.",
    rubric: {
      elements: [
        {
          id: "no-error-to-correct",
          description:
            "Evaluative feedback never says what the better action was, so the agent cannot compute an error — it must try alternatives to find out what they would have yielded.",
          weight: 5,
          required: true,
        },
        {
          id: "supervised-has-nothing-to-explore",
          description:
            "A supervised learner is handed the correct output for every example, so there is no unobserved counterfactual to go and sample.",
          weight: 4,
          required: true,
        },
        {
          id: "self-confirming-policies",
          description:
            "Bonus: notes the consequence — a policy that never tries an action never learns about it, so an early preference can become self-confirming.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.15,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["reinforcement-learning", "types-of-machine-learning"],
    source: ML_12,
    status: "live",
  },
  {
    id: "reinforcement-learning--explain-families",
    conceptId: "reinforcement-learning",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Contrast value-based and policy-gradient methods on what they learn and where each is the natural choice.",
    rubric: {
      elements: [
        {
          id: "value-based",
          description:
            "Value-based methods learn Q(s, a) and act by taking the argmax, which requires enumerating actions — natural for discrete action sets, and off-policy so old experience can be reused.",
          weight: 4,
          required: true,
        },
        {
          id: "policy-gradient",
          description:
            "Policy-gradient methods parameterise and improve the policy directly, so continuous action spaces are natural — at the cost of higher variance and usually being on-policy.",
          weight: 4,
          required: true,
        },
        {
          id: "actor-critic",
          description:
            "Bonus: names actor-critic as the practical default, learning both so the critic reduces the actor's variance.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.5,
    discrimination: 1.5,
    expectedSeconds: 200,
    prereqClosure: ["reinforcement-learning"],
    source: ML_12,
    status: "live",
  },
  {
    id: "reinforcement-learning--transfer-reward-specification",
    conceptId: "reinforcement-learning",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A cleaning robot rewarded for collected dirt learns to tip the bin out and re-collect it. Diagnose the failure and state the general lesson.",
    rubric: {
      elements: [
        {
          id: "the-diagnosis",
          description:
            "The agent optimised the reward that was written, not the outcome intended: the objective was easy to measure and not quite the goal, and tipping the bin genuinely maximises it.",
          weight: 4,
          required: true,
        },
        {
          id: "not-an-algorithm-failure",
          description:
            "Nothing about the algorithm went wrong — it succeeded. Getting the reward right is usually harder than getting the algorithm right, and no amount of better optimisation fixes a misspecified objective.",
          weight: 5,
          required: true,
        },
      ],
    },
    difficulty: 1.85,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["reinforcement-learning"],
    source: ML_12,
    status: "live",
  },
  {
    id: "reinforcement-learning--transfer-why-offline-matters",
    conceptId: "reinforcement-learning",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Most real applications cannot let an agent explore freely — every action is a real medical decision, trade or movement. Explain the constraint that creates, and why learning from a fixed log of past behaviour instead is hard.",
    rubric: {
      elements: [
        {
          id: "the-constraint",
          description:
            "Exploration means taking actions believed to be suboptimal to find out what they yield — unacceptable when each is a real medical decision, a real trade or a real physical movement.",
          weight: 4,
          required: true,
        },
        {
          id: "why-offline-is-hard",
          description:
            "Learning from a fixed logged dataset means the agent can never test a policy that differs from the one that generated the data, so value estimates for unseen actions are extrapolations the data cannot check — and the optimiser is drawn precisely to whichever of those is most overestimated.",
          weight: 5,
          required: true,
        },
      ],
    },
    difficulty: 2.15,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["reinforcement-learning"],
    source: ML_12,
    status: "live",
  },

  // --- Multi-Armed Bandits --------------------------------------------------
  {
    id: "multi-armed-bandits--recall-what-makes-it-a-bandit",
    conceptId: "multi-armed-bandits",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "What distinguishes a bandit problem from the general reinforcement learning setting?",
    rubric: {
      elements: [
        { id: "no-state", description: "There is no state: the same set of actions is available every round and nothing the agent does changes the situation it faces.", weight: 4, required: true },
        { id: "what-remains", description: "What remains is the exploration-exploitation trade-off in isolation, which is why guarantees are available here that the general case lacks.", weight: 3, required: true },
      ],
    },
    difficulty: 0.3,
    discrimination: 1.2,
    expectedSeconds: 55,
    prereqClosure: ["multi-armed-bandits", "reinforcement-learning"],
    source: ML_12,
    status: "live",
  },
  {
    id: "multi-armed-bandits--recall-regret",
    conceptId: "multi-armed-bandits",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What does cumulative regret measure?",
    choices: [
      { id: "a", text: "The shortfall against always having played the best arm", correct: true },
      {
        id: "b",
        text: "The number of times a suboptimal arm was played",
        correct: false,
        misconception: {
          id: "regret-thought-to-be-a-count",
          description:
            "A count ignores how much worse each mistake was — playing a nearly-as-good arm and a terrible one would score the same.",
          blameConceptId: "multi-armed-bandits",
        },
      },
      {
        id: "c",
        text: "The variance of the reward received",
        correct: false,
        misconception: {
          id: "regret-confused-with-variance",
          description:
            "Regret is about the mean shortfall against the optimum, not about how variable the outcomes were.",
          blameConceptId: "multi-armed-bandits",
        },
      },
      {
        id: "d",
        text: "The total reward received",
        correct: false,
        misconception: {
          id: "regret-confused-with-reward",
          description:
            "Total reward alone cannot say whether the algorithm did well — it depends on how good the arms were. Regret is defined relative to the achievable optimum precisely to remove that.",
          blameConceptId: "multi-armed-bandits",
        },
      },
    ],
    difficulty: 0.6,
    discrimination: 1.4,
    expectedSeconds: 45,
    prereqClosure: ["multi-armed-bandits"],
    source: ML_12,
    status: "live",
  },
  {
    id: "multi-armed-bandits--apply-epsilon-greedy-regret",
    conceptId: "multi-armed-bandits",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "ε-greedy with a fixed ε has regret that grows linearly in T. Explain why, and what change makes it sublinear.",
    rubric: {
      elements: [
        {
          id: "why-linear",
          description:
            "A fixed ε explores at a constant rate forever, so even once the best arm is known with certainty a constant fraction of pulls is still spent elsewhere — a fixed cost per round, which accumulates linearly.",
          weight: 5,
          required: true,
        },
        {
          id: "the-fix",
          description:
            "Decay ε over time, so exploration shrinks as evidence accumulates and the per-round cost tends to zero.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.0,
    discrimination: 1.5,
    expectedSeconds: 170,
    prereqClosure: ["multi-armed-bandits"],
    source: ML_12,
    status: "live",
  },
  {
    id: "multi-armed-bandits--apply-thompson-mechanics",
    conceptId: "multi-armed-bandits",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "Describe one round of Thompson sampling, and say how the exploration arises without any explicit exploration parameter.",
    rubric: {
      elements: [
        { id: "the-round", description: "Draw one sample from each arm's posterior over its value, and play the arm whose sample is largest.", weight: 4, required: true },
        { id: "where-exploration-comes-from", description: "An uncertain arm has a wide posterior, so it sometimes draws a high sample and gets played — exploration emerges in proportion to the probability that the arm is best, with no ε or confidence constant to set.", weight: 5, required: true },
      ],
    },
    difficulty: 1.35,
    discrimination: 1.6,
    expectedSeconds: 180,
    prereqClosure: ["multi-armed-bandits", "confidence-interval"],
    source: ML_12,
    status: "live",
  },
  {
    id: "multi-armed-bandits--explain-ucb-optimism",
    conceptId: "multi-armed-bandits",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "UCB plays the arm with the highest mean plus a confidence width. Explain how that single rule produces both exploration and exploitation.",
    rubric: {
      elements: [
        {
          id: "rarely-pulled-arms",
          description:
            "An arm pulled rarely has a wide confidence width, so its optimistic estimate is high and it gets tried — that is the exploration.",
          weight: 4,
          required: true,
        },
        {
          id: "well-known-arms",
          description:
            "As an arm accumulates pulls its width narrows and it is judged on its mean, so a genuinely good arm keeps being played — that is the exploitation.",
          weight: 4,
          required: true,
        },
        {
          id: "one-rule",
          description:
            "Bonus: notes that no separate exploration mechanism is needed — optimism in the face of uncertainty produces both behaviours from one argmax.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.7,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["multi-armed-bandits", "confidence-interval"],
    source: ML_12,
    status: "live",
  },
  {
    id: "multi-armed-bandits--explain-link-to-bayesian-optimisation",
    conceptId: "multi-armed-bandits",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "UCB's confidence width plays the same role as a fitted model's predictive variance in Bayesian optimisation. Explain the correspondence and where the two differ.",
    rubric: {
      elements: [
        {
          id: "the-correspondence",
          description:
            "Both add an uncertainty term to a predicted value and act on the optimistic total, so untested options are tried and well-understood ones are judged on their means.",
          weight: 4,
          required: true,
        },
        {
          id: "the-difference",
          description:
            "The uncertainty comes from a pull count in the bandit case and from a fitted surface in the Bayesian optimisation case — which is why the latter can generalise across similar untried configurations and the former cannot.",
          weight: 5,
          required: true,
        },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["multi-armed-bandits", "reinforcement-learning"],
    source: ML_12,
    status: "live",
  },
  {
    id: "multi-armed-bandits--transfer-adaptive-ab-test",
    conceptId: "multi-armed-bandits",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A team replaces a fixed 50/50 A/B test with a bandit that shifts traffic toward the winner. State the gain, and explain why their usual significance test is no longer valid.",
    rubric: {
      elements: [
        {
          id: "the-gain",
          description:
            "Less traffic is spent on the worse variant while the test runs, which is exactly what regret measures — a real reduction in the cost of testing.",
          weight: 4,
          required: true,
        },
        {
          id: "why-the-test-breaks",
          description:
            "A classical test assumes the sample sizes were fixed in advance; a bandit makes allocation depend on the results so far, so a p-value computed as if they were fixed is wrong.",
          weight: 5,
          required: true,
        },
        {
          id: "the-remedy",
          description:
            "Bonus: names an always-valid sequential test as what is needed if a defensible significance statement is required alongside the savings.",
          weight: 2,
        },
      ],
    },
    difficulty: 2.3,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["multi-armed-bandits", "confidence-interval"],
    source: ML_12,
    status: "live",
  },
  {
    id: "multi-armed-bandits--transfer-hyperband-as-a-bandit",
    conceptId: "multi-armed-bandits",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Successive halving allocates a small budget to many hyperparameter configurations, kills the worst, and gives survivors more. Explain in what sense this is a bandit algorithm.",
    rubric: {
      elements: [
        {
          id: "the-mapping",
          description:
            "Each configuration is an arm; pulling it means training it a little longer; the reward is its intermediate score. The budget must be allocated across arms with uncertain values.",
          weight: 5,
          required: true,
        },
        {
          id: "the-trade",
          description:
            "Killing early exploits current estimates and risks discarding a slow starter; spreading the budget explores and delays committing — exactly the exploration-exploitation trade, with compute rather than traffic as the resource.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.55,
    discrimination: 1.5,
    expectedSeconds: 220,
    prereqClosure: ["multi-armed-bandits", "reinforcement-learning"],
    source: ML_12,
    status: "live",
  },

  // --- Bayesian Optimization ------------------------------------------------
  {
    id: "bayesian-optimization--recall-the-loop",
    conceptId: "bayesian-optimization",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Describe the three steps of the Bayesian optimisation loop.",
    rubric: {
      elements: [
        { id: "fit-surrogate", description: "Fit a surrogate model to the configurations tried and the scores they gave.", weight: 3, required: true },
        { id: "maximise-acquisition", description: "Maximise an acquisition function over the surrogate to choose where to evaluate next.", weight: 3, required: true },
        { id: "evaluate-and-repeat", description: "Evaluate the real objective there, add the result, and repeat.", weight: 3, required: true },
      ],
    },
    difficulty: 0.45,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["bayesian-optimization", "gp-regression", "hyperparameters"],
    source: ML_12,
    status: "live",
  },
  {
    id: "bayesian-optimization--recall-why-a-gp",
    conceptId: "bayesian-optimization",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Why is a Gaussian process the natural surrogate model here?",
    choices: [
      { id: "a", text: "It returns a predicted mean and a predicted variance, which is exactly what an acquisition function consumes", correct: true },
      {
        id: "b",
        text: "It is the fastest model to fit",
        correct: false,
        misconception: {
          id: "gp-chosen-for-speed",
          description:
            "Its cost is cubic in the number of observations. It is affordable here only because there are so few of them, which is a consequence of the setting rather than a reason for the choice.",
          blameConceptId: "bayesian-optimization",
        },
      },
      {
        id: "c",
        text: "It handles categorical and conditional hyperparameters natively",
        correct: false,
        misconception: {
          id: "gp-thought-to-handle-mixed-spaces",
          description:
            "That is precisely where GPs are awkward — tree-structured Parzen estimators exist for mixed and conditional spaces for this reason.",
          blameConceptId: "bayesian-optimization",
        },
      },
      {
        id: "d",
        text: "It guarantees finding the global optimum",
        correct: false,
        misconception: {
          id: "bo-thought-to-guarantee-global",
          description:
            "No such guarantee exists at finite budget, and a misspecified kernel can produce a surrogate that actively misleads the search.",
          blameConceptId: "bayesian-optimization",
        },
      },
    ],
    difficulty: 0.75,
    discrimination: 1.4,
    expectedSeconds: 50,
    prereqClosure: ["bayesian-optimization", "gp-regression"],
    source: ML_12,
    status: "live",
  },
  {
    id: "bayesian-optimization--apply-choose-acquisition",
    conceptId: "bayesian-optimization",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "Probability of improvement tends to under-explore. Explain why, and what expected improvement changes.",
    rubric: {
      elements: [
        {
          id: "why-pi-under-explores",
          description:
            "It scores only the probability of beating the incumbent at all, regardless of by how much — so a tiny near-certain gain outranks a large but uncertain one, and the search stays near what it already knows.",
          weight: 5,
          required: true,
        },
        {
          id: "what-ei-changes",
          description:
            "Expected improvement weights by the size of the improvement as well as its probability, so a point with a small chance of a large gain competes properly.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.1,
    discrimination: 1.5,
    expectedSeconds: 180,
    prereqClosure: ["bayesian-optimization", "gp-regression"],
    source: ML_12,
    status: "live",
  },
  {
    id: "bayesian-optimization--apply-when-not-to-use-it",
    conceptId: "bayesian-optimization",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "Each evaluation of an objective takes 0.4 seconds and thousands can be run. Should Bayesian optimisation be used? Justify from what it trades.",
    rubric: {
      elements: [
        { id: "no", description: "No — random search is the better choice here.", weight: 3, required: true },
        {
          id: "the-justification",
          description:
            "The method trades a few expensive real queries for many cheap ones against a surrogate; when the real queries are already cheap there is nothing to trade, the loop is inherently sequential where random search parallelises trivially, and random search will have tried far more configurations by the time the surrogate is fitted.",
          weight: 5,
          required: true,
        },
      ],
    },
    difficulty: 1.45,
    discrimination: 1.5,
    expectedSeconds: 170,
    prereqClosure: ["bayesian-optimization", "hyperparameters"],
    source: ML_12,
    status: "live",
  },
  {
    id: "bayesian-optimization--explain-the-central-trade",
    conceptId: "bayesian-optimization",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Explain the trade the whole method rests on, and why the acquisition function can be optimised aggressively when the objective cannot.",
    rubric: {
      elements: [
        {
          id: "the-trade",
          description:
            "Replace a few expensive queries to the real objective with many cheap ones against a model of what those queries would return.",
          weight: 4,
          required: true,
        },
        {
          id: "why-the-acquisition-is-cheap",
          description:
            "The acquisition function is defined on the surrogate, not on the real objective, so evaluating it costs a model prediction rather than a training run — thousands of evaluations to choose one real one is a good bargain.",
          weight: 5,
          required: true,
        },
      ],
    },
    difficulty: 1.8,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["bayesian-optimization", "gp-regression"],
    source: ML_12,
    status: "live",
  },
  {
    id: "bayesian-optimization--explain-cost-regime-fit",
    conceptId: "bayesian-optimization",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "A Gaussian process is computationally hopeless beyond about ten thousand observations. Explain why that limitation almost never bites in Bayesian optimisation.",
    rubric: {
      elements: [
        {
          id: "the-regimes-are-complementary",
          description:
            "The regime where a GP is too slow is the regime where evaluations are cheap enough to run many — and that is exactly the regime where Bayesian optimisation is unnecessary.",
          weight: 5,
          required: true,
        },
        {
          id: "the-actual-budget",
          description:
            "Where the method is used the budget is tens of evaluations, so the cubic cost is over a matrix of a few dozen rows and is irrelevant next to a single objective evaluation.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.1,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["bayesian-optimization", "gp-regression"],
    source: ML_12,
    status: "live",
  },
  {
    id: "bayesian-optimization--transfer-its-own-hyperparameters",
    conceptId: "bayesian-optimization",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Bayesian optimisation is a method for tuning hyperparameters that has hyperparameters of its own. Describe the regress and how it is managed in practice.",
    rubric: {
      elements: [
        {
          id: "the-regress",
          description:
            "The kernel, its length scales, the acquisition function and any exploration constant are all choices, and a badly specified kernel produces a surrogate that misleads the search rather than guiding it.",
          weight: 4,
          required: true,
        },
        {
          id: "how-it-is-managed",
          description:
            "Kernel parameters are fitted by maximising the marginal likelihood, which helps and does not eliminate the regress; the practical discipline is to check on a small budget that the method is actually beating random search rather than assuming it.",
          weight: 5,
          required: true,
        },
      ],
    },
    difficulty: 2.4,
    discrimination: 1.6,
    expectedSeconds: 220,
    prereqClosure: ["bayesian-optimization", "hyperparameters", "gp-regression"],
    source: ML_12,
    status: "live",
  },
  {
    id: "bayesian-optimization--transfer-parallel-batches",
    conceptId: "bayesian-optimization",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "You have 8 machines available but the loop is inherently sequential. What goes wrong if you simply run the acquisition maximiser 8 times, and what has to change?",
    rubric: {
      elements: [
        {
          id: "what-goes-wrong",
          description:
            "The surrogate has not changed between the eight calls, so the maximiser returns the same point eight times — seven machines evaluate a configuration already being evaluated.",
          weight: 5,
          required: true,
        },
        {
          id: "what-must-change",
          description:
            "A batch variant must deliberately pick diverse points: penalise proximity to already-selected candidates, or provisionally impute an outcome for each selected point so the surrogate updates before the next is chosen.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.65,
    discrimination: 1.5,
    expectedSeconds: 220,
    prereqClosure: ["bayesian-optimization", "gp-regression"],
    source: ML_12,
    status: "live",
  },

  // --- Stacking -------------------------------------------------------------
  {
    id: "stacking--recall-construction",
    conceptId: "stacking",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Describe stacking, including what the meta-model is trained on.",
    rubric: {
      elements: [
        { id: "the-idea", description: "Train several base models, then train a second-level model to combine their predictions.", weight: 3, required: true },
        { id: "out-of-fold", description: "The meta-model is trained on out-of-fold predictions — for each row, predictions from base models that never saw that row.", weight: 4, required: true },
      ],
    },
    difficulty: 0.1,
    discrimination: 1.3,
    expectedSeconds: 60,
    prereqClosure: ["stacking", "ensemble-methods"],
    source: ML_12,
    status: "live",
  },
  {
    id: "stacking--recall-source-of-diversity",
    conceptId: "stacking",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Where does stacking get its diversity from, unlike bagging and boosting?",
    choices: [
      { id: "a", text: "From combining genuinely different model families, whose inductive biases differ", correct: true },
      {
        id: "b",
        text: "From resampling the training data for each base model",
        correct: false,
        misconception: {
          id: "stacking-confused-with-bagging",
          description:
            "That is bagging's mechanism. Stacking's members are typically fitted on the same data and differ by being different kinds of model.",
          blameConceptId: "ensemble-methods",
        },
      },
      {
        id: "c",
        text: "From training each member on the previous one's errors",
        correct: false,
        misconception: {
          id: "stacking-confused-with-boosting",
          description:
            "That is boosting. Stacking's base models are trained independently and in parallel.",
          blameConceptId: "ensemble-methods",
        },
      },
      {
        id: "d",
        text: "From random feature subsets at each split",
        correct: false,
        misconception: {
          id: "stacking-confused-with-random-forest",
          description:
            "That is a random forest's decorrelation device, internal to one model family.",
          blameConceptId: "random-forests",
        },
      },
    ],
    difficulty: 0.4,
    discrimination: 1.4,
    expectedSeconds: 45,
    prereqClosure: ["stacking", "ensemble-methods"],
    source: ML_12,
    status: "live",
  },
  {
    id: "stacking--apply-spot-the-leak",
    conceptId: "stacking",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "A team fits each base model on the full training set, collects their predictions on that same set, and trains the meta-model on those. What has gone wrong?",
    rubric: {
      elements: [
        {
          id: "predictions-are-in-sample",
          description:
            "The base models' predictions on rows they were fitted on are unrepresentatively good, and most so for whichever model overfitted hardest.",
          weight: 4,
          required: true,
        },
        {
          id: "what-the-meta-model-learns",
          description:
            "The meta-model learns to trust that model, whose deployment performance will be nothing like its in-sample performance — so the whole stack is optimistic and mis-weighted.",
          weight: 5,
          required: true,
        },
      ],
    },
    difficulty: 0.85,
    discrimination: 1.6,
    expectedSeconds: 170,
    prereqClosure: ["stacking", "ensemble-methods"],
    source: ML_12,
    status: "live",
  },
  {
    id: "stacking--apply-choose-a-meta-model",
    conceptId: "stacking",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "Should the meta-model be simple or complex? Justify from what data it is fitted on.",
    rubric: {
      elements: [
        { id: "simple", description: "Simple — a regularised linear model or a shallow tree.", weight: 3, required: true },
        {
          id: "the-justification",
          description:
            "Its input matrix has only as many columns as base models and is derived from the same rows, so a complex meta-model overfits it easily — adding variance where the point of ensembling was to remove it.",
          weight: 5,
          required: true,
        },
      ],
    },
    difficulty: 1.2,
    discrimination: 1.5,
    expectedSeconds: 160,
    prereqClosure: ["stacking", "ensemble-methods", "overfitting-underfitting"],
    source: ML_12,
    status: "live",
  },
  {
    id: "stacking--explain-out-of-fold-discipline",
    conceptId: "stacking",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Explain what the out-of-fold step achieves, in terms of what the meta-model will receive at deployment.",
    rubric: {
      elements: [
        {
          id: "matching-the-deployment-distribution",
          description:
            "At deployment the meta-model receives predictions from base models on rows they have never seen. Out-of-fold predictions are the only way to give it training inputs drawn from that same distribution.",
          weight: 5,
          required: true,
        },
        {
          id: "otherwise-mismatch",
          description:
            "Without it the meta-model is fitted on one distribution of inputs and applied to a different, systematically worse one — which is why the failure shows up only after deployment.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.55,
    discrimination: 1.7,
    expectedSeconds: 200,
    prereqClosure: ["stacking", "nested-cross-validation"],
    source: ML_12,
    status: "live",
  },
  {
    id: "stacking--explain-diversity-test",
    conceptId: "stacking",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Stacking five variants of the same gradient-boosted model recovers very little. Explain why, and give a practical test of whether a base set is diverse enough.",
    rubric: {
      elements: [
        {
          id: "why-little-is-gained",
          description:
            "Members with the same inductive bias fail on the same examples, so their errors are highly correlated and there is little independent error for the combination to cancel.",
          weight: 4,
          required: true,
        },
        {
          id: "the-test",
          description:
            "Check whether the members' errors are actually correlated — do they get the same rows wrong? — rather than whether the models look different on paper.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.85,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["stacking", "ensemble-methods"],
    source: ML_12,
    status: "live",
  },
  {
    id: "stacking--transfer-honest-evaluation",
    conceptId: "stacking",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "A cross-validated score is computed for a stack using the same folds that produced its out-of-fold predictions. Why is that optimistic, and what would be honest?",
    rubric: {
      elements: [
        {
          id: "why-optimistic",
          description:
            "The out-of-fold predictions were built using the labels of those folds, and the meta-model was fitted and selected against them — so those folds are no longer held out with respect to the full pipeline.",
          weight: 5,
          required: true,
        },
        {
          id: "what-is-honest",
          description:
            "An outer resampling loop around the entire stacking procedure, or a genuinely untouched test set scored once — the same argument as nested cross-validation, applied to a construction that makes the mistake especially easy to miss.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.15,
    discrimination: 1.7,
    expectedSeconds: 210,
    prereqClosure: ["stacking", "nested-cross-validation", "data-leakage"],
    source: ML_12,
    status: "live",
  },
  {
    id: "stacking--transfer-is-it-worth-it",
    conceptId: "stacking",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Stacking wins competitions and is rare in production. Explain that asymmetry in terms of what each setting optimises.",
    rubric: {
      elements: [
        {
          id: "competition-setting",
          description:
            "A competition rewards the last fraction of a percent on a fixed metric, with no serving cost, no latency budget and no maintenance horizon — so a small gain at large complexity is straightforwardly worth it.",
          weight: 4,
          required: true,
        },
        {
          id: "production-setting",
          description:
            "Production pays for every base model at inference in latency and cost, must monitor and retrain each, and gains a system where a failure in any member degrades the whole — for a gain that is usually a fraction of a percent.",
          weight: 5,
          required: true,
        },
      ],
    },
    difficulty: 2.45,
    discrimination: 1.5,
    expectedSeconds: 210,
    prereqClosure: ["stacking", "ensemble-methods"],
    source: ML_12,
    status: "live",
  },

  // --- Hierarchical Clustering ---------------------------------------------
  {
    id: "hierarchical-clustering--recall-agglomerative-steps",
    conceptId: "hierarchical-clustering",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Describe the agglomerative hierarchical clustering procedure.",
    rubric: {
      elements: [
        { id: "start", description: "Start with every point as its own cluster.", weight: 2, required: true },
        { id: "merge", description: "Repeatedly merge the two closest clusters, where 'closest' is defined by the linkage rule.", weight: 4, required: true },
        { id: "record", description: "Continue until one cluster remains, recording the distance at each merge — that record is the dendrogram.", weight: 3, required: true },
      ],
    },
    difficulty: -0.7,
    discrimination: 1.1,
    expectedSeconds: 60,
    prereqClosure: ["hierarchical-clustering", "clustering-methods"],
    source: ML_12,
    status: "live",
  },
  {
    id: "hierarchical-clustering--recall-single-linkage-behaviour",
    conceptId: "hierarchical-clustering",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "Single linkage defines cluster distance as the distance between the closest pair. What behaviour does that produce?",
    choices: [
      { id: "a", text: "Chaining — it follows elongated shapes, and merges groups joined by a thin bridge of points", correct: true },
      {
        id: "b",
        text: "Compact, equal-diameter clusters",
        correct: false,
        misconception: {
          id: "single-confused-with-complete",
          description:
            "That is complete linkage, which uses the furthest pair and therefore refuses to merge anything with a distant outlier.",
          blameConceptId: "hierarchical-clustering",
        },
      },
      {
        id: "c",
        text: "Clusters of equal size",
        correct: false,
        misconception: {
          id: "linkage-thought-to-control-size",
          description:
            "No linkage rule constrains cluster sizes directly; Ward's tends toward similar sizes as a by-product of its sum-of-squares criterion.",
          blameConceptId: "hierarchical-clustering",
        },
      },
      {
        id: "d",
        text: "The same result as k-means",
        correct: false,
        misconception: {
          id: "single-confused-with-ward",
          description:
            "Ward linkage is the one that greedily optimises k-means' criterion; single linkage produces very different, often elongated, groupings.",
          blameConceptId: "clustering-methods",
        },
      },
    ],
    difficulty: -0.4,
    discrimination: 1.3,
    expectedSeconds: 45,
    prereqClosure: ["hierarchical-clustering"],
    source: ML_12,
    status: "live",
  },
  {
    id: "hierarchical-clustering--apply-count-merges",
    conceptId: "hierarchical-clustering",
    format: "numeric",
    cognitive: "apply",
    channels: ["typed", "handwritten"],
    stem: "Agglomerative clustering starts with 60 points as 60 clusters and runs until one remains. How many merge steps does it perform?",
    answerKey: 59,
    tolerance: 0.001,
    difficulty: 0.0,
    discrimination: 1.2,
    expectedSeconds: 70,
    prereqClosure: ["hierarchical-clustering"],
    source: ML_12,
    status: "live",
  },
  {
    id: "hierarchical-clustering--apply-choose-a-linkage",
    conceptId: "hierarchical-clustering",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "Two genuinely elongated clusters lie near each other, with a few scattered noise points between them. Contrast what single and complete linkage would do.",
    rubric: {
      elements: [
        {
          id: "single-merges-them",
          description:
            "Single linkage follows the chain of noise points across the gap and merges the two into one — the closest pair spans the bridge.",
          weight: 4,
          required: true,
        },
        {
          id: "complete-splits-them",
          description:
            "Complete linkage refuses to merge across the bridge, but its preference for compact groups also tends to split each genuinely elongated cluster in half.",
          weight: 4,
          required: true,
        },
        {
          id: "neither-is-wrong",
          description:
            "Bonus: notes neither is wrong — each encodes a different belief about what a cluster is, and the choice must be made rather than defaulted to.",
          weight: 2,
        },
      ],
    },
    difficulty: 0.5,
    discrimination: 1.5,
    expectedSeconds: 170,
    prereqClosure: ["hierarchical-clustering", "clustering-methods"],
    source: ML_12,
    status: "live",
  },
  {
    id: "hierarchical-clustering--explain-greedy-irreversible",
    conceptId: "hierarchical-clustering",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Merges are greedy and irreversible. Explain the consequence and name another method in this domain with the same structural limitation.",
    rubric: {
      elements: [
        {
          id: "the-consequence",
          description:
            "A bad early merge cannot be undone by any later step, so an error near the leaves propagates into every grouping above it in the tree.",
          weight: 4,
          required: true,
        },
        {
          id: "the-parallel",
          description:
            "Decision tree construction has the same structure: each split is locally best with no lookahead, and a poor early choice constrains everything beneath it.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.95,
    discrimination: 1.5,
    expectedSeconds: 180,
    prereqClosure: ["hierarchical-clustering", "clustering-methods"],
    source: ML_12,
    status: "live",
  },
  {
    id: "hierarchical-clustering--explain-dendrogram-ordering",
    conceptId: "hierarchical-clustering",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Two leaves sit next to each other in a dendrogram. What can and cannot be concluded from that adjacency?",
    rubric: {
      elements: [
        {
          id: "what-cannot",
          description:
            "Nothing about their similarity: the leaf ordering is not unique — each internal node's two children can be drawn in either order, so many orderings are consistent with the same tree.",
          weight: 5,
          required: true,
        },
        {
          id: "what-can",
          description:
            "Only the tree structure carries information: the height at which two leaves' subtrees join is what says how dissimilar they are.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.25,
    discrimination: 1.6,
    expectedSeconds: 180,
    prereqClosure: ["hierarchical-clustering"],
    source: ML_12,
    status: "live",
  },
  {
    id: "hierarchical-clustering--transfer-deferred-not-removed",
    conceptId: "hierarchical-clustering",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Hierarchical clustering is often recommended because it does not require choosing k in advance. Assess that claim honestly.",
    rubric: {
      elements: [
        {
          id: "the-choice-is-deferred",
          description:
            "It defers the decision rather than removing it: where to cut the dendrogram is exactly as unfalsifiable as choosing k, and is now made by eye.",
          weight: 5,
          required: true,
        },
        {
          id: "the-genuine-gain",
          description:
            "The real gain is that you see the structure at every scale before deciding, and whether the merge distances jump sharply anywhere — information a single partition does not provide.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.6,
    discrimination: 1.6,
    expectedSeconds: 190,
    prereqClosure: ["hierarchical-clustering", "clustering-methods"],
    source: ML_12,
    status: "live",
  },
  {
    id: "hierarchical-clustering--transfer-cost-limits",
    conceptId: "hierarchical-clustering",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Agglomerative clustering needs O(n²) memory. Explain what that rules out and what it means for a dataset of two million points.",
    rubric: {
      elements: [
        {
          id: "the-matrix",
          description:
            "It holds pairwise distances between all points, so memory grows with the square of the sample size — two million points implies on the order of 10¹² pairs, which cannot be stored.",
          weight: 4,
          required: true,
        },
        {
          id: "what-follows",
          description:
            "The method is simply unavailable at that scale; the practical options are to cluster a sample and assign the rest, or to use a method whose cost is near-linear.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.9,
    discrimination: 1.5,
    expectedSeconds: 190,
    prereqClosure: ["hierarchical-clustering", "clustering-methods"],
    source: ML_12,
    status: "live",
  },

  // --- Density-Based Clustering --------------------------------------------
  {
    id: "density-based-clustering--recall-three-point-types",
    conceptId: "density-based-clustering",
    format: "short-answer",
    cognitive: "recall",
    channels: ["typed", "spoken"],
    stem: "Name the three kinds of point DBSCAN distinguishes and define each.",
    rubric: {
      elements: [
        { id: "core", description: "Core: has at least minPts neighbours within distance ε.", weight: 3, required: true },
        { id: "border", description: "Border: within ε of a core point but without enough neighbours of its own — it joins a cluster but cannot extend it.", weight: 3, required: true },
        { id: "noise", description: "Noise: neither, and assigned to no cluster at all.", weight: 3, required: true },
      ],
    },
    difficulty: -0.6,
    discrimination: 1.2,
    expectedSeconds: 60,
    prereqClosure: ["density-based-clustering", "clustering-methods"],
    source: ML_12,
    status: "live",
  },
  {
    id: "density-based-clustering--recall-noise-output",
    conceptId: "density-based-clustering",
    format: "mcq",
    cognitive: "recall",
    channels: ["typed"],
    stem: "What does DBSCAN do with a point that belongs to no dense region?",
    choices: [
      { id: "a", text: "Labels it noise and assigns it to no cluster", correct: true },
      {
        id: "b",
        text: "Assigns it to the nearest cluster, as k-means would",
        correct: false,
        misconception: {
          id: "dbscan-thought-to-partition",
          description:
            "Forcing every point into a cluster is exactly what DBSCAN declines to do, and that refusal is what makes it robust to outliers and usable as an anomaly detector.",
          blameConceptId: "density-based-clustering",
        },
      },
      {
        id: "c",
        text: "Creates a new single-point cluster for it",
        correct: false,
        misconception: {
          id: "dbscan-thought-to-make-singletons",
          description:
            "A single point cannot be a cluster under the definition — it fails the minPts condition, so it is noise rather than a cluster of one.",
          blameConceptId: "density-based-clustering",
        },
      },
      {
        id: "d",
        text: "Discards it from the dataset",
        correct: false,
        misconception: {
          id: "noise-thought-deleted",
          description:
            "The point is labelled, not removed — and the noise label is often the most interesting part of the output.",
          blameConceptId: "density-based-clustering",
        },
      },
    ],
    difficulty: -0.3,
    discrimination: 1.4,
    expectedSeconds: 40,
    prereqClosure: ["density-based-clustering"],
    source: ML_12,
    status: "live",
  },
  {
    id: "density-based-clustering--apply-classify-a-point",
    conceptId: "density-based-clustering",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "With minPts = 5, a point has 3 neighbours within ε, and one of those 3 is a core point. Classify it and justify.",
    rubric: {
      elements: [
        { id: "border", description: "Border point.", weight: 3, required: true },
        { id: "justification", description: "It fails the minPts condition so it is not core, but it lies within ε of a core point, so it joins that core point's cluster without being able to extend it further.", weight: 4, required: true },
      ],
    },
    difficulty: 0.2,
    discrimination: 1.4,
    expectedSeconds: 120,
    prereqClosure: ["density-based-clustering"],
    source: ML_12,
    status: "live",
  },
  {
    id: "density-based-clustering--apply-concentric-rings",
    conceptId: "density-based-clustering",
    format: "short-answer",
    cognitive: "apply",
    channels: ["typed", "spoken"],
    stem: "Two concentric rings of points defeat a centroid-based method entirely. Explain why DBSCAN handles them and the centroid method cannot.",
    rubric: {
      elements: [
        {
          id: "why-centroids-fail",
          description:
            "Minimising distance to a centre can only carve out convex regions, and the two rings share a centre — so the method slices the annulus into wedges rather than separating the rings.",
          weight: 4,
          required: true,
        },
        {
          id: "why-density-works",
          description:
            "DBSCAN grows clusters by density connectivity rather than distance to a centre, so it follows each ring around regardless of shape as long as the rings are separated by a sparse gap.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 0.6,
    discrimination: 1.5,
    expectedSeconds: 160,
    prereqClosure: ["density-based-clustering", "k-means-clustering"],
    source: ML_12,
    status: "live",
  },
  {
    id: "density-based-clustering--explain-choosing-epsilon",
    conceptId: "density-based-clustering",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "Describe the standard heuristic for choosing ε and explain what the elbow in that plot represents.",
    rubric: {
      elements: [
        {
          id: "the-plot",
          description:
            "Plot each point's distance to its k-th nearest neighbour, sorted ascending.",
          weight: 4,
          required: true,
        },
        {
          id: "what-the-elbow-means",
          description:
            "Below the elbow, points are in dense regions where the k-th neighbour is close; above it, points are isolated and the distance climbs sharply — so the elbow separates the two populations and is the natural ε.",
          weight: 5,
          required: true,
        },
      ],
    },
    difficulty: 1.0,
    discrimination: 1.5,
    expectedSeconds: 180,
    prereqClosure: ["density-based-clustering", "clustering-methods"],
    source: ML_12,
    status: "live",
  },
  {
    id: "density-based-clustering--explain-varying-density",
    conceptId: "density-based-clustering",
    format: "short-answer",
    cognitive: "explain",
    channels: ["typed", "spoken"],
    stem: "A dataset has one dense cluster and two sparser ones. Explain DBSCAN's characteristic failure here and what resolves it.",
    rubric: {
      elements: [
        {
          id: "no-single-epsilon-works",
          description:
            "One global ε cannot serve both densities: an ε that correctly separates the dense cluster merges the two sparse ones, and an ε that separates the sparse pair shatters the dense cluster into fragments and noise.",
          weight: 5,
          required: true,
        },
        {
          id: "the-resolution",
          description:
            "HDBSCAN builds a hierarchy over density levels and extracts clusters that are stable across them, removing ε as a parameter altogether.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 1.35,
    discrimination: 1.7,
    expectedSeconds: 190,
    prereqClosure: ["density-based-clustering", "clustering-methods"],
    source: ML_12,
    status: "live",
  },
  {
    id: "density-based-clustering--transfer-compare-with-kmeans",
    conceptId: "density-based-clustering",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "Both k-means and DBSCAN handle clusters of differing density poorly, for different reasons. Give each reason.",
    rubric: {
      elements: [
        {
          id: "kmeans-reason",
          description:
            "k-means minimises distance to a centre, so it tends to split a large diffuse cluster and absorb a small tight one into a neighbour — the objective has no notion of density at all.",
          weight: 4,
          required: true,
        },
        {
          id: "dbscan-reason",
          description:
            "DBSCAN has an explicit density notion but only one global threshold for it, so it can be correct at one density level and wrong at every other.",
          weight: 4,
          required: true,
        },
        {
          id: "the-distinction",
          description:
            "Bonus: notes the difference in kind — one lacks the concept, the other has it and applies it uniformly.",
          weight: 2,
        },
      ],
    },
    difficulty: 1.7,
    discrimination: 1.6,
    expectedSeconds: 200,
    prereqClosure: ["density-based-clustering", "k-means-clustering", "clustering-methods"],
    source: ML_12,
    status: "live",
  },
  {
    id: "density-based-clustering--transfer-evaluation-consequence",
    conceptId: "density-based-clustering",
    format: "short-answer",
    cognitive: "transfer",
    channels: ["typed", "spoken"],
    stem: "DBSCAN labels some points noise. Explain what that means for evaluating its output with a standard clustering metric, and what to do instead.",
    rubric: {
      elements: [
        {
          id: "metrics-assume-a-partition",
          description:
            "Metrics such as the silhouette assume every point belongs to a cluster; with a noise label the output is not a partition, so the metric is either undefined or silently computed over a subset.",
          weight: 5,
          required: true,
        },
        {
          id: "what-to-do",
          description:
            "Report the noise fraction alongside any metric, compute cluster-quality measures over the clustered points only and say so, and check stability of both the clusters and the noise set across resamples.",
          weight: 4,
          required: true,
        },
      ],
    },
    difficulty: 2.0,
    discrimination: 1.6,
    expectedSeconds: 210,
    prereqClosure: ["density-based-clustering", "clustering-methods"],
    source: ML_12,
    status: "live",
  },
];
