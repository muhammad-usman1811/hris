import React from "react";
import DataTable from "./common/DataTable";

const AttendanceList = () => {
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
    },
    {
      field: "department",
      headerName: "Department",
      width: 180,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
    },
    {
      field: "checkedIn",
      headerName: "Checked-In",
      width: 150,
    },
    {
      field: "checkedOut",
      headerName: "Checked-Out",
      width: 150,
    },
    {
      field: "workHours",
      headerName: "Work Hours",
      width: 150,
    },
  ];

  const rows = [
    {
      id: 1,
      name: "Snow",
      department: "Development",
      status: "Present",
      checkedIn: "09:00 am",
      checkedOut: "05:00 pm",
      workHours: "8",
    },
    {
      id: 2,
      name: "Lannister",
      department: "Project Management",
      status: "Absent",
      checkedIn: "09:00 am",
      checkedOut: "05:00 pm",
      workHours: "8",
    },
    {
      id: 3,
      name: "Lannister",
      department: "Data",
      status: "Present",
      checkedIn: "09:00 am",
      checkedOut: "05:00 pm",
      workHours: "8",
    },
    {
      id: 4,
      name: "Stark",
      department: "Data",
      status: "WFH",
      checkedIn: "09:00 am",
      checkedOut: "05:00 pm",
      workHours: "8",
    },
    {
      id: 5,
      name: "Targaryen",
      department: "Data",
      status: "Present",
      checkedIn: "09:00 am",
      checkedOut: "05:00 pm",
      workHours: "8",
    },
    {
      id: 6,
      name: "Melisandre",
      department: "Development",
      status: "WFH",
      checkedIn: "09:00 am",
      checkedOut: "05:00 pm",
      workHours: "8",
    },
    {
      id: 7,
      name: "Clifford",
      department: "Data",
      status: "Absent",
      checkedIn: "09:00 am",
      checkedOut: "05:00 pm",
      workHours: "8",
    },
    {
      id: 8,
      name: "Frances",
      department: "Data",
      status: "Present",
      checkedIn: "09:00 am",
      checkedOut: "05:00 pm",
      workHours: "8",
    },
    {
      id: 9,
      name: "Roxie",
      department: "Data",
      status: "Absent",
      checkedIn: "09:00 am",
      checkedOut: "05:00 pm",
      workHours: "8",
    },
  ];
  return <DataTable rows={rows} columns={columns} />;
};

export default AttendanceList;
