import { forwardRef, useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Snackbar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CgProfile } from "react-icons/cg";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: "white",
    textDecoration: "none",
  },
  menuItem: {
    color: "black",
  },
}));

const Link = forwardRef((props, ref) => <RouterLink ref={ref} {...props} />);
Link.displayName = "Link";

function Header() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("userName");
    const email = localStorage.getItem("userEmail");
    if (name) {
      setUserName(name);
    }
    if (email) {
      setUserEmail(email);
    }

    // Listen for the custom event
    const handleUserUpdate = () => {
      const updatedName = localStorage.getItem("userName");
      const updatedEmail = localStorage.getItem("userEmail");
      setUserName(updatedName || "");
      setUserEmail(updatedEmail || "");
    };

    window.addEventListener("userUpdated", handleUserUpdate);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("userUpdated", handleUserUpdate);
    };
  }, []);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    setUserName("");
    setUserEmail("");
    setSnackbarMessage("Successfully logged out");
    setSnackbarOpen(true);
    handleClose();

    setTimeout(() => {
      setSnackbarOpen(false);
    }, 2000);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          <Button variant="h2" color="inherit" component={Link} to="/">
            GYM Management System
          </Button>
        </Typography>
        {userName ? (
          <>
            <Button color="inherit" onClick={handleProfileClick}>
              <CgProfile style={{ fontSize: "1.5rem" }} />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem className={classes.menuItem} disabled>
                {userName}
              </MenuItem>
              <MenuItem className={classes.menuItem} disabled>
                {userEmail}
              </MenuItem>
              <MenuItem className={classes.menuItem} onClick={handleLogout}>
                Logout
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          </>
        )}
        <Button color="inherit" component={Link} to="/members">
          Members
        </Button>
        <Button color="inherit" component={Link} to="/add-member">
          Add Member
        </Button>
        <Button color="inherit" component={Link} to="/schedule">
          Class Schedule
        </Button>
        <Button color="inherit" component={Link} to="/bills">
          Bills
        </Button>
        <Button color="inherit" component={Link} to="/supplements">
          Supplements
        </Button>
      </Toolbar>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        style={{
          backgroundColor: "green",
          color: "white",
        }}
      />
    </AppBar>
  );
}

export default Header;
