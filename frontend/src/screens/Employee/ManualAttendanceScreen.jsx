import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ManualAttendanceModal from "../../components/ManualAttendanceModal";
import DataTable from "react-data-table-component";
import {
  approveByEM,
  approveBySupervisor,
  cancelBySupervisor,
  getTeamAttendanceRequests,
  getTeamAttendanceRequestsForEM,
  getUserAttendanceRequest,
} from "../../actions/attendanceRequestActions";
import axios from "axios";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Badge from "@mui/material/Badge";

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

const ManualAttendanceScreen = () => {
  const columns = [
    {
      name: <b>Date</b>,
      selector: (row) => row.date,
      sortable: true,
      width: 130,
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

  const columnsForAttendanceRequests = [
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
    },
    {
      name: <b>Date</b>,
      selector: (row) => row.date,
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
          <Stack direction="row">
            <IconButton
              color="primary"
              onClick={() => handleApprove(row.id)}
              disabled={row.supervisorApproval || row.status === "Cancelled"}
            >
              <CheckCircleIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => handleCancel(row.id)}
              disabled={row.supervisorApproval || row.status === "Cancelled"}
            >
              <CancelIcon />
            </IconButton>
          </Stack>
        </>
      ),
    },
  ];

  const columnsForAttendanceRequestsForEM = [
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
    },
    {
      name: <b>Date</b>,
      selector: (row) => row.date,
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
          <Stack direction="row">
            <IconButton
              color="primary"
              onClick={() => handleApproveForEM(row.id)}
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

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const attendanceRequest = useSelector((state) => state.attendanceRequest);
  const { success } = attendanceRequest;

  // const userAttendanceRequest = useSelector(
  //   (state) => state.userAttendanceRequest
  // );
  // const { userAttendanceRequest: userRequest } = userAttendanceRequest;

  const teamAttendanceRequest = useSelector(
    (state) => state.teamAttendanceRequest
  );
  const { attendanceRequests } = teamAttendanceRequest;

  const teamAttendanceRequestForEM = useSelector(
    (state) => state.teamAttendanceRequestForEM
  );
  const { attendanceRequests: requestsForEM } = teamAttendanceRequestForEM;

  const attendanceApprovedBySupervisor = useSelector(
    (state) => state.attendanceApprovedBySupervisor
  );
  const { success: successApprove } = attendanceApprovedBySupervisor;

  const attendanceApprovedByEM = useSelector(
    (state) => state.attendanceApprovedByEM
  );
  const { success: successApproveEM } = attendanceApprovedByEM;

  const attendanceCancelledBySupervisor = useSelector(
    (state) => state.attendanceCancelledBySupervisor
  );
  const { success: successCancel } = attendanceCancelledBySupervisor;

  const [userRequests, setUserRequests] = useState([]);

  const [open, setOpen] = useState(false);
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleApprove = (id) => {
    dispatch(approveBySupervisor(id));
  };

  const handleApproveForEM = (id) => {
    dispatch(approveByEM(id));
  };

  const handleCancel = (id) => {
    dispatch(cancelBySupervisor(id));
  };

  const rows = userRequests?.map((request) => {
    return {
      id: request._id,
      date: request.date,
      reason: request.reason,
      status: request.status,
    };
  });

  const rowsForAttendanceRequestsEM = requestsForEM
    ?.filter((request) => request.supervisorApproval)
    .map((request) => {
      return {
        id: request._id,
        name: request.name,
        department: request.department,
        date: request.date,
        reason: request.reason,
        status: request.status,
      };
    });

  const rowsForAttendanceRequests = attendanceRequests?.map((request) => {
    return {
      id: request._id,
      name: request.name,
      department: request.department,
      date: request.date,
      reason: request.reason,
      status: request.status,
      supervisorApproval: request.supervisorApproval,
    };
  });

  useEffect(() => {
    dispatch(getTeamAttendanceRequests());
    dispatch(getTeamAttendanceRequestsForEM());
    dispatch(getUserAttendanceRequest());
    const fetchUserRequests = async () => {
      try {
        const { data } = await axios.get(
          `/api/attendanceRequest/${userInfo._id}`
        );
        setUserRequests(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserRequests();
  }, [
    dispatch,
    success,
    userInfo,
    successApprove,
    successApproveEM,
    successCancel,
  ]);

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
        {userInfo.role.includes("Engagement Manager") && (
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="My Attendance Requests" {...a11yProps(0)} />
                <Tab
                  label={
                    <Badge
                      //badgeContent={numberOfPendingLeaves}
                      color="error"
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                    >
                      Attendance Requests
                    </Badge>
                  }
                  {...a11yProps(1)}
                />

                <Box sx={{ marginLeft: "24px" }}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleToggle}
                  >
                    Apply For Attendance
                  </Button>
                </Box>
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <DataTable
                data={rows}
                columns={columns}
                pagination
                highlightOnHover
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Box sx={{ height: "calc(100vh - 215px)" }}>
                <DataTable
                  data={rowsForAttendanceRequestsEM}
                  columns={columnsForAttendanceRequestsForEM}
                  pagination
                  highlightOnHover
                />
              </Box>
            </TabPanel>
            {/* <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              open={openApproveToast}
              autoHideDuration={3000}
              onClose={handleCloseApproveToast}
            >
              <Alert severity="success" sx={{ width: "100%" }}>
                Leave request approved successfully
              </Alert>
            </Snackbar>
            <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              open={openCancelToast}
              autoHideDuration={3000}
              onClose={handleCloseCancelToast}
            >
              <Alert severity="success" sx={{ width: "100%" }}>
                Leave request cancelled
              </Alert>
            </Snackbar> */}
          </Box>
        )}

        {userInfo.role.includes("Line Manager") && (
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="My Attendance Requests" {...a11yProps(0)} />
                <Tab
                  label={
                    <Badge
                      //badgeContent={numberOfPendingLeaves}
                      color="error"
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                    >
                      Attendance Requests
                    </Badge>
                  }
                  {...a11yProps(1)}
                />

                <Box sx={{ marginLeft: "24px" }}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleToggle}
                  >
                    Apply For Attendance
                  </Button>
                </Box>
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <DataTable
                data={rows}
                columns={columns}
                pagination
                highlightOnHover
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Box sx={{ height: "calc(100vh - 215px)" }}>
                <DataTable
                  data={rowsForAttendanceRequests}
                  columns={columnsForAttendanceRequests}
                  pagination
                  highlightOnHover
                />
              </Box>
            </TabPanel>
            {/* <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              open={openApproveToast}
              autoHideDuration={3000}
              onClose={handleCloseApproveToast}
            >
              <Alert severity="success" sx={{ width: "100%" }}>
                Leave request approved successfully
              </Alert>
            </Snackbar>
            <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              open={openCancelToast}
              autoHideDuration={3000}
              onClose={handleCloseCancelToast}
            >
              <Alert severity="success" sx={{ width: "100%" }}>
                Leave request cancelled
              </Alert>
            </Snackbar> */}
          </Box>
        )}
        {userInfo.role.includes("Employee") && (
          <>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box>
                <Button
                  color="error"
                  variant="contained"
                  onClick={handleToggle}
                  sx={{ margin: 2 }}
                >
                  Apply For Attendance
                </Button>
              </Box>

              <Box
                sx={{ display: "flex", flexDirection: "column", width: 1200 }}
              >
                <DataTable
                  data={rows}
                  columns={columns}
                  pagination
                  highlightOnHover
                />
              </Box>
            </Box>
          </>
        )}
      </>
      <ManualAttendanceModal open={open} onClose={handleClose} />
    </Grid>
  );
};

export default ManualAttendanceScreen;
