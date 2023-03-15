import React from "react";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const EmployeeProfile = () => {
  const [department, setDepartment] = React.useState("");

  const handleChange = (event) => {
    setDepartment(event.target.value);
  };
  return (
    <>
      <div
        className="mainempp"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <div
          className="employeeprofile"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div className="row1" style={{ width: "20%" }}>
            <img
              src="/images/userPhoto.jpg"
              style={{ width: "auto", height: "200px", margin: "70px" }}
              alt=""
            />
          </div>

          <div className="empinfo" style={{ marginLeft: "70px" }}>
            <h3>Employee Details</h3>
            <FormControl variant="standard">
              <InputLabel htmlFor="component-simple">First Name</InputLabel>
              <Input id="component-simple" defaultValue="Anas" />
            </FormControl>{" "}
            <br />
            <FormControl variant="standard" style={{ marginTop: "20px" }}>
              <InputLabel htmlFor="component-simple">Last Name</InputLabel>
              <Input id="component-simple" defaultValue="Safder" />
            </FormControl>{" "}
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
              <Input
                id="component-simple"
                defaultValue="Associate Consultant"
              />
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
          </div>
        </div>

        <div className="mainempp2">
          <h3 style={{ margin: "70px" }}>Job Information</h3>
          <Box sx={{ width: 200, margin: 8 }}>
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
          </Box>
          <FormControl sx={{ mt: 3, ml: 8 }} variant="standard">
            <InputLabel htmlFor="component-simple">Employee ID</InputLabel>
            <Input id="component-simple" defaultValue="4321" />
          </FormControl>{" "}
          <br />
          <FormControl sx={{ mt: 3, ml: 8 }} variant="standard">
            <InputLabel htmlFor="component-simple">Title</InputLabel>
            <Input id="component-simple" defaultValue="Full-Stack Developer" />
          </FormControl>{" "}
          <br />
          <FormControl sx={{ mt: 3, ml: 8 }} variant="standard">
            <InputLabel htmlFor="component-simple">Superviser</InputLabel>
            <Input id="component-simple" defaultValue="Osama Saeed" />
          </FormControl>{" "}
          <br />
          <FormControl sx={{ mt: 3, ml: 8 }} variant="standard">
            <InputLabel htmlFor="component-simple">Joining Date</InputLabel>
            <Input id="component-simple" defaultValue="13/02/23" />
          </FormControl>{" "}
          <br />
          <FormControl sx={{ mt: 3, ml: 8 }} variant="standard">
            <InputLabel htmlFor="component-simple">Work Location</InputLabel>
            <Input id="component-simple" defaultValue="On Site" />
          </FormControl>{" "}
          <br />
        </div>

        <div className="mainempp3">
          <h3 style={{ margin: "70px" }}>Emergency Contact Information</h3>
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
          </FormControl>{" "}
          <br />
        </div>
        <div style={{ marginLeft: "65px", marginTop: "50px" }}>
          <footer>
            <h3>Passport Number</h3>
          </footer>

          <FormControl variant="standard">
            <InputLabel htmlFor="component-simple">Passport Number</InputLabel>
            <Input id="component-simple" defaultValue="" />
          </FormControl>
        </div>
      </div>

      <Stack marginLeft={8} spacing={2} direction="row" marginTop={4}>
        <Button color="error" variant="contained">
          Save Changes
        </Button>
        <Button color="error" variant="outlined">
          Cancel
        </Button>
      </Stack>
    </>
  );
};

export default EmployeeProfile;
