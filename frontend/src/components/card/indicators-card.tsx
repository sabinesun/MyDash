import { Card } from "@/components/card/card.tsx";
import { Cloud, Percent, Users, Wallet } from "lucide-react";
import * as React from "react";

export const CardIndicators = ({ filteredIds, date }) => {
  return (
    <div className="grid grid-cols-4 gap-2">
      <Card
        filteredIds={filteredIds}
        date={date}
        label="Total Revenue"
        indicators={["total_revenue"]}
        unit="$"
        icon={<Wallet size={24} className="text-primary" />}
      />
      <Card
        filteredIds={filteredIds}
        date={date}
        label="Co2 Emissions"
        indicators={["co2_emissions"]}
        icon={<Cloud size={24} className="text-primary" />}
      />
      <Card
        filteredIds={filteredIds}
        date={date}
        label="Total Headcount"
        indicators={["female_headcount", "male_headcount"]}
        icon={<Users size={24} className="text-primary" />}
      />
      <Card
        filteredIds={filteredIds}
        date={date}
        label="Gender Parity Ratio"
        indicators={["female_headcount", "male_headcount"]}
        unit="%"
        icon={<Percent size={24} className="text-primary" />}
      />
    </div>
  );
};
