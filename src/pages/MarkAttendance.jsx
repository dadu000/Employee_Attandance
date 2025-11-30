import { useEffect, useState } from "react";
import { getActiveUser } from "../utils/authService";

export default function MarkAttendance() {
  const user = getActiveUser();

  const [now, setNow] = useState(new Date());
  const [attendance, setAttendance] = useState(() => {
    // Load today’s attendance from localStorage
    const saved = JSON.parse(localStorage.getItem("attendance") || "{}");
    return saved[user?.id] || {
      status: "Not Checked In",
      checkIn: null,
      checkOut: null,
    };
  });

  // Auto update clock
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Save attendance in localStorage whenever it changes
  const saveAttendance = (data) => {
    const all = JSON.parse(localStorage.getItem("attendance") || "{}");
    all[user.id] = data;
    localStorage.setItem("attendance", JSON.stringify(all));
    setAttendance(data);
  };

  // Handle Check-in
  const handleCheckIn = () => {
    const newAttendance = {
      status: "Checked In",
      checkIn: now.toLocaleTimeString(),
      checkOut: null,
    };
    saveAttendance(newAttendance);
  };

  // Handle Check-out
  const handleCheckOut = () => {
    const newAttendance = {
      ...attendance,
      status: "Checked Out",
      checkOut: now.toLocaleTimeString(),
    };
    saveAttendance(newAttendance);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-xl p-6 border border-gray-100">

        {/* Title */}
        <h1 className="text-2xl font-bold text-blue-700 mb-2">
          Mark Attendance
        </h1>

        {/* Current Date & Time */}
        <p className="text-gray-600 mb-6">
          {now.toDateString()} — {now.toLocaleTimeString()}
        </p>

        {/* Status Box */}
        <div className="bg-gray-100 p-4 rounded-lg border border-gray-200 mb-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Today's Status</h3>
          
          <p className="text-gray-700">
            <b>Status:</b> {attendance.status}
          </p>

          <p className="text-gray-700">
            <b>Check In:</b> {attendance.checkIn || "—"}
          </p>

          <p className="text-gray-700">
            <b>Check Out:</b> {attendance.checkOut || "—"}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">

          <button
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            disabled={attendance.status !== "Not Checked In"}
            onClick={handleCheckIn}
          >
            Check In
          </button>

          <button
            className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            disabled={attendance.status !== "Checked In"}
            onClick={handleCheckOut}
          >
            Check Out
          </button>

        </div>

      </div>
    </div>
  );
}
