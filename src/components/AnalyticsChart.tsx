import { useState } from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import {
  get7DaysData,
  getMonthData,
  getYearData,
  get5YearsData,
} from "../utils/analyticsData";

const AnalyticsChart = () => {
  const [period, setPeriod] =
    useState("7days");

const chartData =
  period === "7days"
    ? get7DaysData()
    : period === "month"
    ? getMonthData()
    : period === "year"
    ? getYearData()
    : get5YearsData();

  return (
    <div className="bg-slate-900 rounded-xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          📈 Productivity Analytics
        </h2>

        <select
          value={period}
          onChange={(e) =>
            setPeriod(e.target.value)
          }
          className="
            bg-slate-800
            border
            border-slate-700
            px-4
            py-2
            rounded-lg
            text-white
          "
        >
          <option value="7days">
            Last 7 Days
          </option>

          <option value="month">
            Last 1 Month
          </option>

          <option value="year">
            Last 1 Year
          </option>

          <option value="5years">
            Last 5 Years
          </option>
        </select>
      </div>

      <div className="h-[350px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
            />

            <XAxis
              dataKey="label"
              stroke="#94a3b8"
            />

            <YAxis
              domain={[0, 100]}
              stroke="#94a3b8"
            />

            <Tooltip
              contentStyle={{
                backgroundColor:
                  "#0f172a",
                border:
                  "1px solid #334155",
                borderRadius: "8px",
                color: "#fff",
              }}
            />

            <Line
              type="monotone"
              dataKey="productivity"
              stroke="#8b5cf6"
              strokeWidth={4}
              dot={{
                r: 5,
                fill: "#8b5cf6",
              }}
              activeDot={{
                r: 8,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsChart;