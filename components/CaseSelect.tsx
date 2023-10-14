"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default ({ availableCases }: { availableCases: string[] }) => {
  const router = useRouter();
  const caseParam = useSearchParams().get("case");

  return (
    <div className="max-2-md mx-auto mt-2">
      <select
        className="rounded bg-[#048b59] p-2 uppercase tracking-wider text-white"
        defaultValue={caseParam ?? availableCases[0]}
        onChange={e => router.replace(`/?case=${e.target.value}`)}
      >
        {availableCases.map(caseName => (
          <option key={caseName} value={caseName.replace(".json", "")}>
            {caseName.replaceAll("_", " ").replace(".json", "")}
          </option>
        ))}
      </select>
    </div>
  );
};
