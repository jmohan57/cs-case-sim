"use client";

import gradeColors from "@/utils/gradeColors";
import { GradeType, ItemType } from "@/types";

type Props = {
  historyDialogRef: React.MutableRefObject<HTMLDialogElement | null>;
  unboxedItems: ItemType[];
};
export default ({ historyDialogRef, unboxedItems }: Props) => {
  return (
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
          <span>
            Opened: <span className="font-semibold">{unboxedItems.length}</span>
          </span>
          <span>
            Key spend:{" "}
            <span className="font-semibold">
              {(unboxedItems.length * 2.35).toFixed(2)}€ ($
              {(unboxedItems.length * 2.5).toFixed(2)})
            </span>
          </span>
          {Object.entries(gradeColors)
            .slice(0, 5)
            .map(([grade, color]) => (
              <span
                key={grade}
                className="border-l-8 px-2"
                style={{ borderColor: color }}
              >
                {grade}:{" "}
                <span className="font-semibold">
                  {unboxedItems.filter(x => x.rarity === grade).length}
                </span>
              </span>
            ))}

          {/* Add Covert manually */}
          <span
            className="border-l-8 px-2"
            style={{ borderColor: gradeColors["Covert"] }}
          >
            Covert:{" "}
            <span className="font-semibold">
              {
                unboxedItems.filter(
                  x => x.rarity === "Covert" && !x.name.includes("★")
                ).length
              }
            </span>
          </span>

          {/* Add RSI manually */}
          <span
            className="border-l-8 px-2"
            style={{ borderColor: gradeColors["Rare Special Item"] }}
          >
            Rare Special Item:{" "}
            <span className="font-semibold">
              {unboxedItems.filter(x => x.name.includes("★")).length}
            </span>
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
            {unboxedItems.filter(
              x => x.rarity === "Covert" || x.name.includes("★")
            ).length === 0 && <span>No items unboxed yet</span>}
            <div className="flex flex-col gap-1">
              {unboxedItems
                .filter(x => x.rarity === "Covert" || x.name.includes("★"))
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
            className="select-none self-end rounded p-2 text-xl font-medium transition-colors duration-300 hover:bg-black/50"
            onClick={() => historyDialogRef.current?.close()}
          >
            CLOSE
          </button>
        </div>
      </div>
    </dialog>
  );
};
