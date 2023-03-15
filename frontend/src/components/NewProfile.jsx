import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

const NewProfile = () => {
  const [department, setDepartment] = React.useState("");

  const handleChange = (event) => {
    setDepartment(event.target.value);
  };
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
          <FormControl variant="standard">
            <InputLabel htmlFor="component-simple">Full Name</InputLabel>
            <Input id="component-simple" defaultValue="Anas Safder" />
          </FormControl>
          <br />
          <FormControl variant="standard" style={{ marginTop: "20px" }}>
            <InputLabel htmlFor="component-simple">Email</InputLabel>
            <Input
              id="component-simple"
              defaultValue="anas.safder@digifloat.com"
            />
          </FormControl>{" "}
          <br />
          <FormControl variant="standard" style={{ marginTop: "20px" }}>
            <InputLabel htmlFor="component-simple">Phone Number</InputLabel>
            <Input id="component-simple" defaultValue="03217318939" />
          </FormControl>{" "}
          <br />
          <FormControl variant="standard" style={{ marginTop: "20px" }}>
            <InputLabel htmlFor="component-simple">Position</InputLabel>
            <Input id="component-simple" defaultValue="Associate Consultant" />
          </FormControl>{" "}
          <br />
          <FormControl variant="standard" style={{ marginTop: "20px" }}>
            <InputLabel htmlFor="component-simple">Address</InputLabel>
            <Input id="component-simple" defaultValue="Multan" />
          </FormControl>{" "}
          <br />
          <FormControl variant="standard" style={{ marginTop: "20px" }}>
            <InputLabel htmlFor="component-simple">CNIC No.</InputLabel>
            <Input id="component-simple" defaultValue="111-111-111" />
          </FormControl>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Job Details
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="simple-select-label">Department</InputLabel>
            <Select
              labelId="simple-select-label"
              id="demo-simple-select"
              value={department}
              label="Department"
              onChange={handleChange}
            >
              <MenuItem value={10}>Human Resource Management</MenuItem>
              <MenuItem value={20}>Web Development</MenuItem>
              <MenuItem value={30}>DevOps</MenuItem>
            </Select>
          </FormControl>
          <br />
          <FormControl sx={{ mt: 3 }} variant="standard">
            <InputLabel htmlFor="component-simple">Employee ID</InputLabel>
            <Input id="component-simple" defaultValue="4321" />
          </FormControl>{" "}
          <br />
          <FormControl sx={{ mt: 3 }} variant="standard">
            <InputLabel htmlFor="component-simple">Title</InputLabel>
            <Input id="component-simple" defaultValue="Full-Stack Developer" />
          </FormControl>{" "}
          <br />
          <FormControl sx={{ mt: 3 }} variant="standard">
            <InputLabel htmlFor="component-simple">Superviser</InputLabel>
            <Input id="component-simple" defaultValue="Osama Saeed" />
          </FormControl>{" "}
          <br />
          <FormControl sx={{ mt: 3 }} variant="standard">
            <InputLabel htmlFor="component-simple">Joining Date</InputLabel>
            <Input id="component-simple" defaultValue="13/02/23" />
          </FormControl>{" "}
          <br />
          <FormControl sx={{ mt: 3 }} variant="standard">
            <InputLabel htmlFor="component-simple">Work Location</InputLabel>
            <Input id="component-simple" defaultValue="On Site" />
          </FormControl>
          <br />
          <FormControl sx={{ mt: 3 }} variant="standard">
            <InputLabel htmlFor="component-simple">Blood Group</InputLabel>
            <Input id="component-simple" defaultValue="B+" />
          </FormControl>
          <br />
          <FormControl sx={{ mt: 3 }} variant="standard">
            <InputLabel htmlFor="component-simple">Passport Number</InputLabel>
            <Input id="component-simple" defaultValue="45-92-67" />
          </FormControl>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box>
          <Typography variant="h6" sx={{ ml: 8 }}>
            Emergency Contact Information
          </Typography>
          <FormControl sx={{ mt: 3, ml: 8 }} variant="standard">
            <InputLabel htmlFor="component-simple">Name</InputLabel>
            <Input id="component-simple" defaultValue="Abcd" />
          </FormControl>{" "}
          <br />
          <FormControl sx={{ mt: 3, ml: 8 }} variant="standard">
            <InputLabel htmlFor="component-simple">Address</InputLabel>
            <Input id="component-simple" defaultValue="Abcd" />
          </FormControl>{" "}
          <br />
          <FormControl sx={{ mt: 3, ml: 8 }} variant="standard">
            <InputLabel htmlFor="component-simple">Relationship</InputLabel>
            <Input id="component-simple" defaultValue="Brother" />
          </FormControl>{" "}
          <br />
          <FormControl sx={{ mt: 3, ml: 8 }} variant="standard">
            <InputLabel htmlFor="component-simple">Phone Number</InputLabel>
            <Input id="component-simple" defaultValue="111-111-111" />
          </FormControl>
          <Stack spacing={2} direction="row" marginTop={32} ml={7}>
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

export default NewProfile;
