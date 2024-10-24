import { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function AddMember() {
  const classes = useStyles();
  const navigate = useNavigate(); // Initialize useNavigate
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [membershipType, setMembershipType] = useState("");
  const [membershipPrice, setMembershipPrice] = useState(0); // State for membership price
  const [joinDate] = useState(new Date().toISOString()); // State for join date

  // Mapping of membership types to prices
  const membershipOptions = {
    "1 month subscription": 29.99,
    "3 months subscription": 144.0,
    "1 year subscription": 1190.0,
  };

  const handleMembershipChange = (e) => {
    const selectedType = e.target.value;
    setMembershipType(selectedType);
    setMembershipPrice(membershipOptions[selectedType]); // Set the corresponding price
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !membershipType) {
      alert("All fields are required!");
      return; // Prevent submission if fields are empty
    }
    // Instead of adding to Firebase, just navigate with the data
    navigate("/member-payment", {
      state: { name, email, membershipType, membershipPrice, joinDate }, // Include joinDate
    });
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Add New Member
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth required>
              <InputLabel id="membershipType-label">Membership Type</InputLabel>
              <Select
                labelId="membershipType-label"
                id="membershipType"
                value={membershipType}
                onChange={handleMembershipChange} // Use the new handler
                label="Membership Type"
              >
                <MenuItem value="1 month subscription">
                  1 Month Subscription - $29.99
                </MenuItem>
                <MenuItem value="3 months subscription">
                  3 Months Subscription - $144.00
                </MenuItem>
                <MenuItem value="1 year subscription">
                  1 Year Subscription - $1,190.00
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              id="joinDate"
              label="Join Date"
              name="joinDate"
              value={new Date(joinDate).toLocaleDateString()}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Add Member
        </Button>
      </form>
    </div>
  );
}

export default AddMember;
