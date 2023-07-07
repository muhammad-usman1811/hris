import React, { useState, useEffect } from "react";
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
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import EventIcon from "@mui/icons-material/Event";
import Logout from "@mui/icons-material/Logout";
import { navbarStyles } from "./styles";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./../../actions/userActions";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";

const Navbar = () => {
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedSubItem, setSelectedSubItem] = useState(null);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const logoutHandler = () => {
    dispatch(logout(userInfo._id));
  };

  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath.includes("/home/dashboard")) {
      setSelectedIndex(0);
    } else if (currentPath.includes("/home/employees")) {
      setSelectedIndex(1);
    } else if (currentPath.includes("/home/attendance")) {
      setSelectedIndex(2);
      setSelectedSubItem(1);
    } else if (currentPath.includes("/home/leaves")) {
      setSelectedIndex(3);
    } else if (currentPath.includes("/home/docs")) {
      setSelectedIndex(4);
    } else if (currentPath.includes("/home/employeePortal")) {
      setSelectedIndex(0);
    } else if (currentPath.includes("/home/employee/profile")) {
      setSelectedIndex(1);
    } else if (currentPath.includes("/home/employee/leaves")) {
      setSelectedIndex(2);
    } else if (currentPath.includes("/home/employee/documents")) {
      setSelectedIndex(3);
    } else if (currentPath.includes("/home/employee/manualAttendance")) {
      setSelectedIndex(4);
    }
  }, []);

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
      {userInfo.role.includes("Admin") && (
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
            {/* List item with sub item */}
            <ListItemButton
              selected={selectedIndex === 2}
              onClick={(event) => {
                handleListItemClick(event, 2);
                // Add navigation logic for the new list item
                setOpen(!open);
                setSelectedSubItem(null);
                navigate("/home/attendance");
              }}
            >
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Attendance" />
              {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {/* Subitems for the new list item */}
                <ListItemButton
                  selected={selectedSubItem === 1}
                  onClick={() => {
                    setSelectedSubItem(1);
                    navigate("/home/attendance/timesheet");
                  }}
                  sx={{
                    pl: 6,
                    pr: 2,
                    py: 1,
                    "&.Mui-selected": { bgcolor: "transparent" },
                  }}
                >
                  <ListItemIcon>
                    <AccessTimeFilledIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Timesheets" />
                </ListItemButton>
              </List>
            </Collapse>
            {/* <ListItemButton
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
            </ListItemButton> */}
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

      {(userInfo.role.includes("Employee") ||
        userInfo.role.includes("Line Manager") ||
        userInfo.role.includes("Engagement Manager")) && (
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
            <ListItemButton
              selected={selectedIndex === 4}
              onClick={(event) => {
                handleListItemClick(event, 4);
                navigate("/home/employee/manualAttendance");
              }}
            >
              <ListItemIcon>
                <ManageAccountsIcon />
              </ListItemIcon>
              <ListItemText primary="Manual Attendance" />
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
