import { createClient } from "@supabase/supabase-js";

/**
 * One Supabase client for the whole app. Vite only exposes env vars prefixed
 * VITE_ to client code — see .env.example for what needs to be set, and the
 * project README for how to get these values from your Supabase dashboard.
 */

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * A missing config used to throw here, which — since this module is imported
 * by AuthContext, which wraps the whole router — took down every route, not
 * just the auth-dependent ones. Slides, wiki, and the concept map don't touch
 * Supabase at all, so they shouldn't die because it isn't configured yet.
 * We warn instead and fall back to a placeholder client; calls that actually
 * hit the network will fail and surface through each API's own `{ data,
 * error }` return value, same as any other Supabase error.
 */
if (!url || !anonKey) {
  console.warn(
    "Missing Supabase config. Copy web/.env.example to web/.env and fill in " +
      "VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY from your Supabase project's " +
      "dashboard (Settings -> API). Auth, tutor, assessment, billing, and forum " +
      "features will not work until this is set.",
  );
}

export const supabase = createClient(
  url || "https://placeholder.supabase.co",
  anonKey || "placeholder-anon-key",
);
