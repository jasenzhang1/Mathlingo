import { useMemo, useState } from "react";
import { expFor } from "../lib/assessment/exp";
import type { ConceptState } from "../lib/assessment/types";
import { chapters, type Chapter, type Section } from "../lib/learningOrder";
import { proficiencyRatio } from "../lib/proficiencyFill";
import type { Concept } from "../data/concepts";

/** White at 0/100, the topic's own color at 100/100, linear in between. */
function fillStyle(color: string, value: number): React.CSSProperties {
  const pct = Math.round(proficiencyRatio(value) * 100);
  return { background: `color-mix(in srgb, white, ${color} ${pct}%)` };
}

function averageOf(concepts: Concept[], byId: Map<string, ConceptState>, now: number): number {
  if (concepts.length === 0) return 0;
  const total = concepts.reduce((sum, c) => {
    const state = byId.get(c.id);
    return sum + (state ? expFor(state, now).value : 0);
  }, 0);
  return total / concepts.length;
}

interface TopicCell {
  chapter: Chapter;
  value: number;
}

interface SectionCell {
  section: Section;
  value: number;
}

function MasteryBlock({
  label,
  color,
  value,
  onClick,
}: {
  label: string;
  color: string;
  value: number;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={`${label}: ${Math.round(value)}/100`}
      className="group flex flex-col items-center gap-1.5 text-left"
    >
      <span
        className="h-11 w-11 rounded-md border border-[var(--line)] shadow-sm transition-transform group-hover:scale-105"
        style={fillStyle(color, value)}
        aria-hidden="true"
      />
      <span className="font-body w-16 truncate text-center text-[11px] leading-tight text-[var(--ink-soft)]">
        {label}
      </span>
    </button>
  );
}

/**
 * Two-level mastery grid: one block per chapter (topic), each colored by the
 * chapter's own color and filled white→solid with average proficiency across
 * its concepts. Clicking a block drills into that chapter's sections, shown
 * the same way, with a way back up.
 */
export function TopicMasteryGrid({ states }: { states: ConceptState[] }) {
  const [selected, setSelected] = useState<string | null>(null);
  const now = Date.now();

  const byId = useMemo(
    () => new Map(states.map((s) => [s.conceptId, s])),
    [states],
  );

  const topicCells: TopicCell[] = useMemo(
    () =>
      chapters.map((chapter) => ({
        chapter,
        value: averageOf(chapter.concepts, byId, now),
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [byId],
  );

  const selectedChapter = topicCells.find((c) => c.chapter.domain === selected)
    ?.chapter;

  const sectionCells: SectionCell[] = useMemo(() => {
    if (!selectedChapter) return [];
    return selectedChapter.sections.map((section) => ({
      section,
      value: averageOf(section.concepts, byId, now),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChapter, byId]);

  if (selectedChapter) {
    return (
      <div>
        <button
          type="button"
          onClick={() => setSelected(null)}
          className="font-body mb-4 text-sm font-medium text-[var(--accent)] hover:underline"
        >
          ← All topics
        </button>
        <h3 className="font-display mb-4 text-base text-[var(--ink)]">
          {selectedChapter.label}
        </h3>
        <div className="flex flex-wrap gap-4">
          {sectionCells.map(({ section, value }) => (
            <MasteryBlock
              key={section.id}
              label={section.label}
              color={selectedChapter.color}
              value={value}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-4">
      {topicCells.map(({ chapter, value }) => (
        <MasteryBlock
          key={chapter.domain}
          label={chapter.label}
          color={chapter.color}
          value={value}
          onClick={() => setSelected(chapter.domain)}
        />
      ))}
    </div>
  );
}
