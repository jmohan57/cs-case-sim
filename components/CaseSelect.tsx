"use client";

import { useRouter, useSearchParams } from "next/navigation";
// @ts-expect-error
import useSound from "use-sound";

export default ({
  availableCases,
}: {
  availableCases: { id: string; name: string }[];
}) => {
  const router = useRouter();
  const caseParam = useSearchParams().get("case");
  const [playHover] = useSound("/audio/itemhover.mp3");
  const [playCaseSound, { stop: stopCaseSound }] = useSound(
    "/audio/caseselect.mp3",
  );

  return (
    <select
      className="cursor-pointer rounded bg-transparent p-2 text-lg font-semibold tracking-wide backdrop-blur-md transition-colors duration-[40ms] hover:bg-black/50 focus-visible:bg-black/50"
      defaultValue={caseParam ?? availableCases[0].id}
      onMouseEnter={playHover}
      onChange={e => {
        stopCaseSound();
        playCaseSound();
        router.replace(`/?case=${e.target.value}`);
      }}
    >
      {availableCases.map(caseData => (
        <option
          key={caseData.id}
          className="bg-[#2d2d2d] text-base"
          value={caseData.id}
        >
          {caseData.name}
        </option>
      ))}
    </select>
  );
};
