"use client";

import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default () => {
  const [pending, startTransition] = useTransition();
  const searchParams = new URLSearchParams(useSearchParams());
  const onlyCoverts = searchParams.get("onlyCoverts") === "true";
  const onlyPersonal = searchParams.get("onlyPersonal") === "true";
  const router = useRouter();

  const setSearchParams = (name: string, value: string) => {
    value === "false"
      ? searchParams.delete(name)
      : searchParams.set(name, value);
    startTransition(() => router.replace(`?${searchParams}`));
  };

  return (
    <div className="flex flex-wrap justify-center gap-x-2">
      <div className="flex items-center gap-1">
        <input
          className="h-4 w-4 accent-[#048b59] disabled:cursor-not-allowed"
          style={{ colorScheme: "light" }}
          type="checkbox"
          id="onlyCovertsCheckbox"
          defaultChecked={onlyCoverts}
          disabled={pending}
          onChange={e =>
            setSearchParams("onlyCoverts", e.target.checked.toString())
          }
        />
        <label
          className={`pt-[2px] text-lg ${pending ? "cursor-not-allowed" : ""}`}
          htmlFor="onlyCovertsCheckbox"
        >
          Show only coverts
        </label>
      </div>

      <div className="flex items-center gap-1">
        <input
          className="h-4 w-4 accent-[#048b59] disabled:cursor-not-allowed"
          style={{ colorScheme: "light" }}
          type="checkbox"
          id="onlyPersonalCheckbox"
          defaultChecked={onlyPersonal}
          disabled={pending}
          onChange={e =>
            setSearchParams("onlyPersonal", e.target.checked.toString())
          }
        />
        <label
          className={`pt-[2px] text-lg ${pending ? "cursor-not-allowed" : ""}`}
          htmlFor="onlyPersonalCheckbox"
        >
          Show only mine
        </label>
      </div>
    </div>
  );
};
