import React from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListSubheader from "@mui/material/ListSubheader";
import Divider from "@mui/material/Divider";
import CircleIcon from "@mui/icons-material/Circle";
import BasicCard from "../components/common/BasicCard";
import LeaveRequestCard from "../components/LeaveRequestCard";
import BasicCalendar from "../components/BasicCalendar";
import DashboardGraph from "./../components/DashboardGraph";

const DashboardScreen = () => {
  return (
    <Grid
      item
      xs={12}
      sx={{
        marginLeft: "256px",
        backgroundColor: "#eaeff1",
        padding: "32px",
        minHeight: "calc(100vh - 67px)",
        position: "relative",
      }}
    >
      <Grid container columnSpacing={2} rowSpacing={5}>
        <Grid item xs={3}>
          <BasicCard
            text={"Total Employees"}
            content={1409}
            colorCode="#EFEAFA"
          />
        </Grid>
        <Grid item xs={3}>
          <BasicCard text={"Open Positions"} content={35} colorCode="#E7F1F9" />
        </Grid>
        <Grid item xs={3}>
          <BasicCard
            text={"Received Applications"}
            content={120}
            colorCode="#F6E2E9"
          />
        </Grid>
        <Grid item xs={3}>
          <BasicCard text={"Onboarding"} content={15} />
        </Grid>
        <Grid item xs={8}>
          <DashboardGraph />
        </Grid>
        <Grid item xs={4}>
          <BasicCalendar />
        </Grid>
        <Grid item xs={5} sx={{ margin: "10px 15px 0 15px" }}>
          <LeaveRequestCard />
        </Grid>
        <Grid item xs={3} sx={{ margin: "10px 5px 0 25px" }}>
          <List
            sx={{ bgcolor: "background.paper" }}
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Quick Actions
              </ListSubheader>
            }
          >
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
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DashboardScreen;
