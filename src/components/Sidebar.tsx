import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  CheckSquare,
  Settings,
} from "lucide-react";

const Sidebar = () => {
  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Schedule",
      path: "/schedule",
      icon: CalendarDays,
    },
    {
      name: "Today's Task",
      path: "/tasks",
      icon: CheckSquare,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 p-5">
      <h1 className="text-2xl font-bold mb-10">
        KaizenTrack
      </h1>

      <nav className="space-y-3">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition ${
                  isActive
                    ? "bg-indigo-600"
                    : "hover:bg-slate-800"
                }`
              }
            >
              <Icon size={18} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;