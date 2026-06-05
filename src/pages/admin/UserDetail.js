import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";

function AdminUserDetail() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/admin/users/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setUserData(res.data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    fetchUser();
  }, [id, user.token]);

  const roleBadge = {
    admin: "bg-violet-100 text-violet-700",
    user: "bg-[var(--primary-light)] text-[var(--primary)]",
    owner: "bg-yellow-100 text-yellow-700",
  };

  const getInitials = (name = "") =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

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
          <h2 className="text-[22px] font-semibold text-[var(--text)]">
            User Details
          </h2>
        </div>

        {loading ? (
          <p className="text-sm text-[var(--text-muted)]">Loading...</p>
        ) : !userData ? (
          <p className="text-sm text-[var(--text-muted)]">User not found</p>
        ) : (
          <div className="bg-white border border-[var(--border)] rounded-xl p-7 max-w-[500px]">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[var(--border)]">
              <div className="w-12 h-12 rounded-full bg-[var(--primary-light)] text-[var(--primary)] text-sm font-bold flex items-center justify-center flex-shrink-0">
                {getInitials(userData.name)}
              </div>
              <div>
                <p className="font-semibold text-[var(--text)] text-base leading-tight">
                  {userData.name}
                </p>
                <p className="text-sm text-[var(--text-muted)] mt-0.5">
                  {userData.email}
                </p>
              </div>
              <span
                className={`ml-auto text-[11px] font-semibold px-2.5 py-1 rounded-full capitalize ${roleBadge[userData.role] ?? "bg-gray-100 text-gray-500"}`}
              >
                {userData.role}
              </span>
            </div>

            <div>
              {[
                { key: "Address", val: userData.address || "—" },
                ...(userData.role === "owner"
                  ? [
                      {
                        key: "Store Rating",
                        val: userData.storeRating
                          ? `★ ${userData.storeRating}`
                          : "No ratings yet",
                        amber: !!userData.storeRating,
                      },
                    ]
                  : []),
              ].map(({ key, val, amber }) => (
                <div
                  key={key}
                  className="flex py-3 border-b border-[var(--border)] last:border-b-0 text-sm"
                >
                  <span className="font-medium text-[var(--text-muted)] w-[120px] flex-shrink-0">
                    {key}
                  </span>
                  <span
                    className={
                      amber
                        ? "text-amber-500 font-medium"
                        : "text-[var(--text)]"
                    }
                  >
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminUserDetail;
