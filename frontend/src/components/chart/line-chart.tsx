import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery } from "react-query";

const fetchIndicators = async ({ start, end, dimensions, indicators }) => {
  const dimensionParams = dimensions
    .map((number) => `&dimension=${number}`)
    .join("");

  const indicatorsParams = indicators
    .map((indicator) => `&indicators=${indicator}`)
    .join("");

  const response = await fetch(
    `http://localhost:8080/indicators?start=${start}&end=${end}${indicatorsParams}${dimensionParams}`,
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
};

const chartConfig = ({ label }) => {
  return {
    value: {
      label: label,
      color: "hsl(var(--primary))",
    },
  };
};

export function IndicatorLineChart({ date, filteredIds, label, indicators }) {
  const { isLoading, error, data } = useQuery({
    queryKey: ["indicators", indicators, date, filteredIds],
    queryFn: () =>
      fetchIndicators({
        start: date?.from?.toISOString().split("T")[0],
        end: date?.to?.toISOString().split("T")[0],
        dimensions: filteredIds,
        indicators: indicators,
      }),
  });

  if (isLoading || error) return null;

  const isSingleIndicator = indicators.length === 1;

  const chartData = Object.values(
    isSingleIndicator ? groupDataByDate(data) : groupDataByDateHeadcount(data),
  );

  const minMax = isSingleIndicator
    ? findMinMax(chartData)
    : findMinMaxHeadcount(chartData);

  return (
    <div className="gap-2 bg-white p-10">
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
          <YAxis type="number" domain={[minMax?.smallest, minMax?.largest]} />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          {filteredIds.map((id) => (
            <Line
              dataKey={isSingleIndicator ? id : `${id}.total`}
              type="natural"
              stroke="var(--color-value)"
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      </ChartContainer>
    </div>
  );
}

const groupDataByDate = (data) => {
  return data.results.reduce((acc, entry) => {
    if (!acc[entry.date]) {
      acc[entry.date] = { date: entry.date };
    }
    acc[entry.date][entry.dimension] = entry.value;
    return acc;
  }, {});
};

const findMinMax = (dataArray) => {
  return dataArray.reduce(
    (acc, obj) => {
      acc.smallest = Math.min(acc.smallest, obj.a, obj.b);
      acc.largest = Math.max(acc.largest, obj.a, obj.b);
      return acc;
    },
    { smallest: Infinity, largest: -Infinity },
  );
};

const groupDataByDateHeadcount = (data) => {
  return data.results.reduce((acc, entry) => {
    if (!acc[entry.date]) {
      acc[entry.date] = { date: entry.date };
    }

    if (!acc[entry.date][entry.dimension]) {
      acc[entry.date][entry.dimension] = {
        female: 0,
        male: 0,
        total: 0,
      };
    }

    if (entry.indicator === "female_headcount") {
      acc[entry.date][entry.dimension].female = entry.value;
    } else if (entry.indicator === "male_headcount") {
      acc[entry.date][entry.dimension].male = entry.value;
    }

    acc[entry.date][entry.dimension].total =
      acc[entry.date][entry.dimension].female +
      acc[entry.date][entry.dimension].male;

    return acc;
  }, {});
};

const findMinMaxHeadcount = (dataArray) => {
  return dataArray.reduce(
    (acc, obj) => {
      Object.values(obj).forEach((dimension) => {
        if (dimension.total) {
          acc.smallest = Math.min(acc.smallest, dimension.total);
          acc.largest = Math.max(acc.largest, dimension.total);
        }
      });

      return acc;
    },
    { smallest: Infinity, largest: -Infinity },
  );
};
