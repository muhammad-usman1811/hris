import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
//import Chip from "@mui/material/Chip";
import LeaveModal from "../../components/LeaveModal";
import QuotaCard from "../../components/common/QuotaCard";
//import { DataGrid } from "@mui/x-data-grid";
import DataTable from "react-data-table-component";
//import DataTable from "../../components/common/DataTable";
import {
  approveLeave,
  cancelLeave,
  getTeamLeaves,
  getUserLeaves,
} from "../../actions/leaveActions";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const EmployeeLeaveScreen = () => {
  const columnsForLeaveRequests = [
    {
      name: <b>Name</b>,
      selector: (row) => row.name,
      width: 150,
      sortable: true,
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
      name: <b>Reason</b>,
      selector: (row) => row.reason,
      sortable: true,
      width: 150,
    },
    {
      name: <b>Status</b>,
      selector: (row) => row.status,
      sortable: true,
      width: 90,
    },
    {
      name: <b>Actions</b>,
      width: 150,
      cell: (row) => (
        <>
          <Stack direction="row">
            <IconButton
              color="primary"
              onClick={() => handleApprove(row.id)}
              disabled={row.status !== "Pending"}
            >
              <CheckCircleIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => handleCancel(row.id)}
              disabled={row.status !== "Pending"}
            >
              <CancelIcon />
            </IconButton>
          </Stack>
        </>
      ),
    },
  ];

  const columnsForLeaves = [
    {
      name: <b>Type</b>,
      selector: (row) => row.type,
      sortable: true,
      width: 130,
    },
    {
      name: <b>Start Date</b>,
      selector: (row) => row.startDate,
      sortable: true,
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
      sortable: true,
      width: 90,
    },
    {
      name: <b>Reason</b>,
      selector: (row) => row.reason,
      width: 150,
    },
    {
      name: <b>Status</b>,
      selector: (row) => row.status,
      sortable: true,
      width: 130,
    },
  ];

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const leaveRequest = useSelector((state) => state.leaveRequest);
  const { success: successRequest } = leaveRequest;

  const userLeaves = useSelector((state) => state.userLeaves);
  const { leaves: userLeavesData } = userLeaves;

  const teamLeaves = useSelector((state) => state.teamLeaves);
  const { leaves: teamLeavesData } = teamLeaves;

  const leaveApprove = useSelector((state) => state.leaveApprove);
  const { success: successApprove } = leaveApprove;

  const leaveCancel = useSelector((state) => state.leaveCancel);
  const { success: successCancel } = leaveCancel;

  const calculateDays = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
    return daysDiff;
  };

  const rowsForLeaveRequests = teamLeavesData?.map((leave) => {
    return {
      id: leave._id,
      name: leave.name,
      startDate: leave.startDate,
      endDate: leave.endDate,
      days: calculateDays(leave.startDate, leave.endDate),
      reason: leave.reason,
      status: leave.status,
    };
  });

  const rowsForLeaves = userLeavesData?.map((leave) => {
    return {
      id: leave._id,
      type: leave.type,
      startDate: leave.startDate,
      endDate: leave.endDate,
      days: calculateDays(leave.startDate, leave.endDate),
      reason: leave.reason,
      status: leave.status,
    };
  });

  const [value, setValue] = React.useState(0);
  const [open, setOpen] = useState(false);

  const totalSickLeaves = 10;
  const totalCasualLeaves = 5;
  const totalAnnualLeaves = 18;

  const usedSickLeaves = 5;
  const usedCasualLeaves = 2;
  const usedAnnualLeaves = 12;

  const availableSickLeaves = totalSickLeaves - usedSickLeaves;
  const availableCasualLeaves = totalCasualLeaves - usedCasualLeaves;
  const availableAnnualLeaves = totalAnnualLeaves - usedAnnualLeaves;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleApprove = (id) => {
    dispatch(approveLeave(id));
  };
  const handleCancel = (id) => {
    dispatch(cancelLeave(id));
  };

  useEffect(() => {
    dispatch(getUserLeaves());
    dispatch(getTeamLeaves());
  }, [dispatch, successRequest, successApprove, successCancel]);

  return (
    <Grid
      item
      xs={12}
      container
      sx={{
        marginLeft: "256px",
        backgroundColor: "#eaeff1",
        padding: "15px",
        width: "100vh",
        minHeight: "calc(100vh - 67px)",
        position: "relative",
      }}
    >
      <>
        {userInfo.role === "Supervisor" && (
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="My Leaves" {...a11yProps(0)} />
                <Tab label="Leave Requests" {...a11yProps(1)} />

                <Box sx={{ marginLeft: "24px" }}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleToggle}
                  >
                    Request for Leave
                  </Button>
                </Box>
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <Grid item container xs={12} columnSpacing={3}>
                <Grid item xs={4}>
                  <QuotaCard
                    usedDays={usedSickLeaves}
                    availableDays={availableSickLeaves}
                    value={(usedSickLeaves / totalSickLeaves) * 100}
                    text={"Sick Leave"}
                  />
                </Grid>
                <Grid item xs={4}>
                  <QuotaCard
                    usedDays={usedCasualLeaves}
                    availableDays={availableCasualLeaves}
                    value={(usedCasualLeaves / totalCasualLeaves) * 100}
                    text={"Casual Leave"}
                  />
                </Grid>
                <Grid item xs={4}>
                  <QuotaCard
                    usedDays={usedAnnualLeaves}
                    availableDays={availableAnnualLeaves}
                    value={(usedAnnualLeaves / totalAnnualLeaves) * 100}
                    text={"Annual Leave"}
                  />
                </Grid>
              </Grid>
              <TableContainer component={Paper} sx={{ mt: "24px" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Type</TableCell>
                      <TableCell>Start Date</TableCell>
                      <TableCell>End Date</TableCell>
                      <TableCell>Days</TableCell>
                      <TableCell>Reason</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rowsForLeaves?.map((leave) => (
                      <TableRow
                        key={leave.id}
                        sx={{
                          "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
                          "&.Mui-selected": {
                            backgroundColor: "rgba(0, 0, 0, 0.08)",
                          },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {leave.type}
                        </TableCell>
                        <TableCell>{leave.startDate}</TableCell>
                        <TableCell>{leave.endDate}</TableCell>
                        <TableCell>{leave.days}</TableCell>
                        <TableCell>{leave.reason}</TableCell>
                        <TableCell>{leave.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Box sx={{ height: "calc(100vh - 215px)" }}>
                <DataTable
                  data={rowsForLeaveRequests}
                  columns={columnsForLeaveRequests}
                  pagination
                  highlightOnHover
                />
              </Box>
            </TabPanel>
          </Box>
        )}
        {userInfo.role === "Employee" && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignContent: "flex-end",
                width: "fit-content",
                height: "fit-content",
                margin: "8px",
              }}
            >
              <Button color="error" variant="contained" onClick={handleToggle}>
                Apply For Leave
              </Button>
            </div>
            <Grid item container xs={12} columnSpacing={3}>
              <Grid item xs={4}>
                <QuotaCard
                  usedDays={usedSickLeaves}
                  availableDays={availableSickLeaves}
                  value={(usedSickLeaves / totalSickLeaves) * 100}
                  text={"Sick Leave"}
                />
              </Grid>
              <Grid item xs={4}>
                <QuotaCard
                  usedDays={usedCasualLeaves}
                  availableDays={availableCasualLeaves}
                  value={(usedCasualLeaves / totalCasualLeaves) * 100}
                  text={"Casual Leave"}
                />
              </Grid>
              <Grid item xs={4}>
                <QuotaCard
                  usedDays={usedAnnualLeaves}
                  availableDays={availableAnnualLeaves}
                  value={(usedAnnualLeaves / totalAnnualLeaves) * 100}
                  text={"Annual Leave"}
                />
              </Grid>
              <Grid item xs={12}>
                <DataTable
                  data={rowsForLeaves}
                  columns={columnsForLeaves}
                  pagination
                  highlightOnHover
                />
                {/* <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <Typography
                            sx={{ fontWeight: "bold" }}
                            variant="subtitle1"
                          >
                            Type
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            sx={{ fontWeight: "bold" }}
                            variant="subtitle1"
                          >
                            Start Date
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            sx={{ fontWeight: "bold" }}
                            variant="subtitle1"
                          >
                            End Date
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            sx={{ fontWeight: "bold" }}
                            variant="subtitle1"
                          >
                            Days
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            sx={{ fontWeight: "bold" }}
                            variant="subtitle1"
                          >
                            Reason
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            sx={{ fontWeight: "bold" }}
                            variant="subtitle1"
                          >
                            Status
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {userLeavesData?.map((leave) => (
                        <TableRow
                          key={leave._id}
                          sx={{
                            "&:hover": {
                              backgroundColor: "rgba(0, 0, 0, 0.04)",
                            },
                            "&.Mui-selected": {
                              backgroundColor: "rgba(0, 0, 0, 0.08)",
                            },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {leave.type}
                          </TableCell>
                          <TableCell>{leave.startDate}</TableCell>
                          <TableCell>{leave.endDate}</TableCell>
                          <TableCell>
                            {calculateDays(leave.startDate, leave.endDate)}
                          </TableCell>
                          <TableCell>{leave.reason}</TableCell>
                          <TableCell>{leave.status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer> */}
              </Grid>
            </Grid>
          </>
        )}
      </>
      <LeaveModal open={open} onClose={handleClose} />
    </Grid>
  );
};

export default EmployeeLeaveScreen;
