import { describeFunctionError } from "../functionErrors";
import { supabase } from "../supabase";

/**
 * Client for the conversational tutor. Like the grader, the model call lives in
 * a Supabase Edge Function (`supabase/functions/tutor/`) because the API key
 * cannot ship to the browser.
 */

export interface TutorMessage {
  role: "user" | "assistant";
  content: string;
}

export type TutorResult =
  | { ok: true; reply: string }
  | { ok: false; reason: "unavailable" | "error"; message: string };

export async function askTutor(input: {
  conceptId: string;
  conceptTitle: string;
  messages: TutorMessage[];
}): Promise<TutorResult> {
  const { data, error } = await supabase.functions.invoke<{ reply: string }>("tutor", {
    body: input,
  });

  if (error) {
    return { ok: false, ...(await describeFunctionError(error)) };
  }
  if (!data?.reply) {
    return { ok: false, reason: "error", message: "The tutor returned no reply." };
  }
  return { ok: true, reply: data.reply };
}
