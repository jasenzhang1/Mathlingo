import type { Item } from "../../lib/assessment/types";
import { m, mcq, num, short } from "./dl-sixty-shared";

/**
 * Message passing and GNN pitfalls, GANs, normalising flows, score matching,
 * denoising score matching, diffusion models and mixture-of-experts, each
 * brought from 40 to 60 questions.
 */

// ---------------------------------------------------------------------------
// message-passing-neural-networks
// ---------------------------------------------------------------------------
const MP = "message-passing-neural-networks";
const messagePassing: Item[] = [
  mcq(m(MP, "recall-message", "recall", 1, 15, "In a message passing layer, the message function:"),
    "Computes what each neighbour sends, from its features (and possibly the edge's)",
    [
      ["Updates the graph's edges", "message-edges", "It computes messages, not new edges."],
      ["Pools the whole graph into one vector", "message-readout", "That's the readout."],
      ["Chooses the learning rate", "message-lr", "Unrelated."],
    ]),
  mcq(m(MP, "recall-update", "recall", 1, 15, "The update function in a message passing layer:"),
    "Combines a node's current state with its aggregated messages into its new state",
    [
      ["Deletes nodes with few neighbours", "update-delete", "It updates features."],
      ["Sorts neighbours by degree", "update-sort", "Order shouldn't matter."],
      ["Computes the loss", "update-loss", "It's part of the forward pass."],
    ]),
  num(m(MP, "apply-sum", "apply", 2, 20, "A node's neighbours have features $1$, $4$ and $7$. What is the sum aggregation?"), 12),
  num(m(MP, "apply-max", "apply", 2, 20, "Same neighbours. What is the max aggregation?"), 7),
  num(m(MP, "apply-gcn-weight", "apply", 3, 25, "GCN weights an edge by $\\frac{1}{\\sqrt{d_id_j}}$. What is it for degrees $2$ and $8$?"), 0.25),
  num(m(MP, "apply-messages", "apply", 3, 25, "An undirected graph has $5{,}000$ edges. Sending a message each way along every edge, how many messages per layer?"), 10000),
  num(m(MP, "apply-gin", "apply", 4, 30, "GIN computes $(1 + \\varepsilon)h_v + \\sum_u h_u$ before its MLP. With $\\varepsilon = 0.5$, $h_v = 2$ and neighbour sum $6$, what is it?"), 9),
  num(m(MP, "apply-path-reach", "apply", 4, 30, "On a long path graph, an end node runs $3$ message passing layers. From how many nodes (including itself) can its state depend?"), 4),
  mcq(m(MP, "apply-readout", "apply", 5, 40, "Why must a graph-level readout be permutation-invariant?"),
    "Node order is arbitrary, so the same graph must give the same output however its nodes are numbered",
    [
      ["To make training faster", "readout-speed", "It's about correctness."],
      ["Because graphs have no features", "readout-features", "They do; order is arbitrary."],
      ["It needn't be", "readout-needn't", "Otherwise outputs depend on numbering."],
    ]),
  short(m(MP, "explain-edge-features", "explain", 5, 90, "How can edge features (like bond types) enter a message passing layer?"),
    [
      ["message", "Include the edge's features as an input to the message function alongside the two endpoint states", 2, true],
      ["alternatives", "Or use them to choose edge-type-specific weights (as in R-GCN) or to modulate attention scores", 2, true],
    ]),
  num(m(MP, "apply-message-params", "apply", 6, 45, "A message MLP takes two $32$-dimensional node states plus $16$ edge features and outputs $32$ values, with biases. How many parameters?"), 2592),
  num(m(MP, "transfer-gat", "transfer", 7, 60, "A GAT node has three neighbours with scores $0$, $0$ and $\\ln 2$. What weight does the third get?"), 0.5),
  short(m(MP, "transfer-equivariance", "transfer", 7, 120, "Why are message passing layers permutation-equivariant, and why does that matter?"),
    [
      ["why", "Each node applies the same functions and aggregates neighbours with an order-independent operation, so renumbering nodes just renumbers the outputs", 2, true],
      ["matters", "Predictions then depend on graph structure, not on an arbitrary node ordering", 2, true],
    ]),
  num(m(MP, "transfer-cost", "transfer", 8, 60, "Sparse aggregation costs about $|E| \\cdot d$ operations. For $10^{6}$ edges and $d = 64$, how many million?"), 64),
  short(m(MP, "transfer-virtual-node", "transfer", 8, 120, "What is a virtual (master) node, and what problem does it address?"),
    [
      ["what", "An extra node connected to every node, which aggregates and broadcasts global information each layer", 2, true],
      ["problem", "It gives every pair of nodes a short path, easing long-range communication and over-squashing", 2, true],
    ]),
  num(m(MP, "transfer-grid", "transfer", 9, 75, "On a large 2-D grid graph (4 neighbours per node), how many nodes lie within $2$ hops of a node, including itself?"), 13),
  mcq(m(MP, "transfer-egnn", "transfer", 9, 75, "E(n)-equivariant GNNs keep outputs consistent under rotation by building messages from:"),
    "Rotation-invariant quantities such as squared distances between nodes",
    [
      ["Raw coordinates fed to an MLP", "egnn-raw", "Raw coordinates change under rotation."],
      ["Node indices", "egnn-indices", "Indices are arbitrary."],
      ["Random rotations only", "egnn-random", "Augmentation isn't built-in equivariance."],
    ]),
  short(m(MP, "transfer-beyond-wl", "transfer", 10, 180, "Give two ways to make message passing more expressive than the 1-WL test."),
    [
      ["features", "Add structural features such as subgraph counts (e.g. cycles), random node features or positional encodings", 2, true],
      ["architecture", "Use higher-order or subgraph GNNs (e.g. $k$-WL-inspired networks or message passing on node-marked subgraphs)", 2, true],
    ]),
  num(m(MP, "transfer-pairs", "transfer", 10, 90, "A 2-WL-style network keeps a representation for every ordered pair of nodes. How many for a $100$-node graph?"), 10000),
  short(m(MP, "transfer-polynomial", "transfer", 10, 180, "Relate a spectral filter that is a degree-$K$ polynomial of the graph Laplacian to message passing."),
    [
      ["local", "Multiplying by $L^{K}$ only mixes nodes within $K$ hops, so the filter is $K$-localised", 2, true],
      ["equivalence", "It can be computed by $K$ rounds of neighbour aggregation, i.e. $K$ message passing steps (as in ChebNet; GCN is the $K = 1$ case)", 2, true],
    ]),
];

