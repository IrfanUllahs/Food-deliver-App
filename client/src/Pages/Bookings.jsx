import React, { useEffect, useState } from "react";
import BookingMenu from "../components/BookingMenu";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector, useDispatch } from "react-redux";
import { getbookings, deleteBooking } from "../api/bookingRequest";
import {
  setAllBookingProducts,
  deleteBookingProducts,
} from "../redux/features/bookingSlice";
import { useNavigate } from "react-router-dom";
function Bookings() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [status, setStatus] = useState(false);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const bookings = useSelector((state) => state.booking.bookingProducts);
  const navigate = useNavigate();
  const handleClick = (event, id, status) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
    setStatus(status);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedId(null);
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setIsLoading(true);
        const { data } = await getbookings();
        setIsLoading(false);
        dispatch(setAllBookingProducts(data));
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    fetchBookings();
  }, [dispatch]);

  useEffect(() => {
    let total = 0;
    if (bookings.length === 0) return;
    bookings.forEach((item) => {
      total += item.price;
    });
    setTotalPrice(total);
  }, [bookings]);

  const handleDelete = async (id) => {
    try {
      setIsLoading(true);
      const { data } = await deleteBooking(id);
      console.log(data);
      dispatch(deleteBookingProducts(data));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  const handlePayment = (id) => {
    navigate(`/payment/${id}`);
  };
  if (isLoading)
    return (
      <h1 className="text-center text-4xl font-bold font-inter mt-[150px] ml-[100px]">
        Loading...
      </h1>
    );

  return (
    <div className="custmd:px-[100px] px-[10px] py-[40px] w-full flex flex-col gap-7 overflow-hidden ">
      <div className="bg-yellow-300 font-inter font-bold text-[25px] h-[80px] py-3 flex items-center justify-center rounded-md ">
        <h1>MY BOOKINGS</h1>
      </div>
      <div className="flex justify-between">
        <h1 className="text-[20px] font-bold font-cinzel">
          TOTAL BOOKINGS: {bookings.length || "00"}
        </h1>
        <h1 className="text-[20px] font-bold font-cinzel">
          TOTAL PRICE: ${totalPrice || "00"}
        </h1>
      </div>

      <div className="overflow-x-auto max-h-[350px]">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="w-full bg-green-500 text-white uppercase text-sm leading-normal">
              <th className="py-3 sm:px-6 px-2 text-left">Email</th>
              <th className="py-3 sm:px-6 px-2 text-left">Price</th>
              <th className="py-3 sm:px-6 px-2 text-left">Date</th>
              <th className="py-3 sm:px-6 px-2 text-left">Action</th>
              <th className="py-3 sm:px-6 px-2 text-left">Paid</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {bookings?.map((item, index) => (
              <tr key={index} className="border-b border-gray-200 ">
                <td className="py-3 sm:px-6 px-2 text-left whitespace-nowrap">
                  {item.email}
                </td>
                <td className="py-3 sm:px-6 px-2 text-left">${item.price}</td>
                <td className="py-3 sm:px-6 px-2 text-left">
                  {item.date + " " + item.time}
                </td>
                <td className="py-3 sm:px-6 px-2 text-left">
                  <button
                    onClick={(e) => handleClick(e, item._id, item.paid)}
                    className="cursor-pointer hover:bg-gray-300 rounded-md"
                  >
                    <MenuIcon />
                  </button>
                </td>
                <td className="py-3 sm:px-6 px-2 text-left">
                  <p>{item.paid ? "Paid" : "Not Paid"}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <BookingMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        handleDelete={() => handleDelete(selectedId)}
        handlePayment={() => handlePayment(selectedId)}
        status={status}
      />
    </div>
  );
}

export default Bookings;
