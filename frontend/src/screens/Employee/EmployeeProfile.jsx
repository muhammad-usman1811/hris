import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const EmployeeProfile = () => {
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
      <Typography>This is Employee Profile</Typography>
    </Grid>
  );
};

export default EmployeeProfile;
