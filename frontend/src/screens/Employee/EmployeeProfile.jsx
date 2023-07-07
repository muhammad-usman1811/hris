import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { TextField, Tooltip } from "@mui/material";
import { getUserDetails } from "../../actions/userActions";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

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
  const [personalEmail, setPersonalEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [passport, setPassport] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [gender, setGender] = useState("");
  const [cnic, setCnic] = useState("");
  const [department, setDepartment] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [designation, setDesignation] = useState("");
  const [shiftStartTime, setShiftStartTime] = useState("");
  const [shiftEndTime, setShiftEndTime] = useState("");
  const [engagementManager, setEngagementManager] = useState("");
  const [permanentDate, setPermanentDate] = useState("");
  const [reportingDepartment, setReportingDepartment] = useState("");
  const [reportingOffice, setReportingOffice] = useState("");
  const [client, setClient] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState("");
  const [projectRole, setProjectRole] = useState("");
  const [region, setRegion] = useState("");
  const [projectStartDate, setProjectStartDate] = useState("");
  const [billableHours, setBillableHours] = useState("");
  const [projectEndDate, setProjectEndDate] = useState("");
  const [degree, setDegree] = useState("");
  const [institute, setInstitute] = useState("");
  const [degreeStartDate, setDegreeStartDate] = useState("");
  const [degreeEndDate, setDegreeEndDate] = useState("");
  const [title, setTitle] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [date, setDate] = useState("");
  const [workType, setWorkType] = useState("");
  const [employmentStatus, setEmploymentStatus] = useState("");
  const [salary, setSalary] = useState("");
  const [role, setRole] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [relation, setRelation] = useState("");
  const [emergencyAddress, setEmergencyAddress] = useState("");
  const [contact, setContact] = useState("");
  const [blood, setBlood] = useState("");
  const [fuel, setFuel] = useState("");
  const [medicalAllowance, setMedicalAllowance] = useState("");
  const [providentFund, setProvidentFund] = useState("");
  const [empOfQuarter, setEmpOfQuarter] = useState("");
  const [paidCertifications, setPaidCertifications] = useState("");
  const [paidTimeOff, setPaidTimeOff] = useState("");
  const [annualBonus, setAnnualBonus] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
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
      setPersonalEmail(user.personalEmail ?? "");
      setPassword(user.password);
      setAddress(user.address);
      setPhone(user.phone);
      setPassport(user.passport);
      setCnic(user.cnic);
      setDob(user.dob);
      setMaritalStatus(user.maritalStatus);
      setGender(user.gender);
      setDepartment(user.jobDetails.department);
      setEmployeeId(user.employeeId);
      setTitle(user.jobDetails.title);
      setDesignation(user.jobDetails.designation);
      setShiftStartTime(user.shiftStartTime);
      setShiftEndTime(user.shiftEndTime);
      setSupervisor(user.jobDetails.supervisor);
      setEngagementManager(user.jobDetails?.engagementManager ?? "add");
      setReportingDepartment(user.jobDetails?.reportingDepartment ?? "add");
      setReportingOffice(user.jobDetails?.reportingOffice ?? "add");
      setPermanentDate(user.jobDetails?.permanentDate ?? "add");
      setClient(user.projectDetails?.client ?? "add");
      setProjectName(user.projectDetails?.projectName ?? "add");
      setProjectRole(user.projectDetails?.projectRole ?? "add");
      setProjectType(user.projectDetails?.projectType ?? "add");
      setBillableHours(user.projectDetails?.billableHours ?? "add");
      setRegion(user.projectDetails?.region ?? "add");
      setProjectStartDate(user.projectDetails?.startDate ?? "add");
      setProjectEndDate(user.projectDetails?.endDate ?? "add");
      setDate(user.jobDetails.dateOfJoining);
      setWorkType(user.jobDetails.workType);
      setEmploymentStatus(user.jobDetails.employmentStatus);
      setSalary(user.jobDetails.salary);
      setRole(user.role);
      setEmergencyName(user.emergencyDetails.name);
      setRelation(user.emergencyDetails.relation);
      setEmergencyAddress(user.emergencyDetails.address);
      setContact(user.emergencyDetails.contact);
      setBlood(user.emergencyDetails.blood);
      setDegree(user.educationalInfo?.degree ?? "add");
      setDegreeStartDate(user.educationalInfo?.startDate ?? "add");
      setDegreeEndDate(user.educationalInfo?.endDate ?? "add");
      setInstitute(user.educationalInfo?.institute ?? "add");
      setFuel(user.fuel ?? "add");
      setMedicalAllowance(user.medicalAllowance ?? "add");
      setProvidentFund(user.providentFund ?? "add");
      setPaidCertifications(user.paidCertifications ?? "add");
      setPaidTimeOff(user.paidTimeOff ?? "add");
      setEmpOfQuarter(user.empOfQuarter ?? "add");
      setAnnualBonus(user.annualBonus ?? "add");
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
        padding: "20px",
        minHeight: "calc(100vh - 67px)",
        position: "relative",
      }}
    >
      <Grid
        item
        container
        sx={{
          backgroundColor: "white",
          padding: "2px",
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
          borderRadius: "4px",
        }}
      >
        <Grid item container xs={12}>
          <Grid item xs={12} sx={{ height: 250 }}>
            <Item sx={{ height: 250 }}>
              <img
                src="/images/cover.jpg"
                alt="cover"
                style={{
                  height: "100%",
                  width: "100%",
                  marginTop: -2,
                  position: "cover",
                }}
              />
            </Item>
          </Grid>
          <Grid item xs={12}>
            <Grid
              item
              sx={{
                display: "flex",
                justifyContent: "center",
                position: "relative",
                top: -100,
                left: -250,
              }}
            >
              <img
                //src={`/photos/${imageUrl}`}
                src={`http://localhost:5000/photos/${imageUrl}`}
                alt="Profile"
                loading="lazy"
                style={{
                  textAlign: "center",
                  lineHeight: "50px",
                  display: "flex",
                  justifyContent: "center",
                  height: 180,
                  width: 180,
                  borderRadius: "50%",
                  border: "5px solid #fff",
                }}
              />
            </Grid>
          </Grid>
          <Box sx={{ ml: 5, mt: -8 }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Personal Details" {...a11yProps(0)} />
              <Tab label="Job Details" {...a11yProps(1)} />
              <Tab label="Project Details" {...a11yProps(2)} />
              <Tab label="Benefits" {...a11yProps(3)} />
              <Tab label="Emergency Contact Information" {...a11yProps(4)} />
              <Tab label="Educational Information" {...a11yProps(5)} />
            </Tabs>
            <TabPanel value={value} index={0}>
              <Grid container spacing={2} xs={12}>
                <Grid xs={6}>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    sx={{ marginTop: "20px", width: "50%" }}
                    name="name"
                    label="Full Name"
                    value={name}
                  />
                  <br />
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    sx={{ marginTop: "20px", width: "50%" }}
                    name="personalEmail"
                    label="Personal Email"
                    value={personalEmail}
                  />
                  <br />
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    sx={{ marginTop: "20px", width: "50%" }}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    value={password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <br />
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    sx={{ marginTop: "20px", width: "50%" }}
                    name="phone"
                    type="tel"
                    label="Phone Number"
                    value={phone}
                  />
                  <br />
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    sx={{ marginTop: "20px", width: "50%" }}
                    name="address"
                    label="Address"
                    multiline
                    value={address}
                  />
                  <br />
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    sx={{ marginTop: "20px", width: "50%" }}
                    name="cnic"
                    label="CNIC"
                    value={cnic}
                  />
                  <br />
                </Grid>
                <Grid xs={6}>
                  <TextField
                    sx={{ marginTop: "20px", width: "50%" }}
                    name="dob"
                    label="Date of Birth"
                    value={dob}
                  />
                  <br />
                  <TextField
                    sx={{ marginTop: "20px", width: "50%" }}
                    name="maritalStatus"
                    label="Marital Status"
                    value={maritalStatus}
                  />

                  <br />
                  <TextField
                    sx={{ marginTop: "20px", width: "50%" }}
                    name="gender"
                    label="Gender"
                    value={gender}
                  />
                  <br />
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    sx={{ marginTop: "20px", width: "50%" }}
                    name="passport"
                    label="Passport (optional)"
                    value={passport}
                  />
                  <br />
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    sx={{ marginTop: "20px", width: "50%" }}
                    name="blood"
                    label="Blood Group"
                    value={blood}
                  />
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Grid container spacing={2} xs={12}>
                <Grid xs={6}>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    sx={{ marginTop: "20px", width: "50%" }}
                    name="employeeId"
                    label="Employee ID"
                    value={employeeId}
                  />
                  <br />
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    sx={{ marginTop: "20px", width: "50%" }}
                    name="email"
                    label="Email"
                    value={email}
                  />
                  <br />
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    sx={{ marginTop: "20px", width: "50%" }}
                    name="department"
                    label="Department"
                    value={department}
                  />

                  <br />
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    sx={{ marginTop: "20px", width: "50%" }}
                    name="shiftStartTime"
                    label="Shift Start Time"
                    value={shiftStartTime}
                  />
                  <br />
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    sx={{ marginTop: "20px", width: "50%" }}
                    name="shiftEndTime"
                    label="Shift End Time"
                    value={shiftEndTime}
                  />
                  <br />
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    sx={{ marginTop: "20px", width: "50%" }}
                    name="title"
                    label="Title"
                    value={title}
                  />
                  <br />
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    sx={{ marginTop: "20px", width: "50%" }}
                    name="designation"
                    label="Designation"
                    value={designation}
                  />

                  <br />
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    sx={{ marginTop: "20px", width: "50%" }}
                    name="reportingOffice"
                    label="Reporting Office"
                    value={reportingOffice}
                  />

                  <br />
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    sx={{ marginTop: "20px", width: "50%" }}
                    name="reportingDepartment"
                    label="Reporting Department"
                    value={reportingDepartment}
                  />
                </Grid>
                <Grid xs={6}>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    sx={{ marginTop: "20px", width: "50%" }}
                    name="linemanager"
                    label="Line Manager"
                    value={supervisor}
                  />
                  <br />
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    sx={{ marginTop: "20px", width: "50%" }}
                    name="engagementManager"
                    label="Engagement Manager"
                    value={engagementManager}
                  />
                  <br />
                  <TextField
                    sx={{ marginTop: "20px", width: "50%" }}
                    name="date"
                    label="Date of Joining"
                    value={date}
                  />
                  <br />
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    sx={{ marginTop: "20px", width: "50%" }}
                    name="permanent date"
                    label="Permanent Date"
                    value={permanentDate}
                  />
                  <br />
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    sx={{ marginTop: "20px", width: "50%" }}
                    name="workType"
                    label="Work Type"
                    value={workType}
                  />

                  <br />
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    sx={{ marginTop: "20px", width: "50%" }}
                    name="role"
                    label="Role"
                    value={role}
                  />

                  <br />
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    sx={{ marginTop: "20px", width: "50%" }}
                    name="employmentStatus"
                    label="Employment Status"
                    value={employmentStatus}
                  />

                  <br />
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    sx={{ marginTop: "20px", width: "50%" }}
                    name="salary"
                    label="Salary"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">PKR</InputAdornment>
                      ),
                    }}
                    value={salary}
                  />
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Grid container spacing={1} xs={12}>
                <Grid xs={6}>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    sx={{ marginTop: "20px", width: "50%" }}
                    name="client"
                    value={client}
                    label="Client"
                  />

                  <br />
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    sx={{ marginTop: "20px", width: "50%" }}
                    name="projectType"
                    label="Project Type"
                    value={projectType}
                  />
                  <br />
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    sx={{ marginTop: "20px", width: "50%" }}
                    name="projectRole"
                    label="Project Role"
                    value={projectRole}
                  />
                  <br />
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    sx={{ marginTop: "20px", width: "50%" }}
                    name="region"
                    label="Region"
                    value={region}
                  />
                </Grid>
                <Grid xs={6}>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    sx={{ marginTop: "20px", width: "50%" }}
                    name="projectName"
                    value={projectName}
                    label="Project"
                  />

                  <br />

                  <TextField
                    InputLabelProps={{ shrink: true }}
                    sx={{ marginTop: "20px", width: "50%" }}
                    name="projectStartDate"
                    label="Starting Date"
                    value={projectStartDate}
                  />
                  <br />
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    sx={{ marginTop: "20px", width: "50%" }}
                    name="billable hours"
                    label="Billable Hours"
                    value={billableHours}
                  />
                  <br />
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    sx={{ marginTop: "20px", width: "50%" }}
                    name="projectEndDate"
                    label="Ending Date"
                    value={projectEndDate}
                  />
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={3}>
              <Grid container xs={12}>
                <Grid item xs={6}>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    sx={{ marginTop: "20px", width: "50%" }}
                    name="fuel"
                    label="Fuel Allowance"
                    value={fuel}
                  />
                  <br />
                  <Tooltip
                    arrow
                    title="OPD and IPD for parents and self"
                    placement="right"
                  >
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      sx={{ marginTop: "20px", width: "50%" }}
                      name="medicalAllowance"
                      label="Medical Allowance"
                      value={medicalAllowance}
                    />
                  </Tooltip>
                  <br />
                  <Tooltip arrow placement="right" title="8% Provident Fund">
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      sx={{ marginTop: "20px", width: "50%" }}
                      name="providentFund"
                      label="Provident Fund"
                      value={providentFund}
                    />
                  </Tooltip>
                  <br />
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    sx={{ marginTop: "20px", width: "50%" }}
                    name="empOfQuarter"
                    label="Employee of Quarter"
                    value={empOfQuarter}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    sx={{ marginTop: "20px", width: "50%" }}
                    name="paidCertifications"
                    label="Paid Certifications"
                    value={paidCertifications}
                  />
                  <br />
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    sx={{ marginTop: "20px", width: "50%" }}
                    name="annualBonus"
                    label="Annual Bonus"
                    value={annualBonus}
                  />
                  <br />
                  <Tooltip
                    arrow
                    placement="right"
                    title="Paid time off for 12 days"
                  >
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      sx={{ marginTop: "20px", width: "50%" }}
                      name="paidTimeOff"
                      label="Paid Time Off"
                      value={paidTimeOff}
                    />
                  </Tooltip>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={4}>
              <Grid container spacing={2} xs={12}>
                <Grid xs={6}>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    sx={{ marginTop: "20px", width: "50%" }}
                    name="emergencyName"
                    label="Name"
                    value={emergencyName}
                  />
                  <br />
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    sx={{ marginTop: "20px", width: "50%" }}
                    name="relation"
                    label="Relation"
                    value={relation}
                  />
                </Grid>

                <Grid xs={6}>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    sx={{ marginTop: "20px", width: "50%" }}
                    name="emergencyAddress"
                    label="Address (optional)"
                    multiline
                    value={emergencyAddress}
                  />
                  <br />
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    sx={{ marginTop: "20px", width: "50%" }}
                    name="contact"
                    type="tel"
                    label="Contact"
                    value={contact}
                  />
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={5}>
              <Grid container xs={12}>
                <Grid xs={6}>
                  <TextField id="degree" label="Degree" value={degree} />
                  <br />
                  <TextField
                    sx={{ mt: 2 }}
                    id="institute"
                    label="Institute"
                    value={institute}
                  />
                </Grid>
                <Grid xs={6}>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    sx={{ marginTop: "20px", width: "50%" }}
                    name="degreeStartDate"
                    label="Start date"
                    value={degreeStartDate}
                  />
                  <br />
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    sx={{ marginTop: "20px", width: "50%" }}
                    name="degreeEndDate"
                    label="End date (or expected)"
                    value={degreeEndDate}
                  />
                </Grid>
              </Grid>
            </TabPanel>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EmployeeProfile;
