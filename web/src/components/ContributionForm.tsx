import { useState, type FormEvent } from "react";
import type { Badge } from "../data/badges";
import { topics } from "../data/topics";
import type { NewContribution } from "../lib/useCommunity";
import { REP_PER_SUBMISSION } from "../lib/reputation";

const MIN_QUESTION = 12;
const MIN_ANSWER = 30;

interface ContributionFormProps {
  handle: string;
  onHandleChange: (handle: string) => void;
  /** Publishes the card and reports back any badges it just unlocked. */
  onSubmit: (draft: NewContribution) => Badge[];
}

export function ContributionForm({
  handle,
  onHandleChange,
  onSubmit,
}: ContributionFormProps) {
  const [author, setAuthor] = useState(handle);
  const [topicId, setTopicId] = useState(topics[0].id);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [unlocked, setUnlocked] = useState<Badge[] | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (question.trim().length < MIN_QUESTION) {
      setError("Give the question a bit more to work with.");
      return;
    }
    if (answer.trim().length < MIN_ANSWER) {
      setError("Answers need enough detail for someone to actually learn from.");
      return;
    }

    const badges = onSubmit({ topicId, question, answer, author });
    setError(null);
    setUnlocked(badges);
    setQuestion("");
    setAnswer("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="font-body rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6"
    >
      <h3 className="font-display text-lg text-[var(--ink)]">
        Submit a card
      </h3>
      <p className="mt-1 text-sm text-[var(--ink-soft)]">
        Write the question the way you'd want to be asked it, then the answer
        you wish you'd been given.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contribution-author"
            className="block text-xs font-medium uppercase tracking-wide text-[var(--ink-soft)]"
          >
            Display name
          </label>
          <input
            id="contribution-author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            onBlur={() => onHandleChange(author)}
            placeholder="You"
            className="mt-2 w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] px-4 py-2.5 text-sm text-[var(--ink)] outline-none focus:border-[var(--accent)]"
          />
        </div>

        <div>
          <label
            htmlFor="contribution-topic"
            className="block text-xs font-medium uppercase tracking-wide text-[var(--ink-soft)]"
          >
            Subject
          </label>
          <select
            id="contribution-topic"
            value={topicId}
            onChange={(e) => setTopicId(e.target.value)}
            className="mt-2 w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] px-4 py-2.5 text-sm text-[var(--ink)] outline-none focus:border-[var(--accent)]"
          >
            {topics.map((topic) => (
              <option key={topic.id} value={topic.id}>
                {topic.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <label
        htmlFor="contribution-question"
        className="mt-4 block text-xs font-medium uppercase tracking-wide text-[var(--ink-soft)]"
      >
        Question
      </label>
      <textarea
        id="contribution-question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        rows={2}
        placeholder="Why must rank(A) ≤ min(m, n)?"
        className="mt-2 w-full resize-y rounded-xl border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-sm text-[var(--ink)] outline-none focus:border-[var(--accent)]"
      />

      <label
        htmlFor="contribution-answer"
        className="mt-4 block text-xs font-medium uppercase tracking-wide text-[var(--ink-soft)]"
      >
        Answer
      </label>
      <textarea
        id="contribution-answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        rows={4}
        placeholder="Explain it the way an analogy would — the intuition first, the formalism second."
        className="mt-2 w-full resize-y rounded-xl border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-sm text-[var(--ink)] outline-none focus:border-[var(--accent)]"
      />

      <div className="mt-5 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="rounded-full px-6 py-2.5 text-sm font-semibold text-[var(--accent-ink)] transition-opacity hover:opacity-90"
          style={{ background: "var(--accent)" }}
        >
          Publish card
        </button>
        <span className="text-xs text-[var(--ink-soft)]">
          Earns +{REP_PER_SUBMISSION} reputation, more as it gets upvoted.
        </span>
      </div>

      {error && (
        <p role="alert" className="mt-4 text-sm text-[var(--ink)]">
          {error}
        </p>
      )}

      {unlocked && (
        <p
          role="status"
          className="mt-4 rounded-xl bg-[var(--accent-soft)] px-4 py-3 text-sm text-[var(--ink)]"
        >
          Card published — +{REP_PER_SUBMISSION} reputation.
          {unlocked.length > 0 && (
            <>
              {" "}
              Badge unlocked:{" "}
              <strong>{unlocked.map((badge) => badge.name).join(", ")}</strong>.
            </>
          )}
        </p>
      )}
    </form>
  );
}
