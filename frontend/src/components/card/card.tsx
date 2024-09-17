import * as React from "react";
import { useQuery } from "react-query";

const fetchIndicators = async ({ start, end, dimensions, indicators }) => {
  const dimensionParams = dimensions
    .map((number) => `&dimension=${number}`)
    .join("");

  const indicatorsParams = indicators
    .map((indicator) => `&indicators=${indicator}`)
    .join("");

  const response = await fetch(
    `http://localhost:8080/indicators?start=${start}&end=${end}${indicatorsParams}${dimensionParams}`,
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
};

export const Card = ({ filteredIds, date, label, indicators, unit, icon }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["indicators", indicators, date, filteredIds],
    queryFn: () =>
      fetchIndicators({
        start: date?.from?.toISOString().split("T")[0],
        end: date?.to?.toISOString().split("T")[0],
        dimensions: filteredIds,
        indicators: indicators,
      }),
  });

  if (isLoading || error)
    return (
      <div className="flex w-full max-w-96 flex-col gap-2 rounded-md border border-primary bg-white p-8">
        <div className="flex gap-2">
          {icon}
          <h2 className="text-lg">{label}</h2>
        </div>
      </div>
    );

  const totalIndicatorValue = data.results
    .filter((item) => indicators.includes(item.indicator))
    .reduce((sum, item) => sum + item.value, 0);

  const totalFemaleHeadcount = data.results
    .filter((item) => item.indicator === "female_headcount")
    .reduce((sum, item) => sum + item.value, 0);

  const totalMaleHeadcount = data.results
    .filter((item) => item.indicator === "male_headcount")
    .reduce((sum, item) => sum + item.value, 0);

  const genderRatio =
    (totalFemaleHeadcount / (totalFemaleHeadcount + totalMaleHeadcount)) * 100;

  return (
    <div className="flex w-full max-w-96 flex-col gap-2 rounded-md border border-primary bg-white p-8">
      <div className="flex gap-2">
        {icon}
        <h2 className="text-lg">{label}</h2>
      </div>
      <p className="flex justify-end text-4xl">
        {label === "Gender Parity Ratio"
          ? genderRatio.toFixed(2)
          : totalIndicatorValue}
        {unit}
      </p>
    </div>
  );
};
