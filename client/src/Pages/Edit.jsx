import React, { useState, useEffect } from "react";
import UploadWidget from "../components/UploadWidget";
import { useParams } from "react-router-dom";
import axios from "axios"; // Or use fetch if preferred
import { useNavigate } from "react-router-dom";
import { updateFood } from "../api/bookingRequest";
const UpdatePage = () => {
  const baseUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { id } = useParams();
  const [image, setImage] = useState();
  const [data, setData] = useState({
    name: "",
    price: "",
    recipe: "",
    rating: "",
    category: "",
    shortName: "",
  });
  const [error, setError] = useState("");

  // Fetch data from API when component mounts
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${baseUrl}/api/food/getfood/${id}`);
      setData({
        name: data.name,
        price: data.price,
        recipe: data.recipe,
        rating: data.rating,
        category: data.category,
        shortName: data.shortName,
        image: data.image,
      });
    };
    fetchData();
  }, []);

  const validateShortName = (name) => {
    if (name.length > 17) {
      setError("Short name must be less than 18 characters.");
      return;
    } else {
      setError("");
    }
    setData((prevState) => ({ ...prevState, shortName: name }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { ...data, image };

    try {
      const { data: response } = await updateFood(formData, id);
      console.log(response);
      navigate("/productdetail/" + id);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6  ">
      <div className="max-h-[500px] overflow-x-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Update Food Item
        </h1>
        <div>
          <UploadWidget
            uwConfig={{
              cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
              uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
              multiple: false,
              folder: "profile",
            }}
            setImage={setImage}
          />
        </div>
        <div className="w-[250px] ">
          {data.image ? (
            <img
              src={image || data.image}
              alt="NO image "
              className=" object-cover rounded-md mt-3"
            />
          ) : (
            <span>No Image. Upload here</span>
          )}
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex  gap-4 flex-col sm:flex-row"
        >
          <div>
            <div className="mb-4">
              <label className="block text-gray-700">Name:</label>
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-green-300"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Price:</label>
              <input
                type="number"
                name="price"
                value={data.price}
                onChange={handleChange}
                step="0.01"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-green-300"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Recipe:</label>
              <textarea
                name="recipe"
                value={data.recipe}
                onChange={handleChange}
                rows="4"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-green-300"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="mb-4">
              <label className="block text-gray-700">Rating:</label>
              <input
                type="number"
                name="rating"
                value={data.rating}
                onChange={handleChange}
                step="0.1"
                min="0"
                max="5"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-green-300"
              />
            </div>

            {/* <div className="mb-4">
              <label className="block text-gray-700">Image URL:</label>
              <input
                type="text"
                name="image"
                value={data.image}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-green-300"
              />
            </div> */}

            <div className="mb-4">
              <label className="block text-gray-700">Category:</label>
              <input
                type="text"
                name="category"
                value={data.category}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-green-300"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Short Name:</label>
              <input
                type="text"
                error={error}
                name="shortName"
                value={data.shortName}
                onChange={(e) => validateShortName(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-green-300"
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePage;
