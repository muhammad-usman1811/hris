import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

export default function AlertDialog({ open, onClose }) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You can Check Out atleast after one hour since Check In time
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={onClose}>
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
