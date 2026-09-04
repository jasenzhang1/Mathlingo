/** Small numeric helpers shared across the assessment modules. */

export function clamp(x: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, x));
}

export function sigmoid(x: number): number {
  return 1 / (1 + Math.exp(-x));
}

export function median(xs: number[]): number {
  if (xs.length === 0) return Number.NaN;
  const sorted = [...xs].sort((a, b) => a - b);
  const mid = sorted.length >> 1;
  return sorted.length % 2 === 1
    ? sorted[mid]!
    : (sorted[mid - 1]! + sorted[mid]!) / 2;
}

/**
 * Pearson correlation. Used for item discrimination (point-biserial is just
 * Pearson with one binary variable), so it lives here rather than in
 * calibration.ts.
 */
export function correlation(xs: number[], ys: number[]): number {
  const n = Math.min(xs.length, ys.length);
  if (n < 2) return Number.NaN;

  let sx = 0;
  let sy = 0;
  for (let i = 0; i < n; i++) {
    sx += xs[i]!;
    sy += ys[i]!;
  }
  const mx = sx / n;
  const my = sy / n;

  let sxy = 0;
  let sxx = 0;
  let syy = 0;
  for (let i = 0; i < n; i++) {
    const dx = xs[i]! - mx;
    const dy = ys[i]! - my;
    sxy += dx * dy;
    sxx += dx * dx;
    syy += dy * dy;
  }

  const denom = Math.sqrt(sxx * syy);
  return denom === 0 ? Number.NaN : sxy / denom;
}

export const DAY_MS = 24 * 60 * 60 * 1000;

export function daysBetween(from: number, to: number): number {
  return Math.max(0, (to - from) / DAY_MS);
}
