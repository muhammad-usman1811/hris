import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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
import { getUserDetails } from "../../actions/userActions";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const EmployeeProfile = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const [value, setValue] = React.useState(0);

  //States to store values
  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  //const [passport, setPassport] = useState("");
  const [cnic, setCnic] = useState("");
  const [department, setDepartment] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [designation, setDesignation] = useState("");
  const [title, setTitle] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [date, setDate] = useState("");
  const [workType, setWorkType] = useState("");
  //const [role, setRole] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [relation, setRelation] = useState("");
  const [emergencyAddress, setEmergencyAddress] = useState("");
  const [contact, setContact] = useState("");
  const [blood, setBlood] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (!user || !user.name || user._id !== id) {
      dispatch(getUserDetails(id));
    } else {
      setImageUrl(user.imageUrl);
      setName(user.name);
      setEmail(user.email);
      //setPassword(user.password);
      setAddress(user.address);
      setPhone(user.phone);
      //setPassport(user.passport);
      setCnic(user.cnic);
      setDepartment(user.jobDetails.department);
      setEmployeeId(user.jobDetails.employeeId);
      setTitle(user.jobDetails.title);
      setDesignation(user.jobDetails.designation);
      setSupervisor(user.jobDetails.supervisor);
      setDate(user.jobDetails.dateOfJoining);
      setWorkType(user.jobDetails.workType);
      //setRole(user.role);
      setEmergencyName(user.emergencyDetails.name);
      setRelation(user.emergencyDetails.relation);
      setEmergencyAddress(user.emergencyDetails.address);
      setContact(user.emergencyDetails.contact);
      setBlood(user.emergencyDetails.blood);
    }
  }, [dispatch, id, user]);

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
            <Avatar
              sx={{ mr: 2, width: 60, height: 60 }}
              //src="/broken-image.jpg"
              src={`http://localhost:5000/photos/${imageUrl}`}
              alt="profile"
            />
          </Grid>
          <Grid item xs>
            <Typography variant="h5">{name}</Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {title}
            </Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" color="error">
              Edit Profile
            </Button>
          </Grid>
          <Grid sx={{ borderBottom: 2, borderColor: "red" }} item container>
            <Grid item>
              <ListItem sx={{ border: 1, borderColor: "grey.500" }}>
                <ListItemIcon>
                  <PhoneAndroidIcon />
                </ListItemIcon>
                <ListItemText primary={phone} />
              </ListItem>
            </Grid>
            <Grid item>
              <ListItem sx={{ border: 1, borderColor: "grey.500" }}>
                <ListItemIcon>
                  <EmailIcon />
                </ListItemIcon>
                <ListItemText primary={email} />
              </ListItem>
            </Grid>
            <Grid item>
              <ListItem sx={{ border: 1, borderColor: "grey.500" }}>
                <ListItemIcon>
                  <LocationOnIcon />
                </ListItemIcon>
                <ListItemText sx={{ ml: 2 }} primary={address} />
              </ListItem>
            </Grid>
            <Grid item>
              <ListItem sx={{ border: 1, borderColor: "grey.500" }}>
                <ListItemIcon>
                  <FiberManualRecordIcon
                    style={{
                      color: "green",
                    }}
                  />
                </ListItemIcon>
                <ListItemText sx={{ ml: 3 }} primary="Active" />
              </ListItem>
            </Grid>
          </Grid>
        </Grid>
        <Divider light />
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                sx={{ borderRight: 1, borderColor: "grey" }}
                label="General Information"
                {...a11yProps(0)}
              />
              <Tab
                sx={{ borderRight: 1, borderColor: "grey" }}
                label="Job Information"
                {...a11yProps(1)}
              />
              <Tab
                sx={{ borderRight: 1, borderColor: "grey" }}
                label="Emergency Contact Information"
                {...a11yProps(2)}
              />
              <Tab
                sx={{ borderRight: 1, borderColor: "grey" }}
                label="Educational Information"
                {...a11yProps(3)}
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Grid container sx={{ display: "flex", flexDirection: "row" }}>
              <Grid
                item
                xs={3}
                sx={{ borderRight: 1, borderColor: "grey.500", ml: 5 }}
              >
                <Typography variant="h6" sx={{ marginBottom: "20px" }}>
                  General Information
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Date of Birth:
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
                  {cnic}
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
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  sx={{ marginTop: "20px" }}
                >
                  Shift Time:
                </Typography>
                <Typography variant="body1" color="textPrimary">
                  9:00AM-6:00PM
                </Typography>
              </Grid>

              <Grid item xs={3} sx={{ ml: 5 }}>
                {/* <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  sx={{ marginTop: "20px" }}
                >
                  Passpord No:
                </Typography>
                <Typography variant="body1" color="textPrimary">
                  {passport}
                </Typography> */}
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={value} index={1}>
            <Grid container sx={{ display: "flex", flexDirection: "row" }}>
              <Grid
                item
                xs={4}
                sx={{ borderRight: 1, borderColor: "grey.500", ml: 5 }}
              >
                <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                  Job Information
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Employee ID
                </Typography>
                <Typography variant="body1" color="textPrimary">
                  {employeeId}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  sx={{ marginTop: "20px" }}
                >
                  Department:
                </Typography>
                <Typography variant="body1" color="textPrimary">
                  {department}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  sx={{ marginTop: "20px" }}
                >
                  Designation:
                </Typography>
                <Typography variant="body1" color="textPrimary">
                  {designation}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  sx={{ marginTop: "20px" }}
                >
                  Supervisor:
                </Typography>
                <Typography variant="body1" color="textPrimary">
                  {supervisor}
                </Typography>
              </Grid>

              <Grid
                item
                xs={3}
                sx={{ borderRight: 1, borderColor: "grey.500", ml: 5 }}
              >
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  sx={{ marginTop: "20px" }}
                >
                  Overall Experience of Years
                </Typography>
                <Typography variant="body1" color="textPrimary">
                  5
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  sx={{ marginTop: "20px" }}
                >
                  Current Salary
                </Typography>
                <Typography variant="body1" color="textPrimary">
                  0000
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  sx={{ marginTop: "20px" }}
                >
                  Experience with DigiFloat
                </Typography>
                <Typography variant="body1" color="textPrimary">
                  2 Years
                </Typography>
              </Grid>
              <Grid item xs={3} sx={{ ml: 5 }}>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  sx={{ marginTop: "20px" }}
                >
                  Date of Joining:
                </Typography>
                <Typography variant="body1" color="textPrimary">
                  {date}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  sx={{ marginTop: "20px" }}
                >
                  Work Type:
                </Typography>
                <Typography variant="body1" color="textPrimary">
                  {workType}
                </Typography>
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={value} index={2}>
            <Grid container>
              <Grid
                item
                xs={4}
                sx={{ borderRight: 1, borderColor: "grey.500", ml: 5 }}
              >
                <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                  Emergency Contact Information
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Name:
                </Typography>
                <Typography variant="body1" color="textPrimary">
                  {emergencyName}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  sx={{ marginTop: "20px" }}
                >
                  Contact:
                </Typography>
                <Typography variant="body1" color="textPrimary">
                  {contact}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  sx={{ marginTop: "20px" }}
                >
                  Relation:
                </Typography>
                <Typography variant="body1" color="textPrimary">
                  {relation}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  sx={{ marginTop: "20px" }}
                >
                  Address:
                </Typography>
                <Typography variant="body1" color="textPrimary">
                  {emergencyAddress}
                </Typography>
              </Grid>

              <Grid item xs={3} sx={{ ml: 5 }}>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  sx={{ marginTop: "20px" }}
                >
                  Blood Group:
                </Typography>
                <Typography variant="body1" color="textPrimary">
                  {blood}
                </Typography>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Grid container>
              <Grid
                item
                xs={4}
                sx={{ borderRight: 1, borderColor: "grey.500", ml: 5 }}
              >
                <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                  Educational Information
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  University of Education
                </Typography>
                <Typography variant="body1" color="textPrimary">
                  BZU Multan
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  sx={{ marginTop: "20px" }}
                >
                  Certifications
                </Typography>
                <Typography variant="body1" color="textPrimary">
                  Web Development
                </Typography>
              </Grid>

              <Grid item xs={3} sx={{ ml: 5 }}>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  sx={{ marginTop: "20px" }}
                >
                  Qualification
                </Typography>
                <Typography variant="body1" color="textPrimary">
                  Bachelors
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  sx={{ marginTop: "20px" }}
                >
                  Latest Degree
                </Typography>
                <Typography variant="body1" color="textPrimary">
                  BSCS
                </Typography>
              </Grid>
            </Grid>
          </TabPanel>
        </Box>
      </Grid>
    </Grid>
  );
};

export default EmployeeProfile;
