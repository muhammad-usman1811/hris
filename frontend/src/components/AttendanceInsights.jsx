import React, { useState } from "react";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const AttendanceInsights = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <Grid container item>
      <Grid item xs={12} sx={{ marginBottom: "20px" }}>
        {/* Calendar */}
        {/* Render your calendar component here */}
        <Calendar
          value={selectedDate}
          onChange={handleDateChange}
          className="calendar"
        />
      </Grid>
      <Grid item xs={12}>
        {/* Cards */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            {/* Card 1 */}
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2">
                  Present
                </Typography>
                <Typography variant="body1">40</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            {/* Card 2 */}
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2">
                  Absent
                </Typography>
                <Typography variant="body1">10</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            {/* Card 3 */}
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2">
                  Leave
                </Typography>
                <Typography variant="body1">05</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            {/* Card 4 */}
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2">
                  Non-working Day
                </Typography>
                <Typography variant="body1">02</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AttendanceInsights;
