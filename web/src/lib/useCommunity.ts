import { useCallback, useMemo, useState } from "react";
import { seedContributions, type Contribution } from "../data/community";

const STORAGE_KEY = "mathlingo:community";
export const DEFAULT_HANDLE = "You";

interface StoredState {
  handle: string;
  /** Cards written in this browser, newest first. */
  submitted: Contribution[];
  /** Ids of cards this browser has upvoted. */
  voted: string[];
}

export interface NewContribution {
  topicId: string;
  question: string;
  answer: string;
  author: string;
}

function emptyState(): StoredState {
  return { handle: DEFAULT_HANDLE, submitted: [], voted: [] };
}

function loadState(): StoredState {
  if (typeof localStorage === "undefined") return emptyState();

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyState();

    const parsed = JSON.parse(raw) as Partial<StoredState>;
    return {
      handle: parsed.handle || DEFAULT_HANDLE,
      submitted: Array.isArray(parsed.submitted) ? parsed.submitted : [],
      voted: Array.isArray(parsed.voted) ? parsed.voted : [],
    };
  } catch {
    // A corrupt or unreadable store should never keep the board from rendering.
    return emptyState();
  }
}

function saveState(state: StoredState) {
  if (typeof localStorage === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Private-mode or full storage: the board still works for this session.
  }
}

/**
 * The community board: the seeded cards plus anything written in this browser,
 * with the reader's own upvotes folded into each card's vote count.
 */
export function useCommunity() {
  const [state, setState] = useState<StoredState>(loadState);

  const update = useCallback((next: (prev: StoredState) => StoredState) => {
    setState((prev) => {
      const value = next(prev);
      saveState(value);
      return value;
    });
  }, []);

  const voted = useMemo(() => new Set(state.voted), [state.voted]);

  const contributions = useMemo(
    () =>
      [...state.submitted, ...seedContributions].map((contribution) =>
        voted.has(contribution.id)
          ? { ...contribution, votes: contribution.votes + 1 }
          : contribution,
      ),
    [state.submitted, voted],
  );

  const submit = useCallback(
    (draft: NewContribution) => {
      const contribution: Contribution = {
        id: `c-${Date.now().toString(36)}`,
        topicId: draft.topicId,
        question: draft.question.trim(),
        answer: draft.answer.trim(),
        author: draft.author.trim() || DEFAULT_HANDLE,
        createdAt: new Date().toISOString().slice(0, 10),
        votes: 0,
        featured: false,
      };

      update((prev) => ({
        ...prev,
        handle: contribution.author,
        submitted: [
          contribution,
          // Submitting under a new name carries your earlier cards with you.
          ...prev.submitted.map((earlier) =>
            earlier.author === prev.handle
              ? { ...earlier, author: contribution.author }
              : earlier,
          ),
        ],
      }));

      return contribution;
    },
    [update],
  );

  const toggleVote = useCallback(
    (id: string) => {
      update((prev) => ({
        ...prev,
        voted: prev.voted.includes(id)
          ? prev.voted.filter((votedId) => votedId !== id)
          : [...prev.voted, id],
      }));
    },
    [update],
  );

  /** Renaming keeps the reputation you already earned attached to you. */
  const setHandle = useCallback(
    (handle: string) => {
      const name = handle.trim();
      if (!name) return;

      update((prev) => ({
        ...prev,
        handle: name,
        submitted: prev.submitted.map((contribution) =>
          contribution.author === prev.handle
            ? { ...contribution, author: name }
            : contribution,
        ),
      }));
    },
    [update],
  );

  return {
    contributions,
    handle: state.handle,
    setHandle,
    submit,
    toggleVote,
    hasVoted: (id: string) => voted.has(id),
  };
}
