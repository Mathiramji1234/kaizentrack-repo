import type { ScheduleItem } from "../types/Schedule";

export const getTodayTasks = (
  tasks: ScheduleItem[]
) => {
  const dayNames = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  const today =
    dayNames[new Date().getDay()];

  return tasks.filter((task) => {
    if (task.repeatType === "daily") {
      return true;
    }

    if (
      task.repeatType === "custom"
    ) {
      return task.days.includes(
        today
      );
    }

    return true;
  });
};