// ---------------------------------------------------------------------------
// gnn-pitfalls
// ---------------------------------------------------------------------------
const GP = "gnn-pitfalls";
const pitfalls: Item[] = [
  mcq(m(GP, "recall-leakage", "recall", 1, 15, "Which is a common evaluation pitfall in GNN papers?"),
    "Tuning on a single fixed split and reporting the best run, which overstates gains",
    [
      ["Using too many random seeds", "leakage-seeds", "More seeds give fairer estimates."],
      ["Reporting standard deviations", "leakage-sd", "That's good practice."],
      ["Comparing against simple baselines", "leakage-baselines", "That's also good practice."],
    ]),
  mcq(m(GP, "recall-homophily", "recall", 1, 15, "A graph is homophilous when:"),
    "Connected nodes tend to share labels or features",
    [
      ["Connected nodes tend to differ", "homophily-differ", "That's heterophily."],
      ["Every node has the same degree", "homophily-degree", "That's regularity."],
      ["The graph has no cycles", "homophily-tree", "That's a forest."],
    ]),
  num(m(GP, "apply-homophily", "apply", 2, 20, "Of $160$ edges, $120$ join same-label nodes. What is the edge homophily ratio?"), 0.75),
  num(m(GP, "apply-tree-hops", "apply", 2, 20, "In a tree where every node has $2$ children, how many nodes are exactly $3$ hops below the root?"), 8),
  num(m(GP, "apply-mean-accuracy", "apply", 3, 25, "Three random splits give accuracies $80$, $84$ and $82$. What is the mean?"), 82),
  num(m(GP, "apply-explosion", "apply", 3, 25, "With average degree $10$ and no sampling, about how many nodes sit $2$ hops from a node (assuming no overlaps)?"), 100),
  num(m(GP, "apply-smoothing", "apply", 4, 30, "A non-leading eigencomponent has eigenvalue $0.8$. What fraction remains after $5$ propagation steps? Give $4$ decimal places."), 0.3277),
  num(m(GP, "apply-node-homophily", "apply", 4, 30, "A node has $12$ neighbours, $3$ of which share its label. What is its node homophily?"), 0.25),
  mcq(m(GP, "apply-splits", "apply", 5, 40, "Why report results over many random splits rather than one public split?"),
    "Accuracy can vary by several points between splits, so one split can't separate real gains from luck",
    [
      ["Public splits are illegal to use", "splits-illegal", "They're fine, just insufficient."],
      ["Random splits always give higher accuracy", "splits-higher", "The point is variance, not level."],
      ["It reduces training time", "splits-time", "It costs more time."],
    ]),
  short(m(GP, "explain-mlp-baseline", "explain", 5, 90, "Why should every node-classification paper include an MLP baseline on node features?"),
    [
      ["graph-value", "It shows how much the graph structure actually adds beyond the features", 2, true],
      ["surprise", "On heterophilous or noisy graphs, the MLP sometimes matches or beats the GNN", 2, true],
    ]),
  num(m(GP, "apply-sd", "apply", 6, 45, "Accuracies over three splits are $80$, $82$ and $84$. What is their sample standard deviation?"), 2),
  num(m(GP, "transfer-fanout", "transfer", 7, 60, "A $2$-layer GraphSAGE samples $25$ then $10$ neighbours. At most how many nodes (target, hop-$1$ and hop-$2$) are computed for one target?"), 276),
  short(m(GP, "transfer-link-leakage", "transfer", 7, 120, "In link prediction, why must test edges be removed from the graph used for message passing?"),
    [
      ["leak", "Otherwise the model sees the very edges it must predict through message passing, inflating scores", 2, true],
      ["fix", "Split edges into message-passing, supervision and held-out sets, and only pass messages over training edges", 2, true],
    ]),
  num(m(GP, "transfer-virtual", "transfer", 8, 60, "After adding a virtual node joined to every node, what is the largest possible shortest-path distance between two original nodes?"), 2),
  short(m(GP, "transfer-heterophily-fix", "transfer", 8, 120, "Describe two architectural changes that help GNNs on heterophilous graphs."),
    [
      ["ego", "Keep the node's own embedding separate from its neighbours' aggregate (don't mix them), as in H2GCN/GraphSAGE-style concatenation", 2, true],
      ["higher-order", "Use higher-order neighbourhoods or signed/learned edge weights so dissimilar neighbours aren't simply averaged in", 2, true],
    ]),
  num(m(GP, "transfer-label-rate", "transfer", 9, 75, "A benchmark labels $20$ nodes for each of $7$ classes in a $2{,}708$-node graph. What fraction is labelled? Give $4$ decimal places."), 0.0517),
  mcq(m(GP, "transfer-temporal", "transfer", 9, 75, "On a graph of transactions over time, randomly splitting edges into train and test causes:"),
    "Temporal leakage — the model trains on future interactions to predict past ones",
    [
      ["No problem at all", "temporal-none", "Time order matters."],
      ["Over-smoothing", "temporal-smoothing", "That's a depth issue."],
      ["Lower memory use", "temporal-memory", "Unrelated."],
    ]),
  short(m(GP, "transfer-inductive-protocol", "transfer", 10, 180, "A GNN will be deployed on new graphs never seen in training. How should it be evaluated?"),
    [
      ["inductive", "Use an inductive protocol: train on some graphs and test on entirely held-out graphs (or held-out nodes whose features weren't used in training)", 2, true],
      ["distribution", "Make test graphs reflect deployment conditions (size, density, time period), since transductive scores overstate performance", 2, true],
    ]),
  num(m(GP, "transfer-ternary", "transfer", 10, 90, "In a tree where each node has $3$ children, how many nodes lie within $3$ hops of the root, including the root?"), 40),
  short(m(GP, "transfer-precompute", "transfer", 10, 180, "Simplified models like SGC precompute $\\hat{A}^{K}X$ and then train a linear classifier. When is this a good idea?"),
    [
      ["when", "On large homophilous graphs where most benefit comes from smoothing features, and speed matters", 2, true],
      ["why", "Precomputation removes message passing from training, making it as cheap as logistic regression, at the cost of non-linear neighbour processing", 2, true],
    ]),
];

