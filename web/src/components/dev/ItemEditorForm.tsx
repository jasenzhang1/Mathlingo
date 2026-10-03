import { useMemo, useState } from "react";
import { InfoTip } from "./InfoTip";
import type { Concept } from "../../data/concepts";
import type {
  CognitiveLevel,
  Item,
  ItemFormat,
  ItemStatus,
  ResponseChannel,
  Rubric,
} from "../../lib/assessment/types";
import { RubricEditor } from "./RubricEditor";
import {
  DIFFICULTY_LEVEL_STEP,
  MAX_DIFFICULTY_LEVEL,
  MIN_DIFFICULTY_LEVEL,
  formatDifficultyLevel,
  levelToDifficulty,
} from "../../lib/assessment/difficultyLevel";

const FORMATS: ItemFormat[] = [
  "numeric",
  "symbolic",
  "mcq",
  "multi-select",
  "short-answer",
  "derivation",
  "interview",
  "code",
];

const COGNITIVE_LEVELS: CognitiveLevel[] = ["recall", "apply", "explain", "transfer"];
const STATUSES: ItemStatus[] = ["draft", "shadow", "live", "quarantined", "retired"];
const CHANNELS: ResponseChannel[] = ["typed", "handwritten", "spoken"];

/** Fields not surfaced as dedicated inputs — edited together as raw JSON. */
type AdvancedFields = Pick<
  Item,
  | "params"
  | "solver"
  | "choices"
  | "codeTests"
  | "starterCode"
  | "codePackages"
  | "referenceSolution"
  | "source"
  | "stats"
>;

const ADVANCED_KEYS: (keyof AdvancedFields)[] = [
  "params",
  "solver",
  "choices",
  "codeTests",
  "starterCode",
  "codePackages",
  "referenceSolution",
  "source",
  "stats",
];

function splitAdvanced(item: Partial<Item>): AdvancedFields {
  const advanced: Partial<AdvancedFields> = {};
  for (const key of ADVANCED_KEYS) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (advanced as any)[key] = (item as any)[key];
  }
  return advanced as AdvancedFields;
}

const BLANK_ITEM: Item = {
  id: "",
  conceptId: "",
  format: "short-answer",
  cognitive: "recall",
  channels: ["typed"],
  stem: "",
  difficulty: 0,
  discrimination: 1.2,
  expectedSeconds: 60,
  prereqClosure: [],
  source: { id: "dev-authored", tier: "generated", title: "Authored in the developer view" },
  status: "draft",
};

