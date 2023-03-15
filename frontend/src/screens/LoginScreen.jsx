import React, { useState, useEffect } from "react";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import LoginIcon from "@mui/icons-material/Login";
import Alert from "@mui/material/Alert";
import {
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Grid,
  Box,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import BasicModal from "../components/common/BasicModal";
import { login } from "./../actions/userActions";

const LoginScreen = ({ history }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsTouched, setEmailIsTouched] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsTouched, setPasswordIsTouched] = useState(false);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, error } = userLogin;

  //Email validity & Invalidity
  const emailIsValid = enteredEmail.trim() !== "";
  const emailIsInvalid = !emailIsValid && emailIsTouched;

  //Password Validity & Invalidity
  const passwordIsValid = enteredPassword.trim() !== "";
  const passwordIsInvalid = !passwordIsValid && passwordIsTouched;

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const emailBlurHandler = (event) => {
    setEmailIsTouched(true);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const passwordBlurHandler = (event) => {
    setPasswordIsTouched(true);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setEmailIsTouched(true);
    setPasswordIsTouched(true);

    if (!emailIsValid && !passwordIsValid) {
      return;
    }
    dispatch(login(enteredEmail, enteredPassword));
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/home/dashboard");
    }
  }, [userInfo, navigate]);
  return (
    <Grid container sx={{ minHeight: "100vh" }}>
      <Grid item xs={12} sm={6}>
        <img
          src="images/cover.png"
          alt="cover"
          style={{ width: "100%", height: "105%", objectFit: "cover" }}
        />
      </Grid>
      <Grid item xs={12} sm={6} sx={{ bgcolor: "#FBFBFD" }}>
        <Box
          component="form"
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          margin="auto"
          marginTop={8}
          padding={3}
          onSubmit={submitHandler}
        >
          <img src="images/logo.png" alt="company logo" width={250} />
          <Typography variant="subtitle1" padding={1} textAlign="center">
            Bringing the Power of{" "}
            <span style={{ color: "#E60E0F" }}>Big Data</span> to Businesses
          </Typography>
          <Typography variant="h4" padding={2} marginTop={5} textAlign="center">
            Welcome <span style={{ color: "#E60E0F" }}>Back</span>!
          </Typography>
          <TextField
            label="Email"
            variant="outlined"
            placeholder="first.last@digifloat.com"
            type={"email"}
            margin="normal"
            size="small"
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            error={emailIsInvalid}
            helperText={emailIsInvalid && "Email must not be empty"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            margin="normal"
            size="small"
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            error={passwordIsInvalid}
            helperText={passwordIsInvalid && "Password must not be empty"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    sx={{
                      padding: "8px 11px 8px 0",
                      ":hover": { background: "white" },
                    }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormControlLabel
            control={<Checkbox defaultChecked size="small" />}
            label="Remember me"
          />

          <Button
            variant="contained"
            color="error"
            type="submit"
            sx={{ marginTop: 3 }}
            endIcon={<LoginIcon />}
          >
            Log In
          </Button>
          <div>
            <Button variant="text" sx={{ marginTop: 3 }} onClick={handleToggle}>
              Forgot Password?
            </Button>
            <BasicModal open={open} onClose={() => setOpen(false)} />
          </div>

          {error && (
            <Alert severity="error" sx={{ marginTop: "10px" }}>
              {error}
            </Alert>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginScreen;
