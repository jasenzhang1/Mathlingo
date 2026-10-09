import { useMemo, useState } from "react";
import { numericAnswerFormat } from "../../lib/assessment/answerFormat";
import { isVectorKey } from "../../lib/assessment/vectorAnswer";
import { useSpeechInput } from "../../lib/assessment/useSpeechInput";
import type { Choice, Item, ResponseChannel } from "../../lib/assessment/types";
import { CodeText } from "./CodeText";
import { DrawingPad } from "./DrawingPad";

/** "None of the above", "Both of these" and the like refer to the other choices, so they stay last. */
const REFERS_TO_OTHERS = /\b(all|none|both|neither) of (the above|these|them)\b/i;

/** Fisher–Yates over the choices, keeping any that refer to the others at the end in their authored order. */
function shuffleChoices(choices: Choice[]): Choice[] {
  const free = choices.filter((c) => !REFERS_TO_OTHERS.test(c.text));
  for (let i = free.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [free[i], free[j]] = [free[j], free[i]];
  }
  return [...free, ...choices.filter((c) => REFERS_TO_OTHERS.test(c.text))];
}

/**
 * Renders the input surface for whichever format the item declares. Kept
 * separate from the panel so adding a channel (canvas, microphone) is a change
 * in one place rather than a branch inside the review loop.
 */
export function AnswerInput({
  item,
  text,
  onTextChange,
  selected,
  onSelectedChange,
  onImageChange,
  onSpokenTextChange,
  disabled,
  onSubmit,
}: {
  item: Item;
  text: string;
  onTextChange: (value: string) => void;
  selected: string[];
  onSelectedChange: (value: string[]) => void;
  onImageChange: (dataUrl: string | null) => void;
  onSpokenTextChange: (value: string) => void;
  disabled: boolean;
  onSubmit: () => void;
}) {
  // Shuffled once per item served, so the right answer isn't always first.
  // Keyed on content rather than the object, so a re-render mid-question can't reshuffle.
  const choiceKey = `${item.id}|${(item.choices ?? []).map((c) => c.id).join(",")}`;
  const choices = useMemo(() => shuffleChoices(item.choices ?? []), [choiceKey]);

  if (item.format === "mcq" || item.format === "multi-select") {
    const multiple = item.format === "multi-select";

    function toggle(choiceId: string) {
      if (!multiple) {
        onSelectedChange([choiceId]);
        return;
      }
      onSelectedChange(
        selected.includes(choiceId)
          ? selected.filter((c) => c !== choiceId)
          : [...selected, choiceId],
      );
    }

    return (
      <fieldset disabled={disabled} className="space-y-2">
        <legend className="font-body sr-only">
          {multiple ? "Select all that apply" : "Select one"}
        </legend>
        {multiple && (
          <p className="font-body mb-2 text-xs font-medium uppercase tracking-wide text-[var(--ink-soft)]">
            Select all that apply
          </p>
        )}
        {choices.map((choice) => {
          const active = selected.includes(choice.id);
          return (
            <label
              key={choice.id}
              className={`font-body flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 text-sm transition-colors ${
                active
                  ? "border-[var(--accent)] bg-[var(--accent)]/5 text-[var(--ink)]"
                  : "border-[var(--line)] bg-[var(--panel)] text-[var(--ink)] hover:border-[var(--ink-soft)]"
              } ${disabled ? "cursor-default opacity-70" : ""}`}
            >
              <input
                type={multiple ? "checkbox" : "radio"}
                name={item.id}
                checked={active}
                onChange={() => toggle(choice.id)}
                className="mt-0.5 accent-[var(--accent)]"
              />
              <span>
                <CodeText text={choice.text} />
              </span>
            </label>
          );
        })}
      </fieldset>
    );
  }

  if (item.format === "numeric" || item.format === "symbolic") {
    const vector = isVectorKey(item.answerKey);
    // A plain number gets a fill-in-the-blank look: "k = [ 12 ]", with the
    // gray placeholder showing the format wanted (see answerFormat.ts).
    const format = item.format === "numeric" && !vector ? numericAnswerFormat(item) : undefined;
    return (
      <div>
        <div className="flex items-center gap-3">
          {format?.label && (
            <span className="font-body shrink-0 text-lg text-[var(--ink)]">
              <CodeText text={format.label} />
            </span>
          )}
          <input
            type="text"
            inputMode={format ? "decimal" : "text"}
            value={text}
            disabled={disabled}
            onChange={(e) => onTextChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !disabled) onSubmit();
            }}
            placeholder={format ? format.placeholder : vector ? "e.g. [3, -2, 1/2]" : "Your expression"}
            className={`font-body rounded-xl border border-[var(--line)] bg-[var(--panel)] px-4 py-3 text-[var(--ink)] outline-none placeholder:text-[var(--ink-soft)] placeholder:opacity-50 focus:border-[var(--accent)] disabled:opacity-70 ${
              format?.label ? "w-full max-w-xs" : "w-full"
            }`}
          />
        </div>
        {item.format === "numeric" && (
          <p className="font-body mt-1.5 text-xs text-[var(--ink-soft)]">
            {vector
              ? "Write the vector's entries in order, separated by commas. Decimals and fractions are fine."
              : format?.hint}
          </p>
        )}
      </div>
    );
  }

  if (item.format === "code") {
    return (
      <div>
        <textarea
          value={text}
          disabled={disabled}
          onChange={(e) => onTextChange(e.target.value)}
          rows={12}
          spellCheck={false}
          placeholder="Write your Python here"
          className="font-mono w-full resize-y rounded-xl border border-[var(--line)] bg-[var(--panel)] px-4 py-3 text-sm text-[var(--ink)] outline-none focus:border-[var(--accent)] disabled:opacity-70"
        />
        {(item.codeTests ?? []).some((t) => !t.hidden) && (
          <div className="font-body mt-2 space-y-1 text-xs text-[var(--ink-soft)]">
            <p className="font-medium uppercase tracking-wide">Checked against</p>
            <ul className="list-disc space-y-0.5 pl-4">
              {(item.codeTests ?? [])
                .filter((t) => !t.hidden)
                .map((t) => (
                  <li key={t.id}>
                    <CodeText text={t.description} />
                  </li>
                ))}
            </ul>
          </div>
        )}
        <p className="font-body mt-1.5 text-xs text-[var(--ink-soft)]">
          Your code is run against each check above — partial credit for each one it passes.
        </p>
      </div>
    );
  }

  // short-answer, derivation, interview — free response, in whichever channel
  // the item permits.
  return (
    <OpenResponseInput
      item={item}
      text={text}
      onTextChange={onTextChange}
      onImageChange={onImageChange}
      onSpokenTextChange={onSpokenTextChange}
      disabled={disabled}
    />
  );
}

