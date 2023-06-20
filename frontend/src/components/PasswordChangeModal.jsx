import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

const PasswordChangeModal = ({ open, onClose, onSubmit, message }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleFormSubmit = () => {
    // Reset error message
    setError("");

    // Perform validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Please fill in all fields.");
    } else if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
    } else {
      // Call the onSubmit callback with the form data
      onSubmit(currentPassword, newPassword);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter your current password and choose a new password.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Current Password"
          type="password"
          fullWidth
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <TextField
          margin="dense"
          label="New Password"
          type="password"
          fullWidth
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Confirm Password"
          type="password"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {(error || message) && (
          <p style={{ color: "red" }}>{error || message}</p>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">
          Cancel
        </Button>
        <Button onClick={handleFormSubmit} variant="contained" color="error">
          Change Password
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PasswordChangeModal;
