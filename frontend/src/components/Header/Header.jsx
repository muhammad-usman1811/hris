import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AccountMenu from "./../common/AccountMenu";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

const Header = ({ title }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "#E23D3F" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <IconButton
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <AccountMenu />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
