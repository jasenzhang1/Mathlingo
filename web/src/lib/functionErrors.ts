/**
 * Interprets an error from `supabase.functions.invoke`.
 *
 * supabase-js does not surface the HTTP status directly — it throws one of
 * three named errors, and only FunctionsHttpError carries the `Response` (on
 * `.context`), whose body holds whatever the function itself reported. That
 * detail matters: "the function isn't deployed" and "the function ran and threw"
 * need different messages to the user, and the generic
 * "Edge Function returned a non-2xx status code" tells them neither.
 */

export interface FunctionFailure {
  reason: "unavailable" | "error";
  message: string;
}

export async function describeFunctionError(error: unknown): Promise<FunctionFailure> {
  const name = (error as { name?: string })?.name ?? "";
  const fallback = (error as { message?: string })?.message ?? "Unknown error";

  // Never reached the function: no network, wrong project URL, or (most often
  // during setup) the function was never deployed.
  if (name === "FunctionsFetchError" || name === "FunctionsRelayError") {
    return { reason: "unavailable", message: fallback };
  }

  const context = (error as { context?: unknown }).context;
  if (context instanceof Response) {
    // 404 from the functions gateway is the "not deployed" case.
    if (context.status === 404) {
      return { reason: "unavailable", message: "Function not found (404)." };
    }
    try {
      const body = await context.clone().json();
      const detail = typeof body?.error === "string" ? body.error : JSON.stringify(body);
      return { reason: "error", message: `${context.status}: ${detail.slice(0, 300)}` };
    } catch {
      return { reason: "error", message: `${context.status}: ${context.statusText}` };
    }
  }

  return { reason: "error", message: fallback };
}
