import { Client } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";

export const planetscaleClient = new Client({
  url: process.env.DATABASE_URL,
});

export const db = drizzle(planetscaleClient);
