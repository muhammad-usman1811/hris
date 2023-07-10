import React, { useState, useEffect } from "react";
import { Grid, Stack, TextField, Divider, Button } from "@mui/material";
import DataTable from "react-data-table-component";
import { useSelector, useDispatch } from "react-redux";
import Graph from "./common/Graph";
import { getUserDetails, listUsers } from "../actions/userActions";
import MenuItem from "@mui/material/MenuItem";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import axios from "axios";
import moment from "moment";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../assets/logo.jpeg";

const TimeSheet = () => {
  const columns = [
    {
      name: <b>Name</b>,
      selector: (row) => row.name,
    },
    {
      name: <b>Department</b>,
      selector: (row) => row.department,
    },
    {
      name: <b>Status</b>,
      selector: (row) => row.status,
    },
    {
      name: <b>Date</b>,
      selector: (row) => row.date,
    },
    {
      name: <b>Checked-In</b>,
      selector: (row) => row.checkedIn,
    },
    {
      name: <b>Checked-Out</b>,
      selector: (row) => row.checkedOut,
    },
    {
      name: <b>Work Hours</b>,
      selector: (row) => row.workHours,
    },
  ];

  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [employeeNames, setEmployeeNames] = useState([]);
  const [selectedName, setSelectedName] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [attendance, setAttendance] = useState([]);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [filteredRows, setFilteredRows] = useState([]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userList = useSelector((state) => state.userList);
  const { users } = userList;

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const calculateWorkHours = (starttime, endtime) => {
    if (!endtime || endtime === "Not checked out") {
      return 0;
    }
    let startTime = moment(starttime, "hh:mm:ss A");
    let endTime = moment(endtime, "hh:mm:ss A");
    let duration = moment.duration(endTime.diff(startTime));
    let hours = duration.asHours();
    return (hours - 1).toFixed(2);
  };

  const rowsData = attendance.map((row) => {
    return {
      id: row._id,
      name: row.name,
      department: row.department,
      status: "Present",
      checkedIn: moment(row.checkIn, "hh:mm:ss:A").format("hh:mm:ss:A"),
      checkedOut: row.checkOut
        ? moment(row.checkOut, "hh:mm:ss:A").format("hh:mm:ss:A")
        : "Not checked out",
      workHours: calculateWorkHours(row.checkIn, row.checkOut),
      date: row.createdAt.split("T")[0],
    };
  });

  const handleFilter = () => {
    const filterRowsOnClick = rowsData.filter((item) => {
      const itemDate = new Date(item.date);
      const startDateTime = new Date(startDate);
      const endDateTime = new Date(endDate);
      //Set the end date time to the end of the day
      endDateTime.setHours(23, 59, 59, 999);
      return (
        itemDate >= startDateTime &&
        itemDate <= endDateTime &&
        item.name === selectedName
      );
    });
    setFilteredRows(filterRowsOnClick);
    setIsFilterApplied(true);
  };

  const formatDate = (date) => {
    const dateObject = new Date(date);
    const options = { weekday: "short", month: "short", day: "numeric" };
    return dateObject.toLocaleDateString("en-US", options);
  };

  const dataForGraph = filteredRows.map((row) => {
    return {
      workHours: calculateWorkHours(row.checkedIn, row.checkedOut),
      date: formatDate(row.date),
    };
  });

  const handleClear = () => {
    setFilteredRows([]);
    setStartDate("");
    setEndDate("");
    setSelectedName("");
    setIsFilterApplied(false);
  };

  const handleNameChange = (event) => {
    const selectedName = event.target.value;
    const selectedUser = employeeNames.find(
      (employee) => employee.name === selectedName
    );
    setSelectedName(selectedName);
    setSelectedUserId(selectedUser ? selectedUser.id : null);
  };

  const graphRef = React.useRef(null);

  const downloadPdf = () => {
    const doc = new jsPDF("p", "pt", "a4", true);

    //Change shift start and end time format
    const startTime24Hour = user.shiftStartTime;
    const endTime24Hour = user.shiftEndTime;

    const startTime12Hour = moment(startTime24Hour, "HH:mm").format("hh:mm:A");
    const endTime12Hour = moment(endTime24Hour, "HH:mm").format("hh:mm:A");

    const startMonth = moment(startDate).format("MMMM-YY"); // Extract the month from the selected start date

    // Add the table content to the PDF
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Timesheet", 230, 70);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold"); // Set the font style to bold
    doc.text("Name:", 50, 125);
    doc.text("Designation:", 50, 150);
    doc.text("Month:", 50, 175);
    doc.text("Project:", 50, 200);
    doc.text("Department:", 50, 225);
    doc.text("Shift:", 300, 125);
    doc.text("Client:", 300, 150);

    doc.setFont("helvetica", "normal"); // Set the font style to normal
    doc.text(selectedName, 95, 125); // Display the selected name as normal text
    doc.text(`${user.jobDetails?.designation}`, 125, 150);
    doc.text(`${startMonth}`, 95, 175);
    doc.text(`${user.projectDetails?.projectName}`, 95, 200);
    doc.text(`${user.jobDetails?.department}`, 125, 225);
    doc.text(`${startTime12Hour}-${endTime12Hour}`, 340, 125);
    doc.text(`${user.projectDetails?.client}`, 340, 150);

    // Capture the graph element as an image using html2canvas
    html2canvas(graphRef.current, {
      scale: "2",
      willReadFrequently: true,
      useCORS: true,
    }).then((canvas) => {
      const imageData = canvas.toDataURL("image/jpeg", 0.3);

      // Add the captured image to the PDF
      doc.addImage(imageData, "JPEG", 30, 250, 550, 150, undefined, "FAST");

      const logoImg = new Image();
      logoImg.src = logo;
      const logoWidth = 80; // Adjust the width of the logo as needed
      const logoHeight = 25; // Adjust the height of the logo as needed
      doc.addImage(logoImg, "JPEG", 450, 50, logoWidth, logoHeight);

      const tableData = filteredRows.map((row) =>
        columns.map((column) => column.selector(row))
      );

      const tableHeaders = columns.map((column) => column.name.props.children);

      autoTable(doc, {
        head: [tableHeaders],
        body: tableData,
        startY: 450,
      });

      //Add the footer
      doc.setFont("helvetica", "italic");
      doc.setFontSize(10);
      doc.setTextColor(128);

      const footerText =
        "Powered by Digifloat - This is a system generated report and does not require any signature or stamp.";
      const textWidth = doc.getTextDimensions(footerText).w;

      const xPos = (doc.internal.pageSize.getWidth() - textWidth) / 2;
      const yPos = doc.internal.pageSize.getHeight() - 10;
      doc.text(footerText, xPos, yPos);

      doc.save(`Timesheet_${selectedName}_${startMonth}`);
    });
  };

  useEffect(() => {
    const fetchAttendance = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      try {
        const { data } = await axios.get("/api/attendance", config);
        setAttendance(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAttendance();
    dispatch(listUsers());
    const userNames =
      users &&
      users.map((user) => {
        return {
          id: user._id,
          name: user.name,
        };
      });
    setEmployeeNames(userNames);
    if (selectedUserId) {
      dispatch(getUserDetails(selectedUserId));
    }
  }, [userInfo, dispatch, users, selectedUserId]);

  return (
    <Grid
      item
      xs={12}
      sx={{
        marginLeft: "256px",
        backgroundColor: "#eaeff1",
        padding: "32px",
        minHeight: "calc(100vh - 67px)",
        position: "relative",
      }}
    >
      <Grid>
        <Stack
          direction="row"
          sx={{ marginTop: -2, height: 80, display: "flex" }}
        >
          <TextField
            InputLabelProps={{ shrink: true }}
            label="Employee Name"
            sx={{ m: 1, width: 300, mt: 2, background: "white" }}
            name="selectedName"
            select
            value={selectedName}
            onChange={handleNameChange}
            //onBlur={handleBlur}
            // error={!!errors.department && isTouched.department}
            // helperText={
            //   errors.department && isTouched.department
            //     ? errors.department
            //     : "Please select the department"
            // }
          >
            {employeeNames.map((option) => (
              <MenuItem key={option.name} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            InputLabelProps={{ shrink: true }}
            sx={{ width: "180px", backgroundColor: "white" }}
            name="startDate"
            type="date"
            label="Start Date"
            margin="normal"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}

            // onBlur={handleBlur}

            // error={!!errors.startDate && isTouched.startDate}

            // helperText={

            //   errors.startDate && isTouched.startDate && errors.startDate

            // }
          />

          <Divider
            orientation="horizontal"
            variant="middle"
            sx={{ mx: 3, bgcolor: "grey.500", width: "1px", my: 3 }}
          />
          <TextField
            InputLabelProps={{ shrink: true }}
            sx={{ width: "180px", backgroundColor: "white" }}
            name="endDate"
            label="End Date"
            type="date"
            margin="normal"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}

            // onBlur={handleBlur}

            // error={!!errors.endDate && isTouched.endDate}

            // helperText={errors.endDate && isTouched.endDate && errors.endDate}
          />
          <Stack sx={{ direction: "column" }}>
            <Button
              variant="contained"
              color="error"
              sx={{ height: 30, marginLeft: 2 }}
              onClick={handleFilter}
            >
              Apply Filter
            </Button>
            <Button
              sx={{ height: 30, marginTop: 1, marginLeft: 2 }}
              variant="contained"
              color="error"
              size="small"
              onClick={handleClear}
            >
              Clear filter
            </Button>
          </Stack>
        </Stack>
      </Grid>
      {!isFilterApplied && (
        <div
          style={{
            width: "100%",
            height: "calc(100vh - 67px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Please apply filters to load an employee timesheet
        </div>
      )}
      {isFilterApplied && (
        <Button
          endIcon={<UpgradeIcon />}
          sx={{ m: 1, mb: 2, height: 35 }}
          color="error"
          variant="contained"
          onClick={() => downloadPdf()}
        >
          Export
        </Button>
      )}
      {isFilterApplied && <DataTable data={filteredRows} columns={columns} />}
      {isFilterApplied && (
        <div ref={graphRef}>
          <Graph
            graphRef={graphRef}
            startDate={startDate}
            endDate={endDate}
            data={dataForGraph}
          />
        </div>
      )}
    </Grid>
  );
};

export default TimeSheet;
