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
  ];

  const rows = [
    {
      id: 1,
      name: "Snow",
      department: "Development",
      status: "Present",
    },
    {
      id: 2,
      name: "Lannister",
      department: "Project Management",
      status: "Absent",
    },
    {
      id: 3,
      name: "Lannister",
      department: "Data",
      status: "Present",
    },
    {
      id: 4,
      name: "Stark",
      department: "Data",
      status: "WFH",
    },
    {
      id: 5,
      name: "Targaryen",
      department: "Data",
      status: "Present",
    },
    {
      id: 6,
      name: "Melisandre",
      department: "Development",
      status: "WFH",
    },
    {
      id: 7,
      name: "Clifford",
      department: "Data",
      status: "Absent",
    },
    {
      id: 8,
      name: "Frances",
      department: "Data",
      status: "Present",
    },
    {
      id: 9,
      name: "Roxie",
      department: "Data",
      status: "Absent",
    },
  ];
  return <DataTable rows={rows} columns={columns} />;
};

export default AttendanceList;
