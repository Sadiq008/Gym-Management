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
import { db } from "../../firebase/config";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  table: {
    minWidth: 650,
  },
}));

function BillList() {
  const classes = useStyles();
  const [bills, setBills] = useState([]);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const billsCollection = collection(db, "classes"); // Ensure this is the correct collection
        const snapshot = await getDocs(billsCollection);
        const billData = snapshot.docs.map((doc) => {
          const data = doc.data();
          const price = data.price; // Assuming price is stored as a number
          return {
            id: doc.id,
            className: data.className, // Ensure className is included
            instructor: data.instructor,
            amount:
              typeof price === "number"
                ? price
                : parseFloat(price.replace(/[^0-9.-]+/g, "")), // Clean and convert to number if necessary
            date: new Date().toLocaleDateString(),
            memberName: data.name,
          };
        });
        setBills(billData);
      } catch (error) {
        console.error("Error fetching bills: ", error);
      }
    };
    fetchBills();
  }, []);

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Bill List
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="bill table">
          <TableHead>
            <TableRow>
              <TableCell>Bill ID</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Member Name</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bills.map((bill) => (
              <TableRow key={bill.id}>
                <TableCell>{bill.id}</TableCell>
                <TableCell>{bill.className}</TableCell>{" "}
                <TableCell>{bill.memberName}</TableCell>
                <TableCell>${bill.amount.toFixed(2)}</TableCell>
                <TableCell>{bill.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default BillList;
