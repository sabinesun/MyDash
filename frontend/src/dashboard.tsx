import { useState } from "react";
import * as React from "react";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { Header } from "@/components/header/header.tsx";

export const Dashboard = ({ uniqueCountries, uniqueBusinessUnit }) => {
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

  return (
    <Header
      countries={countries}
      setCountries={setCountries}
      businessUnit={businessUnit}
      setDate={setDate}
      setBusinessUnit={setBusinessUnit}
      date={date}
    />
  );
};
