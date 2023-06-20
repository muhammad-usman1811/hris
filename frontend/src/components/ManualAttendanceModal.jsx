import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Button, Modal, Box, TextField, Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import MenuItem from "@mui/material/MenuItem";
import { requestAttendance } from "../actions/attendanceRequestActions";

const ManualAttendanceModal = ({ open, onClose }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const reasons = [
    {
      value: "Forgot to check in",
    },
    {
      value: "Internet connectivity issue",
    },
    {
      value: "Power outage",
    },
    {
      value: "System maintenance",
    },
    {
      value: "Meeting or training session",
    },
    {
      value: "Transportation delays",
    },
    {
      value: "Medical appointment",
    },
    {
      value: "Personal emergency",
    },
    {
      value: "Others",
    },
  ];

  const dispatch = useDispatch();

  const [selectedDate, setSelectedDate] = useState("");
  const [reason, setReason] = useState("");
  const [openToast, setOpenToast] = useState(true);
  const [message, setMessage] = useState("");
  const [missingAttendanceDates, setMissingAttendanceDates] = useState([]);

  const [isTouched, setIsTouched] = useState({
    date: false,
    reason: false,
  });

  const errors = {};
  let isValid = true;

  if (!selectedDate) {
    errors.date = "Please select a date";
    isValid = false;
  }

  if (!reason) {
    errors.reason = "Please enter some reason";
    isValid = false;
  }

  const handleBlur = (e) => {
    const { name } = e.target;
    setIsTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleToastClose = () => {
    setOpenToast(false);
  };

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestData = {
      date: selectedDate,
      reason,
    };
    if (isValid) {
      dispatch(requestAttendance(requestData));
      setMessage("Request has been submitted successfully");
      setSelectedDate("");
      setReason("");
      setIsTouched(false);
      setOpenToast(true);
    }
  };
  useEffect(() => {
    const fetchUserAttendance = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        const { data } = await axios.get(
          `/api/attendance/${userInfo._id}`,
          config
        );
        // const dates = data.map(
        //   (attendance) => attendance.createdAt.split("T")[0]
        // );
        setMissingAttendanceDates(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserAttendance();
  }, [userInfo, missingAttendanceDates]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            minWidth: 400,
            maxWidth: 600,
            borderRadius: 4,
          }}
          component="form"
          onSubmit={handleSubmit}
        >
          <Typography
            id="modal-title"
            variant="h6"
            component="h2"
            sx={{ mb: 2 }}
          >
            Request for Manual Attendance
          </Typography>
          <TextField
            InputLabelProps={{ shrink: true }}
            name="date"
            select
            label="Select Date"
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            onBlur={handleBlur}
            error={!!errors.date && isTouched.date}
            helperText={errors.date && isTouched.date && errors.date}
          >
            {missingAttendanceDates.map((date) => (
              <MenuItem key={date} value={date}>
                {date}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            name="reason"
            select
            label="Reason"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            onBlur={handleBlur}
            error={!!errors.reason && isTouched.reason}
            helperText={errors.reason && isTouched.reason && errors.reason}
          >
            {reasons.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button
              sx={{ mr: 1 }}
              variant="contained"
              color="error"
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={!isValid}
            >
              Submit
            </Button>
          </Box>
        </Box>
        {message && (
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={openToast}
            onClose={handleToastClose}
            autoHideDuration={4000}
          >
            <Alert severity="info" sx={{ width: "100%" }}>
              {message}
            </Alert>
          </Snackbar>
        )}
      </>
    </Modal>
  );
};

export default ManualAttendanceModal;
