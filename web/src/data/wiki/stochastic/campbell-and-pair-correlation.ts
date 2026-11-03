import type { WikiArticle } from "../types";

/**
 * Moment formulas for point processes (Campbell's theorem and product
 * densities) and their use for multivariate log-Gaussian Cox processes:
 * why log{ rho_ij / (rho_i rho_j) } is the cross-covariance of the
 * log-intensities.
 */

const mw = "Møller & Waagepetersen, Statistical Inference and Simulation for Spatial Point Processes (2004)";

export const campbellTheoremWiki: WikiArticle = {
  conceptId: "campbell-theorem",
  summary:
    "Campbell's formulas turn sums over random points into ordinary integrals. The first-order formula says that the " +
    "expected value of $\\sum_x f(x)$ over the points $x$ of a process is $\\int f\\,\\rho$, with $\\rho$ the intensity. The " +
    "second-order formula does the same for sums over *pairs* of distinct points, using the product density $\\rho_2$. " +
    "Together they give the mean, variance and covariance of counts, and they are why $\\rho$ and $\\rho_2$ can be estimated " +
    "by simply summing over observed spikes.",
  sections: [
    {
      heading: "First and second order",
      blocks: [
        {
          kind: "formula",
          latex: "\\mathbb{E}\\sum_{x \\in N} f(x) = \\int f(s)\\,\\rho(s)\\,ds, \\qquad \\mathbb{E}\\sum_{x \\ne y \\in N} f(x, y) = \\iint f(s, t)\\,\\rho_2(s, t)\\,ds\\,dt",
        },
        {
          kind: "list",
          items: [
            "**Intensity:** $\\rho(s)\\,ds \\approx P(\\text{a point in } [s, s + ds])$. Taking $f = \\mathbf{1}_A$ gives $\\mathbb{E}N(A) = \\int_A \\rho$.",
            "**Product density:** $\\rho_2(s, t)\\,ds\\,dt \\approx P(\\text{points in both } ds \\text{ and } dt)$, for *distinct* points. Taking $f = \\mathbf{1}_A \\otimes \\mathbf{1}_B$ with $A \\cap B = \\varnothing$ gives $\\mathbb{E}[N(A)N(B)] = \\iint_{A \\times B}\\rho_2$; with $A = B$ it gives the factorial moment $\\mathbb{E}[N(A)(N(A) - 1)] = \\iint_{A \\times A}\\rho_2$.",
            "**Pair correlation:** $g(s, t) = \\rho_2(s, t)/\\{\\rho(s)\\rho(t)\\}$. It equals $1$ for a Poisson process, exceeds $1$ for clustering and is below $1$ for repulsion.",
          ],
        },
        {
          kind: "formula",
          latex: "\\operatorname{Var}N(A) = \\int_A \\rho + \\iint_{A \\times A}\\big\\{\\rho_2(s, t) - \\rho(s)\\rho(t)\\big\\}\\,ds\\,dt, \\qquad \\operatorname{Cov}\\{N(A), N(B)\\} = \\iint_{A \\times B}\\rho(s)\\rho(t)\\{g(s, t) - 1\\}\\,ds\\,dt \\ (A \\cap B = \\varnothing)",
        },
        {
          kind: "prose",
          text:
            "For a Poisson process $\\rho_2 = \\rho\\rho$, the second term vanishes and $\\operatorname{Var}N(A) = \\mathbb{E}N(A)$. Any " +
            "excess over the mean must come from $\\rho_2 > \\rho\\rho$ — pairs of points that are more likely together than independence allows.",
        },
        {
          kind: "example",
          title: "Poisson moments from Campbell",
          problem: "A Poisson process has constant rate $\\rho = 3$ on $[0, 2]$. Find $\\mathbb{E}\\sum_x x$ and, using the Poisson variance formula $\\operatorname{Var}\\sum_x f(x) = \\int f^2\\rho$, find $\\operatorname{Var}\\sum_x x$.",
          steps: [
            "$\\mathbb{E}\\sum_x x = \\int_0^2 3x\\,dx = 6$.",
            "$\\operatorname{Var}\\sum_x x = \\int_0^2 3x^2\\,dx = 8$.",
          ],
          answer: "Mean $6$ and variance $8$.",
        },
      ],
    },
    {
      heading: "Cox processes and several neurons",
      blocks: [
        {
          kind: "prose",
          text:
            "Given the random intensity $\\Lambda$, a Cox process is Poisson, so $\\rho_2$ and $\\rho$ follow from the tower property:",
        },
        {
          kind: "formula",
          latex: "\\rho(s) = \\mathbb{E}\\Lambda(s), \\qquad \\rho_2(s, t) = \\mathbb{E}\\big[\\Lambda(s)\\Lambda(t)\\big], \\qquad g(s, t) = 1 + \\frac{\\operatorname{Cov}\\{\\Lambda(s), \\Lambda(t)\\}}{\\rho(s)\\rho(t)}",
        },
        {
          kind: "prose",
          text:
            "For $p$ neurons that are conditionally independent Poisson processes given their intensities $\\Lambda_1, \\dots, \\Lambda_p$, the " +
            "cross product density is $\\rho_{i,j}(s, t) = \\mathbb{E}[\\Lambda_i(s)\\Lambda_j(t)]$ with no exclusion of coincident points, because spikes of " +
            "different neurons are different points. So $\\operatorname{Cov}\\{N_i(A), N_j(B)\\} = \\iint_{A \\times B}\\{\\rho_{i,j} - \\rho_i\\rho_j\\}$ for any $A, B$.",
        },
        {
          kind: "example",
          title: "Overdispersion of a Cox count",
          problem: "A Cox process on $[0, 2]$ has $\\Lambda(t) \\equiv \\Lambda$ with $\\mathbb{E}\\Lambda = 3$ and $\\operatorname{Var}\\Lambda = 4$. Find $\\mathbb{E}N$ and $\\operatorname{Var}N$.",
          steps: [
            "$\\mathbb{E}N = \\int_0^2 3\\,dt = 6$.",
            "$\\rho_2 = \\mathbb{E}\\Lambda^2 = 4 + 9 = 13$ and $\\rho\\rho = 9$.",
            "$\\operatorname{Var}N = 6 + \\iint_{[0,2]^2}(13 - 9) = 6 + 4 \\cdot 4 = 22$.",
          ],
          answer: "$\\mathbb{E}N = 6$, $\\operatorname{Var}N = 22$: strongly overdispersed compared with the Poisson value $6$.",
        },
      ],
    },
    {
      heading: "Why Campbell makes the intensities estimable",
      blocks: [
        {
          kind: "prose",
          text:
            "Replace $f$ by a kernel $K_h(s - \\cdot)$ and read off $\\mathbb{E}\\sum_x K_h(s - x) = \\int K_h(s - u)\\rho(u)\\,du \\approx \\rho(s)$. " +
            "So the sum of kernels over observed spikes is an unbiased estimator of a smoothed $\\rho$, and the sum over distinct *pairs* of spikes of " +
            "$K_h(s - x)K_h(t - y)$ is unbiased for a smoothed $\\rho_2$. With $n$ independent trials, average the sums over trials.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Distinct points only",
          text: "In $\\rho_2$ for a single process, pairs $(x, x)$ are excluded. Including them adds a spike at $s = t$ to your estimator and inflates $\\hat\\rho_2$ on the diagonal. For two different neurons nothing needs to be excluded.",
        },
      ],
    },
  ],
  references: [
    { source: mw, locator: "Ch. 4 (moment measures and product densities)" },
    { source: "Daley & Vere-Jones, An Introduction to the Theory of Point Processes, Vol. I" },
  ],
};

