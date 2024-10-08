import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { getfoods } from "../api/foodRequest";
import { useParams } from "react-router-dom";
import CustomPagination from "../components/CustomPagination";

function Menu() {
  const categories = ["All", "Chicken", "Rice", "Dessert", "Burger", "Drink"];
  const [data, setdata] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const { id } = useParams();
  const [currPage, setCurrPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [category, setCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (id) {
      setCategory(id);
    }
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        let { data: result } = await getfoods({
          category: category.toLocaleLowerCase(),
          page: currPage,
        });
        console.log(result);
        setTotalPages(result.totalPages);

        setIsLoading(false);
        setIsError(null);
        setdata(result.recipes);
        setFilteredData(result.recipes);
      } catch (error) {
        setIsLoading(false);
        console.error("Fetch error:", error); // Log the error for debugging
        setIsError(error.response?.data?.message || "An error occurred");
      }
    };
    fetchData();
  }, [category, currPage]);

  // useEffect(() => {
  //   if (data?.length > 0) {
  //     if (category === "All") {
  //       setFilteredData(
  //         data?.slice((currPage - 1) * pageSize, currPage * pageSize)
  //       );
  //     } else {
  //       setFilteredData(
  //         data
  //           .filter((item) => item.category === category.toLocaleLowerCase())
  //           .slice((currPage - 1) * pageSize, currPage * pageSize)
  //       );
  //     }
  //   }
  // }, [category, data, currPage, pageSize]);

  const handlePageChange = (value) => {
    setCurrPage(value);
  };

  const handleCategory = (item) => {
    setCategory(item);
    setCurrPage(1);
  };

  return (
    <div className="flex flex-col gap-10 px-2 pt-[120px]">
      <h1 className="sm:text-5xl text-[25px] font-bold text-center">
        Dive into Delights Of Delectable{" "}
        <span className="text-primary">Food</span>
      </h1>
      <p className="sm:text-xl text-[16px] text-secondary font-medium text-center">
        Where Each Plate Weaves a Story of Culinary Mastery and Passionate
        Craftsmanship
      </p>
      <button className="button shadow-lg shadow-green-200 mx-auto sm:!px-6 !px-3">
        Order Now
      </button>
      <div className="flex gap-4 px-4 font-inter font-semibold text-[20px]">
        {categories?.map((item) => (
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
      <div className="grid lg:grid-cols-3 gap-16 md:grid-cols-2 grid-cols-1 px-4 mt-16 relative py-8">
        {isLoading ? (
          <span className="loader absolute left-1/2 right-1/2 "></span>
        ) : isError ? (
          <h1 className="text-center text-3xl w-[1200px] mx-auto my-[100px]">
            {isError}
          </h1>
        ) : (
          filteredData?.length > 0 &&
          filteredData?.map((item) => (
            <Card
              key={item._id}
              fav={true}
              title={item.shortName}
              desc={item.recipe}
              price={item.price}
              id={item._id}
              image={item.image}
            />
          ))
        )}
      </div>

      {!isLoading && (
        <CustomPagination
          handlePageChange={handlePageChange}
          currPage={currPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
}

export default Menu;
