import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("Missing DATABASE_URL. Make sure your database is provisioned.");
}

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.js", // use .js (NOT .ts) since your project is JS
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
