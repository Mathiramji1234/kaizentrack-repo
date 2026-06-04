import { useEffect, useState } from "react";
import type { ScheduleItem } from "../types/Schedule";
import ProgressRing from "../components/ProgressRing";

const Dashboard = () => {
  const [tasks, setTasks] = useState<ScheduleItem[]>([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const remainingTasks =
    totalTasks - completedTasks;

  const productivity =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks / totalTasks) * 100
        );

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">
        Dashboard
      </h1>

      {/* Stats */}

      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-slate-900 rounded-xl p-6">
          <h3 className="text-slate-400">
            Total Tasks
          </h3>

          <p className="text-4xl font-bold mt-2">
            {totalTasks}
          </p>
        </div>

        <div className="bg-slate-900 rounded-xl p-6">
          <h3 className="text-slate-400">
            Completed
          </h3>

          <p className="text-4xl font-bold mt-2 text-green-400">
            {completedTasks}
          </p>
        </div>

        <div className="bg-slate-900 rounded-xl p-6">
          <h3 className="text-slate-400">
            Remaining
          </h3>

          <p className="text-4xl font-bold mt-2 text-yellow-400">
            {remainingTasks}
          </p>
        </div>

      <div className="bg-slate-900 rounded-xl p-6 flex flex-col items-center justify-center">
        <h3 className="text-slate-400 mb-4">
          Productivity
        </h3>

        <ProgressRing
          percentage={productivity}
        />
      </div>
    </div>
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-2">
        Today's Progress
      </h2>

      <p className="text-slate-100">
        You have completed {completedTasks} out of{" "}
        {totalTasks} tasks.
      </p>

      <p className="mt-2 text-slate-200">
        Keep pushing towards your goals 🚀
      </p>
    </div>
      {/* Recent Tasks */}

      <div className="bg-slate-900 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">
          Recent Tasks
        </h2>

        {tasks.length === 0 ? (
          <p className="text-slate-400">
            No tasks available.
          </p>
        ) : (
          <div className="space-y-3">
            {tasks.slice(0, 5).map((task) => (
              <div
                key={task.id}
                className="flex justify-between"
              >
                <span>{task.title}</span>

                <span
                  className={
                    task.completed
                      ? "text-green-400"
                      : "text-yellow-400"
                  }
                >
                  {task.completed
                    ? "Completed"
                    : "Pending"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;