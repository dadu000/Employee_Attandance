import { NavLink } from "react-router-dom";

export default function ManagerSidebar() {
  const linkClass =
    "block px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-100 transition";
  const activeClass =
    "bg-blue-600 text-white font-medium hover:bg-blue-700";

  return (
    <div className="w-60 bg-white shadow-md border-r border-gray-200 p-4 min-h-screen">
      <h2 className="text-lg font-semibold text-blue-800 mb-4">Manager Menu</h2>

      <nav className="space-y-2">
        <NavLink
          to="/manager-dashboard"
          className={({ isActive }) => (isActive ? activeClass : linkClass)}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/manager-attendance"
          className={({ isActive }) => (isActive ? activeClass : linkClass)}
        >
          All Employees Attendance
        </NavLink>

        <NavLink
          to="/manager-reports"
          className={({ isActive }) => (isActive ? activeClass : linkClass)}
        >
          Reports
        </NavLink>

        <NavLink
  to="/manager-team-calendar"
  className={({ isActive }) => (isActive ? activeClass : linkClass)}
>
  Team Calendar
</NavLink>

      </nav>
    </div>
  );
}
