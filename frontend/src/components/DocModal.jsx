import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Button from "@mui/lab/LoadingButton";
import { uploadDoc } from "../actions/docActions";

const DocModal = ({ open, onClose }) => {
  const modalStyles = {
    wrapper: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      p: 4,
    },
    input: {
      display: "flex",
      flexDirection: "column",
      marginTop: "20px",
      marginBottom: "20px",
      ".MuiInput-root": {
        marginBottom: "20px",
      },
    },
  };

  const [enteredName, setEnteredName] = useState("");
  const [selectedFile, setSelectedFile] = useState("");

  const dispatch = useDispatch();

  const nameIsInvalid = enteredName.trim() === "";
  const fileIsInvalid = selectedFile === "";

  const handleName = (event) => {
    setEnteredName(event.target.value);
  };

  const handleFile = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = (event) => {
    event.preventDefault();

    if (nameIsInvalid && fileIsInvalid) {
      return;
    }

    dispatch(uploadDoc(enteredName, selectedFile));
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyles.wrapper} component="form" onSubmit={handleUpload}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add a Document
        </Typography>
        <TextField
          placeholder="Enter name"
          type="text"
          onChange={handleName}
          sx={modalStyles.input}
        />
        <TextField
          id="contained-button-file"
          type="file"
          inputProps={{
            accept: "application/pdf",
          }}
          onChange={handleFile}
          sx={modalStyles.input}
        />
        <Button
          disabled={nameIsInvalid || fileIsInvalid}
          variant="contained"
          type="submit"
          color="error"
          startIcon={<FileUploadIcon />}
        >
          Upload
        </Button>
      </Box>
    </Modal>
  );
};

export default DocModal;
