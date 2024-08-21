import React, { useEffect, useState } from "react";

import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Toast from "../components/Toast";
import { setCartProducts } from "../redux/features/cartSlice";
import { addToCart } from "../api/cartRequest";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
function ProductDetail() {
  const user = useSelector((state) => state.auth.user);
  const { id } = useParams();
  const baseUrl = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState("success");
  const [product, setProduct] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${baseUrl}/api/food/getfood/${id}`);
      setProduct(data);
    };
    fetchData();
  }, [id]);
  const handleAddToCart = async (id) => {
    try {
      const { data } = await addToCart({ id });

      dispatch(setCartProducts(data));
      setToastMessage("Added to cart successfully!");
      setToastSeverity("success");
      setToastOpen(true);
    } catch (error) {
      console.log(error);
      setToastMessage(error.response?.data?.message || "not added to cart");
      setToastSeverity("error");
      setToastOpen(true);
    }
  };
  const handleToastClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setToastOpen(false);
  };
  return (
    <div className="flex flex-col md:flex-row bg-white shadow-md rounded-lg p-4  my-[50px] gap-6 mx-4">
      <div className="sm:w-[40%] w-[90%] border-2">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="flex flex-col flex-1 gap-10">
        <div className="flex flex-col gap-10">
          <h2 className="custmd:text-5xl text-4xl font-bold mb-2 text-primary font-inter">
            {product.name}
          </h2>
          <p className="text-gray-600 mb-4">{product.recipe}</p>
          <div className="flex items-center mb-2">
            <span className="text-yellow-500 font-semibold mr-1 text-2xl">
              <span className="text-primary">Rating</span> {product.rating} ★
            </span>
          </div>
          <div className="text-3xl font-semibold text-primary mb-2">
            <span className="">Price</span> ${product.price}
          </div>
        </div>
        {user?.role ? (
          <Link to={`/edit/${product._id}`}>
            <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-primary transition duration-300">
              Edit
            </button>
          </Link>
        ) : (
          <button
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-primary transition duration-300"
            onClick={() => handleAddToCart(product._id)}
          >
            Add to Cart
          </button>
        )}
      </div>

      <Toast
        open={toastOpen}
        handleClose={handleToastClose}
        setOpen={setToastOpen}
        message={toastMessage}
        severity={toastSeverity}
      />
    </div>
  );
}

export default ProductDetail;
