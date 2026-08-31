export function BootcampCallout() {
  return (
    <section id="bootcamp" className="border-b border-[var(--line)]">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div
          className="grid grid-cols-1 gap-10 rounded-3xl p-10 text-[var(--accent-ink)] md:grid-cols-2 md:p-14"
          style={{
            background:
              "linear-gradient(135deg, var(--accent), #3a2599 120%)",
          }}
        >
          <div>
            <p className="font-body text-sm font-medium uppercase tracking-[0.2em] opacity-80">
              For career switchers
            </p>
            <h2 className="font-display mt-4 text-3xl md:text-4xl">
              Break into ML engineering, without a second degree
            </h2>
            <p className="font-body mt-4 max-w-md text-white/85">
              The Mathlingo Bootcamp track sequences linear algebra,
              calculus, probability, ML foundations, and interview-ready
              CS fundamentals into one path — built for people who learn
              better by doing than by reading.
            </p>
            <a
              href="#signup"
              className="font-body mt-8 inline-block rounded-full bg-white px-6 py-3 text-sm font-semibold text-[var(--accent)] transition-transform hover:-translate-y-0.5"
            >
              See the bootcamp path
            </a>
          </div>

          <ul className="font-body flex flex-col justify-center gap-4 text-sm">
            {[
              "Skill tree shows exactly what unlocks ML foundations",
              "Mock interview mode, graded by AI like a real screen",
              "No prerequisites beyond high-school math to start",
              "Built for people already working full-time",
            ].map((line) => (
              <li key={line} className="flex items-start gap-3">
                <span
                  className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs"
                  aria-hidden="true"
                >
                  ✓
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
