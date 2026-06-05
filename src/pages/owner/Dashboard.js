import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";
import StarRating from "../../components/StarRating";

function OwnerDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState({ field: "name", order: "asc" });
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/owner/dashboard", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [user.token]);

  const getSortedRatings = () => {
    if (!data?.ratings) return [];
    return [...data.ratings].sort((a, b) => {
      let aVal = sort.field === "name" ? a.user?.name : a.value;
      let bVal = sort.field === "name" ? b.user?.name : b.value;
      if (sort.order === "asc") return aVal > bVal ? 1 : -1;
      return aVal < bVal ? 1 : -1;
    });
  };

  const handleSort = (field) => {
    setSort((prev) => ({
      field,
      order: prev.field === field && prev.order === "asc" ? "desc" : "asc",
    }));
  };

  const sortIcon = (field) => {
    if (sort.field !== field) return " ↕";
    return sort.order === "asc" ? " ↑" : " ↓";
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-8">

        <div className="mb-7">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">My Store Dashboard</h2>
          <p className="text-sm text-gray-500 mt-1">See how your store is performing</p>
        </div>

        {loading ? (
          <p className="text-sm text-gray-400">Loading...</p>
        ) : !data?.store ? (
          <p className="text-sm text-gray-500">No store assigned to your account yet. Contact admin.</p>
        ) : (
          <>
            <div className="mb-6">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 flex justify-between items-center flex-wrap gap-5 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center text-2xl shrink-0">
                    🏪
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">{data.store.name}</h3>
                    <p className="text-sm text-gray-500">{data.store.address || "No address"}</p>
                    <p className="text-xs text-gray-400">{data.store.email}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  {data.avgRating ? (
                    <>
                      <span className="text-3xl font-bold text-amber-400 leading-none">★ {data.avgRating}</span>
                      <span className="text-xs text-gray-400">{data.totalRatings} rating{data.totalRatings !== 1 ? "s" : ""}</span>
                      <StarRating value={Math.round(data.avgRating)} readOnly />
                    </>
                  ) : (
                    <span className="text-sm text-gray-400">No ratings yet</span>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-800">Customer Ratings</h3>
                <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">{data.totalRatings} total</span>
              </div>

              {data.ratings.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-8">No ratings yet</p>
              ) : (
                <table className="w-full border-collapse">
                  <thead className="bg-gray-50">
                    <tr>
                      <th onClick={() => handleSort("name")} className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide cursor-pointer hover:text-blue-500 select-none">Customer{sortIcon("name")}</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Email</th>
                      <th onClick={() => handleSort("value")} className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide cursor-pointer hover:text-blue-500 select-none">Rating{sortIcon("value")}</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getSortedRatings().map((r) => (
                      <tr key={r._id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-3 text-sm text-gray-800">{r.user?.name || "Unknown"}</td>
                        <td className="px-5 py-3 text-sm text-gray-400">{r.user?.email || "—"}</td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <StarRating value={r.value} readOnly />
                            <span className="text-xs text-gray-400">{r.value}/5</span>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-xs text-gray-400">{new Date(r.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default OwnerDashboard;