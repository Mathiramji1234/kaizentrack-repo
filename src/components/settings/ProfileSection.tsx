import { useEffect, useState } from "react";

const ProfileSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedProfile =
      localStorage.getItem("profile");

    if (savedProfile) {
      const profile =
        JSON.parse(savedProfile);

      setName(profile.name || "");
      setEmail(profile.email || "");
    }
  }, []);

  const saveProfile = () => {
    if (!name.trim()) {
      setMessage(
        "❌ Name cannot be empty"
      );
      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setMessage(
        "❌ Please enter a valid email"
      );
      return;
    }

    localStorage.setItem(
      "profile",
      JSON.stringify({
        name,
        email,
      })
    );

    setMessage(
      "✅ Profile saved successfully"
    );

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <div className="bg-slate-900 rounded-xl p-6">
      <h2 className="text-2xl font-semibold mb-6">
        👤 Profile
      </h2>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full bg-slate-800 p-3 rounded-lg"
        />

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full bg-slate-800 p-3 rounded-lg"
        />

        <button
          onClick={saveProfile}
          className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg"
        >
          Save Profile
        </button>

        {message && (
          <p>{message}</p>
        )}
      </div>
    </div>
  );
};

export default ProfileSection;