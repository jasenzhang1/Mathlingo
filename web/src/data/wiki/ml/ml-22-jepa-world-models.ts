import type { WikiArticle } from "../types";

/**
 * Joint-embedding predictive architectures: self-supervised prediction in
 * representation space (I-JEPA, V-JEPA), how they avoid collapse without
 * negatives, and their use as action-conditioned world models for planning.
 */

const lecun =
  "LeCun, A Path Towards Autonomous Machine Intelligence (OpenReview position paper, 2022)";
const ijepa =
  "Assran et al., Self-Supervised Learning from Images with a Joint-Embedding Predictive Architecture (CVPR, 2023)";
const vjepa =
  "Bardes et al., Revisiting Feature Prediction for Learning Visual Representations from Video (TMLR, 2024)";
const vjepa2 =
  "Assran et al., V-JEPA 2: Self-Supervised Video Models Enable Understanding, Prediction and Planning (2025)";
const byol =
  "Grill et al., Bootstrap Your Own Latent: A New Approach to Self-Supervised Learning (NeurIPS, 2020)";

const jepaWorldModels: WikiArticle = {
  conceptId: "jepa-world-models",
  summary:
    "A joint-embedding predictive architecture (JEPA) learns by prediction, like a masked autoencoder, but " +
    "it predicts the representation of the hidden part of the input rather than its pixels. Two encoders " +
    "embed the visible context and the hidden target, and a predictor maps the context embedding to the " +
    "target embedding. Because the loss lives in representation space, the model is free to ignore detail " +
    "that cannot be predicted — the exact texture of leaves, sensor noise — and keep what can. Condition the " +
    "predictor on an action and the same machinery becomes a world model: it predicts the next state's " +
    "representation, and an agent can plan by searching for actions whose predicted outcome lands near a " +
    "goal.",

  sections: [
    {
      heading: "Predict the representation, not the input",
      blocks: [
        {
          kind: "table",
          headers: ["Family", "Trained to", "Needs", "Weak spot"],
          rows: [
            ["Generative (MAE, video generation)", "Reconstruct hidden pixels or tokens", "A decoder back to input space", "Spends capacity on unpredictable detail; blurry averages"],
            ["Contrastive (SimCLR, CLIP)", "Pull matched views together, push others apart", "Negatives, usually large batches", "Depends on augmentations and many negatives"],
            ["Joint-embedding predictive (JEPA)", "Predict the target's embedding from the context's", "A guard against collapse", "No pixel output to inspect"],
          ],
        },
        {
          kind: "formula",
          latex:
            "\\mathcal{L} = \\big\\lVert\\, P_\\phi\\big(s_x,\\, z\\big) - \\operatorname{sg}\\big(\\bar s_y\\big) \\big\\rVert^{2}, \\qquad s_x = f_\\theta(x),\\quad \\bar s_y = f_{\\bar\\theta}(y)",
          caption: "Context $x$, target $y$, conditioning $z$ (where the target is, or which action was taken); sg is stop-gradient",
        },
        {
          kind: "definitions",
          items: [
            {
              term: "Context encoder $f_\\theta$",
              description: "Embeds the visible part of the input. It is the network kept for downstream use.",
            },
            {
              term: "Target encoder $f_{\\bar\\theta}$",
              description:
                "Embeds the hidden target. Its weights are not trained by gradient: they are an exponential moving average (EMA) of the context encoder's.",
            },
            {
              term: "Predictor $P_\\phi$",
              description:
                "A narrower network that maps the context embedding, plus the conditioning $z$, to a guess at the target embedding. In I-JEPA, $z$ is a set of mask tokens carrying the target patches' positions.",
            },
            {
              term: "Energy",
              description:
                "LeCun frames the loss as an energy $E(x, y)$: low when $y$ is a compatible continuation of $x$. Training lowers it on real pairs; planning searches for the $y$ (or action) with lowest energy.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why the latent target helps",
          text:
            "Ask a pixel model what is behind an occluder and the honest answer is a distribution over many " +
            "textures; a squared pixel loss returns their blurry average and is penalised for not guessing the " +
            "noise. In representation space the encoder can map all those textures to the same point — “grass” " +
            "— and the prediction becomes easy and meaningful. The encoder is learning what to ignore.",
        },
      ],
    },
    {
      heading: "Avoiding collapse without negatives",
      blocks: [
        {
          kind: "prose",
          text:
            "There is a trivial solution: if both encoders output the same constant vector for every input, " +
            "the predictor outputs it too and the loss is exactly zero. Contrastive methods rule this out with " +
            "negatives. JEPAs use the trick introduced by BYOL — asymmetry between the two branches:",
        },
        {
          kind: "formula",
          latex: "\\bar\\theta \\;\\leftarrow\\; m\\,\\bar\\theta + (1 - m)\\,\\theta, \\qquad m \\approx 0.996 \\to 1",
          caption: "The target encoder trails the context encoder; time constant about $1/(1 - m)$ steps",
        },
        {
          kind: "list",
          items: [
            "Stop-gradient: the loss cannot move the target encoder directly, so the two sides cannot cooperate to shrink to a constant.",
            "EMA: the target changes slowly — with $m = 0.996$ it averages over roughly $1/(1 - 0.996) = 250$ steps — giving the predictor a stable thing to chase.",
            "A predictor on one branch only: the context branch has extra capacity the target branch lacks, which breaks the symmetry a collapse would need.",
            "Alternatively, regularise the embeddings directly: VICReg keeps each dimension's standard deviation above a floor and decorrelates dimensions.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Collapse can be partial and silent",
          text:
            "The loss going down is not evidence of learning — a collapsing model also drives it down. Monitor " +
            "the per-dimension standard deviation and the effective rank of the embeddings. A slow slide toward " +
            "low rank is the usual failure, and the theory of why EMA plus predictor works is still incomplete.",
        },
      ],
    },
    {
      heading: "I-JEPA and V-JEPA: designing what to hide",
      blocks: [
        {
          kind: "prose",
          text:
            "I-JEPA works on Vision Transformer patches. It samples several target blocks, each large (about " +
            "$15$–$20\\%$ of the image), and one big context block (about $85$–$100\\%$) from which every target " +
            "patch is removed. Large targets force semantic prediction — a small one could be filled in from " +
            "the texture next to it. The predictor is run once per target block. V-JEPA extends this to video, " +
            "masking spatio-temporal tubes covering most of the clip (around $90\\%$) and using an $L_1$ loss.",
        },
        {
          kind: "example",
          title: "Counting patches and scoring a prediction",
          problem:
            "A $224 \\times 224$ image is cut into $16 \\times 16$ patches. Four target blocks of $29$ patches " +
            "are sampled; the context block has $176$ patches, $64$ of which lie in a target and are removed. " +
            "For one patch, the predictor outputs $[0.2, -0.1, 0.5]$ and the target encoder gives " +
            "$[0.1, 0.1, 0.3]$. Find the number of patches, the context the encoder sees, the number of patch " +
            "predictions, and the mean squared error for that patch.",
          steps: [
            "Patches: $(224/16)^2 = 14^2 = 196$.",
            "Visible context: $176 - 64 = 112$ patches.",
            "Predictions: $4 \\times 29 = 116$ patch embeddings, one per target patch.",
            "Error: differences $0.1, -0.2, 0.2$; squares $0.01, 0.04, 0.04$; mean $0.09 / 3 = 0.03$.",
          ],
          answer:
            "$196$ patches, $112$ visible, $116$ predictions, loss $0.03$ for that patch. The context encoder runs once on $112$ patches and feeds all four targets, which is part of why I-JEPA is cheap to train.",
        },
        {
          kind: "prose",
          text:
            "Representations are evaluated the usual way: freeze the encoder and fit a linear or attentive " +
            "probe on a labelled task. I-JEPA's features do well on semantic tasks without the hand-crafted " +
            "augmentations contrastive methods rely on, and V-JEPA's on motion-heavy video tasks.",
        },
      ],
    },
    {
      heading: "From representation to world model",
      blocks: [
        {
          kind: "formula",
          latex:
            "\\hat z_{t+1} = P_\\phi(z_t, a_t), \\qquad a^{\\star}_{1:H} = \\arg\\min_{a_{1:H}} \\big\\lVert \\hat z_{H} - z_{\\text{goal}} \\big\\rVert",
          caption: "An action-conditioned predictor, and planning as energy minimisation toward a goal embedding",
        },
        {
          kind: "prose",
          text:
            "A world model predicts how the state changes under an action. Here the state is a JEPA embedding " +
            "$z_t$ of the current observation. Planning encodes the goal image, rolls the predictor forward " +
            "over candidate action sequences, and keeps the sequence whose final predicted embedding is closest " +
            "to the goal's — typically with the cross-entropy method (sample, keep the best, refit, repeat). " +
            "The first action is executed, the new observation is encoded, and the plan is redone " +
            "(model-predictive control).",
        },
        {
          kind: "example",
          title: "Choosing an action by energy",
          problem:
            "The goal embedding is $[1, 1]$. Three candidate actions give predicted next embeddings " +
            "$A: [0.8, 1.1]$, $B: [1.3, 0.7]$ and $C: [0.5, 0.9]$. Using squared distance as the energy, which " +
            "action is chosen?",
          steps: [
            "$E_A = 0.2^2 + 0.1^2 = 0.05$.",
            "$E_B = 0.3^2 + 0.3^2 = 0.18$.",
            "$E_C = 0.5^2 + 0.1^2 = 0.26$.",
          ],
          answer: "Action $A$, energy $0.05$. Nothing was rendered: the whole search happened in embedding space.",
        },
        {
          kind: "list",
          items: [
            "The recipe is to learn the dynamics from passive video, which is abundant, then add action conditioning from a small amount of action-labelled interaction. V-JEPA 2 pretrains on over a million hours of video, then trains an action-conditioned predictor (V-JEPA 2-AC) on under a hundred hours of robot data, and plans zero-shot pick-and-place toward goal images.",
            "Compared with pixel world models (video generators, or Dreamer-style models with a decoder), planning in latent space is cheaper and ignores irrelevant detail — but there is nothing to look at, and the goal must be given in a form the encoder can embed.",
            "Errors compound over the horizon, which is why planning is short-horizon and replans every step. LeCun's hierarchical JEPA proposes stacking predictors at coarser time scales for longer plans.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "The latent must keep what the task needs",
          text:
            "The encoder is trained to drop the unpredictable, not to keep the task-relevant. If a detail that " +
            "matters for control — a small object's exact position, a change in lighting that the goal depends " +
            "on — is discarded or confounded, the planner optimises the wrong distance and nothing in the loss " +
            "warns you.",
        },
      ],
    },
  ],

  references: [
    { source: lecun, locator: "Sections on the JEPA, collapse prevention, and the hierarchical JEPA" },
    { source: ijepa, locator: "Method (multi-block masking strategy)" },
    { source: vjepa, locator: "Method (feature prediction objective and masking)" },
    { source: vjepa2, locator: "Action-conditioned post-training and planning (V-JEPA 2-AC)" },
    { source: byol, locator: "Method (target network and predictor)" },
  ],
};

export const ml22JepaWorldModels: WikiArticle[] = [jepaWorldModels];
