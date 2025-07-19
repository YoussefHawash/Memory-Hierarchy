"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from "recharts";

export const description =
  "CPI vs L1 Line Size for different memory generators";

const cpiData = [
  {
    lineSize: "16 B",
    Generator1: 1.45,
    Generator2: 1.2,
    Generator3: 1.8,
    Generator4: 1.25,
    Generator5: 1.6,
  },
  {
    lineSize: "32 B",
    Generator1: 1.25,
    Generator2: 1.12,
    Generator3: 1.75,
    Generator4: 1.18,
    Generator5: 1.45,
  },
  {
    lineSize: "64 B",
    Generator1: 1.18,
    Generator2: 1.09,
    Generator3: 1.73,
    Generator4: 1.14,
    Generator5: 1.35,
  },
  {
    lineSize: "128 B",
    Generator1: 1.17,
    Generator2: 1.09,
    Generator3: 1.71,
    Generator4: 1.13,
    Generator5: 1.3,
  },
];

// Map each generator to its label & CSS‑driven color
const chartConfig = {
  Generator1: { label: "Generator1", color: "var(--chart-1)" },
  Generator2: { label: "Generator2", color: "var(--chart-2)" },
  Generator3: { label: "Generator3", color: "var(--chart-3)" },
  Generator4: { label: "Generator4", color: "var(--chart-4)" },
  Generator5: { label: "Generator5", color: "var(--chart-5)" },
} satisfies ChartConfig;

export function CpiLineChart() {
  const datamax = cpiData.reduce(
    (max, item) =>
      Math.max(
        max,
        item.Generator1,
        item.Generator2,
        item.Generator3,
        item.Generator4,
        item.Generator5
      ),

    0
  );
  const datamin = cpiData.reduce(
    (min, item) =>
      Math.min(
        min,
        item.Generator1,
        item.Generator2,
        item.Generator3,
        item.Generator4,
        item.Generator5
      ),
    Infinity
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>CPI vs L1 Line Size</CardTitle>
        <CardDescription>Dummy data for five memory generators</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            data={cpiData}
            margin={{ top: 0, right: 12, bottom: 0, left: 12 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="lineSize"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              domain={[1, datamax + 0.2]}
            />
            <Legend verticalAlign="top" align="right" iconType="plainline" />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="Generator1"
              type="monotone"
              stroke="var(--chart-1)"
              strokeWidth={2}
              dot={{ fill: "var(--chart-1)" }}
              activeDot={{ r: 6 }}
            />
            <Line
              dataKey="Generator2"
              type="monotone"
              stroke="var(--chart-2)"
              strokeWidth={2}
              dot={{ fill: "var(--chart-2)" }}
              activeDot={{ r: 6 }}
            />
            <Line
              dataKey="Generator3"
              type="monotone"
              stroke="var(--chart-3)"
              strokeWidth={2}
              dot={{ fill: "var(--chart-3)" }}
              activeDot={{ r: 6 }}
            />
            <Line
              dataKey="Generator4"
              type="monotone"
              stroke="var(--chart-4)"
              strokeWidth={2}
              dot={{ fill: "var(--chart-4)" }}
              activeDot={{ r: 6 }}
            />
            <Line
              dataKey="Generator5"
              type="monotone"
              stroke="var(--chart-5)"
              strokeWidth={2}
              dot={{ fill: "var(--chart-5)" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
    </Card>
  );
}
