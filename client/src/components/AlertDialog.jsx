import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { useEffect, useState } from "react";
import { getCartProducts } from "../api/cartRequest";
import { getABooking } from "../api/bookingRequest";
export default function AlertDialog({
  open,
  handleClose,
  handlePayment,
  param,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);
  const [isError, setIsError] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentType, setPaymentType] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const customerDetails = {
    name: "Mark Peter",
    email: "hXHb8@example.com",
    address: "New York, USA",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        if (param == "checkout") {
          const { data } = await getCartProducts();
          setCartProducts(data);
        } else {
          const { data } = await getABooking(param);
          console.log(data);
          setTotalPrice(data.price);
          setPaymentType("Booking");
          setUserEmail(data.email);
          console.log(userEmail);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setIsError(error.response.data.message);
      }
    };

    if (open) {
      fetchData();
    }
  }, [open]);

  useEffect(() => {
    if (cartProducts.length > 0) {
      let total = 0;
      for (let i = 0; i < cartProducts.length; i++) {
        total += cartProducts[i].price * cartProducts[i].quantity;
      }
      setTotalPrice(total);
    }
  }, [cartProducts]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Order Summary</DialogTitle>
      <DialogContent>
        {isLoading ? (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <CircularProgress />
          </div>
        ) : isError ? (
          <Typography color="error">{isError}</Typography>
        ) : (
          <div>
            <Typography variant="h6" gutterBottom>
              Customer Details
            </Typography>
            <Typography variant="body1">
              Name: {customerDetails.name}
            </Typography>
            <Typography variant="body1">
              Email: {customerDetails.email}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Address: {customerDetails.address}
            </Typography>
            <Divider />

            <Divider />
            <Typography variant="h6" gutterBottom style={{ marginTop: "20px" }}>
              Total Price: ${totalPrice}
            </Typography>
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            handlePayment(totalPrice, paymentType, userEmail);
            handleClose();
          }}
          color="primary"
          autoFocus
          disabled={totalPrice <= 0}
        >
          Proceed to Payment
        </Button>
      </DialogActions>
    </Dialog>
  );
}
