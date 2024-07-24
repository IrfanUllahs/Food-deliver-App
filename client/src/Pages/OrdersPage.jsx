import React, { useEffect, useState } from "react";
import OrderDetails from "../components/OrderDetails";
import Stepper from "../components/Stepper";
import { getorders, updateOrder } from "../api/orderRequest";
const OrdersPage = () => {
  const [order, setorder] = useState();
  const [status, setStatus] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await getorders();
      console.log(data);
      setorder(data);
    };
    fetchOrders();
  }, []);

  const handleClick = async (value, id) => {
    console.log(value);
    if (status > 1) return;
    const { data: data2 } = await updateOrder(id, { status: value });
    setStatus(value);
  };

  return (
    <div className="max-h-screen  p-4 w-full flex items-center flex-col gap-10 border-2 overflow-hidden overflow-y-scroll">
      {order &&
        order.map((order) => (
          <>
            <OrderDetails key={order?._id} order={order} />

            <Stepper
              status={order?.status}
              handleClick={handleClick}
              key={order?._id}
              id={order?._id}
            />
          </>
        ))}
    </div>
  );
};

export default OrdersPage;
