import type { WikiArticle } from "../types";

export const pythonExceptionsWiki: WikiArticle = {
  conceptId: "python-exceptions",
  summary: "try/except runs code that might fail and handles the failure. The discipline is in the except clause: catch the specific exception you know how to handle, and let everything else propagate. A bare except catches typos, interrupts and out-of-memory alike, turning a loud bug into a silent wrong answer.",

  sections: [
    {
      heading: "The four clauses",
      blocks: [
        {
          kind: "code",
          source: "try:\n    value = int(text)\nexcept ValueError:\n    value = 0                # runs only if that exception was raised\nelse:\n    log(\"parsed cleanly\")    # runs only if try succeeded\nfinally:\n    close(resource)          # runs either way, always",
        },
        {
          kind: "definitions",
          items: [
            { term: "try", description: "Keep it as small as possible. A large try block makes it unclear which line the except is protecting against." },
            { term: "except SpecificError", description: "Catch by type. Several types at once: except (ValueError, TypeError). Bind with `as e` to inspect it." },
            { term: "else", description: "Runs when try completed without an exception. Useful for keeping the non-error path out of the protected block." },
            { term: "finally", description: "Runs on the way out however that happens — success, handled exception, unhandled exception, even return." },
          ],
        },
      ],
    },
    {
      heading: "Why bare except is a trap",
      blocks: [
        {
          kind: "callout",
          tone: "warning",
          title: "except: catches far more than you meant",
          text: "A bare except also catches NameError from a typo in the try block, KeyboardInterrupt when a user tries to stop the program, and SystemExit. The typo case is the worst: your code has a bug, the handler swallows it, and you get the fallback value forever without ever being told.",
        },
        {
          kind: "code",
          source: "try:\n    total = compute(valeu)      # typo\nexcept:\n    total = 0                   # silently 0, forever\n\ntry:\n    total = compute(value)\nexcept ArithmeticError as e:    # only what you can actually handle\n    log.warning(\"falling back: %s\", e)\n    total = 0",
        },
        {
          kind: "callout",
          tone: "insight",
          title: "EAFP",
          text: "Python leans on 'easier to ask forgiveness than permission': try the operation and handle the failure, rather than checking every precondition first. It avoids the race between the check and the use, and reads better when failure is genuinely rare. When failure is the common case, a check up front is cheaper — exceptions are not free.",
        },
      ],
    },
  ],

  references: [
    { source: "Python Tutorial", locator: "§8 Errors and Exceptions" },
    { source: "Python Standard Library", locator: "§5 Built-in Exceptions" },
    { source: "Mathlingo assessment bank", locator: "assessments/python.md" },
  ],
};
