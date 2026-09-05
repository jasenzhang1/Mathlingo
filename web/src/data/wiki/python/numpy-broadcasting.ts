import type { WikiArticle } from "../types";

export const numpyBroadcastingWiki: WikiArticle = {
  conceptId: "numpy-broadcasting",
  summary:
    "Broadcasting is the rule that lets arrays of different shapes combine elementwise without " +
    "anyone writing a loop or materialising a copy. Two shapes are compared from the trailing axis " +
    "backwards; axes match if they are equal or if one of them is 1, and a 1 is stretched to fit. " +
    "Its companion is the axis argument on reductions, which is the other half of the same idea: " +
    "axis names the dimension that disappears.",

  sections: [
    {
      heading: "The rule",
      blocks: [
        {
          kind: "list",
          ordered: true,
          items: [
            "Line the two shapes up from the right, padding the shorter one with leading 1s.",
            "For each aligned pair of axes: they are compatible if equal, or if either is 1.",
            "A 1 is stretched to the other's length — conceptually, not by copying memory.",
            "Any other mismatch raises ValueError: operands could not be broadcast together.",
          ],
        },
        {
          kind: "table",
          headers: ["Shape A", "Shape B", "Result", "Why"],
          rows: [
            ["(3, 4)", "(4,)", "(3, 4)", "B is padded to (1, 4); the 1 stretches over the 3 rows"],
            ["(3, 4)", "(3, 1)", "(3, 4)", "The trailing 1 stretches over the 4 columns"],
            ["(3, 1)", "(1, 4)", "(3, 4)", "Both stretch — the outer-product shape"],
            ["(3, 4)", "(3,)", "error", "Trailing axes 4 and 3 are neither equal nor 1"],
            ["(5, 1, 3)", "(4, 3)", "(5, 4, 3)", "Padded to (1, 4, 3); every aligned pair is equal or 1"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "(3, 4) with (3,) fails — and the fix says what you meant",
          text:
            "Subtracting a per-row value from a (3, 4) matrix is the natural thing to want, and the " +
            "natural spelling fails, because a bare (3,) aligns against the columns. Reshape it to " +
            "(3, 1) — with x[:, None] — and the intent becomes explicit: this vector indexes rows.",
        },
      ],
    },

    {
      heading: "axis is the dimension that disappears",
      blocks: [
        {
          kind: "prose",
          text:
            "a.sum(axis=0) on a (3, 4) array returns shape (4,): axis 0 is consumed, and what is left " +
            "is a per-column total. a.sum(axis=1) returns shape (3,) — a per-row total. The wording " +
            "people reach for (“sum over rows”) is ambiguous, and the shape is not: whichever axis " +
            "you name is the one that is gone from the answer.",
        },
        {
          kind: "code",
          source: "A.shape == (3, 4)\nA.sum(axis=0).shape == (4,)   # axis 0 collapsed: column sums\nA.sum(axis=1).shape == (3,)   # axis 1 collapsed: row sums\nA.sum(axis=1, keepdims=True).shape == (3, 1)",
          caption: "keepdims leaves the collapsed axis in place with length 1 — exactly the shape broadcasting wants back.",
        },
        {
          kind: "example",
          title: "Centring each row",
          problem: "Subtract each row's mean from that row of a (3, 4) array A.",
          steps: [
            "The per-row means are A.mean(axis=1), of shape (3,) — one number per row.",
            "A - A.mean(axis=1) fails: (3, 4) against (3,) misaligns, as the table above shows.",
            "keepdims=True gives shape (3, 1) instead, which aligns against the rows.",
            "The 1 stretches across all 4 columns, so each row's mean is subtracted from that row.",
          ],
          answer: "A - A.mean(axis=1, keepdims=True). Without keepdims, use A.mean(axis=1)[:, None].",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "keepdims exists so the result can broadcast back",
          text:
            "A reduction normally drops an axis, which is what you want for a report and wrong for " +
            "the next arithmetic step. keepdims=True keeps it at length 1 — precisely the value " +
            "broadcasting knows how to stretch. Centring, normalising, and softmax all use it.",
        },
      ],
    },

    {
      heading: "What it costs, and what it does not",
      blocks: [
        {
          kind: "prose",
          text:
            "Broadcasting does not copy the stretched operand — it reads the same memory repeatedly " +
            "with a stride of zero along that axis. But the result is a full array. a[:, None] - " +
            "a[None, :] on 10,000 values builds a 10⁸-element matrix, which is 800 MB in float64. " +
            "The operand is free; the output is not.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "A broadcast that succeeds is not a broadcast that is right",
          text:
            "Two shapes that both happen to be square, or a (n,) that aligns with the wrong axis, " +
            "will broadcast without error and give a transposed or outer-product answer. Assert the " +
            "output shape you expect — it is the only check that catches this.",
        },
      ],
    },
  ],

  references: [
    { source: "NumPy user guide", locator: "Broadcasting; Array creation and reductions" },
    { source: "VanderPlas, Python Data Science Handbook", locator: "Ch. 2, Computation on Arrays — Broadcasting" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
