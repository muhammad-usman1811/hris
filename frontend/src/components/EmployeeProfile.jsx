import React, { useState, useCallback, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { editUser, getUserDetails } from "../actions/userActions";
import Button from "@mui/material/Button";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import LoadingButton from "@mui/lab/LoadingButton";
import Checkbox from "@mui/material/Checkbox";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import EditIcon from "@mui/icons-material/Edit";
import EditUserModal from "./EditUserModal";

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

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function EmployeeProfile() {
  const departments = [
    {
      value: "Web Development",
    },
    {
      value: "Data and Analytics",
    },
    {
      value: "HR",
    },
    {
      value: "Project Management",
    },
    {
      value: "Admin",
    },
    {
      value: "Pre Sales",
    },
    {
      value: "Devops and Infra",
    },
  ];

  const designations = [
    {
      value: "Intern Data Engineer",
    },
    {
      value: "Associate Consultant ",
    },
    {
      value: "Junior Consultant",
    },
    {
      value: "Consultant",
    },
    {
      value: "Senior Consultant",
    },
    {
      value: "AVP",
    },
    {
      value: "VP",
    },
    {
      value: "SVP",
    },
    {
      value: "CEO",
    },
  ];

  const roles = ["Admin", "Engagement Manager", "Line Manager", "Employee"];

  const workTypes = [
    {
      value: "On-Site",
    },
    {
      value: "Remote",
    },
    {
      value: "Hybrid",
    },
  ];

  const bloodGroups = [
    {
      value: "None",
    },
    {
      value: "A+",
    },
    {
      value: "A-",
    },
    {
      value: "B+",
    },
    {
      value: "B-",
    },
    {
      value: "AB+",
    },
    {
      value: "AB-",
    },
    {
      value: "O+",
    },
    {
      value: "O-",
    },
  ];

  const employmentStatusOptions = [
    {
      value: "Intern",
    },
    {
      value: "On Probation",
    },
    {
      value: "Permanent",
    },
    {
      value: "Contractual",
    },
  ];

  const maritalStatusOptions = [
    {
      value: "Single",
    },
    {
      value: "Married",
    },
  ];

  const genders = [
    {
      value: "Male",
    },
    {
      value: "Female",
    },
  ];

  const reportingDepartmentOpt = [
    {
      value: "HR",
    },
    {
      value: "IT",
    },
    {
      value: "Finance",
    },
    {
      value: "Admin & Procurement",
    },
    {
      value: "Professional Services",
    },
  ];

  const officeOptions = [
    {
      value: "Lahore",
    },
    {
      value: "Karachi",
    },
    {
      value: "Islamabad",
    },
  ];

  const fuelOptions = [
    { value: "N/A" },
    { value: "Assistant Consultant - 30L" },
    { value: "Junior Consultant - 50L" },
    { value: "Consultant - 70L" },
    { value: "Senior Consultant - 100L" },
    { value: "Managing Director - 150" },
    { value: "Director - 175L" },
  ];

  // Fuel options and its custom options
  const customFuelFromLocalStorage = JSON.parse(
    localStorage.getItem("customFuelOptions")
  );

  const customFuelOptions = [
    ...fuelOptions,
    ...(customFuelFromLocalStorage || []),
  ];

  const benefitOptions = [{ value: "Eligible" }, { value: "Not Eligible" }];

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const userEdit = useSelector((state) => state.userEdit);
  const { success } = userEdit;

  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpenModal = (data) => {
    setSelectedProject(data);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedProject(null);
  };

  const handleSaveProject = (updatedProject) => {
    const updatedProjects = projects.map((project) =>
      project.client === updatedProject.client ? updatedProject : project
    );
    setProjects(updatedProjects);
  };

  //States to store values
  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [personalEmail, setPersonalEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [passport, setPassport] = useState("");
  const [cnic, setCnic] = useState("");
  const [dob, setDob] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [gender, setGender] = useState("");
  const [department, setDepartment] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [designation, setDesignation] = useState("");
  const [shiftStartTime, setShiftStartTime] = useState("");
  const [shiftEndTime, setShiftEndTime] = useState("");
  const [title, setTitle] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [engagementManager, setEngagementManager] = useState("");
  const [permanentDate, setPermanentDate] = useState("");
  const [reportingDepartment, setReportingDepartment] = useState("");
  const [reportingOffice, setReportingOffice] = useState("");
  const [degree, setDegree] = useState("");
  const [institute, setInstitute] = useState("");
  const [degreeStartDate, setDegreeStartDate] = useState("");
  const [degreeEndDate, setDegreeEndDate] = useState("");
  const [date, setDate] = useState("");
  const [workType, setWorkType] = useState("");
  const [role, setRole] = useState([]);
  const [employmentStatus, setEmploymentStatus] = useState("");
  const [salary, setSalary] = useState("");
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

  //Other states
  //const [openToast, setOpenToast] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [attemptedUpload, setAttemptedUpload] = useState(false);
  const [imageIsChanged, setImageIsChanged] = useState(false);
  const [isTouched, setIsTouched] = useState({
    imageUrl: false,
    name: false,
    email: false,
    personalEmail: false,
    password: false,
    address: false,
    phone: false,
    passport: false,
    cnic: false,
    dob: false,
    maritalStatus: false,
    gender: false,
    department: false,
    shiftStartTime: false,
    shiftEndTime: false,
    employeeId: false,
    designation: false,
    title: false,
    supervisor: false,
    engagementManager: false,
    permanentDate: false,
    reportingDepartment: false,
    reportingOffice: false,
    date: false,
    workType: false,
    role: false,
    employmentStatus: false,
    salary: false,
    emergencyName: false,
    relation: false,
    emergencyAddress: false,
    contact: false,
    blood: false,
    degree: false,
    institute: false,
    degreeStartDate: false,
    degreeEndDate: false,
    fuel: false,
    medicalAllowance: false,
    providentFund: false,
    empOfQuarter: false,
    paidCertifications: false,
    paidTimeOff: false,
    annualBonus: false,
  });

  //Handle role change
  const handleRoleChange = (event, selectedRoles) => {
    setRole(selectedRoles);
  };

  const isDisabled = Object.values(isTouched).some((value) => value === true);

  const [hasBlurred, setHasBlurred] = useState({
    password: false,
    email: false,
    personalEmail: false,
    phone: false,
    cnic: false,
    passport: false,
    contact: false,
  });

  const errors = {};
  let isValid = true;

  if (!imageUrl) {
    errors.imageUrl = "Only .jpeg/jpg and .png images";
    isValid = false;
  }

  if (!name || !name.trim()) {
    errors.name = "Please enter name";
    isValid = false;
  }

  if (!email || !email.trim()) {
    errors.email = "Please enter email";
    isValid = false;
  } else if (!email.includes("@digifloat.com") && hasBlurred.email) {
    errors.email = "Email format is incorrect";
    isValid = false;
  }

  if (!personalEmail || !personalEmail.trim()) {
    errors.personalEmail = "Please enter your personal email";
    isValid = false;
  }

  if (!password || !password.trim()) {
    errors.password = "Please enter password";
    isValid = false;
  } else if (password.length < 8 && hasBlurred.password) {
    errors.password = "Password must be 8 characters";
    isValid = false;
  }

  if (!address.trim()) {
    errors.address = "Please enter address";
    isValid = false;
  }

  if (!phone || !phone.trim()) {
    errors.phone = "Please enter phone number";
    isValid = false;
  } else if (!/^[0-9]{4}-[0-9]{7}$/.test(phone) && hasBlurred.phone) {
    errors.phone = "Please enter a valid number (e.g. 0312-1234567";
    isValid = false;
  }

  if (
    passport &&
    !/^[A-Za-z0-9]+$/.test(passport.trim()) &&
    hasBlurred.passport
  ) {
    errors.passport = "Please enter alphanumeric only";
    isValid = false;
  }

  if (!cnic.trim()) {
    errors.cnic = "Please enter your CNIC";
    isValid = false;
  } else if (!/^[0-9]{5}-[0-9]{7}-[0-9]{1}$/.test(cnic) && hasBlurred.cnic) {
    errors.cnic = "Please enter a valid CNIC";
    isValid = false;
  }

  if (!dob) {
    errors.dob = "Please enter date of birth";
    isValid = false;
  }

  if (!maritalStatus) {
    errors.maritalStatus = "Please enter marital status";
    isValid = false;
  }

  if (!gender) {
    errors.gender = "Please select gender";
    isValid = false;
  }
  if (!shiftStartTime) {
    errors.shiftStartTime = "Please set shift start time";
    isValid = false;
  }

  if (!shiftEndTime) {
    errors.shiftEndTime = "Please set shift end time";
    isValid = false;
  }

  if (!department) {
    errors.department = "Please enter department";
    isValid = false;
  }

  if (!employeeId.trim()) {
    errors.employeeId = "Please enter employee ID";
    isValid = false;
  }

  if (!designation) {
    errors.designation = "Please enter designation";
    isValid = false;
  }

  if (!title || !title.trim()) {
    errors.title = "Please enter title";
    isValid = false;
  }

  if (!supervisor || !supervisor.trim()) {
    errors.supervisor = "Please enter supervisor";
    isValid = false;
  }

  if (!engagementManager || !engagementManager.trim()) {
    errors.engagementManager = "Please enter engagement manager";
    isValid = false;
  }

  if (!reportingOffice) {
    errors.reportingOffice = "Please select reporting office";
    isValid = false;
  }

  if (!permanentDate) {
    errors.permanentDate = "Please set date of permanent employment";
    isValid = false;
  }

  if (!date) {
    errors.date = "Please enter date of joining";
    isValid = false;
  }

  if (!workType) {
    errors.workType = "Please enter work type";
    isValid = false;
  }

  if (!role) {
    errors.role = "Please specify a role";
  }

  if (!salary) {
    errors.salary = "Please enter salary";
    isValid = false;
  }

  if (!employmentStatus) {
    errors.employmentStatus = "Please enter employment status";
    isValid = false;
  }

  if (!emergencyName || !emergencyName.trim()) {
    errors.emergencyName = "Please enter emergency contact's name";
    isValid = false;
  }

  if (!relation || !relation.trim()) {
    errors.relation = "Please enter emergency contact's relation";
    isValid = false;
  }

  if (!contact || !contact.trim()) {
    errors.contact = "Please enter emergency contact";
    isValid = false;
  } else if (!/^[0-9]{4}-[0-9]{7}$/.test(contact) && hasBlurred.contact) {
    errors.contact = "Please enter a valid number (e.g. 0312-1234567";
    isValid = false;
  }

  if (!degree || !degree.trim()) {
    errors.degree = "Please enter degree";
    isValid = false;
  }

  if (!degreeStartDate) {
    errors.degreeStartDate = "Please set start date";
    isValid = false;
  }

  if (!degreeEndDate) {
    errors.degreeEndDate = "Please set end date";
    isValid = false;
  }

  if (!institute || !institute.trim()) {
    errors.degree = "Please enter institute";
    isValid = false;
  }

  if (!fuel) {
    errors.fuel = "Please select fuel";
    isValid = false;
  }

  if (!medicalAllowance) {
    errors.medicalAllowance = "Please select any option";
    isValid = false;
  }

  if (!providentFund) {
    errors.providentFund = "Please select any option";
    isValid = false;
  }

  if (!paidCertifications) {
    errors.paidCertifications = "Please select any option";
    isValid = false;
  }

  if (!empOfQuarter) {
    errors.empOfQuarter = "Please select any option";
    isValid = false;
  }

  if (!annualBonus) {
    errors.annualBonus = "Please select any option";
    isValid = false;
  }

  if (!paidTimeOff) {
    errors.paidTimeOff = "Please select any option";
    isValid = false;
  }

  const handleAttempt = () => {
    setAttemptedUpload(true);
    setIsTouched((prev) => ({
      ...prev,
      imageUrl: true,
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setIsTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    setHasBlurred((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    setHasBlurred((prev) => ({
      ...prev,
      [name]: false,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValid) {
      dispatch(
        editUser({
          id,
          imageUrl,
          imageIsChanged,
          name,
          email,
          personalEmail,
          password,
          address,
          passport,
          dob,
          maritalStatus,
          gender,
          phone,
          cnic,
          department,
          employeeId,
          designation,
          shiftStartTime,
          shiftEndTime,
          title,
          supervisor,
          engagementManager,
          reportingDepartment,
          reportingOffice,
          permanentDate,
          projects: JSON.stringify(projects),
          date,
          workType,
          role: JSON.stringify(role),
          employmentStatus,
          salary,
          emergencyAddress,
          emergencyName,
          relation,
          contact,
          blood,
          degree,
          degreeStartDate,
          degreeEndDate,
          institute,
          fuel,
          medicalAllowance,
          providentFund,
          empOfQuarter,
          paidCertifications,
          annualBonus,
          paidTimeOff,
        })
      );
    } else {
      return;
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // const handleToastClose = () => {
  //   setOpenToast(false);
  // };

  // const handleClick = () => {
  //   setOpenToast(true);
  // };

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length) {
      const selectedFile = Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0]),
      });
      setImageUrl(selectedFile);
      setImageIsChanged(true);
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png", ".jpeg", ".jpg"],
    },
  });

  const handleClear = () => {
    setImageUrl(null);
  };

  const handleKeyPress = (event) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    const alphaRegex = /^[A-Za-z\s]+$/;

    if (!alphaRegex.test(keyValue)) {
      event.preventDefault();
    }
  };

  const handleEmployeeIdChange = (e) => {
    let value = e.target.value;

    // Remove any non-digit characters from the input
    value = value.replace(/\D/g, "");

    // Limit the input to three digits
    value = value.slice(0, 3);

    setEmployeeId(value);
  };

  useEffect(() => {
    if (success) {
      dispatch({ type: "USER_EDIT_RESET" });
      dispatch({ type: "USER_DETAILS_RESET" });
      navigate("/home/employees");
    } else {
      if (!user || !user.name || user._id !== id) {
        dispatch(getUserDetails(id));
      } else {
        setImageUrl(user.imageUrl);
        setName(user.name);
        setEmail(user.email);
        setPersonalEmail(user.personalEmail ?? "add");
        setPassword(user.password);
        setAddress(user.address);
        setPhone(user.phone);
        setPassport(user.passport);
        setCnic(user.cnic);
        setDob(user.dob);
        setMaritalStatus(user.maritalStatus);
        setGender(user.gender);
        setDepartment(user.jobDetails.department);
        setShiftStartTime(user.shiftStartTime);
        setShiftEndTime(user.shiftEndTime);
        setEmployeeId(user.employeeId);
        setTitle(user.jobDetails.title);
        setDesignation(user.jobDetails.designation);
        setSupervisor(user.jobDetails.supervisor);
        setEngagementManager(user.jobDetails?.engagementManager ?? "add");
        setReportingDepartment(user.jobDetails.reportingDepartment);
        setReportingOffice(user.jobDetails?.reportingOffice ?? "add");
        setPermanentDate(user.jobDetails?.permanentDate ?? "add");
        setProjects(user.projects);
        setDate(user.jobDetails.dateOfJoining);
        setWorkType(user.jobDetails.workType);
        setRole(user.role);
        console.log("db", user.role);
        setEmploymentStatus(user.jobDetails.employmentStatus);
        setSalary(user.jobDetails.salary);
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
    }
  }, [dispatch, id, user, success, navigate]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    //profile picture and cover picture
    <>
      <Grid container item xs={12} component="form" onSubmit={handleSubmit}>
        <Grid item xs={12} sx={{ height: 250 }}>
          <Item sx={{ height: 250 }}>
            <img
              src="/images/cover1.png"
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
            {...getRootProps()}
          >
            {imageUrl ? (
              <Item
                sx={{
                  position: "relative",
                  height: 180,
                  width: 180,
                  borderRadius: "50%",
                  backgroundColor: "#eaeff1",
                }}
              >
                <img
                  //src={`/photos/${imageUrl}`}
                  src={
                    imageUrl.preview ||
                    `http://localhost:5000/photos/${imageUrl}`
                  }
                  alt="Profile"
                  loading="lazy"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 180,
                    width: 180,
                    borderRadius: "50%",
                    //border: "5px solid #fff",
                  }}
                />
                <IconButton
                  aria-label="cancel"
                  onClick={handleClear}
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    backgroundColor: "white",
                    boxShadow: "0px 0px 3px rgba(0,0,0,0.3)",
                  }}
                >
                  <AddAPhotoIcon />
                </IconButton>
              </Item>
            ) : (
              <Box
                sx={{
                  width: 200,
                  height: 200,
                  border: "1px solid grey",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                  position: "relative",
                  borderRadius: "50%",
                }}
              >
                <IconButton color="primary" onClick={handleAttempt}>
                  <PhotoCamera />
                </IconButton>
                {(errors.imageUrl || attemptedUpload) && (
                  <Typography color="error" variant="body2">
                    {errors.imageUrl}
                  </Typography>
                )}
              </Box>
            )}
            <input {...getInputProps()} accept="image/*" />
          </Grid>
          <Grid
            sx={{
              mr: 4,
              mt: -10,
              mb: 4,
              display: "flex",
              flexDirection: "row-reverse",
            }}
          >
            <Stack spacing={2} direction="row">
              <LoadingButton
                //loading={loading}
                color="error"
                variant="contained"
                type="submit"
                disabled={!isValid || !isDisabled}
                // onClick={handleClick}
              >
                Save Changes
              </LoadingButton>
              <Button
                color="error"
                variant="outlined"
                onClick={() => navigate("/home/employees")}
              >
                Cancel
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
      <Box sx={{ ml: 5 }}>
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
                InputProps={{
                  onKeyPress: handleKeyPress,
                }}
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={handleBlur}
                error={!!errors.name && isTouched.name}
                helperText={errors.name && isTouched.name && errors.name}
              />
              <br />
              <TextField
                InputLabelProps={{ shrink: true }}
                sx={{ marginTop: "20px", width: "50%" }}
                name="personalEmail"
                type="email"
                label="Personal Email"
                value={personalEmail}
                onChange={(e) => setPersonalEmail(e.target.value)}
                onBlur={handleBlur}
                onFocus={handleFocus}
                error={!!errors.personalEmail && isTouched.personalEmail}
                helperText={
                  errors.personalEmail &&
                  isTouched.personalEmail &&
                  errors.personalEmail
                }
              />
              <br />
              <TextField
                InputLabelProps={{ shrink: true }}
                sx={{ marginTop: "20px", width: "50%" }}
                name="password"
                type={showPassword ? "text" : "password"}
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={handleBlur}
                onFocus={handleFocus}
                error={!!errors.password && isTouched.password}
                helperText={
                  errors.password && isTouched.password && errors.password
                }
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
                onChange={(e) => setPhone(e.target.value)}
                onBlur={handleBlur}
                onFocus={handleFocus}
                error={!!errors.phone && isTouched.phone}
                helperText={errors.phone && isTouched.phone && errors.phone}
              />
              <br />
              <TextField
                InputLabelProps={{ shrink: true }}
                sx={{ marginTop: "20px", width: "50%" }}
                name="address"
                label="Address"
                multiline
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                onBlur={handleBlur}
                error={!!errors.address && isTouched.address}
                helperText={
                  errors.address && isTouched.address && errors.address
                }
              />
              <br />
              <TextField
                InputLabelProps={{ shrink: true }}
                sx={{ marginTop: "20px", width: "50%" }}
                name="cnic"
                label="CNIC"
                value={cnic}
                onChange={(e) => setCnic(e.target.value)}
                onBlur={handleBlur}
                onFocus={handleFocus}
                error={!!errors.cnic && isTouched.cnic}
                helperText={errors.cnic && isTouched.cnic && errors.cnic}
              />
              <br />
            </Grid>
            <Grid xs={6}>
              <TextField
                sx={{ marginTop: "20px", width: "50%" }}
                name="dob"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                onBlur={handleBlur}
                error={!!errors.dob && isTouched.dob}
                helperText={
                  errors.dob && isTouched.dob
                    ? errors.dob
                    : "Please select date of birth"
                }
              />
              <br />
              <TextField
                sx={{ marginTop: "20px", width: "50%" }}
                name="maritalStatus"
                select
                value={maritalStatus}
                onChange={(e) => setMaritalStatus(e.target.value)}
                onBlur={handleBlur}
                error={!!errors.maritalStatus && isTouched.maritalStatus}
                helperText={
                  errors.maritalStatus && isTouched.maritalStatus
                    ? errors.maritalStatus
                    : "Please select marital status"
                }
              >
                {maritalStatusOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
              <br />
              <TextField
                sx={{ marginTop: "20px", width: "50%" }}
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                select
                helperText="Please select gender"
              >
                {genders.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
              <br />
              <TextField
                InputLabelProps={{ shrink: true }}
                sx={{ marginTop: "20px", width: "50%" }}
                name="passport"
                label="Passport (optional)"
                value={passport}
                onChange={(e) => setPassport(e.target.value)}
                onBlur={handleBlur}
                onFocus={handleFocus}
                error={!!errors.passport && isTouched.passport}
                helperText={
                  errors.passport && isTouched.passport && errors.passport
                }
              />
              <br />
              <TextField
                sx={{ marginTop: "20px", width: "50%" }}
                name="blood"
                select
                value={blood}
                onChange={(e) => setBlood(e.target.value)}
                onBlur={handleBlur}
                error={!!errors.blood && isTouched.blood}
                helperText="Select blood group (optional)"
              >
                {bloodGroups.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
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
                onChange={handleEmployeeIdChange}
                onBlur={handleBlur}
                error={!!errors.employeeId && isTouched.employeeId}
                helperText={
                  errors.employeeId && isTouched.employeeId && errors.employeeId
                    ? errors.employeeId
                    : "Please set employee id"
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">df-</InputAdornment>
                  ),
                }}
              />
              <br />
              <TextField
                InputLabelProps={{ shrink: true }}
                sx={{ marginTop: "20px", width: "50%" }}
                name="email"
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleBlur}
                onFocus={handleFocus}
                error={!!errors.email && isTouched.email}
                helperText={errors.email && isTouched.email && errors.email}
              />
              <br />
              <TextField
                sx={{ marginTop: "20px", width: "50%" }}
                name="department"
                select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                onBlur={handleBlur}
                error={!!errors.department && isTouched.department}
                helperText={
                  errors.department && isTouched.department
                    ? errors.department
                    : "Please select the department"
                }
              >
                {departments.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
              <br />
              <TextField
                sx={{ marginTop: "20px", width: "50%" }}
                name="shiftStartTime"
                type="time"
                value={shiftStartTime}
                onChange={(e) => setShiftStartTime(e.target.value)}
                onBlur={handleBlur}
                helperText={
                  errors.shiftStartTime && isTouched.shiftStartTime
                    ? errors.shiftStartTime
                    : "Please set shift start time"
                }
                error={!!errors.shiftStartTime && isTouched.shiftStartTime}
              />
              <br />
              <TextField
                sx={{ marginTop: "20px", width: "50%" }}
                name="shiftEndTime"
                type="time"
                value={shiftEndTime}
                onChange={(e) => setShiftEndTime(e.target.value)}
                onBlur={handleBlur}
                helperText={
                  errors.shiftEndTime && isTouched.shiftEndTime
                    ? errors.shiftEndTime
                    : "Please set shift end time"
                }
              />
              <br />
              <TextField
                InputLabelProps={{ shrink: true }}
                sx={{ marginTop: "20px", width: "50%" }}
                name="title"
                label="Title"
                InputProps={{
                  onKeyPress: handleKeyPress,
                }}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={handleBlur}
                error={!!errors.title && isTouched.title}
                helperText={
                  errors.title && isTouched.title && errors.title
                    ? errors.title
                    : "Please set title"
                }
              />
              <br />
              <TextField
                InputLabelProps={{ shrink: true }}
                sx={{ marginTop: "20px", width: "50%" }}
                name="designation"
                select
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                onBlur={handleBlur}
                error={!!errors.designation && isTouched.designation}
                helperText={
                  errors.designation && isTouched.designation
                    ? errors.designation
                    : "Please select designation"
                }
              >
                {designations.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
              <br />
              <TextField
                sx={{ marginTop: "20px", width: "50%" }}
                name="reportingOffice"
                select
                value={reportingOffice}
                onChange={(e) => setReportingOffice(e.target.value)}
                onBlur={handleBlur}
                error={!!errors.reportingOffice && isTouched.reportingOffice}
                helperText={
                  errors.reportingOffice && isTouched.reportingOffice
                    ? errors.reportingOffice
                    : "Please select reporting office"
                }
              >
                {officeOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
              <br />
              <TextField
                sx={{ marginTop: "20px", width: "50%" }}
                name="reportingDepartment"
                select
                value={reportingDepartment}
                onChange={(e) => setReportingDepartment(e.target.value)}
                onBlur={handleBlur}
                helperText="Please select reporting department"
              >
                {reportingDepartmentOpt.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <br />
            <Grid xs={6}>
              <TextField
                InputLabelProps={{ shrink: true }}
                sx={{ marginTop: "20px", width: "50%" }}
                name="linemanager"
                label="Line Manager"
                InputProps={{
                  onKeyPress: handleKeyPress,
                }}
                value={supervisor}
                onChange={(e) => setSupervisor(e.target.value)}
                onBlur={handleBlur}
                error={!!errors.supervisor && isTouched.supervisor}
                helperText={
                  errors.supervisor && isTouched.supervisor && errors.supervisor
                    ? errors.supervisor
                    : "Please enter Line Manager"
                }
              />
              <br />
              <TextField
                InputLabelProps={{ shrink: true }}
                sx={{ marginTop: "20px", width: "50%" }}
                name="engagement manager"
                label="Engagement Manager"
                InputProps={{
                  onKeyPress: handleKeyPress,
                }}
                value={engagementManager}
                onChange={(e) => setEngagementManager(e.target.value)}
                onBlur={handleBlur}
                error={
                  !!errors.engagementManager && isTouched.engagementManager
                }
                helperText={
                  errors.engagementManager &&
                  isTouched.engagementManager &&
                  errors.engagementManager
                    ? errors.supervisor
                    : "Please set Engagement Manager"
                }
              />
              <br />
              <TextField
                sx={{ marginTop: "20px", width: "50%" }}
                name="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                onBlur={handleBlur}
                error={!!errors.date && isTouched.date}
                helperText={
                  errors.date && isTouched.date
                    ? errors.date
                    : "Please select the date of joining"
                }
              />
              <br />
              <TextField
                sx={{ marginTop: "20px", width: "50%" }}
                name="permanent date"
                type="date"
                value={permanentDate}
                onChange={(e) => setPermanentDate(e.target.value)}
                onBlur={handleBlur}
                error={!!errors.permanentDate && isTouched.permanentDate}
                helperText={
                  errors.permanentDate && isTouched.permanentDate
                    ? errors.permanentDate
                    : "Please select date of permanent employment"
                }
              />
              <br />
              <TextField
                sx={{ marginTop: "20px", width: "50%" }}
                name="workType"
                select
                value={workType}
                onChange={(e) => setWorkType(e.target.value)}
                onBlur={handleBlur}
                error={!!errors.workType && isTouched.workType}
                helperText={
                  errors.workType && isTouched.workType
                    ? errors.workType
                    : "Please select the work location"
                }
              >
                {workTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
              <br />
              <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                options={roles}
                disableCloseOnSelect
                getOptionLabel={(option) => option}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option}
                  </li>
                )}
                style={{ marginTop: "20px", width: "50%" }}
                value={roles.filter((roleObject) => role.includes(roleObject))}
                onChange={handleRoleChange}
                onBlur={handleBlur}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Role"
                    name="role"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.role && isTouched.role}
                    helperText={errors.role && isTouched.role && errors.role}
                  />
                )}
              />
              <br />
              <TextField
                sx={{ marginTop: "20px", width: "50%" }}
                name="employmentStatus"
                select
                value={employmentStatus}
                onChange={(e) => setEmploymentStatus(e.target.value)}
                onBlur={handleBlur}
                error={!!errors.employmentStatus && isTouched.employmentStatus}
                helperText={
                  errors.employmentStatus && isTouched.employmentStatus
                    ? errors.employmentStatus
                    : "Please select employment status"
                }
              >
                {employmentStatusOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
              <br />
              <TextField
                sx={{ marginTop: "20px", width: "50%" }}
                InputLabelProps={{ shrink: true }}
                name="salary"
                type="number"
                label="Salary"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">PKR</InputAdornment>
                  ),
                }}
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                onBlur={handleBlur}
                error={!!errors.salary && isTouched.salary}
                helperText={errors.salary && isTouched.salary && errors.salary}
              />
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
                InputProps={{
                  onKeyPress: handleKeyPress,
                }}
                value={emergencyName}
                onChange={(e) => setEmergencyName(e.target.value)}
                onBlur={handleBlur}
                error={!!errors.emergencyName && isTouched.emergencyName}
                helperText={
                  errors.emergencyName &&
                  isTouched.emergencyName &&
                  errors.emergencyName
                }
              />
              <br />
              <TextField
                InputLabelProps={{ shrink: true }}
                sx={{ marginTop: "20px", width: "50%" }}
                name="relation"
                label="Relation"
                InputProps={{
                  onKeyPress: handleKeyPress,
                }}
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
                onBlur={handleBlur}
                error={!!errors.relation && isTouched.relation}
                helperText={
                  errors.relation && isTouched.relation && errors.relation
                }
              />
            </Grid>
            <br />
            <Grid xs={6}>
              <TextField
                InputLabelProps={{ shrink: true }}
                sx={{ marginTop: "20px", width: "50%" }}
                name="emergencyAddress"
                label="Address (optional)"
                multiline
                value={emergencyAddress}
                onChange={(e) => setEmergencyAddress(e.target.value)}
                onBlur={handleBlur}
                error={!!errors.emergencyAddress && isTouched.emergencyAddress}
                helperText={
                  errors.emergencyAddress &&
                  isTouched.emergencyAddress &&
                  errors.emergencyAddress
                }
              />
              <br />
              <TextField
                InputLabelProps={{ shrink: true }}
                sx={{ marginTop: "20px", width: "50%" }}
                name="contact"
                type="tel"
                label="Contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                onBlur={handleBlur}
                onFocus={handleFocus}
                error={!!errors.contact && isTouched.contact}
                helperText={
                  errors.contact && isTouched.contact && errors.contact
                }
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
                select
                value={fuel}
                onChange={(e) => setFuel(e.target.value)}
                onBlur={handleBlur}
                error={!!errors.fuel && isTouched.fuel}
                helperText={errors.fuel && isTouched.fuel && errors.fuel}
              >
                {customFuelOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
              <br />
              <TextField
                InputLabelProps={{ shrink: true }}
                sx={{ marginTop: "20px", width: "50%" }}
                name="medicalAllowance"
                label="Medical Allowance"
                select
                value={medicalAllowance}
                onChange={(e) => setMedicalAllowance(e.target.value)}
                onBlur={handleBlur}
                error={!!errors.medicalAllowance && isTouched.medicalAllowance}
                helperText={
                  errors.medicalAllowance &&
                  isTouched.medicalAllowance &&
                  errors.medicalAllowance
                }
              >
                {benefitOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
              <br />
              <TextField
                InputLabelProps={{ shrink: true }}
                sx={{ marginTop: "20px", width: "50%" }}
                name="providentFund"
                label="Provident Fund"
                select
                value={providentFund}
                onChange={(e) => setProvidentFund(e.target.value)}
                onBlur={handleBlur}
                error={!!errors.providentFund && isTouched.providentFund}
                helperText={
                  errors.providentFund &&
                  isTouched.providentFund &&
                  errors.providentFund
                }
              >
                {benefitOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
              <br />
              <TextField
                InputLabelProps={{ shrink: true }}
                sx={{ marginTop: "20px", width: "50%" }}
                name="empOfQuarter"
                label="Employee of Quarter"
                select
                value={empOfQuarter}
                onChange={(e) => setEmpOfQuarter(e.target.value)}
                onBlur={handleBlur}
                error={!!errors.empOfQuarter && isTouched.empOfQuarter}
                helperText={
                  errors.empOfQuarter &&
                  isTouched.empOfQuarter &&
                  errors.empOfQuarter
                }
              >
                {benefitOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                InputLabelProps={{ shrink: true }}
                sx={{ marginTop: "20px", width: "50%" }}
                name="paidCertifications"
                label="Paid Certifications"
                select
                value={paidCertifications}
                onChange={(e) => setPaidCertifications(e.target.value)}
                onBlur={handleBlur}
                error={
                  !!errors.paidCertifications && isTouched.paidCertifications
                }
                helperText={
                  errors.paidCertifications &&
                  isTouched.paidCertifications &&
                  errors.paidCertifications
                }
              >
                {benefitOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
              <br />
              <TextField
                InputLabelProps={{ shrink: true }}
                sx={{ marginTop: "20px", width: "50%" }}
                name="annualBonus"
                label="Annual Bonus"
                select
                value={annualBonus}
                onChange={(e) => setAnnualBonus(e.target.value)}
                onBlur={handleBlur}
                error={!!errors.annualBonus && isTouched.annualBonus}
                helperText={
                  errors.annualBonus &&
                  isTouched.annualBonus &&
                  errors.annualBonus
                }
              >
                {benefitOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
              <br />
              <TextField
                InputLabelProps={{ shrink: true }}
                sx={{ marginTop: "20px", width: "50%" }}
                name="paidTimeOff"
                label="Paid Time Off"
                select
                value={paidTimeOff}
                onChange={(e) => setPaidTimeOff(e.target.value)}
                onBlur={handleBlur}
                error={!!errors.paidTimeOff && isTouched.paidTimeOff}
                helperText={
                  errors.paidTimeOff &&
                  isTouched.paidTimeOff &&
                  errors.paidTimeOff
                }
              >
                {benefitOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={5}>
          <Grid container xs={12}>
            <Grid xs={6}>
              <TextField
                id="degree"
                label="Degree"
                InputProps={{
                  onKeyPress: handleKeyPress,
                }}
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                onBlur={handleBlur}
                error={!!errors.degree && isTouched.degree}
                helperText={
                  errors.degree && isTouched.degree && errors.degree
                    ? errors.degree
                    : "Please set degree"
                }
              />
              <br />
              <TextField
                sx={{ mt: 2 }}
                id="institute"
                label="Institute"
                InputProps={{
                  onKeyPress: handleKeyPress,
                }}
                value={institute}
                onChange={(e) => setInstitute(e.target.value)}
                onBlur={handleBlur}
                error={!!errors.institute && isTouched.institute}
                helperText={
                  errors.institute && isTouched.institute && errors.institute
                    ? errors.institute
                    : "Please set institute"
                }
              />
            </Grid>
            <Grid xs={6}>
              <TextField
                InputLabelProps={{ shrink: true }}
                sx={{ marginTop: "20px", width: "50%" }}
                name="degreeStartDate"
                label="Start date"
                type="date"
                InputProps={{
                  onKeyPress: handleKeyPress,
                }}
                value={degreeStartDate}
                onChange={(e) => setDegreeStartDate(e.target.value)}
                onBlur={handleBlur}
                error={!!errors.degreeStartDate && isTouched.degreeStartDate}
                helperText={
                  errors.degreeStartDate &&
                  isTouched.degreeStartDate &&
                  errors.degreeStartDate
                }
              />
              <br />
              <TextField
                InputLabelProps={{ shrink: true }}
                sx={{ marginTop: "20px", width: "50%" }}
                name="degreeEndDate"
                label="End date (or expected)"
                type="date"
                value={degreeEndDate}
                onChange={(e) => setDegreeEndDate(e.target.value)}
                onBlur={handleBlur}
                error={!!errors.degreeEndDate && isTouched.degreeEndDate}
                helperText={
                  errors.degreeEndDate &&
                  isTouched.degreeEndDate &&
                  errors.degreeEndDate
                }
              />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Grid container spacing={1} xs={12}>
            {projects.length !== 0 &&
              projects.map((project, index) => {
                return (
                  <>
                    <Grid xs={6}>
                      <Typography
                        variant="h6"
                        width="20%"
                        sx={{
                          marginTop: "20px",
                          backgroundColor: "#C62828",
                          color: "white",
                          textAlign: "center",
                          padding: "5px",
                        }}
                      >
                        Project {index + 1}
                      </Typography>
                      <TextField
                        sx={{ marginTop: "20px", width: "50%" }}
                        name="client"
                        label="Client"
                        multiple
                        required
                        value={project.client}
                      />
                      <br />
                      <TextField
                        InputLabelProps={{ shrink: true }}
                        sx={{ marginTop: "20px", width: "50%" }}
                        name="projectType"
                        label="Project Type"
                        required
                        value={project.projectType}
                      />
                      <br />
                      <TextField
                        InputLabelProps={{ shrink: true }}
                        sx={{ marginTop: "20px", width: "50%" }}
                        name="projectRole"
                        label="Project Role"
                        required
                        value={project.projectRole}
                      />
                      <br />
                      <TextField
                        InputLabelProps={{ shrink: true }}
                        sx={{ marginTop: "20px", width: "50%" }}
                        name="region"
                        label="Region"
                        required
                        value={project.region}
                      />
                      <br />
                    </Grid>
                    <Grid xs={6} marginTop="20px">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "center",
                        }}
                      >
                        <IconButton
                          color="primary"
                          onClick={() => handleOpenModal(project)}
                        >
                          <EditIcon />
                        </IconButton>
                      </div>
                      <TextField
                        sx={{ marginTop: "20px", width: "50%" }}
                        name="projectName"
                        label="Project"
                        required
                        value={project.projectName}
                      />
                      <br />
                      <TextField
                        InputLabelProps={{ shrink: true }}
                        sx={{ marginTop: "20px", width: "50%" }}
                        name="projectStartDate"
                        label="Starting Date"
                        type="date"
                        required
                        value={project.startDate}
                      />
                      <br />
                      <TextField
                        InputLabelProps={{ shrink: true }}
                        sx={{ marginTop: "20px", width: "50%" }}
                        name="billableHours"
                        label="Billable Hours"
                        value={project.billableHours}
                      />
                      <br />
                      <TextField
                        InputLabelProps={{ shrink: true }}
                        sx={{ marginTop: "20px", width: "50%" }}
                        name="projectEndDate"
                        label="Ending Date (optional)"
                        type="date"
                        value={project.endDate}
                      />
                      <br />
                    </Grid>
                  </>
                );
              })}
          </Grid>
        </TabPanel>
        {isOpen && (
          <EditUserModal
            project={selectedProject}
            onSave={handleSaveProject}
            onClose={handleCloseModal}
          />
        )}
      </Box>
    </>
  );
}