export function ItemEditorForm({
  item,
  concepts,
  defaultConceptId,
  existingIds,
  onSave,
  onCancel,
}: {
  /** null means "creating a new item". */
  item: Item | null;
  concepts: Concept[];
  defaultConceptId?: string;
  existingIds: Set<string>;
  onSave: (item: Item) => void;
  onCancel: () => void;
}) {
  const isNew = item === null;
  const base = item ?? { ...BLANK_ITEM, conceptId: defaultConceptId ?? "" };

  const [id, setId] = useState(base.id);
  const [conceptId, setConceptId] = useState(base.conceptId);
  const [format, setFormat] = useState<ItemFormat>(base.format);
  const [cognitive, setCognitive] = useState<CognitiveLevel>(base.cognitive);
  const [status, setStatus] = useState<ItemStatus>(base.status);
  const [channels, setChannels] = useState<ResponseChannel[]>(base.channels);
  const [stem, setStem] = useState(base.stem);
  const [difficulty, setDifficulty] = useState(formatDifficultyLevel(base.difficulty));
  const [discrimination, setDiscrimination] = useState(String(base.discrimination));
  const [expectedSeconds, setExpectedSeconds] = useState(String(base.expectedSeconds));
  const [prereqClosure, setPrereqClosure] = useState(base.prereqClosure.join(", "));
  const [answerKey, setAnswerKey] = useState(
    base.answerKey === undefined ? "" : String(base.answerKey),
  );
  const [tolerance, setTolerance] = useState(
    base.tolerance === undefined ? "" : String(base.tolerance),
  );

  const [rubric, setRubric] = useState<Rubric>(base.rubric ?? { elements: [] });

  const initialAdvanced = useMemo(
    () => JSON.stringify(splitAdvanced(base), null, 2),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const [advancedJson, setAdvancedJson] = useState(initialAdvanced);
  const [advancedError, setAdvancedError] = useState<string | null>(null);
  const [idError, setIdError] = useState<string | null>(null);

  const conceptsByDomain = useMemo(() => {
    const map = new Map<string, Concept[]>();
    for (const c of concepts) {
      const bucket = map.get(c.domain);
      if (bucket) bucket.push(c);
      else map.set(c.domain, [c]);
    }
    return map;
  }, [concepts]);

  function toggleChannel(ch: ResponseChannel) {
    setChannels((cur) =>
      cur.includes(ch) ? cur.filter((c) => c !== ch) : [...cur, ch],
    );
  }

  function handleSave() {
    const trimmedId = id.trim();
    if (!trimmedId) {
      setIdError("An id is required.");
      return;
    }
    if (isNew && existingIds.has(trimmedId)) {
      setIdError("An item with this id already exists.");
      return;
    }
    if (!conceptId.trim()) {
      setIdError(null);
      setAdvancedError("Pick a concept.");
      return;
    }

    let advanced: AdvancedFields;
    try {
      advanced = JSON.parse(advancedJson || "{}");
      setAdvancedError(null);
    } catch (err) {
      setAdvancedError(err instanceof Error ? err.message : "Invalid JSON.");
      return;
    }

    const parsedAnswerKey =
      answerKey.trim() === ""
        ? undefined
        : Number.isNaN(Number(answerKey))
          ? answerKey
          : Number(answerKey);

    // Blank rows are dropped; a rubric with nothing left in it is no rubric.
    const elements = rubric.elements.filter((e) => e.description.trim());
    const forbiddenMoves = (rubric.forbiddenMoves ?? []).filter((e) => e.description.trim());
    const graderNotes = rubric.graderNotes?.trim() || undefined;
    const cleanRubric: Rubric | undefined =
      elements.length || forbiddenMoves.length || graderNotes
        ? {
            elements,
            ...(forbiddenMoves.length ? { forbiddenMoves } : {}),
            ...(graderNotes ? { graderNotes } : {}),
          }
        : undefined;

    const next: Item = {
      ...advanced,
      rubric: cleanRubric,
      id: trimmedId,
      conceptId: conceptId.trim(),
      format,
      cognitive,
      channels,
      stem,
      // Only convert when the level was changed, so saving an untouched item
      // doesn't round its calibrated logit to the level's 0.1 grid.
      difficulty:
        difficulty === formatDifficultyLevel(base.difficulty) ||
        difficulty.trim() === "" ||
        !Number.isFinite(Number(difficulty))
          ? base.difficulty
          : levelToDifficulty(Number(difficulty)),
      discrimination: Number(discrimination) || 0,
      expectedSeconds: Number(expectedSeconds) || 0,
      prereqClosure: prereqClosure
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      answerKey: parsedAnswerKey,
      tolerance: tolerance.trim() === "" ? undefined : Number(tolerance),
      status,
      source: advanced.source ?? BLANK_ITEM.source,
    };
    setIdError(null);
    onSave(next);
  }

  const inputClass =
    "w-full rounded-lg border border-[var(--line)] bg-[var(--paper)] px-3 py-2 text-sm text-[var(--ink)] focus:border-[var(--accent)] focus:outline-none";
  const labelClass = "font-body block text-xs font-medium uppercase tracking-wide text-[var(--ink-soft)]";

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>
            Id
            <InfoTip>The question's permanent identifier, conventionally <code>concept--short-slug</code>. It can't change after creation: answer logs, calibration and feedback all key on it.</InfoTip>
          </label>
          <input
            className={inputClass}
            value={id}
            disabled={!isNew}
            onChange={(e) => setId(e.target.value)}
            placeholder="concept-id--cognitive-short-slug"
          />
          {idError && <p className="mt-1 text-xs text-red-600">{idError}</p>}
        </div>
        <div>
          <label className={labelClass}>
            Concept (topic)
            <InfoTip>The lesson this question assesses. Its answers move this lesson's proficiency bar, and a wrong answer can pass blame to this lesson's prerequisites.</InfoTip>
          </label>
          <select
            className={inputClass}
            value={conceptId}
            onChange={(e) => setConceptId(e.target.value)}
          >
            <option value="">Select a concept…</option>
            {[...conceptsByDomain.entries()].map(([domain, list]) => (
              <optgroup key={domain} label={domain}>
                {list.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>
            Stem (question wording)
            <InfoTip>The question text the learner sees. Wrap maths in <code>$…$</code> (LaTeX) and code in backticks. In a template, <code>{'{name}'}</code> is replaced by a drawn parameter — put a space before it after a <code>{'}'}</code> or a letter, or it's read as LaTeX.</InfoTip>
          </label>
        <textarea
          className={`${inputClass} min-h-[100px]`}
          value={stem}
          onChange={(e) => setStem(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div>
          <label className={labelClass}>
            Format
            <InfoTip>How the learner answers and how it's graded. <b>numeric</b>: a number (or a vector like (3, -2)), checked against the key within the tolerance. <b>symbolic</b>: an expression, graded by the AI grader. <b>mcq</b>: pick one choice. <b>multi-select</b>: pick all correct choices; partial credit. <b>short-answer</b> / <b>derivation</b>: written answers graded by the AI against the rubric. <b>interview</b>: open, interview-style; AI-graded. <b>code</b>: Python run against the code tests.</InfoTip>
          </label>
          <select
            className={inputClass}
            value={format}
            onChange={(e) => setFormat(e.target.value as ItemFormat)}
          >
            {FORMATS.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>
            Cognitive level
            <InfoTip>What kind of thinking the question asks for. <b>recall</b>: state a definition or fact. <b>apply</b>: use a method to compute something. <b>explain</b>: say why a method works. <b>transfer</b>: use the idea in an unfamiliar setting or combine it with earlier concepts. Sessions favour levels not yet covered, so a review isn't all one kind.</InfoTip>
          </label>
          <select
            className={inputClass}
            value={cognitive}
            onChange={(e) => setCognitive(e.target.value as CognitiveLevel)}
          >
            {COGNITIVE_LEVELS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>
            Status
            <InfoTip>Whether learners see it. <b>draft</b>: never served. <b>shadow</b>: served occasionally to gather calibration data, but doesn't move the learner's bar. <b>live</b>: served and scored. <b>quarantined</b>: pulled automatically (e.g. disputed or non-discriminating). <b>retired</b>: deleted from rotation.</InfoTip>
          </label>
          <select
            className={inputClass}
            value={status}
            onChange={(e) => setStatus(e.target.value as ItemStatus)}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>
            Channels
            <InfoTip>How the learner may answer: <b>typed</b>, <b>handwritten</b> (photo or drawing, transcribed before grading) or <b>spoken</b> (dictated).</InfoTip>
          </label>
          <div className="flex h-[38px] items-center gap-3 text-sm text-[var(--ink)]">
            {CHANNELS.map((ch) => (
              <label key={ch} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={channels.includes(ch)}
                  onChange={() => toggleChannel(ch)}
                />
                {ch}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div>
          <label className={labelClass}>
            Difficulty (1–10)
            <InfoTip>Authored starting difficulty: 1 = recall a definition, 4–5 = a standard multi-step calculation, 8–9 = a derivation or unfamiliar setting, 10 = genuinely hard. Learners' answers then push the live difficulty up or down from here.</InfoTip>
          </label>
          <input
            type="number"
            min={MIN_DIFFICULTY_LEVEL}
            max={MAX_DIFFICULTY_LEVEL}
            step={DIFFICULTY_LEVEL_STEP}
            className={inputClass}
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass}>
            Discrimination
            <InfoTip>How sharply the question separates learners just above its difficulty from those just below (the IRT slope). 1.2 is the default; higher means each answer says more about the learner, lower suits noisy or guessable questions.</InfoTip>
          </label>
          <input
            type="number"
            step="0.1"
            className={inputClass}
            value={discrimination}
            onChange={(e) => setDiscrimination(e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass}>
            Expected seconds
            <InfoTip>How long a fluent learner should take. Answering much slower than this marks a review as <i>hard</i> (known, not yet fluent), which shortens the next review interval. It never lowers the score itself.</InfoTip>
          </label>
          <input
            type="number"
            className={inputClass}
            value={expectedSeconds}
            onChange={(e) => setExpectedSeconds(e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass}>
            Tolerance
            <InfoTip>Numeric items only: relative tolerance, which also acts as an absolute floor. 0.001 accepts about three significant figures; for an answer asked to 2 decimal places use at least 0.005.</InfoTip>
          </label>
          <input
            type="number"
            step="0.001"
            className={inputClass}
            value={tolerance}
            onChange={(e) => setTolerance(e.target.value)}
            placeholder="numeric items only"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>
            Answer key (numeric / symbolic)
            <InfoTip>The correct answer for a fixed numeric or symbolic item: a number, or a vector written as (3, -2). Leave it empty for templates (the solver computes it) and for choice or written formats.</InfoTip>
          </label>
          <input
            className={inputClass}
            value={answerKey}
            onChange={(e) => setAnswerKey(e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass}>
            Prerequisite closure (comma-separated concept ids)
            <InfoTip>Every lesson the question actually relies on: this concept plus the prerequisites it uses. A question may only draw on these, so it never secretly tests something the learner hasn't reached.</InfoTip>
          </label>
          <input
            className={inputClass}
            value={prereqClosure}
            onChange={(e) => setPrereqClosure(e.target.value)}
          />
        </div>
      </div>

      <details
        className="rounded-lg border border-[var(--line)]"
        open={["short-answer", "derivation", "interview"].includes(format)}
      >
        <summary className="cursor-pointer select-none px-3 py-2 text-sm font-medium text-[var(--ink)]">
          Rubric — grading criteria and weights
          <InfoTip>What the AI grader checks in a written answer. Each criterion is scored 0–100 and the score is their weighted average. Choice and numeric formats build their own rubric from the answer key, so this matters mainly for short-answer, derivation and interview questions.</InfoTip>
        </summary>
        <div className="p-3 pt-0">
          <RubricEditor rubric={rubric} onChange={setRubric} />
        </div>
      </details>

      <details className="rounded-lg border border-[var(--line)]">
        <summary className="cursor-pointer select-none px-3 py-2 text-sm font-medium text-[var(--ink)]">
          Advanced (choices, codeTests, params, source, stats — raw JSON)
          <InfoTip><b>choices</b>: options for mcq/multi-select, each with a misconception for wrong ones. <b>codeTests</b>: checks a code answer must pass. <b>params</b> + <b>solver</b>: make a template with fresh values each time. <b>source</b>: where the question came from. <b>stats</b>: response statistics.</InfoTip>
        </summary>
        <div className="p-3 pt-0">
          <textarea
            className={`${inputClass} min-h-[220px] font-mono text-xs`}
            value={advancedJson}
            onChange={(e) => setAdvancedJson(e.target.value)}
            spellCheck={false}
          />
          {advancedError && <p className="mt-1 text-xs text-red-600">{advancedError}</p>}
        </div>
      </details>

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="font-body rounded-lg border border-[var(--line)] px-4 py-2 text-sm text-[var(--ink)] hover:bg-[var(--paper)]"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="font-body rounded-lg px-4 py-2 text-sm font-medium text-[var(--accent-ink)]"
          style={{ background: "var(--accent)" }}
        >
          {isNew ? "Add question" : "Save changes"}
        </button>
      </div>
    </div>
  );
}
