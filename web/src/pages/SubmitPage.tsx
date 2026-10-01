import { Link } from "react-router-dom";
import { Community } from "../components/Community";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";

const tile =
  "font-body rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6 text-left transition-transform hover:-translate-y-0.5";

/**
 * The Submit tab: the community deck, plus the two ways to contribute to the
 * curriculum itself. Contributors build reputation from upvoted cards,
 * questions and analogies.
 */
export function SubmitPage() {
  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <Nav />
      <main>
        <section className="border-b border-[var(--line)]">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <h1 className="font-display text-4xl text-[var(--ink)] md:text-5xl">Submit</h1>
            <p className="font-body mt-3 max-w-2xl text-[var(--ink-soft)]">
              Write the card, question or analogy you wish you'd been given. Good submissions get upvoted,
              build your reputation and earn badges — and could even earn you money.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Link to="/submit/questions" className={tile}>
                <span className="font-display text-lg text-[var(--ink)]">Submit a question →</span>
                <span className="mt-1 block text-sm text-[var(--ink-soft)]">
                  With its answer, for a topic you've mastered.
                </span>
              </Link>
              <Link to="/submit/analogies" className={tile}>
                <span className="font-display text-lg text-[var(--ink)]">Submit an analogy →</span>
                <span className="mt-1 block text-sm text-[var(--ink-soft)]">
                  The explanation that finally made it click for you.
                </span>
              </Link>
            </div>
          </div>
        </section>
        <Community />
      </main>
      <Footer />
    </div>
  );
}
