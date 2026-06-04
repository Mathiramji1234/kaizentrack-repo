import ProfileSection from "../components/settings/ProfileSection";
import ThemeSection from "../components/settings/ThemeSection";
import DataManagementSection from "../components/settings/DataManagementSection";

const Settings = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">
        Settings
      </h1>

      <ProfileSection />
      <ThemeSection />
      <DataManagementSection />
    </div>
  );
};

export default Settings;