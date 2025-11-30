import { Routes, Route, Navigate } from "react-router-dom";

// PAGE IMPORTS
import Login from "./pages/Login";
import Register from "./pages/Register";

import EmployeeDashboard from "./pages/EmployeeDashboard";
import MarkAttendance from "./pages/MarkAttendance";
import AttendanceHistory from "./pages/AttendanceHistory";
import EmployeeProfile from "./pages/EmployeeProfile";

import ManagerDashboard from "./pages/ManagerDashboard";
// (You can create these later)
import ManagerAttendance from "./pages/ManagerAttendance";
import ManagerReports from "./pages/ManagerReports";

import { getActiveUser } from "./utils/authService";

import ManagerTeamCalendar from "./pages/ManagerTeamCalendar";


// ==========================
// PROTECTED ROUTE COMPONENT
// ==========================
function ProtectedRoute({ role, children }) {
  const user = getActiveUser();

  // Not logged in → redirect
  if (!user) return <Navigate to="/login" replace />;

  // If role mismatch → send to correct dashboard
  if (role && user.role !== role) {
    if (user.role === "manager") return <Navigate to="/manager-dashboard" replace />;
    if (user.role === "employee") return <Navigate to="/employee-dashboard" replace />;
  }

  return children;
}


// ==========================
// MAIN APP ROUTER
// ==========================
export default function App() {
  return (
    <Routes>

      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />


      {/* ================= EMPLOYEE ROUTES ================= */}

      <Route
        path="/employee-dashboard"
        element={
          <ProtectedRoute role="employee">
            <EmployeeDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/mark-attendance"
        element={
          <ProtectedRoute role="employee">
            <MarkAttendance />
          </ProtectedRoute>
        }
      />

      <Route
        path="/attendance-history"
        element={
          <ProtectedRoute role="employee">
            <AttendanceHistory />
          </ProtectedRoute>
        }
      />

      <Route
        path="/employee-profile"
        element={
          <ProtectedRoute role="employee">
            <EmployeeProfile />
          </ProtectedRoute>
        }
      />


      {/* ================= MANAGER ROUTES ================= */}

      <Route
        path="/manager-dashboard"
        element={
          <ProtectedRoute role="manager">
            <ManagerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/manager-attendance"
        element={
          <ProtectedRoute role="manager">
            <ManagerAttendance />
          </ProtectedRoute>
        }
      />

      <Route
        path="/manager-reports"
        element={
          <ProtectedRoute role="manager">
            <ManagerReports />
          </ProtectedRoute>
        }
      />
      <Route
  path="/manager-team-calendar"
  element={
    <ProtectedRoute role="manager">
      <ManagerTeamCalendar />
    </ProtectedRoute>
  }
/>

    </Routes>
  );
}

// import { Routes, Route, Navigate } from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import EmployeeDashboard from "./pages/EmployeeDashboard";
// import ManagerDashboard from "./pages/ManagerDashboard";
// import MarkAttendance from "./pages/MarkAttendance";
// import AttendanceHistory from "./pages/AttendanceHistory";
// import { getActiveUser } from "./utils/authService";

// import EmployeeProfile from "./pages/EmployeeProfile";


// // Protected Route
// function ProtectedRoute({ role, children }) {
//   const user = getActiveUser();
//   if (!user) return <Navigate to="/login" replace />;

//   if (role && user.role !== role) {
//     if (user.role === "manager") return <Navigate to="/manager-dashboard" replace />;
//     return <Navigate to="/employee-dashboard" replace />;
//   }
//   return children;
// }

// export default function App() {
//   return (
//     <Routes>

//       <Route path="/" element={<Navigate to="/login" replace />} />

//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />

//       <Route
//         path="/employee-dashboard"
//         element={
//           <ProtectedRoute role="employee">
//             <EmployeeDashboard />
//           </ProtectedRoute>
//         }
//       />

//       /* <Route
//         path="/manager-dashboard"
//         element={
//           <ProtectedRoute role="manager">
//             <ManagerDashboard />
//           </ProtectedRoute>
//         }
//       /> */

//       <Route
//         path="/mark-attendance"
//         element={
//           <ProtectedRoute role="employee">
//             <MarkAttendance />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/attendance-history"
//         element={
//           <ProtectedRoute role="employee">
//             <AttendanceHistory />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//   path="/employee-profile"
//   element={
//     <ProtectedRoute role="employee">
//       <EmployeeProfile />
//     </ProtectedRoute>
//   }
// />
// <Route
//   path="/manager-dashboard"
//   element={
//     <ProtectedRoute role="manager">
//       <ManagerDashboard />
//     </ProtectedRoute>
//   }
// />


//     </Routes>
//   );
// }
