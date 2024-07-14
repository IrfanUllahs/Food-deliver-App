import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { updateUser, deleteUser, logoutUser } from "../actions/userActions";

const ProfilePage = () => {
  const user = useSelector((state) => state.auth.user);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleUpdate = () => {
    const updatedUser = { name, email, password };
    dispatch(updateUser(updatedUser));
  };

  const handleDelete = () => {
    dispatch(deleteUser());
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="max-w-2xl mx-auto p-8 mt-10 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Profile</h1>
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
        />
      </div>
      <div className="flex justify-between items-center">
        <button
          onClick={handleUpdate}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
        >
          Update
        </button>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Logout
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
