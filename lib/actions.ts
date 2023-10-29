"use server";

import { connect } from "@planetscale/database";
import { CaseDataType, ItemType, ItemTypeDB } from "@/types";

const conn = connect({
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
});

export const addItemToDB = async (caseData: CaseDataType, item: ItemType) => {
  const { id: caseId, name: caseName, image: caseImage } = caseData;
  const { id: itemId, name: itemName, rarity, image: itemImage } = item;

  try {
    await conn.execute(
      "INSERT INTO case_sim_items (case_id, case_name, case_image, item_id, item_name, rarity, item_image) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [caseId, caseName, caseImage, itemId, itemName, rarity, itemImage],
    );
  } catch (error) {
    console.error("Error adding item:", error);
    return false;
  }
};

export const getItemsFromDB = async (onlyCoverts?: boolean) => {
  try {
    const query = await conn.execute(
      `SELECT * FROM case_sim_items ${
        onlyCoverts ? "WHERE rarity = 'Covert' OR rarity = 'Extraordinary'" : ""
      } ORDER BY id DESC LIMIT 100`,
    );

    return query.rows as ItemTypeDB[];
  } catch (error) {
    console.log("Error getting items:", error);
    return false;
  }
};

export const getTotalItemsFromDB = async (onlyCoverts?: boolean) => {
  try {
    const query = await conn.execute(
      `SELECT COUNT(*) as total FROM case_sim_items ${
        onlyCoverts ? "WHERE rarity = 'Covert' OR rarity = 'Extraordinary'" : ""
      }`,
    );
    return parseInt((query.rows[0] as { total: string }).total);
  } catch (error) {
    console.log("Error getting total items:", error);
    return false;
  }
};
