/**
 * What a lesson already has: section, wiki, question count, formats and the
 * level histogram. Run from `web/`:
 *
 *   npx tsx ../.claude/skills/build-lesson/scripts/lesson-status.ts <concept-id> [...]
 *   npx tsx ../.claude/skills/build-lesson/scripts/lesson-status.ts --domain <domain>
 */
import path from "node:path";
import { pathToFileURL } from "node:url";

const web = process.cwd();
const load = (rel: string) => import(pathToFileURL(path.join(web, rel)).href);

(async () => {
  const { concepts } = await load("src/data/concepts.ts");
  const { sectionSpecs } = await load("src/data/sections.ts");
  const { loadItemBank } = await load("src/data/items.ts");
  const { loadArticle } = await load("src/data/wiki/index.ts");
  const { difficultyToLevel } = await load("src/lib/assessment/difficultyLevel.ts");

  const args = process.argv.slice(2);
  const ids: string[] =
    args[0] === "--domain"
      ? concepts.filter((c: any) => c.domain === args[1]).map((c: any) => c.id)
      : args;
  if (ids.length === 0) {
    console.log("usage: lesson-status.ts <concept-id> [...] | --domain <domain>");
    return;
  }

  const bank: Map<string, any[]> = await loadItemBank();
  const sectionOf = new Map<string, string>();
  for (const specs of Object.values(sectionSpecs) as any[][])
    for (const s of specs) for (const id of s.conceptIds) sectionOf.set(id, s.label);

  for (const id of ids) {
    const c = concepts.find((x: any) => x.id === id);
    if (!c) {
      console.log(`${id}: NOT IN concepts.ts`);
      continue;
    }
    const items = bank.get(id) ?? [];
    const formats: Record<string, number> = {};
    const hist = Array(10).fill(0);
    for (const it of items) {
      formats[it.format] = (formats[it.format] ?? 0) + 1;
      const lv = Math.min(10, Math.max(1, Math.round(difficultyToLevel(it.difficulty))));
      hist[lv - 1]++;
    }
    const wiki = await loadArticle(id);
    console.log(
      `${id}\n  ${c.title} [${c.domain}] section: ${sectionOf.get(id) ?? "NONE (lands in Further Topics)"}\n` +
        `  wiki: ${wiki ? `yes (${wiki.sections.length} sections)` : "MISSING"}   slides: ${c.embedUrl ? "yes" : "none"}\n` +
        `  questions: ${items.length} ${JSON.stringify(formats)}\n` +
        `  levels 1..10: ${hist.join(", ")}`,
    );
  }
})();
