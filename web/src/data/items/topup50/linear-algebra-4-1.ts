import type { Item } from "../../../lib/assessment/types";
import { m, n, s } from "./shared";

/** Top-up to 50: Schur complement, SVD, uniqueness of SVD. */
const SC = "schur-complement";
const SV = "svd";
const US = "uniqueness-of-svd";

const MBLK = "$\\mathbf{M} = \\begin{bmatrix}\\mathbf{A} & \\mathbf{B}\\\\\\mathbf{C} & \\mathbf{D}\\end{bmatrix}$";

const schur: Item[] = [
  // level 1
  m(SC, "t50-def-d-block", 1, `For ${MBLK} with $\\mathbf{D}$ invertible, the Schur complement of $\\mathbf{D}$ in $\\mathbf{M}$ is:`,
    "$\\mathbf{A} - \\mathbf{B}\\mathbf{D}^{-1}\\mathbf{C}$",
    [
      ["$\\mathbf{D} - \\mathbf{C}\\mathbf{A}^{-1}\\mathbf{B}$", "That is the Schur complement of $\\mathbf{A}$; eliminating with $\\mathbf{D}$ leaves a correction to $\\mathbf{A}$."],
      ["$\\mathbf{A} - \\mathbf{C}\\mathbf{D}^{-1}\\mathbf{B}$", "The order of the factors is wrong: $\\mathbf{C}\\mathbf{D}^{-1}\\mathbf{B}$ doesn't even have the size of $\\mathbf{A}$ in general."],
      ["$\\mathbf{A}\\mathbf{D} - \\mathbf{B}\\mathbf{C}$", "That copies the scalar $ad - bc$ rule; it isn't the block-elimination remainder."],
    ]),
  m(SC, "t50-size", 1, "If $\\mathbf{A}$ is $p \\times p$ and $\\mathbf{D}$ is $q \\times q$, the Schur complement $\\mathbf{D} - \\mathbf{C}\\mathbf{A}^{-1}\\mathbf{B}$ has size:",
    "$q \\times q$",
    [
      ["$p \\times p$", "That's the size of the block being inverted, not of the complement."],
      ["$(p + q) \\times (p + q)$", "That's the size of the whole matrix $\\mathbf{M}$."],
      ["$p \\times q$", "That's the size of $\\mathbf{B}$; the complement replaces the $\\mathbf{D}$ block."],
    ]),
  m(SC, "t50-requires", 1, "What must be true for the Schur complement $\\mathbf{D} - \\mathbf{C}\\mathbf{A}^{-1}\\mathbf{B}$ to be defined?",
    "$\\mathbf{A}$ is square and invertible",
    [
      ["$\\mathbf{M}$ is invertible", "$\\mathbf{M} = \\begin{bmatrix}0 & 1\\\\1 & 0\\end{bmatrix}$ is invertible but its $(1, 1)$ block is $0$."],
      ["$\\mathbf{D}$ is invertible", "That's what the other complement, $\\mathbf{A} - \\mathbf{B}\\mathbf{D}^{-1}\\mathbf{C}$, needs."],
      ["$\\mathbf{B} = \\mathbf{C}^\\top$", "Symmetry isn't needed; only $\\mathbf{A}^{-1}$ must exist."],
    ]),
  m(SC, "t50-inverse-block", 1, `When ${MBLK} and $\\mathbf{A}$ are invertible, the $(2, 2)$ block of $\\mathbf{M}^{-1}$ equals:`,
    "$(\\mathbf{D} - \\mathbf{C}\\mathbf{A}^{-1}\\mathbf{B})^{-1}$",
    [
      ["$\\mathbf{D}^{-1}$", "That ignores the coupling through $\\mathbf{B}$ and $\\mathbf{C}$; it's right only when they vanish."],
      ["$\\mathbf{D} - \\mathbf{C}\\mathbf{A}^{-1}\\mathbf{B}$", "The block of the inverse is the inverse of the Schur complement, not the complement itself."],
      ["$\\mathbf{A}^{-1}$", "That's the wrong block, and even the $(1, 1)$ block isn't simply $\\mathbf{A}^{-1}$."],
    ]),
  m(SC, "t50-gauss-cond", 1, "A Gaussian vector is partitioned as $(\\mathbf{X}_1, \\mathbf{X}_2)$ with covariance blocks $\\boldsymbol{\\Sigma}_{ij}$. The conditional covariance of $\\mathbf{X}_2$ given $\\mathbf{X}_1$ is:",
    "$\\boldsymbol{\\Sigma}_{22} - \\boldsymbol{\\Sigma}_{21}\\boldsymbol{\\Sigma}_{11}^{-1}\\boldsymbol{\\Sigma}_{12}$",
    [
      ["$\\boldsymbol{\\Sigma}_{22}$", "That's the marginal covariance; conditioning on a correlated $\\mathbf{X}_1$ reduces it."],
      ["$\\boldsymbol{\\Sigma}_{22} + \\boldsymbol{\\Sigma}_{21}\\boldsymbol{\\Sigma}_{11}^{-1}\\boldsymbol{\\Sigma}_{12}$", "Wrong sign: information about $\\mathbf{X}_1$ can only shrink the uncertainty about $\\mathbf{X}_2$."],
      ["$\\boldsymbol{\\Sigma}_{11} - \\boldsymbol{\\Sigma}_{12}\\boldsymbol{\\Sigma}_{22}^{-1}\\boldsymbol{\\Sigma}_{21}$", "That's the covariance of $\\mathbf{X}_1$ given $\\mathbf{X}_2$, the other complement."],
    ]),
  // level 2
  n(SC, "t50-scalar-a", 2, "For $\\mathbf{M} = \\begin{bmatrix}4 & 2\\\\2 & 5\\end{bmatrix}$, compute the Schur complement of the $(1, 1)$ entry, $5 - 2 \\cdot 4^{-1} \\cdot 2$.", 4),
  n(SC, "t50-scalar-d", 2, "For $\\mathbf{M} = \\begin{bmatrix}6 & 3\\\\3 & 2\\end{bmatrix}$, compute the Schur complement of the $(2, 2)$ entry, $a - bd^{-1}c$.", 1.5),
  m(SC, "t50-det-formula-d", 2, `With $\\mathbf{D}$ invertible, the determinant of ${MBLK} equals:`,
    "$\\det \\mathbf{D} \\cdot \\det(\\mathbf{A} - \\mathbf{B}\\mathbf{D}^{-1}\\mathbf{C})$",
    [
      ["$\\det \\mathbf{A}\\det \\mathbf{D} - \\det \\mathbf{B}\\det \\mathbf{C}$", "The scalar $ad - bc$ rule doesn't lift to blocks."],
      ["$\\det \\mathbf{A} \\cdot \\det(\\mathbf{A} - \\mathbf{B}\\mathbf{D}^{-1}\\mathbf{C})$", "The complement is paired with the block that was inverted, here $\\mathbf{D}$."],
      ["$\\det \\mathbf{D} \\cdot \\det(\\mathbf{D} - \\mathbf{C}\\mathbf{A}^{-1}\\mathbf{B})$", "This mixes the two formulas; the complement of $\\mathbf{A}$ goes with $\\det \\mathbf{A}$."],
    ]),
  m(SC, "t50-ldu-middle", 2, "In $\\mathbf{M} = \\begin{bmatrix}\\mathbf{I} & \\mathbf{0}\\\\\\mathbf{C}\\mathbf{A}^{-1} & \\mathbf{I}\\end{bmatrix}\\begin{bmatrix}\\mathbf{A} & \\mathbf{0}\\\\\\mathbf{0} & \\mathbf{S}\\end{bmatrix}\\begin{bmatrix}\\mathbf{I} & \\mathbf{A}^{-1}\\mathbf{B}\\\\\\mathbf{0} & \\mathbf{I}\\end{bmatrix}$, the block $\\mathbf{S}$ is:",
    "$\\mathbf{D} - \\mathbf{C}\\mathbf{A}^{-1}\\mathbf{B}$",
    [
      ["$\\mathbf{D}$", "Multiplying out gives $\\mathbf{C}\\mathbf{A}^{-1}\\mathbf{B} + \\mathbf{S}$ in the $(2, 2)$ slot, so $\\mathbf{S}$ must remove that term."],
      ["$\\mathbf{D}^{-1}$", "No inverse appears: the middle factor holds the elimination remainder itself."],
      ["$\\mathbf{A} - \\mathbf{B}\\mathbf{D}^{-1}\\mathbf{C}$", "That's the complement you get when eliminating with $\\mathbf{D}$, which isn't this factorisation."],
    ]),
  // level 3
  n(SC, "t50-3x3-s", 3, "Let $\\mathbf{M} = \\begin{bmatrix}2 & 0 & 1\\\\0 & 2 & 1\\\\1 & 1 & 3\\end{bmatrix}$ with top-left block $\\mathbf{A} = 2\\mathbf{I}_2$ and $\\mathbf{b} = [1, 1]$. Compute the Schur complement $3 - \\mathbf{b}^\\top\\mathbf{A}^{-1}\\mathbf{b}$.", 2),
  n(SC, "t50-3x3-det", 3, "For the same $\\mathbf{M}$, use $\\det \\mathbf{M} = \\det \\mathbf{A} \\cdot s$ with that Schur complement $s$ to compute $\\det \\mathbf{M}$.", 8),
  n(SC, "t50-cond-var", 3, "$(X_1, X_2)$ is bivariate normal with $\\text{Var}(X_1) = 9$, $\\text{Var}(X_2) = 4$ and $\\text{Cov}(X_1, X_2) = 3$. Compute $\\text{Var}(X_1 \\mid X_2)$.", 6.75),
  m(SC, "t50-pd-check", 3, "Judged by the Schur complement of the $(1, 1)$ entry, is $\\begin{bmatrix}1 & 2\\\\2 & 5\\end{bmatrix}$ positive definite?",
    "Yes: $1 > 0$ and $5 - 2^2/1 = 1 > 0$",
    [
      ["No: the off-diagonal $2$ exceeds the $(1, 1)$ entry", "Comparing entries isn't the test; the Schur complement $1$ is positive."],
      ["Yes, simply because both diagonal entries are positive", "Positive diagonals aren't enough: $\\begin{bmatrix}1 & 2\\\\2 & 1\\end{bmatrix}$ isn't positive definite."],
      ["You can't tell without computing the eigenvalues", "The Schur test is decisive: $a > 0$ and $d - b^2/a > 0$ is equivalent to positive definiteness."],
    ]),
  // level 4
  n(SC, "t50-inv-22", 4, "For $\\mathbf{M} = \\begin{bmatrix}2 & 1\\\\1 & 4\\end{bmatrix}$, compute $(\\mathbf{M}^{-1})_{22}$ as the reciprocal of the Schur complement of the $(1, 1)$ entry. Give $4$ decimal places.", 0.2857),
  n(SC, "t50-block-det", 4, "$\\mathbf{M} = \\begin{bmatrix}\\mathbf{I}_3 & \\mathbf{B}\\\\\\mathbf{B}^\\top & 5\\mathbf{I}_2\\end{bmatrix}$, where $\\mathbf{B}$ is $3 \\times 2$ with $\\mathbf{B}^\\top\\mathbf{B} = \\begin{bmatrix}2 & 1\\\\1 & 2\\end{bmatrix}$. Compute $\\det \\mathbf{M}$.", 8),
  n(SC, "t50-cond-mean", 4, "$(X_1, X_2)$ is bivariate normal with $\\mathbb{E}[X_1] = 1$, $\\mathbb{E}[X_2] = 2$, $\\text{Var}(X_1) = 4$, $\\text{Var}(X_2) = 5$ and $\\text{Cov}(X_1, X_2) = 2$. Find $\\mathbb{E}[X_2 \\mid X_1 = 3]$.", 3),
  m(SC, "t50-inv-11", 4, "With $\\mathbf{A}$ invertible and $\\mathbf{S} = \\mathbf{D} - \\mathbf{C}\\mathbf{A}^{-1}\\mathbf{B}$ invertible, the $(1, 1)$ block of $\\mathbf{M}^{-1}$ is:",
    "$\\mathbf{A}^{-1} + \\mathbf{A}^{-1}\\mathbf{B}\\mathbf{S}^{-1}\\mathbf{C}\\mathbf{A}^{-1}$",
    [
      ["$\\mathbf{A}^{-1}$", "That ignores the coupling blocks; it holds only when $\\mathbf{B}$ or $\\mathbf{C}$ is zero."],
      ["$\\mathbf{A}^{-1} - \\mathbf{A}^{-1}\\mathbf{B}\\mathbf{S}^{-1}\\mathbf{C}\\mathbf{A}^{-1}$", "Sign error: inverting the block-triangular factors gives $+$ here (check with $1 \\times 1$ blocks)."],
      ["$-\\mathbf{A}^{-1}\\mathbf{B}\\mathbf{S}^{-1}$", "That's the $(1, 2)$ block of $\\mathbf{M}^{-1}$."],
    ]),
  // level 5
  n(SC, "t50-3x3-inv33", 5, "$\\mathbf{M} = \\begin{bmatrix}1 & 0 & 1\\\\0 & 1 & 1\\\\1 & 1 & 4\\end{bmatrix}$. Using the top-left $\\mathbf{I}_2$ block, find the $(3, 3)$ entry of $\\mathbf{M}^{-1}$.", 0.5),
  n(SC, "t50-pd-threshold", 5, "The matrix $\\begin{bmatrix}2 & 1 & 1\\\\1 & 2 & 1\\\\1 & 1 & c\\end{bmatrix}$ is positive definite exactly when $c > c^*$. Find $c^*$. Give $4$ decimal places.", 0.6667),
  m(SC, "t50-inertia", 5, "Haynsworth: the inertia of $\\mathbf{M}$ is the inertia of $\\mathbf{A}$ plus that of the Schur complement $\\mathbf{M}/\\mathbf{A}$. A symmetric $\\mathbf{M}$ has a $3 \\times 3$ positive definite block $\\mathbf{A}$, and $\\mathbf{M}/\\mathbf{A}$ is $2 \\times 2$ with eigenvalues $4$ and $-1$. How many negative eigenvalues does $\\mathbf{M}$ have?",
    "$1$",
    [
      ["$0$", "A positive definite $\\mathbf{A}$ block doesn't make $\\mathbf{M}$ positive definite; the complement's sign counts too."],
      ["$2$", "Only the complement contributes negative eigenvalues here, and it has one."],
      ["It can't be determined without $\\mathbf{B}$", "Haynsworth's theorem makes the count depend only on $\\mathbf{A}$ and the complement."],
    ]),
  m(SC, "t50-precision", 5, "In a Gaussian with precision matrix $\\boldsymbol{\\Lambda} = \\boldsymbol{\\Sigma}^{-1}$ (partitioned like $\\boldsymbol{\\Sigma}$), the conditional covariance of $\\mathbf{X}_2$ given $\\mathbf{X}_1$ is:",
    "$\\boldsymbol{\\Lambda}_{22}^{-1}$",
    [
      ["$\\boldsymbol{\\Lambda}_{22}$", "The precision block is the inverse of the conditional covariance, not the covariance itself."],
      ["$\\boldsymbol{\\Sigma}_{22}$", "That's the marginal covariance, before conditioning."],
      ["$\\boldsymbol{\\Sigma}_{22}^{-1}$", "That inverts the marginal block; the Schur complement shows up as $(\\boldsymbol{\\Sigma}^{-1})_{22}^{-1}$ instead."],
    ]),
  s(SC, "t50-why-det", 5, "Explain why $\\det \\mathbf{M} = \\det \\mathbf{A} \\cdot \\det(\\mathbf{D} - \\mathbf{C}\\mathbf{A}^{-1}\\mathbf{B})$ when $\\mathbf{A}$ is invertible.",
    "Block elimination factors $\\mathbf{M}$ into unit block-triangular factors around $\\begin{bmatrix}\\mathbf{A} & \\mathbf{0}\\\\\\mathbf{0} & \\mathbf{S}\\end{bmatrix}$ (or as a unit lower factor times $\\begin{bmatrix}\\mathbf{A} & \\mathbf{B}\\\\\\mathbf{0} & \\mathbf{S}\\end{bmatrix}$), with $\\mathbf{S}$ the Schur complement.",
    "Unit block-triangular factors have determinant $1$, and a block-triangular or block-diagonal matrix has determinant equal to the product of its diagonal blocks' determinants, giving $\\det \\mathbf{A}\\det \\mathbf{S}$."),
  // level 6
  n(SC, "t50-det-via-d", 6, "The top-left entry of $\\mathbf{M} = \\begin{bmatrix}0 & 1 & 1\\\\1 & 2 & 0\\\\1 & 0 & 2\\end{bmatrix}$ is $0$, so use the Schur complement of the bottom-right block $\\mathbf{D} = 2\\mathbf{I}_2$ instead. Compute $\\det \\mathbf{M}$.", -4),
  // level 8
  n(SC, "t50-partial-min", 8, "$q(x, \\mathbf{y}) = [x, \\mathbf{y}]\\,\\mathbf{M}\\,[x, \\mathbf{y}]^\\top$ with $\\mathbf{M} = \\begin{bmatrix}5 & 1 & 2\\\\1 & 2 & 0\\\\2 & 0 & 4\\end{bmatrix}$ and $\\mathbf{y} \\in \\mathbb{R}^2$. Find $\\min_{\\mathbf{y}} q(1, \\mathbf{y})$.", 3.5),
  s(SC, "t50-cond-indep", 8, "For a Gaussian vector $(\\mathbf{X}_1, \\mathbf{X}_2)$, show that $\\mathbf{R} = \\mathbf{X}_2 - \\boldsymbol{\\Sigma}_{21}\\boldsymbol{\\Sigma}_{11}^{-1}\\mathbf{X}_1$ is independent of $\\mathbf{X}_1$, and use it to show that the conditional covariance of $\\mathbf{X}_2$ is the Schur complement.",
    "Computes $\\text{Cov}(\\mathbf{R}, \\mathbf{X}_1) = \\boldsymbol{\\Sigma}_{21} - \\boldsymbol{\\Sigma}_{21}\\boldsymbol{\\Sigma}_{11}^{-1}\\boldsymbol{\\Sigma}_{11} = \\mathbf{0}$; jointly Gaussian and uncorrelated means independent.",
    "Then given $\\mathbf{X}_1$, $\\mathbf{X}_2$ is a known shift of $\\mathbf{R}$, so its conditional covariance is $\\text{Cov}(\\mathbf{R}) = \\boldsymbol{\\Sigma}_{22} - \\boldsymbol{\\Sigma}_{21}\\boldsymbol{\\Sigma}_{11}^{-1}\\boldsymbol{\\Sigma}_{12}$, the Schur complement of $\\boldsymbol{\\Sigma}_{11}$."),
  s(SC, "t50-pd-inherits", 8, "Prove that if $\\mathbf{M} = \\begin{bmatrix}\\mathbf{A} & \\mathbf{B}\\\\\\mathbf{B}^\\top & \\mathbf{D}\\end{bmatrix}$ is symmetric positive definite, then so is its Schur complement $\\mathbf{D} - \\mathbf{B}^\\top\\mathbf{A}^{-1}\\mathbf{B}$.",
    "Chooses the test vector $\\mathbf{x} = [-\\mathbf{A}^{-1}\\mathbf{B}\\mathbf{y}, \\mathbf{y}]$ and shows $\\mathbf{x}^\\top\\mathbf{M}\\mathbf{x} = \\mathbf{y}^\\top(\\mathbf{D} - \\mathbf{B}^\\top\\mathbf{A}^{-1}\\mathbf{B})\\mathbf{y}$ (or uses the block congruence that turns $\\mathbf{M}$ into $\\operatorname{diag}(\\mathbf{A}, \\mathbf{S})$).",
    "Since $\\mathbf{x} \\ne \\mathbf{0}$ whenever $\\mathbf{y} \\ne \\mathbf{0}$, positive definiteness of $\\mathbf{M}$ makes this quadratic form positive, so $\\mathbf{S}$ is positive definite (equivalently, $\\mathbf{S}^{-1}$ is a diagonal block of the positive definite $\\mathbf{M}^{-1}$)."),
  // level 9
  s(SC, "t50-woodbury", 9, "Derive the Woodbury identity $(\\mathbf{A} + \\mathbf{U}\\mathbf{C}\\mathbf{V})^{-1} = \\mathbf{A}^{-1} - \\mathbf{A}^{-1}\\mathbf{U}(\\mathbf{C}^{-1} + \\mathbf{V}\\mathbf{A}^{-1}\\mathbf{U})^{-1}\\mathbf{V}\\mathbf{A}^{-1}$ from Schur complements.",
    "Uses a block matrix such as $\\begin{bmatrix}\\mathbf{A} & \\mathbf{U}\\\\\\mathbf{V} & -\\mathbf{C}^{-1}\\end{bmatrix}$ and computes the $(1, 1)$ block of its inverse two ways: via the complement of the $(2, 2)$ block, which gives $(\\mathbf{A} + \\mathbf{U}\\mathbf{C}\\mathbf{V})^{-1}$, and via the complement of $\\mathbf{A}$, which gives the right-hand side.",
    "Equating the two expressions for the same block yields the identity; it pays off when $\\mathbf{C}$ is small, since only a small matrix must be inverted."),
  s(SC, "t50-lmi", 9, "In $\\mathbf{M} = \\begin{bmatrix}\\mathbf{A} & \\mathbf{B}\\\\\\mathbf{B}^\\top & \\mathbf{D}\\end{bmatrix}$ the blocks $\\mathbf{A} \\succ 0$ and $\\mathbf{B}$ are fixed and you choose the symmetric $\\mathbf{D}$. Characterise every $\\mathbf{D}$ that makes $\\mathbf{M}$ positive semidefinite, and explain how this lets optimisation software handle constraints like $t \\ge \\mathbf{b}^\\top\\mathbf{A}^{-1}\\mathbf{b}$.",
    "$\\mathbf{M} \\succeq 0$ exactly when the Schur complement $\\mathbf{D} - \\mathbf{B}^\\top\\mathbf{A}^{-1}\\mathbf{B} \\succeq 0$, i.e. $\\mathbf{D} \\succeq \\mathbf{B}^\\top\\mathbf{A}^{-1}\\mathbf{B}$; the smallest admissible $\\mathbf{D}$ is the Schur term itself.",
    "Read backwards, a nonlinear constraint such as $t \\ge \\mathbf{b}^\\top\\mathbf{A}^{-1}\\mathbf{b}$ becomes $\\begin{bmatrix}\\mathbf{A} & \\mathbf{b}\\\\\\mathbf{b}^\\top & t\\end{bmatrix} \\succeq 0$, which is linear in the variables — a linear matrix inequality that semidefinite programming solves."),
  // level 10
  s(SC, "t50-precision-zero", 10, "A colleague claims: “if $(\\boldsymbol{\\Sigma}^{-1})_{12} = 0$ for a Gaussian vector, then $X_1$ and $X_2$ are independent.” Judge the claim, using Schur complements to explain what a zero precision entry really means.",
    "In general it's wrong: the $2 \\times 2$ block of the precision matrix for $(X_1, X_2)$ is the inverse of their conditional covariance given all other variables (a Schur complement), so a zero entry means conditional independence given the rest.",
    "Marginal independence needs $\\Sigma_{12} = 0$ instead; e.g. in a chain $X_1 \\to X_3 \\to X_2$ the precision entry is $0$ but $\\text{Cov}(X_1, X_2) \\ne 0$. Only when there are no other variables do the two notions coincide."),
  s(SC, "t50-kkt", 10, "For the saddle-point system $\\begin{bmatrix}\\mathbf{H} & \\mathbf{A}^\\top\\\\\\mathbf{A} & \\mathbf{0}\\end{bmatrix}$ with $\\mathbf{H} \\succ 0$ and $\\mathbf{A}$ of full row rank, find the Schur complement of $\\mathbf{H}$, deduce the inertia of the matrix, and judge when solving through this complement is a bad idea numerically.",
    "The complement is $-\\mathbf{A}\\mathbf{H}^{-1}\\mathbf{A}^\\top$, negative definite under the assumptions, so the matrix is invertible and indefinite with $n$ positive and $m$ negative eigenvalues (Haynsworth).",
    "Forming $\\mathbf{A}\\mathbf{H}^{-1}\\mathbf{A}^\\top$ explicitly destroys sparsity and amplifies errors when $\\mathbf{H}$ is ill-conditioned or nearly singular; null-space methods or a symmetric indefinite factorisation of the full system are safer then."),
];

