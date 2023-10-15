import { promises as fs } from "fs";
import Image from "next/image";
import CaseSelect from "@/components/CaseSelect";
import AboutButtonWithModal from "@/components/AboutButtonWithModal";
import Item from "@/components/Item";
import { CaseDataType, GradeType, ItemType } from "@/types";

// TODO: Look into https://github.com/ByMykel/CSGO-API

export default async function Home({
  searchParams
}: {
  searchParams: Record<string, string | undefined>;
}) {
  const { case: selectedCaseParam } = searchParams;
  const allCases = await fs.readdir(process.cwd() + "/lib/data");
  const selectedCase =
    selectedCaseParam && allCases.includes(selectedCaseParam + ".json")
      ? `${selectedCaseParam}.json`
      : `${allCases[0].replace(".json", "")}.json`;

  const caseDataString = await fs.readFile(
    `./lib/data/${selectedCase}`,
    "utf8"
  );

  const caseData: CaseDataType = JSON.parse(caseDataString);

  return (
    <main id="main" className="relative flex min-h-screen flex-col">
      <CaseSelect availableCases={allCases} />

      <div className="mt-3 flex flex-1 flex-col items-center gap-1">
        <h1 className="text-4xl font-medium text-white">Unlock Container</h1>
        <h4 className="text-xl">
          Unlock <span className="font-semibold">{caseData.name}</span>
        </h4>

        <Image
          src={caseData.image_url}
          alt={`${caseData.name} image`}
          width={256}
          height={256}
        />
      </div>

      <div className="flex flex-col backdrop-blur-md">
        <div className="my-2 px-12">
          <div className="flex items-center justify-between">
            <span className="text-lg tracking-wider">
              Contains one of the following:
            </span>

            <div className="flex gap-1">
              <button className="rounded p-2 text-lg font-medium transition-colors duration-300 hover:bg-black/50">
                INSPECT ITEMS
              </button>
              <AboutButtonWithModal />
            </div>
          </div>
          <hr className="my-2 opacity-30" />
        </div>

        <div className="flex flex-wrap gap-8 px-16">
          {Object.entries(caseData.content)
            .filter(([grade]) => grade !== "Rare Special Items")
            .reverse()
            .map(([grade, items]) => {
              return items.map((item: ItemType) => (
                <Item
                  key={item.name}
                  itemName={item.name.split(" | ")[0]}
                  skinName={item.name.split(" | ")[1]}
                  image={
                    item.wears["Factory New"] ??
                    item.wears["Minimal Wear"] ??
                    item.wears["Field-Tested"] ??
                    item.wears["Well-Worn"] ??
                    item.wears["Battle-Scarred"]
                  }
                  grade={grade as GradeType}
                />
              ));
            })}
          {caseData.content["Rare Special Items"].length > 0 && (
            <Item
              itemName={
                caseData.content["Rare Special Items"][0].name.includes(
                  "Gloves"
                )
                  ? "★ Gloves ★"
                  : "★ Rare Special Item ★"
              }
              image="/images/rsi.png"
              grade="Rare Special Items"
            />
          )}
        </div>

        <hr className="container mx-auto my-5 px-20 opacity-30" />

        <div className="container mx-auto mb-6 flex items-center justify-between">
          <span className="text-2xl font-bold tracking-wider">
            {!caseData.name.toLowerCase().includes("package")
              ? `🔑 Use ${caseData.name} Key`
              : null}
          </span>
          <div className="flex items-center gap-2">
            <button className="rounded bg-[#048b59] p-3 text-lg font-semibold transition-colors duration-[40ms] hover:bg-[#15b869]">
              UNLOCK CONTAINER
            </button>

            <div className="mx-2 h-16 w-px bg-white/50" />

            <button className="rounded p-3 text-lg font-semibold transition-colors duration-300 hover:bg-neutral-500/50">
              Close
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
