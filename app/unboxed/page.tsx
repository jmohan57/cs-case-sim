import { Suspense } from "react";
import Link from "next/link";
import RefreshButton from "@/components/RefreshButton";
import SettingsCheckboxes from "@/components/SettingsCheckboxes";
import GlobalItemHistory from "@/components/GlobalItemHistory";
import Button from "@/components/Button";
import Icons from "@/components/icons";
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
      <div className="relative flex min-h-screen flex-col py-2 backdrop-blur-md">
        <Button
          variant="secondary-darker"
          href="/"
          className="absolute inset-2 size-fit p-1 max-[650px]:hidden"
        >
          <Icons.chevronLeft className="size-6" />
        </Button>

        <span className="text-center text-3xl font-medium">
          Last 100 {onlyCoverts ? "coverts" : "items"} unboxed by{" "}
          {onlyPersonal ? (
            <span title="As identified by an anonymous cookie.">you</span>
          ) : (
            "the community"
          )}
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

        {onlyPersonal && !onlyCoverts && (
          <span className="my-5 place-items-end text-center">
            Older non-covert items are regularly deleted from the database.
          </span>
        )}
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
