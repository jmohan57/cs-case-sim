import Link from "next/link";
import { getItemsFromDB } from "@/lib/actions";
import Item from "./Item";
import { GradeType } from "@/types";

export default async ({ onlyCoverts }: { onlyCoverts: boolean }) => {
  const unboxedItems = await getItemsFromDB(onlyCoverts);

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
        unboxedItems.map(item => {
          const [itemName, skinName] = unboxedItems
            ? item.item_name.split(" | ")
            : [null, null];

          return (
            <div
              key={item.id}
              title={`Unboxed on ${item.unboxed_at?.toUTCString()} from ${
                item.case_name
              }\n\nClick to open case.`}
            >
              <Link href={`/?case=${item.case_id}&item=${item.item_id}`}>
                <Item
                  itemName={itemName ?? ""}
                  skinName={`${skinName ?? ""} ${
                    item.phase ? ` (${item.phase})` : ""
                  }`}
                  grade={
                    item.item_name.includes("★")
                      ? "Rare Special Item"
                      : (item.rarity as GradeType)
                  }
                  image={item.item_image}
                />
              </Link>
            </div>
          );
        })
      ) : (
        <span>Error loading items :(</span>
      )}
    </div>
  );
};
