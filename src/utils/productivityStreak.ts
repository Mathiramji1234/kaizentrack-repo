interface ProductivityRecord {
  date: string;
  productivity: number;
}

export const calculateProductivityStreak =
  (): number => {
    const saved =
      localStorage.getItem(
        "productivityHistory"
      );

    if (!saved) return 0;

    const history: ProductivityRecord[] =
      JSON.parse(saved);

    if (history.length === 0)
      return 0;

    const historyMap = new Map(
      history.map((item) => [
        item.date,
        item,
      ])
    );

    let streak = 0;

    const currentDate =
      new Date();

    // Maximum days we need to check
    // is the amount of history we have
    let checkedDays = 0;

    while (
      checkedDays <=
      history.length + 30
    ) {
      const dateString =
        currentDate
          .toISOString()
          .split("T")[0];

      const record =
        historyMap.get(dateString);

      if (!record) {
        currentDate.setDate(
          currentDate.getDate() - 1
        );
        checkedDays++;
        continue;
      }

      if (
        record.productivity >= 75
      ) {
        streak++;

        currentDate.setDate(
          currentDate.getDate() - 1
        );
        checkedDays++;
        continue;
      }
      break;
    }

    return streak;
  };