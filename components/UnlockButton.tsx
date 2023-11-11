"use client";

// @ts-expect-error
import useSound from "use-sound";
import { useEffect, useRef, useState } from "react";
import UnboxedDialog from "./UnboxedDialog";
import StatsAndHistoryDialog from "./StatsAndHistoryDialog";
import Button from "./Button";
import { CaseDataType, GradeType, ItemType } from "@/types";
import { addItemsToDB } from "@/lib/actions";

type GradeOddsType = {
  [grade in GradeType]: number;
};

const gradeOddsCase = {
  // "Rare Special Item": 1.0026,
  "Mil-Spec Grade": 0.7992,
  Restricted: 0.1598,
  Classified: 0.032,
  Covert: 0.0064,
  "Rare Special Item": 0.0026,
} as GradeOddsType;

const gradeOddsSouvenir = {
  "Consumer Grade": 0.7992,
  "Industrial Grade": 0.1598,
  "Mil-Spec Grade": 0.032,
  Restricted: 0.0064,
  Covert: 0.0014,
} as GradeOddsType;

export default ({ caseData }: { caseData: CaseDataType }) => {
  const [unboxedItems, setUnboxedItems] = useState<ItemType[]>([]);
  const [unboxedItem, setUnboxedItem] = useState<ItemType | null>(null);
  const [unlockButtonDisabled, setUnlockButtonDisabled] = useState(false);
  const unboxedDialogRef = useRef<HTMLDialogElement>(null);
  const historyDialogRef = useRef<HTMLDialogElement>(null);
  const itemBuffer = useRef<{ caseData: CaseDataType; itemData: ItemType }[]>(
    [],
  );

  const volume = 0.5;
  const [playMilspec, { stop: stop1 }] = useSound("/audio/milspecopen.mp3", {
    volume,
  });
  const [playResricted, { stop: stop2 }] = useSound(
    "/audio/restrictedopen.mp3",
    { volume },
  );
  const [playClassified, { stop: stop3 }] = useSound(
    "/audio/classifiedopen.mp3",
    { volume },
  );
  const [playCovert, { stop: stop4 }] = useSound("/audio/covertopen.mp3", {
    volume,
  });
  const [playGold, { stop: stop5 }] = useSound("/audio/goldopen.mp3", {
    volume,
  });

  // Load unboxed items from localStorage
  useEffect(() => {
    try {
      setUnboxedItems(JSON.parse(localStorage.getItem("unboxedItems") || "[]"));
    } catch (error) {
      setUnboxedItems([]);
    }
  }, []);

  const sendBatchToDB = () => {
    if (itemBuffer.current.length > 0) {
      const formattedData = itemBuffer.current.map(data => ({
        caseData: {
          id: data.caseData.id,
          name: data.caseData.name,
          image: data.caseData.image,
        },
        itemData: data.itemData,
      }));

      addItemsToDB(formattedData);
      itemBuffer.current = [];
    }
  };

  // Set up the initial interval
  useEffect(() => {
    // Send the batch to the DB every 5 seconds
    const timer = setInterval(() => {
      sendBatchToDB();
    }, 5000);

    // Cleanup function
    return () => {
      clearInterval(timer);
    };
  }, []);

  const openCase = (dontOpenDialog?: boolean) => {
    const openedItem = getItem();
    setUnboxedItem(openedItem);
    setUnboxedItems([openedItem, ...unboxedItems]);
    localStorage.setItem(
      "unboxedItems",
      JSON.stringify([openedItem, ...unboxedItems]),
    );

    // Stop all sounds and play sound based on item grade. Covert and gold missing
    stop1();
    stop2();
    stop3();
    stop4();
    stop5();

    // Play sound based on item grade
    if (
      ["Consumer Grade", "Industrial Grade", "Mil-Spec Grade"].includes(
        openedItem.rarity,
      )
    )
      playMilspec();
    if (openedItem.rarity === "Restricted") playResricted();
    if (openedItem.rarity === "Classified") playClassified();
    if (openedItem.rarity === "Covert" && !openedItem.name.includes("★"))
      playCovert();
    if (openedItem.name.includes("★")) playGold();

    // Disable the unlock button for 1 second if the item is a Covert or RSI
    if (openedItem.name.includes("★") || openedItem.rarity === "Covert") {
      setUnlockButtonDisabled(true);
      setTimeout(() => {
        setUnlockButtonDisabled(false);
      }, 1000);
    }

    if (dontOpenDialog) return;
    unboxedDialogRef.current?.showModal();
  };

  // This is pretty hacky
  const gradeOdds =
    caseData.type === "Case" ? gradeOddsCase : gradeOddsSouvenir;

  // Determine if the item should be StatTrak
  // 1. Item is not Extraordinary (Gloves)
  // 2. Case is not a Souvenir package
  // 3. 10% chance
  const determineStatTrak = (item: ItemType): boolean => {
    return (
      item.rarity !== "Extraordinary" &&
      caseData.type !== "Souvenir" &&
      Math.random() <= 0.1
    );
  };

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
            const unboxedItem = {
              ...rareItems[Math.floor(Math.random() * rareItems.length)],
            };

            // 10% chance of StatTrak. Prefix "★ StatTrak™" to the item name and remove the other ★ from the name
            if (determineStatTrak(unboxedItem)) {
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
            if (determineStatTrak(unboxedItem)) {
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
  }

  return (
    <>
      <Button
        variant="secondary"
        onClick={() => historyDialogRef.current?.showModal()}
      >
        History
      </Button>

      <Button
        variant="primary"
        disabled={unlockButtonDisabled}
        onClick={() => openCase()}
      >
        UNLOCK CONTAINER
      </Button>

      {/* UNBOXED DIALOG */}
      <UnboxedDialog
        historyDialogRef={historyDialogRef}
        unboxedDialogRef={unboxedDialogRef}
        item={unboxedItem}
        unlockButtonDisabled={unlockButtonDisabled}
        openCaseFunc={openCase}
      />

      {/* STATS AND HISTORY DIALOG */}
      <StatsAndHistoryDialog
        historyDialogRef={historyDialogRef}
        unboxedItems={unboxedItems}
        setUnboxedItems={setUnboxedItems}
      />
    </>
  );
};