// ---------------------------------------------------------------------------
// generative-adversarial-networks
// ---------------------------------------------------------------------------
const GA = "generative-adversarial-networks";
const gans: Item[] = [
  mcq(m(GA, "recall-generator-input", "recall", 1, 15, "A GAN's generator takes as input:"),
    "A random noise vector",
    [
      ["Real training images", "generator-real", "It never sees real data directly."],
      ["Class probabilities from the discriminator", "generator-probabilities", "It gets gradients, not inputs, from D."],
      ["Nothing", "generator-nothing", "It needs noise to vary its outputs."],
    ]),
  mcq(m(GA, "recall-discriminator", "recall", 1, 15, "A GAN's discriminator outputs:"),
    "The probability that its input is real rather than generated",
    [
      ["A generated image", "discriminator-image", "That's the generator."],
      ["A noise vector", "discriminator-noise", "It classifies inputs."],
      ["A class label among $1{,}000$", "discriminator-class", "It distinguishes real from fake."],
    ]),
  mcq(m(GA, "recall-goodfellow", "recall", 1, 15, "GANs were introduced by:"),
    "Goodfellow et al. ($2014$)",
    [
      ["Kingma and Welling ($2013$)", "goodfellow-vae", "That's the VAE."],
      ["Ho et al. ($2020$)", "goodfellow-ddpm", "That's DDPM."],
      ["LeCun et al. ($1998$)", "goodfellow-lenet", "That's LeNet."],
    ]),
  mcq(m(GA, "recall-mode-collapse", "recall", 1, 15, "Mode collapse is when:"),
    "The generator produces only a few kinds of output, ignoring much of the data's variety",
    [
      ["The discriminator stops training", "collapse-discriminator", "It's about the generator's diversity."],
      ["The generator outputs pure noise", "collapse-noise", "Collapsed outputs can look realistic."],
      ["The loss becomes zero", "collapse-zero", "It's a diversity failure."],
    ]),
  num(m(GA, "apply-optimal-d", "apply", 2, 20, "The optimal discriminator is $D^{*}(x) = \\frac{p_{\\text{data}}(x)}{p_{\\text{data}}(x) + p_g(x)}$. What is it when $p_{\\text{data}} = 0.6$ and $p_g = 0.2$?"), 0.75),
  num(m(GA, "apply-equal", "apply", 2, 20, "What is $D^{*}(x)$ when $p_{\\text{data}}(x) = p_g(x)$?"), 0.5),
  num(m(GA, "apply-d-loss", "apply", 2, 20, "The discriminator outputs $0.8$ on a real image. What is its cross-entropy loss $-\\ln D$ on that image? Give $4$ decimal places."), 0.2231),
  num(m(GA, "apply-ns-loss", "apply", 3, 25, "The non-saturating generator loss is $-\\ln D(G(z))$. What is it when $D(G(z)) = 0.1$? Give $4$ decimal places."), 2.3026),
  num(m(GA, "apply-saturating", "apply", 3, 25, "The original (saturating) generator minimises $\\ln(1 - D(G(z)))$. What is it when $D(G(z)) = 0.1$? Give $4$ decimal places."), -0.1054),
  num(m(GA, "apply-logit", "apply", 3, 25, "The discriminator outputs a logit of $0$. What probability of “real” is that?"), 0.5),
  num(m(GA, "apply-noise-count", "apply", 3, 25, "A batch of $64$ samples uses $100$-dimensional noise. How many random numbers are drawn?"), 6400),
  num(m(GA, "apply-global-min", "apply", 4, 30, "At the global optimum ($p_g = p_{\\text{data}}$), the GAN value function equals $-\\ln 4$. What is that? Give $4$ decimal places."), -1.3863),
  num(m(GA, "apply-wgan", "apply", 4, 30, "A WGAN critic averages $2.5$ on real samples and $0.5$ on generated ones. What is its estimate of the Wasserstein distance (real minus fake)?"), 2),
  short(m(GA, "transfer-gradient-penalty", "transfer", 9, 150, "What does WGAN-GP's gradient penalty enforce, and why is it better than weight clipping?"),
    [
      ["enforce", "It pushes the critic's gradient norm toward $1$ on points between real and fake samples, enforcing the $1$-Lipschitz constraint softly", 2, true],
      ["better", "Weight clipping limits capacity and causes vanishing or exploding gradients; the penalty keeps the critic expressive and training stable", 2, true],
    ]),
  short(m(GA, "transfer-fid", "transfer", 9, 150, "How does FID evaluate a GAN, and what are its limitations?"),
    [
      ["how", "It fits Gaussians to Inception features of real and generated images and measures the Fréchet distance between them", 2, true],
      ["limits", "It depends on the feature network and sample size, mixes quality with diversity in one number, and can disagree with human judgement", 2, true],
    ]),
  mcq(m(GA, "transfer-stylegan", "transfer", 9, 75, "StyleGAN's mapping network:"),
    "Transforms the input noise into an intermediate latent that controls styles at each layer, giving a more disentangled space",
    [
      ["Classifies generated images", "stylegan-classifies", "That's the discriminator."],
      ["Maps images to labels", "stylegan-labels", "It maps noise to style codes."],
      ["Removes the need for a discriminator", "stylegan-no-d", "StyleGAN still trains adversarially."],
    ]),
  num(m(GA, "transfer-ttur", "transfer", 9, 75, "Under the two-time-scale update rule, the discriminator uses learning rate $4 \\times 10^{-4}$ and the generator $10^{-4}$. What is the ratio?"), 4),
  short(m(GA, "transfer-diffusion-shift", "transfer", 10, 180, "Why did diffusion models largely overtake GANs for image generation, and where do GANs remain useful?"),
    [
      ["why", "Diffusion training is stable, covers modes well and scales predictably, while GANs suffer instability and mode collapse", 2, true],
      ["remain", "GANs sample in one step, so they're still used for real-time generation, super-resolution, and as adversarial losses (e.g. in VQGAN or diffusion distillation)", 2, true],
    ]),
  mcq(m(GA, "transfer-spectral-norm", "transfer", 10, 90, "Spectral normalisation stabilises GAN training by:"),
    "Dividing each discriminator weight matrix by its largest singular value, bounding the discriminator's Lipschitz constant",
    [
      ["Normalising images to unit variance", "spectral-images", "It acts on weights."],
      ["Removing the generator's batch norm", "spectral-batchnorm", "It constrains the discriminator."],
      ["Using the Fourier transform of images", "spectral-fourier", "“Spectral” refers to singular values."],
    ]),
  short(m(GA, "transfer-adversarial-loss", "transfer", 10, 180, "Why do image autoencoders like VQGAN add an adversarial loss to their reconstruction loss?"),
    [
      ["blur", "Pixel-wise losses (L1/L2) average over plausible details, giving blurry reconstructions", 2, true],
      ["sharp", "A discriminator penalises unrealistic textures, pushing reconstructions to be sharp and natural-looking", 2, true],
    ]),
];

