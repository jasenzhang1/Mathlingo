import { complete, errorCode, userMessageFor, type Message } from "../_shared/anthropic.ts";
import { json, preflight } from "../_shared/cors.ts";
import { requireTier } from "../_shared/entitlement.ts";

/**
 * The conversational-learning tutor (CLAUDE.md §1.3).
 *
 * Two things this prompt is doing that are easy to lose:
 *
 *  1. It refuses to hand over full solutions. A tutor that answers on request is
 *     a worse product than a textbook, because the learner leaves believing they
 *     understood something they only read.
 *  2. It corrects errors immediately and by name. The user asked for a sparring
 *     partner — sparring means the mistake gets called, not absorbed politely.
 */

const MAX_TURNS = 40;
const MAX_CHARS = 4000;

function systemPrompt(conceptTitle: string): string {
  return `You are a mathematics tutor for Mathlingo, working with a student on: ${conceptTitle}.

This is a discussion section, not a lecture and not an answer key.

HOW TO RUN THE SESSION
- The student picks the mode: they ask you things, or you quiz them. If they haven't said, follow whatever they open with.
- In quiz mode, ask ONE question at a time and wait. Start near the level their answers suggest, then move up or down.
- Keep replies short — a few sentences, or one worked step. Long replies get skimmed.

CORRECTING
- When the student says something wrong, say so immediately and name the specific error: "that's the variance of a single Bernoulli, not of the sum" beats "not quite, try again".
- When they're right but for a shaky reason, say that too. Right answer, wrong mechanism is the failure mode that survives to the exam.
- Do not soften a correction into ambiguity. Being clear is the kindness here.

NOT GIVING IT AWAY
- If asked for the answer outright, give the next step or a pointed question instead, and say that's what you're doing.
- After two genuine attempts, if they're still stuck, walk through it fully — refusing past that point is just obstruction.

STYLE
- Plain language first, notation second. Use LaTeX only inside $...$ and only when words are worse.
- Concrete numbers beat abstract statements of the general case.
- Never invent a citation, a theorem name, or a result you're unsure of. If you don't know, say so.`;
}

Deno.serve(async (req) => {
  const pre = preflight(req);
  if (pre) return pre;

  try {
    const entitled = await requireTier(req, "tutored");
    if (!entitled.ok) {
      return json({ error: entitled.error, upgradeTo: entitled.upgradeTo }, entitled.status);
    }

    const body = await req.json();
    const conceptTitle: string = body.conceptTitle ?? "this concept";
    const raw: Message[] = Array.isArray(body.messages) ? body.messages : [];

    // Trim to the recent window and cap each turn — the client controls this
    // payload, so the function must not let it grow without bound.
    const messages = raw
      .slice(-MAX_TURNS)
      .filter((m) => m && (m.role === "user" || m.role === "assistant") && m.content)
      .map((m) => ({ role: m.role, content: String(m.content).slice(0, MAX_CHARS) }));

    // The client's opening greeting is ours, not the model's, and Anthropic
    // requires the first message to be from the user.
    while (messages.length > 0 && messages[0].role === "assistant") messages.shift();

    if (messages.length === 0) {
      return json({ error: "No user message to respond to." }, 400);
    }

    const reply = await complete({
      system: systemPrompt(conceptTitle),
      messages,
      maxTokens: 800,
    });

    return json({ reply });
  } catch (error) {
    console.error("tutor:", error instanceof Error ? error.message : String(error));
    return json({ error: userMessageFor(error), code: errorCode(error) }, 500);
  }
});
