import { MutableRefObject } from "react";
import { gradeOddsCase, gradeOddsSouvenir } from "./gradeOdds";
import { CaseDataType, GradeType, ItemType } from "@/types";

// Determine if the item should be StatTrak
// 1. Item is not Extraordinary (Gloves)
// 2. Case is not a Souvenir package
// 3. 10% chance
const itemIsStatTrak = (caseData: CaseDataType, item: ItemType): boolean => {
  return (
    item.rarity !== "Extraordinary" &&
    caseData.type !== "Souvenir" &&
    Math.random() <= 0.1
  );
};

export default (
  caseData: CaseDataType,
  itemBuffer: MutableRefObject<
    {
      caseData: CaseDataType;
      itemData: ItemType;
    }[]
  >,
) => {
  // This is pretty hacky
  const gradeOdds =
    caseData.type === "Case" ? gradeOddsCase : gradeOddsSouvenir;

  const random = Math.random();
  let cumulativeProbability = 0;

  for (const grade in gradeOdds) {
    cumulativeProbability += gradeOdds[grade as GradeType];
    if (random <= cumulativeProbability) {
      if (grade === "Rare Special Item") {
        // For "Rare Special Item," select from the "contains_rare" array
        const rareItems = caseData.contains_rare;
        if (rareItems.length > 0) {
          const unboxedItem = {
            ...rareItems[Math.floor(Math.random() * rareItems.length)],
          };

          // 10% chance of StatTrak. Prefix "★ StatTrak™" to the item name and remove the other ★ from the name
          if (itemIsStatTrak(caseData, unboxedItem)) {
            unboxedItem.name =
              "★ StatTrak™ " + unboxedItem.name.replace("★", "");
          }

          // Add the unboxed item to the item buffer
          itemBuffer.current = [
            ...itemBuffer.current,
            { caseData, itemData: unboxedItem },
          ];
          // Return the item
          return unboxedItem;
        }
      } else {
        // For other grades, select from the "contains" array
        const gradeItems = caseData.contains.filter(
          item => item.rarity === grade,
        );

        if (gradeItems.length > 0) {
          const unboxedItem = {
            ...gradeItems[Math.floor(Math.random() * gradeItems.length)],
          };

          // 10% chance of StatTrak. Prefix "StatTrak™" to the item name
          if (itemIsStatTrak(caseData, unboxedItem)) {
            unboxedItem.name = "StatTrak™ " + unboxedItem.name;
          }

          // Add the unboxed item to the item buffer
          itemBuffer.current = [
            ...itemBuffer.current,
            { caseData, itemData: unboxedItem },
          ];
          // Return the item
          return unboxedItem;
        }
      }
    }
  }

  // If no valid grade is found, return a default item from "contains"
  return caseData.contains[0];
};
