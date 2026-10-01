import { Link } from "react-router-dom";
import { useAuth } from "../lib/auth/useAuth";

const bigButton =
  "font-body inline-block rounded-full px-10 py-4 text-lg font-semibold text-[var(--accent-ink)] shadow-sm transition-transform hover:-translate-y-0.5";

export function Hero() {
  const { user, loading } = useAuth();

  return (
    <section className="flex min-h-[calc(100vh-14rem)] items-center">
      <div className="mx-auto max-w-4xl px-6 py-20 text-center">
        <h1 className="font-display text-5xl leading-tight text-[var(--ink)] md:text-7xl">
          Get sharp.
          <br />
          Stay sharp.
        </h1>
        <p className="font-body mt-6 text-lg text-[var(--ink-soft)]">
          Learn the math you want. Prep for the quant interview you need.
        </p>

        <div className="mt-12 flex flex-col items-center gap-4">
          {loading ? (
            <div className="h-[60px]" aria-hidden="true" />
          ) : user ? (
            <>
              <Link to="/map" className={bigButton} style={{ background: "var(--accent)" }}>
                Continue learning
              </Link>
              <Link to="/interview" className="font-body text-sm font-medium text-[var(--accent)] hover:underline">
                Interview prep →
              </Link>
            </>
          ) : (
            <>
              <Link to="/signup" className={bigButton} style={{ background: "var(--accent)" }}>
                Get started
              </Link>
              <p className="font-body text-sm text-[var(--ink-soft)]">
                Already have an account?{" "}
                <Link to="/login" className="font-medium text-[var(--accent)] hover:underline">
                  Log in
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
