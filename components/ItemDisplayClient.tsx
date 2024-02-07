"use client";

import { CaseDataType, GradeType } from "@/types";
// @ts-expect-error
import useSound from "use-sound";
import Item from "./Item";

type Props = {
  selectedCase: CaseDataType;
};

export default ({ selectedCase }: Props) => {
  const [playHover] = useSound("/audio/itemhover.mp3");

  return (
    <div className="flex max-h-96 flex-wrap justify-center gap-8 overflow-auto px-2 lg:justify-start lg:px-16">
      {selectedCase.contains.map(item => (
        <Item
          key={item.name}
          itemName={item.name.split(" | ")[0]}
          skinName={item.name.split(" | ")[1]}
          image={item.image}
          grade={item.rarity.name as GradeType}
          playHover={playHover}
        />
      ))}

      {selectedCase.contains_rare.length > 0 && (
        <Item
          itemName={
            selectedCase.contains_rare[0].rarity.name === "Extraordinary"
              ? "★ Gloves ★"
              : "★ Rare Special Item ★"
          }
          image="/images/rsi-2.png"
          grade="Rare Special Item"
          isSpecial
          playHover={playHover}
        />
      )}
    </div>
  );
};
