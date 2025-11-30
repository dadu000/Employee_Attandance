import { NavLink } from "react-router-dom";

export default function EmployeeSidebar() {
  const linkClass =
    "block px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-100 transition";

  const activeClass =
    "bg-blue-600 text-white font-medium hover:bg-blue-700";

  return (
    <div className="w-60 bg-white shadow-md border-r border-gray-200 p-4 h-full">
      <h2 className="text-lg font-semibold text-blue-800 mb-4">Employee Menu</h2>

      <nav className="space-y-2">
        <NavLink
          to="/employee-dashboard"
          className={({ isActive }) => (isActive ? activeClass : linkClass)}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/mark-attendance"
          className={({ isActive }) => (isActive ? activeClass : linkClass)}
        >
          Mark Attendance
        </NavLink>

        <NavLink
          to="/attendance-history"
          className={({ isActive }) => (isActive ? activeClass : linkClass)}
        >
          Attendance History
        </NavLink>

        <NavLink
          to="/employee-profile"
          className={({ isActive }) => (isActive ? activeClass : linkClass)}
        >
          Profile
        </NavLink>
      </nav>
    </div>
  );
}
