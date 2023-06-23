import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import moment from "moment";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import AlertDialog from "../../components/common/AlertDialog";
import PasswordChangeModal from "../../components/PasswordChangeModal";
import { useNavigate } from "react-router-dom";
import { logout } from "../../actions/userActions";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const HomeScreen = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [greeting, setGreeting] = useState("");
  const [time, setTime] = useState(new Date().toLocaleTimeString("en-Us"));
  const [checkIn, setCheckIn] = useState();
  const [showPasswordChangeModal, setShowPasswordChangeModal] = useState(
    userInfo.passwordChangeRequired
  );
  const [modalMessage, setModalMessage] = useState("");
  //localStorage.getItem(`checkIn:${userInfo._id}`)

  const [checkOut, setCheckOut] = useState();
  //localStorage.getItem(`checkOut:${userInfo._id}`)

  const [isOneHourPassed, setIsOneHourPassed] = useState(false);
  const [workHours, setWorkHours] = useState("00:00:00");

  const [openCheckInToast, setOpenCheckInToast] = useState(false);
  const [openCheckOutToast, setOpenCheckOutToast] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = React.useState(false);

  const handleCloseAlertDialog = () => {
    setOpenAlertDialog(false);
  };

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

  const handleCheckIn = async (Transition) => {
    let now = moment();
    const checkInTime = now.format("hh:mm:ss A");
    setCheckIn(checkInTime);
    setOpenCheckInToast(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    try {
      await axios.post(
        "/api/attendance/checkIn",
        { checkIn: checkInTime },
        config
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckOut = async () => {
    if (!isOneHourPassed) {
      setOpenAlertDialog(true);
      //alert("You can check-out atleast after 1 hour since check-in");
    } else {
      let now = moment();
      const checkOutTime = now.format("hh:mm:ss A");
      setCheckOut(checkOutTime);
      setOpenCheckOutToast(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      try {
        await axios.put(
          `/api/attendance/checkOut/${userInfo._id}`,
          {
            checkOut: checkOutTime,
          },
          config
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCloseCheckInToast = () => {
    setOpenCheckInToast(false);
  };

  const handleCloseCheckOutToast = () => {
    setOpenCheckOutToast(false);
  };

  const handlePasswordChange = (currentPassword, newPassword) => {
    // Call an API endpoint or perform necessary logic to change the password
    const sendPasswords = async () => {
      const userId = userInfo._id;
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        "/api/users/change-password",
        {
          currentPassword,
          newPassword,
          userId,
        },
        config
      );
      const message = response.data.message;
      setModalMessage(message);
      if (message === "Password Updated") {
        navigate("/");
        dispatch(logout());
        showPasswordChangeModal(false);
      }
    };
    sendPasswords();
    // Once the password is successfully changed, close the modal
  };

  useEffect(() => {
    const fetchUserAttendance = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        const result = await axios.get(
          `/api/attendance/todayAttendance/${userInfo._id}`,
          config
        );

        const attendance = result.data;
        setCheckIn(attendance.checkIn);
        if (attendance.checkOut) {
          setCheckOut(attendance.checkOut);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserAttendance();

    if (checkIn) {
      localStorage.setItem(`checkIn:${userInfo._id}`, checkIn);
      const oneHourAgo = moment().subtract(1, "hour");
      const isPassed = moment(checkIn, "hh:mm:ss A").isBefore(oneHourAgo);
      setIsOneHourPassed(isPassed);
    }

    if (checkOut) {
      localStorage.setItem(`checkOut:${userInfo._id}`, checkOut);
    }
    if (checkIn && checkOut) {
      setWorkHours(calculateWorkHours(checkIn, checkOut));
    }

    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting("Good Morning");
    } else if (hour >= 12 && hour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }

    const clearLocalStorageAtMidnight = () => {
      localStorage.removeItem(`checkIn:${userInfo._id}`);
      localStorage.removeItem(`checkOut:${userInfo._id}`);
    };

    const now = moment();
    const midnight = moment().endOf("day");
    const timeUntilMidnight = midnight.diff(now);

    const timeOut = setTimeout(clearLocalStorageAtMidnight, timeUntilMidnight);

    const interval = setInterval(() => {
      setTime(moment().format("hh:mm:ss A"));
    }, 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeOut);
    };
  }, [checkIn, checkOut, userInfo, isOneHourPassed]);

  return (
    <Grid
      item
      xs={12}
      container
      rowSpacing={3}
      sx={{
        marginTop: "auto",
        marginLeft: "256px",
        backgroundColor: "#eaeff1",
        padding: "0 24px 24px 24px",
        minHeight: "calc(100vh - 67px)",
        position: "relative",
      }}
    >
      {showPasswordChangeModal && (
        <PasswordChangeModal
          open={true}
          onClose={() => setShowPasswordChangeModal(false)}
          onSubmit={handlePasswordChange}
          message={modalMessage}
        />
      )}
      <Grid item xs={12}>
        <Card
          sx={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "#f5f5f5",
            boxShadow: 3,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                <span style={{ color: "#D32F2F" }}>{greeting},</span>{" "}
                {userInfo.name}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                {userInfo.title}
              </Typography>
            </CardContent>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                pl: 1,
                pb: 1,
                ml: 1,
                mt: 3,
              }}
            >
              <Typography variant="h6" color="initial">
                Activity Monitoring Dashboard
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
            }}
          >
            <CardContent>
              <Typography variant="h5">{time}</Typography>
              <Typography variant="subtitle1">
                {moment().format("dddd, LL")}
              </Typography>
            </CardContent>
          </Box>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card
          sx={{
            display: "flex",
            backgroundColor: "#f5f5f5",
            boxShadow: 3,
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5" color={"error"}>
                Today's Analysis
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                Attendance Analysis
              </Typography>

              <Typography sx={{ mt: 5 }} variant="h6" color="initial">
                Shift Time
              </Typography>
              <Typography color={"initial"}>9:00AM To 6:00PM</Typography>
            </CardContent>
          </Box>

          <Box sx={{ display: "flex" }}>
            <CardContent sx={{ mt: 8, ml: 8 }}>
              <Typography variant="h6" color="initial">
                Check-In Time
              </Typography>
              <Typography variant="subtitle1" color="green">
                {checkIn ? checkIn : "00:00:00"}
              </Typography>
            </CardContent>
          </Box>
          <Box>
            <CardContent sx={{ mt: 8, ml: 8 }}>
              <Typography variant="h6" color="initial">
                Check-Out Time
              </Typography>
              <Typography variant="subtitle1" color="initial">
                {checkOut ? checkOut : "00:00:00"}
              </Typography>
            </CardContent>
          </Box>
          <Box>
            <CardContent sx={{ mt: 8, ml: 8 }}>
              <Typography variant="h6" color="initial">
                Working Hours
              </Typography>
              <Typography>{workHours} </Typography>
            </CardContent>
          </Box>
          <Box>
            <CardContent sx={{ mt: 8 }}>
              <Button
                sx={{ width: 120 }}
                onClick={handleCheckIn}
                color={"success"}
                value="check-in"
                disabled={checkIn}
                variant="outlined"
              >
                Check-In
              </Button>
              <Button
                sx={{ width: 120 }}
                disabled={checkOut || !checkIn}
                //disabled={checkOut || !checkIn || !isOneHourPassed}
                onClick={handleCheckOut}
                color={"error"}
                value="check-out"
                variant="outlined"
              >
                Check-Out
              </Button>
              <AlertDialog
                open={openAlertDialog}
                onClose={handleCloseAlertDialog}
              />
              {/* <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="check-buttons"
              >
                <Tooltip title="Check-In">
                  <ToggleButton
                    sx={{ width: 120 }}
                    onClick={handleCheckIn}
                    color={"success"}
                    value="check-in"
                    disabled={checkIn}
                  >
                    Check-In
                  </ToggleButton>
                </Tooltip>
                <Tooltip title="Check-Out" arrow>
                  <ToggleButton
                    sx={{ width: 120 }}
                    disabled={checkOut || !checkIn || !isOneHourPassed}
                    onClick={handleCheckOut}
                    color={"error"}
                    value="check-out"
                  >
                    Check-Out
                  </ToggleButton>
                </Tooltip>
              </ToggleButtonGroup> */}
            </CardContent>
          </Box>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card
          sx={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "#f5f5f5",
            boxShadow: 3,
            height: 500,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography
                variant="h5"
                color="initial"
                sx={{ color: "#D32F2F" }}
              >
                Facts
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Overall Attendance Analysis
              </Typography>
              <CardContent>
                <Stack spacing={1} alignItems="center">
                  <Stack direction="row" spacing={3}>
                    <Badge badgeContent={0} color="error">
                      <Chip
                        sx={{ width: 200, height: 50 }}
                        label="Early Days"
                        color="primary"
                      />
                    </Badge>
                    <Badge badgeContent={2} color="error">
                      <Chip
                        sx={{ width: 200, height: 50 }}
                        label="Late Days"
                        color="error"
                      />
                    </Badge>
                    <Badge badgeContent={1} color="error">
                      <Chip
                        sx={{ width: 200, height: 50 }}
                        label="Half Days"
                        color="secondary"
                      />
                    </Badge>
                    <Badge badgeContent={7} color="error">
                      <Chip
                        sx={{ width: 200, height: 50 }}
                        label="On Time"
                        color="success"
                      />
                    </Badge>
                    <Badge badgeContent={5} color="error">
                      <Chip
                        sx={{
                          width: 200,
                          height: 50,
                          backgroundColor: "#009688",
                          color: "white",
                        }}
                        label="Non-Working Days"
                      />
                    </Badge>
                  </Stack>
                </Stack>
              </CardContent>
            </CardContent>
          </Box>
        </Card>
      </Grid>
      <Snackbar
        sx={{ width: "100%" }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={openCheckInToast}
        autoHideDuration={3000}
        onClose={handleCloseCheckInToast}
      >
        <Alert severity="success">Check-in successful</Alert>
      </Snackbar>
      <Snackbar
        sx={{ width: "100%" }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={openCheckOutToast}
        autoHideDuration={3000}
        onClose={handleCloseCheckOutToast}
      >
        <Alert severity="success">Check-out successful</Alert>
      </Snackbar>
    </Grid>
  );
};

export default HomeScreen;
