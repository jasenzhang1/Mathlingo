/**
 * Minimal Anthropic Messages API client.
 *
 * Deliberately hand-rolled rather than pulling the SDK: these functions need
 * one endpoint, and a dependency-free module keeps the Deno deploy fast and the
 * supply chain small for something that holds an API key.
 */

const API_URL = "https://api.anthropic.com/v1/messages";
const MODEL = Deno.env.get("ANTHROPIC_MODEL") ?? "claude-sonnet-5";

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

export async function complete(input: {
  system: string;
  messages: Message[];
  maxTokens?: number;
  temperature?: number;
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
      temperature: input.temperature ?? 1,
      system: input.system,
      messages: input.messages,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Anthropic API ${response.status}: ${detail.slice(0, 500)}`);
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
