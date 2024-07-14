import userModel from "../model/user_model.js";
import mongoose from "mongoose";

export const getUsers = async (req, res) => {
  const { currentuserid } = req.params;

  if (!mongoose.Types.ObjectId.isValid(currentuserid)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const users = await userModel
      .find({ _id: { $ne: currentuserid } })
      .select("-password");
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: `Something went wrong ${error}` });
  }
};

export const getUser = async (req, res) => {
  const userId = req.params.userId;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    let user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "No user found!" });
    }
    user = user.toObject();
    delete user.password;
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Something went wrong ${error}` });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    let updateUser = await userModel.findByIdAndUpdate(
      id,
      {
        $set: {
          name: req.body.name,
          password: req.body.password,
          email: req.body.email,
        },
      },
      { new: true }
    );

    if (!updateUser) {
      return res.status(404).json({ message: "User not found" });
    }

    let result = {
      name: updateUser.name,
      email: updateUser.email,
      image: updateUser.image,
      _id: updateUser._id.toString(),
    };
    res.status(200).json(result);
  } catch (error) {
    console.error("Error during update operation:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const user = await userModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default { getUser, getUsers, updateUser, deleteUser };
