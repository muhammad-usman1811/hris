import React, { useState, useEffect } from "react";
import {
  Grid,
  Stack,
  TextField,
  Divider,
  Button,
  Typography,
} from "@mui/material";
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
import PieChart from "./common/PieChart";

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

  const employeeNames =
    users &&
    users.map((user) => {
      return {
        id: user._id,
        name: user.name,
      };
    });

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
      checkedIn: moment(row.checkIn, "hh:mm:ss A").format("hh:mm:ss A"),
      checkedOut: row.checkOut
        ? moment(row.checkOut, "hh:mm:ss A").format("hh:mm:ss A")
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

  const totalWorkHours = filteredRows
    .reduce((acc, row) => acc + parseFloat(row.workHours), 0)
    .toFixed(2);

  const userProjects = user?.projects?.map((project) => ({
    value: ((parseInt(project.billableHours) / 8) * totalWorkHours).toFixed(2),
    name: project.projectName,
  }));

  //Projects and clients for pdf report
  const clientsForPdf = user?.projects
    ?.map((project) => project.client)
    .join(", ");

  const projectsForPdf = user?.projects
    ?.map((project) => project.projectName)
    .join(", ");
  const graphRef = React.useRef(null);
  const pieRef = React.useRef(null);

  //Helper function to draw a cell with border and text
  const drawCell = (doc, text, x, y) => {
    const cellWidth = 140;
    const cellHeight = 25;
    const marginX = 5;
    const marginY = 15;

    doc.rect(x, y, cellWidth, cellHeight); // Draw border
    doc.text(text, x + marginX, y + marginY); // Display text
  };

  //Helper function to capture an element as an image
  const captureElementAsImage = async (elementRef) => {
    const canvas = await html2canvas(elementRef.current, {
      scale: 2,
      useCORS: true,
      logging: false,
      willReadFrequently: true,
    });
    return canvas.toDataURL("image/jpeg", 1.0);
  };

  const downloadPdf = async () => {
    const doc = new jsPDF("p", "pt", "a4", true);
    const headerHeight = 25;
    const headerColor = "#CB3837";
    const cellWidth = 140;
    const cellHeight = 25;
    const startX = 20;
    const startY = 125;
    const projectStartX = startX + cellWidth * 2;
    const projectStartY = startY - 25 + cellHeight * 3;

    doc.setFillColor(headerColor);
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), headerHeight, "F");

    const startTime24Hour = user.shiftStartTime;
    const endTime24Hour = user.shiftEndTime;
    const startTime12Hour = moment(startTime24Hour, "HH:mm").format("hh:mm A");
    const endTime12Hour = moment(endTime24Hour, "HH:mm").format("hh:mm A");
    const startMonth = moment(startDate).format("MMMM-YY");

    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Timesheet", 230, 70);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");

    // Draw cells with borders and information
    drawCell(doc, "Name:", startX, startY);
    drawCell(doc, "Designation:", startX, startY + cellHeight);
    drawCell(doc, "Month:", startX, startY + cellHeight * 2);

    doc.text(`Total Work Hours: ${totalWorkHours}`, startX, startY + 100);

    drawCell(doc, "Shift:", startX + cellWidth * 2, startY);
    drawCell(doc, "Client:", startX + cellWidth * 2, startY + cellHeight);
    drawCell(doc, "Project:", projectStartX, projectStartY);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    drawCell(doc, selectedName, startX + cellWidth, startY);
    drawCell(
      doc,
      `${user.jobDetails?.designation}`,
      startX + cellWidth,
      startY + cellHeight
    );
    drawCell(doc, `${startMonth}`, startX + cellWidth, startY + cellHeight * 2);
    drawCell(doc, `${clientsForPdf}`, projectStartX + cellWidth, projectStartY);
    drawCell(
      doc,
      `${startTime12Hour}-${endTime12Hour}`,
      startX + cellWidth * 3,
      startY
    );
    drawCell(
      doc,
      `${projectsForPdf}`,
      startX + cellWidth * 3,
      startY + cellHeight
    );

    try {
      // Capture the graph and pie chart elements as images using html2canvas
      const imageData = await captureElementAsImage(graphRef);
      const pieData = await captureElementAsImage(pieRef);

      // Add the captured images to the PDF
      doc.addImage(imageData, "JPEG", 30, 250, 550, 200, undefined, "FAST");
      doc.addImage(pieData, "JPEG", 30, 500, 550, 200, undefined, "FAST");
    } catch (error) {
      console.error("Error capturing images:", error);
      return;
    }
    const logoImg = new Image();
    logoImg.src = logo;
    const logoWidth = 80; // Adjust the width of the logo as needed
    const logoHeight = 25; // Adjust the height of the logo as needed
    doc.addImage(logoImg, "JPEG", 450, 50, logoWidth, logoHeight);

    const tableData = filteredRows.map((row) =>
      columns.map((column) => column.selector(row))
    );

    const tableHeaders = columns.map((column) => column.name.props.children);
    const headerStyles = { fillColor: "#CB3837", textColor: "#FFFFFF" };

    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
      startY: doc.addPage(),
      theme: "grid", // Apply grid theme for borders
      headStyles: headerStyles,
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
  };

  useEffect(() => {
    if (selectedUserId) {
      dispatch(getUserDetails(selectedUserId));
    }
  }, [dispatch, selectedUserId]);

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
  }, [dispatch, userInfo]);

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
        <>
          <div ref={graphRef}>
            <Graph
              graphRef={graphRef}
              startDate={startDate}
              endDate={endDate}
              data={dataForGraph}
            />
          </div>
          <div ref={pieRef}>
            <Typography sx={{ mt: 3 }} variant="h5">
              Summary of Work Hours
            </Typography>
            <PieChart pieChartRef={pieRef} graphData={userProjects} />
          </div>
        </>
      )}
    </Grid>
  );
};

export default TimeSheet;
