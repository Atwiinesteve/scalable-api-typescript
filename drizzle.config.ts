// imports
import "dotenv/config";
import { defineConfig } from "drizzle-kit";

// db config
export default defineConfig({
  out: "./drizzle",
  schema: ["./src/schemas/product-schema.ts"],
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});