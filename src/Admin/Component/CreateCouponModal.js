import React, { useState } from "react";
import "../Css/CreateCouponModal.css"
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  MenuItem,
  Tooltip
} from "@mui/material";
import Swal from 'sweetalert2';
const CreateCouponModal = ({ open, onClose, onSubmit }) => {
  const [coupon, setCoupon] = useState({
    code: "",
    typeCode: "percent",
    decreasePercent: 0,
    decreaseCrash: 0,
    minOrderValue: 0,
    startDate: "",
    endDate: "",
    category: "product",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCoupon({ ...coupon, [name]: value });
  };

  const handleSubmit = () => {
    const start = new Date(coupon.startDate);
    const end = new Date(coupon.endDate);

    if (end <= start) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "End date must be greater than start date",
            customClass: {
                popup: 'custom-swal-popup'
              }
          });
          
      return;
    }

    if (coupon.typeCode === "percent" && (coupon.decreasePercent <= 0 || coupon.decreasePercent > 100)) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Decrese percent must be greater than 0% and less than 100%",
      
          });
      return;
    }

    if (coupon.typeCode === "fixed" && coupon.decreaseCrash <= 0) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Cash must be greater than 0",
      
          });
      return;
    }

    onSubmit(coupon);
    onClose();
    setCoupon({
      code: "",
      typeCode: "percent",
      decreasePercent: 0,
      decreaseCrash: 0,
      minOrderValue: 0,
      startDate: "",
      endDate: "",
      category: "product",
    });
  };

  const isDateInvalid = coupon.startDate && coupon.endDate && new Date(coupon.endDate) <= new Date(coupon.startDate);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" >
      <DialogTitle>Tạo Mã Giảm Giá</DialogTitle>
      <DialogContent>
        <TextField
          label="Code Name"
          name="code"
          value={coupon.code}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          select
          label="Type Code "
          name="typeCode"
          value={coupon.typeCode}
          onChange={handleChange}
          fullWidth
          margin="normal"
        >
          <MenuItem value="percent">Giảm theo phần trăm</MenuItem>
          <MenuItem value="fixed">Giảm theo số tiền</MenuItem>
        </TextField>

        {coupon.typeCode === "percent" ? (
          <TextField
            label="% Giảm"
            name="decreasePercent"
            type="number"
            value={coupon.decreasePercent}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        ) : (
          <TextField
            label="Value Decrease (đ)"
            name="decreaseCrash"
            type="number"
            value={coupon.decreaseCrash}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        )}

        <TextField
          label="Minimum Order"
          name="minOrderValue"
          type="number"
          value={coupon.minOrderValue}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Start Date"
          name="startDate"
          type="date"
          value={coupon.startDate}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />

        <Tooltip
          title={isDateInvalid ? "End date must be greater than start date" : ""}
          arrow
          placement="top"
        >
          <TextField
            label="End date"
            name="endDate"
            type="date"
            value={coupon.endDate}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            error={isDateInvalid}
          />
        </Tooltip>

        <TextField
          select
          label="Apply for"
          name="category"
          value={coupon.category}
          onChange={handleChange}
          fullWidth
          margin="normal"
        >
          <MenuItem value="product">Product</MenuItem>
          <MenuItem value="shipping">Shipping Fee</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateCouponModal;
