import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.name.length < 8 || form.name.length > 60) {
      return setError("Name must be between 8 and 60 characters");
    }
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/signup", form);
      login(res.data);
      navigate("/user/stores");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f2ff] px-5">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-10 w-full max-w-md">
        <div className="text-center mb-7">
          <span className="text-4xl block mb-2">⭐</span>
          <h1 className="text-xl font-semibold text-gray-900 mb-1">
            StoreRate
          </h1>
          <p className="text-sm text-gray-400">Create your account</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
              {error}
            </div>
          )}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              Full Name{" "}
              <span className="text-gray-400 font-normal">
                (8–60 characters)
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              Password{" "}
              <span className="text-gray-400 font-normal">
                (8–16 chars, 1 uppercase, 1 special)
              </span>
            </label>
            <input
              type="password"
              placeholder="Create a password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              Address{" "}
              <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              placeholder="Your address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              rows={2}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition resize-y"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold py-2.5 rounded-lg transition"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center mt-5 text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
