import React from "react";
import Grid from "@mui/material/Grid";
import EmployeeProfile from "../components/EmployeeProfile";

// const TabPanel = ({ children, value, index }) => {
//   return (
//     <div hidden={value !== index}>
//       {value === index && <Box sx={{ marginTop: "20px" }}>{children}</Box>}
//     </div>
//   );
// };

const EmployeeProfileScreen = () => {
  // const [selectedTab, setSelectedTab] = useState(0);

  // const handleTabChange = (event, newValue) => {
  //   setSelectedTab(newValue);
  // };

  return (
    <Grid
      item
      xs={12}
      sx={{
        marginLeft: "256px",
        backgroundColor: "#eaeff1",
        padding: "15px 30px 15px 30px ",
        minHeight: "calc(100vh - 67px)",
      }}
    >
      <EmployeeProfile />;
    </Grid>
  );
};

export default EmployeeProfileScreen;
