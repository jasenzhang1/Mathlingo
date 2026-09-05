import { badges, type Badge } from "../data/badges";
import { isPinned, type Contribution } from "../data/community";

/** Reputation awarded for publishing a card. */
export const REP_PER_SUBMISSION = 5;
/** Reputation awarded per upvote an author's card receives. */
export const REP_PER_UPVOTE = 10;
/** One-time bonus once a card is pinned to the top of the board. */
export const REP_PINNED_BONUS = 25;

export interface ContributorStats {
  author: string;
  submissions: number;
  upvotes: number;
  pinned: number;
  topics: number;
  reputation: number;
}

export interface BadgeProgress {
  badge: Badge;
  earned: boolean;
  /** How far along the badge's requirement the contributor is, capped at the threshold. */
  progress: number;
}

/** Reputation a single card has earned for its author. */
export function reputationFor(contribution: Contribution): number {
  return (
    REP_PER_SUBMISSION +
    contribution.votes * REP_PER_UPVOTE +
    (isPinned(contribution) ? REP_PINNED_BONUS : 0)
  );
}

export function statsFor(
  author: string,
  contributions: Contribution[],
): ContributorStats {
  const mine = contributions.filter((c) => c.author === author);

  return {
    author,
    submissions: mine.length,
    upvotes: mine.reduce((sum, c) => sum + c.votes, 0),
    pinned: mine.filter(isPinned).length,
    topics: new Set(mine.map((c) => c.topicId)).size,
    reputation: mine.reduce((sum, c) => sum + reputationFor(c), 0),
  };
}

export function badgeProgress(stats: ContributorStats): BadgeProgress[] {
  return badges.map((badge) => {
    const value = stats[badge.metric];
    return {
      badge,
      earned: value >= badge.threshold,
      progress: Math.min(value, badge.threshold),
    };
  });
}

export function earnedBadges(stats: ContributorStats): Badge[] {
  return badgeProgress(stats)
    .filter((entry) => entry.earned)
    .map((entry) => entry.badge);
}

/** The badge the contributor is closest to earning, if any are still locked. */
export function nextBadge(stats: ContributorStats): BadgeProgress | null {
  const locked = badgeProgress(stats).filter((entry) => !entry.earned);
  if (locked.length === 0) return null;

  return locked.reduce((closest, entry) =>
    entry.progress / entry.badge.threshold >
    closest.progress / closest.badge.threshold
      ? entry
      : closest,
  );
}

/** Every contributor on the board, ranked by reputation. */
export function leaderboard(contributions: Contribution[]): ContributorStats[] {
  const authors = [...new Set(contributions.map((c) => c.author))];
  return authors
    .map((author) => statsFor(author, contributions))
    .sort((a, b) => b.reputation - a.reputation || b.upvotes - a.upvotes);
}
