import type { Item, ParamSpec } from "../../../lib/assessment/types";
import { makeBuilders } from "../authoring";
import { EXPANSION } from "./source";

/**
 * Templated linear-algebra computations: the method is fixed, the numbers are
 * drawn fresh every time the question is served, and the key is computed by a
 * verified solver (lib/assessment/templating.ts). These are the questions a
 * learner can meet again and again without recognising the answer.
 *
 * Stems write a vector's components as "[{x1}, {x2}]" (points as "({x1}, {x2})") and matrix entries as
 * "{m11}" with a space before each placeholder — a brace group straight after
 * `}` or a letter is read as LaTeX, not as a placeholder.
 */
const { tmpl } = makeBuilders(EXPANSION);

/** Components x1…xn drawn from [lo, hi]. */
const vec = (prefix: string, n: number, lo = -6, hi = 6): ParamSpec[] =>
  Array.from({ length: n }, (_, i) => ({ name: `${prefix}${i + 1}`, range: [lo, hi] as [number, number] }));

/** Entries m11…mnn drawn from [lo, hi]. */
const mat = (prefix: string, n: number, lo = -5, hi = 5): ParamSpec[] =>
  Array.from({ length: n * n }, (_, k) => ({
    name: `${prefix}${Math.floor(k / n) + 1}${(k % n) + 1}`,
    range: [lo, hi] as [number, number],
  }));

/** A coefficient that is never 0 or ±1, so the scaling actually shows. */
const coef = (name: string): ParamSpec => ({ name, choices: [-4, -3, -2, 2, 3, 4, 5] });
/** A positive coefficient, so "+ {b}" never renders as "+ -2". */
const posCoef = (name: string): ParamSpec => ({ name, choices: [2, 3, 4, 5] });
/** Keeps a vector away from zero so norms and angles are defined. */
const nonzero = (...names: string[]): ParamSpec[] => [{ name: "_", choices: [0], constraints: names.map((n) => `${n} != 0`) }];

/** A vector, in square brackets: "[{x1}, {x2}]". */
const vecTeX = (prefix: string, n: number) =>
  `[${Array.from({ length: n }, (_, i) => `{${prefix}${i + 1}}`).join(", ")}]`;
/** A point, in parentheses: "({x1}, {x2})". */
const pointTeX = (prefix: string, n: number) =>
  `(${Array.from({ length: n }, (_, i) => `{${prefix}${i + 1}}`).join(", ")})`;
const mat2TeX = (prefix: string) =>
  `\\begin{bmatrix} {${prefix}11} & {${prefix}12} \\\\ {${prefix}21} & {${prefix}22} \\end{bmatrix}`;
const mat3TeX = (prefix: string) =>
  `\\begin{bmatrix} {${prefix}11} & {${prefix}12} & {${prefix}13} \\\\ {${prefix}21} & {${prefix}22} & {${prefix}23} \\\\ {${prefix}31} & {${prefix}32} & {${prefix}33} \\end{bmatrix}`;

const VE = "vectors";
const VO = "vector-operations";
const DP = "dot-product";
const VN = "vector-norm";
const VA = "vector-angles";
const VP = "vector-projection";
const OV = "orthogonal-vectors";
const MM = "matrix-multiplication";
const DET = "determinant";
const EIG = "eigenvalues-eigenvectors";

