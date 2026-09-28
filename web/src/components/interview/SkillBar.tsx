import { Link } from "react-router-dom";

/**
 * One interview skill bar. `before`, when given, draws the pre-answer level as
 * a ghost so a candidate sees exactly how much a question moved them.
 */
export function SkillBar({
  label,
  value,
  before,
  attempts,
  trainHref,
}: {
  label: string;
  value: number;
  before?: number;
  attempts?: number;
  trainHref?: string;
}) {
  const v = Math.round(value);
  const delta = before === undefined ? 0 : Math.round(value - before);
  return (
    <div className="font-body">
      <div className="mb-1 flex items-baseline justify-between gap-3 text-sm">
        <span className="truncate text-[var(--ink)]">{label}</span>
        <span className="flex shrink-0 items-baseline gap-2">
          {delta !== 0 && (
            <span className={`text-xs font-semibold ${delta > 0 ? "text-[var(--teal)]" : "text-red-600"}`}>
              {delta > 0 ? `+${delta}` : delta}
            </span>
          )}
          <span className="font-semibold text-[var(--ink)]">{v}</span>
          {attempts !== undefined && <span className="text-xs text-[var(--ink-soft)]">{attempts} answered</span>}
          {trainHref && (
            <Link to={trainHref} className="text-xs font-semibold text-[var(--accent)] hover:underline">
              Train
            </Link>
          )}
        </span>
      </div>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-[var(--line)]">
        <div
          className="h-full rounded-full transition-[width] duration-500"
          style={{ width: `${Math.max(v, 1)}%`, background: v >= 65 ? "var(--teal)" : "var(--accent)" }}
        />
        {before !== undefined && Math.abs(delta) >= 1 && (
          <div className="absolute top-0 h-full w-0.5 bg-[var(--ink-soft)] opacity-50" style={{ left: `${before}%` }} />
        )}
      </div>
    </div>
  );
}
