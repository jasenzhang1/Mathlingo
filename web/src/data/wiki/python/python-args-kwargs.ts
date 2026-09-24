import type { WikiArticle } from "../types";

export const pythonArgsKwargsWiki: WikiArticle = {
  conceptId: "python-args-kwargs",
  summary: "*args collects any leftover positional arguments into a tuple; **kwargs collects any leftover keyword arguments into a dict. The same two stars mean the opposite thing at a call site, where they unpack a sequence or a mapping into separate arguments. The names args and kwargs are pure convention — the stars do the work.",

  sections: [
    {
      heading: "Collecting, in a definition",
      blocks: [
        {
          kind: "code",
          source: "def summarise(label, *values, **options):\n    return label, values, options\n\nsummarise(\"x\", 1, 2, 3, sort=True)\n# ('x', (1, 2, 3), {'sort': True})",
        },
        {
          kind: "definitions",
          items: [
            { term: "*args", description: "Binds a tuple of every positional argument beyond the named parameters. Empty tuple if there are none — never None." },
            { term: "**kwargs", description: "Binds a dict of every keyword argument that does not match a named parameter. Empty dict if there are none." },
            { term: "Order in the signature", description: "Named parameters, then *args, then keyword-only parameters, then **kwargs. Anything after *args can only be passed by keyword." },
          ],
        },
      ],
    },
    {
      heading: "Unpacking, at a call site",
      blocks: [
        {
          kind: "prose",
          text: "The same syntax used in a call does the reverse: * spreads an iterable across positional parameters and ** spreads a mapping across keyword parameters. This is what makes a wrapper function possible — accept *args, **kwargs and hand them straight on.",
        },
        {
          kind: "code",
          source: "def area(width, height):\n    return width * height\n\ndims = (3, 4)\narea(*dims)                  # 12, same as area(3, 4)\n\nnamed = {\"width\": 3, \"height\": 4}\narea(**named)                # 12\n\ndef logged(fn, *args, **kwargs):\n    print(\"calling\", fn.__name__)\n    return fn(*args, **kwargs)",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "One star, two jobs",
          text: "In a def, * means collect; in a call, * means spread. They are inverses, which is exactly why the pass-through wrapper works: the collect in the definition and the spread in the inner call cancel out, and the wrapped function sees the arguments it would have received directly.",
        },
      ],
    },
  ],

  references: [
    { source: "Python Tutorial", locator: "§4.8.3 Arbitrary Argument Lists" },
    { source: "Python Tutorial", locator: "§4.8.5 Unpacking Argument Lists" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
