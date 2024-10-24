import { useLocation, useNavigate } from "react-router-dom"; // Import useLocation and useNavigate
import {
  Typography,
  Paper,
  Button,
  Snackbar,
  Grid,
  TextField,
} from "@material-ui/core"; // Import TextField for input fields
import { useState, useEffect, useRef } from "react"; // Import useEffect and useRef
import { db } from "../../firebase/config"; // Import Firestore database
import { collection, addDoc } from "firebase/firestore"; // Import Firestore functions
import "./Payment.css"; // Import the CSS file for styling

const Payment = () => {
  const location = useLocation(); // Get the location object
  const navigate = useNavigate(); // Initialize useNavigate
  const { classDetails } = location.state || {}; // Destructure classDetails from state

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // State variables for new input fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const timeoutId = useRef(null); // Create a ref for the timeout ID

  useEffect(() => {
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, []);

  if (!classDetails) {
    return <Typography variant="h6">No class details available.</Typography>; // Handle case where no details are passed
  }

  const handlePayment = async () => {
    // Validate required fields
    if (!name || !email || !mobile) {
      setSnackbarMessage("All fields are required!");
      setSnackbarSeverity("error");
      setOpenSnackbar(true); // Open the snackbar
      return; // Prevent further execution
    }

    const paymentSuccessful = true; // Set payment as successful

    if (paymentSuccessful) {
      setSnackbarMessage("Payment Successful!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true); // Open the snackbar

      // Save payment information to Firestore
      try {
        await addDoc(collection(db, "classes"), {
          instructor: classDetails.instructor,
          time: classDetails.time,
          days: classDetails.days,
          price: classDetails.price,
          className: classDetails.name,
          name,
          email,
          mobile,
        });

        // Redirect to home page after a delay
        timeoutId.current = setTimeout(() => {
          navigate("/bills");
        }, 2000); // 2 seconds delay
      } catch (error) {
        console.error("Error adding document: ", error);
        setSnackbarMessage("Error saving payment information.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    } else {
      setSnackbarMessage("Payment Failed!");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Paper className="payment-paper">
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        className="payment-title"
      >
        Payment for {classDetails.name}
      </Typography>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item>
          <img
            src={classDetails.image}
            alt={classDetails.instructor}
            className="instructor-image"
          />
        </Grid>
        <Grid item>
          <Typography variant="h6" className="instructor-name">
            Instructor: {classDetails.instructor}
          </Typography>
          <Typography variant="h6">Time: {classDetails.time}</Typography>
          <Typography variant="h6">Days: {classDetails.days}</Typography>
          <Typography variant="h6" className="price">
            Price: {classDetails.price}
          </Typography>
        </Grid>
      </Grid>

      {/* Input fields for name, email, and mobile number */}
      <Grid
        container
        spacing={2}
        justifyContent="center"
        style={{ marginTop: "20px" }}
      >
        <Grid item xs={12} sm={4}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            required // Mark as required
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required // Mark as required
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Mobile Number"
            variant="outlined"
            fullWidth
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required // Mark as required
          />
        </Grid>
      </Grid>

      {/* Centering the Confirm Payment button */}
      <Grid container justifyContent="center" style={{ marginTop: "20px" }}>
        <Button
          variant="contained"
          color="primary"
          className="confirm-button"
          onClick={handlePayment}
        >
          Confirm Payment
        </Button>
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        style={{
          backgroundColor: snackbarSeverity === "success" ? "green" : "red",
          color: "white",
        }}
      />
    </Paper>
  );
};

export default Payment;
