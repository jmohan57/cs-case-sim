"use server";

import { connect } from "@planetscale/database";
import { CaseDataType, ItemType, ItemTypeDB } from "@/types";

const conn = connect({
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
});

export const addItemToDB = async (
  caseData: CaseDataType,
  itemData: ItemType,
) => {
  const { id: caseId, name: caseName, image: caseImage } = caseData;
  const {
    id: itemId,
    name: itemName,
    rarity,
    phase,
    image: itemImage,
  } = itemData;

  try {
    await conn.execute(
      "INSERT INTO case_sim_items (case_id, case_name, case_image, item_id, item_name, rarity, phase, item_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [caseId, caseName, caseImage, itemId, itemName, rarity, phase, itemImage],
    );
  } catch (error) {
    console.error("Error adding item:", error);
    return false;
  }
};

export const addItemsToDB = async (
  data: {
    caseData: { id: string; name: string; image: string };
    itemData: ItemType;
  }[],
) => {
  const amount = data.length;
  const placeholdersString = [...Array(amount)]
    .map(() => "(?, ?, ?, ?, ?, ?, ?, ?)")
    .join(", ");

  const values = data.map(item => [
    item.caseData.id,
    item.caseData.name,
    item.caseData.image,
    item.itemData.id,
    item.itemData.name,
    item.itemData.rarity,
    item.itemData.phase ?? null,
    item.itemData.image,
  ]);

  try {
    await conn.execute(
      `INSERT INTO case_sim_items (case_id, case_name, case_image, item_id, item_name, rarity, phase, item_image) VALUES ${placeholdersString}`,
      values.flat(),
    );
  } catch (error) {
    console.error("Error adding items:", error);
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
      `SELECT MAX(id) as total FROM case_sim_items ${
        onlyCoverts ? "WHERE rarity = 'Covert' OR rarity = 'Extraordinary'" : ""
      }`,
    );
    return parseInt((query.rows[0] as { total: string }).total ?? 0);
  } catch (error) {
    console.log("Error getting total items:", error);
    return false;
  }
};
