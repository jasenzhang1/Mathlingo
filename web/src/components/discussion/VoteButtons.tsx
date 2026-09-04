/** Reddit-style up/down arrows with the running score between them. */
export function VoteButtons({
  score,
  myVote,
  disabled,
  onVote,
}: {
  score: number;
  myVote: number | undefined;
  /** True when signed out — arrows render but prompt to log in instead of voting. */
  disabled?: boolean;
  onVote: (value: 1 | -1) => void;
}) {
  return (
    <div className="flex w-10 shrink-0 flex-col items-center gap-0.5 pt-0.5">
      <Arrow
        direction="up"
        active={myVote === 1}
        disabled={disabled}
        onClick={() => onVote(1)}
      />
      <span
        className={`font-body text-sm font-semibold tabular-nums ${
          myVote === 1
            ? "text-[var(--accent)]"
            : myVote === -1
              ? "text-[var(--teal)]"
              : "text-[var(--ink-soft)]"
        }`}
      >
        {score}
      </span>
      <Arrow
        direction="down"
        active={myVote === -1}
        disabled={disabled}
        onClick={() => onVote(-1)}
      />
    </div>
  );
}

function Arrow({
  direction,
  active,
  disabled,
  onClick,
}: {
  direction: "up" | "down";
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  const label = direction === "up" ? "Upvote" : "Downvote";
  const activeColor = direction === "up" ? "var(--accent)" : "var(--teal)";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={disabled ? `${label} (log in first)` : label}
      aria-pressed={active}
      title={disabled ? "Log in to vote" : label}
      className="rounded p-0.5 transition-colors hover:bg-[var(--accent-soft)] disabled:cursor-not-allowed disabled:hover:bg-transparent"
      disabled={disabled}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
        <path
          d={direction === "up" ? "M8 3l5 6H3l5-6z" : "M8 13L3 7h10l-5 6z"}
          fill={active ? activeColor : "currentColor"}
          className={active ? "" : "text-[var(--ink-soft)] opacity-50"}
        />
      </svg>
    </button>
  );
}
