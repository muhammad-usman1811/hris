import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardScreen from "./screens/DashboardScreen";
import EmployeeScreen from "./screens/EmployeeScreen";
import AttendanceScreen from "./screens/AttendanceScreen";
import LeaveScreen from "./screens/LeaveScreen";
import DocScreen from "./screens/DocScreen";
import LoginScreen from "./screens/LoginScreen";
import EmployeeProfileScreen from "./screens/EmployeeProfileScreen";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/home" element={<App />}>
          <Route path="/home/dashboard" element={<DashboardScreen />} />
          <Route path="/home/employees" element={<EmployeeScreen />} />
          <Route path="/home/profile" element={<EmployeeProfileScreen />} />
          <Route path="/home/attendance" element={<AttendanceScreen />} />
          <Route path="/home/leaves" element={<LeaveScreen />} />
          <Route path="/home/docs" element={<DocScreen />} />
        </Route>
      </Routes>
    </Router>
  </Provider>
);
