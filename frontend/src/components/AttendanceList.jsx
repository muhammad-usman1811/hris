import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DataTable from "react-data-table-component";
import moment from "moment";
import axios from "axios";
import { Search } from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
import { Grid, Stack, TextField, Divider, Button } from "@mui/material";

const AttendanceList = () => {
  const columns = [
    {
      name: <b>Name</b>,
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: <b>Department</b>,
      selector: (row) => row.department,
    },
    {
      name: <b>Status</b>,
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: <b>Date</b>,
      selector: (row) => row.date,
      sortable: true,
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
  ];

  const [attendance, setAttendance] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [filteredRows, setFilteredRows] = useState([]);
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const calculateWorkHours = (starttime, endtime) => {
    if (!endtime) {
      return "00:00:00";
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
    })
      .subtract(1, "hour")
      .format("HH:mm:ss");
    return totalWorkHours;
  };

  const rowsData = attendance.map((row) => {
    return {
      id: row._id,
      name: row.name,
      department: row.department,
      status: "Present",
      checkedIn: moment(row.checkIn, "hh:mm:ss:A").format("hh:mm:ss:A"),
      checkedOut: row.checkOut
        ? moment(row.checkOut, "hh:mm:ss:A").format("hh:mm:ss:A")
        : "Not checked out",
      workHours: calculateWorkHours(row.checkIn, row.checkOut),
      date: row.createdAt.split("T")[0],
    };
  });

  function handleSearch(event) {
    const newData = rowsData.filter((row) => {
      return row.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setFilteredRows(newData);
    isFilterApplied(true);
  }

  const handleFilter = () => {
    const filterRowsOnClick = rowsData.filter((item) => {
      const itemDate = new Date(item.date);
      const startDateTime = new Date(startDate);
      const endDateTime = new Date(endDate);
      //Set the end date time to the end of the day
      endDateTime.setHours(23, 59, 59, 999);
      return itemDate >= startDateTime && itemDate <= endDateTime;
    });
    setFilteredRows(filterRowsOnClick);
    setIsFilterApplied(true);
  };

  const handleClear = () => {
    setFilteredRows([]);
    setStartDate("");
    setEndDate("");
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
  }, [userInfo, dispatch]);
  return (
    <>
      <Grid>
        <Stack
          direction="row"
          sx={{ marginTop: -2, height: 80, display: "flex" }}
        >
          <TextField
            sx={{ width: "20ch", m: 2 }}
            color="error"
            id="input-with-icon-textfield"
            placeholder="Search"
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
          <TextField
            InputLabelProps={{ shrink: true }}
            sx={{ width: "180px", backgroundColor: "white" }}
            name="startDate"
            type="date"
            label="Start Date"
            margin="normal"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
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
      {/* <Grid sx={{ height: 620, display: "flex" }}> */}
      <DataTable
        columns={columns}
        data={
          filteredRows.length === 0 ? rowsData : filteredRows
          //isFilterApplied && filteredRows.length > 0 ? filteredRows : rowsData
        }
        // noHeader
        pagination
        highlightOnHover
      />
      {/* <DataTable
          rows={
            isFilterApplied && filteredRows.length > 0 ? filteredRows : rowsData
          }
          columns={columns}
        /> */}
      {/* /</Grid> */}
    </>
  );
};

export default AttendanceList;
