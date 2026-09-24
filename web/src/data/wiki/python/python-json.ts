import type { WikiArticle } from "../types";

export const pythonJsonWiki: WikiArticle = {
  conceptId: "python-json",
  summary: "json.loads parses text into Python objects; json.dumps renders Python objects as text. The mapping is lossy in one direction: dict keys become strings, tuples become lists, and anything JSON has no type for — a datetime, a set, a Decimal — raises unless you say how to encode it. Knowing what does not survive the round trip is most of using JSON well.",

  sections: [
    {
      heading: "The four functions",
      blocks: [
        {
          kind: "code",
          source: "import json\n\njson.loads('{\"a\": 1}')            # text  -> dict\njson.dumps({\"a\": 1})              # dict  -> text\n\nwith open(\"c.json\", encoding=\"utf-8\") as f:\n    config = json.load(f)         # from a file object\n\nwith open(\"c.json\", \"w\", encoding=\"utf-8\") as f:\n    json.dump(config, f, indent=2)\n\njson.dumps(data, indent=2, sort_keys=True)   # readable and diffable",
        },
        {
          kind: "prose",
          text: "The s suffix means string: loads and dumps work on text, load and dump on a file object. Mixing them up is the most common first error — json.load(text) tries to call .read() on a string and raises AttributeError.",
        },
      ],
    },
    {
      heading: "What the round trip changes",
      blocks: [
        {
          kind: "table",
          headers: ["Python in", "JSON", "Python back"],
          rows: [
            ["dict", "object", "dict"],
            ["list, tuple", "array", "list — a tuple does not survive"],
            ["str", "string", "str"],
            ["int, float", "number", "int, float"],
            ["True / None", "true / null", "True / None"],
            ["dict with int keys", "object", "dict with STRING keys"],
            ["set, datetime, Decimal", "—", "TypeError unless you provide an encoder"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Integer keys come back as strings",
          text: "json.loads(json.dumps({1: \"a\"})) gives {\"1\": \"a\"}. JSON object keys are strings by definition, so the conversion is silent on the way out and only bites when a later lookup with the integer key raises KeyError. If keys must be integers, convert them back explicitly after loading.",
        },
        {
          kind: "code",
          source: "def encode(obj):\n    if isinstance(obj, set):\n        return sorted(obj)\n    if hasattr(obj, \"isoformat\"):\n        return obj.isoformat()\n    raise TypeError(f\"cannot encode {type(obj).__name__}\")\n\njson.dumps(data, default=encode)",
        },
      ],
    },
  ],

  references: [
    { source: "Python Standard Library", locator: "§19.2 json" },
    { source: "Python Standard Library", locator: "json — Encoders and Decoders" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
