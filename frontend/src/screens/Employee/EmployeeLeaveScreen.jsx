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
      width: 130,
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
          {row.status === "Pending" && (
            <Stack direction="row">
              <IconButton color="primary" onClick={() => handleApprove(row.id)}>
                <CheckCircleIcon />
              </IconButton>
              <IconButton color="error" onClick={() => handleCancel(row.id)}>
                <CancelIcon />
              </IconButton>
            </Stack>
          )}
        </>
      ),
    },
  ];

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const leaveRequest = useSelector((state) => state.leaveRequest);
  const { success: successRequest } = leaveRequest;

  const userLeaves = useSelector((state) => state.userLeaves);
  const { loading: userLeavesLoading, leaves: userLeavesData } = userLeaves;

  const teamLeaves = useSelector((state) => state.teamLeaves);
  const { loading: teamLeavesLoading, leaves: teamLeavesData } = teamLeaves;

  const leaveApprove = useSelector((state) => state.leaveApprove);
  const { success: successApprove } = leaveApprove;

  const leaveCancel = useSelector((state) => state.leaveCancel);
  const { success: successCancel } = leaveCancel;

  const rowsData = teamLeavesData?.map((leave) => {
    return {
      id: leave._id,
      name: leave.name,
      department: leave.department,
      startDate: leave.startDate,
      endDate: leave.endDate,
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
                    color="primary"
                    onClick={handleToggle}
                  >
                    Request for Leave
                  </Button>
                </Box>
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Type</TableCell>
                      <TableCell align="right">Start Date</TableCell>
                      <TableCell align="right">End Date</TableCell>
                      <TableCell align="right">Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userLeavesData?.map((leave) => (
                      <TableRow
                        key={leave._id}
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
                        <TableCell align="right">{leave.startDate}</TableCell>
                        <TableCell align="right">{leave.endDate}</TableCell>
                        <TableCell align="right">{leave.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Box sx={{ height: "calc(100vh - 215px)" }}>
                <DataTable
                  data={rowsData}
                  columns={columns}
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
                <TableContainer component={Paper}>
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
                          <TableCell>2</TableCell>
                          <TableCell>{leave.status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
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