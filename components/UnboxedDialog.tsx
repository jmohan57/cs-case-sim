"use client";

import Link from "next/link";
import Button from "./Button";
import gradeColors from "@/utils/gradeColors";
import Icons from "./icons";
import { GradeType, ItemType } from "@/types";

type Props = {
  unboxedDialogRef: React.MutableRefObject<HTMLDialogElement | null>;
  historyDialogRef: React.MutableRefObject<HTMLDialogElement | null>;
  unlockButtonDisabled: boolean;
  openCaseFunc: (dontOpenDialog?: boolean) => void;
};
export default ({
  unboxedDialogRef,
  historyDialogRef,
  unlockButtonDisabled,
  openCaseFunc,
}: Props) => {
  const itemShareUrl = new URL("https://twitter.com/intent/tweet");
  itemShareUrl.searchParams.set("url", "case-sim.com");

  const steamMarketUrl = new URL(
    "https://steamcommunity.com/market/search?appid=7520",
  );
  return (
    <dialog
      className="mx-auto w-full max-w-lg border-[1px] border-white/30 bg-[#2d2d2d]/50 text-xl text-white backdrop-blur-xl backdrop:backdrop-blur-sm"
      ref={unboxedDialogRef}
    >
      <div className="flex flex-col">
        <div
          className="border-b-[12px] bg-[#262626]/70 p-3 text-3xl text-neutral-400"
          style={{
            borderColor: item?.name.includes("★")
              ? gradeColors["Rare Special Item"]
              : gradeColors[item?.rarity.name as GradeType],
          }}
        >
          <span>
            You got a{" "}
            <span
              style={{
                color: item?.name.includes("★")
                  ? gradeColors["Special Item"]
                  : gradeColors[item?.rarity.name as GradeType],
              }}
            >
              <Link
                href={itemShareUrl}
                target="_blank"
                title="Share this pull on X / Twitter!"
              >
              </Link>
            </span>
          </span>
        </div>

        <div className="flex flex-col p-2">

          <div className="flex flex-wrap justify-end gap-1">
            <Button
              variant="secondary"
              href={steamMarketUrl.href}
              openInNewTab
              className="mr-auto flex items-center"
            >
              <Icons.steam className="size-7" />
            </Button>

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

          </div>
        </div>
      </div>
    </dialog>
  );
};
