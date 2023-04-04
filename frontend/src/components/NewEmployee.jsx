import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import HighlightAltIcon from "@mui/icons-material/HighlightAlt";
import ImageListItem from "@mui/material/ImageListItem";

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
  const [files, setFiles] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length) {
      setFiles((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [address, setAddress] = useState(null);
  const [phone, setPhone] = useState(null);
  const [passport, setPassport] = useState(null);
  const [cnic, setCnic] = useState(null);
  const [department, setDepartment] = useState(null);
  const [employeeId, setEmployeeId] = useState();
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

  return (
    <Grid
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
        <Box>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <Button variant="outlined" startIcon={<HighlightAltIcon />}>
              Click to select photo
            </Button>
          </div>
          {files.map((file) => (
            <ImageListItem
              key={file.name}
              sx={{ width: 200, height: 200, mt: 2 }}
            >
              <img src={file.preview} alt="Profile" loading="lazy" />
            </ImageListItem>
          ))}
        </Box>
        <Box>
          <Typography
            variant="h6"
            sx={{ marginBottom: "2px", marginTop: "5px" }}
          >
            Employee Details
          </Typography>
          <TextField
            sx={{ marginTop: "20px" }}
            id="name"
            label="Full Name"
            variant="standard"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <br />
          <TextField
            sx={{ marginTop: "20px" }}
            id="email"
            label="Email"
            variant="standard"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <br />
          <TextField
            sx={{ marginTop: "20px" }}
            id="phone"
            label="Phone Number"
            variant="standard"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
          <br />
          <TextField
            sx={{ marginTop: "20px" }}
            id="address"
            label="Address"
            variant="standard"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
          <br />
          <TextField
            sx={{ marginTop: "20px" }}
            id="cnic"
            label="CNIC"
            variant="standard"
            value={cnic}
            onChange={(event) => setCnic(event.target.value)}
          />
          <br />
          <TextField
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
            sx={{ marginTop: "20px" }}
            id="employeeId"
            label="Employee ID"
            variant="standard"
            value={employeeId}
            onChange={(event) => setEmployeeId(event.target.value)}
          />
          <br />
          <TextField
            sx={{ marginTop: "20px" }}
            id="title"
            label="Title"
            variant="standard"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <br />
          <TextField
            sx={{ marginTop: "20px" }}
            id="designation"
            label="Designation"
            variant="standard"
            value={designation}
            onChange={(event) => setDesignation(event.target.value)}
          />
          <br />
          <TextField
            sx={{ marginTop: "20px" }}
            id="supervisor"
            label="Supervisor"
            variant="standard"
            value={supervisor}
            onChange={(event) => setSupervisor(event.target.value)}
          />
          <br />
          <TextField
            sx={{ marginTop: "20px" }}
            id="date"
            label="Joining Date"
            variant="standard"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
          <br />
          <TextField
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
            sx={{ marginTop: "20px", ml: "6px" }}
            id="emergency-name"
            label="Name"
            variant="standard"
            value={emergencyName}
            onChange={(event) => setEmergencyName(event.target.value)}
          />
          <br />
          <TextField
            sx={{ marginTop: "20px", ml: "6px" }}
            id="relation"
            label="Relation"
            variant="standard"
            value={relation}
            onChange={(event) => setRelation(event.target.value)}
          />
          <br />
          <TextField
            sx={{ marginTop: "20px", ml: "6px" }}
            id="emergency-address"
            label="Address"
            variant="standard"
            value={emergencyAddress}
            onChange={(event) => setEmergencyAddress(event.target.value)}
          />
          <br />
          <TextField
            sx={{ marginTop: "20px" }}
            id="contact"
            label="Contact Number"
            variant="standard"
            value={contact}
            onChange={(event) => setContact(event.target.value)}
          />
          <br />
          <TextField
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

export default NewEmployee;
