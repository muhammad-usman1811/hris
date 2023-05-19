import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import moment from "moment";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Snackbar from '@mui/material/Snackbar';
import { Alert} from "@mui/material";
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';



const HomeScreen = () => {
  const [alignment, setAlignment] = React.useState("web");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };


  const [openToast, setOpenToast] = useState(false);
  const [openToast1, setOpenToast1] = useState(false);

  

  const [greeting, setGreeting] = useState("");
  const [time, setTime] = useState(new Date().toLocaleTimeString("en-Us"));
  const [checkIn, setCheckIn] = useState(
    localStorage.getItem(`checkIn:${userInfo._id}`)
  );
  const [checkOut, setCheckOut] = useState(
    localStorage.getItem(`checkOut:${userInfo._id}`)
  );
  const [workHours, setWorkHours] = useState("00:00:00");

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

  const handleCheckIn = () => {
    let now = moment();
    setCheckIn(now.format("hh:mm:ss A"));
    setOpenToast(true);
  };
  const handleClose = () => {
    setOpenToast(false);
  };

  const handleCheckOut = () => {
    let now = moment();
    setCheckOut(now.format("hh:mm:ss A"));
    setOpenToast1(true);
  };
  const handleClose1 = () => {
    setOpenToast1(false);
  };
  

  useEffect(() => {
    if (checkIn) {
      localStorage.setItem(`checkIn:${userInfo._id}`, checkIn);
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

    const interval = setInterval(() => {
      setTime(moment().format("hh:mm:ss A"));
    }, 1000);

    return () => clearInterval(interval);
  }, [checkIn, checkOut, userInfo]);
  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.grey,
      color: 'white',
      boxShadow: theme.shadows[2],
      fontSize: 15,
    },
  }));



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
                color="text.error"
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
              {/* <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="check-buttons"
              >
                <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              open={openToast}
              autoHideDuration={3000}
              onClose={handleClose}
            >
              <Alert>
                Check-In Successful
              </Alert>
            </Snackbar>
                <ToggleButton
                  sx={{ width: 120 }}
                  onClick={handleCheckIn}
                  color={"success"}
                  value="check-in"
                  disabled={checkIn}
                >
                  Check-In
                </ToggleButton>
                <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              open={openToast1}
              autoHideDuration={3000}
              onClose={handleClose1}
            >
              <Alert color="error">
                Check-Out Successful
              </Alert>
            </Snackbar>
            <LightTooltip title="You can now logout after 1 hour">
            <span>
                <ToggleButton
                  sx={{ width: 120 }}
                  disabled={checkOut || !checkIn}
                  onClick={handleCheckOut}
                  color={"error"}
                  value="check-out"
                >
                  Check-Out
                </ToggleButton>
                </span>
                </LightTooltip>
                
                </ToggleButtonGroup> */}
                <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              open={openToast}
              autoHideDuration={3000}
              onClose={handleClose}
            >
              <Alert>
                Check-In Successful
              </Alert>
            </Snackbar>
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

                <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              open={openToast1}
              autoHideDuration={3000}
              onClose={handleClose1}
            >
              <Alert color="error">
                Check-Out Successful
              </Alert>
            </Snackbar>

            <LightTooltip title="You Cannot Check-Out Before 1 Hour">
              <span>
                <Button
                 sx={{ width: 120 }}
                 disabled={checkOut || !checkIn}
                 onClick={handleCheckOut}
                 color={"error"}
                 value="check-out"
                 variant="outlined"
                
                >Check-Out</Button>
                </span>
                </LightTooltip>
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
            <CardContent sx={{  }}>
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
            </CardContent>

            <CardContent>
            <Stack spacing={1} alignItems="center">
      <Stack direction="row" spacing={3}>
      <Badge badgeContent={0} color="error">
        <Chip sx={{width:200,height:50}} label="Early Days" color="primary" />
        </Badge>
        <Badge badgeContent={2} color="error">
        <Chip sx={{width:200,height:50}} label="Late Days" color="error" />
        </Badge>
        <Badge badgeContent={1} color="error">
        <Chip sx={{width:200,height:50}} label="Half Days" color="secondary" />
        </Badge>
        <Badge badgeContent={7} color="error">
        <Chip sx={{width:200,height:50}} label="On Time" color="success" />
        </Badge>
        <Badge badgeContent={5} color="error">
        <Chip sx={{width:200,height:50, backgroundColor:'#009688',color:'white'}} label="Non-Working Days" />
        </Badge>

      </Stack>
      </Stack>
            </CardContent>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

export default HomeScreen;
