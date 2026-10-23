"""Compare numeric answer keys with independently computed values.

Usage (from web/):
  npx tsx ../.claude/skills/build-lesson/scripts/check-module.ts --dump-numeric <module>.ts \
    | py -3.13 ../.claude/skills/build-lesson/scripts/check-numeric.py <checks>.py

<checks>.py must define a dict C = {"concept--slug": value, ...} with every
value computed from the problem statement, never copied from the key.
"""
import json
import runpy
import sys

keys = json.load(sys.stdin)
checks = runpy.run_path(sys.argv[1])["C"]
bad = 0
for k, v in keys.items():
    if k not in checks:
        print("NOCHECK", k, v)
        bad += 1
        continue
    r = repr(float(v))
    d = len(r.split(".")[1]) if "." in r and "e" not in r else 0
    tol = (0.5 * 10 ** (-d) if d else 0.5) + 1e-9
    if abs(v - checks[k]) > tol * 1.0001:
        print("MISMATCH", k, "key", v, "computed", checks[k])
        bad += 1
for k in checks:
    if k not in keys:
        print("EXTRA", k)
        bad += 1
print(f"{len(keys)} numeric items, {bad} problem(s)")
sys.exit(1 if bad else 0)
