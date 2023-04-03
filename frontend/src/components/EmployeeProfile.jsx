import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { getUserDetails } from "../actions/userActions";

const EmployeeProfile = () => {
  const departments = [
    {
      value: "Development",
    },
    {
      value: "Data",
    },
    {
      value: "HR",
    },
    {
      value: "Project Management",
    },
  ];
  const { id } = useParams();

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const {
    user,
    user: { jobDetails, emergencyDetails },
  } = userDetails;

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [address, setAddress] = useState(null);
  const [phone, setPhone] = useState(null);
  const [passport, setPassport] = useState(null);
  const [cnic, setCnic] = useState(null);
  const [department, setDepartment] = useState(null);
  const [employeeId, setEmployeeId] = useState(user._id);
  const [designation, setDesignation] = useState(null);
  const [title, setTitle] = useState(null);
  const [supervisor, setSupervisor] = useState(null);
  const [date, setDate] = useState(null);
  const [workType, setWorkType] = useState(null);
  const [emergencyName, setEmergencyName] = useState(null);
  const [relation, setRelation] = useState(null);
  const [emergencyAddress, setEmergencyAddress] = useState(null);
  const [contact, setContact] = useState(null);
  const [blood, setBlood] = useState(null);

  const handleName = (event) => {
    setName((prevState) => (prevState = event.target.value));
  };

  useEffect(() => {
    dispatch(getUserDetails(id));
    setName(user.name);
    setEmail(user.email);
    setAddress(user.address);
    setPhone(user.contactNum);
    setPassport(user.passport);
    setCnic(user.cnic);
    setDepartment(jobDetails && jobDetails.department);
    setEmployeeId(user._id);
    setTitle(jobDetails && jobDetails.title);
    setDate(jobDetails && jobDetails.dateOfJoining);
    setEmergencyName(emergencyDetails && emergencyDetails.name);
    setRelation(emergencyDetails && emergencyDetails.relation);
    setEmergencyAddress(emergencyDetails && emergencyDetails.address);
    setContact(emergencyDetails && emergencyDetails.contact);
    setBlood(emergencyDetails && emergencyDetails.blood);
  }, [dispatch, id, user, jobDetails, emergencyDetails]);

  return (
    <Grid container>
      <Grid item xs={4}>
        <img
          src="/images/userPhoto.jpg"
          style={{ width: "auto", height: "200px", marginBottom: "5px" }}
          alt="Employee visual"
        />
        <Box>
          <Typography variant="h6" sx={{ marginBottom: "5px" }}>
            Employee Details
          </Typography>
          <TextField
            InputLabelProps={{ shrink: true }}
            sx={{ marginTop: "20px" }}
            id="name"
            label="Full Name"
            variant="standard"
            value={name}
            onChange={handleName}
          />
          <br />
          <TextField
            InputLabelProps={{ shrink: true }}
            sx={{ marginTop: "20px" }}
            id="email"
            label="Email"
            variant="standard"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <br />
          <TextField
            InputLabelProps={{ shrink: true }}
            sx={{ marginTop: "20px" }}
            id="phone"
            label="Phone Number"
            variant="standard"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
          <br />
          <TextField
            InputLabelProps={{ shrink: true }}
            sx={{ marginTop: "20px" }}
            id="address"
            label="Address"
            variant="standard"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
          <br />
          <TextField
            InputLabelProps={{ shrink: true }}
            sx={{ marginTop: "20px" }}
            id="cnic"
            label="CNIC"
            variant="standard"
            value={cnic}
            onChange={(event) => setCnic(event.target.value)}
          />
          <br />
          <TextField
            InputLabelProps={{ shrink: true }}
            sx={{ marginTop: "20px" }}
            id="passport"
            label="Passport"
            variant="standard"
            value={passport}
            onChange={(event) => setPassport(event.target.value)}
          />
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Job Details
          </Typography>
          <TextField
            InputLabelProps={{ shrink: true }}
            id="department"
            select
            value={department}
            onChange={(event) => setDepartment(event.target.value)}
            helperText="Please select relevant department"
            variant="standard"
          >
            {departments.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
          <br />
          <TextField
            InputLabelProps={{ shrink: true }}
            sx={{ marginTop: "20px" }}
            id="employeeId"
            label="Employee ID"
            variant="standard"
            value={employeeId}
            onChange={(event) => setEmployeeId(event.target.value)}
          />
          <br />
          <TextField
            InputLabelProps={{ shrink: true }}
            sx={{ marginTop: "20px" }}
            id="title"
            label="Title"
            variant="standard"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <br />
          <TextField
            InputLabelProps={{ shrink: true }}
            sx={{ marginTop: "20px" }}
            id="designation"
            label="Designation"
            variant="standard"
            value={designation}
            onChange={(event) => setDesignation(event.target.value)}
          />
          <br />
          <TextField
            InputLabelProps={{ shrink: true }}
            sx={{ marginTop: "20px" }}
            id="supervisor"
            label="Supervisor"
            variant="standard"
            value={supervisor}
            onChange={(event) => setSupervisor(event.target.value)}
          />
          <br />
          <TextField
            InputLabelProps={{ shrink: true }}
            sx={{ marginTop: "20px" }}
            id="date"
            label="Joining Date"
            variant="standard"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
          <br />
          <TextField
            InputLabelProps={{ shrink: true }}
            sx={{ marginTop: "20px" }}
            id="type"
            label="Work Location"
            variant="standard"
            value={workType}
            onChange={(event) => setWorkType(event.target.value)}
          />
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box>
          <Typography variant="h6">Emergency Contact Information</Typography>
          <TextField
            InputLabelProps={{ shrink: true }}
            sx={{ marginTop: "20px", ml: "6px" }}
            id="emergency-name"
            label="Name"
            variant="standard"
            value={emergencyName}
            onChange={(event) => setEmergencyName(event.target.value)}
          />
          <br />
          <TextField
            InputLabelProps={{ shrink: true }}
            sx={{ marginTop: "20px", ml: "6px" }}
            id="relation"
            label="Relation"
            variant="standard"
            value={relation}
            onChange={(event) => setRelation(event.target.value)}
          />
          <br />
          <TextField
            InputLabelProps={{ shrink: true }}
            sx={{ marginTop: "20px", ml: "6px" }}
            id="emergency-address"
            label="Address"
            variant="standard"
            value={emergencyAddress}
            onChange={(event) => setEmergencyAddress(event.target.value)}
          />
          <br />
          <TextField
            InputLabelProps={{ shrink: true }}
            sx={{ marginTop: "20px" }}
            id="contact"
            label="Contact Number"
            variant="standard"
            value={contact}
            onChange={(event) => setContact(event.target.value)}
          />
          <br />
          <TextField
            InputLabelProps={{ shrink: true }}
            sx={{ marginTop: "20px", ml: "6px" }}
            id="blood"
            label="Blood"
            variant="standard"
            value={blood}
            onChange={(event) => setBlood(event.target.value)}
          />
          <Stack spacing={2} direction="row" marginTop={25}>
            <Button color="error" variant="contained">
              Save Changes
            </Button>
            <Button color="error" variant="outlined">
              Cancel
            </Button>
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
};

export default EmployeeProfile;
