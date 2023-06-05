import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import CancelIcon from "@mui/icons-material/Cancel";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import CircularProgress from "@mui/material/CircularProgress";
import { editUser, getUserDetails } from "../actions/userActions";


const EmployeeProfile = () => {
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

  const roles = [
    {
      value: "Admin",
    },
    {
      value: "Supervisor",
    },
    {
      value: "Employee",
    },
  ];

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

  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, user } = userDetails;

  const userEdit = useSelector((state) => state.userEdit);
  const { success, error } = userEdit;

  //States to store values
  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [title, setTitle] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [date, setDate] = useState("");
  const [workType, setWorkType] = useState("");
  const [role, setRole] = useState("");
  const [employmentStatus, setEmploymentStatus] = useState("");
  const [salary, setSalary] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [relation, setRelation] = useState("");
  const [emergencyAddress, setEmergencyAddress] = useState("");
  const [contact, setContact] = useState("");
  const [blood, setBlood] = useState("");

  //Other states
  const [openToast, setOpenToast] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [attemptedUpload, setAttemptedUpload] = useState(false);
  const [imageIsChanged, setImageIsChanged] = useState(false);
  const [isTouched, setIsTouched] = useState({
    imageUrl: false,
    name: false,
    email: false,
    password: false,
    address: false,
    phone: false,
    passport: false,
    cnic: false,
    dob: false,
    maritalStatus: false,
    gender: false,
    department: false,
    startTime: false,
    endTime: false,
    employeeId: false,
    designation: false,
    title: false,
    supervisor: false,
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
  });

  const isDisabled = Object.values(isTouched).some((value) => value === true);

  const [hasBlurred, setHasBlurred] = useState({
    password: false,
    email: false,
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

  if (!name.trim()) {
    errors.name = "Please enter name";
    isValid = false;
  }

  if (!email.trim()) {
    errors.email = "Please enter email";
    isValid = false;
  } else if (!email.includes("@digifloat.com") && hasBlurred.email) {
    errors.email = "Email format is incorrect";
    isValid = false;
  }

  if (!password.trim()) {
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

  if (!phone.trim()) {
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

  if (!genders) {
    errors.gender = "Please select gender";
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

  if (!designation.trim()) {
    errors.designation = "Please enter designation";
    isValid = false;
  }

  if (!title.trim()) {
    errors.title = "Please enter title";
    isValid = false;
  }

  if (!supervisor.trim()) {
    errors.supervisor = "Please enter supervisor";
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

  if (!salary || !salary.trim()) {
    errors.salary = "Please enter salary";
    isValid = false;
  }

  if (!employmentStatus) {
    errors.employmentStatus = "Please enter employment status";
    isValid = false;
  }

  if (!emergencyName.trim()) {
    errors.emergencyName = "Please enter emergency contact's name";
    isValid = false;
  }

  if (!relation.trim()) {
    errors.relation = "Please enter emergency contact's relation";
    isValid = false;
  }

  if (!contact.trim()) {
    errors.contact = "Please enter emergency contact";
    isValid = false;
  } else if (!/^[0-9]{4}-[0-9]{7}$/.test(contact) && hasBlurred.contact) {
    errors.contact = "Please enter a valid number (e.g. 0312-1234567";
    isValid = false;
  }

  // if (!emergencyAddress.trim()) {
  //   errors.emergencyAddress = "Please enter emergency contact's address";
  //   isValid = false;
  // }

  // if (!blood) {
  //   errors.blood = "Please enter blood group";
  //   isValid = false;
  // }

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
          startTime,
          endTime,
          title,
          supervisor,
          date,
          workType,
          role,
          employmentStatus,
          salary,
          emergencyAddress,
          emergencyName,
          relation,
          contact,
          blood,
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

  const handleToastClose = () => {
    setOpenToast(false);
  };

  const handleClick = () => {
    setOpenToast(true);
  };

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
        setPassword(user.password);
        setAddress(user.address);
        setPhone(user.phone);
        setPassport(user.passport);
        setCnic(user.cnic);
        setDob(user.dob);
        setMaritalStatus(user.maritalStatus);
        setGender(user.gender);
        setDepartment(user.jobDetails.department);
        setStartTime(user.startTime);
        setEndTime(user.endTime);
        setEmployeeId(user.employeeId);
        setTitle(user.jobDetails.title);
        setDesignation(user.jobDetails.designation);
        setSupervisor(user.jobDetails.supervisor);
        setDate(user.jobDetails.dateOfJoining);
        setWorkType(user.jobDetails.workType);
        setRole(user.role);
        setEmploymentStatus(user.jobDetails.employmentStatus);
        setSalary(user.jobDetails.salary);
        setEmergencyName(user.emergencyDetails.name);
        setRelation(user.emergencyDetails.relation);
        setEmergencyAddress(user.emergencyDetails.address);
        setContact(user.emergencyDetails.contact);
        setBlood(user.emergencyDetails.blood);
      }
    }
  }, [dispatch, id, user, success, navigate]);

  return (
    <>
      {loading && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {user && (
        <Grid
          component="form"
          onSubmit={handleSubmit}
          item
          container
          columnSpacing={2}
          sx={{
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
        >
          <Grid item xs={4}>
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
              }}
              {...getRootProps()}
            >
              {imageUrl ? (
                <>
                  <img
                    //src={`/photos/${imageUrl}`}
                    src={imageUrl.preview || `/photos/${imageUrl}`}
                    alt="Profile"
                    loading="lazy"
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      maxHeight: "100%",
                      maxWidth: "100%",
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
                    <CancelIcon />
                  </IconButton>
                </>
              ) : (
                <Box sx={{ display: "flex", flexDirection: "column" }}>
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
            </Box>
            <Box>
              <Typography
                variant="h6"
                sx={{ marginBottom: "-10px", marginTop: "15px" }}
              >
                Employee Details
              </Typography>
              <TextField
                InputLabelProps={{ shrink: true }}
                sx={{ marginTop: "20px", width: "50%" }}
                name="name"
                InputProps={{
                  onKeyPress: handleKeyPress,
                }}
                label="Full Name"
                variant="standard"
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
                name="email"
                type="email"
                label="Email"
                variant="standard"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleBlur}
                onFocus={handleFocus}
                error={!!errors.email && isTouched.email}
                helperText={errors.email && isTouched.email && errors.email}
              />
              <br />
              <TextField
                InputLabelProps={{ shrink: true }}
                sx={{ marginTop: "20px", width: "50%" }}
                name="password"
                type={showPassword ? "text" : "password"}
                label="Password"
                variant="standard"
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
                variant="standard"
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
                variant="standard"
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
                variant="standard"
                value={cnic}
                onChange={(e) => setCnic(e.target.value)}
                onBlur={handleBlur}
                onFocus={handleFocus}
                error={!!errors.cnic && isTouched.cnic}
                helperText={errors.cnic && isTouched.cnic && errors.cnic}
              />
              <br />
              <TextField
                sx={{ marginTop: "20px", width: "50%" }}
                name="dob"
                variant="standard"
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
                variant="standard"
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
            select
            helperText="Please select gender"
            variant="standard"
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
                variant="standard"
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
                // onBlur={handleBlur}
                // error={!!errors.blood && isTouched.blood}
                helperText="Select blood group (optional)"
                variant="standard"
              >
                {bloodGroups.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Job Details
              </Typography>
              <TextField
                InputLabelProps={{ shrink: true }}
                sx={{ width: "50%" }}
                name="employeeId"
                label="Employee ID"
                variant="standard"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                onBlur={handleBlur}
                error={!!errors.employeeId && isTouched.employeeId}
                helperText={
                  errors.employeeId && isTouched.employeeId && errors.employeeId
                }
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
                sx={{ marginTop: "20px", width: "50%" }}
                name="shiftStartTime"
                variant="standard"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                onBlur={handleBlur}
                helperText={
                  errors.startTime && isTouched.startTime
                  ? errors.startTime
                  : "Please set shift start time"
                }
               error={!!errors.startTime && isTouched.startTime}
              />
              <br />
              <TextField
                sx={{ marginTop: "20px", width: "50%" }}
                name="shiftEndTime"
                variant="standard"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                onBlur={handleBlur}
                helperText={
                  errors.endTime && isTouched.endTime
                  ? errors.endTime
                  :"Please set shift end time"
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
                variant="standard"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={handleBlur}
                error={!!errors.title && isTouched.title}
                helperText={errors.title && isTouched.title && errors.title}
              />
              <br />
              <TextField
                InputLabelProps={{ shrink: true }}
                sx={{ marginTop: "20px", width: "50%" }}
                name="designation"
                select
                variant="standard"
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
                InputLabelProps={{ shrink: true }}
                sx={{ marginTop: "20px", width: "50%" }}
                name="supervisor"
                label="Supervisor"
                InputProps={{
                  onKeyPress: handleKeyPress,
                }}
                variant="standard"
                value={supervisor}
                onChange={(e) => setSupervisor(e.target.value)}
                onBlur={handleBlur}
                error={!!errors.supervisor && isTouched.supervisor}
                helperText={
                  errors.supervisor && isTouched.supervisor && errors.supervisor
                }
              />
              <br />
              <TextField
                sx={{ marginTop: "20px", width: "50%" }}
                name="date"
                type="date"
                variant="standard"
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
                variant="standard"
              >
                {workTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
              <br />
              <TextField
                sx={{ marginTop: "20px", width: "50%" }}
                name="role"
                select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                onBlur={handleBlur}
                error={!!errors.role && isTouched.role}
                helperText={
                  errors.role && isTouched.role
                    ? errors.role
                    : "Please select the user role"
                }
                variant="standard"
              >
                {roles.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
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
                variant="standard"
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
                variant="standard"
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
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box>
              <Typography variant="h6">Emergency Details</Typography>
              <TextField
                InputLabelProps={{ shrink: true }}
                sx={{ marginTop: "20px", width: "50%" }}
                name="emergencyName"
                label="Name"
                InputProps={{
                  onKeyPress: handleKeyPress,
                }}
                variant="standard"
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
                variant="standard"
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
                onBlur={handleBlur}
                error={!!errors.relation && isTouched.relation}
                helperText={
                  errors.relation && isTouched.relation && errors.relation
                }
              />
              <br />
              <TextField
                InputLabelProps={{ shrink: true }}
                sx={{ marginTop: "20px", width: "50%" }}
                name="emergencyAddress"
                label="Address (optional)"
                variant="standard"
                multiline
                value={emergencyAddress}
                onChange={(e) => setEmergencyAddress(e.target.value)}
                // onBlur={handleBlur}
                // error={!!errors.emergencyAddress && isTouched.emergencyAddress}
                // helperText={
                //   errors.emergencyAddress &&
                //   isTouched.emergencyAddress &&
                //   errors.emergencyAddress
                // }
              />
              <br />
              <TextField
                InputLabelProps={{ shrink: true }}
                sx={{ marginTop: "20px", width: "50%" }}
                name="contact"
                type="tel"
                label="Contact"
                variant="standard"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                onBlur={handleBlur}
                onFocus={handleFocus}
                error={!!errors.contact && isTouched.contact}
                helperText={
                  errors.contact && isTouched.contact && errors.contact
                }
              />
              <Stack spacing={2} direction="row" marginTop={65}>
                <Button
                  color="error"
                  variant="contained"
                  type="submit"
                  disabled={!isValid || !isDisabled}
                  onClick={handleClick}
                >
                  Save Changes
                </Button>
                <Button
                  color="error"
                  variant="outlined"
                  onClick={() => navigate("/home/employees")}
                >
                  Cancel
                </Button>
              </Stack>
              {error && (
                <Snackbar
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  open={openToast}
                  onClose={handleToastClose}
                  autoHideDuration={3000}
                >
                  <Alert severity="error" sx={{ width: "100%" }}>
                    {error}
                  </Alert>
                </Snackbar>
              )}
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default EmployeeProfile;
