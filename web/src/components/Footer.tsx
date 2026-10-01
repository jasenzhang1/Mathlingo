import { Link } from "react-router-dom";

/** Company and information links. About, Careers and Press join "How it works" here once those pages exist. */
const links = [{ to: "/how-it-works", label: "How it works" }];

export function Footer() {
  return (
    <footer className="font-body border-t border-[var(--line)]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-[var(--ink-soft)] sm:flex-row">
        <p>© {new Date().getFullYear()} Mathlingo</p>
        <nav className="flex flex-wrap items-center gap-6">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="hover:text-[var(--ink)]">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
