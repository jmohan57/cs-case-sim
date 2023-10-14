"use client";

import { useRef } from "react";
import Link from "next/link";

export default () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <div className="flex justify-center">
      <button
        className="rounded p-2 px-3 text-lg font-medium transition-colors duration-300 hover:bg-black/50"
        title="About this project"
        onClick={() => dialogRef.current?.showModal()}
      >
        ?
      </button>
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
              and styled with Tailwind. It has no functionality, yet. The person
              who created it can be found{" "}
              <Link
                className="font-semibold hover:underline"
                href="https://leonlarsson.com"
                target="_blank"
              >
                here
              </Link>
              .
            </p>
            <button
              className="self-end rounded p-2 text-xl font-medium transition-colors duration-300 hover:bg-black/50"
              onClick={() => dialogRef.current?.close()}
            >
              OK
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};
