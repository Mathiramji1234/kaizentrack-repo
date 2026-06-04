import type { ScheduleItem } from "../types/Schedule";

export const sortTasks = (
  tasks: ScheduleItem[],
  sortBy: "time" | "priority" | "status"
) => {
  return [...tasks].sort((a, b) => {
    if (sortBy === "time") {
      return a.startTime.localeCompare(
        b.startTime
      );
    }

    if (sortBy === "priority") {
      const priorityOrder = {
        High: 3,
        Medium: 2,
        Low: 1,
      };

      return (
        priorityOrder[b.priority] -
        priorityOrder[a.priority]
      );
    }

    if (sortBy === "status") {
      return (
        Number(a.completed) -
        Number(b.completed)
      );
    }

    return 0;
  });
};