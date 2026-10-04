import { useEffect, useMemo, useRef, useState } from "react";
import { formatProficiency } from "../lib/assessment/formatProficiency";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Avatar } from "../components/Avatar";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";
import { type Achievement, computeAchievements } from "../lib/achievements";
import { expFor } from "../lib/assessment/exp";
import { loadAllConceptStates } from "../lib/assessment/persistence";
import type { ConceptState } from "../lib/assessment/types";
import { useAuth } from "../lib/auth/useAuth";
import { chapters } from "../lib/learningOrder";
import { proficiencyRatio } from "../lib/proficiencyFill";
import { TopicMasteryGrid } from "../components/TopicMasteryGrid";
import {
  type Profile,
  loadProfileByUsername,
  updateOwnProfile,
  uploadAvatar,
  removeAvatar,
  useOwnProfileState,
} from "../lib/profiles";
import { getSchoolNameForDomain } from "../data/eduDomains";
import { loadStoredAchievements, type StoredAchievement } from "../lib/social/leaderboard";
import {
  chatStatus,
  followCounts,
  getShowOnLeaderboards,
  isFollowing,
  requestChat,
  setFollowing,
  setShowOnLeaderboards,
  type ChatStatus,
} from "../lib/social/social";

function SubjectBar({
  label,
  color,
  value,
}: {
  label: string;
  color: string;
  value: number;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-body w-40 shrink-0 truncate text-sm text-[var(--ink)]">
        {label}
      </span>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-[var(--line)]">
        <div
          className="h-full rounded-full"
          style={{
            width: `${proficiencyRatio(value) * 100}%`,
            background: color,
          }}
        />
      </div>
      <span className="font-body w-10 shrink-0 text-right text-xs tabular-nums text-[var(--ink-soft)]">
        {formatProficiency(value)}
      </span>
    </div>
  );
}

interface EditForm {
  displayName: string;
  username: string;
  bio: string;
  showProficiency: boolean;
  showAchievements: boolean;
}

function formFrom(profile: Profile): EditForm {
  return {
    displayName: profile.displayName,
    username: profile.username,
    bio: profile.bio ?? "",
    showProficiency: profile.showProficiency,
    showAchievements: profile.showAchievements,
  };
}

/**
 * A public profile at /u/:username. Bio and the two visibility toggles are
 * editable only by the profile's own owner, in place on this same page —
 * there's no separate settings screen for it, since there's nothing here a
 * visitor's view doesn't already show the shape of.
 *
 * Proficiency and achievements are both derived from the same
 * `concept_states` rows the concept map reads; a non-owner's fetch of them
 * only succeeds when the owner has opted in (enforced by Postgres RLS, not
 * just hidden in the UI — see supabase/migrations/0005_profiles_public.sql).
 */
