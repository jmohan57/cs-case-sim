"use client";

import { useRouter, useSearchParams } from "next/navigation";
// @ts-expect-error
import useSound from "use-sound";
import Button from "./Button";
import Icons from "./icons";

export default ({
  availableCases,
}: {
  availableCases: { id: string; name: string }[];
}) => {
  const router = useRouter();
  const caseParam = useSearchParams().get("case");
  const [playHover] = useSound("/audio/buttonhover.mp3");
  const [playClick] = useSound("/audio/selectclick.mp3");
  const [playCaseSound, { stop: stopCaseSound }] = useSound(
    "/audio/caseselect.mp3",
  );

  const selectCase = (id?: string) => {
    stopCaseSound();
    playCaseSound();
    router.replace(
      `/?case=${
        id ??
        availableCases[Math.floor(Math.random() * availableCases.length)].id
      }`,
    );
  };

  return (
    <div className="flex gap-2">
      <select
        className="w-full cursor-pointer rounded bg-transparent p-2 text-lg font-semibold tracking-wide backdrop-blur-md transition-colors duration-[40ms] hover:bg-black/50 focus-visible:bg-black/50"
        value={caseParam ?? availableCases[0].id}
        onClick={playClick}
        onMouseEnter={playHover}
        onChange={e => selectCase(e.target.value)}
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

      <Button
        variant="secondary-darker"
        className="py-0 backdrop-blur-md"
        playSoundOnClick={false}
        onClick={() => selectCase()}
      >
        <Icons.shuffle />
      </Button>
    </div>
  );
};
