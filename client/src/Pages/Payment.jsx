import React, { useEffect, useState } from "react";
import Toast from "../components/Toast";
import { useNavigate } from "react-router-dom";
import { payment } from "../api/paymentReuest";
import AlertDialog from "../components/AlertDialog";
import { useParams } from "react-router-dom";
import { createOrder } from "../api/orderRequest";
function Payment() {
  const { id } = useParams();

  const [paymentType, setPaymentType] = useState("");

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState("success");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("fooduser"));

  const validateForm = () => {
    return (
      cardNumber.length === 16 && expiryDate.length === 5 && cvc.length === 3
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setToastMessage("Invalid input. Please check your card details.");
      setToastSeverity("error");
      setToastOpen(true);
      return;
    }
    handleDialogOpen();
  };
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const handlePayment = async (amount, paymentType, email) => {
    try {
      setIsLoading(true);
      const { data } = await payment({
        cardNumber,
        expiryDate,
        cvc,
        amount,
        userEmail: email ? email : user?.user?.email,
        payment: paymentType ? paymentType : "Food Order",
        id,
      });
      setToastMessage(data.message);
      setToastSeverity("success");
      setToastOpen(true);
      setIsLoading(false);
      if (!paymentType !== "Booking") {
        const data = await createOrder();
        console.log(data);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setToastMessage("Payment failed");
      setToastSeverity("error");
      setToastOpen(true);
    }
  };

  return (
    <div className="custmd:px-[100px] px-[10px] py-[40px] w-full">
      <div className="bg-[#FFF9C3] font-cinzel font-bold text-[25px] h-[80px] flex items-center justify-center rounded-md">
        <h1>BOOK A TABLE</h1>
      </div>
      <div className="max-w-md mx-auto mt-5 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Visa / Master Card
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Card number
            </label>
            <input
              type="text"
              placeholder="Card number"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-purple-300"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </div>
          <div className="flex mb-4 sm:flex-row flex-col gap-2">
            <div className="flex-1">
              <label className="block mb-2 text-sm font-medium text-gray-600">
                MM/YY
              </label>
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-purple-300"
                value={expiryDate}
                onChange={(e) => setExpiry(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="block mb-2 text-sm font-medium text-gray-600">
                CVC
              </label>
              <input
                type="text"
                placeholder="CVC"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-purple-300"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
              />
            </div>
          </div>
          <button
            className="w-full px-3 py-2 mb-4 text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Pay"}
          </button>
        </form>
      </div>
      <Toast
        open={toastOpen}
        handleClose={() => setToastOpen(false)}
        message={toastMessage}
        severity={toastSeverity}
      />
      <AlertDialog
        open={dialogOpen}
        handleClose={handleDialogClose}
        handlePayment={handlePayment}
        param={id}
      />
    </div>
  );
}

export default Payment;
