import React from "react";
import { useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function BookingMenu({
  anchorEl,
  open,
  onClose,
  handleDelete,
  handlePayment,
  status,
}) {
  const navigate = useNavigate();

  const handleMenuItemClick = (arg) => {
    onClose();

    if (arg === "Pay Now") {
      handlePayment();
    } else if (arg === "Delete") {
      handleDelete();
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
        onClick={() => !status && handleMenuItemClick("Pay Now")}
        disabled={status}
      >
        Pay Now
      </MenuItem>
      <MenuItem onClick={() => handleMenuItemClick("Delete")}>Delete</MenuItem>
    </Menu>
  );
}
