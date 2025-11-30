import Navbar from "../components/Navbar";
import ManagerSidebar from "../components/ManagerSidebar";
import { useState, useEffect } from "react";

export default function ManagerAttendance() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    // Mock data for now
    setAttendanceData([
      {
        id: "EMP001",
        name: "Rahul Sharma",
        date: "2025-01-12",
        status: "Present",
        checkIn: "09:05 AM",
        checkOut: "05:30 PM",
      },
      {
        id: "EMP002",
        name: "Nisha Reddy",
        date: "2025-01-12",
        status: "Late",
        checkIn: "09:45 AM",
        checkOut: "06:00 PM",
      },
      {
        id: "EMP003",
        name: "Mohit Verma",
        date: "2025-01-12",
        status: "Absent",
        checkIn: "-",
        checkOut: "-",
      },
      {
        id: "EMP004",
        name: "Anjali Rao",
        date: "2025-01-12",
        status: "Present",
        checkIn: "09:10 AM",
        checkOut: "05:20 PM",
      },
      {
        id: "EMP005",
        name: "Sanjay Kumar",
        date: "2025-01-11",
        status: "Present",
        checkIn: "09:00 AM",
        checkOut: "05:15 PM",
      },
    ]);
  }, []);

  // ===== FILTER LOGIC =====
  const filteredData = attendanceData.filter((item) => {
    return (
      (search === "" ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.id.toLowerCase().includes(search.toLowerCase())) &&
      (statusFilter === "" || item.status === statusFilter) &&
      (dateFilter === "" || item.date === dateFilter)
    );
  });

  const statusColor = {
    Present: "text-green-700 bg-green-100 border-green-300",
    Absent: "text-red-700 bg-red-100 border-red-300",
    Late: "text-yellow-700 bg-yellow-100 border-yellow-300",
    "Half Day": "text-orange-700 bg-orange-100 border-orange-300",
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col animate-fadeIn">

      <Navbar />

      <div className="flex flex-1">

        <ManagerSidebar />

        {/* MAIN CONTENT */}
        <div className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-8">
            All Employees Attendance
          </h1>

          {/* Filters Section */}
          <div className="bg-white p-5 rounded-xl shadow border border-gray-200 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              {/* Search */}
              <div>
                <label className="text-gray-700 font-medium">Search</label>
                <input
                  type="text"
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
                  placeholder="Search by Employee ID or Name"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {/* Status Filter */}
              <div>
                <label className="text-gray-700 font-medium">Status</label>
                <select
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="Late">Late</option>
                  <option value="Half Day">Half Day</option>
                </select>
              </div>

              {/* Date Filter */}
              <div>
                <label className="text-gray-700 font-medium">Date</label>
                <input
                  type="date"
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                />
              </div>

            </div>
          </div>

          {/* Table */}
          <div className="bg-white p-5 rounded-xl shadow border border-gray-200 overflow-auto">
            
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-50 text-left">
                  <th className="p-3 border-b">Employee ID</th>
                  <th className="p-3 border-b">Name</th>
                  <th className="p-3 border-b">Date</th>
                  <th className="p-3 border-b">Status</th>
                  <th className="p-3 border-b">Check In</th>
                  <th className="p-3 border-b">Check Out</th>
                </tr>
              </thead>

              <tbody>
                {filteredData.length === 0 && (
                  <tr>
                    <td colSpan="6" className="py-4 text-center text-gray-600">
                      No records found.
                    </td>
                  </tr>
                )}

                {filteredData.map((item, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition">
                    <td className="p-3 border-b">{item.id}</td>
                    <td className="p-3 border-b">{item.name}</td>
                    <td className="p-3 border-b">{item.date}</td>
                    <td className="p-3 border-b">
                      <span
                        className={`px-3 py-1 rounded-full border text-sm font-semibold ${
                          statusColor[item.status]
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="p-3 border-b">{item.checkIn}</td>
                    <td className="p-3 border-b">{item.checkOut}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}
