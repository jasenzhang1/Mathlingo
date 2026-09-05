/**
 * Browsers preflight every supabase.functions.invoke call, so each function
 * must answer OPTIONS before it will answer anything else.
 *
 * ALLOWED_ORIGIN should be set to the deployed site's origin in production:
 *   supabase secrets set ALLOWED_ORIGIN=https://your-site.example
 * It defaults to "*" so local development works out of the box. That default is
 * safe here only because both functions require a valid Supabase JWT — the
 * origin header is not what is protecting them.
 */
const allowedOrigin = Deno.env.get("ALLOWED_ORIGIN") ?? "*";

export const corsHeaders = {
  "Access-Control-Allow-Origin": allowedOrigin,
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

export function preflight(req: Request): Response | null {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  return null;
}

export function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
