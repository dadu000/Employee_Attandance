import Navbar from "../components/Navbar";
import ManagerSidebar from "../components/ManagerSidebar";
import { useEffect, useState } from "react";

export default function ManagerReports() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [employee, setEmployee] = useState("all");

  const [employees, setEmployees] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Mock employee list
    setEmployees([
      { id: "EMP001", name: "Rahul Sharma" },
      { id: "EMP002", name: "Nisha Reddy" },
      { id: "EMP003", name: "Mohit Verma" },
      { id: "EMP004", name: "Anjali Rao" },
      { id: "EMP005", name: "Sanjay Kumar" },
    ]);

    // Mock attendance list
    setAttendanceData([
      { id: "EMP001", name: "Rahul Sharma", date: "2025-01-10", status: "Present", hours: 8 },
      { id: "EMP002", name: "Nisha Reddy", date: "2025-01-10", status: "Late", hours: 7 },
      { id: "EMP003", name: "Mohit Verma", date: "2025-01-10", status: "Absent", hours: 0 },
      { id: "EMP004", name: "Anjali Rao", date: "2025-01-11", status: "Present", hours: 8 },
      { id: "EMP005", name: "Sanjay Kumar", date: "2025-01-11", status: "Present", hours: 7 },
    ]);
  }, []);

  // Filter records based on selected filters
  const applyFilters = () => {
    let result = attendanceData;

    if (startDate) {
      result = result.filter((r) => r.date >= startDate);
    }

    if (endDate) {
      result = result.filter((r) => r.date <= endDate);
    }

    if (employee !== "all") {
      result = result.filter((r) => r.id === employee);
    }

    setFilteredData(result);
  };

  // Export to CSV (works 100%)
  const exportCSV = () => {
    const headers = ["Employee ID", "Name", "Date", "Status", "Hours Worked"];

    const rows = filteredData.map((row) =>
      [row.id, row.name, row.date, row.status, row.hours].join(",")
    );

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows].join("\n");

    const encodedUri = encodeURI(csvContent);
    const a = document.createElement("a");
    a.setAttribute("href", encodedUri);
    a.setAttribute("download", "attendance_report.csv");
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col animate-fadeIn">
      <Navbar />

      <div className="flex flex-1">
        <ManagerSidebar />

        <div className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-8">
            Attendance Reports
          </h1>

          {/* Filters Section */}
          <div className="bg-white p-6 rounded-xl shadow border border-gray-200 mb-6">
            <h2 className="text-lg font-semibold text-blue-800 mb-4">
              Filter Options
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Start Date */}
              <div>
                <label className="text-gray-700 font-medium">From Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
                />
              </div>

              {/* End Date */}
              <div>
                <label className="text-gray-700 font-medium">To Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
                />
              </div>

              {/* Employee Filter */}
              <div>
                <label className="text-gray-700 font-medium">Employee</label>
                <select
                  value={employee}
                  onChange={(e) => setEmployee(e.target.value)}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
                >
                  <option value="all">All Employees</option>
                  {employees.map((emp, index) => (
                    <option key={index} value={emp.id}>
                      {emp.name} ({emp.id})
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* Apply Filter Button */}
            <button
              onClick={applyFilters}
              className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition shadow"
            >
              Apply Filters
            </button>
          </div>

          {/* Report Table */}
          <div className="bg-white p-6 rounded-xl shadow border border-gray-200 overflow-auto">

            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-900">Report Results</h3>

              <button
                onClick={exportCSV}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition shadow"
              >
                Export CSV
              </button>
            </div>

            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-50">
                  <th className="p-3 border-b">Employee ID</th>
                  <th className="p-3 border-b">Name</th>
                  <th className="p-3 border-b">Date</th>
                  <th className="p-3 border-b">Status</th>
                  <th className="p-3 border-b">Hours Worked</th>
                </tr>
              </thead>

              <tbody>
                {filteredData.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-600">
                      No records found.
                    </td>
                  </tr>
                )}

                {filteredData.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition">
                    <td className="p-3 border-b">{row.id}</td>
                    <td className="p-3 border-b">{row.name}</td>
                    <td className="p-3 border-b">{row.date}</td>
                    <td className="p-3 border-b">{row.status}</td>
                    <td className="p-3 border-b">{row.hours} hrs</td>
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
