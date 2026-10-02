import { useState } from "react";

function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * A round profile picture, falling back to initials when there's no picture
 * or it fails to load. `no-referrer` because Google photo URLs can refuse
 * hot-linked requests that carry a referrer.
 */
export function Avatar({ url, name, size = 36, className = "" }: { url: string | null | undefined; name: string; size?: number; className?: string }) {
  const [failed, setFailed] = useState<string | null>(null);
  const showImage = Boolean(url) && failed !== url;
  const style = { width: size, height: size, fontSize: Math.max(10, Math.round(size * 0.36)) };

  return showImage ? (
    <img
      src={url!}
      alt=""
      referrerPolicy="no-referrer"
      onError={() => setFailed(url ?? null)}
      className={`shrink-0 rounded-full object-cover ${className}`}
      style={style}
    />
  ) : (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-full font-semibold text-[var(--accent-ink)] ${className}`}
      style={{ ...style, background: "var(--accent)" }}
    >
      {initialsOf(name)}
    </span>
  );
}
