import type { ScheduleItem } from "../types/Schedule";

export const updateTodayProductivity = (
  tasks: ScheduleItem[]
) => {
  const today =
    new Date().toISOString().split("T")[0];

  const totalTasks = tasks.length;

  if (totalTasks === 0) return;

  const completedTasks =
    tasks.filter(
      (task) => task.completed
    ).length;

  const productivity = Math.round(
    (completedTasks / totalTasks) * 100
  );

  const saved =
    localStorage.getItem(
      "productivityHistory"
    );

  const history = saved
    ? JSON.parse(saved)
    : [];

  const existingIndex =
    history.findIndex(
      (item: any) =>
        item.date === today
    );

  if (existingIndex !== -1) {
    history[existingIndex].productivity =
      productivity;
  } else {
    history.push({
      date: today,
      productivity,
    });
  }

  localStorage.setItem(
    "productivityHistory",
    JSON.stringify(history)
  );
};