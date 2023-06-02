import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Modal,
  Box,
  TextField,
  Typography,
  Divider,
  Stack,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import MenuItem from "@mui/material/MenuItem";
import { requestLeave } from "../actions/leaveActions";

const LeaveModal = ({ open, onClose, availableLeaves }) => {
  const leaveTypes = [
    {
      value: "Earned Leave",
    },
    {
      value: "Casual Leave",
    },
    {
      value: "Sick Leave",
    },
    {
      value: "Maternity Leave",
    },
    {
      value: "Paternity Leave",
    },
    {
      value: "Leave Without Pay",
    },
    {
      value: "Special Sick Leave",
    },
    {
      value: "Bereavement Leave",
    },
  ];

  //Mapping between leave type options and available leave keys
  const leaveTypeMapping = {
    "Sick Leave": "availableSick",
    "Earned Leave": "availableEarned",
    "Casual Leave": "availableCasual",
    "Maternity Leave": "availableMaternity",
    "Paternity Leave": "availablePaternity",
    "Special Sick Leave": "availableSpecial Sick",
    "Bereavement Leave": "availableBereavement",
  };

  const reasons = [
    {
      value: "Emergency at home",
    },
    {
      value: "Medical emergency",
    },
    {
      value: "Hospitalization",
    },
    {
      value: "Urgent piece of work",
    },
    {
      value: "Others",
    },
  ];

  const calculateDays = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
    return daysDiff;
  };

  const dispatch = useDispatch();

  const [type, setType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [openToast, setOpenToast] = useState(true);
  const [message, setMessage] = useState("");

  const [isTouched, setIsTouched] = useState({
    type: false,
    startDate: false,
    endDate: false,
    reason: false,
  });

  const errors = {};
  let isValid = true;

  if (!type) {
    errors.type = "Please select a type";
    isValid = false;
  }

  if (!startDate) {
    errors.startDate = "Please enter a start date";
    isValid = false;
  }

  if (!endDate) {
    errors.endDate = "Please enter an end date";
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
    const leaveData = {
      type,
      startDate,
      endDate,
      reason,
    };
    if (isValid) {
      const availableLeaveKey = leaveTypeMapping[leaveData.type];
      const availableLeaveCount =
        availableLeaves && availableLeaves[availableLeaveKey];
      const leaveCount = calculateDays(leaveData.startDate, leaveData.endDate);
      if (availableLeaveCount < 1) {
        setMessage("No leaves available for this leave type");
      } else if (availableLeaveCount < leaveCount) {
        setMessage(
          "Number of applied days exceeds your available leaves for this leave type"
        );
      } else {
        dispatch(requestLeave(leaveData));
        setMessage("Request has been submitted successfully");
      }
      setOpenToast(true);
    }

    setType("");
    setStartDate("");
    setEndDate("");
    setReason("");
    setIsTouched(false);
  };

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
            Request for Leave
          </Typography>
          <TextField
            name="type"
            select
            label="Leave Type"
            variant="outlined"
            fullWidth
            margin="normal"
            value={type}
            onChange={(e) => setType(e.target.value)}
            onBlur={handleBlur}
            error={!!errors.type && isTouched.type}
            helperText={errors.type && isTouched.type && errors.type}
          >
            {leaveTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
          <Stack direction="row">
            <TextField
              InputLabelProps={{ shrink: true }}
              sx={{ width: "180px" }}
              name="startDate"
              type="date"
              label="Start Date"
              margin="normal"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              onBlur={handleBlur}
              error={!!errors.startDate && isTouched.startDate}
              helperText={
                errors.startDate && isTouched.startDate && errors.startDate
              }
            />
            <Divider
              orientation="horizontal"
              variant="middle"
              sx={{ mx: 3, bgcolor: "grey.500", width: "1px", my: 3 }}
            />
            <TextField
              InputLabelProps={{ shrink: true }}
              sx={{ width: "180px" }}
              name="endDate"
              label="End Date"
              type="date"
              margin="normal"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              onBlur={handleBlur}
              error={!!errors.endDate && isTouched.endDate}
              helperText={errors.endDate && isTouched.endDate && errors.endDate}
            />
          </Stack>
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

export default LeaveModal;
