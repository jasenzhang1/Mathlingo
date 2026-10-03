import { useId, useState, type ReactNode } from "react";

/**
 * A small ⓘ next to a field label that explains the field on hover, focus or
 * tap. The text is also the button's accessible description, so it reads out
 * for screen readers without opening.
 */
export function InfoTip({ children, label = "More information" }: { children: ReactNode; label?: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <span className="relative ml-1 inline-flex align-middle normal-case tracking-normal">
      <button
        type="button"
        aria-label={label}
        aria-describedby={id}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="flex h-4 w-4 items-center justify-center rounded-full border border-[var(--ink-soft)] text-[10px] font-semibold leading-none text-[var(--ink-soft)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
      >
        i
      </button>
      <span
        id={id}
        role="tooltip"
        className={`font-body absolute left-1/2 top-6 z-50 w-72 -translate-x-1/2 rounded-xl border border-[var(--line)] bg-[var(--panel)] p-3 text-xs font-normal leading-relaxed text-[var(--ink)] shadow-lg ${
          open ? "block" : "hidden"
        }`}
      >
        {children}
      </span>
    </span>
  );
}
