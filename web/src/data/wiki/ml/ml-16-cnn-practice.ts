import type { WikiArticle } from "../types";

/**
 * Machine Learning cluster 16 — the convolutional chapter's practical lessons.
 *
 * `convolutional-neural-networks` argues for weight sharing and locality; these
 * three articles are the knobs a practitioner actually turns: stride and
 * padding (which set every output shape), pooling (which trades resolution for
 * invariance), and the design conventions — stacked 3×3 kernels, strided
 * downsampling, channel doubling — that most working CNNs share.
 */

const cnnStrideAndPadding: WikiArticle = {
  conceptId: "cnn-stride-and-padding",
  summary:
    "Stride is how far the kernel moves between outputs; padding is what the layer pretends lies beyond the " +
    "border. Together with the kernel size they fix the output shape of every convolution by one formula, and " +
    "they are the first two decisions that decide how quickly a network gives up spatial resolution.",
  sections: [
    {
      heading: "The output-size formula",
      blocks: [
        {
          kind: "formula",
          latex: "n_{\\text{out}} = \\left\\lfloor \\frac{n_{\\text{in}} + 2p - k}{s} \\right\\rfloor + 1",
          caption: "Per spatial dimension: input size $n_{\\text{in}}$, kernel $k$, padding $p$ on each side, stride $s$",
        },
        {
          kind: "prose",
          text: "The numerator counts how far the kernel's leading edge can travel inside the padded input; dividing by $s$ counts the steps; the $+1$ is the starting position. The floor means any leftover border that a stride cannot reach is silently dropped — a $k = 3$, $s = 2$ layer on a width-$32$ input without padding produces $15$ outputs and never looks at the last column.",
        },
      ],
    },
    {
      heading: "Padding modes",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Valid ($p = 0$)", description: "No padding. Each layer shrinks the map by $k - 1$, and border pixels contribute to fewer outputs than central ones." },
            { term: "Same", description: "Pad so that $n_{\\text{out}} = \\lceil n_{\\text{in}}/s \\rceil$. For stride $1$ and odd $k$ this is $p = (k-1)/2$: $p = 1$ for $3 \\times 3$, $p = 2$ for $5 \\times 5$." },
            { term: "Fill values", description: "Zeros are the default; reflect and replicate padding avoid the artificial dark border zeros create, and circular padding suits data that genuinely wraps, like angles or periodic simulations." },
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Zero padding leaks position",
          text: "Because the border is filled with zeros, a filter near the edge sees something no interior filter sees, and a deep network can learn to detect ‘I am near the edge’. That is how CNNs, which are nominally translation-equivariant, end up encoding absolute position — occasionally useful, often a source of artefacts at image borders.",
        },
      ],
    },
    {
      heading: "What stride buys and costs",
      blocks: [
        {
          kind: "list",
          items: [
            "Downsampling: stride $2$ roughly halves each spatial dimension, so the next layer has $4\\times$ fewer positions and does about $4\\times$ less work.",
            "Receptive field: every later layer's kernel now spans twice the input distance, so receptive fields grow faster after each strided layer.",
            "No parameter change: stride and padding never change the number of weights, which is $k^2 C_{\\text{in}} C_{\\text{out}}$ (plus biases) regardless.",
            "Aliasing: skipping positions without first blurring can make outputs change sharply when the input shifts by one pixel — the reason ‘anti-aliased’ CNNs low-pass filter before striding.",
          ],
        },
        {
          kind: "prose",
          text: "Dilation is the third spacing knob: a $k \\times k$ kernel with dilation $d$ samples every $d$-th input and covers an effective width $d(k-1) + 1$. It enlarges the receptive field without striding, so resolution is kept — the standard tool in segmentation networks.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Tracking a shape through two layers",
          problem:
            "A $32 \\times 32$ input passes through a $5 \\times 5$ convolution with $p = 2$, $s = 2$, then a $3 \\times 3$ convolution with $p = 0$, $s = 1$. What is the final spatial size?",
          steps: [
            "Layer 1: $\\lfloor (32 + 4 - 5)/2 \\rfloor + 1 = \\lfloor 15.5 \\rfloor + 1 = 16$.",
            "Layer 2: $\\lfloor (16 + 0 - 3)/1 \\rfloor + 1 = 14$.",
          ],
          answer: "$14 \\times 14$.",
        },
      ],
    },
  ],
  references: [
    { source: "Dumoulin & Visin, A guide to convolution arithmetic for deep learning (2016)", locator: "Ch. 2" },
    { source: "Goodfellow, Bengio & Courville, Deep Learning", locator: "§9.5, Variants of the basic convolution function" },
    { source: "Zhang, Making Convolutional Networks Shift-Invariant Again (ICML 2019)", locator: "§3" },
  ],
};

