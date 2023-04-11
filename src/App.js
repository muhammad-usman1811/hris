import './App.css';
import EmployeeTable from './components/EmployeeTable';
import EmployeeProfile from './components/EmployeeProfile';
import Attendance from './components/Attendance';
import AttendanceList from './components/AttendanceList';
import DocsManagement from './components/DocsManagement';
import EmployeeDashboard1 from "./components/EmployeeDashboard1";
import EmployeeDashboard2 from "./components/EmployeeDashboard2";
import EmployeeDashboard3 from "./components/EmployeeDashboard3";
import EmployeeLeaveRequest1 from "./components/EmployeeLeaveRequest1";
import EmployeeLeaveRequest2 from "./components/EmployeeLeaveRequest2";
import LeaveRequestform from "./components/LeaveRequestform";
import LeaveStatus from "./components/LeaveStatus";



function App() {
  return (
    <div>
      <EmployeeDashboard1 />
      <EmployeeDashboard2 />
      <EmployeeDashboard3 />
    </div>
    

    );
}

export default App;
