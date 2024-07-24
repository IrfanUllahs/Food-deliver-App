import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { getfoods } from "../api/foodRequest";
import { useDispatch, useSelector } from "react-redux";
import CustomPagination from "../components/CustomPagination";
import { setCartProducts } from "../redux/features/cartSlice";
import { addToCart } from "../api/cartRequest";
import Toast from "../components/Toast";
function Menu() {
  const user = useSelector((state) => state?.auth?.user);
  console.log(user);
  const categories = ["All", "Chicken", "Rice", "Dessert", "Pizza", "Soup"];
  const [data, setdata] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  console.log(data);
  const [currPage, setCurrPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [category, setCategory] = useState("All");

  const dispatch = useDispatch();
  const { cartProducts } = useSelector((state) => state.cart);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState("success");
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        let result = await getfoods({ category: category.toLocaleLowerCase() });
        setIsLoading(false);
        setIsError(false);
        setdata(result.data.recipes);
      } catch (error) {
        setIsLoading(false);
        setIsError(error.response.data.message);
      }
    };
    fetchData();
  }, [category]);
  useEffect(() => {
    if (category === "All") {
      setFilteredData(
        data.slice((currPage - 1) * pageSize, currPage * pageSize)
      );
    } else {
      setFilteredData(
        data
          .filter((item) => item.category === category.toLocaleLowerCase())
          .slice((currPage - 1) * pageSize, currPage * pageSize)
      );
    }
  }, [category, data, currPage]);
  const handlePageChange = (value) => {
    setCurrPage(value);
  };
  const handleCategory = (item) => {
    setCategory(item);
    setCurrPage(1);
  };

  const handleAddToCart = async (id) => {
    try {
      // if (user.role) {
      //   setToastMessage("Admin can't add to cart");
      //   setToastSeverity("error");
      //   setToastOpen(true);
      //   return;
      // }
      const { data } = await addToCart({ id });

      dispatch(setCartProducts(data));
      setToastMessage("Added to cart successfully!");
      setToastSeverity("success");
      setToastOpen(true);
    } catch (error) {
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
    <div className="flex flex-col gap-10 px-2 pt-[120px]">
      <h1 className="sm:text-5xl text-[25px] font-bold text-center">
        Dive into Delights Of Delectable{" "}
        <span className="text-primary">Food</span>
      </h1>
      <p className="sm:text-xl text-[16px] text-secondary font-medium text-center ">
        Where Each Plate Weaves a Story of Culinary Mastery and Passionate
        Craftsmanship
      </p>
      <button className="button shadow-lg shadow-green-200 mx-auto sm:!px-6 !px-3">
        Order Now
      </button>
      <div className="flex gap-4 px-4 font-inter font-semibold text-[20px] ">
        {categories.map((item) => (
          <button
            key={item}
            className={`hover:text-primary ${
              category === item ? "text-primary" : ""
            }`}
            onClick={() => handleCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="grid lg:grid-cols-3 gap-16 md:grid-cols-2  grid-cols-1 px-4 mt-16 ">
        {isLoading ? (
          <div className="text-center text-3xl  w-[1200px] mx-auto my-[100px] ">
            Loading...
          </div>
        ) : isError ? (
          <h1 className="text-center text-3xl  w-[1200px] mx-auto my-[100px] ">
            {isError}
          </h1>
        ) : (
          filteredData.length > 0 &&
          filteredData?.map((item) => (
            <Card
              key={item._id}
              fav={true}
              title={item.shortName}
              desc={item.recipe}
              price={item.price}
              id={item._id}
              image={item.image}
              handleAddToCart={handleAddToCart}
            />
          ))
        )}
      </div>
      {/* pagination will be implmented here */}
      <h1>pagination</h1>
      <CustomPagination
        handlePageChange={handlePageChange}
        currPage={currPage}
        pageSize={pageSize}
        data={data}
      />

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

export default Menu;
