import { useEffect, useState } from "react";
import type { ScheduleItem } from "../types/Schedule";
import ProgressRing from "../components/ProgressRing";
import { calculateProductivityStreak } from "../utils/productivityStreak";
import { getProductivityBadge } from "../utils/productivityBadge";
import AnalyticsChart from "../components/AnalyticsChart";
import MonthlyHeatmap from "../components/MonthlyHeatmap";

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

  const streak = calculateProductivityStreak();
  
  const badgeData =
  getProductivityBadge(
    productivity
  );

  // derive a color for the badge here instead of relying on badgeData.color
  const badgeColor =
  productivity >= 90
    ? "text-yellow-400"
    : productivity >= 82.5
    ? "text-slate-300"
    : productivity >= 75
    ? "text-orange-400"
    : "text-red-400";

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">
        Dashboard
      </h1>

{/* Stats Cards */}

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

{/* Streak + Heatmap */}

<div className="grid md:grid-cols-4 gap-6">

  <div className="md:col-span-1">
    <div className="bg-slate-900 rounded-xl p-6 shadow-lg h-full">
      <h2 className="text-xl font-semibold">
        🔥 Current Streak
      </h2>

      <p className="text-4xl font-bold mt-3 text-orange-400">
        {streak} Days
      </p>

      <p className="text-slate-400 mt-2">
        Consecutive productive days
      </p>

      <div className="mt-6 border-t border-slate-800 pt-4">
        <p className={`text-xl font-semibold ${badgeColor}`}>
          {badgeData.badge}
        </p>

        <p className="text-slate-400 italic mt-2">
          "{badgeData.quote}"
        </p>
      </div>
    </div>
  </div>

  <div className="md:col-span-3">
    <MonthlyHeatmap />
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
    <>
      <AnalyticsChart />
    </>
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