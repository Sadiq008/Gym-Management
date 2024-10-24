import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
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

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      localStorage.setItem("userName", name);
      localStorage.setItem("userEmail", email); // Store email in local storage
      setSnackbarMessage("Registered successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      // Dispatch a custom event to notify the header
      window.dispatchEvent(new Event("userUpdated"));
      setTimeout(() => {
        navigate("/"); // Redirect to home after 2 seconds
      }, 2000);
    } catch (error) {
      setError(error.message);
      setSnackbarMessage(error.message);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleGoBack = () => {
    navigate("/"); // Navigate back to the home page
  };

  return (
    <Paper style={{ padding: "20px", margin: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleRegister}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Grid>
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
              Register
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

      {/* Go back to home page button */}
      <Grid container spacing={2} style={{ marginTop: "10px" }}>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={handleGoBack} // Call the function to go back to home
          >
            Go back to home page
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Register;
