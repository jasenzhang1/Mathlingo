import type { WikiArticle } from "../types";

export const numpyArrayCreationWiki: WikiArticle = {
  conceptId: "numpy-array-creation",
  summary:
    "np.array() wraps data you already have; the rest of NumPy's creation functions build data from a " +
    "description instead — a range, a count, a shape, a fill value. arange and linspace are the two " +
    "everyone reaches for first, and they answer two different questions: 'step by this amount' versus " +
    "'give me exactly this many points.' zeros, ones, full, and eye build a shape with no data at all yet, " +
    "which is exactly what a placeholder or an identity matrix needs.",

  sections: [
    {
      heading: "arange vs. linspace",
      blocks: [
        {
          kind: "table",
          headers: ["Call", "Produces", "Note"],
          rows: [
            ["np.arange(5)", "[0, 1, 2, 3, 4]", "Like range(), but returns an array; stop is exclusive"],
            ["np.arange(2, 10, 2)", "[2, 4, 6, 8]", "start, stop, step — stop still exclusive"],
            ["np.linspace(0, 1, 5)", "[0., 0.25, 0.5, 0.75, 1.]", "5 evenly spaced points; stop is inclusive"],
            ["np.linspace(0, 10, 5, endpoint=False)", "[0., 2., 4., 6., 8.]", "Excludes the stop value on request"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "arange with a float step accumulates rounding error",
          text:
            "np.arange(0, 1, 0.1) can produce 10 or 11 elements depending on floating-point rounding, " +
            "because it's built by repeated addition of the step. linspace(0, 1, 11) asks for a count " +
            "instead of a step, sidestepping the problem entirely — prefer it whenever you know how many " +
            "points you want rather than how far apart they should be.",
        },
        {
          kind: "prose",
          text:
            "The rule of thumb: reach for arange when you're thinking in terms of a step size (every 2nd " +
            "integer, every 0.5 units), and linspace when you're thinking in terms of a count (100 points " +
            "between 0 and 1 for a plot).",
        },
      ],
    },
    {
      heading: "Shapes with no data yet: zeros, ones, full, eye",
      blocks: [
        {
          kind: "table",
          headers: ["Call", "Produces", "Common use"],
          rows: [
            ["np.zeros((3, 4))", "a 3x4 array of 0.0", "A placeholder to fill in during a loop"],
            ["np.ones((2, 2))", "a 2x2 array of 1.0", "A starting point for weights or counts"],
            ["np.full((2, 3), 7)", "a 2x3 array of 7", "Any constant fill value"],
            ["np.eye(3)", "the 3x3 identity matrix", "1s on the diagonal, 0 elsewhere"],
            ["np.random.rand(3, 3)", "a 3x3 array, uniform on [0, 1)", "Quick random data for testing"],
          ],
        },
        {
          kind: "prose",
          text:
            "Every one of these takes a shape (a tuple of dimension sizes) rather than data — np.zeros(5) " +
            "and np.zeros((5,)) are the same 1-D array of five zeros, while np.zeros((5, 1)) is a 5x1 " +
            "column instead. Getting the shape argument right here is what most often determines whether " +
            "a later broadcast succeeds or fails.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "dtype defaults to float64 for these — and to int for arange on integers",
          text:
            "np.zeros(3) is dtype float64 by default; np.arange(3) is int64 because its arguments are " +
            "integers. Pass dtype=int or dtype=float explicitly when the default doesn't match what the " +
            "rest of your computation expects — the fix from numpy-arrays applies here too.",
        },
      ],
    },
    {
      heading: "reshape combines with a flat creation call",
      blocks: [
        {
          kind: "code",
          source: "np.arange(12).reshape(3, 4)\n# array([[ 0,  1,  2,  3],\n#        [ 4,  5,  6,  7],\n#        [ 8,  9, 10, 11]])",
          caption: "A quick way to build a small test matrix without typing every entry.",
        },
        {
          kind: "example",
          title: "Building a 3x3 matrix of the numbers 1 through 9",
          problem: "Construct a 3x3 array containing 1 through 9, row by row, in one line.",
          steps: [
            "Generate the flat sequence first: np.arange(1, 10) gives [1, 2, ..., 9].",
            "reshape(3, 3) reinterprets that same flat data as three rows of three.",
            "reshape requires the total element count to match: 9 elements into a 3x3 shape (9 slots) works exactly.",
          ],
          answer: "np.arange(1, 10).reshape(3, 3)",
        },
      ],
    },
  ],

  references: [
    { source: "NumPy user guide", locator: "Array creation routines" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
