import type { BadgeTier } from "../data/badges";
import {
  badgeProgress,
  nextBadge,
  REP_PER_SUBMISSION,
  REP_PER_UPVOTE,
  REP_PINNED_BONUS,
  type ContributorStats,
} from "../lib/reputation";

const tierStyle: Record<BadgeTier, { ring: string; ink: string; label: string }> =
  {
    bronze: { ring: "#e2c3a4", ink: "#8a5a2b", label: "Bronze" },
    silver: { ring: "#d8dbe2", ink: "#5f6572", label: "Silver" },
    gold: { ring: "#f0dda1", ink: "#9a7415", label: "Gold" },
  };

interface BadgeShelfProps {
  stats: ContributorStats;
}

export function BadgeShelf({ stats }: BadgeShelfProps) {
  const entries = badgeProgress(stats);
  const earnedCount = entries.filter((entry) => entry.earned).length;
  const next = nextBadge(stats);

  return (
    <div className="font-body rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-display text-lg text-[var(--ink)]">
          Your reputation
        </h3>
        <span className="text-xs uppercase tracking-wide text-[var(--ink-soft)]">
          {stats.author}
        </span>
      </div>

      <p className="font-display mt-3 text-4xl text-[var(--accent)]">
        {stats.reputation.toLocaleString()}
      </p>
      <p className="mt-1 text-sm text-[var(--ink-soft)]">
        {stats.submissions} {stats.submissions === 1 ? "card" : "cards"} ·{" "}
        {stats.upvotes} {stats.upvotes === 1 ? "upvote" : "upvotes"} ·{" "}
        {stats.pinned} pinned
      </p>

      <p className="mt-4 text-xs leading-relaxed text-[var(--ink-soft)]">
        +{REP_PER_SUBMISSION} for each card you submit, +{REP_PER_UPVOTE} per
        upvote it earns, and +{REP_PINNED_BONUS} when the community pins it.
      </p>

      <div className="mt-6 flex items-baseline justify-between">
        <h4 className="font-display text-sm text-[var(--ink)]">Badges</h4>
        <span className="text-xs text-[var(--ink-soft)]">
          {earnedCount} of {entries.length}
        </span>
      </div>

      <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
        {entries.map(({ badge, earned, progress }) => {
          const tier = tierStyle[badge.tier];
          return (
            <li
              key={badge.id}
              title={badge.description}
              className={`flex items-center gap-3 rounded-xl border px-3 py-2 ${
                earned
                  ? "border-[var(--line)] bg-[var(--paper)]"
                  : "border-dashed border-[var(--line)] opacity-60"
              }`}
            >
              <span
                aria-hidden="true"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm"
                style={{
                  borderColor: tier.ring,
                  color: earned ? tier.ink : "var(--ink-soft)",
                  background: earned ? `${tier.ring}33` : "transparent",
                }}
              >
                {badge.icon}
              </span>
              <span className="min-w-0">
                <span className="block text-sm text-[var(--ink)]">
                  {badge.name}
                </span>
                <span className="block text-xs text-[var(--ink-soft)]">
                  {earned
                    ? `${tier.label} · earned`
                    : `${progress}/${badge.threshold}`}
                </span>
              </span>
            </li>
          );
        })}
      </ul>

      {next && (
        <p className="mt-4 text-xs text-[var(--ink-soft)]">
          Next up — <strong className="text-[var(--ink)]">{next.badge.name}</strong>
          : {next.badge.description}
        </p>
      )}
    </div>
  );
}
