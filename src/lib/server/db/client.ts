import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "./schema";

let databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required for API routes.");
}

// Clean and sanitize the database URL (handling line breaks, extra spaces, and enclosing quotes)
databaseUrl = databaseUrl.trim();
if (
  (databaseUrl.startsWith('"') && databaseUrl.endsWith('"')) ||
  (databaseUrl.startsWith("'") && databaseUrl.endsWith("'"))
) {
  databaseUrl = databaseUrl.slice(1, -1);
}
databaseUrl = databaseUrl.replace(/[\r\n]+/g, "").replace(/\s+/g, "");

const sql = neon(databaseUrl);

export const db = drizzle({ client: sql, schema: schema });
