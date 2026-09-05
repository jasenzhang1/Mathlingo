import { useState } from "react";
import { useSpeechInput } from "../../lib/assessment/useSpeechInput";
import type { Item, ResponseChannel } from "../../lib/assessment/types";
import { DrawingPad } from "./DrawingPad";

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
        {(item.choices ?? []).map((choice) => {
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
              <span>{choice.text}</span>
            </label>
          );
        })}
      </fieldset>
    );
  }

  if (item.format === "numeric" || item.format === "symbolic") {
    return (
      <div>
        <input
          type="text"
          inputMode={item.format === "numeric" ? "decimal" : "text"}
          value={text}
          disabled={disabled}
          onChange={(e) => onTextChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !disabled) onSubmit();
          }}
          placeholder={item.format === "numeric" ? "e.g. 0.4545, 45%, or 5/11" : "Your expression"}
          className="font-body w-full rounded-xl border border-[var(--line)] bg-[var(--panel)] px-4 py-3 text-[var(--ink)] outline-none focus:border-[var(--accent)] disabled:opacity-70"
        />
        {item.format === "numeric" && (
          <p className="font-body mt-1.5 text-xs text-[var(--ink-soft)]">
            Decimals, percentages, and fractions are all accepted.
          </p>
        )}
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
