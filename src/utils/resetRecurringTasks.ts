import type { ScheduleItem }
from "../types/Schedule";

export const resetRecurringTasks = (
  tasks: ScheduleItem[]
) => {
  const today =
    new Date().toDateString();

  const dayNames = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  const todayDay =
    dayNames[new Date().getDay()];

  return tasks.map((task) => {
    if (
      task.lastResetDate === today
    ) {
      return task;
    }

    let shouldReset = false;

    if (
      task.repeatType === "daily"
    ) {
      shouldReset = true;
    }

    if (
      task.repeatType === "custom" &&
      task.days.includes(todayDay)
    ) {
      shouldReset = true;
    }

    if (!shouldReset)
      return task;

    return {
      ...task,
      completed: false,
      lastResetDate: today,
    };
  });
};