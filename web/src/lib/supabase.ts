import { createClient } from "@supabase/supabase-js";

/**
 * One Supabase client for the whole app. Vite only exposes env vars prefixed
 * VITE_ to client code — see .env.example for what needs to be set, and the
 * project README for how to get these values from your Supabase dashboard.
 */

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  throw new Error(
    "Missing Supabase config. Copy web/.env.example to web/.env and fill in " +
      "VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY from your Supabase project's " +
      "dashboard (Settings -> API).",
  );
}

export const supabase = createClient(url, anonKey);
