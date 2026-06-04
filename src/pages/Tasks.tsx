import { useEffect, useState } from "react";
import type { ScheduleItem } from "../types/Schedule";
import { filterTasks } from "../utils/taskFilter";

const Tasks = () => {
  const [tasks, setTasks] = useState<ScheduleItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [statusFilter, setStatusFilter] = useState<
    "all" | "pending" | "completed"
  >("all");

  const [priorityFilter, setPriorityFilter] = useState<
    "all" | "High" | "Medium" | "Low"
  >("all");

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  const filteredTasks = filterTasks(
    tasks,
    statusFilter,
    searchTerm,
    priorityFilter
  );

const pendingTasks = filteredTasks.filter(
  (task) => !task.completed
);

const completedTasks = filteredTasks.filter(
  (task) => task.completed
);

  const getPriorityColor = (
    priority: string
  ) => {
    switch (priority) {
      case "High":
        return "bg-red-500";
      case "Medium":
        return "bg-yellow-500";
      case "Low":
        return "bg-green-500";
      default:
        return "bg-slate-500";
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">
        Tasks
      </h1>

    <input
      type="text"
      placeholder="🔍 Search tasks..."
      value={searchTerm}
      onChange={(e) =>
        setSearchTerm(e.target.value)
      }
      className="
        w-full
        bg-slate-900
        p-3
        rounded-xl
        border
        border-slate-700
        focus:outline-none
        focus:border-indigo-500
      "
    />

<div className="flex gap-4 mt-4">
  {/* Status Filter */}

  <div className="flex items-center gap-2">
    <label className="text-slate-300">
      Status:
    </label>

    <select
      value={statusFilter}
      onChange={(e) =>
        setStatusFilter(
          e.target.value as
            | "all"
            | "pending"
            | "completed"
        )
      }
      className="
        bg-slate-800
        border
        border-slate-700
        rounded-lg
        px-4
        py-2
      "
    >
      <option value="all">All</option>
      <option value="pending">
        Pending
      </option>
      <option value="completed">
        Completed
      </option>
    </select>
  </div>

  {/* Priority Filter */}

  <div className="flex items-center gap-2">
    <label className="text-slate-300">
      Priority:
    </label>

    <select
      value={priorityFilter}
      onChange={(e) =>
        setPriorityFilter(
          e.target.value as
            | "all"
            | "High"
            | "Medium"
            | "Low"
        )
      }
      className="
        bg-slate-800
        border
        border-slate-700
        rounded-lg
        px-4
        py-2
      "
    >
      <option value="all">All</option>
      <option value="High">
        High
      </option>
      <option value="Medium">
        Medium
      </option>
      <option value="Low">Low</option>
    </select>
  </div>
</div>
    
    <p className="text-slate-400 text-sm">
      Total Tasks: {tasks.length}
    </p>

      <div className="bg-slate-900 rounded-xl p-6">
  <h2 className="text-xl font-semibold mb-4">
    Task Productivity
  </h2>

  <p className="mb-3">
    {completedTasks.length} /
    {tasks.length} completed
  </p>

  <div className="w-full bg-slate-800 rounded-full h-4">
    <div
      className="bg-indigo-600 h-4 rounded-full"
        style={{
          width: `${
            tasks.length
              ? (
                  (completedTasks.length /
                    tasks.length) *
                  100
                ).toFixed(0)
              : 0
          }%`,
        }}
      />
    </div>
  </div>

      {/* Pending */}
{statusFilter !== "completed" && (
      <div className="bg-slate-900 rounded-xl p-6">
        <h2 className="text-2xl font-semibold mb-6">
          Pending Tasks (
          {pendingTasks.length})
        </h2>

        <div className="space-y-4">
          {pendingTasks.length === 0 ? (
            <p className="text-slate-400">
              No pending tasks 🎉
            </p>
          ) : (
            pendingTasks.map((task) => (
              <div
                key={task.id}
                className="bg-slate-800 rounded-lg p-4"
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {task.title}
                    </h3>

                    <p className="text-slate-400">
                      {task.startTime} -{" "}
                      {task.endTime}
                    </p>
                  </div>

                  <span
                    className={`px-5 py-3.5 rounded text-sm ${getPriorityColor(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
)}

      {/* Completed */}

{statusFilter !== "pending" && (
      <div className="bg-slate-900 rounded-xl p-6">
        <h2 className="text-2xl font-semibold mb-6">
          Completed Tasks (
          {completedTasks.length})
        </h2>

        <div className="space-y-4">
          {completedTasks.length === 0 ? (
            <p className="text-slate-400">
              No completed tasks yet.
            </p>
          ) : (
            completedTasks.map((task) => (
              <div
                key={task.id}
                className="bg-slate-800 rounded-lg p-4"
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold text-lg line-through text-slate-500">
                      {task.title}
                    </h3>

                    <p className="text-slate-400">
                      {task.startTime} -{" "}
                      {task.endTime}
                    </p>
                  </div>

                  <span className="text-green-400 font-semibold">
                    ✓ Completed
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
)}
    </div>
  );
};

export default Tasks;