export const laTemplateItems: Item[] = [
  // --- vectors --------------------------------------------------------------------------
  tmpl(
    { concept: VE, slug: "t-displacement", cognitive: "apply", level: 2, seconds: 30,
      stem: `Find the displacement vector from the point $P = ${pointTeX("x", 2)}$ to the point $Q = ${pointTeX("y", 2)}$.` },
    "linearCombination",
    [{ name: "a", choices: [-1] }, { name: "b", choices: [1] }, ...vec("x", 2), ...vec("y", 2)],
  ),
  tmpl(
    { concept: VE, slug: "t-distance", cognitive: "apply", level: 3, seconds: 45,
      stem: `Find the distance between the points $${pointTeX("x", 2)}$ and $${pointTeX("y", 2)}$. Give $2$ decimal places.` },
    "distance",
    [...vec("x", 2), ...vec("y", 2), { name: "_", choices: [0], constraints: ["x1 != y1"] }],
    0.005,
  ),

  // --- vector operations ----------------------------------------------------------------
  tmpl(
    { concept: VO, slug: "t-lincomb-2", cognitive: "apply", level: 2, seconds: 40,
      stem: `Let $\\mathbf{x} = ${vecTeX("x", 2)}$ and $\\mathbf{y} = ${vecTeX("y", 2)}$. Compute ${"$"} {a}\\mathbf{x} + {b}\\mathbf{y}$.` },
    "linearCombination",
    [coef("a"), posCoef("b"), ...vec("x", 2), ...vec("y", 2)],
  ),
  tmpl(
    { concept: VO, slug: "t-lincomb-3", cognitive: "apply", level: 3, seconds: 60,
      stem: `Let $\\mathbf{x} = ${vecTeX("x", 3)}$ and $\\mathbf{y} = ${vecTeX("y", 3)}$. Compute ${"$"} {a}\\mathbf{x} + {b}\\mathbf{y}$.` },
    "linearCombination",
    [coef("a"), posCoef("b"), ...vec("x", 3), ...vec("y", 3)],
  ),
  tmpl(
    { concept: VO, slug: "t-cross", cognitive: "apply", level: 5, seconds: 90,
      stem: `Compute the cross product $\\mathbf{x} \\times \\mathbf{y}$ for $\\mathbf{x} = ${vecTeX("x", 3)}$ and $\\mathbf{y} = ${vecTeX("y", 3)}$.` },
    "crossProduct",
    [...vec("x", 3, -4, 4), ...vec("y", 3, -4, 4)],
  ),

  // --- dot product ----------------------------------------------------------------------
  tmpl(
    { concept: DP, slug: "t-dot-3", cognitive: "apply", level: 2.5, seconds: 30,
      stem: `Compute $\\mathbf{x} \\cdot \\mathbf{y}$ for $\\mathbf{x} = ${vecTeX("x", 3)}$ and $\\mathbf{y} = ${vecTeX("y", 3)}$.` },
    "dotProduct",
    [...vec("x", 3), ...vec("y", 3)],
  ),
  tmpl(
    { concept: DP, slug: "t-dot-4", cognitive: "apply", level: 3.5, seconds: 45,
      stem: `Compute $\\mathbf{x} \\cdot \\mathbf{y}$ for $\\mathbf{x} = ${vecTeX("x", 4)}$ and $\\mathbf{y} = ${vecTeX("y", 4)}$.` },
    "dotProduct",
    [...vec("x", 4), ...vec("y", 4)],
  ),

  // --- norms ----------------------------------------------------------------------------
  tmpl(
    { concept: VN, slug: "t-norm-3", cognitive: "apply", level: 3, seconds: 45,
      stem: `Compute $\\|\\mathbf{x}\\|$ for $\\mathbf{x} = ${vecTeX("x", 3)}$. Give $2$ decimal places.` },
    "norm",
    [...vec("x", 3), ...nonzero("x1")],
    0.005,
  ),
  tmpl(
    { concept: VN, slug: "t-unit-2", cognitive: "apply", level: 4, seconds: 60,
      stem: `Normalise $\\mathbf{x} = ${vecTeX("x", 2)}$ to a unit vector. Give each entry to $3$ decimal places.` },
    "unitVector",
    [...vec("x", 2), ...nonzero("x1")],
    0.003,
  ),

  // --- angles and projections -----------------------------------------------------------
  tmpl(
    { concept: VA, slug: "t-cos-3", cognitive: "apply", level: 4.5, seconds: 75,
      stem: `Compute $\\cos\\theta$ for the angle $\\theta$ between $\\mathbf{x} = ${vecTeX("x", 3)}$ and $\\mathbf{y} = ${vecTeX("y", 3)}$. Give $3$ decimal places.` },
    "cosAngle",
    [...vec("x", 3), ...vec("y", 3), ...nonzero("x1", "y2")],
    0.003,
  ),
  tmpl(
    { concept: VP, slug: "t-scalar-proj", cognitive: "apply", level: 4, seconds: 60,
      stem: `Compute the scalar projection of $\\mathbf{x} = ${vecTeX("x", 2)}$ onto $\\mathbf{y} = ${vecTeX("y", 2)}$. Give $2$ decimal places.` },
    "scalarProjection",
    [...vec("x", 2), ...vec("y", 2), ...nonzero("y1")],
    0.005,
  ),
  tmpl(
    { concept: VP, slug: "t-vector-proj", cognitive: "apply", level: 5, seconds: 90,
      stem: `Compute $\\operatorname{proj}_{\\mathbf{y}}\\mathbf{x}$ for $\\mathbf{x} = ${vecTeX("x", 2)}$ and $\\mathbf{y} = ${vecTeX("y", 2)}$. Give each entry to $2$ decimal places.` },
    "vectorProjection",
    [...vec("x", 2), ...vec("y", 2), ...nonzero("y1")],
    0.005,
  ),

  // --- orthogonality --------------------------------------------------------------------
  tmpl(
    { concept: OV, slug: "t-orth-k-2", cognitive: "apply", level: 3.5, seconds: 45,
      stem: `Find $k$ such that $[${"{x1}"}, k]$ is orthogonal to $${vecTeX("y", 2)}$. Give $3$ decimal places if it isn't a whole number.` },
    "orthogonalCompletion",
    [...vec("x", 1), ...vec("y", 2), ...nonzero("y2")],
  ),
  tmpl(
    { concept: OV, slug: "t-orth-k-3", cognitive: "apply", level: 4.5, seconds: 60,
      stem: `Find $k$ such that $[${"{x1}"}, ${"{x2}"}, k]$ is orthogonal to $${vecTeX("y", 3)}$. Give $3$ decimal places if it isn't a whole number.` },
    "orthogonalCompletion",
    [...vec("x", 2), ...vec("y", 3), ...nonzero("y3")],
  ),

  // --- matrices -------------------------------------------------------------------------
  tmpl(
    { concept: MM, slug: "t-matvec-2", cognitive: "apply", level: 3, seconds: 45,
      stem: `Compute $\\mathbf{M}\\mathbf{x}$ for $\\mathbf{M} = ${mat2TeX("m")}$ and $\\mathbf{x} = ${vecTeX("x", 2)}$.` },
    "matVec2",
    [...mat("m", 2), ...vec("x", 2)],
  ),
  tmpl(
    { concept: MM, slug: "t-matmul-entry", cognitive: "apply", level: 4, seconds: 60,
      stem: `For $\\mathbf{M} = ${mat2TeX("m")}$ and $\\mathbf{N} = ${mat2TeX("n")}$, find the $(${"{i}"}, ${"{j}"})$ entry of $\\mathbf{M}\\mathbf{N}$.` },
    "matMulEntry2",
    [...mat("m", 2), ...mat("n", 2), { name: "i", choices: [1, 2] }, { name: "j", choices: [1, 2] }],
  ),
  tmpl(
    { concept: DET, slug: "t-det-2", cognitive: "apply", level: 2.5, seconds: 30,
      stem: `Compute $\\det ${mat2TeX("m")}$.` },
    "det2",
    mat("m", 2, -6, 6),
  ),
  tmpl(
    { concept: DET, slug: "t-det-3", cognitive: "apply", level: 5, seconds: 120,
      stem: `Compute $\\det ${mat3TeX("m")}$.` },
    "det3",
    mat("m", 3, -3, 3),
  ),
  tmpl(
    { concept: EIG, slug: "t-sym-eig-max", cognitive: "apply", level: 5, seconds: 90,
      stem: `Find the larger eigenvalue of $\\begin{bmatrix} {a} & {b} \\\\ {b} & {c} \\end{bmatrix}$. Give $3$ decimal places.` },
    "symEigMax2",
    [{ name: "a", range: [-4, 6] }, { name: "b", range: [-4, 4] }, { name: "c", range: [-4, 6] }, ...nonzero("b")],
    0.002,
  ),
];
