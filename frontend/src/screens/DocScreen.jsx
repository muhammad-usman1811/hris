import React from "react";
import Grid from "@mui/material/Grid";
import ManageDocs from "../components/ManageDocs";

const DocScreen = () => {
  return (
    <Grid
      item
      xs={12}
      sx={{
        marginLeft: "256px",
        padding: "32px",
        bgcolor: "#eaeff1",
        minHeight: "calc(100vh - 67px)",
        position: "relative",
      }}
    >
      <ManageDocs />
    </Grid>
  );
};

export default DocScreen;
