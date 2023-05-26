import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
//import Divider from "@mui/material/Divider";
//import CircleIcon from "@mui/icons-material/Circle";
import Button from "@mui/material/Button";
import BasicCard from "../components/common/BasicCard";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import LeaveRequestCard from "../components/LeaveRequestCard";
import BasicCalendar from "../components/BasicCalendar";
import DashboardGraph from "./../components/DashboardGraph";
import { useNavigate } from "react-router-dom";
import { listUsers } from "../actions/userActions";

const DashboardScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { users } = userList;
  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);
  return (
    <Grid
      item
      xs={12}
      container
      sx={{
        marginLeft: "256px",
        backgroundColor: "#eaeff1",
        padding: "32px",
        minHeight: "calc(100vh - 67px)",
        position: "relative",
      }}
    >
      <Grid container rowSpacing={5} columnSpacing={2}>
        <Grid item xs={3}>
          <BasicCard
            text={"Total Employees"}
            content={users?.length}
            colorCode="#EFEAFA"
            onClick={() => navigate("/home/employees")}
          />
        </Grid>
        <Grid item xs={3}>
          <BasicCard
            text={"Open Positions"}
            content={35}
            colorCode="#E7F1F9"
            disabled={true}
          />
        </Grid>
        <Grid item xs={3}>
          <BasicCard
            text={"Received Applications"}
            content={120}
            colorCode="#F6E2E9"
            disabled={true}
          />
        </Grid>
        <Grid item xs={3}>
          <BasicCard text={"Onboarding"} content={15} disabled={true} />
        </Grid>
        <Grid item xs={8}>
          <DashboardGraph />
        </Grid>
        <Grid item xs={4}>
          <BasicCalendar />
        </Grid>
        <Grid item xs={4} sx={{ marginTop: "1%" }}>
          <Card
            sx={{
              borderRadius: "8px",
              marginLeft: "4%",
              marginRight: 1,
              height: 350,
            }}
          >
            <CardMedia
              sx={{ height: 170 }}
              image="/images/birthday.jpg"
              title="Employee"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Happy Birthday!
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Today is your special day, and we wish you all the best on your
                birthday. We hope you have a wonderful time.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" disabled>
                Share
              </Button>
              <Button size="small" disabled>
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={4} sx={{ marginTop: "1%" }}>
          <Card
            sx={{
              borderRadius: "8px",
              marginLeft: "1%",
              marginRight: 1,
              height: 350,
            }}
          >
            <CardMedia
              sx={{ height: 170 }}
              image="/images/2023.png"
              title="event"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Upcoming Events
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Birthdays
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" disabled>
                Details
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={4} sx={{ marginTop: "1%" }}>
          <LeaveRequestCard />
        </Grid>
        {/* <Grid item xs={4} sx={{ marginTop: "1%" }}>
          <LeaveRequestCard />
        </Grid>
        <Grid item xs={4} sx={{ marginTop: "1%" }}>
          <Card sx={{ borderRadius: "8px", marginLeft: "15%" }}>
            <CardMedia
              sx={{ height: 140 }}
              image="/images/birthday.jpg"
              title="Employee"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Happy Birthday!
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Today is your special day, and we wish you all the best on your
                birthday. We hope you have a wonderful time.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" disabled>
                Share
              </Button>
              <Button size="small" disabled>
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Grid> */}
        {/* <Grid item xs={3} sx={{ marginTop: "1%" }}>
          <List
            sx={{
              bgcolor: "background.paper",
              borderRadius: "8px",
              marginLeft: "15%",
            }}
          >
            <Typography sx={{ marginLeft: "15px" }} variant="h6">
              Quick Actions
            </Typography>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <CircleIcon />
                </ListItemIcon>
                <ListItemText primary="List item 1" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <CircleIcon />
                </ListItemIcon>
                <ListItemText primary="List item 2" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <CircleIcon />
                </ListItemIcon>
                <ListItemText primary="List item 3" />
              </ListItemButton>
            </ListItem>
          </List>
        </Grid> */}
      </Grid>
    </Grid>
  );
};

export default DashboardScreen;
