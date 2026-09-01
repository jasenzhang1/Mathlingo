import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 font-body">
      <span
        className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-semibold text-[var(--accent-ink)]"
        style={{ background: "var(--accent)" }}
        aria-hidden="true"
      >
        M
      </span>
      <span className="font-display text-lg tracking-tight text-[var(--ink)]">
        Mathlingo
      </span>
    </Link>
  );
}

export function Nav() {
  return (
    <header
      id="top"
      className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--paper)]/90 backdrop-blur"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Logo />
        <nav className="hidden items-center gap-8 font-body text-sm text-[var(--ink-soft)] md:flex">
          <a href="/#map" className="hover:text-[var(--ink)]">
            Concept map
          </a>
          <a href="/#topics" className="hover:text-[var(--ink)]">
            Topics
          </a>
          <a href="/#how-it-works" className="hover:text-[var(--ink)]">
            How it works
          </a>
          <a href="/#bootcamp" className="hover:text-[var(--ink)]">
            Bootcamp
          </a>
        </nav>
        <a
          href="/#signup"
          className="rounded-full px-4 py-2 font-body text-sm font-medium text-[var(--accent-ink)] transition-opacity hover:opacity-90"
          style={{ background: "var(--accent)" }}
        >
          Join the waitlist
        </a>
      </div>
    </header>
  );
}
