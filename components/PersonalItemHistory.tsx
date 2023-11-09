"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Item from "./Item";
import { GradeType, ItemType } from "@/types";

export default ({ onlyCoverts }: { onlyCoverts: boolean }) => {
  const [unboxedItems, setUnboxedItems] = useState<ItemType[]>([]);

  // Load unboxed items from localStorage
  useEffect(() => {
    try {
      const unboxedItemsLocalStorage = JSON.parse(
        localStorage.getItem("unboxedItems") || "[]",
      );
      setUnboxedItems(
        onlyCoverts
          ? unboxedItemsLocalStorage
              .filter(
                (item: ItemType) =>
                  item.rarity === "Covert" || item.rarity === "Extraordinary",
              )
              .slice(0, 100)
          : unboxedItemsLocalStorage.slice(0, 100),
      );
    } catch (error) {
      setUnboxedItems([]);
    }
  }, [onlyCoverts]);

  return (
    <div className="flex flex-wrap justify-center gap-8 px-2 lg:px-16">
      {unboxedItems && unboxedItems.length === 0 && (
        <span>
          No items found. Go open some{" "}
          <Link href="/" className="font-medium hover:underline">
            here
          </Link>
          !
        </span>
      )}

      {unboxedItems ? (
        unboxedItems.map((item, i) => {
          const [itemName, skinName] = unboxedItems
            ? item.name.split(" | ")
            : [null, null];

          return (
            <Item
              key={i}
              itemName={itemName ?? ""}
              skinName={`${skinName ?? ""} ${
                item.phase ? ` (${item.phase})` : ""
              }`}
              grade={
                item.name.includes("★")
                  ? "Rare Special Item"
                  : (item.rarity as GradeType)
              }
              image={item.image}
            />
          );
        })
      ) : (
        <span>Error loading items :(</span>
      )}
    </div>
  );
};

export const TotalSpend = ({ onlyCoverts }: { onlyCoverts: boolean }) => {
  const [unboxedItemsAmount, setUnboxedItemsAmount] = useState<number>(0);

  // Load unboxed items from localStorage
  useEffect(() => {
    try {
      const unboxedItemsLocalStorage = JSON.parse(
        localStorage.getItem("unboxedItems") || "[]",
      );
      setUnboxedItemsAmount(
        onlyCoverts
          ? unboxedItemsLocalStorage.filter(
              (item: ItemType) =>
                item.rarity === "Covert" || item.rarity === "Extraordinary",
            ).length
          : unboxedItemsLocalStorage.length,
      );
    } catch (error) {
      setUnboxedItemsAmount(0);
    }
  }, [onlyCoverts]);

  return (
    <span className="text-center">
      <span className="font-medium">
        {unboxedItemsAmount.toLocaleString("en")}
      </span>{" "}
      {onlyCoverts ? "coverts" : "items"} unboxed.{" "}
      <span className="font-medium">
        {(unboxedItemsAmount * 2.35).toLocaleString("en", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
        €
      </span>{" "}
      spent on imaginary keys.
    </span>
  );
};
