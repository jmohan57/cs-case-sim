import { Suspense } from "react";
import Link from "next/link";
import RefreshButton from "@/components/RefreshButton";
import SettingsCheckboxes from "@/components/SettingsCheckboxes";
import GlobalItemHistory from "@/components/GlobalItemHistory";
import { getTotalItemsFromDB } from "@/lib/actions";

export const metadata = {
  title: "Global Unbox History | Counter-Strike Case Simulator",
};

export default ({
  searchParams: { onlyCoverts, onlyPersonal },
}: {
  searchParams: { onlyCoverts?: string; onlyPersonal?: string };
}) => {
  return (
    <main id="main" className="select-none">
      <div className="flex min-h-screen flex-col py-2 backdrop-blur-md">
        <span className="text-center text-3xl font-medium">
          Last 100 {onlyCoverts ? "coverts" : "items"} unboxed by{" "}
          {onlyPersonal ? "you" : "the community"}
        </span>

        <Suspense fallback={<span className="text-center">Loading...</span>}>
          <TotalSpend
            onlyCoverts={onlyCoverts === "true"}
            onlyPersonal={onlyPersonal === "true"}
          />
        </Suspense>

        <Link
          href="/"
          className="mx-auto w-fit text-center text-lg font-medium hover:underline"
        >
          Open some more!
        </Link>

        <hr className="mx-auto mt-5 w-full px-20 opacity-30" />

        <div className="my-2 flex justify-center">
          <SettingsCheckboxes />
        </div>

        <Suspense fallback={<span className="text-center">Loading...</span>}>
          <GlobalItemHistory
            onlyCoverts={onlyCoverts === "true"}
            onlyPersonal={onlyPersonal === "true"}
          />
        </Suspense>
      </div>
    </main>
  );
};

const TotalSpend = async ({
  onlyCoverts,
  onlyPersonal,
}: {
  onlyCoverts: boolean;
  onlyPersonal: boolean;
}) => {
  const totalUnboxed = await getTotalItemsFromDB(onlyCoverts, onlyPersonal);
  if (totalUnboxed === false) return null;

  return (
    <span className="text-center">
      <span className="font-medium">{totalUnboxed.toLocaleString("en")}</span>{" "}
      {onlyCoverts ? "coverts" : "items"} unboxed.{" "}
      <span className="font-medium">
        {(totalUnboxed * 2.35).toLocaleString("en", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
        €
      </span>{" "}
      spent on imaginary keys.
      <RefreshButton />
    </span>
  );
};