/**
 * Channel picker plus the surface for the selected channel. Only channels the
 * item declares are offered — a proof is a poor thing to dictate, and the item
 * bank says so per item rather than the UI guessing.
 */
function OpenResponseInput({
  item,
  text,
  onTextChange,
  onImageChange,
  onSpokenTextChange,
  disabled,
}: {
  item: Item;
  text: string;
  onTextChange: (value: string) => void;
  onImageChange: (dataUrl: string | null) => void;
  onSpokenTextChange: (value: string) => void;
  disabled: boolean;
}) {
  const [channel, setChannel] = useState<ResponseChannel>("typed");
  const speech = useSpeechInput(onSpokenTextChange);

  const available = item.channels.filter(
    (c) => c !== "spoken" || speech.supported,
  );

  function selectChannel(next: ResponseChannel) {
    // Clear the other channels so a stale drawing can't be graded alongside
    // freshly typed text.
    setChannel(next);
    onImageChange(null);
    onSpokenTextChange("");
    if (next !== "typed") onTextChange("");
  }

  const labels: Record<ResponseChannel, string> = {
    typed: "Type",
    handwritten: "Write / draw",
    spoken: "Speak",
  };

  return (
    <div>
      {available.length > 1 && (
        <div className="mb-3 flex flex-wrap gap-1.5">
          {available.map((option) => (
            <button
              key={option}
              type="button"
              disabled={disabled}
              onClick={() => selectChannel(option)}
              className={`font-body rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                channel === option
                  ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]"
                  : "border-[var(--line)] text-[var(--ink-soft)] hover:text-[var(--ink)]"
              } disabled:opacity-50`}
            >
              {labels[option]}
            </button>
          ))}
        </div>
      )}

      {channel === "typed" && (
        <>
          <textarea
            value={text}
            disabled={disabled}
            onChange={(e) => onTextChange(e.target.value)}
            rows={8}
            placeholder="Explain your reasoning. Say why the method works, not just what the answer is."
            className="font-body w-full resize-y rounded-xl border border-[var(--line)] bg-[var(--panel)] px-4 py-3 text-[var(--ink)] outline-none focus:border-[var(--accent)] disabled:opacity-70"
          />
          <p className="font-body mt-1.5 text-xs text-[var(--ink-soft)]">
            Graded against a rubric — naming the mechanism scores higher than naming
            the result.
          </p>
        </>
      )}

      {channel === "handwritten" && (
        <DrawingPad onChange={onImageChange} disabled={disabled} />
      )}

      {channel === "spoken" && (
        <div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={disabled}
              onClick={speech.listening ? speech.stop : speech.start}
              className={`font-body rounded-full px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40 ${
                speech.listening ? "bg-[#c0392b]" : "bg-[var(--accent)]"
              }`}
            >
              {speech.listening ? "Stop recording" : "Start speaking"}
            </button>
            {speech.listening && (
              <span className="font-body text-sm text-[var(--ink-soft)]">
                Listening…
              </span>
            )}
          </div>

          {speech.error && (
            <p className="font-body mt-2 text-sm text-[#c0392b]">{speech.error}</p>
          )}

          <p className="font-body mt-2 text-xs text-[var(--ink-soft)]">
            Your speech is converted to text in your browser — no audio is uploaded.
            You'll see the transcript before it's graded.
          </p>
        </div>
      )}
    </div>
  );
}