// ---------------------------------------------------------------------------
// normalizing-flows
// ---------------------------------------------------------------------------
const NF = "normalizing-flows";
const flows: Item[] = [
  mcq(m(NF, "recall-invertible", "recall", 1, 15, "Every transformation in a normalising flow must be:"),
    "Invertible (and differentiable)",
    [
      ["Linear", "invertible-linear", "Non-linear invertible maps are allowed."],
      ["Dimension-reducing", "invertible-reducing", "That breaks invertibility."],
      ["Random", "invertible-random", "They're deterministic."],
    ]),
  mcq(m(NF, "recall-likelihood", "recall", 1, 15, "What can a normalising flow compute exactly that a GAN cannot?"),
    "The likelihood of a data point",
    [
      ["Samples", "likelihood-samples", "GANs sample too."],
      ["Gradients", "likelihood-gradients", "Both use gradients."],
      ["Labels", "likelihood-labels", "Neither is a classifier."],
    ]),
  num(m(NF, "apply-log-det-scale", "apply", 2, 20, "A 1-D flow $x = 3z$. What is $\\ln\\left|\\frac{dx}{dz}\\right|$? Give $4$ decimal places."), 1.0986),
  num(m(NF, "apply-inverse", "apply", 2, 20, "The flow $x = 2z - 4$. What $z$ gives $x = 6$?"), 5),
  num(m(NF, "apply-triangular", "apply", 3, 25, "A triangular Jacobian has diagonal $(3, 0.5, 2)$. What is $|\\det J|$?"), 3),
  num(m(NF, "apply-uniform", "apply", 3, 25, "$z \\sim \\operatorname{Uniform}(0, 1)$ and $x = 2z$. What is the density of $x$ on $(0, 2)$?"), 0.5),
  num(m(NF, "apply-log-density", "apply", 4, 30, "$\\ln p_Z(z) = -2$ and $\\ln\\left|\\det\\frac{\\partial f^{-1}}{\\partial x}\\right| = -0.5$. What is $\\ln p_X(x)$?"), -2.5),
  num(m(NF, "apply-compose", "apply", 4, 30, "Two 1-D layers scale by $2$ and then by $5$. What is the total log-determinant? Give $4$ decimal places."), 2.3026),
  mcq(m(NF, "apply-coupling", "apply", 5, 40, "Why is an affine coupling layer's Jacobian determinant cheap?"),
    "Its Jacobian is triangular, so the determinant is the product of the diagonal (the scales)",
    [
      ["Its Jacobian is the identity", "coupling-identity", "Half the dimensions are scaled."],
      ["It has no parameters", "coupling-no-params", "Its scale and shift come from networks."],
      ["It reduces dimension", "coupling-reduces", "It preserves dimension."],
    ]),
  short(m(NF, "explain-iaf", "explain", 5, 90, "Why does an inverse autoregressive flow sample quickly but evaluate densities slowly?"),
    [
      ["sample", "Sampling computes each output from the already-known noise variables, so all dimensions are produced in parallel", 2, true],
      ["density", "Inverting it for a given data point needs one dimension at a time, which is sequential (MAF is the reverse)", 2, true],
    ]),
  num(m(NF, "apply-bits-per-dim", "apply", 6, 45, "A flow gives $-\\ln p(\\mathbf{x}) = 2{,}000$ nats for a $1{,}000$-dimensional input. What is that in bits per dimension? Give $4$ decimal places."), 2.8854),
  num(m(NF, "transfer-coupling-logdet", "transfer", 7, 60, "An affine coupling layer's scale outputs are $s = (0.5, -0.2, 0.1)$ (scaling by $e^{s}$). What is its log-determinant?"), 0.4),
  num(m(NF, "transfer-density", "transfer", 7, 60, "$z \\sim \\mathcal{N}(0, 1)$ and $x = 2z + 1$. What is $p_X(1)$? Give $4$ decimal places."), 0.1995),
  num(m(NF, "transfer-invconv", "transfer", 8, 60, "Glow's $1 \\times 1$ invertible convolution adds $h \\cdot w \\cdot \\ln|\\det W|$ to the log-determinant. With a $32 \\times 32$ map and $\\ln|\\det W| = 0.01$, what is it?"), 10.24),
  mcq(m(NF, "transfer-flow-matching", "transfer", 8, 60, "Flow matching trains a continuous-time flow by:"),
    "Regressing a velocity field onto known target velocities along chosen paths between noise and data",
    [
      ["Maximum likelihood with an ODE solver in every step", "flow-matching-mle", "It avoids simulating the ODE in training."],
      ["An adversarial discriminator", "flow-matching-gan", "It's a regression objective."],
      ["Counting coupling layers", "flow-matching-coupling", "It uses a free-form network."],
    ]),
  num(m(NF, "transfer-actnorm", "transfer", 9, 75, "ActNorm initialises its scale so the first batch has unit variance. If a channel's standard deviation is $4$, what is the initial scale?"), 0.25),
  short(m(NF, "transfer-hutchinson", "transfer", 9, 150, "Continuous normalising flows need the trace of a Jacobian. How is it estimated cheaply?"),
    [
      ["estimator", "Hutchinson's estimator: $\\operatorname{tr}(J) = \\mathbb{E}[\\mathbf{v}^{\\top}J\\mathbf{v}]$ for random $\\mathbf{v}$ with identity covariance", 2, true],
      ["cheap", "Each $\\mathbf{v}^{\\top}J$ is one vector–Jacobian product, so the cost is like one backward pass instead of $d$", 2, true],
    ]),
  num(m(NF, "transfer-det-cost", "transfer", 10, 90, "For $d = 1{,}000$, a general determinant costs about $d^{3}$ and a triangular one about $d$. What is the ratio?"), 1000000),
  short(m(NF, "transfer-vi", "transfer", 10, 180, "How are normalising flows used in variational inference?"),
    [
      ["posterior", "They transform a simple Gaussian posterior into a more flexible one, so the approximate posterior can fit complex shapes", 2, true],
      ["tractable", "Because log-determinants are tractable, the ELBO can still be computed and optimised", 2, true],
    ]),
  mcq(m(NF, "transfer-rectified", "transfer", 10, 90, "Rectified flow tries to make generation faster by:"),
    "Straightening the paths between noise and data, so few integration steps suffice",
    [
      ["Adding more coupling layers", "rectified-layers", "It changes the paths, not the layer count."],
      ["Using a discriminator", "rectified-discriminator", "It's a flow-matching method."],
      ["Lowering the image resolution", "rectified-resolution", "Resolution isn't the mechanism."],
    ]),
];

