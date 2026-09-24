import { createClient } from "npm:@supabase/supabase-js@2";
import { json, preflight } from "../_shared/cors.ts";

/**
 * Turns a developer's local edits from `/dev/questions` into a pull request
 * against the site's own repo, updating `web/src/data/devOverrides.json` —
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
const GITHUB_API = "https://api.github.com";

interface Item {
  id: string;
  conceptId: string;
  [key: string]: unknown;
}

interface PublishRequest {
  overrides?: Record<string, Item>;
  newItems?: Record<string, Item>;
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

function validatePayload(body: unknown): PublishRequest | { error: string } {
  if (!body || typeof body !== "object") return { error: "Request body must be an object." };
  const { overrides, newItems } = body as PublishRequest;
  for (const [key, value] of Object.entries({ ...overrides, ...newItems })) {
    if (!isPlainItem(value)) {
      return { error: `Item "${key}" is missing a valid id/conceptId.` };
    }
    if (value.id !== key) {
      return { error: `Item keyed "${key}" has id "${value.id}" — keys must match ids.` };
    }
  }
  return { overrides: overrides ?? {}, newItems: newItems ?? {} };
}

function allowedEmails(): Set<string> {
  const raw = Deno.env.get("DEV_EMAILS") ?? "jasenzhang@g.ucla.edu";
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
    return json({ error: "Not authorized to publish question edits." }, 403);
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Request body must be valid JSON." }, 400);
  }

  const validated = validatePayload(body);
  if ("error" in validated) return json({ error: validated.error }, 400);
  const { overrides, newItems } = validated;

  const changedIds = [...Object.keys(overrides), ...Object.keys(newItems)];
  if (changedIds.length === 0) {
    return json({ error: "Nothing to publish — no edits or new items were sent." }, 400);
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

    // 2. Current devOverrides.json on the base branch, so this PR is additive
    // to anything an earlier, still-unmerged PR already carries in main.
    let current: OverridesFile = { overrides: {}, newItems: {} };
    let fileSha: string | undefined;
    const fileRes = await githubFetch(
      `/repos/${owner}/${repo}/contents/${OVERRIDES_PATH}?ref=${baseBranch}`,
      githubToken,
    );
    if (fileRes.ok) {
      const fileData = await fileRes.json();
      fileSha = fileData.sha;
      current = JSON.parse(b64decode(fileData.content.replace(/\n/g, "")));
    } else if (fileRes.status !== 404) {
      throw new Error(`Could not read ${OVERRIDES_PATH} (${fileRes.status}).`);
    }

    const merged: OverridesFile = {
      overrides: { ...current.overrides, ...overrides },
      newItems: { ...current.newItems, ...newItems },
    };

    // 3. A fresh branch off the base branch's current tip.
    const branchName = `dev-questions/${Date.now()}`;
    const createBranchRes = await githubFetch(`/repos/${owner}/${repo}/git/refs`, githubToken, {
      method: "POST",
      body: JSON.stringify({ ref: `refs/heads/${branchName}`, sha: baseSha }),
    });
    if (!createBranchRes.ok) {
      const detail = await createBranchRes.text();
      throw new Error(`Could not create branch (${createBranchRes.status}): ${detail.slice(0, 200)}`);
    }

    // 4. Write the merged overrides file to that branch.
    const putRes = await githubFetch(`/repos/${owner}/${repo}/contents/${OVERRIDES_PATH}`, githubToken, {
      method: "PUT",
      body: JSON.stringify({
        message: `Question bank: ${changedIds.length} item(s) via /dev/questions\n\n${changedIds.join(", ")}`,
        content: b64encode(JSON.stringify(merged, null, 2) + "\n"),
        branch: branchName,
        ...(fileSha ? { sha: fileSha } : {}),
      }),
    });
    if (!putRes.ok) {
      const detail = await putRes.text();
      throw new Error(`Could not write ${OVERRIDES_PATH} (${putRes.status}): ${detail.slice(0, 200)}`);
    }

    // 5. Open the PR.
    const prRes = await githubFetch(`/repos/${owner}/${repo}/pulls`, githubToken, {
      method: "POST",
      body: JSON.stringify({
        title: `Question bank: ${changedIds.length} item(s) from the dev editor`,
        head: branchName,
        base: baseBranch,
        body:
          `Published from \`/dev/questions\` by ${userData.user.email}.\n\n` +
          `**Items:**\n${changedIds.map((id) => `- \`${id}\``).join("\n")}`,
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
