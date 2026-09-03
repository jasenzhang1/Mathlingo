import { useMemo, useState } from "react";
import type { Badge } from "../data/badges";
import { isPinned } from "../data/community";
import { topics } from "../data/topics";
import {
  earnedBadges,
  leaderboard,
  statsFor,
  type ContributorStats,
} from "../lib/reputation";
import { useCommunity, type NewContribution } from "../lib/useCommunity";
import { BadgeShelf } from "./BadgeShelf";
import { ContributionCard } from "./ContributionCard";
import { ContributionForm } from "./ContributionForm";
import { Leaderboard } from "./Leaderboard";

type Sort = "top" | "new";

export function Community() {
  const { contributions, handle, setHandle, submit, toggleVote, hasVoted } =
    useCommunity();
  const [topicId, setTopicId] = useState<string>("all");
  const [sort, setSort] = useState<Sort>("top");

  const stats: ContributorStats = useMemo(
    () => statsFor(handle, contributions),
    [handle, contributions],
  );

  const contributors = useMemo(
    () => leaderboard(contributions),
    [contributions],
  );

  const visible = useMemo(() => {
    const filtered =
      topicId === "all"
        ? contributions
        : contributions.filter((c) => c.topicId === topicId);

    return [...filtered].sort((a, b) =>
      sort === "top"
        ? b.votes - a.votes || b.createdAt.localeCompare(a.createdAt)
        : b.createdAt.localeCompare(a.createdAt) || b.votes - a.votes,
    );
  }, [contributions, topicId, sort]);

  const pinned = useMemo(() => visible.filter(isPinned), [visible]);
  const rest = useMemo(() => visible.filter((c) => !isPinned(c)), [visible]);

  /** Publishes a card and reports the badges it unlocked for its author. */
  function handleSubmit(draft: NewContribution): Badge[] {
    const author = draft.author.trim() || handle;
    const before = new Set(
      earnedBadges(statsFor(author, contributions)).map((badge) => badge.id),
    );

    const created = submit(draft);

    return earnedBadges(statsFor(author, [created, ...contributions])).filter(
      (badge) => !before.has(badge.id),
    );
  }

  return (
    <section id="community" className="border-b border-[var(--line)]">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center">
          <p className="font-body text-sm font-medium uppercase tracking-[0.2em] text-[var(--teal)]">
            Community deck
          </p>
          <h2 className="font-display mt-4 text-3xl text-[var(--ink)] md:text-4xl">
            The best explanations come from people who just learned it
          </h2>
          <p className="font-body mx-auto mt-3 max-w-xl text-[var(--ink-soft)]">
            Submit a question and the answer you wish you'd been given. Cards
            earn you reputation as they get upvoted, the strongest ones get
            pinned to the top of the deck, and milestones unlock badges.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ContributionForm
              handle={handle}
              onHandleChange={setHandle}
              onSubmit={handleSubmit}
            />
          </div>
          <div className="flex flex-col gap-6">
            <BadgeShelf stats={stats} />
            <Leaderboard contributors={contributors} you={handle} />
          </div>
        </div>

        <div className="font-body mt-14 flex flex-wrap items-center justify-between gap-4">
          <h3 className="font-display text-2xl text-[var(--ink)]">
            Cards from the community
          </h3>

          <div className="flex flex-wrap items-center gap-2">
            <label htmlFor="community-topic" className="sr-only">
              Filter by subject
            </label>
            <select
              id="community-topic"
              value={topicId}
              onChange={(e) => setTopicId(e.target.value)}
              className="rounded-full border border-[var(--line)] bg-[var(--panel)] px-4 py-1.5 text-sm text-[var(--ink)] outline-none focus:border-[var(--accent)]"
            >
              <option value="all">All subjects</option>
              {topics.map((topic) => (
                <option key={topic.id} value={topic.id}>
                  {topic.name}
                </option>
              ))}
            </select>

            {(["top", "new"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setSort(option)}
                aria-pressed={sort === option}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  sort === option
                    ? "bg-[var(--ink)] text-[var(--paper)]"
                    : "border border-[var(--line)] text-[var(--ink-soft)] hover:text-[var(--ink)]"
                }`}
              >
                {option === "top" ? "Top" : "Newest"}
              </button>
            ))}
          </div>
        </div>

        {pinned.length > 0 && (
          <>
            <p className="font-body mt-8 text-sm font-medium uppercase tracking-wide text-[var(--ink-soft)]">
              Pinned
            </p>
            <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2">
              {pinned.map((contribution) => (
                <ContributionCard
                  key={contribution.id}
                  contribution={contribution}
                  voted={hasVoted(contribution.id)}
                  isYours={contribution.author === handle}
                  onVote={toggleVote}
                />
              ))}
            </div>
          </>
        )}

        {rest.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((contribution) => (
              <ContributionCard
                key={contribution.id}
                contribution={contribution}
                voted={hasVoted(contribution.id)}
                isYours={contribution.author === handle}
                onVote={toggleVote}
              />
            ))}
          </div>
        )}

        {visible.length === 0 && (
          <p className="font-body mt-8 rounded-2xl border border-dashed border-[var(--line)] p-10 text-center text-sm text-[var(--ink-soft)]">
            No cards for this subject yet — write the first one.
          </p>
        )}
      </div>
    </section>
  );
}
