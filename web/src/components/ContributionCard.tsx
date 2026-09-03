import { useState } from "react";
import {
  isPinned,
  PIN_VOTE_THRESHOLD,
  type Contribution,
} from "../data/community";
import { topics } from "../data/topics";
import { reputationFor } from "../lib/reputation";

const topicName = new Map(topics.map((topic) => [topic.id, topic.name]));

interface ContributionCardProps {
  contribution: Contribution;
  voted: boolean;
  isYours: boolean;
  onVote: (id: string) => void;
}

export function ContributionCard({
  contribution,
  voted,
  isYours,
  onVote,
}: ContributionCardProps) {
  const [revealed, setRevealed] = useState(false);
  const pinned = isPinned(contribution);
  const votesToPin = PIN_VOTE_THRESHOLD - contribution.votes;

  return (
    <article
      className={`font-body flex h-full flex-col rounded-2xl border p-6 ${
        pinned
          ? "border-[var(--accent)] bg-[var(--accent-soft)]"
          : "border-[var(--line)] bg-[var(--panel)]"
      }`}
    >
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-full border border-[var(--line)] bg-[var(--panel)] px-2.5 py-1 text-[var(--ink-soft)]">
          {topicName.get(contribution.topicId) ?? "General"}
        </span>
        {pinned && (
          <span className="rounded-full px-2.5 py-1 font-medium text-[var(--accent-ink)] bg-[var(--accent)]">
            ⚑ Pinned
          </span>
        )}
        {isYours && (
          <span className="rounded-full border border-[var(--teal)] px-2.5 py-1 font-medium text-[var(--teal)]">
            Yours
          </span>
        )}
      </div>

      <h3 className="font-display mt-4 text-lg leading-snug text-[var(--ink)]">
        {contribution.question}
      </h3>

      {revealed ? (
        <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--ink-soft)]">
          {contribution.answer}
        </p>
      ) : (
        <div className="mt-3 flex-1">
          <button
            type="button"
            onClick={() => setRevealed(true)}
            className="text-sm font-medium text-[var(--accent)] hover:underline"
          >
            Show answer
          </button>
        </div>
      )}

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-[var(--line)] pt-4 text-xs text-[var(--ink-soft)]">
        <span className="min-w-0 truncate">
          {contribution.author} · +{reputationFor(contribution)} rep
        </span>

        <div className="flex items-center gap-2">
          {!pinned && votesToPin <= 3 && votesToPin > 0 && (
            <span className="hidden sm:inline">
              {votesToPin} to pin
            </span>
          )}
          <button
            type="button"
            onClick={() => onVote(contribution.id)}
            disabled={isYours}
            aria-pressed={voted}
            aria-label={`Upvote: ${contribution.question}`}
            title={
              isYours
                ? "You can't upvote your own card"
                : voted
                  ? "Remove your upvote"
                  : "Upvote this card"
            }
            className={`rounded-full border px-3 py-1.5 font-medium transition-colors ${
              isYours
                ? "cursor-not-allowed border-[var(--line)] text-[var(--ink-soft)] opacity-50"
                : voted
                  ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-ink)]"
                  : "border-[var(--line)] text-[var(--ink)] hover:border-[var(--accent)]"
            }`}
          >
            ▲ {contribution.votes}
          </button>
        </div>
      </div>
    </article>
  );
}
