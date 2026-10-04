import { createClient } from "npm:@supabase/supabase-js@2";
import { complete, extractJson, userMessageFor } from "../_shared/anthropic.ts";
import { json, preflight } from "../_shared/cors.ts";

/**
 * Developer tool: revise an assessment question in light of feedback on it.
 *
 * The developer says how far they agree with the feedback; the model makes
 * changes in proportion — from a light touch to doing what the feedback asks —
 * and explains them. Nothing is written here: the revision goes back to the
 * browser, where the developer applies it as a local edit (and publishes it
 * through `publish-item-edits` like any other edit).
 *
 * Only these fields may change. Identity (id, concept, format) and template
 * machinery (params, solver) are fixed, so a revision can never move a
 * question to another lesson or break a templated item.
 */
const EDITABLE = [
  "stem",
  "choices",
  "answerKey",
  "tolerance",
  "rubric",
  "difficulty",
  "discrimination",
  "cognitive",
  "expectedSeconds",
] as const;

/** Same list as DEV_EMAILS in web/src/lib/dev/devAuth.ts and publish-item-edits. */
const DEFAULT_DEV_EMAILS = "jasenzhang@g.ucla.edu,jasen.zhang.2008@gmail.com";

function allowedEmails(): Set<string> {
  const raw = Deno.env.get("DEV_EMAILS") ?? DEFAULT_DEV_EMAILS;
  return new Set(raw.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean));
}

interface Feedback {
  reason: string;
  message?: string;
  answer?: string | null;
  score?: number | null;
  stemShown?: string | null;
}

interface RevisionRequest {
  item: Record<string, unknown>;
  feedback: Feedback[];
  /** 0–100: how much the developer agrees with the feedback. */
  agreement: number;
  note?: string;
}

const AGREEMENT_GUIDE = `
How far to go is set by the developer's AGREEMENT with the feedback (0–100):
- 25 ("slightly"): the feedback has a small point. Make the minimum change that addresses its valid core — usually wording or a grader note — and leave everything else alone.
- 50 ("partly"): fix the parts of the complaint that are clearly right; push back (leave unchanged) on the rest.
- 75 ("mostly"): treat the feedback as correct; make the changes it implies, keeping the question's intent and difficulty unless the feedback is about them.
- 100 ("fully"): do what the feedback asks, even if that means substantially rewriting the stem, choices, answer key or rubric.
Values in between interpolate. The developer's NOTE, if present, overrides the feedback wherever they conflict.`;

const FORMATTING = `
Formatting standard for any text you write (stems, choices, rubric criteria, notes):
- Every variable and every number goes in inline LaTeX: $x$, $30$ students, $0.05$, $5\\%$, money as $\\$20$.
- Random variables are capitals, realizations lowercase. "Distributed as" is $\\sim$; the normal is $\\mathcal{N}$: $X \\sim \\mathcal{N}(0, 1)$. Named distributions as $\\text{Binomial}(n, p)$.
- Expectation $\\mathbb{E}$, $\\text{Var}$, $\\text{Cov}$, $\\text{Corr}$; reals $\\mathbb{R}$; conditioning $P(A \\mid B)$.
- Vectors bold lowercase $\\mathbf{u}$, matrices bold uppercase $\\mathbf{A}$, dot product $\\mathbf{u} \\cdot \\mathbf{v}$.
- Size brackets around fractions: \\left( \\frac{a}{b} \\right).
- Curly quotes “like this”, never straight double quotes. Code goes in backticks.
- Template placeholders like {a} or {x1} must be kept exactly as they are (same names, same count).
Strings are JSON, so every backslash is doubled in your output.`;

