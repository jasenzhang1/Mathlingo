import type { WikiArticle } from "../types";

export const pythonSlicingWiki: WikiArticle = {
  conceptId: "python-slicing",
  summary:
    "A slice pulls out a range of items at once, using the half-open convention: a[i:j] includes index i " +
    "but stops before index j. That one design choice is what makes len(a[i:j]) == j - i and " +
    "a[:k] + a[k:] == a true for every k — and it's also why a slice, unlike an index, never raises on " +
    "out-of-range bounds.",

  sections: [
    {
      heading: "start:stop:step, and why stop is exclusive",
      blocks: [
        {
          kind: "table",
          headers: ["Expression", "On a = [10, 20, 30, 40, 50]", "Note"],
          rows: [
            ["a[1:4]", "[20, 30, 40]", "Stops before index 4"],
            ["a[:3]", "[10, 20, 30]", "Omitted start means 0"],
            ["a[3:]", "[40, 50]", "Omitted stop means len(a)"],
            ["a[:]", "[10, 20, 30, 40, 50]", "A full copy of the list"],
            ["a[::2]", "[10, 30, 50]", "Step of 2"],
            ["a[::-1]", "[50, 40, 30, 20, 10]", "Reversed copy, via a negative step"],
          ],
        },
        {
          kind: "code",
          source: "a[:k] + a[k:] == a        len(a[i:j]) == j - i",
          caption: "The two identities the half-open convention exists to make true.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "A slice forgives what an index will not",
          text:
            "a[10] on a five-element list raises IndexError. a[10:20] returns [] instead. Slicing clamps " +
            "to the ends silently — convenient in a pipeline, but it means an empty result can mean " +
            "'nothing matched' or 'your bounds were nonsense,' and the slice won't tell you which.",
        },
      ],
    },
    {
      heading: "Slicing builds a new list",
      blocks: [
        {
          kind: "prose",
          text:
            "Unlike plain assignment (b = a, which points a second name at the same list), a slice always " +
            "constructs a new list object — even a[:] with no bounds at all. b = a[:] gives you an " +
            "independent shallow copy: appending to b afterward does not change a.",
        },
        {
          kind: "example",
          title: "How many elements survive a slice",
          problem: "a has 10 elements, indexed 0 through 9. How many elements are in a[3:8]?",
          steps: [
            "The slice includes index 3 and stops before index 8.",
            "That's indices 3, 4, 5, 6, 7 — five indices.",
            "Equivalently, len(a[3:8]) == 8 - 3 == 5.",
          ],
          answer: "5",
        },
      ],
    },
  ],

  references: [
    { source: "Python Language Reference", locator: "§6.3 Primaries — slicings" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
