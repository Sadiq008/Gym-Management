import { useState } from "react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import {
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Snackbar,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSnackbarMessage("Login successful");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      localStorage.setItem("userName", email.split("@")[0]); // Store the first part of the email as the username
      localStorage.setItem("userEmail", email); // Store email in local storage
      // Dispatch a custom event to notify the header
      window.dispatchEvent(new Event("userUpdated"));
      setTimeout(() => {
        navigate("/"); // Redirect to home after 2 seconds
      }, 2000);
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setError("Email doesn't exist"); // Specific error message for non-existent email
      } else if (error.code === "auth/wrong-password") {
        setError("Wrong password"); // Specific error message for wrong password
      } else {
        setError(error.message); // General error message
      }
      setSnackbarMessage(error.message);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email address."); // Prompt if email is not provided
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email); // Send password reset email
      setSnackbarMessage("Password reset email sent. Check your inbox.");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      setError(error.message); // Handle errors
      setSnackbarMessage(error.message);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <Paper style={{ padding: "20px", margin: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      {error && (
        <Typography color="error" style={{ color: "red" }}>
          {error}
        </Typography>
      )}
      <form onSubmit={handleLogin}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
      {/* Snackbar for success and error messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        style={{
          backgroundColor: snackbarSeverity === "success" ? "green" : "red",
          color: "white",
        }}
      />
      {/* Additional buttons for forgot password and register account */}
      <Grid container spacing={2} style={{ marginTop: "10px" }}>
        <Grid item xs={6}>
          <Button
            color="inherit"
            onClick={handleForgotPassword} // Call the forgot password function
          >
            Forgot Password?
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button color="inherit" onClick={() => navigate("/register")}>
            Register Account
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Login;
