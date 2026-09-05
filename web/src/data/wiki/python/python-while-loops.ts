import type { WikiArticle } from "../types";

export const pythonWhileLoopsWiki: WikiArticle = {
  conceptId: "python-while-loops",
  summary:
    "A while loop repeats a block for as long as its condition stays true, re-checking that condition " +
    "before every iteration — including the very first one, so a while loop can run zero times. It's the " +
    "right tool when you don't know in advance how many repetitions you'll need, unlike a for loop, which " +
    "walks a sequence whose length is already fixed.",

  sections: [
    {
      heading: "The condition is checked every time, including before the first run",
      blocks: [
        {
          kind: "code",
          source: "count = 0\nwhile count < 3:\n    print(count)\n    count += 1",
          caption: "Prints 0, 1, 2 — the loop stops the moment count < 3 becomes False, before printing 3.",
        },
        {
          kind: "prose",
          text:
            "Something inside the loop body must eventually make the condition False, or the loop never " +
            "ends. Here that's count += 1 — forgetting it is the single most common way to write an " +
            "infinite loop, since count < 3 would then stay True forever.",
        },
        {
          kind: "callout",
          tone: "warning",
          title: "while True: is intentional, and needs its own exit",
          text:
            "while True: loops forever unless something inside it explicitly stops it with break. This is " +
            "a legitimate pattern — e.g. keep asking for input until it's valid — but every while True: " +
            "loop should have a visible break on some path, or it genuinely never terminates.",
        },
      ],
    },
    {
      heading: "break and continue",
      blocks: [
        {
          kind: "definitions",
          items: [
            { term: "break", description: "Exits the loop immediately, skipping any remaining iterations entirely." },
            { term: "continue", description: "Skips the rest of the current iteration's body and jumps straight to re-checking the condition." },
          ],
        },
        {
          kind: "example",
          title: "Reading input until the user quits",
          problem: "Keep asking for a command and print it back, stopping only when the user types \"quit\".",
          steps: [
            "Use while True: since the number of inputs isn't known in advance.",
            "Read a command each iteration.",
            "If the command is \"quit\", break out of the loop immediately.",
            "Otherwise, print the command and let the loop continue.",
          ],
          answer:
            "while True:\n    cmd = input()\n    if cmd == \"quit\":\n        break\n    print(cmd)",
        },
      ],
    },
  ],

  references: [
    { source: "Python Language Reference", locator: "§8.2 The while statement" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
