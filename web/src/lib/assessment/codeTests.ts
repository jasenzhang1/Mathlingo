import type { CodeTest } from "./types";

/**
 * Shared between the browser grader (`pythonSandbox.ts`, via Pyodide) and the
 * authoring-time verifier (`tools/verifyTemplates.ts`, via a real CPython
 * subprocess) so "what script actually runs" is defined exactly once.
 *
 * The two fixed markers, rather than a boolean printed directly, exist so a
 * test can tell "the submission's own prints" apart from "the verdict" even
 * when the submission itself writes to stdout (which most code exercises do).
 */
export const CODE_TEST_PASS_MARKER = "__MATHLINGO_TEST_PASS__";
export const CODE_TEST_FAIL_MARKER = "__MATHLINGO_TEST_FAIL__";

export function buildTestScript(code: string, test: CodeTest): string {
  return [
    code,
    "",
    test.run,
    `print(${JSON.stringify(CODE_TEST_PASS_MARKER)} if bool(${test.check}) else ${JSON.stringify(CODE_TEST_FAIL_MARKER)})`,
  ].join("\n");
}

export interface CodeTestOutcome {
  id: string;
  passed: boolean;
  error?: string;
}

/** True when the last non-blank line of stdout is the pass marker. */
export function outcomeFromStdout(stdout: string): boolean {
  const lines = stdout.trim().split("\n").filter(Boolean);
  return lines[lines.length - 1] === CODE_TEST_PASS_MARKER;
}

/**
 * Wraps a test script so it runs in a fresh namespace, isolated from whatever
 * a previous test on the same long-lived interpreter left behind — needed
 * only in the browser, where one Pyodide instance is reused across every test
 * in an item (a Node subprocess per test, as `tools/verifyTemplates.ts` uses,
 * is already isolated by being a separate process).
 *
 * The script is base64-encoded rather than embedded in a triple-quoted Python
 * string so nothing about its content — quotes, backslashes, another
 * triple-quote — needs escaping.
 */
export function wrapForIsolatedExec(script: string): string {
  const encoded = base64EncodeUtf8(script);
  return [
    "import base64",
    "__mathlingo_ns__ = {}",
    `exec(compile(base64.b64decode(${JSON.stringify(encoded)}).decode("utf-8"), "<submission>", "exec"), __mathlingo_ns__)`,
  ].join("\n");
}

function base64EncodeUtf8(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}
