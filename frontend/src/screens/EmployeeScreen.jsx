import React from "react";
import Grid from "@mui/material/Grid";
import CommonButton from "../components/common/CommonButton";

const EmployeeScreen = () => {
  return (
    <Grid item xs={8}>
      <CommonButton variant="contained">Add User</CommonButton>
    </Grid>
  );
};

export default EmployeeScreen;
