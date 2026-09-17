import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { expFor } from "../lib/assessment/exp";
import type { ConceptState } from "../lib/assessment/types";
import { chapters, type Chapter } from "../lib/learningOrder";
import { proficiencyRatio } from "../lib/proficiencyFill";
import type { Concept } from "../data/concepts";

/** The panel's own background at 0/100, the topic's own color at 100/100,
 * linear in between — mixing from the theme's panel color rather than a
 * literal white keeps this legible in dark mode too. */
function fillStyle(color: string, value: number): React.CSSProperties {
  const pct = Math.round(proficiencyRatio(value) * 100);
  return {
    background: `color-mix(in srgb, var(--panel), ${color} ${pct}%)`,
  };
}

function averageOf(concepts: Concept[], byId: Map<string, ConceptState>, now: number): number {
  if (concepts.length === 0) return 0;
  const total = concepts.reduce((sum, c) => {
    const state = byId.get(c.id);
    return sum + (state ? expFor(state, now).value : 0);
  }, 0);
  return total / concepts.length;
}

/** One row's worth of concepts in the honeycomb. */
function chunk<T>(items: T[], size: number): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    rows.push(items.slice(i, i + size));
  }
  return rows;
}

const CELL = 13;
const GAP = 3;
/** Fixed rather than responsive, same trade GitHub's own graph makes: a
 * predictable honeycomb that scrolls sideways on narrow screens beats one
 * whose offset rows would misalign every time flex-wrap reflows. */
const COLS = 16;

/** A lesson's own hexagon-ish cell: a small rounded square, filled by its
 * proficiency, that opens the lesson on click. */
function LessonCell({
  concept,
  color,
  value,
  onOpen,
}: {
  concept: Concept;
  color: string;
  value: number;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      title={`${concept.title}: ${Math.round(value)}/100`}
      className="shrink-0 rounded-[3px] border border-[var(--line)] transition-transform hover:z-10 hover:scale-125"
      style={{ width: CELL, height: CELL, ...fillStyle(color, value) }}
    />
  );
}

/** One chapter's lessons, laid out as offset rows so the grid reads as a
 * honeycomb rather than a plain matrix — odd rows shift half a cell right,
 * the way hex tiles interlock. */
function ChapterHive({
  chapter,
  byId,
  now,
  onOpen,
}: {
  chapter: Chapter;
  byId: Map<string, ConceptState>;
  now: number;
  onOpen: (id: string) => void;
}) {
  const rows = useMemo(() => chunk(chapter.concepts, COLS), [chapter]);
  const average = averageOf(chapter.concepts, byId, now);

  return (
    <div>
      <div className="font-body mb-1.5 flex items-center gap-1.5 text-xs text-[var(--ink-soft)]">
        <span
          className="inline-block h-2 w-2 shrink-0 rounded-full"
          style={{ background: chapter.color }}
          aria-hidden="true"
        />
        <span className="font-medium text-[var(--ink)]">{chapter.label}</span>
        <span>· {Math.round(average)}/100 avg</span>
      </div>
      <div className="overflow-x-auto pb-1">
        <div className="flex w-max flex-col" style={{ gap: GAP }}>
          {rows.map((row, i) => (
            <div
              key={i}
              className="flex"
              style={{ gap: GAP, marginLeft: i % 2 === 1 ? (CELL + GAP) / 2 : 0 }}
            >
              {row.map((concept) => {
                const state = byId.get(concept.id);
                const value = state ? expFor(state, now).value : 0;
                return (
                  <LessonCell
                    key={concept.id}
                    concept={concept}
                    color={chapter.color}
                    value={value}
                    onOpen={() => onOpen(concept.id)}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Per-lesson mastery, one small cell per concept — a GitHub-activity-graph
 * read on proficiency instead of commit counts, with cells filled white→the
 * chapter's own color by that concept's EXP, and staggered into a honeycomb
 * rather than a plain grid.
 */
export function TopicMasteryGrid({ states }: { states: ConceptState[] }) {
  const now = Date.now();
  const navigate = useNavigate();

  const byId = useMemo(
    () => new Map(states.map((s) => [s.conceptId, s])),
    [states],
  );

  return (
    <div className="flex flex-col gap-6">
      {chapters.map((chapter) => (
        <ChapterHive
          key={chapter.domain}
          chapter={chapter}
          byId={byId}
          now={now}
          onOpen={(id) => navigate(`/concepts/${id}`)}
        />
      ))}
    </div>
  );
}
