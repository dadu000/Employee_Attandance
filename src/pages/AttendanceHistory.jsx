import Navbar from "../components/Navbar";
import EmployeeSidebar from "../components/EmployeeSidebar";
import { useState } from "react";

export default function AttendanceHistory() {
  const [selectedMonth, setSelectedMonth] = useState("2025-01");

  // Mock attendance data (frontend only)
  const mockDays = {
    "2025-01-01": "Present",
    "2025-01-02": "Absent",
    "2025-01-03": "Present",
    "2025-01-04": "Late",
    "2025-01-05": "Present",
    "2025-01-06": "Half Day",
    "2025-01-07": "Absent",
    "2025-01-08": "Present",
    "2025-01-09": "Late",
    "2025-01-10": "Present",
    "2025-01-11": "Present",
    "2025-01-12": "Present",
  };

  const colorMap = {
    Present: "bg-green-100 text-green-800 border-green-300",
    Absent: "bg-red-100 text-red-800 border-red-300",
    Late: "bg-yellow-100 text-yellow-800 border-yellow-300",
    "Half Day": "bg-orange-100 text-orange-800 border-orange-300",
    default: "bg-gray-100 text-gray-600 border-gray-300",
  };

  const [year, month] = selectedMonth.split("-");
  const daysInMonth = new Date(year, month, 0).getDate();

  // Weekday labels (Mon - Sun)
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col animate-fadeIn">
      <Navbar />

      <div className="flex flex-1">
        <EmployeeSidebar />

        <div className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-6">
            Attendance History
          </h1>

          {/* Month Selector */}
          <div className="mb-6">
            <label className="text-gray-600 font-medium">Select Month</label>
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-lg ml-4 focus:ring-2 focus:ring-blue-300 outline-none"
            />
          </div>

          {/* Weekday Names */}
          <div className="grid grid-cols-7 gap-3 mb-3">
            {weekdays.map((day, i) => (
              <div key={i} className="text-center font-semibold text-blue-800">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-3">
            {[...Array(daysInMonth)].map((_, index) => {
              const day = index + 1;

              const dateKey = `${year}-${month}-${String(day).padStart(2, "0")}`;
              const status = mockDays[dateKey] || "default";
              const className = colorMap[status] || colorMap.default;

              return (
                <div
                  key={index}
                  className={`p-3 rounded-lg border shadow-sm text-center transition hover:shadow-md hover:-translate-y-1 ${className}`}
                >
                  <p className="text-lg font-semibold">{day}</p>
                  <p className="text-xs mt-1">
                    {status !== "default" ? status : ""}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="bg-white rounded-xl shadow p-4 mt-8 border border-gray-100">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Legend</h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-green-100 border border-green-300"></div>
                <span className="text-gray-700 text-sm">Present</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-red-100 border border-red-300"></div>
                <span className="text-gray-700 text-sm">Absent</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-yellow-100 border border-yellow-300"></div>
                <span className="text-gray-700 text-sm">Late</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-orange-100 border border-orange-300"></div>
                <span className="text-gray-700 text-sm">Half Day</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

