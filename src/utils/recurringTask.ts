import type { ScheduleItem } from "../types/Schedule";
import { getCurrentDay } from "./dayUtils";

export const resetRecurringTasks = (
  tasks: ScheduleItem[]
) => {
  const today =
    new Date().toDateString();

  const currentDay =
    getCurrentDay();

  return tasks.map((task) => {
    // DAILY

if (
  task.repeatType === "daily" &&
  task.completed &&
  task.completedAt
) {
  const completedDay =
    new Date(
      task.completedAt
    ).toDateString();

  if (completedDay !== today) {
    return {
      ...task,
      completed: false,
    };
  }
}

    // CUSTOM DAYS

    if (
      task.repeatType === "custom"
    ) {
      const activeToday =
        task.days.includes(
          currentDay
        );

      if (!activeToday) {
        return {
          ...task,
          completed: false,
        };
      }

      if (
        task.completed &&
        task.completedAt
      ) {
        const completedDay =
          new Date(
            task.completedAt
          ).toDateString();

        if (completedDay !== today) {
          return {
            ...task,
            completed: false,
          };
        }
      }
    }

    return task;
  });
};