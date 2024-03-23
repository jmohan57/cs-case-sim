import type { Config } from "drizzle-kit";

export default {
  driver: "mysql2",
  out: "./lib/db",
  schema: "./lib/db/schema.ts",
  dbCredentials: {
    uri: process.env.DATABASE_URL!.replace(
      "?sslaccept=strict",
      '?ssl={"rejectUnauthorized":true}',
    ),
  },
  tablesFilter: ["case_sim_items"],
  // Print all statements
  verbose: true,
  // Always ask for confirmation
  strict: true,
} satisfies Config;
