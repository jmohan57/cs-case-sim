"use client";

import Button from "./Button";
import gradeColors from "@/utils/gradeColors";
import { GradeType, ItemType } from "@/types";

type Props = {
  unboxedDialogRef: React.MutableRefObject<HTMLDialogElement | null>;
  historyDialogRef: React.MutableRefObject<HTMLDialogElement | null>;
  item: ItemType | null;
  unlockButtonDisabled: boolean;
  openCaseFunc: (dontOpenDialog?: boolean) => void;
};
export default ({
  unboxedDialogRef,
  historyDialogRef,
  item,
  unlockButtonDisabled,
  openCaseFunc
}: Props) => {
  return (
    <dialog
      className="mx-auto w-full max-w-lg select-none border-[1px] border-white/30 bg-[#2d2d2d] text-xl text-white backdrop:bg-black/30 backdrop:backdrop-blur-sm"
      ref={unboxedDialogRef}
    >
      <div className="flex flex-col">
        <span
          className="border-b-[12px] bg-[#262626] p-3 text-3xl font-semibold text-neutral-400"
          style={{
            borderColor: item?.name.includes("★")
              ? gradeColors["Rare Special Item"]
              : gradeColors[item?.rarity as GradeType]
          }}
        >
          You got a{" "}
          <span
            style={{
              color: item?.name.includes("★")
                ? gradeColors["Rare Special Item"]
                : gradeColors[item?.rarity as GradeType]
            }}
          >
            {item?.name}
          </span>
        </span>

        <div className="flex flex-col p-2">
          {item && (
            <div>
              <img
                key={item.id}
                src={item.image}
                alt={item.image}
                width={512}
                height={384}
                draggable={false}
              />
            </div>
          )}

          <div className="flex justify-end gap-1">
            <Button
              variant="secondary"
              onClick={() => unboxedDialogRef.current?.close()}
            >
              CLOSE
            </Button>

            <Button
              variant="secondary"
              onClick={() => historyDialogRef.current?.showModal()}
            >
              HISTORY
            </Button>

            <Button
              variant="primary"
              disabled={unlockButtonDisabled}
              onClick={() => openCaseFunc(true)}
            >
              RETRY
            </Button>
          </div>
        </div>
      </div>
    </dialog>
  );
};
