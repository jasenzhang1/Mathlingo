import type { WikiArticle } from "../types";

/**
 * Machine Learning cluster 18 — the road into diffusion.
 *
 * `diffusion-models` states the DDPM recipe; these three articles are the ideas
 * it is built from. Normalizing flows show what exact likelihood costs (an
 * invertible map and a Jacobian determinant). Score matching drops the
 * likelihood and learns its gradient instead, sidestepping the normalising
 * constant. Denoising score matching shows that learning to remove noise *is*
 * learning that gradient — which is the loss a diffusion model trains on.
 */

const normalizingFlows: WikiArticle = {
  conceptId: "normalizing-flows",
  summary:
    "A normalizing flow builds a complicated density by pushing a simple one — usually a standard Gaussian — " +
    "through a chain of invertible, differentiable maps. The change-of-variables formula then gives the exact " +
    "log-likelihood of any data point, so flows train by plain maximum likelihood and sample by one forward pass. " +
    "The price is architectural: every layer must be invertible with a Jacobian determinant cheap enough to compute.",
  sections: [
    {
      heading: "Exact likelihood by change of variables",
      blocks: [
        {
          kind: "formula",
          latex: "x = f(z) = f_K \\circ \\cdots \\circ f_1(z), \\quad z \\sim \\mathcal{N}(0, I): \\qquad \\log p_X(x) = \\log p_Z(z) - \\sum_{k=1}^{K} \\log\\left|\\det \\frac{\\partial f_k}{\\partial z_{k-1}}\\right|",
          caption: "$z = f^{-1}(x)$, and $z_{k-1}$ is the input to layer $k$; each layer's log-determinant accounts for how it stretches or compresses volume",
        },
        {
          kind: "prose",
          text: "Training maximises $\\sum_i \\log p_X(x_i)$ directly — no bound, no adversary. The determinant term is the whole difficulty: for a general $D \\times D$ Jacobian it costs $O(D^3)$, hopeless for images with $D$ in the hundreds of thousands. Flow architectures are designed so the Jacobian is triangular, making the determinant the product of its diagonal.",
        },
      ],
    },
    {
      heading: "Building blocks",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "Affine coupling (RealNVP, Glow)", description: "Split $x = (x_a, x_b)$. Keep $x_a$; set $y_b = x_b \\odot e^{s(x_a)} + t(x_a)$ with $s, t$ arbitrary networks. The Jacobian is triangular with $\\log|\\det| = \\sum s(x_a)$, and the inverse is just as cheap: $x_b = (y_b - t(x_a)) \\odot e^{-s(x_a)}$. Alternate which half is kept." },
            { term: "Autoregressive flows", description: "Transform each coordinate conditioned on the previous ones. MAF evaluates densities in one parallel pass but samples one dimension at a time; IAF is the reverse — fast sampling, slow density evaluation of arbitrary points." },
            { term: "Invertible $1 \\times 1$ convolution (Glow)", description: "A learned channel permutation with a cheap $C \\times C$ determinant, so information mixes between coupling layers." },
            { term: "Continuous flows", description: "Define $f$ as the solution of an ODE $dz/dt = g(z, t)$; the log-density changes by $-\\int \\operatorname{tr}(\\partial g/\\partial z)\\,dt$, which only needs a trace. Flow matching, a close relative of diffusion, trains such ODEs without simulating them." },
          ],
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "A one-layer flow",
          problem:
            "With $z \\sim \\mathcal{N}(0, 1)$ and $x = f(z) = 2z + 1$, compute $\\log p_X(1)$.",
          steps: [
            "Invert: $z = (x - 1)/2 = 0$.",
            "$\\log p_Z(0) = -\\tfrac{1}{2}\\log(2\\pi) \\approx -0.919$.",
            "$|df/dz| = 2$, so subtract $\\log 2 \\approx 0.693$.",
          ],
          answer: "$\\log p_X(1) \\approx -1.612$ — matching the $\\mathcal{N}(1, 4)$ density at its mean, as it must.",
        },
      ],
    },
    {
      heading: "Limitations",
      blocks: [
        {
          kind: "list",
          items: [
            "Dimension is preserved: $z$ is as large as $x$, so there is no compressed latent space.",
            "Topology is preserved: a continuous invertible map cannot tear a single Gaussian blob into two separated modes, so it must stretch a thin, low-density bridge between them.",
            "Likelihood is not quality: flows assign high likelihood to some out-of-distribution data (a model trained on CIFAR-10 scores SVHN digits higher), because likelihood is dominated by low-level pixel statistics — a warning for flow-based anomaly detection.",
            "Sample quality on images has lagged GANs and diffusion models, though flows remain valuable wherever an exact density is needed.",
          ],
        },
      ],
    },
  ],
  references: [
    { source: "Dinh, Sohl-Dickstein & Bengio, Density estimation using Real NVP (ICLR 2017)", locator: "§3" },
    { source: "Papamakarios et al., Normalizing Flows for Probabilistic Modeling and Inference (JMLR 2021)", locator: "§2–3" },
    { source: "Nalisnick et al., Do Deep Generative Models Know What They Don't Know? (ICLR 2019)", locator: "§3" },
  ],
};

