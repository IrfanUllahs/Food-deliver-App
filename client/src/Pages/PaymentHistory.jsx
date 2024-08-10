import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setAllPayments } from "../redux/features/paymentSlice";
import { getPayments } from "../api/paymentReuest";
function PaymentHistory() {
  const data = useSelector((state) => state?.payment?.allPayments);

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const { data } = await getPayments();
        dispatch(setAllPayments(data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchPayments();
  }, []);
  return (
    <div className="custmd:px-[100px] px-[10px] py-[40px] w-full flex flex-col gap-7 overflow-hidden ">
      <div className="bg-yellow-300 font-inter font-bold text-[25px] h-[80px] py-3 flex items-center justify-center rounded-md ">
        <h1>PAYMENT HISTORY</h1>
      </div>
      <h1 className="text-[20px] font-bold font-cinzel">
        TOTAL PYMENTS: {data.length}
      </h1>
      <>
        <div className="overflow-x-auto max-h-[350px]">
          <table className="min-w-full bg-white w-full">
            <thead>
              <tr className=" bg-green-500 text-white uppercase text-sm leading-normal ">
                <th className="py-3 sm:px-6 px-2 text-left">Email</th>
                <th className="py-3 sm:px-6 px-2 text-left">Category</th>
                <th className="py-3 sm:px-6 px-2 text-left">Total Price</th>
                <th className="py-3 sm:px-6 px-2 text-left">Payment Date</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {data.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 sm:px-6 px-2 text-left whitespace-nowrap">
                    {item.userEmail}
                  </td>
                  <td className="py-3 sm:px-6 px-2 text-left">
                    {item.payment}
                  </td>
                  <td className="py-3 sm:px-6 px-2 text-left">
                    ${item.amount}
                  </td>
                  <td className="py-3 sm:px-6 px-2 text-left">
                    {item.createdAt.slice(0, 10)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    </div>
  );
}

export default PaymentHistory;
