/**
 * Checks hand-authored item modules before they are registered. Run from `web/`:
 *
 *   EXPECT=40 npx tsx ../.claude/skills/build-lesson/scripts/check-module.ts src/data/items/<module>.ts [...]
 *
 * Reports per-lesson counts (flagging any that differ from EXPECT), the level
 * histogram, duplicate ids, accidental template placeholders, KaTeX failures,
 * and numeric keys whose rounding the stem doesn't specify.
 *
 * With --dump-numeric it instead prints {id: answerKey} as JSON for
 * check-numeric.py.
 */
import path from "node:path";
import { pathToFileURL } from "node:url";

const web = process.cwd();
const load = (rel: string) => import(pathToFileURL(path.resolve(web, rel)).href);
const PLACEHOLDER = /(?<![\\A-Za-z^_}])\{([A-Za-z_]\w*)\}/;

(async () => {
  const args = process.argv.slice(2);
  const dump = args.includes("--dump-numeric");
  const files = args.filter((a) => a !== "--dump-numeric");

  const items: any[] = [];
  for (const f of files) {
    const mod = await load(f);
    for (const v of Object.values(mod)) if (Array.isArray(v)) items.push(...(v as any[]).filter((x) => x && x.id && x.conceptId));
  }

  if (dump) {
    const out: Record<string, number> = {};
    for (const it of items) if (it.format === "numeric") out[it.id] = it.answerKey;
    console.log(JSON.stringify(out));
    return;
  }

  const katex = (await load("node_modules/katex/dist/katex.mjs")).default;
  const { splitMath } = await load("src/lib/wiki/inlineMath.ts");
  const { difficultyToLevel } = await load("src/lib/assessment/difficultyLevel.ts");

  let problems = 0;
  let notes = 0;
  const report = (msg: string) => {
    problems++;
    console.log(msg);
  };

  // counts and levels
  const byConcept = new Map<string, number[]>();
  for (const it of items) {
    const hist = byConcept.get(it.conceptId) ?? Array(10).fill(0);
    hist[Math.min(10, Math.max(1, Math.round(difficultyToLevel(it.difficulty)))) - 1]++;
    byConcept.set(it.conceptId, hist);
  }
  const expect = process.env.EXPECT ? Number(process.env.EXPECT) : undefined;
  console.log("lesson                                   count  levels 1..10");
  for (const [id, hist] of byConcept) {
    const n = hist.reduce((a, b) => a + b, 0);
    const flag = expect !== undefined && n !== expect ? `   <-- expected ${expect}` : "";
    if (flag) problems++;
    console.log(`${id.padEnd(40)} ${String(n).padStart(5)}  ${hist.join(",")}${flag}`);
  }

  // duplicate ids
  const seen = new Set<string>();
  for (const it of items) {
    if (seen.has(it.id)) report(`DUPLICATE ${it.id}`);
    seen.add(it.id);
  }

  for (const it of items) {
    const texts: string[] = [
      it.stem,
      ...(it.choices ?? []).map((c: any) => c.text),
      ...(it.rubric?.elements ?? []).map((e: any) => e.description),
    ];
    // placeholders (only meaningful for non-template items)
    if (!it.params) for (const t of texts.slice(0, 1 + (it.choices?.length ?? 0)))
      if (PLACEHOLDER.test(t)) report(`PLACEHOLDER ${it.id} :: ${t.match(PLACEHOLDER)![0]}`);
    // KaTeX
    for (const t of texts)
      for (const seg of splitMath(t))
        if (seg.kind === "math") {
          try {
            katex.renderToString(seg.text, { throwOnError: true, strict: "ignore" });
          } catch (e: any) {
            report(`KATEX ${it.id} :: ${seg.text.slice(0, 60)} :: ${String(e.message).slice(0, 80)}`);
          }
        }
    // rounding
    if (it.format === "numeric") {
      const key = String(it.answerKey);
      const dec = key.includes(".") && !key.includes("e") ? key.split(".")[1].length : 0;
      const asked = String(it.stem).match(/Give \$(\d+)\$ decimal place/);
      if (!asked && dec > 2) {
        notes++;
        console.log(`NOTE exact? ${it.id} key ${key} has ${dec} decimals and no rounding instruction — fine if exact, else add "Give $N$ decimal places."`);
      }
      if (asked && dec > Number(asked[1])) report(`TOO-PRECISE ${it.id} key ${key} but stem asks ${asked[1]}`);
    }
  }

  console.log(`\n${items.length} items in ${byConcept.size} lessons, ${problems} problem(s), ${notes} note(s) to eyeball`);
})();
