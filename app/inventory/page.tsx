import Link from "next/link";
import SettingsCheckboxes from "@/components/SettingsCheckboxes";
import PersonalItemHistory, {
  TotalSpend,
} from "@/components/PersonalItemHistory";

export const metadata = {
  title: "Inventory | Counter-Strike Case Simulator",
};

export default ({
  searchParams: { onlyCoverts },
}: {
  searchParams: { onlyCoverts?: string };
}) => {
  return (
    <main id="main" className="select-none">
      <div className="flex min-h-screen flex-col py-2 backdrop-blur-md">
        <span className="text-center text-3xl font-medium">
          Last 100 {onlyCoverts ? "coverts" : "items"} unboxed by you
        </span>

        <span className="text-center">
          {" "}
          These are only items saved in your browser.
        </span>
        <TotalSpend onlyCoverts={onlyCoverts === "true"} />

        <Link
          href="/"
          className="mx-auto w-fit text-center text-lg font-medium hover:underline"
        >
          Open some more!
        </Link>

        <hr className="mx-auto mt-5 w-full px-20 opacity-30" />

        <div className="my-2 flex justify-center">
          <SettingsCheckboxes hidePersonalCheckbox />
        </div>

        <PersonalItemHistory onlyCoverts={onlyCoverts === "true"} />
      </div>
    </main>
  );
};
