import Image from "next/image";

type Props = {
  itemName: string;
  skinName?: string;
  tier?: "milspec" | "restricted" | "classified" | "covert" | "special";
};

const tierColors = {
  milspec: "#4b69ff",
  restricted: "#8847ff",
  classified: "#d32ee6",
  covert: "#eb4b4b",
  special: "#ffd700"
};

export default ({ itemName, skinName, tier = "milspec" }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <div
        className={`flex h-32 w-44 items-center justify-center border-b-8 bg-gradient-to-b from-neutral-600 to-neutral-400 transition-transform hover:-translate-y-1`}
        style={{ borderColor: tierColors[tier] }}
      >
        <Image
          className="p-2"
          src="/images/m4a4_howl.png"
          alt="Weapon image"
          width={512}
          height={384}
        />
      </div>

      <div className="flex flex-col text-sm text-white">
        <span className="font-semibold">{itemName}</span>
        <span>{skinName}</span>
      </div>
    </div>
  );
};
