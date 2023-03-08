import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardScreen from "./screens/DashboardScreen";
import EmployeeScreen from "./screens/EmployeeScreen";
import AttendanceScreen from "./screens/AttendanceScreen";
import LeaveScreen from "./screens/LeaveScreen";
import DocScreen from "./screens/DocScreen";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/dashboard" element={<DashboardScreen />} />
        <Route path="/employees" element={<EmployeeScreen />} />
        <Route path="/attendance" element={<AttendanceScreen />} />
        <Route path="/leaves" element={<LeaveScreen />} />
        <Route path="/docs" element={<DocScreen />} />
      </Route>
    </Routes>
  </Router>
);
