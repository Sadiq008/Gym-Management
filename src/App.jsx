import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ThemeProvider,
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./components/Header/Header";
import MemberList from "./components/MemberList/MemberList";
import BillList from "./components/BillList/BillList";
import SupplementList from "./components/SupplementList/SupplementList";
import Footer from "./components/Footer/Footer";
import AddMember from "./components/AddMember/AddMember";
import ClassSchedule from "./components/ClassSchedule/ClassSchedule";
import { CartProvider } from "./contexts/CartContext"; // Import the CartProvider
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import Payment from "./components/Payment/Payment";
import MemberPayment from "./components/MemberPayment/MemberPayment"; // Import MemberPayment
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2c3e50",
    },
    secondary: {
      main: "#3498db",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CartProvider>
        {/* Wrap your application with CartProvider */}
        <Router>
          <div className="App">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/members" element={<MemberList />} />
                <Route path="/bills" element={<BillList />} />
                <Route path="/supplements" element={<SupplementList />} />
                <Route path="/add-member" element={<AddMember />} />
                <Route path="/schedule" element={<ClassSchedule />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/member-payment" element={<MemberPayment />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
