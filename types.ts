export type ItemType = {
  name: string;
  desc: string;
  wears: {
    "Factory New": string;
    "Minimal Wear": string;
    "Field-Tested": string;
    "Well-Worn": string;
    "Battle-Scarred": string;
  };
};

export type GradeType =
  | "Consumer Grade Skins"
  | "Industrial Grade Skins"
  | "Mil-Spec Skins"
  | "Restricted Skins"
  | "Classified Skins"
  | "Covert Skins"
  | "Rare Special Items";

export type CaseDataType = {
  name: string;
  image_url: string;
  content: Record<GradeType, ItemType[]>;
};
