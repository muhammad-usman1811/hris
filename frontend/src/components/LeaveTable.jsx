import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import DataTable from "react-data-table-component";
import CircularProgress from "@mui/material/CircularProgress";
import { getLeaves } from "../actions/leaveActions";

const LeaveTable = () => {
  const leavesList = useSelector((state) => state.leavesList);
  const { loading, leaves } = leavesList;

  const dispatch = useDispatch();

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
        <DataTable
          data={rowsData}
          columns={columns}
          pagination
          highlightOnHover
        />
      )}
    </>
  );
};

export default LeaveTable;
