/**
 * Geometry for drawing proficiency as how full a circle is.
 *
 * The filled part is the circular segment below a horizontal water line: at
 * 0/100 there is nothing to draw and the node reads as a hollow ring, at 50/100
 * the bottom half is filled, and at 100/100 the whole circle is solid. Fill
 * height is linear in proficiency (not area), because the level people read off
 * a filling shape is its height.
 */

export const MAX_PROFICIENCY = 100;

export function proficiencyRatio(value: number): number {
  return Math.min(1, Math.max(0, value / MAX_PROFICIENCY));
}

/**
 * SVG path for the filled part of a circle centred on the origin.
 * Returns null when there is nothing to fill.
 */
export function fillSegmentPath(radius: number, ratio: number): string | null {
  const clamped = Math.min(1, Math.max(0, ratio));
  if (clamped <= 0) return null;
  if (clamped >= 1) {
    // Two half-arcs, since a single arc command cannot close a full circle.
    return `M ${-radius} 0 A ${radius} ${radius} 0 1 0 ${radius} 0 A ${radius} ${radius} 0 1 0 ${-radius} 0 Z`;
  }

  // y grows downward, so the water line starts at the bottom (y = +r) and
  // rises to the top (y = -r) as the ratio goes from 0 to 1.
  const y = radius - 2 * radius * clamped;
  const halfChord = Math.sqrt(Math.max(0, radius * radius - y * y));
  // Sweep 0 takes the arc below the chord; past halfway that arc is the long one.
  const largeArc = y < 0 ? 1 : 0;

  return `M ${-halfChord} ${y} A ${radius} ${radius} 0 ${largeArc} 0 ${halfChord} ${y} Z`;
}
