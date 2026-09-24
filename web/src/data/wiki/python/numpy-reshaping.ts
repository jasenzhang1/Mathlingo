import type { WikiArticle } from "../types";

export const numpyReshapingWiki: WikiArticle = {
  conceptId: "numpy-reshaping",
  summary: "reshape reinterprets the same data under a new shape, so the element count must match and the result is usually a view rather than a copy. -1 in a shape means 'work this dimension out from the others'. Stacking joins arrays along an axis; splitting is the inverse.",

  sections: [
    {
      heading: "reshape, ravel, and -1",
      blocks: [
        {
          kind: "code",
          source: "import numpy as np\n\na = np.arange(6)                 # [0 1 2 3 4 5]\na.reshape(2, 3)                  # [[0 1 2], [3 4 5]]\na.reshape(3, -1)                 # -1 becomes 2\na.reshape(2, 4)                  # ValueError: cannot reshape size 6 into (2,4)\n\nm.ravel()                        # flatten to 1-D, a view where possible\nm.flatten()                      # flatten to 1-D, always a copy\nm.T                              # transpose, also a view\n\na[:, None]                       # add an axis: shape (6,) -> (6, 1)",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "Row-major order is what reshape follows",
          text: "Elements are laid out last-axis-fastest, so reshaping fills the final dimension first. np.arange(6).reshape(2, 3) gives rows [0 1 2] and [3 4 5], not columns. Passing order=\"F\" switches to column-major if you are interoperating with Fortran or MATLAB conventions.",
        },
      ],
    },
    {
      heading: "Stacking and splitting",
      blocks: [
        {
          kind: "code",
          source: "np.concatenate([a, b])           # along an existing axis\nnp.concatenate([a, b], axis=1)   # side by side\n\nnp.vstack([a, b])                # stack as rows\nnp.hstack([a, b])                # stack as columns\nnp.stack([a, b])                 # a NEW axis — shape gains a dimension\n\nnp.split(a, 3)                   # three equal parts\nnp.array_split(a, 3)             # tolerates an uneven split",
        },
        {
          kind: "definitions",
          items: [
            { term: "concatenate vs stack", description: "concatenate joins along an axis that already exists, keeping the number of dimensions. stack creates a new axis, so two (3,) arrays become (2, 3)." },
            { term: "split vs array_split", description: "split insists the pieces divide evenly and raises otherwise; array_split makes them as equal as it can." },
            { term: "Shapes must agree", description: "Everything but the joining axis must match exactly. A mismatch is the most common error here, and the message names both shapes." },
          ],
        },
      ],
    },
  ],

  references: [
    { source: "NumPy User Guide", locator: "Array manipulation routines" },
    { source: "NumPy API", locator: "numpy.reshape" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
