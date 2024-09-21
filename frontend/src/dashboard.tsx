import { useState } from "react";
import { DateRange } from "react-day-picker";
import { subDays } from "date-fns";
import { Header } from "@/components/header/header.tsx";
import { CardIndicators } from "@/components/card/indicators-card.tsx";
import { Dimension, SelectionItem } from "./types";
import { LineChartContainer } from "./components/chart/chart-container";

type DashboardProps = {
  dimensionsList: Dimension[];
}

export const Dashboard = ({
  dimensionsList,
}: DashboardProps) => {

  const countriesList = getUniqueList(dimensionsList.map(item => item.country));
  const businessUnitsList = getUniqueList(dimensionsList.map(item => item.business_unit));

  const [countries, setCountries] = useState(initializeSelectionList(countriesList));
  const [businessUnits, setBusinessUnits] = useState(initializeSelectionList(businessUnitsList));
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 60),
    to: new Date(),
  });

  const selectedDimensions = getFilteredDimensionsId(dimensionsList, countries, businessUnits)

  return (
    <>
      <Header
        countries={countries}
        setCountries={setCountries}
        businessUnit={businessUnits}
        setDate={setDate}
        setBusinessUnit={setBusinessUnits}
        date={date}
      />
      <CardIndicators filteredIds={selectedDimensions} date={date} />
      <LineChartContainer selectedDimensions={selectedDimensions} date={date} />
    </>
  );
};


const getSelectedItem = (itemList: SelectionItem[]) => {
  return itemList.filter((item) => item.isChecked).map((item) => item.name)
}

const getFilteredDimensionsId = (dimensionsList: Dimension[], countries: SelectionItem[], businessUnits: SelectionItem[]) => {
  return dimensionsList.filter(
    (dimensions) =>
      getSelectedItem(countries).includes(dimensions.country) &&
      getSelectedItem(businessUnits).includes(dimensions.business_unit),
  )
    .map((dimensions) => dimensions.id);
}

const getUniqueList = (list: string[]) => [...new Set(list)];

const initializeSelectionList = (list: string[]) => list.map(name => ({ name, isChecked: true }));

