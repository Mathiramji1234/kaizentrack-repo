export interface HeatmapDay {
  date: string;
  productivity: number;
  color: string;
  future: boolean;
}

export const getMonthHeatmapData = (
  currentMonth: Date
) => {
  const saved =
    localStorage.getItem(
      "productivityHistory"
    );

  const history = saved
    ? JSON.parse(saved)
    : [];

  const year =
    currentMonth.getFullYear();

  const month =
    currentMonth.getMonth();

  const daysInMonth =
    new Date(
      year,
      month + 1,
      0
    ).getDate();

  const today = new Date();

  const result: HeatmapDay[] = [];

  for (
    let day = 1;
    day <= daysInMonth;
    day++
  ) {
    const currentDate =
      new Date(
        year,
        month,
        day
      );

    const dateString =
      currentDate
        .toISOString()
        .split("T")[0];

    const record =
      history.find(
        (item: any) =>
          item.date ===
          dateString
      );

    const isFuture =
      currentDate >
      new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      );

    let color = "#1e293b";

    if (isFuture) {
      color = "transparent";
    }
    else if (
      record?.productivity >= 90
    ) {
      color = "#D4AF37"; // Gold
    }
    else if (
      record?.productivity >=
      82.6
    ) {
      color = "#C0C0C0"; // Silver
    }
    else if (
      record?.productivity >=
      75
    ) {
      color = "#CD7F32"; // Bronze
    }
    else if (
      record?.productivity > 0
    ) {
      color = "#22C55E"; // Green
    }
    else {
      color = "#1e293b"; // Empty past day
    }

    result.push({
      date: dateString,
      productivity:
        record?.productivity ||
        0,
      color,
      future: isFuture,
    });
  }

  return result;
};