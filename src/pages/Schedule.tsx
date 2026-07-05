import { useEffect, useState } from "react";
import type { ScheduleItem } from "../types/Schedule";
import { sortTasks } from "../utils/taskSorter";
import { resetRecurringTasks } from "../utils/recurringTask";
import { updateTodayProductivity } from "../utils/productivityHistory";
const Schedule = () => {
  const [tasks, setTasks] = useState<ScheduleItem[]>(() => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      return resetRecurringTasks(
        JSON.parse(savedTasks)
      );
    }

    return [];
  });

  useEffect(() => {
    setTasks((prev) =>
      resetRecurringTasks(prev)
    );
  }, []);

  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [priority, setPriority] = useState<
    "High" | "Medium" | "Low"
  >("Medium");
  const [repeatType, setRepeatType] =
  useState<
    "once" | "daily" | "custom"
  >("once");

  const [selectedDays, setSelectedDays] =
    useState<string[]>([]);
  const [sortBy, setSortBy] = useState<
    "time" | "priority" | "status"
  >("time");

  useEffect(() => {
    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    );

    updateTodayProductivity(tasks);
  }, [tasks]);

  const addTask = () => {
    if (!title || !startTime || !endTime) {
      alert("Please fill all fields");
      return;
    }

    if (startTime >= endTime) {
      alert(
        "⚠️ End time must be later than start time."
      );
      return;
    }

    const conflictingTask = tasks.find((task) => {
      const timeConflict =
        startTime < task.endTime &&
        endTime > task.startTime;

      if (!timeConflict) return false;

      // Daily conflicts with everything

      if (
        repeatType === "daily" ||
        task.repeatType === "daily"
      ) {
        return true;
      }

      // Once conflicts with once

      if (
        repeatType === "once" &&
        task.repeatType === "once"
      ) {
        return true;
      }

      // Custom vs Custom

      if (
        repeatType === "custom" &&
        task.repeatType === "custom"
      ) {
        return selectedDays.some((day) =>
          task.days.includes(day)
        );
      }

      // Once vs Custom
      // (for now allow)

      return false;
    });

    if (conflictingTask) {
      alert(
        `⚠️ Time conflict detected!\n\n` +
          `Conflicts with:\n` +
          `${conflictingTask.title}\n` +
          `${conflictingTask.startTime} - ${conflictingTask.endTime}`
      );

      return;
    }

    const newTask: ScheduleItem = {
      id: Date.now(),
      title,
      startTime,
      endTime,
      completed: false,
      priority,
      repeatType,
      days: selectedDays,
    };

    setTasks([...tasks, newTask]);

    setTitle("");
    setStartTime("");
    setEndTime("");
    setPriority("Medium");
    setRepeatType("once");
    setSelectedDays([]);
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

const toggleTaskStatus = (
  id: number
) => {
  setTasks(
    tasks.map((task) => {
      if (task.id !== id) return task;

      const newCompletedState =
        !task.completed;

      return {
        ...task,
        completed: newCompletedState,

        completedAt: newCompletedState
          ? new Date().toISOString()
          : undefined,
      };
    })
  );
};


  const sortedTasks = sortTasks(
    tasks,
    sortBy
  );

  const weekDays = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">
        Schedule
      </h1>

      {/* Add Task Form */}

      <div className="bg-slate-900 p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">
          Add New Task
        </h2>

        <div className="grid md:grid-cols-5 gap-4">
          <input
            type="text"
            placeholder="Task Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-slate-800 p-3 rounded-lg"
          />

          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="bg-slate-800 p-3 rounded-lg"
          />

          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="bg-slate-800 p-3 rounded-lg"
          />
          <select
            value={priority}
            onChange={(e) =>
              setPriority(
                e.target.value as
                  | "High"
                  | "Medium"
                  | "Low"
              )
            }
            className="bg-slate-800 p-3 rounded-lg"
          >
            <option value="High">
              🔴 High
            </option>

            <option value="Medium">
              🟡 Medium
            </option>

            <option value="Low">
              🟢 Low
            </option>
          </select>

          <select
            value={repeatType}
            onChange={(e) =>
              setRepeatType(
                e.target.value as
                  | "once"
                  | "daily"
                  | "custom"
              )
            }
            className="bg-slate-800 p-3 rounded-lg"
          >
            <option value="once">
              Once
            </option>

            <option value="daily">
              Daily
            </option>

            <option value="custom">
              Specific Days
            </option>
          </select>

          <button
            onClick={addTask}
            className="
              bg-gradient-to-r
              from-indigo-600
              to-purple-600
              hover:from-indigo-500
              hover:to-purple-500
              rounded-lg
              font-semibold
              shadow-lg
              transition-all
              duration-300
            "
          >
            + Add Task
          </button>
        </div>
      </div>

      {repeatType === "custom" && (
        <div className="flex flex-wrap gap-2 mt-4">
          {weekDays.map((day) => (
            <button
              key={day}
              type="button"
              onClick={() => {
                if (selectedDays.includes(day)) {
                  setSelectedDays(
                    selectedDays.filter(
                      (d) => d !== day
                    )
                  );
                } else {
                  setSelectedDays([
                    ...selectedDays,
                    day,
                  ]);
                }
              }}
              className={`px-3 py-2 rounded-lg ${
                selectedDays.includes(day)
                  ? "bg-indigo-600"
                  : "bg-slate-800"
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      )}

      {/* Empty State */}

      {tasks.length === 0 && (
        <div className="bg-slate-900 p-8 rounded-xl text-center text-slate-400">
          No tasks scheduled yet.
        </div>
      )}

      <div className="flex items-center gap-3 mb-6">
      <span className="text-slate-400">
        Sort Tasks:
      </span>

      <select
        value={sortBy}
        onChange={(e) =>
          setSortBy(
            e.target.value as
              | "time"
              | "priority"
              | "status"
          )
        }
        className="
          bg-slate-900
          px-4
          py-2
          rounded-lg
          border
          border-slate-700
        "
      >
        <option value="time">
          🕒 Time
        </option>

        <option value="priority">
          🔥 Priority
        </option>

        <option value="status">
          ✅ Status
        </option>
      </select>
    </div>

      {/* Task List */}

      <div className="space-y-4">
        {sortedTasks.map((task) => (
            <div
              key={task.id}
              className="bg-slate-900 p-5 rounded-xl flex justify-between items-center"
            >
              <div>
                <h2
                  className={`font-semibold text-lg ${
                    task.completed
                      ? "line-through text-slate-500"
                      : ""
                  }`}
                >
                  {task.title}
                </h2>

                <p className="text-slate-400">
                  {task.startTime} - {task.endTime}
                </p>

                {task.repeatType && (
                  <div className="mt-2">
                    <span className="bg-indigo-600/20 text-indigo-400 px-2 py-1 rounded text-xs">
                      {task.repeatType === "once" &&
                        "🎯 Once"}

                      {task.repeatType === "daily" &&
                        "🌅 Daily"}

                      {task.repeatType === "custom" &&
                        `📌 ${task.days.join(" • ")}`}
                    </span>
                  </div>
                )}

                <div className="mt-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      task.priority === "High"
                        ? "bg-red-500"
                        : task.priority === "Medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>

                <p
                  className={`mt-2 text-sm ${
                    task.completed
                      ? "text-green-400"
                      : "text-yellow-400"
                  }`}
                >
                  {task.completed
                    ? "☑ Completed"
                    : "☐ Pending"}
                </p>
                {task.completedAt && (
                  <p className="text-xs text-slate-500 mt-1">
                    Completed:
                    {" "}
                    {new Date(
                      task.completedAt
                    ).toLocaleString()}
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() =>
                    toggleTaskStatus(task.id)
                  }
                  className={`px-4 py-2 rounded-lg transition ${
                    task.completed
                      ? "bg-yellow-600 hover:bg-yellow-700"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {task.completed
                    ? "Undo"
                    : "Complete"}
                </button>

                <button
                  onClick={() =>
                    deleteTask(task.id)
                  }
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Schedule;