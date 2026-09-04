/**
 * Minimal Anthropic Messages API client.
 *
 * Deliberately hand-rolled rather than pulling the SDK: these functions need
 * one endpoint, and a dependency-free module keeps the Deno deploy fast and the
 * supply chain small for something that holds an API key.
 */

const API_URL = "https://api.anthropic.com/v1/messages";
const MODEL = Deno.env.get("ANTHROPIC_MODEL") ?? "claude-sonnet-5";

/**
 * An error from the model provider, carrying two messages: one for the logs
 * with the provider's own detail, and one for the learner.
 *
 * The split matters. A student who wrote a proof and got back
 * `Anthropic API 401: invalid x-api-key ... request_id: req_011Cef...` learns
 * nothing they can act on, and it leaks which provider we use and how we call
 * it. The operator needs exactly that detail — but in `functions logs`, not in
 * the learner's feedback panel.
 */
export class UpstreamError extends Error {
  readonly status: number;
  readonly userMessage: string;
  /** True when the operator must fix configuration; retrying will not help. */
  readonly configuration: boolean;

  constructor(status: number, detail: string) {
    super(`Anthropic API ${status}: ${detail}`);
    this.name = "UpstreamError";
    this.status = status;
    this.configuration = status === 401 || status === 403;

    const misconfigured =
      "The grader isn't configured correctly on our side, so this can't be scored right now. Nothing was recorded.";

    this.userMessage =
      status === 401 || status === 403
        ? misconfigured
        : status === 429
          ? "The grader is busy right now. Try again in a moment."
          : status === 400 && /credit balance|billing|quota/i.test(detail)
            ? "The grader is temporarily unavailable. Nothing was recorded."
            : status >= 500 || status === 529
              ? "The grader is temporarily unavailable. Try again shortly."
              : // Any other 4xx is a request WE built wrongly — a model id the
                // account can't use, a malformed body. The learner did nothing
                // wrong, so it reads as our fault, not as an ambiguous failure.
                status >= 400 && status < 500
                ? misconfigured
                : "This couldn't be graded. Nothing was recorded.";
  }
}

/** Client-safe message for any error, with the detail left for the logs. */
export function userMessageFor(error: unknown): string {
  if (error instanceof UpstreamError) return error.userMessage;
  return "Something went wrong grading this. Nothing was recorded.";
}

/**
 * A short, non-sensitive fault code, e.g. "upstream-404".
 *
 * Just the HTTP status the provider returned — no body, no request id, no key
 * material. It exists so a user reporting a problem can quote one token that
 * identifies the fault exactly, instead of the operator having to correlate a
 * vague description against a log timestamp.
 */
export function errorCode(error: unknown): string {
  if (error instanceof UpstreamError) return `upstream-${error.status}`;
  if (error instanceof SyntaxError) return "bad-model-output";
  return "internal";
}

/** A text block, or an inline base64 image (used by the OCR path). */
export type ContentBlock =
  | { type: "text"; text: string }
  | {
      type: "image";
      source: { type: "base64"; media_type: string; data: string };
    };

export interface Message {
  role: "user" | "assistant";
  content: string | ContentBlock[];
}

/**
 * No `temperature` option, deliberately.
 *
 * Claude 5 models reject it — `400 invalid_request_error: "temperature is
 * deprecated for this model"` — so passing one fails the whole request rather
 * than being ignored. It is left off the signature entirely so a caller cannot
 * reintroduce the fault by asking for determinism that the API will not honour.
 * Where grading needs reproducibility, it comes from the prompt's fixed credit
 * anchors and from snapping returned credit to them, not from a sampling knob.
 */
export async function complete(input: {
  system: string;
  messages: Message[];
  maxTokens?: number;
}): Promise<string> {
  const apiKey = Deno.env.get("ANTHROPIC_API_KEY");
  if (!apiKey) {
    throw new Error(
      "ANTHROPIC_API_KEY is not set. Run: supabase secrets set ANTHROPIC_API_KEY=sk-ant-...",
    );
  }

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: input.maxTokens ?? 1024,
      system: input.system,
      messages: input.messages,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new UpstreamError(response.status, detail.slice(0, 500));
  }

  const data = await response.json();
  const text = (data.content ?? [])
    .filter((block: { type: string }) => block.type === "text")
    .map((block: { text: string }) => block.text)
    .join("");

  if (!text) throw new Error("Anthropic API returned no text content.");
  return text;
}

/**
 * Extracts a JSON object from a model response, tolerating a ```json fence or a
 * sentence of preamble. Used by the grader, which needs structured output.
 */
export function extractJson<T>(text: string): T {
  const fenced = /```(?:json)?\s*([\s\S]*?)```/.exec(text);
  const candidate = fenced ? fenced[1] : text;
  const start = candidate.indexOf("{");
  const end = candidate.lastIndexOf("}");
  if (start === -1 || end === -1) {
    throw new Error(`No JSON object in model response: ${text.slice(0, 200)}`);
  }
  return JSON.parse(candidate.slice(start, end + 1)) as T;
}
