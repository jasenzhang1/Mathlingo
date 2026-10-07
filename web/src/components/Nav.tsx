import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../lib/auth/useAuth";
import { useIsDeveloper, useIsRealDeveloper } from "../lib/dev/devAuth";
import { setStudentView, useStudentView, type StudentView } from "../lib/dev/studentView";
import { useOwnProfile } from "../lib/profiles";
import { inboxCount } from "../lib/social/social";
import { Avatar } from "./Avatar";
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

function UserMenu() {
  const { user, signOut } = useAuth();
  const profile = useOwnProfile();
  const isDeveloper = useIsDeveloper();
  const isRealDeveloper = useIsRealDeveloper();
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
        className="flex rounded-full ring-offset-2 ring-offset-[var(--paper)] hover:ring-2 hover:ring-[var(--accent)]"
        aria-label="Account menu"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <Avatar url={profile?.avatarUrl} name={profile?.displayName ?? user.email ?? "?"} size={36} />
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
            {profile?.school && (
              <Link
                to="/forums?space=school"
                role="menuitem"
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-left text-sm text-[var(--ink)] hover:bg-[var(--paper)]"
              >
                Your school forum
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
            {isDeveloper && (
              <Link
                to="/dev/questions"
                role="menuitem"
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-left text-sm text-[var(--ink)] hover:bg-[var(--paper)]"
              >
                Question bank (dev)
              </Link>
            )}
            {isDeveloper && (
              <Link
                to="/dev/bundles"
                role="menuitem"
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-left text-sm text-[var(--ink)] hover:bg-[var(--paper)]"
              >
                Interview databank (dev)
              </Link>
            )}
            {isDeveloper && (
              <Link
                to="/dev/feedback"
                role="menuitem"
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-left text-sm text-[var(--ink)] hover:bg-[var(--paper)]"
              >
                Student feedback (dev)
              </Link>
            )}
            {isRealDeveloper && <StudentViewControls />}
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

/** Inbox icon with a badge for pending chat requests and unread messages. */
function MessagesButton({ userId }: { userId: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let cancelled = false;
    const check = () =>
      void inboxCount(userId).then((n) => {
        if (!cancelled) setCount(n);
      });
    check();
    const timer = setInterval(check, 60_000);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [userId]);

  return (
    <Link
      to="/messages"
      aria-label={count > 0 ? `Messages (${count} new)` : "Messages"}
      className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[var(--ink-soft)] hover:text-[var(--ink)]"
    >
      <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
        <path d="M3.5 5.5A1.5 1.5 0 0 1 5 4h10a1.5 1.5 0 0 1 1.5 1.5v7A1.5 1.5 0 0 1 15 14H8l-3.5 2.5V14H5a1.5 1.5 0 0 1-1.5-1.5v-7Z" strokeLinejoin="round" />
      </svg>
      {count > 0 && (
        <span className="font-body absolute -right-0.5 -top-0.5 min-w-[18px] rounded-full bg-[var(--accent)] px-1 text-center text-[10px] font-semibold leading-[18px] text-white">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </Link>
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
      {/* Three columns — logo, tabs, search and account — so the tabs sit in the
          true centre of the bar however wide the two sides are. */}
      <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-3 px-6 py-4">
        <div className="justify-self-start">
          <Logo />
        </div>
        <nav className="hidden items-center gap-8 font-body text-sm text-[var(--ink-soft)] md:flex">
          <Link to="/courses" className="hover:text-[var(--ink)]">
            Courses
          </Link>
          <Link to="/map" className="hover:text-[var(--ink)]">
            Lesson Map
          </Link>
          <Link to="/interview" className="hover:text-[var(--ink)]">
            Interview Prep
          </Link>
          <Link to="/forums" className="hover:text-[var(--ink)]">
            Forums
          </Link>
          <Link to="/leaderboard" className="hover:text-[var(--ink)]">
            Leaderboard
          </Link>
          <Link to="/submit" className="hover:text-[var(--ink)]">
            Submit
          </Link>
          <Link to="/pricing" className="font-bold text-[var(--accent)] hover:opacity-80">
            Premium
          </Link>
        </nav>

        <div className="col-start-3 flex min-w-0 items-center justify-end gap-3">
          <GlobalSearch className="hidden min-w-0 sm:block sm:w-56 lg:w-72" />

          <button
            type="button"
            onClick={() => setMobileSearchOpen((v) => !v)}
            aria-label="Search"
            aria-expanded={mobileSearchOpen}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[var(--ink-soft)] hover:text-[var(--ink)] sm:hidden"
          >
            <SearchToggleIcon />
          </button>

          <div className="flex shrink-0 items-center gap-3">
            {loading ? null : user ? (
              <>
                <MessagesButton userId={user.id} />
                <UserMenu />
              </>
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
      </div>

      {mobileSearchOpen && (
        <div className="border-t border-[var(--line)] px-6 py-3 sm:hidden">
          <GlobalSearch />
        </div>
      )}
      <StudentViewBanner />
    </header>
  );
}

const PLAN_LABELS: Record<StudentView["plan"], string> = {
  actual: "My real plan",
  free: "Free",
  graded: "Graded",
  tutored: "Tutored",
};
const INTERVIEW_LABELS: Record<StudentView["interview"], string> = {
  actual: "My real access",
  on: "Has Interview Prep",
  off: "No Interview Prep",
};

/** "Student view" switch and plan pickers, in the account menu (real developers only). */
function StudentViewControls() {
  const view = useStudentView();
  const selectClass =
    "mt-1 w-full rounded-lg border border-[var(--line)] bg-[var(--paper)] px-2 py-1 text-xs text-[var(--ink)]";
  return (
    <div className="my-1 rounded-lg border border-dashed border-[var(--line)] px-3 py-2 font-body text-sm">
      <label className="flex cursor-pointer items-center justify-between gap-3 text-[var(--ink)]">
        Student view
        <input
          type="checkbox"
          checked={view.on}
          onChange={(e) => setStudentView({ on: e.target.checked })}
          className="h-4 w-4 accent-[var(--accent)]"
        />
      </label>
      <p className="mt-0.5 text-[11px] leading-snug text-[var(--ink-soft)]">
        See the site with a student's permissions: dev tools hidden, lesson locks on.
      </p>
      {view.on && (
        <>
          <label className="mt-2 block text-[11px] text-[var(--ink-soft)]">
            Plan
            <select
              value={view.plan}
              onChange={(e) => setStudentView({ plan: e.target.value as StudentView["plan"] })}
              className={selectClass}
            >
              {Object.entries(PLAN_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label className="mt-2 block text-[11px] text-[var(--ink-soft)]">
            Interview Prep
            <select
              value={view.interview}
              onChange={(e) => setStudentView({ interview: e.target.value as StudentView["interview"] })}
              className={selectClass}
            >
              {Object.entries(INTERVIEW_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        </>
      )}
    </div>
  );
}

/** A slim reminder across the top while a developer is in Student view. */
function StudentViewBanner() {
  const isRealDeveloper = useIsRealDeveloper();
  const view = useStudentView();
  if (!isRealDeveloper || !view.on) return null;
  const plan = view.plan === "actual" ? "your real plan" : `the ${PLAN_LABELS[view.plan]} plan`;
  const interview =
    view.interview === "actual" ? "" : view.interview === "on" ? ", with Interview Prep" : ", without Interview Prep";
  return (
    <div className="border-t border-[var(--line)] bg-[var(--accent-soft)] px-6 py-1.5 text-center font-body text-xs text-[var(--ink)]">
      Student view: you're seeing what a student on {plan}
      {interview} sees. Dev tools are hidden. (Display only: the server still checks your real plan.)
      <button
        type="button"
        onClick={() => setStudentView({ on: false })}
        className="ml-3 font-semibold text-[var(--accent)] hover:underline"
      >
        Exit
      </button>
    </div>
  );
}
