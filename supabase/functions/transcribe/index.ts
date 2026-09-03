import { complete, extractJson } from "../_shared/anthropic.ts";
import { json, preflight } from "../_shared/cors.ts";
import { requireTier } from "../_shared/entitlement.ts";

/**
 * The image branch of the normalization stage (`grading.md`): a photo or canvas
 * drawing of handwritten work becomes text, before any grading happens.
 *
 * This function transcribes and does not judge. Keeping the two apart matters:
 * a model asked to read *and* mark in one pass tends to fill in what a student
 * "clearly meant", which quietly grades work they did not do. Here it reports
 * only what is on the page, including when that is incomplete or illegible, and
 * the grader marks the transcript.
 *
 * Audio does not come through here — browser speech recognition handles it
 * client-side, so no audio ever leaves the device.
 */

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif"];

interface TranscriptionResult {
  text: string;
  confidence: number;
  notes?: string;
}

function systemPrompt(): string {
  return `You transcribe handwritten mathematics into text. You do NOT grade, correct, or complete it.

Return ONLY a JSON object:
{
  "text": "<what is written, as faithfully as you can render it>",
  "confidence": <0..1>,
  "notes": "<optional: what was unclear>"
}

RULES
- Transcribe what is actually on the page. If a step is wrong, transcribe the wrong step. If the work stops halfway, stop there. Never finish a derivation the student did not finish, and never fix an error you can see.
- Render mathematics in readable plain text or LaTeX: fractions as a/b or \\frac{a}{b}, exponents as x^2, subscripts as x_i, Greek letters by name if ambiguous.
- Preserve the order and structure of the work, including line breaks between steps.
- Mark anything genuinely unreadable as [illegible] rather than guessing. One [illegible] in a clear page is far better than a plausible invention.
- The question is provided for context, to disambiguate similar-looking symbols. Use it ONLY for that. Do not let it tempt you into transcribing the expected answer instead of the written one.
- Set confidence below 0.6 if handwriting is hard to read, the image is blurry or cropped, or you had to guess at more than a symbol or two. A low confidence discounts the grade that follows, which is the correct outcome for an uncertain reading.
- If the image contains no mathematical work at all, return an empty "text" and confidence 0.`;
}

Deno.serve(async (req) => {
  const pre = preflight(req);
  if (pre) return pre;

  try {
    // Handwriting recognition feeds the paid grader and costs a model call of
    // its own, so it sits behind the same tier.
    const entitled = await requireTier(req, "graded");
    if (!entitled.ok) {
      return json({ error: entitled.error, upgradeTo: entitled.upgradeTo }, entitled.status);
    }

    const body = await req.json();
    const base64 = String(body.image ?? "");
    const mediaType = String(body.mediaType ?? "image/png");
    const stem = String(body.stem ?? "");

    if (!base64) return json({ error: "No image supplied." }, 400);
    if (!ALLOWED_TYPES.includes(mediaType)) {
      return json({ error: `Unsupported image type: ${mediaType}` }, 400);
    }
    // base64 inflates by ~4/3; this bounds the decoded size.
    if (base64.length * 0.75 > MAX_IMAGE_BYTES) {
      return json({ error: "Image is too large (5 MB maximum)." }, 400);
    }

    const raw = await complete({
      system: systemPrompt(),
      messages: [
        {
          role: "user",
          content: [
            { type: "image", source: { type: "base64", media_type: mediaType, data: base64 } },
            {
              type: "text",
              text: stem
                ? `The question being answered, for symbol disambiguation only:\n"""\n${stem}\n"""\n\nTranscribe the handwritten work in the image.`
                : "Transcribe the handwritten work in the image.",
            },
          ],
        },
      ],
      maxTokens: 1500,
      temperature: 0,
    });

    const result = extractJson<TranscriptionResult>(raw);

    return json({
      text: String(result.text ?? ""),
      confidence: Math.max(0, Math.min(1, Number(result.confidence ?? 0.5))),
      notes: result.notes ? String(result.notes) : undefined,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("transcribe:", message);
    return json({ error: message }, 500);
  }
});
