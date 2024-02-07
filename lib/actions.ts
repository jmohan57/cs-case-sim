"use server";

import { z } from "zod";
import { prisma } from "@/prisma";
import { CaseDataType, ItemType, ItemTypeDB } from "@/types";

const dataSchema = z.object({
  caseData: z.object({
    id: z.string(),
    name: z.string(),
    image: z
      .string()
      .refine(
        url =>
          url.startsWith("https://raw.githubusercontent.com/ByMykel") ||
          url.startsWith("https://steamcdn-a.akamaihd.net/apps/730/icons"),
      ),
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
): Promise<boolean> => {
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
    await prisma.case_sim_items.create({
      data: {
        case_id: caseId,
        case_name: caseName,
        case_image: caseImage,
        item_id: itemId,
        item_name: itemName,
        rarity: rarity.name,
        phase: phase,
        item_image: itemImage,
      },
    });

    return true;
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
): Promise<boolean> => {
  // Validate data
  const zodReturn = z.array(dataSchema).safeParse(data);
  if (!zodReturn.success) {
    console.log("addItemsToDB: Error validating data:", zodReturn.error);
    return false;
  }

  try {
    await prisma.case_sim_items.createMany({
      data: data.map(item => ({
        case_id: item.caseData.id,
        case_name: item.caseData.name,
        case_image: item.caseData.image,
        item_id: item.itemData.id,
        item_name: item.itemData.name,
        rarity: item.itemData.rarity.name,
        phase: item.itemData.phase ?? null,
        item_image: item.itemData.image,
      })),
    });

    return true;
  } catch (error) {
    console.error("Error adding items:", error);
    return false;
  }
};

export const getItemsFromDB = async (
  onlyCoverts?: boolean,
): Promise<ItemTypeDB[] | false> => {
  try {
    const rows = await prisma.case_sim_items.findMany({
      where: onlyCoverts
        ? { OR: [{ rarity: "Covert" }, { item_name: { contains: "★" } }] }
        : {},
      orderBy: {
        id: "desc",
      },
      take: 100,
    });

    return rows;
  } catch (error) {
    console.log("Error getting items:", error);
    return false;
  }
};

export const getTotalItemsFromDB = async (
  onlyCoverts?: boolean,
): Promise<number | false> => {
  try {
    // If onlyCoverts is true, use COUNT(*)
    // Otherwise, use MAX(id) to get the total. This is much faster than COUNT(*)
    const totalItems = onlyCoverts
      ? await prisma.case_sim_items.count({
          where: { OR: [{ rarity: "Covert" }, { rarity: "Extraordinary" }] },
        })
      : await prisma.case_sim_items.aggregate({
          _max: {
            id: true,
          },
        });

    return typeof totalItems === "number"
      ? totalItems
      : totalItems._max.id ?? 0;
  } catch (error) {
    console.log("Error getting total items:", error);
    return false;
  }
};
