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
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import CancelIcon from "@mui/icons-material/Cancel";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
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
      value: "On-site",
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

  //State to store form field values
  const [formData, setFormData] = useState({
    file: null,
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    passport: "",
    cnic: "",
    department: "",
    employeeId: "",
    designation: "",
    title: "",
    supervisor: "",
    date: "",
    workType: "",
    role: "",
    emergencyName: "",
    relation: "",
    emergencyAddress: "",
    contact: "",
    blood: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userAdd = useSelector((state) => state.userAdd);
  const { message, loading } = userAdd;

  const [openToast, setOpenToast] = useState(true);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isTouched, setIsTouched] = useState({
    name: false,
    email: false,
    password: false,
    address: false,
    phone: false,
    passport: false,
    cnic: false,
    department: false,
    employeeId: false,
    designation: false,
    title: false,
    supervisor: false,
    date: false,
    workType: false,
    role: false,
    emergencyName: false,
    relation: false,
    emergencyAddress: false,
    contact: false,
    blood: false,
  });

  const [hasBlurred, setHasBlurred] = useState({
    password: false,
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
    setIsTouched(true);
    if (isValid) {
      dispatch(addUser(formData));
      console.log("Form Data:", formData);
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

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

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

  useEffect(() => {
    const errors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = "Please enter name";
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "Please enter email";
      isValid = false;
    }

    if (!formData.password.trim()) {
      errors.password = "Please enter password";
      isValid = false;
    } else if (formData.password.length < 8 && hasBlurred.password) {
      errors.password = "Password must be 8 characters";
      isValid = false;
    }

    if (!formData.address.trim()) {
      errors.address = "Please enter address";
      isValid = false;
    }

    if (!formData.phone.trim()) {
      errors.phone = "Please enter phone number";
      isValid = false;
    } else if (
      !/^[0-9]{4}-[0-9]{7}$/.test(formData.phone) &&
      hasBlurred.phone
    ) {
      errors.phone = "Please enter a valid number (e.g. 0312-1234567";
      isValid = false;
    }

    if (!formData.passport.trim()) {
      errors.passport = "Please enter passport number";
      isValid = false;
    } else if (
      !/^[A-Za-z0-9]+$/.test(formData.passport) &&
      hasBlurred.passport
    ) {
      errors.passport = "Please enter alphanumeric only";
      isValid = false;
    }

    if (!formData.cnic.trim()) {
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

    if (!formData.employeeId.trim()) {
      errors.employeeId = "Please enter employee ID";
      isValid = false;
    }

    if (!formData.designation.trim()) {
      errors.designation = "Please enter designation";
      isValid = false;
    }

    if (!formData.title.trim()) {
      errors.title = "Please enter title";
      isValid = false;
    }

    if (!formData.supervisor.trim()) {
      errors.supervisor = "Please enter supervisor";
      isValid = false;
    }

    if (!formData.date.trim()) {
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

    if (!formData.emergencyName.trim()) {
      errors.emergencyName = "Please enter emergency contact's name";
      isValid = false;
    }

    if (!formData.relation.trim()) {
      errors.relation = "Please enter emergency contact's relation";
      isValid = false;
    }

    if (!formData.contact.trim()) {
      errors.contact = "Please enter emergency contact";
      isValid = false;
    } else if (
      !/^[0-9]{4}-[0-9]{7}$/.test(formData.contact) &&
      hasBlurred.contact
    ) {
      errors.contact = "Please enter a valid number (e.g. 0312-1234567";
      isValid = false;
    }

    if (!formData.emergencyAddress.trim()) {
      errors.emergencyAddress = "Please enter emergency contact's address";
      isValid = false;
    }

    if (!formData.blood) {
      errors.blood = "Please enter blood group";
      isValid = false;
    }
    setIsValid(isValid);
    setErrors(errors);
  }, [formData, hasBlurred]);

  return (
    <Grid
      component="form"
      onSubmit={handleSubmit}
      container
      sx={{
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
            <IconButton color="primary" size="large">
              <PhotoCamera />
            </IconButton>
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
            sx={{ marginTop: "20px" }}
            name="name"
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
            sx={{ marginTop: "20px" }}
            name="email"
            type="email"
            label="Email"
            variant="standard"
            value={formData.email}
            onChange={handleFieldChange}
            onBlur={handleBlur}
            error={!!errors.email && isTouched.email}
            helperText={errors.email && isTouched.email && errors.email}
          />
          <br />
          <TextField
            sx={{ marginTop: "20px" }}
            name="password"
            type="password"
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
          />
          <br />
          <TextField
            sx={{ marginTop: "20px" }}
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
            sx={{ marginTop: "20px" }}
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
            sx={{ marginTop: "20px" }}
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
            sx={{ marginTop: "20px" }}
            name="passport"
            label="Passport"
            variant="standard"
            value={formData.passport}
            onChange={handleFieldChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            error={!!errors.passport && isTouched.passport}
            helperText={
              errors.passport && isTouched.passport && errors.passport
            }
          />
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Job Details
          </Typography>
          <TextField
            name="department"
            select
            value={formData.department}
            onChange={handleFieldChange}
            onBlur={handleBlur}
            error={!!errors.department && isTouched.department}
            helperText={
              errors.department && isTouched.department
                ? errors.department
                : "Please select relevant department"
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
            sx={{ marginTop: "15px" }}
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
            sx={{ marginTop: "20px" }}
            name="title"
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
            sx={{ marginTop: "20px" }}
            name="designation"
            label="Designation"
            variant="standard"
            value={formData.designation}
            onChange={handleFieldChange}
            onBlur={handleBlur}
            error={!!errors.designation && isTouched.designation}
            helperText={
              errors.designation && isTouched.designation && errors.designation
            }
          />
          <br />
          <TextField
            sx={{ marginTop: "20px" }}
            name="supervisor"
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
            sx={{ marginTop: "20px" }}
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
            sx={{ marginTop: "20px" }}
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
            sx={{ marginTop: "20px" }}
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
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box>
          <Typography variant="h6">Emergency Details</Typography>
          <TextField
            sx={{ marginTop: "20px", ml: "6px" }}
            name="emergencyName"
            label="Name"
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
            sx={{ marginTop: "20px", ml: "6px" }}
            name="relation"
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
            sx={{ marginTop: "20px", ml: "6px" }}
            name="emergencyAddress"
            label="Address"
            variant="standard"
            multiline
            value={formData.emergencyAddress}
            onChange={handleFieldChange}
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
            sx={{ marginTop: "20px" }}
            name="contact"
            type="tel"
            label="Contact Number"
            variant="standard"
            value={formData.contact}
            onChange={handleFieldChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            error={!!errors.contact && isTouched.contact}
            helperText={errors.contact && isTouched.contact && errors.contact}
          />
          <br />
          <TextField
            sx={{ marginTop: "20px" }}
            name="blood"
            select
            value={formData.blood}
            onChange={handleFieldChange}
            onBlur={handleBlur}
            error={!!errors.blood && isTouched.blood}
            helperText={
              errors.blood && isTouched.blood
                ? errors.blood
                : "Please select the blood group"
            }
            variant="standard"
          >
            {bloodGroups.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
          <Stack spacing={2} direction="row" marginTop={25}>
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
                {message}
              </Alert>
            </Snackbar>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default NewEmployee;
