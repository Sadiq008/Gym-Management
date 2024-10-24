import { useState, useEffect } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config.js";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  table: {
    minWidth: 650,
  },
}));

function MemberList() {
  const classes = useStyles();
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const membersCollection = collection(db, "members");
        const snapshot = await getDocs(membersCollection);
        const memberData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMembers(memberData);
      } catch (error) {
        console.error("Error fetching members: ", error);
      }
    };
    fetchMembers();
  }, []);

  // Function to format the date
  const formatDate = (date) => {
    if (!date) return ""; // Return empty if no date
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options); // Format date
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Member List
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="member table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Membership Type</TableCell>
              <TableCell>Join Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>{member.membershipType}</TableCell>
                <TableCell>{formatDate(member.joinDate)}</TableCell>{" "}
                {/* Format the date */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default MemberList;
