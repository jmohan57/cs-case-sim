// Valve (at least in CS) always use 2 decimal places

export const formatDecimal = (
  number: number,
  minimumFractionDigits = 2,
  maximumFractionDigits = 2,
) =>
  (isNaN(number) ? 0 : number).toLocaleString("en", {
    minimumFractionDigits,
    maximumFractionDigits,
  });

export const formatPercentage = (
  number: number,
  minimumFractionDigits = 2,
  maximumFractionDigits = 2,
) =>
  (isNaN(number) ? 0 : number).toLocaleString("en", {
    style: "percent",
    minimumFractionDigits,
    maximumFractionDigits,
  });
