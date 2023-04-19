import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

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
      <Grid
        item
        container
        sx={{
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        <Grid item container>
          <Grid item>
            <Avatar src="/broken-image.jpg" alt="profile" />
          </Grid>
          <Grid item xs>
            <Typography variant="h5">Muhammad Usman</Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Full-Stack Developer
            </Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" color="error">
              Edit Profile
            </Button>
          </Grid>
          <Grid item container>
            <Grid item>
              <ListItem>
                <ListItemIcon>
                  <PhoneAndroidIcon />
                </ListItemIcon>
                <ListItemText primary="0347-8605452" />
              </ListItem>
            </Grid>
            <Grid item>
              <ListItem>
                <ListItemIcon>
                  <EmailIcon />
                </ListItemIcon>
                <ListItemText primary="m.usman@digifloat.com" />
              </ListItem>
            </Grid>
            <Grid item>
              <ListItem>
                <ListItemIcon>
                  <LocationOnIcon />
                </ListItemIcon>
                <ListItemText primary="Sheikhupura" />
              </ListItem>
            </Grid>
            <Grid item>
              <ListItem>
                <ListItemIcon>
                  <FiberManualRecordIcon
                    style={{
                      color: "green",
                    }}
                  />
                </ListItemIcon>
                <ListItemText primary="Active" />
              </ListItem>
            </Grid>
          </Grid>
        </Grid>
        <Divider light />
        <Grid item container>
          <Grid item xs={4}>
            <Typography variant="h6" sx={{ marginBottom: "20px" }}>
              General Information
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              Joining Date:
            </Typography>
            <Typography variant="body1" color="textPrimary">
              April 12, 2023
            </Typography>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              sx={{ marginTop: "20px" }}
            >
              Birth date:
            </Typography>
            <Typography variant="body1" color="textPrimary">
              March 23, 2023
            </Typography>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              sx={{ marginTop: "20px" }}
            >
              CNIC:
            </Typography>
            <Typography variant="body1" color="textPrimary">
              35403-1234567-1
            </Typography>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              sx={{ marginTop: "20px" }}
            >
              Marital staus:
            </Typography>
            <Typography variant="body1" color="textPrimary">
              Single
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6" sx={{ marginBottom: "10px" }}>
              Job Information
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              Department:
            </Typography>
            <Typography variant="body1" color="textPrimary">
              App Development
            </Typography>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              sx={{ marginTop: "20px" }}
            >
              Designation:
            </Typography>
            <Typography variant="body1" color="textPrimary">
              Associate Consultant
            </Typography>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              sx={{ marginTop: "20px" }}
            >
              Supervisor:
            </Typography>
            <Typography variant="body1" color="textPrimary">
              Osama Saeed
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6" sx={{ marginBottom: "10px" }}>
              Emergency Contact Information
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              Name:
            </Typography>
            <Typography variant="body1" color="textPrimary">
              Mohsin
            </Typography>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              sx={{ marginTop: "20px" }}
            >
              Address:
            </Typography>
            <Typography variant="body1" color="textPrimary">
              Lahore
            </Typography>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              sx={{ marginTop: "20px" }}
            >
              Contact number:
            </Typography>
            <Typography variant="body1" color="textPrimary">
              0301-2345678
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EmployeeProfile;
