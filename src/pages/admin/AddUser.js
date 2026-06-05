import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";

function AdminAddUser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "user",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await axios.post("/api/admin/users", form, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setSuccess("User created successfully!");
      setForm({ name: "", email: "", password: "", address: "", role: "user" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create user");
    }
    setLoading(false);
  };

  const inputClass =
    "w-full px-3 py-2 text-sm border border-[var(--border)] rounded-lg outline-none focus:border-[var(--primary)] transition-colors duration-150 bg-white text-[var(--text)] resize-none";

  const labelClass = "block text-sm font-medium text-[var(--text)] mb-1.5";

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar />
      <div className="max-w-[1100px] mx-auto px-6 py-8">
        <button
          onClick={() => navigate("/admin/users")}
          className="flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--primary)] mb-6 transition-colors duration-150 bg-transparent border-none cursor-pointer p-0"
        >
          ← Back to Users
        </button>

        <div className="mb-7">
          <h2 className="text-[22px] font-semibold text-[var(--text)]">Add New User</h2>
        </div>

        <div className="bg-white border border-[var(--border)] rounded-xl p-7 max-w-[520px]">
          {error && (
            <div className="px-3.5 py-2.5 rounded-lg text-sm mb-5 bg-[#fff5f5] text-[var(--danger)] border border-[#fecaca]">
              {error}
            </div>
          )}
          {success && (
            <div className="px-3.5 py-2.5 rounded-lg text-sm mb-5 bg-[#f0fff4] text-[var(--success)] border border-[#bbf7d0]">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className={labelClass}>
                Full Name{" "}
                <span className="font-normal text-[var(--text-muted)]">(8–60 characters)</span>
              </label>
              <input
                type="text"
                className={inputClass}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            <div className="mb-4">
              <label className={labelClass}>Email</label>
              <input
                type="email"
                className={inputClass}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div className="mb-4">
              <label className={labelClass}>
                Password{" "}
                <span className="font-normal text-[var(--text-muted)]">
                  (8–16 chars, 1 uppercase, 1 special)
                </span>
              </label>
              <input
                type="password"
                className={inputClass}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            <div className="mb-4">
              <label className={labelClass}>Address</label>
              <textarea
                className={inputClass}
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                rows={2}
              />
            </div>

            <div className="mb-6">
              <label className={labelClass}>Role</label>
              <select
                className={inputClass}
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <option value="user">Normal User</option>
                <option value="admin">Admin</option>
                <option value="owner">Store Owner</option>
              </select>
            </div>

            <div className="flex gap-2.5">
              <button
                type="submit"
                disabled={loading}
                className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white border-none px-5 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Creating..." : "Create User"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/admin/users")}
                className="bg-transparent border border-[var(--border)] hover:border-[var(--text-muted)] hover:text-[var(--text)] text-[var(--text-muted)] px-5 py-2.5 rounded-lg text-sm cursor-pointer transition-colors duration-150"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminAddUser;