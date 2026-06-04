import { Bell, Search } from "lucide-react";

const Navbar = () => {
  return (
    <header className="h-16 border-b border-slate-800 flex items-center justify-between px-6">
      <h2 className="font-semibold text-lg">
        Welcome Back 👋
      </h2>

      <div className="flex items-center gap-4">
        <Search size={20} />
        <Bell size={20} />

        <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center">
          M
        </div>
      </div>
    </header>
  );
};

export default Navbar;