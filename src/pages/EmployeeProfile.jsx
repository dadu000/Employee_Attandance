
import { useState } from "react";
import Navbar from "../components/Navbar";
import EmployeeSidebar from "../components/EmployeeSidebar";
import { getActiveUser } from "../utils/authService";

export default function EmployeeProfile() {
  const savedUser = getActiveUser();

  const [form, setForm] = useState({
    name: savedUser?.name || "",
    email: savedUser?.email || "",
    employeeId: savedUser?.employeeId || "",
    role: savedUser?.role || "",
    department: savedUser?.department || "Not Assigned",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = () => {
    const updatedUser = { ...savedUser, ...form };

    // save locally
    localStorage.setItem("activeUser", JSON.stringify(updatedUser));

    // update in users list
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map((u) =>
      u.id === updatedUser.id ? updatedUser : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    alert("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col animate-fadeIn">

      <Navbar />

      <div className="flex flex-1">

        <EmployeeSidebar />

        <div className="flex-1 p-8">

          <h1 className="text-3xl font-bold text-blue-900 mb-8">
            Employee Profile
          </h1>

          <div className="max-w-3xl bg-white shadow-md rounded-xl p-8 border border-gray-200">

            {/* Profile Photo */}
            <div className="flex flex-col items-center mb-8">
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt="Profile"
                className="w-28 h-28 rounded-full border border-gray-300 shadow"
              />
              <h2 className="text-xl font-semibold text-blue-800 mt-4">
                {form.name}
              </h2>
              <p className="text-gray-600 text-sm">Employee Profile</p>
            </div>

            {/* Details Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <label className="text-gray-700 font-medium">Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="border border-gray-300 w-full px-4 py-2 rounded-lg mt-1 focus:ring-2 focus:ring-blue-300 outline-none"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="text-gray-700 font-medium">Employee ID</label>
                <input
                  type="text"
                  disabled
                  className="border border-gray-200 bg-gray-100 w-full px-4 py-2 rounded-lg mt-1 text-gray-500"
                  value={form.employeeId}
                />
              </div>

              <div>
                <label className="text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  disabled
                  className="border border-gray-200 bg-gray-100 w-full px-4 py-2 rounded-lg mt-1 text-gray-500"
                  value={form.email}
                />
              </div>

              <div>
                <label className="text-gray-700 font-medium">Role</label>
                <input
                  type="text"
                  disabled
                  className="border border-gray-200 bg-gray-100 w-full px-4 py-2 rounded-lg mt-1 text-gray-500"
                  value={form.role}
                />
              </div>

              <div>
                <label className="text-gray-700 font-medium">Department</label>
                <input
                  type="text"
                  name="department"
                  className="border border-gray-300 w-full px-4 py-2 rounded-lg mt-1 focus:ring-2 focus:ring-blue-300 outline-none"
                  value={form.department}
                  onChange={handleChange}
                  placeholder="e.g., HR, IT, Finance"
                />
              </div>

            </div>

            {/* Save Button */}
            <div className="mt-10 text-right">
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition shadow-md"
              >
                Save Changes
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
