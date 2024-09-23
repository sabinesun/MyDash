import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery } from "react-query";
import { Indicator, IndicatorResponse } from "@/types";
import { DateRange } from "react-day-picker";

type FetchIndicatorsParams = {
  startDate?: string;
  endDate?: string;
  dimensions: string[];
  indicators: string[];
};

type IndicatorLineChartProps = {
  date: DateRange | undefined;
  filteredIds: string[],
  label: string,
  indicators: string[]
}

type IndicatorByDate = {
  date: string;
  [key: `dimension ${string}`]: number;
};

export function IndicatorLineChart({ date, filteredIds, label, indicators }: IndicatorLineChartProps) {
  const { isLoading, error, data } = useQuery({
    queryKey: ["indicators", indicators, date, filteredIds],
    queryFn: () =>
      fetchIndicators({
        startDate: date?.from?.toISOString().split("T")[0],
        endDate: date?.to?.toISOString().split("T")[0],
        dimensions: filteredIds,
        indicators: indicators,
      }),
  });

  if (isLoading || error || !data) return null;

  const chartData = groupDataByDate(data.results)

  const minMax = findMinMax(chartData)

  return (
    <div className="gap-2 rounded border border-primary bg-white p-10">
      <h2 className="mb-8 text-lg">{label}</h2>
      <ChartContainer config={chartConfig(label)}>
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <YAxis type="number" domain={[minMax?.currentMin, minMax?.currentMax]} />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          {filteredIds.map((id) => (
            <Line
              dataKey={`dimension ${id}`}
              type="natural"
              stroke="var(--color-value)"
              strokeWidth={2}
              dot={false}
              key={`label ${id}`}
            />
          ))}
        </LineChart>
      </ChartContainer>
    </div>
  );
}

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

const groupDataByDate = (indicatorsList: Indicator[]) => {
  let groupedIndicators: IndicatorByDate[] = [];

  indicatorsList.forEach(indicator => {
    let dateExist = groupedIndicators.find(item => item.date === indicator.date);

    if (!dateExist) {
      dateExist = { date: indicator.date };
      groupedIndicators.push(dateExist);
    }

    if (dateExist[`dimension ${indicator.dimension}`]) {
      dateExist[`dimension ${indicator.dimension}`] += indicator.value;
    } else {
      dateExist[`dimension ${indicator.dimension}`] = indicator.value;
    }
  });

  return groupedIndicators;
}

const findMinMax = (indicatorByDate: IndicatorByDate[]) => {
  let currentMax = -Infinity;
  let currentMin = Infinity;
  indicatorByDate.map((indicators) => {
    const values = Object.values(indicators).slice(1) as number[];

    const max = Math.max(...values);
    const min = Math.min(...values);

    if (max > currentMax) {
      currentMax = max;
    }

    if (min < currentMin) {
      currentMin = min;
    }
  })
  return { currentMax, currentMin }
}

const chartConfig = (label: string) => {
  return {
    value: {
      label: label,
      color: "hsl(var(--primary))",
    },
  };
};
