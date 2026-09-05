import type { WikiArticle } from "../types";

export const numpyMatricesWiki: WikiArticle = {
  conceptId: "numpy-matrices",
  summary:
    "A 2-D NumPy array is a matrix, and NumPy gives matrix multiplication its own operator — @ — precisely " +
    "because * already means something else: elementwise multiplication. Confusing the two is the single " +
    "most common NumPy bug that produces a plausible, wrong, same-shaped-looking answer instead of an " +
    "error. Around that distinction sit the small set of linear-algebra 'goodies' — transpose, identity, " +
    "inverse, solve — that turn an array into a working matrix toolkit.",

  sections: [
    {
      heading: "@ is matrix multiplication; * is elementwise",
      blocks: [
        {
          kind: "table",
          headers: ["Expression", "On A, B both (2, 2)", "Meaning"],
          rows: [
            ["A * B", "elementwise product, shape (2, 2)", "A[i,j] * B[i,j] at every position"],
            ["A @ B", "matrix product, shape (2, 2)", "row-by-column dot products"],
            ["np.dot(A, B)", "same as A @ B for 2-D arrays", "the older, more general spelling"],
            ["A.T", "shape (2, 2), transposed", "rows and columns swapped"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "A * B silently 'succeeds' when you meant A @ B",
          text:
            "If A and B are both square and the same shape, A * B runs without error — it just computes " +
            "the wrong thing. There's no exception to catch this; the only defense is knowing which " +
            "operator you actually need. Elementwise: same-shaped arrays combined position by position. " +
            "Matrix product: rows of A combined with columns of B.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Matrix multiplication needs the inner dimensions to match",
          text:
            "A @ B requires A's number of columns to equal B's number of rows: (m, k) @ (k, n) → (m, n). " +
            "A (3, 4) @ (4, 2) works and gives shape (3, 2); a (3, 4) @ (3, 2) raises ValueError, because " +
            "4 ≠ 3.",
        },
      ],
    },
    {
      heading: "Matrix-vector products, and the shape they produce",
      blocks: [
        {
          kind: "code",
          source: "A = np.arange(6).reshape(2, 3)   # shape (2, 3)\nx = np.array([1, 0, 1])          # shape (3,)\nA @ x                              # shape (2,) — one dot product per row of A",
        },
        {
          kind: "example",
          title: "Applying a linear transformation to a batch of vectors",
          problem: "A is a (2, 3) transformation matrix. X holds 100 stacked 3-vectors as a (100, 3) array. Compute the transformed vectors.",
          steps: [
            "Each row of X is one 3-vector; the transformation should apply to each independently.",
            "A @ x for one vector x needs x's length (3) to match A's columns (3) — it does.",
            "For all 100 at once, transpose the roles: X @ A.T gives shape (100, 3) @ (3, 2) = (100, 2).",
          ],
          answer: "X @ A.T — one row per original vector, now transformed to 2 dimensions.",
        },
      ],
    },
    {
      heading: "The other goodies: identity, inverse, and solve",
      blocks: [
        {
          kind: "table",
          headers: ["Call", "Result", "Note"],
          rows: [
            ["np.eye(n)", "the n x n identity matrix", "A @ np.eye(n) == A"],
            ["np.linalg.inv(A)", "A⁻¹", "Only defined for a square, non-singular A"],
            ["np.linalg.det(A)", "the determinant of A", "0 means A has no inverse"],
            ["np.linalg.solve(A, b)", "x such that A @ x == b", "Prefer this over computing inv(A) @ b — it's faster and more numerically stable"],
          ],
        },
        {
          kind: "callout",
          tone: "insight",
          title: "solve(A, b) over inv(A) @ b",
          text:
            "Both mathematically solve A @ x = b, but np.linalg.solve avoids forming the inverse " +
            "explicitly, which is both cheaper and better-conditioned numerically. Reach for inv() only " +
            "when you actually need the inverse matrix itself, not just one solution.",
        },
      ],
    },
  ],

  references: [
    { source: "NumPy user guide", locator: "Linear algebra (numpy.linalg)" },
    { source: "VanderPlas, Python Data Science Handbook", locator: "Ch. 2, Computation on Arrays" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
