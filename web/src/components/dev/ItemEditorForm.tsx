import { useMemo, useState } from "react";
import type { Concept } from "../../data/concepts";
import type {
  CognitiveLevel,
  Item,
  ItemFormat,
  ItemStatus,
  ResponseChannel,
} from "../../lib/assessment/types";

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
  | "rubric"
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
  "rubric",
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
  const [difficulty, setDifficulty] = useState(String(base.difficulty));
  const [discrimination, setDiscrimination] = useState(String(base.discrimination));
  const [expectedSeconds, setExpectedSeconds] = useState(String(base.expectedSeconds));
  const [prereqClosure, setPrereqClosure] = useState(base.prereqClosure.join(", "));
  const [answerKey, setAnswerKey] = useState(
    base.answerKey === undefined ? "" : String(base.answerKey),
  );
  const [tolerance, setTolerance] = useState(
    base.tolerance === undefined ? "" : String(base.tolerance),
  );

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

    const next: Item = {
      ...advanced,
      id: trimmedId,
      conceptId: conceptId.trim(),
      format,
      cognitive,
      channels,
      stem,
      difficulty: Number(difficulty) || 0,
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
          <label className={labelClass}>Id</label>
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
          <label className={labelClass}>Concept (topic)</label>
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
        <label className={labelClass}>Stem (question wording)</label>
        <textarea
          className={`${inputClass} min-h-[100px]`}
          value={stem}
          onChange={(e) => setStem(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div>
          <label className={labelClass}>Format</label>
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
          <label className={labelClass}>Cognitive level</label>
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
          <label className={labelClass}>Status</label>
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
          <label className={labelClass}>Channels</label>
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
          <label className={labelClass}>Difficulty (IRT logit)</label>
          <input
            type="number"
            step="0.1"
            className={inputClass}
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass}>Discrimination</label>
          <input
            type="number"
            step="0.1"
            className={inputClass}
            value={discrimination}
            onChange={(e) => setDiscrimination(e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass}>Expected seconds</label>
          <input
            type="number"
            className={inputClass}
            value={expectedSeconds}
            onChange={(e) => setExpectedSeconds(e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass}>Tolerance</label>
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
          <label className={labelClass}>Answer key (numeric / symbolic)</label>
          <input
            className={inputClass}
            value={answerKey}
            onChange={(e) => setAnswerKey(e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass}>Prerequisite closure (comma-separated concept ids)</label>
          <input
            className={inputClass}
            value={prereqClosure}
            onChange={(e) => setPrereqClosure(e.target.value)}
          />
        </div>
      </div>

      <details className="rounded-lg border border-[var(--line)]">
        <summary className="cursor-pointer select-none px-3 py-2 text-sm font-medium text-[var(--ink)]">
          Advanced (choices, rubric, codeTests, params, source, stats — raw JSON)
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
