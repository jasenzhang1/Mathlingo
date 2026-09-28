"""Convert a downloaded copy of the quant sheet (.xlsx) into a CSV directory for `sync.ts --csv`.

    pip install openpyxl
    python3 tools/quantBank/xlsx_to_csv.py Quant_Interview_Prep.xlsx /tmp/quant-csv

Each tab becomes `<tab title>.csv`. A cell is written as the sheet *displays* it, which is also
what the Sheets API returns to the live sync. This matters because Google Sheets has already stored
many typed fractions as dates: "3/4" is saved as 4 March with an `m/d` display format. The real
answer is the displayed text, never the date.
"""

import csv
import datetime
import os
import re
import sys

import openpyxl

TOKENS = [("yyyy", "{y:04d}"), ("mm", "{m:02d}"), ("dd", "{d:02d}"), ("yy", "{yy:02d}"), ("m", "{m}"), ("d", "{d}")]


def show_date(value: datetime.datetime, fmt: str) -> str:
    fmt = fmt.lower().split(";")[0]
    out, i = "", 0
    while i < len(fmt):
        for tok, rep in TOKENS:
            if fmt.startswith(tok, i):
                out += rep.format(y=value.year, yy=value.year % 100, m=value.month, d=value.day)
                i += len(tok)
                break
        else:
            if fmt[i] not in '"\\':
                out += fmt[i]
            i += 1
    return out


def show(c) -> str:
    v = c.value
    if v is None:
        return ""
    if isinstance(v, datetime.datetime):
        return show_date(v, c.number_format) if re.search(r"[dmy]", c.number_format.lower()) else v.isoformat()
    if isinstance(v, float):
        return str(int(v)) if v.is_integer() else repr(v)
    return str(v)


def main(src: str, out: str) -> None:
    os.makedirs(out, exist_ok=True)
    wb = openpyxl.load_workbook(src)
    for ws in wb.worksheets:
        rows = [[show(c) for c in row] for row in ws.iter_rows()]
        while rows and not any(rows[-1]):
            rows.pop()
        with open(os.path.join(out, f"{ws.title}.csv"), "w", newline="") as f:
            csv.writer(f, lineterminator="\n").writerows(rows)
        print(f"{ws.title}: {len(rows)} rows")


if __name__ == "__main__":
    main(*sys.argv[1:3])
