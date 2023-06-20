import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
//import Input from "@mui/material/Input";
import { TextField } from "@mui/material";
import CommonButton from "./CommonButton";
import { forgotPassword } from "../../actions/userActions";
import CircularProgress from "@mui/material/CircularProgress";

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

  const dispatch = useDispatch();

  const userForgot = useSelector((state) => state.userForgot);
  const { loading, message, error } = userForgot;
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  //Email validations
  const emailIsEmpty = email.trim() === "";
  const emailFormat = email.includes("@digifloat.com");

  const emailIsValid = !emailIsEmpty && emailFormat;

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const emailFocusHandler = () => {
    setEmailError("");
  };

  const clickHandler = (event) => {
    event.preventDefault();
    if (emailIsEmpty) {
      setEmailError("Email is required");
      return;
    }
    if (!emailIsEmpty && !emailFormat) {
      setEmailError("Email format is incorrect");
      return;
    }
    if (emailIsValid) {
      dispatch(forgotPassword(email));
      setEmail("");
      alert(message.message);
    }
  };

  useEffect(() => {
    if (error) {
      setEmailError(error);
    }
    if (message) {
      alert(message?.message);
    }
  }, [error, message]);

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
          Please enter your registered email. We'll send you an email with a
          link to reset your password.
        </Typography>
        <TextField
          label="E-mail"
          sx={modalStyles.input}
          variant="outlined"
          value={email}
          onChange={emailChangeHandler}
          onFocus={emailFocusHandler}
          error={Boolean(emailError)}
          helperText={emailError}
        />
        <Box sx={modalStyles.button}>
          <CommonButton
            variant={"contained"}
            onClick={clickHandler}
            color="error"
          >
            {loading ? <CircularProgress size={24} /> : "Send"}
          </CommonButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default BasicModal;
