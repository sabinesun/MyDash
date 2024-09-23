import { Indicator, IndicatorResponse } from "@/types";
import { DateRange } from "react-day-picker";
import { useQuery } from "react-query";
import { CardContent } from "./card-content";

type FetchIndicatorsParams = {
  startDate?: string;
  endDate?: string;
  dimensions: string[];
  indicators: string[];
};

type CardProps = {
  selectedDimensions: string[];
  date: DateRange | undefined;
  label: string;
  cardIndicators: string[];
  icon: JSX.Element;
  unit?: string;
}

export const Card = ({ selectedDimensions, date, label, cardIndicators, unit, icon }: CardProps) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["indicators", cardIndicators, date, selectedDimensions],
    queryFn: () =>
      fetchIndicators({
        startDate: date?.from?.toISOString().split("T")[0],
        endDate: date?.to?.toISOString().split("T")[0],
        dimensions: selectedDimensions,
        indicators: cardIndicators,
      }),
  });

  if (isLoading) {
    return <CardContent label={label} icon={icon} value="loading" />
  }

  if (error) {
    return <CardContent label={label} icon={icon} value="error" />

  }

  if (!data || selectedDimensions.length === 0) {
    return <CardContent label={label} icon={icon} value="no data" />
  }

  const value = label === "Gender Parity Ratio"
    ? genderRatio(data.results)
    : totalValue(data.results, cardIndicators)

  return <CardContent label={label} icon={icon} value={value} unit={unit} />
};

const createParams = (paramName: string, values: string[]) =>
  values.map((value) => `&${paramName}=${value}`).join("");

const fetchIndicators = async ({ startDate, endDate, dimensions, indicators }: FetchIndicatorsParams): Promise<IndicatorResponse> => {
  const url = `http://localhost:8080/indicators?start=${startDate}&end=${endDate}${createParams("indicators", indicators)}${createParams("dimensions", dimensions)}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
};

const totalValue = (indicatorList: Indicator[], indicators: string[]) => {
  return indicatorList.filter((item) => indicators.includes(item.indicator))
    .reduce((sum, item) => sum + item.value, 0).toString();
}

const genderRatio = (indicatorList: Indicator[]) => {
  const totalFemaleHeadcount = indicatorList
    .filter((item) => item.indicator === "female_headcount")
    .reduce((sum, item) => sum + item.value, 0);

  const totalMaleHeadcount = indicatorList
    .filter((item) => item.indicator === "male_headcount")
    .reduce((sum, item) => sum + item.value, 0);

  return ((totalFemaleHeadcount / (totalFemaleHeadcount + totalMaleHeadcount)) * 100).toFixed(2);
}

