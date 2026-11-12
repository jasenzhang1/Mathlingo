"""Merge question-vetter JSONL output into one results file plus a Markdown report.

    python3 tools/vetReport.py <inputs-dir> <outputs-dir> <domain> <report-dir>

<inputs-dir> holds the chunkNN.json files given to the vetters; <outputs-dir> the
chunkNN.jsonl files they wrote. Section grouping comes from the export's conceptId
order via web/src/data/sections.ts (parsed loosely, since it is plain data).
"""
import json, re, sys, statistics as st
from collections import defaultdict, Counter
from pathlib import Path

ind, outd, domain, repd = map(Path, sys.argv[1:5])
domain = str(domain)
src = Path(__file__).resolve().parent.parent / "src/data/sections.ts"
text = src.read_text()
block = text[text.index(f'"{domain}": ['):]
block = block[: block.index("\n  ],\n")]
sections = []
for m in re.finditer(r'id: "([^"]+)",\s*label: "([^"]+)",\s*conceptIds: \[(.*?)\]', block, re.S):
    sections.append((m[1], m[2], re.findall(r'"([^"]+)"', m[3])))

items = {i["id"]: i for f in sorted(ind.glob("chunk*.json")) for i in json.load(open(f))}
res, bad = {}, []
for f in sorted(outd.glob("chunk*.jsonl")):
    for n, line in enumerate(open(f), 1):
        if not line.strip():
            continue
        try:
            r = json.loads(line)
            res[r["id"]] = r
        except Exception as e:
            bad.append(f"{f.name}:{n}: {e}")
missing = [i for i in items if i not in res]

repd.mkdir(parents=True, exist_ok=True)
ordered = [res[i] for i in items if i in res]
(repd / f"{domain}.jsonl").write_text("".join(json.dumps(r, ensure_ascii=False) + "\n" for r in ordered))

def summ(rs):
    if not rs:
        return "—", "—", Counter()
    sc = [r["score"] for r in rs]
    return f"{st.mean(sc):.1f}", f"{st.median(sc):.0f}", Counter(r["verdict"] for r in rs)

by_c = defaultdict(list)
for r in ordered:
    by_c[items[r["id"]]["conceptId"]].append(r)

L = [f"# Question vetting — {domain}", "",
     "Independent review by the `question-vetter` agent (`.claude/agents/question-vetter.md`).",
     "Score = 100 × (2·correctness + clarity + alignment + gradability + pedagogy) / 30.", ""]
m, md, v = summ(ordered)
dims = ["correctness", "clarity", "alignment", "gradability", "pedagogy"]
L += [f"**{len(ordered)} / {len(items)} items vetted.** Mean score {m}, median {md}. "
      f"keep {v['keep']} · revise {v['revise']} · reject {v['reject']}.", ""]
if missing:
    L += [f"Not vetted: {len(missing)} items.", ""]
L += ["Mean per dimension (0–5): " + ", ".join(
    f"{d} {st.mean(r['scores'][d] for r in ordered):.2f}" for d in dims), ""]
L += ["## By section", "", "| Section | Items | Mean | Median | keep | revise | reject |", "|---|---:|---:|---:|---:|---:|---:|"]
for sid, label, cids in sections:
    rs = [r for c in cids for r in by_c[c]]
    m, md, v = summ(rs)
    L.append(f"| {label} | {len(rs)} | {m} | {md} | {v['keep']} | {v['revise']} | {v['reject']} |")
L += ["", "## By concept", "", "| Section | Concept | Items | Mean | keep | revise | reject |", "|---|---|---:|---:|---:|---:|---:|"]
for sid, label, cids in sections:
    for c in cids:
        m, md, v = summ(by_c[c])
        L.append(f"| {label} | `{c}` | {len(by_c[c])} | {m} | {v['keep']} | {v['revise']} | {v['reject']} |")
rej = sorted((r for r in ordered if r["verdict"] == "reject"), key=lambda r: r["score"])
L += ["", f"## Rejected items ({len(rej)})", "", "| Item | Score | Vetter's answer | Issues | Suggested fix |", "|---|---:|---|---|---|"]
esc = lambda s: str(s).replace("|", "\\|").replace("\n", " ")
for r in rej:
    L.append(f"| `{r['id']}` | {r['score']} | {esc(r.get('myAnswer',''))} | {esc('; '.join(r.get('issues', [])))} | {esc(r.get('fix',''))} |")
rev = sorted((r for r in ordered if r["verdict"] == "revise"), key=lambda r: r["score"])
L += ["", f"## Items to revise ({len(rev)}), lowest score first", "", "| Item | Score | Issues |", "|---|---:|---|"]
for r in rev:
    L.append(f"| `{r['id']}` | {r['score']} | {esc('; '.join(r.get('issues', [])))} |")
L += ["", "Every item's full scores are in the JSONL file next to this report."]
(repd / f"{domain}.md").write_text("\n".join(L) + "\n")
print(f"vetted {len(ordered)}/{len(items)}; parse errors {len(bad)}; missing {len(missing)}")
for b in bad[:20]: print(" ", b)
