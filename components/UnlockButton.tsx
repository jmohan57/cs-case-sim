"use client";

import { CaseDataType, GradeType, ItemType } from "@/types";
import gradeColors from "@/utils/gradeColors";
import Image from "next/image";
import { useRef, useState } from "react";

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
      <dialog
        className="mx-auto w-full max-w-lg border-[1px] border-white/30 bg-[#2d2d2d] text-xl text-white"
        ref={unboxedDialogRef}
      >
        <div className="flex flex-col">
          <span
            className="border-b-[12px] bg-[#262626] p-3 text-3xl font-semibold text-neutral-400"
            style={{
              borderColor: unboxedItem?.name.includes("★")
                ? gradeColors["Rare Special Item"]
                : gradeColors[unboxedItem?.rarity as GradeType]
            }}
          >
            You got a{" "}
            <span
              style={{
                color: unboxedItem?.name.includes("★")
                  ? gradeColors["Rare Special Item"]
                  : gradeColors[unboxedItem?.rarity as GradeType]
              }}
            >
              {unboxedItem?.name}
            </span>
          </span>

          <div className="flex flex-col p-2">
            {unboxedItem && (
              <div>
                <Image
                  key={unboxedItem.id}
                  src={unboxedItem.image}
                  alt={unboxedItem.image}
                  width={512}
                  height={384}
                />
              </div>
            )}

            <div className="flex flex-row-reverse gap-1">
              <button
                className="self-end rounded p-2 text-xl font-medium transition-colors duration-300 hover:bg-black/50"
                onClick={() => unboxedDialogRef.current?.close()}
              >
                THANKS
              </button>
              <button
                className="self-end rounded p-2 text-xl font-medium transition-colors duration-300 hover:bg-black/50"
                onClick={() => historyDialogRef.current?.showModal()}
              >
                HISTORY
              </button>
            </div>
          </div>
        </div>
      </dialog>

      {/* STATS AND HISTORY DIALOG */}
      <dialog
        className="mx-auto w-full max-w-lg border-[1px] border-white/30 bg-[#2d2d2d] text-xl text-white backdrop:bg-black/30 backdrop:backdrop-blur-sm"
        ref={historyDialogRef}
      >
        <div className="flex flex-col">
          <span className="bg-[#262626] p-3 text-3xl font-semibold text-neutral-400">
            Stats and history
          </span>

          {/* STATS */}
          <div className="flex flex-col gap-1 p-2">
            <span className="font-semibold underline">Stats</span>
            <span>Total: {unboxedItems.length}</span>
            {Object.entries(gradeColors)
              .slice(0, 5)
              .map(([grade, color]) => (
                <span
                  key={grade}
                  className="border-l-8 px-2"
                  style={{ borderColor: color }}
                >
                  {grade}: {unboxedItems.filter(x => x.rarity === grade).length}
                </span>
              ))}

            {/* Add Covert manually */}
            <span
              className="border-l-8 px-2"
              style={{ borderColor: gradeColors["Covert"] }}
            >
              Covert:{" "}
              {
                unboxedItems.filter(
                  x => x.rarity === "Covert" && !x.name.includes("★")
                ).length
              }
            </span>

            {/* Add RSI manually */}
            <span
              className="border-l-8 px-2"
              style={{ borderColor: gradeColors["Rare Special Item"] }}
            >
              Rare Special Item:{" "}
              {
                unboxedItems.filter(
                  x => x.rarity === "Covert" && x.name.includes("★")
                ).length
              }
            </span>

            <hr className="my-1" />

            {/* LAST 20 ITEMS */}
            <div>
              <div className="font-semibold underline">Last 20 items</div>
              {unboxedItems.length === 0 && <span>No items unboxed yet</span>}
              <div className="flex flex-col gap-1">
                {unboxedItems.slice(0, 20).map((item, i) => (
                  <div
                    key={`${item.id}-${i}`}
                    className="border-l-8 px-2"
                    style={{
                      borderColor: item.name.includes("★")
                        ? gradeColors["Rare Special Item"]
                        : gradeColors[item.rarity as GradeType]
                    }}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            </div>

            {/* COVERTS AND GOLDS */}
            <div>
              <div className="font-semibold underline">Coverts and Golds</div>
              {unboxedItems.filter(x => x.rarity === "Covert").length === 0 && (
                <span>No items unboxed yet</span>
              )}
              <div className="flex flex-col gap-1">
                {unboxedItems
                  .filter(x => x.rarity === "Covert")
                  .map((item, i) => (
                    <div
                      key={`${item.id}-${i}`}
                      className="border-l-8 px-2"
                      style={{
                        borderColor: item.name.includes("★")
                          ? gradeColors["Rare Special Item"]
                          : gradeColors[item.rarity as GradeType]
                      }}
                    >
                      {item.name}
                    </div>
                  ))}
              </div>
            </div>

            <button
              className="self-end rounded p-2 text-xl font-medium transition-colors duration-300 hover:bg-black/50"
              onClick={() => historyDialogRef.current?.close()}
            >
              CLOSE
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};
