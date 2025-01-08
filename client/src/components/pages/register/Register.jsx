import React, { useState } from "react";
import { FormControl, FormLabel, FormHelperText, Input } from "@mui/joy";
import { Container, Button, Box, Typography, Snackbar } from "@mui/material";
import styles from "./Register.module.css";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

import useRegister from "../../../hooks/useRegisterUser";
import { red } from "@mui/material/colors";

const Register = () => {
  const gender = [
    {
      value: "Male",
      label: "Male",
    },
    {
      value: "Female",
      label: "Female",
    },
    {
      value: "None",
      label: "Prefer not to say",
    },
  ];

  const [open, setOpen] = useState(false);
  const [validationError, setValidationError] = useState("");

  const handleSnackbarClick = () => {
    setOpen(true);
  };
  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const { mutate, isLoading, error, data } = useRegister();

  function emailValidate(email) {
    const isValid = /(^.*@[a-zA-z]+.(com|in)$)/.test(email);
    return isValid;
  }

  function passwordValidate(password) {
    const isValid = /^(?=.*?[A-Z])(?=.*?[a-z]).{3,}$/.test(password);
    return isValid;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const newUser = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      gender: formData.get("gender"),
    };

    if (
      !newUser.name ||
      !newUser.email ||
      !newUser.password ||
      !newUser.gender ||
      !formData.get("confirmPassword")
    ) {
      console.log("Some fields are missing");
      setValidationError("Some fields are missing");
      return;
    }

    if (!emailValidate(newUser.email)) {
      console.log("email is not valid");
      setValidationError("email is not valid");
      return;
    }

    if (newUser.password !== formData.get("confirmPassword")) {
      console.log("password do not match");
      setValidationError("password do not match");
      return;
    }

    if (!passwordValidate(newUser.password)) {
      console.log("Password is not valid");
      setValidationError("Password is not valid");
      return;
    }
    mutate(newUser);

    if (data) {
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  }

  return (
    <div
      className={`${styles.containerStylingOne} ${styles.containerStylingTwo}`}
    >
      <Container maxWidth="sm">
        <Box
          className={styles.boxStyling}
          sx={{
            marginTop: 2,
            padding: 4,
            boxShadow: 3,
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h5"
            component="h1"
            className={styles.titleStyling}
          >
            Register
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl sx={{ marginTop: 2 }}>
              <FormLabel className={`${styles.formLabel}`}>Name</FormLabel>
              <Input name="name" type="text" placeholder="Ex: Praveen Raju" />
              <FormHelperText className={`${styles.formHelperText}`}>
                Enter your Name
              </FormHelperText>
            </FormControl>

            <FormControl sx={{ marginTop: 2 }}>
              <FormLabel className={`${styles.formLabel}`}>Email</FormLabel>
              <Input
                name="email"
                type="email"
                placeholder="Ex: test@gmail.com"
                autoComplete="email"
              />
              <FormHelperText className={`${styles.formHelperText}`}>
                Enter your email
              </FormHelperText>
            </FormControl>

            <FormControl sx={{ marginTop: 2 }}>
              <TextField
                id="password-input"
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
              />
              <FormHelperText style={{ color: "orange" }}>
                * Password should contain min 3 letters with 1 capital and 1
                small letter *
              </FormHelperText>
            </FormControl>
            <FormControl sx={{ marginTop: 2 }}>
              <TextField
                id="confirm-password-input"
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                autoComplete="current-password"
              />
            </FormControl>

            <FormControl sx={{ marginTop: 2 }}>
              <TextField
                id="outlined-select-currency"
                select
                label="Select Gender"
                name="gender"
                defaultValue="Male"
                helperText="Please select your gender"
              >
                {gender.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>

            <Button
              type="submit"
              color="primary"
              variant="contained"
              sx={{ marginTop: 2 }}
              onClick={handleSnackbarClick}
            >
              {isLoading ? "Registering..." : "Register"}
            </Button>
            <Snackbar
              open={open}
              autoHideDuration={5000}
              onClose={handleSnackBarClose}
              message={
                (data &&
                  `Registration successful! Welcome ${data.user.name}`) ||
                (error && error.message) ||
                validationError
              }
            />

            {/* Previous Error logic */}
            {/* {error && (
              <div style={{ color: "red", marginTop: 10 }}>
                <strong>{error.message}</strong>
              </div>
            )} */}

            {/* Previous on Success logic */}
            {/* {data && (
              <div style={{ color: "green", marginTop: 10 }}>
                Registration successful! Welcome {data.user.name}.
              </div>
            )} */}
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default Register;
