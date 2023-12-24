import customCases from "@/lib/data/customCases.json";
import CaseSelect from "@/components/CaseSelect";
import AboutButtonWithModal from "@/components/AboutButtonWithModal";
import Item from "@/components/Item";
import UnlockButton from "@/components/UnlockButton";
import Button from "@/components/Button";
import getCasePrice from "@/utils/getCasePrice";
import { CaseDataType, GradeType } from "@/types";

export default async function Home({
  searchParams,
}: {
  searchParams: { case?: string; item?: string };
}) {
  const { case: selectedCaseParam, item: highlightedItemParam } = searchParams;

  const apis = [
    "https://bymykel.github.io/CSGO-API/api/en/crates/cases.json",
    "https://bymykel.github.io/CSGO-API/api/en/crates/souvenir.json",
  ];

  // Fetch both endpoints
  const promises = apis.map(api => fetch(api).then(res => res.json()));
  const [data1, data2] = await Promise.all(promises);

  // Combine the case data arrays
  const casesData: CaseDataType[] = [...data1, ...customCases, ...data2];

  const caseMetadata = casesData.map(x => ({ id: x.id, name: x.name }));

  const selectedCase =
    casesData.find(x => x.id === selectedCaseParam) ?? casesData[0];

  const selectedCasePrice = getCasePrice(selectedCase.name);

  return (
    <main id="main" className="relative flex min-h-screen select-none flex-col">
      <div className="mx-2 mt-2 flex flex-col-reverse justify-between gap-2 min-[800px]:flex-row">
        <CaseSelect availableCases={caseMetadata} />

        <Button
          variant="secondary-darker"
          href="/unboxed"
          className="flex items-center justify-center py-0 text-center backdrop-blur-md"
        >
          Global Unbox History
        </Button>
      </div>

      <div className="mt-3 flex flex-1 flex-col items-center gap-1 text-center">
        <h1 className="text-4xl font-medium text-white">Unlock Container</h1>
        <h4 className="text-xl">
          Unlock <span className="font-semibold">{selectedCase.name}</span>{" "}
          {selectedCasePrice && (
            <span
              className="font-medium tracking-wider"
              title={`This case costs approximately $${selectedCasePrice.toLocaleString(
                "en",
                { minimumFractionDigits: 2 },
              )} on Steam.`}
            >
              ($
              {selectedCasePrice.toLocaleString("en", {
                minimumFractionDigits: 2,
              })}
              )
            </span>
          )}
        </h4>

        <img
          src={selectedCase.image}
          alt={`${selectedCase.name} image`}
          width={256}
          height={256}
          draggable={false}
        />
      </div>

      <div className="flex flex-col backdrop-blur-md">
        <div className="my-2 px-4 lg:px-12">
          <div className="flex items-center justify-between">
            <span className="text-lg tracking-wider">
              Contains one of the following:
            </span>

            <div className="flex gap-1">
              <Button href="/unboxed" variant="secondary-darker">
                INSPECT ITEMS
              </Button>
              <AboutButtonWithModal />
            </div>
          </div>
          <hr className="my-2 opacity-30" />
        </div>

        <div className="flex max-h-96 flex-wrap justify-center gap-8 overflow-auto px-2 lg:justify-start lg:px-16">
          {selectedCase.contains.map(item => (
            <Item
              key={item.name}
              itemName={item.name.split(" | ")[0]}
              skinName={item.name.split(" | ")[1]}
              image={item.image}
              grade={item.rarity.name as GradeType}
              highlight={item.id === highlightedItemParam}
            />
          ))}

          {selectedCase.contains_rare.length > 0 && (
            <Item
              itemName={
                selectedCase.contains_rare[0].rarity.name === "Extraordinary"
                  ? "★ Gloves ★"
                  : "★ Rare Special Item ★"
              }
              image="/images/rsi-2.png"
              grade="Rare Special Item"
              isSpecial
            />
          )}
        </div>

        <hr className="container mx-auto my-5 px-20 opacity-30" />

        <div className="container mx-auto mb-6 flex items-center justify-between px-3">
          <span className="text-2xl tracking-wider">
            <span className="hidden md:inline">
              {!selectedCase.name.toLowerCase().includes("package") ? (
                <span>
                  Use <span className="font-bold">{selectedCase.name} Key</span>
                </span>
              ) : null}
            </span>
          </span>

          <div className="flex flex-wrap items-center gap-2">
            <UnlockButton caseData={selectedCase} />

            <div className="mx-2 h-16 w-px bg-white/50" />

            <Button
              variant="secondary"
              className="cursor-not-allowed"
              playSoundOnClick={false}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