const scoreMatching: WikiArticle = {
  conceptId: "score-matching",
  summary:
    "The score of a density is the gradient of its log, $s(x) = \\nabla_x \\log p(x)$. Learning the score instead of " +
    "the density sidesteps the normalising constant — it vanishes under the gradient — and a model of the score is " +
    "enough to draw samples with Langevin dynamics. Score matching is the family of objectives that fit $s_\\theta$ " +
    "to data without ever knowing the true score.",
  sections: [
    {
      heading: "Why the score",
      blocks: [
        {
          kind: "formula",
          latex: "p(x) = \\frac{\\tilde{p}(x)}{Z} \\quad\\Longrightarrow\\quad \\nabla_x \\log p(x) = \\nabla_x \\log \\tilde{p}(x) - \\underbrace{\\nabla_x \\log Z}_{=\\,0}",
          caption: "The intractable normaliser $Z$ is a constant in $x$, so the score never needs it",
        },
        {
          kind: "prose",
          text: "An unnormalised model $\\tilde{p}_\\theta = e^{-E_\\theta(x)}$ (an energy-based model) is easy to write down and hard to train by maximum likelihood, because $Z_\\theta$ and its gradient require integrating over all $x$. Its score, $-\\nabla_x E_\\theta(x)$, involves no integral at all.",
        },
      ],
    },
    {
      heading: "The objective and Hyvärinen's trick",
      blocks: [
        {
          kind: "formula",
          latex: "J(\\theta) = \\tfrac{1}{2}\\,\\mathbb{E}_{p}\\big\\|s_\\theta(x) - \\nabla_x \\log p(x)\\big\\|^2 = \\mathbb{E}_{p}\\Big[\\operatorname{tr}\\big(\\nabla_x s_\\theta(x)\\big) + \\tfrac{1}{2}\\|s_\\theta(x)\\|^2\\Big] + \\text{const}",
          caption: "Fisher divergence; integration by parts removes the unknown true score",
        },
        {
          kind: "prose",
          text: "The right-hand side depends only on the model and samples from $p$, so it can be minimised with data alone. Its cost is the trace of the Jacobian of $s_\\theta$ — $D$ backward passes in $D$ dimensions. Sliced score matching estimates the trace with random projections; denoising score matching avoids it altogether and is what is used at scale.",
        },
      ],
    },
    {
      heading: "Sampling with a score",
      blocks: [
        {
          kind: "formula",
          latex: "x_{k+1} = x_k + \\frac{\\epsilon}{2}\\, s_\\theta(x_k) + \\sqrt{\\epsilon}\\, z_k, \\qquad z_k \\sim \\mathcal{N}(0, I)",
          caption: "Langevin dynamics: climb the log-density, plus noise; for small $\\epsilon$ and many steps it samples from $p$",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Where the data isn't, the score is wrong",
          text: "Score matching weights errors by $p(x)$, so the learned score is accurate only where data is dense. Langevin chains started from noise spend their first steps in exactly the low-density regions where the score is unreliable. Worse, for well-separated modes the score within each mode carries no information about their relative weights, so chains can settle into the wrong proportions. Perturbing the data with noise at many scales fixes both — which leads directly to denoising score matching and diffusion.",
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "The score of a Gaussian, and one Langevin step",
          problem:
            "For $p = \\mathcal{N}(\\mu, \\sigma^2)$, find the score. Then, targeting $\\mathcal{N}(0, 1)$ from $x_0 = 2$ with $\\epsilon = 0.1$ and noise draw $z_0 = 0.5$, take one Langevin step.",
          steps: [
            "$\\log p(x) = -(x - \\mu)^2/(2\\sigma^2) + \\text{const}$, so $s(x) = -(x - \\mu)/\\sigma^2$ — a pull back toward the mean, stronger when $\\sigma$ is small.",
            "For $\\mathcal{N}(0, 1)$, $s(2) = -2$.",
            "$x_1 = 2 + 0.05 \\cdot (-2) + \\sqrt{0.1} \\cdot 0.5 \\approx 2 - 0.1 + 0.158$.",
          ],
          answer: "$s(x) = -(x - \\mu)/\\sigma^2$, and $x_1 \\approx 2.058$.",
        },
      ],
    },
  ],
  references: [
    { source: "Hyvärinen, Estimation of Non-Normalized Statistical Models by Score Matching (JMLR 2005)", locator: "§2" },
    { source: "Song & Ermon, Generative Modeling by Estimating Gradients of the Data Distribution (NeurIPS 2019)", locator: "§2–3" },
    { source: "Song et al., Sliced Score Matching (UAI 2019)", locator: "§3" },
  ],
};

