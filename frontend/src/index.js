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
import NewEmployee from "./components/NewEmployee";
import HomeScreen from "./screens/Employee/HomeScreen";
import EmployeeProfile from "./screens/Employee/EmployeeProfile";
import EmployeeLeaveScreen from "./screens/Employee/EmployeeLeaveScreen";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/home" element={<App />}>
          <Route path="/home/dashboard" element={<DashboardScreen />} />
          <Route path="/home/employeePortal" element={<HomeScreen />} />
          <Route path="/home/employee/profile" element={<EmployeeProfile />} />
          <Route
            path="/home/employee/leaves"
            element={<EmployeeLeaveScreen />}
          />
          <Route path="/home/employees" element={<EmployeeScreen />} />
          <Route path="/home/add" element={<NewEmployee />} />
          <Route path="/home/profile/:id" element={<EmployeeProfileScreen />} />
          <Route path="/home/attendance" element={<AttendanceScreen />} />
          <Route path="/home/leaves" element={<LeaveScreen />} />
          <Route path="/home/docs" element={<DocScreen />} />
        </Route>
      </Routes>
    </Router>
  </Provider>
);
