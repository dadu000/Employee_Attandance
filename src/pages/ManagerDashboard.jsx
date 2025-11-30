import Navbar from "../components/Navbar";
import ManagerSidebar from "../components/ManagerSidebar";
import { useEffect, useState } from "react";

export default function ManagerDashboard() {
  const [stats, setStats] = useState({
    totalEmployees: 15,
    present: 12,
    absent: 2,
    late: 1,
  });

  const [weeklyTrend, setWeeklyTrend] = useState([]);
  const [absentList, setAbsentList] = useState([]);

  const [departmentStats, setDepartmentStats] = useState([]);

  useEffect(() => {
    // Mock department stats
    setDepartmentStats([
      { department: "IT", present: 6, absent: 1 },
      { department: "HR", present: 3, absent: 0 },
      { department: "Finance", present: 2, absent: 1 },
      { department: "Admin", present: 1, absent: 0 },
    ]);

    // Weekly trend mock
    setWeeklyTrend([60, 75, 80, 65, 78, 90, 70]);

    // Today's absent list mock
    setAbsentList([
      { name: "Rahul Sharma", id: "EMP009" },
      { name: "Preethi Rao", id: "EMP011" },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col animate-fadeIn">

      <Navbar />

      <div className="flex flex-1">
        <ManagerSidebar />

        <div className="flex-1 p-8">

          <h1 className="text-3xl font-bold text-blue-900 mb-8">
            Manager Dashboard
          </h1>

          {/* TOP STATS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

            <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
              <p className="text-gray-600 text-sm">Total Employees</p>
              <p className="text-3xl font-bold text-blue-700 mt-2">{stats.totalEmployees}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
              <p className="text-gray-600 text-sm">Present Today</p>
              <p className="text-3xl font-bold text-green-700 mt-2">{stats.present}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
              <p className="text-gray-600 text-sm">Absent Today</p>
              <p className="text-3xl font-bold text-red-600 mt-2">{stats.absent}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
              <p className="text-gray-600 text-sm">Late Today</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.late}</p>
            </div>

          </div>

          {/* WEEKLY TREND */}
          <div className="bg-white shadow rounded-xl p-6 border border-gray-100 mt-8">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">
              Weekly Attendance Trend
            </h2>

            <div className="grid grid-cols-7 gap-4">
              {weeklyTrend.map((value, i) => (
                <div key={i} className="text-center">
                  <div
                    className="w-full bg-blue-100 rounded-lg"
                    style={{ height: `${value}px` }}
                  ></div>
                  <p className="text-sm text-gray-600 mt-1">
                    {["M", "T", "W", "T", "F", "S", "S"][i]}
                  </p>
                </div>
              ))}
            </div>
          </div>

         { /* DEPARTMENT-WISE ATTENDANCE */}
          <div className="bg-white shadow rounded-xl p-6 border border-gray-100 mt-8">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">
              Department-wise Attendance
            </h2>

            <div className="space-y-3">
              {departmentStats.map((dept, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex justify-between items-center"
                >
                  <span className="text-gray-800 font-medium">
                    {dept.department}
                  </span>
                  <span className="text-green-700 font-semibold">
                    Present: {dept.present}
                  </span>
                  <span className="text-red-600 font-semibold">
                    Absent: {dept.absent}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* TODAY'S ABSENTEES */}
          <div className="bg-white shadow rounded-xl p-6 border border-gray-100 mt-8 mb-10">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">
              Absent Employees Today
            </h2>

            {absentList.length === 0 && (
              <p className="text-gray-600">No absentees today.</p>
            )}

            <div className="space-y-3">
              {absentList.map((emp, index) => (
                <div
                  key={index}
                  className="p-3 bg-gray-50 border border-gray-200 rounded-lg flex justify-between"
                >
                  <span className="text-gray-800">{emp.name}</span>
                  <span className="text-blue-700">{emp.id}</span>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

