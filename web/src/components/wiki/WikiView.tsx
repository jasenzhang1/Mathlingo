import { useEffect, useState } from "react";
import { loadArticle } from "../../data/wiki";
import type { WikiArticle, WikiBlock } from "../../data/wiki/types";
import { BlockMath, RichText } from "./Math";

export function WikiView({ conceptId }: { conceptId: string }) {
  /**
   * Articles are fetched per domain (see data/wiki/index.ts), so this is a
   * network round trip on the first lesson opened in a given domain.
   *
   * The concept id is stored *alongside* the article rather than tracking a
   * separate `loading` flag. That makes "loaded, but for a different concept"
   * indistinguishable from "not loaded" — which is what we want when the user
   * navigates mid-fetch — and it avoids setting state synchronously in the
   * effect just to reset the flag.
   */
  const [loaded, setLoaded] = useState<{
    conceptId: string;
    article: WikiArticle | undefined;
  } | null>(null);

  useEffect(() => {
    let cancelled = false;
    void loadArticle(conceptId).then((found) => {
      if (!cancelled) setLoaded({ conceptId, article: found });
    });
    return () => {
      cancelled = true;
    };
  }, [conceptId]);

  const article = loaded?.conceptId === conceptId ? loaded.article : undefined;

  if (loaded?.conceptId !== conceptId) {
    return (
      <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] px-6 py-7">
        <div className="h-3 w-2/3 rounded bg-[var(--line)]" />
        <div className="mt-3 h-3 w-1/2 rounded bg-[var(--line)]" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="rounded-2xl border border-dashed border-[var(--line)] bg-[var(--panel)] px-6 py-16 text-center">
        <p className="font-body text-[var(--ink-soft)]">Wiki article coming soon.</p>
      </div>
    );
  }

  return (
    <article className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] px-6 py-7 md:px-8">
      <p className="font-body text-[15px] leading-relaxed text-[var(--ink)]">
        <RichText text={article.summary} />
      </p>

      {article.sections.map((section) => (
        <section key={section.heading} className="mt-9">
          <h2 className="font-display border-b border-[var(--line)] pb-2 text-xl text-[var(--ink)]">
            {section.heading}
          </h2>
          <div className="mt-4 flex flex-col gap-4">
            {section.blocks.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>
        </section>
      ))}

      <section className="mt-10 border-t border-[var(--line)] pt-5">
        <h2 className="font-body text-xs font-semibold uppercase tracking-wide text-[var(--ink-soft)]">
          References
        </h2>
        <ul className="font-body mt-2 flex flex-col gap-1">
          {article.references.map((ref) => (
            <li key={`${ref.source}${ref.locator}`} className="text-sm text-[var(--ink-soft)]">
              <span className="text-[var(--ink)]">{ref.source}</span> — {ref.locator}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}

function Block({ block }: { block: WikiBlock }) {
  switch (block.kind) {
    case "prose":
      return (
        <p className="font-body text-[15px] leading-relaxed text-[var(--ink)]">
          <RichText text={block.text} />
        </p>
      );

    case "formula":
      return (
        <figure className="my-1 rounded-xl border border-[var(--line)] bg-[var(--paper)] px-5 py-4 text-center">
          <BlockMath latex={block.latex} />
          {block.caption && (
            <figcaption className="font-body mt-2 text-xs text-[var(--ink-soft)]">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case "code":
      return (
        <figure className="my-1">
          <pre className="overflow-x-auto rounded-xl border border-[var(--line)] bg-[var(--paper)] px-5 py-4 text-[13px] leading-relaxed text-[var(--ink)]">
            <code>{block.source}</code>
          </pre>
          {block.caption && (
            <figcaption className="font-body mt-2 text-xs text-[var(--ink-soft)]">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case "definitions":
      return (
        <dl className="font-body flex flex-col gap-2">
          {block.items.map((item) => (
            <div key={item.term} className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
              <dt className="shrink-0 text-sm font-semibold text-[var(--ink)] sm:w-56">
                <RichText text={item.term} />
              </dt>
              <dd className="text-sm text-[var(--ink-soft)]">
                <RichText text={item.description} />
              </dd>
            </div>
          ))}
        </dl>
      );

    case "example":
      return (
        <div className="rounded-xl border border-[var(--line)] bg-[var(--paper)] p-5">
          <p className="font-body text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
            <RichText text={block.title} />
          </p>
          <p className="font-body mt-2 text-[15px] text-[var(--ink)]">
            <RichText text={block.problem} />
          </p>
          <ol className="font-body mt-3 flex list-decimal flex-col gap-1 pl-5">
            {block.steps.map((step, i) => (
              <li key={i} className="text-sm text-[var(--ink-soft)]">
                <RichText text={step} />
              </li>
            ))}
          </ol>
          <p className="font-body mt-3 text-sm font-semibold text-[var(--ink)]">
            Answer: <RichText text={block.answer} />
          </p>
        </div>
      );

    case "callout": {
      const isWarning = block.tone === "warning";
      return (
        <aside
          className="rounded-xl border-l-4 px-5 py-4"
          style={{
            borderLeftColor: isWarning ? "#d1495b" : "var(--teal)",
            background: isWarning ? "rgba(209,73,91,0.06)" : "rgba(15,154,142,0.07)",
          }}
        >
          <p className="font-body text-sm font-semibold text-[var(--ink)]">
            <RichText text={block.title} />
          </p>
          <p className="font-body mt-1 text-sm leading-relaxed text-[var(--ink-soft)]">
            <RichText text={block.text} />
          </p>
        </aside>
      );
    }

    case "table":
      return (
        <figure className="overflow-x-auto">
          <table className="font-body w-full border-collapse text-sm">
            <thead>
              <tr>
                {block.headers.map((h) => (
                  <th
                    key={h}
                    className="border-b border-[var(--line)] px-3 py-2 text-left font-semibold text-[var(--ink)]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className="border-b border-[var(--line)] px-3 py-2 text-[var(--ink-soft)]"
                    >
                      <RichText text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {block.caption && (
            <figcaption className="font-body mt-2 text-xs text-[var(--ink-soft)]">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case "list": {
      const items = block.items.map((item, i) => (
        <li key={i} className="font-body text-[15px] leading-relaxed text-[var(--ink)]">
          <RichText text={item} />
        </li>
      ));
      return block.ordered ? (
        <ol className="flex list-decimal flex-col gap-1.5 pl-5">{items}</ol>
      ) : (
        <ul className="flex list-disc flex-col gap-1.5 pl-5">{items}</ul>
      );
    }
  }
}
