import React from "react";
import { PiPhoneCallFill } from "react-icons/pi";
import { IoLocationSharp } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import { useState } from "react";
import Toast from "../components/Toast";
import { createBooking } from "../api/bookingRequest";
import { setBookingProducts } from "../redux/features/bookingSlice";
import { useDispatch, useSelector } from "react-redux";
function Reservation() {
  const bookings = useSelector((state) => state.booking.bookingProducts);
  console.log(bookings);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState("success");
  const dispatch = useDispatch();
  console.log(date);
  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log(date, time, guests, name, phone, email);
    if (!date || !time || !guests || !name || !phone || !email) {
      setToastMessage("Please fill in all fields");
      setToastSeverity("error");
      setToastOpen(true);
      return;
    }
    try {
      setIsLoading(true);
      setIsError(false);
      setToastMessage("Booking successful!");
      setToastSeverity("success");
      setToastOpen(true);
      const { data } = await createBooking({
        date,
        time,
        guests,
        name,
        phone,
        email,
      });
      console.log(data);
      dispatch(setBookingProducts(data));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(error.response?.data?.message);
      setToastMessage(error.response?.data?.message || "Booking failed!");
      setToastSeverity("error");
      setToastOpen(true);
      setIsLoading(false);
    }
  };
  const handleToastClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setToastOpen(false);
  };
  return (
    <div className="custmd:px-[100px] px-[10px] py-[30px]">
      <div className="bg-[#FFF9C3] font-cinzel font-bold text-[25px] h-[80px] flex items-center justify-center rounded-md ">
        <h1>BOOK A TABLE</h1>
      </div>
      <p className="text-[20px] font-bold font-cinzel text-center mt-3">
        Please fill in the form below to book a table
      </p>
      <p className="text-[15px] font-bold font-cinzel text-center mt-3">
        Each guest charges $50
      </p>
      <div className="my-5  overflow-hidden">
        <form onSubmit={handlesubmit}>
          <div className="flex flex-col gap-5">
            {" "}
            <div className="grid sm:grid-cols-3 grid-cols-1 gap-5">
              <div className="flex flex-col  flex-wrap flex-1">
                <label className="font-bold text-secondary">Date*</label>
                <input
                  type="date"
                  className=" border-2 outline-none rounded-md py-2 px-2 w-full"
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="flex flex-col  flex-wrap flex-1">
                <label className="font-bold text-secondary">Time*</label>
                <input
                  type="time"
                  className=" border-2 outline-none rounded-md py-2 px-2 w-full"
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
              <div className="flex flex-col flex-wrap flex-1">
                <label className="font-bold text-secondary">Gust*</label>
                <select
                  className=" border-2 outline-none rounded-md py-2 px-2 bg-transparent w-full"
                  onChange={(e) => {
                    setGuests(e.target.value);
                    console.log(e.target.value);
                  }}
                >
                  <option value="1">1 Person</option>
                  <option value="2">2 Person</option>
                  <option value="3">3 Person</option>
                  <option value="4">4 Person</option>
                </select>
              </div>
            </div>{" "}
            <div className="grid sm:grid-cols-3 grid-cols-1 gap-5">
              <div className="flex flex-col flex-wrap flex-1 ">
                <label className="font-bold text-secondary">Name*</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className=" border-2 outline-none rounded-md py-2 px-2 w-full"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col flex-wrap flex-1">
                <label className="font-bold text-secondary">Phone*</label>
                <input
                  type="text"
                  placeholder="Phone"
                  className=" border-2 outline-none rounded-md py-2 px-2 w-full"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="flex flex-col flex-wrap flex-1">
                <label className="font-bold text-secondary">Email*</label>
                <input
                  type="email"
                  placeholder="Email"
                  className=" border-2 outline-none rounded-md py-2 px-2 w-full"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              className=" text-white font-inter gredient bg-gradient-to-r from-sky-400 to-blue-500 w-fit mx-auto rounded-md p-3 hover:bg-gradient-to-r hover:from-sky-500 hover:to-blue-600 "
            >
              Book A Table
            </button>
          </div>
        </form>
      </div>
      <div className="bg-[#E5DFF8]  font-bold py-5 flex flex-col items-center rounded-md justify-center gap-6 text-center px-3">
        <h1 className=" text-[25px] font-cinzel">CONTACT US</h1>
        <div className="flex gap-12 flex-wrap font-inter justify-center items-center">
          <div className="flex font-black text-[16px] gap-3 items-center">
            <PiPhoneCallFill />
            <h1>+0 123 456 789</h1>
          </div>
          <div className="flex font-black text-[16px] gap-3 items-center">
            <IoLocationSharp />
            <h1>AB Park, New York, USA</h1>
          </div>
          <div className="flex font-black text-[16px] gap-3 items-center">
            <IoMdMail />
            <h1>contact@foodi.com</h1>
          </div>
        </div>
      </div>
      <Toast
        open={toastOpen}
        handleClose={handleToastClose}
        message={toastMessage}
        severity={toastSeverity}
      />
    </div>
  );
}

export default Reservation;
