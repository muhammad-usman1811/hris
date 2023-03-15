import React from "react";
import Grid from "@mui/material/Grid";
import AttendanceList from "./../components/AttendanceList";

const AttendanceScreen = () => {
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
      <AttendanceList />
    </Grid>
  );
};

export default AttendanceScreen;
