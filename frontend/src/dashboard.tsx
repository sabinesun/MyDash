import { useState } from "react";
import * as React from "react";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { Header } from "@/components/header/header.tsx";
import { CardIndicators } from "@/components/card/indicators-card.tsx";

export const Dashboard = ({
  uniqueCountries,
  uniqueBusinessUnit,
  datalist,
}) => {
  const [countries, setCountries] = useState(
    uniqueCountries.map((country) => ({ name: country, isChecked: true })),
  );

  const [businessUnit, setBusinessUnit] = useState(
    uniqueBusinessUnit.map((businessUnit) => ({
      name: businessUnit,
      isChecked: true,
    })),
  );

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: addDays(new Date(), -20),
    to: new Date(),
  });

  const selectedCountries = countries
    .filter((c) => c.isChecked)
    .map((c) => c.name);
  const selectedBusinessUnits = businessUnit
    .filter((b) => b.isChecked)
    .map((b) => b.name);

  const filteredIds = datalist.results
    .filter(
      (item) =>
        selectedCountries.includes(item.country) &&
        selectedBusinessUnits.includes(item.business_unit),
    )
    .map((item) => item.id);

  return (
    <>
      <Header
        countries={countries}
        setCountries={setCountries}
        businessUnit={businessUnit}
        setDate={setDate}
        setBusinessUnit={setBusinessUnit}
        date={date}
      />
      <CardIndicators filteredIds={filteredIds} date={date} />
    </>
  );
};