export function ProfilePage() {
  const { username } = useParams<{ username: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<Profile | null | undefined>(undefined);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [states, setStates] = useState<ConceptState[]>([]);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<EditForm | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [avatarBusy, setAvatarBusy] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const [counts, setCounts] = useState<{ followers: number; following: number } | null>(null);
  const [following, setFollowingState] = useState(false);
  const [chat, setChat] = useState<ChatStatus>("none");
  const [chatDraft, setChatDraft] = useState<string | null>(null);
  const [socialError, setSocialError] = useState<string | null>(null);
  const [honours, setHonours] = useState<StoredAchievement[]>([]);
  /** Null until loaded, or when migration 0015 isn't in yet (the toggle is then hidden). */
  const [onLeaderboards, setOnLeaderboards] = useState<boolean | null>(null);
  // The app-wide copy of your own profile (nav avatar, etc.), re-read after edits.
  const { refresh: refreshOwnProfile } = useOwnProfileState();

  useEffect(() => {
    let cancelled = false;
    setProfile(undefined);
    setLoadError(null);
    async function load() {
      if (!username) return;
      const { profile: loaded, error: fetchError } =
        await loadProfileByUsername(username);
      if (cancelled) return;
      setProfile(loaded);
      setLoadError(fetchError);
      if (loaded) setForm(formFrom(loaded));
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [username]);

  const isOwner = Boolean(user && profile && user.id === profile.id);

  useEffect(() => {
    let cancelled = false;
    async function loadStates() {
      if (!profile) {
        setStates([]);
        return;
      }
      // Skip the request entirely when neither opt-in is on and this isn't
      // the owner — RLS would return nothing anyway, but there's no reason
      // to round-trip for it.
      if (!isOwner && !profile.showProficiency && !profile.showAchievements) {
        setStates([]);
        return;
      }
      const loaded = await loadAllConceptStates(profile.id, isOwner);
      if (!cancelled) setStates(loaded);
    }
    void loadStates();
    return () => {
      cancelled = true;
    };
  }, [profile, isOwner]);

  // Followers, your relationship to this person, and their leaderboard honours.
  useEffect(() => {
    let cancelled = false;
    if (!profile) return;
    void followCounts(profile.id).then((c) => {
      if (!cancelled) setCounts(c);
    });
    void loadStoredAchievements(profile.id).then((a) => {
      if (!cancelled) setHonours(a);
    });
    if (user && user.id !== profile.id) {
      void isFollowing(user.id, profile.id).then((f) => {
        if (!cancelled) setFollowingState(f);
      });
      void chatStatus(user.id, profile.id).then((c) => {
        if (!cancelled) setChat(c);
      });
    }
    if (user && user.id === profile.id) {
      void getShowOnLeaderboards(user.id).then((v) => {
        if (!cancelled) setOnLeaderboards(v);
      });
    }
    return () => {
      cancelled = true;
    };
  }, [profile, user]);

  async function toggleFollow() {
    if (!user || !profile) return;
    const next = !following;
    setFollowingState(next);
    setCounts((c) => (c ? { ...c, followers: c.followers + (next ? 1 : -1) } : c));
    const result = await setFollowing(user.id, profile.id, next);
    if (result.error) {
      setFollowingState(!next);
      setCounts((c) => (c ? { ...c, followers: c.followers + (next ? -1 : 1) } : c));
      setSocialError(result.error);
    }
  }

  async function sendChatRequest() {
    if (!user || !profile || chatDraft === null) return;
    const result = await requestChat(user.id, profile.id, chatDraft.trim());
    if (result.error) {
      setSocialError(/duplicate key/i.test(result.error) ? "You've already sent a request." : result.error);
      return;
    }
    setChat("sent");
    setChatDraft(null);
  }

  const now = Date.now();

  const subjectSummaries = useMemo(() => {
    const byId = new Map(states.map((s) => [s.conceptId, s]));
    return chapters.map((chapter) => {
      const total = chapter.concepts.reduce((sum, c) => {
        const state = byId.get(c.id);
        return sum + (state ? expFor(state, now).value : 0);
      }, 0);
      return {
        domain: chapter.domain,
        label: chapter.label,
        color: chapter.color,
        value:
          chapter.concepts.length > 0 ? total / chapter.concepts.length : 0,
      };
    });
    // now intentionally excluded: this only needs to be roughly fresh, not
    // re-derived every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [states]);

  const achievements: Achievement[] = useMemo(
    () => computeAchievements(states, now),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [states],
  );

  async function save() {
    if (!user || !profile || !form) return;
    setSaving(true);
    setError(null);
    const normalizedUsername = form.username.trim().toLowerCase();
    const result = await updateOwnProfile(user.id, {
      username: normalizedUsername,
      displayName: form.displayName.trim() || profile.displayName,
      bio: form.bio.trim(),
      showProficiency: form.showProficiency,
      showAchievements: form.showAchievements,
    });
    setSaving(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    setEditing(false);
    void refreshOwnProfile();
    if (normalizedUsername !== profile.username) {
      // The URL is the username — changing it means moving pages.
      navigate(`/u/${normalizedUsername}`, { replace: true });
      return;
    }
    setProfile({
      ...profile,
      username: normalizedUsername,
      displayName: form.displayName.trim() || profile.displayName,
      bio: form.bio.trim() || null,
      showProficiency: form.showProficiency,
      showAchievements: form.showAchievements,
    });
  }

  async function changeAvatar(file: File | undefined) {
    if (!file || !user || !profile) return;
    setAvatarBusy(true);
    setError(null);
    const { url, error: uploadError } = await uploadAvatar(user.id, file);
    setAvatarBusy(false);
    if (uploadError) {
      setError(uploadError);
      return;
    }
    setProfile({ ...profile, avatarUrl: url });
    void refreshOwnProfile();
  }

  async function clearAvatar() {
    if (!user || !profile) return;
    setAvatarBusy(true);
    setError(null);
    const { error: removeError } = await removeAvatar(user.id);
    setAvatarBusy(false);
    if (removeError) {
      setError(removeError);
      return;
    }
    setProfile({ ...profile, avatarUrl: null });
    void refreshOwnProfile();
  }

  if (profile === undefined) {
    return (
      <div className="min-h-screen bg-[var(--paper)]">
        <Nav />
        <main className="mx-auto max-w-3xl px-6 py-20">
          <div className="h-6 w-40 animate-pulse rounded bg-[var(--line)]" />
        </main>
        <Footer />
      </div>
    );
  }

  if (profile === null) {
    return (
      <div className="min-h-screen bg-[var(--paper)]">
        <Nav />
        <main className="mx-auto max-w-3xl px-6 py-20 text-center">
          <h1 className="font-display text-2xl text-[var(--ink)]">
            {loadError ? "Couldn't load this profile" : "No such profile"}
          </h1>
          <p className="font-body mt-2 text-[var(--ink-soft)]">
            {loadError ??
              `Nobody at @${username} — check the username and try again.`}
          </p>
          <Link
            to="/"
            className="font-body mt-4 inline-block text-sm font-medium text-[var(--accent)] hover:underline"
          >
            Back home →
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const canSeeProficiency = isOwner || profile.showProficiency;
  const canSeeAchievements = isOwner || profile.showAchievements;

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <Nav />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar url={profile.avatarUrl} name={profile.displayName} size={64} />
            <div>
              <h1 className="font-display text-2xl text-[var(--ink)]">
                {profile.displayName}
              </h1>
              <p className="font-body text-sm text-[var(--ink-soft)]">
                @{profile.username}
                {counts && (
                  <span className="ml-2">
                    · <span className="text-[var(--ink)]">{counts.followers}</span> follower{counts.followers === 1 ? "" : "s"} ·{" "}
                    <span className="text-[var(--ink)]">{counts.following}</span> following
                  </span>
                )}
              </p>
              {profile.school && (
                <p className="font-body mt-1 inline-flex items-center rounded-full bg-[var(--accent-soft)] px-2.5 py-0.5 text-xs font-medium text-[var(--accent)]">
                  {getSchoolNameForDomain(profile.school)}
                </p>
              )}
            </div>
          </div>
          {isOwner && !editing && (
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="font-body shrink-0 rounded-full border border-[var(--line)] px-4 py-2 text-sm font-medium text-[var(--ink)] hover:border-[var(--accent)]"
            >
              Edit profile
            </button>
          )}
          {user && !isOwner && (
            <div className="flex shrink-0 flex-wrap justify-end gap-2">
              <button
                type="button"
                onClick={() => void toggleFollow()}
                className={`font-body rounded-full px-4 py-2 text-sm font-medium ${
                  following
                    ? "border border-[var(--line)] text-[var(--ink)] hover:border-red-400"
                    : "bg-[var(--accent)] text-white hover:opacity-90"
                }`}
              >
                {following ? "Following" : "Follow"}
              </button>
              {chat === "accepted" ? (
                <Link to={`/messages/${profile.username}`} className="font-body rounded-full border border-[var(--line)] px-4 py-2 text-sm font-medium text-[var(--ink)] hover:border-[var(--accent)]">
                  Message
                </Link>
              ) : chat === "received" ? (
                <Link to="/messages" className="font-body rounded-full border border-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent)]">
                  Respond to chat request
                </Link>
              ) : chat === "sent" || chat === "declined" ? (
                <span className="font-body rounded-full border border-dashed border-[var(--line)] px-4 py-2 text-sm text-[var(--ink-soft)]">
                  Chat requested
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => setChatDraft(chatDraft === null ? "" : null)}
                  className="font-body rounded-full border border-[var(--line)] px-4 py-2 text-sm font-medium text-[var(--ink)] hover:border-[var(--accent)]"
                >
                  Request chat
                </button>
              )}
            </div>
          )}
        </div>

        {chatDraft !== null && (
          <div className="mt-4 rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-4">
            <p className="font-body text-sm text-[var(--ink)]">
              Send {profile.displayName} a chat request. You can message each other once they accept.
            </p>
            <textarea
              value={chatDraft}
              onChange={(e) => setChatDraft(e.target.value)}
              maxLength={500}
              rows={2}
              placeholder="Add a note (optional)"
              className="font-body mt-2 w-full resize-none rounded-xl border border-[var(--line)] bg-[var(--paper)] px-3 py-2 text-sm text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            />
            <div className="mt-2 flex gap-2">
              <button type="button" onClick={() => void sendChatRequest()} className="font-body rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white">
                Send request
              </button>
              <button type="button" onClick={() => setChatDraft(null)} className="font-body rounded-full border border-[var(--line)] px-4 py-2 text-sm text-[var(--ink)]">
                Cancel
              </button>
            </div>
          </div>
        )}
        {socialError && <p className="font-body mt-3 text-sm text-red-700">{socialError}</p>}

        {editing && form ? (
          <div className="mt-8 space-y-5 rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6 shadow-sm">
            <div>
              <span className="font-body text-xs font-semibold uppercase tracking-wide text-[var(--ink-soft)]">
                Profile picture
              </span>
              <div className="mt-2 flex items-center gap-4">
                <Avatar url={profile.avatarUrl} name={form.displayName || profile.displayName} size={56} />
                <button
                  type="button"
                  onClick={() => fileInput.current?.click()}
                  disabled={avatarBusy}
                  className="font-body rounded-full border border-[var(--line)] px-4 py-2 text-sm font-medium text-[var(--ink)] hover:border-[var(--accent)] disabled:opacity-50"
                >
                  {avatarBusy ? "Working…" : profile.avatarUrl ? "Change picture" : "Upload picture"}
                </button>
                {profile.avatarUrl && (
                  <button
                    type="button"
                    onClick={() => void clearAvatar()}
                    disabled={avatarBusy}
                    className="font-body text-sm text-[var(--ink-soft)] hover:text-red-600 disabled:opacity-50"
                  >
                    Remove
                  </button>
                )}
                <input
                  ref={fileInput}
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  className="hidden"
                  onChange={(e) => {
                    void changeAvatar(e.target.files?.[0]);
                    e.target.value = "";
                  }}
                />
              </div>
              <p className="font-body mt-1.5 text-xs text-[var(--ink-soft)]">PNG, JPEG, WebP or GIF, up to 2 MB.</p>
            </div>
            <div>
              <label className="font-body text-xs font-semibold uppercase tracking-wide text-[var(--ink-soft)]">
                Display name
              </label>
              <input
                type="text"
                value={form.displayName}
                onChange={(e) =>
                  setForm({ ...form, displayName: e.target.value })
                }
                maxLength={80}
                className="font-body mt-1.5 w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] px-3 py-2 text-sm text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              />
            </div>
            <div>
              <label className="font-body text-xs font-semibold uppercase tracking-wide text-[var(--ink-soft)]">
                Username
              </label>
              <input
                type="text"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                maxLength={30}
                className="font-body mt-1.5 w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] px-3 py-2 text-sm text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              />
              <p className="font-body mt-1 text-xs text-[var(--ink-soft)]">
                Lowercase letters, numbers, and hyphens. This is your profile's
                URL: /u/{form.username || "…"}
              </p>
            </div>
            <div>
              <label className="font-body text-xs font-semibold uppercase tracking-wide text-[var(--ink-soft)]">
                Bio
              </label>
              <textarea
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                maxLength={500}
                rows={4}
                className="font-body mt-1.5 w-full resize-none rounded-xl border border-[var(--line)] bg-[var(--paper)] px-3 py-2 text-sm text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              />
            </div>
            <label className="font-body flex items-center gap-2.5 text-sm text-[var(--ink)]">
              <input
                type="checkbox"
                checked={form.showProficiency}
                onChange={(e) =>
                  setForm({ ...form, showProficiency: e.target.checked })
                }
                className="h-4 w-4 rounded border-[var(--line)] accent-[var(--accent)]"
              />
              Show my subject proficiency on this page
            </label>
            <label className="font-body flex items-center gap-2.5 text-sm text-[var(--ink)]">
              <input
                type="checkbox"
                checked={form.showAchievements}
                onChange={(e) =>
                  setForm({ ...form, showAchievements: e.target.checked })
                }
                className="h-4 w-4 rounded border-[var(--line)] accent-[var(--accent)]"
              />
              Show my achievements on this page
            </label>
            {onLeaderboards !== null && (
              <label className="font-body flex items-center gap-2.5 text-sm text-[var(--ink)]">
                <input
                  type="checkbox"
                  checked={onLeaderboards}
                  onChange={(e) => {
                    const next = e.target.checked;
                    setOnLeaderboards(next);
                    if (user) void setShowOnLeaderboards(user.id, next);
                  }}
                  className="h-4 w-4 rounded border-[var(--line)] accent-[var(--accent)]"
                />
                Show me on leaderboards
              </label>
            )}

            {error && <p className="font-body text-sm text-red-700">{error}</p>}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => void save()}
                disabled={saving}
                className="font-body rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {saving ? "Saving…" : "Save"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditing(false);
                  setError(null);
                  setForm(formFrom(profile));
                }}
                className="font-body rounded-full border border-[var(--line)] px-5 py-2.5 text-sm font-medium text-[var(--ink)] hover:border-[var(--accent)]"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          profile.bio && (
            <p className="font-body mt-6 whitespace-pre-wrap text-[var(--ink)]">
              {profile.bio}
            </p>
          )
        )}

        {canSeeProficiency && (
          <div className="mt-10">
            <h2 className="font-display text-lg text-[var(--ink)]">
              Subject proficiency
              {isOwner && !profile.showProficiency && (
                <span className="font-body ml-2 text-xs font-normal text-[var(--ink-soft)]">
                  (only visible to you)
                </span>
              )}
            </h2>
            <div className="mt-4 space-y-3 rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-5 shadow-sm">
              {subjectSummaries.map((s) => (
                <SubjectBar
                  key={s.domain}
                  label={s.label}
                  color={s.color}
                  value={s.value}
                />
              ))}
            </div>
          </div>
        )}

        {canSeeProficiency && (
          <div className="mt-10">
            <h2 className="font-display text-lg text-[var(--ink)]">
              Lesson mastery
            </h2>
            <div className="mt-4 rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-5 shadow-sm">
              <TopicMasteryGrid states={states} />
            </div>
          </div>
        )}

        {canSeeAchievements && (
          <div className="mt-10">
            <h2 className="font-display text-lg text-[var(--ink)]">
              Achievements
              {isOwner && !profile.showAchievements && (
                <span className="font-body ml-2 text-xs font-normal text-[var(--ink-soft)]">
                  (only visible to you)
                </span>
              )}
            </h2>
            {honours.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-3">
                {honours.map((a) => (
                  <div
                    key={a.id}
                    title={a.detail ?? undefined}
                    className="font-body rounded-full border border-[var(--accent)] bg-[var(--accent-soft)] px-4 py-2 text-sm text-[var(--ink)] shadow-sm"
                  >
                    🏆 {a.label}
                  </div>
                ))}
              </div>
            )}
            {achievements.length === 0 && honours.length === 0 ? (
              <p className="font-body mt-3 text-sm text-[var(--ink-soft)]">
                {isOwner
                  ? "Clear a concept to earn your first one."
                  : "No achievements yet."}
              </p>
            ) : (
              <div className="mt-4 flex flex-wrap gap-3">
                {achievements.map((a) => (
                  <div
                    key={a.id}
                    title={a.description}
                    className="font-body rounded-full border border-[var(--line)] bg-[var(--panel)] px-4 py-2 text-sm text-[var(--ink)] shadow-sm"
                  >
                    {a.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