const SYSTEM = `You maintain the question bank of a mathematics learning platform. A developer is reviewing feedback a learner (or another developer) left on one assessment question, and wants you to revise the question accordingly.
${AGREEMENT_GUIDE}
${FORMATTING}

Keep the answer key consistent with the stem: if you change numbers, recompute the answer. For multiple choice keep exactly the same number of correct choices unless the feedback is that the key is wrong. Never change the question's topic.

Reply with JSON only:
{
  "summary": "one or two sentences on what you changed and why (or why you changed nothing)",
  "changes": ["short bullet per change"],
  "patch": { ...only the fields you changed, chosen from: ${EDITABLE.join(", ")} }
}
An empty patch is a valid answer when the feedback doesn't hold up at the given agreement level.`;

function validate(body: unknown): RevisionRequest | { error: string } {
  if (!body || typeof body !== "object") return { error: "Body must be an object." };
  const b = body as Record<string, unknown>;
  if (!b.item || typeof b.item !== "object") return { error: "Missing item." };
  if (!Array.isArray(b.feedback) || b.feedback.length === 0) return { error: "Missing feedback." };
  const agreement = Number(b.agreement);
  if (!Number.isFinite(agreement) || agreement < 0 || agreement > 100) {
    return { error: "agreement must be 0–100." };
  }
  return {
    item: b.item as Record<string, unknown>,
    feedback: (b.feedback as Feedback[]).slice(0, 20),
    agreement,
    note: typeof b.note === "string" ? b.note.slice(0, 2000) : undefined,
  };
}

Deno.serve(async (req) => {
  const pre = preflight(req);
  if (pre) return pre;
  if (req.method !== "POST") return json({ error: "Method not allowed." }, 405);

  const token = (req.headers.get("Authorization") ?? "").replace(/^Bearer\s+/i, "");
  if (!token) return json({ error: "Not signed in." }, 401);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceKey) return json({ error: "Server is missing Supabase credentials." }, 500);

  const admin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { data: userData, error: userError } = await admin.auth.getUser(token);
  if (userError || !userData?.user?.email) return json({ error: "Your session has expired. Sign in again." }, 401);
  if (!allowedEmails().has(userData.user.email.toLowerCase())) {
    return json({ error: `Not authorized: ${userData.user.email} isn't in the server's DEV_EMAILS list.` }, 403);
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Request body must be valid JSON." }, 400);
  }
  const request = validate(body);
  if ("error" in request) return json({ error: request.error }, 400);

  // The model sees the whole question (for context) but may only return editable fields.
  const userPrompt = [
    `AGREEMENT: ${Math.round(request.agreement)}`,
    request.note ? `DEVELOPER NOTE: ${request.note}` : "DEVELOPER NOTE: (none)",
    "QUESTION (JSON):",
    JSON.stringify(request.item, null, 2),
    "FEEDBACK:",
    ...request.feedback.map((f, i) =>
      [
        `#${i + 1} reason: ${f.reason}`,
        f.message ? `message: ${f.message}` : null,
        f.stemShown ? `question as shown (templated values filled in): ${f.stemShown}` : null,
        f.answer ? `learner's answer: ${f.answer}` : null,
        typeof f.score === "number" ? `score it received: ${Math.round(f.score * 100)}/100` : null,
      ]
        .filter(Boolean)
        .join("\n"),
    ),
  ].join("\n\n");

  try {
    const text = await complete({
      system: SYSTEM,
      messages: [{ role: "user", content: userPrompt }],
      maxTokens: 4096,
    });
    const parsed = extractJson<{ summary?: string; changes?: string[]; patch?: Record<string, unknown> }>(text);
    const patch: Record<string, unknown> = {};
    for (const key of EDITABLE) {
      if (parsed.patch && key in parsed.patch) patch[key] = parsed.patch[key];
    }
    return json({
      summary: typeof parsed.summary === "string" ? parsed.summary : "",
      changes: Array.isArray(parsed.changes) ? parsed.changes.filter((c) => typeof c === "string") : [],
      patch,
    });
  } catch (error) {
    console.error("revise-item failed:", error);
    return json({ error: userMessageFor(error) }, 502);
  }
});
