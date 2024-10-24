import { useLocation, useNavigate } from "react-router-dom";
import { Typography, Paper, Button, Grid, Snackbar } from "@material-ui/core";
import { useState } from "react";
import { db } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";

const MemberPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, email, membershipType, membershipPrice, joinDate } =
    location.state || {};

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleConfirmPayment = async () => {
    try {
      await addDoc(collection(db, "members"), {
        name,
        email,
        membershipType,
        membershipPrice,
        joinDate,
        paymentDate: new Date().toISOString(),
      });
      setSnackbarMessage("Payment Successful!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true); // Open Snackbar

      // Delay navigation to allow Snackbar to be seen
      setTimeout(() => {
        navigate("/members"); // Redirect to members page after 2 seconds
      }, 2000);
    } catch (error) {
      console.error("Error adding document: ", error);
      setSnackbarMessage("Payment Failed!"); // Set failure message
      setSnackbarSeverity("error"); // Set severity to error
      setSnackbarOpen(true); // Open Snackbar
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false); // Close Snackbar
  };

  return (
    <Paper
      style={{
        padding: "30px",
        margin: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        backgroundColor: "#f9f9f9", // Light background color
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        style={{ fontWeight: "bold", color: "#2c3e50" }}
      >
        Member Payment Details
      </Typography>
      <Grid container spacing={3} style={{ marginBottom: "20px" }}>
        <Grid item xs={12}>
          <Typography variant="h6" style={{ color: "#34495e" }}>
            Name: <strong>{name}</strong>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" style={{ color: "#34495e" }}>
            Email: <strong>{email}</strong>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" style={{ color: "#34495e" }}>
            Membership Type: <strong>{membershipType}</strong>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" style={{ color: "#34495e" }}>
            Membership Price: <strong>${membershipPrice.toFixed(2)}</strong>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" style={{ color: "#34495e" }}>
            Join Date:{" "}
            <strong>{new Date(joinDate).toLocaleDateString()}</strong>
          </Typography>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleConfirmPayment}
        style={{
          padding: "12px",
          fontSize: "18px",
          transition: "background-color 0.3s, transform 0.3s",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "#2980b9"; // Darker shade on hover
          e.currentTarget.style.transform = "scale(1.05)"; // Slightly enlarge on hover
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = ""; // Reset to original color
          e.currentTarget.style.transform = "scale(1)"; // Reset to original size
        }}
      >
        Confirm Payment
      </Button>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        style={{
          backgroundColor: snackbarSeverity === "success" ? "green" : "red",
          color: "white",
        }}
      />
    </Paper>
  );
};

export default MemberPayment;
