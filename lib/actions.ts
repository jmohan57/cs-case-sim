"use server";

import { connect } from "@planetscale/database";
import { z } from "zod";
import { CaseDataType, ItemType, ItemTypeDB } from "@/types";

const conn = connect({
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
});

const dataSchema = z.object({
  caseData: z.object({
    id: z.string(),
    name: z.string(),
    image: z
      .string()
      .startsWith("https://steamcdn-a.akamaihd.net/apps/730/icons"),
  }),
  itemData: z.object({
    id: z.string(),
    name: z.string(),
    rarity: z.object({
      // id: z.string(),
      name: z.string(),
      // color: z.string(),
    }),
    phase: z.string().optional(),
    image: z
      .string()
      .refine(
        url =>
          url.startsWith("https://raw.githubusercontent.com/ByMykel") ||
          url.startsWith("https://steamcdn-a.akamaihd.net/apps/730/icons"),
      ),
  }),
});

export const addItemToDB = async (
  caseData: CaseDataType,
  itemData: ItemType,
) => {
  // Validate data - not tested because function is unused
  const zodReturn = dataSchema.safeParse({ caseData, itemData });
  if (!zodReturn.success) {
    console.log("addItemToDB: Error validating data:", zodReturn.error);
    return false;
  }

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
      [
        caseId,
        caseName,
        caseImage,
        itemId,
        itemName,
        rarity.name,
        phase,
        itemImage,
      ],
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
  // Validate data
  const zodReturn = z.array(dataSchema).safeParse(data);
  if (!zodReturn.success) {
    console.log("addItemsToDB: Error validating data:", zodReturn.error);
    return false;
  }

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
    item.itemData.rarity.name,
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
    const { rows } = await conn.execute<ItemTypeDB>(
      `SELECT * FROM case_sim_items ${
        onlyCoverts ? "WHERE rarity = 'Covert' OR item_name LIKE '%★%'" : ""
      } ORDER BY id DESC LIMIT 100`,
    );

    return rows;
  } catch (error) {
    console.log("Error getting items:", error);
    return false;
  }
};

export const getTotalItemsFromDB = async (onlyCoverts?: boolean) => {
  // If onlyCoverts is true, use COUNT(*)
  // Otherwise, use MAX(id) to get the total. This is much faster than COUNT(*)
  const statement = onlyCoverts
    ? "SELECT COUNT(*) as total FROM case_sim_items WHERE rarity = 'Covert' OR rarity = 'Extraordinary'"
    : "SELECT MAX(id) as total FROM case_sim_items";

  try {
    const { rows } = await conn.execute<{ total: string }>(statement);
    return parseInt(rows[0].total ?? 0);
  } catch (error) {
    console.log("Error getting total items:", error);
    return false;
  }
};
