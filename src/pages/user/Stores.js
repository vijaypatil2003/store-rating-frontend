import { useState, useEffect } from "react";
import API from "../../api";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";
import StarRating from "../../components/StarRating";

function UserStores() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ name: "", address: "" });
  const [ratingInput, setRatingInput] = useState({});
  const [sort, setSort] = useState({ field: "name", order: "asc" });
  const [msg, setMsg] = useState({});
  const { user } = useAuth();

  const fetchStores = async () => {
    try {
      const params = { ...filters, sortBy: sort.field, order: sort.order };
      const res = await API.get("/api/user/stores", {
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

  const handleRatingSelect = (storeId, value) => {
    setRatingInput((prev) => ({ ...prev, [storeId]: value }));
  };

  const submitRating = async (storeId) => {
    const value = ratingInput[storeId];
    if (!value) return;
    try {
      await API.post(
        "/api/user/rating",
        { storeId, value },
        { headers: { Authorization: `Bearer ${user.token}` } },
      );
      setMsg((prev) => ({ ...prev, [storeId]: "Rating saved!" }));
      setTimeout(() => setMsg((prev) => ({ ...prev, [storeId]: "" })), 2000);
      fetchStores();
    } catch (err) {
      setMsg((prev) => ({ ...prev, [storeId]: "Failed to save" }));
    }
  };

  const handleSort = (field) => {
    setSort((prev) => ({
      field,
      order: prev.field === field && prev.order === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Browse Stores
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Find and rate stores near you
          </p>
        </div>

        <form
          className="flex gap-2 flex-wrap mb-4"
          onSubmit={(e) => {
            e.preventDefault();
            fetchStores();
          }}
        >
          <input
            placeholder="Search by name..."
            value={filters.name}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            className="flex-1 min-w-40 px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
          />
          <input
            placeholder="Search by address..."
            value={filters.address}
            onChange={(e) =>
              setFilters({ ...filters, address: e.target.value })
            }
            className="flex-1 min-w-40 px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition"
          >
            Search
          </button>
        </form>

        <div className="flex items-center gap-2 mb-5 text-sm text-gray-400">
          <span>Sort by:</span>
          <button
            onClick={() => handleSort("name")}
            className={`px-3 py-1 rounded-md text-xs border transition ${sort.field === "name" ? "border-blue-400 text-blue-600 bg-blue-50" : "border-gray-200 text-gray-400"}`}
          >
            Name{" "}
            {sort.field === "name" ? (sort.order === "asc" ? "↑" : "↓") : ""}
          </button>
          <button
            onClick={() => handleSort("address")}
            className={`px-3 py-1 rounded-md text-xs border transition ${sort.field === "address" ? "border-blue-400 text-blue-600 bg-blue-50" : "border-gray-200 text-gray-400"}`}
          >
            Address{" "}
            {sort.field === "address" ? (sort.order === "asc" ? "↑" : "↓") : ""}
          </button>
        </div>

        {loading ? (
          <p className="text-sm text-gray-400">Loading stores...</p>
        ) : stores.length === 0 ? (
          <p className="text-sm text-gray-400">No stores found</p>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-4">
            {stores.map((store) => (
              <div
                key={store._id}
                className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"
              >
                <div className="flex gap-3 items-start mb-4">
                  <div className="w-11 h-11 rounded-lg bg-blue-50 flex items-center justify-center text-xl shrink-0">
                    🏪
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      {store.name}
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {store.address || "No address"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-5 flex-wrap mb-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                      Overall
                    </span>
                    {store.avgRating ? (
                      <div className="flex items-center gap-1.5">
                        <StarRating
                          value={Math.round(store.avgRating)}
                          readOnly
                        />
                        <span className="text-xs text-gray-400">
                          {store.avgRating} ({store.totalRatings})
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400">
                        No ratings yet
                      </span>
                    )}
                  </div>
                  {store.myRating && (
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                        Your Rating
                      </span>
                      <StarRating value={store.myRating} readOnly />
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-100 pt-4 flex flex-col gap-2">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    {store.myRating
                      ? "Update your rating:"
                      : "Rate this store:"}
                  </span>
                  <div className="flex items-center gap-2">
                    <StarRating
                      value={ratingInput[store._id] || 0}
                      onChange={(val) => handleRatingSelect(store._id, val)}
                    />
                    <button
                      onClick={() => submitRating(store._id)}
                      disabled={!ratingInput[store._id]}
                      className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs px-4 py-1.5 rounded-md transition"
                    >
                      {store.myRating ? "Update" : "Submit"}
                    </button>
                  </div>
                  {msg[store._id] && (
                    <span
                      className={`text-xs ${msg[store._id].includes("saved") ? "text-green-600" : "text-red-500"}`}
                    >
                      {msg[store._id]}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserStores;
