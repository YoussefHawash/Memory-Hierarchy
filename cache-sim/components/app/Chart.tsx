"use client";

import { useMemory } from "@/components/memorycontext";
import { Button } from "@/components/ui/button"; // ← import Button
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
import React from "react";
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from "recharts";

type ChartConfigEntry = { label: string; color: string };
const chartConfig: Record<string, ChartConfigEntry> = {
  Generator1: { label: "1", color: "var(--chart-1)" },
  Generator2: { label: "2", color: "var(--chart-2)" },
  Generator3: { label: "3", color: "var(--chart-3)" },
  Generator4: { label: "4", color: "var(--chart-4)" },
  Generator5: { label: "5", color: "var(--chart-5)" },
};

export function CpiLineChart() {
  const { results } = useMemory();

  // 1) transform raw stats into recharts‑friendly array
  const cpiData = React.useMemo(() => {
    const grouped = results.reduce((acc, { CPI, Generator, LineSize }) => {
      const key = `${LineSize} B`;
      acc[key] ||= { lineSize: key } as Record<string, any>;
      acc[key][`Generator${Generator}`] = CPI;
      return acc;
    }, {} as Record<string, any>);

    return Object.values(grouped);
  }, [results]);

  // 3) state to track which series are visible
  const allKeys = Object.keys(chartConfig);
  const [visible, setVisible] = React.useState<string[]>([...allKeys]);

  const toggle = (key: string) =>
    setVisible((v) =>
      v.includes(key) ? v.filter((k) => k !== key) : [...v, key]
    );

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          CPI vs L1 Line Size for different memory generators
        </CardTitle>
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
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <Legend verticalAlign="top" align="right" iconType="plainline" />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

            {/* 5) Only render Lines for visible generators */}
            {allKeys
              .filter((key) => visible.includes(key))
              .map((key) => (
                <Line
                  key={key}
                  dataKey={key}
                  type="monotone"
                  stroke={chartConfig[key].color}
                  strokeWidth={2}
                  dot={{ fill: chartConfig[key].color }}
                  activeDot={{ r: 6 }}
                />
              ))}
          </LineChart>
        </ChartContainer>
      </CardContent>

      <CardFooter>
        <div className="flex flex-wrap gap-2 mx-auto">
          {allKeys.map((key) => (
            <Button
              key={key}
              size="sm"
              variant={visible.includes(key) ? "default" : "outline"}
              onClick={() => toggle(key)}
            >
              {chartConfig[key].label}
            </Button>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
