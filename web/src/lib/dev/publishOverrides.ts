import { describeFunctionError } from "../functionErrors";
import { supabase } from "../supabase";
import type { ItemOverrideStore } from "./itemOverrides";

/**
 * Sends the local `/dev/questions` edits to the `publish-item-edits` Edge
 * Function, which opens a GitHub PR against `web/src/data/devOverrides.json`.
 * See `supabase/README.md` for the one-time GitHub token setup this depends on.
 */

export type PublishResult =
  | { ok: true; prUrl: string; prNumber: number }
  | { ok: false; message: string };

export async function publishOverrides(store: ItemOverrideStore): Promise<PublishResult> {
  const { data, error } = await supabase.functions.invoke<{ prUrl: string; prNumber: number }>(
    "publish-item-edits",
    { body: { overrides: store.overrides, newItems: store.newItems } },
  );

  if (error) {
    const failure = await describeFunctionError(error);
    return { ok: false, message: failure.message };
  }
  if (!data?.prUrl) return { ok: false, message: "Publish succeeded but returned no PR link." };
  return { ok: true, prUrl: data.prUrl, prNumber: data.prNumber };
}

/**
 * `devOverrides.json` as it is on main right now, or null if it can't be read
 * (publishing not configured, offline). Used to clear local edits once merged.
 */
export async function fetchPublishedOverrides(): Promise<ItemOverrideStore | null> {
  const { data, error } = await supabase.functions.invoke<ItemOverrideStore>("publish-item-edits", {
    body: { action: "published" },
  });
  if (error || !data) return null;
  return { overrides: data.overrides ?? {}, newItems: data.newItems ?? {} };
}

/**
 * Sends interview edits from `/dev/bundles` to the same function, which opens
 * one PR: the full bundle list replaces `web/src/data/interview/bundles.json`,
 * edited or new questions are merged by id into `questions.json`, and deleted
 * question ids are removed from it. Any part may be omitted.
 */
export async function publishInterview(edits: { bundles?: unknown[]; questions?: unknown[]; deletedQuestions?: string[] }): Promise<PublishResult> {
  const { data, error } = await supabase.functions.invoke<{ prUrl: string; prNumber: number }>(
    "publish-item-edits",
    {
      body: {
        interviewBundles: edits.bundles,
        interviewQuestions: edits.questions,
        interviewDeletedQuestions: edits.deletedQuestions,
      },
    },
  );
  if (error) {
    const failure = await describeFunctionError(error);
    return { ok: false, message: failure.message };
  }
  if (!data?.prUrl) return { ok: false, message: "Publish succeeded but returned no PR link." };
  return { ok: true, prUrl: data.prUrl, prNumber: data.prNumber };
}
