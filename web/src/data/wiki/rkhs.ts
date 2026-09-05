import type { WikiArticle } from "./types";

export const rkhsWiki: WikiArticle = {
  conceptId: "rkhs",
  summary:
    "A reproducing kernel Hilbert space is the function space a kernel implicitly defines. Mercer's " +
    "theorem guarantees that a positive semi-definite kernel corresponds to an inner product in some " +
    "feature space; RKHS theory constructs that space explicitly and gives it a defining property — " +
    "evaluating a function at a point is the same as taking an inner product with a kernel slice. " +
    "That property is what makes the kernel trick rigorous rather than merely convenient, and the " +
    "RKHS norm is what regularisation in kernel methods is actually penalising.",

  sections: [
    {
      heading: "From Mercer to a concrete space",
      blocks: [
        {
          kind: "prose",
          text:
            "Mercer's theorem is an existence result: if k is symmetric and positive semi-definite, " +
            "then there exists a feature map φ into some inner-product space with k(x, x′) = " +
            "⟨φ(x), φ(x′)⟩. That licenses the kernel trick, but it says “some space” and leaves the " +
            "space unnamed. For many purposes that is enough. For others — understanding what kernel " +
            "regularisation controls, or what the representer theorem is asserting — you need to know " +
            "which space.",
        },
        {
          kind: "table",
          headers: ["", "Mercer's theorem", "RKHS theory"],
          rows: [
            ["Type of result", "Existence", "Construction"],
            ["Says", "A valid feature space exists", "Here it is, canonically, and it is unique"],
            ["Gives you", "Permission to use the kernel trick", "A norm, a geometry, and the representer theorem"],
          ],
        },
        {
          kind: "prose",
          text:
            "The construction is direct. Take the functions k(x, ·) for every x — one “slice” of the " +
            "kernel per input point — and form all finite linear combinations Σᵢ αᵢk(xᵢ, ·). Define an " +
            "inner product on them by ⟨k(x, ·), k(x′, ·)⟩ = k(x, x′), which is well-defined precisely " +
            "because k is PSD. Complete the space by adding limits of Cauchy sequences. The result is " +
            "the RKHS H_k, and it is the unique Hilbert space of functions with the reproducing " +
            "property below.",
        },
      ],
    },

    {
      heading: "The reproducing property",
      blocks: [
        {
          kind: "formula",
          latex: "⟨f, k(x, ·)⟩_{H} = f(x)   for every f ∈ H and every x",
          caption: "Evaluation at a point is an inner product — this is what “reproducing” names",
        },
        {
          kind: "prose",
          text:
            "This is a stronger statement than it first appears. In a general function space, " +
            "point evaluation is a badly behaved operation: in L², functions are equivalence classes " +
            "defined up to sets of measure zero, so “the value at x” is not even well defined. An RKHS " +
            "is a space where point evaluation is not only defined but continuous — bounded as a linear " +
            "functional — and the Riesz representation theorem then says it must be representable as an " +
            "inner product with some element. That element is k(x, ·).",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Why this is useful, not just tidy",
          text:
            "It converts a pointwise question into a geometric one. Convergence in RKHS norm implies " +
            "pointwise convergence, because |f(x) − g(x)| = |⟨f − g, k(x,·)⟩| ≤ ‖f − g‖·√k(x,x) by " +
            "Cauchy–Schwarz. So controlling the norm controls the function everywhere, and the whole " +
            "apparatus of Hilbert-space geometry — projections, orthogonality, optimisation — becomes " +
            "available for reasoning about function values.",
        },
        {
          kind: "prose",
          text:
            "Setting f = k(x′, ·) in the reproducing property recovers ⟨k(x′,·), k(x,·)⟩ = k(x, x′), " +
            "which is Mercer's factorisation with φ(x) = k(x, ·). The canonical feature map is just the " +
            "kernel with one argument left open.",
        },
      ],
    },

    {
      heading: "The RKHS norm as a complexity measure",
      blocks: [
        {
          kind: "prose",
          text:
            "Every RKHS comes with a norm ‖f‖_H, and it measures roughness. For the RBF kernel the " +
            "norm has a Fourier-domain expression that penalises high-frequency content, so smooth " +
            "functions have small norm and wiggly ones have large norm. This gives a principled answer " +
            "to what “simple function” means, derived from the kernel rather than asserted.",
        },
        {
          kind: "formula",
          latex: "min_{f ∈ H}  Σᵢ L(yᵢ, f(xᵢ)) + λ‖f‖²_H",
          caption: "The general kernel-method objective: fit the data, but stay smooth",
        },
        {
          kind: "prose",
          text:
            "This is exactly the shape regularisation takes throughout the curriculum — a loss plus a " +
            "penalty on the size of what you fitted — with the RKHS norm in place of ‖β‖². Ridge " +
            "regression is the special case where H is the space of linear functions and ‖f‖_H = ‖β‖₂. " +
            "Kernel ridge regression, support vector machines, and Gaussian process regression are all " +
            "this objective with different losses.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "The representer theorem",
          text:
            "The minimiser of that objective, searched over a possibly infinite-dimensional space, " +
            "always has the finite form f(·) = Σᵢ αᵢk(xᵢ, ·) — a combination of kernel slices at the n " +
            "training points. This is what makes kernel methods computable at all: an infinite-" +
            "dimensional optimisation collapses to solving for n coefficients. The proof is a one-line " +
            "orthogonality argument — any component of f orthogonal to the span of the training slices " +
            "leaves every f(xᵢ) unchanged (by the reproducing property) while strictly increasing " +
            "‖f‖_H, so the optimum has no such component.",
        },
      ],
    },

    {
      heading: "How this connects to the rest of the domain",
      blocks: [
        {
          kind: "list",
          items: [
            "Gaussian processes: the posterior mean of a GP with kernel k is exactly the kernel ridge regression solution in H_k, so the Bayesian and regularisation views coincide. Note the GP's sample paths are almost surely NOT in H_k — they are rougher than the space they induce, a genuine subtlety.",
            "SVMs: the maximum-margin hyperplane lives in the RKHS, and the margin is inversely related to ‖f‖_H — maximising margin is minimising RKHS norm.",
            "Kernel PCA, kernel CCA, and kernel k-means are the corresponding linear methods run in H_k.",
            "Maximum mean discrepancy embeds whole distributions as points in an RKHS and measures the distance between them — a kernel two-sample test.",
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "What RKHS theory is not for",
          text:
            "It is a functional-analytic foundation for kernel methods. It has nothing to do with " +
            "hypothesis testing machinery, p-values, or estimation efficiency in the classical sense. " +
            "When it does touch statistics — as in kernel two-sample tests — it does so by supplying " +
            "the geometry, not by replacing the inferential apparatus.",
        },
      ],
    },
  ],

  references: [
    { source: "Schölkopf & Smola, Learning with Kernels", locator: "Ch. 2, Kernels — the RKHS construction and the representer theorem" },
    { source: "Hsing & Eubank, Theoretical Foundations of Functional Data Analysis", locator: "Ch. 2, Hilbert space methods and reproducing kernels" },
    { source: "Rasmussen & Williams, Gaussian Processes for Machine Learning", locator: "§6.1–6.2, RKHS and the connection to GP regression" },
    { source: "Mathlingo assessment bank", locator: "assessments/gm-03-variational-inference-and-kernels.md" },
  ],
};
