import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `no-underline py-1.5 px-3 rounded-md text-sm font-medium transition-all duration-150 flex items-center gap-1.5 ${
      isActive
        ? "text-[var(--primary)] bg-[var(--primary-light)] font-semibold"
        : "text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--primary-light)]"
    }`;

  const roleLinks = {
    admin: [
      { to: "/admin/dashboard", label: "Dashboard", icon: "📊" },
      { to: "/admin/users", label: "Users", icon: "👥" },
      { to: "/admin/stores", label: "Stores", icon: "🏪" },
    ],
    user: [
      { to: "/user/stores", label: "Stores", icon: "🏪" },
      { to: "/user/change-password", label: "Change Password", icon: "🔒" },
    ],
    owner: [
      { to: "/owner/dashboard", label: "Dashboard", icon: "📊" },
      { to: "/owner/change-password", label: "Change Password", icon: "🔒" },
    ],
  };

  const roleBadgeStyle = {
    admin: "bg-red-100 text-red-600",
    user: "bg-blue-100 text-blue-600",
    owner: "bg-green-100 text-green-600",
  };

  const getInitials = (name = "") =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const links = roleLinks[user?.role] || [];

  return (
    <nav className="bg-[var(--white)] border-b border-[var(--border)] px-6 h-[60px] flex items-center gap-8 sticky top-0 z-[100]">
      {/* Logo */}
      <Link
        to={`/${user?.role}/dashboard`}
        className="flex items-center gap-2 text-lg font-bold text-[var(--primary)] min-w-[120px] no-underline hover:opacity-80 transition-opacity"
      >
        <span>⭐</span>
        <span>StoreRate</span>
      </Link>

      {/* Nav Links */}
      <div className="flex gap-1 flex-1">
        {links.map(({ to, label }) => (
          <NavLink key={to} to={to} className={linkClass}>
            {label}
          </NavLink>
        ))}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3 ml-auto">
        {/* Avatar + name + role badge */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[var(--primary-light)] text-[var(--primary)] text-xs font-bold flex items-center justify-center">
            {getInitials(user?.name)}
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-medium text-[var(--text-primary)]">
              {user?.name?.split(" ")[0]}
            </span>
            <span
              className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full capitalize w-fit ${
                roleBadgeStyle[user?.role] ?? "bg-gray-100 text-gray-500"
              }`}
            >
              {user?.role}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-[var(--border)]" />

        {/* Logout */}
        <button
          className="bg-transparent border border-[var(--border)] py-1.5 px-3.5 rounded-md text-[13px] text-[var(--text-muted)] cursor-pointer hover:border-red-400 hover:text-red-500 hover:bg-red-50 transition-all duration-150"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
// ============== The below code is for simple basic ui =========================================================

// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// function Navbar() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   const getLinks = () => {
//     if (user?.role === "admin") {
//       return (
//         <>
//           <Link
//             to="/admin/dashboard"
//             className="text-[var(--text-muted)] no-underline py-1.5 px-3 rounded-md text-sm font-medium transition-all duration-150 hover:text-[var(--primary)] hover:bg-[var(--primary-light)]"
//           >
//             Dashboard
//           </Link>
//           <Link
//             to="/admin/users"
//             className="text-[var(--text-muted)] no-underline py-1.5 px-3 rounded-md text-sm font-medium transition-all duration-150 hover:text-[var(--primary)] hover:bg-[var(--primary-light)]"
//           >
//             Users
//           </Link>
//           <Link
//             to="/admin/stores"
//             className="text-[var(--text-muted)] no-underline py-1.5 px-3 rounded-md text-sm font-medium transition-all duration-150 hover:text-[var(--primary)] hover:bg-[var(--primary-light)]"
//           >
//             Stores
//           </Link>
//         </>
//       );
//     }
//     if (user?.role === "user") {
//       return (
//         <>
//           <Link
//             to="/user/stores"
//             className="text-[var(--text-muted)] no-underline py-1.5 px-3 rounded-md text-sm font-medium transition-all duration-150 hover:text-[var(--primary)] hover:bg-[var(--primary-light)]"
//           >
//             Stores
//           </Link>
//           <Link
//             to="/user/change-password"
//             className="text-[var(--text-muted)] no-underline py-1.5 px-3 rounded-md text-sm font-medium transition-all duration-150 hover:text-[var(--primary)] hover:bg-[var(--primary-light)]"
//           >
//             Change Password
//           </Link>
//         </>
//       );
//     }
//     if (user?.role === "owner") {
//       return (
//         <>
//           <Link
//             to="/owner/dashboard"
//             className="text-[var(--text-muted)] no-underline py-1.5 px-3 rounded-md text-sm font-medium transition-all duration-150 hover:text-[var(--primary)] hover:bg-[var(--primary-light)]"
//           >
//             Dashboard
//           </Link>
//           <Link
//             to="/owner/change-password"
//             className="text-[var(--text-muted)] no-underline py-1.5 px-3 rounded-md text-sm font-medium transition-all duration-150 hover:text-[var(--primary)] hover:bg-[var(--primary-light)]"
//           >
//             Change Password
//           </Link>
//         </>
//       );
//     }
//   };

//   return (
//     <nav className="bg-[var(--white)] border-b border-[var(--border)] px-6 h-[60px] flex items-center gap-8 sticky top-0 z-[100]">
//       <div className="flex items-center gap-2 text-lg font-semibold text-[var(--primary)] min-w-[120px]">
//         <span>⭐</span>
//         <span>StoreRate</span>
//       </div>
//       <div className="flex gap-1 flex-1">{getLinks()}</div>
//       <div className="flex items-center gap-3 ml-auto">
//         <span className="text-sm text-[var(--text-muted)]">
//           Hi, {user?.name?.split(" ")[0]}
//         </span>
//         <button
//           className="bg-transparent border border-[var(--border)] py-1.5 px-3.5 rounded-md text-[13px] text-[var(--text-muted)] cursor-pointer hover:border-[var(--danger)] hover:text-[var(--danger)] transition-all duration-150"
//           onClick={handleLogout}
//         >
//           Logout
//         </button>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
