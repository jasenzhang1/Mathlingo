import type { WikiArticle } from "./types";

export const jointGraphicalLassoWiki: WikiArticle = {
  conceptId: "joint-graphical-lasso",
  summary:
    "Often there are several related groups — tumour and normal tissue, several cell types, markets in different " +
    "regimes — and you want a conditional-independence graph for each. Running the graphical lasso separately " +
    "ignores what the groups share. Pooling them ignores how they differ. The joint graphical lasso (Danaher, Wang " +
    "& Witten, 2014) estimates all $K$ precision matrices together, adding a penalty that ties them. The group " +
    "version (GGL) encourages the same edges to appear in every group. The fused version (FGL) encourages the edge " +
    "values themselves to be equal, so the few differences that survive form a differential network.",
  sections: [
    {
      heading: "The objective",
      blocks: [
        {
          kind: "formula",
          latex: "\\max_{\\Theta^{(1)}, \\ldots, \\Theta^{(K)} \\succ 0}\\; \\sum_{k=1}^K n_k\\big[\\log\\det\\Theta^{(k)} - \\operatorname{tr}(S^{(k)}\\Theta^{(k)})\\big] - P\\big(\\{\\Theta\\}\\big)",
          caption: "sum of the $K$ Gaussian log-likelihoods, minus a penalty coupling the classes",
        },
        {
          kind: "definitions",
          items: [
            { term: "Fused graphical lasso (FGL)", description: "$P = \\lambda_1\\sum_k\\sum_{i \\ne j}|\\theta^{(k)}_{ij}| + \\lambda_2\\sum_{k < k'}\\sum_{i,j}|\\theta^{(k)}_{ij} - \\theta^{(k')}_{ij}|$. The second term pushes corresponding entries to be exactly equal across classes." },
            { term: "Group graphical lasso (GGL)", description: "$P = \\lambda_1\\sum_k\\sum_{i \\ne j}|\\theta^{(k)}_{ij}| + \\lambda_2\\sum_{i \\ne j}\\sqrt{\\textstyle\\sum_k (\\theta^{(k)}_{ij})^2}$. The second term is a group lasso over the $K$ copies of each edge, so an edge tends to be zero in all classes or nonzero in all." },
          ],
        },
        {
          kind: "list",
          items: [
            "$\\lambda_1$ controls overall sparsity within each graph, exactly as in the graphical lasso.",
            "$\\lambda_2$ controls similarity across graphs. With $\\lambda_2 = 0$ the problem separates into $K$ independent graphical lassos.",
            "Both penalties are convex, so the joint problem is convex and has a unique solution.",
            "Choose FGL when you believe most edge weights are shared and want to find where they differ. Choose GGL when you believe the graphs share structure (which edges exist) but not necessarily strengths.",
          ],
        },
      ],
    },
    {
      heading: "Solving it with ADMM",
      blocks: [
        {
          kind: "prose",
          text:
            "Danaher, Wang and Witten split the problem with the alternating direction method of multipliers. Introduce copies " +
            "$Z^{(k)}$ with the constraint $\\Theta^{(k)} = Z^{(k)}$, and alternate between three updates:",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "$\\Theta$-update: for each $k$, maximise $n_k[\\log\\det\\Theta - \\operatorname{tr}(S^{(k)}\\Theta)] - \\tfrac{\\rho}{2}\\|\\Theta - Z^{(k)} + U^{(k)}\\|_F^2$. This has a closed form via one eigendecomposition: with $n_kS^{(k)} - \\rho(Z^{(k)} - U^{(k)}) = VDV^\\top$, set $\\Theta = V\\tilde{D}V^\\top$ with $\\tilde{D}_{jj} = \\frac{-D_{jj} + \\sqrt{D_{jj}^2 + 4\\rho n_k}}{2\\rho}$.",
            "$Z$-update: apply the proximal operator of the penalty $P$ entrywise across classes — soft-thresholding for $\\lambda_1$, then group soft-thresholding (GGL) or a fused-lasso step (FGL).",
            "Dual update: $U^{(k)} \\leftarrow U^{(k)} + \\Theta^{(k)} - Z^{(k)}$.",
          ],
        },
        {
          kind: "definitions",
          items: [
            { term: "Group soft-threshold (GGL, after the $\\lambda_1$ step)", description: "For the vector $\\mathbf{a} = (a^{(1)}, \\ldots, a^{(K)})$ of one edge across classes, return $\\mathbf{a}\\,\\big(1 - \\tfrac{\\lambda_2/\\rho}{\\|\\mathbf{a}\\|_2}\\big)_+$: shrink the whole vector toward zero, or set all $K$ entries to zero at once." },
            { term: "Fused step (FGL, $K = 2$)", description: "With $t = \\lambda_2/\\rho$, if $|a - b| \\le 2t$ set both entries to $(a + b)/2$; otherwise move each toward the other by $t$. For general $K$ this is a small fused-lasso problem solved per edge." },
          ],
        },
      ],
    },
    {
      heading: "Worked example",
      blocks: [
        {
          kind: "example",
          title: "One edge, two classes",
          problem:
            "After soft-thresholding, one edge has values $\\mathbf{a} = (0.3, 0.4)$ in two classes. Apply the GGL group soft-threshold with $\\lambda_2/\\rho = 0.25$, and separately the FGL fused step with $t = 0.25$ to $(a, b) = (1.0, 0.2)$.",
          steps: [
            "GGL: $\\|\\mathbf{a}\\|_2 = \\sqrt{0.09 + 0.16} = 0.5$, so the factor is $1 - 0.25/0.5 = 0.5$ and the edge becomes $(0.15, 0.2)$ — shrunk together, still present in both classes.",
            "GGL with $\\lambda_2/\\rho = 0.6$: the factor $1 - 0.6/0.5 < 0$, so the edge is removed from both classes at once.",
            "FGL: $|1.0 - 0.2| = 0.8 > 2t = 0.5$, so each value moves $0.25$ toward the other: $(0.75, 0.45)$.",
            "FGL with $t = 0.5$: $0.8 \\le 1.0$, so both become the average $0.6$ — the edge is declared identical across classes.",
          ],
          answer: "GGL $\\to (0.15, 0.2)$; FGL $\\to (0.75, 0.45)$, or fused to $(0.6, 0.6)$ with the larger penalty.",
        },
      ],
    },
    {
      heading: "Screening and practice",
      blocks: [
        {
          kind: "prose",
          text:
            "Like the graphical lasso, the joint problem has an exact screening rule: simple conditions on the sample " +
            "covariances determine which variables fall into separate connected components in every estimated graph. The " +
            "problem then splits into small independent blocks, which is what makes genome-scale problems feasible. For FGL " +
            "with $K = 2$, the condition is $|n_1S^{(1)}_{ij}| \\le \\lambda_1 + \\lambda_2$, $|n_2S^{(2)}_{ij}| \\le \\lambda_1 + \\lambda_2$ " +
            "and $|n_1S^{(1)}_{ij} + n_2S^{(2)}_{ij}| \\le 2\\lambda_1$ for every pair $i, j$ that crosses two blocks.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Limits of the penalty parameters",
          text:
            "As $\\lambda_2 \\to \\infty$, FGL forces $\\Theta^{(1)} = \\cdots = \\Theta^{(K)}$ and reduces to a single graphical lasso " +
            "fitted to the sample-size-weighted pooled covariance. GGL forces a common sparsity pattern, but the nonzero " +
            "values may still differ. Tuning is usually by AIC, BIC or stability selection over a $(\\lambda_1, \\lambda_2)$ grid.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Differential networks need care",
          text:
            "Edges where the FGL estimates differ are a natural list of differential edges, but they aren't hypothesis-tested " +
            "discoveries. Differences can arise from unequal sample sizes and the shrinkage itself. Confirm them by resampling " +
            "or with a dedicated differential-network test.",
        },
      ],
    },
  ],
  references: [
    { source: "Danaher, Wang & Witten, The joint graphical lasso for inverse covariance estimation across multiple classes (JRSS B, 2014)", locator: "§2–5" },
    { source: "Friedman, Hastie & Tibshirani, Sparse inverse covariance estimation with the graphical lasso (Biostatistics, 2008)", locator: "§2" },
    { source: "Boyd et al., Distributed optimization and statistical learning via ADMM (Foundations and Trends in ML, 2011)", locator: "§6.5" },
  ],
};
