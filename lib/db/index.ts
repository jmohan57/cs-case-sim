import { Client } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";

const client = new Client({
  url: process.env.DATABASE_URL,
});

export const db = drizzle(client);
