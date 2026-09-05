import { useCallback, useEffect, useRef, useState } from "react";

/**
 * The audio branch of normalization (`grading.md`), done in the browser.
 *
 * Speech becomes text via the Web Speech API rather than by uploading audio to a
 * transcription service. That is a deliberate trade: it costs nothing, adds no
 * second API dependency, and — the part that actually matters — no recording of
 * a learner's voice ever leaves their machine. Only the text does.
 *
 * The cost is support: this is Chrome and Edge (and Safari, prefixed). Firefox
 * does not implement it, so `supported` is false there and the UI must fall back
 * to typing rather than presenting a dead button.
 */

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}
interface SpeechRecognitionResult {
  isFinal: boolean;
  0: SpeechRecognitionAlternative;
  length: number;
}
interface SpeechRecognitionEventLike extends Event {
  resultIndex: number;
  results: { length: number; [index: number]: SpeechRecognitionResult };
}
interface SpeechRecognitionLike extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: Event & { error?: string }) => void) | null;
  onend: (() => void) | null;
}
type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

function getConstructor(): SpeechRecognitionConstructor | undefined {
  const w = window as unknown as {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition;
}

export function useSpeechInput(onTranscript: (text: string) => void) {
  const [listening, setListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recognition = useRef<SpeechRecognitionLike | null>(null);
  const supported = typeof window !== "undefined" && Boolean(getConstructor());

  /**
   * The callback is held in a ref so a re-rendering parent does not force
   * recognition to restart mid-sentence. Assigned in an effect rather than
   * during render — writing a ref while rendering is not safe under concurrent
   * rendering, where a render may be discarded.
   */
  const callback = useRef(onTranscript);
  useEffect(() => {
    callback.current = onTranscript;
  }, [onTranscript]);

  const stop = useCallback(() => {
    recognition.current?.stop();
    setListening(false);
  }, []);

  const start = useCallback(() => {
    const Constructor = getConstructor();
    if (!Constructor) {
      setError("This browser can't do speech input. Chrome or Edge can.");
      return;
    }

    setError(null);
    const instance = new Constructor();
    instance.continuous = true;
    instance.interimResults = true;
    instance.lang = "en-US";

    let finalText = "";

    instance.onresult = (event) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i]!;
        if (result.isFinal) finalText += result[0].transcript;
        else interim += result[0].transcript;
      }
      // Interim text is passed through so the learner sees words appear as they
      // speak; without it a long answer looks like nothing is happening.
      callback.current((finalText + interim).trim());
    };

    instance.onerror = (event) => {
      const code = event.error ?? "unknown";
      setError(
        code === "not-allowed"
          ? "Microphone access was blocked. Allow it in your browser's address bar."
          : code === "no-speech"
            ? "Didn't catch anything — try again."
            : `Speech input failed (${code}).`,
      );
      setListening(false);
    };

    instance.onend = () => setListening(false);

    recognition.current = instance;
    instance.start();
    setListening(true);
  }, []);

  useEffect(() => () => recognition.current?.stop(), []);

  return { supported, listening, error, start, stop };
}
