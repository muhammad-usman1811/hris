import React from "react";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ArticleIcon from "@mui/icons-material/Article";
import HomeIcon from "@mui/icons-material/Home";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import EventIcon from "@mui/icons-material/Event";
import Logout from "@mui/icons-material/Logout";
import { navbarStyles } from "./styles";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./../../actions/userActions";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const logoutHandler = () => {
    dispatch(logout(userInfo._id));
  };

  return (
    <Drawer sx={navbarStyles.drawer} variant="permanent" anchor="left">
      <Toolbar>
        <img
          src="/images/logo.png"
          alt="company logo"
          width={150}
          style={{ margin: "auto" }}
        />
      </Toolbar>
      <Divider />
      {userInfo.role === "Admin" && (
        <>
          <List component="nav">
            <ListItemButton
              selected={selectedIndex === 0}
              onClick={(event) => {
                handleListItemClick(event, 0);
                navigate("/home/dashboard");
              }}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </List>
          <Divider />
          <List component="nav">
            <ListItemButton
              selected={selectedIndex === 1}
              onClick={(event) => {
                handleListItemClick(event, 1);
                navigate("/home/employees");
              }}
            >
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Employees" />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 2}
              onClick={(event) => {
                handleListItemClick(event, 2);
                navigate("/home/attendance");
              }}
            >
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Attendance" />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 3}
              onClick={(event) => {
                handleListItemClick(event, 3);
                navigate("/home/leaves");
              }}
            >
              <ListItemIcon>
                <ManageAccountsIcon />
              </ListItemIcon>
              <ListItemText primary="Leave Requests" />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 4}
              onClick={(event) => {
                handleListItemClick(event, 4);
                navigate("/home/docs");
              }}
            >
              <ListItemIcon>
                <ArticleIcon />
              </ListItemIcon>
              <ListItemText primary="Manage Docs" />
            </ListItemButton>
          </List>
        </>
      )}

      {(userInfo.role === "Employee" || userInfo.role === "Supervisor") && (
        <>
          <List component="nav">
            <ListItemButton
              selected={selectedIndex === 0}
              onClick={(event) => {
                handleListItemClick(event, 0);
                navigate("/home/employeePortal");
              }}
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </List>
          <Divider />
          <List component="nav">
            <ListItemButton
              selected={selectedIndex === 1}
              onClick={(event) => {
                handleListItemClick(event, 1);
                navigate(`/home/employee/profile/${userInfo._id}`);
              }}
            >
              <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 2}
              onClick={(event) => {
                handleListItemClick(event, 2);
                navigate("/home/employee/leaves");
              }}
            >
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText primary="Leaves" />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === 3}
              onClick={(event) => {
                handleListItemClick(event, 3);
                navigate("/home/employee/documents");
              }}
            >
              <ListItemIcon>
                <ArticleIcon />
              </ListItemIcon>
              <ListItemText primary="Documents" />
            </ListItemButton>
          </List>
        </>
      )}

      <Box
        sx={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          width: "255px",
          paddingTop: "10px",
          paddingBottom: "10px",
          marginTop: "auto",
        }}
      >
        <List component="nav" sx={{ width: "100%", marginTop: "auto" }}>
          <ListItemButton onClick={logoutHandler}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          bgcolor: "#eaeff1",
          width: "255px",
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
        <Typography variant="caption" color="red">
          Copyright © 2023 Digifloat
        </Typography>
      </Box>
    </Drawer>
  );
};

export default Navbar;
