import sclass from "./images/sclass.jpg";
import yclass from "./images/yclass.jpg";
import zclass from "./images/zclass.jpg";
import { makeStyles } from "@material-ui/core/styles";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(3),
    backgroundColor: "#f4f4f4",
    minHeight: "100vh",
  },
  imageContainer: {
    position: "relative",
    width: "50vw", // Adjusted width for better layout
    margin: theme.spacing(2),
    overflow: "hidden",
    borderRadius: "12px", // Slightly rounded corners
    boxShadow: "0 8px 16px rgba(0,0,0,0.3)", // Enhanced shadow for depth
    transition: "transform 0.3s, box-shadow 0.3s", // Transition for shadow on hover
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0 12px 24px rgba(0,0,0,0.5)", // Deeper shadow on hover
    },
  },
  image: {
    width: "100%",
    height: "auto",
    display: "block",
  },
  heading: {
    position: "absolute",
    color: "white",
    fontSize: "2.5rem", // Increased font size for better visibility
    textAlign: "center",
    zIndex: 2,
    top: "40%", // Center vertically
    left: "50%",
    transform: "translate(-50%, -50%)", // Center horizontally
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Darker overlay for better contrast
    zIndex: 1,
  },
  scheduleText: {
    position: "absolute",
    bottom: "15px", // Position at the bottom
    right: "15px", // Position to the right
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Dark background for better visibility
    padding: "8px 12px",
    borderRadius: "4px",
    zIndex: 2,
    display: "flex",
    alignItems: "center",
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.imageContainer}>
        <img src={sclass} alt="Strength Class" className={classes.image} />
        <div className={classes.overlay} />
        <div className={classes.heading}>Strength Training</div>
        <div className={classes.scheduleText}>
          <Link
            to={"/schedule"}
            style={{ color: "white", textDecoration: "none" }}
          >
            Schedule Class <FaArrowRightLong />
          </Link>
        </div>
      </div>
      <div className={classes.imageContainer}>
        <img src={yclass} alt="Yoga Class" className={classes.image} />
        <div className={classes.overlay} />
        <div className={classes.heading}>Yoga Training</div>
        <div className={classes.scheduleText}>
          <Link
            to={"/schedule"}
            style={{ color: "white", textDecoration: "none" }}
          >
            Schedule Class <FaArrowRightLong />
          </Link>
        </div>
      </div>
      <div className={classes.imageContainer}>
        <img src={zclass} alt="Zumba Class" className={classes.image} />
        <div className={classes.overlay} />
        <div className={classes.heading}>Zumba Training</div>
        <div className={classes.scheduleText}>
          <Link
            to={"/schedule"}
            style={{ color: "white", textDecoration: "none" }}
          >
            Schedule Class <FaArrowRightLong />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
