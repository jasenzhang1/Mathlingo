import { useMemo, useState, type FormEvent } from "react";
import { getSchoolName, isEduEmail } from "../data/eduDomains";

export function Signup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const isStudent = useMemo(() => isEduEmail(email), [email]);
  const schoolName = useMemo(() => getSchoolName(email), [email]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <section id="signup" className="border-b border-[var(--line)]">
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h2 className="font-display text-3xl text-[var(--ink)] md:text-4xl">
          Be first in when we open the doors
        </h2>
        <p className="font-body mt-3 text-[var(--ink-soft)]">
          We're building the first tracks now. Leave your email and we'll
          let you know the moment Mathlingo is ready to drill.
        </p>

        {submitted ? (
          <div className="font-body mt-8 space-y-2">
            <p className="rounded-full border border-[var(--line)] bg-[var(--accent-soft)] px-6 py-3 text-sm font-medium text-[var(--ink)]">
              You're on the list — we'll be in touch.
            </p>
            {isStudent && (
              <p className="text-sm text-[var(--ink-soft)]">
                {schoolName ? (
                  <>You're in as a {schoolName} student</>
                ) : (
                  <>You're in with a verified student email</>
                )}{" "}
                — you'll get the student discount and an invite to your
                school's forum when we launch.
              </p>
            )}
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="font-body mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-full border border-[var(--line)] bg-[var(--panel)] px-5 py-3 text-sm text-[var(--ink)] outline-none focus:border-[var(--accent)]"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full px-6 py-3 text-sm font-semibold text-[var(--accent-ink)] transition-opacity hover:opacity-90"
              style={{ background: "var(--accent)" }}
            >
              Join the waitlist
            </button>
          </form>
        )}

        {!submitted && isStudent && (
          <p className="font-body mt-3 text-sm text-[var(--ink-soft)]">
            {schoolName ?? "Student"} email detected — join with this address
            to unlock the student discount and your school's forum.
          </p>
        )}
      </div>
    </section>
  );
}
