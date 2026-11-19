import type { Item, SourceRef } from "../../lib/assessment/types";
import { makeBuilders, type Spec } from "./authoring";

/**
 * JEPA world models: joint-embedding predictive architectures (I-JEPA,
 * V-JEPA), collapse prevention without negatives, and action-conditioned
 * latent world models for planning. Forty questions, four per level. Every
 * numeric key was recomputed independently in Python before landing.
 */
const AUTHORED: SourceRef = {
  id: "mathlingo-authored-dl-jepa",
  tier: "generated",
  title: "Mathlingo authored item (Deep Learning, JEPA world models)",
};

const { mcq, short, num } = makeBuilders(AUTHORED);
const m = (slug: string, cognitive: Spec["cognitive"], level: number, seconds: number, stem: string) =>
  ({ concept: "jepa-world-models", slug, cognitive, level, seconds, stem });

const jepa: Item[] = [
  // level 1
  mcq(m("recall-predict-latent", "recall", 1, 15, "A JEPA is trained to predict:"),
    "The representation of a hidden part of the input, from the representation of the visible part",
    [
      ["The hidden part's pixels", "jepa-is-mae", "Pixel reconstruction is what masked autoencoders do."],
      ["Whether two views match, using negatives to push others apart", "jepa-is-contrastive", "That is contrastive learning; JEPAs need no negatives."],
      ["A human-provided class label", "jepa-supervised", "The target comes from the input itself."],
    ]),
  mcq(m("recall-target-encoder", "recall", 1, 15, "In I-JEPA, the target encoder's weights are:"),
    "An exponential moving average of the context encoder's weights",
    [
      ["Trained by backpropagating the prediction loss", "target-gradient", "A stop-gradient blocks the loss from reaching them."],
      ["Random and frozen", "target-random", "A random target would carry no learned structure."],
      ["Taken from a separately trained supervised model", "target-supervised", "The method is self-supervised end to end."],
    ]),
  mcq(m("recall-collapse", "recall", 1, 15, "Representation collapse means:"),
    "The encoder maps every input to nearly the same vector, so the prediction loss becomes trivially small",
    [
      ["The training loss diverges to infinity", "collapse-divergence", "Collapse makes the loss small, not large."],
      ["The model forgets earlier tasks", "collapse-forgetting", "That is catastrophic forgetting."],
      ["The embedding dimension is too large", "collapse-big-dim", "Collapse can happen at any width."],
    ]),
  mcq(m("recall-world-model", "recall", 1, 15, "An action-conditioned JEPA world model predicts:"),
    "The next latent state from the current latent state and an action",
    [
      ["The next video frame's pixels", "wm-pixels", "It predicts embeddings, not pixels."],
      ["The reward of each action", "wm-reward", "It models dynamics; rewards or goals come from elsewhere."],
      ["The action an expert would take", "wm-policy", "That is a policy, learned by imitation."],
    ]),

  // level 2
  num(m("apply-patch-count", "apply", 2, 20, "A $224 \\times 224$ image is cut into non-overlapping $16 \\times 16$ patches. How many patches are there?"), 196),
  num(m("apply-l2-loss", "apply", 2, 25, "The predictor outputs $[0.2, -0.1, 0.5]$ and the target embedding is $[0.1, 0.1, 0.3]$. What is the mean squared error?"), 0.03),
  num(m("apply-ema-step", "apply", 2, 20, "With momentum $m = 0.99$, the target weight is $1.0$ and the context weight is $2.0$. What is the target weight after one EMA update?"), 1.01),
  mcq(m("explain-stop-gradient", "explain", 2, 25, "Why is the target embedding passed through a stop-gradient?"),
    "So the loss updates only the context encoder and predictor, and the target moves only through the EMA, which helps prevent collapse",
    [
      ["To save memory, with no effect on what is learned", "sg-memory-only", "It changes the training dynamics fundamentally."],
      ["To make the loss differentiable", "sg-differentiable", "The loss is differentiable either way."],
      ["So the target encoder learns faster", "sg-faster", "It stops the target learning from the loss at all."],
    ]),

  // level 3
  num(m("apply-ema-horizon", "apply", 3, 25, "The EMA momentum is $m = 0.996$. Its time constant is about $1/(1 - m)$ steps. How many steps is that?"), 250),
  num(m("apply-block-size", "apply", 3, 25, "An image has $196$ patches. A target block covers $15\\%$ of the image. How many patches is that, to $1$ decimal place?"), 29.4),
  num(m("apply-l1-loss", "apply", 3, 30, "V-JEPA uses an $L_1$ loss. The prediction is $[0.5, 0, -0.2, 0.4]$ and the target $[0.3, 0.1, -0.2, 0]$. What is the mean absolute error? Give $3$ decimal places."), 0.175),
  mcq(m("explain-vs-mae", "explain", 3, 30, "Compared with a masked autoencoder, which reconstructs pixels, JEPA's main advantage is:"),
    "It need not model unpredictable low-level detail such as texture and noise, so the representation can focus on semantic structure",
    [
      ["It needs no encoder", "no-encoder", "It has two."],
      ["It produces sharper reconstructed images", "sharper-images", "It produces no images at all."],
      ["It requires labelled data, which makes it more accurate", "needs-labels", "It is self-supervised."],
    ]),

  // level 4
  num(m("apply-video-tokens", "apply", 4, 40, "A $16$-frame $224 \\times 224$ clip is tokenised into tubelets of $2$ frames by $16 \\times 16$ pixels. How many tokens result?"), 1568),
  num(m("apply-visible-tokens", "apply", 4, 35, "V-JEPA masks $90\\%$ of the $1{,}568$ tokens of a clip. How many remain visible on average?"), 156.8),
  num(m("apply-ema-lag", "apply", 4, 45, "The context weight stays fixed at $1$, the target weight starts at $0$, and $m = 0.9$. What is the target weight after $10$ EMA updates? Give $4$ decimal places."), 0.6513),
  mcq(m("explain-mask-tokens", "explain", 4, 40, "Why does the I-JEPA predictor receive mask tokens carrying each target block's positions?"),
    "It must know where the target is to predict its representation — the positions are the conditioning variable",
    [
      ["To tell it which patches are noise", "mask-noise", "They mark locations to predict, not noise."],
      ["To make the predictor bidirectional", "mask-bidirectional", "Attention direction is unrelated."],
      ["To give it the target's pixels", "mask-pixels", "That would leak the answer."],
    ]),

  // level 5
  short(m("explain-why-latent", "explain", 5, 120, "Why predict in representation space rather than pixel space?"),
    [
      ["unpredictable", "Many pixel details are inherently unpredictable, so a pixel loss forces the model to spend capacity on them or output blurry averages", 2, true],
      ["latent-frees", "In representation space the encoder can discard what can't be predicted and keep the predictable, semantic content, which is what downstream tasks need", 2, true],
    ]),
  mcq(m("apply-constant-encoder", "apply", 5, 40, "If both encoders output the same constant vector for every input, the JEPA prediction loss is:"),
    "Zero — which is why something must prevent collapse",
    [
      ["Very large", "constant-large", "The predictor can output the same constant exactly."],
      ["Undefined", "constant-undefined", "It is perfectly well defined."],
      ["Equal to the pixel reconstruction loss", "constant-pixel", "No pixels are involved."],
    ]),
  mcq(m("recall-no-negatives", "recall", 5, 40, "Unlike contrastive learning, a JEPA does not need:"),
    "Negative examples to push apart",
    [
      ["An encoder", "no-encoder-5", "It has two encoders."],
      ["A loss function", "no-loss", "It minimises a prediction loss."],
      ["Unlabelled data", "no-unlabelled", "Unlabelled data is all it uses."],
    ]),
  num(m("apply-energy", "apply", 5, 35, "The predicted embedding is $[1, 2]$ and the target embedding is $[1, 0]$. What is the energy, taken as the squared $L_2$ distance?"), 4),

  // level 6
  short(m("explain-ema-asymmetry", "explain", 6, 150, "How do the EMA target encoder and the predictor together discourage collapse?"),
    [
      ["sg-ema", "With a stop-gradient, the target is never optimised to match the prediction and only trails the context encoder slowly through the EMA, so the two sides cannot jointly shrink to a constant", 2, true],
      ["asymmetry", "The predictor sits on one branch only, so the branches are asymmetric (as in BYOL), which empirically avoids the trivial solution; the theory is still incomplete", 2, true],
    ]),
  num(m("apply-vicreg-variance", "apply", 6, 45, "VICReg's variance term for one dimension is $\\max(0, 1 - \\sigma)$. What is it for a dimension whose standard deviation is $\\sigma = 0.4$?"), 0.6),
  num(m("apply-vicreg-covariance", "apply", 6, 50, "The embedding covariance matrix is $\\begin{bmatrix} 1 & 0.3 \\\\ 0.3 & 1 \\end{bmatrix}$. What is the sum of its squared off-diagonal entries?"), 0.18),
  mcq(m("explain-large-targets", "explain", 6, 50, "I-JEPA's target blocks are fairly large (about $15$–$20\\%$ of the image each) because:"),
    "Large targets force semantic prediction, while small ones can be filled in from the neighbouring texture",
    [
      ["Large targets reduce the number of patches", "large-fewer", "Target size does not change the patch count."],
      ["Small targets cause the loss to diverge", "small-diverge", "Small targets make the task too easy, not unstable."],
      ["The predictor can only output large blocks", "predictor-limit", "The predictor works at patch level."],
    ]),

  // level 7
  short(m("explain-multiblock", "explain", 7, 150, "Explain I-JEPA's multi-block masking: why one large context block, with the target regions removed, and several targets?"),
    [
      ["context", "A large, spatially spread context block keeps enough information to predict from, and removing the target patches stops the model copying them", 2, true],
      ["several-targets", "Several large targets per image give more prediction signal from one pass of the context encoder and require semantic rather than local prediction", 2, true],
    ]),
  num(m("apply-context-visible", "apply", 7, 50, "A context block has $176$ patches, of which $64$ fall inside target blocks and are removed. How many patches does the context encoder see?"), 112),
  num(m("apply-predictions", "apply", 7, 50, "There are $4$ target blocks of $29$ patches each. How many patch embeddings does the predictor produce per image?"), 116),
  mcq(m("apply-diagnose-collapse", "apply", 7, 60, "During training, each embedding dimension's standard deviation drifts toward $0$ while the loss keeps falling. A sensible response:"),
    "Treat it as creeping collapse: track embedding variance and rank, and raise the EMA momentum or add a variance regulariser",
    [
      ["Ignore it, since the loss is falling", "trust-loss", "A collapsing model also drives the loss down."],
      ["Remove the stop-gradient", "remove-sg", "That makes collapse easier, not harder."],
      ["Shrink the target blocks", "smaller-targets", "That makes the task easier without addressing collapse."],
    ]),

  // level 8
  short(m("transfer-planning", "transfer", 8, 150, "How can an action-conditioned JEPA be used to plan toward a goal image?"),
    [
      ["rollout", "Encode the current observation and the goal image, then roll the predictor forward over candidate action sequences to get predicted future embeddings", 2, true],
      ["optimise", "Choose the sequence whose final predicted embedding is closest to the goal's (e.g. with the cross-entropy method), execute its first action, then re-encode and replan", 2, true],
    ]),
  num(m("apply-lowest-energy", "apply", 8, 60, "The goal embedding is $[1, 1]$. Candidate actions give predicted embeddings $[0.8, 1.1]$, $[1.3, 0.7]$ and $[0.5, 0.9]$. What is the lowest squared-distance energy among them?"), 0.05),
  num(m("apply-cem-calls", "apply", 8, 50, "A cross-entropy-method planner samples $300$ action sequences of horizon $5$ per iteration and runs $10$ iterations. Counting one predictor call per step of each sequence, how many predictor calls does one plan need?"), 15000),
  mcq(m("explain-replan", "explain", 8, 60, "Why replan after every executed action (model-predictive control) instead of executing the whole planned sequence?"),
    "Prediction errors compound over the horizon, and replanning from the newly observed state corrects them",
    [
      ["Planning once is impossible with a JEPA", "plan-once-impossible", "It is possible, just less robust."],
      ["Replanning makes each plan cheaper", "replan-cheaper", "It costs more compute overall."],
      ["The goal embedding changes each step", "goal-changes", "The goal is fixed; the current state is what changes."],
    ]),

  // level 9
  short(m("transfer-vs-pixel-world-model", "transfer", 9, 180, "Compare a JEPA world model with a pixel-generative world model (a video generator, or a Dreamer-style model with a decoder) for planning."),
    [
      ["jepa-pros", "The JEPA plans in a compact latent space, which is cheaper and ignores irrelevant visual detail", 2, true],
      ["pixel-pros-jepa-cons", "A pixel model's predictions can be rendered and inspected and are anchored by a reconstruction signal; the JEPA's cannot be seen, needs the goal in encodable form, and may drop task-relevant detail", 2, true],
    ]),
  short(m("transfer-data-recipe", "transfer", 9, 150, "Why can a JEPA world model learn mostly from video without actions and need only a little action-labelled data?"),
    [
      ["passive", "Passive video is abundant and teaches the representation and much of how the world evolves, with no actions needed", 2, true],
      ["post-train", "Action conditioning is added afterwards on a small interaction dataset (V-JEPA 2-AC used under a hundred hours of robot data), because action-labelled data is scarce and expensive", 2, true],
    ]),
  num(m("apply-error-growth", "apply", 9, 60, "A latent prediction error of $0.05$ grows by a factor of $1.2$ per rollout step. What is it after $5$ steps? Give $4$ decimal places."), 0.1244),
  mcq(m("recall-probe-protocol", "recall", 9, 45, "The standard way to evaluate a JEPA's learned representation is:"),
    "Freeze the encoder and train a linear or attentive probe on a downstream task",
    [
      ["Report the final pretraining loss", "eval-loss", "A collapsed model can have a very low loss."],
      ["Reconstruct images and judge them by eye", "eval-reconstruct", "A JEPA has no decoder."],
      ["Count the encoder's parameters", "eval-params", "Size says nothing about representation quality."],
    ]),

  // level 10
  short(m("transfer-ehr-jepa", "transfer", 10, 180, "Design a JEPA for patient timelines, and contrast it with masked code prediction."),
    [
      ["design", "A context encoder embeds the observed history, an EMA target encoder embeds a hidden window (e.g. the next months), and a predictor conditioned on the time offset predicts that window's embedding", 2, true],
      ["contrast", "Masked code prediction must name the exact hidden codes, unpredictable coding noise included; the JEPA predicts a summary embedding and needs collapse prevention (EMA, stop-gradient or variance regularisation)", 2, true],
    ]),
  short(m("transfer-lighting-failure", "transfer", 10, 180, "A JEPA world model plans well in the lab but fails on a real robot when the lighting changes. Analyse the failure and propose fixes."),
    [
      ["cause", "The embedding is sensitive to lighting (distribution shift or a missing invariance), so the distance to the goal changes for reasons unrelated to the task and the planner chases the wrong target", 2, true],
      ["fix", "Pretrain on more varied video or with photometric augmentation, fine-tune on the new conditions, or re-encode the goal under the same lighting", 2, true],
    ]),
  num(m("apply-ema-schedule", "apply", 10, 60, "The EMA momentum rises linearly from $0.996$ to $1.0$ over $100{,}000$ steps. What is it at step $25{,}000$?"), 0.997),
  mcq(m("explain-lecun-argument", "explain", 10, 60, "LeCun's case for JEPAs over generative world models rests mainly on the claim that:"),
    "The world is only partly predictable, so a model should predict abstract representations and leave unpredictable detail out instead of averaging over it",
    [
      ["Generative models cannot be trained with gradient descent", "gen-no-gd", "They train with gradient descent routinely."],
      ["Pixels contain no useful information", "pixels-useless", "The point is that much of it is unpredictable, not useless."],
      ["Contrastive learning is always better than prediction", "contrastive-better", "JEPAs are an alternative to contrastive methods, not a version of them."],
    ]),
];

export const dlJepa01Items: Item[] = jepa;
