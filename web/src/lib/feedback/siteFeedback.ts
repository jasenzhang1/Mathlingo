import { supabase } from "../supabase";

/**
 * Feedback from the bubble in the bottom-right corner (migration 0018).
 *
 * A student's message alone ("this is broken") rarely says enough, so every
 * report also records where they were and what they saw when they opened the
 * bubble: the route, the text on screen, what they had typed and selected,
 * any open dialog, recent errors, and a screenshot of the viewport.
 * Developers read them at /dev/feedback.
 */

/** Marks the widget's own DOM, so it is left out of every snapshot. */
export const WIDGET_ATTR = "data-feedback-widget";

export interface SiteFeedbackContext {
  url: string;
  /** Pages visited before this one in the session, oldest first. */
  trail: string[];
  viewport: { width: number; height: number; dpr: number };
  scroll: { x: number; y: number; pageHeight: number };
  /** Headings on screen, and the page's main heading even when scrolled past it. */
  headings: string[];
  mainHeading: string | null;
  /** Text of any open dialog or modal. */
  dialogs: string[];
  /** Visible form fields: label and current value (passwords never). */
  fields: { label: string; value: string }[];
  selection: string;
  /** Uncaught errors and rejected promises earlier in the session, newest last. */
  errors: { message: string; at: string }[];
  colorScheme: "light" | "dark";
  userAgent: string;
  language: string;
  timeZone: string;
  capturedAt: string;
}

export interface Snapshot {
  path: string;
  pageTitle: string;
  visibleText: string;
  context: SiteFeedbackContext;
}

// ---------------------------------------------------------------------------
// Recent errors, collected from page load so a report can include them
// ---------------------------------------------------------------------------

const recentErrors: { message: string; at: string }[] = [];

function remember(message: string) {
  recentErrors.push({ message: message.slice(0, 500), at: new Date().toISOString() });
  if (recentErrors.length > 10) recentErrors.shift();
}

if (typeof window !== "undefined") {
  window.addEventListener("error", (e) => remember(e.message || String(e.error)));
  window.addEventListener("unhandledrejection", (e) => {
    const r = e.reason as unknown;
    remember(r instanceof Error ? r.message : String(r));
  });
}

// ---------------------------------------------------------------------------
// What's on screen
// ---------------------------------------------------------------------------

const MAX_TEXT = 20000;

const inWidget = (el: Element | null) => Boolean(el?.closest(`[${WIDGET_ATTR}]`));

function onScreen(rect: DOMRect): boolean {
  return rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.right > 0 && rect.top < window.innerHeight && rect.left < window.innerWidth;
}

/**
 * Whether something on screen is actually in view and not underneath
 * something else, like a row scrolled under the sticky header. Checks the
 * topmost element at the middle of `rect`.
 */
function uncovered(rect: DOMRect, el: Element): boolean {
  const x = Math.min(Math.max(rect.left + rect.width / 2, 0), window.innerWidth - 1);
  const y = Math.min(Math.max(rect.top + rect.height / 2, 0), window.innerHeight - 1);
  const hit = document.elementFromPoint(x, y);
  // Nothing there, or only the bubble itself: count it as seen.
  if (!hit || inWidget(hit)) return true;
  return el.contains(hit) || hit.contains(el);
}

function isShown(el: Element): boolean {
  const style = getComputedStyle(el);
  return style.visibility !== "hidden" && style.display !== "none" && Number(style.opacity) > 0.05;
}

/**
 * The text in the viewport, in document order, one line per block. Rendered
 * maths is written back as its TeX (`$\frac{1}{2}$`), not KaTeX's glyph soup.
 */
