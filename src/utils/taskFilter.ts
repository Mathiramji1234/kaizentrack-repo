import type { ScheduleItem } from "../types/Schedule";

export const filterTasks = (
  tasks: ScheduleItem[],
  statusFilter: string,
  searchTerm: string,
  priorityFilter: string
) => {
  return tasks.filter((task) => {
    const matchesSearch =
      task.title
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        );

    const matchesStatus =
      statusFilter === "all"
        ? true
        : statusFilter === "completed"
        ? task.completed
        : !task.completed;

    const matchesPriority =
      priorityFilter === "all"
        ? true
        : task.priority ===
          priorityFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority
    );
  });
};