import type { WikiArticle } from "../types";

export const pythonFilesWiki: WikiArticle = {
  conceptId: "python-files",
  summary: "open() gives a file object; the with statement closes it even if the body raises. Text mode decodes bytes to str using an encoding — one you should state rather than inherit from the machine. And a file object is iterable line by line, which is why reading a large file with .read() is usually the wrong reflex.",

  sections: [
    {
      heading: "with, modes, and encoding",
      blocks: [
        {
          kind: "code",
          source: "with open(\"data.txt\", encoding=\"utf-8\") as f:\n    for line in f:                 # one line at a time\n        process(line.rstrip(\"\\n\"))\n# closed here, even if process() raised\n\nwith open(\"out.txt\", \"w\", encoding=\"utf-8\") as f:\n    f.write(\"hello\\n\")\n\nwith open(\"image.png\", \"rb\") as f:   # bytes, no decoding\n    blob = f.read()",
        },
        {
          kind: "table",
          headers: ["Mode", "Means"],
          rows: [
            ["r", "read text (the default); error if the file is missing"],
            ["w", "write text, truncating anything already there"],
            ["a", "append text, keeping what is there"],
            ["x", "create and write; error if it already exists"],
            ["rb / wb", "bytes, no encoding or newline translation"],
          ],
        },
        {
          kind: "callout",
          tone: "warning",
          title: "Always pass encoding=",
          text: "Without it, text mode uses a platform default that differs between machines and between Python versions. The same code then reads a file correctly on your laptop and raises UnicodeDecodeError in production — or worse, decodes to plausible nonsense. utf-8 is the right default for almost everything.",
        },
      ],
    },
    {
      heading: "Why iterate rather than read",
      blocks: [
        {
          kind: "prose",
          text: "f.read() returns the whole file as one string, so a 4 GB log needs 4 GB of memory plus the decoded overhead. Iterating the file object yields one line at a time and holds only that. f.readlines() is the same problem as read() with extra steps — it builds a list of every line. Reach for read() when the file is small and you genuinely want it whole.",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "with is not about brevity",
          text: "Without it you must close in a finally block to survive an exception, and code that forgets leaks a handle until the garbage collector happens to run — which on some interpreters is never. with makes the close structural rather than something you remembered.",
        },
      ],
    },
  ],

  references: [
    { source: "Python Tutorial", locator: "§7.2 Reading and Writing Files" },
    { source: "Python Standard Library", locator: "§2 Built-in Functions — open" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
