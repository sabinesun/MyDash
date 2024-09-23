import { BackpackIcon, GlobeIcon } from "@radix-ui/react-icons";
import { DatePickerWithRange } from "@/components/ui/date-range.tsx";
import { SelectionItem } from "@/types";
import { DateRange } from "react-day-picker";
import { Dispatch, SetStateAction } from "react";
import { FilterButton } from "../filter/filter-button";
import { FilterBadge } from "../filter/filter-badge";
import { Typography } from "../typography/typography";

type HeaderProps = {
  countries: SelectionItem[];
  setCountries: Dispatch<SetStateAction<SelectionItem[]>>;
  businessUnit: SelectionItem[];
  setBusinessUnit: Dispatch<SetStateAction<SelectionItem[]>>;
  date: DateRange | undefined;
  setDate: Dispatch<SetStateAction<DateRange | undefined>>;
}

export const Header = ({
  countries,
  setCountries,
  businessUnit,
  setBusinessUnit,
  date,
  setDate,
}: HeaderProps) => {
  return (
    <>
      <header className="m-2 flex items-center">
        <Typography type="h1" text="MyDash." />
        <div className="ml-6 flex">
          <FilterButton
            list={countries}
            setList={setCountries}
            label="Country"
            icon={<GlobeIcon />}
          />
          <FilterButton
            list={businessUnit}
            setList={setBusinessUnit}
            label="Business Unit"
            icon={<BackpackIcon />}
          />
          <DatePickerWithRange date={date} setDate={setDate} />
        </div>
      </header>
      <div className="m-4 flex gap-2">
        <FilterBadge list={countries} setList={setCountries} />
        <FilterBadge list={businessUnit} setList={setBusinessUnit} />
      </div>
    </>
  );
};
