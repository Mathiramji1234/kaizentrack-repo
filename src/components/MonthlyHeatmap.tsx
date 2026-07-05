import { useState } from "react";
import { getMonthHeatmapData } from "../utils/heatmapData";

const MonthlyHeatmap = () => {
  const [currentMonth, setCurrentMonth] =
    useState(new Date());

  const data =
    getMonthHeatmapData(
      currentMonth
    );

  const previousMonth = () => {
    setCurrentMonth((prev) => {
      const date = new Date(prev);
      date.setMonth(
        date.getMonth() - 1
      );
      return date;
    });
  };

  const nextMonth = () => {
    setCurrentMonth((prev) => {
      const date = new Date(prev);
      date.setMonth(
        date.getMonth() + 1
      );
      return date;
    });
  };

  return (
    <div className="bg-slate-900 rounded-xl p-6">

      <div className="flex justify-between items-center mb-6">

        <button
          onClick={previousMonth}
          className="
            bg-slate-800
            px-3
            py-2
            rounded-lg
            hover:bg-slate-700
          "
        >
          ←
        </button>

        <h2 className="text-xl font-semibold">
          📅{" "}
          {currentMonth.toLocaleDateString(
            "en-US",
            {
              month: "long",
              year: "numeric",
            }
          )}
        </h2>

        <button
          onClick={nextMonth}
          className="
            bg-slate-800
            px-3
            py-2
            rounded-lg
            hover:bg-slate-700
          "
        >
          →
        </button>

      </div>

      <div className="grid grid-cols-7 gap-2">
        {data.map((day) => (
          <div
            key={day.date}
            className={`
              w-8
              h-8
              rounded-md
              ${
                day.future
                  ? "border border-slate-600"
                  : ""
              }
            `}
            style={{
              backgroundColor:
                day.color,
            }}
            title={`${day.date} ${day.productivity}%`}
          />
        ))}
      </div>

    </div>
  );
};

export default MonthlyHeatmap;