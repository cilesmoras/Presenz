import { Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin";
import AttendanceLogs from "./pages/attendance-logs";
import Dashboard from "./pages/dashboard/index";
import EmployeesForm from "./pages/employees/EmployeesForm";
import EmployeesProfile from "./pages/employees/EmployeesProfile";
import Employees from "./pages/employees/index";
import Login from "./pages/login/index";
import Register from "./pages/login/Register";
import Settings from "./pages/settings";
import BreakTime from "./pages/settings/break-time/index";
import Departments from "./pages/settings/departments";
import HolidaysForm from "./pages/settings/holidays/HolidaysForm";
import Holidays from "./pages/settings/holidays/index";
import JobTitles from "./pages/settings/job-titles/index";
import ShiftSchedules from "./pages/settings/shift-schedules/index";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<Admin />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/employees">
          <Route index element={<Employees />} />
          <Route path=":idNumber" element={<EmployeesProfile />} />
          <Route path="create" element={<EmployeesForm />} />
          <Route path=":idNumber/edit" element={<EmployeesForm />} />
        </Route>
        <Route path="/attendance-logs" element={<AttendanceLogs />} />
        <Route element={<Settings />}>
          <Route path="/holidays">
            <Route index element={<Holidays />} />
            <Route path="create" element={<HolidaysForm />} />
            <Route path=":id/edit" element={<HolidaysForm />} />
          </Route>
          <Route path="/break-time" element={<BreakTime />} />
          <Route path="/job-titles" element={<JobTitles />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/shift-schedules" element={<ShiftSchedules />} />
        </Route>
      </Route>
      <Route path="*" element={<h1>Page not found</h1>} />
    </Routes>
  );
}