const svd: Item[] = [
  // level 1
  m(SV, "t50-orth-factors", 1, "In $\\mathbf{A} = \\mathbf{U}\\boldsymbol{\\Sigma}\\mathbf{V}^\\top$, which factors are orthogonal?",
    "$\\mathbf{U}$ and $\\mathbf{V}$",
    [
      ["Only $\\mathbf{V}$", "Both outer factors are orthogonal: $\\mathbf{U}$ holds an orthonormal basis of $\\mathbb{R}^m$."],
      ["All three", "$\\boldsymbol{\\Sigma}$ is diagonal with nonnegative entries; it's orthogonal only if every $\\sigma_i = 1$."],
      ["Only $\\boldsymbol{\\Sigma}$", "$\\boldsymbol{\\Sigma}$ is the scaling factor, not a rotation."],
    ]),
  m(SV, "t50-sigma-shape", 1, "If $\\mathbf{A}$ is $5 \\times 3$, the $\\boldsymbol{\\Sigma}$ of its full SVD is:",
    "$5 \\times 3$",
    [
      ["$3 \\times 3$", "That's the thin (economy) SVD; the full SVD keeps $\\boldsymbol{\\Sigma}$ the same shape as $\\mathbf{A}$."],
      ["$5 \\times 5$", "That's the size of $\\mathbf{U}$ in the full SVD."],
      ["$3 \\times 5$", "That's the shape of $\\mathbf{A}^\\top$."],
    ]),
  m(SV, "t50-right-sv", 1, "The right singular vectors $\\mathbf{v}_i$ of $\\mathbf{A}$ are eigenvectors of:",
    "$\\mathbf{A}^\\top\\mathbf{A}$",
    [
      ["$\\mathbf{A}\\mathbf{A}^\\top$", "Its eigenvectors are the left singular vectors $\\mathbf{u}_i$."],
      ["$\\mathbf{A}$ itself", "$\\mathbf{A}$ may not be square, and even when it is its eigenvectors generally differ from the singular vectors."],
      ["$\\mathbf{A} + \\mathbf{A}^\\top$", "The symmetric part of $\\mathbf{A}$ has no direct link to its singular vectors."],
    ]),
  m(SV, "t50-outer", 1, "As a sum of rank-one matrices, the SVD of a rank-$r$ matrix reads:",
    "$\\mathbf{A} = \\sum_{i=1}^{r} \\sigma_i\\mathbf{u}_i\\mathbf{v}_i^\\top$",
    [
      ["$\\mathbf{A} = \\sum_{i=1}^{r} \\sigma_i\\mathbf{v}_i\\mathbf{u}_i^\\top$", "That's the expansion of $\\mathbf{A}^\\top$."],
      ["$\\mathbf{A} = \\sum_{i=1}^{r} \\sigma_i^2\\mathbf{u}_i\\mathbf{v}_i^\\top$", "Squared singular values belong to $\\mathbf{A}^\\top\\mathbf{A}$ and $\\mathbf{A}\\mathbf{A}^\\top$."],
      ["$\\mathbf{A} = \\sum_{i=1}^{r} \\sigma_i\\mathbf{u}_i^\\top\\mathbf{v}_i$", "$\\mathbf{u}_i^\\top\\mathbf{v}_i$ is a scalar (and needn't even be defined); the terms must be outer products."],
    ]),
  m(SV, "t50-existence", 1, "Which real matrices have a singular value decomposition?",
    "Every real matrix, of any shape",
    [
      ["Only square matrices", "Rectangular matrices have SVDs; $\\boldsymbol{\\Sigma}$ simply takes the shape of $\\mathbf{A}$."],
      ["Only symmetric matrices", "That's the restriction of the spectral theorem, which the SVD removes."],
      ["Only matrices of full rank", "Zero singular values handle rank deficiency."],
    ]),
  // level 2
  n(SV, "t50-scaled", 2, "$\\mathbf{A}$ has singular values $4$, $2$ and $1$. What is the largest singular value of $-3\\mathbf{A}$?", 12),
  m(SV, "t50-av", 2, "From $\\mathbf{A} = \\mathbf{U}\\boldsymbol{\\Sigma}\\mathbf{V}^\\top$, the product $\\mathbf{A}\\mathbf{v}_i$ equals:",
    "$\\sigma_i\\mathbf{u}_i$",
    [
      ["$\\sigma_i\\mathbf{v}_i$", "That would make $\\mathbf{v}_i$ an eigenvector; $\\mathbf{A}$ sends $\\mathbf{v}_i$ to the left singular direction."],
      ["$\\mathbf{u}_i$", "The stretch factor $\\sigma_i$ is missing."],
      ["$\\sigma_i^2\\mathbf{u}_i$", "$\\sigma_i^2$ appears for $\\mathbf{A}^\\top\\mathbf{A}\\mathbf{v}_i$, not $\\mathbf{A}\\mathbf{v}_i$."],
    ]),
  m(SV, "t50-transpose", 2, "If $\\mathbf{A} = \\mathbf{U}\\boldsymbol{\\Sigma}\\mathbf{V}^\\top$, an SVD of $\\mathbf{A}^\\top$ is:",
    "$\\mathbf{V}\\boldsymbol{\\Sigma}^\\top\\mathbf{U}^\\top$",
    [
      ["$\\mathbf{U}\\boldsymbol{\\Sigma}\\mathbf{V}^\\top$", "That's $\\mathbf{A}$ itself."],
      ["$\\mathbf{V}^\\top\\boldsymbol{\\Sigma}\\mathbf{U}$", "Transposing reverses the order and transposes each factor: $(\\mathbf{V}^\\top)^\\top = \\mathbf{V}$."],
      ["$\\mathbf{U}^\\top\\boldsymbol{\\Sigma}\\mathbf{V}$", "The order of the factors must reverse."],
    ]),
  // level 3
  n(SV, "t50-rank1-sv", 3, "Find the only nonzero singular value of $\\mathbf{u}\\mathbf{v}^\\top$ with $\\mathbf{u} = [1, 2, 2]$ and $\\mathbf{v} = [3, 4]$.", 15),
  n(SV, "t50-ata-eig", 3, "$\\mathbf{A}^\\top\\mathbf{A}$ has eigenvalues $25$, $9$ and $0$. Find $\\sigma_2$.", 3),
  m(SV, "t50-sym-indef", 3, "A symmetric $\\mathbf{A}$ has eigenvalues $3$ and $-5$. Its singular values are:",
    "$5$ and $3$",
    [
      ["$3$ and $-5$", "Singular values are never negative; for a symmetric matrix they're $|\\lambda_i|$."],
      ["$25$ and $9$", "Those are the eigenvalues of $\\mathbf{A}^\\top\\mathbf{A}$; take square roots."],
      ["$\\sqrt{5}$ and $\\sqrt{3}$", "That takes square roots of the eigenvalues of $\\mathbf{A}$, not of $\\mathbf{A}^\\top\\mathbf{A}$."],
    ]),
  // level 4
  n(SV, "t50-2x2-s1", 4, "Find $\\sigma_1$ of $\\begin{bmatrix}2 & 2\\\\-1 & 1\\end{bmatrix}$. Give $4$ decimal places.", 2.8284),
  n(SV, "t50-2x2-s2", 4, "Find $\\sigma_2$ of $\\begin{bmatrix}2 & 2\\\\-1 & 1\\end{bmatrix}$. Give $4$ decimal places.", 1.4142),
  n(SV, "t50-det-product", 4, "A $3 \\times 3$ matrix has $|\\det \\mathbf{A}| = 30$ and singular values $\\sigma_1 = 5$ and $\\sigma_2 = 3$. Find $\\sigma_3$.", 2),
  n(SV, "t50-u1", 4, "For $\\mathbf{A} = \\begin{bmatrix}3 & 0\\\\4 & 0\\end{bmatrix}$ with $\\mathbf{v}_1 = [1, 0]$, compute $\\mathbf{u}_1 = \\mathbf{A}\\mathbf{v}_1/\\sigma_1$ and enter its second entry.", 0.8),
  m(SV, "t50-nilpotent", 4, "Which is an SVD of $\\begin{bmatrix}0 & 2\\\\0 & 0\\end{bmatrix}$?",
    "$\\mathbf{U} = \\mathbf{I}$, $\\boldsymbol{\\Sigma} = \\operatorname{diag}(2, 0)$, $\\mathbf{V} = \\begin{bmatrix}0 & 1\\\\1 & 0\\end{bmatrix}$",
    [
      ["$\\mathbf{U} = \\mathbf{V} = \\mathbf{I}$, $\\boldsymbol{\\Sigma} = \\operatorname{diag}(2, 0)$", "That product is $\\operatorname{diag}(2, 0)$: the $2$ lands in the wrong column."],
      ["$\\boldsymbol{\\Sigma} = \\mathbf{0}$, because all eigenvalues are $0$", "A nilpotent matrix has zero eigenvalues but a nonzero singular value: it stretches $\\mathbf{e}_2$ to length $2$."],
      ["$\\mathbf{U} = \\mathbf{V} = \\begin{bmatrix}0 & 1\\\\1 & 0\\end{bmatrix}$, $\\boldsymbol{\\Sigma} = \\operatorname{diag}(2, 0)$", "That product is $\\operatorname{diag}(0, 2)$, not the given matrix."],
    ]),
  // level 5
  n(SV, "t50-3x2", 5, "Find $\\sigma_1$ of $\\mathbf{A} = \\begin{bmatrix}1 & 1\\\\1 & 1\\\\1 & -1\\end{bmatrix}$.", 2),
  n(SV, "t50-frob-det", 5, "A $2 \\times 2$ matrix has $\\|\\mathbf{A}\\|_F^2 = 26$ and $|\\det \\mathbf{A}| = 5$. Find $\\sigma_1$.", 5),
  m(SV, "t50-eig-vs-sv", 5, "For a square, non-symmetric $\\mathbf{A}$, how does the largest eigenvalue magnitude $|\\lambda|_{\\max}$ compare with $\\sigma_1$?",
    "$|\\lambda|_{\\max} \\le \\sigma_1$ always",
    [
      ["They are always equal", "Equality holds for normal (e.g. symmetric) matrices, not in general."],
      ["$|\\lambda|_{\\max} \\ge \\sigma_1$ always", "Backwards: $\\begin{bmatrix}0 & 2\\\\0 & 0\\end{bmatrix}$ has $|\\lambda|_{\\max} = 0$ but $\\sigma_1 = 2$."],
      ["There is no general relation", "If $\\mathbf{A}\\mathbf{x} = \\lambda\\mathbf{x}$ with $\\|\\mathbf{x}\\| = 1$, then $|\\lambda| = \\|\\mathbf{A}\\mathbf{x}\\| \\le \\sigma_1$."],
    ]),
  m(SV, "t50-ata-accuracy", 5, "Why do good libraries compute singular values directly instead of taking square roots of the eigenvalues of $\\mathbf{A}^\\top\\mathbf{A}$?",
    "Forming $\\mathbf{A}^\\top\\mathbf{A}$ squares the condition number, so small singular values lose accuracy",
    [
      ["$\\mathbf{A}^\\top\\mathbf{A}$ might not be symmetric", "$\\mathbf{A}^\\top\\mathbf{A}$ is always symmetric."],
      ["The eigenvalues of $\\mathbf{A}^\\top\\mathbf{A}$ can be negative", "$\\mathbf{A}^\\top\\mathbf{A}$ is positive semidefinite (rounding aside)."],
      ["The route gives wrong answers even in exact arithmetic", "In exact arithmetic it's correct; the trouble is rounding error."],
    ]),
  s(SV, "t50-why-nonneg", 5, "Why are singular values real and nonnegative even when $\\mathbf{A}$ has complex or negative eigenvalues?",
    "They are square roots of the eigenvalues of $\\mathbf{A}^\\top\\mathbf{A}$, which is symmetric positive semidefinite ($\\mathbf{x}^\\top\\mathbf{A}^\\top\\mathbf{A}\\mathbf{x} = \\|\\mathbf{A}\\mathbf{x}\\|^2 \\ge 0$), so those eigenvalues are real and $\\ge 0$.",
    "Any sign can be absorbed into a singular vector (replace $\\mathbf{u}_i$ by $-\\mathbf{u}_i$), so $\\sigma_i \\ge 0$ is always achievable; geometrically they're the lengths of the image ellipse's semi-axes."),
  // level 6
  n(SV, "t50-dilation-min", 6, "$\\mathbf{A}$ is $3 \\times 3$ with singular values $4$, $2$ and $1$. The symmetric matrix $\\begin{bmatrix}\\mathbf{0} & \\mathbf{A}\\\\\\mathbf{A}^\\top & \\mathbf{0}\\end{bmatrix}$ has eigenvalues $\\pm\\sigma_i$. What is its smallest eigenvalue?", -4),
  n(SV, "t50-det-shift", 6, "$\\mathbf{A}$ is $4 \\times 4$ with singular values $3$, $2$, $1$ and $0.5$. Compute $\\det(\\mathbf{A}^\\top\\mathbf{A} + \\mathbf{I})$.", 125),
  // level 8
  s(SV, "t50-sub-mult", 8, "Prove $\\sigma_1(\\mathbf{A}\\mathbf{B}) \\le \\sigma_1(\\mathbf{A})\\,\\sigma_1(\\mathbf{B})$, starting from $\\sigma_1(\\mathbf{M}) = \\max_{\\|\\mathbf{x}\\| = 1}\\|\\mathbf{M}\\mathbf{x}\\|$ (and justify that characterisation from the SVD).",
    "Justifies $\\|\\mathbf{M}\\mathbf{x}\\| \\le \\sigma_1\\|\\mathbf{x}\\|$: expand $\\mathbf{x} = \\sum c_i\\mathbf{v}_i$, so $\\|\\mathbf{M}\\mathbf{x}\\|^2 = \\sum\\sigma_i^2c_i^2 \\le \\sigma_1^2\\sum c_i^2$, with equality at $\\mathbf{x} = \\mathbf{v}_1$.",
    "Chains it: $\\|\\mathbf{A}\\mathbf{B}\\mathbf{x}\\| \\le \\sigma_1(\\mathbf{A})\\|\\mathbf{B}\\mathbf{x}\\| \\le \\sigma_1(\\mathbf{A})\\sigma_1(\\mathbf{B})\\|\\mathbf{x}\\|$, then takes the maximum over unit $\\mathbf{x}$."),
  s(SV, "t50-polar", 8, "Use the SVD to construct the polar decomposition $\\mathbf{A} = \\mathbf{Q}\\mathbf{P}$ of a square matrix, with $\\mathbf{Q}$ orthogonal and $\\mathbf{P}$ symmetric positive semidefinite.",
    "Inserts $\\mathbf{V}^\\top\\mathbf{V} = \\mathbf{I}$: $\\mathbf{A} = (\\mathbf{U}\\mathbf{V}^\\top)(\\mathbf{V}\\boldsymbol{\\Sigma}\\mathbf{V}^\\top)$, so $\\mathbf{Q} = \\mathbf{U}\\mathbf{V}^\\top$ and $\\mathbf{P} = \\mathbf{V}\\boldsymbol{\\Sigma}\\mathbf{V}^\\top$.",
    "Checks the properties: $\\mathbf{Q}$ is a product of orthogonal matrices, hence orthogonal; $\\mathbf{P}$ is symmetric with eigenvalues $\\sigma_i \\ge 0$, and in fact $\\mathbf{P} = (\\mathbf{A}^\\top\\mathbf{A})^{1/2}$."),
  // level 9
  s(SV, "t50-procrustes", 9, "Orthogonal Procrustes: find the orthogonal $\\mathbf{Q}$ minimising $\\|\\mathbf{Q}\\mathbf{A} - \\mathbf{B}\\|_F$, and justify your answer with the SVD $\\mathbf{B}\\mathbf{A}^\\top = \\mathbf{U}\\boldsymbol{\\Sigma}\\mathbf{V}^\\top$.",
    "Expanding the square, $\\|\\mathbf{Q}\\mathbf{A}\\|_F$ doesn't depend on $\\mathbf{Q}$, so the task is to maximise $\\operatorname{tr}(\\mathbf{Q}^\\top\\mathbf{B}\\mathbf{A}^\\top) = \\operatorname{tr}(\\mathbf{V}^\\top\\mathbf{Q}^\\top\\mathbf{U}\\boldsymbol{\\Sigma})$.",
    "With the orthogonal $\\mathbf{Z} = \\mathbf{V}^\\top\\mathbf{Q}^\\top\\mathbf{U}$, $\\operatorname{tr}(\\mathbf{Z}\\boldsymbol{\\Sigma}) = \\sum z_{ii}\\sigma_i \\le \\sum\\sigma_i$ since $|z_{ii}| \\le 1$; equality at $\\mathbf{Z} = \\mathbf{I}$, i.e. $\\mathbf{Q} = \\mathbf{U}\\mathbf{V}^\\top$."),
  s(SV, "t50-dilation-proof", 9, "Prove that the symmetric matrix $\\begin{bmatrix}\\mathbf{0} & \\mathbf{A}\\\\\\mathbf{A}^\\top & \\mathbf{0}\\end{bmatrix}$ ($\\mathbf{A}$ is $m \\times n$ of rank $r$) has eigenvalues $\\pm\\sigma_1, \\ldots, \\pm\\sigma_r$ and otherwise zeros, and give its eigenvectors.",
    "Checks that $[\\mathbf{u}_i, \\pm\\mathbf{v}_i]$ is mapped to $[\\pm\\mathbf{A}\\mathbf{v}_i, \\mathbf{A}^\\top\\mathbf{u}_i] = [\\pm\\sigma_i\\mathbf{u}_i, \\sigma_i\\mathbf{v}_i] = \\pm\\sigma_i[\\mathbf{u}_i, \\pm\\mathbf{v}_i]$.",
    "Accounts for the rest: vectors $[\\mathbf{u}, \\mathbf{0}]$ with $\\mathbf{u} \\in N(\\mathbf{A}^\\top)$ and $[\\mathbf{0}, \\mathbf{v}]$ with $\\mathbf{v} \\in N(\\mathbf{A})$ give the remaining $m + n - 2r$ zero eigenvalues (all eigenvectors orthogonal, so this is the full spectrum)."),
  // level 10
  m(SV, "t50-graded-accuracy", 10, "A $1000 \\times 1000$ matrix has singular values $\\sigma_i = 2^{-i}$. It is stored and decomposed in double precision (unit roundoff $\\approx 10^{-16}$) with a backward-stable SVD. Which statement is right?",
    "From roughly $i = 54$ on, the computed $\\sigma_i$ have no relative accuracy: the errors are about $10^{-16}\\sigma_1$ in absolute terms",
    [
      ["All $\\sigma_i$ are computed to full relative accuracy, because the algorithm is backward stable", "Backward stability bounds the error by about $10^{-16}\\|\\mathbf{A}\\|_2$ absolutely, which swamps singular values below that size."],
      ["Only $\\sigma_1$ is accurate; every other value is noise", "Values well above $10^{-16}\\sigma_1$ (the first fifty or so) are computed accurately."],
      ["The SVD algorithm fails to converge for such a spread of singular values", "SVD algorithms converge regardless of the spread; the issue is accuracy, not convergence."],
    ]),
  s(SV, "t50-weyl-rank", 10, "Weyl's inequality for singular values says $|\\sigma_i(\\mathbf{A} + \\mathbf{E}) - \\sigma_i(\\mathbf{A})| \\le \\|\\mathbf{E}\\|_2$. Explain why it holds, and what it implies about deciding the rank of a matrix measured with noise.",
    "Justifies it, e.g. through the min–max characterisation of $\\sigma_i$ (adding $\\mathbf{E}$ changes $\\|\\mathbf{A}\\mathbf{x}\\|$ by at most $\\|\\mathbf{E}\\|_2$ for every unit $\\mathbf{x}$), or through Weyl's eigenvalue inequality applied to the symmetric dilation.",
    "Consequence: singular values are perfectly conditioned, but noise of size $\\|\\mathbf{E}\\|$ makes the zero ones small positive numbers, so rank can only be judged numerically — count the $\\sigma_i$ clearly above the noise level, which works only when there's a visible gap."),
  s(SV, "t50-solver-choice", 10, "You must solve a $10^4 \\times 50$ least-squares problem whose singular values range from $10^3$ down to $10^{-9}$, with data accurate to about $10^{-6}$. Compare the normal equations, QR, and a truncated SVD, and recommend one.",
    "Normal equations square the condition number ($\\kappa^2 \\approx 10^{24}$), hopeless in double precision; QR handles $\\kappa \\approx 10^{12}$ stably but still returns a solution blown up along directions with tiny $\\sigma_i$, which amplify data noise enormously.",
    "Truncated SVD (or ridge/Tikhonov regularisation) drops or damps components with $\\sigma_i$ below a noise-based threshold, giving a stable, interpretable solution at the cost of some bias; the cut-off is chosen from the singular value gap and the noise level."),
];

