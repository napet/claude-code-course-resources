import { Database } from "bun:sqlite";

let db: Database;

export function getDb(): Database {
  if (!db) {
    db = new Database("data/app.db", { create: true });
  }
  return db;
}

export function query<T>(sql: string, params?: Record<string, unknown>): T[] {
  const stmt = getDb().query(sql);
  return stmt.all(params) as T[];
}

export function get<T>(sql: string, params?: Record<string, unknown>): T | undefined {
  const stmt = getDb().query(sql);
  return stmt.get(params) as T | undefined;
}

export function run(sql: string, params?: Record<string, unknown>): { changes: number; lastInsertRowid: number | bigint } {
  const stmt = getDb().prepare(sql);
  return stmt.run(params);
}
