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
