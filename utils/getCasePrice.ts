import casePrices from "@/lib/data/casePrices.json";
// Gathered at 2024-01-03

export default (caseName: string): number | null => {
  // casePrices is gotten from https://prices.csgotrader.app/latest/prices_v6.json
  // -> Object.entries(data).map(([name, prices]) => ({ name, prices })).filter(x => (x.name.includes(" Case") || x.name.includes(" Package")) && (!x.name.includes("Hardened") && !x.name.includes("Key") && !x.name.includes("Collection")))
  const currentCasePrices = casePrices.find(x => x.name === caseName)?.prices;

  const currentCasePrice =
    currentCasePrices?.steam.last_24h ||
    currentCasePrices?.steam.last_7d ||
    currentCasePrices?.steam.last_30d ||
    currentCasePrices?.steam.last_90d ||
    null;

  return currentCasePrice;
};
