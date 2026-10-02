import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";
import { PostCard } from "../components/discussion/PostCard";
import { PostComposer } from "../components/discussion/PostComposer";
import { getSchoolNameForDomain } from "../data/eduDomains";
import { useAuth } from "../lib/auth/useAuth";
import { useSubscription } from "../lib/billing/useSubscription";
import { useIsDeveloper } from "../lib/dev/devAuth";
import { castVote, fetchForumPosts, fetchMyVotes } from "../lib/discussion/api";
import {
  boardInfo,
  chapterLabel,
  courseLabel,
  courses,
  defaultBoard,
  interviewTopics,
  scopeFromParams,
  topicLabel,
  type ForumScope,
} from "../lib/discussion/boards";
import type { Post, SortMode } from "../lib/discussion/types";
import { useOwnProfile } from "../lib/profiles";
import { conceptById } from "../data/concepts";

/**
 * `/forums`: every discussion board in one Reddit-style feed, tagged by
 * course, chapter and lesson. The learning half is open to everyone; the
 * interview half needs Interview Prep (enforced in the database by
 * 0011_forums.sql, not just hidden here); and a verified student also gets
 * their own school's board.
 */
export function ForumsPage() {
  const [params, setParams] = useSearchParams();
  const scope = scopeFromParams(params);
  const { user } = useAuth();
  const profile = useOwnProfile();
  const { interview } = useSubscription();
  const isDeveloper = useIsDeveloper();
  const interviewAccess = interview || isDeveloper;
  const school = profile?.school ?? null;

  const go = (next: Record<string, string | undefined>) => {
    const clean = Object.fromEntries(Object.entries(next).filter(([, v]) => v)) as Record<string, string>;
    setParams(clean);
  };

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <Nav />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="font-display text-3xl text-[var(--ink)] md:text-4xl">Forums</h1>
        <div className="mt-6 grid gap-8 lg:grid-cols-[260px_1fr]">
          <Sidebar scope={scope} go={go} interviewAccess={interviewAccess} school={school} />
          <section className="min-w-0">
            <ScopeTitle scope={scope} school={school} />
            {scope.space === "interview" && !interviewAccess ? (
              <Locked signedIn={Boolean(user)} />
            ) : scope.space === "school" && !school ? (
              <Notice>
                School forums are for students who signed up with a school (.edu) email.{" "}
                <Link to="/signup" className="font-medium text-[var(--accent)] hover:underline">
                  Sign up with yours
                </Link>{" "}
                to join your school's board.
              </Notice>
            ) : (
              <Feed key={JSON.stringify(scope)} scope={scope} school={school} />
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sidebar
// ---------------------------------------------------------------------------

function Sidebar({
  scope,
  go,
  interviewAccess,
  school,
}: {
  scope: ForumScope;
  go: (next: Record<string, string | undefined>) => void;
  interviewAccess: boolean;
  school: string | null;
}) {
  const course = scope.space === "learning" ? courses.find((c) => c.domain === scope.course) : undefined;
  const chapter = course?.sections.find((s) => s.id === scope.chapter);

  return (
    <aside className="font-body space-y-6 text-sm lg:sticky lg:top-24 lg:self-start">
      <div>
        <p className={groupLabel}>Learning</p>
        <ul className="mt-2 space-y-0.5">
          <Item active={scope.space === "learning" && !scope.course} onClick={() => go({})}>
            All learning
          </Item>
          {courses.map((c) => (
            <li key={c.domain}>
              <SideButton active={scope.course === c.domain && !scope.chapter} onClick={() => go({ course: c.domain })}>
                <span className="mr-2 inline-block h-2 w-2 rounded-full" style={{ background: c.color }} />
                {c.label}
              </SideButton>
              {course?.domain === c.domain && (
                <ul className="ml-4 mt-0.5 space-y-0.5 border-l border-[var(--line)] pl-2">
                  {c.sections.map((s) => (
                    <li key={s.id}>
                      <SideButton active={scope.chapter === s.id && !scope.lesson} onClick={() => go({ course: c.domain, chapter: s.id })}>
                        {s.label}
                      </SideButton>
                      {chapter?.id === s.id && (
                        <ul className="ml-3 mt-0.5 space-y-0.5 border-l border-[var(--line)] pl-2">
                          {s.concepts.map((l) => (
                            <Item key={l.id} active={scope.lesson === l.id} onClick={() => go({ course: c.domain, chapter: s.id, lesson: l.id })}>
                              {l.title}
                            </Item>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className={groupLabel}>
          Interview Prep{" "}
          {!interviewAccess && (
            <span className="ml-1 rounded-full bg-[var(--accent-soft)] px-1.5 py-0.5 text-[10px] font-bold text-[var(--accent)]">PREMIUM</span>
          )}
        </p>
        <ul className="mt-2 space-y-0.5">
          <Item active={scope.space === "interview" && !scope.topic} onClick={() => go({ space: "interview" })}>
            {interviewAccess ? "All interview prep" : "🔒 All interview prep"}
          </Item>
          {interviewAccess &&
            interviewTopics.map((t) => (
              <Item key={t.slug} active={scope.space === "interview" && scope.topic === t.slug} onClick={() => go({ space: "interview", topic: t.slug })}>
                {t.label}
              </Item>
            ))}
        </ul>
      </div>

      <div>
        <p className={groupLabel}>Your school</p>
        <ul className="mt-2 space-y-0.5">
          <Item active={scope.space === "school"} onClick={() => go({ space: "school" })}>
            {school ? getSchoolNameForDomain(school) : "School forum"}
          </Item>
        </ul>
      </div>
    </aside>
  );
}

const groupLabel = "text-xs font-semibold uppercase tracking-wide text-[var(--ink-soft)]";

function SideButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center rounded-lg px-2.5 py-1.5 text-left ${active ? "bg-[var(--accent-soft)] font-medium text-[var(--accent)]" : "text-[var(--ink)] hover:bg-[var(--panel)]"}`}
    >
      {children}
    </button>
  );
}

function Item(props: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <li>
      <SideButton {...props} />
    </li>
  );
}

// ---------------------------------------------------------------------------
// Title, gates
// ---------------------------------------------------------------------------

function ScopeTitle({ scope, school }: { scope: ForumScope; school: string | null }) {
  const parts =
    scope.space === "interview"
      ? ["Interview Prep", ...(scope.topic ? [topicLabel(scope.topic)] : [])]
      : scope.space === "school"
        ? [school ? getSchoolNameForDomain(school) : "School forum"]
        : [
            scope.course ? courseLabel(scope.course) : "All learning",
            ...(scope.course && scope.chapter ? [chapterLabel(scope.course, scope.chapter)] : []),
            ...(scope.lesson ? [conceptById.get(scope.lesson)?.title ?? scope.lesson] : []),
          ];
  const blurb =
    scope.space === "interview"
      ? "Quant interview discussion for Interview Prep members."
      : scope.space === "school"
        ? "Only verified students of this school can post here."
        : scope.lesson
          ? "Threads for this lesson."
          : scope.course
            ? "Threads across this course — its own board, its chapters and every lesson in it."
            : "Every course, chapter and lesson thread, newest first.";
  return (
    <div className="mb-5">
      <h2 className="font-display text-2xl text-[var(--ink)]">{parts.join(" › ")}</h2>
      <p className="font-body mt-1 text-sm text-[var(--ink-soft)]">{blurb}</p>
    </div>
  );
}

function Notice({ children }: { children: ReactNode }) {
  return <p className="font-body rounded-2xl border border-dashed border-[var(--line)] p-8 text-center text-sm text-[var(--ink-soft)]">{children}</p>;
}

function Locked({ signedIn }: { signedIn: boolean }) {
  return (
    <div className="rounded-2xl border border-[var(--accent)] bg-[var(--panel)] p-8 text-center">
      <p className="font-display text-2xl text-[var(--ink)]">🔒 Interview Prep members only</p>
      <p className="font-body mx-auto mt-2 max-w-md text-sm text-[var(--ink-soft)]">
        The interview half of the forums — brainteasers, probability puzzles, how a round went — is part of Interview Prep.
      </p>
      <Link
        to={signedIn ? "/pricing" : "/login"}
        className="font-body mt-5 inline-block rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
      >
        {signedIn ? "See Premium" : "Log in"}
      </Link>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Feed
// ---------------------------------------------------------------------------

function Feed({ scope, school }: { scope: ForumScope; school: string | null }) {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [myVotes, setMyVotes] = useState<Record<string, number>>({});
  const [sort, setSort] = useState<SortMode>("new");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [composing, setComposing] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error: loadError } = await fetchForumPosts(scope, sort, school);
    setPosts(data);
    setError(loadError);
    if (user && data.length > 0) setMyVotes(await fetchMyVotes(data.map((p) => p.id), user.id));
    setLoading(false);
    // scope is keyed by the parent, so its identity is stable per mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, user, school]);

  // Async data load; see DiscussionFeed for why oxlint flags this.
  useEffect(() => {
    void load();
  }, [load]);

  async function handleVote(post: Post, value: 1 | -1) {
    if (!user) return;
    const previous = myVotes[post.id];
    const delta = previous === value ? -value : value - (previous ?? 0);
    setMyVotes((v) => {
      const next = { ...v };
      if (previous === value) delete next[post.id];
      else next[post.id] = value;
      return next;
    });
    setPosts((ps) => ps.map((p) => (p.id === post.id ? { ...p, score: p.score + delta } : p)));
    const { error: voteError } = await castVote({ postId: post.id, userId: user.id, value, currentValue: previous });
    if (voteError) {
      setError(voteError);
      void load();
    }
  }

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1.5" role="group" aria-label="Sort posts">
          {(["new", "top"] as SortMode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setSort(m)}
              aria-pressed={sort === m}
              className={`font-body rounded-full px-3 py-1.5 text-sm font-medium ${sort === m ? "bg-[var(--accent-soft)] text-[var(--accent)]" : "text-[var(--ink-soft)] hover:text-[var(--ink)]"}`}
            >
              {m === "new" ? "New" : "Top"}
            </button>
          ))}
        </div>
        {user ? (
          !composing && (
            <button
              type="button"
              onClick={() => setComposing(true)}
              className="font-body rounded-full px-4 py-2 text-sm font-semibold text-[var(--accent-ink)] hover:opacity-90"
              style={{ background: "var(--accent)" }}
            >
              New post
            </button>
          )
        ) : (
          <p className="font-body text-sm text-[var(--ink-soft)]">
            <Link to="/login" className="font-medium text-[var(--accent)] hover:underline">
              Log in
            </Link>{" "}
            to post or vote.
          </p>
        )}
      </div>

      {composing && user && (
        <div className="mb-5">
          <ForumComposer
            scope={scope}
            school={school}
            authorId={user.id}
            onPosted={() => {
              setComposing(false);
              void load();
            }}
            onCancel={() => setComposing(false)}
          />
        </div>
      )}

      {error && (
        <p role="alert" className="font-body mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      {loading ? (
        <p className="font-body py-8 text-center text-sm text-[var(--ink-soft)]">Loading…</p>
      ) : posts.length === 0 ? (
        <Notice>Nothing here yet — be the first to ask a question or post a problem.</Notice>
      ) : (
        <div className="flex flex-col gap-3">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              conceptId={post.concept_id}
              href={`/forums/post/${post.id}`}
              tags={boardInfo(post.concept_id).tags}
              myVote={myVotes[post.id]}
              canVote={Boolean(user)}
              onVote={(value) => handleVote(post, value)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Composer: choose where the post goes, then the usual post form
// ---------------------------------------------------------------------------

function ForumComposer({
  scope,
  school,
  authorId,
  onPosted,
  onCancel,
}: {
  scope: ForumScope;
  school: string | null;
  authorId: string;
  onPosted: () => void;
  onCancel: () => void;
}) {
  const [course, setCourse] = useState(scope.course ?? "");
  const [chapter, setChapter] = useState(scope.chapter ?? "");
  const [lesson, setLesson] = useState(scope.lesson ?? "");
  const [topic, setTopic] = useState(scope.topic ?? "");

  const board = useMemo(() => {
    if (scope.space === "learning") return defaultBoard({ space: "learning", course: course || undefined, chapter: chapter || undefined, lesson: lesson || undefined }, school);
    if (scope.space === "interview") return defaultBoard({ space: "interview", topic: topic || undefined }, school);
    return defaultBoard(scope, school);
  }, [scope, course, chapter, lesson, topic, school]);

  const courseObj = courses.find((c) => c.domain === course);
  const chapterObj = courseObj?.sections.find((s) => s.id === chapter);
  const select = "font-body rounded-lg border border-[var(--line)] bg-[var(--paper)] px-2.5 py-1.5 text-sm text-[var(--ink)]";

  return (
    <div className="space-y-3">
      <div className="font-body flex flex-wrap items-center gap-2 rounded-xl border border-[var(--line)] bg-[var(--panel)] p-3 text-sm">
        <span className="text-[var(--ink-soft)]">Post in</span>
        {scope.space === "learning" && (
          <>
            <select
              value={course}
              onChange={(e) => {
                setCourse(e.target.value);
                setChapter("");
                setLesson("");
              }}
              className={select}
            >
              <option value="">Choose a course…</option>
              {courses.map((c) => (
                <option key={c.domain} value={c.domain}>
                  {c.label}
                </option>
              ))}
            </select>
            {courseObj && (
              <select
                value={chapter}
                onChange={(e) => {
                  setChapter(e.target.value);
                  setLesson("");
                }}
                className={select}
              >
                <option value="">Whole course</option>
                {courseObj.sections.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            )}
            {chapterObj && (
              <select value={lesson} onChange={(e) => setLesson(e.target.value)} className={select}>
                <option value="">Whole chapter</option>
                {chapterObj.concepts.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.title}
                  </option>
                ))}
              </select>
            )}
          </>
        )}
        {scope.space === "interview" && (
          <select value={topic} onChange={(e) => setTopic(e.target.value)} className={select}>
            <option value="">Interview Prep (general)</option>
            {interviewTopics.map((t) => (
              <option key={t.slug} value={t.slug}>
                {t.label}
              </option>
            ))}
          </select>
        )}
        {scope.space === "school" && school && <span className="font-medium text-[var(--ink)]">{getSchoolNameForDomain(school)}</span>}
      </div>

      {board ? (
        <PostComposer conceptId={board} authorId={authorId} onPosted={onPosted} onCancel={onCancel} />
      ) : (
        <div className="flex items-center justify-between gap-3">
          <p className="font-body text-sm text-[var(--ink-soft)]">Choose a course to post in.</p>
          <button type="button" onClick={onCancel} className="font-body text-sm text-[var(--ink-soft)] hover:text-[var(--ink)]">
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
