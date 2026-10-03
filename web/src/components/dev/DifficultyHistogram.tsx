import { useMemo } from "react";

/**
 * Difficulty filter for the question bank: a histogram of how many questions
 * sit at each level, with a two-handled slider underneath to pick a range.
 * Bars inside the range are filled; bars outside are faded, so you can see at
 * a glance how much of the bank the range keeps.
 */
export function DifficultyHistogram({
  levels,
  min,
  max,
  lower,
  upper,
  step = 0.5,
  onChange,
}: {
  /** Difficulty level (1–10) of every question the other filters keep. */
  levels: number[];
  min: number;
  max: number;
  lower: number;
  upper: number;
  step?: number;
  onChange: (lower: number, upper: number) => void;
}) {
  const bins = useMemo(() => {
    const count = Math.round((max - min) / step);
    const counts = new Array<number>(count).fill(0);
    for (const level of levels) {
      const i = Math.min(count - 1, Math.max(0, Math.floor((level - min) / step)));
      counts[i]++;
    }
    return counts.map((n, i) => ({ n, from: min + i * step, to: min + (i + 1) * step }));
  }, [levels, min, max, step]);

  const tallest = Math.max(1, ...bins.map((b) => b.n));
  const kept = levels.filter((l) => l >= lower && l <= upper).length;
  const pct = (v: number) => ((v - min) / (max - min)) * 100;

  const thumb =
    "pointer-events-none absolute inset-x-0 top-0 h-4 w-full appearance-none bg-transparent " +
    "[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 " +
    "[&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full " +
    "[&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-[var(--accent)] [&::-webkit-slider-thumb]:shadow " +
    "[&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:cursor-grab " +
    "[&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-[var(--accent)]";

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="font-body text-xs text-[var(--ink-soft)]">
          Difficulty {lower.toFixed(1)} – {upper.toFixed(1)}
        </span>
        <span className="font-body text-[11px] tabular-nums text-[var(--ink-soft)]">
          {kept}/{levels.length}
        </span>
      </div>

      <div className="mt-2 flex h-16 items-end gap-px" aria-hidden="true">
        {bins.map((b) => {
          const inside = b.to > lower && b.from < upper;
          return (
            <div
              key={b.from}
              title={`Level ${b.from.toFixed(1)}–${b.to.toFixed(1)}: ${b.n} question${b.n === 1 ? "" : "s"}`}
              className="flex-1 rounded-t-sm transition-colors"
              style={{
                height: `${b.n === 0 ? 2 : Math.max(6, (b.n / tallest) * 100)}%`,
                background: inside ? "var(--accent)" : "var(--line)",
                opacity: b.n === 0 ? 0.4 : 1,
              }}
            />
          );
        })}
      </div>

      <div className="relative mt-1 h-4">
        <div className="absolute inset-x-0 top-1.5 h-1 rounded-full bg-[var(--line)]" />
        <div
          className="absolute top-1.5 h-1 rounded-full bg-[var(--accent)]"
          style={{ left: `${pct(lower)}%`, width: `${pct(upper) - pct(lower)}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={lower}
          aria-label="Minimum difficulty"
          onChange={(e) => onChange(Math.min(Number(e.target.value), upper), upper)}
          className={thumb}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={upper}
          aria-label="Maximum difficulty"
          onChange={(e) => onChange(lower, Math.max(Number(e.target.value), lower))}
          className={thumb}
        />
      </div>
      <div className="font-body mt-1 flex justify-between text-[10px] text-[var(--ink-soft)]">
        <span>{min}</span>
        <span>{(min + max) / 2}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
