import { useEffect, useRef, useState, type FormEvent } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { AuthError, AuthInput, AuthLayout, AuthSubmitButton } from "../components/auth/AuthLayout";
import { Avatar } from "../components/Avatar";
import { useAuth } from "../lib/auth/useAuth";
import {
  chooseUsername,
  isUsernameAvailable,
  suggestUsername,
  uploadAvatar,
  useOwnProfileState,
  USERNAME_PATTERN,
  USERNAME_RULE,
} from "../lib/profiles";

/**
 * `/welcome`: the first stop for a new account, email or Google alike. The
 * signup trigger can only invent a placeholder username, so the person picks
 * their own here (and may add a picture). Until they do, `OnboardingGate`
 * sends every page here.
 */
export function WelcomePage() {
  const { user, loading: authLoading } = useAuth();
  const { profile, loading, refresh } = useOwnProfileState();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const next = safeNext(searchParams.get("next"));

  if (authLoading || (user && loading)) return null;
  if (!user) return <Navigate to="/login" replace />;
  if (!profile) {
    return (
      <AuthLayout title="Almost there">
        <AuthError message="We couldn't load your profile. Refresh the page to try again." />
      </AuthLayout>
    );
  }
  if (profile.usernameChosen) return <Navigate to={next} replace />;

  return (
    <ChooseUsername
      key={profile.id}
      userId={profile.id}
      displayName={profile.displayName}
      avatarUrl={profile.avatarUrl}
      onAvatarChange={refresh}
      onDone={async () => {
        await refresh();
        navigate(next, { replace: true });
      }}
    />
  );
}

/** Only same-site paths, so `?next=` can't bounce someone to another website. */
function safeNext(raw: string | null): string {
  return raw && raw.startsWith("/") && !raw.startsWith("//") && !raw.startsWith("/welcome") ? raw : "/";
}

type Availability = "idle" | "checking" | "available" | "taken";

function ChooseUsername({
  userId,
  displayName,
  avatarUrl,
  onAvatarChange,
  onDone,
}: {
  userId: string;
  displayName: string;
  avatarUrl: string | null;
  onAvatarChange: () => Promise<void>;
  onDone: () => Promise<void>;
}) {
  const [username, setUsername] = useState(() => suggestUsername(displayName));
  const [availability, setAvailability] = useState<Availability>("idle");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const valid = USERNAME_PATTERN.test(username);

  // Check availability shortly after typing stops.
  useEffect(() => {
    if (!valid) return;
    let cancelled = false;
    const timer = setTimeout(() => {
      setAvailability("checking");
      void isUsernameAvailable(username, userId).then((free) => {
        if (!cancelled) setAvailability(free ? "available" : "taken");
      });
    }, 350);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [username, valid, userId]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    if (!valid) {
      setError(USERNAME_RULE);
      return;
    }
    setSaving(true);
    const { error: saveError } = await chooseUsername(userId, username);
    if (saveError) {
      setSaving(false);
      setError(saveError);
      return;
    }
    await onDone();
  }

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setError(null);
    setUploading(true);
    const { error: uploadError } = await uploadAvatar(userId, file);
    setUploading(false);
    if (uploadError) setError(uploadError);
    else await onAvatarChange();
  }

  const hint = !username
    ? USERNAME_RULE
    : !valid
      ? USERNAME_RULE
      : availability === "checking"
        ? "Checking…"
        : availability === "taken"
          ? "That username is taken."
          : availability === "available"
            ? `Available — your profile will be at /u/${username}.`
            : "";

  return (
    <AuthLayout title="Choose a username" subtitle="This is how other learners will find you.">
      <div className="mb-6 flex items-center gap-4">
        <Avatar url={avatarUrl} name={displayName} size={64} />
        <div className="font-body text-sm">
          <p className="text-[var(--ink)]">{displayName}</p>
          <button
            type="button"
            onClick={() => fileInput.current?.click()}
            disabled={uploading}
            className="mt-1 font-medium text-[var(--accent)] hover:underline disabled:opacity-50"
          >
            {uploading ? "Uploading…" : avatarUrl ? "Change picture" : "Add a picture"}
          </button>
          <input
            ref={fileInput}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            className="hidden"
            onChange={(e) => {
              void handleFile(e.target.files?.[0]);
              e.target.value = "";
            }}
          />
        </div>
      </div>

      {error && <AuthError message={error} />}

      <form onSubmit={handleSubmit}>
        <AuthInput
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          required
          value={username}
          onChange={(e) => {
            setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 30));
            setAvailability("idle");
          }}
        />
        {hint && (
          <p
            className={`font-body -mt-2 mb-4 text-xs ${availability === "taken" ? "text-red-600" : availability === "available" && valid ? "text-[var(--teal)]" : "text-[var(--ink-soft)]"}`}
          >
            {hint}
          </p>
        )}
        <p className="font-body mb-4 text-xs text-[var(--ink-soft)]">
          Your display name is <span className="font-medium text-[var(--ink)]">{displayName}</span>. You can change it,
          and your picture, any time from your profile.
        </p>
        <AuthSubmitButton disabled={saving || !valid || availability === "taken" || availability === "checking"}>
          {saving ? "Saving…" : "Continue"}
        </AuthSubmitButton>
      </form>
    </AuthLayout>
  );
}
