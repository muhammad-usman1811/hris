import React, { useState, useCallback, useEffect } from "react";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useDispatch } from "react-redux";
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
// import Alert from "@mui/material/Alert";
// import Snackbar from "@mui/material/Snackbar";
import CancelIcon from "@mui/icons-material/Cancel";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Checkbox from "@mui/material/Checkbox";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
//import DeleteIcon from "@mui/icons-material/Delete";
// import FormHelperText from "@mui/material/FormHelperText";
// import FormControl from "@mui/material/FormControl";
// import Input from "@mui/material/Input";
import { addUser } from "../actions/userActions";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";

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

const NewEmployee = () => {
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
      value: "Intern",
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

  const clients = [
    {
      value: "AP - SAGE",
    },
    {
      value: "ATOS",
    },
    {
      value: "Digifloat Internal",
    },
    {
      value: "EXADIVE",
    },
    {
      value: "HSO",
    },
    {
      value: "KEYRUS BELGIUM",
    },
    {
      value: "KEYRUS SINGAPORE",
    },
    {
      value: "KEYRUS UAE",
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

  const billableHourOptions = [
    {
      value: "N/A",
    },
    {
      value: "1",
    },
    {
      value: "1.5",
    },
    {
      value: "2",
    },
    {
      value: "2.5",
    },
    {
      value: "3",
    },
    {
      value: "3.5",
    },
    {
      value: "4",
    },
    {
      value: "4.5",
    },
    {
      value: "5",
    },
    {
      value: "5.5",
    },
    {
      value: "6",
    },
    {
      value: "6.5",
    },
    {
      value: "7",
    },
    {
      value: "7.5",
    },
    {
      value: "8",
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

  const benefitOptions = [{ value: "Eligible" }, { value: "Not Eligible" }];

  //State to store form field values
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    file: null,
    name: "",
    email: "",
    personalEmail: "",
    password: "",
    address: "",
    phone: "",
    passport: "",
    dob: "",
    maritalStatus: "",
    gender: "",
    cnic: "",
    department: "",
    shiftStartTime: "",
    shiftEndTime: "",
    customDepartmentOption: "",
    customDesignationOption: "",
    customClientOption: "",
    customProjectOption: "",
    customFuelOption: "",
    employeeId: "",
    designation: "",
    engagementManager: "",
    permanentDate: "",
    reportingDepartment: "",
    reportingOffice: "",
    client: "",
    projectName: "",
    projectType: "",
    projectRole: "",
    region: "",
    projectStartDate: "",
    billableHours: "",
    projectEndDate: "",
    degree: "",
    institute: "",
    degreeStartDate: "",
    degreeEndDate: "",
    title: "",
    supervisor: "",
    date: "",
    workType: "",
    role: [],
    employmentStatus: "",
    salary: "",
    emergencyName: "",
    relation: "",
    emergencyAddress: "",
    contact: "",
    blood: "",
    fuel: "",
    medicalAllowance: "",
    providentFund: "",
    empOfQuarter: "",
    paidCertifications: "",
    annualBonus: "",
    paidTimeOff: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const userAdd = useSelector((state) => state.userAdd);
  // const { loading, message, error } = userAdd;

  const [showPassword, setShowPassword] = useState(false);
  // const [openToast, setOpenToast] = useState(true);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [attemptedUpload, setAttemptedUpload] = useState(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [isTouched, setIsTouched] = useState({
    name: false,
    email: false,
    personalEmail: false,
    password: false,
    address: false,
    phone: false,
    passport: false,
    dob: false,
    maritalStatus: false,
    gender: false,
    cnic: false,
    department: false,
    shiftStartTime: false,
    shiftEndTime: false,
    employeeId: false,
    designation: false,
    engagementManager: false,
    permanentDate: false,
    reportingDepartment: false,
    reportingOffice: false,
    client: false,
    projectName: false,
    projectType: false,
    projectRole: false,
    region: false,
    projectStartDate: false,
    billableHours: false,
    //projectEndDate: false,
    degree: false,
    institute: false,
    degreeStartDate: false,
    degreeEndDate: false,
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
    fuel: false,
    medicalAllowance: false,
    providentFund: false,
    empOfQuarter: false,
    paidCertifications: false,
    annualBonus: false,
    paidTimeOff: false,
  });

  const [hasBlurred, setHasBlurred] = useState({
    password: false,
    email: false,
    phone: false,
    cnic: false,
    passport: false,
    contact: false,
  });

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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

  //Handle role change
  const handleRoleChange = (event, selectedRoles) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      role: selectedRoles,
    }));
  };

  //Hanlde dynamic dependency of projects based on client
  const getProjectOptions = (client) => {
    if (client === "Digifloat Internal") {
      return [
        "Yorktel",
        "Training - Interns",
        "Trainee",
        "Sourcing Solutions",
        "RMI",
        "Proposal",
        "Outsourcing",
        "Management",
        "Leave",
        "IT and Networks",
        "HR",
        "General",
        "DMX",
        "Business Development",
        "Boltwire",
        "Blogs",
      ];
    } else if (client === "AP - SAGE") {
      return ["AP - Sage"];
    } else if (client === "ATOS") {
      return ["NBB"];
    } else if (client === "EXADIVE") {
      return ["Ahold delhaize"];
    } else if (client === "HSO") {
      return [
        "Warburg",
        "Zenus",
        "Mavis",
        "Yorktel",
        "EFI",
        "Godiva",
        "Sonesta",
      ];
    } else if (client === "KEYRUS BELGIUM") {
      return ["Aliaxis", "Atlas Copco", "Borealis"];
    } else if (client === "KEYRUS SINGAPORE") {
      return ["BD", "JnJ"];
    } else if (client === "KEYRUS UAE") {
      return ["MAFP"];
    } else {
      return [];
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    border: "2px solid #E23D3F",
    boxShadow: 24,
    p: 4,
  };

  //State for handling fuel options
  const customFuelFromLocalStorage = JSON.parse(
    localStorage.getItem("customFuelOptions")
  );

  const [customFuelOptions, setCustomFuelOptions] = useState([
    ...fuelOptions,
    ...(customFuelFromLocalStorage || []),
  ]);

  //State for handling project options and its custom options
  const [customProjectOptions, setCustomProjectOptions] = useState(
    JSON.parse(localStorage.getItem("customProjectOptions")) || []
  );

  //Dynamic project options
  const projectOptions = [
    ...getProjectOptions(formData.client),
    ...customProjectOptions
      .filter((option) => option.client === formData.client)
      .map((option) => option.value),
  ];

  //State for handling client options and its custom options
  const customClientFromLocalStorage = JSON.parse(
    localStorage.getItem("customClientOptions")
  );

  const [clientOptions, setClientOptions] = useState([
    ...clients,
    ...(customClientFromLocalStorage || []),
  ]);

  //State for handling designation options and its custom options
  const customDesignationsFromLocalStorage = JSON.parse(
    localStorage.getItem("customDesignationOptions")
  );
  const [designationOptions, setDesignationOptions] = useState([
    ...designations,
    ...(customDesignationsFromLocalStorage || []),
  ]);

  //State for handling department options and its custom options
  const customDepartmentsFromLocalStorage = JSON.parse(
    localStorage.getItem("customDepartmentOptions")
  );
  const [departmentOptions, setDepartmentOptions] = useState([
    ...departments,
    ...(customDepartmentsFromLocalStorage || []),
  ]);

  const handleAddFuelOption = () => {
    if (formData.customFuelOption) {
      const newOption = { value: formData.customFuelOption };
      setCustomFuelOptions([...customFuelOptions, newOption]);
      setFormData((prevFormData) => ({
        ...prevFormData,
        fuel: formData.customFuelOption,
        customFuelOption: "",
      }));

      const existingOptions =
        JSON.parse(localStorage.getItem("customFuelOptions")) || [];
      const updatedOptions = [...existingOptions, newOption];
      localStorage.setItem("customFuelOptions", JSON.stringify(updatedOptions));
    }
  };

  const handleAddProjectOption = () => {
    if (formData.client && formData.customProjectOption) {
      const newOption = {
        client: formData.client,
        value: formData.customProjectOption,
      };
      setCustomProjectOptions([...customProjectOptions, newOption]);
      setFormData((prevFormData) => ({
        ...prevFormData,
        projectName: formData.customProjectOption,
        customProjectOption: "",
      }));

      const existingOptions =
        JSON.parse(localStorage.getItem("customProjectOptions")) || [];

      const updatedOptions = [...existingOptions, newOption];
      localStorage.setItem(
        "customProjectOptions",
        JSON.stringify(updatedOptions)
      );
    }
  };

  const handleAddClientOption = () => {
    if (formData.customClientOption) {
      const newOption = { value: formData.customClientOption };
      setClientOptions([...clientOptions, newOption]);
      setFormData((prevFormData) => ({
        ...prevFormData,
        client: formData.customClientOption,
        customClientOption: "",
      }));

      const existingOptions =
        JSON.parse(localStorage.getItem("customClientOptions")) || [];
      const updatedOptions = [...existingOptions, newOption];
      localStorage.setItem(
        "customClientOptions",
        JSON.stringify(updatedOptions)
      );
    }
  };

  const handleAddDesignationOption = () => {
    if (formData.customDesignationOption) {
      const newOption = { value: formData.customDesignationOption };
      setDesignationOptions([...designationOptions, newOption]);
      setFormData((prevFormData) => ({
        ...prevFormData,
        designation: formData.customDesignationOption,
        customDesignationOption: "",
      }));

      //Retrieve existing custom options from local storage
      const existingOptions =
        JSON.parse(localStorage.getItem("customDesignationOptions")) || [];

      //Add new option to existing options
      const updatedOptions = [...existingOptions, newOption];

      //Store the updated options array in local storage
      localStorage.setItem(
        "customDesignationOptions",
        JSON.stringify(updatedOptions)
      );
    }
  };

  const handleAddDepartmentOption = () => {
    if (formData.customDepartmentOption) {
      const newOption = { value: formData.customDepartmentOption };
      setDepartmentOptions([...departmentOptions, newOption]);
      setFormData((prevFormData) => ({
        ...prevFormData,
        department: formData.customDepartmentOption,
        customDepartmentOption: "",
      }));

      //Retrieve existing custom options from local storage
      const existingOptions =
        JSON.parse(localStorage.getItem("customDepartmentOptions")) || [];

      //Add new option to existing options
      const updatedOptions = [...existingOptions, newOption];

      //Store the updated options array in local storage
      localStorage.setItem(
        "customDepartmentOptions",
        JSON.stringify(updatedOptions)
      );
    }
  };

  //Function to handle changes to form fields
  const handleFieldChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
  };

  const handleAddProject = () => {
    const newProject = {
      client: formData.client,
      projectName: formData.projectName,
      projectRole: formData.projectRole,
      projectType: formData.projectType,
      billableHours: formData.billableHours,
      region: formData.region,
      startDate: formData.projectStartDate,
      endDate: formData.projectEndDate,
    };
    setProjects([...projects, newProject]);
    setOpen(false);
    setErrors((prevErrors) => ({
      ...prevErrors,
      client: null,
      projectName: null,
      projectRole: null,
      projectType: null,
      billableHours: null,
      region: null,
      projectStartDate: null,
      projectEndDate: null,
    }));
  };

  const handleEmployeeIdChange = (e) => {
    let value = e.target.value;

    // Remove any non-digit characters from the input
    value = value.replace(/\D/g, "");

    // Limit the input to three digits
    value = value.slice(0, 3);

    setFormData((prevFormData) => ({
      ...prevFormData,
      employeeId: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValid) {
      dispatch(addUser(formData, projects));
      setErrors({});
      navigate("/home/employees");
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
      "image/png": [".png", ".jpeg", ".jpg"],
    },
  });

  const handleClear = () => {
    setFormData((prev) => ({
      ...prev,
      file: null,
    }));
  };

  // const handleToastClose = () => {
  //   setOpenToast(false);
  // };

  // const handleClick = () => {
  //   setOpenToast(true);
  // };

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
      errors.file = "Only .jpeg/jpg and .png images";
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

    if (!formData.personalEmail || !formData.personalEmail.trim()) {
      errors.personalEmail = "Please enter your personal email";
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

    if (!formData.gender) {
      errors.gender = "Please select gender";
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

    if (!formData.shiftStartTime) {
      errors.shiftStartTime = "Please set shift start time";
      isValid = false;
    }

    if (!formData.shiftEndTime) {
      errors.shiftEndTime = "Please set shift end time";
      isValid = false;
    }

    if (!formData.employeeId) {
      errors.employeeId = "Employee ID must be a 3-digit number";
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

    if (!formData.role || formData.role.length === 0) {
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

    if (!formData.engagementManager) {
      errors.engagementManager = "Please enter engagement manager";
      isValid = false;
    }

    // if (!formData.reportingDepartment) {
    //   errors.reportingDepartment = "Please select reporting department";
    //   isValid = false;
    // }

    if (!formData.reportingOffice) {
      errors.reportingOffice = "Please select reporting office";
      isValid = false;
    }

    if (!formData.permanentDate) {
      errors.permanentDate = "Please set date of permanent employment";
      isValid = false;
    }

    if (!formData.client && projects.length === 0) {
      errors.client = "Please select client";
      isValid = false;
    }

    if (!formData.projectName && projects.length === 0) {
      errors.projectName = "Please select project";
      isValid = false;
    }

    if (!formData.projectRole && projects.length === 0) {
      errors.projectRole = "Please select project role";
      isValid = false;
    }

    if (!formData.projectType && projects.length === 0) {
      errors.projectType = "Please select project type";
      isValid = false;
    }

    if (!formData.billableHours && projects.length === 0) {
      errors.billableHours = "Please select billable hours";
      isValid = false;
    }

    if (!formData.region && projects.length === 0) {
      errors.region = "Please set region";
      isValid = false;
    }

    if (!formData.projectStartDate && projects.length === 0) {
      errors.projectStartDate = "Please select project start date";
      isValid = false;
    }

    // if (!formData.projectEndDate) {
    //   errors.projectEndDate = "Please select project end date";
    //   isValid = false;
    // }

    if (!formData.degree.trim()) {
      errors.degree = "Please enter degree";
      isValid = false;
    }

    if (!formData.degreeStartDate) {
      errors.degreeStartDate = "Please select degree start date";
      isValid = false;
    }

    if (!formData.degreeEndDate) {
      errors.degreeEndDate = "Please select degree end date";
      isValid = false;
    }

    if (!formData.institute.trim()) {
      errors.institute = "Please enter institute";
      isValid = false;
    }

    if (!formData.fuel) {
      errors.fuel = "Please select fuel";
      isValid = false;
    }

    if (!formData.medicalAllowance) {
      errors.medicalAllowance = "Please select any option";
      isValid = false;
    }

    if (!formData.providentFund) {
      errors.providentFund = "Please select any option";
      isValid = false;
    }

    if (!formData.paidCertifications) {
      errors.paidCertifications = "Please select any option";
      isValid = false;
    }

    if (!formData.empOfQuarter) {
      errors.empOfQuarter = "Please select any option";
      isValid = false;
    }

    if (!formData.annualBonus) {
      errors.annualBonus = "Please select any option";
      isValid = false;
    }

    if (!formData.paidTimeOff) {
      errors.paidTimeOff = "Please select any option";
      isValid = false;
    }

    setIsValid(isValid);
    setErrors(errors);
  }, [formData, hasBlurred, projects]);

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
            {formData.file ? (
              <div style={{ position: "relative" }}>
                <img
                  src={formData.file.preview}
                  alt="Profile"
                  loading="lazy"
                  style={{
                    height: 180,
                    width: 180,
                    borderRadius: "50%",
                    border: "5px solid #fff",
                  }}
                />
                <IconButton
                  aria-label="cancel"
                  onClick={handleClear}
                  style={{
                    position: "absolute",
                    top: 2,
                    right: 2,
                    backgroundColor: "white",
                    boxShadow: "0px 0px 3px rgba(0,0,0,0.3)",
                  }}
                >
                  <CancelIcon />
                </IconButton>
              </div>
            ) : (
              <Box
                sx={{
                  width: 180,
                  height: 180,
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
                {!!errors.file && attemptedUpload && (
                  <Typography color="error" variant="body2">
                    {errors.file}
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
                disabled={!isValid}
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
      <Box sx={{ ml: 40 }}>
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
            <Grid item xs={6}>
              <TextField
                InputLabelProps={{ shrink: true }}
                sx={{ marginTop: "20px", width: "50%" }}
                name="name"
                InputProps={{
                  onKeyPress: handleKeyPress,
                }}
                label="Full Name"
                required
                value={formData.name}
                onChange={handleFieldChange}
                onBlur={handleBlur}
                error={!!errors.name && isTouched.name}
                helperText={errors.name && isTouched.name && errors.name}
              />
              <br />
              <TextField
                InputLabelProps={{ shrink: true }}
                required
                sx={{ marginTop: "20px", width: "50%" }}
                name="personalEmail"
                type="email"
                label="Personal Email"
                value={formData.personalEmail}
                onChange={handleFieldChange}
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
                required
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
                InputLabelProps={{ shrink: true }}
                sx={{ marginTop: "20px", width: "50%" }}
                name="phone"
                type="tel"
                label="Phone Number"
                required
                value={formData.phone}
                onChange={handleFieldChange}
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
                required
                multiline
                value={formData.address}
                onChange={handleFieldChange}
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
                required
                value={formData.cnic}
                onChange={handleFieldChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                error={!!errors.cnic && isTouched.cnic}
                helperText={errors.cnic && isTouched.cnic && errors.cnic}
              />
              <br />
            </Grid>
            <Grid item xs={6}>
              <TextField
                sx={{ marginTop: "20px", width: "50%" }}
                name="dob"
                required
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
                value={formData.gender}
                onChange={handleFieldChange}
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
                value={formData.passport}
                onChange={handleFieldChange}
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
                value={formData.blood}
                onChange={handleFieldChange}
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
                required
                label="Employee ID"
                value={formData.employeeId}
                onChange={handleEmployeeIdChange}
                onBlur={handleBlur}
                error={!!errors.employeeId && isTouched.employeeId}
                helperText={
                  errors.employeeId && isTouched.employeeId && errors.employeeId
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
                required
                sx={{ marginTop: "20px", width: "50%" }}
                name="email"
                type="email"
                label="Email"
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
              >
                {departmentOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
                <MenuItem value="addCustom">Add Custom</MenuItem>
              </TextField>
              {formData.department === "addCustom" && (
                <>
                  <br />
                  <TextField
                    sx={{ width: "40%" }}
                    name="customDepartmentOption"
                    variant="standard"
                    value={formData.customDepartmentOption}
                    onChange={handleFieldChange}
                  />
                  <Button onClick={handleAddDepartmentOption}>Add</Button>
                </>
              )}
              <br />
              <TextField
                sx={{ marginTop: "20px", width: "50%" }}
                name="shiftStartTime"
                type="time"
                value={formData.shiftStartTime}
                onChange={handleFieldChange}
                onBlur={handleBlur}
                error={!!errors.shiftStartTime && isTouched.shiftStartTime}
                helperText={
                  errors.shiftStartTime && isTouched.shiftStartTime
                    ? errors.shiftStartTime
                    : "Please set shift start time"
                }
              />
              <br />
              <TextField
                sx={{ marginTop: "20px", width: "50%" }}
                name="shiftEndTime"
                type="time"
                value={formData.shiftEndTime}
                onChange={handleFieldChange}
                onBlur={handleBlur}
                error={!!errors.shiftEndTime && isTouched.shiftEndTime}
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
                required
                value={formData.title}
                onChange={handleFieldChange}
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
                required
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
                {designationOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
                <MenuItem value="addCustom">Add Custom</MenuItem>
              </TextField>
              {formData.designation === "addCustom" && (
                <>
                  <br />
                  <TextField
                    name="customDesignationOption"
                    sx={{ width: "40%" }}
                    value={formData.customDesignationOption}
                    onChange={handleFieldChange}
                    variant="standard"
                  />
                  <Button onClick={handleAddDesignationOption}>Add</Button>
                </>
              )}
              <br />
              <TextField
                sx={{ marginTop: "20px", width: "50%" }}
                name="reportingOffice"
                select
                value={formData.reportingOffice}
                onChange={handleFieldChange}
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
                value={formData.reportingDepartment}
                onChange={handleFieldChange}
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
                name="supervisor"
                label="Line Manager"
                InputProps={{
                  onKeyPress: handleKeyPress,
                }}
                required
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
                InputLabelProps={{ shrink: true }}
                sx={{ marginTop: "20px", width: "50%" }}
                name="engagementManager"
                label="Engagement Manager"
                required
                InputProps={{
                  onKeyPress: handleKeyPress,
                }}
                value={formData.engagementManager}
                onChange={handleFieldChange}
                onBlur={handleBlur}
                error={
                  !!errors.engagementManager && isTouched.engagementManager
                }
                helperText={
                  errors.engagementManager &&
                  isTouched.engagementManager &&
                  errors.engagementManager
                }
              />
              <br />
              <TextField
                sx={{ marginTop: "20px", width: "50%" }}
                name="date"
                type="date"
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
                name="permanentDate"
                type="date"
                value={formData.permanentDate}
                onChange={handleFieldChange}
                onBlur={handleBlur}
                error={!!errors.permanentDate && isTouched.permanentDate}
                helperText={
                  errors.permanentDate && isTouched.permanentDate
                    ? errors.permanentDate
                    : "Date of permanent employment"
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
                value={roles.filter((role) => formData.role.includes(role))}
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
                value={formData.employmentStatus}
                onChange={handleFieldChange}
                onBlur={handleBlur}
                error={!!errors.employmentStatus && isTouched.employmentStatus}
                helperText={
                  errors.employmentStatus && isTouched.employmentStatus
                    ? errors.employmentStatus
                    : "Please select employment status"
                }
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
                InputLabelProps={{ shrink: true }}
                name="salary"
                type="number"
                label="Salary"
                required
                // variant="standard"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">PKR</InputAdornment>
                  ),
                }}
                value={formData.salary}
                onChange={handleFieldChange}
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
                required
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
                InputLabelProps={{ shrink: true }}
                sx={{ marginTop: "20px", width: "50%" }}
                name="relation"
                label="Relation"
                InputProps={{
                  onKeyPress: handleKeyPress,
                }}
                required
                value={formData.relation}
                onChange={handleFieldChange}
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
                InputLabelProps={{ shrink: true }}
                sx={{ marginTop: "20px", width: "50%" }}
                name="contact"
                type="tel"
                label="Contact"
                required
                value={formData.contact}
                onChange={handleFieldChange}
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
                value={formData.fuel}
                onChange={handleFieldChange}
                onBlur={handleBlur}
                error={!!errors.fuel && isTouched.fuel}
                helperText={errors.fuel && isTouched.fuel && errors.fuel}
              >
                {customFuelOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
                <MenuItem value="addCustom">Add Custom</MenuItem>
              </TextField>
              {formData.fuel === "addCustom" && (
                <>
                  <br />
                  <TextField
                    sx={{ width: "40%" }}
                    name="customFuelOption"
                    variant="standard"
                    value={formData.customFuelOption}
                    onChange={handleFieldChange}
                  />
                  <Button onClick={handleAddFuelOption}>Add</Button>
                </>
              )}
              <br />
              <TextField
                InputLabelProps={{ shrink: true }}
                sx={{ marginTop: "20px", width: "50%" }}
                name="medicalAllowance"
                label="Medical Allowance"
                select
                value={formData.medicalAllowance}
                onChange={handleFieldChange}
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
                value={formData.providentFund}
                onChange={handleFieldChange}
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
                value={formData.empOfQuarter}
                onChange={handleFieldChange}
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
                value={formData.paidCertifications}
                onChange={handleFieldChange}
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
                value={formData.annualBonus}
                onChange={handleFieldChange}
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
                value={formData.paidTimeOff}
                onChange={handleFieldChange}
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
                InputLabelProps={{ shrink: true }}
                sx={{ marginTop: "20px", width: "50%" }}
                name="degree"
                label="Degree"
                required
                value={formData.degree}
                onChange={handleFieldChange}
                onBlur={handleBlur}
                error={!!errors.degree && isTouched.degree}
                helperText={errors.degree && isTouched.degree && errors.degree}
              />
              <br />
              <TextField
                InputLabelProps={{ shrink: true }}
                sx={{ marginTop: "20px", width: "50%" }}
                name="institute"
                label="Institute"
                InputProps={{
                  onKeyPress: handleKeyPress,
                }}
                required
                value={formData.institute}
                onChange={handleFieldChange}
                onBlur={handleBlur}
                error={!!errors.institute && isTouched.institute}
                helperText={
                  errors.institute && isTouched.institute && errors.institute
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
                value={formData.degreeStartDate}
                onChange={handleFieldChange}
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
                value={formData.degreeEndDate}
                onChange={handleFieldChange}
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
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleOpen} startIcon={<AddIcon />}>
              Add Project
            </Button>
          </Box>
          <Grid container spacing={1} xs={12}>
            {projects.length !== 0 &&
              projects.map((project, index) => {
                return (
                  <>
                    <Grid xs={6}>
                      <Typography
                        variant="h6"
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
                    <Grid xs={6} marginTop="45px">
                      <TextField
                        sx={{ marginTop: "20px", width: "50%" }}
                        name="projectName"
                        value={project.projectName}
                        onChange={handleFieldChange}
                        onBlur={handleBlur}
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
                        // variant="standard"
                        value={project.billableHours}
                      />
                      <br />
                      <TextField
                        InputLabelProps={{ shrink: true }}
                        sx={{ marginTop: "20px", width: "50%" }}
                        name="projectEndDate"
                        label="Ending Date (optional)"
                        type="date"
                        // variant="standard"
                        value={project.endDate}
                      />
                      <br />
                    </Grid>
                  </>
                );
              })}
            <Modal open={open} onClose={handleClose}>
              <Box sx={style}>
                <Grid container spacing={1} xs={12}>
                  <Grid xs={6}>
                    <TextField
                      sx={{ marginTop: "20px", width: "70%" }}
                      name="client"
                      multiple
                      required
                      select
                      error={
                        !!errors.client && isTouched.client && errors.client
                      }
                      value={formData.client}
                      onChange={handleFieldChange}
                      onBlur={handleBlur}
                      helperText={
                        errors.client && isTouched.client
                          ? errors.client
                          : "Please select client"
                      }
                    >
                      {clientOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.value}
                        </MenuItem>
                      ))}
                      <MenuItem value="addCustom">Add Custom</MenuItem>
                    </TextField>
                    {formData.client === "addCustom" && (
                      <>
                        <br />
                        <TextField
                          sx={{ width: "40%" }}
                          name="customClientOption"
                          variant="standard"
                          value={formData.customClientOption}
                          onChange={handleFieldChange}
                        />
                        <Button onClick={handleAddClientOption}>Add</Button>
                      </>
                    )}
                    <br />
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      sx={{ marginTop: "20px", width: "70%" }}
                      name="projectType"
                      label="Project Type"
                      required
                      value={formData.projectType}
                      onChange={handleFieldChange}
                      onBlur={handleBlur}
                      onFocus={handleFocus}
                      error={!!errors.projectType && isTouched.projectType}
                      helperText={
                        errors.projectType &&
                        isTouched.projectType &&
                        errors.projectType
                      }
                    />
                    <br />
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      sx={{ marginTop: "20px", width: "70%" }}
                      name="projectRole"
                      label="Project Role"
                      required
                      value={formData.projectRole}
                      onChange={handleFieldChange}
                      onBlur={handleBlur}
                      onFocus={handleFocus}
                      error={!!errors.projectRole && isTouched.projectRole}
                      helperText={
                        errors.projectRole &&
                        isTouched.projectRole &&
                        errors.projectRole
                      }
                    />
                    <br />
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      sx={{ marginTop: "20px", width: "70%" }}
                      name="region"
                      label="Region"
                      required
                      value={formData.region}
                      onChange={handleFieldChange}
                      onBlur={handleBlur}
                      onFocus={handleFocus}
                      error={!!errors.region && isTouched.region}
                      helperText={
                        errors.region && isTouched.region && errors.region
                      }
                    />
                    <br />
                  </Grid>
                  <Grid xs={6}>
                    <TextField
                      sx={{ marginTop: "20px", width: "70%", ml: 14 }}
                      name="projectName"
                      required
                      select
                      error={
                        !!errors.project && isTouched.project && errors.project
                      }
                      value={formData.projectName}
                      onChange={handleFieldChange}
                      onBlur={handleBlur}
                      helperText={
                        errors.projectName && isTouched.projectName
                          ? errors.projectName
                          : "Please select project"
                      }
                    >
                      {projectOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                      <MenuItem value="addCustom">Add Custom</MenuItem>
                    </TextField>

                    {formData.projectName === "addCustom" && (
                      <>
                        <br />
                        <TextField
                          sx={{ width: "40%" }}
                          name="customProjectOption"
                          variant="standard"
                          value={formData.customProjectOption}
                          onChange={handleFieldChange}
                        />
                        <Button onClick={handleAddProjectOption}>Add</Button>
                      </>
                    )}
                    <br />
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      sx={{ marginTop: "20px", width: "70%", ml: 14 }}
                      name="projectStartDate"
                      label="Starting Date"
                      type="date"
                      required
                      value={formData.projectStartDate}
                      onChange={handleFieldChange}
                      onBlur={handleBlur}
                      onFocus={handleFocus}
                      error={
                        !!errors.projectStartDate && isTouched.projectStartDate
                      }
                      helperText={
                        errors.projectStartDate &&
                        isTouched.projectStartDate &&
                        errors.projectStartDate
                      }
                    />
                    <br />
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      sx={{ marginTop: "20px", width: "70%", ml: 14 }}
                      name="billableHours"
                      label="Billable Hours"
                      select
                      // variant="standard"
                      value={formData.billableHours}
                      onChange={handleFieldChange}
                      onBlur={handleBlur}
                      onFocus={handleFocus}
                      error={!!errors.billableHours && isTouched.billableHours}
                      helperText={
                        errors.billableHours &&
                        isTouched.billableHours &&
                        errors.billableHours
                      }
                    >
                      {billableHourOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.value}
                        </MenuItem>
                      ))}
                    </TextField>
                    <br />
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      sx={{ marginTop: "35px", width: "70%", ml: 14 }}
                      name="projectEndDate"
                      label="Ending Date (optional)"
                      type="date"
                      // variant="standard"
                      value={formData.projectEndDate}
                      onChange={handleFieldChange}
                    />
                    <br />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        sx={{ marginTop: "20px", marginRight: "10px" }}
                        variant="outlined"
                        color="error"
                        onClick={handleClose}
                      >
                        Cancel
                      </Button>
                      <Button
                        sx={{ marginTop: "20px" }}
                        variant="contained"
                        color="error"
                        onClick={handleAddProject}
                      >
                        Add Project
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </Box>
            </Modal>
          </Grid>
        </TabPanel>
      </Box>
    </>
  );
};

export default NewEmployee;
