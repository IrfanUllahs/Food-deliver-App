// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LayoutWithMenu from "./components/LayoutWithMenu";
import LayoutWithoutMenu from "./components/LayoutWithoutMenu";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import Menu from "./Pages/Menu";
import Dashboard from "./Pages/Dashboard";
import Profile from "./Pages/Profile";
import LayoutWithSidbar from "./components/LayoutWithSidbar";
import Reservation from "./Pages/Reservation";
import Payment from "./Pages/Payment";
import PaymentHistory from "./Pages/PaymentHistory";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/features/authSlice";
import PrivateRoute from "./components/PrivateRoute";
import Cart from "./Pages/Cart";
import Bookings from "./Pages/Bookings";
import Services from "./Pages/Serives";
import UserRoute from "./components/UserRoute";
import OrdersPage from "./Pages/OrdersPage";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUser(JSON.parse(localStorage.getItem("fooduser"))?.user));
  }, []);

  return (
    <Router>
      <Routes>
        <Route element={<LayoutWithoutMenu />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route element={<LayoutWithSidbar />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/payment/:id" element={<Payment />} />
            <Route path="/paymenthistory" element={<PaymentHistory />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/order-tracking" element={<OrdersPage />} />
            <Route element={<UserRoute />}>
              <Route path="/cart" element={<Cart />} />
            </Route>
          </Route>
        </Route>

        <Route element={<LayoutWithMenu />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/services" element={<Services />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