const denoisingScoreMatching: WikiArticle = {
  conceptId: "denoising-score-matching",
  summary:
    "Denoising score matching replaces an impossible target — the true score of the data — with an easy one: add " +
    "Gaussian noise to each data point and regress onto the direction back to the clean point. Minimising that " +
    "per-sample loss recovers the score of the noised data distribution exactly, and Tweedie's formula shows that the " +
    "best denoiser and the score are the same object. A diffusion model's noise-prediction loss is this objective, " +
    "summed over noise levels.",
  sections: [
    {
      heading: "The objective",
      blocks: [
        {
          kind: "formula",
          latex: "\\tilde{x} = x + \\sigma\\varepsilon, \\;\\; \\varepsilon \\sim \\mathcal{N}(0, I): \\qquad \\mathcal{L}(\\theta) = \\mathbb{E}_{x, \\varepsilon}\\Big\\| s_\\theta(\\tilde{x}) + \\frac{\\tilde{x} - x}{\\sigma^2} \\Big\\|^2 = \\mathbb{E}_{x, \\varepsilon}\\Big\\| s_\\theta(\\tilde{x}) + \\frac{\\varepsilon}{\\sigma} \\Big\\|^2",
          caption: "The target $-(\\tilde{x} - x)/\\sigma^2 = \\nabla_{\\tilde{x}} \\log q(\\tilde{x} \\mid x)$ is known for every training pair",
        },
        {
          kind: "prose",
          text: "Vincent (2011) showed this equals, up to a constant, score matching on the noised density $q_\\sigma(\\tilde{x}) = \\int q(\\tilde{x} \\mid x)\\,p(x)\\,dx$. The reason is regression: the minimiser of a squared loss is the conditional expectation of the target, and averaging $\\nabla \\log q(\\tilde{x} \\mid x)$ over the clean points that could have produced $\\tilde{x}$ gives exactly $\\nabla \\log q_\\sigma(\\tilde{x})$. No Jacobian trace, one forward and backward pass per sample.",
        },
      ],
    },
    {
      heading: "Tweedie's formula",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbb{E}[x \\mid \\tilde{x}] = \\tilde{x} + \\sigma^2\\, \\nabla_{\\tilde{x}} \\log q_\\sigma(\\tilde{x})",
          caption: "The optimal (minimum-MSE) denoiser is one score step away from the noisy input",
        },
        {
          kind: "prose",
          text: "So a network trained to denoise with squared error has learned the score, and vice versa: $s(\\tilde{x}) = (\\hat{x}(\\tilde{x}) - \\tilde{x})/\\sigma^2$. Equivalently, predicting the noise gives the score up to scale — if $\\hat{\\varepsilon}$ is the predicted noise, then $s(\\tilde{x}) = -\\hat{\\varepsilon}/\\sigma$. This is why diffusion models are trained to predict $\\varepsilon$: the DDPM loss $\\|\\varepsilon - \\varepsilon_\\theta(\\sqrt{\\bar{\\alpha}_t}\\,x_0 + \\sqrt{1-\\bar{\\alpha}_t}\\,\\varepsilon,\\, t)\\|^2$ is denoising score matching at noise level $t$, with a particular weighting across levels.",
        },
      ],
    },
    {
      heading: "Why many noise levels",
      blocks: [
        {
          kind: "list",
          items: [
            "Small $\\sigma$: $q_\\sigma$ is close to the data distribution, so its score is what you want to sample from — but it is only learned well near the data.",
            "Large $\\sigma$: the noised distribution fills the whole space and connects separated modes, so the score is reliable everywhere, but it describes a blurry version of the data.",
            "Train one network conditioned on $\\sigma$ across a range, and sample by annealing: follow the large-$\\sigma$ score first to get into the right region, then progressively smaller ones to sharpen. That is annealed Langevin dynamics (NCSN) — and, in continuous time, the reverse process of a diffusion model.",
          ],
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "Tweedie for a Gaussian prior",
          problem:
            "Let $x \\sim \\mathcal{N}(0, 1)$ and $\\tilde{x} = x + \\varepsilon$ with $\\varepsilon \\sim \\mathcal{N}(0, 1)$ (so $\\sigma = 1$). You observe $\\tilde{x} = 3$. Find the score of the noised density there and the optimal denoised estimate.",
          steps: [
            "$\\tilde{x} \\sim \\mathcal{N}(0, 2)$, so $\\nabla \\log q_\\sigma(\\tilde{x}) = -\\tilde{x}/2 = -1.5$.",
            "Tweedie: $\\mathbb{E}[x \\mid \\tilde{x}] = 3 + 1 \\cdot (-1.5) = 1.5$.",
            "Check with Gaussian conditioning: $\\mathbb{E}[x \\mid \\tilde{x}] = \\frac{1}{1+1}\\tilde{x} = 1.5$.",
          ],
          answer: "The score is $-1.5$ and the denoised estimate is $1.5$ — shrinkage halfway back to the prior mean.",
        },
      ],
    },
  ],
  references: [
    { source: "Vincent, A Connection Between Score Matching and Denoising Autoencoders (Neural Computation, 2011)", locator: "§4" },
    { source: "Efron, Tweedie's Formula and Selection Bias (JASA, 2011)", locator: "§2" },
    { source: "Song et al., Score-Based Generative Modeling through Stochastic Differential Equations (ICLR 2021)", locator: "§2–3" },
    { source: "Ho, Jain & Abbeel, Denoising Diffusion Probabilistic Models (NeurIPS 2020)", locator: "§3.2" },
  ],
};

export const ml18ScoreBasedGenerative: WikiArticle[] = [normalizingFlows, scoreMatching, denoisingScoreMatching];
