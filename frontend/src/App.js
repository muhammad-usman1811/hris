import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";

function App() {
  const [title, setTitle] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    const parsedTitle = location.pathname.replace(/^\/home\//, "");
    const alteredTitle =
      parsedTitle.charAt(0).toUpperCase() + parsedTitle.slice(1);
    if (alteredTitle.startsWith("Profile")) {
      setTitle("Edit Profile");
    } else if (alteredTitle.endsWith("leaves")) {
      setTitle("Leaves");
    } else {
      setTitle(alteredTitle);
    }
  }, [location]);

  return (
    <>
      {userInfo ? (
        <Grid container>
          <Navbar />
          <Header title={title} />
          <Outlet />
        </Grid>
      ) : (
        navigate("/")
      )}
    </>
  );
}

export default App;
