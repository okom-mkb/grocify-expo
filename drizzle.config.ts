import { defineConfig } from "drizzle-kit";

let databaseUrl = process.env.DATABASE_URL ?? "";

// Clean and sanitize the database URL (handling line breaks, extra spaces, and enclosing quotes)
databaseUrl = databaseUrl.trim();
if (
  (databaseUrl.startsWith('"') && databaseUrl.endsWith('"')) ||
  (databaseUrl.startsWith("'") && databaseUrl.endsWith("'"))
) {
  databaseUrl = databaseUrl.slice(1, -1);
}
databaseUrl = databaseUrl.replace(/[\r\n]+/g, "").replace(/\s+/g, "");

export default defineConfig({
  schema: "./src/lib/server/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
  },
});
