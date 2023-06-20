import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { InputAdornment, IconButton } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { resetPassword } from "../actions/userActions";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#FFFFFF" : "#FFFFFF",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function ResetPassword() {
  const [password, setPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [confirmPasswordError, setConfirmPasswordError] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const userReset = useSelector((state) => state.userReset);
  const { loading, message } = userReset;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");

  const handlePassword = (event) => {
    setPassword(event.target.value);
    setPasswordError("");
  };

  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
    setConfirmPasswordError("");
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = () => {
    navigate("/");
  };

  const handleSubmit = () => {
    //Perform form validations
    if (!password.trim()) {
      setPasswordError("Please enter a password");
    } else if (password.length < 8) {
      setPasswordError("Password should be at least 8 characters long");
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(
        password
      )
    ) {
      setPasswordError(
        "Password should contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      );
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords don't match");
    } else {
      if (password) {
        dispatch(resetPassword(password, token));
        console.log(password, confirmPassword);
      }
    }
  };

  return (
    <Box sx={{ flexGrow: 1, marginTop: 8 }}>
      {message ? (
        <Grid>
          <Grid item sx={{ borderBottom: 1, borderColor: "primary" }}>
            <Item>
              <img
                style={{ width: 250 }}
                src="/images/logo.png"
                alt="Digifloat's logo"
              />
            </Item>
          </Grid>
          <Grid>
            <Item sx={{ height: "76vh", marginTop: 8 }}>
              <Typography variant="h3" color="initial">
                Password Reset
              </Typography>
              <Typography variant="body1">
                Your password has been successfully reset.
                <br />
                Please login with your new password.
              </Typography>
              <Button
                sx={{ marginTop: 4, width: 300 }}
                variant="contained"
                color="error"
                onClick={handleLogin}
              >
                Login
              </Button>
            </Item>
          </Grid>
        </Grid>
      ) : (
        <Grid>
          <Grid item sx={{ borderBottom: 1, borderColor: "primary" }}>
            <Item>
              <img
                style={{ width: 250 }}
                src="/images/logo.png"
                alt="Digifloat's logo"
              />
            </Item>
          </Grid>
          <Grid>
            <Item sx={{ height: "76vh", marginTop: 8 }}>
              <Typography variant="h3" color="initial">
                Password Reset
              </Typography>
              <Typography variant="body1">
                Please enter your new password for your Digifloat HRIS
              </Typography>
              <TextField
                sx={{ marginTop: 4, width: 300 }}
                value={password}
                onChange={handlePassword}
                required
                id="password"
                label="New Password"
                type={showPassword ? "text" : "password"}
                error={!!passwordError}
                helperText={passwordError}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        sx={{
                          ":hover": { background: "white" },
                        }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <br />
              <TextField
                sx={{ marginTop: 4, width: 300 }}
                value={confirmPassword}
                onChange={handleConfirmPassword}
                required
                id="confirmPassword"
                label="Confirm Password"
                type={showPassword ? "text" : "password"}
                error={!!confirmPasswordError}
                helperText={confirmPasswordError}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        sx={{
                          ":hover": { background: "white" },
                        }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <br />
              <Button
                sx={{ marginTop: 4, width: 300 }}
                variant="contained"
                color="error"
                onClick={handleSubmit}
              >
                {loading ? <CircularProgress size={20} /> : "Save Password"}
              </Button>
            </Item>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
