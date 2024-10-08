import React, { useEffect, useState } from "react";
import OrderDetails from "../components/OrderDetails";
import Stepper from "../components/Stepper";
import { getorders, updateOrder } from "../api/orderRequest";
import { useSelector } from "react-redux";
const OrdersPage = () => {
  const [order, setorder] = useState();
  const [status, setStatus] = useState(0);
  const [isloading, setIsloading] = useState(false);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsloading(true);
        const { data } = await getorders();

        setorder(data);
        setIsloading(false);
      } catch (error) {
        setIsloading(false);
        console.log(error);
      }
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
    <>
      {isloading ? (
        <h1 className="text-2xl font-bold text-center mt-20 w-[200px] mx-auto ">
          loading....
        </h1>
      ) : (
        <div className="max-h-screen  p-4 w-full flex items-center flex-col gap-10 border-2 overflow-hidden overflow-y-scroll">
          {order?.length > 0 ? (
            order?.map((order) => (
              <>
                <OrderDetails key={order?._id} order={order} />

                <Stepper
                  status={order?.status}
                  handleClick={handleClick && user.role}
                  key={order?._id}
                  id={order?._id}
                />
              </>
            ))
          ) : (
            <h1 className="text-2xl font-bold text-center mt-20 w-[200px] mx-auto ">
              No Orders
            </h1>
          )}
        </div>
      )}
    </>
  );
};

export default OrdersPage;
