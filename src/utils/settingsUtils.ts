export const exportData = () => {
  const backup = {
    tasks: JSON.parse(
      localStorage.getItem("tasks") || "[]"
    ),

    profile: JSON.parse(
      localStorage.getItem("profile") || "{}"
    ),

    theme:
      localStorage.getItem("theme") ||
      "dark",
  };

  const blob = new Blob(
    [JSON.stringify(backup, null, 2)],
    {
      type: "application/json",
    }
  );

  const url =
    window.URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;

  link.download =
    "kaizentrack-backup.json";

  link.click();

  window.URL.revokeObjectURL(url);
};

export const clearTasks = () => {
  const confirmed = window.confirm(
    "Delete all tasks?"
  );

  if (!confirmed) return false;

  localStorage.removeItem("tasks");

  return true;
};

export const importData = (
  file: File
): Promise<boolean> => {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = JSON.parse(
          e.target?.result as string
        );

        if (data.tasks) {
          localStorage.setItem(
            "tasks",
            JSON.stringify(data.tasks)
          );
        }

        if (data.profile) {
          localStorage.setItem(
            "profile",
            JSON.stringify(data.profile)
          );
        }

        if (data.theme) {
          localStorage.setItem(
            "theme",
            data.theme
          );
        }

        resolve(true);
      } catch {
        resolve(false);
      }
    };

    reader.readAsText(file);
  });
};