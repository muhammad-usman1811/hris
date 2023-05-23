import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import CancelIcon from "@mui/icons-material/Cancel";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
// import FormHelperText from "@mui/material/FormHelperText";
// import FormControl from "@mui/material/FormControl";
// import Input from "@mui/material/Input";
import { addUser } from "../actions/userActions";

const NewEmployee = () => {
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

  const designations = [
    {
      value: "CEO",
    },
    {
      value: "Director",
    },
    {
      value: "Senior Consultant",
    },
    {
      value: "Junior Consultant",
    },
    {
      value: "Consultant",
    },
    {
      value: "Associate Consultant",
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

  const employmentStatus = [
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
  const maritalStatus = [
    {
      value: "Single",
    },
    {
      value: "Married",
    },
  ];

  //State to store form field values
  const [formData, setFormData] = useState({
    file: null,
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    passport: "",
    dob: "",
    maritalStatus: "",
    cnic: "",
    department: "",
    employeeId: "",
    designation: "",
    title: "",
    supervisor: "",
    date: "",
    workType: "",
    role: "",
    employmentStatus: "",
    salary: "",
    emergencyName: "",
    relation: "",
    emergencyAddress: "",
    contact: "",
    blood: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userAdd = useSelector((state) => state.userAdd);
  const { loading, message, error } = userAdd;

  const [showPassword, setShowPassword] = useState(false);
  const [openToast, setOpenToast] = useState(true);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [attemptedUpload, setAttemptedUpload] = useState(false);
  const [isTouched, setIsTouched] = useState({
    name: false,
    email: false,
    password: false,
    address: false,
    phone: false,
    passport: false,
    dob: false,
    maritalStatus: false,
    cnic: false,
    department: false,
    employeeId: false,
    designation: false,
    title: false,
    supervisor: false,
    date: false,
    workType: false,
    role: false,
    salary: false,
    employmentStatus: false,
    emergencyName: false,
    relation: false,
    emergencyAddress: false,
    contact: false,
    blood: false,
  });

  const [hasBlurred, setHasBlurred] = useState({
    password: false,
    email: false,
    phone: false,
    cnic: false,
    passport: false,
    contact: false,
  });

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

  //Function to handle changes to form fields
  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValid) {
      dispatch(addUser(formData));
      setErrors({});
    } else {
      return;
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length) {
      const selectedFile = Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0]),
      });
      setFormData((prev) => ({
        ...prev,
        file: selectedFile,
      }));
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png", ".jpeg"],
    },
  });

  const handleClear = () => {
    setFormData((prev) => ({
      ...prev,
      file: null,
    }));
  };

  const handleToastClose = () => {
    setOpenToast(false);
  };

  const handleClick = () => {
    setOpenToast(true);
  };

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleAttempt = () => {
    setAttemptedUpload(true);
  };

  const handleKeyPress = (event) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    const alphaRegex = /^[A-Za-z\s]+$/;

    if (!alphaRegex.test(keyValue)) {
      event.preventDefault();
    }
  };

  const calculateAge = (date) => {
    const today = new Date();
    const birthDate = new Date(date);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  useEffect(() => {
    const errors = {};
    let isValid = true;

    if (!formData.file) {
      errors.file = "Only *.jpeg and *.png images";
      isValid = false;
    }

    if (!formData.name || !formData.name.trim()) {
      errors.name = "Please enter name";
      isValid = false;
    }

    if (!formData.email || !formData.email.trim()) {
      errors.email = "Please enter email";
      isValid = false;
    } else if (!formData.email.includes("@digifloat.com") && hasBlurred.email) {
      errors.email = "Email format is incorrect";
      isValid = false;
    }

    if (!formData.password || !formData.password.trim()) {
      errors.password = "Please enter password";
      isValid = false;
    } else if (formData.password.length < 8 && hasBlurred.password) {
      errors.password = "Password must be 8 characters";
      isValid = false;
    }

    if (!formData.address || !formData.address.trim()) {
      errors.address = "Please enter address";
      isValid = false;
    }

    if (!formData.phone || !formData.phone.trim()) {
      errors.phone = "Please enter phone number";
      isValid = false;
    } else if (
      !/^[0-9]{4}-[0-9]{7}$/.test(formData.phone) &&
      hasBlurred.phone
    ) {
      errors.phone = "Please enter a valid number (e.g. 0312-1234567";
      isValid = false;
    }

    if (
      formData.passport.trim() &&
      !/^[A-Za-z0-9]+$/.test(formData.passport) &&
      hasBlurred.passport
    ) {
      errors.passport = "Please enter alphanumeric only";
      isValid = false;
    }

    if (!formData.dob) {
      errors.dob = "Please enter date of birth";
      isValid = false;
    } else if (formData.dob > new Date().toISOString().split("T")[0]) {
      errors.dob = "Future dates aren't allowed";
      isValid = false;
    } else if (calculateAge(formData.dob) < 18) {
      errors.dob = "Employee must be atleast 18 years old";
      isValid = false;
    }

    if (!formData.maritalStatus) {
      errors.maritalStatus = "Please enter marital status";
      isValid = false;
    }

    if (!formData.cnic || !formData.cnic.trim()) {
      errors.cnic = "Please enter your CNIC";
      isValid = false;
    } else if (
      !/^[0-9]{5}-[0-9]{7}-[0-9]{1}$/.test(formData.cnic) &&
      hasBlurred.cnic
    ) {
      errors.cnic = "Please enter a valid CNIC";
      isValid = false;
    }

    if (!formData.department) {
      errors.department = "Please enter department";
      isValid = false;
    }

    if (!formData.employeeId || !formData.employeeId.trim()) {
      errors.employeeId = "Please enter employee ID";
      isValid = false;
    }

    if (!formData.designation || !formData.designation.trim()) {
      errors.designation = "Please enter designation";
      isValid = false;
    }

    if (!formData.title || !formData.title.trim()) {
      errors.title = "Please enter title";
      isValid = false;
    }

    if (!formData.supervisor || !formData.supervisor.trim()) {
      errors.supervisor = "Please enter supervisor";
      isValid = false;
    }

    if (!formData.date) {
      errors.date = "Please enter date of joining";
      isValid = false;
    }

    if (!formData.workType) {
      errors.workType = "Please enter work type";
      isValid = false;
    }

    if (!formData.role) {
      errors.role = "Please specify a role";
    }

    if (!formData.salary || !formData.salary.trim()) {
      errors.salary = "Please enter salary";
      isValid = false;
    }

    if (!formData.employmentStatus) {
      errors.employmentStatus = "Please enter employment status";
      isValid = false;
    }

    if (!formData.emergencyName || !formData.emergencyName.trim()) {
      errors.emergencyName = "Please enter emergency contact's name";
      isValid = false;
    }

    if (!formData.relation || !formData.relation.trim()) {
      errors.relation = "Please enter emergency contact's relation";
      isValid = false;
    }

    if (!formData.contact || !formData.contact.trim()) {
      errors.contact = "Please enter emergency contact";
      isValid = false;
    } else if (
      !/^[0-9]{4}-[0-9]{7}$/.test(formData.contact) &&
      hasBlurred.contact
    ) {
      errors.contact = "Please enter a valid number (e.g. 0312-1234567";
      isValid = false;
    }

    // if (!formData.emergencyAddress || !formData.emergencyAddress.trim()) {
    //   errors.emergencyAddress = "Please enter emergency contact's address";
    //   isValid = false;
    // }

    // if (!formData.blood) {
    //   errors.blood = "Please enter blood group";
    //   isValid = false;
    // }
    setIsValid(isValid);
    setErrors(errors);
  }, [formData, hasBlurred]);

  return (
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
        marginLeft: "256px",
        backgroundColor: "#eaeff1",
        padding: "32px",
        minHeight: "calc(100vh - 67px)",
        position: "relative",
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
          {formData.file ? (
            <>
              <img
                src={formData.file.preview}
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
              {!!errors.file && attemptedUpload && (
                <Typography color="error" variant="body2">
                  {errors.file}
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
            sx={{ marginTop: "20px", width: "50%" }}
            name="name"
            type="text"
            InputProps={{
              onKeyPress: handleKeyPress,
            }}
            label="Full Name"
            variant="standard"
            value={formData.name}
            onChange={handleFieldChange}
            onBlur={handleBlur}
            error={!!errors.name && isTouched.name}
            helperText={errors.name && isTouched.name && errors.name}
          />
          <br />
          <TextField
            sx={{ marginTop: "20px", width: "50%" }}
            name="email"
            type="email"
            label="Email"
            variant="standard"
            value={formData.email}
            onChange={handleFieldChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            error={!!errors.email && isTouched.email}
            helperText={errors.email && isTouched.email && errors.email}
          />
          <br />
          <TextField
            sx={{ marginTop: "20px", width: "50%" }}
            name="password"
            type={showPassword ? "text" : "password"}
            label="Password"
            variant="standard"
            value={formData.password}
            onChange={handleFieldChange}
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
            sx={{ marginTop: "20px", width: "50%" }}
            name="phone"
            type="tel"
            label="Phone Number"
            variant="standard"
            value={formData.phone}
            onChange={handleFieldChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            error={!!errors.phone && isTouched.phone}
            helperText={errors.phone && isTouched.phone && errors.phone}
          />
          <br />
          <TextField
            sx={{ marginTop: "20px", width: "50%" }}
            name="address"
            label="Address"
            variant="standard"
            multiline
            value={formData.address}
            onChange={handleFieldChange}
            onBlur={handleBlur}
            error={!!errors.address && isTouched.address}
            helperText={errors.address && isTouched.address && errors.address}
          />
          <br />
          <TextField
            sx={{ marginTop: "20px", width: "50%" }}
            name="cnic"
            label="CNIC"
            variant="standard"
            value={formData.cnic}
            onChange={handleFieldChange}
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
            value={formData.dob}
            onChange={handleFieldChange}
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
            value={formData.maritalStatus}
            onChange={handleFieldChange}
            onBlur={handleBlur}
            error={!!errors.maritalStatus && isTouched.maritalStatus}
            helperText={
              errors.maritalStatus && isTouched.maritalStatus
                ? errors.maritalStatus
                : "Please select marital status"
            }
            variant="standard"
          >
            {maritalStatus.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
          <br />
          <TextField
            sx={{ marginTop: "20px", width: "50%" }}
            name="passport"
            label="Passport (optional)"
            variant="standard"
            value={formData.passport}
            onChange={handleFieldChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            error={errors.passport}
            helperText={errors.passport && errors.passport}
          />
          <br />
          <TextField
            sx={{ marginTop: "20px", width: "50%" }}
            name="blood"
            select
            value={formData.blood}
            onChange={handleFieldChange}
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
            sx={{ width: "50%" }}
            name="employeeId"
            label="Employee ID"
            variant="standard"
            value={formData.employeeId}
            onChange={handleFieldChange}
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
            value={formData.department}
            onChange={handleFieldChange}
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
            name="title"
            InputProps={{
              onKeyPress: handleKeyPress,
            }}
            label="Title"
            variant="standard"
            value={formData.title}
            onChange={handleFieldChange}
            onBlur={handleBlur}
            error={!!errors.title && isTouched.title}
            helperText={errors.title && isTouched.title && errors.title}
          />
          <br />
          <TextField
            sx={{ marginTop: "20px", width: "50%" }}
            name="designation"
            select
            variant="standard"
            value={formData.designation}
            onChange={handleFieldChange}
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
            name="supervisor"
            InputProps={{
              onKeyPress: handleKeyPress,
            }}
            label="Supervisor"
            variant="standard"
            value={formData.supervisor}
            onChange={handleFieldChange}
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
            value={formData.date}
            onChange={handleFieldChange}
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
            value={formData.workType}
            onChange={handleFieldChange}
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
            value={formData.role}
            onChange={handleFieldChange}
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
            value={formData.employmentStatus}
            onChange={handleFieldChange}
            onBlur={handleBlur}
            error={!!errors.employmentStatus && isTouched.employmentStatus}
            helperText={
              errors.employmentStatus && isTouched.employmentStatus
                ? errors.employmentStatus
                : "Please select employment status"
            }
            variant="standard"
          >
            {employmentStatus.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
          <br />
          <TextField
            sx={{ marginTop: "20px", width: "50%" }}
            type="number"
            name="salary"
            label="Salary"
            variant="standard"
            InputProps={{
              endAdornment: <InputAdornment position="end">PKR</InputAdornment>,
            }}
            value={formData.salary}
            onChange={handleFieldChange}
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
            sx={{ marginTop: "20px", width: "50%" }}
            name="emergencyName"
            label="Name"
            InputProps={{
              onKeyPress: handleKeyPress,
            }}
            variant="standard"
            value={formData.emergencyName}
            onChange={handleFieldChange}
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
            sx={{ marginTop: "20px", width: "50%" }}
            name="relation"
            InputProps={{
              onKeyPress: handleKeyPress,
            }}
            label="Relation"
            variant="standard"
            value={formData.relation}
            onChange={handleFieldChange}
            onBlur={handleBlur}
            error={!!errors.relation && isTouched.relation}
            helperText={
              errors.relation && isTouched.relation && errors.relation
            }
          />
          <br />
          <TextField
            sx={{ marginTop: "20px", width: "50%" }}
            name="emergencyAddress"
            label="Address (optional)"
            variant="standard"
            multiline
            value={formData.emergencyAddress}
            onChange={handleFieldChange}
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
            sx={{ marginTop: "20px", width: "50%" }}
            name="contact"
            type="tel"
            label="Contact"
            variant="standard"
            value={formData.contact}
            onChange={handleFieldChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            error={!!errors.contact && isTouched.contact}
            helperText={errors.contact && isTouched.contact && errors.contact}
          />
          <Stack spacing={2} direction="row" marginTop={65}>
            <LoadingButton
              loading={loading}
              color="error"
              variant="contained"
              type="submit"
              disabled={!isValid}
              onClick={handleClick}
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
          {message && (
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              open={openToast}
              onClose={handleToastClose}
              autoHideDuration={3000}
            >
              <Alert severity="success" sx={{ width: "100%" }}>
                {message.message}
              </Alert>
            </Snackbar>
          )}
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
  );
};

export default NewEmployee;
