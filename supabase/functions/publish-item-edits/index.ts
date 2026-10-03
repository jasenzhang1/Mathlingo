import { createClient } from "npm:@supabase/supabase-js@2";
import { json, preflight } from "../_shared/cors.ts";

/**
 * Turns a developer's local edits into a pull request against the site's own
 * repo. Item edits from `/dev/questions` update `web/src/data/devOverrides.json`;
 * interview bundle edits from `/dev/bundles` replace
 * `web/src/data/interview/bundles.json`, and interview question edits from the
 * same page are merged by id into `web/src/data/interview/questions.json`. For items, `devOverrides.json` is
 * the file `loadItemBank` merges on top of the hand-authored item banks (see
 * `web/src/data/items.ts`). A PR rather than a direct commit to main because
 * a bad edit here ships wrong questions to every learner; a review step
 * costs one click and catches that class of mistake before it's live.
 *
 * Client-side gating (`useIsDeveloper`) only hides the button. Anyone with a
 * valid Supabase session could call this function directly, so the same
 * allowlist is re-checked here against the caller's *verified* JWT — the
 * enforcement, not the UI courtesy.
 */

const OVERRIDES_PATH = "web/src/data/devOverrides.json";
/** Interview mock-interview chains, edited as a whole list in `/dev/bundles`. */
const BUNDLES_PATH = "web/src/data/interview/bundles.json";
/** Interview questions, edited a few at a time in `/dev/bundles` and merged in by id. */
const QUESTIONS_PATH = "web/src/data/interview/questions.json";
const GITHUB_API = "https://api.github.com";

interface Item {
  id: string;
  conceptId: string;
  [key: string]: unknown;
}

interface Bundle {
  id: string;
  title: string;
  family: string | null;
  questions: string[];
  curated: boolean;
  free?: boolean;
}

interface InterviewQuestion {
  id: string;
  [key: string]: unknown;
}

interface PublishRequest {
  overrides?: Record<string, Item>;
  newItems?: Record<string, Item>;
  /** The complete bundle list; replaces bundles.json wholesale. */
  interviewBundles?: Bundle[];
  /** Edited or new interview questions; each replaces (or is appended as) the question with its id. */
  interviewQuestions?: InterviewQuestion[];
  /** Ids of interview questions to remove from questions.json (e.g. duplicates). */
  interviewDeletedQuestions?: string[];
}

interface OverridesFile {
  overrides: Record<string, Item>;
  newItems: Record<string, Item>;
}

function isPlainItem(value: unknown): value is Item {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return typeof item.id === "string" && item.id.length > 0 && typeof item.conceptId === "string";
}

function isBundle(value: unknown): value is Bundle {
  if (!value || typeof value !== "object") return false;
  const b = value as Record<string, unknown>;
  return (
    typeof b.id === "string" &&
    /^[a-z0-9-]+$/.test(b.id) &&
    typeof b.title === "string" &&
    (b.family === null || typeof b.family === "string") &&
    Array.isArray(b.questions) &&
    b.questions.every((q) => typeof q === "string") &&
    typeof b.curated === "boolean" &&
    (b.free === undefined || typeof b.free === "boolean")
  );
}

const isString = (v: unknown) => typeof v === "string";
const isStringArray = (v: unknown) => Array.isArray(v) && v.every(isString);
const optional = (v: unknown, check: (v: unknown) => boolean) => v === undefined || check(v);

/** Mirrors `InterviewQuestion` in web/src/lib/interview/types.ts. */
function isInterviewQuestion(value: unknown): value is InterviewQuestion {
  if (!value || typeof value !== "object") return false;
  const q = value as Record<string, unknown>;
  return (
    typeof q.id === "string" &&
    /^iq-[0-9]+$/.test(q.id) &&
    (q.section === null || isString(q.section)) &&
    (q.family === null || isString(q.family)) &&
    (q.difficulty === null || typeof q.difficulty === "number") &&
    isString(q.question) &&
    isString(q.answer) &&
    isString(q.notes) &&
    isStringArray(q.tags) &&
    isString(q.source) &&
    optional(q.otherSections, isStringArray) &&
    optional(q.numericAnswer, (v) => typeof v === "number" && Number.isFinite(v)) &&
    optional(q.instructional, isString) &&
    optional(q.status, (v) => v === "draft") &&
    optional(q.free, (v) => typeof v === "boolean") &&
    optional(q.reviewNote, isString)
  );
}

