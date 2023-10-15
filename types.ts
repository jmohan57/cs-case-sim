export type ItemType = {
  id: string;
  name: string;
  rarity: string;
  image: string;
};

export type GradeType =
  | "Consumer Grade"
  | "Industrial Grade"
  | "Mil-Spec Grade"
  | "Restricted"
  | "Classified"
  | "Covert"
  | "Rare Special Item";

export type CaseDataType = {
  id: string;
  type: string;
  name: string;
  image: string;
  contains: ItemType[];
  contains_rare: ItemType[];
};
