import Link from "next/link";
import { getItemsFromDB } from "@/lib/actions";
import Item from "./Item";
import { GradeType } from "@/types";

export default async ({
  onlyCoverts,
  onlyPersonal,
}: {
  onlyCoverts: boolean;
  onlyPersonal: boolean;
}) => {
  const unboxedItems = await getItemsFromDB(onlyCoverts, onlyPersonal);

  return (
    <div className="flex flex-wrap justify-center gap-8 px-2 lg:px-16">
      {unboxedItems && unboxedItems.length === 0 && (
        <span className="text-center">
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
            ? item.itemName.split(" | ")
            : [null, null];

          return (
            <div
              key={item.id}
              title={`Unboxed on ${item.unboxedAt?.toUTCString()} from ${
                item.caseName
              }\n\nClick to open case.`}
            >
              <Link href={`/?case=${item.caseId}`}>
                <Item
                  itemName={itemName ?? ""}
                  skinName={`${skinName ?? ""} ${
                    item.phase ? ` (${item.phase})` : ""
                  }`}
                  grade={
                    item.itemName.includes("★")
                      ? "Rare Special Item"
                      : (item.rarity as GradeType)
                  }
                  image={item.itemImage}
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