const uniqueness: Item[] = [
  // level 1
  m(US, "t50-sigma-unique", 1, "With the convention $\\sigma_1 \\ge \\sigma_2 \\ge \\cdots \\ge 0$, the matrix $\\boldsymbol{\\Sigma}$ in an SVD of $\\mathbf{A}$ is:",
    "Uniquely determined by $\\mathbf{A}$",
    [
      ["Unique only when the singular values are distinct", "Repeated values cause freedom in $\\mathbf{U}$ and $\\mathbf{V}$, not in $\\boldsymbol{\\Sigma}$."],
      ["Unique only for square matrices", "$\\boldsymbol{\\Sigma}$ is determined for every shape."],
      ["Unique up to the sign of each diagonal entry", "The convention $\\sigma_i \\ge 0$ removes the signs; they're absorbed into the singular vectors."],
    ]),
  m(US, "t50-pair-flip", 1, "If $(\\mathbf{u}_i, \\mathbf{v}_i)$ is a singular pair for $\\sigma_i > 0$, which of these is also a valid pair?",
    "$(-\\mathbf{u}_i, -\\mathbf{v}_i)$",
    [
      ["$(-\\mathbf{u}_i, \\mathbf{v}_i)$", "Flipping only one breaks $\\mathbf{A}\\mathbf{v}_i = \\sigma_i\\mathbf{u}_i$."],
      ["$(2\\mathbf{u}_i, 2\\mathbf{v}_i)$", "Singular vectors must stay unit length."],
      ["$(\\mathbf{v}_i, \\mathbf{u}_i)$", "Swapping gives a singular pair of $\\mathbf{A}^\\top$, not of $\\mathbf{A}$."],
    ]),
  m(US, "t50-rank1-unique", 1, "With distinct nonzero singular values, $\\mathbf{u}_i$ and $\\mathbf{v}_i$ are unique only up to sign. Which object is unique?",
    "The rank-one term $\\sigma_i\\mathbf{u}_i\\mathbf{v}_i^\\top$",
    [
      ["The vector $\\mathbf{u}_i$", "It can be replaced by $-\\mathbf{u}_i$ (with $-\\mathbf{v}_i$)."],
      ["The matrix $\\mathbf{U}$", "Each column can flip sign, so $\\mathbf{U}$ isn't unique."],
      ["The vector $\\mathbf{u}_i + \\mathbf{v}_i$", "A joint flip negates it, so it isn't unique (and may not even be defined if sizes differ)."],
    ]),
  m(US, "t50-repeated-object", 1, "When a singular value $\\sigma > 0$ is repeated, what is uniquely determined?",
    "The subspace spanned by its right singular vectors (an eigenspace of $\\mathbf{A}^\\top\\mathbf{A}$)",
    [
      ["Each singular vector, up to sign", "That's the situation for a simple singular value; a repeated one allows rotations."],
      ["Nothing: the SVD becomes arbitrary", "The singular values and the singular subspaces stay fixed."],
      ["The first singular vector of the repeated group", "Any unit vector in the subspace can be listed first."],
    ]),
  m(US, "t50-spd", 1, "For a symmetric positive definite $\\mathbf{A} = \\mathbf{Q}\\boldsymbol{\\Lambda}\\mathbf{Q}^\\top$ with eigenvalues in decreasing order, one valid SVD is:",
    "$\\mathbf{U} = \\mathbf{V} = \\mathbf{Q}$ and $\\boldsymbol{\\Sigma} = \\boldsymbol{\\Lambda}$",
    [
      ["$\\mathbf{U} = \\mathbf{Q}$, $\\mathbf{V} = \\mathbf{Q}^\\top$, $\\boldsymbol{\\Sigma} = \\boldsymbol{\\Lambda}$", "Then $\\mathbf{U}\\boldsymbol{\\Sigma}\\mathbf{V}^\\top = \\mathbf{Q}\\boldsymbol{\\Lambda}\\mathbf{Q}$, which isn't $\\mathbf{A}$ in general."],
      ["$\\mathbf{U} = \\mathbf{V} = \\mathbf{Q}$ and $\\boldsymbol{\\Sigma} = \\boldsymbol{\\Lambda}^2$", "$\\boldsymbol{\\Lambda}^2$ holds the eigenvalues of $\\mathbf{A}^\\top\\mathbf{A}$; the singular values are $\\lambda_i$ themselves here."],
      ["None: a symmetric matrix's SVD needs $\\mathbf{U} \\ne \\mathbf{V}$", "For positive definite matrices the eigendecomposition already is an SVD."],
    ]),
  // level 2
  n(US, "t50-subspace-dim", 2, "A $6 \\times 6$ matrix has singular values $5, 5, 3, 2, 2, 2$. What is the dimension of the singular subspace for $\\sigma = 2$?", 3),
  n(US, "t50-null-cols", 2, "A $7 \\times 4$ matrix has rank $2$. In its full SVD, how many columns of $\\mathbf{V}$ may be any orthonormal basis of $N(\\mathbf{A})$?", 2),
  m(US, "t50-not-valid-v", 2, "$\\mathbf{A} = \\operatorname{diag}(3, 1)$ and $\\boldsymbol{\\Sigma} = \\operatorname{diag}(3, 1)$. Which is $\\textbf{NOT}$ a valid $\\mathbf{V}$ in an SVD of $\\mathbf{A}$?",
    "$\\frac{1}{\\sqrt{2}}\\begin{bmatrix}1 & -1\\\\1 & 1\\end{bmatrix}$",
    [
      ["$\\mathbf{I}$", "Valid: take $\\mathbf{U} = \\mathbf{I}$."],
      ["$\\begin{bmatrix}-1 & 0\\\\0 & 1\\end{bmatrix}$", "Valid: take $\\mathbf{U}$ equal to the same sign matrix."],
      ["$-\\mathbf{I}$", "Valid: take $\\mathbf{U} = -\\mathbf{I}$; both columns flip together."],
    ]),
  m(US, "t50-scale", 2, "Given an SVD $\\mathbf{U}\\boldsymbol{\\Sigma}\\mathbf{V}^\\top$ of $\\mathbf{A}$, an SVD of $2\\mathbf{A}$ is:",
    "$\\mathbf{U}(2\\boldsymbol{\\Sigma})\\mathbf{V}^\\top$",
    [
      ["$(2\\mathbf{U})\\boldsymbol{\\Sigma}\\mathbf{V}^\\top$", "$2\\mathbf{U}$ isn't orthogonal; scaling belongs in $\\boldsymbol{\\Sigma}$."],
      ["$\\mathbf{U}(4\\boldsymbol{\\Sigma})\\mathbf{V}^\\top$", "That's an SVD of $4\\mathbf{A}$."],
      ["$(\\sqrt{2}\\mathbf{U})\\boldsymbol{\\Sigma}(\\sqrt{2}\\mathbf{V})^\\top$", "Scaled factors are no longer orthogonal."],
    ]),
  // level 3
  m(US, "t50-complex-phase", 3, "For a complex matrix with distinct nonzero singular values (SVD $\\mathbf{U}\\boldsymbol{\\Sigma}\\mathbf{V}^*$), a singular pair $(\\mathbf{u}_i, \\mathbf{v}_i)$ is unique up to:",
    "A common unit complex factor $e^{i\\theta}$ on both vectors",
    [
      ["A sign $\\pm 1$ only", "That's the real case; over $\\mathbb{C}$ any unit scalar keeps $\\mathbf{v}_i$ a unit eigenvector of $\\mathbf{A}^*\\mathbf{A}$."],
      ["Independent phases on $\\mathbf{u}_i$ and $\\mathbf{v}_i$", "$\\mathbf{u}_i = \\mathbf{A}\\mathbf{v}_i/\\sigma_i$ forces the same phase on $\\mathbf{u}_i$."],
      ["Nothing: complex SVDs are unique", "Multiplying both by $e^{i\\theta}$ leaves $\\sigma_i\\mathbf{u}_i\\mathbf{v}_i^*$ unchanged."],
    ]),
  n(US, "t50-params-block", 3, "$\\mathbf{A} = \\operatorname{diag}(5, 5, 5, 1)$. Its singular vectors for $\\sigma = 5$ can be rotated within a $3$-dimensional subspace. How many continuous parameters does this freedom have (the dimension of the rotations of $\\mathbb{R}^3$)?", 3),
  n(US, "t50-which-axis", 3, "$\\mathbf{A} = \\operatorname{diag}(1, 4, 2)$. In any SVD, $\\mathbf{v}_1 = \\pm\\mathbf{e}_k$. Find $k$.", 2),
  n(US, "t50-flip-u", 3, "An SVD of $\\mathbf{A}$ (distinct singular values) has $\\mathbf{u}_2 = [0.6, 0.8]$ and $\\mathbf{v}_2 = [1, 0]$. Another SVD has $\\mathbf{v}_2 = [-1, 0]$. What is the first entry of its $\\mathbf{u}_2$?", -0.6),
  // level 4
  n(US, "t50-sign-patterns", 4, "A $4 \\times 4$ matrix has singular values $6, 3, 3, 1$. Ignoring the continuum of choices for the repeated value $3$, how many sign patterns are there for the pairs belonging to $6$ and $1$?", 4),
  n(US, "t50-v1-entry", 4, "For $\\mathbf{A} = \\begin{bmatrix}0 & 3\\\\2 & 0\\end{bmatrix}$, find $\\mathbf{v}_1$ (up to sign) and enter the absolute value of its second entry.", 1),
  n(US, "t50-u1-from-v1", 4, "For the same $\\mathbf{A} = \\begin{bmatrix}0 & 3\\\\2 & 0\\end{bmatrix}$, choose $\\mathbf{v}_1 = [0, -1]$. Compute $\\mathbf{u}_1$ and enter its first entry.", -1),
  n(US, "t50-rotated-u", 4, "$\\mathbf{A} = 3\\mathbf{I}_2$ and you choose $\\mathbf{V} = \\begin{bmatrix}0 & -1\\\\1 & 0\\end{bmatrix}$ with $\\boldsymbol{\\Sigma} = 3\\mathbf{I}_2$. What must the $(2, 1)$ entry of $\\mathbf{U}$ be?", 1),
  m(US, "t50-same-gram", 4, "$\\mathbf{A}$ and $\\mathbf{B}$ satisfy $\\mathbf{A}^\\top\\mathbf{A} = \\mathbf{B}^\\top\\mathbf{B}$. What must they share?",
    "The singular values, and a common valid choice of $\\mathbf{V}$",
    [
      ["The left singular vectors $\\mathbf{U}$", "$\\mathbf{B} = \\mathbf{Q}\\mathbf{A}$ for orthogonal $\\mathbf{Q}$ has the same Gram matrix but left vectors $\\mathbf{Q}\\mathbf{U}$."],
      ["They must be equal", "$\\mathbf{B} = -\\mathbf{A}$ or any $\\mathbf{Q}\\mathbf{A}$ has the same $\\mathbf{B}^\\top\\mathbf{B}$."],
      ["Only the rank", "The Gram matrix fixes $\\mathbf{V}$ and every $\\sigma_i^2$, far more than the rank."],
    ]),
  // level 5
  n(US, "t50-null-choices", 5, "$\\mathbf{A} = \\begin{bmatrix}1 & 1\\\\1 & 1\\end{bmatrix}$ has singular values $2$ and $0$. How many different unit vectors can serve as $\\mathbf{v}_2$?", 2),
  n(US, "t50-wedin-ratio", 5, "Wedin's theorem bounds the rotation of singular vectors by about $\\|\\mathbf{E}\\|_2/\\delta$, where $\\delta$ is the gap to the neighbouring singular values. Compute this ratio for $\\|\\mathbf{E}\\|_2 = 10^{-3}$ and $\\delta = 0.05$.", 0.02),
  m(US, "t50-linked-blocks", 5, "When a singular value $\\sigma > 0$ is repeated, the choices of the matching columns of $\\mathbf{U}$ and $\\mathbf{V}$ are:",
    "Linked: rotating $\\mathbf{V}$’s block by an orthogonal $\\mathbf{Q}$ forces the same $\\mathbf{Q}$ on $\\mathbf{U}$’s block",
    [
      ["Independent: any orthonormal basis for each", "That breaks $\\mathbf{A}\\mathbf{v}_i = \\sigma\\mathbf{u}_i$; once $\\mathbf{V}$'s block is chosen, $\\mathbf{U}$'s block is $\\mathbf{A}\\mathbf{V}_{\\text{block}}/\\sigma$."],
      ["Fixed up to sign", "Repeated values allow whole rotations, not just signs."],
      ["Linked only when $\\mathbf{A}$ is square", "The link comes from $\\mathbf{A}\\mathbf{v}_i = \\sigma\\mathbf{u}_i$, for any shape."],
    ]),
  m(US, "t50-tall-u", 5, "A $5 \\times 2$ matrix has rank $2$ and $\\sigma_1 > \\sigma_2$. Which columns of its full $\\mathbf{U}$ are determined up to sign by $\\mathbf{A}$?",
    "Only $\\mathbf{u}_1$ and $\\mathbf{u}_2$",
    [
      ["All five", "$\\mathbf{u}_3, \\mathbf{u}_4, \\mathbf{u}_5$ can be any orthonormal basis of $N(\\mathbf{A}^\\top)$."],
      ["None of them", "$\\mathbf{u}_i = \\mathbf{A}\\mathbf{v}_i/\\sigma_i$ pins down the first two up to sign."],
      ["Only $\\mathbf{u}_3, \\mathbf{u}_4, \\mathbf{u}_5$", "Backwards: those are the free ones."],
    ]),
  s(US, "t50-why-sign", 5, "Explain why a simple nonzero singular value determines $\\mathbf{v}_i$ up to sign, and why $\\mathbf{u}_i$ then has no freedom left.",
    "$\\mathbf{v}_i$ is a unit eigenvector of $\\mathbf{A}^\\top\\mathbf{A}$ for the simple eigenvalue $\\sigma_i^2$; that eigenspace is a line, so only $\\pm\\mathbf{v}_i$ remain.",
    "$\\mathbf{u}_i = \\mathbf{A}\\mathbf{v}_i/\\sigma_i$ is forced once $\\mathbf{v}_i$ is chosen, so the two signs flip together."),
  // level 7
  n(US, "t50-param-count", 7, "A $5 \\times 5$ matrix has singular values $4, 4, 4, 1, 1$. Counting continuous parameters only (rotations inside each repeated block), how many does the SVD freedom have?", 4),
  // level 8
  s(US, "t50-prove-signs", 8, "Suppose $\\mathbf{A} = \\mathbf{U}\\boldsymbol{\\Sigma}\\mathbf{V}^\\top = \\mathbf{U}'\\boldsymbol{\\Sigma}\\mathbf{V}'^\\top$ is square and invertible with distinct singular values. Prove that $\\mathbf{V}' = \\mathbf{V}\\mathbf{D}$ and $\\mathbf{U}' = \\mathbf{U}\\mathbf{D}$ for a single diagonal sign matrix $\\mathbf{D}$.",
    "$\\mathbf{V}$ and $\\mathbf{V}'$ both diagonalise $\\mathbf{A}^\\top\\mathbf{A}$ with the same distinct eigenvalues in the same order, so corresponding columns agree up to sign: $\\mathbf{V}' = \\mathbf{V}\\mathbf{D}$.",
    "Then $\\mathbf{U}' = \\mathbf{A}\\mathbf{V}'\\boldsymbol{\\Sigma}^{-1} = \\mathbf{A}\\mathbf{V}\\mathbf{D}\\boldsymbol{\\Sigma}^{-1} = \\mathbf{A}\\mathbf{V}\\boldsymbol{\\Sigma}^{-1}\\mathbf{D} = \\mathbf{U}\\mathbf{D}$, because diagonal matrices commute."),
  s(US, "t50-pca-disagree", 8, "Two analysts run PCA on the same data with different software. Their PC2 loading vectors are exact negatives of each other, and their PC3 and PC4 loadings differ by a rotation. Explain both discrepancies with SVD uniqueness, and say whether either result is wrong.",
    "Sign: a simple singular value fixes its singular vectors only up to a joint sign flip, so $-\\mathbf{v}_2$ (with negated scores) is equally valid.",
    "Rotation: PC3 and PC4 must share an equal (or numerically equal) singular value, so only their span is determined; any orthonormal basis of it is valid. Neither result is wrong — compare subspaces or projectors instead of individual vectors."),
  // level 9
  s(US, "t50-discontinuity", 9, "Give an example showing that singular vectors are not continuous functions of the matrix even though singular values are, and say what does vary continuously.",
    "E.g. $\\mathbf{A}(t) = \\operatorname{diag}(1 + t, 1 - t)$: for $t > 0$ the top right singular vector is $\\mathbf{e}_1$, for $t < 0$ it is $\\mathbf{e}_2$, so it jumps at $t = 0$, while the singular values $1 \\pm t$ move continuously.",
    "The singular subspace (or its projector) for a cluster of singular values separated by a gap from the rest varies continuously, with sensitivity governed by that gap (Wedin / Davis–Kahan)."),
  // level 10
  m(US, "t50-sign-rule", 10, "A pipeline makes its SVD output reproducible by flipping each pair so that the largest-magnitude entry of $\\mathbf{v}_i$ is positive. When can the output still differ between runs or machines?",
    "When singular values are repeated or nearly repeated, or when two entries of some $\\mathbf{v}_i$ (nearly) tie in magnitude",
    [
      ["Never: the rule removes every freedom", "It removes sign freedom only; repeated values leave whole rotations free."],
      ["Only when $\\mathbf{A}$ is rank-deficient", "A simple zero singular value is handled by the rule like any other; the problems are clusters and ties."],
      ["Only for complex matrices", "Real matrices with clustered singular values break it too."],
    ]),
  s(US, "t50-tracking", 10, "Every hour you recompute the top $3$ right singular vectors of a slowly changing matrix and want to track them over time. Design a matching procedure that is robust to SVD non-uniqueness, and say what you'd monitor to know when tracking individual vectors stops being meaningful.",
    "Align each new basis with the previous one instead of comparing raw outputs: fix signs by the sign of $\\mathbf{v}_i^{\\text{new}} \\cdot \\mathbf{v}_i^{\\text{old}}$, or, within groups of close singular values, solve an orthogonal Procrustes problem $\\min_{\\mathbf{Q}}\\|\\mathbf{V}_{\\text{new}}\\mathbf{Q} - \\mathbf{V}_{\\text{old}}\\|_F$.",
    "Monitor the gaps $\\sigma_i - \\sigma_{i+1}$ (including $\\sigma_3 - \\sigma_4$) and the principal angles between successive subspaces; when a gap closes, individual vectors aren't identifiable and only the span of the cluster should be tracked."),
  s(US, "t50-sym-pm", 10, "A symmetric $2 \\times 2$ matrix has eigenvalues $3$ and $-3$. Explain why its SVD is not unique up to signs even though its eigendecomposition is, and describe all of its SVDs.",
    "The singular values are $|3| = |-3| = 3$, a repeated value: $\\mathbf{A}^\\top\\mathbf{A} = 9\\mathbf{I}$, so any orthonormal $\\mathbf{V}$ works, whereas the eigenvalues $3 \\ne -3$ are distinct, pinning each eigenvector down to sign.",
    "All SVDs: $\\boldsymbol{\\Sigma} = 3\\mathbf{I}$, $\\mathbf{V}$ any orthogonal matrix, and $\\mathbf{U} = \\mathbf{A}\\mathbf{V}/3$ (orthogonal because $\\mathbf{A}/3$ is orthogonal)."),
];

export const t50LinearAlgebra41Items: Item[] = [...schur, ...svd, ...uniqueness];
