import { useEffect, useRef, useState } from "react";

/**
 * Handwriting input for the image branch of normalization (`grading.md`).
 *
 * Works with mouse, trackpad, stylus, and touch via pointer events, which is the
 * one API that covers all four without separate handlers. The canvas is exported
 * as a PNG data URL for the transcription function.
 *
 * The white background is not cosmetic: a transparent PNG renders as black-on-
 * black for a vision model, which reads as an empty page.
 */

const STROKE = "#111827";
const LINE_WIDTH = 2.5;

export function DrawingPad({
  onChange,
  disabled,
}: {
  onChange: (dataUrl: string | null) => void;
  disabled: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [hasInk, setHasInk] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Back the canvas at device resolution so strokes are not blurry on a
    // high-DPI screen, which matters a great deal for OCR accuracy.
    const ratio = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;

    const context = canvas.getContext("2d");
    if (!context) return;
    context.scale(ratio, ratio);
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, rect.width, rect.height);
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = STROKE;
    context.lineWidth = LINE_WIDTH;
  }, []);

  function positionOf(event: React.PointerEvent<HTMLCanvasElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }

  function begin(event: React.PointerEvent<HTMLCanvasElement>) {
    if (disabled) return;
    const context = canvasRef.current?.getContext("2d");
    if (!context) return;
    // Capture so a stroke that leaves the canvas still ends cleanly.
    event.currentTarget.setPointerCapture(event.pointerId);
    drawing.current = true;
    const { x, y } = positionOf(event);
    context.beginPath();
    context.moveTo(x, y);
  }

  function extend(event: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current || disabled) return;
    const context = canvasRef.current?.getContext("2d");
    if (!context) return;
    const { x, y } = positionOf(event);
    context.lineTo(x, y);
    context.stroke();
    if (!hasInk) setHasInk(true);
  }

  function end() {
    if (!drawing.current) return;
    drawing.current = false;
    const canvas = canvasRef.current;
    if (canvas) onChange(canvas.toDataURL("image/png"));
  }

  function clear() {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const rect = canvas.getBoundingClientRect();
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, rect.width, rect.height);
    setHasInk(false);
    onChange(null);
  }

  function upload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      onChange(typeof reader.result === "string" ? reader.result : null);
      setHasInk(true);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div>
      <canvas
        ref={canvasRef}
        onPointerDown={begin}
        onPointerMove={extend}
        onPointerUp={end}
        onPointerLeave={end}
        className="h-64 w-full touch-none rounded-xl border border-[var(--line)] bg-white"
        style={{ cursor: disabled ? "default" : "crosshair" }}
      />
      <div className="mt-2 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={clear}
          disabled={disabled || !hasInk}
          className="font-body rounded-full border border-[var(--line)] px-3 py-1.5 text-xs font-medium text-[var(--ink)] hover:border-[var(--accent)] disabled:opacity-40"
        >
          Clear
        </button>
        <label className="font-body cursor-pointer text-xs font-medium text-[var(--accent)] hover:underline">
          Or upload a photo
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={upload}
            disabled={disabled}
            className="hidden"
          />
        </label>
        <span className="font-body text-xs text-[var(--ink-soft)]">
          Your work is read into text, then graded — you'll see the transcript.
        </span>
      </div>
    </div>
  );
}
