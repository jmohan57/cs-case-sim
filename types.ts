export type ItemType = {
  id: string;
  name: string;
  rarity: string;
  phase?: string | null;
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

export type ItemTypeLocalStorage = {
  id: string;
  name: string;
  rarity: string;
  phase?: string | null;
  image: string;
  casePrice?: number | null;
};

export type ItemTypeDB = {
  id: number;
  case_id: string;
  case_name: string;
  case_image: string;
  item_id: string;
  item_name: string;
  item_image: string;
  rarity: string;
  phase?: string | null;
  unboxed_at: string;
};
