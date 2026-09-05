import {
  buildTestScript,
  outcomeFromStdout,
  wrapForIsolatedExec,
  type CodeTestOutcome,
} from "./codeTests";
import type { CodeTest } from "./types";

/**
 * Runs learner-submitted Python in the browser via Pyodide (CPython compiled
 * to WebAssembly), loaded lazily from a CDN so the ~10MB runtime is never
 * fetched for a session that never hits a `code`-format item.
 *
 * Loaded as a plain `<script>` tag rather than bundled: Pyodide's own asset
 * loading (the wasm binary, the standard-library zip) expects to resolve
 * relative to wherever pyodide.js itself was loaded from, which is simplest
 * to get right by pointing both at the same CDN path rather than teaching the
 * bundler about wasm assets it never needs for anything else.
 */

const PYODIDE_VERSION = "0.26.4";
const PYODIDE_CDN = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

interface PyodideInterface {
  runPythonAsync: (code: string) => Promise<unknown>;
  setStdout: (options: { batched: (msg: string) => void }) => void;
  setStderr: (options: { batched: (msg: string) => void }) => void;
}

declare global {
  interface Window {
    loadPyodide?: (config: { indexURL: string }) => Promise<PyodideInterface>;
  }
}

let pyodidePromise: Promise<PyodideInterface> | null = null;

function loadScriptOnce(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });
}

async function getPyodide(): Promise<PyodideInterface> {
  pyodidePromise ??= (async () => {
    await loadScriptOnce(`${PYODIDE_CDN}pyodide.js`);
    if (!window.loadPyodide) {
      throw new Error("Pyodide script loaded but window.loadPyodide is missing.");
    }
    return window.loadPyodide({ indexURL: PYODIDE_CDN });
  })();
  return pyodidePromise;
}

/** The last line of a Pyodide `PythonError` message is the actual exception. */
function describePythonError(err: unknown): string {
  const message = err instanceof Error ? err.message : String(err);
  const lines = message.trim().split("\n").filter(Boolean);
  return lines[lines.length - 1] ?? message;
}

const TEST_TIMEOUT_MS = 5000;

/**
 * Known limitation: Pyodide runs on the main thread here, and a genuine CPU-
 * bound infinite loop in submitted code (`while True: pass`) blocks that
 * thread synchronously — no JS-level timeout can interrupt WASM execution
 * that never yields. This race catches everything that *does* yield (which
 * covers the near-totality of exercise-scale bugs: unbounded recursion,
 * accidental quadratic blowups, an await-ing call that never resolves) and
 * reports a timeout rather than hanging the grading UI. Fully solving the
 * pathological case needs Pyodide in a Web Worker with a SharedArrayBuffer
 * interrupt handle, which in turn needs cross-origin-isolation response
 * headers from the host — a deploy-level change, not a client-code one.
 */
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Timed out")), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      },
    );
  });
}

/**
 * Runs `code` against each test, isolating each test's namespace so one
 * test's side effects — or a crash — can't leak into the next one's verdict.
 * Tests within one item run sequentially, not in parallel; item-level test
 * counts are small enough (single digits) that this costs milliseconds, not
 * something worth an interpreter pool for.
 */
export async function runCodeTests(code: string, tests: CodeTest[]): Promise<CodeTestOutcome[]> {
  const pyodide = await getPyodide();
  const outcomes: CodeTestOutcome[] = [];

  for (const test of tests) {
    let stdout = "";
    pyodide.setStdout({
      batched: (msg) => {
        stdout += msg + "\n";
      },
    });
    pyodide.setStderr({ batched: () => {} });

    try {
      const script = wrapForIsolatedExec(buildTestScript(code, test));
      await withTimeout(pyodide.runPythonAsync(script), TEST_TIMEOUT_MS);
      outcomes.push({ id: test.id, passed: outcomeFromStdout(stdout) });
    } catch (err) {
      outcomes.push({ id: test.id, passed: false, error: describePythonError(err) });
    }
  }

  return outcomes;
}
