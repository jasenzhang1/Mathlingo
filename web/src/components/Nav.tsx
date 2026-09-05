import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../lib/auth/useAuth";
import { useOwnProfile } from "../lib/profiles";
import { GlobalSearch } from "./GlobalSearch";

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

function initialsFor(email: string): string {
  return email.slice(0, 2).toUpperCase();
}

function UserMenu() {
  const { user, signOut } = useAuth();
  const profile = useOwnProfile();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  if (!user) return null;

  async function handleSignOut() {
    setOpen(false);
    await signOut();
    navigate("/");
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold text-[var(--accent-ink)]"
        style={{ background: "var(--accent)" }}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {initialsFor(user.email ?? "?")}
      </button>
      {open && (
        <>
          {/* Click-outside catcher */}
          <button
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setOpen(false)}
          />
          <div
            role="menu"
            className="font-body absolute right-0 z-50 mt-2 w-56 rounded-xl border border-[var(--line)] bg-[var(--panel)] p-1.5 shadow-lg"
          >
            <div className="truncate px-3 py-2 text-xs text-[var(--ink-soft)]">
              {user.email}
            </div>
            {profile && (
              <Link
                to={`/u/${profile.username}`}
                role="menuitem"
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-left text-sm text-[var(--ink)] hover:bg-[var(--paper)]"
              >
                My profile
              </Link>
            )}
            <Link
              to="/account"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-left text-sm text-[var(--ink)] hover:bg-[var(--paper)]"
            >
              Account &amp; billing
            </Link>
            <button
              type="button"
              role="menuitem"
              onClick={handleSignOut}
              className="w-full rounded-lg px-3 py-2 text-left text-sm text-[var(--ink)] hover:bg-[var(--paper)]"
            >
              Log out
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function SearchToggleIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4.5 w-4.5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      aria-hidden="true"
    >
      <circle cx={8.5} cy={8.5} r={5.5} />
      <path d="M16.5 16.5 13 13" strokeLinecap="round" />
    </svg>
  );
}

export function Nav() {
  const { user, loading } = useAuth();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <header
      id="top"
      className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--paper)]/90 backdrop-blur"
    >
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-6 py-4">
        <Logo />
        <nav className="hidden items-center gap-8 font-body text-sm text-[var(--ink-soft)] md:flex">
          <Link to="/map" className="hover:text-[var(--ink)]">
            Concept map
          </Link>
          <a href="/#topics" className="hover:text-[var(--ink)]">
            Topics
          </a>
          <a href="/#how-it-works" className="hover:text-[var(--ink)]">
            How it works
          </a>
          <a href="/#bootcamp" className="hover:text-[var(--ink)]">
            Bootcamp
          </a>
          <Link to="/pricing" className="hover:text-[var(--ink)]">
            Pricing
          </Link>
        </nav>

        <GlobalSearch className="hidden flex-1 sm:block sm:max-w-xs" />

        <button
          type="button"
          onClick={() => setMobileSearchOpen((v) => !v)}
          aria-label="Search"
          aria-expanded={mobileSearchOpen}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[var(--ink-soft)] hover:text-[var(--ink)] sm:hidden"
        >
          <SearchToggleIcon />
        </button>

        <div className="ml-auto flex shrink-0 items-center gap-3">
          {loading ? null : user ? (
            <UserMenu />
          ) : (
            <>
              <Link
                to="/login"
                className="font-body hidden text-sm font-medium text-[var(--ink-soft)] hover:text-[var(--ink)] sm:inline"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="font-body rounded-full px-4 py-2 text-sm font-medium text-[var(--accent-ink)] transition-opacity hover:opacity-90"
                style={{ background: "var(--accent)" }}
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>

      {mobileSearchOpen && (
        <div className="border-t border-[var(--line)] px-6 py-3 sm:hidden">
          <GlobalSearch />
        </div>
      )}
    </header>
  );
}
