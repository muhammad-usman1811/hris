import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { Button } from "@mui/material";
import { Upgrade } from "@mui/icons-material";
function EmployeeTable() {
  const columns = [
    {
      name: <b>Name</b>,
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: <b>Email</b>,
      selector: (row) => row.email,
    },
    {
      name: <b>Designation</b>,
      selector: (row) => row.desigantion,
    },
    {
      name: <b>Department</b>,
      selector: (row) => row.department,
      sortable: true,
    },
    {
      name: <b>Date of Joining</b>,
      selector: (row) => row.dateofjoining,
      sortable: true,
    },
  ];
  const data = [
    {
      id: 1,
      name: "Anas Safder",
      email: "anas.safder@digifloat.com",
      desigantion: "Associate Consultant",
      department: "Web Development",
      dateofjoining: "01/02/2020",
    },
    {
      id: 2,
      name: "M Usman",
      email: "m.usman@digifloat.com",
      desigantion: "Associate Consultant",
      department: "Web Development",
      dateofjoining: "02/02/2020",
    },
    {
      id: 3,
      name: "Hammas Nasir",
      email: "hammas.nasir@digifloat.com",
      desigantion: "Associate Consultant",
      department: "HR",
      dateofjoining: "03/02/2020",
    },
    {
      id: 4,
      name: "Sana Miraj",
      email: "sana.miraj@digifloat.com",
      desigantion: "Human Resources Generalist",
      department: "HR",
      dateofjoining: "04/02/2020",
    },
    {
      id: 5,
      name: "Komal Aqeel",
      email: "Komal.aqeel@digifloat.com",
      desigantion: "Associate Project Cordinator",
      department: "Project Management",
      dateofjoining: "05/02/2020",
    },
    {
      id: 6,
      name: "Abc",
      email: "@digifloat.com",
      desigantion: "Any",
      department: "Any",
      dateofjoining: "06/02/2020",
    },
    {
      id: 7,
      name: "bca",
      email: "@digifloat.com",
      desigantion: "Any",
      department: "Any",
      dateofjoining: "06/02/2020",
    },
    {
      id: 8,
      name: "cab",
      email: "@digifloat.com",
      desigantion: "Any",
      department: "Any",
      dateofjoining: "07/02/2020",
    },
    {
      id: 9,
      name: "xyz",
      email: "@digifloat.com",
      desigantion: "Any",
      department: "Any",
      dateofjoining: "15/02/2020",
    },
    {
      id: 10,
      name: "mno",
      email: "@digifloat.com",
      desigantion: "Any",
      department: "Any",
      dateofjoining: "03/05/2020",
    },
    {
      id: 11,
      name: "pqr",
      email: "@digifloat.com",
      desigantion: "Any",
      department: "Any",
      dateofjoining: "09/11/2020",
    },
  ];
  const [records, setRecords] = useState(data);
  const navigate = useNavigate();

  function handleFilter(event) {
    const newData = data.filter((row) => {
      return row.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setRecords(newData);
  }
  return (
    <div className="container mt-5">
      <div
        className="search"
        style={{ width: "fit-content", height: "fit-content", margin: "16px" }}
      >
        <input
          type="text"
          placeholder="Search Employee"
          style={{
            borderRadius: "10px",
            height: "25px",
            border: "1px solid lightgrey",
          }}
          onChange={handleFilter}
        />
        <Button
          sx={{ ml: 4 }}
          color="error"
          variant="contained"
          endIcon={<Upgrade />}
        >
          Export to Excel
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={records}
        selectableRows
        fixedHeader
        pagination
        onRowClicked={() => navigate("/home/profile")}
      ></DataTable>
    </div>
  );
}
export default EmployeeTable;
