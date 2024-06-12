import casePrices from "@/lib/data/casePrices.json";
// Gathered at 2024-01-03

export default (caseName: string): number | null => {
  const currentCasePrices = casePrices.find(x => x.name === caseName)?.prices;

  const currentCasePrice =
    currentCasePrices?.steam.last_24h ||
    currentCasePrices?.steam.last_7d ||
    currentCasePrices?.steam.last_30d ||
    currentCasePrices?.steam.last_90d ||
    null;

  return currentCasePrice;
};
