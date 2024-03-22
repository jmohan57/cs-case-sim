// Generated with 'drizzle-kit introspect:mysql'
// Exported name changed from 'case_sim_items' to 'items'
// unboxedAt mode changed from 'string' to 'date'

import {
  mysqlTable,
  index,
  primaryKey,
  int,
  varchar,
  datetime,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const items = mysqlTable(
  "case_sim_items",
  {
    id: int("id").autoincrement().notNull(),
    caseId: varchar("case_id", { length: 255 }).notNull(),
    caseName: varchar("case_name", { length: 255 }).notNull(),
    caseImage: varchar("case_image", { length: 600 }).notNull(),
    itemId: varchar("item_id", { length: 255 }).notNull(),
    itemName: varchar("item_name", { length: 255 }).notNull(),
    itemImage: varchar("item_image", { length: 600 }).notNull(),
    rarity: varchar("rarity", { length: 255 }).notNull(),
    unboxedAt: datetime("unboxed_at", { mode: "date" }).default(
      sql`CURRENT_TIMESTAMP`,
    ),
    phase: varchar("phase", { length: 50 }),
    unboxerId: varchar("unboxer_id", { length: 36 }),
  },
  table => {
    return {
      idxRarity: index("idx_rarity").on(table.rarity),
      caseSimItemsId: primaryKey({
        columns: [table.id],
        name: "case_sim_items_id",
      }),
    };
  },
);
