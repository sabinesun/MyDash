import { Card } from "@/components/card/card.tsx";
import { Cloud, Percent, Users, Wallet } from "lucide-react";
import { DateRange } from "react-day-picker";

type CardContainerProps = {
  selectedDimensions: string[];
  date: DateRange | undefined;
}

export const CardContainer = ({ selectedDimensions, date }: CardContainerProps) => {
  return (
    <div className="grid grid-cols-4 gap-6 m-10">
      <Card
        selectedDimensions={selectedDimensions}
        date={date}
        label="Total Revenue"
        cardIndicators={["total_revenue"]}
        icon={<Wallet size={24} className="text-primary" />}
      />
      <Card
        selectedDimensions={selectedDimensions}
        date={date}
        label="CO₂ emissions"
        cardIndicators={["co2_emissions"]}
        unit="t CO₂"
        icon={<Cloud size={24} className="text-primary" />}
      />
      <Card
        selectedDimensions={selectedDimensions}
        date={date}
        label="Total Headcount"
        cardIndicators={["female_headcount", "male_headcount"]}
        icon={<Users size={24} className="text-primary" />}
      />
      <Card
        selectedDimensions={selectedDimensions}
        date={date}
        label="Gender Parity Ratio"
        cardIndicators={["female_headcount", "male_headcount"]}
        unit="%"
        icon={<Percent size={24} className="text-primary" />}
      />
    </div>
  );
};
