import React, { useEffect, useState } from "react";
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
import withReactContent from 'sweetalert2-react-content';
import { updateCoupon } from "../../Service/CouponService";

const MySwal = withReactContent(Swal);

const UpdateCouponModal = ({ open, onClose, onUpdate, couponData }) => {
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

  // Cập nhật state mỗi khi couponData thay đổi
  useEffect(() => {
    if (couponData && open) {
      setCoupon({
        ...couponData,
        startDate: couponData.startDate?.substring(0, 10) || "",
        endDate: couponData.endDate?.substring(0, 10) || "",
      });
    }
  }, [couponData, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue =
    name === "minOrderValue"
      ? parseFloat(value) :value;
      setCoupon((prev) => ({ ...prev, [name]: value }));

  setCoupon((prev) => ({ ...prev, [name]: newValue }));
 
  };

  const showAlert = (text) => {
    MySwal.fire({
      icon: "error",
      title: "Lỗi",
      text,
      backdrop: true,
      didOpen: () => {
        const swalEl = document.querySelector('.swal2-popup');
        if (swalEl) swalEl.style.zIndex = 1600;
      },
    });
  };

  const handleSubmit =async () => {
    const start = new Date(coupon.startDate);
    const end = new Date(coupon.endDate);
    // console.log(coupon)
   
    console.log("COUPONE",coupon);

    if (end <= start) {
      showAlert("Ngày kết thúc phải lớn hơn ngày bắt đầu!");
      return;
    }

    if (coupon.typeCode === "percent" && (coupon.decreasePercent <= 0 || coupon.decreasePercent > 100)) {
      showAlert("Phần trăm giảm giá phải nằm trong khoảng 1 - 100.");
      return;
    }

    if (coupon.typeCode === "fixed" && coupon.decreaseCrash <= 0) {
      showAlert("Số tiền giảm phải lớn hơn 0.");
      return;
    }
 const res=await updateCoupon(coupon);
    if(res.status===200){
      Swal.fire(
        'Successful',
        'Data has been updated.',
        'success'
      );
    }
    onUpdate(coupon);
    onClose();
  };

  const isDateInvalid =
    coupon.startDate &&
    coupon.endDate &&
    new Date(coupon.endDate) <= new Date(coupon.startDate);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Cập Nhật Mã Giảm Giá</DialogTitle>
      <DialogContent>
        <TextField
          label="Mã giảm giá"
          name="code"
          value={coupon.code}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          select
          label="Loại mã"
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
            label="Số tiền giảm (VNĐ)"
            name="decreaseCrash"
            type="number"
            value={coupon.decreaseCrash}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        )}

        <TextField
          label="Giá trị đơn hàng tối thiểu"
          name="minOrderValue"
          type="number"
          value={coupon.minOrderValue}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Ngày bắt đầu"
          name="startDate"
          type="date"
          value={coupon.startDate}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />

        <Tooltip
          title={isDateInvalid ? "Ngày kết thúc phải lớn hơn ngày bắt đầu" : ""}
          arrow
          placement="top"
        >
          <TextField
            label="Ngày kết thúc"
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
          label="Áp dụng cho"
          name="category"
          value={coupon.category}
          onChange={handleChange}
          fullWidth
          margin="normal"
        >
          <MenuItem value="product">Sản phẩm</MenuItem>
          <MenuItem value="shipping">Phí vận chuyển</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Cập nhật
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateCouponModal;
