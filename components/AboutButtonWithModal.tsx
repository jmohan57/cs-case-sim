"use client";

import { useRef } from "react";
import Link from "next/link";
import Button from "./Button";

export default () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <div className="flex justify-center">
      <Button
        variant="secondary-darker"
        onClick={() => dialogRef.current?.showModal()}
      >
        ?
      </Button>

      <dialog
        className="mx-auto w-full max-w-lg border-[1px] border-white/30 bg-[#2d2d2d] text-xl text-white backdrop:bg-black/30 backdrop:backdrop-blur-sm"
        ref={dialogRef}
      >
        <div className="flex flex-col">
          <span className="bg-[#262626] p-3 text-3xl font-semibold text-neutral-400">
            About this project
          </span>

          <div className="flex flex-col p-2">
            <p>
              This is the Counter-Strike 2 case opening UI recreated in React
              and styled with Tailwind. The person who created it can be found{" "}
              <Link
                className="font-semibold hover:underline"
                href="https://leonlarsson.com"
                target="_blank"
              >
                here
              </Link>
              . The data is fetched from{" "}
              <Link
                className="font-semibold hover:underline"
                href="https://github.com/ByMykel/CSGO-API"
                target="_blank"
              >
                here
              </Link>
              .
            </p>

            <Button
              variant="secondary-darker"
              className="self-end"
              onClick={() => dialogRef.current?.close()}
            >
              OK
            </Button>
          </div>
        </div>
      </dialog>
    </div>
  );
};
