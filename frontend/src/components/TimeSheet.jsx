import React, { useState, useEffect } from "react";
import { Grid, Stack, TextField, Divider, Button } from "@mui/material";
import DataTable from "react-data-table-component";
import { useSelector, useDispatch } from "react-redux";
import Graph from "./common/Graph";
import { listUsers } from "../actions/userActions";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import moment from "moment";

const TimeSheet = () => {
  const columns = [
    {
      name: <b>Name</b>,
      selector: (row) => row.name,
    },
    {
      name: <b>Department</b>,
      selector: (row) => row.department,
    },
    {
      name: <b>Status</b>,
      selector: (row) => row.status,
    },
    {
      name: <b>Checked-In</b>,
      selector: (row) => row.checkedIn,
    },
    {
      name: <b>Checked-Out</b>,
      selector: (row) => row.checkedOut,
    },
    {
      name: <b>Work Hours</b>,
      selector: (row) => row.workHours,
    },
    {
      name: <b>Date</b>,
      selector: (row) => row.date,
    },
  ];

  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [employeeNames, setEmployeeNames] = useState([]);
  const [selectedName, setSelectedName] = useState("");
  const [attendance, setAttendance] = useState([]);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [filteredRows, setFilteredRows] = useState([]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userList = useSelector((state) => state.userList);
  const { users } = userList;

  const calculateWorkHours = (starttime, endtime) => {
    if (!endtime) {
      return "";
    }
    let startTime = moment(starttime, "hh:mm:ss A");
    let endTime = moment(endtime, "hh:mm:ss A");
    let duration = moment.duration(endTime.diff(startTime));
    let hour = duration.hours();
    let minute = duration.minutes();
    let second = duration.seconds();
    let totalWorkHours = moment({
      hours: hour,
      minutes: minute,
      seconds: second,
    }).format("HH:mm:ss");
    return totalWorkHours;
  };

  const rowsData = attendance.map((row) => {
    return {
      id: row._id,
      name: row.name,
      department: row.department,
      status: "Present",
      checkedIn: row.checkIn,
      checkedOut: row.checkOut,
      workHours: calculateWorkHours(row.checkIn, row.checkOut),
      date: row.createdAt.split("T")[0],
    };
  });

  const handleFilter = () => {
    const filterRowsOnClick = rowsData.filter((item) => {
      const itemDate = new Date(item.date);
      const startDateTime = new Date(startDate);
      const endDateTime = new Date(endDate);
      //Set the end date time to the end of the day
      endDateTime.setHours(23, 59, 59, 999);
      return (
        itemDate >= startDateTime &&
        itemDate <= endDateTime &&
        item.name === selectedName
      );
    });
    setFilteredRows(filterRowsOnClick);
    setIsFilterApplied(true);
  };

  const dataForGraph = filteredRows.map((row) => {
    return {
      workHours: calculateWorkHours(row.checkIn, row.checkOut),
    };
  });

  const handleClear = () => {
    setFilteredRows([]);
    setStartDate("");
    setEndDate("");
    setSelectedName("");
    setIsFilterApplied(false);
  };

  useEffect(() => {
    const fetchAttendance = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      try {
        const { data } = await axios.get("/api/attendance", config);
        setAttendance(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAttendance();
    dispatch(listUsers());
    const userNames =
      users &&
      users.map((user) => {
        return {
          name: user.name,
        };
      });
    setEmployeeNames(userNames);
  }, [userInfo, dispatch, users]);

  return (
    <Grid
      item
      xs={12}
      sx={{
        marginLeft: "256px",
        backgroundColor: "#eaeff1",
        padding: "32px",
        minHeight: "calc(100vh - 67px)",
        position: "relative",
      }}
    >
      <Grid>
        <Stack
          direction="row"
          sx={{ marginTop: -2, height: 80, display: "flex" }}
        >
          <TextField
            InputLabelProps={{ shrink: true }}
            label="Employee Name"
            sx={{ m: 1, width: 300, mt: 2, background: "white" }}
            name="selectedName"
            select
            value={selectedName}
            onChange={(e) => setSelectedName(e.target.value)}
            //onBlur={handleBlur}
            // error={!!errors.department && isTouched.department}
            // helperText={
            //   errors.department && isTouched.department
            //     ? errors.department
            //     : "Please select the department"
            // }
          >
            {employeeNames.map((option) => (
              <MenuItem key={option.name} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            InputLabelProps={{ shrink: true }}
            sx={{ width: "180px", backgroundColor: "white" }}
            name="startDate"
            type="date"
            label="Start Date"
            margin="normal"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}

            // onBlur={handleBlur}

            // error={!!errors.startDate && isTouched.startDate}

            // helperText={

            //   errors.startDate && isTouched.startDate && errors.startDate

            // }
          />

          <Divider
            orientation="horizontal"
            variant="middle"
            sx={{ mx: 3, bgcolor: "grey.500", width: "1px", my: 3 }}
          />

          <TextField
            InputLabelProps={{ shrink: true }}
            sx={{ width: "180px", backgroundColor: "white" }}
            name="endDate"
            label="End Date"
            type="date"
            margin="normal"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}

            // onBlur={handleBlur}

            // error={!!errors.endDate && isTouched.endDate}

            // helperText={errors.endDate && isTouched.endDate && errors.endDate}
          />
          <Stack sx={{ direction: "column" }}>
            <Button
              variant="contained"
              color="error"
              sx={{ height: 30, marginLeft: 2 }}
              onClick={handleFilter}
            >
              Apply Filter
            </Button>
            <Button
              sx={{ height: 30, marginTop: 1, marginLeft: 2 }}
              variant="contained"
              color="error"
              size="small"
              onClick={handleClear}
            >
              Clear filter
            </Button>
          </Stack>
        </Stack>
      </Grid>
      {isFilterApplied && <DataTable data={filteredRows} columns={columns} />}
      {isFilterApplied && (
        <Graph startDate={startDate} endDate={endDate} data={dataForGraph} />
      )}
    </Grid>
  );
};

export default TimeSheet;