// ---------------------------------------------------------------------------
// score-matching
// ---------------------------------------------------------------------------
const SM = "score-matching";
const scoreMatching: Item[] = [
  mcq(m(SM, "recall-direction", "recall", 1, 15, "The score $\\nabla_{\\mathbf{x}}\\ln p(\\mathbf{x})$ points:"),
    "In the direction in which the log-density increases fastest",
    [
      ["Toward lower density", "direction-lower", "It points uphill."],
      ["Toward the origin always", "direction-origin", "Only for zero-mean Gaussians."],
      ["In a random direction", "direction-random", "It's deterministic."],
    ]),
  mcq(m(SM, "recall-normaliser", "recall", 1, 15, "Why doesn't the score depend on a density's normalising constant $Z$?"),
    "$\\ln Z$ is a constant, so its gradient with respect to $\\mathbf{x}$ is zero",
    [
      ["Because $Z = 1$ always", "normaliser-one", "$Z$ can be anything."],
      ["Because the score ignores the density", "normaliser-ignores", "It's the gradient of the log-density."],
      ["Because $Z$ depends on $\\mathbf{x}$", "normaliser-depends", "$Z$ doesn't depend on $\\mathbf{x}$."],
    ]),
  num(m(SM, "apply-gaussian", "apply", 2, 20, "The score of $\\mathcal{N}(0, 1)$ is $-x$. What is it at $x = -1.5$?"), 1.5),
  num(m(SM, "apply-gaussian-shifted", "apply", 2, 20, "The score of $\\mathcal{N}(\\mu, \\sigma^{2})$ is $-\\frac{x - \\mu}{\\sigma^{2}}$. What is it at $x = 0$ for $\\mu = 2$ and $\\sigma^{2} = 4$?"), 0.5),
  num(m(SM, "apply-laplace", "apply", 3, 25, "The Laplace density $\\frac{1}{2}e^{-|x|}$ has score $-\\operatorname{sign}(x)$. What is it at $x = -3$?"), 1),
  num(m(SM, "apply-langevin-drift", "apply", 3, 25, "A Langevin step's drift is $x + \\frac{\\epsilon}{2}s(x)$. With $x = 2$, $\\epsilon = 0.1$ and $s(x) = -x$, what is it (before adding noise)?"), 1.9),
  num(m(SM, "apply-quartic", "apply", 4, 30, "For $p(x) \\propto e^{-x^{2}/2 - x^{4}/4}$, the score is $-x - x^{3}$. What is it at $x = 1$?"), -2),
  num(m(SM, "apply-narrow", "apply", 4, 30, "What is the score of $\\mathcal{N}(0, 0.25)$ at $x = 1$?"), -4),
  mcq(m(SM, "apply-fisher", "apply", 5, 40, "Score matching minimises which divergence between the model and data?"),
    "The Fisher divergence — the expected squared difference of their scores",
    [
      ["The KL divergence", "fisher-kl", "That's maximum likelihood."],
      ["The Wasserstein distance", "fisher-wasserstein", "That's WGANs."],
      ["The total variation distance", "fisher-tv", "It compares scores, not probabilities."],
    ]),
  short(m(SM, "explain-no-z", "explain", 5, 90, "Why is score matching attractive for training unnormalised models such as energy-based models?"),
    [
      ["z", "Maximum likelihood needs $\\ln Z_\\theta$ and its gradient, which are intractable for most energy-based models", 2, true],
      ["score", "The model's score $-\\nabla E_\\theta(\\mathbf{x})$ doesn't involve $Z_\\theta$, so score matching can be trained directly", 2, true],
    ]),
  num(m(SM, "apply-precision", "apply", 6, 45, "For $p(x) \\propto e^{-\\theta x^{2}/2}$, score matching gives $\\hat{\\theta} = \\frac{1}{\\overline{x^{2}}}$. If the mean of $x^{2}$ is $0.5$, what is $\\hat{\\theta}$?"), 2),
  num(m(SM, "transfer-mixture-centre", "transfer", 7, 60, "What is the score of an equal mixture of $\\mathcal{N}(-1, 1)$ and $\\mathcal{N}(1, 1)$ at $x = 0$?"), 0),
  num(m(SM, "transfer-exponential", "transfer", 7, 60, "For the exponential density $3e^{-3x}$ on $x > 0$, what is the score?"), -3),
  num(m(SM, "transfer-hutchinson", "transfer", 8, 60, "Sliced score matching estimates $\\operatorname{tr}(J)$ by $\\mathbf{v}^{\\top}J\\mathbf{v}$. With $J = \\begin{bmatrix} 2 & 1 \\\\ 0 & 3 \\end{bmatrix}$ and $\\mathbf{v} = [1, -1]$, what is the estimate?"), 4),
  short(m(SM, "transfer-mixing", "transfer", 8, 120, "Why does Langevin dynamics mix slowly between well-separated modes, even with the exact score?"),
    [
      ["barrier", "Between modes the density is tiny, so the score pulls samples back toward their current mode", 2, true],
      ["slow", "Crossing requires a rare run of noise steps against the score, so transitions take exponentially long; annealing with noise helps", 2, true],
    ]),
  num(m(SM, "transfer-score-norm", "transfer", 9, 75, "For $\\mathcal{N}(\\mathbf{0}, I)$, the score at $\\mathbf{x}$ is $-\\mathbf{x}$. What is its squared norm at $\\mathbf{x} = [1, 2, -1]$?"), 6),
  mcq(m(SM, "transfer-ebm", "transfer", 9, 75, "For an energy-based model $p_\\theta(\\mathbf{x}) \\propto e^{-E_\\theta(\\mathbf{x})}$, the score is:"),
    "$-\\nabla_{\\mathbf{x}}E_\\theta(\\mathbf{x})$",
    [
      ["$E_\\theta(\\mathbf{x})$", "ebm-energy", "It's the gradient, with a minus sign."],
      ["$\\nabla_\\theta E_\\theta(\\mathbf{x})$", "ebm-theta", "The score is with respect to $\\mathbf{x}$."],
      ["$Z_\\theta$", "ebm-z", "The normaliser drops out."],
    ]),
  short(m(SM, "transfer-ebm-training", "transfer", 10, 180, "Compare training an energy-based model by maximum likelihood with training it by score matching."),
    [
      ["mle", "Maximum likelihood needs samples from the model (e.g. MCMC) to estimate the gradient of $\\ln Z$, which is slow and can be biased", 2, true],
      ["sm", "Score matching avoids sampling and $Z$ entirely, but needs second derivatives (or slicing/denoising tricks) and is blind to relative mode weights", 2, true],
    ]),
  num(m(SM, "transfer-location", "transfer", 10, 90, "Fitting a Gaussian location model $s(x) = -(x - \\mu)$ by score matching gives the sample mean. What is $\\hat{\\mu}$ for data $1$, $2$ and $6$?"), 3),
  short(m(SM, "transfer-diffusion-link", "transfer", 10, 180, "How does score matching underpin modern diffusion models?"),
    [
      ["noisy-scores", "Diffusion models learn the score of the data distribution at every noise level, via denoising score matching", 2, true],
      ["sample", "Generation integrates the reverse-time SDE or probability-flow ODE using those learned scores, moving from noise to data", 2, true],
    ]),
];

