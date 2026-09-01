interface HeroProps {
  onPickPath: (path: "refresh" | "bootcamp") => void;
}

export function Hero({ onPickPath }: HeroProps) {
  return (
    <section className="border-b border-[var(--line)]">
      <div className="mx-auto max-w-6xl px-6 py-20 text-center md:py-28">
        <p className="font-body text-sm font-medium uppercase tracking-[0.2em] text-[var(--teal)]">
          Duolingo, for the math you used to know
        </p>
        <h1 className="font-display mx-auto mt-5 max-w-3xl text-4xl leading-tight text-[var(--ink)] md:text-6xl">
          Get sharp. Stay sharp. Break in.
        </h1>
        <p className="font-body mx-auto mt-6 max-w-2xl text-lg text-[var(--ink-soft)]">
          Mathlingo drills the linear algebra, calculus, and statistics
          behind ML, AI, and quant work — in short, spaced, analogy-driven
          reps, not another dry textbook chapter.
        </p>

        <div className="mx-auto mt-9 flex max-w-xl flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => onPickPath("refresh")}
            className="font-body rounded-full px-6 py-3 text-sm font-semibold text-[var(--accent-ink)] shadow-sm transition-transform hover:-translate-y-0.5"
            style={{ background: "var(--accent)" }}
          >
            Refresh skills I've forgotten
          </button>
          <button
            type="button"
            onClick={() => onPickPath("bootcamp")}
            className="font-body rounded-full border border-[var(--line)] bg-[var(--panel)] px-6 py-3 text-sm font-semibold text-[var(--ink)] shadow-sm transition-transform hover:-translate-y-0.5"
          >
            Break into ML / data roles
          </button>
        </div>

        <a
          href="#map"
          className="font-body mt-6 inline-block text-sm font-medium text-[var(--accent)] hover:underline"
        >
          Or explore the concept map →
        </a>

        <dl className="font-body mx-auto mt-16 grid max-w-2xl grid-cols-2 gap-8 text-left sm:grid-cols-4 sm:text-center">
          {[
            ["6", "core subjects"],
            ["1000+", "drilled concepts"],
            ["SM-2", "spaced repetition"],
            ["AI", "graded free response"],
          ].map(([stat, label]) => (
            <div key={label}>
              <dt className="font-display text-2xl text-[var(--ink)]">
                {stat}
              </dt>
              <dd className="mt-1 text-xs uppercase tracking-wide text-[var(--ink-soft)]">
                {label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
