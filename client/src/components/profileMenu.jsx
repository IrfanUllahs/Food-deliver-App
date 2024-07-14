import React from "react";
import { useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function ProfileMenu({
  anchorEl,
  open,
  onClose,

  status,
}) {
  const navigate = useNavigate();

  const handleMenuItemClick = (arg) => {
    onClose();

    if (arg === "Profile") {
      console.log("Profile");
      navigate("/profile");
    } else if (arg === "Logout") {
      navigate("/login");
      localStorage.removeItem("fooduser");
    } else if (arg === "Dashboard") {
      navigate("/dashboard");
    }

    console.log(arg);
  };

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      <MenuItem
        onClick={() => !status && handleMenuItemClick("Profile")}
        disabled={status}
      >
        Profile
      </MenuItem>
      <MenuItem onClick={() => handleMenuItemClick("Logout")}>Logout</MenuItem>
      <MenuItem onClick={() => handleMenuItemClick("Dashboard")}>
        Dashboard
      </MenuItem>
    </Menu>
  );
}
