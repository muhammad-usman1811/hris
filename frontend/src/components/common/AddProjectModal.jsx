import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

const AddProjectModal = ({ onClose, onSave }) => {
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

  //State for handling project options and its custom options
  const [customProjectOptions, setCustomProjectOptions] = useState(
    JSON.parse(localStorage.getItem("customProjectOptions")) || []
  );

  //State for handling client options and its custom options
  const customClientFromLocalStorage = JSON.parse(
    localStorage.getItem("customClientOptions")
  );

  const [clientOptions, setClientOptions] = useState([
    ...clients,
    ...(customClientFromLocalStorage || []),
  ]);

  const [formData, setFormData] = useState({
    client: "",
    projectName: "",
    projectType: "",
    projectRole: "",
    billableHours: "",
    region: "",
    startDate: "",
    endDate: "",
  });
  const [customProjectOption, setCustomProjectOption] = useState("");
  const [customClientOption, setCustomClientOption] = useState("");
  const [isTouched, setIsTouched] = useState({
    client: false,
    projectName: false,
    projectRole: false,
    projectType: false,
    region: false,
    billableHours: false,
    startDate: false,
  });

  //Dynamic project options
  const projectOptions = [
    ...getProjectOptions(formData.client),
    ...customProjectOptions
      .filter((option) => option.client === formData.client)
      .map((option) => option.value),
  ];

  const errors = {};
  let isValid = true;

  if (!formData.client) {
    errors.client = "Please select client";
    isValid = false;
  }

  if (!formData.projectName) {
    errors.projectName = "Please select project";
    isValid = false;
  }

  if (!formData.projectRole) {
    errors.projectRole = "Please select project role";
    isValid = false;
  }

  if (!formData.projectType) {
    errors.projectType = "Please select project type";
    isValid = false;
  }

  if (!formData.billableHours) {
    errors.billableHours = "Please set billing hours";
    isValid = false;
  }

  if (!formData.region) {
    errors.region = "Please enter region";
    isValid = false;
  }

  if (!formData.startDate) {
    errors.startDate = "Please set project start date";
    isValid = false;
  }

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setIsTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleSave = () => {
    if (isValid) {
      onSave(formData);
      onClose();
    }
  };

  const handleAddProjectOption = () => {
    if (formData.client && customProjectOption) {
      const newOption = {
        client: formData.client,
        value: customProjectOption,
      };
      setCustomProjectOptions([...customProjectOptions, newOption]);
      setFormData((prevFormData) => ({
        ...prevFormData,
        projectName: customProjectOption,
      }));
      setCustomProjectOption("");
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
    if (customClientOption) {
      const newOption = { value: customClientOption };
      setClientOptions([...clientOptions, newOption]);
      setFormData((prevFormData) => ({
        ...prevFormData,
        client: customClientOption,
      }));
      setCustomClientOption("");

      const existingOptions =
        JSON.parse(localStorage.getItem("customClientOptions")) || [];
      const updatedOptions = [...existingOptions, newOption];
      localStorage.setItem(
        "customClientOptions",
        JSON.stringify(updatedOptions)
      );
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 750,
    bgcolor: "background.paper",
    border: "2px solid #E23D3F",
    boxShadow: 24,
    p: 4,
  };
  return (
    <div>
      <Modal open={true} onClose={onClose}>
        <Box sx={style}>
          <Grid container spacing={1} xs={12}>
            <Grid xs={6}>
              <TextField
                sx={{ marginTop: "20px", width: "70%" }}
                name="client"
                multiple
                required
                select
                error={!!errors.client && isTouched.client && errors.client}
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
                    sx={{ width: "50%", ml: 2 }}
                    name="customClientOption"
                    variant="standard"
                    value={customClientOption}
                    onChange={(e) => setCustomClientOption(e.target.value)}
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
                error={!!errors.region && isTouched.region}
                helperText={errors.region && isTouched.region && errors.region}
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
                  !!errors.projectName &&
                  isTouched.projectName &&
                  errors.projectName
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
                    sx={{ width: "50%", ml: 15 }}
                    name="customProjectOption"
                    variant="standard"
                    value={customProjectOption}
                    onChange={(e) => setCustomProjectOption(e.target.value)}
                  />
                  <Button onClick={handleAddProjectOption}>Add</Button>
                </>
              )}
              <br />
              <TextField
                InputLabelProps={{ shrink: true }}
                sx={{ marginTop: "20px", width: "70%", ml: 14 }}
                name="startDate"
                label="Starting Date"
                type="date"
                required
                value={formData.startDate}
                onChange={handleFieldChange}
                onBlur={handleBlur}
                error={!!errors.startDate && isTouched.startDate}
                helperText={
                  errors.startDate && isTouched.startDate && errors.startDate
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
                name="endDate"
                label="Ending Date (optional)"
                type="date"
                // variant="standard"
                value={formData.endDate}
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
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  sx={{ marginTop: "20px" }}
                  variant="contained"
                  color="error"
                  onClick={handleSave}
                >
                  Add Project
                </Button>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default AddProjectModal;
