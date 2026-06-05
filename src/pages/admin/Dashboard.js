import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("/api/admin/dashboard", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setStats(res.data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    fetchStats();
  }, [user.token]);

  const statCards = [
    { icon: "👥", value: stats?.totalUsers, label: "Total Users" },
    { icon: "🏪", value: stats?.totalStores, label: "Total Stores" },
    { icon: "⭐", value: stats?.totalRatings, label: "Total Ratings" },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar />
      <div className="max-w-[1100px] mx-auto px-6 py-8">
        <div className="mb-7">
          <h2 className="text-[22px] font-semibold text-[var(--text)]">
            Dashboard
          </h2>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            Overview of platform activity
          </p>
        </div>

        {loading ? (
          <p className="text-sm text-[var(--text-muted)]">Loading...</p>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-4 mb-8 max-[768px]:grid-cols-1">
              {statCards.map(({ icon, value, label }) => (
                <div
                  key={label}
                  className="bg-white border border-[var(--border)] rounded-xl p-6 flex items-center gap-4"
                >
                  <div className="text-[28px] w-13 h-13 min-w-[52px] min-h-[52px] bg-[var(--primary-light)] rounded-xl flex items-center justify-center">
                    {icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[28px] font-semibold text-[var(--text)] leading-none">
                      {value ?? "—"}
                    </span>
                    <span className="text-[13px] text-[var(--text-muted)] mt-1">
                      {label}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white border border-[var(--border)] rounded-xl p-6">
              <h3 className="text-[15px] font-semibold text-[var(--text)] mb-4">
                Quick Actions
              </h3>
              <div className="flex gap-2.5 flex-wrap">
                <button
                  onClick={() => navigate("/admin/users/add")}
                  className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white border-none px-4 py-2 rounded-lg text-[13px] font-medium cursor-pointer transition-colors duration-150"
                >
                  + Add User
                </button>
                <button
                  onClick={() => navigate("/admin/stores/add")}
                  className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white border-none px-4 py-2 rounded-lg text-[13px] font-medium cursor-pointer transition-colors duration-150"
                >
                  + Add Store
                </button>
                <button
                  onClick={() => navigate("/admin/users")}
                  className="bg-transparent border border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--primary)] hover:bg-[var(--primary-light)] text-[var(--text)] px-4 py-2 rounded-lg text-[13px] font-medium cursor-pointer transition-all duration-150"
                >
                  View All Users
                </button>
                <button
                  onClick={() => navigate("/admin/stores")}
                  className="bg-transparent border border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--primary)] hover:bg-[var(--primary-light)] text-[var(--text)] px-4 py-2 rounded-lg text-[13px] font-medium cursor-pointer transition-all duration-150"
                >
                  View All Stores
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
