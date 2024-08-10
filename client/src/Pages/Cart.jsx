import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCartProducts, updateCart, deleteCart } from "../api/cartRequest";
import {
  setAllCartProducts,
  updateCartProducts,
  deleteCartProducts,
} from "../redux/features/cartSlice";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";

const Loading = () => (
  <div className="flex justify-center items-center h-full">
    <div className="loader border-t-4 border-b-4 border-green-500 w-12 h-12 rounded-full animate-spin"></div>
  </div>
);

const Cart = () => {
  const id = "checkout";
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("fooduser"));
  console.log(user);
  const cartProducts = useSelector((state) => state.cart.cartProducts);
  // console.log(JSON.parse(localStorage.getItem("fooduser")).token);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalProducts, settotalProducts] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const { data } = await getCartProducts();
        setIsLoading(false);
        setIsError(false);

        dispatch(setAllCartProducts(data));
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setIsError(error.response.data.message);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = async (id, quantity) => {
    console.log(quantity);
    if (quantity < 1) return;
    if (quantity > 5) return;
    try {
      const { data } = await updateCart({ id, quantity });
      console.log(data);
      dispatch(updateCartProducts(data));
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const { data } = await deleteCart({ id });
      console.log(data);
      dispatch(deleteCartProducts(data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    {
      let total = 0;
      for (let i = 0; i < cartProducts.length; i++) {
        total += cartProducts[i].price * cartProducts[i].quantity;
      }
      setTotalPrice(total);
      //   settotalProducts(cartProducts.length - 1);
    }
  }, [cartProducts]);

  if (isLoading) return <Loading />;
  if (cartProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full px-0 sm:px-4 ">
        <p className="text-gray-500 sm:text-3xl mt-[100px] sm:mt-[100px] text-center font-inter font-bold text-2xl">
          Your cart is empty. Add some items to your cart.
        </p>
        <img
          src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
          alt=""
          className="w-[350px] sm:w-[450px] h-[350px] sm:h-[450px] object-contain"
        />
      </div>
    );
  }

  return (
    <div className="p-4 w-full overflow-hidden ">
      <div className="overflow-x-auto overflow-y-auto max-h-96 sm:mt-5 mt-5 ">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-green-500 text-white lg:text-[16px] custmd:text-[15px]  text-[14px] ">
              <th className="py-3 sm:px-6 px-2 text-left">#</th>
              <th className="py-3 sm:px-6 px-2 text-left">Food</th>
              <th className="py-3 sm:px-6 px-2 text-left">Item Name</th>
              <th className="py-3 sm:px-6 px-2 text-left">Quantity</th>
              <th className="py-3 sm:px-6 px-2 text-left">Price</th>
              <th className="py-3 sm:px-6 px-2 text-left">Action</th>
              <th className="py-3 sm:px-6 px-2 text-left">subTotal</th>
            </tr>
          </thead>
          <tbody>
            {cartProducts?.map((item, index) => (
              <tr key={item.id} className="border-b">
                <td className="py-3 sm:px-6 px-2 text-left">{index + 1}</td>
                <td className="py-3 sm:px-6 px-2 text-left">
                  <img
                    src={item?.productId?.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover"
                  />
                </td>
                <td className="py-3 sm:px-6 px-2 text-left">
                  {item?.productId?.name}
                </td>
                <td className="py-3 sm:px-6 px-2 text-left">
                  <div className="flex items-center">
                    <button
                      className="px-2 bg-gray-200"
                      onClick={() => handleUpdate(item._id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button
                      className="px-2 bg-gray-300"
                      onClick={() => handleUpdate(item._id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="py-3 sm:px-6 px-2 text-left">
                  ${item.price.toFixed(2)}
                </td>
                <td className="py-3 sm:px-6 px-2 text-left">
                  <button
                    className="text-red-500"
                    onClick={() => handleDelete(item._id)}
                  >
                    <MdDelete size={20} />
                  </button>
                </td>
                <td className="py-3 sm:px-6 px-2 text-left">
                  <div className="flex items-center">
                    <span>${(item.quantity * item.price).toFixed(2)}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
        <div className="flex flex-col gap-4">
          <h2 className=" font-semibold font-inter text-2xl ">
            Customer Details
          </h2>
          {customerDetails ? (
            <div className="flex flex-col sm:gap-4 gap-2">
              <p>
                <strong>Name:</strong> {customerDetails[0].name || "None"}
              </p>
              <p>
                <strong>Email:</strong> {customerDetails[0].email || "None"}
              </p>
              <p>
                <strong>User ID:</strong> {customerDetails[0].userId || "None"}
              </p>
            </div>
          ) : (
            <p>Loading customer details...</p>
          )}
        </div>

        <div className="flex flex-col sm:gap-4 gap-2">
          <h2 className=" font-semibold font-inter text-2xl  ">
            Shopping Details
          </h2>
          <p>
            <strong>Total Items:</strong> {cartProducts.length}
          </p>
          <p>
            <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
          </p>
          <Link to={`/payment/${id}`}>
            <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
