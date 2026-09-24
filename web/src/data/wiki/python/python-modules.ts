import type { WikiArticle } from "../types";

export const pythonModulesWiki: WikiArticle = {
  conceptId: "python-modules",
  summary: "A module is just a .py file. import runs that file top to bottom exactly once per process, caches the result in sys.modules, and binds a name to it. Everything else — the forms of import, the __main__ guard, circular-import trouble — follows from those two facts: it runs, and it runs once.",

  sections: [
    {
      heading: "The forms of import",
      blocks: [
        {
          kind: "code",
          source: "import statistics                  # bind the module\nstatistics.mean(xs)\n\nimport numpy as np                 # bind it under another name\nfrom statistics import mean        # bind one name from it\nfrom statistics import mean as avg\n\nfrom statistics import *           # bind everything — avoid",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "from module import * hides where names came from",
          text: "A reader — and a linter — can no longer tell whether mean is yours, the module's, or a third thing shadowing both. It also means a new name added to that module in a later version can silently shadow one of yours. The explicit forms cost a few characters and remove the whole class of problem.",
        },
      ],
    },
    {
      heading: "Run once, and the __main__ guard",
      blocks: [
        {
          kind: "code",
          source: "# tools.py\ndef clean(text):\n    return text.strip()\n\nprint(\"loading tools\")      # runs on import — usually not what you want\n\nif __name__ == \"__main__\":\n    # only when run directly: python tools.py\n    print(clean(\"  hi  \"))",
        },
        {
          kind: "prose",
          text: "__name__ is \"__main__\" when the file is the one you ran, and the module's own name when it was imported. The guard is therefore the line between 'this is a library' and 'this is a script'. Without it, importing your script to reuse one function also runs whatever that script does at the top level.",
        },
        {
          kind: "definitions",
          items: [
            { term: "sys.modules", description: "The cache. A second import of the same module binds a name to the object already there and runs nothing." },
            { term: "Package", description: "A directory of modules. Its __init__.py runs when the package is first imported." },
            { term: "Circular import", description: "A imports B while B is still importing A, so B sees a half-built module. Usually a sign the shared piece wants its own module." },
            { term: "Relative import", description: "from .helpers import x — resolved against the current package, and only legal inside one." },
          ],
        },
      ],
    },
  ],

  references: [
    { source: "Python Tutorial", locator: "§6 Modules" },
    { source: "Python Reference", locator: "§5 The import system" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
