import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";

function AdminAddStore() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    ownerId: "",
  });
  const [owners, setOwners] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const res = await axios.get("/api/admin/users", {
          headers: { Authorization: `Bearer ${user.token}` },
          params: { role: "owner" },
        });
        setOwners(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchOwners();
  }, [user.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await axios.post("/api/admin/stores", form, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setSuccess("Store created successfully!");
      setForm({ name: "", email: "", address: "", ownerId: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create store");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f7f8fc]">
      <Navbar />
      <div className="max-w-[1100px] mx-auto px-6 py-8">
        <span
          onClick={() => navigate("/admin/stores")}
          className="inline-flex items-center gap-1.5 text-[var(--text-muted)] text-[13px] mb-5 cursor-pointer hover:text-[var(--primary)]"
        >
          ← Back to Stores
        </span>

        <div className="mb-7">
          <h2 className="text-[22px] font-semibold text-[var(--text)]">
            Add New Store
          </h2>
        </div>

        <div className="bg-white border border-[var(--border)] rounded-[10px] p-7 max-w-[520px]">
          {error && (
            <div className="px-3.5 py-2.5 rounded-lg text-[13px] mb-4 bg-[#fff5f5] text-[var(--danger)] border border-[#fecaca]">
              {error}
            </div>
          )}
          {success && (
            <div className="px-3.5 py-2.5 rounded-lg text-[13px] mb-4 bg-[#f0fff4] text-[var(--success)] border border-[#bbf7d0]">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1.5 mb-4">
              <label className="text-[13px] font-medium text-[var(--text)]">
                Store Name{" "}
                <span className="text-[var(--text-muted)] font-normal">
                  (8–60 characters)
                </span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="px-3 py-2 border border-[var(--border)] rounded-[7px] text-sm outline-none focus:border-[var(--primary)] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5 mb-4">
              <label className="text-[13px] font-medium text-[var(--text)]">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="px-3 py-2 border border-[var(--border)] rounded-[7px] text-sm outline-none focus:border-[var(--primary)] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5 mb-4">
              <label className="text-[13px] font-medium text-[var(--text)]">
                Address
              </label>
              <textarea
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                rows={2}
                className="px-3 py-2 border border-[var(--border)] rounded-[7px] text-sm outline-none focus:border-[var(--primary)] transition-colors resize-vertical"
              />
            </div>

            <div className="flex flex-col gap-1.5 mb-4">
              <label className="text-[13px] font-medium text-[var(--text)]">
                Assign Owner{" "}
                <span className="text-[var(--text-muted)] font-normal">
                  (optional)
                </span>
              </label>
              <select
                value={form.ownerId}
                onChange={(e) => setForm({ ...form, ownerId: e.target.value })}
                className="px-3 py-2 border border-[var(--border)] rounded-[7px] text-sm outline-none focus:border-[var(--primary)] transition-colors"
              >
                <option value="">No owner</option>
                {owners.map((o) => (
                  <option key={o._id} value={o._id}>
                    {o.name} ({o.email})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-2.5 mt-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-[var(--primary)] text-white border-none px-5 py-2 rounded-[7px] text-sm font-medium cursor-pointer hover:bg-[var(--primary-dark)] transition-colors disabled:opacity-60"
              >
                {loading ? "Creating..." : "Create Store"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/admin/stores")}
                className="bg-transparent border border-[var(--border)] px-5 py-2 rounded-[7px] text-sm text-[var(--text-muted)] cursor-pointer hover:border-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
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

export default AdminAddStore;
