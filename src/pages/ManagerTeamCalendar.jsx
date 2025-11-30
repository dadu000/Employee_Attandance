
import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import ManagerSidebar from "../components/ManagerSidebar";

export default function ManagerTeamCalendar() {
  const today = new Date();
  const defaultMonth = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}`;

  const [month, setMonth] = useState(defaultMonth);
  const [departmentFilter, setDepartmentFilter] = useState("all");

  const [attendance, setAttendance] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [selectedDayDetails, setSelectedDayDetails] = useState(null);

  // Load from localStorage or create mock data
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    setEmployees(users);

    const stored = JSON.parse(localStorage.getItem("attendanceRecords") || "null");

    if (stored) {
      setAttendance(stored);
      return;
    }

    // Generate mock data if attendance not found
    const mock = [];
    const names = users.length
      ? users
      : [
          { id: "EMP001", name: "Rahul Sharma", department: "IT" },
          { id: "EMP002", name: "Nisha Reddy", department: "HR" },
          { id: "EMP003", name: "Mohit Verma", department: "Finance" },
          { id: "EMP004", name: "Anjali Rao", department: "IT" },
        ];

    const [y, m] = defaultMonth.split("-");
    const days = new Date(y, m, 0).getDate();

    for (let d = 1; d <= days; d++) {
      const dateStr = `${y}-${m}-${String(d).padStart(2, "0")}`;
      names.forEach((emp, idx) => {
        const rnd = (d + idx) % 10;
        let status = "Present";
        if (rnd === 1 || rnd === 6) status = "Absent";
        if (rnd === 2) status = "Late";
        if (rnd === 3) status = "Half Day";

        mock.push({
          id: emp.id,
          name: emp.name,
          department: emp.department || "General",
          date: dateStr,
          status,
          checkIn: status === "Absent" ? "-" : `09:${idx}0 AM`,
          checkOut: status === "Absent" ? "-" : `05:${idx}5 PM`,
        });
      });
    }

    setAttendance(mock);
    localStorage.setItem("attendanceRecords", JSON.stringify(mock));
  }, []);

  const [year, monthNum] = month.split("-");
  const daysInMonth = new Date(year, Number(monthNum), 0).getDate();
  const firstDayOfWeek = new Date(`${year}-${monthNum}-01`).getDay();
  const startOffset = (firstDayOfWeek + 6) % 7;
  const totalCells = startOffset + daysInMonth;
  const weeks = Math.ceil(totalCells / 7);

  // Filter by department
  const departments = ["all", ...new Set(attendance.map((a) => a.department))];

  // Aggregate day summaries
  const aggregated = useMemo(() => {
    const map = {};
    attendance.forEach((rec) => {
      if (departmentFilter !== "all" && rec.department !== departmentFilter) return;

      if (!map[rec.date]) {
        map[rec.date] = { Present: 0, Absent: 0, Late: 0, "Half Day": 0, records: [] };
      }

      map[rec.date][rec.status]++;
      map[rec.date].records.push(rec);
    });
    return map;
  }, [attendance, departmentFilter]);

  const statusColor = {
    Present: "text-green-700 bg-green-100 border-green-200",
    Absent: "text-red-700 bg-red-100 border-red-200",
    Late: "text-yellow-700 bg-yellow-100 border-yellow-200",
    "Half Day": "text-orange-700 bg-orange-100 border-orange-200",
  };

  // Open day details modal
  const openDay = (dateKey) => {
    setSelectedDayDetails({
      date: dateKey,
      records: aggregated[dateKey]?.records || [],
    });
  };

  // Update attendance record (inside modal)
  const handleRecordChange = (index, field, value) => {
    const updated = [...selectedDayDetails.records];
    updated[index][field] = value;
    setSelectedDayDetails({ ...selectedDayDetails, records: updated });
  };

  // Save changes to localStorage
  const saveChanges = () => {
    const updatedAttendance = [...attendance];

    selectedDayDetails.records.forEach((rec) => {
      const idx = updatedAttendance.findIndex(
        (r) => r.id === rec.id && r.date === rec.date
      );
      if (idx !== -1) updatedAttendance[idx] = rec;
    });

    setAttendance(updatedAttendance);
    localStorage.setItem("attendanceRecords", JSON.stringify(updatedAttendance));
    alert("Attendance Updated!");
    setSelectedDayDetails(null);
  };

  // Export CSV
  const exportCSV = () => {
    if (!selectedDayDetails) return;

    const headers = "Employee ID,Name,Date,Status,Check In,Check Out\n";

    const rows = selectedDayDetails.records
      .map(
        (r) =>
          `${r.id},${r.name},${r.date},${r.status},${r.checkIn},${r.checkOut}`
      )
      .join("\n");

    const csv = headers + rows;
    const blob = new Blob([csv], { type: "text/csv" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `team_attendance_${selectedDayDetails.date}.csv`;
    link.click();
  };

  // Get color class for day tile
  const getCellClass = (dateKey) => {
    const info = aggregated[dateKey];
    if (!info) return "bg-gray-50";

    if (info.Absent > 0) return "bg-red-50 border-red-200";
    if (info.Late > 0) return "bg-yellow-50 border-yellow-200";
    if (info["Half Day"] > 0) return "bg-orange-50 border-orange-200";
    return "bg-green-50 border-green-200";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col animate-fadeIn">
      <Navbar />
      <div className="flex flex-1">
        <ManagerSidebar />

        <div className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-blue-900">Team Calendar View</h1>

          {/* Filters */}
          <div className="flex gap-4 mt-6 mb-6">
            <input
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            />

            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              {departments.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Calendar */}
          <div className="bg-white p-6 rounded-xl shadow border">
            <div className="grid grid-cols-7 gap-3 mb-3">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((w) => (
                <div key={w} className="font-semibold text-gray-700 text-center">
                  {w}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-3">
              {Array.from({ length: weeks * 7 }).map((_, idx) => {
                const day = idx - startOffset + 1;
                const dateKey =
                  day >= 1 && day <= daysInMonth
                    ? `${year}-${monthNum}-${String(day).padStart(2, "0")}`
                    : null;

                return (
                  <div
                    key={idx}
                    onClick={() => dateKey && openDay(dateKey)}
                    className={`p-3 min-h-[80px] rounded-lg border cursor-pointer hover:shadow ${
                      dateKey ? getCellClass(dateKey) : ""
                    }`}
                  >
                    <div className="font-medium">{day > 0 && day <= daysInMonth ? day : ""}</div>

                    {/* Small status summary */}
                    {dateKey && aggregated[dateKey] && (
                      <div className="text-xs mt-2">
                        {["Present", "Absent", "Late", "Half Day"].map((s) => {
                          const count = aggregated[dateKey][s];
                          if (!count) return null;

                          return (
                            <span
                              key={s}
                              className={`mr-1 px-2 py-0.5 rounded-full border text-xs ${
                                statusColor[s]
                              }`}
                            >
                              {s[0]}:{count}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Modal */}
          {selectedDayDetails && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div
                className="absolute inset-0 bg-black/40"
                onClick={() => setSelectedDayDetails(null)}
              />

              <div className="relative z-50 bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl">
                <h3 className="text-xl font-semibold text-blue-800">
                  Attendance for {selectedDayDetails.date}
                </h3>

                <div className="max-h-80 overflow-auto mt-4 space-y-3">
                  {selectedDayDetails.records.map((rec, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between bg-gray-50 p-3 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{rec.name}</p>
                        <p className="text-xs text-gray-500">{rec.id}</p>
                      </div>

                      <div className="text-right">
                        {/* Status */}
                        <select
                          value={rec.status}
                          onChange={(e) =>
                            handleRecordChange(idx, "status", e.target.value)
                          }
                          className="border px-3 py-1 rounded mb-1"
                        >
                          <option>Present</option>
                          <option>Absent</option>
                          <option>Late</option>
                          <option>Half Day</option>
                        </select>

                        {/* Times */}
                        <div className="text-xs">
                          <input
                            type="text"
                            value={rec.checkIn}
                            onChange={(e) =>
                              handleRecordChange(idx, "checkIn", e.target.value)
                            }
                            className="border px-2 py-1 rounded w-24 mr-1 mt-1"
                            placeholder="Check-in"
                          />

                          <input
                            type="text"
                            value={rec.checkOut}
                            onChange={(e) =>
                              handleRecordChange(idx, "checkOut", e.target.value)
                            }
                            className="border px-2 py-1 rounded w-24 mt-1"
                            placeholder="Check-out"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end mt-6 gap-3">
                  <button
                    onClick={exportCSV}
                    className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
                  >
                    Export CSV
                  </button>

                  <button
                    onClick={saveChanges}
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Save Changes
                  </button>

                  <button
                    onClick={() => setSelectedDayDetails(null)}
                    className="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