// ---------------------------------------------------------------------------
// denoising-score-matching
// ---------------------------------------------------------------------------
const DS = "denoising-score-matching";
const dsm: Item[] = [
  mcq(m(DS, "recall-conditional", "recall", 1, 15, "A noise-conditional score network is given:"),
    "A noisy input and its noise level",
    [
      ["Only the clean input", "conditional-clean", "It never sees clean inputs at test time."],
      ["A class label only", "conditional-label", "It needs the noisy input and level."],
      ["The training loss", "conditional-loss", "Unrelated."],
    ]),
  mcq(m(DS, "recall-target", "recall", 1, 15, "For $\\tilde{\\mathbf{x}} = \\mathbf{x} + \\sigma\\boldsymbol{\\epsilon}$, the DSM regression target for the score is:"),
    "$-\\frac{\\tilde{\\mathbf{x}} - \\mathbf{x}}{\\sigma^{2}}$",
    [
      ["$\\tilde{\\mathbf{x}} - \\mathbf{x}$", "target-difference", "It's scaled by $-\\frac{1}{\\sigma^{2}}$."],
      ["$\\mathbf{x}$", "target-clean", "The target is a score, not the clean data."],
      ["$\\sigma$", "target-sigma", "It depends on the noise drawn."],
    ]),
  num(m(DS, "apply-target", "apply", 2, 20, "Clean $x = 0$, noisy $\\tilde{x} = 0.3$ and $\\sigma = 0.1$. What is the target $-\\frac{\\tilde{x} - x}{\\sigma^{2}}$?"), -30),
  num(m(DS, "apply-epsilon", "apply", 2, 20, "Clean $x = 2$, noisy $\\tilde{x} = 2.5$ and $\\sigma = 0.25$. What was $\\epsilon = \\frac{\\tilde{x} - x}{\\sigma}$?"), 2),
  num(m(DS, "apply-tweedie", "apply", 3, 25, "Tweedie's formula: $\\mathbb{E}[x \\mid \\tilde{x}] = \\tilde{x} + \\sigma^{2}s(\\tilde{x})$. With $\\tilde{x} = 1$, $\\sigma^{2} = 0.25$ and score $-2$, what is it?"), 0.5),
  num(m(DS, "apply-geometric", "apply", 3, 25, "Noise levels start at $\\sigma_1 = 10$ and halve each time. What is $\\sigma_4$?"), 1.25),
  num(m(DS, "apply-weight", "apply", 4, 30, "Each level's loss is weighted by $\\lambda(\\sigma) = \\sigma^{2}$. What is the weight for $\\sigma = 0.1$?"), 0.01),
  num(m(DS, "apply-snr", "apply", 4, 30, "In a variance-preserving diffusion, $\\text{SNR} = \\frac{\\bar{\\alpha}}{1 - \\bar{\\alpha}}$. What is it for $\\bar{\\alpha} = 0.8$?"), 4),
  mcq(m(DS, "apply-equivalence", "apply", 5, 40, "Denoising score matching is equivalent (up to a constant) to explicit score matching on:"),
    "The noise-perturbed data distribution",
    [
      ["The clean data distribution", "equivalence-clean", "It matches the score of the noisy distribution."],
      ["A uniform distribution", "equivalence-uniform", "It's the smoothed data distribution."],
      ["The model's own samples", "equivalence-samples", "It uses noisy training data."],
    ]),
  short(m(DS, "explain-noise-tradeoff", "explain", 5, 90, "Why does a single noise level give a poor trade-off, motivating many levels?"),
    [
      ["small", "Small noise gives an accurate score near the data but leaves low-density regions untrained", 2, true],
      ["large", "Large noise covers the space and links modes but blurs the distribution; many levels get both", 2, true],
    ]),
  num(m(DS, "apply-x0-estimate", "apply", 6, 45, "From $x_t = \\sqrt{\\bar{\\alpha}}x_0 + \\sqrt{1 - \\bar{\\alpha}}\\epsilon$, estimate $\\hat{x}_0 = \\frac{x_t - \\sqrt{1 - \\bar{\\alpha}}\\hat{\\epsilon}}{\\sqrt{\\bar{\\alpha}}}$ with $\\bar{\\alpha} = 0.25$, $x_t = 1$ and $\\hat{\\epsilon} = 0.5$. Give $4$ decimal places."), 1.134),
  num(m(DS, "transfer-score-from-eps", "transfer", 7, 60, "With noise prediction, the score estimate is $-\\frac{\\hat{\\epsilon}}{\\sigma}$. What is it for $\\hat{\\epsilon} = 0.6$ and $\\sigma = 0.3$?"), -2),
  short(m(DS, "transfer-memorisation", "transfer", 7, 120, "What would a DSM model learn if it minimised its loss perfectly on a small training set, and why don't real models do this?"),
    [
      ["memorise", "The optimal score for the empirical distribution points to the training examples, so sampling would reproduce them", 2, true],
      ["practice", "Limited capacity, architectural biases and finite training make real networks generalise instead; memorisation appears mainly with tiny or duplicated data", 2, true],
    ]),
  num(m(DS, "transfer-gaussian-posterior", "transfer", 8, 60, "Data $x \\sim \\mathcal{N}(0, 1)$, noise $\\tilde{x} = x + \\epsilon$ with $\\epsilon \\sim \\mathcal{N}(0, 1)$. Then $\\mathbb{E}[x \\mid \\tilde{x}] = \\frac{\\tilde{x}}{2}$. What is it for $\\tilde{x} = 3$?"), 1.5),
  mcq(m(DS, "transfer-edm", "transfer", 8, 60, "EDM's preconditioning of the denoiser mainly aims to:"),
    "Keep the network's inputs and training targets at unit scale across all noise levels",
    [
      ["Remove the noise-level input", "edm-remove", "The network is still conditioned on $\\sigma$."],
      ["Use a GAN loss", "edm-gan", "It's still a denoising loss."],
      ["Fix one noise level", "edm-fixed", "It spans many levels."],
    ]),
  num(m(DS, "transfer-ratio", "transfer", 9, 75, "Ten geometric noise levels run from $50$ down to $0.01$. What is the ratio between consecutive levels? Give $4$ decimal places."), 0.3882),
  short(m(DS, "transfer-v-prediction", "transfer", 9, 150, "What is $v$-prediction, and why is it sometimes preferred to predicting $\\epsilon$?"),
    [
      ["what", "The network predicts $v = \\sqrt{\\bar{\\alpha}}\\epsilon - \\sqrt{1 - \\bar{\\alpha}}x_0$, a mix of noise and signal", 2, true],
      ["why", "Its targets stay well-scaled at very high and very low noise, where $\\epsilon$-prediction gives poor estimates of $x_0$, improving stability", 2, true],
    ]),
  short(m(DS, "transfer-irreducible", "transfer", 10, 180, "Why can the DSM loss never reach zero, even for a perfect model?"),
    [
      ["target", "The target depends on the particular clean $\\mathbf{x}$, but many clean points could have produced the same noisy input", 2, true],
      ["variance", "The best prediction is the posterior mean; the remaining posterior variance is an irreducible floor in the loss", 2, true],
    ]),
  num(m(DS, "transfer-posterior-variance", "transfer", 10, 90, "In the same setup ($x \\sim \\mathcal{N}(0, 1)$, unit noise), what is $\\text{Var}(x \\mid \\tilde{x})$?"), 0.5),
  short(m(DS, "transfer-guidance", "transfer", 10, 180, "How can classifier-free guidance be read as combining scores?"),
    [
      ["combine", "The guided score is $s_{\\text{uncond}} + w(s_{\\text{cond}} - s_{\\text{uncond}})$, an extrapolation along the direction the condition adds", 2, true],
      ["meaning", "For $w > 1$ it samples from a sharpened distribution roughly $\\propto p(\\mathbf{x})p(c \\mid \\mathbf{x})^{w}$, trading diversity for fidelity to the condition", 2, true],
    ]),
];

