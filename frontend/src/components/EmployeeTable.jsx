import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Search, Upgrade } from "@mui/icons-material";
import { listUsers } from "../actions/userActions";
const XLSX = require("xlsx");

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
      selector: (row) => row.designation,
    },
    {
      name: <b>Department</b>,
      selector: (row) => row.department,
      sortable: true,
    },
    {
      name: <b>Date of Joining</b>,
      selector: (row) => row.dateOfJoining,
      sortable: true,
    },
  ];

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userList = useSelector((state) => state.userList);
  const { users } = userList;

  const [records, setRecords] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleFilter(event) {
    const newData = records.filter((row) => {
      return row.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setFilteredRows(newData);
  }

  function exportToExcel() {
    const worksheet = XLSX.utils.json_to_sheet(records);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "Employees.xlsx");
  }

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
      const userData =
        users &&
        users.map((user) => {
          return {
            id: user._id,
            name: user.name,
            email: user.email,
            designation: user.jobDetails.designation,
            department: user.jobDetails.department,
            dateOfJoining: user.jobDetails.dateOfJoining,
          };
        });
      setRecords(userData);
    } else {
      navigate("/");
    }
  }, [dispatch, userInfo, navigate, users]);

  return (
    <div className="container">
      <div
        className="search"
        style={{ width: "fit-content", height: "fit-content", margin: "16px" }}
      >
        <TextField
          sx={{ width: "20ch" }}
          color="error"
          id="input-with-icon-textfield"
          placeholder="Search"
          onChange={handleFilter}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
        <Button
          sx={{ ml: 4 }}
          color="error"
          variant="contained"
          onClick={exportToExcel}
          endIcon={<Upgrade />}
        >
          Export to Excel
        </Button>
        <Button
          sx={{ ml: 4 }}
          color="error"
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate("/home/add")}
        >
          Add an Employee
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={filteredRows.length === 0 ? records : filteredRows}
        fixedHeader
        pagination
        highlightOnHover
        onRowClicked={(row) => {
          navigate(`/home/profile/${row.id}`);
        }}
      ></DataTable>
    </div>
  );
}
export default EmployeeTable;
