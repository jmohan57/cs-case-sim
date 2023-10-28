"use server";

import { connect } from "@planetscale/database";
import { CaseDataType, ItemType } from "@/types";

const conn = connect({
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
});

export const addItemToDB = async (caseData: CaseDataType, item: ItemType) => {
  const { id: caseId, name: caseName } = caseData;
  const { id: itemId, name: itemName, rarity } = item;
  await conn.execute(
    "INSERT INTO case_sim_items (case_id, case_name, item_id, item_name, rarity) VALUES (?, ?, ?, ?, ?)",
    [caseId, caseName, itemId, itemName, rarity],
  );
};
