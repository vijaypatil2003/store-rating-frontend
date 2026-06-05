import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";

function AdminStores() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ name: "", email: "", address: "" });
  const [sort, setSort] = useState({ field: "name", order: "asc" });
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchStores = async () => {
    try {
      const params = { ...filters, sortBy: sort.field, order: sort.order };
      const res = await API.get("/api/admin/stores", {
        headers: { Authorization: `Bearer ${user.token}` },
        params,
      });
      setStores(res.data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStores();
  }, [sort]);

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

  const thClass =
    "px-4 py-3 text-left text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-[0.04em] cursor-pointer select-none whitespace-nowrap hover:text-[var(--primary)] transition-colors duration-150";

  const inputClass =
    "px-3 py-[7px] border border-[var(--border)] rounded-lg text-[13px] outline-none focus:border-[var(--primary)] text-[var(--text)] bg-white transition-colors duration-150";

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar />
      <div className="max-w-[1100px] mx-auto px-6 py-8">
        <div className="mb-7">
          <h2 className="text-[22px] font-semibold text-[var(--text)]">
            Stores
          </h2>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            All registered stores
          </p>
        </div>

        <div className="bg-white border border-[var(--border)] rounded-xl overflow-hidden">
          <form
            className="px-5 py-4 border-b border-[var(--border)] flex gap-2.5 flex-wrap items-center"
            onSubmit={(e) => {
              e.preventDefault();
              fetchStores();
            }}
          >
            <input
              className={inputClass}
              placeholder="Search name..."
              value={filters.name}
              onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            />
            <input
              className={inputClass}
              placeholder="Search email..."
              value={filters.email}
              onChange={(e) =>
                setFilters({ ...filters, email: e.target.value })
              }
            />
            <input
              className={inputClass}
              placeholder="Search address..."
              value={filters.address}
              onChange={(e) =>
                setFilters({ ...filters, address: e.target.value })
              }
            />
            <button
              type="submit"
              className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white border-none px-4 py-[7px] rounded-lg text-[13px] font-medium cursor-pointer transition-colors duration-150"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/stores/add")}
              className="ml-auto bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white border-none px-4 py-[7px] rounded-lg text-[13px] font-medium cursor-pointer whitespace-nowrap transition-colors duration-150"
            >
              + Add Store
            </button>
          </form>

          {loading ? (
            <p className="text-sm text-[var(--text-muted)] p-5">Loading...</p>
          ) : (
            <table className="w-full border-collapse">
              <thead className="bg-[#f9fafb]">
                <tr>
                  <th className={thClass} onClick={() => handleSort("name")}>
                    Name{sortIcon("name")}
                  </th>
                  <th className={thClass} onClick={() => handleSort("email")}>
                    Email{sortIcon("email")}
                  </th>
                  <th className={thClass} onClick={() => handleSort("address")}>
                    Address{sortIcon("address")}
                  </th>
                  <th className={thClass}>Rating</th>
                  <th className={thClass}>Owner</th>
                </tr>
              </thead>
              <tbody>
                {stores.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-5 text-center text-sm text-[var(--text-muted)]"
                    >
                      No stores found
                    </td>
                  </tr>
                ) : (
                  stores.map((s) => (
                    <tr
                      key={s._id}
                      className="hover:bg-[#f9fafb] transition-colors duration-100"
                    >
                      <td className="px-4 py-3 text-sm border-t border-[var(--border)] text-[var(--text)] font-medium">
                        {s.name}
                      </td>
                      <td className="px-4 py-3 text-sm border-t border-[var(--border)] text-[var(--text)]">
                        {s.email}
                      </td>
                      <td className="px-4 py-3 text-sm border-t border-[var(--border)] text-[var(--text)]">
                        {s.address || "—"}
                      </td>
                      <td className="px-4 py-3 text-sm border-t border-[var(--border)]">
                        {s.avgRating ? (
                          <span className="text-amber-500 font-medium">
                            ★ {s.avgRating}{" "}
                            <span className="text-[var(--text-muted)] font-normal">
                              ({s.totalRatings})
                            </span>
                          </span>
                        ) : (
                          <span className="text-[var(--text-muted)]">
                            No ratings
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm border-t border-[var(--border)] text-[var(--text)]">
                        {s.owner?.name || "—"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminStores;