function validatePayload(body: unknown): PublishRequest | { error: string } {
  if (!body || typeof body !== "object") return { error: "Request body must be an object." };
  const { overrides, newItems, interviewBundles, interviewQuestions, interviewDeletedQuestions } = body as PublishRequest;
  if (interviewDeletedQuestions !== undefined) {
    if (!Array.isArray(interviewDeletedQuestions) || !interviewDeletedQuestions.every((id) => typeof id === "string" && /^iq-[0-9]+$/.test(id))) {
      return { error: "interviewDeletedQuestions must be an array of question ids." };
    }
    if (interviewQuestions?.some((q) => interviewDeletedQuestions.includes((q as { id?: string })?.id ?? ""))) {
      return { error: "A question can't be both edited and deleted in the same publish." };
    }
  }
  if (interviewQuestions !== undefined) {
    if (!Array.isArray(interviewQuestions)) return { error: "interviewQuestions must be an array." };
    const ids = new Set<string>();
    for (const q of interviewQuestions) {
      if (!isInterviewQuestion(q)) return { error: `Question ${JSON.stringify((q as { id?: unknown })?.id)} is malformed.` };
      if (ids.has(q.id)) return { error: `Question id "${q.id}" appears twice.` };
      ids.add(q.id);
    }
  }
  if (interviewBundles !== undefined) {
    if (!Array.isArray(interviewBundles)) return { error: "interviewBundles must be an array." };
    const ids = new Set<string>();
    for (const b of interviewBundles) {
      if (!isBundle(b)) return { error: `Bundle ${JSON.stringify((b as { id?: unknown })?.id)} is malformed.` };
      if (ids.has(b.id)) return { error: `Bundle id "${b.id}" appears twice.` };
      ids.add(b.id);
    }
  }
  for (const [key, value] of Object.entries({ ...overrides, ...newItems })) {
    if (!isPlainItem(value)) {
      return { error: `Item "${key}" is missing a valid id/conceptId.` };
    }
    if (value.id !== key) {
      return { error: `Item keyed "${key}" has id "${value.id}" — keys must match ids.` };
    }
  }
  return { overrides: overrides ?? {}, newItems: newItems ?? {}, interviewBundles, interviewQuestions, interviewDeletedQuestions };
}

/**
 * Who may publish. Defaults to the same list as DEV_EMAILS in
 * web/src/lib/dev/devAuth.ts and is_developer() in migration 0014 — keep all
 * three in step, or a developer sees the dev tools but is refused here.
 * The DEV_EMAILS secret, if set, replaces the default entirely.
 */
const DEFAULT_DEV_EMAILS = "jasenzhang@g.ucla.edu,jasen.zhang.2008@gmail.com";

function allowedEmails(): Set<string> {
  const raw = Deno.env.get("DEV_EMAILS") ?? DEFAULT_DEV_EMAILS;
  return new Set(raw.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean));
}

