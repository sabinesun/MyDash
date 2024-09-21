import { DateRange } from "react-day-picker";
import { IndicatorLineChart } from "./line-chart"

type LineChartContainerProps = {
    selectedDimensions: string[];
    date: DateRange | undefined;
}

export const LineChartContainer = ({ selectedDimensions, date }: LineChartContainerProps) => {
    return <div className="m-10 grid grid-cols-3 gap-6">
        <IndicatorLineChart
            filteredIds={selectedDimensions}
            date={date}
            label="Revenue"
            indicators={["total_revenue"]}
        />
        <IndicatorLineChart
            filteredIds={selectedDimensions}
            date={date}
            label="CO₂ emissions"
            indicators={["co2_emissions"]}
        />
        <IndicatorLineChart
            filteredIds={selectedDimensions}
            date={date}
            label="Headcount"
            indicators={["female_headcount", "male_headcount"]}
        />
    </div>
}