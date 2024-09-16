import { Filter } from "@/components/filter/dropdown-filter.tsx";
import { BadgeFilter } from "@/components/filter/badge-filter.tsx";
import { BackpackIcon, GlobeIcon } from "@radix-ui/react-icons";
import { DatePickerWithRange } from "@/components/ui/date-range.tsx";
import * as React from "react";

export const Header = ({
  countries,
  setCountries,
  businessUnit,
  setBusinessUnit,
  date,
  setDate,
}) => {
  return (
    <>
      <header className="m-2 flex items-center">
        <h1 className="mr-8 text-4xl font-bold">MyDash.</h1>
        <Filter
          list={countries}
          setList={setCountries}
          label="Country"
          icon={<GlobeIcon />}
        />
        <Filter
          list={businessUnit}
          setList={setBusinessUnit}
          label="Business Unit"
          icon={<BackpackIcon />}
        />
        <DatePickerWithRange date={date} setDate={setDate} />
      </header>
      <div className="m-4 flex gap-2">
        <BadgeFilter list={countries} setList={setCountries} />
        <BadgeFilter list={businessUnit} setList={setBusinessUnit} />
      </div>
    </>
  );
};
