import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { IoLogoGoogle } from "react-icons/io";
import { register } from "../api/authRequest";
import Toast from "../components/Toast";
import { useNavigate } from "react-router-dom";
const SignupPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState("success");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const { data } = await register({
        name,
        email,
        password,
      });
      setToastMessage("Registration successful!");
      setToastSeverity("success");
      setToastOpen(true);
      navigate("/login");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error.response?.data?.message);
      setToastMessage(error.response?.data?.message || "Registration failed!");
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
  useEffect(() => {
    const auth = localStorage.getItem("fooduser");
    if (auth) {
      navigate("/");
    }
  }, []);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-[#444444] font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              value={name}
              placeholder="Type here"
              onChange={(e) => setName(e.target.value)}
              className="text-[15px] w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#444444] font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              placeholder="Type here"
              onChange={(e) => setEmail(e.target.value)}
              className="text-[15px] w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="text-[15px] mb-6">
            <label className="block text-[#444444] font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200"
          >
            {isLoading ? "Loading..." : "Signup"}
          </button>
        </form>
        <div className="mt-6 text-center text-[#656565]">
          <p>
            <span>Already have an account?</span>
            <Link to="/login" className="font-semibold ml-1">
              Login
            </Link>
          </p>
          <p className="mt-4">Or sign up with</p>
          <div className="flex justify-center mt-5 gap-8">
            <button className="bg-[#F1F2F4] hover:bg-[#dadde2] text-white p-3 border border-[#39DB4A] rounded-full mr-2 transition duration-200">
              <FaFacebookF className="text-[#444444] text-2xl" />
            </button>
            <button className="bg-[#F1F2F4] hover:bg-[#dadde2] text-white p-3 rounded-full border border-[#39DB4A] transition duration-200">
              <IoLogoGoogle className="text-[#444444] text-2xl" />
            </button>
          </div>
        </div>
      </div>
      <Toast
        open={toastOpen}
        handleClose={handleToastClose}
        message={toastMessage}
        severity={toastSeverity}
      />
    </div>
  );
};

export default SignupPage;
