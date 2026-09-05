import { createClient } from "npm:@supabase/supabase-js@2";

/**
 * Server-side entitlement checks for the paid functions.
 *
 * Gating in the React app is presentation only — it hides buttons. Anyone can
 * call an Edge Function directly with their own access token, so if the check
 * did not also live here, a free user could invoke the grader by hand and we
 * would pay Anthropic for it. This is the enforcement; the UI is the courtesy.
 */

export type Tier = "free" | "graded" | "tutored";

const RANK: Record<Tier, number> = { free: 0, graded: 1, tutored: 2 };

export function meetsTier(actual: string, required: Tier): boolean {
  return (RANK[actual as Tier] ?? 0) >= RANK[required];
}

export interface Caller {
  userId: string;
  tier: Tier;
}

export type EntitlementResult =
  | { ok: true; caller: Caller }
  | { ok: false; status: number; error: string; upgradeTo?: Tier };

/**
 * Resolves the caller from their JWT and looks up their effective tier.
 *
 * The tier comes from `public.effective_tier`, a SECURITY DEFINER function that
 * also enforces subscription status and period end — so an expired or cancelled
 * subscription resolves to 'free' without this code having to re-implement that
 * logic and risk disagreeing with it.
 */
export async function requireTier(
  req: Request,
  required: Tier,
): Promise<EntitlementResult> {
  const authHeader = req.headers.get("Authorization") ?? "";
  const token = authHeader.replace(/^Bearer\s+/i, "");
  if (!token) {
    return { ok: false, status: 401, error: "Not signed in." };
  }

  const url = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !serviceKey) {
    return { ok: false, status: 500, error: "Server is missing Supabase credentials." };
  }

  const admin = createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // Validate the token rather than trusting its claims — a JWT presented by a
  // caller proves nothing until the auth server confirms it.
  const { data: userData, error: userError } = await admin.auth.getUser(token);
  if (userError || !userData?.user) {
    return { ok: false, status: 401, error: "Your session has expired. Sign in again." };
  }

  const userId = userData.user.id;

  const { data, error } = await admin.rpc("effective_tier", { p_user_id: userId });
  if (error) {
    return { ok: false, status: 500, error: `Could not read subscription: ${error.message}` };
  }

  const tier = (data as Tier | null) ?? "free";

  if (!meetsTier(tier, required)) {
    return {
      ok: false,
      status: 402, // Payment Required — the client keys its upgrade prompt off this.
      error:
        required === "tutored"
          ? "The AI tutor is part of the Tutored plan."
          : "AI grading of written answers is part of the Graded plan.",
      upgradeTo: required,
    };
  }

  return { ok: true, caller: { userId, tier } };
}
