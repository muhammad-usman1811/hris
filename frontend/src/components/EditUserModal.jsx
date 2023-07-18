import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";

const EditUserModal = ({ project, onSave, onClose }) => {
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

  //Client and its custom options
  const customClientFromLocalStorage = JSON.parse(
    localStorage.getItem("customClientOptions")
  );

  const customClientOptions = [
    ...clients,
    ...(customClientFromLocalStorage || []),
  ];

  const [formData, setFormData] = useState(project);
  const [isTouched, setIsTouched] = useState({
    client: false,
    projectName: false,
    projectRole: false,
    projectType: false,
    region: false,
    billableHours: false,
    startDate: false,
  });

  //Project and its custom options
  const customProjectFromLocalStorage = JSON.parse(
    localStorage.getItem("customProjectOptions")
  );

  let customProjectOptions = getProjectOptions(formData.client);

  if (
    customProjectFromLocalStorage &&
    Array.isArray(customProjectFromLocalStorage)
  ) {
    customProjectOptions = [
      ...customProjectOptions,
      ...customProjectFromLocalStorage
        .filter((option) => option.client === formData.client)
        .map((option) => option.value),
    ];
  }

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
    errors.billingHours = "Please set billing hours";
    isValid = false;
  }

  if (!formData.region) {
    errors.region = "Please enter region";
    isValid = false;
  }

  if (!formData.startDate) {
    errors.projectStartDate = "Please set project start date";
    isValid = false;
  }

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (isValid) {
      onSave(formData);
      onClose();
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setIsTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
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
                select
                error={!!errors.client && isTouched.client && errors.client}
                value={formData.client}
                onChange={handleInputChange}
                onBlur={handleBlur}
                helperText={
                  errors.client && isTouched.client
                    ? errors.client
                    : "Please select client"
                }
                // variant="standard"
              >
                {customClientOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
              <br />
              <TextField
                InputLabelProps={{ shrink: true }}
                sx={{ marginTop: "20px", width: "70%" }}
                name="projectType"
                label="Project Type"
                // variant="standard"
                value={formData.projectType}
                onChange={handleInputChange}
                onBlur={handleBlur}
                error={!!errors.projectType && isTouched.projectType}
                helperText={
                  errors.projectType &&
                  isTouched.projectType &&
                  errors.projectType
                    ? errors.projectType
                    : "Please set project type"
                }
              />
              <br />
              <TextField
                InputLabelProps={{ shrink: true }}
                sx={{ marginTop: "20px", width: "70%" }}
                name="projectRole"
                label="Project Role"
                // variant="standard"
                value={formData.projectRole}
                onChange={handleInputChange}
                onBlur={handleBlur}
                error={!!errors.projectRole && isTouched.projectRole}
                helperText={
                  errors.projectRole &&
                  isTouched.projectRole &&
                  errors.projectRole
                    ? errors.projectRole
                    : "Please set project role"
                }
              />
              <br />
              <TextField
                InputLabelProps={{ shrink: true }}
                sx={{ marginTop: "20px", width: "70%" }}
                name="region"
                label="Region"
                // variant="standard"
                value={formData.region}
                onChange={handleInputChange}
                onBlur={handleBlur}
                error={!!errors.region && isTouched.region}
                helperText={
                  errors.region && isTouched.region && errors.region
                    ? errors.region
                    : "Please set region"
                }
              />
              <br />
            </Grid>
            <Grid xs={6}>
              <TextField
                sx={{ marginTop: "20px", width: "70%", ml: 14 }}
                name="projectName"
                select
                error={!!errors.project && isTouched.project && errors.project}
                value={formData.projectName}
                onChange={handleInputChange}
                onBlur={handleBlur}
                helperText={
                  errors.projectName && isTouched.projectName
                    ? errors.projectName
                    : "Please select project"
                }
              >
                {customProjectOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <br />
              <TextField
                InputLabelProps={{ shrink: true }}
                sx={{ marginTop: "20px", width: "70%", ml: 14 }}
                name="projectStartDate"
                label="Starting Date"
                type="date"
                // variant="standard"
                value={formData.startDate}
                onChange={handleInputChange}
                onBlur={handleBlur}
                error={!!errors.projectStartDate && isTouched.projectStartDate}
                helperText={
                  errors.projectStartDate &&
                  isTouched.projectStartDate &&
                  errors.projectStartDate
                    ? errors.startDate
                    : "Please set project start date"
                }
              />
              <br />
              <TextField
                InputLabelProps={{ shrink: true }}
                sx={{ marginTop: "20px", width: "70%", ml: 14 }}
                name="billable hours"
                label="Billable Hours"
                select
                // variant="standard"
                value={formData.billableHours}
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                  Save Changes
                </Button>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default EditUserModal;
