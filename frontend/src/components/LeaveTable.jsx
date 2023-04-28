import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import DataTable from "react-data-table-component";
import CircularProgress from "@mui/material/CircularProgress";
import { getLeaves } from "../actions/leaveActions";
import { Button } from "@mui/material";
import LeaveQuotaModal from "./LeaveQuotaModal";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { Search } from "@mui/icons-material";

const LeaveTable = () => {
  const [open, setOpen] = useState(false);
  const [filteredRows, setFilteredRows] = useState([]);
  const leavesList = useSelector((state) => state.leavesList);
  const { loading, leaves } = leavesList;

  const dispatch = useDispatch();

  function handleFilter(event) {
    const newData = rowsData.filter((row) => {
      return row.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setFilteredRows(newData);
  }

  const columns = [
    {
      name: <b>Name</b>,
      selector: (row) => row.name,
      width: 150,
      sortable: true,
    },
    {
      name: <b>Department</b>,
      selector: (row) => row.department,
      sortable: true,
      width: 150,
    },
    {
      name: <b>Start Date</b>,
      selector: (row) => row.startDate,
      width: 130,
    },
    {
      name: <b>End Date</b>,
      selector: (row) => row.endDate,
      width: 130,
    },
    {
      name: <b>Days</b>,
      selector: (row) => row.days,
      width: 90,
      sortable: true,
    },
    {
      name: <b>Status</b>,
      selector: (row) => row.status,
      sortable: true,
      width: 90,
    },
  ];

  const calculateDays = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
    return daysDiff;
  };

  const rowsData = leaves?.map((leave) => {
    return {
      id: leave._id,
      name: leave.name,
      department: leave.department,
      startDate: leave.startDate,
      endDate: leave.endDate,
      days: calculateDays(leave.startDate, leave.endDate),
      status: leave.status,
    };
  });

  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    dispatch(getLeaves());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <TextField
              sx={{ width: "20ch", mr: "auto" }}
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
            <Button variant="contained" color="error" onClick={handleClick}>
              Set Leave Quota
            </Button>
          </Box>
          <LeaveQuotaModal open={open} handleClose={handleClose} />
          <DataTable
            //data={rowsData}
            data={filteredRows.length === 0 ? rowsData : filteredRows}
            columns={columns}
            pagination
            highlightOnHover
          />
        </>
      )}
    </>
  );
};

export default LeaveTable;