const cnnPooling: WikiArticle = {
  conceptId: "cnn-pooling",
  summary:
    "A pooling layer summarises each small window of a feature map by one number — its maximum or its average — " +
    "with no learned weights. Pool size and stride decide how much resolution is thrown away and how much " +
    "robustness to small shifts is bought in exchange; global pooling takes the idea to its limit and collapses " +
    "the whole map to a single value per channel.",
  sections: [
    {
      heading: "The operations",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Max pooling", description: "Output the largest activation in each window. Answers ‘did this feature fire anywhere here?’ and keeps sharp, sparse responses." },
            { term: "Average pooling", description: "Output the mean of each window. Smoother, keeps information about how much of the window responded, and is less sensitive to a single noisy activation." },
            { term: "Global average pooling", description: "Average each channel over the entire map, producing a vector of length $C$. Replaces the large fully connected head of older networks and makes the model accept any input size." },
          ],
        },
        {
          kind: "prose",
          text: "Pooling acts on each channel separately and has no parameters. Its output size follows the same formula as a convolution, with the pool size playing the role of $k$: $n_{\\text{out}} = \\lfloor (n_{\\text{in}} + 2p - k)/s \\rfloor + 1$.",
        },
      ],
    },
    {
      heading: "Choosing pool size and stride",
      blocks: [
        {
          kind: "table",
          headers: ["Setting", "Effect", "Where it appears"],
          rows: [
            ["$2 \\times 2$, stride $2$", "halves each dimension, keeps $1/4$ of activations, no overlap", "the default since VGG"],
            ["$3 \\times 3$, stride $2$", "overlapping windows, slightly less aliasing", "AlexNet, ResNet stem"],
            ["large pool, e.g. $4 \\times 4$", "aggressive downsampling, strong invariance, fine detail lost", "rare; hurts localisation"],
            ["global (whole map)", "one number per channel", "classification heads"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Invariance is local and partial",
          text: "Max pooling over a $2 \\times 2$ window makes the output unchanged when the strongest activation moves within that window — robustness to shifts of about one pixel per pooling stage. Stacked stages compound this, but a shift that moves a feature across a window boundary still changes the output. It is local invariance, not global.",
        },
      ],
    },
    {
      heading: "Backpropagation through pooling",
      blocks: [
        {
          kind: "prose",
          text: "For max pooling the gradient flows only to the position that held the maximum; the other entries in the window receive zero. For average pooling the incoming gradient is split equally, $1/k^2$ to each entry. Frameworks record the argmax indices in the forward pass for exactly this purpose.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "$2 \\times 2$ max and average pooling",
          problem:
            "Pool the $4 \\times 4$ map with rows $(1, 3, 2, 0)$, $(4, 2, 1, 5)$, $(0, 1, 3, 2)$, $(2, 6, 1, 1)$ using $2 \\times 2$ windows and stride $2$.",
          steps: [
            "Top-left window $\\{1, 3, 4, 2\\}$: max $4$, mean $2.5$.",
            "Top-right $\\{2, 0, 1, 5\\}$: max $5$, mean $2$.",
            "Bottom-left $\\{0, 1, 2, 6\\}$: max $6$, mean $2.25$.",
            "Bottom-right $\\{3, 2, 1, 1\\}$: max $3$, mean $1.75$.",
          ],
          answer: "Max pooling gives $\\begin{pmatrix} 4 & 5 \\\\ 6 & 3 \\end{pmatrix}$; average pooling gives $\\begin{pmatrix} 2.5 & 2 \\\\ 2.25 & 1.75 \\end{pmatrix}$.",
        },
      ],
    },
    {
      heading: "Is pooling still needed?",
      blocks: [
        {
          kind: "prose",
          text: "The ‘all-convolutional’ result showed a stride-$2$ convolution can replace max pooling with little loss, and many modern designs downsample that way, keeping pooling only as global average pooling at the head. Pooling remains attractive where parameters or compute are tight, and where a fixed, non-learned summary is a useful inductive bias.",
        },
      ],
    },
  ],
  references: [
    { source: "Goodfellow, Bengio & Courville, Deep Learning", locator: "§9.3, Pooling" },
    { source: "Springenberg et al., Striving for Simplicity: The All Convolutional Net (ICLR workshop 2015)", locator: "§3" },
    { source: "Lin, Chen & Yan, Network in Network (ICLR 2014)", locator: "§3.2, Global average pooling" },
  ],
};

