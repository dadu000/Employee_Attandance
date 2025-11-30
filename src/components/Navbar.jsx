import { Link, useNavigate } from "react-router-dom";
import { logoutUser, getActiveUser } from "../utils/authService";

export default function Navbar() {
  const user = getActiveUser();
  const nav = useNavigate();

  const handleLogout = () => {
    logoutUser();
    nav("/login");
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

        <h1 className="text-xl font-bold text-blue-800">
          Attendance Portal
        </h1>

        <div className="flex items-center gap-4">
          <span className="text-gray-600 text-sm">{user?.name}</span>
          <button
            onClick={handleLogout}
            className="text-red-600 text-sm font-medium hover:underline"
          >
            Logout
          </button>
        </div>

      </div>
    </nav>
  );
}
