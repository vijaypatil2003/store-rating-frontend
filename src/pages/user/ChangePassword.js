import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";

function UserChangePassword() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.newPassword !== form.confirmPassword) {
      return setError("Passwords don't match");
    }

    setLoading(true);
    try {
      await axios.put(
        "/api/auth/update-password",
        {
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        },
        { headers: { Authorization: `Bearer ${user.token}` } },
      );
      setSuccess("Password updated successfully!");
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update password");
    }
    setLoading(false);
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Change Password
          </h2>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-7 max-w-md shadow-sm">
          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 text-sm text-green-600 bg-green-50 border border-green-100 rounded-lg px-4 py-3">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">
                Current Password
              </label>
              <input
                type="password"
                value={form.currentPassword}
                onChange={(e) =>
                  setForm({ ...form, currentPassword: e.target.value })
                }
                required
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">
                New Password{" "}
                <span className="text-xs text-gray-400">
                  (8–16 chars, 1 uppercase, 1 special)
                </span>
              </label>
              <input
                type="password"
                value={form.newPassword}
                onChange={(e) =>
                  setForm({ ...form, newPassword: e.target.value })
                }
                required
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <input
                type="password"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
                required
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-semibold py-2.5 rounded-lg transition"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserChangePassword;
