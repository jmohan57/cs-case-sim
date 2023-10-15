"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default ({
  availableCases
}: {
  availableCases: { id: string; name: string }[];
}) => {
  const router = useRouter();
  const caseParam = useSearchParams().get("case");

  return (
    <select
      className="m-2 mb-0 max-w-fit rounded bg-[#048b59] p-2 tracking-wider text-white"
      defaultValue={caseParam ?? availableCases[0].id}
      onChange={e => router.replace(`/?case=${e.target.value}`)}
    >
      {availableCases.map(caseData => (
        <option key={caseData.id} value={caseData.id}>
          {caseData.name}
        </option>
      ))}
    </select>
  );
};