// ---------------------------------------------------------------------------
// diffusion-models
// ---------------------------------------------------------------------------
const DF = "diffusion-models";
const diffusion: Item[] = [
  mcq(m(DF, "recall-forward", "recall", 1, 15, "The forward process of a diffusion model:"),
    "Gradually adds noise to data over many steps",
    [
      ["Removes noise from data", "forward-removes", "That's the reverse process."],
      ["Compresses data into a code", "forward-compress", "It corrupts with noise."],
      ["Classifies the data", "forward-classifies", "It's a noising process."],
    ]),
  mcq(m(DF, "recall-reverse-learned", "recall", 1, 15, "Which part of a diffusion model is learned?"),
    "The reverse (denoising) process",
    [
      ["The forward noising process", "learned-forward", "The forward process is fixed."],
      ["The noise schedule only", "learned-schedule", "The schedule is usually fixed."],
      ["Nothing", "learned-nothing", "The denoiser is trained."],
    ]),
  mcq(m(DF, "recall-endpoint", "recall", 1, 15, "After the full forward process, the data have become approximately:"),
    "Pure Gaussian noise",
    [
      ["A blurred copy of the data", "endpoint-blur", "All structure is destroyed."],
      ["All zeros", "endpoint-zero", "It's random noise."],
      ["The original data", "endpoint-original", "Noise has replaced it."],
    ]),
  mcq(m(DF, "recall-example", "recall", 1, 15, "Which of these is a diffusion model?"),
    "Stable Diffusion",
    [
      ["GPT-2", "example-gpt", "That's an autoregressive language model."],
      ["ResNet-50", "example-resnet", "That's a classifier."],
      ["word2vec", "example-word2vec", "That's an embedding method."],
    ]),
  num(m(DF, "apply-alpha-bar", "apply", 2, 20, "With $\\alpha_t = 0.9$ at every step, what is $\\bar{\\alpha}_2 = \\alpha_1\\alpha_2$?"), 0.81),
  num(m(DF, "apply-signal-coef", "apply", 2, 20, "With $\\bar{\\alpha}_t = 0.81$, what is the signal coefficient $\\sqrt{\\bar{\\alpha}_t}$?"), 0.9),
  num(m(DF, "apply-noise-coef", "apply", 2, 20, "With $\\bar{\\alpha}_t = 0.64$, what is the noise coefficient $\\sqrt{1 - \\bar{\\alpha}_t}$?"), 0.6),
  num(m(DF, "apply-xt", "apply", 3, 25, "$x_t = \\sqrt{\\bar{\\alpha}_t}x_0 + \\sqrt{1 - \\bar{\\alpha}_t}\\epsilon$ with $\\bar{\\alpha}_t = 0.36$, $x_0 = 1$ and $\\epsilon = -1$. What is $x_t$?"), -0.2),
  num(m(DF, "apply-ddim", "apply", 3, 25, "A model trained with $1{,}000$ steps is sampled with $50$ DDIM steps. How many times fewer network evaluations is that?"), 20),
  num(m(DF, "apply-alpha", "apply", 3, 25, "A constant $\\beta_t = 0.01$. What is $\\alpha_t = 1 - \\beta_t$?"), 0.99),
  num(m(DF, "apply-latent", "apply", 3, 25, "Latent diffusion encodes a $512 \\times 512 \\times 3$ image as a $64 \\times 64 \\times 4$ latent. By what factor does the number of values shrink?"), 48),
  num(m(DF, "apply-cfg", "apply", 4, 30, "Classifier-free guidance uses $\\hat{\\epsilon} = \\epsilon_u + w(\\epsilon_c - \\epsilon_u)$. With $\\epsilon_u = 0.2$, $\\epsilon_c = 0.5$ and $w = 3$, what is $\\hat{\\epsilon}$?"), 1.1),
  num(m(DF, "apply-snr", "apply", 4, 30, "What is the signal-to-noise ratio $\\frac{\\bar{\\alpha}}{1 - \\bar{\\alpha}}$ at $\\bar{\\alpha} = 0.5$?"), 1),
  short(m(DF, "transfer-ddim", "transfer", 9, 150, "How does DDIM sample faster than the original DDPM sampler without retraining?"),
    [
      ["deterministic", "It defines a non-Markovian (often deterministic) reverse process with the same marginals, so the same trained network applies", 2, true],
      ["skip", "That process can take large jumps over a subsequence of timesteps, cutting the number of steps from $1{,}000$ to tens", 2, true],
    ]),
  short(m(DF, "transfer-cosine", "transfer", 9, 150, "Why did the cosine noise schedule improve on the original linear schedule?"),
    [
      ["linear", "The linear schedule destroys information too quickly, so many late steps are nearly pure noise and add little", 2, true],
      ["cosine", "The cosine schedule adds noise more evenly in signal-to-noise terms, giving more useful steps and better results, especially at low resolution", 2, true],
    ]),
  mcq(m(DF, "transfer-distillation", "transfer", 9, 75, "Progressive or consistency distillation of a diffusion model aims to:"),
    "Train a student that generates good samples in just a few (or one) network evaluations",
    [
      ["Increase the number of sampling steps", "distillation-more", "It reduces them."],
      ["Remove the denoiser", "distillation-remove", "The student is still a denoiser-like network."],
      ["Train a classifier", "distillation-classifier", "It's about fast generation."],
    ]),
  num(m(DF, "transfer-cosine-mid", "transfer", 9, 75, "Ignoring its small offset, the cosine schedule has $\\bar{\\alpha}_t \\approx \\cos^{2}\\left(\\frac{\\pi}{2}\\frac{t}{T}\\right)$. What is $\\bar{\\alpha}$ halfway through ($t = \\frac{T}{2}$)?"), 0.5),
  short(m(DF, "transfer-text", "transfer", 10, 180, "Why are diffusion models less dominant for text than for images?"),
    [
      ["discrete", "Text is discrete, so adding Gaussian noise doesn't apply directly; discrete or embedding-space diffusion is needed and is less mature", 2, true],
      ["ar", "Autoregressive models fit text's sequential structure, give exact likelihoods and scale very well, setting a high bar", 2, true],
    ]),
  mcq(m(DF, "transfer-guidance-scale", "transfer", 10, 90, "Raising the classifier-free guidance scale $w$ well above $1$ typically:"),
    "Makes samples match the prompt more closely but reduces diversity and can oversaturate them",
    [
      ["Increases diversity", "guidance-diversity", "Diversity drops."],
      ["Has no effect", "guidance-none", "It strongly affects samples."],
      ["Speeds up sampling", "guidance-speed", "It doesn't change the step count."],
    ]),
  short(m(DF, "transfer-cond-dropout", "transfer", 10, 180, "Why are conditional diffusion models trained with the condition randomly dropped (e.g. $10\\%$ of the time)?"),
    [
      ["both", "So one network learns both the conditional and unconditional denoisers", 2, true],
      ["guidance", "Classifier-free guidance needs both predictions at sampling time, without training a separate classifier", 2, true],
    ]),
];

