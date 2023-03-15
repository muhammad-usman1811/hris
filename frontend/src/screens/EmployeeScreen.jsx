import React from "react";
import Grid from "@mui/material/Grid";
import EmployeeTable from "../components/EmployeeTable";

const EmployeeScreen = () => {
  return (
    <Grid
      item
      xs={12}
      sx={{
        marginLeft: "256px",
        backgroundColor: "#eaeff1",
        minHeight: "calc(100vh - 67px)",
      }}
    >
      <EmployeeTable />
    </Grid>
  );
};

export default EmployeeScreen;