export function visibleText(root: Element = document.body): string {
  const lines: string[] = [];
  let line = "";
  let lastBlock: Element | null = null;
  let lastParent: Element | null = null;
  const seenKatex = new Set<Element>();

  const flush = () => {
    const t = line.replace(/\s+/g, " ").trim();
    if (t) lines.push(t);
    line = "";
  };

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const parent = node.parentElement;
    if (!parent || inWidget(parent)) continue;
    if (parent.closest("script, style, noscript, template")) continue;

    const katex = parent.closest(".katex");
    if (katex) {
      if (seenKatex.has(katex)) continue;
      seenKatex.add(katex);
      const rect = katex.getBoundingClientRect();
      if (!onScreen(rect) || !isShown(katex) || !uncovered(rect, katex)) continue;
      const tex = katex.querySelector('annotation[encoding="application/x-tex"]')?.textContent;
      line += ` $${tex ?? katex.textContent ?? ""}$ `;
      continue;
    }

    const text = node.textContent ?? "";
    if (!text.trim()) continue;
    const range = document.createRange();
    range.selectNodeContents(node);
    // The first line box: a clamped or wrapped run's bounding box can reach past what is drawn.
    const rect = range.getClientRects()[0] ?? range.getBoundingClientRect();
    if (!onScreen(rect) || !isShown(parent) || !uncovered(rect, parent)) continue;

    // A new block-level ancestor starts a new line.
    const block = parent.closest("p, li, h1, h2, h3, h4, h5, h6, td, th, button, a, label, div, section, pre, summary, option");
    if (block !== lastBlock) {
      flush();
      lastBlock = block;
    }
    // Separate pieces from different elements ("81.6%" + "solve rate"); runs collapse later.
    line += parent === lastParent ? text : ` ${text}`;
    lastParent = parent;
  }
  flush();

  // Drop immediate repeats (a sticky header read twice, say), then cap.
  const out = lines.filter((l, i) => l !== lines[i - 1]).join("\n");
  return out.length > MAX_TEXT ? `${out.slice(0, MAX_TEXT)}\n…(cut)` : out;
}

function textOf(el: Element, max = 400): string {
  return (el.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, max);
}

function fieldLabel(el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement): string {
  const byFor = el.id ? document.querySelector(`label[for="${CSS.escape(el.id)}"]`) : null;
  const wrapping = el.closest("label");
  return (
    el.getAttribute("aria-label") ||
    (byFor && textOf(byFor, 120)) ||
    (wrapping && textOf(wrapping, 120)) ||
    el.getAttribute("placeholder") ||
    el.name ||
    el.tagName.toLowerCase()
  );
}

function visibleFields(): { label: string; value: string }[] {
  const out: { label: string; value: string }[] = [];
  for (const el of document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>("input, textarea, select")) {
    if (inWidget(el) || !onScreen(el.getBoundingClientRect()) || !isShown(el)) continue;
    if (el instanceof HTMLInputElement) {
      if (["password", "hidden", "file", "submit", "button"].includes(el.type)) continue;
      if (el.autocomplete?.includes("cc-")) continue;
      if (el.type === "checkbox" || el.type === "radio") {
        if (el.checked) out.push({ label: fieldLabel(el), value: "checked" });
        continue;
      }
    }
    const value =
      el instanceof HTMLSelectElement ? (el.selectedOptions[0]?.textContent ?? el.value) : el.value;
    if (value.trim()) out.push({ label: fieldLabel(el), value: value.slice(0, 2000) });
  }
  return out.slice(0, 30);
}

/** Everything about the moment, minus the screenshot. Call before the feedback panel opens. */
export function captureSnapshot(trail: string[]): Snapshot {
  const path = `${location.pathname}${location.search}${location.hash}`;
  const headings = [...document.querySelectorAll("h1, h2, h3")]
    .filter((h) => !inWidget(h) && onScreen(h.getBoundingClientRect()) && isShown(h))
    .map((h) => textOf(h, 200))
    .filter(Boolean)
    .slice(0, 15);
  const h1 = [...document.querySelectorAll("h1")].find((h) => !inWidget(h));
  const dialogs = [...document.querySelectorAll('[role="dialog"], [aria-modal="true"], dialog[open]')]
    .filter((d) => !inWidget(d) && isShown(d))
    .map((d) => textOf(d, 2000));
  const selection = window.getSelection()?.toString().trim().slice(0, 2000) ?? "";

  return {
    path,
    pageTitle: document.title,
    visibleText: visibleText(),
    context: {
      url: location.href,
      trail: trail.filter((p) => p !== path).slice(-5),
      viewport: { width: window.innerWidth, height: window.innerHeight, dpr: window.devicePixelRatio },
      scroll: { x: Math.round(window.scrollX), y: Math.round(window.scrollY), pageHeight: document.documentElement.scrollHeight },
      headings,
      mainHeading: h1 ? textOf(h1, 200) : null,
      dialogs,
      fields: visibleFields(),
      selection,
      errors: [...recentErrors],
      colorScheme: window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
      userAgent: navigator.userAgent,
      language: navigator.language,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      capturedAt: new Date().toISOString(),
    },
  };
}

