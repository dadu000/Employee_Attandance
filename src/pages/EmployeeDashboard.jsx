import EmployeeSidebar from "../components/EmployeeSidebar";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { getActiveUser } from "../utils/authService";

export default function EmployeeDashboard() {
  const user = getActiveUser();

  const [todayStatus, setTodayStatus] = useState("Not Checked In");
  const [summary, setSummary] = useState({
    present: 14,
    absent: 1,
    late: 0,
    hours: 92,
  });

  const [recent, setRecent] = useState([]);

  useEffect(() => {
    setRecent([
      { date: "2025-01-12", status: "Present" },
      { date: "2025-01-11", status: "Present" },
      { date: "2025-01-10", status: "Late" },
      { date: "2025-01-09", status: "Absent" },
      { date: "2025-01-08", status: "Present" },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      <Navbar />

      <div className="flex flex-1">

        <EmployeeSidebar />

        {/* MAIN CONTENT */}
        <div className="flex-1 p-8 animate-fadeIn">

          <h1 className="text-3xl font-bold text-blue-900 mb-6">
            Employee Dashboard
          </h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

            {/* Today's Status */}
            <div className="bg-white shadow hover:shadow-md transition rounded-xl p-6 border border-gray-100 transform hover:-translate-y-1">
              <p className="text-gray-500 text-sm">Today's Status</p>
              <p className="text-xl font-bold text-blue-700 mt-2">{todayStatus}</p>
            </div>

            {/* Present */}
            <div className="bg-white shadow hover:shadow-md transition rounded-xl p-6 border border-gray-100 transform hover:-translate-y-1">
              <p className="text-gray-500 text-sm">Present Days</p>
              <p className="text-2xl font-bold text-green-700 mt-2">{summary.present}</p>

              {/* progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "85%" }}></div>
              </div>
            </div>

            {/* Absent */}
            <div className="bg-white shadow hover:shadow-md transition rounded-xl p-6 border border-gray-100 transform hover:-translate-y-1">
              <p className="text-gray-500 text-sm">Absent Days</p>
              <p className="text-2xl font-bold text-red-600 mt-2">{summary.absent}</p>

              <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: "10%" }}></div>
              </div>
            </div>

            {/* Late */}
            <div className="bg-white shadow hover:shadow-md transition rounded-xl p-6 border border-gray-100 transform hover:-translate-y-1">
              <p className="text-gray-500 text-sm">Late Days</p>
              <p className="text-2xl font-bold text-yellow-600 mt-2">{summary.late}</p>

              <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                <div className="bg-yellow-400 h-2 rounded-full" style={{ width: "5%" }}></div>
              </div>
            </div>

          </div>

          {/* Total Hours */}
          <div className="bg-white shadow rounded-xl p-6 border border-gray-100 mt-8 hover:shadow-md transition transform hover:-translate-y-1">
            <p className="text-gray-500 text-sm">Total Hours (This Month)</p>
            <p className="text-3xl font-bold text-blue-700 mt-2">{summary.hours} hrs</p>
          </div>

          {/* Mini graph-like visual */}
          <div className="bg-white shadow rounded-xl p-6 border border-gray-100 mt-8">
            <h2 className="text-xl font-semibold text-blue-800 mb-3">Weekly Overview</h2>

            <div className="grid grid-cols-7 gap-4">
              {["M", "T", "W", "T", "F", "S", "S"].map((day, idx) => (
                <div key={idx} className="text-center">
                  <div
                    className="h-20 w-full bg-blue-100 rounded-lg"
                    style={{ height: `${40 + idx * 10}px` }}
                  ></div>
                  <p className="text-gray-600 text-sm mt-2">{day}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Attendance */}
          <div className="bg-white shadow rounded-xl p-6 border border-gray-100 mt-8">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">
              Recent Attendance
            </h2>

            <div className="space-y-3">
              {recent.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between bg-gray-50 p-4 border border-gray-200 rounded-lg"
                >
                  <span className="text-gray-800">{item.date}</span>

                  <span
                    className={`font-semibold ${
                      item.status === "Present"
                        ? "text-green-700"
                        : item.status === "Late"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