// ---------------------------------------------------------------------------
// mixture-of-experts
// ---------------------------------------------------------------------------
const MO = "mixture-of-experts";
const moe: Item[] = [
  mcq(m(MO, "recall-expert", "recall", 1, 15, "In a transformer MoE layer, each expert is usually:"),
    "A feed-forward network",
    [
      ["A whole transformer", "expert-transformer", "Experts replace the FFN sublayer."],
      ["An attention head", "expert-head", "Heads aren't experts."],
      ["A decision tree", "expert-tree", "Experts are neural FFNs."],
    ]),
  mcq(m(MO, "recall-router", "recall", 1, 15, "The router in an MoE layer:"),
    "Scores each token against the experts and sends it to the top-scoring ones",
    [
      ["Trains each expert separately offline", "router-offline", "Everything trains jointly."],
      ["Sends every token to every expert", "router-all", "That would be dense."],
      ["Chooses the learning rate", "router-lr", "Unrelated."],
    ]),
  mcq(m(MO, "recall-sparse", "recall", 1, 15, "“Sparse activation” in an MoE model means:"),
    "Each token uses only a few of the experts",
    [
      ["Most weights are zero", "sparse-zero", "Weights are dense; activation is sparse."],
      ["Few tokens are processed", "sparse-tokens", "All tokens are processed."],
      ["The model has few layers", "sparse-layers", "It's about expert use."],
    ]),
  mcq(m(MO, "recall-switch", "recall", 1, 15, "The Switch Transformer routes each token to:"),
    "One expert (top-$1$ routing)",
    [
      ["Two experts", "switch-two", "Top-$2$ was common before Switch."],
      ["All experts", "switch-all", "That's dense."],
      ["No experts", "switch-none", "Each token gets one."],
    ]),
  num(m(MO, "apply-active", "apply", 2, 20, "A layer has $8$ experts of $10^{9}$ parameters each and routes each token to $2$. How many billion expert parameters are active per token?"), 2),
  num(m(MO, "apply-total", "apply", 2, 20, "Same layer. How many billion expert parameters in total?"), 8),
  num(m(MO, "apply-fraction", "apply", 2, 20, "With top-$2$ routing among $16$ experts, what fraction of experts does each token use?"), 0.125),
  num(m(MO, "apply-capacity", "apply", 3, 25, "Capacity is $\\text{factor} \\times \\frac{\\text{tokens}}{\\text{experts}}$. With factor $1.25$, $1{,}024$ tokens and $8$ experts, what is each expert's capacity?"), 160),
  num(m(MO, "apply-router-softmax", "apply", 3, 25, "A router has two experts with scores $\\ln 3$ and $0$. What probability does the first get?"), 0.75),
  num(m(MO, "apply-renormalise", "apply", 3, 25, "Router probabilities are $0.4$, $0.3$, $0.2$ and $0.1$. Top-$2$ gates are renormalised to sum to $1$. What is the first expert's gate? Give $4$ decimal places."), 0.5714),
  num(m(MO, "apply-dropped", "apply", 3, 25, "An expert with capacity $160$ is sent $200$ tokens. How many are dropped (or overflow)?"), 40),
  num(m(MO, "apply-balance", "apply", 4, 30, "The load-balancing loss is $N\\sum_i f_iP_i$. With $N = 2$, token fractions $f = (0.5, 0.5)$ and mean router probabilities $P = (0.5, 0.5)$, what is it?"), 1),
  num(m(MO, "apply-imbalance", "apply", 4, 30, "Same loss with $f = (0.8, 0.2)$ and $P = (0.7, 0.3)$. What is it?"), 1.24),
  short(m(MO, "transfer-all-to-all", "transfer", 9, 150, "In expert-parallel training, why is all-to-all communication a bottleneck?"),
    [
      ["routing", "Experts live on different devices, so each layer must send every token to its experts' devices and bring results back", 2, true],
      ["cost", "These all-to-all exchanges are large and latency-bound, often dominating step time unless overlapped with compute or kept within fast interconnects", 2, true],
    ]),
  short(m(MO, "transfer-specialisation", "transfer", 9, 150, "What do experts in large language-model MoEs tend to specialise in, and what does that imply?"),
    [
      ["what", "Often surface patterns like token types, syntax or domains (e.g. code, punctuation) rather than clean high-level topics", 2, true],
      ["implication", "So experts aren't neatly interpretable “subject experts”, and removing one can hurt many tasks a little", 2, true],
    ]),
  mcq(m(MO, "transfer-fine-grained", "transfer", 9, 75, "Fine-grained MoE designs (e.g. DeepSeekMoE) split experts into many smaller ones and activate more of them. The aim is:"),
    "More flexible combinations of specialised experts at the same compute",
    [
      ["Fewer total parameters", "fine-grained-fewer", "Total size can stay the same."],
      ["Removing the router", "fine-grained-router", "Routing is still needed."],
      ["Making the model dense", "fine-grained-dense", "It stays sparse."],
    ]),
  num(m(MO, "transfer-memory", "transfer", 9, 75, "An MoE model has $47 \\times 10^{9}$ total parameters stored in fp16 ($2$ bytes each). How many gigabytes ($10^{9}$ bytes) are needed just for the weights?"), 94),
  short(m(MO, "transfer-inference", "transfer", 10, 180, "Why do MoE models often give less inference speed-up than their low active-parameter count suggests?"),
    [
      ["memory", "All experts must still be held in memory, and at small batch sizes decoding is memory-bandwidth-bound, so loading many experts' weights dominates", 2, true],
      ["overhead", "Routing, load imbalance and cross-device communication add overhead that dense models avoid", 2, true],
    ]),
  mcq(m(MO, "transfer-z-loss", "transfer", 10, 90, "The router z-loss penalises large router logits. Its main purpose is:"),
    "Numerical stability of training, by keeping router logits small",
    [
      ["Balancing load across experts", "z-loss-balance", "That's the auxiliary balancing loss."],
      ["Increasing capacity", "z-loss-capacity", "Unrelated."],
      ["Choosing top-$k$", "z-loss-topk", "It regularises logits."],
    ]),
  num(m(MO, "transfer-flops-fraction", "transfer", 10, 90, "Compared with a dense FFN holding as many parameters as all $8$ experts together, what fraction of the FFN compute does top-$2$ routing use?"), 0.25),
];

export const dlSixty04Items: Item[] = [
  ...messagePassing,
  ...pitfalls,
  ...gans,
  ...flows,
  ...scoreMatching,
  ...dsm,
  ...diffusion,
  ...moe,
];
