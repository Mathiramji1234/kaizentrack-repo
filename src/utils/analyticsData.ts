interface ProductivityRecord {
  date: string;
  productivity: number;
}

// 1. Last 7 Days
export const get7DaysData = () => {
  const saved =
    localStorage.getItem(
      "productivityHistory"
    );

  if (!saved) return [];

  const history: ProductivityRecord[] =
    JSON.parse(saved);

  const result = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date();

    date.setDate(
      date.getDate() - i
    );

    const dateString =
      date.toISOString().split("T")[0];

    const record = history.find(
      (item) =>
        item.date === dateString
    );

    result.push({
      label:
        date.toLocaleDateString(
          "en-US",
          {
            weekday: "short",
          }
        ),
      productivity:
        record?.productivity || 0,
    });
  }

  return result;
};



// 2. Last 1 Month

// This gives:

// Week 1
// Week 2
// Week 3
// Week 4
// Week 5
// Average productivity.

export const getMonthData = () => {
  const saved =
    localStorage.getItem(
      "productivityHistory"
    );

  if (!saved) return [];

  const history: ProductivityRecord[] =
    JSON.parse(saved);

  const weeks = [
    [],
    [],
    [],
    [],
    [],
  ] as number[][];

  const now = new Date();

  history.forEach((item) => {
    const itemDate =
      new Date(item.date);

    const diffDays =
      Math.floor(
        (now.getTime() -
          itemDate.getTime()) /
          (1000 *
            60 *
            60 *
            24)
      );

    if (
      diffDays >= 0 &&
      diffDays < 35
    ) {
      const weekIndex =
        Math.floor(
          diffDays / 7
        );

      weeks[weekIndex].push(
        item.productivity
      );
    }
  });

  return weeks.map(
    (week, index) => ({
      label: `W${index + 1}`,
      productivity:
        week.length > 0
          ? Math.round(
              week.reduce(
                (a, b) => a + b,
                0
              ) / week.length
            )
          : 0,
    })
  );
};


// 3. Last 1 Year

// This gives:

// Jan
// Feb
// Mar
// ...
// Dec

// Average productivity.

export const getYearData = () => {
  const saved =
    localStorage.getItem(
      "productivityHistory"
    );

  if (!saved) return [];

  const history: ProductivityRecord[] =
    JSON.parse(saved);

  const result = [];

  for (let i = 11; i >= 0; i--) {
    const date = new Date();

    date.setMonth(
      date.getMonth() - i
    );

    const month =
      date.getMonth();

    const year =
      date.getFullYear();

    const records =
      history.filter((item) => {
        const d =
          new Date(item.date);

        return (
          d.getMonth() === month &&
          d.getFullYear() === year
        );
      });

    const avg =
      records.length > 0
        ? Math.round(
            records.reduce(
              (sum, item) =>
                sum +
                item.productivity,
              0
            ) / records.length
          )
        : 0;

    result.push({
      label:
        date.toLocaleDateString(
          "en-US",
          {
            month: "short",
          }
        ) +
        " " +
        year,

      productivity: avg,
    });
  }

  return result;
};


//Last 5 Years
export const get5YearsData = () => {
  const saved =
    localStorage.getItem(
      "productivityHistory"
    );

  if (!saved) return [];

  const history =
    JSON.parse(saved);

  const currentYear =
    new Date().getFullYear();

  const result = [];

  for (
    let year =
      currentYear - 4;
    year <= currentYear;
    year++
  ) {
    const records =
      history.filter((item: any) => {
        return (
          new Date(
            item.date
          ).getFullYear() ===
          year
        );
      });

    const avg =
      records.length > 0
        ? Math.round(
            records.reduce(
              (
                sum: number,
                item: any
              ) =>
                sum +
                item.productivity,
              0
            ) / records.length
          )
        : 0;

    result.push({
      label:
        year.toString(),
      productivity: avg,
    });
  }

  return result;
};