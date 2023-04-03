import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import axios from "axios";

const DocModal = ({ open, onClose }) => {
  const [enteredName, setEnteredName] = useState("");
  const [selectedFile, setSelectedFile] = useState("");

  const modalStyles = {
    wrapper: {
      flexGrow: 1,
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
      marginBottom: "15px",
      ".MuiInput-root": {
        marginBottom: "20px",
      },
      button: {
        display: "flex",
        justifyContent: "flex-end",
      },
    },
  };

  const handleName = (event) => {
    setEnteredName(event.target.value);
  };

  const handleFile = (event) => {
    setSelectedFile(event.target.files[0].name);
  };

  const handleUpload = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("document", selectedFile);
    formData.append("filename", enteredName);

    axios
      .post("/api/documents/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => console.log(res.data.message))
      .catch((err) => console.log(err));
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyles.wrapper}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add a Document
        </Typography>
        <Input
          placeholder="Enter name"
          sx={modalStyles.input}
          onChange={handleName}
        />
        <input
          style={{ display: "none" }}
          id="contained-button-file"
          type="file"
          onChange={handleFile}
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" component="span">
            Select file
          </Button>
          {selectedFile && (
            <Typography variant="subtitle1">{selectedFile}</Typography>
          )}
        </label>
        <Box sx={modalStyles.button}>
          <Button variant="contained" type="submit" onClick={handleUpload}>
            Upload
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DocModal;
