import React from "react";
import DataTable from "./common/DataTable";

const LeaveTable = () => {
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
      field: "type",
      headerName: "Type",
      width: 150,
    },
    {
      field: "days",
      headerName: "Days",
      width: 150,
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
      type: "Sick",
      days: 2,
      status: "Approved",
    },
    {
      id: 2,
      name: "Lannister",
      department: "Project Management",
      type: "Casual",
      days: 1,
      status: "Pending",
    },
    {
      id: 3,
      name: "Lannister",
      department: "Data",
      type: "Urgent",
      days: 2,
      status: "Pending",
    },
    {
      id: 4,
      name: "Stark",
      department: "Data",
      type: "Urgent",
      days: 2,
      status: "Approved",
    },
    {
      id: 5,
      name: "Targaryen",
      department: "Data",
      type: "Sick",
      days: 2,
      status: "Pending",
    },
    {
      id: 6,
      name: "Melisandre",
      department: "Development",
      type: "Casual",
      days: 1,
      status: "Approved",
    },
    {
      id: 7,
      name: "Clifford",
      department: "Data",
      type: "Urgent",
      days: 1,
      status: "Cancelled",
    },
    {
      id: 8,
      name: "Frances",
      department: "Data",
      type: "Urgent",
      days: 1,
      status: "Pending",
    },
    {
      id: 9,
      name: "Roxie",
      department: "Data",
      type: "Sick",
      days: 2,
      status: "Cancelled",
    },
  ];
  return <DataTable rows={rows} columns={columns} />;
};

export default LeaveTable;
