import React, { useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { getallFoods, deleteFood } from "../api/bookingRequest";
import { Link } from "react-router-dom";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [isloading, setIsloading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsloading(true);
        const { data } = await getallFoods();
        setIsloading(false);
        setProducts(data.recipes);
      } catch (error) {
        setIsloading(false);
        console.log(error.response.data.message);
      }
    };
    fetchData();
  }, []);
  const handleDelete = async (id) => {
    try {
      const { data } = await deleteFood(id);
      console.log(data);
      setProducts(products.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="custmd:px-[100px] px-[10px] py-[40px] w-full flex flex-col gap-7 overflow-hidden ">
      <>
        {isloading ? (
          <h1 className="text-center mt-28 text-3xl">Loading...</h1>
        ) : (
          <div className="overflow-x-auto max-h-[450px]">
            <table className="min-w-full bg-white w-full">
              <thead>
                <tr className=" bg-green-500 text-white uppercase text-sm leading-normal ">
                  <th className="py-3 sm:px-6 px-2 text-left">Title</th>
                  <th className="py-3 sm:px-6 px-2 text-left">image</th>
                  <th className="py-3 sm:px-6 px-2 text-left">Detete</th>
                  <th className="py-3 sm:px-6 px-2 text-left">Edit</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {products.length > 0 ? (
                  products.map((item) => (
                    <tr
                      asdfas
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-3 sm:px-6 px-2 text-left max-w-[50px] border-2">
                        {item.name}
                      </td>
                      <td className="py-3 sm:px-6 px-2 text-left">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-[50px] h-[50px] object-cover"
                        />
                      </td>
                      <td className="py-3 sm:px-6 px-2 text-left group">
                        <AiFillDelete
                          size={20}
                          className="text-red-500 hover:text-red-800"
                          onClick={() => handleDelete(item._id)}
                        />
                      </td>
                      <td className="py-3 sm:px-6 px-2 text-left">
                        <Link to={`/edit/${item._id}`}>
                          <AiFillEdit size={20} className="text-blue-500" />
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <h1 className="text-center mt-28 text-3xl">No Products</h1>
                )}
              </tbody>
            </table>
          </div>
        )}
      </>
      <Link to="/addproduct">
        <button className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-primary">
          Add Product
        </button>
      </Link>
    </div>
  );
};

export default Products;
