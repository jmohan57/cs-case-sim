"use client";

// @ts-expect-error
import useSound from "use-sound";
import { GradeType, ItemType } from "@/types";
import Item from "./Item";

type Props = {
  items: ItemType[];
  rareItems: ItemType[];
};

export default ({ items, rareItems }: Props) => {
  const [playHover] = useSound("/audio/itemhover.mp3");

  return (
    <>
      {items.map(item => (
        <Item
          key={item.name}
          itemName={item.name.split(" | ")[0]}
          skinName={item.name.split(" | ")[1]}
          image={item.image}
          grade={item.rarity.name as GradeType}
          playHover={playHover}
        />
      ))}

      {rareItems.length > 0 && (
        <Item
          itemName={
            rareItems[0].rarity.name === "Extraordinary"
              ? "★ Gloves ★"
              : "★ Rare Special Item ★"
          }
          image="/images/rsi-2.png"
          grade="Rare Special Item"
          isSpecial
          playHover={playHover}
        />
      )}
    </>
  );
};
