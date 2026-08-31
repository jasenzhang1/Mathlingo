import { features } from "../data/features";

export function Features() {
  return (
    <section id="how-it-works" className="border-b border-[var(--line)]">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center">
          <h2 className="font-display text-3xl text-[var(--ink)] md:text-4xl">
            Built to stick, not to skim
          </h2>
          <p className="font-body mx-auto mt-3 max-w-xl text-[var(--ink-soft)]">
            Anki for memory. A tutor for intuition. Mathlingo borrows the
            parts of learning that actually work.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-5">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="font-body flex flex-col gap-3 bg-[var(--panel)] p-6"
            >
              <span className="font-display text-sm text-[var(--teal)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-lg text-[var(--ink)]">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--ink-soft)]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
