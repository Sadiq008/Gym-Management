import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import strengthImg from "./images/strength.jpg";
import yogaImg from "./images/yoga.jpg";
import zumbaImg from "./images/zumba.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: "#f4f4f4",
    minHeight: "100vh",
  },
  table: {
    minWidth: 650,
  },
  instructorImage: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    marginRight: theme.spacing(2),
  },
  tableCell: {
    display: "flex",
    alignItems: "center",
  },
  payButton: {
    marginLeft: theme.spacing(2),
  },
}));

const classSchedules = [
  {
    id: 1,
    name: "Yoga",
    image: yogaImg,
    instructor: "John Doe",
    time: "9:00 AM",
    days: "Mon, Wed, Fri",
    price: "$100",
  },
  {
    id: 2,
    name: "Zumba",
    image: zumbaImg,
    instructor: "Jane Smith",
    time: "10:30 AM",
    days: "Tue, Thu",
    price: "$60",
  },
  {
    id: 3,
    name: "Strength Training",
    image: strengthImg,
    instructor: "Mike Johnson",
    time: "6:00 PM",
    days: "Mon, Wed, Fri",
    price: "$75",
  },
];

function ClassSchedule() {
  const classes = useStyles();
  const navigate = useNavigate(); // Initialize useNavigate

  const handlePayClick = (cls) => {
    // Navigate to the Payment component with class details
    navigate("/payment", { state: { classDetails: cls } }); // Pass class details as state
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Class Schedule
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="class schedule table">
          <TableHead>
            <TableRow>
              <TableCell>Class Name</TableCell>
              <TableCell>Instructor</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Days</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classSchedules.map((cls) => (
              <TableRow key={cls.id}>
                <TableCell component="th" scope="row">
                  {cls.name}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <img
                    src={cls.image}
                    alt={cls.instructor}
                    className={classes.instructorImage}
                  />
                  {cls.instructor}
                </TableCell>
                <TableCell>{cls.time}</TableCell>
                <TableCell>{cls.days}</TableCell>
                <TableCell>{cls.price}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.payButton}
                    onClick={() => handlePayClick(cls)} // Call handlePayClick with class details
                  >
                    Pay
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ClassSchedule;
