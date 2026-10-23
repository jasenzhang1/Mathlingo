/**
 * Renders every formula and inline math span of wiki articles with KaTeX and
 * checks each article's basic shape. Run from `web/`:
 *
 *   npx tsx ../.claude/skills/build-lesson/scripts/check-wiki.ts src/data/wiki/<area>/<file>.ts [...]
 *
 * Pass an area's index.ts to check every article it exports.
 */
import path from "node:path";
import { pathToFileURL } from "node:url";

const web = process.cwd();
const load = (rel: string) => import(pathToFileURL(path.resolve(web, rel)).href);

(async () => {
  const katex = (await load("node_modules/katex/dist/katex.mjs")).default;
  const { splitMath } = await load("src/lib/wiki/inlineMath.ts");
  const { conceptById } = await load("src/data/concepts.ts");

  const articles: any[] = [];
  for (const f of process.argv.slice(2)) {
    const mod = await load(f);
    for (const v of Object.values(mod)) {
      if (Array.isArray(v)) articles.push(...v.filter((a: any) => a?.conceptId && a?.sections));
      else if ((v as any)?.conceptId && (v as any)?.sections) articles.push(v);
    }
  }

  let spans = 0;
  let bad = 0;
  const flag = (msg: string) => {
    bad++;
    console.log(msg);
  };
  const tryRender = (id: string, s: string, display: boolean) => {
    spans++;
    try {
      katex.renderToString(s, { throwOnError: true, strict: "ignore", displayMode: display });
    } catch (e: any) {
      flag(`KATEX ${id} :: ${s.slice(0, 70)} :: ${String(e.message).slice(0, 80)}`);
    }
  };
  const inline = (id: string, t?: string) => {
    if (t) for (const seg of splitMath(t)) if (seg.kind === "math") tryRender(id, seg.text, false);
  };

  for (const a of articles) {
    const id = a.conceptId;
    if (!conceptById.get(id)) flag(`UNKNOWN-CONCEPT ${id} (not in concepts.ts)`);
    if (!a.references?.length) flag(`NO-REFERENCES ${id}`);
    if (!a.sections.some((s: any) => s.blocks.some((b: any) => b.kind === "example"))) flag(`NO-WORKED-EXAMPLE ${id}`);
    inline(id, a.summary);
    for (const s of a.sections) {
      inline(id, s.heading);
      for (const b of s.blocks) {
        if (b.kind === "formula") {
          tryRender(id, b.latex, true);
          inline(id, b.caption);
        } else if (b.kind === "prose") inline(id, b.text);
        else if (b.kind === "callout") {
          inline(id, b.title);
          inline(id, b.text);
        } else if (b.kind === "definitions") for (const d of b.items) {
          inline(id, d.term);
          inline(id, d.description);
        } else if (b.kind === "example") {
          inline(id, b.title);
          inline(id, b.problem);
          b.steps.forEach((x: string) => inline(id, x));
          inline(id, b.answer);
        } else if (b.kind === "table") {
          [...b.headers, ...b.rows.flat()].forEach((x: string) => inline(id, x));
          inline(id, b.caption);
        } else if (b.kind === "list") b.items.forEach((x: string) => inline(id, x));
      }
    }
  }
  console.log(`${articles.length} article(s), ${spans} math spans, ${bad} flag(s)`);
})();