/**
 * A JPEG of the viewport as it looks now, leaving out the feedback widget.
 * Best effort: null if rendering fails or takes too long. The library is
 * loaded on first use, so it costs nothing until someone opens the bubble.
 */
export async function captureScreenshot(): Promise<Blob | null> {
  try {
    const { domToBlob } = await import("modern-screenshot");
    const work = domToBlob(document.documentElement, {
      type: "image/jpeg",
      quality: 0.75,
      width: window.innerWidth,
      height: window.innerHeight,
      scale: Math.min(window.devicePixelRatio || 1, 1.5),
      backgroundColor: getComputedStyle(document.body).backgroundColor,
      // Shift the page so the part in view lands in the frame.
      style: { transform: `translate(${-window.scrollX}px, ${-window.scrollY}px)` },
      filter: (node) => !(node instanceof Element && node.hasAttribute(WIDGET_ATTR)),
      timeout: 4000,
    });
    const timeout = new Promise<null>((resolve) => setTimeout(() => resolve(null), 10000));
    return await Promise.race([work, timeout]);
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Sending and reading
// ---------------------------------------------------------------------------

function explain(message: string): string {
  return /schema cache|does not exist|bucket not found/i.test(message)
    ? "Feedback can't be saved yet: run supabase/migrations/0018_site_feedback.sql."
    : /fetch|network/i.test(message)
      ? "Couldn't reach the server. Check your connection and try again."
      : message;
}

export async function sendSiteFeedback(input: {
  userId: string;
  message: string;
  snapshot: Snapshot;
  screenshot: Blob | null;
}): Promise<{ error: string | null }> {
  let screenshotPath: string | null = null;
  if (input.screenshot) {
    const path = `${input.userId}/${crypto.randomUUID()}.jpg`;
    const { error } = await supabase.storage
      .from("feedback-screenshots")
      .upload(path, input.screenshot, { contentType: "image/jpeg" });
    // A failed upload shouldn't lose the message: send it without the picture.
    if (!error) screenshotPath = path;
  }
  const { snapshot } = input;
  const { error } = await supabase.from("site_feedback").insert({
    message: input.message.slice(0, 4000),
    path: snapshot.path.slice(0, 2000),
    page_title: snapshot.pageTitle.slice(0, 500),
    visible_text: snapshot.visibleText.slice(0, MAX_TEXT),
    context: snapshot.context,
    screenshot_path: screenshotPath,
  });
  return { error: error ? explain(error.message) : null };
}

export interface SiteFeedbackRow {
  id: string;
  user_id: string;
  message: string;
  path: string;
  page_title: string | null;
  visible_text: string | null;
  context: Partial<SiteFeedbackContext>;
  screenshot_path: string | null;
  status: "open" | "resolved";
  created_at: string;
  /** Joined from profiles. */
  profiles?: { username: string | null; display_name: string | null } | null;
}

/** Developers only (RLS): newest first. */
export async function loadSiteFeedback(status: "open" | "resolved"): Promise<{ rows: SiteFeedbackRow[]; error: string | null }> {
  const { data, error } = await supabase
    .from("site_feedback")
    .select("*, profiles(username, display_name)")
    .eq("status", status)
    .order("created_at", { ascending: false })
    .limit(300);
  return { rows: (data as SiteFeedbackRow[]) ?? [], error: error ? explain(error.message) : null };
}

export async function setSiteFeedbackStatus(id: string, status: "open" | "resolved"): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from("site_feedback")
    .update({ status, resolved_at: status === "resolved" ? new Date().toISOString() : null })
    .eq("id", id);
  return { error: error ? explain(error.message) : null };
}

/** A short-lived link to a private screenshot. */
export async function screenshotUrl(path: string): Promise<string | null> {
  const { data } = await supabase.storage.from("feedback-screenshots").createSignedUrl(path, 60 * 60);
  return data?.signedUrl ?? null;
}
