export const formatDecimal = (
  number: number,
  minimumFractionDigits = 2,
  maximumFractionDigits = 8 ,
) =>
  (isNaN(number) ? 0 : number).toLocaleString("en", {
    minimumFractionDigits,
    maximumFractionDigits,
  });

export const formatPercentage = (
  number: number,
  minimumFractionDigits = 2,
  maximumFractionDigits = 5,
) =>
  (isNaN(number) ? 0 : number).toLocaleString("en", {
    style: "percent",
    minimumFractionDigits,
    maximumFractionDigits,
    maximumFractionDigits,
    maximumFractionDigits,
  });
