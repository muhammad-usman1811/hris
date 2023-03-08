import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AccountMenu from "./../common/AccountMenu";

const Header = ({ title }) => {
  const headerStyles = {
    wrapper: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#009be5",
      padding: "20px",
    },
    topRow: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "end",
      alignItems: "center",
      marginBottom: "20px",
      "*": {
        marginRight: "5px",
      },
    },
    middleRow: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "20px",
      marginLeft: "320px",
    },
  };

  return (
    <Box sx={headerStyles.wrapper}>
      <Box sx={headerStyles.topRow}>
        <AccountMenu />
      </Box>
      <Box sx={headerStyles.middleRow}>
        <Typography variant="h4" color="white">
          {title}
        </Typography>
      </Box>
    </Box>
  );
};

export default Header;
