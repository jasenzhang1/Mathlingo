import { earnedBadges, type ContributorStats } from "../lib/reputation";

interface LeaderboardProps {
  contributors: ContributorStats[];
  you: string;
}

export function Leaderboard({ contributors, you }: LeaderboardProps) {
  return (
    <div className="font-body rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6">
      <h3 className="font-display text-lg text-[var(--ink)]">
        Top contributors
      </h3>
      <p className="mt-1 text-sm text-[var(--ink-soft)]">
        Reputation is earned by writing cards other learners drill.
      </p>

      <ol className="mt-5 flex flex-col gap-3">
        {contributors.slice(0, 5).map((contributor, i) => {
          const badges = earnedBadges(contributor);
          const isYou = contributor.author === you;

          return (
            <li
              key={contributor.author}
              className={`flex items-center gap-3 rounded-xl px-3 py-2 ${
                isYou ? "bg-[var(--accent-soft)]" : ""
              }`}
            >
              <span className="font-display w-5 shrink-0 text-sm text-[var(--ink-soft)]">
                {i + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm text-[var(--ink)]">
                  {contributor.author}
                  {isYou && (
                    <span className="ml-2 text-xs text-[var(--accent)]">you</span>
                  )}
                </span>
                <span className="block text-xs text-[var(--ink-soft)]">
                  {contributor.submissions}{" "}
                  {contributor.submissions === 1 ? "card" : "cards"} ·{" "}
                  {contributor.upvotes} upvotes
                </span>
              </span>
              <span
                className="shrink-0 text-xs text-[var(--ink-soft)]"
                aria-label={`${badges.length} badges`}
                title={badges.map((badge) => badge.name).join(", ")}
              >
                {badges.map((badge) => badge.icon).join(" ")}
              </span>
              <span className="font-display w-14 shrink-0 text-right text-sm tabular-nums text-[var(--ink)]">
                {contributor.reputation}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