export const logPairCorrelationEstimatorWiki: WikiArticle = {
  conceptId: "log-pair-correlation-estimator",
  summary:
    "For neurons whose log-intensities $X_i = \\log\\Lambda_i$ are jointly Gaussian, Campbell's formulas give " +
    "$\\rho_{i,j}(s, t)/\\{\\rho_i(s)\\rho_j(t)\\} = \\exp\\{G_{i,j}(s, t)\\}$ exactly. The ratio removes the unknown means and variances " +
    "of the log-intensities, and the log turns the multiplicative effect into the covariance itself. Plugging in estimates of the " +
    "intensities gives $\\hat G_{i,j}$.",
  sections: [
    {
      heading: "The identity",
      blocks: [
        {
          kind: "prose",
          text:
            "Let $X_i(s)$ have mean $\\mu_i(s)$ and let $G_{i,j}(s, t) = \\operatorname{Cov}\\{X_i(s), X_j(t)\\}$. For jointly Gaussian $(X_i(s), X_j(t))$, " +
            "the Gaussian moment generating function $\\mathbb{E}e^{Y} = e^{\\mathbb{E}Y + \\operatorname{Var}Y/2}$ gives the lognormal moments:",
        },
        {
          kind: "formula",
          latex: "\\rho_i(s) = \\exp\\Big\\{\\mu_i(s) + \\tfrac12 G_{i,i}(s, s)\\Big\\}, \\qquad \\rho_{i,j}(s, t) = \\mathbb{E}\\,e^{X_i(s) + X_j(t)} = \\exp\\Big\\{\\mu_i(s) + \\mu_j(t) + \\tfrac12 G_{i,i}(s, s) + \\tfrac12 G_{j,j}(t, t) + G_{i,j}(s, t)\\Big\\}",
        },
        {
          kind: "formula",
          latex: "\\frac{\\rho_{i,j}(s, t)}{\\rho_i(s)\\,\\rho_j(t)} = e^{G_{i,j}(s, t)} \\quad\\Longrightarrow\\quad G_{i,j}(s, t) = \\log\\frac{\\rho_{i,j}(s, t)}{\\rho_i(s)\\,\\rho_j(t)}",
        },
        {
          kind: "example",
          title: "Reading $G$ off the intensities",
          problem: "Neurons $i, j$ have $\\mu_i = \\mu_j = 0$, $G_{i,i} = G_{j,j} = 1$ and $G_{i,j} = 0.5$ at the times $(s, t)$ of interest. Find $\\rho_i$, $\\rho_{i,j}$ and the pair correlation.",
          steps: [
            "$\\rho_i = \\rho_j = e^{0 + 1/2} = e^{0.5} \\approx 1.6487$.",
            "$\\rho_{i,j} = \\exp\\{0 + 0 + 0.5 + 0.5 + 0.5\\} = e^{1.5} \\approx 4.4817$.",
            "Ratio $= e^{1.5}/e^{1} = e^{0.5} \\approx 1.6487$, so $\\log$ of the ratio is $0.5 = G_{i,j}$.",
          ],
          answer: "The log of the pair correlation is exactly $G_{i,j}(s, t) = 0.5$.",
        },
      ],
    },
    {
      heading: "Why ratio, and why log",
      blocks: [
        {
          kind: "list",
          items: [
            "**The ratio cancels nuisance terms.** $\\rho_{i,j}$ alone mixes $\\mu_i$, $\\mu_j$, the variances $G_{i,i}(s, s)$, $G_{j,j}(t, t)$ and the quantity of interest $G_{i,j}$. Dividing by $\\rho_i\\rho_j$ removes everything except $G_{i,j}$.",
            "**The log makes it a covariance.** The ratio is $e^{G_{i,j}}$, which is always positive and multiplicative. The log is the only transformation that returns $G_{i,j}$ itself, which is what the operator $\\Sigma_{X_iX_j}$ needs, rather than $\\operatorname{Cov}(\\Lambda_i, \\Lambda_j)$.",
            "**Symmetry between excitation and inhibition.** Ratios of $2$ and $1/2$ become $+\\log 2$ and $-\\log 2$ on the log scale, so positive and negative co-fluctuation are treated alike.",
            "**Scale-free.** If neuron $i$ is detected with probability $q_i$ (independent thinning), then $\\rho_i, \\rho_j, \\rho_{i,j}$ scale by $q_i, q_j, q_iq_j$ and the ratio is unchanged. The difference $\\rho_{i,j} - \\rho_i\\rho_j$ would scale by $q_iq_j$, so it depends on firing rate and recording quality.",
            "**Not the same as $g - 1$.** $g - 1$ is the covariance of $\\Lambda$ relative to its mean product; it agrees with $G$ only when $G$ is small, since $e^{G} - 1 \\approx G$.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "What 'best' means here",
          text: "The log-ratio is the natural plug-in estimator because it inverts an exact identity — not because it has minimum variance. It is consistent, but biased in finite samples (the log of an unbiased estimator is not unbiased), and it relies on the log-Gaussian model. For another Cox model, such as a shared gamma frailty, $\\log g$ is still a meaningful dependence measure but is no longer the covariance of $\\log\\Lambda$.",
        },
      ],
    },
    {
      heading: "Estimating it",
      blocks: [
        {
          kind: "formula",
          latex: "\\hat\\rho_i(s) = \\frac1n\\sum_{k=1}^n\\sum_{x \\in N_i^k}K_h(s - x), \\qquad \\hat\\rho_{i,j}(s, t) = \\frac1n\\sum_{k=1}^n\\sum_{x \\in N_i^k}\\sum_{y \\in N_j^k}K_h(s - x)K_h(t - y), \\qquad \\hat G_{i,j} = \\log\\frac{\\hat\\rho_{i,j}}{\\hat\\rho_i\\hat\\rho_j}",
        },
        {
          kind: "list",
          items: [
            "By Campbell, $\\hat\\rho_i$ and $\\hat\\rho_{i,j}$ are unbiased for smoothed intensities. For $i = j$ exclude the self-pairs $x = y$.",
            "With a bin of widths $\\Delta_s, \\Delta_t$ in place of a kernel: $\\hat\\rho_i = \\text{(spike count)}/(n\\Delta_s)$ and $\\hat\\rho_{i,j} = \\text{(pair count)}/(n\\Delta_s\\Delta_t)$.",
            "**Zeros:** if a bin pair has no co-occurring spikes, $\\hat\\rho_{i,j} = 0$ and the log is $-\\infty$. Smooth with a wider bandwidth, pool neighbouring bins, or add a small constant.",
            "**Delta method:** $\\operatorname{Var}\\log\\hat\\rho \\approx \\mathrm{CV}^2$, so noisy bins with small counts have very noisy $\\hat G$. Standard errors on the log scale add roughly like $\\sqrt{\\mathrm{CV}_{ij}^2 + \\mathrm{CV}_i^2 + \\mathrm{CV}_j^2}$ if the errors were independent.",
            "**Assembling $\\Sigma_X$:** evaluate $\\hat G_{i,j}$ on a grid, form the block matrix, and project it onto the positive semi-definite cone (eigenvalue truncation) because noisy blocks need not give a valid covariance.",
          ],
        },
        {
          kind: "example",
          title: "A binned estimate",
          problem: "$n = 10$ trials, bins of width $0.1$ s. In the bin around $s$ neuron $i$ fires $12$ times in total, in the bin around $t$ neuron $j$ fires $20$ times, and there are $30$ (spike of $i$, spike of $j$) pairs in the two bins. Find $\\hat G_{i,j}(s, t)$.",
          steps: [
            "$\\hat\\rho_i = 12/(10 \\cdot 0.1) = 12$; $\\hat\\rho_j = 20/(10 \\cdot 0.1) = 20$.",
            "$\\hat\\rho_{i,j} = 30/(10 \\cdot 0.1 \\cdot 0.1) = 300$.",
            "$\\hat G_{i,j} = \\log\\{300/(12 \\cdot 20)\\} = \\log 1.25 \\approx 0.2231$.",
          ],
          answer: "$\\hat G_{i,j}(s, t) \\approx 0.2231$: mild positive co-fluctuation.",
        },
      ],
    },
  ],
  references: [
    { source: "Møller, Syversveen & Waagepetersen, Log Gaussian Cox processes (Scandinavian Journal of Statistics, 1998)" },
    { source: mw, locator: "Ch. 5 (Cox processes)" },
  ],
};
