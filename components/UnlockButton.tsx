"use client";

import { CaseDataType, GradeType, ItemType } from "@/types";
import { useRef, useState } from "react";
import UnboxedDialog from "./UnboxedDialog";
import StatsAndHistoryDialog from "./StatsAndHistoryDialog";

type GradeOddsType = {
  [grade in GradeType]: number;
};

const gradeOddsCase = {
  "Mil-Spec Grade": 0.7992,
  Restricted: 0.1598,
  Classified: 0.032,
  Covert: 0.0064,
  "Rare Special Item": 0.0026
} as GradeOddsType;

const gradeOddsSouvenir = {
  "Consumer Grade": 0.7992,
  "Industrial Grade": 0.1598,
  "Mil-Spec Grade": 0.032,
  Restricted: 0.0064,
  Covert: 0.0014
} as GradeOddsType;

export default ({ caseData }: { caseData: CaseDataType }) => {
  const [unboxedItems, setUnboxedItems] = useState<ItemType[]>([]);
  const [unboxedItem, setUnboxedItem] = useState<ItemType | null>(null);
  const unboxedDialogRef = useRef<HTMLDialogElement>(null);
  const historyDialogRef = useRef<HTMLDialogElement>(null);

  const onClick = () => {
    const openedItem = getItem();
    unboxedDialogRef.current?.showModal();
    setUnboxedItem(openedItem);
    setUnboxedItems([openedItem, ...unboxedItems]);
  };

  // This is pretty hacky
  const gradeOdds =
    caseData.type === "Case" ? gradeOddsCase : gradeOddsSouvenir;

  // Simulate opening an item
  function getItem() {
    const random = Math.random();
    let cumulativeProbability = 0;

    for (const grade in gradeOdds) {
      cumulativeProbability += gradeOdds[grade as GradeType];
      if (random <= cumulativeProbability) {
        if (grade === "Rare Special Item") {
          // For "Rare Special Item," select from the "contains_rare" array
          const rareItems = caseData.contains_rare;
          if (rareItems.length > 0) {
            const randomIndex = Math.floor(Math.random() * rareItems.length);
            return rareItems[randomIndex];
          }
        } else {
          // For other grades, select from the "contains" array
          const gradeItems = caseData.contains.filter(
            item => item.rarity === grade
          );
          if (gradeItems.length > 0) {
            const randomIndex = Math.floor(Math.random() * gradeItems.length);
            return gradeItems[randomIndex];
          }
        }
      }
    }
    // If no valid grade is found, return a default item from "contains"
    return caseData.contains[0];
  }

  return (
    <>
      <button
        className="rounded p-3 text-lg font-semibold transition-colors duration-300 hover:bg-neutral-500/50"
        onClick={() => historyDialogRef.current?.showModal()}
      >
        History
      </button>
      <button
        className="rounded bg-[#048b59] p-3 text-lg font-semibold transition-colors duration-[40ms] hover:bg-[#15b869]"
        onClick={onClick}
      >
        UNLOCK CONTAINER
      </button>

      {/* UNBOXED DIALOG */}
      <UnboxedDialog
        historyDialogRef={historyDialogRef}
        unboxedDialogRef={unboxedDialogRef}
        item={unboxedItem}
      />

      {/* STATS AND HISTORY DIALOG */}
      <StatsAndHistoryDialog
        historyDialogRef={historyDialogRef}
        unboxedItems={unboxedItems}
      />
    </>
  );
};
