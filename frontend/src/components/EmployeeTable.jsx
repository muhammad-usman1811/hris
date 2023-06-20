import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Search, Upgrade } from "@mui/icons-material";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteUser, listUsers } from "../actions/userActions";
const XLSX = require("xlsx");

function EmployeeTable() {
  const columns = [
    {
      name: <b>Employee ID</b>,
      selector: (row) => row.employeeId,
      sortable: true,
    },
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
    {
      name: <b>Actions</b>,
      width: 90,
      cell: (row) => (
        <>
          <IconButton color="error" onClick={() => handleDelete(row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userList = useSelector((state) => state.userList);
  const { users } = userList;

  const userAdd = useSelector((state) => state.userAdd);
  const { success: successAdd } = userAdd;

  const userEdit = useSelector((state) => state.userEdit);
  const { message, success: successEdit } = userEdit;

  const [records, setRecords] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [openToast, setOpenToast] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userDataForExcel =
    users &&
    users.map((user) => {
      return {
        EmployeeId: user.employeeId,
        Name: user.name,
        Email: user.email,
        Phone: user.phone,
        Address: user.address,
        CNIC: user.cnic,
        DOB: user.dob,
        Passport: user.passport,
        BloodGroup: user.emergencyDetails.blood,
        MaritalStatus: user.maritalStatus,
        Gender: user.gender,
        Title: user.jobDetails.title,
        Designation: user.jobDetails.designation,
        Department: user.jobDetails.department,
        ShiftStartTime: user.shiftStartTime,
        ShiftEndTime: user.shiftEndTime,
        Supervisor: user.jobDetails.supervisor,
        DateOfJoining: user.jobDetails.dateOfJoining,
        WorkType: user.jobDetails.workType,
        EmploymentStatus: user.jobDetails.employmentStatus,
        Salary: user.jobDetails.salary,
        EmergencyName: user.emergencyDetails.name,
        EmergencyContact: user.emergencyDetails.contact,
        Relation: user.emergencyDetails.relation,
        EmergencyAddress: user.emergencyDetails.address,
      };
    });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteUser(id));
    }
  };

  function handleFilter(event) {
    const newData = records.filter((row) => {
      return row.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setFilteredRows(newData);
  }

  function exportToExcel() {
    const worksheet = XLSX.utils.json_to_sheet(userDataForExcel);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "Employees.xlsx");
  }

  const handleToastClose = () => {
    setOpenToast(false);
  };

  useEffect(() => {
    if (userInfo && userInfo.role === "Admin") {
      dispatch(listUsers());
      const userData =
        users &&
        users.map((user) => {
          return {
            id: user._id,
            employeeId: user?.employeeId,
            name: user.name,
            email: user.email,
            designation: user.jobDetails.designation,
            department: user.jobDetails.department,
            dateOfJoining: user.jobDetails.dateOfJoining,
          };
        });
      setRecords(userData);
      if (successAdd) {
        dispatch({ type: "USER_ADD_RESET" });
      }
    } else {
      navigate("/");
    }
  }, [dispatch, userInfo, navigate, users, successAdd, successEdit]);

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
        noHeader
        pagination
        highlightOnHover
        onRowClicked={(row) => {
          navigate(`/home/profile/${row.id}`);
        }}
      />
      {message && (
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={openToast}
          onClose={handleToastClose}
          autoHideDuration={3000}
        >
          <Alert severity="success" sx={{ width: "100%" }}>
            {message.message}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
}
export default EmployeeTable;
