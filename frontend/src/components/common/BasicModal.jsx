import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import CommonButton from "./CommonButton";

const BasicModal = ({ open, onClose }) => {
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
      marginBottom: "15px",
      ".MuiInput-root": {
        marginBottom: "20px",
      },
      button: {
        display: "flex",
        justifyContent: "center",
      },
    },
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
          Password Reset
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Enter the email that were assigned by the admin. We'll send you an
          email with a link to reset your password
        </Typography>
        <Input placeholder="E-mail" sx={modalStyles.input} />
        <Box sx={modalStyles.button}>
          <CommonButton variant={"contained"}>Send</CommonButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default BasicModal;
