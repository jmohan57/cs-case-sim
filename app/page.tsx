import { Metadata } from "next";
import customCasesLocal from "@/lib/data/customCases.json";
import casesMetadata from "@/lib/data/allCasesMetadata.json"; // https://bymykel.github.io/CSGO-API/api/en/crates.json -> json.map(x => ({ id: x.id, name: x.name }))
import CaseSelect from "@/components/CaseSelect";
import AboutButtonWithModal from "@/components/AboutButtonWithModal";
import UnlockButton from "@/components/UnlockButton";
import Button from "@/components/Button";
import getCasePrice from "@/utils/getCasePrice";
import { CaseDataType } from "@/types";
import CaseItems from "@/components/CaseItems";

type PageProps = {
  searchParams: { case?: string; key?: string };
};

export const generateMetadata = ({ searchParams }: PageProps): Metadata => {
  const caseName = casesMetadata.find(x => x.id === searchParams.case)?.name;

  return {
    title: caseName
      ? `${caseName} | Counter-Strike Case Simulator`
      : "Counter-Strike Case Simulator",
  };
};

export default async function Home({ searchParams }: PageProps) {
  const { case: selectedCaseParam } = searchParams;

  const apis: { url: string; revalidateSeconds: number }[] = [
    {
      url: "https://bymykel.github.io/CSGO-API/api/en/crates/cases.json",
      revalidateSeconds: 3600,
    },
    {
      url: "https://bymykel.github.io/CSGO-API/api/en/crates/souvenir.json",
      revalidateSeconds: 3600,
    },
    ...(searchParams.key
      ? [
          {
            url: `https://case-sim-custom-case.ragnarok.workers.dev/cases?key=${searchParams.key}`,
            revalidateSeconds: 0,
          },
        ]
      : []),
  ].filter(Boolean);

  // Fetch both endpoints
  const promises = apis.map(api =>
    fetch(api.url, {
      next: { revalidate: api.revalidateSeconds },
    }).then(res => res.json()),
  );

  const [cases, souvenirPackages, customCasesFromAPI] =
    await Promise.all(promises);

  // Combine the case data arrays
  const casesData: CaseDataType[] = [
    ...cases,
    ...(searchParams.key ? customCasesFromAPI : []),
    ...customCasesLocal,
    ...souvenirPackages,
  ];

  const caseMetadata = casesData.map(x => ({
    id: x.id,
    name: x.name,
    image: x.image,
  }));

  const selectedCase =
    casesData.find(x => x.id === selectedCaseParam) ?? casesData[0];

  const selectedCasePrice = getCasePrice(selectedCase.name);

  return (
    <main id="main" className="relative flex min-h-screen select-none flex-col">
      {/* Notice message */}
      {/* {selectedCase.id !== "crate-4904" && (
        <Button
          variant="secondary-darker"
          href="/?case=crate-4904"
          className="mx-2 mt-1 flex w-fit items-center gap-2 py-1 backdrop-blur-md"
        >
          Try the new Kilowatt Case
          <Image
            src="https://raw.githubusercontent.com/ByMykel/CSGO-API/1675e7262bd51fdba1d74664fd4b4fc06a50bb12/public/images/econ/weapon_cases/crate_community_33.png"
            alt="Kilowatt Case"
            width={256 / 7}
            height={198 / 7}
          />
        </Button>
      )} */}

      {/* Header row */}
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

      {/* Case display */}
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

      {/* Item display */}
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
          <CaseItems
            items={selectedCase.contains}
            rareItems={selectedCase.contains_rare}
          />
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
