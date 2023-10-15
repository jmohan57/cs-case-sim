import Image from "next/image";
import { GradeType } from "@/types";

type Props = {
  itemName: string;
  skinName?: string;
  image?: string;
  grade?: GradeType;
};

const gradeColors = {
  "Consumer Grade": "#b0c3d9",
  "Industrial Grade": "#5e98d9",
  "Mil-Spec Grade": "#4b69ff",
  Restricted: "#8847ff",
  Classified: "#d32ee6",
  Covert: "#eb4b4b",
  "Rare Special Item": "#ffd700"
};

export default ({
  itemName,
  skinName,
  image,
  grade = "Mil-Spec Grade"
}: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <div
        className={`flex h-32 w-44 items-center justify-center border-b-[6px] bg-gradient-to-b from-neutral-600 to-neutral-400 shadow-md transition-all hover:shadow-xl`}
        style={{ borderColor: gradeColors[grade] ?? "yellow" }}
      >
        <Image
          className="p-2"
          src={image ?? "/images/m4a4_howl.png"}
          alt="Weapon image"
          width={512}
          height={384}
        />
      </div>

      <div className="flex flex-col text-sm text-white">
        <span className="font-semibold tracking-wider">{itemName}</span>
        <span className="tracking-wide">{skinName}</span>
      </div>
    </div>
  );
};
