import type { WikiArticle } from "../types";

export const pythonRaisingWiki: WikiArticle = {
  conceptId: "python-raising",
  summary: "raise signals that this code cannot do what was asked. Choosing the right exception type is the whole design: the caller decides what to do based on the type, so raising ValueError where a caller expects KeyError makes the error unhandleable. A custom exception class is worth defining when callers need to distinguish your library's failures from everyone else's.",

  sections: [
    {
      heading: "Raising, and re-raising",
      blocks: [
        {
          kind: "code",
          source: "if quantity < 0:\n    raise ValueError(f\"quantity must be non-negative, got {quantity}\")\n\ntry:\n    parse(text)\nexcept ValueError as e:\n    raise ConfigError(\"bad config file\") from e   # keeps the original\n\ntry:\n    risky()\nexcept TimeoutError:\n    log.warning(\"retrying\")\n    raise                                        # re-raise unchanged",
        },
        {
          kind: "prose",
          text: "A bare raise inside an except block re-raises the exception being handled, preserving its original traceback — which is what you want after logging. raise X from e chains: the traceback shows both the new exception and the one that caused it, so the root cause is not lost behind your wrapper.",
        },
      ],
    },
    {
      heading: "Choosing and designing the type",
      blocks: [
        {
          kind: "table",
          headers: ["Situation", "Exception"],
          rows: [
            ["Argument of the right type but an unusable value", "ValueError"],
            ["Argument of the wrong type entirely", "TypeError"],
            ["A key or index that is not there", "KeyError / IndexError"],
            ["An operation this object does not support", "NotImplementedError"],
            ["A precondition about program state, not arguments", "RuntimeError, or a custom type"],
          ],
        },
        {
          kind: "code",
          source: "class ConfigError(Exception):\n    \"\"\"Raised when a configuration file cannot be used.\"\"\"\n\nclass MissingKey(ConfigError):\n    def __init__(self, key):\n        super().__init__(f\"missing required key: {key}\")\n        self.key = key          # machine-readable, not just text",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "An error message is a user interface",
          text: "\"invalid input\" tells the caller nothing. Name what was expected, what arrived, and where. Attaching the offending value as an attribute — self.key above — lets a caller act on it programmatically instead of parsing your message, which is the difference between an error that can be handled and one that can only be printed.",
        },
      ],
    },
  ],

  references: [
    { source: "Python Tutorial", locator: "§8.4 Raising Exceptions" },
    { source: "Python Tutorial", locator: "§8.5 Exception Chaining" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
