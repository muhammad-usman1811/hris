import React from "react";
import Grid from "@mui/material/Grid";
import BasicCard from "../components/common/BasicCard";
import LeaveRequestCard from "../components/LeaveRequestCard";

const DashboardScreen = () => {
  return (
    <Grid
      item
      xs={12}
      sx={{
        marginLeft: "320px",
        backgroundColor: "#eaeff1",
        padding: "15px",
        minHeight: "calc(100vh - 166px)",
        position: "relative",
      }}
    >
      <BasicCard text={"Total Employees"} content={1409} />
      <BasicCard text={"Working From Home"} content={35} />
      <LeaveRequestCard />
    </Grid>
  );
};

export default DashboardScreen;
