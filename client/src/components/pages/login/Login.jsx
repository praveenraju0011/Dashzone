import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import Snackbar from "@mui/material/Snackbar";

import { useLogin } from "../../../hooks/useLoginUser";
import Cookies from "js-cookie";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const isAuthenticated = !!Cookies.get("jwtToken");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSnackBarClick = () => {
    setOpen(true);
  };

  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const { mutate, isLoading, error, data } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const userDetails = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    mutate(userDetails);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 8,
          padding: 4,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" component="h1" sx={{ marginBottom: 2 }}>
          Login
        </Typography>

        {/* Previous Error logic */}
        {/* {error && (
          <Typography variant="body2" color="error" sx={{ marginBottom: 2 }}>
            {error.message || "An unexpected error occurred. Please try again."}
          </Typography>
        )} */}

        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleSnackBarClose}
          message={error && error.message}
        />

        {isLoading && <CircularProgress sx={{ marginBottom: 2 }} />}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            variant="outlined"
            margin="normal"
            autoComplete="username"
          />
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              name="password"
              autoComplete="current-password"
            />
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
            onClick={handleSnackBarClick}
          >
            Login
          </Button>
        </form>
        <Box>
          <div className={styles.practiceStyleOne}>
            Do not have an account? <Link to="/register">Register</Link>
          </div>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
