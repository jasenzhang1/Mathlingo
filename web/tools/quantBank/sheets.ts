import { createSign } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Two interchangeable stores for the four tabs: the real Google Sheet, and a
 * directory of CSV files with the same tab names. The CSV store is what the
 * fixtures and dry runs use, so every code path here runs without credentials.
 *
 * Rows are addressed by *data* index: 0 is the first row under the header.
 * All values are written RAW, never USER_ENTERED — an answer of "1/2" must not
 * become the 1st of February, and "=C(10,5)" must not become a formula.
 */
export interface SheetStore {
  /** Header row first. Missing tab reads as []. */
  read(tab: string): Promise<string[][]>;
  /** Write a header row into an empty tab. */
  writeHeader(tab: string, header: string[]): Promise<void>;
  append(tab: string, rows: string[][]): Promise<void>;
  setCell(tab: string, dataRow: number, col: number, value: string): Promise<void>;
  /** Removes whole rows; indices may be in any order. */
  deleteRows(tab: string, dataRows: number[]): Promise<void>;
  describe(): string;
}

// ---------------------------------------------------------------------------
// Google Sheets
// ---------------------------------------------------------------------------

interface ServiceAccount {
  client_email: string;
  private_key: string;
  token_uri?: string;
}

function loadServiceAccount(raw: string): ServiceAccount {
  const text = raw.trim().startsWith("{")
    ? raw
    : existsSync(raw)
      ? readFileSync(raw, "utf8")
      : Buffer.from(raw, "base64").toString("utf8");
  const sa = JSON.parse(text) as ServiceAccount;
  if (!sa.client_email || !sa.private_key) {
    throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON is missing client_email or private_key");
  }
  return sa;
}

const b64url = (b: Buffer | string) => Buffer.from(b).toString("base64url");

export class GoogleSheetStore implements SheetStore {
  private token: { value: string; expires: number } | null = null;
  private sheetIds: Map<string, number> | null = null;
  private readonly sa: ServiceAccount;
  private readonly spreadsheetId: string;

  constructor(spreadsheetId: string, serviceAccount: string) {
    this.spreadsheetId = spreadsheetId;
    this.sa = loadServiceAccount(serviceAccount);
  }

  describe(): string {
    return `Google Sheet ${this.spreadsheetId} (as ${this.sa.client_email})`;
  }

  private async accessToken(): Promise<string> {
    const now = Math.floor(Date.now() / 1000);
    if (this.token && this.token.expires > now + 60) return this.token.value;
    const aud = this.sa.token_uri ?? "https://oauth2.googleapis.com/token";
    const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
    const claims = b64url(
      JSON.stringify({
        iss: this.sa.client_email,
        scope: "https://www.googleapis.com/auth/spreadsheets",
        aud,
        iat: now,
        exp: now + 3600,
      }),
    );
    const signer = createSign("RSA-SHA256");
    signer.update(`${header}.${claims}`);
    const jwt = `${header}.${claims}.${b64url(signer.sign(this.sa.private_key))}`;
    const res = await fetch(aud, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: jwt }),
    });
    if (!res.ok) throw new Error(`Google token exchange failed: ${res.status} ${await res.text()}`);
    const body = (await res.json()) as { access_token: string; expires_in: number };
    this.token = { value: body.access_token, expires: now + body.expires_in };
    return body.access_token;
  }

  private async api<T>(path: string, init: RequestInit = {}): Promise<T> {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}${path}`;
    const res = await fetch(url, {
      ...init,
      headers: { authorization: `Bearer ${await this.accessToken()}`, "content-type": "application/json" },
    });
    if (!res.ok) throw new Error(`Sheets API ${init.method ?? "GET"} ${path}: ${res.status} ${await res.text()}`);
    return (await res.json()) as T;
  }

  private range(tab: string, a1 = ""): string {
    const quoted = `'${tab.replace(/'/g, "''")}'`;
    return encodeURIComponent(a1 ? `${quoted}!${a1}` : quoted);
  }

  private async sheetId(tab: string): Promise<number> {
    if (!this.sheetIds) {
      const meta = await this.api<{ sheets: { properties: { title: string; sheetId: number } }[] }>(
        "?fields=sheets.properties(title,sheetId)",
      );
      this.sheetIds = new Map(meta.sheets.map((s) => [s.properties.title, s.properties.sheetId]));
    }
    const id = this.sheetIds.get(tab);
    if (id === undefined) throw new Error(`No tab named "${tab}" in the spreadsheet`);
    return id;
  }

  async read(tab: string): Promise<string[][]> {
    await this.sheetId(tab);
    const body = await this.api<{ values?: string[][] }>(`/values/${this.range(tab)}?valueRenderOption=FORMATTED_VALUE`);
    return body.values ?? [];
  }

  async writeHeader(tab: string, header: string[]): Promise<void> {
    await this.api(`/values/${this.range(tab, "A1")}?valueInputOption=RAW`, {
      method: "PUT",
      body: JSON.stringify({ values: [header] }),
    });
  }

  async append(tab: string, rows: string[][]): Promise<void> {
    if (rows.length === 0) return;
    await this.api(`/values/${this.range(tab, "A1")}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`, {
      method: "POST",
      body: JSON.stringify({ values: rows }),
    });
  }

  async setCell(tab: string, dataRow: number, col: number, value: string): Promise<void> {
    await this.api(`/values/${this.range(tab, `${columnLetter(col)}${dataRow + 2}`)}?valueInputOption=RAW`, {
      method: "PUT",
      body: JSON.stringify({ values: [[value]] }),
    });
  }

  async deleteRows(tab: string, dataRows: number[]): Promise<void> {
    if (dataRows.length === 0) return;
    const sheetId = await this.sheetId(tab);
    // Bottom-up, so earlier deletions do not shift the rows still to go.
    const requests = [...new Set(dataRows)]
      .sort((a, b) => b - a)
      .map((r) => ({
        deleteDimension: { range: { sheetId, dimension: "ROWS", startIndex: r + 1, endIndex: r + 2 } },
      }));
    await this.api(":batchUpdate", { method: "POST", body: JSON.stringify({ requests }) });
  }
}

