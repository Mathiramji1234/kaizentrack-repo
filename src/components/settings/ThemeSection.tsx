import { useEffect, useState } from "react";
import type { Theme } from "../../types/Themes";

const ThemeSection = () => {
  const [theme, setTheme] =
    useState<Theme>("dark");

  const [message, setMessage] =
    useState("");

  useEffect(() => {
    const savedTheme =
      localStorage.getItem("theme");

    if (
      savedTheme === "dark" ||
      savedTheme === "light" ||
      savedTheme === "system"
    ) {
      setTheme(savedTheme);
    }
  }, []);

  const saveTheme = () => {
    localStorage.setItem(
      "theme",
      theme
    );

    setMessage(
      "✅ Theme saved successfully"
    );

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <div className="bg-slate-900 rounded-xl p-6">
      <h2 className="text-2xl font-semibold mb-6">
        🎨 Appearance
      </h2>

      <div className="space-y-4">
        <label className="flex items-center gap-3">
          <input
            type="radio"
            value="dark"
            checked={theme === "dark"}
            onChange={() =>
              setTheme("dark")
            }
          />

          Dark
        </label>

        <label className="flex items-center gap-3">
          <input
            type="radio"
            value="light"
            checked={theme === "light"}
            onChange={() =>
              setTheme("light")
            }
          />

          Light
        </label>

        <label className="flex items-center gap-3">
          <input
            type="radio"
            value="system"
            checked={theme === "system"}
            onChange={() =>
              setTheme("system")
            }
          />

          System
        </label>

        <button
          onClick={saveTheme}
          className="
            bg-indigo-600
            hover:bg-indigo-700
            px-6
            py-3
            rounded-lg
          "
        >
          Save Theme
        </button>

        {message && (
          <p>{message}</p>
        )}
      </div>
    </div>
  );
};

export default ThemeSection;