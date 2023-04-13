import React, { useState } from "react";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import moment, * as Moment from "moment";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const HomeScreen = () => {
  const [alignment, setAlignment] = React.useState("web");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [workHours, setWorkHours] = useState(null);

  const handleCheckIn = () => {
    let now = moment();
    setCheckIn(now.format("hh:mm:ss A"));
    console.log({ checkIn });
  };

  const handleCheckOut = () => {
    let now = moment();
    setCheckOut(now.format("hh:mm:ss A"));
    calculateWorkHours(checkIn, checkOut);
  };

  // function calculateWorkHours(checkIn, checkOut) {
  //   const diff = moment.duration(checkOut.diff(checkIn));
  //   const hours = diff.asHours();
  //   return hours;
  // }
  const calculateWorkHours = (starttime, endtime) => {
    if (!endtime) {
      return "";
    }
    let startTime = moment(starttime, "HH:mm:ss a");
    let endTime = moment(endtime, "HH:mm:ss a");
    let duration = moment.duration(endTime.diff(startTime));
    let hours = parseInt(duration.asHours());
    let minutes = parseInt(duration.asMinutes()) - hours * 60;

    console.log(hours, minutes);
    return setWorkHours(`{${hours}:${minutes}}`);
  };
  const current = new Date();
  const time = current.toLocaleTimeString("en-US");

  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

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
                <span style={{ color: "#D32F2F" }}>Greetings,</span>{" "}
                {userInfo.name}
              </Typography>
              {/* {userInfo && userInfo.jobDetails && (
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {userInfo.jobDetails.title}
                </Typography>
              )} */}
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                {userInfo.jobDetails && userInfo.jobDetails.title}
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
          <Box display="flex">
            <CardContent>
              <Typography variant="h5">{time}</Typography>
              <Typography variant="subtitle1">
                {moment(current).format("dddd, MMMM Do YYYY")}
              </Typography>
            </CardContent>
          </Box>
        </Card>
        {/* <Card
          sx={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "#f5f5f5",
            //bgcolor: "background.paper",
            boxShadow: 3,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                Greetings, Muhammad Usman!
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                Full-Stack Developer
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
          <Box sx={{ display: "flex" }}>
            <CardContent>
              <Typography variant="h5">{time}</Typography>
              <Typography variant="subtitle1">{date}</Typography>
            </CardContent>
          </Box>
        </Card> */}
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
                color="text.error"
                component="div"
              >
                Attendance Analysis
              </Typography>

              <Typography sx={{ mt: 5 }} variant="h6" color="initial">
                Shift Time
              </Typography>
              <Typography color={"initial"}>9:00AM To 5:00PM</Typography>
            </CardContent>
          </Box>

          <Box>
            <CardContent sx={{ mt: 10, ml: 12 }}>
              <Typography variant="subtitle1" color="initial">
                Check-In Time
              </Typography>
              <Typography variant="subtitle1" color="green">
                {checkIn ? checkIn : "00:00:00"}
              </Typography>
            </CardContent>
          </Box>

          <Box>
            <CardContent sx={{ mt: 10, ml: 12 }}>
              <Typography variant="subtitle1" color="initial">
                Check-Out Time
              </Typography>
              <Typography variant="subtitle1" color="initial">
                {checkOut ? checkOut : "00:00:00"}
              </Typography>
            </CardContent>
          </Box>
          <Box>
            <CardContent sx={{ mt: 10, ml: 12 }}>
              <Typography variant="subtitle1" color="initial">
                Working Hours
              </Typography>
              <Typography>{workHours} </Typography>
            </CardContent>
          </Box>
          <Box>
            <CardContent sx={{ mt: 10 }}>
              <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="check-buttons"
              >
                <ToggleButton
                  onClick={handleCheckIn}
                  color={"success"}
                  value="check-in"
                >
                  Check-In
                </ToggleButton>
                <ToggleButton
                  onClick={handleCheckOut}
                  color={"error"}
                  value="check-out"
                >
                  Check-Out
                </ToggleButton>
              </ToggleButtonGroup>
            </CardContent>
          </Box>
        </Card>
        {/* <Card
          sx={{ display: "flex", backgroundColor: "#f5f5f5", boxShadow: 3 }}
        >
          <Box sx={{ display: "flex" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                Today's Analysis
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                Attendance Analysis
              </Typography>
              <Box>
                <Button
                  sx={{ marginTop: "30px", boxShadow: 3 }}
                  variant="contained"
                  color="error"
                  onClick={handleClick}
                >
                  {isCheckedIn ? "Check-In" : "Check-Out"}
                </Button>
              </Box>
            </CardContent>
          </Box>
          <Box sx={{ display: "flex" }}>
            <CardContent sx={{ mt: 10, ml: 12 }}>
              <Typography variant="h6" color="initial">
                Office Start Time
              </Typography>
              <Typography>{time}</Typography>
            </CardContent>
          </Box>

          <Box>
            <CardContent sx={{ mt: 10, ml: 12 }}>
              <Typography variant="h6" color="initial">
                Check-In Time
              </Typography>
              <Typography color={"green"}>{time}</Typography>
            </CardContent>
          </Box>
          <Box>
            <CardContent sx={{ mt: 10, ml: 12 }}>
              <Typography variant="h6" color="initial">
                Checked-In Since
              </Typography>
              <Typography>{time}</Typography>
            </CardContent>
          </Box>
        </Card> */}
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
              <Typography variant="h5" color="initial">
                Facts
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Overall Attendance Analysis
              </Typography>
            </CardContent>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

export default HomeScreen;