async function githubFetch(
  path: string,
  token: string,
  init: RequestInit = {},
): Promise<Response> {
  return fetch(`${GITHUB_API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(init.body ? { "Content-Type": "application/json" } : {}),
      ...init.headers,
    },
  });
}

function b64encode(text: string): string {
  return btoa(unescape(encodeURIComponent(text)));
}

function b64decode(text: string): string {
  return decodeURIComponent(escape(atob(text)));
}

Deno.serve(async (req) => {
  const pre = preflight(req);
  if (pre) return pre;

  if (req.method !== "POST") return json({ error: "Method not allowed." }, 405);

  const authHeader = req.headers.get("Authorization") ?? "";
  const token = authHeader.replace(/^Bearer\s+/i, "");
  if (!token) return json({ error: "Not signed in." }, 401);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceKey) {
    return json({ error: "Server is missing Supabase credentials." }, 500);
  }

  const admin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: userData, error: userError } = await admin.auth.getUser(token);
  if (userError || !userData?.user?.email) {
    return json({ error: "Your session has expired. Sign in again." }, 401);
  }

  if (!allowedEmails().has(userData.user.email.toLowerCase())) {
    return json(
      {
        error: `Not authorized to publish question edits: ${userData.user.email} isn't in the server's DEV_EMAILS list.`,
      },
      403,
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Request body must be valid JSON." }, 400);
  }

  const validated = validatePayload(body);
  if ("error" in validated) return json({ error: validated.error }, 400);
  const overrides = validated.overrides ?? {};
  const newItems = validated.newItems ?? {};
  const bundles = validated.interviewBundles;
  const interviewQuestions = validated.interviewQuestions?.length ? validated.interviewQuestions : undefined;
  const deletedQuestions = validated.interviewDeletedQuestions?.length ? validated.interviewDeletedQuestions : undefined;

  const changedIds = [...Object.keys(overrides), ...Object.keys(newItems)];
  if (changedIds.length === 0 && !bundles && !interviewQuestions && !deletedQuestions) {
    return json({ error: "Nothing to publish — no edits, new items, bundles or interview questions were sent." }, 400);
  }

  const githubToken = Deno.env.get("GITHUB_TOKEN");
  const owner = Deno.env.get("GITHUB_OWNER");
  const repo = Deno.env.get("GITHUB_REPO");
  if (!githubToken || !owner || !repo) {
    return json(
      { error: "Publishing isn't configured yet: GITHUB_TOKEN, GITHUB_OWNER and GITHUB_REPO must be set." },
      500,
    );
  }
  const baseBranch = Deno.env.get("GITHUB_BASE_BRANCH") || "main";

  try {
    // 1. Latest commit on the base branch.
    const baseRefRes = await githubFetch(
      `/repos/${owner}/${repo}/git/ref/heads/${baseBranch}`,
      githubToken,
    );
    if (!baseRefRes.ok) {
      throw new Error(`Could not read base branch "${baseBranch}" (${baseRefRes.status}).`);
    }
    const baseRef = await baseRefRes.json();
    const baseSha = baseRef.object.sha as string;

    // 2. A fresh branch off the base branch's current tip.
    const branchName = `dev-questions/${Date.now()}`;
    const createBranchRes = await githubFetch(`/repos/${owner}/${repo}/git/refs`, githubToken, {
      method: "POST",
      body: JSON.stringify({ ref: `refs/heads/${branchName}`, sha: baseSha }),
    });
    if (!createBranchRes.ok) {
      const detail = await createBranchRes.text();
      throw new Error(`Could not create branch (${createBranchRes.status}): ${detail.slice(0, 200)}`);
    }

    /** Reads a file on the base branch; null when it does not exist yet. */
    async function readBase(path: string): Promise<{ sha: string; text: string } | null> {
      const res = await githubFetch(`/repos/${owner}/${repo}/contents/${path}?ref=${baseBranch}`, githubToken!);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error(`Could not read ${path} (${res.status}).`);
      const data = await res.json();
      return { sha: data.sha, text: b64decode(data.content.replace(/\n/g, "")) };
    }

    async function writeBranch(path: string, content: string, message: string, sha?: string) {
      const putRes = await githubFetch(`/repos/${owner}/${repo}/contents/${path}`, githubToken!, {
        method: "PUT",
        body: JSON.stringify({ message, content: b64encode(content), branch: branchName, ...(sha ? { sha } : {}) }),
      });
      if (!putRes.ok) {
        const detail = await putRes.text();
        throw new Error(`Could not write ${path} (${putRes.status}): ${detail.slice(0, 200)}`);
      }
    }

    // 3. Item edits: merged into devOverrides.json as it is on the base
    // branch, so this PR is additive to anything an earlier PR already
    // carries into main.
    if (changedIds.length > 0) {
      const base = await readBase(OVERRIDES_PATH);
      const current: OverridesFile = base ? JSON.parse(base.text) : { overrides: {}, newItems: {} };
      const merged: OverridesFile = {
        overrides: { ...current.overrides, ...overrides },
        newItems: { ...current.newItems, ...newItems },
      };
      await writeBranch(
        OVERRIDES_PATH,
        JSON.stringify(merged, null, 2) + "\n",
        `Question bank: ${changedIds.length} item(s) via /dev/questions\n\n${changedIds.join(", ")}`,
        base?.sha,
      );
    }

    // 4. Interview bundles: the editor holds the whole list, so it replaces
    // the file. Written in the same one-space JSON the importer produced, so
    // the PR diff shows only real changes.
    let bundleSummary = "";
    if (bundles) {
      const base = await readBase(BUNDLES_PATH);
      const before: Bundle[] = base ? JSON.parse(base.text) : [];
      const beforeById = new Map(before.map((b) => [b.id, JSON.stringify(b)]));
      const added = bundles.filter((b) => !beforeById.has(b.id)).map((b) => b.id);
      const changed = bundles.filter((b) => beforeById.has(b.id) && beforeById.get(b.id) !== JSON.stringify(b)).map((b) => b.id);
      const removed = before.filter((b) => !bundles.some((n) => n.id === b.id)).map((b) => b.id);
      bundleSummary =
        [
          added.length && `Added: ${added.map((id) => `\`${id}\``).join(", ")}`,
          changed.length && `Changed: ${changed.map((id) => `\`${id}\``).join(", ")}`,
          removed.length && `Removed: ${removed.map((id) => `\`${id}\``).join(", ")}`,
        ]
          .filter(Boolean)
          .join("\n") || "No differences from the base branch.";
      await writeBranch(
        BUNDLES_PATH,
        JSON.stringify(bundles, null, 1) + "\n",
        `Interview bundles via /dev/bundles\n\n${bundleSummary}`,
        base?.sha,
      );
    }

    // 5. Interview questions: merged by id into questions.json as it is on the
    // base branch — edited ones replaced in place, new ones appended — so a
    // PR carries only the questions this developer touched.
    let questionSummary = "";
    if (interviewQuestions || deletedQuestions) {
      const base = await readBase(QUESTIONS_PATH);
      const current: InterviewQuestion[] = base ? JSON.parse(base.text) : [];
      const incoming = new Map((interviewQuestions ?? []).map((q) => [q.id, q]));
      const deleting = new Set(deletedQuestions ?? []);
      const existing = new Set(current.map((q) => q.id));
      const merged = current.filter((q) => !deleting.has(q.id)).map((q) => incoming.get(q.id) ?? q);
      const added = (interviewQuestions ?? []).filter((q) => !existing.has(q.id)).sort((a, b) => a.id.localeCompare(b.id));
      merged.push(...added);
      const changed = (interviewQuestions ?? []).filter((q) => existing.has(q.id)).map((q) => q.id);
      const removed = [...deleting].filter((id) => existing.has(id));
      const code = (id: string) => "`" + id + "`";
      questionSummary = [
        added.length && `Added: ${added.map((q) => code(q.id)).join(", ")}`,
        changed.length && `Changed: ${changed.map(code).join(", ")}`,
        removed.length && `Removed: ${removed.map(code).join(", ")}`,
      ]
        .filter(Boolean)
        .join("\n");
      await writeBranch(
        QUESTIONS_PATH,
        JSON.stringify(merged, null, 1) + "\n",
        `Interview questions via /dev/bundles\n\n${questionSummary}`,
        base?.sha,
      );
    }

    // 6. Open the PR.
    const parts = [
      changedIds.length > 0 && `${changedIds.length} item(s)`,
      bundles && "interview bundles",
      interviewQuestions && `${interviewQuestions.length} interview question(s)`,
      deletedQuestions && `${deletedQuestions.length} deleted interview question(s)`,
    ].filter(Boolean);
    const prRes = await githubFetch(`/repos/${owner}/${repo}/pulls`, githubToken, {
      method: "POST",
      body: JSON.stringify({
        title: `Question bank: ${parts.join(" and ")} from the dev editor`,
        head: branchName,
        base: baseBranch,
        body:
          `Published from the dev editor by ${userData.user.email}.\n\n` +
          (changedIds.length > 0 ? `**Items:**\n${changedIds.map((id) => `- \`${id}\``).join("\n")}\n\n` : "") +
          (bundles ? `**Interview bundles:**\n${bundleSummary}\n\n` : "") +
          (interviewQuestions || deletedQuestions ? `**Interview questions:**\n${questionSummary}\n` : ""),
      }),
    });
    if (!prRes.ok) {
      const detail = await prRes.text();
      throw new Error(`Could not open PR (${prRes.status}): ${detail.slice(0, 200)}`);
    }
    const pr = await prRes.json();

    return json({ prUrl: pr.html_url as string, prNumber: pr.number as number });
  } catch (err) {
    return json({ error: err instanceof Error ? err.message : "Publish failed." }, 500);
  }
});
