import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ContributionForm } from "../components/ContributionForm";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";
import type { Badge } from "../data/badges";
import { useAuth } from "../lib/auth/useAuth";
import { earnedBadges, statsFor } from "../lib/reputation";
import { EXPERT_THRESHOLD, useTopicExpertise } from "../lib/expertise";
import { useCommunity, type NewContribution } from "../lib/useCommunity";

export function SubmitQuestionPage() {
  const { user, loading: authLoading } = useAuth();
  const { expert, loading: expertiseLoading } = useTopicExpertise();
  const [searchParams] = useSearchParams();
  const requestedDomain = searchParams.get("domain");

  const { contributions, handle, setHandle, submit } = useCommunity();

  const topicOptions = useMemo(() => {
    const ordered = [...expert];
    // Bubble the domain the learner arrived to submit for (e.g. from a
    // concept page) to the top, so it's preselected in the form.
    const i = ordered.findIndex((t) => t.chapter.domain === requestedDomain);
    if (i > 0) ordered.unshift(...ordered.splice(i, 1));
    return ordered.map((t) => ({ id: t.chapter.domain, name: t.chapter.label }));
  }, [expert, requestedDomain]);

  function handleSubmit(draft: NewContribution): Badge[] {
    const author = draft.author.trim() || handle;
    const before = new Set(
      earnedBadges(statsFor(author, contributions)).map((b) => b.id),
    );
    const created = submit(draft);
    return earnedBadges(statsFor(author, [created, ...contributions])).filter(
      (b) => !before.has(b.id),
    );
  }

  const loading = authLoading || expertiseLoading;

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <Nav />
      <main className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="font-display text-3xl text-[var(--ink)]">
          Submit a question
        </h1>
        <p className="font-body mt-2 text-[var(--ink-soft)]">
          Write a question and answer for a topic you've actually mastered —
          reaching {EXPERT_THRESHOLD} proficiency unlocks it.
        </p>

        {loading ? (
          <div className="mt-10 h-40 animate-pulse rounded-2xl border border-[var(--line)] bg-[var(--panel)]" />
        ) : !user ? (
          <div className="mt-10 rounded-2xl border border-dashed border-[var(--line)] p-10 text-center">
            <p className="font-body text-[var(--ink-soft)]">
              <Link
                to="/login"
                className="font-medium text-[var(--accent)] hover:underline"
              >
                Log in
              </Link>{" "}
              to see which topics you've mastered.
            </p>
          </div>
        ) : topicOptions.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-[var(--line)] p-10 text-center">
            <p className="font-body text-[var(--ink-soft)]">
              You haven't reached {EXPERT_THRESHOLD} proficiency in a topic
              yet. Keep studying — once a bar on your{" "}
              <Link
                to="/map"
                className="font-medium text-[var(--accent)] hover:underline"
              >
                topic mastery
              </Link>{" "}
              fills up that far, you can submit your own questions on it.
            </p>
          </div>
        ) : (
          <div className="mt-10">
            <ContributionForm
              handle={handle}
              onHandleChange={setHandle}
              onSubmit={handleSubmit}
              topicOptions={topicOptions}
            />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
