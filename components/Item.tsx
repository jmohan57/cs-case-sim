"use client";

import { useState } from "react";
// @ts-expect-error
import useSound from "use-sound";
import { GradeType } from "@/types";
import gradeColors from "@/utils/gradeColors";

type Props = {
  itemName: string;
  skinName?: string;
  image?: string;
  grade?: GradeType;
  isSpecial?: boolean;
  highlight?: boolean;
};

export default ({
  itemName,
  skinName,
  image,
  grade = "Mil-Spec Grade",
  isSpecial,
  highlight,
}: Props) => {
  const [isHighlighted, setIsHighlighted] = useState(highlight);
  const [playHover] = useSound("/audio/itemhover.mp3");

  // Reset highlight after 2 seconds
  setTimeout(() => {
    if (isHighlighted) setIsHighlighted(false);
  }, 2000);

  return (
    <div
      className="group flex w-44 flex-col gap-1 transition-all data-[highlighted=true]:bg-[#ffd700]/40"
      data-highlighted={isHighlighted}
      onMouseEnter={playHover}
    >
      <div
        className={`flex h-32 w-44 items-center justify-center border-b-[6px] bg-gradient-to-b from-neutral-600 to-neutral-400 shadow-md transition-all group-hover:shadow-xl`}
        style={{
          borderColor: gradeColors[grade] ?? gradeColors["Mil-Spec Grade"],
        }}
      >
        <img
          className={`${isSpecial ? "h-full w-full object-cover" : "p-2"}`}
          src={image ?? "/images/m4a4_howl.png"}
          alt={`${itemName} image`}
          draggable={false}
        />
      </div>

      <div className="flex flex-col px-px text-sm text-white">
        <span className="font-semibold tracking-wider">{itemName}</span>
        <span className="tracking-wide">{skinName}</span>
      </div>
    </div>
  );
};
