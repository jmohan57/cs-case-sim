"use client";

import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default () => {
  const [pending, startTransition] = useTransition();
  const onlyCoverts = useSearchParams().get("onlyCoverts") === "true";

  const router = useRouter();
  return (
    <div className="flex items-center gap-1">
      <input
        className="h-4 w-4 accent-[#048b59] disabled:cursor-not-allowed"
        style={{ colorScheme: "light" }}
        type="checkbox"
        id="onlyCovertsCheckbox"
        defaultChecked={onlyCoverts}
        disabled={pending}
        onChange={() => {
          if (onlyCoverts) return router.replace("?");
          startTransition(() => router.replace(`?onlyCoverts=${!onlyCoverts}`));
        }}
      />
      <label
        className={`pt-[2px] text-lg ${pending ? "cursor-not-allowed" : ""}`}
        htmlFor="onlyCovertsCheckbox"
      >
        Show only coverts
      </label>
    </div>
  );
};
