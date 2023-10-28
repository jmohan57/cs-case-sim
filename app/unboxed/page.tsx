import Link from "next/link";
import OnlyCovertsCheckbox from "@/components/OnlyCovertsCheckbox";
import { Suspense } from "react";
import GlobalItemHistory from "@/components/GlobalItemHistory";

export const metadata = {
  title: "Global Unbox History | Counter-Strike Case Simulator",
};

export default ({
  searchParams: { onlyCoverts },
}: {
  searchParams: { onlyCoverts?: string };
}) => {
  return (
    <main id="main" className="select-none">
      <div className="flex min-h-screen flex-col p-5 backdrop-blur-md">
        <span className="text-center text-3xl font-medium">
          Last 100 {onlyCoverts ? "coverts" : "items"} unboxed by the community
        </span>

        <Link
          href="/"
          className="mx-auto w-fit text-center text-lg font-medium hover:underline"
        >
          Open some more!
        </Link>

        <hr className="mx-auto mt-5 w-full px-20 opacity-30" />

        <div className="my-2 flex justify-center">
          <OnlyCovertsCheckbox />
        </div>

        <Suspense fallback={<span className="text-center">Loading...</span>}>
          <GlobalItemHistory onlyCoverts={onlyCoverts === "true"} />
        </Suspense>
      </div>
    </main>
  );
};
