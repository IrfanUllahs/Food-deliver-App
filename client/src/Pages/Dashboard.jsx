import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidbar";
import { getbookings } from "../api/bookingRequest";
import { getPayments } from "../api/paymentReuest";
import axios from "axios";
function Dashboard() {
  const [ORDERS, setORDERS] = useState("");
  const [BOOKINGS, setBOOKINGS] = useState("");
  const [PAYMENTS, setPAYMENTS] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getbookings();
        const { data: data2 } = await getPayments();
        const { data: data3 } = await axios.get("/api/food/getfoodscount");
        console.log(data3);
        setBOOKINGS(data.length);
        setPAYMENTS(data2.length);
        console.log(data2);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="h-full  grid grid-cols-1 py-10 custmd:px-[200px] sm:px-[100px] px-[30px] gap-8 w-full ">
      <div className=" bg-[#C2F0FF]  rounded-md flex flex-col items-center justify-center">
        <h1 className="font-cinzel font-bold text-[30px]">ORDERS</h1>
        <h2 className="font-cinzel font-bold text-[25px]">03</h2>
      </div>
      <div className=" bg-[#FFF9C3]  rounded-md flex flex-col items-center justify-center">
        <h1 className="font-cinzel font-bold text-[30px]">BOOKINGS</h1>
        <h2 className="font-cinzel font-bold text-[25px]">
          {BOOKINGS < 10 ? `0${BOOKINGS}` : BOOKINGS || "00"}
        </h2>
      </div>
      <div className=" bg-[#C7C2FF]  rounded-md flex flex-col items-center justify-center">
        <h1 className="font-cinzel font-bold text-[30px]">PAYMENTS</h1>
        <h2 className="font-cinzel font-bold text-[25px]">
          {PAYMENTS < 10 ? `0${PAYMENTS}` : PAYMENTS || "00"}
        </h2>
      </div>
    </div>
  );
}

export default Dashboard;