export function columnLetter(col: number): string {
  let s = "";
  for (let n = col + 1; n > 0; n = Math.floor((n - 1) / 26)) s = String.fromCharCode(65 + ((n - 1) % 26)) + s;
  return s;
}

// ---------------------------------------------------------------------------
// CSV directory
// ---------------------------------------------------------------------------

export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;
  const src = text.replace(/^﻿/, "");
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (quoted) {
      if (c === '"' && src[i + 1] === '"') {
        field += '"';
        i++;
      } else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && src[i + 1] === "\n") i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else field += c;
  }
  if (field !== "" || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

export function toCsv(rows: string[][]): string {
  const esc = (v: string) => (/[",\n\r]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);
  return rows.map((r) => r.map((v) => esc(v ?? "")).join(",")).join("\n") + (rows.length ? "\n" : "");
}

export class CsvDirStore implements SheetStore {
  private readonly dir: string;

  constructor(dir: string) {
    this.dir = dir;
  }

  describe(): string {
    return `CSV directory ${this.dir}`;
  }

  private file(tab: string) {
    return join(this.dir, `${tab}.csv`);
  }

  async read(tab: string): Promise<string[][]> {
    const f = this.file(tab);
    return existsSync(f) ? parseCsv(readFileSync(f, "utf8")) : [];
  }

  private write(tab: string, rows: string[][]) {
    mkdirSync(this.dir, { recursive: true });
    writeFileSync(this.file(tab), toCsv(rows));
  }

  async writeHeader(tab: string, header: string[]): Promise<void> {
    const rows = await this.read(tab);
    rows[0] = header;
    this.write(tab, rows);
  }

  async append(tab: string, add: string[][]): Promise<void> {
    this.write(tab, [...(await this.read(tab)), ...add]);
  }

  async setCell(tab: string, dataRow: number, col: number, value: string): Promise<void> {
    const rows = await this.read(tab);
    const row = rows[dataRow + 1];
    while (row.length <= col) row.push("");
    row[col] = value;
    this.write(tab, rows);
  }

  async deleteRows(tab: string, dataRows: number[]): Promise<void> {
    const drop = new Set(dataRows.map((r) => r + 1));
    this.write(
      tab,
      (await this.read(tab)).filter((_, i) => !drop.has(i)),
    );
  }
}

export function storeFromEnv(env: NodeJS.ProcessEnv = process.env, csvDir?: string): SheetStore {
  if (csvDir) return new CsvDirStore(csvDir);
  const id = env.QUANT_SHEET_ID;
  const sa = env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!id || !sa) {
    throw new Error(
      "Set QUANT_SHEET_ID and GOOGLE_SERVICE_ACCOUNT_JSON (raw JSON, base64, or a file path), or pass --csv <dir>.",
    );
  }
  return new GoogleSheetStore(id, sa);
}
