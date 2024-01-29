import { case_sim_items } from "@prisma/client";

export type ItemType = {
  /** Extra properties from custom case API */
  extra?: {
    // Description to display in unboxing modal
    description?: string;
  };
  id: string;
  name: string;
  rarity: {
    id: string;
    name: string;
    color: string;
  };
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
  /** Extra properties from custom case API */
  extra?: {
    // Case gold chance (0-1)
    gold_chance?: number;
    // Whether or not the case should not give StatTraks
    disable_stattraks?: boolean;
  };
  id: string;
  type: string;
  name: string;
  image: string;
  contains: ItemType[];
  contains_rare: ItemType[];
};

export type ItemTypeLocalStorage = ItemType & {
  casePrice?: number | null;
};

export type ItemTypeDB = case_sim_items;
