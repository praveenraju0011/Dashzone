import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { logDetails } from "../../../api/logDetails";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!Cookies.get("jwtToken");

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleLogoClick() {
    navigate("/");
  }
  function handleSignIn() {
    navigate("/login");
  }
  async function handleLogout() {
    try {
      const logObject = {
        logType: "LogOut",
      };
      await logDetails(logObject);
      console.log("Log Details Entered Successfully");
    } catch (error) {
      console.log("Error updating log data, logout", error);
    }
    Cookies.remove("jwtToken");
    navigate("/login");
  }

  async function handleLogData() {
    navigate("/loghistory");
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            className={styles["logo-style"]}
            onClick={handleLogoClick}
          >
            <img
              src="https://varthana.com/wp-content/uploads/2022/10/h_logo.png"
              alt="app-logo"
            />
          </Typography>
          <Button color="inherit" onClick={() => navigate("/dashboard")}>
            Dashboard
          </Button>

          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{ color: "white" }}
          >
            <PersonOutlineIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                handleLogData();
              }}
            >
              Log History
            </MenuItem>
            {!isAuthenticated ? (
              <MenuItem
                onClick={() => {
                  handleClose();
                  handleSignIn();
                }}
              >
                Sign In
              </MenuItem>
            ) : (
              <MenuItem
                onClick={() => {
                  handleClose();
                  handleLogout();
                }}
              >
                Log Out
              </MenuItem>
            )}
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
