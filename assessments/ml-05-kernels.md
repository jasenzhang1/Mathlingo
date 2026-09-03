# Machine Learning Cluster 5 — Kernels

Kernel, Mercer's Theorem, Radial Basis Function (3 concepts). Same format as
[Cluster 1](ml-01-foundations.md).

---

## Kernel (`kernel`)
*Prereq: Dot Product · ancestors 3 · b₀ = 0.19*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.81 | Define a kernel function. | a function K(x,y) computing something equivalent to a dot product in some (possibly high- or infinite-dimensional) feature space, without explicitly computing the feature mapping | — |
| R2 | recall | mcq | −0.55 | The kernel trick lets a dot-product-based algorithm operate in a high-dimensional space: | without ever explicitly transforming the data — dot products are simply replaced by kernel evaluations | claims it works "by explicitly transforming every data point into that space first" — defeats the entire point of the trick → `kernel` |
| A1 | apply | short-answer | 0.0 | The polynomial kernel K(x,y)=(x·y+1)² implicitly includes squared and cross terms of the original features. Why does computing those explicit terms get expensive for many features, while evaluating (x·y+1)² stays cheap? | the number of squared/cross-term features grows quadratically (or worse, for higher-degree kernels) with the original feature count, but the kernel formula itself is always just one dot product plus a constant, squared — a fixed, cheap computation regardless of how many implicit features it represents *(required: the quadratic-blowup-vs-fixed-cost contrast)* | — |
| E1 | explain | short-answer | 0.69 | Why is the kernel trick especially powerful when the implied feature space is infinite-dimensional? | explicitly computing an infinite-dimensional feature vector is literally impossible, yet the kernel function itself still evaluates to an ordinary finite number — the trick makes an otherwise-impossible computation trivial *(required)* | — |
| T1 | transfer | short-answer | 1.19 | Why can any algorithm written using only dot products between data points be "kernelized"? | if the raw feature vectors never appear anywhere except inside dot products, every dot product can be swapped for a kernel evaluation without changing the algorithm's structure at all, gaining nonlinear power for free — this is exactly why SVM was designed around this property *(required: the "raw vectors only appear inside dot products" condition)* | — |

*Coverage: 5 items, −0.81…1.19.*

---

## Mercer's Theorem (`mercers-theorem`)
*Prereq: Kernel, Positive Definite Matrices · ancestors 17 · b₀ = 0.95*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.05 | State Mercer's theorem informally. | K(x,y) is a valid kernel (corresponds to some dot product in some feature space) if and only if the matrix of K(xᵢ,xⱼ) values, for any finite set of points, is positive semi-definite | — |
| R2 | recall | mcq | 0.25 | Mercer's theorem is useful because it: | lets you verify whether a proposed function is a legitimate kernel, without constructing the feature mapping explicitly | claims it "lets you compute the explicit feature mapping for any kernel" — the opposite; it sidesteps needing the mapping at all → `mercers-theorem` |
| A1 | apply | short-answer | 0.75 | Why is checking positive semi-definiteness of the kernel matrix a more practical verification method than constructing the feature mapping explicitly? | the kernel matrix check is a finite, directly computable test on actual data points; constructing the feature mapping may be impossible outright (e.g. for an infinite-dimensional feature space), so the matrix check is the only practical route *(required)* | — |
| E1 | explain | short-answer | 1.45 | Connect Mercer's theorem directly to `positive-definite-matrices` from the linear-algebra sweep. | the kernel matrix condition *is* the positive-semi-definiteness condition from that earlier concept, applied here to a matrix built from kernel evaluations rather than an arbitrary matrix — not an analogy, the same test *(required: states it as the identical condition, not a parallel one)* | — |
| T1 | transfer | short-answer | 1.95 | Why must a practitioner inventing a custom kernel (e.g. for comparing DNA sequences) verify Mercer's condition before using it in an SVM? | using a function that fails Mercer's condition means it doesn't correspond to any real dot product in any feature space, which can make the SVM's underlying optimization problem ill-posed or non-convex, with no guarantee of a stable or meaningful solution *(required: names the optimization-validity risk specifically)* | — |

*Coverage: 5 items, −0.05…1.95.*

---

## Radial Basis Function (`rbf`)
*Prereq: Kernel · ancestors 4 · b₀ = 0.30*

| # | Lvl | Fmt | b | Item | Key / rubric | Misconception → blame |
|---|---|---|---|---|---|---|
| R1 | recall | short-answer | −0.7 | State the RBF (Gaussian) kernel formula. | K(x,y) = exp(−‖x−y‖²/(2σ²)) — a function of only the distance between x and y | — |
| R2 | recall | mcq | −0.45 | The RBF kernel's value is largest when: | x and y are identical (distance=0, giving K=1) | claims it's largest when "x and y are far apart" — backwards; the kernel decays with distance → `rbf` |
| A1 | apply | numeric | 0.1 | σ=1, ‖x−y‖²=2. Compute K(x,y). `[verified: 0.368]` | exp(−2/2)=exp(−1)≈0.368 | — |
| E1 | explain | short-answer | 0.8 | Explain the role of σ, connecting it to KNN's K parameter. | small σ makes influence drop off quickly with distance (very local, flexible, like small-K KNN — low bias, high variance); large σ extends influence far (more global/smooth, like large-K KNN — more bias, less variance) *(required: the explicit KNN parallel in both directions)* | — |
| T1 | transfer | short-answer | 1.3 | Why does RBF correspond to an infinite-dimensional feature space, unlike the polynomial kernel, and what does that imply for SVM flexibility? | the RBF kernel can be expanded as an infinite series of polynomial-like terms of increasing degree, corresponding to an infinite-dimensional feature space; an SVM using it can in principle fit an arbitrarily flexible boundary, though in practice σ and the margin/regularization tradeoff still constrain it to avoid overfitting *(required: names the infinite-series expansion, and the practical constraints that remain)* | — |

*Coverage: 5 items, −0.7…1.3.*

---

## Cluster misconception index

| Tag | Blame |
|---|---|
| kernel trick believed to still require explicit transformation | `kernel` |
| Mercer's theorem believed to construct the feature map | `mercers-theorem` |
| RBF kernel's decay direction reversed | `rbf` |

**Cluster total: 15 items across 3 concepts.** All numeric claims verified.
