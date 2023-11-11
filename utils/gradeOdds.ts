import { GradeType } from "@/types";

type GradeOddsType = {
  [grade in GradeType]: number;
};

export const gradeOddsCase = {
  // "Rare Special Item": 1.0026,
  "Mil-Spec Grade": 0.7992,
  Restricted: 0.1598,
  Classified: 0.032,
  Covert: 0.0064,
  "Rare Special Item": 0.0026,
} as GradeOddsType;

export const gradeOddsSouvenir = {
  "Consumer Grade": 0.7992,
  "Industrial Grade": 0.1598,
  "Mil-Spec Grade": 0.032,
  Restricted: 0.0064,
  Covert: 0.0014,
} as GradeOddsType;
