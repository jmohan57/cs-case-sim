import Image from "next/image";
import CaseSelect from "@/components/CaseSelect";
import AboutButtonWithModal from "@/components/AboutButtonWithModal";
import Item from "@/components/Item";
import UnlockButton from "@/components/UnlockButton";
import { CaseDataType, GradeType } from "@/types";

export default async function Home({
  searchParams
}: {
  searchParams: { case?: string };
}) {
  const { case: selectedCaseParam } = searchParams;

  const apis = [
    "https://bymykel.github.io/CSGO-API/api/en/crates/cases.json",
    "https://bymykel.github.io/CSGO-API/api/en/crates/souvenir.json"
  ];

  // Fetch both endpoints
  const promises = apis.map(api => fetch(api).then(res => res.json()));
  const [data1, data2] = await Promise.all(promises);

  // Combine the two arrays into one array
  const casesData: CaseDataType[] = [...data1, ...data2];

  const caseMetadata = casesData.map(x => ({ id: x.id, name: x.name }));

  const selectedCase =
    casesData.find(x => x.id === selectedCaseParam) ?? casesData[0];

  return (
    <main id="main" className="relative flex min-h-screen flex-col">
      <CaseSelect availableCases={caseMetadata} />

      <div className="mt-3 flex flex-1 flex-col items-center gap-1">
        <h1 className="text-4xl font-medium text-white">Unlock Container</h1>
        <h4 className="text-xl">
          Unlock <span className="font-semibold">{selectedCase.name}</span>
        </h4>

        <Image
          src={selectedCase.image}
          alt={`${selectedCase.name} image`}
          width={256}
          height={256}
        />
      </div>

      <div className="flex flex-col backdrop-blur-md">
        <div className="my-2 px-4 lg:px-12">
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

        <div className="flex flex-wrap justify-center gap-8 px-2 lg:justify-start lg:px-16">
          {selectedCase.contains.map(item => (
            <Item
              key={item.name}
              itemName={item.name.split(" | ")[0]}
              skinName={item.name.split(" | ")[1]}
              image={item.image}
              grade={item.rarity as GradeType}
            />
          ))}

          {selectedCase.contains_rare.length > 0 && (
            <Item
              itemName={
                selectedCase.name.includes("Glove")
                  ? "★ Gloves ★"
                  : "★ Rare Special Item ★"
              }
              image="/images/rsi.png"
              grade="Rare Special Item"
            />
          )}
        </div>

        <hr className="container mx-auto my-5 px-20 opacity-30" />

        <div className="container mx-auto mb-6 flex items-center justify-between">
          <span className="text-2xl font-bold tracking-wider">
            {!selectedCase.name.toLowerCase().includes("package")
              ? `Use ${selectedCase.name} Key`
              : null}
          </span>
          <div className="flex items-center gap-2">
            <UnlockButton caseData={selectedCase} />

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
