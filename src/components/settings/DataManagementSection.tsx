import {
  exportData,
  clearTasks,
  importData,
} from "../../utils/settingsUtils";

const DataManagementSection = () => {
  const handleClearTasks = () => {
    const success = clearTasks();

    if (success) {
      alert(
        "✅ All tasks deleted successfully"
      );
    }
  };

    const handleImportTasks = async (
    event: React.ChangeEvent<HTMLInputElement>
    ) => {
    const file =
        event.target.files?.[0];

    if (!file) return;

    const success =
        await importData(file);

    if (success) {
        alert(
        "✅ Data imported successfully\n\nRefresh the page to see changes."
        );
    } else {
        alert(
        "❌ Invalid backup file"
        );
    }
    };

  return (
    <div className="bg-slate-900 rounded-xl p-6">
      <h2 className="text-2xl font-semibold mb-6">
        💾 Data Management
      </h2>

      <div className="flex flex-wrap gap-4">

        <button
          onClick={exportData}
          className="
            bg-green-600
            hover:bg-green-700
            px-6
            py-3
            rounded-lg
          "
        >
          📤 Export Tasks
        </button>

        <label
        className="
            bg-blue-600
            hover:bg-blue-700
            px-6
            py-3
            rounded-lg
            cursor-pointer
        "
        >
        📥 Import Tasks
        <input
            type="file"
            accept=".json"
            onChange={handleImportTasks}
            className="hidden"
        />
        </label>

        <button
          onClick={handleClearTasks}
          className="
            bg-red-600
            hover:bg-red-700
            px-6
            py-3
            rounded-lg
          "
        >
          🗑 Clear All Tasks
        </button>

      </div>
    </div>
  );
};

export default DataManagementSection;