const cnnDesignChoices: WikiArticle = {
  conceptId: "cnn-design-choices",
  summary:
    "Most successful CNNs share a handful of conventions: small $3 \\times 3$ kernels stacked rather than large " +
    "ones, a downsampling step every few layers, channels doubled whenever the resolution halves, and a global " +
    "pooling head. Each convention is an answer to a budget question — parameters, compute or receptive field — " +
    "and knowing the arithmetic behind them is what lets you adapt an architecture instead of copying it.",
  sections: [
    {
      heading: "Stack small kernels",
      blocks: [
        {
          kind: "table",
          headers: ["Design", "Receptive field", "Weights (for $C$ in and out channels)", "Non-linearities"],
          rows: [
            ["one $5 \\times 5$", "$5$", "$25C^2$", "$1$"],
            ["two $3 \\times 3$", "$5$", "$18C^2$", "$2$"],
            ["one $7 \\times 7$", "$7$", "$49C^2$", "$1$"],
            ["three $3 \\times 3$", "$7$", "$27C^2$", "$3$"],
          ],
          caption: "The VGG argument: same receptive field, fewer weights, more depth",
        },
      ],
    },
    {
      heading: "Receptive-field arithmetic",
      blocks: [
        {
          kind: "formula",
          latex: "r_\\ell = r_{\\ell-1} + (k_\\ell - 1)\\, j_{\\ell-1}, \\qquad j_\\ell = j_{\\ell-1}\\, s_\\ell, \\qquad r_0 = j_0 = 1",
          caption: "$r$ is the receptive field in input pixels, $j$ the ‘jump’ — the input distance between adjacent outputs",
        },
        {
          kind: "prose",
          text: "Every strided layer multiplies the jump, so kernels after a downsampling step grow the receptive field faster. That is why the receptive field of a real network is dominated by its later, lower-resolution layers — and why removing a stride (to keep resolution for segmentation) must be compensated with dilation or more layers.",
        },
      ],
    },
    {
      heading: "Downsample and widen",
      blocks: [
        {
          kind: "list",
          items: [
            "Halve the resolution every few layers, by a stride-$2$ convolution (learned) or $2 \\times 2$ max pooling (fixed, parameter-free).",
            "Double the channels at the same time. A convolution's cost is proportional to $H \\cdot W \\cdot k^2 C_{\\text{in}} C_{\\text{out}}$; halving $H$ and $W$ while doubling both channel counts keeps the cost per layer roughly constant, so no stage becomes the bottleneck.",
            "The extra channels are where the capacity goes: later layers see larger regions and need more distinct feature detectors to describe them.",
          ],
        },
      ],
    },
    {
      heading: "Cheaper convolutions",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "$1 \\times 1$ bottleneck", description: "Reduce channels, do the $3 \\times 3$ work in the narrow space, expand again — ResNet's bottleneck block." },
            { term: "Depthwise separable", description: "A per-channel $k \\times k$ convolution followed by a $1 \\times 1$ mixing convolution: $k^2 C + C C'$ weights instead of $k^2 C C'$ — about $8$–$9\\times$ fewer for $3 \\times 3$ kernels with many channels (MobileNet)." },
          ],
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Receptive field of a small stack",
          problem:
            "Compute the receptive field of: $3 \\times 3$ conv (stride $1$) → $3 \\times 3$ conv (stride $1$) → $2 \\times 2$ max pool (stride $2$) → $3 \\times 3$ conv (stride $1$).",
          steps: [
            "Start $r = 1$, $j = 1$.",
            "Conv 1: $r = 1 + 2 \\cdot 1 = 3$. Conv 2: $r = 3 + 2 \\cdot 1 = 5$.",
            "Pool: $r = 5 + 1 \\cdot 1 = 6$, and the jump becomes $j = 2$.",
            "Conv 3: $r = 6 + 2 \\cdot 2 = 10$.",
          ],
          answer: "Each output of the last layer sees a $10 \\times 10$ input patch.",
        },
      ],
    },
    {
      heading: "Match the design to the data",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "Don't transplant a stem",
          text: "ImageNet networks open with a $7 \\times 7$ stride-$2$ convolution and a stride-$2$ pool, shrinking $224 \\times 224$ inputs by $4\\times$ immediately. Applied to $32 \\times 32$ images the same stem leaves $8 \\times 8$ maps after the first block and throws away most of the signal — CIFAR variants use a $3 \\times 3$ stride-$1$ stem instead. Likewise, tiny objects in large images need the resolution kept longer, not a copy of the classification schedule.",
        },
      ],
    },
  ],
  references: [
    { source: "Simonyan & Zisserman, Very Deep Convolutional Networks for Large-Scale Image Recognition (ICLR 2015)", locator: "§2.3" },
    { source: "He et al., Deep Residual Learning for Image Recognition (CVPR 2016)", locator: "§3.3–4.2" },
    { source: "Howard et al., MobileNets (2017)", locator: "§3.1" },
    { source: "Araujo, Norris & Sim, Computing Receptive Fields of Convolutional Neural Networks (Distill, 2019)", locator: "§2" },
  ],
};

export const ml16CnnPractice: WikiArticle[] = [cnnStrideAndPadding, cnnPooling, cnnDesignChoices];
